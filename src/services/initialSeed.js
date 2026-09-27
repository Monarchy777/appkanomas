// Initial Master Data for PT Kanomas Artha Wisata
export const COMPANY_PROFILE = {
  name: "PT Kanomas Artha Wisata - Cabang Tasikmalaya",
  legalName: "PT Kanomas Artha Wisata",
  tagline: "Bimbingan Sunnah Dari Hati, Hotel Pelataran, Kepastian Jadwal Tanpa Penundaan",
  ppiu: "U.310 / 2021",
  pihk: "9120313132406",
  akreditasi: "Akreditasi A (Kemenag RI & KAN)",
  amphuri: "Anggota AMPHURI No. 165",
  bankMitra: "Bank Syariah Indonesia (BSI)",
  csPhone: "628112113363",
  displayPhone: "0811-2113-363",
  email: "tasikmalaya@kanomas.com",
  website: "https://www.kanomastasikmalaya.com",
  address: "Tasikmalaya, Jawa Barat, Indonesia (Melayani Seluruh Priangan Timur & Nasional)",
  operatingHours: "Senin - Sabtu (08.30 - 17.00 WIB)",
  heroPoster: "/assets/thawaf-poster.jpg",
  logo: "/assets/logo-kanomas.png",
  logoIco: "/assets/logo-kanomas.ico"
};

export const INITIAL_MENTORS = [
  {
    id: 1,
    name: "KH. Nono Nurul Hidayat",
    role: "Dewan Pembimbing Ibadah Umrah",
    cert: "Kemenag Bersertifikat",
    photo: "/assets/Pembimbing/pembimbing-kh-nono-nurul-hidayat.png",
    fallbackPhoto: "/assets/Pembimbing/pembimbing-kh-nono-nurul-hidayat.png",
    desc: "Membimbing jamaah dengan kelembutan, kesabaran, dan pendalaman makna spiritual di setiap manasik dan thawaf."
  },
  {
    id: 2,
    name: "H. Irpan Hilmi, Lc., MA., MH.",
    role: "Dewan Pembimbing Ibadah Umrah",
    cert: "Kemenag Bersertifikat",
    photo: "/assets/Pembimbing/pembimbing-h-irpan-hilmi.png",
    fallbackPhoto: "/assets/Pembimbing/pembimbing-h-irpan-hilmi.png",
    desc: "Alumni Timur Tengah berkeilmuan syariah mendalam, membimbing tata cara ibadah secara presisi sesuai sunnah."
  },
  {
    id: 3,
    name: "H. Asep Mulyana",
    role: "Dewan Pembimbing & Pendamping Ibadah",
    cert: "Kemenag Bersertifikat",
    photo: "/assets/Pembimbing/pembimbing-h-asep-mulyana.png",
    fallbackPhoto: "/assets/Pembimbing/pembimbing-h-asep-mulyana.png",
    desc: "Pendamping ibadah yang ramah dan bersahaja, senantiasa mendampingi jamaah dari persiapan hingga kepulangan."
  },
  {
    id: 4,
    name: "KH. Didi Mochamad Turmudi, Lc., MA.",
    role: "Dewan Pembimbing Ibadah Umrah & Haji",
    cert: "Kemenag Bersertifikat",
    photo: "/assets/Pembimbing/pembimbing-kh-didi-mochamad-turmudi.png",
    fallbackPhoto: "/assets/Pembimbing/pembimbing-kh-didi-mochamad-turmudi.png",
    desc: "Ulama kharismatik yang mengayomi, membekali pemahaman hakikat ibadah hingga mencapai kemabruran sejati."
  }
];

