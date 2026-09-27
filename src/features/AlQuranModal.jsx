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
export const THEME_PALETTES = {
  mushaf: {
    id: 'mushaf',
    name: 'Mushaf Hijau',
    bg: '#d5f5d8', // Pastel mint green khas mushaf screenshot
    arabicColor: '#000000', // Hitam pekat tajam
    latinColor: '#064e3b', // Hijau tua pekat kontras
    translationColor: '#0f172a', // Slate hitam pekat kontras
    subHeaderBg: 'bg-white/95 text-slate-900 border-emerald-900/10',
    bismillahColor: '#065f46',
    borderDivider: '#a7f3d0',
    highlightBg: 'bg-emerald-200/60 ring-2 ring-emerald-600',
    activeAudioBg: 'bg-emerald-200/50 ring-2 ring-emerald-500',
    isDark: false
  },
  light: {
    id: 'light',
    name: 'Terang',
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
    name: 'Gelap',
    bg: '#09111c', // Midnight navy luxury
    arabicColor: '#ffffff', // Putih terang benderang (TIDAK AKAN HILANG!)
    latinColor: '#86efac', // Hijau mint cerah kontras tinggi di layar hitam
    translationColor: '#f1f5f9', // Abu-abu putih terang kontras tinggi
    subHeaderBg: 'bg-[#131f33] text-white border-slate-800',
    bismillahColor: '#34d399',
    borderDivider: '#1e293b',
    highlightBg: 'bg-emerald-950/80 ring-2 ring-amber-400',
    activeAudioBg: 'bg-emerald-900/40 ring-2 ring-emerald-400',
    isDark: true
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia',
    bg: '#fbf6ea', // Kertas kitab klasik
    arabicColor: '#1c1917',
    latinColor: '#854d0e',
    translationColor: '#292524',
    subHeaderBg: 'bg-[#f4ebd7] text-amber-950 border-amber-200',
    bismillahColor: '#78350f',
    borderDivider: '#fde68a',
    highlightBg: 'bg-amber-200/50 ring-2 ring-amber-500',
    activeAudioBg: 'bg-emerald-100/50 ring-2 ring-emerald-600',
    isDark: false
  }
};

// ATURAN WARNA TAJWID SESUAI SCREENSHOT 2 & 3
// Madd (Hijau/Biru/Pink), Idgham Bigunnah (Pink), Idgham Bilagunnah (Merah), Ikhfa (Hijau), Iqlab (Biru), Qalqalah (Biru)
export const TAJWEED_COLORS = {
  mushaf: {
    g: { color: '#f43f5e', name: 'Idgam Bigunnah / Ghunnah' },
    w: { color: '#f43f5e', name: 'Idgam Bigunnah' },
    q: { color: '#0284c7', name: 'Qalqalah' },
    b: { color: '#0284c7', name: 'Iqlab' },
    m: { color: '#16a34a', name: 'Madd 2-4-6 Harakat' },
    o: { color: '#0284c7', name: 'Madd 4-5 Harakat' },
    p: { color: '#f43f5e', name: 'Madd 6 Harakat' },
    f: { color: '#16a34a', name: 'Ikhfa' },
    c: { color: '#16a34a', name: 'Ikhfa Syafawi' },
    d: { color: '#dc2626', name: 'Idgam Bilagunnah' },
    h: { color: '#64748b', name: 'Hamzah Wasl' }
  },
  dark: {
    g: { color: '#fb7185', name: 'Idgam Bigunnah / Ghunnah' }, // Luminous Pink
    w: { color: '#fb7185', name: 'Idgam Bigunnah' },
    q: { color: '#38bdf8', name: 'Qalqalah' }, // Luminous Sky Blue
    b: { color: '#38bdf8', name: 'Iqlab' },
    m: { color: '#4ade80', name: 'Madd 2-4-6 Harakat' }, // Luminous Mint Green
    o: { color: '#38bdf8', name: 'Madd 4-5 Harakat' },
    p: { color: '#fb7185', name: 'Madd 6 Harakat' },
    f: { color: '#4ade80', name: 'Ikhfa' },
    c: { color: '#4ade80', name: 'Ikhfa Syafawi' },
    d: { color: '#f87171', name: 'Idgam Bilagunnah' }, // Luminous Coral
    h: { color: '#94a3b8', name: 'Hamzah Wasl' }
  }
};

