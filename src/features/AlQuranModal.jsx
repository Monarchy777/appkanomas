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
  ChevronDown,
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

// FUNGSI PEMANJANG HURUF / KASHIDA (TATWEEL)
// Mengurai ligatur bertumpuk vertikal (seperti Lam di atas Ha pada 'لَهُمْ' menjadi sejajar mendatar 'لَـهُمْ' di depan, serta Ta pada 'فَتَـحْنَا' dan 'تَـجْرِي')
// Menjaga keaslian kaidah Rasm Utsmani dan 100% kompatibel dengan mesin warna tajwid.
export function applyKashidaToArabic(text, mode = 'unstack') {
  if (!text || mode === 'off') return text || '';
  let res = text;

  // 1. Lam + Ha (له / لہ -> لـه) agar huruf Lam selalu berada di DEPAN pada garis dasar dan TIDAK menindih di atas Ha
  res = res.replace(/([\u0644][\u064B-\u065F\u0670\u06E1]*)([\u0647\u06C1])/g, (m, p1, p2) => p1 + '\u0640' + p2);

  // 2. Ta + Ha/Jim/Kha (تح / تج / تخ -> تـح / تـج / تـخ) agar gigi Ta jelas terpisah di depan kepala jim/ha
  res = res.replace(/([\u062A][\u064B-\u065F\u0670\u06E1]*)([\u062D\u062C\u062E])/g, (m, p1, p2) => p1 + '\u0640' + p2);

  // 3. Gigi Ba/Tha/Nun/Ya + Jim/Ha/Kha (misal يَـحْزُنُهُمُ, نَـحْنُ, بِـحَمْدِ, يَـجْعَلُونَ)
  res = res.replace(/([\u0628\u062B\u0646\u064A\u0649][\u064B-\u065F\u0670\u06E1]*)([\u062D\u062C\u062E])/g, (m, p1, p2) => p1 + '\u0640' + p2);

  // 4. Gigi Ba/Ta/Tha/Nun/Ya + Mim (misal بِـسْمِ, تَـمْشِي, نَـعَمْ, ثُـمَّ)
  res = res.replace(/([\u0628\u062A\u062B\u0646\u064A][\u064B-\u065F\u0670\u06E1]*)([\u0645])/g, (m, p1, p2) => p1 + '\u0640' + p2);

  // 5. Sin/Shin + Mim (misal بِسْـمِ) agar Mim tidak tenggelam di bawah lengkungan Sin
  res = res.replace(/([\u0633\u0634][\u064B-\u065F\u0670\u06E1]*)([\u0645])/g, (m, p1, p2) => p1 + '\u0640' + p2);

  // 6. Ya/Alif Maqsura + Ha (misal عَلَيْـهِمْ, إِلَيْـهِ, فِيـهِمْ, بَيْنَـهُمْ)
  res = res.replace(/([\u064A\u0649][\u064B-\u065F\u0670\u06E1]*)([\u0647\u06C1])/g, (m, p1, p2) => p1 + '\u0640' + p2);

  // 7. Mode Ekstra: Elongasi sambungan menyeluruh antarkata agar huruf lebih lapang dan renggang
  if (mode === 'extra') {
    res = res.replace(/([\u0628\u062A\u062B\u062C\u062D\u062E\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u0643\u0644\u0645\u0646\u0647\u064A][\u064B-\u065F\u0670\u06E1]*)(\u0640?)([\u0628\u062A\u062B\u062C\u062D\u062E\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u0643\u0644\u0645\u0646\u0647\u064A])/g, (m, p1, t, p2) => p1 + '\u0640' + p2);
  }

  return res;
}

// NORMALISASI TEKS ARAB AL-QUR'AN (STANDAR RESMI LPMQ KEMENAG RI PERSIS MYQURAN & RASM UTSMANI MADINAH)
export function normalizeQuranText(text, isMadinah = false) {
  if (!text) return '';
  let cleaned = text
    // 1. Bersihkan karakter kontrol tak kasat mata
    .replace(/[\uFEFF\u200B\u200C\u200E\u200F]/g, '')
    // 2. Hapus huruf Ae salah tempat (\u06D5) yang sering muncul sebelum waqaf di API equran.id
    .replace(/\u06D5/g, '')
    // 3. Hapus tanda ruku khusus (\u08D6) agar tampilan rapi & konsisten
    .replace(/\u08D6/g, '')
    // 4. Normalisasi meem iqlab Tanzil (\u06ED) ke standard small high meem (\u06E2)
    .replace(/\u06ED/g, '\u06E2')
    .replace(/[\u06EA\u06EB]/g, '')
    // 5. Rapatkan meem iqlab ke kata agar duduk pas di atas tanwin/nun mati persis MyQuran
    .replace(/\s+(\u06E2)/g, '$1')
    // 6. Pisahkan tanda waqaf baik sebelum maupun sesudahnya agar tidak menindih huruf/tanwin
    .replace(/([^\s])([ۖ-ۜۘ-ۛ])/g, '$1 $2')
    .replace(/([ۖ-ۜۘ-ۛ])([^\s])/g, '$1 $2');

  // 7. Normalisasi Dhabth Sesuai Standar Mushaf:
  if (isMadinah) {
    // A. MUSHAF MADINAH & MODERN (Rasm Utsmani Madinah / King Fahd Complex):
    // - Dhommah terbalik (U+0657) -> Dhammah biasa + Wawu kecil (ُۥ / \u064F\u06E5)
    //   (Mencegah kode U+0657 pada font KFGQPC terbaca/terlihat menjadi open fathatan)
    // - Kasrah berdiri (U+0656) -> Kasrah biasa + Ya kecil (ِۦ / \u0650\u06E6)
    // - Tanda sukun mati -> Kepala kha' Utsmani (\u06E1)
    // - Small madda (\u06E4) -> Standard madda (\u0653)
    cleaned = cleaned
      .replace(/\u0657/g, '\u064F\u06E5')
      .replace(/\u0656/g, '\u0650\u06E6')
      .replace(/\u0652/g, '\u06E1')
      .replace(/\u06E4/g, '\u0653');
  } else {
    // B. MUSHAF STANDAR INDONESIA (MSI LPMQ Kemenag RI persis MyQuran The Wali Studio):
    // - Tanda sukun SELALU sukun bulat (\u0652). Font LPMQ Isep Misbah menggunakan \u0652 untuk glif sukun bulat otentik.
    //   Jika ada sisa kepala kha' (\u06E1), kembalikan ke \u0652 agar tidak hilang/kosong!
    // - Dhommah terbalik (U+0657) dan Kasrah berdiri (U+0656) dipertahankan utuh karena font LPMQ memiliki glif otentik Kemenag!
    cleaned = cleaned.replace(/\u06E1/g, '\u0652');
  }

  cleaned = cleaned.replace(/\s+/g, ' ');
  return cleaned.trim();
}

// KONVERSI PARIPURNA KE RASM UTSMANI MADINAH (STANDAR KOMPLEKS RAJA FAHD MADINAH MUNAWWARAH)
export function convertToUthmaniMadinah(text) {
  if (!text) return '';
  let res = text
    .replace(/[\uFEFF\u200B\u200C\u200E\u200F]/g, '')
    .replace(/\u06D5/g, '')
    .replace(/\u08D6/g, '')
    // Konversi tanda sukun bulat Kemenag ke kepala Kha' Utsmani (\u06E1)
    .replace(/\u0652/g, '\u06E1')
    // Dhommah terbalik Kemenag (U+0657) -> Dhammah biasa + Wawu kecil Utsmani (ُۥ / \u064F\u06E5)
    .replace(/\u0657/g, '\u064F\u06E5')
    // Kasrah berdiri Kemenag (U+0656) -> Kasrah biasa + Ya kecil Utsmani (ِۦ / \u0650\u06E6)
    .replace(/\u0656/g, '\u0650\u06E6')
    // Small madda Tanzil/Kemenag -> Madda standar Utsmani
    .replace(/\u06E4/g, '\u0653')
    // Meem iqlab Tanzil -> Small high meem Utsmani
    .replace(/\u06ED/g, '\u06E2')
    // Alif washal pada alif lam ta'rif: اَلْـ -> ٱلْـ dan اَلـ -> ٱلـ
    .replace(/(^|\s)ا([َُِ]?)ل([\u06E1\u0651])/g, '$1ٱل$3')
    // Alif washal pada nama Allah: اللّٰه -> ٱللَّه
    .replace(/(^|\s)الل[ّٰ]+هِ/g, '$1ٱللَّهِ')
    .replace(/(^|\s)الل[ّٰ]+هُ/g, '$1ٱللَّهُ')
    .replace(/(^|\s)الل[ّٰ]+هَ/g, '$1ٱللَّهَ')
    // Ar-Rahman di Madinah: الرَّحْمٰنِ -> ٱلرَّحْمَـٰنِ
    .replace(/الرَّحْم[َٰ]*نِ/g, 'ٱلرَّحْمَـٰنِ')
    // Ar-Rahim di Madinah: الرَّحِيْمِ -> ٱلرَّحِيمِ
    .replace(/الرَّحِي[ِْ]*مِ/g, 'ٱلرَّحِيمِ');

  return normalizeQuranText(res, true);
}

// HELPER BERSIHKAN TANDA KURUNG HARAKAT WAQAF (AMAN UNTUK TENGAH MAUPUN AKHIR AYAT)
export function cleanWaqfParentheses(text) {
  if (!text) return '';
  // 1. Tanda kurung waqaf di akhir kalimat: (i). atau (u), atau (a). -> akhiri dengan titik
  let res = text.replace(/\s*\(([aiueoAIUEO]|an|in|un)\)\s*([.,;])?\s*$/, '.');
  // 2. Tanda kurung waqaf di tengah kalimat: fīh(i), -> fīh, ATAU fīh(i) -> fīh (jangan beri titik di tengah kalimat!)
  res = res.replace(/\s*\(([aiueoAIUEO]|an|in|un)\)\s*([.,;])?/g, (m, v, punct) => punct ? punct + ' ' : ' ');
  // 3. Rapikan spasi dan tanda baca
  res = res.replace(/\s+/g, ' ').replace(/\s+([.,;])/g, '$1').trim();
  if (!/[.!?]$/.test(res)) res += '.';
  return res;
}

