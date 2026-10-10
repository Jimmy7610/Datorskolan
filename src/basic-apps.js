/*
  Built-in Windows apps: Calculator, Notepad and Photos (Windows 11 layouts).
*/
(function () {
  "use strict";

  /* =================================================================
     Calculator – Windows 11 "Standard" mode
     ================================================================= */

  var OPERATORS = { "+": "+", "−": "−", "×": "×", "÷": "÷" };

  function decimalSeparator(ctx) {
    return (1.5).toLocaleString(ctx.I18n.intlLocale()).charAt(1);
  }

  function formatNumber(ctx, raw) {
    if (raw === "Error") return ctx.t("calc.error");
    return String(raw).replace(".", decimalSeparator(ctx));
  }

  function calculatorInput(ctx, key) {
    var calc = ctx.state.calculator;

    if (/^\d$/.test(key)) {
      if (calc.waiting || calc.display === "0" || calc.display === "Error") {
        calc.display = key;
        calc.waiting = false;
      } else if (calc.display.replace(/[-.]/g, "").length < 16) {
        calc.display += key;
      }
    } else if (key === ".") {
      if (calc.waiting || calc.display === "Error") {
        calc.display = "0.";
        calc.waiting = false;
      } else if (calc.display.indexOf(".") === -1) {
        calc.display += ".";
      }
    } else if (key === "CE") {
      calc.display = "0";
      calc.waiting = false;
    } else if (key === "C") {
      calc.display = "0";
      calc.stored = null;
      calc.operator = null;
      calc.waiting = false;
      calc.expression = "";
    } else if (key === "⌫") {
      if (!calc.waiting && calc.display !== "Error") calc.display = calc.display.length > 1 ? calc.display.slice(0, -1) : "0";
      if (calc.display === "-") calc.display = "0";
    } else if (key === "±") {
      if (calc.display !== "0" && calc.display !== "Error") calc.display = calc.display.charAt(0) === "-" ? calc.display.slice(1) : "-" + calc.display;
    } else if (key === "%") {
      var base = calc.stored === null ? 0 : calc.stored;
      calc.display = String(round(base * parseFloat(calc.display || "0") / 100));
    } else if (key === "1/x" || key === "x²" || key === "√") {
      var value = parseFloat(calc.display || "0");
      var result = key === "1/x" ? (value === 0 ? NaN : 1 / value) : key === "x²" ? value * value : (value < 0 ? NaN : Math.sqrt(value));
      calc.display = Number.isFinite(result) ? String(round(result)) : "Error";
      calc.waiting = true;
    } else if (OPERATORS[key]) {
      if (calc.operator && !calc.waiting) evaluate(ctx, false);
      calc.stored = parseFloat(calc.display || "0");
      calc.operator = key;
      calc.waiting = true;
      calc.expression = formatNumber(ctx, String(calc.stored)) + " " + key;
    } else if (key === "=") {
      evaluate(ctx, true);
    }

    ctx.refreshApp("calculator");
  }

  function round(value) {
    return Math.round((value + Number.EPSILON) * 1e10) / 1e10;
  }

  function evaluate(ctx, final) {
    var calc = ctx.state.calculator;
    if (calc.operator === null || calc.stored === null) return;
    var right = parseFloat(calc.display || "0");
    var result = calc.stored;
    if (calc.operator === "+") result += right;
    if (calc.operator === "−") result -= right;
    if (calc.operator === "×") result *= right;
    if (calc.operator === "÷") result = right === 0 ? NaN : result / right;

    calc.expression = final ? formatNumber(ctx, String(calc.stored)) + " " + calc.operator + " " + formatNumber(ctx, String(right)) + " =" : "";
    calc.display = Number.isFinite(result) ? String(round(result)) : "Error";
    ctx.emit("calculator.result", { result: calc.display, operator: calc.operator });
    calc.stored = null;
    calc.operator = null;
    calc.waiting = true;
  }

  function renderCalculator(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var calc = ctx.state.calculator;
    var sep = decimalSeparator(ctx);

    var root = h("div", { class: "calculator", tabindex: "0", aria: { label: t("app.calculator") }, data: { ui: "calculator" } });
    root.appendChild(h("div", { class: "calculator-head" }, [
      h("span", { class: "calculator-menu", html: ctx.glyph("hamburger", 16), aria: { hidden: "true" } }),
      h("strong", { text: t("calc.standard") })
    ]));
    root.appendChild(h("div", { class: "calculator-expression", aria: { hidden: "true" }, text: calc.expression || "" }));
    root.appendChild(h("output", { class: "calculator-display", aria: { live: "polite", label: t("calc.display") }, text: formatNumber(ctx, calc.display) }));

    var keys = [
      ["%", "%", "fn"], ["CE", "CE", "fn"], ["C", "C", "fn"], ["⌫", "⌫", "fn", t("calc.backspace")],
      ["1/x", "⅟x", "fn", t("calc.reciprocal")], ["x²", "x²", "fn", t("calc.square")], ["√", "²√x", "fn", t("calc.squareRoot")], ["÷", "÷", "op", t("calc.divide")],
      ["7", "7"], ["8", "8"], ["9", "9"], ["×", "×", "op", t("calc.multiply")],
      ["4", "4"], ["5", "5"], ["6", "6"], ["−", "−", "op", t("calc.minus")],
      ["1", "1"], ["2", "2"], ["3", "3"], ["+", "+", "op", t("calc.plus")],
      ["±", "+/−", "num", t("calc.negate")], ["0", "0"], [".", sep, "num", t("calc.decimal")], ["=", "=", "equals", t("calc.equals")]
    ];

    var grid = h("div", { class: "calculator-keys" });
    keys.forEach(function (entry) {
      grid.appendChild(h("button", {
        type: "button",
        class: "calculator-key is-" + (entry[2] || "num"),
        text: entry[1],
        aria: { label: entry[3] || null },
        data: { key: entry[0] },
        on: { click: function (e) { e.stopPropagation(); calculatorInput(ctx, entry[0]); } }
      }));
    });
    root.appendChild(grid);

    root.addEventListener("keydown", function (e) {
      var map = { "+": "+", "-": "−", "*": "×", "/": "÷", "Enter": "=", "=": "=", "Backspace": "⌫", "Escape": "C", "Delete": "CE", ",": ".", ".": ".", "%": "%" };
      var key = /^\d$/.test(e.key) ? e.key : map[e.key];
      if (!key) return;
      e.preventDefault();
      e.stopPropagation();
      calculatorInput(ctx, key);
      window.setTimeout(function () {
        var fresh = document.querySelector(".fw-app-calculator .calculator");
        if (fresh) fresh.focus({ preventScroll: true });
      }, 0);
    });

    return root;
  }

  /* =================================================================
     Notepad – Windows 11 (menu bar, status bar, Save As dialog)
     ================================================================= */

  function notepadNode(ctx) {
    var s = ctx.state;
    return s.notepadFileId ? ctx.vfs.get(s.notepadFileId) : null;
  }

  function notepadDocName(ctx) {
    var node = notepadNode(ctx);
    return node ? node.name : ctx.t("notepad.untitled");
  }

  function notepadTitle(ctx) {
    return (ctx.state.notepadDirty ? "*" : "") + notepadDocName(ctx) + " – " + ctx.t("app.notepad");
  }

  function saveNotepad(ctx, saveAs, after) {
    var s = ctx.state;
    var node = notepadNode(ctx);
    if (node && !saveAs) {
      node.content = s.notepadDraft;
      s.notepadDirty = false;
      ctx.emit("notepad.saved", { id: node.id, name: node.name });
      ctx.refreshApp("notepad");
      if (after) after();
      return;
    }
    showSaveAs(ctx, {
      title: ctx.t("saveAs.title"),
      initialFolder: node ? node.parentId : "documents",
      initialName: node ? node.name : ctx.t("notepad.defaultFileName"),
      extension: ".txt",
      typeLabel: ctx.t("saveAs.typeText"),
      onSave: function (folderId, name) {
        var existing = ctx.vfs.list(folderId).filter(function (n) { return n.type === "file" && ctx.I18n.lower(n.name) === ctx.I18n.lower(name); })[0];
        var target = existing || ctx.vfs.createFile(folderId, name, "text", s.notepadDraft);
        target.content = s.notepadDraft;
        s.notepadFileId = target.id;
        s.notepadDirty = false;
        ctx.emit("notepad.saved", { id: target.id, name: target.name, saveAs: true });
        ctx.refreshApp("notepad");
        if (after) after();
      }
    });
  }

  /*
    Simplified Windows 11 file dialog (Save As): navigation pane, folder contents, file name, file type.
    options: title, initialFolder, initialName, extension, typeLabel, onSave(folderId, name)
  */
  function showSaveAs(ctx, options) {
    var t = ctx.t;
    var h = ctx.h;
    var vfs = ctx.vfs;
    var folderId = vfs.get(options.initialFolder) ? options.initialFolder : "documents";

    var nameInput = h("input", { type: "text", value: options.initialName, aria: { label: t("saveAs.fileName") }, data: { ui: "save-as-name", selectStem: "1" }, autofocus: true });
    var crumb = h("div", { class: "fw-filedialog-crumb" });
    var listing = h("div", { class: "fw-filedialog-list", role: "list" });
    var pane = h("div", { class: "fw-filedialog-pane" });
    var error = h("p", { class: "fw-field-error", role: "alert", hidden: true });

    function draw() {
      crumb.replaceChildren(h("span", { html: ctx.nodeIcon(vfs.get(folderId), 16) }), h("span", { text: ctx.displayName(vfs.get(folderId)) }));
      pane.querySelectorAll("button").forEach(function (b) { b.classList.toggle("is-current", b.dataset.folderId === folderId); });
      listing.replaceChildren();
      var nodes = vfs.list(folderId);
      if (!nodes.length) listing.appendChild(h("p", { class: "fw-filedialog-empty", text: t("explorer.folderEmpty") }));
      nodes.forEach(function (node) {
        listing.appendChild(h("button", {
          type: "button",
          role: "listitem",
          class: "fw-filedialog-item" + (node.type === "folder" ? " is-folder" : ""),
          on: {
            click: function () { if (node.type === "file") nameInput.value = node.name; },
            dblclick: function () { if (node.type === "folder") { folderId = node.id; draw(); } }
          }
        }, [h("span", { html: ctx.nodeIcon(node, 16) }), h("span", { text: ctx.displayName(node) })]));
      });
    }

    ["documents", "pictures", "downloads", "onedrive"].concat(vfs.get("usb-drive") ? ["usb-drive"] : []).forEach(function (id) {
      pane.appendChild(h("button", {
        type: "button",
        data: { folderId: id },
        on: { click: function () { folderId = id; draw(); } }
      }, [h("span", { html: ctx.nodeIcon(vfs.get(id), 16) }), h("span", { text: ctx.displayName(vfs.get(id)) })]));
    });
    draw();

    function finalName() {
      var name = nameInput.value.trim();
      if (name && options.extension && name.toLowerCase().slice(-options.extension.length) !== options.extension) name += options.extension;
      return name;
    }

    ctx.showDialog({
      kind: "save-as",
      wide: true,
      className: "fw-filedialog",
      title: options.title,
      body: h("div", { class: "fw-filedialog-body" }, [
        h("div", { class: "fw-filedialog-browser" }, [pane, h("div", { class: "fw-filedialog-folder" }, [crumb, listing])]),
        h("label", { class: "fw-field fw-field-row" }, [h("span", { text: t("saveAs.fileName") }), nameInput]),
        h("label", { class: "fw-field fw-field-row" }, [h("span", { text: t("saveAs.fileType") }), h("select", { aria: { label: t("saveAs.fileType") } }, [h("option", { text: options.typeLabel })])]),
        error
      ]),
      buttons: [
        { label: t("common.save"), primary: true, ui: "save-as-confirm", validate: function () {
          var name = finalName();
          if (!name || /[\\/:*?"<>|]/.test(name)) {
            error.hidden = false;
            error.textContent = t("saveAs.invalidName");
            nameInput.setAttribute("aria-invalid", "true");
            nameInput.focus();
            return false;
          }
          return true;
        }, action: function () {
          var name = finalName();
          var exists = vfs.list(folderId).some(function (n) { return n.type === "file" && ctx.I18n.lower(n.name) === ctx.I18n.lower(name); });
          if (!exists) {
            options.onSave(folderId, name);
            return;
          }
          ctx.showDialog({
            icon: "warning",
            title: t("saveAs.replaceTitle"),
            message: t("saveAs.replaceText", { name: name }),
            buttons: [
              { label: t("common.yes"), primary: true, action: function () { options.onSave(folderId, name); } },
              // As in Windows, "No" has the focus so Enter never replaces a file by accident,
              // and "No" goes back to Save as so another name can be chosen.
              { label: t("common.no"), cancel: true, autofocus: true, ui: "replace-no", action: function () {
                showSaveAs(ctx, Object.assign({}, options, { initialFolder: folderId, initialName: name }));
              } }
            ]
          });
        } },
        { label: t("common.cancel"), cancel: true }
      ]
    });
  }

  /*
    Simplified Windows 11 Open dialog: pick a file from the practice computer's folders.
    options: title, initialFolder, onOpen(node)
  */
  function showOpenDialog(ctx, options) {
    var t = ctx.t;
    var h = ctx.h;
    var vfs = ctx.vfs;
    var folderId = vfs.get(options.initialFolder) ? options.initialFolder : "documents";
    var chosen = null;

    var nameInput = h("input", { type: "text", readonly: true, aria: { label: t("saveAs.fileName") } });
    var crumb = h("div", { class: "fw-filedialog-crumb" });
    var listing = h("div", { class: "fw-filedialog-list", role: "listbox", aria: { label: t("openDialog.files") } });
    var pane = h("div", { class: "fw-filedialog-pane" });
    var openButtonRef = {};

    function draw() {
      crumb.replaceChildren(h("span", { html: ctx.nodeIcon(vfs.get(folderId), 16) }), h("span", { text: ctx.displayName(vfs.get(folderId)) }));
      pane.querySelectorAll("button").forEach(function (b) { b.classList.toggle("is-current", b.dataset.folderId === folderId); });
      listing.replaceChildren();
      var nodes = vfs.list(folderId);
      if (!nodes.length) listing.appendChild(h("p", { class: "fw-filedialog-empty", text: t("explorer.folderEmpty") }));
      nodes.forEach(function (node) {
        var item = h("button", {
          type: "button",
          role: "option",
          aria: { selected: chosen === node ? "true" : "false" },
          class: "fw-filedialog-item" + (node.type === "folder" ? " is-folder" : "") + (chosen === node ? " is-selected" : ""),
          data: { ui: "open-item" },
          on: {
            click: function () {
              if (node.type === "folder") return;
              chosen = node;
              nameInput.value = node.name;
              draw();
            },
            dblclick: function () {
              if (node.type === "folder") { folderId = node.id; chosen = null; nameInput.value = ""; draw(); return; }
              chosen = node;
              ctx.closeDialog();
              options.onOpen(node);
            }
          }
        }, [h("span", { html: ctx.nodeIcon(node, 16) }), h("span", { text: ctx.displayName(node) })]);
        listing.appendChild(item);
      });
    }

    ["documents", "pictures", "downloads", "onedrive"].concat(vfs.get("usb-drive") ? ["usb-drive"] : []).forEach(function (id) {
      pane.appendChild(h("button", {
        type: "button",
        data: { folderId: id },
        on: { click: function () { folderId = id; chosen = null; nameInput.value = ""; draw(); } }
      }, [h("span", { html: ctx.nodeIcon(vfs.get(id), 16) }), h("span", { text: ctx.displayName(vfs.get(id)) })]));
    });
    draw();

    var error = h("p", { class: "fw-field-error", role: "alert", hidden: true });
    ctx.showDialog({
      kind: "open",
      wide: true,
      className: "fw-filedialog",
      title: options.title || t("openDialog.title"),
      body: h("div", { class: "fw-filedialog-body" }, [
        h("div", { class: "fw-filedialog-browser" }, [pane, h("div", { class: "fw-filedialog-folder" }, [crumb, listing])]),
        h("label", { class: "fw-field fw-field-row" }, [h("span", { text: t("saveAs.fileName") }), nameInput]),
        error
      ]),
      buttons: [
        { label: t("openDialog.open"), primary: true, ui: "open-confirm", validate: function () {
          if (chosen) return true;
          error.hidden = false;
          error.textContent = t("openDialog.chooseFile");
          return false;
        }, action: function () { options.onOpen(chosen); } },
        { label: t("common.cancel"), cancel: true }
      ]
    });
  }

  // File > Open (Ctrl+O): the shared Open dialog; unsaved text is offered a save first, as in Windows.
  function openNotepadDocument(ctx) {
    var s = ctx.state;
    function choose() {
      showOpenDialog(ctx, {
        initialFolder: notepadNode(ctx) ? notepadNode(ctx).parentId : "documents",
        onOpen: function (node) {
          s.notepadFileId = node.id;
          s.notepadDraft = node.content || "";
          s.notepadDirty = false;
          ctx.emit("notepad.opened", { id: node.id, name: node.name });
          ctx.refreshApp("notepad");
        }
      });
    }
    if (s.notepadDirty) confirmUnsaved(ctx, choose, null);
    else choose();
  }

  function newNotepadDocument(ctx) {
    var s = ctx.state;
    function reset() {
      s.notepadFileId = null;
      s.notepadDraft = "";
      s.notepadDirty = false;
      ctx.emit("notepad.new", {});
      ctx.refreshApp("notepad");
    }
    if (s.notepadDirty) confirmUnsaved(ctx, reset, null);
    else reset();
  }

  function confirmUnsaved(ctx, afterDecision, windowId) {
    var t = ctx.t;
    ctx.emit("dialog.unsavedOpened", { appId: "notepad", windowId: windowId });
    ctx.showDialog({
      kind: "unsaved-notepad",
      title: t("app.notepad"),
      message: t("notepad.unsavedQuestion", { name: notepadDocName(ctx) }),
      buttons: [
        { label: t("common.save"), primary: true, ui: "unsaved-save", action: function () {
          ctx.emit("dialog.unsavedChoice", { choice: notepadNode(ctx) ? "save" : "save-as-required" });
          saveNotepad(ctx, false, afterDecision);
        } },
        { label: t("notepad.dontSave"), ui: "unsaved-discard", action: function () {
          ctx.state.notepadDirty = false;
          ctx.emit("dialog.unsavedChoice", { choice: "discard" });
          afterDecision();
        } },
        { label: t("common.cancel"), cancel: true, ui: "unsaved-cancel", action: function () {
          ctx.emit("dialog.unsavedChoice", { choice: "cancel" });
        } }
      ]
    });
  }

  function confirmNotepadClose(ctx, windowId) {
    confirmUnsaved(ctx, function () { ctx.forceCloseWindow(windowId); }, windowId);
  }

  function renderNotepad(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ctx.state;
    var root = h("div", { class: "notepad" });

    var area = h("textarea", {
      class: "notepad-text",
      spellcheck: false,
      aria: { label: t("notepad.textArea", { name: notepadDocName(ctx) }) },
      data: { ui: "notepad-text" },
      style: { fontSize: (14 * s.notepadZoom / 100) + "px" }
    });
    area.value = s.notepadDraft || "";

    function exec(command) {
      area.focus();
      try { document.execCommand(command); } catch (error) { /* older browsers: ignore */ }
    }

    function menuButton(key, items) {
      return h("button", {
        type: "button",
        class: "notepad-menu-button",
        aria: { haspopup: "menu" },
        text: t(key),
        on: { click: function (e) {
          e.stopPropagation();
          var rect = e.currentTarget.getBoundingClientRect();
          ctx.openMenu({ kind: "app-menu", x: rect.left, y: rect.bottom + 2, items: items() });
        } }
      });
    }

    var menubar = h("div", { class: "notepad-menubar", role: "menubar", data: { ui: "notepad-menubar" } }, [
      menuButton("notepad.menu.file", function () {
        return [
          { label: t("notepad.new"), shortcut: "Ctrl+N", action: function () { newNotepadDocument(ctx); } },
          { label: t("notepad.open"), shortcut: "Ctrl+O", ui: "notepad-open", action: function () { openNotepadDocument(ctx); } },
          "sep",
          { label: t("common.save"), shortcut: "Ctrl+S", ui: "notepad-save", action: function () { saveNotepad(ctx, false); } },
          { label: t("notepad.saveAs"), shortcut: "Ctrl+Shift+S", ui: "notepad-save-as", action: function () { saveNotepad(ctx, true); } },
          "sep",
          { label: t("notepad.closeWindow"), action: function () { var w = ctx.findWindow("notepad"); if (w) ctx.closeWindow(w.id); } }
        ];
      }),
      menuButton("notepad.menu.edit", function () {
        return [
          { label: t("notepad.undo"), shortcut: "Ctrl+Z", action: function () { exec("undo"); ctx.emit("notepad.undo", {}); } },
          { label: t("notepad.redo"), shortcut: "Ctrl+Y", action: function () { exec("redo"); ctx.emit("notepad.redo", {}); } },
          "sep",
          { label: t("explorer.cut"), shortcut: "Ctrl+X", action: function () { exec("cut"); } },
          { label: t("explorer.copy"), shortcut: "Ctrl+C", action: function () { exec("copy"); } },
          { label: t("explorer.paste"), shortcut: "Ctrl+V", action: function () { area.focus(); } },
          "sep",
          { label: t("notepad.selectAll"), shortcut: "Ctrl+A", action: function () { area.focus(); area.select(); } },
          { label: t("notepad.timeDate"), shortcut: "F5", action: function () { insertDate(); } }
        ];
      }),
      menuButton("notepad.menu.view", function () {
        return [
          { label: t("notepad.zoomIn"), shortcut: "Ctrl+Plus", action: function () { zoom(10); } },
          { label: t("notepad.zoomOut"), shortcut: "Ctrl+Minus", action: function () { zoom(-10); } },
          { label: t("notepad.zoomReset"), shortcut: "Ctrl+0", action: function () { s.notepadZoom = 100; ctx.refreshApp("notepad"); } }
        ];
      })
    ]);

    function zoom(delta) {
      s.notepadZoom = Math.max(50, Math.min(300, s.notepadZoom + delta));
      ctx.refreshApp("notepad");
    }

    function insertDate() {
      var now = new Date();
      var text = ctx.formatTime(now) + " " + ctx.formatDate(now);
      area.setRangeText(text, area.selectionStart, area.selectionEnd, "end");
      area.dispatchEvent(new Event("input"));
    }

    var position = h("span", { text: "" });
    function updatePosition() {
      var before = area.value.slice(0, area.selectionStart);
      var lines = before.split("\n");
      position.textContent = t("notepad.position", { line: lines.length, column: lines[lines.length - 1].length + 1 });
    }
    updatePosition();

    var status = h("div", { class: "notepad-status" }, [
      position,
      h("span", { text: t("notepad.characters", { count: (s.notepadDraft || "").length }) }),
      h("span", { text: s.notepadZoom + " %" }),
      h("span", { text: "Windows (CRLF)" }),
      h("span", { text: "UTF-8" })
    ]);

    area.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    area.addEventListener("input", function () {
      var wasDirty = s.notepadDirty;
      s.notepadDraft = area.value;
      s.notepadDirty = true;
      status.children[1].textContent = t("notepad.characters", { count: area.value.length });
      updatePosition();
      ctx.emit("notepad.input", { length: area.value.length });
      if (!wasDirty) {
        var tab = document.querySelector(".fw-app-notepad .fw-titlebar-tab");
        if (tab) tab.classList.add("is-dirty");
        var win = document.querySelector(".fw-app-notepad");
        if (win) win.setAttribute("aria-label", notepadTitle(ctx));
      }
    });
    area.addEventListener("keyup", updatePosition);
    area.addEventListener("click", updatePosition);
    area.addEventListener("keydown", function (e) {
      var key = e.key.toLowerCase();
      if (e.key === "F5") { e.preventDefault(); insertDate(); return; }
      if (!e.ctrlKey) return;
      if (key === "z") ctx.emit("notepad.undo", {});
      if (key === "y") ctx.emit("notepad.redo", {});
      if (key === "s") { e.preventDefault(); saveNotepad(ctx, e.shiftKey); }
      if (key === "n") { e.preventDefault(); newNotepadDocument(ctx); }
      if (key === "o") { e.preventDefault(); openNotepadDocument(ctx); }
      if (key === "+" || key === "=") { e.preventDefault(); zoom(10); }
      if (key === "-") { e.preventDefault(); zoom(-10); }
      if (key === "0") { e.preventDefault(); s.notepadZoom = 100; ctx.refreshApp("notepad"); }
    });
    area.addEventListener("paste", function (e) {
      var text = "";
      try { text = e.clipboardData ? e.clipboardData.getData("text/plain") : ""; } catch (error) { text = ""; }
      ctx.emit("notepad.pasted", { text: text });
    });

    root.appendChild(menubar);
    root.appendChild(area);
    root.appendChild(status);
    return root;
  }

  /* =================================================================
     Photos
     ================================================================= */

  function pictureNodes(ctx) {
    var current = ctx.state.photoFileId ? ctx.vfs.get(ctx.state.photoFileId) : null;
    var folder = current ? current.parentId : "pictures";
    return ctx.vfs.list(folder).filter(function (node) { return node.type === "file" && node.fileType === "image"; });
  }

  function movePhoto(ctx, direction) {
    var images = pictureNodes(ctx);
    if (!images.length) return;
    var index = images.findIndex(function (node) { return node.id === ctx.state.photoFileId; });
    if (index < 0) index = 0;
    index = (index + direction + images.length) % images.length;
    ctx.state.photoFileId = images[index].id;
    ctx.state.photoZoom = 1;
    ctx.emit("photos.changed", { id: ctx.state.photoFileId });
    ctx.refreshApp("photos");
  }

  // A deterministic painted "photo" per file so each picture looks different.
  function photoArt(ctx, node, h) {
    var seed = 0;
    String(node ? node.name : "").split("").forEach(function (ch) { seed = (seed * 31 + ch.charCodeAt(0)) % 997; });
    var palettes = [
      ["#7cb7e8", "#f7d488", "#5f9e6e", "#3f7a52"],
      ["#f6b48f", "#fbe3a0", "#3c6e91", "#24506d"],
      ["#9fc8ef", "#ffffff", "#8bbf7a", "#5d8f4f"],
      ["#c5b4e3", "#fde2b0", "#6f8fb8", "#41618f"]
    ];
    var p = palettes[seed % palettes.length];
    return h("div", {
      class: "photo-art",
      role: "img",
      aria: { label: node ? node.name : "" },
      style: { background: "linear-gradient(180deg," + p[0] + " 0%," + p[1] + " 58%," + p[2] + " 58%," + p[3] + " 100%)" }
    }, [h("span", { class: "photo-art-sun", style: { left: (20 + seed % 55) + "%" } })]);
  }

  function renderPhotos(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ctx.state;
    var images = pictureNodes(ctx);
    if (!s.photoFileId && images.length) s.photoFileId = images[0].id;
    var node = s.photoFileId ? ctx.vfs.get(s.photoFileId) : null;

    var root = h("div", { class: "photos" });
    root.appendChild(h("div", { class: "photos-toolbar" }, [
      h("strong", { class: "photos-name", text: node ? node.name : t("photos.empty") }),
      h("span", { class: "photos-spacer" }),
      h("button", { type: "button", class: "fw-icon-button", title: t("photos.zoomOut"), aria: { label: t("photos.zoomOut") }, html: ctx.glyph("zoom-out", 16), on: { click: function () {
        s.photoZoom = Math.max(0.5, s.photoZoom - 0.25);
        ctx.emit("photos.zoom", { zoom: s.photoZoom });
        ctx.refreshApp("photos");
      } } }),
      h("span", { class: "photos-zoom", text: Math.round(s.photoZoom * 100) + " %" }),
      h("button", { type: "button", class: "fw-icon-button", title: t("photos.zoomIn"), aria: { label: t("photos.zoomIn") }, html: ctx.glyph("zoom", 16), on: { click: function () {
        s.photoZoom = Math.min(3, s.photoZoom + 0.25);
        ctx.emit("photos.zoom", { zoom: s.photoZoom });
        ctx.refreshApp("photos");
      } } })
    ]));

    var stage = h("div", { class: "photos-stage" });
    if (node) {
      var art = photoArt(ctx, node, h);
      art.style.transform = "scale(" + s.photoZoom + ")";
      stage.appendChild(art);
    } else {
      stage.appendChild(h("p", { class: "photos-empty", text: t("photos.empty") }));
    }
    if (images.length > 1) {
      stage.appendChild(h("button", { type: "button", class: "photos-nav is-prev", aria: { label: t("photos.previous") }, html: ctx.glyph("chevron-left", 20), on: { click: function () { movePhoto(ctx, -1); } } }));
      stage.appendChild(h("button", { type: "button", class: "photos-nav is-next", aria: { label: t("photos.next") }, html: ctx.glyph("chevron-right", 20), on: { click: function () { movePhoto(ctx, 1); } } }));
    }
    root.appendChild(stage);

    var strip = h("div", { class: "photos-strip" });
    images.forEach(function (image) {
      var thumb = h("button", {
        type: "button",
        class: "photos-thumb" + (image.id === s.photoFileId ? " is-current" : ""),
        aria: { label: image.name, current: image.id === s.photoFileId ? "true" : null },
        on: { click: function () {
          s.photoFileId = image.id;
          s.photoZoom = 1;
          ctx.emit("photos.changed", { id: image.id });
          ctx.refreshApp("photos");
        } }
      }, [photoArt(ctx, image, h)]);
      strip.appendChild(thumb);
    });
    root.appendChild(strip);

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") movePhoto(ctx, 1);
      if (e.key === "ArrowLeft") movePhoto(ctx, -1);
    });
    return root;
  }

  window.DatorskolanBasicApps = {
    renderCalculator: renderCalculator,
    calculatorInput: calculatorInput,
    renderNotepad: renderNotepad,
    notepadTitle: notepadTitle,
    notepadDocName: notepadDocName,
    saveNotepad: saveNotepad,
    showSaveAs: showSaveAs,
    showOpenDialog: showOpenDialog,
    confirmNotepadClose: confirmNotepadClose,
    renderPhotos: renderPhotos,
    photoArt: photoArt
  };
})();
