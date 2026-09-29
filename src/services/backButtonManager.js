import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

class BackButtonManager {
  constructor() {
    this.stack = [];
    this.isSilentPop = false;
    this.lastBackPressTime = 0;
    this.exitToastCallback = null;
    this.hasInitialized = false;
    this.fallbackHandler = null;

    if (typeof window !== 'undefined') {
      this.ensureRootGuard();
    }
  }

  // Pastikan browser history selalu memiliki buffer (Root Guard)
  // Ini mencegah Android Chrome / WebView langsung menutup / meminimize aplikasi saat tombol Back ditekan
  ensureRootGuard() {
    if (typeof window === 'undefined' || !window.history) return;
    try {
      const currentState = window.history.state;
      if (!currentState || !currentState.kanomasActive) {
        window.history.replaceState({ kanomasBase: true }, '');
        window.history.pushState({ kanomasActive: true }, '');
      }
    } catch (e) {
      console.warn('ensureRootGuard warning:', e);
    }
  }

  init(showExitToast) {
    if (showExitToast) this.exitToastCallback = showExitToast;
    if (this.hasInitialized) return;
    this.hasInitialized = true;

    // Pasang guard state di awal
    this.ensureRootGuard();

    // 1. Browser / Mobile Web / PWA popstate listener
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => {
        if (this.isSilentPop) {
          this.isSilentPop = false;
          return;
        }
        this.handleBackEvent(true);
      });
    }

    // 2. Document "backbutton" event (Cordova / Capacitor Android WebView)
    if (typeof document !== 'undefined') {
      document.addEventListener('backbutton', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.handleBackEvent(false);
      });
    }

    // 3. Capacitor Native Android Hardware Back Button listener
    try {
      if (Capacitor.isNativePlatform()) {
        CapApp.addListener('backButton', () => {
          this.handleBackEvent(false);
        });
      }
    } catch (e) {
      console.warn('Capacitor backButton listener init warning:', e);
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

    if (pushHistory && typeof window !== 'undefined' && window.history) {
      try {
        window.history.pushState({ kanomasBackId: id, timestamp: Date.now() }, '');
      } catch (e) {
        console.warn('history.pushState error:', e);
      }
    }

    this.stack.push({ id, fn, priority, pushHistory });
    this.sortStack();

    return () => this.removeHandler(id);
  }

  removeHandler(id, silentHistorySync = true) {
    const index = this.stack.findIndex((item) => item.id === id);
    if (index === -1) return;

    const [removed] = this.stack.splice(index, 1);

    if (removed && removed.pushHistory && silentHistorySync && typeof window !== 'undefined' && window.history) {
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
    // 1. Jika ada handler di stack (modal, drawer, sub-view, dsb.)
    if (this.stack.length > 0) {
      // Pop the highest priority (topmost) handler
      const top = this.stack.pop();
      if (top && typeof top.fn === 'function') {
        if (!calledFromPopstate && top.pushHistory && typeof window !== 'undefined' && window.history) {
          try {
            this.isSilentPop = true;
            window.history.back();
          } catch (e) {
            this.isSilentPop = false;
          }
        }

        // Jika dipanggil dari popstate, segera pastikan buffer history tetap ada
        if (calledFromPopstate) {
          this.ensureRootGuard();
        }

        try {
          top.fn();
        } catch (err) {
          console.error('Error executing back handler:', err);
        }
        return true;
      }
    }

    // 2. Jika stack kosong, periksa apakah fallback handler (misal kembali dari tab selain home) bisa menangani
    if (this.fallbackHandler && typeof this.fallbackHandler === 'function') {
      try {
        const handled = this.fallbackHandler();
        if (handled) {
          if (calledFromPopstate) {
            this.ensureRootGuard();
          }
          return true;
        }
      } catch (err) {
        console.error('Error executing fallback back handler:', err);
      }
    }

    // 3. User sudah di level paling dasar (Home utama dan tidak ada modal/sub-menu):
    // Terapkan Double Back to Exit (Konfirmasi 2 detik)
    const now = Date.now();
    if (now - this.lastBackPressTime < 2000) {
      if (Capacitor.isNativePlatform()) {
        try {
          CapApp.exitApp();
        } catch {}
      }
      return false;
    } else {
      this.lastBackPressTime = now;
      if (this.exitToastCallback) {
        this.exitToastCallback('Tekan sekali lagi untuk keluar dari Aplikasi Kanomas');
      }

      // Pastikan history guard terpasang kembali agar klik pertama tidak langsung keluar
      this.ensureRootGuard();
      return true;
    }
  }
}

export const backButtonManager = new BackButtonManager();

