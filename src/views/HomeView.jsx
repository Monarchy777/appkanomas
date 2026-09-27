import React, { useState, useEffect } from 'react';
import {
  Compass,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Award
} from 'lucide-react';
import {
  Icon3DAlQuran,
  Icon3DSholatKiblat,
  Icon3DTawaf,
  Icon3DNusuk,
  Icon3DPaket,
  Icon3DTabungan,
  Icon3DDoaHarian,
  Icon3DPelayananJamaah
} from '../components/Icons3D';

// 5 Banner Promo & Kekuatan Kanomas (Ganti otomatis setiap 3 detik)
const PROMO_BANNERS = [
  {
    id: 1,
    image: '/assets/banners/banner-1-kemenag.jpg',
    tag: 'Akreditasi A Resmi',
    title: 'Izin Resmi Kemenag RI (PPIU U.310)',
    subtitle: 'Garansi 100% kepastian berangkat dengan perlindungan penuh'
  },
  {
    id: 2,
    image: '/assets/banners/banner-2-hotel.jpg',
    tag: 'Hotel Bintang 5',
    title: 'Pelataran Ka’bah 0 Meter',
    subtitle: 'Akses langsung jalan kaki ke pelataran Masjidil Haram'
  },
  {
    id: 3,
    image: '/assets/banners/banner-3-promo.jpg',
    tag: 'Promo Umrah 1447H',
    title: 'Penerbangan Langsung Direct Flight',
    subtitle: 'Garuda Indonesia & Saudia Airlines rute Jakarta ke Madinah'
  },
  {
    id: 4,
    image: '/assets/banners/banner-4-bimbingan.jpg',
    tag: 'Bimbingan Sunnah',
    title: 'Manasik Intensif Sesuai Sunnah',
    subtitle: 'Didampingi pembimbing bersertifikat resmi Kemenag RI'
  },
  {
    id: 5,
    image: '/assets/banners/banner-5-haji.jpg',
    tag: 'Haji Khusus VIP',
    title: 'Tenda Maktab VIP Armuzna',
    subtitle: 'Kenyamanan ibadah haji khusus dengan fasilitas terbaik'
  }
];

