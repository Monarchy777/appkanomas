import React, { useState } from 'react';
import { ShieldCheck, Phone, Menu, X, ChevronDown, Sparkles, Download } from 'lucide-react';
import { Icon3DStatus, Icon3DCetak, Icon3DWhatsApp } from './Icons3D';

export default function Header({
  role,
  onRoleChange,
  nextPrayer,
  onOpenLookup,
  onOpenWhatsAppCenter,
  onOpenDocumentPrint
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* 1. Baris Legalitas Resmi (Navy Kontras & Berwibawa) */}
      <div className="bg-[#0f172a] text-[10px] sm:text-xs py-1.5 px-3 sm:px-6 flex items-center justify-between text-slate-300 gap-2">
        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span className="text-amber-400 font-bold truncate">
            Kemenag RI: PPIU U.310
          </span>
          <span className="text-slate-500 hidden md:inline">• PIHK 9120313132406</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-emerald-400 hidden sm:inline font-bold">Akreditasi A</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-300 flex-shrink-0">
          <span className="hidden sm:inline text-slate-400">Tasikmalaya</span>
          <a
            href="https://wa.me/628112113363"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-bold whitespace-nowrap"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>0811-2113-363</span>
          </a>
        </div>
      </div>

      {/* 2. Bar Utama Aplikasi (Background Putih Bersih) */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Logo & Identitas Kanomas */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/assets/logo-kanomas.png"
            alt="Logo Kanomas"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain flex-shrink-0 drop-shadow-sm"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 font-sans">
                KANOMAS
              </span>
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                TASIKMALAYA
              </span>
            </div>
            <p className="text-xs text-amber-900/90 font-medium tracking-wide truncate">
              Sahabat Ibadah & Ziarah Anda
            </p>
          </div>
        </div>

        {/* Tombol Aksi Cepat & Menu */}
        <div className="flex items-center gap-2">
          {/* Tombol Download APK Android */}
          <a
            href="/kanomas.apk"
            download="Kanomas.apk"
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 text-xs font-black px-2.5 sm:px-3 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(245,158,11,0.25)] transition active:scale-95 border border-amber-300"
            title="Download File APK Android Asli"
          >
            <Download className="w-3.5 h-3.5 text-slate-900 shrink-0" />
            <span className="hidden sm:inline">Download APK</span>
            <span className="sm:hidden font-black text-[11px]">APK</span>
          </a>

          {/* Tombol Cepat WhatsApp CS */}
          <a
            href="https://wa.me/628112113363"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.25)] transition active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bantuan CS</span>
            <span className="sm:hidden">CS</span>
          </a>

          {/* Tombol Menu Layanan */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition relative active:scale-95 shadow-sm"
            aria-label="Menu Layanan"
          >
            {showMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. Dropdown Menu Layanan Tambahan (Card Putih Bersih dengan Ikon 3D Berwarna) */}
      {showMenu && (
        <div className="px-4 py-3 bg-white border-t border-slate-200 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => {
                setShowMenu(false);
                onOpenLookup();
              }}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 text-left transition flex items-center gap-3 shadow-sm"
            >
              <Icon3DStatus size={36} className="flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xs">Cek Status</strong>
                <span className="text-[10px] text-slate-500">Pendaftaran jamaah</span>
              </div>
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                onOpenDocumentPrint();
              }}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-left transition flex items-center gap-3 shadow-sm"
            >
              <Icon3DCetak size={36} className="flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xs">Cetak Dokumen</strong>
                <span className="text-[10px] text-slate-500">Kuitansi & surat</span>
              </div>
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                onOpenWhatsAppCenter();
              }}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition flex items-center gap-3 col-span-2 sm:col-span-1 shadow-sm"
            >
              <Icon3DWhatsApp size={36} className="flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xs">WhatsApp Center</strong>
                <span className="text-[10px] text-slate-500">Kirim pesan resmi</span>
              </div>
            </button>
          </div>

          {/* Baris Khusus Download File APK Android */}
          <a
            href="/kanomas.apk"
            download="Kanomas.apk"
            onClick={() => setShowMenu(false)}
            className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 hover:border-amber-400 flex items-center justify-between gap-3 shadow-xs transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-900 flex items-center justify-center font-black shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                <Download className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <strong className="text-slate-900 block text-xs font-bold flex items-center gap-1.5">
                  Download File APK Android
                  <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-wide">69 MB</span>
                </strong>
                <span className="text-[10px] text-slate-600 block">Bisa disimpan & dibagikan via WhatsApp tanpa browser</span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-white border border-amber-200 px-2.5 py-1 rounded-lg shrink-0 group-hover:bg-amber-500 group-hover:text-white transition">
              Unduh
            </span>
          </a>

          {/* Opsi Ganti Mode Akun */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Mode Tampilan:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  onRoleChange('jamaah');
                  setShowMenu(false);
                }}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${
                  role === 'jamaah'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Jamaah
              </button>
              <button
                onClick={() => {
                  onRoleChange('mitra');
                  setShowMenu(false);
                }}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${
                  role === 'mitra'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Mitra
              </button>
              <button
                onClick={() => {
                  onRoleChange('admin');
                  setShowMenu(false);
                }}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${
                  role === 'admin'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
