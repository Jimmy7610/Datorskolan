/*
  Datorskolan i18n core.

  Locale files register dictionaries with DatorskolanI18n.register(locale, namespace, data).
  - namespace "ui":     flat key → string map for every interface text (landing, FakeWin, dialogs, aria).
  - namespace "course": lesson, module and scenario texts keyed by id (see src/course.js).

  The active locale is stored in localStorage under STORAGE_KEY and mirrored to <html lang>.
  Adding a language = adding locales/<code>/ui.js + locales/<code>/course.js and listing it in SUPPORTED.
*/
(function (global) {
  "use strict";

  var STORAGE_KEY = "datorskolan.locale.v1";
  var DEFAULT_LOCALE = "sv";
  var SUPPORTED = [
    { code: "sv", htmlLang: "sv", intl: "sv-SE", nativeName: "Svenska" },
    { code: "en", htmlLang: "en", intl: "en-GB", nativeName: "English" }
  ];

  var dictionaries = {};
  var listeners = [];
  var current = null;

  function isSupported(code) {
    return SUPPORTED.some(function (entry) { return entry.code === code; });
  }

  function info(code) {
    return SUPPORTED.filter(function (entry) { return entry.code === code; })[0] || SUPPORTED[0];
  }

  function storage() {
    try {
      return global.localStorage || null;
    } catch (error) {
      return null;
    }
  }

  function readStoredLocale() {
    var store = storage();
    if (!store) return null;
    try {
      var value = store.getItem(STORAGE_KEY);
      return isSupported(value) ? value : null;
    } catch (error) {
      return null;
    }
  }

  function register(locale, namespace, data) {
    dictionaries[locale] = dictionaries[locale] || {};
    var target = dictionaries[locale][namespace] = dictionaries[locale][namespace] || {};
    Object.keys(data || {}).forEach(function (key) {
      target[key] = data[key];
    });
  }

  function dictionary(locale, namespace) {
    return (dictionaries[locale] && dictionaries[locale][namespace]) || {};
  }

  function locale() {
    if (!current) current = readStoredLocale() || DEFAULT_LOCALE;
    return current;
  }

  function format(template, params) {
    if (!params) return template;
    return String(template).replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match;
    });
  }

  // Missing keys are surfaced loudly in the UI ("⟦key⟧") so they are caught in review and by tests.
  function t(key, params) {
    var value = dictionary(locale(), "ui")[key];
    if (value === undefined) value = dictionary(DEFAULT_LOCALE, "ui")[key];
    if (value === undefined) return "⟦" + key + "⟧";
    return format(value, params);
  }

  function has(key, loc) {
    return Object.prototype.hasOwnProperty.call(dictionary(loc || locale(), "ui"), key);
  }

  // Plural helper: keys "<base>.one" and "<base>.other".
  function plural(base, count, params) {
    var p = Object.assign({ count: count }, params || {});
    return t(base + (count === 1 ? ".one" : ".other"), p);
  }

  function setLocale(code) {
    if (!isSupported(code) || code === locale()) return false;
    current = code;
    var store = storage();
    if (store) {
      try { store.setItem(STORAGE_KEY, code); } catch (error) { /* private mode: locale lasts for this visit */ }
    }
    applyDocumentLanguage();
    listeners.slice().forEach(function (fn) { fn(code); });
    return true;
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function intlLocale() {
    return info(locale()).intl;
  }

  function lower(value) {
    return String(value == null ? "" : value).trim().toLocaleLowerCase(intlLocale());
  }

  function applyDocumentLanguage() {
    if (!global.document || !global.document.documentElement) return;
    global.document.documentElement.lang = info(locale()).htmlLang;
  }

  /*
    Static HTML is translated through data attributes:
      data-i18n="key"              → textContent
      data-i18n-html="key"         → innerHTML (only for trusted locale strings with simple markup)
      data-i18n-attr="attr:key;…"  → attributes such as aria-label, title, alt, content
  */
  function translateDom(rootNode) {
    var scope = rootNode || (global.document && global.document);
    if (!scope || !scope.querySelectorAll) return;

    Array.prototype.forEach.call(scope.querySelectorAll("[data-i18n]"), function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });

    Array.prototype.forEach.call(scope.querySelectorAll("[data-i18n-html]"), function (node) {
      node.innerHTML = t(node.getAttribute("data-i18n-html"));
    });

    Array.prototype.forEach.call(scope.querySelectorAll("[data-i18n-attr]"), function (node) {
      node.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }

  global.DatorskolanI18n = {
    STORAGE_KEY: STORAGE_KEY,
    DEFAULT_LOCALE: DEFAULT_LOCALE,
    SUPPORTED: SUPPORTED,
    register: register,
    dictionary: dictionary,
    locale: locale,
    setLocale: setLocale,
    onChange: onChange,
    isSupported: isSupported,
    info: info,
    intlLocale: intlLocale,
    lower: lower,
    t: t,
    has: has,
    plural: plural,
    format: format,
    translateDom: translateDom,
    applyDocumentLanguage: applyDocumentLanguage
  };

  applyDocumentLanguage();
})(typeof window !== "undefined" ? window : globalThis);
