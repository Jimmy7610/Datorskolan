/*
  File Explorer (Utforskaren) – Windows 11 layout:
  title bar · address bar (back/forward/up/refresh, breadcrumbs, search) · command bar · navigation pane · items · status bar.

  Behaviour follows Windows 11: single click selects, double click / Enter opens, F2 renames inline,
  Delete moves to the Recycle Bin, Ctrl+C / Ctrl+X / Ctrl+V copy, cut and paste, Ctrl+Shift+N creates a folder.
*/
(function () {
  "use strict";

  var NODE_MIME = "application/x-datorskolan-node";

  function ex(ctx) { return ctx.state.explorer; }

  function windowTitle(ctx) {
    return ctx.displayName(ctx.vfs.get(ex(ctx).folderId)) || ctx.t("app.explorer");
  }

  function navigate(ctx, folderId, options) {
    options = options || {};
    var folder = ctx.vfs.get(folderId);
    if (!folder || folder.type !== "folder") return;
    var s = ex(ctx);
    if (s.folderId !== folderId) {
      s.history = s.history.slice(0, s.historyIndex + 1).concat([folderId]);
      s.historyIndex = s.history.length - 1;
    }
    s.folderId = folderId;
    s.selectedId = null;
    s.renamingId = null;
    s.search = "";
    if (!options.silent) {
      ctx.emit("folder.opened", { folderId: folderId, path: ctx.vfs.path(folderId) });
      ctx.refreshApp("explorer");
    }
  }

  function go(ctx, delta) {
    var s = ex(ctx);
    var index = s.historyIndex + delta;
    if (index < 0 || index >= s.history.length || !ctx.vfs.get(s.history[index])) return;
    s.historyIndex = index;
    s.folderId = s.history[index];
    s.selectedId = null;
    s.renamingId = null;
    s.search = "";
    ctx.emit("folder.opened", { folderId: s.folderId, path: ctx.vfs.path(s.folderId) });
    ctx.refreshApp("explorer");
  }

  function selected(ctx) {
    var s = ex(ctx);
    return s.selectedId ? ctx.vfs.get(s.selectedId) : null;
  }

  function select(ctx, node) {
    ex(ctx).selectedId = node ? node.id : null;
    if (node) ctx.emit("file.selected", { id: node.id, type: node.type });
  }

  /* ---------- Commands ---------- */

  function newFolder(ctx) {
    var s = ex(ctx);
    if (s.folderId === "recycle-bin" || s.folderId === "home") return;
    var node = ctx.vfs.createFolder(s.folderId, ctx.t("explorer.newFolderName"));
    s.selectedId = node.id;
    s.renamingId = node.id;
    ctx.emit("folder.created", { id: node.id, name: node.name, parentId: node.parentId });
    ctx.refreshApp("explorer");
  }

  function newTextDocument(ctx) {
    var s = ex(ctx);
    if (s.folderId === "recycle-bin" || s.folderId === "home") return;
    var node = ctx.vfs.createFile(s.folderId, ctx.t("explorer.newTextDocumentName"), "text", "");
    s.selectedId = node.id;
    s.renamingId = node.id;
    ctx.emit("file.created", { id: node.id, name: node.name, parentId: node.parentId });
    ctx.refreshApp("explorer");
  }

  function startRename(ctx, node) {
    if (!node || node.system || node.parentId === "recycle-bin") return;
    ex(ctx).selectedId = node.id;
    ex(ctx).renamingId = node.id;
    ctx.refreshApp("explorer");
  }

  function commitRename(ctx, node, value) {
    var s = ex(ctx);
    s.renamingId = null;
    value = String(value || "").trim();
    if (!node || !value) {
      ctx.refreshApp("explorer");
      return;
    }
    var invalid = /[\\/:*?"<>|]/.test(value);
    if (invalid) {
      ctx.showDialog({
        icon: "warning",
        title: ctx.t("explorer.invalidName.title"),
        message: ctx.t("explorer.invalidName.text"),
        buttons: [{ label: ctx.t("common.ok"), primary: true, action: function () { startRename(ctx, node); } }]
      });
      return;
    }
    var renamed = ctx.vfs.rename(node.id, value);
    if (renamed) ctx.emit("file.renamed", { id: renamed.id, name: renamed.name });
    ctx.refreshApp("explorer");
  }

  function toClipboard(ctx, mode) {
    var node = selected(ctx);
    if (!node || node.system || node.parentId === "recycle-bin") return;
    ex(ctx).clipboard = { mode: mode, id: node.id };
    ctx.emit(mode === "cut" ? "file.cut" : "file.copiedToClipboard", { id: node.id });
    ctx.refreshApp("explorer");
  }

  function paste(ctx, targetId) {
    var s = ex(ctx);
    var clip = s.clipboard;
    targetId = targetId || s.folderId;
    if (!clip || targetId === "recycle-bin" || targetId === "home") return;
    var result = null;
    if (clip.mode === "copy") {
      result = ctx.vfs.copy(clip.id, targetId);
      if (result) ctx.emit("file.copied", { sourceId: clip.id, newId: result.id, parentId: targetId });
    } else {
      result = ctx.vfs.move(clip.id, targetId);
      if (result) {
        ctx.emit("file.moved", { id: result.id, name: result.name, parentId: targetId });
        s.clipboard = null;
      }
    }
    if (result) s.selectedId = result.id;
    ctx.refreshApp("explorer");
  }

  function remove(ctx) {
    var node = selected(ctx);
    if (!node || node.system) return;
    if (node.parentId === "recycle-bin") {
      ctx.showDialog({
        icon: "warning",
        title: ctx.t("explorer.deletePermanent.title"),
        message: ctx.t("explorer.deletePermanent.text", { name: node.name }),
        buttons: [
          { label: ctx.t("common.yes"), primary: true, action: function () {
            ctx.vfs.permanentDelete(node.id);
            ex(ctx).selectedId = null;
            ctx.emit("file.permanentlyDeleted", { id: node.id, name: node.name });
            ctx.refreshApp("explorer");
          } },
          { label: ctx.t("common.no"), cancel: true }
        ]
      });
      return;
    }
    var deleted = ctx.vfs.delete(node.id);
    if (deleted) {
      ctx.emit("file.deleted", { id: deleted.id, name: deleted.name });
      ex(ctx).selectedId = null;
    }
    ctx.refreshApp("explorer");
  }

  function restore(ctx, node) {
    node = node || selected(ctx);
    if (!node || node.parentId !== "recycle-bin") return;
    var restored = ctx.vfs.restore(node.id);
    if (restored) {
      ctx.emit("recycleBin.restored", { id: restored.id, parentId: restored.parentId });
      ex(ctx).selectedId = null;
    }
    ctx.refreshApp("explorer");
  }

  function restoreAll(ctx) {
    ctx.vfs.list("recycle-bin").forEach(function (node) { restore(ctx, node); });
  }

  function confirmEmptyRecycleBin(ctx) {
    var count = ctx.vfs.list("recycle-bin").length;
    if (!count) return;
    ctx.showDialog({
      icon: "warning",
      title: ctx.t("explorer.emptyConfirm.title"),
      message: ctx.I18n.plural("explorer.emptyConfirm.text", count),
      buttons: [
        { label: ctx.t("common.yes"), primary: true, action: function () {
          ctx.vfs.emptyRecycleBin();
          ex(ctx).selectedId = null;
          ctx.emit("recycleBin.emptied", {});
          ctx.refreshApp("explorer");
          ctx.render();
        } },
        { label: ctx.t("common.no"), cancel: true }
      ]
    });
  }

  function showProperties(ctx, node) {
    if (!node) return;
    var t = ctx.t;
    var h = ctx.h;
    var parent = node.parentId ? ctx.vfs.get(node.parentId) : null;
    var rows = [
      [t("explorer.props.type"), ctx.fileTypeLabel(node)],
      [t("explorer.props.location"), parent ? ctx.displayName(parent) : t("vfs.thisPc")],
      [t("explorer.props.contains"), node.type === "folder" ? ctx.I18n.plural("explorer.items", ctx.vfs.list(node.id).length) : t("explorer.props.size", { size: Math.max(1, Math.ceil(String(node.content || "").length / 1024)) })],
      [t("explorer.props.created"), node.createdAt ? ctx.formatDate(new Date(node.createdAt), true) : t("explorer.props.systemFolder")]
    ];
    ctx.showDialog({
      kind: "properties",
      title: t("explorer.props.title", { name: ctx.displayName(node) }),
      body: h("dl", { class: "fw-properties" }, rows.reduce(function (list, row) {
        list.push(h("dt", { text: row[0] }));
        list.push(h("dd", { text: row[1] }));
        return list;
      }, [])),
      buttons: [{ label: t("common.ok"), primary: true, cancel: true }]
    });
  }

  function extractDialog(ctx, node) {
    var t = ctx.t;
    var h = ctx.h;
    var parent = ctx.vfs.get(node.parentId);
    var folderName = String(node.name).replace(/\.zip$/i, "") || t("explorer.extract.defaultName");
    var showAfter = h("input", { type: "checkbox", id: "fw-extract-show", checked: true });
    showAfter.checked = true;
    ctx.showDialog({
      kind: "extract",
      wide: true,
      title: t("explorer.extract.title"),
      body: h("div", { class: "fw-form-stack" }, [
        h("p", { class: "fw-dialog-lead", text: t("explorer.extract.lead") }),
        h("label", { class: "fw-field" }, [
          h("span", { text: t("explorer.extract.target") }),
          h("input", { type: "text", value: ctx.displayName(parent) + " › " + folderName, readonly: true })
        ]),
        h("label", { class: "fw-check" }, [showAfter, h("span", { text: t("explorer.extract.showWhenDone") })])
      ]),
      buttons: [
        { label: t("explorer.extract.button"), primary: true, ui: "extract-confirm", action: function () {
          var folder = ctx.vfs.createFolder(node.parentId, folderName);
          ctx.vfs.createFile(folder.id, t("vfs.sample.zipPhoto", { n: 1 }), "image", "");
          ctx.vfs.createFile(folder.id, t("vfs.sample.zipPhoto", { n: 2 }), "image", "");
          ctx.emit("archive.extracted", { sourceId: node.id, sourceName: node.name, folderId: folder.id, folderName: folder.name });
          if (showAfter.checked) ctx.openExplorerAt(folder.id);
          else {
            ex(ctx).selectedId = folder.id;
            ctx.refreshApp("explorer");
          }
        } },
        { label: t("common.cancel"), cancel: true }
      ]
    });
  }

  function ejectUsb(ctx) {
    var s = ex(ctx);
    if (s.folderId === "usb-drive") {
      s.folderId = "home";
      s.selectedId = null;
    }
    if (ctx.vfs.unmountDrive("usb-drive")) {
      ctx.emit("device.usbEjected", { id: "usb-drive" });
      ctx.toast(ctx.t("explorer.usbSafe.title"), ctx.t("explorer.usbSafe.text"));
      ctx.render();
    }
  }

  /* ---------- Context menus ---------- */

  function itemMenu(ctx, node, x, y) {
    var t = ctx.t;
    var inRecycle = node.parentId === "recycle-bin";
    var locked = !!node.system;
    var isZip = ctx.nodeIconKey(node) === "zip";
    var items;
    if (inRecycle) {
      items = [
        { label: t("explorer.restore"), glyph: "undo", bold: true, action: function () { restore(ctx, node); } },
        "sep",
        { label: t("explorer.delete"), glyph: "close", shortcut: t("key.delete"), action: function () { remove(ctx); } },
        "sep",
        { label: t("menu.properties"), action: function () { showProperties(ctx, node); } }
      ];
    } else {
      items = [
        { label: t("menu.open"), bold: true, shortcut: t("key.enter"), action: function () { ctx.openFile(node); } }
      ];
      if (isZip) items.push({ label: t("explorer.extractAll"), iconKey: "zip", ui: "extract-all", action: function () { extractDialog(ctx, node); } });
      items = items.concat([
        "sep",
        { label: t("explorer.cut"), iconKey: "cut", shortcut: "Ctrl+X", disabled: locked, action: function () { toClipboard(ctx, "cut"); } },
        { label: t("explorer.copy"), glyph: "copy-glyph", shortcut: "Ctrl+C", disabled: locked, action: function () { toClipboard(ctx, "copy"); } },
        { label: t("explorer.rename"), glyph: "rename", shortcut: "F2", disabled: locked, action: function () { startRename(ctx, node); } },
        { label: t("explorer.delete"), iconKey: "delete", shortcut: t("key.delete"), disabled: locked, action: function () { remove(ctx); } },
        "sep",
        { label: t("menu.properties"), shortcut: "Alt+Enter", action: function () { showProperties(ctx, node); } }
      ]);
    }
    ctx.openMenu({ kind: "vfs-item", itemId: node.id, x: x, y: y, items: items });
  }

  function backgroundMenu(ctx, x, y) {
    var t = ctx.t;
    var s = ex(ctx);
    var canCreate = s.folderId !== "recycle-bin" && s.folderId !== "home";
    var items = [
      { label: t("menu.refresh"), glyph: "refresh", action: function () { ctx.refreshApp("explorer"); } },
      "sep",
      { label: t("explorer.paste"), glyph: "paste", shortcut: "Ctrl+V", disabled: !s.clipboard || !canCreate, action: function () { paste(ctx); } },
      "sep",
      { label: t("explorer.newFolder"), iconKey: "folder", shortcut: "Ctrl+Shift+N", disabled: !canCreate, action: function () { newFolder(ctx); } },
      { label: t("explorer.newTextDocument"), iconKey: "text-file", disabled: !canCreate, action: function () { newTextDocument(ctx); } },
      "sep",
      { label: t("menu.properties"), action: function () { showProperties(ctx, ctx.vfs.get(s.folderId)); } }
    ];
    if (s.folderId === "recycle-bin") {
      items = [
        { label: t("menu.refresh"), glyph: "refresh", action: function () { ctx.refreshApp("explorer"); } },
        "sep",
        { label: t("explorer.emptyRecycleBin"), iconKey: "delete", disabled: !ctx.vfs.list("recycle-bin").length, action: function () { confirmEmptyRecycleBin(ctx); } },
        { label: t("explorer.restoreAll"), glyph: "undo", disabled: !ctx.vfs.list("recycle-bin").length, action: function () { restoreAll(ctx); } }
      ];
    }
    ctx.openMenu({ kind: "explorer-background", x: x, y: y, items: items });
  }

  /* ---------- Rendering ---------- */

  function dropTarget(ctx, element, targetId) {
    element.addEventListener("dragover", function (e) {
      if (Array.prototype.indexOf.call(e.dataTransfer.types, NODE_MIME) < 0) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      element.classList.add("is-drop-target");
    });
    element.addEventListener("dragleave", function () { element.classList.remove("is-drop-target"); });
    element.addEventListener("drop", function (e) {
      e.preventDefault();
      element.classList.remove("is-drop-target");
      var nodeId = e.dataTransfer.getData(NODE_MIME);
      if (!nodeId || nodeId === targetId) return;
      if (targetId === "recycle-bin") {
        ex(ctx).selectedId = nodeId;
        remove(ctx);
        return;
      }
      var moved = ctx.vfs.move(nodeId, targetId);
      if (moved) {
        ex(ctx).selectedId = null;
        ctx.emit("file.moved", { id: moved.id, name: moved.name, parentId: moved.parentId, via: "drag-drop" });
        ctx.refreshApp("explorer");
      }
    });
  }

  function commandButton(ctx, opts) {
    var h = ctx.h;
    return h("button", {
      type: "button",
      class: "fw-command" + (opts.label && opts.compact !== true ? "" : " is-icon-only"),
      disabled: !!opts.disabled,
      title: opts.title || opts.label,
      aria: { label: opts.title || opts.label, haspopup: opts.menu ? "menu" : null },
      data: { ui: opts.ui || "" },
      on: { click: function (e) { e.stopPropagation(); opts.action(e); } }
    }, [
      h("span", { class: "fw-command-icon", html: opts.iconKey ? ctx.icon(opts.iconKey, 16) : ctx.glyph(opts.glyph, 16) }),
      opts.label ? h("span", { class: "fw-command-label", text: opts.label }) : null,
      opts.menu ? h("span", { class: "fw-command-chevron", html: ctx.glyph("chevron-down", 12) }) : null
    ]);
  }

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var vfs = ctx.vfs;
    var s = ex(ctx);
    if (!vfs.get(s.folderId)) s.folderId = "home";
    var folder = vfs.get(s.folderId);
    var inRecycle = s.folderId === "recycle-bin";
    var isHome = s.folderId === "home";
    var current = selected(ctx);
    var root = h("div", { class: "explorer", data: { ui: "explorer" } });

    /* Address bar */
    var nav = h("div", { class: "explorer-nav-buttons" }, [
      h("button", { type: "button", class: "fw-icon-button", disabled: s.historyIndex <= 0, title: t("explorer.back"), aria: { label: t("explorer.back") }, html: ctx.glyph("arrow-left", 16), on: { click: function () { go(ctx, -1); } } }),
      h("button", { type: "button", class: "fw-icon-button", disabled: s.historyIndex >= s.history.length - 1, title: t("explorer.forward"), aria: { label: t("explorer.forward") }, html: ctx.glyph("arrow-right", 16), on: { click: function () { go(ctx, 1); } } }),
      h("button", { type: "button", class: "fw-icon-button", disabled: !folder.parentId, title: t("explorer.up"), aria: { label: t("explorer.up") }, html: ctx.glyph("arrow-up", 16), on: { click: function () { if (folder.parentId) navigate(ctx, folder.parentId); } } }),
      h("button", { type: "button", class: "fw-icon-button", title: t("menu.refresh"), aria: { label: t("menu.refresh") }, html: ctx.glyph("refresh", 16), on: { click: function () { ctx.refreshApp("explorer"); } } })
    ]);

    var crumbs = h("nav", { class: "explorer-breadcrumbs", aria: { label: t("explorer.address") }, data: { ui: "explorer-address" } }, [
      h("span", { class: "explorer-crumb-icon", html: ctx.nodeIcon(folder, 16) })
    ]);
    vfs.ancestry(folder.id).forEach(function (node, index, chain) {
      crumbs.appendChild(h("span", { class: "explorer-crumb-sep", html: ctx.glyph("chevron-right", 12) }));
      crumbs.appendChild(h("button", {
        type: "button",
        class: "explorer-crumb",
        aria: { current: index === chain.length - 1 ? "location" : null },
        text: ctx.displayName(node),
        on: { click: function () { navigate(ctx, node.id); } }
      }));
    });

    var search = h("input", {
      type: "search",
      class: "explorer-search-input",
      placeholder: t("explorer.searchIn", { folder: ctx.displayName(folder) }),
      aria: { label: t("explorer.searchIn", { folder: ctx.displayName(folder) }) },
      data: { ui: "explorer-search" }
    });
    search.value = s.search || "";
    search.addEventListener("input", function () {
      s.search = search.value;
      ctx.emit("file.search", { query: s.search, queryNormalized: ctx.I18n.lower(s.search), folderId: s.folderId });
      var fresh = render(ctx);
      root.replaceWith(fresh);
      var input = fresh.querySelector(".explorer-search-input");
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });

    root.appendChild(h("div", { class: "explorer-addressbar" }, [
      nav,
      crumbs,
      h("label", { class: "explorer-search" }, [h("span", { html: ctx.glyph("search", 16) }), search])
    ]));

    /* Command bar */
    var bar = h("div", { class: "explorer-commandbar", role: "toolbar", aria: { label: t("explorer.commandBar") }, data: { ui: "explorer-commandbar" } });
    var locked = !current || current.system;
    if (inRecycle) {
      var count = vfs.list("recycle-bin").length;
      bar.appendChild(commandButton(ctx, { label: t("explorer.emptyRecycleBin"), iconKey: "delete", disabled: !count, ui: "empty-recycle-bin", action: function () { confirmEmptyRecycleBin(ctx); } }));
      bar.appendChild(commandButton(ctx, { label: t("explorer.restoreSelected"), glyph: "undo", disabled: !current, ui: "restore-selected", action: function () { restore(ctx); } }));
      bar.appendChild(commandButton(ctx, { label: t("explorer.restoreAll"), glyph: "undo", disabled: !count, action: function () { restoreAll(ctx); } }));
    } else {
      var canCreate = !isHome;
      bar.appendChild(commandButton(ctx, {
        label: t("explorer.new"), glyph: "plus", menu: true, disabled: !canCreate, ui: "explorer-new",
        action: function (e) {
          var rect = e.currentTarget.getBoundingClientRect();
          ctx.openMenu({
            kind: "explorer-new",
            x: rect.left,
            y: rect.bottom + 4,
            items: [
              { label: t("explorer.newMenu.folder"), iconKey: "folder", shortcut: "Ctrl+Shift+N", ui: "explorer-new-folder", action: function () { newFolder(ctx); } },
              "sep",
              { label: t("explorer.newMenu.textDocument"), iconKey: "text-file", ui: "explorer-new-text", action: function () { newTextDocument(ctx); } }
            ]
          });
        }
      }));
      bar.appendChild(h("span", { class: "fw-command-separator", aria: { hidden: "true" } }));
      bar.appendChild(commandButton(ctx, { label: t("explorer.cut"), iconKey: "cut", disabled: locked, ui: "explorer-cut", action: function () { toClipboard(ctx, "cut"); } }));
      bar.appendChild(commandButton(ctx, { label: t("explorer.copy"), glyph: "copy-glyph", disabled: locked, ui: "explorer-copy", action: function () { toClipboard(ctx, "copy"); } }));
      bar.appendChild(commandButton(ctx, { label: t("explorer.paste"), glyph: "paste", disabled: !s.clipboard || !canCreate, ui: "explorer-paste", action: function () { paste(ctx); } }));
      bar.appendChild(commandButton(ctx, { label: t("explorer.rename"), glyph: "rename", disabled: locked, ui: "explorer-rename", action: function () { startRename(ctx, current); } }));
      bar.appendChild(commandButton(ctx, { label: t("explorer.delete"), iconKey: "delete", disabled: locked, ui: "explorer-delete", action: function () { remove(ctx); } }));
      if (current && ctx.nodeIconKey(current) === "zip") {
        bar.appendChild(h("span", { class: "fw-command-separator", aria: { hidden: "true" } }));
        bar.appendChild(commandButton(ctx, { label: t("explorer.extractAll"), iconKey: "zip", ui: "extract-all", action: function () { extractDialog(ctx, current); } }));
      }
      if (s.folderId === "usb-drive") {
        bar.appendChild(h("span", { class: "fw-command-separator", aria: { hidden: "true" } }));
        bar.appendChild(commandButton(ctx, { label: t("explorer.eject"), iconKey: "usb-drive", ui: "eject", action: function () { ejectUsb(ctx); } }));
      }
    }
    root.appendChild(bar);

    /* Navigation pane */
    var pane = h("nav", { class: "explorer-pane", aria: { label: t("explorer.navigationPane") } });
    function paneItem(id, iconKey, group) {
      var node = vfs.get(id);
      if (!node) return;
      var item = h("button", {
        type: "button",
        class: "explorer-pane-item" + (s.folderId === id ? " is-current" : ""),
        aria: { current: s.folderId === id ? "page" : null },
        data: { ui: "nav-" + id },
        on: {
          click: function (e) { e.stopPropagation(); navigate(ctx, id); },
          contextmenu: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var items = [{ label: t("menu.open"), bold: true, action: function () { navigate(ctx, id); } }];
            if (id === "usb-drive") items = items.concat(["sep", { label: t("explorer.eject"), ui: "eject", action: function () { ejectUsb(ctx); } }]);
            if (id === "recycle-bin") items = items.concat(["sep", { label: t("explorer.emptyRecycleBin"), disabled: !vfs.list("recycle-bin").length, action: function () { confirmEmptyRecycleBin(ctx); } }]);
            items = items.concat(["sep", { label: t("menu.properties"), action: function () { showProperties(ctx, node); } }]);
            ctx.openMenu({ kind: id === "usb-drive" ? "removable-drive" : "explorer-nav", itemId: id, x: e.clientX, y: e.clientY, items: items });
          }
        }
      }, [h("span", { class: "explorer-pane-icon", html: ctx.icon(iconKey, 16) }), h("span", { text: ctx.displayName(node) })]);
      if (id !== "home") dropTarget(ctx, item, id);
      group.appendChild(item);
    }
    var groupHome = h("div", { class: "explorer-pane-group" });
    paneItem("home", "home", groupHome);
    var groupFolders = h("div", { class: "explorer-pane-group" });
    paneItem("documents", "folder-documents", groupFolders);
    paneItem("pictures", "pictures", groupFolders);
    paneItem("downloads", "download", groupFolders);
    var groupCloud = h("div", { class: "explorer-pane-group" });
    paneItem("onedrive", "onedrive", groupCloud);
    var groupDevices = h("div", { class: "explorer-pane-group" });
    paneItem("usb-drive", "usb-drive", groupDevices);
    paneItem("recycle-bin", "recycle", groupDevices);
    [groupHome, groupFolders, groupCloud, groupDevices].forEach(function (group) { if (group.children.length) pane.appendChild(group); });

    /* Items */
    var nodes = vfs.list(s.folderId);
    var query = ctx.I18n.lower(s.search);
    if (query) nodes = nodes.filter(function (node) { return ctx.I18n.lower(ctx.displayName(node)).indexOf(query) >= 0; });

    var useTiles = isHome || s.folderId === "pictures";
    var list = h("div", {
      class: "explorer-items " + (useTiles ? "is-tiles" : "is-details"),
      role: "listbox",
      tabindex: nodes.length ? null : "0",
      aria: { label: ctx.displayName(folder) },
      data: { ui: "explorer-items" }
    });

    if (!useTiles && nodes.length) {
      list.appendChild(h("div", { class: "explorer-details-head", aria: { hidden: "true" } }, [
        h("span", { text: t("explorer.col.name") }),
        h("span", { text: inRecycle ? t("explorer.col.originalLocation") : t("explorer.col.modified") }),
        h("span", { text: t("explorer.col.type") })
      ]));
    }

    if (isHome) {
      list.appendChild(h("h2", { class: "explorer-section-title", text: t("explorer.quickAccess") }));
    }

    if (!nodes.length) {
      list.appendChild(h("p", { class: "explorer-empty", text: query ? t("explorer.noMatches") : inRecycle ? t("explorer.recycleEmpty") : t("explorer.folderEmpty") }));
    }

    var options = [];
    nodes.forEach(function (node) {
      var isSelected = s.selectedId === node.id;
      var isCut = s.clipboard && s.clipboard.mode === "cut" && s.clipboard.id === node.id;
      var name = ctx.displayName(node);
      var option = h("div", {
        role: "option",
        class: "explorer-item" + (isSelected ? " is-selected" : "") + (isCut ? " is-cut" : ""),
        tabindex: "-1",
        aria: { selected: isSelected ? "true" : "false", label: name },
        data: { nodeId: node.id },
        draggable: !node.system && !inRecycle ? "true" : "false"
      });

      var label;
      if (s.renamingId === node.id) {
        label = h("input", { type: "text", class: "explorer-rename", value: node.name, aria: { label: t("explorer.rename") }, data: { ui: "explorer-rename-input" } });
        var done = false;
        label.addEventListener("keydown", function (e) {
          e.stopPropagation();
          if (e.key === "Enter") { e.preventDefault(); done = true; commitRename(ctx, node, label.value); }
          if (e.key === "Escape") { e.preventDefault(); done = true; s.renamingId = null; ctx.refreshApp("explorer"); }
        });
        label.addEventListener("blur", function () { if (!done) { done = true; commitRename(ctx, node, label.value); } });
        label.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        window.setTimeout(function () {
          if (!document.body.contains(label)) return;
          label.focus();
          var dot = node.type === "file" ? node.name.lastIndexOf(".") : -1;
          label.setSelectionRange(0, dot > 0 ? dot : node.name.length);
        }, 0);
      } else {
        label = h("span", { class: "explorer-item-name", text: name });
      }

      option.appendChild(h("span", { class: "explorer-item-icon", html: ctx.nodeIcon(node, useTiles ? 48 : 20) }));
      option.appendChild(label);
      if (!useTiles) {
        var second = inRecycle
          ? ctx.displayName(vfs.get(node.deletedFrom)) || ""
          : node.createdAt ? ctx.formatDate(new Date(node.createdAt)) + " " + ctx.formatTime(new Date(node.createdAt)) : "";
        option.appendChild(h("span", { class: "explorer-item-meta", text: second }));
        option.appendChild(h("span", { class: "explorer-item-meta", text: ctx.fileTypeLabel(node) }));
      }

      option.addEventListener("click", function (e) {
        e.stopPropagation();
        if (s.renamingId === node.id) return;
        // Windows 11: clicking the name of an already selected item starts rename after a pause.
        s.selectedId = node.id;
        list.querySelectorAll(".explorer-item").forEach(function (other) {
          var on = other === option;
          other.classList.toggle("is-selected", on);
          other.setAttribute("aria-selected", on ? "true" : "false");
        });
        option.focus({ preventScroll: true });
        ctx.emit("file.selected", { id: node.id, type: node.type });
        updateStatus();
        updateCommands();
      });
      option.addEventListener("dblclick", function (e) {
        e.stopPropagation();
        if (s.renamingId === node.id) return;
        if (inRecycle) { showProperties(ctx, node); return; }
        if (node.type === "folder") navigate(ctx, node.id);
        else ctx.openFile(node);
      });
      option.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        e.stopPropagation();
        s.selectedId = node.id;
        list.querySelectorAll(".explorer-item").forEach(function (other) { other.classList.toggle("is-selected", other === option); });
        itemMenu(ctx, node, e.clientX, e.clientY);
      });
      option.addEventListener("dragstart", function (e) {
        if (node.system || inRecycle) { e.preventDefault(); return; }
        e.dataTransfer.setData(NODE_MIME, node.id);
        e.dataTransfer.effectAllowed = "move";
        option.classList.add("is-dragging");
        ctx.emit("file.dragStarted", { id: node.id, name: node.name });
      });
      option.addEventListener("dragend", function () { option.classList.remove("is-dragging"); });
      if (node.type === "folder" && !inRecycle) dropTarget(ctx, option, node.id);

      list.appendChild(option);
      options.push(option);
    });

    // Roving focus: the selected (or first) item is the tab stop.
    var tabStop = options.filter(function (o) { return o.classList.contains("is-selected"); })[0] || options[0];
    if (tabStop) tabStop.setAttribute("tabindex", "0");

    list.addEventListener("click", function (e) {
      if (e.target === list) {
        s.selectedId = null;
        list.querySelectorAll(".explorer-item").forEach(function (other) { other.classList.remove("is-selected"); other.setAttribute("aria-selected", "false"); });
        updateStatus();
        updateCommands();
      }
    });
    list.addEventListener("contextmenu", function (e) {
      if (e.target.closest(".explorer-item")) return;
      e.preventDefault();
      e.stopPropagation();
      backgroundMenu(ctx, e.clientX, e.clientY);
    });
    if (!inRecycle && !isHome) dropTarget(ctx, list, s.folderId);

    root.appendChild(h("div", { class: "explorer-main" }, [pane, list]));

    /* Status bar */
    var status = h("div", { class: "explorer-status", role: "status", aria: { live: "polite" } });
    function updateStatus() {
      var text = ctx.I18n.plural("explorer.items", nodes.length);
      if (s.selectedId && vfs.get(s.selectedId)) text += "  |  " + t("explorer.oneSelected");
      status.textContent = text;
    }
    function updateCommands() {
      var node = selected(ctx);
      var lockedNow = !node || node.system;
      bar.querySelectorAll("[data-ui='explorer-cut'],[data-ui='explorer-copy'],[data-ui='explorer-rename'],[data-ui='explorer-delete']").forEach(function (button) {
        button.disabled = lockedNow;
      });
      var restoreButton = bar.querySelector("[data-ui='restore-selected']");
      if (restoreButton) restoreButton.disabled = !node;
      var hasExtract = !!bar.querySelector("[data-ui='extract-all']");
      var needsExtract = !!node && ctx.nodeIconKey(node) === "zip";
      if (hasExtract !== needsExtract) ctx.refreshApp("explorer");
    }
    updateStatus();
    root.appendChild(status);

    /* Keyboard */
    root.addEventListener("keydown", function (e) {
      var tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      var key = e.key;
      var lower = key.toLowerCase();
      var node = selected(ctx);
      var index = options.indexOf(document.activeElement);

      if ((key === "ArrowDown" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowLeft") && options.length && e.target.closest(".explorer-items")) {
        e.preventDefault();
        var step = key === "ArrowDown" || key === "ArrowRight" ? 1 : -1;
        var next = options[Math.max(0, Math.min(options.length - 1, index < 0 ? 0 : index + step))];
        next.click();
        return;
      }
      if (key === "Enter" && node && e.target.closest(".explorer-item")) {
        e.preventDefault();
        if (node.type === "folder") navigate(ctx, node.id); else ctx.openFile(node);
        return;
      }
      if (key === "F2" && node) { e.preventDefault(); startRename(ctx, node); return; }
      if (key === "Delete" && node) { e.preventDefault(); remove(ctx); return; }
      if ((key === "Backspace" || (e.altKey && key === "ArrowLeft"))) { e.preventDefault(); go(ctx, -1); return; }
      if (e.altKey && key === "ArrowUp" && folder.parentId) { e.preventDefault(); navigate(ctx, folder.parentId); return; }
      if (e.altKey && key === "Enter" && node) { e.preventDefault(); showProperties(ctx, node); return; }
      if (e.ctrlKey && e.shiftKey && lower === "n") { e.preventDefault(); newFolder(ctx); return; }
      if (e.ctrlKey && lower === "c" && node) { e.preventDefault(); toClipboard(ctx, "copy"); return; }
      if (e.ctrlKey && lower === "x" && node) { e.preventDefault(); toClipboard(ctx, "cut"); return; }
      if (e.ctrlKey && lower === "v") { e.preventDefault(); paste(ctx); return; }
      if (e.ctrlKey && lower === "f") { e.preventDefault(); search.focus(); }
    });

    return root;
  }

  window.DatorskolanExplorerApp = {
    render: render,
    windowTitle: windowTitle,
    navigate: navigate,
    extractDialog: extractDialog,
    confirmEmptyRecycleBin: confirmEmptyRecycleBin,
    showProperties: showProperties,
    newFolder: newFolder,
    paste: paste,
    remove: remove,
    restore: restore
  };
})();
