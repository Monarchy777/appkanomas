import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  X,
  Info,
  ChevronRight,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

// 1. DATA TITIK DENAH KA'BAH & MATAF
const MATAF_POINTS = [
  {
    id: 'hajar_aswad',
    name: "Hajar Aswad (Titik Start & Finish Thawaf)",
    arabic: "الحجر الأسود",
    x: 72,
    y: 72,
    badge: "Start Thawaf",
    color: "#b45309",
    desc: "Batu hitam mulia dari surga yang terpasang di sudut tenggara Ka'bah. Menjadi garis awal dan akhir setiap putaran Thawaf. Ditandai lampu hijau di dinding Masjidil Haram seberang Ka'bah.",
    sunnah: "Istilam (mengusap/mencium) bila memungkinkan tanpa menyakiti orang lain, atau cukup melambaikan tangan kanan ke arahnya sambil mengucap 'Bismillahi Allahu Akbar'."
  },
  {
    id: 'multazam',
    name: "Multazam",
    arabic: "الملتزم",
    x: 72,
    y: 50,
    badge: "Tempat Mustajab",
    color: "#d97706",
    desc: "Dinding Ka'bah yang terletak antara Hajar Aswad dan Pintu Ka'bah sepanjang ± 2 meter. Salah satu tempat paling mustajab untuk berdoa di muka bumi.",
    sunnah: "Menempelkan dada, wajah, dan kedua telapak tangan ke dinding Ka'bah sambil memanjatkan doa memohon ampunan (bila situasi memungkinkan)."
  },
  {
    id: 'pintu_kabah',
    name: "Pintu Ka'bah (Bab Al-Ka'bah)",
    arabic: "باب الكعبة",
    x: 72,
    y: 35,
    badge: "Sisi Timur",
    color: "#f59e0b",
    desc: "Pintu emas murni setinggi 3,18 meter dan lebar 1,71 meter yang berada 2,22 meter di atas pelataran tawaf.",
    sunnah: "Menghadap pintu Ka'bah saat berdoa di Multazam."
  },
  {
    id: 'maqam_ibrahim',
    name: "Maqam Ibrahim",
    arabic: "مقام إبراهيم",
    x: 88,
    y: 50,
    badge: "Sholat 2 Rakaat",
    color: "#10b981",
    desc: "Kubah kaca berkerangka emas tempat batu pijakan Nabi Ibrahim AS saat meninggikan pondasi Ka'bah. Terletak berhadapan dengan pintu Ka'bah.",
    sunnah: "Disunnahkan sholat sunnah Thawaf 2 rakaat di belakang Maqam Ibrahim (membaca Surah Al-Kafirun di rakaat pertama dan Al-Ikhlas di rakaat kedua)."
  },
  {
    id: 'hijir_ismail',
    name: "Hijir Ismail (Al-Hathim)",
    arabic: "حجر إسماعيل",
    x: 50,
    y: 18,
    badge: "Bagian Dalam Ka'bah",
    color: "#10b981",
    desc: "Pelataran berbentuk setengah lingkaran dengan dinding marmer putih di sebelah utara Ka'bah. Dahulu termasuk bagian dari dalam Ka'bah.",
    sunnah: "Sholat sunnah dan berdoa di dalam Hijir Ismail pahalanya sama persis dengan sholat di dalam Ka'bah. Dilarang thawaf menerobos di dalamnya."
  },
  {
    id: 'rukun_iraqi',
    name: "Rukun Iraqi (Sudut Utara)",
    arabic: "الركن العراقي",
    x: 68,
    y: 28,
    badge: "Sudut Ka'bah",
    color: "#64748b",
    desc: "Sudut Ka'bah yang menghadap ke arah negeri Irak.",
    sunnah: "Melewati sudut ini sambil terus melafazkan zikir dan doa thawaf."
  },
  {
    id: 'rukun_syami',
    name: "Rukun Syami (Sudut Barat)",
    arabic: "الركن الشامي",
    x: 32,
    y: 28,
    badge: "Sudut Ka'bah",
    color: "#64748b",
    desc: "Sudut Ka'bah yang menghadap ke arah negeri Syam (Palestina, Suriah, Yordania, Lebanon).",
    sunnah: "Melanjutkan thawaf menuju Rukun Yamani."
  },
  {
    id: 'rukun_yamani',
    name: "Rukun Yamani (Sudut Selatan)",
    arabic: "الركن اليماني",
    x: 32,
    y: 72,
    badge: "Doa Sapu Jagad",
    color: "#b45309",
    desc: "Sudut Ka'bah yang menghadap ke arah negeri Yaman. Berada tepat sebelum garis Hajar Aswad.",
    sunnah: "Disunnahkan mengusap Rukun Yamani dengan tangan kanan (jika dekat) tanpa menciumnya, lalu membaca doa Sapu Jagad: 'Rabbana aatina fid-dunya hasanah wa fil aakhirati hasanah wa qina 'adzaaban-naar' hingga Hajar Aswad."
  },
  {
    id: 'zamzam_point',
    name: "Area Distribusi Air Zamzam",
    arabic: "مياه زمزم",
    x: 88,
    y: 78,
    badge: "Minum Berdiri",
    color: "#0284c7",
    desc: "Titik kran dan dispenser galon Zamzam dingin dan normal yang tersedia melimpah di sekeliling pelataran mataf.",
    sunnah: "Minum air zamzam sambil berdiri menghadap Ka'bah, membaca basmalah, bernafas 3 kali, dan memanjatkan doa memohon ilmu bermanfaat, rezeki luas, dan kesembuhan."
  }
];

