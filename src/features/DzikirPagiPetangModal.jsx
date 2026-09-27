import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Check,
  RotateCcw,
  Volume2,
  Copy,
  Share2,
  Sparkles,
  Bookmark,
  ChevronRight,
  Info,
  X,
  CheckCircle2,
  Coffee
} from 'lucide-react';

// DATA DZIKIR PAGI & PETANG SESUAI SUNNAH NABI SHALLALLAHU 'ALAIHI WA SALLAM
// Sumber: Kitab Dzikir Pagi Petang & Setelah Sholat (Syaikh Sa'id bin Ali Al-Qahthani / Hisnul Muslim)

const DZIKIR_PAGI = [
  {
    id: 'pagi-1',
    title: 'Ayat Kursi (QS. Al-Baqarah: 255)',
    target: 1,
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: "Allahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhu sinatuw walaa naum, lahu maa fis-samaawaati wa maa fil-ardh, man dzalladzii yasyfa'u 'indahu illaa bi-idznih, ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bi-syai-im min 'ilmihii illaa bimaa syaa-a, wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya-uuduhuu hifzhuhumaa, wa huwal 'aliyyul 'azhiim.",
    translation: 'Allah, tidak ada tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Maha Tinggi, Maha Besar.',
    dalil: 'HR. Al-Hakim (1/562). Dinilai shahih oleh Syaikh Al-Albani.',
    benefit: 'Siapa yang membacanya di pagi hari akan dilindungi dari gangguan jin hingga petang.'
  },
  {
    id: 'pagi-2',
    title: 'Surah Al-Ikhlas, Al-Falaq, & An-Nas (Dibaca 3x)',
    target: 3,
    arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ هُوَ اللّٰهُ اَحَدٌ ۚ اَللّٰهُ الصَّمَدُ ۚ لَمْ يَلِدْ وَلَمْ يُوْلَدْ ۙ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ\n\nبِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِ ۙ مِنْ شَرِّ مَا خَلَقَ ۙ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ ۙ وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِ ۙ وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ\n\nبِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ اَعُوْذُ بِرَبِّ النَّاسِ ۙ مَلِكِ النَّاسِ ۙ اِلٰهِ النَّاسِ ۙ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۖ الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ۙ مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: 'Membaca Surah Al-Ikhlas, Surah Al-Falaq, dan Surah An-Nas berturut-turut sebanyak 3 kali.',
    translation: 'Katakanlah: Dialah Allah, Yang Maha Esa... Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh... Katakanlah: Aku berlindung kepada Tuhannya manusia...',
    dalil: 'HR. Abu Dawud no. 5082, At-Tirmidzi no. 3575. Hadits Hasan Shahih.',
    benefit: 'Siapa yang membacanya 3 kali setiap pagi dan petang, niscaya akan mencukupkannya dari segala keburukan.'
  },
  {
    id: 'pagi-3',
    title: 'Sayyidul Istighfar (Rajanya Istighfar)',
    target: 1,
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ ، خَلَقْتَنِي وَأَنَا عَبْدُكَ ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: "Allahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa 'abduka, wa anaa 'alaa 'ahdika wa wa'dika mastatha'tu, a'uudzu bika min syarri maa shana'tu, abuu-u laka bini'matika 'alayya, wa abuu-u bi-dzanbii, faghfir lii fa-innahuu laa yaghfirudz-dzunuuba illaa anta.",
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada tuhan yang berhak disembah selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu. Aku senantiasa setia pada perjanjian-Mu dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan apa yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku. Sungguh tidak ada yang dapat mengampuni dosa selain Engkau.',
    dalil: 'HR. Al-Bukhari no. 6306.',
    benefit: 'Barangsiapa membacanya di pagi hari dengan penuh keyakinan lalu wafat pada hari itu sebelum petang, maka ia termasuk penghuni surga.'
  },
  {
    id: 'pagi-4',
    title: 'Doa Memasuki Waktu Pagi',
    target: 1,
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ ، وَالْحَمْدُ لِلَّهِ ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin: "Ashbahnaa wa ashbahal-mulku lillaah, wal-hamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai-in qadiir. Rabbi as-aluka khaira maa fii haadzal-yaumi wa khaira maa ba'dahu, wa a'uudzu bika min syarri maa fii haadzal-yaumi wa syarri maa ba'dahu. Rabbi a'uudzu bika minal-kasali wa suu-il kibar, rabbi a'uudzu bika min 'adzaabin fin-naari wa 'adzaabin fil-qabr.",
    translation: 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada tuhan yang berhak disembah selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Maha Kuasa atas segala sesuatu. Wahai Tuhanku, aku memohon kepada-Mu kebaikan hari ini dan kebaikan sesudahnya, dan aku berlindung kepada-Mu dari keburukan hari ini dan keburukan sesudahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari kemalasan dan keburukan masa tua. Wahai Tuhanku, aku berlindung kepada-Mu dari siksa neraka dan siksa kubur.',
    dalil: 'HR. Muslim no. 2723.',
    benefit: 'Memohon kebaikan sepanjang hari serta perlindungan dari keburukan, rasa malas, dan siksa akhirat.'
  },
  {
    id: 'pagi-5',
    title: 'Doa Perlindungan 4 Penjuru (Afiah Dunia & Akhirat)',
    target: 1,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي ، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي ، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي ، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    latin: "Allahumma innii as-alukal-'afwa wal-'aafiyata fid-dunyaa wal-aakhirah. Allahumma innii as-alukal-'afwa wal-'aafiyata fii diinii wa dunyaaya wa ahlii wa maalii. Allahummastur 'auraatii wa aamin rau'aatii. Allahummahfazhnii mim baini yadayya wa min khalfii wa 'an yamiinii wa 'an syimaalii wa min fauqii, wa a'uudzu bi-'azhamatika an ughtaala min tahtii.",
    translation: 'Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku. Ya Allah, tutuplah aib-aibku dan berikanlah ketenteraman dari rasa takutku. Ya Allah, jagalah aku dari arah depanku, belakangku, sisi kananku, sisi kiriku, dan dari atasku. Dan aku berlindung dengan keagungan-Mu dari bahaya yang menyergapku dari bawahku.',
    dalil: 'HR. Abu Dawud no. 5074, Ibnu Majah no. 3871. Shahih.',
    benefit: 'Benteng perlindungan menyeluruh dari segala marabahaya dari 6 penjuru arah mata angin.'
  },
  {
    id: 'pagi-6',
    title: 'Doa Perlindungan Bahaya Racun & Penyakit (3x)',
    target: 3,
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: "Bismillaahilladzii laa yadhurru ma'asmihii syai-un fil-ardhi wa laa fis-samaa-i wa huwas-samii'ul 'aliim.",
    translation: 'Dengan menyebut nama Allah yang dengan nama-Nya tidak ada sesuatu pun yang dapat membahayakan, baik di bumi maupun di langit. Dan Dialah Yang Maha Mendengar lagi Maha Mengetahui.',
    dalil: 'HR. Abu Dawud no. 5088, At-Tirmidzi no. 3388. Shahih.',
    benefit: 'Barangsiapa membacanya 3 kali di pagi dan petang, tidak ada marabahaya atau racun yang dapat mencelakakannya.'
  },
  {
    id: 'pagi-7',
    title: 'Doa Keridhaan Iman & Islam (3x)',
    target: 3,
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا ، وَبِالْإِسْلَامِ دِينًا ، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: "Radhiitu billaahi rabbaa, wa bil-islaami diinaa, wa bi-muhammadin shallallaahu 'alaihi wa sallama nabiyyaa.",
    translation: 'Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad shallallahu \'alaihi wa sallam sebagai nabiku.',
    dalil: 'HR. Abu Dawud no. 5072, Ahmad (4/337). Shahih.',
    benefit: 'Siapa yang mengucapkannya 3 kali setiap pagi dan petang, Allah berhak untuk meridhoinya pada hari kiamat.'
  },
  {
    id: 'pagi-8',
    title: 'Doa Istighatsah: Ya Hayyu Ya Qayyum',
    target: 1,
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ ، أَصْلِحْ لِي شَأْنِي كُلَّهُ ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    latin: "Yaa Hayyu Yaa Qayyuum, bi-rahmatika astaghiits, ashlih lii sya'nii kullahu, wa laa takilnii ilaa nafsii tharfata 'ain.",
    translation: 'Wahai Dzat Yang Maha Hidup, wahai Dzat Yang Maha Berdiri Sendiri (mengurus makhluk-Nya), dengan rahmat-Mu aku memohon pertolongan. Perbaikilah seluruh urusanku dan jangan Engkau serahkan urusanku kepada diriku sendiri walau sekejap mata pun.',
    dalil: 'HR. An-Nasa-i, Al-Hakim (1/545). Shahih.',
    benefit: 'Memohon bimbingan dan pemeliharaan Allah agar tidak terjerumus pada hawa nafsu diri sendiri.'
  },
  {
    id: 'pagi-9',
    title: 'Tasbih Subhanallahi wa Bihamdihi (100x)',
    target: 100,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: "Subhaanallaahi wa bi-hamdih.",
    translation: 'Maha Suci Allah dan segala puji bagi-Nya.',
    dalil: 'HR. Al-Bukhari no. 6405, Muslim no. 2691.',
    benefit: 'Barangsiapa mengucapkannya 100 kali dalam sehari, maka akan dihapuskan dosa-dosanya meskipun sebanyak buih di lautan.'
  },
  {
    id: 'pagi-10',
    title: 'Tahlil Pembebas Perbudakan & Benteng Setan (10x)',
    target: 10,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai-in qadiir.",
    translation: 'Tidak ada tuhan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya segala kerajaan dan bagi-Nya segala pujian, dan Dia Maha Kuasa atas segala sesuatu.',
    dalil: 'HR. Al-Bukhari no. 6403, Muslim no. 2693.',
    benefit: 'Mendapat pahala seperti memerdekakan budak, dicatat seratus kebaikan, dihapus seratus keburukan, dan menjadi benteng dari setan.'
  }
];