export default function HomeView({
  packages = [],
  mentors = [],
  nextPrayer,
  onSelectTab,
  onOpenQuran,
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
  onBookPackage
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance banner setiap 3 detik (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);
  };

  return (
    <div className="space-y-5 sm:space-y-6 pb-28 mx-3 sm:mx-6 mt-4 max-w-4xl mx-auto">
      {/* 1. CAROUSEL PROMO & KEKUATAN KANOMAS (OTOMATIS BERGANTI SETIAP 3 DETIK) */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-md group select-none">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
          {PROMO_BANNERS.map((banner, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Gradient Shadow untuk Keterbacaan Tulisan */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white space-y-1 sm:space-y-1.5 z-20">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
                      {banner.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white font-sans tracking-tight leading-snug drop-shadow-sm">
                    {banner.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-1 drop-shadow-sm font-medium">
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
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-5 sm:w-6 bg-amber-400'
                  : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. WAKTU SHOLAT BERIKUTNYA (CUKUP 1 BARIS SAJA DENGAN TOMBOL ARAH KIBLAT) */}
      <section className="px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-center gap-1.5 min-w-0 text-xs sm:text-sm font-semibold text-slate-700 truncate">
            <span className="text-slate-500 whitespace-nowrap">Sholat Berikutnya:</span>
            <span className="font-extrabold text-amber-700 font-mono whitespace-nowrap">
              {nextPrayer ? `${nextPrayer.name} ${nextPrayer.time} WIB` : 'Subuh 04:30 WIB'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('prayer')}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition active:scale-95 flex-shrink-0 whitespace-nowrap"
        >
          <Compass className="w-4 h-4 text-amber-100" />
          <span>Arah Kiblat</span>
        </button>
      </section>

      {/* 3. MENU UTAMA BERANDA: 2 BARIS X 4 KOLOM (IKON 3D BERWARNA & ELEGAN) */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Menu Layanan & Ibadah</span>
          </h2>
          <span className="text-[10px] text-slate-400">Sentuh menu untuk membuka</span>
        </div>

        <div className="space-y-2.5 sm:space-y-3.5">
          {/* BARIS 1: 1. Al Quran, 2. Jadwal Sholat & Arah Kiblat, 3. Ibadah Umrah, 4. Pelayanan Nusuk */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
            {/* 1. Al Quran */}
            <button
              onClick={onOpenQuran}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-xs min-h-[98px] sm:min-h-[110px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon3DAlQuran size={40} />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                Al-Qur'an
              </span>
            </button>

            {/* 2. Jadwal Sholat & Arah Kiblat */}
            <button
              onClick={() => onSelectTab('prayer')}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-xs min-h-[98px] sm:min-h-[110px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon3DSholatKiblat size={40} />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                Sholat & Kiblat
              </span>
            </button>

            {/* 3. Ibadah Umrah (Miqat, Thawaf, Sa'i, Tahallul, Doa Manasik) */}
            <button
              onClick={() => onSelectTab('worship')}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-xs min-h-[98px] sm:min-h-[110px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon3DTawaf size={40} />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-sky-700 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                Ibadah Umrah
              </span>
            </button>

            {/* 4. Pelayanan Nusuk */}
            <button
              onClick={onOpenNusuk}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-xs min-h-[98px] sm:min-h-[110px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon3DNusuk size={40} />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-amber-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                Layanan Nusuk
              </span>
            </button>
          </div>

          {/* BARIS 2: 1. Paket Umrah, 2. Tabungan Umrah, 3. Doa Harian, 4. Pelayanan Jamaah */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
            {/* 1. Paket Umrah */}
            <button
              onClick={() => onSelectTab('packages')}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-xs min-h-[98px] sm:min-h-[110px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon3DPaket size={40} />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-orange-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                Paket Umrah
              </span>
            </button>

            {/* 2. Tabungan Umrah */}
            <button
              onClick={onOpenSavings}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-xs min-h-[98px] sm:min-h-[110px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon3DTabungan size={40} />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-teal-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                Tabungan Umrah
              </span>
            </button>

            {/* 3. Doa Harian */}
            <button
              onClick={onOpenDailyPrayers}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-xs min-h-[98px] sm:min-h-[110px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon3DDoaHarian size={40} />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-sky-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                Doa Harian
              </span>
            </button>

            {/* 4. Pelayanan Jamaah */}
            <button
              onClick={onOpenJamaahServices}
              className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-xs min-h-[98px] sm:min-h-[110px]"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon3DPelayananJamaah size={40} />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-purple-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
                Pelayanan Jamaah
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. LEGALITAS, AKREDITASI KAN, SISKOPATUH & KEMITRAAN RESMI */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Legalitas & Akreditasi Resmi</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              PT Kanomas Arasy Wisata terdaftar resmi & diawasi oleh Kementerian Agama Republik Indonesia
            </p>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
            Akreditasi A (Unggul)
          </span>
        </div>

        {/* LOGO & BADGE GRID RESMI */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
          {/* 1. LOGO KAN */}
          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-1.5 hover:bg-amber-50/50 hover:border-amber-300 transition">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs">
              <svg viewBox="0 0 100 60" className="w-full h-full">
                <rect width="100" height="60" rx="8" fill="#ffffff" />
                <path d="M12 45L22 15H30L20 45H12Z" fill="#1e3a8a" />
                <path d="M26 45L40 15H48L34 45H26Z" fill="#dc2626" />
                <path d="M42 45L56 15H64L50 45H42Z" fill="#1e3a8a" />
                <text x="50" y="55" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1e3a8a" fontFamily="sans-serif">KAN</text>
              </svg>
            </div>
            <strong className="text-[11px] font-black text-slate-800 block leading-tight">
              KAN
            </strong>
            <span className="text-[9px] text-slate-500 block leading-tight">
              Komite Akreditasi Nasional
            </span>
          </div>

          {/* 2. LOGO SISKOPATUH */}
          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-1.5 hover:bg-emerald-50/50 hover:border-emerald-300 transition">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="46" fill="#047857" />
                <circle cx="50" cy="50" r="38" fill="#ffffff" />
                <path d="M30 65L50 25L70 65H30Z" fill="#047857" />
                <circle cx="50" cy="50" r="8" fill="#fde047" />
              </svg>
            </div>
            <strong className="text-[11px] font-black text-slate-800 block leading-tight">
              SISKOPATUH
            </strong>
            <span className="text-[9px] text-slate-500 block leading-tight">
              Kemenag Terintegrasi
            </span>
          </div>

          {/* 3. LOGO KEMENAG RI */}
          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-1.5 hover:bg-emerald-50/50 hover:border-emerald-300 transition">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,6 90,30 90,70 50,94 10,70 10,30" fill="#065f46" />
                <polygon points="50,14 82,34 82,66 50,86 18,66 18,34" fill="#ffffff" />
                <circle cx="50" cy="50" r="18" fill="#f59e0b" />
                <path d="M50 36V64M36 50H64" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <strong className="text-[11px] font-black text-slate-800 block leading-tight">
              KEMENAG RI
            </strong>
            <span className="text-[9px] text-slate-500 block leading-tight">
              PPIU No. U.310
            </span>
          </div>

          {/* 4. LOGO HIMPUH */}
          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-1.5 hover:bg-amber-50/50 hover:border-amber-300 transition">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="46" fill="#1e3a8a" />
                <circle cx="50" cy="50" r="40" fill="#ffffff" />
                <path d="M30 40C35 30 65 30 70 40C70 60 50 75 50 75C50 75 30 60 30 40Z" fill="#d97706" />
                <text x="50" y="58" textAnchor="middle" fontSize="14" fontWeight="900" fill="#ffffff" fontFamily="sans-serif">H</text>
              </svg>
            </div>
            <strong className="text-[11px] font-black text-slate-800 block leading-tight">
              HIMPUH
            </strong>
            <span className="text-[9px] text-slate-500 block leading-tight">
              Asosiasi Resmi Haji
            </span>
          </div>

          {/* 5. LOGO IATA */}
          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-1.5 hover:bg-sky-50/50 hover:border-sky-300 transition">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs">
              <svg viewBox="0 0 100 60" className="w-full h-full">
                <rect width="100" height="60" rx="8" fill="#0284c7" />
                <circle cx="50" cy="30" r="22" fill="#ffffff" opacity="0.2" />
                <text x="50" y="38" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ffffff" fontFamily="sans-serif" letterSpacing="1">IATA</text>
              </svg>
            </div>
            <strong className="text-[11px] font-black text-slate-800 block leading-tight">
              IATA
            </strong>
            <span className="text-[9px] text-slate-500 block leading-tight">
              Passenger Agency
            </span>
          </div>

          {/* 6. LOGO 5 PASTI UMRAH */}
          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-1.5 hover:bg-amber-50/50 hover:border-amber-300 transition">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">
                5✓
              </div>
            </div>
            <strong className="text-[11px] font-black text-slate-800 block leading-tight">
              5 PASTI
            </strong>
            <span className="text-[9px] text-slate-500 block leading-tight">
              Kemenag Bergaransi
            </span>
          </div>
        </div>

        {/* FOOTER TEXT LEGALITAS */}
        <div className="pt-2 text-center text-[10px] sm:text-[11px] text-slate-500 leading-relaxed border-t border-slate-100">
          Izin Penyelenggara Perjalanan Ibadah Umrah (PPIU) No. U.310 Tahun 2020 • PIHK No. PHU/HK.5008/VIII/2019 • Terdaftar SISKOPATUH Kemenag RI
        </div>
      </section>
    </div>
  );
}
