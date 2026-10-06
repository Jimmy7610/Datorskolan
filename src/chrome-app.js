(function () {
  "use strict";

  function el(tag,className,text){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(text!==undefined) node.textContent=text;
    return node;
  }

  function ensureState(state){
    if(!state.browser){
      state.browser={
        tabs:[{id:1,title:"Ny flik",page:"home",url:"datorskolan.local"}],
        activeTabId:1,
        history:["home"],
        historyIndex:0,
        zoom:100,
        bookmarks:[],
        cookieAccepted:false,
        copiedLink:null
      };
    }
    return state.browser;
  }

  function pageInfo(page){
    var map={
      home:{title:"Ny flik",url:"datorskolan.local"},
      info:{title:"Vad är internet?",url:"datorskolan.local/internet"},
      search:{title:"Sökresultat",url:"datorskolan.local/search"},
      form:{title:"Formulär",url:"datorskolan.local/formular"},
      download:{title:"Nedladdningar",url:"datorskolan.local/download"}
    };
    return map[page]||{title:String(page||"Sida"),url:String(page||"datorskolan.local")};
  }

  function render(ctx){
    var s=ensureState(ctx.state);
    var root=el("div","chrome-app");

    function activeTab(){
      return s.tabs.find(function(t){return t.id===s.activeTabId;})||s.tabs[0];
    }

    function syncTab(tab,page){
      var info=pageInfo(page);
      tab.page=page;
      tab.title=info.title;
      tab.url=info.url;
    }

    function navigate(page,source){
      var tab=activeTab();
      if(!tab) return;
      syncTab(tab,page);
      s.history=s.history.slice(0,s.historyIndex+1);
      s.history.push(page);
      s.historyIndex=s.history.length-1;
      ctx.emit("browser.navigated",{page:page,source:source||"navigation"});
      refresh();
    }

    function refresh(){
      var fresh=render(ctx);
      root.replaceWith(fresh);
    }

    var chromeTop=el("div","chrome-top");

    var tabsRow=el("div","chrome-tabs-row");
    var tabs=el("div","chrome-tabs");

    s.tabs.forEach(function(tab){
      var wrap=el("div","chrome-tab"+(tab.id===s.activeTabId?" active":""));
      var favicon=el("span","chrome-tab-favicon");
      favicon.innerHTML=window.DatorskolanWindows11.icon("chrome",16);

      var select=el("button","chrome-tab-title",tab.title);
      select.type="button";
      select.addEventListener("click",function(){
        s.activeTabId=tab.id;
        refresh();
      });

      wrap.appendChild(favicon);
      wrap.appendChild(select);

      if(s.tabs.length>1){
        var close=el("button","chrome-tab-close","×");
        close.type="button";
        close.setAttribute("aria-label","Stäng flik");
        close.addEventListener("click",function(e){
          e.stopPropagation();
          var index=s.tabs.findIndex(function(t){return t.id===tab.id;});
          s.tabs=s.tabs.filter(function(t){return t.id!==tab.id;});
          if(s.activeTabId===tab.id){
            var fallback=s.tabs[Math.max(0,index-1)]||s.tabs[0];
            s.activeTabId=fallback.id;
          }
          ctx.emit("browser.tabClosed",{tabId:tab.id});
          refresh();
        });
        wrap.appendChild(close);
      }

      tabs.appendChild(wrap);
    });

    var newTab=el("button","chrome-new-tab","+");
    newTab.type="button";
    newTab.title="Ny flik";
    newTab.setAttribute("aria-label","Ny flik");
    newTab.addEventListener("click",function(){
      var id=Date.now();
      s.tabs.push({id:id,title:"Ny flik",page:"home",url:"datorskolan.local"});
      s.activeTabId=id;
      ctx.emit("browser.tabOpened",{tabId:id});
      refresh();
    });

    tabsRow.appendChild(tabs);
    tabsRow.appendChild(newTab);
    chromeTop.appendChild(tabsRow);

    var toolbar=el("div","chrome-toolbar");
    var back=el("button","chrome-nav","‹");
    var forward=el("button","chrome-nav","›");
    var reload=el("button","chrome-nav","↻");

    back.type=forward.type=reload.type="button";
    back.title="Bakåt";
    forward.title="Framåt";
    reload.title="Uppdatera";

    back.disabled=s.historyIndex<=0;
    forward.disabled=s.historyIndex>=s.history.length-1;

    back.addEventListener("click",function(){
      if(s.historyIndex<=0) return;
      s.historyIndex--;
      syncTab(activeTab(),s.history[s.historyIndex]);
      ctx.emit("browser.back",{});
      refresh();
    });

    forward.addEventListener("click",function(){
      if(s.historyIndex>=s.history.length-1) return;
      s.historyIndex++;
      syncTab(activeTab(),s.history[s.historyIndex]);
      ctx.emit("browser.forward",{});
      refresh();
    });

    reload.addEventListener("click",function(){
      ctx.emit("browser.refreshed",{page:activeTab().page});
      refresh();
    });

    var omniboxWrap=el("div","chrome-omnibox-wrap");
    var siteIcon=el("span","chrome-site-icon","⌁");
    var omnibox=el("input","chrome-omnibox");
    omnibox.type="text";
    omnibox.value=activeTab().url||pageInfo(activeTab().page).url;
    omnibox.setAttribute("aria-label","Adressfält");
    omnibox.spellcheck=false;

    var bookmark=el("button","chrome-bookmark","☆");
    bookmark.type="button";
    bookmark.title="Bokmärk den här fliken";

    var currentUrl=activeTab().url||"";
    if(s.bookmarks.indexOf(currentUrl)>=0) bookmark.textContent="★";

    bookmark.addEventListener("click",function(){
      var url=activeTab().url;
      if(s.bookmarks.indexOf(url)<0) s.bookmarks.push(url);
      bookmark.textContent="★";
      ctx.emit("browser.bookmarked",{page:activeTab().page,url:url});
    });

    function goFromOmnibox(){
      var value=omnibox.value.trim();
      if(!value) return;
      ctx.emit("browser.addressUsed",{value:value});

      var lower=value.toLowerCase();
      if(lower.indexOf("form")>=0||lower.indexOf("formular")>=0) navigate("form","address");
      else if(lower.indexOf("download")>=0||lower.indexOf("ladda")>=0) navigate("download","address");
      else if(lower.indexOf("search")>=0||lower.indexOf("sok")>=0||lower.indexOf("sök")>=0) navigate("search","address");
      else if(lower.indexOf("internet")>=0) navigate("info","address");
      else {
        activeTab().url=value;
        activeTab().title=value;
        ctx.emit("browser.searched",{query:value,source:"omnibox"});
        navigate("search","search");
      }
    }

    omnibox.addEventListener("keydown",function(e){
      if(e.key==="Enter") goFromOmnibox();
    });

    omnibox.addEventListener("focus",function(){omnibox.select();});

    omniboxWrap.appendChild(siteIcon);
    omniboxWrap.appendChild(omnibox);
    omniboxWrap.appendChild(bookmark);

    var profile=el("button","chrome-profile","J");
    profile.type="button";
    profile.title="Profil";

    var menu=el("button","chrome-menu","⋮");
    menu.type="button";
    menu.title="Anpassa och styr Google Chrome";

    toolbar.appendChild(back);
    toolbar.appendChild(forward);
    toolbar.appendChild(reload);
    toolbar.appendChild(omniboxWrap);
    toolbar.appendChild(profile);
    toolbar.appendChild(menu);
    chromeTop.appendChild(toolbar);
    root.appendChild(chromeTop);

    var page=el("div","chrome-page");
    page.style.fontSize=(s.zoom/100)+"em";

    function linkButton(text,target){
      var a=el("a","chrome-link",text);
      a.href="#";
      a.dataset.page=target;

      a.addEventListener("click",function(e){
        e.preventDefault();
        ctx.emit("browser.linkOpened",{page:target});
        navigate(target,"link");
      });

      a.addEventListener("contextmenu",function(e){
        e.preventDefault();
        e.stopPropagation();

        var existing=root.querySelector(".chrome-link-menu");
        if(existing) existing.remove();

        var menuBox=el("div","chrome-link-menu");
        menuBox.style.left=e.clientX+"px";
        menuBox.style.top=e.clientY+"px";

        var openNew=el("button","","Öppna länk i ny flik");
        var copy=el("button","","Kopiera länkadress");

        openNew.addEventListener("click",function(){
          var id=Date.now();
          var info=pageInfo(target);
          s.tabs.push({id:id,title:info.title,page:target,url:info.url});
          ctx.emit("browser.linkOpenedInNewTab",{page:target,url:info.url,tabId:id});
          menuBox.remove();
          refresh();
        });

        copy.addEventListener("click",function(){
          var info=pageInfo(target);
          s.copiedLink=info.url;
          ctx.emit("browser.linkCopied",{page:target,url:info.url});
          menuBox.remove();
        });

        menuBox.appendChild(openNew);
        menuBox.appendChild(copy);
        document.body.appendChild(menuBox);

        setTimeout(function(){
          document.addEventListener("pointerdown",function closeOnce(ev){
            if(!menuBox.contains(ev.target)) menuBox.remove();
            document.removeEventListener("pointerdown",closeOnce);
          });
        },0);
      });

      return a;
    }

    var p=activeTab().page;

    if(p==="home"){
      var home=el("div","chrome-newtab-page");
      var logo=el("div","chrome-newtab-logo");
      logo.innerHTML=window.DatorskolanWindows11.icon("chrome",72);

      var search=el("div","chrome-search-box");
      var searchInput=el("input","");
      searchInput.placeholder="Sök på webben";
      searchInput.setAttribute("aria-label","Sök på webben");
      var searchButton=el("button","","Sök");

      function runSearch(){
        var query=searchInput.value.trim();
        if(!query) return;
        ctx.emit("browser.searched",{query:query,source:"newtab"});
        navigate("search","search");
      }

      searchButton.addEventListener("click",runSearch);
      searchInput.addEventListener("keydown",function(e){if(e.key==="Enter") runSearch();});

      search.appendChild(searchInput);
      search.appendChild(searchButton);

      var shortcuts=el("div","chrome-shortcuts");
      [
        ["Vad är internet?","info"],
        ["Sökresultat","search"],
        ["Formulär","form"],
        ["Nedladdning","download"]
      ].forEach(function(item){
        var card=el("button","chrome-shortcut");
        card.type="button";
        card.innerHTML='<span class="chrome-shortcut-icon">⌁</span><small></small>';
        card.querySelector("small").textContent=item[0];
        card.addEventListener("click",function(){navigate(item[1],"shortcut");});
        shortcuts.appendChild(card);
      });

      home.appendChild(logo);
      home.appendChild(search);
      home.appendChild(shortcuts);

      if(!s.cookieAccepted){
        var cookie=el("div","chrome-cookie");
        cookie.innerHTML="<strong>Cookies på övningswebben</strong><span>Det här är en simulerad cookie-dialog.</span>";
        var cookieActions=el("div","");
        var accept=el("button","primary","Godkänn");
        var settings=el("button","","Inställningar");

        accept.addEventListener("click",function(){
          s.cookieAccepted=true;
          ctx.emit("browser.cookieAccepted",{});
          refresh();
        });

        cookieActions.appendChild(settings);
        cookieActions.appendChild(accept);
        cookie.appendChild(cookieActions);
        home.appendChild(cookie);
      }

      page.appendChild(home);
    }

    if(p==="info"){
      var article=el("article","chrome-article");
      article.innerHTML="<h1>Vad är internet?</h1><p>Internet är nätverket som gör att datorer och tjänster kan kommunicera. Webbläsaren är programmet du använder för att öppna webbsidor.</p><div class='chrome-contact-card'><strong>Övningskontakt</strong><p class='chrome-copy-source'>Telefon: 070-123 45 67</p><small>Markera telefonraden om du behöver kopiera den.</small></div>";
      article.appendChild(linkButton("Gå till sökresultat","search"));
      page.appendChild(article);
    }

    if(p==="search"){
      var searchPage=el("div","chrome-search-results");
      searchPage.innerHTML="<h1>Sökresultat</h1><p class='chrome-result-count'>Övningsresultat</p>";

      var r1=el("div","chrome-result");
      r1.appendChild(linkButton("Lär dig om säkra länkar","info"));
      var u1=el("small","","datorskolan.local/internet");
      r1.appendChild(u1);

      var r2=el("div","chrome-result");
      r2.appendChild(linkButton("Övningsfil att ladda ner","download"));
      var u2=el("small","","datorskolan.local/download");
      r2.appendChild(u2);

      searchPage.appendChild(r1);
      searchPage.appendChild(r2);
      page.appendChild(searchPage);
    }

    if(p==="download"){
      var dl=el("div","chrome-download-page");
      dl.innerHTML="<h1>Ladda ner en övningsfil</h1><p>Filen sparas i den virtuella mappen Downloads.</p>";

      var download=el("button","chrome-download-button","Ladda ner guide.txt");
      download.addEventListener("click",function(){
        try{ctx.vfs.createFile("downloads","guide.txt","text","Övningsfil från Chrome.");}catch(error){}
        ctx.emit("browser.downloaded",{name:"guide.txt"});
        download.textContent="✓ Nedladdad";
        download.disabled=true;
      });

      dl.appendChild(download);
      page.appendChild(dl);
    }

    if(p==="form"){
      var form=el("div","chrome-form-page");
      form.innerHTML=
        "<h1>Övningsformulär</h1>"+
        "<label>Namn<input class='chrome-form-name' type='text'></label>"+
        "<label class='inline'><input type='checkbox' class='chrome-check'> Jag har läst texten</label>"+
        "<fieldset><legend>Kontakt</legend><label class='inline'><input type='radio' name='contact' value='mail' checked> E-post</label><label class='inline'><input type='radio' name='contact' value='phone'> Telefon</label></fieldset>"+
        "<label>Ämne<select class='chrome-select'><option>Fråga</option><option>Support</option></select></label>";

      var upload=el("button","chrome-upload","Välj fil");
      var uploadName=el("span","chrome-upload-name","");
      var submit=el("button","chrome-submit","Skicka");

      upload.addEventListener("click",function(){
        var docs=ctx.vfs.list("documents").filter(function(n){return n.type==="file";});
        var chosen=docs[0];
        uploadName.textContent=chosen?"📎 "+chosen.name:"Ingen fil hittades";
        if(chosen) ctx.emit("browser.uploaded",{name:chosen.name});
      });

      submit.addEventListener("click",function(){
        var name=form.querySelector(".chrome-form-name").value.trim();
        var checked=form.querySelector(".chrome-check").checked;
        if(!name||!checked) return;
        ctx.emit("browser.formSubmitted",{name:name});
        submit.textContent="✓ Skickat";
      });

      form.appendChild(upload);
      form.appendChild(uploadName);
      form.appendChild(submit);
      page.appendChild(form);
    }

    root.appendChild(page);

    root.addEventListener("copy",function(){
      var selected="";
      try { selected=String(window.getSelection ? window.getSelection().toString() : "").trim(); } catch(error) {}
      if(!selected) return;
      s.copiedText=selected;
      ctx.emit("browser.textCopied",{text:selected});
    });

    var status=el("div","chrome-statusbar");
    var zoomMinus=el("button","","−");
    var zoomText=el("span","",s.zoom+"%");
    var zoomPlus=el("button","","+");

    zoomMinus.addEventListener("click",function(){
      s.zoom=Math.max(50,s.zoom-10);
      ctx.emit("browser.zoomChanged",{zoom:s.zoom});
      refresh();
    });

    zoomPlus.addEventListener("click",function(){
      s.zoom=Math.min(200,s.zoom+10);
      ctx.emit("browser.zoomChanged",{zoom:s.zoom});
      refresh();
    });

    status.appendChild(zoomMinus);
    status.appendChild(zoomText);
    status.appendChild(zoomPlus);
    root.appendChild(status);

    return root;
  }

  window.DatorskolanChromeApp={
    render:render
  };
})();