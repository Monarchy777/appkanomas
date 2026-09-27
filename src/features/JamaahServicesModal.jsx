import React from 'react';
import {
  X,
  Plane,
  Hotel,
  Briefcase,
  ShieldCheck,
  Award,
  Users,
  Bus,
  Train,
  MapPin,
  Utensils,
  Droplets,
  Search,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  PhoneCall
} from 'lucide-react';

const FASILITAS_JAMAAH = [
  {
    icon: Plane,
    color: 'text-sky-600 bg-sky-50 border-sky-200',
    title: 'Tiket Pesawat Direct Flight',
    desc: 'Penerbangan langsung Jakarta – Madinah / Jeddah PP tanpa transit menggunakan maskapai bintang 5 Garuda Indonesia & Saudia Airlines.'
  },
  {
    icon: Hotel,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    title: 'Hotel Pelataran 0 Meter Ka\'bah & Nabawi',
    desc: 'Akomodasi bintang 5 di pelataran Masjidil Haram (Pullman Zamzam / Swissotel Makkah) dan Masjid Nabawi (Rove Al Madinah / Frontel Al Harithia).'
  },
  {
    icon: Briefcase,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    title: 'Paket Perlengkapan Eksklusif Premium',
    desc: 'Koper fiber bagasi 24", koper kabin 20", ransel multifungsi, tas paspor, kain ihram + sabuk (ikhwan), mukena + bergo (akhwat), batik resmi Kanomas, dan buku panduan doa.'
  },
  {
    icon: ShieldCheck,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    title: 'Executive Lounge & Full Airport Handling',
    desc: 'Akses lounge eksekutif Bandara Soekarno-Hatta sebelum terbang, pengurusan bagasi tanpa repot, serta koper diantar langsung ke depan pintu kamar hotel jamaah.'
  },
  {
    icon: Award,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    title: 'Asuransi Perjalanan Resmi Kemenag RI',
    desc: 'Perlindungan menyeluruh asuransi perjalanan, kesehatan, dan santunan resmi sesuai standar kepatuhan Kementerian Agama Republik Indonesia.'
  },
  {
    icon: Users,
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    title: 'Bimbingan Manasik Intensif Sesuai Sunnah',
    desc: 'Dua kali sesi manasik teori dan simulasi praktek lapangan di hotel berbintang sebelum keberangkatan, dipandu ustadz berkompeten sesuai sunnah.'
  },
  {
    icon: Users,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    title: 'Muthawif & Tour Leader Berlisensi',
    desc: 'Didampingi Tour Leader berpengalaman dari tanah air serta Muthawif mukim berlisensi resmi Saudi yang ramah dan siaga 24 jam.'
  },
  {
    icon: Bus,
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    title: 'Bus Pariwisata Eksekutif VIP Full AC',
    desc: 'Armada bus Mercedes-Benz / Travego model terbaru ber-AC dingin dan berfasilitas nyaman untuk seluruh perjalanan ziarah dan city tour.'
  },
  {
    icon: Train,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    title: 'Kereta Cepat Haramain (Fast Track)',
    desc: 'Perjalanan kilat Madinah menuju Makkah hanya 2 jam dengan Haramain High Speed Rail berkecepatan 300 km/jam (untuk paket tertentu).'
  },
  {
    icon: MapPin,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    title: 'Ziarah & Wisata Sejarah Islam Terlengkap',
    desc: 'Mengunjungi Masjid Quba, Jabal Uhud, Kebun Kurma, Jabal Tsur, Padang Arafah, Jabal Rahmah, Muzdalifah, Mina, Ji\'ranah, dan opsional wisata Thaif.'
  },
  {
    icon: Utensils,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    title: 'Konsumsi Masakan Khas Nusantara 3x Sehari',
    desc: 'Prasmanan masakan Indonesia (rendang, ayam bakar, soto, sambal, buah-buahan) yang cocok di lidah jamaah sehingga energi tetap terjaga.'
  },
  {
    icon: Droplets,
    color: 'text-sky-600 bg-sky-50 border-sky-200',
    title: 'Air Zamzam 5 Liter Resmi Maskapai',
    desc: 'Jatah air Zamzam asli 5 liter yang didistribusikan saat tiba di bandara kepulangan Indonesia (sesuai regulasi penerbangan GACA).'
  }
];

export default function JamaahServicesModal({
  onClose,
  onOpenLookup,
  onOpenChecklist,
  onOpenWhatsApp
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl h-[92vh] sm:h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Pelayanan & Fasilitas Jamaah
              </h2>
              <p className="text-xs text-slate-500">
                Fasilitas lengkap All-In yang didapatkan saat mendaftar Umrah & Haji di Kanomas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition active:scale-95"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HERO BADGE */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex-shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white">
                Garansi Standar Layanan Bintang 5
              </span>
              <h3 className="text-base sm:text-xl font-black">
                Kenyamanan & Kekhusyukan Ibadah Anda Prioritas Kami
              </h3>
              <p className="text-xs text-amber-100">
                Semua fasilitas di bawah telah termasuk dalam paket, tanpa biaya tersembunyi.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {onOpenLookup && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenLookup();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white text-slate-900 hover:bg-amber-50 font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95"
                >
                  <Search className="w-3.5 h-3.5 text-amber-600" />
                  <span>Cek Status Pendaftaran</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* LIST OF FACILITIES */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FASILITAS_JAMAAH.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all flex gap-3.5 shadow-xs"
                >
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <strong className="text-xs sm:text-sm font-bold text-slate-900 block leading-snug">
                      {item.title}
                    </strong>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM ASSISTANCE CARD */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                Ada Pertanyaan Mengenai Fasilitas & Pendaftaran?
              </strong>
              <p className="text-xs text-slate-500 mt-0.5">
                Konsultan ibadah Kanomas siap melayani dan memberikan penjelasan detail 24/7.
              </p>
            </div>

            <a
              href="https://wa.me/628112113363?text=Assalamu%27alaikum%20Admin%20Kanomas%2C%20saya%20ingin%20tanya%20mengenai%20fasilitas%20pelayanan%20jamaah%20umrah%2Fhaji."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition active:scale-95 flex-shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-emerald-100" />
              <span>Hubungi CS: 0811-2113-363</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
