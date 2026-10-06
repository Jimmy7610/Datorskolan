"use strict";

const fs = require("fs");

global.window = {};

require("../src/scenarios.js");
require("../src/advanced-scenarios.js");
require("../src/everyday-scenarios.js");
require("../src/lessons.js");
require("../src/advanced-lessons.js");
require("../src/everyday-lessons.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const scenarios = window.DatorskolanScenarios || [];
const lessons = window.DatorskolanLessons || [];

function uniqueIds(items, label) {
  const seen = new Set();
  items.forEach(function (item) {
    assert(item && item.id, label + " without id");
    assert(!seen.has(item.id), "Duplicate " + label + " id: " + item.id);
    seen.add(item.id);
  });
}

uniqueIds(scenarios, "scenario");
uniqueIds(lessons, "lesson");

const validGoalTypes = new Set([
  "node-exists",
  "text-file-exists",
  "event",
  "event-seen",
  "all",
  "any"
]);

function walkGoal(goal, eventTypes) {
  if (!goal) return;

  assert(validGoalTypes.has(goal.type), "Unknown goal type: " + goal.type);

  if (goal.type === "event" || goal.type === "event-seen") {
    assert(goal.eventType, "Event goal without eventType");
    eventTypes.add(goal.eventType);
  }

  if (goal.type === "all" || goal.type === "any") {
    assert(Array.isArray(goal.goals) && goal.goals.length > 0, goal.type + " goal without children");
    goal.goals.forEach(function (child) {
      walkGoal(child, eventTypes);
    });
  }
}

const scenarioEventTypes = new Set();
scenarios.forEach(function (scenario) {
  walkGoal(scenario.goal, scenarioEventTypes);
});

const sourceText = [
  fs.readFileSync("src/app.js", "utf8"),
  fs.readFileSync("src/advanced-apps.js", "utf8"),
  fs.readFileSync("src/everyday-apps.js", "utf8"),
  fs.readFileSync("src/chrome-app.js", "utf8"),
  fs.readFileSync("src/settings-app.js", "utf8"),
  fs.readFileSync("src/installer-app.js", "utf8"),
  fs.readFileSync("src/snipping-app.js", "utf8"),
  fs.readFileSync("src/pdf-app.js", "utf8")
].join("\n");

// Capture every event-like string literal from runtime sources. This intentionally
// handles direct emit calls as well as ternary expressions passed to emit().
const runtimeEventStrings = new Set();
for (const match of sourceText.matchAll(/["']([a-zA-Z][a-zA-Z0-9-]*\.[a-zA-Z0-9._-]+)["']/g)) {
  runtimeEventStrings.add(match[1]);
}

scenarioEventTypes.forEach(function (eventType) {
  assert(
    runtimeEventStrings.has(eventType),
    "Scenario waits for event that runtime never references: " + eventType
  );
});

const knownApps = new Set([
  "explorer",
  "calculator",
  "notepad",
  "photos",
  "recycle-bin",
  "mouse-lab",
  "keyboard-lab",
  "everyday-lab",
  "browser",
  "settings",
  "pdf",
  "installer",
  "snipping",
  "mail"
]);

scenarios.forEach(function (scenario) {
  const openApps = scenario.start && scenario.start.openApps;
  if (!Array.isArray(openApps)) return;

  openApps.forEach(function (appId) {
    assert(knownApps.has(appId), "Scenario references unknown app: " + scenario.id + " -> " + appId);
  });
});

const scenarioIds = new Set(scenarios.map(function (scenario) { return scenario.id; }));
lessons.forEach(function (lesson) {
  if (!lesson.scenarioId) return;
  assert(
    scenarioIds.has(lesson.scenarioId),
    "Lesson references missing scenario: " + lesson.id + " -> " + lesson.scenarioId
  );
});

console.log(
  "Event contract smoke test passed:",
  scenarios.length,
  "scenarios,",
  lessons.length,
  "lessons,",
  scenarioEventTypes.size,
  "scenario event types"
);
