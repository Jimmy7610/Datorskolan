"use strict";

/*
  FakeWin realism details that are easy to break: submenus, desktop View / Sort by, File Explorer
  Sort / View, the calendar, Start labels, window resizing and snap layouts.
*/
const fs = require("fs");
const path = require("path");
const { load, assert, ROOT } = require("./helpers/load");

global.window = global;
load(["src/i18n.js", "locales/sv/ui.js", "locales/sv/fakewin.js", "locales/en/ui.js", "locales/en/fakewin.js", "src/explorer-app.js"]);
const I18n = window.DatorskolanI18n;
const read = function (file) { return fs.readFileSync(path.join(ROOT, file), "utf8"); };
const app = read("src/app.js");
const explorer = read("src/explorer-app.js");
const css = read("styles/fakewin.css");

/* Context menus: submenus with the WAI-ARIA menu pattern */
assert(app.indexOf('haspopup: hasSub ? "menu" : null') >= 0 && app.indexOf('expanded: hasSub ? "false" : null') >= 0, "Submenu items must expose aria-haspopup and aria-expanded");
assert(/hasSub && \(e\.key === "ArrowRight" \|\| e\.key === "Enter"/.test(app), "→ / Enter must open a submenu");
assert(/isSub && \(e\.key === "ArrowLeft" \|\| e\.key === "Escape"\)/.test(app) && app.indexOf("closeSub(true)") >= 0, "← / Esc must close a submenu and return focus to its parent");
assert(app.indexOf('item.radio ? "menuitemradio"') >= 0, "Radio menu items (icon size, sort order) use menuitemradio");
assert(app.indexOf('ui.glyph("chevron-right", 12)') >= 0, "Submenu items show the chevron");

/* Desktop right-click: View and Sort by are real submenus */
assert(app.indexOf('submenu: desktopViewMenu()') >= 0 && app.indexOf('submenu: desktopSortMenu()') >= 0, "Desktop View and Sort by must be submenus");
["large", "medium", "small", "autoArrange", "alignToGrid", "showIcons"].forEach(function (key) {
  assert(app.indexOf('t("desktop.view.' + key + '")') >= 0, "Desktop View menu missing " + key);
});
assert(app.indexOf('["name", "size", "type", "date"]') >= 0, "Desktop Sort by must offer Name, Size, Item type, Date modified");
assert(app.indexOf("state.desktopView = freshDesktopView();") >= 0, "Scenario reset must restore the standard desktop layout so lessons stay robust");
assert(app.indexOf("function startDesktopMarquee") >= 0 && /\.fw-desktop-marquee\{/.test(css), "Dragging on the desktop must draw a selection rectangle");

/* File Explorer: Sort and View */
assert(explorer.indexOf('"explorer-sort"') >= 0 && explorer.indexOf('"explorer-view"') >= 0, "Explorer command bar needs Sort and View");
const ExplorerApp = window.DatorskolanExplorerApp;
function fakeCtx() {
  return {
    I18n: I18n,
    displayName: function (n) { return n.name; },
    fileTypeLabel: function (n) { return n.type === "folder" ? "Mapp" : n.name.split(".").pop(); },
    nodeIconKey: function (n) { return n.type === "folder" ? "folder" : n.name.endsWith(".pdf") ? "pdf" : "text-file"; }
  };
}
const nodes = [
  { id: "1", name: "b.txt", type: "file", content: "x".repeat(3000), createdAt: 3 },
  { id: "2", name: "Zeta", type: "folder", createdAt: 1 },
  { id: "3", name: "a.pdf", type: "file", content: "", createdAt: 2 },
  { id: "4", name: "Alfa", type: "folder", createdAt: 4 }
];
const names = function (list) { return list.map(function (n) { return n.name; }).join(","); };
assert(names(ExplorerApp.sortNodes(fakeCtx(), nodes, { by: "name", dir: "asc" })) === "Alfa,Zeta,a.pdf,b.txt", "Sort by name keeps folders first");
assert(names(ExplorerApp.sortNodes(fakeCtx(), nodes, { by: "name", dir: "desc" })) === "Zeta,Alfa,b.txt,a.pdf", "Descending sorts within folders and files");
assert(names(ExplorerApp.sortNodes(fakeCtx(), nodes, { by: "modified", dir: "asc" })) === "Zeta,Alfa,a.pdf,b.txt", "Sort by date modified");
assert(names(ExplorerApp.sortNodes(fakeCtx(), nodes, { by: "size", dir: "desc" })) === "Zeta,Alfa,a.pdf,b.txt", "Sort by size (a PDF without content counts as a typical PDF size)");
assert(ExplorerApp.currentView({ folderId: "documents", view: null }) === "details" && ExplorerApp.currentView({ folderId: "pictures", view: null }) === "large",
  "Default views: details for documents, large icons for pictures (lessons rely on this)");
assert(ExplorerApp.currentView({ folderId: "documents", view: "list" }) === "list", "A chosen view is used");

/* Calendar */
assert(app.indexOf('data: { ui: "calendar-previous" }') >= 0 && app.indexOf('data: { ui: "calendar-next" }') >= 0, "Calendar needs previous / next month buttons");
assert(/ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7/.test(app) && app.indexOf('e.key === "PageUp"') >= 0, "Calendar days must be reachable with arrow keys and Page Up / Page Down");
assert(app.indexOf("for (var row = 0; row < 6; row++)") >= 0, "Calendar shows six weeks like Windows 11");

/* Start: long names on one line with an ellipsis, full name as tooltip */
assert(/\.fw-start-tile-label\{[^}]*white-space:nowrap[^}]*text-overflow:ellipsis/.test(css), "Start tile names must not break mid-word");
assert(/class: "fw-start-tile",\s*title: appTitle\(id\)/.test(app), "Start tiles show the full name as a tooltip");

/* Every new string exists in both languages */
["desktop.view.large", "desktop.view.medium", "desktop.view.small", "desktop.view.autoArrange", "desktop.view.alignToGrid", "desktop.view.showIcons",
 "desktop.sort.name", "desktop.sort.size", "desktop.sort.type", "desktop.sort.date",
 "explorer.sort", "explorer.view", "explorer.sort.asc", "explorer.sort.desc", "explorer.view.list", "explorer.view.details", "explorer.col.size", "explorer.sizeKb",
 "calendar.previousMonth", "calendar.nextMonth"].forEach(function (key) {
  ["sv", "en"].forEach(function (locale) { assert(key in I18n.dictionary(locale, "ui"), locale + " missing " + key); });
});

/* Windows: resize from every edge and corner; snap layouts from the Maximize button */
assert(app.indexOf('["n", "s", "e", "w", "ne", "nw", "se", "sw"]') >= 0, "Windows must resize from all four edges and corners");
assert(app.indexOf('dir === "se" ? " fw-resize-grip" : ""') >= 0, "The bottom-right handle keeps .fw-resize-grip (the resize lesson highlights it)");
["ns-resize", "ew-resize", "nesw-resize", "nwse-resize"].forEach(function (cursor) { assert(css.indexOf("cursor:" + cursor) >= 0, "Resize cursor missing: " + cursor); });
assert(/emit\("window\.resized"/.test(app), "Resizing must still emit window.resized");
assert(app.indexOf('e.pointerType === "touch"') >= 0, "Snap layouts open on hover only for mouse/pen, never on a touch tap");
assert(app.indexOf('e.key !== "ArrowDown"') >= 0, "↓ on a focused Maximize button opens the snap layouts");
assert(/side = name === "left" \|\| name === "leftLarge" \? "left"/.test(app), "Snap layouts keep the side: left/right contract of window.snapped");
["window.snapLayouts", "window.snap.left", "window.snap.right", "window.snap.leftLarge", "window.snap.rightSmall",
 "window.snap.topLeft", "window.snap.topRight", "window.snap.bottomLeft", "window.snap.bottomRight"].forEach(function (key) {
  ["sv", "en"].forEach(function (locale) { assert(key in I18n.dictionary(locale, "ui"), locale + " missing " + key); });
});

console.log("FakeWin polish smoke test passed");
