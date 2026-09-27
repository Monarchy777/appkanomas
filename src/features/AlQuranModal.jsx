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
  Info,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';

// DAFTAR 114 SURAH LENGKAP DENGAN METADATA RESMI (WAHYU, JUZ, HALAMAN)
export const SURAH_LIST = [
  { nomor: 1, nama: "الفاتحة", namaLatin: "Al-Fatihah", arti: "Pembukaan", jumlahAyat: 7, tempatTurun: "Mekah", wahyu: 5, juz: 1, hal: 1 },
  { nomor: 2, nama: "البقرة", namaLatin: "Al-Baqarah", arti: "Sapi Betina", jumlahAyat: 286, tempatTurun: "Madinah", wahyu: 87, juz: 1, hal: 2 },
  { nomor: 3, nama: "آل عمران", namaLatin: "Ali 'Imran", arti: "Keluarga Imran", jumlahAyat: 200, tempatTurun: "Madinah", wahyu: 89, juz: 3, hal: 50 },
  { nomor: 4, nama: "النساء", namaLatin: "An-Nisa'", arti: "Wanita", jumlahAyat: 176, tempatTurun: "Madinah", wahyu: 92, juz: 4, hal: 77 },
  { nomor: 5, nama: "المائدة", namaLatin: "Al-Ma'idah", arti: "Hidangan", jumlahAyat: 120, tempatTurun: "Madinah", wahyu: 112, juz: 6, hal: 106 },
  { nomor: 6, nama: "الانعام", namaLatin: "Al-An'am", arti: "Binatang Ternak", jumlahAyat: 165, tempatTurun: "Mekah", wahyu: 55, juz: 7, hal: 128 },
  { nomor: 7, nama: "الاعراف", namaLatin: "Al-A'raf", arti: "Tempat Tertinggi", jumlahAyat: 206, tempatTurun: "Mekah", wahyu: 39, juz: 8, hal: 151 },
  { nomor: 8, nama: "الانفal", namaLatin: "Al-Anfal", arti: "Rampasan Perang", jumlahAyat: 75, tempatTurun: "Madinah", wahyu: 88, juz: 9, hal: 177 },
  { nomor: 9, nama: "التوبة", namaLatin: "At-Taubah", arti: "Pengampunan", jumlahAyat: 129, tempatTurun: "Madinah", wahyu: 113, juz: 10, hal: 187 },
  { nomor: 10, nama: "يونس", namaLatin: "Yunus", arti: "Nabi Yunus", jumlahAyat: 109, tempatTurun: "Mekah", wahyu: 51, juz: 11, hal: 208 },
  { nomor: 11, nama: "هود", namaLatin: "Hud", arti: "Nabi Hud", jumlahAyat: 123, tempatTurun: "Mekah", wahyu: 52, juz: 11, hal: 221 },
  { nomor: 12, nama: "يوسف", namaLatin: "Yusuf", arti: "Nabi Yusuf", jumlahAyat: 111, tempatTurun: "Mekah", wahyu: 53, juz: 12, hal: 235 },
  { nomor: 13, nama: "الرعد", namaLatin: "Ar-Ra'd", arti: "Guruh (petir)", jumlahAyat: 43, tempatTurun: "Madinah", wahyu: 96, juz: 13, hal: 249 },
  { nomor: 14, nama: "ابراهيم", namaLatin: "Ibrahim", arti: "Nabi Ibrahim", jumlahAyat: 52, tempatTurun: "Mekah", wahyu: 72, juz: 13, hal: 255 },
  { nomor: 15, nama: "الحجر", namaLatin: "Al-Hijr", arti: "Gunung Al-Hijr", jumlahAyat: 99, tempatTurun: "Mekah", wahyu: 54, juz: 14, hal: 262 },
  { nomor: 16, nama: "النحل", namaLatin: "An-Nahl", arti: "Lebah", jumlahAyat: 128, tempatTurun: "Mekah", wahyu: 70, juz: 14, hal: 267 },
  { nomor: 17, nama: "الاسراء", namaLatin: "Al-Isra'", arti: "Memperjalankan Malam", jumlahAyat: 111, tempatTurun: "Mekah", wahyu: 50, juz: 15, hal: 282 },
  { nomor: 18, nama: "الكهف", namaLatin: "Al-Kahf", arti: "Gua", jumlahAyat: 110, tempatTurun: "Mekah", wahyu: 69, juz: 15, hal: 293 },
  { nomor: 19, nama: "مريم", namaLatin: "Maryam", arti: "Maryam", jumlahAyat: 98, tempatTurun: "Mekah", wahyu: 44, juz: 16, hal: 305 },
  { nomor: 20, nama: "طه", namaLatin: "Taha", arti: "Taha", jumlahAyat: 135, tempatTurun: "Mekah", wahyu: 45, juz: 16, hal: 312 },
  { nomor: 21, nama: "الانبياء", namaLatin: "Al-Anbiya'", arti: "Para Nabi", jumlahAyat: 112, tempatTurun: "Mekah", wahyu: 73, juz: 17, hal: 322 },
  { nomor: 22, nama: "الحج", namaLatin: "Al-Hajj", arti: "Haji", jumlahAyat: 78, tempatTurun: "Madinah", wahyu: 103, juz: 17, hal: 332 },
  { nomor: 23, nama: "المؤمنون", namaLatin: "Al-Mu'minun", arti: "Orang Beriman", jumlahAyat: 118, tempatTurun: "Mekah", wahyu: 74, juz: 18, hal: 342 },
  { nomor: 24, nama: "النور", namaLatin: "An-Nur", arti: "Cahaya", jumlahAyat: 64, tempatTurun: "Madinah", wahyu: 102, juz: 18, hal: 350 },
  { nomor: 25, nama: "الفرقان", namaLatin: "Al-Furqan", arti: "Pembeda", jumlahAyat: 77, tempatTurun: "Mekah", wahyu: 42, juz: 18, hal: 359 },
  { nomor: 26, nama: "الشعراء", namaLatin: "Asy-Syu'ara'", arti: "Penyair", jumlahAyat: 227, tempatTurun: "Mekah", wahyu: 47, juz: 19, hal: 367 },
  { nomor: 27, nama: "النمل", namaLatin: "An-Naml", arti: "Semut", jumlahAyat: 93, tempatTurun: "Mekah", wahyu: 48, juz: 19, hal: 377 },
  { nomor: 28, nama: "القصص", namaLatin: "Al-Qasas", arti: "Kisah-Kisah", jumlahAyat: 88, tempatTurun: "Mekah", wahyu: 49, juz: 20, hal: 385 },
  { nomor: 29, nama: "العنكبوت", namaLatin: "Al-'Ankabut", arti: "Laba-Laba", jumlahAyat: 69, tempatTurun: "Mekah", wahyu: 85, juz: 20, hal: 396 },
  { nomor: 30, nama: "الروم", namaLatin: "Ar-Rum", arti: "Bangsa Romawi", jumlahAyat: 60, tempatTurun: "Mekah", wahyu: 84, juz: 21, hal: 404 },
  { nomor: 31, nama: "لقمان", namaLatin: "Luqman", arti: "Keluarga Luqman", jumlahAyat: 34, tempatTurun: "Mekah", wahyu: 57, juz: 21, hal: 411 },
  { nomor: 32, nama: "السجدة", namaLatin: "As-Sajdah", arti: "Sujud", jumlahAyat: 30, tempatTurun: "Mekah", wahyu: 75, juz: 21, hal: 415 },
  { nomor: 33, nama: "الاحزاب", namaLatin: "Al-Ahzab", arti: "Golongan Bersekutu", jumlahAyat: 73, tempatTurun: "Madinah", wahyu: 90, juz: 21, hal: 418 },
  { nomor: 34, nama: "سبأ", namaLatin: "Saba'", arti: "Kaum Saba'", jumlahAyat: 54, tempatTurun: "Mekah", wahyu: 58, juz: 22, hal: 428 },
  { nomor: 35, nama: "فاطر", namaLatin: "Fatir", arti: "Pencipta", jumlahAyat: 45, tempatTurun: "Mekah", wahyu: 43, juz: 22, hal: 434 },
  { nomor: 36, nama: "يس", namaLatin: "Yasin", arti: "Yasin", jumlahAyat: 83, tempatTurun: "Mekah", wahyu: 41, juz: 22, hal: 440 },
  { nomor: 37, nama: "الصافات", namaLatin: "As-Saffat", arti: "Barisan-Barisan", jumlahAyat: 182, tempatTurun: "Mekah", wahyu: 56, juz: 23, hal: 446 },
  { nomor: 38, nama: "ص", namaLatin: "Sad", arti: "Shad", jumlahAyat: 88, tempatTurun: "Mekah", wahyu: 38, juz: 23, hal: 453 },
  { nomor: 39, nama: "الزمر", namaLatin: "Az-Zumar", arti: "Rombongan", jumlahAyat: 75, tempatTurun: "Mekah", wahyu: 59, juz: 23, hal: 458 },
  { nomor: 40, nama: "غافر", namaLatin: "Ghafir", arti: "Yang Mengampuni", jumlahAyat: 85, tempatTurun: "Mekah", wahyu: 60, juz: 24, hal: 467 },
  { nomor: 41, nama: "فصلت", namaLatin: "Fussilat", arti: "Dijelaskan", jumlahAyat: 54, tempatTurun: "Mekah", wahyu: 61, juz: 24, hal: 477 },
  { nomor: 42, nama: "الشورى", namaLatin: "Asy-Syura", arti: "Musyawarah", jumlahAyat: 53, tempatTurun: "Mekah", wahyu: 62, juz: 25, hal: 483 },
  { nomor: 43, nama: "الزخرف", namaLatin: "Az-Zukhruf", arti: "Perhiasan Emas", jumlahAyat: 89, tempatTurun: "Mekah", wahyu: 63, juz: 25, hal: 489 },
  { nomor: 44, nama: "الدخان", namaLatin: "Ad-Dukhan", arti: "Kabut Asap", jumlahAyat: 59, tempatTurun: "Mekah", wahyu: 64, juz: 25, hal: 496 },
  { nomor: 45, nama: "الجاثية", namaLatin: "Al-Jasiyah", arti: "Yang Berlutut", jumlahAyat: 37, tempatTurun: "Mekah", wahyu: 65, juz: 25, hal: 499 },
  { nomor: 46, nama: "الاحقاف", namaLatin: "Al-Ahqaf", arti: "Bukit Pasir", jumlahAyat: 35, tempatTurun: "Mekah", wahyu: 66, juz: 26, hal: 502 },
  { nomor: 47, nama: "محمد", namaLatin: "Muhammad", arti: "Nabi Muhammad", jumlahAyat: 38, tempatTurun: "Madinah", wahyu: 95, juz: 26, hal: 507 },
  { nomor: 48, nama: "الفتح", namaLatin: "Al-Fath", arti: "Kemenangan", jumlahAyat: 29, tempatTurun: "Madinah", wahyu: 111, juz: 26, hal: 511 },
  { nomor: 49, nama: "الحجرات", namaLatin: "Al-Hujurat", arti: "Kamar-Kamar", jumlahAyat: 18, tempatTurun: "Madinah", wahyu: 106, juz: 26, hal: 515 },
  { nomor: 50, nama: "ق", namaLatin: "Qaf", arti: "Qaf", jumlahAyat: 45, tempatTurun: "Mekah", wahyu: 34, juz: 26, hal: 518 },
  { nomor: 51, nama: "الذاريات", namaLatin: "Az-Zariyat", arti: "Angin Menerbangkan", jumlahAyat: 60, tempatTurun: "Mekah", wahyu: 67, juz: 26, hal: 520 },
  { nomor: 52, nama: "الطور", namaLatin: "At-Tur", arti: "Bukit Tursina", jumlahAyat: 49, tempatTurun: "Mekah", wahyu: 76, juz: 27, hal: 523 },
  { nomor: 53, nama: "النجم", namaLatin: "An-Najm", arti: "Bintang", jumlahAyat: 62, tempatTurun: "Mekah", wahyu: 23, juz: 27, hal: 526 },
  { nomor: 54, nama: "القمر", namaLatin: "Al-Qamar", arti: "Bulan", jumlahAyat: 55, tempatTurun: "Mekah", wahyu: 37, juz: 27, hal: 528 },
  { nomor: 55, nama: "الرحمن", namaLatin: "Ar-Rahman", arti: "Maha Pengasih", jumlahAyat: 78, tempatTurun: "Madinah", wahyu: 97, juz: 27, hal: 531 },
  { nomor: 56, nama: "الواقعة", namaLatin: "Al-Waqi'ah", arti: "Hari Kiamat", jumlahAyat: 96, tempatTurun: "Mekah", wahyu: 46, juz: 27, hal: 534 },
  { nomor: 57, nama: "الحديد", namaLatin: "Al-Hadid", arti: "Besi", jumlahAyat: 29, tempatTurun: "Madinah", wahyu: 94, juz: 27, hal: 537 },
  { nomor: 58, nama: "المجادلة", namaLatin: "Al-Mujadilah", arti: "Gugatan", jumlahAyat: 22, tempatTurun: "Madinah", wahyu: 105, juz: 28, hal: 542 },
  { nomor: 59, nama: "الحشر", namaLatin: "Al-Hasyr", arti: "Pengusiran", jumlahAyat: 24, tempatTurun: "Madinah", wahyu: 101, juz: 28, hal: 545 },
  { nomor: 60, nama: "الممتحنة", namaLatin: "Al-Mumtahanah", arti: "Wanita Teruji", jumlahAyat: 13, tempatTurun: "Madinah", wahyu: 91, juz: 28, hal: 549 },
  { nomor: 61, nama: "الصف", namaLatin: "As-Saff", arti: "Barisan", jumlahAyat: 14, tempatTurun: "Madinah", wahyu: 109, juz: 28, hal: 551 },
  { nomor: 62, nama: "الجمعة", namaLatin: "Al-Jumu'ah", arti: "Hari Jumat", jumlahAyat: 11, tempatTurun: "Madinah", wahyu: 110, juz: 28, hal: 553 },
  { nomor: 63, nama: "المنافقون", namaLatin: "Al-Munafiqun", arti: "Kaum Munafik", jumlahAyat: 11, tempatTurun: "Madinah", wahyu: 104, juz: 28, hal: 554 },
  { nomor: 64, nama: "التغابن", namaLatin: "At-Tagabun", arti: "Hari Pengungkapan", jumlahAyat: 18, tempatTurun: "Madinah", wahyu: 108, juz: 28, hal: 556 },
  { nomor: 65, nama: "الطلاق", namaLatin: "At-Talaq", arti: "Perceraian", jumlahAyat: 12, tempatTurun: "Madinah", wahyu: 99, juz: 28, hal: 558 },
  { nomor: 66, nama: "التحريم", namaLatin: "At-Tahrim", arti: "Pengharaman", jumlahAyat: 12, tempatTurun: "Madinah", wahyu: 107, juz: 28, hal: 560 },
  { nomor: 67, nama: "الملك", namaLatin: "Al-Mulk", arti: "Kerajaan", jumlahAyat: 30, tempatTurun: "Mekah", wahyu: 77, juz: 29, hal: 562 },
  { nomor: 68, nama: "القلم", namaLatin: "Al-Qalam", arti: "Pena", jumlahAyat: 52, tempatTurun: "Mekah", wahyu: 2, juz: 29, hal: 564 },
  { nomor: 69, nama: "الحاقة", namaLatin: "Al-Haqqah", arti: "Hari Pasti", jumlahAyat: 52, tempatTurun: "Mekah", wahyu: 78, juz: 29, hal: 566 },
  { nomor: 70, nama: "المعارج", namaLatin: "Al-Ma'arij", arti: "Tempat Naik", jumlahAyat: 44, tempatTurun: "Mekah", wahyu: 79, juz: 29, hal: 568 },
  { nomor: 71, nama: "نوح", namaLatin: "Nuh", arti: "Nabi Nuh", jumlahAyat: 28, tempatTurun: "Mekah", wahyu: 71, juz: 29, hal: 570 },
  { nomor: 72, nama: "الجن", namaLatin: "Al-Jinn", arti: "Jin", jumlahAyat: 28, tempatTurun: "Mekah", wahyu: 40, juz: 29, hal: 572 },
  { nomor: 73, nama: "المزمل", namaLatin: "Al-Muzzammil", arti: "Orang Berselimut", jumlahAyat: 20, tempatTurun: "Mekah", wahyu: 3, juz: 29, hal: 574 },
  { nomor: 74, nama: "المدثر", namaLatin: "Al-Muddassir", arti: "Orang Berkemul", jumlahAyat: 56, tempatTurun: "Mekah", wahyu: 4, juz: 29, hal: 575 },
  { nomor: 75, nama: "القيامة", namaLatin: "Al-Qiyamah", arti: "Hari Kiamat", jumlahAyat: 40, tempatTurun: "Mekah", wahyu: 31, juz: 29, hal: 577 },
  { nomor: 76, nama: "الانسان", namaLatin: "Al-Insan", arti: "Manusia", jumlahAyat: 31, tempatTurun: "Madinah", wahyu: 98, juz: 29, hal: 578 },
  { nomor: 77, nama: "المرسلات", namaLatin: "Al-Mursalat", arti: "Malaikat Dikirim", jumlahAyat: 50, tempatTurun: "Mekah", wahyu: 33, juz: 29, hal: 580 },
  { nomor: 78, nama: "النبأ", namaLatin: "An-Naba'", arti: "Berita Besar", jumlahAyat: 40, tempatTurun: "Mekah", wahyu: 80, juz: 30, hal: 582 },
  { nomor: 79, nama: "النازعات", namaLatin: "An-Nazi'at", arti: "Malaikat Pencabut", jumlahAyat: 46, tempatTurun: "Mekah", wahyu: 81, juz: 30, hal: 583 },
  { nomor: 80, nama: "عبس", namaLatin: "'Abasa", arti: "Ia Bermuka Masam", jumlahAyat: 42, tempatTurun: "Mekah", wahyu: 24, juz: 30, hal: 585 },
  { nomor: 81, nama: "التكوير", namaLatin: "At-Takwir", arti: "Menggulung", jumlahAyat: 29, tempatTurun: "Mekah", wahyu: 7, juz: 30, hal: 586 },
  { nomor: 82, nama: "الانفطار", namaLatin: "Al-Infitar", arti: "Terbelah", jumlahAyat: 19, tempatTurun: "Mekah", wahyu: 82, juz: 30, hal: 587 },
  { nomor: 83, nama: "المطففين", namaLatin: "Al-Mutaffifin", arti: "Orang Curang", jumlahAyat: 36, tempatTurun: "Mekah", wahyu: 86, juz: 30, hal: 587 },
  { nomor: 84, nama: "الانشقاق", namaLatin: "Al-Insyiqaq", arti: "Terbelah", jumlahAyat: 25, tempatTurun: "Mekah", wahyu: 83, juz: 30, hal: 589 },
  { nomor: 85, nama: "البروج", namaLatin: "Al-Buruj", arti: "Gugusan Bintang", jumlahAyat: 22, tempatTurun: "Mekah", wahyu: 27, juz: 30, hal: 590 },
  { nomor: 86, nama: "الطارق", namaLatin: "At-Tariq", arti: "Yang Datang Malam", jumlahAyat: 17, tempatTurun: "Mekah", wahyu: 36, juz: 30, hal: 591 },
  { nomor: 87, nama: "الاعلى", namaLatin: "Al-A'la", arti: "Maha Tinggi", jumlahAyat: 19, tempatTurun: "Mekah", wahyu: 8, juz: 30, hal: 591 },
  { nomor: 88, nama: "الغاشية", namaLatin: "Al-Ghasyiyah", arti: "Hari Pembalasan", jumlahAyat: 26, tempatTurun: "Mekah", wahyu: 68, juz: 30, hal: 592 },
  { nomor: 89, nama: "الفجر", namaLatin: "Al-Fajr", arti: "Fajar", jumlahAyat: 30, tempatTurun: "Mekah", wahyu: 10, juz: 30, hal: 593 },
  { nomor: 90, nama: "البلد", namaLatin: "Al-Balad", arti: "Negeri", jumlahAyat: 20, tempatTurun: "Mekah", wahyu: 35, juz: 30, hal: 594 },
  { nomor: 91, nama: "الشمس", namaLatin: "Asy-Syams", arti: "Matahari", jumlahAyat: 15, tempatTurun: "Mekah", wahyu: 26, juz: 30, hal: 595 },
  { nomor: 92, nama: "الليل", namaLatin: "Al-Lail", arti: "Malam", jumlahAyat: 21, tempatTurun: "Mekah", wahyu: 9, juz: 30, hal: 595 },
  { nomor: 93, nama: "الضحى", namaLatin: "Ad-Duha", arti: "Waktu Duha", jumlahAyat: 11, tempatTurun: "Mekah", wahyu: 11, juz: 30, hal: 596 },
  { nomor: 94, nama: "الشرح", namaLatin: "Asy-Syarh", arti: "Kelapangan Dada", jumlahAyat: 8, tempatTurun: "Mekah", wahyu: 12, juz: 30, hal: 596 },
  { nomor: 95, nama: "التين", namaLatin: "At-Tin", arti: "Buah Tin", jumlahAyat: 8, tempatTurun: "Mekah", wahyu: 28, juz: 30, hal: 597 },
  { nomor: 96, nama: "العلق", namaLatin: "Al-'Alaq", arti: "Segumpal Darah", jumlahAyat: 19, tempatTurun: "Mekah", wahyu: 1, juz: 30, hal: 597 },
  { nomor: 97, nama: "القدر", namaLatin: "Al-Qadr", arti: "Kemuliaan", jumlahAyat: 5, tempatTurun: "Mekah", wahyu: 25, juz: 30, hal: 598 },
  { nomor: 98, nama: "البينة", namaLatin: "Al-Bayyinah", arti: "Bukti Nyata", jumlahAyat: 8, tempatTurun: "Madinah", wahyu: 100, juz: 30, hal: 598 },
  { nomor: 99, nama: "الزلزلة", namaLatin: "Az-Zalzalah", arti: "Keguncangan", jumlahAyat: 8, tempatTurun: "Madinah", wahyu: 93, juz: 30, hal: 599 },
  { nomor: 100, nama: "العاديات", namaLatin: "Al-'Adiyat", arti: "Kuda Perang", jumlahAyat: 11, tempatTurun: "Mekah", wahyu: 14, juz: 30, hal: 599 },
  { nomor: 101, nama: "القارعة", namaLatin: "Al-Qari'ah", arti: "Hari Kiamat", jumlahAyat: 11, tempatTurun: "Mekah", wahyu: 30, juz: 30, hal: 600 },
  { nomor: 102, nama: "التكاثر", namaLatin: "At-Takasur", arti: "Bermegah-Megahan", jumlahAyat: 8, tempatTurun: "Mekah", wahyu: 16, juz: 30, hal: 600 },
  { nomor: 103, nama: "العصر", namaLatin: "Al-'Asr", arti: "Masa / Waktu", jumlahAyat: 3, tempatTurun: "Mekah", wahyu: 13, juz: 30, hal: 601 },
  { nomor: 104, nama: "الهمزة", namaLatin: "Al-Humazah", arti: "Pengumpat", jumlahAyat: 9, tempatTurun: "Mekah", wahyu: 32, juz: 30, hal: 601 },
  { nomor: 105, nama: "الفيل", namaLatin: "Al-Fil", arti: "Gajah", jumlahAyat: 5, tempatTurun: "Mekah", wahyu: 19, juz: 30, hal: 601 },
  { nomor: 106, nama: "قريش", namaLatin: "Quraisy", arti: "Suku Quraisy", jumlahAyat: 4, tempatTurun: "Mekah", wahyu: 29, juz: 30, hal: 602 },
  { nomor: 107, nama: "الماعون", namaLatin: "Al-Ma'un", arti: "Barang Berguna", jumlahAyat: 7, tempatTurun: "Mekah", wahyu: 17, juz: 30, hal: 602 },
  { nomor: 108, nama: "الكوثر", namaLatin: "Al-Kausar", arti: "Nikmat Berlimpah", jumlahAyat: 3, tempatTurun: "Mekah", wahyu: 15, juz: 30, hal: 602 },
  { nomor: 109, nama: "الكافرون", namaLatin: "Al-Kafirun", arti: "Orang Kafir", jumlahAyat: 6, tempatTurun: "Mekah", wahyu: 18, juz: 30, hal: 603 },
  { nomor: 110, nama: "النصر", namaLatin: "An-Nasr", arti: "Pertolongan", jumlahAyat: 3, tempatTurun: "Madinah", wahyu: 114, juz: 30, hal: 603 },
  { nomor: 111, nama: "اللهب", namaLatin: "Al-Lahab", arti: "Gejolak Api", jumlahAyat: 5, tempatTurun: "Mekah", wahyu: 6, juz: 30, hal: 603 },
  { nomor: 112, nama: "الاخلاص", namaLatin: "Al-Ikhlas", arti: "Keesaan Allah", jumlahAyat: 4, tempatTurun: "Mekah", wahyu: 22, juz: 30, hal: 604 },
  { nomor: 113, nama: "الفلق", namaLatin: "Al-Falaq", arti: "Waktu Subuh", jumlahAyat: 5, tempatTurun: "Madinah", wahyu: 20, juz: 30, hal: 604 },
  { nomor: 114, nama: "الناس", namaLatin: "An-Nas", arti: "Manusia", jumlahAyat: 6, tempatTurun: "Madinah", wahyu: 21, juz: 30, hal: 604 }
];

