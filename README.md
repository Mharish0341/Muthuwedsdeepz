# Meera & Dinesh invitation

On Windows, double-click `start-invitation.cmd` to launch the site without a global Node/npm installation.

Alternatively, run the site from this folder with the bundled runtime:

```powershell
& "C:\Users\muthu\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" run dev
```

Then open the local URL printed by Vite (normally `http://localhost:5173`). Do not open `index.html` directly from File Explorer; Vite is required to load the React module.
