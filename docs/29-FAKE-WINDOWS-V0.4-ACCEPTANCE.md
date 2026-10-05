# Fake Windows v0.4 – Scenario Engine Acceptance

v0.4 är godkänd först när följande fungerar i den publicerade GitHub Pages-versionen.

## Scenario-panel

- [x] Klicka på 🧪 i aktivitetsfältet.
- [x] Scenario-panelen öppnas.
- [x] Tre scenarier visas.
- [x] Panelen kan stängas genom klick utanför eller Escape.

## Scenario 1 – Skapa mappen Semester

- [x] Starta `Skapa mappen Semester`.
- [x] Simulatorn återställs till definierat startläge.
- [x] Explorer startar i Documents som definierat scenario-state.
- [x] Skapa mappen `Semester`.
- [x] Panelen visar `✓ Scenario klart`.
- [x] Klicka `Återställ`.
- [x] Mappen `Semester` försvinner.
- [x] Samma startläge återkommer.

## Scenario 2 – Spara plan.txt

- [x] Starta `Spara plan.txt`.
- [x] Skriv valfri text i Notepad.
- [x] Spara som `plan.txt`.
- [x] Filen hamnar i Documents.
- [x] Panelen visar `✓ Scenario klart`.
- [x] Återställ scenariot.
- [x] `plan.txt` är borta igen.

## Scenario 3 – Radera och återställ

- [x] Starta `Radera och återställ`.
- [x] `Övningsfil.txt` finns i Documents.
- [x] Radera filen.
- [x] Öppna Recycle Bin.
- [x] Återställ `Övningsfil.txt`.
- [x] Panelen visar `✓ Scenario klart`.
- [x] Återställ scenariot.
- [x] Filen ligger åter i Documents och Papperskorgen är tom.

## Determinism och reset

- [x] Ett scenario kan köras minst två gånger med samma startläge.
- [x] Reset stänger öppna fönster.
- [x] Reset rensar clipboard.
- [x] Reset återställer Calculator.
- [x] Reset återställer Notepad-state.
- [x] Reset återställer Photos-state.
- [x] Scenario-fixtures skapas i samma ordning varje gång.

## Event observation

- [x] Scenario Engine räknar simulator-events.
- [x] Felaktiga handlingar markerar inte scenariot som klart.
- [x] Rätt mål markerar scenariot som klart.
- [x] `window.__datorskolanSimulator.loadScenario(id)` fungerar.
- [x] `window.__datorskolanSimulator.resetScenario()` fungerar.
- [x] `window.__datorskolanSimulator.scenarios.active()` visar aktuell status.

## Regression

- [x] v0.1 desktop/fönster fungerar.
- [x] v0.2 virtuella filer fungerar.
- [x] v0.3 Calculator fungerar.
- [x] v0.3 Notepad fungerar.
- [x] v0.3 Photos fungerar.
- [x] Inga console errors under normal användning.


## Resultat

Manuellt verifierad i den publicerade GitHub Pages-versionen av användaren.

Status: **GODKÄND**
