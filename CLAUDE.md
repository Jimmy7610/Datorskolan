# CLAUDE.md

## What this project is
Datorskolan – an interactive Windows course for absolute beginners (Swedish and English).
The practice computer, FakeWin, is a faithful Windows 11 simulation that runs entirely in the browser.

## Required reading
- docs/39-I18N-AND-ARCHITECTURE-2026.md – file layout, i18n, how to write lessons
- docs/37-ACCESSIBILITY-AND-LEGAL.md – WCAG 2.2 AA target, legal status, privacy, Windows deviations
- docs/38-ASSETS-AND-LICENSES.md – icon/font/logo sources and licences
- docs/41-TEACHING-MODEL.md – audience × help level × explanation level, text variants, hint ladder, adaptive help
- docs/14-DEFINITION-OF-DONE.md

## Rules
- Vanilla HTML/CSS/JS, GitHub Pages compatible, no backend, no real OS or file operations.
- State in `src/app.js` is the source of truth; every interaction emits a domain event; lessons and scenarios only observe events.
- No user-visible text in `src/`: every string, aria-label and tooltip goes in `locales/sv` and `locales/en` (same keys).
- Two stylesheets only: `styles/site.css` (website, Cooper Hewitt) and `styles/fakewin.css` (Windows 11, Segoe UI Variable). Use tokens, avoid `!important`, never text below 12px.
- Lesson highlight targets use stable `[data-ui='…']` selectors, never translated text.
- Never bundle assets without a redistribution licence; document every asset in docs/38.
- Run `node tests/run-all.js` before every commit.
