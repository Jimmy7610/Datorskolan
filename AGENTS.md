# AGENTS.md

See CLAUDE.md – the same rules apply to every coding agent.

## Non-negotiable
- static GitHub Pages app, vanilla HTML/CSS/JS, no backend
- no real OS or filesystem access
- the DOM is not the source of truth; interactions emit domain events
- all user-visible text lives in `locales/` (sv + en, identical keys)
- `node tests/run-all.js` must pass
