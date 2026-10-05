# Datorskolan – Interaktiv Windows-utbildning från absolut nybörjare

## Projektets syfte

Datorskolan är en webbaserad, interaktiv utbildning för personer som inte kan använda en Windows-dator alls.

Projektet ska fungera för flera målgrupper:
- barn, exempelvis 6–8 år,
- vuxna nybörjare,
- äldre personer,
- personer som vill träna vissa moment,
- personer som redan kan lite och vill hoppa över sådant de behärskar.

Målet är inte att skapa en traditionell manual. Användaren ska lära sig genom att faktiskt göra uppgifter.

Exempel:
- flytta muspekaren,
- klicka,
- dubbelklicka,
- dra och släppa,
- skriva text,
- öppna Start-menyn,
- starta program,
- arbeta med mappar och filer,
- använda webbläsare,
- använda e-post,
- förstå säkerhet.

## Grundprincip

> Visa → Gör tillsammans → Öva → Testa → Återanvänd kunskapen senare.

En färdighet räknas inte som inlärd bara för att användaren klarat den en gång.

## Teknisk grund

Första versionen byggs som:
- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- GitHub Pages
- Ingen backend
- Ingen databas
- localStorage för lokal progression

## Viktiga dokument

- `docs/01-PRODUCT-VISION.md`
- `docs/02-TARGET-USERS.md`
- `docs/03-LEARNING-MODEL.md`
- `docs/04-CURRICULUM.md`
- `docs/05-UX-UI-SPEC.md`
- `docs/06-WINDOWS-SIMULATOR.md`
- `docs/07-TECHNICAL-ARCHITECTURE.md`
- `docs/08-DATA-MODEL.md`
- `docs/09-LESSON-SCHEMA.md`
- `docs/10-PROGRESS-AND-ADAPTATION.md`
- `docs/11-ACCESSIBILITY.md`
- `docs/12-TESTING-STRATEGY.md`
- `docs/13-ROADMAP.md`
- `docs/14-DEFINITION-OF-DONE.md`
- `docs/15-SECURITY-PRIVACY.md`
- `docs/16-CONTENT-GUIDE.md`
- `docs/17-GITHUB-WORKFLOW.md`
- `docs/18-AI-DEVELOPMENT-GUIDE.md`
- `docs/19-MVP-SCOPE.md`
- `docs/20-BACKLOG.md`
- `docs/24-FULL-WINDOWS-SIMULATOR-SPEC.md`

## Arbetsregel

Alla större beslut ska dokumenteras innan implementationen ändras på ett sätt som påverkar projektets struktur, pedagogik eller UX.

Kod ska följa dokumentationen. Om kod och dokumentation skiljer sig ska skillnaden antingen:
1. rättas i koden, eller
2. dokumenteras som ett medvetet designbeslut.

## Aktuell utvecklingsordning
Första utvecklingsmålet är **Fake Windows v0.1 – The Desktop**.

Utbildningsmotorn byggs ovanpå simulatorn först när desktop, taskbar, Start-menyn och Window Manager är verifierade.

Se:
- `docs/25-FAKE-WINDOWS-V0.1-SPEC.md`
- `docs/26-FAKE-WINDOWS-V0.1-IMPLEMENTATION-PLAN.md`

## Kör Fake Windows lokalt

Projektet använder ES modules och bör köras via en lokal webbserver.

```bash
python -m http.server 8080
```

Öppna sedan `http://localhost:8080`.

Fake Windows läser eller skriver inte riktiga Windows-filer och startar inga riktiga program. All simulatorinteraktion sker inne i webbsidan.
