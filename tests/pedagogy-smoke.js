"use strict";

/*
  Datorskolan's teaching model (docs/41-TEACHING-MODEL.md):
  audience (adult/child) × support (guided/normal/independent) × depth (detailed/normal/short) × language (sv/en).
*/
const { loadCourse, assert, LOCALES } = require("./helpers/load");
const course = loadCourse();
const Pedagogy = window.DatorskolanPedagogy;
const I18n = course.I18n;

function memoryStorage(initial) {
  const data = Object.assign({}, initial || {});
  return {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
    setItem: function (k, v) { data[k] = String(v); },
    removeItem: function (k) { delete data[k]; },
    raw: data
  };
}

const PROFILES = [];
Pedagogy.DIMENSIONS.audience.values.forEach(function (audience) {
  Pedagogy.DIMENSIONS.support.values.forEach(function (support) {
    Pedagogy.DIMENSIONS.depth.values.forEach(function (depth) {
      PROFILES.push({ audience: audience, support: support, depth: depth });
    });
  });
});
assert(PROFILES.length === 18, "Expected 2 × 3 × 3 profiles");

/* ---------- Resolver and fallback ---------- */
const sample = { "default": "base", guided: "guided", "child.guided": "child guided", short: "short" };
assert(Pedagogy.resolve(sample, { audience: "adult", support: "normal", depth: "normal" }) === "base", "Normal profile uses the shared text");
assert(Pedagogy.resolve(sample, { audience: "adult", support: "guided", depth: "normal" }) === "guided", "Guided variant");
assert(Pedagogy.resolve(sample, { audience: "child", support: "guided", depth: "normal" }) === "child guided", "Most specific variant wins");
assert(Pedagogy.resolve(sample, { audience: "child", support: "independent", depth: "normal" }) === "base", "Missing variant falls back to the shared text");
assert(Pedagogy.resolve(sample, { audience: "child", support: "guided", depth: "short" }) === "child guided", "A two-part variant is more specific than a one-part variant");
assert(Pedagogy.resolve({ "default": "base", guided: "guided", child: "child", short: "short" }, { audience: "child", support: "guided", depth: "short" }) === "short",
  "Among equally specific variants, depth outranks support, which outranks audience");
assert(Pedagogy.resolve("plain", { audience: "child", support: "guided", depth: "short" }) === "plain", "Plain strings are shared by every profile");
assert(Pedagogy.resolve({ "default": "base", guided: "   " }, { support: "guided" }) === "base", "Empty variants fall back");
assert(Pedagogy.resolve(undefined, {}) === "", "Missing text resolves to an empty string, not undefined");
assert(JSON.stringify(Pedagogy.normalizeProfile({ audience: "robot", support: "fast" })) === JSON.stringify(Pedagogy.DEFAULT_PROFILE), "Unknown values fall back to defaults");
assert(I18n.t(Pedagogy.variantKey(I18n, "learn.feedback.tryAgain", { audience: "child", support: "guided", depth: "short" })) === I18n.t("learn.feedback.tryAgain.child.guided"), "Interface messages have variants too");
assert(Pedagogy.variantKey(I18n, "learn.feedback.tryAgain", { audience: "adult", support: "normal", depth: "short" }) === "learn.feedback.tryAgain", "Interface variant falls back to the base key");

/* ---------- Hint ladder ---------- */
assert(Pedagogy.ladder("independent").join() === "0,1,2,3,4,5", "Independent starts with a general nudge");
assert(Pedagogy.ladder("normal").join() === "1,2,3,4,5", "Normal starts at where");
assert(Pedagogy.ladder("guided")[0] === 3, "Guided help gets concrete help first");
assert(Pedagogy.highlightVisible("exercise", "guided", -1), "Guided shows the yellow frame from the start");
assert(!Pedagogy.highlightVisible("exercise", "independent", 3), "Independent shows the frame only at the visual hint");
assert(Pedagogy.highlightVisible("exercise", "independent", 4), "Independent shows the frame at the visual hint");

