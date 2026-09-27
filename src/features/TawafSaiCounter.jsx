import React, { useState } from 'react';
import { RotateCcw, CheckCircle, Volume2, Sparkles, X, ChevronRight, HelpCircle } from 'lucide-react';
import { sounds } from '../services/soundEffects';

const TAWAF_DUAS = [
  {
    round: 1,
    title: "Putaran ke-1 (Mulai dari Hajar Aswad)",
    arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ ﷺ",
    latin: "Bismillaahi wallaahu Akbar, Allahumma iimaanan bika wa tashdiiqan bikitaabika wa wafaa-an bi'ahdika wattibaa'an lisunnati Nabiyyika Muhammadin shallallaahu 'alaihi wasallam.",
    meaning: "Dengan nama Allah, Allah Maha Besar. Ya Allah, demi keimanan kepada-Mu, pembenaran terhadap kitab suci-Mu, penunaian janji kepada-Mu, dan mengikuti sunnah Nabi-Mu Muhammad ﷺ."
  },
  {
    round: 2,
    title: "Putaran ke-2",
    arabic: "اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ، وَالْحَرَمَ حَرَمُكَ، وَالْأَمْنَ أَمْنُكَ، وَهَذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ",
    latin: "Allahumma inna haadzal baita baituk, wal-harama haramuk, wal-amna amnuk, wa haadzaa maqaamul 'aa-idzi bika minan-naar.",
    meaning: "Ya Allah, sesungguhnya rumah ini adalah rumah-Mu, tanah suci ini tanah suci-Mu, ketenteraman ini ketenteraman-Mu, dan tempat ini adalah tempat perlindungan bagi orang yang berlindung kepada-Mu dari api neraka."
  },
  {
    round: 3,
    title: "Putaran ke-3",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ وَالشِّقَاقِ وَالنِّفَاقِ وَسُوءِ الْأَخْلَاقِ وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ وَالْوَلَدِ",
    latin: "Allahumma innii a'uudzu bika minasy-syakki wasy-syirki wasy-syiqaaqi wan-nifaaqi wa suu-il akhlaaq, wa suu-il munqalabi fil maali wal-ahli wal-walad.",
    meaning: "Ya Allah, aku berlindung kepada-Mu dari keraguan, kemusyrikan, perpecahan, kemunafikan, akhlak yang buruk, serta buruknya tempat kembali dalam harta, keluarga, dan anak."
  },
  {
    round: 4,
    title: "Putaran ke-4",
    arabic: "اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا، وَذَنْبًا مَغْفُورًا، وَسَعْيًا مَشْكُورًا، وَتِجَارَةً لَنْ تَبُورَ، يَا عَالِمَ مَا فِي الصُّدُورِ",
    latin: "Allahummaj'alhu hajjan mabruuraa, wa dzanban maghfuuraa, wa sa'yan masjkuuraa, wa tijaaratan lan tabuur, yaa 'aalima maa fish-shuduur.",
    meaning: "Ya Allah, jadikanlah ibadah ini haji/umrah yang mabrur, dosa yang diampuni, sa'i yang disyukuri, dan perniagaan yang tidak pernah rugi, wahai Dzat Yang Maha Mengetahui apa yang ada di dalam dada."
  },
  {
    round: 5,
    title: "Putaran ke-5",
    arabic: "اللَّهُمَّ أَظِلَّنِي تَحْتَ ظِلِّ عَرْشِكَ يَوْمَ لَا ظِلَّ إِلَّا ظِلُّكَ، وَاسْقِنِي مِنْ حَوْضِ نَبِيِّكَ مُحَمَّدٍ ﷺ شَرْبَةً لَا أَظْمَأُ بَعْدَهَا أَبَدًا",
    latin: "Allahumma azhillanii tahta zhilli 'arsyika yauma laa zhilla illaa zhilluk, was-qinii min haudhi Nabiyyika Muhammadin ﷺ syarbatan laa azhma-u ba'dahaa abadaa.",
    meaning: "Ya Allah, naungilah aku di bawah naungan 'Arsy-Mu pada hari tiada naungan selain naungan-Mu, dan berilah aku minum dari telaga Nabi-Mu Muhammad ﷺ dengan tegukan yang tidak akan membuatku dahaga selamanya."
  },
  {
    round: 6,
    title: "Putaran ke-6",
    arabic: "اللَّهُمَّ إِنَّ لَكَ عَلَيَّ حُقُوقًا كَثِيرَةً فِيمَا بَيْنِي وَبَيْنَكَ، وَحُقُوقًا كَثِيرَةً فِيمَا بَيْنِي وَبَيْنَ خَلْقِكَ، فَاغْفِرْ لِي مَا كَانَ لَكَ",
    latin: "Allahumma inna laka 'alayya huquuqan katsiiratan fiimaa bainii wa bainak, wa huquuqan katsiiratan fiimaa bainii wa baina khalqik, fagh-firlii maa kaana lak.",
    meaning: "Ya Allah, sesungguhnya Engkau memiliki banyak hak atasku dalam hubungan antara aku dan Engkau, dan begitu banyak hak antara aku dan makhluk-Mu, maka ampunilah apa yang menjadi hak-Mu."
  },
  {
    round: 7,
    title: "Putaran ke-7 (Menuju Rukun Yamani & Maqam Ibrahim)",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ إِيمَانًا كَامِلًا، وَيَقِينًا صَادِقًا، وَرِزْقًا وَاسِعًا، وَقَلْبًا خَاشِعًا، وَلِسَانًا ذَاكِرًا، وَتَوْبَةً نَصُوحًا قَبْلَ الْمَوْتِ",
    latin: "Allahumma innii as-aluka iimaanan kaamilaa, wa yaqiinan shaadiqa, wa rizqan waasi'aa, wa qalban khaasyi'aa, wa lisaanan dzaakiraa, wa taubatan nashuuha qablal maut.",
    meaning: "Ya Allah, aku memohon kepada-Mu keimanan yang sempurna, keyakinan yang benar, rezeki yang lapang, hati yang khusyuk, lisan yang senantiasa berdzikir, dan taubat nasuha sebelum maut menjemput."
  }
];

