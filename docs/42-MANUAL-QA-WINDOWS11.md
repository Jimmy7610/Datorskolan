# 42 – Manuell jämförelse mot en riktig svensk Windows 11-dator

Den här listan körs på en riktig dator med **svenskt Windows 11 (24H2 eller senare)**, med Datorskolan öppen bredvid i en webbläsare. Varje rad är en sak att kontrollera. Bocka i, eller skriv vad Windows faktiskt visar i kolumnen *Utfall*.

**Om något skiljer sig:** ändra texten i `locales/sv/fakewin.js` (citeras den i en lektion, också i `locales/sv/course.js`), uppdatera `docs/40-SWEDISH-WINDOWS-TERMS.md` och kör `node tests/run-all.js`. Skillnader som är medvetna står i `docs/37` avsnitt 3 (grupp B) och ska inte ändras.

Förberedelser:
- Windows: standardtema (ljust), skalning 100 %, standardbakgrund, ingen extra programvara i aktivitetsfältet.
- Datorskolan: webbläsarens zoom 100 %, fönster 1920×1080 eller 1366×768, språk Svenska.
- Termer markerade **Ej verifierad** eller **Delvis** i docs/40 är viktigast. De är märkta ★ nedan.

## 1. Start-menyn

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 1.1 | att sökrutans platshållartext heter | "Sök efter appar, inställningar och dokument" | |
| 1.2 | att rubriken över de fästa apparna heter | "Fäst" | |
| 1.3 | att knappen till höger om rubriken heter | "Alla" (pil →) | |
| 1.4 ★ | att avsnittet under de fästa apparna heter | "Rekommenderas" | |
| 1.5 | att användarknappens meny innehåller | "Ändra kontoinställningar", "Lås" | |
| 1.6 | att strömknappens meny har ordningen | "Strömsparläge", "Stäng av", "Starta om" | |
| 1.7 | att högerklick på en fäst app visar | "Ta bort från Start", "Fäst i Aktivitetsfältet" | |
| 1.8 | att sökresultatets rubrik heter | "Bästa matchning", och att detaljrutan till höger visar "Öppna" | |
| 1.9 | ikonstorlek i rutnätet: 32 px ikon, 12 px etikett, 6 kolumner | samma | |
| 1.10 | att långa namn kortas med "…" på en rad | samma, hela namnet i verktygstips | |

## 2. Aktivitetsfältet och systemfältet

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 2.1 | att aktivitetsfältet är 48 px högt och ikonerna centrerade | samma | |
| 2.2 | att en öppen app har ett kort streck under ikonen, det aktiva fönstret ett längre blått | samma | |
| 2.3 | att verktygstipset på nätverk/ljud/batteri lyder | "{nätverk} – ansluten till internet" (Windows: nätverksnamn + "Internetåtkomst") | |
| 2.4 | att klockan visar tid överst och datum under (ÅÅÅÅ-MM-DD) | samma | |
| 2.5 | att högerklick på en app i fältet visar | appnamnet, "Ta bort från Aktivitetsfältet"/"Fäst i Aktivitetsfältet", "Stäng fönster" | |
| 2.6 | att knappen längst till höger (Visa skrivbordet) är en smal remsa | samma | |

## 3. Snabbinställningar (klick på nätverk/ljud/batteri)

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 3.1 | att knapparna heter | "Wi‑Fi", "Bluetooth", "Flygplansläge", "Energisparläge", "Hjälpmedel" | |
| 3.2 | att reglagen heter (verktygstips/skärmläsarnamn) | "Ljusstyrka", "Volym" | |
| 3.3 | att pilen bredvid Wi‑Fi öppnar en lista och länken längst ned heter | "Fler Wi‑Fi-inställningar" | |
| 3.4 | att batteriet visas som "NN %" (med mellanslag) | samma | |

## 4. Kalender och aviseringar (klick på klockan)

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 4.1 | att veckan börjar på måndag och hur veckodagarna förkortas | måndag först; förkortningarna kommer från webbläsarens svenska datumformat | |
| 4.2 | att månadsrubriken skrivs "oktober 2026" (liten bokstav) | samma | |
| 4.3 | att pilarnas verktygstips heter | "Föregående månad", "Nästa månad" (★ ej verifierat) | |
| 4.4 | att rutnätet alltid har sex veckor | samma | |
| 4.5 | att tom aviseringslista säger | "Inga nya aviseringar" | |

## 5. Skrivbordet och snabbmenyer

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 5.1 | att högerklick på skrivbordet visar (uppifrån) | "Visa ›", "Sortera efter ›", "Uppdatera", —, "Nytt ›", —, "Bildskärmsinställningar", "Anpassa" | |
| 5.2 ★ | att undermenyn Visa innehåller | "Stora ikoner", "Medelstora ikoner", "Små ikoner", —, "Ordna ikoner automatiskt", "Justera ikoner mot rutnät", —, "Visa skrivbordsikoner" | |
| 5.3 ★ | att undermenyn Sortera efter innehåller | "Namn", "Storlek", "Objekttyp", "Ändringsdatum" | |
| 5.4 | att menyn har rundade hörn (8 px), raderna är 32 px höga och undermenypilen sitter till höger | samma | |
| 5.5 | att skrivbordsikonernas etikett är vit med skugga | samma (13 px i stället för 12 px, medveten avvikelse) | |

