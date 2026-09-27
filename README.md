# Aplikasi Kanomas - Solusi Digital Umrah & Haji Khusus Resmi Kemenag RI

Aplikasi mobile-first Progressive Web App (PWA) interaktif untuk **PT Kanomas Artha Wisata** (PPIU No. U.310/2021 | PIHK No. 9120313132406). Dirancang dengan arsitektur modern berstandar luxury Islamic visual, bottom navigation responsif, panduan ibadah lengkap, alat bantu manasik interaktif, dan database internal terpadu multi-peran (Admin, Mitra Syiar Marketing, Jamaah Aktif, Calon Jamaah, Tabungan Umroh BSI).

---

## 🌟 Fitur Utama Aplikasi

### 1. Navigasi & Tampilan Interaktif (Bottom Navigation)
* **Beranda (Home)**: Hero video Ka'bah visual sinematik, status legalitas resmi Kemenag RI, ticker jadwal sholat Tasikmalaya & Makkah, akses cepat ke seluruh modul ibadah, daftar paket unggulan (Buy 1 Get 1 & Bintang 4), dan profil dewan pembimbing ibadah.
* **Paket (Katalog Layanan)**: Katalog lengkap Paket Umrah Promo Hemat, Umrah Plus Muscat, Bintang 4 Garuda Indonesia, Program Shafa Pelataran Bintang 5, Haji Khusus & Furoda VIP, dan Tabungan Syariah BSI. Dilengkapi fitur filter kategori, pencarian, ketersediaan sisa seat, serta flyer modal resolusi tinggi.
* **Ibadah & Edukasi (Manasik Sunnah)**:
  - **Tawaf & Sa'i Counter**: Alat hitung 7 putaran Thawaf & Sa'i dengan getaran haptic feedback, suara ketukan, doa sunnah khusus di tiap putaran (Arab + Latin + Arti), dan perayaan saat selesai.
  - **Tasbih Digital**: Counter zikir getar dengan pilihan target (33, 99, 100, bebas) dan audio lembut.
  - **Audio Doa & Talbiyah**: Pelantun nada Talbiyah (*"Labbaik Allahumma Labbaik..."*) dengan Web Audio API synthesizer offline mandiri tanpa dependensi file eksternal, dilengkapi teks karaoke sinkron.
  - **Peta Interaktif Manasik**: Peta skematis titik-titik suci Masjidil Haram, Ka'bah Mataf, Mas'a Safa-Marwah, Mina, Muzdalifah, Arafah, Masjid Nabawi, Raudhah Syarifah, dan titik Miqat (Bir Ali, Yalamlam).
  - **Checklist Koper & Dokumen**: Checklist interaktif paspor, visa, vaksin, pakaian ihram, dan koper dengan bar persentase kesiapan.
  - **Jadwal Kajian Tasikmalaya**: Daftar kajian sunnah dan manasik di Priangan Timur bersama asatidz Kanomas dengan fitur RSVP WA dan share.
* **Waktu Sholat & Kiblat**:
  - Jadwal 5 waktu sholat + waktu terbit/syuruq dengan pilihan kota: **Tasikmalaya**, Makkah, Madinah, Jakarta, Bandung.
  - Hitung mundur menuju waktu sholat berikutnya.
  - **Kompas Kiblat Visual**: Indikator arah kiblat presisi (295.2° Baratlaut dari Tasikmalaya).
* **Layanan & Eksternal**:
  - **Panduan & Launcher Aplikasi Nusuk**: Akses resmi pemesanan izin masuk Raudhah Nabawi dan izin Umrah Saudi Arabia (Play Store, App Store, dan Nusuk Web).
  - **Cek Status Keberangkatan Jamaah**: Fitur pencarian NIK/Nomor WhatsApp untuk mengetahui status visa, maskapai penerbangan, pembagian kamar hotel di Makkah/Madinah, dan status koper.
  - Akses Siskopatuh Kemenag RI, Tawakkalna, dan Cek Porsi Haji.

---

### 2. Database Terpadu Perusahaan (Multi-Role System)
Aplikasi dilengkapi switcher peran instan di pojok kanan atas:

1. **Mode Jamaah / Publik**: Tampilan user-friendly untuk jamaah dan calon jamaah dalam mengakses layanan dan ibadah.
2. **Mode Mitra Syiar (Marketing Dashboard)**:
   - Panel komisi: Total Komisi, Komisi Dicairkan, Komisi Tertunda (Rp 1 Juta/jamaah).
   - Kode referral unik (misal: `KANOMAS-SYIAR-01`) dan generator tautan referral otomatis.
   - Tombol share copywriting broadcast WhatsApp siap kirim ke grup majelis ta'lim.
   - Formulir pendaftaran calon jamaah rujukan langsung masuk ke database.
   - Galeri flyer promosi resolusi tinggi.
3. **Mode Admin Perusahaan (Enterprise Console)**:
   - **Dashboard Ringkasan KPI**: Statistik paket aktif, jamaah terdaftar, calon jamaah, dan total saldo tabungan BSI.
   - **Kelola Paket**: Tambah paket baru, ubah harga (Quad, Triple, Double), atur kuota seat, dan hapus paket.
   - **Kelola Jamaah**: Update status visa (Proses / Issued), tiket maskapai, kamar hotel, dan status pembayaran lunas.
   - **Kelola Calon Jamaah**: Pantau status leads (Baru, Follow Up, Siap DP, Terdaftar).
   - **Kelola Tabungan BSI**: Catat mutasi setoran tabungan jamaah, verifikasi saldo, dan target keberangkatan.
   - **Kelola Mitra Syiar**: Pantau performa mitra dan tombol pencairan komisi pending.
   - **Backup & Restore Database**: Fitur **Export JSON** untuk mengunduh backup seluruh database, **Import JSON** untuk restore data, dan **Reset Pabrik** untuk kembali ke data standar Kanomas.

---

## 🛠️ Cara Menjalankan Aplikasi

Aplikasi dibangun menggunakan **React 18 + Vite + Tailwind CSS + Lucide Icons**:

### Mode Development (Pengembangan):
```bash
npm run dev
```
Akses di browser: `http://localhost:3000`

### Mode Production Build (Kompilasi Siap Rilis):
```bash
npm run build
```
File hasil kompilasi siap hosting berada di folder `dist/`.

### Menjalankan Preview Production:
```bash
npm run preview
```

---

## 🏢 Profil Legalitas Perusahaan

* **Nama Badan Hukum**: PT Kanomas Artha Wisata
* **Cabang Pelayanan**: Tasikmalaya & Priangan Timur, Jawa Barat
* **Izin Umrah (PPIU)**: Kemenag RI No. U.310 / 2021
* **Izin Haji Khusus (PIHK)**: Kemenag RI No. 9120313132406
* **Akreditasi**: Akreditasi A (Kemenag RI & Komite Akreditasi Nasional)
* **Keanggotaan**: Anggota Resmi AMPHURI No. 165
* **Mitra Perbankan**: Bank Syariah Indonesia (BSI)
* **Hotline CS Tasikmalaya**: 0811-2113-363
