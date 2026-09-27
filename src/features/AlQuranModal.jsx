import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Search,
  X,
  Play,
  Pause,
  Volume2,
  Bookmark,
  Share2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Sliders,
  RotateCcw,
  Loader2,
  Headphones,
  Compass,
  Palette,
  Eye,
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
  Sun,
  Moon,
  Coffee,
  CheckCircle2,
  Repeat,
  Type,
  HelpCircle,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

// Daftar 114 Surah Lengkap (Preloaded agar cepat terbuka 0ms dan offline-ready)
export const SURAH_LIST = [
  { nomor: 1, nama: "الفاتحة", namaLatin: "Al-Fatihah", arti: "Pembukaan", jumlahAyat: 7, tempatTurun: "Mekah" },
  { nomor: 2, nama: "البقرة", namaLatin: "Al-Baqarah", arti: "Sapi Betina", jumlahAyat: 286, tempatTurun: "Madinah" },
  { nomor: 3, nama: "آل عمران", namaLatin: "Ali 'Imran", arti: "Keluarga Imran", jumlahAyat: 200, tempatTurun: "Madinah" },
  { nomor: 4, nama: "النساء", namaLatin: "An-Nisa'", arti: "Wanita", jumlahAyat: 176, tempatTurun: "Madinah" },
  { nomor: 5, nama: "المائدة", namaLatin: "Al-Ma'idah", arti: "Hidangan", jumlahAyat: 120, tempatTurun: "Madinah" },
  { nomor: 6, nama: "الانعام", namaLatin: "Al-An'am", arti: "Binatang Ternak", jumlahAyat: 165, tempatTurun: "Mekah" },
  { nomor: 7, nama: "الاعراف", namaLatin: "Al-A'raf", arti: "Tempat Tertinggi", jumlahAyat: 206, tempatTurun: "Mekah" },
  { nomor: 8, nama: "الانفال", namaLatin: "Al-Anfal", arti: "Rampasan Perang", jumlahAyat: 75, tempatTurun: "Madinah" },
  { nomor: 9, nama: "التوبة", namaLatin: "At-Taubah", arti: "Pengampunan", jumlahAyat: 129, tempatTurun: "Madinah" },
  { nomor: 10, nama: "يونس", namaLatin: "Yunus", arti: "Nabi Yunus", jumlahAyat: 109, tempatTurun: "Mekah" },
  { nomor: 11, nama: "هود", namaLatin: "Hud", arti: "Nabi Hud", jumlahAyat: 123, tempatTurun: "Mekah" },
  { nomor: 12, nama: "يوسف", namaLatin: "Yusuf", arti: "Nabi Yusuf", jumlahAyat: 111, tempatTurun: "Mekah" },
  { nomor: 13, nama: "الرعد", namaLatin: "Ar-Ra'd", arti: "Guruh", jumlahAyat: 43, tempatTurun: "Madinah" },
  { nomor: 14, nama: "ابراهيم", namaLatin: "Ibrahim", arti: "Nabi Ibrahim", jumlahAyat: 52, tempatTurun: "Mekah" },
  { nomor: 15, nama: "الحجر", namaLatin: "Al-Hijr", arti: "Gunung Al-Hijr", jumlahAyat: 99, tempatTurun: "Mekah" },
  { nomor: 16, nama: "النحل", namaLatin: "An-Nahl", arti: "Lebah", jumlahAyat: 128, tempatTurun: "Mekah" },
  { nomor: 17, nama: "الاسراء", namaLatin: "Al-Isra'", arti: "Memperjalankan Malam", jumlahAyat: 111, tempatTurun: "Mekah" },
  { nomor: 18, nama: "الكهف", namaLatin: "Al-Kahf", arti: "Gua", jumlahAyat: 110, tempatTurun: "Mekah" },
  { nomor: 19, nama: "مريم", namaLatin: "Maryam", arti: "Maryam", jumlahAyat: 98, tempatTurun: "Mekah" },
  { nomor: 20, nama: "طه", namaLatin: "Taha", arti: "Taha", jumlahAyat: 135, tempatTurun: "Mekah" },
  { nomor: 21, nama: "الانبياء", namaLatin: "Al-Anbiya'", arti: "Para Nabi", jumlahAyat: 112, tempatTurun: "Mekah" },
  { nomor: 22, nama: "الحج", namaLatin: "Al-Hajj", arti: "Haji", jumlahAyat: 78, tempatTurun: "Madinah" },
  { nomor: 23, nama: "المؤمنون", namaLatin: "Al-Mu'minun", arti: "Orang Beriman", jumlahAyat: 118, tempatTurun: "Mekah" },
  { nomor: 24, nama: "النور", namaLatin: "An-Nur", arti: "Cahaya", jumlahAyat: 64, tempatTurun: "Madinah" },
  { nomor: 25, nama: "الفرقان", namaLatin: "Al-Furqan", arti: "Pembeda", jumlahAyat: 77, tempatTurun: "Mekah" },
  { nomor: 26, nama: "الشعراء", namaLatin: "Asy-Syu'ara'", arti: "Penyair", jumlahAyat: 227, tempatTurun: "Mekah" },
  { nomor: 27, nama: "النمل", namaLatin: "An-Naml", arti: "Semut", jumlahAyat: 93, tempatTurun: "Mekah" },
  { nomor: 28, nama: "القصص", namaLatin: "Al-Qasas", arti: "Kisah-Kisah", jumlahAyat: 88, tempatTurun: "Mekah" },
  { nomor: 29, nama: "العنكبوت", namaLatin: "Al-'Ankabut", arti: "Laba-Laba", jumlahAyat: 69, tempatTurun: "Mekah" },
  { nomor: 30, nama: "الروم", namaLatin: "Ar-Rum", arti: "Bangsa Romawi", jumlahAyat: 60, tempatTurun: "Mekah" },
  { nomor: 31, nama: "لقمان", namaLatin: "Luqman", arti: "Keluarga Luqman", jumlahAyat: 34, tempatTurun: "Mekah" },
  { nomor: 32, nama: "السجدة", namaLatin: "As-Sajdah", arti: "Sujud", jumlahAyat: 30, tempatTurun: "Mekah" },
  { nomor: 33, nama: "الاحزاب", namaLatin: "Al-Ahzab", arti: "Golongan Bersekutu", jumlahAyat: 73, tempatTurun: "Madinah" },
  { nomor: 34, nama: "سبأ", namaLatin: "Saba'", arti: "Kaum Saba'", jumlahAyat: 54, tempatTurun: "Mekah" },
  { nomor: 35, nama: "فاطر", namaLatin: "Fatir", arti: "Pencipta", jumlahAyat: 45, tempatTurun: "Mekah" },
  { nomor: 36, nama: "يس", namaLatin: "Yasin", arti: "Yasin", jumlahAyat: 83, tempatTurun: "Mekah" },
  { nomor: 37, nama: "الصافات", namaLatin: "As-Saffat", arti: "Barisan-Barisan", jumlahAyat: 182, tempatTurun: "Mekah" },
  { nomor: 38, nama: "ص", namaLatin: "Sad", arti: "Shad", jumlahAyat: 88, tempatTurun: "Mekah" },
  { nomor: 39, nama: "الزمر", namaLatin: "Az-Zumar", arti: "Rombongan", jumlahAyat: 75, tempatTurun: "Mekah" },
  { nomor: 40, nama: "غافر", namaLatin: "Ghafir", arti: "Yang Mengampuni", jumlahAyat: 85, tempatTurun: "Mekah" },
  { nomor: 41, nama: "فصلت", namaLatin: "Fussilat", arti: "Dijelaskan", jumlahAyat: 54, tempatTurun: "Mekah" },
  { nomor: 42, nama: "الشورى", namaLatin: "Asy-Syura", arti: "Musyawarah", jumlahAyat: 53, tempatTurun: "Mekah" },
  { nomor: 43, nama: "الزخرف", namaLatin: "Az-Zukhruf", arti: "Perhiasan Emas", jumlahAyat: 89, tempatTurun: "Mekah" },
  { nomor: 44, nama: "الدخان", namaLatin: "Ad-Dukhan", arti: "Kabut Asap", jumlahAyat: 59, tempatTurun: "Mekah" },
  { nomor: 45, nama: "الجاثية", namaLatin: "Al-Jasiyah", arti: "Yang Berlutut", jumlahAyat: 37, tempatTurun: "Mekah" },
  { nomor: 46, nama: "الاحقاف", namaLatin: "Al-Ahqaf", arti: "Bukit-Bukit Pasir", jumlahAyat: 35, tempatTurun: "Mekah" },
  { nomor: 47, nama: "محمد", namaLatin: "Muhammad", arti: "Nabi Muhammad", jumlahAyat: 38, tempatTurun: "Madinah" },
  { nomor: 48, nama: "الفتح", namaLatin: "Al-Fath", arti: "Kemenangan", jumlahAyat: 29, tempatTurun: "Madinah" },
  { nomor: 49, nama: "الحجرات", namaLatin: "Al-Hujurat", arti: "Kamar-Kamar", jumlahAyat: 18, tempatTurun: "Madinah" },
  { nomor: 50, nama: "ق", namaLatin: "Qaf", arti: "Qaf", jumlahAyat: 45, tempatTurun: "Mekah" },
  { nomor: 51, nama: "الذاريات", namaLatin: "Az-Zariyat", arti: "Angin Menerbangkan", jumlahAyat: 60, tempatTurun: "Mekah" },
  { nomor: 52, nama: "الطور", namaLatin: "At-Tur", arti: "Bukit Tursina", jumlahAyat: 49, tempatTurun: "Mekah" },
  { nomor: 53, nama: "النجم", namaLatin: "An-Najm", arti: "Bintang", jumlahAyat: 62, tempatTurun: "Mekah" },
  { nomor: 54, nama: "القمر", namaLatin: "Al-Qamar", arti: "Bulan", jumlahAyat: 55, tempatTurun: "Mekah" },
  { nomor: 55, nama: "الرحمن", namaLatin: "Ar-Rahman", arti: "Maha Pengasih", jumlahAyat: 78, tempatTurun: "Madinah" },
  { nomor: 56, nama: "الواقعة", namaLatin: "Al-Waqi'ah", arti: "Hari Kiamat", jumlahAyat: 96, tempatTurun: "Mekah" },
  { nomor: 57, nama: "الحديد", namaLatin: "Al-Hadid", arti: "Besi", jumlahAyat: 29, tempatTurun: "Madinah" },
  { nomor: 58, nama: "المجادلة", namaLatin: "Al-Mujadilah", arti: "Gugatan", jumlahAyat: 22, tempatTurun: "Madinah" },
  { nomor: 59, nama: "الحشر", namaLatin: "Al-Hasyr", arti: "Pengusiran", jumlahAyat: 24, tempatTurun: "Madinah" },
  { nomor: 60, nama: "الممتحنة", namaLatin: "Al-Mumtahanah", arti: "Wanita Teruji", jumlahAyat: 13, tempatTurun: "Madinah" },
  { nomor: 61, nama: "الصف", namaLatin: "As-Saff", arti: "Barisan", jumlahAyat: 14, tempatTurun: "Madinah" },
  { nomor: 62, nama: "الجمعة", namaLatin: "Al-Jumu'ah", arti: "Hari Jumat", jumlahAyat: 11, tempatTurun: "Madinah" },
  { nomor: 63, nama: "المنافقون", namaLatin: "Al-Munafiqun", arti: "Kaum Munafik", jumlahAyat: 11, tempatTurun: "Madinah" },
  { nomor: 64, nama: "التغابن", namaLatin: "At-Tagabun", arti: "Hari Pengungkapan", jumlahAyat: 18, tempatTurun: "Madinah" },
  { nomor: 65, nama: "الطلاق", namaLatin: "At-Talaq", arti: "Perceraian", jumlahAyat: 12, tempatTurun: "Madinah" },
  { nomor: 66, nama: "التحريم", namaLatin: "At-Tahrim", arti: "Pengharaman", jumlahAyat: 12, tempatTurun: "Madinah" },
  { nomor: 67, nama: "الملك", namaLatin: "Al-Mulk", arti: "Kerajaan", jumlahAyat: 30, tempatTurun: "Mekah" },
  { nomor: 68, nama: "القلم", namaLatin: "Al-Qalam", arti: "Pena", jumlahAyat: 52, tempatTurun: "Mekah" },
  { nomor: 69, nama: "الحاقة", namaLatin: "Al-Haqqah", arti: "Hari Pasti Terjadi", jumlahAyat: 52, tempatTurun: "Mekah" },
  { nomor: 70, nama: "المعارج", namaLatin: "Al-Ma'arij", arti: "Tempat Naik", jumlahAyat: 44, tempatTurun: "Mekah" },
  { nomor: 71, nama: "نوح", namaLatin: "Nuh", arti: "Nabi Nuh", jumlahAyat: 28, tempatTurun: "Mekah" },
  { nomor: 72, nama: "الجن", namaLatin: "Al-Jinn", arti: "Jin", jumlahAyat: 28, tempatTurun: "Mekah" },
  { nomor: 73, nama: "المزمل", namaLatin: "Al-Muzzammil", arti: "Orang Berselimut", jumlahAyat: 20, tempatTurun: "Mekah" },
  { nomor: 74, nama: "المدثر", namaLatin: "Al-Muddassir", arti: "Orang Berkemul", jumlahAyat: 56, tempatTurun: "Mekah" },
  { nomor: 75, nama: "القيامة", namaLatin: "Al-Qiyamah", arti: "Hari Kiamat", jumlahAyat: 40, tempatTurun: "Mekah" },
  { nomor: 76, nama: "الانسان", namaLatin: "Al-Insan", arti: "Manusia", jumlahAyat: 31, tempatTurun: "Madinah" },
  { nomor: 77, nama: "المرسلات", namaLatin: "Al-Mursalat", arti: "Malaikat Dikirim", jumlahAyat: 50, tempatTurun: "Mekah" },
  { nomor: 78, nama: "النبأ", namaLatin: "An-Naba'", arti: "Berita Besar", jumlahAyat: 40, tempatTurun: "Mekah" },
  { nomor: 79, nama: "النازعات", namaLatin: "An-Nazi'at", arti: "Malaikat Pencabut", jumlahAyat: 46, tempatTurun: "Mekah" },
  { nomor: 80, nama: "عبس", namaLatin: "'Abasa", arti: "Ia Bermuka Masam", jumlahAyat: 42, tempatTurun: "Mekah" },
  { nomor: 81, nama: "التكوير", namaLatin: "At-Takwir", arti: "Menggulung", jumlahAyat: 29, tempatTurun: "Mekah" },
  { nomor: 82, nama: "الانفطار", namaLatin: "Al-Infitar", arti: "Terbelah", jumlahAyat: 19, tempatTurun: "Mekah" },
  { nomor: 83, nama: "المطففين", namaLatin: "Al-Mutaffifin", arti: "Orang Curang", jumlahAyat: 36, tempatTurun: "Mekah" },
  { nomor: 84, nama: "الانشقاق", namaLatin: "Al-Insyiqaq", arti: "Terbelah", jumlahAyat: 25, tempatTurun: "Mekah" },
  { nomor: 85, nama: "البروج", namaLatin: "Al-Buruj", arti: "Gugusan Bintang", jumlahAyat: 22, tempatTurun: "Mekah" },
  { nomor: 86, nama: "الطارق", namaLatin: "At-Tariq", arti: "Yang Datang Malam", jumlahAyat: 17, tempatTurun: "Mekah" },
  { nomor: 87, nama: "الاعلى", namaLatin: "Al-A'la", arti: "Maha Tinggi", jumlahAyat: 19, tempatTurun: "Mekah" },
  { nomor: 88, nama: "الغاشية", namaLatin: "Al-Ghasyiyah", arti: "Hari Pembalasan", jumlahAyat: 26, tempatTurun: "Mekah" },
  { nomor: 89, nama: "الفجر", namaLatin: "Al-Fajr", arti: "Fajar", jumlahAyat: 30, tempatTurun: "Mekah" },
  { nomor: 90, nama: "البلد", namaLatin: "Al-Balad", arti: "Negeri", jumlahAyat: 20, tempatTurun: "Mekah" },
  { nomor: 91, nama: "الشمس", namaLatin: "Asy-Syams", arti: "Matahari", jumlahAyat: 15, tempatTurun: "Mekah" },
  { nomor: 92, nama: "الليل", namaLatin: "Al-Lail", arti: "Malam", jumlahAyat: 21, tempatTurun: "Mekah" },
  { nomor: 93, nama: "الضحى", namaLatin: "Ad-Duha", arti: "Waktu Duha", jumlahAyat: 11, tempatTurun: "Mekah" },
  { nomor: 94, nama: "الشرح", namaLatin: "Asy-Syarh", arti: "Kelapangan Dada", jumlahAyat: 8, tempatTurun: "Mekah" },
  { nomor: 95, nama: "التين", namaLatin: "At-Tin", arti: "Buah Tin", jumlahAyat: 8, tempatTurun: "Mekah" },
  { nomor: 96, nama: "العلق", namaLatin: "Al-'Alaq", arti: "Segumpal Darah", jumlahAyat: 19, tempatTurun: "Mekah" },
  { nomor: 97, nama: "القدر", namaLatin: "Al-Qadr", arti: "Kemuliaan", jumlahAyat: 5, tempatTurun: "Mekah" },
  { nomor: 98, nama: "البينة", namaLatin: "Al-Bayyinah", arti: "Bukti Nyata", jumlahAyat: 8, tempatTurun: "Madinah" },
  { nomor: 99, nama: "الزلزلة", namaLatin: "Az-Zalzalah", arti: "Keguncangan", jumlahAyat: 8, tempatTurun: "Madinah" },
  { nomor: 100, nama: "العاديات", namaLatin: "Al-'Adiyat", arti: "Kuda Perang", jumlahAyat: 11, tempatTurun: "Mekah" },
  { nomor: 101, nama: "القارعة", namaLatin: "Al-Qari'ah", arti: "Hari Kiamat", jumlahAyat: 11, tempatTurun: "Mekah" },
  { nomor: 102, nama: "التكاثر", namaLatin: "At-Takasur", arti: "Bermegah-Megahan", jumlahAyat: 8, tempatTurun: "Mekah" },
  { nomor: 103, nama: "العصر", namaLatin: "Al-'Asr", arti: "Masa / Waktu", jumlahAyat: 3, tempatTurun: "Mekah" },
  { nomor: 104, nama: "الهمزة", namaLatin: "Al-Humazah", arti: "Pengumpat", jumlahAyat: 9, tempatTurun: "Mekah" },
  { nomor: 105, nama: "الفيل", namaLatin: "Al-Fil", arti: "Gajah", jumlahAyat: 5, tempatTurun: "Mekah" },
  { nomor: 106, nama: "قريش", namaLatin: "Quraisy", arti: "Suku Quraisy", jumlahAyat: 4, tempatTurun: "Mekah" },
  { nomor: 107, nama: "الماعون", namaLatin: "Al-Ma'un", arti: "Barang Berguna", jumlahAyat: 7, tempatTurun: "Mekah" },
  { nomor: 108, nama: "الكوثر", namaLatin: "Al-Kausar", arti: "Nikmat Berlimpah", jumlahAyat: 3, tempatTurun: "Mekah" },
  { nomor: 109, nama: "الكافرون", namaLatin: "Al-Kafirun", arti: "Orang Kafir", jumlahAyat: 6, tempatTurun: "Mekah" },
  { nomor: 110, nama: "النصر", namaLatin: "An-Nasr", arti: "Pertolongan", jumlahAyat: 3, tempatTurun: "Madinah" },
  { nomor: 111, nama: "اللهب", namaLatin: "Al-Lahab", arti: "Gejolak Api", jumlahAyat: 5, tempatTurun: "Mekah" },
  { nomor: 112, nama: "الاخلاص", namaLatin: "Al-Ikhlas", arti: "Keesaan Allah", jumlahAyat: 4, tempatTurun: "Mekah" },
  { nomor: 113, nama: "الفلق", namaLatin: "Al-Falaq", arti: "Waktu Subuh", jumlahAyat: 5, tempatTurun: "Madinah" },
  { nomor: 114, nama: "الناس", namaLatin: "An-Nas", arti: "Manusia", jumlahAyat: 6, tempatTurun: "Madinah" }
];

