import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, PlusSquare, Check } from 'lucide-react';

export default function InstallAppBanner({ onClose }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Listen for Android beforeinstallprompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      window.dispatchEvent(new CustomEvent('kanomas-open-install-modal'));
    }
  };

  if (isInstalled) return null;

  return (
    <div className="p-3.5 mx-3 sm:mx-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#132c22] to-[#0f241a] border border-emerald-500/40 shadow-lg flex items-center justify-between gap-3 text-white animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3">
        <img
          src="/assets/logo-kanomas-3d-192.png"
          alt="Icon Kanomas 3D"
          className="w-11 h-11 rounded-2xl shadow-md object-cover flex-shrink-0 border border-emerald-400/40"
        />
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-white">Pasang Aplikasi Kanomas di HP</h4>
            <span className="text-[9px] uppercase px-1.5 py-0.2 rounded font-black bg-emerald-500 text-slate-950">
              PWA
            </span>
          </div>
          <p className="text-[11px] text-emerald-200">
            {isIos
              ? "Buka cepat dari Home Screen iPhone (Safari > Share > Add to Home Screen)"
              : "Akses offline cepat langsung dari layar utama HP Anda"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        <a
          href="/kanomas.apk"
          download="Kanomas.apk"
          className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-1.5 whitespace-nowrap active:scale-95"
          title="Download File APK Android Asli"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Download APK</span>
        </a>

        <button
          onClick={handleInstallClick}
          className="hidden sm:flex px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition items-center gap-1.5 whitespace-nowrap active:scale-95"
        >
          <span>{isIos ? 'Panduan iPhone' : 'Pasang di Chrome'}</span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
