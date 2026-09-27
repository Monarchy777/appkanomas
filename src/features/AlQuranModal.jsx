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
  Headphones
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

export default function AlQuranModal({ onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('semua'); // 'semua' | 'juz_amma' | 'pilihan'
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahDetail, setSurahDetail] = useState(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioAyat, setActiveAudioAyat] = useState(null);
  const audioRef = useRef(null);

  // Settings
  const [fontSize, setFontSize] = useState('medium'); // 'normal' | 'medium' | 'large'
  const [showLatin, setShowLatin] = useState(true);
  const [lastRead, setLastRead] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [copiedAyat, setCopiedAyat] = useState(null);

  // Filter surah
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
          // ignore storage quota errors
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

  // Play audio surah or ayat
  const playSurahAudio = (audioUrl, ayatNumber = null) => {
    if (!audioUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (isPlayingAudio && activeAudioAyat === ayatNumber) {
      setIsPlayingAudio(false);
      setActiveAudioAyat(null);
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setActiveAudioAyat(ayatNumber);
    setIsPlayingAudio(true);

    audio.play().catch((err) => {
      console.warn('Audio play error', err);
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

  // Save last read
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

  // Copy Ayat text
  const handleCopyAyat = (surah, ayat) => {
    const text = `Q.S. ${surah.namaLatin}: ${ayat.nomorAyat}\n\n${ayat.teksArab}\n\n"${ayat.teksIndonesia}"\n\n(Aplikasi Kanomas Tour & Travel)`;
    navigator.clipboard?.writeText(text);
    setCopiedAyat(ayat.nomorAyat);
    setTimeout(() => setCopiedAyat(null), 2000);
  };

  // Font size classes
  const arabicFontClass = {
    normal: 'text-2xl sm:text-3xl leading-loose',
    medium: 'text-3xl sm:text-4xl leading-loose',
    large: 'text-4xl sm:text-5xl leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl h-[94vh] sm:h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* TOP HEADER */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {selectedSurah ? (
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.pause();
                  setIsPlayingAudio(false);
                  setActiveAudioAyat(null);
                  setSelectedSurah(null);
                  setSurahDetail(null);
                }}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition active:scale-95 flex-shrink-0"
                aria-label="Kembali ke daftar surah"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-xs">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">
                {selectedSurah ? selectedSurah.namaLatin : "Al-Qur'anul Karim"}
              </h2>
              <p className="text-xs text-slate-500 truncate">
                {selectedSurah
                  ? `${selectedSurah.arti} • ${selectedSurah.jumlahAyat} Ayat (${selectedSurah.tempatTurun})`
                  : "Mushaf Standar Kemenag RI • Murottal Syaikh Misyari Rasyid"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Font Size Switcher (When reading surah) */}
            {selectedSurah && (
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                    fontSize === 'normal' ? 'bg-white shadow-xs text-amber-600' : 'text-slate-500'
                  }`}
                  title="Ukuran teks normal"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('medium')}
                  className={`px-2 py-1 rounded-lg text-sm font-bold transition ${
                    fontSize === 'medium' ? 'bg-white shadow-xs text-amber-600' : 'text-slate-500'
                  }`}
                  title="Ukuran teks sedang"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded-lg text-base font-bold transition ${
                    fontSize === 'large' ? 'bg-white shadow-xs text-amber-600' : 'text-slate-500'
                  }`}
                  title="Ukuran teks besar"
                >
                  A++
                </button>
              </div>
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
                    if (target) handleSelectSurah(target);
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white cursor-pointer hover:shadow-lg transition-all flex items-center justify-between gap-4 group"
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
                    <span>Lanjutkan</span>
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
                    Semua (114)
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
                      {/* Nomor Surah Badge */}
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        {surah.nomor}
                      </div>

                      {/* Info Surah */}
                      <div className="min-w-0">
                        <strong className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition truncate block">
                          {surah.namaLatin}
                        </strong>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {surah.arti} • {surah.jumlahAyat} Ayat
                        </span>
                      </div>
                    </div>

                    {/* Nama Arab */}
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
            <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto">
              {/* SURAH HEADER CARD */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 sm:p-7 shadow-md text-center space-y-3">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white">
                    Surah ke-{selectedSurah.nomor} • {selectedSurah.tempatTurun}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
                    {selectedSurah.namaLatin}
                  </h1>
                  <p className="text-sm text-emerald-100 font-medium">
                    "{selectedSurah.arti}" • {selectedSurah.jumlahAyat} Ayat
                  </p>
                </div>

                <div className="pt-2 text-2xl sm:text-3xl font-arabic text-amber-200" dir="rtl">
                  {selectedSurah.nama}
                </div>

                {/* AUDIO FULL SURAH PLAYER BUTTON */}
                {surahDetail && surahDetail.audioFull && (
                  <div className="pt-3 flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        playSurahAudio(
                          surahDetail.audioFull['05'] || surahDetail.audioFull['01'],
                          'full'
                        )
                      }
                      className="px-4 py-2 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
                    >
                      {isPlayingAudio && activeAudioAyat === 'full' ? (
                        <>
                          <Pause className="w-4 h-4 text-emerald-600" />
                          <span>Hentikan Murottal</span>
                        </>
                      ) : (
                        <>
                          <Headphones className="w-4 h-4 text-emerald-600" />
                          <span>Dengarkan Murottal (Syaikh Al-Afasy)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowLatin(!showLatin)}
                      className={`px-3 py-2 rounded-2xl text-xs font-bold transition ${
                        showLatin ? 'bg-emerald-800/60 text-white' : 'bg-white/20 text-emerald-100'
                      }`}
                      title="Tampilkan / Sembunyikan transliterasi latin"
                    >
                      {showLatin ? 'Latin: Aktif' : 'Latin: Nonaktif'}
                    </button>
                  </div>
                )}
              </div>

              {/* BISMILLAH BANNER (Kecuali Surah At-Taubah, nomor 9) */}
              {selectedSurah.nomor !== 9 && selectedSurah.nomor !== 1 && (
                <div className="text-center py-4 px-2 bg-amber-50/50 rounded-2xl border border-amber-200/60">
                  <span className="text-2xl sm:text-3xl font-arabic text-amber-800 tracking-wider" dir="rtl">
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

              {/* LIST OF VERSES (AYAT) */}
              {surahDetail && surahDetail.ayat && (
                <div className="space-y-4">
                  {surahDetail.ayat.map((ayat) => {
                    const isAudioPlaying = isPlayingAudio && activeAudioAyat === ayat.nomorAyat;
                    const isBookmarked =
                      lastRead &&
                      lastRead.surahNomor === selectedSurah.nomor &&
                      lastRead.ayatNomor === ayat.nomorAyat;

                    return (
                      <div
                        key={ayat.nomorAyat}
                        id={`ayat-${ayat.nomorAyat}`}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          isAudioPlaying
                            ? 'bg-amber-50/70 border-amber-400 shadow-sm'
                            : isBookmarked
                            ? 'bg-emerald-50/60 border-emerald-300'
                            : 'bg-white border-slate-200/90 hover:border-slate-300'
                        }`}
                      >
                        {/* HEADER BAR AYAT: NOMOR & ACTION BUTTONS */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          {/* Ayat Badge */}
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-amber-100/80 border border-amber-300 text-amber-800 font-black text-xs flex items-center justify-center font-mono">
                              {ayat.nomorAyat}
                            </span>
                            {isBookmarked && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Bookmark className="w-3 h-3 fill-current" />
                                <span>Terakhir Dibaca</span>
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1">
                            {/* Play Audio Ayat */}
                            {ayat.audio && (
                              <button
                                onClick={() =>
                                  playSurahAudio(
                                    ayat.audio['05'] || ayat.audio['01'],
                                    ayat.nomorAyat
                                  )
                                }
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition active:scale-95 ${
                                  isAudioPlaying
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                }`}
                                title="Putar audio ayat ini"
                              >
                                {isAudioPlaying ? (
                                  <Pause className="w-3.5 h-3.5" />
                                ) : (
                                  <Play className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}

                            {/* Bookmark */}
                            <button
                              onClick={() => handleSaveLastRead(selectedSurah, ayat)}
                              className={`w-8 h-8 rounded-xl flex items-center justify-center transition active:scale-95 ${
                                isBookmarked
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                              }`}
                              title="Tandai terakhir dibaca"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>

                            {/* Copy Ayat */}
                            <button
                              onClick={() => handleCopyAyat(selectedSurah, ayat)}
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition active:scale-95"
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

                        {/* ARABIC TEXT */}
                        <div className="py-4 text-right" dir="rtl">
                          <p className={`font-arabic text-slate-900 font-semibold tracking-wide ${arabicFontClass}`}>
                            {ayat.teksArab}
                          </p>
                        </div>

                        {/* TRANSLITERASI LATIN */}
                        {showLatin && ayat.teksLatin && (
                          <p className="text-xs sm:text-sm text-amber-700 italic font-medium pt-1">
                            {ayat.teksLatin}
                          </p>
                        )}

                        {/* INDONESIAN TRANSLATION */}
                        <p className="text-xs sm:text-sm text-slate-700 pt-2 leading-relaxed font-normal">
                          {ayat.teksIndonesia}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* NAVIGATION PREVIOUS / NEXT SURAH */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                {selectedSurah.nomor > 1 ? (
                  <button
                    onClick={() => {
                      const prev = SURAH_LIST.find((s) => s.nomor === selectedSurah.nomor - 1);
                      if (prev) handleSelectSurah(prev);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
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
