# 40 – Svenska Windows-termer: kontroll mot Microsoft

Senast kontrollerad: 2026-10-10.

Övningsdatorn ska använda exakt de ord som står i svenska Windows 11, så att eleven känner igen dem på sin egen dator. Här står varje term vi kontrollerat, var den kontrollerades och hur säker kontrollen är.

**Metod.** Microsofts svenska supportsidor (support.microsoft.com/sv-se) hämtades och texten lästes. Ett riktigt svenskt Windows 11 har **inte** funnits i testmiljön. Termer som bara kunde kontrolleras i dokumentation, eller inte alls, är markerade.

**Microsofts egna sidor är inte helt konsekventa.** Exempel:
- Kortkommandosidan kallar Windows+A för "Åtgärdscenter" (namnet från Windows 10).
- Samma sida kallar Utforskaren för "Filutforskaren".
- Utforskarsidan skriver både "Fäst i Snabbåtkomst" och "Fäst på Snabbåtkomst".

När källorna går isär följer vi den nyaste Windows 11-texten och noterar avvikelsen.

## Källor

| Kod | Sida |
|---|---|
| S1 | [Anpassa Start-menyn i Windows](https://support.microsoft.com/sv-se/windows/se-vad-som-finns-p%C3%A5-start-menyn-a8ccb400-ad49-962b-d2b1-93f453785a13) |
| S2 | [Anpassa Aktivitetsfältet i Windows](https://support.microsoft.com/sv-se/windows/anpassa-aktivitetsf%C3%A4ltet-i-windows-0657a50f-0cc7-dbfd-ae6b-05020b195b07) |
| S3 | [Utforskaren i Windows](https://support.microsoft.com/sv-se/windows/utforskaren-i-windows-ef370130-1cca-9dc5-e0df-2f7416fe1cb1) |
| S4 | [Kortkommandon i Windows](https://support.microsoft.com/sv-se/accessibility/windows/keyboard-shortcuts-in-windows) |
| S5 | [Hjälp i Anteckningar](https://support.microsoft.com/sv-SE/Windows/Apps/help-in-notepad) (bara via sökresultat, sidan lästes inte i sin helhet) |
| S6 | [Förstå och utforska Windows-inställningar](https://support.microsoft.com/sv-se/topic/f%C3%B6rst%C3%A5-och-utforska-windows-inst%C3%A4llningar-b241cbf6-9b4c-4e3b-aa77-900ebbd766ff) (lästes 2026-10-10) |
| S7 | [Sign-In Alternativ i Windows](https://support.microsoft.com/sv-se/accounts-billing/security/sign-in-options-in-windows) och artikeln om profilbild ("Inställningar > Konton > Din information"), via sökresultat |
| S8 | [Gaming i Windows 11](https://support.microsoft.com/sv-se/windows/uppt%C3%A4ck-windows-11-spel-2e537161-a578-4ebd-b399-366c855023e1) ("Inställningar > Spel > Spelläge"), via sökresultat |
| S9 | [Anpassa skrivbordsikonerna i Windows](https://support.microsoft.com/sv-se/windows/anpassa-skrivbordsikoner-i-windows-c13270f0-3812-c71d-f27e-29aa32588b20) (lästes 2026-10-10) |

## Kontrollerade termer

Status: **Verifierad** = ordagrant i källan. **Delvis** = stöd i källan men inte ordagrant för just Windows 11-gränssnittet. **Ej verifierad** = bygger på kunskap om svenska Windows 11 och behöver kontrolleras på en riktig dator.

| Term i övningsdatorn | Engelska | Status | Källa och kommentar |
|---|---|---|---|
| Fäst (Start-menyn) | Pinned | Verifierad | S1: "Avsnitten Fäst och Alla …" |
| Alla (Start-menyn) | All | Verifierad | S1. Äldre text i samma källa säger "Alla appar". |
| Visa alla | Show all | Verifierad | S1 |
| Rekommenderas | Recommended | Delvis | S1 beskriver avsnittet, men ordet "Rekommenderas" kom inte med när sidan hämtades. |
| Fäst på Start / Ta bort från Start | Pin to Start / Unpin from Start | Verifierad | S1 |
| Fäst i Aktivitetsfältet / Ta bort från Aktivitetsfältet | Pin to taskbar / Unpin from taskbar | Verifierad | S2. **Rättat 2026-10-10**: tidigare "aktivitetsfältet" med litet a. Menytexten och lektionerna som citerar den följer nu Microsoft. I löptext i lektionerna står "aktivitetsfältet" med litet a, enligt svensk skrivregel. |
| Snabbinställningar | Quick settings | Verifierad | S2: "Området Snabbinställningar består av …". S4 använder det föråldrade "Åtgärdscenter". |
| Inställningar | Settings | Verifierad | S4: "Öppna appen Inställningar." |
| Utforskaren | File Explorer | Verifierad | S3 (rubrik). S4 skriver "Filutforskaren", vilket är inkonsekvent. |
| Start (Utforskarens startsida) | Home | Verifierad | S3: "Välj Start i det vänstra navigeringsfönstret." |
| Hämtade filer | Downloads | Verifierad | S3: "… Skrivbord, Dokument, Hämtade filer, Bilder, Musik och Videor." |
| Papperskorgen | Recycle Bin | Verifierad | S4 |
| Öppna | Open | Verifierad | S3: "… högerklicka … och välja Öppna" |
| Byt namn | Rename | Verifierad | S3, S4 (F2) |
| Ta bort | Delete | Verifierad | S3 |
| Klipp ut / Kopiera / Klistra in | Cut / Copy / Paste | Verifierad | S3 |
| Egenskaper | Properties | Verifierad | S4: "Öppna dialogrutan Egenskaper …" |
| Spara som | Save as | Delvis | S5 (Arkiv → Spara som), samma ord i flera Microsoft-guider. Sidan lästes inte ordagrant. |
| Återställ (Papperskorgen) | Restore | Delvis | Microsofts svenska hjälp om att återställa filer använder "Återställ". Ingen Windows 11-sida om Papperskorgen lästes ordagrant. |
| Fäst på Snabbåtkomst | Pinned to Quick access | Delvis | S3 använder både "Fäst på" och "Fäst i". Vi använder "Fäst på", som i de flesta meningarna i S3. Syns bara som verktygstips på nålen. |
| Navigeringsfönster | Navigation pane | Verifierad | S3 |
| Start (Inställningars första sida) | Home | Ej verifierad | |
| System, Appar, Konton, Spel, Hjälpmedel, Anpassning, Windows Update | System, Apps, Accounts, Gaming, Accessibility, Personalisation, Windows Update | Verifierad | S6 (listan över kategorier i Windows 11) |
| Bluetooth och enheter, Nätverk och internet, Tid och språk, Sekretess och säkerhet | Bluetooth & devices, Network & internet, Time & language, Privacy & security | Delvis | S6 skriver både "&" ("Tid & språk", "Sekretess & Säkerhet") i listan och "och" i brödtexten. Vi använder "och", som brödtexten och som i Windows menyer på svenska. S6 skriver "Internet" med stort I; vi skriver "internet" enligt svensk skrivregel. |
| Din information | Your info | Verifierad | S7. **Rättat 2026-10-10**: tidigare "Din info". |
| Inloggningsalternativ | Sign-in options | Verifierad | S7 |
| Datum och tid, Språk och region | Date & time, Language & region | Delvis | S6 nämner "datum och tid, språk och region" i löptext under Tid och språk, inte som sidnamn. |
| Spelläge | Game Mode | Verifierad | S8 |
| Inspelningar | Captures | Ej verifierad | |
| Stora ikoner, Medelstora ikoner, Små ikoner, Visa skrivbordsikoner | Large icons, Medium icons, Small icons, Show desktop icons | Verifierad | S9 (skrivbordets snabbmeny > Visa). Observera "Medelstora", inte "Mellanstora". |
| Ordna ikoner automatiskt, Justera ikoner mot rutnät | Auto arrange icons, Align icons to grid | Ej verifierad | De engelska namnen är kända; den svenska ordalydelsen hittades inte i Microsofts dokumentation. |
| Sortera efter: Namn, Storlek, Objekttyp, Ändringsdatum | Sort by: Name, Size, Item type, Date modified | Delvis | "Sortera efter" och "Ändringsdatum" (kolumnen i Utforskaren) är verifierade; "Objekttyp" är inte hittad i svensk Microsoft-text. |
| Utforskaren: Sortera, Visa, Stigande, Fallande, Lista, Detaljer | Sort, View, Ascending, Descending, List, Details | Delvis | "Visa" i kommandofältet är verifierad (S3). Övriga ej hittade ordagrant. |
| Webbläsare | Browser | – | Övningsdatorns neutrala webbläsare, inget Windows-namn (se `38-ASSETS-AND-LICENSES.md`). |
| Stäng flik | Close tab | Ej verifierad | Verktygstips på flikens kryss i Utforskaren och Anteckningar |
| Fästlayouter; Vänster halva, Höger halva, Vänstra två tredjedelarna, Högra tredjedelen, Övre/Nedre vänstra/högra fjärdedelen | Snap layouts; zone names | Ej verifierad | Panelens namn och zonernas tillgängliga namn. Windows visar inga synliga etiketter på zonerna; namnen hörs bara i skärmläsare. Kontrollera "fästlayouter" under Inställningar → System → Multitasking. |

## Kvar att göra manuellt

Kontrollera termerna markerade **Delvis** och **Ej verifierad** på en dator med svenskt Windows 11 (version 24H2 eller senare). Ändra i `locales/sv/fakewin.js`. Om en term citeras i en lektion, ändra också i `locales/sv/course.js`. Kör sedan `node tests/run-all.js`. `tests/windows11-realism-smoke.js` låser de verifierade termerna.
