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
  Volume2
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
  const featuredPackages = packages.slice(0, 4);

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Hero Banner: Dignified, Syar'i & Resilient Mobile Layout */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0a1219] border border-amber-900/30 shadow-2xl mx-3 sm:mx-6 mt-3">
        {/* Background Visual (Video or Image) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-25"
            poster="/assets/thawaf-poster.jpg"
          >
            <source src="/assets/thawaf-optimized.webm" type="video/webm" />
            <source src="/assets/Thawaf.mp4" type="video/mp4" />
          </video>
          {/* Gentle Syar'i Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b141d] via-[#0b141d]/80 to-[#0b141d]/40" />
        </div>

        {/* Hero Content - Clean Flex Flow (Prevents Text Collision on Small Phones) */}
        <div className="relative z-10 p-5 sm:p-8 flex flex-col justify-end min-h-[380px] sm:min-h-[430px] text-white space-y-4">
          <div className="space-y-2.5 max-w-2xl">
            {/* Accreditation Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#b45309] text-white shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Penyelenggara Resmi Kemenag RI</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[#132332]/90 backdrop-blur-sm text-amber-200 border border-amber-500/30">
                PPIU U.310 • PIHK 9120313132406
              </span>
            </div>

            {/* Syar'i Dignified Heading */}
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug text-white font-serif">
              Bimbingan Sunnah Dari Hati, <br />
              <span className="text-amber-300 font-sans font-black">
                Hotel Pelataran Dekat Ka'bah
              </span>
            </h2>

            {/* Concise Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Melayani jamaah Umrah & Haji Khusus Tasikmalaya dan Priangan Timur dengan kepastian jadwal, akreditasi A, serta bimbingan para Asatidz bersertifikat resmi.
            </p>
          </div>

          {/* Hero Action Buttons - Clean Mobile Row / Wrap */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
            <button
              onClick={() => onSelectTab('packages')}
              className="px-5 py-3 rounded-2xl bg-[#b45309] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>Lihat Jadwal & Paket 2026</span>
            </button>

            <button
              onClick={onOpenSavings}
              className="px-5 py-3 rounded-2xl bg-[#133023] hover:bg-[#1a4030] text-emerald-300 border border-emerald-500/40 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 active:scale-98"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Simulasi Tabungan BSI</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Prayer Times Quick Strip (Tasikmalaya & Audio Quick Tap) */}
      <section className="mx-3 sm:mx-6">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#101b25] border border-amber-900/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-600/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white truncate">Jadwal Sholat Tasikmalaya</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              </div>
              <p className="text-[11px] text-slate-300 truncate">
                Menjelang waktu: <strong className="text-amber-300">{nextPrayer ? `${nextPrayer.name} ${nextPrayer.time} WIB` : 'Subuh'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={onOpenTalbiyah}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-amber-500/30 transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Audio Talbiyah</span>
            </button>

            <button
              onClick={() => onSelectTab('prayer')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 border border-slate-700 transition"
            >
              <span>Arah Kiblat</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Quick Action Feature Grid (Clean, Syar'i & Uncluttered) */}
      <section className="mx-3 sm:mx-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-4 rounded-full bg-[#b45309]" />
            <span>Layanan & Fitur Ibadah Interaktif</span>
          </h3>
          <span className="text-[11px] text-amber-200/60 font-medium">Akses Cepat</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Nusuk Saudi Guide */}
          <button
            onClick={onOpenNusuk}
            className="p-3 sm:p-3.5 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-emerald-600/40 hover:bg-[#12222d] text-left transition shadow-sm group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-emerald-950/70 text-emerald-400 border border-emerald-600/30 flex items-center justify-center group-hover:scale-105 transition">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/30">
                Official KSA
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition">
                Aplikasi Nusuk
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                Izin Raudhah & Umrah
              </p>
            </div>
          </button>

          {/* Tawaf & Sai Counter */}
          <button
            onClick={onOpenCounter}
            className="p-3 sm:p-3.5 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 hover:bg-[#12222d] text-left transition shadow-sm group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/30 flex items-center justify-center group-hover:scale-105 transition">
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/30">
                7 Putaran
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">
                Tawaf & Sa'i Counter
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                Hitung getar & audio doa
              </p>
            </div>
          </button>

          {/* Denah & Peta Haram Lengkap */}
          <button
            onClick={onOpenMap}
            className="p-3 sm:p-3.5 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 hover:bg-[#12222d] text-left transition shadow-sm group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/30 flex items-center justify-center group-hover:scale-105 transition">
                <MapPin className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/30">
                Lengkap
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">
                Denah & Peta Ibadah
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                Mataf, Nabawi, Armuzna, Miqat
              </p>
            </div>
          </button>

          {/* Tasbih Digital */}
          <button
            onClick={onOpenTasbih}
            className="p-3 sm:p-3.5 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 hover:bg-[#12222d] text-left transition shadow-sm group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-[#182736] text-amber-300 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                Dzikir
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">
                Tasbih Digital
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                Zikir sunnah & getaran
              </p>
            </div>
          </button>

          {/* Tabungan Umrah BSI */}
          <button
            onClick={onOpenSavings}
            className="p-3 sm:p-3.5 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-emerald-600/40 hover:bg-[#12222d] text-left transition shadow-sm group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-emerald-950/70 text-emerald-400 border border-emerald-600/30 flex items-center justify-center group-hover:scale-105 transition">
                <Calculator className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/30">
                via BSI
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition">
                Tabungan Syariah
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                Mulai Rp 500rb bebas riba
              </p>
            </div>
          </button>

          {/* Jadwal Kajian Tasikmalaya */}
          <button
            onClick={onOpenKajian}
            className="p-3 sm:p-3.5 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 hover:bg-[#12222d] text-left transition shadow-sm group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-[#182736] text-amber-300 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition">
                <Calendar className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-amber-200">
                Tasik
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">
                Kajian & Manasik
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                Jadwal Asatidz daerah
              </p>
            </div>
          </button>

          {/* Checklist Perlengkapan */}
          <button
            onClick={onOpenChecklist}
            className="p-3 sm:p-3.5 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 hover:bg-[#12222d] text-left transition shadow-sm group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-[#182736] text-amber-300 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                Checklist
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">
                Perlengkapan Koper
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                Dokumen & kain ihram
              </p>
            </div>
          </button>

          {/* Cek Status Jamaah */}
          <button
            onClick={onOpenLookup}
            className="p-3 sm:p-3.5 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 hover:bg-[#12222d] text-left transition shadow-sm group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-[#182736] text-amber-300 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition">
                <UserCheck className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                Tracking
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">
                Cek Status Jamaah
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                Lacak visa, tiket & hotel
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 4. Featured Packages Section (Elegan & Syar'i) */}
      <section className="mx-3 sm:mx-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
              Program Keberangkatan Terdekat 2026
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              Paket Umrah & Haji Khusus Pilihan
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('packages')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
          >
            <span>Lihat Semua ({packages.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPackages.map((pkg) => {
            const price = Number(pkg.priceQuad || pkg.base_price || 0);

            return (
              <div
                key={pkg.id}
                className="bg-[#101b25] rounded-3xl border border-amber-900/30 hover:border-amber-500/40 overflow-hidden shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image flyer preview */}
                <div
                  onClick={() => onOpenPackageDetail(pkg)}
                  className="relative h-44 bg-slate-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={pkg.coverImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101b25] via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#b45309] text-white shadow-md">
                    {pkg.status || 'Unggulan'}
                  </span>
                  <span className="absolute bottom-2 right-2.5 text-[10px] text-amber-200 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-amber-900/40">
                    {pkg.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h4
                      onClick={() => onOpenPackageDetail(pkg)}
                      className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 hover:text-amber-300 cursor-pointer transition"
                    >
                      {pkg.title}
                    </h4>

                    <div className="space-y-1 text-[11px] text-slate-300 pt-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <Plane className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span className="truncate">{pkg.airline}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Hotel className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                        <span className="truncate">{pkg.hotelMakkah}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{pkg.departureDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block font-medium">Mulai Dari</span>
                      <span className="text-sm font-black text-amber-300 font-mono">
                        Rp {price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <button
                      onClick={() => onBookPackage(pkg)}
                      className="px-3.5 py-2 rounded-xl bg-[#b45309] hover:bg-[#c2410c] text-white font-bold text-xs shadow transition active:scale-95"
                    >
                      Booking
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Dewan Pembimbing Ibadah (Mentors Section) */}
      <section className="mx-3 sm:mx-6 p-5 sm:p-6 rounded-3xl bg-[#101b25] border border-amber-900/30 space-y-5 shadow-xl">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/70 text-amber-400 border border-amber-600/30 inline-block">
            Bimbingan Sunnah Dari Hati
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-white font-serif">
            Dewan Pembimbing Ibadah Umrah & Haji Khusus
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ibadah khusyuk dan mabrur didampingi langsung oleh para Asatidz dan Kiai bersertifikat resmi Kementerian Agama RI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mentors.map((m) => (
            <div
              key={m.id}
              className="bg-[#0b141d] border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center space-y-3 hover:border-amber-500/40 transition group"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-600/40 bg-slate-900 group-hover:scale-105 transition shadow-lg">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = m.fallbackPhoto || '/assets/logo-kanomas.png';
                  }}
                />
              </div>

              <div className="space-y-1 w-full">
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600/30 inline-block">
                  {m.cert}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mt-1">
                  {m.name}
                </h4>
                <p className="text-[10px] text-amber-400 font-semibold">{m.role}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 pt-1">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Legalitas & Kantor Layanan Tasikmalaya */}
      <section className="mx-3 sm:mx-6 p-5 sm:p-6 rounded-3xl bg-[#0f1922] border border-amber-900/30 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Legalitas Resmi Terakreditasi
            </span>
            <div className="text-xs text-slate-300 space-y-1 font-mono">
              <div>PPIU Kemenag RI: <strong className="text-white">U.310 / 2021</strong></div>
              <div>PIHK Kemenag RI: <strong className="text-white">9120313132406</strong></div>
              <div>Akreditasi Nasional: <strong className="text-emerald-400">A (KAN & Kemenag)</strong></div>
              <div>Anggota Asosiasi: <strong className="text-white">AMPHURI No. 165</strong></div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Kantor Pelayanan Tasikmalaya
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>PT Kanomas Artha Wisata</strong><br />
              Tasikmalaya, Jawa Barat, Indonesia.<br />
              Jam Layanan: Senin - Sabtu (08.30 - 17.00 WIB)
            </p>
          </div>

          <div className="space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Konsultasi & Pendaftaran
              </span>
              <p className="text-xs text-slate-300">
                Layanan informasi 24/7 bersama konsultan ibadah resmi Kanomas.
              </p>
            </div>

            <a
              href="https://wa.me/628112113363"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 rounded-xl bg-[#143023] hover:bg-[#1a4030] text-emerald-300 font-bold text-xs border border-emerald-500/40 shadow-sm transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp CS: 0811-2113-363</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
