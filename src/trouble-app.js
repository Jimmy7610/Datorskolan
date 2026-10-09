/*
  Report Viewer (Rapportvisaren) – a practice program that shows two common problems:
  an error message ("the file is in use") and a program that stops responding.
*/
(function () {
  "use strict";

  function ensure(state) {
    if (!state.troubleDemo) {
      state.troubleDemo = { mode: "error", errorOpen: false, errorHandled: false, frozen: false, waited: false, closedAfterFreeze: false, restarted: false };
    }
    return state.troubleDemo;
  }

  function windowTitle(ctx) {
    var s = ensure(ctx.state);
    return ctx.t("app.troubleDemo") + (s.mode === "frozen" ? " " + ctx.t("trouble.notRespondingSuffix") : "");
  }

  function showError(ctx) {
    var t = ctx.t;
    var s = ensure(ctx.state);
    s.errorOpen = true;
    ctx.emit("troubleshooting.errorOpened", { code: "FILE_IN_USE" });
    ctx.showDialog({
      kind: "app-error",
      icon: "error",
      title: t("app.troubleDemo"),
      message: t("trouble.error.text", { name: t("trouble.fileName") }),
      buttons: [
        { label: t("trouble.error.retry"), ui: "error-retry", action: function () {
          ctx.emit("troubleshooting.errorRetried", { code: "FILE_IN_USE" });
          window.setTimeout(function () { showError(ctx); }, 250);
        } },
        { label: t("common.close"), primary: true, cancel: true, ui: "error-close", action: function () {
          s.errorOpen = false;
          s.errorHandled = true;
          ctx.emit("troubleshooting.errorHandled", { choice: "close", code: "FILE_IN_USE" });
          ctx.refreshApp("trouble-demo");
        } }
      ]
    });
  }

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state);
    var root = h("div", { class: "trouble" + (s.mode === "frozen" ? " is-frozen" : "") });

    if (s.mode === "frozen") {
      root.setAttribute("aria-busy", "true");
      root.appendChild(h("div", { class: "trouble-frozen" }, [
        h("div", { class: "fw-spinner", aria: { hidden: "true" } }),
        h("p", { text: t("trouble.frozen.title", { name: t("trouble.fileName") }) }),
        h("small", { text: t("trouble.frozen.text") })
      ]));
      return root;
    }

    if (s.mode === "normal") {
      root.appendChild(h("div", { class: "trouble-ok" }, [
        h("span", { html: ctx.glyph("check", 32) }),
        h("h2", { text: t("trouble.normal.title") }),
        h("p", { text: t("trouble.normal.text") })
      ]));
      return root;
    }

    root.appendChild(h("h2", { class: "trouble-heading", text: t("trouble.recent") }));
    root.appendChild(h("button", {
      type: "button",
      class: "trouble-file",
      data: { ui: "trouble-file" },
      on: { click: function () { showError(ctx); } }
    }, [
      h("span", { html: ctx.icon("pdf", 32) }),
      h("span", {}, [h("strong", { text: t("trouble.fileName") }), h("small", { text: t("vfs.documents") })])
    ]));
    root.appendChild(h("p", { class: "fw-field-help", text: t("trouble.openHint") }));
    if (s.errorHandled) root.appendChild(h("p", { class: "fw-field-help", role: "status", text: t("trouble.afterError") }));
    return root;
  }

  window.DatorskolanTroubleApp = { render: render, ensure: ensure, windowTitle: windowTitle };
})();
