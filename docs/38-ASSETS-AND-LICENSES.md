# 38 – Assets och licenser

Senast granskad: 2026-10-09.

Alla externa resurser som Datorskolan använder, var de kommer ifrån och på vilket villkor de används.
Hitta inte på rättigheter: om en resurs inte uttryckligen får spridas bundlas den inte i repot.

## Inventering

| Resurs | Var i projektet | Källa | Licens / villkor | Bundlas i repot? |
|---|---|---|---|---|
| Microsoft Fluent UI System Icons (37 SVG, stil *Regular*) | `assets/icons/fluent/` | [microsoft/fluentui-system-icons](https://github.com/microsoft/fluentui-system-icons), commit `08130c218d6bb87767d6d5616d9afcea651146c7` | MIT (`assets/icons/fluent/LICENSE`) | Ja |
| Google Chrome-logotypen | laddas från `https://www.google.com/chrome/static/images/chrome-logo-m100.svg` | Googles egen server | Varumärke tillhörande Google LLC. Används oförändrad enbart för att identifiera webbläsaren som undervisas. Ingen rätt att sprida filen – därför länkas den, den kopieras inte. | Nej |
| Cooper Hewitt (typsnitt för webbplatsen) | laddas via `@font-face` i `styles/site.css` | Cooper Hewitt, Smithsonian Design Museum; Windows-anpassade filer från `tom10271/cooper-hewitt-fixed-for-windows`, commit `24437eb6fc8bbf1fe8c518eeeaabd3012dffed4c` | SIL Open Font License 1.1 (`assets/fonts/CooperHewitt-OFL.txt`) | Licens ja, typsnittsfiler nej (se nedan) |
| Segoe UI Variable / Segoe UI (typsnitt i FakeWin) | används via `font-family` | Installerat i Windows | Microsoft-licens. Distribueras **inte** – webbläsaren använder det typsnitt som redan finns på användarens dator. Andra system faller tillbaka till `system-ui`. | Nej |
| Fönsterknapparnas symboler (minimera, maximera, stäng), pilar, sök m.m. | `src/win11-ui.js` (`glyph`, `captionGlyph`) | Egna minimala SVG-linjer | Projektets egen kod | Ja |
| Skrivbordsbakgrund | `styles/fakewin.css` | CSS-gradienter | Projektets egen kod. Windows 11:s bakgrundsbild "Bloom" är upphovsrättsskyddad och används inte. | Ja (som CSS) |

## Beslut och avvägningar

**Varför inte äkta Windows-ikoner ur systemfilerna?**
Ikoner som extraheras ur Windows (DLL- och EXE-resurser) omfattas av Microsofts programvarulicens och får inte spridas vidare. Fluent UI System Icons är Microsofts officiellt publicerade ikonfamilj för Windows 11-stilen och är MIT-licensierade – det är den närmaste lagliga motsvarigheten.

**Färgade ikoner (planerat).**
Windows 11 använder färgade ikoner för mappar och appar. Fluent UI System Icons finns även i färgvarianter (`*_color.svg`, samma MIT-licens). De har inte importerats än, eftersom nedladdning av nya filer kräver projektägarens godkännande. När de importeras: lägg dem i `assets/icons/fluent/`, uppdatera `SOURCE.md` med commit och kör `tests/windows11-realism-smoke.js`.

**Symboler som Windows ritar med typsnittet Segoe Fluent Icons.**
Fönsterknappar, chevroner och liknande ritas i Windows med systemtypsnittet Segoe Fluent Icons, som inte får spridas. Datorskolan ritar samma enkla geometriska former (1 px-linjer på 10×10- eller 16×16-rutnät) som egen SVG. Det är inte en kopia av typsnittet utan grundformer som streck, fyrkant och kryss.

**Cooper Hewitt-filer.**
OFL tillåter att filerna bundlas. De laddas i dag från en version-låst GitHub-adress. Att lägga in dem lokalt (rekommenderas av integritetsskäl, se `37-ACCESSIBILITY-AND-LEGAL.md`) kräver att filerna laddas ned, vilket projektägaren behöver godkänna.

**Google Chrome och Microsoft-namn.**
Produktnamnen (Windows, Utforskaren, Microsoft Print to PDF, Google Chrome …) används beskrivande, för att lära ut hur produkterna fungerar. Webbplatsens sidfot anger att Datorskolan är fristående och inte knuten till Microsoft eller Google.

## Checklista vid nya resurser

1. Dokumentera källa, version/commit och licens här och i en `SOURCE.md` bredvid filerna.
2. Lägg licenstexten i samma mapp om licensen kräver det (MIT, OFL).
3. Bundla aldrig något som saknar uttrycklig spridningsrätt.
4. Kör hela testsviten (`node tests/run-all.js`).
