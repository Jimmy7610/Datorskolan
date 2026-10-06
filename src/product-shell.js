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

  function showSchool() {
    landing.hidden = true;
    app.hidden = false;
    document.body.classList.remove("landing-mode");
    document.body.classList.add("school-mode");
    window.scrollTo(0, 0);

    window.setTimeout(function () {
      var learningButton = app.querySelector('[aria-label="Datorskolan"]');
      if (learningButton) learningButton.click();
    }, 80);
  }

  function showLanding() {
    app.hidden = true;
    landing.hidden = false;
    document.body.classList.remove("school-mode");
    document.body.classList.add("landing-mode");
    updateCtas();
    window.scrollTo(0, 0);
  }

  function openResetDialog(button) {
    if (!resetDialog) return;
    resetReturnFocus = button || document.activeElement;
    resetDialog.hidden = false;
    document.body.classList.add("reset-dialog-open");
    window.setTimeout(function () {
      if (resetCancel) resetCancel.focus();
    }, 0);
  }

  function closeResetDialog() {
    if (!resetDialog) return;
    resetDialog.hidden = true;
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
    }
  });

  launchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showSchool();
    });
  });

  document.querySelectorAll("[data-scroll-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      var selector = button.getAttribute("data-scroll-target");
      var target = selector ? document.querySelector(selector) : null;
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  updateCtas();
  window.DatorskolanProductShell = {
    showSchool: showSchool,
    showLanding: showLanding,
    updateCtas: updateCtas,
    openResetDialog: openResetDialog,
    resetAllProgress: resetAllProgress
  };
})();