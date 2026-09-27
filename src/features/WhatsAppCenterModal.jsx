import React, { useState } from 'react';
import { MessageSquare, Send, Copy, CheckCircle, User, Phone, X, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { db } from '../services/db';
import { COMPANY_PROFILE } from '../services/initialSeed';

const TEMPLATES = [
  {
    id: 'lead_welcome',
    category: 'Pendaftaran',
    title: 'Konfirmasi Pendaftaran Calon Jamaah',
    template: `*Assalamu'alaikum Warahmatullahi Wabarakatuh* Bapak/Ibu {NAMA_JAMAAH},

Terima kasih atas kepercayaannya memilih *PT Kanomas Artha Wisata (Cabang Tasikmalaya)* untuk rencana ibadah ke Baitullah.

📋 *Rincian Booking Anda:*
• Paket: *{NAMA_PAKET}*
• Estimasi Berangkat: *{TANGGAL_BERANGKAT}*
• Status: *Terdaftar di Sistem Kanomas*

💳 *Informasi Pembayaran Rekening Resmi Perusahaan:*
• Bank: *Bank Syariah Indonesia (BSI)*
• No. Rekening: *7128839011*
• Atas Nama: *PT KANOMAS ARTHA WISATA*
_(Mohon hanya mentransfer ke rekening resmi atas nama PT di atas)_

Silakan kirimkan bukti transfer DP atau hubungi kami jika membutuhkan bantuan formulir pembuatan paspor.

Jazakumullahu Khairan Katsiran.
*Tim Layanan Jamaah Kanomas Tasikmalaya*
Hotline: 0811-2113-363`
  },
  {
    id: 'tabungan_deposit',
    category: 'Tabungan BSI',
    title: 'Konfirmasi Setoran Tabungan Umrah BSI',
    template: `*Bismillah, Notifikasi Setoran Tabungan Umroh Kanomas Berkah*

Yth. Bapak/Ibu {NAMA_JAMAAH},
Alhamdulillah, setoran tabungan umrah Anda telah tercatat dengan rincian:

💰 *Rincian Saldo Tabungan BSI:*
• Rekening BSI: *{NO_REKENING}*
• Saldo Saat Ini: *Rp {SALDO_TABUNGAN}*
• Target Paket: *Rp {TARGET_TABUNGAN}*
• Progres: *{PROGRES_PERSEN}% Menuju Keberangkatan*

Semoga Allah SWT senantiasa melapangkan rezeki dan memudahkan langkah Bapak/Ibu menuju Baitullah Makkah & Madinah. Aamiin.

Salam hangat,
*PT Kanomas Artha Wisata - Cabang Tasikmalaya*`
  },
  {
    id: 'passport_reminder',
    category: 'Dokumen',
    title: 'Pengingat Berkas Paspor & Vaksinasi',
    template: `*Assalamu'alaikum Warahmatullahi Wabarakatuh* Bapak/Ibu {NAMA_JAMAAH},

Mengingat jadwal keberangkatan paket *{NAMA_PAKET}* semakin dekat pada *{TANGGAL_BERANGKAT}*, mohon kesediaan Bapak/Ibu untuk melengkapi berkas:

📑 *Checklist Berkas:*
1. Paspor Asli (Masa berlaku minimal 7 bulan sebelum berangkat)
2. Buku / Sertifikat Vaksin Meningitis & Polio Resmi
3. Pas Foto 4x6 latar belakang putih (fokus wajah 80%)

Bagi yang belum memiliki paspor, Kanomas menyediakan *Surat Rekomendasi Resmi Kemenag* untuk mempermudah proses pembuatan paspor di Kantor Imigrasi Tasikmalaya.

Silakan konfirmasi jika berkas sudah siap untuk kami jadwalkan penyerahan. Terima kasih.
*Admin Operasional Kanomas Tasikmalaya*`
  },
  {
    id: 'nusuk_guide',
    category: 'Ibadah',
    title: 'Panduan Reservasi Izin Raudhah via Nusuk',
    template: `*Assalamu'alaikum Warahmatullahi Wabarakatuh* Bapak/Ibu Jamaah {NAMA_JAMAAH},

Berikut kami kirimkan panduan resmi pemesanan izin ibadah sholat di *Raudhah Syarifah (Masjid Nabawi Madinah)* melalui aplikasi resmi Pemerintah Arab Saudi: *Nusuk (Eatmarna)*.

📲 *Langkah Singkat:*
1. Unduh aplikasi 'Nusuk' di Google Play Store atau Apple App Store.
2. Pilih bahasa 'English' atau 'Bahasa Indonesia'.
3. Registrasi menggunakan Nomor Paspor & Nomor Visa Umrah Anda.
4. Pilih menu 'Pray in the Noble Rawdah' dan tentukan jadwal yang tersedia.

Bapak/Ibu juga dapat berkonsultasi langsung dengan Muthawif Kanomas kami: *{MUTHAWIF}* saat tiba di hotel Madinah.

Selamat menunaikan ibadah dengan khusyuk dan mabrur.`
  },
  {
    id: 'mitra_broadcast',
    category: 'Syiar Mitra',
    title: 'Broadcast Syiar Paket Umrah Hemat 2026',
    template: `*Bismillah, Panggilan Suci Menuju Baitullah Bersama Kanomas*

Bapak/Ibu dan sahabat yang dirahmati Allah,
PT Kanomas Artha Wisata (Cabang Tasikmalaya) resmi membuka pendaftaran Umrah Musim 1447H / 2026 bergaransi kepastian berangkat & hotel dekat Ka'bah.
(Izin PPIU No. U.310 / 2021 | PIHK No. 9120313132406)

✨ *Program Unggulan 2026:*
1. *Promo Spesial Buy 1 Get 1 Free* (Bayar 1 Berangkat 2) - Oman Air
2. *Paket Bintang 4 Direct Garuda Indonesia* (Bonus Kereta Cepat Haramain)
3. *Program Shafa Pelataran Bintang 5* (Hotel Menempel Pintu Masjidil Haram)
4. *Haji Khusus Furoda VIP Tanpa Antre*
5. *Tabungan Umrah Syariah via BSI* mulai Rp 500.000 bebas biaya admin

Konsultasi dan pendaftaran resmi melalui tautan rujukan saya:
👉 {LINK_REFERRAL}

Atau silakan balas pesan ini untuk informasi tanggal keberangkatan dan brosur lengkap. Jazakumullahu khair!`
  }
];

export default function WhatsAppCenterModal({ onClose, defaultRecipientPhone, defaultRecipientName }) {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [recipientPhone, setRecipientPhone] = useState(defaultRecipientPhone || '');
  const [recipientName, setRecipientName] = useState(defaultRecipientName || 'Bapak/Ibu');
  const [copied, setCopied] = useState(false);

  // Load database lists for fast picker
  const jamaahList = db.getJamaah();
  const calonList = db.getCalonJamaah();
  const tabunganList = db.getTabungan();
  const mitraList = db.getMitra();

  // Populate dynamic variables
  const generateMessageText = () => {
    let text = selectedTemplate.template;
    text = text.replace(/{NAMA_JAMAAH}/g, recipientName || 'Bapak/Ibu');
    text = text.replace(/{NAMA_PAKET}/g, 'Paket Umroh Bintang 4 Garuda Indonesia');
    text = text.replace(/{TANGGAL_BERANGKAT}/g, '05 Oktober 2026');
    text = text.replace(/{NO_REKENING}/g, '7128839011 (BSI)');
    text = text.replace(/{SALDO_TABUNGAN}/g, '24.500.000');
    text = text.replace(/{TARGET_TABUNGAN}/g, '32.000.000');
    text = text.replace(/{PROGRES_PERSEN}/g, '76');
    text = text.replace(/{PENERBANGAN}/g, 'Garuda Indonesia (GA-980) Direct');
    text = text.replace(/{MUTHAWIF}/g, 'H. Irpan Hilmi, Lc., MA.');
    text = text.replace(/{KAMAR_MAKKAH}/g, 'Maysan Al Mashaer - Kamar 412');
    text = text.replace(/{LINK_REFERRAL}/g, `https://kanomastasikmalaya.com/?ref=${mitraList[0]?.code || 'KANOMAS-SYIAR-01'}`);
    return text;
  };

  const currentMessage = generateMessageText();

  const handleSendWhatsApp = () => {
    const cleanPhone = recipientPhone.replace(/[^0-9]/g, '');
    let targetUrl = '';
    if (cleanPhone) {
      const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
      targetUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(currentMessage)}`;
    } else {
      targetUrl = `https://wa.me/?text=${encodeURIComponent(currentMessage)}`;
    }
    window.open(targetUrl, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickSelectRecipient = (person) => {
    setRecipientName(person.name);
    setRecipientPhone(person.phone || '');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-emerald-50/70 border-b border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900">WhatsApp Bot & Message Center</h3>
                <span className="text-[10px] font-black uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                  Resmi Kanomas
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium">Template pesan otomatis untuk calon jamaah, jamaah aktif & mitra</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Template Selector Pills */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. Pilih Template Pesan Resmi
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase text-emerald-700 block">{tmpl.category}</span>
                  <span className="text-xs font-bold leading-tight mt-0.5">{tmpl.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recipient Input & Fast Picker */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                2. Target Penerima Pesan
              </span>
              {/* Quick Picker Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-500">
                <span className="text-[10px] text-slate-500">Pilih cepat:</span>
                {jamaahList.slice(0, 2).map((j) => (
                  <button
                    key={j.id}
                    onClick={() => handleQuickSelectRecipient(j)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-amber-50 text-amber-700 text-[10px] whitespace-nowrap"
                  >
                    {j.name.split(' ')[0]}
                  </button>
                ))}
                {calonList.slice(0, 2).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleQuickSelectRecipient(c)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-blue-50 text-blue-700 text-[10px] whitespace-nowrap"
                  >
                    {c.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Nama Penerima</label>
                <input
                  type="text"
                  placeholder="Contoh: H. Bambang Sulistyo"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Nomor WhatsApp (Opsional jika ingin share umum)</label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567801"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                3. Pratinjau Teks Pesan WhatsApp Siap Kirim
              </label>
              <button
                onClick={handleCopy}
                className="text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1 font-bold"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-sans text-xs text-slate-800 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto selection:bg-emerald-500">
              {currentMessage}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500">
            Terhubung langsung ke WhatsApp Web / WhatsApp App
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-300 shadow-xs"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin' : 'Salin Pesan'}</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Kirim via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
