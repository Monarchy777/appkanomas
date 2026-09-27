import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  Sparkles,
  Calendar,
  CheckCircle,
  MapPin,
  Volume2,
  VolumeX,
  ChevronRight,
  ShieldCheck,
  CheckSquare,
  HelpCircle,
  ArrowRight,
  Play,
  Square,
  Search
} from 'lucide-react';
import { INITIAL_DOA_MANASIK } from '../services/initialSeed';
import { sounds } from '../services/soundEffects';

const UMRAH_STEPS = [
  {
    step: 1,
    title: "Ihram & Berniat di Miqat",
    desc: "Mandi sunnah ihram, mengenakan pakaian ihram (2 lembar kain tanpa jahitan bagi ikhwan), sholat sunnah 2 rakaat di Miqat (misal Dzulhulaifah/Bir Ali atau Yalamlam), lalu berniat Umrah. Dilanjutkan memperbanyak Talbiyah.",
    place: "Titik Miqat (Bir Ali / Yalamlam)",
    doaTitle: "Lafaz Niat Umrah di Miqat",
    arabic: "لَبَّيْكَ اللّٰهُمَّ عُمْرَةً",
    latin: "Labbaika Allahumma 'umratan.",
    doaId: "STEP-UMR-01"
  },
  {
    step: 2,
    title: "Thawaf Mengelilingi Ka'bah 7 Putaran",
    desc: "Masuk Masjidil Haram dengan kaki kanan. Memulai Thawaf dari garis Hajar Aswad berlawanan arah jarum jam sebanyak 7 kali putaran penuh. Ka'bah selalu berada di sebelah kiri.",
    place: "Mataf Masjidil Haram",
    doaTitle: "Doa Antara Rukun Yamani & Hajar Aswad (Sapu Jagad)",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanaa aatinaa fid-dunyaa hasanah, wa fil-aakhirati hasanah, wa qinaa 'adzaaban-naar.",
    doaId: "STEP-UMR-02"
  },
  {
    step: 3,
    title: "Sholat di Maqam Ibrahim & Minum Zamzam",
    desc: "Setelah selesai putaran ke-7, sholat sunnah thawaf 2 rakaat di belakang Maqam Ibrahim. Minum air zamzam sambil berdiri menghadap kiblat dan memohon kebaikan dunia akhirat.",
    place: "Pelataran Maqam Ibrahim & Zamzam Point",
    doaTitle: "Doa Minum Air Zamzam",
    arabic: "اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ",
    latin: "Allahumma innii as-aluka 'ilman naafi'an, wa rizqan waasi'an, wa syifaa-an min kulli daa-in.",
    doaId: "STEP-UMR-03"
  },
  {
    step: 4,
    title: "Sa'i antara Bukit Safa dan Marwah 7 Kali",
    desc: "Mulai dari Bukit Safa menghadap kiblat, bertakbir dan berdoa. Berjalan menuju Bukit Marwah (dihitung 1 kali), lalu kembali ke Safa (dihitung 2 kali) hingga genap 7 kali di Bukit Marwah.",
    place: "Mas'a (Jalur Sa'i Safa-Marwah)",
    doaTitle: "Doa Memulai Sa'i di Bukit Safa",
    arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ. لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    latin: "Innash-shafaa wal-marwata min sya'aa-irillaah. Abda-u bimaa bada-allaahu bih. Laa ilaaha illallaahu wahdahu laa syariika lah.",
    doaId: "STEP-UMR-04"
  },
  {
    step: 5,
    title: "Tahallul (Bercukur Rambut)",
    desc: "Mencukur gundul (diutamakan bagi ikhwan) atau memotong minimal 3 helai rambut (bagi akhwat). Dengan tahallul, seluruh larangan ihram kembali halal dan ibadah Umrah telah sempurna.",
    place: "Bukit Marwah / Barber Area",
    doaTitle: "Doa Selesai Tahallul",
    arabic: "الْحَمْدُ لِلّٰهِ عَلَى مَا هَدَانَا، وَالْحَمْدُ لِلّٰهِ عَلَى مَا أَنْعَمَنَا بِهِ عَلَيْنَا",
    latin: "Alhamdu lillaahi 'alaa maa hadaanaa, walhamdu lillaahi 'alaa maa an'amanaa bihii 'alainaa.",
    doaId: "STEP-UMR-05"
  }
];