export const INITIAL_PACKAGES = [
  {
    id: 'PKG-01',
    title: "Umrah Promo Plus Muscat (Bayar 1 Berangkat 2)",
    category: "plus",
    airline: "Oman Air (TIF - TIF)",
    duration: "11 Hari",
    departureDate: "20 September 2026",
    hotelMakkah: "Fajr Badea 5 / Setaraf (4N)",
    hotelMadinah: "Arkan Al Manar / Setaraf (3N)",
    hotelTransit: "Hotel Muscat Oman (1 Malam City Tour)",
    priceQuad: 49900000,
    priceTriple: 52900000,
    priceDouble: 55900000,
    quotaTotal: 45,
    quotaFilled: 38,
    status: "Promo Buy 1 Get 1 Free",
    coverImage: "/assets/flyers/flyer-promo-plus-muscat-bayar1-berangkat2-20sept.jpg",
    description: "Promo Spesial Bayar 1 Berangkat 2 (Buy 1 Get 1 Free) maskapai internasional Oman Air. Termasuk City Tour 1 Malam di Muscat Oman, hotel di Madinah dan Makkah, visa, makan 3x sehari, dan bimbingan manasik intensif.",
    features: [
      "Tiket Pesawat PP Oman Air",
      "Bonus 1 Malam Menginap City Tour Muscat",
      "Visa Umrah Resmi & Asuransi Perjalanan",
      "Makan 3x Menu Indonesia",
      "Handling Bandara & Kereta/Bus AC Nyaman",
      "Air Zamzam 5 Liter Resmi"
    ]
  },
  {
    id: 'PKG-02',
    title: "Umrah Promo Spesial Bulan Maulid (Bayar 1 Berangkat 2)",
    category: "reguler",
    airline: "Oman Air",
    duration: "10 Hari",
    departureDate: "03 Oktober 2026",
    hotelMakkah: "Snood Ajyad / Setaraf (4N)",
    hotelMadinah: "Arkan Al Manar / Setaraf (3N)",
    hotelTransit: "-",
    priceQuad: 49900000,
    priceTriple: 52900000,
    priceDouble: 55900000,
    quotaTotal: 40,
    quotaFilled: 32,
    status: "Promo Maulid 10 Hari",
    coverImage: "/assets/flyers/flyer-promo-maulid-bayar1-berangkat2-3okt.jpg",
    description: "Program Spesial Maulid Nabi Muhammad SAW paket hemat Buy 1 Get 1 Free. Tiket PP Oman Air, makan 3x sehari, asuransi, ziarah & city tour, dan air zamzam 5 liter.",
    features: [
      "Promo Bayar 1 Berangkat 2 Pax",
      "Ziarah Makkah & Madinah Lengkap",
      "Pembimbing Bersertifikat Kemenag",
      "Bimbingan Manasik Pra-Keberangkatan",
      "Koper & Seragam Eksklusif Kanomas"
    ]
  },
  {
    id: 'PKG-03',
    title: "Paket Umroh Bintang 4 Garuda Indonesia (Bonus Kereta Cepat)",
    category: "reguler",
    airline: "Garuda Indonesia (Direct CGK - JED)",
    duration: "9 Hari",
    departureDate: "05 Oktober 2026",
    hotelMakkah: "Maysan Al Mashaer / Setaraf (4N)",
    hotelMadinah: "Nozol Royal Inn / Setaraf (3N)",
    hotelTransit: "-",
    priceQuad: 33900000,
    priceTriple: 36900000,
    priceDouble: 39900000,
    quotaTotal: 45,
    quotaFilled: 41,
    status: "Bintang 4 Premium",
    coverImage: "/assets/flyers/flyer-umroh-bintang4-garuda-5okt.jpg",
    description: "Penerbangan direct bersama maskapai nasional Garuda Indonesia. Dilengkapi fasilitas Bonus Kereta Cepat Haramain Express, Free Makan di Restoran Al Romansiah, hotel dekat pelataran masjid, dan ziarah lengkap.",
    features: [
      "Direct Flight Garuda Indonesia PP",
      "Free Tiket Kereta Cepat Haramain Express (Madinah - Makkah)",
      "Free Makan Spesial Resto Al-Romansiah",
      "Hotel Nyaman Bintang 4 Dekat Masjid",
      "Bus Eksekutif Model Terbaru 2026"
    ]
  },
  {
    id: 'PKG-04',
    title: "Umrah Promo Paket Hemat Garuda Indonesia (10 Hari)",
    category: "reguler",
    airline: "Garuda Indonesia",
    duration: "10 Hari",
    departureDate: "30 November 2026",
    hotelMakkah: "Fajr Badea 5 / Setaraf (4N)",
    hotelMadinah: "Grand Zowar / Setaraf (3N)",
    hotelTransit: "-",
    priceQuad: 27900000,
    priceTriple: 30900000,
    priceDouble: 33900000,
    quotaTotal: 45,
    quotaFilled: 29,
    status: "Promo Super Hemat",
    coverImage: "/assets/flyers/flyer-promo-hemat-garuda-30nov.jpg",
    description: "Paket Umrah Promo Hemat 10 Hari Start Tasikmalaya dengan maskapai Garuda Indonesia. Harga mulai Rp 27,9 Juta sudah termasuk tiket PP, hotel, makan 3x sehari + AlBaik, visa, asuransi, dan zamzam.",
    features: [
      "Start Keberangkatan Tasikmalaya ke Bandara CGK",
      "Free Kuliner Khas Al-Baik Fried Chicken",
      "Bimbingan Ibadah Ramah Lansia",
      "Mutawwif Berpengalaman Standar Kanomas"
    ]
  },
  {
    id: 'PKG-05',
    title: "Program Shafa - Umrah Pelataran Direct Bintang 5 (Etihad)",
    category: "reguler",
    airline: "Etihad Airways (Jed - Jed)",
    duration: "10 Hari",
    departureDate: "03 Agustus 2026",
    hotelMakkah: "Hilton Suite / Dar Al Eiman Royal (Pelataran Bintang 5)",
    hotelMadinah: "Al Aqeeq / Peninsula (Bintang 5)",
    hotelTransit: "-",
    priceQuad: 35900000,
    priceTriple: 38900000,
    priceDouble: 41900000,
    quotaTotal: 35,
    quotaFilled: 33,
    status: "Pelataran Bintang 5",
    coverImage: "/assets/flyers/flyer-shafa-pelataran-etihad-3agt.jpg",
    description: "Program umrah premium dengan hotel menempel pelataran Masjidil Haram & Nabawi. Akses lift langsung tanpa jalan kaki jauh, sangat cocok untuk lansia dan keluarga.",
    features: [
      "Hotel 0 Meter Pelataran Masjidil Haram (Hilton Suite)",
      "Hotel Bintang 5 Dekat Pintu Utama Nabawi",
      "Menu Makanan Buffet International & Nusantara",
      "Fasilitas Kursi Roda Standby",
      "Handling VIP Khusus"
    ]
  },
  {
    id: 'PKG-06',
    title: "Haji Khusus & Furoda VIP Tanpa Antre (Izin Resmi PIHK)",
    category: "haji",
    airline: "Saudia Airlines / Garuda Indonesia Direct",
    duration: "25 - 28 Hari",
    departureDate: "Musim Haji 1447H / 2026",
    hotelMakkah: "Hotel Bintang 5 Menara Zamzam / Dar Al Tawhid",
    hotelMadinah: "Hotel Bintang 5 Oberoi / Anwar Al Madinah",
    hotelTransit: "Apartemen Transit Nyaman di Shisha / Aziziyah",
    priceQuad: 235000000,
    priceTriple: 255000000,
    priceDouble: 285000000,
    quotaTotal: 30,
    quotaFilled: 24,
    status: "Izin Resmi PIHK",
    coverImage: "/assets/flyers/flyer-umroh-bintang4-garuda-5okt.jpg",
    description: "Penyelenggaraan Ibadah Haji Khusus berizin resmi Kemenag RI (PIHK No. 9120313132406). Tenda Maktab VIP ber-AC di Mina & Arafah, pembimbing ibadah berpengalaman, hotel transit bintang 5, kepastian visa haji resmi.",
    features: [
      "Visa Haji Resmi (PIHK No. 9120313132406)",
      "Maktab VIP Arafah & Mina Tenda Ber-AC dan Karpet Mewah",
      "Hotel Pelataran Makkah & Madinah Bintang 5",
      "Pendampingan Dokter & Tim Medis 24 Jam",
      "Bimbingan Manasik Haji Komprehensif di Tasikmalaya & Asrama"
    ]
  },
  {
    id: 'PKG-07',
    title: "Program Tabungan Umroh Kanomas Berkah via BSI",
    category: "tabungan",
    airline: "Garuda Indonesia / Saudia",
    duration: "Fleksibel",
    departureDate: "Sesuai Target Saldo Jamaah",
    hotelMakkah: "Pilihan Hotel Bintang 4 / 5",
    hotelMadinah: "Pilihan Hotel Bintang 4 / 5",
    hotelTransit: "-",
    priceQuad: 500000,
    priceTriple: 0,
    priceDouble: 0,
    quotaTotal: 200,
    quotaFilled: 112,
    status: "Pendaftaran Dibuka",
    coverImage: "/assets/flyers/flyer-tabungan-umroh-berkah.jpg",
    description: "Rencanakan ibadah umrah dengan menabung syariah di Bank Syariah Indonesia (BSI). Bebas biaya administrasi bulanan, setoran awal ringan mulai Rp 500.000, aman dan terdaftar resmi di Kanomas.",
    features: [
      "Rekening Resmi Syariah via BSI",
      "Bebas Biaya Admin Bulanan",
      "Simulasi Target Fleksibel (12 - 36 Bulan)",
      "Otomatis Terdaftar Sebagai Calon Jamaah Prioritas",
      "Dapat Kartu Tabungan Umroh Kanomas"
    ]
  }
];

