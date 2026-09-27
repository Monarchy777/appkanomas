import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  X,
  Settings,
  Palette,
  Sun,
  Moon,
  RotateCcw,
  Check,
  Copy,
  Share2,
  Sparkles,
  CheckCircle2,
  Coffee,
  Sliders,
  ChevronRight
} from 'lucide-react';

// =========================================================================
// DATA DZIKIR PAGI & PETANG SESUAI SUNNAH NABI SHALLALLAHU 'ALAIHI WA SALLAM
// Sumber: Kitab Dzikir Pagi Petang & Setelah Sholat (Syaikh Sa'id bin Ali Al-Qahthani / Hisnul Muslim)
// =========================================================================

export const DZIKIR_PAGI = [
  {
    id: 'pagi-1',
    title: 'Ayat Kursi (QS. Al-Baqarah: 255)',
    target: 1,
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: "Allahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhu sinatuw walaa naum, lahu maa fis-samaawaati wa maa fil-ardh, man dzalladzii yasyfa'u 'indahu illaa bi-idznih, ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bi-syai-im min 'ilmihii illaa bimaa syaa-a, wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya-uuduhuu hifzhuhumaa, wa huwal 'aliyyul 'azhiim.",
    translation: 'Allah, tidak ada tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Maha Tinggi, Maha Besar.',
    dalil: 'HR. Al-Hakim (1/562). Dinilai shahih oleh Syaikh Al-Albani.',
    benefit: 'Siapa yang membacanya di pagi hari akan dilindungi oleh Allah dari gangguan jin dan setan hingga waktu petang.'
  },
  {
    id: 'pagi-2',
    title: 'Surah Al-Ikhlas, Al-Falaq, & An-Nas (Dibaca 3x)',
    target: 3,
    arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ هُوَ اللّٰهُ اَحَدٌ ۚ اَللّٰهُ الصَّمَدُ ۚ لَمْ يَلِدْ وَلَمْ يُوْلَدْ ۙ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ\n\nبِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِ ۙ مِنْ شَرِّ مَا خَلَقَ ۙ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ ۙ وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِ ۙ وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ\n\nبِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ اَعُوْذُ بِرَبِّ النَّاسِ ۙ مَلِكِ النَّاسِ ۙ اِلٰهِ النَّاسِ ۙ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۖ الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ۙ مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: 'Membaca Surah Al-Ikhlas, Surah Al-Falaq, dan Surah An-Nas berturut-turut sebanyak 3 kali.',
    translation: 'Katakanlah: Dialah Allah, Yang Maha Esa... Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh... Katakanlah: Aku berlindung kepada Tuhannya manusia...',
    dalil: 'HR. Abu Dawud no. 5082, At-Tirmidzi no. 3575. Hadits Hasan Shahih.',
    benefit: 'Siapa yang membacanya 3 kali setiap pagi dan petang, niscaya akan mencukupkannya dari segala keburukan dan marabahaya.'
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
    benefit: 'Memohon kebaikan sepanjang hari serta perlindungan menyeluruh dari keburukan, rasa malas, dan siksa akhirat.'
  },
  {
    id: 'pagi-5',
    title: 'Doa Perlindungan 4 Penjuru (Afiah Dunia & Akhirat)',
    target: 1,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي ، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي ، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي ، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    latin: "Allahumma innii as-alukal-'afwa wal-'aafiyata fid-dunyaa wal-aakhirah. Allahumma innii as-alukal-'afwa wal-'aafiyata fii diinii wa dunyaaya wa ahlii wa maalii. Allahummastur 'auraatii wa aamin rau'aatii. Allahummahfazhnii mim baini yadayya wa min khalfii wa 'an yamiinii wa 'an syimaalii wa min fauqii, wa a'uudzu bi-'azhamatika an ughtaala min tahtii.",
    translation: 'Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku. Ya Allah, tutuplah aib-aibku dan berikanlah ketenteraman dari rasa takutku. Ya Allah, jagalah aku dari arah depanku, belakangku, sisi kananku, sisi kiriku, dan dari atasku. Dan aku berlindung dengan keagungan-Mu dari bahaya yang menyergapku dari bawahku.',
    dalil: 'HR. Abu Dawud no. 5074, Ibnu Majah no. 3871. Shahih.',
    benefit: 'Benteng perlindungan menyeluruh dari marabahaya dari 6 penjuru arah mata angin sepanjang hari.'
  },
  {
    id: 'pagi-6',
    title: 'Doa Perlindungan Bahaya Racun & Penyakit (3x)',
    target: 3,
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: "Bismillaahilladzii laa yadhurru ma'asmihii syai-un fil-ardhi wa laa fis-samaa-i wa huwas-samii'ul 'aliim.",
    translation: 'Dengan menyebut nama Allah yang dengan nama-Nya tidak ada sesuatu pun yang dapat membahayakan, baik di bumi maupun di langit. Dan Dialah Yang Maha Mendengar lagi Maha Mengetahui.',
    dalil: 'HR. Abu Dawud no. 5088, At-Tirmidzi no. 3388. Shahih.',
    benefit: 'Barangsiapa membacanya 3 kali di pagi dan petang, tidak ada marabahaya, sihir, atau racun yang dapat mencelakakannya.'
  },
  {
    id: 'pagi-7',
    title: 'Doa Keridhaan Iman & Islam (3x)',
    target: 3,
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا ، وَبِالْإِسْلَامِ دِينًا ، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: "Radhiitu billaahi rabbaa, wa bil-islaami diinaa, wa bi-muhammadin shallallaahu 'alaihi wa sallama nabiyyaa.",
    translation: 'Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad shallallahu \'alaihi wa sallam sebagai nabiku.',
    dalil: 'HR. Abu Dawud no. 5072, Ahmad (4/337). Shahih.',
    benefit: 'Siapa yang mengucapkannya 3 kali setiap pagi dan petang, Allah berhak dan berjanji untuk meridhoinya pada hari kiamat.'
  },
  {
    id: 'pagi-8',
    title: 'Doa Istighatsah: Ya Hayyu Ya Qayyum',
    target: 1,
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ ، أَصْلِحْ لِي شَأْنِي كُلَّهُ ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    latin: "Yaa Hayyu Yaa Qayyuum, bi-rahmatika astaghiits, ashlih lii sya'nii kullahu, wa laa takilnii ilaa nafsii tharfata 'ain.",
    translation: 'Wahai Dzat Yang Maha Hidup, wahai Dzat Yang Maha Berdiri Sendiri (mengurus seluruh makhluk-Nya), dengan rahmat-Mu aku memohon pertolongan. Perbaikilah seluruh urusanku dan jangan Engkau serahkan urusanku kepada diriku sendiri walau sekejap mata pun.',
    dalil: 'HR. An-Nasa-i, Al-Hakim (1/545). Shahih.',
    benefit: 'Memohon bimbingan, taufik, dan pemeliharaan Allah agar tidak terjerumus pada hawa nafsu dan kelemahan diri sendiri.'
  },
  {
    id: 'pagi-9',
    title: 'Tasbih Subhanallahi wa Bihamdihi (100x)',
    target: 100,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: "Subhaanallaahi wa bi-hamdih.",
    translation: 'Maha Suci Allah dan segala puji bagi-Nya.',
    dalil: 'HR. Al-Bukhari no. 6405, Muslim no. 2691.',
    benefit: 'Barangsiapa mengucapkannya 100 kali dalam sehari, maka akan dihapuskan segala dosa-dosanya meskipun sebanyak buih di lautan luas.'
  },
  {
    id: 'pagi-10',
    title: 'Tahlil Pembebas Perbudakan & Benteng Setan (10x)',
    target: 10,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai-in qadiir.",
    translation: 'Tidak ada tuhan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya segala kerajaan dan bagi-Nya segala pujian, dan Dia Maha Kuasa atas segala sesuatu.',
    dalil: 'HR. Al-Bukhari no. 6403, Muslim no. 2693.',
    benefit: 'Mendapat pahala seperti memerdekakan budak keturunan Ismail, dicatat seratus kebaikan, dihapus seratus keburukan, dan menjadi benteng dari setan.'
  }
];

