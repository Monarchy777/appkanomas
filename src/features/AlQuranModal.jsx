import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Sun,
  Moon,
  Coffee,
  Volume2,
  VolumeX,
  Settings,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Copy,
  Check,
  Share2,
  Bookmark,
  BookmarkCheck,
  FileText,
  X,
  Search,
  RotateCw,
  Loader2,
  Compass,
  Sparkles,
  Trash2,
  HelpCircle,
  ExternalLink,
  MessageCircle,
  Layers,
  Palette,
  Maximize2,
  Minimize2
} from 'lucide-react';

// DAFTAR 114 SURAH LENGKAP
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

// DAFTAR QARI PILIHAN DUNIA
const QARI_LIST = [
  { id: '05', name: 'Syaikh Misyari Rasyid Al-Afasy' },
  { id: '03', name: 'Syaikh Abdurrahman As-Sudais (Imam Ka’bah)' },
  { id: '01', name: 'Syaikh Abdullah Al-Juhany (Imam Haram)' },
  { id: '06', name: 'Syaikh Yasser Al-Dosari' }
];

// ATURAN WARNA TAJWID (PERSIS SEPERTI GAMBAR USER: PINK/MERAH MUDA UNTUK GHUNNAH/IDGHAM, BIRU UNTUK QALQALAH)
export const TAJWEED_COLORS = {
  // Pink / Magenta untuk Ghunnah & Idgham Bi Ghunnah (Persis di screenshot: مَّ dan وَّا)
  g: { color: '#f43f5e', name: 'Ghunnah Musyaddadah', desc: 'Dengung 2 harakat pada Nun/Mim tasydid' },
  w: { color: '#f43f5e', name: 'Idgham Bi Ghunnah', desc: 'Lebur berdengung' },
  // Biru Cerah untuk Qalqalah (Persis di screenshot: جْ pada وَاَجْرًا)
  q: { color: '#0284c7', name: 'Qalqalah', desc: 'Pantulan bunyi huruf Baju Di Thoko sukun' },
  // Merah untuk Mad Panjang
  m: { color: '#dc2626', name: 'Mad Wajib / Lazim', desc: 'Panjang 5-6 harakat' },
  o: { color: '#e11d48', name: 'Mad Jaiz Munfashil', desc: 'Panjang 4-5 harakat' },
  p: { color: '#ea580c', name: 'Mad \'Aridh Lissukun', desc: 'Panjang 2-6 harakat saat berhenti' },
  // Hijau Toska untuk Ikhfa
  f: { color: '#0d9488', name: 'Ikhfa Haqiqi', desc: 'Samar-samar berdengung' },
  c: { color: '#0f766e', name: 'Ikhfa Syafawi', desc: 'Samar mim bertemu ba' },
  b: { color: '#06b6d4', name: 'Iqlab', desc: 'Tukar ke bunyi Mim kecil' },
  // Abu-abu untuk huruf tidak dibaca / Wasl
  h: { color: '#94a3b8', name: 'Hamzah Washal', desc: 'Tidak dibaca saat menyambung' },
  l: { color: '#94a3b8', name: 'Lam Syamsiyyah', desc: 'Lebur tanpa dibaca' },
  s: { color: '#94a3b8', name: 'Huruf Silent', desc: 'Tidak berharakat' },
  d: { color: '#94a3b8', name: 'Idgham Bila Ghunnah', desc: 'Lebur tanpa dengung' }
};

// Tree Parser Tajweed Markup
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

function renderTajweedNodes(nodes) {
  return nodes.map((node, idx) => {
    if (node.type === 'plain') {
      return <React.Fragment key={idx}>{node.text}</React.Fragment>;
    }
    const info = TAJWEED_COLORS[node.type];
    const children = node.children ? renderTajweedNodes(node.children) : node.text;

    if (!info) {
      return <React.Fragment key={idx}>{children}</React.Fragment>;
    }

    return (
      <span
        key={idx}
        style={{ color: info.color }}
        className="font-bold inline select-text"
        title={`${info.name}: ${info.desc}`}
      >
        {children}
      </span>
    );
  });
}

