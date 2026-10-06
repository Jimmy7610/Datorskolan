"use strict";

global.window = {};

require("../src/scenarios.js");
require("../src/advanced-scenarios.js");
require("../src/scenario-engine.js");
require("../src/progress-store.js");
require("../src/lessons.js");
require("../src/advanced-lessons.js");
require("../src/lesson-engine.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const scenarios = window.DatorskolanScenarios;
const lessons = window.DatorskolanLessons;

function scenario(id) {
  return scenarios.find(function (item) { return item.id === id; });
}

function lesson(id) {
  return lessons.find(function (item) { return item.id === id; });
}

function fakeRuntime() {
  return {
    vfs: {
      reset: function () {},
      get: function () { return null; },
      list: function () { return []; },
      createFile: function () { return {}; },
      createFolder: function () { return {}; }
    },
    resetForScenario: function () {},
    setExplorerFolder: function () {},
    setMouseMode: function () {},
    applyStartState: function () {},
    openApp: function () {}
  };
}

function completeScenarioWithEvents(id, events) {
  const runtime = fakeRuntime();
  const engine = new window.DatorskolanScenarioEngine(scenarios);
  engine.load(id, runtime);
  events.forEach(function (entry) {
    engine.observe(entry[0], entry[1] || {}, runtime);
  });
  assert(engine.active().status === "completed", "Scenario did not complete: " + id);
}

// Phase 5 - Windows.
completeScenarioWithEvents("windows-switch-01", [
  ["window.focused", { windowId: 2 }]
]);

completeScenarioWithEvents("windows-final-01", [
  ["startMenu.opened", {}],
  ["app.opened", { appId: "calculator" }],
  ["window.moved", { windowId: 1 }],
  ["window.minimized", { windowId: 1 }],
  ["window.restored", { windowId: 1 }],
  ["window.maximized", { windowId: 1 }],
  ["window.closed", { windowId: 1, appId: "calculator" }]
]);

// Phase 6 - Files.
completeScenarioWithEvents("files-final-01", [
  ["folder.created", {}],
  ["file.renamed", {}],
  ["file.moved", {}],
  ["file.deleted", {}],
  ["recycleBin.restored", {}]
]);

completeScenarioWithEvents("files-drag-01", [
  ["file.moved", { via: "drag-drop" }]
]);

// Phase 7 - Internet.
completeScenarioWithEvents("internet-final-01", [
  ["browser.addressUsed", {}],
  ["browser.linkOpened", {}],
  ["browser.tabOpened", {}],
  ["browser.downloaded", {}]
]);

completeScenarioWithEvents("internet-close-tab-01", [
  ["browser.tabOpened", {}],
  ["browser.tabClosed", {}]
]);

// Phase 8 - Mail and security.
completeScenarioWithEvents("mail-final-01", [
  ["mail.opened", {}],
  ["mail.attachmentDownloaded", {}],
  ["mail.attachmentAdded", {}],
  ["mail.replied", {}]
]);

completeScenarioWithEvents("security-phishing-01", [
  ["mail.phishingIdentified", { id: "m2" }]
]);

// Phase 9 - Adaptive progression.
const store = new window.DatorskolanProgressStore(null);
store.startLesson("windows-001-start");

// Even if a weak skill exists, in-progress must come first.
store.recordSkillAttempt("mouse.move", { success: false, hintLevel: 0 });
store.recordSkillAttempt("mouse.move", { success: false, hintLevel: 0 });

let recommendation = store.recommendLesson(lessons);
assert(
  recommendation && recommendation.id === "windows-001-start",
  "In-progress lesson must have recommendation priority"
);

store.completeLesson("windows-001-start");
recommendation = store.recommendLesson(lessons);
assert(recommendation && recommendation.id, "Recommendation missing after completing in-progress lesson");

// Phase 10 - learner modes.
store.setMode("child");
assert(store.profile().mode === "child", "Child mode not set");
store.setMode("fast");
assert(store.profile().mode === "fast", "Fast mode not set");

// Fast mode should enter an interactive lesson on its exercise.
let loadedScenario = null;
const lessonRuntime = {
  loadScenario: function (id) { loadedScenario = id; },
  getScenarioStatus: function () { return "running"; },
  setLearningHighlight: function () {}
};
const lessonEngine = new window.DatorskolanLessonEngine(lessons, store);
lessonEngine.start("internet-001-address", lessonRuntime);
assert(loadedScenario === "internet-address-01", "Lesson did not load scenario");
assert(lessonEngine.currentStep().type === "exercise", "Fast mode should skip to exercise");

// Phase 11 - independent final exam.
completeScenarioWithEvents("final-independent-01", [
  ["browser.downloaded", { name: "guide.txt" }],
  ["file.renamed", { name: "guide-renamed.txt" }],
  ["mail.attachmentAdded", { name: "guide-renamed.txt" }],
  ["mail.sent", { to: "anna@example.test" }]
]);

assert(lesson("final-001-independent"), "Independent final lesson missing");
assert(scenario("final-independent-01"), "Independent final scenario missing");

console.log(
  "Phases 5-11 smoke test passed:",
  lessons.length,
  "lessons,",
  scenarios.length,
  "scenarios"
);
