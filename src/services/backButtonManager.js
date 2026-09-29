import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

class BackButtonManager {
  constructor() {
    this.stack = [];
    this.isSilentPop = false;
    this.lastBackPressTime = 0;
    this.exitToastCallback = null;
    this.hasInitialized = false;
  }

  init(showExitToast) {
    if (showExitToast) this.exitToastCallback = showExitToast;
    if (this.hasInitialized) return;
    this.hasInitialized = true;

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

    // 2. Capacitor Native Android Hardware Back Button listener
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
        try {
          top.fn();
        } catch (err) {
          console.error('Error executing back handler:', err);
        }
        return true;
      }
    }

    // Nothing in stack: user is at root/home level
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
      // PWA / Web: Push root guard state so double back is needed to exit
      if (typeof window !== 'undefined' && window.history) {
        try {
          window.history.pushState({ kanomasRoot: true }, '');
        } catch {}
      }
      return true;
    }
  }
}

export const backButtonManager = new BackButtonManager();
