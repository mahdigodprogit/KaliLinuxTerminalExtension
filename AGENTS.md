# Repository Guidelines

This repository contains a Chrome Extension (Manifest V3) that overrides the New Tab page with a Linux‑style terminal dashboard. Use this guide to work efficiently and consistently.

## Project Structure & Module Organization
- `manifest.json` — Extension metadata, permissions, icons, and New Tab override.
- `newtab.html`, `newtab.css`, `newtab.js` — UI and behavior for the dashboard.
- `icon16.png`, `icon48.png`, `icon128.png` — Extension icons.
- `dist/` — Place packaged release archives here (create as needed; keep out of Git).

## Build, Test, and Development Commands
- Load Unpacked: open `chrome://extensions` → enable Developer mode → Load unpacked → select repo root.
- Package (PowerShell, Windows):
  `New-Item -ItemType Directory -Force dist; Compress-Archive -Path manifest.json,newtab.html,newtab.css,newtab.js,icon16.png,icon48.png,icon128.png -DestinationPath dist/KaliLinuxTerminalExtension.zip -Force`
- Package (macOS/Linux):
  `mkdir -p dist && zip -r dist/KaliLinuxTerminalExtension.zip . -x ".git/*" "dist/*"`

## Coding Style & Naming Conventions
- JavaScript: 2‑space indent, single quotes, camelCase functions/vars, PascalCase classes. Prefer small, pure helpers in `newtab.js`.
- HTML: semantic tags; ids in kebab‑case; classes in BEM‑like form `block__elem--mod`.
- CSS: 2‑space indent, group related rules, prefer CSS variables; keep styles in `newtab.css`.
- Manifest: stay on MV3; keep keys stable and permissions minimal.

## Testing Guidelines
- Manual QA via Load Unpacked. Verify:
  - New Tab renders without console errors.
  - Bookmarks/Top Sites panels populate; interactions are responsive.
  - Theme/toggles persist correctly via `chrome.storage`.
- No unit tests currently; keep changes small and easy to validate.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`. Example: `feat(newtab): add quick‑launch tiles`.
- Write clear, present‑tense messages; reference issues (`#123`) when applicable.
- PRs should include: summary, testing steps, linked issues, and screenshots/GIFs for UI changes.

## Security & Configuration Tips
- Request only necessary permissions; avoid `unsafe-eval` and remote code execution.
- Follow MV3 CSP (no inline JS); keep third‑party content out of `newtab.html`.
- Store only required data in `chrome.storage` and namespace keys to avoid collisions.

