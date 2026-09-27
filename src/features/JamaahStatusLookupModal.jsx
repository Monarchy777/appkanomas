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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <UserCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Cek Status Keberangkatan Jamaah</h3>
              <p className="text-[11px] text-slate-500">Pengecekan visa, tiket penerbangan, hotel & koper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Masukkan Nomor NIK KTP, No. Paspor, atau Nomor WhatsApp
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Contoh: 081234567801 atau NIK"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-500 shadow-xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
              >
                <span>Cari</span>
              </button>
            </div>

            {/* Quick Sample Click Chips */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <span>Coba data demo:</span>
              <button
                type="button"
                onClick={() => handleQuickSample('081234567801')}
                className="text-amber-700 hover:underline font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
              >
                H. Bambang (081234567801)
              </button>
              <button
                type="button"
                onClick={() => handleQuickSample('081399887766')}
                className="text-amber-700 hover:underline font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
              >
                Dr. Rahmat (Haji Furoda)
              </button>
            </div>
          </form>

          {/* Search Results */}
          {searched && (
            result ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200 shadow-xs">
                {/* Jamaah Identity */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                      Status Jamaah Terverifikasi
                    </span>
                    <h4 className="text-base font-black text-slate-900">{result.name}</h4>
                    <span className="text-xs text-slate-500 font-mono">
                      No. Paspor: {result.passportNo} | NIK: {result.nik}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-300 self-start sm:self-center">
                    {result.paymentStatus}
                  </span>
                </div>

                {/* Package Info */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Program Paket</span>
                  <strong className="text-amber-700 text-sm block">{result.packageName}</strong>
                  <span className="text-slate-600 block">Jadwal Berangkat: <strong className="text-slate-900">{result.departureDate}</strong></span>
                  <span className="text-slate-600 block">Muthawif Pembimbing: <strong className="text-slate-900">{result.muthawif}</strong></span>
                </div>

                {/* Logistics & Document Status Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Status Visa Umrah/Haji</span>
                    </span>
                    <strong className="text-slate-900 block">{result.visaStatus}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-semibold">
                      <Plane className="w-3.5 h-3.5 text-blue-500" />
                      <span>Penerbangan / Flight</span>
                    </span>
                    <strong className="text-slate-900 block">{result.flightStatus}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-semibold">
                      <Hotel className="w-3.5 h-3.5 text-amber-500" />
                      <span>Kamar Hotel Makkah</span>
                    </span>
                    <strong className="text-slate-900 block">{result.hotelMakkahRoom}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-semibold">
                      <Luggage className="w-3.5 h-3.5 text-orange-500" />
                      <span>Distribusi Koper & Seragam</span>
                    </span>
                    <strong className={result.luggageDelivered ? 'text-emerald-700' : 'text-amber-700'}>
                      {result.luggageDelivered ? 'Sudah Diterima Jamaah' : 'Proses Pengiriman'}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Ada kendala dokumen?</span>
                  <a
                    href="https://wa.me/628112113363?text=Bismillah,%20saya%20ingin%20konfirmasi%20dokumen%20jamaah%20Kanomas"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-700 hover:underline font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hubungi Hotline Jamaah</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 animate-in fade-in">
                <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Data Jamaah Tidak Ditemukan</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Pastikan nomor telepon atau NIK yang Anda masukkan sesuai saat pendaftaran awal. Silakan hubungi Customer Service Kanomas Tasikmalaya untuk bantuan verifikasi data.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/628112113363"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-xs"
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
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Terintegrasi Database Internal Kanomas</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
