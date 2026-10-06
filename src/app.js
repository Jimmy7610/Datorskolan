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
    var progressStore = new window.DatorskolanProgressStore(window.localStorage);
    var lessonEngine = new window.DatorskolanLessonEngine(window.DatorskolanLessons || [], progressStore);
    var win11 = window.DatorskolanWindows11;

    if (!win11) throw new Error("Windows 11 UI-lagret saknas");

    var state = {
      items: [
        { id: "documents", label: "Documents", iconKey: "folder-documents", x: 18, y: 18, appId: "explorer", folderId: "documents" },
        { id: "pictures", label: "Pictures", iconKey: "pictures", x: 18, y: 112, appId: "explorer", folderId: "pictures" },
        { id: "recycle-bin", label: "Papperskorgen", iconKey: "recycle", x: 18, y: 206, appId: "recycle-bin", folderId: "recycle-bin" }
      ],
      selected: null,
      startOpen: false,
      quickSettingsOpen: false,
      windows: [],
      activeWindowId: null,
      context: null,
      nextWindow: 1,
      nextZ: 10,
      explorer: {
        folderId: "home",
        selectedId: null,
        clipboard: null,
        search: ""
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
      scenarioPanelOpen: false,
      learningPanelOpen: false,
      learningHighlightSelector: null,
      learningSelectedModule: null,
      everydayLab: {
        mode: "copy-paste",
        completed: false,
        flags: {}
      },
      keyboardLab: {
        mode: "letters",
        completed: false,
        flags: {},
        clipboard: ""
      },
      browser: null,
      mail: null,
      settings: null,
      pdfViewer: null,
      installer: null,
      snipping: null,
      troubleDemo: null,
      software: { exerciseProgramInstalled: false },
      shell: win11.loadShellState(window.localStorage),
      mouseLab: {
        mode: "move",
        distance: 0,
        lastX: null,
        lastY: null,
        targetHits: 0,
        scrollDown: false,
        scrollUp: false,
        completed: false,
        finalFlags: {
          move: false,
          click: false,
          double: false,
          right: false,
          scroll: false,
          drag: false
        }
      }
    };

    var listeners = {};

    function emit(type, payload) {
      console.debug("[FakeWindows]", type, payload || {});
      (listeners[type] || []).forEach(function (fn) { fn(payload || {}); });

      if (scenarioEngine && runtimeApi) {
        scenarioEngine.observe(type, payload || {}, runtimeApi);
      }

      if (lessonEngine && learningRuntimeApi) {
        lessonEngine.observe(type, payload || {});
      }
    }

    function on(type, fn) {
      (listeners[type] || (listeners[type] = [])).push(fn);
    }

    function iconForNode(node) {
      if (node.type === "folder") return win11.icon("folder", 42);
      if (node.fileType === "image") return win11.icon("image-file", 42);
      if (/\.pdf$/i.test(node.name || "")) return win11.icon("pdf", 42);
      if (/\.exe$/i.test(node.name || "") || node.fileType === "installer") return win11.icon("settings", 42);
      if (/\.zip$/i.test(node.name || "")) return win11.icon("zip", 42);
      return win11.icon("text-file", 42);
    }

    function saveShellState() {
      state.shell = win11.saveShellState(state.shell, window.localStorage);
    }

    function isPinnedToTaskbar(appId) {
      return state.shell.pinnedTaskbar.indexOf(appId) >= 0;
    }

    function isPinnedToStart(appId) {
      return state.shell.pinnedStart.indexOf(appId) >= 0;
    }

    function pinToTaskbar(appId) {
      if (!apps[appId] || isPinnedToTaskbar(appId)) return;
      state.shell.pinnedTaskbar.push(appId);
      saveShellState();
      emit("shell.taskbarPinned", { appId: appId });
      render();
    }

    function unpinFromTaskbar(appId) {
      if (!apps[appId] || !isPinnedToTaskbar(appId)) return;
      state.shell.pinnedTaskbar = state.shell.pinnedTaskbar.filter(function (id) { return id !== appId; });
      saveShellState();
      emit("shell.taskbarUnpinned", { appId: appId });
      render();
    }

    function pinToStart(appId) {
      if (!apps[appId] || isPinnedToStart(appId)) return;
      state.shell.pinnedStart.push(appId);
      saveShellState();
      emit("shell.startPinned", { appId: appId });
      render();
    }

    function unpinFromStart(appId) {
      if (!apps[appId] || !isPinnedToStart(appId)) return;
      state.shell.pinnedStart = state.shell.pinnedStart.filter(function (id) { return id !== appId; });
      saveShellState();
      emit("shell.startUnpinned", { appId: appId });
      render();
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
      state.explorer.search = "";

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
      state.everydayLab = { mode: "copy-paste", completed: false, flags: {} };
      state.keyboardLab = { mode: "letters", completed: false, flags: {}, clipboard: "" };
      state.browser = null;
      state.mail = null;
      state.settings = null;
      state.pdfViewer = null;
      state.installer = null;
      state.snipping = null;
      state.troubleDemo = null;
      state.software = { exerciseProgramInstalled: false };

      state.mouseLab.mode = "move";
      state.mouseLab.distance = 0;
      state.mouseLab.lastX = null;
      state.mouseLab.lastY = null;
      state.mouseLab.targetHits = 0;
      state.mouseLab.scrollDown = false;
      state.mouseLab.scrollUp = false;
      state.mouseLab.completed = false;
      state.mouseLab.finalFlags = {
        move: false,
        click: false,
        double: false,
        right: false,
        scroll: false,
        drag: false
      };

      render();
    }

    function setExplorerFolder(folderId) {
      if (vfs.get(folderId)) {
        state.explorer.folderId = folderId;
        state.explorer.selectedId = null;
      }
      render();
    }

    function resetMouseLab(mode) {
      state.mouseLab.mode = mode || "move";
      state.mouseLab.distance = 0;
      state.mouseLab.lastX = null;
      state.mouseLab.lastY = null;
      state.mouseLab.targetHits = 0;
      state.mouseLab.scrollDown = false;
      state.mouseLab.scrollUp = false;
      state.mouseLab.completed = false;
      state.mouseLab.finalFlags = {
        move: false,
        click: false,
        double: false,
        right: false,
        scroll: false,
        drag: false
      };
    }

    function setMouseMode(mode) {
      resetMouseLab(mode);
      render();
    }

    function mouseModeTitle(mode) {
      var titles = {
        move: "Flytta muspekaren",
        target: "Träffa mål",
        click: "Vänsterklick",
        double: "Dubbelklick",
        right: "Högerklick",
        scroll: "Scrolla",
        hold: "Klicka och håll",
        drag: "Dra och släpp",
        final: "Slutuppdrag"
      };
      return titles[mode] || "Musträning";
    }

    function completeMouseEvent(type, payload) {
      if (state.mouseLab.completed && state.mouseLab.mode !== "final") return;
      if (state.mouseLab.mode !== "final") state.mouseLab.completed = true;
      emit(type, payload || {});
    }

    function checkMouseFinalComplete() {
      var flags = state.mouseLab.finalFlags;
      if (flags.move && flags.click && flags.double && flags.right && flags.scroll && flags.drag) {
        if (!state.mouseLab.completed) {
          state.mouseLab.completed = true;
          emit("mouse.final.complete", { flags: Object.assign({}, flags) });
        }
      }
    }

    function markFinalFlag(name) {
      if (state.mouseLab.mode !== "final") return;
      state.mouseLab.finalFlags[name] = true;
      checkMouseFinalComplete();
    }

    function renderMouseLab() {
      var mode = state.mouseLab.mode;
      var lab = document.createElement("div");
      lab.className = "mouse-lab mouse-mode-" + mode;

      var head = document.createElement("div");
      head.className = "mouse-lab-head";
      head.innerHTML = "<div><span>🖱️</span><strong></strong></div><em></em>";
      head.querySelector("strong").textContent = mouseModeTitle(mode);
      head.querySelector("em").textContent = state.mouseLab.completed ? "✓ Klar" : "Träningsyta";
      lab.appendChild(head);

      var stage = document.createElement("div");
      stage.className = "mouse-lab-stage";
      lab.appendChild(stage);

      function status(text) {
        var node = stage.querySelector(".mouse-lab-status");
        if (node) node.textContent = text;
      }

      function createTarget(className, label) {
        var target = document.createElement("button");
        target.type = "button";
        target.className = "mouse-target " + (className || "");
        target.textContent = label || "Mål";
        return target;
      }

      if (mode === "move") {
        stage.innerHTML = '<div class="mouse-lab-instruction">Flytta muspekaren runt inne i ytan.</div><div class="mouse-distance"><i></i></div><div class="mouse-lab-status">0%</div>';
        stage.addEventListener("pointermove", function (e) {
          if (state.mouseLab.lastX !== null) {
            var dx = e.clientX - state.mouseLab.lastX;
            var dy = e.clientY - state.mouseLab.lastY;
            state.mouseLab.distance += Math.sqrt(dx * dx + dy * dy);
          }
          state.mouseLab.lastX = e.clientX;
          state.mouseLab.lastY = e.clientY;
          var pct = Math.min(100, Math.round(state.mouseLab.distance / 1.6));
          stage.querySelector(".mouse-distance i").style.width = pct + "%";
          status(pct + "%");
          if (state.mouseLab.distance >= 160) completeMouseEvent("mouse.move.complete", { distance: Math.round(state.mouseLab.distance) });
        });
      }

      if (mode === "target") {
        stage.innerHTML = '<div class="mouse-lab-instruction">För pekaren till målen i ordning.</div><div class="mouse-target-field"></div><div class="mouse-lab-status">Mål 1 av 3</div>';
        var field = stage.querySelector(".mouse-target-field");
        ["1","2","3"].forEach(function (label, index) {
          var t = createTarget("target-" + (index + 1), label);
          if (index !== 0) t.classList.add("locked");
          t.addEventListener("pointerenter", function () {
            if (state.mouseLab.targetHits !== index) return;
            state.mouseLab.targetHits += 1;
            t.classList.add("hit");
            var next = field.querySelector(".target-" + (index + 2));
            if (next) next.classList.remove("locked");
            status(state.mouseLab.targetHits >= 3 ? "Alla mål träffade" : "Mål " + (state.mouseLab.targetHits + 1) + " av 3");
            if (state.mouseLab.targetHits >= 3) completeMouseEvent("mouse.target.complete", { hits: 3 });
          });
          field.appendChild(t);
        });
      }

      if (mode === "click") {
        stage.innerHTML = '<div class="mouse-lab-instruction">Klicka EN gång med vänster musknapp.</div><div class="mouse-centered"></div><div class="mouse-lab-status">Väntar på ett enkelklick</div>';
        var clickTarget = createTarget("big-target", "Klicka här");
        var clickTimer = null;
        clickTarget.addEventListener("click", function (e) {
          if (e.detail !== 1) return;
          clearTimeout(clickTimer);
          clickTimer = setTimeout(function () {
            status("Bra – ett klick");
            completeMouseEvent("mouse.click.complete", {});
          }, 280);
        });
        clickTarget.addEventListener("dblclick", function () {
          clearTimeout(clickTimer);
          status("Det blev två klick. Prova ett enda klick.");
          emit("mouse.click.double-error", {});
        });
        stage.querySelector(".mouse-centered").appendChild(clickTarget);
      }

      if (mode === "double") {
        stage.innerHTML = '<div class="mouse-lab-instruction">Dubbelklicka på målet.</div><div class="mouse-centered"></div><div class="mouse-lab-status">Två snabba klick på samma mål</div>';
        var doubleTarget = createTarget("big-target", "Dubbelklicka");
        doubleTarget.addEventListener("dblclick", function (e) {
          e.preventDefault();
          status("Bra – dubbelklick");
          completeMouseEvent("mouse.double.complete", {});
        });
        stage.querySelector(".mouse-centered").appendChild(doubleTarget);
      }

      if (mode === "right") {
        stage.innerHTML = '<div class="mouse-lab-instruction">Använd HÖGER musknapp på målet.</div><div class="mouse-centered"></div><div class="mouse-lab-status">Väntar på högerklick</div>';
        var rightTarget = createTarget("big-target", "Högerklicka");
        rightTarget.addEventListener("click", function () {
          status("Det var vänster musknapp. Prova den andra.");
          emit("mouse.right.left-error", {});
        });
        rightTarget.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          status("Bra – högerklick");
          completeMouseEvent("mouse.right.complete", {});
        });
        stage.querySelector(".mouse-centered").appendChild(rightTarget);
      }

      if (mode === "scroll") {
        stage.innerHTML = '<div class="mouse-lab-instruction">Scrolla först nedåt och sedan uppåt.</div><div class="mouse-scroll-box"><div class="mouse-scroll-content"></div></div><div class="mouse-lab-status">1. Scrolla nedåt</div>';
        var content = stage.querySelector(".mouse-scroll-content");
        for (var si = 1; si <= 18; si++) {
          var line = document.createElement("div");
          line.textContent = "Rad " + si;
          content.appendChild(line);
        }
        var scrollBox = stage.querySelector(".mouse-scroll-box");
        scrollBox.addEventListener("wheel", function (e) {
          if (e.deltaY > 0) state.mouseLab.scrollDown = true;
          if (e.deltaY < 0 && state.mouseLab.scrollDown) state.mouseLab.scrollUp = true;
          status(state.mouseLab.scrollDown ? (state.mouseLab.scrollUp ? "Bra – båda riktningarna" : "2. Scrolla uppåt") : "1. Scrolla nedåt");
          if (state.mouseLab.scrollDown && state.mouseLab.scrollUp) {
            completeMouseEvent("mouse.scroll.complete", {});
          }
        }, { passive: true });
      }

      if (mode === "hold") {
        stage.innerHTML = '<div class="mouse-lab-instruction">Tryck ned vänster musknapp och håll kvar.</div><div class="mouse-centered"></div><div class="mouse-hold-meter"><i></i></div><div class="mouse-lab-status">Håll i ungefär en sekund</div>';
        var holdTarget = createTarget("big-target", "Håll ned");
        var holdTimer = null;
        var holdStart = 0;
        holdTarget.addEventListener("pointerdown", function (e) {
          if (e.button !== 0) return;
          holdStart = Date.now();
          holdTarget.setPointerCapture(e.pointerId);
          stage.querySelector(".mouse-hold-meter i").classList.add("filling");
          holdTimer = setTimeout(function () {
            status("Bra – du höll kvar");
            completeMouseEvent("mouse.hold.complete", { durationMs: Date.now() - holdStart });
          }, 900);
        });
        function releaseHold() {
          clearTimeout(holdTimer);
          if (!state.mouseLab.completed) {
            stage.querySelector(".mouse-hold-meter i").classList.remove("filling");
            status("Lite längre. Håll knappen nere tills mätaren är full.");
          }
        }
        holdTarget.addEventListener("pointerup", releaseHold);
        holdTarget.addEventListener("pointercancel", releaseHold);
        stage.querySelector(".mouse-centered").appendChild(holdTarget);
      }

      if (mode === "drag") {
        stage.innerHTML = '<div class="mouse-lab-instruction">Dra den blå rutan till målområdet.</div><div class="mouse-drag-field"><div class="mouse-drag-token" draggable="true">Dra mig</div><div class="mouse-drop-zone">Släpp här</div></div><div class="mouse-lab-status">Klicka, håll, dra och släpp</div>';
        var token = stage.querySelector(".mouse-drag-token");
        var drop = stage.querySelector(".mouse-drop-zone");
        token.addEventListener("dragstart", function () {
          token.classList.add("dragging");
        });
        token.addEventListener("dragend", function () {
          token.classList.remove("dragging");
        });
        drop.addEventListener("dragover", function (e) {
          e.preventDefault();
          drop.classList.add("over");
        });
        drop.addEventListener("dragleave", function () {
          drop.classList.remove("over");
        });
        drop.addEventListener("drop", function (e) {
          e.preventDefault();
          drop.classList.remove("over");
          token.classList.add("dropped");
          status("Bra – objektet är på rätt plats");
          completeMouseEvent("mouse.drag.complete", {});
        });
      }

      if (mode === "final") {
        stage.innerHTML =
          '<div class="mouse-final-intro">Klara alla sex momenten. Du väljer själv ordning.</div>' +
          '<div class="mouse-final-grid">' +
            '<div class="final-move"><strong>Flytta</strong><span>Rör pekaren tydligt här</span></div>' +
            '<button class="final-click" type="button"><strong>Klick</strong><span>Ett vänsterklick</span></button>' +
            '<button class="final-double" type="button"><strong>Dubbelklick</strong><span>Två snabba klick</span></button>' +
            '<button class="final-right" type="button"><strong>Högerklick</strong><span>Använd höger knapp</span></button>' +
            '<div class="final-scroll"><strong>Scroll</strong><span>Rulla ned och upp</span></div>' +
            '<div class="final-drag"><div class="final-drag-token" draggable="true">Dra</div><div class="final-drop">Släpp</div></div>' +
          '</div>' +
          '<div class="mouse-final-progress"></div>';
        var finalMove = stage.querySelector(".final-move");
        var finalLast = null;
        var finalDistance = 0;
        finalMove.addEventListener("pointermove", function (e) {
          if (finalLast) {
            var fdx = e.clientX - finalLast.x;
            var fdy = e.clientY - finalLast.y;
            finalDistance += Math.sqrt(fdx * fdx + fdy * fdy);
          }
          finalLast = { x: e.clientX, y: e.clientY };
          if (finalDistance >= 100 && !state.mouseLab.finalFlags.move) {
            markFinalFlag("move");
            finalMove.classList.add("done");
            renderFinalProgress();
          }
        });
        stage.querySelector(".final-click").addEventListener("click", function () {
          markFinalFlag("click");
          this.classList.add("done");
          renderFinalProgress();
        });
        stage.querySelector(".final-double").addEventListener("dblclick", function () {
          markFinalFlag("double");
          this.classList.add("done");
          renderFinalProgress();
        });
        stage.querySelector(".final-right").addEventListener("contextmenu", function (e) {
          e.preventDefault();
          markFinalFlag("right");
          this.classList.add("done");
          renderFinalProgress();
        });
        var finalScroll = stage.querySelector(".final-scroll");
        var fsDown = false;
        finalScroll.addEventListener("wheel", function (e) {
          if (e.deltaY > 0) fsDown = true;
          if (fsDown && e.deltaY < 0) {
            markFinalFlag("scroll");
            finalScroll.classList.add("done");
            renderFinalProgress();
          }
        }, { passive: true });
        var finalToken = stage.querySelector(".final-drag-token");
        var finalDrop = stage.querySelector(".final-drop");
        finalDrop.addEventListener("dragover", function (e) { e.preventDefault(); });
        finalDrop.addEventListener("drop", function (e) {
          e.preventDefault();
          markFinalFlag("drag");
          finalDrop.classList.add("done");
          finalToken.classList.add("done");
          renderFinalProgress();
        });

        function renderFinalProgress() {
          var flags = state.mouseLab.finalFlags;
          var names = [["move","Flytta"],["click","Klick"],["double","Dubbel"],["right","Höger"],["scroll","Scroll"],["drag","Dra"]];
          var progress = stage.querySelector(".mouse-final-progress");
          progress.replaceChildren();
          names.forEach(function (entry) {
            var chip = document.createElement("span");
            chip.className = flags[entry[0]] ? "done" : "";
            chip.textContent = (flags[entry[0]] ? "✓ " : "") + entry[1];
            progress.appendChild(chip);
          });
        }
        renderFinalProgress();
      }

      return lab;
    }

    function applyStartState(start) {
      start = start || {};
      if (start.keyboardMode) {
        state.keyboardLab = { mode: start.keyboardMode, completed: false, flags: {}, clipboard: "" };
      }
      if (start.everydayMode) {
        state.everydayLab = { mode: start.everydayMode, completed: false, flags: {} };
      }
      if (Array.isArray(start.pinnedTaskbar)) {
        state.shell.pinnedTaskbar = start.pinnedTaskbar.slice();
        saveShellState();
      }
      if (Array.isArray(start.pinnedStart)) {
        state.shell.pinnedStart = start.pinnedStart.slice();
        saveShellState();
      }
      if (start.settingsPage) {
        state.settings = state.settings || {};
        state.settings.page = start.settingsPage;
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
        vfs.mountDrive("usb-drive", "USB-enhet (E:)");
        if (!vfs.list("usb-drive").some(function (node) { return node.name === "rapport.pdf"; })) {
          vfs.createFile("usb-drive", "rapport.pdf", "pdf", "");
        }
      }
      if (start.browserReset) state.browser = null;
      if (start.mailReset) state.mail = null;
    }

    var runtimeApi = {
      vfs: vfs,
      resetForScenario: resetForScenario,
      setExplorerFolder: setExplorerFolder,
      setMouseMode: setMouseMode,
      applyStartState: applyStartState,
      openApp: openApp
    };

    function setLearningHighlight(selector) {
      state.learningHighlightSelector = selector || null;
      applyLearningHighlight();
    }

    function loadScenarioForLesson(id) {
      var result = scenarioEngine.load(id, runtimeApi);
      state.scenarioPanelOpen = false;
      render();
      return result;
    }

    var learningRuntimeApi = {
      loadScenario: loadScenarioForLesson,
      getScenarioStatus: function () {
        var active = scenarioEngine.active();
        return active ? active.status : null;
      },
      setLearningHighlight: setLearningHighlight
    };

    function renderExplorer() {
      var wrapper = document.createElement("div");
      wrapper.className = "explorer-v2";

      var sidebar = document.createElement("aside");
      sidebar.className = "explorer-sidebar";

      var explorerEntries = [
        ["home", "home", "Home"],
        ["documents", "folder-documents", "Documents"],
        ["pictures", "pictures", "Pictures"],
        ["downloads", "download", "Downloads"],
        ["onedrive", "onedrive", "OneDrive"]
      ];

      if (vfs.get("usb-drive")) {
        explorerEntries.push(["usb-drive", "usb-drive", "USB-enhet (E:)"]);
      }

      explorerEntries.push(["recycle-bin", "recycle", "Papperskorgen"]);

      explorerEntries.forEach(function (entry) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "explorer-side-button" + (state.explorer.folderId === entry[0] ? " active" : "");
        b.innerHTML = '<span class="explorer-side-icon">' + win11.icon(entry[1], 19) + '</span><span class="explorer-side-label"></span>';
        b.querySelector(".explorer-side-label").textContent = entry[2];
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          navigateFolder(entry[0]);
        });

        if (entry[0] === "usb-drive") {
          b.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            e.stopPropagation();
            openContext("removable-drive", e.clientX, e.clientY, "usb-drive");
          });
        }

        if (entry[0] !== "recycle-bin") {
          b.addEventListener("dragover", function (e) {
            if (!e.dataTransfer.types.includes("application/x-datorskolan-node")) return;
            e.preventDefault();
            b.classList.add("drop-target");
          });
          b.addEventListener("dragleave", function () {
            b.classList.remove("drop-target");
          });
          b.addEventListener("drop", function (e) {
            e.preventDefault();
            b.classList.remove("drop-target");
            var nodeId = e.dataTransfer.getData("application/x-datorskolan-node");
            var moved = vfs.move(nodeId, entry[0]);
            if (moved) {
              state.explorer.selectedId = null;
              emit("file.moved", { id: moved.id, name: moved.name, parentId: moved.parentId, via: "drag-drop" });
              render();
            }
          });
        }

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

      var addressRow = document.createElement("div");
      addressRow.className = "explorer-address-row";

      var address = document.createElement("div");
      address.className = "explorer-address";
      address.textContent = vfs.path(state.explorer.folderId);

      var search = document.createElement("input");
      search.type = "search";
      search.className = "explorer-search";
      search.placeholder = "Sök i mappen";
      search.setAttribute("aria-label", "Sök i aktuell mapp");
      search.value = state.explorer.search || "";
      search.addEventListener("input", function (e) {
        state.explorer.search = e.target.value;
        emit("file.search", {
          query: state.explorer.search,
          queryNormalized: String(state.explorer.search || "").trim().toLocaleLowerCase("sv"),
          folderId: state.explorer.folderId
        });
        renderWindows();
      });

      addressRow.appendChild(address);
      addressRow.appendChild(search);

      var grid = document.createElement("div");
      grid.className = "vfs-grid";

      var nodes = vfs.list(state.explorer.folderId);
      var query = String(state.explorer.search || "").trim().toLocaleLowerCase("sv");
      if (query) {
        nodes = nodes.filter(function (node) {
          return node.name.toLocaleLowerCase("sv").indexOf(query) >= 0;
        });
      }

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
        item.draggable = !node.system;
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
          openContext("vfs-item", e.clientX, e.clientY, node.id);
        });

        item.addEventListener("dragstart", function (e) {
          if (node.system) {
            e.preventDefault();
            return;
          }
          e.dataTransfer.setData("application/x-datorskolan-node", node.id);
          e.dataTransfer.effectAllowed = "move";
          item.classList.add("dragging");
          emit("file.dragStarted", { id: node.id, name: node.name });
        });

        item.addEventListener("dragend", function () {
          item.classList.remove("dragging");
        });

        grid.appendChild(item);
      });

      main.appendChild(toolbar);
      main.appendChild(addressRow);
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
        title: "Utforskaren",
        iconKey: "explorer",
        icon: win11.icon("explorer", 18),
        w: 820,
        h: 520,
        render: renderExplorer
      },

      calculator: {
        title: "Kalkylator",
        iconKey: "calculator",
        icon: win11.icon("calculator", 18),
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
        title: "Anteckningar",
        iconKey: "notepad",
        icon: win11.icon("notepad", 18),
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
            emit("notepad.input", { length: area.value.length });
          });

          area.addEventListener("keydown", function (e) {
            if (!e.ctrlKey) return;
            var key = e.key.toLowerCase();
            if (key === "z") emit("notepad.undo", {});
            if (key === "y") emit("notepad.redo", {});
          });

          area.addEventListener("paste", function (e) {
            var text = "";
            try {
              text = e.clipboardData ? e.clipboardData.getData("text/plain") : "";
            } catch (error) {}
            emit("notepad.pasted", { text: text });
          });

          wrap.appendChild(toolbar);
          wrap.appendChild(area);
          return wrap;
        }
      },

      photos: {
        title: "Foton",
        iconKey: "photos",
        icon: win11.icon("photos", 18),
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

      "everyday-lab": {
        title: "Vardagsdatorn",
        iconKey: "settings",
        icon: win11.icon("settings", 18),
        w: 820,
        h: 600,
        render: function () {
          return window.DatorskolanEverydayApps.render({ state: state, emit: emit, vfs: vfs });
        }
      },

      "keyboard-lab": {
        title: "Keyboard Lab",
        iconKey: "notepad",
        icon: win11.icon("notepad", 18),
        w: 760,
        h: 560,
        render: function () {
          return window.DatorskolanAdvancedApps.renderKeyboard({ state: state, emit: emit, vfs: vfs });
        }
      },

      "trouble-demo": {
        title: "Rapportvisaren",
        iconKey: "text-file",
        icon: win11.icon("text-file", 18),
        w: 680,
        h: 460,
        render: function () {
          return window.DatorskolanTroubleApp.render({ state: state, emit: emit, vfs: vfs });
        }
      },

      snipping: {
        title: "Skärmklippverktyget",
        iconKey: "snipping",
        icon: win11.icon("snipping", 18),
        w: 760,
        h: 540,
        render: function () {
          return window.DatorskolanSnippingApp.render({ state: state, emit: emit, vfs: vfs });
        }
      },

      installer: {
        title: "Installera Övningsprogram",
        iconKey: "settings",
        icon: win11.icon("settings", 18),
        w: 620,
        h: 470,
        render: function () {
          return window.DatorskolanInstallerApp.render({ state: state, emit: emit, vfs: vfs });
        }
      },

      pdf: {
        title: "PDF",
        iconKey: "pdf",
        icon: win11.icon("pdf", 18),
        w: 880,
        h: 620,
        render: function () {
          return window.DatorskolanPdfApp.render({ state: state, emit: emit, vfs: vfs });
        }
      },

      settings: {
        title: "Inställningar",
        iconKey: "settings",
        icon: win11.icon("settings", 18),
        w: 900,
        h: 620,
        render: function () {
          return window.DatorskolanSettingsApp.render({ state: state, emit: emit, vfs: vfs });
        }
      },

      browser: {
        title: "Google Chrome",
        iconKey: "chrome",
        icon: win11.icon("chrome", 18),
        w: 960,
        h: 650,
        render: function () {
          return window.DatorskolanChromeApp.render({ state: state, emit: emit, vfs: vfs });
        }
      },

      mail: {
        title: "E-post",
        iconKey: "mail",
        icon: win11.icon("mail", 18),
        w: 900,
        h: 620,
        render: function () {
          return window.DatorskolanAdvancedApps.renderMail({ state: state, emit: emit, vfs: vfs });
        }
      },

      "mouse-lab": {
        title: "Mouse Lab",
        icon: "🖱️",
        w: 760,
        h: 560,
        render: renderMouseLab
      },

      "recycle-bin": {
        title: "Papperskorgen",
        iconKey: "recycle",
        icon: win11.icon("recycle", 18),
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
      '<aside class="learning-panel" hidden></aside>' +
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
      learning: shell.querySelector(".learning-panel"),
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
      if (
        appId === "trouble-demo" &&
        state.troubleDemo &&
        state.troubleDemo.closedAfterFreeze
      ) {
        state.troubleDemo.mode = "normal";
        state.troubleDemo.frozen = false;
        state.troubleDemo.restarted = true;
        state.troubleDemo.closedAfterFreeze = false;
        emit("troubleshooting.restarted", { appId: "trouble-demo" });
      }

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

    function forceCloseWindow(id) {
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

    function closeWindow(id) {
      var win = state.windows.find(function (w) { return w.id === id; });
      if (!win) return;

      if (
        win.appId === "trouble-demo" &&
        state.troubleDemo &&
        state.troubleDemo.mode === "frozen"
      ) {
        state.dialog = {
          kind: "app-not-responding",
          windowId: id,
          title: "Rapportvisaren svarar inte"
        };
        emit("troubleshooting.notRespondingDialog", { appId: "trouble-demo" });
        renderDialog();
        return;
      }

      if (win.appId === "notepad" && state.notepadDirty) {
        state.dialog = {
          kind: "unsaved-notepad",
          windowId: id,
          title: "Anteckningar",
          message: "Vill du spara ändringarna i " +
            (state.notepadFileId && vfs.get(state.notepadFileId)
              ? vfs.get(state.notepadFileId).name
              : "Nytt dokument") +
            "?"
        };
        emit("dialog.unsavedOpened", { appId: "notepad", windowId: id });
        renderDialog();
        return;
      }

      forceCloseWindow(id);
    }

    function setStart(open) {
      if (state.startOpen === open) return;
      state.startOpen = open;
      state.quickSettingsOpen = false;
      state.context = null;
      emit(open ? "startMenu.opened" : "startMenu.closed", {});
      render();
    }

    function openContext(kind, clientX, clientY, itemId) {
      var r = el.sim.getBoundingClientRect();
      state.quickSettingsOpen = false;
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
          '<span class="icon">' + win11.icon(item.iconKey || "folder", 46) + '</span>' +
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
            (w.mode === "maximized" ? " maximized" : "") +
            (w.appId === "browser" ? " chrome-window" : "");

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
            '<div class="title"><span class="window-app-icon">' + win11.icon(app.iconKey || "settings", 17) + '</span><span>' + w.title + '</span></div>' +
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

          if (w.mode === "normal") {
            var resizeHandle = document.createElement("div");
            resizeHandle.className = "window-resize-handle";
            var resizeDrag = null;

            resizeHandle.addEventListener("pointerdown", function (e) {
              if (e.button !== 0) return;
              e.stopPropagation();
              focusWindow(w.id, false);
              resizeDrag = {
                pointerId: e.pointerId,
                sx: e.clientX,
                sy: e.clientY,
                sw: w.width,
                sh: w.height
              };
              resizeHandle.setPointerCapture(e.pointerId);
            });

            resizeHandle.addEventListener("pointermove", function (e) {
              if (!resizeDrag || e.pointerId !== resizeDrag.pointerId) return;
              var workspaceRect = el.workspace.getBoundingClientRect();
              w.width = Math.max(280, Math.min(workspaceRect.width - w.x, resizeDrag.sw + (e.clientX - resizeDrag.sx)));
              w.height = Math.max(180, Math.min(workspaceRect.height - w.y, resizeDrag.sh + (e.clientY - resizeDrag.sy)));
              win.style.width = w.width + "px";
              win.style.height = w.height + "px";
            });

            resizeHandle.addEventListener("pointerup", function (e) {
              if (!resizeDrag || e.pointerId !== resizeDrag.pointerId) return;
              resizeDrag = null;
              emit("window.resized", { windowId: w.id, width: Math.round(w.width), height: Math.round(w.height) });
              render();
            });

            win.appendChild(resizeHandle);
          }

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

            var workspaceRect = el.workspace.getBoundingClientRect();
            var snapSide = null;
            var edgeThreshold = 26;

            if (e.clientX <= workspaceRect.left + edgeThreshold) {
              snapSide = "left";
              w.x = 0;
              w.y = 0;
              w.width = Math.floor(workspaceRect.width / 2);
              w.height = workspaceRect.height;
            } else if (e.clientX >= workspaceRect.right - edgeThreshold) {
              snapSide = "right";
              w.x = Math.floor(workspaceRect.width / 2);
              w.y = 0;
              w.width = Math.ceil(workspaceRect.width / 2);
              w.height = workspaceRect.height;
            }

            drag = null;

            if (snapSide) {
              emit("window.snapped", { windowId: w.id, appId: w.appId, side: snapSide });
            } else {
              emit("window.moved", { windowId: w.id });
            }

            render();
          });

          titlebar.addEventListener("dblclick", function (e) {
            if (e.target.closest(".controls")) return;
            if (w.mode === "maximized") restoreWindow(w.id);
            else maximizeWindow(w.id);
          });

          if (w.appId === "browser") {
            var chromeDragHandle = body.querySelector(".chrome-tabs-row");

            if (chromeDragHandle) {
              var chromeDrag = null;

              chromeDragHandle.addEventListener("pointerdown", function (e) {
                if (
                  e.button !== 0 ||
                  e.target.closest("button") ||
                  e.target.closest(".chrome-tab") ||
                  w.mode !== "normal"
                ) return;

                focusWindow(w.id, false);

                chromeDrag = {
                  pointerId: e.pointerId,
                  ox: e.clientX - w.x,
                  oy: e.clientY - w.y
                };

                chromeDragHandle.setPointerCapture(e.pointerId);
              });

              chromeDragHandle.addEventListener("pointermove", function (e) {
                if (!chromeDrag || e.pointerId !== chromeDrag.pointerId) return;

                var workspaceRect = el.workspace.getBoundingClientRect();
                w.x = Math.min(
                  Math.max(-w.width + 120, e.clientX - workspaceRect.left - chromeDrag.ox),
                  Math.max(0, workspaceRect.width - 120)
                );
                w.y = Math.min(
                  Math.max(0, e.clientY - workspaceRect.top - chromeDrag.oy),
                  Math.max(0, workspaceRect.height - 40)
                );

                win.style.left = w.x + "px";
                win.style.top = w.y + "px";
              });

              chromeDragHandle.addEventListener("pointerup", function (e) {
                if (!chromeDrag || e.pointerId !== chromeDrag.pointerId) return;

                var workspaceRect = el.workspace.getBoundingClientRect();
                var side = null;

                if (e.clientX <= workspaceRect.left + 26) side = "left";
                if (e.clientX >= workspaceRect.right - 26) side = "right";

                chromeDrag = null;

                if (side) {
                  w.x = side === "left" ? 0 : Math.floor(workspaceRect.width / 2);
                  w.y = 0;
                  w.width = side === "left" ? Math.floor(workspaceRect.width / 2) : Math.ceil(workspaceRect.width / 2);
                  w.height = workspaceRect.height;
                  emit("window.snapped", { windowId: w.id, appId: w.appId, side: side });
                } else {
                  emit("window.moved", { windowId: w.id });
                }

                render();
              });
            }
          }

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

      var center = document.createElement("div");
      center.className = "taskbar-center";

      var start = document.createElement("button");
      start.type = "button";
      start.className = "tb start-button" + (state.startOpen ? " active" : "");
      start.setAttribute("aria-label", "Start");
      start.title = "Start";
      start.innerHTML = win11.icon("start", 24);
      start.addEventListener("click", function (e) {
        e.stopPropagation();
        setStart(!state.startOpen);
      });
      center.appendChild(start);

      var learningButton = document.createElement("button");
      learningButton.type = "button";
      learningButton.className = "tb" + (lessonEngine.active() ? " running" : "");
      learningButton.title = "Datorskolan";
      learningButton.setAttribute("aria-label", "Datorskolan");
      learningButton.innerHTML = win11.icon("school", 25);
      learningButton.addEventListener("click", function (e) {
        e.stopPropagation();
        if (lessonEngine.active()) state.learningPanelOpen = true;
        else state.learningPanelOpen = !state.learningPanelOpen;
        renderLearningPanel();
      });
      center.appendChild(learningButton);

      var scenariosButton = document.createElement("button");
      scenariosButton.type = "button";
      scenariosButton.className = "tb" + (scenarioEngine.active() ? " running" : "");
      scenariosButton.title = "Scenarier";
      scenariosButton.setAttribute("aria-label", "Scenarier");
      scenariosButton.innerHTML = win11.icon("flask", 24);
      scenariosButton.addEventListener("click", function (e) {
        e.stopPropagation();
        if (scenarioEngine.active()) state.scenarioPanelOpen = true;
        else state.scenarioPanelOpen = !state.scenarioPanelOpen;
        renderScenarioPanel();
      });
      center.appendChild(scenariosButton);

      var ids = state.shell.pinnedTaskbar.slice();
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
          "tb taskbar-app" +
          (w ? " running" : "") +
          (w && w.active ? " active" : "") +
          (isPinnedToTaskbar(id) ? " pinned" : "");
        b.dataset.appId = id;
        b.title = app.title;
        b.setAttribute("aria-label", app.title);
        b.innerHTML = win11.icon(app.iconKey || "settings", 26);

        b.addEventListener("click", function () {
          if (!w) openApp(id);
          else if (w.mode === "minimized") restoreWindow(w.id);
          else if (w.active) minimizeWindow(w.id);
          else focusWindow(w.id);
        });

        b.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          e.stopPropagation();
          openContext("taskbar-app", e.clientX, e.clientY, id);
        });

        center.appendChild(b);
      });

      var right = document.createElement("div");
      right.className = "taskbar-right";

      var systemTray = document.createElement("button");
      systemTray.type = "button";
      systemTray.className = "system-tray" + (state.quickSettingsOpen ? " active" : "");
      systemTray.title = "Snabbinställningar";
      systemTray.setAttribute("aria-label", "Snabbinställningar");
      systemTray.innerHTML =
        '<span>' + win11.icon("wifi", 16) + '</span>' +
        '<span>' + win11.icon("speaker", 16) + '</span>' +
        '<span>' + win11.icon("battery", 18) + '</span>';
      systemTray.addEventListener("click", function (e) {
        e.stopPropagation();
        state.quickSettingsOpen = !state.quickSettingsOpen;
        state.context = null;
        state.startOpen = false;
        render();
      });

      var homeButton = document.createElement("button");
      homeButton.type = "button";
      homeButton.className = "tb product-home-taskbar";
      homeButton.title = "Till Datorskolans startsida";
      homeButton.setAttribute("aria-label", "Till Datorskolans startsida");
      homeButton.innerHTML = win11.icon("home", 20);
      homeButton.addEventListener("click", function (e) {
        e.stopPropagation();
        if (window.DatorskolanProductShell && typeof window.DatorskolanProductShell.showLanding === "function") {
          window.DatorskolanProductShell.showLanding();
        }
      });

      var clock = document.createElement("div");
      clock.className = "clock";
      var now = new Date();
      clock.innerHTML =
        "<div>" + now.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }) + "</div>" +
        "<div>" + now.toLocaleDateString("sv-SE") + "</div>";

      right.appendChild(systemTray);
      right.appendChild(homeButton);
      right.appendChild(clock);

      el.taskbar.appendChild(center);
      el.taskbar.appendChild(right);
    }
    function renderStart() {
      el.start.hidden = !state.startOpen;
      el.start.replaceChildren();
      if (!state.startOpen) return;

      var searchWrap = document.createElement("div");
      searchWrap.className = "win11-start-search";
      searchWrap.innerHTML = '<span class="search-glyph">⌕</span>';

      var search = document.createElement("input");
      search.type = "search";
      search.className = "start-search";
      search.placeholder = "Skriv här för att söka";
      search.setAttribute("aria-label", "Sök efter program");
      searchWrap.appendChild(search);

      var header = document.createElement("div");
      header.className = "start-section-head";
      header.innerHTML = "<strong>Fäst</strong><span>Alla appar ›</span>";

      var grid = document.createElement("div");
      grid.className = "apps win11-pinned-apps";

      function visibleAppIds(query) {
        var all = ["explorer","browser","calculator","notepad","mail","photos","settings","snipping"];
        if (state.troubleDemo) all.push("trouble-demo");
        var normalized = String(query || "").trim().toLocaleLowerCase("sv");
        if (!normalized) return state.shell.pinnedStart.filter(function (id) { return apps[id]; });

        return all.filter(function (id) {
          var app = apps[id];
          return app && app.title.toLocaleLowerCase("sv").indexOf(normalized) >= 0;
        });
      }

      function drawApps(query) {
        grid.replaceChildren();

        visibleAppIds(query).forEach(function (id) {
          var app = apps[id];
          var b = document.createElement("button");
          b.type = "button";
          b.className = "start-app";
          b.dataset.appId = id;
          b.innerHTML =
            '<span class="start-app-icon">' + win11.icon(app.iconKey || "settings", 32) + '</span>' +
            '<span class="start-app-name"></span>';
          b.querySelector(".start-app-name").textContent = app.title;

          b.addEventListener("click", function () {
            openApp(id);
          });

          b.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            e.stopPropagation();
            openContext("start-app", e.clientX, e.clientY, id);
          });

          grid.appendChild(b);
        });

        if (!grid.children.length) {
          var empty = document.createElement("div");
          empty.className = "start-search-empty";
          empty.textContent = "Inga appar hittades.";
          grid.appendChild(empty);
        }
      }

      search.addEventListener("input", function () {
        emit("startMenu.searched", {
          query: search.value,
          queryNormalized: String(search.value || "").trim().toLocaleLowerCase("sv")
        });
        drawApps(search.value);
      });

      var recommended = document.createElement("div");
      recommended.className = "start-recommended";
      recommended.innerHTML =
        "<div class='start-section-head'><strong>Rekommenderat</strong><span>Mer ›</span></div>" +
        "<div class='recommended-row'><span class='recommended-icon'></span><div><strong>Kom igång</strong><small>Datorskolan – trygg Windows-träning</small></div></div>";
      recommended.querySelector(".recommended-icon").innerHTML = win11.icon("school", 28);

      var footer = document.createElement("div");
      footer.className = "start-footer";
      footer.innerHTML = "<div class='start-user'><span>J</span><strong>Jimmy</strong></div><button type='button' class='start-power' aria-label='Ström'>⏻</button>";

      el.start.appendChild(searchWrap);
      el.start.appendChild(header);
      el.start.appendChild(grid);
      el.start.appendChild(recommended);
      el.start.appendChild(footer);
      drawApps("");
    }
    function moduleLabel(moduleId) {
      var labels = {
        files: "Filer och mappar",
        programs: "Program",
        mouse: "Mus",
        keyboard: "Tangentbord",
        windows: "Windows",
        internet: "Internet och webbläsare",
        mail: "E-post",
        security: "Säkerhet",
        everyday: "Vardagsdatorn",
        devices: "Enheter & anslutningar",
        troubleshooting: "När något krånglar",
        final: "Självständighetsprov",
        basics: "Datorgrunder"
      };
      return labels[moduleId] || moduleId;
    }

    function applyLearningHighlight() {
      if (!el || !el.sim) return;
      el.sim.querySelectorAll(".learning-highlight").forEach(function (node) {
        node.classList.remove("learning-highlight");
      });

      if (!state.learningHighlightSelector) return;

      try {
        var target = el.sim.querySelector(state.learningHighlightSelector);
        if (target) target.classList.add("learning-highlight");
      } catch (error) {
        console.warn("[LessonEngine] Ogiltig highlight-selector", state.learningHighlightSelector);
      }
    }

    function renderLearningPanel() {
      var active = lessonEngine.active();
      var shouldShow = !!active || state.learningPanelOpen;

      el.learning.hidden = !shouldShow;
      el.learning.replaceChildren();

      if (!shouldShow) return;
      if (active) state.learningPanelOpen = true;

      var header = document.createElement("div");
      header.className = "learning-header";
      header.innerHTML = "<div><strong>Datorskolan</strong><span>Din kurs</span></div><span class='learning-version'>LIVE</span>";
      el.learning.appendChild(header);

      if (!active) {
        var intro = document.createElement("p");
        intro.className = "learning-intro";
        intro.textContent = "Välj en lektion. Dina framsteg sparas automatiskt på den här enheten.";
        el.learning.appendChild(intro);

        progressStore.refreshReviewStatus(14);

        var lessons = lessonEngine.list();
        var profile = progressStore.profile();

        if (profile.mode === "child") {
          intro.textContent = "Välj ett uppdrag. Vi tar en sak i taget och du kan alltid be om hjälp.";
        } else if (profile.mode === "fast") {
          intro.textContent = "Snabbläge: kända moment hoppar direkt till övningen.";
        }

        var modeRow = document.createElement("div");
        modeRow.className = "learning-mode-row";
        modeRow.innerHTML = "<span>Läge</span><div><button data-mode='standard'>Vuxen</button><button data-mode='child'>Barn</button><button data-mode='fast'>Snabb</button></div>";
        modeRow.querySelectorAll("button").forEach(function (button) {
          var mode = button.getAttribute("data-mode");
          if (profile.mode === mode) button.classList.add("active");
          button.addEventListener("click", function (e) {
            e.stopPropagation();
            progressStore.setMode(mode);
            el.sim.classList.toggle("child-mode", mode === "child");
            el.sim.classList.toggle("fast-mode", mode === "fast");
            renderLearningPanel();
          });
        });
        el.learning.appendChild(modeRow);

        var recommended = progressStore.recommendLesson(lessons);
        if (recommended && !state.learningSelectedModule) {
          var recommendation = document.createElement("button");
          recommendation.type = "button";
          recommendation.className = "learning-recommendation";
          recommendation.innerHTML = "<span></span><strong></strong><small></small><em>Fortsätt →</em>";
          recommendation.querySelector("span").textContent = profile.mode === "child" ? "NÄSTA UPPDRAG" : "NÄSTA REKOMMENDERADE";
          recommendation.querySelector("strong").textContent = recommended.title;
          recommendation.querySelector("small").textContent = moduleLabel(recommended.moduleId) + " • " + recommended.summary;
          recommendation.addEventListener("click", function (e) {
            e.stopPropagation();
            lessonEngine.start(recommended.id, learningRuntimeApi);
            state.learningPanelOpen = true;
            state.scenarioPanelOpen = false;
            render();
          });
          el.learning.appendChild(recommendation);
        }

        var moduleMap = {};
        lessons.forEach(function (lesson) {
          if (!moduleMap[lesson.moduleId]) {
            moduleMap[lesson.moduleId] = {
              id: lesson.moduleId,
              title: moduleLabel(lesson.moduleId),
              lessons: [],
              completed: 0
            };
          }
          moduleMap[lesson.moduleId].lessons.push(lesson);
          if (progressStore.lesson(lesson.id).status === "completed") {
            moduleMap[lesson.moduleId].completed += 1;
          }
        });

        var moduleOrder = [
          "basics",
          "mouse",
          "keyboard",
          "windows",
          "files",
          "programs",
          "internet",
          "mail",
          "security",
          "everyday",
          "devices",
          "troubleshooting",
          "final"
        ];

        var modules = Object.keys(moduleMap).map(function (id) {
          return moduleMap[id];
        }).sort(function (a, b) {
          var ai = moduleOrder.indexOf(a.id);
          var bi = moduleOrder.indexOf(b.id);
          if (ai < 0) ai = moduleOrder.length;
          if (bi < 0) bi = moduleOrder.length;
          return ai - bi;
        });

        function startDashboardLesson(lesson) {
          lessonEngine.start(lesson.id, learningRuntimeApi);
          state.learningPanelOpen = true;
          state.scenarioPanelOpen = false;
          render();
        }

        if (state.learningSelectedModule && moduleMap[state.learningSelectedModule]) {
          var selectedModule = moduleMap[state.learningSelectedModule];

          var selectedHead = document.createElement("div");
          selectedHead.className = "learning-module-view-head";

          var backModules = document.createElement("button");
          backModules.type = "button";
          backModules.textContent = "← Alla moduler";
          backModules.addEventListener("click", function (e) {
            e.stopPropagation();
            state.learningSelectedModule = null;
            renderLearningPanel();
          });

          var selectedTitle = document.createElement("div");
          selectedTitle.innerHTML = "<strong></strong><span></span>";
          selectedTitle.querySelector("strong").textContent = selectedModule.title;
          selectedTitle.querySelector("span").textContent =
            selectedModule.completed + " av " + selectedModule.lessons.length + " lektioner klara";

          selectedHead.appendChild(backModules);
          selectedHead.appendChild(selectedTitle);
          el.learning.appendChild(selectedHead);

          var lessonList = document.createElement("div");
          lessonList.className = "learning-lesson-list module-view";

          selectedModule.lessons.forEach(function (lesson, lessonIndex) {
            var progress = progressStore.lesson(lesson.id);
            var b = document.createElement("button");
            b.type = "button";
            b.className = "lesson-option compact";
            b.innerHTML =
              "<span class='lesson-number'></span>" +
              "<div><strong></strong><p></p></div>" +
              "<em></em>";

            b.querySelector(".lesson-number").textContent =
              progress.status === "completed" ? "✓" : String(lessonIndex + 1);
            b.querySelector("strong").textContent = lesson.title;
            b.querySelector("p").textContent = lesson.summary;
            b.querySelector("em").textContent =
              progress.status === "completed" ? "Klar" :
              progress.status === "in_progress" ? "Fortsätt" : "Starta";
            b.addEventListener("click", function (e) {
              e.stopPropagation();
              startDashboardLesson(lesson);
            });
            lessonList.appendChild(b);
          });

          el.learning.appendChild(lessonList);
          return;
        }

        var summaries = progressStore.moduleSummary(lessons);
        var overallCompleted = summaries.reduce(function(sum, item){ return sum + item.completed; },0);
        var overallLessons = summaries.reduce(function(sum, item){ return sum + item.lessons; },0);
        var overall = document.createElement("div");
        overall.className = "learning-overall";
        overall.innerHTML = "<div><strong>Din kurs</strong><span></span></div><div class='learning-progress-track'><i></i></div>";
        var overallPct = overallLessons ? Math.round(overallCompleted / overallLessons * 100) : 0;
        overall.querySelector("span").textContent = overallCompleted + "/" + overallLessons + " • " + overallPct + "%";
        overall.querySelector("i").style.width = overallPct + "%";
        el.learning.appendChild(overall);

        var modulesTitle = document.createElement("h4");
        modulesTitle.textContent = "Moduler";
        el.learning.appendChild(modulesTitle);

        var moduleGrid = document.createElement("div");
        moduleGrid.className = "learning-module-list dashboard-grid";

        var moduleIcons = {
          basics:"💻", mouse:"🖱️", keyboard:"⌨️", windows:"⊞", files:"📁",
          programs:"📝", internet:"🌐", mail:"✉️", security:"🛡️",
          everyday:"🧰", devices:"🔌", troubleshooting:"🛠️", final:"🏁"
        };

        modules.forEach(function (module) {
          var moduleButton = document.createElement("button");
          moduleButton.type = "button";
          moduleButton.className =
            "learning-module-card dashboard-card" +
            (module.completed === module.lessons.length ? " complete" : "");

          var percent = module.lessons.length
            ? Math.round(module.completed / module.lessons.length * 100)
            : 0;

          moduleButton.innerHTML =
            "<span class='module-icon'></span>" +
            "<div class='learning-module-card-head'><strong></strong><span></span></div>" +
            "<div class='learning-module-card-progress'><i></i></div>" +
            "<small></small>";

          moduleButton.querySelector(".module-icon").textContent = moduleIcons[module.id] || "📘";
          moduleButton.querySelector("strong").textContent = module.title;
          moduleButton.querySelector(".learning-module-card-head span").textContent =
            module.completed + "/" + module.lessons.length;
          moduleButton.querySelector("i").style.width = percent + "%";
          moduleButton.querySelector("small").textContent =
            profile.mode === "child"
              ? (module.completed === module.lessons.length
                  ? "★★★★★ Klar!"
                  : "★".repeat(Math.round(percent / 20)) + "☆".repeat(5 - Math.round(percent / 20)))
              : (module.completed === module.lessons.length ? "✓ Klar" : percent + "% klart");
          moduleButton.addEventListener("click", function (e) {
            e.stopPropagation();
            state.learningSelectedModule = module.id;
            renderLearningPanel();
          });
          moduleGrid.appendChild(moduleButton);
        });

        el.learning.appendChild(moduleGrid);

        return;
      }

      var lesson = lessonEngine.get(active.id);
      var step = lessonEngine.currentStep();
      var total = lesson.steps.length;

      if (step.type === "demonstration" && step.visualTarget) {
        state.learningHighlightSelector = step.visualTarget;
      } else if (step.type === "exercise" && active.hintLevel >= 4 && step.visualTarget) {
        state.learningHighlightSelector = step.visualTarget;
      } else {
        state.learningHighlightSelector = null;
      }

      var meta = document.createElement("div");
      meta.className = "learning-meta";
      meta.textContent = moduleLabel(lesson.moduleId) + " • Steg " + (active.stepIndex + 1) + " av " + total;
      el.learning.appendChild(meta);

      var progressTrack = document.createElement("div");
      progressTrack.className = "lesson-step-progress";
      var progressBar = document.createElement("i");
      progressBar.style.width = Math.round((active.stepIndex + 1) / total * 100) + "%";
      progressTrack.appendChild(progressBar);
      el.learning.appendChild(progressTrack);

      if (lesson.detail) {
        var detailBox = document.createElement("details");
        detailBox.className = "learning-detail";
        detailBox.open = active.stepIndex === 0 || step.type === "instruction";

        var detailSummary = document.createElement("summary");
        detailSummary.innerHTML = "<span>💡</span><strong>Förstå först</strong><em></em>";
        detailSummary.querySelector("em").textContent = detailBox.open ? "Dölj" : "Visa";
        detailBox.appendChild(detailSummary);

        detailBox.addEventListener("toggle", function () {
          var label = detailSummary.querySelector("em");
          if (label) label.textContent = detailBox.open ? "Dölj" : "Visa";
        });

        var detailContent = document.createElement("div");
        detailContent.className = "learning-detail-content";

        [
          ["Vad är det?", lesson.detail.what],
          ["Hur känner jag igen det?", lesson.detail.recognize],
          ["Vad används det till?", lesson.detail.use],
          ["Exempel", lesson.detail.example]
        ].forEach(function (entry) {
          if (!entry[1]) return;
          var row = document.createElement("div");
          row.className = "learning-detail-row";

          var rowTitle = document.createElement("strong");
          rowTitle.textContent = entry[0];

          var rowText = document.createElement("p");
          rowText.textContent = entry[1];

          row.appendChild(rowTitle);
          row.appendChild(rowText);
          detailContent.appendChild(row);
        });

        if (Array.isArray(lesson.detail.steps) && lesson.detail.steps.length) {
          var stepsBlock = document.createElement("div");
          stepsBlock.className = "learning-detail-steps";

          var stepsTitle = document.createElement("strong");
          stepsTitle.textContent = "Så gör du";
          stepsBlock.appendChild(stepsTitle);

          var stepsList = document.createElement("ol");
          lesson.detail.steps.forEach(function (item) {
            var li = document.createElement("li");
            li.textContent = item;
            stepsList.appendChild(li);
          });
          stepsBlock.appendChild(stepsList);
          detailContent.appendChild(stepsBlock);
        }

        if (Array.isArray(lesson.detail.everyday) && lesson.detail.everyday.length) {
          var everydayBlock = document.createElement("div");
          everydayBlock.className = "learning-detail-list learning-detail-everyday";

          var everydayTitle = document.createElement("strong");
          everydayTitle.textContent = "Vanligt i vardagen";
          everydayBlock.appendChild(everydayTitle);

          var everydayList = document.createElement("ul");
          lesson.detail.everyday.forEach(function (item) {
            var li = document.createElement("li");
            li.textContent = item;
            everydayList.appendChild(li);
          });
          everydayBlock.appendChild(everydayList);
          detailContent.appendChild(everydayBlock);
        }

        if (Array.isArray(lesson.detail.mistakes) && lesson.detail.mistakes.length) {
          var mistakesBlock = document.createElement("div");
          mistakesBlock.className = "learning-detail-list learning-detail-mistakes";

          var mistakesTitle = document.createElement("strong");
          mistakesTitle.textContent = "Vanliga misstag";
          mistakesBlock.appendChild(mistakesTitle);

          var mistakesList = document.createElement("ul");
          lesson.detail.mistakes.forEach(function (item) {
            var li = document.createElement("li");
            li.textContent = item;
            mistakesList.appendChild(li);
          });
          mistakesBlock.appendChild(mistakesList);
          detailContent.appendChild(mistakesBlock);
        }

        detailBox.appendChild(detailContent);
        el.learning.appendChild(detailBox);
      }

      var card = document.createElement("section");
      card.className = "learning-step learning-step-" + step.type;

      var typeBadge = document.createElement("span");
      typeBadge.className = "learning-step-type";
      var typeNames = {
        instruction: "Förklaring",
        demonstration: "Visa",
        exercise: "Övning",
        quiz: "Fråga",
        simulation: "Simulering",
        reflection: "Reflektion",
        checkpoint: "Kontroll",
        completion: "Klart"
      };
      typeBadge.textContent = typeNames[step.type] || step.type;

      var title = document.createElement("h3");
      title.textContent = step.title || lesson.title;

      var textNode = document.createElement("p");
      textNode.textContent = step.text || "";

      card.appendChild(typeBadge);
      card.appendChild(title);
      card.appendChild(textNode);

      if (active.feedback) {
        var feedback = document.createElement("div");
        feedback.className = "learning-feedback " + active.feedback.kind;
        feedback.textContent = active.feedback.kind === "hint"
          ? "Hjälp " + active.feedback.level + "/5: " + active.feedback.text
          : active.feedback.text;
        card.appendChild(feedback);
      }

      el.learning.appendChild(card);

      var actions = document.createElement("div");
      actions.className = "learning-actions";

      var back = document.createElement("button");
      back.type = "button";
      back.textContent = "← Tillbaka";
      back.disabled = active.stepIndex === 0;
      back.addEventListener("click", function (e) {
        e.stopPropagation();
        lessonEngine.previous();
        setLearningHighlight(null);
        render();
      });
      actions.appendChild(back);

      if (step.type === "exercise" && active.status !== "completed") {
        var hint = document.createElement("button");
        hint.type = "button";
        hint.className = "learning-help";
        hint.textContent = active.hintLevel >= 5 ? "Full hjälp visad" : "Hjälp";
        hint.disabled = active.hintLevel >= 5;
        hint.addEventListener("click", function (e) {
          e.stopPropagation();
          lessonEngine.requestHint();
          renderLearningPanel();
          applyLearningHighlight();
        });
        actions.appendChild(hint);
      }

      var next = document.createElement("button");
      next.type = "button";
      next.className = "learning-primary";

      if (active.status === "completed") {
        next.textContent = "Till lektionerna";
        next.addEventListener("click", function (e) {
          e.stopPropagation();
          lessonEngine.stop();
          scenarioEngine.stop();
          state.learningHighlightSelector = null;
          state.learningPanelOpen = true;
          render();
        });
      } else {
        next.textContent = step.type === "exercise" ? "Kontrollera" : "Fortsätt";
        next.addEventListener("click", function (e) {
          e.stopPropagation();
          lessonEngine.next();
          render();
        });
      }

      actions.appendChild(next);
      el.learning.appendChild(actions);

      var footer = document.createElement("div");
      footer.className = "learning-footer";

      var stop = document.createElement("button");
      stop.type = "button";
      stop.textContent = "Avsluta lektion";
      stop.addEventListener("click", function (e) {
        e.stopPropagation();
        lessonEngine.stop();
        scenarioEngine.stop();
        state.learningHighlightSelector = null;
        state.learningPanelOpen = false;
        render();
      });

      footer.appendChild(stop);
      el.learning.appendChild(footer);
    }

    function renderScenarioPanel() {
      var active = scenarioEngine.active();
      var shouldShow = !lessonEngine.active() && (!!active || state.scenarioPanelOpen);

      el.scenario.hidden = !shouldShow;
      el.scenario.replaceChildren();

      if (!shouldShow) return;

      if (active) state.scenarioPanelOpen = true;

      var heading = document.createElement("div");
      heading.className = "scenario-heading";
      heading.innerHTML = "<strong>Scenario Engine</strong><span>v0.4</span>";
      el.scenario.appendChild(heading);

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

      if (!state.context && state.quickSettingsOpen) {
        var quick = document.createElement("section");
        quick.className = "quick-settings";

        var quickGrid = document.createElement("div");
        quickGrid.className = "quick-settings-grid";

        [
          ["Wi‑Fi","wifi",true],
          ["Bluetooth","settings",true],
          ["Flygplansläge","settings",false]
        ].forEach(function (item) {
          var tile = document.createElement("button");
          tile.type = "button";
          tile.className = "quick-tile" + (item[2] ? " on" : "");
          tile.innerHTML = '<span>' + win11.icon(item[1], 20) + '</span><strong></strong>';
          tile.querySelector("strong").textContent = item[0];

          if (item[0] === "Wi‑Fi") {
            tile.addEventListener("click", function () {
              state.quickSettingsOpen = false;
              state.settings = state.settings || {};
              state.settings.page = "network";
              openApp("settings");
            });
          } else if (item[0] === "Bluetooth") {
            tile.addEventListener("click", function () {
              state.quickSettingsOpen = false;
              state.settings = state.settings || {};
              state.settings.page = "bluetooth";
              openApp("settings");
            });
          }
          quickGrid.appendChild(tile);
        });

        var volume = document.createElement("div");
        volume.className = "quick-volume";
        volume.innerHTML = '<span>' + win11.icon("speaker", 18) + '</span><input type="range" min="0" max="100" value="55">';

        var quickFooter = document.createElement("div");
        quickFooter.className = "quick-settings-footer";
        quickFooter.innerHTML = '<span>🔋 83 %</span>';

        var settingsButton = document.createElement("button");
        settingsButton.type = "button";
        settingsButton.textContent = "⚙ Inställningar";
        settingsButton.addEventListener("click", function () {
          state.quickSettingsOpen = false;
          openApp("settings");
        });
        quickFooter.appendChild(settingsButton);

        quick.appendChild(quickGrid);
        quick.appendChild(volume);
        quick.appendChild(quickFooter);
        el.context.appendChild(quick);
        return;
      }

      if (!state.context) return;

      var menu = document.createElement("div");
      menu.className = "context win11-context";

      var kind = state.context.kind;
      var appId = state.context.itemId;
      var entries;

      if (kind === "taskbar-app") {
        entries = [
          ["open-app", state.windows.some(function (w) { return w.appId === appId; }) ? "Visa fönster" : "Öppna", false],
          ["sep"],
          [isPinnedToTaskbar(appId) ? "unpin-taskbar" : "pin-taskbar",
            isPinnedToTaskbar(appId) ? "Lossa från aktivitetsfältet" : "Fäst i aktivitetsfältet", false]
        ];
      } else if (kind === "start-app") {
        entries = [
          ["open-app","Öppna",false],
          ["sep"],
          [isPinnedToTaskbar(appId) ? "unpin-taskbar" : "pin-taskbar",
            isPinnedToTaskbar(appId) ? "Lossa från aktivitetsfältet" : "Fäst i aktivitetsfältet",false],
          [isPinnedToStart(appId) ? "unpin-start" : "pin-start",
            isPinnedToStart(appId) ? "Lossa från Start" : "Fäst på Start",false]
        ];
      } else if (kind === "removable-drive") {
        entries = [
          ["open-drive","Öppna",false],
          ["sep"],
          ["eject-drive","Mata ut",false],
          ["sep"],
          ["properties","Egenskaper",true]
        ];
      } else if (kind === "vfs-item") {
        var contextNode = vfs.get(appId);
        var protectedNode = !contextNode || !!contextNode.system;
        var isZipNode = !!contextNode && (contextNode.fileType === "zip" || /\.zip$/i.test(contextNode.name || ""));
        entries = [
          ["open-vfs","Öppna",false]
        ];
        if (isZipNode) {
          entries.push(["extract-vfs","Extrahera alla…",false]);
        }
        entries = entries.concat([
          ["sep"],
          ["copy-vfs","Kopiera",protectedNode],
          ["cut-vfs","Klipp ut",protectedNode],
          ["rename-vfs","Byt namn",protectedNode],
          ["delete-vfs","Ta bort",protectedNode],
          ["sep"],
          ["properties","Egenskaper",true]
        ]);
      } else if (kind === "item") {
        entries = [
          ["open","Öppna",false],
          ["sep"],
          ["rename","Byt namn",true],
          ["delete","Ta bort",true],
          ["sep"],
          ["properties","Egenskaper",true]
        ];
      } else {
        entries = [
          ["view","Visa",true],
          ["sort","Sortera efter",true],
          ["refresh","Uppdatera",false],
          ["sep"],
          ["new","Nytt",true]
        ];
      }

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
          var action = entry[0];

          if (action === "open-app" && appId) openApp(appId);
          if (action === "pin-taskbar" && appId) pinToTaskbar(appId);
          if (action === "unpin-taskbar" && appId) unpinFromTaskbar(appId);
          if (action === "pin-start" && appId) pinToStart(appId);
          if (action === "unpin-start" && appId) unpinFromStart(appId);

          if (kind === "removable-drive" && appId === "usb-drive") {
            if (action === "open-drive") {
              navigateFolder("usb-drive");
            }
            if (action === "eject-drive") {
              if (state.explorer.folderId === "usb-drive") {
                state.explorer.folderId = "home";
                state.explorer.selectedId = null;
              }
              if (vfs.unmountDrive("usb-drive")) {
                emit("device.usbEjected", { id: "usb-drive" });
                render();
              }
            }
          }

          if (kind === "vfs-item" && appId) {
            state.explorer.selectedId = appId;
            var node = vfs.get(appId);

            if (action === "open-vfs" && node) {
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
                } else if (node.fileType === "pdf" || /\.pdf$/i.test(node.name || "")) {
                  state.pdfViewer = state.pdfViewer || {};
                  state.pdfViewer.fileName = node.name;
                  state.pdfViewer.zoom = state.pdfViewer.zoom || 100;
                  openApp("pdf");
                } else if (node.fileType === "installer" || /\.exe$/i.test(node.name || "")) {
                  state.installer = { step: "welcome", accepted: false, installed: false };
                  openApp("installer");
                }
              }
            }

            if (action === "extract-vfs" && node) {
              var folderName = String(node.name || "Arkiv").replace(/\.zip$/i, "") || "Arkiv";
              var extractedFolder = vfs.createFolder(node.parentId, folderName);
              vfs.createFile(extractedFolder.id, "foto1.jpg", "image", "");
              vfs.createFile(extractedFolder.id, "foto2.jpg", "image", "");
              state.explorer.selectedId = extractedFolder.id;
              emit("archive.extracted", {
                sourceId: node.id,
                sourceName: node.name,
                folderId: extractedFolder.id,
                folderName: extractedFolder.name
              });
              render();
            }

            if (action === "copy-vfs") copySelected("copy");
            if (action === "cut-vfs") copySelected("cut");
            if (action === "rename-vfs") renameSelected();
            if (action === "delete-vfs") deleteSelected();
          }

          if (action === "open" && state.context.itemId) {
            var item = state.items.find(function (x) { return x.id === state.context.itemId; });
            if (item) {
              if (item.folderId) {
                state.explorer.folderId = item.folderId;
                state.explorer.selectedId = null;
              }
              openApp(item.appId);
            }
          }

          if (action === "refresh") emit("desktop.refreshed", {});
          closeContext();
        });

        menu.appendChild(b);
      });

      el.context.appendChild(menu);

      var mr = menu.getBoundingClientRect();
      var vr = el.sim.getBoundingClientRect();

      menu.style.left = Math.max(4, Math.min(state.context.x, vr.width - mr.width - 6)) + "px";
      menu.style.top = Math.max(4, Math.min(state.context.y, vr.height - mr.height - 6)) + "px";
    }
    function renderDialog() {
      el.dialog.replaceChildren();
      if (!state.dialog) return;

      var overlay = document.createElement("div");
      overlay.className = "dialog-overlay";

      if (state.dialog.kind === "app-not-responding") {
        var frozenDialog = document.createElement("section");
        frozenDialog.className = "sim-dialog windows-confirm-dialog not-responding-dialog";

        var frozenTitle = document.createElement("h3");
        frozenTitle.textContent = state.dialog.title || "Programmet svarar inte";

        var frozenMessage = document.createElement("p");
        frozenMessage.textContent = "Om du stänger programmet kan information som inte har sparats gå förlorad.";

        var frozenActions = document.createElement("div");
        frozenActions.className = "dialog-actions two-actions";

        var waitButton = document.createElement("button");
        waitButton.type = "button";
        waitButton.textContent = "Vänta på programmet";

        var closeProgramButton = document.createElement("button");
        closeProgramButton.type = "button";
        closeProgramButton.className = "primary";
        closeProgramButton.textContent = "Stäng programmet";

        waitButton.addEventListener("click", function () {
          if (state.troubleDemo) state.troubleDemo.waited = true;
          state.dialog = null;
          emit("troubleshooting.waited", { appId: "trouble-demo" });
          renderDialog();
        });

        closeProgramButton.addEventListener("click", function () {
          var windowId = state.dialog && state.dialog.windowId;
          if (state.troubleDemo) {
            state.troubleDemo.closedAfterFreeze = true;
          }
          state.dialog = null;
          emit("troubleshooting.closedFrozen", { appId: "trouble-demo" });
          forceCloseWindow(windowId);
        });

        frozenActions.appendChild(waitButton);
        frozenActions.appendChild(closeProgramButton);
        frozenDialog.appendChild(frozenTitle);
        frozenDialog.appendChild(frozenMessage);
        frozenDialog.appendChild(frozenActions);
        overlay.appendChild(frozenDialog);
        el.dialog.appendChild(overlay);
        return;
      }

      if (state.dialog.kind === "unsaved-notepad") {
        var unsaved = document.createElement("section");
        unsaved.className = "sim-dialog windows-confirm-dialog";

        var unsavedTitle = document.createElement("h3");
        unsavedTitle.textContent = state.dialog.title || "Anteckningar";

        var unsavedMessage = document.createElement("p");
        unsavedMessage.textContent = state.dialog.message || "Vill du spara ändringarna?";

        var unsavedActions = document.createElement("div");
        unsavedActions.className = "dialog-actions three-actions";

        var saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.className = "primary";
        saveButton.textContent = "Spara";

        var discardButton = document.createElement("button");
        discardButton.type = "button";
        discardButton.textContent = "Spara inte";

        var cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Avbryt";

        saveButton.addEventListener("click", function () {
          var windowId = state.dialog && state.dialog.windowId;
          if (state.notepadFileId) {
            var node = vfs.get(state.notepadFileId);
            if (node) {
              node.content = state.notepadDraft;
              state.notepadDirty = false;
              emit("notepad.saved", { id: node.id, name: node.name });
            }
            state.dialog = null;
            emit("dialog.unsavedChoice", { choice: "save" });
            forceCloseWindow(windowId);
          } else {
            state.dialog = null;
            emit("dialog.unsavedChoice", { choice: "save-as-required" });
            saveNotepad(true);
          }
        });

        discardButton.addEventListener("click", function () {
          var windowId = state.dialog && state.dialog.windowId;
          state.notepadDirty = false;
          state.dialog = null;
          emit("dialog.unsavedChoice", { choice: "discard" });
          forceCloseWindow(windowId);
        });

        cancelButton.addEventListener("click", function () {
          state.dialog = null;
          emit("dialog.unsavedChoice", { choice: "cancel" });
          renderDialog();
        });

        unsavedActions.appendChild(saveButton);
        unsavedActions.appendChild(discardButton);
        unsavedActions.appendChild(cancelButton);
        unsaved.appendChild(unsavedTitle);
        unsaved.appendChild(unsavedMessage);
        unsaved.appendChild(unsavedActions);
        overlay.appendChild(unsaved);
        el.dialog.appendChild(overlay);
        return;
      }

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
      var currentProfile = progressStore.profile();
      el.sim.classList.toggle("child-mode", currentProfile.mode === "child");
      el.sim.classList.toggle("fast-mode", currentProfile.mode === "fast");

      renderDesktop();
      renderWindows();
      renderTaskbar();
      renderStart();
      renderLearningPanel();
      renderScenarioPanel();
      renderContext();
      renderDialog();
      applyLearningHighlight();
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
        state.quickSettingsOpen &&
        !e.target.closest(".quick-settings") &&
        !e.target.closest(".system-tray")
      ) {
        state.quickSettingsOpen = false;
        renderContext();
      }

      if (
        state.learningPanelOpen &&
        !lessonEngine.active() &&
        !e.target.closest(".learning-panel") &&
        !e.target.closest('[aria-label="Datorskolan"]')
      ) {
        state.learningPanelOpen = false;
        renderLearningPanel();
      }

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
      if (e.altKey && e.key === "Tab") {
        e.preventDefault();
        var visibleWindows = state.windows.filter(function (w) { return w.mode !== "minimized"; });
        if (visibleWindows.length > 1) {
          var activeIndex = visibleWindows.findIndex(function (w) { return w.id === state.activeWindowId; });
          var next = visibleWindows[(activeIndex + 1 + visibleWindows.length) % visibleWindows.length];
          focusWindow(next.id);
          emit("window.switched", { windowId: next.id, appId: next.appId });
        }
        return;
      }

      if (e.key !== "Escape") return;
      if (state.dialog) {
        state.dialog = null;
        renderDialog();
        return;
      }
      if (state.context) closeContext();
      if (state.quickSettingsOpen) {
        state.quickSettingsOpen = false;
        renderContext();
      }
      if (state.startOpen) setStart(false);
      if (state.learningPanelOpen && !lessonEngine.active()) {
        state.learningPanelOpen = false;
        renderLearningPanel();
      }
      if (state.scenarioPanelOpen && !scenarioEngine.active()) {
        state.scenarioPanelOpen = false;
        renderScenarioPanel();
      }
    });

    window.__datorskolanSimulator = {
      state: state,
      vfs: vfs,
      openApp: openApp,
      setMouseMode: setMouseMode,
      setKeyboardMode: function (mode) {
        applyStartState({ keyboardMode: mode });
        render();
      },
      on: on,
      scenarios: scenarioEngine,
      lessons: lessonEngine,
      progress: progressStore,
      startLesson: function (id) {
        var result = lessonEngine.start(id, learningRuntimeApi);
        state.learningPanelOpen = true;
        state.scenarioPanelOpen = false;
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
      if (lessonEngine.active() && el && el.learning) renderLearningPanel();
    });

    lessonEngine.onChange(function () {
      if (el && el.learning) renderLearningPanel();
    });

    render();
  } catch (error) {
    fail(error);
  }
})();