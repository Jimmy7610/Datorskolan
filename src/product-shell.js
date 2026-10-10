/*
  Product shell: the website around FakeWin.
  Owns the landing tabs, language switch, CTA state, modal dialogs and the hand-over to the simulator.
*/
(function () {
  "use strict";

  var I18n = window.DatorskolanI18n;
  var t = I18n.t;

  var PROGRESS_KEY = "datorskolan.progress.v1";
  var LAUNCH_FLAG = "datorskolan.launchSchool";

  var landing = document.getElementById("landing");
  var app = document.getElementById("app");
  var skipLink = document.querySelector(".skip-link");
  var tabButtons = Array.prototype.slice.call(document.querySelectorAll("[data-landing-tab]"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-landing-panel]"));
  var activeTab = "overview";
  var simulatorBootedLocale = null;
  var openModalState = null;

  /* ---------- Stored progress ---------- */

  function readProgress() {
    try {
      var raw = window.localStorage.getItem(PROGRESS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function lessonStatuses() {
    var progress = readProgress();
    var lessons = (progress && progress.lessons) || {};
    return Object.keys(lessons).map(function (id) { return lessons[id] && lessons[id].status; });
  }

  function hasProgress() {
    return lessonStatuses().some(function (status) {
      return status === "in_progress" || status === "completed";
    });
  }

  function completedCount() {
    return lessonStatuses().filter(function (status) { return status === "completed"; }).length;
  }

  /* ---------- Rendering ---------- */

  // Counting needs only the language-neutral structure, not the composed lesson texts.
  function courseStats() {
    var course = window.DatorskolanCourse;
    var lessons = window.DatorskolanLessons || [];
    var modules = course ? course.moduleOrder() : [];
    return { lessons: lessons, modules: modules };
  }

  function renderCourseFacts() {
    var stats = courseStats();
    var lessonTotal = stats.lessons.length;
    var moduleTotal = stats.modules.length;

    document.querySelectorAll("[data-course-count='lessons']").forEach(function (node) {
      node.textContent = String(lessonTotal);
    });
    document.querySelectorAll("[data-course-count='modules']").forEach(function (node) {
      node.textContent = String(moduleTotal);
    });

    var eyebrow = document.querySelector("[data-course-eyebrow]");
    if (eyebrow) eyebrow.textContent = t("landing.course.eyebrow", { lessons: lessonTotal, modules: moduleTotal });

    var grid = document.querySelector("[data-module-grid]");
    if (!grid) return;
    grid.replaceChildren();

    stats.modules.forEach(function (moduleId, index) {
      var count = stats.lessons.filter(function (lesson) { return lesson.moduleId === moduleId; }).length;
      var item = document.createElement("li");
      if (moduleId === "final") item.className = "module-final";

      var number = document.createElement("span");
      number.className = "step-number";
      number.style.position = "static";
      number.setAttribute("aria-hidden", "true");
      number.textContent = String(index + 1);

      var copy = document.createElement("div");
      var title = document.createElement("strong");
      title.textContent = window.DatorskolanCourse.moduleTitle(moduleId);
      var meta = document.createElement("span");
      meta.textContent = I18n.plural("landing.course.lessonCount", count);
      copy.appendChild(title);
      copy.appendChild(meta);

      item.appendChild(number);
      item.appendChild(copy);
      grid.appendChild(item);
    });
  }

  function updateCtas() {
    var resume = hasProgress();
    var completed = completedCount();

    document.querySelectorAll("[data-cta-text]").forEach(function (node) {
      node.textContent = t(resume ? "landing.cta.resume" : "landing.cta.start");
    });

    var note = document.querySelector("[data-resume-note]");
    if (note) {
      note.hidden = !resume;
      note.textContent = completed
        ? I18n.plural("landing.resume.count", completed)
        : t("landing.resume.none");
    }

    document.querySelectorAll("[data-reset-school]").forEach(function (button) {
      button.hidden = !resume;
    });
  }

  function updateLanguageSwitch() {
    var current = I18n.locale();
    document.querySelectorAll("[data-set-locale]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-set-locale") === current ? "true" : "false");
    });
  }

  function updateSkipLink() {
    if (!skipLink) return;
    var inSchool = document.body.classList.contains("school-mode");
    skipLink.setAttribute("href", inSchool ? "#app" : "#landing-main");
    skipLink.textContent = t(inSchool ? "landing.skipToSchool" : "landing.skipToMain");
  }

  function renderAll() {
    I18n.translateDom(document);
    document.title = t("meta.title");
    renderCourseFacts();
    updateCtas();
    updateLanguageSwitch();
    updateSkipLink();
  }

  /* ---------- Tabs (WAI-ARIA tabs pattern, manual activation by click, arrows move + select) ---------- */

  function selectTab(tabId, moveFocus) {
    var target = panels.filter(function (panel) { return panel.getAttribute("data-landing-panel") === tabId; })[0];
    if (!target) {
      tabId = "overview";
      target = panels[0];
    }
    activeTab = tabId;

    panels.forEach(function (panel) {
      panel.hidden = panel !== target;
    });

    tabButtons.forEach(function (button) {
      if (button.getAttribute("role") !== "tab") return;
      var selected = button.getAttribute("data-landing-tab") === tabId;
      button.setAttribute("aria-selected", selected ? "true" : "false");
      button.setAttribute("tabindex", selected ? "0" : "-1");
      if (selected && moveFocus) button.focus();
    });
  }

  function bindTabs() {
    tabButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        if (button.tagName === "A") event.preventDefault();
        selectTab(button.getAttribute("data-landing-tab"), false);
      });

      if (button.getAttribute("role") !== "tab") return;

      button.addEventListener("keydown", function (event) {
        if (["ArrowLeft", "ArrowRight", "Home", "End"].indexOf(event.key) < 0) return;
        var tabs = tabButtons.filter(function (candidate) { return candidate.getAttribute("role") === "tab"; });
        var index = tabs.indexOf(button);
        event.preventDefault();
        if (event.key === "Home") index = 0;
        else if (event.key === "End") index = tabs.length - 1;
        else if (event.key === "ArrowLeft") index = (index - 1 + tabs.length) % tabs.length;
        else index = (index + 1) % tabs.length;
        selectTab(tabs[index].getAttribute("data-landing-tab"), true);
      });
    });
  }

  /* ---------- Modal dialogs ---------- */

  function focusableIn(container) {
    return Array.prototype.slice.call(container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (node) { return !node.hidden && node.offsetParent !== null; });
  }

  function openModal(name, opener) {
    var backdrop = document.querySelector("[data-modal='" + name + "']");
    if (!backdrop) return;
    openModalState = { backdrop: backdrop, returnFocus: opener || document.activeElement };
    backdrop.hidden = false;
    landing.inert = true;
    app.inert = true;
    var first = backdrop.querySelector("[data-modal-close]") || focusableIn(backdrop)[0];
    window.setTimeout(function () { if (first) first.focus(); }, 0);
  }

  function closeModal() {
    if (!openModalState) return;
    var state = openModalState;
    openModalState = null;
    state.backdrop.hidden = true;
    landing.inert = false;
    app.inert = false;
    if (state.returnFocus && typeof state.returnFocus.focus === "function") state.returnFocus.focus();
  }

  function bindModals() {
    document.querySelectorAll("[data-modal]").forEach(function (backdrop) {
      backdrop.addEventListener("pointerdown", function (event) {
        if (event.target === backdrop) closeModal();
      });
      backdrop.querySelectorAll("[data-modal-close]").forEach(function (button) {
        button.addEventListener("click", closeModal);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (!openModalState) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab") return;
      var focusable = focusableIn(openModalState.backdrop);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    document.querySelectorAll("[data-reset-school]").forEach(function (button) {
      button.addEventListener("click", function () { openModal("reset", button); });
    });

    document.querySelectorAll("[data-open-privacy]").forEach(function (button) {
      button.addEventListener("click", function () { openModal("privacy", button); });
    });

    var confirm = document.querySelector("[data-reset-confirm]");
    if (confirm) confirm.addEventListener("click", resetAllProgress);
  }

  /* ---------- Simulator hand-over ---------- */

  function simulator() {
    return window.DatorskolanSimulator || null;
  }

  function showSchool() {
    var sim = simulator();
    if (!sim) return;

    // The simulator renders texts once at boot; a language change afterwards needs a fresh start.
    if (simulatorBootedLocale && simulatorBootedLocale !== I18n.locale()) {
      relaunchInSchool();
      return;
    }

    if (!simulatorBootedLocale) {
      sim.boot(app);
      simulatorBootedLocale = I18n.locale();
    }

    landing.hidden = true;
    app.hidden = false;
    document.body.classList.remove("landing-mode");
    document.body.classList.add("school-mode");
    updateSkipLink();
    window.scrollTo(0, 0);

    window.setTimeout(function () {
      if (sim.api && typeof sim.api.openLearningPanel === "function") sim.api.openLearningPanel();
      app.focus({ preventScroll: true });
    }, 60);
  }

  function showLanding() {
    app.hidden = true;
    landing.hidden = false;
    document.body.classList.remove("school-mode");
    document.body.classList.add("landing-mode");
    renderAll();
    selectTab(activeTab, false);
    var main = document.getElementById("landing-main");
    if (main) main.focus({ preventScroll: true });
  }

  function relaunchInSchool() {
    try { window.sessionStorage.setItem(LAUNCH_FLAG, "1"); } catch (error) { /* reload lands on the landing page instead */ }
    window.location.reload();
  }

  // Used by the language buttons on the landing page and inside the simulator.
  function changeLocale(code) {
    if (!I18n.setLocale(code)) return;
    if (document.body.classList.contains("school-mode")) relaunchInSchool();
  }

  function resetAllProgress() {
    var sim = simulator();
    try {
      if (sim && sim.api && typeof sim.api.resetAll === "function") sim.api.resetAll();
    } catch (error) {
      // Fall through to clearing storage directly.
    }
    try {
      window.localStorage.removeItem(PROGRESS_KEY);
      if (window.DatorskolanWindows11) window.localStorage.removeItem(window.DatorskolanWindows11.STORAGE_KEY);
    } catch (error) {
      // Storage blocked: nothing persisted, nothing to clear.
    }
    window.location.reload();
  }

  /* ---------- Wiring ---------- */

  document.querySelectorAll("[data-launch-school]").forEach(function (button) {
    button.addEventListener("click", showSchool);
  });

  document.querySelectorAll("[data-set-locale]").forEach(function (button) {
    button.addEventListener("click", function () { changeLocale(button.getAttribute("data-set-locale")); });
  });

  I18n.onChange(function () {
    renderAll();
  });

  bindTabs();
  bindModals();
  renderAll();
  selectTab("overview", false);

  var launchRequested = false;
  try {
    launchRequested = window.sessionStorage.getItem(LAUNCH_FLAG) === "1";
    window.sessionStorage.removeItem(LAUNCH_FLAG);
  } catch (error) {
    launchRequested = false;
  }
  if (launchRequested) showSchool();

  window.DatorskolanProductShell = {
    showSchool: showSchool,
    showLanding: showLanding,
    updateCtas: updateCtas,
    selectLandingTab: selectTab,
    changeLocale: changeLocale,
    openModal: openModal,
    resetAllProgress: resetAllProgress
  };
})();
