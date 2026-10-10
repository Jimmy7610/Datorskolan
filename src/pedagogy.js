/*
  Datorskolan's teaching model.

  A learner chooses three independent things (plus the language, which lives in src/i18n.js):

    audience  adult | child                     – tone, words, examples. Never the difficulty.
    support   guided | normal | independent     – how much help the exercise gives.
    depth     detailed | normal | short         – how much is explained around it.

  Lesson texts in locales/<lang>/course.js stay ONE lesson per language. Any text field can be a plain
  string (shared by every combination) or an object with variants:

    "text": {
      "default": "Open File Explorer by clicking the folder icon in the taskbar.",
      "guided": "Look at the bottom of the screen …",
      "independent": "Open File Explorer.",
      "child.guided": "…"
    }

  resolve() picks the most specific variant that exists and otherwise falls back to the shared text,
  so a variant is written only where the teaching really differs.

  This file is pure logic (no DOM) and is shared by the lesson engine, the coach panel and the tests.
*/
(function (global) {
  "use strict";

  var DIMENSIONS = {
    audience: { values: ["adult", "child"], fallback: "adult" },
    support: { values: ["guided", "normal", "independent"], fallback: "normal" },
    depth: { values: ["detailed", "normal", "short"], fallback: "normal" }
  };

  // What a brand-new learner gets: the course is written for people who have hardly used a computer.
  var DEFAULT_PROFILE = { audience: "adult", support: "guided", depth: "normal" };

  // When two variants are equally specific, the one for the stronger dimension wins:
  // a short explanation stays short for a child, and guided help stays guided.
  var WEIGHT = { depth: 4, support: 2, audience: 1 };
  var ORDER = ["audience", "support", "depth"];

  function normalizeProfile(profile) {
    var result = {};
    Object.keys(DIMENSIONS).forEach(function (name) {
      var value = profile && profile[name];
      result[name] = DIMENSIONS[name].values.indexOf(value) >= 0 ? value : DEFAULT_PROFILE[name];
    });
    return result;
  }

  // Variant keys to try for a profile, most specific first. "adult" and "normal" are the shared base.
  function candidateKeys(profile) {
    var p = normalizeProfile(profile);
    var active = ORDER.filter(function (name) { return p[name] !== DIMENSIONS[name].fallback; });
    var subsets = [];
    var count = Math.pow(2, active.length);
    for (var mask = count - 1; mask > 0; mask -= 1) {
      var names = active.filter(function (name, index) { return mask & (1 << index); });
      subsets.push(names);
    }
    subsets.sort(function (a, b) {
      if (b.length !== a.length) return b.length - a.length;
      var wa = a.reduce(function (sum, n) { return sum + WEIGHT[n]; }, 0);
      var wb = b.reduce(function (sum, n) { return sum + WEIGHT[n]; }, 0);
      return wb - wa;
    });
    return subsets.map(function (names) {
      return names.map(function (name) { return p[name]; }).join(".");
    }).concat(["default"]);
  }

  function isVariantObject(value) {
    return value && typeof value === "object" && !Array.isArray(value) && typeof value["default"] === "string";
  }

  // Returns the text for this profile. Plain strings are shared by every profile.
  function resolve(value, profile) {
    if (value === undefined || value === null) return "";
    if (typeof value === "string") return value;
    if (!isVariantObject(value)) return "";
    var keys = candidateKeys(profile);
    for (var i = 0; i < keys.length; i += 1) {
      var text = value[keys[i]];
      if (typeof text === "string" && text.trim()) return text;
    }
    return "";
  }

  // Translation keys with variants: learn.feedback.tryAgain.child.guided → … → learn.feedback.tryAgain
  function variantKey(I18n, baseKey, profile) {
    var keys = candidateKeys(profile);
    for (var i = 0; i < keys.length - 1; i += 1) {
      if (I18n.has(baseKey + "." + keys[i])) return baseKey + "." + keys[i];
    }
    return baseKey;
  }

  /* ---------- Hints ----------
     Every exercise has one hint ladder, from general to concrete:
       rung 0  nudge   – think about where this happens   ("Where does Windows usually show your files?")
       rung 1  where   – which part of the screen
       rung 2  which   – which control
       rung 3  how     – what to do with it
       rung 4  look    – the yellow frame shows it (visual highlight)
       rung 5  all     – the whole solution
     The help level decides where the learner starts on the ladder and when the frame appears. */
  var LADDERS = {
    independent: [0, 1, 2, 3, 4, 5],
    normal: [1, 2, 3, 4, 5],
    guided: [3, 5]
  };
  var VISUAL_RUNG = 4;

  function ladder(support) {
    return LADDERS[support] || LADDERS.normal;
  }

  function hintText(step, rung, profile) {
    if (rung === 0) return resolve(step.nudge, profile) || resolve((step.hints || [])[0], profile);
    var hints = step.hints || [];
    return resolve(hints[Math.min(rung - 1, hints.length - 1)], profile);
  }

  // Guided help shows where to click from the start; otherwise the frame comes with the "look" hint.
  function highlightVisible(stepType, support, rung) {
    if (stepType === "demonstration") return true;
    if (stepType !== "exercise") return false;
    return support === "guided" || rung >= VISUAL_RUNG;
  }

  /* ---------- Explanations ----------
     The "More about this" panel shows more or less of the shared lesson detail. */
  var DETAIL_FIELDS = {
    short: ["what", "recognize"],
    normal: ["what", "recognize", "use", "example"],
    detailed: ["what", "recognize", "use", "example"]
  };
  var DETAIL_LISTS = {
    short: [],
    normal: ["steps"],
    detailed: ["steps", "everyday", "mistakes"]
  };

  function detailSections(depth) {
    return { fields: DETAIL_FIELDS[depth] || DETAIL_FIELDS.normal, lists: DETAIL_LISTS[depth] || DETAIL_LISTS.normal, open: depth === "detailed" };
  }

  // The introduction explains WHY as well as WHAT when the learner wants detailed explanations.
  function showWhy(stepType, depth) {
    return depth === "detailed" && stepType === "instruction";
  }

  /* ---------- Adaptive help ----------
     Offered (never forced) when someone seems stuck on an exercise. */
  var STUCK = { failedChecks: 2, hints: 3, idleMs: 90000 };

  function shouldOfferMoreHelp(active, support, now) {
    if (!active || active.status !== "running") return false;
    if (support === "guided" || active.supportOverride === "guided" || active.helpOfferDismissed) return false;
    if (active.validatorPassed) return false;
    var stuckByChecks = (active.attemptsOnStep || 0) >= STUCK.failedChecks;
    var stuckByHints = (active.hintLevel || 0) >= STUCK.hints;
    var stuckByTime = active.stepStartedAt && now - active.stepStartedAt >= STUCK.idleMs;
    return !!(stuckByChecks || stuckByHints || stuckByTime);
  }

  // Splits a guided instruction into its sentences so it can be shown one action per line.
  // Breaks only after . ! ? followed by a capital letter, so "plan.txt" or "Ctrl+S." mid-sentence stay intact.
  function splitSteps(text) {
    if (!text) return [];
    return text.split(/(?<=[.!?])\s+(?=[\p{Lu}\d"“])/u).map(function (s) { return s.trim(); }).filter(Boolean);
  }

  // Old progress (one "mode" setting) → the new three settings. "Fast" was never an audience.
  function migrateMode(mode) {
    if (mode === "child") return { audience: "child", support: "normal", depth: "normal" };
    if (mode === "fast") return { audience: "adult", support: "normal", depth: "short" };
    return { audience: "adult", support: "normal", depth: "normal" };
  }

  global.DatorskolanPedagogy = {
    DIMENSIONS: DIMENSIONS,
    DEFAULT_PROFILE: DEFAULT_PROFILE,
    STUCK: STUCK,
    VISUAL_RUNG: VISUAL_RUNG,
    normalizeProfile: normalizeProfile,
    candidateKeys: candidateKeys,
    isVariantObject: isVariantObject,
    resolve: resolve,
    variantKey: variantKey,
    ladder: ladder,
    hintText: hintText,
    highlightVisible: highlightVisible,
    detailSections: detailSections,
    showWhy: showWhy,
    shouldOfferMoreHelp: shouldOfferMoreHelp,
    splitSteps: splitSteps,
    migrateMode: migrateMode
  };
})(typeof window !== "undefined" ? window : globalThis);
