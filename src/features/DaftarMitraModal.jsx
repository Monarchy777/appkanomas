import React, { useState } from 'react';
import {
  X,
  Camera,
  Upload,
  CheckCircle,
  AlertTriangle,
  Award,
  CreditCard,
  Phone,
  Mail,
  User,
  MapPin,
  Building,
  ShieldCheck,
  Sparkles,
  Check
} from 'lucide-react';
import { db } from '../services/db';
import { auth } from '../services/auth';

export default function DaftarMitraModal({ onClose, onSuccess }) {
  const currentUser = auth.getUser();

  // Step state
  const [ktpPhoto, setKtpPhoto] = useState(null);
  const [npwpPhoto, setNpwpPhoto] = useState(null);
  const [isScanningKtp, setIsScanningKtp] = useState(false);
  const [isScanningNpwp, setIsScanningNpwp] = useState(false);

  // Form Fields
  const [nik, setNik] = useState('');
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [birthPlaceDate, setBirthPlaceDate] = useState('Tasikmalaya, 12-08-1988');
  const [address, setAddress] = useState('Jl. KH. Z. Musthafa No. 45, Tasikmalaya');
  
  const [npwpNumber, setNpwpNumber] = useState('');
  const [npwpName, setNpwpName] = useState('');

  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('0812');
  
  const [bankName, setBankName] = useState('Bank Syariah Indonesia (BSI)');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState(currentUser?.name || '');

  const [isSuccessRegistered, setIsSuccessRegistered] = useState(false);
  const [newMitraCode, setNewMitraCode] = useState('');

  // 1. Simulasi Cerdas Scan / OCR Foto KTP
  const handleKtpUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setKtpPhoto(event.target.result);
      setIsScanningKtp(true);

      // AI OCR extraction simulation
      setTimeout(() => {
        setIsScanningKtp(false);
        // Generate random realistic 16-digit NIK
        const randomNik = '3278' + Math.floor(100000000000 + Math.random() * 900000000000);
        setNik(randomNik);
        if (!fullName) {
          setFullName('H. AHMAD SYAFI\'I');
        }
        setBirthPlaceDate('Tasikmalaya, 14-06-1985');
        setAddress('Jl. HZ. Mustofa No. 128, Cihideung, Kota Tasikmalaya');
        if (!accountHolder) {
          setAccountHolder(fullName || 'H. AHMAD SYAFI\'I');
        }
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  // 2. Simulasi Cerdas Scan / OCR Foto NPWP
  const handleNpwpUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setNpwpPhoto(event.target.result);
      setIsScanningNpwp(true);

      setTimeout(() => {
        setIsScanningNpwp(false);
        // Generate standard NPWP format
        const randNum = '84.' + Math.floor(100 + Math.random() * 899) + '.' + Math.floor(100 + Math.random() * 899) + '.4-425.000';
        setNpwpNumber(randNum);
        setNpwpName(fullName || 'H. AHMAD SYAFI\'I');
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  // 3. Validasi Kesamaan Nama Rekening dengan KTP
  const isNameMatching = () => {
    if (!fullName || !accountHolder) return false;
    const cleanKtp = fullName.trim().toLowerCase().replace(/[^a-z]/g, '');
    const cleanRek = accountHolder.trim().toLowerCase().replace(/[^a-z]/g, '');
    return cleanKtp === cleanRek || cleanKtp.includes(cleanRek) || cleanRek.includes(cleanKtp);
  };

  // 4. Submit Pendaftaran
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !nik || !email || !accountNumber) {
      alert('Mohon lengkapi NIK, Nama KTP, Email Gmail, dan Nomor Rekening Bank.');
      return;
    }

    if (!isNameMatching()) {
      const confirmDiff = window.confirm(
        `Perhatian: Nama pada Rekening Bank ("${accountHolder}") harus sama dengan Nama pada ID KTP ("${fullName}"). Lanjutkan pendaftaran?`
      );
      if (!confirmDiff) return;
    }

    // Daftarkan ke Database
    const newMitra = db.addMitra({
      name: fullName,
      nik: nik,
      npwp: npwpNumber,
      email: email.trim().toLowerCase(),
      phone: phone,
      city: 'Tasikmalaya & Sekitarnya',
      bankName: bankName,
      accountNumber: accountNumber,
      accountHolder: accountHolder,
      ktpPhoto: ktpPhoto ? true : false,
      npwpPhoto: npwpPhoto ? true : false,
      totalJamaah: 0,
      totalCommission: 0,
      commissionPaid: 0,
      commissionPending: 0
    });

    // Otomatis login dengan akun ini sebagai Mitra
    auth.loginWithGoogle({
      email: email.trim().toLowerCase(),
      name: fullName,
      picture: null
    });

    setNewMitraCode(newMitra.code);
    setIsSuccessRegistered(true);

    if (onSuccess) {
      onSuccess(newMitra);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[92vh] rounded-3xl bg-white text-slate-800 border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Modal */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-emerald-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black shadow-md shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                  Pendaftaran Mitra Syiar Kanomas
                </h3>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Resmi
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-medium">
                Komisi Resmi Rp 1.000.000 / Jamaah • Syiar Berkah Baitullah
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {isSuccessRegistered ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900">
                  Alhamdulillah! Pendaftaran Berhasil
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Selamat bergabung menjadi <strong>Mitra Syiar Resmi PT Kanomas Artha Wisata</strong>. Akun Gmail Anda kini memiliki akses eksklusif ke Portal Mitra.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-sm mx-auto space-y-1">
                <span className="text-[11px] text-emerald-800 font-bold block uppercase tracking-wider">
                  Kode Unik Mitra Syiar Anda:
                </span>
                <span className="font-mono text-xl font-black text-emerald-700 tracking-wider">
                  {newMitraCode}
                </span>
                <p className="text-[10px] text-emerald-600">
                  Gunakan kode ini untuk mendaftarkan jamaah dan meraih komisi syiar.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full max-w-xs py-3 rounded-2xl bg-[#0a7c29] hover:bg-emerald-800 text-white font-black text-sm shadow-md transition active:scale-95"
              >
                Buka Dashboard Mitra Syiar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* SEKSI 1: UPLOAD & SCAN KTP */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <strong className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      1. Foto ID KTP (Otomatis Terisi)
                    </strong>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    Scan Cerdas OCR
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  {/* Area Upload/Foto KTP */}
                  <label className="relative border-2 border-dashed border-emerald-400 hover:border-emerald-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-white transition group h-36 overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleKtpUpload}
                      className="hidden"
                    />
                    {ktpPhoto ? (
                      <div className="relative w-full h-full">
                        <img
                          src={ktpPhoto}
                          alt="Foto KTP"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        {isScanningKtp && (
                          <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs font-bold gap-1 animate-pulse">
                            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                            <span>Membaca data KTP...</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="w-10 h-10 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Camera className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Ambil Foto / Upload KTP
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Data KTP akan terisi otomatis
                        </span>
                      </div>
                    )}
                  </label>

                  {/* Hasil Ekstraksi KTP */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Nomor Induk Kependudukan (NIK):
                      </label>
                      <input
                        type="text"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="16 Digit NIK KTP"
                        required
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-mono font-bold text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Nama Lengkap (Sesuai KTP):
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (!accountHolder) setAccountHolder(e.target.value);
                        }}
                        placeholder="Nama lengkap sesuai KTP"
                        required
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Alamat Domisili KTP:
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Alamat sesuai KTP"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-700 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SEKSI 2: UPLOAD & SCAN NPWP */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-emerald-600" />
                    <strong className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      2. Foto Kartu NPWP
                    </strong>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                    Pajak Resmi
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <label className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-white transition group h-28 overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleNpwpUpload}
                      className="hidden"
                    />
                    {npwpPhoto ? (
                      <div className="relative w-full h-full">
                        <img
                          src={npwpPhoto}
                          alt="Foto NPWP"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        {isScanningNpwp && (
                          <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-white text-xs font-bold animate-pulse">
                            Membaca NPWP...
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="w-8 h-8 mx-auto rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Upload Kartu NPWP
                        </span>
                      </div>
                    )}
                  </label>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Nomor NPWP:
                      </label>
                      <input
                        type="text"
                        value={npwpNumber}
                        onChange={(e) => setNpwpNumber(e.target.value)}
                        placeholder="Contoh: 84.123.456.7-425.000"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-mono font-bold text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Nama Wajib Pajak:
                      </label>
                      <input
                        type="text"
                        value={npwpName || fullName}
                        onChange={(e) => setNpwpName(e.target.value)}
                        placeholder="Nama pada NPWP"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SEKSI 3: KONTAK & GMAIL UNTUK LOGIN OTOMATIS */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <strong className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    3. Akun Gmail & WhatsApp Aktif
                  </strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email Gmail (Untuk Login Otomatis HP):
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama.anda@gmail.com"
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Saat login Google dengan Gmail ini, Portal Mitra langsung terbuka.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif:
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0811-xxxx-xxxx"
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Untuk konfirmasi pencairan komisi & panduan syiar resmi.
                    </span>
                  </div>
                </div>
              </div>

              {/* SEKSI 4: REKENING BANK & VALIDASI NAMA */}
              <div className="space-y-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    <strong className="text-xs font-black text-amber-900 uppercase tracking-wider">
                      4. Rekening Bank Transfer Komisi
                    </strong>
                  </div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-black">
                    Wajib Sama Nama KTP
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nama Bank:
                    </label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 bg-white"
                    >
                      <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
                      <option value="Bank Mandiri">Bank Mandiri</option>
                      <option value="Bank BCA">Bank BCA</option>
                      <option value="Bank BRI">Bank BRI</option>
                      <option value="Bank BNI">Bank BNI</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nomor Rekening:
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Nomor rekening bank"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nama Pemilik Rekening:
                    </label>
                    <input
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder="Harus sama dengan nama KTP"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white"
                    />
                  </div>
                </div>

                {/* Indikator Validasi Kesesuaian Nama */}
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs ${
                  isNameMatching()
                    ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900'
                    : 'bg-amber-100/70 border-amber-400 text-amber-900'
                }`}>
                  {isNameMatching() ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="font-bold">
                        Nama rekening sesuai dengan ID KTP ({fullName}). Komisi aman ditransfer.
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span className="font-bold">
                        Perhatian: Nama rekening bank ({accountHolder || '...'}) harus sama dengan nama pada KTP ({fullName || '...'}).
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Tombol Submit Pendaftaran */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-[#0a7c29] hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>Daftar & Aktifkan Mitra Syiar Sekarang</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
