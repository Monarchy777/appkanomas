/**
 * WhatsApp Commander Bridge Service for Aplikasi Kanomas (Two-Way AI Agent)
 * Seamlessly connects WhatsApp (+6282112114222) with Google Antigravity AI IDE.
 * Any prompt sent from WhatsApp is automatically fed into Antigravity's chat canvas,
 * executed by the AI agent with full tool capabilities, and the agent's response
 * is automatically sent back to WhatsApp!
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
    // Truncate or clean if too large for standard WA message
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
      timeout: 10000
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

// Initialize transcript position to ignore past logs on startup
function initTranscriptMonitoring() {
  try {
    if (fs.existsSync(TRANSCRIPT_PATH)) {
      const stats = fs.statSync(TRANSCRIPT_PATH);
      transcriptFileSize = stats.size;
      
      // Find the latest step_index
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

// Periodically check transcript for AI model final responses
function checkTranscriptUpdates() {
  try {
    if (!fs.existsSync(TRANSCRIPT_PATH)) return;
    const stats = fs.statSync(TRANSCRIPT_PATH);
    if (stats.size <= transcriptFileSize) return;

    // Read newly appended bytes
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

        // Check if this is a completed model response intended for the user
        if (entry.source === 'MODEL' && entry.type === 'PLANNER_RESPONSE' && entry.status === 'DONE') {
          // If it has content and no tool calls, it's the final answer to the user!
          const hasToolCalls = Array.isArray(entry.tool_calls) && entry.tool_calls.length > 0;
          if (entry.content && !hasToolCalls) {
            console.log(`[TRANSCRIPT] Detected final AI answer (step ${entry.step_index})! Sending to WhatsApp...`);
            
            // Format response for WhatsApp (clean markdown if needed)
            const waResponse = `🤖 *Jawaban Antigravity AI:*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${entry.content}`;
            
            const targetJid = `${TARGET_PHONE}@s.whatsapp.net`;
            sendWhatsAppMessage(targetJid, waResponse);
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
        setTimeout(() => startWhatsAppBridge(), 4000);
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

      const remoteJid = msg.key.remoteJid;
      const senderJid = msg.key.participant || remoteJid || '';
      const senderDigits = senderJid.replace(/@.*$/, '').replace(/[^0-9]/g, '');

      // Verify authorization: target phone, self chat, or matching LID
      const isTarget = senderDigits.includes(TARGET_PHONE) || 
                       senderDigits.includes(TARGET_PHONE_ALT) || 
                       senderDigits.includes('8211211422') ||
                       remoteJid.includes('@lid'); // WhatsApp Multi-device LID
      const isSelf = msg.key.fromMe;

      if (!isTarget && !isSelf) return;

      let text = '';
      if (msg.message?.conversation) text = msg.message.conversation;
      else if (msg.message?.extendedTextMessage?.text) text = msg.message.extendedTextMessage.text;

      text = text ? text.trim() : '';
      if (!text) return;

      // Ignore messages generated by our bot itself
      if (text.includes('Jawaban Antigravity AI:') || 
          text.includes('Instruksi Diterima') || 
          text.includes('MENU WHATSAPP COMMANDER')) {
        return;
      }

      console.log(`[WA-RECEIVE] Pesan dari ${remoteJid}: "${text}"`);

      // Quick command: PING
      if (text.toLowerCase() === 'ping') {
        await sendWhatsAppMessage(remoteJid, `🏓 Pong! Antigravity AI Bridge aktif.\nWaktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`, msg);
        return;
      }

      // Quick command: MENU
      if (text.toLowerCase() === 'menu' || text.toLowerCase() === 'help') {
        const helpText = `🤖 *ANTIGRAVITY AI WHATSAPP BRIDGE*
━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Anda sekarang bisa mengetik perintah APA SAJA persis seperti di chat box IDE!*

Contoh yang bisa Anda ketik langsung:
• _"Rapihkan folder dan file kanomasnya"_
• _"Ubah tema dzikir jadi hijau zamrud"_
• _"Build APK terbaru dan deploy ke hostinger"_
• _"Cek apakah ada error di kode"_
• _"Tambahkan tombol baru di Al-Quran"_

Setiap pesan yang Anda kirim akan langsung diproses oleh AI Antigravity, dan jawabannya akan dikirimkan kembali ke sini!`;
        await sendWhatsAppMessage(remoteJid, helpText, msg);
        return;
      }

      // FOR ALL OTHER PROMPTS: Forward to Antigravity AI!
      await sendWhatsAppMessage(remoteJid, `⏳ *Instruksi Diterima:*\n"${text}"\n\n🤖 Sedang diproses langsung oleh AI Antigravity... Mohon tunggu sebentar.`, msg);

      await forwardToAntigravity(text);

    } catch (err) {
      console.error('[WA-MSG-ERR]', err);
    }
  });
}

startHttpServer();
startWhatsAppBridge();
