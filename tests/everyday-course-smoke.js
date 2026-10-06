"use strict";

global.window = {};

require("../src/scenarios.js");
require("../src/advanced-scenarios.js");
require("../src/everyday-scenarios.js");
require("../src/scenario-engine.js");
require("../src/lessons.js");
require("../src/advanced-lessons.js");
require("../src/everyday-lessons.js");
require("../src/lesson-enrichment.js");

function assert(condition,message){
  if(!condition) throw new Error(message);
}

const lessons=window.DatorskolanLessons||[];
const scenarios=window.DatorskolanScenarios||[];
const ids=new Set(scenarios.map(function(s){return s.id;}));

["everyday","devices","troubleshooting"].forEach(function(moduleId){
  assert(lessons.some(function(l){return l.moduleId===moduleId;}),"Missing module: "+moduleId);
});

assert(lessons.length>=120,"Expected at least 120 lessons, got "+lessons.length);

const interactive=lessons.filter(function(l){
  return ["everyday","devices","troubleshooting"].indexOf(l.moduleId)>=0 && l.scenarioId;
});

interactive.forEach(function(lesson){
  assert(ids.has(lesson.scenarioId),"Missing everyday scenario for "+lesson.id);
  assert(lesson.detail,"Missing detail for "+lesson.id);
  assert(Array.isArray(lesson.detail.everyday)&&lesson.detail.everyday.length>=2,"Missing everyday examples: "+lesson.id);
  assert(Array.isArray(lesson.detail.mistakes)&&lesson.detail.mistakes.length>=2,"Missing common mistakes: "+lesson.id);
});

function runtime(){
  return {
    vfs:{
      reset:function(){},
      get:function(){return null;},
      list:function(){return [];},
      createFile:function(){return {};},
      createFolder:function(){return {};}
    },
    resetForScenario:function(){},
    setExplorerFolder:function(){},
    setMouseMode:function(){},
    applyStartState:function(){},
    openApp:function(){}
  };
}

[
  ["everyday-copy-paste-01","everyday.copyPaste.complete",{}],
  ["everyday-pdf-01","everyday.pdf.complete",{}],
  ["everyday-wifi-01","settings.wifiConnected",{network:"HemmaNet"}],
  ["everyday-bluetooth-01","settings.bluetoothPaired",{device:"Headset"}],
  ["everyday-audio-camera-01","settings.audioConfigured",{volume:50,microphone:true,camera:true}],
  ["everyday-restart-01","settings.updateRestarted",{}],
  ["everyday-error-01","everyday.errorRead.complete",{}],
  ["everyday-recovery-01","everyday.recovery.complete",{}]
].forEach(function(entry){
  const engine=new window.DatorskolanScenarioEngine(scenarios);
  const rt=runtime();
  engine.load(entry[0],rt);
  engine.observe(entry[1],entry[2]||{},rt);
  assert(engine.active().status==="completed","Scenario did not complete: "+entry[0]);
});

console.log("Everyday course smoke test passed:",lessons.length,"lessons,",interactive.length,"new interactive lessons");
