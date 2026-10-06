"use strict";

global.window = {};

require("../src/lessons.js");
require("../src/advanced-lessons.js");
require("../src/lesson-enrichment.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const lessons = window.DatorskolanLessons || [];
assert(lessons.length > 0, "No lessons loaded");

lessons.forEach(function (lesson) {
  assert(lesson.detail, "Missing beginner detail: " + lesson.id);
  ["what","recognize","use","example"].forEach(function (key) {
    assert(
      typeof lesson.detail[key] === "string" && lesson.detail[key].trim().length >= 20,
      "Weak or missing " + key + " explanation: " + lesson.id
    );
  });

  if (lesson.moduleId === "internet" && lesson.title === "Länkar") {
    assert(
      lesson.detail.recognize.toLowerCase().indexOf("hand") >= 0 ||
      lesson.detail.recognize.toLowerCase().indexOf("understr") >= 0,
      "Link lesson must explain how links are recognized"
    );
  }
});

console.log("Beginner content smoke test passed:", lessons.length, "lessons");