/* ---------- Every lesson, every profile, both languages: nothing empty ---------- */
let checked = 0;
LOCALES.forEach(function (locale) {
  const lessons = course.lessons(locale);
  assert(lessons.length === 120, locale + ": expected 120 lessons");
  lessons.forEach(function (lesson) {
    PROFILES.forEach(function (profile) {
      lesson.steps.forEach(function (step, i) {
        const text = Pedagogy.resolve(step.text, profile);
        assert(text && text.trim().length > 3, locale + " " + lesson.id + " #" + (i + 1) + " empty for " + JSON.stringify(profile));
        if (step.type === "exercise") {
          Pedagogy.ladder(profile.support).forEach(function (rung) {
            assert(Pedagogy.hintText(step, rung, profile).trim(), locale + " " + lesson.id + " hint rung " + rung + " empty");
          });
        }
        checked += 1;
      });
    });
    const intro = lesson.steps.find(function (s) { return s.type === "instruction"; });
    const short = Pedagogy.resolve(intro.text, { depth: "short" });
    const normal = Pedagogy.resolve(intro.text, { depth: "normal" });
    const child = Pedagogy.resolve(intro.text, { audience: "child", depth: "normal" });
    assert(short.length < normal.length, locale + " " + lesson.id + ": short introduction must be shorter than normal");
    assert(child !== normal, locale + " " + lesson.id + ": child introduction must be written for children");
    const ex = lesson.steps.find(function (s) { return s.type === "exercise"; });
    if (ex) {
      const g = Pedagogy.resolve(ex.text, { support: "guided" });
      const n = Pedagogy.resolve(ex.text, { support: "normal" });
      const ind = Pedagogy.resolve(ex.text, { support: "independent" });
      assert(g.length > n.length && g !== n && n !== ind, locale + " " + lesson.id + ": guided, normal and independent must differ, guided saying the most");
      assert(Pedagogy.resolve(ex.text, { audience: "child", support: "guided" }) !== g, locale + " " + lesson.id + ": child guided text must differ");
      assert(ex.nudge && Pedagogy.hintText(ex, 0, {}) === Pedagogy.resolve(ex.nudge, {}), locale + " " + lesson.id + ": the first independent hint must be the general nudge");
      assert(Pedagogy.hintText(ex, 0, {}) !== Pedagogy.hintText(ex, 1, {}), locale + " " + lesson.id + ": the nudge must differ from the 'where' hint");
    }
  });
});

/* ---------- Child texts: simple and friendly, never babyish ---------- */
LOCALES.forEach(function (locale) {
  course.lessons(locale).forEach(function (lesson) {
    lesson.steps.forEach(function (step) {
      ["child", "child.guided"].forEach(function (key) {
        const text = step.text && step.text[key];
        if (!text) return;
        const where = locale + " " + lesson.id + " " + key;
        assert(!/→/.test(text), where + ": child texts are written as sentences, not arrow shorthand");
        assert(!/(^|[^a-zåäö])(pang|poof|trollknep|supersnabb\w*|jättestor\w*|bebis\w*|gullig\w*)/i.test(text), where + ": babyish wording");
        assert((text.replace(/\d!/g, "").match(/!/g) || []).length <= 1, where + ": at most one exclamation mark");
        assert(text.length <= 420, where + ": child text is too long");
      });
    });
  });
});

/* ---------- Saved settings, migration, language switch ---------- */
const storage = memoryStorage();
const store = new window.DatorskolanProgressStore(storage);
assert(JSON.stringify(store.learningProfile()) === JSON.stringify(Pedagogy.DEFAULT_PROFILE), "New learners get the default profile");
store.setLearning({ audience: "child" });
store.setLearning({ support: "independent" });
store.setLearning({ depth: "short", audience: "nonsense" });
const reloaded = new window.DatorskolanProgressStore(storage);
assert(JSON.stringify(reloaded.learningProfile()) === JSON.stringify({ audience: "child", support: "independent", depth: "short" }), "Settings survive a reload and change independently");

I18n.setLocale("en");
assert(JSON.stringify(new window.DatorskolanProgressStore(storage).learningProfile()) === JSON.stringify({ audience: "child", support: "independent", depth: "short" }), "Changing language keeps the teaching settings");
I18n.setLocale("sv");

