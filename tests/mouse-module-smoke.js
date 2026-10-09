"use strict";

const fs = require("fs");
const path = require("path");
const { loadCourse, assert, ROOT } = require("./helpers/load");
const course = loadCourse();
const lessons = course.structure.lessons;
const scenarios = course.structure.scenarios;

const modes = ["move", "target", "click", "double", "right", "scroll", "hold", "drag", "final"];
const lessonIds = ["mouse-001-move", "mouse-002-target", "mouse-003-click", "mouse-004-double-click", "mouse-005-right-click", "mouse-006-scroll", "mouse-007-hold", "mouse-008-drag", "mouse-009-final"];

lessonIds.forEach(function (id) {
  const lesson = lessons.find(function (x) { return x.id === id; });
  assert(lesson, "Missing lesson: " + id);
  assert(lesson.moduleId === "mouse", "Wrong module for: " + id);
  assert(lesson.steps.some(function (step) { return step.type === "exercise"; }), "Missing exercise: " + id);
});

modes.forEach(function (mode) {
  const scenario = scenarios.find(function (x) { return x.start && x.start.mouseMode === mode; });
  assert(scenario, "Missing scenario for mouse mode: " + mode);
  assert(scenario.start.openApps.indexOf("mouse-lab") >= 0, "Mouse practice not opened: " + scenario.id);
});

assert(lessons.find(function (x) { return x.id === "mouse-009-final"; }).skills.length >= 6, "Final mission must combine core mouse skills");

// Every mouse mode emits its completion event.
const lab = fs.readFileSync(path.join(ROOT, "src/mouse-lab.js"), "utf8");
modes.forEach(function (mode) {
  assert(lab.indexOf('"mouse.' + mode + '.complete"') >= 0, "Mouse practice never completes mode: " + mode);
});

console.log("Mouse module smoke test passed");
