@echo off
REM Quick start script for Agent Orchestrator (Windows)

echo ================================
echo Agent Orchestrator - Quick Start
echo ================================
echo.

REM Check Node.js
echo Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js not found
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION%

REM Check npm
echo Checking npm...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] npm not found
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION%

REM Check Python
echo Checking Python...
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Python not found
    echo Please install Python 3.9+ from https://python.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo [OK] %PYTHON_VERSION%

REM Check Ollama (optional)
echo Checking Ollama (optional)...
where ollama >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Ollama installed
) else (
    echo [!] Ollama not installed (optional for local LLMs)
    echo     Install from: https://ollama.ai
)

echo.

REM Check if dependencies are installed
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm run install:all
    echo.
)

REM Ask user how to run
echo How would you like to run Agent Orchestrator?
echo 1^) Desktop Application (Electron)
echo 2^) Web Browser
echo 3^) Backend only
echo.
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Starting Desktop Application...
    npm run electron:dev
) else if "%choice%"=="2" (
    echo.
    echo Starting Web Application...
    echo Backend will start on http://localhost:8000
    echo Frontend will start on http://localhost:3000
    echo.
    npm run dev
) else if "%choice%"=="3" (
    echo.
    echo Starting Backend only...
    echo API will be available at http://localhost:8000
    npm run dev:backend
) else (
    echo Invalid choice. Exiting.
    pause
    exit /b 1
)
