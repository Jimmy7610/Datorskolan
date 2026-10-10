/*
  Datorskolan coach panel – the course dashboard, lesson player and free practice list.

  This is Datorskolan's own interface (not part of Windows), so it uses the website's design system
  and typeface. The visual difference helps learners tell "the teacher" apart from "the computer".
*/
(function () {
  "use strict";

  var STEP_TYPES = ["instruction", "demonstration", "exercise", "quiz", "simulation", "reflection", "checkpoint", "completion"];
  var Pedagogy = window.DatorskolanPedagogy;
  var helpTimer = null;

  // Translation key for the learner's audience and help level, e.g. learn.intro.child.
  function tp(ctx, key, profile, params) {
    return ctx.t(Pedagogy.variantKey(ctx.I18n, key, profile), params);
  }

  function text(value, profile) {
    return Pedagogy.resolve(value, profile);
  }

  /* ---------- How you learn: audience, help and explanations ----------
     Collapsed it is one line ("Adult · Guided · Normal"); opened it shows each choice with a short description. */
  function learningSettings(ctx, body, where) {
    var t = ctx.t;
    var h = ctx.h;
    var state = ctx.state;
    var store = ctx.progressStore;
    var profile = store.learningProfile();
    var open = state.learningSettingsOpen === where;
    var regionId = "coach-settings-" + where;

    var compact = where === "lesson" && !open;
    var box = h("section", { class: "coach-settings" + (open ? " is-open" : "") + (compact ? " is-compact" : ""), aria: { label: t("learn.settings.title") } });
    var summary = h("button", {
      type: "button",
      class: "coach-settings-summary",
      aria: { expanded: open ? "true" : "false", controls: regionId },
      data: { focusKey: "settings-toggle-" + where },
      on: { click: function () { state.learningSettingsOpen = open ? null : where; render(ctx); } }
    });
    summary.appendChild(h("span", { class: "coach-settings-head" }, [
      h("span", { class: "coach-settings-title", text: t("learn.settings.title") }),
      h("span", { class: "coach-settings-action", text: open ? t("learn.settings.done") : t("learn.settings.change") })
    ]));
    var items = h("span", { class: "coach-settings-items" });
    if (compact) {
      // During a lesson: one quiet line ("Vuxen · Guidad · Normal"), so the step keeps the attention.
      items.appendChild(h("span", { class: "coach-settings-inline", text: Object.keys(Pedagogy.DIMENSIONS).map(function (name) { return t("learn." + name + "." + profile[name]); }).join(" · ") }));
    }
    Object.keys(compact ? {} : Pedagogy.DIMENSIONS).forEach(function (name) {
      items.appendChild(h("span", { class: "coach-settings-item" }, [
        h("span", { class: "coach-label", text: t("learn.setting." + name) }),
        h("strong", { text: t("learn." + name + "." + profile[name]) })
      ]));
    });
    summary.appendChild(items);
    box.appendChild(summary);

    if (open) {
      var region = h("div", { class: "coach-settings-body", id: regionId });
      Object.keys(Pedagogy.DIMENSIONS).forEach(function (name) {
        var fieldset = h("fieldset", { class: "coach-choice" }, [h("legend", { text: t("learn.setting." + name) })]);
        Pedagogy.DIMENSIONS[name].values.forEach(function (value) {
          var id = "coach-" + where + "-" + name + "-" + value;
          var input = h("input", {
            type: "radio",
            id: id,
            name: "coach-" + where + "-" + name,
            value: value,
            data: { focusKey: "setting-" + name + "-" + value },
            aria: { describedby: id + "-desc" },
            on: { change: function () {
              var patch = {};
              patch[name] = value;
              store.setLearning(patch);
              ctx.render();
            } }
          });
          input.checked = profile[name] === value;
          fieldset.appendChild(h("div", { class: "coach-choice-option" }, [
            input,
            h("label", { for: id }, [
              h("strong", { text: t("learn." + name + "." + value) }),
              h("small", { id: id + "-desc", text: t("learn." + name + "." + value + ".desc") })
            ])
          ]));
        });
        region.appendChild(fieldset);
      });
      region.appendChild(h("p", { class: "coach-muted", text: t("learn.settings.note") }));
      box.appendChild(region);
    }
    body.appendChild(box);
  }

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
    var profile = store.learningProfile();
    var data = modules(ctx);

    tabs(ctx, body);

    body.appendChild(h("p", { class: "coach-intro", text: tp(ctx, "learn.intro", profile) }));
    learningSettings(ctx, body, "dashboard");

    var recommended = store.recommendLesson(data.lessons);
    if (recommended) {
      body.appendChild(h("button", {
        type: "button",
        class: "coach-next",
        data: { focusKey: "next" },
        on: { click: function () { startLesson(ctx, recommended); } }
      }, [
        h("span", { class: "coach-eyebrow", text: tp(ctx, "learn.next", profile) }),
        h("strong", { text: text(recommended.title, profile) }),
        h("span", { class: "coach-muted", text: ctx.course.moduleTitle(recommended.moduleId) + " · " + text(recommended.summary, profile) }),
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
        h("span", { class: "coach-module-copy" }, [h("strong", { text: text(lesson.title) }), h("span", { class: "coach-muted", text: text(lesson.summary) })]),
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
    var profile = lessonEngine.profile();
    var running = active.status === "running";

    // The yellow frame: always during a demonstration, from the start with guided help, otherwise from the "look" hint.
    var showFrame = running && step.visualTarget && Pedagogy.highlightVisible(step.type, profile.support, active.hintRung);
    ctx.state.learningHighlightSelector = showFrame ? step.visualTarget : null;

    body.appendChild(h("p", { class: "coach-eyebrow", text: ctx.course.moduleTitle(lesson.moduleId) }));
    body.appendChild(h("h3", { class: "coach-lesson-title", text: text(lesson.title, profile) }));
    body.appendChild(h("div", { class: "coach-row" }, [
      h("span", { class: "coach-muted", text: t("learn.stepOf", { step: active.stepIndex + 1, total: total }) })
    ]));
    body.appendChild(progressBar(ctx, Math.round((active.stepIndex + 1) / total * 100), t("learn.stepOf", { step: active.stepIndex + 1, total: total })));

    var card = h("section", { class: "coach-step is-" + step.type, aria: { labelledby: "coach-step-title" } });
    var typeKey = STEP_TYPES.indexOf(step.type) >= 0 ? "learn.stepType." + step.type : null;
    var typeLabel = typeKey ? t(typeKey) : step.type;
    var stepTitle = text(step.title, profile) || text(lesson.title, profile);
    // The label says what kind of step this is; it is left out when the heading already says the same ("Din tur").
    if (ctx.I18n.lower(typeLabel) !== ctx.I18n.lower(stepTitle)) card.appendChild(h("span", { class: "coach-step-type", text: typeLabel }));
    card.appendChild(h("h3", { id: "coach-step-title", tabindex: "-1", text: stepTitle }));
    var stepText = text(step.text, profile);
    var sentences = Pedagogy.splitSteps(stepText);
    if (step.type === "exercise" && profile.support === "guided" && sentences.length > 1) {
      // Guided help: one thing at a time, as a numbered list.
      card.appendChild(h("ol", { class: "coach-step-list" }, sentences.map(function (sentence) { return h("li", { text: sentence }); })));
    } else {
      card.appendChild(h("p", { class: "coach-step-text", text: stepText }));
    }

    // Detailed explanations also say WHY the thing exists, in the introduction.
    if (Pedagogy.showWhy(step.type, profile.depth) && lesson.detail && lesson.detail.use) {
      card.appendChild(h("p", { class: "coach-why" }, [h("strong", { text: t("learn.why") + " " }), document.createTextNode(text(lesson.detail.use, profile))]));
    }

    var feedback = h("div", { class: "coach-feedback", role: "status", aria: { live: "polite", atomic: "true" } });
    if (active.feedback) {
      feedback.classList.add("is-" + active.feedback.kind);
      feedback.textContent = active.feedback.kind === "hint"
        ? t("learn.hintLabel", { level: active.feedback.level, max: active.feedback.max }) + " " + Pedagogy.hintText(step, active.feedback.rung, profile)
        : tp(ctx, active.feedback.messageKey, profile);
    } else {
      feedback.classList.add("is-empty");
    }
    card.appendChild(feedback);

    // Adaptive help: offered when the learner seems stuck, never switched on behind their back.
    if (step.type === "exercise" && running && lessonEngine.shouldOfferMoreHelp()) {
      card.appendChild(h("div", { class: "coach-offer", role: "group", aria: { labelledby: "coach-offer-text" } }, [
        h("p", { id: "coach-offer-text", role: "status", text: tp(ctx, "learn.help.offer", profile) }),
        h("div", { class: "coach-offer-actions" }, [
          h("button", { type: "button", class: "button button-primary", text: t("learn.help.yes"), data: { focusKey: "help-yes" }, on: { click: function () { lessonEngine.acceptMoreHelp(); ctx.render(); ctx.applyLearningHighlight(); } } }),
          h("button", { type: "button", class: "button button-secondary", text: t("learn.help.no"), data: { focusKey: "help-no" }, on: { click: function () { lessonEngine.declineMoreHelp(); render(ctx); } } })
        ])
      ]));
    }
    scheduleHelpCheck(ctx, step, active);
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

    if (step.type === "exercise" && running) {
      var remaining = lessonEngine.hintsRemaining();
      actions.appendChild(h("button", {
        type: "button",
        class: "button button-secondary",
        disabled: remaining === 0,
        text: remaining === 0 ? t("learn.allHintsShown") : t("learn.hint"),
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

    // "More about this": more or less of the shared lesson detail, depending on the explanation level.
    // It comes after the step, so what to do now is always the first thing the learner sees.
    if (lesson.detail) {
      var sections = Pedagogy.detailSections(profile.depth);
      var details = h("details", { class: "coach-details" });
      details.open = sections.open;
      details.appendChild(h("summary", { text: t("learn.understand") }));
      var content = h("div", { class: "coach-details-content" });
      sections.fields.forEach(function (field) {
        var value = text(lesson.detail[field], profile);
        if (!value) return;
        content.appendChild(h("h4", { text: t("learn.detail." + field) }));
        content.appendChild(h("p", { text: value }));
      });
      sections.lists.forEach(function (field) {
        var items = lesson.detail[field];
        if (!Array.isArray(items) || !items.length) return;
        content.appendChild(h("h4", { text: t("learn.detail." + field) }));
        content.appendChild(h(field === "steps" ? "ol" : "ul", {}, items.map(function (item) { return h("li", { text: text(item, profile) }); })));
      });
      if (content.children.length) {
        details.appendChild(content);
        body.appendChild(details);
      }
    }

    learningSettings(ctx, body, "lesson");

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

  // Re-render once the learner has been on an exercise long enough for the help offer to appear.
  function scheduleHelpCheck(ctx, step, active) {
    if (helpTimer) window.clearTimeout(helpTimer);
    helpTimer = null;
    if (step.type !== "exercise" || active.status !== "running" || !active.stepStartedAt) return;
    var wait = active.stepStartedAt + Pedagogy.STUCK.idleMs - Date.now();
    if (wait <= 0) return;
    helpTimer = window.setTimeout(function () {
      helpTimer = null;
      if (ctx.lessonEngine.shouldOfferMoreHelp()) render(ctx);
    }, wait + 50);
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
