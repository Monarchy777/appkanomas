import { db } from './db';

const AUTH_STORAGE_KEY = 'kanomas_auth_user_v1';
export const ADMIN_EMAIL = 'ramadhan.adiluhung@gmail.com';

class AuthService {
  constructor() {
    this.listeners = new Set();
    this.currentUser = this.loadUser();
  }

  loadUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const user = JSON.parse(stored);
        // Refresh role based on latest email check
        user.role = this.resolveRole(user.email);
        user.mitraData = this.getMitraProfile(user.email);
        return user;
      }
    } catch (e) {
      console.error('Error loading auth user:', e);
    }
    return null;
  }

  resolveRole(email) {
    if (!email) return 'jamaah';
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
      return 'admin';
    }
    const mitras = db.getMitra() || [];
    const isMitra = mitras.some(m => m.email && m.email.trim().toLowerCase() === cleanEmail);
    if (isMitra) {
      return 'mitra';
    }
    return 'jamaah';
  }

  getMitraProfile(email) {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();
    const mitras = db.getMitra() || [];
    return mitras.find(m => m.email && m.email.trim().toLowerCase() === cleanEmail) || null;
  }

  getUser() {
    return this.currentUser;
  }

  getRole() {
    if (!this.currentUser) return 'jamaah';
    return this.currentUser.role || 'jamaah';
  }

  loginWithGoogle({ email, name, picture }) {
    if (!email) throw new Error('Email tidak boleh kosong.');
    const cleanEmail = email.trim().toLowerCase();
    const role = this.resolveRole(cleanEmail);
    const mitraData = this.getMitraProfile(cleanEmail);

    const user = {
      email: cleanEmail,
      name: name || cleanEmail.split('@')[0],
      picture: picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || cleanEmail)}&background=0a7c29&color=fff&bold=true`,
      role,
      mitraData,
      loginAt: new Date().toISOString()
    };

    this.currentUser = user;
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving auth user:', e);
    }
    this.notify();
    return user;
  }

  logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Error removing auth user:', e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => {
      try {
        cb(this.currentUser);
      } catch (e) {
        console.error('Error in auth subscriber:', e);
      }
    });
  }
}

export const auth = new AuthService();
