/*
  A classic setup wizard, preceded by the User Account Control (UAC) prompt Windows shows
  before a program may make changes to the device.
*/
(function () {
  "use strict";

  var STEPS = ["welcome", "license", "location", "ready", "done"];

  function ensure(state) {
    if (!state.installer) state.installer = { step: "welcome", accepted: false, installed: false, launch: true };
    if (!state.software) state.software = { exerciseProgramInstalled: false };
    return state.installer;
  }

  // Windows asks for permission first. "Nej" cancels; "Ja" starts the wizard.
  function launch(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    ctx.emit("installer.uacShown", {});
    ctx.showDialog({
      kind: "uac",
      className: "fw-uac",
      title: t("installer.uac.title"),
      body: h("div", { class: "fw-uac-body" }, [
        h("div", { class: "fw-uac-app" }, [h("span", { html: ctx.icon("installer", 32) }), h("strong", { text: t("installer.uac.app") })]),
        h("p", { text: t("installer.uac.publisher") }),
        h("p", { text: t("installer.uac.origin") })
      ]),
      buttons: [
        { label: t("common.yes"), primary: true, ui: "uac-yes", action: function () {
          ctx.state.installer = { step: "welcome", accepted: false, installed: false, launch: true };
          ctx.emit("installer.uacAccepted", {});
          ctx.openApp("installer");
        } },
        { label: t("common.no"), cancel: true, ui: "uac-no", action: function () { ctx.emit("installer.uacDeclined", {}); } }
      ]
    });
  }

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state);
    var root = h("div", { class: "installer" });
    var index = STEPS.indexOf(s.step);

    function go(step) {
      s.step = step;
      ctx.refreshApp("installer");
    }

    root.appendChild(h("header", { class: "installer-head" }, [
      h("div", {}, [h("strong", { text: t("installer.step." + s.step + ".title") }), h("p", { text: t("installer.step." + s.step + ".subtitle") })]),
      h("span", { class: "installer-logo", html: ctx.icon("installer", 40) })
    ]));

    var body = h("div", { class: "installer-body" });
    if (s.step === "welcome") {
      body.appendChild(h("p", { text: t("installer.welcome.p1") }));
      body.appendChild(h("p", { text: t("installer.welcome.p2") }));
    }
    if (s.step === "license") {
      body.appendChild(h("div", { class: "installer-license", tabindex: "0", role: "document", aria: { label: t("installer.step.license.title") } }, [
        h("p", { text: t("installer.license.p1") }),
        h("p", { text: t("installer.license.p2") })
      ]));
      var group = h("div", { class: "installer-radios", role: "radiogroup", aria: { label: t("installer.step.license.title") } });
      [[true, "installer.license.accept"], [false, "installer.license.decline"]].forEach(function (entry) {
        var input = h("input", { type: "radio", name: "installer-license", data: { ui: entry[0] ? "license-accept" : "license-decline" } });
        input.checked = s.accepted === entry[0];
        input.addEventListener("change", function () { s.accepted = entry[0]; ctx.refreshApp("installer"); });
        group.appendChild(h("label", { class: "fw-check" }, [input, h("span", { text: t(entry[1]) })]));
      });
      body.appendChild(group);
    }
    if (s.step === "location") {
      body.appendChild(h("p", { text: t("installer.location.p1") }));
      body.appendChild(h("label", { class: "fw-field" }, [h("span", { text: t("installer.location.label") }), h("input", { type: "text", readonly: true, value: "C:\\Program Files\\" + t("app.exerciseProgram") })]));
      body.appendChild(h("p", { class: "fw-field-help", text: t("installer.location.help") }));
    }
    if (s.step === "ready") {
      body.appendChild(h("p", { text: t("installer.ready.p1") }));
    }
    if (s.step === "done") {
      body.appendChild(h("p", { role: "status", text: t("installer.done.p1") }));
    }
    root.appendChild(body);

    var actions = h("footer", { class: "installer-actions" });
    actions.appendChild(h("button", { type: "button", class: "fw-button", text: "< " + t("common.back"), disabled: index <= 0 || s.step === "done", on: { click: function () { go(STEPS[index - 1]); } } }));

    if (s.step === "ready") {
      actions.appendChild(h("button", { type: "button", class: "fw-button fw-button-accent", text: t("installer.install"), data: { ui: "installer-install" }, on: { click: function () {
        s.installed = true;
        ctx.state.software.exerciseProgramInstalled = true;
        ctx.emit("software.installed", { appId: "exercise-program", name: t("app.exerciseProgram") });
        go("done");
      } } }));
    } else if (s.step === "done") {
      actions.appendChild(h("button", { type: "button", class: "fw-button fw-button-accent", text: t("installer.finish"), data: { ui: "installer-finish" }, on: { click: function () {
        ctx.emit("installer.finished", { appId: "exercise-program" });
        var w = ctx.findWindow("installer");
        if (w) ctx.forceCloseWindow(w.id);
      } } }));
    } else {
      actions.appendChild(h("button", { type: "button", class: "fw-button fw-button-accent", text: t("common.next") + " >", disabled: s.step === "license" && s.accepted !== true, data: { ui: "installer-next" }, on: { click: function () { go(STEPS[index + 1]); } } }));
    }

    actions.appendChild(h("button", { type: "button", class: "fw-button", text: t("common.cancel"), disabled: s.step === "done", on: { click: function () {
      ctx.showDialog({
        icon: "warning",
        title: t("installer.cancelTitle"),
        message: t("installer.cancelText"),
        buttons: [
          { label: t("common.yes"), primary: true, action: function () { var w = ctx.findWindow("installer"); if (w) ctx.forceCloseWindow(w.id); ctx.emit("installer.cancelled", {}); } },
          { label: t("common.no"), cancel: true }
        ]
      });
    } } }));
    root.appendChild(actions);
    return root;
  }

  window.DatorskolanInstallerApp = { render: render, launch: launch, ensure: ensure };
})();
