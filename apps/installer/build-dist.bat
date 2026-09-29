@echo off
setlocal

title SuperBatch - Build Distribution

REM ============================================================
REM PATHS
REM ============================================================

set "ROOT=%~dp0.."
set "DIST=%~dp0dist"

set "BACKEND=%ROOT%\backend"
set "FRONTEND=%ROOT%\frontend"
set "DESKTOP=%ROOT%\desktop"

echo.
echo ==========================================
echo       SuperBatch Distribution Build
echo ==========================================
echo.


REM ============================================================
REM CLEAN DIST
REM ============================================================

echo [1/5] Cleaning dist...

if exist "%DIST%\backend" rmdir /s /q "%DIST%\backend"
if exist "%DIST%\frontend" rmdir /s /q "%DIST%\frontend"
if exist "%DIST%\desktop" rmdir /s /q "%DIST%\desktop"

mkdir "%DIST%\backend"
mkdir "%DIST%\frontend"
mkdir "%DIST%\desktop"

echo Done.
echo.


REM ============================================================
REM BACKEND
REM ============================================================

echo [2/5] Building Backend...

cd /d "%BACKEND%"

call mvnw.cmd clean package -DskipTests


if errorlevel 1 (
    echo.
    echo ERROR: Backend build failed.
    pause
    exit /b 1
)

echo Backend build successful.
echo.


REM ============================================================
REM COPY BACKEND
REM ============================================================

echo Copying Backend...

set "JAR="

for /f "delims=" %%F in ('
    dir /b /a-d "%BACKEND%\target\*.jar" 2^>nul ^| findstr /v /i "\.original\.jar$"
') do (
    if not defined JAR set "JAR=%%F"
)

if not defined JAR (
    echo ERROR: Backend JAR not found.
    pause
    exit /b 1
)

copy /y "%BACKEND%\target\%JAR%" "%DIST%\backend\superbatch-backend.jar" >nul

if errorlevel 1 (
    echo ERROR: Failed to copy Backend JAR.
    pause
    exit /b 1
)

if not exist "%BACKEND%\src\main\resources\application.properties" (
    echo ERROR: application.properties not found.
    pause
    exit /b 1
)

copy /y "%BACKEND%\src\main\resources\application.properties" ^
    "%DIST%\backend\application.properties" >nul

echo Backend copied.
echo.


REM ============================================================
REM FRONTEND
REM ============================================================

echo [3/5] Building Frontend...

cd /d "%FRONTEND%"

call npm run build

if errorlevel 1 (
    echo.
    echo ERROR: Frontend build failed.
    pause
    exit /b 1
)

if not exist ".next\standalone" (
    echo ERROR: .next\standalone not found.
    pause
    exit /b 1
)

REM Standalone
robocopy ".next\standalone" "%DIST%\frontend" /E >nul

if errorlevel 8 (
    echo ERROR: Failed to copy standalone.
    pause
    exit /b 1
)

REM Static
robocopy ".next\static" "%DIST%\frontend\.next\static" /E >nul

if errorlevel 8 (
    echo ERROR: Failed to copy static files.
    pause
    exit /b 1
)

REM Public
if exist "public" (
    robocopy "public" "%DIST%\frontend\public" /E >nul

    if errorlevel 8 (
        echo ERROR: Failed to copy public folder.
        pause
        exit /b 1
    )
)

echo Frontend copied.
echo.


REM ============================================================
REM DESKTOP / ELECTRON
REM ============================================================

echo [4/5] Building Desktop...

cd /d "%DESKTOP%"

call npm run dist

if errorlevel 1 (
    echo.
    echo ERROR: Desktop build failed.
    pause
    exit /b 1
)

if not exist "release\win-unpacked" (
    echo ERROR: release\win-unpacked not found.
    pause
    exit /b 1
)

robocopy "release\win-unpacked" "%DIST%\desktop" /E >nul

if errorlevel 8 (
    echo ERROR: Failed to copy Desktop.
    pause
    exit /b 1
)

echo Desktop copied.
echo.


REM ============================================================
REM DONE
REM ============================================================

echo [5/5] Build completed.
echo.

echo ==========================================
echo       BUILD SUCCESSFUL
echo ==========================================
echo.

echo Backend:
echo   %DIST%\backend

echo.
echo Frontend:
echo   %DIST%\frontend

echo.
echo Desktop:
echo   %DIST%\desktop

echo.
echo Distribution ready:
echo   %DIST%

echo.
pause
exit /b 0