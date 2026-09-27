import React, { useState } from 'react';
import {
  BookOpen,
  Repeat,
  Sparkle,
  Sparkles,
  MapPin,
  Volume2,
  VolumeX,
  Play,
  Square,
  Search,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Check,
  Smartphone
} from 'lucide-react';
import { INITIAL_DOA_MANASIK } from '../services/initialSeed';
import { sounds } from '../services/soundEffects';

const UMRAH_STEPS = [
  {
    step: 1,
    title: "1. Ihram & Berniat di Miqat",
    desc: "Mandi sunnah ihram, mengenakan pakaian ihram (2 lembar kain tanpa jahitan bagi ikhwan), sholat sunnah 2 rakaat di Miqat (misal Dzulhulaifah/Bir Ali atau Yalamlam), lalu berniat Umrah. Dilanjutkan memperbanyak Talbiyah.",
    place: "Titik Miqat (Bir Ali / Yalamlam)",
    doaTitle: "Lafaz Niat Umrah di Miqat",
    arabic: "لَبَّيْكَ اللّٰهُمَّ عُمْرَةً",
    latin: "Labbaika Allahumma 'umratan.",
    doaId: "STEP-UMR-01"
  },
  {
    step: 2,
    title: "2. Thawaf Mengelilingi Ka'bah 7 Putaran",
    desc: "Masuk Masjidil Haram dengan kaki kanan. Memulai Thawaf dari garis Hajar Aswad berlawanan arah jarum jam sebanyak 7 kali putaran penuh. Ka'bah selalu berada di sebelah kiri.",
    place: "Mataf Masjidil Haram",
    doaTitle: "Doa Antara Rukun Yamani & Hajar Aswad (Sapu Jagad)",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanaa aatinaa fid-dunyaa hasanah, wa fil-aakhirati hasanah, wa qinaa 'adzaaban-naar.",
    doaId: "STEP-UMR-02"
  },
  {
    step: 3,
    title: "3. Sholat di Maqam Ibrahim & Minum Zamzam",
    desc: "Setelah selesai putaran ke-7, sholat sunnah thawaf 2 rakaat di belakang Maqam Ibrahim. Minum air zamzam sambil berdiri menghadap kiblat dan memohon kebaikan dunia akhirat.",
    place: "Pelataran Maqam Ibrahim & Zamzam Point",
    doaTitle: "Doa Minum Air Zamzam",
    arabic: "اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ",
    latin: "Allahumma innii as-aluka 'ilman naafi'an, wa rizqan waasi'an, wa syifaa-an min kulli daa-in.",
    doaId: "STEP-UMR-03"
  },
  {
    step: 4,
    title: "4. Sa'i antara Bukit Safa dan Marwah 7 Kali",
    desc: "Mulai dari Bukit Safa menghadap kiblat, bertakbir dan berdoa. Berjalan menuju Bukit Marwah (dihitung 1 kali), lalu kembali ke Safa (dihitung 2 kali) hingga genap 7 kali di Bukit Marwah.",
    place: "Mas'a (Jalur Sa'i Safa-Marwah)",
    doaTitle: "Doa Memulai Sa'i di Bukit Safa",
    arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ. لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    latin: "Innash-shafaa wal-marwata min sya'aa-irillaah. Abda-u bimaa bada-allaahu bih. Laa ilaaha illallaahu wahdahu laa syariika lah.",
    doaId: "STEP-UMR-04"
  },
  {
    step: 5,
    title: "5. Tahallul (Bercukur Rambut)",
    desc: "Mencukur gundul (diutamakan bagi ikhwan) atau memotong minimal 3 helai rambut (bagi akhwat). Dengan tahallul, seluruh larangan ihram kembali halal dan ibadah Umrah telah sempurna.",
    place: "Bukit Marwah / Barber Area",
    doaTitle: "Doa Selesai Tahallul",
    arabic: "الْحَمْدُ لِلّٰهِ عَلَى مَا هَدَانَا، وَالْحَمْدُ لِلّٰهِ عَلَى مَا أَنْعَمَنَا بِهِ عَلَيْنَا",
    latin: "Alhamdu lillaahi 'alaa maa hadaanaa, walhamdu lillaahi 'alaa maa an'amanaa bihii 'alainaa.",
    doaId: "STEP-UMR-05"
  }
];

