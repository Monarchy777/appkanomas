/**
 * WhatsApp Commander Bridge Service for Aplikasi Kanomas
 * Allows remote control, execution of updates, deploy, build APK,
 * and command running via WhatsApp messages from +6282112114222.
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
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '../../');
const AUTH_DIR = path.resolve(__dirname, 'auth_info');
const STATUS_FILE = path.resolve(__dirname, 'status.json');
const QR_IMAGE_PATH = path.resolve(__dirname, 'qr-code.png');

// Target phone numbers (handles 12 digits or 11 digits format)
const TARGET_PHONE = '6282112114222';
const TARGET_PHONE_ALT = '628211211422';

if (!fs.existsSync(AUTH_DIR)) {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
}

let sock = null;
let isExecuting = false;
const sentMessageIds = new Set();

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

function runShellCommand(cmd, cwd = BASE_DIR, timeoutMs = 300000) {
  return new Promise((resolve) => {
    console.log(`[SHELL] Executing: ${cmd} (in ${cwd})`);
    exec(cmd, { cwd, timeout: timeoutMs, maxBuffer: 10 * 1024 * 1024, shell: 'powershell.exe' }, (error, stdout, stderr) => {
      resolve({
        success: !error,
        code: error ? error.code : 0,
        stdout: stdout ? stdout.trim() : '',
        stderr: stderr ? stderr.trim() : ''
      });
    });
  });
}

async function sendWhatsAppMessage(jid, text, quoted = null) {
  if (!sock) return null;
  try {
    const sent = await sock.sendMessage(jid, { text }, quoted ? { quoted } : {});
    if (sent?.key?.id) {
      sentMessageIds.add(sent.key.id);
      // Clean old IDs to prevent memory leak
      if (sentMessageIds.size > 200) {
        const first = sentMessageIds.values().next().value;
        sentMessageIds.delete(first);
      }
    }
    return sent;
  } catch (err) {
    console.error(`[WA-SEND-ERROR] Failed to send message to ${jid}:`, err.message);
    return null;
  }
}

async function handleCommand(remoteJid, userMessage, rawMsg) {
  const cleanText = userMessage.trim();
  const lower = cleanText.toLowerCase();

  console.log(`[WA-CMD] Processing instruction: "${cleanText}" from ${remoteJid}`);

  // 1. HELP / MENU
  if (lower === 'menu' || lower === 'help' || lower === 'bantuan' || lower === '?') {
    const menuText = `🤖 *MENU WHATSAPP COMMANDER - APLIKASI KANOMAS*
━━━━━━━━━━━━━━━━━━━━━━━━
Silakan kirim salah satu perintah berikut:

1️⃣ *status*
   🔍 Cek status aplikasi, branch Git, commit, dan koneksi server.

2️⃣ *deploy*
   🚀 Build produksi Vite & sinkronisasi otomatis ke server Hostinger.

3️⃣ *build apk*
   📱 Kompilasi file APK Android terbaru (v2026.1.2) siap unduh.

4️⃣ *update*
   ⚡ Jalankan full build (web & APK) dan publish ke Hostinger.

5️⃣ *cmd <perintah>*
   💻 Eksekusi perintah PowerShell apa pun langsung di server.
   _Contoh: \`cmd git log -n 3 --oneline\`_

6️⃣ *ping*
   🏓 Tes koneksi bridge dan bot WhatsApp.
━━━━━━━━━━━━━━━━━━━━━━━━
_Kirim pesan kapan saja untuk mengeksekusi instruksi._`;
    await sendWhatsAppMessage(remoteJid, menuText, rawMsg);
    return;
  }

  // 2. PING
  if (lower === 'ping') {
    await sendWhatsAppMessage(remoteJid, `🏓 *Pong!*\nSistem WhatsApp Bridge Aplikasi Kanomas AKTIF dan siap menerima perintah.\n🕒 Waktu Server: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`, rawMsg);
    return;
  }

  // 3. STATUS
  if (lower === 'status' || lower === 'cek') {
    await sendWhatsAppMessage(remoteJid, `⏳ Sedang memeriksa status server dan aplikasi...`, rawMsg);
    
    const gitBranch = await runShellCommand('git branch --show-current');
    const gitLog = await runShellCommand('git log -1 --pretty=format:"%h - %s (%cr)"');
    const gitStatus = await runShellCommand('git status --short');
    
    let apkSize = 'Tidak ditemukan';
    const apkPath = path.resolve(BASE_DIR, 'public/kanomas.apk');
    if (fs.existsSync(apkPath)) {
      const stats = fs.statSync(apkPath);
      apkSize = (stats.size / (1024 * 1024)).toFixed(2) + ' MB';
    }

    const report = `📊 *STATUS APLIKASI KANOMAS*
━━━━━━━━━━━━━━━━━━━━━━━━
🌿 *Branch Aktif:* ${gitBranch.stdout || 'dev'}
🔖 *Commit Terakhir:* ${gitLog.stdout || '-'}
📂 *Perubahan Lokal:* ${gitStatus.stdout ? '\n' + gitStatus.stdout : 'Bersih (Clean Tree)'}
📱 *Ukuran APK Siap Unduh:* ${apkSize}
🌐 *Domain Utama:* https://appkanomas.mediasosial.net
🕒 *Waktu:* ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
━━━━━━━━━━━━━━━━━━━━━━━━
✅ Sistem beroperasi dengan normal.`;
    await sendWhatsAppMessage(remoteJid, report, rawMsg);
    return;
  }

  // 4. DEPLOY / UPDATE
  if (lower === 'deploy' || lower === 'update') {
    if (isExecuting) {
      await sendWhatsAppMessage(remoteJid, `⚠️ Sedang ada proses lain yang berjalan. Harap tunggu sebentar sampai selesai.`, rawMsg);
      return;
    }

    isExecuting = true;
    updateStatus({ lastCommand: 'deploy', commandRunning: true });

    await sendWhatsAppMessage(remoteJid, `🚀 *Memulai Proses Deploy ke Server Hostinger...*\n\n1. Menjalankan npm run build\n2. Menyiapkan paket produksi\n3. Sinkronisasi ke branch main & hostinger GitHub\n\n⏳ Mohon tunggu sekitar 30-60 detik...`, rawMsg);

    try {
      const result = await runShellCommand('powershell -ExecutionPolicy Bypass -File .\\deploy_hostinger.ps1');
      isExecuting = false;
      updateStatus({ commandRunning: false, lastDeployResult: result.success ? 'SUCCESS' : 'FAILED' });

      if (result.success) {
        const successMsg = `✅ *Deploy Hostinger Berhasil Selesai!*
━━━━━━━━━━━━━━━━━━━━━━━━
Kode produksi terbaru sudah berhasil di-push ke branch \`main\` dan \`hostinger\` di GitHub.

🌐 *Akses Web:* https://appkanomas.mediasosial.net
📱 *File APK:* Tersedia di server
🕒 *Selesai:* ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB

_Catatan: Jika diperlukan, buka hPanel Hostinger -> Git -> Klik 'Deploy' untuk refresh server langsung._`;
        await sendWhatsAppMessage(remoteJid, successMsg, rawMsg);
      } else {
        const errorMsg = `❌ *Deploy Mengalami Kendala:*
━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`
${result.stderr || result.stdout || 'Terjadi kesalahan saat deploy'}
\`\`\`
Silakan periksa log terminal.`;
        await sendWhatsAppMessage(remoteJid, errorMsg, rawMsg);
      }
    } catch (e) {
      isExecuting = false;
      await sendWhatsAppMessage(remoteJid, `❌ Error eksekusi deploy: ${e.message}`, rawMsg);
    }
    return;
  }

  // 5. BUILD APK
  if (lower === 'build apk' || lower === 'apk' || lower === 'rebuild apk') {
    if (isExecuting) {
      await sendWhatsAppMessage(remoteJid, `⚠️ Sedang ada proses lain yang berjalan. Harap tunggu.`, rawMsg);
      return;
    }

    isExecuting = true;
    updateStatus({ lastCommand: 'build-apk', commandRunning: true });

    await sendWhatsAppMessage(remoteJid, `📱 *Memulai Kompilasi APK Android Terbaru...*\n\n1. Build aset Vite\n2. Sync Capacitor Android\n3. Gradle assembleDebug\n\n⏳ Proses ini memerlukan waktu 1-2 menit. Anda akan dikabari begitu selesai.`, rawMsg);

    try {
      const buildVite = await runShellCommand('npm run build');
      if (!buildVite.success) throw new Error('Vite build gagal: ' + (buildVite.stderr || buildVite.stdout));

      const capSync = await runShellCommand('npx cap sync android');
      if (!capSync.success) throw new Error('Capacitor sync gagal');

      const gradleBuild = await runShellCommand('cd android; .\\gradlew.bat assembleDebug');
      if (!gradleBuild.success) throw new Error('Gradle assembleDebug gagal');

      // Copy APK to public and dist
      await runShellCommand('Copy-Item "android\\app\\build\\outputs\\apk\\debug\\app-debug.apk" -Destination "public\\kanomas.apk" -Force');
      await runShellCommand('Copy-Item "android\\app\\build\\outputs\\apk\\debug\\app-debug.apk" -Destination "dist\\kanomas.apk" -Force');

      let apkSize = '19.4 MB';
      const apkPath = path.resolve(BASE_DIR, 'public/kanomas.apk');
      if (fs.existsSync(apkPath)) {
        apkSize = (fs.statSync(apkPath).size / (1024 * 1024)).toFixed(2) + ' MB';
      }

      isExecuting = false;
      updateStatus({ commandRunning: false, lastApkBuild: new Date().toISOString() });

      const apkSuccessMsg = `🎉 *Build APK Berhasil Diselesaikan!*
━━━━━━━━━━━━━━━━━━━━━━━━
📦 *Nama File:* kanomas.apk
⚖️ *Ukuran:* ${apkSize}
📱 *Versi:* 2026.1.2 (Terbaru)
🔗 *Link Download Langsung:*
https://appkanomas.mediasosial.net/kanomas.apk

_Silakan unduh dan pasang di HP Anda!_`;
      await sendWhatsAppMessage(remoteJid, apkSuccessMsg, rawMsg);
    } catch (e) {
      isExecuting = false;
      await sendWhatsAppMessage(remoteJid, `❌ Gagal membuat APK: ${e.message}`, rawMsg);
    }
    return;
  }

  // 6. CMD (Custom PowerShell Command Execution)
  if (lower.startsWith('cmd ')) {
    const cmdToRun = cleanText.slice(4).trim();
    if (!cmdToRun) {
      await sendWhatsAppMessage(remoteJid, `⚠️ Perintah kosong. Format: \`cmd <perintah>\``, rawMsg);
      return;
    }

    await sendWhatsAppMessage(remoteJid, `⏳ Menjalankan: \`${cmdToRun}\`...`, rawMsg);

    const res = await runShellCommand(cmdToRun);
    let output = res.stdout || res.stderr || (res.success ? '(Perintah berhasil dijalankan tanpa output)' : 'Gagal');

    // Limit output length for WhatsApp
    if (output.length > 2500) {
      output = output.slice(0, 2500) + '\n... [output dipotong karena terlalu panjang]';
    }

    const cmdReply = `💻 *Hasil Eksekusi:*\n\`${cmdToRun}\`\n━━━━━━━━━━━━━━━━━━━━━━━━\n\`\`\`\n${output}\n\`\`\`\nExit Code: ${res.code}`;
    await sendWhatsAppMessage(remoteJid, cmdReply, rawMsg);
    return;
  }

  // 7. DEFAULT / UNKNOWN COMMAND
  const defaultReply = `Halo Pak! 👋 Perintah "*${cleanText}*" diterima.\n\nKetik *menu* untuk melihat daftar tindakan cepat yang tersedia (seperti *deploy*, *status*, atau *build apk*), atau gunakan format *cmd <perintah>* untuk menjalankan perintah terminal.`;
  await sendWhatsAppMessage(remoteJid, defaultReply, rawMsg);
}

async function startWhatsAppBridge() {
  console.log('[WA-BRIDGE] Menginisialisasi koneksi WhatsApp...');
  updateStatus({ status: 'CONNECTING' });

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

    // Pairing code logic
    if (qr && !sock.authState.creds.registered) {
      console.log('[WA-BRIDGE] Sesi belum terautentikasi. Meminta Kode Pairing...');
      try {
        await QRCode.toFile(QR_IMAGE_PATH, qr);
      } catch (e) {}

      // Wait 3 seconds for connection to be ready for pairing code request
      await delay(3000);
      try {
        const rawCode = await sock.requestPairingCode(TARGET_PHONE);
        const formattedCode = rawCode ? `${rawCode.slice(0, 4)}-${rawCode.slice(4)}` : rawCode;
        
        console.log('\n============================================================');
        console.log(`📲 KODE PAIRING WHATSAPP: ${formattedCode}`);
        console.log(`Target Nomor: +${TARGET_PHONE}`);
        console.log('Buka WhatsApp di HP -> Perangkat Tertaut -> Tautkan Perangkat');
        console.log('-> Pilih "Tautkan dengan nomor telepon saja"');
        console.log(`-> Masukkan Kode: ${formattedCode}`);
        console.log('============================================================\n');

        updateStatus({
          status: 'WAITING_PAIRING_CODE',
          pairingCode: formattedCode,
          targetPhone: TARGET_PHONE,
          qrImagePath: QR_IMAGE_PATH
        });
      } catch (err) {
        console.error('[WA-BRIDGE] Gagal meminta kode pairing:', err.message);
        try {
          const rawCodeAlt = await sock.requestPairingCode(TARGET_PHONE_ALT);
          const formattedCodeAlt = rawCodeAlt ? `${rawCodeAlt.slice(0, 4)}-${rawCodeAlt.slice(4)}` : rawCodeAlt;
          console.log(`📲 KODE PAIRING ALTERNATIF: ${formattedCodeAlt}`);
          updateStatus({
            status: 'WAITING_PAIRING_CODE',
            pairingCode: formattedCodeAlt,
            targetPhone: TARGET_PHONE_ALT
          });
        } catch (errAlt) {
          console.error('[WA-BRIDGE] Gagal meminta kode pairing alternatif:', errAlt.message);
        }
      }
    }

    if (connection === 'close') {
      const statusCode = (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode);
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log(`[WA-BRIDGE] Koneksi terputus: ${lastDisconnect?.error?.message || statusCode}, Reconnect: ${shouldReconnect}`);

      if (statusCode === DisconnectReason.loggedOut) {
        console.log('[WA-BRIDGE] Sesi keluar/logged out. Menghapus folder auth...');
        try {
          fs.rmSync(AUTH_DIR, { recursive: true, force: true });
        } catch (e) {}
        updateStatus({ status: 'LOGGED_OUT', pairingCode: null });
        setTimeout(() => startWhatsAppBridge(), 5000);
      } else {
        updateStatus({ status: 'RECONNECTING' });
        setTimeout(() => startWhatsAppBridge(), 4000);
      }
    } else if (connection === 'open') {
      const userJid = sock.user?.id || '';
      const phone = userJid.split(':')[0] || userJid.split('@')[0];
      const name = sock.user?.name || 'Admin Kanomas';
      
      console.log(`\n🎉 [WA-BRIDGE] TERHUBUNG KE WHATSAPP!`);
      console.log(`Nama Akun: ${name} (+${phone})\n`);

      updateStatus({
        status: 'CONNECTED',
        connectedPhone: phone,
        connectedName: name,
        pairingCode: null
      });

      // Send initial confirmation test message directly to user!
      const initialGreeting = `Assalamu'alaikum Warahmatullahi Wabarakatuh Pak! 🌟

🤖 *Modul Eksekusi WhatsApp Aplikasi Kanomas Berhasil Terhubung!*

Sistem bridge komputer ini sekarang sudah AKTIF dan siap menerima serta mengeksekusi instruksi Anda kapan saja.

📋 *Daftar Perintah Cepat:*
• *menu* : Tampilkan menu lengkap
• *status* : Cek status git & server
• *deploy* : Build web & update Hostinger
• *build apk* : Kompilasi APK Android terbaru
• *cmd <perintah>* : Eksekusi perintah PowerShell apa pun

_Silakan kirim pesan ke chat ini atau ke diri sendiri untuk mencoba!_`;

      const primaryJid = `${TARGET_PHONE}@s.whatsapp.net`;
      await sendWhatsAppMessage(primaryJid, initialGreeting);

      // Also send to self userJid if different
      if (phone && phone !== TARGET_PHONE) {
        await sendWhatsAppMessage(`${phone}@s.whatsapp.net`, initialGreeting);
      }
    }
  });

  // Message Listener
  sock.ev.on('messages.upsert', async (m) => {
    try {
      if (!m.messages || m.messages.length === 0) return;
      const msg = m.messages[0];

      // Ignore if sent by our bot
      if (sentMessageIds.has(msg.key.id)) return;

      const remoteJid = msg.key.remoteJid;
      const senderJid = msg.key.participant || remoteJid || '';
      const senderDigits = senderJid.replace(/@.*$/, '').replace(/[^0-9]/g, '');

      // Verify authorization: must match target phone or self chat
      const isTargetSender = senderDigits.includes(TARGET_PHONE) || 
                             senderDigits.includes(TARGET_PHONE_ALT) || 
                             senderDigits.includes('8211211422');
      const isSelfChat = msg.key.fromMe && (remoteJid.includes(TARGET_PHONE) || remoteJid.includes(TARGET_PHONE_ALT) || remoteJid.includes('8211211422') || remoteJid.includes(senderDigits));

      if (!isTargetSender && !isSelfChat) {
        return; // Ignore unauthorized messages
      }

      // Extract message text
      let text = '';
      if (msg.message?.conversation) text = msg.message.conversation;
      else if (msg.message?.extendedTextMessage?.text) text = msg.message.extendedTextMessage.text;

      text = text ? text.trim() : '';
      if (!text) return;

      // Prevent bot from replying to its own messages that have bot signatures
      if (text.includes('MENU WHATSAPP COMMANDER') || 
          text.includes('STATUS APLIKASI KANOMAS') || 
          text.includes('Memulai Proses Deploy') || 
          text.includes('Deploy Hostinger Berhasil') || 
          text.includes('Build APK Berhasil')) {
        return;
      }

      // Execute command
      await handleCommand(remoteJid, text, msg);
    } catch (err) {
      console.error('[WA-BRIDGE] Error handling message:', err);
    }
  });
}

// Check arguments
const action = process.argv[2];
if (action === 'logout') {
  console.log('[WA-BRIDGE] Melakukan logout dan membersihkan autentikasi...');
  try {
    fs.rmSync(AUTH_DIR, { recursive: true, force: true });
    updateStatus({ status: 'LOGGED_OUT', pairingCode: null });
    console.log('[WA-BRIDGE] Selesai logout.');
  } catch (e) {
    console.error('[WA-BRIDGE] Error logout:', e);
  }
  process.exit(0);
} else {
  startWhatsAppBridge();
}