const HAJI_STEPS = [
  {
    step: 1,
    date: "8 Dzulhijjah (Hari Tarwiyah)",
    title: "Ihram Haji & Menuju Mina",
    desc: "Berniat ihram haji dari hotel pemondokan di Makkah, bertalbiyah, lalu berangkat menuju Mina untuk mabit dan sholat lima waktu di sana.",
    doaTitle: "Lafaz Niat Ihram Haji",
    arabic: "لَبَّيْكَ اللّٰهُمَّ حَجًّا",
    latin: "Labbaika Allahumma hajjan.",
    doaId: "STEP-HAJ-01"
  },
  {
    step: 2,
    date: "9 Dzulhijjah (Puncak Haji)",
    title: "Wukuf di Padang Arafah",
    desc: "Rukun haji terpenting. Berdiam diri di Arafah mulai tergelincir matahari (Dzuhur) hingga terbenam matahari (Maghrib). Memperbanyak dzikir, doa, dan istighfar.",
    doaTitle: "Doa Wukuf Terbaik di Arafah",
    arabic: "لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu, yuhyii wa yumiitu, wa huwa 'alaa kulli syai-in qadiir.",
    doaId: "STEP-HAJ-02"
  },
  {
    step: 3,
    date: "Malam 10 Dzulhijjah",
    title: "Mabit di Muzdalifah & Ambil Kerikil",
    desc: "Setelah terbenam matahari di Arafah, bergerak menuju Muzdalifah. Sholat Maghrib dan Isya jamak qashar, mabit hingga lewat tengah malam, serta mengumpulkan kerikil untuk Jamarat.",
    doaTitle: "Dzikir di Masy'aril Haram (Muzdalifah)",
    arabic: "فَإِذَا أَفَضْتُمْ مِنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِنْدَ الْمَشْعَرِ الْحَرَامِ",
    latin: "Faidzaa afadhtum min 'Arafaatin fadzkurullaaha 'indal-masy'aril-haraam.",
    doaId: "STEP-HAJ-03"
  },
  {
    step: 4,
    date: "10 Dzulhijjah (Hari Nahar)",
    title: "Melontar Jamarat Aqabah & Tahallul Awal",
    desc: "Menuju Mina untuk melontar Jamarat Aqabah sebanyak 7 butir kerikil sambil bertakbir setiap lontaran. Dilanjutkan potong rambut (Tahallul Awal).",
    doaTitle: "Takbir Setiap Melontar Kerikil",
    arabic: "بِسْمِ اللّٰهِ، وَاللّٰهُ أَكْبَرُ، رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمٰنِ",
    latin: "Bismillaahi wallaahu Akbar, raghman lisysyaitaani wa ridhan lir-Rahmaan.",
    doaId: "STEP-HAJ-04"
  },
  {
    step: 5,
    date: "10 - 11 Dzulhijjah",
    title: "Thawaf Ifadhah & Sa'i Haji di Masjidil Haram",
    desc: "Menuju Masjidil Haram untuk melakukan Thawaf Ifadhah (Rukun Haji) dan Sa'i Haji. Memasuki Tahallul Tsani di mana seluruh larangan ihram halal kembali.",
    doaTitle: "Doa Thawaf Ifadhah",
    arabic: "اللّٰهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا، وَذَنْبًا مَغْفُورًا، وَسَعْيًا مَشْكُورًا",
    latin: "Allahummaj'alhu hajjan mabruuraa, wa dzanban maghfuuraa, wa sa'yan masjkuuraa.",
    doaId: "STEP-HAJ-05"
  },
  {
    step: 6,
    date: "11, 12, (13) Dzulhijjah",
    title: "Mabit di Mina & Melontar 3 Jamarat (Hari Tasyriq)",
    desc: "Mabit di tenda Mina. Ba'da zawal melontar 3 tugu Jamarat: Ula, Wustha, dan Aqabah masing-masing 7 kerikil (Nafar Awal 12 Dzulhijjah, Nafar Tsani 13 Dzulhijjah).",
    doaTitle: "Doa Ba'da Melontar Jamarat",
    arabic: "اللّٰهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَتِجَارَةً لَنْ تَبُورَ",
    latin: "Allahummaj'alhu hajjan mabruuraa wa tijaaratan lan tabuur.",
    doaId: "STEP-HAJ-06"
  },
  {
    step: 7,
    date: "Sebelum Pulang ke Tanah Air",
    title: "Thawaf Wada' (Perpisahan)",
    desc: "Thawaf 7 putaran perpisahan dengan Baitullah sebelum meninggalkan kota suci Makkah Al-Mukarramah.",
    doaTitle: "Doa Thawaf Wada'",
    arabic: "اللّٰهُمَّ لَا تَجْعَلْ هٰذَا آخِرَ الْعَهْدِ بِبَيْتِكَ الْحَرَامِ، وَإِنْ جَعَلْتَهُ فَاعْوِضْنِي عَنْهُ الْجَنَّةَ",
    latin: "Allahumma laa taj'al haadzaa aakhiral 'ahdi bibaitikal-haraam, wa in ja'altahu fa'widh-nii 'anhul jannah.",
    doaId: "STEP-HAJ-07"
  }
];

