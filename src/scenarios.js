(function () {
  "use strict";

  window.DatorskolanScenarios = [
    {
      id: "files-create-folder-01",
      title: "Skapa mappen Semester",
      description: "Öppna Documents och skapa en ny mapp som heter Semester.",
      start: {
        explorerFolderId: "documents",
        openApps: ["explorer"]
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
        explorerFolderId: "documents",
        openApps: ["explorer"]
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
        explorerFolderId: "documents",
        openApps: ["explorer"]
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
,
    {
      id: "mouse-move-01",
      title: "Flytta muspekaren",
      description: "Flytta muspekaren en tydlig sträcka inne i träningsytan.",
      start: { mouseMode: "move", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.move.complete" }
    },
    {
      id: "mouse-target-01",
      title: "Träffa mål",
      description: "För muspekaren till tre mål i ordning.",
      start: { mouseMode: "target", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.target.complete" }
    },
    {
      id: "mouse-click-01",
      title: "Vänsterklick",
      description: "Klicka en gång med vänster musknapp på målet.",
      start: { mouseMode: "click", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.click.complete" }
    },
    {
      id: "mouse-double-01",
      title: "Dubbelklick",
      description: "Dubbelklicka på målet.",
      start: { mouseMode: "double", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.double.complete" }
    },
    {
      id: "mouse-right-01",
      title: "Högerklick",
      description: "Högerklicka på målet.",
      start: { mouseMode: "right", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.right.complete" }
    },
    {
      id: "mouse-scroll-01",
      title: "Scrolla",
      description: "Scrolla nedåt och sedan uppåt i träningsrutan.",
      start: { mouseMode: "scroll", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.scroll.complete" }
    },
    {
      id: "mouse-hold-01",
      title: "Klicka och håll",
      description: "Håll vänster musknapp nedtryckt tills mätaren är full.",
      start: { mouseMode: "hold", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.hold.complete" }
    },
    {
      id: "mouse-drag-01",
      title: "Dra och släpp",
      description: "Dra objektet till målområdet och släpp.",
      start: { mouseMode: "drag", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.drag.complete" }
    },
    {
      id: "mouse-final-01",
      title: "Mus – slutuppdrag",
      description: "Klara alla musmoment i följd utan steg-för-steg-instruktioner.",
      start: { mouseMode: "final", openApps: ["mouse-lab"] },
      fixtures: [],
      goal: { type: "event", eventType: "mouse.final.complete" }
    }
  ];
})();