export const INITIAL_MITRA = [
  {
    id: 'MTR-001',
    code: 'KANOMAS-SYIAR-01',
    name: "Ust. Ahmad Fauzi, S.Pd.I",
    phone: "081223344551",
    email: "ahmad.fauzi@kanomasmitra.com",
    city: "Tasikmalaya Kota (Cihideung)",
    totalJamaah: 14,
    totalCommission: 14000000,
    commissionPaid: 11000000,
    commissionPending: 3000000,
    status: "Aktif",
    joinedDate: "15 Januari 2026"
  },
  {
    id: 'MTR-002',
    code: 'KANOMAS-SYIAR-02',
    name: "Hj. Siti Maryam",
    phone: "081334455662",
    email: "siti.maryam@kanomasmitra.com",
    city: "Ciamis & Banjar",
    totalJamaah: 9,
    totalCommission: 9000000,
    commissionPaid: 7000000,
    commissionPending: 2000000,
    status: "Aktif",
    joinedDate: "02 Februari 2026"
  },
  {
    id: 'MTR-003',
    code: 'KANOMAS-SYIAR-03',
    name: "Kang Deden Kurniawan",
    phone: "085221199883",
    email: "deden.kurniawan@kanomasmitra.com",
    city: "Singaparna & Tasikmalaya Barat",
    totalJamaah: 6,
    totalCommission: 6000000,
    commissionPaid: 5000000,
    commissionPending: 1000000,
    status: "Aktif",
    joinedDate: "20 Februari 2026"
  }
];

