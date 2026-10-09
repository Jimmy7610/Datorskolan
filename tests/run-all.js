"use strict";

/*
  Runs the complete test suite: syntax check of every JavaScript file, then every *-smoke.js test.
  Usage: node tests/run-all.js
*/
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
let failures = 0;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(function (entry) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "node_modules" || entry.name.charAt(0) === "." ? [] : walk(full);
    return /\.js$/.test(entry.name) ? [full] : [];
  });
}

const scripts = ["src", "locales", "tests"].flatMap(function (dir) { return walk(path.join(ROOT, dir)); });
scripts.forEach(function (file) {
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch (error) {
    failures += 1;
    console.error("✗ syntax: " + path.relative(ROOT, file) + "\n" + String(error.stderr || error.message));
  }
});
console.log("Syntax check: " + scripts.length + " files");

fs.readdirSync(__dirname).filter(function (name) { return /-smoke\.js$/.test(name); }).sort().forEach(function (name) {
  try {
    const out = execFileSync(process.execPath, [path.join(__dirname, name)], { cwd: ROOT, stdio: "pipe" }).toString().trim();
    console.log("✓ " + out);
  } catch (error) {
    failures += 1;
    const message = String(error.stderr || error.stdout || error.message).split("\n").filter(function (line) { return /^\w*Error:/.test(line.trim()); })[0] || error.message;
    console.error("✗ " + name + ": " + message);
  }
});

if (failures) {
  console.error("\n" + failures + " failure(s)");
  process.exit(1);
}
console.log("\nAll tests passed");
