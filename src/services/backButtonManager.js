import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

class BackButtonManager {
  constructor() {
    this.stack = [];
    this.isHandlingPop = false; // Flag penanda bahwa penutupan dipicu oleh tombol Back fisik/popstate
    this.isSilentPop = false;   // Flag saat penutupan in-app (X) memanggil history.back()
    this.lastActionTime = 0;
    this.lastExitPromptTime = 0;
    this.exitToastCallback = null;
    this.hasInitialized = false;
    this.fallbackHandler = null;
    this.ACTION_COOLDOWN_MS = 250;

    if (typeof window !== 'undefined') {
      this.ensureBaseHistory();
    }
  }

  // Pastikan browser history selalu memiliki state dasar
  ensureBaseHistory() {
    if (typeof window === 'undefined' || !window.history) return;
    try {
      const state = window.history.state;
      if (!state || !state.kanomasBase) {
        window.history.replaceState({ kanomasBase: true, app: 'kanomas' }, '');
      }
    } catch (e) {}
  }

  init(showExitToast) {
    if (showExitToast) this.exitToastCallback = showExitToast;
    if (this.hasInitialized) return;
    this.hasInitialized = true;

    this.ensureBaseHistory();

    // 1. Popstate listener untuk Web, PWA, dan Android Chrome
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => {
        if (this.isSilentPop) {
          this.isSilentPop = false;
          return;
        }
        // Browser sudah mundur 1 langkah di history, jalankan handler mundur aplikasi
        this.handleBackEvent(true);
      });
    }

    // 2. Capacitor Native Back Button listener (Khusus Android APK)
    if (Capacitor.isNativePlatform()) {
      try {
        CapApp.addListener('backButton', () => {
          this.handleBackEvent(false);
        });
      } catch (e) {
        console.warn('Capacitor backButton init warning:', e);
      }
    }
  }

  setFallbackHandler(fn) {
    this.fallbackHandler = fn;
  }

  pushHandler(id, fn, { priority = 10, pushHistory = true } = {}) {
    const existingIndex = this.stack.findIndex((item) => item.id === id);
    if (existingIndex !== -1) {
      this.stack[existingIndex] = { id, fn, priority, pushHistory };
      this.sortStack();
      return () => this.removeHandler(id);
    }

    // Dorong history state di browser agar tombol Back hardware Android memiliki riwayat untuk dimundurkan
    if (pushHistory && typeof window !== 'undefined' && window.history) {
      try {
        window.history.pushState({ kanomasModalId: id, timestamp: Date.now() }, '');
      } catch (e) {}
    }

    this.stack.push({ id, fn, priority, pushHistory });
    this.sortStack();

    return () => this.removeHandler(id);
  }

  removeHandler(id) {
    const index = this.stack.findIndex((item) => item.id === id);
    if (index === -1) return;

    const [removed] = this.stack.splice(index, 1);

    // KUNCI PENTING:
    // Jika modal ditutup karena user menekan tombol Back fisik (this.isHandlingPop === true),
    // browser SUDAH mundur di history! JANGAN panggil history.back() lagi (mencegah double pop / minimize).
    // Panggil history.back() HANYA jika modal ditutup melalui tombol (X) di layar (in-app close).
    if (
      removed &&
      removed.pushHistory &&
      !this.isHandlingPop &&
      typeof window !== 'undefined' &&
      window.history
    ) {
      try {
        this.isSilentPop = true;
        window.history.back();
      } catch (e) {
        this.isSilentPop = false;
      }
    }
  }

  sortStack() {
    this.stack.sort((a, b) => (a.priority || 0) - (b.priority || 0));
  }

  handleBackEvent(calledFromPopstate = false) {
    const now = Date.now();
    // Throttle / Cooldown: abaikan event ganda dalam 250ms
    if (now - this.lastActionTime < this.ACTION_COOLDOWN_MS) {
      return true;
    }
    this.lastActionTime = now;

    // 1. Jika ada modal / reader / view di dalam stack
    if (this.stack.length > 0) {
      const top = this.stack.pop();
      if (top && typeof top.fn === 'function') {
        this.lastExitPromptTime = 0;

        // Tandai bahwa proses penutupan ini dipicu oleh tombol Back fisik
        this.isHandlingPop = true;

        // Jika dipanggil BUKAN dari popstate (misal dari CapApp native) dan ada pushHistory,
        // sinkronkan browser history secara senyap
        if (!calledFromPopstate && top.pushHistory && typeof window !== 'undefined' && window.history) {
          try {
            this.isSilentPop = true;
            window.history.back();
          } catch (e) {
            this.isSilentPop = false;
          }
        }

        try {
          top.fn();
        } catch (err) {
          console.error('Error executing back handler:', err);
        } finally {
          // Reset flag setelah React selesai re-render dan unmount
          setTimeout(() => {
            this.isHandlingPop = false;
          }, 150);
        }
        return true;
      }
    }

    // 2. Jika stack kosong, fallback tab navigation (kembali ke tab sebelumnya -> home)
    if (this.fallbackHandler && typeof this.fallbackHandler === 'function') {
      try {
        const handled = this.fallbackHandler();
        if (handled) {
          this.lastExitPromptTime = 0;
          return true;
        }
      } catch (err) {
        console.error('Error executing fallback back handler:', err);
      }
    }

    // 3. User sudah di Home utama dan tidak ada modal/sub-menu aktif:
    // Konfirmasi 2 detik sebelum keluar
    if (now - this.lastExitPromptTime < 2000) {
      if (Capacitor.isNativePlatform()) {
        try {
          CapApp.exitApp();
        } catch {}
      } else {
        // Pada web/PWA, biarkan keluar ke launcher / previous site
        try {
          window.history.back();
        } catch {}
      }
      return false;
    } else {
      this.lastExitPromptTime = now;
      if (this.exitToastCallback) {
        this.exitToastCallback('Tekan sekali lagi untuk keluar dari Aplikasi Kanomas');
      }

      // Jika di web/PWA dipanggil dari popstate saat di Home,
      // pasang kembali 1 history entry agar penekanan pertama TIDAK langsung keluar/minimize!
      if (calledFromPopstate && typeof window !== 'undefined' && window.history) {
        try {
          window.history.pushState({ kanomasHomeGuard: true }, '');
        } catch (e) {}
      }

      return true;
    }
  }
}

export const backButtonManager = new BackButtonManager();