export const INITIAL_JAMAAH = [
  {
    id: 'JM-2026-001',
    name: "H. Bambang Sulistyo",
    nik: "3278012005780001",
    passportNo: "C8921134",
    phone: "081234567801",
    packageId: "PKG-03",
    packageName: "Paket Umroh Bintang 4 Garuda Indonesia",
    departureDate: "05 Oktober 2026",
    roomType: "Quad",
    visaStatus: "Issued / Selesai",
    flightStatus: "Confirmed (Garuda GA-980)",
    hotelMakkahRoom: "Maysan Al Mashaer - Kamar 412",
    hotelMadinahRoom: "Nozol Royal - Kamar 305",
    luggageDelivered: true,
    paymentStatus: "Lunas",
    totalPaid: 33900000,
    remainingPayment: 0,
    mitraCode: "KANOMAS-SYIAR-01",
    muthawif: "H. Irpan Hilmi, Lc., MA."
  },
  {
    id: 'JM-2026-002',
    name: "Hj. Endang Rahayu",
    nik: "3278016508800002",
    passportNo: "C8921135",
    phone: "081234567802",
    packageId: "PKG-03",
    packageName: "Paket Umroh Bintang 4 Garuda Indonesia",
    departureDate: "05 Oktober 2026",
    roomType: "Quad",
    visaStatus: "Issued / Selesai",
    flightStatus: "Confirmed (Garuda GA-980)",
    hotelMakkahRoom: "Maysan Al Mashaer - Kamar 412",
    hotelMadinahRoom: "Nozol Royal - Kamar 305",
    luggageDelivered: true,
    paymentStatus: "Lunas",
    totalPaid: 33900000,
    remainingPayment: 0,
    mitraCode: "KANOMAS-SYIAR-01",
    muthawif: "H. Irpan Hilmi, Lc., MA."
  },
  {
    id: 'JM-2026-003',
    name: "Dr. Rahmat Hidayat",
    nik: "3207011210720003",
    passportNo: "B7712398",
    phone: "081399887766",
    packageId: "PKG-06",
    packageName: "Haji Khusus & Furoda VIP Tanpa Antre",
    departureDate: "Musim Haji 1447H / 2026",
    roomType: "Double",
    visaStatus: "Proses Kemenag KSA",
    flightStatus: "Saudia SV-819",
    hotelMakkahRoom: "Menara Zamzam - Suite 1102",
    hotelMadinahRoom: "Oberoi Madinah - Suite 501",
    luggageDelivered: true,
    paymentStatus: "DP & Cicilan Masuk",
    totalPaid: 150000000,
    remainingPayment: 135000000,
    mitraCode: "KANOMAS-SYIAR-02",
    muthawif: "KH. Nono Nurul Hidayat"
  }
];

export const INITIAL_CALON_JAMAAH = [
  {
    id: 'CL-001',
    name: "Ibu Lilis Suryani",
    phone: "081321456789",
    city: "Tasikmalaya (Tawang)",
    targetPackage: "Umrah Promo Spesial Maulid",
    targetDepartureMonth: "Oktober 2026",
    budgetEstimate: "50 Juta (Rencana 2 Orang)",
    status: "Siap DP",
    mitraReferralCode: "KANOMAS-SYIAR-01",
    notes: "Ingin berangkat bersama ibu mertua, butuh kursi roda.",
    createdAt: "2026-09-20"
  },
  {
    id: 'CL-002',
    name: "Bpk. Cecep Somantri",
    phone: "085223908123",
    city: "Singaparna",
    targetPackage: "Umrah Promo Plus Muscat",
    targetDepartureMonth: "September 2026",
    budgetEstimate: "50 Juta",
    status: "Follow Up",
    mitraReferralCode: "KANOMAS-SYIAR-03",
    notes: "Sudah konsultasi paspor, menunggu jadwal pembuatan paspor di MPP Tasikmalaya.",
    createdAt: "2026-09-22"
  },
  {
    id: 'CL-003',
    name: "Hj. Yeti Rochayati",
    phone: "081220991122",
    city: "Ciamis",
    targetPackage: "Program Shafa Pelataran Bintang 5",
    targetDepartureMonth: "Agustus 2026",
    budgetEstimate: "40 Juta",
    status: "Baru",
    mitraReferralCode: "KANOMAS-SYIAR-02",
    notes: "Menanyakan hotel yang paling dekat dengan pelataran Ka'bah untuk orang tua usia 68 tahun.",
    createdAt: "2026-09-26"
  }
];