[["standard", { audience: "adult", support: "normal", depth: "normal" }],
 ["child", { audience: "child", support: "normal", depth: "normal" }],
 ["fast", { audience: "adult", support: "normal", depth: "short" }]].forEach(function (entry) {
  const v1 = {
    version: 1,
    userProfile: { id: "local-user", displayName: "", mode: entry[0], createdAt: "2026-01-01T00:00:00.000Z", lastSeenAt: "2026-01-01T00:00:00.000Z", settings: {} },
    skills: { "files.create-folder": { skillId: "files.create-folder", status: "practicing", successes: 2 } },
    lessons: { "files-001-create-folder": { lessonId: "files-001-create-folder", status: "completed", currentStep: 4, attempts: 1 } },
    events: [{ type: "lesson.completed" }]
  };
  const old = memoryStorage({ "datorskolan.progress.v1": JSON.stringify(v1) });
  const migrated = new window.DatorskolanProgressStore(old);
  assert(JSON.stringify(migrated.learningProfile()) === JSON.stringify(entry[1]), "Old mode '" + entry[0] + "' migrates to " + JSON.stringify(entry[1]));
  assert(migrated.lesson("files-001-create-folder").status === "completed", "Migration keeps completed lessons (" + entry[0] + ")");
  assert(migrated.skill("files.create-folder").successes === 2, "Migration keeps skills (" + entry[0] + ")");
  const saved = JSON.parse(old.raw["datorskolan.progress.v1"]);
  assert(saved.version === 2 && !("mode" in saved.userProfile), "Migrated progress is saved in the new shape");
});

/* ---------- Real lessons from start to finish in different combinations ---------- */
function runLesson(lessonId, profile, locale) {
  const s = new window.DatorskolanProgressStore(memoryStorage());
  s.setLearning(profile);
  let status = "running";
  let highlight = null;
  const runtime = {
    loadScenario: function () { status = "running"; },
    getScenarioStatus: function () { return status; },
    setLearningHighlight: function (sel) { highlight = sel; }
  };
  const engine = new window.DatorskolanLessonEngine(course.lessons(locale), s);
  engine.start(lessonId, runtime);
  let guard = 0;
  let hintsSeen = [];
  while (engine.active().status === "running" && guard < 20) {
    guard += 1;
    const step = engine.currentStep();
    assert(Pedagogy.resolve(step.text, engine.profile()).trim(), lessonId + ": empty step text for " + JSON.stringify(profile));
    if (step.type === "exercise") {
      engine.next();
      assert(engine.active().feedback.kind === "try-again", lessonId + ": unfinished exercise must not pass");
      const feedbackKey = Pedagogy.variantKey(I18n, engine.active().feedback.messageKey, engine.profile());
      assert(I18n.has(feedbackKey), lessonId + ": feedback key missing: " + feedbackKey);
      let hint;
      while (engine.hintsRemaining() > 0) {
        hint = engine.requestHint();
        hintsSeen.push(hint.rung);
      }
      assert(hint.rung === 5, lessonId + ": the last hint must be the full solution");
      if (step.visualTarget) assert(highlight === step.visualTarget, lessonId + ": the yellow frame must show at the end of the hints");
      status = "completed";
      engine.observe("scenario.completed", {});
    }
    engine.next();
  }
  assert(engine.active().status === "completed", lessonId + " did not complete for " + JSON.stringify(profile) + " " + locale);
  return hintsSeen;
}

[
  ["files-001-create-folder", { audience: "adult", support: "guided", depth: "detailed" }, "sv"],
  ["files-001-create-folder", { audience: "child", support: "independent", depth: "short" }, "en"],
  ["windows-001-start", { audience: "child", support: "guided", depth: "normal" }, "sv"],
  ["windows-003-move", { audience: "adult", support: "normal", depth: "short" }, "en"],
  ["internet-001-address", { audience: "adult", support: "independent", depth: "detailed" }, "sv"],
  ["mail-004-attach", { audience: "child", support: "normal", depth: "detailed" }, "en"],
  ["everyday-012-install", { audience: "adult", support: "guided", depth: "short" }, "sv"],
  ["final-001-independent", { audience: "child", support: "independent", depth: "normal" }, "en"],
  ["basics-001-computer", { audience: "child", support: "guided", depth: "detailed" }, "sv"]
].forEach(function (run) {
  const rungs = runLesson(run[0], run[1], run[2]);
  if (rungs.length) assert(rungs.join() === Pedagogy.ladder(run[1].support).join(), run[0] + ": hint ladder does not follow the help level");
});

