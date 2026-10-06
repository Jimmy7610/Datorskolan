(function () {
  "use strict";

  var landing = document.getElementById("landing");
  var app = document.getElementById("app");
  var launchButtons = Array.prototype.slice.call(document.querySelectorAll("[data-launch-school]"));
  var progressKey = "datorskolan.progress.v1";

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
    updateCtas: updateCtas
  };
})();