// FUNGSI PEMANJANG HURUF ARAB (KASHIDA / TATWEEL) SEPERTI SCREENSHOT 2
// Menghubungkan huruf sambung sehingga bentuknya panjang, anggun, dan tidak mepet
function elongateArabic(text, enabled = true) {
  if (!text || !enabled) return text;
  // Sisipkan tatweel \u0640 pada huruf sambung tengah kata
  return text.replace(/([بتثجحخسشصضطظعغفقكلمنهي][\u064B-\u065F\u0670]?)(?=[بتثجحخسشصضطظعغفقكلمنهي])/g, '$1\u0640');
}

// Tree Parser Tajweed Markup
function parseTajweedTree(text) {
  if (!text) return [];
  let i = 0;
  function parseSeq() {
    let nodes = [];
    let buf = '';
    while (i < text.length) {
      if (text[i] === '[' && text.slice(i).match(/^\[([a-z0-9]+)(?::[0-9]+)?\[/)) {
        if (buf) {
          nodes.push({ type: 'plain', text: buf });
          buf = '';
        }
        const match = text.slice(i).match(/^\[([a-z0-9]+)(?::[0-9]+)?\[/);
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

function renderTajweedNodes(nodes, isDark = false, isKashida = true) {
  const palette = isDark ? TAJWEED_COLORS.dark : TAJWEED_COLORS.mushaf;

  return nodes.map((node, idx) => {
    if (node.type === 'plain') {
      return <React.Fragment key={idx}>{elongateArabic(node.text, isKashida)}</React.Fragment>;
    }
    const info = palette[node.type] || palette.m;
    const renderedText = node.children
      ? renderTajweedNodes(node.children, isDark, isKashida)
      : elongateArabic(node.text, isKashida);

    return (
      <span
        key={idx}
        style={{ color: info.color }}
        className="font-bold inline select-text transition-colors"
        title={info.name}
      >
        {renderedText}
      </span>
    );
  });
}

function renderFallbackTajweed(text, isDark = false, isKashida = true) {
  if (!text) return null;
  const processed = elongateArabic(text, isKashida);
  // 1. Ghunnah/Idgham (Pink), 2. Qalqalah (Biru), 3. Mad (Hijau), 4. Tanwin/Ikhfa (Hijau), 5. Iqlab (Biru)
  const regex = /([\u0646\u0645]\u0651)|([بجدطق]\u0652)|([\u0653~])|(نْ|[ًٌٍ])|([\u06E2\u06D8])/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  const pink = isDark ? '#fb7185' : '#f43f5e';
  const blue = isDark ? '#38bdf8' : '#0284c7';
  const green = isDark ? '#4ade80' : '#16a34a';

  while ((match = regex.exec(processed)) !== null) {
    if (match.index > lastIndex) {
      elements.push(processed.substring(lastIndex, match.index));
    }
    let color = pink;
    if (match[1]) color = pink; // Ghunnah / Idgam Bigunnah
    else if (match[2]) color = blue; // Qalqalah
    else if (match[3]) color = green; // Mad
    else if (match[4]) color = green; // Ikhfa
    else if (match[5]) color = blue; // Iqlab

    elements.push(
      <span key={`fb-${match.index}`} style={{ color }} className="font-bold inline select-text">
        {match[0]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < processed.length) {
    elements.push(processed.substring(lastIndex));
  }
  return elements;
}

export default function AlQuranModal({ onClose }) {
  // 1. Navigation & Surah State (Default Surah 48 Al-Fath seperti Screenshot 1)
  const [selectedSurah, setSelectedSurah] = useState(() => SURAH_LIST[47]);
  const [surahDetail, setSurahDetail] = useState(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 2. 3 Mode Bacaan (Default: Mushaf Hijau #d5f5d8 sesuai gambar user)
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

  const [isKashidaLong, setIsKashidaLong] = useState(true); // Huruf panjang seperti screenshot 2
  const [showTajweed, setShowTajweed] = useState(true);
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showHizb, setShowHizb] = useState(true);
  const [mushafType, setMushafType] = useState('indonesia'); // 'indonesia' | 'madinah'
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
  const [shareBgTheme, setShareBgTheme] = useState('nature'); // 'nature' | 'kaaba' | 'emerald' | 'dark'

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

  // Save Preferences
  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    try {
      localStorage.setItem('kanomas_quran_theme', mode);
    } catch {}
  };

  const handleArabicSizeChange = (val) => {
    setArabicFontSize(val);
    try {
      localStorage.setItem('kanomas_arabic_size', val);
    } catch {}
  };

  const handleLatinSizeChange = (val) => {
    setLatinFontSize(val);
    try {
      localStorage.setItem('kanomas_latin_size', val);
    } catch {}
  };

  // Fetch Surah Details (equran.id + alquran.cloud tajweed)
  useEffect(() => {
    if (!selectedSurah) return;
    let isCancelled = false;

    async function loadSurah() {
      setLoadingSurah(true);
      if (audioRef.current) audioRef.current.pause();
      setIsPlayingAudio(false);
      setActiveAyatAudio(null);

      const cacheKey = `kanomas_surah_v4_${selectedSurah.nomor}`;
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
      } catch (e) {}

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
  };

  const handleQuickShareWA = (ayat) => {
    const text = `*Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${ayat.nomorAyat}*\n\n${ayat.teksArab}\n\n_${ayat.teksLatin}_\n\n"${ayat.teksIndonesia}"\n\n📌 _Dibagikan melalui Aplikasi Kanomas Tour & Travel_\nhttps://appkanomas.mediasosial.net`;
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

  // Jump to Ayat
  const handleJumpToAyat = (targetNum) => {
    const num = parseInt(targetNum, 10);
    if (!num || !selectedSurah || num < 1 || num > selectedSurah.jumlahAyat) {
      alert(`Nomor ayat tidak valid. Pilih antara 1 sampai ${selectedSurah.jumlahAyat}`);
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

  // Render Arab dengan Tajwid & Elongation
  const renderArabic = (ayat) => {
    if (!showTajweed) {
      return elongateArabic(ayat.teksArab, isKashidaLong);
    }
    if (ayat.tajweedRaw) {
      const tree = parseTajweedTree(ayat.tajweedRaw);
      return renderTajweedNodes(tree, isDark, isKashidaLong);
    }
    return renderFallbackTajweed(ayat.teksArab, isDark, isKashidaLong);
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
        style={{ backgroundColor: currentTheme.bg }}
        className="w-full max-w-4xl h-full sm:h-[96vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 transition-colors duration-200"
      >
        {/* ======================================================== */}
        {/* 1. HEADER UTAMA (HIJAU TUA ISLAMI #0a7c29 PERSIS SCREENSHOT) */}
        {/* ======================================================== */}
        <div className="bg-[#0a7c29] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 shadow-md flex-shrink-0 z-20">
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

          {/* Header Action Icons: Rotasi/Loncat, 3 Mode Tema (Sun), Pengaturan, Audio */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Tombol Loncat Ayat */}
            <button
              onClick={() => setShowJumpModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title="Loncat ke Ayat Tertentu"
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Tombol Ganti 3 Mode Tema (Sun Icon seperti Screenshot 1) */}
            <button
              onClick={() => {
                const modes = ['mushaf', 'light', 'dark', 'sepia'];
                const next = modes[(modes.indexOf(themeMode) + 1) % modes.length];
                handleThemeChange(next);
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title={`Mode Saat Ini: ${currentTheme.name} (Klik untuk berganti mode)`}
            >
              {themeMode === 'dark' ? (
                <Moon className="w-5 h-5 text-amber-300" />
              ) : themeMode === 'sepia' ? (
                <Coffee className="w-5 h-5 text-amber-200" />
              ) : themeMode === 'light' ? (
                <Sun className="w-5 h-5 text-amber-300" />
              ) : (
                <Sparkles className="w-5 h-5 text-amber-300" />
              )}
            </button>

            {/* Tombol Pengaturan (Settings Gear - Screenshot 1) */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
              title="Pengaturan Tampilan, Tajwid & Qari"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Tombol Audio Murottal (Speaker - Screenshot 1) */}
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
        {/* 2. SUB-HEADER BAR: NAVIGASI SURAT (< 48. Al-Fath >)      */}
        {/* ======================================================== */}
        <div className={`${currentTheme.subHeaderBg} border-b px-4 py-2 flex items-center justify-between shadow-xs flex-shrink-0 transition-colors`}>
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

          {/* Identitas Surat Tengah (Persis Screenshot 1 & 2) */}
          <div className="text-center">
            <h1 className="text-sm sm:text-base font-black tracking-tight">
              {selectedSurah.nomor}. {selectedSurah.namaLatin}
            </h1>
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
          {/* BISMILLAH BANNER (Kecuali Surah 9 & Surah 1) */}
          {selectedSurah.nomor !== 9 && selectedSurah.nomor !== 1 && (
            <div className="text-center py-4">
              <span
                style={{ color: currentTheme.bismillahColor }}
                className="font-quran-lpmq text-2xl sm:text-3xl tracking-widest inline-block select-text font-bold"
                dir="rtl"
              >
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </span>
            </div>
          )}

          {/* LOADING STATE */}
          {loadingSurah && (
            <div className="py-24 text-center space-y-3">
              <Loader2 className="w-10 h-10 text-[#0a7c29] animate-spin mx-auto" />
              <p style={{ color: currentTheme.translationColor }} className="text-xs sm:text-sm font-bold opacity-80">
                Memuat mushaf QS. {selectedSurah.namaLatin}...
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
                    style={{
                      borderBottomColor: currentTheme.borderDivider
                    }}
                    className={`space-y-4 pb-6 border-b transition-all duration-300 ${
                      isHighlighted
                        ? currentTheme.highlightBg + ' p-4 rounded-3xl'
                        : isAudioPlaying
                        ? currentTheme.activeAudioBg + ' p-4 rounded-3xl'
                        : ''
                    }`}
                  >
                    {/* A. TEKS ARAB DENGAN TAJWID WARNA & NOMOR AYAT PERSIS SCREENSHOT 1 & 2 */}
                    <div className="text-right" dir="rtl">
                      <p
                        style={{
                          fontSize: `${arabicFontSize}px`,
                          color: currentTheme.arabicColor,
                          lineHeight: '2.9',
                          letterSpacing: '0.03em',
                          wordSpacing: '0.15em'
                        }}
                        className="font-quran-lpmq font-normal select-text"
                      >
                        {renderArabic(ayat)}

                        {/* ORNAMEN BINGKAI HIJAU EMAS NOMOR AYAT PERSIS SCREENSHOT 1 & 2 */}
                        <span
                          onClick={() => handleOpenRincian(ayat)}
                          className="inline-flex items-center justify-center align-middle mx-2 select-none cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                          title={`Ayat ${ayat.nomorAyat} - Klik untuk lihat Rincian & Tafsir`}
                        >
                          <span className="relative inline-flex items-center justify-center px-3.5 py-0.5 rounded-xl bg-gradient-to-br from-[#0a7c29] via-[#0b6623] to-[#064e1c] text-amber-300 font-mono text-xs sm:text-sm font-black border-2 border-slate-300 shadow-md ring-1 ring-emerald-950/20">
                            {ayat.nomorAyat}
                          </span>
                        </span>
                      </p>
                    </div>

                    {/* B. TRANSLITERASI LATIN (KONTRAS TINGGI, JELAS DI SEMUA 3 MODE) */}
                    {showLatin && ayat.teksLatin && (
                      <p
                        style={{
                          fontSize: `${latinFontSize}px`,
                          color: currentTheme.latinColor
                        }}
                        className="leading-relaxed font-medium select-text"
                      >
                        {ayat.teksLatin}
                      </p>
                    )}

                    {/* C. TERJEMAHAN BAHASA INDONESIA (KONTRAS TINGGI, JELAS DI SEMUA 3 MODE) */}
                    {showTranslation && ayat.teksIndonesia && (
                      <p
                        style={{
                          fontSize: `${latinFontSize}px`,
                          color: currentTheme.translationColor
                        }}
                        className="leading-relaxed font-normal select-text opacity-95"
                      >
                        {ayat.teksIndonesia}
                      </p>
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
                    {/* E. BILAH AKSI AYAT MENGAMBANG (PERSIS SCREENSHOT 1)               */}
                    {/* ================================================================ */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        {/* 1. BADGE NOMOR AYAT ORNAMEN */}
                        <div className="flex items-center justify-center px-3 py-1 bg-gradient-to-r from-[#0a7c29] to-[#064e1c] text-amber-300 font-mono text-xs sm:text-sm font-black rounded-lg border-2 border-slate-300 shadow-xs">
                          {ayat.nomorAyat}
                        </div>

                        {/* 2. TOMBOL TAFSIR & RINCIAN (BUKU TERBUKA - SCREENSHOT 1 & 7) */}
                        <button
                          onClick={() => handleOpenRincian(ayat)}
                          className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[#0a7c29] dark:text-emerald-400 font-bold text-xs flex items-center gap-1 hover:bg-emerald-50 active:scale-95 transition shadow-2xs"
                          title="Buka Rincian & Tafsir Kemenag"
                        >
                          <BookOpen className="w-4 h-4 stroke-[2.3]" />
                          <span className="hidden sm:inline">Tafsir</span>
                        </button>

                        {/* 3. TOMBOL SALIN (COPY) */}
                        <button
                          onClick={() => handleCopyAyat(ayat)}
                          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 hover:bg-slate-100 active:scale-95 transition shadow-2xs"
                          title="Salin Ayat & Terjemah"
                        >
                          {copiedAyatNum === ayat.nomorAyat ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span className="hidden sm:inline">Salin</span>
                        </button>

                        {/* 4. TOMBOL SHARE (SCREENSHOT 8 & 9) */}
                        <button
                          onClick={() => handleOpenShareModal(ayat)}
                          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 hover:bg-slate-100 active:scale-95 transition shadow-2xs"
                          title="Bagikan Ayat (Gambar / Teks)"
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Share</span>
                        </button>

                        {/* 5. TOMBOL TANDAI CATATAN */}
                        <button
                          onClick={() => handleOpenNoteModal(ayat)}
                          className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1 transition active:scale-95 shadow-2xs ${
                            savedNote
                              ? 'bg-amber-100 border-amber-300 text-amber-800'
                              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                          title="Tandai Catatan Pribadi"
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

                        {/* 7. TOMBOL TAJWID GUIDE */}
                        <button
                          onClick={() => setShowTajweedGuide(true)}
                          className="p-1.5 sm:px-2 sm:py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 hover:bg-slate-100 active:scale-95 transition shadow-2xs"
                          title="Panduan Warna Tajwid"
                        >
                          <HelpCircle className="w-4 h-4 text-emerald-600" />
                          <span className="hidden sm:inline">Tajwid</span>
                        </button>
                      </div>

                      {/* 8. TOMBOL PUTAR AUDIO PER AYAT */}
                      <button
                        onClick={() => playAyatAudio(index)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition active:scale-95 ${
                          isAudioPlaying
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50'
                        }`}
                        title="Putar Audio Ayat"
                      >
                        {isAudioPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-[#0a7c29] dark:text-emerald-400" />
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
        {/* MODAL 2: PENGATURAN LENGKAP (SCREENSHOT 3, 4, 5, 6)       */}
        {/* ======================================================== */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md max-h-[90vh] rounded-3xl bg-[#dcfce7] dark:bg-slate-900 border-2 border-[#0a7c29] shadow-2xl flex flex-col overflow-hidden">
              {/* Header Hijau Pengaturan */}
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <h3 className="text-base font-black">Pengaturan</h3>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Konten Pengaturan Sesuai Screenshot 3, 4, 5, 6 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-bold text-slate-800 dark:text-slate-200">
                {/* 1. SLIDER HURUF ARAB (Screenshot 4) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Huruf Arab</span>
                    <span className="font-mono text-sm px-2 py-0.5 bg-white dark:bg-slate-800 rounded-lg border border-emerald-300">
                      {arabicFontSize}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="42"
                    value={arabicFontSize}
                    onChange={(e) => handleArabicSizeChange(parseInt(e.target.value, 10))}
                    className="w-full accent-[#0a7c29] cursor-pointer"
                  />
                </div>

                {/* 2. SLIDER HURUF LATIN (Screenshot 4) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Huruf Latin</span>
                    <span className="font-mono text-sm px-2 py-0.5 bg-white dark:bg-slate-800 rounded-lg border border-emerald-300">
                      {latinFontSize}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={latinFontSize}
                    onChange={(e) => handleLatinSizeChange(parseInt(e.target.value, 10))}
                    className="w-full accent-[#0a7c29] cursor-pointer"
                  />
                </div>

                {/* 3. SECTION: TERJEMAHAN DAN LATIN (Screenshot 4) */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
                    Terjemahan dan Latin
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <span>Latin</span>
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
                    <span>Terjemahan</span>
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition ${
                        showTranslation ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${showTranslation ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <span>Hizb (Maqra')</span>
                    <button
                      onClick={() => setShowHizb(!showHizb)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition ${
                        showHizb ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${showHizb ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>
                </div>

                {/* 4. SECTION: TAJWID & RINCIAN WARNA (Screenshot 3) */}
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

                  <div className="grid grid-cols-1 gap-1.5 px-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Madd 2-4-6 Harakat</span>
                      <span className="w-5 h-5 rounded-full bg-[#16a34a] border border-slate-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Madd 4-5 Harakat</span>
                      <span className="w-5 h-5 rounded-full bg-[#0284c7] border border-slate-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Madd 6 Harakat</span>
                      <span className="w-5 h-5 rounded-full bg-[#f43f5e] border border-slate-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Idgam Bigunnah</span>
                      <span className="w-5 h-5 rounded-full bg-[#f43f5e] border border-slate-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Idgam Bilagunnah</span>
                      <span className="w-5 h-5 rounded-full bg-[#dc2626] border border-slate-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ikhfa</span>
                      <span className="w-5 h-5 rounded-full bg-[#16a34a] border border-slate-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Iqlab</span>
                      <span className="w-5 h-5 rounded-full bg-[#0284c7] border border-slate-400" />
                    </div>
                  </div>
                </div>

                {/* 5. SECTION: GAYA HURUF PANJANG (KASHIDA SEPERTI SCREENSHOT 2) */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
                    Gaya Kaligrafi Arab
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span>Huruf Panjang & Renggang (Kashida)</span>
                    <button
                      onClick={() => setIsKashidaLong(!isKashidaLong)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition ${
                        isKashidaLong ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${isKashidaLong ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>
                </div>

                {/* 6. SECTION: MUSHAF & TAMPILAN (Screenshot 4 & 5) */}
                <div className="space-y-2 pt-2 border-t border-emerald-300/60 dark:border-slate-800">
                  <div className="bg-[#86efac]/50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
                    Mushaf
                  </div>
                  <div className="flex items-center gap-6 px-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className={`w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center ${mushafType === 'indonesia' ? 'bg-amber-400' : 'bg-emerald-800'}`} />
                      <span>Indonesia</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className={`w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center ${mushafType === 'madinah' ? 'bg-amber-400' : 'bg-emerald-800'}`} />
                      <span>Madinah</span>
                    </label>
                  </div>
                </div>

                {/* 7. SECTION: PILIHAN QARI MUROTTAL */}
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

                {/* 8. BUTTON PILIH TERJEMAHAN (Screenshot 6) */}
                <div className="pt-2">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-[#0a7c29] text-white font-bold text-xs text-center shadow-xs">
                    Indonesia - Kemenag thn 2019
                  </div>
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
        {/* MODAL 3: SHARE AYAT (CARD MAKER PERSIS SCREENSHOT 8 & 9)   */}
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

              {/* Body: Preview Kartu Ayat Persis Screenshot 9 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* PREVIEW KARTU GAMBAR AYAT */}
                <div
                  className={`w-full rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all ${
                    shareCardFormat === 'kotak' ? 'aspect-square' : 'min-h-[340px]'
                  } ${
                    shareBgTheme === 'nature'
                      ? 'bg-gradient-to-b from-amber-950/90 via-emerald-950/90 to-slate-950'
                      : shareBgTheme === 'kaaba'
                      ? 'bg-gradient-to-b from-slate-950 via-zinc-900 to-amber-950'
                      : shareBgTheme === 'emerald'
                      ? 'bg-gradient-to-b from-[#064e1c] via-[#0b6623] to-[#04280f]'
                      : 'bg-slate-950'
                  }`}
                >
                  {/* Decorative background overlay */}
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                  {/* Header Kartu: Ar-Ra'd : 30 (Kuning Emas Kaligrafi) */}
                  <div className="relative z-10 text-center pt-2">
                    <h2 className="text-2xl font-black text-amber-300 tracking-wide font-serif drop-shadow-md">
                      {selectedSurah.namaLatin} : {showShareModal.nomorAyat}
                    </h2>
                  </div>

                  {/* Teks Arab & Terjemahan Tengah */}
                  <div className="relative z-10 space-y-3 my-auto py-3 text-center">
                    <p className="font-quran-lpmq text-xl sm:text-2xl text-amber-100 leading-loose drop-shadow-md" dir="rtl">
                      {showShareModal.teksArab}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-sm px-2">
                      "{showShareModal.teksIndonesia}"
                    </p>
                  </div>

                  {/* Footer Kartu: Logo Kanomas Tour & Travel */}
                  <div className="relative z-10 text-center border-t border-white/20 pt-2 flex items-center justify-center gap-2">
                    <img src="/assets/logo-kanomas.png" alt="Kanomas" className="w-5 h-5 object-contain" />
                    <span className="text-[11px] font-bold text-amber-200">
                      Kanomas Tour & Travel
                    </span>
                  </div>
                </div>

                {/* Kontrol Format Kartu (Screenshot 9) */}
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setShareCardFormat('portrait')}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition ${
                      shareCardFormat === 'portrait'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>Share Portrait</span>
                  </button>
                  <button
                    onClick={() => setShareCardFormat('kotak')}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition ${
                      shareCardFormat === 'kotak'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>Share Kotak</span>
                  </button>
                </div>

                {/* Pilihan Wallpaper / Tema Background */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-slate-400 font-bold block">Pilihan Tema Kartu:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'nature', name: 'Alam' },
                      { id: 'kaaba', name: 'Ka’bah' },
                      { id: 'emerald', name: 'Hijau' },
                      { id: 'dark', name: 'Hitam' }
                    ].map((th) => (
                      <button
                        key={th.id}
                        onClick={() => setShareBgTheme(th.id)}
                        className={`py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                          shareBgTheme === th.id
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {th.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tombol SHARE Utama (Screenshot 8 & 9) */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleQuickShareWA(showShareModal)}
                    className="w-full py-3 rounded-2xl bg-[#0a7c29] hover:bg-emerald-700 text-white font-black text-sm tracking-wider uppercase shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>SHARE AYAT</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 4: CATATAN PRIBADI AYAT                             */}
        {/* ======================================================== */}
        {showNoteModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
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
                  Tuliskan refleksi / renungan ibadah Anda:
                </label>
                <textarea
                  rows="4"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Misal: Dibaca saat berada di Raudhah, terasa sangat menenangkan hati..."
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-xs active:scale-95 transition"
                >
                  Simpan Catatan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 5: LONCAT KE AYAT TERTENTU                         */}
        {/* ======================================================== */}
        {showJumpModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#0a7c29]" />
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
                  className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-base font-mono text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#0a7c29]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleJumpToAyat(jumpInput)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0a7c29] hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active:scale-95 transition"
                >
                  Loncat ke Ayat
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 6: PANDUAN WARNA TAJWID                            */}
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
                  <span className="w-5 h-5 rounded-full bg-[#f43f5e] flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Pink / Magenta: Idgam Bigunnah & Ghunnah</span>
                    <span className="text-[11px] text-slate-500">Dengung 2 harakat saat bertemu mim/nun tasydid</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#0284c7] flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Biru Cerah: Qalqalah & Iqlab</span>
                    <span className="text-[11px] text-slate-500">Pantulan huruf sukun baju di thoko</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#16a34a] flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Hijau: Ikhfa & Madd 2-4-6</span>
                    <span className="text-[11px] text-slate-500">Samar-samar berdengung dan panjang harakat</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#dc2626] flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Merah: Idgam Bilagunnah & Madd Lazim</span>
                    <span className="text-[11px] text-slate-500">Lebur tanpa dengung / Mad panjang</span>
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
