import React, { useState } from 'react';
import { X, Send, CheckCircle, ShieldCheck, Phone, User, Calendar, MapPin, Tag } from 'lucide-react';
import { db } from '../services/db';

export default function RegistrationModal({ pkg, onClose, defaultMitraCode }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Tasikmalaya');
  const [paxCount, setPaxCount] = useState(1);
  const [mitraCode, setMitraCode] = useState(defaultMitraCode || '');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const packageName = pkg ? pkg.title : 'Konsultasi Paket Khusus';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    db.addCalonJamaah({
      name: name,
      phone: phone,
      city: city,
      targetPackage: packageName,
      targetDepartureMonth: pkg ? pkg.departureDate : 'Fleksibel',
      budgetEstimate: pkg ? `Rp ${(Number(pkg.priceQuad || 0) * paxCount).toLocaleString('id-ID')} (${paxCount} Orang)` : 'Konsultasi Budget',
      status: 'Baru',
      mitraReferralCode: mitraCode || '-',
      notes: notes || `Pemesanan untuk ${paxCount} jamaah.`
    });

    setSubmitted(true);
  };

  const getWaUrl = () => {
    const text = `*Form Pendaftaran & Booking Jamaah - Kanomas*\n\n` +
      `👤 *Nama:* ${name}\n` +
      `📱 *No. WhatsApp:* ${phone}\n` +
      `🏙 *Kota Asal:* ${city}\n` +
      `🕋 *Pilihan Paket:* ${packageName}\n` +
      `👥 *Jumlah Pax:* ${paxCount} Orang\n` +
      `🎟 *Kode Mitra Syiar:* ${mitraCode || 'Tidak Ada'}\n` +
      `📝 *Catatan:* ${notes || '-'}\n\n` +
      `_Bismillah, mohon konfirmasi ketersediaan seat dan jadwal manasik._`;
    return `https://wa.me/628112113363?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14222e] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1720] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-600/30 text-orange-400 border border-orange-500/30">
              <User className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-white">Form Booking & Konsultasi</h3>
              <p className="text-[11px] text-slate-400">Pendaftaran calon jamaah resmi PT Kanomas Tasikmalaya</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">Data Berhasil Tersimpan!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Data Anda telah masuk ke sistem database Kanomas Tasikmalaya. Silakan lanjutkan kirim rincian booking Anda langsung ke WhatsApp Admin resmi.
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row justify-center gap-2.5">
                <a
                  href={getWaUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Rincian ke WhatsApp CS</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {/* Selected package badge */}
              <div className="p-3 rounded-2xl bg-orange-950/40 border border-orange-500/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Paket yang Dipilih</span>
                  <h5 className="text-xs sm:text-sm font-bold text-amber-300">{packageName}</h5>
                </div>
                {pkg && (
                  <span className="text-xs font-mono font-bold text-white">
                    Rp {Number(pkg.priceQuad || 0).toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap Anda</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: H. Agus Supriatna"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">No. WhatsApp Aktif</label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kota / Domisili</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Tasikmalaya / Ciamis"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Jumlah Rencana Jamaah</label>
                  <select
                    value={paxCount}
                    onChange={(e) => setPaxCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value={1}>1 Orang (Sendiri)</option>
                    <option value={2}>2 Orang (Pasangan / Sekamar)</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang (1 Kamar Quad)</option>
                    <option value={5}>5+ Orang (Rombongan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kode Referral Mitra (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: KANOMAS-SYIAR-01"
                    value={mitraCode}
                    onChange={(e) => setMitraCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono uppercase focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Catatan Tambahan (Kebutuhan Khusus)</label>
                <textarea
                  rows="2"
                  placeholder="Misal: Perlu kursi roda untuk orang tua, kamar dekat lift, dll..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white resize-none focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pendaftaran</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0d1720] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span>Data terdaftar resmi di Siskopatuh Kemenag</span>
          <span className="text-emerald-400 font-semibold">100% Aman & Terpercaya</span>
        </div>
      </div>
    </div>
  );
}
