@echo off
chcp 65001 >nul
title Oyun sunucusu - kapatmak icin bu pencereyi kapat
cd /d "%~dp0"

echo.
echo   ==========================================
echo    OYUN SUNUCUSU BASLIYOR
echo   ==========================================
echo.
echo    1. oyun: http://localhost:8123/1-yakala/
echo    2. oyun: http://localhost:8123/2-kac/
echo.
echo    Oyun tarayicida acilacak.
echo    Bitince BU PENCEREYI KAPAT.
echo.

start "" "http://localhost:8123/1-yakala/"
node ".claude\sunucu.js"

echo.
echo   Sunucu kapandi. (Port 8123 zaten kullanimdaysa
echo   oyun yine de acilmis olabilir.)
pause
