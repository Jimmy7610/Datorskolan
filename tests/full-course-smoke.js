"use strict";

global.window = {};

require("../src/scenarios.js");
require("../src/advanced-scenarios.js");
require("../src/everyday-scenarios.js");
require("../src/scenario-engine.js");
require("../src/progress-store.js");
require("../src/lessons.js");
require("../src/advanced-lessons.js");
require("../src/everyday-lessons.js");
require("../src/lesson-engine.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

var requiredModules = [
  "basics",
  "mouse",
  "keyboard",
  "windows",
  "files",
  "programs",
  "internet",
  "mail",
  "security",
  "everyday",
  "devices",
  "troubleshooting",
  "final"
];

var lessons = window.DatorskolanLessons;
var scenarios = window.DatorskolanScenarios;
var scenarioIds = {};
scenarios.forEach(function (scenario) { scenarioIds[scenario.id] = true; });

requiredModules.forEach(function (moduleId) {
  assert(
    lessons.some(function (lesson) { return lesson.moduleId === moduleId; }),
    "Missing module: " + moduleId
  );
});

lessons.forEach(function (lesson) {
  assert(lesson.id, "Lesson without id");
  assert(lesson.title, "Lesson without title: " + lesson.id);
  assert(Array.isArray(lesson.steps) && lesson.steps.length >= 2, "Lesson missing steps: " + lesson.id);

  if (lesson.scenarioId) {
    assert(scenarioIds[lesson.scenarioId], "Missing scenario for lesson: " + lesson.id + " -> " + lesson.scenarioId);
    var exercise = lesson.steps.find(function (step) { return step.type === "exercise"; });
    assert(exercise && exercise.validator, "Interactive lesson missing exercise validator: " + lesson.id);
  }
});

assert(
  lessons.filter(function (lesson) { return lesson.moduleId === "keyboard"; }).length >= 10,
  "Keyboard module incomplete"
);
assert(
  lessons.filter(function (lesson) { return lesson.moduleId === "windows"; }).length >= 10,
  "Windows module incomplete"
);
assert(
  lessons.filter(function (lesson) { return lesson.moduleId === "internet"; }).length >= 10,
  "Internet module incomplete"
);
assert(
  lessons.filter(function (lesson) { return lesson.moduleId === "mail"; }).length >= 7,
  "Mail module incomplete"
);
assert(lessons.length >= 120, "Expanded course must contain at least 120 lessons");
assert(lessons.filter(function (lesson) { return lesson.moduleId === "everyday"; }).length >= 20, "Everyday module incomplete");
assert(lessons.filter(function (lesson) { return lesson.moduleId === "devices"; }).length >= 8, "Devices module incomplete");
assert(lessons.filter(function (lesson) { return lesson.moduleId === "troubleshooting"; }).length >= 8, "Troubleshooting module incomplete");

var progress = new window.DatorskolanProgressStore(null);
progress.setMode("child");
assert(progress.profile().mode === "child", "Child mode did not persist in store");
progress.setMode("fast");
assert(progress.profile().mode === "fast", "Fast mode did not persist in store");

var recommendation = progress.recommendLesson(lessons);
assert(recommendation && recommendation.id, "Adaptive recommendation missing");

var fakeVfs = {
  reset: function () {},
  get: function () { return null; },
  list: function () { return []; },
  createFile: function () { return {}; },
  createFolder: function () { return {}; }
};
var runtime = {
  vfs: fakeVfs,
  resetForScenario: function () {},
  setExplorerFolder: function () {},
  setMouseMode: function () {},
  applyStartState: function () {},
  openApp: function () {}
};

var engine = new window.DatorskolanScenarioEngine(scenarios);
engine.load("windows-final-01", runtime);
[
  ["startMenu.opened", {}],
  ["app.opened", { appId: "calculator" }],
  ["window.moved", {}],
  ["window.minimized", {}],
  ["window.restored", {}],
  ["window.maximized", {}],
  ["window.closed", { appId: "calculator" }]
].forEach(function (entry) {
  engine.observe(entry[0], entry[1], runtime);
});
assert(engine.active().status === "completed", "Composite Windows final scenario did not complete");

var finalLesson = lessons.find(function (lesson) { return lesson.id === "final-001-independent"; });
assert(finalLesson, "Independent final exam missing");
assert(finalLesson.skills.length >= 4, "Independent final exam must combine multiple skills");

console.log("Full course smoke test passed:", lessons.length, "lessons,", scenarios.length, "scenarios");
