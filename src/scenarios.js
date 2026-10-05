(function () {
  "use strict";

  window.DatorskolanScenarios = [
    {
      id: "files-create-folder-01",
      title: "Skapa mappen Semester",
      description: "Öppna Documents och skapa en ny mapp som heter Semester.",
      start: {
        explorerFolderId: "documents"
      },
      fixtures: [],
      goal: {
        type: "node-exists",
        parentId: "documents",
        nodeType: "folder",
        name: "Semester"
      }
    },
    {
      id: "notepad-save-file-01",
      title: "Spara plan.txt",
      description: "Skapa eller öppna Anteckningar, skriv något och spara filen som plan.txt i Documents.",
      start: {
        explorerFolderId: "documents"
      },
      fixtures: [],
      goal: {
        type: "text-file-exists",
        parentId: "documents",
        name: "plan.txt",
        requireContent: true
      }
    },
    {
      id: "recycle-restore-01",
      title: "Radera och återställ",
      description: "Radera Övningsfil.txt och återställ den sedan från Papperskorgen.",
      start: {
        explorerFolderId: "documents"
      },
      fixtures: [
        {
          kind: "file",
          parentId: "documents",
          name: "Övningsfil.txt",
          fileType: "text",
          content: "Den här filen ska raderas och återställas."
        }
      ],
      goal: {
        type: "event",
        eventType: "recycleBin.restored",
        nodeName: "Övningsfil.txt"
      }
    }
  ];
})();