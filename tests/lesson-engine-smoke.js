"use strict";

global.window = {};

require("../src/scenarios.js");
require("../src/scenario-engine.js");
require("../src/progress-store.js");
require("../src/lessons.js");
require("../src/lesson-engine.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

var progress = new window.DatorskolanProgressStore(null);
var scenarioStatus = "running";

var runtime = {
  loadScenario: function () {
    scenarioStatus = "running";
  },
  getScenarioStatus: function () {
    return scenarioStatus;
  },
  setLearningHighlight: function () {}
};

var engine = new window.DatorskolanLessonEngine(
  window.DatorskolanLessons,
  progress
);

assert(engine.list().length >= 3, "Expected starter lessons");

engine.start("files-001-create-folder", runtime);
assert(engine.active().status === "running", "Lesson should start");
assert(engine.currentStep().type === "instruction", "First step should be instruction");

engine.next();
assert(engine.currentStep().type === "demonstration", "Second step should be demonstration");

engine.next();
assert(engine.currentStep().type === "exercise", "Third step should be exercise");

engine.next();
assert(engine.currentStep().type === "exercise", "Incomplete exercise must not advance");

scenarioStatus = "completed";
engine.observe("file.renamed", { name: "Semester" });
engine.next();

assert(engine.currentStep().type === "checkpoint", "Completed exercise should advance");

engine.next();
assert(engine.active().status === "completed", "Lesson should complete on final step");
assert(progress.lesson("files-001-create-folder").status === "completed", "Progress should persist lesson completion");

var skill = progress.skill("files.create-folder");
assert(skill.successes >= 1, "Skill success should be recorded");
assert(skill.status !== "locked", "Skill should be introduced/progressed");

console.log("Lesson Engine smoke test passed");
