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
const CSRF_TOKEN = '2fe04268-a077-4265-bf2d-dc96df730999';
const LS_PORT = 54162;
const BRIDGE_HTTP_PORT = 3899;

const TARGET_PHONE = '6282112114222';
const TARGET_PHONE_ALT = '628211211422';

let sock = null;
let lastProcessedStepIndex = -1;
let transcriptFileSize = 0;
const sentMessageIds = new Set();
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// Antrian Perintah (Command Queue)
const commandQueue = [];
let isBusyExecuting = false;
let executionTimeoutTimer = null;

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

// Forward incoming user prompt into Antigravity AI IDE
function forwardToAntigravity(promptText) {
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

    req.on('error', (err) => {
      console.error('[ANTIGRAVITY-FWD-ERR]', err.message);
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
    const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
    await sendWhatsAppMessage(
      targetJid,
      `⚠️ *Batas Waktu Eksekusi Terlampaui (Timeout 4 Menit):*\nPerintah sebelumnya dihentikan demi stabilitas.\n\n🔄 *Sistem Otomatis:*\n• Antrian dibersihkan.\n• Dev Server (Port 3000) dan WhatsApp Bridge dipastikan tetap aktif.`
    );
    isBusyExecuting = false;
    commandQueue.length = 0;
    updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });
    ensureDevServerRunning(true);
  }, 240000);

  try {
    await forwardToAntigravity(nextItem.text);
  } catch (err) {
    console.error('[QUEUE-ERR]', err.message);
    isBusyExecuting = false;
    commandQueue.length = 0;
    updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });
    ensureDevServerRunning(true);
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

// Cek pembaruan transcript untuk menangkap jawaban selesai dari AI
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

        const lineStr = typeof line === 'string' ? line : JSON.stringify(line);
        const isExecutionError = (
          (entry.status === 'ERROR' && entry.source !== 'USER_INPUT') ||
          (entry.source === 'MODEL' && entry.status === 'ERROR') ||
          (entry.source === 'SYSTEM' && lineStr.includes('was canceled with result:')) ||
          (lineStr.includes('Agent execution terminated due to error') && entry.source !== 'USER_INPUT') ||
          (lineStr.includes('Unknown: Agent execution terminated') && entry.source !== 'USER_INPUT')
        );

        if (isExecutionError) {
          console.log(`[TRANSCRIPT] Terdeteksi Error pada step ${entry.step_index} ("Agent execution terminated due to error")!`);
          console.log('[RECOVERY] Mematikan fungsi server yang berjalan dan menyalakan kembali dev server & bridge WA...');

          if (executionTimeoutTimer) clearTimeout(executionTimeoutTimer);
          isBusyExecuting = false;
          commandQueue.length = 0;
          updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });

          // 1. Matikan fungsi server lama yang berjalan & jalankan ulang dev server secara bersih
          await ensureDevServerRunning(true);

          // 2. Pastikan bridge WA tetap menyala & sehat
          ensureWaSocketHealthy();

          // 3. Kirim notifikasi konfirmasi tindakan ke WhatsApp
          const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
          await sendWhatsAppMessage(
            targetJid,
            `⚠️ *Pemberitahuan Sistem (Pemulihan Kendala AI):*\nTerdeteksi gangguan: *Agent execution terminated due to error*.\n\n🔄 *Tindakan Otomatis Dilaksanakan:*\n• Fungsi server yang berjalan telah dimatikan dan direstart ulang (Port 3000).\n• WhatsApp Bridge dipastikan ON & online.\n• Antrian perintah direset agar siap menerima instruksi baru.`
          );
        } else if (entry.source === 'MODEL' && entry.type === 'PLANNER_RESPONSE' && entry.status === 'DONE') {
          const hasToolCalls = Array.isArray(entry.tool_calls) && entry.tool_calls.length > 0;
          if (entry.content && !hasToolCalls) {
            console.log(`[TRANSCRIPT] Terdeteksi jawaban final AI (step ${entry.step_index})! Mengirim ke WhatsApp...`);
            
            const waResponse = `🤖 *Jawaban Antigravity AI:*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${entry.content}\n━━━━━━━━━━━━━━━━━━━━━━━━\n✅ *Status: Selesai.*`;
            
            const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
            sendWhatsAppMessage(targetJid, waResponse);

            // Perintah selesai! Bersihkan timer timeout
            if (executionTimeoutTimer) clearTimeout(executionTimeoutTimer);
            isBusyExecuting = false;
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
        const execInfo = isBusyExecuting 
          ? '⚙️ Status AI: Sedang aktif memproses tugas.' 
          : '💤 Status AI: Siap menerima instruksi baru.';
        const devActive = await isPortActive(devServerPort);
        const devInfo = devActive ? '🟢 Aktif (Port 3000)' : '🔴 Tidak Aktif';
        
        await sendWhatsAppMessage(remoteJid, `📊 *STATUS WHATSAPP COMMANDER*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${execInfo}\n${queueInfo}\n💻 Dev Server: ${devInfo}\n🌐 WA Bridge: Online (Port ${BRIDGE_HTTP_PORT})\n🕒 Waktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`, msg);
        return;
      }

      // Quick command: MENU / HELP
      if (text.toLowerCase() === 'menu' || text.toLowerCase() === 'help') {
        const helpText = `🤖 *ANTIGRAVITY AI WHATSAPP BRIDGE*
━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Kirim perintah ke Diri Sendiri kapan saja:*
• Bebas ketik teks instruksi apa saja (bahasa Indonesia natural).
• Jika sedang ada tugas yang berjalan, perintah Anda otomatis masuk ANTRIAN.
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
      updateStatus({ isBusyExecuting: true, currentCommand: text });

      await sendWhatsAppMessage(remoteJid, `⏳ *Instruksi Diterima & Sedang Diproses:*\n"${text}"\n\n🤖 Sedang diproses langsung oleh AI Antigravity... Mohon tunggu sebentar.`, msg);

      if (executionTimeoutTimer) clearTimeout(executionTimeoutTimer);
      executionTimeoutTimer = setTimeout(async () => {
        console.warn('[QUEUE] Timeout 4 menit terlampaui. Melepaskan status busy...');
        const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
        await sendWhatsAppMessage(
          targetJid,
          `⚠️ *Batas Waktu Eksekusi Terlampaui (Timeout 4 Menit):*\nPerintah dihentikan demi stabilitas.\n\n🔄 *Sistem Otomatis:*\n• Antrian dibersihkan.\n• Dev Server (Port 3000) dan WhatsApp Bridge dipastikan tetap aktif.`
        );
        isBusyExecuting = false;
        commandQueue.length = 0;
        updateStatus({ isBusyExecuting: false, currentCommand: null, queueLength: 0 });
        ensureDevServerRunning(true);
      }, 240000);

      await forwardToAntigravity(text);

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
