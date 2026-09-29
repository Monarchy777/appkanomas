import React, { useState, useEffect } from 'react';
import {
  Award,
  Users,
  DollarSign,
  Share2,
  Copy,
  CheckCircle,
  Plus,
  Send,
  Phone,
  FileText,
  Download,
  Clock,
  Sparkles,
  CreditCard,
  QrCode,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Target,
  Gift,
  AlertCircle,
  Printer,
  Layers,
  Search,
  ArrowUpRight,
  Building,
  Check,
  Calendar,
  X,
  UserCheck,
  BadgePercent
} from 'lucide-react';
import { db } from '../services/db';

export default function MitraDashboardView({ onOpenPackageDetail, onOpenDaftarMitra, currentUser }) {
  const [mitraList, setMitraList] = useState(() => db.getMitra());
  const [activeMitraIndex, setActiveMitraIndex] = useState(0);
  const currentMitra = mitraList[activeMitraIndex] || mitraList[0] || {};

  // Active Tab: 'ringkasan' | 'jamaah' | 'promosi' | 'kta'
  const [activeTab, setActiveTab] = useState('ringkasan');

  // Copy feedback
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Modals state
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showKtaModal, setShowKtaModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // Filter & Search Jamaah
  const [leadFilter, setLeadFilter] = useState('semua'); // 'semua' | 'berangkat' | 'prospek'
  const [searchQuery, setSearchQuery] = useState('');

  // Simulator State (Gamifikasi)
  const [simulatedPax, setSimulatedPax] = useState(20);

  // Withdrawal form state
  const [withdrawAmount, setWithdrawAmount] = useState(currentMitra.commissionPending || 0);
  const [withdrawNotes, setWithdrawNotes] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Add Lead form state
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    city: currentMitra.city ? currentMitra.city.split(' ')[0] : 'Tasikmalaya',
    targetPackage: 'Paket Umroh Bintang 4 Garuda Indonesia',
    notes: ''
  });
  const [leadSaved, setLeadSaved] = useState(false);

  // Selected Broadcast Template (0: Pelataran, 1: Promo Maulid, 2: Tabungan BSI)
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  // Listen to DB updates
  useEffect(() => {
    const unsub = db.subscribe((data) => {
      if (data.mitra) {
        setMitraList(data.mitra);
      }
    });
    return () => unsub();
  }, []);

  // Sync withdrawal amount when currentMitra changes
  useEffect(() => {
    if (currentMitra) {
      setWithdrawAmount(currentMitra.commissionPending || 0);
    }
  }, [currentMitra]);

  // Derived lists
  const calonJamaahList = db.getCalonJamaah().filter(c => c.mitraReferralCode === currentMitra.code);
  const jamaahList = db.getJamaah().filter(j => j.mitraCode === currentMitra.code);
  const packages = db.getPackages();
  const allWithdrawals = db.getWithdrawals ? db.getWithdrawals() : [];
  const mitraWithdrawals = allWithdrawals.filter(w => w.mitraCode === currentMitra.code || w.mitraId === currentMitra.id);

  // Referral URL
  const referralUrl = `https://kanomastasikmalaya.com/?ref=${currentMitra.code || 'KANOMAS-SYIAR'}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(referralUrl)}&color=0f172a&bgcolor=ffffff`;

  // Milestone target calculation for Free Umrah
  const TARGET_FREE_UMRAH = 20;
  const currentTotal = currentMitra.totalJamaah || 0;
  const progressPercent = Math.min(100, Math.round((currentTotal / TARGET_FREE_UMRAH) * 100));
  const remainingPax = Math.max(0, TARGET_FREE_UMRAH - currentTotal);

  // Copy referral link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Broadcast WA Templates
  const broadcastTemplates = [
    {
      title: 'Paket Umrah Pelataran Dekat Ka\'bah & Garuda Direct',
      category: 'Reguler Bintang 4 & 5',
      text: `*Assalamu'alaikum Warahmatullahi Wabarakatuh*\n\n` +
        `Bagi Bapak/Ibu dan sahabat yang rindu bersujud di depan Ka'bah & berziarah ke Makam Rasulullah ﷺ, mari bergabung bersama *PT Kanomas Artha Wisata* (PPIU Kemenag No. U.310):\n\n` +
        `✨ *Keunggulan Layanan Kanomas:*\n` +
        `• 🏨 Hotel Bintang 4 & 5 Pelataran Dekat Masjid (Akses Lift Langsung, Nyaman Lansia)\n` +
        `• ✈️ Tiket Pesawat Direct Garuda Indonesia PP (Tanpa Transit Melelahkan)\n` +
        `• 🕋 Bimbingan Ibadah Khusyuk Sesuai Sunnah bersama Asatidz Berpengalaman\n` +
        `• 🍽️ Fullboard Makanan Cita Rasa Nusantara 3x Sehari\n` +
        `• 💧 Gratis Air Zamzam 5 Liter Resmi\n\n` +
        `Daftar & konsultasi langsung melalui tautan resmi Mitra Syiar:\n` +
        `👉 ${referralUrl}\n\n` +
        `Atau hubungi saya (*${currentMitra.name}* - Mitra Syiar Kanomas) di nomor ini. _Semoga Allah SWT mudahkan rezeki & langkah kita menuju Baitullah._ Amin.`
    },
    {
      title: 'Promo Spesial Bayar 1 Berangkat 2 (Buy 1 Get 1)',
      category: 'Promo Super Hemat',
      text: `*Bismillah, Promo Umrah Akbar Kanomas Tasikmalaya!*\n\n` +
        `Kabar gembira untuk keluarga! Tersedia Program *Promo Spesial Umrah (Bayar 1 Berangkat 2)* maskapai Oman Air / Garuda Indonesia:\n\n` +
        `💎 *1 Biaya Paket Langsung Berangkat Berdua (Suami Istri / Orang Tua & Anak)*\n` +
        `💎 Termasuk City Tour 1 Malam di Muscat / Jeddah\n` +
        `💎 Hotel Bintang 4 Madinah & Makkah\n` +
        `💎 Visa Umrah Resmi Siskopatuh Kemenag & Asuransi Lengkap\n\n` +
        `⚠️ *Seat Promo Terbatas! Kuota tinggal beberapa kamar saja.*\n\n` +
        `Klaim seat promo sekarang melalui tautan Mitra Syiar:\n` +
        `👉 ${referralUrl}\n\n` +
        `Hubungi: *${currentMitra.name}* (${currentMitra.phone || 'Mitra Kanomas'})`
    },
    {
      title: 'Tabungan Umrah Berkah BSI Tanpa Riba & Biaya Admin',
      category: 'Perencanaan Syariah',
      text: `*Assalamu'alaikum Warahmatullahi Wabarakatuh*\n\n` +
        `Ingin menunaikan ibadah umrah tapi belum siap biaya tunai sekaligus? Rencanakan dengan tenang dan berkah melalui *Tabungan Umrah Syariah Kanomas x Bank Syariah Indonesia (BSI)*:\n\n` +
        `✅ Setoran awal ringan mulai Rp 500.000\n` +
        `✅ 100% Bebas biaya administrasi bulanan (Akad Wadiah Syariah)\n` +
        `✅ Target nabung fleksibel mulai Rp 1 Juta-an / bulan\n` +
        `✅ Otomatis terdaftar sebagai Calon Jamaah Prioritas Kanomas\n` +
        `✅ Mendapatkan Kartu Tabungan Resmi Kanomas\n\n` +
        `Mulai langkah berkah Anda hari ini:\n` +
        `👉 ${referralUrl}\n\n` +
        `Konsultasi langsung bersama Mitra Syiar: *${currentMitra.name}*`
    }
  ];

  const handleShareBroadcast = () => {
    const activeText = broadcastTemplates[selectedTemplate].text;
    const url = `https://wa.me/?text=${encodeURIComponent(activeText)}`;
    window.open(url, '_blank');
  };

  const handleCopyBroadcast = () => {
    const activeText = broadcastTemplates[selectedTemplate].text;
    navigator.clipboard.writeText(activeText);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  // Submit Withdrawal Request
  const handleSubmitWithdrawal = (e) => {
    e.preventDefault();
    const val = Number(withdrawAmount);
    if (!val || val <= 0) {
      alert('Masukkan nominal pencairan komisi yang valid.');
      return;
    }
    if (val > (currentMitra.commissionPending || 0)) {
      alert(`Nominal melebihi saldo komisi yang siap dicairkan (Rp ${(currentMitra.commissionPending || 0).toLocaleString('id-ID')}).`);
      return;
    }

    db.requestWithdrawal({
      mitraId: currentMitra.id,
      mitraCode: currentMitra.code,
      mitraName: currentMitra.name,
      amount: val,
      bankName: currentMitra.bankName || 'Bank Syariah Indonesia (BSI)',
      accountNumber: currentMitra.accountNumber || '-',
      accountHolder: currentMitra.accountHolder || currentMitra.name,
      notes: withdrawNotes || `Pencairan Komisi Mitra Syiar ${currentMitra.name}`
    });

    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setShowWithdrawModal(false);
      setWithdrawNotes('');
    }, 1800);
  };

  // Submit Lead Registration
  const handleAddLead = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    db.addCalonJamaah({
      ...leadForm,
      budgetEstimate: 'Rujukan Langsung Mitra Syiar',
      targetDepartureMonth: 'Musim 2026',
      status: 'Baru',
      mitraReferralCode: currentMitra.code
    });

    setLeadSaved(true);
    setTimeout(() => {
      setLeadSaved(false);
      setShowAddLeadModal(false);
      setLeadForm({
        name: '',
        phone: '',
        city: currentMitra.city ? currentMitra.city.split(' ')[0] : 'Tasikmalaya',
        targetPackage: 'Paket Umroh Bintang 4 Garuda Indonesia',
        notes: ''
      });
    }, 1500);
  };

  // Filtered Jamaah combined list
  const combinedJamaah = [
    ...jamaahList.map(j => ({ ...j, isConfirmed: true })),
    ...calonJamaahList.map(c => ({ ...c, isConfirmed: false }))
  ].filter(item => {
    if (leadFilter === 'berangkat' && !item.isConfirmed) return false;
    if (leadFilter === 'prospek' && item.isConfirmed) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name?.toLowerCase().includes(q);
      const matchPhone = item.phone?.includes(q);
      const matchPkg = (item.packageName || item.targetPackage || '').toLowerCase().includes(q);
      return matchName || matchPhone || matchPkg;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-28 mx-3 sm:mx-6 mt-3 max-w-6xl xl:mx-auto">
      
      {/* 1. HEADER PROFIL MITRA & LEGALITAS RESMI KANOMAS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1f33] via-[#0d2a45] to-[#081524] border border-amber-500/30 shadow-2xl p-5 sm:p-7 text-white">
        {/* Subtle Islamic Motif Glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Mitra Info */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center font-black text-2xl text-amber-300">
                  {currentMitra.name ? currentMitra.name.charAt(0) : 'M'}
                </div>
              </div>
              <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md">
                <CheckCircle className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Mitra Syiar Resmi
                </span>
                <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-full font-mono">
                  PPIU No. U.310 / 2021
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {currentMitra.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  Wilayah: <strong className="text-white">{currentMitra.city}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  Bergabung: <span className="text-slate-400">{currentMitra.joinedDate || '2026'}</span>
                </span>
              </div>

              {/* Referral Code Bar */}
              <div className="pt-1 flex items-center gap-2">
                <span className="text-xs text-slate-400">Kode Referral:</span>
                <div className="px-3 py-1 rounded-xl bg-black/40 border border-amber-400/40 flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm font-black text-amber-300 tracking-wider">
                    {currentMitra.code}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="text-slate-400 hover:text-white p-0.5 transition"
                    title="Salin Link Referral"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {copiedLink && (
                  <span className="text-[10px] text-emerald-400 font-bold animate-in fade-in">
                    Link Tersalin!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Header */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
            {/* KTA Button */}
            <button
              onClick={() => setShowKtaModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2 active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span>Lihat KTA Digital</span>
            </button>

            {/* Withdraw Button */}
            <button
              onClick={() => setShowWithdrawModal(true)}
              disabled={(currentMitra.commissionPending || 0) <= 0}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2 active:scale-95 ${
                (currentMitra.commissionPending || 0) > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Tarik Ujrah</span>
              {(currentMitra.commissionPending || 0) > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black">
                  Rp {((currentMitra.commissionPending || 0) / 1000000).toFixed(0)} Jt
                </span>
              )}
            </button>

            {/* Switch Profile Dropdown */}
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-2 rounded-xl border border-white/10 text-xs">
              <span className="text-[11px] text-slate-400 hidden sm:inline">Ganti:</span>
              <select
                value={activeMitraIndex}
                onChange={(e) => setActiveMitraIndex(Number(e.target.value))}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                {mitraList.map((m, idx) => (
                  <option key={m.id} value={idx} className="bg-slate-900 text-white">
                    {m.name} ({m.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ALUR NAVIGASI TAB (SEGMENTED CONTROL) */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 overflow-x-auto shadow-inner">
        <button
          onClick={() => setActiveTab('ringkasan')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 ${
            activeTab === 'ringkasan'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>1. Ringkasan & Finansial</span>
        </button>

        <button
          onClick={() => setActiveTab('jamaah')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 ${
            activeTab === 'jamaah'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>2. Jamaah Binaan ({combinedJamaah.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('promosi')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 ${
            activeTab === 'promosi'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>3. Kit Promosi Digital</span>
        </button>

        <button
          onClick={() => setActiveTab('kta')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 ${
            activeTab === 'kta'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>4. KTA & Legalitas</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: RINGKASAN & FINANSIAL */}
      {activeTab === 'ringkasan' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* KPI COMMISSION CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Jamaah */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-1.5 relative overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                Total Jamaah Syiar
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                {currentMitra.totalJamaah || 0} <span className="text-sm font-sans font-normal text-slate-400">Pax</span>
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3 h-3" /> Terdaftar di Kanomas
              </span>
            </div>

            {/* Total Komisi */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-1.5 relative overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-2">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                Total Komisi Hak Mitra
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono block">
                Rp {(currentMitra.totalCommission || 0).toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-slate-400">
                Ujrah flat Rp 1.000.000 / pax
              </span>
            </div>

            {/* Komisi Sudah Dicairkan */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-1.5 relative overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                Ujrah Sudah Ditransfer
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block">
                Rp {(currentMitra.commissionPaid || 0).toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-slate-400">
                Masuk rekening {currentMitra.bankName ? currentMitra.bankName.split(' ')[0] : 'BSI'}
              </span>
            </div>

            {/* Komisi Pending / Siap Ditarik */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#192f44] to-[#122232] border border-emerald-500/40 shadow-xl space-y-1.5 relative overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center mb-2 font-black shadow-md">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-emerald-300 uppercase font-bold tracking-wider block">
                Ujrah Siap Dicairkan
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                Rp {(currentMitra.commissionPending || 0).toLocaleString('id-ID')}
              </span>
              <button
                onClick={() => setShowWithdrawModal(true)}
                disabled={(currentMitra.commissionPending || 0) <= 0}
                className="mt-1 w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-[11px] transition shadow flex items-center justify-center gap-1"
              >
                <span>Ajukan Pencairan</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* SIMULATOR & REWARD TARGET (FREE UMRAH) */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#112437] via-[#152e46] to-[#0f1f2e] border border-amber-500/30 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white">
                      Target Reward Syiar: Tiket Umrah Gratis!
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-400 text-slate-950">
                      Reward Utama
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Ajak 20 Jamaah berangkat bersama Kanomas dan dapatkan <strong>1 Tiket Umrah Full Gratis</strong>.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Progres Anda:</span>
                <span className="text-xl font-black text-amber-300 font-mono">
                  {currentTotal} / {TARGET_FREE_UMRAH} Jamaah ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                <span>0 Jamaah</span>
                <span>Level 1: 5 Jamaah (Rp 5 Jt)</span>
                <span>Level 2: 10 Jamaah (Koper VIP)</span>
                <span className="text-amber-300 font-bold">20 Jamaah (FREE UMRAH)</span>
              </div>
            </div>

            {/* Status Info Box */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {remainingPax > 0 ? (
                    <>
                      Hanya butuh <strong className="text-amber-300 font-bold">{remainingPax} jamaah lagi</strong> untuk klaim Tiket Umrah Gratis Anda!
                    </>
                  ) : (
                    <strong className="text-emerald-400 font-bold">
                      Maa Syaa Allah! Anda telah mencapai 20 Jamaah dan berhak klaim Tiket Umrah Gratis!
                    </strong>
                  )}
                </span>
              </div>

              <button
                onClick={() => setActiveTab('promosi')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition shrink-0 flex items-center justify-center gap-1.5 shadow"
              >
                <span>Sebar Promosi Sekarang</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Calculator Syiar */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-400" />
                  Simulasi Potensi Ujrah Syiar Anda:
                </span>
                <span className="text-amber-300 font-mono font-bold">
                  {simulatedPax} Jamaah = Rp {(simulatedPax * 1000000).toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={simulatedPax}
                  onChange={(e) => setSimulatedPax(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-xs font-bold text-white px-2 py-1 rounded bg-black/40 border border-white/10 shrink-0">
                  {simulatedPax} Pax
                </span>
              </div>
            </div>
          </div>

          {/* RIWAYAT PENCAIRAN UJRAH */}
          <div className="p-6 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Transparansi Finansial
                </span>
                <h3 className="text-base font-black text-white">
                  Riwayat Pencairan Ujrah Mitra ({mitraWithdrawals.length})
                </h3>
              </div>

              <button
                onClick={() => setShowWithdrawModal(true)}
                disabled={(currentMitra.commissionPending || 0) <= 0}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tarik Ujrah</span>
              </button>
            </div>

            {mitraWithdrawals.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-black/20 rounded-2xl border border-white/5">
                Belum ada riwayat pencairan dana. Ajukan penarikan ujrah jika Anda memiliki komisi pending.
              </div>
            ) : (
              <div className="space-y-2">
                {mitraWithdrawals.map((wd) => (
                  <div
                    key={wd.id}
                    className="p-3.5 rounded-2xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-white font-mono">{wd.id}</strong>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                          {wd.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Transfer ke {wd.bankName} - No. {wd.accountNumber} a/n {wd.accountHolder}
                      </p>
                      <span className="text-[10px] text-slate-500">{wd.notes}</span>
                    </div>

                    <div className="text-right sm:shrink-0">
                      <span className="font-mono text-sm font-black text-amber-300 block">
                        Rp {wd.amount.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-400">{wd.requestDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: JAMAAH BINAAN (PIPELINE) */}
      {activeTab === 'jamaah' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Action Bar & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLeadFilter('semua')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  leadFilter === 'semua'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'bg-black/30 text-slate-400 hover:text-white'
                }`}
              >
                Semua ({jamaahList.length + calonJamaahList.length})
              </button>
              <button
                onClick={() => setLeadFilter('berangkat')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  leadFilter === 'berangkat'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'bg-black/30 text-slate-400 hover:text-white'
                }`}
              >
                Resmi Berangkat ({jamaahList.length})
              </button>
              <button
                onClick={() => setLeadFilter('prospek')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  leadFilter === 'prospek'
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-black/30 text-slate-400 hover:text-white'
                }`}
              >
                Prospek Konsultasi ({calonJamaahList.length})
              </button>
            </div>

            {/* Search & Add Button */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama / paket..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                onClick={() => setShowAddLeadModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow transition flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Input Prospek Baru</span>
              </button>
            </div>
          </div>

          {/* List of Jamaah Cards */}
          <div className="space-y-3">
            {combinedJamaah.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 bg-[#14222e] rounded-3xl border border-white/10 space-y-2">
                <Users className="w-8 h-8 text-slate-600 mx-auto" />
                <p>Tidak ada data jamaah yang cocok dengan filter saat ini.</p>
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Tambah Calon Jamaah Sekarang
                </button>
              </div>
            ) : (
              combinedJamaah.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition ${
                    item.isConfirmed
                      ? 'bg-gradient-to-r from-emerald-950/40 via-[#102b28] to-[#14222e] border-emerald-500/30'
                      : 'bg-[#14222e] border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    {/* Left: Info Jamaah */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm sm:text-base font-black">
                          {item.name}
                        </strong>
                        {item.isConfirmed ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500 text-slate-950 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> {item.paymentStatus || 'Lunas'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300">
                            Prospek ({item.status || 'Baru'})
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-slate-400 text-[11px]">
                        <span>Paket: <strong className="text-slate-200">{item.packageName || item.targetPackage}</strong></span>
                        <span>•</span>
                        <span>Kontak: <strong className="text-slate-200 font-mono">{item.phone}</strong></span>
                        {item.departureDate && (
                          <>
                            <span>•</span>
                            <span className="text-amber-300">Jadwal: {item.departureDate}</span>
                          </>
                        )}
                      </div>

                      {item.notes && (
                        <p className="text-[11px] text-slate-400 italic pt-0.5">
                          "{item.notes}"
                        </p>
                      )}
                    </div>

                    {/* Right: Commission & Action */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      <div className="text-left sm:text-right">
                        {item.isConfirmed ? (
                          <>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Ujrah Sah</span>
                            <span className="font-mono text-sm font-black text-amber-300 block">Rp 1.000.000</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimasi Potensi</span>
                            <span className="font-mono text-xs font-bold text-slate-300 block">Rp 1.000.000</span>
                          </>
                        )}
                      </div>

                      {/* WhatsApp Follow-up */}
                      <a
                        href={`https://wa.me/${(item.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Assalamu'alaikum Warahmatullahi Wabarakatuh Bapak/Ibu ${item.name}, perkenalkan saya ${currentMitra.name} dari Mitra Syiar Resmi PT Kanomas Artha Wisata. Apakah ada informasi terkait paket ${item.packageName || item.targetPackage || 'Umrah'} yang dapat saya bantu?`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition shrink-0"
                        title="Follow Up via WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Follow Up WA</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: KIT PROMOSI DIGITAL */}
      {activeTab === 'promosi' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* TAUTAN REFERRAL KHUSUS */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#13263a] to-[#0f1f2e] border border-blue-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 inline-block mb-1">
                  Tautan Referral Resmi Anda
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Tautan Unik Terkunci Otomatis ke Database Kanomas
                </h3>
                <p className="text-xs text-slate-300">
                  Setiap calon jamaah yang mendaftar melalui tautan ini otomatis terkunci atas nama Anda dan ujrah Rp 1.000.000 masuk ke saldo Anda.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs transition flex items-center gap-1.5 border border-slate-700 shadow"
                >
                  {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Tersalin!' : 'Salin Tautan'}</span>
                </button>

                <button
                  onClick={handleShareBroadcast}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition flex items-center gap-1.5 shadow"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Kirim ke WhatsApp</span>
                </button>
              </div>
            </div>

            {/* URL Display */}
            <div className="p-3.5 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between font-mono text-xs text-amber-300 overflow-x-auto">
              <span>{referralUrl}</span>
              <span className="text-[10px] text-slate-400 font-sans ml-2 shrink-0">Kode: {currentMitra.code}</span>
            </div>
          </div>

          {/* GENERATOR BROADCAST WHATSAPP */}
          <div className="p-6 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Template Broadcast WhatsApp
                </span>
                <h3 className="text-base font-black text-white">
                  Pilih Pesan Syiar yang Ingin Anda Bagikan
                </h3>
              </div>

              <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
                {broadcastTemplates.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTemplate(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      selectedTemplate === idx
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Template {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">
                {broadcastTemplates[selectedTemplate].title} ({broadcastTemplates[selectedTemplate].category})
              </span>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 whitespace-pre-line font-sans leading-relaxed max-h-60 overflow-y-auto">
                {broadcastTemplates[selectedTemplate].text}
              </div>
            </div>

            {/* Actions for Broadcast */}
            <div className="flex justify-end items-center gap-2 pt-1">
              <button
                onClick={handleCopyBroadcast}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
              >
                {copiedMsg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMsg ? 'Teks Tersalin!' : 'Salin Teks'}</span>
              </button>

              <button
                onClick={handleShareBroadcast}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim ke Kontak / Grup WhatsApp</span>
              </button>
            </div>
          </div>

          {/* FLYER & BROSUR RESMI KANOMAS */}
          <div className="p-6 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  Materi Promosi Resolusi Tinggi
                </span>
                <h3 className="text-base font-black text-white">
                  Flyer & Brosur Resmi Paket Kanomas
                </h3>
              </div>
              <span className="text-xs text-slate-400">Klik untuk melihat detail</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => onOpenPackageDetail && onOpenPackageDetail(pkg)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-amber-400 transition p-2 space-y-2 flex flex-col justify-between"
                >
                  <div className="h-40 overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center relative">
                    <img
                      src={pkg.coverImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-slate-950/80 text-amber-300 backdrop-blur-xs">
                      {pkg.duration}
                    </span>
                  </div>

                  <div className="space-y-1 px-1">
                    <h5 className="text-[11px] font-bold text-white leading-tight line-clamp-2">
                      {pkg.title}
                    </h5>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                      Mulai Rp {(pkg.priceQuad || 0).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="pt-1 px-1 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-amber-300">
                    <span>Lihat Brosur</span>
                    <Share2 className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KTA DIGITAL & LEGALITAS */}
      {activeTab === 'kta' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Visual KTA Card (Eksklusif Emas-Navy) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0a1626] via-[#0f243d] to-[#07111c] border-2 border-amber-400/50 shadow-2xl relative overflow-hidden text-white space-y-6">
              {/* Card Gold Trim Watermark */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* KTA Header */}
              <div className="flex items-start justify-between border-b border-amber-400/30 pb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                    KARTU TANDA ANGGOTA RESMI
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white tracking-wide">
                    PT KANOMAS ARTHA WISATA
                  </h4>
                  <p className="text-[9px] text-slate-300 font-mono">
                    PPIU No. U.310 / 2021 • PIHK No. 9120313132406
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* KTA Body */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-20 h-24 rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-[10px] bg-slate-900 flex flex-col items-center justify-center text-amber-300">
                    <span className="text-3xl font-black">{currentMitra.name ? currentMitra.name.charAt(0) : 'M'}</span>
                    <span className="text-[8px] uppercase font-bold text-slate-400 mt-1">Mitra Syiar</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Nama Mitra:</span>
                    <h5 className="text-sm font-black text-white">{currentMitra.name}</h5>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-slate-400 block font-bold">Nomor ID Syiar:</span>
                      <span className="font-mono text-amber-300 font-black">{currentMitra.code}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">NIK KTP:</span>
                      <span className="font-mono text-slate-200">{currentMitra.nik || '327801********'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Wilayah Tugas:</span>
                      <span className="text-slate-200">{currentMitra.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Status:</span>
                      <span className="text-emerald-400 font-black">Aktif (Resmi)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Barcode Area */}
              <div className="p-3 bg-white text-slate-900 rounded-2xl flex items-center justify-between gap-3 shadow-inner">
                <div className="w-16 h-16 shrink-0 bg-white p-1 rounded-lg border border-slate-200">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code Referral"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-0.5 flex-1">
                  <span className="text-[10px] font-bold text-slate-600 block uppercase">
                    Scan untuk Pendaftaran Jamaah
                  </span>
                  <span className="text-xs font-mono font-black text-slate-900 block truncate">
                    {referralUrl}
                  </span>
                  <p className="text-[9px] text-slate-500">
                    Arahkan kamera HP calon jamaah untuk otomatis terhubung dengan Anda.
                  </p>
                </div>
              </div>

              {/* KTA Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-400/20 text-xs">
                <span className="text-[10px] text-slate-400">Berlaku s/d Musim 1448H / 2027</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak</span>
                  </button>
                  <button
                    onClick={handleShareBroadcast}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center gap-1 transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Legalitas & Kode Etik Syiar */}
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                  <h4 className="font-black text-sm text-white">
                    Kepastian Hukum & Legalitas Penyelenggaraan
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                  <p>
                    PT Kanomas Artha Wisata adalah Penyelenggara Perjalanan Ibadah Umrah (PPIU) dan Ibadah Haji Khusus (PIHK) resmi yang terdaftar di Kementerian Agama Republik Indonesia:
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-200">
                    <li><strong>Izin Umrah:</strong> SK PPIU No. U.310 Tahun 2021</li>
                    <li><strong>Izin Haji Khusus:</strong> PIHK No. 9120313132406</li>
                    <li><strong>Terakreditasi A</strong> oleh Badan Akreditasi Nasional Kemenag RI</li>
                    <li>Terdaftar aktif di sistem <strong>Siskopatuh Kemenag RI</strong></li>
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-3 text-xs">
                <h4 className="font-black text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Hak & Kode Etik Mitra Syiar Kanomas
                </h4>
                <div className="space-y-2 text-slate-300 leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-black/20 border border-white/5 space-y-0.5">
                    <strong className="text-amber-300 block">1. Hak Ujrah Pasti Rp 1.000.000 / Jamaah</strong>
                    <span>Komisi dibayarkan penuh tanpa potongan begitu pembayaran DP atau pelunasan jamaah terverifikasi.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/20 border border-white/5 space-y-0.5">
                    <strong className="text-amber-300 block">2. Transparansi & Kejujuran Fasilitas</strong>
                    <span>Mitra wajib menyampaikan fasilitas hotel, maskapai, dan paket secara jujur sesuai brosur resmi Kanomas.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/20 border border-white/5 space-y-0.5">
                    <strong className="text-amber-300 block">3. Pendampingan Manasik Bersama</strong>
                    <span>Mitra berhak hadir mendampingi jamaah binaan saat bimbingan manasik di Tasikmalaya dan pelepasan bandara.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 1: AJUKAN PENCAIRAN UJRAH */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white text-slate-800 border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">Ajukan Pencairan Ujrah</h3>
                  <p className="text-[11px] text-emerald-200">Pencairan komisi resmi Mitra Syiar Kanomas</p>
                </div>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">
              {withdrawSuccess ? (
                <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Pengajuan Berhasil Diproses!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dana sebesar <strong>Rp {Number(withdrawAmount).toLocaleString('id-ID')}</strong> telah dicatat dan diteruskan ke bagian Keuangan Kanomas untuk transfer ke rekening Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitWithdrawal} className="space-y-4 text-xs">
                  {/* Saldo Tersedia */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-800">Saldo Siap Dicairkan</span>
                      <h4 className="text-lg font-black text-amber-900 font-mono">
                        Rp {(currentMitra.commissionPending || 0).toLocaleString('id-ID')}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(currentMitra.commissionPending || 0)}
                      className="px-2.5 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-[10px]"
                    >
                      Tarik Semua
                    </button>
                  </div>

                  {/* Rekening Tujuan */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Rekening Tujuan Terdaftar:</span>
                    <strong className="text-xs font-black text-slate-800 block">
                      {currentMitra.bankName || 'Bank Syariah Indonesia (BSI)'} - No. {currentMitra.accountNumber || '7149882310'}
                    </strong>
                    <span className="text-[11px] text-slate-600">a/n {currentMitra.accountHolder || currentMitra.name}</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Nominal yang Ditarik (Rp):</label>
                    <input
                      type="number"
                      required
                      min="1000000"
                      step="500000"
                      max={currentMitra.commissionPending || 0}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Catatan Pencairan (Opsional):</label>
                    <input
                      type="text"
                      placeholder="Contoh: Pencairan komisi jamaah kloter Oktober"
                      value={withdrawNotes}
                      onChange={(e) => setWithdrawNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowWithdrawModal(false)}
                      className="px-4 py-2.5 rounded-xl text-xs text-slate-500 hover:text-slate-800 font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Konfirmasi Penarikan</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: KTA DIGITAL FULLSCREEN POPUP */}
      {showKtaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0b1828] border-2 border-amber-400 shadow-2xl p-6 text-white space-y-5 relative">
            <button
              onClick={() => setShowKtaModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                KARTU IDENTITAS RESMI MITRA SYIAR
              </span>
              <h3 className="text-lg font-black text-white">
                PT KANOMAS ARTHA WISATA
              </h3>
              <p className="text-[10px] text-slate-300 font-mono">
                PPIU No. U.310 / 2021 • PIHK No. 9120313132406
              </p>
            </div>

            {/* Visual Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-amber-400/30 flex items-center gap-4">
              <div className="w-20 h-24 rounded-xl bg-amber-400 text-slate-950 flex flex-col items-center justify-center font-black shrink-0">
                <span className="text-3xl">{currentMitra.name ? currentMitra.name.charAt(0) : 'M'}</span>
                <span className="text-[8px] uppercase">Mitra Syiar</span>
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="text-base font-black text-white">{currentMitra.name}</h4>
                <div className="text-[11px] text-slate-300 space-y-0.5">
                  <p>Kode Syiar: <strong className="text-amber-300 font-mono">{currentMitra.code}</strong></p>
                  <p>NIK: <span className="font-mono">{currentMitra.nik || '327801********'}</span></p>
                  <p>Wilayah: {currentMitra.city}</p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="p-4 rounded-2xl bg-white text-slate-900 flex items-center justify-center flex-col gap-2 text-center">
              <div className="w-36 h-36">
                <img
                  src={qrCodeUrl}
                  alt="QR Code Referral"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-mono font-black text-slate-900">{referralUrl}</span>
              <p className="text-[10px] text-slate-500 max-w-xs">
                Scan kode QR di atas untuk membuka formulir pendaftaran jamaah resmi binaan {currentMitra.name}.
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Kartu</span>
              </button>
              <button
                onClick={() => setShowKtaModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INPUT CALON JAMAAH BARU */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white text-slate-800 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">Input Calon Jamaah Rujukan</h3>
                  <p className="text-[11px] text-emerald-200">Mitra Syiar: {currentMitra.name} ({currentMitra.code})</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {leadSaved ? (
                <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Calon Jamaah Berhasil Didaftarkan!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Data calon jamaah telah masuk ke sistem database Kanomas dan terkait langsung dengan kode referral Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddLead} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Nama Calon Jamaah:</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ibu Hj. Rosita"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">No. WhatsApp:</label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Kota Domisili:</label>
                      <input
                        type="text"
                        value={leadForm.city}
                        onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Pilihan Paket Diminati:</label>
                    <select
                      value={leadForm.targetPackage}
                      onChange={(e) => setLeadForm({ ...leadForm, targetPackage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500"
                    >
                      {packages.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Catatan Tambahan / Kebutuhan Khusus:</label>
                    <textarea
                      rows="2"
                      placeholder="Rencana bulan keberangkatan, jumlah orang sekamar, dll..."
                      value={leadForm.notes}
                      onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 resize-none focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddLeadModal(false)}
                      className="px-4 py-2.5 text-xs text-slate-500 hover:text-slate-800 font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Simpan Calon Jamaah</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
