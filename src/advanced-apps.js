/*
  Mail app (a generic Windows mail client) and the keyboard practice surface.
*/
(function () {
  "use strict";

  /* =================================================================
     Keyboard practice
     ================================================================= */

  function renderKeyboard(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var lab = ctx.state.keyboardLab;
    var mode = lab.mode || "letters";

    var root = h("div", { class: "practice keyboard-lab keyboard-mode-" + mode });
    var badge = h("span", { class: "practice-badge" + (lab.completed ? " is-done" : ""), text: lab.completed ? t("practice.done") : t("practice.inProgress") });
    root.appendChild(h("header", { class: "practice-head" }, [h("h2", { text: t("keyboard.mode." + mode + ".title") }), badge]));
    root.appendChild(h("p", { class: "practice-instruction", text: t("keyboard.mode." + mode + ".text") }));

    var stage = h("div", { class: "keyboard-stage", data: { ui: "keyboard-stage" } });
    root.appendChild(stage);

    function complete(type, payload) {
      if (lab.completed) return;
      lab.completed = true;
      badge.textContent = t("practice.done");
      badge.classList.add("is-done");
      ctx.emit(type, payload || {});
    }

    function focusLater(node) { window.setTimeout(function () { if (document.body.contains(node)) node.focus(); }, 0); }

    function checklist(keys) {
      var list = h("ul", { class: "practice-checklist" });
      keys.forEach(function (entry) { list.appendChild(h("li", { data: { k: entry[0] }, text: entry[1] })); });
      stage.appendChild(list);
      return function mark(key) {
        var item = list.querySelector("[data-k='" + key + "']");
        if (item) item.classList.add("is-done");
      };
    }

    function textInput(label, placeholder) {
      var input = h("input", { type: "text", class: "keyboard-input", autocomplete: "off", spellcheck: false, placeholder: placeholder || "", aria: { label: label } });
      stage.appendChild(input);
      focusLater(input);
      return input;
    }

    if (mode === "letters") {
      var word = t("keyboard.letters.word");
      var letters = textInput(t("keyboard.mode.letters.title"), word);
      letters.addEventListener("input", function () {
        if (ctx.I18n.lower(letters.value) === word) complete("keyboard.letters.complete", { value: letters.value });
      });
    }

    if (mode === "numbers") {
      var numbers = textInput(t("keyboard.mode.numbers.title"), "12345");
      numbers.inputMode = "numeric";
      numbers.addEventListener("input", function () { if (numbers.value === "12345") complete("keyboard.numbers.complete", { value: numbers.value }); });
    }

    if (mode === "editing") {
      var editor = h("textarea", { class: "keyboard-textarea", aria: { label: t("keyboard.mode.editing.title") } });
      editor.value = t("keyboard.editing.start");
      stage.appendChild(editor);
      var markEdit = checklist([["space", t("key.space")], ["backspace", "Backspace"], ["delete", t("key.delete")], ["enter", t("key.enter")]]);
      var flags = {};
      editor.addEventListener("keydown", function (e) {
        if (e.key === " ") flags.space = true;
        if (e.key === "Backspace") flags.backspace = true;
        if (e.key === "Delete") flags.delete = true;
        if (e.key === "Enter") flags.enter = true;
        Object.keys(flags).forEach(markEdit);
        if (flags.space && flags.backspace && flags.delete && flags.enter) complete("keyboard.editing.complete", {});
      });
      focusLater(editor);
    }

    if (mode === "shift-caps") {
      var out = h("p", { class: "keyboard-output", role: "status", aria: { live: "polite" }, text: t("keyboard.waiting") });
      var capsField = h("input", { type: "text", class: "keyboard-input", aria: { label: t("keyboard.mode.shift-caps.title") } });
      stage.appendChild(capsField);
      stage.appendChild(out);
      var shiftOk = false;
      var capsOk = false;
      capsField.addEventListener("keydown", function (e) {
        if (e.shiftKey && /^\p{L}$/u.test(e.key) && e.key === e.key.toUpperCase()) shiftOk = true;
        if (e.key === "CapsLock" || (e.getModifierState && e.getModifierState("CapsLock") && /^\p{L}$/u.test(e.key))) capsOk = true;
        out.textContent = (shiftOk ? "Shift ✓" : "Shift …") + "   ·   " + (capsOk ? "Caps Lock ✓" : "Caps Lock …");
        if (shiftOk && capsOk) complete("keyboard.shiftcaps.complete", {});
      });
      focusLater(capsField);
    }

    if (mode === "arrows") {
      var field = h("div", { class: "keyboard-arrow-field", tabindex: "0", aria: { label: t("keyboard.mode.arrows.title") } });
      var token = h("span", { class: "keyboard-arrow-token", aria: { hidden: "true" } });
      field.appendChild(token);
      stage.appendChild(field);
      var markArrow = checklist([["up", "↑"], ["down", "↓"], ["left", "←"], ["right", "→"]]);
      var pos = { x: 2, y: 2 };
      var seen = {};
      field.addEventListener("keydown", function (e) {
        var map = { ArrowUp: ["up", 0, -1], ArrowDown: ["down", 0, 1], ArrowLeft: ["left", -1, 0], ArrowRight: ["right", 1, 0] };
        var move = map[e.key];
        if (!move) return;
        e.preventDefault();
        pos.x = Math.max(0, Math.min(4, pos.x + move[1]));
        pos.y = Math.max(0, Math.min(4, pos.y + move[2]));
        token.style.left = (pos.x * 20 + 10) + "%";
        token.style.top = (pos.y * 20 + 10) + "%";
        seen[move[0]] = true;
        markArrow(move[0]);
        if (seen.up && seen.down && seen.left && seen.right) complete("keyboard.arrows.complete", {});
      });
      focusLater(field);
    }

    if (mode === "tab-esc") {
      var row = h("div", { class: "keyboard-focus-row" }, [
        h("button", { type: "button", class: "fw-button", text: t("keyboard.tab.first") }),
        h("button", { type: "button", class: "fw-button", text: t("keyboard.tab.second") }),
        h("button", { type: "button", class: "fw-button", text: t("keyboard.tab.third") })
      ]);
      var tip = h("div", { class: "keyboard-tip", role: "note", text: t("keyboard.tab.escTip") });
      stage.appendChild(row);
      stage.appendChild(tip);
      var markTab = checklist([["tab", "Tab"], ["esc", "Esc"]]);
      var tabSeen = false;
      var escSeen = false;
      stage.addEventListener("keydown", function (e) {
        if (e.key === "Tab") { tabSeen = true; markTab("tab"); }
        if (e.key === "Escape") { e.stopPropagation(); escSeen = true; tip.hidden = true; markTab("esc"); }
        if (tabSeen && escSeen) complete("keyboard.tabesc.complete", {});
      });
      focusLater(row.firstChild);
    }

    if (mode === "modifiers") {
      var area = h("div", { class: "keyboard-press-area", tabindex: "0", text: t("keyboard.modifiers.area") });
      stage.appendChild(area);
      var markMod = checklist([["ctrl", "Ctrl"], ["alt", "Alt"]]);
      var mods = {};
      area.addEventListener("keydown", function (e) {
        if (e.key === "Control") mods.ctrl = true;
        if (e.key === "Alt") { mods.alt = true; e.preventDefault(); }
        Object.keys(mods).forEach(markMod);
        if (mods.ctrl && mods.alt) complete("keyboard.modifiers.complete", {});
      });
      focusLater(area);
    }

    if (mode === "shortcuts") {
      var text = h("textarea", { class: "keyboard-textarea", aria: { label: t("keyboard.mode.shortcuts.title") } });
      text.value = t("keyboard.shortcuts.text");
      stage.appendChild(text);
      var markShort = checklist([["a", "Ctrl+A"], ["c", "Ctrl+C"], ["v", "Ctrl+V"]]);
      var shortcuts = {};
      text.addEventListener("keydown", function (e) {
        if (!e.ctrlKey) return;
        var k = e.key.toLowerCase();
        if (k === "a") shortcuts.a = true;
        if (k === "c") { shortcuts.c = true; lab.clipboard = text.value.substring(text.selectionStart, text.selectionEnd) || text.value; }
        if (k === "v") shortcuts.v = true;
        Object.keys(shortcuts).forEach(markShort);
        if (shortcuts.a && shortcuts.c && shortcuts.v) complete("keyboard.shortcuts.complete", {});
      });
      focusLater(text);
    }

    if (mode === "special") {
      var special = textInput(t("keyboard.mode.special.title"), "@ ! ? . ,");
      special.addEventListener("input", function () {
        var v = special.value;
        if (["@", "!", "?", ".", ","].every(function (c) { return v.indexOf(c) >= 0; })) complete("keyboard.special.complete", {});
      });
    }

    if (mode === "final") {
      var goal = t("keyboard.final.text");
      stage.appendChild(h("div", { class: "keyboard-target" }, [h("span", { text: t("keyboard.final.typeExactly") }), h("strong", { text: goal })]));
      var final = h("textarea", { class: "keyboard-textarea", aria: { label: t("keyboard.final.typeLabel", { text: goal }) } });
      stage.appendChild(final);
      var list = h("ol", { class: "practice-checklist" });
      var steps = { text: false, enter: false, back: false, arrow: false, shortcut: false };
      ["text", "enter", "back", "arrow", "shortcut"].forEach(function (key) {
        list.appendChild(h("li", { data: { k: key }, text: t("keyboard.final.step." + key, { text: goal }) }));
      });
      stage.appendChild(list);
      function update() {
        Object.keys(steps).forEach(function (key) { list.querySelector("[data-k='" + key + "']").classList.toggle("is-done", steps[key]); });
        if (steps.text && steps.enter && steps.back && steps.arrow && steps.shortcut) {
          complete("keyboard.final.complete", { text: goal, enter: true, backspace: true, arrow: true, selectAll: true });
        }
      }
      final.addEventListener("keydown", function (e) {
        if (e.key === "Enter") steps.enter = true;
        if (e.key === "Backspace") steps.back = true;
        if (/^Arrow/.test(e.key)) steps.arrow = true;
        if (e.ctrlKey && e.key.toLowerCase() === "a") steps.shortcut = true;
        update();
      });
      final.addEventListener("input", function () {
        if (final.value.replace(/\r/g, "").split("\n")[0].trim() === goal) steps.text = true;
        update();
      });
      focusLater(final);
    }

    return root;
  }

  /* =================================================================
     Mail
     ================================================================= */

  function ensureMailState(ctx) {
    var state = ctx.state;
    if (!state.mail) {
      var t = ctx.t;
      state.mail = {
        folder: "inbox",
        selectedId: null,
        composing: null,
        sent: [],
        inbox: [
          { id: "m1", from: t("mail.m1.from"), address: "anna@example.com", subject: t("mail.m1.subject"), body: t("mail.m1.body"), attachment: t("mail.m1.attachment"), safe: true, time: "09:12", unread: true },
          { id: "m2", from: t("mail.m2.from"), address: "security@konto-verify.example.net", subject: t("mail.m2.subject"), body: t("mail.m2.body"), attachment: null, safe: false, time: "08:47", unread: true },
          { id: "m3", from: t("mail.m3.from"), address: "erik@example.com", subject: t("mail.m3.subject"), body: t("mail.m3.body"), attachment: null, safe: true, time: t("mail.yesterday"), unread: false }
        ]
      };
    }
    return state.mail;
  }

  function renderMail(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensureMailState(ctx);
    var root = h("div", { class: "mail" });

    function refresh() { ctx.refreshApp("mail"); }

    /* Folder pane */
    var folders = h("nav", { class: "mail-folders", aria: { label: t("mail.folders") } }, [
      h("button", { type: "button", class: "fw-button fw-button-accent mail-new", data: { ui: "mail-new" }, on: { click: function () {
        s.composing = { mode: "new", to: "", subject: "", body: "", attachment: null };
        ctx.emit("mail.composeOpened", {});
        refresh();
      } } }, [h("span", { html: ctx.glyph("pencil", 16) }), h("span", { text: t("mail.newMail") })])
    ]);
    [["inbox", "mail.inbox", s.inbox.filter(function (m) { return m.unread; }).length], ["sent", "mail.sentFolder", 0]].forEach(function (entry) {
      folders.appendChild(h("button", {
        type: "button",
        class: "mail-folder" + (s.folder === entry[0] ? " is-current" : ""),
        aria: { current: s.folder === entry[0] ? "page" : null },
        on: { click: function () { s.folder = entry[0]; s.selectedId = null; s.composing = null; refresh(); } }
      }, [h("span", { html: entry[0] === "inbox" ? ctx.glyph("mail", 16) : ctx.glyph("send", 16) }), h("span", { text: t(entry[1]) }), entry[2] ? h("span", { class: "mail-count", text: String(entry[2]) }) : null]));
    });
    root.appendChild(folders);

    /* Message list */
    var list = h("div", { class: "mail-list", role: "listbox", aria: { label: t(s.folder === "inbox" ? "mail.inbox" : "mail.sentFolder") } });
    var messages = s.folder === "inbox" ? s.inbox : s.sent;
    if (!messages.length) list.appendChild(h("p", { class: "mail-empty-list", text: t("mail.folderEmpty") }));
    messages.forEach(function (message) {
      var selected = s.selectedId === message.id;
      list.appendChild(h("button", {
        type: "button",
        role: "option",
        aria: { selected: selected ? "true" : "false" },
        class: "mail-item" + (selected ? " is-selected" : "") + (message.unread ? " is-unread" : ""),
        data: { ui: "mail-item-" + message.id },
        on: { click: function () {
          s.selectedId = message.id;
          s.composing = null;
          message.unread = false;
          if (s.folder === "inbox") ctx.emit("mail.opened", { id: message.id, safe: message.safe });
          refresh();
        } }
      }, [
        h("span", { class: "fw-avatar", text: (message.from || message.to || "?").charAt(0).toUpperCase() }),
        h("span", { class: "mail-item-text" }, [
          h("span", { class: "mail-item-top" }, [h("strong", { text: message.from || message.to }), h("small", { text: message.time })]),
          h("span", { class: "mail-item-subject", text: message.subject }),
          h("small", { class: "mail-item-preview", text: message.body })
        ]),
        message.attachment ? h("span", { class: "mail-item-clip", title: t("mail.hasAttachment"), html: ctx.glyph("paperclip", 14) }) : null
      ]));
    });
    root.appendChild(list);

    /* Reading pane / composer */
    var pane = h("section", { class: "mail-pane" });
    if (s.composing) pane.appendChild(composer(ctx, s, refresh));
    else {
      var message = messages.filter(function (m) { return m.id === s.selectedId; })[0];
      if (!message) {
        pane.appendChild(h("div", { class: "mail-placeholder" }, [h("span", { html: ctx.icon("mail", 48) }), h("p", { text: t("mail.selectMessage") })]));
      } else {
        pane.appendChild(reader(ctx, s, message, refresh));
      }
    }
    root.appendChild(pane);
    return root;
  }

  function reader(ctx, s, message, refresh) {
    var t = ctx.t;
    var h = ctx.h;
    var article = h("article", { class: "mail-reader" });

    var actions = h("div", { class: "mail-reader-actions", role: "toolbar", aria: { label: t("mail.actions") } });
    if (s.folder === "inbox") {
      actions.appendChild(h("button", { type: "button", class: "fw-command", data: { ui: "mail-reply" }, on: { click: function () {
        s.composing = { mode: "reply", to: message.address, subject: t("mail.replyPrefix") + message.subject, body: "", attachment: null, source: message.id };
        refresh();
      } } }, [h("span", { class: "fw-command-icon", html: ctx.glyph("reply", 16) }), h("span", { class: "fw-command-label", text: t("mail.reply") })]));
      actions.appendChild(h("button", { type: "button", class: "fw-command", data: { ui: "mail-forward" }, on: { click: function () {
        s.composing = { mode: "forward", to: "", subject: t("mail.forwardPrefix") + message.subject, body: t("mail.forwardedHeader", { from: message.from }) + "\n\n" + message.body, attachment: null, source: message.id };
        ctx.emit("mail.forwardStarted", { id: message.id });
        refresh();
      } } }, [h("span", { class: "fw-command-icon", html: ctx.glyph("forward", 16) }), h("span", { class: "fw-command-label", text: t("mail.forward") })]));
      actions.appendChild(h("button", { type: "button", class: "fw-command", data: { ui: "mail-report" }, disabled: !!message.reported, on: { click: function () {
        ctx.showDialog({
          icon: "warning",
          title: t("mail.reportTitle"),
          message: t("mail.reportText", { from: message.address }),
          buttons: [
            { label: t("mail.reportConfirm"), primary: true, ui: "mail-report-confirm", action: function () {
              message.reported = true;
              if (!message.safe) ctx.emit("mail.phishingIdentified", { id: message.id });
              else ctx.emit("mail.reportedSafeMessage", { id: message.id });
              s.inbox = s.inbox.filter(function (m) { return m.id !== message.id; });
              s.selectedId = null;
              ctx.toast(t("app.mail"), t("mail.reported"), "mail");
              refresh();
            } },
            { label: t("common.cancel"), cancel: true }
          ]
        });
      } } }, [h("span", { class: "fw-command-icon", html: ctx.glyph("flag", 16) }), h("span", { class: "fw-command-label", text: t("mail.report") })]));
    }
    article.appendChild(actions);

    article.appendChild(h("h2", { class: "mail-subject", text: message.subject }));
    article.appendChild(h("div", { class: "mail-from" }, [
      h("span", { class: "fw-avatar is-large", text: (message.from || message.to || "?").charAt(0).toUpperCase() }),
      h("div", {}, [
        h("strong", { text: message.from ? message.from + " <" + message.address + ">" : t("mail.toLabel") + " " + message.to }),
        h("small", { text: message.time })
      ])
    ]));

    if (!message.safe) {
      article.appendChild(h("p", { class: "mail-warning", role: "note" }, [
        h("span", { html: ctx.glyph("warning", 16) }),
        h("span", { text: t("mail.externalWarning") })
      ]));
    }

    article.appendChild(h("div", { class: "mail-body" }, message.body.split("\n").map(function (line) { return h("p", { text: line }); })));

    if (message.attachment) {
      var downloaded = !!message.downloadedId && !!ctx.vfs.get(message.downloadedId);
      article.appendChild(h("div", { class: "mail-attachment-card" }, [
        h("span", { html: ctx.icon("image-file", 32) }),
        h("span", {}, [h("strong", { text: message.attachment }), h("small", { text: t("mail.attachmentSize") })]),
        h("button", {
          type: "button",
          class: "fw-button",
          data: { ui: "mail-download" },
          text: downloaded ? t("mail.downloaded") : t("mail.download"),
          disabled: downloaded,
          on: { click: function () {
            var node = ctx.vfs.createFile("downloads", message.attachment, "image", "");
            message.downloadedId = node.id;
            ctx.emit("mail.attachmentDownloaded", { name: node.name, id: node.id });
            ctx.toast(t("app.mail"), t("mail.savedTo", { name: node.name, folder: t("vfs.downloads") }), "download");
            refresh();
          } }
        })
      ]));
    }
    return article;
  }

  function composer(ctx, s, refresh) {
    var t = ctx.t;
    var h = ctx.h;
    var draft = s.composing;
    var form = h("form", { class: "mail-compose", novalidate: true, on: { submit: function (e) { e.preventDefault(); } } });

    var to = h("input", { type: "email", id: "mail-to", value: draft.to, autocomplete: "off", data: { ui: "mail-to" } });
    var subject = h("input", { type: "text", id: "mail-subject", value: draft.subject, data: { ui: "mail-subject" } });
    var body = h("textarea", { id: "mail-body", aria: { label: t("mail.body") }, data: { ui: "mail-body" } });
    body.value = draft.body;
    var error = h("p", { class: "fw-field-error", role: "alert" });

    [to, subject, body].forEach(function (field) {
      field.addEventListener("input", function () {
        draft.to = to.value;
        draft.subject = subject.value;
        draft.body = body.value;
      });
    });

    var toolbar = h("div", { class: "mail-compose-toolbar", role: "toolbar", aria: { label: t("mail.actions") } }, [
      h("button", { type: "submit", class: "fw-button fw-button-accent", data: { ui: "mail-send" }, on: { click: send } }, [h("span", { html: ctx.glyph("send", 16) }), h("span", { text: t("mail.send") })]),
      h("button", { type: "button", class: "fw-command", data: { ui: "mail-attach" }, on: { click: function () {
        window.DatorskolanBasicApps.showOpenDialog(ctx, {
          title: t("mail.attachTitle"),
          initialFolder: "downloads",
          onOpen: function (node) {
            draft.attachment = node.name;
            ctx.emit("mail.attachmentAdded", { name: node.name });
            refresh();
          }
        });
      } } }, [h("span", { class: "fw-command-icon", html: ctx.glyph("paperclip", 16) }), h("span", { class: "fw-command-label", text: t("mail.attach") })]),
      h("button", { type: "button", class: "fw-command", on: { click: function () { s.composing = null; refresh(); } } }, [h("span", { class: "fw-command-icon", html: ctx.icon("delete", 16) }), h("span", { class: "fw-command-label", text: t("mail.discard") })])
    ]);
    form.appendChild(toolbar);

    form.appendChild(h("div", { class: "mail-field" }, [h("label", { for: "mail-to", text: t("mail.toLabel") }), to]));
    form.appendChild(h("div", { class: "mail-field" }, [h("label", { for: "mail-subject", text: t("mail.subjectLabel") }), subject]));
    if (draft.attachment) {
      form.appendChild(h("div", { class: "mail-attachment-chip" }, [
        h("span", { html: ctx.glyph("paperclip", 14) }),
        h("span", { text: draft.attachment }),
        h("button", { type: "button", class: "fw-icon-button", aria: { label: t("mail.removeAttachment", { name: draft.attachment }) }, html: ctx.glyph("close", 12), on: { click: function () { draft.attachment = null; refresh(); } } })
      ]));
    }
    form.appendChild(body);
    form.appendChild(error);

    function send() {
      var problems = [];
      if (!to.value.trim()) problems.push(t("mail.errorTo"));
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.value.trim())) problems.push(t("mail.errorAddress"));
      if (!subject.value.trim()) problems.push(t("mail.errorSubject"));
      if (!body.value.trim()) problems.push(t("mail.errorBody"));
      to.setAttribute("aria-invalid", problems.length && !/@/.test(to.value) ? "true" : "false");
      if (problems.length) {
        error.textContent = problems.join(" ");
        (to.value.trim() && /@/.test(to.value) ? (subject.value.trim() ? body : subject) : to).focus();
        return;
      }
      var type = draft.mode === "forward" ? "mail.forwarded" : draft.mode === "reply" ? "mail.replied" : "mail.sent";
      ctx.emit(type, {
        to: to.value.trim(),
        subject: subject.value.trim(),
        bodyLength: body.value.trim().length,
        attachment: !!draft.attachment,
        attachmentName: draft.attachment || null
      });
      s.sent.unshift({ id: "s" + Date.now(), to: to.value.trim(), subject: subject.value.trim(), body: body.value.trim(), attachment: draft.attachment, safe: true, time: ctx.formatTime(new Date()) });
      s.composing = null;
      ctx.toast(t("app.mail"), t("mail.sentToast"), "mail");
      refresh();
    }

    window.setTimeout(function () {
      var first = draft.to ? (draft.mode === "reply" ? body : subject) : to;
      if (document.body.contains(first)) first.focus();
    }, 0);
    return form;
  }

  window.DatorskolanAdvancedApps = {
    renderKeyboard: renderKeyboard,
    renderMail: renderMail
  };
})();
