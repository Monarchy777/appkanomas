import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  Printer,
  Luggage,
  CheckSquare,
  MessageSquare,
  ExternalLink,
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
      {/* 1. KARTU PROFIL PERUSAHAAN & LEGALITAS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#122332] via-[#0d1a24] to-[#070f16] border border-amber-900/40 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg flex-shrink-0">
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
                <h1 className="text-base sm:text-lg font-black text-white">
                  PT Kanomas Artha Wisata
                </h1>
                <span className="bg-[#b45309] text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase shadow-sm">
                  Tasikmalaya
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Biro Perjalanan Umrah & Haji Khusus Resmi Kemenag RI
              </p>
              <div className="flex items-center gap-2 text-[11px] text-amber-300 font-mono mt-0.5">
                <span>PPIU: <strong>{COMPANY_PROFILE.ppiu}</strong></span>
                <span>•</span>
                <span>PIHK: <strong>{COMPANY_PROFILE.pihk}</strong></span>
              </div>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-600/40 self-start sm:self-center">
            Akreditasi A Resmi
          </span>
        </div>
      </div>

      {/* 2. MENU LAYANAN MANDIRI JAMAAH (5 KARTU SANGAT JELAS) */}
      <div className="space-y-2.5">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
          Layanan Mandiri Jamaah
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Layanan 1: Cek Status Pendaftaran */}
          <div
            onClick={onOpenLookup}
            className="p-4 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between group shadow-sm active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-600/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm font-bold text-white block group-hover:text-emerald-300 transition">
                  Cek Status Pendaftaran
                </strong>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Lacak manifest, status visa & hotel jamaah
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </div>

          {/* Layanan 2: Cetak Kuitansi & Dokumen */}
          <div
            onClick={onOpenDocumentPrint}
            className="p-4 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-amber-500/40 transition cursor-pointer flex items-center justify-between group shadow-sm active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-600/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm font-bold text-white block group-hover:text-amber-300 transition">
                  Cetak Kuitansi & Surat
                </strong>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Surat rekomendasi paspor & kuitansi resmi
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </div>

          {/* Layanan 3: Checklist Koper */}
          <div
            onClick={onOpenChecklist}
            className="p-4 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-amber-500/40 transition cursor-pointer flex items-center justify-between group shadow-sm active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-600/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <Luggage className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm font-bold text-white block group-hover:text-amber-300 transition">
                  Checklist Koper Umrah
                </strong>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Daftar bawaan ihram, dokumen & obat pribadi
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </div>

          {/* Layanan 4: Panduan Nusuk */}
          <div
            onClick={onOpenNusuk}
            className="p-4 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between group shadow-sm active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-600/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm font-bold text-white block group-hover:text-emerald-300 transition">
                  Panduan Aplikasi Nusuk KSA
                </strong>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Tutorial booking izin sholat di Raudhah
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </div>

          {/* Layanan 5: WhatsApp Center */}
          <div
            onClick={onOpenWhatsAppCenter}
            className="p-4 rounded-2xl bg-[#0f1922] border border-white/5 hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between group shadow-sm active:scale-98 sm:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-600/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm font-bold text-white block group-hover:text-emerald-300 transition">
                  WhatsApp Center 24 Jam
                </strong>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Kirim pesan cepat ke admin atau layanan bantuan keberangkatan
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </div>
        </div>
      </div>

      {/* 3. KONTAK & ALAMAT KANTOR TASIKMALAYA */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0f1922] border border-white/5 space-y-3.5 text-xs text-slate-300 shadow-md">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Alamat Kantor Cabang Tasikmalaya
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Lokasi:</strong>
                <span className="text-slate-400">{COMPANY_PROFILE.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <div>
                <strong className="text-white">Jam Operasional:</strong>
                <span className="text-slate-400 block">{COMPANY_PROFILE.operatingHours}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="text-white">Hotline WhatsApp:</strong>
                <a href={`https://wa.me/${COMPANY_PROFILE.csPhone}`} className="text-emerald-400 hover:underline block font-mono font-bold">
                  {COMPANY_PROFILE.displayPhone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <strong className="text-white">Mitra Bank Syariah:</strong>
                <span className="text-slate-400 block">{COMPANY_PROFILE.bankMitra}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AKSES KHUSUS MITRA & ADMIN PERUSAHAAN */}
      <div className="p-4 rounded-2xl bg-[#0a131b] border border-white/5 space-y-2 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Pusat Akses Khusus
        </span>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-300 text-xs">Mode Saat Ini: <strong className="text-white capitalize">{role}</strong></span>
          <div className="flex gap-1.5">
            <button
              onClick={() => onRoleChange('jamaah')}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                role === 'jamaah' ? 'bg-emerald-600 text-white shadow' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Jamaah
            </button>
            <button
              onClick={() => onRoleChange('mitra')}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                role === 'mitra' ? 'bg-blue-600 text-white shadow' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Mitra Syiar
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                role === 'admin' ? 'bg-purple-600 text-white shadow' : 'bg-white/5 text-slate-400 hover:text-white'
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