// DAFTAR QARI PILIHAN INTERNASIONAL
const QARI_LIST = [
  { id: '05', name: 'Syaikh Misyari Rasyid Al-Afasy' },
  { id: '03', name: 'Syaikh Abdurrahman As-Sudais (Imam Ka’bah)' },
  { id: '01', name: 'Syaikh Abdullah Al-Juhany (Imam Haram)' },
  { id: '06', name: 'Syaikh Yasser Al-Dosari' }
];

// PALET 4 TEMA PEMBACAAN DENGAN KONTRAS TINGGI TERJAMIN
// 1. Mushaf Hijau (#d5f5d8) - Persis Screenshot User 1 & 2
// 2. Terang (#ffffff)
// 3. Gelap (#09111c) - Teks Putih & Mint Terang, Tidak Akan Hilang/Gelap!
// 4. Sepia (#fbf6ea) - Nuansa Kertas Mushaf Klasik
// PALET TEMA & BACKGROUND PEMBACAAN (FOTO ASLI KA'BAH, PEMANDANGAN ALAM, ATAU WARNA POLOS AKSEN)
export const THEME_PALETTES = {
  mushaf: {
    id: 'mushaf',
    name: 'Mushaf Hijau',
    type: 'color',
    bg: '#d5f5d8',
    arabicColor: '#000000',
    latinColor: '#064e3b',
    translationColor: '#0f172a',
    subHeaderBg: 'bg-white/95 text-slate-900 border-emerald-900/10',
    bismillahColor: '#065f46',
    borderDivider: '#a7f3d0',
    highlightBg: 'bg-emerald-200/70 ring-2 ring-emerald-600',
    activeAudioBg: 'bg-emerald-200/60 ring-2 ring-emerald-500',
    isDark: false
  },
  light: {
    id: 'light',
    name: 'Putih Bersih',
    type: 'color',
    bg: '#ffffff',
    arabicColor: '#000000',
    latinColor: '#047857',
    translationColor: '#1e293b',
    subHeaderBg: 'bg-slate-50 text-slate-900 border-slate-200',
    bismillahColor: '#0f172a',
    borderDivider: '#e2e8f0',
    highlightBg: 'bg-amber-100 ring-2 ring-amber-400',
    activeAudioBg: 'bg-emerald-50 ring-2 ring-emerald-500',
    isDark: false
  },
  dark: {
    id: 'dark',
    name: 'Hitam Gelap',
    type: 'color',
    bg: '#09111c',
    arabicColor: '#ffffff',
    latinColor: '#86efac',
    translationColor: '#f1f5f9',
    subHeaderBg: 'bg-[#131f33] text-white border-slate-800',
    bismillahColor: '#34d399',
    borderDivider: '#1e293b',
    highlightBg: 'bg-emerald-950/80 ring-2 ring-amber-400',
    activeAudioBg: 'bg-emerald-900/50 ring-2 ring-emerald-400',
    isDark: true
  },
  sepia: {
    id: 'sepia',
    name: 'Kertas Sepia',
    type: 'color',
    bg: '#fbf6ea',
    arabicColor: '#1c1917',
    latinColor: '#854d0e',
    translationColor: '#292524',
    subHeaderBg: 'bg-[#f4ebd7] text-amber-950 border-amber-200',
    bismillahColor: '#78350f',
    borderDivider: '#fde68a',
    highlightBg: 'bg-amber-200/50 ring-2 ring-amber-500',
    activeAudioBg: 'bg-emerald-100/50 ring-2 ring-emerald-600',
    isDark: false
  },
  navy: {
    id: 'navy',
    name: 'Biru Malam',
    type: 'color',
    bg: '#071b2f',
    arabicColor: '#ffffff',
    latinColor: '#7dd3fc',
    translationColor: '#e0f2fe',
    subHeaderBg: 'bg-[#0c2946] text-white border-sky-900',
    bismillahColor: '#38bdf8',
    borderDivider: '#0e3a60',
    highlightBg: 'bg-sky-950/80 ring-2 ring-amber-400',
    activeAudioBg: 'bg-sky-900/50 ring-2 ring-sky-400',
    isDark: true
  },
  kabah: {
    id: 'kabah',
    name: 'Ka’bah Asli',
    type: 'image',
    imageSrc: '/assets/bg-kabah.jpg',
    overlay: 'bg-black/80 backdrop-blur-[1px]',
    bg: '#0a0d14',
    arabicColor: '#ffffff',
    latinColor: '#fde047',
    translationColor: '#f8fafc',
    subHeaderBg: 'bg-black/90 text-white border-amber-500/40',
    bismillahColor: '#fbbf24',
    borderDivider: '#334155',
    highlightBg: 'bg-amber-950/80 ring-2 ring-amber-400',
    activeAudioBg: 'bg-emerald-950/80 ring-2 ring-emerald-400',
    isDark: true
  },
  nature: {
    id: 'nature',
    name: 'Pemandangan Asli',
    type: 'image',
    imageSrc: '/assets/bg-nature.jpg',
    overlay: 'bg-slate-950/80 backdrop-blur-[1px]',
    bg: '#0a1610',
    arabicColor: '#ffffff',
    latinColor: '#86efac',
    translationColor: '#f8fafc',
    subHeaderBg: 'bg-emerald-950/90 text-white border-emerald-500/40',
    bismillahColor: '#4ade80',
    borderDivider: '#1e3a2f',
    highlightBg: 'bg-emerald-900/80 ring-2 ring-emerald-400',
    activeAudioBg: 'bg-teal-900/80 ring-2 ring-teal-400',
    isDark: true
  }
};