// 2. DATA TITIK DENAH JALUR SA'I (MAS'A)
const SAI_POINTS = [
  {
    id: 'bukit_safa',
    name: "Bukit Safa (Titik Start Sa'i)",
    arabic: "جبل الصفا",
    stage: "Awal Putaran 1, 3, 5, 7",
    desc: "Gundukan batu bukit Safa di dalam Masjidil Haram. Tempat awal mula dimulainya ibadah Sa'i.",
    sunnah: "Menaiki bukit Safa hingga melihat Ka'bah, menghadap kiblat, bertakbir 3 kali, membaca doa tauhid, lalu berdoa apa saja yang diinginkan."
  },
  {
    id: 'lampu_hijau',
    name: "Area Lampu Hijau (Zona Harwalah)",
    arabic: "الميلان الأخضران",
    stage: "Di antara Safa & Marwah",
    desc: "Pilar berlampu hijau gantung di langit-langit Mas'a. Menandai lembah tempat Ibunda Hajar dahulu berlari-lari kecil mencari air.",
    sunnah: "Disunnahkan bagi laki-laki (ikhwan) untuk berlari-lari kecil (harwalah) dengan penuh semangat, sedangkan wanita (akhwat) cukup berjalan biasa."
  },
  {
    id: 'bukit_marwah',
    name: "Bukit Marwah (Titik Finish & Tahallul)",
    arabic: "جبل المروة",
    stage: "Akhir Putaran 2, 4, 6, 7",
    desc: "Gundukan bukit Marwah tempat selesainya putaran genap dan akhir sempurna perjalanan ke-7.",
    sunnah: "Menghadap kiblat dan berdoa. Pada putaran ke-7 di Marwah, dilanjutkan dengan Tahallul (memotong/mencukur rambut) yang menandai selesainya ibadah Umrah."
  },
  {
    id: 'jalur_kursi_roda',
    name: "Jalur Mezanin & Kursi Roda",
    arabic: "مسار الكراسي المتحركة",
    stage: "Lantai 1 & Mezanin",
    desc: "Jalur khusus yang dipagari rapi di lantai dasar dan mezanin untuk jamaah lansia yang menggunakan kursi roda atau skuter listrik resmi pengelola Haram.",
    sunnah: "Tetap berniat sa'i dan melafazkan doa di setiap putaran meskipun didorong petugas."
  }
];

