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
    var state = {
      items: [
        { id: "documents", label: "Documents", icon: "📁", x: 18, y: 18, appId: "explorer" },
        { id: "pictures", label: "Pictures", icon: "🖼️", x: 18, y: 112, appId: "photos" },
        { id: "recycle-bin", label: "Recycle Bin", icon: "🗑️", x: 18, y: 206, appId: "recycle-bin" }
      ],
      selected: null,
      startOpen: false,
      windows: [],
      activeWindowId: null,
      context: null,
      nextWindow: 1,
      nextZ: 10
    };

    var listeners = {};
    function emit(type, payload) {
      console.debug("[FakeWindows]", type, payload || {});
      (listeners[type] || []).forEach(function (fn) { fn(payload || {}); });
    }
    function on(type, fn) {
      (listeners[type] || (listeners[type] = [])).push(fn);
    }

    var apps = {
      explorer: {
        title: "File Explorer", icon: "📁", w: 720, h: 470,
        render: function () {
          var el = document.createElement("div");
          el.className = "explorer";
          el.innerHTML =
            '<aside class="sidebar"><div>🏠 Home</div><div>📄 Documents</div><div>🖼️ Pictures</div><div>⬇️ Downloads</div></aside>' +
            '<section class="main"><h3>Home</h3><div class="fake-files">' +
            '<div class="fake-file"><div class="fi">📁</div>Documents</div>' +
            '<div class="fake-file"><div class="fi">🖼️</div>Pictures</div>' +
            '<div class="fake-file"><div class="fi">⬇️</div>Downloads</div>' +
            '</div></section>';
          return el;
        }
      },
      calculator: {
        title: "Calculator", icon: "🧮", w: 350, h: 480,
        render: function () {
          var el = document.createElement("div");
          el.className = "calc";
          var keys = ["%","CE","C","⌫","7","8","9","÷","4","5","6","×","1","2","3","−","±","0",".","+"];
          el.innerHTML = '<div class="display">0</div><div class="grid">' +
            keys.map(function (v) { return '<button tabindex="-1">' + v + '</button>'; }).join("") +
            '</div>';
          return el;
        }
      },
      notepad: {
        title: "Notepad", icon: "📝", w: 620, h: 430,
        render: function () {
          var el = document.createElement("textarea");
          el.className = "notepad";
          el.setAttribute("aria-label", "Anteckningsyta");
          el.placeholder = "Skriv här…";
          el.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
          return el;
        }
      },
      photos: {
        title: "Photos", icon: "🖼️", w: 650, h: 430,
        render: function () {
          var el = document.createElement("div");
          el.style.cssText = "padding:24px;text-align:center";
          el.innerHTML = '<div style="font-size:70px">🖼️</div><h3>Photos</h3><p>Photos – placeholder</p>';
          return el;
        }
      },
      "recycle-bin": {
        title: "Recycle Bin", icon: "🗑️", w: 640, h: 420,
        render: function () {
          var el = document.createElement("div");
          el.style.cssText = "padding:24px;text-align:center";
          el.innerHTML = '<div style="font-size:70px">🗑️</div><h3>Recycle Bin</h3><p>The Recycle Bin is empty.</p>';
          return el;
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
      '<nav class="taskbar" aria-label="Aktivitetsfält"></nav>';

    root.replaceChildren(shell);

    var el = {
      sim: shell,
      workspace: shell.querySelector(".workspace"),
      desktop: shell.querySelector(".desktop"),
      windows: shell.querySelector(".windows"),
      start: shell.querySelector(".start"),
      context: shell.querySelector(".context-layer"),
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
        state.windows.forEach(function (w) { w.active = top && w.id === top.id; });
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
      state.context = { kind: kind, itemId: itemId || null, x: clientX - r.left, y: clientY - r.top };
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
        b.innerHTML = '<span class="icon">' + item.icon + '</span><span class="label">' + item.label + '</span>';

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
          drag = { pointerId: e.pointerId, sx: e.clientX, sy: e.clientY, ix: item.x, iy: item.y, moved: false };
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

      state.windows.filter(function (w) { return w.mode !== "minimized"; }).forEach(function (w) {
        var app = apps[w.appId];
        var win = document.createElement("section");
        win.className = "app-window" + (w.active ? " active" : "") + (w.mode === "maximized" ? " maximized" : "");
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
          '<button class="ctrl max" aria-label="' + (w.mode === "maximized" ? "Återställ" : "Maximera") + '">' + (w.mode === "maximized" ? "❐" : "□") + '</button>' +
          '<button class="ctrl close" aria-label="Stäng">✕</button>' +
          '</div>';

        var content = document.createElement("div");
        content.className = "content";
        content.appendChild(app.render());

        win.appendChild(titlebar);
        win.appendChild(content);
        win.addEventListener("pointerdown", function () { focusWindow(w.id); });

        var drag = null;
        titlebar.addEventListener("pointerdown", function (e) {
          if (e.button !== 0 || e.target.closest(".controls") || w.mode !== "normal") return;
          focusWindow(w.id, false);
          el.windows.querySelectorAll(".app-window.active").forEach(function (node) { node.classList.remove("active"); });
          win.classList.add("active");
          win.style.zIndex = String(w.z);
          drag = { pointerId: e.pointerId, ox: e.clientX - w.x, oy: e.clientY - w.y };
          titlebar.setPointerCapture(e.pointerId);
        });

        titlebar.addEventListener("pointermove", function (e) {
          if (!drag || e.pointerId !== drag.pointerId) return;
          var r = el.workspace.getBoundingClientRect();
          w.x = Math.min(Math.max(-w.width + 120, e.clientX - r.left - drag.ox), Math.max(0, r.width - 120));
          w.y = Math.min(Math.max(0, e.clientY - r.top - drag.oy), Math.max(0, r.height - 40));
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

      var ids = ["explorer", "calculator"];
      state.windows.forEach(function (w) {
        if (ids.indexOf(w.appId) === -1) ids.push(w.appId);
      });

      ids.forEach(function (id) {
        var app = apps[id];
        var w = state.windows.find(function (x) { return x.appId === id; });
        var b = document.createElement("button");
        b.type = "button";
        b.className = "tb" + (w ? " running" : "") + (w && w.active ? " active" : "");
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
        "<div>" + now.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }) + "</div>" +
        "<div>" + now.toLocaleDateString("sv-SE") + "</div>";

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
        b.innerHTML = '<span style="font-size:30px">' + app.icon + '</span><span>' + app.title + "</span>";
        b.addEventListener("click", function () { openApp(id); });
        grid.appendChild(b);
      });

      el.start.appendChild(h);
      el.start.appendChild(grid);
    }

    function renderContext() {
      el.context.replaceChildren();
      if (!state.context) return;

      var menu = document.createElement("div");
      menu.className = "context";

      var entries = state.context.kind === "item"
        ? [["open","Open",false],["sep"],["rename","Rename",true],["delete","Delete",true],["sep"],["properties","Properties",true]]
        : [["view","View",true],["sort","Sort by",true],["refresh","Refresh",false],["sep"],["new","New",true]];

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
            var item = state.items.find(function (x) { return x.id === state.context.itemId; });
            if (item) openApp(item.appId);
          }
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

    function render() {
      renderDesktop();
      renderWindows();
      renderTaskbar();
      renderStart();
      renderContext();
    }

    el.sim.addEventListener("contextmenu", function (e) {
      if (e.target.closest(".desktop-item,.app-window,.taskbar")) return;
      e.preventDefault();
      openContext("desktop", e.clientX, e.clientY);
    });

    el.sim.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      if (!e.target.closest(".context") && state.context) closeContext();
      if (!e.target.closest(".start") && !e.target.closest('[aria-label="Start"]') && state.startOpen) setStart(false);
      if (e.target === el.desktop) {
        state.selected = null;
        render();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (state.context) closeContext();
      if (state.startOpen) setStart(false);
    });

    window.__datorskolanSimulator = {
      state: state,
      openApp: openApp,
      on: on
    };

    render();
  } catch (error) {
    fail(error);
  }
})();