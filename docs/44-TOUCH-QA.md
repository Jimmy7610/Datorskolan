# 44 – Manuell test med pekskärm

Datorskolan lär ut Windows med mus och tangentbord. Det går också att använda på surfplatta och telefon, men inte allt fungerar som med mus. Den här listan visar vad som ska fungera, hur det testas och vad som **inte** stöds.

Testa på minst:

| Enhet | Webbläsare |
|---|---|
| Windows 11 med pekskärm (eller Surface) | Edge |
| Android-surfplatta eller telefon | Chrome |
| iPad (iPadOS 17+) | Safari |
| iPhone | Safari |

Rensa webbplatsdata först. Testa både stående och liggande läge. Skriv i *Utfall* vad som händer.

## 1. Grundgester

| # | Gör så här | Ska hända | Utfall |
|---|---|---|---|
| 1.1 | Tryck på Start | Start-menyn öppnas | |
| 1.2 | Tryck på en app i Start | Appen öppnas, Start stängs | |
| 1.3 | Dubbeltryck på en skrivbordsikon | Den öppnas (samma som dubbelklick), sidan zoomas **inte** | |
| 1.4 | Dubbeltryck på en fil i Utforskaren | Filen öppnas | |
| 1.5 | Långtryck på en skrivbordsikon | Snabbmenyn öppnas (se avsnitt 4 om iPhone/iPad) | |
| 1.6 | Rulla en lång lista (Inställningar, Utforskaren, lektionstexten) med ett finger | Listan rullar, inte hela sidan; ingen "studs" som flyttar övningsdatorn | |
| 1.7 | Nyp för att zooma på startsidan | Sidan zoomar (zoom får inte vara spärrad) | |

## 2. Fönster

| # | Gör så här | Ska hända | Utfall |
|---|---|---|---|
| 2.1 | Dra ett fönster i titelfältet | Fönstret följer fingret utan att sidan rullar | |
| 2.2 | Dra titelfältet till vänster kant och släpp | Fönstret fästs till vänster halva | |
| 2.3 | Dra titelfältet till överkanten och släpp | Fönstret maximeras | |
| 2.4 | Dra ett maximerat fönster nedåt | Det återställs under fingret | |
| 2.5 | Dra nedre högra hörnet | Fönstret ändrar storlek (hörnet har en större träffyta, 28 px, på pekskärm) | |
| 2.6 | Dra en kant (vänster, höger, topp, botten) | Fungerar, men kanten är smal (6 px) och svår att träffa. Inget fel – använd hörnet | |
| 2.7 | Tryck på Maximera | Fönstret maximeras direkt. Fästlayouter visas **inte** (de visas bara när en mus vilar på knappen, som i Windows) | |
| 2.8 | Tryck på Minimera, sedan appen i aktivitetsfältet | Fönstret försvinner och kommer tillbaka | |

## 3. Aktivitetsfält, flyouts och dialoger

| # | Gör så här | Ska hända | Utfall |
|---|---|---|---|
| 3.1 | Tryck på nätverk/ljud/batteri | Snabbinställningar öppnas | |
| 3.2 | Dra volymreglaget | Volymen ändras, sidan rullar inte | |
| 3.3 | Tryck utanför en öppen flyout | Den stängs | |
| 3.4 | Tryck på klockan, sedan pilarna | Kalendern byter månad | |
| 3.5 | Stäng Anteckningar med osparad text | Dialogen visas; tryck utanför dialogen gör ingenting; knapparna är minst 32 px höga | |
| 3.6 | Skriv i Spara som-fältet | Skärmtangentbordet öppnas och dialogen är fortfarande synlig ovanför tangentbordet | |

## 4. Lärarpanelen (coach)

| # | Gör så här | Ska hända | Utfall |
|---|---|---|---|
| 4.1 | Skärm smalare än 1100 px (telefon, de flesta surfplattor): tryck på Datorskolan i aktivitetsfältet | Panelen läggs över övningsdatorns högra del och stängs med samma knapp | |
| 4.2 | Skärm bredare än 1100 px (stor surfplatta liggande) | Panelen ligger bredvid övningsdatorn | |
| 4.3 | Tryck på Hjälp, Kontrollera, Nästa | Fungerar med ett tryck | |
| 4.4 | Rulla lektionstexten | Bara panelen rullar | |

## 5. Det här stöds INTE med pekskärm

| Interaktion | Varför | Vad eleven gör i stället |
|---|---|---|
| **Långtryck = högerklick på iPhone och iPad** | Safari på iOS/iPadOS skickar inget `contextmenu`-anrop vid långtryck. Android Chrome och Windows gör det. | Använda mus eller styrplatta till iPad (då fungerar högerklick), eller göra högerklickslektionerna på en dator. Lektionerna om högerklick lär ut en musrörelse, så de är menade för en dator. |
| **Fästlayouter** | Visas när en mus vilar på Maximera, precis som i Windows 11. Ett tryck är ett klick. | Dra fönstret mot en kant. |
| **Hovring** (verktygstips, markering vid hovring) | Pekskärmar har ingen hovring. | Inget – verktygstipsen är extra, inte nödvändiga. |
| **Rulla med mushjulet i musövningen** | Övningen räknar mushjulshändelser. | Övningen är till för mus; på pekskärm kan den hoppas över. |

## 6. Måste verifieras på riktig enhet (kunde inte testas här)

- **Dra och släpp filer i Utforskaren** och **dra-övningen i musmodulen** använder webbläsarens inbyggda dra och släpp (HTML5). iPadOS 15+ stöder det; stödet i Chrome på Android och i Edge med pekskärm är inte bekräftat. Fungerar det inte: notera enhet och version här och lägg till raden i avsnitt 5.
- **Dubbeltryck** ska ge dubbelklick utan att sidan zoomar. Det beror på webbläsarens hantering av dubbeltryck; kontrollera på iOS särskilt.
- **Markeringsrektangeln på skrivbordet** (dra på tom yta för att markera flera ikoner) är byggd för mus. Kontrollera om ett fingerdrag ritar rektangeln eller rullar sidan.
- **Skärmtangentbordet** får inte dölja den textruta eleven skriver i.

## Resultat

Fyll i: datum, enhet, operativsystem, webbläsare, vem som testade. Avvikelser förs in i `docs/37` avsnitt 3 (grupp A om de ska rättas, B om de är medvetna, C om de behöver mer test).
