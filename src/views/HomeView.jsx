import React from 'react';
import {
  ShieldCheck,
  Compass,
  Calendar,
  Clock,
  Sparkles,
  Plane,
  Hotel,
  ChevronRight,
  Users,
  MessageSquare,
  Search,
  CheckCircle2,
  Phone
} from 'lucide-react';
import {
  Icon3DDoa,
  Icon3DKiblat,
  Icon3DTawaf,
  Icon3DTasbih,
  Icon3DPaket,
  Icon3DTabungan,
  Icon3DNusuk,
  Icon3DStatus,
  Icon3DSholat
} from '../components/Icons3D';

export default function HomeView({
  packages,
  mentors,
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
  const featuredPackage = packages[0] || null;
  const popularPackages = packages.slice(1, 3);

  return (
    <div className="space-y-5 pb-24 mx-3 sm:mx-6 mt-3 max-w-4xl mx-auto">
      {/* 1. KARTU SALAM & IDENTITAS RESMI (Putih Bersih & Aksen Amber Kanomas) */}
      <section className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm p-5 sm:p-6 text-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-amber-700 font-serif italic tracking-wide">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </span>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
              Resmi Kemenag RI (PPIU U.310)
            </span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif leading-snug">
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Selamat datang di aplikasi resmi <strong className="text-slate-900">Kanomas Tour & Travel Cabang Tasikmalaya</strong>. Sahabat setia bimbingan ibadah Umrah & Haji Khusus Anda sesuai tuntunan Sunnah Rasulullah ﷺ.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WIDGET WAKTU SHOLAT & AKSES CEPAT KIBLAT (Card Putih Bersih) */}
      <section className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0">
            <Icon3DSholat size={44} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider truncate">
              Sholat Berikutnya <span className="hidden sm:inline">(Tasikmalaya)</span>
            </span>
            <strong className="text-sm sm:text-base font-black text-amber-700 font-mono truncate block">
              {nextPrayer ? `${nextPrayer.name} : ${nextPrayer.time} WIB` : 'Subuh 04:30 WIB'}
            </strong>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('prayer')}
          className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(234,88,12,0.25)] transition active:scale-95 flex-shrink-0"
        >
          <Compass className="w-4 h-4 text-amber-100" />
          <span>Arah Kiblat</span>
        </button>
      </section>

      {/* 3. MENU UTAMA CEPAT (8 IKON 3D BERWARNA - SANGAT JELAS & MUDAH DIGUNAKAN) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Menu Layanan & Ibadah</span>
          </h2>
          <span className="text-[10px] text-slate-500">Sentuh menu untuk membuka</span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {/* 1. Doa Manasik */}
          <button
            onClick={() => onSelectTab('worship')}
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[92px] sm:min-h-[105px]"
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
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[92px] sm:min-h-[105px]"
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
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[92px] sm:min-h-[105px]"
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
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[92px] sm:min-h-[105px]"
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
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[92px] sm:min-h-[105px]"
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
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[92px] sm:min-h-[105px]"
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
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[92px] sm:min-h-[105px]"
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
            className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-1.5 group active:scale-95 shadow-sm min-h-[92px] sm:min-h-[105px]"
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

      {/* 4. PAKET UNGGULAN TERPOPULER (CARD PUTIH ELEGAN DENGAN AKSEN GOLDEN) */}
      {featuredPackage && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900">
                Paket Paling Diminati Jamaah
              </h2>
              <p className="text-[11px] text-slate-500">Garansi kepastian hotel dekat pelataran Ka'bah</p>
            </div>
            <button
              onClick={() => onSelectTab('packages')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                {featuredPackage.status || 'Pilihan Terbaik'}
              </span>
              <span className="text-xs text-amber-700 font-mono font-bold bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                {featuredPackage.duration}
              </span>
            </div>

            <h3
              onClick={() => onOpenPackageDetail(featuredPackage)}
              className="text-base sm:text-lg font-black text-slate-900 hover:text-amber-600 cursor-pointer transition leading-snug"
            >
              {featuredPackage.title}
            </h3>

            {/* Fasilitas Pokok */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 pt-1">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <Plane className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="truncate font-medium">{featuredPackage.airline}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <Hotel className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="truncate font-medium">{featuredPackage.hotelMakkah}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="truncate font-medium">{featuredPackage.departureDate}</span>
              </div>
            </div>

            {/* Harga & Tombol Aksi */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Biaya All-in Mulai</span>
                <span className="text-xl sm:text-2xl font-black text-amber-600 font-mono">
                  Rp {(Number(featuredPackage.priceQuad || featuredPackage.base_price || 0) / 1000000).toFixed(1)} Jt
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenPackageDetail(featuredPackage)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  Detail
                </button>
                <button
                  onClick={() => onBookPackage(featuredPackage)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md transition active:scale-95"
                >
                  Daftar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. DEWAN PEMBIMBING IBADAH (MEMBANGUN KEPERCAYAAN JAMAAH) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" />
            <span>Dewan Pembimbing Manasik Kanomas</span>
          </h2>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Kemenag RI Certified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {mentors.slice(0, 4).map((m) => (
            <div
              key={m.id}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 flex flex-col items-center justify-between hover:bg-amber-50/50 hover:border-amber-300 transition"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500 bg-white shadow-sm">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (m.fallbackPhoto && e.target.src !== m.fallbackPhoto) {
                      e.target.src = m.fallbackPhoto;
                    }
                  }}
                />
              </div>

              <div className="space-y-0.5">
                <strong className="text-xs font-bold text-slate-900 block leading-snug line-clamp-1">
                  {m.name}
                </strong>
                <span className="text-[9px] text-amber-700 block truncate font-medium">
                  {m.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LAYANAN BANTUAN & LOKASI KANTOR TASIKMALAYA */}
      <section className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xs">
        <div>
          <strong className="text-slate-900 text-xs block font-bold">
            Kantor Cabang Tasikmalaya
          </strong>
          <p className="text-[11px] text-slate-600">
            Buka Senin – Sabtu (08.30 – 17.00 WIB) • Siap melayani pendaftaran & bimbingan manasik
          </p>
        </div>

        <a
          href="https://wa.me/628112113363"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-md flex-shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-emerald-100" />
          <span>Hubungi CS: 0811-2113-363</span>
        </a>
      </section>
    </div>
  );
}