// ATURAN WARNA TAJWID DENGAN KONTRAS TINGGI UNTUK SETIAP DARI 7 TEMA
export const TAJWEED_THEME_RULES = {
  mushaf: {
    ghunnah: '#e11d48',
    qalqalah: '#0284c7',
    iqlab: '#7c3aed',
    ikhfa: '#065f46',
    madd: '#b45309',
    maddLazim: '#dc2626',
    idghamBila: '#dc2626',
    base: '#000000'
  },
  light: {
    ghunnah: '#e11d48',
    qalqalah: '#0284c7',
    iqlab: '#7c3aed',
    ikhfa: '#059669',
    madd: '#d97706',
    maddLazim: '#dc2626',
    idghamBila: '#dc2626',
    base: '#000000'
  },
  dark: {
    ghunnah: '#fb7185',
    qalqalah: '#38bdf8',
    iqlab: '#c084fc',
    ikhfa: '#34d399',
    madd: '#fbbf24',
    maddLazim: '#f87171',
    idghamBila: '#f87171',
    base: '#ffffff'
  },
  sepia: {
    ghunnah: '#be123c',
    qalqalah: '#0369a1',
    iqlab: '#6d28d9',
    ikhfa: '#15803d',
    madd: '#b45309',
    maddLazim: '#b91c1c',
    idghamBila: '#b91c1c',
    base: '#1c1917'
  },
  navy: {
    ghunnah: '#fb7185',
    qalqalah: '#38bdf8',
    iqlab: '#c084fc',
    ikhfa: '#34d399',
    madd: '#fbbf24',
    maddLazim: '#f87171',
    idghamBila: '#f87171',
    base: '#ffffff'
  },
  kabah: {
    ghunnah: '#fb7185',
    qalqalah: '#38bdf8',
    iqlab: '#c084fc',
    ikhfa: '#34d399',
    madd: '#fbbf24',
    maddLazim: '#f87171',
    idghamBila: '#f87171',
    base: '#ffffff'
  },
  nature: {
    ghunnah: '#fb7185',
    qalqalah: '#38bdf8',
    iqlab: '#c084fc',
    ikhfa: '#34d399',
    madd: '#fbbf24',
    maddLazim: '#f87171',
    idghamBila: '#f87171',
    base: '#ffffff'
  }
};

// HITUNG NOMOR HALAMAN STANDAR MUSHAF MADINAH (1 - 604)
export function getAyatPageNumber(surahNomor, ayatNomor) {
  const surah = SURAH_LIST.find((s) => s.nomor === surahNomor);
  if (!surah) return 1;
  const nextSurah = SURAH_LIST.find((s) => s.nomor === surahNomor + 1);
  const nextHal = nextSurah ? nextSurah.hal : 605;
  const totalPages = Math.max(1, nextHal - surah.hal);

  if (totalPages <= 1) {
    return surah.hal;
  }
  const pageOffset = Math.floor(((ayatNomor - 1) / surah.jumlahAyat) * totalPages);
  return Math.min(604, surah.hal + pageOffset);
}

// FUNGSI MEMANJANGKAN HURUF ARAB (KASHIDA / TATWEEL \u0640 ASLI)
export function applyKashidaToArabic(text) {
  if (!text) return '';
  // Sisipkan tatweel (\u0640) pada huruf yang menyambung secara estetis ke huruf berikutnya
  return text.replace(
    /([\u0628\u062A-\u062E\u0633-\u063A\u0641-\u064A])([\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]*)(?=[\u0621-\u064A\u0671])/g,
    (m, letter, marks) => letter + marks + '\u0640'
  );
}

// RENDER TAJWID AMAN DENGAN RTL MURNI (GRAPHEME-AWARE TANPA MEMUTUS LIGATUR KATA)
function renderSafeTajweed(text, themeMode = 'mushaf') {
  if (!text) return null;
  const palette = TAJWEED_THEME_RULES[themeMode] || TAJWEED_THEME_RULES.mushaf;

  const words = text.split(' ');
  return words.map((word, wordIdx) => {
    // Regex grapheme cluster: menangkap satu konsonan beserta SEMUA tanda harakat/waqaf yang menempel
    const GRAPHEME_REGEX = /([\u0621-\u064A\u0671-\u06D3])([\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]*)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = GRAPHEME_REGEX.exec(word)) !== null) {
      const base = match[1];
      const marks = match[2] || '';
      const fullGrapheme = match[0];

      let color = null;
      let title = '';

      if ((base === 'ن' || base === 'م') && marks.includes('\u0651')) {
        color = palette.ghunnah;
        title = 'Ghunnah / Idgham Bighunnah (Dengung 2 Harakat)';
      } else if ('قطبجد'.includes(base) && marks.includes('\u0652')) {
        color = palette.qalqalah;
        title = 'Qalqalah (Memantul)';
      } else if (marks.includes('\u0653')) {
        color = palette.maddLazim;
        title = 'Madd 6 Harakat';
      } else if (marks.includes('\u0670') || marks.includes('~')) {
        color = palette.madd;
        title = 'Madd (Panjang Harakat)';
      } else if (
        marks.includes('\u064B') ||
        marks.includes('\u064C') ||
        marks.includes('\u064D') ||
        (base === 'ن' && marks.includes('\u0652'))
      ) {
        color = palette.ikhfa;
        title = 'Ikhfa / Tanwin';
      }

      if (color) {
        parts.push(
          <span
            key={`g-${match.index}`}
            style={{ color, display: 'inline' }}
            className="font-bold select-text transition-colors duration-150"
            title={title}
          >
            {fullGrapheme}
          </span>
        );
      } else {
        parts.push(fullGrapheme);
      }
      lastIndex = GRAPHEME_REGEX.lastIndex;
    }

    if (lastIndex < word.length) {
      parts.push(word.substring(lastIndex));
    }

    // Aliran teks kata murni inline RTL, elastis mengikuti ukuran font tanpa tumpang tindih
    return (
      <span key={`w-${wordIdx}`} style={{ display: 'inline', unicodeBidi: 'isolate' }}>
        {parts}
        {wordIdx < words.length - 1 ? ' ' : ''}
      </span>
    );
  });
}

