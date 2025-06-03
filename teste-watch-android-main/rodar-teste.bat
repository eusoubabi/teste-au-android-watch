@echo off
echo Iniciando Appium + conexão ADB + scrcpy...

:: Inicia Appium (precisa estar global)
start "" cmd /k appium

:: Aguarda alguns segundos pro Appium iniciar (ajuste se precisar)
timeout /t 5

:: Conecta o dispositivo via rede
adb tcpip 5037
adb connect 192.168.15.3:5037
adb devices

:: Abre o scrcpy para espelhar a tela
start "" scrcpy

:: Roda os testes com npm
npm run test:mobile

:: Pausa no final pra manter a janela aberta
pause
