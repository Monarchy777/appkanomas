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
  Image as ImageIcon,
  Download,
  Calendar,
  Plus,
  CheckCircle,
  CheckCircle2,
  Target,
  ArrowRight,
  Languages,
  ListOrdered,
  Pin,
  Award
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { Capacitor } from '@capacitor/core';
import { Share as CapShare } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';


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

// DAFTAR 30 JUZ RESMI AL-QUR'AN BESERTA AYAT AWAL DAN AKHIR
export const JUZ_LIST = [
  { juz: 1, surahNomor: 1, surahName: "Al-Fatihah", ayat: 1, endSurah: "Al-Baqarah", endAyat: 141, totalAyat: 148 },
  { juz: 2, surahNomor: 2, surahName: "Al-Baqarah", ayat: 142, endSurah: "Al-Baqarah", endAyat: 252, totalAyat: 111 },
  { juz: 3, surahNomor: 2, surahName: "Al-Baqarah", ayat: 253, endSurah: "Ali 'Imran", endAyat: 92, totalAyat: 126 },
  { juz: 4, surahNomor: 3, surahName: "Ali 'Imran", ayat: 93, endSurah: "An-Nisa'", endAyat: 23, totalAyat: 131 },
  { juz: 5, surahNomor: 4, surahName: "An-Nisa'", ayat: 24, endSurah: "An-Nisa'", endAyat: 147, totalAyat: 124 },
  { juz: 6, surahNomor: 4, surahName: "An-Nisa'", ayat: 148, endSurah: "Al-Ma'idah", endAyat: 81, totalAyat: 110 },
  { juz: 7, surahNomor: 5, surahName: "Al-Ma'idah", ayat: 82, endSurah: "Al-An'am", endAyat: 110, totalAyat: 149 },
  { juz: 8, surahNomor: 6, surahName: "Al-An'am", ayat: 111, endSurah: "Al-A'raf", endAyat: 87, totalAyat: 142 },
  { juz: 9, surahNomor: 7, surahName: "Al-A'raf", ayat: 88, endSurah: "Al-Anfal", endAyat: 40, totalAyat: 159 },
  { juz: 10, surahNomor: 8, surahName: "Al-Anfal", ayat: 41, endSurah: "At-Taubah", endAyat: 92, totalAyat: 127 },
  { juz: 11, surahNomor: 9, surahName: "At-Taubah", ayat: 93, endSurah: "Hud", endAyat: 5, totalAyat: 151 },
  { juz: 12, surahNomor: 11, surahName: "Hud", ayat: 6, endSurah: "Yusuf", endAyat: 52, totalAyat: 170 },
  { juz: 13, surahNomor: 12, surahName: "Yusuf", ayat: 53, endSurah: "Ibrahim", endAyat: 52, totalAyat: 154 },
  { juz: 14, surahNomor: 15, surahName: "Al-Hijr", ayat: 1, endSurah: "An-Nahl", endAyat: 128, totalAyat: 227 },
  { juz: 15, surahNomor: 17, surahName: "Al-Isra'", ayat: 1, endSurah: "Al-Kahf", endAyat: 74, totalAyat: 185 },
  { juz: 16, surahNomor: 18, surahName: "Al-Kahf", ayat: 75, endSurah: "Taha", endAyat: 135, totalAyat: 269 },
  { juz: 17, surahNomor: 21, surahName: "Al-Anbiya'", ayat: 1, endSurah: "Al-Hajj", endAyat: 78, totalAyat: 190 },
  { juz: 18, surahNomor: 23, surahName: "Al-Mu'minun", ayat: 1, endSurah: "Al-Furqan", endAyat: 20, totalAyat: 202 },
  { juz: 19, surahNomor: 25, surahName: "Al-Furqan", ayat: 21, endSurah: "An-Naml", endAyat: 55, totalAyat: 339 },
  { juz: 20, surahNomor: 27, surahName: "An-Naml", ayat: 56, endSurah: "Al-'Ankabut", endAyat: 45, totalAyat: 171 },
  { juz: 21, surahNomor: 29, surahName: "Al-'Ankabut", ayat: 46, endSurah: "Al-Ahzab", endAyat: 30, totalAyat: 178 },
  { juz: 22, surahNomor: 33, surahName: "Al-Ahzab", ayat: 31, endSurah: "Yasin", endAyat: 27, totalAyat: 169 },
  { juz: 23, surahNomor: 36, surahName: "Yasin", ayat: 28, endSurah: "Az-Zumar", endAyat: 31, totalAyat: 357 },
  { juz: 24, surahNomor: 39, surahName: "Az-Zumar", ayat: 32, endSurah: "Fussilat", endAyat: 46, totalAyat: 175 },
  { juz: 25, surahNomor: 41, surahName: "Fussilat", ayat: 47, endSurah: "Al-Jasiyah", endAyat: 37, totalAyat: 246 },
  { juz: 26, surahNomor: 46, surahName: "Al-Ahqaf", ayat: 1, endSurah: "Az-Zariyat", endAyat: 30, totalAyat: 195 },
  { juz: 27, surahNomor: 51, surahName: "Az-Zariyat", ayat: 31, endSurah: "Al-Hadid", endAyat: 29, totalAyat: 399 },
  { juz: 28, surahNomor: 58, surahName: "Al-Mujadilah", ayat: 1, endSurah: "At-Tahrim", endAyat: 12, totalAyat: 137 },
  { juz: 29, surahNomor: 67, surahName: "Al-Mulk", ayat: 1, endSurah: "Al-Mursalat", endAyat: 50, totalAyat: 431 },
  { juz: 30, surahNomor: 78, surahName: "An-Naba'", ayat: 1, endSurah: "An-Nas", endAyat: 6, totalAyat: 564 }
];

// DAFTAR QARI PILIHAN INTERNASIONAL
const QARI_LIST = [
  { id: '05', name: 'Syaikh Misyari Rasyid Al-Afasy' },
  { id: '03', name: 'Syaikh Abdurrahman As-Sudais (Imam Ka’bah)' },
  { id: '01', name: 'Syaikh Abdullah Al-Juhany (Imam Haram)' },
  { id: '06', name: 'Syaikh Yasser Al-Dosari' }
];

