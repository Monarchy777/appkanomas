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

// Logo Resmi Akreditasi & Regulator Pemerintah untuk Umrah & Haji Khusus
const OFFICIAL_LOGOS = [
  {
    id: 'kemenag',
    name: 'Kementerian Agama RI',
    src: '/assets/logos/logo-kemenag.png'
  },
  {
    id: 'siskopatuh',
    name: 'SISKOPATUH Kemenag RI',
    src: '/assets/logos/logo-siskopatuh.png'
  },
  {
    id: 'kan',
    name: 'KAN - Komite Akreditasi Nasional',
    src: '/assets/logos/logo-kan.png'
  },
  {
    id: 'himpuh',
    name: 'HIMPUH - Asosiasi Haji & Umrah',
    src: '/assets/logos/logo-himpuh.png'
  },
  {
    id: 'iata',
    name: 'IATA International',
    src: '/assets/logos/logo-iata.png'
  },
  {
    id: '5pasti',
    name: '5 Pasti Umrah Kemenag RI',
    src: '/assets/logos/logo-5pasti.jpg'
  }
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

      {/* 2C. BANNER DAFTAR MITRA SYIAR DENGAN ID KTP & NPWP */}
      <section
        onClick={onOpenDaftarMitra}
        className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white cursor-pointer hover:shadow-lg transition-all flex items-center justify-between gap-3 active:scale-[0.99] shadow-sm border border-emerald-500/40 relative overflow-hidden group"
      >
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-amber-400/10 to-transparent pointer-events-none" />
        <div className="flex items-center gap-3 min-w-0 relative z-10">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-400/20 border border-amber-300/40 backdrop-blur-xs flex items-center justify-center flex-shrink-0 text-amber-300 shadow-xs group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Program Kemitraan Syiar Baitullah</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white leading-snug">
              Daftar Menjadi Mitra Syiar Kanomas
            </h3>
            <p className="text-xs text-emerald-100/90 font-medium leading-relaxed">
              Foto KTP & NPWP data otomatis terisi • Ujrah berkah langsung ke rekening Anda
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenDaftarMitra) onOpenDaftarMitra();
          }}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition active:scale-95 flex-shrink-0 whitespace-nowrap border border-amber-300"
        >
          <span>Daftar Sekarang</span>
          <ChevronRight className="w-4 h-4 text-slate-900" />
        </button>
      </section>

      {/* 3. MENU UTAMA BERANDA: 2 BARIS X 4 KOLOM (IKON 3D BERWARNA & ELEGAN) */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Menu Layanan & Ibadah</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Ketuk menu untuk membuka</span>
        </div>

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

      {/* 4. LEGALITAS, AKREDITASI RESMI & LOGO ASLI BERJALAN KANAN KE KIRI (HANYA LOGO RESMI AGAK BESAR TANPA TULISAN) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 overflow-hidden">
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

        {/* LOGO RESMI BERJALAN DARI KANAN KE KIRI (HANYA LOGO, TANPA TEKS KETERANGAN, AGAK BESAR) */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Fading gradient edges agar logo masuk dan keluar secara mulus */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Jalur Marquee Berjalan */}
          <div className="animate-marquee gap-4 sm:gap-6 flex items-center">
            {/* Duplikasi array 3x agar animasi infinite loop berjalan seamless tanpa jeda */}
            {[...OFFICIAL_LOGOS, ...OFFICIAL_LOGOS, ...OFFICIAL_LOGOS].map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-36 sm:w-44 h-20 sm:h-24 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-center select-none"
                title={logo.name}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-12 sm:max-h-14 max-w-full object-contain filter drop-shadow-2xs"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER TEXT LEGALITAS */}
        <div className="pt-2 text-center text-xs text-slate-500 leading-relaxed border-t border-slate-100 font-medium">
          Izin Penyelenggara Perjalanan Ibadah Umrah (PPIU) No. U.310 Tahun 2020 • PIHK No. PHU/HK.5008/VIII/2019 • Terdaftar SISKOPATUH Kemenag RI
        </div>
      </section>
    </div>
  );
}
