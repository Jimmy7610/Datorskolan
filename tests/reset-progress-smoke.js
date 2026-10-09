"use strict";

const fs = require("fs");
const path = require("path");
const { load, assert, ROOT } = require("./helpers/load");
load(["src/progress-store.js"]);

function memoryStorage() {
  const data = {};
  return {
    getItem: function (key) { return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null; },
    setItem: function (key, value) { data[key] = String(value); },
    removeItem: function (key) { delete data[key]; }
  };
}

const store = new window.DatorskolanProgressStore(memoryStorage());
store.setMode("child");
store.startLesson("example");
store.completeLesson("example");
store.recordSkillAttempt("skill.example", { success: true, hintLevel: 0 });
assert(store.profile().mode === "child", "Precondition: mode not changed");
assert(store.lesson("example").status === "completed", "Precondition: lesson not completed");

const reset = store.reset();
assert(reset.userProfile.mode === "standard", "Reset must restore standard mode");
assert(Object.keys(reset.lessons).length === 0, "Reset must remove lesson progress");
assert(Object.keys(reset.skills).length === 0, "Reset must remove skill progress");
assert(reset.events.length === 0, "Reset must remove progress events");

const shell = fs.readFileSync(path.join(ROOT, "src/product-shell.js"), "utf8");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
assert(html.includes("data-reset-school"), "Landing page reset button missing");
assert(html.includes('data-modal="reset"'), "Reset confirmation dialog missing");
assert(html.includes("data-reset-confirm"), "Reset confirm control missing");
assert(shell.includes("window.localStorage.removeItem(PROGRESS_KEY)"), "Product shell must remove persisted progress");
assert(shell.includes("window.DatorskolanWindows11.STORAGE_KEY"), "Product shell must also reset Windows shell state");
assert(shell.includes("window.location.reload()"), "Product shell must reload after reset");
assert(!/removeItem\([^)]*locale/i.test(shell), "Reset must keep the learner's language choice");

console.log("Reset progress smoke test passed");
