/*
  Course composer: merges the language-neutral structure (src/course/*.js)
  with the active locale's texts (locales/<lang>/course.js).

  Missing translations fall back to the default locale so the course never breaks,
  and tests/i18n-completeness-smoke.js fails the build when anything is missing.
*/
(function (global) {
  "use strict";

  var I18n = global.DatorskolanI18n;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  // Deep merge where arrays are merged by index (structure decides the length).
  function overlay(base, text) {
    if (text === undefined || text === null) return base;
    if (Array.isArray(base)) {
      return base.map(function (item, index) {
        return overlay(item, Array.isArray(text) ? text[index] : undefined);
      });
    }
    if (isObject(base) && isObject(text)) {
      var result = {};
      Object.keys(base).forEach(function (key) { result[key] = base[key]; });
      Object.keys(text).forEach(function (key) {
        result[key] = key in base ? overlay(base[key], text[key]) : clone(text[key]);
      });
      return result;
    }
    return base === undefined ? clone(text) : base;
  }

  function courseText(locale) {
    return I18n.dictionary(locale || I18n.locale(), "course");
  }

  function fallbackText() {
    return courseText(I18n.DEFAULT_LOCALE);
  }

  function section(name, locale) {
    var primary = courseText(locale)[name] || {};
    var fallback = fallbackText()[name] || {};
    return { primary: primary, fallback: fallback };
  }

  function moduleInfo(moduleId, locale) {
    var modules = section("modules", locale);
    var primary = modules.primary[moduleId] || {};
    var fallback = modules.fallback[moduleId] || {};
    return {
      title: primary.title || fallback.title || moduleId,
      everyday: primary.everyday || fallback.everyday || [],
      mistakes: primary.mistakes || fallback.mistakes || []
    };
  }

  function lessonText(id, locale) {
    var lessons = section("lessons", locale);
    return lessons.primary[id] || lessons.fallback[id] || null;
  }

  function scenarioText(id, locale) {
    var scenarios = section("scenarios", locale);
    return scenarios.primary[id] || scenarios.fallback[id] || null;
  }

  function composeLesson(structure, locale) {
    var text = lessonText(structure.id, locale) || {};
    var lesson = clone(structure);
    lesson.title = text.title || structure.id;
    lesson.summary = text.summary || "";
    lesson.steps = structure.steps.map(function (step, index) {
      var stepText = (text.steps && text.steps[index]) || {};
      var composed = clone(step);
      if (stepText.title) composed.title = stepText.title;
      // Text may be a plain string or an object with teaching variants (see src/pedagogy.js).
      composed.text = stepText.text ? clone(stepText.text) : "";
      if (stepText.hints) composed.hints = stepText.hints.slice();
      if (stepText.nudge) composed.nudge = clone(stepText.nudge);
      return composed;
    });

    var module = moduleInfo(structure.moduleId, locale);
    var detail = clone(text.detail || {});
    if (!Array.isArray(detail.everyday) || !detail.everyday.length) detail.everyday = (module.everyday || []).slice();
    if (!Array.isArray(detail.mistakes) || !detail.mistakes.length) detail.mistakes = (module.mistakes || []).slice();
    lesson.detail = detail;
    return lesson;
  }

  function lessons(locale) {
    return (global.DatorskolanLessons || []).map(function (structure) {
      return composeLesson(structure, locale);
    });
  }

  function scenarios(locale) {
    return (global.DatorskolanScenarios || []).map(function (structure) {
      return overlay(clone(structure), scenarioText(structure.id, locale));
    });
  }

  function moduleOrder() {
    return (global.DatorskolanModuleOrder || []).slice();
  }

  function moduleTitle(moduleId, locale) {
    return moduleInfo(moduleId, locale).title;
  }

  global.DatorskolanCourse = {
    lessons: lessons,
    scenarios: scenarios,
    moduleOrder: moduleOrder,
    moduleTitle: moduleTitle,
    overlay: overlay
  };
})(typeof window !== "undefined" ? window : globalThis);