export const INITIAL_TABUNGAN = [
  {
    id: 'TBG-BSI-001',
    accountNumber: "7128839011 (BSI)",
    jamaahName: "Ibu Nurhayati",
    nik: "3278025501820004",
    phone: "081234889900",
    targetAmount: 32000000,
    currentBalance: 24500000,
    monthlyTarget: 1500000,
    startDate: "2025-10-10",
    targetDate: "2026-11-01",
    status: "Aktif",
    transactions: [
      { id: 'TRX-01', date: "2026-07-05", amount: 1500000, type: "Setoran Bulanan", note: "Setoran Juli via BSI Mobile" },
      { id: 'TRX-02', date: "2026-08-05", amount: 1500000, type: "Setoran Bulanan", note: "Setoran Agustus via BSI Mobile" },
      { id: 'TRX-03', date: "2026-09-05", amount: 1500000, type: "Setoran Bulanan", note: "Setoran September via BSI Mobile" }
    ]
  },
  {
    id: 'TBG-BSI-002',
    accountNumber: "7199402188 (BSI)",
    jamaahName: "Bpk. Hendra Gunawan",
    nik: "3278041009850002",
    phone: "085223114455",
    targetAmount: 64000000,
    currentBalance: 58000000,
    monthlyTarget: 3000000,
    startDate: "2025-05-15",
    targetDate: "2026-10-15",
    status: "Mendekati Lunas",
    transactions: [
      { id: 'TRX-11', date: "2026-07-15", amount: 3000000, type: "Setoran Bulanan", note: "Setoran Suami-Istri" },
      { id: 'TRX-12', date: "2026-08-15", amount: 3000000, type: "Setoran Bulanan", note: "Setoran Suami-Istri" },
      { id: 'TRX-13', date: "2026-09-15", amount: 3000000, type: "Setoran Bulanan", note: "Setoran Suami-Istri" }
    ]
  }
];

export const INITIAL_KAJIAN_TASIKMALAYA = [
  {
    id: 'KJ-01',
    title: "Kajian Fiqih Manasik Umrah Sesuai Sunnah & Praktik Thawaf",
    pemateri: "H. Irpan Hilmi, Lc., MA., MH.",
    role: "Dewan Pembimbing Kanomas",
    location: "Masjid Agung Kota Tasikmalaya",
    address: "Jl. Mesjid Agung No. 1, Yudanagara, Kec. Cihideung, Kota Tasikmalaya",
    date: "Ahad, 04 Oktober 2026",
    time: "08.30 - 11.30 WIB",
    topic: "Tata cara ihram dari miqat, doa-doa thawaf & sa'i, dan kesalahan umum manasik.",
    organizer: "PT Kanomas Tasikmalaya & DKM Masjid Agung",
    htm: "Gratis (Terbuka untuk Umum & Jamaah Kanomas)",
    contactPerson: "0811-2113-363"
  },
  {
    id: 'KJ-02',
    title: "Kajian Tazkiyatun Nafs: Meraih Umrah Mabrur dan Hati yang Khusyuk",
    pemateri: "KH. Nono Nurul Hidayat",
    role: "Dewan Pembimbing Kanomas",
    location: "Masjid Rahmatullah (Cihideung)",
    address: "Jl. KH. Z. Mustofa, Cihideung, Kota Tasikmalaya",
    date: "Sabtu, 10 Oktober 2026",
    time: "Ba'da Ashar (15.45 - 17.30 WIB)",
    topic: "Makna spiritual di balik Ka'bah, Maqam Ibrahim, Hijir Ismail, dan ziarah Madinah Nabawi.",
    organizer: "Majelis Ta'lim Al-Hidayah & Kanomas Priangan",
    htm: "Gratis",
    contactPerson: "0811-2113-363"
  },
  {
    id: 'KJ-03',
    title: "Simulasi Praktik Manasik Akbar Calon Jamaah Musim 1447H",
    pemateri: "KH. Didi Mochamad Turmudi, Lc., MA. & H. Asep Mulyana",
    role: "Tim Bimbingan Manasik Kanomas",
    location: "Gedung Islamic Center Kota Tasikmalaya",
    address: "Jl. Mayor S.L. Tobing, Tugujaya, Cihideung, Kota Tasikmalaya",
    date: "Ahad, 18 Oktober 2026",
    time: "07.30 - 12.00 WIB",
    topic: "Praktik mengenakan kain ihram, miniatur thawaf Ka'bah, sa'i Safa-Marwah, simulasi bandara & hotel.",
    organizer: "Kanomas Tasikmalaya",
    htm: "Khusus Calon Jamaah & Pendaftar Tabungan (Undangan)",
    contactPerson: "0811-2113-363"
  },
  {
    id: 'KJ-04',
    title: "Kajian Fiqih Haji Khusus: Panduan Ibadah di Armuzna (Arafah, Muzdalifah, Mina)",
    pemateri: "H. Irpan Hilmi, Lc., MA., MH.",
    role: "Dewan Pembimbing Kanomas",
    location: "Masjid Agung Ciamis",
    address: "Jl. Jenderal Sudirman No. 1, Ciamis",
    date: "Ahad, 25 Oktober 2026",
    time: "09.00 - 11.30 WIB",
    topic: "Rukun dan wajib haji, mabit di Mina, melontar Jamarat, dan menjaga kesehatan jamaah lansia.",
    organizer: "Kanomas Korwil Ciamis & DKM Ciamis",
    htm: "Gratis untuk Umum",
    contactPerson: "0811-2113-363"
  }
];

