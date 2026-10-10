/*
  Settings (Inställningar) – Windows 11 layout: navigation with profile and search, page header, settings cards.
  The Wi‑Fi network list is shared with the Quick Settings flyout (renderWifiFlyout).
*/
(function () {
  "use strict";

  var WIFI_KEY = "datorskolan";

  // Same pages, order and colour icons as the Windows 11 Settings navigation.
  var PAGES = [
    ["home", "home"],
    ["system", "desktop"],
    ["bluetooth", "bluetooth-color"],
    ["network", "globe"],
    ["personalization", "personalization"],
    ["apps", "apps-list"],
    ["accounts", "person"],
    ["time", "clock"],
    ["gaming", "gaming"],
    ["accessibility", "accessibility"],
    ["privacy", "shield"],
    ["update", "update"]
  ];

  function ensure(state) {
    if (!state.settings) {
      state.settings = {
        page: "home",
        wifiEnabled: true,
        wifiNetwork: null,
        wifiExpanded: null,
        wifiAskKey: null,
        wifiError: false,
        bluetoothEnabled: true,
        bluetoothDevice: null,
        volume: 20,
        brightness: 80,
        microphone: false,
        camera: false,
        airplane: false,
        batterySaver: false,
        wallpaper: "bloom",
        updatePending: true,
        updateDone: false,
        appMenu: null,
        query: ""
      };
    }
    return state.settings;
  }

  function networks(ctx) {
    return [
      { name: ctx.t("settings.wifi.homeNetwork"), secure: true, strength: 3 },
      { name: ctx.t("settings.wifi.neighbour"), secure: true, strength: 2 },
      { name: ctx.t("settings.wifi.public"), secure: false, strength: 1 }
    ];
  }

  function checkMedia(ctx, s) {
    if (s.volume >= 40 && s.microphone && s.camera && !s.mediaReported) {
      s.mediaReported = true;
      ctx.emit("settings.audioConfigured", { volume: s.volume, microphone: true, camera: true });
    }
  }

  function toggle(ctx, opts) {
    var h = ctx.h;
    var t = ctx.t;
    var on = !!opts.on;
    return h("label", { class: "fw-toggle" + (opts.disabled ? " is-disabled" : "") }, [
      h("span", { class: "fw-toggle-text", text: t(on ? "common.on" : "common.off") }),
      h("button", {
        type: "button",
        role: "switch",
        class: "fw-toggle-switch" + (on ? " is-on" : ""),
        disabled: !!opts.disabled,
        aria: { checked: on ? "true" : "false", label: opts.label },
        data: { ui: opts.ui || "" },
        on: { click: function (e) { e.stopPropagation(); opts.onChange(!on); } }
      })
    ]);
  }

  /* ---------- Wi‑Fi list (Settings page and Quick Settings) ---------- */

  function wifiList(ctx, rerender) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state);
    var list = h("div", { class: "fw-wifi-list", role: "list", aria: { label: t("settings.wifi.available") } });

    networks(ctx).forEach(function (network) {
      var connected = s.wifiNetwork === network.name;
      var expanded = s.wifiExpanded === network.name;
      var row = h("div", { class: "fw-wifi-row" + (connected ? " is-connected" : "") + (expanded ? " is-expanded" : ""), role: "listitem", data: { ui: "wifi-" + (network.name === t("settings.wifi.homeNetwork") ? "home" : "other") } });

      row.appendChild(h("button", {
        type: "button",
        class: "fw-wifi-summary",
        aria: { expanded: expanded ? "true" : "false" },
        on: { click: function () { s.wifiExpanded = expanded ? null : network.name; s.wifiAskKey = null; s.wifiError = false; rerender(); } }
      }, [
        h("span", { class: "fw-wifi-icon strength-" + network.strength, html: ctx.icon("wifi", 20) }),
        h("span", { class: "fw-wifi-text" }, [
          h("strong", { text: network.name }),
          h("small", { text: connected ? t("settings.wifi.connectedSecure") : network.secure ? t("settings.wifi.secured") : t("settings.wifi.open") })
        ])
      ]));

      if (expanded) {
        var panel = h("div", { class: "fw-wifi-panel" });
        if (connected) {
          panel.appendChild(h("button", { type: "button", class: "fw-button", text: t("settings.wifi.disconnect"), on: { click: function () {
            s.wifiNetwork = null;
            ctx.emit("settings.wifiDisconnected", { network: network.name });
            rerender();
          } } }));
        } else if (s.wifiAskKey === network.name) {
          var input = h("input", { type: "password", id: "fw-wifi-key", autocomplete: "off", aria: { invalid: s.wifiError ? "true" : "false", describedby: "fw-wifi-key-help" }, data: { ui: "wifi-key" } });
          var show = h("button", { type: "button", class: "fw-icon-button", title: t("settings.wifi.showKey"), aria: { label: t("settings.wifi.showKey"), pressed: "false" }, html: ctx.glyph("eye", 16), on: { click: function () {
            var visible = input.type === "text";
            input.type = visible ? "password" : "text";
            show.setAttribute("aria-pressed", visible ? "false" : "true");
          } } });
          function submit() {
            if (input.value === WIFI_KEY) {
              s.wifiNetwork = network.name;
              s.wifiAskKey = null;
              s.wifiExpanded = null;
              s.wifiError = false;
              ctx.emit("settings.wifiConnected", { network: network.name });
              ctx.render();
            } else {
              s.wifiError = true;
              rerender();
              var again = document.getElementById("fw-wifi-key");
              if (again) again.focus();
            }
          }
          input.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); submit(); } });
          panel.appendChild(h("label", { class: "fw-field", for: "fw-wifi-key" }, [h("span", { text: t("settings.wifi.enterKey") })]));
          panel.appendChild(h("div", { class: "fw-input-with-button" }, [input, show]));
          panel.appendChild(h("p", { id: "fw-wifi-key-help", class: s.wifiError ? "fw-field-error" : "fw-field-help", role: s.wifiError ? "alert" : null, text: s.wifiError ? t("settings.wifi.wrongKey") : t("settings.wifi.keyHelp") }));
          panel.appendChild(h("div", { class: "fw-row-actions" }, [
            h("button", { type: "button", class: "fw-button fw-button-accent", text: t("common.next"), data: { ui: "wifi-next" }, on: { click: submit } }),
            h("button", { type: "button", class: "fw-button", text: t("common.cancel"), on: { click: function () { s.wifiAskKey = null; s.wifiError = false; rerender(); } } })
          ]));
          window.setTimeout(function () { var field = document.getElementById("fw-wifi-key"); if (field && !s.wifiError) field.focus(); }, 0);
        } else {
          panel.appendChild(h("label", { class: "fw-check" }, [h("input", { type: "checkbox", checked: true }), h("span", { text: t("settings.wifi.autoConnect") })]));
          if (!network.secure) panel.appendChild(h("p", { class: "fw-field-help is-warning", text: t("settings.wifi.openWarning") }));
          panel.appendChild(h("button", { type: "button", class: "fw-button fw-button-accent", text: t("settings.wifi.connect"), data: { ui: "wifi-connect" }, on: { click: function () {
            if (network.secure) {
              s.wifiAskKey = network.name;
              s.wifiError = false;
            } else {
              s.wifiNetwork = network.name;
              s.wifiExpanded = null;
              ctx.emit("settings.wifiConnectedOpen", { network: network.name });
            }
            rerender();
          } } }));
        }
        row.appendChild(panel);
      }
      list.appendChild(row);
    });
    return list;
  }

  function renderWifiFlyout(ctx, back) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state);
    var box = h("div", { class: "fw-quick-wifi" });
    box.appendChild(h("div", { class: "fw-quick-wifi-head" }, [
      h("button", { type: "button", class: "fw-icon-button", aria: { label: t("common.back") }, title: t("common.back"), html: ctx.glyph("chevron-left", 16), on: { click: back } }),
      h("strong", { text: t("quick.wifi") }),
      toggle(ctx, { on: s.wifiEnabled, label: t("quick.wifi"), onChange: function (v) { s.wifiEnabled = v; if (!v) s.wifiNetwork = null; ctx.render(); } })
    ]));
    if (s.wifiEnabled) box.appendChild(wifiList(ctx, function () { ctx.render(); }));
    else box.appendChild(h("p", { class: "fw-field-help", text: t("settings.wifi.offHelp") }));
    box.appendChild(h("button", { type: "button", class: "fw-subtle-button", text: t("quick.moreWifiSettings"), on: { click: function () { s.page = "network"; ctx.state.quickSettingsOpen = false; ctx.openApp("settings"); ctx.refreshApp("settings"); } } }));
    return box;
  }

  /* ---------- Settings app ---------- */

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state);
    var root = h("div", { class: "settings" });

    function refresh() { ctx.refreshApp("settings"); }
    function go(page) {
      s.page = page;
      s.query = "";
      ctx.emit("settings.pageOpened", { page: page });
      refresh();
    }

    /* Navigation */
    var nav = h("nav", { class: "settings-nav", aria: { label: t("app.settings") } });
    nav.appendChild(h("div", { class: "settings-profile" }, [
      h("span", { class: "fw-avatar is-large", text: t("shell.userInitial") }),
      h("span", {}, [h("strong", { text: t("shell.userName") }), h("small", { text: t("settings.localAccount") })])
    ]));

    var search = h("input", { type: "search", placeholder: t("settings.search"), aria: { label: t("settings.search") }, value: s.query || "" });
    var results = h("div", { class: "settings-search-results", role: "listbox", hidden: true });
    search.addEventListener("input", function () {
      s.query = search.value;
      var q = ctx.I18n.lower(search.value);
      results.replaceChildren();
      results.hidden = !q;
      if (!q) return;
      var hits = PAGES.filter(function (p) {
        return ctx.I18n.lower(t("settings.page." + p[0])).indexOf(q) >= 0 || ctx.I18n.lower(t("settings.keywords." + p[0])).indexOf(q) >= 0;
      });
      if (!hits.length) results.appendChild(h("p", { text: t("settings.noResults") }));
      hits.forEach(function (p) {
        results.appendChild(h("button", { type: "button", role: "option", on: { click: function () { go(p[0]); } } }, [h("span", { html: ctx.icon(p[1], 16) }), h("span", { text: t("settings.page." + p[0]) })]));
      });
    });
    nav.appendChild(h("label", { class: "settings-search" }, [search, h("span", { html: ctx.glyph("search", 16) })]));
    nav.appendChild(results);

    var list = h("ul", { class: "settings-nav-list" });
    PAGES.forEach(function (p) {
      list.appendChild(h("li", {}, [h("button", {
        type: "button",
        class: "settings-nav-item" + (s.page === p[0] ? " is-current" : ""),
        aria: { current: s.page === p[0] ? "page" : null },
        data: { ui: "settings-nav-" + p[0] },
        on: { click: function () { go(p[0]); } }
      }, [h("span", { class: "settings-nav-icon", html: ctx.icon(p[1], 16) }), h("span", { text: t("settings.page." + p[0]) })])]));
    });
    nav.appendChild(list);
    root.appendChild(nav);

    /* Page */
    var main = h("main", { class: "settings-main" });
    main.appendChild(h("h1", { class: "settings-title", text: t("settings.page." + s.page) }));

    function card(opts, children) {
      var node = h(opts.onClick ? "button" : "div", {
        type: opts.onClick ? "button" : null,
        class: "settings-card" + (opts.onClick ? " is-clickable" : "") + (opts.className ? " " + opts.className : ""),
        data: { ui: opts.ui || "" },
        on: opts.onClick ? { click: opts.onClick } : null
      }, [
        opts.iconKey || opts.glyph ? h("span", { class: "settings-card-icon", html: opts.iconKey ? ctx.icon(opts.iconKey, 20) : ctx.glyph(opts.glyph, 20) }) : null,
        h("span", { class: "settings-card-text" }, [h("strong", { text: opts.title }), opts.description ? h("small", { text: opts.description }) : null]),
        opts.control || null,
        opts.onClick ? h("span", { class: "settings-chevron", html: ctx.glyph("chevron-right", 16) }) : null
      ]);
      var wrap = h("div", { class: "settings-card-group" }, [node].concat(children || []));
      main.appendChild(wrap);
      return wrap;
    }

    function hero() {
      main.appendChild(h("div", { class: "settings-hero" }, [
        h("div", { class: "settings-hero-device", html: ctx.icon("laptop", 48) }),
        h("div", {}, [h("strong", { text: t("settings.system.deviceName") }), h("small", { text: t("settings.system.deviceModel") })]),
        h("div", { class: "settings-hero-status" }, [h("span", { html: ctx.icon("wifi", 16) }), h("span", { text: s.wifiNetwork || t("settings.wifi.notConnected") })]),
        h("div", { class: "settings-hero-status" }, [h("span", { html: ctx.icon("sync", 16) }), h("span", { text: s.updatePending ? t("settings.update.attention") : t("settings.update.upToDate") })])
      ]));
    }

    if (s.page === "home") {
      hero();
      main.appendChild(h("h2", { class: "settings-section-title", text: t("settings.home.recommended") }));
      card({ iconKey: "globe", title: t("settings.page.network"), description: s.wifiNetwork ? t("settings.wifi.connectedTo", { network: s.wifiNetwork }) : t("settings.wifi.notConnected"), ui: "settings-home-network", onClick: function () { go("network"); } });
      card({ iconKey: "bluetooth-color", title: t("settings.page.bluetooth"), description: t("settings.bt.devicesDesc"), ui: "settings-home-bluetooth", onClick: function () { go("bluetooth"); } });
      card({ iconKey: "personalization", title: t("settings.personal.background"), description: t("settings.personal.backgroundDesc"), ui: "settings-home-personalization", onClick: function () { go("personalization"); } });
    }

    if (s.page === "system") {
      hero();
      card({ iconKey: "desktop", title: t("settings.system.display"), description: t("settings.system.displayDesc") });

      var volume = h("input", { type: "range", min: "0", max: "100", value: String(s.volume), aria: { label: t("settings.system.volume") }, data: { ui: "settings-volume" } });
      var volumeValue = h("output", { text: String(s.volume) });
      volume.addEventListener("input", function () {
        s.volume = Number(volume.value);
        volumeValue.textContent = volume.value;
        ctx.emit("settings.volumeChanged", { volume: s.volume });
        checkMedia(ctx, s);
      });
      card({ iconKey: "speaker", title: t("settings.system.sound"), description: t("settings.system.soundDesc") }, [
        h("div", { class: "settings-sub" }, [h("label", { class: "settings-slider" }, [h("span", { text: t("settings.system.volume") }), volume, volumeValue])])
      ]);
      card({ iconKey: "battery", title: t("settings.system.power"), description: t("settings.system.powerDesc") });
      card({ iconKey: "document", title: t("settings.system.storage"), description: t("settings.system.storageDesc") });
    }

    if (s.page === "network") {
      card({ iconKey: "wifi", title: t("quick.wifi"), description: s.wifiNetwork ? t("settings.wifi.connectedTo", { network: s.wifiNetwork }) : t("settings.wifi.notConnected"), control: toggle(ctx, {
        on: s.wifiEnabled,
        label: t("quick.wifi"),
        ui: "wifi-toggle",
        onChange: function (v) { s.wifiEnabled = v; if (!v) s.wifiNetwork = null; ctx.emit("settings.wifiToggled", { enabled: v }); ctx.render(); }
      }) }, s.wifiEnabled ? [h("div", { class: "settings-sub" }, [h("h2", { class: "settings-sub-title", text: t("settings.wifi.available") }), wifiList(ctx, refresh)])] : []);
      card({ glyph: "airplane", title: t("quick.airplane"), description: t("settings.network.airplaneDesc"), control: toggle(ctx, {
        on: s.airplane,
        label: t("quick.airplane"),
        onChange: function (v) { s.airplane = v; if (v) { s.wifiEnabled = false; s.wifiNetwork = null; s.bluetoothEnabled = false; } ctx.render(); }
      }) });
      card({ iconKey: "globe", title: t("settings.network.advanced"), description: t("settings.network.advancedDesc") });
    }

    if (s.page === "bluetooth") {
      card({ iconKey: "bluetooth", title: t("quick.bluetooth"), description: t(s.bluetoothEnabled ? "settings.bt.discoverable" : "settings.bt.offDesc"), control: toggle(ctx, {
        on: s.bluetoothEnabled,
        label: t("quick.bluetooth"),
        ui: "bluetooth-toggle",
        onChange: function (v) { s.bluetoothEnabled = v; ctx.emit("settings.bluetoothToggled", { enabled: v }); ctx.render(); }
      }) });
      var devices = [];
      if (s.bluetoothDevice) {
        devices.push(h("div", { class: "settings-device" }, [
          h("span", { html: ctx.icon("headphones", 24) }),
          h("span", {}, [h("strong", { text: s.bluetoothDevice }), h("small", { text: t("settings.bt.connected") })])
        ]));
      }
      devices.push(h("button", {
        type: "button",
        class: "fw-button",
        disabled: !s.bluetoothEnabled,
        data: { ui: "bluetooth-add" },
        on: { click: function () { addDeviceWizard(ctx); } }
      }, [h("span", { html: ctx.glyph("plus", 16) }), h("span", { text: t("settings.bt.addDevice") })]));
      card({ iconKey: "headphones", title: t("settings.bt.devices"), description: t("settings.bt.devicesDesc") }, [h("div", { class: "settings-sub" }, devices)]);
      card({ glyph: "print", title: t("settings.bt.printers"), description: t("settings.bt.printersDesc") });
    }

    if (s.page === "personalization") {
      var swatches = h("div", { class: "settings-wallpapers", role: "radiogroup", aria: { label: t("settings.personal.background") } });
      ["bloom", "dawn", "dusk", "solid"].forEach(function (name) {
        var checked = s.wallpaper === name;
        swatches.appendChild(h("button", {
          type: "button",
          role: "radio",
          class: "settings-wallpaper is-" + name,
          aria: { checked: checked ? "true" : "false", label: t("settings.personal.wallpaper." + name) },
          title: t("settings.personal.wallpaper." + name),
          on: { click: function () {
            s.wallpaper = name;
            ctx.emit("settings.wallpaperChanged", { wallpaper: name });
            ctx.render();
          } }
        }));
      });
      card({ iconKey: "image", title: t("settings.personal.background"), description: t("settings.personal.backgroundDesc") }, [h("div", { class: "settings-sub" }, [swatches])]);
      card({ iconKey: "start", title: t("settings.personal.start"), description: t("settings.personal.startDesc") });
      card({ iconKey: "desktop", title: t("settings.personal.taskbar"), description: t("settings.personal.taskbarDesc") });
    }

    if (s.page === "apps") {
      var installed = [
        { id: "browser", name: t("app.browser"), publisher: "Google LLC" },
        { id: "calculator", name: t("app.calculator"), publisher: "Microsoft Corporation" },
        { id: "notepad", name: t("app.notepad"), publisher: "Microsoft Corporation" }
      ];
      if (ctx.state.software && ctx.state.software.exerciseProgramInstalled) {
        installed.push({ id: "exercise-program", name: t("app.exerciseProgram"), publisher: "Datorskolan" });
      }
      var rows = installed.map(function (app) {
        var row = h("div", { class: "settings-app-row", data: { ui: "app-row-" + app.id } }, [
          h("span", { class: "settings-app-icon", html: ctx.icon(app.id === "browser" ? "chrome" : app.id === "exercise-program" ? "installer" : app.id, 24) }),
          h("span", {}, [h("strong", { text: app.name }), h("small", { text: app.publisher })]),
          h("button", {
            type: "button",
            class: "fw-icon-button",
            title: t("settings.apps.more"),
            aria: { label: t("settings.apps.moreFor", { app: app.name }), haspopup: "menu" },
            html: ctx.glyph("more", 16),
            data: { ui: "app-more-" + app.id },
            on: { click: function (e) {
              var rect = e.currentTarget.getBoundingClientRect();
              ctx.openMenu({
                kind: "app-menu",
                x: rect.left - 160,
                y: rect.bottom + 4,
                items: [
                  { label: t("settings.apps.advanced"), disabled: true },
                  { label: t("settings.apps.move"), disabled: true },
                  { label: t("settings.apps.uninstall"), disabled: app.id !== "exercise-program", ui: "app-uninstall", action: function () { confirmUninstall(ctx, app); } }
                ]
              });
            } }
          })
        ]);
        return row;
      });
      card({ iconKey: "apps-list", title: t("settings.apps.installed"), description: t("settings.apps.installedDesc") }, [h("div", { class: "settings-sub settings-app-list" }, rows)]);
      card({ iconKey: "apps-list", title: t("settings.apps.defaults"), description: t("settings.apps.defaultsDesc") });
    }

    if (s.page === "accounts") {
      card({ iconKey: "person", title: t("settings.accounts.yourInfo"), description: t("shell.userName") + " · " + t("settings.localAccount") });
      card({ glyph: "lock", title: t("settings.accounts.signIn"), description: t("settings.accounts.signInDesc") });
    }

    if (s.page === "time") {
      card({ iconKey: "clock", title: t("settings.time.dateTime"), description: t("settings.time.dateTimeDesc") });
      card({ iconKey: "globe", title: t("settings.time.language"), description: t("settings.time.languageDesc", { language: t("settings.time.languageName") }) });
    }

    if (s.page === "gaming") {
      card({ iconKey: "gaming", title: t("settings.gaming.gameMode"), description: t("settings.gaming.gameModeDesc") });
      card({ iconKey: "image", title: t("settings.gaming.captures"), description: t("settings.gaming.capturesDesc") });
    }

    if (s.page === "accessibility") {
      card({ glyph: "accessibility", title: t("settings.access.textSize"), description: t("settings.access.textSizeDesc") });
      card({ glyph: "view", title: t("settings.access.contrast"), description: t("settings.access.contrastDesc") });
      card({ glyph: "eye", title: t("settings.access.magnifier"), description: t("settings.access.magnifierDesc") });
    }

    if (s.page === "privacy") {
      card({ iconKey: "shield", title: t("settings.privacy.security"), description: t("settings.privacy.securityDesc") });
      main.appendChild(h("h2", { class: "settings-section-title", text: t("settings.privacy.appPermissions") }));
      card({ glyph: "eye", title: t("settings.privacy.camera"), description: t("settings.privacy.cameraDesc"), control: toggle(ctx, {
        on: s.camera,
        label: t("settings.privacy.camera"),
        ui: "camera-toggle",
        onChange: function (v) { s.camera = v; ctx.emit("settings.cameraChanged", { enabled: v }); checkMedia(ctx, s); refresh(); }
      }) });
      card({ iconKey: "headphones", title: t("settings.privacy.microphone"), description: t("settings.privacy.microphoneDesc"), control: toggle(ctx, {
        on: s.microphone,
        label: t("settings.privacy.microphone"),
        ui: "microphone-toggle",
        onChange: function (v) { s.microphone = v; ctx.emit("settings.microphoneChanged", { enabled: v }); checkMedia(ctx, s); refresh(); }
      }) });
    }

    if (s.page === "update") {
      var pending = s.updatePending;
      main.appendChild(h("div", { class: "settings-update" + (pending ? " is-pending" : " is-done") }, [
        h("span", { class: "settings-update-icon", html: ctx.icon("sync", 32) }),
        h("div", {}, [
          h("strong", { text: t(pending ? "settings.update.restartRequired" : "settings.update.upToDate") }),
          h("small", { text: t(pending ? "settings.update.restartDesc" : "settings.update.lastChecked") })
        ]),
        pending ? h("button", {
          type: "button",
          class: "fw-button fw-button-accent",
          data: { ui: "update-restart" },
          text: t("settings.update.restartNow"),
          on: { click: function () {
            s.updatePending = false;
            ctx.emit("settings.updateRestarted", {});
            ctx.state.powerOverlay = "restart";
            ctx.render();
            window.setTimeout(function () { ctx.state.powerOverlay = null; ctx.render(); }, 2200);
          } }
        }) : h("button", { type: "button", class: "fw-button", text: t("settings.update.check"), on: { click: function () { ctx.toast(t("app.settings"), t("settings.update.upToDate"), "sync"); } } })
      ]));
      if (pending) main.appendChild(h("p", { class: "settings-note", text: t("settings.update.saveFirst") }));
      card({ glyph: "history", title: t("settings.update.history"), description: t("settings.update.historyDesc") });
    }

    root.appendChild(main);
    return root;
  }

  function confirmUninstall(ctx, app) {
    var t = ctx.t;
    ctx.showDialog({
      icon: "info",
      title: t("settings.apps.uninstallTitle", { app: app.name }),
      message: t("settings.apps.uninstallText"),
      buttons: [
        { label: t("settings.apps.uninstall"), primary: true, ui: "app-uninstall-confirm", action: function () {
          ctx.state.software.exerciseProgramInstalled = false;
          ctx.emit("software.uninstalled", { appId: "exercise-program", name: app.name });
          ctx.refreshApp("settings");
        } },
        { label: t("common.cancel"), cancel: true }
      ]
    });
  }

  function addDeviceWizard(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensure(ctx.state);

    function choose() {
      ctx.showDialog({
        kind: "add-device",
        wide: true,
        title: t("settings.bt.wizardTitle"),
        message: t("settings.bt.wizardChoose"),
        body: h("div", { class: "fw-choice-list" }, [
          h("button", { type: "button", class: "fw-choice", data: { ui: "bt-choice-bluetooth" }, on: { click: function () { ctx.closeDialog(); searching(); } } }, [
            h("span", { html: ctx.icon("bluetooth", 24) }),
            h("span", {}, [h("strong", { text: t("quick.bluetooth") }), h("small", { text: t("settings.bt.choiceBluetooth") })])
          ]),
          h("button", { type: "button", class: "fw-choice", disabled: true }, [
            h("span", { html: ctx.icon("desktop", 24) }),
            h("span", {}, [h("strong", { text: t("settings.bt.choiceDisplay") }), h("small", { text: t("settings.bt.choiceDisplayDesc") })])
          ])
        ]),
        buttons: [{ label: t("common.cancel"), cancel: true }]
      });
    }

    function searching() {
      ctx.showDialog({
        kind: "add-device",
        wide: true,
        title: t("settings.bt.wizardTitle"),
        message: t("settings.bt.wizardSearching"),
        body: h("div", { class: "fw-choice-list" }, [
          h("button", { type: "button", class: "fw-choice", data: { ui: "bt-device-headset" }, on: { click: function () {
            s.bluetoothDevice = t("settings.bt.headset");
            ctx.closeDialog();
            ctx.emit("settings.bluetoothPaired", { device: s.bluetoothDevice });
            ctx.showDialog({
              kind: "add-device",
              title: t("settings.bt.wizardTitle"),
              message: t("settings.bt.ready", { device: s.bluetoothDevice }),
              buttons: [{ label: t("common.done"), primary: true, cancel: true }]
            });
            ctx.refreshApp("settings");
          } } }, [
            h("span", { html: ctx.icon("headphones", 24) }),
            h("span", {}, [h("strong", { text: t("settings.bt.headset") }), h("small", { text: t("settings.bt.headsetType") })])
          ]),
          h("button", { type: "button", class: "fw-choice", disabled: true }, [
            h("span", { html: ctx.icon("desktop", 24) }),
            h("span", {}, [h("strong", { text: t("settings.bt.neighbourTv") }), h("small", { text: t("settings.bt.notAvailable") })])
          ])
        ]),
        buttons: [{ label: t("common.cancel"), cancel: true }]
      });
    }

    choose();
  }

  window.DatorskolanSettingsApp = {
    render: render,
    ensure: ensure,
    renderWifiFlyout: renderWifiFlyout
  };
})();
