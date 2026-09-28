/**
 * WhatsApp Commander Bridge Service for Aplikasi Kanomas (Two-Way AI Agent)
 * Seamlessly connects WhatsApp (+6282112114222) with Google Antigravity AI IDE.
 * 
 * Rules:
 * 1. STRICT: Only messages sent to ONESELF ("Message Yourself") are recognized as commands.
 *    Messages sent to other people or groups are strictly IGNORED.
 * 2. QUEUE: If a command is already executing, new commands are queued up and executed sequentially.
 * 3. NOTIFY: Automatically delivers AI responses & status updates back to WhatsApp.
 * 4. SELF-HEALING: Auto-reconnects on stream error or disconnection.
 */

if (!process.env.NODE_PATH) {
  process.env.NODE_PATH = 'D:/Monarchy/Corner ERP/node_modules';
  require('module').Module._initPaths();
}

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  delay
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const QRCode = require('qrcode');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const net = require('net');

const BASE_DIR = path.resolve(__dirname, '../../');
const AUTH_DIR = path.resolve(__dirname, 'auth_info');
const STATUS_FILE = path.resolve(__dirname, 'status.json');
const QR_IMAGE_PATH = path.resolve(__dirname, 'qr-code.png');
const TRANSCRIPT_PATH = 'C:/Users/Desktop/.gemini/antigravity/brain/ff63607c-fe79-4756-a256-9a007b4b484c/.system_generated/logs/transcript.jsonl';

const CASCADE_ID = 'ff63607c-fe79-4756-a256-9a007b4b484c';
let CSRF_TOKEN = '2fe04268-a077-4265-bf2d-dc96df730999';
let LS_PORT = 54162;
const BRIDGE_HTTP_PORT = 3899;

const TARGET_PHONE = '6282112114222';
const TARGET_PHONE_ALT = '628211211422';

let sock = null;
let lastProcessedStepIndex = -1;
let transcriptFileSize = 0;
const sentMessageIds = new Set();
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// Antrian Perintah (Command Queue) & Auto-Retry Watchdog
const commandQueue = [];
let isBusyExecuting = false;
let executionTimeoutTimer = null;
let currentExecutingCommand = null;
let lastKnownUserPrompt = null;
let autoRetryCount = 0;
const MAX_AUTO_RETRIES = 2; // Auto-run on error maksimal 2x
let isRetrying = false;
let lastExecutionResult = {
  status: 'IDLE',
  command: null,
  error: null,
  timestamp: null
};

// Dev Server Manager
let devServerProcess = null;
const devServerPort = 3000;
let isDevServerStarting = false;

function isPortActive(port) {
  return new Promise((resolve) => {
    const s = new net.Socket();
    s.setTimeout(1200);
    s.once('connect', () => {
      s.destroy();
      resolve(true);
    });
    s.once('error', () => {
      s.destroy();
      resolve(false);
    });
    s.once('timeout', () => {
      s.destroy();
      resolve(false);
    });
    s.connect(port, '127.0.0.1');
  });
}

// Mematikan paksa seluruh fungsi server lama pada port 3000
function killServerProcesses() {
  return new Promise((resolve) => {
    console.log('[DEV-SERVER] Mematikan seluruh proses yang mendengarkan port ' + devServerPort + '...');
    if (devServerProcess) {
      try { devServerProcess.kill(); } catch (e) {}
      devServerProcess = null;
    }
    // Hentikan proses yang memegang port 3000 via PowerShell
    const cmd = `Get-NetTCPConnection -LocalPort ${devServerPort} -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }`;
    require('child_process').exec(`powershell -NoProfile -Command "${cmd}"`, () => {
      setTimeout(resolve, 800);
    });
  });
}

// Pastikan koneksi socket WhatsApp tetap aktif dan pulihkan jika mati
function ensureWaSocketHealthy() {
  const isHealthy = sock && sock.ws && sock.ws.readyState === 1;
  if (!isHealthy) {
    console.log('[WA-BRIDGE] Socket WA terputus atau tidak aktif. Menyalakan ulang bridge WA...');
    try {
      startWhatsAppBridge();
    } catch (e) {
      console.error('[WA-RECONNECT-ERR]', e.message);
    }
  } else {
    console.log('[WA-BRIDGE] Bridge WhatsApp aktif & terverifikasi (CONNECTED).');
  }
}

