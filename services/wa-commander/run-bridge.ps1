# WhatsApp Commander Bridge Runner for Aplikasi Kanomas
$ErrorActionPreference = 'Continue'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

$env:NODE_PATH = "D:\Monarchy\Corner ERP\node_modules"

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host " MEMULAI WHATSAPP COMMANDER BRIDGE - APLIKASI KANOMAS" -ForegroundColor Cyan
Write-Host " Target Nomor: +6282112114222" -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Cyan

node wa-bridge.cjs
