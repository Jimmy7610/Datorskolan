"use strict";

/*
  Realistic scenarios complete with the events the simulator actually emits, in every language.
  Names that the app generates (downloaded files, Wi‑Fi network, Bluetooth device …) come from the
  same translation keys as the scenario goals, so a translation can never silently break a lesson.
*/
const { loadCourse, assert, fakeRuntime, LOCALES } = require("./helpers/load");
const course = loadCourse();

LOCALES.forEach(function (locale) {
  const ui = window.DatorskolanI18n.dictionary(locale, "ui");
  const t = function (key) {
    assert(Object.prototype.hasOwnProperty.call(ui, key), locale + ": missing ui key " + key);
    return ui[key];
  };
  const scenarios = course.scenarios(locale);
  const byId = {};
  scenarios.forEach(function (s) { byId[s.id] = s; });

  Object.keys(byId).filter(function (id) { return id.indexOf("everyday-") === 0; }).forEach(function (id) {
    assert(!Object.prototype.hasOwnProperty.call(byId[id].start || {}, "everydayMode"),
      "Realism regression: " + id + " still uses a quiz surface instead of the real flow");
  });

  function complete(id, events, nodes) {
    assert(byId[id], "Missing scenario: " + id);
    const engine = new window.DatorskolanScenarioEngine(scenarios);
    const rt = fakeRuntime(nodes);
    engine.load(id, rt);
    events.forEach(function (entry) { engine.observe(entry[0], entry[1] || {}, rt); });
    assert(engine.active().status === "completed", locale + ": realistic scenario did not complete: " + id);
  }

  complete("everyday-pin-taskbar-01", [["shell.taskbarPinned", { appId: "browser" }]]);
  complete("everyday-snap-01", [["window.snapped", { appId: "browser", side: "left" }], ["window.snapped", { appId: "notepad", side: "right" }]]);
  complete("everyday-link-actions-01", [["browser.linkCopied", {}], ["browser.linkOpenedInNewTab", {}]]);
  complete("everyday-copy-paste-01", [["browser.textCopied", { text: t("chrome.info.phone") }], ["notepad.pasted", { text: t("chrome.info.phone") }]]);
  complete("everyday-undo-redo-01", [["notepad.input", { length: 5 }], ["notepad.undo", {}], ["notepad.redo", {}]]);
  complete("everyday-save-location-01", [["browser.downloaded", { name: t("chrome.download.fileName") }], ["folder.opened", { folderId: "downloads" }]]);
  complete("everyday-pdf-01", [["file.opened", { id: "file-pdf" }], ["pdf.zoomChanged", { zoom: 110 }], ["pdf.savedCopy", { name: t("pdf.copyName") }]],
    { "file-pdf": { id: "file-pdf", name: t("pdf.sampleName"), type: "file", fileType: "pdf" } });
  complete("everyday-print-pdf-01", [["print.pdfCreated", { name: t("pdf.printName"), printer: "Microsoft Print to PDF" }]]);
  complete("everyday-zip-01", [["archive.extracted", { sourceName: byId["everyday-zip-01"].fixtures[0].name }]]);
  complete("everyday-usb-01", [["file.copied", { parentId: "documents" }], ["device.usbEjected", { id: "usb-drive" }]]);
  complete("everyday-wifi-01", [["settings.wifiConnected", { network: t("settings.wifi.homeNetwork") }]]);
  complete("everyday-bluetooth-01", [["settings.bluetoothPaired", { device: t("settings.bt.headset") }]]);
  complete("everyday-audio-camera-01", [["settings.audioConfigured", { volume: 50, microphone: true, camera: true }]]);
  complete("everyday-install-01", [["software.installed", { appId: "exercise-program" }], ["software.uninstalled", { appId: "exercise-program" }]]);
  complete("everyday-cloud-01", [["file.moved", { parentId: "onedrive" }]]);
  complete("everyday-dialog-01", [["notepad.input", { length: 4 }], ["dialog.unsavedOpened", { appId: "notepad" }], ["dialog.unsavedChoice", { choice: "discard" }]]);
  complete("everyday-screenshot-01", [["screenshot.captured", { width: 300, height: 200 }], ["screenshot.saved", { name: t("snip.defaultName"), parentId: "pictures" }]]);
  complete("everyday-error-01", [["troubleshooting.errorOpened", { code: "FILE_IN_USE" }], ["troubleshooting.errorHandled", { choice: "close", code: "FILE_IN_USE" }]]);
  complete("everyday-restart-01", [["settings.updateRestarted", {}]]);
  complete("everyday-recovery-01", [["troubleshooting.waited", {}], ["troubleshooting.closedFrozen", {}], ["troubleshooting.restarted", {}]]);
  complete("windows-search-01", [["startMenu.searched", { queryNormalized: t("app.calculator").toLocaleLowerCase(locale) }]]);
  complete("final-independent-01", [
    ["browser.downloaded", { name: t("chrome.download.fileName") }],
    ["file.renamed", { name: byId["final-independent-01"].goal.goals[1].payload.name }],
    ["mail.attachmentAdded", { name: byId["final-independent-01"].goal.goals[1].payload.name }],
    ["mail.sent", { attachment: true, attachmentName: byId["final-independent-01"].goal.goals[1].payload.name }]
  ]);
});

console.log("Realism scenarios smoke test passed (" + LOCALES.join(", ") + ")");
