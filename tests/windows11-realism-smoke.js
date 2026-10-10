"use strict";

/*
  Windows 11 realism: licensed icons, authentic terminology and behaviour that the course teaches.
*/
const fs = require("fs");
const path = require("path");
const { load, assert, ROOT } = require("./helpers/load");

global.localStorage = {
  _data: {},
  getItem: function (k) { return this._data[k] || null; },
  setItem: function (k, v) { this._data[k] = String(v); },
  removeItem: function (k) { delete this._data[k]; }
};
load(["src/win11-ui.js", "src/i18n.js", "locales/sv/ui.js", "locales/sv/fakewin.js", "locales/en/ui.js", "locales/en/fakewin.js"]);

const ui = window.DatorskolanWindows11;
assert(ui.FLUENT_ROOT === "./assets/icons/fluent/", "Unexpected Fluent asset root");

Object.keys(ui.fluentIcons).forEach(function (name) {
  const markup = ui.icon(name, 24);
  assert(/assets\/icons\/fluent(-color|-derived)?\//.test(markup), "System icon is not Fluent-backed: " + name);
  assert(fs.existsSync(path.join(ROOT, "assets/icons/fluent", ui.fluentIcons[name])), "Missing Fluent asset file: " + ui.fluentIcons[name]);
  assert(/alt="" aria-hidden="true"/.test(markup), "Icons are decorative and must be hidden from assistive tech: " + name);
});

assert(ui.CHROME_LOGO_URL === "https://www.google.com/chrome/static/images/chrome-logo-m100.svg", "Chrome logo must use Google's official asset URL");
assert(ui.icon("chrome", 24).indexOf("assets/icons/fluent/") < 0, "Chrome must not pretend to be a Microsoft Fluent icon");
assert(fs.existsSync(path.join(ROOT, "assets/icons/fluent/LICENSE")), "Fluent license missing");
const source = fs.readFileSync(path.join(ROOT, "assets/icons/fluent/SOURCE.md"), "utf8");
assert(source.indexOf("microsoft/fluentui-system-icons") >= 0 && source.indexOf("08130c218d6bb87767d6d5616d9afcea651146c7") >= 0, "Fluent provenance not documented");
assert(fs.existsSync(path.join(ROOT, "docs/38-ASSETS-AND-LICENSES.md")), "Asset and licence inventory missing");

// Colour icons: Microsoft's own colour set, or Fluent filled shapes recoloured (documented as derived).
assert(ui.ICON_ROOT === "./assets/icons/", "Unexpected icon root");
["fluent-color", "fluent-derived"].forEach(function (dir) {
  const license = fs.readFileSync(path.join(ROOT, "assets/icons", dir, "LICENSE"), "utf8");
  assert(license.indexOf("MIT") >= 0 && license.indexOf("Microsoft Corporation") >= 0, dir + " LICENSE missing or wrong");
  assert(fs.existsSync(path.join(ROOT, "assets/icons", dir, "SOURCE.md")), dir + " SOURCE.md missing");
});
const colorSources = {
  "fluent-color": fs.readFileSync(path.join(ROOT, "assets/icons/fluent-color/SOURCE.md"), "utf8"),
  "fluent-derived": fs.readFileSync(path.join(ROOT, "assets/icons/fluent-derived/SOURCE.md"), "utf8")
};
Object.keys(ui.colorIcons).forEach(function (name) {
  const ref = ui.colorIcons[name];
  const dir = ref.split("/")[0];
  assert(colorSources[dir] !== undefined, "Colour icon outside a documented folder: " + name + " → " + ref);
  ["-small.svg", "-large.svg"].forEach(function (suffix) {
    const file = ref.split("/")[1] + suffix;
    assert(fs.existsSync(path.join(ROOT, "assets/icons", dir, file)), "Missing colour icon file: " + dir + "/" + file);
    assert(colorSources[dir].indexOf("`" + file + "`") >= 0, "Colour icon not documented in " + dir + "/SOURCE.md: " + file);
    if (dir === "fluent-derived") {
      assert(fs.readFileSync(path.join(ROOT, "assets/icons", dir, file), "utf8").indexOf("Derived from Microsoft Fluent UI System Icons (MIT)") >= 0, "Derived icon is not marked as derived: " + file);
    }
  });
  assert(ui.icon(name, 16).indexOf(ref + "-small.svg") >= 0 && ui.icon(name, 48).indexOf(ref + "-large.svg") >= 0, "Colour icon size selection broken: " + name);
});
// Tray icons stay monochrome, like Windows 11.
["wifi", "speaker", "battery"].forEach(function (name) {
  assert(!ui.colorIcons[name], "Tray icon " + name + " must stay monochrome like Windows 11");
});

// No emoji or ad-hoc Unicode pictographs as icons anywhere in the simulator.
fs.readdirSync(path.join(ROOT, "src")).filter(function (n) { return /\.js$/.test(n); }).forEach(function (name) {
  const text = fs.readFileSync(path.join(ROOT, "src", name), "utf8");
  assert(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(text.replace(/[✓]/g, "")), name + " uses emoji/pictographs as icons");
});

// Windows 11 terminology (Swedish and English UI).
const sv = window.DatorskolanI18n.dictionary("sv", "ui");
const en = window.DatorskolanI18n.dictionary("en", "ui");
[
  ["app.explorer", "Utforskaren", "File Explorer"],
  ["app.recycleBin", "Papperskorgen", "Recycle Bin"],
  ["vfs.documents", "Dokument", "Documents"],
  ["vfs.downloads", "Hämtade filer", "Downloads"],
  ["vfs.pictures", "Bilder", "Pictures"],
  ["explorer.new", "Nytt", "New"],
  ["explorer.newFolderName", "Ny mapp", "New folder"],
  ["explorer.emptyRecycleBin", "Töm Papperskorgen", "Empty Recycle Bin"],
  ["settings.page.network", "Nätverk och internet", "Network & internet"],
  ["start.searchPlaceholder", "Sök efter appar, inställningar och dokument", "Search for apps, settings and documents"]
].forEach(function (row) {
  assert(sv[row[0]] === row[1], "Swedish Windows term changed for " + row[0] + ": " + sv[row[0]]);
  assert(en[row[0]] === row[2], "English Windows term changed for " + row[0] + ": " + en[row[0]]);
});

// Behaviour the course teaches must exist in the simulator.
const explorer = fs.readFileSync(path.join(ROOT, "src/explorer-app.js"), "utf8");
[['key === "F2"', "F2 rename"], ['key === "Delete"', "Delete key"], ['lower === "c"', "Ctrl+C"], ['lower === "x"', "Ctrl+X"], ['lower === "v"', "Ctrl+V"],
  ['e.shiftKey && lower === "n"', "Ctrl+Shift+N"], ['key === "Enter"', "Enter opens"], ["explorer-rename", "inline rename"]].forEach(function (entry) {
  assert(explorer.indexOf(entry[0]) >= 0, "Explorer is missing " + entry[1]);
});
const app = fs.readFileSync(path.join(ROOT, "src/app.js"), "utf8");
assert(app.indexOf('e.altKey && e.key === "Tab"') >= 0 && app.indexOf('e.altKey && e.key === "F4"') >= 0, "Alt+Tab / Alt+F4 missing");
assert(app.indexOf('e.ctrlKey && e.key === "Escape"') >= 0, "Ctrl+Esc must open Start");
assert(fs.readFileSync(path.join(ROOT, "src/installer-app.js"), "utf8").indexOf("installer.uac.title") >= 0, "Installing must show the UAC prompt");
assert(fs.readFileSync(path.join(ROOT, "src/pdf-app.js"), "utf8").indexOf("print.saveOutputAs") >= 0, "Print to PDF must ask where to save");

const shell = ui.defaultShellState();
assert(shell.pinnedTaskbar.indexOf("explorer") >= 0 && shell.pinnedTaskbar.indexOf("browser") >= 0, "Explorer and Chrome should be pinned by default");
shell.pinnedTaskbar = ["explorer"];
ui.saveShellState(shell, global.localStorage);
assert(ui.loadShellState(global.localStorage).pinnedTaskbar.join() === "explorer", "Shell state did not persist");
ui.resetShellState(global.localStorage);
assert(ui.loadShellState(global.localStorage).pinnedTaskbar.indexOf("browser") >= 0, "Shell reset did not restore defaults");

console.log("Windows 11 realism smoke test passed");
