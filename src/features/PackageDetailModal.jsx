import React from 'react';
import { X, Plane, Hotel, Calendar, Clock, CheckCircle, Phone, Sparkles, Tag, Users } from 'lucide-react';

export default function PackageDetailModal({ pkg, onClose, onBookNow }) {
  if (!pkg) return null;

  const isHaji = pkg.category === 'haji';
  const priceQuad = Number(pkg.priceQuad || pkg.base_price || 0);
  const priceTriple = Number(pkg.priceTriple || 0);
  const priceDouble = Number(pkg.priceDouble || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <Tag className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {pkg.status || 'Paket Resmi Kanomas'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1">
          {/* Cover Flyer Image */}
          {pkg.coverImage && (
            <div className="relative bg-slate-100 flex items-center justify-center max-h-72 overflow-hidden border-b border-slate-200">
              <img
                src={pkg.coverImage}
                alt={pkg.title}
                className="w-full h-auto max-h-72 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-amber-300 border border-white/10">
                Penerbangan: {pkg.airline}
              </div>
            </div>
          )}

          <div className="p-5 space-y-5">
            {/* Title & Key Specs */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {pkg.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pkg.description}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-500" />
                  <span>Durasi</span>
                </span>
                <span className="text-xs font-bold text-slate-900 block">{pkg.duration}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-600" />
                  <span>Keberangkatan</span>
                </span>
                <span className="text-xs font-bold text-slate-900 block break-words leading-snug">{pkg.departureDate}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <Plane className="w-3 h-3 text-blue-500" />
                  <span>Maskapai</span>
                </span>
                <span className="text-xs font-bold text-slate-900 block break-words leading-snug">{pkg.airline}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-500" />
                  <span>Sisa Seat</span>
                </span>
                <span className="text-xs font-bold text-amber-700 block font-mono">
                  {Math.max(0, (pkg.quotaTotal || 45) - (pkg.quotaFilled || 0))} Seat
                </span>
              </div>
            </div>

            {/* Hotels Information */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Fasilitas Hotel & Akomodasi
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <Hotel className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Hotel Makkah:</strong>
                    <span className="text-slate-600 block">{pkg.hotelMakkah}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Hotel className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Hotel Madinah:</strong>
                    <span className="text-slate-600 block">{pkg.hotelMadinah}</span>
                  </div>
                </div>

                {pkg.hotelTransit && pkg.hotelTransit !== '-' && (
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <Hotel className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Hotel Transit / City Tour:</strong>
                      <span className="text-slate-600 block">{pkg.hotelTransit}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Pilihan Harga Kamar (Per Jamaah)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-0.5">
                  <span className="text-[10px] text-amber-800 uppercase font-bold block">Quad (Sekamar Ber-4)</span>
                  <span className="text-base font-black text-amber-700 font-mono">
                    Rp {priceQuad.toLocaleString('id-ID')}
                  </span>
                </div>

                {priceTriple > 0 && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Triple (Sekamar Ber-3)</span>
                    <span className="text-base font-black text-slate-900 font-mono">
                      Rp {priceTriple.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}

                {priceDouble > 0 && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Double (Sekamar Ber-2)</span>
                    <span className="text-base font-black text-slate-900 font-mono">
                      Rp {priceDouble.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Inclusions */}
            {pkg.features && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Fasilitas Sudah Termasuk
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Investasi Mulai</span>
            <span className="text-lg font-black text-amber-700 font-mono">
              Rp {priceQuad.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/628112113363?text=Bismillah,%20saya%20tertarik%20konsultasi%20paket%20Kanomas:%20*${encodeURIComponent(pkg.title)}*`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition border border-slate-300"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Tanya CS</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <span>Booking Paket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
