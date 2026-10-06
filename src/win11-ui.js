(function () {
  "use strict";

  var STORAGE_KEY = "datorskolan.fakewin.shell.v1";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;");
  }

  function svg(size, body, className, viewBox) {
    return '<svg class="win11-icon ' + esc(className || "") + '" width="' + size + '" height="' + size +
      '" viewBox="' + (viewBox || "0 0 48 48") + '" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
      body + '</svg>';
  }

  function icon(name, size, className) {
    size = size || 24;

    if (name === "start") {
      return svg(size,
        '<rect x="5" y="5" width="17" height="17" rx="1.3" fill="#0078d4"/>' +
        '<rect x="26" y="5" width="17" height="17" rx="1.3" fill="#0078d4"/>' +
        '<rect x="5" y="26" width="17" height="17" rx="1.3" fill="#0078d4"/>' +
        '<rect x="26" y="26" width="17" height="17" rx="1.3" fill="#0078d4"/>',
        className);
    }

    if (name === "explorer" || name === "folder" || name === "folder-documents") {
      return svg(size,
        '<path d="M5 15.2c0-2.1 1.7-3.8 3.8-3.8h10.1l3.8 4.2H39c2.2 0 4 1.8 4 4v16.7c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4V15.2z" fill="#f7c948"/>' +
        '<path d="M5 20h38v16.3c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4V20z" fill="#ffd75e"/>' +
        '<path d="M8 18h32" stroke="#fff2a7" stroke-width="2.1" stroke-linecap="round"/>',
        className);
    }

    if (name === "pictures") {
      return svg(size,
        '<rect x="6" y="7" width="36" height="34" rx="7" fill="#fff" stroke="#cfd6df" stroke-width="2"/>' +
        '<circle cx="31.5" cy="17.5" r="4.2" fill="#ffd54f"/>' +
        '<path d="M10 36l9.6-10.2 6.1 6 4.8-4.7L39 36H10z" fill="#4caf50"/>' +
        '<path d="M10 36l9.6-10.2 6.1 6L30 36H10z" fill="#40a9ff"/>',
        className);
    }

    if (name === "recycle") {
      return svg(size,
        '<path d="M14 13h20l-1.6 27H15.6L14 13z" fill="#f7fbff" stroke="#90a4ae" stroke-width="1.8"/>' +
        '<path d="M12 12h24M19 9h10" stroke="#607d8b" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path d="M20 20l-3 5 4 1M28 20l3 5-4 1M20 32h8" fill="none" stroke="#27a86b" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>',
        className);
    }

    if (name === "calculator") {
      return svg(size,
        '<rect x="8" y="5" width="32" height="38" rx="6" fill="#5f6b7a"/>' +
        '<rect x="12" y="9" width="24" height="8" rx="2" fill="#d7eef8"/>' +
        '<g fill="#f7f7f7"><rect x="12" y="21" width="6" height="6" rx="1.2"/><rect x="21" y="21" width="6" height="6" rx="1.2"/><rect x="30" y="21" width="6" height="6" rx="1.2"/><rect x="12" y="30" width="6" height="6" rx="1.2"/><rect x="21" y="30" width="6" height="6" rx="1.2"/></g>' +
        '<rect x="30" y="30" width="6" height="6" rx="1.2" fill="#5ab0f5"/>',
        className);
    }

    if (name === "notepad") {
      return svg(size,
        '<rect x="9" y="7" width="30" height="35" rx="4" fill="#fff" stroke="#c9d3dd" stroke-width="1.6"/>' +
        '<rect x="9" y="7" width="30" height="8" rx="4" fill="#5aa9e6"/>' +
        '<path d="M15 21h18M15 26h18M15 31h14M15 36h16" stroke="#76889a" stroke-width="2" stroke-linecap="round"/>',
        className);
    }

    if (name === "photos") {
      return svg(size,
        '<rect x="6" y="6" width="36" height="36" rx="9" fill="#eaf4ff"/>' +
        '<circle cx="31" cy="17" r="4" fill="#ffcf4a"/>' +
        '<path d="M10 35l9.2-10 5.9 5.6 4.5-4.4L39 35H10z" fill="#4db17b"/>' +
        '<path d="M10 35l9.2-10 7.7 7.4L30 35H10z" fill="#4c9cf0"/>',
        className);
    }

    if (name === "mail") {
      return svg(size,
        '<rect x="5" y="10" width="38" height="28" rx="5" fill="#0a64d8"/>' +
        '<path d="M8 14l16 12 16-12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M8 35l10.5-9M40 35L29.5 26" stroke="#9dccff" stroke-width="2" stroke-linecap="round"/>',
        className);
    }

    if (name === "settings") {
      return svg(size,
        '<circle cx="24" cy="24" r="8" fill="#6a7684"/>' +
        '<path d="M24 5l3 5 5.6.9 1 5.6 5.4 3.1-2.3 5.3 2.3 5.5-5.4 3.1-1 5.6-5.6.9-3 5-3-5-5.6-.9-1-5.6-5.4-3.1 2.3-5.5-2.3-5.3 5.4-3.1 1-5.6 5.6-.9 3-5z" fill="none" stroke="#6a7684" stroke-width="3" stroke-linejoin="round"/>' +
        '<circle cx="24" cy="24" r="3.5" fill="#eef2f7"/>',
        className);
    }

    if (name === "text-file") {
      return svg(size,
        '<path d="M10 5h19l9 9v29H10V5z" fill="#fff" stroke="#cbd5e1" stroke-width="1.8"/>' +
        '<path d="M29 5v10h9" fill="#e5f1ff"/>' +
        '<path d="M16 22h16M16 28h16M16 34h12" stroke="#6b7f93" stroke-width="2" stroke-linecap="round"/>',
        className);
    }

    if (name === "pdf") {
      return svg(size,
        '<path d="M10 5h19l9 9v29H10V5z" fill="#fff" stroke="#d8dee6" stroke-width="1.8"/>' +
        '<path d="M29 5v10h9" fill="#ffe9e9"/>' +
        '<rect x="13" y="25" width="22" height="9" rx="2" fill="#d93434"/>' +
        '<text x="24" y="32" text-anchor="middle" font-size="7" font-family="Arial" font-weight="700" fill="#fff">PDF</text>',
        className);
    }

    if (name === "zip") {
      return svg(size,
        '<path d="M10 5h19l9 9v29H10V5z" fill="#fff6d9" stroke="#d5b449" stroke-width="1.8"/>' +
        '<path d="M29 5v10h9" fill="#ffe894"/>' +
        '<path d="M23 8h5v4h-5zm0 5h5v4h-5zm0 5h5v4h-5zm0 5h5v4h-5z" fill="#6c5a1e"/>' +
        '<rect x="22" y="28" width="7" height="8" rx="2" fill="#6c5a1e"/>',
        className);
    }

    if (name === "image-file") {
      return svg(size,
        '<path d="M10 5h19l9 9v29H10V5z" fill="#fff" stroke="#cbd5e1" stroke-width="1.8"/>' +
        '<circle cx="29" cy="22" r="3" fill="#ffd54f"/>' +
        '<path d="M15 36l7-8 5 4 4-5 4 9H15z" fill="#51ad73"/>',
        className);
    }

    if (name === "chrome") {
      return svg(size,
        '<circle cx="24" cy="24" r="21" fill="#fff"/>' +
        '<path d="M24 24L7 24A21 21 0 0 1 38 7z" fill="#ea4335"/>' +
        '<path d="M24 24l14-17A21 21 0 0 1 39 39z" fill="#fbbc05"/>' +
        '<path d="M24 24l15 15A21 21 0 0 1 7 24z" fill="#34a853"/>' +
        '<circle cx="24" cy="24" r="9" fill="#4285f4"/>' +
        '<circle cx="24" cy="24" r="6" fill="#8ab4f8"/>',
        className);
    }

    if (name === "school") {
      return svg(size,
        '<path d="M5 17l19-9 19 9-19 9-19-9z" fill="#6d5bd0"/>' +
        '<path d="M12 22v9c0 4 6 8 12 8s12-4 12-8v-9l-12 6-12-6z" fill="#8777e8"/>' +
        '<path d="M43 18v13" stroke="#6d5bd0" stroke-width="2.4" stroke-linecap="round"/>',
        className);
    }

    if (name === "flask") {
      return svg(size,
        '<path d="M18 5h12M21 5v12L11 36c-1 3 1 7 5 7h16c4 0 6-4 5-7L27 17V5" fill="#e7f5ff" stroke="#4f86c6" stroke-width="2"/>' +
        '<path d="M14 33h20" stroke="#31b5a0" stroke-width="6" stroke-linecap="round"/>',
        className);
    }

    if (name === "home") {
      return svg(size,
        '<path d="M7 23L24 8l17 15v18H29V29H19v12H7V23z" fill="#51606f"/>',
        className);
    }

    if (name === "download") {
      return svg(size,
        '<path d="M24 6v23" stroke="#3977c2" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M15 22l9 9 9-9" fill="none" stroke="#3977c2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M9 39h30" stroke="#69798a" stroke-width="3" stroke-linecap="round"/>',
        className);
    }

    if (name === "this-pc") {
      return svg(size,
        '<rect x="7" y="8" width="34" height="24" rx="3" fill="#72b7ef" stroke="#3d7fb3" stroke-width="1.5"/>' +
        '<rect x="11" y="12" width="26" height="16" rx="1.5" fill="#dff2ff"/>' +
        '<path d="M18 38h12M24 32v6" stroke="#667788" stroke-width="3" stroke-linecap="round"/>',
        className);
    }

    return svg(size,
      '<rect x="8" y="8" width="32" height="32" rx="8" fill="#dbeafe"/>' +
      '<circle cx="24" cy="24" r="6" fill="#3b82f6"/>',
      className);
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
    icon: icon,
    defaultShellState: defaultShellState,
    loadShellState: loadShellState,
    saveShellState: saveShellState,
    resetShellState: resetShellState
  };
})();