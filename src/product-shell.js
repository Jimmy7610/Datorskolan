(function () {
  "use strict";

  var landing = document.getElementById("landing");
  var app = document.getElementById("app");
  var launchButtons = Array.prototype.slice.call(document.querySelectorAll("[data-launch-school]"));
  var resetButtons = Array.prototype.slice.call(document.querySelectorAll("[data-reset-school]"));
  var resetDialog = document.querySelector("[data-reset-dialog]");
  var resetCancel = document.querySelector("[data-reset-cancel]");
  var resetConfirm = document.querySelector("[data-reset-confirm]");
  var progressKey = "datorskolan.progress.v1";
  var resetReturnFocus = null;
  var landingTabButtons = Array.prototype.slice.call(document.querySelectorAll("[data-landing-tab]"));
  var landingPanels = Array.prototype.slice.call(document.querySelectorAll("[data-landing-panel]"));
  var activeLandingTab = "overview";
  var skipLink = document.querySelector(".skip-link");

  function readProgress() {
    try {
      var raw = window.localStorage.getItem(progressKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function hasProgress() {
    var progress = readProgress();
    if (!progress) return false;

    var lessons = progress.lessons || {};
    return Object.keys(lessons).some(function (id) {
      var status = lessons[id] && lessons[id].status;
      return status === "in_progress" || status === "completed";
    });
  }

  function completedCount() {
    var progress = readProgress();
    var lessons = progress && progress.lessons ? progress.lessons : {};
    return Object.keys(lessons).filter(function (id) {
      return lessons[id] && lessons[id].status === "completed";
    }).length;
  }

  function updateCtas() {
    var resume = hasProgress();
    var completed = completedCount();

    launchButtons.forEach(function (button) {
      var text = button.querySelector("[data-cta-text]");
      if (text) text.textContent = resume ? "Fortsätt Datorskolan" : "Starta Datorskolan";
      button.setAttribute("aria-label", resume ? "Fortsätt Datorskolan" : "Starta Datorskolan");
    });

    var resumeNote = document.querySelector("[data-resume-note]");
    if (resumeNote) {
      resumeNote.hidden = !resume;
      resumeNote.textContent = completed
        ? "Dina framsteg är sparade • " + completed + " lektion" + (completed === 1 ? "" : "er") + " klara"
        : "Dina framsteg är sparade på den här enheten";
    }

    resetButtons.forEach(function (button) {
      button.hidden = !resume;
    });
  }

  function selectLandingTab(tabId, focusTab) {
    if (!tabId) tabId = "overview";

    var targetPanel = landingPanels.find(function (panel) {
      return panel.getAttribute("data-landing-panel") === tabId;
    });

    if (!targetPanel) {
      tabId = "overview";
      targetPanel = landingPanels.find(function (panel) {
        return panel.getAttribute("data-landing-panel") === tabId;
      });
    }

    activeLandingTab = tabId;

    landingPanels.forEach(function (panel) {
      var active = panel === targetPanel;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });

    landingTabButtons.forEach(function (button) {
      var active = button.getAttribute("data-landing-tab") === tabId;
      if (button.getAttribute("role") === "tab") {
        button.setAttribute("aria-selected", active ? "true" : "false");
        button.setAttribute("tabindex", active ? "0" : "-1");
      }
    });

    if (focusTab) {
      var selected = landingTabButtons.find(function (button) {
        return button.getAttribute("role") === "tab" &&
          button.getAttribute("data-landing-tab") === tabId;
      });
      if (selected) selected.focus();
    }
  }

  function bindLandingTabs() {
    landingTabButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        if (button.tagName === "A") event.preventDefault();
        selectLandingTab(button.getAttribute("data-landing-tab"), false);
      });

      if (button.getAttribute("role") === "tab") {
        button.addEventListener("keydown", function (event) {
          if (["ArrowLeft","ArrowRight","Home","End"].indexOf(event.key) < 0) return;

          var tabs = landingTabButtons.filter(function (candidate) {
            return candidate.getAttribute("role") === "tab";
          });
          var index = tabs.indexOf(button);
          if (index < 0) return;

          event.preventDefault();

          if (event.key === "Home") index = 0;
          else if (event.key === "End") index = tabs.length - 1;
          else if (event.key === "ArrowLeft") index = (index - 1 + tabs.length) % tabs.length;
          else index = (index + 1) % tabs.length;

          selectLandingTab(tabs[index].getAttribute("data-landing-tab"), true);
        });
      }
    });
  }

  function showSchool() {
    landing.hidden = true;
    app.hidden = false;
    if (skipLink) {
      skipLink.setAttribute("href", "#app");
      skipLink.textContent = "Hoppa till Datorskolan";
    }
    document.body.classList.remove("landing-mode");
    document.body.classList.add("school-mode");
    window.scrollTo(0, 0);

    window.setTimeout(function () {
      var learningButton = app.querySelector('[aria-label="Datorskolan"]');
      if (learningButton) learningButton.click();
      if (app && typeof app.focus === "function") app.focus({ preventScroll: true });
    }, 80);
  }

  function showLanding() {
    app.hidden = true;
    landing.hidden = false;
    if (skipLink) {
      skipLink.setAttribute("href", "#landing-main");
      skipLink.textContent = "Hoppa till huvudinnehållet";
    }
    document.body.classList.remove("school-mode");
    document.body.classList.add("landing-mode");
    updateCtas();
    selectLandingTab(activeLandingTab || "overview", false);
  }

  function openResetDialog(button) {
    if (!resetDialog) return;
    resetReturnFocus = button || document.activeElement;
    resetDialog.hidden = false;
    if (landing) landing.inert = true;
    if (app) app.inert = true;
    document.body.classList.add("reset-dialog-open");
    window.setTimeout(function () {
      if (resetCancel) resetCancel.focus();
    }, 0);
  }

  function closeResetDialog() {
    if (!resetDialog) return;
    resetDialog.hidden = true;
    if (landing) landing.inert = false;
    if (app) app.inert = false;
    document.body.classList.remove("reset-dialog-open");

    if (resetReturnFocus && typeof resetReturnFocus.focus === "function") {
      resetReturnFocus.focus();
    }
    resetReturnFocus = null;
  }

  function resetAllProgress() {
    try {
      var simulator = window.__datorskolanSimulator;

      if (simulator) {
        if (typeof simulator.stopLesson === "function") simulator.stopLesson();
        if (typeof simulator.stopScenario === "function") simulator.stopScenario();
        if (simulator.progress && typeof simulator.progress.reset === "function") {
          simulator.progress.reset();
        }
        if (typeof simulator.resetVfs === "function") simulator.resetVfs();
      }

      window.localStorage.removeItem(progressKey);
      if (window.DatorskolanWindows11 && window.DatorskolanWindows11.STORAGE_KEY) {
        window.localStorage.removeItem(window.DatorskolanWindows11.STORAGE_KEY);
      }
    } catch (error) {
      console.warn("[Datorskolan] Kunde inte återställa progress via simulatorn", error);
      try {
        window.localStorage.removeItem(progressKey);
        if (window.DatorskolanWindows11 && window.DatorskolanWindows11.STORAGE_KEY) {
          window.localStorage.removeItem(window.DatorskolanWindows11.STORAGE_KEY);
        }
      } catch (storageError) {
        console.warn("[Datorskolan] Kunde inte radera localStorage", storageError);
      }
    }

    window.location.reload();
  }

  resetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openResetDialog(button);
    });
  });

  if (resetCancel) {
    resetCancel.addEventListener("click", closeResetDialog);
  }

  if (resetConfirm) {
    resetConfirm.addEventListener("click", resetAllProgress);
  }

  if (resetDialog) {
    resetDialog.addEventListener("pointerdown", function (event) {
      if (event.target === resetDialog) closeResetDialog();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!resetDialog || resetDialog.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeResetDialog();
      return;
    }

    if (event.key === "Tab") {
      var focusable = Array.prototype.slice.call(
        resetDialog.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(function (node) {
        return !node.hidden && node.offsetParent !== null;
      });

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  launchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showSchool();
    });
  });

  bindLandingTabs();
  selectLandingTab("overview", false);
  updateCtas();
  window.DatorskolanProductShell = {
    showSchool: showSchool,
    showLanding: showLanding,
    updateCtas: updateCtas,
    selectLandingTab: selectLandingTab,
    openResetDialog: openResetDialog,
    resetAllProgress: resetAllProgress
  };
})();