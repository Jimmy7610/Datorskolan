# MVP-scope

## Första MVP:n
Första MVP:n är **Fake Windows v0.1 – The Desktop**.

Den ska bevisa att vi kan bygga en stabil, interaktiv och säker Windows-liknande miljö i webbläsaren utan att påverka användarens riktiga dator.

## Ska innehålla
- desktop
- minst tre desktopikoner
- taskbar
- Start-knapp
- Start-meny
- placeholder-appar
- Window Manager
- focus/z-index
- flyttbara fönster
- minimera/maximera/återställ/stäng
- högerklick och context menu
- flyttbara desktopikoner
- event-bus

## Ska INTE innehålla ännu
- virtuellt filsystem
- filoperationer
- full Utforskare
- Notepad-save
- komplett Kalkylator
- webbläsarsimulator
- e-post
- lektionsmotor
- progression
- backend
- användarkonton

## Säkerhetskrav
Simulatorn får aldrig läsa eller skriva riktiga filer, starta riktiga Windows-program, ändra Windows-inställningar eller använda riktiga OS-operationer.

## Exit criteria
v0.1 är klar först när hela manual acceptance-listan i `25-FAKE-WINDOWS-V0.1-SPEC.md` fungerar utan console errors.