const DZIKIR_PETANG = [
  {
    id: 'petang-1',
    title: 'Ayat Kursi (QS. Al-Baqarah: 255)',
    target: 1,
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: "Allahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhu sinatuw walaa naum, lahu maa fis-samaawaati wa maa fil-ardh, man dzalladzii yasyfa'u 'indahu illaa bi-idznih, ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bi-syai-im min 'ilmihii illaa bimaa syaa-a, wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya-uuduhuu hifzhuhumaa, wa huwal 'aliyyul 'azhiim.",
    translation: 'Allah, tidak ada tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus (makhluk-Nya)...',
    dalil: 'HR. Al-Hakim (1/562). Shahih.',
    benefit: 'Siapa yang membacanya di petang hari akan dilindungi dari gangguan jin hingga pagi hari.'
  },
  {
    id: 'petang-2',
    title: 'Surah Al-Ikhlas, Al-Falaq, & An-Nas (Dibaca 3x)',
    target: 3,
    arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ هُوَ اللّٰهُ اَحَدٌ ۚ اَللّٰهُ الصَّمَدُ ۚ لَمْ يَلِدْ وَلَمْ يُوْلَدْ ۙ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ\n\nبِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِ ۙ مِنْ شَرِّ مَا خَلَقَ ۙ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ ۙ وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِ ۙ وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ\n\nبِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ اَعُوْذُ بِرَبِّ النَّاسِ ۙ مَلِكِ النَّاسِ ۙ اِلٰهِ النَّاسِ ۙ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۖ الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ۙ مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: 'Membaca Surah Al-Ikhlas, Al-Falaq, dan An-Nas berturut-turut sebanyak 3 kali.',
    translation: 'Katakanlah: Dialah Allah, Yang Maha Esa... Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh... Katakanlah: Aku berlindung kepada Tuhannya manusia...',
    dalil: 'HR. Abu Dawud no. 5082, At-Tirmidzi no. 3575. Shahih.',
    benefit: 'Mencukupkan dari segala keburukan dan kejahatan sepanjang malam.'
  },
  {
    id: 'petang-3',
    title: 'Sayyidul Istighfar (Rajanya Istighfar)',
    target: 1,
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ ، خَلَقْتَنِي وَأَنَا عَبْدُكَ ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: "Allahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa 'abduka, wa anaa 'alaa 'ahdika wa wa'dika mastatha'tu, a'uudzu bika min syarri maa shana'tu, abuu-u laka bini'matika 'alayya, wa abuu-u bi-dzanbii, faghfir lii fa-innahuu laa yaghfirudz-dzunuuba illaa anta.",
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada tuhan yang berhak disembah selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu...',
    dalil: 'HR. Al-Bukhari no. 6306.',
    benefit: 'Barangsiapa membacanya di petang hari dengan yakin lalu wafat malam itu, niscaya ia menjadi penghuni surga.'
  },
  {
    id: 'petang-4',
    title: 'Doa Memasuki Waktu Petang',
    target: 1,
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ ، وَالْحَمْدُ لِلَّهِ ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin: "Amsainaa wa amsal-mulku lillaah, wal-hamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai-in qadiir. Rabbi as-aluka khaira maa fii haadzihil-lailati wa khaira maa ba'dahaa, wa a'uudzu bika min syarri maa fii haadzihil-lailati wa syarri maa ba'dahaa. Rabbi a'uudzu bika minal-kasali wa suu-il kibar, rabbi a'uudzu bika min 'adzaabin fin-naari wa 'adzaabin fil-qabr.",
    translation: 'Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada tuhan yang berhak disembah selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Maha Kuasa atas segala sesuatu...',
    dalil: 'HR. Muslim no. 2723.',
    benefit: 'Memohon kebaikan sepanjang malam dan perlindungan dari keburukan gelap malam serta siksa akhirat.'
  },
  {
    id: 'petang-5',
    title: 'Doa Perlindungan dari Kalimat Allah (Khusus Petang 3x)',
    target: 3,
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: "A'uudzu bi-kalimaatillaahit-taammaati min syarri maa khalaq.",
    translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa yang Dia ciptakan.',
    dalil: 'HR. Muslim no. 2709.',
    benefit: 'Barangsiapa mengucapkannya 3 kali di waktu petang, tidak akan membahayakannya sengatan hewan berbisa atau racun malam itu.'
  },
  {
    id: 'petang-6',
    title: 'Doa Perlindungan 4 Penjuru (Afiah Dunia & Akhirat)',
    target: 1,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي ، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي ، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي ، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    latin: "Allahumma innii as-alukal-'afwa wal-'aafiyata fid-dunyaa wal-aakhirah...",
    translation: 'Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan di dunia dan akhirat...',
    dalil: 'HR. Abu Dawud no. 5074. Shahih.',
    benefit: 'Penjagaan mutlak dari bahaya di segala penjuru.'
  },
  {
    id: 'petang-7',
    title: 'Doa Perlindungan Bahaya Racun & Penyakit (3x)',
    target: 3,
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: "Bismillaahilladzii laa yadhurru ma'asmihii syai-un fil-ardhi wa laa fis-samaa-i wa huwas-samii'ul 'aliim.",
    translation: 'Dengan menyebut nama Allah yang dengan nama-Nya tidak ada sesuatu pun yang dapat membahayakan, baik di bumi maupun di langit...',
    dalil: 'HR. Abu Dawud no. 5088, At-Tirmidzi no. 3388. Shahih.',
    benefit: 'Benteng pertahanan dari racun, sihir, dan bahaya malam.'
  },
  {
    id: 'petang-8',
    title: 'Doa Keridhaan Iman & Islam (3x)',
    target: 3,
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا ، وَبِالْإِسْلَامِ دِينًا ، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: "Radhiitu billaahi rabbaa, wa bil-islaami diinaa, wa bi-muhammadin shallallaahu 'alaihi wa sallama nabiyyaa.",
    translation: 'Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad sebagai nabiku.',
    dalil: 'HR. Abu Dawud no. 5072. Shahih.',
    benefit: 'Mendapat keridhaan Allah di hari kiamat.'
  },
  {
    id: 'petang-9',
    title: 'Tasbih Subhanallahi wa Bihamdihi (100x)',
    target: 100,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: "Subhaanallaahi wa bi-hamdih.",
    translation: 'Maha Suci Allah dan segala puji bagi-Nya.',
    dalil: 'HR. Al-Bukhari no. 6405, Muslim no. 2691.',
    benefit: 'Penghapus dosa-dosa harian meski sebanyak buih di samudera.'
  },
  {
    id: 'petang-10',
    title: 'Tahlil Pembebas Perbudakan (10x)',
    target: 10,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai-in qadiir.",
    translation: 'Tidak ada tuhan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya...',
    dalil: 'HR. Al-Bukhari no. 6403, Muslim no. 2693.',
    benefit: 'Pahala memerdekakan budak dan benteng dari godaan setan.'
  }
];

