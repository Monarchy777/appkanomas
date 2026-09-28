# Resilient Background Launcher for WhatsApp Commander Bridge & Dev Server
$ErrorActionPreference = 'SilentlyContinue'

$KanomasDir = "D:\Monarchy\Aplikasi Kanomas"
Set-Location $KanomasDir

$env:NODE_PATH = "D:\Monarchy\Corner ERP\node_modules"

# Bersihkan proses lama pada port 3899 jika ada
Get-NetTCPConnection -LocalPort 3899 -ErrorAction SilentlyContinue | ForEach-Object {
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
}

# Jalankan daemon supervisor di background Windows secara independen (Hidden Window)
Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c services\wa-commander\start-daemon.bat" `
    -WorkingDirectory $KanomasDir `
    -WindowStyle Hidden

Write-Host "[RESILIENT-DAEMON] WhatsApp Commander Bridge & Dev Server aktif di background independen!"
