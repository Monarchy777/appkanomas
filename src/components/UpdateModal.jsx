import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, X, Sparkles, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';
import { APP_BUILD_VERSION, isRemoteVersionNewer, fetchRemoteVersionInfo } from '../config/version';

export { APP_BUILD_VERSION };

export default function UpdateModal({
  isOpen,
  onClose,
  isManualCheck = false,
  isMandatory = false,
  initialRemoteInfo = null
}) {
  const [remoteInfo, setRemoteInfo] = useState(initialRemoteInfo);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const checkVersion = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await fetchRemoteVersionInfo();
      if (!data) throw new Error('Gagal memeriksa versi server.');
      setRemoteInfo(data);

      const isNewer = isRemoteVersionNewer(data.version, APP_BUILD_VERSION);
      setHasUpdate(isNewer);

      // KETENTUAN UTAMA:
      // Pada saat sudah sesuai dan BUKAN cek manual, notifikasi jangan ditampilkan!
      if (!isNewer && !isManualCheck) {
        onClose();
      }
    } catch (err) {
      setErrorMsg('Tidak dapat terhubung ke server pembaruan.');
      if (!isManualCheck) {
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (initialRemoteInfo) {
        setRemoteInfo(initialRemoteInfo);
        const isNewer = isRemoteVersionNewer(initialRemoteInfo.version, APP_BUILD_VERSION);
        setHasUpdate(isNewer);
        if (!isNewer && !isManualCheck) {
          onClose();
        }
      } else {
        checkVersion();
      }
    }
  }, [isOpen, initialRemoteInfo]);

  if (!isOpen) return null;

  const handleDownloadApk = (e) => {
    const apkUrl = remoteInfo?.apkUrl || 'https://appkanomas.mediasosial.net/kanomas.apk';
    try {
      const a = document.createElement('a');
      a.href = apkUrl;
      a.download = 'Kanomas.apk';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try { document.body.removeChild(a); } catch {}
      }, 500);
    } catch {
      window.location.href = apkUrl;
    }
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

  const effectiveIsMandatory = isMandatory || (hasUpdate && !isManualCheck);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div
          className={`p-4 text-white flex items-center justify-between border-b ${
            effectiveIsMandatory
              ? 'bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 border-amber-600'
              : 'bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 border-emerald-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {effectiveIsMandatory ? (
              <ShieldAlert className="w-5 h-5 text-amber-200 animate-pulse" />
            ) : (
              <Sparkles className="w-5 h-5 text-amber-300" />
            )}
            <h3 className="text-base font-black">
              {effectiveIsMandatory ? 'Pembaruan Tersedia' : 'Pembaruan Aplikasi Kanomas'}
            </h3>
          </div>

          {/* Tombol X selalu dapat ditutup */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
            title="Tutup / Nanti Saja"
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
              {/* Pesan Peringatan Wajib */}
              {effectiveIsMandatory && (
                <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400 text-amber-950 text-xs leading-relaxed font-medium">
                  <p className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                    <span>⚠️ Pembaruan Wajib Diperlukan:</span>
                  </p>
                  <p>
                    Versi aplikasi di perangkat Anda (<strong className="font-black text-slate-900">v{APP_BUILD_VERSION}</strong>) tidak sesuai dengan versi terbaru (<strong className="font-black text-emerald-800">v{remoteInfo?.version}</strong>). Anda harus memperbarui aplikasi terlebih dahulu agar dapat melanjutkan.
                  </p>
                </div>
              )}

              {/* Info Versi */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                    Versi Baru Tersedia
                  </span>
                  <strong className="text-base font-black text-slate-900 block">
                    v{remoteInfo?.version || '2026.1.3'}
                  </strong>
                  <span className="text-[11px] text-slate-500 block">
                    Versi saat ini: v{APP_BUILD_VERSION}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white font-mono shadow-xs">
                  {remoteInfo?.apkSize || '22.7 MB'}
                </span>
              </div>

              {/* Rincian Fitur Baru */}
              {remoteInfo?.notes && (
                <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-black uppercase text-slate-700 block">
                    Rincian Pembaruan Fitur:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside leading-relaxed">
                    {remoteInfo.notes.map((note, idx) => (
                      <li key={idx} className="font-medium">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tombol Aksi Update Utama */}
              <div className="space-y-2 pt-1">
                <a
                  href={remoteInfo?.apkUrl || 'https://appkanomas.mediasosial.net/kanomas.apk'}
                  download="Kanomas.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownloadApk}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-lg transition active:scale-95 text-center cursor-pointer no-underline"
                >
                  <Download className="w-5 h-5" />
                  <span>UNDUH & PASANG APK TERBARU</span>
                </a>

                <button
                  type="button"
                  onClick={handleHotReload}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Perbarui & Muat Ulang Versi Web</span>
                </button>
              </div>
            </div>
          ) : (
            /* Versi Sudah Sesuai (Hanya muncul saat cek manual) */
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <strong className="text-base font-black text-slate-900 block">
                  Aplikasi Anda Sudah Versi Terbaru
                </strong>
                <span className="text-xs text-slate-500 mt-0.5 block">
                  Versi aktif: v{APP_BUILD_VERSION} (Rilis Terbaru 2026)
                </span>
              </div>
              <a
                href={remoteInfo?.apkUrl || 'https://appkanomas.mediasosial.net/kanomas.apk'}
                download="Kanomas.apk"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadApk}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition active:scale-95 cursor-pointer no-underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Ulang File APK ({remoteInfo?.apkSize || '23.8 MB'})</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer (Selalu ada tombol Tutup / Lanjutkan agar pengguna tidak terkunci) */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Aplikasi Resmi Kanomas Tour & Travel
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition active:scale-95 cursor-pointer"
          >
            Lanjutkan ke Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
}
