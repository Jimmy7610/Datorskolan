# Fas 13 – Windows 11 realism – Acceptance

Fas 13 ersätter pedagogiska specialknappar med realistiska FakeWin-interaktioner och gör simulatorn visuellt och beteendemässigt mycket närmare en modern Windows 11-dator.

Status: **IMPLEMENTERAD – väntar på manuell acceptans**

## Windows-skal

- [ ] Aktivitetsfältet är centrerat och Windows 11-likt.
- [ ] Start-knappen använder Windows-lik fyrfältsikon.
- [ ] Start-menyn öppnas centrerad ovanför aktivitetsfältet.
- [ ] Start-menyn har sökning, fästa appar, rekommenderat och användar/strömsektion.
- [ ] Systemfältet visar nätverk, ljud, batteri, klocka och datum.
- [ ] Snabbinställningar kan öppnas från systemfältet.
- [ ] Datorskolans hemikon ligger vid systemfält/klocka utan att täcka skrivbordet.
- [ ] Fönster har Windows 11-lik namnlist, minimera, maximera och stäng.
- [ ] Fönster kan dras och storleksändras.
- [ ] Fönster kan snäppas till vänster/höger skärmkant.
- [ ] Högerklicksmenyer använder konsekvent Windows-lik design.

## Ikoner

- [ ] FakeWins systemikoner laddas från officiella Microsoft Fluent UI System Icons i `assets/icons/fluent/`.
- [ ] Fluent-assetkatalogen innehåller Microsofts MIT-licens och källhänvisning.
- [ ] Start använder en officiell Microsoft Fluent app-grid-symbol.
- [ ] Utforskaren har mapp/Explorer-lik ikon.
- [ ] Mappar använder konsekvent mappikon.
- [ ] Pictures/Foton har bildikon.
- [ ] Papperskorgen har papperskorgsikon.
- [ ] Kalkylator har kalkylatorikon.
- [ ] Anteckningar har anteckningsikon.
- [ ] E-post har kuvertikon.
- [ ] Inställningar har kugghjulsikon.
- [ ] Google Chrome har korrekt igenkännbar Chrome-identitet.
- [ ] PDF, ZIP, bild och textfiler har separata filtypsikoner.
- [ ] USB-enhet, OneDrive, nätverk, ljud och batteri har egna systemikoner.
- [ ] Ikoner används konsekvent på skrivbord, Start, aktivitetsfält, Utforskaren, Inställningar, Skärmklippverktyget och fönster.
- [ ] Inga egenritade ersättnings-SVG:er används för systemikoner där en Fluent-asset är mappad.
- [ ] Chrome hanteras separat som produktbranding och utges inte för att vara en Microsoft Fluent-ikon.

## Riktig fästning

- [ ] Google Chrome kan högerklickas i Start.
- [ ] Snabbmenyn visar **Fäst i aktivitetsfältet** när appen inte är fäst.
- [ ] Appen visas i aktivitetsfältet efter fästning.
- [ ] Högerklick på fäst app visar **Lossa från aktivitetsfältet**.
- [ ] Fäst/lossa ändrar verklig simulator-state.
- [ ] Fäst state sparas mellan sidladdningar.
- [ ] Starta om progress återställer även shell/pin-state.
- [ ] Lektionen för fästning använder det riktiga Start-flödet och ingen specialknapp.

## Google Chrome

- [ ] Google Chrome finns som app i Start och aktivitetsfält.
- [ ] Chrome har egen igenkännbar ikon.
- [ ] Flikrad ligger visuellt i Chrome-fönstrets översta del.
- [ ] Ny flik fungerar.
- [ ] Stäng flik fungerar.
- [ ] Adressfält/omnibox fungerar.
- [ ] Bakåt fungerar.
- [ ] Framåt fungerar.
- [ ] Uppdatera fungerar.
- [ ] Bokmärke fungerar.
- [ ] Söksida fungerar.
- [ ] Länkar fungerar.
- [ ] Högerklick på länk visar **Kopiera länkadress**.
- [ ] Högerklick på länk visar **Öppna länk i ny flik**.
- [ ] Nedladdning skapar riktig virtuell fil i Downloads.
- [ ] Formulär och filuppladdning fungerar.
- [ ] Cookie-dialog fungerar.
- [ ] Chrome-fönstret kan dras från tom del av flikraden.
- [ ] Chrome kan snäppas till vänster/höger skärmkant.

