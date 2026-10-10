"use strict";

/*
  Loads the browser scripts into Node for smoke tests.
  Everything attaches to `window`, exactly as in the browser (window === globalThis here).
*/
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const LOCALES = ["sv", "en"];

function load(files) {
  global.window = globalThis;
  files.forEach(function (file) { require(path.join(ROOT, file)); });
  return globalThis;
}

function loadCourse() {
  load(["src/i18n.js"]);
  LOCALES.forEach(function (locale) {
    load(["locales/" + locale + "/ui.js", "locales/" + locale + "/fakewin.js", "locales/" + locale + "/course.js"]);
  });
  load([
    "src/course/lessons.js",
    "src/course/scenarios.js",
    "src/course.js",
    "src/vfs.js",
    "src/scenario-engine.js",
    "src/pedagogy.js",
    "src/progress-store.js",
    "src/lesson-engine.js"
  ]);
  return {
    I18n: window.DatorskolanI18n,
    Course: window.DatorskolanCourse,
    lessons: function (locale) { return window.DatorskolanCourse.lessons(locale || "sv"); },
    scenarios: function (locale) { return window.DatorskolanCourse.scenarios(locale || "sv"); },
    structure: { lessons: window.DatorskolanLessons, scenarios: window.DatorskolanScenarios }
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// A minimal scenario runtime: enough for the scenario engine to load and evaluate goals.
function fakeRuntime(nodes) {
  nodes = nodes || {};
  return {
    vfs: {
      reset: function () {},
      get: function (id) { return nodes[id] || null; },
      list: function () { return []; },
      createFile: function () { return {}; },
      createFolder: function () { return {}; },
      mountDrive: function () { return {}; },
      unmountDrive: function () { return true; }
    },
    resetForScenario: function () {},
    setExplorerFolder: function () {},
    setMouseMode: function () {},
    applyStartState: function () {},
    openApp: function () {}
  };
}

module.exports = { ROOT: ROOT, LOCALES: LOCALES, load: load, loadCourse: loadCourse, assert: assert, fakeRuntime: fakeRuntime };
