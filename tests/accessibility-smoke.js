"use strict";

const fs=require("fs");

function assert(condition,message){
  if(!condition) throw new Error(message);
}

const html=fs.readFileSync("index.html","utf8");
const a11y=fs.readFileSync("styles/accessibility.css","utf8");
const shell=fs.readFileSync("src/product-shell.js","utf8");
const app=fs.readFileSync("src/app.js","utf8");
const settings=fs.readFileSync("src/settings-app.js","utf8");
const advanced=fs.readFileSync("src/advanced-apps.js","utf8");

assert(html.indexOf('class="skip-link"')>=0,"Skip link missing");
assert(html.indexOf('href="#landing-main"')>=0,"Skip link landing target missing");
assert(html.indexOf('id="landing-main"')>=0,"Landing main id missing");
assert(html.indexOf('tabindex="-1" aria-label="Simulerad Windows-miljö"')>=0,"Simulator main is not programmatically focusable");

[
  ["tab-overview","panel-overview"],
  ["tab-how","panel-how"],
  ["tab-course","panel-course"],
  ["tab-safe","panel-safe"]
].forEach(function(pair){
  assert(html.indexOf('id="'+pair[0]+'"')>=0,"Missing tab id "+pair[0]);
  assert(html.indexOf('aria-controls="'+pair[1]+'"')>=0,"Missing aria-controls for "+pair[0]);
  assert(html.indexOf('id="'+pair[1]+'"')>=0,"Missing tab panel "+pair[1]);
  assert(html.indexOf('aria-labelledby="'+pair[0]+'"')>=0,"Missing aria-labelledby for "+pair[1]);
});

assert(html.indexOf('class="overview-visual" aria-hidden="true"')>=0,"Decorative preview is exposed to assistive tech");
assert(html.indexOf('./styles/accessibility.css')>=0,"Accessibility stylesheet is not loaded");

assert(a11y.indexOf('font-size:1rem')>=0,"Readable 1rem text baseline missing");
assert(a11y.indexOf('min-width:24px')>=0&&a11y.indexOf('min-height:24px')>=0,"WCAG 2.2 target minimum baseline missing");
assert(a11y.indexOf(':focus-visible')>=0,"Global visible focus styling missing");
assert(a11y.indexOf('prefers-reduced-motion:reduce')>=0,"Reduced motion support missing");
assert(a11y.indexOf('@media(max-width:1100px)')>=0,"Zoom/reflow breakpoint missing");
assert(a11y.indexOf('overflow-y:auto !important')>=0,"Landing cannot reflow vertically at zoom");
assert(a11y.indexOf('body.school-mode')>=0&&a11y.indexOf('overflow:auto !important')>=0,"Spatial simulator becomes unreachable at zoom");
assert(a11y.indexOf('#71839a')>=0,"AA contrast correction for status text missing");

assert(shell.indexOf('landing.inert = true')>=0,"Modal background is not made inert");
assert(shell.indexOf('event.key === "Tab"')>=0,"Modal focus trap missing");
assert(shell.indexOf('event.key === "Escape"')>=0,"Modal Escape handling missing");
assert(shell.indexOf('skipLink.setAttribute("href", "#app")')>=0,"Skip link does not switch to simulator");
assert(shell.indexOf('app.focus({ preventScroll: true })')>=0,"Focus is not moved into simulator after launch");

assert(app.indexOf('role","status"')>=0,"Lesson feedback status role missing");
assert(app.indexOf('aria-live","polite"')>=0,"Lesson feedback live region missing");
assert(app.indexOf('aria-label", "Sök i aktuell mapp"')>=0,"Explorer search label missing");
assert(app.indexOf('aria-label="Minimera"')>=0,"Window minimize accessible name missing");
assert(app.indexOf('aria-label="Stäng"')>=0,"Window close accessible name missing");

assert(settings.indexOf('aria-label","Sök efter en inställning"')>=0,"Settings search label missing");
assert(settings.indexOf('Nätverkssäkerhetsnyckel för HemmaNet')>=0,"Wi-Fi password accessible name missing");
assert(settings.indexOf('settings-password-help')>=0,"Visible Wi-Fi password help missing");
assert(advanced.indexOf("aria-label='Sök på övningswebben'")>=0,"Simulated browser search label missing");

console.log("Accessibility smoke test passed");
