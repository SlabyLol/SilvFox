@echo off
SETLOCAL
title SilvFox Full Uninstaller

echo =========================================
echo        SilvFox - Full Uninstallation
echo =========================================
echo This script will COMPLETELY remove SilvFox.
echo.
echo It will:
echo - Stop any running SilvFox server
echo - Delete ALL SilvFox files and folders
echo - Remove the stored OpenAI API key
echo =========================================
echo.

set /p confirm=Are you absolutely sure you want to remove everything? (Y/N): 
if /I not "%confirm%"=="Y" (
    echo.
    echo Uninstallation cancelled.
    pause
    exit /b
)

REM Save the current directory
SET PROJECT_DIR=%~dp0

echo.
echo Stopping any running SilvFox Node.js servers...
taskkill /IM node.exe /F >nul 2>&1

echo.
echo Removing stored OpenAI API key...
reg delete "HKCU\Environment" /F /V OPENAI_API_KEY >nul 2>&1
echo API key removed (if it existed).

echo.
echo Deleting the entire SilvFox folder...
cd ..
rmdir /s /q "%PROJECT_DIR%"
echo SilvFox directory deleted.

echo.
echo =========================================
echo SilvFox has been completely removed.
echo =========================================
pause
exit
