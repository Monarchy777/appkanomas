import React, { useState, useEffect } from 'react';
import {
  Compass,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Plane,
  Building2,
  CreditCard,
  Globe2
} from 'lucide-react';
import {
  Icon3DAlQuran,
  Icon3DSholatKiblat,
  Icon3DTawaf,
  Icon3DDzikirPagiPetang,
  Icon3DTasbih,
  Icon3DTabungan,
  Icon3DDoaHarian,
  Icon3DPelayananJamaah
} from '../components/Icons3D';

// 5 Banner Utama Kanomas (Rotasi otomatis per 10 detik)
// Latar belakang foto sinematik murni tanpa teks bertabrakan, teks responsif disajikan via overlay modern
const PROMO_BANNERS = [
  {
    id: 1,
    image: '/assets/banners/banner-1-kemenag.jpg',
    tag: 'Agen Resmi Kemenag RI',
    title: 'PT Kanomas Arasy Wisata - Agen Resmi Berizin',
    subtitle: 'Penyelenggara Ibadah Umrah (PPIU U.310) & Haji Khusus (PIHK) Berizin Resmi Kemenag RI & Terakreditasi A',
    actionType: 'lookup'
  },
  {
    id: 2,
    image: '/assets/banners/banner-2-direct-flight.jpg',
    tag: 'Pilihan Direct Flight',
    title: 'Penerbangan Langsung Tanpa Transit',
    subtitle: 'Pilihan maskapai bintang lima Garuda Indonesia & Saudia Airlines rute langsung Jakarta ke Madinah & Jeddah',
    actionType: 'packages'
  },
  {
    id: 3,
    image: '/assets/banners/banner-3-manasik-sunnah.jpg',
    tag: 'Sesuai Sunnah',
    title: 'Manasik & Bimbingan Ibadah Sesuai Sunnah',
    subtitle: 'Dibimbing langsung oleh asatidz Ahlussunnah berkompeten sesuai tuntunan Al-Qur\'an dan As-Sunnah',
    actionType: 'kajian'
  },
  {
    id: 4,
    image: '/assets/banners/banner-4-haji-khusus.jpg',
    tag: 'Haji Khusus',
    title: 'Program Haji Khusus & Furoda Resmi',
    subtitle: 'Kepastian keberangkatan tanpa antre bertahun-tahun dengan fasilitas maktab tenda VIP ber-AC di Arafah & Mina',
    actionType: 'packages'
  },
  {
    id: 5,
    image: '/assets/banners/banner-5-tabungan-umrah.jpg',
    tag: 'Tabungan Umrah',
    title: 'Perencanaan Tabungan Umrah Mudah & Amanah',
    subtitle: 'Wujudkan niat suci ke Baitullah dengan setoran fleksibel, aman, transparan, dan terpercaya',
    actionType: 'savings'
  }
];

// 1. Logo Berjalan Resmi & Asosiasi: Kemenag, IATA, KAN, AMPHURI, ASITA (Muncul murni tanpa kotak)
const RUNNING_OFFICIAL_LOGOS = [
  {
    id: 'kemenag',
    name: 'Kementerian Agama RI',
    src: '/assets/logos/logo-kemenag.png'
  },
  {
    id: 'iata',
    name: 'IATA - International Air Transport Association',
    src: '/assets/logos/logo-iata.png'
  },
  {
    id: 'kan',
    name: 'KAN - Komite Akreditasi Nasional',
    src: '/assets/logos/logo-kan.png'
  },
  {
    id: 'amphuri',
    name: 'AMPHURI - Asosiasi Muslim Penyelenggara Haji & Umrah RI',
    src: '/assets/logos/logo-amphuri.svg'
  },
  {
    id: 'asita',
    name: 'ASITA - Association of The Indonesian Tours and Travel Agencies',
    src: '/assets/logos/logo-asita.svg'
  }
];

