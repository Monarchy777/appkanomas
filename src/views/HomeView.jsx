import React, { useState, useEffect } from 'react';
import {
  Compass,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import {
  Icon3DDoa,
  Icon3DKiblat,
  Icon3DTawaf,
  Icon3DTasbih,
  Icon3DPaket,
  Icon3DTabungan,
  Icon3DNusuk,
  Icon3DStatus
} from '../components/Icons3D';

// 5 Banner Promo & Kekuatan Kanomas
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

      {/* 3. MENU UTAMA CEPAT (8 IKON 3D BERWARNA - SANGAT JELAS & MUDAH DIGUNAKAN) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Menu Layanan & Ibadah</span>
          </h2>
          <span className="text-[10px] text-slate-400">Sentuh menu untuk membuka</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {/* 1. Doa Manasik */}
          <button
            onClick={() => onSelectTab('worship')}
            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[96px] sm:min-h-[110px]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon3DDoa size={40} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-amber-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
              Doa Manasik
            </span>
          </button>

          {/* 2. Kompas Kiblat */}
          <button
            onClick={() => onSelectTab('prayer')}
            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[96px] sm:min-h-[110px]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon3DKiblat size={40} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
              Arah Kiblat
            </span>
          </button>

          {/* 3. Hitung Tawaf */}
          <button
            onClick={onOpenCounter}
            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[96px] sm:min-h-[110px]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon3DTawaf size={40} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-sky-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
              Hitung Tawaf
            </span>
          </button>

          {/* 4. Tasbih Digital */}
          <button
            onClick={onOpenTasbih}
            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[96px] sm:min-h-[110px]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon3DTasbih size={40} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-purple-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
              Tasbih Digital
            </span>
          </button>

          {/* 5. Paket Umrah */}
          <button
            onClick={() => onSelectTab('packages')}
            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[96px] sm:min-h-[110px]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon3DPaket size={40} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-orange-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
              Paket Umrah
            </span>
          </button>

          {/* 6. Tabungan BSI */}
          <button
            onClick={onOpenSavings}
            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[96px] sm:min-h-[110px]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon3DTabungan size={40} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-teal-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
              Tabungan BSI
            </span>
          </button>

          {/* 7. Panduan Nusuk */}
          <button
            onClick={onOpenNusuk}
            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[96px] sm:min-h-[110px]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon3DNusuk size={40} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-amber-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
              Izin Nusuk
            </span>
          </button>

          {/* 8. Cek Status */}
          <button
            onClick={onOpenLookup}
            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[96px] sm:min-h-[110px]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon3DStatus size={40} />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-blue-600 transition leading-tight line-clamp-2 min-h-[26px] flex items-center justify-center">
              Cek Status
            </span>
          </button>
        </div>
      </section>

      {/* 4. LAYANAN BANTUAN & LOKASI KANTOR TASIKMALAYA */}
      <section className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xs">
        <div>
          <strong className="text-slate-900 text-xs sm:text-sm block font-bold">
            Kantor Cabang Tasikmalaya
          </strong>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
            Buka Senin – Sabtu (08.30 – 17.00 WIB) • Siap melayani konsultasi, pendaftaran & bimbingan manasik
          </p>
        </div>

        <a
          href="https://wa.me/628112113363"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-sm flex-shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-emerald-100" />
          <span>Hubungi CS: 0811-2113-363</span>
        </a>
      </section>
    </div>
  );
}
