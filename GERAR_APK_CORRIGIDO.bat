@echo off
chcp 65001 >nul
echo.
echo ================================================
echo      GERANDO APK CORRIGIDO - JOGO EDUCATIVO
echo ================================================
echo.
cd /d "%~dp0"

echo [1/3] Copiando arquivos do jogo para o Android...
if not exist "www" mkdir "www"
copy /Y index.html www\index.html >nul
copy /Y jogo.html www\jogo.html >nul
copy /Y style.css www\style.css >nul
copy /Y script.js www\script.js >nul
copy /Y firebase.js www\firebase.js >nul
copy /Y native-auth.js www\native-auth.js >nul
copy /Y coruja.css www\coruja.css >nul
copy /Y coruja.js www\coruja.js >nul
copy /Y capacitor.config.json www\capacitor.config.json >nul
if exist icon.png copy /Y icon.png www\icon.png >nul

if not exist "android\app\src\main\assets\public" mkdir "android\app\src\main\assets\public"
copy /Y index.html android\app\src\main\assets\public\index.html >nul
copy /Y jogo.html android\app\src\main\assets\public\jogo.html >nul
copy /Y style.css android\app\src\main\assets\public\style.css >nul
copy /Y script.js android\app\src\main\assets\public\script.js >nul
copy /Y firebase.js android\app\src\main\assets\public\firebase.js >nul
copy /Y native-auth.js android\app\src\main\assets\public\native-auth.js >nul
copy /Y coruja.css android\app\src\main\assets\public\coruja.css >nul
copy /Y coruja.js android\app\src\main\assets\public\coruja.js >nul
copy /Y capacitor.config.json android\app\src\main\assets\public\capacitor.config.json >nul
if exist icon.png copy /Y icon.png android\app\src\main\assets\public\icon.png >nul

echo [2/3] Limpando compilacoes antigas...
cd android
call gradlew.bat clean --no-configuration-cache

echo [3/3] Compilando APK debug...
call gradlew.bat assembleDebug --no-configuration-cache

if exist "app\build\outputs\apk\debug\app-debug.apk" (
  echo.
  echo ================================================
  echo APK GERADO COM SUCESSO!
  echo Caminho:
  echo %CD%\app\build\outputs\apk\debug\app-debug.apk
  echo ================================================
  explorer "%CD%\app\build\outputs\apk\debug"
) else (
  echo.
  echo ERRO: APK nao foi encontrado.
  echo Veja as mensagens acima.
)

pause
