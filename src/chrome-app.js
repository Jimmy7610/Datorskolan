/*
  The practice web browser ("Webbläsare" / "Browser"). It looks and behaves like the common Windows
  browsers (tabs in the title bar, address bar, back/forward/reload, ⋮ menu, downloads) so what the
  learner practises carries over to Chrome and Edge, but it carries no browser brand or logo (docs/38).
  The pages are a closed practice web ("datorskolan.example"); nothing is loaded from the internet.
*/
(function () {
  "use strict";

  var SITE = "datorskolan.example";

  function ensureState(state) {
    if (!state.browser) {
      state.browser = {
        tabs: [{ id: 1, page: "home" }],
        activeTabId: 1,
        history: ["home"],
        historyIndex: 0,
        zoom: 100,
        bookmarks: [],
        cookieAccepted: false,
        copiedLink: null,
        downloads: [],
        downloadsOpen: false,
        formSent: false,
        uploadName: null,
        nextTabId: 2
      };
    }
    return state.browser;
  }

  function pageInfo(ctx, page, query) {
    var t = ctx.t;
    var map = {
      home: { title: t("chrome.page.newTab"), url: "" },
      info: { title: t("chrome.page.info"), url: SITE + "/" + t("chrome.slug.info") },
      search: { title: query ? t("chrome.page.searchFor", { query: query }) : t("chrome.page.search"), url: SITE + "/" + t("chrome.slug.search") + (query ? "?q=" + encodeURIComponent(query) : "") },
      form: { title: t("chrome.page.form"), url: SITE + "/" + t("chrome.slug.form") },
      download: { title: t("chrome.page.download"), url: SITE + "/" + t("chrome.slug.download") },
      downloads: { title: t("chrome.page.downloads"), url: "chrome://downloads" },
      history: { title: t("chrome.page.history"), url: "chrome://history" }
    };
    return map[page] || map.home;
  }

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var s = ensureState(ctx.state);
    var root = h("div", { class: "chrome", tabindex: "-1" });

    function activeTab() {
      return s.tabs.filter(function (tab) { return tab.id === s.activeTabId; })[0] || s.tabs[0];
    }

    function refresh() { ctx.refreshApp("browser"); }

    function navigate(page, source, query) {
      var tab = activeTab();
      tab.page = page;
      tab.query = query || null;
      s.history = s.history.slice(0, s.historyIndex + 1).concat([page]);
      s.historyIndex = s.history.length - 1;
      ctx.emit("browser.navigated", { page: page, source: source || "navigation" });
      refresh();
    }

    function openTab(page, background) {
      var id = s.nextTabId++;
      s.tabs.push({ id: id, page: page || "home" });
      if (!background) s.activeTabId = id;
      return id;
    }

    function closeTab(tabId) {
      var index = s.tabs.findIndex(function (tab) { return tab.id === tabId; });
      if (s.tabs.length === 1) {
        var win = ctx.findWindow("browser");
        if (win) ctx.closeWindow(win.id);
        return;
      }
      s.tabs = s.tabs.filter(function (tab) { return tab.id !== tabId; });
      if (s.activeTabId === tabId) s.activeTabId = (s.tabs[Math.max(0, index - 1)] || s.tabs[0]).id;
      ctx.emit("browser.tabClosed", { tabId: tabId });
      refresh();
    }

    function newTab() {
      var id = openTab("home");
      ctx.emit("browser.tabOpened", { tabId: id });
      refresh();
      window.setTimeout(function () {
        var omnibox = document.querySelector(".chrome-omnibox input");
        if (omnibox) omnibox.focus();
      }, 0);
    }

    function setZoom(value) {
      s.zoom = Math.max(25, Math.min(500, value));
      ctx.emit("browser.zoomChanged", { zoom: s.zoom });
      refresh();
    }

    /* ---------- Tab strip (also the window's title bar) ---------- */

    var strip = h("div", { class: "chrome-tabstrip", data: { titlebar: "" } });
    var tabList = h("div", { class: "chrome-tabs", role: "tablist", aria: { label: t("chrome.tabs") } });
    s.tabs.forEach(function (tab) {
      var info = pageInfo(ctx, tab.page, tab.query);
      var selected = tab.id === s.activeTabId;
      var tabNode = h("div", { class: "chrome-tab" + (selected ? " is-active" : ""), data: { ui: "chrome-tab" } }, [
        h("button", {
          type: "button",
          role: "tab",
          class: "chrome-tab-button",
          aria: { selected: selected ? "true" : "false" },
          title: info.title,
          on: { click: function () { s.activeTabId = tab.id; refresh(); } }
        }, [h("span", { class: "chrome-favicon", html: ctx.icon("globe", 16) }), h("span", { class: "chrome-tab-title", text: info.title })]),
        h("button", {
          type: "button",
          class: "chrome-tab-close",
          title: t("chrome.closeTab"),
          aria: { label: t("chrome.closeTabNamed", { title: info.title }) },
          html: ctx.glyph("close", 12),
          data: { ui: "chrome-tab-close" },
          on: { click: function (e) { e.stopPropagation(); closeTab(tab.id); } }
        })
      ]);
      tabList.appendChild(tabNode);
    });
    strip.appendChild(tabList);
    strip.appendChild(h("button", {
      type: "button",
      class: "chrome-new-tab",
      title: t("chrome.newTab") + " (Ctrl+T)",
      aria: { label: t("chrome.newTab") },
      html: ctx.glyph("plus", 16),
      data: { ui: "chrome-new-tab" },
      on: { click: newTab }
    }));
    strip.appendChild(h("div", { class: "chrome-drag-space" }));
    strip.appendChild(h("div", { class: "chrome-caption", data: { captionSlot: "" } }));
    root.appendChild(strip);

    /* ---------- Toolbar ---------- */

    var tab = activeTab();
    var info = pageInfo(ctx, tab.page, tab.query);

    var back = h("button", { type: "button", class: "chrome-tool", title: t("chrome.back"), aria: { label: t("chrome.back") }, html: ctx.glyph("arrow-left", 16), disabled: s.historyIndex <= 0, data: { ui: "chrome-back" }, on: { click: function () {
      if (s.historyIndex <= 0) return;
      s.historyIndex -= 1;
      activeTab().page = s.history[s.historyIndex];
      ctx.emit("browser.back", {});
      refresh();
    } } });
    var forward = h("button", { type: "button", class: "chrome-tool", title: t("chrome.forward"), aria: { label: t("chrome.forward") }, html: ctx.glyph("arrow-right", 16), disabled: s.historyIndex >= s.history.length - 1, data: { ui: "chrome-forward" }, on: { click: function () {
      if (s.historyIndex >= s.history.length - 1) return;
      s.historyIndex += 1;
      activeTab().page = s.history[s.historyIndex];
      ctx.emit("browser.forward", {});
      refresh();
    } } });
    var reload = h("button", { type: "button", class: "chrome-tool", title: t("chrome.reload"), aria: { label: t("chrome.reload") }, html: ctx.glyph("refresh", 16), data: { ui: "chrome-reload" }, on: { click: function () {
      ctx.emit("browser.refreshed", { page: activeTab().page });
      refresh();
    } } });

    var omniboxInput = h("input", {
      type: "text",
      value: info.url,
      placeholder: t("chrome.omniboxPlaceholder"),
      aria: { label: t("chrome.addressBar") },
      spellcheck: false,
      autocomplete: "off",
      data: { ui: "chrome-omnibox" }
    });
    omniboxInput.addEventListener("focus", function () { omniboxInput.select(); });
    omniboxInput.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var value = omniboxInput.value.trim();
      if (!value) return;
      ctx.emit("browser.addressUsed", { value: value });
      var lower = ctx.I18n.lower(value);
      var looksLikeAddress = /^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(lower) || lower.indexOf("://") > 0;
      if (looksLikeAddress) {
        var slug = lower.split("/")[1] || "";
        var page = [["info", t("chrome.slug.info")], ["search", t("chrome.slug.search")], ["form", t("chrome.slug.form")], ["download", t("chrome.slug.download")]]
          .filter(function (pair) { return slug.indexOf(pair[1]) === 0 || slug.indexOf(pair[0]) === 0; })
          .map(function (pair) { return pair[0]; })[0];
        if (page) navigate(page, "address");
        else if (lower.indexOf(SITE) === 0) navigate("info", "address");
        else {
          ctx.emit("browser.searched", { query: value, source: "omnibox" });
          navigate("search", "search", value);
        }
      } else {
        ctx.emit("browser.searched", { query: value, source: "omnibox" });
        navigate("search", "search", value);
      }
    });

    var bookmarked = info.url && s.bookmarks.indexOf(info.url) >= 0;
    var omnibox = h("div", { class: "chrome-omnibox" }, [
      h("span", { class: "chrome-site-info", title: t("chrome.siteInfo"), html: tab.page === "home" ? ctx.glyph("search", 16) : ctx.glyph("lock", 14) }),
      omniboxInput,
      tab.page !== "home" ? h("button", {
        type: "button",
        class: "chrome-star" + (bookmarked ? " is-on" : ""),
        title: t(bookmarked ? "chrome.bookmarked" : "chrome.bookmark"),
        aria: { label: t(bookmarked ? "chrome.bookmarked" : "chrome.bookmark"), pressed: bookmarked ? "true" : "false" },
        html: ctx.glyph(bookmarked ? "star-filled" : "star", 16),
        data: { ui: "chrome-bookmark" },
        on: { click: function () {
          if (!bookmarked) s.bookmarks.push(info.url);
          ctx.emit("browser.bookmarked", { page: tab.page, url: info.url });
          ctx.toast(t("chrome.bookmarkAddedTitle"), info.title, "browser");
          refresh();
        } }
      }) : null
    ]);

    var toolbar = h("div", { class: "chrome-toolbar" }, [back, forward, reload, omnibox]);

    if (s.downloads.length) {
      toolbar.appendChild(h("button", {
        type: "button",
        class: "chrome-tool chrome-downloads-button" + (s.downloadsOpen ? " is-pressed" : ""),
        title: t("chrome.downloads"),
        aria: { label: t("chrome.downloads"), expanded: s.downloadsOpen ? "true" : "false" },
        html: ctx.glyph("download", 16),
        data: { ui: "chrome-downloads" },
        on: { click: function () { s.downloadsOpen = !s.downloadsOpen; refresh(); } }
      }));
    }

    toolbar.appendChild(h("span", { class: "chrome-profile", title: t("chrome.profile"), aria: { hidden: "true" }, text: t("shell.userInitial") }));
    toolbar.appendChild(h("button", {
      type: "button",
      class: "chrome-tool",
      title: t("chrome.menu"),
      aria: { label: t("chrome.menu"), haspopup: "menu" },
      html: ctx.glyph("more-vertical", 16),
      data: { ui: "chrome-menu" },
      on: { click: function (e) {
        var rect = e.currentTarget.getBoundingClientRect();
        ctx.openMenu({
          kind: "app-menu",
          x: rect.right - 280,
          y: rect.bottom + 4,
          label: t("chrome.menu"),
          items: [
            { label: t("chrome.newTab"), glyph: "tab", shortcut: "Ctrl+T", action: newTab },
            "sep",
            { label: t("chrome.page.history"), glyph: "history", shortcut: "Ctrl+H", action: function () { navigate("history", "menu"); } },
            { label: t("chrome.page.downloads"), glyph: "download", shortcut: "Ctrl+J", action: function () { navigate("downloads", "menu"); } },
            "sep",
            { label: t("chrome.zoomOut") + "  (" + s.zoom + " %)", glyph: "zoom-out", shortcut: "Ctrl+−", ui: "chrome-zoom-out", action: function () { setZoom(s.zoom - 10); } },
            { label: t("chrome.zoomIn") + "  (" + s.zoom + " %)", glyph: "zoom", shortcut: "Ctrl++", ui: "chrome-zoom-in", action: function () { setZoom(s.zoom + 10); } },
            { label: t("chrome.zoomReset"), shortcut: "Ctrl+0", disabled: s.zoom === 100, action: function () { setZoom(100); } },
            "sep",
            { label: t("chrome.exit"), glyph: "exit", action: function () { var w = ctx.findWindow("browser"); if (w) ctx.closeWindow(w.id); } }
          ]
        });
      } }
    }));
    root.appendChild(toolbar);

    if (s.bookmarks.length) {
      var bar = h("div", { class: "chrome-bookmarks-bar" });
      s.bookmarks.forEach(function (url) {
        var page = ["info", "search", "form", "download"].filter(function (p) { return pageInfo(ctx, p).url === url; })[0];
        if (!page) return;
        bar.appendChild(h("button", { type: "button", class: "chrome-bookmark-item", on: { click: function () { navigate(page, "bookmark"); } } }, [
          h("span", { html: ctx.icon("globe", 16) }), h("span", { text: pageInfo(ctx, page).title })
        ]));
      });
      root.appendChild(bar);
    }

    /* ---------- Downloads bubble ---------- */

    if (s.downloadsOpen && s.downloads.length) {
      var bubble = h("div", { class: "chrome-bubble", role: "dialog", aria: { label: t("chrome.recentDownloads") } }, [
        h("h2", { text: t("chrome.recentDownloads") })
      ]);
      s.downloads.slice().reverse().forEach(function (download) {
        var node = ctx.vfs.get(download.id);
        bubble.appendChild(h("div", { class: "chrome-bubble-item" }, [
          h("span", { html: node ? ctx.nodeIcon(node, 24) : ctx.icon("document", 24) }),
          h("div", {}, [h("strong", { text: download.name }), h("small", { text: node ? t("chrome.downloadDone") : t("chrome.downloadMissing") })]),
          node ? h("button", { type: "button", class: "chrome-text-button", text: t("chrome.showInFolder"), data: { ui: "chrome-show-in-folder" }, on: { click: function () {
            s.downloadsOpen = false;
            ctx.state.explorer.selectedId = node.id;
            ctx.openExplorerAt(node.parentId);
            ctx.emit("folder.opened", { folderId: node.parentId, path: ctx.vfs.path(node.parentId) });
            ctx.state.explorer.selectedId = node.id;
            ctx.refreshApp("explorer");
          } } }) : null
        ]));
      });
      bubble.appendChild(h("button", { type: "button", class: "chrome-text-button", text: t("chrome.allDownloads"), on: { click: function () { s.downloadsOpen = false; navigate("downloads", "menu"); } } }));
      root.appendChild(bubble);
    }

    /* ---------- Page ---------- */

    var page = h("div", { class: "chrome-page", data: { ui: "chrome-page" } });
    var content = h("div", { class: "chrome-content", style: { zoom: String(s.zoom / 100) } });
    page.appendChild(content);

    function link(text, target, extra) {
      var a = h("a", { href: "#", class: "chrome-link", text: text, data: { page: target } });
      a.addEventListener("click", function (e) {
        e.preventDefault();
        ctx.emit("browser.linkOpened", { page: target });
        navigate(target, "link");
      });
      a.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var targetInfo = pageInfo(ctx, target);
        ctx.openMenu({
          kind: "link",
          x: e.clientX,
          y: e.clientY,
          items: [
            { label: t("chrome.openLinkNewTab"), ui: "chrome-open-new-tab", action: function () {
              var id = openTab(target, true);
              ctx.emit("browser.linkOpenedInNewTab", { page: target, url: targetInfo.url, tabId: id });
              refresh();
            } },
            "sep",
            { label: t("chrome.copyLink"), ui: "chrome-copy-link", action: function () {
              s.copiedLink = targetInfo.url;
              try { if (navigator.clipboard) navigator.clipboard.writeText("https://" + targetInfo.url); } catch (error) { /* clipboard permission denied: the simulator still records the copy */ }
              ctx.emit("browser.linkCopied", { page: target, url: targetInfo.url });
            } }
          ]
        });
      });
      if (extra) a.classList.add(extra);
      return a;
    }

    var current = tab.page;

    if (current === "home") {
      var searchInput = h("input", { type: "search", placeholder: t("chrome.searchWeb"), aria: { label: t("chrome.searchWeb") }, data: { ui: "chrome-search" } });
      function runSearch() {
        var query = searchInput.value.trim();
        if (!query) return;
        ctx.emit("browser.searched", { query: query, source: "newtab" });
        navigate("search", "search", query);
      }
      searchInput.addEventListener("keydown", function (e) { if (e.key === "Enter") runSearch(); });

      var shortcuts = h("div", { class: "chrome-shortcuts" });
      // Each shortcut gets an icon that says what the page is, so a beginner can tell them apart.
      [["info", "chrome.page.info", "globe"], ["search", "chrome.page.search", "apps-list"], ["form", "chrome.page.form", "text-file"], ["download", "chrome.page.download", "download"]].forEach(function (entry) {
        shortcuts.appendChild(h("button", { type: "button", class: "chrome-shortcut", on: { click: function () { ctx.emit("browser.linkOpened", { page: entry[0] }); navigate(entry[0], "shortcut"); } } }, [
          h("span", { class: "chrome-shortcut-icon", html: ctx.icon(entry[2], 24) }),
          h("span", { text: t(entry[1]) })
        ]));
      });

      content.appendChild(h("div", { class: "chrome-newtab" }, [
        h("div", { class: "chrome-newtab-logo", html: ctx.icon("browser", 72) }),
        h("label", { class: "chrome-newtab-search" }, [h("span", { html: ctx.glyph("search", 20) }), searchInput, h("button", { type: "button", class: "chrome-text-button", text: t("chrome.searchButton"), on: { click: runSearch } })]),
        shortcuts
      ]));

      if (!s.cookieAccepted) {
        content.appendChild(h("div", { class: "chrome-cookie", role: "dialog", aria: { label: t("chrome.cookieTitle") } }, [
          h("strong", { text: t("chrome.cookieTitle") }),
          h("p", { text: t("chrome.cookieText") }),
          h("div", { class: "chrome-cookie-actions" }, [
            h("button", { type: "button", class: "chrome-button", text: t("chrome.cookieReject"), on: { click: function () { s.cookieAccepted = true; ctx.emit("browser.cookieRejected", {}); refresh(); } } }),
            h("button", { type: "button", class: "chrome-button is-primary", text: t("chrome.cookieAccept"), data: { ui: "chrome-cookie-accept" }, on: { click: function () { s.cookieAccepted = true; ctx.emit("browser.cookieAccepted", {}); refresh(); } } })
          ])
        ]));
      }
    }

    if (current === "info") {
      content.appendChild(h("article", { class: "chrome-article" }, [
        h("p", { class: "chrome-site-name", text: SITE }),
        h("h1", { text: t("chrome.info.title") }),
        h("p", { text: t("chrome.info.p1") }),
        h("p", { text: t("chrome.info.p2") }),
        h("div", { class: "chrome-card" }, [
          h("strong", { text: t("chrome.info.contactTitle") }),
          h("p", { class: "chrome-copy-source", text: t("chrome.info.phone") }),
          h("small", { text: t("chrome.info.copyHint") })
        ]),
        h("p", {}, [link(t("chrome.info.toSearch"), "search")])
      ]));
    }

    if (current === "search") {
      var query = tab.query || t("chrome.search.defaultQuery");
      content.appendChild(h("div", { class: "chrome-results" }, [
        h("p", { class: "chrome-result-count", text: t("chrome.search.count", { query: query }) }),
        h("div", { class: "chrome-result" }, [h("small", { text: SITE + " › " + t("chrome.slug.info") }), link(t("chrome.search.result1"), "info"), h("p", { text: t("chrome.search.result1Text") })]),
        h("div", { class: "chrome-result" }, [h("small", { text: SITE + " › " + t("chrome.slug.download") }), link(t("chrome.search.result2"), "download"), h("p", { text: t("chrome.search.result2Text") })]),
        h("div", { class: "chrome-result" }, [h("small", { text: SITE + " › " + t("chrome.slug.form") }), link(t("chrome.search.result3"), "form"), h("p", { text: t("chrome.search.result3Text") })])
      ]));
    }

    if (current === "download") {
      var fileName = t("chrome.download.fileName");
      var done = s.downloads.some(function (d) { return d.name === fileName && ctx.vfs.get(d.id); });
      content.appendChild(h("article", { class: "chrome-article" }, [
        h("p", { class: "chrome-site-name", text: SITE }),
        h("h1", { text: t("chrome.download.title") }),
        h("p", { text: t("chrome.download.text") }),
        h("button", {
          type: "button",
          class: "chrome-button is-primary",
          data: { ui: "chrome-download-file" },
          text: t("chrome.download.button", { name: fileName }),
          on: { click: function () {
            var node = ctx.vfs.createFile("downloads", fileName, "text", t("chrome.download.fileContent"));
            s.downloads.push({ id: node.id, name: node.name });
            s.downloadsOpen = true;
            ctx.emit("browser.downloaded", { name: node.name, id: node.id });
            refresh();
          } }
        }),
        done ? h("p", { class: "chrome-note", text: t("chrome.download.again") }) : null
      ]));
    }

    if (current === "form") {
      var nameInput = h("input", { type: "text", id: "chrome-form-name", autocomplete: "off", aria: { required: "true" } });
      var check = h("input", { type: "checkbox", id: "chrome-form-check" });
      var errorBox = h("div", { class: "chrome-form-error", role: "alert" });
      var uploadName = h("span", { class: "chrome-upload-name", text: s.uploadName || t("chrome.form.noFile") });
      content.appendChild(h("form", { class: "chrome-form", novalidate: true, on: { submit: function (e) { e.preventDefault(); } } }, [
        h("p", { class: "chrome-site-name", text: SITE }),
        h("h1", { text: t("chrome.form.title") }),
        h("p", { text: t("chrome.form.intro") }),
        h("label", { for: "chrome-form-name", text: t("chrome.form.name") }),
        nameInput,
        h("fieldset", {}, [
          h("legend", { text: t("chrome.form.contact") }),
          h("label", { class: "chrome-inline" }, [h("input", { type: "radio", name: "chrome-contact", value: "mail", checked: true }), h("span", { text: t("chrome.form.email") })]),
          h("label", { class: "chrome-inline" }, [h("input", { type: "radio", name: "chrome-contact", value: "phone" }), h("span", { text: t("chrome.form.phone") })])
        ]),
        h("label", { for: "chrome-form-subject", text: t("chrome.form.subject") }),
        h("select", { id: "chrome-form-subject" }, [h("option", { text: t("chrome.form.subjectQuestion") }), h("option", { text: t("chrome.form.subjectSupport") })]),
        h("div", { class: "chrome-upload" }, [
          h("button", { type: "button", class: "chrome-button", text: t("chrome.form.chooseFile"), data: { ui: "chrome-upload" }, on: { click: function () {
            window.DatorskolanBasicApps.showOpenDialog(ctx, {
              title: t("openDialog.title"),
              initialFolder: "documents",
              onOpen: function (node) {
                s.uploadName = node.name;
                ctx.emit("browser.uploaded", { name: node.name });
                refresh();
              }
            });
          } } }),
          uploadName
        ]),
        h("label", { class: "chrome-inline" }, [check, h("span", { text: t("chrome.form.agree") })]),
        errorBox,
        h("button", { type: "submit", class: "chrome-button is-primary", text: s.formSent ? t("chrome.form.sent") : t("chrome.form.send"), data: { ui: "chrome-form-submit" }, on: { click: function () {
          var problems = [];
          if (!nameInput.value.trim()) problems.push(t("chrome.form.errorName"));
          if (!check.checked) problems.push(t("chrome.form.errorAgree"));
          nameInput.setAttribute("aria-invalid", nameInput.value.trim() ? "false" : "true");
          if (problems.length) {
            errorBox.textContent = problems.join(" ");
            (nameInput.value.trim() ? check : nameInput).focus();
            return;
          }
          s.formSent = true;
          ctx.emit("browser.formSubmitted", { name: nameInput.value.trim() });
          refresh();
        } } }),
        s.formSent ? h("p", { class: "chrome-success", role: "status", text: t("chrome.form.thanks") }) : null
      ]));
    }

    if (current === "downloads") {
      var list = h("div", { class: "chrome-article" }, [h("h1", { text: t("chrome.page.downloads") })]);
      if (!s.downloads.length) list.appendChild(h("p", { text: t("chrome.downloadsEmpty") }));
      s.downloads.forEach(function (download) {
        var node = ctx.vfs.get(download.id);
        list.appendChild(h("div", { class: "chrome-card chrome-download-row" }, [
          h("span", { html: ctx.icon("text-file", 24) }),
          h("strong", { text: download.name }),
          node ? h("button", { type: "button", class: "chrome-text-button", text: t("chrome.showInFolder"), on: { click: function () { ctx.openExplorerAt(node.parentId); ctx.emit("folder.opened", { folderId: node.parentId, path: ctx.vfs.path(node.parentId) }); } } }) : h("small", { text: t("chrome.downloadMissing") })
        ]));
      });
      content.appendChild(list);
    }

    if (current === "history") {
      var history = h("div", { class: "chrome-article" }, [h("h1", { text: t("chrome.page.history") })]);
      s.history.slice().reverse().forEach(function (p) {
        if (p === "home") return;
        history.appendChild(h("p", {}, [link(pageInfo(ctx, p).title, p)]));
      });
      content.appendChild(history);
    }

    root.appendChild(page);

    page.addEventListener("copy", function () {
      var selected = "";
      try { selected = String(window.getSelection ? window.getSelection().toString() : "").trim(); } catch (error) { selected = ""; }
      if (!selected) return;
      s.copiedText = selected;
      ctx.emit("browser.textCopied", { text: selected });
    });

    root.addEventListener("keydown", function (e) {
      if (!e.ctrlKey) return;
      var key = e.key.toLowerCase();
      if (key === "t") { e.preventDefault(); newTab(); }
      else if (key === "w") { e.preventDefault(); closeTab(s.activeTabId); }
      else if (key === "+" || key === "=") { e.preventDefault(); setZoom(s.zoom + 10); }
      else if (key === "-") { e.preventDefault(); setZoom(s.zoom - 10); }
      else if (key === "0") { e.preventDefault(); setZoom(100); }
      else if (key === "l") { e.preventDefault(); omniboxInput.focus(); }
    });

    return root;
  }

  window.DatorskolanChromeApp = { render: render, ensure: ensureState };
})();