// Surah-surah Pilihan Jamaah saat Umrah / Ibadah
const PILIHAN_SURAH_NOMOR = [1, 18, 36, 55, 56, 67, 76, 78, 112, 113, 114];

// Daftar Qari Terkemuka
const QARI_LIST = [
  { id: '05', name: 'Syaikh Misyari Rasyid Al-Afasy' },
  { id: '03', name: 'Syaikh Abdurrahman As-Sudais (Imam Ka’bah)' },
  { id: '01', name: 'Syaikh Abdullah Al-Juhany (Imam Haram)' },
  { id: '06', name: 'Syaikh Yasser Al-Dosari' }
];

// KAMUS PEDOMAN TAJWID STANDAR KEMENAG RI & MYQURAN
export const TAJWEED_META = {
  m: {
    code: 'm',
    name: 'Mad Wajib / Mad Lazim',
    hukum: 'Mad Wajib Muttashil & Lazim',
    kategori: 'Panjang 5 - 6 Harakat',
    desc: 'Wajib dipanjangkan 5 sampai 6 harakat secara sempurna. Biasanya ditandai dengan tanda bendera / mad layang (~) di atas huruf.',
    color: '#dc2626', // Red
    colorName: 'Merah Tua',
    bgBadge: 'bg-red-500',
    textClass: 'text-red-600 dark:text-red-400 font-bold',
    badgeClass: 'bg-red-100 text-red-700 border-red-300'
  },
  o: {
    code: 'o',
    name: 'Mad Jaiz Munfashil',
    hukum: 'Mad Jaiz Munfashil',
    kategori: 'Panjang 4 - 5 Harakat',
    desc: 'Mad thabi\'i bertemu hamzah pada kata berikutnya. Boleh dibaca panjang 4 sampai 5 harakat.',
    color: '#e11d48', // Rose
    colorName: 'Merah Oranye',
    bgBadge: 'bg-rose-500',
    textClass: 'text-rose-600 dark:text-rose-400 font-bold',
    badgeClass: 'bg-rose-100 text-rose-700 border-rose-300'
  },
  p: {
    code: 'p',
    name: 'Mad \'Aridh Lissukun',
    hukum: 'Mad \'Aridh Lissukun',
    kategori: 'Panjang 2, 4, atau 6 Harakat',
    desc: 'Mad di akhir kata karena waqaf / berhenti. Boleh dibaca 2, 4, atau 6 harakat.',
    color: '#ea580c', // Orange
    colorName: 'Oranye',
    bgBadge: 'bg-orange-500',
    textClass: 'text-orange-600 dark:text-orange-400 font-bold',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-300'
  },
  n: {
    code: 'n',
    name: 'Mad Thabi\'i (Mad Asli)',
    hukum: 'Mad Asli (Alif, Waw, Ya)',
    kategori: 'Panjang 2 Harakat',
    desc: 'Huruf mad asli berharakat fathah berdiri, dlommah panjang, atau kasrah panjang tepat 2 harakat.',
    color: '#b45309', // Amber-700
    colorName: 'Cokelat Emas',
    bgBadge: 'bg-amber-600',
    textClass: 'text-amber-700 dark:text-amber-300 font-semibold',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  q: {
    code: 'q',
    name: 'Qalqalah',
    hukum: 'Qalqalah (Pantulan Bunyi)',
    kategori: 'Huruf Memantul: ب ج د ط ق',
    desc: 'Huruf Baju Di Thoko (ب, ج, د, ط, ق) dalam keadaan mati / sukun dilafalkan dengan pantulan suara yang membal jernih.',
    color: '#2563eb', // Royal Blue
    colorName: 'Biru Royal',
    bgBadge: 'bg-blue-600',
    textClass: 'text-blue-600 dark:text-blue-400 font-bold',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-300'
  },
  g: {
    code: 'g',
    name: 'Ghunnah Musyaddadah',
    hukum: 'Dengung 2 Harakat (نّ / مّ)',
    kategori: 'Dengung Kuat',
    desc: 'Nun atau Mim bertasydid ditahan berdengung di pangkal hidung (khaisyum) selama 2 harakat penuh.',
    color: '#059669', // Emerald
    colorName: 'Hijau Emerald',
    bgBadge: 'bg-emerald-600',
    textClass: 'text-emerald-600 dark:text-emerald-400 font-bold',
    badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-300'
  },
  w: {
    code: 'w',
    name: 'Idgham Bi Ghunnah',
    hukum: 'Idgham Bighunnah',
    kategori: 'Lebur Berdengung (ي ن م و)',
    desc: 'Nun mati atau tanwin melebur masuk ke huruf Ya, Nun, Mim, Wau disertai dengung 2 harakat.',
    color: '#10b981', // Light Emerald
    colorName: 'Hijau Terang',
    bgBadge: 'bg-emerald-500',
    textClass: 'text-emerald-500 dark:text-emerald-300 font-bold',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  i: {
    code: 'i',
    name: 'Idgham Shafawi',
    hukum: 'Idgham Mimi / Mitslain',
    kategori: 'Lebur Mim ke Mim',
    desc: 'Mim sukun bertemu huruf Mim, melebur dengan dengung yang jelas.',
    color: '#16a34a', // Green
    colorName: 'Hijau Daun',
    bgBadge: 'bg-green-600',
    textClass: 'text-green-600 dark:text-green-400 font-bold',
    badgeClass: 'bg-green-100 text-green-700 border-green-300'
  },
  f: {
    code: 'f',
    name: 'Ikhfa Haqiqi',
    hukum: 'Ikhfa Haqiqi (Samar-samar)',
    kategori: 'Samar Berdengung (15 Huruf)',
    desc: 'Nun mati atau tanwin dibaca samar mendekati makhraj huruf berikutnya disertai dengung 2 harakat.',
    color: '#0d9488', // Teal
    colorName: 'Hijau Toska',
    bgBadge: 'bg-teal-600',
    textClass: 'text-teal-600 dark:text-teal-400 font-bold',
    badgeClass: 'bg-teal-100 text-teal-700 border-teal-300'
  },
  c: {
    code: 'c',
    name: 'Ikhfa Syafawi',
    hukum: 'Ikhfa Syafawi',
    kategori: 'Samar Mim bertemu Ba',
    desc: 'Mim sukun bertemu huruf Ba, dibaca samar di kedua bibir disertai dengung lembut.',
    color: '#0f766e', // Teal Dark
    colorName: 'Toska Tua',
    bgBadge: 'bg-teal-700',
    textClass: 'text-teal-700 dark:text-teal-300 font-bold',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-200'
  },
  b: {
    code: 'b',
    name: 'Iqlab',
    hukum: 'Iqlab (Tukar ke Bunyi Mim)',
    kategori: 'Tanda Mim Kecil (ۢ)',
    desc: 'Nun mati atau tanwin bertemu Ba, suaranya ditukar menjadi Mim lembut sebelum huruf Ba.',
    color: '#0891b2', // Cyan
    colorName: 'Biru Cyan',
    bgBadge: 'bg-cyan-600',
    textClass: 'text-cyan-600 dark:text-cyan-400 font-bold',
    badgeClass: 'bg-cyan-100 text-cyan-700 border-cyan-300'
  },
  h: {
    code: 'h',
    name: 'Hamzah Washal',
    hukum: 'Hamzatul Washl',
    kategori: 'Dilewati Saat Bersambung',
    desc: 'Huruf Alif washal yang tidak dibaca bunyinya saat menyambung dari kata sebelumnya.',
    color: '#94a3b8', // Slate-400
    colorName: 'Abu-abu (Muted)',
    bgBadge: 'bg-slate-400',
    textClass: 'text-slate-400 dark:text-slate-500 font-normal',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300'
  },
  l: {
    code: 'l',
    name: 'Lam Syamsiyyah',
    hukum: 'Idgham Syamsiyah',
    kategori: 'Alif Lam Lebur Tanpa Bunyi',
    desc: 'Huruf Lam pada Alif Lam tidak dibaca bunyinya karena melebur ke huruf berikutnya yang bertasydid.',
    color: '#94a3b8',
    colorName: 'Abu-abu (Muted)',
    bgBadge: 'bg-slate-400',
    textClass: 'text-slate-400 dark:text-slate-500 font-normal',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300'
  },
  s: {
    code: 's',
    name: 'Huruf Tambahan / Silent',
    hukum: 'Huruf Tidak Berharakat',
    kategori: 'Tidak Dibaca',
    desc: 'Huruf tambahan yang tidak berharakat dalam rasm Usmani (misal alif mati di akhir kata jama\').',
    color: '#94a3b8',
    colorName: 'Abu-abu (Muted)',
    bgBadge: 'bg-slate-400',
    textClass: 'text-slate-400 dark:text-slate-500 font-normal',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300'
  },
  d: {
    code: 'd',
    name: 'Idgham Bila Ghunnah',
    hukum: 'Lebur Tanpa Dengung',
    kategori: 'Bertemu Lam (ل) atau Ra (ر)',
    desc: 'Nun mati atau tanwin melebur utuh ke huruf Lam atau Ra tanpa dengung sedikitpun.',
    color: '#94a3b8',
    colorName: 'Abu-abu (Muted)',
    bgBadge: 'bg-slate-400',
    textClass: 'text-slate-400 dark:text-slate-500 font-normal',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300'
  },
  u: {
    code: 'u',
    name: 'Mad Shilah / Qashr',
    hukum: 'Mad Shilah Qashirah',
    kategori: 'Panjang 2 Harakat pada Ha Dhamir',
    desc: 'Panjang 2 harakat pada huruf Ha kata ganti (dhamir).',
    color: '#d97706',
    colorName: 'Amber',
    bgBadge: 'bg-amber-500',
    textClass: 'text-amber-600 dark:text-amber-400 font-semibold',
    badgeClass: 'bg-amber-100 text-amber-700 border-amber-300'
  }
};

// Tree Parser untuk AlQuran.cloud Tajweed Syntax [tag:id[ content ] ]
function parseTajweedTree(text) {
  if (!text) return [];
  let i = 0;
  function parseSeq() {
    let nodes = [];
    let buf = '';
    while (i < text.length) {
      if (text[i] === '[' && text.slice(i).match(/^\[([a-z]+)(?::[0-9]+)?\[/)) {
        if (buf) {
          nodes.push({ type: 'plain', text: buf });
          buf = '';
        }
        const match = text.slice(i).match(/^\[([a-z]+)(?::[0-9]+)?\[/);
        const tag = match[1];
        i += match[0].length;
        const children = parseSeq();
        nodes.push({ type: tag, children });
      } else if (text[i] === ']') {
        if (buf) {
          nodes.push({ type: 'plain', text: buf });
          buf = '';
        }
        i++;
        return nodes;
      } else {
        buf += text[i];
        i++;
      }
    }
    if (buf) {
      nodes.push({ type: 'plain', text: buf });
    }
    return nodes;
  }
  return parseSeq();
}

// Render pohon node Tajweed menjadi elemen React interaktif
function renderTajweedNodes(nodes, onSelectRule) {
  return nodes.map((node, idx) => {
    if (node.type === 'plain') {
      return <React.Fragment key={idx}>{node.text}</React.Fragment>;
    }
    const meta = TAJWEED_META[node.type];
    const children = node.children ? renderTajweedNodes(node.children, onSelectRule) : node.text;

    if (!meta) {
      return <React.Fragment key={idx}>{children}</React.Fragment>;
    }

    return (
      <span
        key={idx}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelectRule) onSelectRule(meta);
        }}
        className={`${meta.textClass} cursor-pointer hover:opacity-80 active:scale-95 transition-opacity inline`}
        style={{ color: meta.color }}
        title={`${meta.name} (${meta.kategori}) - Sentuh untuk info`}
      >
        {children}
      </span>
    );
  });
}

// Fallback Regex Tajweed Parser (Jika tajweedRaw belum tersedia atau offline)
function renderFallbackTajweed(text, onSelectRule) {
  if (!text) return null;
  const regex = /([\u0653~])|([\u0646\u0645]\u0651)|([بجدطق]\u0652)|(نْ|[ًٌٍ])|([\u06E2\u06D8])/g;
  const elements = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    const str = match[0];
    let tag = 'n';
    if (match[1]) tag = 'm';
    else if (match[2]) tag = 'g';
    else if (match[3]) tag = 'q';
    else if (match[4]) tag = 'f';
    else if (match[5]) tag = 'b';

    const meta = TAJWEED_META[tag];
    elements.push(
      <span
        key={`fb-${match.index}`}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelectRule) onSelectRule(meta);
        }}
        className={`${meta.textClass} cursor-pointer hover:opacity-80 transition-opacity inline`}
        style={{ color: meta.color }}
        title={`${meta.name} (${meta.kategori}) - Sentuh untuk info`}
      >
        {str}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }
  return elements;
}

