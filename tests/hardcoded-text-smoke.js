"use strict";

/*
  No interface text may be hardcoded in the code: all of it lives in locales/<lang>/*.js.
  Checks:
  - no Swedish letters (å ä ö) anywhere in src/ outside comments,
  - no literal strings assigned to visible text or attributes (text:, placeholder:, title:, label:,
    .textContent =, setAttribute("aria-label" …)) except proper names and key names,
  - index.html contains no visible text that bypasses data-i18n.
*/
const fs = require("fs");
const path = require("path");
const { assert, ROOT } = require("./helpers/load");

const srcDir = path.join(ROOT, "src");
const files = fs.readdirSync(srcDir).filter(function (n) { return /\.js$/.test(n); });

// Proper names, product names and keyboard key names may appear literally.
const allowed = [
  /^Datorskolan$/, /^Microsoft Print to PDF$/, /^Microsoft Corporation$/,
  /^UTF-8$/, /^Windows \(CRLF\)$/, /^Svenska$/, /^English$/, /^Språk \/ Language$/, /^D$/, /^\d+$/,
  /^(Shift|Caps Lock|Backspace|Ctrl|Alt|Tab|Esc|F2|F5)$/, /^Alt\+Enter$/, /^Ctrl\+.+$/, /^[↑↓←→]$/
];

function isAllowed(text) {
  return allowed.some(function (pattern) { return pattern.test(text); });
}

files.forEach(function (name) {
  // Blank out block comments but keep line numbers.
  const source = fs.readFileSync(path.join(srcDir, name), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, function (block) { return block.replace(/[^\n]/g, " "); });
  const lines = source.split("\n");
  lines.forEach(function (line, index) {
    if (/^\s*\/\//.test(line)) return;
    const where = name + ":" + (index + 1);
    const code = line.replace(/\/\/.*$/, "");
    assert(!/[åäöÅÄÖ]/.test(code.replace(/"Språk \/ Language"/g, "")), where + " contains Swedish text – move it to locales/: " + line.trim());

    for (const m of code.matchAll(/\b(text|placeholder|title|label)\s*:\s*"([^"]*[A-Za-z][^"]*)"/g)) {
      assert(isAllowed(m[2]), where + " hardcoded " + m[1] + ": \"" + m[2] + "\"");
    }
    for (const m of code.matchAll(/\.textContent\s*=\s*"([^"]*[A-Za-z][^"]*)"/g)) {
      assert(isAllowed(m[1]), where + " hardcoded textContent: \"" + m[1] + "\"");
    }
    for (const m of code.matchAll(/setAttribute\("(aria-label|title|placeholder)",\s*"([^"]+)"\)/g)) {
      assert(isAllowed(m[2]), where + " hardcoded " + m[1] + ": \"" + m[2] + "\"");
    }
  });
});

// index.html: remove scripts and tags; every remaining visible text must be a proper name.
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const body = html.slice(html.indexOf("<body"));
body
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<[^>]+>/g, "\n")
  .split("\n")
  .map(function (s) { return s.trim(); })
  .filter(Boolean)
  .forEach(function (text) {
    assert(isAllowed(text), "index.html has untranslated visible text: " + text);
  });

console.log("Hardcoded text smoke test passed:", files.length, "source files");
