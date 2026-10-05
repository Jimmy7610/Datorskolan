# Fullständig Windows-simulator – funktionsspecifikation

## Syfte

Datorskolan ska innehålla en interaktiv, fejkad Windows-miljö där användaren kan träna på verkliga datorbeteenden utan att något förändras på den riktiga datorn.

Simulatorn ska kännas som Windows och bete sig konsekvent, men all data och alla handlingar är simulerade.

## Grundregel

> Allt ska fungera som om det vore Windows – men inget får påverka det riktiga Windows-systemet.

Simulatorn får därför INTE:
- läsa användarens riktiga filer,
- skriva till användarens riktiga filer,
- starta riktiga Windows-program,
- ändra riktiga Windows-inställningar,
- installera något,
- kräva administratörsrättigheter.

## Simulerat skrivbord

Skrivbordet ska kunna innehålla Papperskorgen, Den här datorn, Dokument, Bilder, Nedladdningar, genvägar, egna mappar och egna filer.

Användaren ska kunna enkelklicka, dubbelklicka, högerklicka, dra ikoner, öppna kontextmeny, skapa ny mapp, byta namn och ta bort.

## Aktivitetsfält

Ska innehålla Start-knapp, sök, fästa appar, öppna appar, systemfält och klocka. Användaren ska kunna öppna Start, starta program, växla mellan program samt minimera och återställa fönster.

## Start-menyn

Ska stödja lista över appar, sökning, fästa appar och starta appar. Exempelappar: Utforskaren, Kalkylator, Anteckningar, Bilder, Paint-liknande app, Inställningar, Webbläsare och E-post.

## Fönsterhantering

Varje fönster ska kunna flyttas, minimeras, maximeras, återställas, stängas och ändra storlek. Fönster ska ha titelrad, ikon, minimera, maximera och stäng.

Senare: snap layouts, Alt+Tab och flera fönster sida vid sida.

## Virtuellt filsystem

Simulatorn ska ha ett eget filsystem i JavaScript.

```text
C:
└── Users
    └── Elev
        ├── Desktop
        ├── Documents
        ├── Downloads
        ├── Pictures
        └── Music
```

Objekt kan vara folder, text-file, image, shortcut, fake-download och recycle-bin-item.

## Filsystemoperationer

Användaren ska kunna skapa mapp, skapa textfil, öppna, byta namn, kopiera, klippa ut, klistra in, dra och släppa, radera, återställa från Papperskorgen och tömma Papperskorgen.

## Sparprincip

### Träningsläge
Ändringar finns bara under aktuell övning/session. Vid reset återställs simulatorn till definierat startläge.

### Progressionsläge
Utbildningsprogress får sparas i localStorage, exempelvis lektion klar, mastery score och aktuell modul. Simulatorns data är fortfarande fejkad.

## Sandbox-scenarier

Varje lektion ska kunna starta simulatorn från ett definierat scenario.

```json
{
  "scenarioId": "files-create-folder-01",
  "desktop": [{"type":"folder","name":"Bilder"}],
  "task": "Skapa en ny mapp som heter Semester."
}
```

## Utforskaren

Ska kunna navigera mellan mappar, bakåt/framåt, adressrad, breadcrumbs, lista filer, ikonvy, markera objekt, skapa mapp, byta namn, kopiera, flytta och radera.

## Kalkylator

Ska fungera i simulatorn med siffror, +, -, ×, ÷, decimal, clear och equals.

## Anteckningar

Ska stödja skriva, markera text, Backspace, Enter, Ctrl+A, Ctrl+C, Ctrl+V och spara till virtuellt filsystem.

## Paint-liknande app

MVP: rita, sudda, färgval och spara en fejkad bildfil.

## Bilder

Öppna simulerade bilder, nästa/föregående och zoom.

## Webbläsare

Säker simulerad webbläsare med adressfält, bakåt, framåt, flikar, länkar, fejkad download/upload och formulär. Webbsidor kommer från simulatorns egna scenarier.

## E-post

Simulerad inkorg där användaren kan öppna mejl, svara, skriva nytt, bifoga virtuell fil, ladda ner virtuell bilaga och göra spam/phishingövningar. Ingen riktig e-post skickas.

## Kontextmenyer

Högerklick ska ge relevanta menyval för skrivbord och filer. Alla menyval behöver inte finnas i MVP, men beteendet ska vara realistiskt.

## Händelsesystem

Exempel:
- `desktop.item.selected`
- `desktop.item.doubleClicked`
- `contextMenu.opened`
- `file.created`
- `file.renamed`
- `file.moved`
- `file.deleted`
- `recycleBin.restored`
- `app.opened`
- `window.minimized`
- `window.maximized`
- `window.closed`
- `calculator.result`
- `notepad.saved`
- `browser.tabOpened`
- `mail.attachmentAdded`

Lesson Engine ska lyssna på dessa istället för att hårdkoda simulatorlogik i varje lektion.

## State

```js
const simulatorState = {
  filesystem: {},
  windows: [],
  activeWindowId: null,
  clipboard: null,
  startMenuOpen: false,
  selectedDesktopItemId: null
};
```

## Återställning

`simulator.resetScenario()` ska stänga fönster, rensa clipboard, återställa filsystem, skrivbord och appar.

## Designprincip

Simulatorn ska vara realistisk nog för överförbar kunskap, enkel nog för nybörjare, deterministisk för tester och frikopplad från riktiga Windows.

## Acceptanskriterium

Användaren ska helt i simulatorn kunna öppna Start, starta Utforskaren, skapa `Semester`, öppna Anteckningar, skriva och spara `plan.txt`, hitta filen, byta namn, radera, öppna Papperskorgen och återställa filen. Inget får påverka den riktiga datorn.
