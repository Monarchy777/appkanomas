import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle2, Share2, PlusSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AutoDownloadModal() {
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInApp, setIsInApp] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // 1. Cek apakah sudah terpasang (Standalone Mode)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // 2. Cek perangkat iOS & In-App Browser (WhatsApp, Instagram, dll)
    const ua = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(iosDevice);

    const inApp = /whatsapp|fban|fbav|instagram|line|tiktok|webview/i.test(ua);
    setIsInApp(inApp);

    // 3. Tangkap event instalasi browser Android / Chrome
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Langsung munculkan prompt instalasi saat buka web
      setShowModal(true);
    };

    // 4. Listener untuk memunculkan modal dari tombol di mana saja
    const handleTriggerModal = () => {
      setShowModal(true);
      if (!iosDevice && !inApp) {
        setShowAndroidGuide(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('kanomas-open-install-modal', handleTriggerModal);

    // 5. Munculkan otomatis saat buka web setelah 600ms jika belum standalone
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('kanomas_install_modal_dismissed');
      if (!dismissed) {
        setShowModal(true);
      }
    }, 600);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('kanomas-open-install-modal', handleTriggerModal);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallNow = async () => {
    if (deferredPrompt) {
      // Trigger prompt instalasi native Android langsung
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowModal(false);
      }
      setDeferredPrompt(null);
    } else if (isInApp) {
      // Jika di dalam browser WhatsApp, luncurkan Chrome langsung lewat intent Android
      window.location.href = "intent://appkanomas.mediasosial.net/#Intent;scheme=https;package=com.android.chrome;end";
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      setShowAndroidGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowModal(false);
    try {
      sessionStorage.setItem('kanomas_install_modal_dismissed', 'true');
    } catch {}
  };

  if (isInstalled || !showModal) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-slate-900 via-[#0d2218] to-slate-950 border-2 border-emerald-500/50 shadow-2xl p-5 sm:p-6 text-white text-center space-y-4 relative overflow-hidden max-h-[95vh] overflow-y-auto">
        
        {/* Tombol Tutup */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Glow Background Effect */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Icon 3D Kanomas Besar */}
        <div className="relative pt-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl p-1 bg-gradient-to-tr from-amber-500 via-emerald-400 to-amber-300 shadow-xl shadow-emerald-950/60 ring-4 ring-emerald-500/30">
            <img
              src="/assets/logo-kanomas-3d.png"
              alt="Logo Kanomas 3D"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <span className="inline-flex items-center gap-1 mt-2.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-sm">
            <ShieldCheck className="w-3 h-3" />
            <span>Aplikasi Resmi Kemenag RI</span>
          </span>
        </div>

        {/* Judul & Deskripsi */}
        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight font-sans">
            Pasang Aplikasi Kanomas di HP
          </h3>
          <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
            Buka langsung dari layar utama HP Anda dengan ikon 3D resmi, lebih cepat & hemat kuota.
          </p>
        </div>

        {/* PANDUAN 1: JIKA TERDETEKSI DIBUKA DI DALAM WHATSAPP */}
        {isInApp && (
          <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-left text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Smartphone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Terbuka di Browser WhatsApp:</span>
            </div>
            <p className="text-slate-200 text-[11px] leading-relaxed">
              Browser bawaan WhatsApp tidak memiliki tombol instal. Silakan buka di <strong>Google Chrome</strong>:
            </p>
            <ol className="text-[11px] text-amber-100 space-y-1 list-decimal list-inside">
              <li>Ketuk <strong>Titik Tiga (⋮)</strong> di pojok kanan atas layar WhatsApp ini.</li>
              <li>Pilih <strong>"Buka di Chrome"</strong> (Open in Chrome).</li>
              <li>Lalu pasang aplikasi ke layar utama HP Anda.</li>
            </ol>
          </div>
        )}

        {/* PANDUAN 2: JIKA DI ANDROID CHROME (PANDUAN TITIK TIGA PERSIS BAHASA INDONESIA) */}
        {showAndroidGuide && !isInApp && (
          <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/40 text-left text-xs space-y-2.5 animate-in fade-in">
            <strong className="text-amber-300 block font-bold text-xs">Cara Pasang di Google Chrome (Android):</strong>
            <div className="space-y-2 text-[11px] text-slate-200">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">1</span>
                <div>
                  <span>Ketuk menu <strong>Titik Tiga (⋮)</strong> di pojok kanan atas browser Chrome.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">2</span>
                <div>
                  <span>Cari dan pilih tulisan:</span>
                  <div className="mt-1 p-2 rounded-xl bg-slate-800 border border-emerald-400/50 text-white font-bold flex items-center gap-2">
                    <PlusSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Tambahkan ke Layar Utama</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    (Pada beberapa HP tertulis <strong>"Instal aplikasi"</strong>)
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">3</span>
                <div>
                  <span>Ketuk <strong>"Pasang / Tambahkan"</strong>. Ikon 3D Kanomas akan langsung muncul di beranda HP Anda!</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANDUAN 3: KHUSUS IPHONE (SAFARI) */}
        {showIosGuide && (
          <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/40 text-left text-xs space-y-2 animate-in fade-in">
            <strong className="text-amber-300 block font-bold">Cara Pasang di iPhone (Safari):</strong>
            <p className="flex items-center gap-2 text-[11px]">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
              <span>Ketuk tombol <strong>Share / Bagikan</strong> <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-sky-300" /> di bagian bawah layar Safari.</span>
            </p>
            <p className="flex items-center gap-2 text-[11px]">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
              <span>Gulir ke bawah lalu pilih <strong>Add to Home Screen (+)</strong>.</span>
            </p>
          </div>
        )}

        {/* Tombol Aksi Download APK & Pasang Langsung */}
        <div className="space-y-2.5 pt-1">
          {/* 1. TOMBOL UTAMA: DOWNLOAD BERKAS APK RESMI (.APK) */}
          <a
            href="/kanomas.apk"
            download="Kanomas.apk"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-emerald-500/25 active:scale-95 transition flex items-center justify-center gap-2 border-2 border-emerald-200"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>DOWNLOAD FILE APK (.APK)</span>
          </a>

          {/* Sub-keterangan unduh APK */}
          <p className="text-[11px] text-emerald-200/90 font-medium">
            File APK Android asli • Bisa disimpan & dibagikan bebas via WhatsApp
          </p>

          {/* 2. TOMBOL BAGIKAN KE WHATSAPP */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              "Assalamu'alaikum, silakan unduh dan pasang Aplikasi Resmi Kanomas Tour & Travel (File APK Android) melalui link resmi berikut:\n\n👉 https://appkanomas.mediasosial.net/kanomas.apk\n\n📌 Izin Resmi Kemenag RI: PPIU U.310 | PIHK 9120313132406\nBimbingan Ibadah Haji & Umrah Sesuai Sunnah."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wide border border-white/20 active:scale-95 transition flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>BAGIKAN LINK APK KE WHATSAPP</span>
          </a>

          {/* 3. TOMBOL ALTERNATIF: PASANG LANGSUNG VIA BROWSER (PWA) */}
          {!isInApp && (
            <button
              onClick={handleInstallNow}
              className="w-full py-2 text-[11px] text-amber-300 hover:text-amber-200 transition font-bold underline"
            >
              {deferredPrompt ? 'Atau pasang langsung via Chrome (Tanpa unduh file)' : 'Petunjuk pasang ke layar utama HP'}
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="text-xs text-slate-400 hover:text-slate-200 transition py-1 block w-full font-medium"
          >
            Buka Lewat Web Saja
          </button>
        </div>

      </div>
    </div>
  );
}
