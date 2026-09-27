import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Briefcase,
  Users,
  Building2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { COMPANY_PROFILE, EXTERNAL_SERVICES } from '../services/initialSeed';

export default function AccountView({
  onOpenLookup,
  onOpenNusuk,
  onRoleChange,
  role
}) {
  return (
    <div className="space-y-6 pb-24 mx-3 sm:mx-6 mt-3">
      {/* Header Profile Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#14222e] via-[#1a2d3d] to-[#0f1b25] border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg flex-shrink-0">
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
                <h2 className="text-lg sm:text-xl font-black text-white">
                  PT Kanomas Artha Wisata
                </h2>
                <span className="bg-orange-600 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                  Tasikmalaya
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Biro Perjalanan Umrah & Haji Khusus Resmi Kemenag RI
              </p>
              <div className="flex items-center gap-2 text-[11px] text-amber-300 font-mono mt-1">
                <span>PPIU: <strong>{COMPANY_PROFILE.ppiu}</strong></span>
                <span>•</span>
                <span>PIHK: <strong>{COMPANY_PROFILE.pihk}</strong></span>
              </div>
            </div>
          </div>

          {/* Cek Status Jamaah Action */}
          <button
            onClick={onOpenLookup}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 self-start sm:self-center"
          >
            <UserCheck className="w-4 h-4" />
            <span>Cek Status Jamaah</span>
          </button>
        </div>
      </div>

      {/* External Applications Grid (Nusuk, Siskopatuh, etc.) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Aplikasi Resmi Terkait Ibadah Haji & Umrah
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">Tautan Resmi Pemerintah</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXTERNAL_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-4 rounded-3xl bg-[#14222e] border border-white/10 hover:border-emerald-500/40 transition shadow-md flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {srv.badge}
                  </span>
                  {srv.id === 'nusuk' && (
                    <button
                      onClick={onOpenNusuk}
                      className="text-[11px] text-orange-400 font-bold hover:underline"
                    >
                      Buka Panduan
                    </button>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-white">{srv.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">Platform Resmi</span>
                <a
                  href={srv.webUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
                >
                  <span>Kunjungi Web</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Switcher Portal */}
      <div className="p-5 rounded-3xl bg-[#101b25] border border-white/10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Pusat Akses Mitra & Manajemen Internal
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Mitra Syiar Hub */}
          <div
            onClick={() => onRoleChange('mitra')}
            className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
              role === 'mitra'
                ? 'bg-blue-950/60 border-blue-500 shadow-md'
                : 'bg-[#14222e] border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <strong className="text-xs text-white block">Portal Mitra Syiar (Marketing)</strong>
                <span className="text-[10px] text-slate-400">Referral komisi & pendaftaran prospek</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Admin Perusahaan Hub */}
          <div
            onClick={() => onRoleChange('admin')}
            className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
              role === 'admin'
                ? 'bg-purple-950/60 border-purple-500 shadow-md'
                : 'bg-[#14222e] border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </span>
              <div>
                <strong className="text-xs text-white block">Portal Admin Perusahaan</strong>
                <span className="text-[10px] text-slate-400">Kelola paket, jamaah, tabungan BSI</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Office & Legal Details */}
      <div className="p-6 rounded-3xl bg-[#14222e] border border-white/10 space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          Informasi Kantor Pelayanan & Legalitas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Alamat Kantor Tasikmalaya:</strong>
                <span className="text-slate-400">{COMPANY_PROFILE.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
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
                <strong className="text-white">WhatsApp & CS:</strong>
                <a href={`https://wa.me/${COMPANY_PROFILE.csPhone}`} className="text-orange-400 hover:underline block font-mono">
                  {COMPANY_PROFILE.displayPhone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <strong className="text-white">Mitra Perbankan:</strong>
                <span className="text-slate-400 block">{COMPANY_PROFILE.bankMitra}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