export const INITIAL_DOA_MANASIK = [
  {
    id: 'DOA-01',
    category: 'ihram',
    title: "Lafaz Talbiyah",
    arabic: "لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيْكَ لَكَ",
    latin: "Labbaika Allahumma labbaik, labbaika laa syariika laka labbaik, innal hamda wan-ni'mata laka wal-mulk, laa syariika lak.",
    meaning: "Aku penuhi panggilan-Mu ya Allah, aku penuhi panggilan-Mu. Aku penuhi panggilan-Mu, tidak ada sekutu bagi-Mu, aku penuhi panggilan-Mu. Sesungguhnya segala puji, kenikmatan, dan kekuasaan hanyalah bagi-Mu, tiada sekutu bagi-Mu.",
    audioAvailable: true
  },
  {
    id: 'DOA-02',
    category: 'ihram',
    title: "Niat Ihram Umrah di Miqat",
    arabic: "لَبَّيْكَ اللّٰهُمَّ عُمْرَةً",
    latin: "Labbaika Allahumma 'umratan.",
    meaning: "Aku sambut panggilan-Mu ya Allah untuk berumrah.",
    audioAvailable: true
  },
  {
    id: 'DOA-03',
    category: 'ihram',
    title: "Niat Ihram Haji",
    arabic: "لَبَّيْكَ اللّٰهُمَّ حَجًّا",
    latin: "Labbaika Allahumma hajjan.",
    meaning: "Aku sambut panggilan-Mu ya Allah untuk berhaji.",
    audioAvailable: true
  },
  {
    id: 'DOA-04',
    category: 'masjid',
    title: "Doa Memasuki Masjidil Haram / Masjid Nabawi",
    arabic: "اللّٰهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ",
    latin: "Allahumma-ftah lii abwaaba rahmatik.",
    meaning: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.",
    audioAvailable: true
  },
  {
    id: 'DOA-05',
    category: 'thawaf',
    title: "Doa Melihat Ka'bah Pertama Kali",
    arabic: "اللّٰهُمَّ زِدْ هٰذَا الْبَيْتَ تَشْرِيْفًا وَتَعْظِيْمًا وَتَكْرِيْمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَعَظَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيْفًا وَتَكْرِيْمًا وَتَعْظِيْمًا وَبِرًّا",
    latin: "Allahumma zid haadzal baita tasyriifan wa ta'zhiiman wa takriiman wa mahaabah, wa zid man syarrafahu wa 'azhzhamahu mimman hajjahu awi'-tamarahu tasyriifan wa takriiman wa ta'zhiiman wa birraa.",
    meaning: "Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan wibawa pada Baitullah ini. Dan tambahkanlah kemuliaan, kehormatan, keagungan, serta kebaikan bagi siapa saja yang memuliakan dan mengagungkannya dari kalangan orang yang berhaji atau berumrah.",
    audioAvailable: true
  },
  {
    id: 'DOA-06',
    category: 'thawaf',
    title: "Doa Antara Rukun Yamani & Hajar Aswad (Sapu Jagad)",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanaa aatinaa fid-dunyaa hasanah, wa fil-aakhirati hasanah, wa qinaa 'adzaaban-naar.",
    meaning: "Wahai Tuhan kami, berikanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, serta lindungilah kami dari siksa api neraka.",
    audioAvailable: true
  },
  {
    id: 'DOA-07',
    category: 'sai',
    title: "Doa di Bukit Safa & Marwah",
    arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ. لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "Innash-shafaa wal-marwata min sya'aa-irillaah. Abda-u bimaa bada-allaahu bih. Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa 'alaa kulli syai-in qadiir.",
    meaning: "Sesungguhnya Safa dan Marwah adalah sebagian dari syiar-syiar Allah. Aku memulai dengan apa yang Allah mulai dengannya. Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya, milik-Nya segala kerajaan dan bagi-Nya segala pujian, dan Dia Maha Kuasa atas segala sesuatu.",
    audioAvailable: true
  },
  {
    id: 'DOA-08',
    category: 'zamzam',
    title: "Doa Minum Air Zamzam",
    arabic: "اللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ",
    latin: "Allahumma innii as-aluka 'ilman naafi'an, wa rizqan waasi'an, wa syifaa-an min kulli daa-in.",
    meaning: "Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan dari segala macam penyakit.",
    audioAvailable: true
  },
  {
    id: 'DOA-09',
    category: 'haji',
    title: "Doa Wukuf di Arafah",
    arabic: "لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu, yuhyii wa yumiitu, wa huwa 'alaa kulli syai-in qadiir.",
    meaning: "Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya segala kerajaan dan bagi-Nya segala pujian, Dialah Yang menghidupkan dan Yang mematikan, dan Dia Maha Kuasa atas segala sesuatu.",
    audioAvailable: true
  },
  {
    id: 'DOA-10',
    category: 'haji',
    title: "Doa Takbir Melontar Jamarat",
    arabic: "بِسْمِ اللّٰهِ، وَاللّٰهُ أَكْبَرُ، رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمٰنِ",
    latin: "Bismillaahi wallaahu Akbar, raghman lisysyaitaani wa ridhan lir-Rahmaan.",
    meaning: "Dengan nama Allah, dan Allah Maha Besar, sebagai penentangan terhadap setan dan keridhaan bagi Dzat Yang Maha Pengasih.",
    audioAvailable: true
  },
  {
    id: 'DOA-11',
    category: 'ihram',
    title: "Doa Selesai Tahallul (Potong Rambut)",
    arabic: "الْحَمْدُ لِلّٰهِ عَلَى مَا هَدَانَا، وَالْحَمْدُ لِلّٰهِ عَلَى مَا أَنْعَمَنَا بِهِ عَلَيْنَا",
    latin: "Alhamdu lillaahi 'alaa maa hadaanaa, walhamdu lillaahi 'alaa maa an'amanaa bihii 'alainaa.",
    meaning: "Segala puji bagi Allah atas petunjuk yang telah Dia berikan kepada kita, dan segala puji bagi Allah atas segala nikmat yang telah dianugerahkan-Nya kepada kita.",
    audioAvailable: true
  },
  {
    id: 'DOA-12',
    category: 'thawaf',
    title: "Doa Thawaf Wada' (Perpisahan Ka'bah)",
    arabic: "اللّٰهُمَّ لَا تَجْعَلْ هٰذَا آخِرَ الْعَهْدِ بِبَيْتِكَ الْحَرَامِ، وَإِنْ جَعَلْتَهُ فَاعْوِضْنِي عَنْهُ الْجَنَّةَ",
    latin: "Allahumma laa taj'al haadzaa aakhiral 'ahdi bibaitikal-haraam, wa in ja'altahu fa'widh-nii 'anhul jannah.",
    meaning: "Ya Allah, janganlah Engkau jadikan ini sebagai pertemuan terakhir dengan Baitullah Al-Haram, dan jika Engkau jadikan ini yang terakhir, maka gantilah untukku dengan surga-Mu.",
    audioAvailable: true
  }
];

