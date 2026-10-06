(function () {
  "use strict";

  var STORAGE_KEY = "datorskolan.fakewin.shell.v1";
  var FLUENT_ROOT = "./assets/icons/fluent/";

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
    crop: "crop.svg"
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;");
  }

  var CHROME_LOGO_URL = "https://www.google.com/chrome/static/images/chrome-logo-m100.svg";

  function chromeIcon(size, className) {
    return '<img class="win11-icon brand-icon ' + esc(className || "") +
      '" src="' + CHROME_LOGO_URL +
      '" width="' + size + '" height="' + size +
      '" alt="" aria-hidden="true" draggable="false">';
  }

  function icon(name, size, className) {
    size = size || 24;

    // Chrome is a Google product brand, not a Microsoft Fluent system icon.
    if (name === "chrome") return chromeIcon(size, className);

    var fileName = fluentIcons[name] || "document.svg";

    return '<img class="win11-icon fluent-icon ' + esc(className || "") +
      '" src="' + FLUENT_ROOT + esc(fileName) +
      '" width="' + size + '" height="' + size +
      '" alt="" aria-hidden="true" draggable="false">';
  }

  function defaultShellState() {
    return {
      pinnedTaskbar: ["explorer","browser"],
      pinnedStart: ["explorer","browser","calculator","notepad","mail","settings"],
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
      // Simulatorn ska fortfarande fungera om storage är blockerad.
    }
    return normalized;
  }

  function resetShellState(storage) {
    storage = storage || window.localStorage;
    var state = defaultShellState();
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {}
    return state;
  }

  window.DatorskolanWindows11 = {
    STORAGE_KEY: STORAGE_KEY,
    FLUENT_ROOT: FLUENT_ROOT,
    CHROME_LOGO_URL: CHROME_LOGO_URL,
    fluentIcons: fluentIcons,
    icon: icon,
    defaultShellState: defaultShellState,
    loadShellState: loadShellState,
    saveShellState: saveShellState,
    resetShellState: resetShellState
  };
})();