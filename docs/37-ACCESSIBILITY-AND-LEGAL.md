# 37 – Tillgänglighet, lagkrav och integritet

Senast granskad: 2026-10-09. Det här är en saklig genomgång, inte juridisk rådgivning. Ändras verksamheten (till exempel betalning, inloggning eller försäljning till offentlig sektor) ska bedömningen göras om.

## 1. Vilka regler gäller?

Datorskolan är i dag en **gratis, statisk webbplats** (GitHub Pages) utan konto, utan betalning, utan backend och utan insamling av personuppgifter. Den drivs inte av en offentlig aktör.

| Regelverk | Vad det är | Gäller Datorskolan? | Bedömning |
|---|---|---|---|
| **WCAG 2.2** (W3C) | Internationell standard för webbtillgänglighet | Standard, inte lag i sig | **Frivilligt mål: nivå AA.** Används som kvalitetskrav i projektet. |
| **EN 301 549** | Europeisk standard för IKT-tillgänglighet; dess webbdel bygger på WCAG | Standard | Uppfylls i praktiken genom WCAG 2.2 AA för webbdelen. |
| **Lag (2018:1937) om tillgänglighet till digital offentlig service (DOS-lagen)** | Krav på offentliga aktörers webbplatser och appar | **Nej**, Datorskolan är inte en offentlig aktör | Blir aktuell om en kommun, region eller myndighet driver eller beställer tjänsten. Då krävs även en tillgänglighetsredogörelse. |
| **Lag (2023:254) om vissa produkters och tjänsters tillgänglighet** (genomför EU:s tillgänglighetsdirektiv, EAA, i kraft 28 juni 2025) | Krav på vissa konsumentprodukter och -tjänster | **Sannolikt nej** | Lagen omfattar bland annat e-handelstjänster, banktjänster, e-böcker, elektronisk kommunikation, åtkomst till audiovisuella medier och vissa persontransporttjänster. En gratis utbildningssida utan köp omfattas inte av den listan. Om Datorskolan börjar sälja kurser online kan den bli en e-handelstjänst. Mikroföretag som tillhandahåller tjänster är undantagna. |
| **Diskrimineringslagen (2008:567)** – bristande tillgänglighet | Generellt förbud mot diskriminering | Gäller verksamheter inom lagens områden, till exempel utbildning | Ett skäl till att hålla en hög nivå, men ställer inga tekniska detaljkrav på en fri webbplats. |
| **GDPR** | Behandling av personuppgifter | Begränsat | Datorskolan behandlar inga personuppgifter på egen server. Värdtjänsten (GitHub Pages) och de externa resurserna (se avsnitt 3) ser besökarens IP-adress. |
| **Lag (2022:482) om elektronisk kommunikation, 9 kap. 28 §** ("cookielagen") | Lagring av information i användarens enhet kräver samtycke, utom när den behövs för en tjänst som användaren uttryckligen har begärt | Ja, regeln gäller även `localStorage` | Datorskolan lagrar bara det som behövs för funktioner användaren själv använder (framsteg, språkval, egna val i övningsdatorn). Det faller under undantaget för lagring som behövs för tjänsten. Ingen statistik, reklam eller spårning används, så ingen samtyckesruta behövs. Informationen redovisas ändå öppet i dialogen **Integritet och lagring** på startsidan. |

