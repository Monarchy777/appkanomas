import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export const APP_BUILD_VERSION = '2026.1.1'; // Versi saat ini dalam bundle lokal

export default function UpdateModal({ isOpen, onClose, isManualCheck = false }) {
  const [remoteInfo, setRemoteInfo] = useState(null);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const checkVersion = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Gagal memeriksa versi server.');
      const data = await res.json();
      setRemoteInfo(data);

      // Cek apakah versi remote berbeda / lebih baru
      if (data.version && data.version !== APP_BUILD_VERSION) {
        setHasUpdate(true);
      } else {
        setHasUpdate(false);
      }
    } catch (err) {
      setErrorMsg('Tidak dapat terhubung ke server pembaruan.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkVersion();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadApk = () => {
    const apkUrl = remoteInfo?.apkUrl || '/kanomas.apk';
    window.location.href = apkUrl;
  };

  const handleHotReload = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch {}
    window.location.reload(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 p-4 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-base font-black">Pembaruan Aplikasi Kanomas</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4">
          {isLoading ? (
            <div className="py-8 text-center space-y-2">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-bold">Memeriksa versi terbaru dari server...</p>
            </div>
          ) : errorMsg ? (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Koneksi Terkendala</strong>
                <span>{errorMsg} Pastikan perangkat terhubung ke internet.</span>
              </div>
            </div>
          ) : hasUpdate ? (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Versi Baru Tersedia</span>
                  <strong className="text-base font-black text-slate-900 block">
                    v{remoteInfo?.version || '2026.1.2'}
                  </strong>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white font-mono shadow-xs">
                  {remoteInfo?.apkSize || '19.3 MB'}
                </span>
              </div>

              {remoteInfo?.notes && (
                <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-black uppercase text-slate-700 block">Rincian Pembaruan Fitur:</span>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside leading-relaxed">
                    {remoteInfo.notes.map((note, idx) => (
                      <li key={idx} className="font-medium">{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tombol Aksi Utama */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleDownloadApk}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Unduh & Pasang APK Terbaru</span>
                </button>

                <button
                  onClick={handleHotReload}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Muat Ulang Tampilan Langsung (Web)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <strong className="text-base font-black text-slate-900 block">Aplikasi Anda Sudah Versi Terbaru</strong>
                <span className="text-xs text-slate-500 mt-0.5 block">
                  Versi saat ini: v{APP_BUILD_VERSION} (Rilis 2026)
                </span>
              </div>
              <button
                onClick={handleDownloadApk}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Ulang File APK (19.3 MB)</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
