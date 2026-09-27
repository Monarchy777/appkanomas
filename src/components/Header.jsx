import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Download,
  Award,
  Lock,
  LogIn,
  LogOut,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Icon3DStatus, Icon3DCetak, Icon3DWhatsApp } from './Icons3D';
import { ADMIN_EMAIL } from '../services/auth';

export default function Header({
  role,
  currentUser,
  onRoleChange,
  onOpenGoogleSignIn,
  onOpenDaftarMitra,
  onLogout,
  nextPrayer,
  onOpenLookup,
  onOpenWhatsAppCenter,
  onOpenDocumentPrint
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [adminNotice, setAdminNotice] = useState('');

  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const isMitra = currentUser?.role === 'mitra';

  const handleSelectRole = (targetRole) => {
    if (targetRole === 'admin') {
      if (!isAdmin) {
        setAdminNotice(`Khusus Admin sementara hanya dapat diakses oleh ${ADMIN_EMAIL}. Silakan masuk dengan akun tersebut.`);
        setTimeout(() => setAdminNotice(''), 4000);
        if (onOpenGoogleSignIn) onOpenGoogleSignIn();
        return;
      }
    } else if (targetRole === 'mitra') {
      if (!isMitra && !isAdmin) {
        setAdminNotice('Fitur Dashboard Mitra terbuka otomatis bagi yang sudah mendaftar sebagai Mitra Syiar.');
        setTimeout(() => setAdminNotice(''), 4000);
        if (onOpenDaftarMitra) onOpenDaftarMitra();
        return;
      }
    }

    onRoleChange(targetRole);
    setShowMenu(false);
  };

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
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4">
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Tombol Pendaftaran Mitra Syiar (Menonjol & Mewah) */}
          <button
            onClick={onOpenDaftarMitra}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-black px-2.5 sm:px-3 py-1.5 rounded-xl shadow-xs transition active:scale-95 border border-emerald-500/50"
            title="Daftar Mitra Syiar dengan ID KTP & NPWP"
          >
            <Award className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">Daftar Mitra</span>
            <span className="sm:hidden font-black text-[11px]">Mitra</span>
          </button>

          {/* Tombol Google Sign In / User Profile */}
          {currentUser ? (
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2 py-1 rounded-xl cursor-pointer transition select-none active:scale-95"
              title={`${currentUser.name} (${currentUser.role})`}
            >
              <img
                src={currentUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=0a7c29&color=fff&bold=true`}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover border border-emerald-600 shrink-0"
              />
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                currentUser.role === 'admin'
                  ? 'bg-purple-600 text-white'
                  : currentUser.role === 'mitra'
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}>
                {currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'mitra' ? 'Mitra' : 'Jamaah'}
              </span>
            </div>
          ) : (
            <button
              onClick={onOpenGoogleSignIn}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-300 shadow-xs transition active:scale-95"
              title="Masuk dengan Akun Google"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="hidden sm:inline font-bold">Masuk</span>
            </button>
          )}

          {/* Tombol Download APK Android */}
          <a
            href="/kanomas.apk"
            download="Kanomas.apk"
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 text-xs font-black px-2 sm:px-2.5 py-1.5 rounded-xl shadow-xs transition active:scale-95 border border-amber-300"
            title="Download File APK Android"
          >
            <Download className="w-3.5 h-3.5 text-slate-900 shrink-0" />
            <span className="hidden sm:inline">APK</span>
          </a>

          {/* Tombol Menu Layanan */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition relative active:scale-95 shadow-xs"
            aria-label="Menu Layanan"
          >
            {showMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Admin / Mitra Notice Toast */}
      {adminNotice && (
        <div className="bg-amber-50 border-t border-b border-amber-200 px-4 py-2 text-xs font-bold text-amber-900 flex items-center justify-between gap-2 animate-in slide-in-from-top-1 duration-150">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{adminNotice}</span>
          </div>
          <button onClick={() => setAdminNotice('')} className="text-amber-800 font-bold p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Dropdown Menu Layanan & Akun */}
      {showMenu && (
        <div className="px-4 py-3 bg-white border-t border-slate-200 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          {/* Card Status Akun Pengguna */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=0a7c29&color=fff&bold=true`}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900 truncate">{currentUser.name}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                      currentUser.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : currentUser.role === 'mitra'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'mitra' ? 'Mitra Syiar' : 'Aplikasi Umum'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate block">{currentUser.email}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Pengguna Aplikasi Umum</span>
                  <span className="text-[10px] text-slate-500">Masuk dengan Gmail di HP untuk akses Mitra/Admin</span>
                </div>
              </div>
            )}

            <div>
              {currentUser ? (
                <button
                  onClick={() => {
                    if (onLogout) onLogout();
                    setShowMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 transition active:scale-95 border border-red-200"
                  title="Keluar dari Akun"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    if (onOpenGoogleSignIn) onOpenGoogleSignIn();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#0a7c29] hover:bg-[#086320] text-white text-xs font-black flex items-center gap-1.5 transition active:scale-95 shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Masuk Google</span>
                </button>
              )}
            </div>
          </div>

          {/* Banner Pendaftaran Mitra Syiar Resmi */}
          <button
            onClick={() => {
              setShowMenu(false);
              if (onOpenDaftarMitra) onOpenDaftarMitra();
            }}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white text-left flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition active:scale-[0.99] border border-emerald-500/40"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-amber-300 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <strong className="block text-xs sm:text-sm font-black text-amber-200">
                  Daftar Menjadi Mitra Syiar Resmi
                </strong>
                <span className="text-[11px] text-white/90 block">
                  Foto ID KTP & NPWP data otomatis terisi • Ujrah & komisi berkah
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-amber-400 text-slate-900 rounded-lg text-xs font-black shrink-0">
              Daftar
            </span>
          </button>

          {/* Grid Layanan Tambahan */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => {
                setShowMenu(false);
                onOpenLookup();
              }}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 text-left transition flex items-center gap-3 shadow-xs"
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
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-left transition flex items-center gap-3 shadow-xs"
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
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition flex items-center gap-3 col-span-2 sm:col-span-1 shadow-xs"
            >
              <Icon3DWhatsApp size={36} className="flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xs">WhatsApp Center</strong>
                <span className="text-[10px] text-slate-500">Kirim pesan resmi</span>
              </div>
            </button>
          </div>

          {/* Opsi Ganti Mode Akun / Role Based Access Control */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Mode Tampilan:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => handleSelectRole('jamaah')}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${
                  role === 'jamaah'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Aplikasi Umum
              </button>
              <button
                onClick={() => handleSelectRole('mitra')}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                  role === 'mitra'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={!isMitra && !isAdmin ? 'Perlu pendaftaran Mitra Syiar' : 'Dashboard Mitra Syiar'}
              >
                <span>Mitra Syiar</span>
                {!isMitra && !isAdmin && <Lock className="w-2.5 h-2.5 opacity-60" />}
              </button>
              <button
                onClick={() => handleSelectRole('admin')}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                  role === 'admin'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title="Khusus ramadhan.adiluhung@gmail.com"
              >
                <span>Admin</span>
                {!isAdmin && <Lock className="w-2.5 h-2.5 opacity-60 text-amber-500" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
