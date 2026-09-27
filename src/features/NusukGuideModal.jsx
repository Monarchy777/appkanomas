import React from 'react';
import { ExternalLink, CheckCircle, AlertTriangle, ShieldCheck, Download, X, Clock, MapPin } from 'lucide-react';
import { EXTERNAL_SERVICES } from '../services/initialSeed';

export default function NusukGuideModal({ onClose }) {
  const nusukData = EXTERNAL_SERVICES.find(s => s.id === 'nusuk') || EXTERNAL_SERVICES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#14222e] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#064e3b] border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-white/20 text-white">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">Panduan & Akses Aplikasi Nusuk</h3>
                <span className="text-[10px] font-black uppercase bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                  Resmi KSA
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">Reservasi Izin Raudhah & Ibadah Umrah di Tanah Suci</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Quick Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200 space-y-1">
              <strong className="block text-amber-300 font-bold">Aturan Resmi Pemerintah Arab Saudi:</strong>
              <p className="text-[11px] leading-relaxed">
                Setiap jamaah <strong>wajib</strong> memiliki izin (tasreh) aktif di aplikasi Nusuk untuk masuk ke dalam <strong>Raudhah Syarifah</strong> di Masjid Nabawi Madinah. Tim Mutawwif Kanomas siap mendampingi proses reservasi slot jamaah.
              </p>
            </div>
          </div>

          {/* Quick Launcher Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              1. Buka atau Download Aplikasi Nusuk
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <a
                href={nusukData.androidUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-[#0f241a] hover:bg-[#153426] border border-emerald-600/40 text-center transition flex flex-col items-center justify-center gap-1 text-emerald-300 group shadow-sm"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition" />
                <span className="text-xs font-bold">Android (PlayStore)</span>
                <span className="text-[9px] text-slate-400">Google Play</span>
              </a>

              <a
                href={nusukData.iosUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-[#0f241a] hover:bg-[#153426] border border-emerald-600/40 text-center transition flex flex-col items-center justify-center gap-1 text-emerald-300 group shadow-sm"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition" />
                <span className="text-xs font-bold">iOS (App Store)</span>
                <span className="text-[9px] text-slate-400">Apple iPhone</span>
              </a>

              <a
                href={nusukData.webUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-[#0f241a] hover:bg-[#153426] border border-emerald-600/40 text-center transition flex flex-col items-center justify-center gap-1 text-emerald-300 group shadow-sm"
              >
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition" />
                <span className="text-xs font-bold">Web Nusuk.sa</span>
                <span className="text-[9px] text-slate-400">Browser Resmi</span>
              </a>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              2. Langkah Pemesanan Izin Raudhah & Umrah
            </span>
            <div className="space-y-2.5">
              {[
                {
                  step: '01',
                  title: 'Daftar Sebagai Pengunjung (Visitor)',
                  desc: 'Buka aplikasi Nusuk, pilih bahasa Inggris/Arab, tekan New User, lalu pilih tab "Visitor". Masukkan nomor visa, paspor, kebangsaan Indonesia, tanggal lahir, dan email aktif.'
                },
                {
                  step: '02',
                  title: 'Verifikasi Kode OTP',
                  desc: 'Masukkan 4 digit kode OTP yang dikirimkan ke email Anda. Buat kata sandi akun Nusuk Anda.'
                },
                {
                  step: '03',
                  title: 'Pilih "Pray in the Noble Rawdah"',
                  desc: 'Di menu utama, pilih menu Raudhah. Tentukan kategori: Men (Pria) atau Women (Wanita).'
                },
                {
                  step: '04',
                  title: 'Pilih Jadwal & Slot Waktu',
                  desc: 'Pilih tanggal keberadaan Anda di Madinah. Pilih jam slot yang berwarna hijau (tersedia). Centang persetujuan dan konfirmasi.'
                },
                {
                  step: '05',
                  title: 'Simpan QR Code Izin (Tasreh)',
                  desc: 'QR Code izin akan muncul. Simpan screenshot layar ini. Tunjukkan ke petugas Askar di pelataran pintu masuk Raudhah 15 menit sebelum waktu mulai.'
                }
              ].map((item) => (
                <div key={item.step} className="p-3 bg-[#111e29] border border-white/5 rounded-2xl flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-600/30 text-emerald-400 font-mono font-black text-xs flex items-center justify-center flex-shrink-0 border border-emerald-500/40">
                    {item.step}
                  </span>
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-white">{item.title}</h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assistance from Kanomas */}
          <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/30 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-orange-400 block">Perlu Bantuan Booking Nusuk?</span>
              <p className="text-[11px] text-slate-300">
                Tim Kanomas Tasikmalaya membantu proses registrasi visa & reservasi akun Nusuk untuk seluruh jamaah.
              </p>
            </div>
            <a
              href="https://wa.me/628112113363?text=Bismillah,%20saya%20membutuhkan%20bantuan%20panduan%20aplikasi%20Nusuk%20Kanomas"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs whitespace-nowrap shadow transition"
            >
              Hubungi CS
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0d1720] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Terintegrasi Sistem Resmi Kemenag KSA</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
}
