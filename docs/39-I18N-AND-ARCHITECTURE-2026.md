# 39 – Språkstöd (i18n) och arkitektur, oktober 2026

Det här dokumentet beskriver hur Datorskolan är uppbyggd efter omarbetningen i oktober 2026. Det ersätter beskrivningarna av filstrukturen i äldre dokument (07, 24–26).

## Översikt

```
index.html                  Webbplatsens markup. All text via data-i18n.
styles/site.css             Designsystem för webbplatsen (Cooper Hewitt, tokens).
styles/fakewin.css          Designsystem för övningsdatorn (Windows 11 / Fluent, Segoe UI Variable).

src/i18n.js                 Språkkärnan: register, t(), plural(), setLocale(), translateDom().
locales/sv/ui.js            Webbplatsens texter + appnamn + mappnamn (sv).
locales/sv/fakewin.js       Övningsdatorns och coachpanelens texter (sv).
locales/sv/course.js        Kursinnehåll: moduler, 120 lektioner, 85 scenarier (sv).
locales/en/…                Samma tre filer på engelska.

src/course/lessons.js       Lektionernas STRUKTUR (id, modul, färdigheter, steg, validering, visualTarget). Ingen text.
src/course/scenarios.js     Scenariernas STRUKTUR (startläge, filer, mål). Ingen text.
src/course.js               Slår ihop struktur + texter för valt språk.

src/vfs.js                  Virtuellt filsystem (ingen riktig fil rörs).
src/scenario-engine.js      Laddar scenarier och kontrollerar mål mot händelser.
src/lesson-engine.js        Lektionsflöde, ledtrådar, feedback (som språknycklar).
src/progress-store.js       Framsteg i localStorage, inklusive pågående lektion och steg.

src/win11-ui.js             Ikoner, glyfer, DOM-hjälparen h(), fästa appar.
src/app.js                  Övningsdatorns kärna: state, händelser, fönsterhanterare, skrivbord,
                            aktivitetsfält, Start, snabbinställningar, kalender, menyer, dialoger.
src/explorer-app.js         Utforskaren.
src/basic-apps.js           Kalkylator, Anteckningar (+ dialogerna Spara som/Öppna), Foton.
src/chrome-app.js           Google Chrome (simulerad övningswebb).
src/settings-app.js         Inställningar (+ Wi‑Fi-listan som även används i snabbinställningarna).
src/advanced-apps.js        E-post och tangentbordsövningen.
src/pdf-app.js              PDF-läsare och utskriftsdialogen.
src/installer-app.js        UAC-frågan och installationsguiden.
src/snipping-app.js         Skärmklippverktyget.
src/trouble-app.js          Rapportvisaren (felmeddelande / programmet svarar inte).
src/mouse-lab.js            Musövningen.
src/everyday-apps.js        Vardagsövning (var hamnar filen?).
src/learning-panel.js       Datorskolans coachpanel (kurs, lektion, fri övning).
src/product-shell.js        Webbplatsen runt övningsdatorn: flikar, språkval, dialoger, start av simulatorn.
```

## Principer

1. **State är sanningen.** `app.js` håller allt tillstånd i `state`. DOM byggs om från state.
2. **Domänhändelser.** Allt eleven gör skickas som `emit("typ", payload)`. Scenariernas mål och lektionernas validering lyssnar bara på händelser – aldrig på DOM. Händelsekontraktet kontrolleras av `tests/event-contract-smoke.js`.
3. **Ingen text i koden.** All synlig text, alla aria-etiketter och alla verktygstips kommer från `locales/`. `tests/hardcoded-text-smoke.js` stoppar svensk text och hårdkodade etiketter i `src/`.
4. **Struktur och text är separata.** En lektions logik finns i `src/course/lessons.js`. Dess text finns i `locales/<språk>/course.js` under samma id.
5. **Windowsnamn från samma nyckel.** Namn som appen skapar och som scenarierna väntar på (till exempel `guide.txt`, `HemmaNet`, `faktura-kopia.pdf`) hämtas från samma översättningsnyckel. `tests/realism-scenarios-smoke.js` kör scenarierna på båda språken och fångar om de glider isär.

## Språkval

- Standardspråk: svenska (`DEFAULT_LOCALE` i `src/i18n.js`).
- Valet sparas i `localStorage` (`datorskolan.locale.v1`) och sätter `<html lang>`.
- På startsidan byts språket direkt utan omladdning (`translateDom`).
- Övningsdatorn byggs när den öppnas första gången. Byter man språk inne i coachpanelen laddas sidan om och öppnas direkt i övningsdatorn (via en flagga i `sessionStorage`), eftersom VFS-filer och scenarier skapas med namn på det valda språket.

## Fortsätta en lektion efter omladdning

`ProgressStore` sparar vilken lektion som pågår (`activeLessonId`) och vilket steg eleven är på. När övningsdatorn startar anropar `app.js` `LessonEngine.resume()`. Den laddar lektionens scenario från början och fortsätter på samma steg, med meddelandet `learn.feedback.resumed`. Det fungerar eftersom varje lektion har högst en övning, och övningen alltid utgår från scenariots startläge. Avslutar eleven lektionen, eller blir den klar, glöms den pågående lektionen. Samma mekanism gör att lektionen fortsätter efter ett språkbyte.

## Lägga till ett språk

1. Kopiera `locales/en/` till `locales/<kod>/` och översätt alla tre filer. Behåll nycklarna och platshållarna (`{name}`).
2. Lägg till språket i `SUPPORTED` i `src/i18n.js` (kod, `htmlLang`, `intl`, eget namn).
3. Lägg till skript-taggarna i `index.html` och språket i `LOCALES` i `tests/helpers/load.js`.
4. Lägg till en knapp i `.language-switch` i `index.html`.
5. Kör `node tests/run-all.js`. `i18n-completeness-smoke` visar exakt vilka nycklar, lektioner eller scenariofält som saknas.

## Skriva en ny lektion

1. Lägg till strukturen i `src/course/lessons.js` (och vid behov ett scenario i `src/course/scenarios.js`).
2. Lägg till texten under samma id i **varje** `locales/<språk>/course.js`: `title`, `summary`, en post per steg (`title`, `text`, och exakt fem `hints` för övningssteg) samt `detail` (`what`, `recognize`, `use`, `example`, gärna `steps`, `everyday`, `mistakes`).
3. Ledtrådarna trappas upp: 1 var, 2 vilken kontroll, 3 hur, 4 "den gula ramen visar …" (`visualTarget` markeras från nivå 4), 5 hela vägen.
4. Använd stabila `data-ui`-väljare i `visualTarget` (till exempel `[data-ui='explorer-new']`), aldrig översatta texter eller `aria-label`.

## Tester

`node tests/run-all.js` kör syntaxkontroll av alla JS-filer och alla `tests/*-smoke.js`. CI (`.github/workflows/pages.yml`) kör samma kommando före publicering.