// 3. DATA TITIK DENAH MASJID NABAWI & RAUDHAH
const NABAWI_POINTS = [
  {
    id: 'raudhah_syarifah',
    name: "Raudhah Asy-Syarifah (Karpet Hijau)",
    arabic: "الروضة الشريفة",
    badge: "Taman Surga",
    desc: "Area suci seluas ± 330 m² di antara mimbar dan makam Rasulullah ﷺ yang beralaskan karpet hijau cerah. Tempat doa yang sangat mustajab.",
    hadist: "'Antara rumahku dan mimbarku adalah salah satu taman dari taman-taman surga.' (HR. Bukhari & Muslim). Akses masuk wajib menggunakan izin Tasreh aplikasi Nusuk."
  },
  {
    id: 'makam_rasulullah',
    name: "Makam Rasulullah ﷺ & Sahabat",
    arabic: "المقصورة الشريفة",
    badge: "Makam Mulia",
    desc: "Kamar Ibunda Aisyah RA tempat peristirahatan terakhir Baginda Rasulullah Muhammad ﷺ, Khalifah Abu Bakar Ash-Shiddiq RA, dan Khalifah Umar bin Khattab RA di bawah naungan Kubah Hijau (Green Dome).",
    hadist: "Memberi salam dengan khusyuk, merendahkan suara: 'Assalaamu 'alaika yaa Rasuulallaah warahmatullaahi wabarakaatuh'."
  },
  {
    id: 'mihrab_nabi',
    name: "Mihrab Rasulullah ﷺ",
    arabic: "محراب النبي ﷺ",
    badge: "Tempat Sholat Nabi",
    desc: "Tempat berdirinya Rasulullah ﷺ saat mengimami para Sahabat di Masjid Nabawi setelah perpindahan arah kiblat ke Ka'bah.",
    hadist: "Sholat sunnah di Raudhah diutamakan mendekati area mihrab mulia."
  },
  {
    id: 'mimbar_nabi',
    name: "Mimbar Rasulullah ﷺ",
    arabic: "منبر النبي ﷺ",
    badge: "Batas Barat Raudhah",
    desc: "Mimbar marmer tempat Rasulullah ﷺ menyampaikan khutbah Jumat kepada para Sahabat. Berada di sebelah barat Raudhah.",
    hadist: "'Dan mimbarku kelak berada di atas telagaku (Haudh).' (HR. Bukhari)."
  },
  {
    id: 'babussalam',
    name: "Babussalam (Pintu Masuk Ziarah)",
    arabic: "باب السلام",
    badge: "Pintu Masuk Salam",
    desc: "Pintu gerbang nomor 1 di sisi barat daya Masjid Nabawi. Jalur masuk utama bagi jamaah laki-laki untuk berziarah memberi salam ke Makam Rasulullah ﷺ.",
    hadist: "Masuk dengan mendahulukan kaki kanan sambil membaca doa masuk masjid."
  },
  {
    id: 'pemakaman_baqi',
    name: "Pemakaman Baqi' (Jannatul Baqi')",
    arabic: "مقبرة البقيع",
    badge: "Ziarah Sahabat",
    desc: "Kompleks pemakaman di sebelah timur Masjid Nabawi tempat bersemayam lebih dari 10.000 Sahabat Nabi, para istri Nabi (Ummahatul Mukminin), dan keluarga Ahlul Bait.",
    hadist: "Disunnahkan berziarah ba'da sholat Subuh atau Ashar dan mendoakan para penghuni Baqi'."
  }
];

