# Datorskolan – Interaktiv Windows-utbildning från absolut nybörjare

## Projektets syfte

Datorskolan är en webbaserad, interaktiv utbildning för personer som inte kan använda en Windows-dator alls.

Projektet ska fungera för flera målgrupper:
- barn, exempelvis 6–8 år,
- vuxna nybörjare,
- äldre personer,
- personer som vill träna vissa moment,
- personer som redan kan lite och vill hoppa över sådant de behärskar.

Målet är inte att skapa en traditionell manual. Användaren ska lära sig genom att förstå, känna igen och faktiskt göra vanliga datoruppgifter i en trygg simulator.

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

## Kursens omfattning

Den publicerade kursen innehåller nu **120 lektioner** fördelade över bland annat:

- datorgrunder,
- mus och tangentbord,
- Windows,
- filer och mappar,
- program,
- internet och webbläsare,
- e-post och säkerhet,
- Vardagsdatorn,
- Enheter & anslutningar,
- När något krånglar,
- självständighetsprov.

Varje lektion ska förklara:
- vad saken är,
- hur användaren känner igen den,
- vad den används till,
- ett konkret exempel,
- vanligt användande i vardagen,
- vanliga nybörjarmisstag.

### Vardagsmoment

Utbyggnaden tränar även sådant som ofta saknas i enklare datorkurser:

- markera, kopiera och klistra text,
- ångra/gör om,
- PDF,
- filändelser,
- skärmdump,
- ZIP,
- installation/avinstallation,
- utskrift till PDF,
- molnlagring,
- USB,
- Wi‑Fi,
- Bluetooth,
- ljud, mikrofon och kamera,
- batteri och externa skärmar,
- felmeddelanden,
- omstart/uppdatering,
- hängt program,
- lagring och backup.

## Grundprincip

> Visa → Gör tillsammans → Öva → Testa → Återanvänd kunskapen senare.

En färdighet räknas inte som inlärd bara för att användaren klarat den en gång.

## Teknisk grund

- Vanilla HTML, CSS och JavaScript – inget byggsteg, ingen backend, ingen databas
- GitHub Pages
- `localStorage` för framsteg, språkval och egna val i övningsdatorn
- Helt tvåspråkig: **svenska** och **engelska** (valet sparas och gäller hela webbplatsen, övningsdatorn och kursen)

Arkitektur, språkstöd och hur man lägger till lektioner eller språk: `docs/39-I18N-AND-ARCHITECTURE-2026.md`.

## Kör lokalt

```bash
python -m http.server 8080
```

Öppna sedan `http://localhost:8080`.

## Tester

```bash
node tests/run-all.js
```

Kör syntaxkontroll av all JavaScript och alla smoke-tester: kursens 120 lektioner och 85 scenarier på båda språken, översättningarnas fullständighet, att ingen text är hårdkodad, händelsekontraktet, designsystemet (ingen text under 12 px), tillgänglighet och Windows 11-realism. Samma kommando körs i GitHub Actions före varje publicering.

## Viktiga dokument

- `docs/37-ACCESSIBILITY-AND-LEGAL.md` – WCAG 2.2 AA, vilka lagar som gäller (och inte), integritet och lagring
- `docs/38-ASSETS-AND-LICENSES.md` – alla ikoner, typsnitt och logotyper med källa och licens
- `docs/39-I18N-AND-ARCHITECTURE-2026.md` – filstruktur, språkstöd, hur man skriver lektioner
- `docs/01-PRODUCT-VISION.md` … `docs/23-NAMING-AND-TERMINOLOGY.md` – produkt, pedagogik och ursprunglig specifikation
- `docs/24`–`docs/36` – historiska specifikationer och acceptanser

## Arbetsregel

Alla större beslut ska dokumenteras innan implementationen ändras på ett sätt som påverkar projektets struktur, pedagogik eller UX. Om kod och dokumentation skiljer sig ska skillnaden antingen rättas i koden eller dokumenteras som ett medvetet beslut.

## Övningsdatorn (FakeWin)

FakeWin efterliknar Windows 11 (oktober 2026): skrivbord, aktivitetsfält, Start med sökning, snabbinställningar, kalender och aviseringar, snabbmenyer, Utforskaren, Inställningar, Kalkylator, Anteckningar, Foton, Google Chrome, E-post, PDF och utskrift, installation med UAC, Skärmklippverktyget och Papperskorgen. Medvetna avvikelser av pedagogiska eller tillgänglighetsskäl finns i `docs/37-ACCESSIBILITY-AND-LEGAL.md`, avsnitt 3.

Övningsdatorn läser eller skriver aldrig riktiga filer och startar inga riktiga program. Allt sker inne i webbsidan.

## Ikoner och typsnitt

- Systemikoner: **Microsoft Fluent UI System Icons** (MIT), lokalt i `assets/icons/fluent/`
- Chrome-logotypen: hämtas från Googles egen server och bundlas inte
- Webbplatsens typsnitt: **Cooper Hewitt** (SIL OFL 1.1)
- Övningsdatorns typsnitt: **Segoe UI Variable** när det finns installerat (Windows), annars systemets typsnitt

Detaljer och licenser: `docs/38-ASSETS-AND-LICENSES.md`.
