# Guide för AI-utvecklare

## Läs först
1. README.md
2. docs/01-PRODUCT-VISION.md
3. docs/07-TECHNICAL-ARCHITECTURE.md
4. docs/24-FULL-WINDOWS-SIMULATOR-SPEC.md
5. docs/25-FAKE-WINDOWS-V0.1-SPEC.md
6. docs/26-FAKE-WINDOWS-V0.1-IMPLEMENTATION-PLAN.md
7. docs/14-DEFINITION-OF-DONE.md

## Aktuell prioritet
Fake Windows v0.1 byggs före utbildningslagret.

## Regler
- Vanilla HTML/CSS/JS
- GitHub Pages
- ingen backend
- inga riktiga OS- eller filsystemoperationer
- DOM är inte source of truth
- simulatorstate är explicit
- domain events används
- Window Manager äger global fönsterstate
- större arkitekturförändringar dokumenteras

## För varje feature
Definiera state, user interaction, emitted event, render behavior, reset behavior, tests och accessibility.

## Stop condition
Verifiera Fake Windows v0.1 fullständigt innan v0.2 påbörjas.
