"use strict";

global.window = {};

require("../src/scenarios.js");
require("../src/lessons.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

var lessonIds = [
  "mouse-001-move",
  "mouse-002-target",
  "mouse-003-click",
  "mouse-004-double-click",
  "mouse-005-right-click",
  "mouse-006-scroll",
  "mouse-007-hold",
  "mouse-008-drag",
  "mouse-009-final"
];

var scenarioIds = [
  "mouse-move-01",
  "mouse-target-01",
  "mouse-click-01",
  "mouse-double-01",
  "mouse-right-01",
  "mouse-scroll-01",
  "mouse-hold-01",
  "mouse-drag-01",
  "mouse-final-01"
];

lessonIds.forEach(function (id) {
  var lesson = window.DatorskolanLessons.find(function (x) { return x.id === id; });
  assert(lesson, "Missing lesson: " + id);
  assert(lesson.moduleId === "mouse", "Wrong module for: " + id);
  assert(lesson.steps.some(function (step) { return step.type === "exercise"; }), "Missing exercise: " + id);
});

scenarioIds.forEach(function (id) {
  var scenario = window.DatorskolanScenarios.find(function (x) { return x.id === id; });
  assert(scenario, "Missing scenario: " + id);
  assert(scenario.start && scenario.start.mouseMode, "Missing mouseMode: " + id);
  assert(Array.isArray(scenario.start.openApps) && scenario.start.openApps.indexOf("mouse-lab") >= 0, "Mouse Lab not opened: " + id);
});

assert(
  window.DatorskolanLessons.find(function (x) { return x.id === "mouse-009-final"; }).skills.length >= 6,
  "Final mission must combine core mouse skills"
);

console.log("Mouse module smoke test passed");
