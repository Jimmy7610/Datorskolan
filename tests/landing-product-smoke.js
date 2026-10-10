"use strict";

/*
  Landing page product checks: tabs, language switch, CTA, course facts from data, privacy,
  translated in both languages, no emoji, no scroll-hijacking.
*/
const fs = require("fs");
const path = require("path");
const { loadCourse, assert, ROOT, LOCALES } = require("./helpers/load");
const course = loadCourse();

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "styles/site.css"), "utf8");
const shell = fs.readFileSync(path.join(ROOT, "src/product-shell.js"), "utf8");
const start = html.indexOf('<div id="landing"');
const landing = html.slice(start, html.indexOf('<div class="modal-backdrop"', start));

["overview", "how", "course", "safe"].forEach(function (tab) {
  assert(landing.indexOf('data-landing-tab="' + tab + '"') >= 0, "Landing missing tab: " + tab);
  assert(landing.indexOf('data-landing-panel="' + tab + '"') >= 0, "Landing missing panel: " + tab);
});

assert(landing.indexOf('data-set-locale="sv"') >= 0 && landing.indexOf('data-set-locale="en"') >= 0, "Language switch missing");
assert((landing.match(/data-launch-school/g) || []).length >= 3, "Start buttons missing");
assert(landing.indexOf("data-module-grid") >= 0, "Course module grid must be rendered from the course data");
assert(landing.indexOf('data-course-count="lessons"') >= 0, "Lesson count must come from the course data");
assert(landing.indexOf("data-open-privacy") >= 0, "Privacy information must be reachable from the landing page");

// The numbers shown are computed, so they always match the course.
assert(course.Course.moduleOrder().length === 13, "Expected 13 course areas");
assert(course.structure.lessons.length === 120, "Expected 120 lessons");
assert(shell.indexOf("renderCourseFacts") >= 0, "Course facts must be rendered from data");

// Every landing text key is translated in every language.
const keys = Array.from(landing.matchAll(/data-i18n="([^"]+)"/g)).map(function (m) { return m[1]; });
assert(keys.length >= 50, "Landing should be fully translatable (" + keys.length + " keys)");
LOCALES.forEach(function (locale) {
  const dict = window.DatorskolanI18n.dictionary(locale, "ui");
  keys.forEach(function (key) { assert(dict[key], locale + ": landing text missing for " + key); });
});

assert(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(landing), "Landing must not use emoji as icons");
assert(!/google\.com|gstatic\.com|googleapis\.com/i.test(landing), "The landing page must not load anything from Google (docs/38)");
assert(shell.indexOf("scrollIntoView") < 0, "Product shell must not hijack scrolling");
assert(css.indexOf("overflow:hidden") < 0 || css.indexOf("body.school-mode{overflow:hidden}") >= 0, "Landing must never lock scrolling (content would be clipped at zoom)");
assert(css.indexOf("@media (min-width:981px) and (max-height:820px)") >= 0, "Short desktop screens need a tighter layout instead of clipping");

console.log("Landing product smoke test passed");
