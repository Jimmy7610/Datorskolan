"use strict";

const fs=require("fs");

function assert(condition,message){
  if(!condition) throw new Error(message);
}

const html=fs.readFileSync("index.html","utf8");
const css=fs.readFileSync("styles/landing.css","utf8");

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
  "Skärmklipp",
  "Självständighetsprov",
  "När något krånglar"
].forEach(function(text){
  assert(landing.indexOf(text)>=0,"Landing missing current product fact: "+text);
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

assert(landing.indexOf("120+ lektioner")<0,"Landing still uses stale 120+ copy");
assert(landing.indexOf("📁")<0,"Landing still contains old folder emoji");
assert(landing.indexOf("🖼")<0,"Landing still contains old picture emoji");
assert(landing.indexOf("🌐")<0,"Landing still contains old browser emoji");
assert(landing.indexOf("🛡")<0,"Landing still contains old security emoji");
assert(landing.indexOf("🧰")<0,"Landing still contains old everyday emoji");
assert(landing.indexOf("🔌")<0,"Landing still contains old device emoji");
assert(landing.indexOf("🛠")<0,"Landing still contains old troubleshooting emoji");

assert(css.indexOf(".fakewin-preview")>=0,"Landing FakeWin preview styling missing");
assert(css.indexOf(".realism-layout")>=0,"Landing realism section styling missing");
assert(css.indexOf(".course-grid")>=0,"Landing course styling missing");
assert(css.indexOf(".everyday-grid")>=0,"Landing everyday feature styling missing");

console.log("Landing product smoke test passed");
