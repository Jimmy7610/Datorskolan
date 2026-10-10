/*
  FakeWin – the simulated Windows 11 desktop.

  Architecture
  - `state` is the single source of truth; the DOM is re-rendered from it.
  - Every user interaction emits a domain event through emit(type, payload).
    Scenario goals and lesson validators observe these events (see docs/07-TECHNICAL-ARCHITECTURE.md).
  - Apps live in their own files and receive a `ctx` object (state, emit, vfs, t, h, …).
  - All visible text comes from the i18n layer (locales/<lang>/ui.js).

  The simulator is created lazily by the product shell: DatorskolanSimulator.boot(rootElement).
*/
(function () {
  "use strict";

  function boot(root) {
    var I18n = window.DatorskolanI18n;
    var t = I18n.t;
    var ui = window.DatorskolanWindows11;
    var h = ui.h;

    try {
      return createSimulator(root, I18n, t, ui, h);
    } catch (error) {
      console.error("[Datorskolan]", error);
      root.replaceChildren(h("div", { class: "fw-fatal", role: "alert" }, [
        h("h1", { text: t("app.startFailed.title") }),
        h("p", { text: t("app.startFailed.text") })
      ]));
      return null;
    }
  }

  function createSimulator(root, I18n, t, ui, h) {
    var course = window.DatorskolanCourse;
    var progressStore = new window.DatorskolanProgressStore(window.localStorage);
    var scenarioEngine = new window.DatorskolanScenarioEngine(course.scenarios());
    var lessonEngine = new window.DatorskolanLessonEngine(course.lessons(), progressStore);

    var vfs = new window.VirtualFileSystem({
      locale: I18n.intlLocale(),
      newFolderName: t("explorer.newFolderName"),
      copySuffix: t("explorer.copySuffix"),
      seed: function (fs) {
        fs.createFile("documents", t("vfs.sample.welcomeName"), "text", t("vfs.sample.welcomeText"));
        fs.createFile("pictures", t("vfs.sample.photo1"), "image", "");
        fs.createFile("pictures", t("vfs.sample.photo2"), "image", "");
        fs.createFile("downloads", t("vfs.sample.readmeName"), "text", t("vfs.sample.readmeText"));
      }
    });

    var TASKBAR_HEIGHT = 48;

    function freshMouseLab(mode) {
      return {
        mode: mode || "move",
        distance: 0,
        lastX: null,
        lastY: null,
        targetHits: 0,
        scrollDown: false,
        scrollUp: false,
        completed: false,
        finalFlags: { move: false, click: false, double: false, right: false, scroll: false, drag: false }
      };
    }

    function freshExplorer() {
      return { folderId: "home", selectedId: null, clipboard: null, search: "", renamingId: null, history: ["home"], historyIndex: 0, view: null };
    }

    function freshDesktopView() {
      return { size: "medium", autoArrange: false, alignToGrid: true, showIcons: true, sortBy: null };
    }

    var state = {
      desktopItems: [
        { id: "recycle-bin", labelKey: "vfs.recycleBin", iconKey: "recycle", x: 12, y: 12, appId: "recycle-bin", folderId: "recycle-bin" },
        { id: "documents", labelKey: "vfs.documents", iconKey: "folder-documents", x: 12, y: 112, appId: "explorer", folderId: "documents" },
        { id: "pictures", labelKey: "vfs.pictures", iconKey: "pictures", x: 12, y: 212, appId: "explorer", folderId: "pictures" }
      ],
      selected: null,
      desktopMulti: [],
      // Desktop right-click > View / Sort by, like Windows 11.
      desktopView: freshDesktopView(),
      startOpen: false,
      startQuery: "",
      startShowAllPins: false,
      quickSettingsOpen: false,
      quickSettingsView: "main",
      calendarOpen: false,
      powerOverlay: null,
      windows: [],
      activeWindowId: null,
      menu: null,
      nextWindow: 1,
      nextZ: 10,
      explorer: freshExplorer(),
      dialog: null,
      calculator: { display: "0", stored: null, operator: null, waiting: false, expression: "" },
      notepadFileId: null,
      notepadDraft: "",
      notepadDirty: false,
      notepadZoom: 100,
      photoFileId: null,
      photoZoom: 1,
      coachOpen: false,
      learningHighlightSelector: null,
      learningSelectedModule: null,
      learningTab: "course",
      everydayLab: { mode: "save-location", completed: false, flags: {} },
      keyboardLab: { mode: "letters", completed: false, flags: {}, clipboard: "" },
      browser: null,
      mail: null,
      settings: null,
      pdfViewer: null,
      installer: null,
      snipping: null,
      troubleDemo: null,
      software: { exerciseProgramInstalled: false },
      shell: ui.loadShellState(window.localStorage),
      mouseLab: freshMouseLab("move")
    };

    /* ---------- Events ---------- */

    var listeners = {};
    var runtimeApi = null;
    var learningRuntimeApi = null;

    function emit(type, payload) {
      payload = payload || {};
      (listeners[type] || []).forEach(function (fn) { fn(payload); });
      if (runtimeApi) scenarioEngine.observe(type, payload, runtimeApi);
      if (learningRuntimeApi) lessonEngine.observe(type, payload);
    }

    function on(type, fn) {
      (listeners[type] || (listeners[type] = [])).push(fn);
    }

    /* ---------- Names and icons ---------- */

    function displayName(node) {
      if (!node) return "";
      return node.labelKey ? t(node.labelKey) : node.name;
    }

    function nodeIconKey(node) {
      if (!node) return "document";
      if (node.id === "recycle-bin") return "recycle";
      if (node.id === "onedrive") return "onedrive";
      if (node.id === "usb-drive") return "usb-drive";
      if (node.id === "home") return "home";
      if (node.id === "downloads") return "download";
      if (node.id === "pictures") return "pictures";
      if (node.type === "folder") return "folder";
      if (node.fileType === "image") return "image-file";
      if (node.fileType === "pdf" || /\.pdf$/i.test(node.name || "")) return "pdf";
      if (node.fileType === "zip" || /\.zip$/i.test(node.name || "")) return "zip";
      if (node.fileType === "installer" || /\.exe$/i.test(node.name || "")) return "installer";
      return "text-file";
    }

    function nodeIcon(node, size) {
      return ui.icon(nodeIconKey(node), size || 20);
    }

    function fileTypeLabel(node) {
      if (!node) return "";
      if (node.type === "folder") return t("explorer.type.folder");
      var key = nodeIconKey(node);
      if (key === "image-file") return t("explorer.type.image");
      if (key === "pdf") return t("explorer.type.pdf");
      if (key === "zip") return t("explorer.type.zip");
      if (key === "installer") return t("explorer.type.app");
      return t("explorer.type.text");
    }

    /* ---------- Shell pins ---------- */

    function saveShellState() {
      state.shell = ui.saveShellState(state.shell, window.localStorage);
    }

    function isPinnedToTaskbar(appId) { return state.shell.pinnedTaskbar.indexOf(appId) >= 0; }
    function isPinnedToStart(appId) { return state.shell.pinnedStart.indexOf(appId) >= 0; }

    function setPin(list, appId, pinned, eventType) {
      if (!apps[appId]) return;
      var current = state.shell[list].indexOf(appId) >= 0;
      if (current === pinned) return;
      state.shell[list] = pinned
        ? state.shell[list].concat([appId])
        : state.shell[list].filter(function (id) { return id !== appId; });
      saveShellState();
      emit(eventType, { appId: appId });
      render();
    }

    /* ---------- Scenario runtime ---------- */

    function resetForScenario() {
      vfs.reset();
      state.selected = null;
      state.desktopMulti = [];
      state.desktopView = freshDesktopView();
      arrangeDesktop();
      state.startOpen = false;
      state.startQuery = "";
      state.quickSettingsOpen = false;
      state.calendarOpen = false;
      state.windows = [];
      state.activeWindowId = null;
      state.menu = null;
      state.nextWindow = 1;
      state.nextZ = 10;
      state.explorer = freshExplorer();
      state.dialog = null;
      state.calculator = { display: "0", stored: null, operator: null, waiting: false, expression: "" };
      state.notepadFileId = null;
      state.notepadDraft = "";
      state.notepadDirty = false;
      state.notepadZoom = 100;
      state.photoFileId = null;
      state.photoZoom = 1;
      state.everydayLab = { mode: "save-location", completed: false, flags: {} };
      state.keyboardLab = { mode: "letters", completed: false, flags: {}, clipboard: "" };
      state.browser = null;
      state.mail = null;
      state.settings = null;
      state.pdfViewer = null;
      state.installer = null;
      state.snipping = null;
      state.troubleDemo = null;
      state.software = { exerciseProgramInstalled: false };
      state.mouseLab = freshMouseLab("move");
      render();
    }

    function setExplorerFolder(folderId) {
      if (vfs.get(folderId)) {
        state.explorer.folderId = folderId;
        state.explorer.selectedId = null;
        state.explorer.history = [folderId];
        state.explorer.historyIndex = 0;
      }
      render();
    }

    function setMouseMode(mode) {
      state.mouseLab = freshMouseLab(mode);
      render();
    }

    function applyStartState(start) {
      start = start || {};
      if (start.keyboardMode) state.keyboardLab = { mode: start.keyboardMode, completed: false, flags: {}, clipboard: "" };
      if (start.everydayMode) state.everydayLab = { mode: start.everydayMode, completed: false, flags: {} };
      if (Array.isArray(start.pinnedTaskbar)) {
        state.shell.pinnedTaskbar = start.pinnedTaskbar.slice();
        saveShellState();
      }
      if (Array.isArray(start.pinnedStart)) {
        state.shell.pinnedStart = start.pinnedStart.slice();
        saveShellState();
      }
      if (start.settingsPage) {
        state.settings = state.settings || null;
        window.DatorskolanSettingsApp.ensure(state).page = start.settingsPage;
      }
      if (start.troubleMode) {
        state.troubleDemo = {
          mode: start.troubleMode,
          errorOpen: false,
          errorHandled: false,
          frozen: start.troubleMode === "frozen",
          waited: false,
          closedAfterFreeze: false,
          restarted: false
        };
      }
      if (start.usbMounted) {
        vfs.mountDrive("usb-drive", "USB");
        var reportName = t("vfs.sample.usbReport");
        if (!vfs.list("usb-drive").some(function (node) { return node.name === reportName; })) {
          vfs.createFile("usb-drive", reportName, "pdf", "");
        }
      }
      if (start.browserReset) state.browser = null;
      if (start.mailReset) state.mail = null;
    }

    runtimeApi = {
      vfs: vfs,
      resetForScenario: resetForScenario,
      setExplorerFolder: setExplorerFolder,
      setMouseMode: setMouseMode,
      applyStartState: applyStartState,
      openApp: function (appId) { openApp(appId); }
    };

    learningRuntimeApi = {
      loadScenario: function (id) {
        var result = scenarioEngine.load(id, runtimeApi);
        render();
        return result;
      },
      getScenarioStatus: function () {
        var active = scenarioEngine.active();
        return active ? active.status : null;
      },
      setLearningHighlight: function (selector) {
        state.learningHighlightSelector = selector || null;
        applyLearningHighlight();
      }
    };

    /* ---------- Files ---------- */

    function openFile(node) {
      if (!node) return;
      if (node.type === "folder") {
        openExplorerAt(node.id);
        return;
      }
      emit("file.opened", { id: node.id, name: node.name, fileType: node.fileType });
      var kind = nodeIconKey(node);
      if (kind === "text-file") {
        state.notepadFileId = node.id;
        state.notepadDraft = node.content || "";
        state.notepadDirty = false;
        openApp("notepad");
      } else if (kind === "image-file") {
        state.photoFileId = node.id;
        state.photoZoom = 1;
        openApp("photos");
      } else if (kind === "pdf") {
        var pdf = window.DatorskolanPdfApp.ensure(state, ctx);
        pdf.fileName = node.name;
        openApp("pdf");
      } else if (kind === "installer") {
        window.DatorskolanInstallerApp.launch(ctx);
      } else if (kind === "zip") {
        window.DatorskolanExplorerApp.extractDialog(ctx, node);
      }
    }

    function openExplorerAt(folderId) {
      var existing = findWindow("explorer");
      window.DatorskolanExplorerApp.navigate(ctx, folderId, { silent: !existing });
      openApp("explorer");
    }

    /* ---------- App registry ---------- */

    var apps = {
      explorer: { titleKey: "app.explorer", iconKey: "explorer", tabbed: true, tabIconKey: function () { return nodeIconKey(vfs.get(window.DatorskolanExplorerApp.currentFolderId(ctx))); }, w: 880, h: 540, render: function () { return window.DatorskolanExplorerApp.render(ctx); }, title: function () { return window.DatorskolanExplorerApp.windowTitle(ctx); } },
      "recycle-bin": { titleKey: "app.recycleBin", iconKey: "recycle", w: 800, h: 480, alias: "explorer" },
      calculator: { titleKey: "app.calculator", iconKey: "calculator", w: 340, h: 520, minW: 320, minH: 440, render: function () { return window.DatorskolanBasicApps.renderCalculator(ctx); } },
      notepad: { titleKey: "app.notepad", iconKey: "notepad", w: 700, h: 480, render: function () { return window.DatorskolanBasicApps.renderNotepad(ctx); }, title: function () { return window.DatorskolanBasicApps.notepadTitle(ctx); },
        tabbed: true, tabTitle: function () { return window.DatorskolanBasicApps.notepadDocName(ctx); }, tabDirty: function () { return !!state.notepadDirty; } },
      photos: { titleKey: "app.photos", iconKey: "photos", w: 720, h: 500, render: function () { return window.DatorskolanBasicApps.renderPhotos(ctx); } },
      settings: { titleKey: "app.settings", iconKey: "settings", w: 960, h: 640, render: function () { return window.DatorskolanSettingsApp.render(ctx); } },
      browser: { titleKey: "app.browser", iconKey: "browser", w: 1000, h: 660, chromeless: true, render: function () { return window.DatorskolanChromeApp.render(ctx); } },
      mail: { titleKey: "app.mail", iconKey: "mail", w: 960, h: 640, render: function () { return window.DatorskolanAdvancedApps.renderMail(ctx); } },
      snipping: { titleKey: "app.snipping", iconKey: "snipping", w: 760, h: 540, render: function () { return window.DatorskolanSnippingApp.render(ctx); } },
      pdf: { titleKey: "app.pdf", iconKey: "pdf", w: 900, h: 640, render: function () { return window.DatorskolanPdfApp.render(ctx); }, title: function () { return window.DatorskolanPdfApp.windowTitle(ctx); } },
      installer: { titleKey: "app.installer", iconKey: "installer", w: 620, h: 480, resizable: false, render: function () { return window.DatorskolanInstallerApp.render(ctx); } },
      "trouble-demo": { titleKey: "app.troubleDemo", iconKey: "pdf", w: 680, h: 460, render: function () { return window.DatorskolanTroubleApp.render(ctx); }, title: function () { return window.DatorskolanTroubleApp.windowTitle(ctx); } },
      "mouse-lab": { titleKey: "app.mouseLab", iconKey: "school", w: 780, h: 560, render: function () { return window.DatorskolanMouseLab.render(ctx); } },
      "keyboard-lab": { titleKey: "app.keyboardLab", iconKey: "school", w: 780, h: 560, render: function () { return window.DatorskolanAdvancedApps.renderKeyboard(ctx); } },
      "everyday-lab": { titleKey: "app.everydayLab", iconKey: "school", w: 760, h: 520, render: function () { return window.DatorskolanEverydayApps.render(ctx); } }
    };

    // Apps that appear in Start's "All" list and in search (practice tools are opened by lessons only).
    var BASE_START_APPS = ["browser", "calculator", "mail", "notepad", "photos", "settings", "snipping", "explorer"];

    // Programs installed during an exercise are listed and searchable too, as on a real PC.
    function startApps() {
      var list = BASE_START_APPS.slice();
      if (state.troubleDemo) list.push("trouble-demo");
      return list;
    }

    function appTitle(appId) {
      var app = apps[appId];
      return app ? t(app.titleKey) : appId;
    }

    function realAppId(appId) {
      return apps[appId] && apps[appId].alias ? apps[appId].alias : appId;
    }

    /* ---------- DOM skeleton ---------- */

    var shell = h("div", { class: "fw", data: { locale: I18n.locale() } });
    shell.innerHTML =
      '<div class="fw-screen">' +
        '<div class="fw-workspace">' +
          '<div class="fw-desktop" role="group"></div>' +
          '<div class="fw-windows"></div>' +
        '</div>' +
        '<div class="fw-flyouts"></div>' +
        '<div class="fw-menu-layer"></div>' +
        '<div class="fw-dialog-layer"></div>' +
        '<div class="fw-overlay-layer"></div>' +
        '<div class="fw-toast-layer" role="status" aria-live="polite"></div>' +
        '<nav class="fw-taskbar"></nav>' +
      '</div>' +
      '<aside class="coach" hidden></aside>';
    root.replaceChildren(shell);

    var el = {
      sim: shell,
      screen: shell.querySelector(".fw-screen"),
      workspace: shell.querySelector(".fw-workspace"),
      desktop: shell.querySelector(".fw-desktop"),
      windows: shell.querySelector(".fw-windows"),
      flyouts: shell.querySelector(".fw-flyouts"),
      menu: shell.querySelector(".fw-menu-layer"),
      dialog: shell.querySelector(".fw-dialog-layer"),
      overlay: shell.querySelector(".fw-overlay-layer"),
      toasts: shell.querySelector(".fw-toast-layer"),
      taskbar: shell.querySelector(".fw-taskbar"),
      coach: shell.querySelector(".coach")
    };
    el.desktop.setAttribute("aria-label", t("shell.desktop"));
    el.taskbar.setAttribute("aria-label", t("shell.taskbar"));
    el.coach.setAttribute("aria-label", t("learn.panelLabel"));

    /* ---------- Window manager ---------- */

    function findWindow(appId) {
      appId = realAppId(appId);
      return state.windows.filter(function (w) { return w.appId === appId; })[0] || null;
    }

    function windowById(id) {
      return state.windows.filter(function (w) { return w.id === id; })[0] || null;
    }

    function topVisibleWindow() {
      return state.windows
        .filter(function (w) { return w.mode !== "minimized"; })
        .sort(function (a, b) { return b.z - a.z; })[0] || null;
    }

    function workspaceSize() {
      var rect = el.workspace.getBoundingClientRect();
      return { width: rect.width || 1200, height: rect.height || 700, left: rect.left, top: rect.top, right: rect.right };
    }

    function activate(win) {
      state.windows.forEach(function (w) { w.active = w === win; });
      if (win) {
        win.z = state.nextZ++;
        state.activeWindowId = win.id;
      } else {
        state.activeWindowId = null;
      }
    }

    function focusWindow(id, renderNow) {
      var win = windowById(id);
      if (!win || win.mode === "minimized" || state.activeWindowId === id) return;
      activate(win);
      emit("window.focused", { windowId: id });
      if (renderNow !== false) render();
    }

    function openApp(requestedId) {
      var appId = realAppId(requestedId);

      if (appId === "trouble-demo" && state.troubleDemo && state.troubleDemo.closedAfterFreeze) {
        state.troubleDemo.mode = "normal";
        state.troubleDemo.frozen = false;
        state.troubleDemo.restarted = true;
        state.troubleDemo.closedAfterFreeze = false;
        emit("troubleshooting.restarted", { appId: "trouble-demo" });
      }

      if (requestedId === "recycle-bin") {
        window.DatorskolanExplorerApp.navigate(ctx, "recycle-bin", { silent: true });
      }

      var app = apps[appId];
      if (!app) return;

      state.startOpen = false;
      startWasOpen = false;
      state.quickSettingsOpen = false;
      state.calendarOpen = false;

      var existing = findWindow(appId);
      if (existing) {
        if (existing.mode === "minimized") restoreWindow(existing.id);
        else {
          focusWindow(existing.id, false);
          render();
        }
        emit("app.focused", { appId: appId, windowId: existing.id });
        return;
      }

      var size = workspaceSize();
      var offset = (state.windows.length % 6) * 28;
      var width = Math.min(app.w, Math.max(320, size.width - 40));
      var height = Math.min(app.h, Math.max(240, size.height - 30));
      var id = "window-" + appId + "-" + state.nextWindow++;
      var win = {
        id: id,
        appId: appId,
        x: Math.max(0, Math.min(Math.round((size.width - width) / 2) - 60 + offset, size.width - width)),
        y: Math.max(0, Math.min(Math.round((size.height - height) / 2) - 20 + offset, size.height - height)),
        width: width,
        height: height,
        mode: "normal",
        restore: null,
        z: 0,
        active: true
      };
      state.windows.push(win);
      activate(win);
      emit("app.opened", { appId: appId, windowId: id });
      render();
    }

    function minimizeWindow(id) {
      var win = windowById(id);
      if (!win) return;
      win.mode = "minimized";
      win.active = false;
      if (state.activeWindowId === id) activate(topVisibleWindow());
      emit("window.minimized", { windowId: id });
      render();
      focusActiveWindow();
    }

    function maximizeWindow(id) {
      var win = windowById(id);
      if (!win || win.mode === "maximized") return;
      win.restore = { x: win.x, y: win.y, width: win.width, height: win.height };
      win.mode = "maximized";
      activate(win);
      emit("window.maximized", { windowId: id });
      render();
    }

    function restoreWindow(id) {
      var win = windowById(id);
      if (!win) return;
      if (win.mode === "maximized" && win.restore) {
        win.x = win.restore.x;
        win.y = win.restore.y;
        win.width = win.restore.width;
        win.height = win.restore.height;
        win.restore = null;
      }
      win.mode = "normal";
      activate(win);
      emit("window.restored", { windowId: id });
      render();
    }

    function forceCloseWindow(id) {
      var win = windowById(id);
      if (!win) return;
      state.windows = state.windows.filter(function (w) { return w.id !== id; });
      if (state.activeWindowId === id) activate(topVisibleWindow());
      emit("window.closed", { windowId: id, appId: win.appId });
      render();
      focusActiveWindow();
    }

    // After a window closes or minimizes, Windows gives keyboard focus to the window that is now on top.
    function focusActiveWindow() {
      var node = state.activeWindowId && el.windows.querySelector("[data-window-id='" + state.activeWindowId + "']");
      if (!node || node.contains(document.activeElement)) return;
      var target = node.querySelector("textarea, input:not([type=hidden]), [role=listbox], [tabindex='0']") || node.querySelector("button");
      if (target) target.focus({ preventScroll: true });
    }

    function closeWindow(id) {
      var win = windowById(id);
      if (!win) return;

      if (win.appId === "trouble-demo" && state.troubleDemo && state.troubleDemo.mode === "frozen") {
        showDialog({
          kind: "not-responding",
          icon: "warning",
          title: t("dialog.notResponding.title", { app: appTitle("trouble-demo") }),
          message: t("dialog.notResponding.text"),
          buttons: [
            { label: t("dialog.notResponding.close"), primary: true, action: function () {
              if (state.troubleDemo) state.troubleDemo.closedAfterFreeze = true;
              emit("troubleshooting.closedFrozen", { appId: "trouble-demo" });
              forceCloseWindow(id);
            } },
            { label: t("dialog.notResponding.wait"), cancel: true, action: function () {
              if (state.troubleDemo) state.troubleDemo.waited = true;
              emit("troubleshooting.waited", { appId: "trouble-demo" });
            } }
          ]
        });
        emit("troubleshooting.notRespondingDialog", { appId: "trouble-demo" });
        return;
      }

      if (win.appId === "notepad" && state.notepadDirty) {
        window.DatorskolanBasicApps.confirmNotepadClose(ctx, id);
        return;
      }

      forceCloseWindow(id);
    }

    function snapWindow(win, side) {
      var size = workspaceSize();
      // Remember the size before snapping: dragging the window away gives it back, like Windows.
      if (!win.snapRestore) win.snapRestore = { width: win.width, height: win.height };
      win.mode = "normal";
      win.restore = null;
      win.x = side === "left" ? 0 : Math.floor(size.width / 2);
      win.y = 0;
      win.width = side === "left" ? Math.floor(size.width / 2) : Math.ceil(size.width / 2);
      win.height = size.height;
      emit("window.snapped", { windowId: win.id, appId: win.appId, side: side });
    }

    // Dragging a window by its title bar, as in Windows 11:
    // - a maximized or snapped window gets its normal size back and follows the pointer,
    // - dropping at the left/right edge snaps to half the screen, at the top edge maximizes,
    // - at least part of the title bar always stays on screen.
    function startWindowDrag(event, win, node, handle) {
      if (event.button !== 0) return;
      if (event.target.closest("button, input, a, select, textarea, [data-no-drag]")) return;
      focusWindow(win.id, false);
      el.windows.querySelectorAll(".fw-window.is-active").forEach(function (other) { other.classList.remove("is-active"); });
      node.classList.add("is-active");
      node.style.zIndex = String(win.z);

      var size = workspaceSize();
      var drag = { pointerId: event.pointerId, sx: event.clientX, sy: event.clientY, ox: event.clientX - size.left - win.x, oy: event.clientY - size.top - win.y, moved: false };

      function currentNode() { return el.windows.querySelector("[data-window-id='" + win.id + "']"); }

      function move(e) {
        if (e.pointerId !== drag.pointerId) return;
        if (!drag.moved && Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy) < 6) return;
        var area = workspaceSize();
        if (!drag.moved) {
          drag.moved = true;
          var from = win.mode === "maximized" ? win.restore : win.snapRestore;
          if (win.mode === "maximized" || win.snapRestore) {
            // Keep the pointer at the same relative place on the narrower title bar.
            var currentWidth = win.mode === "maximized" ? area.width : win.width;
            var ratio = Math.min(1, Math.max(0, (e.clientX - area.left - (win.mode === "maximized" ? 0 : win.x)) / currentWidth));
            win.width = from ? from.width : win.width;
            win.height = from ? from.height : win.height;
            win.mode = "normal";
            win.restore = null;
            win.snapRestore = null;
            drag.ox = Math.round(ratio * win.width);
            drag.oy = Math.min(drag.oy, 16);
            emit("window.restored", { windowId: win.id });
            render();
          }
        }
        win.x = Math.min(Math.max(-win.width + 120, e.clientX - area.left - drag.ox), Math.max(0, area.width - 120));
        win.y = Math.min(Math.max(0, e.clientY - area.top - drag.oy), Math.max(0, area.height - 40));
        var live = currentNode();
        if (live) {
          live.style.left = win.x + "px";
          live.style.top = win.y + "px";
          live.style.width = win.width + "px";
          live.style.height = win.height + "px";
        }
      }

      function up(e) {
        if (e.pointerId !== drag.pointerId) return;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
        if (!drag.moved) return;
        var area = workspaceSize();
        var x = e.clientX - area.left;
        if (e.clientY - area.top <= 4 && apps[win.appId].resizable !== false) { maximizeWindow(win.id); return; }
        if (x <= 24) snapWindow(win, "left");
        else if (x >= area.width - 24) snapWindow(win, "right");
        else emit("window.moved", { windowId: win.id });
        render();
      }

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    }

    function captionButtons(win) {
      var maximized = win.mode === "maximized";
      var fixedSize = apps[win.appId] && apps[win.appId].resizable === false;
      var box = h("div", { class: "fw-caption", data: { noDrag: "" } }, [
        h("button", { type: "button", class: "fw-caption-button", data: { ui: "window-minimize" }, title: t("window.minimize"), aria: { label: t("window.minimize") }, html: ui.captionGlyph("minimize"),
          on: { click: function (e) { e.stopPropagation(); minimizeWindow(win.id); } } }),
        h("button", { type: "button", class: "fw-caption-button", disabled: fixedSize, data: { ui: "window-maximize" }, title: t(maximized ? "window.restore" : "window.maximize"), aria: { label: t(maximized ? "window.restore" : "window.maximize") }, html: ui.captionGlyph(maximized ? "restore" : "maximize"),
          on: { click: function (e) { e.stopPropagation(); if (maximized) restoreWindow(win.id); else maximizeWindow(win.id); } } }),
        h("button", { type: "button", class: "fw-caption-button fw-caption-close", data: { ui: "window-close" }, title: t("window.close"), aria: { label: t("window.close") }, html: ui.captionGlyph("close"),
          on: { click: function (e) { e.stopPropagation(); closeWindow(win.id); } } })
      ]);
      return box;
    }

    function renderWindows() {
      el.windows.replaceChildren();

      state.windows.forEach(function (win) {
        if (win.mode === "minimized" || win.capturing) return;
        var app = apps[win.appId];
        var title = app.title ? app.title() : appTitle(win.appId);

        var node = h("section", {
          class: "fw-window fw-app-" + win.appId + (win.active ? " is-active" : "") + (win.mode === "maximized" ? " is-maximized" : "") + (app.chromeless ? " is-chromeless" : ""),
          aria: { label: title },
          data: { windowId: win.id, appId: win.appId },
          style: win.mode === "maximized"
            ? { left: "0", top: "0", width: "100%", height: "100%", zIndex: String(win.z) }
            : { left: win.x + "px", top: win.y + "px", width: win.width + "px", height: win.height + "px", zIndex: String(win.z) }
        });

        var body = h("div", { class: "fw-window-body" });
        var content = app.render(win);
        body.appendChild(content);

        var handle;
        if (app.chromeless) {
          // Apps like the web browser draw their own title bar; they provide a [data-titlebar] element and a [data-caption-slot].
          handle = content.querySelector("[data-titlebar]") || body;
          var slot = content.querySelector("[data-caption-slot]");
          if (slot) slot.appendChild(captionButtons(win));
          node.appendChild(body);
        } else {
          var heading = [
            h("span", { class: "fw-titlebar-icon", html: ui.icon(app.tabIconKey ? app.tabIconKey() : app.iconKey, 16) }),
            h("span", { class: "fw-titlebar-text", text: app.tabbed && app.tabTitle ? app.tabTitle() : title })
          ];
          if (app.tabbed) {
            // File Explorer and Notepad in Windows 11 show the folder or document as a tab in the title bar.
            // Closing the only tab closes the window. An unsaved Notepad tab shows a dot instead of the X.
            heading = [h("div", { class: "fw-titlebar-tab" + (app.tabDirty && app.tabDirty() ? " is-dirty" : "") }, heading.concat([
              h("button", { type: "button", class: "fw-titlebar-tab-close", title: t("window.closeTab"), aria: { label: t("window.closeTab") },
                html: '<span class="fw-titlebar-tab-dot" aria-hidden="true"></span>' + ui.captionGlyph("close"),
                on: { click: function (e) { e.stopPropagation(); closeWindow(win.id); } } })
            ])), h("span", { class: "fw-titlebar-fill" })];
          }
          handle = h("header", { class: "fw-titlebar" + (app.tabbed ? " is-tabbed" : "") }, heading.concat([captionButtons(win)]));
          node.appendChild(handle);
          node.appendChild(body);
        }

        handle.addEventListener("pointerdown", function (e) { startWindowDrag(e, win, node, handle); });
        handle.addEventListener("dblclick", function (e) {
          if (e.target.closest("button, input, a, [data-no-drag]")) return;
          if (app.resizable === false) return;
          if (win.mode === "maximized") restoreWindow(win.id);
          else maximizeWindow(win.id);
        });

        if (win.mode === "normal" && app.resizable !== false) {
          var grip = h("div", { class: "fw-resize-grip", aria: { hidden: "true" } });
          grip.addEventListener("pointerdown", function (e) {
            if (e.button !== 0) return;
            e.stopPropagation();
            focusWindow(win.id, false);
            var start = { id: e.pointerId, x: e.clientX, y: e.clientY, w: win.width, h: win.height };
            grip.setPointerCapture(e.pointerId);
            function move(ev) {
              if (ev.pointerId !== start.id) return;
              var size = workspaceSize();
              win.width = Math.max(app.minW || 320, Math.min(size.width - win.x, start.w + ev.clientX - start.x));
              win.height = Math.max(app.minH || 200, Math.min(size.height - win.y, start.h + ev.clientY - start.y));
              node.style.width = win.width + "px";
              node.style.height = win.height + "px";
            }
            function up(ev) {
              if (ev.pointerId !== start.id) return;
              grip.removeEventListener("pointermove", move);
              grip.removeEventListener("pointerup", up);
              emit("window.resized", { windowId: win.id, width: Math.round(win.width), height: Math.round(win.height) });
              render();
            }
            grip.addEventListener("pointermove", move);
            grip.addEventListener("pointerup", up);
          });
          node.appendChild(grip);
        }

        node.addEventListener("pointerdown", function () {
          if (state.activeWindowId !== win.id) {
            focusWindow(win.id, false);
            el.windows.querySelectorAll(".fw-window").forEach(function (other) {
              other.classList.toggle("is-active", other === node);
            });
            node.style.zIndex = String(win.z);
            renderTaskbar();
          }
        }, true);

        el.windows.appendChild(node);
      });
    }

    // Re-render a single app's window body (used by apps after internal state changes).
    function refreshApp(appId) {
      renderWindows();
      renderTaskbar();
      applyLearningHighlight();
    }

    /* ---------- Desktop ---------- */

    /* ---------- Desktop layout: View and Sort by ---------- */

    // Cell size per icon size: Small 32 px, Medium 48 px (default), Large 96 px icons.
    var DESKTOP_CELL = { small: { w: 80, h: 76, icon: 32 }, medium: { w: 96, h: 100, icon: 48 }, large: { w: 128, h: 148, icon: 96 } };
    var DESKTOP_MARGIN = 12;

    function desktopCell() { return DESKTOP_CELL[state.desktopView.size] || DESKTOP_CELL.medium; }

    // Puts the icons in columns from the top left, in their current order.
    function arrangeDesktop() {
      var cell = desktopCell();
      var desktopNode = typeof el !== "undefined" && el ? el.desktop : null;
      var height = Math.max(cell.h, (desktopNode ? desktopNode.clientHeight : 0) || 600) - DESKTOP_MARGIN;
      var perColumn = Math.max(1, Math.floor(height / cell.h));
      state.desktopItems.forEach(function (item, index) {
        item.x = DESKTOP_MARGIN + Math.floor(index / perColumn) * cell.w;
        item.y = DESKTOP_MARGIN + (index % perColumn) * cell.h;
      });
    }

    function snapToGrid(item) {
      var cell = desktopCell();
      item.x = DESKTOP_MARGIN + Math.max(0, Math.round((item.x - DESKTOP_MARGIN) / cell.w)) * cell.w;
      item.y = DESKTOP_MARGIN + Math.max(0, Math.round((item.y - DESKTOP_MARGIN) / cell.h)) * cell.h;
    }

    // Windows sorts "virtual" items such as the Recycle Bin first, then folders, then files.
    function sortDesktop(by) {
      var rank = function (item) { return item.appId === "recycle-bin" ? 0 : 1; };
      var name = function (item) { return t(item.labelKey); };
      state.desktopItems.sort(function (a, b) {
        if (rank(a) !== rank(b)) return rank(a) - rank(b);
        var size = function (item) { return item.folderId ? vfs.list(item.folderId).length : 0; };
        if (by === "size" && size(a) !== size(b)) return size(b) - size(a);
        return name(a).localeCompare(name(b), I18n.intlLocale());
      });
      state.desktopView.sortBy = by;
      arrangeDesktop();
      emit("desktop.sorted", { by: by });
      renderDesktop();
    }

    function setDesktopView(patch) {
      Object.assign(state.desktopView, patch);
      if (patch.size || patch.autoArrange) arrangeDesktop();
      else if (patch.alignToGrid) state.desktopItems.forEach(snapToGrid);
      emit("desktop.viewChanged", Object.assign({}, state.desktopView));
      renderDesktop();
    }

    function desktopViewMenu() {
      var v = state.desktopView;
      return [
        { label: t("desktop.view.large"), radio: true, checked: v.size === "large", ui: "desktop-view-large", action: function () { setDesktopView({ size: "large" }); } },
        { label: t("desktop.view.medium"), radio: true, checked: v.size === "medium", ui: "desktop-view-medium", action: function () { setDesktopView({ size: "medium" }); } },
        { label: t("desktop.view.small"), radio: true, checked: v.size === "small", ui: "desktop-view-small", action: function () { setDesktopView({ size: "small" }); } },
        "sep",
        { label: t("desktop.view.autoArrange"), checked: v.autoArrange, ui: "desktop-auto-arrange", action: function () { setDesktopView({ autoArrange: !v.autoArrange }); } },
        { label: t("desktop.view.alignToGrid"), checked: v.alignToGrid, ui: "desktop-align-grid", action: function () { setDesktopView({ alignToGrid: !v.alignToGrid }); } },
        "sep",
        { label: t("desktop.view.showIcons"), checked: v.showIcons, ui: "desktop-show-icons", action: function () { setDesktopView({ showIcons: !v.showIcons }); } }
      ];
    }

    function desktopSortMenu() {
      return ["name", "size", "type", "date"].map(function (by) {
        return { label: t("desktop.sort." + by), radio: true, checked: state.desktopView.sortBy === by, ui: "desktop-sort-" + by, action: function () { sortDesktop(by); } };
      });
    }

    function renderDesktop() {
      el.desktop.replaceChildren();
      var view = state.desktopView;
      var cell = desktopCell();
      el.desktop.className = "fw-desktop is-" + view.size + "-icons";
      if (!view.showIcons) return;

      state.desktopItems.forEach(function (item) {
        var label = t(item.labelKey);
        var selected = state.selected === item.id || state.desktopMulti.indexOf(item.id) >= 0;
        var button = h("button", {
          type: "button",
          class: "fw-desktop-icon" + (selected ? " is-selected" : ""),
          data: { itemId: item.id, ui: "desktop-" + item.id },
          aria: { label: label },
          style: { left: item.x + "px", top: item.y + "px" }
        }, [
          h("span", { class: "fw-desktop-icon-image", html: ui.icon(item.iconKey, cell.icon) }),
          h("span", { class: "fw-desktop-icon-label", text: label })
        ]);

        var drag = null;

        button.addEventListener("click", function (e) {
          e.stopPropagation();
          state.selected = item.id;
          state.desktopMulti = [];
          el.desktop.querySelectorAll(".fw-desktop-icon").forEach(function (n) { n.classList.toggle("is-selected", n === button); });
          emit("desktop.item.selected", { itemId: item.id });
        });

        function openItem() {
          emit("desktop.item.doubleClicked", { itemId: item.id });
          if (item.appId === "recycle-bin") openApp("recycle-bin");
          else openExplorerAt(item.folderId);
        }

        button.addEventListener("dblclick", function (e) {
          e.stopPropagation();
          openItem();
        });

        button.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            openItem();
          }
        });

        button.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          e.stopPropagation();
          state.selected = item.id;
          openMenu({
            kind: "item",
            itemId: item.id,
            x: e.clientX,
            y: e.clientY,
            items: [
              { label: t("menu.open"), shortcut: t("key.enter"), bold: true, action: openItem },
              "sep",
              item.appId === "recycle-bin"
                ? { label: t("explorer.emptyRecycleBin"), disabled: vfs.list("recycle-bin").length === 0, action: function () { window.DatorskolanExplorerApp.confirmEmptyRecycleBin(ctx); } }
                : { label: t("menu.pinToStart"), disabled: true },
              "sep",
              { label: t("menu.properties"), shortcut: "Alt+" + t("key.enter"), action: function () { window.DatorskolanExplorerApp.showProperties(ctx, vfs.get(item.folderId)); } }
            ]
          });
        });

        button.addEventListener("pointerdown", function (e) {
          if (e.button !== 0) return;
          drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ix: item.x, iy: item.y, moved: false };
          button.setPointerCapture(e.pointerId);
        });

        button.addEventListener("pointermove", function (e) {
          if (!drag || e.pointerId !== drag.id) return;
          var dx = e.clientX - drag.sx;
          var dy = e.clientY - drag.sy;
          if (!drag.moved && Math.abs(dx) + Math.abs(dy) <= 5) return;
          drag.moved = true;
          var size = workspaceSize();
          item.x = Math.max(0, Math.min(size.width - cell.w, drag.ix + dx));
          item.y = Math.max(0, Math.min(size.height - cell.h, drag.iy + dy));
          button.style.left = item.x + "px";
          button.style.top = item.y + "px";
        });

        button.addEventListener("pointerup", function (e) {
          if (!drag || e.pointerId !== drag.id) return;
          var moved = drag.moved;
          drag = null;
          if (moved) {
            if (view.autoArrange) {
              // Auto arrange: the icon takes the place it was dropped at in the column order.
              state.desktopItems.sort(function (a, b) { return (a.x - b.x) * 1000 + (a.y - b.y); });
              arrangeDesktop();
            } else if (view.alignToGrid) {
              snapToGrid(item);
            } else {
              item.x = Math.round(item.x);
              item.y = Math.round(item.y);
            }
            emit("desktop.item.moved", { itemId: item.id, x: item.x, y: item.y });
            renderDesktop();
          }
        });

        el.desktop.appendChild(button);
      });
    }

    // Dragging on the empty desktop draws the blue selection rectangle and selects the icons it touches.
    function startDesktopMarquee(e) {
      var origin = el.desktop.getBoundingClientRect();
      var start = { x: e.clientX - origin.left, y: e.clientY - origin.top };
      var box = null;
      function move(ev) {
        var x = ev.clientX - origin.left;
        var y = ev.clientY - origin.top;
        if (!box) {
          if (Math.abs(x - start.x) + Math.abs(y - start.y) < 4) return;
          box = h("div", { class: "fw-desktop-marquee", aria: { hidden: "true" } });
          el.desktop.appendChild(box);
        }
        var r = { left: Math.min(x, start.x), top: Math.min(y, start.y), right: Math.max(x, start.x), bottom: Math.max(y, start.y) };
        box.style.left = r.left + "px";
        box.style.top = r.top + "px";
        box.style.width = (r.right - r.left) + "px";
        box.style.height = (r.bottom - r.top) + "px";
        var hits = [];
        el.desktop.querySelectorAll(".fw-desktop-icon").forEach(function (node) {
          var n = node.getBoundingClientRect();
          var hit = n.left - origin.left < r.right && n.right - origin.left > r.left && n.top - origin.top < r.bottom && n.bottom - origin.top > r.top;
          node.classList.toggle("is-selected", hit);
          if (hit) hits.push(node.getAttribute("data-item-id"));
        });
        state.desktopMulti = hits;
        state.selected = hits[hits.length - 1] || null;
      }
      function up() {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        if (box) {
          box.remove();
          emit("desktop.itemsSelected", { count: state.desktopMulti.length });
        }
      }
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    }

    /* ---------- Taskbar ---------- */

    function taskbarButton(props, children) {
      return h("button", Object.assign({ type: "button", class: "fw-tb-button" }, props), children);
    }

    function renderTaskbar() {
      el.taskbar.replaceChildren();

      var coach = taskbarButton({
        class: "fw-tb-coach" + (state.coachOpen ? " is-open" : ""),
        data: { ui: "coach-toggle" },
        aria: { expanded: state.coachOpen ? "true" : "false", label: t("learn.toggle") },
        title: t("learn.toggle"),
        on: { click: function (e) { e.stopPropagation(); setCoachOpen(!state.coachOpen); } }
      }, [
        h("span", { class: "fw-tb-coach-icon", html: ui.icon("school", 20) }),
        h("span", { class: "fw-tb-coach-label", text: "Datorskolan" })
      ]);

      var center = h("div", { class: "fw-tb-center" });

      center.appendChild(taskbarButton({
        class: "fw-tb-button fw-tb-start" + (state.startOpen ? " is-pressed" : ""),
        data: { ui: "start" },
        title: t("shell.start"),
        aria: { label: t("shell.start"), expanded: state.startOpen ? "true" : "false" },
        html: ui.icon("start", 24),
        on: { click: function (e) { e.stopPropagation(); setStart(!state.startOpen); } }
      }));

      var search = taskbarButton({
        class: "fw-tb-search",
        data: { ui: "taskbar-search" },
        aria: { label: t("shell.searchBox") },
        on: { click: function (e) { e.stopPropagation(); setStart(true, { focusSearch: true }); } }
      }, [
        h("span", { html: ui.glyph("search", 16) }),
        h("span", { text: t("shell.searchBox") })
      ]);
      center.appendChild(search);

      var ids = state.shell.pinnedTaskbar.filter(function (id) { return apps[id]; });
      state.windows.forEach(function (w) {
        if (ids.indexOf(w.appId) === -1) ids.push(w.appId);
      });

      ids.forEach(function (id) {
        var win = findWindow(id);
        var running = !!win;
        var active = running && win.active && win.mode !== "minimized";
        var label = appTitle(id) + (running ? " – " + t(active ? "shell.state.active" : "shell.state.running") : "");
        var button = taskbarButton({
          class: "fw-tb-button fw-tb-app" + (running ? " is-running" : "") + (active ? " is-active" : ""),
          data: { appId: id, ui: "taskbar-" + id },
          title: appTitle(id),
          aria: { label: label },
          html: ui.icon(apps[id].iconKey, 24),
          on: {
            click: function (e) {
              e.stopPropagation();
              if (!win) openApp(id);
              else if (win.mode === "minimized") restoreWindow(win.id);
              else if (win.active) minimizeWindow(win.id);
              else focusWindow(win.id);
            },
            contextmenu: function (e) {
              e.preventDefault();
              e.stopPropagation();
              var pinned = isPinnedToTaskbar(id);
              var items = [
                { label: appTitle(id), iconKey: apps[id].iconKey, action: function () { openApp(id); } },
                "sep",
                { label: t(pinned ? "menu.unpinTaskbar" : "menu.pinTaskbar"), action: function () {
                  setPin("pinnedTaskbar", id, !pinned, pinned ? "shell.taskbarUnpinned" : "shell.taskbarPinned");
                } }
              ];
              if (win) items.push({ label: t("menu.closeWindow"), action: function () { closeWindow(win.id); } });
              openMenu({ kind: "taskbar-app", itemId: id, x: e.clientX, y: e.clientY, items: items, anchor: "above" });
            }
          }
        });
        center.appendChild(button);
      });

      var tray = h("div", { class: "fw-tb-tray" });
      var settings = window.DatorskolanSettingsApp.ensure(state);
      var connected = settings.wifiEnabled && !!settings.wifiNetwork;

      tray.appendChild(taskbarButton({
        class: "fw-tb-tray-button fw-tb-quick" + (state.quickSettingsOpen ? " is-pressed" : ""),
        data: { ui: "quick-settings" },
        aria: { label: t("shell.quickSettings"), expanded: state.quickSettingsOpen ? "true" : "false" },
        title: t(connected ? "shell.trayTooltipConnected" : "shell.trayTooltip", { network: settings.wifiNetwork || "" }),
        on: { click: function (e) { e.stopPropagation(); toggleFlyout("quick"); } }
      }, [
        h("span", { class: "fw-tray-icon" + (settings.wifiEnabled ? "" : " is-off"), html: ui.icon("wifi", 16) }),
        h("span", { class: "fw-tray-icon", html: settings.volume === 0 ? ui.glyph("volume-mute", 16) : ui.icon("speaker", 16) }),
        h("span", { class: "fw-tray-icon", html: ui.icon("battery", 16) })
      ]));

      var now = new Date();
      tray.appendChild(taskbarButton({
        class: "fw-tb-tray-button fw-tb-clock" + (state.calendarOpen ? " is-pressed" : ""),
        data: { ui: "clock" },
        aria: { label: t("shell.clock", { time: formatTime(now), date: formatDate(now, true) }) },
        on: { click: function (e) { e.stopPropagation(); toggleFlyout("calendar"); } }
      }, [
        h("span", { text: formatTime(now) }),
        h("span", { text: formatDate(now) })
      ]));

      tray.appendChild(h("button", {
        type: "button",
        class: "fw-tb-show-desktop",
        title: t("shell.showDesktop"),
        aria: { label: t("shell.showDesktop") },
        on: { click: function (e) {
          e.stopPropagation();
          state.windows.forEach(function (w) { if (w.mode !== "minimized") { w.mode = "minimized"; w.active = false; } });
          state.activeWindowId = null;
          emit("desktop.shown", {});
          render();
        } }
      }));

      el.taskbar.appendChild(coach);
      el.taskbar.appendChild(center);
      el.taskbar.appendChild(tray);
    }

    function formatTime(date) {
      return date.toLocaleTimeString(I18n.intlLocale(), { hour: "2-digit", minute: "2-digit" });
    }

    function formatDate(date, long) {
      return long
        ? date.toLocaleDateString(I18n.intlLocale(), { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : date.toLocaleDateString(I18n.intlLocale(), { year: "numeric", month: "2-digit", day: "2-digit" });
    }

    /* ---------- Start menu (Windows 11, scrollable layout) ---------- */

    function setStart(open, options) {
      options = options || {};
      if (state.startOpen === open && !options.focusSearch) return;
      state.startOpen = open;
      state.startQuery = "";
      state.quickSettingsOpen = false;
      state.calendarOpen = false;
      closeMenu(true);
      if (open !== startWasOpen) emit(open ? "startMenu.opened" : "startMenu.closed", {});
      startWasOpen = open;
      render();
      if (open) {
        window.setTimeout(function () {
          var input = el.flyouts.querySelector(".fw-start-search input");
          if (input) input.focus();
        }, 0);
      }
    }
    var startWasOpen = false;

    function startAppTile(id, size) {
      var app = apps[id];
      return h("button", {
        type: "button",
        class: "fw-start-tile",
        title: appTitle(id),
        data: { appId: id, ui: "start-app-" + id },
        on: {
          click: function () { openApp(id); },
          contextmenu: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var pinnedStart = isPinnedToStart(id);
            var pinnedBar = isPinnedToTaskbar(id);
            openMenu({
              kind: "start-app",
              itemId: id,
              x: e.clientX,
              y: e.clientY,
              items: [
                { label: t(pinnedStart ? "menu.unpinStart" : "menu.pinToStart"), action: function () {
                  setPin("pinnedStart", id, !pinnedStart, pinnedStart ? "shell.startUnpinned" : "shell.startPinned");
                } },
                { label: t(pinnedBar ? "menu.unpinTaskbar" : "menu.pinTaskbar"), action: function () {
                  setPin("pinnedTaskbar", id, !pinnedBar, pinnedBar ? "shell.taskbarUnpinned" : "shell.taskbarPinned");
                } }
              ]
            });
          }
        }
      }, [
        h("span", { class: "fw-start-tile-icon", html: ui.icon(app.iconKey, size || 32) }),
        h("span", { class: "fw-start-tile-label", text: appTitle(id) })
      ]);
    }

    function renderStart(container) {
      var panel = h("section", { class: "fw-flyout fw-start", aria: { label: t("shell.start") }, data: { ui: "start-menu" } });

      var input = h("input", {
        type: "search",
        placeholder: t("start.searchPlaceholder"),
        aria: { label: t("start.searchPlaceholder") },
        autocomplete: "off",
        spellcheck: false
      });
      input.value = state.startQuery;
      panel.appendChild(h("div", { class: "fw-start-search" }, [h("span", { html: ui.glyph("search", 16) }), input]));

      var body = h("div", { class: "fw-start-body" });
      var startBody = body;
      panel.appendChild(body);

      function results(query) {
        var normalized = I18n.lower(query);
        return startApps().filter(function (id) {
          var title = I18n.lower(appTitle(id));
          // Extra search words, e.g. "chrome" or "edge" also finds the neutral practice browser.
          var keywords = I18n.has("search.keywords." + id) ? I18n.lower(t("search.keywords." + id)).split(/\s+/) : [];
          return title.indexOf(normalized) >= 0 || title.split(/\s+/).concat(keywords).some(function (word) { return word.indexOf(normalized) === 0; });
        });
      }

      function drawHome() {
        body.replaceChildren();

        var pinned = state.shell.pinnedStart.filter(function (id) { return apps[id]; });
        var visible = state.startShowAllPins ? pinned : pinned.slice(0, 12);
        var pinnedHead = h("div", { class: "fw-start-section-head" }, [h("h2", { text: t("start.pinned") })]);
        if (pinned.length > 12) {
          pinnedHead.appendChild(h("button", {
            type: "button",
            class: "fw-subtle-button",
            text: t(state.startShowAllPins ? "start.showLess" : "start.showAll"),
            on: { click: function () { state.startShowAllPins = !state.startShowAllPins; drawHome(); } }
          }));
        }
        body.appendChild(pinnedHead);
        var grid = h("div", { class: "fw-start-grid" });
        visible.forEach(function (id) { grid.appendChild(startAppTile(id)); });
        if (!visible.length) grid.appendChild(h("p", { class: "fw-start-empty", text: t("start.noPins") }));
        body.appendChild(grid);

        body.appendChild(h("div", { class: "fw-start-section-head" }, [h("h2", { text: t("start.recommended") })]));
        var recommended = h("div", { class: "fw-start-recommended" });
        var recent = vfs.list("documents").concat(vfs.list("downloads")).filter(function (n) { return n.type === "file"; }).slice(0, 4);
        recent.forEach(function (node) {
          recommended.appendChild(h("button", {
            type: "button",
            class: "fw-start-recent",
            on: { click: function () { state.startOpen = false; openFile(node); } }
          }, [
            h("span", { html: nodeIcon(node, 32) }),
            h("span", { class: "fw-start-recent-text" }, [
              h("strong", { text: node.name }),
              h("small", { text: displayName(vfs.get(node.parentId)) })
            ])
          ]));
        });
        body.appendChild(recommended);

        body.appendChild(h("div", { class: "fw-start-section-head" }, [h("h2", { text: t("start.all") })]));
        var all = h("div", { class: "fw-start-all" });
        startApps().sort(function (a, b) {
          return appTitle(a).localeCompare(appTitle(b), I18n.intlLocale());
        }).forEach(function (id) {
          all.appendChild(h("button", {
            type: "button",
            class: "fw-start-list-item",
            on: {
              click: function () { openApp(id); },
              contextmenu: function (e) { startAppTile(id).dispatchEvent(new MouseEvent("contextmenu", e)); }
            }
          }, [h("span", { html: ui.icon(apps[id].iconKey, 24) }), h("span", { text: appTitle(id) })]));
        });
        body.appendChild(all);
      }

      function drawResults(query) {
        var body = startBody;
        body.replaceChildren();
        var matches = results(query);
        if (!matches.length) {
          body.appendChild(h("p", { class: "fw-start-empty", role: "status", text: t("start.noResults", { query: query }) }));
          return;
        }
        // Windows 11 search: results on the left, the best match described on the right with its actions.
        var resultsColumn = h("div", { class: "fw-start-results" });
        var detail = h("div", { class: "fw-start-detail" });
        var resultsHost = body;
        body = resultsColumn;
        body.appendChild(h("div", { class: "fw-start-section-head" }, [h("h2", { text: t("start.bestMatch") })]));
        var best = matches[0];
        var pinnedStart = isPinnedToStart(best);
        var pinnedBar = isPinnedToTaskbar(best);
        detail.appendChild(h("span", { class: "fw-start-detail-icon", html: ui.icon(apps[best].iconKey, 64) }));
        detail.appendChild(h("strong", { class: "fw-start-detail-name", text: appTitle(best) }));
        detail.appendChild(h("small", { text: t("start.app") }));
        detail.appendChild(h("div", { class: "fw-start-detail-actions", role: "group", aria: { label: appTitle(best) } }, [
          h("button", { type: "button", data: { ui: "start-detail-open" }, on: { click: function () { openApp(best); } } }, [h("span", { html: ui.glyph("open", 16) }), h("span", { text: t("menu.open") })]),
          h("button", { type: "button", on: { click: function () { setPin("pinnedStart", best, !pinnedStart, pinnedStart ? "shell.startUnpinned" : "shell.startPinned"); } } }, [h("span", { html: ui.icon("pin", 16) }), h("span", { text: t(pinnedStart ? "menu.unpinStart" : "menu.pinToStart") })]),
          h("button", { type: "button", on: { click: function () { setPin("pinnedTaskbar", best, !pinnedBar, pinnedBar ? "shell.taskbarUnpinned" : "shell.taskbarPinned"); } } }, [h("span", { html: ui.icon("pin", 16) }), h("span", { text: t(pinnedBar ? "menu.unpinTaskbar" : "menu.pinTaskbar") })])
        ]));
        resultsHost.appendChild(h("div", { class: "fw-start-search-layout" }, [resultsColumn, detail]));
        body.appendChild(h("button", {
          type: "button",
          class: "fw-start-best",
          data: { appId: best, ui: "start-app-" + best },
          on: { click: function () { openApp(best); } }
        }, [
          h("span", { html: ui.icon(apps[best].iconKey, 40) }),
          h("span", {}, [h("strong", { text: appTitle(best) }), h("small", { text: t("start.app") })])
        ]));
        if (matches.length > 1) {
          body.appendChild(h("div", { class: "fw-start-section-head" }, [h("h2", { text: t("start.apps") })]));
          matches.slice(1).forEach(function (id) {
            body.appendChild(h("button", { type: "button", class: "fw-start-list-item", data: { appId: id }, on: { click: function () { openApp(id); } } }, [
              h("span", { html: ui.icon(apps[id].iconKey, 24) }), h("span", { text: appTitle(id) })
            ]));
          });
        }
      }

      input.addEventListener("input", function () {
        state.startQuery = input.value;
        emit("startMenu.searched", { query: input.value, queryNormalized: I18n.lower(input.value) });
        if (input.value.trim()) drawResults(input.value.trim());
        else drawHome();
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && input.value.trim()) {
          var matches = results(input.value.trim());
          if (matches.length) openApp(matches[0]);
        }
      });

      if (state.startQuery.trim()) drawResults(state.startQuery.trim());
      else drawHome();

      var footer = h("div", { class: "fw-start-footer" }, [
        // The account button opens the account menu (Windows 11: Change account settings, Lock).
        h("button", {
          type: "button",
          class: "fw-start-user fw-subtle-button",
          aria: { haspopup: "menu" },
          data: { ui: "start-account" },
          on: { click: function (e) {
            e.stopPropagation();
            var rect = e.currentTarget.getBoundingClientRect();
            openMenu({
              kind: "power",
              x: rect.left,
              y: rect.top,
              anchor: "above",
              items: [
                { label: t("start.accountSettings"), iconKey: "person", action: function () {
                  window.DatorskolanSettingsApp.ensure(state).page = "accounts";
                  openApp("settings");
                  refreshApp("settings");
                } },
                "sep",
                { label: t("power.lock"), glyph: "lock", action: function () { powerAction("lock"); } }
              ]
            });
          } }
        }, [h("span", { class: "fw-avatar", text: t("shell.userInitial") }), h("span", { text: t("shell.userName") })]),
        h("button", {
          type: "button",
          class: "fw-subtle-button fw-icon-button",
          data: { ui: "power" },
          title: t("power.button"),
          aria: { label: t("power.button") },
          html: ui.glyph("power", 16),
          on: { click: function (e) {
            e.stopPropagation();
            var rect = e.currentTarget.getBoundingClientRect();
            openMenu({
              kind: "power",
              x: rect.left,
              y: rect.top,
              anchor: "above",
              items: [
                { label: t("power.sleep"), glyph: "sleep", action: function () { powerAction("sleep"); } },
                { label: t("power.shutdown"), glyph: "power", action: function () { powerAction("shutdown"); } },
                { label: t("power.restart"), glyph: "refresh", action: function () { powerAction("restart"); } }
              ]
            });
          } }
        })
      ]);
      panel.appendChild(footer);
      container.appendChild(panel);
    }

    function powerAction(kind) {
      state.startOpen = false;
      startWasOpen = false;
      emit("power.selected", { action: kind });
      state.powerOverlay = kind;
      render();
      window.setTimeout(function () {
        state.powerOverlay = null;
        render();
      }, kind === "lock" || kind === "sleep" ? 1400 : 2200);
    }

    function renderOverlay() {
      el.overlay.replaceChildren();
      if (!state.powerOverlay) return;
      var text = {
        lock: t("power.overlay.lock"),
        sleep: t("power.overlay.sleep"),
        shutdown: t("power.overlay.shutdown"),
        restart: t("power.overlay.restart")
      }[state.powerOverlay];
      el.overlay.appendChild(h("div", { class: "fw-power-overlay is-" + state.powerOverlay, role: "status" }, [
        h("div", { class: "fw-spinner", aria: { hidden: "true" } }),
        h("p", { text: text }),
        h("small", { text: t("power.overlay.note") })
      ]));
    }

    /* ---------- Quick settings and calendar flyouts ---------- */

    function toggleFlyout(name) {
      var quick = name === "quick" && !state.quickSettingsOpen;
      var calendar = name === "calendar" && !state.calendarOpen;
      state.quickSettingsOpen = quick;
      state.quickSettingsView = "main";
      state.calendarOpen = calendar;
      if (calendar) state.calendarView = null; // opens on today's month, like Windows
      state.startOpen = false;
      startWasOpen = false;
      closeMenu(true);
      if (quick) emit("quickSettings.opened", {});
      render();
    }

    function renderQuickSettings(container) {
      var s = window.DatorskolanSettingsApp.ensure(state);
      var panel = h("section", { class: "fw-flyout fw-quick", aria: { label: t("shell.quickSettings") } });

      if (state.quickSettingsView === "wifi") {
        panel.appendChild(window.DatorskolanSettingsApp.renderWifiFlyout(ctx, function () {
          state.quickSettingsView = "main";
          render();
        }));
        container.appendChild(panel);
        return;
      }

      function tile(key, label, iconHtml, on, onToggle, onMore, sub) {
        var main = h("button", {
          type: "button",
          class: "fw-quick-tile-main",
          aria: { pressed: on ? "true" : "false", label: label },
          html: iconHtml,
          on: { click: onToggle }
        });
        var tileNode = h("div", { class: "fw-quick-tile" + (on ? " is-on" : "") + (onMore ? " has-more" : ""), data: { ui: "quick-" + key } }, [main]);
        if (onMore) {
          tileNode.appendChild(h("button", {
            type: "button",
            class: "fw-quick-tile-more",
            aria: { label: t("quick.more", { name: label }) },
            html: ui.glyph("chevron-right", 16),
            on: { click: onMore }
          }));
        }
        return h("div", { class: "fw-quick-cell" }, [tileNode, h("span", { class: "fw-quick-label", text: label }), sub ? h("span", { class: "fw-quick-sub", text: sub }) : null]);
      }

      var grid = h("div", { class: "fw-quick-grid" }, [
        tile("wifi", t("quick.wifi"), ui.icon("wifi", 16), s.wifiEnabled, function () {
          s.wifiEnabled = !s.wifiEnabled;
          if (!s.wifiEnabled) s.wifiNetwork = null;
          emit("settings.wifiToggled", { enabled: s.wifiEnabled });
          render();
        }, function () {
          state.quickSettingsView = "wifi";
          render();
        }, s.wifiNetwork || (s.wifiEnabled ? t("quick.notConnected") : t("common.off"))),
        tile("bluetooth", t("quick.bluetooth"), ui.icon("bluetooth", 16), s.bluetoothEnabled, function () {
          s.bluetoothEnabled = !s.bluetoothEnabled;
          emit("settings.bluetoothToggled", { enabled: s.bluetoothEnabled });
          render();
        }, function () {
          s.page = "bluetooth";
          openApp("settings");
          refreshApp("settings");
        }, s.bluetoothDevice || (s.bluetoothEnabled ? t("common.on") : t("common.off"))),
        tile("airplane", t("quick.airplane"), ui.glyph("airplane", 16), !!s.airplane, function () {
          s.airplane = !s.airplane;
          if (s.airplane) { s.wifiEnabled = false; s.wifiNetwork = null; s.bluetoothEnabled = false; }
          emit("settings.airplaneToggled", { enabled: s.airplane });
          render();
        }),
        tile("saver", t("quick.batterySaver"), ui.glyph("battery-saver", 16), !!s.batterySaver, function () {
          s.batterySaver = !s.batterySaver;
          render();
        }),
        tile("accessibility", t("quick.accessibility"), ui.glyph("accessibility", 16), false, function () {
          state.quickSettingsOpen = false;
          s.page = "accessibility";
          openApp("settings");
          refreshApp("settings");
        })
      ]);
      panel.appendChild(grid);

      function slider(key, glyphHtml, value, label, onInput) {
        var input = h("input", { type: "range", min: "0", max: "100", value: String(value), aria: { label: label } });
        input.addEventListener("input", function () { onInput(Number(input.value)); });
        return h("div", { class: "fw-quick-slider", data: { ui: "quick-" + key } }, [h("span", { html: glyphHtml }), input]);
      }

      panel.appendChild(slider("brightness", ui.glyph("sun", 16), s.brightness == null ? 80 : s.brightness, t("quick.brightness"), function (v) { s.brightness = v; }));
      panel.appendChild(slider("volume", ui.icon("speaker", 16), s.volume, t("quick.volume"), function (v) {
        s.volume = v;
        emit("settings.volumeChanged", { volume: v });
      }));

      panel.appendChild(h("div", { class: "fw-quick-footer" }, [
        h("span", { class: "fw-quick-battery" }, [h("span", { html: ui.icon("battery", 16) }), h("span", { text: t("quick.battery", { percent: 83 }) })]),
        h("button", {
          type: "button",
          class: "fw-subtle-button fw-icon-button",
          title: t("app.settings"),
          aria: { label: t("app.settings") },
          html: ui.icon("settings", 16),
          on: { click: function () { state.quickSettingsOpen = false; openApp("settings"); } }
        })
      ]));

      container.appendChild(panel);
    }

    // Windows 11 calendar flyout: month title with up/down arrows, six weeks, today in the accent colour.
    // Days are a grid with one tab stop; the arrow keys move between days (and across months).
    function renderCalendar(container) {
      var now = new Date();
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (!state.calendarView) state.calendarView = { year: today.getFullYear(), month: today.getMonth(), focus: today.getTime() };
      var view = state.calendarView;
      var locale = I18n.intlLocale();

      var panel = h("section", { class: "fw-flyout fw-calendar", aria: { label: t("shell.calendar") } });
      panel.appendChild(h("div", { class: "fw-notifications" }, [
        h("h2", { text: t("shell.notifications") }),
        h("p", { text: t("shell.noNotifications") })
      ]));

      var cal = h("div", { class: "fw-calendar-month" });
      cal.appendChild(h("h2", { class: "fw-calendar-today", text: today.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" }) }));

      function show(year, month, focusTime, focusSelector, selectedTime) {
        var d = new Date(year, month, 1);
        state.calendarView = { year: d.getFullYear(), month: d.getMonth(), focus: focusTime, selected: selectedTime !== undefined ? selectedTime : view.selected };
        emit("calendar.monthChanged", { year: d.getFullYear(), month: d.getMonth() + 1 });
        renderFlyouts();
        var target = el.flyouts.querySelector(focusSelector || ".fw-calendar-day[tabindex='0']");
        if (target) target.focus({ preventScroll: true });
      }

      var shown = new Date(view.year, view.month, 1);
      var head = h("div", { class: "fw-calendar-head" }, [
        h("p", { class: "fw-calendar-title", id: "fw-calendar-title", aria: { live: "polite" }, text: shown.toLocaleDateString(locale, { month: "long", year: "numeric" }) }),
        h("div", { class: "fw-calendar-nav" }, [
          h("button", { type: "button", class: "fw-icon-button", title: t("calendar.previousMonth"), aria: { label: t("calendar.previousMonth") }, data: { ui: "calendar-previous" }, html: ui.glyph("chevron-up", 16),
            on: { click: function () { show(view.year, view.month - 1, new Date(view.year, view.month - 1, 1).getTime(), "[data-ui='calendar-previous']"); } } }),
          h("button", { type: "button", class: "fw-icon-button", title: t("calendar.nextMonth"), aria: { label: t("calendar.nextMonth") }, data: { ui: "calendar-next" }, html: ui.glyph("chevron-down", 16),
            on: { click: function () { show(view.year, view.month + 1, new Date(view.year, view.month + 1, 1).getTime(), "[data-ui='calendar-next']"); } } })
        ])
      ]);
      cal.appendChild(head);

      var grid = h("div", { class: "fw-calendar-grid", role: "grid", aria: { labelledby: "fw-calendar-title" } });
      var headRow = h("div", { class: "fw-calendar-row", role: "row" });
      for (var w = 0; w < 7; w++) {
        var weekday = new Date(2024, 0, 1 + w); // 2024-01-01 is a Monday; Sweden and the UK start the week on Monday.
        headRow.appendChild(h("span", { class: "fw-calendar-weekday", role: "columnheader", aria: { label: weekday.toLocaleDateString(locale, { weekday: "long" }) }, text: weekday.toLocaleDateString(locale, { weekday: "short" }).slice(0, 2) }));
      }
      grid.appendChild(headRow);

      var lead = (shown.getDay() + 6) % 7;
      var cursor = new Date(view.year, view.month, 1 - lead);
      var focusTime = view.focus;
      var focusInMonth = new Date(focusTime).getMonth() === view.month && new Date(focusTime).getFullYear() === view.year;
      if (!focusInMonth) focusTime = (today.getMonth() === view.month && today.getFullYear() === view.year ? today : shown).getTime();

      for (var row = 0; row < 6; row++) {
        var rowNode = h("div", { class: "fw-calendar-row", role: "row" });
        for (var col = 0; col < 7; col++) {
          var date = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
          var outside = date.getMonth() !== view.month;
          var isToday = date.getTime() === today.getTime();
          (function (date) {
            rowNode.appendChild(h("button", {
              type: "button",
              role: "gridcell",
              class: "fw-calendar-day" + (outside ? " is-outside" : "") + (isToday ? " is-today" : "") + (date.getTime() === view.selected ? " is-selected" : ""),
              tabindex: date.getTime() === focusTime ? "0" : "-1",
              aria: { label: date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }), current: isToday ? "date" : null, selected: date.getTime() === view.selected ? "true" : "false" },
              data: { time: String(date.getTime()) },
              text: String(date.getDate()),
              on: {
                click: function () { show(date.getFullYear(), date.getMonth(), date.getTime(), "[data-time='" + date.getTime() + "']", date.getTime()); },
                keydown: function (e) {
                  var step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
                  if (e.key === "PageUp" || e.key === "PageDown") {
                    e.preventDefault();
                    var other = new Date(date.getFullYear(), date.getMonth() + (e.key === "PageUp" ? -1 : 1), Math.min(date.getDate(), 28));
                    show(other.getFullYear(), other.getMonth(), other.getTime());
                    return;
                  }
                  if (!step) return;
                  e.preventDefault();
                  var next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + step);
                  if (next.getMonth() !== view.month || next.getFullYear() !== view.year) {
                    show(next.getFullYear(), next.getMonth(), next.getTime());
                    return;
                  }
                  var nextButton = grid.querySelector("[data-time='" + next.getTime() + "']");
                  if (nextButton) {
                    grid.querySelectorAll(".fw-calendar-day").forEach(function (b) { b.tabIndex = -1; });
                    nextButton.tabIndex = 0;
                    nextButton.focus();
                  }
                }
              }
            }));
          })(date);
          cursor.setDate(cursor.getDate() + 1);
        }
        grid.appendChild(rowNode);
      }
      cal.appendChild(grid);
      panel.appendChild(cal);
      container.appendChild(panel);
    }

    function renderFlyouts() {
      el.flyouts.replaceChildren();
      if (state.startOpen) renderStart(el.flyouts);
      if (state.quickSettingsOpen) renderQuickSettings(el.flyouts);
      if (state.calendarOpen) renderCalendar(el.flyouts);
    }

    /* ---------- Context menus (WAI-ARIA menu pattern) ---------- */

    var menuReturnFocus = null;

    function openMenu(spec) {
      menuReturnFocus = document.activeElement;
      state.menu = spec;
      state.quickSettingsOpen = false;
      state.calendarOpen = false;
      if (spec.kind !== "power" && spec.kind !== "app-menu") {
        state.startOpen = false;
        startWasOpen = false;
      }
      emit("contextMenu.opened", { kind: spec.kind, itemId: spec.itemId || null });
      renderFlyouts();
      renderMenu();
    }

    function closeMenu(silent) {
      if (!state.menu) return;
      state.menu = null;
      renderMenu();
      if (!silent) emit("contextMenu.closed", {});
      if (menuReturnFocus && document.body.contains(menuReturnFocus)) menuReturnFocus.focus({ preventScroll: true });
      menuReturnFocus = null;
    }

    // Context menus with optional submenus (Windows 11: "View >", "Sort by >").
    // Items: { label, action, iconKey | glyph, shortcut, disabled, bold, ui,
    //          checked (check mark), radio + checked (dot), submenu: [items] } or "sep".
    function renderMenu() {
      el.menu.replaceChildren();
      var spec = state.menu;
      if (!spec) return;

      var screenRect = el.screen.getBoundingClientRect();
      var openSub = null;

      function place(menu, x, y, alignRightOf) {
        var rect = menu.getBoundingClientRect();
        var maxX = screenRect.width - rect.width - 4;
        if (alignRightOf && x > maxX) x = alignRightOf.left - screenRect.left - rect.width + 4;
        menu.style.left = Math.max(4, Math.min(x, maxX)) + "px";
        menu.style.top = Math.max(4, Math.min(y, screenRect.height - TASKBAR_HEIGHT - rect.height - 4)) + "px";
      }

      function choose(item) {
        state.menu = null;
        renderMenu();
        emit("contextMenu.closed", {});
        if (menuReturnFocus && document.body.contains(menuReturnFocus)) menuReturnFocus.focus({ preventScroll: true });
        menuReturnFocus = null;
        if (item.action) item.action();
      }

      function closeSub(focusParent) {
        if (!openSub) return;
        openSub.menu.remove();
        openSub.button.setAttribute("aria-expanded", "false");
        if (focusParent) openSub.button.focus({ preventScroll: true });
        openSub = null;
      }

      function build(items, label, isSub, parentButton) {
        var menu = h("div", { class: "fw-menu" + (isSub ? " is-submenu" : ""), role: "menu", aria: { label: label }, data: { menuKind: isSub ? "submenu" : spec.kind } });
        var buttons = [];

        items.forEach(function (item) {
          if (!item) return;
          if (item === "sep") {
            menu.appendChild(h("div", { class: "fw-menu-separator", role: "separator" }));
            return;
          }
          var hasSub = Array.isArray(item.submenu);
          var role = item.radio ? "menuitemradio" : item.checked !== undefined ? "menuitemcheckbox" : "menuitem";
          var mark = item.iconKey ? ui.icon(item.iconKey, 16) : item.glyph ? ui.glyph(item.glyph, 16) : item.checked ? ui.glyph(item.radio ? "dot" : "check", 16) : "";
          var button = h("button", {
            type: "button",
            role: role,
            class: "fw-menu-item" + (item.bold ? " is-default" : "") + (item.danger ? " is-danger" : "") + (hasSub ? " has-submenu" : ""),
            tabindex: "-1",
            disabled: !!item.disabled,
            aria: {
              disabled: item.disabled ? "true" : null,
              checked: role === "menuitem" ? null : String(!!item.checked),
              haspopup: hasSub ? "menu" : null,
              expanded: hasSub ? "false" : null
            },
            data: { ui: item.ui || "" }
          }, [
            h("span", { class: "fw-menu-icon", html: mark }),
            h("span", { class: "fw-menu-label", text: item.label }),
            hasSub ? h("span", { class: "fw-menu-chevron", html: ui.glyph("chevron-right", 12) })
              : item.shortcut ? h("span", { class: "fw-menu-shortcut", text: item.shortcut }) : null
          ]);

          function openThisSub(focusFirst) {
            if (openSub && openSub.button === button) {
              if (focusFirst && openSub.first) openSub.first.focus({ preventScroll: true });
              return;
            }
            closeSub(false);
            var sub = build(item.submenu, item.label, true, button);
            el.menu.appendChild(sub.menu);
            var r = button.getBoundingClientRect();
            place(sub.menu, r.right - screenRect.left - 2, r.top - screenRect.top - 4, r);
            button.setAttribute("aria-expanded", "true");
            openSub = { button: button, menu: sub.menu, first: sub.buttons[0] };
            if (focusFirst && sub.buttons[0]) sub.buttons[0].focus({ preventScroll: true });
          }

          button.addEventListener("click", function (e) {
            e.stopPropagation();
            if (item.disabled) return;
            if (hasSub) { openThisSub(true); return; }
            choose(item);
          });
          if (!isSub) {
            button.addEventListener("mouseenter", function () {
              if (hasSub && !item.disabled) openThisSub(false);
              else closeSub(false);
            });
          }
          button.addEventListener("keydown", function (e) {
            if (hasSub && (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              e.stopPropagation();
              openThisSub(true);
            }
          });
          menu.appendChild(button);
          if (!item.disabled) buttons.push(button);
        });

        menu.addEventListener("keydown", function (e) {
          var index = buttons.indexOf(document.activeElement);
          if (e.key === "ArrowDown") { e.preventDefault(); e.stopPropagation(); (buttons[index + 1] || buttons[0]).focus(); }
          else if (e.key === "ArrowUp") { e.preventDefault(); e.stopPropagation(); (buttons[index - 1] || buttons[buttons.length - 1]).focus(); }
          else if (e.key === "Home") { e.preventDefault(); e.stopPropagation(); buttons[0].focus(); }
          else if (e.key === "End") { e.preventDefault(); e.stopPropagation(); buttons[buttons.length - 1].focus(); }
          else if (isSub && (e.key === "ArrowLeft" || e.key === "Escape")) { e.preventDefault(); e.stopPropagation(); closeSub(true); }
          else if (e.key === "Escape" || e.key === "Tab") { e.preventDefault(); e.stopPropagation(); closeMenu(); }
        });
        return { menu: menu, buttons: buttons };
      }

      var root = build(spec.items, spec.label || t("menu.label"), false, null);
      el.menu.appendChild(root.menu);
      var rootRect = root.menu.getBoundingClientRect();
      var y = spec.anchor === "above" ? spec.y - screenRect.top - rootRect.height - 8 : spec.y - screenRect.top;
      place(root.menu, spec.x - screenRect.left, y, null);
      if (root.buttons[0]) root.buttons[0].focus({ preventScroll: true });
    }

    /* ---------- Dialogs (Windows 11 ContentDialog / message box) ---------- */

    var dialogReturnFocus = null;

    function showDialog(spec) {
      dialogReturnFocus = document.activeElement;
      state.dialog = spec;
      renderDialog();
    }

    function closeDialog() {
      if (!state.dialog) return;
      state.dialog = null;
      renderDialog();
      if (dialogReturnFocus && document.body.contains(dialogReturnFocus)) dialogReturnFocus.focus({ preventScroll: true });
      dialogReturnFocus = null;
    }

    function renderDialog() {
      el.dialog.replaceChildren();
      var spec = state.dialog;
      // Everything behind a modal dialog is out of reach for keyboard and screen readers. The coach panel stays usable.
      [el.desktop, el.windows, el.flyouts, el.taskbar].forEach(function (node) { if (node) node.inert = !!spec; });
      if (!spec) return;

      var titleId = "fw-dialog-title";
      var textId = "fw-dialog-text";
      var box = h("section", {
        class: "fw-dialog" + (spec.wide ? " is-wide" : "") + (spec.className ? " " + spec.className : ""),
        role: spec.icon === "warning" || spec.icon === "error" ? "alertdialog" : "dialog",
        aria: { modal: "true", labelledby: titleId, describedby: spec.message ? textId : null },
        data: { dialogKind: spec.kind || "" }
      });

      var head = h("div", { class: "fw-dialog-content" });
      if (spec.icon) head.appendChild(h("span", { class: "fw-dialog-icon is-" + spec.icon, html: ui.glyph(spec.icon, 32) }));
      var copy = h("div", { class: "fw-dialog-copy" }, [h("h2", { id: titleId, text: spec.title })]);
      if (spec.message) copy.appendChild(h("p", { id: textId, text: spec.message }));
      if (spec.body) copy.appendChild(typeof spec.body === "function" ? spec.body() : spec.body);
      head.appendChild(copy);
      box.appendChild(head);

      var actions = h("div", { class: "fw-dialog-actions" });
      var cancelButton = null;
      (spec.buttons || [{ label: t("common.ok"), primary: true }]).forEach(function (button) {
        var node = h("button", {
          type: "button",
          class: "fw-button" + (button.primary ? " fw-button-accent" : ""),
          text: button.label,
          disabled: !!button.disabled,
          // The button that has keyboard focus when the dialog opens (e.g. "No" when replacing a file).
          autofocus: button.autofocus ? "autofocus" : null,
          data: { ui: button.ui || "" },
          on: { click: function () {
            if (button.validate && button.validate() === false) return;
            closeDialog();
            if (button.action) button.action();
          } }
        });
        if (button.cancel) cancelButton = node;
        actions.appendChild(node);
      });
      box.appendChild(actions);

      box.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          if (cancelButton) cancelButton.click();
          else closeDialog();
          return;
        }
        if (e.key === "Enter" && e.target.tagName === "INPUT") {
          var primary = actions.querySelector(".fw-button-accent");
          if (primary) { e.preventDefault(); primary.click(); }
          return;
        }
        if (e.key !== "Tab") return;
        var focusable = Array.prototype.slice.call(box.querySelectorAll("button:not([disabled]), input:not([disabled]), select, textarea, [tabindex='0']"));
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });

      el.dialog.appendChild(h("div", { class: "fw-dialog-backdrop" }, [box]));

      window.setTimeout(function () {
        var target = box.querySelector("[autofocus]") || box.querySelector("input, select, textarea") || actions.querySelector(".fw-button-accent") || actions.querySelector("button");
        if (target) {
          target.focus();
          if (target.select && target.dataset.selectStem) {
            var stem = target.value.lastIndexOf(".");
            target.setSelectionRange(0, stem > 0 ? stem : target.value.length);
          } else if (target.select) target.select();
        }
      }, 0);
    }

    /* ---------- Notifications (toasts) ---------- */

    function toast(title, text, iconKey) {
      var node = h("div", { class: "fw-toast" }, [
        h("span", { class: "fw-toast-icon", html: ui.icon(iconKey || "settings", 20) }),
        h("div", {}, [h("strong", { text: title }), h("p", { text: text || "" })])
      ]);
      el.toasts.appendChild(node);
      window.setTimeout(function () { node.remove(); }, 6000);
    }

    /* ---------- Coach panel (Datorskolan) and highlights ---------- */

    function setCoachOpen(open) {
      state.coachOpen = open;
      if (!open && !lessonEngine.active()) state.learningHighlightSelector = null;
      render();
      if (open) window.setTimeout(function () {
        var heading = el.coach.querySelector("h2, h3");
        if (heading) heading.focus && heading.setAttribute("tabindex", "-1");
      }, 0);
    }

    function applyLearningHighlight() {
      el.sim.querySelectorAll(".learning-highlight").forEach(function (node) { node.classList.remove("learning-highlight"); });
      if (!state.learningHighlightSelector) return;
      try {
        var target = el.screen.querySelector(state.learningHighlightSelector);
        if (target) target.classList.add("learning-highlight");
      } catch (error) {
        console.warn("[LessonEngine] Invalid highlight selector", state.learningHighlightSelector);
      }
    }

    /* ---------- Render ---------- */

    function render() {
      var profile = progressStore.profile();
      el.sim.classList.toggle("is-child-mode", profile.mode === "child");
      el.sim.classList.toggle("has-coach", state.coachOpen);
      el.screen.setAttribute("data-wallpaper", window.DatorskolanSettingsApp.ensure(state).wallpaper || "bloom");
      el.coach.hidden = !state.coachOpen;

      renderDesktop();
      renderWindows();
      renderTaskbar();
      renderFlyouts();
      renderMenu();
      renderDialog();
      renderOverlay();
      window.DatorskolanLearningPanel.render(ctx);
      applyLearningHighlight();
    }

    /* ---------- Global input ---------- */

    el.screen.addEventListener("contextmenu", function (e) {
      if (e.target.closest(".fw-desktop-icon, .fw-window, .fw-taskbar, .fw-flyout, .fw-menu, .fw-dialog")) return;
      e.preventDefault();
      openMenu({
        kind: "desktop",
        x: e.clientX,
        y: e.clientY,
        items: [
          { label: t("menu.view"), glyph: "view", ui: "desktop-menu-view", submenu: desktopViewMenu() },
          { label: t("menu.sortBy"), glyph: "sort", ui: "desktop-menu-sort", submenu: desktopSortMenu() },
          { label: t("menu.refresh"), glyph: "refresh", action: function () { emit("desktop.refreshed", {}); renderDesktop(); } },
          "sep",
          { label: t("menu.displaySettings"), iconKey: "desktop", action: function () {
            window.DatorskolanSettingsApp.ensure(state).page = "system";
            openApp("settings");
            refreshApp("settings");
          } },
          { label: t("menu.personalize"), iconKey: "settings", action: function () {
            window.DatorskolanSettingsApp.ensure(state).page = "personalization";
            openApp("settings");
            refreshApp("settings");
          } }
        ]
      });
    });

    el.screen.addEventListener("pointerdown", function (e) {
      if (state.menu && !e.target.closest(".fw-menu")) closeMenu();
      var changed = false;
      if (state.quickSettingsOpen && !e.target.closest(".fw-quick") && !e.target.closest(".fw-tb-quick")) {
        state.quickSettingsOpen = false;
        changed = true;
      }
      if (state.calendarOpen && !e.target.closest(".fw-calendar") && !e.target.closest(".fw-tb-clock")) {
        state.calendarOpen = false;
        changed = true;
      }
      if (state.startOpen && !e.target.closest(".fw-start") && !e.target.closest(".fw-tb-start") && !e.target.closest(".fw-tb-search") && !e.target.closest(".fw-menu")) {
        state.startOpen = false;
        startWasOpen = false;
        emit("startMenu.closed", {});
        changed = true;
      }
      if (e.target === el.desktop && (state.selected || state.desktopMulti.length)) {
        state.selected = null;
        state.desktopMulti = [];
        el.desktop.querySelectorAll(".is-selected").forEach(function (n) { n.classList.remove("is-selected"); });
      }
      if (e.target === el.desktop && e.button === 0) startDesktopMarquee(e);
      if (changed) {
        renderFlyouts();
        renderTaskbar();
      }
    });

    function activeWindow() {
      return state.activeWindowId ? windowById(state.activeWindowId) : null;
    }

    function onKeyDown(e) {
      if (root.hidden) return;

      if (e.key === "Escape") {
        if (state.dialog || state.menu) return; // handled inside dialog/menu
        // Closing a flyout with Escape returns focus to the taskbar button that opened it.
        var opener = state.startOpen ? "start" : state.quickSettingsOpen ? "quick-settings" : state.calendarOpen ? "clock" : null;
        if (state.startOpen) setStart(false);
        else if (opener) {
          state.quickSettingsOpen = false;
          state.calendarOpen = false;
          render();
        }
        if (opener) {
          var button = el.taskbar.querySelector("[data-ui='" + opener + "']");
          if (button) button.focus();
          return;
        }
      }

      // Ctrl+Esc opens Start (the browser cannot capture the Windows key itself).
      if (e.ctrlKey && e.key === "Escape") {
        e.preventDefault();
        setStart(!state.startOpen);
        return;
      }

      if (e.altKey && e.key === "Tab") {
        e.preventDefault();
        var visible = state.windows.filter(function (w) { return w.mode !== "minimized"; }).sort(function (a, b) { return b.z - a.z; });
        if (visible.length > 1) {
          var next = visible[visible.length - 1];
          focusWindow(next.id);
          emit("window.switched", { windowId: next.id, appId: next.appId });
        }
        return;
      }

      if (e.altKey && e.key === "F4") {
        var current = activeWindow();
        if (current) {
          e.preventDefault();
          closeWindow(current.id);
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    /* ---------- App context ---------- */

    var ctx = {
      state: state,
      emit: emit,
      on: on,
      vfs: vfs,
      t: t,
      I18n: I18n,
      ui: ui,
      h: h,
      icon: ui.icon,
      glyph: ui.glyph,
      apps: apps,
      appTitle: appTitle,
      openApp: openApp,
      openFile: openFile,
      openExplorerAt: openExplorerAt,
      findWindow: findWindow,
      closeWindow: closeWindow,
      forceCloseWindow: forceCloseWindow,
      render: render,
      refreshApp: refreshApp,
      renderWindows: renderWindows,
      openMenu: openMenu,
      closeMenu: closeMenu,
      showDialog: showDialog,
      closeDialog: closeDialog,
      toast: toast,
      displayName: displayName,
      nodeIcon: nodeIcon,
      nodeIconKey: nodeIconKey,
      fileTypeLabel: fileTypeLabel,
      formatDate: formatDate,
      formatTime: formatTime,
      lessonEngine: lessonEngine,
      scenarioEngine: scenarioEngine,
      progressStore: progressStore,
      course: course,
      runtimeApi: runtimeApi,
      learningRuntimeApi: learningRuntimeApi,
      setCoachOpen: setCoachOpen,
      setLearningHighlight: learningRuntimeApi.setLearningHighlight,
      applyLearningHighlight: applyLearningHighlight,
      el: el
    };

    scenarioEngine.onChange(function () { window.DatorskolanLearningPanel.render(ctx); });
    lessonEngine.onChange(function () {
      window.DatorskolanLearningPanel.render(ctx);
      applyLearningHighlight();
    });

    // Keep the clock current.
    window.setInterval(function () {
      if (!root.hidden) {
        var clock = el.taskbar.querySelector(".fw-tb-clock");
        if (clock) {
          var now = new Date();
          clock.children[0].textContent = formatTime(now);
          clock.children[1].textContent = formatDate(now);
        }
      }
    }, 20000);

    // Continue a lesson that was open before the page was reloaded (or the language was changed).
    if (lessonEngine.resume(learningRuntimeApi)) state.coachOpen = true;
    render();

    var api = {
      state: state,
      vfs: vfs,
      on: on,
      openApp: openApp,
      scenarios: scenarioEngine,
      lessons: lessonEngine,
      progress: progressStore,
      setMouseMode: setMouseMode,
      setKeyboardMode: function (mode) { applyStartState({ keyboardMode: mode }); render(); },
      openLearningPanel: function () { setCoachOpen(true); },
      startLesson: function (id) {
        var result = lessonEngine.start(id, learningRuntimeApi);
        state.coachOpen = true;
        render();
        return result;
      },
      stopLesson: function () {
        lessonEngine.stop();
        scenarioEngine.stop();
        state.learningHighlightSelector = null;
        render();
      },
      loadScenario: function (id) {
        var result = scenarioEngine.load(id, runtimeApi);
        render();
        return result;
      },
      stopScenario: function () {
        scenarioEngine.stop();
        render();
      },
      resetAll: function () {
        lessonEngine.stop();
        scenarioEngine.stop();
        progressStore.reset();
        state.shell = ui.resetShellState(window.localStorage);
        resetForScenario();
      }
    };

    window.DatorskolanSimulator.api = api;
    return api;
  }

  window.DatorskolanSimulator = {
    boot: boot,
    api: null
  };
})();
