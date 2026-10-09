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

console.log("Lesson Engine smoke test passed");
