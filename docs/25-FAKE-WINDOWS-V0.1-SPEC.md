# Fake Windows v0.1 – The Desktop

## Syfte
Bygg projektets första fungerande produktlager: en Windows-liknande desktop i webbläsaren. Det får inte vara en statisk mockup.

## Initial vy
Desktop:
- Documents
- Pictures
- Recycle Bin

Taskbar:
- Start
- Explorer
- Calculator
- simulerad klocka

## Desktopikoner
Enkelklick markerar och emitterar `desktop.item.selected`.
Dubbelklick öppnar associerad fake-app och emitterar `desktop.item.doubleClicked`.
Högerklick öppnar context menu och emitterar `contextMenu.opened`.
Drag flyttar ikonen i runtime-state och emitterar `desktop.item.moved`.

## Start-menyn
- öppna/stäng
- klick utanför stänger
- Escape stänger
- Explorer, Calculator, Notepad
- app launch/focus

Events:
`startMenu.opened`, `startMenu.closed`, `app.opened`, `app.focused`.

## Window Manager
Äger allt globalt fönsterstate.

```js
{
  id: "window-calculator-1",
  appId: "calculator",
  title: "Calculator",
  x: 320,
  y: 140,
  width: 360,
  height: 480,
  mode: "normal",
  zIndex: 4,
  active: true
}
```

Modes: `normal`, `minimized`, `maximized`.

Ska stödja open, focus, drag, minimize, maximize, restore, close, z-index och viewport bounds.

Events:
`window.focused`, `window.moved`, `window.minimized`, `window.maximized`, `window.restored`, `window.closed`.

## Taskbar
- pinned Explorer och Calculator
- öppna appar
- active state
- återställ minimerade fönster

## Placeholder-appar
- Explorer
- Calculator
- Notepad

Full appfunktion kommer senare.

## Context menu
Desktop background:
- View
- Sort by
- Refresh
- New

Desktop item:
- Open
- Rename
- Delete
- Properties

Menyn öppnas vid pekaren, hålls inom viewport och stängs med outside-click eller Escape.

## Event Bus
```js
eventBus.on(type, handler);
eventBus.off(type, handler);
eventBus.emit(type, payload);
```

Events i v0.1:
```text
desktop.item.selected
desktop.item.doubleClicked
desktop.item.moved
contextMenu.opened
contextMenu.closed
startMenu.opened
startMenu.closed
app.opened
app.focused
window.focused
window.moved
window.minimized
window.maximized
window.restored
window.closed
```

Varje event skickas exakt en gång per avslutad användarhandling.

## State
DOM får inte vara source of truth.

```js
{
  desktop: { selectedItemId: null, items: [] },
  taskbar: { startMenuOpen: false },
  windows: [],
  activeWindowId: null,
  contextMenu: null
}
```

## Input
- vänsterklick
- dubbelklick
- högerklick
- pointer drag
- Escape

Browserns context menu blockeras endast inom simulatorområdet.

## Tillgänglighetsbas
- riktiga buttons där det passar
- synlig focus
- aria-label på window controls
- keyboard-aktiverbar Start
- text fungerar vid browser zoom

## Out of scope
- Virtual File System
- riktiga create/rename/delete-operationer
- recycle-bin-logik
- Notepad-save
- browser simulator
- e-post
- lesson engine
- progress tracking
- accounts
- backend

## Manual acceptance test
1. öppna sidan
2. desktop renderas utan console errors
3. klicka Documents → markerad
4. klicka Pictures → Documents avmarkeras
5. dubbelklicka Documents → Explorer öppnas
6. dra Explorer-fönstret
7. minimera Explorer
8. återställ Explorer från taskbar
9. maximera Explorer
10. återställ till normal
11. öppna Start
12. starta Calculator
13. Calculator blir aktivt ovanpå Explorer
14. klicka Explorer → Explorer kommer överst
15. högerklicka desktop → context menu
16. klick utanför → menu stängs
17. flytta en desktopikon
18. stäng Calculator
19. stäng Explorer
20. desktop är tillbaka i stabilt state

## Stop condition
Påbörja inte v0.2 innan alla 20 steg är verifierade.