export const DZIKIR_PETANG = [
  {
    id: 'petang-1',
    title: 'Ayat Kursi (QS. Al-Baqarah: 255)',
    target: 1,
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: "Allahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhu sinatuw walaa naum, lahu maa fis-samaawaati wa maa fil-ardh, man dzalladzii yasyfa'u 'indahu illaa bi-idznih, ya'lamu maa baina aidiihim wa maa khalfahum, wa laa yuhiithuuna bi-syai-im min 'ilmihii illaa bimaa syaa-a, wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya-uuduhuu hifzhuhumaa, wa huwal 'aliyyul 'azhiim.",
    translation: 'Allah, tidak ada tuhan selain Dia, Yang Maha Hidup, Yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Maha Tinggi, Maha Besar.',
    dalil: 'HR. Al-Hakim (1/562). Shahih.',
    benefit: 'Siapa yang membacanya di petang hari akan senantiasa dilindungi oleh Allah dari gangguan jin dan setan hingga waktu pagi.'
  },
  {
    id: 'petang-2',
    title: 'Surah Al-Ikhlas, Al-Falaq, & An-Nas (Dibaca 3x)',
    target: 3,
    arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ هُوَ اللّٰهُ اَحَدٌ ۚ اَللّٰهُ الصَّمَدُ ۚ لَمْ يَلِدْ وَلَمْ يُوْلَدْ ۙ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ\n\nبِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِ ۙ مِنْ شَرِّ مَا خَلَقَ ۙ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ ۙ وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِ ۙ وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ\n\nبِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ • قُلْ اَعُوْذُ بِرَبِّ النَّاسِ ۙ مَلِكِ النَّاسِ ۙ اِلٰهِ النَّاسِ ۙ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۖ الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ۙ مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: 'Membaca Surah Al-Ikhlas, Surah Al-Falaq, dan Surah An-Nas berturut-turut sebanyak 3 kali.',
    translation: 'Katakanlah: Dialah Allah, Yang Maha Esa... Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh... Katakanlah: Aku berlindung kepada Tuhannya manusia...',
    dalil: 'HR. Abu Dawud no. 5082, At-Tirmidzi no. 3575. Shahih.',
    benefit: 'Mencukupkan seorang hamba dari segala bentuk keburukan, bahaya, dan sihir sepanjang malam hingga fajar tiba.'
  },
  {
    id: 'petang-3',
    title: 'Sayyidul Istighfar (Rajanya Istighfar)',
    target: 1,
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ ، خَلَقْتَنِي وَأَنَا عَبْدُكَ ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: "Allahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa 'abduka, wa anaa 'alaa 'ahdika wa wa'dika mastatha'tu, a'uudzu bika min syarri maa shana'tu, abuu-u laka bini'matika 'alayya, wa abuu-u bi-dzanbii, faghfir lii fa-innahuu laa yaghfirudz-dzunuuba illaa anta.",
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada tuhan yang berhak disembah selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu. Aku senantiasa setia pada perjanjian-Mu dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan apa yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku. Sungguh tidak ada yang dapat mengampuni dosa selain Engkau.',
    dalil: 'HR. Al-Bukhari no. 6306.',
    benefit: 'Barangsiapa membacanya di petang hari dengan keyakinan penuh lalu wafat malam itu sebelum pagi, niscaya ia menjadi penghuni surga.'
  },
  {
    id: 'petang-4',
    title: 'Doa Memasuki Waktu Petang',
    target: 1,
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ ، وَالْحَمْدُ لِلَّهِ ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin: "Amsainaa wa amsal-mulku lillaah, wal-hamdu lillaah, laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai-in qadiir. Rabbi as-aluka khaira maa fii haadzihil-lailati wa khaira maa ba'dahaa, wa a'uudzu bika min syarri maa fii haadzihil-lailati wa syarri maa ba'dahaa. Rabbi a'uudzu bika minal-kasali wa suu-il kibar, rabbi a'uudzu bika min 'adzaabin fin-naari wa 'adzaabin fil-qabr.",
    translation: 'Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada tuhan yang berhak disembah selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Maha Kuasa atas segala sesuatu. Wahai Tuhanku, aku memohon kepada-Mu kebaikan malam ini dan kebaikan sesudahnya, dan aku berlindung kepada-Mu dari keburukan malam ini dan keburukan sesudahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari kemalasan dan keburukan masa tua. Wahai Tuhanku, aku berlindung kepada-Mu dari siksa neraka dan siksa kubur.',
    dalil: 'HR. Muslim no. 2723.',
    benefit: 'Memohon kebaikan sepanjang malam dan perlindungan dari marabahaya gelapnya malam serta siksa akhirat.'
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
    latin: "Allahumma innii as-alukal-'afwa wal-'aafiyata fid-dunyaa wal-aakhirah. Allahumma innii as-alukal-'afwa wal-'aafiyata fii diinii wa dunyaaya wa ahlii wa maalii. Allahummastur 'auraatii wa aamin rau'aatii. Allahummahfazhnii mim baini yadayya wa min khalfii wa 'an yamiinii wa 'an syimaalii wa min fauqii, wa a'uudzu bi-'azhamatika an ughtaala min tahtii.",
    translation: 'Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku. Ya Allah, tutuplah aib-aibku dan berikanlah ketenteraman dari rasa takutku. Ya Allah, jagalah aku dari arah depanku, belakangku, sisi kananku, sisi kiriku, dan dari atasku. Dan aku berlindung dengan keagungan-Mu dari bahaya yang menyergapku dari bawahku.',
    dalil: 'HR. Abu Dawud no. 5074. Shahih.',
    benefit: 'Penjagaan mutlak dan perlindungan dari marabahaya di segala penjuru mata angin sepanjang malam.'
  },
  {
    id: 'petang-7',
    title: 'Doa Perlindungan Bahaya Racun & Penyakit (3x)',
    target: 3,
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: "Bismillaahilladzii laa yadhurru ma'asmihii syai-un fil-ardhi wa laa fis-samaa-i wa huwas-samii'ul 'aliim.",
    translation: 'Dengan menyebut nama Allah yang dengan nama-Nya tidak ada sesuatu pun yang dapat membahayakan, baik di bumi maupun di langit. Dan Dialah Yang Maha Mendengar lagi Maha Mengetahui.',
    dalil: 'HR. Abu Dawud no. 5088, At-Tirmidzi no. 3388. Shahih.',
    benefit: 'Benteng pertahanan kokoh dari racun, sihir, dan bahaya malam hari.'
  },
  {
    id: 'petang-8',
    title: 'Doa Keridhaan Iman & Islam (3x)',
    target: 3,
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا ، وَبِالْإِسْلَامِ دِينًا ، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: "Radhiitu billaahi rabbaa, wa bil-islaami diinaa, wa bi-muhammadin shallallaahu 'alaihi wa sallama nabiyyaa.",
    translation: 'Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad shallallahu \'alaihi wa sallam sebagai nabiku.',
    dalil: 'HR. Abu Dawud no. 5072. Shahih.',
    benefit: 'Mendapat keridhaan Allah Yang Maha Pengasih di hari kiamat kelak.'
  },
  {
    id: 'petang-9',
    title: 'Tasbih Subhanallahi wa Bihamdihi (100x)',
    target: 100,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: "Subhaanallaahi wa bi-hamdih.",
    translation: 'Maha Suci Allah dan segala puji bagi-Nya.',
    dalil: 'HR. Al-Bukhari no. 6405, Muslim no. 2691.',
    benefit: 'Penghapus dosa-dosa harian meski sebanyak buih di samudera luas.'
  },
  {
    id: 'petang-10',
    title: 'Tahlil Pembebas Perbudakan (10x)',
    target: 10,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai-in qadiir.",
    translation: 'Tidak ada tuhan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya segala kerajaan dan bagi-Nya segala pujian, dan Dia Maha Kuasa atas segala sesuatu.',
    dalil: 'HR. Al-Bukhari no. 6403, Muslim no. 2693.',
    benefit: 'Pahala memerdekakan budak keturunan Ismail dan benteng pertahanan dari godaan setan malam hari.'
  }
];

