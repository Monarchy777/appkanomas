import React from 'react';
import {
  ShieldCheck,
  Compass,
  BookOpen,
  Calculator,
  Calendar,
  Clock,
  Sparkles,
  Plane,
  Hotel,
  ChevronRight,
  Users,
  MessageSquare,
  Repeat,
  Sparkle,
  Search,
  CheckCircle2,
  Phone
} from 'lucide-react';

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
      {/* 1. KARTU SALAM & IDENTITAS RESMI */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#122332] via-[#0d1a24] to-[#070f16] border border-amber-900/40 shadow-xl p-5 sm:p-6 text-white">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-amber-300/90 font-serif italic">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-600/40">
              Resmi Kemenag RI (PPIU U.310)
            </span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-serif leading-snug">
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Selamat datang di aplikasi resmi <strong>Kanomas Tour & Travel Cabang Tasikmalaya</strong>. Sahabat setia bimbingan ibadah Umrah & Haji Khusus Anda sesuai tuntunan Sunnah.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WIDGET WAKTU SHOLAT & AKSES CEPAT KIBLAT */}
      <section className="p-4 rounded-2xl bg-[#0f1922] border border-amber-900/30 shadow-md flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/40 flex items-center justify-center flex-shrink-0 shadow-inner">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Sholat Berikutnya (Tasikmalaya)
            </span>
            <strong className="text-sm sm:text-base font-black text-amber-300 font-mono truncate block">
              {nextPrayer ? `${nextPrayer.name} : ${nextPrayer.time} WIB` : 'Subuh 04:30 WIB'}
            </strong>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('prayer')}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#b45309] to-[#d97706] hover:from-[#c2410c] hover:to-[#ea580c] text-white text-xs font-bold flex items-center gap-1.5 shadow transition active:scale-95 flex-shrink-0"
        >
          <Compass className="w-4 h-4 text-amber-200" />
          <span>Arah Kiblat</span>
        </button>
      </section>

      {/* 3. MENU UTAMA CEPAT (8 IKON APLIKASI - JELAS & MUDAH DIGUNAKAN) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Menu Layanan & Ibadah</span>
          </h2>
          <span className="text-[10px] text-slate-400">Sentuh ikon untuk membuka</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {/* 1. Doa Manasik */}
          <button
            onClick={() => onSelectTab('worship')}
            className="p-3 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-amber-500/40 transition flex flex-col items-center text-center gap-2 group active:scale-95 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-600/40 flex items-center justify-center group-hover:scale-105 transition shadow">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-amber-300 transition leading-tight">
              Doa Manasik
            </span>
          </button>

          {/* 2. Kompas Kiblat */}
          <button
            onClick={() => onSelectTab('prayer')}
            className="p-3 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-emerald-500/40 transition flex flex-col items-center text-center gap-2 group active:scale-95 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 flex items-center justify-center group-hover:scale-105 transition shadow">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition leading-tight">
              Arah Kiblat
            </span>
          </button>

          {/* 3. Hitung Tawaf */}
          <button
            onClick={onOpenCounter}
            className="p-3 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-amber-500/40 transition flex flex-col items-center text-center gap-2 group active:scale-95 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-600/40 flex items-center justify-center group-hover:scale-105 transition shadow">
              <Repeat className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-amber-300 transition leading-tight">
              Hitung Tawaf
            </span>
          </button>

          {/* 4. Tasbih Digital */}
          <button
            onClick={onOpenTasbih}
            className="p-3 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-emerald-500/40 transition flex flex-col items-center text-center gap-2 group active:scale-95 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 flex items-center justify-center group-hover:scale-105 transition shadow">
              <Sparkle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition leading-tight">
              Tasbih Digital
            </span>
          </button>

          {/* 5. Paket Umrah */}
          <button
            onClick={() => onSelectTab('packages')}
            className="p-3 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-amber-500/40 transition flex flex-col items-center text-center gap-2 group active:scale-95 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#142636] text-amber-300 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition shadow">
              <Plane className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-amber-300 transition leading-tight">
              Paket Umrah
            </span>
          </button>

          {/* 6. Tabungan BSI */}
          <button
            onClick={onOpenSavings}
            className="p-3 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-emerald-500/40 transition flex flex-col items-center text-center gap-2 group active:scale-95 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 flex items-center justify-center group-hover:scale-105 transition shadow">
              <Calculator className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition leading-tight">
              Tabungan BSI
            </span>
          </button>

          {/* 7. Panduan Nusuk */}
          <button
            onClick={onOpenNusuk}
            className="p-3 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-amber-500/40 transition flex flex-col items-center text-center gap-2 group active:scale-95 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-600/40 flex items-center justify-center group-hover:scale-105 transition shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-amber-300 transition leading-tight">
              Izin Nusuk
            </span>
          </button>

          {/* 8. Cek Status */}
          <button
            onClick={onOpenLookup}
            className="p-3 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-emerald-500/40 transition flex flex-col items-center text-center gap-2 group active:scale-95 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 flex items-center justify-center group-hover:scale-105 transition shadow">
              <Search className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition leading-tight">
              Cek Status
            </span>
          </button>
        </div>
      </section>

      {/* 4. PAKET UNGGULAN TERPOPULER (CARD BESAR ELEGAN & TRANSPARAN) */}
      {featuredPackage && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                Paket Paling Diminati Jamaah
              </h2>
              <p className="text-[11px] text-slate-400">Garansi kepastian hotel dekat pelataran Ka'bah</p>
            </div>
            <button
              onClick={() => onSelectTab('packages')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#101c27] to-[#0a131b] border border-amber-900/40 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-sm">
                {featuredPackage.status || 'Pilihan Terbaik'}
              </span>
              <span className="text-xs text-amber-300 font-mono font-bold">
                {featuredPackage.duration}
              </span>
            </div>

            <h3
              onClick={() => onOpenPackageDetail(featuredPackage)}
              className="text-base sm:text-lg font-black text-white hover:text-amber-300 cursor-pointer transition leading-snug"
            >
              {featuredPackage.title}
            </h3>

            {/* Fasilitas Pokok */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-white/5">
                <Plane className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">{featuredPackage.airline}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-white/5">
                <Hotel className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{featuredPackage.hotelMakkah}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-white/5 col-span-2 sm:col-span-1">
                <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span className="truncate">{featuredPackage.departureDate}</span>
              </div>
            </div>

            {/* Harga & Tombol Aksi */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Biaya All-in Mulai</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                  Rp {(Number(featuredPackage.priceQuad || featuredPackage.base_price || 0) / 1000000).toFixed(1)} Jt
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenPackageDetail(featuredPackage)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                >
                  Detail
                </button>
                <button
                  onClick={() => onBookPackage(featuredPackage)}
                  className="px-4 py-2 rounded-xl bg-[#b45309] hover:bg-[#c2410c] text-white font-bold text-xs shadow-md transition active:scale-95"
                >
                  Daftar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. DEWAN PEMBIMBING IBADAH (MEMBANGUN KEPERCAYAAN JAMAAH) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-[#0f1922] border border-amber-900/30 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Dewan Pembimbing Manasik Kanomas</span>
          </h2>
          <span className="text-[10px] text-emerald-400 font-bold">Kemenag RI Certified</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {mentors.slice(0, 4).map((m) => (
            <div
              key={m.id}
              className="p-3 rounded-2xl bg-[#070e15] border border-white/5 text-center space-y-2 flex flex-col items-center justify-between"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/40 bg-slate-900 shadow">
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
                <strong className="text-xs font-bold text-white block leading-snug line-clamp-1">
                  {m.name}
                </strong>
                <span className="text-[9px] text-amber-300/90 block truncate">
                  {m.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LAYANAN BANTUAN & LOKASI KANTOR TASIKMALAYA */}
      <section className="p-4 rounded-2xl bg-[#0f1922] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <strong className="text-white text-xs block font-bold">
            Kantor Cabang Tasikmalaya
          </strong>
          <p className="text-[11px] text-slate-400">
            Buka Senin – Sabtu (08.30 – 17.00 WIB) • Siap melayani pendaftaran & manasik
          </p>
        </div>

        <a
          href="https://wa.me/628112113363"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-xl bg-[#142d20] hover:bg-[#1b3d2b] text-emerald-300 border border-emerald-600/40 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 flex-shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Hubungi CS: 0811-2113-363</span>
        </a>
      </section>
    </div>
  );
}