const SAI_DUAS = [
  {
    round: 1,
    title: "Perjalanan ke-1 (Dari Safa menuju Marwah)",
    arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا",
    latin: "Innash-shafaa wal-marwata min sya'aa-irillaah, faman hajjal-baita awi'-tamara falaa junaaha 'alaihi ay-yath-thawwafa bihimaa.",
    meaning: "Sesungguhnya Safa dan Marwah adalah sebagian dari syiar-syiar Allah..."
  },
  {
    round: 2,
    title: "Perjalanan ke-2 (Dari Marwah menuju Safa)",
    arabic: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ عَمَّا تَعْلَمْ، وَأَنْتَ الْأَعَزُّ الْأَكْرَمُ",
    latin: "Rabbigh-fir warham, wa'fu 'ammaa ta'lam, wa Antal A'azzul Akram.",
    meaning: "Wahai Tuhanku, ampunilah, sayangilah, dan maafkanlah apa-apa yang Engkau ketahui. Sesungguhnya Engkaulah Yang Maha Mulia lagi Maha Pemurah."
  },
  {
    round: 3,
    title: "Perjalanan ke-3 (Dari Safa menuju Marwah)",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ، وَعَزَائِمَ مَغْفِرَتِكَ، وَالسَّلَامَةَ مِنْ كُلِّ إِثْمٍ، وَالْغَنِيمَةَ مِنْ كُلِّ بِرٍّ",
    latin: "Allahumma innii as-aluka muujibaati rahmatik, wa 'azaa-ima maghfiratik, was-salaamata min kulli itsm, wal-ghaniimata min kulli birr.",
    meaning: "Ya Allah, aku memohon kepada-Mu sebab-sebab limpahan rahmat-Mu dan ketetapan ampunan-Mu, keselamatan dari segala dosa, dan keberuntungan dari setiap kebaikan."
  },
  {
    round: 4,
    title: "Perjalanan ke-4 (Dari Marwah menuju Safa)",
    arabic: "اللَّهُمَّ كَمَا هَدَيْتَنَا لِلْإِسْلَامِ فَلَا تَنْزِعْهُ مِنَّا حَتَّى تَتَوَفَّانَا وَنَحْنُ مُسْلِمُونَ",
    latin: "Allahumma kamaa hadaitanaa lil-Islaami falaa tanzi'hu minnaa hattaa tatawaffaanaa wa nahnu muslimuun.",
    meaning: "Ya Allah, sebagaimana Engkau telah memberi kami hidayah kepada Islam, janganlah Engkau cabut iman itu dari kami hingga Engkau wafatkan kami dalam keadaan muslim."
  },
  {
    round: 5,
    title: "Perjalanan ke-5 (Dari Safa menuju Marwah)",
    arabic: "اللَّهُمَّ اغْفِرْ لَنَا ذُنُوبَنَا، وَكَفِّرْ عَنَّا سَيِّئَاتِنَا، وَتَوَفَّنَا مَعَ الْأَبْرَارِ",
    latin: "Allahummagh-fir lanaa dzunuubanaa, wa kaffir 'annaa sayyi-aatinaa, wa tawaffanaa ma'al abraar.",
    meaning: "Ya Allah, ampunilah dosa-dosa kami, hapuskanlah kesalahan-kesalahan kami, dan wafatkanlah kami bersama orang-orang yang berbakti."
  },
  {
    round: 6,
    title: "Perjalanan ke-6 (Dari Marwah menuju Safa)",
    arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي بَصَرِي نُورًا، وَفِي سَمْعِي نُورًا، وَعَنْ يَمِينِي نُورًا، وَعَنْ يَسَارِي نُورًا",
    latin: "Allahummaj'al fii qalbii nuuraa, wa fii basharii nuuraa, wa fii sam'ii nuuraa, wa 'an yamiinii nuuraa, wa 'an yasaarii nuuraa.",
    meaning: "Ya Allah, jadikanlah cahaya dalam hatiku, cahaya pada penglihatanku, cahaya pada pendengaranku, cahaya di sebelah kananku, dan cahaya di sebelah kiriku."
  },
  {
    round: 7,
    title: "Perjalanan ke-7 (Berakhir di Bukit Marwah untuk Tahallul)",
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ، وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    latin: "Rabbanaa taqabbal minnaa innaka Antas-Samii'ul 'Aliim, wa tub 'alainaa innaka Antat-Tawwaabur Rahiim.",
    meaning: "Wahai Tuhan kami, terimalah amal ibadah dari kami, sesungguhnya Engkau Maha Mendengar lagi Maha Mengetahui. Dan terimalah taubat kami, sesungguhnya Engkau Maha Penerima taubat lagi Maha Penyayang."
  }
];

