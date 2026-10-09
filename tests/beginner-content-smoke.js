"use strict";

const { loadCourse, assert, LOCALES } = require("./helpers/load");
const course = loadCourse();

// Every lesson explains the concept from scratch, in every language that is complete.
["sv"].concat(process.env.REQUIRE_ALL_LOCALES === "0" ? [] : LOCALES.filter(function (l) { return l !== "sv"; })).forEach(function (locale) {
  const lessons = course.lessons(locale);
  assert(lessons.length === 120, locale + ": expected 120 lessons, got " + lessons.length);

  lessons.forEach(function (lesson) {
    assert(lesson.detail, locale + ": missing beginner detail: " + lesson.id);
    ["what", "recognize", "use", "example"].forEach(function (key) {
      assert(typeof lesson.detail[key] === "string" && lesson.detail[key].trim().length >= 20,
        locale + ": weak or missing " + key + " explanation: " + lesson.id);
    });
    assert(Array.isArray(lesson.detail.everyday) && lesson.detail.everyday.length >= 2, locale + ": missing everyday examples: " + lesson.id);
    assert(Array.isArray(lesson.detail.mistakes) && lesson.detail.mistakes.length >= 2, locale + ": missing common mistakes: " + lesson.id);
  });
});

const links = course.lessons("sv").filter(function (l) { return l.moduleId === "internet" && l.title === "Länkar"; })[0];
assert(links, "Link lesson missing");
assert(/hand|understr/i.test(links.detail.recognize), "Link lesson must explain how links are recognised");

console.log("Beginner content smoke test passed: 120 lessons");
