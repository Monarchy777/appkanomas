import React, { useState } from 'react';
import { X, CheckCircle, Shield, Award, User, ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { auth, ADMIN_EMAIL } from '../services/auth';
import { db } from '../services/db';

export default function GoogleSignInModal({ onClose, onSuccess }) {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const registeredMitras = db.getMitra() || [];

  const handleLogin = (email, name) => {
    if (!email || !email.includes('@')) {
      setErrorMsg('Masukkan alamat email Gmail yang valid.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    setTimeout(() => {
      try {
        const user = auth.loginWithGoogle({
          email: email.trim(),
          name: name || email.split('@')[0],
          picture: null
        });

        setIsProcessing(false);
        if (onSuccess) onSuccess(user);
        onClose();
      } catch (err) {
        setErrorMsg(err.message || 'Gagal masuk dengan Google.');
        setIsProcessing(false);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-white text-slate-800 border border-slate-200 shadow-2xl p-5 sm:p-6 space-y-5 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Google Sign-In */}
        <div className="text-center space-y-2 pt-1">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center p-2.5">
            {/* SVG Logo Google Resmi */}
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Masuk dengan Akun Google
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-0.5">
              Hubungkan akun Gmail yang terdaftar di HP Anda untuk akses otomatis ke layanan resmi Kanomas.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        {/* Bagian 1: Akun Cepat & Khusus (Admin / Mitra) */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block px-1">
            Pilih Akun Cepat di Perangkat:
          </label>

          {/* Opsi 1: Admin Resmi */}
          <button
            onClick={() => handleLogin(ADMIN_EMAIL, 'Ramadhan Adiluhung (Admin)')}
            disabled={isProcessing}
            className="w-full p-3 rounded-2xl border border-purple-200 hover:border-purple-400 bg-gradient-to-r from-purple-50/70 to-indigo-50/70 hover:from-purple-100 hover:to-indigo-100 flex items-center justify-between gap-3 text-left transition active:scale-[0.98] shadow-xs group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-xs font-black text-slate-900 truncate">
                    Ramadhan Adiluhung
                  </strong>
                  <span className="bg-purple-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                    Admin Utama
                  </span>
                </div>
                <span className="text-[11px] text-purple-700 font-medium truncate block">
                  {ADMIN_EMAIL}
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-600 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Opsi 2: Mitra Syiar Terdaftar */}
          {registeredMitras.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {registeredMitras.slice(0, 2).map((m) => (
                <button
                  key={m.id || m.code}
                  onClick={() => handleLogin(m.email, m.name)}
                  disabled={isProcessing}
                  className="w-full p-2.5 rounded-2xl border border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-100/60 flex items-center justify-between gap-3 text-left transition active:scale-[0.98] shadow-2xs group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-xs shrink-0">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-xs font-bold text-slate-900 truncate">
                          {m.name}
                        </strong>
                        <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                          Mitra Syiar
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-700 font-mono truncate block">
                        {m.email} ({m.code})
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold">
            <span className="bg-white px-2 text-slate-400">Atau Masuk dengan Gmail Lain</span>
          </div>
        </div>

        {/* Bagian 2: Input Akun Gmail Pengguna */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(customEmail, customName);
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Alamat Gmail Anda:
            </label>
            <div className="relative">
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="contoh: nama.anda@gmail.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs font-medium text-slate-800 placeholder-slate-400 transition"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              * Jika Gmail belum terdaftar sebagai Mitra, Anda akan masuk sebagai <strong>Jamaah (Aplikasi Umum)</strong> dan dapat mendaftar menjadi Mitra Syiar di dalam aplikasi.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Lengkap (Opsional):
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Sesuai nama akun Google Anda"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs font-medium text-slate-800 placeholder-slate-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing || !customEmail}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-[#0a7c29] hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{isProcessing ? 'Menghubungkan...' : 'Lanjutkan Masuk dengan Google'}</span>
          </button>
        </form>

        {/* Footer info keamanan */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Akses aman terenkripsi resmi PT Kanomas Artha Wisata</span>
        </div>
      </div>
    </div>
  );
}
