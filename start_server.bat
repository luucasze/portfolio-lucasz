@echo off
SETLOCAL
title Servidor Local - Portfolio Lucas

echo ==========================================
echo    INICIANDO SERVIDOR LOCAL (LOCALHOST)
echo ==========================================
echo.

:: Tenta usar Node.js / serve (recomendado)
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Node.js detectado. Usando 'npx serve'...
    echo [INFO] O site estara disponivel em: http://localhost:3000 (ou porta similar)
    echo.
    npx serve .
    if %errorlevel% neq 0 (
        echo [AVISO] Falha ao iniciar com npx serve. Tentando alternativa...
    ) else (
        goto :end
    )
)

:: Tenta usar Python como fallback
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Python detectado. Usando 'http.server'...
    echo [INFO] O site estara disponivel em: http://localhost:8000
    echo.
    python -m http.server 8000
    goto :end
)

echo [ERRO] Nao foi possivel encontrar Node.js ou Python no seu sistema.
echo Para rodar o site localmente, instale o Node.js (https://nodejs.org).
echo.
pause

:end
ENDLOCAL
