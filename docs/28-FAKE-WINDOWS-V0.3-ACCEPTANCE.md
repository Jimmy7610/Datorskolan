# Fake Windows v0.3 – Core Apps Acceptance

v0.3 är godkänd först när följande fungerar i den publicerade GitHub Pages-versionen.

## Calculator

- [x] Öppna Calculator från Start eller taskbar.
- [x] Skriv `12 + 7 =`.
- [x] Resultatet blir `19`.
- [x] Testa subtraktion.
- [x] Testa multiplikation.
- [x] Testa division.
- [x] Decimal fungerar.
- [x] `C` återställer kalkylatorn.
- [x] Backspace fungerar.
- [x] Division med noll ger `Error`.
- [x] Eventet `calculator.result` skrivs i konsolen.

## Notepad

- [x] Öppna Notepad från Start.
- [x] Skriv text.
- [x] Status visar att dokumentet är osparat.
- [x] Klicka `Spara`.
- [x] För ett nytt dokument visas `Spara som`.
- [x] Spara som `test.txt`.
- [x] Filen skapas virtuellt i Documents.
- [x] Öppna `test.txt` från Explorer.
- [x] Rätt text visas i Notepad.
- [x] Ändra text och klicka `Spara`.
- [x] Stäng och öppna filen igen.
- [x] Den ändrade texten finns kvar.
- [x] `Ny` skapar ett tomt osparat dokument.
- [x] `Spara som` skapar en ny separat fil.
- [x] Eventet `notepad.saved` skrivs i konsolen.

## Photos

- [x] Öppna Pictures.
- [x] Det finns minst två simulerade bildfiler.
- [x] Dubbelklicka en bild.
- [x] Photos öppnas med rätt filnamn.
- [x] Högerpil visar nästa bild.
- [x] Vänsterpil visar föregående bild.
- [x] `+` zoomar in.
- [x] `−` zoomar ut.
- [x] Zoom hålls inom rimliga gränser.
- [x] Events `photos.changed` och `photos.zoom` skrivs i konsolen.

## File Explorer

- [x] `+ Ny textfil` finns.
- [x] Ny textfil kan namnges.
- [x] Den nya textfilen kan dubbelklickas.
- [x] Den öppnas i Notepad.
- [x] v0.2-operationerna fungerar fortfarande: skapa mapp, rename, copy, cut, paste, delete, restore.

## Regression

- [x] Desktop dubbelklick fungerar fortfarande.
- [x] Window drag fungerar fortfarande.
- [x] Minimize/maximize/restore fungerar fortfarande.
- [x] Start-menyn fungerar fortfarande.
- [x] Inga console errors under normal användning.
- [x] GitHub Pages-deployens JavaScript syntax-check är grön.


## Resultat

Manuellt verifierad i den publicerade GitHub Pages-versionen av användaren.

Status: **GODKÄND**
