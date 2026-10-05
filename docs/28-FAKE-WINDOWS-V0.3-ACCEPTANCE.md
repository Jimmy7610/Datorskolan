# Fake Windows v0.3 – Core Apps Acceptance

v0.3 är godkänd först när följande fungerar i den publicerade GitHub Pages-versionen.

## Calculator

- [ ] Öppna Calculator från Start eller taskbar.
- [ ] Skriv `12 + 7 =`.
- [ ] Resultatet blir `19`.
- [ ] Testa subtraktion.
- [ ] Testa multiplikation.
- [ ] Testa division.
- [ ] Decimal fungerar.
- [ ] `C` återställer kalkylatorn.
- [ ] Backspace fungerar.
- [ ] Division med noll ger `Error`.
- [ ] Eventet `calculator.result` skrivs i konsolen.

## Notepad

- [ ] Öppna Notepad från Start.
- [ ] Skriv text.
- [ ] Status visar att dokumentet är osparat.
- [ ] Klicka `Spara`.
- [ ] För ett nytt dokument visas `Spara som`.
- [ ] Spara som `test.txt`.
- [ ] Filen skapas virtuellt i Documents.
- [ ] Öppna `test.txt` från Explorer.
- [ ] Rätt text visas i Notepad.
- [ ] Ändra text och klicka `Spara`.
- [ ] Stäng och öppna filen igen.
- [ ] Den ändrade texten finns kvar.
- [ ] `Ny` skapar ett tomt osparat dokument.
- [ ] `Spara som` skapar en ny separat fil.
- [ ] Eventet `notepad.saved` skrivs i konsolen.

## Photos

- [ ] Öppna Pictures.
- [ ] Det finns minst två simulerade bildfiler.
- [ ] Dubbelklicka en bild.
- [ ] Photos öppnas med rätt filnamn.
- [ ] Högerpil visar nästa bild.
- [ ] Vänsterpil visar föregående bild.
- [ ] `+` zoomar in.
- [ ] `−` zoomar ut.
- [ ] Zoom hålls inom rimliga gränser.
- [ ] Events `photos.changed` och `photos.zoom` skrivs i konsolen.

## File Explorer

- [ ] `+ Ny textfil` finns.
- [ ] Ny textfil kan namnges.
- [ ] Den nya textfilen kan dubbelklickas.
- [ ] Den öppnas i Notepad.
- [ ] v0.2-operationerna fungerar fortfarande: skapa mapp, rename, copy, cut, paste, delete, restore.

## Regression

- [ ] Desktop dubbelklick fungerar fortfarande.
- [ ] Window drag fungerar fortfarande.
- [ ] Minimize/maximize/restore fungerar fortfarande.
- [ ] Start-menyn fungerar fortfarande.
- [ ] Inga console errors under normal användning.
- [ ] GitHub Pages-deployens JavaScript syntax-check är grön.