// =========================================================================
// PALET TEMA WARNA BACAAN (PERSIS SEPERTI DI AL-QURAN)
// =========================================================================

export const DZIKIR_THEMES = {
  mushaf: {
    id: 'mushaf',
    name: 'Hijau Zamrud',
    desc: 'Nuansa Islami & Tenang',
    containerBg: 'bg-[#062419] text-emerald-50',
    headerBg: 'bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 border-emerald-800 text-white',
    subHeaderBg: 'bg-[#042016]/95 border-emerald-900 text-emerald-100',
    card: 'bg-[#083021] border-emerald-800/80 text-white shadow-sm',
    cardFinished: 'ring-2 ring-amber-400 border-amber-400 bg-[#0b3d2b]',
    arabicColor: 'text-emerald-50',
    latinColor: 'text-amber-300',
    translationColor: 'text-emerald-100/90',
    badgeBg: 'bg-emerald-900 text-emerald-200 border border-emerald-700',
    activeTabClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md ring-1 ring-emerald-300',
    isDark: true
  },
  light: {
    id: 'light',
    name: 'Khidmat Putih',
    desc: 'Cerah, Bersih & Kontras',
    containerBg: 'bg-[#f8fafc] text-slate-900',
    headerBg: 'bg-gradient-to-r from-emerald-800 via-[#0a7c29] to-emerald-900 border-emerald-700 text-white',
    subHeaderBg: 'bg-white/95 border-slate-200 text-slate-800',
    card: 'bg-white border-slate-200/90 text-slate-900 shadow-xs',
    cardFinished: 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50/40',
    arabicColor: 'text-slate-950',
    latinColor: 'text-emerald-800',
    translationColor: 'text-slate-700',
    badgeBg: 'bg-slate-100 text-slate-800 border border-slate-200',
    activeTabClass: 'bg-gradient-to-r from-[#0a7c29] to-emerald-600 text-white shadow-md',
    isDark: false
  },
  sepia: {
    id: 'sepia',
    name: 'Kertas Mushaf (Sepia)',
    desc: 'Hangat & Ramah Mata',
    containerBg: 'bg-[#fbf7ee] text-amber-950',
    headerBg: 'bg-gradient-to-r from-[#78350f] via-[#92400e] to-[#78350f] border-amber-800 text-white',
    subHeaderBg: 'bg-[#f4ebe1]/95 border-amber-200 text-amber-950',
    card: 'bg-[#fffcf7] border-amber-200 text-amber-950 shadow-xs',
    cardFinished: 'ring-2 ring-amber-600 border-amber-500 bg-amber-100/50',
    arabicColor: 'text-[#2b1810]',
    latinColor: 'text-amber-900 font-semibold',
    translationColor: 'text-amber-950/85',
    badgeBg: 'bg-amber-100 text-amber-900 border border-amber-300',
    activeTabClass: 'bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-md',
    isDark: false
  },
  dark: {
    id: 'dark',
    name: 'Hitam Elegan (OLED)',
    desc: 'Gelap Nyaman Malam Hari',
    containerBg: 'bg-[#090d16] text-slate-100',
    headerBg: 'bg-gradient-to-r from-slate-950 via-[#0f172a] to-slate-950 border-slate-800 text-white',
    subHeaderBg: 'bg-slate-950/95 border-slate-800 text-slate-200',
    card: 'bg-[#111827] border-slate-800 text-slate-100 shadow-xs',
    cardFinished: 'ring-2 ring-emerald-400 border-emerald-500 bg-emerald-950/20',
    arabicColor: 'text-slate-100',
    latinColor: 'text-emerald-400',
    translationColor: 'text-slate-300',
    badgeBg: 'bg-slate-800 text-slate-300 border border-slate-700',
    activeTabClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md ring-1 ring-emerald-400',
    isDark: true
  },
  navy: {
    id: 'navy',
    name: 'Midnight Navy',
    desc: 'Biru Tua Damai',
    containerBg: 'bg-[#0b1329] text-blue-50',
    headerBg: 'bg-gradient-to-r from-[#030712] via-[#0b1b3d] to-[#030712] border-blue-900 text-white',
    subHeaderBg: 'bg-[#081024]/95 border-blue-950 text-blue-200',
    card: 'bg-[#0f1b38] border-blue-900/70 text-blue-50 shadow-xs',
    cardFinished: 'ring-2 ring-amber-400 border-amber-400 bg-blue-950/40',
    arabicColor: 'text-white',
    latinColor: 'text-amber-300',
    translationColor: 'text-blue-100/90',
    badgeBg: 'bg-blue-950 text-blue-200 border border-blue-800',
    activeTabClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md ring-1 ring-blue-400',
    isDark: true
  }
};

