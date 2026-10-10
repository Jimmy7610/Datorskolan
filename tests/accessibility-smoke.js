"use strict";

/*
  Static accessibility checks (WCAG 2.2 AA targets). Runtime behaviour is verified manually,
  see docs/37-ACCESSIBILITY-AND-LEGAL.md.
*/
const fs = require("fs");
const path = require("path");
const { assert, ROOT } = require("./helpers/load");

const read = function (file) { return fs.readFileSync(path.join(ROOT, file), "utf8"); };
const html = read("index.html");
const site = read("styles/site.css");
const fakewin = read("styles/fakewin.css");
const shell = read("src/product-shell.js");
const i18n = read("src/i18n.js");
const app = read("src/app.js");
const coach = read("src/learning-panel.js");
const explorer = read("src/explorer-app.js");
const settings = read("src/settings-app.js");

// 2.4.1 Bypass blocks, 3.1.1 Language of page
assert(html.indexOf('class="skip-link"') >= 0 && html.indexOf('href="#landing-main"') >= 0, "Skip link missing");
assert(html.indexOf('id="landing-main"') >= 0, "Landing main landmark missing");
assert(/<html lang="sv">/.test(html), "Default document language missing");
assert(i18n.indexOf("documentElement.lang") >= 0, "Document language must follow the chosen language");
assert(html.indexOf('lang="sv" data-set-locale="sv"') >= 0 && html.indexOf('lang="en" data-set-locale="en"') >= 0, "Language buttons must declare their own language");
assert(/data-set-locale="sv" aria-pressed=/.test(html), "Language buttons must expose their pressed state");

// Tabs pattern
[["tab-overview", "panel-overview"], ["tab-how", "panel-how"], ["tab-course", "panel-course"], ["tab-safe", "panel-safe"]].forEach(function (pair) {
  assert(html.indexOf('id="' + pair[0] + '"') >= 0 && html.indexOf('aria-controls="' + pair[1] + '"') >= 0, "Tab wiring missing for " + pair[0]);
  assert(html.indexOf('aria-labelledby="' + pair[0] + '"') >= 0, "Panel label missing for " + pair[1]);
});
assert(shell.indexOf("ArrowLeft") >= 0 && shell.indexOf("Home") >= 0 && shell.indexOf("End") >= 0, "Tabs need arrow/Home/End keys");

// Modal dialogs: aria-modal, focus trap, Escape, inert background, focus return
assert((html.match(/aria-modal="true"/g) || []).length >= 2, "Website dialogs must be modal");
assert(shell.indexOf("landing.inert = true") >= 0, "Modal background is not made inert");
assert(/event\.key [!=]== "Tab"/.test(shell) && shell.indexOf('event.key === "Escape"') >= 0, "Modal focus trap / Escape missing");
assert(shell.indexOf("returnFocus") >= 0, "Focus must return to the opener when a dialog closes");
assert(app.indexOf('modal: "true"') >= 0 && app.indexOf("alertdialog") >= 0, "Simulator dialogs must be modal (alertdialog for warnings)");

// 2.4.7 / 2.4.11 Focus visible
assert(/:focus-visible\{\s*outline:3px solid var\(--color-focus\)/.test(site), "Website focus indicator missing");
assert(fakewin.indexOf(".fw :focus-visible{") >= 0, "Simulator focus indicator missing");

// 2.5.8 Target size: website controls are at least 44px, simulator controls at least 24px
assert(/\.button\{[^}]*min-height:44px/.test(site.replace(/\s+/g, "")), "Website buttons must be at least 44px tall");
assert(/\.language-switchbutton\{[^}]*min-height:36px[^}]*min-width:44px/.test(site.replace(/\s+/g, "")), "Language buttons too small");

// 2.3.3 / reduced motion, forced colours
assert(site.indexOf("prefers-reduced-motion:reduce") >= 0 && fakewin.indexOf("prefers-reduced-motion:reduce") >= 0, "Reduced motion support missing");
assert(site.indexOf("forced-colors:active") >= 0 && fakewin.indexOf("forced-colors:active") >= 0, "Forced colours support missing");

// 1.4.10 Reflow: website reflows, coach panel overlays on narrow screens
assert(site.indexOf("@media (max-width:640px)") >= 0, "Mobile layout missing");
assert(fakewin.indexOf("@media (max-width:1100px)") >= 0, "Simulator reflow breakpoint missing");

// 4.1.3 Status messages
assert(coach.indexOf('role: "status"') >= 0 && coach.indexOf('live: "polite"') >= 0, "Lesson feedback must be announced");
assert(explorer.indexOf('role: "status"') >= 0, "Explorer status bar must be announced");
assert(html.indexOf('data-resume-note role="status"') >= 0, "Resume note must be a status message");

// Menus, lists and names
assert(app.indexOf('role: "menu"') >= 0 && app.indexOf('"menuitem"') >= 0, "Context menus must use the menu pattern");
assert(app.indexOf('e.key === "ArrowDown"') >= 0, "Context menus must support arrow keys");
assert(explorer.indexOf('role: "listbox"') >= 0 && explorer.indexOf('role: "option"') >= 0, "Explorer items must be a listbox");
assert(app.indexOf('aria: { label: t("window.minimize") }') >= 0 && app.indexOf('aria: { label: t("window.close") }') >= 0, "Window controls need accessible names");
assert(settings.indexOf('role: "switch"') >= 0 && settings.indexOf("aria: { checked:") >= 0, "Settings toggles must be switches");
assert(settings.indexOf('describedby: "fw-wifi-key-help"') >= 0, "Wi‑Fi key field must reference its help text");

// Decorative imagery is hidden
assert(html.indexOf('class="hero-visual" aria-hidden="true"') >= 0, "Decorative preview is exposed to assistive tech");
assert(!/<img(?![^>]*alt=)[^>]*>/.test(html), "Every image in index.html needs an alt attribute");

// Modal dialogs: everything behind them is inert; flyouts closed with Escape return focus to their taskbar button.
assert(app.indexOf("[el.desktop, el.windows, el.flyouts, el.taskbar].forEach(function (node) { if (node) node.inert = !!spec; })") >= 0, "Background must be inert while a dialog is open");
assert(app.indexOf("el.taskbar.querySelector(\"[data-ui='\" + opener + \"']\")") >= 0, "Escape must return focus to the flyout's taskbar button");

// Forced colours: dark monochrome icons are inverted on dark high-contrast themes.
assert(/@media \(forced-colors:active\) and \(prefers-color-scheme:dark\)\{\s*\.fw \.fluent-icon\.is-mono\{filter:invert\(1\)\}/.test(fakewin), "Mono icons must stay visible in dark forced-colours themes");
assert(/@media \(prefers-reduced-motion:reduce\)/.test(fakewin), "Simulator must honour reduced motion");

console.log("Accessibility smoke test passed");