// Komponen Utama AlQuranModal
export default function AlQuranModal({ onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('semua'); // 'semua' | 'juz_amma' | 'pilihan'
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahDetail, setSurahDetail] = useState(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Audio State & Continuous Playing
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioAyat, setActiveAudioAyat] = useState(null);
  const [selectedQari, setSelectedQari] = useState('05'); // 05 = Misyari Rasyid
  const [autoNextAyat, setAutoNextAyat] = useState(true);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none' | '3x' | 'loop'
  const repeatCounterRef = useRef(0);
  const audioRef = useRef(null);

  // UI/UX Preferences (Sesuai MyQuran)
  const [fontFamily, setFontFamily] = useState('lpmq'); // 'lpmq' (Kemenag RI) | 'amiri' | 'scheherazade'
  const [fontSize, setFontSize] = useState('medium'); // 'normal' | 'medium' | 'large' | 'extralarge'
  const [readingMode, setReadingMode] = useState('ayat'); // 'ayat' | 'mushaf'
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'sepia' | 'dark'
  const [showTajweed, setShowTajweed] = useState(true);
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTajweedLegend, setShowTajweedLegend] = useState(false);
  const [selectedRuleInfo, setSelectedRuleInfo] = useState(null); // Interactive Tajweed Info Modal

  // Fitur Loncat Ayat State
  const [showJumpModal, setShowJumpModal] = useState(false);
  const [jumpInput, setJumpInput] = useState('');
  const [highlightedAyat, setHighlightedAyat] = useState(null);

  // Last Read & Bookmarks
  const [lastRead, setLastRead] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [copiedAyat, setCopiedAyat] = useState(null);

  // Filter surah list
  const filteredSurahs = SURAH_LIST.filter((s) => {
    const matchQuery =
      s.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.arti.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.nomor).includes(searchQuery);

    if (!matchQuery) return false;

    if (activeCategory === 'juz_amma') {
      return s.nomor >= 78;
    }
    if (activeCategory === 'pilihan') {
      return PILIHAN_SURAH_NOMOR.includes(s.nomor);
    }
    return true;
  });

  // Fetch Surah Detail with Tajweed Integration (equran.id + AlQuran.cloud)
  const handleSelectSurah = async (surah) => {
    setSelectedSurah(surah);
    setLoadingSurah(true);
    setErrorMsg(null);
    setSurahDetail(null);
    setIsPlayingAudio(false);
    setActiveAudioAyat(null);
    setShowJumpModal(false);
    repeatCounterRef.current = 0;

    // Check localStorage cache first
    const cacheKey = `kanomas_quran_surah_v2_${surah.nomor}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        setSurahDetail(parsed);
        setLoadingSurah(false);
        return;
      }
    } catch (e) {
      console.warn('Cache read error', e);
    }

    try {
      // Parallel fetch: equran.id (Indonesian standard) + alquran.cloud (Tajweed markup)
      const [equranRes, tajweedRes] = await Promise.allSettled([
        fetch(`https://equran.id/api/v2/surat/${surah.nomor}`).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        }),
        fetch(`https://api.alquran.cloud/v1/surah/${surah.nomor}/quran-tajweed`).then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
      ]);

      if (equranRes.status === 'fulfilled' && equranRes.value?.data) {
        const detailData = equranRes.value.data;

        // If tajweed data available, inject raw tajweed tags to each ayat
        if (tajweedRes.status === 'fulfilled' && tajweedRes.value?.data?.ayahs) {
          const tajweedAyahs = tajweedRes.value.data.ayahs;
          detailData.ayat.forEach((ayah, idx) => {
            ayah.tajweedRaw = tajweedAyahs[idx]?.text || null;
          });
        }

        setSurahDetail(detailData);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(detailData));
        } catch {
          // ignore quota error
        }
      } else {
        throw new Error('Gagal memuat isi surat');
      }
    } catch (err) {
      console.error('Fetch surah error:', err);
      setErrorMsg('Gagal memuat ayat surah. Pastikan koneksi internet tersedia.');
    } finally {
      setLoadingSurah(false);
    }
  };

  // Play audio ayat with continuous recitation & repeat capability
  const playAyatAudio = (ayatIndex) => {
    if (!surahDetail || !surahDetail.ayat || !surahDetail.ayat[ayatIndex]) return;
    const currentAyat = surahDetail.ayat[ayatIndex];
    const audioUrl =
      currentAyat.audio?.[selectedQari] ||
      currentAyat.audio?.['05'] ||
      currentAyat.audio?.['01'];
    if (!audioUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (isPlayingAudio && activeAudioAyat === currentAyat.nomorAyat) {
      setIsPlayingAudio(false);
      setActiveAudioAyat(null);
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setActiveAudioAyat(currentAyat.nomorAyat);
    setIsPlayingAudio(true);

    // Auto-scroll to active playing ayat
    const el = document.getElementById(`ayat-${currentAyat.nomorAyat}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    audio.play().catch((err) => {
      console.warn('Audio play error', err);
      setIsPlayingAudio(false);
      setActiveAudioAyat(null);
    });

    audio.onended = () => {
      // Repeat current ayah handling
      if (repeatMode === 'loop') {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      if (repeatMode === '3x') {
        if (repeatCounterRef.current < 2) {
          repeatCounterRef.current += 1;
          audio.currentTime = 0;
          audio.play().catch(() => {});
          return;
        } else {
          repeatCounterRef.current = 0;
        }
      }

      // Next Ayah auto-play
      if (autoNextAyat && ayatIndex + 1 < surahDetail.ayat.length) {
        playAyatAudio(ayatIndex + 1);
      } else {
        setIsPlayingAudio(false);
        setActiveAudioAyat(null);
      }
    };
  };

  // Play Full Surah Audio
  const playFullSurahAudio = (audioUrl) => {
    if (!audioUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (isPlayingAudio && activeAudioAyat === 'full') {
      setIsPlayingAudio(false);
      setActiveAudioAyat(null);
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setActiveAudioAyat('full');
    setIsPlayingAudio(true);

    audio.play().catch(() => {
      setIsPlayingAudio(false);
      setActiveAudioAyat(null);
    });

    audio.onended = () => {
      setIsPlayingAudio(false);
      setActiveAudioAyat(null);
    };
  };

  // Stop audio on close or unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Save last read bookmark
  const handleSaveLastRead = (surah, ayat) => {
    const data = {
      surahNomor: surah.nomor,
      surahNama: surah.namaLatin,
      ayatNomor: ayat ? ayat.nomorAyat : 1,
      timestamp: new Date().toISOString()
    };
    setLastRead(data);
    try {
      localStorage.setItem('kanomas_quran_last_read', JSON.stringify(data));
    } catch (e) {
      console.warn('Cannot save last read', e);
    }
  };

  // Lanjutkan membaca dari bookmark terakhir
  const handleResumeLastRead = () => {
    if (!lastRead) return;
    const target = SURAH_LIST.find((s) => s.nomor === lastRead.surahNomor);
    if (target) {
      handleSelectSurah(target);
      setTimeout(() => {
        handleJumpToAyat(lastRead.ayatNomor);
      }, 700);
    }
  };

  // Fitur Loncat Ayat Action
  const handleJumpToAyat = (targetNum) => {
    const num = parseInt(targetNum, 10);
    if (!num || !selectedSurah || num < 1 || num > selectedSurah.jumlahAyat) {
      alert(`Nomor ayat tidak valid. Pilih antara 1 hingga ${selectedSurah?.jumlahAyat || 1}`);
      return;
    }

    setShowJumpModal(false);
    setJumpInput('');

    setTimeout(() => {
      const el = document.getElementById(`ayat-${num}`) || document.getElementById(`mushaf-num-${num}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedAyat(num);
        setTimeout(() => setHighlightedAyat(null), 3500);
      }
    }, 150);
  };

  // Copy Ayat text
  const handleCopyAyat = (surah, ayat) => {
    const text = `Q.S. ${surah.namaLatin} [${surah.nomor}]: ${ayat.nomorAyat}\n\n${ayat.teksArab}\n\n"${ayat.teksIndonesia}"\n\n(Aplikasi Resmi Kanomas Tour & Travel)\nhttps://appkanomas.mediasosial.net`;
    navigator.clipboard?.writeText(text);
    setCopiedAyat(ayat.nomorAyat);
    setTimeout(() => setCopiedAyat(null), 2000);
  };

  // Share Ayat to WhatsApp
  const handleShareWhatsApp = (surah, ayat) => {
    const text = `*Q.S. ${surah.namaLatin} [${surah.nomor}]: Ayat ${ayat.nomorAyat}*\n\n${ayat.teksArab}\n\n_${ayat.teksLatin}_\n\n"${ayat.teksIndonesia}"\n\n📌 _Dibagikan melalui Aplikasi Kanomas Tour & Travel_\nhttps://appkanomas.mediasosial.net`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Render Arabic text dengan tajwid atau polos
  const renderAyatText = (ayat) => {
    if (!showTajweed) {
      return ayat.teksArab;
    }
    if (ayat.tajweedRaw) {
      const tree = parseTajweedTree(ayat.tajweedRaw);
      return renderTajweedNodes(tree, setSelectedRuleInfo);
    }
    return renderFallbackTajweed(ayat.teksArab, setSelectedRuleInfo);
  };

  // Font family classes
  const quranFontClass = {
    lpmq: 'font-quran-lpmq',
    amiri: 'font-quran-amiri',
    scheherazade: 'font-quran-scheherazade'
  }[fontFamily] || 'font-quran-lpmq';

  // Font size classes dengan line-height lapang agar harakat tidak berhimpitan
  const arabicFontSizeClass = {
    normal: 'text-2xl sm:text-3xl leading-[2.3]',
    medium: 'text-3xl sm:text-4xl leading-[2.5]',
    large: 'text-4xl sm:text-5xl leading-[2.7]',
    extralarge: 'text-5xl sm:text-6xl leading-[2.9]'
  }[fontSize] || 'text-3xl sm:text-4xl leading-[2.5]';

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
        
        {/* TOP HEADER */}
        <div className={`p-3.5 sm:p-4 border-b flex items-center justify-between gap-2.5 flex-shrink-0 ${
          themeMode === 'dark' ? 'border-slate-800 bg-slate-900/95' : 'border-slate-100 bg-white/95'
        }`}>
          <div className="flex items-center gap-2.5 min-w-0">
            {selectedSurah ? (
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.pause();
                  setIsPlayingAudio(false);
                  setActiveAudioAyat(null);
                  setSelectedSurah(null);
                  setSurahDetail(null);
                  setShowJumpModal(false);
                  setSelectedRuleInfo(null);
                }}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition active:scale-95 flex-shrink-0"
                aria-label="Kembali ke daftar surah"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800 flex items-center justify-center flex-shrink-0 shadow-xs">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-black truncate flex items-center gap-1.5">
                <span>{selectedSurah ? `${selectedSurah.nomor}. ${selectedSurah.namaLatin}` : "Al-Qur'anul Karim"}</span>
                {selectedSurah && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                    {fontFamily === 'lpmq' ? 'LPMQ Kemenag' : fontFamily === 'amiri' ? 'Madinah' : 'Naskh'}
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {selectedSurah
                  ? `${selectedSurah.arti} • ${selectedSurah.jumlahAyat} Ayat (${selectedSurah.tempatTurun})`
                  : "Mushaf Standar Indonesia • Tajwid Huruf Berwarna & Audio Qari"}
              </p>
            </div>
          </div>

          {/* CONTROLS RIGHT */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {selectedSurah && (
              <>
                {/* 1. TOMBOL FITUR LONCAT AYAT */}
                <button
                  onClick={() => setShowJumpModal(true)}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition active:scale-95 whitespace-nowrap"
                  title="Loncat ke nomor ayat tertentu"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Loncat Ayat</span>
                  <span className="sm:hidden">Loncat</span>
                </button>

                {/* 2. TOGGLE TAJWID BERWARNA */}
                <button
                  onClick={() => setShowTajweed(!showTajweed)}
                  className={`px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                    showTajweed
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                  title="Aktifkan / Nonaktifkan Penanda Warna Tajwid"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tajwid</span>
                </button>

                {/* 3. TEMA SWITCHER (Light, Sepia, Dark) */}
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
                    title="Tema Kertas Mushaf (Sepia Ramah Mata)"
                  >
                    <Coffee className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`p-1.5 rounded-lg text-xs transition ${
                      themeMode === 'dark' ? 'bg-slate-700 shadow-xs text-amber-400' : 'text-slate-400'
                    }`}
                    title="Tema Gelap (Malam)"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center transition active:scale-95"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL POPUP: LONCAT KE AYAT */}
        {showJumpModal && selectedSurah && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/60 animate-in slide-in-from-top duration-200 flex-shrink-0">
            <div className="max-w-md mx-auto space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Loncat ke Ayat dalam Surah {selectedSurah.namaLatin}</span>
                </span>
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-mono font-bold">
                  (Total {selectedSurah.jumlahAyat} Ayat)
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleJumpToAyat(jumpInput);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="number"
                  min="1"
                  max={selectedSurah.jumlahAyat}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder={`Nomor ayat (1 - ${selectedSurah.jumlahAyat})`}
                  autoFocus
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-xs transition active:scale-95"
                >
                  Loncat
                </button>
                <button
                  type="button"
                  onClick={() => setShowJumpModal(false)}
                  className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
                >
                  Batal
                </button>
              </form>

              {/* Quick shortcut pills */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs text-amber-800 dark:text-amber-300">
                <span className="text-[10px] text-amber-700 dark:text-amber-400">Pilihan Cepat:</span>
                <button
                  onClick={() => handleJumpToAyat(1)}
                  className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 font-mono hover:bg-amber-100"
                >
                  Ayat 1
                </button>
                {selectedSurah.jumlahAyat > 10 && (
                  <button
                    onClick={() => handleJumpToAyat(10)}
                    className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 font-mono hover:bg-amber-100"
                  >
                    Ayat 10
                  </button>
                )}
                {selectedSurah.jumlahAyat > 50 && (
                  <button
                    onClick={() => handleJumpToAyat(50)}
                    className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 font-mono hover:bg-amber-100"
                  >
                    Ayat 50
                  </button>
                )}
                {selectedSurah.jumlahAyat > 100 && (
                  <button
                    onClick={() => handleJumpToAyat(100)}
                    className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 font-mono hover:bg-amber-100"
                  >
                    Ayat 100
                  </button>
                )}
                {selectedSurah.nomor === 2 && (
                  <button
                    onClick={() => handleJumpToAyat(255)}
                    className="px-2 py-0.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700"
                  >
                    Ayat Kursi (255)
                  </button>
                )}
                <button
                  onClick={() => handleJumpToAyat(selectedSurah.jumlahAyat)}
                  className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 font-mono hover:bg-amber-100"
                >
                  Ayat Terakhir ({selectedSurah.jumlahAyat})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BODY AREA */}
        <div className="flex-1 overflow-y-auto">
          {!selectedSurah ? (
            /* VIEW 1: DAFTAR SURAH (114 SURAH) */
            <div className="p-4 sm:p-6 space-y-4 max-w-4xl mx-auto">
              
              {/* LAST READ CARD (SEPERTI MYQURAN) */}
              {lastRead && (
                <div
                  onClick={handleResumeLastRead}
                  className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white cursor-pointer hover:shadow-lg transition-all flex items-center justify-between gap-4 group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Bookmark className="w-5 h-5 text-amber-300 fill-amber-300" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-emerald-100">
                        Terakhir Dibaca
                      </div>
                      <h3 className="text-base sm:text-lg font-black tracking-tight">
                        QS. {lastRead.surahNama} • Ayat {lastRead.ayatNomor}
                      </h3>
                      <p className="text-[11px] text-emerald-100/90">
                        Ketuk untuk melanjutkan membaca
                      </p>
                    </div>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1">
                    <span>Lanjut</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* SEARCH & FILTER CONTROLS */}
              <div className="space-y-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari surah (misal: Yasin, Al-Mulk, Al-Baqarah, atau nomor surat)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Kategori Tab Filter */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-bold">
                  <button
                    onClick={() => setActiveCategory('semua')}
                    className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap ${
                      activeCategory === 'semua'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Semua Surah (114)
                  </button>
                  <button
                    onClick={() => setActiveCategory('juz_amma')}
                    className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap ${
                      activeCategory === 'juz_amma'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Juz 'Amma (An-Naba - An-Nas)
                  </button>
                  <button
                    onClick={() => setActiveCategory('pilihan')}
                    className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap ${
                      activeCategory === 'pilihan'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Surah Pilihan Umrah & Jamaah
                  </button>
                </div>
              </div>

              {/* LIST OF SURAH CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                {filteredSurahs.map((surah) => (
                  <button
                    key={surah.nomor}
                    onClick={() => handleSelectSurah(surah)}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between text-left group active:scale-98 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        {surah.nomor}
                      </div>

                      <div className="min-w-0">
                        <strong className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition truncate block">
                          {surah.namaLatin}
                        </strong>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                          {surah.arti} • {surah.jumlahAyat} Ayat
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 pl-2">
                      <span className="font-quran-lpmq text-xl font-bold text-emerald-800 dark:text-emerald-300 tracking-wide block" dir="rtl">
                        {surah.nama}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                        {surah.tempatTurun}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {filteredSurahs.length === 0 && (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-semibold">Tidak menemukan surah yang cocok</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-emerald-600 font-bold hover:underline"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* VIEW 2: DETAIL SURAH & AYAT READER */
            <div className="p-4 sm:p-6 space-y-5 max-w-3xl mx-auto">
              
              {/* SURAH HERO BANNER */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-5 sm:p-6 shadow-md text-center space-y-3">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white">
                    Surah ke-{selectedSurah.nomor} • {selectedSurah.tempatTurun} • {selectedSurah.jumlahAyat} Ayat
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
                    {selectedSurah.namaLatin}
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                    "{selectedSurah.arti}"
                  </p>
                </div>

                <div className="pt-1 text-3xl sm:text-4xl font-quran-lpmq text-amber-200" dir="rtl">
                  {selectedSurah.nama}
                </div>

                {/* AUDIO CONTROLLER BAR */}
                {surahDetail && (
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                    {surahDetail.audioFull && (
                      <button
                        onClick={() =>
                          playFullSurahAudio(
                            surahDetail.audioFull[selectedQari] ||
                            surahDetail.audioFull['05'] ||
                            surahDetail.audioFull['01']
                          )
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95"
                      >
                        {isPlayingAudio && activeAudioAyat === 'full' ? (
                          <>
                            <Pause className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Jeda Murottal</span>
                          </>
                        ) : (
                          <>
                            <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Putar Surah Penuh</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* PILIHAN QARI */}
                    <select
                      value={selectedQari}
                      onChange={(e) => setSelectedQari(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold border border-white/30 focus:outline-none cursor-pointer"
                      title="Pilih Syaikh Qari"
                    >
                      {QARI_LIST.map((q) => (
                        <option key={q.id} value={q.id} className="text-slate-900 bg-white">
                          {q.name}
                        </option>
                      ))}
                    </select>

                    {/* REPEAT BUTTON (SEPERTI MYQURAN HAFALAN) */}
                    <button
                      onClick={() => {
                        const modes = ['none', '3x', 'loop'];
                        const next = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
                        setRepeatMode(next);
                        repeatCounterRef.current = 0;
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition flex items-center gap-1 ${
                        repeatMode !== 'none'
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs'
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                      title="Ulangi bacaan ayat untuk hafalan & tahsin"
                    >
                      <Repeat className="w-3 h-3" />
                      <span>{repeatMode === 'none' ? 'Ulang: 1x' : repeatMode === '3x' ? 'Ulang: 3x' : 'Ulang: ∞'}</span>
                    </button>

                    {/* AUTO NEXT TOGGLE */}
                    <button
                      onClick={() => setAutoNextAyat(!autoNextAyat)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition ${
                        autoNextAyat
                          ? 'bg-emerald-500 text-white border-emerald-400'
                          : 'bg-white/10 text-white border-white/20'
                      }`}
                      title="Lanjutkan audio ayat berikutnya secara otomatis"
                    >
                      {autoNextAyat ? 'Auto-Lanjut: Aktif' : 'Auto-Lanjut: Nonaktif'}
                    </button>
                  </div>
                )}
              </div>

              {/* TOOLBAR KONTROL MEMBACA (FONT, UKURAN, MODE BACA, TAJWID) */}
              <div className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-2.5 text-xs ${cardThemeClasses}`}>
                
                {/* 1. Switcher Font Arab (Standar Kemenag RI / MyQuran vs Madinah) */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
                  <span className="text-[10px] text-slate-400 px-1 font-bold">Font:</span>
                  <button
                    onClick={() => setFontFamily('lpmq')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      fontFamily === 'lpmq'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
                    }`}
                    title="Font Mushaf Standar Indonesia Kemenag RI (LPMQ Isep Misbah)"
                  >
                    <span>🇮🇩 Kemenag</span>
                  </button>
                  <button
                    onClick={() => setFontFamily('amiri')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      fontFamily === 'amiri'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
                    }`}
                    title="Font Mushaf Madinah (Amiri Quran)"
                  >
                    <span>🇸🇦 Madinah</span>
                  </button>
                </div>

                {/* 2. Pengatur Ukuran Huruf Cepat (A- dan A+) */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      const sizes = ['normal', 'medium', 'large', 'extralarge'];
                      const idx = sizes.indexOf(fontSize);
                      if (idx > 0) setFontSize(sizes[idx - 1]);
                    }}
                    className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center hover:bg-slate-200 active:scale-95 transition"
                    title="Perkecil Ukuran Huruf Arab"
                  >
                    A-
                  </button>
                  <span className="px-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {fontSize === 'normal' ? 'Sedang' : fontSize === 'medium' ? 'Besar' : fontSize === 'large' ? 'Ekstra' : 'Jumbo'}
                  </span>
                  <button
                    onClick={() => {
                      const sizes = ['normal', 'medium', 'large', 'extralarge'];
                      const idx = sizes.indexOf(fontSize);
                      if (idx < sizes.length - 1) setFontSize(sizes[idx + 1]);
                    }}
                    className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center hover:bg-slate-200 active:scale-95 transition"
                    title="Perbesar Ukuran Huruf Arab"
                  >
                    A+
                  </button>
                </div>

                {/* 3. Switcher Mode: Ayat vs Mushaf */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
                  <button
                    onClick={() => setReadingMode('ayat')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                      readingMode === 'ayat' ? 'bg-white shadow-xs text-amber-600 dark:bg-slate-800' : 'text-slate-500'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Mode Ayat</span>
                  </button>
                  <button
                    onClick={() => setReadingMode('mushaf')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                      readingMode === 'mushaf' ? 'bg-white shadow-xs text-amber-600 dark:bg-slate-800' : 'text-slate-500'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Mode Mushaf</span>
                  </button>
                </div>

                {/* 4. Toggles Latin & Arti */}
                {readingMode === 'ayat' && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setShowLatin(!showLatin)}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                        showLatin ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      }`}
                    >
                      Latin: {showLatin ? 'Ya' : 'Tidak'}
                    </button>
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                        showTranslation ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      }`}
                    >
                      Arti: {showTranslation ? 'Ya' : 'Tidak'}
                    </button>
                  </div>
                )}
              </div>

              {/* PANDUAN / LEGENDA WARNA TAJWID (COLLAPSIBLE) */}
              {showTajweed && (
                <div className="p-3.5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/50 space-y-2.5">
                  <div
                    onClick={() => setShowTajweedLegend(!showTajweedLegend)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <span className="text-xs font-bold text-purple-950 dark:text-purple-200 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>Penanda Tajwid Berwarna Aktif (Sentuh huruf berwarna untuk pelajari hukumnya)</span>
                    </span>
                    <button className="text-purple-600 dark:text-purple-400 flex items-center gap-1 text-[11px] font-bold">
                      <span>{showTajweedLegend ? 'Tutup Panduan' : 'Lihat Panduan'}</span>
                      {showTajweedLegend ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {showTajweedLegend && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-purple-200/60 dark:border-purple-800/40 text-[11px]">
                      <div
                        onClick={() => setSelectedRuleInfo(TAJWEED_META.m)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-red-100 dark:border-red-900/40 cursor-pointer hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                          <strong className="text-red-600 dark:text-red-400 block truncate">Merah: Mad Panjang</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 block">5-6 Harakat (Wajib/Lazim)</span>
                      </div>

                      <div
                        onClick={() => setSelectedRuleInfo(TAJWEED_META.g)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/40 cursor-pointer hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                          <strong className="text-emerald-600 dark:text-emerald-400 block truncate">Hijau: Ghunnah</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Dengung 2 Harakat (نّ / مّ)</span>
                      </div>

                      <div
                        onClick={() => setSelectedRuleInfo(TAJWEED_META.q)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900/40 cursor-pointer hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                          <strong className="text-blue-600 dark:text-blue-400 block truncate">Biru: Qalqalah</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Pantulan (ب ج د ط ق)</span>
                      </div>

                      <div
                        onClick={() => setSelectedRuleInfo(TAJWEED_META.f)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900/40 cursor-pointer hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                          <strong className="text-teal-600 dark:text-teal-400 block truncate">Toska: Ikhfa</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Samar-samar berdengung</span>
                      </div>

                      <div
                        onClick={() => setSelectedRuleInfo(TAJWEED_META.w)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/40 cursor-pointer hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <strong className="text-emerald-500 dark:text-emerald-400 block truncate">Hijau Muda: Idgham</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Lebur berpadu dengung</span>
                      </div>

                      <div
                        onClick={() => setSelectedRuleInfo(TAJWEED_META.b)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-cyan-100 dark:border-cyan-900/40 cursor-pointer hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
                          <strong className="text-cyan-600 dark:text-cyan-400 block truncate">Cyan: Iqlab</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Ganti ke Mim kecil ۢ</span>
                      </div>

                      <div
                        onClick={() => setSelectedRuleInfo(TAJWEED_META.p)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-900/40 cursor-pointer hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                          <strong className="text-orange-600 dark:text-orange-400 block truncate">Oranye: Mad Akhir</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Mad 'Aridh Lissukun (2-6 h)</span>
                      </div>

                      <div
                        onClick={() => setSelectedRuleInfo(TAJWEED_META.h)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                          <strong className="text-slate-500 block truncate">Abu-abu: Tidak Dibaca</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Washal / Alif Lam Syamsiyah</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* BISMILLAH BANNER (Kecuali Surah At-Taubah, nomor 9) */}
              {selectedSurah.nomor !== 9 && selectedSurah.nomor !== 1 && (
                <div className="text-center py-4 px-2 bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl border border-amber-200/60 dark:border-amber-900/40">
                  <span className={`text-2xl sm:text-3xl ${quranFontClass} text-amber-900 dark:text-amber-200 tracking-wider`} dir="rtl">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </span>
                </div>
              )}

              {/* LOADING STATE */}
              {loadingSurah && (
                <div className="py-16 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Memuat mushaf surah {selectedSurah.namaLatin}...
                  </p>
                </div>
              )}

              {/* ERROR STATE */}
              {errorMsg && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center space-y-2 text-red-700">
                  <p className="text-xs font-semibold">{errorMsg}</p>
                  <button
                    onClick={() => handleSelectSurah(selectedSurah)}
                    className="px-4 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xs"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}

              {/* RENDERING MODE 1: PER-AYAT VIEW (SEPERTI MYQURAN) */}
              {readingMode === 'ayat' && surahDetail && surahDetail.ayat && (
                <div className="space-y-4">
                  {surahDetail.ayat.map((ayat, index) => {
                    const isAudioPlaying = isPlayingAudio && activeAudioAyat === ayat.nomorAyat;
                    const isBookmarked =
                      lastRead &&
                      lastRead.surahNomor === selectedSurah.nomor &&
                      lastRead.ayatNomor === ayat.nomorAyat;
                    const isJumpHighlighted = highlightedAyat === ayat.nomorAyat;

                    return (
                      <div
                        key={ayat.nomorAyat}
                        id={`ayat-${ayat.nomorAyat}`}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${cardThemeClasses} ${
                          isJumpHighlighted
                            ? 'ring-4 ring-amber-400 bg-amber-50/90 dark:bg-amber-950/40 shadow-xl scale-[1.01]'
                            : isAudioPlaying
                            ? 'ring-2 ring-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20'
                            : isBookmarked
                            ? 'border-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/10'
                            : ''
                        }`}
                      >
                        {/* HEADER BAR AYAT: NOMOR & ACTION BUTTONS */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                          {/* Nomor Ayat */}
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-amber-100/90 dark:bg-amber-900/40 border border-amber-300 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center font-mono">
                              {ayat.nomorAyat}
                            </span>
                            {isBookmarked && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Bookmark className="w-3 h-3 fill-current" />
                                <span>Terakhir Dibaca</span>
                              </span>
                            )}
                          </div>

                          {/* Tombol Aksi Ayat: Play, Bookmark, WhatsApp Share, Copy */}
                          <div className="flex items-center gap-1">
                            {/* Play Audio Ayat */}
                            <button
                              onClick={() => playAyatAudio(index)}
                              className={`w-8 h-8 rounded-xl flex items-center justify-center transition active:scale-95 ${
                                isAudioPlaying
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                              title="Putar audio ayat ini"
                            >
                              {isAudioPlaying ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Bookmark */}
                            <button
                              onClick={() => handleSaveLastRead(selectedSurah, ayat)}
                              className={`w-8 h-8 rounded-xl flex items-center justify-center transition active:scale-95 ${
                                isBookmarked
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                              title="Tandai terakhir dibaca"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>

                            {/* Bagikan ke WhatsApp */}
                            <button
                              onClick={() => handleShareWhatsApp(selectedSurah, ayat)}
                              className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-center transition active:scale-95"
                              title="Bagikan ayat ini ke WhatsApp"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Copy Ayat */}
                            <button
                              onClick={() => handleCopyAyat(selectedSurah, ayat)}
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition active:scale-95"
                              title="Salin teks ayat"
                            >
                              {copiedAyat === ayat.nomorAyat ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* ARABIC TEXT (DENGAN HURUF TAJWID BERWARNA SESUAI MYQURAN) */}
                        <div className="py-4 text-right" dir="rtl">
                          <p className={`${quranFontClass} font-normal tracking-wide ${arabicFontSizeClass}`}>
                            {renderAyatText(ayat)}
                          </p>
                        </div>

                        {/* TRANSLITERASI LATIN */}
                        {showLatin && ayat.teksLatin && (
                          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-400 italic font-medium pt-1">
                            {ayat.teksLatin}
                          </p>
                        )}

                        {/* TERJEMAHAN BAHASA INDONESIA */}
                        {showTranslation && (
                          <p className="text-xs sm:text-sm pt-2 leading-relaxed font-normal opacity-90">
                            {ayat.teksIndonesia}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* RENDERING MODE 2: MUSHAF CONTINUOUS VIEW */}
              {readingMode === 'mushaf' && surahDetail && surahDetail.ayat && (
                <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${cardThemeClasses}`}>
                  <div className="text-center pb-2 border-b border-slate-200/60 dark:border-slate-700">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Tampilan Lembaran Mushaf Standar • Surah {selectedSurah.namaLatin}
                    </span>
                  </div>

                  <div className={`text-right leading-[2.6] sm:leading-[3] tracking-wide ${quranFontClass}`} dir="rtl">
                    {surahDetail.ayat.map((ayat, index) => {
                      const isHighlighted = highlightedAyat === ayat.nomorAyat;
                      return (
                        <span
                          key={ayat.nomorAyat}
                          id={`mushaf-num-${ayat.nomorAyat}`}
                          className={`inline transition-colors ${
                            isHighlighted ? 'bg-amber-300/80 px-2 py-1 rounded-xl text-slate-900' : ''
                          }`}
                        >
                          <span className={`font-normal ${arabicFontSizeClass}`}>
                            {renderAyatText(ayat)}
                          </span>
                          {/* Ayat End Symbol with Number */}
                          <span
                            onClick={() => handleJumpToAyat(ayat.nomorAyat)}
                            className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 mx-1.5 rounded-full bg-amber-100/90 dark:bg-amber-900/60 border border-amber-300 text-amber-800 dark:text-amber-300 font-mono text-[11px] font-black cursor-pointer hover:scale-110 transition-transform select-none align-middle"
                            title={`Ayat ${ayat.nomorAyat} - Klik untuk loncat`}
                          >
                            {ayat.nomorAyat}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* NAVIGATION PREVIOUS / NEXT SURAH */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                {selectedSurah.nomor > 1 ? (
                  <button
                    onClick={() => {
                      const prev = SURAH_LIST.find((s) => s.nomor === selectedSurah.nomor - 1);
                      if (prev) handleSelectSurah(prev);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Surah Sebelumnya</span>
                  </button>
                ) : (
                  <div />
                )}

                {selectedSurah.nomor < 114 ? (
                  <button
                    onClick={() => {
                      const next = SURAH_LIST.find((s) => s.nomor === selectedSurah.nomor + 1);
                      if (next) handleSelectSurah(next);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
                  >
                    <span>Surah Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          )}
        </div>

        {/* MODAL POPUP: INFO HUKUM TAJWID INTERAKTIF (SENTUH HURUF TAJWID) */}
        {selectedRuleInfo && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: selectedRuleInfo.color }}
                  />
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {selectedRuleInfo.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Pedoman Tajwid Kemenag RI
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRuleInfo(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Kaidah Bacaan:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedRuleInfo.hukum}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Kategori / Cara:</span>
                  <span
                    className="font-bold px-2 py-0.5 rounded-md text-[11px]"
                    style={{
                      color: selectedRuleInfo.color,
                      backgroundColor: `${selectedRuleInfo.color}15`
                    }}
                  >
                    {selectedRuleInfo.kategori}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedRuleInfo.desc}
              </p>

              <button
                onClick={() => setSelectedRuleInfo(null)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active:scale-95 transition"
              >
                Mengerti, Lanjutkan Tilawah
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
