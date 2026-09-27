import React, { useState } from 'react';
import { Plane, Hotel, Calendar, Clock, Tag, Search, Filter, Users, CheckCircle2, ChevronRight, Phone } from 'lucide-react';

export default function PackagesView({ packages, onOpenPackageDetail, onBookPackage, onOpenSavings }) {
  const [activeCategory, setActiveCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'semua', label: 'Semua Program' },
    { id: 'reguler', label: 'Umrah Reguler & Hemat' },
    { id: 'plus', label: 'Umrah Plus Tour' },
    { id: 'haji', label: 'Haji Khusus / Furoda' },
    { id: 'tabungan', label: 'Program Tabungan' }
  ];

  const filtered = packages.filter((pkg) => {
    const matchesCat = activeCategory === 'semua'
      ? true
      : activeCategory === 'haji'
      ? pkg.category === 'haji'
      : activeCategory === 'plus'
      ? pkg.category === 'plus'
      : activeCategory === 'tabungan'
      ? pkg.category === 'tabungan'
      : pkg.category === 'reguler' || !pkg.category;

    const matchesSearch = searchQuery.trim() === ''
      ? true
      : (pkg.title && pkg.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (pkg.airline && pkg.airline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (pkg.hotelMakkah && pkg.hotelMakkah.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 mx-3 sm:mx-6 mt-3">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#101b25] border border-amber-900/30 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/70 text-amber-400 border border-amber-600/30">
            Katalog Resmi Musim 1447H / 2026
          </span>
          <span className="text-xs text-slate-300 font-mono">
            Total {packages.length} Program Tersedia
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white font-serif leading-snug">
          Pilihan Paket Umrah & Haji Khusus Kanomas
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Semua program bergaransi kepastian jadwal penerbangan, hotel pelataran dekat Ka'bah, serta bimbingan manasik intensif sesuai Sunnah Rasulullah ﷺ.
        </p>

        {/* Search bar */}
        <div className="pt-2 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari paket, maskapai (Garuda/Oman), hotel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#0b141d] border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="overflow-x-auto flex gap-2 no-scrollbar pb-1">
        {categories.map((cat) => {
          const count = cat.id === 'semua'
            ? packages.length
            : packages.filter(p => p.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'bg-[#101b25] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCategory === cat.id ? 'bg-black/30 text-white' : 'bg-white/5 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Packages Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#101b25] border border-amber-900/30 space-y-3">
          <Tag className="w-10 h-10 text-slate-500 mx-auto" />
          <h4 className="text-sm font-bold text-white">Tidak Ada Paket Ditemukan</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Silakan ubah kata kunci pencarian atau hubungi Customer Service untuk request rombongan khusus.
          </p>
          <button
            onClick={() => {
              setActiveCategory('semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#b45309] text-white text-xs font-bold"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((pkg) => {
            const priceQuad = Number(pkg.priceQuad || pkg.base_price || 0);
            const quotaTotal = pkg.quotaTotal || 45;
            const quotaFilled = pkg.quotaFilled || 0;
            const remainingSeat = Math.max(0, quotaTotal - quotaFilled);
            const isTabungan = pkg.category === 'tabungan';

            return (
              <div
                key={pkg.id}
                className="bg-[#101b25] rounded-3xl border border-amber-900/30 hover:border-amber-500/40 overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Flyer Cover Image */}
                  <div
                    onClick={() => onOpenPackageDetail(pkg)}
                    className="relative h-48 sm:h-52 bg-slate-950 overflow-hidden cursor-pointer"
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
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#b45309] text-white shadow-md">
                      {pkg.status || 'Tersedia'}
                    </span>

                    <span className="absolute bottom-3 right-3 text-[11px] font-bold text-amber-200 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-amber-900/40 font-mono">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    <h3
                      onClick={() => onOpenPackageDetail(pkg)}
                      className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2 hover:text-amber-300 cursor-pointer transition"
                    >
                      {pkg.title}
                    </h3>

                    {/* Specifications */}
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="truncate">{pkg.airline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-amber-300 flex-shrink-0" />
                        <span className="truncate">{pkg.hotelMakkah}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{pkg.departureDate}</span>
                      </div>
                    </div>

                    {/* Quota Seat Indicator */}
                    {!isTabungan && (
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                          <span>Sisa Kuota Seat</span>
                          <span className="font-bold text-amber-300">{remainingSeat} dari {quotaTotal} Seat</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400"
                            style={{ width: `${Math.round((quotaFilled / quotaTotal) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-medium">
                        {isTabungan ? 'Setoran Awal Ringan' : 'Harga Quad Mulai'}
                      </span>
                      <span className="text-base sm:text-lg font-black text-amber-300 font-mono">
                        Rp {priceQuad.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenPackageDetail(pkg)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
                        title="Lihat Detail & Flyer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {isTabungan ? (
                        <button
                          onClick={onOpenSavings}
                          className="px-4 py-2.5 rounded-xl bg-[#133023] hover:bg-[#1a4030] text-emerald-300 border border-emerald-500/40 font-bold text-xs shadow-md transition"
                        >
                          Simulasi BSI
                        </button>
                      ) : (
                        <button
                          onClick={() => onBookPackage(pkg)}
                          className="px-4 py-2.5 rounded-xl bg-[#b45309] hover:bg-[#c2410c] text-white font-bold text-xs shadow-md transition active:scale-95"
                        >
                          Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
