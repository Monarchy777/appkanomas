import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, Share2, Phone, X, Sparkles, Plus } from 'lucide-react';
import { db } from '../services/db';

export default function KajianTasikmalayaModal({ onClose, role }) {
  const [kajianList, setKajianList] = useState(db.getKajian());
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    pemateri: 'H. Irpan Hilmi, Lc., MA., MH.',
    role: 'Dewan Pembimbing Kanomas',
    location: 'Masjid Agung Kota Tasikmalaya',
    address: 'Kota Tasikmalaya',
    date: '',
    time: '08.30 - 11.30 WIB',
    topic: '',
    htm: 'Gratis (Terbuka untuk Umum)'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
    const added = db.addKajian(formData);
    setKajianList([added, ...kajianList]);
    setShowAddForm(false);
    setFormData({
      title: '',
      pemateri: 'H. Irpan Hilmi, Lc., MA., MH.',
      role: 'Dewan Pembimbing Kanomas',
      location: 'Masjid Agung Kota Tasikmalaya',
      address: 'Kota Tasikmalaya',
      date: '',
      time: '08.30 - 11.30 WIB',
      topic: '',
      htm: 'Gratis (Terbuka untuk Umum)'
    });
  };

  const shareKajian = (kajian) => {
    const text = `*Info Kajian & Manasik Tasikmalaya - Kanomas*\n\n📌 *${kajian.title}*\n👤 Pemateri: ${kajian.pemateri}\n🗓 Hari/Tgl: ${kajian.date}\n⏰ Waktu: ${kajian.time}\n📍 Lokasi: ${kajian.location} (${kajian.address})\n💡 HTM: ${kajian.htm}\n\nKonfirmasi kehadiran: https://wa.me/628112113363?text=Bismillah,%20saya%20ingin%20hadir%20di%20kajian%20${encodeURIComponent(kajian.title)}`;
    if (navigator.share) {
      navigator.share({ title: kajian.title, text: text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Info kajian berhasil disalin ke clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14222e] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1720] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-600/30 text-orange-400 border border-orange-500/30">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Jadwal Kajian & Manasik Tasikmalaya
              </h3>
              <p className="text-[11px] text-slate-400">
                Kajian rutin sunnah & bimbingan ibadah se-Priangan Timur
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

        {/* Admin Action Bar */}
        {role === 'admin' && (
          <div className="p-3 bg-[#111d27] border-b border-white/5 flex justify-between items-center">
            <span className="text-xs text-purple-300 font-bold">Admin: Kelola Jadwal Kajian</span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-600 text-xs font-bold text-white transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Tutup Form' : 'Tambah Jadwal Kajian'}</span>
            </button>
          </div>
        )}

        {/* Add Kajian Form */}
        {showAddForm && (
          <form onSubmit={handleCreate} className="p-4 bg-[#1a2d3d] border-b border-white/10 space-y-3">
            <h4 className="text-xs font-extrabold text-orange-400 uppercase">Tambah Jadwal Kajian Baru</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Judul Kajian</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Manasik Thawaf & Sa'i"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Pemateri / Asatidz</label>
                <input
                  type="text"
                  required
                  value={formData.pemateri}
                  onChange={(e) => setFormData({ ...formData, pemateri: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Lokasi Masjid / Gedung</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Hari & Tanggal</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ahad, 15 November 2026"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Waktu Pelaksanaan</label>
                <input
                  type="text"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1">Deskripsi / Pembahasan</label>
                <textarea
                  rows="2"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Ringkasan materi yang akan dibahas..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs"
              >
                Simpan Jadwal Kajian
              </button>
            </div>
          </form>
        )}

        {/* Kajian List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {kajianList.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Belum ada jadwal kajian baru yang tercatat.
            </div>
          ) : (
            kajianList.map((item) => (
              <div
                key={item.id}
                className="bg-[#111e29] border border-white/10 hover:border-orange-500/40 rounded-2xl p-4 transition-all duration-200 space-y-3 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {item.htm || 'Gratis'}
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-center">
                    <button
                      onClick={() => shareKajian(item)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                      title="Bagikan Info Kajian"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <a
                      href={`https://wa.me/628112113363?text=Bismillah,%20saya%20ingin%20konfirmasi%20kehadiran%20di%20kajian%20Kanomas:%20*${encodeURIComponent(item.title)}*`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>RSVP WA</span>
                    </a>
                  </div>
                </div>

                {/* Details Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <div>
                      <strong className="text-white">{item.pemateri}</strong>
                      <span className="text-[10px] text-slate-400 block">{item.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <strong className="text-white">{item.date}</strong>
                      <span className="text-[10px] text-slate-400 block">{item.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{item.location}</strong>
                      <span className="text-[11px] text-slate-400 block">{item.address}</span>
                    </div>
                  </div>
                </div>

                {/* Topic note */}
                {item.topic && (
                  <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-orange-300">Materi:</strong> {item.topic}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#0d1720] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Pusat Layanan Kajian: 0811-2113-363</span>
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
