import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Compass,
  Calculator,
  Award,
  Calendar,
  Database,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Download,
  Upload,
  RotateCcw,
  Plane,
  Hotel,
  DollarSign,
  Phone,
  FileText,
  Search,
  Sparkles,
  MessageSquare,
  Printer
} from 'lucide-react';
import { db } from '../services/db';

export default function AdminDashboardView({ onOpenWhatsAppCenter, onOpenDocumentPrint }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'packages' | 'jamaah' | 'leads' | 'tabungan' | 'mitra' | 'backup'
  const [appData, setAppData] = useState(() => db.getAll());

  // Package Form State
  const [showPkgForm, setShowPkgForm] = useState(false);
  const [pkgFormData, setPkgFormData] = useState({
    title: '',
    category: 'reguler',
    airline: 'Garuda Indonesia',
    duration: '10 Hari',
    departureDate: '',
    hotelMakkah: 'Fajr Badea 5 / Setaraf',
    hotelMadinah: 'Arkan Al Manar / Setaraf',
    priceQuad: 28000000,
    priceTriple: 31000000,
    priceDouble: 34000000,
    quotaTotal: 45,
    quotaFilled: 0,
    status: 'Dibuka',
    description: ''
  });

  // Jamaah Form State
  const [showJamaahForm, setShowJamaahForm] = useState(false);
  const [jamaahFormData, setJamaahFormData] = useState({
    name: '',
    nik: '',
    passportNo: '',
    phone: '',
    packageId: '',
    packageName: 'Paket Umroh Bintang 4 Garuda Indonesia',
    departureDate: '05 Oktober 2026',
    roomType: 'Quad',
    visaStatus: 'Proses Dokumen',
    flightStatus: 'Confirmed',
    hotelMakkahRoom: 'Kamar Siap Dibagikan',
    hotelMadinahRoom: 'Kamar Siap Dibagikan',
    luggageDelivered: false,
    paymentStatus: 'DP Masuk',
    totalPaid: 15000000,
    remainingPayment: 18900000,
    mitraCode: 'KANOMAS-SYIAR-01',
    muthawif: 'H. Irpan Hilmi, Lc., MA.'
  });

  // Deposit Form State
  const [depositModal, setDepositModal] = useState({ open: false, item: null, amount: 1500000, note: '' });

  // Mitra Payout State
  const [payoutModal, setPayoutModal] = useState({ open: false, item: null, amount: 1000000 });

  // File import ref
  const fileInputRef = React.useRef(null);

  // Sync state with db
  const refreshData = () => {
    setAppData({ ...db.getAll() });
  };

  // KPI Calculations
  const totalPackages = appData.packages?.length || 0;
  const totalJamaah = appData.jamaah?.length || 0;
  const totalCalon = appData.calonJamaah?.length || 0;
  const totalMitra = appData.mitra?.length || 0;
  const totalTabunganSaldo = appData.tabungan?.reduce((acc, curr) => acc + (curr.currentBalance || 0), 0) || 0;

  // Handlers
  const handleCreatePackage = (e) => {
    e.preventDefault();
    db.addPackage(pkgFormData);
    refreshData();
    setShowPkgForm(false);
  };

  const handleDeletePackage = (id) => {
    if (window.confirm('Yakin ingin menghapus paket ini?')) {
      db.deletePackage(id);
      refreshData();
    }
  };

  const handleCreateJamaah = (e) => {
    e.preventDefault();
    db.addJamaah(jamaahFormData);
    refreshData();
    setShowJamaahForm(false);
  };

  const handleDeleteJamaah = (id) => {
    if (window.confirm('Hapus data jamaah ini?')) {
      db.deleteJamaah(id);
      refreshData();
    }
  };

  const handleUpdateLeadStatus = (id, newStatus) => {
    db.updateCalonJamaahStatus(id, newStatus);
    refreshData();
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Hapus prospek calon jamaah ini?')) {
      db.deleteCalonJamaah(id);
      refreshData();
    }
  };

  const handleSaveDeposit = () => {
    if (depositModal.item && depositModal.amount > 0) {
      db.addTabunganDeposit(depositModal.item.id, depositModal.amount, depositModal.note);
      refreshData();
      setDepositModal({ open: false, item: null, amount: 1500000, note: '' });
    }
  };

  const handlePayCommission = () => {
    if (payoutModal.item && payoutModal.amount > 0) {
      db.payMitraCommission(payoutModal.item.id, payoutModal.amount);
      refreshData();
      setPayoutModal({ open: false, item: null, amount: 1000000 });
    }
  };

  const handleExportJSON = () => {
    db.exportDatabaseJSON();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = db.importDatabaseJSON(evt.target.result);
      if (result.success) {
        alert('Database Kanomas berhasil dipulihkan dari file backup!');
        refreshData();
      } else {
        alert('Gagal restore: ' + result.message);
      }
    };
    reader.readAsText(file);
  };

  const handleResetFactory = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh database ke data pabrik Kanomas awal? Semua perubahan data baru akan dikembalikan.')) {
      db.resetToFactory();
      refreshData();
      alert('Database berhasil direset ke konfigurasi awal pabrik!');
    }
  };

  return (
    <div className="space-y-6 pb-24 mx-3 sm:mx-6 mt-3">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#200f33] via-[#2c1348] to-[#120721] border border-purple-500/30 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 inline-block">
              Enterprise Admin Portal
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Sistem Manajemen Database PT Kanomas
            </h2>
            <p className="text-xs text-slate-300">
              Pengelolaan terpadu Paket Umrah/Haji, Jamaah, Calon Jamaah, Tabungan BSI & Mitra Syiar
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenWhatsAppCenter}
              className="px-3.5 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WA Center</span>
            </button>
            <button
              onClick={onOpenDocumentPrint}
              className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Berkas & Kwitansi</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold transition flex items-center gap-1.5 border border-purple-500/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Restore</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* KPI Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3">
          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Paket Aktif</span>
            <span className="text-xl font-black text-white font-mono block">{totalPackages}</span>
            <span className="text-[9px] text-purple-300">Umrah & Haji</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Jamaah Aktif</span>
            <span className="text-xl font-black text-emerald-400 font-mono block">{totalJamaah}</span>
            <span className="text-[9px] text-slate-400">Siap Berangkat</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Calon Jamaah</span>
            <span className="text-xl font-black text-amber-400 font-mono block">{totalCalon}</span>
            <span className="text-[9px] text-amber-300">Pipeline Leads</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Tabungan BSI</span>
            <span className="text-base sm:text-lg font-black text-white font-mono block break-words leading-tight">
              Rp {(totalTabunganSaldo / 1000000).toFixed(1)} Juta
            </span>
            <span className="text-[9px] text-emerald-400">{appData.tabungan?.length || 0} Rekening</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Mitra Syiar</span>
            <span className="text-xl font-black text-blue-400 font-mono block">{totalMitra}</span>
            <span className="text-[9px] text-blue-300">Agen Marketing</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Database Entities */}
      <div className="overflow-x-auto flex gap-1.5 no-scrollbar pb-1">
        {[
          { id: 'summary', label: 'Ringkasan', icon: Briefcase },
          { id: 'packages', label: 'Kelola Paket', icon: Compass },
          { id: 'jamaah', label: 'Kelola Jamaah', icon: Users },
          { id: 'leads', label: 'Calon Jamaah', icon: FileText },
          { id: 'tabungan', label: 'Tabungan BSI', icon: Calculator },
          { id: 'mitra', label: 'Mitra Syiar', icon: Award },
          { id: 'backup', label: 'Backup & Restore', icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                isActive
                  ? 'bg-purple-700 text-white shadow-lg'
                  : 'bg-[#14222e] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SUMMARY */}
      {activeTab === 'summary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Recent Jamaah */}
            <div className="p-5 rounded-3xl bg-[#14222e] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Jamaah Terdaftar Terbaru</span>
                </h4>
                <button onClick={() => setActiveTab('jamaah')} className="text-xs text-purple-300 hover:underline">
                  Kelola
                </button>
              </div>

              <div className="space-y-2">
                {appData.jamaah?.slice(0, 3).map((j) => (
                  <div key={j.id} className="p-3 bg-black/25 rounded-2xl border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white block">{j.name}</strong>
                      <span className="text-[11px] text-slate-400">{j.packageName}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      {j.paymentStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Recent Leads */}
            <div className="p-5 rounded-3xl bg-[#14222e] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Prospek Calon Jamaah Masuk</span>
                </h4>
                <button onClick={() => setActiveTab('leads')} className="text-xs text-purple-300 hover:underline">
                  Kelola
                </button>
              </div>

              <div className="space-y-2">
                {appData.calonJamaah?.slice(0, 3).map((c) => (
                  <div key={c.id} className="p-3 bg-black/25 rounded-2xl border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white block">{c.name}</strong>
                      <span className="text-[11px] text-slate-400">{c.targetPackage}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PACKAGES */}
      {activeTab === 'packages' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Daftar Paket Umrah & Haji ({appData.packages?.length})
            </span>
            <button
              onClick={() => setShowPkgForm(!showPkgForm)}
              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{showPkgForm ? 'Tutup Form' : 'Tambah Paket Baru'}</span>
            </button>
          </div>

          {/* Add Package Form */}
          {showPkgForm && (
            <form onSubmit={handleCreatePackage} className="p-5 rounded-3xl bg-[#1a1226] border border-purple-500/40 space-y-3 animate-in fade-in">
              <h4 className="text-xs font-bold text-purple-300 uppercase">Input Paket Baru</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 mb-1">Nama Paket</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Paket Umrah Spesial Rajab"
                    value={pkgFormData.title}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Kategori</label>
                  <select
                    value={pkgFormData.category}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="reguler">Reguler / Promo</option>
                    <option value="plus">Umrah Plus Tour</option>
                    <option value="haji">Haji Khusus / Furoda</option>
                    <option value="tabungan">Program Tabungan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Maskapai</label>
                  <input
                    type="text"
                    required
                    value={pkgFormData.airline}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, airline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Durasi Hari</label>
                  <input
                    type="text"
                    required
                    value={pkgFormData.duration}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Tanggal Keberangkatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 15 Desember 2026"
                    value={pkgFormData.departureDate}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, departureDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Harga Quad (Rp)</label>
                  <input
                    type="number"
                    required
                    value={pkgFormData.priceQuad}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, priceQuad: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Harga Triple (Rp)</label>
                  <input
                    type="number"
                    value={pkgFormData.priceTriple}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, priceTriple: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Harga Double (Rp)</label>
                  <input
                    type="number"
                    value={pkgFormData.priceDouble}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, priceDouble: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Hotel Makkah</label>
                  <input
                    type="text"
                    value={pkgFormData.hotelMakkah}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, hotelMakkah: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Hotel Madinah</label>
                  <input
                    type="text"
                    value={pkgFormData.hotelMadinah}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, hotelMadinah: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Total Kuota Seat</label>
                  <input
                    type="number"
                    value={pkgFormData.quotaTotal}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, quotaTotal: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPkgForm(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs shadow"
                >
                  Simpan Paket
                </button>
              </div>
            </form>
          )}

          {/* Packages Table */}
          <div className="p-4 rounded-3xl bg-[#14222e] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase bg-black/30 text-slate-400">
                <tr>
                  <th className="p-3">ID / Paket</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Maskapai & Tgl</th>
                  <th className="p-3">Harga Quad</th>
                  <th className="p-3">Seat</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {appData.packages?.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-white/5 transition">
                    <td className="p-3">
                      <strong className="text-white block">{pkg.title}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{pkg.id}</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/5 text-slate-300">
                        {pkg.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-white block">{pkg.airline}</span>
                      <span className="text-[10px] text-slate-400">{pkg.departureDate} ({pkg.duration})</span>
                    </td>
                    <td className="p-3 font-mono font-bold text-amber-300">
                      Rp {Number(pkg.priceQuad || 0).toLocaleString('id-ID')}
                    </td>
                    <td className="p-3 font-mono">
                      <span className="text-emerald-400">{pkg.quotaFilled || 0}</span> / {pkg.quotaTotal || 45}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition"
                        title="Hapus Paket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: JAMAAH */}
      {activeTab === 'jamaah' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Data Jamaah Aktif Berangkat ({appData.jamaah?.length})
            </span>
            <button
              onClick={() => setShowJamaahForm(!showJamaahForm)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{showJamaahForm ? 'Tutup Form' : 'Tambah Jamaah'}</span>
            </button>
          </div>

          {/* Add Jamaah Form */}
          {showJamaahForm && (
            <form onSubmit={handleCreateJamaah} className="p-5 rounded-3xl bg-[#0f241a] border border-emerald-500/40 space-y-3 animate-in fade-in">
              <h4 className="text-xs font-bold text-emerald-300 uppercase">Input Jamaah Baru</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Nama Jamaah</label>
                  <input
                    type="text"
                    required
                    value={jamaahFormData.name}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">NIK (KTP)</label>
                  <input
                    type="text"
                    required
                    value={jamaahFormData.nik}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, nik: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">No. Paspor</label>
                  <input
                    type="text"
                    required
                    value={jamaahFormData.passportNo}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, passportNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">No. WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={jamaahFormData.phone}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Pilihan Paket</label>
                  <select
                    value={jamaahFormData.packageName}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, packageName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    {appData.packages?.map(p => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Status Visa</label>
                  <select
                    value={jamaahFormData.visaStatus}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, visaStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Proses Dokumen">Proses Dokumen</option>
                    <option value="Proses Kemenag KSA">Proses Kemenag KSA</option>
                    <option value="Issued / Selesai">Issued / Selesai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Status Pembayaran</label>
                  <select
                    value={jamaahFormData.paymentStatus}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="DP Masuk">DP Masuk</option>
                    <option value="Cicilan Masuk">Cicilan Masuk</option>
                    <option value="Lunas">Lunas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Kamar Hotel Makkah</label>
                  <input
                    type="text"
                    value={jamaahFormData.hotelMakkahRoom}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, hotelMakkahRoom: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Muthawif Pembimbing</label>
                  <input
                    type="text"
                    value={jamaahFormData.muthawif}
                    onChange={(e) => setJamaahFormData({ ...jamaahFormData, muthawif: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowJamaahForm(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                >
                  Simpan Jamaah
                </button>
              </div>
            </form>
          )}

          {/* Jamaah Table */}
          <div className="p-4 rounded-3xl bg-[#14222e] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase bg-black/30 text-slate-400">
                <tr>
                  <th className="p-3">Nama / Kontak</th>
                  <th className="p-3">Paspor / NIK</th>
                  <th className="p-3">Paket & Tgl</th>
                  <th className="p-3">Visa</th>
                  <th className="p-3">Bayar</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {appData.jamaah?.map((j) => (
                  <tr key={j.id} className="hover:bg-white/5 transition">
                    <td className="p-3">
                      <strong className="text-white block">{j.name}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{j.phone}</span>
                    </td>
                    <td className="p-3 font-mono">
                      <span className="text-amber-300 block">{j.passportNo}</span>
                      <span className="text-[10px] text-slate-500">{j.nik}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-white block leading-tight break-words">{j.packageName}</span>
                      <span className="text-[10px] text-slate-400">{j.departureDate}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        j.visaStatus.includes('Issued') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {j.visaStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400">
                        {j.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenDocumentPrint && onOpenDocumentPrint(j)}
                          className="p-1.5 rounded-lg bg-orange-950/60 hover:bg-orange-900 text-orange-300 transition"
                          title="Cetak Surat Paspor & Kwitansi"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenWhatsAppCenter && onOpenWhatsAppCenter(j)}
                          className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 transition"
                          title="Kirim Pesan WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteJamaah(j.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CALON JAMAAH (LEADS) */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pipeline Calon Jamaah Masuk ({appData.calonJamaah?.length})
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-[#14222e] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase bg-black/30 text-slate-400">
                <tr>
                  <th className="p-3">Nama / Kota</th>
                  <th className="p-3">No. WhatsApp</th>
                  <th className="p-3">Paket Diminati</th>
                  <th className="p-3">Mitra Rujukan</th>
                  <th className="p-3">Status Pipeline</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {appData.calonJamaah?.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition">
                    <td className="p-3">
                      <strong className="text-white block">{c.name}</strong>
                      <span className="text-[10px] text-slate-400">{c.city}</span>
                    </td>
                    <td className="p-3 font-mono">
                      <a href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                        {c.phone}
                      </a>
                    </td>
                    <td className="p-3">
                      <span className="text-white block">{c.targetPackage}</span>
                      <span className="text-[10px] text-slate-400">{c.budgetEstimate}</span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-blue-300">
                      {c.mitraReferralCode || '-'}
                    </td>
                    <td className="p-3">
                      <select
                        value={c.status}
                        onChange={(e) => handleUpdateLeadStatus(c.id, e.target.value)}
                        className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      >
                        <option value="Baru">Baru</option>
                        <option value="Follow Up">Follow Up</option>
                        <option value="Siap DP">Siap DP</option>
                        <option value="Terdaftar">Terdaftar</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteLead(c.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: TABUNGAN BSI */}
      {activeTab === 'tabungan' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Rekening Tabungan Umrah BSI ({appData.tabungan?.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appData.tabungan?.map((t) => {
              const progress = Math.min(100, Math.round((t.currentBalance / t.targetAmount) * 100));

              return (
                <div key={t.id} className="p-5 rounded-3xl bg-[#14222e] border border-white/10 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                        {t.accountNumber}
                      </span>
                      <h4 className="text-base font-black text-white">{t.jamaahName}</h4>
                      <span className="text-xs text-slate-400">{t.phone}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {t.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Saldo: <strong className="text-amber-300">Rp {t.currentBalance.toLocaleString('id-ID')}</strong></span>
                      <span className="text-slate-300">Target: Rp {t.targetAmount.toLocaleString('id-ID')} ({progress}%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[10px] text-slate-400">Target: {t.monthlyTarget.toLocaleString('id-ID')}/bln</span>
                    <button
                      onClick={() => setDepositModal({ open: true, item: t, amount: 1500000, note: 'Setoran Rutin' })}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Input Setoran</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: MITRA SYIAR */}
      {activeTab === 'mitra' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Manajemen Agen Mitra Syiar ({appData.mitra?.length})
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-[#14222e] border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase bg-black/30 text-slate-400">
                <tr>
                  <th className="p-3">Nama Mitra & Kode</th>
                  <th className="p-3">Wilayah</th>
                  <th className="p-3">Total Jamaah</th>
                  <th className="p-3">Komisi Cair</th>
                  <th className="p-3">Komisi Pending</th>
                  <th className="p-3 text-right">Pencairan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {appData.mitra?.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition">
                    <td className="p-3">
                      <strong className="text-white block">{m.name}</strong>
                      <span className="text-[10px] text-blue-400 font-mono">{m.code}</span>
                    </td>
                    <td className="p-3">{m.city}</td>
                    <td className="p-3 font-mono font-bold text-white">{m.totalJamaah} Orang</td>
                    <td className="p-3 font-mono text-emerald-400">Rp {(m.commissionPaid || 0).toLocaleString('id-ID')}</td>
                    <td className="p-3 font-mono text-amber-300">Rp {(m.commissionPending || 0).toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right">
                      {m.commissionPending > 0 ? (
                        <button
                          onClick={() => setPayoutModal({ open: true, item: m, amount: m.commissionPending })}
                          className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow"
                        >
                          Cairkan Komisi
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500">Lunas</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <div className="p-6 rounded-3xl bg-[#14222e] border border-white/10 space-y-5">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-black text-white">
              Pusat Cadangan & Pemulihan Database (Backup & Restore)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Seluruh data perusahaan (Paket, Jamaah, Calon Jamaah, Tabungan BSI, Mitra Syiar, dan Kajian) tersimpan aman di penyimpanan lokal dan dapat diexport dalam format JSON terenkripsi untuk backup berkala.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-black/25 border border-white/5 space-y-3">
              <Download className="w-6 h-6 text-purple-400" />
              <div>
                <strong className="text-xs text-white block">Export Database ke JSON</strong>
                <span className="text-[10px] text-slate-400">Download file backup database Kanomas</span>
              </div>
              <button
                onClick={handleExportJSON}
                className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs"
              >
                Unduh File Backup
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black/25 border border-white/5 space-y-3">
              <Upload className="w-6 h-6 text-blue-400" />
              <div>
                <strong className="text-xs text-white block">Import / Restore Database</strong>
                <span className="text-[10px] text-slate-400">Pulihkan database dari file .json</span>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs"
              >
                Pilih File JSON
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black/25 border border-white/5 space-y-3">
              <RotateCcw className="w-6 h-6 text-rose-400" />
              <div>
                <strong className="text-xs text-white block">Reset ke Konfigurasi Pabrik</strong>
                <span className="text-[10px] text-slate-400">Kembalikan ke data awal Kanomas resmi</span>
              </div>
              <button
                onClick={handleResetFactory}
                className="w-full py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-600/40 font-bold text-xs"
              >
                Reset Pabrik
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal Popup */}
      {depositModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#14222e] rounded-3xl border border-white/20 p-5 max-w-sm w-full space-y-3">
            <h4 className="text-sm font-bold text-white">Catat Setoran Tabungan BSI</h4>
            <p className="text-xs text-slate-300">Rekening: {depositModal.item?.accountNumber} ({depositModal.item?.jamaahName})</p>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Nominal Setoran (Rp)</label>
              <input
                type="number"
                value={depositModal.amount}
                onChange={(e) => setDepositModal({ ...depositModal, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Keterangan / Berita Transfer</label>
              <input
                type="text"
                value={depositModal.note}
                onChange={(e) => setDepositModal({ ...depositModal, note: e.target.value })}
                placeholder="Misal: Setoran via BSI Mobile"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDepositModal({ open: false, item: null, amount: 0, note: '' })}
                className="px-3 py-1.5 text-xs text-slate-400"
              >
                Batal
              </button>
              <button
                onClick={handleSaveDeposit}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Simpan Mutasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payout Modal Popup */}
      {payoutModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#14222e] rounded-3xl border border-white/20 p-5 max-w-sm w-full space-y-3">
            <h4 className="text-sm font-bold text-white">Konfirmasi Pencairan Komisi Mitra</h4>
            <p className="text-xs text-slate-300">Mitra: {payoutModal.item?.name} ({payoutModal.item?.code})</p>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Nominal yang Dicairkan (Rp)</label>
              <input
                type="number"
                value={payoutModal.amount}
                onChange={(e) => setPayoutModal({ ...payoutModal, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPayoutModal({ open: false, item: null, amount: 0 })}
                className="px-3 py-1.5 text-xs text-slate-400"
              >
                Batal
              </button>
              <button
                onClick={handlePayCommission}
                className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
