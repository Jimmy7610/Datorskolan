"use strict";

const { loadCourse, assert, LOCALES } = require("./helpers/load");
const course = loadCourse();

const structure = course.structure.lessons;
const scenarioIds = new Set(course.structure.scenarios.map(function (s) { return s.id; }));

["everyday", "devices", "troubleshooting"].forEach(function (moduleId) {
  assert(structure.some(function (l) { return l.moduleId === moduleId; }), "Missing module: " + moduleId);
});
assert(structure.length === 120, "Expected exactly 120 lessons, got " + structure.length);

const interactive = structure.filter(function (l) {
  return ["everyday", "devices", "troubleshooting"].indexOf(l.moduleId) >= 0 && l.scenarioId;
});
assert(interactive.length >= 20, "Everyday modules must stay hands-on (" + interactive.length + " interactive lessons)");

LOCALES.forEach(function (locale) {
  const byId = {};
  course.lessons(locale).forEach(function (l) { byId[l.id] = l; });
  interactive.forEach(function (lesson) {
    assert(scenarioIds.has(lesson.scenarioId), "Missing scenario for " + lesson.id);
    const text = byId[lesson.id];
    assert(text.detail && text.detail.everyday.length >= 2, locale + ": missing everyday examples: " + lesson.id);
    assert(text.detail.mistakes.length >= 2, locale + ": missing common mistakes: " + lesson.id);
  });
});

console.log("Everyday course smoke test passed: 120 lessons,", interactive.length, "interactive everyday lessons");
