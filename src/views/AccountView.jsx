import React from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Briefcase,
  Building2,
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import {
  Icon3DStatus,
  Icon3DCetak,
  Icon3DKoper,
  Icon3DNusuk,
  Icon3DWhatsApp
} from '../components/Icons3D';
import { COMPANY_PROFILE, EXTERNAL_SERVICES } from '../services/initialSeed';

export default function AccountView({
  onOpenLookup,
  onOpenNusuk,
  onOpenChecklist,
  onOpenDocumentPrint,
  onOpenWhatsAppCenter,
  onRoleChange,
  role
}) {
  return (
    <div className="space-y-5 pb-24 mx-3 sm:mx-6 mt-3 max-w-4xl mx-auto">
      {/* 1. KARTU PROFIL PERUSAHAAN & LEGALITAS (Putih Bersih) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shadow-xs flex-shrink-0">
              <img
                src={COMPANY_PROFILE.logo}
                alt="Logo Kanomas"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-900">
                  PT Kanomas Artha Wisata
                </h1>
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase shadow-xs">
                  Tasikmalaya
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Biro Perjalanan Umrah & Haji Khusus Resmi Kemenag RI
              </p>
              <div className="flex items-center gap-2 text-[11px] text-amber-700 font-mono mt-0.5 font-medium">
                <span>PPIU: <strong>{COMPANY_PROFILE.ppiu}</strong></span>
                <span>•</span>
                <span>PIHK: <strong>{COMPANY_PROFILE.pihk}</strong></span>
              </div>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-center">
            Akreditasi A Resmi
          </span>
        </div>
      </div>

      {/* 2. MENU LAYANAN MANDIRI JAMAAH (5 KARTU DENGAN IKON 3D BERWARNA) */}
      <div className="space-y-2.5">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
          Layanan Mandiri Jamaah
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Layanan 1: Cek Status Pendaftaran */}
          <div
            onClick={onOpenLookup}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition cursor-pointer flex items-center justify-between group shadow-xs active:scale-98"
          >
            <div className="flex items-center gap-3">
              <Icon3DStatus size={44} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block group-hover:text-blue-600 transition">
                  Cek Status Pendaftaran
                </strong>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Lacak manifest, status visa & hotel jamaah
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          </div>

          {/* Layanan 2: Cetak Kuitansi & Dokumen */}
          <div
            onClick={onOpenDocumentPrint}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition cursor-pointer flex items-center justify-between group shadow-xs active:scale-98"
          >
            <div className="flex items-center gap-3">
              <Icon3DCetak size={44} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block group-hover:text-amber-600 transition">
                  Cetak Kuitansi & Surat
                </strong>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Surat rekomendasi paspor & kuitansi resmi
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          </div>

          {/* Layanan 3: Checklist Koper */}
          <div
            onClick={onOpenChecklist}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-md transition cursor-pointer flex items-center justify-between group shadow-xs active:scale-98"
          >
            <div className="flex items-center gap-3">
              <Icon3DKoper size={44} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block group-hover:text-sky-600 transition">
                  Checklist Koper Umrah
                </strong>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Daftar bawaan ihram, dokumen & obat pribadi
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          </div>

          {/* Layanan 4: Panduan Nusuk */}
          <div
            onClick={onOpenNusuk}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition cursor-pointer flex items-center justify-between group shadow-xs active:scale-98"
          >
            <div className="flex items-center gap-3">
              <Icon3DNusuk size={44} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block group-hover:text-emerald-600 transition">
                  Panduan Aplikasi Nusuk KSA
                </strong>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Tutorial booking izin sholat di Raudhah
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          </div>

          {/* Layanan 5: WhatsApp Center */}
          <div
            onClick={onOpenWhatsAppCenter}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition cursor-pointer flex items-center justify-between group shadow-xs active:scale-98 sm:col-span-2"
          >
            <div className="flex items-center gap-3">
              <Icon3DWhatsApp size={44} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block group-hover:text-emerald-600 transition">
                  WhatsApp Center 24 Jam
                </strong>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Kirim pesan cepat ke admin atau layanan bantuan keberangkatan
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
          </div>
        </div>
      </div>

      {/* 3. KONTAK & ALAMAT KANTOR TASIKMALAYA */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 space-y-3.5 text-xs text-slate-600 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Alamat Kantor Cabang Tasikmalaya
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Lokasi:</strong>
                <span className="text-slate-500">{COMPANY_PROFILE.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <div>
                <strong className="text-slate-900">Jam Operasional:</strong>
                <span className="text-slate-500 block">{COMPANY_PROFILE.operatingHours}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <strong className="text-slate-900">Hotline WhatsApp:</strong>
                <a href={`https://wa.me/${COMPANY_PROFILE.csPhone}`} className="text-emerald-600 hover:underline block font-mono font-bold">
                  {COMPANY_PROFILE.displayPhone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <div>
                <strong className="text-slate-900">Mitra Bank Syariah:</strong>
                <span className="text-slate-500 block">{COMPANY_PROFILE.bankMitra}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AKSES KHUSUS MITRA & ADMIN PERUSAHAAN */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Pusat Akses Khusus
        </span>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-600 text-xs">Mode Saat Ini: <strong className="text-slate-900 capitalize">{role}</strong></span>
          <div className="flex gap-1.5">
            <button
              onClick={() => onRoleChange('jamaah')}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                role === 'jamaah' ? 'bg-amber-500 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Jamaah
            </button>
            <button
              onClick={() => onRoleChange('mitra')}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                role === 'mitra' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Mitra Syiar
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                role === 'admin' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