Källor: [Lag (2023:254), EU Accessibility Centre](https://accessible-eu-centre.ec.europa.eu/content-corner/digital-library/act-2023254-availability-certain-products-and-services-lag-2023254-om-vissa-produkters-och-tjansters_en), [Regeringens pressmeddelande om lagen](https://regeringen.se/pressmeddelanden/2022/12/ny-lag-ska-oka-tillgangligheten-till-produkter-och-tjanster/), [Riksdagens betänkande om tillgänglighetsdirektivet](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/_ha01sou10/), [DOS-lagen, EU Accessibility Centre](https://accessible-eu-centre.ec.europa.eu/content-corner/digital-library/act-20181937-accessibility-digital-public-services-lag-20181937-om-tillganglighet-till-digital_en), [PTS beslut om cookies (Tele2)](https://www.pts.se/globalassets/startpage/dokument/legala-dokument/beslut/2023/internet/underrattelse-beslutad-tele2.pdf).

**Sammanfattning:** Vi påstår inte att Datorskolan är lagbunden att uppfylla WCAG. Vi uppfyller WCAG 2.2 AA **frivilligt**, eftersom målgruppen (nybörjare och äldre) behöver det.

## 2. WCAG 2.2 AA – hur vi uppfyller det

| Kriterium | Lösning | Verifiering |
|---|---|---|
| 1.1.1 Icke-textuellt innehåll | Ikoner är dekorativa (`alt=""`, `aria-hidden`), knappar har text eller `aria-label`. Förhandsbilden på startsidan är `aria-hidden`. | `accessibility-smoke`, `windows11-realism-smoke` |
| 1.3.1 Information och relationer | Riktiga rubriker, listor, `dl`, `fieldset`/`legend`, etiketter kopplade med `for`/`aria-describedby`. | Kodgranskning, `accessibility-smoke` |
| 1.4.3 Kontrast (minimum) | Webbplatsens färger: text 17,8:1, sekundär text 7,6:1, blå accent 5,2:1. FakeWin: sekundärtext #5c5c5c (6,7:1 mot vitt). Windows "tertiärgrå" används inte för text. | Automatisk kontrastkontroll av all synlig text (genomförd 2026-10-09, inga avvikelser) |
| 1.4.4 / 1.4.10 Ändra textstorlek, omflöde | Inga fasta höjder på textinnehåll. Startsidan går över till två rader respektive en kolumn vid smalare fönster. Coachpanelen läggs ovanpå vid ≤ 1100 px. | Mätning 375–1920 px, sv och en |
| 1.4.11 Kontrast för icke-text | Fokusring 3 px (webbplats) och 2+1 px (FakeWin), växlar och inmatningsfält med tydliga kanter. | Visuell granskning |
| 1.4.12 Textavstånd | Radavstånd 1,55 på webbplatsen och i coachpanelen. Ingen text klipps vid ökat avstånd. | Kodgranskning |
| 2.1.1 Tangentbord | Allt går att använda med tangentbord: flikar (piltangenter/Home/End), menyer (pilar, Esc), dialoger (Tab-fälla, Esc), Utforskaren (pilar, Retur, F2, Delete, Ctrl+C/X/V). | `accessibility-smoke`, `windows11-realism-smoke`, manuellt |
| 2.4.1 Hoppa över block | Skip-länk som byter mål när övningsdatorn är öppen. | `accessibility-smoke` |
| 2.4.3 Fokusordning / 2.4.7 Synligt fokus | Logisk DOM-ordning, `:focus-visible` på allt interaktivt. Fokus återgår till knappen som öppnade en dialog, meny eller utfällbar panel (Start, Snabbinställningar, kalendern). När en dialog är öppen är resten av övningsdatorn `inert`. Coachpanelen går fortfarande att nå. | Automatiskt tangentbordstest 2026-10-10 (se testloggen), `accessibility-smoke` |
| 2.4.11 Fokus inte dolt (minimum) | Startsidans sidhuvud är sticky men tar bara en rad. Coachpanelen ligger bredvid skärmen och aldrig ovanpå fokuserat innehåll på breda skärmar. | Manuellt |
| 2.5.8 Målstorlek (minimum) | Webbplatsknappar ≥ 44 px, språkknappar 44×36 px, FakeWin-kontroller ≥ 24 px (Windows standard är 32 px). | `accessibility-smoke` |
| 3.1.1 / 3.1.2 Sidans språk | `<html lang>` sätts av i18n-lagret. Språkknapparna har `lang="sv"`/`lang="en"`. | `accessibility-smoke` |
| 3.3.1 / 3.3.3 Felidentifiering | Formulär i övningsdatorn (Chrome-formulär, e-post, Wi‑Fi-nyckel, Spara som) visar fel i text med `role="alert"` och `aria-invalid`. | Manuellt |
| 4.1.2 Namn, roll, värde | Roller: `tablist`/`tab`, `menu`/`menuitem`, `dialog`/`alertdialog`, `switch`, `listbox`/`option`, `progressbar`. | `accessibility-smoke` |
| 4.1.3 Statusmeddelanden | Lektionsfeedback, statusraden i Utforskaren, aviseringar och övningsstatus använder `role="status"`/`aria-live`. | `accessibility-smoke` |
| 2.3.3 / rörelse | `prefers-reduced-motion` stänger av animationer. `forced-colors` stöds: kanter på fönster och menyer, och enfärgade ikoner inverteras i mörka kontrastteman. | `accessibility-smoke`, emulering 2026-10-10 |

### Testlogg 2026-10-10

Testat automatiskt i Chrome 153 (headless, styrt via Chrome DevTools Protocol). Resultatet bygger på riktiga tangenttryckningar och emulerade medieinställningar, inte på en skärmläsare.

| Test | Resultat |
|---|---|
| Tab genom hela startsidan (sv) | Ordningen följer sidan: skip-länk, logotyp, flikar (en tabbstopp, piltangenter inom), språkknappar, Starta, Se kursen, Integritet. Alla stopp hade synlig fokusring. Tab efter sista stoppet går tillbaka till början. |
| Dialogen Integritet och lagring | Öppnas med Retur. Fokus hamnar på Stäng och stannar i dialogen vid Tab och Shift+Tab. Esc stänger, och fokus går tillbaka till knappen som öppnade dialogen. |
| Start-menyn | Retur på Start öppnar menyn med fokus i sökrutan. Tab går till de fästa apparna. Esc stänger, och fokus går tillbaka till Start-knappen. **Rättat:** fokus hamnade tidigare på `body`. |
| Snabbinställningar | Esc stänger, och fokus går tillbaka till knappen i aktivitetsfältet. **Rättat.** |
| "Vill du spara?" i Anteckningar | `role="dialog"`. Fokus startar på Spara, och Tab cirkulerar mellan Spara, Spara inte och Avbryt. Aktivitetsfältet är `inert` medan dialogen är öppen. Esc = Avbryt, och fokus går tillbaka till textrutan. |
| 200 % zoom (960×540 och 683×384 CSS-pixlar, motsvarar 1920×1080 och 1366×768) | Ingen vågrät rullning på startsidan eller i övningsdatorn. Aktivitetsfältet syns helt. |
| `prefers-reduced-motion: reduce` | Start-menyn öppnas utan animation (0 s). |
| `forced-colors: active` (mörkt tema) | Fönster, menyer och knappar får kanter. Ikonerna i systemfältet och de enfärgade kommandoikonerna syns. **Rättat:** de var tidigare mörka på mörk bakgrund. |

### Kvar att testa manuellt

Följande har **inte** kunnat testas i den här miljön och ska inte räknas som verifierat:

1. **NVDA** (Firefox och Chrome) och **Skärmläsaren/Narrator** (Edge) på Windows 11: läsordning på startsidan, flikarna, att lektionsfeedback läses upp (`role="status"`), dialogernas namn och beskrivning, och Utforskarens listruta (antal objekt, markering).
2. **VoiceOver** på macOS/iOS (Safari).
3. **Riktiga kontrastteman i Windows** (Akvatisk, Ökenlandskap, Skymning, Natthimmel), särskilt det ljusa temat Ökenlandskap. Den automatiska kontrollen emulerade bara ett mörkt tema.
4. **Webbläsarens zoom 200–400 %** med Ctrl+plus, i stället för emulerad fönsterstorlek, och textstorlek 200 % i Windows-inställningarna.
5. **Pekskärm**: dra och släpp och långtryck (högerklick) på surfplatta.
6. **Röststyrning** (Röståtkomst i Windows): att synliga etiketter matchar de tillgängliga namnen (WCAG 2.5.3).

### Textstorlek

- Webbplatsen: brödtext 16 px, sekundär text minst 14 px.
- Coachpanelen (lärarens text): 16–17 px.
- FakeWin: Windows standard 14 px, bildtext 12 px där Windows själv använder 12 px (Start-ikoner, klocka, statusrader). Ingen text i projektet är mindre än 12 px – det kontrolleras av `tests/design-system-smoke.js`.

## 3. Medvetna avvikelser från Windows 11 av tillgänglighets- eller pedagogiska skäl

| Windows 11 | Datorskolan | Varför |
|---|---|---|
| Kommandoraden i Utforskaren visar Klipp ut/Kopiera/Klistra in/Byt namn/Ta bort som ikoner utan text | Ikon + text | Nybörjare känner inte igen ikonerna. Texten är samma ord som Windows använder i verktygstipset. |
| Filnamnstillägg döljs som standard | Visas alltid | Kursen lär ut filtyper. Synliga tillägg är också ett vanligt säkerhetsråd (till exempel `faktura.pdf.exe`). Lektionen förklarar hur tillägg visas i riktiga Windows. |
| Papperskorgen syns inte i Utforskarens navigeringsfönster | Papperskorgen finns längst ned i navigeringsfönstret | Så att lektionerna går att genomföra utan att flytta fönster. Det motsvarar Windows-inställningen "Visa alla mappar". |
| Tryckt (pressed) accentknapp: ljusare blå med 85 % vit text | Mörkare blå med helvit text | Kontrast ≥ 4,5:1 även i tryckt läge. |
| Sekundärtext i "tertiärgrå" (#8d8d8d) | Alltid "sekundärgrå" (#5c5c5c) | Kontrast. |
| Skrivbordsikonernas etikett 12 px | 13 px | Läsbarhet på blå bakgrund. |
| PDF öppnas i Microsoft Edge | Neutral "PDF-läsare" | Edge-varumärket används inte. Lektionen nämner att PDF ofta öppnas i Edge. |
| Windows-tangenten, Alt+Tab, Win+Shift+S | Start-knappen, Ctrl+Esc, aktivitetsfältet, Skärmklippverktygets Nytt-knapp | Webbläsaren kan inte ta emot de här tangenterna – operativsystemet fångar dem. Lektionerna förklarar de riktiga kortkommandona. |
| Typsnitt Segoe UI Variable | Segoe UI Variable om det finns, annars systemets typsnitt | Microsofts typsnitt får inte spridas. På Windows-datorer blir resultatet äkta. |
| Dialogrutor (till exempel "Vill du spara?") i Windows tonar inte ned resten av skärmen | Inte heller i Datorskolan. Bara UAC-frågan tonar ned skärmen, precis som Windows säkra skrivbord. | Samma upplevelse som i Windows. Resten av övningsdatorn blir `inert` för tangentbord och skärmläsare. |
| Start-knappen visar Windows-logotypen | Fyra blå rundade rutor (Microsofts Fluent-ikon *Grid*) | Windows-logotypen är ett varumärke. Se `38-ASSETS-AND-LICENSES.md`. |
| Coachpanelen finns inte i Windows | Datorskolans panel med webbplatsens typsnitt och färger | Den ska tydligt se annorlunda ut än Windows, så att eleven förstår vad som är "läraren" och vad som är "datorn". |

## 4. Integritet och lagring

Datorskolan har inga konton, ingen statistik, inga cookies och ingen spårning.

### Data som lagras i webbläsaren (`localStorage`)

| Nyckel | Innehåll | Varför | Raderas med |
|---|---|---|---|
| `datorskolan.progress.v1` | Klara lektioner, färdighetsnivåer, vald nivå (Vuxen/Barn/Snabb), en logg över övningshändelser (högst 500 poster) | För att kunna fortsätta där du var | Knappen **Börja om** eller rensning av webbplatsdata |
| `datorskolan.fakewin.shell.v1` | Vilka appar som är fästa på Start och i aktivitetsfältet | Så att egna val i övningsdatorn ligger kvar | **Börja om** |
| `datorskolan.locale.v1` | Valt språk (`sv`/`en`) | Så att språket ligger kvar efter omladdning | Rensning av webbplatsdata (sparas medvetet vid Börja om) |

`sessionStorage` används för en enda flagga (`datorskolan.launchSchool`) när språket byts inne i övningsdatorn, så att sidan öppnas i övningsdatorn igen efter omladdningen.

### Externa anrop

| Mottagare | Vad | Varför |
|---|---|---|
| GitHub Pages | Hela webbplatsen | Webbhotell |
| `www.google.com` | Chrome-logotypen | Får inte bundlas, se `38-ASSETS-AND-LICENSES.md` |

Inga skript laddas från tredje part. Övningsdatorns "webb" (`datorskolan.example`) är helt simulerad – inget skickas någonstans.

**Behövs en integritetspolicy?** Eftersom inga personuppgifter samlas in och ingen spårning sker behövs ingen fullständig integritetspolicy. Informationen ovan finns i klartext på startsidan (**Integritet och lagring**), vilket uppfyller kravet på information om lagring i användarens enhet.
