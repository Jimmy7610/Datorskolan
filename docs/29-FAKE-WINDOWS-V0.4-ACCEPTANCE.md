# Fake Windows v0.4 – Scenario Engine Acceptance

v0.4 är godkänd först när följande fungerar i den publicerade GitHub Pages-versionen.

## Scenario-panel

- [ ] Klicka på 🧪 i aktivitetsfältet.
- [ ] Scenario-panelen öppnas.
- [ ] Tre scenarier visas.
- [ ] Panelen kan stängas genom klick utanför eller Escape.

## Scenario 1 – Skapa mappen Semester

- [ ] Starta `Skapa mappen Semester`.
- [ ] Simulatorn återställs till definierat startläge.
- [ ] Explorer startar i Documents som definierat scenario-state.
- [ ] Skapa mappen `Semester`.
- [ ] Panelen visar `✓ Scenario klart`.
- [ ] Klicka `Återställ`.
- [ ] Mappen `Semester` försvinner.
- [ ] Samma startläge återkommer.

## Scenario 2 – Spara plan.txt

- [ ] Starta `Spara plan.txt`.
- [ ] Skriv valfri text i Notepad.
- [ ] Spara som `plan.txt`.
- [ ] Filen hamnar i Documents.
- [ ] Panelen visar `✓ Scenario klart`.
- [ ] Återställ scenariot.
- [ ] `plan.txt` är borta igen.

## Scenario 3 – Radera och återställ

- [ ] Starta `Radera och återställ`.
- [ ] `Övningsfil.txt` finns i Documents.
- [ ] Radera filen.
- [ ] Öppna Recycle Bin.
- [ ] Återställ `Övningsfil.txt`.
- [ ] Panelen visar `✓ Scenario klart`.
- [ ] Återställ scenariot.
- [ ] Filen ligger åter i Documents och Papperskorgen är tom.

## Determinism och reset

- [ ] Ett scenario kan köras minst två gånger med samma startläge.
- [ ] Reset stänger öppna fönster.
- [ ] Reset rensar clipboard.
- [ ] Reset återställer Calculator.
- [ ] Reset återställer Notepad-state.
- [ ] Reset återställer Photos-state.
- [ ] Scenario-fixtures skapas i samma ordning varje gång.

## Event observation

- [ ] Scenario Engine räknar simulator-events.
- [ ] Felaktiga handlingar markerar inte scenariot som klart.
- [ ] Rätt mål markerar scenariot som klart.
- [ ] `window.__datorskolanSimulator.loadScenario(id)` fungerar.
- [ ] `window.__datorskolanSimulator.resetScenario()` fungerar.
- [ ] `window.__datorskolanSimulator.scenarios.active()` visar aktuell status.

## Regression

- [ ] v0.1 desktop/fönster fungerar.
- [ ] v0.2 virtuella filer fungerar.
- [ ] v0.3 Calculator fungerar.
- [ ] v0.3 Notepad fungerar.
- [ ] v0.3 Photos fungerar.
- [ ] Inga console errors under normal användning.
