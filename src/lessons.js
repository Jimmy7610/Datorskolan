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
  ];
})();