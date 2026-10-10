"use strict";

const { loadCourse, assert } = require("./helpers/load");
const course = loadCourse();

const progress = new window.DatorskolanProgressStore(null);
let scenarioStatus = "running";
const runtime = {
  loadScenario: function () { scenarioStatus = "running"; },
  getScenarioStatus: function () { return scenarioStatus; },
  setLearningHighlight: function () {}
};

const engine = new window.DatorskolanLessonEngine(course.lessons("sv"), progress);
assert(engine.list().length === 120, "Expected 120 lessons");

engine.start("files-001-create-folder", runtime);
assert(engine.active().status === "running", "Lesson should start");
assert(engine.currentStep().type === "instruction", "First step should be instruction");
engine.next();
assert(engine.currentStep().type === "demonstration", "Second step should be demonstration");
engine.next();
assert(engine.currentStep().type === "exercise", "Third step should be exercise");
engine.next();
assert(engine.currentStep().type === "exercise", "Incomplete exercise must not advance");
assert(engine.active().feedback.kind === "try-again" && engine.active().feedback.messageKey === "learn.feedback.tryAgain",
  "Retry feedback must be a translatable message key, not hardcoded text");

const hint = engine.requestHint();
assert(hint.kind === "hint" && hint.text.length > 0, "Hints come from the localized lesson text");

scenarioStatus = "completed";
engine.observe("file.renamed", { name: "Semester" });
assert(engine.active().feedback.messageKey === "learn.feedback.success", "Success feedback must be a message key");
engine.next();
assert(engine.currentStep().type === "checkpoint", "Completed exercise should advance");
engine.next();
assert(engine.active().status === "completed", "Lesson should complete on final step");
assert(progress.lesson("files-001-create-folder").status === "completed", "Progress should persist lesson completion");

const skill = progress.skill("files.create-folder");
assert(skill.successes >= 1, "Skill success should be recorded");
assert(skill.status !== "locked", "Skill should be introduced/progressed");

// Resume after reload: start a lesson, take two steps, "reload" (new store and engine on the same storage), continue.
const storage = {
  data: {},
  getItem: function (k) { return Object.prototype.hasOwnProperty.call(this.data, k) ? this.data[k] : null; },
  setItem: function (k, v) { this.data[k] = String(v); },
  removeItem: function (k) { delete this.data[k]; }
};
const loaded = [];
const resumeRuntime = Object.assign({}, runtime, { loadScenario: function (id) { loaded.push(id); scenarioStatus = "running"; } });
const before = new window.DatorskolanLessonEngine(course.lessons("sv"), new window.DatorskolanProgressStore(storage));
before.start("files-001-create-folder", resumeRuntime);
before.next();
before.next();
assert(before.currentStep().type === "exercise", "Setup: should be on the exercise");

const afterStore = new window.DatorskolanProgressStore(storage);
const after = new window.DatorskolanLessonEngine(course.lessons("sv"), afterStore);
const resumed = after.resume(resumeRuntime);
assert(resumed && resumed.id === "files-001-create-folder", "Lesson must resume after reload");
assert(after.currentStep().type === "exercise" && resumed.stepIndex === 2, "Lesson must resume on the same step");
assert(resumed.feedback.messageKey === "learn.feedback.resumed", "Resume must tell the learner they continue where they were");
assert(loaded.length === 2 && loaded[0] === loaded[1], "Resume must load the lesson's scenario fresh");
assert(afterStore.lesson("files-001-create-folder").attempts === 1, "Resuming is not a new attempt");

after.stop();
assert(new window.DatorskolanLessonEngine(course.lessons("sv"), new window.DatorskolanProgressStore(storage)).resume(resumeRuntime) === null,
  "A lesson the learner quit must not resume");

const finished = new window.DatorskolanLessonEngine(course.lessons("sv"), new window.DatorskolanProgressStore(storage));
finished.start("files-001-create-folder", resumeRuntime);
scenarioStatus = "completed";
finished.next(); finished.next(); finished.observe("file.renamed", { name: "Semester" }); finished.next(); finished.next();
assert(finished.active().status === "completed", "Setup: lesson should complete");
assert(new window.DatorskolanLessonEngine(course.lessons("sv"), new window.DatorskolanProgressStore(storage)).resume(resumeRuntime) === null,
  "A completed lesson must not resume");

console.log("Lesson Engine smoke test passed");
