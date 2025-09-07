@echo off
title Configuración Inicial - Synapse App

echo Configurando entorno de desarrollo...

REM Verificar instalaciones
echo Verificando instalaciones...
python --version
node --version
mysql --version

REM Configurar backend
echo.
echo Configurando Backend...
cd ..\backend

REM Crear entorno virtual si no existe
if not exist venv (
    echo Creando entorno virtual...
    python -m venv venv
)

REM Activar entorno virtual e instalar dependencias
call venv\Scripts\activate.bat
pip install -r requirements.txt

REM Copiar archivo de configuración
if not exist .env (
    copy .env.example .env
    echo Configurar archivo .env con tus credenciales
)

call venv\Scripts\deactivate.bat

REM Configurar frontend
echo.
echo Configurando Frontend...
cd ..\frontend

REM Instalar dependencias de Node
npm install

REM Copiar archivo de configuración
if not exist .env.local (
    copy .env.example .env.local
)

REM Configurar base de datos
echo.
echo Configurando Base de Datos...
cd ..\database
call setup-database.bat

cd ..\scripts
echo.
echo Configuración completada!
echo.
echo Próximos pasos:
echo 1. Configurar archivo backend\.env con tus credenciales
echo 2. Configurar archivo frontend\.env.local si es necesario
echo 3. Ejecutar dev-start.bat para iniciar el entorno
pause