import React, { useState } from 'react';
import { Search, UserCheck, CheckCircle2, Clock, Plane, Hotel, Luggage, ShieldAlert, X, Phone } from 'lucide-react';
import { db } from '../services/db';

export default function JamaahStatusLookupModal({ onClose }) {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!keyword.trim()) return;

    const term = keyword.trim().toLowerCase();
    const jamaahList = db.getJamaah();
    const found = jamaahList.find(j => 
      (j.nik && j.nik.toLowerCase().includes(term)) ||
      (j.phone && j.phone.replace(/[^0-9]/g, '').includes(term.replace(/[^0-9]/g, ''))) ||
      (j.name && j.name.toLowerCase().includes(term)) ||
      (j.passportNo && j.passportNo.toLowerCase().includes(term))
    );

    setResult(found || null);
    setSearched(true);
  };

  const handleQuickSample = (sampleKeyword) => {
    setKeyword(sampleKeyword);
    const jamaahList = db.getJamaah();
    const found = jamaahList.find(j => j.phone.includes(sampleKeyword) || j.nik.includes(sampleKeyword));
    setResult(found || null);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#14222e] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1720] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30">
              <UserCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-white">Cek Status Keberangkatan Jamaah</h3>
              <p className="text-[11px] text-slate-400">Pengecekan visa, tiket penerbangan, hotel & koper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Masukkan Nomor NIK KTP, No. Paspor, atau Nomor WhatsApp
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Contoh: 081234567801 atau NIK"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
              >
                <span>Cari</span>
              </button>
            </div>

            {/* Quick Sample Click Chips */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <span>Coba data demo:</span>
              <button
                type="button"
                onClick={() => handleQuickSample('081234567801')}
                className="text-orange-400 hover:underline font-mono bg-white/5 px-2 py-0.5 rounded"
              >
                H. Bambang (081234567801)
              </button>
              <button
                type="button"
                onClick={() => handleQuickSample('081399887766')}
                className="text-orange-400 hover:underline font-mono bg-white/5 px-2 py-0.5 rounded"
              >
                Dr. Rahmat (Haji Furoda)
              </button>
            </div>
          </form>

          {/* Search Results */}
          {searched && (
            result ? (
              <div className="p-4 rounded-2xl bg-[#111e29] border border-emerald-500/40 space-y-4 animate-in fade-in duration-200">
                {/* Jamaah Identity */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Status Jamaah Terverifikasi
                    </span>
                    <h4 className="text-base font-black text-white">{result.name}</h4>
                    <span className="text-xs text-slate-400 font-mono">
                      No. Paspor: {result.passportNo} | NIK: {result.nik}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 self-start sm:self-center">
                    {result.paymentStatus}
                  </span>
                </div>

                {/* Package Info */}
                <div className="p-3 bg-black/25 rounded-xl border border-white/5 text-xs space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Program Paket</span>
                  <strong className="text-amber-300 text-sm block">{result.packageName}</strong>
                  <span className="text-slate-300 block">Jadwal Berangkat: <strong>{result.departureDate}</strong></span>
                  <span className="text-slate-400 block">Muthawif Pembimbing: <strong className="text-white">{result.muthawif}</strong></span>
                </div>

                {/* Logistics & Document Status Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Status Visa Umrah/Haji</span>
                    </span>
                    <strong className="text-white block">{result.visaStatus}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                      <Plane className="w-3.5 h-3.5 text-blue-400" />
                      <span>Penerbangan / Flight</span>
                    </span>
                    <strong className="text-white block">{result.flightStatus}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                      <Hotel className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kamar Hotel Makkah</span>
                    </span>
                    <strong className="text-white block">{result.hotelMakkahRoom}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                      <Luggage className="w-3.5 h-3.5 text-orange-400" />
                      <span>Distribusi Koper & Seragam</span>
                    </span>
                    <strong className={result.luggageDelivered ? 'text-emerald-400' : 'text-amber-400'}>
                      {result.luggageDelivered ? 'Sudah Diterima Jamaah' : 'Proses Pengiriman'}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Ada kendala dokumen?</span>
                  <a
                    href="https://wa.me/628112113363?text=Bismillah,%20saya%20ingin%20konfirmasi%20dokumen%20jamaah%20Kanomas"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hubungi Hotline Jamaah</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center space-y-2 animate-in fade-in">
                <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Data Jamaah Tidak Ditemukan</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Pastikan nomor telepon atau NIK yang Anda masukkan sesuai saat pendaftaran awal. Silakan hubungi Customer Service Kanomas Tasikmalaya untuk bantuan verifikasi data.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/628112113363"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Tanya CS via WhatsApp</span>
                  </a>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0d1720] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Terintegrasi Database Internal Kanomas</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