export const INITIAL_CHECKLIST = [
  { id: 'CHK-01', category: 'Dokumen', task: "Paspor Asli (Masa berlaku min. 7 bulan)", done: false, required: true },
  { id: 'CHK-02', category: 'Dokumen', task: "Sertifikat Vaksin Meningitis & Polio Resmi", done: false, required: true },
  { id: 'CHK-03', category: 'Dokumen', task: "Pas Foto 4x6 latar belakang putih (fokus wajah 80%)", done: false, required: true },
  { id: 'CHK-04', category: 'Dokumen', task: "Buku Nikah / Akta Kelahiran asli (untuk pendamping)", done: false, required: false },
  { id: 'CHK-05', category: 'Ibadah', task: "Kain Ihram (2 lembar tanpa jahitan untuk ikhwan)", done: false, required: true },
  { id: 'CHK-06', category: 'Ibadah', task: "Sabuk / Ikat Pinggang Ihram", done: false, required: true },
  { id: 'CHK-07', category: 'Ibadah', task: "Mukena / Gamis Syar'i (untuk akhwat)", done: false, required: true },
  { id: 'CHK-08', category: 'Ibadah', task: "Buku Doa Saku / Aplikasi Doa Kanomas", done: false, required: true },
  { id: 'CHK-09', category: 'Ibadah', task: "Sandal / Sepatu Tawaf empuk & kantong sandal", done: false, required: true },
  { id: 'CHK-10', category: 'Kesehatan', task: "Obat-obatan pribadi resep dokter & vitamin daya tahan", done: false, required: true },
  { id: 'CHK-11', category: 'Kesehatan', task: "Lip balm / pelembab kulit & lotion anti-kering", done: false, required: false },
  { id: 'CHK-12', category: 'Kesehatan', task: "Semprotan air wajah mini (water spray saat thawaf)", done: false, required: false },
  { id: 'CHK-13', category: 'Koper', task: "Baju ganti secukupnya & pakaian dalam sekali pakai", done: false, required: true },
  { id: 'CHK-14', category: 'Koper', task: "Gunting lipat kecil untuk Tahallul (masuk koper bagasi)", done: false, required: true },
  { id: 'CHK-15', category: 'Koper', task: "Powerbank (maks. 20.000 mAh masuk tas kabin)", done: false, required: true },
  { id: 'CHK-16', category: 'Digital', task: "Download & Aktivasi Aplikasi Nusuk di HP", done: false, required: true }
];

