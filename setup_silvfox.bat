@echo off
SETLOCAL
echo =========================================
echo      SilvFox Setup & Starter
echo =========================================

SET PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"

REM Install Node modules if not present
IF NOT EXIST "node_modules" (
    echo Installing Node modules...
    npm install express node-fetch
) ELSE (
    echo Node modules already installed.
)

REM Prompt for OpenAI API key if not set
IF "%OPENAI_API_KEY%"=="" (
    echo Please enter your OpenAI API key:
    set /p OPENAI_API_KEY_INPUT=API-Key: 
    setx OPENAI_API_KEY "%OPENAI_API_KEY_INPUT%"
    echo API key saved. Please restart terminal if you want to start server manually later.
)

REM Start server
echo Starting SilvFox server...
start cmd /k "cd /d %PROJECT_DIR% && node server.js"

REM Open browser
timeout /t 2 >nul
start http://localhost:3000

echo =========================================
echo Setup completed! SilvFox should be running.
echo =========================================
pause
