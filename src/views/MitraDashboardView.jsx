import React, { useState } from 'react';
import {
  Award,
  Users,
  DollarSign,
  Share2,
  Copy,
  CheckCircle,
  Plus,
  Send,
  Phone,
  FileText,
  Download,
  Clock,
  Sparkles
} from 'lucide-react';
import { db } from '../services/db';

export default function MitraDashboardView({ onOpenPackageDetail }) {
  const [mitraList, setMitraList] = useState(db.getMitra());
  const [activeMitraIndex, setActiveMitraIndex] = useState(0);
  const currentMitra = mitraList[activeMitraIndex] || mitraList[0];

  const [copiedLink, setCopiedLink] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    city: 'Tasikmalaya',
    targetPackage: 'Paket Umroh Bintang 4 Garuda Indonesia',
    notes: ''
  });
  const [leadSaved, setLeadSaved] = useState(false);

  // Filter calon jamaah and jamaah linked to this mitra
  const calonJamaahList = db.getCalonJamaah().filter(c => c.mitraReferralCode === currentMitra.code);
  const jamaahList = db.getJamaah().filter(j => j.mitraCode === currentMitra.code);
  const packages = db.getPackages();

  const handleCopyLink = () => {
    const link = `https://kanomastasikmalaya.com/?ref=${currentMitra.code}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWa = () => {
    const text = `*Assalamu'alaikum Warahmatullahi Wabarakatuh*\n\n` +
      `Bagi Bapak/Ibu dan sahabat yang berniat menunaikan ibadah *Umrah & Haji Khusus Resmi Kemenag RI*, mari wujudkan bersama *PT Kanomas Artha Wisata* (PPIU No. U.310 / 2021):\n\n` +
      `✨ *Fasilitas Unggulan:*\n` +
      `• Hotel Bintang 4 & 5 Pelataran Dekat Ka'bah (Tanpa Jalan Jauh)\n` +
      `• Tiket Pesawat Direct Garuda Indonesia & Oman Air PP\n` +
      `• Bimbingan Sunnah Khusyuk bersama Ulama & Asatidz Bersertifikat\n` +
      `• Program Tabungan Umrah Syariah via BSI bebas biaya admin\n\n` +
      `Daftar & konsultasi langsung melalui tautan resmi Mitra Syiar:\n` +
      `👉 https://kanomastasikmalaya.com/?ref=${currentMitra.code}\n\n` +
      `Atau hubungi saya langsung di nomor ini untuk panduan pendaftaran. _Semoga Allah mudahkan langkah menuju Baitullah._`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    db.addCalonJamaah({
      ...leadForm,
      budgetEstimate: 'Konsultasi Rujukan Mitra',
      targetDepartureMonth: 'Musim 2026',
      status: 'Baru',
      mitraReferralCode: currentMitra.code
    });

    setLeadSaved(true);
    setTimeout(() => {
      setLeadSaved(false);
      setShowAddLead(false);
      setLeadForm({
        name: '',
        phone: '',
        city: 'Tasikmalaya',
        targetPackage: 'Paket Umroh Bintang 4 Garuda Indonesia',
        notes: ''
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-24 mx-3 sm:mx-6 mt-3">
      {/* Header Banner & Switch Mitra Profile Demo */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d1e30] via-[#132840] to-[#0a1622] border border-blue-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 inline-block">
              Portal Mitra Syiar Kanomas (Afiliasi)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {currentMitra.name}
            </h2>
            <p className="text-xs text-slate-300">
              Kode Syiar: <strong className="text-amber-300 font-mono">{currentMitra.code}</strong> | Wilayah: {currentMitra.city}
            </p>
          </div>

          {/* Switch Mitra Profile */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Pilih Mitra:</span>
            <select
              value={activeMitraIndex}
              onChange={(e) => setActiveMitraIndex(Number(e.target.value))}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
            >
              {mitraList.map((m, idx) => (
                <option key={m.id} value={idx}>
                  {m.name} ({m.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Commission KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Jamaah Dirujuk</span>
            <span className="text-2xl font-black text-white font-mono block">
              {currentMitra.totalJamaah} Orang
            </span>
            <span className="text-[10px] text-emerald-400">Terdaftar resmi</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Komisi Syiar</span>
            <span className="text-2xl font-black text-amber-300 font-mono block">
              Rp {(currentMitra.totalCommission || 0).toLocaleString('id-ID')}
            </span>
            <span className="text-[10px] text-slate-400">Rp 1 Juta / pax</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Komisi Sudah Dicairkan</span>
            <span className="text-2xl font-black text-emerald-400 font-mono block">
              Rp {(currentMitra.commissionPaid || 0).toLocaleString('id-ID')}
            </span>
            <span className="text-[10px] text-slate-400">Masuk rekening</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Komisi Pending</span>
            <span className="text-2xl font-black text-orange-400 font-mono block">
              Rp {(currentMitra.commissionPending || 0).toLocaleString('id-ID')}
            </span>
            <span className="text-[10px] text-orange-300">Siap dicairkan</span>
          </div>
        </div>
      </div>

      {/* Referral Link & Broadcast Toolkit */}
      <div className="p-5 rounded-3xl bg-[#14222e] border border-white/10 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-blue-400 tracking-wider">
              Tautan Promosi Unik
            </span>
            <h3 className="text-sm sm:text-base font-black text-white">
              Bagikan Link Referral Anda ke Jamaah / Majelis Ta'lim
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            >
              {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
            </button>

            <button
              onClick={handleShareWa}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-md transition flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Broadcast WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="p-3 bg-black/30 rounded-2xl border border-white/5 flex items-center justify-between text-xs text-slate-300 font-mono overflow-x-auto">
          <span>https://kanomastasikmalaya.com/?ref={currentMitra.code}</span>
          <span className="text-[10px] text-blue-400 font-sans ml-2">ID: {currentMitra.code}</span>
        </div>
      </div>

      {/* Action: Daftarkan Calon Jamaah Baru via Mitra */}
      <div className="p-5 rounded-3xl bg-[#101b25] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
              Formulir Input Prospek
            </span>
            <h3 className="text-sm sm:text-base font-black text-white">
              Daftarkan Calon Jamaah Rujukan Anda
            </h3>
          </div>

          <button
            onClick={() => setShowAddLead(!showAddLead)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddLead ? 'Tutup Form' : 'Input Calon Jamaah'}</span>
          </button>
        </div>

        {showAddLead && (
          <form onSubmit={handleAddLead} className="p-4 bg-[#14222e] rounded-2xl border border-white/10 space-y-3 animate-in fade-in duration-200">
            {leadSaved ? (
              <div className="p-4 text-center text-emerald-400 font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Calon Jamaah Berhasil Didaftarkan ke Database Kanomas!</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">Nama Calon Jamaah</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ibu Hj. Rosita"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">No. WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 08123456789"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Kota Asal / Domisili</label>
                    <input
                      type="text"
                      value={leadForm.city}
                      onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Pilihan Paket Diminati</label>
                    <select
                      value={leadForm.targetPackage}
                      onChange={(e) => setLeadForm({ ...leadForm, targetPackage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    >
                      {packages.map(p => (
                        <option key={p.id} value={p.title}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1">Catatan Tambahan</label>
                    <textarea
                      rows="2"
                      placeholder="Kebutuhan khusus atau rencana tanggal..."
                      value={leadForm.notes}
                      onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddLead(false)}
                    className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                  >
                    Simpan ke Database Mitra
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {/* List of Leads referred by this Mitra */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Daftar Calon Jamaah Terdaftar via {currentMitra.name} ({calonJamaahList.length + jamaahList.length})
          </span>

          {calonJamaahList.length === 0 && jamaahList.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-[#14222e] rounded-2xl border border-white/5">
              Belum ada jamaah yang terdaftar melalui kode {currentMitra.code}. Bagikan tautan promosi Anda ke WhatsApp sekarang!
            </div>
          ) : (
            <div className="space-y-2">
              {/* Confirmed Jamaah */}
              {jamaahList.map((j) => (
                <div
                  key={j.id}
                  className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-white">{j.name}</strong>
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500 text-slate-950">
                        {j.paymentStatus}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 block">{j.packageName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-amber-300 block">Komisi: Rp 1.000.000</span>
                    <span className="text-[10px] text-emerald-400">Keberangkatan: {j.departureDate}</span>
                  </div>
                </div>
              ))}

              {/* Prospect Leads */}
              {calonJamaahList.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-2xl bg-[#14222e] border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-white">{c.name}</strong>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-500/20 text-blue-300">
                        {c.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block">{c.targetPackage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400"
                      title="Follow Up via WA"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Promotional Flyers Gallery for Marketing */}
      <div className="p-5 rounded-3xl bg-[#14222e] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
              Materi Promosi Resmi
            </span>
            <h3 className="text-sm sm:text-base font-black text-white">
              Flyer & Brosur Kanomas untuk Promosi
            </h3>
          </div>
          <span className="text-xs text-slate-400">Resolusi Tinggi</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onOpenPackageDetail(pkg)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-orange-500 transition space-y-2 p-2"
            >
              <div className="h-36 overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
                <img
                  src={pkg.coverImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <h5 className="text-[11px] font-bold text-white line-clamp-2 px-1">
                {pkg.title}
              </h5>
              <div className="px-1 flex justify-between items-center text-[10px] text-slate-400">
                <span>Lihat Flyer</span>
                <Share2 className="w-3 h-3 text-orange-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