// FORMAT TRANSLITERASI LATIN SESUAI 3 STANDAR MUSHAF (KEMENAG RI, MADINAH UTSMANI, & MODERN POPULER)
export function formatAyatLatin(rawLatin, mushafType = 'indonesia') {
  if (!rawLatin) return '';
  const cleaned = cleanWaqfParentheses(rawLatin);

  // 1. Mode Modern: Ejaan Populer Indonesia tanpa huruf bertitik rumit (sangat mudah dibaca orang awam & lansia)
  if (mushafType === 'modern') {
    return cleaned
      // Vokal panjang ke huruf alfabet biasa
      .replace(/ā/g, 'a').replace(/Ā/g, 'A')
      .replace(/ī/g, 'i').replace(/Ī/g, 'I')
      .replace(/ū/g, 'u').replace(/Ū/g, 'U')
      // Konsonan bertitik ke ejaan populer Indonesia
      .replace(/ḥ/g, 'h').replace(/Ḥ/g, 'H')
      .replace(/ṣ/g, 'sh').replace(/Ṣ/g, 'Sh')
      .replace(/ḍ/g, 'dh').replace(/Ḍ/g, 'Dh')
      .replace(/ṭ/g, 'th').replace(/Ṭ/g, 'Th')
      .replace(/ẓ/g, 'zh').replace(/Ẓ/g, 'Zh')
      .replace(/ż/g, 'dz').replace(/Ż/g, 'Dz')
      .replace(/ṡ/g, 'ts').replace(/Ṡ/g, 'Ts')
      // Ghain (data Kemenag sering hanya 'g')
      .replace(/\bgair/gi, 'ghair')
      .replace(/\bgaib/gi, 'ghaib')
      .replace(/magḍ/gi, 'maghd')
      .replace(/magd/gi, 'maghd')
      .replace(/laḍ-ḍāll/gi, 'ladh-dhall')
      .replace(/laḍ-ḍall/gi, 'ladh-dhall')
      // Tanda kutip 'ain & hamzah
      .replace(/[‘`]/g, "'")
      .replace(/bismillāhir-raḥmānir-raḥīm/gi, 'Bismillahir-rahmanir-rahim')
      .replace(/al-ḥamdu/gi, 'Alhamdulillahi')
      .replace(/rabbil-‘ālamīn/gi, "rabbil 'alamin");
  }

  // 2. Mode Madinah: Transliterasi Standar Utsmani Internasional (King Fahd Complex / Encyclopedia of Islam / IJMES)
  if (mushafType === 'madinah') {
    return cleaned
      // Dzal -> dh, Tsa -> th, Syin -> sh
      .replace(/ż/g, 'dh').replace(/Ż/g, 'Dh')
      .replace(/ṡ/g, 'th').replace(/Ṡ/g, 'Th')
      .replace(/\bsy/g, 'sh').replace(/\bSy/g, 'Sh')
      // Ghain
      .replace(/\bgair/gi, 'ghayr')
      .replace(/\bgaib/gi, 'ghayb')
      .replace(/magḍ/gi, 'maghḍ')
      .replace(/magd/gi, 'maghḍ')
      // Diphthong ay / aw
      .replace(/yaum/gi, 'yawm')
      .replace(/khauf/gi, 'khawf')
      .replace(/alaihim/gi, 'alayhim')
      .replace(/ilaihi/gi, 'ilayhi')
      .replace(/kaifa/gi, 'kayfa')
      .replace(/baina/gi, 'bayna')
      // Kapitalisasi istilah ilahiah & nama surah
      .replace(/\bbismillāh/gi, 'Bismillāh')
      .replace(/\bal-ḥamdu/gi, 'Al-ḥamdu')
      .replace(/\bar-raḥmān/gi, 'Ar-Raḥmān')
      .replace(/\bar-raḥīm/gi, 'Ar-Raḥīm')
      .replace(/\brabb/gi, 'Rabb')
      .replace(/\bmāliki/gi, 'Māliki')
      .replace(/\bihdinaṣ/gi, 'Ihdinaṣ')
      .replace(/\bṣirāṭ/gi, 'Ṣirāṭ')
      .replace(/\ballāh/gi, 'Allāh');
  }

  // 3. Mode Indonesia (Kemenag RI): SKB Menteri Agama & Mendikbud RI resmi
  // Mempertahankan diakritik resmi SKB (ā, ī, ū, ḥ, ṣ, ḍ, ṭ, ẓ, ż, ṡ), menyelaraskan ghain revisi
  return cleaned
    .replace(/\bgair/gi, 'ghair')
    .replace(/\bgaib/gi, 'ghaib')
    .replace(/magd/gi, 'magd');
}

// FORMAT TERJEMAHAN BAHASA INDONESIA SESUAI STANDAR MUSHAF (RAPI, BEBAS KOMA GANTUNG)
export function formatAyatTranslation(rawText, mushafType = 'indonesia') {
  if (!rawText) return '';
  let cleaned = rawText
    // Ganti koma menggantung di akhir ayat menjadi titik
    .replace(/\s*,\s*$/, '.')
    .replace(/\s+/g, ' ')
    .trim();

  if (!/[.!?]$/.test(cleaned)) {
    cleaned += '.';
  }

  if (mushafType === 'modern') {
    // Mode Modern: redaksi mengalir jernih tanpa tanda kurung berulang yang kaku
    cleaned = cleaned
      .replace(/\(yaitu\)\s*/gi, 'Yaitu ')
      .replace(/\(pula jalan\)\s*/gi, 'pula ')
      .replace(/\(jalan\)\s*/gi, 'jalan ');
  }

  return cleaned;
}

// RENDER TAJWID AMAN DENGAN RTL MURNI, KAIDAH ILMU TAJWID PERSIS MYQURAN, & TANPA ZWJ (ANTI-MENUMPUK)
function renderSafeTajweed(text, themeMode = 'mushaf', showTajweed = true, wbwOptions = null, tajweedFilters = null) {
  if (!text) return null;
  const palette = TAJWEED_THEME_RULES[themeMode] || TAJWEED_THEME_RULES.mushaf;

  // Master switch check: jika tajwid dimatikan global atau via filter master
  const isMasterActive = showTajweed && (tajweedFilters ? tajweedFilters.master !== false : true);

  // Jika Tajwid OFF dan Terjemah Per-Kata OFF: render teks murni langsung (shaping teks 100% mulus tanpa terpotong span)
  if (!isMasterActive && (!wbwOptions || !wbwOptions.wbwWords)) {
    return text;
  }

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
              fontWeight: 500
            }}
            className={`${wbwOptions.arabicFontClass} font-medium select-text`}
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
      <span key={`w-${wordIdx}`} style={{ display: 'inline', unicodeBidi: 'isolate', fontWeight: 500 }}>
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

  // 1B. Penanda Ayat Terakhir & Auto-Save
  const [lastReadPosition, setLastReadPosition] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 1A. Navigasi Roda 3 Lapis (Astrolabe): Juz (Dalam), Surat (Tengah), Ayat (Luar)
  const [wheelJuzNum, setWheelJuzNum] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_last_read');
      if (saved) {
        const parsed = JSON.parse(saved);
        const s = SURAH_LIST.find((item) => item.nomor === parsed.surahNomor);
        if (s && s.juz) return s.juz;
      }
    } catch {}
    return 1;
  });
  const [quickSurahNum, setQuickSurahNum] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_last_read');
      if (saved) return JSON.parse(saved).surahNomor || 1;
    } catch {}
    return 1;
  });
  const [quickAyatNum, setQuickAyatNum] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_last_read');
      if (saved) return JSON.parse(saved).ayatNomor || 1;
    } catch {}
    return 1;
  });
  const [verticalPickerType, setVerticalPickerType] = useState(null); // 'juz' | 'surah' | 'ayat' | null
  const [verticalSearchQuery, setVerticalSearchQuery] = useState('');
  const currentQuickSurah = SURAH_LIST.find((s) => s.nomor === quickSurahNum) || SURAH_LIST[0];

  // Auto-scroll ke angka yang sedang aktif saat pemilih vertikal dibuka
  useEffect(() => {
    if (verticalPickerType) {
      const activeId =
        verticalPickerType === 'juz'
          ? `picker-item-juz-${wheelJuzNum}`
          : verticalPickerType === 'surah'
          ? `picker-item-surah-${quickSurahNum}`
          : `picker-item-ayat-${quickAyatNum}`;

      const timer = setTimeout(() => {
        const el = document.getElementById(activeId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [verticalPickerType, wheelJuzNum, quickSurahNum, quickAyatNum]);

  // Navigasi Tata Surya Al-Qur'an: Planet Juz (Dalam), Planet Surat (Tengah), Planet Ayat (Luar)
  // Pergeseran sudut rotasi saat disentuh & diputar dengan 1 jari (continuous 60fps tracking)
  const [dragOffsets, setDragOffsets] = useState({ juz: 0, surah: 0, ayat: 0 });
  const [isDraggingRing, setIsDraggingRing] = useState(null); // 'juz' | 'surah' | 'ayat' | null

  const wheelContainerRef = useRef(null);
  const dragStateRef = useRef(null);
  const rafIdRef = useRef(null);

  // Handler Putar Planet dengan 1 Jari (1-Finger Solar Orbit Drag pada Kubah 1/2 Lingkaran)
  const handleWheelPointerDown = (e) => {
    if (!wheelContainerRef.current) return;
    const rect = wheelContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    // Pusat kubah setengah lingkaran berada di poros bawah (y = 175 dari total 185)
    const centerY = rect.top + rect.height * (175 / 185);
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const radius = Math.sqrt(dx * dx + dy * dy);
    // Konversi skala pixel ke radius SVG (basis setengah lingkaran: radius 170)
    const scale = 170 / (rect.width / 2);
    const svgR = radius * scale;

    let ringType = null;
    if (svgR < 35) {
      // Pusat kubah: Matahari
      return;
    } else if (svgR >= 35 && svgR < 85) {
      ringType = 'juz';
    } else if (svgR >= 85 && svgR < 125) {
      ringType = 'surah';
    } else if (svgR >= 125) {
      ringType = 'ayat';
    }

    if (!ringType) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const startAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    dragStateRef.current = {
      ringType,
      pointerId: e.pointerId,
      centerX,
      centerY,
      lastAngle: startAngle,
      accumulatedAngle: 0
    };
    setIsDraggingRing(ringType);
  };

  const handleWheelPointerMove = (e) => {
    if (!dragStateRef.current) return;
    const { ringType, centerX, centerY, lastAngle } = dragStateRef.current;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    let delta = currentAngle - lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    dragStateRef.current.lastAngle = currentAngle;
    dragStateRef.current.accumulatedAngle += delta;

    const stepAngle = ringType === 'ayat' ? 24 : ringType === 'surah' ? 28 : 32;

    if (dragStateRef.current.accumulatedAngle >= stepAngle) {
      const steps = Math.floor(dragStateRef.current.accumulatedAngle / stepAngle);
      dragStateRef.current.accumulatedAngle -= steps * stepAngle;
      if (ringType === 'ayat') {
        handleRotateAyat(steps);
      } else if (ringType === 'surah') {
        handleRotateSurah(steps);
      } else if (ringType === 'juz') {
        handleRotateJuz(steps);
      }
      if (navigator.vibrate) try { navigator.vibrate(6); } catch {}
    } else if (dragStateRef.current.accumulatedAngle <= -stepAngle) {
      const steps = Math.ceil(dragStateRef.current.accumulatedAngle / stepAngle);
      dragStateRef.current.accumulatedAngle -= steps * stepAngle;
      if (ringType === 'ayat') {
        handleRotateAyat(steps);
      } else if (ringType === 'surah') {
        handleRotateSurah(steps);
      } else if (ringType === 'juz') {
        handleRotateJuz(steps);
      }
      if (navigator.vibrate) try { navigator.vibrate(6); } catch {}
    }

    // 60fps rAF Throttling untuk performa super ringan dan mulus tanpa render berlebih
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        if (dragStateRef.current) {
          setDragOffsets((prev) => ({
            ...prev,
            [dragStateRef.current.ringType]: dragStateRef.current.accumulatedAngle
          }));
        }
      });
    }
  };

  const handleWheelPointerUp = (e) => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (!dragStateRef.current) return;
    try {
      if (e && e.currentTarget && e.pointerId) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
    dragStateRef.current = null;
    setIsDraggingRing(null);
    setDragOffsets({ juz: 0, surah: 0, ayat: 0 });
  };

  // Helper Rotasi Roda Navigasi 3 Lapis (Bersih dari side-effects di setter)
  const handleRotateJuz = (delta) => {
    setWheelJuzNum((prev) => {
      const nextJuz = ((prev - 1 + delta + 30) % 30) + 1;
      const targetJuzData = JUZ_LIST[nextJuz - 1];
      if (targetJuzData) {
        Promise.resolve().then(() => {
          setQuickSurahNum(targetJuzData.surahNomor);
          setQuickAyatNum(targetJuzData.ayat || 1);
        });
      }
      return nextJuz;
    });
  };

  const handleRotateSurah = (delta) => {
    setQuickSurahNum((prev) => {
      const nextSurah = ((prev - 1 + delta + 114) % 114) + 1;
      const sObj = SURAH_LIST.find((s) => s.nomor === nextSurah) || SURAH_LIST[0];
      if (sObj) {
        Promise.resolve().then(() => {
          setWheelJuzNum(sObj.juz);
          setQuickAyatNum(1);
        });
      }
      return nextSurah;
    });
  };

  const handleRotateAyat = (delta) => {
    setQuickAyatNum((prev) => {
      const max = currentQuickSurah.jumlahAyat;
      return ((prev - 1 + delta + max) % max) + 1;
    });
  };

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
      return localStorage.getItem('kanomas_mushaf_type_v3') || 'indonesia';
    } catch {
      return 'indonesia';
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

  // Pemanjang Huruf & Sambungan Sejajar (Kashida / Tatweel):
  // Nilai: 'unstack' (Sejajar/Rekomendasi - Lam di depan Ha, Ta di depan Ha/Jim), 'extra' (Ekstra Panjang), 'off' (Asli Rapat)
  const [kashidaMode, setKashidaMode] = useState(() => {
    try {
      const saved = localStorage.getItem('kanomas_quran_kashida');
      if (saved === 'off' || saved === 'extra' || saved === 'unstack') return saved;
      if (saved === 'false') return 'off';
      if (saved === 'true') return 'unstack';
      return 'unstack'; // Default 'unstack' (Sejajar & Rapi, Lam di depan Ha)
    } catch {
      return 'unstack';
    }
  });

  const handleChangeKashidaMode = (mode) => {
    setKashidaMode(mode);
    try {
      localStorage.setItem('kanomas_quran_kashida', mode);
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
  const [tafsirSource, setTafsirSource] = useState('kemenag'); // 'kemenag' | 'ringkas'
  const [tafsirFontSize, setTafsirFontSize] = useState(13); // 12 | 14 | 16
  const [tafsirText, setTafsirText] = useState(null);
  const [tafsirRingkasText, setTafsirRingkasText] = useState(null);
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

    try {
      // Bersihkan cache surah versi lawas (v1 - v15) agar user otomatis mendapat rasm Utsmani dan sukun terbaru
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('kanomas_surah_') && !key.startsWith('kanomas_surah_v16_')) {
          localStorage.removeItem(key);
        }
      }
    } catch {}

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

  // Helper font family kaligrafi Arab aktif sesuai mushaf yang dipilih
  const getActiveFontFamily = () => {
    if (mushafType === 'modern') {
      return "'Noto Naskh Arabic', 'Plus Jakarta Sans', sans-serif";
    }
    if (mushafType === 'madinah') {
      return "'KFGQPC Uthmanic Script HAFS', 'KFGQPC Uthman Taha Naskh', 'Amiri Quran', 'Scheherazade New', serif";
    }
    // Mushaf Standar Indonesia Kemenag: font resmi LPMQ Isep Misbah (menampilkan dhommah terbalik U+0657 otentik)
    return "'LPMQ Isep Misbah', 'LPMQ', serif";
  };

  // Helper kelas font kaligrafi Arab aktif
  const getArabicFontClass = () => {
    if (mushafType === 'madinah') return 'font-quran-madinah';
    if (mushafType === 'modern') return 'font-quran-modern';
    return 'font-quran-lpmq';
  };

  // Helper teks Arab ayat sesuai mushaf aktif dengan normalisasi menyeluruh & kashida anti-menumpuk
  const getAyatArabText = (ayat) => {
    if (!ayat) return '';
    const isMadinah = (mushafType === 'madinah' || mushafType === 'modern');
    let raw = '';
    if (isMadinah) {
      if (ayat.teksArabMadinah && ayat.teksArabMadinah.trim().length > 0) {
        raw = ayat.teksArabMadinah;
      } else {
        // Fallback otomatis 100% konsisten ke Rasm Utsmani Madinah
        raw = convertToUthmaniMadinah(ayat.teksArab || '');
      }
    } else {
      raw = ayat.teksArab || '';
    }
    const normalized = normalizeQuranText(raw, isMadinah);
    return applyKashidaToArabic(normalized, kashidaMode);
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
      localStorage.setItem('kanomas_mushaf_type_v3', type);
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

      const cacheKey = `kanomas_surah_v17_${selectedSurah.nomor}`;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.ayat && parsed.ayat.length > 0) {
            // Pastikan setiap ayat di cache memiliki teksArabMadinah lengkap
            parsed.ayat = parsed.ayat.map((a) => ({
              ...a,
              teksArab: a.teksArab || '',
              teksArabMadinah: a.teksArabMadinah || convertToUthmaniMadinah(a.teksArab || '')
            }));
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
                    mText = mText.replace(/^[\uFEFF\u200B\u200C\u200D\u200E\u200F\s]*بِسْمِ\s+ٱللَّهِ\s+ٱلرَّحْمَـ?ٰنِ\s+ٱلرَّحِيمِ\s*/, '');
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
                  teksArab: normalizeQuranText(ayat.teksArab || '', false),
                  teksArabMadinah: convertToUthmaniMadinah(ayat.teksArab || '')
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
                    mText = mText.replace(/^[\uFEFF\u200B\u200C\u200D\u200E\u200F\s]*بِسْمِ\s+ٱللَّهِ\s+ٱلرَّحْمَـ?ٰنِ\s+ٱلرَّحِيمِ\s*/, '');
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
                  teksArab: normalizeQuranText(ayat.teksArab || '', false),
                  teksArabMadinah: convertToUthmaniMadinah(ayat.teksArab || '')
                };
              });
            }
          } catch (e) {
            console.warn('Gagal parsing teks Madinah:', e);
          }
        }

        // Safeguard mutlak: pastikan SETIAP AYAT memiliki teksArabMadinah terisi
        if (data && data.ayat) {
          data.ayat = data.ayat.map((ayat) => ({
            ...ayat,
            teksArab: normalizeQuranText(ayat.teksArab || '', false),
            teksArabMadinah: ayat.teksArabMadinah || convertToUthmaniMadinah(ayat.teksArab || '')
          }));
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

  // Load Tafsir Resmi (Kemenag RI Tahlili & Ringkasan Tematik Kompleks Raja Fahd Madinah)
  const handleOpenRincian = async (ayat) => {
    setShowRincianModal(ayat);
    setLoadingTafsir(true);
    setTafsirText(null);
    setTafsirRingkasText(null);

    // A. Cek Cache Lokal Tafsir Kemenag RI
    const kemenagCacheKey = `kanomas_tafsir_v2_${selectedSurah.nomor}`;
    try {
      const cached = localStorage.getItem(kemenagCacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        const match = parsed.find((t) => t.ayat === ayat.nomorAyat);
        if (match) setTafsirText(match.teks);
      }
    } catch {}

    // B. Cek Cache Lokal Tafsir Ringkas Madinah
    const ringkasCacheKey = `kanomas_tafsir_ringkas_${selectedSurah.nomor}`;
    try {
      const cachedRingkas = localStorage.getItem(ringkasCacheKey);
      if (cachedRingkas) {
        const parsedR = JSON.parse(cachedRingkas);
        const matchR = parsedR.find((r) => Number(r.aya) === ayat.nomorAyat);
        if (matchR) {
          const cleanFootnotes = (matchR.footnotes || '').replace(/\[\d+\]\.\s*/g, '').trim();
          setTafsirRingkasText(cleanFootnotes || matchR.translation || '');
        }
      }
    } catch {}

    // C. Fetch Data Paralel jika belum lengkap di memori
    try {
      const [resKemenag, resRingkas] = await Promise.allSettled([
        fetch(`https://equran.id/api/v2/tafsir/${selectedSurah.nomor}`),
        fetch(`https://quranenc.com/api/v1/translation/sura/indonesian_complex/${selectedSurah.nomor}`)
      ]);

      if (resKemenag.status === 'fulfilled') {
        const jsonK = await resKemenag.value.json();
        if (jsonK && jsonK.data && jsonK.data.tafsir) {
          try {
            localStorage.setItem(kemenagCacheKey, JSON.stringify(jsonK.data.tafsir));
          } catch {}
          const matchK = jsonK.data.tafsir.find((t) => t.ayat === ayat.nomorAyat);
          setTafsirText(matchK ? matchK.teks : 'Tafsir Tahlili Kemenag ayat ini sedang dipersiapkan.');
        }
      }

      if (resRingkas.status === 'fulfilled') {
        const jsonR = await resRingkas.value.json();
        if (jsonR && Array.isArray(jsonR.result)) {
          try {
            localStorage.setItem(ringkasCacheKey, JSON.stringify(jsonR.result));
          } catch {}
          const matchR = jsonR.result.find((r) => Number(r.aya) === ayat.nomorAyat);
          if (matchR) {
            const cleanFootnotes = (matchR.footnotes || '').replace(/\[\d+\]\.\s*/g, '').trim();
            const textRingkas = cleanFootnotes || matchR.translation || 'Intisari makna ayat sesuai kaidah ulama tafsir.';
            setTafsirRingkasText(textRingkas);
          }
        }
      }
    } catch (e) {
      console.warn('Gagal memuat tafsir:', e);
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
    const latinText = formatAyatLatin(ayat.teksLatin, mushafType);
    const indoText = formatAyatTranslation(ayat.teksIndonesia, mushafType);
    const captionText = `*Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${ayat.nomorAyat}*\n\n${arabText}\n\n_${latinText}_\n\n"${indoText}"\n\n📌 _Dibagikan melalui Aplikasi Kanomas Tour & Travel_\nhttps://appkanomas.mediasosial.net`;

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
    const latinText = formatAyatLatin(ayat.teksLatin, mushafType);
    const indoText = formatAyatTranslation(ayat.teksIndonesia, mushafType);
    const text = `*Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${ayat.nomorAyat}*\n\n${arabText}\n\n_${latinText}_\n\n"${indoText}"\n\n📌 _Dibagikan melalui Aplikasi Kanomas Tour & Travel_\nhttps://appkanomas.mediasosial.net`;
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
    const latinText = formatAyatLatin(ayat.teksLatin, mushafType);
    const indoText = formatAyatTranslation(ayat.teksIndonesia, mushafType);
    const text = `Q.S. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: ${ayat.nomorAyat}\n\n${arabText}\n\n${latinText}\n\n"${indoText}"\n\n(Aplikasi Kanomas Tour & Travel)`;
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

  // Helper fallback kata per kata cerdas jika API quran.com belum selesai load agar layout 100% konsisten serentak
  const getAyatFallbackWbw = (ayat) => {
    if (!ayat) return null;
    const raw = getAyatArabText(ayat);
    const tokens = raw.trim().split(/\s+/).filter(w => !/^[\u06D5-\u06ED\u08D0-\u08FF]+$/.test(w));
    return tokens.map((token, idx) => ({
      id: `${ayat.nomorAyat}-${idx}`,
      position: idx + 1,
      arab: token,
      latin: '',
      arti: ''
    }));
  };

  // Render Arab dengan dukungan Mushaf Madinah vs Indonesia / Modern, & Tajwid Warna
  const renderArabic = (ayat) => {
    if (!ayat) return null;
    const rawText = getAyatArabText(ayat);
    const wbwWords = showWordByWord ? (wordByWordData[selectedSurah?.nomor]?.[ayat.nomorAyat] || getAyatFallbackWbw(ayat)) : null;

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
        className={`relative w-full max-w-4xl h-full sm:h-[96vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-700/40 transition-colors duration-200 ${isDark ? 'dark text-white' : 'text-slate-900'}`}
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

            {/* Index Main Scrollable Area (Terkunci dari geser horizontal: overflow-x-hidden touch-pan-y) */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden touch-pan-y w-full max-w-full px-3 sm:px-6 py-3.5 space-y-4 select-none">
              {/* BANNER TERAKHIR DIBACA (COMPACT & SLIM SESUAI INSTRUKSI) */}
              {lastReadPosition && (
                <div className="w-full max-w-lg mx-auto px-3.5 py-2 rounded-2xl bg-gradient-to-r from-emerald-800 via-[#0a7c29] to-emerald-900 text-white shadow-xs border border-emerald-400/40 flex items-center justify-between gap-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-2xs">
                      <Pin className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">Terakhir:</span>
                        <h4 className="text-xs sm:text-sm font-black truncate">
                          QS. {lastReadPosition.surahName} : {lastReadPosition.ayatNomor}
                        </h4>
                      </div>
                      <p className="text-[10px] text-emerald-100/90 truncate">
                        "{lastReadPosition.arti}" • Juz {lastReadPosition.juz || currentQuickSurah.juz}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const surah = SURAH_LIST.find((s) => s.nomor === lastReadPosition.surahNomor) || SURAH_LIST[0];
                      handleOpenSurah(surah, lastReadPosition.ayatNomor);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 shadow-xs active:scale-95 transition shrink-0 cursor-pointer"
                    title="Lanjut Membaca"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* ======================================================== */}
              {/* ======================================================== */}
              {/* NAVIGASI KUBAH TATA SURYA AL-QUR'AN (1/2 LINGKARAN ATAS) */}
              {/* Semicircle Celestial Astrolabe • Matahari Tanpa Teks     */}
              {/* ======================================================== */}
              {(() => {
                const totalAyat = Math.max(1, currentQuickSurah.jumlahAyat);

                // 3 Surat Berdampingan untuk Navigasi Cepat
                const prevSurahNum = ((quickSurahNum - 2 + 114) % 114) + 1;
                const nextSurahNum = (quickSurahNum % 114) + 1;
                const prevSurahObj = SURAH_LIST.find((s) => s.nomor === prevSurahNum) || SURAH_LIST[0];
                const nextSurahObj = SURAH_LIST.find((s) => s.nomor === nextSurahNum) || SURAH_LIST[0];

                // Konfigurasi Planet-Planet yang Muncul di Kubah 1/2 Lingkaran
                // 1. Orbit Ayat (Luar, R = 144, step = 22 deg): Offsets [-3, -2, -1, 0, 1, 2, 3]
                const ayatOffsets = [-3, -2, -1, 0, 1, 2, 3];
                // 2. Orbit Surat (Tengah, R = 104, step = 24 deg): Offsets [-3, -2, -1, 0, 1, 2, 3]
                const surahOffsets = [-3, -2, -1, 0, 1, 2, 3];
                // 3. Orbit Juz (Dalam, R = 64, step = 28 deg): Offsets [-2, -1, 0, 1, 2]
                const juzOffsets = [-2, -1, 0, 1, 2];

                return (
                  <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-3.5 sm:p-4 border border-emerald-500/30 shadow-2xl relative overflow-hidden backdrop-blur-md">
                    {/* Background Kaligrafi & Ornamen Air Islam */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                      <span className="text-[240px] font-serif leading-none select-none text-emerald-400">۞</span>
                    </div>

                    {/* KARTU UTAMA SURAT (HERO SURAH CARD - SANGAT JELAS, TEBAL, & PROPORSIAL) */}
                    <div className="relative z-20 mb-2.5 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/40 rounded-2xl p-2.5 sm:p-3 shadow-lg">
                      <div className="flex items-center justify-between gap-2">
                        {/* Tombol Surat Sebelumnya */}
                        <button
                          type="button"
                          onClick={() => handleRotateSurah(-1)}
                          className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 text-xs font-bold transition active:scale-90 shrink-0 cursor-pointer"
                          title={`QS Sebelumnya: ${prevSurahObj.nomor}. ${prevSurahObj.namaLatin}`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="hidden sm:inline text-[11px] font-mono">{prevSurahObj.nomor}</span>
                        </button>

                        {/* Nama Surat Utama (Besar, Jelas, & Kontras Tinggi) */}
                        <button
                          type="button"
                          onClick={() => setVerticalPickerType('surah')}
                          className="flex-1 text-center min-w-0 cursor-pointer group hover:opacity-95 transition"
                          title="Klik untuk memilih dari 114 Surat (Scroll Atas & Bawah)"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs font-mono shadow-xs">
                              QS. {currentQuickSurah.nomor}
                            </span>
                            <h2 className="text-base sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors tracking-tight truncate">
                              {currentQuickSurah.namaLatin}
                            </h2>
                            <span className="font-quran-lpmq text-xl sm:text-2xl text-amber-300 font-bold ml-1" dir="rtl">
                              {currentQuickSurah.nama}
                            </span>
                          </div>
                          <p className="text-[11px] text-emerald-200/90 mt-0.5 font-medium flex items-center justify-center gap-2">
                            <span>"{currentQuickSurah.arti}"</span>
                            <span>•</span>
                            <span>{currentQuickSurah.jumlahAyat} Ayat</span>
                            <span>•</span>
                            <span className="text-amber-300 font-mono font-bold">Juz {currentQuickSurah.juz}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-amber-300 inline group-hover:translate-y-0.5 transition-transform" />
                          </p>
                        </button>

                        {/* Tombol Surat Berikutnya */}
                        <button
                          type="button"
                          onClick={() => handleRotateSurah(1)}
                          className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 text-xs font-bold transition active:scale-90 shrink-0 cursor-pointer"
                          title={`QS Berikutnya: ${nextSurahObj.nomor}. ${nextSurahObj.namaLatin}`}
                        >
                          <span className="hidden sm:inline text-[11px] font-mono">{nextSurahObj.nomor}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* 3 KAPSUL STEPPER CEPAT (JUZ, SURAT, AYAT) */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 relative z-20 mb-1.5">
                      {/* Kapsul Juz */}
                      <div className="flex items-center justify-between bg-slate-950/80 border border-emerald-500/40 rounded-xl px-1.5 py-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() => handleRotateJuz(-1)}
                          className="w-6 h-6 rounded-lg bg-emerald-900/50 hover:bg-emerald-800 text-emerald-300 font-black text-xs flex items-center justify-center cursor-pointer active:scale-90 transition shrink-0"
                          title="Juz Sebelumnya"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setVerticalPickerType('juz')}
                          className="text-center px-1 flex-1 min-w-0 hover:opacity-90 cursor-pointer"
                          title="Klik untuk Scroll Atas & Bawah Pilih Juz (1 - 30)"
                        >
                          <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold block leading-none">Juz ↕</span>
                          <span className="text-xs sm:text-sm font-black text-white leading-tight font-mono">{wheelJuzNum}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRotateJuz(1)}
                          className="w-6 h-6 rounded-lg bg-emerald-900/50 hover:bg-emerald-800 text-emerald-300 font-black text-xs flex items-center justify-center cursor-pointer active:scale-90 transition shrink-0"
                          title="Juz Berikutnya"
                        >
                          +
                        </button>
                      </div>

                      {/* Kapsul Surat */}
                      <div className="flex items-center justify-between bg-slate-950/80 border border-sky-500/40 rounded-xl px-1.5 py-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() => handleRotateSurah(-1)}
                          className="w-6 h-6 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-300 font-black text-xs flex items-center justify-center cursor-pointer active:scale-90 transition shrink-0"
                          title="Surat Sebelumnya"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setVerticalPickerType('surah')}
                          className="text-center px-1 truncate flex-1 min-w-0 hover:opacity-90 cursor-pointer"
                          title="Klik untuk Scroll Atas & Bawah Pilih Surat (1 - 114)"
                        >
                          <span className="text-[9px] uppercase tracking-wider text-sky-400 font-bold block leading-none">Surat ↕</span>
                          <span className="text-[11px] sm:text-xs font-black text-white leading-tight truncate block">
                            {quickSurahNum}. {currentQuickSurah.namaLatin}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRotateSurah(1)}
                          className="w-6 h-6 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-300 font-black text-xs flex items-center justify-center cursor-pointer active:scale-90 transition shrink-0"
                          title="Surat Berikutnya"
                        >
                          +
                        </button>
                      </div>

                      {/* Kapsul Ayat */}
                      <div className="flex items-center justify-between bg-slate-950/80 border border-amber-500/40 rounded-xl px-1.5 py-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() => handleRotateAyat(-1)}
                          className="w-6 h-6 rounded-lg bg-amber-900/50 hover:bg-amber-800 text-amber-300 font-black text-xs flex items-center justify-center cursor-pointer active:scale-90 transition shrink-0"
                          title="Ayat Sebelumnya"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => setVerticalPickerType('ayat')}
                          className="text-center px-1 truncate flex-1 min-w-0 hover:opacity-90 cursor-pointer"
                          title="Klik untuk Scroll Atas & Bawah Pilih Ayat"
                        >
                          <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold block leading-none">Ayat ↕</span>
                          <span className="text-xs sm:text-sm font-black text-amber-300 leading-tight block font-mono">
                            {quickAyatNum}<span className="text-[10px] text-slate-400 font-normal">/{totalAyat}</span>
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRotateAyat(1)}
                          className="w-6 h-6 rounded-lg bg-amber-900/50 hover:bg-amber-800 text-amber-300 font-black text-xs flex items-center justify-center cursor-pointer active:scale-90 transition shrink-0"
                          title="Ayat Berikutnya"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Hint Interaksi Cepat */}
                    <div className="text-center mb-1">
                      <p className="text-[10px] text-emerald-300/80 font-medium">
                        ↕️ Ketuk Juz, Surat, atau Ayat untuk scroll atas-bawah • Putar planet dengan 1 jari
                      </p>
                    </div>

                    {/* INDIKATOR STATUS ORBIT DRAG */}
                    {isDraggingRing && (
                      <div className="text-center mb-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider animate-pulse shadow-md">
                          <span>🪐</span>
                          <span>Memutar {isDraggingRing === 'ayat' ? 'Planet Ayat' : isDraggingRing === 'surah' ? 'Planet Surat' : 'Planet Juz'}...</span>
                        </span>
                      </div>
                    )}

                    {/* ======================================================== */}
                    {/* SVG KUBAH 1/2 LINGKARAN TATA SURYA AL-QUR'AN (SEMICIRCLE) */}
                    {/* Bawah Tidak Dipakai Dihilangkan • Tinggi Hemat 50%       */}
                    {/* Matahari di Poros Dasar Bawah Tanpa Tulisan BACA/IQRO    */}
                    {/* ======================================================== */}
                    <div
                      ref={wheelContainerRef}
                      onPointerDown={handleWheelPointerDown}
                      onPointerMove={handleWheelPointerMove}
                      onPointerUp={handleWheelPointerUp}
                      onPointerCancel={handleWheelPointerUp}
                      style={{ touchAction: 'none' }}
                      className="w-full max-w-[320px] sm:max-w-[350px] h-[180px] sm:h-[195px] relative mx-auto my-1 flex items-end justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden"
                      title="Sentuh & putar planet dengan 1 jari: Luar (Ayat), Tengah (Surat), Dalam (Juz). Ketuk planet pusat untuk scroll nomor."
                    >
                      <svg
                        className="w-full h-full drop-shadow-2xl"
                        viewBox="0 0 340 185"
                        style={{ overflow: 'visible' }}
                      >
                        <defs>
                          <radialGradient id="solarSpaceGrad" cx="50%" cy="100%" r="100%">
                            <stop offset="0%" stopColor="#042f2e" stopOpacity="0.85" />
                            <stop offset="60%" stopColor="#021c14" stopOpacity="0.92" />
                            <stop offset="100%" stopColor="#01100b" stopOpacity="0.98" />
                          </radialGradient>

                          <radialGradient id="sunSphereGrad" cx="50%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="30%" stopColor="#fef08a" />
                            <stop offset="70%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#b45309" />
                          </radialGradient>

                          <radialGradient id="planetJuzActiveGrad" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#d1fae5" />
                            <stop offset="45%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#064e3b" />
                          </radialGradient>

                          <radialGradient id="planetSurahActiveGrad" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#e0f2fe" />
                            <stop offset="45%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#0369a1" />
                          </radialGradient>

                          <radialGradient id="planetAyatActiveGrad" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#fef9c3" />
                            <stop offset="45%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#b45309" />
                          </radialGradient>

                          <filter id="solarGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                          <filter id="planetGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        {/* Kubah Langit 1/2 Lingkaran Atas (Semicircle Dome) */}
                        <path d="M 8 175 A 162 162 0 0 1 332 175 Z" fill="url(#solarSpaceGrad)" />
                        <path d="M 8 175 A 162 162 0 0 1 332 175 Z" stroke="#10b981" strokeWidth="1.2" opacity="0.35" fill="none" />
                        <path d="M 12 175 A 158 158 0 0 1 328 175 Z" stroke="#f59e0b" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" fill="none" />

                        {/* Garis Horizon Dasar Kubah */}
                        <line x1="8" y1="175" x2="332" y2="175" stroke="#10b981" strokeWidth="1" opacity="0.3" />

                        {/* Bintang-Bintang Kosmis Kubah */}
                        <text x="50" y="80" fontSize="8" fill="#34d399" opacity="0.45" textAnchor="middle">✦</text>
                        <text x="290" y="80" fontSize="8" fill="#f59e0b" opacity="0.45" textAnchor="middle">✦</text>
                        <text x="95" y="45" fontSize="7" fill="#38bdf8" opacity="0.35" textAnchor="middle">✧</text>
                        <text x="245" y="45" fontSize="7" fill="#34d399" opacity="0.35" textAnchor="middle">✧</text>

                        {/* 1. LINTASAN ORBIT 3 (AYAT - POROS LUAR, R = 144) */}
                        <path
                          d="M 30.9 137.7 A 144 144 0 0 1 309.1 137.7"
                          fill="none"
                          stroke={isDraggingRing === 'ayat' ? '#fbbf24' : '#f59e0b'}
                          strokeWidth={isDraggingRing === 'ayat' ? '2' : '1.2'}
                          strokeDasharray="3 3"
                          opacity={isDraggingRing === 'ayat' ? 0.9 : 0.4}
                        />

                        {/* 2. LINTASAN ORBIT 2 (SURAT - POROS TENGAH, R = 104) */}
                        <path
                          d="M 72.3 139.4 A 104 104 0 0 1 267.7 139.4"
                          fill="none"
                          stroke={isDraggingRing === 'surah' ? '#38bdf8' : '#0ea5e9'}
                          strokeWidth={isDraggingRing === 'surah' ? '2' : '1.2'}
                          strokeDasharray="3 3"
                          opacity={isDraggingRing === 'surah' ? 0.9 : 0.4}
                        />

                        {/* 3. LINTASAN ORBIT 1 (JUZ - POROS DALAM, R = 64) */}
                        <path
                          d="M 112 148 A 64 64 0 0 1 228 148"
                          fill="none"
                          stroke={isDraggingRing === 'juz' ? '#34d399' : '#10b981'}
                          strokeWidth={isDraggingRing === 'juz' ? '2' : '1.2'}
                          strokeDasharray="3 3"
                          opacity={isDraggingRing === 'juz' ? 0.9 : 0.45}
                        />

                        {/* JARUM PENUNJUK PUNCAK ATAS (JAM 12 / APEX) */}
                        <line x1="170" y1="18" x2="170" y2="135" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
                        <polygon
                          points="170,22 164,8 176,8"
                          fill="#fbbf24"
                          stroke="#78350f"
                          strokeWidth="1"
                          filter="url(#solarGlow)"
                        />

                        {/* PLANET-PLANET JUZ (POROS DALAM, R = 64) */}
                        {juzOffsets.map((k) => {
                          const jVal = ((wheelJuzNum - 1 + k) % 30 + 30) % 30 + 1;
                          const ang = -90 + k * 28 + (dragOffsets.juz || 0);
                          const rad = (ang * Math.PI) / 180;
                          const x = 170 + 64 * Math.cos(rad);
                          const y = 175 + 64 * Math.sin(rad);

                          const isCenter = k === 0;
                          const rPlanet = isCenter ? 14 : Math.abs(k) === 1 ? 11 : 9;
                          const opacity = isCenter ? 1 : Math.abs(k) === 1 ? 0.85 : 0.55;

                          return (
                            <g
                              key={`pj-${k}-${jVal}`}
                              className="cursor-pointer transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isCenter) {
                                  setVerticalPickerType('juz');
                                } else {
                                  handleRotateJuz(k);
                                }
                              }}
                            >
                              {isCenter && (
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="17"
                                  fill="none"
                                  stroke="#6ee7b7"
                                  strokeWidth="1.2"
                                  opacity="0.8"
                                  filter="url(#planetGlow)"
                                />
                              )}
                              <circle
                                cx={x}
                                cy={y}
                                r={rPlanet}
                                fill={isCenter ? 'url(#planetJuzActiveGrad)' : '#064e3b'}
                                stroke={isCenter ? '#34d399' : '#059669'}
                                strokeWidth={isCenter ? '1.8' : '1'}
                                opacity={opacity}
                              />
                              <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize={isCenter ? '9.5' : Math.abs(k) === 1 ? '7.5' : '6.5'}
                                fontWeight="900"
                                fill="#ffffff"
                                opacity={opacity}
                                className="font-mono select-none pointer-events-none"
                              >
                                {jVal}
                              </text>
                            </g>
                          );
                        })}

                        {/* PLANET-PLANET SURAT (POROS TENGAH, R = 104) */}
                        {surahOffsets.map((k) => {
                          const sVal = ((quickSurahNum - 1 + k) % 114 + 114) % 114 + 1;
                          const ang = -90 + k * 24 + (dragOffsets.surah || 0);
                          const rad = (ang * Math.PI) / 180;
                          const x = 170 + 104 * Math.cos(rad);
                          const y = 175 + 104 * Math.sin(rad);

                          const isCenter = k === 0;
                          const rPlanet = isCenter ? 15.5 : Math.abs(k) === 1 ? 12 : Math.abs(k) === 2 ? 9.5 : 7.5;
                          const opacity = isCenter ? 1 : Math.abs(k) === 1 ? 0.85 : Math.abs(k) === 2 ? 0.6 : 0.35;

                          return (
                            <g
                              key={`ps-${k}-${sVal}`}
                              className="cursor-pointer transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isCenter) {
                                  setVerticalPickerType('surah');
                                } else {
                                  handleRotateSurah(k);
                                }
                              }}
                            >
                              {isCenter && (
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="19"
                                  fill="none"
                                  stroke="#7dd3fc"
                                  strokeWidth="1.2"
                                  opacity="0.8"
                                  filter="url(#planetGlow)"
                                />
                              )}
                              <circle
                                cx={x}
                                cy={y}
                                r={rPlanet}
                                fill={isCenter ? 'url(#planetSurahActiveGrad)' : '#075985'}
                                stroke={isCenter ? '#38bdf8' : '#0284c7'}
                                strokeWidth={isCenter ? '1.8' : '1'}
                                opacity={opacity}
                              />
                              <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize={isCenter ? '10' : Math.abs(k) === 1 ? '8' : Math.abs(k) === 2 ? '7' : '6'}
                                fontWeight="900"
                                fill="#ffffff"
                                opacity={opacity}
                                className="font-mono select-none pointer-events-none"
                              >
                                {sVal}
                              </text>
                            </g>
                          );
                        })}

                        {/* PLANET-PLANET AYAT (POROS LUAR, R = 144) */}
                        {ayatOffsets.map((k) => {
                          const aVal = ((quickAyatNum - 1 + k) % totalAyat + totalAyat) % totalAyat + 1;
                          const ang = -90 + k * 22 + (dragOffsets.ayat || 0);
                          const rad = (ang * Math.PI) / 180;
                          const x = 170 + 144 * Math.cos(rad);
                          const y = 175 + 144 * Math.sin(rad);

                          const isCenter = k === 0;
                          const rPlanet = isCenter ? 17.5 : Math.abs(k) === 1 ? 13.5 : Math.abs(k) === 2 ? 10.5 : 8;
                          const opacity = isCenter ? 1 : Math.abs(k) === 1 ? 0.88 : Math.abs(k) === 2 ? 0.62 : 0.35;

                          return (
                            <g
                              key={`pa-${k}-${aVal}`}
                              className="cursor-pointer transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isCenter) {
                                  setVerticalPickerType('ayat');
                                } else {
                                  handleRotateAyat(k);
                                }
                              }}
                            >
                              {isCenter && (
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="21"
                                  fill="none"
                                  stroke="#fde047"
                                  strokeWidth="1.5"
                                  opacity="0.85"
                                  filter="url(#planetGlow)"
                                />
                              )}
                              <circle
                                cx={x}
                                cy={y}
                                r={rPlanet}
                                fill={isCenter ? 'url(#planetAyatActiveGrad)' : '#78350f'}
                                stroke={isCenter ? '#fde047' : '#d97706'}
                                strokeWidth={isCenter ? '2' : '1'}
                                opacity={opacity}
                              />
                              <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize={isCenter ? '11' : Math.abs(k) === 1 ? '8.5' : Math.abs(k) === 2 ? '7' : '6'}
                                fontWeight="900"
                                fill={isCenter ? '#0f172a' : '#ffffff'}
                                opacity={opacity}
                                className="font-mono select-none pointer-events-none"
                              >
                                {aVal}
                              </text>
                            </g>
                          );
                        })}

                        {/* MATAHARI DI DASAR HORIZON (TANPA TEKS BACA/IQRO) */}
                        {/* 11 Sinar Mentari Memancar ke Kubah Langit */}
                        {[-160, -145, -130, -115, -100, -85, -70, -55, -40, -25, -10].map((rayDeg, idx) => {
                          const rad = (rayDeg * Math.PI) / 180;
                          const x1 = 170 + 30 * Math.cos(rad);
                          const y1 = 175 + 30 * Math.sin(rad);
                          const x2 = 170 + 40 * Math.cos(rad);
                          const y2 = 175 + 40 * Math.sin(rad);
                          return (
                            <line
                              key={`sun-ray-${idx}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="#fbbf24"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              opacity="0.8"
                            />
                          );
                        })}

                        {/* Busur Korona Surya */}
                        <path
                          d="M 136 175 A 34 34 0 0 1 204 175"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                          opacity="0.8"
                        />
                        {/* Kubah Bola Surya Bercahaya (Tanpa Tulisan) */}
                        <path
                          d="M 142 175 A 28 28 0 0 1 198 175 Z"
                          fill="url(#sunSphereGrad)"
                          stroke="#fde047"
                          strokeWidth="2"
                          filter="url(#solarGlow)"
                        />
                      </svg>

                      {/* TOMBOL MATAHARI DI POROS TENGAH DASAR (MURNI IKON SURYA TANPA TEKS BACA/IQRO) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenSurah(currentQuickSurah, quickAyatNum);
                        }}
                        className="absolute bottom-0 z-40 w-13 h-13 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center shadow-2xl border-2 border-amber-100 hover:scale-108 active:scale-95 transition-transform group cursor-pointer translate-y-[20%]"
                        title={`Buka & Baca QS. ${currentQuickSurah.namaLatin} Ayat ${quickAyatNum}`}
                      >
                        <Sun className="w-6 h-6 text-slate-950 group-hover:scale-115 transition-transform drop-shadow-xs" />
                      </button>
                    </div>

                    {/* TOMBOL BACA UTAMA DI BAWAH KUBAH */}
                    <button
                      type="button"
                      onClick={() => handleOpenSurah(currentQuickSurah, quickAyatNum)}
                      className="w-full mt-2.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-[#0a7c29] to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs sm:text-sm flex items-center justify-between shadow-xl active:scale-98 transition cursor-pointer border border-emerald-400/40"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-amber-300 text-sm sm:text-base font-black">Buka & Baca</span>
                        <span className="text-white font-bold">{currentQuickSurah.namaLatin}</span>
                        <span className="text-emerald-200 font-normal">Ayat {quickAyatNum}</span>
                        <span className="text-[11px] text-emerald-300/80 font-mono">(Juz {wheelJuzNum})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-300 stroke-[3]" />
                        <div className="w-8 h-8 rounded-xl bg-emerald-800/90 border border-emerald-400/50 flex items-center justify-center shadow-xs">
                          <BookOpen className="w-4 h-4 text-amber-300 fill-current" />
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })()}

              {/* ======================================================== */}
              {/* DIBAWAH RODA NAVIGASI: PILIHAN KHATAMAN & CATATAN USER    */}
              {/* ======================================================== */}
              <div className="w-full max-w-lg mx-auto space-y-2.5">
                {/* 2 KARTU PILIHAN UTAMA: KHATAMAN & CATATAN */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Pilihan 1: Program Khataman */}
                  <button
                    type="button"
                    onClick={() => setIndexTab(indexTab === 'khatam' ? 'surah' : 'khatam')}
                    className={`p-3 rounded-2xl border text-left transition-all active:scale-95 shadow-xs flex flex-col justify-between cursor-pointer ${
                      indexTab === 'khatam'
                        ? 'bg-[#0a7c29] text-white border-emerald-400 ring-2 ring-emerald-300 shadow-md'
                        : isDark
                        ? 'bg-slate-800/90 border-slate-700 text-slate-100 hover:border-emerald-500'
                        : 'bg-white border-slate-200/90 text-slate-800 hover:border-emerald-500'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${indexTab === 'khatam' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 dark:bg-emerald-950 text-[#0a7c29] dark:text-emerald-400'}`}>
                        <Target className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${indexTab === 'khatam' ? 'bg-white/20 text-white' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'}`}>
                        {khatamanSessions.length} Target
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black leading-tight">Target Khataman</h4>
                      <p className={`text-[10px] mt-0.5 leading-tight ${indexTab === 'khatam' ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {khatamanSessions.length > 0 ? `${khatamanSessions[0].completedJuz.length}/30 Juz selesai` : 'Atur target baca Al-Qur\'an'}
                      </p>
                    </div>
                  </button>

                  {/* Pilihan 2: Catatan User Atas Ayat & Penanda */}
                  <button
                    type="button"
                    onClick={() => setIndexTab(indexTab === 'bookmarks' ? 'surah' : 'bookmarks')}
                    className={`p-3 rounded-2xl border text-left transition-all active:scale-95 shadow-xs flex flex-col justify-between cursor-pointer ${
                      indexTab === 'bookmarks'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-300 shadow-md'
                        : isDark
                        ? 'bg-slate-800/90 border-slate-700 text-slate-100 hover:border-amber-500'
                        : 'bg-white border-slate-200/90 text-slate-800 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${indexTab === 'bookmarks' ? 'bg-slate-950 text-amber-300' : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'}`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${indexTab === 'bookmarks' ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'}`}>
                        {Object.keys(userNotes).length + bookmarks.length} Item
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black leading-tight">Catatan & Penanda</h4>
                      <p className={`text-[10px] mt-0.5 leading-tight ${indexTab === 'bookmarks' ? 'text-slate-900 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                        {Object.keys(userNotes).length} Catatan • {bookmarks.length} Disimpan
                      </p>
                    </div>
                  </button>
                </div>

                {/* 2 PILIHAN DAFTAR KLASIK: 114 SURAT & 30 JUZ */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIndexTab(indexTab === 'surah' ? 'none' : 'surah')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs border cursor-pointer ${
                      indexTab === 'surah'
                        ? 'bg-[#0a7c29] text-white border-emerald-600 shadow-xs'
                        : isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Daftar 114 Surat</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-white font-mono">114</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIndexTab(indexTab === 'juz' ? 'none' : 'juz')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs border cursor-pointer ${
                      indexTab === 'juz'
                        ? 'bg-[#0a7c29] text-white border-emerald-600 shadow-xs'
                        : isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Daftar 30 Juz</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-white font-mono">30</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: DAFTAR SURAT */}
              {indexTab === 'surah' && (
                <div className="space-y-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama surat, arti, atau nomor (contoh: Al-Baqarah, Sapi, 36)..."
                      className={`w-full pl-10 pr-9 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0a7c29] shadow-2xs transition ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 transition ${
                          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                        }`}
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
                      Kumpulan Catatan Pribadi & Simpanan Ayat Anda
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      Ketuk kartu catatan atau ayat untuk langsung membuka ayat di mushaf.
                    </p>
                  </div>

                  {/* Catatan User Atas Ayat */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500" />
                      <span>Catatan Pribadi Jamaah ({Object.keys(userNotes).length})</span>
                    </h4>
                    {Object.keys(userNotes).length === 0 ? (
                      <div className="p-4 text-center rounded-2xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-200/60 dark:border-slate-700">
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                          Belum ada catatan pada ayat. Anda dapat menambahkan catatan pada ayat saat membaca mushaf.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {Object.entries(userNotes).map(([key, note]) => {
                          const surah = SURAH_LIST.find((s) => s.nomor === note.surahNomor) || SURAH_LIST[0];
                          return (
                            <div
                              key={key}
                              className="p-3.5 rounded-2xl border border-amber-300/80 dark:border-slate-700 bg-amber-50/70 dark:bg-slate-800/90 shadow-2xs flex items-start justify-between gap-3"
                            >
                              <div
                                className="min-w-0 cursor-pointer flex-1"
                                onClick={() => handleOpenSurah(surah, note.ayatNomor)}
                              >
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-black text-slate-900 dark:text-white">
                                    QS. {surah.namaLatin} : Ayat {note.ayatNomor}
                                  </span>
                                  {note.updatedAt && (
                                    <span className="text-[10px] text-slate-400 font-mono">({note.updatedAt})</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-700 dark:text-slate-300 italic mt-1 line-clamp-2">
                                  "{note.text}"
                                </p>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleOpenSurah(surah, note.ayatNomor)}
                                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition"
                                  title="Buka Ayat di Mushaf"
                                >
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNote(key)}
                                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                                  title="Hapus Catatan"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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

              {/* Action Buttons: Theme, Tajweed, Settings, Audio */}
              <div className="flex items-center gap-1 sm:gap-1.5">
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
                  selectedSurah.nomor <= 1
                    ? 'opacity-20 cursor-not-allowed'
                    : isDark
                    ? 'text-emerald-300 hover:bg-white/10'
                    : 'text-[#0a7c29] hover:bg-emerald-100/50'
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
                  selectedSurah.nomor >= 114
                    ? 'opacity-20 cursor-not-allowed'
                    : isDark
                    ? 'text-emerald-300 hover:bg-white/10'
                    : 'text-[#0a7c29] hover:bg-emerald-100/50'
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
                        className={`${getArabicFontClass()} text-2xl sm:text-3xl tracking-wide inline-block select-text font-bold drop-shadow-sm`}
                        dir="rtl"
                      >
                        {mushafType === 'madinah'
                          ? 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ'
                          : mushafType === 'modern'
                          ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
                          : 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ'}
                      </span>
                      <p style={{ color: currentTheme.translationColor }} className="text-[11px] sm:text-xs font-medium opacity-80 italic">
                        {mushafType === 'indonesia'
                          ? '"Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang."'
                          : '"Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."'}
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
                          className={`space-y-3 pb-5 pt-3 px-3 sm:px-4 border-b rounded-2xl cursor-pointer relative z-10 transition-colors duration-150 ${
                            isHighlighted
                              ? currentTheme.highlightBg
                              : isAudioPlaying
                              ? currentTheme.activeAudioBg
                              : isToolbarOpen
                              ? currentTheme.type === 'image'
                                ? 'bg-black/55'
                                : 'bg-emerald-500/10 dark:bg-emerald-500/15'
                              : currentTheme.type === 'image'
                              ? 'bg-black/35 hover:bg-black/45'
                              : 'hover:bg-black/5 dark:hover:bg-white/5'
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
                            {showWordByWord ? (
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
                                  fontFeatureSettings: '"calt" 1, "liga" 1, "mkmk" 1, "mark" 1',
                                  fontSynthesis: 'none',
                                  fontWeight: 500,
                                  textRendering: 'optimizeLegibility',
                                  WebkitFontSmoothing: 'antialiased',
                                  MozOsxFontSmoothing: 'grayscale',
                                  width: '100%'
                                }}
                                className={`${getArabicFontClass()} font-medium select-text mb-4 sm:mb-5`}
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

                            {showWordByWord && loadingWordByWord && index === 0 && !wordByWordData[selectedSurah.nomor] && (
                              <div className="py-1 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 opacity-80 mb-2" dir="ltr">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Menyinkronkan detail terjemahan kata per kata...</span>
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
                                {formatAyatLatin(ayat.teksLatin, mushafType)}
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
                                {formatAyatTranslation(ayat.teksIndonesia, mushafType)}
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

                          {/* E. BILAH AKSI AYAT (IKON SAJA TANPA TEKS) */}
                          {(isToolbarOpen || !hiddenReadMode) && (
                            <div
                              dir="ltr"
                              onClick={(e) => e.stopPropagation()}
                              className="pt-2 mt-2 border-t border-dashed border-emerald-500/30 animate-in slide-in-from-top-2 duration-150"
                            >
                              <div className={`p-1.5 sm:p-2 rounded-2xl border shadow-sm flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth ${
                                currentTheme.isDark
                                  ? 'bg-slate-900/95 border-slate-700 text-white'
                                  : 'bg-white border-emerald-300 text-slate-800'
                              }`}>
                                {/* TOMBOL PENANDA AYAT TERAKHIR */}
                                <button
                                  onClick={() => saveLastRead(selectedSurah, ayat.nomorAyat)}
                                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition active:scale-95 shadow-2xs shrink-0 ${
                                    isLastRead
                                      ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                                      : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-amber-50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title={isLastRead ? 'Ditandai Terakhir Dibaca' : 'Tandai Ayat Terakhir Dibaca'}
                                >
                                  <Pin className={`w-4 h-4 ${isLastRead ? 'fill-current text-slate-950' : 'text-amber-500'}`} />
                                </button>

                                {/* AUDIO */}
                                <button
                                  onClick={() => playAyatAudio(index)}
                                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition active:scale-95 shrink-0 ${
                                    isAudioPlaying
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                      : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title={isAudioPlaying ? 'Jeda Audio Ayat' : 'Putar Audio Ayat'}
                                >
                                  {isAudioPlaying ? (
                                    <Pause className="w-4 h-4 text-white" />
                                  ) : (
                                    <Play className="w-4 h-4 text-[#0a7c29] dark:text-emerald-400" />
                                  )}
                                </button>

                                {/* TAFSIR */}
                                <button
                                  onClick={() => handleOpenRincian(ayat)}
                                  className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-emerald-50 text-[#0a7c29] dark:text-emerald-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition active:scale-95 shadow-2xs shrink-0"
                                  title="Buka Tafsir & Rincian Ayat"
                                >
                                  <BookOpen className="w-4 h-4 stroke-[2.3]" />
                                </button>

                                {/* SALIN */}
                                <button
                                  onClick={() => handleCopyAyat(ayat)}
                                  className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition active:scale-95 shadow-2xs shrink-0"
                                  title={copiedAyatNum === ayat.nomorAyat ? 'Tersalin!' : 'Salin Ayat & Terjemah'}
                                >
                                  {copiedAyatNum === ayat.nomorAyat ? (
                                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>

                                {/* SHARE */}
                                <button
                                  onClick={() => handleOpenShareModal(ayat)}
                                  className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-amber-50 text-amber-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition active:scale-95 shadow-2xs shrink-0"
                                  title="Bagikan Kartu Ayat"
                                >
                                  <Share2 className="w-4 h-4" />
                                </button>

                                {/* CATATAN */}
                                <button
                                  onClick={() => handleOpenNoteModal(ayat)}
                                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition active:scale-95 shadow-2xs shrink-0 ${
                                    savedNote
                                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-800 dark:text-amber-300'
                                      : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title="Catatan Pribadi Ayat"
                                >
                                  <FileText className="w-4 h-4 text-amber-500" />
                                </button>

                                {/* SIMPAN (BOOKMARK) */}
                                <button
                                  onClick={() => handleToggleBookmark(ayat)}
                                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition active:scale-95 shadow-2xs shrink-0 ${
                                    isBookmarked
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                                  }`}
                                  title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Ayat (Bookmark)'}
                                >
                                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-white' : ''}`} />
                                </button>

                                {/* TAJWID */}
                                <button
                                  onClick={() => setShowTajweedGuide(true)}
                                  className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition active:scale-95 shadow-2xs shrink-0"
                                  title="Panduan Kaidah Tajwid"
                                >
                                  <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                </button>

                                {hiddenReadMode && (
                                  <button
                                    onClick={() => setActiveAyatId(null)}
                                    className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition ml-auto shrink-0"
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
                <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama surat (contoh: Ar-Ra'd, Al-Fath, Yasin)..."
                  className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0a7c29] border transition ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                      : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
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
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}>
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

              {/* Body: Info Rincian & Kutipan Ayat */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* 1. KUTIPAN AYAT SUCI TERPILIH */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-emerald-50/70 border-emerald-200'
                }`}>
                  <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">
                      QS. {selectedSurah.namaLatin} [{selectedSurah.nomor}] : Ayat {showRincianModal.nomorAyat}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#0a7c29] text-white">
                      Mushaf {mushafType === 'madinah' ? 'Madinah' : mushafType === 'modern' ? 'Modern' : 'Indonesia'}
                    </span>
                  </div>

                  {/* Teks Arab Ayat */}
                  <p
                    style={{ fontFamily: getActiveFontFamily() }}
                    className={`${getArabicFontClass()} text-xl sm:text-2xl leading-loose text-right font-medium select-text ${
                      isDark ? 'text-amber-100' : 'text-slate-900'
                    }`}
                    dir="rtl"
                  >
                    {getAyatArabText(showRincianModal)}
                  </p>

                  {/* Transliterasi Latin */}
                  <p className="text-xs sm:text-sm font-medium leading-relaxed italic text-emerald-800 dark:text-emerald-300 select-text">
                    {formatAyatLatin(showRincianModal.teksLatin, mushafType)}
                  </p>

                  {/* Terjemahan */}
                  <p className="text-xs sm:text-sm font-normal leading-relaxed text-slate-700 dark:text-slate-200 select-text">
                    "{formatAyatTranslation(showRincianModal.teksIndonesia, mushafType)}"
                  </p>
                </div>

                {/* 2. PILIHAN SUMBER TAFSIR (DUAL TAB RESMI) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Rujukan Tafsir Resmi
                    </span>
                    {/* Ukuran Font Tafsir */}
                    <div className="flex items-center gap-1">
                      {[
                        { sz: 12, label: 'Kecil' },
                        { sz: 14, label: 'Standar' },
                        { sz: 16, label: 'Besar' }
                      ].map((f) => (
                        <button
                          key={f.sz}
                          type="button"
                          onClick={() => setTafsirFontSize(f.sz)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition ${
                            tafsirFontSize === f.sz
                              ? 'bg-[#0a7c29] text-white border-emerald-600 shadow-2xs'
                              : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setTafsirSource('kemenag')}
                      className={`py-2 px-2 rounded-xl text-center transition flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                        tafsirSource === 'kemenag'
                          ? 'bg-[#0a7c29] text-white shadow-xs font-black'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                      }`}
                    >
                      <span className="text-xs leading-none">Tafsir Kemenag RI</span>
                      <span className="text-[9px] opacity-80">Tahlili Lengkap</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTafsirSource('ringkas')}
                      className={`py-2 px-2 rounded-xl text-center transition flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                        tafsirSource === 'ringkas'
                          ? 'bg-[#0a7c29] text-white shadow-xs font-black'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                      }`}
                    >
                      <span className="text-xs leading-none">Tafsir Ringkas Tematik</span>
                      <span className="text-[9px] opacity-80">Mujamma' Raja Fahd</span>
                    </button>
                  </div>
                </div>

                {/* 3. BOX KONTEN TAFSIR */}
                <div className={`p-4 sm:p-5 rounded-2xl leading-relaxed space-y-3 border ${
                  isDark
                    ? 'bg-[#082414] text-emerald-100 border-emerald-900/60'
                    : 'bg-[#0c381c] text-white border-emerald-800 shadow-md'
                }`}>
                  {loadingTafsir ? (
                    <div className="py-8 text-center space-y-2">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mx-auto" />
                      <p className="text-xs text-emerald-200 font-sans">
                        Memuat rujukan teks tafsir resmi...
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between border-b border-emerald-700/60 pb-2 mb-3">
                        <span className="font-bold text-amber-300 block font-sans text-xs">
                          {tafsirSource === 'kemenag' ? '📖 Tafsir Tahlili Kemenag RI' : '📌 Tafsir Ringkas & Catatan Ulama Madinah'}
                        </span>
                        <span className="text-[10px] text-emerald-300 font-mono">
                          Ayat {showRincianModal.nomorAyat}
                        </span>
                      </div>

                      <p
                        style={{ fontSize: `${tafsirFontSize}px`, lineHeight: '1.8' }}
                        className="whitespace-pre-line text-emerald-50 font-normal leading-relaxed select-text"
                      >
                        {tafsirSource === 'kemenag'
                          ? (tafsirText || 'Tafsir Tahlili Kemenag RI untuk ayat ini sedang dipersiapkan.')
                          : (tafsirRingkasText || tafsirText || 'Intisari makna ayat sesuai kaidah tafsir para ulama salaf.')}
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
                      const activeTafsirContent = tafsirSource === 'kemenag' ? (tafsirText || '') : (tafsirRingkasText || tafsirText || '');
                      if (activeTafsirContent) {
                        const sourceLabel = tafsirSource === 'kemenag' ? 'Tafsir Tahlili Kemenag RI' : 'Tafsir Ringkas Tematik Madinah';
                        navigator.clipboard?.writeText(`*${sourceLabel}*\nQS. ${selectedSurah.namaLatin} [${selectedSurah.nomor}]: Ayat ${showRincianModal.nomorAyat}\n\n${activeTafsirContent}\n\n📌 _Dibagikan melalui Aplikasi Kanomas Tour & Travel_`);
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
        {/* ======================================================== */}
        {/* MODAL 2: PENGATURAN AL-QUR'AN (MINIMALIS & 1-TAP CHIPS)  */}
        {/* ======================================================== */}
        {showSettingsModal && (
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}>
            <div className={`w-full max-w-md max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              {/* Header Hijau Pengaturan */}
              <div className="p-3.5 bg-[#0a7c29] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-300" />
                  <div>
                    <h3 className="text-sm sm:text-base font-black leading-tight">Pengaturan Al-Qur'an</h3>
                    <p className="text-[10px] text-emerald-200 font-medium">Kustomisasi tampilan & kenyamanan membaca</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Konten Pengaturan Minimalis (1-Tap Selection) */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 text-xs font-bold">
                {/* 1. PILIHAN MUSHAF */}
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Pilihan Standar Mushaf</span>
                    <span className="text-[10px] text-slate-400 font-medium">3 Mushaf Resmi</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'indonesia', label: 'Indonesia', sub: 'Kemenag RI' },
                      { id: 'madinah', label: 'Madinah', sub: 'Utsmani' },
                      { id: 'modern', label: 'Modern', sub: 'Digital' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleMushafTypeChange(m.id)}
                        className={`py-2 px-1.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 ${
                          mushafType === m.id
                            ? 'bg-[#0a7c29] text-white border-emerald-500 shadow-xs ring-1 ring-emerald-400'
                            : isDark
                            ? 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-black text-xs leading-none">{m.label}</span>
                        <span className="text-[9px] opacity-80 font-normal">{m.sub}</span>
                        {mushafType === m.id && <span className="text-[9px] text-amber-300 font-black">✓ Aktif</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. UKURAN HURUF (ARAB & LATIN/TERJEMAH) */}
                <div className={`p-3 rounded-2xl border space-y-2.5 ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">Ukuran Huruf</span>

                  {/* Row A: Huruf Arab */}
                  <div className="flex items-center justify-between gap-1.5 flex-wrap">
                    <div className="min-w-[70px]">
                      <span className="text-xs font-black block">Arab</span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">{arabicFontSize}px</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[24, 28, 34, 40].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleArabicSizeChange(sz)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-black border transition cursor-pointer ${
                            arabicFontSize === sz
                              ? 'bg-[#0a7c29] text-white border-emerald-500 shadow-2xs'
                              : isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          {sz === 24 ? 'Kecil' : sz === 28 ? 'Standar' : sz === 34 ? 'Sedang' : 'Besar'}
                        </button>
                      ))}
                      <div className="flex items-center ml-1 border rounded-lg overflow-hidden border-slate-300 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => handleArabicSizeChange(arabicFontSize - 2)}
                          className="w-6 h-6 flex items-center justify-center font-black hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => handleArabicSizeChange(arabicFontSize + 2)}
                          className="w-6 h-6 flex items-center justify-center font-black hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Row B: Huruf Terjemahan & Latin */}
                  <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex-wrap">
                    <div className="min-w-[70px]">
                      <span className="text-xs font-black block">Terjemah</span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">{latinFontSize}px</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[13, 15, 17, 20].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleLatinSizeChange(sz)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-black border transition cursor-pointer ${
                            latinFontSize === sz
                              ? 'bg-[#0a7c29] text-white border-emerald-500 shadow-2xs'
                              : isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          {sz === 13 ? 'Kecil' : sz === 15 ? 'Standar' : sz === 17 ? 'Sedang' : 'Besar'}
                        </button>
                      ))}
                      <div className="flex items-center ml-1 border rounded-lg overflow-hidden border-slate-300 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => handleLatinSizeChange(latinFontSize - 1)}
                          className="w-6 h-6 flex items-center justify-center font-black hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLatinSizeChange(latinFontSize + 1)}
                          className="w-6 h-6 flex items-center justify-center font-black hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. WARNA SUASANA BACKGROUND */}
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-2">Warna Tampilan</span>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[
                      { id: 'mushaf', name: 'Hijau', color: '#d5f5d8', border: '#059669' },
                      { id: 'light', name: 'Putih', color: '#ffffff', border: '#cbd5e1' },
                      { id: 'sepia', name: 'Sepia', color: '#fbf6ea', border: '#d97706' },
                      { id: 'dark', name: 'Hitam', color: '#09111c', border: '#475569' },
                      { id: 'navy', name: 'Navy', color: '#071b2f', border: '#0284c7' },
                      { id: 'cream', name: 'Krem', color: '#fdfbf7', border: '#a8a29e' }
                    ].map((thm) => (
                      <button
                        key={thm.id}
                        type="button"
                        onClick={() => handleThemeChange(thm.id)}
                        className={`py-2 px-1 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                          themeMode === thm.id
                            ? 'ring-2 ring-emerald-500 border-emerald-500 shadow-xs'
                            : isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border shadow-2xs flex items-center justify-center text-[10px]"
                          style={{ backgroundColor: thm.color, borderColor: thm.border }}
                        >
                          {themeMode === thm.id ? '✓' : ''}
                        </span>
                        <span className="text-[9px] font-bold leading-tight">{thm.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. FITUR TAMPILAN AYAT (TINGGAL KLIK-KLIK AKTIF/NONAKTIF) */}
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-2">Fitur Tampilan (Tinggal Klik)</span>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Terjemahan */}
                    <button
                      type="button"
                      onClick={() => setShowTranslation(!showTranslation)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer active:scale-95 ${
                        showTranslation
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200'
                          : isDark ? 'bg-slate-900/40 border-slate-700/80 text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-black">Terjemahan</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${showTranslation ? 'bg-[#0a7c29] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                        {showTranslation ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    {/* Latin */}
                    <button
                      type="button"
                      onClick={() => setShowLatin(!showLatin)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer active:scale-95 ${
                        showLatin
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200'
                          : isDark ? 'bg-slate-900/40 border-slate-700/80 text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-black">Tulisan Latin</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${showLatin ? 'bg-[#0a7c29] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                        {showLatin ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    {/* Arti Per Kata */}
                    <button
                      type="button"
                      onClick={handleToggleWordByWord}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer active:scale-95 ${
                        showWordByWord
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200'
                          : isDark ? 'bg-slate-900/40 border-slate-700/80 text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-black">Arti Per Kata</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${showWordByWord ? 'bg-[#0a7c29] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                        {showWordByWord ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    {/* Tajwid Berwarna */}
                    <button
                      type="button"
                      onClick={handleToggleTajweed}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer active:scale-95 ${
                        showTajweed
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200'
                          : isDark ? 'bg-slate-900/40 border-slate-700/80 text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-black">Warna Tajwid</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${showTajweed ? 'bg-[#0a7c29] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                        {showTajweed ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    {/* Mode Bersih */}
                    <button
                      type="button"
                      onClick={() => handleToggleHiddenRead(!hiddenReadMode)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer active:scale-95 ${
                        hiddenReadMode
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200'
                          : isDark ? 'bg-slate-900/40 border-slate-700/80 text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-black">Mode Bersih</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${hiddenReadMode ? 'bg-[#0a7c29] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                        {hiddenReadMode ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    {/* Spasi Lapang */}
                    <button
                      type="button"
                      onClick={() => handleToggleSpaciousMode(!spaciousMode)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer active:scale-95 ${
                        spaciousMode
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200'
                          : isDark ? 'bg-slate-900/40 border-slate-700/80 text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-black">Spasi Lapang</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${spaciousMode ? 'bg-[#0a7c29] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                        {spaciousMode ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 5. SAMBUNGAN HURUF (KASHIDA SEJAJAR / ANTI-MENUMPUK) */}
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Sambungan Huruf (Kashida)</span>
                    <span className="text-[10px] text-slate-400">Anti-Menumpuk</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'unstack', label: 'Sejajar', sub: 'Rekomendasi' },
                      { id: 'off', label: 'Rapat Asli', sub: 'Kaligrafi' },
                      { id: 'extra', label: 'Ekstra', sub: 'Lebar' }
                    ].map((k) => (
                      <button
                        key={k.id}
                        type="button"
                        onClick={() => handleChangeKashidaMode(k.id)}
                        className={`py-2 px-1.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 ${
                          kashidaMode === k.id
                            ? 'bg-[#0a7c29] text-white border-emerald-500 shadow-xs ring-1 ring-emerald-400'
                            : isDark ? 'bg-slate-900/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-black text-xs leading-none">{k.label}</span>
                        <span className="text-[9px] opacity-80 font-normal">{k.sub}</span>
                      </button>
                    ))}
                  </div>
                  {/* Mini preview */}
                  <div className="mt-2 p-1.5 rounded-xl bg-emerald-100/50 dark:bg-emerald-950/40 text-center font-quran-lpmq text-base text-emerald-950 dark:text-emerald-200 select-none" dir="rtl">
                    {kashidaMode === 'off' ? 'لَهُمْ • تَجْرِي • فَتَحْنَا' : 'لَـهُمْ • تَـجْرِي • فَتَـحْنَا'}
                  </div>
                </div>

                {/* 6. PILIHAN QARI MUROTTAL */}
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-2">Qari Murottal</span>
                  <select
                    value={selectedQari}
                    onChange={(e) => setSelectedQari(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
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
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0a7c29] to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs shadow-md active:scale-95 transition cursor-pointer"
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
                        "{formatAyatTranslation(showShareModal.teksIndonesia, mushafType)}"
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
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}>
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
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}>
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
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}>
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
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}>
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
        {/* MODAL PEMILIH VERTIKAL INTERAKTIF (JUZ, SURAT, AYAT)     */}
        {/* Scroll Atas & Bawah untuk Memilih Angka                   */}
        {/* Dilengkapi 3 Tab Cepat & Pencarian Instan                */}
        {/* ======================================================== */}
        {verticalPickerType && (
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}>
            <div className={`w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
              isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
            }`}>
              {/* Header Modal */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-800 via-[#0a7c29] to-emerald-900 text-white flex items-center justify-between flex-shrink-0 shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs">
                    {verticalPickerType === 'juz' ? (
                      <Layers className="w-4 h-4" />
                    ) : verticalPickerType === 'surah' ? (
                      <Compass className="w-4 h-4" />
                    ) : (
                      <ListOrdered className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black leading-tight">
                      {verticalPickerType === 'juz'
                        ? 'Pilih Juz (1 - 30)'
                        : verticalPickerType === 'surah'
                        ? 'Pilih Surat (1 - 114)'
                        : `Pilih Ayat: QS. ${currentQuickSurah.namaLatin}`}
                    </h3>
                    <p className="text-[11px] text-emerald-200 font-medium">
                      ↕ Scroll ke atas & bawah untuk memilih angka
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVerticalPickerType(null);
                    setVerticalSearchQuery('');
                  }}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3 Tab Navigasi Cepat (Juz | Surat | Ayat) */}
              <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setVerticalPickerType('juz')}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    verticalPickerType === 'juz'
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400 font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>📖</span>
                  <span>Juz ({wheelJuzNum})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVerticalPickerType('surah')}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    verticalPickerType === 'surah'
                      ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-400 font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>📜</span>
                  <span className="truncate">Surat ({quickSurahNum})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVerticalPickerType('ayat')}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    verticalPickerType === 'ayat'
                      ? 'bg-amber-500 text-slate-950 shadow-sm ring-2 ring-amber-300 font-black'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>🔢</span>
                  <span>Ayat ({quickAyatNum}/{currentQuickSurah.jumlahAyat})</span>
                </button>
              </div>

              {/* TAB 1: SCROLL PILIH JUZ (1 - 30) */}
              {verticalPickerType === 'juz' && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="px-4 py-2 bg-emerald-50/50 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex-shrink-0">
                    <span>Daftar 30 Juz Al-Qur'an</span>
                    <span>Aktif: Juz {wheelJuzNum}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 p-2 space-y-1">
                    {JUZ_LIST.map((juzItem) => {
                      const isActive = wheelJuzNum === juzItem.juz;
                      return (
                        <div
                          key={`picker-juz-${juzItem.juz}`}
                          id={`picker-item-juz-${juzItem.juz}`}
                          onClick={() => {
                            setWheelJuzNum(juzItem.juz);
                            setQuickSurahNum(juzItem.surahNomor);
                            setQuickAyatNum(juzItem.ayat);
                            setVerticalPickerType(null);
                          }}
                          className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition ${
                            isActive
                              ? 'bg-emerald-500/15 border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`w-9 h-9 rounded-2xl font-mono font-black text-sm flex items-center justify-center flex-shrink-0 ${
                              isActive
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {juzItem.juz}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                                  Juz {juzItem.juz}
                                </h4>
                                {isActive && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-black">
                                    Aktif
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                Mulai: <strong className="text-emerald-700 dark:text-emerald-400">QS. {juzItem.surahName} : {juzItem.ayat}</strong>
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                s/d QS. {juzItem.endSurah} : {juzItem.endAyat} ({juzItem.totalAyat} ayat)
                              </p>
                            </div>
                          </div>

                          <div className="flex-shrink-0">
                            {isActive ? (
                              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-emerald-600 hover:text-white transition"
                              >
                                Pilih
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: SCROLL PILIH SURAT (1 - 114 DENGAN PENCARIAN) */}
              {verticalPickerType === 'surah' && (
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Search Box */}
                  <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                    <div className="relative">
                      <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                      <input
                        type="text"
                        value={verticalSearchQuery}
                        onChange={(e) => setVerticalSearchQuery(e.target.value)}
                        placeholder="Cari nomor atau nama surat (contoh: 36, Yasin, Al-Mulk)..."
                        className={`w-full pl-10 pr-9 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0a7c29] transition ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                            : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500'
                        }`}
                        autoFocus
                      />
                      {verticalSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setVerticalSearchQuery('')}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 transition ${
                            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* List 114 Surat Lengkap */}
                  <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 p-2 space-y-1">
                    {SURAH_LIST.filter(
                      (s) =>
                        s.namaLatin.toLowerCase().includes(verticalSearchQuery.toLowerCase()) ||
                        s.arti.toLowerCase().includes(verticalSearchQuery.toLowerCase()) ||
                        String(s.nomor).includes(verticalSearchQuery)
                    ).map((surah) => {
                      const isActive = quickSurahNum === surah.nomor;
                      return (
                        <div
                          key={`picker-surah-${surah.nomor}`}
                          id={`picker-item-surah-${surah.nomor}`}
                          onClick={() => {
                            setQuickSurahNum(surah.nomor);
                            if (surah.juz) setWheelJuzNum(surah.juz);
                            if (quickAyatNum > surah.jumlahAyat) setQuickAyatNum(1);
                            setVerticalPickerType(null);
                            setVerticalSearchQuery('');
                          }}
                          className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition ${
                            isActive
                              ? 'bg-sky-500/15 border-2 border-sky-500 ring-2 ring-sky-500/20 shadow-xs'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`w-9 h-9 rounded-2xl font-mono font-black text-xs sm:text-sm flex items-center justify-center flex-shrink-0 ${
                              isActive
                                ? 'bg-sky-600 text-white shadow-sm'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {surah.nomor}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                                  {surah.namaLatin}
                                </h4>
                                {isActive && (
                                  <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 text-[10px] font-black">
                                    Aktif
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                "{surah.arti}" • {surah.jumlahAyat} ayat • Juz {surah.juz}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-quran-lpmq text-xl sm:text-2xl text-[#0a7c29] dark:text-emerald-400 font-bold" dir="rtl">
                              {surah.nama}
                            </span>
                            {isActive && (
                              <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: SCROLL PILIH AYAT (1 - TOTAL AYAT) */}
              {verticalPickerType === 'ayat' && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="px-4 py-2.5 bg-amber-50/50 dark:bg-amber-950/30 border-b border-amber-100 dark:border-amber-900/50 flex items-center justify-between text-xs text-amber-900 dark:text-amber-300 font-semibold flex-shrink-0">
                    <div>
                      <span>QS. {currentQuickSurah.namaLatin}</span>
                      <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 ml-1.5">
                        (Total {currentQuickSurah.jumlahAyat} Ayat)
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black font-mono text-[11px]">
                      Aktif: Ayat {quickAyatNum}
                    </span>
                  </div>

                  {/* Scrollable Ayat List */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                    {Array.from({ length: currentQuickSurah.jumlahAyat }, (_, i) => i + 1).map((num) => {
                      const isActive = quickAyatNum === num;
                      return (
                        <div
                          key={`picker-ayat-${num}`}
                          id={`picker-item-ayat-${num}`}
                          onClick={() => {
                            setQuickAyatNum(num);
                            setVerticalPickerType(null);
                          }}
                          className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition ${
                            isActive
                              ? 'bg-amber-500/20 border-2 border-amber-500 ring-2 ring-amber-400/30 shadow-xs'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-xl font-mono font-black text-xs flex items-center justify-center flex-shrink-0 ${
                              isActive
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                            }`}>
                              {num}
                            </span>
                            <div>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                Ayat {num}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                                QS. {currentQuickSurah.namaLatin} : {num}
                              </span>
                            </div>
                          </div>

                          <div>
                            {isActive ? (
                              <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 hover:text-emerald-500 font-bold">
                                Pilih
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Footer Modal: Tombol Aksi Langsung Buka & Baca */}
              <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setVerticalPickerType(null);
                    setVerticalSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVerticalPickerType(null);
                    setVerticalSearchQuery('');
                    handleOpenSurah(currentQuickSurah, quickAyatNum);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0a7c29] to-emerald-600 hover:from-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Buka QS. {currentQuickSurah.namaLatin} : {quickAyatNum}</span>
                </button>
              </div>
            </div>
          </div>
        )}


        {/* ======================================================== */}
        {/* MODAL 8: BUAT TARGET KHATAMAN BARU                       */}
        {/* ======================================================== */}
        {showNewKhatamModal && (
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 ${isDark ? 'dark' : ''}`}>
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
                  <label className={`block font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Judul Program Khataman *
                  </label>
                  <input
                    type="text"
                    required
                    value={newKhatamInput.title}
                    onChange={(e) => setNewKhatamInput({ ...newKhatamInput, title: e.target.value })}
                    placeholder="Contoh: Khataman Ramadhan 1447H, Khataman Rutin"
                    className={`w-full p-2.5 rounded-xl border font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none transition ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Nama Khataman Siapa / Niat Untuk *
                  </label>
                  <input
                    type="text"
                    required
                    value={newKhatamInput.targetPerson}
                    onChange={(e) => setNewKhatamInput({ ...newKhatamInput, targetPerson: e.target.value })}
                    placeholder="Contoh: Pribadi, Untuk Ibu Tercinta, Almarhum Ayah"
                    className={`w-full p-2.5 rounded-xl border font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none transition ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Tanggal Awal Baca *
                    </label>
                    <input
                      type="date"
                      required
                      value={newKhatamInput.startDate}
                      onChange={(e) => setNewKhatamInput({ ...newKhatamInput, startDate: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none transition ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Target Waktu (Hari)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={newKhatamInput.targetDays}
                      onChange={(e) => setNewKhatamInput({ ...newKhatamInput, targetDays: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none transition ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Catatan / Doa & Harapan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={newKhatamInput.notes}
                    onChange={(e) => setNewKhatamInput({ ...newKhatamInput, notes: e.target.value })}
                    placeholder="Tulis niat doa, harapan, atau pesan untuk khataman ini..."
                    className={`w-full p-2.5 rounded-xl border font-medium focus:ring-2 focus:ring-[#0a7c29] focus:outline-none transition ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
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