async function ensureDevServerRunning(forceRestart = false) {
  if (forceRestart) {
    await killServerProcesses();
  }

  const active = await isPortActive(devServerPort);
  if (active && !forceRestart) {
    return true;
  }

  if (isDevServerStarting) return;
  isDevServerStarting = true;

  console.log(`[DEV-SERVER] Menjalankan Vite dev server pada port ${devServerPort}...`);
  try {
    devServerProcess = spawn('cmd.exe', ['/c', 'npm run dev'], {
      cwd: BASE_DIR,
      stdio: 'ignore',
      detached: false
    });

    devServerProcess.on('exit', (code) => {
      console.log(`[DEV-SERVER] Dev server berhenti dengan status: ${code}`);
      devServerProcess = null;
      isDevServerStarting = false;
    });

    setTimeout(() => {
      isDevServerStarting = false;
    }, 4000);
  } catch (err) {
    console.error('[DEV-SERVER-ERR]', err.message);
    isDevServerStarting = false;
  }
}

function updateStatus(statusObj) {
  let current = {};
  try {
    if (fs.existsSync(STATUS_FILE)) {
      current = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
    }
  } catch (e) {}

  const updated = {
    ...current,
    ...statusObj,
    queueLength: commandQueue.length,
    isBusyExecuting,
    currentCommand: currentExecutingCommand,
    lastExecutionResult,
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(STATUS_FILE, JSON.stringify(updated, null, 2), 'utf8');
  return updated;
}

// Send WhatsApp message through Baileys socket
async function sendWhatsAppMessage(jid, text, quoted = null) {
  if (!sock) {
    console.error('[WA-SEND] Socket not connected');
    return null;
  }
  try {
    let payloadText = text;
    if (payloadText.length > 4000) {
      payloadText = payloadText.slice(0, 3950) + '\n... [pesan dipotong agar muat di WhatsApp]';
    }

    const sent = await sock.sendMessage(jid, { text: payloadText }, quoted ? { quoted } : {});
    if (sent?.key?.id) {
      sentMessageIds.add(sent.key.id);
      if (sentMessageIds.size > 500) {
        const first = sentMessageIds.values().next().value;
        sentMessageIds.delete(first);
      }
    }
    console.log(`[WA-SEND] Message delivered to ${jid}`);
    return sent;
  } catch (err) {
    console.error(`[WA-SEND-ERROR] Failed to send message to ${jid}:`, err.message);
    return null;
  }
}

// Ambil pesan user terakhir dari transcript jika perintah dikirim di luar WA (misal langsung dari IDE)
function getLastUserPromptFromTranscript() {
  try {
    if (!fs.existsSync(TRANSCRIPT_PATH)) return null;
    const content = fs.readFileSync(TRANSCRIPT_PATH, 'utf8');
    const lines = content.trim().split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const entry = JSON.parse(lines[i]);
        if (entry.source === 'USER_INPUT' && entry.content) {
          const trimmed = entry.content.trim();
          if (trimmed.startsWith('[AUTO-RETRY SYSTEM')) continue;
          return trimmed;
        }
      } catch (e) {}
    }
  } catch (e) {
    console.error('[GET-LAST-PROMPT-ERR]', e.message);
  }
  return null;
}

// Deteksi dinamis port LanguageServer dan CSRF token jika berubah
function refreshLanguageServerDetails() {
  try {
    const cp = require('child_process');
    const psCmd = `(Get-CimInstance Win32_Process | Where-Object { $_.Name -like '*language_server*' } | Select-Object -First 1).CommandLine`;
    const cmdLine = cp.execSync(`powershell -NoProfile -Command "${psCmd}"`, { encoding: 'utf8', timeout: 5000 });
    if (cmdLine) {
      const tokenMatch = cmdLine.match(/--csrf_token\s+([a-zA-Z0-9-]+)/);
      if (tokenMatch && tokenMatch[1]) {
        CSRF_TOKEN = tokenMatch[1];
        console.log(`[DISCOVERY] Updated CSRF_TOKEN: ${CSRF_TOKEN}`);
      }
      const bridgeUrlMatch = cmdLine.match(/--host_bridge_url=http:\/\/127\.0\.0\.1:(\d+)/);
      if (bridgeUrlMatch && bridgeUrlMatch[1]) {
        LS_PORT = parseInt(bridgeUrlMatch[1], 10) + 1;
        console.log(`[DISCOVERY] Updated LS_PORT: ${LS_PORT}`);
      }
    }
  } catch (e) {
    console.warn('[DISCOVERY-WARN] Failed to refresh LanguageServer details:', e.message);
  }
}

