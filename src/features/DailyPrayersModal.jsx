import React, { useState } from 'react';
import {
  X,
  Search,
  Copy,
  Check,
  Bookmark,
  Share2,
  Sparkles,
  BookOpen,
  Compass,
  Heart,
  Plane,
  Home
} from 'lucide-react';

const DAILY_PRAYERS_DATA = [
  // Kategori: Sehari-hari
  {
    id: 'doa-1',
    category: 'harian',
    title: 'Doa Bangun Tidur',
    arabic: 'الْحَمْدُ لِلّٰهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ',
    latin: 'Alhamdulillaahil-ladzii ahyaanaa ba‘da maa amaatanaa wa ilaihin-nusyuur.',
    meaning: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami (tidur) dan hanya kepada-Nya kami akan dibangkitkan.',
    source: 'HR. Bukhari no. 6312 & Muslim no. 2711'
  },
  {
    id: 'doa-2',
    category: 'harian',
    title: 'Doa Sebelum Tidur',
    arabic: 'بِاسْمِكَ اللّٰهُمَّ أَمُوْتُ وَأَحْيَا',
    latin: 'Bismika Allaahumma amuutu wa ahyaa.',
    meaning: 'Dengan menyebut nama-Mu ya Allah, aku mati dan aku hidup.',
    source: 'HR. Bukhari no. 6324'
  },
  {
    id: 'doa-3',
    category: 'harian',
    title: 'Doa Keluar Rumah',
    arabic: 'بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ',
    latin: 'Bismillaahi tawakkaltu ‘alallaah, laa haula wa laa quwwata illaa billaah.',
    meaning: 'Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah.',
    source: 'HR. Abu Daud no. 5095 & Tirmidzi no. 3426'
  },
  {
    id: 'doa-4',
    category: 'harian',
    title: 'Doa Masuk Rumah',
    arabic: 'بِسْمِ اللّٰهِ وَلَجْنَا، وَبِسْمِ اللّٰهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    latin: 'Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa ‘alaa rabbinaa tawakkalnaa.',
    meaning: 'Dengan nama Allah kami masuk, dan dengan nama Allah kami keluar, dan kepada Tuhan kami, kami bertawakal.',
    source: 'HR. Abu Daud no. 5096'
  },
  {
    id: 'doa-5',
    category: 'harian',
    title: 'Doa Masuk Masjid',
    arabic: 'اللّٰهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ',
    latin: 'Allaahummaftah lii abwaaba rahmatik.',
    meaning: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
    source: 'HR. Muslim no. 713'
  },
  {
    id: 'doa-6',
    category: 'harian',
    title: 'Doa Keluar Masjid',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: 'Allaahumma innii as-aluka min fadhlik.',
    meaning: 'Ya Allah, sesungguhnya aku memohon sebagian dari karunia-Mu.',
    source: 'HR. Muslim no. 713'
  },
  {
    id: 'doa-7',
    category: 'harian',
    title: 'Doa Setelah Adzan',
    arabic: 'اللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيْلَةَ وَالْفَضِيْلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُوْدًا الَّذِيْ وَعَدْتَهُ',
    latin: 'Allaahumma rabba haadzihid-da‘watit-taammah, wash-shalaatil-qaa-imah, aati Muhammadanil-wasiilata wal-fadhiilah, wab‘atshu maqaamam-mahmuudanil-ladzii wa‘adtah.',
    meaning: 'Ya Allah, Tuhan pemilik seruan yang sempurna ini dan sholat yang senantiasa ditegakkan, berikanlah kepada Nabi Muhammad wasilah dan keutamaan, serta tempatkanlah ia pada kedudukan terpuji yang telah Engkau janjikan kepadanya.',
    source: 'HR. Bukhari no. 614'
  },

  // Kategori: Perjalanan / Safar
  {
    id: 'doa-8',
    category: 'safar',
    title: 'Doa Naik Kendaraan (Pesawat / Bus / Mobil)',
    arabic: 'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ',
    latin: 'Subhaanal-ladzii sakh-khara lanaa haadzaa wa maa kunnaa lahuu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun.',
    meaning: 'Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.',
    source: 'QS. Az-Zukhruf: 13-14 & HR. Muslim no. 1342'
  },
  {
    id: 'doa-9',
    category: 'safar',
    title: 'Doa Memulai Perjalanan Jauh (Safar Umrah/Haji)',
    arabic: 'اللّٰهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هٰذَا وَاطْوِ عَنَّا بُعْدَهُ، اللّٰهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيْفَةُ فِي الْأَهْلِ',
    latin: 'Allaahumma hawwin ‘alainaa safaranaa haadzaa wathwi ‘annaa bu‘dah, Allaahumma Antash-shaahibu fis-safari wal-khaliifatu fil-ahl.',
    meaning: 'Ya Allah, mudahkanlah perjalanan kami ini dan dekatkanlah kejauhannya. Ya Allah, Engkaulah teman dalam perjalanan dan penjaga bagi keluarga yang ditinggalkan.',
    source: 'HR. Muslim no. 1342'
  },
  {
    id: 'doa-10',
    category: 'safar',
    title: 'Doa Singgah di Suatu Tempat / Hotel',
    arabic: 'أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: 'A‘uudzu bikalimaatillaahit-taammaati min syarri maa khalaq.',
    meaning: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa yang telah Dia ciptakan.',
    source: 'HR. Muslim no. 2708'
  },

  // Kategori: Tanah Suci
  {
    id: 'doa-11',
    category: 'tanah_suci',
    title: 'Doa Ketika Melihat Ka\'bah Pertama Kali',
    arabic: 'اللّٰهُمَّ زِدْ هٰذَا الْبَيْتَ تَشْرِيْفًا وَتَعْظِيْمًا وَتَكْرِيْمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَعَظَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيْفًا وَتَكْرِيْمًا وَتَعْظِيْمًا وَبِرًّا',
    latin: 'Allaahumma zid haadzal baita tasyriifan wa ta‘zhiiman wa takriiman wa mahaabah, wa zid man syarrafahuu wa ‘azh-zhamahuu mimman hajjahuu awi‘tamarahuu tasyriifan wa takriiman wa ta‘zhiiman wa birraa.',
    meaning: 'Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan kehebatan pada Baitullah ini. Dan tambahkanlah pula kemuliaan, kehormatan, keagungan, dan kebaikan bagi orang yang memuliakan dan mengagungkannya dari kalangan orang yang berhaji dan berumrah.',
    source: 'HR. Al-Baihaqi & Ibnu Abi Syaibah'
  },
  {
    id: 'doa-12',
    category: 'tanah_suci',
    title: 'Doa Minum Air Zamzam',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ',
    latin: 'Allaahumma innii as-aluka ‘ilman naafi‘an, wa rizqan waasi‘an, wa syifaa-an min kulli daa-in.',
    meaning: 'Ya Allah, sungguh aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan dari segala penyakit.',
    source: 'HR. Ad-Daruquthni no. 2738 & Al-Hakim'
  },
  {
    id: 'doa-13',
    category: 'tanah_suci',
    title: 'Doa Memasuki Kota Makkah Al-Mukarramah',
    arabic: 'اللّٰهُمَّ هٰذَا حَرَمُكَ وَأَمْنُكَ فَحَرِّمْنِيْ عَلَى النَّارِ، وَآمِنِّيْ مِنْ عَذَابِكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    latin: 'Allaahumma haadzaa haramuka wa amnuka faharrimnii ‘alan-naar, wa aaminnii min ‘adzaabika yauma tab‘atsu ‘ibaadak.',
    meaning: 'Ya Allah, kota ini adalah tanah suci-Mu dan tempat keamanan-Mu, maka haramkanlah jasadku dari api neraka, dan amankanlah aku dari siksa-Mu pada hari Engkau membangkitkan hamba-hamba-Mu.',
    source: 'Doa Masyaikh & Ulama Manasik'
  },
  {
    id: 'doa-14',
    category: 'tanah_suci',
    title: 'Salam & Doa Ziarah Makam Rasulullah ﷺ (Madinah)',
    arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُوْلَ اللّٰهِ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ، أَشْهَدُ أَنَّكَ بَلَّغْتَ الرِّسَالَةَ وَأَدَّيْتَ الْأَمَانَةَ وَنَصَحْتَ الْأُمَّةَ',
    latin: 'As-salaamu ‘alaika yaa Rasuulallaahi wa rahmatullaahi wa barakaatuh, asyhadu annaka ballaghtar-risaalah wa addaital-amaanah wa nashahtal-ummah.',
    meaning: 'Keselamatan, rahmat Allah, dan berkah-Nya semoga tercurah kepadamu wahai Rasulullah. Aku bersaksi bahwa engkau telah menyampaikan risalah, menunaikan amanah, dan menasihati umat.',
    source: 'Tuntunan Manasik Kemenag RI'
  },

  // Kategori: Doa Mustajab & Perlindungan
  {
    id: 'doa-15',
    category: 'mustajab',
    title: 'Sayyidul Istighfar (Induk Doa Pengampunan)',
    arabic: 'اللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ خَلَقْتَنِيْ وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ',
    latin: 'Allaahumma Anta Rabbii laa ilaaha illaa Anta khalaqtanii wa anaa ‘abduka wa anaa ‘alaa ‘ahdika wa wa‘dika mastatha‘tu, a‘uudzu bika min syarri maa shana‘tu, abuu-u laka bini‘matika ‘alayya wa abuu-u bidzanbii faghfir lii fa-innahuu laa yaghfirudz-dzunuuba illaa Anta.',
    meaning: 'Ya Allah, Engkaulah Tuhanku, tiada tuhan selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu. Aku senantiasa dalam perjanjian-Mu dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan yang telah kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, sesungguhnya tiada yang dapat mengampuni dosa selain Engkau.',
    source: 'HR. Bukhari no. 6306'
  },
  {
    id: 'doa-16',
    category: 'mustajab',
    title: 'Doa Sapu Jagad (Kebaikan Dunia & Akhirat)',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa ‘adzaaban-naar.',
    meaning: 'Wahai Tuhan kami, berikanlah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    source: 'QS. Al-Baqarah: 201'
  },
  {
    id: 'doa-17',
    category: 'mustajab',
    title: 'Doa untuk Kedua Orang Tua',
    arabic: 'رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا',
    latin: 'Rabbigh-fir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa.',
    meaning: 'Wahai Tuhanku, ampunilah aku dan kedua orang tuaku, dan sayangilah mereka berdua sebagaimana mereka telah mendidikku di waktu kecil.',
    source: 'QS. Al-Isra\': 24'
  },
  {
    id: 'doa-18',
    category: 'mustajab',
    title: 'Doa Menghilangkan Kesedihan & Beban Utang',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    latin: 'Allaahumma innii a‘uudzu bika minal-hammi wal-hazani, wa a‘uudzu bika minal-‘ajzi wal-kasali, wa a‘uudzu bika minal-jubni wal-bukhli, wa a‘uudzu bika min ghalabatid-daini wa qahrir-rijaal.',
    meaning: 'Ya Allah, sungguh aku berlindung kepada-Mu dari rasa gelisah dan sedih, aku berlindung kepada-Mu dari rasa lemah dan malas, aku berlindung kepada-Mu dari sifat pengecut dan kikir, dan aku berlindung kepada-Mu dari lilitan utang dan penindasan orang lain.',
    source: 'HR. Bukhari no. 2893'
  }
];

