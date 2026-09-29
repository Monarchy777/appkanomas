import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

class BackButtonManager {
  constructor() {
    this.stack = [];
    this.lastActionTime = 0;
    this.lastExitPromptTime = 0;
    this.exitToastCallback = null;
    this.hasInitialized = false;
    this.fallbackHandler = null;
    this.ACTION_COOLDOWN_MS = 280; // 280ms throttle to prevent hardware button bounce & double-fire

    if (typeof window !== 'undefined') {
      this.ensureRootGuard();
    }
  }

  // Menjaga agar browser history selalu memiliki buffer (Root Guard)
  // Mencegah Android Chrome / PWA / WebView langsung menutup / meminimize aplikasi saat tombol Back ditekan
  ensureRootGuard() {
    if (typeof window === 'undefined' || !window.history) return;
    try {
      const currentState = window.history.state;
      if (!currentState || currentState.kanomasGuard !== true) {
        window.history.replaceState({ kanomasRoot: true }, '');
        window.history.pushState({ kanomasGuard: true }, '');
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

    // 1. Capacitor Native Android Hardware Back Button listener
    if (Capacitor.isNativePlatform()) {
      try {
        CapApp.addListener('backButton', () => {
          this.handleBackEvent();
        });
      } catch (e) {
        console.warn('Capacitor backButton listener init warning:', e);
      }
    } else {
      // 2. Browser / Mobile Web / PWA popstate listener (HANYA jika bukan Native Capacitor)
      if (typeof window !== 'undefined') {
        window.addEventListener('popstate', () => {
          // Segera pasang kembali Guard State agar buffer history tidak pernah habis ke level 0
          this.ensureRootGuard();
          this.handleBackEvent();
        });
      }
    }
  }

  setFallbackHandler(fn) {
    this.fallbackHandler = fn;
  }

  pushHandler(id, fn, { priority = 10 } = {}) {
    const existingIndex = this.stack.findIndex((item) => item.id === id);
    if (existingIndex !== -1) {
      this.stack[existingIndex] = { id, fn, priority };
      this.sortStack();
      return () => this.removeHandler(id);
    }

    this.stack.push({ id, fn, priority });
    this.sortStack();

    return () => this.removeHandler(id);
  }

  removeHandler(id) {
    const index = this.stack.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.stack.splice(index, 1);
    }
  }

  sortStack() {
    // Sort urut dari prioritas terendah ke tertinggi.
    // Saat tombol Back ditekan, stack.pop() akan mengambil handler dengan prioritas tertinggi lebih dahulu.
    this.stack.sort((a, b) => (a.priority || 0) - (b.priority || 0));
  }

  handleBackEvent() {
    const now = Date.now();
    // Throttle / Cooldown: abaikan event ganda yang masuk dalam interval sangat rapat (< 280ms)
    if (now - this.lastActionTime < this.ACTION_COOLDOWN_MS) {
      return true;
    }
    this.lastActionTime = now;

    // 1. Periksa apakah ada modal, reader, picker, atau sub-view di dalam stack
    if (this.stack.length > 0) {
      const top = this.stack.pop();
      if (top && typeof top.fn === 'function') {
        // Reset timer konfirmasi keluar karena pengguna sedang navigasi mundur di dalam aplikasi
        this.lastExitPromptTime = 0;
        try {
          top.fn();
        } catch (err) {
          console.error('Error executing back handler:', err);
        }
        return true;
      }
    }

    // 2. Jika stack kosong, jalankan fallback handler (kembali ke tab sebelumnya -> home)
    if (this.fallbackHandler && typeof this.fallbackHandler === 'function') {
      try {
        const handled = this.fallbackHandler();
        if (handled) {
          // Reset timer konfirmasi keluar karena berhasil mundur 1 tab
          this.lastExitPromptTime = 0;
          return true;
        }
      } catch (err) {
        console.error('Error executing fallback back handler:', err);
      }
    }

    // 3. Pengguna sudah berada di Home utama dan tidak ada modal/sub-menu yang aktif:
    // Terapkan Double Back to Exit (Konfirmasi 2 detik)
    if (now - this.lastExitPromptTime < 2000) {
      if (Capacitor.isNativePlatform()) {
        try {
          CapApp.exitApp();
        } catch {}
      } else {
        try {
          // Web / PWA exit
          window.history.go(-2);
        } catch {}
      }
      return false;
    } else {
      this.lastExitPromptTime = now;
      if (this.exitToastCallback) {
        this.exitToastCallback('Tekan sekali lagi untuk keluar dari Aplikasi Kanomas');
      }
      return true;
    }
  }
}

export const backButtonManager = new BackButtonManager();
