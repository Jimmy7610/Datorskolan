# 38 – Assets och licenser

Senast granskad: 2026-10-10.

Alla externa resurser som Datorskolan använder, var de kommer ifrån och på vilket villkor de används.
Hitta inte på rättigheter: om en resurs inte uttryckligen får spridas bundlas den inte i repot.

## Inventering

| Resurs | Var i projektet | Källa | Licens / villkor | Bundlas i repot? |
|---|---|---|---|---|
| Microsoft Fluent UI System Icons (37 SVG, stil *Regular*) | `assets/icons/fluent/` | [microsoft/fluentui-system-icons](https://github.com/microsoft/fluentui-system-icons), commit `08130c218d6bb87767d6d5616d9afcea651146c7` | MIT (`assets/icons/fluent/LICENSE`) | Ja |
| Microsoft Fluent UI System Icons, stil *Color* (20 motiv × 2 storlekar = 40 SVG) | `assets/icons/fluent-color/` | npm-paketet `@fluentui/svg-icons` 1.1.344 (publicerat av Microsoft från microsoft/fluentui-system-icons) | MIT (`assets/icons/fluent-color/LICENSE`). Filerna är **oförändrade**, se `SOURCE.md`. | Ja |
| Härledda färgikoner (15 motiv × 2 = 30 SVG): Start-knappen, spelkontroll (Inställningar > Spel), mapp, zip-mapp, papperskorg, Anteckningar, Kalkylator, PDF, Hämtade filer, USB, Skärmklipp, Skrivbord, Bilder, Bluetooth, Hjälpmedel | `assets/icons/fluent-derived/` | Microsofts officiella *Filled*-former ur samma paket, med fyllnaden utbytt mot en färggradient | MIT tillåter ändring; upphovsrättsraden behålls (`assets/icons/fluent-derived/LICENSE`). Varje fil är märkt *Derived … recolored by Datorskolan* och listas i `SOURCE.md`. | Ja |
| Google Chrome-logotypen | laddas från `https://www.google.com/chrome/static/images/chrome-logo-m100.svg` | Googles egen server | Varumärke tillhörande Google LLC. Används oförändrad enbart för att identifiera webbläsaren som undervisas. Ingen rätt att sprida filen – därför länkas den, den kopieras inte. | Nej |
| Cooper Hewitt (typsnitt för webbplatsen, 4 vikter, WOFF) | `assets/fonts/`, laddas via `@font-face` i `styles/site.css` | Museets officiella webbfontpaket `CooperHewitt-WebFonts-public.zip` från cooperhewitt.org, oförändrade filer (SHA-256 i `assets/fonts/SOURCE.md`) | SIL Open Font License 1.1 med reserverat namn "Cooper Hewitt" (`assets/fonts/CooperHewitt-OFL.txt`, FontLog och OFL-FAQ medföljer) | Ja |
| Segoe UI Variable / Segoe UI (typsnitt i FakeWin) | används via `font-family` | Installerat i Windows | Microsoft-licens. Distribueras **inte** – webbläsaren använder det typsnitt som redan finns på användarens dator. Andra system faller tillbaka till `system-ui`. | Nej |
| Fönsterknapparnas symboler (minimera, maximera, stäng), pilar, sök m.m. | `src/win11-ui.js` (`glyph`, `captionGlyph`) | Egna minimala SVG-linjer | Projektets egen kod | Ja |
| Skrivbordsbakgrund | `styles/fakewin.css` | CSS-gradienter | Projektets egen kod. Windows 11:s bakgrundsbild "Bloom" är upphovsrättsskyddad och används inte. | Ja (som CSS) |

## Beslut och avvägningar

**Varför inte äkta Windows-ikoner ur systemfilerna?**
Ikoner som extraheras ur Windows (DLL- och EXE-resurser) omfattas av Microsofts programvarulicens och får inte spridas vidare. Fluent UI System Icons är Microsofts officiellt publicerade ikonfamilj för Windows 11-stilen och är MIT-licensierade – det är den närmaste lagliga motsvarigheten.

**Färgade ikoner.**
Windows 11 använder färgade ikoner för mappar, appar och Inställningar. `src/win11-ui.js` väljer i den här ordningen:
1. Microsofts egen färgikon (`fluent-color/`) när det motivet finns i stilen *Color*, t.ex. Inställningar, E-post, Foton, OneDrive, Den här datorn, installationsprogram och appar.
2. Annars Microsofts *Filled*-form, omfärgad (`fluent-derived/`). Microsoft publicerar inga färgversioner av t.ex. mapp, papperskorg, Anteckningar och Kalkylator under fri licens. Ikonerna som syns i riktiga Windows ligger i systemfilerna och får inte spridas. Formen är därför Microsofts, färgen är vår och står närmare Windows 11 än en svartvit ikon.
3. Annars den svartvita *Regular*-ikonen (`fluent/`). Det gäller systemfältet (Wi‑Fi, volym, batteri) och kommandoikoner (klipp ut, ta bort, spara …), som är enfärgade även i riktiga Windows 11.

`tests/windows11-realism-smoke.js` kontrollerar att varje färgikon finns i båda storlekarna och att varje mapp har `SOURCE.md` och `LICENSE`.

**Start-knappen och Windows-logotypen.**
Windows-logotypen är ett varumärke, och vi har ingen licens för att återge den. Start-knappen visar därför Microsofts MIT-licensierade Fluent-ikon *Grid*: fyra rundade rutor, omfärgade i Windows-blått (`fluent-derived/start-*.svg`). Den liknar Windows-symbolen men är inte logotypen. Det är en medveten avvikelse: logotypens exakta form och färg återges inte. Lektionerna beskriver knappen som "Windows-symbolen med fyra rutor". Det stämmer både med riktiga Windows 11 och med ikonen i övningsdatorn.

**Google Chrome-logotypen.**
Googles riktlinjer för varumärken hänvisar till ett godkännandeförfarande för användning av logotyperna. Datorskolan har inget sådant godkännande. Filen bundlas därför inte, utan visas direkt från Googles egen adress, oförändrad och bara för att identifiera webbläsaren som lektionerna handlar om. Det ger ett anrop till Google (se `37-ACCESSIBILITY-AND-LEGAL.md`). Vill man helt undvika varumärkesfrågan och anropet: be Google om tillstånd, eller byt till en neutral webbläsarikon (Fluent *Globe*, finns redan i `fluent-color/`). Det beslutet ligger hos projektägaren.

**Symboler som Windows ritar med typsnittet Segoe Fluent Icons.**
Fönsterknappar, chevroner och liknande ritas i Windows med systemtypsnittet Segoe Fluent Icons, som inte får spridas. Datorskolan ritar samma enkla geometriska former (1 px-linjer på 10×10- eller 16×16-rutnät) som egen SVG. Det är inte en kopia av typsnittet utan grundformer som streck, fyrkant och kryss.

**Cooper Hewitt-filer.**
OFL reserverar namnet "Cooper Hewitt": en ändrad version får inte heta så (OFL §3, OFL-FAQ 2.2–2.6). De Windows-anpassade TTF-filerna från `tom10271/cooper-hewitt-fixed-for-windows` är ändrade men behåller namnet. De används därför inte längre. I stället serveras museets egna, oförändrade WOFF-filer från samma webbplats. Inga anrop görs till externa typsnittstjänster. `tests/design-system-smoke.js` kontrollerar filernas SHA-256 och att inga externa typsnitts-URL:er finns.

**Google Chrome och Microsoft-namn.**
Produktnamnen (Windows, Utforskaren, Microsoft Print to PDF, Google Chrome …) används beskrivande, för att lära ut hur produkterna fungerar. Webbplatsens sidfot anger att Datorskolan är fristående och inte knuten till Microsoft eller Google.

## Checklista vid nya resurser

1. Dokumentera källa, version/commit och licens här och i en `SOURCE.md` bredvid filerna.
2. Lägg licenstexten i samma mapp om licensen kräver det (MIT, OFL).
3. Bundla aldrig något som saknar uttrycklig spridningsrätt.
4. Kör hela testsviten (`node tests/run-all.js`).
