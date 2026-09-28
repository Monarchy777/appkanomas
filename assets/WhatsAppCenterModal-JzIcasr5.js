import{r as i,d as l,j as a,t as T,X as S,C as x,u as b}from"./index-DzoIG6Xw.js";import{S as B}from"./send-B9sLb-0p.js";const g=[{id:"lead_welcome",category:"Pendaftaran",title:"Konfirmasi Pendaftaran Calon Jamaah",template:`*Assalamu'alaikum Warahmatullahi Wabarakatuh* Bapak/Ibu {NAMA_JAMAAH},

Terima kasih atas kepercayaannya memilih *PT Kanomas Artha Wisata (Cabang Tasikmalaya)* untuk rencana ibadah ke Baitullah.

📋 *Rincian Booking Anda:*
• Paket: *{NAMA_PAKET}*
• Estimasi Berangkat: *{TANGGAL_BERANGKAT}*
• Status: *Terdaftar di Sistem Kanomas*

💳 *Informasi Pembayaran Rekening Resmi Perusahaan:*
• Bank: *Bank Syariah Indonesia (BSI)*
• No. Rekening: *7128839011*
• Atas Nama: *PT KANOMAS ARTHA WISATA*
_(Mohon hanya mentransfer ke rekening resmi atas nama PT di atas)_

Silakan kirimkan bukti transfer DP atau hubungi kami jika membutuhkan bantuan formulir pembuatan paspor.

Jazakumullahu Khairan Katsiran.
*Tim Layanan Jamaah Kanomas Tasikmalaya*
Hotline: 0811-2113-363`},{id:"tabungan_deposit",category:"Tabungan BSI",title:"Konfirmasi Setoran Tabungan Umrah BSI",template:`*Bismillah, Notifikasi Setoran Tabungan Umroh Kanomas Berkah*

Yth. Bapak/Ibu {NAMA_JAMAAH},
Alhamdulillah, setoran tabungan umrah Anda telah tercatat dengan rincian:

💰 *Rincian Saldo Tabungan BSI:*
• Rekening BSI: *{NO_REKENING}*
• Saldo Saat Ini: *Rp {SALDO_TABUNGAN}*
• Target Paket: *Rp {TARGET_TABUNGAN}*
• Progres: *{PROGRES_PERSEN}% Menuju Keberangkatan*

Semoga Allah SWT senantiasa melapangkan rezeki dan memudahkan langkah Bapak/Ibu menuju Baitullah Makkah & Madinah. Aamiin.

Salam hangat,
*PT Kanomas Artha Wisata - Cabang Tasikmalaya*`},{id:"passport_reminder",category:"Dokumen",title:"Pengingat Berkas Paspor & Vaksinasi",template:`*Assalamu'alaikum Warahmatullahi Wabarakatuh* Bapak/Ibu {NAMA_JAMAAH},

Mengingat jadwal keberangkatan paket *{NAMA_PAKET}* semakin dekat pada *{TANGGAL_BERANGKAT}*, mohon kesediaan Bapak/Ibu untuk melengkapi berkas:

📑 *Checklist Berkas:*
1. Paspor Asli (Masa berlaku minimal 7 bulan sebelum berangkat)
2. Buku / Sertifikat Vaksin Meningitis & Polio Resmi
3. Pas Foto 4x6 latar belakang putih (fokus wajah 80%)

Bagi yang belum memiliki paspor, Kanomas menyediakan *Surat Rekomendasi Resmi Kemenag* untuk mempermudah proses pembuatan paspor di Kantor Imigrasi Tasikmalaya.

Silakan konfirmasi jika berkas sudah siap untuk kami jadwalkan penyerahan. Terima kasih.
*Admin Operasional Kanomas Tasikmalaya*`},{id:"nusuk_guide",category:"Ibadah",title:"Panduan Reservasi Izin Raudhah via Nusuk",template:`*Assalamu'alaikum Warahmatullahi Wabarakatuh* Bapak/Ibu Jamaah {NAMA_JAMAAH},

Berikut kami kirimkan panduan resmi pemesanan izin ibadah sholat di *Raudhah Syarifah (Masjid Nabawi Madinah)* melalui aplikasi resmi Pemerintah Arab Saudi: *Nusuk (Eatmarna)*.

📲 *Langkah Singkat:*
1. Unduh aplikasi 'Nusuk' di Google Play Store atau Apple App Store.
2. Pilih bahasa 'English' atau 'Bahasa Indonesia'.
3. Registrasi menggunakan Nomor Paspor & Nomor Visa Umrah Anda.
4. Pilih menu 'Pray in the Noble Rawdah' dan tentukan jadwal yang tersedia.

Bapak/Ibu juga dapat berkonsultasi langsung dengan Muthawif Kanomas kami: *{MUTHAWIF}* saat tiba di hotel Madinah.

Selamat menunaikan ibadah dengan khusyuk dan mabrur.`},{id:"mitra_broadcast",category:"Syiar Mitra",title:"Broadcast Syiar Paket Umrah Hemat 2026",template:`*Bismillah, Panggilan Suci Menuju Baitullah Bersama Kanomas*

Bapak/Ibu dan sahabat yang dirahmati Allah,
PT Kanomas Artha Wisata (Cabang Tasikmalaya) resmi membuka pendaftaran Umrah Musim 1447H / 2026 bergaransi kepastian berangkat & hotel dekat Ka'bah.
(Izin PPIU No. U.310 / 2021 | PIHK No. 9120313132406)

✨ *Program Unggulan 2026:*
1. *Promo Spesial Buy 1 Get 1 Free* (Bayar 1 Berangkat 2) - Oman Air
2. *Paket Bintang 4 Direct Garuda Indonesia* (Bonus Kereta Cepat Haramain)
3. *Program Shafa Pelataran Bintang 5* (Hotel Menempel Pintu Masjidil Haram)
4. *Haji Khusus Furoda VIP Tanpa Antre*
5. *Tabungan Umrah Syariah via BSI* mulai Rp 500.000 bebas biaya admin

Konsultasi dan pendaftaran resmi melalui tautan rujukan saya:
👉 {LINK_REFERRAL}

Atau silakan balas pesan ini untuk informasi tanggal keberangkatan dan brosur lengkap. Jazakumullahu khair!`}];function K({onClose:k,defaultRecipientPhone:A,defaultRecipientName:N}){const[r,f]=i.useState(g[0]),[o,m]=i.useState(A||""),[d,c]=i.useState(N||"Bapak/Ibu"),[s,h]=i.useState(!1),j=l.getJamaah(),y=l.getCalonJamaah();l.getTabungan();const w=l.getMitra(),n=(()=>{var t;let e=r.template;return e=e.replace(/{NAMA_JAMAAH}/g,d||"Bapak/Ibu"),e=e.replace(/{NAMA_PAKET}/g,"Paket Umroh Bintang 4 Garuda Indonesia"),e=e.replace(/{TANGGAL_BERANGKAT}/g,"05 Oktober 2026"),e=e.replace(/{NO_REKENING}/g,"7128839011 (BSI)"),e=e.replace(/{SALDO_TABUNGAN}/g,"24.500.000"),e=e.replace(/{TARGET_TABUNGAN}/g,"32.000.000"),e=e.replace(/{PROGRES_PERSEN}/g,"76"),e=e.replace(/{PENERBANGAN}/g,"Garuda Indonesia (GA-980) Direct"),e=e.replace(/{MUTHAWIF}/g,"H. Irpan Hilmi, Lc., MA."),e=e.replace(/{KAMAR_MAKKAH}/g,"Maysan Al Mashaer - Kamar 412"),e=e.replace(/{LINK_REFERRAL}/g,`https://kanomastasikmalaya.com/?ref=${((t=w[0])==null?void 0:t.code)||"KANOMAS-SYIAR-01"}`),e})(),P=()=>{const e=o.replace(/[^0-9]/g,"");let t="";e?t=`https://wa.me/${e.startsWith("0")?"62"+e.slice(1):e}?text=${encodeURIComponent(n)}`:t=`https://wa.me/?text=${encodeURIComponent(n)}`,window.open(t,"_blank")},u=()=>{navigator.clipboard.writeText(n),h(!0),setTimeout(()=>h(!1),2e3)},p=e=>{c(e.name),m(e.phone||"")};return a.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200",children:a.jsxs("div",{className:"relative w-full max-w-3xl bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]",children:[a.jsxs("div",{className:"px-5 py-4 bg-emerald-50/70 border-b border-emerald-200 flex items-center justify-between",children:[a.jsxs("div",{className:"flex items-center gap-2.5",children:[a.jsx("span",{className:"p-2 rounded-xl bg-emerald-600 text-white shadow-xs",children:a.jsx(T,{className:"w-5 h-5"})}),a.jsxs("div",{children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("h3",{className:"font-extrabold text-base text-slate-900",children:"WhatsApp Bot & Message Center"}),a.jsx("span",{className:"text-[10px] font-black uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-xs",children:"Resmi Kanomas"})]}),a.jsx("p",{className:"text-[11px] text-emerald-800 font-medium",children:"Template pesan otomatis untuk calon jamaah, jamaah aktif & mitra"})]})]}),a.jsx("button",{onClick:k,className:"w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition",children:a.jsx(S,{className:"w-4 h-4"})})]}),a.jsxs("div",{className:"p-5 overflow-y-auto space-y-4 flex-1",children:[a.jsxs("div",{className:"space-y-1.5",children:[a.jsx("label",{className:"text-xs font-bold text-slate-700 uppercase tracking-wider block",children:"1. Pilih Template Pesan Resmi"}),a.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-2",children:g.map(e=>a.jsxs("button",{onClick:()=>f(e),className:`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${r.id===e.id?"bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs":"bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"}`,children:[a.jsx("span",{className:"text-[9px] font-bold uppercase text-emerald-700 block",children:e.category}),a.jsx("span",{className:"text-xs font-bold leading-tight mt-0.5",children:e.title})]},e.id))})]}),a.jsxs("div",{className:"p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5",children:[a.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-2",children:[a.jsx("span",{className:"text-xs font-bold text-slate-700 uppercase tracking-wider block",children:"2. Target Penerima Pesan"}),a.jsxs("div",{className:"flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-500",children:[a.jsx("span",{className:"text-[10px] text-slate-500",children:"Pilih cepat:"}),j.slice(0,2).map(e=>a.jsx("button",{onClick:()=>p(e),className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-amber-50 text-amber-700 text-[10px] whitespace-nowrap",children:e.name.split(" ")[0]},e.id)),y.slice(0,2).map(e=>a.jsx("button",{onClick:()=>p(e),className:"px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-blue-50 text-blue-700 text-[10px] whitespace-nowrap",children:e.name.split(" ")[0]},e.id))]})]}),a.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",children:[a.jsxs("div",{children:[a.jsx("label",{className:"block text-slate-600 mb-1 font-medium",children:"Nama Penerima"}),a.jsx("input",{type:"text",placeholder:"Contoh: H. Bambang Sulistyo",value:d,onChange:e=>c(e.target.value),className:"w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900"})]}),a.jsxs("div",{children:[a.jsx("label",{className:"block text-slate-600 mb-1 font-medium",children:"Nomor WhatsApp (Opsional jika ingin share umum)"}),a.jsx("input",{type:"tel",placeholder:"Contoh: 081234567801",value:o,onChange:e=>m(e.target.value),className:"w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono"})]})]})]}),a.jsxs("div",{className:"space-y-1.5",children:[a.jsxs("div",{className:"flex items-center justify-between",children:[a.jsx("label",{className:"text-xs font-bold text-slate-700 uppercase tracking-wider block",children:"3. Pratinjau Teks Pesan WhatsApp Siap Kirim"}),a.jsxs("button",{onClick:u,className:"text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1 font-bold",children:[s?a.jsx(x,{className:"w-3.5 h-3.5 text-emerald-600"}):a.jsx(b,{className:"w-3.5 h-3.5"}),a.jsx("span",{children:s?"Tersalin!":"Salin Teks"})]})]}),a.jsx("div",{className:"p-4 rounded-2xl bg-slate-50 border border-slate-200 font-sans text-xs text-slate-800 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto selection:bg-emerald-500",children:n})]})]}),a.jsxs("div",{className:"p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3",children:[a.jsx("span",{className:"text-[11px] text-slate-500",children:"Terhubung langsung ke WhatsApp Web / WhatsApp App"}),a.jsxs("div",{className:"flex items-center gap-2 w-full sm:w-auto",children:[a.jsxs("button",{onClick:u,className:"flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-300 shadow-xs",children:[s?a.jsx(x,{className:"w-4 h-4 text-emerald-600"}):a.jsx(b,{className:"w-4 h-4"}),a.jsx("span",{children:s?"Tersalin":"Salin Pesan"})]}),a.jsxs("button",{onClick:P,className:"flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-95",children:[a.jsx(B,{className:"w-4 h-4"}),a.jsx("span",{children:"Kirim via WhatsApp"})]})]})]})]})})}export{K as default};
