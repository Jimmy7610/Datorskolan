/*
  Windows 11 UI kit for FakeWin: icons, glyphs, DOM helper and persisted shell state (pinned apps).

  Icons: Microsoft Fluent UI System Icons (MIT).
    assets/icons/fluent-color/    Microsoft's color icons, unmodified (apps, Settings, Mail, Home, OneDrive …)
    assets/icons/fluent-derived/  Microsoft's filled shapes recolored to Windows 11 colours where Microsoft
                                  publishes no color version (folder, Recycle Bin, Notepad, Calculator …)
    assets/icons/fluent/          monochrome icons for the system tray and commands (monochrome in Windows 11 too)
  See docs/38-ASSETS-AND-LICENSES.md and each folder's SOURCE.md.
  Web browser: the neutral Fluent Globe icon. No third-party logo is used or loaded (docs/38).
  Glyphs: the few simple geometric shapes Windows draws with its Segoe Fluent Icons system font
  (caption buttons, chevrons, search). That font cannot be redistributed, so the shapes are drawn
  here as minimal SVG lines of the same size and stroke weight.
*/
(function () {
  "use strict";

  var STORAGE_KEY = "datorskolan.fakewin.shell.v1";
  var FLUENT_ROOT = "./assets/icons/fluent/";
  var ICON_ROOT = "./assets/icons/";

  // Colour app and file icons: "<folder>/<name>" → <name>-small.svg (≤ 24px) or <name>-large.svg.
  var colorIcons = {
    start: "fluent-derived/start",
    person: "fluent-color/person",
    clock: "fluent-color/clock",
    gaming: "fluent-derived/gaming",
    explorer: "fluent-derived/folder",
    folder: "fluent-derived/folder",
    "folder-documents": "fluent-derived/folder",
    pictures: "fluent-derived/pictures",
    recycle: "fluent-derived/recycle-bin",
    calculator: "fluent-derived/calculator",
    notepad: "fluent-derived/notepad",
    photos: "fluent-color/image",
    mail: "fluent-color/mail",
    settings: "fluent-color/settings",
    "text-file": "fluent-color/document-text",
    document: "fluent-color/document",
    pdf: "fluent-derived/document-pdf",
    zip: "fluent-derived/folder-zip",
    "image-file": "fluent-color/image",
    image: "fluent-color/image",
    home: "fluent-color/home",
    download: "fluent-derived/downloads",
    snipping: "fluent-derived/snipping",
    onedrive: "fluent-color/cloud",
    "usb-drive": "fluent-derived/usb-stick",
    "this-pc": "fluent-color/laptop",
    laptop: "fluent-color/laptop",
    desktop: "fluent-derived/desktop",
    globe: "fluent-color/globe",
    // The practice web browser is a neutral browser, not a branded one.
    browser: "fluent-color/globe",
    "apps-list": "fluent-color/apps-list",
    installer: "fluent-color/apps-list",
    shield: "fluent-color/shield",
    headphones: "fluent-color/headphones",
    personalization: "fluent-color/paint-brush",
    "bluetooth-color": "fluent-derived/bluetooth",
    accessibility: "fluent-derived/accessibility",
    update: "fluent-color/arrow-sync",
    calendar: "fluent-color/calendar",
    warning: "fluent-color/warning",
    error: "fluent-color/error-circle",
    success: "fluent-color/checkmark-circle"
  };

  var fluentIcons = {
    start: "apps.svg",
    explorer: "folder.svg",
    folder: "folder.svg",
    "folder-documents": "folder.svg",
    pictures: "image-multiple.svg",
    recycle: "delete.svg",
    calculator: "calculator.svg",
    notepad: "notepad.svg",
    photos: "image-multiple.svg",
    mail: "mail.svg",
    settings: "settings.svg",
    "text-file": "document-text.svg",
    pdf: "document-pdf.svg",
    zip: "folder-zip.svg",
    "image-file": "image.svg",
    school: "graduation.svg",
    flask: "beaker.svg",
    home: "home.svg",
    pin: "pin.svg",
    wifi: "wifi.svg",
    speaker: "speaker.svg",
    battery: "battery.svg",
    download: "download.svg",
    snipping: "cut.svg",
    onedrive: "cloud.svg",
    "usb-drive": "usb-plug.svg",
    "this-pc": "laptop.svg",
    desktop: "desktop.svg",
    bluetooth: "bluetooth.svg",
    globe: "globe.svg",
    "apps-list": "apps-list.svg",
    shield: "shield.svg",
    sync: "sync.svg",
    headphones: "headphones.svg",
    save: "save.svg",
    timer: "timer.svg",
    add: "add.svg",
    crop: "crop.svg",
    cut: "cut.svg",
    delete: "delete.svg",
    document: "document.svg",
    installer: "apps-list.svg"
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function icon(name, size, className) {
    size = size || 24;
    if (colorIcons[name]) {
      return '<img class="win11-icon fluent-icon ' + esc(className || "") +
        '" src="' + ICON_ROOT + colorIcons[name] + (size <= 24 ? "-small" : "-large") + '.svg"' +
        ' width="' + size + '" height="' + size +
        '" alt="" aria-hidden="true" draggable="false">';
    }
    var fileName = fluentIcons[name] || "document.svg";
    return '<img class="win11-icon fluent-icon is-mono ' + esc(className || "") +
      '" src="' + FLUENT_ROOT + esc(fileName) +
      '" width="' + size + '" height="' + size +
      '" alt="" aria-hidden="true" draggable="false">';
  }

  /* ---------- Geometric glyphs (Segoe Fluent Icons stand-ins, 16px grid, 1px stroke) ---------- */

  var glyphPaths = {
    minimize: '<path d="M3 8.5h10"/>',
    maximize: '<rect x="3.5" y="3.5" width="9" height="9" rx="1"/>',
    restore: '<rect x="3.5" y="5.5" width="7" height="7" rx="1"/><path d="M5.5 5.5v-1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1"/>',
    close: '<path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/>',
    "chevron-right": '<path d="M6 3.5l4.5 4.5L6 12.5"/>',
    "chevron-left": '<path d="M10 3.5L5.5 8l4.5 4.5"/>',
    "chevron-down": '<path d="M3.5 6l4.5 4.5L12.5 6"/>',
    "chevron-up": '<path d="M3.5 10l4.5-4.5 4.5 4.5"/>',
    "arrow-left": '<path d="M13 8H3.5M7.5 4L3.5 8l4 4"/>',
    "arrow-right": '<path d="M3 8h9.5M8.5 4l4 4-4 4"/>',
    "arrow-up": '<path d="M8 13V3.5M4 7.5l4-4 4 4"/>',
    refresh: '<path d="M12.5 8a4.5 4.5 0 1 1-1.3-3.2"/><path d="M12 2.5v2.8H9.2"/>',
    search: '<circle cx="6.75" cy="6.75" r="4.25"/><path d="M10 10l3.5 3.5"/>',
    more: '<circle cx="3.5" cy="8" r=".6"/><circle cx="8" cy="8" r=".6"/><circle cx="12.5" cy="8" r=".6"/>',
    "more-vertical": '<circle cx="8" cy="3.5" r=".6"/><circle cx="8" cy="8" r=".6"/><circle cx="8" cy="12.5" r=".6"/>',
    plus: '<path d="M8 3v10M3 8h10"/>',
    minus: '<path d="M3 8h10"/>',
    check: '<path d="M3.5 8.5l3 3 6-7"/>',
    sleep: '<path d="M12.5 10.2A5 5 0 0 1 5.8 3.5a5 5 0 1 0 6.7 6.7z"/>',
    open: '<path d="M9 3.5h3.5V7M12.5 3.5L7 9M11 9.5v3H3.5V5h3"/>',
    dot: '<circle cx="8" cy="8" r="2.5" fill="currentColor" stroke="none"/>',
    star: '<path d="M8 2.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L8 11.2 4.6 13l.7-3.8L2.5 6.5l3.8-.5z"/>',
    "star-filled": '<path d="M8 2.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L8 11.2 4.6 13l.7-3.8L2.5 6.5l3.8-.5z" fill="currentColor"/>',
    power: '<path d="M8 2.5V8"/><path d="M5 4.3a5 5 0 1 0 6 0"/>',
    pencil: '<path d="M10.5 3l2.5 2.5-7 7H3.5V10z"/>',
    lock: '<rect x="3.5" y="7" width="9" height="6.5" rx="1"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/>',
    warning: '<path d="M8 2.5l6 10.5H2z"/><path d="M8 6.5v3M8 11.2v.3"/>',
    info: '<circle cx="8" cy="8" r="5.5"/><path d="M8 7.2v3.8M8 5v.3"/>',
    error: '<circle cx="8" cy="8" r="5.5"/><path d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4"/>',
    download: '<path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10"/>',
    paperclip: '<path d="M10.5 5l-4 4a1.2 1.2 0 0 0 1.7 1.7l4.2-4.2a2.4 2.4 0 0 0-3.4-3.4L4.8 7.3a3.6 3.6 0 0 0 5.1 5.1L13 9.2"/>',
    sun: '<circle cx="8" cy="8" r="2.8"/><path d="M8 1.8v1.4M8 12.8v1.4M1.8 8h1.4M12.8 8h1.4M3.6 3.6l1 1M11.4 11.4l1 1M3.6 12.4l1-1M11.4 4.6l1-1"/>',
    airplane: '<path d="M8 2v4.5L13.5 9v1.5L8 9v3l1.5 1.5v1L8 14l-1.5.5v-1L8 12V9L2.5 10.5V9L8 6.5"/>',
    "battery-saver": '<rect x="2.5" y="5" width="10" height="6" rx="1"/><path d="M14 7v2M7.5 6.3L6 8.2h2.5L7 9.8"/>',
    accessibility: '<circle cx="8" cy="3.2" r="1.1"/><path d="M3 6l5 1 5-1M8 7v3l-2 4M8 10l2 4"/>',
    hamburger: '<path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"/>',
    bookmark: '<path d="M4.5 2.5h7v11L8 10.5l-3.5 3z"/>',
    share: '<path d="M10 3.5l3 3-3 3"/><path d="M13 6.5H8a4 4 0 0 0-4 4v2"/>',
    "copy-glyph": '<rect x="5.5" y="5.5" width="7.5" height="8" rx="1"/><path d="M3.5 10.5v-7a1 1 0 0 1 1-1h6"/>',
    paste: '<rect x="3.5" y="3.5" width="9" height="10" rx="1"/><path d="M6 3.5V2.5h4v1"/>',
    rename: '<path d="M3 11.5h3M9.5 3.5l2.5 2.5-5.5 5.5H4v-2.5z"/>',
    sort: '<path d="M5 3v10M2.5 10.5L5 13l2.5-2.5M11 13V3M8.5 5.5L11 3l2.5 2.5"/>',
    view: '<rect x="2.5" y="3.5" width="11" height="9" rx="1"/><path d="M2.5 6.5h11"/>',
    undo: '<path d="M5.5 4L2.5 7l3 3"/><path d="M2.5 7h7a3.5 3.5 0 0 1 0 7H8"/>',
    redo: '<path d="M10.5 4l3 3-3 3"/><path d="M13.5 7h-7a3.5 3.5 0 0 0 0 7H8"/>',
    print: '<rect x="4.5" y="2.5" width="7" height="3.5"/><rect x="2.5" y="6" width="11" height="5" rx="1"/><rect x="4.5" y="9.5" width="7" height="4"/>',
    zoom: '<circle cx="6.75" cy="6.75" r="4.25"/><path d="M10 10l3.5 3.5M5 6.75h3.5M6.75 5v3.5"/>',
    "zoom-out": '<circle cx="6.75" cy="6.75" r="4.25"/><path d="M10 10l3.5 3.5M5 6.75h3.5"/>',
    reply: '<path d="M6.5 4l-4 4 4 4"/><path d="M2.5 8h6a5 5 0 0 1 5 5"/>',
    forward: '<path d="M9.5 4l4 4-4 4"/><path d="M13.5 8h-6a5 5 0 0 0-5 5"/>',
    send: '<path d="M2.5 8L13.5 2.5 10.5 13.5 8 8.8z"/><path d="M8 8.8l5.5-6.3"/>',
    flag: '<path d="M3.5 14V2.5h8l-1.5 3 1.5 3h-8"/>',
    mail: '<rect x="2" y="3.5" width="12" height="9" rx="1"/><path d="M2.5 4.5L8 9l5.5-4.5"/>',
    calendar: '<rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3"/>',
    bell: '<path d="M4 11.5V7a4 4 0 0 1 8 0v4.5l1 1H3z"/><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0"/>',
    "volume-mute": '<path d="M2.5 6h2.5l3-2.5v9L5 10H2.5z"/><path d="M10.5 6l3.5 4M14 6l-3.5 4"/>',
    eye: '<path d="M1.8 8S4 3.8 8 3.8 14.2 8 14.2 8 12 12.2 8 12.2 1.8 8 1.8 8z"/><circle cx="8" cy="8" r="2"/>',
    tab: '<rect x="2.5" y="4.5" width="11" height="8" rx="1"/><path d="M2.5 7h4.5V4.5"/>',
    history: '<path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9"/><path d="M2.5 2.5v2.5H5M8 5v3l2 1.5"/>',
    "new-window": '<rect x="2.5" y="3.5" width="11" height="9" rx="1"/><path d="M2.5 6h11"/>',
    exit: '<path d="M9.5 3.5h-5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5M7 8h7M11.5 5.5L14 8l-2.5 2.5"/>'
  };

  function glyph(name, size, className) {
    size = size || 16;
    var body = glyphPaths[name] || "";
    return '<svg class="fw-glyph ' + esc(className || "") + '" width="' + size + '" height="' + size +
      '" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      body + '</svg>';
  }

  // Caption buttons use a 10×10 pixel grid with 1px lines, like Windows 11's title bar glyphs.
  var captionPaths = {
    minimize: '<path d="M0 5.5h10" shape-rendering="crispEdges"/>',
    maximize: '<rect x="0.5" y="0.5" width="9" height="9" rx="1.5"/>',
    restore: '<rect x="0.5" y="2.5" width="7" height="7" rx="1.2"/><path d="M2.5 2.5V1.8A1.3 1.3 0 0 1 3.8.5h4.4A1.3 1.3 0 0 1 9.5 1.8v4.4a1.3 1.3 0 0 1-1.3 1.3H7.5"/>',
    close: '<path d="M.5.5l9 9M9.5.5l-9 9"/>'
  };

  function captionGlyph(name) {
    return '<svg class="fw-caption-glyph" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" focusable="false">' +
      (captionPaths[name] || "") + '</svg>';
  }

  /*
    Tiny DOM builder.
      h("button", { class: "x", type: "button", text: "Save", on: { click: fn }, aria: { label: "…" } }, [children])
    Text is always assigned with textContent; only `html` (for trusted icon markup) uses innerHTML.
  */
  function h(tag, props, children) {
    var node = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (key) {
      var value = props[key];
      if (value === undefined || value === null || value === false) return;
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key === "html") node.innerHTML = value;
      else if (key === "on") {
        Object.keys(value).forEach(function (eventName) { node.addEventListener(eventName, value[eventName]); });
      } else if (key === "aria") {
        Object.keys(value).forEach(function (name) {
          if (value[name] !== undefined && value[name] !== null) node.setAttribute("aria-" + name, String(value[name]));
        });
      } else if (key === "data") {
        Object.keys(value).forEach(function (name) { node.dataset[name] = value[name]; });
      } else if (key === "style") {
        Object.keys(value).forEach(function (name) { node.style[name] = value[name]; });
      } else if (key in node && typeof value !== "string") {
        node[key] = value;
      } else if (value === true) {
        node.setAttribute(key, "");
      } else {
        node.setAttribute(key, String(value));
      }
    });
    (children || []).forEach(function (child) {
      if (child === null || child === undefined || child === false) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  /* ---------- Persisted shell state ---------- */

  function defaultShellState() {
    return {
      pinnedTaskbar: ["explorer", "browser"],
      pinnedStart: ["explorer", "browser", "calculator", "notepad", "mail", "settings", "photos", "snipping"],
      version: 1
    };
  }

  function normalizeShellState(value) {
    var fallback = defaultShellState();
    value = value && typeof value === "object" ? value : {};
    return {
      pinnedTaskbar: Array.isArray(value.pinnedTaskbar) ? value.pinnedTaskbar.slice() : fallback.pinnedTaskbar.slice(),
      pinnedStart: Array.isArray(value.pinnedStart) ? value.pinnedStart.slice() : fallback.pinnedStart.slice(),
      version: 1
    };
  }

  function loadShellState(storage) {
    storage = storage || window.localStorage;
    try {
      var raw = storage.getItem(STORAGE_KEY);
      if (!raw) return defaultShellState();
      return normalizeShellState(JSON.parse(raw));
    } catch (error) {
      return defaultShellState();
    }
  }

  function saveShellState(shell, storage) {
    storage = storage || window.localStorage;
    var normalized = normalizeShellState(shell);
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (error) {
      // The simulator keeps working when storage is blocked; pins just last for this visit.
    }
    return normalized;
  }

  function resetShellState(storage) {
    storage = storage || window.localStorage;
    var state = defaultShellState();
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) { /* see saveShellState */ }
    return state;
  }

  window.DatorskolanWindows11 = {
    STORAGE_KEY: STORAGE_KEY,
    FLUENT_ROOT: FLUENT_ROOT,
    fluentIcons: fluentIcons,
    colorIcons: colorIcons,
    ICON_ROOT: ICON_ROOT,
    icon: icon,
    glyph: glyph,
    captionGlyph: captionGlyph,
    h: h,
    esc: esc,
    defaultShellState: defaultShellState,
    loadShellState: loadShellState,
    saveShellState: saveShellState,
    resetShellState: resetShellState
  };
})();