export default function WorshipEducationView({
  onOpenCounter,
  onOpenTasbih,
  onOpenTalbiyah,
  onOpenKajian,
  onOpenChecklist,
  onOpenMap,
  onOpenNusuk
}) {
  const [guideMode, setGuideMode] = useState('umrah'); // 'umrah' | 'haji'
  const [playingDoaId, setPlayingDoaId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTogglePlayAudio = (id, arabicText) => {
    if (playingDoaId === id) {
      sounds.stopAll();
      setPlayingDoaId(null);
    } else {
      sounds.stopAll();
      setPlayingDoaId(id);
      sounds.recitePrayer(
        id,
        arabicText,
        () => setPlayingDoaId(id),
        () => setPlayingDoaId(null)
      );
    }
  };

  const filteredDoa = INITIAL_DOA_MANASIK.filter(doa => {
    const matchesCategory = selectedCategory === 'all' || doa.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      doa.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doa.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doa.latin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 mx-3 sm:mx-6 mt-3">
      {/* 1. Header Banner: Dignified Syar'i */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#101b25] border border-amber-900/30 shadow-xl space-y-3">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/70 text-amber-400 border border-amber-600/30 inline-block">
          Panduan Manasik & Edukasi Ibadah Sunnah
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white font-serif leading-snug">
          Tata Cara Umrah & Haji Sesuai Sunnah
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Dilengkapi urutan rukun ibadah, tombol putar audio bacaan doa berbahasa Arab, serta alat bantu interaktif digital.
        </p>
      </div>

      {/* 2. Quick Interactive Tools Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Alat Bantu Ibadah Interaktif
          </span>
          <span className="text-[10px] text-amber-300 font-semibold">Offline Ready</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={onOpenCounter}
            className="p-3 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <span className="w-8 h-8 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/30 flex items-center justify-center group-hover:scale-105 transition">
              <Compass className="w-4 h-4" />
            </span>
            <div className="pt-2">
              <strong className="text-xs text-white block">Tawaf Counter</strong>
              <span className="text-[10px] text-slate-400">Hitung 7 putaran</span>
            </div>
          </button>

          <button
            onClick={onOpenTasbih}
            className="p-3 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <span className="w-8 h-8 rounded-xl bg-[#182736] text-amber-300 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4" />
            </span>
            <div className="pt-2">
              <strong className="text-xs text-white block">Tasbih Digital</strong>
              <span className="text-[10px] text-slate-400">Target zikir & getar</span>
            </div>
          </button>

          <button
            onClick={onOpenTalbiyah}
            className="p-3 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <span className="w-8 h-8 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/30 flex items-center justify-center group-hover:scale-105 transition">
              <Volume2 className="w-4 h-4" />
            </span>
            <div className="pt-2">
              <strong className="text-xs text-white block">Audio Talbiyah</strong>
              <span className="text-[10px] text-slate-400">Lafaz merdu</span>
            </div>
          </button>

          <button
            onClick={onOpenMap}
            className="p-3 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <span className="w-8 h-8 rounded-xl bg-amber-950/70 text-amber-400 border border-amber-600/30 flex items-center justify-center group-hover:scale-105 transition">
              <MapPin className="w-4 h-4" />
            </span>
            <div className="pt-2">
              <strong className="text-xs text-white block">Denah & Peta</strong>
              <span className="text-[10px] text-slate-400">Mataf, Nabawi, Miqat</span>
            </div>
          </button>

          <button
            onClick={onOpenChecklist}
            className="p-3 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <span className="w-8 h-8 rounded-xl bg-[#182736] text-amber-300 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition">
              <CheckSquare className="w-4 h-4" />
            </span>
            <div className="pt-2">
              <strong className="text-xs text-white block">Koper & Dokumen</strong>
              <span className="text-[10px] text-slate-400">Checklist barang</span>
            </div>
          </button>

          <button
            onClick={onOpenKajian}
            className="p-3 rounded-2xl bg-[#101b25] border border-amber-900/20 hover:border-amber-500/40 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <span className="w-8 h-8 rounded-xl bg-[#182736] text-amber-300 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition">
              <Calendar className="w-4 h-4" />
            </span>
            <div className="pt-2">
              <strong className="text-xs text-white block">Kajian Tasik</strong>
              <span className="text-[10px] text-slate-400">Jadwal Asatidz</span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Step-by-Step Manasik Guide with Direct Recitation Audio */}
      <div className="space-y-4">
        {/* Toggle Mode */}
        <div className="flex bg-[#101b25] p-1.5 rounded-2xl border border-amber-900/30 max-w-md">
          <button
            onClick={() => setGuideMode('umrah')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
              guideMode === 'umrah'
                ? 'bg-[#b45309] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rukun Manasik Umrah (5 Langkah)
          </button>
          <button
            onClick={() => setGuideMode('haji')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
              guideMode === 'haji'
                ? 'bg-[#b45309] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Alur Ibadah Haji (Armuzna)
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-3.5">
          {(guideMode === 'umrah' ? UMRAH_STEPS : HAJI_STEPS).map((item, idx) => {
            const isPlayingThisStep = playingDoaId === item.doaId;

            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-3xl bg-[#101b25] border border-amber-900/30 hover:border-amber-500/40 transition shadow-md space-y-3"
              >
                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-amber-950/70 text-amber-400 font-mono font-bold text-sm flex items-center justify-center border border-amber-600/30 flex-shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {item.title}
                      </h4>
                      {item.date && (
                        <span className="text-[11px] font-semibold text-amber-300">
                          {item.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.place && (
                    <span className="text-[10px] text-slate-300 bg-black/40 px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1 w-fit">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{item.place}</span>
                    </span>
                  )}
                </div>

                {/* Step Description */}
                <p className="text-xs text-slate-300 leading-relaxed pl-1 sm:pl-12">
                  {item.desc}
                </p>

                {/* Step Dua Snippet & Audio Recitation Button */}
                {item.arabic && (
                  <div className="ml-0 sm:ml-12 p-3 sm:p-4 rounded-2xl bg-[#0b141d] border border-amber-900/40 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.doaTitle}</span>
                      </span>

                      {/* Tombol Putar Audio Bacaan */}
                      <button
                        onClick={() => handleTogglePlayAudio(item.doaId, item.arabic)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                          isPlayingThisStep
                            ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                            : 'bg-[#b45309] hover:bg-[#c2410c] text-white'
                        }`}
                      >
                        {isPlayingThisStep ? (
                          <>
                            <Square className="w-3 h-3 fill-white" />
                            <span>Hentikan</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-200" />
                            <span>Putar Audio Bacaan</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-right text-base sm:text-lg font-arabic text-amber-200 dir-rtl leading-relaxed pt-1">
                      {item.arabic}
                    </p>

                    <p className="text-[11px] text-slate-400 italic font-mono">
                      "{item.latin}"
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Kumpulan Doa Saku Lengkap dengan Tombol Putar Audio Bacaan */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#101b25] border border-amber-900/30 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
              Koleksi Doa Saku Manasik
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white font-serif">
              Doa-Doa Pilihan Dilengkapi Audio Bacaan Bahasa Arab
            </h3>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari doa atau arti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#0b141d] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          {[
            { id: 'all', label: 'Semua Doa' },
            { id: 'ihram', label: 'Ihram & Talbiyah' },
            { id: 'thawaf', label: 'Thawaf Ka\'bah' },
            { id: 'sai', label: 'Sa\'i Safa-Marwah' },
            { id: 'masjid', label: 'Masjid & Zamzam' },
            { id: 'haji', label: 'Wukuf & Armuzna' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-[#b45309] text-white shadow'
                  : 'bg-[#0b141d] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Prayer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredDoa.map((doa) => {
            const isPlaying = playingDoaId === doa.id;

            return (
              <div
                key={doa.id}
                className="p-4 rounded-2xl bg-[#0b141d] border border-amber-900/30 hover:border-amber-500/40 transition space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-400">{doa.title}</span>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      {doa.category}
                    </span>
                  </div>

                  <p className="text-right text-base sm:text-lg font-arabic text-amber-100 dir-rtl leading-relaxed">
                    {doa.arabic}
                  </p>

                  <p className="text-[11px] text-amber-200/80 font-mono italic">
                    "{doa.latin}"
                  </p>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-slate-200">Arti:</strong> {doa.meaning}
                  </p>
                </div>

                {/* Tombol Putar Audio Bacaan Doa */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Lafaz Arab Asli</span>

                  <button
                    onClick={() => handleTogglePlayAudio(doa.id, doa.arabic)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                      isPlaying
                        ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                        : 'bg-[#b45309] hover:bg-[#c2410c] text-white'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-3 h-3 fill-white" />
                        <span>Hentikan Bacaan</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-200" />
                        <span>Putar Audio Bacaan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
