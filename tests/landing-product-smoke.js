"use strict";

const fs=require("fs");

function assert(condition,message){
  if(!condition) throw new Error(message);
}

const html=fs.readFileSync("index.html","utf8");
const css=fs.readFileSync("styles/landing.css","utf8");
const shell=fs.readFileSync("src/product-shell.js","utf8");

const start=html.indexOf('<div id="landing"');
const end=html.indexOf('<div class="reset-dialog-backdrop"',start);
assert(start>=0&&end>start,"Landing page markup missing");
const landing=html.slice(start,end);

[
  "120",
  "13",
  "Google Chrome",
  "Utforskaren",
  "Inställningar",
  "USB",
  "Wi‑Fi",
  "Bluetooth",
  "PDF",
  "ZIP",
  "OneDrive",
  "Självständighetsprov",
  "När något krånglar"
].forEach(function(text){
  assert(landing.indexOf(text)>=0,"Landing missing current product fact: "+text);
});

[
  "overview",
  "how",
  "course",
  "safe"
].forEach(function(tab){
  assert(
    landing.indexOf('data-landing-tab="'+tab+'"')>=0,
    "Landing missing tab: "+tab
  );
  assert(
    landing.indexOf('data-landing-panel="'+tab+'"')>=0,
    "Landing missing panel: "+tab
  );
});

[
  "./assets/icons/fluent/apps.svg",
  "./assets/icons/fluent/folder.svg",
  "./assets/icons/fluent/settings.svg",
  "./assets/icons/fluent/shield.svg",
  "./assets/icons/fluent/usb-plug.svg",
  "./assets/icons/fluent/wifi.svg",
  "https://www.google.com/chrome/static/images/chrome-logo-m100.svg"
].forEach(function(asset){
  assert(landing.indexOf(asset)>=0,"Landing missing official product asset: "+asset);
});

assert(landing.indexOf("data-scroll-target")<0,"Landing still uses scroll navigation");
assert(landing.indexOf("📁")<0,"Landing still contains old folder emoji");
assert(landing.indexOf("🌐")<0,"Landing still contains old browser emoji");
assert(landing.indexOf("🛡")<0,"Landing still contains old security emoji");

assert(css.indexOf("height:100dvh")>=0,"Landing is not locked to viewport height");
assert(css.indexOf("overflow:hidden!important")>=0,"Landing body is allowed to vertically scroll");
assert(css.indexOf(".landing-stage")>=0,"Landing stage styling missing");
assert(css.indexOf(".landing-panel")>=0,"Tabbed panel styling missing");
assert(css.indexOf("@media(max-width:620px)")>=0,"Mobile responsive rules missing");
assert(css.indexOf("@media(max-height:560px)")>=0,"Low-height responsive rules missing");

assert(shell.indexOf("selectLandingTab")>=0,"Landing tab controller missing");
assert(shell.indexOf("bindLandingTabs")>=0,"Landing tab binding missing");
assert(shell.indexOf("ArrowLeft")>=0&&shell.indexOf("ArrowRight")>=0,"Landing keyboard tab navigation missing");
assert(shell.indexOf("scrollIntoView")<0,"Product shell still performs landing page scrolling");

console.log("Single-screen responsive landing smoke test passed");
