@echo off
chcp 65001 >nul
title Oyun sunucusu - kapatmak icin bu pencereyi kapat
cd /d "%~dp0"

echo.
echo   ==========================================
echo    OYUN SUNUCUSU BASLIYOR
echo   ==========================================
echo.
echo   BILGISAYARDA OYNA (tarayicida acilacak):
echo    1. oyun: http://localhost:8123/1-yakala/
echo    2. oyun: http://localhost:8123/2-kac/
echo    3. oyun: http://localhost:8123/3-zipla/
echo.
echo   ==========================================
echo    TELEFONDA OYNA (telefon ayni Wi-Fi'de olmali):
echo    Telefonun tarayicisina sunu yaz:
echo.
echo        http://192.168.1.143:8123/3-zipla/
echo.
echo    (Ilk acilista Windows "izin ver" sorarsa IZIN VER.)
echo    (Adres calismazsa: yeni pencerede ipconfig yazip
echo     IPv4 adresini kullan; 192.168.1.143 degismis olabilir.)
echo   ==========================================
echo.
echo    Bitince BU PENCEREYI KAPAT.
echo.

start "" "http://localhost:8123/3-zipla/"
node ".claude\sunucu.js"

echo.
echo   Sunucu kapandi.
pause
