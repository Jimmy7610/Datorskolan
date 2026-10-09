"use strict";

const { loadCourse, assert, fakeRuntime } = require("./helpers/load");
const course = loadCourse();
const t = function (key) { return window.DatorskolanI18n.dictionary("sv", "ui")[key]; };

const scenarios = course.scenarios("sv");
const lessons = course.lessons("sv");

function scenario(id) {
  return scenarios.find(function (item) { return item.id === id; });
}

function lesson(id) {
  return lessons.find(function (item) { return item.id === id; });
}

function completeScenarioWithEvents(id, events) {
  const runtime = fakeRuntime();
  const engine = new window.DatorskolanScenarioEngine(scenarios);
  engine.load(id, runtime);
  events.forEach(function (entry) {
    engine.observe(entry[0], entry[1] || {}, runtime);
  });
  assert(engine.active().status === "completed", "Scenario did not complete: " + id);
}

// Phase 5 - Windows.
completeScenarioWithEvents("windows-switch-01", [
  ["window.focused", { windowId: 2 }]
]);

completeScenarioWithEvents("windows-final-01", [
  ["startMenu.opened", {}],
  ["app.opened", { appId: "calculator" }],
  ["window.moved", { windowId: 1 }],
  ["window.minimized", { windowId: 1 }],
  ["window.restored", { windowId: 1 }],
  ["window.maximized", { windowId: 1 }],
  ["window.closed", { windowId: 1, appId: "calculator" }]
]);

// Phase 6 - Files.
completeScenarioWithEvents("files-final-01", [
  ["folder.created", {}],
  ["file.renamed", {}],
  ["file.moved", {}],
  ["file.deleted", {}],
  ["recycleBin.restored", {}]
]);

completeScenarioWithEvents("files-drag-01", [
  ["file.moved", { via: "drag-drop" }]
]);

// Phase 7 - Internet.
completeScenarioWithEvents("internet-final-01", [
  ["browser.addressUsed", {}],
  ["browser.linkOpened", {}],
  ["browser.tabOpened", {}],
  ["browser.back", {}],
  ["browser.forward", {}],
  ["browser.downloaded", { name: t("chrome.download.fileName") }]
]);

completeScenarioWithEvents("internet-close-tab-01", [
  ["browser.tabOpened", {}],
  ["browser.tabClosed", {}]
]);

// Phase 8 - Mail and security.
completeScenarioWithEvents("mail-final-01", [
  ["mail.opened", {}],
  ["mail.attachmentDownloaded", { name: t("mail.m1.attachment") }],
  ["mail.attachmentAdded", { name: t("mail.m1.attachment") }],
  ["mail.replied", { attachment: true }]
]);

completeScenarioWithEvents("security-phishing-01", [
  ["mail.phishingIdentified", { id: "m2" }]
]);

// Phase 9 - Adaptive progression.
const store = new window.DatorskolanProgressStore(null);
store.startLesson("windows-001-start");

// Even if a weak skill exists, in-progress must come first.
store.recordSkillAttempt("mouse.move", { success: false, hintLevel: 0 });
store.recordSkillAttempt("mouse.move", { success: false, hintLevel: 0 });

let recommendation = store.recommendLesson(lessons);
assert(
  recommendation && recommendation.id === "windows-001-start",
  "In-progress lesson must have recommendation priority"
);

store.completeLesson("windows-001-start");
recommendation = store.recommendLesson(lessons);
assert(recommendation && recommendation.id, "Recommendation missing after completing in-progress lesson");

// Phase 10 - learner modes.
store.setMode("child");
assert(store.profile().mode === "child", "Child mode not set");
store.setMode("fast");
assert(store.profile().mode === "fast", "Fast mode not set");

// Fast mode should enter an interactive lesson on its exercise.
let loadedScenario = null;
const lessonRuntime = {
  loadScenario: function (id) { loadedScenario = id; },
  getScenarioStatus: function () { return "running"; },
  setLearningHighlight: function () {}
};
const lessonEngine = new window.DatorskolanLessonEngine(lessons, store);
lessonEngine.start("internet-001-address", lessonRuntime);
assert(loadedScenario === "internet-address-01", "Lesson did not load scenario");
assert(lessonEngine.currentStep().type === "exercise", "Fast mode should skip to exercise");

// Persistence and review aging.
function memoryStorage(initial) {
  const data = Object.assign({}, initial || {});
  return {
    getItem: function (key) { return Object.prototype.hasOwnProperty.call(data,key) ? data[key] : null; },
    setItem: function (key,value) { data[key] = String(value); },
    removeItem: function (key) { delete data[key]; },
    dump: function () { return Object.assign({},data); }
  };
}

const persistentStorage = memoryStorage();
const persistentStore = new window.DatorskolanProgressStore(persistentStorage);
persistentStore.setMode("child");
persistentStore.startLesson("internet-001-address");
persistentStore.completeLesson("internet-001-address");

const reloadedStore = new window.DatorskolanProgressStore(persistentStorage);
assert(reloadedStore.profile().mode === "child", "Learner mode did not persist");
assert(reloadedStore.lesson("internet-001-address").status === "completed", "Lesson progress did not persist");

const staleState = reloadedStore.snapshot();
staleState.skills["review.skill"] = {
  skillId: "review.skill",
  status: "independent",
  attempts: 3,
  successes: 3,
  independentSuccesses: 3,
  hintLevelMax: 0,
  lastPracticedAt: "2020-01-01T00:00:00.000Z",
  retentionChecks: 0,
  masteryScore: 1
};
persistentStorage.setItem(window.DatorskolanProgressStore.STORAGE_KEY, JSON.stringify(staleState));

const agingStore = new window.DatorskolanProgressStore(persistentStorage);
agingStore.refreshReviewStatus(14);
assert(agingStore.skill("review.skill").status === "needs_review", "Old independent skill was not marked needs_review");

// Phase 11 - independent final exam.
completeScenarioWithEvents("final-independent-01", [
  ["browser.downloaded", { name: t("chrome.download.fileName") }],
  ["file.renamed", { name: "guide-klar.txt" }],
  ["mail.attachmentAdded", { name: "guide-klar.txt" }],
  ["mail.sent", { to: "anna@example.test", attachment: true, attachmentName: "guide-klar.txt" }]
]);

assert(lesson("final-001-independent"), "Independent final lesson missing");
assert(scenario("final-independent-01"), "Independent final scenario missing");

console.log(
  "Phases 5-11 smoke test passed:",
  lessons.length,
  "lessons,",
  scenarios.length,
  "scenarios"
);
