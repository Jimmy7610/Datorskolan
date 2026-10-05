# Fake Windows v0.2 – Acceptance

v0.2 är godkänd först när följande fungerar i den publicerade GitHub Pages-versionen.

## Utforskaren

- [x] Öppna Documents från skrivbordet.
- [x] Utforskaren visar innehållet i Documents.
- [x] Gå till Home via vänsterpanelen.
- [x] Öppna Documents igen.
- [x] Dubbelklicka en textfil.
- [x] Textfilen öppnas i Notepad.

## Mappar

- [x] Klicka på `+ Ny mapp`.
- [x] Namnge mappen `Semester`.
- [x] Dubbelklicka `Semester`.
- [x] Gå tillbaka med bakåtknappen.
- [x] Byt namn på `Semester` till `Semester 2027`.

## Clipboard

- [x] Markera en fil.
- [x] Klicka `Kopiera`.
- [x] Öppna en annan mapp.
- [x] Klicka `Klistra in`.
- [x] En kopia finns i målmappen.
- [x] Markera en fil.
- [x] Klicka `Klipp ut`.
- [x] Öppna en annan mapp.
- [x] Klicka `Klistra in`.
- [x] Filen har flyttats.

## Papperskorgen

- [x] Markera en fil eller mapp.
- [x] Klicka `Ta bort`.
- [x] Objektet försvinner från ursprungsmappen.
- [x] Öppna Recycle Bin.
- [x] Objektet finns där.
- [x] Klicka `Återställ`.
- [x] Objektet återgår till sin ursprungliga mapp.
- [x] Ta bort ett objekt igen.
- [x] Klicka `Töm Papperskorgen`.
- [x] Papperskorgen blir tom.

## Säkerhet

- [x] Inga riktiga filer skapas.
- [x] Inga riktiga filer ändras.
- [x] Ingen browser-download används för simulerade filer.
- [x] Ingen File System Access API används.

## Events

Kontrollera i DevTools att relevanta events skrivs en gång per handling:

- `folder.created`
- `file.renamed`
- `file.copied`
- `file.moved`
- `file.deleted`
- `recycleBin.restored`
- `recycleBin.emptied`


## Resultat

Manuellt verifierad i den publicerade GitHub Pages-versionen av användaren.

Status: **GODKÄND**