export default function DailyPrayersModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('semua'); // 'semua' | 'harian' | 'safar' | 'tanah_suci' | 'mustajab'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredPrayers = DAILY_PRAYERS_DATA.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (activeTab === 'semua') return true;
    return item.category === activeTab;
  });

  const handleCopy = (prayer) => {
    const text = `${prayer.title}\n\n${prayer.arabic}\n\n${prayer.latin}\n\nArtinya:\n"${prayer.meaning}"\n\n(${prayer.source} • Aplikasi Kanomas)`;
    navigator.clipboard?.writeText(text);
    setCopiedId(prayer.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl h-[92vh] sm:h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Kumpulan Doa Harian & Safar
              </h2>
              <p className="text-xs text-slate-500">
                Lafaz doa pilihan sesuai Sunnah Rasulullah ﷺ lengkap dengan arti & dalil
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

        {/* SEARCH & CATEGORY CHIPS */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/60 space-y-2.5 flex-shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari doa (misal: safar, bangun tidur, zamzam, orang tua)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Hapus
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setActiveTab('semua')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                activeTab === 'semua'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Semua ({DAILY_PRAYERS_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab('harian')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'harian'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Sehari-hari</span>
            </button>
            <button
              onClick={() => setActiveTab('safar')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'safar'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Perjalanan (Safar)</span>
            </button>
            <button
              onClick={() => setActiveTab('tanah_suci')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'tanah_suci'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Tanah Suci Makkah & Madinah</span>
            </button>
            <button
              onClick={() => setActiveTab('mustajab')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'mustajab'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Doa Mustajab & Hajat</span>
            </button>
          </div>
        </div>

        {/* LIST OF PRAYERS */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredPrayers.map((prayer) => (
            <div
              key={prayer.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-400 transition-all space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <strong className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {prayer.title}
                </strong>
                <button
                  onClick={() => handleCopy(prayer)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1 transition active:scale-95 flex-shrink-0"
                  title="Salin doa"
                >
                  {copiedId === prayer.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Teks Arab */}
              <div className="text-right py-1" dir="rtl">
                <p className="font-arabic text-2xl sm:text-3xl text-slate-900 leading-loose font-semibold">
                  {prayer.arabic}
                </p>
              </div>

              {/* Transliterasi Latin */}
              <div className="mt-3 pt-2 border-t border-slate-100">
                <p className="text-xs sm:text-sm text-amber-700 italic font-medium leading-relaxed">
                  {prayer.latin}
                </p>
              </div>

              {/* Terjemahan */}
              <div className="mt-2">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  "{prayer.meaning}"
                </p>
              </div>

              {/* Riwayat Dalil */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Sumber Dalil: <strong className="text-slate-600">{prayer.source}</strong></span>
              </div>
            </div>
          ))}

          {filteredPrayers.length === 0 && (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <p className="text-sm font-semibold">Tidak ada doa yang cocok dengan pencarian Anda</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-amber-600 font-bold hover:underline"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
