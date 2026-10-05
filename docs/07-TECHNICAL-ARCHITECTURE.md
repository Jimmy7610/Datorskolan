# Teknisk arkitektur

## Mål

- enkelt,
- statiskt,
- versionshanterat,
- GitHub Pages-kompatibelt,
- lätt för både människa och AI-agent att förstå.

## Teknik

- HTML5
- CSS3
- ES Modules
- Vanilla JavaScript
- JSON för innehåll när lämpligt
- localStorage

## Föreslagen struktur

```text
/
├── index.html
├── README.md
├── CLAUDE.md
├── AGENTS.md
├── docs/
├── src/
│   ├── app.js
│   ├── router.js
│   ├── state/
│   │   ├── store.js
│   │   ├── progress-store.js
│   │   └── settings-store.js
│   ├── lessons/
│   │   ├── lesson-engine.js
│   │   ├── lesson-loader.js
│   │   └── validators.js
│   ├── simulator/
│   │   ├── desktop.js
│   │   ├── taskbar.js
│   │   ├── start-menu.js
│   │   ├── window-manager.js
│   │   └── apps/
│   ├── input/
│   │   ├── mouse-tracker.js
│   │   └── keyboard-tracker.js
│   ├── ui/
│   │   ├── modal.js
│   │   ├── feedback.js
│   │   ├── hint.js
│   │   └── progress.js
│   └── utils/
├── content/
│   ├── modules/
│   ├── lessons/
│   └── skills/
├── styles/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── simulator.css
│   └── accessibility.css
├── assets/
│   ├── icons/
│   ├── images/
│   └── audio/
└── tests/
```

## Arkitekturprinciper

### Lesson Engine
Sköter:
- vilket steg som visas,
- vad användaren förväntas göra,
- validering,
- hjälp,
- resultat.

### Simulator
Sköter:
- låtsas-Windows,
- fönster,
- filer,
- appar,
- händelser.

### Progress Store
Sköter:
- färdigheter,
- försök,
- hjälp,
- mastery,
- återupptagning.

### Content
Lektionsinnehåll ska så långt möjligt ligga separerat från motorn.

## Ingen framework-låsning

React/Vue/Svelte ska inte införas i MVP utan ett dokumenterat beslut.
