import React, { useState, useEffect, useRef } from 'react';
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
  BadgePercent,
  Lock,
  MessageCircle,
  Loader2,
  RefreshCw,
  Sliders,
  CheckCheck
} from 'lucide-react';
import { db } from '../services/db';
import { toCanvas } from 'html-to-image';
import { KANOMAS_LOGO_BASE64 } from '../config/logoBase64';

export default function MitraDashboardView({ onOpenPackageDetail, onOpenDaftarMitra, currentUser }) {
  const [mitraList, setMitraList] = useState(() => db.getMitra());
  const [activeMitraIndex, setActiveMitraIndex] = useState(0);
  const currentMitra = mitraList[activeMitraIndex] || mitraList[0] || {};

  // Active Tab: 'ringkasan' | 'jamaah' | 'promosi' | 'kta'
  const [activeTab, setActiveTab] = useState('ringkasan');

  // Copy & feedback states
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Modals state
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showKtaModal, setShowKtaModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [selectedFlyerPkg, setSelectedFlyerPkg] = useState(null); // For personalized flyer modal
  const [lastSubmittedWd, setLastSubmittedWd] = useState(null);

  // Filter & Search Jamaah
  const [leadFilter, setLeadFilter] = useState('semua'); // 'semua' | 'berangkat' | 'prospek'
  const [searchQuery, setSearchQuery] = useState('');

  // Simulator State (Gamifikasi)
  const [simulatedPax, setSimulatedPax] = useState(20);

  // Withdrawal form state
  const [withdrawAmount, setWithdrawAmount] = useState(currentMitra.commissionPending || 0);
  const [withdrawBank, setWithdrawBank] = useState(currentMitra.bankName || 'Bank Syariah Indonesia (BSI)');
  const [withdrawAccNum, setWithdrawAccNum] = useState(currentMitra.accountNumber || '');
  const [withdrawAccHolder, setWithdrawAccHolder] = useState(currentMitra.accountHolder || currentMitra.name || '');
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

  // Selected Broadcast Template (0: Reguler, 1: Promo Maulid, 2: Tabungan BSI)
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  // DOM Refs for image rendering
  const ktaCardRef = useRef(null);
  const ktaModalCardRef = useRef(null);
  const flyerCardRef = useRef(null);

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
      setWithdrawBank(currentMitra.bankName || 'Bank Syariah Indonesia (BSI)');
      setWithdrawAccNum(currentMitra.accountNumber || '');
      setWithdrawAccHolder(currentMitra.accountHolder || currentMitra.name || '');
    }
  }, [currentMitra]);

  // Derived lists
  const calonJamaahList = db.getCalonJamaah().filter(c => c.mitraReferralCode === currentMitra.code);
  const jamaahList = db.getJamaah().filter(j => j.mitraCode === currentMitra.code);
  const packages = db.getPackages();
  const allWithdrawals = db.getWithdrawals ? db.getWithdrawals() : [];
  const mitraWithdrawals = allWithdrawals.filter(w => w.mitraCode === currentMitra.code || w.mitraId === currentMitra.id);

  // Referral URL (Dynamic origin based on current browser window)
  const originUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://appkanomas.mediasosial.net';
  const referralUrl = `${originUrl}/?ref=${currentMitra.code || 'KANOMAS-SYIAR'}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(referralUrl)}&color=0f172a&bgcolor=ffffff`;

  // Milestone target calculation for Free Umrah
  const TARGET_FREE_UMRAH = 20;
  const currentTotal = currentMitra.totalJamaah || 0;
  const progressPercent = Math.min(100, Math.round((currentTotal / TARGET_FREE_UMRAH) * 100));
  const remainingPax = Math.max(0, TARGET_FREE_UMRAH - currentTotal);

  // Copy referral link
  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralUrl);
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
        `Atau hubungi saya (*${currentMitra.name}* - Mitra Syiar Kanomas) di nomor ini: ${currentMitra.phone || ''}. _Semoga Allah SWT mudahkan rezeki & langkah kita menuju Baitullah._ Amin.`
    },
    {
      title: 'Promo Spesial Bayar 1 Berangkat 2 (Buy 1 Get 1)',
      category: 'Promo Super Hemat',
      text: `*Bismillah, Promo Umrah Akbar Kanomas!*\n\n` +
        `Kabar gembira untuk keluarga! Tersedia Program *Promo Spesial Umrah (Bayar 1 Berangkat 2)* maskapai Oman Air / Garuda Indonesia:\n\n` +
        `💎 *1 Biaya Paket Langsung Berangkat Berdua (Suami Istri / Orang Tua & Anak)*\n` +
        `💎 Termasuk City Tour 1 Malam di Muscat / Jeddah\n` +
        `💎 Hotel Bintang 4 Madinah & Makkah\n` +
        `💎 Visa Umrah Resmi Siskopatuh Kemenag & Asuransi Lengkap\n\n` +
        `⚠️ *Seat Promo Terbatas! Kuota tinggal beberapa kamar saja.*\n\n` +
        `Klaim seat promo sekarang melalui tautan Mitra Syiar:\n` +
        `👉 ${referralUrl}\n\n` +
        `Hubungi langsung: *${currentMitra.name}* (${currentMitra.phone || 'Mitra Kanomas'})`
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
        `Konsultasi langsung bersama Mitra Syiar: *${currentMitra.name}* (${currentMitra.phone || ''})`
    }
  ];

  const handleShareBroadcast = () => {
    const activeText = broadcastTemplates[selectedTemplate].text;
    if (navigator.share) {
      navigator.share({
        title: broadcastTemplates[selectedTemplate].title,
        text: activeText
      }).catch(() => {});
    } else {
      const url = `https://wa.me/?text=${encodeURIComponent(activeText)}`;
      window.open(url, '_blank');
    }
  };

  const handleCopyBroadcast = () => {
    const activeText = broadcastTemplates[selectedTemplate].text;
    navigator.clipboard?.writeText(activeText);
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

    const createdWd = db.requestWithdrawal({
      mitraId: currentMitra.id,
      mitraCode: currentMitra.code,
      mitraName: currentMitra.name,
      amount: val,
      bankName: withdrawBank || 'Bank Syariah Indonesia (BSI)',
      accountNumber: withdrawAccNum || '-',
      accountHolder: withdrawAccHolder || currentMitra.name,
      status: 'Pending',
      notes: withdrawNotes || `Pencairan Komisi Mitra Syiar ${currentMitra.name}`
    });

    setLastSubmittedWd(createdWd);
    setWithdrawSuccess(true);
  };

  const getFinanceWaUrl = (wd) => {
    if (!wd) return '';
    const text = `*Konfirmasi Pengajuan Pencairan Komisi Mitra Syiar*\n\n` +
      `🆔 *ID Pencairan:* ${wd.id}\n` +
      `👤 *Nama Mitra:* ${currentMitra.name} (${currentMitra.code})\n` +
      `💰 *Nominal Ujrah:* Rp ${wd.amount.toLocaleString('id-ID')}\n` +
      `🏦 *Bank Tujuan:* ${wd.bankName}\n` +
      `💳 *No. Rekening:* ${wd.accountNumber}\n` +
      `✍️ *Atas Nama:* ${wd.accountHolder}\n` +
      `📝 *Catatan:* ${wd.notes}\n\n` +
      `_Mohon verifikasi dan proses transfer ke rekening di atas. Terima kasih._`;
    return `https://wa.me/628112113363?text=${encodeURIComponent(text)}`;
  };

  // Toggle demo withdrawal status (Pending -> Disetujui -> Cair)
  const handleToggleWdStatus = (wdId, currentStatus) => {
    let nextStatus = 'Disetujui';
    if (currentStatus === 'Pending') nextStatus = 'Disetujui';
    else if (currentStatus === 'Disetujui') nextStatus = 'Cair';
    else if (currentStatus === 'Cair' || currentStatus === 'Selesai (Ditransfer)') nextStatus = 'Pending';
    db.updateWithdrawalStatus(wdId, nextStatus);
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

  // Render & Download KTA Card (HD Image)
  const handleDownloadKta = async (cardElement) => {
    if (!cardElement) return;
    setIsGeneratingImage(true);
    setShareFeedback('🎨 Sedang merender KTA Digital HD...');
    try {
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch (e) {}
      }
      await new Promise(r => setTimeout(r, 150));
      const canvas = await toCanvas(cardElement, {
        pixelRatio: 2.5,
        backgroundColor: null
      });
      const dataUrl = canvas.toDataURL('image/png');
      const fileName = `KTA-Kanomas-${currentMitra.code || 'Mitra'}.png`;

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setShareFeedback('✅ KTA Digital berhasil diunduh ke galeri!');
      setTimeout(() => setShareFeedback(''), 3000);
    } catch (e) {
      console.error(e);
      alert('Gagal mengunduh KTA. Silakan coba kembali.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Share KTA via Web Share or WhatsApp
  const handleShareKta = () => {
    const text = `*KARTU TANDA ANGGOTA MITRA SYIAR RESMI*\n*PT KANOMAS ARTHA WISATA*\n\n` +
      `👤 *Nama:* ${currentMitra.name}\n` +
      `🆔 *ID Syiar:* ${currentMitra.code}\n` +
      `🏙 *Wilayah Tugas:* ${currentMitra.city}\n` +
      `📜 *Legalitas:* SK Kemenag PPIU No. U.310 / 2021 & PIHK No. 9120313132406\n\n` +
      `Saya siap membimbing dan mendampingi rencana ibadah Umrah & Haji Khusus Anda bersama Kanomas Tour & Travel.\n\n` +
      `Konsultasi & Pendaftaran Online:\n👉 ${referralUrl}`;

    if (navigator.share) {
      navigator.share({
        title: `KTA Mitra Resmi Kanomas: ${currentMitra.name}`,
        text: text
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  // Render & Download Personalized Flyer (HD PNG)
  const handleDownloadPersonalFlyer = async () => {
    if (!flyerCardRef.current) return;
    setIsGeneratingImage(true);
    setShareFeedback('🎨 Sedang merender Brosur Personal HD...');
    try {
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch (e) {}
      }
      await new Promise(r => setTimeout(r, 150));
      const canvas = await toCanvas(flyerCardRef.current, {
        pixelRatio: 2.5,
        backgroundColor: null
      });
      const dataUrl = canvas.toDataURL('image/png');
      const safeTitle = (selectedFlyerPkg?.title || 'Umrah').replace(/[^a-zA-Z0-9]/g, '-');
      const fileName = `Flyer-${safeTitle}-${currentMitra.code}.png`;

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setShareFeedback('✅ Flyer Personal berhasil diunduh & siap dipromosikan!');
      setTimeout(() => setShareFeedback(''), 3000);
    } catch (e) {
      console.error(e);
      alert('Gagal mengunduh flyer personal.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Share Personalized Flyer to WhatsApp
  const handleSharePersonalFlyerWA = (pkg) => {
    if (!pkg) return;
    const text = `*PROMO SPESIAL UMRAH KANOMAS TOUR & TRAVEL*\n` +
      `_(Izin Resmi Kemenag RI: PPIU No. U.310 / 2021)_\n\n` +
      `🕋 *${pkg.title}*\n` +
      `⏱️ *Durasi:* ${pkg.duration}\n` +
      `✈️ *Maskapai:* ${pkg.airline || 'Garuda Indonesia Direct'}\n` +
      `🏨 *Hotel Makkah:* ${pkg.hotelMakkah || 'Pelataran Dekat Ka\'bah'}\n` +
      `🏨 *Hotel Madinah:* ${pkg.hotelMadinah || 'Dekat Masjid Nabawi'}\n` +
      `💰 *Biaya Mulai:* Rp ${(pkg.priceQuad || 0).toLocaleString('id-ID')} / pax\n\n` +
      `✨ *Fasilitas Termasuk:*\n` +
      `• Visa Umrah Resmi Siskopatuh Kemenag\n` +
      `• Makan Fullboard Cita Rasa Nusantara 3x Sehari\n` +
      `• Perlengkapan Eksklusif & Air Zamzam 5 Liter\n` +
      `• Bimbingan Manasik Khusyuk Sesuai Sunnah\n\n` +
      `📞 *Konsultasi & Pendaftaran Hubungi Mitra Syiar Resmi:*\n` +
      `👤 *${currentMitra.name}*\n` +
      `📱 WhatsApp: *${currentMitra.phone || '08112113363'}*\n` +
      `🎟️ Kode Mitra: *${currentMitra.code}*\n\n` +
      `Daftar & Booking Kursi Langsung via Tautan:\n👉 ${referralUrl}`;

    if (navigator.share) {
      navigator.share({
        title: `${pkg.title} - Kanomas`,
        text: text
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
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
    <div className="space-y-5 pb-28 mx-3 sm:mx-6 mt-3 max-w-6xl xl:mx-auto">
      
      {/* 1. HEADER PROFIL MITRA & LEGALITAS RESMI KANOMAS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1f33] via-[#0d2a45] to-[#081524] border border-amber-500/30 shadow-2xl p-4 sm:p-7 text-white">
        {/* Subtle Islamic Motif Glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Mitra Info */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center font-black text-xl sm:text-2xl text-amber-300">
                  {currentMitra.name ? currentMitra.name.charAt(0) : 'M'}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md">
                <CheckCircle className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Mitra Syiar Resmi
                </span>
                <span className="text-[9.5px] sm:text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-full font-mono">
                  PPIU No. U.310 / 2021
                </span>
              </div>

              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white leading-tight">
                {currentMitra.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs text-slate-300">
                <span>Wilayah: <strong className="text-white">{currentMitra.city}</strong></span>
                <span>•</span>
                <span>ID: <strong className="text-amber-300 font-mono">{currentMitra.code}</strong></span>
              </div>

              {/* Referral Code Bar */}
              <div className="pt-1 flex items-center gap-2">
                <span className="text-[11px] text-slate-400 hidden sm:inline">Referral:</span>
                <div className="px-2.5 py-1 rounded-xl bg-black/40 border border-amber-400/40 flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm font-black text-amber-300 tracking-wider">
                    {currentMitra.code}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="text-slate-400 hover:text-white p-0.5 transition cursor-pointer"
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
          <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
            {/* KTA Button */}
            <button
              onClick={() => setShowKtaModal(true)}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>KTA Digital</span>
            </button>

            {/* Withdraw Button */}
            <button
              onClick={() => {
                setWithdrawSuccess(false);
                setShowWithdrawModal(true);
              }}
              disabled={(currentMitra.commissionPending || 0) <= 0}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5 active:scale-95 cursor-pointer ${
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

            {/* Switch Profile Dropdown (For Testing Multi-Mitra) */}
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-2 rounded-xl border border-white/10 text-xs">
              <span className="text-[10px] text-slate-400">Akun:</span>
              <select
                value={activeMitraIndex}
                onChange={(e) => setActiveMitraIndex(Number(e.target.value))}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                {mitraList.map((m, idx) => (
                  <option key={m.id} value={idx} className="bg-slate-900 text-white">
                    {m.name.split(',')[0]} ({m.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ALUR NAVIGASI TAB (MOBILE-OPTIMIZED SEGMENTED CONTROL) */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 overflow-x-auto shadow-inner no-scrollbar">
        <button
          onClick={() => setActiveTab('ringkasan')}
          className={`flex-1 min-w-[110px] sm:min-w-[130px] py-2.5 px-2 rounded-xl font-extrabold text-[11px] sm:text-xs transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'ringkasan'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>1. Finansial</span>
        </button>

        <button
          onClick={() => setActiveTab('jamaah')}
          className={`flex-1 min-w-[110px] sm:min-w-[130px] py-2.5 px-2 rounded-xl font-extrabold text-[11px] sm:text-xs transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'jamaah'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>2. Jamaah ({combinedJamaah.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('promosi')}
          className={`flex-1 min-w-[110px] sm:min-w-[130px] py-2.5 px-2 rounded-xl font-extrabold text-[11px] sm:text-xs transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'promosi'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>3. Flyer & Kit</span>
        </button>

        <button
          onClick={() => setActiveTab('kta')}
          className={`flex-1 min-w-[110px] sm:min-w-[130px] py-2.5 px-2 rounded-xl font-extrabold text-[11px] sm:text-xs transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === 'kta'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>4. KTA Resmi</span>
        </button>
      </div>

      {/* FEEDBACK BANNER (JIKA ADA AKSI GENERATE / UNDUH) */}
      {shareFeedback && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold text-center animate-in fade-in duration-200">
          {shareFeedback}
        </div>
      )}

      {/* 3. TAB CONTENT */}

      {/* TAB 1: RINGKASAN & FINANSIAL */}
      {activeTab === 'ringkasan' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* KPI COMMISSION CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {/* Total Jamaah */}
            <div className="p-3.5 sm:p-5 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-1 relative overflow-hidden">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-1">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                Total Jamaah
              </span>
              <span className="text-xl sm:text-3xl font-black text-white font-mono block">
                {currentMitra.totalJamaah || 0} <span className="text-xs sm:text-sm font-sans font-normal text-slate-400">Pax</span>
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3 h-3" /> Terdaftar Sah
              </span>
            </div>

            {/* Total Komisi Hak Mitra */}
            <div className="p-3.5 sm:p-5 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-1 relative overflow-hidden">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-1">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                Total Hak Ujrah
              </span>
              <span className="text-base sm:text-2xl font-black text-amber-300 font-mono block truncate">
                Rp {(currentMitra.totalCommission || 0).toLocaleString('id-ID')}
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-slate-400 block truncate">
                Ujrah Rp 1 Jt / pax
              </span>
            </div>

            {/* Komisi Sudah Ditransfer */}
            <div className="p-3.5 sm:p-5 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-1 relative overflow-hidden">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                Sudah Ditransfer
              </span>
              <span className="text-base sm:text-2xl font-black text-emerald-400 font-mono block truncate">
                Rp {(currentMitra.commissionPaid || 0).toLocaleString('id-ID')}
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-slate-400 block truncate">
                Masuk Rek. {currentMitra.bankName ? currentMitra.bankName.split(' ')[0] : 'BSI'}
              </span>
            </div>

            {/* Komisi Pending / Siap Ditarik */}
            <div className="p-3.5 sm:p-5 rounded-3xl bg-gradient-to-br from-[#192f44] to-[#122232] border border-emerald-500/40 shadow-xl space-y-1 relative overflow-hidden">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center mb-1 font-black shadow-md">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] text-emerald-300 uppercase font-bold tracking-wider block">
                Siap Dicairkan
              </span>
              <span className="text-base sm:text-2xl font-black text-white font-mono block truncate">
                Rp {(currentMitra.commissionPending || 0).toLocaleString('id-ID')}
              </span>
              <button
                onClick={() => {
                  setWithdrawSuccess(false);
                  setShowWithdrawModal(true);
                }}
                disabled={(currentMitra.commissionPending || 0) <= 0}
                className="mt-1 w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-[10px] sm:text-[11px] transition shadow flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Tarik Dana</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* SIMULATOR & REWARD TARGET (FEATURE 4: FREE UMRAH & UJRAH CALCULATOR) */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#112437] via-[#152e46] to-[#0f1f2e] border border-amber-500/30 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
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
                    Ajak 20 Jamaah berangkat bersama Kanomas dan raih <strong>1 Tiket Umrah Full Gratis</strong> + Ujrah Rp 20 Juta.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block">Progres Jamaah Anda:</span>
                <span className="text-lg sm:text-xl font-black text-amber-300 font-mono">
                  {currentTotal} / {TARGET_FREE_UMRAH} Pax ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-4 text-[10px] sm:text-xs text-slate-400 font-medium">
                <div>0 Pax</div>
                <div className="text-center">5 Pax (Rp 5 Jt)</div>
                <div className="text-center">10 Pax (Koper VIP)</div>
                <div className="text-right text-amber-300 font-bold">20 Pax (FREE UMRAH)</div>
              </div>
            </div>

            {/* Status Info Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {remainingPax > 0 ? (
                    <>
                      Butuh <strong className="text-amber-300 font-bold">{remainingPax} jamaah lagi</strong> untuk klaim Tiket Umrah Gratis Anda!
                    </>
                  ) : (
                    <strong className="text-emerald-400 font-bold">
                      Maa Syaa Allah! Anda telah mencapai kuota 20 Jamaah dan berhak klaim Tiket Umrah Gratis!
                    </strong>
                  )}
                </span>
              </div>

              <button
                onClick={() => setActiveTab('promosi')}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition shrink-0 flex items-center justify-center gap-1.5 shadow cursor-pointer"
              >
                <span>Bagikan Flyer Promosi</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Calculator Syiar */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-400" />
                  Kalkulator Simulasi Potensi Ujrah Syiar:
                </span>
                <span className="text-amber-300 font-mono font-bold text-sm">
                  {simulatedPax} Jamaah = Rp {(simulatedPax * 1000000).toLocaleString('id-ID')}
                </span>
              </div>

              {/* Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {[3, 5, 10, 15, 20].map((pax) => (
                  <button
                    key={pax}
                    onClick={() => setSimulatedPax(pax)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer text-xs ${
                      simulatedPax === pax
                        ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                        : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {pax} Jamaah {pax === 20 ? '🎉 (Free Umrah!)' : ''}
                  </button>
                ))}
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
                <span className="font-mono text-xs font-bold text-white px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 shrink-0">
                  {simulatedPax} Pax
                </span>
              </div>

              {/* Simulation Result Reward Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Total Ujrah Tunai:</span>
                  <div className="text-lg font-black text-emerald-400 font-mono">
                    Rp {(simulatedPax * 1000000).toLocaleString('id-ID')}
                  </div>
                  <p className="text-[10px] text-slate-400">Komisi flat Rp 1 Jt per jamaah langsung cair.</p>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/40 to-black/40 border border-amber-400/30 space-y-1">
                  <span className="text-[10px] text-amber-300 uppercase font-bold">Reward Tambahan:</span>
                  <div className="text-sm font-black text-amber-200">
                    {simulatedPax >= 20 ? (
                      '🎉 1 TIKET UMRAH GRATIS LENGKAP!'
                    ) : simulatedPax >= 10 ? (
                      '🧳 Koper Umrah VIP Kanomas + Jaket Syiar'
                    ) : simulatedPax >= 5 ? (
                      '🧥 Jaket Eksklusif Mitra Syiar Kanomas'
                    ) : (
                      '🎁 Souvenir Syiar Kanomas'
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {simulatedPax >= 20
                      ? 'Dapat diberangkatkan sendiri atau dihibahkan ke keluarga!'
                      : `Tambah ${20 - simulatedPax} jamaah lagi untuk Tiket Umrah Gratis.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIWAYAT PENCAIRAN UJRAH (FEATURE 5: WITHDRAWAL PIPELINE PENDING -> DISETUJUI -> CAIR) */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Transparansi Finansial
                </span>
                <h3 className="text-base font-black text-white">
                  Riwayat Klaim Pencairan Ujrah Mitra ({mitraWithdrawals.length})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setWithdrawSuccess(false);
                    setShowWithdrawModal(true);
                  }}
                  disabled={(currentMitra.commissionPending || 0) <= 0}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 shadow cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajukan Penarikan</span>
                </button>
              </div>
            </div>

            {mitraWithdrawals.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-black/20 rounded-2xl border border-white/5 space-y-1">
                <p>Belum ada riwayat pencairan dana.</p>
                <p className="text-[11px] text-slate-600">
                  Ajukan penarikan ujrah jika Anda memiliki saldo komisi yang siap dicairkan.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {mitraWithdrawals.map((wd) => {
                  const isPending = wd.status === 'Pending';
                  const isApproved = wd.status === 'Disetujui';
                  const isPaid = wd.status === 'Cair' || wd.status === 'Selesai (Ditransfer)';

                  return (
                    <div
                      key={wd.id}
                      className="p-3.5 sm:p-4 rounded-2xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <strong className="text-white font-mono">{wd.id}</strong>
                          
                          {/* Status Badge */}
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border ${
                            isPending
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : isApproved
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}>
                            {isPending && <Clock className="w-3 h-3 text-amber-400" />}
                            {isApproved && <Check className="w-3 h-3 text-sky-400" />}
                            {isPaid && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                            <span>{wd.status}</span>
                          </span>

                          {/* Demo Status Switcher */}
                          <button
                            onClick={() => handleToggleWdStatus(wd.id, wd.status)}
                            className="text-[9.5px] text-slate-500 hover:text-slate-300 underline cursor-pointer"
                            title="Klik untuk simulasi status (Pending ➔ Disetujui ➔ Cair)"
                          >
                            (Ubah Status Demo)
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-300">
                          Transfer ke {wd.bankName} - No. <strong className="font-mono text-white">{wd.accountNumber}</strong> a/n {wd.accountHolder}
                        </p>
                        <p className="text-[10px] text-slate-500">{wd.notes}</p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 shrink-0">
                        <span className="font-mono text-base font-black text-amber-300">
                          Rp {wd.amount.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-slate-400">{wd.requestDate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: JAMAAH BINAAN (PIPELINE) */}
      {activeTab === 'jamaah' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Action Bar & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setLeadFilter('semua')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  leadFilter === 'semua'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'bg-black/30 text-slate-400 hover:text-white'
                }`}
              >
                Semua ({jamaahList.length + calonJamaahList.length})
              </button>
              <button
                onClick={() => setLeadFilter('berangkat')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  leadFilter === 'berangkat'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'bg-black/30 text-slate-400 hover:text-white'
                }`}
              >
                Resmi Berangkat ({jamaahList.length})
              </button>
              <button
                onClick={() => setLeadFilter('prospek')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
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
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama / paket..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                onClick={() => setShowAddLeadModal(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow transition flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Input Prospek Baru</span>
                <span className="sm:hidden">Tambah</span>
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
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
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
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition shrink-0 cursor-pointer"
                        title="Follow Up via WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Follow Up WA</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: KIT PROMOSI DIGITAL & FLYER PERSONAL (FEATURE 3: POSTER / FLYER PERSONAL OTOMATIS) */}
      {activeTab === 'promosi' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* TAUTAN REFERRAL KHUSUS */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#13263a] to-[#0f1f2e] border border-blue-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 inline-block mb-1">
                  Tautan Referral Resmi Anda
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Tautan Unik Terkunci Otomatis ke Database Kanomas
                </h3>
                <p className="text-xs text-slate-300">
                  Setiap calon jamaah yang membuka tautan ini otomatis terkunci atas nama Anda dan komisi Rp 1.000.000 tercatat untuk Anda.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs transition flex items-center gap-1.5 border border-slate-700 shadow cursor-pointer"
                >
                  {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Tersalin!' : 'Salin Tautan'}</span>
                </button>

                <button
                  onClick={handleShareBroadcast}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Kirim ke WhatsApp</span>
                </button>
              </div>
            </div>

            {/* URL Display */}
            <div className="p-3.5 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between font-mono text-xs text-amber-300 overflow-x-auto">
              <span className="truncate">{referralUrl}</span>
              <span className="text-[10px] text-slate-400 font-sans ml-2 shrink-0">Kode: {currentMitra.code}</span>
            </div>
          </div>

          {/* FLYER & BROSUR RESMI KANOMAS (FEATURE 3: PERSONAL FLYER GENERATOR) */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  Poster & Brosur Promosi Personal Otomatis
                </span>
                <h3 className="text-base font-black text-white">
                  Pilih Brosur Paket untuk Dibagikan ke Jamaah
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Sistem otomatis menempelkan Nama, Foto, Kontak WA, & QR Code Anda pada setiap brosur!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-amber-400 transition p-3 space-y-3 flex flex-col justify-between shadow-md"
                >
                  <div className="h-44 overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center relative">
                    <img
                      src={pkg.coverImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-slate-950/80 text-amber-300 backdrop-blur-xs">
                      {pkg.duration}
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950/80 text-emerald-300 backdrop-blur-xs">
                      {pkg.airline || 'Garuda Direct'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2">
                      {pkg.title}
                    </h5>
                    <span className="text-xs font-mono text-emerald-400 font-bold block">
                      Mulai Rp {(pkg.priceQuad || 0).toLocaleString('id-ID')}
                    </span>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      Hotel: {pkg.hotelMakkah || 'Pelataran'} / {pkg.hotelMadinah || 'Nabawi'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => onOpenPackageDetail && onOpenPackageDetail(pkg)}
                      className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Rincian</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedFlyerPkg(pkg)}
                      className="py-2 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-[11px] flex items-center justify-center gap-1 shadow transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Buat Flyer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GENERATOR BROADCAST WHATSAPP */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Template Pesan Siap Kirim
                </span>
                <h3 className="text-base font-black text-white">
                  Broadcast Teks Promosi WhatsApp
                </h3>
              </div>

              <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
                {broadcastTemplates.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTemplate(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
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
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 whitespace-pre-line font-sans leading-relaxed max-h-56 overflow-y-auto">
                {broadcastTemplates[selectedTemplate].text}
              </div>
            </div>

            {/* Actions for Broadcast */}
            <div className="flex justify-end items-center gap-2 pt-1">
              <button
                onClick={handleCopyBroadcast}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedMsg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMsg ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>

              <button
                onClick={handleShareBroadcast}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim ke WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KTA DIGITAL & LEGALITAS (FEATURE 2: KTA RESMI BER-QR CODE) */}
      {activeTab === 'kta' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Visual KTA Card (Eksklusif Emas-Navy) */}
            <div
              ref={ktaCardRef}
              className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0a1626] via-[#0f243d] to-[#07111c] border-2 border-amber-400/60 shadow-2xl relative overflow-hidden text-white space-y-5"
            >
              {/* Card Gold Trim Watermark */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* KTA Header */}
              <div className="flex items-start justify-between border-b border-amber-400/30 pb-3.5">
                <div className="space-y-0.5">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                    KARTU TANDA ANGGOTA MITRA RESMI
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white tracking-wide">
                    PT KANOMAS ARTHA WISATA
                  </h4>
                  <p className="text-[9px] text-slate-300 font-mono">
                    PPIU Kemenag No. U.310 / 2021 • PIHK No. 9120313132406
                  </p>
                </div>

                <img
                  src={KANOMAS_LOGO_BASE64}
                  alt="Kanomas"
                  width={38}
                  height={38}
                  className="w-9 h-9 rounded-xl object-contain bg-white/10 p-0.5 shadow-md shrink-0"
                />
              </div>

              {/* KTA Body */}
              <div className="flex items-center gap-3.5">
                {/* Avatar / Photo */}
                <div className="w-18 h-22 rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-[10px] bg-slate-900 flex flex-col items-center justify-center text-amber-300">
                    <span className="text-2xl sm:text-3xl font-black">{currentMitra.name ? currentMitra.name.charAt(0) : 'M'}</span>
                    <span className="text-[8px] uppercase font-bold text-slate-400 mt-0.5">Mitra Syiar</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1 text-xs min-w-0">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Nama Mitra:</span>
                    <h5 className="text-sm sm:text-base font-black text-white truncate">{currentMitra.name}</h5>
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
                      <span className="text-slate-400 block font-bold">Status Keanggotaan:</span>
                      <span className="text-emerald-400 font-black flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" /> Aktif Sah
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Barcode Area */}
              <div className="p-3 bg-white text-slate-900 rounded-2xl flex items-center justify-between gap-3 shadow-inner">
                <div className="w-16 h-16 shrink-0 bg-white p-0.5 rounded-lg border border-slate-200">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code Referral"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <span className="text-[9.5px] font-bold text-slate-600 block uppercase">
                    Scan untuk Pendaftaran Jamaah Binaan
                  </span>
                  <span className="text-xs font-mono font-black text-slate-900 block truncate">
                    {referralUrl}
                  </span>
                  <p className="text-[8.5px] text-slate-500">
                    Arahkan kamera HP calon jamaah untuk otomatis terkunci ke ID Mitra {currentMitra.code}.
                  </p>
                </div>
              </div>

              {/* KTA Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-400/20 text-xs">
                <span className="text-[9.5px] text-slate-400">Berlaku s/d Musim 1448H / 2027</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDownloadKta(ktaCardRef.current)}
                    disabled={isGeneratingImage}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 transition shadow cursor-pointer text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh HD</span>
                  </button>
                  <button
                    onClick={handleShareKta}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center gap-1 transition shadow cursor-pointer text-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share WA</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Legalitas & Kode Etik Syiar */}
            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-3.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                  <h4 className="font-black text-sm text-white">
                    Kepastian Hukum & Legalitas Penyelenggaraan
                  </h4>
                </div>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
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

              <div className="p-5 sm:p-6 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-3 text-xs">
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

      {/* ======================================================== */}
      {/* MODAL 1: AJUKAN PENCAIRAN UJRAH (WITHDRAWAL)             */}
      {/* ======================================================== */}
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
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">
              {withdrawSuccess ? (
                <div className="text-center py-5 space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Pengajuan Berhasil Dicatat!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pengajuan ID <strong>{lastSubmittedWd?.id || 'WD-NEW'}</strong> sebesar <strong>Rp {Number(withdrawAmount).toLocaleString('id-ID')}</strong> berstatus <strong>Pending</strong> dan siap diproses ke rekening Anda.
                  </p>

                  <div className="pt-2 space-y-2">
                    {lastSubmittedWd && (
                      <a
                        href={getFinanceWaUrl(lastSubmittedWd)}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 text-center"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Kirim Konfirmasi ke WA Finance Kanomas</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowWithdrawModal(false)}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Kembali ke Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitWithdrawal} className="space-y-3.5 text-xs">
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
                      className="px-2.5 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-[10px] cursor-pointer"
                    >
                      Tarik Semua
                    </button>
                  </div>

                  {/* Rekening Tujuan */}
                  <div className="space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Rekening Bank Tujuan:</span>
                    <div>
                      <label className="block text-[11px] text-slate-600 font-semibold mb-0.5">Nama Bank:</label>
                      <input
                        type="text"
                        required
                        value={withdrawBank}
                        onChange={(e) => setWithdrawBank(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-slate-600 font-semibold mb-0.5">No. Rekening:</label>
                        <input
                          type="text"
                          required
                          value={withdrawAccNum}
                          onChange={(e) => setWithdrawAccNum(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono font-bold text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-600 font-semibold mb-0.5">Atas Nama:</label>
                        <input
                          type="text"
                          required
                          value={withdrawAccHolder}
                          onChange={(e) => setWithdrawAccHolder(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Nominal yang Ditarik (Rp):</label>
                    <input
                      type="number"
                      required
                      min="500000"
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
                      className="px-4 py-2.5 rounded-xl text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
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

      {/* ======================================================== */}
      {/* MODAL 2: KTA DIGITAL FULLSCREEN POPUP (FEATURE 2)         */}
      {/* ======================================================== */}
      {showKtaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0b1828] border-2 border-amber-400 shadow-2xl p-5 sm:p-6 text-white space-y-4 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowKtaModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
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

            {/* Visual Card (Captured for HD Download) */}
            <div
              ref={ktaModalCardRef}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1c2e] via-[#0f2d47] to-[#081524] border-2 border-amber-400/70 shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-amber-400/30 pb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={KANOMAS_LOGO_BASE64}
                    alt="Kanomas"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5"
                  />
                  <div>
                    <h5 className="font-black text-xs text-white">Kanomas Tour & Travel</h5>
                    <p className="text-[8.5px] text-slate-300">Mitra Syiar Resmi Berizin Kemenag</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-black text-amber-300">{currentMitra.code}</span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-18 h-22 rounded-xl bg-amber-400 text-slate-950 flex flex-col items-center justify-center font-black shrink-0 shadow-md">
                  <span className="text-3xl">{currentMitra.name ? currentMitra.name.charAt(0) : 'M'}</span>
                  <span className="text-[8px] uppercase tracking-wider font-extrabold">Mitra</span>
                </div>
                <div className="space-y-0.5 text-xs min-w-0">
                  <h4 className="text-base font-black text-white truncate">{currentMitra.name}</h4>
                  <p className="text-[11px] text-slate-300">Wilayah: {currentMitra.city}</p>
                  <p className="text-[11px] text-slate-300">NIK: <span className="font-mono">{currentMitra.nik || '327801********'}</span></p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    ID RESMI SISKOPATUH
                  </span>
                </div>
              </div>

              {/* QR Code Barcode Area */}
              <div className="p-3 bg-white text-slate-900 rounded-xl flex items-center justify-between gap-3 shadow-inner">
                <div className="w-16 h-16 shrink-0 bg-white p-0.5 rounded-lg border border-slate-200">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code Referral"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <span className="text-[9.5px] font-bold text-slate-600 block uppercase">
                    Scan untuk Pendaftaran Calon Jamaah
                  </span>
                  <span className="text-xs font-mono font-black text-slate-900 block truncate">
                    {referralUrl}
                  </span>
                  <p className="text-[8.5px] text-slate-500">
                    Arahkan kamera HP calon jamaah untuk otomatis terkunci ke ID Mitra {currentMitra.code}.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Fisik</span>
              </button>

              <button
                onClick={() => handleDownloadKta(ktaModalCardRef.current)}
                disabled={isGeneratingImage}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>Unduh Gambar KTA (HD)</span>
              </button>

              <button
                onClick={handleShareKta}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Bagikan ke WA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: FLYER PROMOSI PERSONAL (FEATURE 3: POSTER PERSONAL) */}
      {/* ======================================================== */}
      {selectedFlyerPkg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0b1828] border-2 border-amber-400 shadow-2xl p-4 sm:p-6 text-white space-y-4 relative max-h-[94vh] overflow-y-auto">
            <button
              onClick={() => setSelectedFlyerPkg(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                POSTER & BROSUR PERSONAL MITRA SYIAR
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                Brosur Resmi Otomatis Berisi Kontak Anda
              </h3>
            </div>

            {/* Visual Flyer Card (Ready to render & capture to PNG) */}
            <div
              ref={flyerCardRef}
              className="rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-400/70 shadow-2xl text-white space-y-0"
            >
              {/* Package Header Image */}
              <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
                <img
                  src={selectedFlyerPkg.coverImage}
                  alt={selectedFlyerPkg.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Kanomas Branding Top Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/40">
                  <img
                    src={KANOMAS_LOGO_BASE64}
                    alt="Kanomas"
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-md object-contain"
                  />
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">
                    Kanomas Tour & Travel • PPIU U.310
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-400 text-slate-950">
                    {selectedFlyerPkg.duration}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                    {selectedFlyerPkg.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-black text-emerald-400 text-sm">
                      Mulai Rp {(selectedFlyerPkg.priceQuad || 0).toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      • {selectedFlyerPkg.airline || 'Garuda Direct'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Package Key Facilities */}
              <div className="p-3.5 bg-slate-900 border-b border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Makkah: {selectedFlyerPkg.hotelMakkah || 'Pelataran'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Madinah: {selectedFlyerPkg.hotelMadinah || 'Nabawi'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Jadwal: {selectedFlyerPkg.departureDate || 'Musim 2026'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Siskopatuh Kemenag RI</span>
                </div>
              </div>

              {/* PERSONAL FOOTER STRIP (OTOMATIS NAMA & WA MITRA) */}
              <div className="p-3.5 bg-gradient-to-r from-amber-950/80 via-[#1c1206] to-[#0c1f33] border-t border-amber-400/40 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-lg shadow-md">
                    {currentMitra.name ? currentMitra.name.charAt(0) : 'M'}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[9px] font-black uppercase text-amber-300 tracking-wider block">
                      Konsultasi & Pendaftaran Hubungi:
                    </span>
                    <strong className="text-xs sm:text-sm font-black text-white block truncate">
                      {currentMitra.name}
                    </strong>
                    <div className="flex items-center gap-2 text-[10px] text-slate-300">
                      <span className="flex items-center gap-1 text-emerald-400 font-mono font-bold">
                        <Phone className="w-3 h-3" /> {currentMitra.phone || '08112113363'}
                      </span>
                      <span>•</span>
                      <span>ID: <strong className="font-mono text-amber-300">{currentMitra.code}</strong></span>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="w-13 h-13 shrink-0 bg-white p-0.5 rounded-lg border border-slate-300">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Actions for Personalized Flyer */}
            <div className="flex flex-wrap items-center justify-end gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(referralUrl);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPersonalFlyer}
                disabled={isGeneratingImage}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>Unduh Gambar Brosur HD</span>
              </button>

              <button
                type="button"
                onClick={() => handleSharePersonalFlyerWA(selectedFlyerPkg)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Kirim ke WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: INPUT CALON JAMAAH BARU                         */}
      {/* ======================================================== */}
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
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
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
                      className="px-4 py-2.5 text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
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