// Forward incoming user prompt into Antigravity AI IDE
function forwardToAntigravity(promptText, retried = false) {
  return new Promise((resolve, reject) => {
    console.log(`[ANTIGRAVITY-FWD] Forwarding prompt to IDE: "${promptText}"`);

    const data = JSON.stringify({
      cascadeId: CASCADE_ID,
      items: [{ text: promptText }]
    });

    const req = https.request({
      hostname: '127.0.0.1',
      port: LS_PORT,
      path: '/exa.language_server_pb.LanguageServerService/SendUserCascadeMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-codeium-csrf-token': CSRF_TOKEN,
        'Content-Length': Buffer.byteLength(data)
      },
      agent: httpsAgent,
      timeout: 15000
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const ok = res.statusCode === 200;
        console.log(`[ANTIGRAVITY-FWD] Status: ${res.statusCode}, Body: ${body}`);
        resolve(ok);
      });
    });

    req.on('error', async (err) => {
      console.error('[ANTIGRAVITY-FWD-ERR]', err.message);
      if (!retried && (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT')) {
        console.log('[ANTIGRAVITY-FWD] Mencoba me-refresh port & token LanguageServer...');
        refreshLanguageServerDetails();
        try {
          const retryOk = await forwardToAntigravity(promptText, true);
          return resolve(retryOk);
        } catch (retryErr) {
          return reject(retryErr);
        }
      }
      reject(err);
    });

    req.write(data);
    req.end();
  });
}

// Eksekusi Antrian Perintah Secara Sekuensial
async function processNextInQueue() {
  if (isBusyExecuting || commandQueue.length === 0) return;

  const nextItem = commandQueue.shift();
  isBusyExecuting = true;
  currentExecutingCommand = nextItem.text;
  lastKnownUserPrompt = nextItem.text;
  autoRetryCount = 0;
  isRetrying = false;

  lastExecutionResult = {
    status: 'RUNNING',
    command: currentExecutingCommand,
    error: null,
    timestamp: new Date().toISOString()
  };
  updateStatus({ isBusyExecuting: true, currentCommand: nextItem.text });

  console.log(`[QUEUE] Memulai eksekusi antrian: "${nextItem.text}" (${commandQueue.length} tersisa di antrian)`);

  // Beritahu pengguna bahwa perintahnya mulai dieksekusi
  await sendWhatsAppMessage(
    nextItem.remoteJid,
    `🚀 *Mengeksekusi Antrian Perintah:*\n"${nextItem.text}"\n\n🤖 Sedang diproses oleh AI Antigravity...`
  );

  // Set timeout batas waktu eksekusi 4 menit agar antrian tidak macet jika terjadi crash
  if (executionTimeoutTimer) clearTimeout(executionTimeoutTimer);
  executionTimeoutTimer = setTimeout(async () => {
    console.warn('[QUEUE] Batas waktu eksekusi terlampaui (timeout 4 menit). Melepaskan antrian...');
    const failedCmd = currentExecutingCommand || nextItem.text;
    lastExecutionResult = {
      status: 'ERROR',
      command: failedCmd,
      error: 'Batas Waktu Eksekusi Terlampaui (Timeout 4 Menit)',
      timestamp: new Date().toISOString()
    };
    const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
    await sendWhatsAppMessage(
      targetJid,
      `❌ *STATUS: ERROR (Batas Waktu Terlampaui)*\n━━━━━━━━━━━━━━━━━━━━━━━━\n📝 *Perintah:* "${failedCmd}"\n🛑 *Status:* *ERROR*\n⚠️ *Kendala:* Eksekusi melebihi batas waktu 4 menit dan tidak terselesaikan.\n\n🔄 *Sistem Otomatis:*\n• Antrian dibersihkan (0 pending).\n• Dev Server (Port 3000) dan WhatsApp Bridge dipastikan tetap aktif.`
    );
    isBusyExecuting = false;
    currentExecutingCommand = null;
    autoRetryCount = 0;
    isRetrying = false;
    commandQueue.length = 0;
    updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });
    ensureDevServerRunning(true);
  }, 240000);

  try {
    await forwardToAntigravity(nextItem.text);
  } catch (err) {
    console.error('[QUEUE-ERR]', err.message);
    const failedCmd = nextItem.text;
    lastExecutionResult = {
      status: 'ERROR',
      command: failedCmd,
      error: err.message,
      timestamp: new Date().toISOString()
    };
    isBusyExecuting = false;
    currentExecutingCommand = null;
    autoRetryCount = 0;
    isRetrying = false;
    commandQueue.length = 0;
    updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });
    ensureDevServerRunning(true);
    await sendWhatsAppMessage(
      nextItem.remoteJid,
      `❌ *STATUS: ERROR (Gagal Menjalankan Perintah)*\n━━━━━━━━━━━━━━━━━━━━━━━━\n📝 *Perintah:* "${failedCmd}"\n🛑 *Status:* *ERROR*\n⚠️ *Kendala:* ${err.message}\n\n🔄 Dev Server direstart & Bridge WA siap menerima perintah baru.`
    );
  }
}

