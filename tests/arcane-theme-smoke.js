"use strict";

const fs=require("fs");

function assert(condition,message){
  if(!condition) throw new Error(message);
}

const html=fs.readFileSync("index.html","utf8");
const css=fs.readFileSync("styles/arcane-theme.css","utf8");
const source=fs.readFileSync("assets/fonts/SOURCE.md","utf8");
const license=fs.readFileSync("assets/fonts/CooperHewitt-OFL.txt","utf8");

/* Standard, conventional web palette. */
[
  "#f8fafc",
  "#f1f5f9",
  "#ffffff",
  "#e2e8f0",
  "#0f172a",
  "#475569",
  "#2563eb",
  "#1d4ed8",
  "#16a34a",
  "#d97706",
  "#dc2626"
].forEach(function(color){
  assert(css.toLowerCase().indexOf(color)>=0,"Standard web palette color missing: "+color);
});

assert(css.indexOf('font-family:"Cooper Hewitt"')>=0,"Cooper Hewitt font family missing");
assert(css.indexOf("body *")>=0,"Cooper Hewitt is not forced across the whole app");

[400,500,600,700].forEach(function(weight){
  assert(css.indexOf("font-weight:"+weight)>=0,"Cooper Hewitt weight missing: "+weight);
});

assert(
  css.indexOf("24437eb6fc8bbf1fe8c518eeeaabd3012dffed4c")>=0,
  "Cooper Hewitt delivery source is not pinned"
);

assert(
  html.toLowerCase().indexOf('<meta name="theme-color" content="#f8fafc">')>=0,
  "Browser theme color is not the light page background"
);

const a11yIndex=html.indexOf("./styles/accessibility.css");
const themeIndex=html.indexOf("./styles/arcane-theme.css");
assert(a11yIndex>=0&&themeIndex>a11yIndex,"Final theme must load after accessibility base");

assert(source.indexOf("SIL Open Font License")>=0,"Cooper Hewitt source documentation missing license");
assert(license.indexOf("SIL OPEN FONT LICENSE Version 1.1")>=0,"Cooper Hewitt OFL text missing");

[
  ".landing-page",
  ".sim",
  ".taskbar",
  ".start",
  ".app-window",
  ".learning-panel",
  ".scenario-panel",
  ".chrome-window",
  ".settings-app",
  ".dialog"
].forEach(function(selector){
  assert(css.indexOf(selector)>=0,"Whole-app theme selector missing: "+selector);
});

assert(
  css.indexOf(".dialog-layer")>=0 && css.indexOf("backdrop-filter:none")>=0,
  "Persistent dialog host must not blur the simulator"
);

console.log("Standard web theme smoke test passed");
