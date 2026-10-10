"use strict";

/*
  Translation completeness:
  - every interface key exists in every language (and nothing extra),
  - every key referenced from the code exists,
  - every lesson, module and scenario has text in every language with the same shape,
  - placeholders ({name}) match between languages.
*/
const fs = require("fs");
const path = require("path");
const { loadCourse, assert, ROOT, LOCALES } = require("./helpers/load");
const course = loadCourse();
const I18n = course.I18n;

const base = I18n.dictionary("sv", "ui");
const baseKeys = Object.keys(base).sort();
assert(baseKeys.length > 700, "Suspiciously few interface strings: " + baseKeys.length);

function placeholders(text) {
  return (String(text).match(/\{\w+\}/g) || []).sort().join(",");
}

LOCALES.forEach(function (locale) {
  const dict = I18n.dictionary(locale, "ui");
  const keys = Object.keys(dict).sort();
  const missing = baseKeys.filter(function (k) { return !(k in dict); });
  const extra = keys.filter(function (k) { return !(k in base); });
  assert(!missing.length, locale + ": missing interface keys: " + missing.join(", "));
  assert(!extra.length, locale + ": keys missing in sv: " + extra.join(", "));
  keys.forEach(function (key) {
    assert(typeof dict[key] === "string" && dict[key].trim().length > 0, locale + ": empty string for " + key);
    assert(placeholders(dict[key]) === placeholders(base[key]), locale + ": placeholders differ for " + key);
  });
});

// Keys referenced from code: t("key"), plural("key", …), data-i18n="key" in HTML.
const sources = fs.readdirSync(path.join(ROOT, "src")).filter(function (n) { return /\.js$/.test(n); })
  .map(function (n) { return fs.readFileSync(path.join(ROOT, "src", n), "utf8"); }).join("\n");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const used = new Set();
for (const m of sources.matchAll(/\b(?:t|plural)\(\s*"([a-z][\w.-]*\w)"/g)) used.add(m[1]);
for (const m of html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)) used.add(m[1]);
for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
  m[1].split(";").forEach(function (pair) { used.add(pair.split(":")[1].trim()); });
}
used.forEach(function (key) {
  assert((key in base) || ((key + ".one") in base && (key + ".other") in base), "Code uses undefined translation key: " + key);
});

// Dynamic key families must be complete.
const pages = ["home", "system", "bluetooth", "network", "personalization", "apps", "accounts", "time", "gaming", "accessibility", "privacy", "update"];
const mouseModes = ["move", "target", "click", "double", "right", "scroll", "hold", "drag", "final"];
[
  ["settings.page.", pages],
  ["settings.keywords.", pages],
  ["mouse.mode.", mouseModes],
  ["mouse.instruction.", mouseModes],
  ["learn.stepType.", ["instruction", "demonstration", "exercise", "quiz", "simulation", "reflection", "checkpoint", "completion"]],
  ["learn.setting.", ["audience", "support", "depth"]],
  ["learn.audience.", ["adult", "child", "adult.desc", "child.desc"]],
  ["learn.support.", ["guided", "normal", "independent", "guided.desc", "normal.desc", "independent.desc"]],
  ["learn.depth.", ["detailed", "normal", "short", "detailed.desc", "normal.desc", "short.desc"]],
  ["settings.personal.wallpaper.", ["bloom", "dawn", "dusk", "solid"]],
  ["installer.step.", ["welcome.title", "license.title", "location.title", "ready.title", "done.title"]]
].forEach(function (family) {
  family[1].forEach(function (suffix) {
    assert((family[0] + suffix) in base, "Missing dynamic key " + family[0] + suffix);
  });
});
["letters", "numbers", "editing", "shift-caps", "arrows", "tab-esc", "modifiers", "shortcuts", "special", "final"].forEach(function (mode) {
  assert(("keyboard.mode." + mode + ".title") in base && ("keyboard.mode." + mode + ".text") in base, "Missing keyboard texts for " + mode);
});

// Course content.
const svCourse = I18n.dictionary("sv", "course");
const structure = course.structure;
LOCALES.forEach(function (locale) {
  const text = I18n.dictionary(locale, "course");
  course.Course.moduleOrder().forEach(function (moduleId) {
    const m = (text.modules || {})[moduleId];
    assert(m && m.title, locale + ": module title missing: " + moduleId);
    assert(Array.isArray(m.everyday) && m.everyday.length >= 2, locale + ": module everyday examples missing: " + moduleId);
    assert(Array.isArray(m.mistakes) && m.mistakes.length >= 2, locale + ": module mistakes missing: " + moduleId);
  });

  structure.lessons.forEach(function (lesson) {
    const l = (text.lessons || {})[lesson.id];
    const ref = svCourse.lessons[lesson.id];
    assert(l, locale + ": lesson text missing: " + lesson.id);
    assert(l.title && l.summary, locale + ": lesson title/summary missing: " + lesson.id);
    assert(Array.isArray(l.steps) && l.steps.length === lesson.steps.length, locale + ": step count differs: " + lesson.id);
    const Pedagogy = window.DatorskolanPedagogy;
    l.steps.forEach(function (step, i) {
      const where = locale + ": " + lesson.id + " #" + (i + 1);
      assert(typeof step.text === "string" ? step.text.trim() : Pedagogy.isVariantObject(step.text) && step.text["default"].trim(), where + " step text missing");
      // The teaching model (docs/41): every lesson adapts its introduction, every exercise its help.
      const type = lesson.steps[i].type;
      const firstInstruction = lesson.steps.findIndex(function (s) { return s.type === "instruction"; });
      if (i === firstInstruction) {
        ["short", "child"].forEach(function (variant) {
          assert(step.text && step.text[variant] && step.text[variant].trim(), where + " introduction needs a '" + variant + "' variant");
        });
      }
      if (type === "exercise") {
        ["default", "guided", "independent", "child.guided"].forEach(function (variant) {
          assert(step.text && step.text[variant] && step.text[variant].trim(), where + " exercise needs a '" + variant + "' variant");
        });
        assert(step.nudge && step.nudge.trim(), where + " exercise needs a general first hint (nudge) for independent help");
        assert(step.text.guided.length > step.text.independent.length, where + " guided text must say more than the bare goal");
      }
      assert(!!step.title === !!ref.steps[i].title, locale + ": step title presence differs: " + lesson.id + " #" + (i + 1));
      assert((step.hints || []).length === (ref.steps[i].hints || []).length, locale + ": hint count differs: " + lesson.id + " #" + (i + 1));
    });
    ["what", "recognize", "use", "example"].forEach(function (key) {
      assert(l.detail && l.detail[key], locale + ": detail." + key + " missing: " + lesson.id);
    });
  });

  structure.scenarios.forEach(function (scenario) {
    const s = (text.scenarios || {})[scenario.id];
    const ref = svCourse.scenarios[scenario.id];
    assert(s && s.title && s.description, locale + ": scenario text missing: " + scenario.id);
    // Every localized field present in Swedish must exist in this language too.
    (function walk(a, b, where) {
      Object.keys(a).forEach(function (key) {
        assert(b && b[key] !== undefined, locale + ": scenario field missing: " + scenario.id + " " + where + key);
        if (a[key] && typeof a[key] === "object") walk(a[key], b[key], where + key + ".");
      });
    })(ref, s, "");
  });
});

console.log("i18n completeness smoke test passed:", baseKeys.length, "interface strings,", structure.lessons.length, "lessons,", structure.scenarios.length, "scenarios in", LOCALES.join(" + "));