const TAWAF_ROUNDS = [
  { round: 1, title: "Putaran ke-1 (Hajar Aswad)", arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ", latin: "Bismillaahi wallaahu Akbar, Allahumma iimaanan bika wa tashdiiqan bikitaabika.", doaId: "counter-thawaf-1" },
  { round: 2, title: "Putaran ke-2", arabic: "اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ، وَالْحَرَمَ حَرَمُكَ، وَالْأَمْنَ أَمْنُكَ", latin: "Allahumma inna haadzal baita baituk, wal-harama haramuk, wal-amna amnuk.", doaId: "counter-thawaf-2" },
  { round: 3, title: "Putaran ke-3", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ وَسُوءِ الْأَخْلَاقِ", latin: "Allahumma innii a'uudzu bika minasy-syakki wasy-syirki wa suu-il akhlaaq.", doaId: "counter-thawaf-3" },
  { round: 4, title: "Putaran ke-4", arabic: "اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا، وَذَنْبًا مَغْفُورًا، وَسَعْيًا مَشْكُورًا", latin: "Allahummaj'alhu hajjan mabruuraa, wa dzanban maghfuuraa, wa sa'yan masjkuuraa.", doaId: "counter-thawaf-4" },
  { round: 5, title: "Putaran ke-5", arabic: "اللَّهُمَّ أَظِلَّنِي تَحْتَ ظِلِّ عَرْشِكَ يَوْمَ لَا ظِلَّ إِلَّا ظِلُّكَ", latin: "Allahumma azhillanii tahta zhilli 'arsyika yauma laa zhilla illaa zhilluk.", doaId: "counter-thawaf-5" },
  { round: 6, title: "Putaran ke-6", arabic: "اللَّهُمَّ إِنَّ لَكَ عَلَيَّ حُقُوقًا كَثِيرَةً فِيمَا بَيْنِي وَبَيْنَكَ فَاغْفِرْ لِي", latin: "Allahumma inna laka 'alayya huquuqan katsiiratan fagh-firlii.", doaId: "counter-thawaf-6" },
  { round: 7, title: "Putaran ke-7 (Menuju Maqam Ibrahim)", arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", latin: "Rabbanaa aatinaa fid-dunyaa hasanah, wa fil-aakhirati hasanah, wa qinaa 'adzaaban-naar.", doaId: "counter-thawaf-7" }
];

const SAI_ROUNDS = [
  { round: 1, title: "Lintasan 1 (Safa ke Marwah)", arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ", latin: "Innash-shafaa wal-marwata min sya'aa-irillaah.", doaId: "counter-sai-1" },
  { round: 2, title: "Lintasan 2 (Marwah ke Safa)", arabic: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ عَمَّا تَعْلَمْ، وَأَنْتَ الْأَعَزُّ الْأَكْرَمُ", latin: "Rabbigh-fir warham, wa'fu 'ammaa ta'lam, wa Antal A'azzul Akram.", doaId: "counter-sai-2" },
  { round: 3, title: "Lintasan 3 (Safa ke Marwah)", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ، وَعَزَائِمَ مَغْفِرَتِكَ", latin: "Allahumma innii as-aluka muujibaati rahmatik, wa 'azaa-ima maghfiratik.", doaId: "counter-sai-3" },
  { round: 4, title: "Lintasan 4 (Marwah ke Safa)", arabic: "اللَّهُمَّ كَمَا هَدَيْتَنَا لِلْإِسْلَامِ فَلَا تَنْزِعْهُ مِنَّا حَتَّى تَتَوَفَّانَا وَنَحْنُ مُسْلِمُونَ", latin: "Allahumma kamaa hadaitanaa lil-Islaami falaa tanzi'hu minnaa hattaa tatawaffaanaa.", doaId: "counter-sai-4" },
  { round: 5, title: "Lintasan 5 (Safa ke Marwah)", arabic: "اللَّهُمَّ اغْفِرْ لَنَا ذُنُوبَنَا، وَكَفِّرْ عَنَّا سَيِّئَاتِنَا، وَتَوَفَّنَا مَعَ الْأَبْرَارِ", latin: "Allahummagh-fir lanaa dzunuubanaa, wa kaffir 'annaa sayyi-aatinaa.", doaId: "counter-sai-5" },
  { round: 6, title: "Lintasan 6 (Marwah ke Safa)", arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي بَصَرِي نُورًا، وَفِي سَمْعِي نُورًا", latin: "Allahummaj'al fii qalbii nuuraa, wa fii basharii nuuraa, wa fii sam'ii nuuraa.", doaId: "counter-sai-6" },
  { round: 7, title: "Lintasan 7 (Berakhir di Marwah)", arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ", latin: "Rabbanaa taqabbal minnaa innaka Antas-Samii'ul 'Aliim.", doaId: "counter-sai-7" }
];

const ZIKIR_PRESETS = [
  { name: 'Subhanallah', arabic: 'سُبْحَانَ اللّٰهِ', target: 33 },
  { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلّٰهِ', target: 33 },
  { name: 'Allahu Akbar', arabic: 'اللّٰهُ أَكْبَرُ', target: 33 },
  { name: 'Laa Ilaaha Illallah', arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ', target: 100 },
  { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللّٰهَ', target: 100 },
  { name: 'Shalawat Nabi', arabic: 'اللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ', target: 100 }
];

export default function WorshipEducationView() {
  const [activeSubTab, setActiveSubTab] = useState('doa'); // 'doa' | 'counter' | 'tasbih' | 'steps'
  const [playingDoaId, setPlayingDoaId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Counter State
  const [counterMode, setCounterMode] = useState('thawaf'); // 'thawaf' | 'sai'
  const [round, setRound] = useState(1);
  const [counterFinished, setCounterFinished] = useState(false);

  // Tasbih State
  const [selectedZikir, setSelectedZikir] = useState(ZIKIR_PRESETS[0]);
  const [tasbihCount, setTasbihCount] = useState(0);

  // Toggle Audio Recitation
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

  // Next Round for Counter
  const handleNextRound = () => {
    sounds.playClick();
    if (navigator.vibrate) navigator.vibrate(50);

    if (round < 7) {
      setRound(round + 1);
    } else {
      setCounterFinished(true);
      sounds.playRoundComplete();
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
  };

  const handleResetCounter = () => {
    sounds.playClick();
    setRound(1);
    setCounterFinished(false);
  };

  // Tasbih Tap
  const handleTapTasbih = () => {
    sounds.playClick();
    if (navigator.vibrate) navigator.vibrate(30);
    const next = tasbihCount + 1;
    setTasbihCount(next);

    if (selectedZikir.target > 0 && next % selectedZikir.target === 0) {
      sounds.playRoundComplete();
      if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
    }
  };

  const handleResetTasbih = () => {
    sounds.playClick();
    setTasbihCount(0);
  };

  const filteredDoa = INITIAL_DOA_MANASIK.filter((d) => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.latin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentRoundsData = counterMode === 'thawaf' ? TAWAF_ROUNDS : SAI_ROUNDS;
  const currentActiveRoundData = currentRoundsData[round - 1] || currentRoundsData[0];

  return (
    <div className="space-y-5 pb-24 mx-3 sm:mx-6 mt-3 max-w-4xl mx-auto">
      {/* 1. HEADER PANDUAN IBADAH */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#122332] via-[#0d1a24] to-[#070f16] border border-amber-900/40 shadow-xl space-y-2 text-white">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/80 text-amber-400 border border-amber-600/30 inline-block">
          Panduan Ibadah Syar'i
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-white font-serif leading-snug">
          Bimbingan Manasik Umrah & Haji Sunnah
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          Lengkap dengan audio bacaan doa berbahasa Arab qori asli, counter putaran Tawaf & Sa'i, tasbih zikir digital, serta urutan rukun ibadah resmi Kanomas.
        </p>
      </div>

      {/* 2. TAB NAVIGASI UTAMA IBADAH (4 SEGMEN SANGAT JELAS) */}
      <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-[#0b141d] rounded-2xl border border-white/5 shadow-inner">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveSubTab('doa');
          }}
          className={`py-2.5 px-1 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeSubTab === 'doa'
              ? 'bg-[#b45309] text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span className="text-[11px] truncate">Doa Manasik</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveSubTab('counter');
          }}
          className={`py-2.5 px-1 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeSubTab === 'counter'
              ? 'bg-[#b45309] text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Repeat className="w-4 h-4 flex-shrink-0" />
          <span className="text-[11px] truncate">Hitung Tawaf</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveSubTab('tasbih');
          }}
          className={`py-2.5 px-1 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeSubTab === 'tasbih'
              ? 'bg-[#b45309] text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkle className="w-4 h-4 flex-shrink-0" />
          <span className="text-[11px] truncate">Tasbih Digital</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveSubTab('steps');
          }}
          className={`py-2.5 px-1 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeSubTab === 'steps'
              ? 'bg-[#b45309] text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span className="text-[11px] truncate">Alur Rukun</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SEKSI 1: KUMPULAN DOA MANASIK BER-AUDIO ARAB                             */}
      {/* ========================================================================= */}
      {activeSubTab === 'doa' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Kotak Pencarian & Filter Kategori */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari judul doa, lafaz Arab, arti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#0f1922] border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            {/* Filter Chips Kategori */}
            <div className="overflow-x-auto flex gap-1.5 no-scrollbar pb-1">
              {[
                { id: 'all', label: 'Semua Doa' },
                { id: 'ihram', label: 'Ihram & Miqat' },
                { id: 'thawaf', label: 'Thawaf Ka\'bah' },
                { id: 'sai', label: 'Sa\'i Safa-Marwah' },
                { id: 'ziarah', label: 'Madinah & Ziarah' },
                { id: 'haji', label: 'Armuzna Haji' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-[#0f1922] text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* List Kartu Doa */}
          <div className="space-y-3">
            {filteredDoa.map((doa) => {
              const isPlaying = playingDoaId === doa.id;

              return (
                <div
                  key={doa.id}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 space-y-3 ${
                    isPlaying
                      ? 'bg-[#102419] border-emerald-500/70 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                      : 'bg-[#0f1922] border-amber-900/30 shadow-md hover:border-amber-500/40'
                  }`}
                >
                  {/* Header Doa: Badge & Judul */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded bg-black/40 text-amber-300 font-mono">
                        {doa.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {doa.title}
                      </h3>
                    </div>

                    {/* Tombol Putar Audio Arab */}
                    <button
                      onClick={() => handleTogglePlayAudio(doa.id, doa.arabic)}
                      className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-md flex-shrink-0 ${
                        isPlaying
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 animate-pulse'
                          : 'bg-[#b45309] hover:bg-[#c2410c] text-white'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Berhenti</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Putar Audio</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Teks Arab (Besar, Jelas & Berjarak Syar'i) */}
                  <div className="py-2 px-3 sm:px-4 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-right text-xl sm:text-2xl leading-loose font-serif text-amber-200 select-all" dir="rtl">
                      {doa.arabic}
                    </p>
                  </div>

                  {/* Teks Latin & Terjemahan */}
                  <div className="space-y-1.5 text-xs">
                    <p className="text-amber-300/90 italic font-sans leading-relaxed">
                      "{doa.latin}"
                    </p>
                    <p className="text-slate-300 leading-relaxed pt-1 border-t border-white/5">
                      <strong className="text-white">Artinya: </strong>
                      {doa.meaning}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEKSI 2: COUNTER TAWAF & SA'I (TERINTEGRASI LANGSUNG DI LAYAR)          */}
      {/* ========================================================================= */}
      {activeSubTab === 'counter' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0f1922] border border-amber-900/30 shadow-xl space-y-4">
            {/* Mode Switcher: Tawaf vs Sa'i */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-2xl border border-white/10">
              <button
                onClick={() => {
                  sounds.playClick();
                  setCounterMode('thawaf');
                  setRound(1);
                  setCounterFinished(false);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  counterMode === 'thawaf'
                    ? 'bg-[#b45309] text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🕋 Thawaf (7 Putaran Ka'bah)
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setCounterMode('sai');
                  setRound(1);
                  setCounterFinished(false);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  counterMode === 'sai'
                    ? 'bg-[#b45309] text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⛰️ Sa'i (Safa - Marwah)
              </button>
            </div>

            {/* Status Selesai atau Indikator Putaran */}
            {counterFinished ? (
              <div className="p-6 rounded-3xl bg-emerald-950/60 border-2 border-emerald-500/60 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-white font-serif">
                  Alhamdulillah! 7 Putaran Telah Selesai
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  {counterMode === 'thawaf'
                    ? "Sempurna sudah 7 putaran Thawaf Anda. Silakan menuju belakang Maqam Ibrahim untuk sholat sunnah thawaf 2 rakaat dan minum air Zamzam."
                    : "Sempurna sudah 7 lintasan Sa'i di bukit Marwah. Lanjutkan dengan Tahallul (mencukur/memotong rambut) untuk menyempurnakan Umrah Anda."}
                </p>
                <button
                  onClick={handleResetCounter}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Mulai Dari Awal
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Visual Lingkaran Putaran */}
                <div className="flex flex-col items-center justify-center py-2 space-y-2">
                  <div className="relative w-36 h-36 rounded-full border-4 border-amber-500/30 flex items-center justify-center bg-[#070e15] shadow-2xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 absolute top-4">
                      {counterMode === 'thawaf' ? 'Putaran Ke' : 'Lintasan Ke'}
                    </span>
                    <span className="text-6xl font-black text-amber-400 font-mono pt-2">
                      {round}
                    </span>
                    <span className="text-xs font-bold text-slate-400 absolute bottom-4 font-mono">
                      dari 7
                    </span>
                  </div>

                  <span className="text-xs font-bold text-white">
                    {currentActiveRoundData.title}
                  </span>
                </div>

                {/* Doa untuk Putaran Saat Ini */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-center">
                  <div className="flex items-center justify-between pb-1 border-b border-white/5">
                    <span className="text-[10px] uppercase font-bold text-amber-300">
                      Doa Putaran ke-{round}
                    </span>
                    <button
                      onClick={() => handleTogglePlayAudio(currentActiveRoundData.doaId, currentActiveRoundData.arabic)}
                      className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 transition shadow"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Putar Audio</span>
                    </button>
                  </div>
                  <p className="text-right text-lg sm:text-xl font-serif text-amber-200 leading-loose" dir="rtl">
                    {currentActiveRoundData.arabic}
                  </p>
                  <p className="text-xs text-amber-300/90 italic">
                    "{currentActiveRoundData.latin}"
                  </p>
                </div>

                {/* Tombol Besar Sentuh Putaran Berikutnya */}
                <button
                  onClick={handleNextRound}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white font-black text-sm sm:text-base shadow-xl transition active:scale-98 border border-amber-300/40 animate-pulse flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>SELESAIKAN PUTARAN KE-{round} (TAP DI SINI)</span>
                </button>

                <div className="flex justify-end">
                  <button
                    onClick={handleResetCounter}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Putaran</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEKSI 3: TASBIH DIGITAL (TERINTEGRASI LANGSUNG DI LAYAR)                  */}
      {/* ========================================================================= */}
      {activeSubTab === 'tasbih' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0f1922] border border-amber-900/30 shadow-xl space-y-4 text-center">
            {/* Pilihan Zikir Preset */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-left">
                Pilih Bacaan Zikir
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ZIKIR_PRESETS.map((z) => (
                  <button
                    key={z.name}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedZikir(z);
                      setTasbihCount(0);
                    }}
                    className={`p-2.5 rounded-2xl text-left border transition ${
                      selectedZikir.name === z.name
                        ? 'bg-[#1b2b20] border-emerald-500 text-emerald-300 shadow-sm'
                        : 'bg-[#070e15] border-white/5 text-slate-300 hover:text-white'
                    }`}
                  >
                    <strong className="text-xs block">{z.name}</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Target: {z.target}x
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Teks Arab Zikir Terpilih */}
            <div className="py-3 px-4 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-2xl sm:text-3xl font-serif text-amber-200 block" dir="rtl">
                {selectedZikir.arabic}
              </span>
            </div>

            {/* Lingkaran Tombol Tap Tasbih Besar */}
            <div className="py-4 flex flex-col items-center justify-center space-y-3">
              <button
                onClick={handleTapTasbih}
                className="w-44 h-44 rounded-full bg-gradient-to-br from-[#123324] via-[#0b1c14] to-[#06100b] border-4 border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95 transition flex flex-col items-center justify-center group"
              >
                <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                  Hitungan
                </span>
                <span className="text-6xl font-black text-white font-mono group-hover:scale-105 transition">
                  {tasbihCount}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Target: {selectedZikir.target}
                </span>
              </button>
              <span className="text-xs text-slate-400">
                Ketuk lingkaran di atas setiap membaca 1 kali zikir (dengan getaran)
              </span>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center pt-1">
              <button
                onClick={handleResetTasbih}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Hitungan (0)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEKSI 4: PANDUAN ALUR RUKUN UMRAH & HAJI                                  */}
      {/* ========================================================================= */}
      {activeSubTab === 'steps' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="space-y-3">
            {UMRAH_STEPS.map((s) => (
              <div
                key={s.step}
                className="p-4 sm:p-5 rounded-3xl bg-[#0f1922] border border-amber-900/30 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#b45309] text-white">
                    Langkah ke-{s.step}
                  </span>
                  <span className="text-xs text-amber-300 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{s.place}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {s.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.desc}
                </p>

                {/* Doa Terkait Langkah Ini */}
                <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-amber-300 font-bold">
                      {s.doaTitle}
                    </span>
                    <button
                      onClick={() => handleTogglePlayAudio(s.doaId, s.arabic)}
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Putar Audio</span>
                    </button>
                  </div>
                  <p className="text-right text-base font-serif text-amber-200" dir="rtl">
                    {s.arabic}
                  </p>
                  <p className="text-[11px] text-slate-300 italic">
                    "{s.latin}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
