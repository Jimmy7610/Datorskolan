# 43 – Manuell test med skärmläsare (NVDA, Skärmläsaren, VoiceOver)

Automatiska tester (`tests/accessibility-smoke.js` och CDP-körningarna i `docs/37`) kontrollerar roller, namn och fokus. De kan **inte** avgöra vad en skärmläsare faktiskt säger. Den här listan gör det.

Kör varje avsnitt i tre miljöer:

| Miljö | Webbläsare | Starta | Läsläge ↔ fokusläge |
|---|---|---|---|
| NVDA 2024.x eller senare, Windows 11 | Firefox och Chrome | Ctrl+Alt+N | NVDA+Mellanslag |
| Skärmläsaren (Narrator), Windows 11 | Edge | Win+Ctrl+Retur | Caps Lock+Mellanslag (genomsökningsläge) |
| VoiceOver, macOS 14+ | Safari | Cmd+F5 | VO = Ctrl+Option; VO+Höger/Vänster flyttar |

Rensa först webbplatsdata för sidan, så att den startar utan sparade framsteg. Språk: Svenska. Skriv i *Utfall* vad som lästes upp, ordagrant om det skiljer sig.

## 1. Startsidan

| # | Gör så här | Ska läsas upp / hända | Utfall |
|---|---|---|---|
| 1.1 | Ladda sidan | Sidans titel "Datorskolan – lär dig Windows genom att göra det" | |
| 1.2 | Tab en gång | Länk "Hoppa till huvudinnehållet" | |
| 1.3 | Retur | Fokus flyttar till huvudinnehållet; nästa Tab går till innehåll, inte tillbaka till sidhuvudet | |
| 1.4 | Shift+Tab till flikarna | "Om Datorskolan, flikkontroll" / "Översikt, flik, markerad, 1 av 4" | |
| 1.5 | Högerpil | "Så fungerar det, flik, 2 av 4"; panelen byts direkt | |
| 1.6 | Tab från fliken | Fokus hamnar i flikpanelen eller nästa knapp, **inte** på nästa flik (en tabbstopp för hela fliklistan) | |
| 1.7 | Tab till språkknapparna | Gruppen "Språk / Language", knappen för valt språk "nedtryckt"/"pressed" | |
| 1.8 | Retur på "English" | Texterna byts; skärmläsaren uttalar engelska med engelsk röst (`<html lang="en">`) | |
| 1.9 | Öppna "Integritet och lagring" | "Integritet och lagring, dialogruta"; fokus på Stäng | |
| 1.10 | Tab flera gånger i dialogen | Fokus stannar i dialogen; sidan bakom går **inte** att nå med Tab eller med läsläget (pilar/H) | |
| 1.11 | Esc | Dialogen stängs, fokus tillbaka på knappen som öppnade den | |

## 2. Övningsdatorn och lärarpanelen

| # | Gör så här | Ska läsas upp / hända | Utfall |
|---|---|---|---|
| 2.1 | Retur på "Starta Datorskolan" | Fokus flyttar in i övningsdatorn; området heter "Övningsdator med Windows 11" | |
| 2.2 | Navigera med landmärken (NVDA: D, VoiceOver: rotorn) | Panelen "Datorskolan – din lärare" går att hitta som eget område | |
| 2.3 | Starta en lektion och gör ett fel | Felmeddelandet läses upp **automatiskt** utan att fokus flyttas (`role="status"`) | |
| 2.4 | Gör rätt | "Rätt"-meddelandet läses upp automatiskt | |
| 2.5 | Tryck på "Hjälp" | Ledtråden läses upp och börjar med "Ledtråd 1 av N:" | |
| 2.6 | Vänta 90 s utan att göra något | Erbjudandet om mer hjälp läses upp en gång (status), fokus flyttas inte | |
| 2.7 | Knappen "Visa eller dölj Datorskolan" i aktivitetsfältet | Läses med namn och "expanderad"/"komprimerad" | |

## 3. Start, sök och aktivitetsfält

