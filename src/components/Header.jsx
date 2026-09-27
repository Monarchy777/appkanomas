import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Menu,
  X,
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
  onOpenDocumentPrint,
  onOpenUpdateModal
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [adminNotice, setAdminNotice] = useState('');

  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const isMitra = currentUser?.role === 'mitra';

  const handleSelectRole = (targetRole) => {
    if (targetRole === 'admin') {
      if (!isAdmin) {
        setAdminNotice(`Khusus Admin sementara hanya dapat diakses oleh ${ADMIN_EMAIL}. Silakan masuk dengan akun tersebut.`);
        setTimeout(() => setAdminNotice(''), 4500);
        if (onOpenGoogleSignIn) onOpenGoogleSignIn();
        return;
      }
    } else if (targetRole === 'mitra') {
      if (!isMitra && !isAdmin) {
        setAdminNotice('Fitur Dashboard Mitra terbuka otomatis bagi yang sudah mendaftar sebagai Mitra Syiar.');
        setTimeout(() => setAdminNotice(''), 4500);
        if (onOpenDaftarMitra) onOpenDaftarMitra();
        return;
      }
    }

    onRoleChange(targetRole);
    setShowMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all safe-top">
      {/* 1. Baris Legalitas Resmi (Navy Kontras & Berwibawa) */}
      <div className="bg-[#0f172a] text-[10px] sm:text-xs py-1.5 px-3 sm:px-6 flex items-center justify-between text-slate-300 gap-2">
        <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span className="text-amber-400 font-bold whitespace-nowrap">
            Kemenag RI: PPIU U.310
          </span>
          <span className="text-slate-500 hidden md:inline">• PIHK 9120313132406</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-emerald-400 hidden sm:inline font-bold whitespace-nowrap">Akreditasi A</span>
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

      {/* 2. Bar Utama Aplikasi (Sangat Bersih: Logo, CS WhatsApp & Garis 3 Menu) */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Logo & Identitas Kanomas */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/assets/logo-kanomas.png"
            alt="Logo Kanomas"
            className="w-11 h-11 sm:w-12 sm:h-12 object-contain flex-shrink-0 drop-shadow-sm"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 font-sans">
                KANOMAS
              </span>
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                TASIKMALAYA
              </span>
            </div>
            <p className="text-xs text-amber-900/90 font-medium tracking-wide">
              Sahabat Ibadah & Ziarah Anda
            </p>
          </div>
        </div>

        {/* Tombol Kanan: Hanya CS WhatsApp & Garis 3 (Menu Utama Bersih) */}
        <div className="flex items-center gap-2">
          {/* Tombol Cepat Bantuan CS WhatsApp */}
          <a
            href="https://wa.me/628112113363"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition active:scale-95 whitespace-nowrap"
            title="Hubungi Customer Service WhatsApp Resmi"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Bantuan CS</span>
            <span className="sm:hidden font-bold">CS</span>
          </a>

          {/* Tombol Garis 3 (Menu Navigasi Utama) */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition active:scale-95 shadow-xs ${
              showMenu
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
            }`}
            aria-label="Menu Layanan Utama"
          >
            {showMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="hidden xs:inline">Menu</span>
          </button>
        </div>
      </div>

      {/* Admin / Mitra Notice Toast */}
      {adminNotice && (
        <div className="bg-amber-50 border-t border-b border-amber-200 px-4 py-2.5 text-xs font-bold text-amber-900 flex items-center justify-between gap-2 animate-in slide-in-from-top-1 duration-150">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{adminNotice}</span>
          </div>
          <button onClick={() => setAdminNotice('')} className="text-amber-800 font-bold p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Dropdown Menu Garis 3: Lengkap, Sangat Jelas, Rapi & Mudah Dibaca */}
      {showMenu && (
        <div className="px-4 py-4 bg-white border-t border-slate-200 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* ======================================================== */}
          {/* SECTION 1: STATUS AKUN GOOGLE & LOGIN                   */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
              1. Status Akun Google & Akses
            </span>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
              {currentUser ? (
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={currentUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=0a7c29&color=fff&bold=true`}
                    alt={currentUser.name}
                    className="w-11 h-11 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-black text-slate-900 break-words">{currentUser.name}</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        currentUser.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : currentUser.role === 'mitra'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {currentUser.role === 'admin' ? 'Super Admin' : currentUser.role === 'mitra' ? 'Mitra Syiar' : 'Aplikasi Umum'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 break-all block mt-0.5">{currentUser.email}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center p-2 shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block">Masuk dengan Akun Google</span>
                    <span className="text-[11px] text-slate-500 block leading-tight">Hubungkan Gmail di HP untuk akses otomatis Mitra/Admin</span>
                  </div>
                </div>
              )}

              <div className="shrink-0">
                {currentUser ? (
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      setShowMenu(false);
                    }}
                    className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 border border-red-200 whitespace-nowrap"
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
                    className="px-3.5 py-2 rounded-xl bg-[#0a7c29] hover:bg-[#086320] text-white text-xs font-black flex items-center gap-1.5 transition active:scale-95 shadow-xs whitespace-nowrap"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Masuk</span>
                  </button>
                )}
              </div>
            </div>

            {/* Pilihan Mode Akses Tampilan */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-600 text-xs font-medium">
                Mode Tampilan: <strong className="text-slate-900 capitalize">{role === 'jamaah' ? 'Aplikasi Umum' : role === 'mitra' ? 'Mitra Syiar' : 'Admin'}</strong>
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleSelectRole('jamaah')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    role === 'jamaah'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Aplikasi Umum
                </button>
                <button
                  onClick={() => handleSelectRole('mitra')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    role === 'mitra'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title={!isMitra && !isAdmin ? 'Perlu pendaftaran Mitra Syiar' : 'Dashboard Mitra Syiar'}
                >
                  <span>Mitra Syiar</span>
                  {!isMitra && !isAdmin && <Lock className="w-3 h-3 opacity-60" />}
                </button>
                <button
                  onClick={() => handleSelectRole('admin')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    role === 'admin'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Khusus ramadhan.adiluhung@gmail.com"
                >
                  <span>Admin</span>
                  {!isAdmin && <Lock className="w-3 h-3 opacity-60 text-amber-500" />}
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: PENDAFTARAN MITRA SYIAR RESMI                */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
              2. Kemitraan Syiar Baitullah
            </span>

            <button
              onClick={() => {
                setShowMenu(false);
                if (onOpenDaftarMitra) onOpenDaftarMitra();
              }}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white text-left flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition active:scale-[0.99] border border-emerald-500/40 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-300/40 backdrop-blur-xs flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <strong className="block text-xs sm:text-sm font-black text-amber-200">
                    Daftar Menjadi Mitra Syiar Resmi
                  </strong>
                  <span className="text-[11px] text-emerald-100/90 block leading-tight mt-0.5">
                    Foto ID KTP & NPWP data otomatis terisi via scan cerdas • Ujrah & komisi berkah
                  </span>
                </div>
              </div>
              <span className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 rounded-xl text-xs font-black shrink-0 shadow-xs">
                Daftar
              </span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* SECTION 3: LAYANAN MANDIRI JAMAAH                       */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
              3. Layanan Mandiri Jamaah
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onOpenLookup();
                }}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 text-left transition flex items-center gap-3 shadow-xs"
              >
                <Icon3DStatus size={38} className="shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xs">Cek Status</strong>
                  <span className="text-[11px] text-slate-500">Pendaftaran jamaah</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  onOpenDocumentPrint();
                }}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-left transition flex items-center gap-3 shadow-xs"
              >
                <Icon3DCetak size={38} className="shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xs">Cetak Dokumen</strong>
                  <span className="text-[11px] text-slate-500">Kuitansi & surat izin</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  onOpenWhatsAppCenter();
                }}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition flex items-center gap-3 shadow-xs"
              >
                <Icon3DWhatsApp size={38} className="shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xs">WhatsApp Center</strong>
                  <span className="text-[11px] text-slate-500">Pesan resmi Kanomas</span>
                </div>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 4: UNDUH APLIKASI ANDROID (UPDATE 2026)         */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                4. File Aplikasi Resmi (Rilis 2026)
              </span>
              {onOpenUpdateModal && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenUpdateModal();
                  }}
                  className="text-[10px] font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-full transition"
                >
                  🔄 Cek Update
                </button>
              )}
            </div>

            <a
              href="/kanomas.apk"
              download="Kanomas.apk"
              onClick={() => setShowMenu(false)}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border border-amber-300 hover:border-amber-400 flex items-center justify-between gap-3 shadow-xs transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-900 flex items-center justify-center font-black shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  <Download className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <strong className="text-slate-900 block text-xs sm:text-sm font-bold flex items-center gap-2 flex-wrap">
                    Download File APK Android
                    <span className="bg-emerald-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black tracking-wider uppercase">
                      Update 2026 • 19.3 MB
                    </span>
                  </strong>
                  <span className="text-xs text-slate-600 block mt-0.5">
                    Versi 2026.1.2 • Ikon & Dzikir Baru • Bisa dibagikan via WA
                  </span>
                </div>
              </div>
              <span className="text-xs font-black text-slate-900 bg-amber-400 border border-amber-300 px-3.5 py-1.5 rounded-xl shrink-0 group-hover:bg-amber-500 transition shadow-xs">
                Unduh
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
