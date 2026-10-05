(function () {
  "use strict";

  var root = document.getElementById("app");

  function fail(error) {
    console.error("[Datorskolan]", error);
    root.innerHTML =
      '<div style="padding:24px;color:white;font-family:Segoe UI,Arial,sans-serif">' +
      '<h1>Datorskolan kunde inte starta</h1>' +
      '<p>Ladda om sidan. Om felet finns kvar, öppna utvecklarkonsolen.</p>' +
      '</div>';
  }

  try {
    var vfs = new window.VirtualFileSystem();
    var scenarioEngine = new window.DatorskolanScenarioEngine(window.DatorskolanScenarios || []);

    var state = {
      items: [
        { id: "documents", label: "Documents", icon: "📁", x: 18, y: 18, appId: "explorer", folderId: "documents" },
        { id: "pictures", label: "Pictures", icon: "🖼️", x: 18, y: 112, appId: "explorer", folderId: "pictures" },
        { id: "recycle-bin", label: "Recycle Bin", icon: "🗑️", x: 18, y: 206, appId: "recycle-bin", folderId: "recycle-bin" }
      ],
      selected: null,
      startOpen: false,
      windows: [],
      activeWindowId: null,
      context: null,
      nextWindow: 1,
      nextZ: 10,
      explorer: {
        folderId: "home",
        selectedId: null,
        clipboard: null
      },
      dialog: null,
      calculator: {
        display: "0",
        stored: null,
        operator: null,
        waiting: false
      },
      notepadFileId: null,
      notepadDraft: "",
      notepadDirty: false,
      photoFileId: null,
      photoZoom: 1,
      scenarioPanelOpen: false
    };

    var listeners = {};

    function emit(type, payload) {
      console.debug("[FakeWindows]", type, payload || {});
      (listeners[type] || []).forEach(function (fn) { fn(payload || {}); });

      if (scenarioEngine && runtimeApi) {
        scenarioEngine.observe(type, payload || {}, runtimeApi);
      }
    }

    function on(type, fn) {
      (listeners[type] || (listeners[type] = [])).push(fn);
    }

    function iconForNode(node) {
      if (node.type === "folder") return "📁";
      if (node.fileType === "image") return "🖼️";
      return "📄";
    }

    function showTextDialog(title, value, onConfirm) {
      state.dialog = { title: title, value: value || "", onConfirm: onConfirm };
      renderDialog();
    }

    function navigateFolder(folderId) {
      var folder = vfs.get(folderId);
      if (!folder || folder.type !== "folder") return;
      state.explorer.folderId = folderId;
      state.explorer.selectedId = null;
      render();
      emit("folder.opened", { folderId: folderId, path: vfs.path(folderId) });
    }

    function selectedVfsNode() {
      return state.explorer.selectedId ? vfs.get(state.explorer.selectedId) : null;
    }

    function createFolder() {
      var node = vfs.createFolder(state.explorer.folderId, "Ny mapp");
      state.explorer.selectedId = node.id;
      emit("folder.created", { id: node.id, name: node.name, parentId: node.parentId });
      render();
      showTextDialog("Byt namn på mappen", node.name, function (value) {
        var renamed = vfs.rename(node.id, value);
        if (renamed) emit("file.renamed", { id: renamed.id, name: renamed.name });
        render();
      });
    }

    function renameSelected() {
      var node = selectedVfsNode();
      if (!node || node.system) return;
      showTextDialog("Byt namn", node.name, function (value) {
        var renamed = vfs.rename(node.id, value);
        if (renamed) emit("file.renamed", { id: renamed.id, name: renamed.name });
        render();
      });
    }

    function copySelected(mode) {
      var node = selectedVfsNode();
      if (!node || node.system) return;
      state.explorer.clipboard = { mode: mode, id: node.id };
      emit(mode === "cut" ? "file.cut" : "file.copiedToClipboard", { id: node.id });
      render();
    }

    function pasteClipboard() {
      var clip = state.explorer.clipboard;
      if (!clip) return;

      var result = null;
      if (clip.mode === "copy") {
        result = vfs.copy(clip.id, state.explorer.folderId);
        if (result) emit("file.copied", { sourceId: clip.id, newId: result.id, parentId: state.explorer.folderId });
      } else {
        result = vfs.move(clip.id, state.explorer.folderId);
        if (result) {
          emit("file.moved", { id: result.id, parentId: state.explorer.folderId });
          state.explorer.clipboard = null;
        }
      }

      if (result) state.explorer.selectedId = result.id;
      render();
    }

    function deleteSelected() {
      var node = selectedVfsNode();
      if (!node || node.system) return;
      var deleted = vfs.delete(node.id);
      if (deleted) {
        emit("file.deleted", { id: deleted.id, name: deleted.name });
        state.explorer.selectedId = null;
      }
      render();
    }

    function restoreSelected() {
      var node = selectedVfsNode();
      if (!node) return;
      var restored = vfs.restore(node.id);
      if (restored) {
        emit("recycleBin.restored", { id: restored.id, parentId: restored.parentId });
        state.explorer.selectedId = null;
      }
      render();
    }

    function emptyRecycleBin() {
      vfs.emptyRecycleBin();
      state.explorer.selectedId = null;
      emit("recycleBin.emptied", {});
      render();
    }

    function resetForScenario() {
      vfs.reset();

      state.selected = null;
      state.startOpen = false;
      state.windows = [];
      state.activeWindowId = null;
      state.context = null;
      state.nextWindow = 1;
      state.nextZ = 10;

      state.explorer.folderId = "home";
      state.explorer.selectedId = null;
      state.explorer.clipboard = null;

      state.dialog = null;
      state.calculator.display = "0";
      state.calculator.stored = null;
      state.calculator.operator = null;
      state.calculator.waiting = false;

      state.notepadFileId = null;
      state.notepadDraft = "";
      state.notepadDirty = false;
      state.photoFileId = null;
      state.photoZoom = 1;

      render();
    }

    function setExplorerFolder(folderId) {
      if (vfs.get(folderId)) {
        state.explorer.folderId = folderId;
        state.explorer.selectedId = null;
      }
      render();
    }

    var runtimeApi = {
      vfs: vfs,
      resetForScenario: resetForScenario,
      setExplorerFolder: setExplorerFolder,
      openApp: openApp
    };

    function renderExplorer() {
      var wrapper = document.createElement("div");
      wrapper.className = "explorer-v2";

      var sidebar = document.createElement("aside");
      sidebar.className = "explorer-sidebar";

      [
        ["home", "🏠", "Home"],
        ["documents", "📄", "Documents"],
        ["pictures", "🖼️", "Pictures"],
        ["downloads", "⬇️", "Downloads"],
        ["recycle-bin", "🗑️", "Recycle Bin"]
      ].forEach(function (entry) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "explorer-side-button" + (state.explorer.folderId === entry[0] ? " active" : "");
        b.textContent = entry[1] + " " + entry[2];
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          navigateFolder(entry[0]);
        });
        sidebar.appendChild(b);
      });

      var main = document.createElement("section");
      main.className = "explorer-main-v2";

      var toolbar = document.createElement("div");
      toolbar.className = "explorer-toolbar";

      function addTool(label, action, disabled) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = label;
        b.disabled = !!disabled;
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          action();
        });
        toolbar.appendChild(b);
      }

      var current = vfs.get(state.explorer.folderId);
      var selected = selectedVfsNode();
      var inRecycle = state.explorer.folderId === "recycle-bin";

      addTool("←", function () {
        if (current && current.parentId) navigateFolder(current.parentId);
      }, !current || !current.parentId);

      if (inRecycle) {
        addTool("Återställ", restoreSelected, false);
        addTool("Töm Papperskorgen", emptyRecycleBin, vfs.list("recycle-bin").length === 0);
      } else {
        addTool("+ Ny mapp", createFolder, false);
        addTool("+ Ny textfil", createTextFile, false);
        addTool("Byt namn", renameSelected, false);
        addTool("Kopiera", function () { copySelected("copy"); }, false);
        addTool("Klipp ut", function () { copySelected("cut"); }, false);
        addTool("Klistra in", pasteClipboard, !state.explorer.clipboard);
        addTool("Ta bort", deleteSelected, false);
      }

      var address = document.createElement("div");
      address.className = "explorer-address";
      address.textContent = vfs.path(state.explorer.folderId);

      var grid = document.createElement("div");
      grid.className = "vfs-grid";

      var nodes = vfs.list(state.explorer.folderId);

      if (nodes.length === 0) {
        var empty = document.createElement("div");
        empty.className = "explorer-empty";
        empty.textContent = inRecycle ? "Papperskorgen är tom." : "Den här mappen är tom.";
        grid.appendChild(empty);
      }

      nodes.forEach(function (node) {
        var item = document.createElement("button");
        item.type = "button";
        item.className = "vfs-item" + (state.explorer.selectedId === node.id ? " selected" : "");
        item.dataset.nodeId = node.id;
        item.innerHTML =
          '<span class="vfs-icon" aria-hidden="true">' + iconForNode(node) + '</span>' +
          '<span class="vfs-name"></span>';
        item.querySelector(".vfs-name").textContent = node.name;

        item.addEventListener("click", function (e) {
          e.stopPropagation();
          state.explorer.selectedId = node.id;
          grid.querySelectorAll(".vfs-item.selected").forEach(function (el) { el.classList.remove("selected"); });
          item.classList.add("selected");
          emit("file.selected", { id: node.id, type: node.type });
        });

        item.addEventListener("dblclick", function (e) {
          e.stopPropagation();
          if (node.type === "folder") {
            navigateFolder(node.id);
          } else {
            emit("file.opened", { id: node.id, name: node.name, fileType: node.fileType });
            if (node.fileType === "text") {
              state.notepadFileId = node.id;
              state.notepadDraft = node.content || "";
              state.notepadDirty = false;
              openApp("notepad");
            } else if (node.fileType === "image") {
              state.photoFileId = node.id;
              state.photoZoom = 1;
              openApp("photos");
            }
          }
        });

        item.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          e.stopPropagation();
          state.explorer.selectedId = node.id;
          grid.querySelectorAll(".vfs-item.selected").forEach(function (el) { el.classList.remove("selected"); });
          item.classList.add("selected");
        });

        grid.appendChild(item);
      });

      main.appendChild(toolbar);
      main.appendChild(address);
      main.appendChild(grid);

      wrapper.appendChild(sidebar);
      wrapper.appendChild(main);
      return wrapper;
    }

    function createTextFile() {
      showTextDialog("Ny textfil", "Nytt dokument.txt", function (value) {
        var name = value.toLowerCase().endsWith(".txt") ? value : value + ".txt";
        var node = vfs.createFile(state.explorer.folderId, name, "text", "");
        state.explorer.selectedId = node.id;
        emit("file.created", { id: node.id, name: node.name, parentId: node.parentId });
        render();
      });
    }

    function saveNotepad(saveAs) {
      var node = state.notepadFileId ? vfs.get(state.notepadFileId) : null;

      if (node && !saveAs) {
        node.content = state.notepadDraft;
        state.notepadDirty = false;
        emit("notepad.saved", { id: node.id, name: node.name });
        render();
        return;
      }

      showTextDialog("Spara som", node ? node.name : "Nytt dokument.txt", function (value) {
        var name = value.toLowerCase().endsWith(".txt") ? value : value + ".txt";
        var parentId = node ? node.parentId : "documents";
        var created = vfs.createFile(parentId, name, "text", state.notepadDraft);
        state.notepadFileId = created.id;
        state.notepadDirty = false;
        emit("notepad.saved", { id: created.id, name: created.name, saveAs: true });
        render();
      });
    }

    function newNotepadDocument() {
      state.notepadFileId = null;
      state.notepadDraft = "";
      state.notepadDirty = false;
      emit("notepad.new", {});
      render();
    }

    function calculatorInput(key) {
      var calc = state.calculator;

      if (/^\d$/.test(key)) {
        if (calc.waiting || calc.display === "0") {
          calc.display = key;
          calc.waiting = false;
        } else {
          calc.display += key;
        }
      } else if (key === ".") {
        if (calc.waiting) {
          calc.display = "0.";
          calc.waiting = false;
        } else if (calc.display.indexOf(".") === -1) {
          calc.display += ".";
        }
      } else if (key === "C" || key === "CE") {
        calc.display = "0";
        if (key === "C") {
          calc.stored = null;
          calc.operator = null;
        }
        calc.waiting = false;
      } else if (key === "⌫") {
        if (!calc.waiting) calc.display = calc.display.length > 1 ? calc.display.slice(0, -1) : "0";
      } else if (key === "±") {
        calc.display = String(parseFloat(calc.display || "0") * -1);
      } else if (key === "%") {
        calc.display = String(parseFloat(calc.display || "0") / 100);
      } else if (["+", "−", "×", "÷"].indexOf(key) !== -1) {
        calc.stored = parseFloat(calc.display || "0");
        calc.operator = key;
        calc.waiting = true;
      } else if (key === "=" && calc.operator !== null && calc.stored !== null) {
        var right = parseFloat(calc.display || "0");
        var result = calc.stored;

        if (calc.operator === "+") result += right;
        if (calc.operator === "−") result -= right;
        if (calc.operator === "×") result *= right;
        if (calc.operator === "÷") result = right === 0 ? NaN : result / right;

        calc.display = Number.isFinite(result)
          ? String(Math.round((result + Number.EPSILON) * 1000000000) / 1000000000)
          : "Error";

        emit("calculator.result", { result: calc.display, operator: calc.operator });
        calc.stored = null;
        calc.operator = null;
        calc.waiting = true;
      }

      renderWindows();
    }

    function pictureNodes() {
      return vfs.list("pictures").filter(function (node) {
        return node.type === "file" && node.fileType === "image";
      });
    }

    function movePhoto(direction) {
      var images = pictureNodes();
      if (!images.length) return;

      var index = images.findIndex(function (node) { return node.id === state.photoFileId; });
      if (index < 0) index = 0;
      index = (index + direction + images.length) % images.length;

      state.photoFileId = images[index].id;
      state.photoZoom = 1;
      emit("photos.changed", { id: state.photoFileId });
      renderWindows();
    }

    var apps = {
      explorer: {
        title: "File Explorer",
        icon: "📁",
        w: 820,
        h: 520,
        render: renderExplorer
      },

      calculator: {
        title: "Calculator",
        icon: "🧮",
        w: 360,
        h: 500,
        render: function () {
          var el = document.createElement("div");
          el.className = "calc calc-v3";

          var display = document.createElement("div");
          display.className = "display";
          display.textContent = state.calculator.display;

          var grid = document.createElement("div");
          grid.className = "grid calc-grid";

          ["%","CE","C","⌫","7","8","9","÷","4","5","6","×","1","2","3","−","±","0",".","+","="].forEach(function (key) {
            var b = document.createElement("button");
            b.type = "button";
            b.textContent = key;
            if (key === "=") b.className = "calc-equals";
            b.addEventListener("click", function (e) {
              e.stopPropagation();
              calculatorInput(key);
            });
            grid.appendChild(b);
          });

          el.appendChild(display);
          el.appendChild(grid);
          return el;
        }
      },

      notepad: {
        title: "Notepad",
        icon: "📝",
        w: 660,
        h: 460,
        render: function () {
          var wrap = document.createElement("div");
          wrap.className = "notepad-app";

          var toolbar = document.createElement("div");
          toolbar.className = "notepad-toolbar";

          [
            ["Ny", newNotepadDocument],
            ["Spara", function () { saveNotepad(false); }],
            ["Spara som", function () { saveNotepad(true); }]
          ].forEach(function (entry) {
            var b = document.createElement("button");
            b.type = "button";
            b.textContent = entry[0];
            b.addEventListener("click", function (e) {
              e.stopPropagation();
              entry[1]();
            });
            toolbar.appendChild(b);
          });

          var status = document.createElement("span");
          status.className = "notepad-status";
          var node = state.notepadFileId ? vfs.get(state.notepadFileId) : null;
          status.textContent = (node ? node.name : "Nytt dokument") + (state.notepadDirty ? " • osparad" : "");
          toolbar.appendChild(status);

          var area = document.createElement("textarea");
          area.className = "notepad";
          area.setAttribute("aria-label", "Anteckningsyta");
          area.value = state.notepadDraft || "";
          area.placeholder = "Skriv här…";

          area.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
          area.addEventListener("input", function () {
            state.notepadDraft = area.value;
            state.notepadDirty = true;
            status.textContent = (node ? node.name : "Nytt dokument") + " • osparad";
          });

          wrap.appendChild(toolbar);
          wrap.appendChild(area);
          return wrap;
        }
      },

      photos: {
        title: "Photos",
        icon: "🖼️",
        w: 680,
        h: 460,
        render: function () {
          var images = pictureNodes();
          if (!state.photoFileId && images.length) state.photoFileId = images[0].id;

          var node = state.photoFileId ? vfs.get(state.photoFileId) : null;
          var el = document.createElement("div");
          el.className = "photo-viewer photo-viewer-v3";

          var toolbar = document.createElement("div");
          toolbar.className = "photos-toolbar";

          [
            ["←", function () { movePhoto(-1); }],
            ["→", function () { movePhoto(1); }],
            ["−", function () {
              state.photoZoom = Math.max(0.5, state.photoZoom - 0.25);
              emit("photos.zoom", { zoom: state.photoZoom });
              renderWindows();
            }],
            ["+", function () {
              state.photoZoom = Math.min(3, state.photoZoom + 0.25);
              emit("photos.zoom", { zoom: state.photoZoom });
              renderWindows();
            }]
          ].forEach(function (entry) {
            var b = document.createElement("button");
            b.type = "button";
            b.textContent = entry[0];
            b.addEventListener("click", function (e) {
              e.stopPropagation();
              entry[1]();
            });
            toolbar.appendChild(b);
          });

          var label = document.createElement("span");
          label.textContent = node ? node.name : "Inga bilder";
          toolbar.appendChild(label);

          var stage = document.createElement("div");
          stage.className = "photo-stage";

          var picture = document.createElement("div");
          picture.className = "photo-placeholder";
          picture.style.transform = "scale(" + state.photoZoom + ")";
          picture.textContent = "🖼️";

          stage.appendChild(picture);
          el.appendChild(toolbar);
          el.appendChild(stage);
          return el;
        }
      },

      "recycle-bin": {
        title: "Recycle Bin",
        icon: "🗑️",
        w: 760,
        h: 470,
        render: function () {
          var oldFolder = state.explorer.folderId;
          state.explorer.folderId = "recycle-bin";
          var view = renderExplorer();
          state.explorer.folderId = oldFolder;
          return view;
        }
      }
    };

    var shell = document.createElement("section");
    shell.className = "sim";
    shell.innerHTML =
      '<div class="workspace">' +
        '<div class="desktop" aria-label="Skrivbord"></div>' +
        '<div class="windows"></div>' +
      '</div>' +
      '<div class="start" hidden></div>' +
      '<div class="context-layer"></div>' +
      '<div class="dialog-layer"></div>' +
      '<aside class="scenario-panel" hidden></aside>' +
      '<nav class="taskbar" aria-label="Aktivitetsfält"></nav>';

    root.replaceChildren(shell);

    var el = {
      sim: shell,
      workspace: shell.querySelector(".workspace"),
      desktop: shell.querySelector(".desktop"),
      windows: shell.querySelector(".windows"),
      start: shell.querySelector(".start"),
      context: shell.querySelector(".context-layer"),
      dialog: shell.querySelector(".dialog-layer"),
      scenario: shell.querySelector(".scenario-panel"),
      taskbar: shell.querySelector(".taskbar")
    };

    function topVisibleWindow() {
      return state.windows
        .filter(function (w) { return w.mode !== "minimized"; })
        .sort(function (a, b) { return b.z - a.z; })[0] || null;
    }

    function focusWindow(id, renderNow) {
      var win = state.windows.find(function (w) { return w.id === id; });
      if (!win || win.mode === "minimized") return;
      if (state.activeWindowId === id) return;

      state.windows.forEach(function (w) { w.active = false; });
      win.active = true;
      win.z = state.nextZ++;
      state.activeWindowId = id;

      emit("window.focused", { windowId: id });
      if (renderNow !== false) render();
    }

    function openApp(appId) {
      var app = apps[appId];
      if (!app) return;

      if (appId === "recycle-bin") {
        state.explorer.folderId = "recycle-bin";
        state.explorer.selectedId = null;
      }

      var existing = state.windows.find(function (w) { return w.appId === appId; });
      if (existing) {
        if (existing.mode === "minimized") restoreWindow(existing.id);
        else focusWindow(existing.id);
        emit("app.focused", { appId: appId, windowId: existing.id });
        return;
      }

      var offset = state.windows.length * 26;
      var id = "window-" + appId + "-" + state.nextWindow++;

      state.windows.forEach(function (w) { w.active = false; });
      state.windows.push({
        id: id,
        appId: appId,
        title: app.title,
        x: 180 + offset,
        y: 70 + offset,
        width: app.w,
        height: app.h,
        mode: "normal",
        restore: null,
        z: state.nextZ++,
        active: true
      });

      state.activeWindowId = id;
      state.startOpen = false;
      emit("app.opened", { appId: appId, windowId: id });
      render();
    }

    function minimizeWindow(id) {
      var win = state.windows.find(function (w) { return w.id === id; });
      if (!win) return;

      win.mode = "minimized";
      win.active = false;

      if (state.activeWindowId === id) {
        var top = topVisibleWindow();
        state.activeWindowId = top ? top.id : null;
        if (top) top.active = true;
      }

      emit("window.minimized", { windowId: id });
      render();
    }

    function maximizeWindow(id) {
      var win = state.windows.find(function (w) { return w.id === id; });
      if (!win || win.mode === "maximized") return;

      win.restore = { x: win.x, y: win.y, width: win.width, height: win.height };
      win.mode = "maximized";
      state.windows.forEach(function (w) { w.active = w.id === id; });
      win.z = state.nextZ++;
      state.activeWindowId = id;

      emit("window.maximized", { windowId: id });
      render();
    }

    function restoreWindow(id) {
      var win = state.windows.find(function (w) { return w.id === id; });
      if (!win) return;

      if (win.mode === "maximized" && win.restore) {
        win.x = win.restore.x;
        win.y = win.restore.y;
        win.width = win.restore.width;
        win.height = win.restore.height;
        win.restore = null;
      }

      win.mode = "normal";
      state.windows.forEach(function (w) { w.active = w.id === id; });
      win.active = true;
      win.z = state.nextZ++;
      state.activeWindowId = id;

      emit("window.restored", { windowId: id });
      render();
    }

    function closeWindow(id) {
      var win = state.windows.find(function (w) { return w.id === id; });
      if (!win) return;

      var appId = win.appId;
      state.windows = state.windows.filter(function (w) { return w.id !== id; });

      if (state.activeWindowId === id) {
        var top = topVisibleWindow();
        state.activeWindowId = top ? top.id : null;
        state.windows.forEach(function (w) { w.active = !!top && w.id === top.id; });
      }

      emit("window.closed", { windowId: id, appId: appId });
      render();
    }

    function setStart(open) {
      if (state.startOpen === open) return;
      state.startOpen = open;
      state.context = null;
      emit(open ? "startMenu.opened" : "startMenu.closed", {});
      render();
    }

    function openContext(kind, clientX, clientY, itemId) {
      var r = el.sim.getBoundingClientRect();
      state.context = {
        kind: kind,
        itemId: itemId || null,
        x: clientX - r.left,
        y: clientY - r.top
      };
      state.startOpen = false;
      emit("contextMenu.opened", { kind: kind, itemId: itemId || null });
      render();
    }

    function closeContext() {
      if (!state.context) return;
      state.context = null;
      emit("contextMenu.closed", {});
      render();
    }

    function renderDesktop() {
      el.desktop.replaceChildren();

      state.items.forEach(function (item) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "desktop-item" + (state.selected === item.id ? " selected" : "");
        b.style.left = item.x + "px";
        b.style.top = item.y + "px";
        b.innerHTML =
          '<span class="icon">' + item.icon + '</span>' +
          '<span class="label">' + item.label + '</span>';

        var drag = null;

        b.addEventListener("click", function (e) {
          e.stopPropagation();
          state.selected = item.id;
          state.context = null;

          el.desktop.querySelectorAll(".desktop-item.selected").forEach(function (node) {
            node.classList.remove("selected");
          });
          b.classList.add("selected");

          emit("desktop.item.selected", { itemId: item.id });
        });

        b.addEventListener("dblclick", function (e) {
          e.stopPropagation();
          emit("desktop.item.doubleClicked", { itemId: item.id });

          if (item.folderId) {
            state.explorer.folderId = item.folderId;
            state.explorer.selectedId = null;
          }

          openApp(item.appId);
        });

        b.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          e.stopPropagation();
          state.selected = item.id;
          openContext("item", e.clientX, e.clientY, item.id);
        });

        b.addEventListener("pointerdown", function (e) {
          if (e.button !== 0) return;

          drag = {
            pointerId: e.pointerId,
            sx: e.clientX,
            sy: e.clientY,
            ix: item.x,
            iy: item.y,
            moved: false
          };

          b.setPointerCapture(e.pointerId);
        });

        b.addEventListener("pointermove", function (e) {
          if (!drag || e.pointerId !== drag.pointerId) return;

          var dx = e.clientX - drag.sx;
          var dy = e.clientY - drag.sy;

          if (Math.abs(dx) + Math.abs(dy) <= 5) return;

          drag.moved = true;
          var r = el.desktop.getBoundingClientRect();

          item.x = Math.max(0, Math.min(r.width - 92, drag.ix + dx));
          item.y = Math.max(0, Math.min(r.height - 82, drag.iy + dy));

          b.style.left = item.x + "px";
          b.style.top = item.y + "px";
        });

        b.addEventListener("pointerup", function (e) {
          if (!drag || e.pointerId !== drag.pointerId) return;

          var moved = drag.moved;
          drag = null;

          if (moved) {
            emit("desktop.item.moved", { itemId: item.id, x: item.x, y: item.y });
            render();
          }
        });

        el.desktop.appendChild(b);
      });
    }

    function renderWindows() {
      el.windows.replaceChildren();

      state.windows
        .filter(function (w) { return w.mode !== "minimized"; })
        .forEach(function (w) {
          var app = apps[w.appId];
          var win = document.createElement("section");

          win.className =
            "app-window" +
            (w.active ? " active" : "") +
            (w.mode === "maximized" ? " maximized" : "");

          win.style.zIndex = String(w.z);

          if (w.mode === "maximized") {
            win.style.left = "0";
            win.style.top = "0";
            win.style.width = "100%";
            win.style.height = "100%";
          } else {
            win.style.left = w.x + "px";
            win.style.top = w.y + "px";
            win.style.width = w.width + "px";
            win.style.height = w.height + "px";
          }

          var titlebar = document.createElement("div");
          titlebar.className = "titlebar";
          titlebar.innerHTML =
            '<div class="title">' + app.icon + " " + w.title + '</div>' +
            '<div class="controls">' +
              '<button class="ctrl min" aria-label="Minimera">—</button>' +
              '<button class="ctrl max" aria-label="' +
                (w.mode === "maximized" ? "Återställ" : "Maximera") +
              '">' +
                (w.mode === "maximized" ? "❐" : "□") +
              '</button>' +
              '<button class="ctrl close" aria-label="Stäng">✕</button>' +
            '</div>';

          var body = document.createElement("div");
          body.className = "content";
          body.appendChild(app.render());

          win.appendChild(titlebar);
          win.appendChild(body);

          win.addEventListener("pointerdown", function () {
            focusWindow(w.id);
          });

          var drag = null;

          titlebar.addEventListener("pointerdown", function (e) {
            if (e.button !== 0 || e.target.closest(".controls") || w.mode !== "normal") return;

            focusWindow(w.id, false);

            el.windows.querySelectorAll(".app-window.active").forEach(function (node) {
              node.classList.remove("active");
            });

            win.classList.add("active");
            win.style.zIndex = String(w.z);

            drag = {
              pointerId: e.pointerId,
              ox: e.clientX - w.x,
              oy: e.clientY - w.y
            };

            titlebar.setPointerCapture(e.pointerId);
          });

          titlebar.addEventListener("pointermove", function (e) {
            if (!drag || e.pointerId !== drag.pointerId) return;

            var r = el.workspace.getBoundingClientRect();

            w.x = Math.min(
              Math.max(-w.width + 120, e.clientX - r.left - drag.ox),
              Math.max(0, r.width - 120)
            );

            w.y = Math.min(
              Math.max(0, e.clientY - r.top - drag.oy),
              Math.max(0, r.height - 40)
            );

            win.style.left = w.x + "px";
            win.style.top = w.y + "px";
          });

          titlebar.addEventListener("pointerup", function (e) {
            if (!drag || e.pointerId !== drag.pointerId) return;
            drag = null;
            emit("window.moved", { windowId: w.id });
            render();
          });

          titlebar.addEventListener("dblclick", function (e) {
            if (e.target.closest(".controls")) return;
            if (w.mode === "maximized") restoreWindow(w.id);
            else maximizeWindow(w.id);
          });

          titlebar.querySelector(".min").addEventListener("click", function (e) {
            e.stopPropagation();
            minimizeWindow(w.id);
          });

          titlebar.querySelector(".max").addEventListener("click", function (e) {
            e.stopPropagation();
            if (w.mode === "maximized") restoreWindow(w.id);
            else maximizeWindow(w.id);
          });

          titlebar.querySelector(".close").addEventListener("click", function (e) {
            e.stopPropagation();
            closeWindow(w.id);
          });

          el.windows.appendChild(win);
        });
    }

    function renderTaskbar() {
      el.taskbar.replaceChildren();

      var start = document.createElement("button");
      start.type = "button";
      start.className = "tb";
      start.setAttribute("aria-label", "Start");
      start.textContent = "⊞";
      start.addEventListener("click", function (e) {
        e.stopPropagation();
        setStart(!state.startOpen);
      });

      el.taskbar.appendChild(start);

      var scenariosButton = document.createElement("button");
      scenariosButton.type = "button";
      scenariosButton.className = "tb" + (scenarioEngine.active() ? " running" : "");
      scenariosButton.title = "Scenarier";
      scenariosButton.setAttribute("aria-label", "Scenarier");
      scenariosButton.textContent = "🧪";
      scenariosButton.addEventListener("click", function (e) {
        e.stopPropagation();

        if (scenarioEngine.active()) {
          state.scenarioPanelOpen = true;
        } else {
          state.scenarioPanelOpen = !state.scenarioPanelOpen;
        }

        renderScenarioPanel();
      });
      el.taskbar.appendChild(scenariosButton);

      var ids = ["explorer", "calculator"];
      state.windows.forEach(function (w) {
        if (ids.indexOf(w.appId) === -1) ids.push(w.appId);
      });

      ids.forEach(function (id) {
        var app = apps[id];
        if (!app) return;

        var w = state.windows.find(function (x) { return x.appId === id; });
        var b = document.createElement("button");

        b.type = "button";
        b.className =
          "tb" +
          (w ? " running" : "") +
          (w && w.active ? " active" : "");

        b.title = app.title;
        b.textContent = app.icon;

        b.addEventListener("click", function () {
          if (!w) openApp(id);
          else if (w.mode === "minimized") restoreWindow(w.id);
          else if (w.active) minimizeWindow(w.id);
          else focusWindow(w.id);
        });

        el.taskbar.appendChild(b);
      });

      var spacer = document.createElement("div");
      spacer.className = "spacer";

      var clock = document.createElement("div");
      clock.className = "clock";

      var now = new Date();
      clock.innerHTML =
        "<div>" +
          now.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }) +
        "</div>" +
        "<div>" +
          now.toLocaleDateString("sv-SE") +
        "</div>";

      el.taskbar.appendChild(spacer);
      el.taskbar.appendChild(clock);
    }

    function renderStart() {
      el.start.hidden = !state.startOpen;
      el.start.replaceChildren();

      if (!state.startOpen) return;

      var h = document.createElement("h2");
      h.textContent = "Pinned";

      var grid = document.createElement("div");
      grid.className = "apps";

      ["explorer", "calculator", "notepad"].forEach(function (id) {
        var app = apps[id];
        var b = document.createElement("button");

        b.type = "button";
        b.className = "start-app";
        b.innerHTML =
          '<span style="font-size:30px">' + app.icon + '</span>' +
          '<span>' + app.title + "</span>";

        b.addEventListener("click", function () {
          openApp(id);
        });

        grid.appendChild(b);
      });

      el.start.appendChild(h);
      el.start.appendChild(grid);
    }

    function renderScenarioPanel() {
      el.scenario.hidden = !state.scenarioPanelOpen;
      el.scenario.replaceChildren();

      if (!state.scenarioPanelOpen) return;

      var heading = document.createElement("div");
      heading.className = "scenario-heading";
      heading.innerHTML = "<strong>Scenario Engine</strong><span>v0.4</span>";
      el.scenario.appendChild(heading);

      var active = scenarioEngine.active();

      if (active) {
        var card = document.createElement("div");
        card.className = "scenario-active " + (active.status === "completed" ? "completed" : "");

        var title = document.createElement("h3");
        title.textContent = active.title;

        var desc = document.createElement("p");
        desc.textContent = active.description;

        var status = document.createElement("div");
        status.className = "scenario-status";
        status.textContent = active.status === "completed"
          ? "✓ Scenario klart"
          : "Pågår • " + active.eventLog.length + " händelser";

        var actions = document.createElement("div");
        actions.className = "scenario-actions";

        var reset = document.createElement("button");
        reset.type = "button";
        reset.textContent = "Återställ";
        reset.addEventListener("click", function (e) {
          e.stopPropagation();
          scenarioEngine.reset(runtimeApi);
          render();
        });

        var stop = document.createElement("button");
        stop.type = "button";
        stop.textContent = "Avsluta";
        stop.addEventListener("click", function (e) {
          e.stopPropagation();
          scenarioEngine.stop();
          state.scenarioPanelOpen = false;
          render();
        });

        actions.appendChild(reset);
        actions.appendChild(stop);

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(status);
        card.appendChild(actions);
        el.scenario.appendChild(card);
      }

      var listTitle = document.createElement("h4");
      listTitle.textContent = active ? "Byt scenario" : "Välj scenario";
      el.scenario.appendChild(listTitle);

      scenarioEngine.list().forEach(function (scenario) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "scenario-option";
        b.innerHTML = "<strong></strong><span></span>";
        b.querySelector("strong").textContent = scenario.title;
        b.querySelector("span").textContent = scenario.description;

        b.addEventListener("click", function (e) {
          e.stopPropagation();
          scenarioEngine.load(scenario.id, runtimeApi);
          state.scenarioPanelOpen = true;
          render();
        });

        el.scenario.appendChild(b);
      });
    }

    function renderContext() {
      el.context.replaceChildren();
      if (!state.context) return;

      var menu = document.createElement("div");
      menu.className = "context";

      var entries =
        state.context.kind === "item"
          ? [
              ["open", "Open", false],
              ["sep"],
              ["rename", "Rename", true],
              ["delete", "Delete", true],
              ["sep"],
              ["properties", "Properties", true]
            ]
          : [
              ["view", "View", true],
              ["sort", "Sort by", true],
              ["refresh", "Refresh", false],
              ["sep"],
              ["new", "New", true]
            ];

      entries.forEach(function (entry) {
        if (entry[0] === "sep") {
          var sep = document.createElement("div");
          sep.className = "sep";
          menu.appendChild(sep);
          return;
        }

        var b = document.createElement("button");
        b.type = "button";
        b.textContent = entry[1];
        b.disabled = entry[2];

        b.addEventListener("click", function () {
          if (entry[0] === "open" && state.context.itemId) {
            var item = state.items.find(function (x) {
              return x.id === state.context.itemId;
            });

            if (item) {
              if (item.folderId) {
                state.explorer.folderId = item.folderId;
                state.explorer.selectedId = null;
              }
              openApp(item.appId);
            }
          }

          closeContext();
        });

        menu.appendChild(b);
      });

      el.context.appendChild(menu);

      var mr = menu.getBoundingClientRect();
      var vr = el.sim.getBoundingClientRect();

      menu.style.left =
        Math.max(4, Math.min(state.context.x, vr.width - mr.width - 6)) + "px";

      menu.style.top =
        Math.max(4, Math.min(state.context.y, vr.height - mr.height - 6)) + "px";
    }

    function renderDialog() {
      el.dialog.replaceChildren();
      if (!state.dialog) return;

      var overlay = document.createElement("div");
      overlay.className = "dialog-overlay";

      var box = document.createElement("div");
      box.className = "sim-dialog";

      var title = document.createElement("h3");
      title.textContent = state.dialog.title;

      var input = document.createElement("input");
      input.type = "text";
      input.value = state.dialog.value;

      var actions = document.createElement("div");
      actions.className = "dialog-actions";

      var cancel = document.createElement("button");
      cancel.type = "button";
      cancel.textContent = "Avbryt";

      var ok = document.createElement("button");
      ok.type = "button";
      ok.className = "primary";
      ok.textContent = "OK";

      function close() {
        state.dialog = null;
        renderDialog();
      }

      cancel.addEventListener("click", close);

      ok.addEventListener("click", function () {
        var fn = state.dialog && state.dialog.onConfirm;
        var value = input.value.trim();

        state.dialog = null;
        renderDialog();

        if (fn && value) fn(value);
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") ok.click();
        if (e.key === "Escape") close();
      });

      actions.appendChild(cancel);
      actions.appendChild(ok);

      box.appendChild(title);
      box.appendChild(input);
      box.appendChild(actions);

      overlay.appendChild(box);
      el.dialog.appendChild(overlay);

      setTimeout(function () {
        input.focus();
        input.select();
      }, 0);
    }

    function render() {
      renderDesktop();
      renderWindows();
      renderTaskbar();
      renderStart();
      renderScenarioPanel();
      renderContext();
      renderDialog();
    }

    el.sim.addEventListener("contextmenu", function (e) {
      if (e.target.closest(".desktop-item,.app-window,.taskbar")) return;
      e.preventDefault();
      openContext("desktop", e.clientX, e.clientY);
    });

    el.sim.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;

      if (!e.target.closest(".context") && state.context) closeContext();

      if (
        state.scenarioPanelOpen &&
        !scenarioEngine.active() &&
        !e.target.closest(".scenario-panel") &&
        !e.target.closest('[aria-label="Scenarier"]')
      ) {
        state.scenarioPanelOpen = false;
        renderScenarioPanel();
      }

      if (
        !e.target.closest(".start") &&
        !e.target.closest('[aria-label="Start"]') &&
        state.startOpen
      ) {
        setStart(false);
      }

      if (e.target === el.desktop) {
        state.selected = null;
        render();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (state.dialog) {
        state.dialog = null;
        renderDialog();
        return;
      }
      if (state.context) closeContext();
      if (state.startOpen) setStart(false);
      if (state.scenarioPanelOpen && !scenarioEngine.active()) {
        state.scenarioPanelOpen = false;
        renderScenarioPanel();
      }
    });

    window.__datorskolanSimulator = {
      state: state,
      vfs: vfs,
      openApp: openApp,
      on: on,
      scenarios: scenarioEngine,
      loadScenario: function (id) {
        var result = scenarioEngine.load(id, runtimeApi);
        state.scenarioPanelOpen = true;
        render();
        return result;
      },
      resetScenario: function () {
        var result = scenarioEngine.reset(runtimeApi);
        state.scenarioPanelOpen = true;
        render();
        return result;
      },
      stopScenario: function () {
        scenarioEngine.stop();
        state.scenarioPanelOpen = false;
        render();
      },
      resetVfs: function () {
        scenarioEngine.stop();
        resetForScenario();
      }
    };

    scenarioEngine.onChange(function () {
      if (el && el.scenario) renderScenarioPanel();
    });

    render();
  } catch (error) {
    fail(error);
  }
})();