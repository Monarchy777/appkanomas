@echo off
set NODE_PATH=D:\Monarchy\Corner ERP\node_modules
cd /d "D:\Monarchy\Aplikasi Kanomas"

:loop
echo [%date% %time%] Memulai WhatsApp Commander Bridge...
node services\wa-commander\wa-bridge.cjs
echo [%date% %time%] WhatsApp Bridge berhenti/crash. Melakukan restart dalam 3 detik...
timeout /t 3 >nul
goto loop
