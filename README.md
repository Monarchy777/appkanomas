# Aplikasi Kanomas - Production Build

> **Cabang Produksi Hostinger (Production Branch)**  
> Cabang `main` ini berisi kode terkompilasi (production build) siap tayang yang otomatis disajikan oleh web server Hostinger (LiteSpeed / Apache) pada domain [appkanomas.mediasosial.net](https://appkanomas.mediasosial.net/).

---

## 🛠️ Pengembangan & Source Code
Untuk pengembangan aplikasi, penambahan fitur, dan source code React + Vite lengkap, silakan beralih ke branch:
👉 **[`dev`](https://github.com/Monarchy777/appkanomas/tree/dev)**

### Perintah Pengembangan Lokal:
```bash
git checkout dev
npm install
npm run dev
```

### Deploy Pembaruan ke Hostinger:
Jalankan perintah build dan push ke `main`:
```bash
npm run build
powershell -ExecutionPolicy Bypass -File ./deploy_hostinger.ps1
```
Lalu di Hostinger hPanel -> **Git**, klik tombol **Deploy**.
