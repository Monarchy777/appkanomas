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
  Home,
  ShieldCheck
} from 'lucide-react';
import { useBackButton } from '../hooks/useBackButton';

const DAILY_PRAYERS_DATA = [
  // ==========================================
  // KATEGORI: SEHARI-HARI (HARIAN)
  // ==========================================
  {
    id: 'doa-bm-1',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Bangun Tidur',
    arabic: 'الْحَمْدُ لِلّٰهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ',
    latin: 'Alhamdulillaahil-ladzii ahyaanaa ba‘da maa amaatanaa wa ilaihin-nusyuur.',
    meaning: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami (tidur) dan hanya kepada-Nya kami akan dibangkitkan.',
    source: 'HR. Bukhari no. 6312 & Muslim no. 2711 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-2',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Sebelum Tidur',
    arabic: 'بِاسْمِكَ اللّٰهُمَّ أَمُوْتُ وَأَحْيَا',
    latin: 'Bismika Allaahumma amuutu wa ahyaa.',
    meaning: 'Dengan menyebut nama-Mu ya Allah, aku mati dan aku hidup.',
    source: 'HR. Bukhari no. 6324 & Muslim no. 2711 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-3',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Masuk Kamar Mandi / Toilet',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    latin: 'Allaahumma innii a‘uudzu bika minal-khubutsi wal-khabaa-its.',
    meaning: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.',
    source: 'HR. Bukhari no. 142 & Muslim no. 375 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-4',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Sebelum Makan (Tasmiyah)',
    arabic: 'بِسْمِ اللّٰهِ',
    latin: 'Bismillaah.',
    meaning: 'Dengan menyebut nama Allah.',
    source: 'HR. Bukhari no. 5376 & Muslim no. 2022 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-5',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Setelah Makan & Minum',
    arabic: 'الْحَمْدُ لِلّٰهِ كَثِيْرًا طَيِّبًا مُبَارَكًا فِيْهِ، غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا',
    latin: 'Alhamdulillaahi katsiiran thayyiban mubaarakan fiih, ghaira makfiyyin wa laa muwadda‘in wa laa mustaghnan ‘anhu Rabbanaa.',
    meaning: 'Segala puji bagi Allah dengan pujian yang banyak, baik dan penuh berkah di dalamnya, tanpa merasa cukup, tanpa ditinggalkan, dan senantiasa kami butuhkan wahai Tuhan kami.',
    source: 'HR. Bukhari no. 5458'
  },
  {
    id: 'doa-bm-6',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Masuk Masjid',
    arabic: 'اللّٰهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ',
    latin: 'Allaahummaftah lii abwaaba rahmatik.',
    meaning: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
    source: 'HR. Muslim no. 713'
  },
  {
    id: 'doa-bm-7',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Keluar Masjid',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: 'Allaahumma innii as-aluka min fadhlik.',
    meaning: 'Ya Allah, sesungguhnya aku memohon sebagian dari karunia-Mu.',
    source: 'HR. Muslim no. 713'
  },
  {
    id: 'doa-bm-8',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Setelah Mendengar Adzan',
    arabic: 'اللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيْلَةَ وَالْفَضِيْلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُوْدًا الَّذِيْ وَعَدْتَهُ',
    latin: 'Allaahumma rabba haadzihid-da‘watit-taammah, wash-shalaatil-qaa-imah, aati Muhammadanil-wasiilata wal-fadhiilah, wab‘atshu maqaamam-mahmuudanil-ladzii wa‘adtah.',
    meaning: 'Ya Allah, Tuhan pemilik seruan yang sempurna ini dan sholat yang senantiasa ditegakkan, karuniakanlah kepada Nabi Muhammad wasilah dan keutamaan, serta tempatkanlah ia pada kedudukan terpuji yang telah Engkau janjikan kepadanya.',
    source: 'HR. Bukhari no. 614'
  },
  {
    id: 'doa-bm-9',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Ketika Bersin & Mendoakan Saudara (Tasymit)',
    arabic: 'الْحَمْدُ لِلّٰهِ (يَرْحَمُكَ اللّٰهُ - يَهْدِيْكُمُ اللّٰهُ وَيُصْلِحُ بَالَكُمْ)',
    latin: 'Alhamdulillaah (Dijawab: Yarhamukallaah • Lalu didoakan kembali: Yahdiikumullaahu wa yushlihu baalakum).',
    meaning: 'Segala puji bagi Allah (Semoga Allah merahmatimu • Semoga Allah memberimu petunjuk dan memperbaiki keadaanmu).',
    source: 'HR. Bukhari no. 6224'
  },
  {
    id: 'doa-bm-10',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Meredam Amarah (Ketika Marah)',
    arabic: 'أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ',
    latin: 'A‘uudzu billaahi minasy-syaithaanir-rajiim.',
    meaning: 'Aku berlindung kepada Allah dari godaan setan yang terkutuk.',
    source: 'HR. Bukhari no. 6115 & Muslim no. 2610 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-11',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Memohon Petunjuk Istikharah dalam Segala Urusan',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَسْتَخِيْرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيْمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوْبِ',
    latin: 'Allaahumma innii astakhiiruka bi‘ilmika, wa astaadiruka biqudratika, wa as-aluka min fadhlikal-‘azhiim, fa-innaka taqdiru wa laa aqdir, wa ta‘lamu wa laa a‘lam, wa Anta ‘Allaamul-ghuyuub.',
    meaning: 'Ya Allah, sesungguhnya aku memohon petunjuk pilihan dengan ilmu-Mu, memohon kemampuan dengan kodrat-Mu, dan memohon karunia-Mu yang agung. Karena sesungguhnya Engkau Maha Mampu sedang aku tidak mampu, Engkau Maha Mengetahui sedang aku tidak mengetahui, dan Engkaulah Yang Maha Mengetahui perkara-perkara ghaib.',
    source: 'HR. Bukhari no. 1162'
  },
  {
    id: 'doa-bm-12',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Ketika Angin Kencang Menerpa',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيْهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوْذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيْهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ',
    latin: 'Allaahumma innii as-aluka khairahaa wa khaira maa fiihaa wa khaira maa ursilat bih, wa a‘uudzu bika min syarrihaa wa syarri maa fiihaa wa syarri maa ursilat bih.',
    meaning: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan angin ini, kebaikan apa yang ada di dalamnya, dan kebaikan apa yang dibawanya. Dan aku berlindung kepada-Mu dari keburukannya, keburukan apa yang ada di dalamnya, dan keburukan apa yang dibawanya.',
    source: 'HR. Muslim no. 899'
  },
  {
    id: 'doa-bm-13',
    category: 'harian',
    isBukhariMuslim: true,
    title: 'Doa Ketika Hujan Turun (Hujan Berkah & Bermanfaat)',
    arabic: 'اللّٰهُمَّ صَيِّبًا نَافِعًا',
    latin: 'Allaahumma shayyiban naafi‘aa.',
    meaning: 'Ya Allah, curahkanlah hujan yang lebat dan bermanfaat.',
    source: 'HR. Bukhari no. 1032'
  },

  // ==========================================
  // KATEGORI: SHOLAT & DZIKIR (IBADAH)
  // ==========================================
  {
    id: 'doa-bm-14',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Doa Istiftah Sholat (Paling Kuat & Lengkap)',
    arabic: 'اللّٰهُمَّ بَاعِدْ بَيْنِيْ وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللّٰهُمَّ نَقِّنِيْ مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللّٰهُمَّ اغْسِلْنِيْ مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ',
    latin: 'Allaahumma baa‘id bainii wa baina khathaayaaya kamaa baa‘adta bainal-masyriqi wal-maghrib, Allaahumma naqqinii min khathaayaaya kamaa yunaqqats-tsaubul-abyadhu minad-danas, Allaahummagh-silnii min khathaayaaya bits-tsalji wal-maa-i wal-barad.',
    meaning: 'Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan-kesalahanku sebagaimana baju putih dibersihkan dari kotoran. Ya Allah, cucilah aku dari kesalahan-kesalahanku dengan salju, air, dan embun es.',
    source: 'HR. Bukhari no. 744 & Muslim no. 598 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-15',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Doa Ruku\' dan Sujud (Tasbih & Maghfirah)',
    arabic: 'سُبْحَانَكَ اللّٰهُمَّ رَبَّنَا وَبِحَمْدِكَ اللّٰهُمَّ اغْفِرْ لِيْ',
    latin: 'Subhaanaka Allaahumma Rabbanaa wa bihamdika Allaahummagh-fir lii.',
    meaning: 'Maha Suci Engkau ya Allah Tuhan kami, dan dengan memuji-Mu, ya Allah ampunilah dosaku.',
    source: 'HR. Bukhari no. 817 & Muslim no. 484 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-16',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Doa I\'tidal (Pujian Berkah Setelah Ruku\')',
    arabic: 'رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيْرًا طَيِّبًا مُبَارَكًا فِيْهِ',
    latin: 'Rabbanaa wa lakal-hamdu hamdan katsiiran thayyiban mubaarakan fiih.',
    meaning: 'Wahai Tuhan kami, bagi-Mu segala puji, pujian yang banyak, baik, dan penuh keberkahan di dalamnya.',
    source: 'HR. Bukhari no. 799'
  },
  {
    id: 'doa-bm-17',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Doa Saat Sujud (Ampunan Segala Dosa)',
    arabic: 'اللّٰهُمَّ اغْفِرْ لِيْ ذَنْبِيْ كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ',
    latin: 'Allaahummagh-fir lii dzanbii kullahu, diqqahu wa jillahu, wa awwalahu wa aakhirahu, wa ‘alaaniyatahu wa sirrahu.',
    meaning: 'Ya Allah, ampunilah seluruh dosaku, yang kecil maupun yang besar, yang awal maupun yang akhir, yang terang-terangan maupun yang tersembunyi.',
    source: 'HR. Muslim no. 483'
  },
  {
    id: 'doa-bm-18',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Doa Duduk Antara Dua Sujud',
    arabic: 'رَبِّ اغْفِرْ لِيْ، رَبِّ اغْفِرْ لِيْ',
    latin: 'Rabbigh-fir lii, Rabbigh-fir lii.',
    meaning: 'Wahai Tuhanku ampunilah aku, wahai Tuhanku ampunilah aku.',
    source: 'HR. Muslim no. 769 & Ibnu Majah'
  },
  {
    id: 'doa-bm-19',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Doa Sebelum Salam (Perlindungan dari 4 Fitnah Besar)',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيْحِ الدَّجَّالِ',
    latin: 'Allaahumma innii a‘uudzu bika min ‘adzaabi Jahannama, wa min ‘adzaabil-qabri, wa min fitnatil-mahyaa wal-mamaat, wa min syarri fitnatil-Masiihid-Dajjaal.',
    meaning: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari azab Jahannam, dari azab kubur, dari fitnah kehidupan dan kematian, serta dari kejahatan fitnah Al-Masih Ad-Dajjal.',
    source: 'HR. Bukhari no. 1377 & Muslim no. 588 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-20',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Doa Sayyidina Abu Bakar Ash-Shiddiq dalam Sholat',
    arabic: 'اللّٰهُمَّ إِنِّيْ ظَلَمْتُ نَفْسِيْ ظُلْمًا كَثِيْرًا، وَلَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ، فَاغْفِرْ لِيْ مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِيْ، إِنَّكَ أَنْتَ الْغَفُوْرُ الرَّحِيْمُ',
    latin: 'Allaahumma innii zhalamtu nafsii zhulman katsiiraa, wa laa yaghfirudz-dzunuuba illaa Anta, fagh-fir lii maghfiratan min ‘indika warhamnii, innaka Antal-Ghafuurur-Rahiim.',
    meaning: 'Ya Allah, sesungguhnya aku telah banyak menzalimi diriku sendiri, dan tidak ada yang dapat mengampuni dosa-dosa selain Engkau. Maka ampunilah aku dengan ampunan dari sisi-Mu dan rahmatilah aku. Sesungguhnya Engkaulah Yang Maha Pengampun lagi Maha Penyayang.',
    source: 'HR. Bukhari no. 834 & Muslim no. 2705 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-21',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Dzikir Tasbih, Tahmid, Takbir Ba\'da Sholat Fardhu',
    arabic: 'سُبْحَانَ اللّٰهِ (٣٣×)، الْحَمْدُ لِلّٰهِ (٣٣×)، اللّٰهُ أَكْبَرُ (٣٣×)، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    latin: 'Subhaanallaah (33x), Alhamdulillaah (33x), Allaahu Akbar (33x), Laa ilaaha illallaahu wahdahuu laa syariika lah, lahul-mulku wa lahul-hamdu wa Huwa ‘alaa kulli syai-in qadiir.',
    meaning: 'Maha Suci Allah (33x), Segala puji bagi Allah (33x), Allah Maha Besar (33x), Tiada tuhan selain Allah yang Maha Esa tiada sekutu bagi-Nya, milik-Nya segala kerajaan dan bagi-Nya segala puji dan Dia Maha Kuasa atas segala sesuatu.',
    source: 'HR. Muslim no. 597'
  },
  {
    id: 'doa-bm-22',
    category: 'sholat',
    isBukhariMuslim: true,
    title: 'Dzikir Tahlil & Penyerahan Diri Ba\'da Sholat',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ، اللّٰهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
    latin: 'Laa ilaaha illallaahu wahdahuu laa syariika lah, lahul-mulku wa lahul-hamdu wa Huwa ‘alaa kulli syai-in qadiir. Allaahumma laa maani‘a limaa a‘thaita, wa laa mu‘thiya limaa mana‘ta, wa laa yanfa‘u dzal-jaddi minkal-jadd.',
    meaning: 'Tiada tuhan selain Allah yang Maha Esa, tiada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji dan Dia Maha Kuasa atas segala sesuatu. Ya Allah tidak ada yang dapat menghalangi apa yang Engkau berikan, dan tidak ada yang dapat memberi apa yang Engkau halangi, dan tidak bermanfaat kekayaan orang kaya dari siksa-Mu.',
    source: 'HR. Bukhari no. 844 & Muslim no. 593 (Muttafaq ‘Alaih)'
  },

  // ==========================================
  // KATEGORI: SAFAR (PERJALANAN / TRANSPORTASI)
  // ==========================================
  {
    id: 'doa-bm-23',
    category: 'safar',
    isBukhariMuslim: true,
    title: 'Doa Naik Kendaraan (Pesawat / Bus / Mobil)',
    arabic: 'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ',
    latin: 'Subhaanal-ladzii sakh-khara lanaa haadzaa wa maa kunnaa lahuu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun.',
    meaning: 'Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.',
    source: 'HR. Muslim no. 1342 & QS. Az-Zukhruf: 13-14'
  },
  {
    id: 'doa-bm-24',
    category: 'safar',
    isBukhariMuslim: true,
    title: 'Doa Memulai Perjalanan Jauh (Safar Umrah/Haji)',
    arabic: 'اللّٰهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هٰذَا وَاطْوِ عَنَّا بُعْدَهُ، اللّٰهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيْفَةُ فِي الْأَهْلِ',
    latin: 'Allaahumma hawwin ‘alainaa safaranaa haadzaa wathwi ‘annaa bu‘dah, Allaahumma Antash-shaahibu fis-safari wal-khaliifatu fil-ahl.',
    meaning: 'Ya Allah, mudahkanlah perjalanan kami ini dan dekatkanlah kejauhannya. Ya Allah, Engkaulah pendamping dalam perjalanan dan pelindung keluarga yang ditinggalkan.',
    source: 'HR. Muslim no. 1342'
  },
  {
    id: 'doa-bm-25',
    category: 'safar',
    isBukhariMuslim: true,
    title: 'Doa Singgah di Suatu Tempat / Hotel / Transit',
    arabic: 'أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: 'A‘uudzu bikalimaatillaahit-taammaati min syarri maa khalaq.',
    meaning: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan apa yang telah Dia ciptakan.',
    source: 'HR. Muslim no. 2708'
  },
  {
    id: 'doa-bm-26',
    category: 'safar',
    isBukhariMuslim: true,
    title: 'Doa Kembali dari Safar / Pulang ke Tanah Air',
    arabic: 'آيِبُوْنَ تَائِبُوْنَ عَابِدُوْنَ لِرَبِّنَا حَامِدُوْنَ',
    latin: 'Aayibuuna taa-ibuuna ‘aabiduuna lirabbinaa haamiduun.',
    meaning: 'Kami kembali dengan bertaubat, senantiasa beribadah, dan kepada Tuhan kami, kami senantiasa memuji.',
    source: 'HR. Bukhari no. 1797 & Muslim no. 1345 (Muttafaq ‘Alaih)'
  },

  // ==========================================
  // KATEGORI: TANAH SUCI (MAKKAH & MADINAH)
  // ==========================================
  {
    id: 'doa-bm-27',
    category: 'tanah_suci',
    isBukhariMuslim: true,
    title: 'Lafaz Talbiyah Haji & Umrah Resmi Rasulullah ﷺ',
    arabic: 'لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيْكَ لَكَ',
    latin: 'Labbaik Allaahumma labbaik, labbaika laa syariika laka labbaik, innal-hamda wan-ni‘mata laka wal-mulk, laa syariika lak.',
    meaning: 'Aku penuhi panggilan-Mu ya Allah, aku penuhi panggilan-Mu. Aku penuhi panggilan-Mu tiada sekutu bagi-Mu, aku penuhi panggilan-Mu. Sesungguhnya segala puji, kenikmatan, dan kerajaan adalah milik-Mu, tiada sekutu bagi-Mu.',
    source: 'HR. Bukhari no. 1549 & Muslim no. 1184 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-28',
    category: 'tanah_suci',
    isBukhariMuslim: true,
    title: 'Doa Thawaf Antara Rukun Yamani dan Hajar Aswad',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa ‘adzaaban-naar.',
    meaning: 'Wahai Tuhan kami, berikanlah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    source: 'QS. Al-Baqarah: 201 & HR. Bukhari no. 4522 & Muslim no. 2690'
  },
  {
    id: 'doa-bm-29',
    category: 'tanah_suci',
    isBukhariMuslim: true,
    title: 'Takbir Saat Melintasi / Mengusap Hajar Aswad',
    arabic: 'اللّٰهُ أَكْبَرُ',
    latin: 'Allaahu Akbar.',
    meaning: 'Allah Maha Besar.',
    source: 'HR. Bukhari no. 1613'
  },
  {
    id: 'doa-bm-30',
    category: 'tanah_suci',
    isBukhariMuslim: true,
    title: 'Doa di Bukit Shafa dan Marwah Saat Sa\'i',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ',
    latin: 'Laa ilaaha illallaahu wahdahuu laa syariika lah, lahul-mulku wa lahul-hamdu wa Huwa ‘alaa kulli syai-in qadiir, laa ilaaha illallaahu wahdah, anjaza wa‘dah, wa nashara ‘abdah, wa hazamal-ahzaaba wahdah.',
    meaning: 'Tiada tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Milik-Nya segala kerajaan dan bagi-Nya segala puji dan Dia Maha Kuasa atas segala sesuatu. Tiada tuhan selain Allah semata, Dia menepati janji-Nya, menolong hamba-Nya, dan mengalahkan musuh sendirian.',
    source: 'HR. Muslim no. 1218 (Hadits Shahih Jabir RA)'
  },
  {
    id: 'doa-bm-31',
    category: 'tanah_suci',
    isBukhariMuslim: true,
    title: 'Doa Memohon Keberkahan Kota Madinah Al-Munawwarah',
    arabic: 'اللّٰهُمَّ اجْعَلْ بِالْمَدِيْنَةِ ضِعْفَيْ مَا جَعَلْتَ بِمَكَّةَ مِنَ الْبَرَكَةِ',
    latin: 'Allaahummaj‘al bil-Madiinati dhi‘fai maa ja‘alta bi-Makkata minal-barakah.',
    meaning: 'Ya Allah, jadikanlah di kota Madinah ini kelipatan dua kali berkah yang Engkau jadikan di kota Makkah.',
    source: 'HR. Bukhari no. 1885 & Muslim no. 1369 (Muttafaq ‘Alaih)'
  },

  // ==========================================
  // KATEGORI: DOA MUSTAJAB & PERLINDUNGAN
  // ==========================================
  {
    id: 'doa-bm-32',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Sayyidul Istighfar (Induk Segala Doa Pengampunan)',
    arabic: 'اللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ خَلَقْتَنِيْ وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ',
    latin: 'Allaahumma Anta Rabbii laa ilaaha illaa Anta khalaqtanii wa anaa ‘abduka wa anaa ‘alaa ‘ahdika wa wa‘dika mastatha‘tu, a‘uudzu bika min syarri maa shana‘tu, abuu-u laka bini‘matika ‘alayya wa abuu-u bidzanbii faghfir lii fa-innahuu laa yaghfirudz-dzunuuba illaa Anta.',
    meaning: 'Ya Allah, Engkaulah Tuhanku, tiada tuhan selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu. Aku senantiasa dalam perjanjian-Mu dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan yang telah kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, sesungguhnya tiada yang dapat mengampuni dosa selain Engkau.',
    source: 'HR. Bukhari no. 6306'
  },
  {
    id: 'doa-bm-33',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Kesusahan Besar / Kegalauan Hati (Dua\'ul Karb)',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ الْعَظِيْمُ الْحَلِيْمُ، لَا إِلٰهَ إِلَّا اللّٰهُ رَبُّ الْعَرْشِ الْعَظِيْمِ، لَا إِلٰهَ إِلَّا اللّٰهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيْمِ',
    latin: 'Laa ilaaha illallaahul-‘Azhiimul-Haliim, laa ilaaha illallaahu Rabbul-‘arsyil-‘azhiim, laa ilaaha illallaahu Rabbus-samaawaati wa Rabbul-ardhi wa Rabbul-‘arsyil-kariim.',
    meaning: 'Tiada tuhan selain Allah Yang Maha Agung lagi Maha Penyantun. Tiada tuhan selain Allah Tuhan Pemilik Arsy yang agung. Tiada tuhan selain Allah Tuhan Pemilik langit, bumi, dan Arsy yang mulia.',
    source: 'HR. Bukhari no. 6346 & Muslim no. 2730 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-34',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Menghilangkan Kesedihan, Rasa Malas & Lilitan Utang',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    latin: 'Allaahumma innii a‘uudzu bika minal-hammi wal-hazani, wa a‘uudzu bika minal-‘ajzi wal-kasali, wa a‘uudzu bika minal-jubni wal-bukhli, wa a‘uudzu bika min ghalabatid-daini wa qahrir-rijaal.',
    meaning: 'Ya Allah, sungguh aku berlindung kepada-Mu dari rasa gelisah dan sedih, aku berlindung kepada-Mu dari rasa lemah dan malas, aku berlindung kepada-Mu dari sifat pengecut dan kikir, dan aku berlindung kepada-Mu dari lilitan utang serta penindasan orang lain.',
    source: 'HR. Bukhari no. 2893'
  },
  {
    id: 'doa-bm-35',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Memohon Petunjuk, Ketaqwaan, Kesucian & Kecukupan',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    latin: 'Allaahumma innii as-alukal-hudaa wat-tuqaa wal-‘afaafa wal-ghinaa.',
    meaning: 'Ya Allah, sesungguhnya aku memohon kepada-Mu petunjuk, ketakwaan, kesucian diri (dari yang haram), dan kecukupan (hati dan harta).',
    source: 'HR. Muslim no. 2721'
  },
  {
    id: 'doa-bm-36',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Kebaikan Agama, Dunia, dan Akhirat (Komprehensif)',
    arabic: 'اللّٰهُمَّ أَصْلِحْ لِيْ دِيْنِيَ الَّذِيْ هُوَ عِصْمَةُ أَمْرِيْ، وَأَصْلِحْ لِيْ دُنْيَايَ الَّتِيْ فِيْهَا مَعَاشِيْ، وَأَصْلِحْ لِيْ آخِرَتِيَ الَّتِيْ فِيْهَا مَعَادِيْ، وَاجْعَلِ الْحَيَاةَ زِيَادَةً لِيْ فِيْ كُلِّ خَيْرٍ، وَاجْعَلِ الْمَوْتَ رَاحَةً لِيْ مِنْ كُلِّ شَرٍّ',
    latin: 'Allaahumma ashlih lii diiniyal-ladzii huwa ‘ishmatu amrii, wa ashlih lii dunyaayal-latii fiihaa ma‘aasyii, wa ashlih lii aakhiratiyal-latii fiihaa ma‘aadii, waj‘alil-hayaata ziyaadatan lii fii kulli khair, waj‘alil-mauta raahatan lii min kulli syarr.',
    meaning: 'Ya Allah perbaikilah bagiku agamaku yang menjadi pegangan urusanku, perbaikilah bagiku duniaku yang menjadi tempat penghidupanku, perbaikilah bagiku akhiratku yang menjadi tempat kembaliku. Jadikanlah kehidupan ini penambah bagiku dalam setiap kebaikan, dan jadikanlah kematian kelegaan bagiku dari segala keburukan.',
    source: 'HR. Muslim no. 2720'
  },
  {
    id: 'doa-bm-37',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Perlindungan dari Takdir Buruk & Cobaan Berat',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ، وَدَرَكِ الشَّقَاءِ، وَسُوْءِ الْقَضَاءِ، وَشَمَاتَةِ الْأَعْدَاءِ',
    latin: 'Allaahumma innii a‘uudzu bika min jahdil-balaa-i, wa darakisy-syaqaa-i, wa suu-il-qadhaa-i, wa syamaatatil-a‘daa-i.',
    meaning: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari beratnya cobaan, bertemunya kesengsaraan, buruknya takdir, dan kegembiraan musuh atas penderitaanku.',
    source: 'HR. Bukhari no. 6347 & Muslim no. 2707 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-38',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Keteguhan Hati & Ketaatan',
    arabic: 'اللّٰهُمَّ مُصَرِّفَ الْقُلُوْبِ صَرِّفْ قُلُوْبَنَا عَلَى طَاعَتِكَ',
    latin: 'Allaahumma musharrifal-quluubi sharrif quluubanaa ‘alaa thaa‘atik.',
    meaning: 'Ya Allah Yang Maha Memalingkan hati, palingkanlah hati kami untuk senantiasa tunduk pada ketaatan-Mu.',
    source: 'HR. Muslim no. 2654'
  },
  {
    id: 'doa-bm-39',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Menjenguk Orang Sakit & Mohon Kesembuhan',
    arabic: 'اللّٰهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِيْ، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
    latin: "Allaahumma Rabban-naasi adzhibil-ba's, isyfihi wa Antasy-Syaafii, laa syifaa-a illaa syifaa-uka, syifaa-an laa yughaadiru saqamaa.",
    meaning: 'Ya Allah Tuhan seluruh manusia, hilangkanlah penyakit ini dan sembuhkanlah dia. Engkaulah Maha Penyembuh, tiada kesembuhan melainkan kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan rasa sakit.',
    source: 'HR. Bukhari no. 5675 & Muslim no. 2191 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-40',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Memohon Perlindungan dari Hilangnya Nikmat & Sakit Tiba-tiba',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ، وَتَحَوُّلِ عَافِيَتِكَ، وَفُجَاءَةِ نِقْمَتِكَ، وَجَمِيْعِ سَخَطِكَ',
    latin: 'Allaahumma innii a‘uudzu bika min zawaali ni‘matik, wa tahawwuli ‘aafiyatik, wa fujaa-ati niqmatik, wa jamii‘i sakhathik.',
    meaning: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari lenyapnya kenikmatan-Mu, berubahnya kesehatan dari-Mu, datangnya siksa-Mu secara tiba-tiba, dan dari seluruh kemurkaan-Mu.',
    source: 'HR. Muslim no. 2739'
  },
  {
    id: 'doa-bm-41',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Kesucian & Ketaqwaan Jiwa',
    arabic: 'اللّٰهُمَّ آتِ نَفْسِيْ تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا',
    latin: 'Allaahumma aati nafsii taqwaahaa, wa zakkihaa Anta khairu man zakkaahaa, Anta waliyyuhaa wa maulaahaa.',
    meaning: 'Ya Allah, berikanlah ketakwaan pada jiwaku dan sucikanlah ia. Engkaulah sebaik-baik yang menyucikannya, Engkaulah pelindung dan penolongnya.',
    source: 'HR. Muslim no. 2722'
  },
  {
    id: 'doa-bm-42',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Ampunan Seluruh Dosa, Kesengajaan & Kealpaan',
    arabic: 'اللّٰهُمَّ اغْفِرْ لِيْ خَطِيْئَتِيْ وَجَهْلِيْ، وَإِسْرَافِيْ فِيْ أَمْرِيْ، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّيْ، اللّٰهُمَّ اغْفِرْ لِيْ جِدِّيْ وَهَزْلِيْ، وَخَطَئِيْ وَعَمْدِيْ، وَكُلُّ ذٰلِكَ عِنْدِيْ',
    latin: 'Allaahummagh-fir lii khathii-atii wa jahlii, wa israafii fii amrii, wa maa Anta a‘lamu bihii minnii, Allaahummagh-fir lii jiddii wa hazlii, wa khatha-ii wa ‘amdii, wa kullu dzaalika ‘indii.',
    meaning: 'Ya Allah ampunilah kesalahanku, kebodohanku, sikap berlebih-lebihan dalam urusanku, dan segala apa yang Engkau lebih ketahui daripada diriku. Ya Allah ampunilah kesungguhanku dan candaku, ketidaksengajaanku dan kesengajaanku, dan semua itu ada pada diriku.',
    source: 'HR. Bukhari no. 6398 & Muslim no. 2719 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-43',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Saat Tertimpa Musibah (Istirja\' & Ganti Terbaik)',
    arabic: 'إِنَّا لِلّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُوْنَ، اللّٰهُمَّ أْجُرْنِيْ فِيْ مُصِيْبَتِيْ وَأَخْلِفْ لِيْ خَيْرًا مِنْهَا',
    latin: 'Innaa lillaahi wa innaa ilaihi raaji‘uun, Allaahumma\'jurnii fii mushiibatii wa akhlif lii khairan minhaa.',
    meaning: 'Sesungguhnya kami milik Allah dan kepada-Nya kami kembali. Ya Allah berilah pahala atas musibah yang menimpaku ini dan gantilah untukku dengan yang lebih baik daripadanya.',
    source: 'HR. Muslim no. 918'
  },
  {
    id: 'doa-bm-44',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Dzikir Tahlil 100x (Pelebur 100 Dosa & Benteng Setan)',
    arabic: 'لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    latin: 'Laa ilaaha illallaahu wahdahuu laa syariika lah, lahul-mulku wa lahul-hamdu, wa Huwa ‘alaa kulli syai-in qadiir.',
    meaning: 'Tiada tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Milik-Nya segala kerajaan dan bagi-Nya segala puji, dan Dia Maha Kuasa atas segala sesuatu.',
    source: 'HR. Bukhari no. 3293 & Muslim no. 2691 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-45',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Dua Kalimat Dicintai Ar-Rahman & Berat di Timbangan (Kalimataan)',
    arabic: 'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ، سُبْحَانَ اللّٰهِ الْعَظِيْمِ',
    latin: 'Subhaanallaahi wa bihamdih, Subhaanallaahil-‘Azhiim.',
    meaning: 'Maha Suci Allah dan dengan memuji-Nya, Maha Suci Allah Yang Maha Agung.',
    source: 'HR. Bukhari no. 6406 & Muslim no. 2694 (Muttafaq ‘Alaih)'
  },
  {
    id: 'doa-bm-46',
    category: 'mustajab',
    isBukhariMuslim: true,
    title: 'Doa Perlindungan dari Fitnah Neraka & Siksa Kubur',
    arabic: 'اللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ فِتْنَةِ النَّارِ وَعَذَابِ النَّارِ، وَفِتْنَةِ الْقَبْرِ وَعَذَابِ الْقَبْرِ، وَشَرِّ فِتْنَةِ الْغِنَى، وَشَرِّ فِتْنَةِ الْفَقْرِ',
    latin: 'Allaahumma innii a‘uudzu bika min fitnatin-naari wa ‘adzaabin-naar, wa fitnatil-qabri wa ‘adzaabil-qabri, wa syarri fitnatil-ghinaa, wa syarri fitnatil-faqr.',
    meaning: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari fitnah neraka dan siksa neraka, dari fitnah kubur dan siksa kubur, dari keburukan fitnah kekayaan, dan dari keburukan fitnah kemiskinan.',
    source: 'HR. Bukhari no. 6377 & Muslim no. 589 (Muttafaq ‘Alaih)'
  }
];

export default function DailyPrayersModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('bukhari_muslim'); // 'bukhari_muslim' | 'semua' | 'harian' | 'sholat' | 'safar' | 'tanah_suci' | 'mustajab'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Navigasi Tombol Back HP Android untuk bersihkan pencarian atau kembali ke tab utama
  useBackButton(() => setSearchQuery(''), !!searchQuery && searchQuery.trim() !== '', 20, 'daily_prayers_search');
  useBackButton(() => setActiveTab('bukhari_muslim'), activeTab !== 'bukhari_muslim' && (!searchQuery || searchQuery.trim() === ''), 15, 'daily_prayers_tab');

  const bukhariMuslimCount = DAILY_PRAYERS_DATA.filter((d) => d.isBukhariMuslim).length;

  const filteredPrayers = DAILY_PRAYERS_DATA.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (activeTab === 'semua') return true;
    if (activeTab === 'bukhari_muslim') return item.isBukhariMuslim;
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
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Doa Shahih Bukhari & Muslim
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 hidden sm:inline-block">
                  100% Shahih Hadits
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Kumpulan doa ma'tsur riwayat Imam Bukhari dan Imam Muslim dengan sanad shahih
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
              placeholder="Cari doa (misal: istikharah, bangun tidur, sujud, kesedihan, bukhari)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition"
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
              onClick={() => setActiveTab('bukhari_muslim')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'bukhari_muslim'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Shahih Bukhari & Muslim ({bukhariMuslimCount})</span>
            </button>
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
              onClick={() => setActiveTab('sholat')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'sholat'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sholat & Dzikir</span>
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
              <span>Tanah Suci</span>
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
              <span>Doa Mustajab</span>
            </button>
          </div>
        </div>

        {/* LIST OF PRAYERS */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredPrayers.map((prayer, idx) => (
            <div
              key={prayer.id || idx}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition shadow-xs space-y-3"
            >
              {/* Header Card Doa */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <strong className="text-sm sm:text-base font-bold text-slate-900">
                      {prayer.title}
                    </strong>
                    {prayer.isBukhariMuslim && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Shahih Bukhari & Muslim
                      </span>
                    )}
                  </div>
                </div>
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

              {/* Teks Arab (Auto Justified & Elegan) */}
              <div className="w-full py-1" dir="rtl">
                <p
                  style={{
                    textAlign: 'justify',
                    textAlignLast: 'right',
                    textJustify: 'auto',
                    width: '100%'
                  }}
                  className="font-arabic text-2xl sm:text-3xl text-slate-900 leading-loose font-normal select-text"
                >
                  {prayer.arabic}
                </p>
              </div>

              {/* Transliterasi Latin (Auto Justified) */}
              <div className="mt-3 pt-2 border-t border-slate-100 w-full">
                <p
                  style={{
                    textAlign: 'justify',
                    textAlignLast: 'left',
                    textJustify: 'inter-word',
                    hyphens: 'auto',
                    width: '100%'
                  }}
                  className="text-xs sm:text-sm text-amber-800 italic font-medium leading-relaxed select-text"
                >
                  {prayer.latin}
                </p>
              </div>

              {/* Terjemahan (Auto Justified) */}
              <div className="mt-2 w-full">
                <p
                  style={{
                    textAlign: 'justify',
                    textAlignLast: 'left',
                    textJustify: 'inter-word',
                    hyphens: 'auto',
                    width: '100%'
                  }}
                  className="text-xs sm:text-sm text-slate-700 leading-relaxed select-text"
                >
                  "{prayer.meaning}"
                </p>
              </div>

              {/* Riwayat Dalil */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Sumber Dalil: <strong className="text-emerald-700 font-semibold">{prayer.source}</strong></span>
              </div>
            </div>
          ))}

          {filteredPrayers.length === 0 && (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <p className="text-sm font-semibold">Tidak ada doa yang cocok dengan pencarian Anda</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-emerald-700 font-bold hover:underline"
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