export default function DzikirPagiPetangModal({ onClose }) {
  // Auto-detect waktu berdasarkan jam lokal (Pagi: 00:00 - 14:59, Petang: 15:00 - 23:59)
  const currentHour = new Date().getHours();
  const defaultTab = currentHour < 15 ? 'pagi' : 'petang';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [counts, setCounts] = useState({});
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'sepia' | 'dark'
  const [fontSize, setFontSize] = useState('medium'); // 'normal' | 'medium' | 'large'
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const activeList = activeTab === 'pagi' ? DZIKIR_PAGI : DZIKIR_PETANG;

  // Tasbih Counter Increment
  const handleIncrement = (id, target) => {
    const current = counts[id] || 0;
    if (current < target) {
      const next = current + 1;
      setCounts((prev) => ({ ...prev, [id]: next }));

      // Haptic feedback bila didukung browser
      if (navigator.vibrate) {
        if (next === target) {
          navigator.vibrate([40, 60, 40]); // Getar selesai
        } else {
          navigator.vibrate(25); // Getar klik
        }
      }
    }
  };

  // Reset Tasbih
  const handleResetItem = (id) => {
    setCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleResetAll = () => {
    if (confirm(`Reset semua hitungan Dzikir ${activeTab === 'pagi' ? 'Pagi' : 'Petang'}?`)) {
      const newCounts = { ...counts };
      activeList.forEach((item) => {
        newCounts[item.id] = 0;
      });
      setCounts(newCounts);
    }
  };

  // Hitung jumlah dzikir yang selesai
  const completedCount = activeList.filter((item) => (counts[item.id] || 0) >= item.target).length;
  const progressPercent = Math.round((completedCount / activeList.length) * 100);

  // Copy Teks Dzikir
  const handleCopy = (item) => {
    const text = `${item.title}\n\n${item.arabic}\n\n${item.latin}\n\n"${item.translation}"\n\nFaedah: ${item.benefit} (${item.dalil})\n\n(Dzikir Pagi & Petang Sesuai Sunnah - Aplikasi Kanomas)`;
    navigator.clipboard?.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Share to WhatsApp
  const handleShareWA = (item) => {
    const text = `*${item.title}*\n\n${item.arabic}\n\n_${item.latin}_\n\n"${item.translation}"\n\n📌 _Faedah: ${item.benefit}_\n📚 _${item.dalil}_\n\nDibagikan via Aplikasi Kanomas Tour & Travel\nhttps://appkanomas.mediasosial.net`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Font Size Classes dengan line-height aman bertingkat anti-tabrakan harakat
  const arabicSizeClass = {
    normal: 'text-2xl sm:text-3xl leading-[2.6]',
    medium: 'text-3xl sm:text-4xl leading-[2.9]',
    large: 'text-4xl sm:text-5xl leading-[3.2]'
  }[fontSize];

  // Theme Classes
  const themeClasses = {
    light: 'bg-white text-slate-800',
    sepia: 'bg-[#fbf7ee] text-amber-950',
    dark: 'bg-[#0f172a] text-slate-100'
  }[themeMode];

  const cardThemeClasses = {
    light: 'bg-white border-slate-200/90 shadow-xs',
    sepia: 'bg-[#f5efe3] border-amber-200/80 shadow-xs',
    dark: 'bg-slate-800/90 border-slate-700 shadow-xs'
  }[themeMode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`w-full max-w-4xl h-[95vh] sm:h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 transition-colors duration-200 ${themeClasses}`}>
        
        {/* HEADER MODAL */}
        <div className={`p-4 border-b flex items-center justify-between gap-3 flex-shrink-0 ${
          themeMode === 'dark' ? 'border-slate-800 bg-slate-900/95' : 'border-slate-100 bg-white/95'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center flex-shrink-0 shadow-xs">
              {activeTab === 'pagi' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white truncate">
                Dzikir Pagi & Petang Sesuai Sunnah
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Berdasarkan Al-Qur'an dan As-Sunnah Ash-Shahihah • Dilengkapi Tasbih Digital
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* TEMA SWITCHER */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl">
              <button
                onClick={() => setThemeMode('light')}
                className={`p-1.5 rounded-lg text-xs transition ${
                  themeMode === 'light' ? 'bg-white shadow-xs text-amber-600' : 'text-slate-400'
                }`}
                title="Tema Terang"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('sepia')}
                className={`p-1.5 rounded-lg text-xs transition ${
                  themeMode === 'sepia' ? 'bg-[#fbf7ee] shadow-xs text-amber-800' : 'text-slate-400'
                }`}
                title="Tema Sepia (Ramah Mata)"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-1.5 rounded-lg text-xs transition ${
                  themeMode === 'dark' ? 'bg-slate-700 shadow-xs text-amber-400' : 'text-slate-400'
                }`}
                title="Tema Gelap"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-300 flex items-center justify-center transition active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TAB PEMILIH PAGI / PETANG & PROGRES BAR */}
        <div className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0 ${
          themeMode === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50/70'
        }`}>
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('pagi')}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition active:scale-95 ${
                activeTab === 'pagi'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>🌅 Dzikir Pagi ({DZIKIR_PAGI.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('petang')}
              className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition active:scale-95 ${
                activeTab === 'petang'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>🌆 Dzikir Petang ({DZIKIR_PETANG.length})</span>
            </button>
          </div>

          {/* Controls: Reset All, Ukuran Huruf, Toggle Latin/Arti */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => {
                  const sizes = ['normal', 'medium', 'large'];
                  const idx = sizes.indexOf(fontSize);
                  if (idx > 0) setFontSize(sizes[idx - 1]);
                }}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 font-bold hover:bg-slate-200 active:scale-95"
              >
                A-
              </button>
              <span className="px-1.5 font-bold text-slate-600 dark:text-slate-300">
                {fontSize === 'normal' ? 'Sedang' : fontSize === 'medium' ? 'Besar' : 'Ekstra'}
              </span>
              <button
                onClick={() => {
                  const sizes = ['normal', 'medium', 'large'];
                  const idx = sizes.indexOf(fontSize);
                  if (idx < sizes.length - 1) setFontSize(sizes[idx + 1]);
                }}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 font-bold hover:bg-slate-200 active:scale-95"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => setShowLatin(!showLatin)}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition ${
                showLatin ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}
            >
              Latin: {showLatin ? 'Ya' : 'Tidak'}
            </button>

            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition ${
                showTranslation ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}
            >
              Arti: {showTranslation ? 'Ya' : 'Tidak'}
            </button>

            <button
              onClick={handleResetAll}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center gap-1 transition"
              title="Reset Semua Tasbih"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* PROGRESS BANNER */}
        <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex-shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Progres Dzikir: <strong>{completedCount}</strong> dari {activeList.length} selesai ({progressPercent}%)</span>
          </div>
          <div className="w-24 sm:w-36 h-2 bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* LIST DAFTAR DZIKIR */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 max-w-3xl mx-auto">
          {activeList.map((item, index) => {
            const currentCount = counts[item.id] || 0;
            const isFinished = currentCount >= item.target;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border transition-all duration-200 ${cardThemeClasses} ${
                  isFinished
                    ? 'ring-2 ring-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : ''
                }`}
              >
                {/* HEADER ITEM DZIKIR */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/80 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center font-mono flex-shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* Share WA */}
                    <button
                      onClick={() => handleShareWA(item)}
                      className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-center transition active:scale-95"
                      title="Bagikan ke WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopy(item)}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition active:scale-95"
                      title="Salin teks dzikir"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* TEKS ARAB (FONT RESMI LPMQ ISEP MISBAH KEMENAG) */}
                <div className="py-4 text-right" dir="rtl">
                  <p className={`font-quran-lpmq font-normal tracking-wide text-slate-900 dark:text-amber-100 ${arabicSizeClass} whitespace-pre-line`}>
                    {item.arabic}
                  </p>
                </div>

                {/* TRANSLITERASI LATIN */}
                {showLatin && item.latin && (
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-400 italic font-medium pt-1 leading-relaxed">
                    {item.latin}
                  </p>
                )}

                {/* TERJEMAHAN BAHASA INDONESIA */}
                {showTranslation && (
                  <p className="text-xs sm:text-sm pt-2 text-slate-700 dark:text-slate-300 leading-relaxed font-normal opacity-90">
                    "{item.translation}"
                  </p>
                )}

                {/* FAEDAH & DALIL HADITS SHAHIH */}
                <div className="mt-3.5 p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">
                      <strong>Faedah:</strong> {item.benefit}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-700 dark:text-amber-400 font-mono">
                    📚 {item.dalil}
                  </div>
                </div>

                {/* TASBIH DIGITAL INTERAKTIF PER DZIKIR */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      Target Bacaan:
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono">
                      {item.target}x
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentCount > 0 && (
                      <button
                        onClick={() => handleResetItem(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                        title="Ulangi hitungan"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleIncrement(item.id, item.target)}
                      className={`px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-sm transition active:scale-95 ${
                        isFinished
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                      }`}
                    >
                      {isFinished ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Selesai ({item.target}x)</span>
                        </>
                      ) : (
                        <>
                          <span>Hitung: {currentCount} / {item.target}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