/* ---------- Adaptive help: offered, never forced ---------- */
(function () {
  const s = new window.DatorskolanProgressStore(memoryStorage());
  s.setLearning({ support: "independent" });
  const runtime = { loadScenario: function () {}, getScenarioStatus: function () { return "running"; }, setLearningHighlight: function () {} };
  const engine = new window.DatorskolanLessonEngine(course.lessons("sv"), s);
  engine.start("windows-001-start", runtime);
  engine.next(); // to the exercise
  assert(engine.currentStep().type === "exercise", "Setup: on the exercise");
  assert(!engine.shouldOfferMoreHelp(Date.now()), "No offer before the learner seems stuck");
  assert(engine.shouldOfferMoreHelp(Date.now() + Pedagogy.STUCK.idleMs + 1), "Offer after waiting a long time");
  engine.next();
  engine.next();
  assert(engine.shouldOfferMoreHelp(Date.now()), "Offer after repeated failed checks");
  engine.declineMoreHelp();
  assert(!engine.shouldOfferMoreHelp(Date.now()), "A declined offer is not repeated on the same exercise");
  assert(s.learningProfile().support === "independent", "Declining keeps the setting");

  const s2 = new window.DatorskolanProgressStore(memoryStorage());
  s2.setLearning({ support: "normal" });
  const e2 = new window.DatorskolanLessonEngine(course.lessons("sv"), s2);
  e2.start("windows-001-start", runtime);
  e2.next();
  e2.requestHint(); e2.requestHint(); e2.requestHint();
  assert(e2.shouldOfferMoreHelp(Date.now()), "Offer after opening several hints");
  e2.acceptMoreHelp();
  assert(e2.profile().support === "guided", "Accepting gives guided help for this exercise");
  assert(s2.learningProfile().support === "normal", "Accepting never changes the saved setting");
  assert(Pedagogy.highlightVisible("exercise", e2.profile().support, e2.active().hintRung), "Accepted help shows where to click");

  const s3 = new window.DatorskolanProgressStore(memoryStorage());
  s3.setLearning({ support: "guided" });
  const e3 = new window.DatorskolanLessonEngine(course.lessons("sv"), s3);
  e3.start("windows-001-start", runtime);
  e3.next();
  e3.next(); e3.next();
  assert(!e3.shouldOfferMoreHelp(Date.now() + 10 * Pedagogy.STUCK.idleMs), "Guided learners already get the clearest help");
})();

/* ---------- Resume after reload keeps the profile and the step ---------- */
(function () {
  const storage2 = memoryStorage();
  const s = new window.DatorskolanProgressStore(storage2);
  s.setLearning({ audience: "child", support: "independent", depth: "detailed" });
  const runtime = { loadScenario: function () {}, getScenarioStatus: function () { return "running"; }, setLearningHighlight: function () {} };
  const before = new window.DatorskolanLessonEngine(course.lessons("sv"), s);
  before.start("files-003-rename", runtime);
  before.next();
  const reloadedStore = new window.DatorskolanProgressStore(storage2);
  const after = new window.DatorskolanLessonEngine(course.lessons("en"), reloadedStore);
  const resumed = after.resume(runtime);
  assert(resumed && resumed.stepIndex === 1, "Resume continues on the same step, also after a language switch");
  assert(after.profile().audience === "child" && after.profile().support === "independent" && after.profile().depth === "detailed", "Resume keeps the teaching settings");
  assert(Pedagogy.resolve(after.currentStep().text, after.profile()) === "Rename Draft.txt to Report.txt.", "Resumed lesson shows the independent goal in the new language");
})();

console.log("Pedagogy smoke test passed:", PROFILES.length, "profiles ×", LOCALES.length, "languages,", checked, "step renderings checked");
