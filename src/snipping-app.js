/*
  Snipping Tool (Skärmklippverktyget). "Nytt" dims the whole screen; drag a rectangle to capture.
  On a real PC the shortcut is Windows key + Shift + S (a browser cannot simulate the Windows key).
*/
(function () {
  "use strict";

  function ensure(state) {
    if (!state.snipping) state.snipping = { captured: false, saved: false, size: null };
    return state.snipping;
  }

  function startCapture(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state);
    var screen = ctx.el.screen;
    var win = ctx.findWindow("snipping");

    // Windows hides the Snipping Tool window while you choose an area.
    if (win) win.capturing = true;
    ctx.renderWindows();

    var layer = h("div", { class: "fw-snip-layer", role: "application", aria: { label: t("snip.overlayLabel") } }, [
      h("div", { class: "fw-snip-toolbar" }, [
        h("span", { html: ctx.icon("crop", 16) }),
        h("span", { text: t("snip.rectangle") }),
        h("button", { type: "button", class: "fw-icon-button", aria: { label: t("common.cancel") }, title: t("common.cancel"), html: ctx.glyph("close", 16), on: { click: cancel } })
      ]),
      h("p", { class: "fw-snip-hint", text: t("snip.dragHint") })
    ]);
    var selection = h("div", { class: "fw-snip-selection", hidden: true });
    layer.appendChild(selection);
    screen.appendChild(layer);
    ctx.emit("screenshot.started", {});

    var drag = null;

    function finish() {
      layer.remove();
      if (win) win.capturing = false;
      document.removeEventListener("keydown", onKey, true);
    }

    function cancel() {
      finish();
      ctx.refreshApp("snipping");
    }

    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); cancel(); }
    }
    document.addEventListener("keydown", onKey, true);

    layer.addEventListener("pointerdown", function (e) {
      if (e.button !== 0 || e.target.closest("button")) return;
      var rect = layer.getBoundingClientRect();
      drag = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: e.pointerId };
      selection.hidden = false;
      selection.style.left = drag.x + "px";
      selection.style.top = drag.y + "px";
      selection.style.width = "0px";
      selection.style.height = "0px";
      layer.setPointerCapture(e.pointerId);
    });
    layer.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var rect = layer.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      selection.style.left = Math.min(drag.x, x) + "px";
      selection.style.top = Math.min(drag.y, y) + "px";
      selection.style.width = Math.abs(x - drag.x) + "px";
      selection.style.height = Math.abs(y - drag.y) + "px";
    });
    layer.addEventListener("pointerup", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var width = parseFloat(selection.style.width) || 0;
      var height = parseFloat(selection.style.height) || 0;
      drag = null;
      if (width < 30 || height < 30) {
        selection.hidden = true;
        return;
      }
      finish();
      s.captured = true;
      s.saved = false;
      s.size = { width: Math.round(width), height: Math.round(height) };
      ctx.emit("screenshot.captured", s.size);
      ctx.openApp("snipping");
      ctx.refreshApp("snipping");
    });
  }

  function save(ctx) {
    var s = ensure(ctx.state);
    window.DatorskolanBasicApps.showSaveAs(ctx, {
      title: ctx.t("saveAs.title"),
      initialFolder: "pictures",
      initialName: ctx.t("snip.defaultName"),
      extension: ".png",
      typeLabel: ctx.t("saveAs.typePng"),
      onSave: function (folderId, name) {
        var node = ctx.vfs.createFile(folderId, name, "image", "");
        s.saved = true;
        ctx.emit("screenshot.saved", { name: node.name, parentId: folderId });
        ctx.refreshApp("snipping");
      }
    });
  }

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state);
    var root = h("div", { class: "snipping" });

    var toolbar = h("div", { class: "snipping-toolbar", role: "toolbar", aria: { label: t("app.snipping") } }, [
      h("button", { type: "button", class: "fw-button fw-button-accent", data: { ui: "snip-new" }, on: { click: function () { startCapture(ctx); } } }, [h("span", { html: ctx.glyph("plus", 16) }), h("span", { text: t("snip.new") })]),
      h("button", { type: "button", class: "fw-command", disabled: true }, [h("span", { class: "fw-command-icon", html: ctx.icon("crop", 16) }), h("span", { class: "fw-command-label", text: t("snip.rectangle") })]),
      h("button", { type: "button", class: "fw-command", disabled: true }, [h("span", { class: "fw-command-icon", html: ctx.icon("timer", 16) }), h("span", { class: "fw-command-label", text: t("snip.noDelay") })]),
      h("span", { class: "pdf-spacer" }),
      s.captured ? h("button", { type: "button", class: "fw-command", data: { ui: "snip-save" }, title: t("common.save") + " (Ctrl+S)", on: { click: function () { save(ctx); } } }, [h("span", { class: "fw-command-icon", html: ctx.icon("save", 16) }), h("span", { class: "fw-command-label", text: t("common.save") })]) : null
    ]);
    root.appendChild(toolbar);

    var body = h("div", { class: "snipping-body" });
    if (!s.captured) {
      body.appendChild(h("div", { class: "snipping-empty" }, [
        h("span", { html: ctx.icon("snipping", 48) }),
        h("p", { text: t("snip.intro") }),
        h("p", { class: "fw-field-help", text: t("snip.shortcutTip") })
      ]));
    } else {
      body.appendChild(h("div", { class: "snipping-preview", role: "img", aria: { label: t("snip.previewLabel") } }, [
        h("div", { class: "snipping-preview-shot", style: { aspectRatio: s.size ? s.size.width + " / " + s.size.height : "16 / 10" } }, [
          h("span", { class: "snipping-preview-bar" }),
          h("span", { class: "snipping-preview-window" })
        ])
      ]));
      if (s.saved) body.appendChild(h("p", { class: "fw-field-help", role: "status", text: t("snip.saved") }));
    }
    root.appendChild(body);

    root.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.key.toLowerCase() === "s" && s.captured) { e.preventDefault(); save(ctx); }
      if (e.ctrlKey && e.key.toLowerCase() === "n") { e.preventDefault(); startCapture(ctx); }
    });
    return root;
  }

  window.DatorskolanSnippingApp = { render: render, ensure: ensure };
})();
