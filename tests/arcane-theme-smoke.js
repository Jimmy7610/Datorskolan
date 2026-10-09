"use strict";

/*
  The experimental "Arcane" theme and its override layers (arcane-theme.css, landing.css,
  accessibility.css, main.css) were retired in October 2026 in favour of one design system per
  surface (styles/site.css and styles/fakewin.css). This test keeps them retired.
  Positive design-system checks live in tests/design-system-smoke.js.
*/
const fs = require("fs");
const path = require("path");
const { assert, ROOT } = require("./helpers/load");

["styles/arcane-theme.css", "styles/landing.css", "styles/accessibility.css", "styles/main.css"].forEach(function (file) {
  assert(!fs.existsSync(path.join(ROOT, file)), "Retired stylesheet is back: " + file);
});

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
assert(html.indexOf("arcane") < 0, "index.html still references the Arcane theme");

const fakewin = fs.readFileSync(path.join(ROOT, "styles/fakewin.css"), "utf8");
assert(!/body \*[^{]*\{[^}]*Cooper Hewitt/.test(fakewin), "Cooper Hewitt must not be forced onto the Windows surfaces again");

console.log("Retired Arcane theme stays retired");
