import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Users, CheckCircle, ArrowRight, X, Phone, Building2 } from 'lucide-react';
import { db } from '../services/db';

export default function SavingsCalculatorModal({ onClose }) {
  const [people, setPeople] = useState(1);
  const [baseCost, setBaseCost] = useState(33900000); // Default Bintang 4
  const [months, setMonths] = useState(12);

  // Form registration state
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nik, setNik] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalTarget = people * baseCost;
  const monthlyDeposit = Math.round(totalTarget / months);
  const monthlyPerPerson = Math.round(baseCost / months);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    db.addTabungan({
      jamaahName: name,
      phone: phone,
      nik: nik || '3278' + Math.floor(Math.random() * 1000000000000),
      accountNumber: '7' + Math.floor(100000000 + Math.random() * 900000000) + ' (BSI)',
      targetAmount: totalTarget,
      monthlyTarget: monthlyDeposit,
      initialDeposit: 500000,
      targetDate: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    db.addCalonJamaah({
      name: name,
      phone: phone,
      city: 'Tasikmalaya',
      targetPackage: `Tabungan Umroh (${months} Bulan - Target Rp ${totalTarget.toLocaleString('id-ID')})`,
      targetDepartureMonth: `${months} Bulan ke Depan`,
      budgetEstimate: `Rp ${monthlyDeposit.toLocaleString('id-ID')} / bulan`,
      status: 'Baru',
      notes: `Pendaftaran Tabungan Umrah Syariah via BSI untuk ${people} jamaah.`
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#14222e] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1720] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30">
              <Calculator className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Simulasi Tabungan Umroh BSI
              </h3>
              <p className="text-[11px] text-slate-400">
                PT Kanomas Artha Wisata bekerjasama dengan Bank Syariah Indonesia
              </p>
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
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">Pendaftaran Tabungan Berhasil!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Jazakallahu khair, data Anda telah tersimpan di Database Kanomas. Customer service kami dan pihak BSI Tasikmalaya akan segera menghubungi nomor WhatsApp <strong>{phone}</strong> untuk panduan pembukaan rekening syariah.
              </p>
              <div className="pt-3 flex justify-center gap-3">
                <a
                  href={`https://wa.me/628112113363?text=Bismillah,%20saya%20sudah%20mengisi%20pembukaan%20Tabungan%20Umroh%20BSI%20atas%20nama%20${encodeURIComponent(name)}%20dengan%20rencana%20menabung%20Rp%20${monthlyDeposit.toLocaleString('id-ID')}/bulan.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Konfirmasi via WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Option 1: Pilih Paket Umrah Target */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  1. Pilih Estimasi Paket Umrah yang Diinginkan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { label: 'Promo Hemat (10 Hari)', price: 27900000 },
                    { label: 'Bintang 4 Garuda (9 Hari)', price: 33900000 },
                    { label: 'Shafa Pelataran Bintang 5', price: 35900000 },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBaseCost(p.price)}
                      className={`p-3 rounded-2xl border text-left transition ${
                        baseCost === p.price
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md'
                          : 'bg-[#101b25] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">{p.label}</span>
                      <span className="text-xs font-mono font-black text-amber-300">
                        Rp {p.price.toLocaleString('id-ID')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Jumlah Jamaah & Waktu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span>2. Jumlah Jamaah: <strong className="text-white font-mono">{people} Orang</strong></span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 Jamaah</span>
                    <span>2 Jamaah</span>
                    <span>3 Jamaah</span>
                    <span>4 Jamaah</span>
                    <span>5 Jamaah</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>3. Target Menabung: <strong className="text-white font-mono">{months} Bulan</strong></span>
                  </label>
                  <div className="flex gap-1.5">
                    {[6, 12, 18, 24, 36].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition font-mono ${
                          months === m
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-[#101b25] text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {m} Bln
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculation Result Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#102419] to-[#0c1912] border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>Rekomendasi Setoran via BSI</span>
                  </span>
                  <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-600/40">
                    Bebas Biaya Admin
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-emerald-500/20">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                      Setoran Per Bulan (Total)
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                      Rp {monthlyDeposit.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-emerald-300 block mt-0.5">
                      (Rp {monthlyPerPerson.toLocaleString('id-ID')} / org)
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                      Total Target Tabungan
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-white font-mono">
                      Rp {totalTarget.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Untuk {people} Pax ({months} Bulan)
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Register Toggle */}
              {!showRegisterForm ? (
                <button
                  onClick={() => setShowRegisterForm(true)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Daftar / Buka Tabungan Umrah BSI Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="p-4 bg-[#101b25] rounded-2xl border border-white/10 space-y-3 animate-in fade-in duration-200">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase">
                    Form Pendaftaran Tabungan Umrah
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1">Nama Lengkap (Sesuai KTP)</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Hj. Siti Fatimah"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Nomor WhatsApp Aktif</label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Nomor Induk Kependudukan (NIK - Opsional)</label>
                      <input
                        type="text"
                        placeholder="16 Digit NIK KTP"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRegisterForm(false)}
                      className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                    >
                      Kirim & Simpan ke Rekening BSI
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0d1720] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Setoran awal ringan mulai Rp 500.000</span>
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
