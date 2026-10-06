"use strict";

global.window = {};

require("../src/scenarios.js");
require("../src/advanced-scenarios.js");
require("../src/everyday-scenarios.js");
require("../src/scenario-engine.js");

function assert(condition,message){
  if(!condition) throw new Error(message);
}

const scenarios=window.DatorskolanScenarios||[];
const byId={};
scenarios.forEach(function(s){byId[s.id]=s;});

Object.keys(byId)
  .filter(function(id){return id.indexOf("everyday-")===0;})
  .forEach(function(id){
    var start=byId[id].start||{};
    assert(!Object.prototype.hasOwnProperty.call(start,"everydayMode"),
      "Realism regression: "+id+" still uses everydayMode");
  });

function runtime(){
  const nodes={
    "file-pdf":{id:"file-pdf",name:"faktura.pdf",type:"file",fileType:"pdf"},
    "zip-1":{id:"zip-1",name:"Bilder.zip",type:"file",fileType:"zip"}
  };
  return {
    vfs:{
      reset:function(){},
      get:function(id){return nodes[id]||null;},
      list:function(){return [];},
      createFile:function(){return {};},
      createFolder:function(){return {};},
      mountDrive:function(){return {};},
      unmountDrive:function(){return true;}
    },
    resetForScenario:function(){},
    setExplorerFolder:function(){},
    setMouseMode:function(){},
    applyStartState:function(){},
    openApp:function(){}
  };
}

function complete(id,events){
  assert(byId[id],"Missing scenario: "+id);
  const e=new window.DatorskolanScenarioEngine(scenarios);
  const rt=runtime();
  e.load(id,rt);
  events.forEach(function(entry){
    e.observe(entry[0],entry[1]||{},rt);
  });
  assert(e.active().status==="completed","Realistic scenario did not complete: "+id);
}

complete("everyday-pin-taskbar-01",[
  ["shell.taskbarPinned",{appId:"browser"}]
]);

complete("everyday-snap-01",[
  ["window.snapped",{appId:"browser",side:"left"}],
  ["window.snapped",{appId:"notepad",side:"right"}]
]);

complete("everyday-link-actions-01",[
  ["browser.linkCopied",{url:"datorskolan.local/internet"}],
  ["browser.linkOpenedInNewTab",{url:"datorskolan.local/internet"}]
]);

complete("everyday-copy-paste-01",[
  ["browser.textCopied",{text:"Telefon: 070-123 45 67"}],
  ["notepad.pasted",{text:"Telefon: 070-123 45 67"}]
]);

complete("everyday-undo-redo-01",[
  ["notepad.input",{length:5}],
  ["notepad.undo",{}],
  ["notepad.redo",{}]
]);

complete("everyday-save-location-01",[
  ["browser.downloaded",{name:"guide.txt"}],
  ["folder.opened",{folderId:"downloads"}]
]);

complete("everyday-pdf-01",[
  ["file.opened",{id:"file-pdf"}],
  ["pdf.zoomChanged",{zoom:110}],
  ["pdf.savedCopy",{name:"faktura-kopia.pdf"}]
]);

complete("everyday-print-pdf-01",[
  ["print.pdfCreated",{name:"utskrift.pdf",printer:"Microsoft Print to PDF"}]
]);

complete("everyday-zip-01",[
  ["archive.extracted",{sourceName:"Bilder.zip"}]
]);

complete("everyday-usb-01",[
  ["file.copied",{parentId:"documents"}],
  ["device.usbEjected",{id:"usb-drive"}]
]);

complete("everyday-wifi-01",[
  ["settings.wifiConnected",{network:"HemmaNet"}]
]);

complete("everyday-bluetooth-01",[
  ["settings.bluetoothPaired",{device:"Headset"}]
]);

complete("everyday-audio-camera-01",[
  ["settings.audioConfigured",{volume:50,microphone:true,camera:true}]
]);

complete("everyday-install-01",[
  ["software.installed",{appId:"exercise-program"}],
  ["software.uninstalled",{appId:"exercise-program"}]
]);

complete("everyday-cloud-01",[
  ["file.moved",{parentId:"onedrive"}]
]);

complete("everyday-dialog-01",[
  ["notepad.input",{length:4}],
  ["dialog.unsavedOpened",{appId:"notepad"}],
  ["dialog.unsavedChoice",{choice:"discard"}]
]);

complete("everyday-screenshot-01",[
  ["screenshot.captured",{width:300,height:200}],
  ["screenshot.saved",{name:"Skärmbild.png",parentId:"pictures"}]
]);

complete("everyday-error-01",[
  ["troubleshooting.errorOpened",{code:"FILE_IN_USE"}],
  ["troubleshooting.errorHandled",{choice:"close",code:"FILE_IN_USE"}]
]);

complete("everyday-restart-01",[
  ["settings.updateRestarted",{}]
]);

complete("everyday-recovery-01",[
  ["troubleshooting.waited",{appId:"trouble-demo"}],
  ["troubleshooting.closedFrozen",{appId:"trouble-demo"}],
  ["troubleshooting.restarted",{appId:"trouble-demo"}]
]);

console.log("Realism scenarios smoke test passed");
