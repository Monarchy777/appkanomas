import React, { useState } from 'react';
import { ShieldCheck, Phone, User, Briefcase, Award, MessageSquare, Printer, UserCheck, Menu, X, ChevronDown } from 'lucide-react';

export default function Header({
  role,
  onRoleChange,
  nextPrayer,
  onOpenLookup,
  onOpenWhatsAppCenter,
  onOpenDocumentPrint
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0f1922] border-b border-amber-900/30 text-slate-100 shadow-md transition-all">
      {/* Top Bar Syar'i & Legalitas */}
      <div className="bg-[#091118] text-[10px] sm:text-xs py-1.5 px-3 sm:px-6 flex items-center justify-between border-b border-white/5 text-slate-300">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Resmi Kemenag RI: PPIU No. U.310 | PIHK No. 9120313132406</span>
          </span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-emerald-400 hidden md:inline font-medium">Akreditasi A</span>
        </div>

        <div className="flex items-center gap-3">
          {nextPrayer && (
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-0.5 rounded-full text-slate-300 border border-amber-900/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px]">{nextPrayer.name}</span>
              <span className="text-amber-300 font-mono font-bold text-[11px]">{nextPrayer.time} WIB</span>
            </div>
          )}
          <a
            href="https://wa.me/628112113363"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition font-medium"
          >
            <Phone className="w-3 h-3 text-orange-400" />
            <span className="font-mono">0811-2113-363</span>
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
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
              <span className="bg-[#b45309] text-white font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                TASIKMALAYA
              </span>
            </div>
            <p className="text-[10px] text-amber-200/70 font-serif italic truncate">
              Biro Perjalanan Umrah & Haji Khusus
            </p>
          </div>
        </div>

        {/* Desktop Quick Action Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onOpenWhatsAppCenter}
            className="flex items-center gap-1.5 bg-[#142d20] hover:bg-[#1b3d2b] text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-600/40 transition shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WA Center</span>
          </button>

          <button
            onClick={onOpenDocumentPrint}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs font-semibold px-3 py-1.5 rounded-xl border border-amber-900/50 transition shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-orange-400" />
            <span>Cetak Dokumen</span>
          </button>

          <button
            onClick={onOpenLookup}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 transition shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cek Status</span>
          </button>
        </div>

        {/* Role Switcher Pill & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {/* Simple Syar'i Role Switcher */}
          <button
            onClick={() => onRoleChange(role === 'jamaah' ? 'mitra' : role === 'mitra' ? 'admin' : 'jamaah')}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition shadow-sm ${
              role === 'admin'
                ? 'bg-purple-950/80 border-purple-500/60 text-purple-200 hover:bg-purple-900'
                : role === 'mitra'
                ? 'bg-blue-950/80 border-blue-500/60 text-blue-200 hover:bg-blue-900'
                : 'bg-[#1a2e24] border-emerald-600/50 text-emerald-200 hover:bg-[#233e31]'
            }`}
          >
            {role === 'admin' && <Briefcase className="w-3.5 h-3.5 text-purple-300" />}
            {role === 'mitra' && <Award className="w-3.5 h-3.5 text-blue-300" />}
            {role === 'jamaah' && <User className="w-3.5 h-3.5 text-emerald-300" />}
            <span className="capitalize">{role === 'jamaah' ? 'Jamaah' : role === 'mitra' ? 'Mitra' : 'Admin'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Mobile Utility Menu Button (Clean, prevents overflow on phone screen) */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
            aria-label="Menu Layanan"
          >
            {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown (Clean, Simple, Never Collides) */}
      {showMobileMenu && (
        <div className="lg:hidden px-4 py-3 bg-[#0d1720] border-t border-amber-900/30 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => {
                setShowMobileMenu(false);
                onOpenWhatsAppCenter();
              }}
              className="p-2.5 rounded-xl bg-[#142d20] border border-emerald-600/40 text-emerald-300 text-center flex flex-col items-center justify-center gap-1 font-bold"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px]">WA Center</span>
            </button>

            <button
              onClick={() => {
                setShowMobileMenu(false);
                onOpenDocumentPrint();
              }}
              className="p-2.5 rounded-xl bg-slate-800 border border-amber-900/40 text-amber-200 text-center flex flex-col items-center justify-center gap-1 font-bold"
            >
              <Printer className="w-4 h-4 text-orange-400" />
              <span className="text-[10px]">Cetak Surat</span>
            </button>

            <button
              onClick={() => {
                setShowMobileMenu(false);
                onOpenLookup();
              }}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-center flex flex-col items-center justify-center gap-1 font-bold"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px]">Cek Status</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
