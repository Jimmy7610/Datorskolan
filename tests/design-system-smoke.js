"use strict";

/*
  Design system guard rails:
  - exactly two stylesheets: site.css (website, Cooper Hewitt) and fakewin.css (Windows 11, Segoe UI)
  - no text smaller than 12px anywhere; website body text 16px
  - central tokens exist; !important stays the exception
  - the retired experimental palettes never come back
*/
const fs = require("fs");
const path = require("path");
const { assert, ROOT } = require("./helpers/load");

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const stylesheets = Array.from(html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)).map(function (m) { return m[1]; });
assert(stylesheets.join(",") === "./styles/site.css,./styles/fakewin.css", "Unexpected stylesheets: " + stylesheets.join(", "));

const styleDir = path.join(ROOT, "styles");
const cssFiles = fs.readdirSync(styleDir).filter(function (n) { return /\.css$/.test(n); });
assert(cssFiles.sort().join(",") === "fakewin.css,site.css", "Stray stylesheet layers in styles/: " + cssFiles.join(", "));

function stripComments(css) { return css.replace(/\/\*[\s\S]*?\*\//g, ""); }
const site = stripComments(fs.readFileSync(path.join(styleDir, "site.css"), "utf8"));
const fakewin = stripComments(fs.readFileSync(path.join(styleDir, "fakewin.css"), "utf8"));

// Minimum text size: 12px (0.75rem). Smaller text is unreadable for the target audience.
[["site.css", site], ["fakewin.css", fakewin]].forEach(function (entry) {
  for (const m of entry[1].matchAll(/font-size\s*:\s*([0-9.]+)(px|rem|em)/g)) {
    const px = m[2] === "px" ? Number(m[1]) : Number(m[1]) * 16;
    assert(px >= 12, entry[0] + " uses tiny text: " + m[0]);
  }
  for (const m of entry[1].matchAll(/font-size\s*:\s*clamp\(([0-9.]+)px/g)) {
    assert(Number(m[1]) >= 12, entry[0] + " clamp() can shrink text below 12px: " + m[0]);
  }
});

// Website tokens (semantic palette).
[
  "--color-bg", "--color-surface", "--color-surface-hover", "--color-border", "--color-text", "--color-muted",
  "--color-primary", "--color-primary-hover", "--color-success", "--color-warning", "--color-danger", "--color-focus",
  "--radius-sm", "--radius-md", "--shadow-sm", "--space-4", "--text-md"
].forEach(function (token) {
  assert(site.indexOf(token + ":") >= 0, "Missing site design token " + token);
});
assert(/body\{[^}]*font-size:var\(--text-md\)/.test(site.replace(/\s+/g, "")), "Website body text must be 16px");
assert(site.indexOf('--font-site:"Cooper Hewitt"') >= 0, "Website must use Cooper Hewitt");

// FakeWin tokens (Windows 11 light theme).
["--fw-font", "--fw-text", "--fw-text-2", "--fw-accent", "--fw-mica", "--fw-stroke", "--fw-radius", "--fw-radius-control", "--fw-shadow-window", "--fw-taskbar-height"].forEach(function (token) {
  assert(fakewin.indexOf(token + ":") >= 0, "Missing FakeWin token " + token);
});
assert(fakewin.indexOf('--fw-font:"Segoe UI Variable Text"') >= 0, "FakeWin must use Windows 11 typography (Segoe UI Variable)");
assert(fakewin.indexOf("--fw-accent:#005fb8") >= 0, "FakeWin accent must be the Windows 11 default blue");
assert(fakewin.indexOf("--fw-radius:8px") >= 0 && fakewin.indexOf("--fw-radius-control:4px") >= 0, "Windows 11 corner radii changed");

// !important is reserved for [hidden] and reduced-motion overrides.
const importantSite = (site.match(/!important/g) || []).length;
const importantFakewin = (fakewin.match(/!important/g) || []).length;
assert(importantSite <= 1, "site.css uses !important " + importantSite + " times");
assert(importantFakewin <= 3, "fakewin.css uses !important " + importantFakewin + " times");

// Element resets in the simulator must have zero specificity, otherwise they beat component classes
// (this once turned the text on every blue accent button dark: 2.7:1 contrast).
assert(fakewin.indexOf(".fw :where(button,input,select,textarea){font:inherit;color:inherit}") >= 0, "Simulator form-element reset must use :where()");
assert(!/\.fw (button|input|select|textarea)[^{]*\{[^}]*color:inherit/.test(fakewin), "Simulator must not reset form-element colours with element selectors (specificity bug)");
assert(/\.fw-button-accent\{[^}]*color:var\(--fw-text-on-accent\)/.test(fakewin) && /--fw-text-on-accent:#ffffff/.test(fakewin), "Accent buttons must use white text");

// Retired experimental palettes must not return.
["#07101d", "arcane", "#a855f7", "#7c3aed", "--lp-violet"].forEach(function (old) {
  assert(site.toLowerCase().indexOf(old) < 0 && fakewin.toLowerCase().indexOf(old) < 0, "Retired palette value is back: " + old);
});

assert(/<meta name="theme-color" content="#f8fafc">/.test(html), "Browser theme color must match the light page background");

const fontSource = fs.readFileSync(path.join(ROOT, "assets/fonts/SOURCE.md"), "utf8");
const license = fs.readFileSync(path.join(ROOT, "assets/fonts/CooperHewitt-OFL.txt"), "utf8");
assert(fontSource.indexOf("SIL Open Font License") >= 0, "Cooper Hewitt source documentation missing license");
assert(license.indexOf("SIL OPEN FONT LICENSE Version 1.1") >= 0, "Cooper Hewitt OFL text missing");

// Fonts are served locally: the official, unmodified Cooper Hewitt web fonts (OFL Reserved Font Name).
const crypto = require("crypto");
const fontHashes = {
  Book: "3bcf6f17d332714cf8d8ab79601b84ec177351cc920cb5af236506853b96836b",
  Medium: "e5fcd47740334669e7dcb22ffafbd2a422e2325dd5f3a4d9ad0562fe28b948e8",
  Semibold: "f4f69e0fe16a962370bebdc294d508bb95c0f95f7f78d144561c0ad05f75ba03",
  Bold: "e145444bda1a0bf3cfb4f0047cbd367c2d1dad7b0e46dffa5fbcd8a4433f2943"
};
Object.keys(fontHashes).forEach(function (weight) {
  const file = "CooperHewitt-" + weight + ".woff";
  assert(site.indexOf('url("../assets/fonts/' + file + '")') >= 0, "site.css does not load local " + file);
  const hash = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, "assets/fonts", file))).digest("hex");
  assert(hash === fontHashes[weight], file + " differs from the official Cooper Hewitt web font (modified versions may not use the name)");
  assert(fontSource.indexOf(hash) >= 0, "SOURCE.md does not document " + file);
});
assert(fs.existsSync(path.join(ROOT, "assets/fonts/CooperHewitt-FontLog.txt")), "Cooper Hewitt FontLog missing");

// No external font requests anywhere on the site.
[site, fakewin, html].forEach(function (text) {
  const external = text.match(/@font-face[^}]*url\(["']?https?:|fonts\.googleapis|fonts\.gstatic|githubusercontent|use\.typekit/);
  assert(!external, "External font request found: " + (external && external[0]));
});

console.log("Design system smoke test passed (site.css + fakewin.css, !important: " + importantSite + "/" + importantFakewin + ")");
