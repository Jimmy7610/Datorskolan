# Windows-simulator

## Syfte

GitHub Pages kan inte styra användarens riktiga Windows-miljö.

Därför bygger projektet en säker simulerad Windows-miljö i webbläsaren.

## Simulatorn ska kunna innehålla

- skrivbord,
- aktivitetsfält,
- Start-meny,
- fönster,
- mappar,
- filer,
- Utforskaren,
- Kalkylator,
- Anteckningar,
- Paint-liknande övningar,
- webbläsare,
- e-postsimulator,
- dialogrutor,
- kontextmenyer.

## Viktig princip

Simulatorn ska efterlikna Windows tillräckligt för att lära ut koncept, men får inte låsas så hårt till en specifik Windows-version att projektet blir dyrt att underhålla.

## Exempel på simulerade händelser

- desktop.icon.click
- desktop.icon.doubleClick
- start.open
- app.launch
- window.minimize
- window.maximize
- window.close
- file.drag
- file.drop
- contextMenu.open
- browser.tab.open
- browser.navigate

## Säkerhet

Simulatorn ska aldrig:
- skriva till användarens riktiga filsystem,
- installera program,
- ändra Windows-inställningar,
- kräva administratörsrättigheter.

## Framtid

En senare version kan kompletteras med en riktig Windows-app för praktiska live-övningar, men det ingår inte i MVP.

## Fördjupad specifikation

Se `24-FULL-WINDOWS-SIMULATOR-SPEC.md` för fullständig funktionsspecifikation, virtuellt filsystem, appar, state, reset och acceptanskriterier.