// 2. Logo Perusahaan Rekanan & Kerjasama Resmi (Antrian Berjalan Sesuai Jenis Layanan Perusahaannya)
const PARTNER_MARQUEE_SEQUENCE = [
  // --- KELOMPOK 1: MASKAPAI PENERBANGAN ---
  {
    type: 'badge',
    id: 'badge-airlines',
    label: 'Maskapai Penerbangan',
    icon: Plane,
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200'
  },
  { id: 'garuda', name: 'Garuda Indonesia', src: '/assets/logos/logo-garuda.svg', category: 'Maskapai Penerbangan' },
  { id: 'saudia', name: 'Saudia Arabia Airlines', src: '/assets/logos/logo-saudia.svg', category: 'Maskapai Penerbangan' },
  { id: 'qatar', name: 'Qatar Airways', src: '/assets/logos/logo-qatar.svg', category: 'Maskapai Penerbangan' },
  { id: 'emirates', name: 'Emirates', src: '/assets/logos/logo-emirates.svg', category: 'Maskapai Penerbangan' },
  { id: 'etihad', name: 'Etihad Airways', src: '/assets/logos/logo-etihad.svg', category: 'Maskapai Penerbangan' },
  { id: 'oman', name: 'Oman Air', src: '/assets/logos/logo-omanair.svg', category: 'Maskapai Penerbangan' },

  // --- KELOMPOK 2: HOTEL & AKOMODASI TANAH SUCI ---
  {
    type: 'badge',
    id: 'badge-hotels',
    label: 'Hotel & Akomodasi',
    icon: Building2,
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  { id: 'movenpick', name: 'Mövenpick Hotels & Resorts', src: '/assets/logos/logo-movenpick.svg', category: 'Hotel & Akomodasi' },
  { id: 'millennium', name: 'Millennium Hotels & Resorts', src: '/assets/logos/logo-millennium.svg', category: 'Hotel & Akomodasi' },
  { id: 'almassa', name: 'Al Massa Hotels Makkah', src: '/assets/logos/logo-almassa.svg', category: 'Hotel & Akomodasi' },

  // --- KELOMPOK 3: PERBANKAN SYARIAH ---
  {
    type: 'badge',
    id: 'badge-bank',
    label: 'Perbankan Syariah',
    icon: CreditCard,
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  { id: 'bsi', name: 'Bank Syariah Indonesia (BSI)', src: '/assets/logos/logo-bsi.svg', category: 'Perbankan Syariah' },

  // --- KELOMPOK 4: SISTEM TIKET & RESERVASI GLOBAL ---
  {
    type: 'badge',
    id: 'badge-gds',
    label: 'Sistem Global GDS',
    icon: Globe2,
    badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200'
  },
  { id: 'amadeus', name: 'Amadeus Global Travel Network', src: '/assets/logos/logo-amadeus.svg', category: 'Sistem Global GDS' },
  { id: 'sabre', name: 'Sabre Travel Network & GDS', src: '/assets/logos/logo-sabre.svg', category: 'Sistem Global GDS' }
];

export default function HomeView({
  packages = [],
  mentors = [],
  nextPrayer,
  onSelectTab,
  onOpenQuran,
  onOpenDzikir,
  onOpenDailyPrayers,
  onOpenJamaahServices,
  onOpenPackageDetail,
  onOpenCounter,
  onOpenTasbih,
  onOpenTalbiyah,
  onOpenKajian,
  onOpenSavings,
  onOpenNusuk,
  onOpenChecklist,
  onOpenMap,
  onOpenLookup,
  onBookPackage,
  onOpenDaftarMitra
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider setiap 10 detik sesuai permintaan pengguna
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);
  };

  const handleBannerClick = (banner) => {
    if (banner.actionType === 'savings') {
      onOpenSavings?.();
    } else if (banner.actionType === 'packages') {
      onSelectTab?.('packages');
    } else if (banner.actionType === 'kajian') {
      onOpenKajian?.();
    } else if (banner.actionType === 'lookup') {
      onOpenLookup?.();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 px-3 sm:px-6 pt-3">
      {/* 1. SLIDER PROMO & KEKUATAN KANOMAS (BERGANTI SETIAP 10 DETIK) */}
      <section className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group">
        <div className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden">
          {PROMO_BANNERS.map((banner, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={banner.id}
                onClick={() => handleBannerClick(banner)}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Gradient Shadow untuk Keterbacaan Tulisan */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 text-white space-y-2 z-20">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      {banner.tag}
                    </span>
                    <span className="text-[10px] text-white/70 font-semibold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full hidden sm:inline-block">
                      10s Rotasi
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white font-sans tracking-tight leading-snug drop-shadow-md">
                    {banner.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 drop-shadow-sm font-medium leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tombol Navigasi Slide Sebelumnya */}
        <button
          onClick={prevSlide}
          aria-label="Slide sebelumnya"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white flex items-center justify-center transition opacity-70 hover:opacity-100 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Tombol Navigasi Slide Berikutnya */}
        <button
          onClick={nextSlide}
          aria-label="Slide berikutnya"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white flex items-center justify-center transition opacity-70 hover:opacity-100 active:scale-95"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Indikator Titik / Dots (5 Image) */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {PROMO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ke slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-6 bg-amber-400'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. WAKTU SHOLAT BERIKUTNYA (CUKUP 1 BARIS DENGAN TOMBOL ARAH KIBLAT) */}
      <section className="px-3.5 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="min-w-0 text-xs sm:text-sm md:text-base font-bold text-slate-800 leading-snug">
            <span className="text-slate-500 font-semibold mr-1.5 hidden xs:inline">Sholat Berikutnya:</span>
            <span className="font-black text-amber-700 font-mono whitespace-nowrap">
              {nextPrayer ? `${nextPrayer.name} ${nextPrayer.time} WIB` : 'Subuh 04:30 WIB'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('prayer')}
          className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition active:scale-95 flex-shrink-0 whitespace-nowrap"
        >
          <Compass className="w-4 h-4 text-amber-100" />
          <span>Arah Kiblat</span>
        </button>
      </section>

      {/* 2C. BANNER DAFTAR MITRA SYIAR (2-3 BARIS PROPORSIONAL DENGAN TOMBOL SLIM) */}
      <section
        onClick={onOpenDaftarMitra}
        className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white cursor-pointer hover:shadow-md transition-all flex items-center justify-between gap-2.5 active:scale-[0.99] shadow-xs border border-emerald-500/30 relative overflow-hidden group"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center flex-shrink-0 text-amber-300 group-hover:scale-105 transition-transform">
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Program Kemitraan Syiar Baitullah</span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-white truncate">
              Gabung Jadi Mitra Resmi Syiar Kanomas
            </h3>
            <p className="text-[11px] text-emerald-100/80 font-medium truncate">
              Ujrah berkah langsung ke rekening • Fasilitas bimbingan lengkap
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenDaftarMitra) onOpenDaftarMitra();
          }}
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-extrabold text-[11px] sm:text-xs flex items-center gap-1 shadow-sm transition active:scale-95 flex-shrink-0 whitespace-nowrap border border-amber-200/80"
        >
          <span>Daftar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* 3. MENU UTAMA BERANDA: 2 BARIS X 4 KOLOM (IKON 3D BERWARNA & ELEGAN) */}
      <section className="space-y-3 pt-0.5">
        <div className="space-y-3">
          {/* BARIS 1: 1. Al Quran, 2. Jadwal Sholat & Arah Kiblat, 3. Ibadah Umrah, 4. Pelayanan Nusuk */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
            {/* 1. Al Quran */}
            <button
              onClick={onOpenQuran}
              className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[104px] sm:min-h-[124px] h-full group active:scale-95 shadow-xs"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center my-auto group-hover:scale-105 transition-transform duration-200">
                <Icon3DAlQuran size={36} className="sm:w-[42px] sm:h-[42px]" />
              </div>
              <span className="w-full text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition leading-tight tracking-tight text-center mt-auto break-words">
                Al-Qur'an
              </span>
            </button>

            {/* 2. Jadwal Sholat & Arah Kiblat */}
            <button
              onClick={() => onSelectTab('prayer')}
              className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[104px] sm:min-h-[124px] h-full group active:scale-95 shadow-xs"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center my-auto group-hover:scale-105 transition-transform duration-200">
                <Icon3DSholatKiblat size={36} className="sm:w-[42px] sm:h-[42px]" />
              </div>
              <span className="w-full text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition leading-tight tracking-tight text-center mt-auto break-words">
                Sholat & Kiblat
              </span>
            </button>

            {/* 3. Ibadah Umrah (Miqat, Thawaf, Sa'i, Tahallul, Doa Manasik) */}
            <button
              onClick={() => onSelectTab('worship')}
              className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-500 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[104px] sm:min-h-[124px] h-full group active:scale-95 shadow-xs"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center my-auto group-hover:scale-105 transition-transform duration-200">
                <Icon3DTawaf size={36} className="sm:w-[42px] sm:h-[42px]" />
              </div>
              <span className="w-full text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-sky-700 transition leading-tight tracking-tight text-center mt-auto break-words">
                Ibadah Umrah
              </span>
            </button>

            {/* 4. Dzikir Pagi & Petang (Pengganti Nusuk) */}
            <button
              onClick={onOpenDzikir}
              className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-500 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[104px] sm:min-h-[124px] h-full group active:scale-95 shadow-xs"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center my-auto group-hover:scale-105 transition-transform duration-200">
                <Icon3DDzikirPagiPetang size={36} className="sm:w-[42px] sm:h-[42px]" />
              </div>
              <span className="w-full text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-amber-600 transition leading-tight tracking-tight text-center mt-auto break-words">
                Dzikir Pagi Petang
              </span>
            </button>
          </div>

          {/* BARIS 2: 1. Tasbih Digital, 2. Tabungan Umrah, 3. Doa Harian, 4. Pelayanan Jamaah */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
            {/* 1. Tasbih Digital */}
            <button
              onClick={onOpenTasbih}
              className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-500 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[104px] sm:min-h-[124px] h-full group active:scale-95 shadow-xs"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center my-auto group-hover:scale-105 transition-transform duration-200">
                <Icon3DTasbih size={36} className="sm:w-[42px] sm:h-[42px]" />
              </div>
              <span className="w-full text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-purple-600 transition leading-tight tracking-tight text-center mt-auto break-words">
                Tasbih Digital
              </span>
            </button>

            {/* 2. Tabungan Umrah */}
            <button
              onClick={onOpenSavings}
              className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-500 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[104px] sm:min-h-[124px] h-full group active:scale-95 shadow-xs"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center my-auto group-hover:scale-105 transition-transform duration-200">
                <Icon3DTabungan size={36} className="sm:w-[42px] sm:h-[42px]" />
              </div>
              <span className="w-full text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-teal-600 transition leading-tight tracking-tight text-center mt-auto break-words">
                Tabungan Umrah
              </span>
            </button>

            {/* 3. Doa Harian */}
            <button
              onClick={onOpenDailyPrayers}
              className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-500 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[104px] sm:min-h-[124px] h-full group active:scale-95 shadow-xs"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center my-auto group-hover:scale-105 transition-transform duration-200">
                <Icon3DDoaHarian size={36} className="sm:w-[42px] sm:h-[42px]" />
              </div>
              <span className="w-full text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-sky-600 transition leading-tight tracking-tight text-center mt-auto break-words">
                Doa Harian
              </span>
            </button>

            {/* 4. Pelayanan Jamaah */}
            <button
              onClick={onOpenJamaahServices}
              className="px-1.5 py-2.5 sm:px-3 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-500 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[104px] sm:min-h-[124px] h-full group active:scale-95 shadow-xs"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center my-auto group-hover:scale-105 transition-transform duration-200">
                <Icon3DPelayananJamaah size={36} className="sm:w-[42px] sm:h-[42px]" />
              </div>
              <span className="w-full text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 group-hover:text-purple-600 transition leading-tight tracking-tight text-center mt-auto break-words">
                Pelayanan Jamaah
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. LEGALITAS, AKREDITASI RESMI & LOGO ASOSIASI BERJALAN (BEBAS KOTAK, MURNI IKON) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Legalitas & Akreditasi Resmi Pemerintah</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              PT Kanomas Arasy Wisata terdaftar resmi & diawasi Kementerian Agama RI serta terafiliasi lembaga internasional
            </p>
          </div>
          <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
            Akreditasi A (Unggul)
          </span>
        </div>

        {/* LOGO BERJALAN: KEMENAG, IATA, KAN, AMPHURI, ASITA (BEBAS DARI KOTAK LUAR, CUKUP IKON BERGILIRAN) */}
        <div className="relative w-full overflow-hidden py-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          <div className="animate-marquee gap-8 sm:gap-12 flex items-center">
            {[...RUNNING_OFFICIAL_LOGOS, ...RUNNING_OFFICIAL_LOGOS, ...RUNNING_OFFICIAL_LOGOS].map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center select-none"
                title={logo.name}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-10 sm:h-12 w-auto max-w-[130px] sm:max-w-[150px] object-contain filter drop-shadow-2xs opacity-85 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* KARTU LEGALITAS PPIU & PIHK KANOMAS: RAPI, TERTATA, DAN ENAK DIPANDANG */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 via-slate-50 to-amber-50/30 border border-slate-200/80 p-3.5 sm:p-4.5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* PPIU UMRAH */}
            <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-black text-sm flex-shrink-0">
                PPIU
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                  Izin Umrah Resmi Kemenag
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 font-mono block">
                  No. U.310 Tahun 2020
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold block truncate">
                  Penyelenggara Perjalanan Ibadah Umrah
                </span>
              </div>
            </div>

            {/* PIHK HAJI KHUSUS */}
            <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-black text-sm flex-shrink-0">
                PIHK
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                  Izin Haji Khusus Resmi Kemenag
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 font-mono block">
                  No. PHU/HK.5008/VIII/2019
                </span>
                <span className="text-[11px] text-amber-700 font-semibold block truncate">
                  Penyelenggara Ibadah Haji Khusus &amp; Furoda
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-slate-600 font-medium">
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Terintegrasi <strong>SISKOPATUH</strong> Kemenag RI</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Standar <strong>5 Pasti Umrah</strong></span>
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Akreditasi <strong>KAN Unggul "A"</strong></span>
            </span>
          </div>
        </div>
      </section>

      {/* 5. LOGO PARA PERUSAHAAN YANG SUDAH BEKERJASAMA (BERWARNA, BERJALAN SEPERTI IZIN, ANTRIAN SESUAI JENIS LAYANAN) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3.5 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Mitra &amp; Rekanan Resmi Bekerjasama</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Antrian resmi maskapai penerbangan, hotel bintang 5 tanah suci, perbankan syariah, dan sistem teknologi tiket global
            </p>
          </div>
          <span className="text-[11px] font-black text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 w-fit">
            Rekanan Resmi
          </span>
        </div>

        {/* LOGO BERJALAN SEPERTI IZIN: BEBAS KOTAK LUAR, BERWARNA PENUH, BERGILIRAN SESUAI ANTRIAN JENIS LAYANAN */}
        <div className="relative w-full overflow-hidden py-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          <div className="animate-marquee-partners gap-8 sm:gap-11 flex items-center">
            {[...PARTNER_MARQUEE_SEQUENCE, ...PARTNER_MARQUEE_SEQUENCE].map((item, index) => {
              if (item.type === 'badge') {
                const BadgeIcon = item.icon;
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-2xs text-xs font-black select-none ${item.badgeClass}`}
                  >
                    <BadgeIcon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                );
              }

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center select-none py-1 group"
                  title={`${item.name} (${item.category})`}
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-9 sm:h-11 w-auto max-w-[130px] sm:max-w-[155px] object-contain drop-shadow-2xs transform group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Ringkasan Antrian Kategori Layanan Rekanan */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-slate-600 font-medium border-t border-slate-100">
          <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
            <Plane className="w-3 h-3 text-sky-600" />
            <span>6 Maskapai Penerbangan Bintang 5</span>
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
            <Building2 className="w-3 h-3 text-amber-600" />
            <span>3 Hotel &amp; Akomodasi Haram</span>
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
            <CreditCard className="w-3 h-3 text-emerald-600" />
            <span>Bank Syariah Indonesia (BSI)</span>
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
            <Globe2 className="w-3 h-3 text-indigo-600" />
            <span>2 Sistem Global GDS</span>
          </span>
        </div>
      </section>
    </div>
  );
}