function renderFallbackTajweed(text) {
  if (!text) return null;
  // Regex: 1. Ghunnah (Nun/Mim tasydid), 2. Qalqalah (Ba, Jim, Dal, Tha, Qaf sukun), 3. Mad bendera (~), 4. Tanwin / Nun sukun
  const regex = /([\u0646\u0645]\u0651)|([بجدطق]\u0652)|([\u0653~])|(نْ|[ًٌٍ])|([\u06E2\u06D8])/g;
  const elements = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    const str = match[0];
    let color = '#f43f5e'; // Pink default (Ghunnah)
    if (match[1]) color = '#f43f5e'; // Ghunnah (Pink persis di screenshot)
    else if (match[2]) color = '#0284c7'; // Qalqalah (Biru persis di screenshot)
    else if (match[3]) color = '#dc2626'; // Mad (Merah)
    else if (match[4]) color = '#0d9488'; // Ikhfa (Toska)
    else if (match[5]) color = '#06b6d4'; // Iqlab (Cyan)

    elements.push(
      <span key={`fb-${match.index}`} style={{ color }} className="font-bold inline select-text">
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

export default function AlQuranModal({ onClose }) {
  // Navigation & Search
  const [selectedSurah, setSelectedSurah] = useState(() => SURAH_LIST[47]); // Default: 48. Al-Fath seperti screenshot
  const [surahDetail, setSurahDetail] = useState(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // UI Themes (Default: Mushaf Green '#eef9ef' persis seperti gambar user!)
  const [themeMode, setThemeMode] = useState('mushaf'); // 'mushaf' | 'light' | 'sepia' | 'dark'
  const [fontSize, setFontSize] = useState('large'); // 'normal' | 'medium' | 'large' | 'extralarge'
  const [fontFamily, setFontFamily] = useState('lpmq'); // 'lpmq' (Kemenag) | 'amiri'

  // Preferences Toggles
  const [showTajweed, setShowTajweed] = useState(true);
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [autoNext, setAutoNext] = useState(true);

  // Audio State & Qari
  const [selectedQari, setSelectedQari] = useState('05'); // 05 = Syaikh Misyari Rasyid
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAyatAudio, setActiveAyatAudio] = useState(null);
  const audioRef = useRef(null);

  // Modals: Settings, Tafsir Ibnu Katsir, Catatan Ayat, Jump to Verse
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showTafsirModal, setShowTafsirModal] = useState(null); // Ayat object for tafsir
  const [tafsirData, setTafsirData] = useState(null);
  const [loadingTafsir, setLoadingTafsir] = useState(false);

  const [showNoteModal, setShowNoteModal] = useState(null); // Ayat object for note
  const [noteInput, setNoteInput] = useState('');
  const [userNotes, setUserNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showJumpModal, setShowJumpModal] = useState(false);
  const [jumpInput, setJumpInput] = useState('');
  const [highlightedAyat, setHighlightedAyat] = useState(null);
  const [copiedAyatNum, setCopiedAyatNum] = useState(null);

  // Fetch Surah Details (equran.id + alquran.cloud tajweed)
  useEffect(() => {
    if (!selectedSurah) return;
    let isCancelled = false;

    async function loadSurah() {
      setLoadingSurah(true);
      if (audioRef.current) audioRef.current.pause();
      setIsPlayingAudio(false);
      setActiveAyatAudio(null);

      const cacheKey = `kanomas_surah_v3_${selectedSurah.nomor}`;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (!isCancelled) {
            setSurahDetail(parsed);
            setLoadingSurah(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Cache read error', e);
      }

      try {
        const [equranRes, tajweedRes] = await Promise.allSettled([
          fetch(`https://equran.id/api/v2/surat/${selectedSurah.nomor}`).then((r) => r.json()),
          fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.nomor}/quran-tajweed`).then((r) => r.json())
        ]);

        if (equranRes.status === 'fulfilled' && equranRes.value?.data) {
          const data = equranRes.value.data;
          if (tajweedRes.status === 'fulfilled' && tajweedRes.value?.data?.ayahs) {
            const tajweedAyahs = tajweedRes.value.data.ayahs;
            data.ayat.forEach((ayah, idx) => {
              ayah.tajweedRaw = tajweedAyahs[idx]?.text || null;
            });
          }
          if (!isCancelled) {
            setSurahDetail(data);
            try {
              localStorage.setItem(cacheKey, JSON.stringify(data));
            } catch {}
          }
        }
      } catch (err) {
        console.error('Error fetching surah:', err);
      } finally {
        if (!isCancelled) setLoadingSurah(false);
      }
    }

    loadSurah();
    return () => {
      isCancelled = true;
    };
  }, [selectedSurah]);

  // Load Tafsir Ibnu Katsir & Kemenag when opening Tafsir Modal
  const handleOpenTafsir = async (ayat) => {
    setShowTafsirModal(ayat);
    setLoadingTafsir(true);
    setTafsirData(null);

    const cacheKey = `kanomas_tafsir_${selectedSurah.nomor}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        const match = parsed.find((t) => t.ayat === ayat.nomorAyat);
        setTafsirData(match ? match.teks : 'Tafsir untuk ayat ini belum tersedia.');
        setLoadingTafsir(false);
        return;
      }
    } catch {}

    try {
      const res = await fetch(`https://equran.id/api/v2/tafsir/${selectedSurah.nomor}`);
      const json = await res.json();
      if (json && json.data && json.data.tafsir) {
        const list = json.data.tafsir;
        try {
          localStorage.setItem(cacheKey, JSON.stringify(list));
        } catch {}
        const match = list.find((t) => t.ayat === ayat.nomorAyat);
        setTafsirData(match ? match.teks : 'Tafsir untuk ayat ini belum tersedia.');
      }
    } catch (e) {
      console.error('Tafsir load error', e);
      setTafsirData('Gagal memuat tafsir. Silakan periksa koneksi internet Anda.');
    } finally {
      setLoadingTafsir(false);
    }
  };

  // Notes Management (Tandai Catatan)
  const handleOpenNoteModal = (ayat) => {
    setShowNoteModal(ayat);
    const key = `${selectedSurah.nomor}:${ayat.nomorAyat}`;
    setNoteInput(userNotes[key]?.text || '');
  };

  const handleSaveNote = () => {
    if (!showNoteModal) return;
    const key = `${selectedSurah.nomor}:${showNoteModal.nomorAyat}`;
    const updated = {
      ...userNotes,
      [key]: {
        text: noteInput.trim(),
        surahNomor: selectedSurah.nomor,
        surahNama: selectedSurah.namaLatin,
        ayatNomor: showNoteModal.nomorAyat,
        updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    };
    if (!noteInput.trim()) {
      delete updated[key];
    }
    setUserNotes(updated);
    try {
      localStorage.setItem('kanomas_quran_notes', JSON.stringify(updated));
    } catch {}
    setShowNoteModal(null);
  };

  const handleDeleteNote = (key) => {
    const updated = { ...userNotes };
    delete updated[key];
    setUserNotes(updated);
    try {
      localStorage.setItem('kanomas_quran_notes', JSON.stringify(updated));
    } catch {}
  };

  // Bookmark / Simpan Ayat
  const handleToggleBookmark = (ayat) => {
    const key = `${selectedSurah.nomor}:${ayat.nomorAyat}`;
    const exists = bookmarks.some((b) => b.key === key);
    let updated;
    if (exists) {
      updated = bookmarks.filter((b) => b.key !== key);
    } else {
      updated = [
        ...bookmarks,
        {
          key,
          surahNomor: selectedSurah.nomor,
          surahNama: selectedSurah.namaLatin,
          ayatNomor: ayat.nomorAyat,
          teksArab: ayat.teksArab,
          teksIndonesia: ayat.teksIndonesia,
          timestamp: new Date().toISOString()
        }
      ];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('kanomas_quran_bookmarks', JSON.stringify(updated));
    } catch {}
  };

  // Share Ayat to WhatsApp / Medsos
  const handleShareAyat = (ayat) => {
    const text = `*Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${ayat.nomorAyat}*\n\n${ayat.teksArab}\n\n_${ayat.teksLatin}_\n\n"${ayat.teksIndonesia}"\n\n📌 _Dibagikan melalui Aplikasi Kanomas Tour & Travel_\nhttps://appkanomas.mediasosial.net`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Copy Ayat text
  const handleCopyAyat = (ayat) => {
    const text = `Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: ${ayat.nomorAyat}\n\n${ayat.teksArab}\n\n${ayat.teksLatin}\n\n"${ayat.teksIndonesia}"\n\n(Aplikasi Kanomas Tour & Travel)`;
    navigator.clipboard?.writeText(text);
    setCopiedAyatNum(ayat.nomorAyat);
    setTimeout(() => setCopiedAyatNum(null), 2000);
  };

  // Play Audio Ayat
  const playAyatAudio = (ayatIndex) => {
    if (!surahDetail || !surahDetail.ayat || !surahDetail.ayat[ayatIndex]) return;
    const currentAyat = surahDetail.ayat[ayatIndex];
    const audioUrl = currentAyat.audio?.[selectedQari] || currentAyat.audio?.['05'] || currentAyat.audio?.['01'];
    if (!audioUrl) return;

    if (audioRef.current) audioRef.current.pause();

    if (isPlayingAudio && activeAyatAudio === currentAyat.nomorAyat) {
      setIsPlayingAudio(false);
      setActiveAyatAudio(null);
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setActiveAyatAudio(currentAyat.nomorAyat);
    setIsPlayingAudio(true);

    // Auto-scroll
    const el = document.getElementById(`ayat-card-${currentAyat.nomorAyat}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    audio.play().catch(() => {
      setIsPlayingAudio(false);
      setActiveAyatAudio(null);
    });

    audio.onended = () => {
      if (autoNext && ayatIndex + 1 < surahDetail.ayat.length) {
        playAyatAudio(ayatIndex + 1);
      } else {
        setIsPlayingAudio(false);
        setActiveAyatAudio(null);
      }
    };
  };

  // Play Full Surah Audio
  const playFullSurah = () => {
    if (!surahDetail || !surahDetail.ayat || surahDetail.ayat.length === 0) return;
    if (isPlayingAudio) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlayingAudio(false);
      setActiveAyatAudio(null);
    } else {
      playAyatAudio(0);
    }
  };

  // Clean audio on close
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Jump to Ayat
  const handleJumpToAyat = (targetNum) => {
    const num = parseInt(targetNum, 10);
    if (!num || !selectedSurah || num < 1 || num > selectedSurah.jumlahAyat) {
      alert(`Nomor ayat tidak valid. Pilih 1 s/d ${selectedSurah.jumlahAyat}`);
      return;
    }
    setShowJumpModal(false);
    setJumpInput('');
    setTimeout(() => {
      const el = document.getElementById(`ayat-card-${num}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedAyat(num);
        setTimeout(() => setHighlightedAyat(null), 3000);
      }
    }, 150);
  };

  // Next / Previous Surah
  const handleNextSurah = () => {
    if (selectedSurah.nomor < 114) {
      const next = SURAH_LIST.find((s) => s.nomor === selectedSurah.nomor + 1);
      if (next) setSelectedSurah(next);
    }
  };

  const handlePrevSurah = () => {
    if (selectedSurah.nomor > 1) {
      const prev = SURAH_LIST.find((s) => s.nomor === selectedSurah.nomor - 1);
      if (prev) setSelectedSurah(prev);
    }
  };

  // Render Arabic Text
  const renderArabic = (ayat) => {
    if (!showTajweed) return ayat.teksArab;
    if (ayat.tajweedRaw) {
      const tree = parseTajweedTree(ayat.tajweedRaw);
      return renderTajweedNodes(tree);
    }
    return renderFallbackTajweed(ayat.teksArab);
  };

  // Theme Styles
  // 'mushaf': soft mint green (#eef9ef) exactly matching the user's reference screenshot!
  const themeBg = {
    mushaf: 'bg-[#edf7ed] text-slate-900',
    light: 'bg-white text-slate-900',
    sepia: 'bg-[#fbf7ee] text-amber-950',
    dark: 'bg-[#0f172a] text-slate-100'
  }[themeMode];

  // Font Size Classes (Melebar dan Panjang / Elongated)
  const arabicSizeClass = {
    normal: 'text-2xl sm:text-3xl leading-[2.6] sm:leading-[2.9] tracking-wide',
    medium: 'text-3xl sm:text-4xl leading-[2.8] sm:leading-[3.1] tracking-wide',
    large: 'text-4xl sm:text-5xl leading-[3.0] sm:leading-[3.4] tracking-wide font-normal',
    extralarge: 'text-5xl sm:text-6xl leading-[3.3] sm:leading-[3.7] tracking-wider font-normal'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-2 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`w-full max-w-4xl h-full sm:h-[96vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 transition-colors duration-200 ${themeBg}`}>
        
        {/* ======================================================== */}
        {/* 1. HEADER UTAMA (HIJAU TUA ISLAMI PERSIS SCREENSHOT USER) */}
        {/* ======================================================== */}
        <div className="bg-[#0b6623] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 shadow-md flex-shrink-0 z-20">
          {/* Tombol Back */}
          <button
            onClick={() => {
              if (showSurahPicker) {
                setShowSurahPicker(false);
              } else {
                onClose();
              }
            }}
            className="w-9 h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Quick Surah Picker Title */}
          <button
            onClick={() => setShowSurahPicker(!showSurahPicker)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl hover:bg-white/15 transition font-bold text-sm sm:text-base max-w-[200px] sm:max-w-none truncate"
          >
            <span>{selectedSurah.nomor}. {selectedSurah.namaLatin}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showSurahPicker ? 'rotate-90' : ''}`} />
          </button>

          {/* Header Action Icons: Loncat, Tema, Pengaturan, Audio */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Tombol Loncat Ayat */}
            <button
              onClick={() => setShowJumpModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title="Loncat ke nomor ayat tertentu"
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Tombol Tema */}
            <button
              onClick={() => {
                const themes = ['mushaf', 'light', 'sepia', 'dark'];
                const nextTheme = themes[(themes.indexOf(themeMode) + 1) % themes.length];
                setThemeMode(nextTheme);
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title={`Ganti Tema (Saat ini: ${themeMode})`}
            >
              {themeMode === 'dark' ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              ) : themeMode === 'sepia' ? (
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              )}
            </button>

            {/* Tombol Pengaturan (Settings) */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title="Pengaturan Tampilan & Qari"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Tombol Putar Murottal Surah Penuh */}
            <button
              onClick={playFullSurah}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl active:scale-95 flex items-center justify-center transition ${
                isPlayingAudio ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'hover:bg-white/20 text-white'
              }`}
              title={isPlayingAudio ? 'Jeda Murottal' : 'Putar Murottal Surah'}
            >
              {isPlayingAudio ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. SUB-HEADER BAR: NAVIGASI SURAT (< 48. Al-Fath >)      */}
        {/* ======================================================== */}
        <div className="bg-white/95 dark:bg-slate-900/90 border-b border-slate-200/90 dark:border-slate-800 px-4 py-2 flex items-center justify-between shadow-xs flex-shrink-0">
          {/* Tombol Surat Sebelumnya (<) */}
          <button
            onClick={handlePrevSurah}
            disabled={selectedSurah.nomor <= 1}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition active:scale-95 ${
              selectedSurah.nomor <= 1
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-[#0b6623] hover:bg-emerald-50 dark:hover:bg-slate-800'
            }`}
            title="Surat Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Identitas Surat Tengah */}
          <div className="text-center">
            <h1 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
              {selectedSurah.nomor}. {selectedSurah.namaLatin}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              {selectedSurah.tempatTurun}, {selectedSurah.jumlahAyat} ayat
            </p>
          </div>

          {/* Tombol Surat Selanjutnya (>) */}
          <button
            onClick={handleNextSurah}
            disabled={selectedSurah.nomor >= 114}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition active:scale-95 ${
              selectedSurah.nomor >= 114
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-[#0b6623] hover:bg-emerald-50 dark:hover:bg-slate-800'
            }`}
            title="Surat Selanjutnya"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* 3. MODAL POPUP PILIH SURAT (DROPDOWN / DRAWER 114 SURAH)  */}
        {/* ======================================================== */}
        {showSurahPicker && (
          <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg z-30 flex-shrink-0 animate-in slide-in-from-top duration-200 max-h-[60vh] overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pilih dari 114 Surat</span>
                <button
                  onClick={() => setShowSurahPicker(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari surat (contoh: Al-Fath, Yasin, Al-Mulk, nomor surat)..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0b6623]"
                />
              </div>

              {/* Grid Surat */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SURAH_LIST.filter(
                  (s) =>
                    s.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.arti.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    String(s.nomor).includes(searchQuery)
                ).map((surah) => (
                  <button
                    key={surah.nomor}
                    onClick={() => {
                      setSelectedSurah(surah);
                      setShowSurahPicker(false);
                      setSearchQuery('');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                      selectedSurah.nomor === surah.nomor
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-[#0b6623] font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="truncate">
                      <span className="text-xs font-bold block truncate">
                        {surah.nomor}. {surah.namaLatin}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {surah.jumlahAyat} ayat • {surah.arti}
                      </span>
                    </div>
                    <span className="font-quran-lpmq text-sm text-[#0b6623] dark:text-emerald-400 font-bold ml-2">
                      {surah.nama}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. DAFTAR AYAT DENGAN TAMPILAN PERSIS SEPERTI SCREENSHOT  */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-8">
          {/* BISMILLAH BANNER (Kecuali Surah 9 & Surah 1) */}
          {selectedSurah.nomor !== 9 && selectedSurah.nomor !== 1 && (
            <div className="text-center py-4">
              <span className="font-quran-lpmq text-2xl sm:text-3xl text-slate-900 dark:text-amber-100 tracking-wider inline-block select-text" dir="rtl">
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </span>
            </div>
          )}

          {/* LOADING STATE */}
          {loadingSurah && (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#0b6623] animate-spin mx-auto" />
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Memuat teks mushaf Surah {selectedSurah.namaLatin}...
              </p>
            </div>
          )}

          {/* DAFTAR AYAT */}
          {!loadingSurah && surahDetail && surahDetail.ayat && (
            <div className="space-y-10 max-w-3xl mx-auto">
              {surahDetail.ayat.map((ayat, index) => {
                const noteKey = `${selectedSurah.nomor}:${ayat.nomorAyat}`;
                const savedNote = userNotes[noteKey];
                const isBookmarked = bookmarks.some((b) => b.key === noteKey);
                const isAudioPlaying = isPlayingAudio && activeAyatAudio === ayat.nomorAyat;
                const isHighlighted = highlightedAyat === ayat.nomorAyat;

                return (
                  <div
                    key={ayat.nomorAyat}
                    id={`ayat-card-${ayat.nomorAyat}`}
                    className={`space-y-4 pb-6 border-b border-emerald-900/10 dark:border-slate-800 transition-all duration-300 ${
                      isHighlighted
                        ? 'p-4 rounded-3xl bg-amber-100/80 dark:bg-amber-950/40 ring-4 ring-amber-400'
                        : isAudioPlaying
                        ? 'p-4 rounded-3xl bg-emerald-100/60 dark:bg-emerald-950/30 ring-2 ring-[#0b6623]'
                        : ''
                    }`}
                  >
                    {/* A. TEKS ARAB DENGAN TAJWID WARNA & NOMOR AYAT PERSIS SCREENSHOT */}
                    <div className="text-right" dir="rtl">
                      <p className={`font-quran-lpmq text-slate-900 dark:text-slate-100 ${arabicSizeClass} select-text`}>
                        {renderArabic(ayat)}

                        {/* ORNAMEN BINGKAI HIJAU NOMOR AYAT (PERSIS SEPERTI GAMBAR USER) */}
                        <span
                          onClick={() => handleOpenTafsir(ayat)}
                          className="inline-flex items-center justify-center align-middle mx-2 select-none cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                          title={`Ayat ${ayat.nomorAyat} - Klik untuk lihat Tafsir`}
                        >
                          <span className="relative flex items-center justify-center px-3 py-0.5 bg-gradient-to-r from-[#0b6623] via-[#15803d] to-[#0b6623] text-white font-mono text-xs sm:text-sm font-black rounded-lg border-2 border-slate-300 dark:border-slate-600 shadow-sm ring-1 ring-emerald-900">
                            {ayat.nomorAyat}
                          </span>
                        </span>
                      </p>
                    </div>

                    {/* B. TRANSLITERASI LATIN (WARNA HIJAU/TEBAL PERSIS SCREENSHOT) */}
                    {showLatin && ayat.teksLatin && (
                      <p className="text-sm sm:text-base text-emerald-950 dark:text-emerald-300 leading-relaxed font-normal select-text">
                        {ayat.teksLatin}
                      </p>
                    )}

                    {/* C. TERJEMAHAN BAHASA INDONESIA (PERSIS SCREENSHOT) */}
                    {showTranslation && ayat.teksIndonesia && (
                      <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal select-text">
                        {ayat.teksIndonesia}
                      </p>
                    )}

                    {/* D. CATATAN PRIBADI JAMAAH (JIKA ADA) */}
                    {savedNote && (
                      <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Catatan Anda ({savedNote.updatedAt}):</span>
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 italic">
                            "{savedNote.text}"
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleOpenNoteModal(ayat)}
                            className="text-amber-700 hover:text-amber-900 font-bold px-2 py-0.5 rounded-lg bg-amber-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNote(noteKey)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Hapus Catatan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ================================================================ */}
                    {/* E. BILAH AKSI AYAT MENGAMBANG (PERSIS SEPERTI DI GAMBAR REFERENSI) */}
                    {/* ================================================================ */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* 1. BADGE NOMOR AYAT ORNAMEN */}
                        <div className="flex items-center justify-center px-3 py-1 bg-gradient-to-r from-[#0b6623] to-[#15803d] text-white font-mono text-xs sm:text-sm font-black rounded-lg border-2 border-slate-300 dark:border-slate-600 shadow-xs">
                          {ayat.nomorAyat}
                        </div>

                        {/* 2. TOMBOL TAFSIR (BUKU TERBUKA) */}
                        <button
                          onClick={() => handleOpenTafsir(ayat)}
                          className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[#0b6623] dark:text-emerald-400 font-bold text-xs flex items-center gap-1 hover:bg-emerald-50 active:scale-95 transition shadow-2xs"
                          title="Buka Tafsir Ibnu Katsir & Kemenag"
                        >
                          <BookOpen className="w-4 h-4 stroke-[2.2]" />
                          <span className="hidden sm:inline">Tafsir</span>
                        </button>

                        {/* 3. TOMBOL SALIN (COPY) */}
                        <button
                          onClick={() => handleCopyAyat(ayat)}
                          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 hover:bg-slate-100 active:scale-95 transition shadow-2xs"
                          title="Salin Teks Ayat & Terjemahan"
                        >
                          {copiedAyatNum === ayat.nomorAyat ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span className="hidden sm:inline">Salin</span>
                        </button>

                        {/* 4. TOMBOL SHARE (BAGIKAN KE WA / MEDSOS) */}
                        <button
                          onClick={() => handleShareAyat(ayat)}
                          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 hover:bg-slate-100 active:scale-95 transition shadow-2xs"
                          title="Bagikan Ayat ke WhatsApp"
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Share</span>
                        </button>

                        {/* 5. TOMBOL TANDAI CATATAN (NOTE) */}
                        <button
                          onClick={() => handleOpenNoteModal(ayat)}
                          className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1 transition active:scale-95 shadow-2xs ${
                            savedNote
                              ? 'bg-amber-100 border-amber-300 text-amber-800'
                              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                          title="Tandai Catatan Pribadi pada Ayat Ini"
                        >
                          <FileText className="w-4 h-4" />
                          <span className="hidden sm:inline">Catatan</span>
                        </button>

                        {/* 6. TOMBOL SIMPAN / BOOKMARK */}
                        <button
                          onClick={() => handleToggleBookmark(ayat)}
                          className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1 transition active:scale-95 shadow-2xs ${
                            isBookmarked
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                          title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Ayat'}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                          <span className="hidden sm:inline">{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
                        </button>
                      </div>

                      {/* 7. TOMBOL PUTAR AUDIO PER-AYAT */}
                      <button
                        onClick={() => playAyatAudio(index)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition active:scale-95 ${
                          isAudioPlaying
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                        title="Putar Audio Ayat"
                      >
                        {isAudioPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-[#0b6623] dark:text-emerald-400" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* MODAL 1: TAFSIR IBNU KATSIR & KEMENAG RI                 */}
        {/* ======================================================== */}
        {showTafsirModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
              {/* Header Tafsir */}
              <div className="p-4 bg-[#0b6623] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5" />
                  <div>
                    <h3 className="text-base font-black">
                      Tafsir QS. {selectedSurah.namaLatin}: Ayat {showTafsirModal.nomorAyat}
                    </h3>
                    <p className="text-xs text-emerald-100 font-medium">
                      Tafsir Tahlili & Ibnu Katsir Kementerian Agama RI
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTafsirModal(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Tafsir */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Cuplikan Ayat */}
                <div className="p-4 rounded-2xl bg-[#edf7ed] dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 space-y-2">
                  <div className="text-right font-quran-lpmq text-xl sm:text-2xl text-slate-900 dark:text-emerald-200" dir="rtl">
                    {showTafsirModal.teksArab}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                    "{showTafsirModal.teksIndonesia}"
                  </p>
                </div>

                {/* Konten Tafsir */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Uraian & Penjelasan Tafsir</span>
                    <button
                      onClick={() => {
                        if (tafsirData) {
                          navigator.clipboard?.writeText(`Tafsir QS. ${selectedSurah.namaLatin}: ${showTafsirModal.nomorAyat}\n\n${tafsirData}\n\n(Aplikasi Kanomas)`);
                          alert('Tafsir berhasil disalin!');
                        }
                      }}
                      className="text-xs font-bold text-[#0b6623] hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Tafsir</span>
                    </button>
                  </div>

                  {loadingTafsir ? (
                    <div className="py-12 text-center space-y-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#0b6623] mx-auto" />
                      <p className="text-xs text-slate-500">Memuat teks tafsir...</p>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-serif">
                      {tafsirData}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowTafsirModal(null)}
                  className="px-5 py-2 rounded-xl bg-[#0b6623] hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active:scale-95 transition"
                >
                  Tutup Tafsir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 2: TANDAI CATATAN PRIBADI AYAT                     */}
        {/* ======================================================== */}
        {showNoteModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Catatan QS. {selectedSurah.namaLatin}: Ayat {showNoteModal.nomorAyat}
                  </h3>
                </div>
                <button
                  onClick={() => setShowNoteModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 italic">
                "{showNoteModal.teksIndonesia}"
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Tuliskan renungan / catatan ibadah Anda:
                </label>
                <textarea
                  rows="4"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Misal: Ayat ini dibaca saat thawaf putaran ke-3, sangat menggetarkan hati..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowNoteModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-xs active:scale-95 transition"
                >
                  Simpan Catatan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 3: PENGATURAN (SETTINGS) & PILIHAN QARI            */}
        {/* ======================================================== */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Settings className="w-5 h-5 text-[#0b6623]" />
                  <h3 className="text-base font-black">Pengaturan Membaca & Murottal</h3>
                </div>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Pilihan Qari */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Pilihan Syaikh Qari Murottal:
                </label>
                <select
                  value={selectedQari}
                  onChange={(e) => setSelectedQari(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b6623]"
                >
                  {QARI_LIST.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Ukuran Tulisan Arab */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Ukuran Tulisan Arab (Panjang & Besar):
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {['normal', 'medium', 'large', 'extralarge'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`py-2 rounded-xl font-bold transition capitalize ${
                        fontSize === size
                          ? 'bg-[#0b6623] text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {size === 'normal' ? 'Sedang' : size === 'medium' ? 'Besar' : size === 'large' ? 'Ekstra' : 'Jumbo'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Toggles Tampilan */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Penanda Bacaan Tajwid Berwarna</span>
                  <input
                    type="checkbox"
                    checked={showTajweed}
                    onChange={(e) => setShowTajweed(e.target.checked)}
                    className="w-4 h-4 text-[#0b6623] rounded accent-[#0b6623]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Tampilkan Transliterasi Latin</span>
                  <input
                    type="checkbox"
                    checked={showLatin}
                    onChange={(e) => setShowLatin(e.target.checked)}
                    className="w-4 h-4 text-[#0b6623] rounded accent-[#0b6623]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Tampilkan Terjemahan Indonesia</span>
                  <input
                    type="checkbox"
                    checked={showTranslation}
                    onChange={(e) => setShowTranslation(e.target.checked)}
                    className="w-4 h-4 text-[#0b6623] rounded accent-[#0b6623]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Lanjutkan Audio Ayat Otomatis</span>
                  <input
                    type="checkbox"
                    checked={autoNext}
                    onChange={(e) => setAutoNext(e.target.checked)}
                    className="w-4 h-4 text-[#0b6623] rounded accent-[#0b6623]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full py-2.5 rounded-xl bg-[#0b6623] hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active:scale-95 transition"
                >
                  Simpan & Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 4: LONCAT KE AYAT TERTENTU                         */}
        {/* ======================================================== */}
        {showJumpModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#0b6623]" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Loncat ke Ayat
                  </h3>
                </div>
                <button
                  onClick={() => setShowJumpModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-500">
                  Surah {selectedSurah.namaLatin} memiliki {selectedSurah.jumlahAyat} ayat.
                </span>
                <input
                  type="number"
                  min="1"
                  max={selectedSurah.jumlahAyat}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder={`Nomor ayat (1 - ${selectedSurah.jumlahAyat})`}
                  autoFocus
                  className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-mono text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#0b6623]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleJumpToAyat(jumpInput)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0b6623] hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active:scale-95 transition"
                >
                  Loncat ke Ayat
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
