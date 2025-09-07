@echo off
title Deteniendo Desarrollo - Synapse App

echo  Deteniendo entorno de desarrollo...

REM Matar procesos de Node.js (React)
taskkill /F /IM node.exe >nul 2>&1

REM Matar procesos de Python (Flask)
taskkill /F /IM python.exe >nul 2>&1

REM Verificar que los puertos estén libres
echo 🔍 Verificando puertos...
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo  Puerto 3000 aún ocupado
) else (
    echo  Puerto 3000 liberado
)

netstat -ano | findstr :5000 >nul
if %errorlevel% equ 0 (
    echo  Puerto 5000 aún ocupado  
) else (
    echo  Puerto 5000 liberado
)

echo.
echo  Entorno detenido!
pause