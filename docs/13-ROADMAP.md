# Roadmap

## Fas 0 – Projektgrund
- repo-struktur
- dokumentation
- GitHub Pages
- kodstandard
- app shell
- state store
- design tokens
- testgrund

## Fas 1 – Fake Windows Engine ✅

### v0.1 – The Desktop ✅
- skrivbord
- skrivbordsikoner
- aktivitetsfält
- Start-knapp och Start-meny
- Window Manager
- markera och dubbelklicka
- högerklick och kontextmenyer
- flytta skrivbordsikoner
- flytta, minimera, maximera, återställa och stänga fönster
- event-bus

### v0.2 – Virtual File System ✅
- simulerade filer och mappar
- skapa, byta namn, kopiera, klippa ut, klistra in, flytta och radera
- Papperskorgen
- återställning

### v0.3 – Core Apps ✅
- Utforskaren
- Anteckningar
- Kalkylator
- Bilder

### v0.4 – Scenario Engine ✅
- scenariofiler
- definierade startlägen
- reset
- deterministic state
- scenario-events

## Fas 2 – Lesson Engine ✅
- instruktioner
- demonstrationer
- övningar
- validators
- hjälpstege
- feedback
- mastery

## Fas 3 – Mus ✅
Musutbildningen använder Fake Windows som träningsmiljö.

## Fas 4 – Tangentbord ✅
## Fas 5 – Windows-grunder ✅
## Fas 6 – Filer och mappar ✅
## Fas 7 – Internet och webbläsare ✅
## Fas 8 – E-post ✅
## Fas 9 – Adaptiv progression ✅
## Fas 10 – Barnläge ✅
## Fas 11 – Fullständig kurs och självständighetsprov ✅

## Fas 12 – Vardagsdatorn och djupare förståelse 🧪
- kursen utökad från 81 till 120 lektioner
- Vardagsdatorn
- Enheter & anslutningar
- När något krånglar
- Everyday Lab
- Vanligt i vardagen i varje lektion
- Vanliga misstag i varje lektion
- praktiska moment för PDF, ZIP, skärmdump, USB, Wi‑Fi, Bluetooth, utskrift, moln och felsökning

## Viktig ordningsregel
Vi går inte vidare från Fake Windows v0.1 till v0.2 förrän alla acceptanskriterier i `25-FAKE-WINDOWS-V0.1-SPEC.md` är verifierade.


## Statussymboler

- ✅ = manuellt verifierad och godkänd
- 🧪 = implementerad och automatiskt testad, väntar på full manuell acceptans


## Release readiness

Den ursprungliga kursen med 81 lektioner är manuellt genomförd och godkänd.

Kursen har därefter byggts ut till 120 lektioner med Fas 12 – Vardagsdatorn och djupare förståelse.

Status: **Fas 12 implementerad, väntar på manuell acceptans**


## Fas 13 – Windows 11 realism 🧪
- centralt Windows 11-likt SVG-ikonsystem
- centrerat aktivitetsfält och Start-meny
- systemfält med nätverk, ljud, batteri, klocka och snabbinställningar
- riktig pin/unpin-state för Start och aktivitetsfält
- Google Chrome som riktig FakeWin-app
- Windows-lik Inställningar-app
- riktig fönstersnappning
- Windows-lik Utforskaren med filsnabbmenyer
- ZIP-extrahering i Utforskaren
- USB-enhet med säker utmatning
- OneDrive-lik molnplats
- PDF-visare och Skriv ut till PDF
- installationsguide och avinstallation via Inställningar
- Skärmklippverktyg
- riktiga Ctrl+Z / Ctrl+Y och osparad-dialog i Anteckningar
- riktig textkopiering Chrome → Anteckningar
- realistiska felmeddelanden och program som inte svarar
- pedagogiska specialknappar för dessa vardagsmoment borttagna

Status: **IMPLEMENTERAD – väntar på manuell acceptans**

Se `docs/35-WINDOWS11-REALISM-ACCEPTANCE.md`.
