import React, { useState } from 'react';
import { ShieldCheck, Phone, User, Briefcase, Award, MessageSquare, Printer, UserCheck, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#0c1620]/95 backdrop-blur-md border-b border-amber-900/30 text-slate-100 shadow-lg transition-all">
      {/* 1. Baris Legalitas Resmi (Tipis & Elegan) */}
      <div className="bg-[#070e15] text-[10px] sm:text-xs py-1 px-3 sm:px-6 flex items-center justify-between border-b border-white/5 text-slate-400">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex items-center gap-1 text-amber-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Kemenag RI: PPIU U.310 • PIHK 9120313132406</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-emerald-400 hidden sm:inline font-bold">Akreditasi A</span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-slate-300">
          <span className="hidden sm:inline text-slate-400">Cabang Tasikmalaya</span>
          <a
            href="https://wa.me/628112113363"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-bold"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>0811-2113-363</span>
          </a>
        </div>
      </div>

      {/* 2. Bar Utama Aplikasi */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Logo & Identitas Kanomas */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/assets/logo-kanomas.png"
            alt="Logo Kanomas"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain flex-shrink-0"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-white font-sans">
                KANOMAS
              </span>
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                TASIKMALAYA
              </span>
            </div>
            <p className="text-[10px] text-amber-200/80 font-serif italic truncate">
              Sahabat Ibadah & Ziarah Anda
            </p>
          </div>
        </div>

        {/* Tombol Aksi Cepat & Menu */}
        <div className="flex items-center gap-2">
          {/* Tombol Cepat WhatsApp CS */}
          <a
            href="https://wa.me/628112113363"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-[#142d20] hover:bg-[#1b3d2b] text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-600/40 transition shadow-sm active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Bantuan CS</span>
            <span className="sm:hidden">CS</span>
          </a>

          {/* Tombol Menu Layanan */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 transition relative active:scale-95"
            aria-label="Menu Layanan"
          >
            {showMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. Dropdown Menu Layanan Tambahan (Ringkas & Terkonsep) */}
      {showMenu && (
        <div className="px-4 py-3 bg-[#0a131b] border-t border-amber-900/30 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => {
                setShowMenu(false);
                onOpenLookup();
              }}
              className="p-3 rounded-2xl bg-[#101b25] border border-white/5 hover:border-emerald-500/40 text-left transition flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-600/30 flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block text-xs">Cek Status</strong>
                <span className="text-[10px] text-slate-400">Pendaftaran jamaah</span>
              </div>
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                onOpenDocumentPrint();
              }}
              className="p-3 rounded-2xl bg-[#101b25] border border-white/5 hover:border-amber-500/40 text-left transition flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 border border-amber-600/30 flex items-center justify-center flex-shrink-0">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block text-xs">Cetak Dokumen</strong>
                <span className="text-[10px] text-slate-400">Kuitansi & surat</span>
              </div>
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                onOpenWhatsAppCenter();
              }}
              className="p-3 rounded-2xl bg-[#101b25] border border-white/5 hover:border-emerald-500/40 text-left transition flex items-center gap-2.5 col-span-2 sm:col-span-1"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-600/30 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block text-xs">WhatsApp Center</strong>
                <span className="text-[10px] text-slate-400">Kirim pesan resmi</span>
              </div>
            </button>
          </div>

          {/* Opsi Ganti Mode Akun */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Mode Tampilan:</span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  onRoleChange('jamaah');
                  setShowMenu(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                  role === 'jamaah'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Jamaah
              </button>
              <button
                onClick={() => {
                  onRoleChange('mitra');
                  setShowMenu(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                  role === 'mitra'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Mitra
              </button>
              <button
                onClick={() => {
                  onRoleChange('admin');
                  setShowMenu(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                  role === 'admin'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white'
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
