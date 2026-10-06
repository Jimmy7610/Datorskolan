"use strict";

const fs = require("fs");

global.window = {
  localStorage: {
    _data: {},
    getItem: function (k) { return this._data[k] || null; },
    setItem: function (k,v) { this._data[k] = String(v); },
    removeItem: function (k) { delete this._data[k]; }
  }
};

require("../src/win11-ui.js");

function assert(condition,message){
  if(!condition) throw new Error(message);
}

var ui=window.DatorskolanWindows11;
assert(ui,"Windows 11 UI registry missing");
assert(ui.FLUENT_ROOT==="./assets/icons/fluent/","Unexpected Fluent asset root");

[
  "start","explorer","folder","folder-documents","pictures","recycle",
  "calculator","notepad","photos","mail","settings","text-file","pdf",
  "zip","image-file","school","flask","home","wifi","speaker","battery",
  "download","snipping","onedrive","usb-drive","this-pc"
].forEach(function(name){
  var markup=ui.icon(name,24);
  assert(markup.indexOf("<img")>=0,"System icon is not file-backed: "+name);
  assert(markup.indexOf("assets/icons/fluent/")>=0,"System icon is not Fluent-backed: "+name);

  var fileName=ui.fluentIcons[name];
  assert(fileName,"Missing Fluent mapping: "+name);
  assert(fs.existsSync("assets/icons/fluent/"+fileName),"Missing Fluent asset file: "+fileName);
});

var chrome=ui.icon("chrome",24);
assert(chrome.indexOf("<svg")>=0,"Chrome brand icon missing");
assert(chrome.indexOf("assets/icons/fluent/")<0,"Chrome must not pretend to be a Microsoft Fluent icon");

assert(fs.existsSync("assets/icons/fluent/LICENSE"),"Fluent license missing");
assert(fs.existsSync("assets/icons/fluent/SOURCE.md"),"Fluent source provenance missing");

var source=fs.readFileSync("assets/icons/fluent/SOURCE.md","utf8");
assert(source.indexOf("microsoft/fluentui-system-icons")>=0,"Fluent source repository not documented");
assert(source.indexOf("08130c218d6bb87767d6d5616d9afcea651146c7")>=0,"Fluent source commit not pinned");

var shell=ui.defaultShellState();
assert(shell.pinnedTaskbar.indexOf("explorer")>=0,"Explorer should be pinned by default");
assert(shell.pinnedTaskbar.indexOf("browser")>=0,"Chrome should be pinned by default");
assert(shell.pinnedStart.indexOf("browser")>=0,"Chrome should appear in Start by default");

shell.pinnedTaskbar=["explorer"];
ui.saveShellState(shell,window.localStorage);
var reloaded=ui.loadShellState(window.localStorage);
assert(reloaded.pinnedTaskbar.length===1 && reloaded.pinnedTaskbar[0]==="explorer","Shell state did not persist");

ui.resetShellState(window.localStorage);
var reset=ui.loadShellState(window.localStorage);
assert(reset.pinnedTaskbar.indexOf("browser")>=0,"Shell reset did not restore defaults");

console.log("Windows 11 Fluent icon realism smoke test passed");