export default function TawafSaiCounter({ onClose }) {
  const [mode, setMode] = useState('thawaf'); // 'thawaf' | 'sai'
  const [currentRound, setCurrentRound] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const duasList = mode === 'thawaf' ? TAWAF_DUAS : SAI_DUAS;
  const currentDua = duasList[currentRound - 1] || duasList[0];

  const handleNext = () => {
    sounds.stopAll();
    setIsPlayingAudio(false);
    if (currentRound < 7) {
      sounds.playClick();
      setCurrentRound(prev => prev + 1);
    } else {
      sounds.playRoundComplete();
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    sounds.stopAll();
    setIsPlayingAudio(false);
    sounds.playClick();
    setCurrentRound(1);
    setIsCompleted(false);
  };

  const handleClose = () => {
    sounds.stopAll();
    setIsPlayingAudio(false);
    onClose();
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      sounds.stopAll();
      setIsPlayingAudio(false);
    } else {
      sounds.stopAll();
      setIsPlayingAudio(true);
      sounds.recitePrayer(
        `counter-${mode}-${currentRound}`,
        currentDua.arabic,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14222e] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1720] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-600/30 text-orange-400 border border-orange-500/40">
              <RotateCcw className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-white">
                {mode === 'thawaf' ? "Penghitung Thawaf Ka'bah" : "Penghitung Sa'i Safa-Marwah"}
              </h3>
              <p className="text-[11px] text-slate-400">
                Putaran 1 s/d 7 dengan getaran & doa sunnah
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-3 bg-[#111c26] border-b border-white/5 flex gap-2">
          <button
            onClick={() => {
              setMode('thawaf');
              handleReset();
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              mode === 'thawaf'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Thawaf (7 Putaran)
          </button>
          <button
            onClick={() => {
              setMode('sai');
              handleReset();
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              mode === 'sai'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Sa'i (7 Kali Perjalanan)
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Completed State */}
          {isCompleted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle className="w-12 h-12" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Alhamdulillah Selesai
                </span>
                <h4 className="text-2xl font-black text-white">
                  7 Putaran Sempurna!
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {mode === 'thawaf'
                    ? "Alhamdulillah, Anda telah menyelesaikan 7 putaran Thawaf. Selanjutnya disunnahkan Sholat Sunnah 2 Rakaat di belakang Maqam Ibrahim dan meminum Air Zamzam."
                    : "Alhamdulillah, 7 perjalanan Sa'i telah selesai di Bukit Marwah. Selanjutnya lakukan Tahallul (mencukur atau memotong sebagian rambut) untuk menyempurnakan Umrah."}
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
                >
                  Ulangi Counter
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold shadow-lg transition"
                >
                  Tutup & Lanjutkan Ibadah
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Circular Big Step Indicator */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {/* Outer glowing track */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      stroke="#223344"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      stroke="#ea580c"
                      strokeWidth="10"
                      strokeDasharray={477}
                      strokeDashoffset={477 - (477 * currentRound) / 7}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-300"
                    />
                  </svg>

                  {/* Centered Counter Action */}
                  <button
                    onClick={handleNext}
                    className="absolute inset-4 rounded-full bg-gradient-to-b from-[#1b2b3a] to-[#121c25] hover:from-[#233547] hover:to-[#17232e] border-2 border-orange-500/50 flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(234,88,12,0.3)] active:scale-95 transition-all group"
                  >
                    <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                      Putaran
                    </span>
                    <span className="text-5xl font-black text-white group-hover:scale-105 transition-transform font-mono">
                      {currentRound}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                      dari 7 Putaran
                    </span>
                    <span className="text-[9px] text-orange-300 bg-orange-950/60 px-2 py-0.5 rounded-full mt-1 border border-orange-500/30">
                      Sentuh untuk Tambah +1
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Setiap ketukan memicu suara & haptic getaran HP</span>
                </div>
              </div>

              {/* Recommended Prayer Card for this round */}
              <div className="bg-[#0b141d] border border-amber-900/40 rounded-2xl p-4 space-y-3 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentDua.title}</span>
                  </span>
                  <span className="text-[10px] text-amber-200 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    Doa Dianjurkan
                  </span>
                </div>

                {/* Arabic Text */}
                <p className="text-right text-lg sm:text-xl font-arabic text-amber-200 leading-relaxed dir-rtl pt-1">
                  {currentDua.arabic}
                </p>

                {/* Latin */}
                <p className="text-xs text-amber-100/80 italic font-mono leading-relaxed bg-black/30 p-2.5 rounded-xl border border-white/5">
                  "{currentDua.latin}"
                </p>

                {/* Meaning */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Artinya:</strong> {currentDua.meaning}
                </p>

                {/* Tombol Putar Audio Bacaan Doa Putaran Ini */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Audio Bahasa Arab</span>
                  <button
                    onClick={handleToggleAudio}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                      isPlayingAudio
                        ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                        : 'bg-[#b45309] hover:bg-[#c2410c] text-white'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Square className="w-3 h-3 fill-white" />
                        <span>Hentikan Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-200" />
                        <span>Putar Audio Doa</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {!isCompleted && (
          <div className="p-4 bg-[#0d1720] border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Counter</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{currentRound < 7 ? `Selesai Putaran ${currentRound} (Lanjut)` : 'Selesaikan Putaran ke-7'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
