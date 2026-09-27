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
    <div className="space-y-6 pb-24 mx-3 sm:mx-6 mt-3 max-w-5xl mx-auto">
      {/* Header Banner (Putih Bersih dengan Aksen Kanomas) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            Katalog Resmi Musim 1447H / 2026
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Total {packages.length} Program Tersedia
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans leading-snug">
          Pilihan Paket Umrah & Haji Khusus Kanomas
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
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
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-xs"
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
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCategory === cat.id ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Packages Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <Tag className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">Tidak Ada Paket Ditemukan</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Silakan ubah kata kunci pencarian atau hubungi Customer Service untuk request rombongan khusus.
          </p>
          <button
            onClick={() => {
              setActiveCategory('semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-xs"
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
                className="bg-white rounded-3xl border border-slate-200 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Flyer Cover Image */}
                  <div
                    onClick={() => onOpenPackageDetail(pkg)}
                    className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={pkg.coverImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                      {pkg.status || 'Tersedia'}
                    </span>

                    <span className="absolute bottom-3 right-3 text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-xl font-mono">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    <h3
                      onClick={() => onOpenPackageDetail(pkg)}
                      className="text-sm sm:text-base font-bold text-slate-900 leading-snug hover:text-amber-600 cursor-pointer transition break-words"
                    >
                      {pkg.title}
                    </h3>

                    {/* Specifications */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-sky-500 flex-shrink-0" />
                        <span className="font-medium break-words">{pkg.airline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="font-medium break-words">{pkg.hotelMakkah}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span className="font-medium">{pkg.departureDate}</span>
                      </div>
                    </div>

                    {/* Quota Seat Indicator */}
                    {!isTabungan && (
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                          <span>Sisa Kuota Seat</span>
                          <span className="font-bold text-amber-700">{remainingSeat} dari {quotaTotal} Seat</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                            style={{ width: `${Math.round((quotaFilled / quotaTotal) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 uppercase block font-medium">
                        {isTabungan ? 'Setoran Awal Ringan' : 'Harga Quad Mulai'}
                      </span>
                      <span className="text-base sm:text-lg font-black text-amber-700 font-mono block whitespace-nowrap">
                        Rp {priceQuad.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => onOpenPackageDetail(pkg)}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition border border-slate-200"
                        title="Lihat Detail & Flyer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {isTabungan ? (
                        <button
                          onClick={onOpenSavings}
                          className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs shadow-xs transition"
                        >
                          Simulasi BSI
                        </button>
                      ) : (
                        <button
                          onClick={() => onBookPackage(pkg)}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md transition active:scale-95"
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