// PALET TEMA PEMBACAAN DENGAN KONTRAS TINGGI TERJAMIN
export const THEME_PALETTES = {
  mushaf: {
    id: 'mushaf',
    name: 'Hijau Kemenag',
    type: 'color',
    bg: '#e8f9eb',
    arabicColor: '#000000',
    latinColor: '#064e3b',
    translationColor: '#0f172a',
    subHeaderBg: 'bg-[#bbf7d0] text-emerald-950 border-emerald-400',
    bismillahColor: '#064e3b',
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
    translationColor: '#0f172a',
    subHeaderBg: 'bg-slate-100 text-slate-900 border-slate-300',
    bismillahColor: '#0f172a',
    borderDivider: '#cbd5e1',
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
  cream: {
    id: 'cream',
    name: 'Krem Antik',
    type: 'color',
    bg: '#fdfbf7',
    arabicColor: '#18181b',
    latinColor: '#059669',
    translationColor: '#334155',
    subHeaderBg: 'bg-[#f5efe6] text-slate-900 border-amber-200',
    bismillahColor: '#1e293b',
    borderDivider: '#e7e0d3',
    highlightBg: 'bg-amber-100 ring-2 ring-amber-400',
    activeAudioBg: 'bg-emerald-50 ring-2 ring-emerald-500',
    isDark: false
  }
};

// ATURAN WARNA TAJWID IDENTIK PERSIS DENGAN MYQURAN (8 HUKUM RESMI)
export const TAJWEED_THEME_RULES = {
  mushaf: {
    madd246: '#00ac51',          // Madd 2-4-6 Harakat (Hijau Segar MyQuran)
    madd45: '#00b0fc',           // Madd 4-5 Harakat (Biru Langit / Cyan)
    madd6: '#ff57bc',            // Madd 6 Harakat (Pink Magenta)
    idghamBighunnah: '#ff5896',  // Idgam Bigunnah & Ghunnah (Rose Pink)
    idghamBilagunnah: '#f91923', // Idgam Bilagunnah (Merah Cerah)
    ikhfa: '#00c055',            // Ikhfa (Hijau Mint Terang)
    iqlab: '#00afff',            // Iqlab (Biru Muda / Sky Blue)
    qalqalah: '#407af8',         // Qalqalah (Biru Kerajaan / Royal Blue)
    // Aliases
    ghunnah: '#ff5896',
    idghamBila: '#f91923',
    madd: '#00b0fc',
    maddLazim: '#ff57bc',
    base: '#022c22'
  },
  light: {
    madd246: '#00ac51',
    madd45: '#00b0fc',
    madd6: '#ff57bc',
    idghamBighunnah: '#ff5896',
    idghamBilagunnah: '#f91923',
    ikhfa: '#00c055',
    iqlab: '#00afff',
    qalqalah: '#407af8',
    ghunnah: '#ff5896',
    idghamBila: '#f91923',
    madd: '#00b0fc',
    maddLazim: '#ff57bc',
    base: '#000000'
  },
  dark: {
    madd246: '#22c55e',          // Madd 2-4-6 Harakat (Emerald)
    madd45: '#38bdf8',           // Madd 4-5 Harakat (Sky Blue)
    madd6: '#f472b6',            // Madd 6 Harakat (Pink)
    idghamBighunnah: '#fb7185',  // Idgam Bigunnah (Light Rose)
    idghamBilagunnah: '#ff4d4f', // Idgam Bilagunnah (Red)
    ikhfa: '#40d093',            // Ikhfa (Mint Teal)
    iqlab: '#38bdf8',            // Iqlab (Cyan)
    qalqalah: '#60a5fa',         // Qalqalah (Blue)
    ghunnah: '#fb7185',
    idghamBila: '#ff4d4f',
    madd: '#38bdf8',
    maddLazim: '#f472b6',
    base: '#ffffff'
  },
  sepia: {
    madd246: '#15803d',
    madd45: '#0284c7',
    madd6: '#db2777',
    idghamBighunnah: '#e11d48',
    idghamBilagunnah: '#dc2626',
    ikhfa: '#16a34a',
    iqlab: '#0284c7',
    qalqalah: '#2563eb',
    ghunnah: '#e11d48',
    idghamBila: '#dc2626',
    madd: '#0284c7',
    maddLazim: '#db2777',
    base: '#1c1917'
  },
  navy: {
    madd246: '#22c55e',
    madd45: '#38bdf8',
    madd6: '#f472b6',
    idghamBighunnah: '#fb7185',
    idghamBilagunnah: '#ff4d4f',
    ikhfa: '#40d093',
    iqlab: '#38bdf8',
    qalqalah: '#60a5fa',
    ghunnah: '#fb7185',
    idghamBila: '#ff4d4f',
    madd: '#38bdf8',
    maddLazim: '#f472b6',
    base: '#ffffff'
  },
  cream: {
    madd246: '#00ac51',
    madd45: '#00b0fc',
    madd6: '#ff57bc',
    idghamBighunnah: '#ff5896',
    idghamBilagunnah: '#f91923',
    ikhfa: '#00c055',
    iqlab: '#00afff',
    qalqalah: '#407af8',
    ghunnah: '#ff5896',
    idghamBila: '#f91923',
    madd: '#00b0fc',
    maddLazim: '#ff57bc',
    base: '#18181b'
  },
  kabah: {
    madd246: '#22c55e',
    madd45: '#38bdf8',
    madd6: '#f472b6',
    idghamBighunnah: '#fb7185',
    idghamBilagunnah: '#ff4d4f',
    ikhfa: '#40d093',
    iqlab: '#38bdf8',
    qalqalah: '#60a5fa',
    ghunnah: '#fb7185',
    idghamBila: '#ff4d4f',
    madd: '#38bdf8',
    maddLazim: '#f472b6',
    base: '#ffffff'
  },
  nature: {
    madd246: '#22c55e',
    madd45: '#38bdf8',
    madd6: '#f472b6',
    idghamBighunnah: '#fb7185',
    idghamBilagunnah: '#ff4d4f',
    ikhfa: '#40d093',
    iqlab: '#38bdf8',
    qalqalah: '#60a5fa',
    ghunnah: '#fb7185',
    idghamBila: '#ff4d4f',
    madd: '#38bdf8',
    maddLazim: '#f472b6',
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

// FUNGSI KASHIDA / TATWEEL (MEMPERTAHANKAN KEASLIAN KALIGRAFI TANPA MERUSAK FONT LIGATUR)
export function applyKashidaToArabic(text) {
  if (!text) return '';
  return text;
}

// NORMALISASI TEKS ARAB AL-QUR'AN (MEMPERBAIKI FATHATAIN, NORMALISASI MEEM IQLAB, & MERAPIKAN WAQAF)
export function normalizeQuranText(text, isMadinah = false) {
  if (!text) return '';
  let cleaned = text
    // 1. Normalisasi meem iqlab Tanzil (\u06ED) ke standard small high meem (\u06E2) agar iqlab terbaca rapi di semua font
    .replace(/\u06ED/g, '\u06E2')
    .replace(/[\u06EA\u06EB]/g, '')
    // 2. Bersihkan karakter kontrol tak kasat mata
    .replace(/[\uFEFF\u200B\u200C\u200E\u200F]/g, '')
    // 3. Pisahkan tanda waqaf baik sebelum maupun sesudahnya agar tidak menindih huruf/tanwin
    .replace(/([^\s])([ۖ-ۜۘ-ۛ])/g, '$1 $2')
    .replace(/([ۖ-ۜۘ-ۛ])([^\s])/g, '$1 $2')
    // 4. Hapus tanda ruku khusus Kemenag (ࣖ) yang tidak didukung font modern
    .replace(/\u08D6/g, '')
    // 5. Normalisasi small madda (ۤ) ke standard madda (ٓ)
    .replace(/\u06E4/g, '\u0653');

  // 6. Pada Mushaf Madinah, gunakan sukun resmi Rasm Utsmani Madinah (kepala kha' \u06E1) persis MyQuran
  if (isMadinah) {
    cleaned = cleaned.replace(/\u0652/g, '\u06E1');
  }

  cleaned = cleaned.replace(/\s+/g, ' ');
  return cleaned.trim();
}

// RENDER TAJWID AMAN DENGAN RTL MURNI, KAIDAH ILMU TAJWID PERSIS MYQURAN, & TANPA ZWJ (ANTI-MENUMPUK)
function renderSafeTajweed(text, themeMode = 'mushaf', showTajweed = true, wbwOptions = null, tajweedFilters = null) {
  if (!text) return null;
  const palette = TAJWEED_THEME_RULES[themeMode] || TAJWEED_THEME_RULES.mushaf;

  // Master switch check: jika tajwid dimatikan global atau via filter master
  const isMasterActive = showTajweed && (tajweedFilters ? tajweedFilters.master !== false : true);

  const annotations = new Map();

  if (isMasterActive) {
    // Helper untuk cek apakah aturan tajwid tertentu diaktifkan user
    const isFilterOn = (key) => (!tajweedFilters || tajweedFilters[key] !== false);

    // 1. Ekstrak seluruh grapheme cluster dari teks ayat lengkap
    const GRAPHEME_REGEX = /([\u0621-\u063F\u0641-\u064A\u0671-\u06D3])([\u0610-\u061A\u0640\u064B-\u065F\u0670\u06D6-\u06ED]*)/g;
    const graphemes = [];
    let match;

    while ((match = GRAPHEME_REGEX.exec(text)) !== null) {
      graphemes.push({
        base: match[1],
        marks: match[2] || '',
        full: match[0],
        start: match.index,
        end: GRAPHEME_REGEX.lastIndex
      });
    }

    // 2. Petakan aturan tajwid ke setiap grapheme dengan kaidah persis MyQuran
    for (let i = 0; i < graphemes.length; i++) {
      const g = graphemes[i];
      const base = g.base;
      const marks = g.marks;

      let nextGrapheme = null;
      for (let j = i + 1; j < graphemes.length; j++) {
        const nb = graphemes[j].base;
        if ((nb === 'ا' || nb === 'ى' || nb === 'ٱ') && !/[\u064B-\u0652]/.test(graphemes[j].marks)) {
          continue;
        }
        nextGrapheme = graphemes[j];
        break;
      }

      const nextBase = nextGrapheme ? nextGrapheme.base : null;
      const nextMarks = nextGrapheme ? nextGrapheme.marks : '';

      const isTanwin = marks.includes('\u064B') || marks.includes('\u064C') || marks.includes('\u064D');
      const isNunSakinah = (base === 'ن') && (marks.includes('\u0652') || marks.includes('\u06E1') || (!/[\u064E\u064F\u0650\u0651]/.test(marks) && nextBase !== null));
      const hasSmallMeem = marks.includes('\u06E2') || marks.includes('\u06ED');

      let color = null;
      let title = '';

      // A. Madd 6 Harakat (Mad Lazim) - Pink Magenta MyQuran
      if ((marks.includes('\u0653') || marks.includes('~')) && nextMarks.includes('\u0651')) {
        if (isFilterOn('madd6')) {
          color = palette.madd6;
          title = 'Madd 6 Harakat (Mad Lazim)';
        }
      }
      // B. Madd 4-5 Harakat (Mad Wajib Muttashil & Mad Jaiz Munfashil) - Biru Langit MyQuran
      else if (marks.includes('\u0653') || marks.includes('~')) {
        if (isFilterOn('madd45')) {
          color = palette.madd45;
          title = 'Madd 4-5 Harakat (Mad Wajib / Jaiz)';
        }
      }
      // C. Hukum Nun Sakinah & Tanwin
      else if (isTanwin || isNunSakinah || hasSmallMeem) {
        // C1. Iqlab (Nun/Tanwin bertemu Ba) - Biru Muda MyQuran
        if (hasSmallMeem || nextBase === 'ب') {
          if (isFilterOn('iqlab')) {
            color = palette.iqlab;
            title = 'Iqlab (Nun/Tanwin menjadi Mim & Dengung saat bertemu Ba)';
            if (nextGrapheme) {
              annotations.set(nextGrapheme.start, { color: palette.iqlab, title, full: nextGrapheme.full, end: nextGrapheme.end, base: nextGrapheme.base });
            }
          }
        }
        // C2. Idgam Bigunnah (Nun/Tanwin bertemu ينمو) - Rose Pink MyQuran
        else if (nextBase && 'ينمو'.includes(nextBase)) {
          if (isFilterOn('idghamBighunnah')) {
            color = palette.idghamBighunnah;
            title = 'Idgam Bigunnah (Melebur dengan Dengung 2 Harakat)';
            if (nextGrapheme) {
              annotations.set(nextGrapheme.start, { color: palette.idghamBighunnah, title, full: nextGrapheme.full, end: nextGrapheme.end, base: nextGrapheme.base });
            }
          }
        }
        // C3. Idgam Bilagunnah (Nun/Tanwin bertemu ل / ر) - Merah Cerah MyQuran
        else if (nextBase && 'لر'.includes(nextBase)) {
          if (isFilterOn('idghamBilagunnah')) {
            color = palette.idghamBilagunnah;
            title = 'Idgam Bilagunnah (Melebur Tanpa Dengung)';
            if (nextGrapheme) {
              annotations.set(nextGrapheme.start, { color: palette.idghamBilagunnah, title, full: nextGrapheme.full, end: nextGrapheme.end, base: nextGrapheme.base });
            }
          }
        }
        // C4. Idzhar Halqi (ء ه ع ح غ خ) - Jelas / Tanpa Warna
        else if (nextBase && 'ءأإهعحغخ'.includes(nextBase)) {
          color = null;
        }
        // C5. Ikhfa Haqiqi (15 huruf) - Hijau Mint MyQuran (Hanya nun/tanwin yang diwarnai)
        else if (nextBase && 'تثجدذزسشصضطظفقك'.includes(nextBase)) {
          if (isFilterOn('ikhfa')) {
            color = palette.ikhfa;
            title = 'Ikhfa (Samar-samar dengan Dengung)';
          }
        }
      }
      // D. Ghunnah Musyaddadah (Nun bertasydid / Mim bertasydid) - Rose Pink MyQuran
      else if ((base === 'ن' || base === 'م') && marks.includes('\u0651')) {
        if (isFilterOn('idghamBighunnah')) {
          color = palette.idghamBighunnah;
          title = 'Idgam Bigunnah / Ghunnah (Dengung 2 Harakat)';
        }
      }
      // E. Hukum Mim Sakinah
      else if (base === 'م' && (marks.includes('\u0652') || marks.includes('\u06E1') || (!/[\u064E\u064F\u0650\u0651]/.test(marks) && nextBase !== null))) {
        if (nextBase === 'ب') {
          if (isFilterOn('ikhfa')) {
            color = palette.ikhfa;
            title = 'Ikhfa Syafawi (Mim Sukun bertemu Ba, Samar dengan Dengung)';
          }
        } else if (nextBase === 'م') {
          if (isFilterOn('idghamBighunnah')) {
            color = palette.idghamBighunnah;
            title = 'Idgham Mimi / Mutamatsilain (Dengung 2 Harakat)';
            if (nextGrapheme) {
              annotations.set(nextGrapheme.start, { color: palette.idghamBighunnah, title, full: nextGrapheme.full, end: nextGrapheme.end, base: nextGrapheme.base });
            }
          }
        }
      }
      // F. Qalqalah (Baju Di Thoko: قطبجد) - Biru Kerajaan MyQuran
      else if ('قطبجد'.includes(base) && (marks.includes('\u0652') || marks.includes('\u06E1') || (!nextBase && !/[\u064E\u064F\u0650\u0651]/.test(marks)))) {
        if (isFilterOn('qalqalah')) {
          color = palette.qalqalah;
          title = 'Qalqalah (Pantulan Suara)';
        }
      }

      if (color && !annotations.has(g.start)) {
        annotations.set(g.start, { color, title, full: g.full, end: g.end, base: g.base });
        // Jika hukum tanwin (fathatan) diikuti oleh Alif penopang tanpa harakat (e.g. جًا):
        // Satukan alif dalam warna yang sama agar ligatur tidak terbelah & posisi fathatan tetap sempurna!
        if (isTanwin && marks.includes('\u064B')) {
          const nextIndex = i + 1;
          if (nextIndex < graphemes.length) {
            const nextG = graphemes[nextIndex];
            if ((nextG.base === 'ا' || nextG.base === 'ى') && !/[\u064B-\u0652]/.test(nextG.marks)) {
              if (!annotations.has(nextG.start)) {
                annotations.set(nextG.start, { color, title, full: nextG.full, end: nextG.end, base: nextG.base });
              }
            }
          }
        }
      }
    }

    // G. Madd 2-4-6 Harakat (Mad 'Aridh Lissukun pada akhir ayat) - Hijau Segar MyQuran
    if (isFilterOn('madd246') && graphemes.length >= 2) {
      const secondLastG = graphemes[graphemes.length - 2];
      if ('ويى'.includes(secondLastG.base) && !annotations.has(secondLastG.start)) {
        annotations.set(secondLastG.start, {
          color: palette.madd246,
          title: "Madd 2-4-6 Harakat (Mad 'Aridh Lissukun)",
          full: secondLastG.full,
          end: secondLastG.end,
          base: secondLastG.base
        });
      }
    }
  }

  // 3. Render per-kata MURNI TANPA ZWJ (mencegah penumpukan tanda baca dan huruf saling menimpa)
  const cleanText = text.trim();
  const words = cleanText.split(/\s+/);
  let charCursor = 0;
  let wbwCounter = 0;

  return words.map((word, wordIdx) => {
    const wordStart = text.indexOf(word, charCursor);
    const wordEnd = wordStart + word.length;
    charCursor = wordEnd;

    const isWaqfToken = /^[\u06D5-\u06ED\u08D0-\u08FF]+$/.test(word.trim());
    let currentWbwItem = null;
    if (wbwOptions && wbwOptions.wbwWords && !isWaqfToken) {
      currentWbwItem = wbwOptions.wbwWords[wbwCounter] || null;
      wbwCounter++;
    }

    let hasAnnotation = false;
    for (let c = 0; c < word.length; c++) {
      if (annotations.has(wordStart + c)) {
        hasAnnotation = true;
        break;
      }
    }

    let wordContent;
    if (!hasAnnotation) {
      wordContent = word;
    } else {
      const parts = [];
      let localIdx = 0;

      for (let c = 0; c < word.length; ) {
        const globalPos = wordStart + c;
        if (annotations.has(globalPos)) {
          const item = annotations.get(globalPos);
          if (c > localIdx) {
            parts.push(word.substring(localIdx, c));
          }

          parts.push(
            <span
              key={`g-${globalPos}`}
              style={{
                color: item.color,
                display: 'inline'
              }}
              className="select-text transition-colors duration-150"
              title={item.title}
            >
              {item.full}
            </span>
          );
          c += item.full.length;
          localIdx = c;
        } else {
          c++;
        }
      }

      if (localIdx < word.length) {
        parts.push(word.substring(localIdx));
      }
      wordContent = parts;
    }

    // Jika mode terjemah per kata aktif:
    if (wbwOptions && wbwOptions.wbwWords) {
      if (isWaqfToken) {
        return (
          <span
            key={`w-${wordIdx}`}
            className="inline-flex items-center px-1 self-center text-slate-500 opacity-70"
            style={{ direction: 'rtl' }}
          >
            {wordContent}
          </span>
        );
      }

      return (
        <div
          key={`wbw-${wordIdx}`}
          className="inline-flex flex-col items-center justify-start text-center px-1.5 py-0.5"
          style={{ direction: 'rtl', verticalAlign: 'top' }}
        >
          {/* Huruf Arab perkata */}
          <span
            style={{
              fontFamily: wbwOptions.activeFontFamily,
              fontSize: `${wbwOptions.arabicFontSize}px`,
              color: wbwOptions.arabicColor,
              lineHeight: wbwOptions.dynamicArabicLineHeight,
              fontWeight: 400
            }}
            className={`${wbwOptions.arabicFontClass} font-normal select-text`}
          >
            {wordContent}
          </span>

          {/* Arti perkata di bawah huruf Arab, bersih biasa saja tanpa blok hitam */}
          {currentWbwItem && (
            <span
              style={{
                color: wbwOptions.isDark ? '#94a3b8' : '#475569',
                maxWidth: '140px'
              }}
              className="text-[11px] sm:text-xs font-normal leading-tight text-center select-text mt-1 break-words opacity-90"
              dir="ltr"
            >
              {currentWbwItem.arti || '-'}
            </span>
          )}
        </div>
      );
    }

    // Tampilan ayat biasa saat terjemah per kata tidak aktif
    return (
      <span key={`w-${wordIdx}`} style={{ display: 'inline', unicodeBidi: 'isolate', fontWeight: 400 }}>
        {wordContent}
        {wordIdx < words.length - 1 ? ' ' : ''}
      </span>
    );
  });
}

export default function AlQuranModal({ onClose }) {
  // 1. Navigation & Views (Default: Interactive Index List View)
  const [viewState, setViewState] = useState('index'); // 'index' | 'reader'
  const [indexTab, setIndexTab] = useState('surah'); // 'surah' | 'juz' | 'khatam' | 'bookmarks'
  const [selectedSurah, setSelectedSurah] = useState(() => SURAH_LIST[0]); // Default 1 Al-Fatihah
  const [surahDetail, setSurahDetail] = useState(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [targetAyatToScroll, setTargetAyatToScroll] = useState(null);
  const [surahAyatJumpModal, setSurahAyatJumpModal] = useState(null);

  // 1A. Navigasi Cepat: Langsung Pilih Surat & Ayat
  const [quickSurahNum, setQuickSurahNum] = useState(1);
  const [quickAyatNum, setQuickAyatNum] = useState(1);
  const [showSurahPickerModal, setShowSurahPickerModal] = useState(false);
  const [showAyatGridPicker, setShowAyatGridPicker] = useState(false);
  const [quickSurahFilter, setQuickSurahFilter] = useState('');
  const currentQuickSurah = SURAH_LIST.find((s) => s.nomor === quickSurahNum) || SURAH_LIST[0];

  // 1B. Penanda Ayat Terakhir & Auto-Save
  const [lastReadPosition, setLastReadPosition] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 1C. Multi-Khataman Al-Quran (Bisa banyak khataman tanpa saling menindih)
  const [khatamanSessions, setKhatamanSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_khataman_sessions');
      return saved ? JSON.parse(saved) : [
        {
          id: 'khatam-1',
          title: 'Khataman Ramadhan',
          targetPerson: 'Pribadi',
          startDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          targetDays: 30,
          completedJuz: [],
          lastSurahNomor: 1,
          lastAyatNomor: 1,
          notes: 'Niat ikhlas lillahi ta\'ala'
        }
      ];
    } catch {
      return [];
    }
  });
  const [showNewKhatamModal, setShowNewKhatamModal] = useState(false);
  const [newKhatamInput, setNewKhatamInput] = useState({
    title: '',
    targetPerson: '',
    targetDays: 30,
    startDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // 1D. Fitur Arti Per Kata (Word-by-Word Translation)
  const [showWordByWord, setShowWordByWord] = useState(() => {
    try {
      return localStorage.getItem('kanomas_quran_wbw') === 'true';
    } catch {
      return false;
    }
  });
  const [wordByWordData, setWordByWordData] = useState({});
  const [loadingWordByWord, setLoadingWordByWord] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  // 2. 4 Mode Bacaan (Default: Mushaf Hijau)
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

  const [showTajweed, setShowTajweed] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_tajweed');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  // Filter 8 Kaidah Tajwid Resmi Identik MyQuran
  const [tajweedFilters, setTajweedFilters] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_tajweed_filters_v2');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      master: true,
      madd246: true,
      madd45: true,
      madd6: true,
      idghamBighunnah: true,
      idghamBilagunnah: true,
      ikhfa: true,
      iqlab: true,
      qalqalah: true
    };
  });
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showHizb, setShowHizb] = useState(true);
  
  // Pilihan Mushaf & Tulisan Arab Resmi ('indonesia' | 'madinah' | 'modern')
  const [mushafType, setMushafType] = useState(() => {
    try {
      return localStorage.getItem('kanomas_mushaf_type') || 'madinah';
    } catch {
      return 'madinah';
    }
  });

  // Mode Baca Bersih (Hidden Read): Opsi aksi baru muncul saat ayat diklik
  const [hiddenReadMode, setHiddenReadMode] = useState(() => {
    try {
      return localStorage.getItem('kanomas_hidden_read') !== 'false'; // Default TRUE
    } catch {
      return true;
    }
  });

  // Spasi Lapang & Anti-Menumpuk (Spacious Mode): Memberi jarak luas & sambungan datar yang nyaman dibaca
  const [spaciousMode, setSpaciousMode] = useState(() => {
    try {
      return localStorage.getItem('kanomas_quran_spacious') !== 'false'; // Default TRUE (Lega & Jelas)
    } catch {
      return true;
    }
  });

  const handleToggleSpaciousMode = (val) => {
    setSpaciousMode(val);
    try {
      localStorage.setItem('kanomas_quran_spacious', val ? 'true' : 'false');
    } catch {}
  };

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
  const shareCardRef = useRef(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');
  const [previewCardData, setPreviewCardData] = useState(null);

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

  // Lock body scroll & prevent iOS Safari native page zoom interference
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Prevent iOS Safari page-level gesture zoom so Quran pinch-to-zoom is seamless
    const preventGesture = (e) => {
      e.preventDefault();
    };
    document.addEventListener('gesturestart', preventGesture, { passive: false });
    document.addEventListener('gesturechange', preventGesture, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
    };
  }, []);

  // Pinch-to-zoom 2 jari: perbesar/perkecil huruf Arab atau Latin/Terjemah sesuai lokasi jari
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

      const isArabic = elem?.closest('[data-zoom-zone="arabic"]') || elem?.closest('[dir="rtl"]');
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
        const newSize = Math.round(Math.max(18, Math.min(54, initialZoomSize.current * ratio)));
        setArabicFontSize(newSize);
        if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
        setZoomIndicator({ show: true, label: 'Huruf Arab', size: newSize });
      } else if (touchZoomTarget.current === 'latin') {
        const newSize = Math.round(Math.max(12, Math.min(32, initialZoomSize.current * ratio)));
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
        localStorage.setItem('kanomas_arabic_size', String(arabicFontSize));
        localStorage.setItem('kanomas_latin_size', String(latinFontSize));
      } catch {}

      if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
      zoomTimeoutRef.current = setTimeout(() => {
        setZoomIndicator((prev) => ({ ...prev, show: false }));
      }, 1200);
    }
  };

  // Helper font family kaligrafi Arab aktif (Menggunakan font KFGQPC Hafs/Uthman Taha dengan penyambungan horizontal luas & anti-stacking)
  const getActiveFontFamily = () => {
    if (mushafType === 'modern') {
      return "'Noto Naskh Arabic', 'Plus Jakarta Sans', sans-serif";
    }
    // Baik Mushaf Madinah maupun Mushaf Indonesia menggunakan font kaligrafi horizontal luas KFGQPC (persis MyQuran)
    return "'KFGQPC Uthmanic Script HAFS', 'KFGQPC Uthman Taha Naskh', 'LPMQ Isep Misbah', 'Amiri Quran', 'Scheherazade New', serif";
  };

  // Helper kelas font kaligrafi Arab aktif
  const getArabicFontClass = () => {
    if (mushafType === 'madinah') return 'font-quran-madinah';
    if (mushafType === 'modern') return 'font-quran-modern';
    return 'font-quran-lpmq';
  };

  // Helper teks Arab ayat sesuai mushaf aktif dengan normalisasi menyeluruh
  const getAyatArabText = (ayat) => {
    if (!ayat) return '';
    const isMadinah = (mushafType === 'madinah' || mushafType === 'modern') && !!ayat.teksArabMadinah;
    const raw = isMadinah ? ayat.teksArabMadinah : (ayat.teksArab || '');
    return normalizeQuranText(raw, isMadinah);
  };

  // Save Preferences
  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    try {
      localStorage.setItem('kanomas_quran_theme', mode);
    } catch {}
  };

  const handleToggleTajweed = () => {
    setShowTajweed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('kanomas_quran_tajweed', String(next));
      } catch {}
      return next;
    });
  };

  const handleToggleTajweedFilter = (key) => {
    setTajweedFilters((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('kanomas_tajweed_filters_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
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

  const handleToggleHiddenRead = (val) => {
    setHiddenReadMode(val);
    try {
      localStorage.setItem('kanomas_hidden_read', val ? 'true' : 'false');
    } catch {}
  };

  // 1E. Posisi Terakhir & Navigasi
  const saveLastRead = (surah, ayatNomor) => {
    if (!surah) return;
    const data = {
      surahNomor: surah.nomor,
      surahName: surah.namaLatin,
      surahArabic: surah.nama,
      arti: surah.arti,
      tempatTurun: surah.tempatTurun,
      ayatNomor: Number(ayatNomor) || 1,
      totalAyat: surah.jumlahAyat,
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setLastReadPosition(data);
    try {
      localStorage.setItem('kanomas_quran_last_read', JSON.stringify(data));
    } catch (e) {}
    showToast(`📌 Ditandai: QS. ${surah.namaLatin} Ayat ${ayatNomor || 1}`);
  };

  const handleCloseQuran = () => {
    if (selectedSurah) {
      saveLastRead(selectedSurah, activeAyatId || targetAyatToScroll || 1);
    }
    onClose();
  };

  const handleOpenSurah = (surah, targetAyat = 1) => {
    setSelectedSurah(surah);
    setViewState('reader');
    setShowSurahPicker(false);
    if (targetAyat && targetAyat > 1) {
      setTargetAyatToScroll(targetAyat);
    } else {
      setTargetAyatToScroll(null);
    }
  };

  const handleOpenJuz = (juzItem) => {
    const surah = SURAH_LIST.find((s) => s.nomor === juzItem.surahNomor);
    if (surah) {
      handleOpenSurah(surah, juzItem.ayat);
    }
  };

  // Scroll otomatis ke ayat target saat dibuka dari Juz / Terakhir Dibaca
  useEffect(() => {
    if (targetAyatToScroll && surahDetail && !loadingSurah) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`ayat-card-${targetAyatToScroll}`) || document.getElementById(`ayat-${targetAyatToScroll}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedAyat(targetAyatToScroll);
          setTimeout(() => setHighlightedAyat(null), 3000);
        }
        setTargetAyatToScroll(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [targetAyatToScroll, surahDetail, loadingSurah]);

  // Auto-save posisi terakhir saat keluar aplikasi / unmount
  useEffect(() => {
    return () => {
      if (selectedSurah) {
        try {
          const lastData = {
            surahNomor: selectedSurah.nomor,
            surahName: selectedSurah.namaLatin,
            surahArabic: selectedSurah.nama,
            arti: selectedSurah.arti,
            tempatTurun: selectedSurah.tempatTurun,
            ayatNomor: 1,
            totalAyat: selectedSurah.jumlahAyat,
            timestamp: Date.now(),
            dateStr: new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          };
          localStorage.setItem('kanomas_quran_last_read', JSON.stringify(lastData));
        } catch {}
      }
    };
  }, [selectedSurah]);

  // Word-by-Word fetcher
  const fetchWordByWord = async (surahNomor) => {
    if (wordByWordData[surahNomor]) return;
    const cacheKey = `kanomas_wbw_v3_${surahNomor}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setWordByWordData((prev) => ({ ...prev, [surahNomor]: JSON.parse(cached) }));
        return;
      }
    } catch {}

    setLoadingWordByWord(true);
    try {
      const res = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surahNomor}?words=true&language=id&word_fields=text_uthmani&per_page=300`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.verses) {
          const mapping = {};
          json.verses.forEach((v) => {
            const verseNum = v.verse_number;
            mapping[verseNum] = (v.words || [])
              .filter((w) => w.char_type_name === 'word' || (w.translation?.text && w.char_type_name !== 'end'))
              .map((w) => ({
                id: w.id,
                position: w.position,
                arab: (w.text_uthmani || w.text || '').replace(/[\u0640]/g, ''),
                latin: w.transliteration?.text || '',
                arti: w.translation?.text || ''
              }));
          });
          setWordByWordData((prev) => ({ ...prev, [surahNomor]: mapping }));
          try {
            localStorage.setItem(cacheKey, JSON.stringify(mapping));
          } catch {}
        }
      }
    } catch (err) {
      console.warn('Word by word load warning:', err);
    } finally {
      setLoadingWordByWord(false);
    }
  };

  const handleToggleWordByWord = () => {
    const nextVal = !showWordByWord;
    setShowWordByWord(nextVal);
    try {
      localStorage.setItem('kanomas_quran_wbw', String(nextVal));
    } catch {}
    if (nextVal && selectedSurah) {
      fetchWordByWord(selectedSurah.nomor);
    }
    showToast(nextVal ? '🔤 Arti per kata diaktifkan' : 'Arti per kata dinonaktifkan');
  };

  useEffect(() => {
    if (showWordByWord && selectedSurah) {
      fetchWordByWord(selectedSurah.nomor);
    }
  }, [showWordByWord, selectedSurah]);

  // Multi-Khataman Handlers
  const handleCreateKhatam = (e) => {
    e?.preventDefault();
    if (!newKhatamInput.targetPerson && !newKhatamInput.title) return;
    const newSession = {
      id: `khatam-${Date.now()}`,
      title: newKhatamInput.title || `Khataman ${newKhatamInput.targetPerson}`,
      targetPerson: newKhatamInput.targetPerson || 'Pribadi',
      startDate: newKhatamInput.startDate || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      targetDays: Number(newKhatamInput.targetDays) || 30,
      completedJuz: [],
      lastSurahNomor: 1,
      lastAyatNomor: 1,
      notes: newKhatamInput.notes || '',
      createdAt: Date.now()
    };
    const updated = [newSession, ...khatamanSessions];
    setKhatamanSessions(updated);
    try {
      localStorage.setItem('kanomas_khataman_sessions', JSON.stringify(updated));
    } catch {}
    setShowNewKhatamModal(false);
    setNewKhatamInput({ title: '', targetPerson: '', targetDays: 30, startDate: new Date().toISOString().split('T')[0], notes: '' });
    showToast(`✅ Program Khataman untuk "${newSession.targetPerson}" dibuat!`);
  };

  const handleToggleJuzInKhatam = (sessionId, juzNumber) => {
    const updated = khatamanSessions.map((s) => {
      if (s.id !== sessionId) return s;
      const isCompleted = s.completedJuz.includes(juzNumber);
      const newCompleted = isCompleted
        ? s.completedJuz.filter((j) => j !== juzNumber)
        : [...s.completedJuz, juzNumber].sort((a, b) => a - b);
      return { ...s, completedJuz: newCompleted };
    });
    setKhatamanSessions(updated);
    try {
      localStorage.setItem('kanomas_khataman_sessions', JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteKhatam = (sessionId) => {
    const updated = khatamanSessions.filter((s) => s.id !== sessionId);
    setKhatamanSessions(updated);
    try {
      localStorage.setItem('kanomas_khataman_sessions', JSON.stringify(updated));
    } catch {}
    showToast('🗑️ Program khataman berhasil dihapus');
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

      const cacheKey = `kanomas_surah_v12_${selectedSurah.nomor}`;
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
          fetch(`https://api.quran.com/api/v4/verses/by_chapter/${selectedSurah.nomor}?fields=text_uthmani,chapter_id,verse_number,page_number,juz_number&per_page=300`)
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
            if (jsonMadinah && Array.isArray(jsonMadinah.verses) && jsonMadinah.verses.length > 0) {
              const madinahMap = new Map();
              jsonMadinah.verses.forEach((v) => {
                madinahMap.set(v.verse_number, v);
              });

              data.ayat = data.ayat.map((ayat) => {
                const m = madinahMap.get(ayat.nomorAyat);
                if (m) {
                  let mText = normalizeQuranText(m.text_uthmani || '', true);
                  // Quran.com tidak menyisipkan Bismillah kecuali di Surah 1, tapi safeguard jika ada
                  if (ayat.nomorAyat === 1 && selectedSurah.nomor > 1 && selectedSurah.nomor !== 9) {
                    mText = mText.replace(/^[\uFEFF\u200B\u200C\u200D\u200E\u200F\s]*بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '');
                  }
                  return {
                    ...ayat,
                    teksArab: normalizeQuranText(ayat.teksArab || '', false),
                    teksArabMadinah: mText.trim(),
                    pageMadinah: m.page_number,
                    juzMadinah: m.juz_number
                  };
                }
                return {
                  ...ayat,
                  teksArab: normalizeQuranText(ayat.teksArab || '', false)
                };
              });
            } else if (jsonMadinah && jsonMadinah.data && jsonMadinah.data.ayahs) {
              // Fallback jika response dari endpoint alternatif
              const madinahMap = new Map();
              jsonMadinah.data.ayahs.forEach((mAyah) => {
                madinahMap.set(mAyah.numberInSurah, mAyah);
              });

              data.ayat = data.ayat.map((ayat) => {
                const m = madinahMap.get(ayat.nomorAyat);
                if (m) {
                  let mText = normalizeQuranText(m.text || '', true);
                  if (ayat.nomorAyat === 1 && selectedSurah.nomor > 1 && selectedSurah.nomor !== 9) {
                    mText = mText.replace(/^[\uFEFF\u200B\u200C\u200D\u200E\u200F\s]*بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '');
                  }
                  return {
                    ...ayat,
                    teksArab: normalizeQuranText(ayat.teksArab || '', false),
                    teksArabMadinah: mText.trim(),
                    pageMadinah: m.page,
                    juzMadinah: m.juz
                  };
                }
                return {
                  ...ayat,
                  teksArab: normalizeQuranText(ayat.teksArab || '', false)
                };
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

  // 1. Generate Canvas dari Kartu Ayat DOM
  const generateCardCanvas = async () => {
    if (!shareCardRef.current) return null;
    setIsGeneratingImage(true);
    setShareFeedback('🎨 Sedang merender gambar kartu ayat HD...');
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2, // High resolution (Retina / HD)
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        imageTimeout: 8000
      });
      return canvas;
    } catch (err) {
      console.error('Gagal generate gambar kartu ayat:', err);
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // 2. Bagikan Gambar Kartu Ayat Langsung ke WhatsApp / Sosmed
  const handleShareCardImage = async (ayat) => {
    if (!ayat) return;
    const arabText = getAyatArabText(ayat);
    const captionText = `*Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${ayat.nomorAyat}*\n\n${arabText}\n\n_${ayat.teksLatin}_\n\n"${ayat.teksIndonesia}"\n\n📌 _Dibagikan melalui Aplikasi Kanomas Tour & Travel_\nhttps://appkanomas.mediasosial.net`;

    const canvas = await generateCardCanvas();
    if (!canvas) {
      handleQuickShareWA(ayat);
      return;
    }

    const dataUrl = canvas.toDataURL('image/png');
    const fileName = `kanomas-ayat-${selectedSurah.nomor}-${ayat.nomorAyat}.png`;

    // A. Native Platform (Capacitor Android / iOS APK)
    if (Capacitor.isNativePlatform()) {
      try {
        setShareFeedback('📱 Menyiapkan gambar kartu ayat untuk dibagikan...');
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const savedFile = await Filesystem.writeFile({
          path: `card-${selectedSurah.nomor}-${ayat.nomorAyat}-${Date.now()}.png`,
          data: base64Data,
          directory: Directory.Cache
        });

        await CapShare.share({
          title: `Q.S. ${selectedSurah.namaLatin}: Ayat ${ayat.nomorAyat}`,
          text: captionText,
          url: savedFile.uri,
          dialogTitle: 'Bagikan Kartu Ayat Al-Qur\'an'
        });
        setShareFeedback('✅ Membuka lembar berbagi...');
        setTimeout(() => setShareFeedback(''), 3000);
        return;
      } catch (nativeErr) {
        console.error('Error sharing native file:', nativeErr);
      }
    }

    // B. Web Platform (Browser)
    try {
      const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
      if (blob && navigator.canShare) {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Q.S. ${selectedSurah.namaLatin}: Ayat ${ayat.nomorAyat}`,
            text: captionText
          });
          setShareFeedback('✅ Gambar kartu ayat berhasil dibagikan!');
          setTimeout(() => setShareFeedback(''), 3000);
          return;
        }
      }
    } catch (shareErr) {
      if (shareErr.name === 'AbortError') return;
      console.warn('Web share file failed:', shareErr);
    }

    // C. Fallback: Buka Pratinjau Gambar Siap Unduh & Share WhatsApp
    try {
      const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
      setPreviewCardData({ dataUrl, blob, captionText, ayat, fileName });
      setShareFeedback('📸 Gambar HD siap disimpan / dibagikan!');
      setTimeout(() => setShareFeedback(''), 3000);
    } catch (e) {
      handleQuickShareWA(ayat);
    }
  };

  // 3. Unduh File Gambar Kartu Ayat (HD PNG)
  const handleDownloadCardImage = async (ayat) => {
    if (!ayat) return;
    const canvas = await generateCardCanvas();
    if (!canvas) {
      alert('Gagal membuat gambar kartu ayat.');
      return;
    }

    const dataUrl = canvas.toDataURL('image/png');
    const fileName = `kanomas-ayat-${selectedSurah.nomor}-${ayat.nomorAyat}.png`;

    // A. Native Platform (Capacitor Android / iOS APK)
    if (Capacitor.isNativePlatform()) {
      try {
        setShareFeedback('💾 Menyimpan gambar kartu ayat ke perangkat...');
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents
        });

        // Buka share sheet untuk kemudahan simpan ke Galeri / Photos / Drive
        await CapShare.share({
          title: `Simpan Kartu Ayat Q.S. ${selectedSurah.namaLatin}:${ayat.nomorAyat}`,
          url: savedFile.uri,
          dialogTitle: 'Simpan ke Galeri / Bagikan Gambar'
        });

        setShareFeedback('✅ Gambar tersimpan di perangkat!');
        setTimeout(() => setShareFeedback(''), 3500);
        return;
      } catch (nativeSaveErr) {
        console.error('Error saving native file:', nativeSaveErr);
      }
    }

    // B. Web Platform (Browser)
    try {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
      setPreviewCardData({
        dataUrl,
        blob,
        captionText: `*Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${ayat.nomorAyat}*`,
        ayat,
        fileName
      });
      setShareFeedback('✅ Gambar berhasil diunduh / siap disimpan!');
      setTimeout(() => setShareFeedback(''), 3000);
    } catch (err) {
      console.error('Download error:', err);
      alert('Gagal mengunduh gambar. Silakan gunakan pratinjau untuk menyimpan gambar.');
    }
  };

  const handleQuickShareWA = (ayat) => {
    const arabText = getAyatArabText(ayat);
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
    const arabText = getAyatArabText(ayat);
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

  // Render Arab dengan dukungan Mushaf Madinah vs Indonesia / Modern, & Tajwid Warna
  const renderArabic = (ayat) => {
    if (!ayat) return null;
    const rawText = getAyatArabText(ayat);
    const wbwWords = showWordByWord ? wordByWordData[selectedSurah.nomor]?.[ayat.nomorAyat] : null;

    const wbwOptions = wbwWords ? {
      wbwWords,
      isDark,
      arabicFontSize,
      dynamicArabicLineHeight,
      activeFontFamily: getActiveFontFamily(),
      arabicFontClass: getArabicFontClass(),
      arabicColor: currentTheme.arabicColor
    } : null;

    return renderSafeTajweed(rawText, themeMode, showTajweed, wbwOptions, tajweedFilters);
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

        {/* Floating Zoom Indicator Toast (Pinch-to-zoom 2 jari) */}
        {zoomIndicator.show && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900/95 text-white border-2 border-amber-400 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-black animate-in fade-in zoom-in-95 pointer-events-none tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Ukuran {zoomIndicator.label}:</span>
            <span className="text-amber-300 font-mono text-sm">{zoomIndicator.size}px</span>
          </div>
        )}

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900/95 text-white border-2 border-emerald-400 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-black animate-in fade-in zoom-in-95 pointer-events-none tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </div>
        )}

        {viewState === 'index' ? (
          /* ======================================================== */
          /* INDEX VIEW: DAFTAR SURAT, JUZ, TARGET KHATAMAN, PENANDA */
          /* ======================================================== */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Index Header */}
            <div className="bg-[#0a7c29] text-white px-4 py-3 flex items-center justify-between gap-3 shadow-md flex-shrink-0 z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCloseQuran}
                  className="w-9 h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
                  title="Tutup Al-Qur'an"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-base sm:text-lg font-black tracking-tight leading-tight flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-300" />
                    <span>Al-Qur'anul Karim</span>
                  </h1>
                  <p className="text-[11px] text-emerald-100 font-medium">
                    114 Surat • 30 Juz • Khataman • Audio Murottal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowThemePicker(!showThemePicker)}
                  className={`w-9 h-9 rounded-xl active:scale-95 flex items-center justify-center transition ${
                    showThemePicker ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:bg-white/20 text-white'
                  }`}
                  title="Pilih Tema Warna Bacaan"
                >
                  <Palette className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="w-9 h-9 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
                  title="Pengaturan"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Index Main Scrollable Area */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-4">
              {/* BANNER TERAKHIR DIBACA (JIKA ADA DATA) */}
              {lastReadPosition && (
                <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-600 via-[#0a7c29] to-emerald-800 text-white shadow-lg border border-emerald-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Pin className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-amber-200">
                          Terakhir Dibaca
                        </span>
                        <span className="text-[11px] text-emerald-100 opacity-90">
                          {lastReadPosition.dateStr}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black mt-0.5">
                        QS. {lastReadPosition.surahName} : Ayat {lastReadPosition.ayatNomor}
                      </h3>
                      <p className="text-xs text-amber-200 font-medium">
                        Arti Surat: "{lastReadPosition.arti}" ({lastReadPosition.surahArabic})
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const surah = SURAH_LIST.find((s) => s.nomor === lastReadPosition.surahNomor) || SURAH_LIST[0];
                      handleOpenSurah(surah, lastReadPosition.ayatNomor);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
                  >
                    <span>Lanjut Baca Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* TABS SWITCHER: DAFTAR SURAT | DAFTAR JUZ | TARGET KHATAMAN | PENANDA */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-xs overflow-x-auto no-scrollbar">
                {[
                  { id: 'surah', label: '📖 Daftar Surat', count: '114' },
                  { id: 'juz', label: '📑 Daftar Juz', count: '30' },
                  { id: 'khatam', label: '🎯 Target Khataman', count: khatamanSessions.length },
                  { id: 'bookmarks', label: '⭐ Penanda & Catatan', count: bookmarks.length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setIndexTab(tab.id)}
                    className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
                      indexTab === tab.id
                        ? 'bg-[#0a7c29] text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      indexTab === tab.id ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* TAB 1: DAFTAR SURAT */}
              {indexTab === 'surah' && (
                <div className="space-y-3">
                  {/* CARD INTERAKTIF: LOMPAT LANGSUNG KE SURAT & AYAT */}
                  <div className="p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30 dark:from-slate-800 dark:via-slate-800/95 dark:to-emerald-950/30 border border-emerald-200/90 dark:border-emerald-800/60 shadow-sm space-y-3.5">
                    {/* Header Card */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0a7c29] to-emerald-500 text-white flex items-center justify-center shadow-xs">
                          <Compass className="w-4 h-4 text-amber-300" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                            Navigasi Cepat: Surat & Ayat
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                            Pilih surat dan nomor ayat berapa saja secara interaktif
                          </p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/70 text-[#0a7c29] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                        Interaktif
                      </span>
                    </div>

                    {/* Kontrol 1: Pemilihan Surat */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-4.5 h-4.5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                          <span>Pilih Surat ({currentQuickSurah.nomor} dari 114):</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowSurahPickerModal(true)}
                          className="text-[11px] font-bold text-[#0a7c29] dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Search className="w-3 h-3" />
                          <span>Daftar 114 Surat</span>
                        </button>
                      </div>

                      {/* Interactive Surah Selector Bar */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const prevNum = quickSurahNum > 1 ? quickSurahNum - 1 : 114;
                            setQuickSurahNum(prevNum);
                            const nextSurah = SURAH_LIST.find((s) => s.nomor === prevNum);
                            if (nextSurah && quickAyatNum > nextSurah.jumlahAyat) {
                              setQuickAyatNum(nextSurah.jumlahAyat);
                            }
                          }}
                          className="w-9 sm:w-10 h-13 rounded-2xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center active:scale-95 transition shadow-2xs flex-shrink-0"
                          title="Surat Sebelumnya"
                        >
                          <ChevronLeft className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowSurahPickerModal(true)}
                          className="flex-1 p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-700/90 border border-emerald-300/80 dark:border-emerald-700/80 hover:border-emerald-500 shadow-2xs hover:shadow-sm transition text-left flex items-center justify-between gap-2 group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-black text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                              {currentQuickSurah.nomor}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#0a7c29] transition truncate">
                                  {currentQuickSurah.namaLatin}
                                </span>
                                <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800 shrink-0">
                                  {currentQuickSurah.tempatTurun}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                Arti: "{currentQuickSurah.arti}" • {currentQuickSurah.jumlahAyat} Ayat • Juz {currentQuickSurah.juz}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-quran-lpmq text-lg text-[#0a7c29] dark:text-emerald-400 font-bold" dir="rtl">
                              {currentQuickSurah.nama}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-200 font-bold group-hover:bg-[#0a7c29] group-hover:text-white transition">
                              Ganti ▾
                            </span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const nextNum = quickSurahNum < 114 ? quickSurahNum + 1 : 1;
                            setQuickSurahNum(nextNum);
                            const nextSurah = SURAH_LIST.find((s) => s.nomor === nextNum);
                            if (nextSurah && quickAyatNum > nextSurah.jumlahAyat) {
                              setQuickAyatNum(nextSurah.jumlahAyat);
                            }
                          }}
                          className="w-9 sm:w-10 h-13 rounded-2xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center active:scale-95 transition shadow-2xs flex-shrink-0"
                          title="Surat Selanjutnya"
                        >
                          <ChevronRight className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                        </button>
                      </div>
                    </div>

                    {/* Kontrol 2: Pemilihan Ayat */}
                    <div className="space-y-2 pt-2 border-t border-emerald-100 dark:border-slate-700/60">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-4.5 h-4.5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                          <span>Pilih Ayat (1 s/d {currentQuickSurah.jumlahAyat}):</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAyatGridPicker(true)}
                          className="text-[11px] font-bold text-[#0a7c29] dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <ListOrdered className="w-3 h-3" />
                          <span>Grid Semua Ayat</span>
                        </button>
                      </div>

                      {/* Stepper + Input */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => setQuickAyatNum((prev) => Math.max(1, prev - 1))}
                          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50 dark:hover:bg-slate-600 font-black text-base text-slate-800 dark:text-white flex items-center justify-center active:scale-95 transition shadow-2xs flex-shrink-0"
                          title="Ayat Sebelumnya (-1)"
                        >
                          -
                        </button>

                        {currentQuickSurah.jumlahAyat > 10 && (
                          <button
                            type="button"
                            onClick={() => setQuickAyatNum((prev) => Math.max(1, prev - 5))}
                            className="h-10 px-2 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 hidden xs:flex items-center justify-center active:scale-95 transition flex-shrink-0"
                            title="Mundur 5 Ayat"
                          >
                            -5
                          </button>
                        )}

                        <div className="flex-1 flex items-center justify-center gap-2 px-3 py-1 rounded-2xl bg-white dark:bg-slate-700/90 border border-slate-200 dark:border-slate-600 shadow-2xs">
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Ayat:</span>
                          <input
                            type="number"
                            min="1"
                            max={currentQuickSurah.jumlahAyat}
                            value={quickAyatNum}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val)) {
                                setQuickAyatNum(Math.max(1, Math.min(currentQuickSurah.jumlahAyat, val)));
                              } else {
                                setQuickAyatNum(1);
                              }
                            }}
                            className="w-14 py-0.5 text-center font-mono font-black text-base text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-800 rounded-xl border border-emerald-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            dari <span className="text-slate-800 dark:text-slate-200 font-mono font-black">{currentQuickSurah.jumlahAyat}</span>
                          </span>
                        </div>

                        {currentQuickSurah.jumlahAyat > 10 && (
                          <button
                            type="button"
                            onClick={() => setQuickAyatNum((prev) => Math.min(currentQuickSurah.jumlahAyat, prev + 5))}
                            className="h-10 px-2 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 hidden xs:flex items-center justify-center active:scale-95 transition flex-shrink-0"
                            title="Maju 5 Ayat"
                          >
                            +5
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setQuickAyatNum((prev) => Math.min(currentQuickSurah.jumlahAyat, prev + 1))}
                          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50 dark:hover:bg-slate-600 font-black text-base text-slate-800 dark:text-white flex items-center justify-center active:scale-95 transition shadow-2xs flex-shrink-0"
                          title="Ayat Selanjutnya (+1)"
                        >
                          +
                        </button>
                      </div>

                      {/* Slider Range */}
                      <div className="space-y-0.5 px-1">
                        <input
                          type="range"
                          min="1"
                          max={currentQuickSurah.jumlahAyat}
                          value={quickAyatNum}
                          onChange={(e) => setQuickAyatNum(parseInt(e.target.value, 10))}
                          className="w-full accent-[#0a7c29] cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>Ayat 1</span>
                          <span>Tengah: Ayat {Math.ceil(currentQuickSurah.jumlahAyat / 2)}</span>
                          <span>Ayat {currentQuickSurah.jumlahAyat}</span>
                        </div>
                      </div>

                      {/* Quick Shortcut Buttons */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mr-0.5">Lompat:</span>
                        <button
                          type="button"
                          onClick={() => setQuickAyatNum(1)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition active:scale-95 ${
                            quickAyatNum === 1
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50'
                          }`}
                        >
                          Awal (1)
                        </button>
                        {currentQuickSurah.jumlahAyat > 2 && (
                          <button
                            type="button"
                            onClick={() => setQuickAyatNum(Math.ceil(currentQuickSurah.jumlahAyat / 2))}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition active:scale-95 ${
                              quickAyatNum === Math.ceil(currentQuickSurah.jumlahAyat / 2)
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50'
                            }`}
                          >
                            Tengah ({Math.ceil(currentQuickSurah.jumlahAyat / 2)})
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setQuickAyatNum(currentQuickSurah.jumlahAyat)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition active:scale-95 ${
                            quickAyatNum === currentQuickSurah.jumlahAyat
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-emerald-50'
                          }`}
                        >
                          Akhir ({currentQuickSurah.jumlahAyat})
                        </button>
                      </div>
                    </div>

                    {/* Tombol Eksekusi Buka Surat & Ayat */}
                    <button
                      type="button"
                      onClick={() => handleOpenSurah(currentQuickSurah, quickAyatNum)}
                      className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#0a7c29] via-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 transition"
                    >
                      <BookOpen className="w-4 h-4 text-amber-300" />
                      <span>Buka QS. {currentQuickSurah.namaLatin} Ayat {quickAyatNum}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama surat, arti, atau nomor (contoh: Al-Baqarah, Sapi, 36)..."
                      className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0a7c29] shadow-2xs"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Grid 114 Surat */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {SURAH_LIST.filter(
                      (s) =>
                        s.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.arti.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        String(s.nomor).includes(searchQuery)
                    ).map((surah) => (
                      <div
                        key={surah.nomor}
                        className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs hover:border-emerald-500 hover:shadow-md transition space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#0a7c29] dark:text-emerald-300 font-mono font-black text-xs flex items-center justify-center flex-shrink-0 border border-emerald-300 dark:border-emerald-700">
                              {surah.nomor}
                            </span>
                            <div className="min-w-0">
                              <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                                {surah.namaLatin}
                              </h4>
                              {/* Prominently Mention Surah Meaning */}
                              <div className="mt-0.5">
                                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800 inline-block">
                                  Arti: "{surah.arti}"
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                                {surah.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah'} • {surah.jumlahAyat} Ayat • Juz {surah.juz}
                              </p>
                            </div>
                          </div>
                          <span className="font-quran-lpmq text-xl text-[#0a7c29] dark:text-emerald-400 font-bold flex-shrink-0" dir="rtl">
                            {surah.nama}
                          </span>
                        </div>

                        {/* Tombol Aksi: Baca & Pilih Ayat */}
                        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                          <button
                            onClick={() => handleOpenSurah(surah, 1)}
                            className="flex-1 py-1.5 px-3 rounded-xl bg-[#0a7c29] hover:bg-emerald-800 text-white font-black text-xs flex items-center justify-center gap-1 active:scale-95 transition shadow-2xs"
                          >
                            <span>Baca Surat</span>
                          </button>
                          <button
                            onClick={() => setSurahAyatJumpModal(surah)}
                            className="py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700/80 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition"
                            title="Pilih nomor ayat tertentu"
                          >
                            <ListOrdered className="w-3.5 h-3.5 text-[#0a7c29] dark:text-emerald-400" />
                            <span>Pilih Ayat</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: DAFTAR JUZ */}
              {indexTab === 'juz' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {JUZ_LIST.map((juzItem) => (
                    <div
                      key={juzItem.juz}
                      className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs hover:border-emerald-500 hover:shadow-md transition space-y-3 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#0a7c29] to-emerald-700 text-amber-300 font-black text-xs shadow-xs">
                          JUZ {juzItem.juz}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          Total {juzItem.totalAyat} Ayat
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                          <span className="font-semibold text-slate-500">Mulai:</span>
                          <span className="font-bold">QS. {juzItem.surahName} [Ayat {juzItem.ayat}]</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                          <span className="font-semibold text-slate-500">Sampai:</span>
                          <span className="font-bold">QS. {juzItem.endSurah} [Ayat {juzItem.endAyat}]</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenJuz(juzItem)}
                        className="w-full py-2 rounded-xl bg-[#0a7c29] hover:bg-emerald-800 text-white font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition shadow-2xs"
                      >
                        <span>Buka Juz {juzItem.juz}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: TARGET KHATAMAN (MULTI-KHATAMAN) */}
              {indexTab === 'khatam' && (
                <div className="space-y-4">
                  {/* Top Bar: Buat Target Baru */}
                  <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-700 via-[#0a7c29] to-emerald-900 text-white shadow-md flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-black flex items-center gap-2">
                        <Target className="w-5 h-5 text-amber-300" />
                        <span>Program Khataman Mandiri</span>
                      </h3>
                      <p className="text-[11px] text-emerald-100">
                        Bisa membuat beberapa target bacaan tanpa saling menindih.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewKhatamModal(true)}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Buat Target Baru</span>
                    </button>
                  </div>

                  {/* List of Khataman Sessions */}
                  {khatamanSessions.length === 0 ? (
                    <div className="p-8 text-center bg-white/70 dark:bg-slate-800/70 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2">
                      <Target className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Belum ada target khataman aktif.
                      </p>
                      <button
                        onClick={() => setShowNewKhatamModal(true)}
                        className="text-xs font-black text-[#0a7c29] hover:underline"
                      >
                        + Klik di sini untuk membuat target pertama
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {khatamanSessions.map((session) => {
                        const progressPercent = Math.round((session.completedJuz.length / 30) * 100);
                        return (
                          <div
                            key={session.id}
                            className="p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs shadow-xs space-y-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                                    {session.title}
                                  </h4>
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0a7c29] dark:text-emerald-300 font-extrabold text-[10px] border border-emerald-300 dark:border-emerald-700">
                                    Untuk: {session.targetPerson}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                  Mulai: <strong className="text-slate-700 dark:text-slate-200">{session.startDate}</strong> • Target: <strong>{session.targetDays} Hari</strong>
                                </p>
                                {session.notes && (
                                  <p className="text-[11px] text-slate-600 dark:text-slate-300 italic mt-1 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                                    "{session.notes}"
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteKhatam(session.id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                                title="Hapus Target Khataman Ini"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-slate-600 dark:text-slate-300">
                                  Kemajuan: {session.completedJuz.length} dari 30 Juz
                                </span>
                                <span className="text-emerald-700 dark:text-emerald-300 font-mono">
                                  {progressPercent}%
                                </span>
                              </div>
                              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                                <div
                                  style={{ width: `${progressPercent}%` }}
                                  className="h-full bg-gradient-to-r from-[#0a7c29] to-amber-400 rounded-full transition-all duration-500"
                                />
                              </div>
                            </div>

                            {/* 30 Juz Interactive Check Grid */}
                            <div>
                              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1.5">
                                Checklist 30 Juz (Ketuk untuk tandai selesai):
                              </span>
                              <div className="grid grid-cols-10 sm:grid-cols-15 gap-1.5">
                                {Array.from({ length: 30 }, (_, i) => i + 1).map((juzNum) => {
                                  const isDone = session.completedJuz.includes(juzNum);
                                  return (
                                    <button
                                      key={juzNum}
                                      onClick={() => handleToggleJuzInKhatam(session.id, juzNum)}
                                      className={`h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center transition active:scale-95 border ${
                                        isDone
                                          ? 'bg-[#0a7c29] text-white border-emerald-600 shadow-2xs'
                                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-400'
                                      }`}
                                      title={`Juz ${juzNum}: ${isDone ? 'Sudah Selesai (klik untuk batalkan)' : 'Belum Selesai (klik untuk tandai)'}`}
                                    >
                                      {juzNum}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Action to continue reading */}
                            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
                              <span className="text-[11px] text-slate-500">
                                {progressPercent === 100 ? '🎉 Alhamdulillah Khatam!' : `Sisa ${30 - session.completedJuz.length} Juz lagi`}
                              </span>
                              <button
                                onClick={() => {
                                  const nextJuzNum = Array.from({ length: 30 }, (_, i) => i + 1).find((j) => !session.completedJuz.includes(j)) || 1;
                                  const juzObj = JUZ_LIST.find((j) => j.juz === nextJuzNum);
                                  if (juzObj) handleOpenJuz(juzObj);
                                }}
                                className="px-4 py-1.5 rounded-xl bg-[#0a7c29] hover:bg-emerald-800 text-white font-black text-xs flex items-center gap-1 active:scale-95 transition shadow-2xs"
                              >
                                <span>Lanjut Baca Khataman</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PENANDA & CATATAN */}
              {indexTab === 'bookmarks' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-xs">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block">
                      Kumpulan Simpanan Ayat & Catatan Ibadah Anda
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      Ketuk kartu untuk langsung membuka ayat di mushaf.
                    </p>
                  </div>

                  {/* Bookmarks */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-slate-600 dark:text-slate-300 tracking-wider">
                      Ayat Tersimpan ({bookmarks.length})
                    </h4>
                    {bookmarks.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Belum ada ayat yang disimpan.</p>
                    ) : (
                      <div className="space-y-2">
                        {bookmarks.map((bm) => (
                          <div
                            key={bm.key}
                            onClick={() => {
                              const surah = SURAH_LIST.find((s) => s.nomor === bm.surahNomor);
                              if (surah) handleOpenSurah(surah, bm.ayatNomor);
                            }}
                            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-emerald-500 cursor-pointer transition shadow-2xs flex items-center justify-between"
                          >
                            <div>
                              <span className="text-xs font-black text-slate-900 dark:text-white block">
                                QS. {bm.surahNama} : Ayat {bm.ayatNomor}
                              </span>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                "{bm.teksIndonesia}"
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* READER VIEW: MUSHAF LENGKAP & AL-QUR'AN READER           */
          /* ======================================================== */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Header Reader */}
            <div className="bg-[#0a7c29] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 shadow-md flex-shrink-0 z-20">
              {/* Tombol Back ke Index Daftar Surat */}
              <button
                onClick={() => setViewState('index')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-white/20 active:scale-95 transition text-white font-bold text-xs"
                title="Kembali ke Daftar Surat"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Daftar Surat</span>
              </button>

              {/* Quick Surah Picker Dropdown Title */}
              <button
                onClick={() => setShowSurahPicker(!showSurahPicker)}
                className="flex items-center gap-1 px-2 py-1 rounded-xl hover:bg-white/15 transition font-bold text-xs sm:text-sm leading-tight max-w-[180px] sm:max-w-xs truncate"
              >
                <span className="truncate">{selectedSurah.nomor}. {selectedSurah.namaLatin}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform shrink-0 ${showSurahPicker ? 'rotate-90' : ''}`} />
              </button>

              {/* Action Buttons: Jump, Theme, Settings, Audio */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Loncat Ayat */}
                <button
                  onClick={() => setShowJumpModal(true)}
                  className="w-8 h-8 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
                  title="Loncat Ayat"
                >
                  <Compass className="w-4 h-4" />
                </button>

                {/* Tema / Suasana */}
                <button
                  onClick={() => setShowThemePicker(!showThemePicker)}
                  className={`w-8 h-8 rounded-xl active:scale-95 flex items-center justify-center transition ${
                    showThemePicker ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:bg-white/20 text-white'
                  }`}
                  title="Ganti Tema Warna"
                >
                  <Palette className="w-4 h-4" />
                </button>

                {/* Pengaturan Tajwid & Warna (MyQuran) */}
                <button
                  onClick={() => setShowTajweedGuide(true)}
                  className={`w-8 h-8 rounded-xl active:scale-95 flex items-center justify-center transition relative ${
                    showTajweed && tajweedFilters.master
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'hover:bg-white/20 text-white'
                  }`}
                  title="Pengaturan Kaidah Tajwid & Warna (Identik MyQuran)"
                >
                  <span className="text-[10px] font-black uppercase tracking-tighter">TAJ</span>
                  {showTajweed && tajweedFilters.master && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900" />
                  )}
                </button>

                {/* Pengaturan */}
                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="w-8 h-8 rounded-xl hover:bg-white/20 active:scale-95 flex items-center justify-center transition text-white"
                  title="Pengaturan"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {/* Audio */}
                <button
                  onClick={playFullSurah}
                  className={`w-8 h-8 rounded-xl active:scale-95 flex items-center justify-center transition ${
                    isPlayingAudio ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:bg-white/20 text-white'
                  }`}
                  title={isPlayingAudio ? 'Jeda Audio' : 'Putar Audio'}
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sub-Header: Navigasi Prev/Next, Mushaf switch, & Arti Surat */}
            <div className={`${currentTheme.subHeaderBg} border-b px-4 py-2 flex items-center justify-between shadow-xs flex-shrink-0 transition-colors relative z-10`}>
              <button
                onClick={handlePrevSurah}
                disabled={selectedSurah.nomor <= 1}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition active:scale-95 ${
                  selectedSurah.nomor <= 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#0a7c29] hover:bg-emerald-100/50'
                }`}
                title="Surat Sebelumnya"
              >
                <span className="text-lg font-bold">◀</span>
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-xs sm:text-sm font-black">
                    {selectedSurah.nomor}. {selectedSurah.namaLatin}
                  </h2>
                  <button
                    onClick={() => handleMushafTypeChange(
                      mushafType === 'indonesia' ? 'madinah' : mushafType === 'madinah' ? 'modern' : 'indonesia'
                    )}
                    style={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      borderColor: isDark ? '#475569' : '#cbd5e1'
                    }}
                    className="text-[11px] px-2.5 py-0.5 rounded-full font-bold border shadow-xs transition-all active:scale-95 inline-flex items-center gap-1 hover:brightness-105 cursor-pointer"
                    title="Klik untuk beralih font Arab (Indonesia ⇄ Madinah ⇄ Modern)"
                  >
                    <span>Mushaf {mushafType === 'madinah' ? 'Madinah' : mushafType === 'modern' ? 'Modern' : 'Indonesia'}</span>
                    <span className="text-[10px] opacity-70">⇄</span>
                  </button>
                </div>
                <p className="text-[10px] sm:text-[11px] opacity-80 font-medium">
                  Arti: <strong>"{selectedSurah.arti}"</strong> • {selectedSurah.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah'}, {selectedSurah.jumlahAyat} ayat • Juz {selectedSurah.juz}
                </p>
              </div>

              <button
                onClick={handleNextSurah}
                disabled={selectedSurah.nomor >= 114}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition active:scale-95 ${
                  selectedSurah.nomor >= 114 ? 'opacity-20 cursor-not-allowed' : 'text-[#0a7c29] hover:bg-emerald-100/50'
                }`}
                title="Surat Selanjutnya"
              >
                <span className="text-lg font-bold">▶</span>
              </button>
            </div>

            {/* Ayah Scroll Container */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 space-y-6 select-text touch-pan-y"
            >
              {/* SURAH INTRO BANNER (SEBUTKAN ARTI SURAT DI AWALNYA) */}
              <div className="relative mx-auto my-3 max-w-xl text-center px-4 py-4 rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 backdrop-blur-xs shadow-md">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    QS. {selectedSurah.namaLatin} ({selectedSurah.nama})
                  </h3>
                </div>
                <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-700 text-amber-200 font-extrabold text-xs sm:text-sm shadow-xs my-1">
                  Arti Surat: "{selectedSurah.arti}"
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                  Golongan {selectedSurah.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah'} • Urutan Wahyu ke-{selectedSurah.wahyu || '-'} • Terdiri dari {selectedSurah.jumlahAyat} Ayat • Juz {selectedSurah.juz}
                </p>
                {lastReadPosition?.surahNomor === selectedSurah.nomor && (
                  <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-400/20 px-3 py-0.5 rounded-full border border-amber-400/40">
                    <Pin className="w-3 h-3 fill-current" />
                    <span>Penanda Terakhir Anda: Ayat {lastReadPosition.ayatNomor}</span>
                  </div>
                )}
              </div>

              {/* BISMILLAH BANNER ORNAMEN KALIGRAFI */}
              {selectedSurah.nomor !== 9 && selectedSurah.nomor !== 1 && (
                <div className="relative mx-auto my-4 max-w-xl text-center px-2 z-10">
                  <div className={`relative py-3.5 px-6 rounded-3xl border-2 border-amber-400/50 shadow-md overflow-hidden ${
                    currentTheme.type === 'image' || currentTheme.isDark
                      ? 'bg-slate-900/80 backdrop-blur-md'
                      : 'bg-gradient-to-r from-emerald-950/15 via-amber-500/10 to-emerald-950/15'
                  }`}>
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
                <div className="mx-auto my-3 max-w-lg p-3 rounded-2xl bg-amber-500/15 border border-amber-400/50 text-center text-xs space-y-1 z-10">
                  <span className="font-bold text-amber-800 dark:text-amber-300 block">Surat At-Taubah dibaca tanpa Basmalah</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                    Sesuai ketetapan Rasulullah ﷺ dan para Sahabat, pembacaan diawali langsung dengan ta'awwudz.
                  </p>
                </div>
              )}

              {/* LOADING STATE */}
              {loadingSurah && (
                <div className="py-20 text-center space-y-3 z-10">
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
                    const isLastRead = lastReadPosition?.surahNomor === selectedSurah.nomor && lastReadPosition?.ayatNomor === ayat.nomorAyat;

                    const ayatPage = mushafType === 'madinah' && ayat.pageMadinah ? ayat.pageMadinah : getAyatPageNumber(selectedSurah.nomor, ayat.nomorAyat);
                    const prevAyat = index > 0 ? surahDetail.ayat[index - 1] : null;
                    const prevAyatPage = prevAyat ? (mushafType === 'madinah' && prevAyat.pageMadinah ? prevAyat.pageMadinah : getAyatPageNumber(selectedSurah.nomor, prevAyat.nomorAyat)) : null;
                    const isNewPage = index === 0 || ayatPage !== prevAyatPage;

                    return (
                      <React.Fragment key={ayat.nomorAyat}>
                        {isNewPage && (
                          <div className="flex items-center justify-center my-5 pt-1 z-10">
                            <div className="flex items-center gap-3 w-full max-w-md">
                              <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent flex-1" />
                              <div className={`px-4 py-1 rounded-full border border-amber-400/70 shadow-xs flex items-center gap-2 text-xs font-black ${
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
                          className={`space-y-3.5 pb-6 border-b transition-all duration-300 rounded-2xl cursor-pointer relative z-10 ${
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
                          {/* BADGE PENANDA AYAT TERAKHIR DIBACA */}
                          {isLastRead && (
                            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 dark:text-amber-200 bg-amber-400/25 border border-amber-400/70 px-3 py-1 rounded-full w-fit mb-2 animate-pulse">
                              <Pin className="w-3.5 h-3.5 fill-current" />
                              <span>Posisi Terakhir Anda Membaca</span>
                            </div>
                          )}

                          {/* A. TEKS ARAB DENGAN TAJWID WARNA & TERJEMAH PER KATA TERINTEGRASI */}
                          <div className="w-full" dir="rtl" data-zoom-zone="arabic">
                            {showWordByWord && wordByWordData[selectedSurah.nomor]?.[ayat.nomorAyat] ? (
                              <div
                                className="flex flex-wrap items-start justify-start gap-y-4 gap-x-2.5 w-full select-text mb-4 sm:mb-5"
                                dir="rtl"
                                style={{
                                  direction: 'rtl',
                                  textAlign: 'right'
                                }}
                              >
                                {renderArabic(ayat)}

                                {/* BINGKAI NOMOR AYAT DI AKHIR KATA AYAT */}
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenJumpModal(ayat.nomorAyat);
                                  }}
                                  className="inline-flex items-center justify-center align-middle mx-2 self-center select-none cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                                  style={{ verticalAlign: 'middle', lineHeight: 1 }}
                                  title={`Ayat ${ayat.nomorAyat} - Klik untuk loncat ayat (Maks: ${selectedSurah.jumlahAyat})`}
                                >
                                  <span className="relative inline-flex items-center justify-center px-3.5 py-1 rounded-xl bg-gradient-to-br from-[#0a7c29] via-[#0b6623] to-[#064e1c] text-amber-300 font-mono text-xs sm:text-sm font-black border-2 border-slate-300 shadow-md ring-1 ring-emerald-950/20 whitespace-nowrap">
                                    {ayat.nomorAyat}
                                  </span>
                                </span>
                              </div>
                            ) : (
                              <p
                                style={{
                                  fontFamily: getActiveFontFamily(),
                                  fontSize: `${arabicFontSize}px`,
                                  color: currentTheme.arabicColor,
                                  lineHeight: dynamicArabicLineHeight + (spaciousMode ? 0.15 : 0),
                                  wordSpacing: spaciousMode ? '0.18em' : '0.04em',
                                  textAlign: 'right',
                                  fontFeatureSettings: '"calt" 1, "liga" 1, "mkmk" 1',
                                  fontWeight: 400,
                                  textRendering: 'geometricPrecision',
                                  WebkitFontSmoothing: 'antialiased',
                                  MozOsxFontSmoothing: 'grayscale',
                                  width: '100%'
                                }}
                                className={`${getArabicFontClass()} font-normal select-text mb-4 sm:mb-5`}
                              >
                                {renderArabic(ayat)}

                                {/* BINGKAI NOMOR AYAT */}
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenJumpModal(ayat.nomorAyat);
                                  }}
                                  className="inline-flex items-center justify-center align-middle mx-2 my-1 select-none cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                                  style={{ verticalAlign: 'middle', lineHeight: 1 }}
                                  title={`Ayat ${ayat.nomorAyat} - Klik untuk loncat ayat (Maks: ${selectedSurah.jumlahAyat})`}
                                >
                                  <span className="relative inline-flex items-center justify-center px-3.5 py-1 rounded-xl bg-gradient-to-br from-[#0a7c29] via-[#0b6623] to-[#064e1c] text-amber-300 font-mono text-xs sm:text-sm font-black border-2 border-slate-300 shadow-md ring-1 ring-emerald-950/20 whitespace-nowrap">
                                    {ayat.nomorAyat}
                                  </span>
                                </span>
                              </p>
                            )}

                            {showWordByWord && loadingWordByWord && !wordByWordData[selectedSurah.nomor]?.[ayat.nomorAyat] && (
                              <div className="py-1 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 opacity-80 mb-2" dir="ltr">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Memuat terjemahan kata per kata...</span>
                              </div>
                            )}
                          </div>

                          {/* B. TRANSLITERASI LATIN */}
                          {showLatin && ayat.teksLatin && (
                            <div className="mt-3 sm:mt-3.5 pt-1 w-full" data-zoom-zone="latin">
                              <p
                                style={{
                                  fontSize: `${latinFontSize}px`,
                                  color: currentTheme.latinColor,
                                  lineHeight: '1.75',
                                  textAlign: 'justify',
                                  textAlignLast: 'left',
                                  textJustify: 'inter-word',
                                  hyphens: 'auto',
                                  width: '100%'
                                }}
                                className="font-medium select-text"
                              >
                                {ayat.teksLatin}
                              </p>
                            </div>
                          )}

                          {/* C. TERJEMAHAN BAHASA INDONESIA */}
                          {showTranslation && ayat.teksIndonesia && (
                            <div className="mt-2.5 sm:mt-3 w-full" data-zoom-zone="translation">
                              <p
                                style={{
                                  fontSize: `${latinFontSize}px`,
                                  color: currentTheme.translationColor,
                                  lineHeight: '1.75',
                                  textAlign: 'justify',
                                  textAlignLast: 'left',
                                  textJustify: 'inter-word',
                                  hyphens: 'auto',
                                  width: '100%'
                                }}
                                className="font-normal select-text opacity-95"
                              >
                                {ayat.teksIndonesia}
                              </p>
                            </div>
                          )}

                          {/* D. CATATAN PRIBADI JAMAAH */}
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
                                <p className="italic">"{savedNote.text}"</p>
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

                          {/* E. BILAH AKSI AYAT */}
                          {(isToolbarOpen || !hiddenReadMode) && (
                            <div
                              dir="ltr"
                              onClick={(e) => e.stopPropagation()}
                              className="pt-2 mt-2 border-t border-dashed border-emerald-500/30 animate-in slide-in-from-top-2 duration-200"
                            >
                              <div className={`p-1.5 sm:p-2 rounded-2xl border shadow-md flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth ${
                                currentTheme.isDark
                                  ? 'bg-slate-900/95 border-slate-700 text-white shadow-black/40'
                                  : 'bg-white border-emerald-300 text-slate-800 shadow-emerald-950/10'
                              }`}>
                                {/* Badge Loncat Ayat */}
                                <button
                                  onClick={() => handleOpenJumpModal(ayat.nomorAyat)}
                                  className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-[#0a7c29] to-[#064e1c] text-amber-300 font-mono text-[11px] font-black rounded-xl border border-amber-300/40 shadow-xs hover:scale-105 active:scale-95 transition"
                                  title={`Ayat ${ayat.nomorAyat} - Loncat ayat (Maks: ${selectedSurah.jumlahAyat})`}
                                >
                                  <span>Ayat</span>
                                  <span className="bg-amber-300/20 px-1 rounded">{ayat.nomorAyat}</span>
                                </button>

                                {/* TOMBOL PENANDA AYAT TERAKHIR */}
                                <button
                                  onClick={() => saveLastRead(selectedSurah, ayat.nomorAyat)}
                                  className={`flex-shrink-0 flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl border text-xs font-bold transition active:scale-95 shadow-2xs ${
                                    isLastRead
                                      ? 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-xs'
                                      : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-amber-50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title="Tandai sebagai ayat terakhir dibaca"
                                >
                                  <Pin className={`w-3.5 h-3.5 ${isLastRead ? 'fill-current text-slate-950' : 'text-amber-500'}`} />
                                  <span>{isLastRead ? 'Terakhir Dibaca' : 'Tandai Terakhir'}</span>
                                </button>

                                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 flex-shrink-0 mx-0.5" />

                                {/* AUDIO */}
                                <button
                                  onClick={() => playAyatAudio(index)}
                                  className={`flex-shrink-0 flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-bold transition active:scale-95 border ${
                                    isAudioPlaying
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                      : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title={isAudioPlaying ? 'Jeda Audio Ayat' : 'Putar Audio Ayat'}
                                >
                                  {isAudioPlaying ? (
                                    <Pause className="w-3.5 h-3.5 text-white" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 text-[#0a7c29] dark:text-emerald-400" />
                                  )}
                                  <span>{isAudioPlaying ? 'Jeda' : 'Audio'}</span>
                                </button>

                                {/* TAFSIR */}
                                <button
                                  onClick={() => handleOpenRincian(ayat)}
                                  className="flex-shrink-0 flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-emerald-50 text-[#0a7c29] dark:text-emerald-400 border border-slate-200 dark:border-slate-700 text-xs font-bold transition active:scale-95 shadow-2xs"
                                  title="Buka Tafsir & Rincian Ayat"
                                >
                                  <BookOpen className="w-3.5 h-3.5 stroke-[2.3]" />
                                  <span>Tafsir</span>
                                </button>

                                {/* SALIN */}
                                <button
                                  onClick={() => handleCopyAyat(ayat)}
                                  className="flex-shrink-0 flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition active:scale-95 shadow-2xs"
                                  title="Salin Ayat & Terjemah"
                                >
                                  {copiedAyatNum === ayat.nomorAyat ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                  <span>{copiedAyatNum === ayat.nomorAyat ? 'Tersalin' : 'Salin'}</span>
                                </button>

                                {/* SHARE */}
                                <button
                                  onClick={() => handleOpenShareModal(ayat)}
                                  className="flex-shrink-0 flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-amber-50 text-amber-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 text-xs font-bold transition active:scale-95 shadow-2xs"
                                  title="Bagikan Ayat"
                                >
                                  <Share2 className="w-3.5 h-3.5" />
                                  <span>Share</span>
                                </button>

                                {/* CATATAN */}
                                <button
                                  onClick={() => handleOpenNoteModal(ayat)}
                                  className={`flex-shrink-0 flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl border text-xs font-bold transition active:scale-95 shadow-2xs ${
                                    savedNote
                                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-800 dark:text-amber-300'
                                      : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title="Tandai Catatan Pribadi"
                                >
                                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Catatan</span>
                                </button>

                                {/* SIMPAN (BOOKMARK) */}
                                <button
                                  onClick={() => handleToggleBookmark(ayat)}
                                  className={`flex-shrink-0 flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl border text-xs font-bold transition active:scale-95 shadow-2xs ${
                                    isBookmarked
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title={isBookmarked ? 'Hapus dari Simpanan' : 'Simpan Ayat'}
                                >
                                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-white' : ''}`} />
                                  <span>{isBookmarked ? 'Disimpan' : 'Simpan'}</span>
                                </button>

                                {/* TAJWID */}
                                <button
                                  onClick={() => setShowTajweedGuide(true)}
                                  className="flex-shrink-0 flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition active:scale-95 shadow-2xs"
                                  title="Panduan Warna Tajwid"
                                >
                                  <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  <span>Tajwid</span>
                                </button>

                                {hiddenReadMode && (
                                  <button
                                    onClick={() => setActiveAyatId(null)}
                                    className="flex-shrink-0 ml-auto p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                    title="Tutup Menu"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
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
          </div>
        )}

        {/* ======================================================== */}
        {/* POPUP PEMILIH SUASANA & BACKGROUND (WARNA POLOS ISLAMI) */}
        {/* ======================================================== */}
        {showThemePicker && (
          <div className="p-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-30 flex-shrink-0 animate-in slide-in-from-top duration-200 relative">
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#0a7c29] dark:text-emerald-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Pilihan Warna Background Bacaan (Polos & Nyaman)
                  </span>
                </div>
                <button
                  onClick={() => setShowThemePicker(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Pilihan 6 Warna Polos Nyaman */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'mushaf', name: 'Hijau Kemenag', desc: 'Standar Mushaf', color: '#e8f9eb', textColor: '#022c22', border: '#a7f3d0' },
                  { id: 'light', name: 'Putih Bersih', desc: 'Terang & Kontras', color: '#ffffff', textColor: '#0f172a', border: '#e2e8f0' },
                  { id: 'sepia', name: 'Kertas Sepia', desc: 'Nyaman di Mata', color: '#fbf6ea', textColor: '#854d0e', border: '#fde68a' },
                  { id: 'dark', name: 'Hitam Gelap', desc: 'Malam / AMOLED', color: '#09111c', textColor: '#ffffff', border: '#334155' },
                  { id: 'navy', name: 'Biru Malam', desc: 'Nuansa Tenang', color: '#071b2f', textColor: '#7dd3fc', border: '#1e3a8a' },
                  { id: 'cream', name: 'Krem Antik', desc: 'Mushaf Klasik', color: '#fdfbf7', textColor: '#18181b', border: '#e7e0d3' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleThemeChange(item.id);
                      setShowThemePicker(false);
                    }}
                    style={{ backgroundColor: item.color, borderColor: item.border }}
                    className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 shadow-2xs active:scale-95 ${
                      themeMode === item.id
                        ? 'ring-2 ring-[#0a7c29] shadow-md scale-102'
                        : 'opacity-90 hover:opacity-100 hover:scale-101'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: item.textColor }}
                      className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-white font-bold"
                    >
                      {themeMode === item.id ? '✓' : ''}
                    </span>
                    <div className="min-w-0 text-left">
                      <span style={{ color: item.textColor }} className="text-xs font-black block leading-tight">
                        {item.name}
                      </span>
                      <span style={{ color: item.textColor }} className="text-[10px] opacity-75 block leading-tight">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-slate-500 text-center italic">
                * Background foto pemandangan & Ka’bah asli dapat dipilih saat membagikan ayat (fitur Share Card).
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL POPUP PILIH SURAT (114 SURAH LENGKAP)              */}
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
                      handleOpenSurah(surah, 1);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                      selectedSurah.nomor === surah.nomor
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-[#0a7c29] font-bold ring-1 ring-emerald-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block leading-tight">
                        {surah.nomor}. {surah.namaLatin}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">
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
        {/* MODAL 1: RINCIAN & TAFSIR                                 */}
        {/* ======================================================== */}
        {showRincianModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-lg max-h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              {/* Header Hijau Rincian */}
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-300" />
                  <h3 className="text-base font-black">Rincian & Tafsir Ayat</h3>
                </div>
                <button
                  onClick={() => setShowRincianModal(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Header Abu-Abu: Makkiyah / Madaniyah, XX ayat */}
              <div className="bg-slate-700 text-white font-bold text-center py-1.5 text-xs tracking-wider uppercase flex-shrink-0">
                {selectedSurah.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah'}, {selectedSurah.jumlahAyat} ayat • Juz {selectedSurah.juz}
              </div>

              {/* Body: Info Rincian */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className={`p-3 rounded-2xl border space-y-1.5 text-xs sm:text-sm font-bold ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <p><span className="opacity-60 font-medium">Surah :</span> QS. {selectedSurah.namaLatin} ({selectedSurah.arti})</p>
                  <p><span className="opacity-60 font-medium">Ayat Terpilih :</span> Ayat {showRincianModal.nomorAyat}</p>
                  <p><span className="opacity-60 font-medium">Halaman Mushaf :</span> Halaman {calculateAyatPage(selectedSurah, showRincianModal.nomorAyat)}</p>
                  <p><span className="opacity-60 font-medium">Urutan Turun :</span> Wahyu ke-{selectedSurah.wahyu || 96}</p>
                </div>

                {/* Sub-Header Tafsir */}
                <div className="bg-[#0a7c29] text-amber-200 font-bold text-center py-1.5 text-xs tracking-wider uppercase rounded-xl shadow-xs">
                  Teks Tafsir (Kemenag RI & Ringkasan Ibnu Katsir)
                </div>

                {/* Box Tafsir */}
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 font-serif border ${
                  isDark
                    ? 'bg-[#082414] text-emerald-100 border-emerald-900/60'
                    : 'bg-[#0c381c] text-white border-emerald-800'
                }`}>
                  {loadingTafsir ? (
                    <div className="py-8 text-center space-y-2">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mx-auto" />
                      <p className="text-xs text-emerald-200 font-sans">Memuat teks tafsir resmi Kemenag RI...</p>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold text-amber-300 block mb-2 font-sans text-xs">
                        ({showRincianModal.nomorAyat}) QS. {selectedSurah.namaLatin} : {showRincianModal.nomorAyat}
                      </span>
                      <p className="whitespace-pre-line text-emerald-50 font-normal leading-relaxed text-xs sm:text-sm">
                        {tafsirText}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bilah Bawah Rincian */}
              <div className={`p-3 border-t flex items-center justify-between ${
                isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#0a7c29] text-amber-300 font-mono font-black text-xs rounded-lg border border-emerald-400/40">
                    Ayat {showRincianModal.nomorAyat}
                  </span>
                  <button
                    onClick={() => {
                      if (tafsirText) {
                        navigator.clipboard?.writeText(`Tafsir QS. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${showRincianModal.nomorAyat}\n\n${tafsirText}\n\n(Aplikasi Kanomas)`);
                        alert('Teks tafsir berhasil disalin!');
                      }
                    }}
                    className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-300 hover:bg-white/20 font-bold text-xs flex items-center gap-1 transition active:scale-95"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Salin Tafsir</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowRincianModal(null)}
                  className="px-5 py-1.5 rounded-xl bg-[#0a7c29] text-white font-bold text-xs shadow-xs hover:bg-emerald-800 transition active:scale-95"
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-md max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
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

              {/* Konten Pengaturan (Opaque & Rapi Tanpa Tumpang Tindih) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-bold">
                {/* 1. SLIDER HURUF ARAB DENGAN TOMBOL [-] DAN [+] */}
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
                      max="46"
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

                {/* 2. SLIDER HURUF LATIN DENGAN TOMBOL [-] DAN [+] */}
                <div className={`space-y-1.5 p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-emerald-300 text-slate-900'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">Ukuran Huruf Terjemahan</span>
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

                {/* 3. SECTION: PILIHAN MUSHAF & TULISAN ARAB (HANYA INDONESIA, MADINAH, MODERN) */}
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black flex items-center justify-between">
                    <span>Pilihan Tulisan Arab & Mushaf</span>
                    <span className="text-[10px] font-bold lowercase opacity-75">3 Pilihan Resmi</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'indonesia',
                        name: 'Mushaf Indonesia',
                        desc: 'Standar Kemenag RI (LPMQ)',
                        fontClass: 'font-quran-lpmq',
                        sample: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ'
                      },
                      {
                        id: 'madinah',
                        name: 'Mushaf Madinah',
                        desc: 'Standar Malik Fahd (Utsmani)',
                        fontClass: 'font-quran-madinah',
                        sample: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'
                      },
                      {
                        id: 'modern',
                        name: 'Mushaf Modern',
                        desc: 'Noto Naskh Modern Digital',
                        fontClass: 'font-quran-modern',
                        sample: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
                      }
                    ].map((mushaf) => (
                      <button
                        key={mushaf.id}
                        type="button"
                        onClick={() => handleMushafTypeChange(mushaf.id)}
                        className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                          mushafType === mushaf.id
                            ? 'bg-[#0a7c29] text-white border-[#0a7c29] shadow-md ring-2 ring-emerald-400'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black text-xs block leading-tight">{mushaf.name}</span>
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            mushafType === mushaf.id ? 'border-amber-300 bg-amber-400' : 'border-slate-400'
                          }`} />
                        </div>
                        <span className="text-[10px] opacity-80 block leading-tight mb-2">{mushaf.desc}</span>
                        <span
                          className={`${mushaf.fontClass} text-lg block text-right font-medium tracking-wide mt-auto ${
                            mushafType === mushaf.id ? 'text-amber-300' : 'text-[#0a7c29] dark:text-emerald-400'
                          }`}
                          dir="rtl"
                        >
                          {mushaf.sample}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Status Pentashihan & Audit Resmi (Discreet & Terverifikasi) */}
                  <div className={`p-3 rounded-2xl border text-[11px] leading-relaxed transition ${
                    isDark
                      ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200/90'
                      : 'bg-emerald-50/80 border-emerald-300/80 text-emerald-950'
                  }`}>
                    <div className="flex items-center gap-1.5 font-black mb-1 text-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Status Pentashihan & Audit Resmi</span>
                    </div>
                    <p className="text-[10px] leading-relaxed opacity-90">
                      Teks Al-Qur'an telah diaudit 100% lengkap (114 Surah / 6.236 Ayat) bersumber langsung dari otoritas resmi:
                    </p>
                    <div className="mt-1 text-[10px] leading-normal opacity-90 space-y-0.5 pl-1">
                      <div>• <strong>Mushaf Indonesia:</strong> Lajnah Pentashihan Kemenag RI (LPMQ)</div>
                      <div>• <strong>Mushaf Madinah:</strong> Mujamma' Al-Malik Fahd (King Fahd Complex)</div>
                    </div>
                  </div>
                </div>

                {/* 4. SECTION: FITUR TERJEMAH PER KATA (KOSAKATA AYAT) */}
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black">
                    Fitur Terjemah Per Kata
                  </div>
                  <div className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                    showWordByWord
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-2xs'
                      : isDark
                      ? 'bg-slate-800/90 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}>
                    <div className="space-y-0.5 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Languages className="w-4 h-4 text-[#0a7c29] dark:text-emerald-400" />
                        <span className="block text-xs font-black">Terjemah Per Kata (Kosakata Ayat)</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-relaxed">
                        Tampilkan arti perkata di bawah potongan lafadz Arab untuk mempermudah belajar bahasa Al-Qur'an.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleWordByWord}
                      className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none flex items-center ${
                        showWordByWord ? 'bg-[#0a7c29]' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                      title={showWordByWord ? 'Matikan Arti Per Kata' : 'Aktifkan Arti Per Kata'}
                    >
                      <div className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center text-[9px] font-bold ${
                        showWordByWord ? 'translate-x-5 text-emerald-700' : 'translate-x-0.5 text-slate-400'
                      }`}>
                        {showWordByWord ? '✓' : ''}
                      </div>
                    </button>
                  </div>
                </div>

                {/* 4B. SECTION: PILIHAN WARNA POLOS BACAAN */}
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black">
                    Pilihan Warna Background Bacaan (Polos)
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'mushaf', name: 'Hijau Kemenag', color: '#d5f5d8', textColor: '#064e3b' },
                      { id: 'light', name: 'Putih Bersih', color: '#ffffff', textColor: '#0f172a' },
                      { id: 'sepia', name: 'Kertas Sepia', color: '#fbf6ea', textColor: '#854d0e' },
                      { id: 'dark', name: 'Hitam Gelap', color: '#09111c', textColor: '#ffffff' },
                      { id: 'navy', name: 'Biru Malam', color: '#071b2f', textColor: '#7dd3fc' },
                      { id: 'cream', name: 'Krem Antik', color: '#fdfbf7', textColor: '#18181b' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleThemeChange(item.id)}
                        style={{ backgroundColor: item.color, color: item.textColor }}
                        className={`py-2 px-1 rounded-xl border text-center transition flex flex-col items-center justify-center gap-0.5 text-[10px] font-black shadow-2xs active:scale-95 ${
                          themeMode === item.id
                            ? 'ring-2 ring-[#0a7c29] border-[#0a7c29] scale-102 font-black'
                            : 'border-slate-300 dark:border-slate-700 opacity-90 hover:opacity-100'
                        }`}
                      >
                        <span>{item.name}</span>
                        {themeMode === item.id && <span className="text-[9px]">✓ Aktif</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. SECTION: MODE BACA BERSIH (HIDDEN READ) */}
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black">
                    Kenyamanan Membaca (Hidden Read)
                  </div>
                  <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-emerald-300 text-slate-900'
                  }`}>
                    <div>
                      <span className="block text-xs font-black">Mode Baca Bersih (Hidden Read)</span>
                      <span className="text-[10px] opacity-75 block">Menu aksi (tafsir, salin, share) baru muncul saat ayat diklik</span>
                    </div>
                    <button
                      onClick={() => handleToggleHiddenRead(!hiddenReadMode)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition active:scale-95 ${
                        hiddenReadMode ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${hiddenReadMode ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>

                  {/* Spasi Lapang / Spacious Reading */}
                  <div className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-emerald-300 text-slate-900'
                  }`}>
                    <div className="space-y-0.5 max-w-[80%]">
                      <span className="block text-xs font-black">Spasi Lapang & Anti-Menumpuk</span>
                      <span className="text-[10px] opacity-75 block leading-normal">
                        Memberi jarak lega antarkata dan sambungan horizontal lapang agar huruf seperti <span className="font-bold">تَجْرِي</span> dan <span className="font-bold">فَتَحْنَا</span> sangat jelas dan nyaman dibaca.
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleSpaciousMode(!spaciousMode)}
                      className={`w-7 h-7 rounded-full border-2 border-slate-700 flex items-center justify-center transition active:scale-95 ${
                        spaciousMode ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${spaciousMode ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>
                </div>

                {/* 6. SECTION: TERJEMAHAN DAN LATIN */}
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black">
                    Tampilan Terjemahan & Latin
                  </div>

                  <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-emerald-300 text-slate-900'
                  }`}>
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

                  <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-slate-50 border-emerald-300 text-slate-900'
                  }`}>
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
                <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-emerald-100 dark:bg-emerald-950/80 py-1 px-3 rounded-lg text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider font-black flex items-center justify-between">
                    <span>Tajwid & Rincian Warna</span>
                    <button
                      onClick={handleToggleTajweed}
                      className={`w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center transition ${
                        showTajweed ? 'bg-amber-400' : 'bg-emerald-800'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${showTajweed ? 'bg-slate-950' : 'bg-transparent'}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2 px-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Ghunnah & Idgham Bighunnah (Dengung)</span>
                      <span className="w-5 h-5 rounded-full bg-[#e11d48] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Qalqalah (Pantulan Suara قطبجد)</span>
                      <span className="w-5 h-5 rounded-full bg-[#2563eb] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Iqlab (Tukar Nun/Tanwin Menjadi Mim)</span>
                      <span className="w-5 h-5 rounded-full bg-[#7c3aed] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ikhfa Haqiqi & Syafawi (Samar)</span>
                      <span className="w-5 h-5 rounded-full bg-[#059669] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Idgham Bilaghunnah (Lebur Tanpa Dengung)</span>
                      <span className="w-5 h-5 rounded-full bg-[#ea580c] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Mad Wajib & Jaiz (Panjang 4-5 Harakat)</span>
                      <span className="w-5 h-5 rounded-full bg-[#dc2626] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Mad Lazim (Panjang 6 Harakat)</span>
                      <span className="w-5 h-5 rounded-full bg-[#991b1b] border border-slate-400 shadow-2xs" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tafkhim Lam Jalalah (Lafazh Allah Tebal)</span>
                      <span className="w-5 h-5 rounded-full bg-[#d97706] border border-slate-400 shadow-2xs" />
                    </div>
                  </div>
                </div>

                {/* 8. SECTION: PILIHAN QARI MUROTTAL */}
                <div className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs uppercase tracking-wider font-black opacity-80">Pilihan Qari Murottal:</span>
                  <select
                    value={selectedQari}
                    onChange={(e) => setSelectedQari(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-emerald-400 text-slate-900'
                    }`}
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
              <div className={`p-3 border-t flex justify-end ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0a7c29] to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs shadow-md active:scale-95 transition"
                >
                  Simpan & Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 3: SHARE AYAT (CARD GENERATOR DINAMIS & POLOS)      */}
        {/* ======================================================== */}
        {showShareModal && (() => {
          const SHARE_STYLES = [
            // 1. Dinamis / Foto Asli
            {
              id: 'kaaba',
              name: 'Ka’bah Makkah',
              type: 'photo',
              badge: 'Foto Asli',
              icon: '🕋',
              imageUrl: '/assets/bg-kabah.jpg',
              bgStyle: { backgroundColor: '#09111c' },
              borderColor: 'border-amber-400/70',
              isDark: true
            },
            {
              id: 'nature',
              name: 'Gurun Senja',
              type: 'photo',
              badge: 'Foto Asli',
              icon: '🌄',
              imageUrl: '/assets/bg-nature.jpg',
              bgStyle: { backgroundColor: '#09111c' },
              borderColor: 'border-emerald-400/70',
              isDark: true
            },
            {
              id: 'nabawi',
              name: 'Masjid Nabawi',
              type: 'photo',
              badge: 'Foto Asli',
              icon: '🕌',
              imageUrl: '/assets/banners/banner-3-promo.jpg',
              bgStyle: { backgroundColor: '#09111c' },
              borderColor: 'border-amber-300/70',
              isDark: true
            },
            {
              id: 'pelataran',
              name: 'Pelataran Haram',
              type: 'photo',
              badge: 'Foto Asli',
              icon: '🕋',
              imageUrl: '/assets/banners/banner-2-hotel.jpg',
              bgStyle: { backgroundColor: '#09111c' },
              borderColor: 'border-amber-400/70',
              isDark: true
            },
            // 2. Warna Polos & Gradasi Mewah
            {
              id: 'mushaf',
              name: 'Hijau Zamrud',
              type: 'color',
              badge: 'Warna Polos',
              icon: '🟢',
              bgStyle: {
                background: 'linear-gradient(145deg, #064e1c, #0a7c29, #043312)'
              },
              borderColor: 'border-emerald-400/60',
              isDark: true
            },
            {
              id: 'dark',
              name: 'Hitam Onyx',
              type: 'color',
              badge: 'Warna Polos',
              icon: '⚫',
              bgStyle: {
                background: 'linear-gradient(145deg, #09111c, #111c2e, #050b13)'
              },
              borderColor: 'border-amber-400/60',
              isDark: true
            },
            {
              id: 'navy',
              name: 'Royal Navy',
              type: 'color',
              badge: 'Warna Polos',
              icon: '🔵',
              bgStyle: {
                background: 'linear-gradient(145deg, #071b2f, #0d3b66, #041424)'
              },
              borderColor: 'border-sky-400/70',
              isDark: true
            },
            {
              id: 'sepia',
              name: 'Kertas Mushaf',
              type: 'color',
              badge: 'Warna Polos',
              icon: '📜',
              bgStyle: {
                background: 'linear-gradient(145deg, #fbf6ea, #f5ebd6, #eedec0)'
              },
              borderColor: 'border-amber-600/50',
              isDark: false
            },
            {
              id: 'gold',
              name: 'Emas Sultan',
              type: 'color',
              badge: 'Warna Polos',
              icon: '🟡',
              bgStyle: {
                background: 'linear-gradient(145deg, #78350f, #92400e, #451a03)'
              },
              borderColor: 'border-amber-300/80',
              isDark: true
            }
          ];

          const activeShareStyle = SHARE_STYLES.find((s) => s.id === shareBgTheme) || SHARE_STYLES[0];
          const isShareDark = activeShareStyle.isDark;

          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
              <div className="w-full max-w-md max-h-[92vh] rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
                {/* Header Share */}
                <div className="p-3.5 bg-slate-800/90 flex items-center justify-between border-b border-slate-700 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-black">Bagikan Kartu Ayat Al-Qur'an</h3>
                  </div>
                  <button
                    onClick={() => setShowShareModal(null)}
                    className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body: Preview Kartu Ayat & Pilihan Background Dinamis / Polos */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* PREVIEW KARTU AYAT LIVE */}
                  <div
                    ref={shareCardRef}
                    style={activeShareStyle.bgStyle}
                    className={`w-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all border ${activeShareStyle.borderColor} ${
                      shareCardFormat === 'kotak' ? 'aspect-square' : 'min-h-[380px]'
                    }`}
                  >
                    {/* Background Foto Asli & Overlay (Khusus Tipe Photo) */}
                    {activeShareStyle.imageUrl && (
                      <img
                        src={activeShareStyle.imageUrl}
                        alt="Background"
                        crossOrigin="anonymous"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                    )}
                    {activeShareStyle.imageUrl && (
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black/90 pointer-events-none" />
                    )}

                    {/* Decorative Islamic Radial Glow */}
                    <div className="absolute inset-0 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

                    {/* Header Kartu: Q.S. Nama Surat : Ayat */}
                    <div className="relative z-10 text-center pt-1">
                      <span className={`text-[10px] uppercase font-black tracking-widest block mb-0.5 ${
                        isShareDark ? 'text-amber-300/90' : 'text-amber-900/90'
                      }`}>
                        KUTIPAN AYAT SUCI AL-QUR'AN
                      </span>
                      <h2 className={`text-xl sm:text-2xl font-black tracking-wide font-serif drop-shadow-md ${
                        isShareDark ? 'text-amber-300' : 'text-amber-950'
                      }`}>
                        Q.S. {selectedSurah.namaLatin} : {showShareModal.nomorAyat}
                      </h2>
                      <div className={`w-16 h-0.5 mx-auto mt-1 rounded-full ${
                        isShareDark ? 'bg-amber-400/70' : 'bg-amber-600/70'
                      }`} />
                    </div>

                    {/* Teks Arab & Terjemahan Tengah */}
                    <div className="relative z-10 space-y-3 my-auto py-3 text-center">
                      <p
                        style={{ fontFamily: getActiveFontFamily() }}
                        className={`${getArabicFontClass()} text-xl sm:text-2xl leading-loose drop-shadow-md ${
                          isShareDark ? 'text-amber-50' : 'text-slate-950 font-bold'
                        }`}
                        dir="rtl"
                      >
                        {getAyatArabText(showShareModal)}
                      </p>
                      <p className={`text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm px-2 ${
                        isShareDark ? 'text-slate-100' : 'text-slate-800'
                      }`}>
                        "{showShareModal.teksIndonesia}"
                      </p>
                    </div>

                    {/* Footer Kartu: Kanomas Tour & Travel Official Branding */}
                    <div className={`relative z-10 text-center border-t pt-3 flex items-center justify-between ${
                      isShareDark ? 'border-white/20' : 'border-amber-900/20'
                    }`}>
                      <div className="flex items-center gap-2">
                        <img src="/assets/logo-kanomas-3d-192.png" alt="Kanomas" crossOrigin="anonymous" className="w-6 h-6 rounded-lg object-cover" />
                        <div className="text-left">
                          <span className={`text-xs font-black block leading-tight ${
                            isShareDark ? 'text-amber-200' : 'text-amber-950'
                          }`}>
                            Kanomas Tour & Travel
                          </span>
                          <span className={`text-[9px] block ${
                            isShareDark ? 'text-slate-300' : 'text-slate-600'
                          }`}>
                            Izin Resmi Kemenag RI
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border ${
                        isShareDark
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                          : 'bg-emerald-800 text-white border-emerald-900'
                      }`}>
                        appkanomas.mediasosial.net
                      </span>
                    </div>
                  </div>

                  {/* Kontrol Format Kartu (Story vs Feed) */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <button
                      onClick={() => setShareCardFormat('portrait')}
                      className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition active:scale-95 ${
                        shareCardFormat === 'portrait'
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      <span>Story / Status (9:16)</span>
                    </button>
                    <button
                      onClick={() => setShareCardFormat('kotak')}
                      className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition active:scale-95 ${
                        shareCardFormat === 'kotak'
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      <span>Feed / Kotak (1:1)</span>
                    </button>
                  </div>

                  {/* 1. KATEGORI FOTO ASLI & DINAMIS */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-300 font-bold block">1. Background Foto Asli & Dinamis:</span>
                      <span className="text-[10px] text-slate-400">Live wallpaper pemandangan</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SHARE_STYLES.filter((s) => s.type === 'photo').map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setShareBgTheme(style.id)}
                          style={style.bgStyle}
                          className={`p-2 rounded-xl border text-left flex flex-col justify-end h-16 relative overflow-hidden transition active:scale-95 shadow-sm ${
                            shareBgTheme === style.id
                              ? 'ring-2 ring-amber-400 border-amber-400'
                              : 'border-slate-700 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <span className="text-xs font-black text-white drop-shadow-md leading-tight">
                            {style.icon} {style.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. KATEGORI WARNA POLOS & GRADASI */}
                  <div className="space-y-1.5 text-xs pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300 font-bold block">2. Background Warna Polos & Elegan:</span>
                      <span className="text-[10px] text-slate-400">Polos solid & gradasi aksen</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                      {SHARE_STYLES.filter((s) => s.type === 'color').map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setShareBgTheme(style.id)}
                          style={style.bgStyle}
                          className={`py-2 px-1 rounded-xl border text-center transition flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-2xs ${
                            shareBgTheme === style.id
                              ? 'ring-2 ring-emerald-400 border-emerald-400 scale-102'
                              : 'border-slate-700 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <span className="text-xs">{style.icon}</span>
                          <span className={`text-[10px] font-black leading-tight w-full ${style.isDark ? 'text-white' : 'text-slate-900'}`}>
                            {style.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Status Toast */}
                  {shareFeedback && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-bold text-center animate-in fade-in">
                      {shareFeedback}
                    </div>
                  )}

                  {/* Tombol Aksi SHARE */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleShareCardImage(showShareModal)}
                      disabled={isGeneratingImage}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0a7c29] via-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm tracking-wider uppercase shadow-lg active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-75"
                    >
                      {isGeneratingImage ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>MEMBUAT GAMBAR KARTU AYAT...</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-5 h-5" />
                          <span>BAGIKAN GAMBAR KE WHATSAPP</span>
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleDownloadCardImage(showShareModal)}
                        disabled={isGeneratingImage}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition active:scale-95"
                      >
                        <Download className="w-4 h-4 text-emerald-400" />
                        <span>Unduh Gambar HD</span>
                      </button>

                      <button
                        onClick={() => handleCopyAyat(showShareModal)}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition active:scale-95"
                      >
                        <Copy className="w-4 h-4 text-amber-400" />
                        <span>{copiedAyatNum === showShareModal.nomorAyat ? 'Teks Tersalin!' : 'Salin Teks'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ======================================================== */}
        {/* MODAL PRATINJAU GAMBAR KARTU AYAT (UNDUH & SIMPAN AMAN)  */}
        {/* ======================================================== */}
        {previewCardData && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-md max-h-[92vh] rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-3.5 bg-slate-800/90 flex items-center justify-between border-b border-slate-700 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-black">Gambar Kartu Ayat Siap Diunduh</h3>
                </div>
                <button
                  onClick={() => setPreviewCardData(null)}
                  className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body: Gambar Kartu HD & Tombol Aksi */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl bg-black">
                  <img
                    src={previewCardData.dataUrl}
                    alt="Kartu Ayat Kanomas"
                    className="w-full h-auto object-contain select-none"
                  />
                </div>

                {/* Petunjuk khusus pengguna Mobile / HP */}
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs leading-relaxed">
                  <p className="font-bold flex items-center gap-1.5 mb-1 text-amber-300">
                    <span>💡 Petunjuk Simpan ke Galeri HP:</span>
                  </p>
                  <p>
                    Sentuh dan <b>tahan gambar di atas selama 1 detik</b>, lalu pilih <b>"Simpan Gambar"</b> atau <b>"Download Gambar"</b> untuk menyimpannya langsung ke galeri foto HP Anda.
                  </p>
                </div>

                {/* Tombol Aksi */}
                <div className="space-y-2">
                  <a
                    href={previewCardData.dataUrl}
                    download={previewCardData.fileName}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0a7c29] via-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm tracking-wider uppercase shadow-lg active:scale-95 transition flex items-center justify-center gap-2 text-center"
                  >
                    <Download className="w-5 h-5" />
                    <span>UNDUH FILE GAMBAR (PNG HD)</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(previewCardData.captionText)}`;
                        window.open(waUrl, '_blank');
                      }}
                      className="py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Buka WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        const newWin = window.open();
                        if (newWin) {
                          newWin.document.write(`<title>${previewCardData.fileName}</title><body style="margin:0;background:#09111c;display:flex;align-items:center;justify-center;height:100vh;"><img src="${previewCardData.dataUrl}" style="max-width:100%;max-height:100%;object-fit:contain;"/></body>`);
                        }
                      }}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4 text-sky-400" />
                      <span>Buka Tab Baru</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 5: LONCAT KE AYAT TERTENTU (DENGAN BATAS MAKS AYAT) */}
        {/* ======================================================== */}
        {showJumpModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-4 border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#0a7c29] dark:text-emerald-400" />
                  <div>
                    <h3 className="text-base font-black leading-tight">
                      Loncat ke Ayat
                    </h3>
                    <span className="text-[11px] opacity-75 font-medium">
                      QS. {selectedSurah.namaLatin}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowJumpModal(false)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                    isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-75 font-medium">Total Ayat:</span>
                  <span className="font-mono font-black text-[#0a7c29] dark:text-emerald-400 px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80">
                    {selectedSurah.jumlahAyat} ayat (Maks: {selectedSurah.jumlahAyat})
                  </span>
                </div>

                {/* Kontrol Stepper Angka Ayat (Bebas dari Popup Keyboard Android Melayang) */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-50 border-emerald-300'
                }`}>
                  <button
                    onClick={() => {
                      const cur = parseInt(jumpInput, 10) || 1;
                      setJumpInput(String(Math.max(1, cur - 1)));
                    }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl active:scale-95 transition ${
                      isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-slate-200 text-slate-900 border border-slate-200 shadow-sm'
                    }`}
                  >
                    -
                  </button>

                  <div className="text-center flex-1">
                    <span className="text-3xl font-black font-mono text-[#0a7c29] dark:text-emerald-400 block tracking-tight">
                      {jumpInput || 1}
                    </span>
                    <span className="text-[10px] opacity-60 block">
                      dari total {selectedSurah.jumlahAyat} ayat
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const cur = parseInt(jumpInput, 10) || 1;
                      setJumpInput(String(Math.min(selectedSurah.jumlahAyat, cur + 1)));
                    }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl active:scale-95 transition ${
                      isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-slate-200 text-slate-900 border border-slate-200 shadow-sm'
                    }`}
                  >
                    +
                  </button>
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
                    className={`p-1.5 rounded-lg text-center transition active:scale-95 ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-emerald-100 text-slate-800'
                    }`}
                  >
                    Awal (1)
                  </button>
                  <button
                    onClick={() => setJumpInput(String(Math.floor(selectedSurah.jumlahAyat / 3) || 1))}
                    className={`p-1.5 rounded-lg text-center transition active:scale-95 ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-emerald-100 text-slate-800'
                    }`}
                  >
                    Ayat {Math.floor(selectedSurah.jumlahAyat / 3) || 1}
                  </button>
                  <button
                    onClick={() => setJumpInput(String(Math.floor(selectedSurah.jumlahAyat / 2) || 1))}
                    className={`p-1.5 rounded-lg text-center transition active:scale-95 ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-emerald-100 text-slate-800'
                    }`}
                  >
                    Tengah ({Math.floor(selectedSurah.jumlahAyat / 2) || 1})
                  </button>
                  <button
                    onClick={() => setJumpInput(String(selectedSurah.jumlahAyat))}
                    className={`p-1.5 rounded-lg text-center transition active:scale-95 ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-emerald-100 text-slate-800'
                    }`}
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
        {/* MODAL 4: CATATAN PRIBADI AYAT                             */}
        {/* ======================================================== */}
        {showNoteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-sm rounded-3xl shadow-2xl p-5 space-y-4 border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <div>
                    <h3 className="text-base font-black leading-tight">
                      Catatan Ayat
                    </h3>
                    <span className="text-[11px] opacity-75 font-medium">
                      QS. {selectedSurah.namaLatin} : {showNoteModal.nomorAyat}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowNoteModal(null)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                    isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Tulis refleksi, doa, atau catatan pribadi untuk ayat ini..."
                  rows={4}
                  className={`w-full p-3 rounded-2xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0a7c29] ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                {userNotes[`${selectedSurah.nomor}:${showNoteModal.nomorAyat}`] ? (
                  <button
                    onClick={() => handleDeleteNote(`${selectedSurah.nomor}:${showNoteModal.nomorAyat}`)}
                    className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-bold text-xs transition"
                  >
                    Hapus
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNoteModal(null)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold ${
                      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0a7c29] to-emerald-600 hover:from-emerald-700 text-white font-black text-xs shadow-md transition active:scale-95"
                  >
                    Simpan Catatan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 6: PENGATURAN TAJWID INTERAKTIF (PERSIS MYQURAN)    */}
        {/* ======================================================== */}
        {showTajweedGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-[#cbf7d2] text-slate-800 border-emerald-400'
            }`}>
              {/* Header Hijau MyQuran */}
              <div className="bg-[#0a7c29] text-white px-5 py-3.5 flex items-center justify-between">
                <span className="w-6" />
                <h3 className="text-base font-bold tracking-wide">
                  Pengaturan
                </h3>
                <button
                  onClick={() => setShowTajweedGuide(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Daftar Kaidah Tajwid dengan Indikator Warna & Saklar */}
              <div className="p-4 space-y-1.5 text-sm select-none">
                {/* 1. Master Toggle: Tajwid */}
                <div
                  onClick={() => {
                    handleToggleTajweedFilter('master');
                    if (!showTajweed) setShowTajweed(true);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition active:scale-98 ${
                    isDark
                      ? 'bg-slate-800/90 hover:bg-slate-800'
                      : 'bg-emerald-600/15 hover:bg-emerald-600/25'
                  }`}
                >
                  <span className="font-bold text-sm">Tajwid</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    (showTajweed && tajweedFilters.master)
                      ? 'bg-[#ffff00] border-emerald-900 shadow-sm scale-105'
                      : 'bg-slate-400/30 border-slate-500'
                  }`}>
                    {(showTajweed && tajweedFilters.master) && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-900" />
                    )}
                  </div>
                </div>

                {/* 2. Madd 2-4-6 Harakat */}
                <div
                  onClick={() => handleToggleTajweedFilter('madd246')}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm">Madd 2-4-6 Harakat</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tajweedFilters.madd246
                      ? 'bg-[#00ac51] border-emerald-900 shadow-xs'
                      : 'bg-transparent border-slate-400 opacity-40'
                  }`}>
                    {tajweedFilters.madd246 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* 3. Madd 4-5 Harakat */}
                <div
                  onClick={() => handleToggleTajweedFilter('madd45')}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm">Madd 4-5 Harakat</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tajweedFilters.madd45
                      ? 'bg-[#00b0fc] border-sky-900 shadow-xs'
                      : 'bg-transparent border-slate-400 opacity-40'
                  }`}>
                    {tajweedFilters.madd45 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* 4. Madd 6 Harakat */}
                <div
                  onClick={() => handleToggleTajweedFilter('madd6')}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm">Madd 6 Harakat</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tajweedFilters.madd6
                      ? 'bg-[#ff57bc] border-pink-900 shadow-xs'
                      : 'bg-transparent border-slate-400 opacity-40'
                  }`}>
                    {tajweedFilters.madd6 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* Divider Line */}
                <div className={`border-t my-1 ${isDark ? 'border-slate-800' : 'border-emerald-300/80'}`} />

                {/* 5. Idgam Bigunnah */}
                <div
                  onClick={() => handleToggleTajweedFilter('idghamBighunnah')}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm">Idgam Bigunnah</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tajweedFilters.idghamBighunnah
                      ? 'bg-[#ff5896] border-rose-900 shadow-xs'
                      : 'bg-transparent border-slate-400 opacity-40'
                  }`}>
                    {tajweedFilters.idghamBighunnah && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* 6. Idgam Bilagunnah */}
                <div
                  onClick={() => handleToggleTajweedFilter('idghamBilagunnah')}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm">Idgam Bilagunnah</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tajweedFilters.idghamBilagunnah
                      ? 'bg-[#f91923] border-red-950 shadow-xs'
                      : 'bg-transparent border-slate-400 opacity-40'
                  }`}>
                    {tajweedFilters.idghamBilagunnah && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* 7. Ikhfa */}
                <div
                  onClick={() => handleToggleTajweedFilter('ikhfa')}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm">Ikhfa</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tajweedFilters.ikhfa
                      ? 'bg-[#00c055] border-emerald-950 shadow-xs'
                      : 'bg-transparent border-slate-400 opacity-40'
                  }`}>
                    {tajweedFilters.ikhfa && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* 8. Iqlab */}
                <div
                  onClick={() => handleToggleTajweedFilter('iqlab')}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm">Iqlab</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tajweedFilters.iqlab
                      ? 'bg-[#00afff] border-sky-950 shadow-xs'
                      : 'bg-transparent border-slate-400 opacity-40'
                  }`}>
                    {tajweedFilters.iqlab && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* 9. Qalqalah */}
                <div
                  onClick={() => handleToggleTajweedFilter('qalqalah')}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-xs sm:text-sm">Qalqalah</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tajweedFilters.qalqalah
                      ? 'bg-[#407af8] border-blue-950 shadow-xs'
                      : 'bg-transparent border-slate-400 opacity-40'
                  }`}>
                    {tajweedFilters.qalqalah && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>

              {/* Footer Tombol Selesai */}
              <div className="p-3 bg-black/5 dark:bg-slate-950/40 border-t border-emerald-300 dark:border-slate-800">
                <button
                  onClick={() => setShowTajweedGuide(false)}
                  className="w-full py-2.5 rounded-xl bg-[#0a7c29] hover:bg-emerald-800 text-white font-black text-xs shadow-xs transition active:scale-95"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 7: PILIH AYAT LANGSUNG DARI DAFTAR SURAT           */}
        {/* ======================================================== */}
        {surahAyatJumpModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-md max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-amber-300" />
                  <div>
                    <h3 className="text-sm sm:text-base font-black leading-tight">
                      Pilih Ayat: QS. {surahAyatJumpModal.namaLatin}
                    </h3>
                    <span className="text-[11px] text-emerald-200 font-medium">
                      Total {surahAyatJumpModal.jumlahAyat} Ayat • {surahAyatJumpModal.arti}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSurahAyatJumpModal(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium text-center">
                  Ketuk nomor ayat untuk langsung mulai membaca:
                </p>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                  {Array.from({ length: surahAyatJumpModal.jumlahAyat }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        handleOpenSurah(surahAyatJumpModal, num);
                        setSurahAyatJumpModal(null);
                      }}
                      className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs sm:text-sm active:scale-95 transition shadow-2xs"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 7B: PILIH SURAT (114 SURAT LENGKAP - NAVIGASI CEPAT) */}
        {/* ======================================================== */}
        {showSurahPickerModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-300" />
                  <h3 className="text-sm sm:text-base font-black">Pilih Surat dari 114 Surat</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSurahPickerModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search bar inside modal */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={quickSurahFilter}
                    onChange={(e) => setQuickSurahFilter(e.target.value)}
                    placeholder="Cari nomor atau nama surat (contoh: 36, Yasin, Al-Mulk)..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0a7c29]"
                    autoFocus
                  />
                  {quickSurahFilter && (
                    <button
                      type="button"
                      onClick={() => setQuickSurahFilter('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid 114 Surat */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {SURAH_LIST.filter(
                  (s) =>
                    s.namaLatin.toLowerCase().includes(quickSurahFilter.toLowerCase()) ||
                    s.arti.toLowerCase().includes(quickSurahFilter.toLowerCase()) ||
                    String(s.nomor).includes(quickSurahFilter)
                ).map((surah) => (
                  <button
                    key={surah.nomor}
                    type="button"
                    onClick={() => {
                      setQuickSurahNum(surah.nomor);
                      if (quickAyatNum > surah.jumlahAyat) {
                        setQuickAyatNum(surah.jumlahAyat);
                      }
                      setShowSurahPickerModal(false);
                      setQuickSurahFilter('');
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition flex items-center justify-between gap-2 ${
                      quickSurahNum === surah.nomor
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-[#0a7c29] dark:text-emerald-300 font-mono font-black text-xs flex items-center justify-center flex-shrink-0">
                        {surah.nomor}
                      </span>
                      <div className="min-w-0">
                        <span className="font-bold text-xs block truncate text-slate-900 dark:text-white">
                          {surah.namaLatin}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                          {surah.arti} • {surah.jumlahAyat} ayat
                        </span>
                      </div>
                    </div>
                    <span className="font-quran-lpmq text-base text-[#0a7c29] dark:text-emerald-400 font-bold flex-shrink-0" dir="rtl">
                      {surah.nama}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 7C: GRID NOMOR AYAT (INTERAKTIF - NAVIGASI CEPAT)    */}
        {/* ======================================================== */}
        {showAyatGridPicker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-md max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-amber-300" />
                  <div>
                    <h3 className="text-sm sm:text-base font-black leading-tight">
                      Pilih Ayat: QS. {currentQuickSurah.namaLatin}
                    </h3>
                    <span className="text-[11px] text-emerald-200 font-medium">
                      Total {currentQuickSurah.jumlahAyat} Ayat • {currentQuickSurah.arti}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAyatGridPicker(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium text-center">
                  Ketuk nomor ayat untuk memilih:
                </p>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                  {Array.from({ length: currentQuickSurah.jumlahAyat }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setQuickAyatNum(num);
                        setShowAyatGridPicker(false);
                      }}
                      className={`py-2.5 rounded-xl border font-mono font-bold text-xs sm:text-sm active:scale-95 transition shadow-2xs ${
                        quickAyatNum === num
                          ? 'bg-[#0a7c29] text-white border-[#0a7c29] ring-2 ring-amber-400'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 8: BUAT TARGET KHATAMAN BARU                       */}
        {/* ======================================================== */}
        {showNewKhatamModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-300" />
                  <h3 className="text-base font-black">Buat Target Khataman Baru</h3>
                </div>
                <button
                  onClick={() => setShowNewKhatamModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateKhatam} className="p-4 sm:p-5 space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Judul Program Khataman *
                  </label>
                  <input
                    type="text"
                    required
                    value={newKhatamInput.title}
                    onChange={(e) => setNewKhatamInput({ ...newKhatamInput, title: e.target.value })}
                    placeholder="Contoh: Khataman Ramadhan 1447H, Khataman Rutin"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Khataman Siapa / Niat Untuk *
                  </label>
                  <input
                    type="text"
                    required
                    value={newKhatamInput.targetPerson}
                    onChange={(e) => setNewKhatamInput({ ...newKhatamInput, targetPerson: e.target.value })}
                    placeholder="Contoh: Pribadi, Untuk Ibu Tercinta, Almarhum Ayah"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tanggal Awal Baca *
                    </label>
                    <input
                      type="date"
                      required
                      value={newKhatamInput.startDate}
                      onChange={(e) => setNewKhatamInput({ ...newKhatamInput, startDate: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Target Waktu (Hari)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={newKhatamInput.targetDays}
                      onChange={(e) => setNewKhatamInput({ ...newKhatamInput, targetDays: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Catatan / Doa & Harapan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={newKhatamInput.notes}
                    onChange={(e) => setNewKhatamInput({ ...newKhatamInput, notes: e.target.value })}
                    placeholder="Tulis niat doa, harapan, atau pesan untuk khataman ini..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowNewKhatamModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0a7c29] to-emerald-600 hover:from-emerald-700 text-white font-black shadow-md transition active:scale-95"
                  >
                    Simpan Program
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
