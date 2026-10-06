"use strict";

const fs = require("fs");

global.window = {};

require("../src/progress-store.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function memoryStorage() {
  const data = {};
  return {
    getItem: function (key) {
      return Object.prototype.hasOwnProperty.call(data,key) ? data[key] : null;
    },
    setItem: function (key,value) {
      data[key] = String(value);
    },
    removeItem: function (key) {
      delete data[key];
    }
  };
}

const storage = memoryStorage();
const store = new window.DatorskolanProgressStore(storage);

store.setMode("child");
store.startLesson("example");
store.completeLesson("example");
store.recordSkillAttempt("skill.example",{success:true,hintLevel:0});

assert(store.profile().mode === "child","Precondition: mode not changed");
assert(store.lesson("example").status === "completed","Precondition: lesson not completed");

const reset = store.reset();

assert(reset.userProfile.mode === "standard","Reset must restore standard mode");
assert(Object.keys(reset.lessons).length === 0,"Reset must remove lesson progress");
assert(Object.keys(reset.skills).length === 0,"Reset must remove skill progress");
assert(reset.events.length === 0,"Reset must remove progress events");

const shell = fs.readFileSync("src/product-shell.js","utf8");
const html = fs.readFileSync("index.html","utf8");

assert(html.includes("data-reset-school"),"Landing page reset button missing");
assert(html.includes("data-reset-dialog"),"Reset confirmation dialog missing");
assert(html.includes("data-reset-confirm"),"Reset confirm control missing");
assert(shell.includes("window.localStorage.removeItem(progressKey)"),"Product shell must remove persisted progress");
assert(shell.includes("window.location.reload()"),"Product shell must reload after reset");

console.log("Reset progress smoke test passed");