## Utforskaren

- [ ] Vänsterspalten använder Windows-lika ikoner.
- [ ] Home, Documents, Pictures, Downloads, OneDrive och Papperskorgen fungerar.
- [ ] USB-enhet visas dynamiskt när scenario monterar den.
- [ ] Filer visar separata ikoner för text, bild, PDF, ZIP och installer.
- [ ] Högerklick på filer ger verkliga filkommandon.
- [ ] Kopiera/Klipp ut/Klistra in fungerar.
- [ ] ZIP visar **Extrahera alla…** i snabbmenyn.
- [ ] ZIP-extrahering skapar riktig virtuell mapp och filer.
- [ ] USB kan högerklickas och **Mata ut**.
- [ ] OneDrive fungerar som en riktig virtuell målplats för filflytt.

## Windows Inställningar

- [ ] Inställningar finns som app i Start.
- [ ] System-sidan visas.
- [ ] Nätverk och internet visas.
- [ ] Wi-Fi kan anslutas via HemmaNet + lösenord.
- [ ] Bluetooth och enheter visas.
- [ ] Headset kan paras via Lägg till enhet.
- [ ] Volym/mikrofon/kamera kan ställas in under System.
- [ ] Appar → Installerade appar visas.
- [ ] Windows Update visas.
- [ ] Väntande uppdatering kan startas om via Windows Update.

## PDF och utskrift

- [ ] PDF-fil öppnas från Utforskaren i PDF-visaren.
- [ ] PDF kan zoomas.
- [ ] Spara en kopia skapar en virtuell PDF.
- [ ] Skriv ut öppnar Windows-lik utskriftsdialog.
- [ ] Microsoft Print to PDF kan väljas.
- [ ] Utskrift till PDF skapar en virtuell PDF-fil.
- [ ] Kursmomenten använder dessa riktiga flöden.

## Installation och avinstallation

- [ ] .exe visas som installationsfil i Utforskaren.
- [ ] Dubbelklick öppnar installationsguide.
- [ ] Guiden har välkomstsida, villkor, installationsplats och Installera.
- [ ] Installerat program visas i Inställningar → Appar.
- [ ] ⋯-menyn kan användas för Avinstallera.
- [ ] Scenario kräver både installation och avinstallation.

## Skärmklippverktyget

- [ ] Skärmklippverktyget finns som FakeWin-app.
- [ ] Nytt startar skärmklipp.
- [ ] Ett rektangulärt område kan dras.
- [ ] Förhandsvisning visas.
- [ ] Spara skapar Skärmbild.png i Pictures.
- [ ] Kursmomentet använder appen i stället för specialknapp.

## Anteckningar och vardagsflöden

- [ ] Ctrl+Z observeras i Anteckningar.
- [ ] Ctrl+Y observeras i Anteckningar.
- [ ] Osparad text markeras som osparad.
- [ ] Stäng × med osparad text visar Spara / Spara inte / Avbryt.
- [ ] Dialog-lektionen använder den verkliga osparad-dialogen.
- [ ] Text kan markeras i Chrome och kopieras med Ctrl+C.
- [ ] Text kan klistras in i Anteckningar med Ctrl+V.
- [ ] Kopiera/klistra-lektionen använder Chrome + Anteckningar.

## Fel och program som inte svarar

- [ ] Rapportvisaren visar realistiskt FILE_IN_USE-fel.
- [ ] Eleven måste läsa feltexten och välja säker åtgärd.
- [ ] Fruset Rapportvisaren visar ett program som inte svarar.
- [ ] Klick på × öppnar Windows-lik **svarar inte**-dialog.
- [ ] **Vänta på programmet** fungerar.
- [ ] **Stäng programmet** fungerar.
- [ ] Rapportvisaren kan därefter startas igen via Start.
- [ ] Recovery-scenariot kräver vänta → stäng → starta igen.

## Regression / CI

- [ ] JavaScript syntax är grön.
- [ ] Scenario Engine smoke test är grön.
- [ ] Lesson Engine smoke test är grön.
- [ ] Full Course smoke test är grön.
- [ ] Event contract smoke test är grön.
- [ ] Everyday course smoke test är grön.
- [ ] Windows 11 realism smoke test är grön.
- [ ] GitHub Pages deploy är grön.
- [ ] Inga console errors under normal användning.