export const EXTERNAL_SERVICES = [
  {
    id: 'nusuk',
    title: "Aplikasi Nusuk (Saudi Official)",
    subtitle: "Izin Resmi Raudhah & Ibadah Umrah",
    badge: "Wajib Jamaah",
    desc: "Platform resmi Kementerian Haji & Umrah Arab Saudi untuk reservasi waktu sholat di Raudhah Syarifah Madinah dan izin ibadah Umrah di Masjidil Haram.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Nusuk_Logo.png",
    color: "#059669",
    androidUrl: "https://play.google.com/store/apps/details?id=sa.gov.haj.nusuk",
    iosUrl: "https://apps.apple.com/app/nusuk/id1527907525",
    webUrl: "https://www.nusuk.sa",
    instructions: [
      "Download aplikasi Nusuk di PlayStore atau App Store.",
      "Pilih bahasa Inggris atau Arab, klik New User lalu pilih 'Visitor'.",
      "Masukkan nomor Visa, nomor Paspor, tanggal lahir, dan kebangsaan.",
      "Verifikasi via kode OTP yang dikirim ke email aktif Anda.",
      "Pilih menu 'Pray in the Noble Rawdah' (Izin Raudhah Pria / Wanita).",
      "Pilih tanggal dan slot waktu yang tersedia, lalu konfirmasi."
    ]
  },
  {
    id: 'siskopatuh',
    title: "Siskopatuh Kemenag RI",
    subtitle: "Cek Validitas & Data Jamaah Umrah",
    badge: "Resmi Kemenag",
    desc: "Sistem Komputerisasi Pengelolaan Terpadu Umrah dan Haji Khusus Kementerian Agama RI. Cek status pendaftaran PT Kanomas Artha Wisata (PPIU U.310).",
    color: "#ea580c",
    webUrl: "https://siskopatuh.kemenag.go.id/",
    instructions: [
      "Kunjungi website resmi siskopatuh.kemenag.go.id",
      "Pilih menu Cek PPIU Berizin",
      "Ketikkan 'Kanomas Artha Wisata' atau nomor izin 'U.310'",
      "Pastikan status izin aktif dan terverifikasi Kemenag RI."
    ]
  },
  {
    id: 'haji-kemenag',
    title: "Haji Pintar / Cek Porsi Kemenag",
    subtitle: "Estimasi Keberangkatan Haji Khusus & Reguler",
    badge: "Kemenag RI",
    desc: "Cek nomor porsi haji Anda untuk mengetahui perkiraan tahun keberangkatan ke tanah suci Makkah.",
    color: "#2563eb",
    webUrl: "https://haji.kemenag.go.id/v4/",
    instructions: [
      "Buka portal haji.kemenag.go.id",
      "Masukkan 10 digit Nomor Porsi Haji dari SPPH Kanomas",
      "Klik Cari untuk melihat rincian calon jamaah dan estimasi tahun keberangkatan."
    ]
  },
  {
    id: 'tawakkalna',
    title: "Tawakkalna Services",
    subtitle: "Aplikasi Identitas Digital Arab Saudi",
    badge: "Official KSA",
    desc: "Aplikasi identitas digital resmi dari Pemerintah Kerajaan Arab Saudi untuk pengunjung dan warga negara.",
    color: "#0284c7",
    webUrl: "https://tawakkalna.sdaia.gov.sa/",
    instructions: [
      "Download dan instal aplikasi Tawakkalna Services",
      "Daftar dengan nomor paspor dan visa kedatangan di Saudi",
      "Dapat digunakan untuk verifikasi status kesehatan dan dokumen digital di Arab Saudi."
    ]
  }
];