| # | Gör så här | Ska läsas upp / hända | Utfall |
|---|---|---|---|
| 3.1 | Tab till Start, Retur | Fokus i sökrutan: "Sök efter appar, inställningar och dokument, redigera" | |
| 3.2 | Skriv "anteck" | Antalet träffar eller "Bästa matchning, Anteckningar" läses upp | |
| 3.3 | Esc | Start stängs, fokus tillbaka på Start-knappen | |
| 3.4 | Tab till en app i aktivitetsfältet med öppet fönster | Appnamn + "körs" eller "aktivt fönster" | |
| 3.5 | Klockan | "Klockan är …, …. Visa kalender och aviseringar" | |
| 3.6 | Öppna kalendern, piltangenter i månaden | Varje dag läses med fullständigt datum; PageUp/PageDown byter månad och månadsnamnet läses upp | |

## 4. Fönster, menyer och fästlayouter

| # | Gör så här | Ska läsas upp / hända | Utfall |
|---|---|---|---|
| 4.1 | Tab till Maximera i ett fönster | "Maximera, knapp, meny" (har undermeny) | |
| 4.2 | Nedåtpil | "Fästlayouter, meny" och "Vänster halva, menyalternativ" | |
| 4.3 | Högerpil några gånger | "Höger halva", "Vänstra två tredjedelarna" … | |
| 4.4 | Esc | Panelen stängs, fokus tillbaka på Maximera | |
| 4.5 | Nedåtpil, Retur | Fönstret fästs till vänster; fokus hamnar i fönstret (t.ex. textrutan i Anteckningar) | |
| 4.6 | Tab till en skrivbordsikon, Shift+F10 eller Programtangenten | "Snabbmeny, meny"; första alternativet ("Öppna") läses | |
| 4.7 | Högerklicka på skrivbordets bakgrund, pil till "Visa", Högerpil | Undermenyn öppnas, "Stora ikoner, alternativknapp, markerad/inte markerad" | |
| 4.8 | Vänsterpil | Undermenyn stängs, fokus tillbaka på "Visa" | |

## 5. Utforskaren

| # | Gör så här | Ska läsas upp / hända | Utfall |
|---|---|---|---|
| 5.1 | Öppna Utforskaren, Tab till fillistan | Listans namn, antal objekt och första objektet: namn, typ | |
| 5.2 | Nedåtpil | Nästa objekt; markering läses ("markerad") | |
| 5.3 | F2 | Redigeringsfält med objektets namn | |
| 5.4 | Esc | Namnbytet avbryts, fokus tillbaka i listan | |
| 5.5 | Statusraden efter markering | "1 objekt har markerats" läses upp (status) | |

## 6. Dialogrutor – vad som INTE får gå att nå

Öppna Anteckningar, skriv något och tryck på Stäng (X) i titelfältet så att "Vill du spara ändringarna i Namnlös?" visas.

| # | Gör så här | Ska hända | Utfall |
|---|---|---|---|
| 6.1 | — | "Anteckningar, dialogruta, Vill du spara ändringarna i Namnlös?"; fokus på Spara | |
| 6.2 | Tab, Tab, Tab | Spara → Spara inte → Avbryt → Spara (cirkulerar) | |
| 6.3 | Läsläge: pila uppåt/nedåt förbi dialogen | Skrivbordet, andra fönster, aktivitetsfältet och lärarpanelen läses **inte** (de är `inert`) | |
| 6.4 | NVDA: Insert+F7 (elementlista) | Bara dialogens knappar finns med | |
| 6.5 | Esc | Som Avbryt; fokus tillbaka i textrutan | |
| 6.6 | Upprepa med Spara som, Egenskaper och UAC-frågan i en installationslektion | Samma: inget bakom dialogen går att nå | |

## 7. Kända begränsningar (ska inte rapporteras som fel)

- Windows-tangenten, Alt+Tab, Alt+F4, Win+D och liknande tas om hand av operativsystemet innan webbläsaren får dem. Använd Start-knappen, Ctrl+Esc och aktivitetsfältet. Se `docs/37` avsnitt 3.
- Skärmläsarens egna kommandon (till exempel NVDA+T) kan krocka med övningsdatorns kortkommandon i fokusläge. Växla till fokusläge när du arbetar i övningsdatorn.
- Verktygstips (title) läses olika av olika skärmläsare. Det tillgängliga namnet (`aria-label`) är det som räknas.

## Resultat

Fyll i: datum, skärmläsare och version, webbläsare och version, vem som testade. Fel förs in i `docs/37` avsnitt 2, "Kvar att testa manuellt", eller rättas direkt.
