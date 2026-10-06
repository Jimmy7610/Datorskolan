"use strict";

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

[
  "start","explorer","folder","pictures","recycle","calculator",
  "notepad","photos","mail","chrome","pdf","zip","image-file","text-file"
].forEach(function(name){
  var markup=ui.icon(name,24);
  assert(markup.indexOf("<svg")>=0,"Missing SVG icon: "+name);
});

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

console.log("Windows 11 realism smoke test passed");