// 4. DATA PETA RUTE ARMUZNA (PUNCAK HAJI)
const ARMUZNA_STAGES = [
  {
    step: 1,
    date: "8 Dzulhijjah",
    name: "Tarwiyah: Makkah menuju Mina",
    arabic: "يوم التروية - منى",
    desc: "Jamaah berniat ihram haji dari hotel Makkah, bertalbiyah, lalu diberangkatkan bus menuju tenda maktab di Mina untuk mabit dan sholat Dhuhur, Ashar, Maghrib, Isya, dan Subuh berjamaah qashar.",
    highlight: "Tenda Maktab Kanomas dilengkapi pendingin udara AC dan katering nusantara."
  },
  {
    step: 2,
    date: "9 Dzulhijjah (Siang)",
    name: "Wukuf Akbar di Padang Arafah",
    arabic: "يوم عرفة - جبل الرحمة",
    desc: "Puncak rukun haji ('Al-Hajju 'Arafah'). Mulai waktu zawal (masuk waktu Dzuhur) hingga terbenam matahari (Maghrib). Mendengarkan khutbah wukuf, sholat jamak taqdim qashar, lalu memperbanyak dzikir, doa, dan tangisan tobat.",
    highlight: "Dekat dengan Jabal Rahmah dan Masjid Namirah."
  },
  {
    step: 3,
    date: "Malam 10 Dzulhijjah",
    name: "Mabit di Muzdalifah & Kumpul Kerikil",
    arabic: "مزدلفة - جمع الحصى",
    desc: "Setelah matahari terbenam di Arafah, bergerak (ifadhah) ke Muzdalifah. Sholat Maghrib dan Isya jamak ta'khir, beristirahat di bawah langit terbuka hingga lewat tengah malam, serta mengambil batu kerikil untuk Jamarat.",
    highlight: "Mengumpulkan minimal 49 kerikil (Nafar Awal) atau 70 kerikil (Nafar Tsani)."
  },
  {
    step: 4,
    date: "10 Dzulhijjah (Pagi)",
    name: "Mina: Melontar Jamarat Aqabah & Tahallul",
    arabic: "رمي جمرة العقبة والتحلل",
    desc: "Menuju jembatan Jamarat di Mina untuk melontar Jamarat Aqabah (tugu besar) sebanyak 7 butir kerikil bertakbir. Dilanjutkan membayar dam/hadyu dan memotong rambut (Tahallul Awal). Larangan ihram gugur kecuali hubungan suami-istri.",
    highlight: "Akses melalui Terowongan Mu'aishim berjarak dekat dari tenda VIP Kanomas."
  },
  {
    step: 5,
    date: "10 - 11 Dzulhijjah",
    name: "Makkah: Thawaf Ifadhah & Sa'i Haji",
    arabic: "طواف الإفاضة والسعي",
    desc: "Menuju Masjidil Haram untuk melaksanakan Thawaf Ifadhah (Rukun Haji) dan Sa'i Haji. Memasuki Tahallul Tsani di mana seluruh larangan ihram halal kembali sepenuhnya.",
    highlight: "Setelah selesai, jamaah kembali menuju tenda Mina untuk melanjutkan mabit."
  },
  {
    step: 6,
    date: "11, 12, (13) Dzulhijjah",
    name: "Mina: Mabit Hari Tasyriq & 3 Jamarat",
    arabic: "أيام التشريق - رمي الجمرات الثلاث",
    desc: "Mabit di Mina. Setiap ba'da zawal melontar 3 tugu Jamarat berurutan: Jamarat Ula (7 kerikil), Jamarat Wustha (7 kerikil), dan Jamarat Aqabah (7 kerikil). Nafar Awal meninggalkan Mina 12 Dzulhijjah sebelum maghrib.",
    highlight: "Bimbingan teknis mutawwif Kanomas memilih waktu lontar yang aman dan tidak padat."
  }
];

// 5. DATA PETA 5 TITIK MIQAT
const MIQAT_POINTS = [
  {
    id: 'bir_ali',
    name: "Dzulhulaifah (Bir Ali / Abyar 'Ali)",
    arabic: "ذو الحليفة / بئر علي",
    direction: "Utara Makkah (Arah Madinah)",
    distance: "± 450 km dari Makkah (9 km dari Madinah)",
    route: "Rute Jamaah dari Madinah",
    desc: "Miqat terjauh bagi penduduk Madinah dan seluruh jamaah yang ziarah ke Madinah terlebih dahulu sebelum berumrah ke Makkah.",
    tip: "Masjid Bir Ali memiliki ratusan pintu kamar mandi dan tempat wudhu luas. Jamaah disunnahkan mandi dan mengenakan kain ihram sejak di hotel Madinah."
  },
  {
    id: 'yalamlam',
    name: "Yalamlam (As-Sa'diyah)",
    arabic: "يلملم / السعدية",
    direction: "Selatan Makkah",
    distance: "± 92 km di selatan Makkah",
    route: "Rute Udara Jamaah Indonesia (Direct ke Jeddah)",
    desc: "Miqat bagi jamaah yang datang dari arah Yaman, Asia Selatan, dan Asia Tenggara termasuk rute penerbangan pesawat dari Indonesia.",
    tip: "Saat terbang dengan Garuda Indonesia atau Saudia Airlines, kapten pilot akan mengumumkan 20-30 menit sebelum melintasi posisi udara Yalamlam agar jamaah segera berniat ihram."
  },
  {
    id: 'qarnul_manazil',
    name: "Qarnul Manazil (As-Sail Al-Kabir)",
    arabic: "قرن المنازل / السيل الكبير",
    direction: "Timur Makkah (Arah Taif & Riyadh)",
    distance: "± 75 km di timur Makkah",
    route: "Rute Jamaah City Tour Taif / Teluk",
    desc: "Miqat bagi penduduk Najd, Riyadh, kawasan Teluk, dan jamaah Kanomas yang melakukan perjalanan wisata ziarah ke kota sejuk Taif.",
    tip: "Memiliki fasilitas masjid besar dengan air pegunungan yang sejuk."
  },
  {
    id: 'al_juhfah',
    name: "Al-Juhfah (Rabigh)",
    arabic: "الجحفة / رابغ",
    direction: "Barat Laut Makkah",
    distance: "± 187 km di barat laut Makkah",
    route: "Rute Jamaah dari Mesir, Syam, Afrika Utara",
    desc: "Miqat bagi penduduk Syam, Mesir, dan jamaah yang mendarat di Jeddah tanpa berniat ihram di atas pesawat (wajib keluar ke Rabigh).",
    tip: "Kini dipusatkan di Masjid Al-Juhfah yang telah dipugar megah oleh Kementerian Urusan Islam Saudi."
  },
  {
    id: 'dzatul_irq',
    name: "Dzatul 'Irq (Ad-Dharibah)",
    arabic: "ذات عرق",
    direction: "Timur Laut Makkah",
    distance: "± 94 km di timur laut Makkah",
    route: "Rute Jamaah dari Irak & Iran",
    desc: "Miqat yang ditetapkan oleh Khalifah Umar bin Khattab RA bagi penduduk Irak dan negeri-negeri di belakangnya.",
    tip: "Ditetapkan berdasarkan posisi sejajar dengan miqat lainnya."
  },
  {
    id: 'tanim',
    name: "Tan'im (Masjid Aisyah) - Miqat Makki",
    arabic: "التنعيم / مسجد عائشة",
    direction: "Utara Kota Makkah (Tanah Halal)",
    distance: "± 7,5 km dari Masjidil Haram",
    route: "Umrah Sunnah ke-2 / Badal Umrah",
    desc: "Batas tanah halal terdekat dari Masjidil Haram tempat Ibunda Aisyah RA berniat umrah bersama saudaranya Abdurrahman bin Abu Bakar.",
    tip: "Dapat diakses cepat dengan taksi atau bus resmi dari terminal Syib Amir / Bab King Abdulaziz."
  }
];