export default function AlQuranModal({ onClose }) {
  // 1. Navigation & Surah State (Default Surah 48 Al-Fath)
  const [selectedSurah, setSelectedSurah] = useState(() => SURAH_LIST[47]);
  const [surahDetail, setSurahDetail] = useState(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 2. 4 Mode Bacaan (Default: Mushaf Hijau #d5f5d8)
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('kanomas_quran_theme') || 'mushaf';
    } catch {
      return 'mushaf';
    }
  });

  // 3. Pengaturan Tipografi & Tampilan
  const [arabicFontSize, setArabicFontSize] = useState(() => {
    try {
      return parseInt(localStorage.getItem('kanomas_arabic_size'), 10) || 28;
    } catch {
      return 28;
    }
  });
  const [latinFontSize, setLatinFontSize] = useState(() => {
    try {
      return parseInt(localStorage.getItem('kanomas_latin_size'), 10) || 16;
    } catch {
      return 16;
    }
  });

  const [isKashidaLong, setIsKashidaLong] = useState(() => {
    try {
      return localStorage.getItem('kanomas_quran_kashida') === 'true';
    } catch {
      return false;
    }
  });
  const [showTajweed, setShowTajweed] = useState(true);
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showHizb, setShowHizb] = useState(true);
  
  // Pilihan Mushaf & Gaya Kaligrafi
  const [mushafType, setMushafType] = useState(() => {
    try {
      return localStorage.getItem('kanomas_mushaf_type') || 'indonesia';
    } catch {
      return 'indonesia';
    }
  }); // 'indonesia' | 'madinah'
  
  const [calligraphyStyle, setCalligraphyStyle] = useState(() => {
    try {
      return localStorage.getItem('kanomas_calligraphy_style') || 'standar';
    } catch {
      return 'standar';
    }
  }); // 'standar' | 'madinah' | 'scheherazade' | 'amiri'

  // Mode Baca Bersih (Hidden Read): Opsi aksi baru muncul saat ayat diklik
  const [hiddenReadMode, setHiddenReadMode] = useState(() => {
    try {
      return localStorage.getItem('kanomas_hidden_read') !== 'false'; // Default TRUE
    } catch {
      return true;
    }
  });
  const [activeAyatId, setActiveAyatId] = useState(null); // Ayat yang sedang aktif dibuka toolbar-nya

  const [latinType, setLatinType] = useState('kemenag'); // 'kemenag' | 'english'
  const [viewMode, setViewMode] = useState('ayat'); // 'ayat' | 'halaman'
  const [autoNext, setAutoNext] = useState(true);

  // 4. Audio Murottal & Qari
  const [selectedQari, setSelectedQari] = useState('05'); // 05 = Syaikh Misyari Rasyid
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAyatAudio, setActiveAyatAudio] = useState(null);
  const audioRef = useRef(null);

  // 5. Modals State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showRincianModal, setShowRincianModal] = useState(null); // Ayat object for Rincian & Tafsir
  const [tafsirText, setTafsirText] = useState(null);
  const [loadingTafsir, setLoadingTafsir] = useState(false);

  const [showShareModal, setShowShareModal] = useState(null); // Ayat object for Share Card
  const [shareCardFormat, setShareCardFormat] = useState('portrait'); // 'portrait' | 'kotak'
  const [shareBgTheme, setShareBgTheme] = useState('mushaf'); // otomatis sinkron dengan tema bacaan aktif

  const [showNoteModal, setShowNoteModal] = useState(null); // Ayat object for Note
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
  const [showTajweedGuide, setShowTajweedGuide] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  // Helper font family kaligrafi Arab aktif (prioritas pilihan kaligrafi pengguna)
  const getActiveFontFamily = () => {
    if (calligraphyStyle === 'scheherazade') return "'Scheherazade New', 'Amiri', serif";
    if (calligraphyStyle === 'amiri') return "'Amiri', 'Traditional Arabic', serif";
    if (calligraphyStyle === 'noto') return "'Noto Naskh Arabic', 'Amiri', serif";
    if (calligraphyStyle === 'madinah' || mushafType === 'madinah') return "'Amiri Quran', 'Scheherazade New', 'Noto Naskh Arabic', serif";
    return "'LPMQ Isep Misbah', 'Amiri Quran', 'Scheherazade New', serif";
  };

  // Helper kelas font kaligrafi Arab aktif
  const getArabicFontClass = () => {
    if (calligraphyStyle === 'scheherazade') return 'font-quran-scheherazade';
    if (calligraphyStyle === 'amiri') return 'font-quran-amiri';
    if (calligraphyStyle === 'noto') return 'font-quran-noto';
    if (calligraphyStyle === 'madinah' || mushafType === 'madinah') return 'font-quran-madinah';
    return 'font-quran-lpmq';
  };

  // Save Preferences
  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    try {
      localStorage.setItem('kanomas_quran_theme', mode);
    } catch {}
  };

  const handleArabicSizeChange = (val) => {
    const clamped = Math.max(18, Math.min(46, val));
    setArabicFontSize(clamped);
    try {
      localStorage.setItem('kanomas_arabic_size', clamped);
    } catch {}
  };

  const handleLatinSizeChange = (val) => {
    const clamped = Math.max(12, Math.min(26, val));
    setLatinFontSize(clamped);
    try {
      localStorage.setItem('kanomas_latin_size', clamped);
    } catch {}
  };

  const handleMushafTypeChange = (type) => {
    setMushafType(type);
    try {
      localStorage.setItem('kanomas_mushaf_type', type);
    } catch {}
  };

  const handleCalligraphyStyleChange = (style) => {
    setCalligraphyStyle(style);
    try {
      localStorage.setItem('kanomas_calligraphy_style', style);
    } catch {}
  };

  const handleToggleKashida = (val) => {
    setIsKashidaLong(val);
    try {
      localStorage.setItem('kanomas_quran_kashida', val ? 'true' : 'false');
    } catch {}
  };

  const handleToggleHiddenRead = (val) => {
    setHiddenReadMode(val);
    try {
      localStorage.setItem('kanomas_hidden_read', val ? 'true' : 'false');
    } catch {}
  };

  // Fetch Surah Details (equran.id LPMQ Indonesia + alquran.cloud Utsmani Madinah secara paralel)
  useEffect(() => {
    if (!selectedSurah) return;
    let isCancelled = false;

    async function loadSurah() {
      setLoadingSurah(true);
      if (audioRef.current) audioRef.current.pause();
      setIsPlayingAudio(false);
      setActiveAyatAudio(null);

      const cacheKey = `kanomas_surah_v7_${selectedSurah.nomor}`;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.ayat && parsed.ayat[0]?.teksArabMadinah) {
            if (!isCancelled) {
              setSurahDetail(parsed);
              setLoadingSurah(false);
              return;
            }
          }
        }
      } catch (e) {}

      try {
        const [resIndo, resMadinah] = await Promise.allSettled([
          fetch(`https://equran.id/api/v2/surat/${selectedSurah.nomor}`),
          fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.nomor}/quran-uthmani`)
        ]);

        let data = null;
        if (resIndo.status === 'fulfilled') {
          const jsonIndo = await resIndo.value.json();
          if (jsonIndo && jsonIndo.data) {
            data = jsonIndo.data;
          }
        }

        if (data && resMadinah.status === 'fulfilled') {
          try {
            const jsonMadinah = await resMadinah.value.json();
            if (jsonMadinah && jsonMadinah.data && jsonMadinah.data.ayahs) {
              const madinahMap = new Map();
              jsonMadinah.data.ayahs.forEach((mAyah) => {
                madinahMap.set(mAyah.numberInSurah, mAyah);
              });

              data.ayat = data.ayat.map((ayat) => {
                const m = madinahMap.get(ayat.nomorAyat);
                if (m) {
                  let mText = m.text || '';
                  // Hilangkan awalan Bismillah otomatis pada ayat 1 selain Al-Fatihah (1) & At-Taubah (9)
                  if (ayat.nomorAyat === 1 && selectedSurah.nomor > 1 && selectedSurah.nomor !== 9) {
                    mText = mText.replace(/^[\uFEFF]?بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '');
                  }
                  return {
                    ...ayat,
                    teksArabMadinah: mText,
                    pageMadinah: m.page,
                    juzMadinah: m.juz
                  };
                }
                return ayat;
              });
            }
          } catch (e) {
            console.warn('Gagal parsing teks Madinah:', e);
          }
        }

        if (data && !isCancelled) {
          setSurahDetail(data);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(data));
          } catch {}
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

  // Load Tafsir Ibnu Katsir & Kemenag for Modal "Rincian"
  const handleOpenRincian = async (ayat) => {
    setShowRincianModal(ayat);
    setLoadingTafsir(true);
    setTafsirText(null);

    const cacheKey = `kanomas_tafsir_v2_${selectedSurah.nomor}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        const match = parsed.find((t) => t.ayat === ayat.nomorAyat);
        setTafsirText(match ? match.teks : 'Tafsir ayat ini sedang dipersiapkan.');
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
        setTafsirText(match ? match.teks : 'Tafsir ayat ini sedang dipersiapkan.');
      }
    } catch (e) {
      setTafsirText('Gagal memuat tafsir. Periksa koneksi internet Anda.');
    } finally {
      setLoadingTafsir(false);
    }
  };

  // Notes Management (Catatan Pribadi)
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

  // Bookmark Management
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

  // Share Ayat (Card Generator & Quick Share)
  const handleOpenShareModal = (ayat) => {
    setShowShareModal(ayat);
    // Otomatis sinkronkan background kartu dengan tema yang sedang aktif
    if (themeMode === 'kabah') {
      setShareBgTheme('kaaba');
    } else if (themeMode === 'nature') {
      setShareBgTheme('nature');
    } else if (themeMode === 'dark' || themeMode === 'navy') {
      setShareBgTheme('dark');
    } else if (themeMode === 'sepia') {
      setShareBgTheme('sepia');
    } else {
      setShareBgTheme('mushaf');
    }
  };

  const handleOpenJumpModal = (initialAyat = 1) => {
    setJumpInput(String(initialAyat || 1));
    setShowJumpModal(true);
  };

  const handleQuickShareWA = (ayat) => {
    const arabText = (mushafType === 'madinah' && ayat.teksArabMadinah) ? ayat.teksArabMadinah : ayat.teksArab;
    const text = `*Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${ayat.nomorAyat}*\n\n${arabText}\n\n_${ayat.teksLatin}_\n\n"${ayat.teksIndonesia}"\n\n📌 _Dibagikan melalui Aplikasi Kanomas Tour & Travel_\nhttps://appkanomas.mediasosial.net`;
    if (navigator.share) {
      navigator.share({
        title: `Q.S. ${selectedSurah.namaLatin}: Ayat ${ayat.nomorAyat}`,
        text: text,
        url: 'https://appkanomas.mediasosial.net'
      }).catch(() => {});
    } else {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  const handleCopyAyat = (ayat) => {
    const arabText = (mushafType === 'madinah' && ayat.teksArabMadinah) ? ayat.teksArabMadinah : ayat.teksArab;
    const text = `Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: ${ayat.nomorAyat}\n\n${arabText}\n\n${ayat.teksLatin}\n\n"${ayat.teksIndonesia}"\n\n(Aplikasi Kanomas Tour & Travel)`;
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

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Jump to Ayat (dengan batasan angka max sesuai jumlah ayat)
  const handleJumpToAyat = (targetNum) => {
    const num = parseInt(targetNum, 10);
    if (!num || !selectedSurah || num < 1 || num > selectedSurah.jumlahAyat) {
      alert(`Nomor ayat tidak valid. Pilih antara 1 sampai ${selectedSurah.jumlahAyat}`);
      return;
    }
    setShowJumpModal(false);
    setJumpInput('');
    setActiveAyatId(num);
    setTimeout(() => {
      const el = document.getElementById(`ayat-card-${num}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedAyat(num);
        setTimeout(() => setHighlightedAyat(null), 3000);
      }
    }, 150);
  };

  // Navigasi Surat Selanjutnya / Sebelumnya
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

  // Ambil data tema aktif
  const currentTheme = THEME_PALETTES[themeMode] || THEME_PALETTES.mushaf;
  const isDark = currentTheme.isDark;

  // Rasio tinggi baris proporsional agar huruf Arab dan harakat tidak tumpang tindih
  const dynamicArabicLineHeight = Math.max(2.4, 2.2 + ((arabicFontSize - 20) * 0.035));

  // Render Arab dengan dukungan Mushaf Madinah vs Indonesia, Kashida Panjang, & Tajwid Warna
  const renderArabic = (ayat) => {
    if (!ayat) return null;
    let rawText = (mushafType === 'madinah' && ayat.teksArabMadinah)
      ? ayat.teksArabMadinah
      : (ayat.teksArab || '');

    if (isKashidaLong) {
      rawText = applyKashidaToArabic(rawText);
    }

    if (!showTajweed) {
      return rawText;
    }
    return renderSafeTajweed(rawText, themeMode);
  };

  // Hitung perkiraan nomor halaman berdasarkan urutan ayat
  const calculateAyatPage = (surah, ayatNomor) => {
    const basePage = surah.hal || 1;
    const offset = Math.floor((ayatNomor - 1) / Math.max(1, Math.round(surah.jumlahAyat / Math.max(1, Math.ceil(surah.jumlahAyat / 12)))));
    return Math.min(604, basePage + offset);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-2 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        style={{
          backgroundColor: currentTheme.bg,
          backgroundImage: currentTheme.type === 'image' ? `url(${currentTheme.imageSrc})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        className="relative w-full max-w-4xl h-full sm:h-[96vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-700/40 transition-colors duration-200"
      >
        {/* Dark translucent overlay for image background to guarantee crisp, sharp, contrast text */}
        {currentTheme.type === 'image' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[0.5px] pointer-events-none z-0" />
        )}

        {/* ======================================================== */}
        {/* 1. HEADER UTAMA (HIJAU TUA ISLAMI #0a7c29 PERSIS SCREENSHOT) */}
        {/* ======================================================== */}
        <div className="bg-[#0a7c29] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 shadow-md flex-shrink-0 z-20 relative">
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
            <ChevronLeft className="w-7 h-7 stroke-[3]" />
          </button>

          {/* Quick Surah Picker Title */}
          <button
            onClick={() => setShowSurahPicker(!showSurahPicker)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl hover:bg-white/15 transition font-bold text-sm sm:text-base max-w-[210px] sm:max-w-none truncate"
          >
            <span>{selectedSurah.nomor}. {selectedSurah.namaLatin}</span>
            <span className="text-xs text-emerald-200 font-normal hidden sm:inline">({selectedSurah.jumlahAyat} ayat)</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showSurahPicker ? 'rotate-90' : ''}`} />
          </button>

          {/* Header Action Icons: Loncat, Pemilih Background / Suasana, Pengaturan, Audio */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Tombol Loncat Ayat */}
            <button
              onClick={() => setShowJumpModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title="Loncat ke Ayat Tertentu"
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Tombol Ganti Background & Suasana (Foto Ka'bah / Alam / Polos) */}
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl active:scale-95 flex items-center justify-center transition ${
                showThemePicker ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'hover:bg-white/20 text-white'
              }`}
              title={`Suasana: ${currentTheme.name} (Klik untuk pilih foto Ka'bah, pemandangan, atau warna polos)`}
            >
              <Palette className="w-5 h-5" />
            </button>

            {/* Tombol Pengaturan (Settings Gear) */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title="Pengaturan Tampilan, Tajwid & Qari"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Tombol Audio Murottal (Speaker) */}
            <button
              onClick={playFullSurah}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl active:scale-95 flex items-center justify-center transition ${
                isPlayingAudio ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'hover:bg-white/20 text-white'
              }`}
              title={isPlayingAudio ? 'Jeda Murottal' : 'Putar Murottal Surah Penuh'}
            >
              {isPlayingAudio ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* POPUP PEMILIH SUASANA & BACKGROUND (FOTO ASLI & WARNA POLOS) */}
        {/* ======================================================== */}
        {showThemePicker && (
          <div className="p-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-30 flex-shrink-0 animate-in slide-in-from-top duration-200 relative">
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#0a7c29] dark:text-emerald-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Pilih Suasana & Background Bacaan
                  </span>
                </div>
                <button
                  onClick={() => setShowThemePicker(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Suasana Foto Asli */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Foto Asli (Ka'bah & Pemandangan)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      handleThemeChange('kabah');
                      setShowThemePicker(false);
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition flex items-center gap-2.5 relative overflow-hidden shadow-xs active:scale-98 ${
                      themeMode === 'kabah'
                        ? 'ring-2 ring-amber-400 border-amber-400 shadow-md text-white'
                        : 'border-slate-300 dark:border-slate-700 hover:border-amber-400 text-white'
                    }`}
                    style={{
                      backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(/assets/bg-kabah.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="text-2xl">🕋</span>
                    <div>
                      <span className="text-xs font-black block text-amber-300">Ka’bah Asli</span>
                      <span className="text-[10px] text-slate-200 block">Masjidil Haram Makkah</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleThemeChange('nature');
                      setShowThemePicker(false);
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition flex items-center gap-2.5 relative overflow-hidden shadow-xs active:scale-98 ${
                      themeMode === 'nature'
                        ? 'ring-2 ring-emerald-400 border-emerald-400 shadow-md text-white'
                        : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 text-white'
                    }`}
                    style={{
                      backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)), url(/assets/bg-nature.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="text-2xl">🌄</span>
                    <div>
                      <span className="text-xs font-black block text-emerald-300">Pemandangan Alam</span>
                      <span className="text-[10px] text-slate-200 block">Nuansa Teduh & Asri</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Warna Polos Klasik */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Warna Polos & Klasik
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {[
                    { id: 'mushaf', name: 'Mushaf Hijau', color: '#d5f5d8', textColor: '#064e3b' },
                    { id: 'light', name: 'Putih Bersih', color: '#ffffff', textColor: '#0f172a' },
                    { id: 'dark', name: 'Hitam Gelap', color: '#09111c', textColor: '#ffffff' },
                    { id: 'sepia', name: 'Kertas Sepia', color: '#fbf6ea', textColor: '#854d0e' },
                    { id: 'navy', name: 'Biru Malam', color: '#071b2f', textColor: '#7dd3fc' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleThemeChange(item.id);
                        setShowThemePicker(false);
                      }}
                      style={{ backgroundColor: item.color, color: item.textColor }}
                      className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 shadow-2xs active:scale-95 ${
                        themeMode === item.id
                          ? 'ring-2 ring-[#0a7c29] border-[#0a7c29] font-black scale-102'
                          : 'border-slate-300 dark:border-slate-700 opacity-90 hover:opacity-100'
                      }`}
                    >
                      <span className="text-[11px] font-black truncate w-full">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. SUB-HEADER BAR: NAVIGASI SURAT (< 48. Al-Fath >)      */}
        {/* ======================================================== */}
        <div className={`${currentTheme.subHeaderBg} border-b px-4 py-2 flex items-center justify-between shadow-xs flex-shrink-0 transition-colors relative z-10`}>
          {/* Tombol Surat Sebelumnya (<) */}
          <button
            onClick={handlePrevSurah}
            disabled={selectedSurah.nomor <= 1}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition active:scale-95 ${
              selectedSurah.nomor <= 1
                ? 'opacity-20 cursor-not-allowed text-slate-400'
                : 'text-[#0a7c29] hover:bg-emerald-100/50'
            }`}
            title="Surat Sebelumnya"
          >
            <span className="text-xl font-bold">◀</span>
          </button>

          {/* Identitas Surat Tengah & Tombol Cepat Pindah Mushaf */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-sm sm:text-base font-black tracking-tight">
                {selectedSurah.nomor}. {selectedSurah.namaLatin}
              </h1>
              {/* Badge Mushaf Aktif (Dapat diklik untuk toggle cepat) */}
              <button
                onClick={() => handleMushafTypeChange(mushafType === 'madinah' ? 'indonesia' : 'madinah')}
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold border transition active:scale-95 ${
                  mushafType === 'madinah'
                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-400/60 hover:bg-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-400/60 hover:bg-emerald-500/30'
                }`}
                title="Klik untuk beralih antara Mushaf Madinah & Mushaf Indonesia"
              >
                {mushafType === 'madinah' ? 'Mushaf Madinah' : 'Mushaf Indonesia'} ⇄
              </button>
            </div>
            <p className="text-[11px] sm:text-xs opacity-75 font-medium">
              {selectedSurah.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah'}, {selectedSurah.jumlahAyat} ayat • Juz {selectedSurah.juz}
            </p>
          </div>

          {/* Tombol Surat Selanjutnya (>) */}
          <button
            onClick={handleNextSurah}
            disabled={selectedSurah.nomor >= 114}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition active:scale-95 ${
              selectedSurah.nomor >= 114
                ? 'opacity-20 cursor-not-allowed text-slate-400'
                : 'text-[#0a7c29] hover:bg-emerald-100/50'
            }`}
            title="Surat Selanjutnya"
          >
            <span className="text-xl font-bold">▶</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* 3. MODAL POPUP PILIH SURAT (114 SURAH LENGKAP)           */}
        {/* ======================================================== */}
        {showSurahPicker && (
          <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl z-30 flex-shrink-0 animate-in slide-in-from-top duration-200 max-h-[60vh] overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Pilih dari 114 Surat</span>
                <button
                  onClick={() => setShowSurahPicker(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama surat (contoh: Ar-Ra'd, Al-Fath, Yasin)..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0a7c29]"
                />
              </div>

              {/* Grid 114 Surat */}
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
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-[#0a7c29] font-bold ring-1 ring-emerald-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <div className="truncate">
                      <span className="text-xs font-bold block truncate">
                        {surah.nomor}. {surah.namaLatin}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                        {surah.jumlahAyat} ayat • Juz {surah.juz}
                      </span>
                    </div>
                    <span className="font-quran-lpmq text-sm text-[#0a7c29] dark:text-emerald-400 font-bold ml-2">
                      {surah.nama}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. DAFTAR AYAT DENGAN KONTRAS TINGGI DI 3 MODE            */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-8 select-text">
          {/* BISMILLAH BANNER ORNAMEN KALIGRAFI (Kecuali Surah 9 & Surah 1) */}
          {selectedSurah.nomor !== 9 && selectedSurah.nomor !== 1 && (
            <div className="relative mx-auto my-5 max-w-xl text-center px-2 z-10">
              <div className={`relative py-4 px-6 rounded-3xl border-2 border-amber-400/50 shadow-md overflow-hidden ${
                currentTheme.type === 'image' || currentTheme.isDark
                  ? 'bg-slate-900/80 backdrop-blur-md'
                  : 'bg-gradient-to-r from-emerald-950/15 via-amber-500/10 to-emerald-950/15'
              }`}>
                {/* Aksen ornamen sudut kaligrafi */}
                <span className="absolute top-1.5 left-2.5 text-amber-500/70 text-xs font-serif select-none">۞</span>
                <span className="absolute top-1.5 right-2.5 text-amber-500/70 text-xs font-serif select-none">۞</span>
                <span className="absolute bottom-1.5 left-2.5 text-amber-500/70 text-xs font-serif select-none">۞</span>
                <span className="absolute bottom-1.5 right-2.5 text-amber-500/70 text-xs font-serif select-none">۞</span>

                <div className="relative z-10 space-y-1">
                  <span
                    style={{
                      fontFamily: getActiveFontFamily(),
                      color: currentTheme.bismillahColor
                    }}
                    className="text-2xl sm:text-3xl tracking-wide inline-block select-text font-bold drop-shadow-sm"
                    dir="rtl"
                  >
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </span>
                  <p style={{ color: currentTheme.translationColor }} className="text-[11px] sm:text-xs font-medium opacity-80 italic">
                    "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PEMBERITAHUAN AT-TAUBAH */}
          {selectedSurah.nomor === 9 && (
            <div className="mx-auto my-4 max-w-lg p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/50 text-center text-xs space-y-1 z-10">
              <span className="font-bold text-amber-800 dark:text-amber-300 block">Surat At-Taubah dibaca tanpa Basmalah</span>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Sesuai ketetapan Rasulullah ﷺ dan para Sahabat, pembacaan surat ini diawali langsung dengan ta'awwudz.
              </p>
            </div>
          )}

          {/* LOADING STATE */}
          {loadingSurah && (
            <div className="py-24 text-center space-y-3 z-10">
              <Loader2 className="w-10 h-10 text-[#0a7c29] animate-spin mx-auto" />
              <p style={{ color: currentTheme.translationColor }} className="text-xs sm:text-sm font-bold opacity-80">
                Memuat mushaf QS. {selectedSurah.namaLatin}...
              </p>
            </div>
          )}

          {/* DAFTAR AYAT */}
          {!loadingSurah && surahDetail && surahDetail.ayat && (
            <div className="space-y-6 max-w-3xl mx-auto z-10 relative">
              {surahDetail.ayat.map((ayat, index) => {
                const noteKey = `${selectedSurah.nomor}:${ayat.nomorAyat}`;
                const savedNote = userNotes[noteKey];
                const isBookmarked = bookmarks.some((b) => b.key === noteKey);
                const isAudioPlaying = isPlayingAudio && activeAyatAudio === ayat.nomorAyat;
                const isHighlighted = highlightedAyat === ayat.nomorAyat;
                const isToolbarOpen = activeAyatId === ayat.nomorAyat;

                // Penanda Halaman Mushaf (Mendukung nomor halaman asli Utsmani Madinah jika aktif)
                const ayatPage = mushafType === 'madinah' && ayat.pageMadinah ? ayat.pageMadinah : getAyatPageNumber(selectedSurah.nomor, ayat.nomorAyat);
                const prevAyat = index > 0 ? surahDetail.ayat[index - 1] : null;
                const prevAyatPage = prevAyat ? (mushafType === 'madinah' && prevAyat.pageMadinah ? prevAyat.pageMadinah : getAyatPageNumber(selectedSurah.nomor, prevAyat.nomorAyat)) : null;
                const isNewPage = index === 0 || ayatPage !== prevAyatPage;

                return (
                  <React.Fragment key={ayat.nomorAyat}>
                    {/* PENANDA AWAL HALAMAN MUSHAF */}
                    {isNewPage && (
                      <div className="flex items-center justify-center my-6 pt-2 z-10">
                        <div className="flex items-center gap-3 w-full max-w-md">
                          <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent flex-1" />
                          <div className={`px-4 py-1.5 rounded-full border border-amber-400/70 shadow-xs flex items-center gap-2 text-xs font-black ${
                            currentTheme.isDark || currentTheme.type === 'image'
                              ? 'bg-slate-900/90 text-amber-200'
                              : 'bg-gradient-to-r from-amber-500/20 via-emerald-500/25 to-amber-500/20 text-slate-800'
                          }`}>
                            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                            <span>Halaman {ayatPage}</span>
                            <span className="opacity-40">•</span>
                            <span>{mushafType === 'madinah' ? 'Mushaf Madinah' : 'Standar Kemenag'}</span>
                            <span className="opacity-40">•</span>
                            <span>Juz {ayat.juzMadinah || selectedSurah.juz}</span>
                          </div>
                          <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent flex-1" />
                        </div>
                      </div>
                    )}

                    <div
                      id={`ayat-card-${ayat.nomorAyat}`}
                      onClick={() => {
                        setActiveAyatId(activeAyatId === ayat.nomorAyat ? null : ayat.nomorAyat);
                      }}
                      style={{
                        borderBottomColor: currentTheme.borderDivider
                      }}
                      className={`space-y-4 pb-6 border-b transition-all duration-300 rounded-2xl cursor-pointer relative z-10 ${
                        isHighlighted
                          ? currentTheme.highlightBg + ' p-4 rounded-3xl'
                          : isAudioPlaying
                          ? currentTheme.activeAudioBg + ' p-4 rounded-3xl'
                          : isToolbarOpen
                          ? currentTheme.type === 'image'
                            ? 'p-4 rounded-3xl ring-2 ring-amber-400/80 bg-slate-900/90 backdrop-blur-md'
                            : 'p-4 rounded-3xl ring-2 ring-emerald-500/60 bg-emerald-500/5'
                          : currentTheme.type === 'image'
                          ? 'p-3.5 rounded-2xl bg-black/35 backdrop-blur-xs hover:bg-black/55 border border-white/5'
                          : 'p-2 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {/* A. TEKS ARAB DENGAN TAJWID WARNA & NOMOR AYAT LONCAT */}
                      <div className="text-right" dir="rtl">
                        <p
                          style={{
                            fontFamily: getActiveFontFamily(),
                            fontSize: `${arabicFontSize}px`,
                            color: currentTheme.arabicColor,
                            lineHeight: dynamicArabicLineHeight,
                            wordSpacing: isKashidaLong ? '0.24em' : '0.08em'
                          }}
                          className={`${getArabicFontClass()} font-normal select-text mb-4 sm:mb-5`}
                        >
                          {renderArabic(ayat)}

                          {/* ORNAMEN BINGKAI NOMOR AYAT (KLIK UNTUK LONCAT AYAT) */}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenJumpModal(ayat.nomorAyat);
                            }}
                            className="inline-flex items-center justify-center align-middle mx-2 my-1 select-none cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                            style={{ verticalAlign: 'middle', lineHeight: 1 }}
                            title={`Ayat ${ayat.nomorAyat} - Klik untuk loncat ke ayat lain (Maks: ${selectedSurah.jumlahAyat})`}
                          >
                            <span className="relative inline-flex items-center justify-center px-3.5 py-1 rounded-xl bg-gradient-to-br from-[#0a7c29] via-[#0b6623] to-[#064e1c] text-amber-300 font-mono text-xs sm:text-sm font-black border-2 border-slate-300 shadow-md ring-1 ring-emerald-950/20 whitespace-nowrap">
                              {ayat.nomorAyat}
                            </span>
                          </span>
                        </p>
                      </div>

                      {/* B. TRANSLITERASI LATIN */}
                      {showLatin && ayat.teksLatin && (
                        <div className="mt-3.5 sm:mt-4 pt-1">
                          <p
                            style={{
                              fontSize: `${latinFontSize}px`,
                              color: currentTheme.latinColor,
                              lineHeight: '1.75'
                            }}
                            className="font-medium select-text"
                          >
                            {ayat.teksLatin}
                          </p>
                        </div>
                      )}

                      {/* C. TERJEMAHAN BAHASA INDONESIA */}
                      {showTranslation && ayat.teksIndonesia && (
                        <div className="mt-2.5 sm:mt-3">
                          <p
                            style={{
                              fontSize: `${latinFontSize}px`,
                              color: currentTheme.translationColor,
                              lineHeight: '1.75'
                            }}
                            className="font-normal select-text opacity-95"
                          >
                            {ayat.teksIndonesia}
                          </p>
                        </div>
                      )}

                      {/* D. CATATAN PRIBADI JAMAAH (JIKA ADA) */}
                      {savedNote && (
                        <div
                          style={{
                            backgroundColor: isDark ? '#1e293b' : '#ecfdf5',
                            borderColor: isDark ? '#334155' : '#6ee7b7',
                            color: isDark ? '#e2e8f0' : '#064e3b'
                          }}
                          className="p-3.5 rounded-2xl border flex items-start justify-between gap-3 text-xs shadow-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="space-y-1">
                            <span className="font-bold flex items-center gap-1.5 text-amber-500">
                              <FileText className="w-4 h-4" />
                              <span>Catatan Anda ({savedNote.updatedAt}):</span>
                            </span>
                            <p className="italic">
                              "{savedNote.text}"
                            </p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleOpenNoteModal(ayat)}
                              className="text-amber-600 hover:text-amber-700 font-bold px-2 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNote(noteKey)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Hapus Catatan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ================================================================ */}
                      {/* E. BILAH AKSI AYAT (DIR="LTR", RAPI, TERSTRUKTUR, ELEGAN)        */}
                      {/* ================================================================ */}
                      {(isToolbarOpen || !hiddenReadMode) && (
                        <div
                          dir="ltr"
                          onClick={(e) => e.stopPropagation()}
                          className="pt-3 mt-2 border-t border-dashed border-emerald-500/30 animate-in slide-in-from-top-2 duration-200"
                        >
                          <div className={`p-3 rounded-2xl border shadow-md space-y-2.5 ${
                            currentTheme.isDark
                              ? 'bg-slate-900/90 border-slate-700 text-white'
                              : 'bg-white/95 border-emerald-300 text-slate-800 shadow-emerald-950/5'
                          }`}>
                            {/* Header Bilah Aksi: Info Ayat & Tombol Tutup */}
                            <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-slate-800">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleOpenJumpModal(ayat.nomorAyat)}
                                  className="flex items-center justify-center px-2.5 py-0.5 bg-gradient-to-r from-[#0a7c29] to-[#064e1c] text-amber-300 font-mono text-xs font-black rounded-lg border border-amber-300/40 shadow-xs hover:scale-105 active:scale-95 transition"
                                  title={`Ayat ${ayat.nomorAyat} - Klik untuk loncat ayat`}
                                >
                                  Ayat {ayat.nomorAyat}
                                </button>
                                <span className="text-[11px] font-bold opacity-75">
                                  QS. {selectedSurah.namaLatin} : {ayat.nomorAyat}
                                </span>
                              </div>

                              {/* Tombol Tutup Toolbar */}
                              {hiddenReadMode && (
                                <button
                                  onClick={() => setActiveAyatId(null)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                  title="Tutup Menu"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>

                            {/* Grid Tombol Aksi: 4 Kolom di Mobile, 7 Kolom di Layar Lebar */}
                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2 text-[11px] font-bold">
                              {/* 1. PUTAR AUDIO */}
                              <button
                                onClick={() => playAyatAudio(index)}
                                className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 border ${
                                  isAudioPlaying
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                }`}
                                title={isAudioPlaying ? 'Jeda Audio Ayat' : 'Putar Audio Ayat'}
                              >
                                {isAudioPlaying ? (
                                  <Pause className="w-4 h-4 text-white" />
                                ) : (
                                  <Play className="w-4 h-4 text-[#0a7c29] dark:text-emerald-400" />
                                )}
                                <span className="truncate max-w-full text-[10px] sm:text-[11px]">
                                  {isAudioPlaying ? 'Jeda' : 'Audio'}
                                </span>
                              </button>

                              {/* 2. TAFSIR & RINCIAN */}
                              <button
                                onClick={() => handleOpenRincian(ayat)}
                                className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 text-[#0a7c29] dark:text-emerald-400 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 transition active:scale-95 shadow-2xs"
                                title="Buka Rincian & Tafsir Kemenag / Ibnu Katsir"
                              >
                                <BookOpen className="w-4 h-4 stroke-[2.3]" />
                                <span className="truncate max-w-full text-[10px] sm:text-[11px]">Tafsir</span>
                              </button>

                              {/* 3. SALIN (COPY) */}
                              <button
                                onClick={() => handleCopyAyat(ayat)}
                                className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 transition active:scale-95 shadow-2xs"
                                title="Salin Ayat & Terjemah"
                              >
                                {copiedAyatNum === ayat.nomorAyat ? (
                                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                                <span className="truncate max-w-full text-[10px] sm:text-[11px]">
                                  {copiedAyatNum === ayat.nomorAyat ? 'Tersalin' : 'Salin'}
                                </span>
                              </button>

                              {/* 4. SHARE (KARTU GAMBAR SESUAI TEMA) */}
                              <button
                                onClick={() => handleOpenShareModal(ayat)}
                                className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 text-amber-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 transition active:scale-95 shadow-2xs"
                                title="Bagikan Ayat (Kartu Gambar Otomatis Sesuai Tema)"
                              >
                                <Share2 className="w-4 h-4" />
                                <span className="truncate max-w-full text-[10px] sm:text-[11px]">Share</span>
                              </button>

                              {/* 5. TANDAI CATATAN PRIBADI */}
                              <button
                                onClick={() => handleOpenNoteModal(ayat)}
                                className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 transition active:scale-95 shadow-2xs ${
                                  savedNote
                                    ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-800 dark:text-amber-300'
                                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                }`}
                                title="Tandai Catatan Pribadi"
                              >
                                <FileText className="w-4 h-4 text-amber-500" />
                                <span className="truncate max-w-full text-[10px] sm:text-[11px]">Catatan</span>
                              </button>

                              {/* 6. SIMPAN / BOOKMARK */}
                              <button
                                onClick={() => handleToggleBookmark(ayat)}
                                className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 transition active:scale-95 shadow-2xs ${
                                  isBookmarked
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                }`}
                                title={isBookmarked ? 'Hapus dari Simpanan' : 'Simpan Ayat'}
                              >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-white' : ''}`} />
                                <span className="truncate max-w-full text-[10px] sm:text-[11px]">
                                  {isBookmarked ? 'Disimpan' : 'Simpan'}
                                </span>
                              </button>

                              {/* 7. PANDUAN TAJWID */}
                              <button
                                onClick={() => setShowTajweedGuide(true)}
                                className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 transition active:scale-95 shadow-2xs"
                                title="Panduan Warna Tajwid"
                              >
                                <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span className="truncate max-w-full text-[10px] sm:text-[11px]">Tajwid</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* MODAL 1: RINCIAN & TAFSIR (PERSIS SEPERTI SCREENSHOT 7)   */}
        {/* ======================================================== */}
        {showRincianModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-lg max-h-[88vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl flex flex-col overflow-hidden">
              {/* Header Hijau Rincian */}
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <h3 className="text-base font-black">Rincian</h3>
                <button
                  onClick={() => setShowRincianModal(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Header Abu-Abu: Makkiyah / Madaniyah, XX ayat */}
              <div className="bg-[#6b7280] text-white font-bold text-center py-1.5 text-xs tracking-wider uppercase flex-shrink-0">
                {selectedSurah.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah'}, {selectedSurah.jumlahAyat} ayat
              </div>

              {/* Body: Info Rincian Persis Screenshot 7 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-1.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 px-1">
                  <p><span className="text-slate-500 font-medium">Arti :</span> {selectedSurah.arti}</p>
                  <p><span className="text-slate-500 font-medium">Urutan Wahyu :</span> {selectedSurah.wahyu || 96}</p>
                  <p><span className="text-slate-500 font-medium">Ayat Terpilih :</span> {showRincianModal.nomorAyat}</p>
                  <p><span className="text-slate-500 font-medium">Halaman :</span> {calculateAyatPage(selectedSurah, showRincianModal.nomorAyat)}</p>
                  <p><span className="text-slate-500 font-medium">Juz :</span> {selectedSurah.juz}</p>
                </div>

                {/* Sub-Header Abu-Abu: Tafsir */}
                <div className="bg-[#6b7280] text-white font-bold text-center py-1.5 text-xs tracking-wider uppercase rounded-lg">
                  Tafsir
                </div>

                {/* Box Tafsir Hijau Gelap dengan Teks Putih Tebal Persis Screenshot 7 */}
                <div className="p-4 rounded-2xl bg-[#0c381c] text-white text-xs sm:text-sm leading-relaxed space-y-3 font-serif">
                  {loadingTafsir ? (
                    <div className="py-8 text-center space-y-2">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mx-auto" />
                      <p className="text-xs text-emerald-200">Memuat teks tafsir Kemenag & Ibnu Katsir...</p>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold text-amber-300 block mb-1">
                        ({showRincianModal.nomorAyat}) Tafsir QS. {selectedSurah.namaLatin} :
                      </span>
                      <p className="whitespace-pre-line text-emerald-50 font-normal">
                        {tafsirText}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bilah Bawah Rincian */}
              <div className="p-3 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#0a7c29] text-amber-300 font-mono font-black text-xs rounded-lg border border-slate-300">
                    {showRincianModal.nomorAyat}
                  </span>
                  <button
                    onClick={() => {
                      if (tafsirText) {
                        navigator.clipboard?.writeText(`Tafsir QS. ${selectedSurah.namaLatin}: ${showRincianModal.nomorAyat}\n\n${tafsirText}\n\n(Aplikasi Kanomas)`);
                        alert('Teks tafsir berhasil disalin!');
                      }
                    }}
                    className="p-1.5 rounded-lg text-emerald-800 dark:text-emerald-300 hover:bg-slate-200 font-bold text-xs flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Salin</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowRincianModal(null)}
                  className="px-4 py-1.5 rounded-xl bg-[#0a7c29] text-white font-bold text-xs shadow-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 2: PENGATURAN LENGKAP                               */}
        {/* ======================================================== */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md max-h-[92vh] rounded-3xl bg-[#dcfce7] dark:bg-slate-900 border-2 border-[#0a7c29] shadow-2xl flex flex-col overflow-hidden">
              {/* Header Hijau Pengaturan */}
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-300" />
                  <h3 className="text-base font-black">Pengaturan Al-Qur'an</h3>
                </div>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Konten Pengaturan */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-bold text-slate-800 dark:text-slate-200">
                {/* 1. SLIDER HURUF ARAB DENGAN TOMBOL [-] DAN [+] */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-emerald-300 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">Ukuran Huruf Arab</span>
                    <span className="font-mono text-sm px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-black rounded-lg border border-emerald-400">
                      {arabicFontSize} px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleArabicSizeChange(arabicFontSize - 2)}
                      className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 font-black text-base flex items-center justify-center active:scale-95"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min="18"
                      max="46"
                      value={arabicFontSize}
                      onChange={(e) => handleArabicSizeChange(parseInt(e.target.value, 10))}
                      className="flex-1 accent-[#0a7c29] cursor-pointer"
                    />
                    <button
                      onClick={() => handleArabicSizeChange(arabicFontSize + 2)}
                      className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 font-black text-base flex items-center justify-center active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 2. SLIDER HURUF LATIN DENGAN TOMBOL [-] DAN [+] */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-emerald-300 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">Ukuran Huruf Terjemahan</span>
                    <span className="font-mono text-sm px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-black rounded-lg border border-emerald-400">
                      {latinFontSize} px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLatinSizeChange(latinFontSize - 1)}
                      className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 font-black text-base flex items-center justify-center active:scale-95"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={latinFontSize}
                      onChange={(e) => handleLatinSizeChange(parseInt(e.target.value, 10))}
                      className="flex-1 accent-[#0a7c29] cursor-pointer"
                    />
                    <button
                      onClick={() => handleLatinSizeChange(latinFontSize + 1)}
                      className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 font-black text-base flex items-center justify-center active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 3. SECTION: PILIHAN MUSHAF (INDONESIA VS MADINAH) */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
                    Pilihan Mushaf Al-Qur'an
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleMushafTypeChange('indonesia')}
                      className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                        mushafType === 'indonesia'
                          ? 'bg-[#0a7c29] text-white border-[#0a7c29] shadow-md ring-2 ring-emerald-400'
                          : 'bg-white dark:bg-slate-800 border-emerald-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${mushafType === 'indonesia' ? 'border-amber-300 bg-amber-400' : 'border-slate-400'}`} />
                      <div>
                        <span className="font-black text-xs block">Mushaf Indonesia</span>
                        <span className="text-[10px] opacity-80 block">Standar Kemenag RI (LPMQ)</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleMushafTypeChange('madinah')}
                      className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                        mushafType === 'madinah'
                          ? 'bg-[#0a7c29] text-white border-[#0a7c29] shadow-md ring-2 ring-emerald-400'
                          : 'bg-white dark:bg-slate-800 border-emerald-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${mushafType === 'madinah' ? 'border-amber-300 bg-amber-400' : 'border-slate-400'}`} />
                      <div>
                        <span className="font-black text-xs block">Mushaf Madinah</span>
                        <span className="text-[10px] opacity-80 block">Standar Malik Fahd Utsmani</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 4. SECTION: GAYA KALIGRAFI ARAB */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
                    Gaya Kaligrafi Arab
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'standar', name: 'Standar Kemenag (LPMQ)', desc: 'Isep Misbah Kemenag RI', font: "'LPMQ Isep Misbah', serif" },
                      { id: 'madinah', name: 'Madinah Utsmani', desc: 'Amiri Quranik Madinah', font: "'Amiri Quran', serif" },
                      { id: 'scheherazade', name: 'Naskh Klasik', desc: 'Scheherazade New', font: "'Scheherazade New', serif" },
                      { id: 'amiri', name: 'Kaligrafi Tradisional', desc: 'Amiri Classic Font', font: "'Amiri', serif" },
                      { id: 'noto', name: 'Naskh Modern', desc: 'Noto Naskh Arabic', font: "'Noto Naskh Arabic', serif" }
                    ].map((font) => (
                      <button
                        key={font.id}
                        onClick={() => handleCalligraphyStyleChange(font.id)}
                        className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                          calligraphyStyle === font.id
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-amber-300'
                            : 'bg-white dark:bg-slate-800 border-emerald-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
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

                  {/* Toggle Huruf Panjang & Renggang (Kashida / Tatweel) */}
                  <div className="flex items-center justify-between px-1 pt-1.5 bg-white/50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-emerald-300/40 dark:border-slate-700">
                    <div>
                      <span className="block text-xs font-black text-slate-900 dark:text-white">Huruf Panjang & Renggang (Kashida)</span>
                      <span className="text-[10px] opacity-75 block">Menyisipkan tatweel kaligrafi estetis antar huruf</span>
                    </div>
                    <button
                      onClick={() => handleToggleKashida(!isKashidaLong)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition active:scale-95 ${
                        isKashidaLong ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${isKashidaLong ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>
                </div>

                {/* 4B. SECTION: PILIHAN SUASANA & BACKGROUND */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
                    Suasana & Background Bacaan
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleThemeChange('kabah')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 relative overflow-hidden text-white ${
                        themeMode === 'kabah' ? 'ring-2 ring-amber-400 border-amber-400 shadow-md' : 'border-slate-400'
                      }`}
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(/assets/bg-kabah.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <span className="text-xl">🕋</span>
                      <div>
                        <span className="text-xs font-bold block text-amber-300">Ka’bah Asli</span>
                        <span className="text-[9px] text-slate-200 block">Masjidil Haram</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleThemeChange('nature')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 relative overflow-hidden text-white ${
                        themeMode === 'nature' ? 'ring-2 ring-emerald-400 border-emerald-400 shadow-md' : 'border-slate-400'
                      }`}
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(/assets/bg-nature.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <span className="text-xl">🌄</span>
                      <div>
                        <span className="text-xs font-bold block text-emerald-300">Pemandangan Alam</span>
                        <span className="text-[9px] text-slate-200 block">Nuansa Teduh</span>
                      </div>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 pt-1">
                    {[
                      { id: 'mushaf', name: 'Mushaf', color: '#d5f5d8', textColor: '#064e3b' },
                      { id: 'light', name: 'Putih', color: '#ffffff', textColor: '#0f172a' },
                      { id: 'dark', name: 'Gelap', color: '#09111c', textColor: '#ffffff' },
                      { id: 'sepia', name: 'Sepia', color: '#fbf6ea', textColor: '#854d0e' },
                      { id: 'navy', name: 'Biru', color: '#071b2f', textColor: '#7dd3fc' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleThemeChange(item.id)}
                        style={{ backgroundColor: item.color, color: item.textColor }}
                        className={`py-1.5 px-1 rounded-lg border text-center transition flex items-center justify-center text-[10px] font-black ${
                          themeMode === item.id ? 'ring-2 ring-[#0a7c29] border-[#0a7c29] scale-102' : 'border-slate-300 dark:border-slate-700 opacity-90'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. SECTION: MODE BACA BERSIH (HIDDEN READ) */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
                    Kenyamanan Membaca (Hidden Read)
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <span className="block text-xs font-bold">Mode Baca Bersih</span>
                      <span className="text-[10px] opacity-70">Menu opsi lain (tafsir, salin, share) baru muncul saat ayat diklik</span>
                    </div>
                    <button
                      onClick={() => handleToggleHiddenRead(!hiddenReadMode)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition ${
                        hiddenReadMode ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${hiddenReadMode ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>
                </div>

                {/* 6. SECTION: TERJEMAHAN DAN LATIN */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
                    Tampilan Terjemahan
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <span>Transliterasi Latin</span>
                    <button
                      onClick={() => setShowLatin(!showLatin)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition ${
                        showLatin ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${showLatin ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <span>Terjemahan Indonesia (Kemenag)</span>
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition ${
                        showTranslation ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${showTranslation ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>
                </div>

                {/* 7. SECTION: TAJWID & RINCIAN WARNA */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>Tajwid & Rincian Warna</span>
                    <button
                      onClick={() => setShowTajweed(!showTajweed)}
                      className={`w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center transition ${
                        showTajweed ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${showTajweed ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2 px-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Ghunnah / Idgham Bighunnah (Dengung)</span>
                      <span className="w-5 h-5 rounded-full bg-[#e11d48] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Qalqalah (Pantulan Suara)</span>
                      <span className="w-5 h-5 rounded-full bg-[#0284c7] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Iqlab (Tukar Bunyi Mim)</span>
                      <span className="w-5 h-5 rounded-full bg-[#7c3aed] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ikhfa & Tanwin (Samar)</span>
                      <span className="w-5 h-5 rounded-full bg-[#065f46] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Madd (Panjang Harakat)</span>
                      <span className="w-5 h-5 rounded-full bg-[#b45309] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Idgham Bilaghunnah & Madd Lazim</span>
                      <span className="w-5 h-5 rounded-full bg-[#dc2626] border border-slate-400 shadow-2xs" />
                    </div>
                  </div>
                </div>

                {/* 8. SECTION: PILIHAN QARI MUROTTAL */}
                <div className="space-y-1.5 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Pilihan Qari Murottal:</span>
                  <select
                    value={selectedQari}
                    onChange={(e) => setSelectedQari(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-400 text-xs font-bold text-slate-900 dark:text-white"
                  >
                    {QARI_LIST.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Footer Pengaturan */}
              <div className="p-3 bg-white/60 dark:bg-slate-800/80 border-t border-emerald-300/40 flex justify-end">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#0a7c29] hover:bg-emerald-800 text-white font-bold text-xs shadow-xs active:scale-95 transition"
                >
                  Simpan & Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 3: SHARE AYAT (CARD GENERATOR OTOMATIS SESUAI TEMA)  */}
        {/* ======================================================== */}
        {showShareModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md max-h-[92vh] rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
              {/* Header Share */}
              <div className="p-3.5 bg-slate-800/90 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-black">Bagikan Ayat Al-Qur'an</h3>
                </div>
                <button
                  onClick={() => setShowShareModal(null)}
                  className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body: Preview Kartu Ayat */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* PREVIEW KARTU GAMBAR AYAT DENGAN BACKGROUND OTOMATIS SESUAI TEMA */}
                <div
                  style={{
                    backgroundImage:
                      shareBgTheme === 'kaaba'
                        ? 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.88)), url(/assets/bg-kabah.jpg)'
                        : shareBgTheme === 'nature'
                        ? 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.88)), url(/assets/bg-nature.jpg)'
                        : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  className={`w-full rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all border ${
                    shareCardFormat === 'kotak' ? 'aspect-square' : 'min-h-[360px]'
                  } ${
                    shareBgTheme === 'kaaba'
                      ? 'border-amber-400/60 text-white'
                      : shareBgTheme === 'nature'
                      ? 'border-emerald-400/60 text-white'
                      : shareBgTheme === 'mushaf'
                      ? 'bg-gradient-to-b from-[#093d1e] via-[#064e23] to-[#03240f] border-emerald-400/50'
                      : shareBgTheme === 'dark'
                      ? 'bg-gradient-to-b from-slate-950 via-[#0a1222] to-slate-950 border-amber-400/50'
                      : shareBgTheme === 'sepia'
                      ? 'bg-gradient-to-b from-[#78350f] via-[#552408] to-[#2e1305] border-amber-300/50'
                      : 'bg-gradient-to-b from-[#071b2f] via-[#0b2847] to-[#051322] border-sky-400/50'
                  }`}
                >
                  {/* Decorative Islamic Star Pattern Overlay */}
                  <div className="absolute inset-0 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

                  {/* Header Kartu: Q.S. Nama Surat : Ayat */}
                  <div className="relative z-10 text-center pt-1">
                    <span className="text-[10px] uppercase font-black tracking-widest text-amber-300/80 block mb-0.5">
                      KUTIPAN AYAT SUCI AL-QUR'AN
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide font-serif drop-shadow-md">
                      Q.S. {selectedSurah.namaLatin} : {showShareModal.nomorAyat}
                    </h2>
                    <div className="w-16 h-0.5 bg-amber-400/60 mx-auto mt-1 rounded-full" />
                  </div>

                  {/* Teks Arab & Terjemahan Tengah */}
                  <div className="relative z-10 space-y-3 my-auto py-3 text-center">
                    <p
                      style={{ fontFamily: getActiveFontFamily() }}
                      className={`${getArabicFontClass()} text-xl sm:text-2xl text-amber-50 leading-loose drop-shadow-md`}
                      dir="rtl"
                    >
                      {(mushafType === 'madinah' && showShareModal.teksArabMadinah)
                        ? showShareModal.teksArabMadinah
                        : showShareModal.teksArab}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-sm px-2">
                      "{showShareModal.teksIndonesia}"
                    </p>
                  </div>

                  {/* Footer Kartu: Kanomas Tour & Travel Official Branding */}
                  <div className="relative z-10 text-center border-t border-white/20 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/assets/logo-kanomas-3d.png" alt="Kanomas" className="w-6 h-6 rounded-lg object-cover" />
                      <div className="text-left">
                        <span className="text-xs font-black text-amber-200 block leading-tight">
                          Kanomas Tour & Travel
                        </span>
                        <span className="text-[9px] text-slate-300 block">
                          Izin Resmi Kemenag RI
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono">
                      appkanomas.mediasosial.net
                    </span>
                  </div>
                </div>

                {/* Kontrol Format Kartu */}
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setShareCardFormat('portrait')}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition ${
                      shareCardFormat === 'portrait'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>Share Portrait (Story)</span>
                  </button>
                  <button
                    onClick={() => setShareCardFormat('kotak')}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition ${
                      shareCardFormat === 'kotak'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>Share Kotak (Feed)</span>
                  </button>
                </div>

                {/* Pilihan Wallpaper / Tema Background Kartu */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-slate-400 font-bold block">Pilihan Nuansa Kartu:</span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[
                      { id: 'kaaba', name: 'Ka’bah' },
                      { id: 'nature', name: 'Alam' },
                      { id: 'mushaf', name: 'Mushaf' },
                      { id: 'dark', name: 'Gelap' },
                      { id: 'sepia', name: 'Sepia' },
                      { id: 'navy', name: 'Biru' }
                    ].map((th) => (
                      <button
                        key={th.id}
                        onClick={() => setShareBgTheme(th.id)}
                        className={`py-1.5 rounded-lg text-xs font-bold capitalize transition active:scale-95 ${
                          shareBgTheme === th.id
                            ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {th.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tombol Aksi SHARE */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => handleQuickShareWA(showShareModal)}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0a7c29] to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-sm tracking-wider uppercase shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>BAGIKAN KE WHATSAPP</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 5: LONCAT KE AYAT TERTENTU (DENGAN BATAS MAKS AYAT) */}
        {/* ======================================================== */}
        {showJumpModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#0a7c29] dark:text-emerald-400" />
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                      Loncat ke Ayat
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      QS. {selectedSurah.namaLatin}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowJumpModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Total Ayat:</span>
                  <span className="font-mono font-black text-[#0a7c29] dark:text-emerald-400 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950">
                    {selectedSurah.jumlahAyat} ayat (Maks: {selectedSurah.jumlahAyat})
                  </span>
                </div>

                {/* Input Angka Ayat dengan Batasan Maksimal */}
                <div>
                  <input
                    type="number"
                    min="1"
                    max={selectedSurah.jumlahAyat}
                    value={jumpInput}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === '') {
                        setJumpInput('');
                        return;
                      }
                      const val = parseInt(raw, 10);
                      if (!isNaN(val)) {
                        setJumpInput(String(Math.min(selectedSurah.jumlahAyat, Math.max(1, val))));
                      }
                    }}
                    placeholder={`1 s/d ${selectedSurah.jumlahAyat}`}
                    autoFocus
                    className="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-emerald-400/60 text-xl font-mono text-center font-black focus:outline-none focus:ring-2 focus:ring-[#0a7c29]"
                  />
                  <span className="text-[10px] text-slate-500 block text-center mt-1">
                    Ketik angka 1 sampai {selectedSurah.jumlahAyat}
                  </span>
                </div>

                {/* Slider Cepat Loncat Ayat */}
                <div className="space-y-1 pt-1">
                  <input
                    type="range"
                    min="1"
                    max={selectedSurah.jumlahAyat}
                    value={parseInt(jumpInput, 10) || 1}
                    onChange={(e) => setJumpInput(e.target.value)}
                    className="w-full accent-[#0a7c29] cursor-pointer"
                  />
                </div>

                {/* Tombol Pintas Ayat */}
                <div className="grid grid-cols-4 gap-1.5 pt-1 text-[11px] font-bold">
                  <button
                    onClick={() => setJumpInput('1')}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-800 dark:text-slate-200"
                  >
                    Awal (1)
                  </button>
                  <button
                    onClick={() => setJumpInput(String(Math.floor(selectedSurah.jumlahAyat / 3) || 1))}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-800 dark:text-slate-200"
                  >
                    Ayat {Math.floor(selectedSurah.jumlahAyat / 3) || 1}
                  </button>
                  <button
                    onClick={() => setJumpInput(String(Math.floor(selectedSurah.jumlahAyat / 2) || 1))}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-800 dark:text-slate-200"
                  >
                    Tengah ({Math.floor(selectedSurah.jumlahAyat / 2) || 1})
                  </button>
                  <button
                    onClick={() => setJumpInput(String(selectedSurah.jumlahAyat))}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-800 dark:text-slate-200"
                  >
                    Akhir ({selectedSurah.jumlahAyat})
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handleJumpToAyat(jumpInput || 1)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#0a7c29] to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition"
                >
                  LONCAT KE AYAT {jumpInput || 1}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 6: PANDUAN WARNA TAJWID LENGKAP                    */}
        {/* ======================================================== */}
        {showTajweedGuide && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Panduan Warna Tajwid
                  </h3>
                </div>
                <button
                  onClick={() => setShowTajweedGuide(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#e11d48] flex-shrink-0 shadow-sm" />
                  <div>
                    <span className="font-bold block">Pink / Magenta: Ghunnah & Idgam Bigunnah</span>
                    <span className="text-[11px] text-slate-500">Dengung 2 harakat saat bertemu mim/nun tasydid</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0284c7] flex-shrink-0 shadow-sm" />
                  <div>
                    <span className="font-bold block">Biru Cerah: Qalqalah</span>
                    <span className="text-[11px] text-slate-500">Pantulan suara huruf sukun قطبجد (baju di thoko)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#7c3aed] flex-shrink-0 shadow-sm" />
                  <div>
                    <span className="font-bold block">Ungu: Iqlab</span>
                    <span className="text-[11px] text-slate-500">Tukar bunyi nun sukun / tanwin menjadi mim</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#065f46] flex-shrink-0 shadow-sm" />
                  <div>
                    <span className="font-bold block">Hijau Zamrud: Ikhfa & Tanwin</span>
                    <span className="text-[11px] text-slate-500">Samar-samar berdengung saat bertemu 15 huruf ikhfa</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#b45309] flex-shrink-0 shadow-sm" />
                  <div>
                    <span className="font-bold block">Kuning Emas / Amber: Madd</span>
                    <span className="text-[11px] text-slate-500">Panjang harakat mad thabi'i dan mad jaiz / wajib</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#dc2626] flex-shrink-0 shadow-sm" />
                  <div>
                    <span className="font-bold block">Merah: Idgam Bilagunnah & Madd Lazim</span>
                    <span className="text-[11px] text-slate-500">Lebur tanpa dengung / Mad panjang 6 harakat</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowTajweedGuide(false)}
                className="w-full py-2.5 rounded-xl bg-[#0a7c29] text-white font-bold text-xs shadow-xs"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