// Inisialisasi posisi transcript agar log lama tidak dikirim ulang
function initTranscriptMonitoring() {
  try {
    if (fs.existsSync(TRANSCRIPT_PATH)) {
      const stats = fs.statSync(TRANSCRIPT_PATH);
      transcriptFileSize = stats.size;
      
      const content = fs.readFileSync(TRANSCRIPT_PATH, 'utf8');
      const lines = content.trim().split('\n');
      for (let i = lines.length - 1; i >= 0; i--) {
        try {
          const entry = JSON.parse(lines[i]);
          if (entry.step_index !== undefined) {
            lastProcessedStepIndex = entry.step_index;
            break;
          }
        } catch (e) {}
      }
      console.log(`[TRANSCRIPT] Initialized at byte ${transcriptFileSize}, last stepIndex: ${lastProcessedStepIndex}`);
    }
  } catch (e) {
    console.error('[TRANSCRIPT-INIT-ERR]', e.message);
  }
}

// Cek pembaruan transcript untuk menangkap jawaban selesai dari AI atau error
async function checkTranscriptUpdates() {
  try {
    if (!fs.existsSync(TRANSCRIPT_PATH)) return;
    const stats = fs.statSync(TRANSCRIPT_PATH);
    if (stats.size <= transcriptFileSize) return;

    const fd = fs.openSync(TRANSCRIPT_PATH, 'r');
    const newBytesLength = stats.size - transcriptFileSize;
    const buffer = Buffer.alloc(newBytesLength);
    fs.readSync(fd, buffer, 0, newBytesLength, transcriptFileSize);
    fs.closeSync(fd);

    transcriptFileSize = stats.size;
    const newContent = buffer.toString('utf8');
    const lines = newContent.split('\n').map(l => l.trim()).filter(Boolean);

    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (entry.step_index <= lastProcessedStepIndex) continue;
        lastProcessedStepIndex = entry.step_index;

        // Tangkap prompt user baru dari chat IDE langsung
        if (entry.source === 'USER_INPUT' && entry.content) {
          const trimmedPrompt = entry.content.trim();
          if (!trimmedPrompt.startsWith('[AUTO-RETRY SYSTEM')) {
            lastKnownUserPrompt = trimmedPrompt;
            if (!isRetrying) {
              currentExecutingCommand = trimmedPrompt;
              isBusyExecuting = true;
              autoRetryCount = 0;
            }
          }
        }

        const lineStr = typeof line === 'string' ? line : JSON.stringify(line);
        const isExecutionError = (
          (entry.status === 'ERROR' && entry.source !== 'USER_INPUT') ||
          (entry.source === 'MODEL' && entry.status === 'ERROR') ||
          (entry.source === 'SYSTEM' && lineStr.includes('was canceled with result:')) ||
          (lineStr.includes('Agent execution terminated due to error') && entry.source !== 'USER_INPUT') ||
          (lineStr.includes('Unknown: Agent execution terminated') && entry.source !== 'USER_INPUT')
        );

        if (isExecutionError) {
          const failedCmd = currentExecutingCommand || lastKnownUserPrompt || getLastUserPromptFromTranscript() || 'Perintah yang sedang diproses';
          console.log(`[TRANSCRIPT] Terdeteksi Error pada step ${entry.step_index} ("Agent execution terminated due to error")! Perintah: "${failedCmd}"`);

          if (executionTimeoutTimer) clearTimeout(executionTimeoutTimer);

          if (autoRetryCount < MAX_AUTO_RETRIES) {
            autoRetryCount++;
            isRetrying = true;
            console.log(`[AUTO-RETRY] Auto-Run On Error aktif! Memulai percobaan ${autoRetryCount} dari ${MAX_AUTO_RETRIES}...`);

            lastExecutionResult = {
              status: 'RETRYING',
              command: failedCmd,
              error: 'Unknown: Agent execution terminated due to error.',
              retryAttempt: autoRetryCount,
              maxRetries: MAX_AUTO_RETRIES,
              timestamp: new Date().toISOString()
            };

            updateStatus({
              isBusyExecuting: true,
              currentCommand: `[Auto-Retry ${autoRetryCount}/${MAX_AUTO_RETRIES}] ${failedCmd}`
            });

            // 1. Matikan fungsi server lama & restart dev server port 3000 secara bersih
            await ensureDevServerRunning(true);

            // 2. Pastikan bridge WA tetap tersambung
            ensureWaSocketHealthy();

            // 3. Kirim notifikasi ke WhatsApp bahwa Auto-Retry sedang dijalankan secara otomatis
            const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
            await sendWhatsAppMessage(
              targetJid,
              `⚠️ *STATUS: KENDALA RUNTIME TERDETEKSI*\n━━━━━━━━━━━━━━━━━━━━━━━━\n🛑 *Kendala:* Unknown: Agent execution terminated due to error.\n📝 *Perintah:* "${failedCmd}"\n\n🔄 *AUTO-RUN ON ERROR (Percobaan ${autoRetryCount}/${MAX_AUTO_RETRIES}):*\n• Dev Server (Port 3000) telah direstart bersih.\n• AI Agent Antigravity otomatis dipicu dan dijalankan ulang sekarang...\n⏳ Mohon tunggu sebentar, eksekusi sedang dilanjutkan.`
            );

            // 4. Jeda 2.5 detik lalu trigger Antigravity IDE kembali secara otomatis!
            setTimeout(async () => {
              try {
                const autoRetryPrompt = `[AUTO-RETRY SYSTEM - Percobaan ${autoRetryCount}/${MAX_AUTO_RETRIES}]\n` +
                  `Sistem Watchdog mendeteksi eksekusi perintah sebelumnya terhenti di tengah jalan karena kendala runtime platform ('Agent execution terminated due to error').\n` +
                  `Server Vite port 3000 dan bridge WhatsApp sudah direstart bersih dan online.\n` +
                  `Instruksi: Silakan langsung lanjutkan dan tuntaskan perintah pengguna berikut sampai selesai:\n\n` +
                  `"${failedCmd}"`;

                console.log(`[AUTO-RETRY] Mengirim prompt auto-trigger ke Antigravity LanguageServer...`);
                await forwardToAntigravity(autoRetryPrompt);

                // Set timer timeout 4 menit untuk sesi auto-retry ini
                executionTimeoutTimer = setTimeout(async () => {
                  console.warn('[QUEUE] Timeout pada auto-retry...');
                  isBusyExecuting = false;
                  currentExecutingCommand = null;
                  autoRetryCount = 0;
                  isRetrying = false;
                  updateStatus({ isBusyExecuting: false, currentCommand: null });
                  ensureDevServerRunning(true);
                }, 240000);
              } catch (retryErr) {
                console.error('[AUTO-RETRY-TRIGGER-ERR]', retryErr.message);
              }
            }, 2500);

          } else {
            // Batas maksimal auto-retry tercapai (2x berturut-turut)
            console.log(`[AUTO-RETRY] Batas maksimum auto-retry (${MAX_AUTO_RETRIES}) telah tercapai.`);
            lastExecutionResult = {
              status: 'ERROR',
              command: failedCmd,
              error: `Batas auto-retry tercapai (${MAX_AUTO_RETRIES}x gagal)`,
              timestamp: new Date().toISOString()
            };

            autoRetryCount = 0;
            isRetrying = false;
            isBusyExecuting = false;
            currentExecutingCommand = null;
            commandQueue.length = 0;
            updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });

            // 1. Matikan fungsi server lama & restart dev server secara bersih
            await ensureDevServerRunning(true);

            // 2. Pastikan bridge WA tetap menyala & sehat
            ensureWaSocketHealthy();

            // 3. Kirim notifikasi status ERROR eksplisit ke WhatsApp
            const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
            await sendWhatsAppMessage(
              targetJid,
              `❌ *STATUS: ERROR (Batas Auto-Run Tercapai)*\n━━━━━━━━━━━━━━━━━━━━━━━━\n📝 *Perintah:* "${failedCmd}"\n🛑 *Status:* *ERROR*\n⚠️ *Kendala:* Eksekusi telah dicoba ulang otomatis sebanyak ${MAX_AUTO_RETRIES}x namun runtime tetap mengalami error.\n\n🔄 *Kondisi Sistem:*\n• Dev Server (Port 3000) & Bridge WA tetap ON & standby.\n• Antrian dibersihkan (0 pending).\n💡 *Saran:* Silakan periksa kembali instruksi atau sederhanakan perintah.`
            );
          }
        } else if (entry.source === 'MODEL' && entry.type === 'PLANNER_RESPONSE' && entry.status === 'DONE') {
          const hasToolCalls = Array.isArray(entry.tool_calls) && entry.tool_calls.length > 0;
          if (entry.content && !hasToolCalls) {
            console.log(`[TRANSCRIPT] Terdeteksi jawaban final AI (step ${entry.step_index})! Mengirim ke WhatsApp...`);

            // Reset counter auto-retry karena eksekusi telah berhasil tuntas!
            autoRetryCount = 0;
            isRetrying = false;

            lastExecutionResult = {
              status: 'SUCCESS',
              command: currentExecutingCommand || lastKnownUserPrompt || 'Perintah selesai',
              error: null,
              timestamp: new Date().toISOString()
            };

            const waResponse = `🤖 *Jawaban Antigravity AI:*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${entry.content}\n━━━━━━━━━━━━━━━━━━━━━━━━\n✅ *Status: Selesai.*`;
            
            const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
            sendWhatsAppMessage(targetJid, waResponse);

            // Perintah selesai! Bersihkan timer timeout
            if (executionTimeoutTimer) clearTimeout(executionTimeoutTimer);
            isBusyExecuting = false;
            currentExecutingCommand = null;
            updateStatus({ isBusyExecuting: false, currentCommand: null });
            ensureDevServerRunning(false);

            // Jalankan antrian berikutnya jika ada
            if (commandQueue.length > 0) {
              setTimeout(() => {
                processNextInQueue();
              }, 1500);
            }
          }
        }
      } catch (e) {}
    }
  } catch (err) {
    console.error('[TRANSCRIPT-CHECK-ERR]', err.message);
  }
}

