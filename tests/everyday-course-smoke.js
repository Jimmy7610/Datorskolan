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
  {
    id:"everyday-copy-paste-01",
    events:[["everyday.copyPaste.complete",{}]]
  },
  {
    id:"everyday-pdf-01",
    events:[
      ["file.opened",{id:"file-pdf"}],
      ["pdf.zoomChanged",{zoom:110}],
      ["pdf.savedCopy",{name:"faktura-kopia.pdf"}]
    ],
    vfsGet:function(id){
      return id==="file-pdf" ? {id:"file-pdf",name:"faktura.pdf",type:"file",fileType:"pdf"} : null;
    }
  },
  {
    id:"everyday-wifi-01",
    events:[["settings.wifiConnected",{network:"HemmaNet"}]]
  },
  {
    id:"everyday-bluetooth-01",
    events:[["settings.bluetoothPaired",{device:"Headset"}]]
  },
  {
    id:"everyday-audio-camera-01",
    events:[["settings.audioConfigured",{volume:50,microphone:true,camera:true}]]
  },
  {
    id:"everyday-restart-01",
    events:[["settings.updateRestarted",{}]]
  },
  {
    id:"everyday-error-01",
    events:[
      ["troubleshooting.errorOpened",{code:"FILE_IN_USE"}],
      ["troubleshooting.errorHandled",{choice:"close",code:"FILE_IN_USE"}]
    ]
  },
  {
    id:"everyday-recovery-01",
    events:[
      ["troubleshooting.waited",{appId:"trouble-demo"}],
      ["troubleshooting.closedFrozen",{appId:"trouble-demo"}],
      ["troubleshooting.restarted",{appId:"trouble-demo"}]
    ]
  }
].forEach(function(sample){
  const engine=new window.DatorskolanScenarioEngine(scenarios);
  const rt=runtime();
  if(sample.vfsGet) rt.vfs.get=sample.vfsGet;
  engine.load(sample.id,rt);
  sample.events.forEach(function(entry){
    engine.observe(entry[0],entry[1]||{},rt);
  });
  assert(engine.active().status==="completed","Scenario did not complete: "+sample.id);
});

console.log("Everyday course smoke test passed:",lessons.length,"lessons,",interactive.length,"new interactive lessons");
