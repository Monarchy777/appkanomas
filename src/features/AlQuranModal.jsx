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
  CheckCircle2
} from 'lucide-react';

// Daftar 114 Surah Lengkap (Preloaded agar cepat terbuka 0ms dan offline-ready)
export const SURAH_LIST = [
  { nomor: 1, nama: "الفاتحة", namaLatin: "Al-Fatihah", arti: "Pembukaan", jumlahAyat: 7, tempatTurun: "Mekah" },
  { nomor: 2, nama: "البقرة", namaLatin: "Al-Baqarah", arti: "Sapi Betina", jumlahAyat: 286, tempatTurun: "Madinah" },
  { nomor: 3, nama: "آل عمران", namaLatin: "Ali 'Imran", arti: "Keluarga Imran", jumlahAyat: 200, tempatTurun: "Madinah" },
  { nomor: 4, nama: "النساء", namaLatin: "An-Nisa'", arti: "Wanita", jumlahAyat: 176, tempatTurun: "Madinah" },
  { nomor: 5, nama: "المائدة", namaLatin: "Al-Ma'idah", arti: "Hidangan", jumlahAyat: 120, tempatTurun: "Madinah" },
  { nomor: 6, nama: "الأنعام", namaLatin: "Al-An'am", arti: "Binatang Ternak", jumlahAyat: 165, tempatTurun: "Mekah" },
  { nomor: 7, nama: "الأعراف", namaLatin: "Al-A'raf", arti: "Tempat Tertinggi", jumlahAyat: 206, tempatTurun: "Mekah" },
  { nomor: 8, nama: "الأنفال", namaLatin: "Al-Anfal", arti: "Rampasan Perang", jumlahAyat: 75, tempatTurun: "Madinah" },
  { nomor: 9, nama: "التوبة", namaLatin: "At-Taubah", arti: "Pengampunan", jumlahAyat: 129, tempatTurun: "Madinah" },
  { nomor: 10, nama: "يونس", namaLatin: "Yunus", arti: "Nabi Yunus", jumlahAyat: 109, tempatTurun: "Mekah" },
  { nomor: 11, nama: "هود", namaLatin: "Hud", arti: "Nabi Hud", jumlahAyat: 123, tempatTurun: "Mekah" },
  { nomor: 12, nama: "يوسف", namaLatin: "Yusuf", arti: "Nabi Yusuf", jumlahAyat: 111, tempatTurun: "Mekah" },
  { nomor: 13, nama: "الرعد", namaLatin: "Ar-Ra'd", arti: "Guruh", jumlahAyat: 43, tempatTurun: "Madinah" },
  { nomor: 14, nama: "ابراهيم", namaLatin: "Ibrahim", arti: "Nabi Ibrahim", jumlahAyat: 52, tempatTurun: "Mekah" },
  { nomor: 15, nama: "الحجر", namaLatin: "Al-Hijr", arti: "Bukit Hijr", jumlahAyat: 99, tempatTurun: "Mekah" },
  { nomor: 16, nama: "النحل", namaLatin: "An-Nahl", arti: "Lebah", jumlahAyat: 128, tempatTurun: "Mekah" },
  { nomor: 17, nama: "الإسراء", namaLatin: "Al-Isra'", arti: "Memperjalankan Malam Hari", jumlahAyat: 111, tempatTurun: "Mekah" },
  { nomor: 18, nama: "الكهف", namaLatin: "Al-Kahf", arti: "Gua", jumlahAyat: 110, tempatTurun: "Mekah" },
  { nomor: 19, nama: "مريم", namaLatin: "Maryam", arti: "Maryam", jumlahAyat: 98, tempatTurun: "Mekah" },
  { nomor: 20, nama: "طه", namaLatin: "Taha", arti: "Taha", jumlahAyat: 135, tempatTurun: "Mekah" },
  { nomor: 21, nama: "الأنبياء", namaLatin: "Al-Anbiya'", arti: "Para Nabi", jumlahAyat: 112, tempatTurun: "Mekah" },
  { nomor: 22, nama: "الحج", namaLatin: "Al-Hajj", arti: "Haji", jumlahAyat: 78, tempatTurun: "Madinah" },
  { nomor: 23, nama: "المؤمنون", namaLatin: "Al-Mu'minun", arti: "Orang-Orang Mukmin", jumlahAyat: 118, tempatTurun: "Mekah" },
  { nomor: 24, nama: "النور", namaLatin: "An-Nur", arti: "Cahaya", jumlahAyat: 64, tempatTurun: "Madinah" },
  { nomor: 25, nama: "الفرقان", namaLatin: "Al-Furqan", arti: "Pembeda", jumlahAyat: 77, tempatTurun: "Mekah" },
  { nomor: 26, nama: "الشعراء", namaLatin: "Asy-Syu'ara'", arti: "Penyair", jumlahAyat: 227, tempatTurun: "Mekah" },
  { nomor: 27, nama: "النمل", namaLatin: "An-Naml", arti: "Semut", jumlahAyat: 93, tempatTurun: "Mekah" },
  { nomor: 28, nama: "القصص", namaLatin: "Al-Qasas", arti: "Kisah-Kisah", jumlahAyat: 88, tempatTurun: "Mekah" },
  { nomor: 29, nama: "العنكبوت", namaLatin: "Al-'Ankabut", arti: "Laba-Laba", jumlahAyat: 69, tempatTurun: "Mekah" },
  { nomor: 30, nama: "الروم", namaLatin: "Ar-Rum", arti: "Romawi", jumlahAyat: 60, tempatTurun: "Mekah" },
  { nomor: 31, nama: "لقمان", namaLatin: "Luqman", arti: "Luqman", jumlahAyat: 34, tempatTurun: "Mekah" },
  { nomor: 32, nama: "السجدة", namaLatin: "As-Sajdah", arti: "Sujud", jumlahAyat: 30, tempatTurun: "Mekah" },
  { nomor: 33, nama: "الأحزاب", namaLatin: "Al-Ahzab", arti: "Golongan yang Bersekutu", jumlahAyat: 73, tempatTurun: "Madinah" },
  { nomor: 34, nama: "سبأ", namaLatin: "Saba'", arti: "Kaum Saba'", jumlahAyat: 54, tempatTurun: "Mekah" },
  { nomor: 35, nama: "فاطر", namaLatin: "Fatir", arti: "Pencipta", jumlahAyat: 45, tempatTurun: "Mekah" },
  { nomor: 36, nama: "يس", namaLatin: "Yasin", arti: "Yasin", jumlahAyat: 83, tempatTurun: "Mekah" },
  { nomor: 37, nama: "الصافات", namaLatin: "As-Saffat", arti: "Barisan-Barisan", jumlahAyat: 182, tempatTurun: "Mekah" },
  { nomor: 38, nama: "ص", namaLatin: "Sad", arti: "Sad", jumlahAyat: 88, tempatTurun: "Mekah" },
  { nomor: 39, nama: "الزمر", namaLatin: "Az-Zumar", arti: "Rombongan", jumlahAyat: 75, tempatTurun: "Mekah" },
  { nomor: 40, nama: "غافر", namaLatin: "Ghafir", arti: "Yang Mengampuni", jumlahAyat: 85, tempatTurun: "Mekah" },
  { nomor: 41, nama: "فصلت", namaLatin: "Fussilat", arti: "Dijelaskan", jumlahAyat: 54, tempatTurun: "Mekah" },
  { nomor: 42, nama: "الشورى", namaLatin: "Asy-Syura", arti: "Musyawarah", jumlahAyat: 53, tempatTurun: "Mekah" },
  { nomor: 43, nama: "الزخرف", namaLatin: "Az-Zukhruf", arti: "Perhiasan", jumlahAyat: 89, tempatTurun: "Mekah" },
  { nomor: 44, nama: "الدخان", namaLatin: "Ad-Dukhan", arti: "Kabut", jumlahAyat: 59, tempatTurun: "Mekah" },
  { nomor: 45, nama: "الجاثية", namaLatin: "Al-Jasiyah", arti: "Yang Berlutut", jumlahAyat: 37, tempatTurun: "Mekah" },
  { nomor: 46, nama: "الأحقاف", namaLatin: "Al-Ahqaf", arti: "Bukit-Bukit Pasir", jumlahAyat: 35, tempatTurun: "Mekah" },
  { nomor: 47, nama: "محمد", namaLatin: "Muhammad", arti: "Nabi Muhammad", jumlahAyat: 38, tempatTurun: "Madinah" },
  { nomor: 48, nama: "الفتح", namaLatin: "Al-Fath", arti: "Kemenangan", jumlahAyat: 29, tempatTurun: "Madinah" },
  { nomor: 49, nama: "الحجرات", namaLatin: "Al-Hujurat", arti: "Kamar-Kamar", jumlahAyat: 18, tempatTurun: "Madinah" },
  { nomor: 50, nama: "ق", namaLatin: "Qaf", arti: "Qaf", jumlahAyat: 45, tempatTurun: "Mekah" },
  { nomor: 51, nama: "الذاريات", namaLatin: "Az-Zariyat", arti: "Angin yang Menerbangkan", jumlahAyat: 60, tempatTurun: "Mekah" },
  { nomor: 52, nama: "الطور", namaLatin: "At-Tur", arti: "Bukit Tursina", jumlahAyat: 49, tempatTurun: "Mekah" },
  { nomor: 53, nama: "النجم", namaLatin: "An-Najm", arti: "Bintang", jumlahAyat: 62, tempatTurun: "Mekah" },
  { nomor: 54, nama: "القمر", namaLatin: "Al-Qamar", arti: "Bulan", jumlahAyat: 55, tempatTurun: "Mekah" },
  { nomor: 55, nama: "الرحمن", namaLatin: "Ar-Rahman", arti: "Maha Pemurah", jumlahAyat: 78, tempatTurun: "Madinah" },
  { nomor: 56, nama: "الواقعة", namaLatin: "Al-Waqi'ah", arti: "Hari Kiamat", jumlahAyat: 96, tempatTurun: "Mekah" },
  { nomor: 57, nama: "الحديد", namaLatin: "Al-Hadid", arti: "Besi", jumlahAyat: 29, tempatTurun: "Madinah" },
  { nomor: 58, nama: "المجادلة", namaLatin: "Al-Mujadilah", arti: "Wanita yang Mengajukan Gugatan", jumlahAyat: 22, tempatTurun: "Madinah" },
  { nomor: 59, nama: "الحشر", namaLatin: "Al-Hasyr", arti: "Pengusiran", jumlahAyat: 24, tempatTurun: "Madinah" },
  { nomor: 60, nama: "الممتحنة", namaLatin: "Al-Mumtahanah", arti: "Wanita yang Diuji", jumlahAyat: 13, tempatTurun: "Madinah" },
  { nomor: 61, nama: "الصف", namaLatin: "As-Saff", arti: "Barisan", jumlahAyat: 14, tempatTurun: "Madinah" },
  { nomor: 62, nama: "الجمعة", namaLatin: "Al-Jumu'ah", arti: "Hari Jum'at", jumlahAyat: 11, tempatTurun: "Madinah" },
  { nomor: 63, nama: "المنافقون", namaLatin: "Al-Munafiqun", arti: "Orang-Orang Munafik", jumlahAyat: 11, tempatTurun: "Madinah" },
  { nomor: 64, nama: "التغابن", namaLatin: "At-Tagabun", arti: "Hari Ditampakkan Kesalahan", jumlahAyat: 18, tempatTurun: "Madinah" },
  { nomor: 65, nama: "الطلاق", namaLatin: "At-Talaq", arti: "Talak", jumlahAyat: 12, tempatTurun: "Madinah" },
  { nomor: 66, nama: "التحريم", namaLatin: "At-Tahrim", arti: "Mengharamkan", jumlahAyat: 12, tempatTurun: "Madinah" },
  { nomor: 67, nama: "الملك", namaLatin: "Al-Mulk", arti: "Kerajaan", jumlahAyat: 30, tempatTurun: "Mekah" },
  { nomor: 68, nama: "القلم", namaLatin: "Al-Qalam", arti: "Pena", jumlahAyat: 52, tempatTurun: "Mekah" },
  { nomor: 69, nama: "الحاقة", namaLatin: "Al-Haqqah", arti: "Hari Kiamat", jumlahAyat: 52, tempatTurun: "Mekah" },
  { nomor: 70, nama: "المعارج", namaLatin: "Al-Ma'arij", arti: "Tempat Naik", jumlahAyat: 44, tempatTurun: "Mekah" },
  { nomor: 71, nama: "نوح", namaLatin: "Nuh", arti: "Nabi Nuh", jumlahAyat: 28, tempatTurun: "Mekah" },
  { nomor: 72, nama: "الجن", namaLatin: "Al-Jinn", arti: "Jin", jumlahAyat: 28, tempatTurun: "Mekah" },
  { nomor: 73, nama: "المزمل", namaLatin: "Al-Muzzammil", arti: "Orang yang Berselimut", jumlahAyat: 20, tempatTurun: "Mekah" },
  { nomor: 74, nama: "المدثر", namaLatin: "Al-Muddassir", arti: "Orang yang Berkemul", jumlahAyat: 56, tempatTurun: "Mekah" },
  { nomor: 75, nama: "القيامة", namaLatin: "Al-Qiyamah", arti: "Hari Berbangkit", jumlahAyat: 40, tempatTurun: "Mekah" },
  { nomor: 76, nama: "الانسان", namaLatin: "Al-Insan", arti: "Manusia", jumlahAyat: 31, tempatTurun: "Madinah" },
  { nomor: 77, nama: "المرسلات", namaLatin: "Al-Mursalat", arti: "Malaikat-Malaikat yang Diutus", jumlahAyat: 50, tempatTurun: "Mekah" },
  { nomor: 78, nama: "النبأ", namaLatin: "An-Naba'", arti: "Berita Besar", jumlahAyat: 40, tempatTurun: "Mekah" },
  { nomor: 79, nama: "النازعات", namaLatin: "An-Nazi'at", arti: "Malaikat yang Mencabut", jumlahAyat: 46, tempatTurun: "Mekah" },
  { nomor: 80, nama: "عبس", namaLatin: "'Abasa", arti: "Ia Bermuka Masam", jumlahAyat: 42, tempatTurun: "Mekah" },
  { nomor: 81, nama: "التكوير", namaLatin: "At-Takwir", arti: "Menggulung", jumlahAyat: 29, tempatTurun: "Mekah" },
  { nomor: 82, nama: "الانفطار", namaLatin: "Al-Infitar", arti: "Terbelah", jumlahAyat: 19, tempatTurun: "Mekah" },
  { nomor: 83, nama: "المطففين", namaLatin: "Al-Mutaffifin", arti: "Orang-Orang yang Curang", jumlahAyat: 36, tempatTurun: "Mekah" },
  { nomor: 84, nama: "الانشقاق", namaLatin: "Al-Insyiqaq", arti: "Terbelah", jumlahAyat: 25, tempatTurun: "Mekah" },
  { nomor: 85, nama: "البروج", namaLatin: "Al-Buruj", arti: "Gugusan Bintang", jumlahAyat: 22, tempatTurun: "Mekah" },
  { nomor: 86, nama: "الطارق", namaLatin: "At-Tariq", arti: "Yang Datang di Malam Hari", jumlahAyat: 17, tempatTurun: "Mekah" },
  { nomor: 87, nama: "الأعلى", namaLatin: "Al-A'la", arti: "Maha Tinggi", jumlahAyat: 19, tempatTurun: "Mekah" },
  { nomor: 88, nama: "الغاشية", namaLatin: "Al-Ghasyiyah", arti: "Hari Pembalasan", jumlahAyat: 26, tempatTurun: "Mekah" },
  { nomor: 89, nama: "الفجر", namaLatin: "Al-Fajr", arti: "Fajar", jumlahAyat: 30, tempatTurun: "Mekah" },
  { nomor: 90, nama: "البلد", namaLatin: "Al-Balad", arti: "Negeri", jumlahAyat: 20, tempatTurun: "Mekah" },
  { nomor: 91, nama: "الشمس", namaLatin: "Asy-Syams", arti: "Matahari", jumlahAyat: 15, tempatTurun: "Mekah" },
  { nomor: 92, nama: "الليل", namaLatin: "Al-Lail", arti: "Malam", jumlahAyat: 21, tempatTurun: "Mekah" },
  { nomor: 93, nama: "الضحى", namaLatin: "Ad-Duha", arti: "Waktu Duha", jumlahAyat: 11, tempatTurun: "Mekah" },
  { nomor: 94, nama: "الشرح", namaLatin: "Asy-Syarh", arti: "Kelapangan", jumlahAyat: 8, tempatTurun: "Mekah" },
  { nomor: 95, nama: "التين", namaLatin: "At-Tin", arti: "Buah Tin", jumlahAyat: 8, tempatTurun: "Mekah" },
  { nomor: 96, nama: "العلق", namaLatin: "Al-'Alaq", arti: "Segumpal Darah", jumlahAyat: 19, tempatTurun: "Mekah" },
  { nomor: 97, nama: "القدر", namaLatin: "Al-Qadr", arti: "Kemuliaan", jumlahAyat: 5, tempatTurun: "Mekah" },
  { nomor: 98, nama: "البينة", namaLatin: "Al-Bayyinah", arti: "Bukti Nyata", jumlahAyat: 8, tempatTurun: "Madinah" },
  { nomor: 99, nama: "الزلزلة", namaLatin: "Az-Zalzalah", arti: "Goncangan", jumlahAyat: 8, tempatTurun: "Madinah" },
  { nomor: 100, nama: "العاديات", namaLatin: "Al-'Adiyat", arti: "Kuda Perang yang Berlari Kencang", jumlahAyat: 11, tempatTurun: "Mekah" },
  { nomor: 101, nama: "القارعة", namaLatin: "Al-Qari'ah", arti: "Hari Kiamat", jumlahAyat: 11, tempatTurun: "Mekah" },
  { nomor: 102, nama: "التكاثر", namaLatin: "At-Takasur", arti: "Bermegah-Megahan", jumlahAyat: 8, tempatTurun: "Mekah" },
  { nomor: 103, nama: "العصر", namaLatin: "Al-'Asr", arti: "Masa", jumlahAyat: 3, tempatTurun: "Mekah" },
  { nomor: 104, nama: "الهمزة", namaLatin: "Al-Humazah", arti: "Pengumpat", jumlahAyat: 9, tempatTurun: "Mekah" },
  { nomor: 105, nama: "الفيل", namaLatin: "Al-Fil", arti: "Gajah", jumlahAyat: 5, tempatTurun: "Mekah" },
  { nomor: 106, nama: "قريش", namaLatin: "Quraisy", arti: "Suku Quraisy", jumlahAyat: 4, tempatTurun: "Mekah" },
  { nomor: 107, nama: "الماعون", namaLatin: "Al-Ma'un", arti: "Barang yang Berguna", jumlahAyat: 7, tempatTurun: "Mekah" },
  { nomor: 108, nama: "الكوثر", namaLatin: "Al-Kausar", arti: "Nikmat yang Banyak", jumlahAyat: 3, tempatTurun: "Mekah" },
  { nomor: 109, nama: "الكافرون", namaLatin: "Al-Kafirun", arti: "Orang-Orang Kafir", jumlahAyat: 6, tempatTurun: "Mekah" },
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

// TAJWEED PARSER: Menandai Hukum Bacaan Tajwid dengan Warna Standar
function renderTajweedText(text) {
  if (!text) return null;

  // Regex rules:
  // 1. Ghunnah: Nun or Mim with Tasydid ([\u0646\u0645]\u0651)
  // 2. Qalqalah: Ba, Jim, Dal, Tha, Qaf with Sukun ([بجدطق]\u0652)
  // 3. Mad: Maddah mark ([\u0653~])
  // 4. Ikhfa / Idgham: Nun sukun or Tanwin (نْ|[ًٌٍ])
  // 5. Iqlab: Small high meem ([\u06E2\u06D8])
  // 6. Waqaf: ([\u06D6-\u06DC])
  const regex = /([\u0646\u0645]\u0651)|([بجدطق]\u0652)|([\u0653~])|(نْ|[ًٌٍ])|([\u06E2\u06D8])|([\u06D6-\u06DC])/g;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    const matchedStr = match[0];
    const key = `tajweed-${match.index}`;

    if (match[1]) {
      // Ghunnah: Hijau Emerald
      elements.push(
        <span key={key} className="text-emerald-600 font-black" title="Ghunnah (Dengung 2 Harakat)">
          {matchedStr}
        </span>
      );
    } else if (match[2]) {
      // Qalqalah: Biru Royal
      elements.push(
        <span key={key} className="text-blue-600 font-black" title="Qalqalah (Pantulan Bunyi)">
          {matchedStr}
        </span>
      );
    } else if (match[3]) {
      // Mad: Ungu Violet
      elements.push(
        <span key={key} className="text-purple-600 font-black" title="Mad (Panjang 4-6 Harakat)">
          {matchedStr}
        </span>
      );
    } else if (match[4]) {
      // Ikhfa / Idgham: Oranye Amber
      elements.push(
        <span key={key} className="text-amber-600 font-black" title="Ikhfa / Idgham (Samar / Lebur Berdengung)">
          {matchedStr}
        </span>
      );
    } else if (match[5]) {
      // Iqlab: Teal Cyan
      elements.push(
        <span key={key} className="text-teal-600 font-black" title="Iqlab (Mengganti Bunyi Menjadi Mim)">
          {matchedStr}
        </span>
      );
    } else if (match[6]) {
      // Tanda Waqaf
      elements.push(
        <span key={key} className="text-amber-500 font-mono text-sm px-0.5 inline-block" title="Tanda Waqaf">
          {matchedStr}
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
}

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
  const audioRef = useRef(null);

  // UI/UX Preferences
  const [readingMode, setReadingMode] = useState('ayat'); // 'ayat' | 'mushaf'
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'sepia' | 'dark'
  const [fontSize, setFontSize] = useState('medium'); // 'normal' | 'medium' | 'large' | 'extralarge'
  const [showTajweed, setShowTajweed] = useState(true);
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTajweedLegend, setShowTajweedLegend] = useState(false);

  // Fitur Loncat Ayat State
  const [showJumpModal, setShowJumpModal] = useState(false);
  const [jumpInput, setJumpInput] = useState('');
  const [highlightedAyat, setHighlightedAyat] = useState(null);

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

  // Fetch Surah Detail when selected
  const handleSelectSurah = async (surah) => {
    setSelectedSurah(surah);
    setLoadingSurah(true);
    setErrorMsg(null);
    setSurahDetail(null);
    setIsPlayingAudio(false);
    setActiveAudioAyat(null);
    setShowJumpModal(false);

    // Check localStorage cache first
    const cacheKey = `kanomas_quran_surah_${surah.nomor}`;
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
      const res = await fetch(`https://equran.id/api/v2/surat/${surah.nomor}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      if (json && json.data) {
        setSurahDetail(json.data);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(json.data));
        } catch {
          // ignore quota
        }
      } else {
        throw new Error('Format data tidak sesuai');
      }
    } catch (err) {
      console.error('Fetch surah error:', err);
      setErrorMsg('Gagal memuat ayat surah. Pastikan koneksi internet tersedia.');
    } finally {
      setLoadingSurah(false);
    }
  };

  // Play audio ayat with continuous next-ayah capability
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
    const text = `Q.S. ${surah.namaLatin}: ${ayat.nomorAyat}\n\n${ayat.teksArab}\n\n"${ayat.teksIndonesia}"\n\n(Aplikasi Resmi Kanomas Tour & Travel)`;
    navigator.clipboard?.writeText(text);
    setCopiedAyat(ayat.nomorAyat);
    setTimeout(() => setCopiedAyat(null), 2000);
  };

  // Font size classes
  const arabicFontClass = {
    normal: 'text-2xl sm:text-3xl leading-loose',
    medium: 'text-3xl sm:text-4xl leading-loose',
    large: 'text-4xl sm:text-5xl leading-loose',
    extralarge: 'text-5xl sm:text-6xl leading-[2.4]'
  }[fontSize];

  // Theme Classes
  const themeClasses = {
    light: 'bg-white text-slate-800',
    sepia: 'bg-[#fbf7ee] text-amber-950',
    dark: 'bg-[#0f172a] text-slate-100'
  }[themeMode];

  const cardThemeClasses = {
    light: 'bg-white border-slate-200/90',
    sepia: 'bg-[#f5efe3] border-amber-200/80',
    dark: 'bg-slate-800/90 border-slate-700'
  }[themeMode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`w-full max-w-4xl h-[95vh] sm:h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 transition-colors duration-200 ${themeClasses}`}>
        
        {/* TOP HEADER */}
        <div className={`p-3.5 sm:p-4 border-b flex items-center justify-between gap-2.5 flex-shrink-0 ${
          themeMode === 'dark' ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-white/95'
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
                }}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition active:scale-95 flex-shrink-0"
                aria-label="Kembali ke daftar surah"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-xs">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-black truncate">
                {selectedSurah ? `${selectedSurah.nomor}. ${selectedSurah.namaLatin}` : "Al-Qur'anul Karim"}
              </h2>
              <p className="text-[11px] text-slate-500 truncate">
                {selectedSurah
                  ? `${selectedSurah.arti} • ${selectedSurah.jumlahAyat} Ayat (${selectedSurah.tempatTurun})`
                  : "Mushaf Kemenag RI • Murottal & Tajwid Berwarna"}
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
                  <span>Loncat Ayat</span>
                </button>

                {/* 2. TOGGLE TAJWID BERWARNA */}
                <button
                  onClick={() => setShowTajweed(!showTajweed)}
                  className={`px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                    showTajweed
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Aktifkan / Nonaktifkan Penanda Warna Tajwid"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tajwid</span>
                </button>

                {/* 3. TEMA SWITCHER (Light, Sepia, Dark) */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl">
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
                    title="Tema Kertas Mushaf (Sepia)"
                  >
                    <Coffee className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`p-1.5 rounded-lg text-xs transition ${
                      themeMode === 'dark' ? 'bg-slate-800 shadow-xs text-amber-400' : 'text-slate-400'
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
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition active:scale-95"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL POPUP: LONCAT KE AYAT */}
        {showJumpModal && selectedSurah && (
          <div className="p-4 bg-amber-50 border-b border-amber-200 animate-in slide-in-from-top duration-200 flex-shrink-0">
            <div className="max-w-md mx-auto space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Loncat ke Ayat dalam Surah {selectedSurah.namaLatin}</span>
                </span>
                <span className="text-[11px] text-amber-700 font-mono font-bold">
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
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
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
                  className="px-3 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Batal
                </button>
              </form>

              {/* Quick shortcut pills */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs text-amber-800">
                <span className="text-[10px] text-amber-700">Pilihan Cepat:</span>
                <button
                  onClick={() => handleJumpToAyat(1)}
                  className="px-2 py-0.5 rounded-lg bg-white border border-amber-200 font-mono hover:bg-amber-100"
                >
                  Ayat 1
                </button>
                {selectedSurah.jumlahAyat > 10 && (
                  <button
                    onClick={() => handleJumpToAyat(10)}
                    className="px-2 py-0.5 rounded-lg bg-white border border-amber-200 font-mono hover:bg-amber-100"
                  >
                    Ayat 10
                  </button>
                )}
                {selectedSurah.jumlahAyat > 50 && (
                  <button
                    onClick={() => handleJumpToAyat(50)}
                    className="px-2 py-0.5 rounded-lg bg-white border border-amber-200 font-mono hover:bg-amber-100"
                  >
                    Ayat 50
                  </button>
                )}
                {selectedSurah.jumlahAyat > 100 && (
                  <button
                    onClick={() => handleJumpToAyat(100)}
                    className="px-2 py-0.5 rounded-lg bg-white border border-amber-200 font-mono hover:bg-amber-100"
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
                  className="px-2 py-0.5 rounded-lg bg-white border border-amber-200 font-mono hover:bg-amber-100"
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
              
              {/* LAST READ CARD (IF AVAILABLE) */}
              {lastRead && (
                <div
                  onClick={() => {
                    const target = SURAH_LIST.find((s) => s.nomor === lastRead.surahNomor);
                    if (target) {
                      handleSelectSurah(target);
                      setTimeout(() => handleJumpToAyat(lastRead.ayatNomor), 600);
                    }
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white cursor-pointer hover:shadow-lg transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-semibold uppercase tracking-wider">
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span>Terakhir Dibaca</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black group-hover:translate-x-0.5 transition-transform">
                      {lastRead.surahNama} • Ayat {lastRead.ayatNomor}
                    </h3>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1">
                    <span>Lanjutkan Baca</span>
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
                    placeholder="Cari surah (misal: Al-Kahfi, Yasin, 18, 36)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Batal
                    </button>
                  )}
                </div>

                {/* CATEGORY TABS */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                  <button
                    onClick={() => setActiveCategory('semua')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                      activeCategory === 'semua'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Semua (114 Surah)
                  </button>
                  <button
                    onClick={() => setActiveCategory('pilihan')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                      activeCategory === 'pilihan'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Surah Pilihan Jamaah</span>
                  </button>
                  <button
                    onClick={() => setActiveCategory('juz_amma')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                      activeCategory === 'juz_amma'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Juz 'Amma (Juz 30)
                  </button>
                </div>
              </div>

              {/* LIST OF SURAH CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                {filteredSurahs.map((surah) => (
                  <button
                    key={surah.nomor}
                    onClick={() => handleSelectSurah(surah)}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between text-left group active:scale-98 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        {surah.nomor}
                      </div>

                      <div className="min-w-0">
                        <strong className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition truncate block">
                          {surah.namaLatin}
                        </strong>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {surah.arti} • {surah.jumlahAyat} Ayat
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 pl-2">
                      <span className="font-arabic text-lg font-bold text-amber-700 tracking-wide block" dir="rtl">
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
                    className="text-xs text-amber-600 font-bold hover:underline"
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

                <div className="pt-1 text-3xl sm:text-4xl font-arabic text-amber-200" dir="rtl">
                  {selectedSurah.nama}
                </div>

                {/* AUDIO CONTROLLER BAR */}
                {surahDetail && surahDetail.audioFull && (
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
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

                    {/* PILIHAN QARI */}
                    <select
                      value={selectedQari}
                      onChange={(e) => setSelectedQari(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold border border-white/30 focus:outline-none cursor-pointer"
                    >
                      {QARI_LIST.map((q) => (
                        <option key={q.id} value={q.id} className="text-slate-900 bg-white">
                          {q.name}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => setAutoNextAyat(!autoNextAyat)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition ${
                        autoNextAyat
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-white/10 text-white border-white/20'
                      }`}
                      title="Lanjutkan audio ayat berikutnya secara otomatis"
                    >
                      {autoNextAyat ? 'Auto-Lanjut: Aktif' : 'Auto-Lanjut: Nonaktif'}
                    </button>
                  </div>
                )}
              </div>

              {/* TOOLBAR KONTROL MEMBACA (UKURAN FONT, MODE BACA, TAJWID, TRANSLASI) */}
              <div className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-2.5 text-xs ${cardThemeClasses}`}>
                {/* Switcher Mode: Ayat vs Mushaf */}
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

                {/* Switcher Ukuran Huruf */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
                  <span className="text-[10px] text-slate-400 px-1 font-bold">Huruf:</span>
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                      fontSize === 'normal' ? 'bg-white shadow-xs text-amber-600 dark:bg-slate-800' : 'text-slate-500'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('medium')}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                      fontSize === 'medium' ? 'bg-white shadow-xs text-amber-600 dark:bg-slate-800' : 'text-slate-500'
                    }`}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                      fontSize === 'large' ? 'bg-white shadow-xs text-amber-600 dark:bg-slate-800' : 'text-slate-500'
                    }`}
                  >
                    A++
                  </button>
                  <button
                    onClick={() => setFontSize('extralarge')}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                      fontSize === 'extralarge' ? 'bg-white shadow-xs text-amber-600 dark:bg-slate-800' : 'text-slate-500'
                    }`}
                  >
                    Max
                  </button>
                </div>

                {/* Toggles Latin & Arti */}
                {readingMode === 'ayat' && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setShowLatin(!showLatin)}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                        showLatin ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      Latin: {showLatin ? 'Ya' : 'Tidak'}
                    </button>
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                        showTranslation ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      Arti: {showTranslation ? 'Ya' : 'Tidak'}
                    </button>
                  </div>
                )}
              </div>

              {/* PANDUAN / LEGENDA WARNA TAJWID (COLLAPSIBLE) */}
              {showTajweed && (
                <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
                  <div
                    onClick={() => setShowTajweedLegend(!showTajweedLegend)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-purple-600" />
                      <span>Panduan Penanda Warna Tajwid (Tahsin)</span>
                    </span>
                    <button className="text-purple-600">
                      {showTajweedLegend ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {showTajweedLegend && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-purple-200/60 text-[11px]">
                      <div className="p-1.5 rounded-xl bg-white border border-purple-100 space-y-0.5">
                        <strong className="text-purple-700 block">🟣 Mad Panjang</strong>
                        <span className="text-[10px] text-slate-500">Panjang 4-6 Harakat</span>
                      </div>
                      <div className="p-1.5 rounded-xl bg-white border border-purple-100 space-y-0.5">
                        <strong className="text-emerald-700 block">🟢 Ghunnah</strong>
                        <span className="text-[10px] text-slate-500">Dengung 2 Harakat (نّ / مّ)</span>
                      </div>
                      <div className="p-1.5 rounded-xl bg-white border border-purple-100 space-y-0.5">
                        <strong className="text-blue-700 block">🔵 Qalqalah</strong>
                        <span className="text-[10px] text-slate-500">Pantulan (ب ج د ط ق Sukun)</span>
                      </div>
                      <div className="p-1.5 rounded-xl bg-white border border-purple-100 space-y-0.5">
                        <strong className="text-amber-700 block">🟠 Ikhfa / Idgham</strong>
                        <span className="text-[10px] text-slate-500">Samar & Lebur Berdengung</span>
                      </div>
                      <div className="p-1.5 rounded-xl bg-white border border-purple-100 space-y-0.5 col-span-2 sm:col-span-1">
                        <strong className="text-teal-700 block">🩵 Iqlab</strong>
                        <span className="text-[10px] text-slate-500">Tanda Mim Kecil ۢ</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* BISMILLAH BANNER (Kecuali Surah At-Taubah, nomor 9) */}
              {selectedSurah.nomor !== 9 && selectedSurah.nomor !== 1 && (
                <div className="text-center py-4 px-2 bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl border border-amber-200/60">
                  <span className="text-2xl sm:text-3xl font-arabic text-amber-800 dark:text-amber-300 tracking-wider" dir="rtl">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </span>
                </div>
              )}

              {/* LOADING STATE */}
              {loadingSurah && (
                <div className="py-16 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Memuat ayat-ayat {selectedSurah.namaLatin}...
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

              {/* RENDERING MODE 1: PER-AYAT VIEW */}
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
                            ? 'ring-4 ring-amber-400 bg-amber-50/90 shadow-xl scale-[1.01]'
                            : isAudioPlaying
                            ? 'ring-2 ring-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20'
                            : isBookmarked
                            ? 'border-emerald-400 bg-emerald-50/30'
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

                          {/* Tombol Aksi Ayat */}
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

                        {/* ARABIC TEXT (DENGAN PENANDA TAJWID / NORMAL) */}
                        <div className="py-4 text-right" dir="rtl">
                          <p className={`font-arabic font-semibold tracking-wide ${arabicFontClass}`}>
                            {showTajweed ? renderTajweedText(ayat.teksArab) : ayat.teksArab}
                          </p>
                        </div>

                        {/* TRANSLITERASI LATIN */}
                        {showLatin && ayat.teksLatin && (
                          <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 italic font-medium pt-1">
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
                      Tampilan Mushaf Madinah • Surah {selectedSurah.namaLatin}
                    </span>
                  </div>

                  <div className="text-right leading-[2.6] sm:leading-[3] tracking-wide font-arabic" dir="rtl">
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
                          <span className={`font-semibold ${arabicFontClass}`}>
                            {showTajweed ? renderTajweedText(ayat.teksArab) : ayat.teksArab}
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
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
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
      </div>
    </div>
  );
}