## 6. Utforskaren

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 6.1 | att fönstret har en flik överst med mappnamn och ikon | samma (ingen +-knapp, medveten avvikelse) | |
| 6.2 ★ | att flikens kryss har verktygstipset | "Stäng flik" | |
| 6.3 | att knapparnas verktygstips heter | "Bakåt (Alt + Vänsterpil)", "Framåt (Alt + Högerpil)", "Upp till överordnad mapp (Alt + Uppil)" | |
| 6.4 | att sökrutan säger | "Sök i {mapp}" | |
| 6.5 ★ | att kommandofältet har | "Nytt", "Sortera", "Visa" (Windows: ikoner utan text för Klipp ut/Kopiera osv., medveten avvikelse) | |
| 6.6 ★ | att Sortera-menyn har | "Namn", "Ändringsdatum", "Typ", "Storlek", —, "Stigande", "Fallande" | |
| 6.7 ★ | att Visa-menyn har | "Stora ikoner", "Medelstora ikoner", "Lista", "Detaljer" | |
| 6.8 | att kolumnerna i Detaljer heter | "Namn", "Ändringsdatum", "Typ", "Storlek" | |
| 6.9 | att storlek skrivs "12 kB" | samma | |
| 6.10 | att statusraden säger | "5 objekt", "1 objekt har markerats" | |
| 6.11 | att typerna heter | "Filmapp", "Textdokument", "PDF-dokument", "Komprimerad (zippad) mapp" | |
| 6.12 ★ | att fästa mappar i navigeringsfönstret har en nål, och verktygstipset | "Fäst på Snabbåtkomst" | |
| 6.13 | att dialogen vid ogiltigt namn säger | "Ett filnamn får inte innehålla något av följande tecken: \ / : * ? " < > \|" | |
| 6.14 | att Papperskorgens knappar heter | "Töm Papperskorgen", "Återställ alla objekt", "Återställ markerade objekt" | |
| 6.15 | att zip-guiden heter | "Extrahera komprimerade (zippade) mappar", knapp "Extrahera" | |

## 7. Inställningar

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 7.1 ★ | att första sidan i navigeringen heter | "Start" | |
| 7.2 | att sidorna heter, i ordning | "System", "Bluetooth och enheter", "Nätverk och internet", "Anpassning", "Appar", "Konton", "Tid och språk", "Spel", "Hjälpmedel", "Sekretess och säkerhet", "Windows Update" | |
| 7.3 | att sökrutan säger | "Hitta en inställning" | |
| 7.4 | att korten under System heter | "Bildskärm", "Ljud", "Ström och batteri", "Lagring" | |
| 7.5 | att Konton har | "Din information", "Inloggningsalternativ" | |
| 7.6 ★ | att Tid och språk har | "Datum och tid", "Språk och region" | |
| 7.7 ★ | att Spel har | "Spelläge", "Inspelningar" | |
| 7.8 | att Windows Update säger | "Du är uppdaterad", knappen "Sök efter uppdateringar" | |
| 7.9 | att Wi‑Fi-dialogen säger | "Ange nätverkssäkerhetsnyckeln", "Anslut automatiskt" | |
| 7.10 | att kort som öppnar en undersida har en pil › till höger | samma; kort utan undersida i Datorskolan har ingen pil (medvetet) | |

## 8. Dialogrutor

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 8.1 | att Anteckningar frågar | "Vill du spara ändringarna i Namnlös?", knappar "Spara", "Spara inte", "Avbryt" | |
| 8.2 | att Spara som-dialogen har knappar | "Spara", "Avbryt", fältet "Filnamn:" | |
| 8.3 | att ersätt-frågan har "Ja"/"Nej" och att Nej är förvalt | samma | |
| 8.4 | att "svarar inte"-dialogen säger | "{app} svarar inte", "Stäng programmet", "Vänta på programmet" | |
| 8.5 | att knapparna är 32 px höga, den primära blå (#005fb8) | samma | |
| 8.6 | att resten av skärmen **inte** tonas ned (utom vid UAC) | samma | |

## 9. Fönster

| # | Kontrollera | Datorskolan visar | Utfall |
|---|---|---|---|
| 9.1 | att titelfältsknapparna har verktygstipsen | "Minimera", "Maximera"/"Återställ nedåt", "Stäng" | |
| 9.2 | att knapparna är 46 × 32 px och Stäng blir röd vid hovring | samma | |
| 9.3 | att muspekaren ändras vid alla kanter och hörn och att fönstret går att dra större/mindre därifrån | samma | |
| 9.4 ★ | att hovring på Maximera visar fästlayouter: 50/50, 2/3 + 1/3 och fyra hörn | samma | |
| 9.5 ★ | vad panelen heter i Inställningar → System → Multitasking (Datorskolan säger "Fästlayouter") | | |
| 9.6 | att dra ett maximerat fönster nedåt återställer det under pekaren | samma | |
| 9.7 | att dra mot vänster/höger kant fäster till halva skärmen, mot överkanten maximerar | samma | |
| 9.8 | att dubbelklick på titelfältet maximerar/återställer | samma | |
| 9.9 | att fönsterhörnen är rundade (8 px) och det aktiva fönstret har tydligare skugga | samma | |

## 10. Ikonstorlekar och avstånd (stickprov)

Ta en skärmbild i Windows och i Datorskolan i samma upplösning och jämför:

| # | Kontrollera | Riktvärde (Fluent-design, mät i båda) |
|---|---|---|
| 10.1 | Aktivitetsfältets ikoner | 24 px ikon i 40 px knapp |
| 10.2 | Utforskaren, Detaljer | radhöjd 32 px, ikon 16 px |
| 10.3 | Snabbmeny | ikon 16 px, 12 px mellan ikon och text |
| 10.4 | Inställningar, kort | minst 68 px höga, 4 px mellanrum, ikon 20 px |
| 10.5 | Start, rutnät | 32 px ikon, ca 96 px per ruta |

## Resultat

Fyll i: datum, Windows-version (`winver`), webbläsare, vem som testade. Skriv avvikelser som rader i `docs/40` (termer) eller som nya rader i `docs/37` avsnitt 3 (grupp A om de ska rättas, B om de är medvetna).
