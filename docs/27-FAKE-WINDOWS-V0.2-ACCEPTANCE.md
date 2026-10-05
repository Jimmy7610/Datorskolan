# Fake Windows v0.2 – Acceptance

v0.2 är godkänd först när följande fungerar i den publicerade GitHub Pages-versionen.

## Utforskaren

- [ ] Öppna Documents från skrivbordet.
- [ ] Utforskaren visar innehållet i Documents.
- [ ] Gå till Home via vänsterpanelen.
- [ ] Öppna Documents igen.
- [ ] Dubbelklicka en textfil.
- [ ] Textfilen öppnas i Notepad.

## Mappar

- [ ] Klicka på `+ Ny mapp`.
- [ ] Namnge mappen `Semester`.
- [ ] Dubbelklicka `Semester`.
- [ ] Gå tillbaka med bakåtknappen.
- [ ] Byt namn på `Semester` till `Semester 2027`.

## Clipboard

- [ ] Markera en fil.
- [ ] Klicka `Kopiera`.
- [ ] Öppna en annan mapp.
- [ ] Klicka `Klistra in`.
- [ ] En kopia finns i målmappen.
- [ ] Markera en fil.
- [ ] Klicka `Klipp ut`.
- [ ] Öppna en annan mapp.
- [ ] Klicka `Klistra in`.
- [ ] Filen har flyttats.

## Papperskorgen

- [ ] Markera en fil eller mapp.
- [ ] Klicka `Ta bort`.
- [ ] Objektet försvinner från ursprungsmappen.
- [ ] Öppna Recycle Bin.
- [ ] Objektet finns där.
- [ ] Klicka `Återställ`.
- [ ] Objektet återgår till sin ursprungliga mapp.
- [ ] Ta bort ett objekt igen.
- [ ] Klicka `Töm Papperskorgen`.
- [ ] Papperskorgen blir tom.

## Säkerhet

- [ ] Inga riktiga filer skapas.
- [ ] Inga riktiga filer ändras.
- [ ] Ingen browser-download används för simulerade filer.
- [ ] Ingen File System Access API används.

## Events

Kontrollera i DevTools att relevanta events skrivs en gång per handling:

- `folder.created`
- `file.renamed`
- `file.copied`
- `file.moved`
- `file.deleted`
- `recycleBin.restored`
- `recycleBin.emptied`
