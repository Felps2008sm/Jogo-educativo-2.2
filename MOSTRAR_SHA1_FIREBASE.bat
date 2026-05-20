@echo off
chcp 65001 >nul
echo.
echo ================================================
echo   CHAVES SHA PARA CONFIGURAR LOGIN GOOGLE
echo ================================================
echo.
echo Se pedir senha, a senha padrao do debug.keystore e: android
echo.
keytool -list -v -alias androiddebugkey -keystore "%USERPROFILE%\.android\debug.keystore" -storepass android -keypass android
pause
