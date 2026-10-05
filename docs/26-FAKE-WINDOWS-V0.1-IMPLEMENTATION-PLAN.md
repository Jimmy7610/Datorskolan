# Fake Windows v0.1 – Implementation Plan

## Steg 1 – App shell
index.html, simulator root, CSS tokens, desktop, taskbar shell.

## Steg 2 – Event Bus
on/off/emit utan eventdubletter.

## Steg 3 – State Store
Explicit simulatorstate och state-driven render.

## Steg 4 – Desktop
Documents, Pictures, Recycle Bin, selection/deselection.

## Steg 5 – Window Manager
open, focus, close, z-index.

## Steg 6 – Window controls
drag, minimize, maximize, restore, viewport bounds.

## Steg 7 – Taskbar
pinned apps, running apps, active state, restore minimized.

## Steg 8 – Start Menu
toggle, app list, outside click, Escape, app launch.

## Steg 9 – Desktop app opening
double-click shortcuts och focus-existing-app.

## Steg 10 – Context Menu
desktop/item menus och viewport positioning.

## Steg 11 – Desktop icon drag
pointer drag och x/y i runtime-state.

## Steg 12 – Accessibility och polish
focus, labels, cursor behavior, zoom och bounds.

## Steg 13 – Acceptance
Kör hela 20-stegslistan i `25-FAKE-WINDOWS-V0.1-SPEC.md`.

## Rekommenderade commits
1. `chore: scaffold fake windows app shell`
2. `feat: add simulator event bus and state store`
3. `feat: render interactive desktop items`
4. `feat: add window manager`
5. `feat: add window controls and dragging`
6. `feat: add taskbar running app state`
7. `feat: add start menu and app launching`
8. `feat: add desktop context menus`
9. `feat: add draggable desktop icons`
10. `test: verify fake windows v0.1 acceptance flow`
11. `docs: finalize fake windows v0.1`

## Stoppregel
Påbörja inte Virtual File System innan v0.1 har verifierats.
