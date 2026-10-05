(function () {
  "use strict";

  window.DatorskolanLessons = [
    {
      id: "files-001-create-folder",
      moduleId: "files",
      title: "Skapa en mapp",
      summary: "Lär dig skapa en ny mapp och ge den ett tydligt namn.",
      skills: ["files.create-folder"],
      audience: ["child","standard","fast"],
      scenarioId: "files-create-folder-01",
      steps: [
        {
          type: "instruction",
          title: "Vad är en mapp?",
          text: "En mapp hjälper dig att samla filer på ett ställe. Nu ska du skapa en egen mapp i Documents."
        },
        {
          type: "demonstration",
          title: "Så går det till",
          text: "I Utforskaren använder du knappen + Ny mapp. När namn-rutan visas skriver du namnet och bekräftar.",
          visualTarget: ".explorer-toolbar"
        },
        {
          type: "exercise",
          title: "Din tur",
          text: "Skapa en mapp som heter Semester.",
          validator: { type: "scenario-complete" },
          hints: [
            "Leta efter en knapp som skapar något nytt.",
            "Titta högst upp i Utforskaren.",
            "Klicka på + Ny mapp och skriv Semester.",
            "Markeringen visar området där knappen finns.",
            "Gör så här: + Ny mapp → skriv Semester → OK."
          ],
          visualTarget: ".explorer-toolbar"
        },
        {
          type: "checkpoint",
          title: "Kontroll",
          text: "Bra. Mappen finns nu i Documents."
        },
        {
          type: "completion",
          title: "Klart",
          text: "Du har skapat och namngett en mapp."
        }
      ]
    },
    {
      id: "programs-001-notepad-save",
      moduleId: "programs",
      title: "Skriv och spara en textfil",
      summary: "Öppna Anteckningar, skriv text och spara den som plan.txt.",
      skills: ["programs.notepad","files.save"],
      audience: ["child","standard","fast"],
      scenarioId: "notepad-save-file-01",
      steps: [
        {
          type: "instruction",
          title: "Spara ditt arbete",
          text: "När du skriver i Anteckningar finns texten först bara i programmet. Genom att spara skapar du en fil."
        },
        {
          type: "demonstration",
          title: "Anteckningar",
          text: "Öppna Notepad från Start, skriv några ord och använd Spara som.",
          visualTarget: "[aria-label='Start']"
        },
        {
          type: "exercise",
          title: "Din tur",
          text: "Skriv valfri text och spara filen som plan.txt.",
          validator: { type: "scenario-complete" },
          hints: [
            "Du behöver använda programmet Notepad.",
            "Öppna Start och välj Notepad.",
            "Skriv text och klicka på Spara som.",
            "När Notepad är öppet finns sparknapparna högst upp.",
            "Start → Notepad → skriv text → Spara som → plan.txt → OK."
          ],
          visualTarget: ".notepad-toolbar"
        },
        {
          type: "completion",
          title: "Klart",
          text: "Du har skapat och sparat en textfil."
        }
      ]
    },
    {
      id: "files-002-recycle-restore",
      moduleId: "files",
      title: "Återställ från Papperskorgen",
      summary: "Radera en fil och återställ den igen.",
      skills: ["files.delete","files.recycle-restore"],
      audience: ["child","standard","fast"],
      scenarioId: "recycle-restore-01",
      steps: [
        {
          type: "instruction",
          title: "Papperskorgen",
          text: "När du tar bort en vanlig fil hamnar den först i Papperskorgen. Därifrån kan den återställas."
        },
        {
          type: "exercise",
          title: "Radera och återställ",
          text: "Radera Övningsfil.txt och återställ den från Papperskorgen.",
          validator: { type: "scenario-complete" },
          hints: [
            "Börja med filen Övningsfil.txt i Documents.",
            "Markera filen och använd Ta bort.",
            "Öppna sedan Recycle Bin.",
            "I Papperskorgen finns knappen Återställ.",
            "Markera Övningsfil.txt → Ta bort → Recycle Bin → markera filen → Återställ."
          ],
          visualTarget: ".explorer-toolbar"
        },
        {
          type: "completion",
          title: "Klart",
          text: "Du kan nu återställa en borttagen fil."
        }
      ]
    }
,
    {
      id: "mouse-001-move",
      moduleId: "mouse",
      title: "Muspekaren",
      summary: "Se hur musens rörelse flyttar pekaren på skärmen.",
      skills: ["mouse.move"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-move-01",
      steps: [
        {
          type: "instruction",
          title: "Muspekaren följer din hand",
          text: "När du flyttar musen på bordet flyttar sig den lilla pekaren på skärmen."
        },
        {
          type: "demonstration",
          title: "Prova en liten rörelse",
          text: "Flytta musen åt olika håll inne i träningsytan.",
          visualTarget: ".mouse-lab-stage"
        },
        {
          type: "exercise",
          title: "Flytta pekaren",
          text: "Flytta muspekaren runt i träningsytan tills mätaren är full.",
          validator: { type: "scenario-complete" },
          hints: [
            "Rör musen lugnt åt något håll.",
            "Håll pekaren inne i den stora träningsytan.",
            "Flytta musen fram och tillbaka några gånger.",
            "Den markerade ytan är där rörelsen mäts.",
            "Lägg handen på musen och för den långsamt åt höger och vänster tills mätaren når 100%."
          ],
          visualTarget: ".mouse-lab-stage"
        },
        { type: "completion", title: "Klart", text: "Du vet nu att musens rörelse styr pekaren." }
      ]
    },
    {
      id: "mouse-002-target",
      moduleId: "mouse",
      title: "Träffa ett mål",
      summary: "Öva på att styra pekaren dit du vill.",
      skills: ["mouse.move","mouse.precision"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-target-01",
      steps: [
        { type: "instruction", title: "Styr pekaren", text: "Nu ska du träna precision. För pekaren till ett mål utan att klicka." },
        {
          type: "exercise",
          title: "Träffa tre mål",
          text: "För pekaren till mål 1, sedan 2 och sedan 3.",
          validator: { type: "scenario-complete" },
          hints: [
            "Börja med den cirkel som har siffran 1.",
            "Du behöver bara flytta pekaren över målet.",
            "Ta ett mål i taget i nummerordning.",
            "Det aktiva målet är tydligt markerat.",
            "För pekaren över 1 → 2 → 3. Du ska inte klicka."
          ],
          visualTarget: ".mouse-target-field"
        },
        { type: "completion", title: "Klart", text: "Du kan styra pekaren till en bestämd plats." }
      ]
    },
    {
      id: "mouse-003-click",
      moduleId: "mouse",
      title: "Vänsterklick",
      summary: "Lär dig klicka en gång med vänster musknapp.",
      skills: ["mouse.left-click"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-click-01",
      steps: [
        { type: "instruction", title: "Ett klick", text: "Ett vanligt klick görs med vänster musknapp. Tryck ned och släpp en gång." },
        {
          type: "exercise",
          title: "Klicka en gång",
          text: "Klicka exakt en gång på målet.",
          validator: { type: "scenario-complete" },
          hints: [
            "Använd knappen på vänster sida av musen.",
            "För pekaren till målet först.",
            "Tryck ned vänster musknapp och släpp direkt.",
            "Målet är markerat i träningsytan.",
            "Pekare på målet → tryck vänster knapp en gång → släpp."
          ],
          visualTarget: ".mouse-mode-click .big-target"
        },
        { type: "completion", title: "Klart", text: "Du kan göra ett vanligt vänsterklick." }
      ]
    },
    {
      id: "mouse-004-double-click",
      moduleId: "mouse",
      title: "Dubbelklick",
      summary: "Öppna saker med två snabba klick på samma plats.",
      skills: ["mouse.double-click"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-double-01",
      steps: [
        { type: "instruction", title: "Två snabba klick", text: "Ett dubbelklick är två vänsterklick snabbt efter varandra utan att flytta pekaren." },
        {
          type: "exercise",
          title: "Dubbelklicka",
          text: "Dubbelklicka på målet.",
          validator: { type: "scenario-complete" },
          hints: [
            "Det behövs två klick.",
            "Båda klicken ska vara på samma mål.",
            "Klicka två gånger snabbt med vänster musknapp.",
            "Målet är markerat.",
            "Håll pekaren stilla över målet och klicka snabbt två gånger: klick-klick."
          ],
          visualTarget: ".mouse-mode-double .big-target"
        },
        { type: "completion", title: "Klart", text: "Du kan dubbelklicka." }
      ]
    },
    {
      id: "mouse-005-right-click",
      moduleId: "mouse",
      title: "Högerklick",
      summary: "Lär dig använda musens högra knapp.",
      skills: ["mouse.right-click"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-right-01",
      steps: [
        { type: "instruction", title: "Den andra musknappen", text: "Högerklick används ofta för att visa fler val. Den här gången ska du använda höger musknapp." },
        {
          type: "exercise",
          title: "Högerklicka",
          text: "Högerklicka på målet.",
          validator: { type: "scenario-complete" },
          hints: [
            "Använd inte vänster musknapp den här gången.",
            "För pekaren till målet först.",
            "Tryck en gång på knappen på musens högra sida.",
            "Det markerade målet väntar på ett högerklick.",
            "Pekare på målet → tryck höger musknapp en gång → släpp."
          ],
          visualTarget: ".mouse-mode-right .big-target"
        },
        { type: "completion", title: "Klart", text: "Du känner skillnaden mellan vänster- och högerklick." }
      ]
    },
    {
      id: "mouse-006-scroll",
      moduleId: "mouse",
      title: "Scrolla",
      summary: "Rulla innehåll nedåt och uppåt med scrollhjulet.",
      skills: ["mouse.scroll"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-scroll-01",
      steps: [
        { type: "instruction", title: "Scrollhjulet", text: "Hjulet mellan musknapparna används för att flytta en sida uppåt och nedåt." },
        {
          type: "exercise",
          title: "Ned och upp",
          text: "Scrolla först nedåt i rutan och sedan uppåt igen.",
          validator: { type: "scenario-complete" },
          hints: [
            "Lägg pekaren över rutan med rader.",
            "Rulla hjulet bort från dig för att gå nedåt.",
            "När du har gått nedåt, rulla åt andra hållet.",
            "Den markerade rutan är det område som ska scrollas.",
            "Pekaren i rutan → scrolla ned → scrolla sedan upp."
          ],
          visualTarget: ".mouse-scroll-box"
        },
        { type: "completion", title: "Klart", text: "Du kan scrolla i båda riktningarna." }
      ]
    },
    {
      id: "mouse-007-hold",
      moduleId: "mouse",
      title: "Klicka och håll",
      summary: "Öva på att hålla vänster musknapp nedtryckt.",
      skills: ["mouse.hold"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-hold-01",
      steps: [
        { type: "instruction", title: "Håll knappen nere", text: "Ibland ska du inte släppa musknappen direkt. Du trycker ned och håller kvar." },
        {
          type: "exercise",
          title: "Håll tills mätaren är full",
          text: "Tryck ned vänster musknapp på målet och håll kvar.",
          validator: { type: "scenario-complete" },
          hints: [
            "Tryck på målet med vänster musknapp.",
            "Släpp inte direkt.",
            "Håll knappen nere ungefär en sekund.",
            "Målet och mätaren är markerade.",
            "Pekare på målet → tryck ned vänster knapp → håll kvar tills mätaren är full."
          ],
          visualTarget: ".mouse-mode-hold .big-target"
        },
        { type: "completion", title: "Klart", text: "Du kan hålla musknappen nedtryckt." }
      ]
    },
    {
      id: "mouse-008-drag",
      moduleId: "mouse",
      title: "Dra och släpp",
      summary: "Flytta ett objekt genom att hålla, dra och släppa.",
      skills: ["mouse.hold","mouse.drag-drop"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-drag-01",
      steps: [
        { type: "instruction", title: "Klicka, håll, dra, släpp", text: "För att flytta något håller du vänster musknapp nere medan du rör musen. Sedan släpper du." },
        {
          type: "exercise",
          title: "Flytta rutan",
          text: "Dra den blå rutan till målområdet och släpp den där.",
          validator: { type: "scenario-complete" },
          hints: [
            "Börja på den blå rutan.",
            "Tryck ned vänster musknapp och håll kvar.",
            "Flytta musen mot området som säger Släpp här.",
            "Startobjektet och målområdet är markerade.",
            "Tryck och håll på Dra mig → dra till Släpp här → släpp musknappen."
          ],
          visualTarget: ".mouse-drag-field"
        },
        { type: "completion", title: "Klart", text: "Du kan dra och släppa ett objekt." }
      ]
    },
    {
      id: "mouse-009-final",
      moduleId: "mouse",
      title: "Mus – slutuppdrag",
      summary: "Visa att du kan använda musens viktigaste funktioner självständigt.",
      skills: ["mouse.move","mouse.left-click","mouse.double-click","mouse.right-click","mouse.scroll","mouse.drag-drop"],
      audience: ["child","standard","fast"],
      scenarioId: "mouse-final-01",
      steps: [
        {
          type: "instruction",
          title: "Nu gör du själv",
          text: "Slutuppdraget innehåller sex moment. Du får välja ordning och får inga detaljerade instruktioner."
        },
        {
          type: "exercise",
          title: "Klara alla sex moment",
          text: "Flytta, klicka, dubbelklicka, högerklicka, scrolla och dra/släpp i träningsytan.",
          validator: { type: "scenario-complete" },
          hints: [
            "Titta på namnen på de sex rutorna.",
            "Varje ruta tränar en musfunktion du redan har gjort.",
            "Arbeta igenom de rutor som ännu inte fått en bock.",
            "Använd de markerade områdena en i taget.",
            "Flytta i Flytta-rutan, enkelklicka Klick, dubbelklicka Dubbelklick, högerklicka Högerklick, scrolla ned/upp i Scroll och dra Dra till Släpp."
          ],
          visualTarget: ".mouse-final-grid"
        },
        {
          type: "completion",
          title: "Musmodulen är klar",
          text: "Du har använt musens viktigaste funktioner i ett självständigt uppdrag."
        }
      ]
    }
  ];
})();