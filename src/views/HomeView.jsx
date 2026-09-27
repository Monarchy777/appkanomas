import React from 'react';
import {
  ShieldCheck,
  Compass,
  BookOpen,
  Calculator,
  Calendar,
  UserCheck,
  Clock,
  Sparkles,
  Phone,
  Plane,
  Hotel,
  Award,
  ChevronRight,
  ExternalLink,
  Users,
  CheckCircle2,
  MapPin,
  Heart,
  Volume2,
  MessageSquare
} from 'lucide-react';
import { COMPANY_PROFILE } from '../services/initialSeed';

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
  const featuredPackages = packages.slice(0, 3);

  return (
    <div className="space-y-5 pb-24 mx-3 sm:mx-6 mt-3">
      {/* 1. HERO BANNER: SUPER RINGAN & CEPAT DIBUKA (Tanpa Video Berat) */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#122332] via-[#0e1a25] to-[#081017] border border-amber-900/40 shadow-2xl p-5 sm:p-7 text-white space-y-4">
        {/* Subtle Decorative Pattern */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-48 h-48 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          {/* Izin Resmi Kemenag Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#b45309] text-white shadow-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
              <span>Resmi Kemenag RI (PPIU U.310)</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-600/30">
              Akreditasi A
            </span>
          </div>

          {/* Heading Elegan & Syar'i */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white font-serif leading-snug">
              Bimbingan Sunnah Dari Hati, <br />
              <span className="text-amber-400 font-sans">
                Hotel Pelataran Dekat Ka'bah
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              PT Kanomas Artha Wisata Cabang Tasikmalaya melayani ibadah Umrah & Haji Khusus dengan kepastian jadwal tanpa penundaan.
            </p>
          </div>

          {/* 2 Tombol Aksi Utama */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 max-w-md">
            <button
              onClick={() => onSelectTab('packages')}
              className="py-3 px-3 rounded-2xl bg-[#b45309] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>Jadwal Paket</span>
            </button>

            <button
              onClick={() => onSelectTab('prayer')}
              className="py-3 px-3 rounded-2xl bg-[#133023] hover:bg-[#1a4030] text-emerald-300 border border-emerald-500/40 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Kompas Kiblat</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. JADWAL SHOLAT HARI INI (RINGKAS & LANGSUNG TAMPIL) */}
      <section>
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#101b25] border border-amber-900/30 shadow-md flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-600/30 flex items-center justify-center flex-shrink-0">
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
            className="px-3.5 py-2 rounded-xl bg-[#0b141d] hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center gap-1 border border-amber-900/40 transition flex-shrink-0"
          >
            <span>Buka Kompas</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </section>

      {/* 3. 4 MENU UTAMA SUPER JELAS (KOTAK BESAR, ANTI SALAH KETUK) */}
      <section className="space-y-2">
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
          Menu Layanan Jamaah
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Menu 1: Paket Umrah */}
          <button
            onClick={() => onSelectTab('packages')}
            className="p-4 rounded-2xl bg-[#101b25] border border-amber-900/30 hover:border-amber-500/50 text-left transition shadow-sm space-y-2 group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/30 flex items-center justify-center group-hover:scale-105 transition">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-white block group-hover:text-amber-300 transition">
                Paket Umrah & Haji
              </strong>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Jadwal & harga resmi 2026
              </span>
            </div>
          </button>

          {/* Menu 2: Arah Kiblat Gyro */}
          <button
            onClick={() => onSelectTab('prayer')}
            className="p-4 rounded-2xl bg-[#101b25] border border-amber-900/30 hover:border-emerald-500/50 text-left transition shadow-sm space-y-2 group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 text-emerald-400 border border-emerald-600/30 flex items-center justify-center group-hover:scale-105 transition">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-white block group-hover:text-emerald-300 transition">
                Arah Kiblat Gyro
              </strong>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Kompas otomatis akurat
              </span>
            </div>
          </button>

          {/* Menu 3: Doa & Talbiyah */}
          <button
            onClick={() => onSelectTab('worship')}
            className="p-4 rounded-2xl bg-[#101b25] border border-amber-900/30 hover:border-amber-500/50 text-left transition shadow-sm space-y-2 group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/30 flex items-center justify-center group-hover:scale-105 transition">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-white block group-hover:text-amber-300 transition">
                Audio Doa Manasik
              </strong>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Putar lafaz Arab qori asli
              </span>
            </div>
          </button>

          {/* Menu 4: Nusuk & Bantuan */}
          <button
            onClick={onOpenNusuk}
            className="p-4 rounded-2xl bg-[#101b25] border border-amber-900/30 hover:border-emerald-500/50 text-left transition shadow-sm space-y-2 group active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 text-emerald-400 border border-emerald-600/30 flex items-center justify-center group-hover:scale-105 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-white block group-hover:text-emerald-300 transition">
                Panduan Nusuk
              </strong>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Izin resmi Raudhah KSA
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* 4. PAKET UNGGULAN PILIHAN (3 PAKET TERBAIK & JELAS) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white">
              Paket Umrah Unggulan 2026
            </h3>
            <p className="text-[11px] text-slate-400">Pilihan paket paling diminati jamaah Priangan Timur</p>
          </div>
          <button
            onClick={() => onSelectTab('packages')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
          >
            <span>Semua Paket</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {featuredPackages.map((pkg) => {
            const price = Number(pkg.priceQuad || pkg.base_price || 0);

            return (
              <div
                key={pkg.id}
                className="p-4 rounded-2xl bg-[#101b25] border border-amber-900/30 hover:border-amber-500/40 transition shadow-md flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center justify-between"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#b45309] text-white">
                      {pkg.status || 'Promo'}
                    </span>
                    <span className="text-[11px] text-amber-300/80 font-mono">
                      {pkg.duration}
                    </span>
                  </div>

                  <h4
                    onClick={() => onOpenPackageDetail(pkg)}
                    className="text-sm sm:text-base font-bold text-white leading-snug hover:text-amber-300 cursor-pointer transition line-clamp-1"
                  >
                    {pkg.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1">
                      <Plane className="w-3 h-3 text-amber-400" />
                      <span>{pkg.airline}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Hotel className="w-3 h-3 text-amber-300" />
                      <span className="truncate max-w-[150px]">{pkg.hotelMakkah}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span>{pkg.departureDate}</span>
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="text-left sm:text-right">
                    <span className="text-[9px] text-slate-400 uppercase block">Mulai</span>
                    <span className="text-base sm:text-lg font-black text-amber-300 font-mono">
                      Rp {(price / 1000000).toFixed(1)} Jt
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenPackageDetail(pkg)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                    >
                      Rincian
                    </button>
                    <button
                      onClick={() => onBookPackage(pkg)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#b45309] hover:bg-[#c2410c] text-white font-bold text-xs shadow transition active:scale-95"
                    >
                      Daftar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. TABUNGAN UMROH BERKAH BSI (RINGKAS) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#112419] to-[#0c1822] border border-emerald-600/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-white shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-600/40 inline-block">
            Bebas Riba via Bank Syariah Indonesia (BSI)
          </span>
          <h4 className="text-base font-bold text-white">
            Rencanakan Ibadah dengan Tabungan Umroh
          </h4>
          <p className="text-xs text-slate-300">
            Setoran awal ringan mulai Rp 500.000, autodebet fleksibel hingga target tercapai.
          </p>
        </div>

        <button
          onClick={onOpenSavings}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 flex-shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Hitung Simulasi</span>
        </button>
      </section>

      {/* 6. DEWAN PEMBIMBING IBADAH (FOTO 4 ASATIDZ RESMI) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-[#101b25] border border-amber-900/30 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Dewan Pembimbing Manasik Kanomas</span>
          </h4>
          <span className="text-[10px] text-emerald-400 font-semibold">Bersertifikat Kemenag</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {mentors.slice(0, 4).map((m) => (
            <div
              key={m.id}
              className="p-3 rounded-2xl bg-[#0b141d] border border-white/5 text-center space-y-2 flex flex-col items-center justify-between"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/40 bg-slate-900 shadow-md">
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
                <span className="text-[9px] text-amber-300 block truncate">
                  {m.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ALAMAT & KONTAK KANTOR TASIKMALAYA */}
      <section className="p-4 rounded-2xl bg-[#0b141d] border border-white/5 space-y-2 text-xs text-slate-300 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="space-y-0.5">
          <strong className="text-white block font-bold">
            Kantor Cabang Tasikmalaya
          </strong>
          <p className="text-[11px] text-slate-400">
            Tasikmalaya, Jawa Barat • Buka Senin - Sabtu (08.30 - 17.00 WIB)
          </p>
        </div>

        <a
          href="https://wa.me/628112113363"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-[#142d20] hover:bg-[#1b3d2b] text-emerald-300 border border-emerald-600/40 font-bold text-xs flex items-center gap-2 transition"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Chat WhatsApp: 0811-2113-363</span>
        </a>
      </section>
    </div>
  );
}
