/*
  PDF reader and the Windows 11 print dialog.
  On a real Windows 11 PC, PDF files usually open in Microsoft Edge; this is a neutral PDF reader
  with the same core tools (zoom, save a copy, print).
*/
(function () {
  "use strict";

  var PRINT_TO_PDF = "Microsoft Print to PDF";

  function ensure(state, ctx) {
    if (!state.pdfViewer) {
      state.pdfViewer = { fileName: ctx ? ctx.t("pdf.sampleName") : "invoice.pdf", zoom: 100 };
    }
    return state.pdfViewer;
  }

  function windowTitle(ctx) {
    return ensure(ctx.state, ctx).fileName + " – " + ctx.t("app.pdf");
  }

  function setZoom(ctx, value) {
    var s = ensure(ctx.state, ctx);
    s.zoom = Math.max(50, Math.min(200, value));
    ctx.emit("pdf.zoomChanged", { zoom: s.zoom });
    ctx.refreshApp("pdf");
  }

  function saveCopy(ctx) {
    var s = ensure(ctx.state, ctx);
    window.DatorskolanBasicApps.showSaveAs(ctx, {
      title: ctx.t("saveAs.title"),
      initialFolder: "documents",
      initialName: ctx.t("pdf.copyName"),
      extension: ".pdf",
      typeLabel: ctx.t("saveAs.typePdf"),
      onSave: function (folderId, name) {
        var exists = ctx.vfs.list(folderId).filter(function (n) { return n.name.toLowerCase() === name.toLowerCase(); })[0];
        var node = exists || ctx.vfs.createFile(folderId, name, "pdf", "");
        s.savedCopy = true;
        ctx.emit("pdf.savedCopy", { name: node.name, parentId: folderId });
        ctx.toast(ctx.t("app.pdf"), ctx.t("pdf.savedToast", { name: node.name, folder: ctx.displayName(ctx.vfs.get(folderId)) }), "pdf");
      }
    });
  }

  function printDialog(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    ctx.emit("print.dialogOpened", { source: "pdf" });

    var printers = [t("print.officePrinter"), PRINT_TO_PDF];
    var printer = h("select", { id: "fw-print-printer", data: { ui: "print-printer" } }, printers.map(function (name) { return h("option", { value: name, text: name }); }));
    var copies = h("input", { type: "number", id: "fw-print-copies", min: "1", max: "99", value: "1" });
    var orientation = h("select", { id: "fw-print-orientation" }, [h("option", { text: t("print.portrait") }), h("option", { text: t("print.landscape") })]);
    var pages = h("select", { id: "fw-print-pages" }, [h("option", { text: t("print.allPages") })]);

    ctx.showDialog({
      kind: "print",
      wide: true,
      className: "fw-print-dialog",
      title: t("print.title"),
      body: h("div", { class: "fw-print" }, [
        h("div", { class: "fw-print-preview", aria: { hidden: "true" } }, [invoicePage(ctx, true)]),
        h("div", { class: "fw-print-options" }, [
          h("label", { class: "fw-field", for: "fw-print-printer" }, [h("span", { text: t("print.printer") })]),
          printer,
          h("label", { class: "fw-field", for: "fw-print-copies" }, [h("span", { text: t("print.copies") })]),
          copies,
          h("label", { class: "fw-field", for: "fw-print-orientation" }, [h("span", { text: t("print.orientation") })]),
          orientation,
          h("label", { class: "fw-field", for: "fw-print-pages" }, [h("span", { text: t("print.pages") })]),
          pages
        ])
      ]),
      buttons: [
        { label: t("print.print"), primary: true, ui: "print-confirm", action: function () {
          if (printer.value !== PRINT_TO_PDF) {
            ctx.emit("print.sentToOffline", { printer: printer.value });
            ctx.showDialog({
              icon: "warning",
              title: t("print.offlineTitle"),
              message: t("print.offlineText", { printer: printer.value }),
              buttons: [{ label: t("common.ok"), primary: true, cancel: true }]
            });
            return;
          }
          window.DatorskolanBasicApps.showSaveAs(ctx, {
            title: t("print.saveOutputAs"),
            initialFolder: "documents",
            initialName: t("pdf.printName"),
            extension: ".pdf",
            typeLabel: t("saveAs.typePdf"),
            onSave: function (folderId, name) {
              var node = ctx.vfs.createFile(folderId, name, "pdf", "");
              ctx.emit("print.pdfCreated", { name: node.name, printer: PRINT_TO_PDF, parentId: folderId });
              ctx.toast(t("print.title"), t("print.pdfDone", { name: node.name }), "pdf");
            }
          });
        } },
        { label: t("common.cancel"), cancel: true }
      ]
    });
  }

  function invoicePage(ctx, small) {
    var t = ctx.t;
    var h = ctx.h;
    return h("div", { class: "pdf-page" + (small ? " is-small" : "") }, [
      h("header", {}, [h("strong", { text: t("pdf.invoice.title") }), h("span", { text: t("pdf.invoice.number") })]),
      h("p", {}, [h("b", { text: t("pdf.invoice.to") + " " }), h("span", { text: t("pdf.invoice.customer") })]),
      h("p", {}, [h("b", { text: t("pdf.invoice.due") + " " }), h("span", { text: "2026-10-30" })]),
      h("table", {}, [
        h("thead", {}, [h("tr", {}, [h("th", { text: t("pdf.invoice.description") }), h("th", { text: t("pdf.invoice.amount") })])]),
        h("tbody", {}, [h("tr", {}, [h("td", { text: t("pdf.invoice.item") }), h("td", { text: t("pdf.invoice.price") })])])
      ]),
      h("footer", { text: t("pdf.invoice.footer") })
    ]);
  }

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state, ctx);
    var root = h("div", { class: "pdf", tabindex: "-1" });

    root.appendChild(h("div", { class: "pdf-toolbar", role: "toolbar", aria: { label: t("pdf.toolbar") } }, [
      h("span", { class: "pdf-pages", text: t("pdf.pageOf", { page: 1, total: 1 }) }),
      h("span", { class: "fw-command-separator", aria: { hidden: "true" } }),
      h("button", { type: "button", class: "fw-icon-button", title: t("pdf.zoomOut"), aria: { label: t("pdf.zoomOut") }, html: ctx.glyph("minus", 16), data: { ui: "pdf-zoom-out" }, on: { click: function () { setZoom(ctx, s.zoom - 10); } } }),
      h("span", { class: "pdf-zoom", text: s.zoom + " %" }),
      h("button", { type: "button", class: "fw-icon-button", title: t("pdf.zoomIn"), aria: { label: t("pdf.zoomIn") }, html: ctx.glyph("plus", 16), data: { ui: "pdf-zoom-in" }, on: { click: function () { setZoom(ctx, s.zoom + 10); } } }),
      h("span", { class: "pdf-spacer" }),
      h("button", { type: "button", class: "fw-command", data: { ui: "pdf-print" }, title: t("print.print") + " (Ctrl+P)", on: { click: function () { printDialog(ctx); } } }, [h("span", { class: "fw-command-icon", html: ctx.glyph("print", 16) }), h("span", { class: "fw-command-label", text: t("print.print") })]),
      h("button", { type: "button", class: "fw-command", data: { ui: "pdf-save-copy" }, title: t("pdf.saveCopy") + " (Ctrl+S)", on: { click: function () { saveCopy(ctx); } } }, [h("span", { class: "fw-command-icon", html: ctx.icon("save", 16) }), h("span", { class: "fw-command-label", text: t("pdf.saveCopy") })])
    ]));

    var workspace = h("div", { class: "pdf-workspace" });
    var page = invoicePage(ctx, false);
    page.style.zoom = String(s.zoom / 100);
    workspace.appendChild(page);
    root.appendChild(workspace);

    root.addEventListener("keydown", function (e) {
      if (!e.ctrlKey) return;
      var key = e.key.toLowerCase();
      if (key === "p") { e.preventDefault(); printDialog(ctx); }
      if (key === "s") { e.preventDefault(); saveCopy(ctx); }
      if (key === "+" || key === "=") { e.preventDefault(); setZoom(ctx, s.zoom + 10); }
      if (key === "-") { e.preventDefault(); setZoom(ctx, s.zoom - 10); }
    });
    return root;
  }

  window.DatorskolanPdfApp = { render: render, ensure: ensure, windowTitle: windowTitle, printDialog: printDialog };
})();