// Local HTTP Server on Port 3899 for programmatic dispatch
function startHttpServer() {
  const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/send') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const payload = JSON.parse(body || '{}');
          const messageText = payload.text || payload.message || '';
          const target = payload.to || TARGET_PHONE;
          const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

          if (!messageText) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Text is required' }));
            return;
          }

          const result = await sendWhatsAppMessage(jid, messageText);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: !!result }));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    } else if (req.method === 'GET' && req.url === '/status') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: sock ? 'CONNECTED' : 'DISCONNECTED',
        targetPhone: TARGET_PHONE,
        queueLength: commandQueue.length,
        isBusyExecuting,
        lastProcessedStepIndex
      }));
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(BRIDGE_HTTP_PORT, '127.0.0.1', () => {
    console.log(`[HTTP-BRIDGE] Local API running on http://127.0.0.1:${BRIDGE_HTTP_PORT}`);
  });
}

async function startWhatsAppBridge() {
  console.log('[WA-BRIDGE] Menginisialisasi koneksi WhatsApp...');
  updateStatus({ status: 'CONNECTING' });

  initTranscriptMonitoring();
  setInterval(checkTranscriptUpdates, 1000);

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`[WA-BRIDGE] Baileys WA v${version.join('.')}, isLatest: ${isLatest}`);

  sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
    browser: ['Chrome (Windows)', 'Chrome', '124.0.0']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr && !sock.authState.creds.registered) {
      console.log('[WA-BRIDGE] Meminta Kode Pairing...');
      try {
        await QRCode.toFile(QR_IMAGE_PATH, qr);
      } catch (e) {}

      await delay(3000);
      try {
        const rawCode = await sock.requestPairingCode(TARGET_PHONE);
        const formattedCode = rawCode ? `${rawCode.slice(0, 4)}-${rawCode.slice(4)}` : rawCode;
        console.log(`\n📲 KODE PAIRING WHATSAPP: ${formattedCode}\n`);
        updateStatus({ status: 'WAITING_PAIRING_CODE', pairingCode: formattedCode });
      } catch (err) {
        console.error('[WA-BRIDGE] Gagal meminta pairing code:', err.message);
      }
    }

    if (connection === 'close') {
      const statusCode = (lastDisconnect?.error?.output?.statusCode);
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log(`[WA-BRIDGE] Koneksi terputus: ${lastDisconnect?.error?.message}, Reconnect: ${shouldReconnect}`);

      if (statusCode === DisconnectReason.loggedOut) {
        try { fs.rmSync(AUTH_DIR, { recursive: true, force: true }); } catch (e) {}
        updateStatus({ status: 'LOGGED_OUT' });
        setTimeout(() => startWhatsAppBridge(), 5000);
      } else {
        updateStatus({ status: 'RECONNECTING' });
        setTimeout(() => startWhatsAppBridge(), 3000);
      }
    } else if (connection === 'open') {
      const userJid = sock.user?.id || '';
      const phone = userJid.split(':')[0] || userJid.split('@')[0];
      const name = sock.user?.name || 'Admin Kanomas';

      console.log(`\n🎉 [WA-BRIDGE] TERHUBUNG KE WHATSAPP! Akun: ${name} (+${phone})\n`);

      updateStatus({
        status: 'CONNECTED',
        connectedPhone: phone,
        connectedName: name,
        pairingCode: null
      });
    }
  });

  // Message Listener (Catch user instructions & forward to Antigravity)
  sock.ev.on('messages.upsert', async (m) => {
    try {
      if (!m.messages || m.messages.length === 0) return;
      const msg = m.messages[0];

      if (sentMessageIds.has(msg.key.id)) return;

      const remoteJid = msg.key.remoteJid || '';

      // ATURAN KETAT:
      // Hanya pesan yang dikirim ke DIRI SENDIRI ("Message Yourself") yang diakui sebagai perintah!
      // Jika remoteJid adalah kontak orang lain atau grup (@g.us), ABAIKAN 100%!
      if (remoteJid.endsWith('@g.us')) {
        return; // Abaikan pesan grup
      }

      const remoteDigits = remoteJid.replace(/@.*$/, '').replace(/[^0-9]/g, '');
      const myPhoneDigits = (sock.user?.id || '').split(':')[0].replace(/[^0-9]/g, '');
      const myLidDigits = (sock.user?.lid || '').split(':')[0].replace(/[^0-9]/g, '');

      const isSelfChat = (
        remoteDigits === TARGET_PHONE ||
        remoteDigits === TARGET_PHONE_ALT ||
        remoteDigits === myPhoneDigits ||
        (myLidDigits && remoteDigits === myLidDigits) ||
        remoteJid.includes(TARGET_PHONE) ||
        remoteJid.includes(TARGET_PHONE_ALT)
      );

      if (!isSelfChat) {
        // PESAN UNTUK ORANG LAIN: JANGAN PROSES SAMA SEKALI!
        return;
      }

      let text = '';
      if (msg.message?.conversation) text = msg.message.conversation;
      else if (msg.message?.extendedTextMessage?.text) text = msg.message.extendedTextMessage.text;

      text = text ? text.trim() : '';
      if (!text) return;

      // Abaikan pesan otomatis yang berasal dari bot sendiri
      if (text.includes('Jawaban Antigravity AI:') || 
          text.includes('Instruksi Diterima') || 
          text.includes('Perintah Masuk Antrian') || 
          text.includes('Mengeksekusi Antrian Perintah') || 
          text.includes('MENU WHATSAPP COMMANDER')) {
        return;
      }

      console.log(`[WA-RECEIVE-SELF] Perintah ke Diri Sendiri dari ${remoteJid}: "${text}"`);

      // Quick command: PING
      if (text.toLowerCase() === 'ping') {
        await sendWhatsAppMessage(remoteJid, `🏓 Pong! Antigravity AI Bridge aktif.\nWaktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`, msg);
        return;
      }

      // Quick command: RESTART
      if (text.toLowerCase() === 'restart') {
        if (executionTimeoutTimer) clearTimeout(executionTimeoutTimer);
        isBusyExecuting = false;
        commandQueue.length = 0;
        updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });
        await ensureDevServerRunning(true);
        await sendWhatsAppMessage(remoteJid, `🔄 *Restart Berhasil!*\n━━━━━━━━━━━━━━━━━━━━━━━━\n• Semua perintah direset (antrian: 0).\n• Vite Dev Server (Port 3000) dimulai ulang.\n• WhatsApp Bridge tetap online & siap menerima instruksi.`, msg);
        return;
      }

      // Quick command: STATUS
      if (text.toLowerCase() === 'status') {
        const queueInfo = commandQueue.length > 0 
          ? `⏳ Sedang mengantri: ${commandQueue.length} perintah.` 
          : '✨ Tidak ada antrian pending.';

        let execInfo = '💤 *Status AI: Siap Menerima Instruksi Baru.*';
        if (isBusyExecuting) {
          if (isRetrying) {
            execInfo = `🔄 *Status AI: Auto-Run On Error Aktif*\nPercobaan ke-${lastExecutionResult.retryAttempt || 1} dari ${lastExecutionResult.maxRetries || 2}\n📝 *Perintah:* "${currentExecutingCommand || '-'}"`;
          } else {
            execInfo = `⚙️ *Status AI: Sedang Aktif Memproses*\n📝 *Perintah:* "${currentExecutingCommand || '-'}"`;
          }
        } else if (lastExecutionResult.status === 'ERROR') {
          const timeStr = lastExecutionResult.timestamp 
            ? new Date(lastExecutionResult.timestamp).toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB'
            : '';
          execInfo = `❌ *Status AI: ERROR (Perintah Terakhir Gagal)*\n🛑 *Status:* *ERROR*\n⚠️ *Kendala:* ${lastExecutionResult.error || 'Unknown: Agent execution terminated due to error.'}\n📝 *Perintah yang gagal:* "${lastExecutionResult.command || '-'}"\n🕒 *Waktu Kejadian:* ${timeStr}\n💡 Dev server telah direstart bersih & sistem siap menerima instruksi ulang.`;
        } else if (lastExecutionResult.status === 'SUCCESS') {
          execInfo = `✅ *Status AI: Selesai Normal*\n📝 *Perintah terakhir:* "${lastExecutionResult.command || '-'}"\n💤 Saat ini siap menerima instruksi baru.`;
        }

        const devActive = await isPortActive(devServerPort);
        const devInfo = devActive ? '🟢 Aktif (Port 3000)' : '🔴 Tidak Aktif';
        
        await sendWhatsAppMessage(remoteJid, `📊 *STATUS WHATSAPP COMMANDER*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${execInfo}\n\n${queueInfo}\n💻 Dev Server: ${devInfo}\n🌐 WA Bridge: Online (Port ${BRIDGE_HTTP_PORT})\n🕒 Waktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`, msg);
        return;
      }

      // Quick command: MENU / HELP
      if (text.toLowerCase() === 'menu' || text.toLowerCase() === 'help') {
        const helpText = `🤖 *ANTIGRAVITY AI WHATSAPP BRIDGE*
━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Kirim perintah ke Diri Sendiri kapan saja:*
• Bebas ketik teks instruksi apa saja (bahasa Indonesia natural).
• Jika sedang ada tugas yang berjalan, perintah Anda otomatis masuk ANTRIAN.
• Jika terjadi error runtime, sistem memiliki fitur *AUTO-RUN ON ERROR* otomatis!
• Pesan ke orang lain atau grup otomatis diabaikan aman.

*Perintah Khusus:*
• *status* : Cek status AI, Dev Server, dan antrian
• *restart* : Hentikan semua proses macet, restart Dev Server & Bridge
• *ping* : Cek koneksi bot`;
        await sendWhatsAppMessage(remoteJid, helpText, msg);
        return;
      }

      // MANAJEMEN ANTRIAN PERINTAH:
      // Jika AI sedang sibuk menjalankan perintah sebelumnya, masukkan ke antrian!
      if (isBusyExecuting) {
        commandQueue.push({ remoteJid, text, msg });
        updateStatus({ queueLength: commandQueue.length });
        
        const queueNotice = `⏳ *Perintah Masuk Antrian (#${commandQueue.length}):*\n"${text}"\n\nSedang ada perintah lain yang sedang diproses oleh AI Antigravity. Perintah Anda akan otomatis dieksekusi setelah giliran tiba.`;
        await sendWhatsAppMessage(remoteJid, queueNotice, msg);
        return;
      }

      // Jika AI sedang idle, langsung jalankan!
      isBusyExecuting = true;
      currentExecutingCommand = text;
      lastKnownUserPrompt = text;
      autoRetryCount = 0;
      isRetrying = false;
      lastExecutionResult = {
        status: 'RUNNING',
        command: text,
        error: null,
        timestamp: new Date().toISOString()
      };
      updateStatus({ isBusyExecuting: true, currentCommand: text });

      await sendWhatsAppMessage(remoteJid, `⏳ *Instruksi Diterima & Sedang Diproses:*\n"${text}"\n\n🤖 Sedang diproses langsung oleh AI Antigravity... Mohon tunggu sebentar.`, msg);

      if (executionTimeoutTimer) clearTimeout(executionTimeoutTimer);
      executionTimeoutTimer = setTimeout(async () => {
        console.warn('[QUEUE] Timeout 4 menit terlampaui. Melepaskan status busy...');
        const failedCmd = currentExecutingCommand || text;
        lastExecutionResult = {
          status: 'ERROR',
          command: failedCmd,
          error: 'Batas Waktu Eksekusi Terlampaui (Timeout 4 Menit)',
          timestamp: new Date().toISOString()
        };
        const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
        await sendWhatsAppMessage(
          targetJid,
          `❌ *STATUS: ERROR (Batas Waktu Terlampaui)*\n━━━━━━━━━━━━━━━━━━━━━━━━\n📝 *Perintah:* "${failedCmd}"\n🛑 *Status:* *ERROR*\n⚠️ *Kendala:* Eksekusi melebihi batas waktu 4 menit dan tidak terselesaikan.\n\n🔄 *Sistem Otomatis:*\n• Antrian dibersihkan (0 pending).\n• Dev Server (Port 3000) dan WhatsApp Bridge dipastikan tetap aktif.`
        );
        isBusyExecuting = false;
        currentExecutingCommand = null;
        autoRetryCount = 0;
        isRetrying = false;
        commandQueue.length = 0;
        updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });
        ensureDevServerRunning(true);
      }, 240000);

      try {
        await forwardToAntigravity(text);
      } catch (err) {
        console.error('[WA-FWD-ERR]', err);
        const failedCmd = text;
        lastExecutionResult = {
          status: 'ERROR',
          command: failedCmd,
          error: err.message,
          timestamp: new Date().toISOString()
        };
        isBusyExecuting = false;
        currentExecutingCommand = null;
        autoRetryCount = 0;
        isRetrying = false;
        updateStatus({ isBusyExecuting: false, currentCommand: null });
        ensureDevServerRunning(true);
        await sendWhatsAppMessage(
          remoteJid,
          `❌ *STATUS: ERROR (Gagal Menjalankan Perintah)*\n━━━━━━━━━━━━━━━━━━━━━━━━\n📝 *Perintah:* "${failedCmd}"\n🛑 *Status:* *ERROR*\n⚠️ *Kendala:* ${err.message}\n\n🔄 Dev Server direstart & Bridge WA siap menerima perintah baru.`,
          msg
        );
      }

    } catch (err) {
      console.error('[WA-MSG-ERR]', err);
    }
  });
}

// Global Exception Handlers agar server tidak crash
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION]', reason);
});

startHttpServer();
startWhatsAppBridge();
ensureDevServerRunning();
setInterval(() => {
  ensureDevServerRunning();
}, 45000);
