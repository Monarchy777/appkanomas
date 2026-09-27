import React, { useState } from 'react';
import { Printer, Download, FileText, CheckCircle, X, User, Building2, Calendar, ShieldCheck, RefreshCw } from 'lucide-react';
import { db } from '../services/db';
import { COMPANY_PROFILE } from '../services/initialSeed';

export default function DocumentPrintModal({ onClose, defaultDocType = 'paspor' }) {
  const [docType, setDocType] = useState(defaultDocType); // 'paspor' | 'kwitansi'
  
  // Database references
  const jamaahList = db.getJamaah();
  const calonList = db.getCalonJamaah();

  // Form states for Surat Rekomendasi Paspor
  const [pasporData, setPasporData] = useState({
    nomorSurat: '089/KANOMAS-TSM/REK-PASPOR/IX/2026',
    tanggalSurat: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    tujuanKanim: 'Kepala Kantor Imigrasi Kelas II Non TPI Tasikmalaya',
    namaJamaah: jamaahList[0]?.name || 'H. Bambang Sulistyo',
    nik: jamaahList[0]?.nik || '3278012005780001',
    tempatTglLahir: 'Tasikmalaya, 15 Mei 1978',
    alamat: 'Jl. KH. Z. Mustofa No. 124, Cihideung, Kota Tasikmalaya',
    namaPaket: jamaahList[0]?.packageName || 'Paket Umroh Bintang 4 Garuda Indonesia',
    tanggalBerangkat: jamaahList[0]?.departureDate || '05 Oktober 2026',
    pejabatPenandatangan: 'H. Asep Mulyana',
    jabatan: 'Pimpinan Cabang Tasikmalaya'
  });

  // Form states for Kwitansi Pembayaran
  const [kwitansiData, setKwitansiData] = useState({
    nomorKwitansi: 'KW/KANOMAS/2026/09/018',
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    terimaDari: jamaahList[0]?.name || 'H. Bambang Sulistyo',
    jumlahNominal: 33900000,
    terbilang: 'Tiga Puluh Tiga Juta Sembilan Ratus Ribu Rupiah',
    untukPembayaran: 'Pelunasan Biaya Perjalanan Ibadah Umrah Bintang 4 Garuda Indonesia (Quad)',
    statusBayar: 'LUNAS',
    metodeBayar: 'Transfer Rekening BSI (No. 7128839011 a.n PT Kanomas Artha Wisata)',
    kasir: 'Admin Keuangan Kanomas'
  });

  const handleSelectJamaah = (j) => {
    setPasporData({
      ...pasporData,
      namaJamaah: j.name,
      nik: j.nik,
      namaPaket: j.packageName,
      tanggalBerangkat: j.departureDate
    });
    setKwitansiData({
      ...kwitansiData,
      terimaDari: j.name,
      jumlahNominal: j.totalPaid || 15000000,
      terbilang: j.totalPaid === 33900000 ? 'Tiga Puluh Tiga Juta Sembilan Ratus Ribu Rupiah' : 'Lima Belas Juta Rupiah',
      untukPembayaran: `Pembayaran ${j.paymentStatus} Program ${j.packageName}`,
      statusBayar: j.paymentStatus.toUpperCase()
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Controls Header (Hidden on Print) */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Printer className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Cetak Berkas Resmi & Kwitansi</h3>
              <p className="text-[11px] text-slate-500">Format standar Kemenag RI siap cetak & simpan PDF (A4)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-Header Document Type Tabs (Hidden on Print) */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <div className="flex gap-2">
            <button
              onClick={() => setDocType('paspor')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                docType === 'paspor'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Surat Rekomendasi Paspor Kemenag
            </button>
            <button
              onClick={() => setDocType('kwitansi')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                docType === 'kwitansi'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Kwitansi Pembayaran / Tabungan BSI
            </button>
          </div>

          {/* Quick Jamaah Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Pilih Data Jamaah:</span>
            <select
              onChange={(e) => {
                const found = jamaahList.find(j => j.id === e.target.value);
                if (found) handleSelectJamaah(found);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs shadow-xs"
            >
              {jamaahList.map(j => (
                <option key={j.id} value={j.id}>{j.name} ({j.packageName.slice(0, 20)}...)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Printable Document Sheet Container */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 bg-slate-200/70 flex justify-center">
          {/* Printable White Sheet (A4 Proportion) */}
          <div className="print-only-container w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-xl border border-slate-200 font-sans flex flex-col justify-between">
            {/* DOCUMENT 1: SURAT REKOMENDASI PASPOR */}
            {docType === 'paspor' && (
              <div className="space-y-6 text-sm">
                {/* Official Letterhead (Kop Surat) */}
                <div className="flex items-center gap-5 border-b-4 border-double border-slate-800 pb-4">
                  <img
                    src="/assets/logo-kanomas.png"
                    alt="Logo Kanomas"
                    className="w-20 h-20 object-contain"
                  />
                  <div className="space-y-0.5 text-center flex-1">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
                      PT KANOMAS ARTHA WISATA
                    </h2>
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                      PENYELENGGARA PERJALANAN IBADAH UMRAH (PPIU) & HAJI KHUSUS (PIHK)
                    </p>
                    <p className="text-[11px] text-slate-700 font-medium">
                      SK Kemenag RI PPIU No. <strong>U.310 Tahun 2021</strong> | PIHK No. <strong>9120313132406</strong>
                    </p>
                    <p className="text-[10px] text-slate-600">
                      Kantor Layanan: Tasikmalaya, Jawa Barat, Indonesia | WhatsApp CS: 0811-2113-363 | Web: www.kanomastasikmalaya.com
                    </p>
                  </div>
                </div>

                {/* Letter Metadata */}
                <div className="flex justify-between items-start text-xs pt-2">
                  <div className="space-y-1">
                    <div>Nomor : <strong>{pasporData.nomorSurat}</strong></div>
                    <div>Lampiran : <strong>1 (Satu) Berkas</strong></div>
                    <div>Perihal : <strong>Rekomendasi Penerbitan Paspor Ibadah Umrah / Haji</strong></div>
                  </div>
                  <div>
                    <span>Tasikmalaya, {pasporData.tanggalSurat}</span>
                  </div>
                </div>

                {/* Recipient */}
                <div className="text-xs space-y-1 pt-2">
                  <div>Kepada Yth.</div>
                  <div className="font-bold">{pasporData.tujuanKanim}</div>
                  <div>Di Tempat</div>
                </div>

                {/* Body Content */}
                <div className="space-y-3 text-xs leading-relaxed text-justify">
                  <p>
                    <em>Assalamu’alaikum Warahmatullahi Wabarakatuh,</em>
                  </p>
                  <p>
                    Dengan hormat, yang bertanda tangan di bawah ini Pimpinan Kantor Cabang <strong>PT Kanomas Artha Wisata</strong> (Penyelenggara Perjalanan Ibadah Umrah Resmi Izin Kemenag RI No. U.310 Tahun 2021), dengan ini menerangkan dengan sebenarnya bahwa calon jamaah di bawah ini:
                  </p>

                  <div className="pl-6 space-y-1.5 font-medium py-1">
                    <div className="grid grid-cols-3">
                      <span className="text-slate-600">Nama Lengkap</span>
                      <span className="col-span-2 font-bold">: {pasporData.namaJamaah}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-slate-600">Nomor Induk Kependudukan (NIK)</span>
                      <span className="col-span-2 font-mono font-bold">: {pasporData.nik}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-slate-600">Tempat, Tanggal Lahir</span>
                      <span className="col-span-2">: {pasporData.tempatTglLahir}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-slate-600">Alamat Tempat Tinggal</span>
                      <span className="col-span-2">: {pasporData.alamat}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-slate-600">Program Perjalanan</span>
                      <span className="col-span-2 font-bold text-orange-700">: {pasporData.namaPaket}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-slate-600">Rencana Keberangkatan</span>
                      <span className="col-span-2 font-bold">: {pasporData.tanggalBerangkat}</span>
                    </div>
                  </div>

                  <p>
                    Adalah benar telah mendaftarkan diri secara resmi dan tercatat dalam sistem administrasi kami sebagai Calon Jamaah Umrah PT Kanomas Artha Wisata untuk musim tahun 1447H / 2026.
                  </p>
                  <p>
                    Sehubungan dengan hal tersebut, kami memohon bantuan Bapak/Ibu Kepala Kantor Imigrasi agar berkenan memproses penerbitan paspor Republik Indonesia bagi calon jamaah yang bersangkutan demi kelancaran pengurusan visa ibadah umrah di Kementerian Agama RI dan Kedutaan Arab Saudi.
                  </p>
                  <p>
                    Demikian surat rekomendasi ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.
                  </p>
                  <p>
                    <em>Wassalamu’alaikum Warahmatullahi Wabarakatuh.</em>
                  </p>
                </div>

                {/* Signatures & Seal */}
                <div className="pt-8 flex justify-end">
                  <div className="text-center space-y-1 relative pr-4">
                    <p className="text-xs">PT KANOMAS ARTHA WISATA</p>
                    <p className="text-xs font-bold">{pasporData.jabatan}</p>

                    {/* Circular Kanomas Official Stamp Graphic */}
                    <div className="w-28 h-28 mx-auto relative flex items-center justify-center my-1 pointer-events-none">
                      <div className="absolute inset-0 rounded-full border-2 border-red-600/70 border-dashed flex items-center justify-center p-1 transform rotate-[-8deg]">
                        <div className="w-full h-full rounded-full border border-red-600 flex flex-col items-center justify-center text-red-600 font-bold text-[8px] text-center uppercase tracking-tighter leading-tight">
                          <span>★ PT KANOMAS ★</span>
                          <span className="text-[7px]">ARTHA WISATA</span>
                          <span className="text-[6px] text-red-700">PPIU U.310</span>
                          <span>TASIKMALAYA</span>
                        </div>
                      </div>
                      {/* Stylized signature line */}
                      <span className="text-xl font-sans italic text-blue-900 font-bold transform -rotate-6 z-10">
                        Asep Mulyana
                      </span>
                    </div>

                    <p className="text-xs font-bold underline mt-1">{pasporData.pejabatPenandatangan}</p>
                    <p className="text-[10px] text-slate-500">Penyelenggara Berizin Kemenag RI</p>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENT 2: KWITANSI TANDA TERIMA PEMBAYARAN */}
            {docType === 'kwitansi' && (
              <div className="space-y-6 text-sm">
                {/* Official Letterhead */}
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <img src="/assets/logo-kanomas.png" alt="Logo Kanomas" className="w-16 h-16 object-contain" />
                    <div>
                      <h2 className="text-lg font-black text-slate-900 leading-tight">PT KANOMAS ARTHA WISATA</h2>
                      <p className="text-[10px] text-slate-600 font-medium">Biro Perjalanan Umrah & Haji Khusus Resmi Kemenag (PPIU No. U.310 / 2021)</p>
                      <p className="text-[9px] text-slate-500">Kantor Cabang Tasikmalaya, Jawa Barat | CS: 0811-2113-363</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-lg">
                      KWITANSI RESMI
                    </span>
                    <p className="text-[11px] font-mono text-slate-600 mt-1">No: {kwitansiData.nomorKwitansi}</p>
                  </div>
                </div>

                {/* Kwitansi Body Fields */}
                <div className="space-y-3.5 text-xs py-3 border-y border-dashed border-slate-300">
                  <div className="grid grid-cols-4 items-center">
                    <span className="text-slate-600 font-medium">Sudah Terima Dari</span>
                    <span className="col-span-3 font-bold text-sm text-slate-900">: {kwitansiData.terimaDari}</span>
                  </div>

                  <div className="grid grid-cols-4 items-start">
                    <span className="text-slate-600 font-medium">Uang Sejumlah</span>
                    <div className="col-span-3 p-2.5 bg-slate-100 rounded-lg italic font-bold text-slate-800 border border-slate-200">
                      "{kwitansiData.terbilang}"
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start">
                    <span className="text-slate-600 font-medium">Untuk Pembayaran</span>
                    <span className="col-span-3 font-medium text-slate-800">: {kwitansiData.untukPembayaran}</span>
                  </div>

                  <div className="grid grid-cols-4 items-center">
                    <span className="text-slate-600 font-medium">Metode / Rekening</span>
                    <span className="col-span-3 font-mono text-[11px] text-emerald-800">: {kwitansiData.metodeBayar}</span>
                  </div>
                </div>

                {/* Amount Box & Signatures */}
                <div className="grid grid-cols-2 gap-4 items-end pt-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Nominal Pembayaran</span>
                    <div className="p-3 bg-orange-50 border-2 border-orange-500/80 rounded-xl text-xl sm:text-2xl font-black text-orange-700 font-mono flex items-center justify-between">
                      <span>Rp {Number(kwitansiData.jumlahNominal).toLocaleString('id-ID')}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-700 text-white font-bold uppercase font-sans">
                        {kwitansiData.statusBayar}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400 italic">
                      * Pembayaran dinyatakan sah setelah dana efektif masuk ke rekening resmi PT Kanomas Artha Wisata.
                    </p>
                  </div>

                  <div className="text-center space-y-1 relative">
                    <p className="text-xs">Tasikmalaya, {kwitansiData.tanggal}</p>
                    <p className="text-[11px] font-bold text-slate-700">Bagian Keuangan & Kasir</p>

                    {/* Stempel Kanomas */}
                    <div className="w-24 h-24 mx-auto relative flex items-center justify-center my-0.5 pointer-events-none">
                      <div className="absolute inset-0 rounded-full border-2 border-red-600/70 border-dashed flex items-center justify-center p-1 transform rotate-[-6deg]">
                        <div className="w-full h-full rounded-full border border-red-600 flex flex-col items-center justify-center text-red-600 font-bold text-[7px] text-center uppercase">
                          <span>★ KANOMAS ★</span>
                          <span className="text-[6px]">LUNAS / SAH</span>
                          <span>TASIKMALAYA</span>
                        </div>
                      </div>
                      <span className="text-lg font-sans italic text-blue-900 font-bold transform -rotate-6 z-10">
                        Admin Kasir
                      </span>
                    </div>

                    <p className="text-xs font-bold underline">{kwitansiData.kasir}</p>
                    <p className="text-[9px] text-slate-500">PT Kanomas Artha Wisata</p>
                  </div>
                </div>
              </div>
            )}

            {/* Document Footer Note */}
            <div className="pt-8 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
              <span>Sistem Cetak Dokumen Digital Aplikasi Kanomas Tasikmalaya</span>
              <span>Terintegrasi SISKOPATUH Kemenag RI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