// =========================================================================
// GAYA KALIGRAFI ARAB (PERSIS SEPERTI DI AL-QURAN)
// =========================================================================

export const CALLIGRAPHY_STYLES = [
  { id: 'lpmq', name: 'Standar Kemenag RI', desc: 'LPMQ Isep Misbah', fontClass: 'font-quran-lpmq', font: "'LPMQ Isep Misbah', serif" },
  { id: 'madinah', name: 'Madinah Utsmani', desc: 'Amiri Quran', fontClass: 'font-quran-madinah', font: "'Amiri Quran', serif" },
  { id: 'scheherazade', name: 'Naskh Klasik', desc: 'Scheherazade New', fontClass: 'font-quran-scheherazade', font: "'Scheherazade New', serif" },
  { id: 'amiri', name: 'Kaligrafi Tradisional', desc: 'Amiri Classic Font', fontClass: 'font-quran-amiri', font: "'Amiri', serif" },
  { id: 'noto', name: 'Naskh Modern', desc: 'Noto Naskh Arabic', fontClass: 'font-quran-noto', font: "'Noto Naskh Arabic', serif" }
];

export default function DzikirPagiPetangModal({ onClose }) {
  // Auto-detect waktu berdasarkan jam lokal (Pagi: 00:00 - 14:59, Petang: 15:00 - 23:59)
  const currentHour = new Date().getHours();
  const defaultTab = currentHour < 15 ? 'pagi' : 'petang';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [counts, setCounts] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_dzikir_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Theme & Typography States (Al-Quran Standard)
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('kanomas_dzikir_theme') || 'mushaf';
  });

  const [arabicFontSize, setArabicFontSize] = useState(() => {
    const saved = localStorage.getItem('kanomas_dzikir_arabic_size');
    return saved ? parseInt(saved, 10) : 28;
  });

  const [latinFontSize, setLatinFontSize] = useState(() => {
    const saved = localStorage.getItem('kanomas_dzikir_latin_size');
    return saved ? parseInt(saved, 10) : 14;
  });

  const [calligraphyStyle, setCalligraphyStyle] = useState(() => {
    return localStorage.getItem('kanomas_dzikir_calligraphy') || 'lpmq';
  });

  const [showLatin, setShowLatin] = useState(() => {
    const saved = localStorage.getItem('kanomas_dzikir_show_latin');
    return saved !== null ? saved === 'true' : true;
  });

  const [showTranslation, setShowTranslation] = useState(() => {
    const saved = localStorage.getItem('kanomas_dzikir_show_translation');
    return saved !== null ? saved === 'true' : true;
  });

  const [showBenefit, setShowBenefit] = useState(() => {
    const saved = localStorage.getItem('kanomas_dzikir_show_benefit');
    return saved !== null ? saved === 'true' : true;
  });

  const [hapticEnabled, setHapticEnabled] = useState(() => {
    const saved = localStorage.getItem('kanomas_dzikir_haptic');
    return saved !== null ? saved === 'true' : true;
  });

  // Modal dialog states
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Active theme object
  const currentTheme = DZIKIR_THEMES[themeMode] || DZIKIR_THEMES.mushaf;
  const isDark = currentTheme.isDark;

  // Active Dzikir List
  const activeList = activeTab === 'pagi' ? DZIKIR_PAGI : DZIKIR_PETANG;

  // Save counts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kanomas_dzikir_counts', JSON.stringify(counts));
    } catch {}
  }, [counts]);

  // Handle setting updates
  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
    localStorage.setItem('kanomas_dzikir_theme', newTheme);
  };

  const handleArabicSizeChange = (newSize) => {
    const clamped = Math.max(18, Math.min(48, newSize));
    setArabicFontSize(clamped);
    localStorage.setItem('kanomas_dzikir_arabic_size', String(clamped));
  };

  const handleLatinSizeChange = (newSize) => {
    const clamped = Math.max(12, Math.min(24, newSize));
    setLatinFontSize(clamped);
    localStorage.setItem('kanomas_dzikir_latin_size', String(clamped));
  };

  const handleCalligraphyChange = (newStyle) => {
    setCalligraphyStyle(newStyle);
    localStorage.setItem('kanomas_dzikir_calligraphy', newStyle);
  };

  const handleToggleLatin = () => {
    setShowLatin((prev) => {
      const next = !prev;
      localStorage.setItem('kanomas_dzikir_show_latin', String(next));
      return next;
    });
  };

  const handleToggleTranslation = () => {
    setShowTranslation((prev) => {
      const next = !prev;
      localStorage.setItem('kanomas_dzikir_show_translation', String(next));
      return next;
    });
  };

  const handleToggleBenefit = () => {
    setShowBenefit((prev) => {
      const next = !prev;
      localStorage.setItem('kanomas_dzikir_show_benefit', String(next));
      return next;
    });
  };

  const handleToggleHaptic = () => {
    setHapticEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('kanomas_dzikir_haptic', String(next));
      return next;
    });
  };

  // Tasbih Counter Increment
  const handleIncrement = (id, target) => {
    const current = counts[id] || 0;
    if (current < target) {
      const next = current + 1;
      setCounts((prev) => ({ ...prev, [id]: next }));

      // Haptic feedback bila didukung browser & enabled
      if (hapticEnabled && navigator.vibrate) {
        if (next === target) {
          navigator.vibrate([40, 60, 40]); // Getar selesai
        } else {
          navigator.vibrate(25); // Getar klik
        }
      }
    }
  };

  // Reset Single Item
  const handleResetItem = (id) => {
    setCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  // Reset All Items in current tab
  const handleResetAll = () => {
    if (confirm(`Reset semua hitungan Dzikir ${activeTab === 'pagi' ? 'Pagi' : 'Petang'}?`)) {
      const newCounts = { ...counts };
      activeList.forEach((item) => {
        newCounts[item.id] = 0;
      });
      setCounts(newCounts);
    }
  };

  // Completed count & progress
  const completedCount = activeList.filter((item) => (counts[item.id] || 0) >= item.target).length;
  const progressPercent = Math.round((completedCount / activeList.length) * 100);

  // Copy Text
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

  // Pinch-to-zoom 2 jari: perbesar/perkecil huruf Arab atau Latin sesuai lokasi jari
  const touchStartDistance = useRef(0);
  const touchZoomTarget = useRef(null); // 'arabic' | 'latin'
  const initialZoomSize = useRef(0);
  const [zoomIndicator, setZoomIndicator] = useState({ show: false, label: '', size: 0 });
  const zoomTimeoutRef = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStartDistance.current = dist;

      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;
      const elem = document.elementFromPoint(midX, midY);

      const isLatin = elem?.closest('[data-zoom-zone="latin"]') || elem?.closest('[data-zoom-zone="translation"]');
      if (isLatin) {
        touchZoomTarget.current = 'latin';
        initialZoomSize.current = latinFontSize;
      } else {
        touchZoomTarget.current = 'arabic';
        initialZoomSize.current = arabicFontSize;
      }
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchStartDistance.current > 0) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const ratio = dist / touchStartDistance.current;

      if (touchZoomTarget.current === 'arabic') {
        const newSize = Math.round(Math.max(18, Math.min(48, initialZoomSize.current * ratio)));
        setArabicFontSize(newSize);
        if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
        setZoomIndicator({ show: true, label: 'Huruf Arab', size: newSize });
      } else if (touchZoomTarget.current === 'latin') {
        const newSize = Math.round(Math.max(12, Math.min(24, initialZoomSize.current * ratio)));
        setLatinFontSize(newSize);
        if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
        setZoomIndicator({ show: true, label: 'Latin & Terjemah', size: newSize });
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2 && touchStartDistance.current > 0) {
      touchStartDistance.current = 0;
      try {
        localStorage.setItem('kanomas_dzikir_arabic_size', String(arabicFontSize));
        localStorage.setItem('kanomas_dzikir_latin_size', String(latinFontSize));
      } catch {}

      if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
      zoomTimeoutRef.current = setTimeout(() => {
        setZoomIndicator({ show: false, label: '', size: 0 });
      }, 1500);
    }
  };

  // Active calligraphy font class
  const activeFontObj = CALLIGRAPHY_STYLES.find((f) => f.id === calligraphyStyle) || CALLIGRAPHY_STYLES[0];
  const activeFontClass = activeFontObj.fontClass;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl h-[95vh] sm:h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 dark:border-slate-800 transition-colors duration-200 relative ${currentTheme.containerBg}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ======================================================== */}
        {/* 1. BARIS HEADER ELEGAN (PERSIS SEPERTI DI AL-QURAN)      */}
        {/* ======================================================== */}
        <div className={`px-3 sm:px-6 py-2.5 border-b flex items-center justify-between gap-2 sm:gap-3 flex-shrink-0 shadow-sm ${currentTheme.headerBg}`}>
          {/* Tombol Kembali / Tutup */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
            title="Tutup Dzikir"
          >
            <ChevronLeft className="w-7 h-7 stroke-[3]" />
          </button>

          {/* Judul & Quick Switcher Pagi/Petang */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'pagi' ? 'petang' : 'pagi')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl hover:bg-white/15 transition font-bold text-sm sm:text-base leading-tight text-white shadow-2xs"
            >
              <span className="text-base sm:text-lg">{activeTab === 'pagi' ? '🌅' : '🌆'}</span>
              <span className="whitespace-nowrap">
                {activeTab === 'pagi' ? 'Dzikir Pagi' : 'Dzikir Petang'}
              </span>
              <span className="text-xs text-amber-300 font-normal hidden sm:inline whitespace-nowrap">
                (10 Sunnah Shahihah)
              </span>
              <ChevronRight className="w-4 h-4 transition-transform text-white/80 shrink-0" />
            </button>
          </div>

          {/* Action Icons: Pemilih Tema (Palette), Pengaturan (Gear), Reset Tasbih */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Tombol Tema Warna Background (Palette) */}
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl active:scale-95 flex items-center justify-center transition ${
                showThemePicker ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'hover:bg-white/20 text-white'
              }`}
              title={`Warna Tema: ${currentTheme.name}`}
            >
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Tombol Pengaturan (Settings Gear) */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title="Pengaturan Tampilan, Huruf & Kaligrafi"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Tombol Reset Semua Tasbih */}
            <button
              onClick={handleResetAll}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title="Reset Semua Hitungan Tasbih"
            >
              <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* POPUP PEMILIH TEMA WARNA BACAAN (PALETTE POPUP)          */}
        {/* ======================================================== */}
        {showThemePicker && (
          <div className="p-3 bg-slate-900/95 border-b border-emerald-800 backdrop-blur-md animate-in slide-in-from-top-2 text-white z-30 flex-shrink-0 shadow-lg">
            <div className="max-w-2xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300">Pilih Warna Background Dzikir:</span>
                <button
                  onClick={() => setShowThemePicker(false)}
                  className="p-1 hover:bg-white/10 rounded-lg text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.values(DZIKIR_THEMES).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleThemeChange(item.id);
                      setShowThemePicker(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 active:scale-95 ${
                      themeMode === item.id
                        ? 'border-amber-400 bg-white/15 ring-2 ring-amber-400 font-bold'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] ${
                        themeMode === item.id ? 'bg-amber-400 text-slate-950 font-black' : 'border border-white/40'
                      }`}
                    >
                      {themeMode === item.id ? '✓' : ''}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-black block leading-tight">{item.name}</span>
                      <span className="text-[10px] text-slate-300 block leading-tight opacity-75">{item.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. SUBHEADER: TAB SEGMENTED PAGI/PETANG & PROGRESS BAR    */}
        {/* ======================================================== */}
        <div className={`px-3.5 sm:px-6 py-2.5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 flex-shrink-0 ${currentTheme.subHeaderBg}`}>
          {/* Segmented Switcher Pagi & Petang */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/10 dark:bg-black/30 border border-black/5 dark:border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('pagi')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition active:scale-95 ${
                activeTab === 'pagi'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm ring-1 ring-amber-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🌅 Dzikir Pagi ({DZIKIR_PAGI.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('petang')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition active:scale-95 ${
                activeTab === 'petang'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm ring-1 ring-indigo-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🌆 Dzikir Petang ({DZIKIR_PETANG.length})</span>
            </button>
          </div>

          {/* Baris Ringkasan Progres & Tasbih */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className={`w-4 h-4 ${completedCount === activeList.length ? 'text-emerald-500' : 'text-amber-500'}`} />
              <span className="leading-tight">
                <strong>{completedCount}</strong> dari {activeList.length} selesai ({progressPercent}%)
              </span>
            </div>

            <div className="w-24 sm:w-32 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden flex-shrink-0">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TOAST INDIKATOR ZOOM PINCH 2 JARI (PERSIS SEPERTI DI QURAN)*/}
        {/* ======================================================== */}
        {zoomIndicator.show && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 text-white border border-amber-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-xl animate-in fade-in flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{zoomIndicator.label}: {zoomIndicator.size} px</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. LIST DAFTAR DZIKIR DENGAN FORMAT KARTU AL-QURAN        */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-3xl mx-auto w-full select-text touch-pan-y">
          {activeList.map((item, index) => {
            const currentCount = counts[item.id] || 0;
            const isFinished = currentCount >= item.target;

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-6 rounded-3xl border transition-all duration-200 ${
                  isFinished ? currentTheme.cardFinished : currentTheme.card
                }`}
              >
                {/* A. HEADER KARTU DZIKIR (NOMOR, JUDUL, TARGET, AKSI) */}
                <div className="flex items-center justify-between pb-3.5 border-b border-black/10 dark:border-white/10 gap-2 flex-wrap">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-8 h-8 rounded-2xl bg-amber-400/20 dark:bg-amber-400/30 text-amber-700 dark:text-amber-300 border border-amber-400/40 font-black text-xs flex items-center justify-center font-mono flex-shrink-0 shadow-2xs">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-black leading-snug break-words">
                        {item.title}
                      </h3>
                      <span className="inline-block mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-mono">
                        Target: {item.target}x
                      </span>
                    </div>
                  </div>

                  {/* Tombol Bagikan & Salin */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* Share WA */}
                    <button
                      onClick={() => handleShareWA(item)}
                      className="w-8 h-8 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition active:scale-95"
                      title="Bagikan ke WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopy(item)}
                      className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 flex items-center justify-center transition active:scale-95"
                      title="Salin teks dzikir"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* B. TEKS ARAB (FONT RESMI DENGAN UKURAN DINAMIS & SMOOTH) */}
                <div
                  className="py-4 sm:py-5 text-right"
                  dir="rtl"
                  data-zoom-zone="arabic"
                >
                  <p
                    style={{
                      fontSize: `${arabicFontSize}px`,
                      lineHeight: '2.5',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      fontFamily: activeFontObj.font
                    }}
                    className={`${activeFontClass} font-normal tracking-wide whitespace-pre-line ${currentTheme.arabicColor}`}
                  >
                    {item.arabic}
                  </p>
                </div>

                {/* C. TRANSLITERASI LATIN */}
                {showLatin && item.latin && (
                  <div
                    className="mt-2 pt-3 border-t border-black/10 dark:border-white/10"
                    data-zoom-zone="latin"
                  >
                    <p
                      style={{ fontSize: `${latinFontSize}px`, lineHeight: '1.7' }}
                      className={`italic font-medium leading-relaxed ${currentTheme.latinColor}`}
                    >
                      {item.latin}
                    </p>
                  </div>
                )}

                {/* D. TERJEMAHAN BAHASA INDONESIA */}
                {showTranslation && (
                  <div
                    className="mt-2.5"
                    data-zoom-zone="translation"
                  >
                    <p
                      style={{ fontSize: `${latinFontSize}px`, lineHeight: '1.7' }}
                      className={`leading-relaxed font-normal ${currentTheme.translationColor}`}
                    >
                      "{item.translation}"
                    </p>
                  </div>
                )}

                {/* E. FAEDAH & DALIL HADITS SHAHIH */}
                {showBenefit && (
                  <div className="mt-3.5 p-3 rounded-2xl bg-amber-400/10 dark:bg-amber-400/15 border border-amber-400/30 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <div className="flex items-start gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="font-semibold leading-relaxed">
                        <strong>Faedah:</strong> {item.benefit}
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 font-mono">
                      📚 {item.dalil}
                    </div>
                  </div>
                )}

                {/* F. TASBIH DIGITAL INTERAKTIF (LEGA, NYAMAN DITEKAN) */}
                <div className="mt-4 pt-3.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-75 font-semibold">
                      Hitungan:
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-black/10 dark:bg-white/15 font-mono">
                      {currentCount} / {item.target}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentCount > 0 && (
                      <button
                        onClick={() => handleResetItem(item.id)}
                        className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition active:scale-95"
                        title="Ulangi hitungan doa ini"
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
                          <span>Selesai ✓</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>+1 Hitung ({currentCount}/{item.target})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 4. MODAL PENGATURAN LENGKAP (PERSIS SEPERTI DI AL-QURAN)   */}
        {/* ======================================================== */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
            <div className={`w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 dark:border-slate-800 ${
              isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            }`}>
              {/* Header Modal Pengaturan */}
              <div className="bg-gradient-to-r from-emerald-950 via-[#064e3b] to-emerald-900 p-4 text-white flex items-center justify-between border-b border-emerald-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-300" />
                  <h3 className="text-base font-black">Pengaturan Tampilan Dzikir</h3>
                </div>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Konten Pengaturan */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-bold">
                {/* 1. SLIDER HURUF ARAB */}
                <div className={`space-y-1.5 p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-emerald-300 text-slate-900'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">Ukuran Huruf Arab</span>
                    <span className="font-mono text-sm px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-black rounded-lg border border-emerald-400">
                      {arabicFontSize} px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleArabicSizeChange(arabicFontSize - 2)}
                      className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center active:scale-95 transition ${
                        isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200'
                      }`}
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min="18"
                      max="48"
                      step="2"
                      value={arabicFontSize}
                      onChange={(e) => handleArabicSizeChange(parseInt(e.target.value, 10))}
                      className="flex-1 accent-[#0a7c29] cursor-pointer"
                    />
                    <button
                      onClick={() => handleArabicSizeChange(arabicFontSize + 2)}
                      className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center active:scale-95 transition ${
                        isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200'
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 2. SLIDER HURUF LATIN & TERJEMAHAN */}
                <div className={`space-y-1.5 p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-emerald-300 text-slate-900'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">Ukuran Huruf Terjemahan & Latin</span>
                    <span className="font-mono text-sm px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-black rounded-lg border border-emerald-400">
                      {latinFontSize} px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLatinSizeChange(latinFontSize - 1)}
                      className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center active:scale-95 transition ${
                        isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200'
                      }`}
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      step="1"
                      value={latinFontSize}
                      onChange={(e) => handleLatinSizeChange(parseInt(e.target.value, 10))}
                      className="flex-1 accent-[#0a7c29] cursor-pointer"
                    />
                    <button
                      onClick={() => handleLatinSizeChange(latinFontSize + 1)}
                      className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center active:scale-95 transition ${
                        isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200'
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 3. GAYA KALIGRAFI ARAB */}
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black">
                    Gaya Kaligrafi Arab
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {CALLIGRAPHY_STYLES.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => handleCalligraphyChange(font.id)}
                        className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                          calligraphyStyle === font.id
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-amber-300'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold block">{font.name}</span>
                          {calligraphyStyle === font.id && <span className="text-amber-300 text-xs font-black">✓</span>}
                        </div>
                        <span className="text-[10px] opacity-75 block">{font.desc}</span>
                        <span
                          style={{ fontFamily: font.font }}
                          className={`text-lg block text-right mt-1.5 font-bold tracking-wide ${
                            calligraphyStyle === font.id ? 'text-amber-300' : 'text-[#0a7c29] dark:text-emerald-400'
                          }`}
                          dir="rtl"
                        >
                          بِسْمِ اللّٰهِ
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. OPSI TOGGLE TEKS (LATIN, TERJEMAHAN, FAEDAH, GETAR) */}
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black">
                    Elemen Bacaan & Getar
                  </div>

                  {/* Transliterasi Latin */}
                  <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}>
                    <div>
                      <span className="block text-xs font-black">Transliterasi Latin</span>
                      <span className="text-[10px] opacity-75 block">Menampilkan ejaan bacaan huruf latin miring</span>
                    </div>
                    <button
                      onClick={handleToggleLatin}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition active:scale-95 ${
                        showLatin ? 'bg-amber-400' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${showLatin ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>

                  {/* Terjemahan Bahasa Indonesia */}
                  <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}>
                    <div>
                      <span className="block text-xs font-black">Terjemahan Arti</span>
                      <span className="text-[10px] opacity-75 block">Menampilkan makna dan arti bahasa Indonesia</span>
                    </div>
                    <button
                      onClick={handleToggleTranslation}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition active:scale-95 ${
                        showTranslation ? 'bg-amber-400' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${showTranslation ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>

                  {/* Faedah & Hadits */}
                  <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}>
                    <div>
                      <span className="block text-xs font-black">Faedah & Sanad Hadits</span>
                      <span className="text-[10px] opacity-75 block">Menampilkan keutamaan dan derajat hadits shahih</span>
                    </div>
                    <button
                      onClick={handleToggleBenefit}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition active:scale-95 ${
                        showBenefit ? 'bg-amber-400' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${showBenefit ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>

                  {/* Getar Haptic Tasbih */}
                  <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}>
                    <div>
                      <span className="block text-xs font-black">Getar (Haptic Feedback) Tasbih</span>
                      <span className="text-[10px] opacity-75 block">Memberikan getaran fisik ringan saat menekan tasbih</span>
                    </div>
                    <button
                      onClick={handleToggleHaptic}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition active:scale-95 ${
                        hapticEnabled ? 'bg-amber-400' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${hapticEnabled ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>
                </div>

                {/* 5. TEMA WARNA BACKGROUND BACAAN */}
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black">
                    Pilihan Warna Background Bacaan
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(DZIKIR_THEMES).map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                          themeMode === theme.id
                            ? 'bg-[#0a7c29] text-white border-[#0a7c29] shadow-md ring-2 ring-emerald-400'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-300'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          themeMode === theme.id ? 'border-amber-300 bg-amber-400' : 'border-slate-400'
                        }`} />
                        <div className="min-w-0">
                          <span className="font-black text-xs block leading-tight">{theme.name}</span>
                          <span className="text-[10px] opacity-80 block leading-tight">{theme.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Tombol Selesai */}
              <div className="p-3 bg-slate-100 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-6 py-2 rounded-xl bg-[#0a7c29] hover:bg-emerald-700 text-white font-black text-xs shadow-md transition active:scale-95"
                >
                  Terapkan & Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
