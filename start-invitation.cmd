@echo off
setlocal
set "RUNTIME_PNPM=C:\Users\muthu\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd"

if not exist "%RUNTIME_PNPM%" (
  echo The bundled Codex runtime was not found.
  echo Open this folder in Codex and run the project from there, or install Node.js from https://nodejs.org/.
  pause
  exit /b 1
)

echo Starting the Meera and Dinesh invitation website...
call "%RUNTIME_PNPM%" run dev
pause
