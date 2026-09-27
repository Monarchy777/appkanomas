$ErrorActionPreference = 'Stop'

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Memulai Proses Deploy Aplikasi Kanomas" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Jalankan build Vite produksi
Write-Host "[1/4] Menjalankan npm run build..." -ForegroundColor Yellow
npm run build

if (-not (Test-Path "dist\index.html")) {
    Write-Error "Build gagal! Folder dist/index.html tidak ditemukan."
    exit 1
}

# 2. Persiapkan folder temporary untuk cabang produksi 'main'
$temp = Join-Path $env:TEMP "deploy-main-kanomas"
if (Test-Path $temp) {
    Remove-Item -Recurse -Force $temp
}

Write-Host "[2/4] Mengambil repository remote (branch main)..." -ForegroundColor Yellow
git clone --branch main https://github.com/Monarchy777/appkanomas.git $temp

Write-Host "[3/4] Menyalin file produksi terkompilasi..." -ForegroundColor Yellow
Get-ChildItem -Path $temp -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
Copy-Item -Path "dist\*" -Destination $temp -Recurse -Force
if (Test-Path "dist\.htaccess") {
    Copy-Item -Path "dist\.htaccess" -Destination $temp -Force
}

# Tambahkan README panduan
$readmeContent = @"
# Aplikasi Kanomas - Production Build

> **Cabang Produksi Hostinger (Production Branch)**  
> Cabang `main` ini berisi kode terkompilasi (production build) siap tayang yang otomatis disajikan oleh web server Hostinger (LiteSpeed / Apache) pada domain [appkanomas.mediasosial.net](https://appkanomas.mediasosial.net/).

---

## 🛠️ Pengembangan & Source Code
Untuk pengembangan aplikasi, penambahan fitur, dan source code React + Vite lengkap, silakan beralih ke branch:
👉 **[`dev`](https://github.com/Monarchy777/appkanomas/tree/dev)**
"@
Set-Content -Path (Join-Path $temp "README.md") -Value $readmeContent -Encoding UTF8

# 4. Commit dan push ke origin/main dan origin/hostinger
Write-Host "[4/4] Memperbarui GitHub (branch main & hostinger)..." -ForegroundColor Yellow
Push-Location $temp
try {
    git config user.name "Kanomas Dev"
    git config user.email "dev@kanomas.com"
    git add -A
    $status = git status --porcelain
    if ($status) {
        git commit -m "deploy(production): compiled production build for Hostinger live server"
        git push origin main
        git push origin main:refs/heads/hostinger --force
        Write-Host ">> Berhasil push ke branch 'main' dan 'hostinger' di GitHub!" -ForegroundColor Green
    } else {
        Write-Host ">> Tidak ada perubahan file di folder dist, branch main sudah up-to-date." -ForegroundColor Cyan
    }
} finally {
    Pop-Location
    Remove-Item -Recurse -Force $temp
}

Write-Host "=========================================" -ForegroundColor Green
Write-Host " DEPLOY KE GITHUB SELESAI!" -ForegroundColor Green
Write-Host " Langkah Terakhir: Buka Hostinger hPanel -> Git" -ForegroundColor White
Write-Host " lalu klik tombol 'Deploy' (Tarik yang terbaru)." -ForegroundColor White
Write-Host "=========================================" -ForegroundColor Green
