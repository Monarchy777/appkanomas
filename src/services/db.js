import {
  COMPANY_PROFILE,
  INITIAL_MENTORS,
  INITIAL_PACKAGES,
  INITIAL_MITRA,
  INITIAL_JAMAAH,
  INITIAL_CALON_JAMAAH,
  INITIAL_TABUNGAN,
  INITIAL_KAJIAN_TASIKMALAYA,
  INITIAL_DOA_MANASIK,
  INITIAL_CHECKLIST,
  EXTERNAL_SERVICES
} from './initialSeed';

const STORAGE_KEY = 'kanomas_app_database_v1';

class KanomasDatabase {
  constructor() {
    this.listeners = new Set();
    this.data = this.load();
  }

  // Load from local storage or initialize with seed data
  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with initial seed in case any new keys are introduced
        return {
          company: parsed.company || COMPANY_PROFILE,
          mentors: parsed.mentors || INITIAL_MENTORS,
          packages: parsed.packages || INITIAL_PACKAGES,
          mitra: parsed.mitra || INITIAL_MITRA,
          jamaah: parsed.jamaah || INITIAL_JAMAAH,
          calonJamaah: parsed.calonJamaah || INITIAL_CALON_JAMAAH,
          tabungan: parsed.tabungan || INITIAL_TABUNGAN,
          kajian: parsed.kajian || INITIAL_KAJIAN_TASIKMALAYA,
          doa: parsed.doa || INITIAL_DOA_MANASIK,
          checklist: parsed.checklist || INITIAL_CHECKLIST,
          externalServices: parsed.externalServices || EXTERNAL_SERVICES
        };
      }
    } catch (e) {
      console.error('Error loading database from localStorage:', e);
    }

    // Default Seed
    const initial = {
      company: COMPANY_PROFILE,
      mentors: INITIAL_MENTORS,
      packages: INITIAL_PACKAGES,
      mitra: INITIAL_MITRA,
      jamaah: INITIAL_JAMAAH,
      calonJamaah: INITIAL_CALON_JAMAAH,
      tabungan: INITIAL_TABUNGAN,
      kajian: INITIAL_KAJIAN_TASIKMALAYA,
      doa: INITIAL_DOA_MANASIK,
      checklist: INITIAL_CHECKLIST,
      externalServices: EXTERNAL_SERVICES
    };
    this.save(initial);
    return initial;
  }

  save(newData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      this.data = newData;
      this.notify();
    } catch (e) {
      console.error('Error saving database:', e);
    }
  }

  // Subscribe to changes
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => {
      try {
        cb(this.data);
      } catch (e) {
        console.error('Error in subscriber callback:', e);
      }
    });
  }

  // Getter
  getAll() {
    return this.data;
  }

  // Packages CRUD
  getPackages() {
    return this.data.packages || [];
  }

  addPackage(pkg) {
    const newPkg = {
      ...pkg,
      id: pkg.id || 'PKG-' + Date.now().toString().slice(-4),
      quotaTotal: Number(pkg.quotaTotal) || 45,
      quotaFilled: Number(pkg.quotaFilled) || 0,
      priceQuad: Number(pkg.priceQuad) || 0,
      priceTriple: Number(pkg.priceTriple) || 0,
      priceDouble: Number(pkg.priceDouble) || 0,
      coverImage: pkg.coverImage || '/assets/flyers/flyer-umroh-bintang4-garuda-5okt.jpg'
    };
    const packages = [newPkg, ...this.data.packages];
    this.save({ ...this.data, packages });
    return newPkg;
  }

  updatePackage(id, updatedFields) {
    const packages = this.data.packages.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    this.save({ ...this.data, packages });
  }

  deletePackage(id) {
    const packages = this.data.packages.filter(p => p.id !== id);
    this.save({ ...this.data, packages });
  }

  // Mitra Syiar CRUD
  getMitra() {
    return this.data.mitra || [];
  }

  addMitra(mitraData) {
    const newMitra = {
      ...mitraData,
      id: 'MTR-' + Date.now().toString().slice(-4),
      code: mitraData.code || ('KANOMAS-SYIAR-' + (this.data.mitra.length + 1).toString().padStart(2, '0')),
      totalJamaah: 0,
      totalCommission: 0,
      commissionPaid: 0,
      commissionPending: 0,
      status: 'Aktif',
      joinedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    const mitra = [newMitra, ...this.data.mitra];
    this.save({ ...this.data, mitra });
    return newMitra;
  }

  updateMitra(id, updatedFields) {
    const mitra = this.data.mitra.map(m => m.id === id ? { ...m, ...updatedFields } : m);
    this.save({ ...this.data, mitra });
  }

  payMitraCommission(id, amount) {
    const mitra = this.data.mitra.map(m => {
      if (m.id === id) {
        const payVal = Math.min(amount, m.commissionPending);
        return {
          ...m,
          commissionPaid: (m.commissionPaid || 0) + payVal,
          commissionPending: Math.max(0, (m.commissionPending || 0) - payVal)
        };
      }
      return m;
    });
    this.save({ ...this.data, mitra });
  }

  // Jamaah Aktif CRUD
  getJamaah() {
    return this.data.jamaah || [];
  }

  addJamaah(jamaahData) {
    const newJamaah = {
      ...jamaahData,
      id: 'JM-' + new Date().getFullYear() + '-' + Date.now().toString().slice(-4),
      paymentStatus: jamaahData.paymentStatus || 'DP Masuk',
      visaStatus: jamaahData.visaStatus || 'Proses Dokumen',
      flightStatus: jamaahData.flightStatus || 'Scheduled',
      totalPaid: Number(jamaahData.totalPaid) || 0,
      remainingPayment: Number(jamaahData.remainingPayment) || 0
    };
    const jamaah = [newJamaah, ...this.data.jamaah];

    // If associated with a package, update package quotaFilled
    let packages = this.data.packages;
    if (newJamaah.packageId) {
      packages = packages.map(p => p.id === newJamaah.packageId ? { ...p, quotaFilled: (p.quotaFilled || 0) + 1 } : p);
    }

    // If referred by a mitra, increment their count and commission
    let mitra = this.data.mitra;
    if (newJamaah.mitraCode) {
      mitra = mitra.map(m => {
        if (m.code === newJamaah.mitraCode) {
          return {
            ...m,
            totalJamaah: (m.totalJamaah || 0) + 1,
            totalCommission: (m.totalCommission || 0) + 1000000,
            commissionPending: (m.commissionPending || 0) + 1000000
          };
        }
        return m;
      });
    }

    this.save({ ...this.data, jamaah, packages, mitra });
    return newJamaah;
  }

  updateJamaah(id, updatedFields) {
    const jamaah = this.data.jamaah.map(j => j.id === id ? { ...j, ...updatedFields } : j);
    this.save({ ...this.data, jamaah });
  }

  deleteJamaah(id) {
    const jamaah = this.data.jamaah.filter(j => j.id !== id);
    this.save({ ...this.data, jamaah });
  }

  // Calon Jamaah / Leads CRUD
  getCalonJamaah() {
    return this.data.calonJamaah || [];
  }

  addCalonJamaah(leadData) {
    const newLead = {
      ...leadData,
      id: 'CL-' + Date.now().toString().slice(-4),
      status: leadData.status || 'Baru',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const calonJamaah = [newLead, ...this.data.calonJamaah];
    this.save({ ...this.data, calonJamaah });
    return newLead;
  }

  updateCalonJamaahStatus(id, newStatus) {
    const calonJamaah = this.data.calonJamaah.map(c => c.id === id ? { ...c, status: newStatus } : c);
    this.save({ ...this.data, calonJamaah });
  }

  deleteCalonJamaah(id) {
    const calonJamaah = this.data.calonJamaah.filter(c => c.id !== id);
    this.save({ ...this.data, calonJamaah });
  }

  // Tabungan Umrah BSI CRUD
  getTabungan() {
    return this.data.tabungan || [];
  }

  addTabungan(tabunganData) {
    const newTabungan = {
      ...tabunganData,
      id: 'TBG-BSI-' + Date.now().toString().slice(-4),
      currentBalance: Number(tabunganData.currentBalance) || Number(tabunganData.initialDeposit) || 500000,
      targetAmount: Number(tabunganData.targetAmount) || 32000000,
      monthlyTarget: Number(tabunganData.monthlyTarget) || 1500000,
      status: 'Aktif',
      transactions: [
        {
          id: 'TRX-' + Date.now().toString().slice(-4),
          date: new Date().toISOString().split('T')[0],
          amount: Number(tabunganData.initialDeposit) || 500000,
          type: 'Setoran Awal',
          note: 'Setoran pembukaan rekening tabungan via BSI'
        }
      ]
    };
    const tabungan = [newTabungan, ...this.data.tabungan];
    this.save({ ...this.data, tabungan });
    return newTabungan;
  }

  addTabunganDeposit(tabunganId, amount, note) {
    const tabungan = this.data.tabungan.map(t => {
      if (t.id === tabunganId) {
        const newBal = (t.currentBalance || 0) + Number(amount);
        const newTx = {
          id: 'TRX-' + Date.now().toString().slice(-4),
          date: new Date().toISOString().split('T')[0],
          amount: Number(amount),
          type: 'Setoran Tambahan',
          note: note || 'Setoran tunai / transfer BSI'
        };
        return {
          ...t,
          currentBalance: newBal,
          status: newBal >= t.targetAmount ? 'Tercapai / Siap Berangkat' : t.status,
          transactions: [newTx, ...(t.transactions || [])]
        };
      }
      return t;
    });
    this.save({ ...this.data, tabungan });
  }

  // Kajian Tasikmalaya CRUD
  getKajian() {
    return this.data.kajian || [];
  }

  addKajian(kajianData) {
    const newKajian = {
      ...kajianData,
      id: 'KJ-' + Date.now().toString().slice(-4),
      organizer: kajianData.organizer || 'PT Kanomas Tasikmalaya'
    };
    const kajian = [newKajian, ...this.data.kajian];
    this.save({ ...this.data, kajian });
    return newKajian;
  }

  deleteKajian(id) {
    const kajian = this.data.kajian.filter(k => k.id !== id);
    this.save({ ...this.data, kajian });
  }

  // Checklist Toggle
  toggleChecklist(id) {
    const checklist = this.data.checklist.map(item => item.id === id ? { ...item, done: !item.done } : item);
    this.save({ ...this.data, checklist });
  }

  // Export Database to JSON
  exportDatabaseJSON() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kanomas-database-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Import Database from JSON
  importDatabaseJSON(jsonContent) {
    try {
      const parsed = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
      if (parsed && parsed.packages && parsed.jamaah) {
        this.save(parsed);
        return { success: true };
      }
      return { success: false, message: 'Format data tidak valid.' };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  // Reset to Factory Default Seed
  resetToFactory() {
    const defaultData = {
      company: COMPANY_PROFILE,
      mentors: INITIAL_MENTORS,
      packages: INITIAL_PACKAGES,
      mitra: INITIAL_MITRA,
      jamaah: INITIAL_JAMAAH,
      calonJamaah: INITIAL_CALON_JAMAAH,
      tabungan: INITIAL_TABUNGAN,
      kajian: INITIAL_KAJIAN_TASIKMALAYA,
      doa: INITIAL_DOA_MANASIK,
      checklist: INITIAL_CHECKLIST,
      externalServices: EXTERNAL_SERVICES
    };
    this.save(defaultData);
    return defaultData;
  }
}

export const db = new KanomasDatabase();