export default function InteractiveMapModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('mataf'); // 'mataf' | 'sai' | 'nabawi' | 'armuzna' | 'miqat'
  const [selectedMatafPoint, setSelectedMatafPoint] = useState(MATAF_POINTS[0]);
  const [selectedNabawiPoint, setSelectedNabawiPoint] = useState(NABAWI_POINTS[0]);
  const [selectedMiqatPoint, setSelectedMiqatPoint] = useState(MIQAT_POINTS[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#101b25] text-white rounded-3xl border border-amber-900/40 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#0b141d] border-b border-amber-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/30">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white font-sans">
                Denah & Peta Titik Ibadah Lengkap
              </h3>
              <p className="text-[11px] text-slate-400">
                Masjidil Haram, Jalur Sa'i, Nabawi, Rute Armuzna & 5 Titik Miqat
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

        {/* Navigation Tabs */}
        <div className="px-3 sm:px-6 py-2.5 bg-[#0e1720] border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'mataf', label: "Denah Ka'bah & Mataf" },
            { id: 'sai', label: "Denah Sa'i (Safa-Marwah)" },
            { id: 'nabawi', label: "Denah Nabawi & Raudhah" },
            { id: 'armuzna', label: "Peta Rute Armuzna (Haji)" },
            { id: 'miqat', label: "Peta 5 Titik Miqat" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'bg-[#14222e] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: DENAH KA'BAH & MATAF */}
          {activeTab === 'mataf' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Schematic Mataf Masjidil Haram
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                    Denah Arsitektur Ka'bah & Jalur Thawaf
                  </h4>
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Sentuh titik untuk melihat panduan sunnah
                </span>
              </div>

              {/* Interactive SVG Diagram Ka'bah & Mataf */}
              <div className="relative w-full max-w-lg mx-auto bg-[#070d13] border border-amber-900/40 rounded-3xl p-4 shadow-inner flex flex-col items-center">
                <svg viewBox="0 0 400 400" className="w-full h-auto max-w-[360px]">
                  {/* Outer Mataf Boundary */}
                  <circle cx="200" cy="200" r="185" fill="#0d1822" stroke="#1f2f3e" strokeWidth="2" />
                  <circle cx="200" cy="200" r="150" fill="#0f1d2a" stroke="#25394b" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="200" r="115" fill="#122333" stroke="#2e465d" strokeWidth="1" />

                  {/* Flow Direction Arrow (Counter-Clockwise) */}
                  <path
                    d="M 200,60 A 140,140 0 0,0 60,200"
                    fill="none"
                    stroke="#b45309"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                  />
                  <polygon points="56,190 60,205 70,195" fill="#b45309" />

                  <path
                    d="M 60,200 A 140,140 0 0,0 200,340"
                    fill="none"
                    stroke="#b45309"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                  />
                  <polygon points="195,344 205,340 195,332" fill="#b45309" />

                  {/* Hijir Ismail Semicircle (North side) */}
                  <path
                    d="M 170,145 A 38,38 0 0,1 230,145"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <text x="200" y="130" fill="#34d399" fontSize="9" textAnchor="middle" fontWeight="bold">
                    Hijir Ismail
                  </text>

                  {/* Ka'bah Box in Center */}
                  <rect
                    x="165"
                    y="155"
                    width="70"
                    height="70"
                    fill="#05070a"
                    stroke="#d4af37"
                    strokeWidth="3"
                    rx="4"
                  />
                  {/* Kiswah Gold Band Ribbon */}
                  <line x1="165" y1="172" x2="235" y2="172" stroke="#d4af37" strokeWidth="2.5" />
                  <line x1="165" y1="177" x2="235" y2="177" stroke="#d4af37" strokeWidth="1" />

                  {/* Ka'bah Center Label */}
                  <text x="200" y="200" fill="#fef08a" fontSize="11" textAnchor="middle" fontWeight="900" fontFamily="sans-serif">
                    KA'BAH
                  </text>

                  {/* Pintu Ka'bah (East Side) */}
                  <rect x="233" y="165" width="4" height="22" fill="#fbbf24" stroke="#d97706" />

                  {/* Hajar Aswad Marker (Southeast Corner) */}
                  <circle cx="236" cy="226" r="6" fill="#1c1917" stroke="#f59e0b" strokeWidth="2.5" />
                  {/* Lampu Hijau Thawaf Line */}
                  <line x1="236" y1="226" x2="350" y2="300" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="310" y="320" fill="#10b981" fontSize="9" fontWeight="bold">
                    Lampu Hijau (Start)
                  </text>

                  {/* Maqam Ibrahim */}
                  <circle cx="275" cy="180" r="9" fill="#10b981" stroke="#34d399" strokeWidth="2" />
                  <text x="275" y="164" fill="#6ee7b7" fontSize="8" textAnchor="middle" fontWeight="bold">
                    Maqam Ibrahim
                  </text>

                  {/* Rukun Yamani */}
                  <circle cx="165" cy="225" r="4.5" fill="#d97706" />
                  <text x="145" y="240" fill="#f59e0b" fontSize="8" textAnchor="middle">
                    R. Yamani
                  </text>

                  {/* Rukun Syami */}
                  <circle cx="165" cy="155" r="4" fill="#64748b" />
                  <text x="145" y="150" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    R. Syami
                  </text>

                  {/* Rukun Iraqi */}
                  <circle cx="235" cy="155" r="4" fill="#64748b" />
                  <text x="255" y="150" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    R. Iraqi
                  </text>

                  {/* Direction to Mas'a (Safa-Marwah) */}
                  <path d="M 330,130 L 375,130" stroke="#b45309" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="350" y="120" fill="#fb923c" fontSize="8" textAnchor="middle" fontWeight="bold">
                    Ke Jalur Sa'i ➔
                  </text>
                </svg>

                <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span>Garis Start (Lampu Hijau)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b45309]" />
                    <span>Arah Berlawanan Jarum Jam</span>
                  </span>
                </div>
              </div>

              {/* Selected Point Detail Card */}
              {selectedMatafPoint && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0b141d] border border-amber-600/40 space-y-2.5 shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/30">
                        {selectedMatafPoint.badge}
                      </span>
                      <h5 className="text-base font-bold text-white mt-1">
                        {selectedMatafPoint.name}
                      </h5>
                    </div>
                    <span className="text-xl font-arabic text-amber-200 dir-rtl">
                      {selectedMatafPoint.arabic}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMatafPoint.desc}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-amber-200/90 space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Adab & Sunnah Ibadah:</span>
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      {selectedMatafPoint.sunnah}
                    </p>
                  </div>
                </div>
              )}

              {/* Grid of clickable points */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MATAF_POINTS.map(pt => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedMatafPoint(pt)}
                    className={`p-2.5 rounded-xl border text-left transition text-xs ${
                      selectedMatafPoint?.id === pt.id
                        ? 'bg-[#1b2d3d] border-amber-500 text-white font-bold'
                        : 'bg-[#0b141d] border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span className="block leading-tight font-semibold">{pt.name}</span>
                    <span className="text-[10px] text-amber-300/80 font-arabic block leading-tight mt-0.5">
                      {pt.arabic}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DENAH JALUR SA'I (MAS'A) */}
          {activeTab === 'sai' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Jalur Mas'a Sepanjang ± 450 Meter
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                  Denah Lintasan Sa'i Antara Bukit Safa & Marwah
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Ibadah Sa'i ditempuh 7 kali perjalanan (total ± 3,15 km). Dimulai dari Bukit Safa dan diakhiri di Bukit Marwah.
                </p>
              </div>

              {/* Visual Schematic Diagram of Mas'a */}
              <div className="p-5 rounded-3xl bg-[#0b141d] border border-amber-900/40 space-y-4">
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#070d13] border border-white/5">
                  {/* Bukit Safa (Start) */}
                  <div className="w-full md:w-44 p-4 rounded-2xl bg-amber-950/60 border border-amber-600/40 text-center space-y-1">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-600 text-white">
                      Start Sa'i
                    </span>
                    <h5 className="text-sm font-bold text-white">Bukit Safa</h5>
                    <p className="text-xs font-arabic text-amber-200">جبل الصفا</p>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      Perjalanan: 1, 3, 5, 7
                    </span>
                  </div>

                  {/* Corridor with Lampu Hijau Indicator */}
                  <div className="flex-1 w-full flex flex-col items-center justify-center space-y-2 px-2">
                    <div className="w-full h-8 rounded-xl bg-gradient-to-r from-amber-900/30 via-emerald-600/30 to-amber-900/30 border border-emerald-500/40 flex items-center justify-center relative overflow-hidden">
                      <span className="text-[11px] font-bold text-emerald-300 z-10 flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Area Lampu Hijau (Zona Lari Kecil Ikhwan)</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </span>
                    </div>

                    <div className="flex justify-between w-full text-[10px] text-slate-400 px-1 font-mono">
                      <span>➔ Safa ke Marwah (Ganjil)</span>
                      <span>± 450 Meter</span>
                      <span>Marwah ke Safa (Genap) ➔</span>
                    </div>

                    {/* Middle wheelchair lane indicator */}
                    <div className="w-full py-1 rounded-lg bg-white/5 border border-white/10 text-center text-[10px] text-slate-300">
                      Jalur Khusus Kursi Roda & Skuter Elektrik di Mezanin
                    </div>
                  </div>

                  {/* Bukit Marwah (Finish) */}
                  <div className="w-full md:w-44 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-600/40 text-center space-y-1">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-600 text-white">
                      Finish & Tahallul
                    </span>
                    <h5 className="text-sm font-bold text-white">Bukit Marwah</h5>
                    <p className="text-xs font-arabic text-emerald-200">جبل المروة</p>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      Perjalanan: 2, 4, 6, Selesai ke-7
                    </span>
                  </div>
                </div>

                {/* 4 Detail Explanation Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {SAI_POINTS.map(pt => (
                    <div key={pt.id} className="p-3.5 rounded-2xl bg-[#101b25] border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h6 className="text-xs font-bold text-white">{pt.name}</h6>
                        <span className="text-[10px] font-arabic text-amber-300">{pt.arabic}</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-semibold block">{pt.stage}</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{pt.desc}</p>
                      <p className="text-[10px] text-slate-400 bg-black/30 p-2 rounded-lg border border-white/5">
                        <strong className="text-amber-200">Sunnah:</strong> {pt.sunnah}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DENAH MASJID NABAWI & RAUDHAH */}
          {activeTab === 'nabawi' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Madinah Al-Munawwarah
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                  Denah Raudhah Asy-Syarifah & Makam Rasulullah ﷺ
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Area Raudhah beralaskan karpet hijau cerah di antara mimbar dan makam mulia. Akses masuk diatur wajib melalui jadwal izin resmi Tasreh di aplikasi Nusuk.
                </p>
              </div>

              {/* Selected Point Highlight */}
              {selectedNabawiPoint && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0b141d] border border-emerald-600/40 space-y-2.5 shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/30">
                        {selectedNabawiPoint.badge}
                      </span>
                      <h5 className="text-base font-bold text-white mt-1">
                        {selectedNabawiPoint.name}
                      </h5>
                    </div>
                    <span className="text-xl font-arabic text-emerald-200 dir-rtl">
                      {selectedNabawiPoint.arabic}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedNabawiPoint.desc}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-emerald-200/90 space-y-1">
                    <strong className="text-emerald-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Keutamaan & Adab Ziarah:</span>
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      {selectedNabawiPoint.hadist}
                    </p>
                  </div>
                </div>
              )}

              {/* Grid of Nabawi points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {NABAWI_POINTS.map(pt => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedNabawiPoint(pt)}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between space-y-1.5 ${
                      selectedNabawiPoint?.id === pt.id
                        ? 'bg-[#132a20] border-emerald-500 text-white font-bold'
                        : 'bg-[#0b141d] border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block">{pt.name}</span>
                      <span className="text-[10px] text-emerald-300/80 font-arabic block">{pt.arabic}</span>
                    </div>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400 w-fit">
                      {pt.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PETA RUTE ARMUZNA (PUNCAK HAJI) */}
          {activeTab === 'armuzna' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Alur Kronologis Manasik Haji
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                  Peta Rute Ibadah Armuzna (Arafah - Muzdalifah - Mina)
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Urutan perjalanan rukun dan wajib haji mulai 8 Dzulhijjah (Tarwiyah) hingga Thawaf Wada' sebelum kepulangan.
                </p>
              </div>

              {/* Step-by-Step Route Progression */}
              <div className="space-y-3">
                {ARMUZNA_STAGES.map((stg) => (
                  <div
                    key={stg.step}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0b141d] border border-amber-900/30 space-y-2 flex flex-col sm:flex-row sm:items-start gap-3.5"
                  >
                    <div className="flex items-center gap-3 sm:block sm:text-center flex-shrink-0">
                      <span className="w-10 h-10 rounded-2xl bg-amber-950 text-amber-400 font-mono font-bold text-sm flex items-center justify-center border border-amber-600/40">
                        {stg.step}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-300 block mt-1">
                        {stg.date}
                      </span>
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h5 className="text-sm font-bold text-white">
                          {stg.name}
                        </h5>
                        <span className="text-xs font-arabic text-amber-200">
                          {stg.arabic}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {stg.desc}
                      </p>

                      <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11px] text-amber-200 flex items-center gap-1.5 mt-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span><strong>Fasilitas Kanomas:</strong> {stg.highlight}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PETA 5 TITIK MIQAT */}
          {activeTab === 'miqat' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Batas Garis Ihram (Mawaqit Makaniyyah)
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                  Peta 5 Titik Miqat Dunia Mengelilingi Makkah
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Titik batas geografis di mana setiap orang yang hendak berumrah atau berhaji wajib telah berniat dan mengenakan pakaian ihram sebelum melewatinya.
                </p>
              </div>

              {/* Selected Miqat Detail */}
              {selectedMiqatPoint && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0b141d] border border-amber-600/40 space-y-2.5 shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/30">
                        {selectedMiqatPoint.route}
                      </span>
                      <h5 className="text-base font-bold text-white mt-1">
                        {selectedMiqatPoint.name}
                      </h5>
                      <span className="text-[11px] text-amber-400 font-mono block">
                        {selectedMiqatPoint.distance} • {selectedMiqatPoint.direction}
                      </span>
                    </div>
                    <span className="text-xl font-arabic text-amber-200 dir-rtl">
                      {selectedMiqatPoint.arabic}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMiqatPoint.desc}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-amber-200/90 space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Petunjuk Praktis Jamaah Kanomas:</span>
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      {selectedMiqatPoint.tip}
                    </p>
                  </div>
                </div>
              )}

              {/* Grid of 6 Miqat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MIQAT_POINTS.map(mq => (
                  <button
                    key={mq.id}
                    onClick={() => setSelectedMiqatPoint(mq)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-start justify-between gap-2 ${
                      selectedMiqatPoint?.id === mq.id
                        ? 'bg-[#1b2d3d] border-amber-500 text-white shadow-md'
                        : 'bg-[#0b141d] border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <span className="text-xs font-bold block leading-tight">{mq.name}</span>
                      <span className="text-[10px] text-amber-300 font-mono block leading-tight">{mq.distance}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400 inline-block max-w-full leading-tight">
                        {mq.route}
                      </span>
                    </div>
                    <Navigation className={`w-4 h-4 flex-shrink-0 mt-1 ${selectedMiqatPoint?.id === mq.id ? 'text-amber-400' : 'text-slate-500'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#0b141d] border-t border-amber-900/30 flex items-center justify-between text-xs text-slate-400">
          <span>Bimbingan Manasik PT Kanomas Artha Wisata Tasikmalaya</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition"
          >
            Tutup Peta
          </button>
        </div>
      </div>
    </div>
  );
}
