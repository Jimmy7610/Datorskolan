/*
  Datorskolan coach panel – the course dashboard, lesson player and free practice list.

  This is Datorskolan's own interface (not part of Windows), so it uses the website's design system
  and typeface. The visual difference helps learners tell "the teacher" apart from "the computer".
*/
(function () {
  "use strict";

  var STEP_TYPES = ["instruction", "demonstration", "exercise", "quiz", "simulation", "reflection", "checkpoint", "completion"];

  function render(ctx) {
    var panel = ctx.el.coach;
    var state = ctx.state;
    var lessonEngine = ctx.lessonEngine;
    var active = lessonEngine.active();
    var keepFocus = panel.contains(document.activeElement) ? document.activeElement.getAttribute("data-focus-key") : null;

    if (active && !state.coachOpen) {
      state.coachOpen = true;
      ctx.el.sim.classList.add("has-coach");
    }
    panel.hidden = !state.coachOpen;
    panel.replaceChildren();
    if (!state.coachOpen) return;

    panel.appendChild(header(ctx));
    var body = ctx.h("div", { class: "coach-body" });
    panel.appendChild(body);

    if (active) renderLesson(ctx, body, active);
    else if (state.learningTab === "practice") renderPractice(ctx, body);
    else if (state.learningSelectedModule) renderModule(ctx, body);
    else renderDashboard(ctx, body);

    if (keepFocus) {
      var again = panel.querySelector("[data-focus-key='" + keepFocus + "']");
      if (again) again.focus({ preventScroll: true });
    }
  }

  function header(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var I18n = ctx.I18n;
    var head = h("header", { class: "coach-header" });

    head.appendChild(h("div", { class: "coach-brand" }, [
      h("span", { class: "coach-brand-mark", aria: { hidden: "true" }, text: "D" }),
      h("div", {}, [h("h2", { text: "Datorskolan" }), h("p", { text: t("learn.subtitle") })])
    ]));

    var tools = h("div", { class: "coach-tools" });
    var lang = h("div", { class: "coach-language", role: "group", aria: { label: "Språk / Language" } });
    I18n.SUPPORTED.forEach(function (entry) {
      lang.appendChild(h("button", {
        type: "button",
        lang: entry.htmlLang,
        aria: { pressed: entry.code === I18n.locale() ? "true" : "false", label: entry.nativeName },
        text: entry.code.toUpperCase(),
        data: { focusKey: "lang-" + entry.code },
        on: { click: function () {
          if (entry.code === I18n.locale()) return;
          if (window.DatorskolanProductShell) window.DatorskolanProductShell.changeLocale(entry.code);
        } }
      }));
    });
    tools.appendChild(lang);
    tools.appendChild(h("button", {
      type: "button",
      class: "coach-icon-button",
      title: t("learn.home"),
      aria: { label: t("learn.home") },
      html: ctx.icon("home", 20),
      on: { click: function () { if (window.DatorskolanProductShell) window.DatorskolanProductShell.showLanding(); } }
    }));
    tools.appendChild(h("button", {
      type: "button",
      class: "coach-icon-button",
      title: t("learn.hide"),
      aria: { label: t("learn.hide") },
      html: ctx.glyph("close", 20),
      on: { click: function () { ctx.setCoachOpen(false); } }
    }));
    head.appendChild(tools);
    return head;
  }

  function tabs(ctx, body) {
    var t = ctx.t;
    var h = ctx.h;
    var state = ctx.state;
    var list = h("div", { class: "coach-tabs", role: "tablist", aria: { label: t("learn.tabsLabel") } });
    [["course", "learn.tab.course"], ["practice", "learn.tab.practice"]].forEach(function (entry) {
      var selected = (state.learningTab || "course") === entry[0];
      list.appendChild(h("button", {
        type: "button",
        role: "tab",
        aria: { selected: selected ? "true" : "false" },
        tabindex: selected ? "0" : "-1",
        text: t(entry[1]),
        data: { focusKey: "tab-" + entry[0] },
        on: {
          click: function () {
            state.learningTab = entry[0];
            state.learningSelectedModule = null;
            render(ctx);
          },
          keydown: function (e) {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            state.learningTab = state.learningTab === "practice" ? "course" : "practice";
            render(ctx);
            var next = ctx.el.coach.querySelector("[data-focus-key='tab-" + state.learningTab + "']");
            if (next) next.focus();
          }
        }
      }));
    });
    body.appendChild(list);
  }

  function progressBar(ctx, value, label) {
    return ctx.h("div", {
      class: "coach-progress",
      role: "progressbar",
      aria: { valuemin: "0", valuemax: "100", valuenow: String(value), label: label }
    }, [ctx.h("i", { style: { width: value + "%" } })]);
  }

  function modules(ctx) {
    var lessons = ctx.lessonEngine.list();
    var map = {};
    lessons.forEach(function (lesson) {
      if (!map[lesson.moduleId]) map[lesson.moduleId] = { id: lesson.moduleId, title: ctx.course.moduleTitle(lesson.moduleId), lessons: [], completed: 0 };
      map[lesson.moduleId].lessons.push(lesson);
      if (ctx.progressStore.lesson(lesson.id).status === "completed") map[lesson.moduleId].completed += 1;
    });
    return { lessons: lessons, map: map, ordered: ctx.course.moduleOrder().filter(function (id) { return map[id]; }).map(function (id) { return map[id]; }) };
  }

  function startLesson(ctx, lesson) {
    ctx.lessonEngine.start(lesson.id, ctx.learningRuntimeApi);
    ctx.state.coachOpen = true;
    ctx.render();
    window.setTimeout(function () {
      var heading = ctx.el.coach.querySelector(".coach-step h3");
      if (heading) heading.focus({ preventScroll: true });
    }, 0);
  }

  function renderDashboard(ctx, body) {
    var t = ctx.t;
    var h = ctx.h;
    var store = ctx.progressStore;
    store.refreshReviewStatus(14);
    var profile = store.profile();
    var data = modules(ctx);

    tabs(ctx, body);

    body.appendChild(h("p", { class: "coach-intro", text: t(profile.mode === "child" ? "learn.introChild" : profile.mode === "fast" ? "learn.introFast" : "learn.intro") }));

    var modeGroup = h("div", { class: "coach-segmented", role: "radiogroup", aria: { label: t("learn.level") } });
    ["standard", "child", "fast"].forEach(function (mode) {
      var checked = profile.mode === mode;
      modeGroup.appendChild(h("button", {
        type: "button",
        role: "radio",
        aria: { checked: checked ? "true" : "false" },
        tabindex: checked ? "0" : "-1",
        text: t("learn.level." + mode),
        data: { focusKey: "mode-" + mode },
        on: { click: function () { store.setMode(mode); ctx.render(); } }
      }));
    });
    body.appendChild(h("div", { class: "coach-row" }, [h("span", { class: "coach-label", text: t("learn.level") }), modeGroup]));

    var recommended = store.recommendLesson(data.lessons);
    if (recommended) {
      body.appendChild(h("button", {
        type: "button",
        class: "coach-next",
        data: { focusKey: "next" },
        on: { click: function () { startLesson(ctx, recommended); } }
      }, [
        h("span", { class: "coach-eyebrow", text: t(profile.mode === "child" ? "learn.nextChild" : "learn.next") }),
        h("strong", { text: recommended.title }),
        h("span", { class: "coach-muted", text: ctx.course.moduleTitle(recommended.moduleId) + " · " + recommended.summary }),
        h("span", { class: "coach-next-cta", text: t("learn.startLesson") })
      ]));
    }

    var completed = data.ordered.reduce(function (sum, m) { return sum + m.completed; }, 0);
    var total = data.lessons.length;
    var pct = total ? Math.round(completed / total * 100) : 0;
    body.appendChild(h("div", { class: "coach-overall" }, [
      h("div", { class: "coach-row" }, [h("strong", { text: t("learn.yourCourse") }), h("span", { text: t("learn.overall", { done: completed, total: total, percent: pct }) })]),
      progressBar(ctx, pct, t("learn.yourCourse"))
    ]));

    body.appendChild(h("h3", { class: "coach-section-title", text: t("learn.modules") }));
    var list = h("ul", { class: "coach-modules" });
    data.ordered.forEach(function (module, index) {
      var modulePct = Math.round(module.completed / module.lessons.length * 100);
      var done = module.completed === module.lessons.length;
      list.appendChild(h("li", {}, [h("button", {
        type: "button",
        class: "coach-module" + (done ? " is-done" : ""),
        data: { focusKey: "module-" + module.id },
        on: { click: function () { ctx.state.learningSelectedModule = module.id; render(ctx); } }
      }, [
        h("span", { class: "coach-module-number", aria: { hidden: "true" }, text: done ? "✓" : String(index + 1) }),
        h("span", { class: "coach-module-copy" }, [
          h("strong", { text: module.title }),
          h("span", { class: "coach-muted", text: t("learn.moduleProgress", { done: module.completed, total: module.lessons.length }) }),
          progressBar(ctx, modulePct, module.title)
        ])
      ])]));
    });
    body.appendChild(list);
  }

  function renderModule(ctx, body) {
    var t = ctx.t;
    var h = ctx.h;
    var data = modules(ctx);
    var module = data.map[ctx.state.learningSelectedModule];
    if (!module) {
      ctx.state.learningSelectedModule = null;
      renderDashboard(ctx, body);
      return;
    }

    body.appendChild(h("button", {
      type: "button",
      class: "coach-back",
      data: { focusKey: "back-modules" },
      on: { click: function () { ctx.state.learningSelectedModule = null; render(ctx); } }
    }, [h("span", { html: ctx.glyph("chevron-left", 16) }), h("span", { text: t("learn.allModules") })]));

    body.appendChild(h("h3", { class: "coach-module-title", tabindex: "-1", text: module.title }));
    body.appendChild(h("p", { class: "coach-muted", text: t("learn.moduleProgress", { done: module.completed, total: module.lessons.length }) }));

    var list = h("ol", { class: "coach-lessons" });
    module.lessons.forEach(function (lesson, index) {
      var status = ctx.progressStore.lesson(lesson.id).status;
      var statusKey = status === "completed" ? "learn.status.done" : status === "in_progress" ? "learn.status.continue" : "learn.status.start";
      list.appendChild(h("li", {}, [h("button", {
        type: "button",
        class: "coach-lesson" + (status === "completed" ? " is-done" : ""),
        data: { focusKey: "lesson-" + lesson.id },
        on: { click: function () { startLesson(ctx, lesson); } }
      }, [
        h("span", { class: "coach-module-number", aria: { hidden: "true" }, text: status === "completed" ? "✓" : String(index + 1) }),
        h("span", { class: "coach-module-copy" }, [h("strong", { text: lesson.title }), h("span", { class: "coach-muted", text: lesson.summary })]),
        h("span", { class: "coach-pill" + (status === "completed" ? " is-done" : ""), text: t(statusKey) })
      ])]));
    });
    body.appendChild(list);
  }

  function renderLesson(ctx, body, active) {
    var t = ctx.t;
    var h = ctx.h;
    var lessonEngine = ctx.lessonEngine;
    var lesson = lessonEngine.get(active.id);
    var step = lessonEngine.currentStep();
    var total = lesson.steps.length;

    if (step.type === "demonstration" && step.visualTarget) ctx.state.learningHighlightSelector = step.visualTarget;
    else if (step.type === "exercise" && active.hintLevel >= 4 && step.visualTarget) ctx.state.learningHighlightSelector = step.visualTarget;
    else ctx.state.learningHighlightSelector = null;

    body.appendChild(h("p", { class: "coach-eyebrow", text: ctx.course.moduleTitle(lesson.moduleId) }));
    body.appendChild(h("h3", { class: "coach-lesson-title", text: lesson.title }));
    body.appendChild(h("div", { class: "coach-row" }, [
      h("span", { class: "coach-muted", text: t("learn.stepOf", { step: active.stepIndex + 1, total: total }) })
    ]));
    body.appendChild(progressBar(ctx, Math.round((active.stepIndex + 1) / total * 100), t("learn.stepOf", { step: active.stepIndex + 1, total: total })));

    if (lesson.detail) {
      var details = h("details", { class: "coach-details" });
      details.open = active.stepIndex === 0 || step.type === "instruction";
      details.appendChild(h("summary", { text: t("learn.understand") }));
      var content = h("div", { class: "coach-details-content" });
      [["learn.detail.what", lesson.detail.what], ["learn.detail.recognize", lesson.detail.recognize], ["learn.detail.use", lesson.detail.use], ["learn.detail.example", lesson.detail.example]].forEach(function (entry) {
        if (!entry[1]) return;
        content.appendChild(h("h4", { text: t(entry[0]) }));
        content.appendChild(h("p", { text: entry[1] }));
      });
      [["learn.detail.steps", lesson.detail.steps, "ol"], ["learn.detail.everyday", lesson.detail.everyday, "ul"], ["learn.detail.mistakes", lesson.detail.mistakes, "ul"]].forEach(function (entry) {
        if (!Array.isArray(entry[1]) || !entry[1].length) return;
        content.appendChild(h("h4", { text: t(entry[0]) }));
        content.appendChild(h(entry[2], {}, entry[1].map(function (item) { return h("li", { text: item }); })));
      });
      details.appendChild(content);
      body.appendChild(details);
    }

    var card = h("section", { class: "coach-step is-" + step.type, aria: { labelledby: "coach-step-title" } });
    var typeKey = STEP_TYPES.indexOf(step.type) >= 0 ? "learn.stepType." + step.type : null;
    card.appendChild(h("span", { class: "coach-step-type", text: typeKey ? t(typeKey) : step.type }));
    card.appendChild(h("h3", { id: "coach-step-title", tabindex: "-1", text: step.title || lesson.title }));
    card.appendChild(h("p", { text: step.text || "" }));

    var feedback = h("div", { class: "coach-feedback", role: "status", aria: { live: "polite", atomic: "true" } });
    if (active.feedback) {
      feedback.classList.add("is-" + active.feedback.kind);
      feedback.textContent = active.feedback.kind === "hint"
        ? t("learn.hintLabel", { level: active.feedback.level, max: 5 }) + " " + active.feedback.text
        : t(active.feedback.messageKey);
    } else {
      feedback.classList.add("is-empty");
    }
    card.appendChild(feedback);
    body.appendChild(card);

    var actions = h("div", { class: "coach-actions" });
    actions.appendChild(h("button", {
      type: "button",
      class: "button button-secondary",
      disabled: active.stepIndex === 0,
      text: t("common.back"),
      data: { focusKey: "lesson-back" },
      on: { click: function () { lessonEngine.previous(); ctx.setLearningHighlight(null); ctx.render(); } }
    }));

    if (step.type === "exercise" && active.status !== "completed") {
      actions.appendChild(h("button", {
        type: "button",
        class: "button button-secondary",
        disabled: active.hintLevel >= 5,
        text: active.hintLevel >= 5 ? t("learn.allHintsShown") : t("learn.hint"),
        data: { focusKey: "lesson-hint" },
        on: { click: function () { lessonEngine.requestHint(); render(ctx); ctx.applyLearningHighlight(); } }
      }));
    }

    if (active.status === "completed") {
      actions.appendChild(h("button", {
        type: "button",
        class: "button button-primary",
        text: t("learn.backToLessons"),
        data: { focusKey: "lesson-next" },
        on: { click: function () {
          lessonEngine.stop();
          ctx.scenarioEngine.stop();
          ctx.state.learningHighlightSelector = null;
          ctx.render();
        } }
      }));
    } else {
      actions.appendChild(h("button", {
        type: "button",
        class: "button button-primary",
        text: t(step.type === "exercise" ? "learn.check" : "learn.continue"),
        data: { focusKey: "lesson-next" },
        on: { click: function () { lessonEngine.next(); ctx.render(); } }
      }));
    }
    body.appendChild(actions);

    body.appendChild(h("button", {
      type: "button",
      class: "coach-link",
      text: t("learn.quitLesson"),
      on: { click: function () {
        lessonEngine.stop();
        ctx.scenarioEngine.stop();
        ctx.state.learningHighlightSelector = null;
        ctx.render();
      } }
    }));
  }

  function renderPractice(ctx, body) {
    var t = ctx.t;
    var h = ctx.h;
    var engine = ctx.scenarioEngine;
    var active = engine.active();

    tabs(ctx, body);
    body.appendChild(h("p", { class: "coach-intro", text: t("learn.practiceIntro") }));

    if (active) {
      body.appendChild(h("section", { class: "coach-step" + (active.status === "completed" ? " is-complete" : "") }, [
        h("span", { class: "coach-step-type", text: t("learn.practiceActive") }),
        h("h3", { text: active.title }),
        h("p", { text: active.description }),
        h("p", { class: "coach-feedback " + (active.status === "completed" ? "is-success" : "is-empty"), role: "status", text: active.status === "completed" ? t("learn.practiceDone") : "" }),
        h("div", { class: "coach-actions" }, [
          h("button", { type: "button", class: "button button-secondary", text: t("learn.practiceReset"), on: { click: function () { engine.reset(ctx.runtimeApi); ctx.render(); } } }),
          h("button", { type: "button", class: "button button-secondary", text: t("learn.practiceStop"), on: { click: function () { engine.stop(); ctx.render(); } } })
        ])
      ]));
    }

    var list = h("ul", { class: "coach-practice-list" });
    engine.list().forEach(function (scenario) {
      list.appendChild(h("li", {}, [h("button", {
        type: "button",
        class: "coach-lesson" + (active && active.id === scenario.id ? " is-current" : ""),
        data: { focusKey: "scenario-" + scenario.id },
        on: { click: function () { engine.load(scenario.id, ctx.runtimeApi); ctx.render(); } }
      }, [h("span", { class: "coach-module-copy" }, [h("strong", { text: scenario.title }), h("span", { class: "coach-muted", text: scenario.description })])])]));
    });
    body.appendChild(list);
  }

  window.DatorskolanLearningPanel = { render: render };
})();
