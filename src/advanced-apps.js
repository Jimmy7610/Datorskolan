(function () {
  "use strict";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function ensureKeyboardState(state) {
    if (!state.keyboardLab) {
      state.keyboardLab = {
        mode: "letters",
        completed: false,
        flags: {},
        clipboard: "",
        capsUsed: false
      };
    }
    return state.keyboardLab;
  }

  function renderKeyboard(ctx) {
    var state = ensureKeyboardState(ctx.state);
    var mode = state.mode || "letters";
    var root = el("div","keyboard-lab");
    var head = el("div","keyboard-lab-head");
    head.innerHTML = "<div><span>⌨️</span><strong>Keyboard Lab</strong></div><em></em>";
    head.querySelector("em").textContent = state.completed ? "✓ Klar" : "Träningsyta";
    root.appendChild(head);

    var stage = el("div","keyboard-stage");
    root.appendChild(stage);

    function complete(type, payload) {
      if (state.completed) return;
      state.completed = true;
      ctx.emit(type, payload || {});
      head.querySelector("em").textContent = "✓ Klar";
    }

    function title(text, sub) {
      var h = el("div","keyboard-copy");
      h.innerHTML = "<h3></h3><p></p>";
      h.querySelector("h3").textContent = text;
      h.querySelector("p").textContent = sub;
      stage.appendChild(h);
    }

    function inputBox(placeholder) {
      var input = el("input","keyboard-input");
      input.type = "text";
      input.placeholder = placeholder || "";
      input.autocomplete = "off";
      input.spellcheck = false;
      stage.appendChild(input);
      setTimeout(function(){ input.focus(); },0);
      return input;
    }

    if (mode === "letters") {
      title("Skriv ordet dator","Skriv med små bokstäver.");
      var letters = inputBox("dator");
      letters.addEventListener("input", function () {
        if (letters.value.toLocaleLowerCase("sv") === "dator") complete("keyboard.letters.complete",{value:letters.value});
      });
    }

    if (mode === "numbers") {
      title("Skriv siffrorna 12345","Använd sifferraden på tangentbordet.");
      var numbers = inputBox("12345");
      numbers.inputMode = "numeric";
      numbers.addEventListener("input", function () {
        if (numbers.value === "12345") complete("keyboard.numbers.complete",{value:numbers.value});
      });
    }

    if (mode === "editing") {
      title("Redigera text","Använd Mellanslag, Backspace, Delete och Enter.");
      var editor = el("textarea","keyboard-textarea");
      editor.value = "HejX världen";
      stage.appendChild(editor);
      var checklist = el("div","keyboard-checklist");
      checklist.innerHTML = "<span data-k='space'>Mellanslag</span><span data-k='backspace'>Backspace</span><span data-k='delete'>Delete</span><span data-k='enter'>Enter</span>";
      stage.appendChild(checklist);
      var flags = {};
      editor.addEventListener("keydown", function (e) {
        var key = e.key;
        if (key === " ") flags.space = true;
        if (key === "Backspace") flags.backspace = true;
        if (key === "Delete") flags.delete = true;
        if (key === "Enter") flags.enter = true;
        Object.keys(flags).forEach(function(k){
          var chip=checklist.querySelector("[data-k='"+k+"']");
          if(chip) chip.classList.add("done");
        });
        if (flags.space && flags.backspace && flags.delete && flags.enter) complete("keyboard.editing.complete",{});
      });
      setTimeout(function(){ editor.focus(); },0);
    }

    if (mode === "shift-caps") {
      title("Versaler","Gör en stor bokstav med Shift och använd sedan Caps Lock.");
      var out = el("div","keyboard-key-output","Väntar...");
      stage.appendChild(out);
      var shiftOk=false, capsOk=false;
      stage.tabIndex=0;
      stage.addEventListener("keydown", function(e){
        if(e.shiftKey && /^[a-zåäö]$/i.test(e.key) && e.key === e.key.toUpperCase()){
          shiftOk=true; out.textContent="Shift + bokstav ✓";
        }
        if(e.key==="CapsLock"){
          capsOk=true; out.textContent=shiftOk?"Shift ✓ • Caps Lock ✓":"Caps Lock ✓";
        }
        if(shiftOk&&capsOk) complete("keyboard.shiftcaps.complete",{});
      });
      setTimeout(function(){ stage.focus(); },0);
    }

    if (mode === "arrows") {
      title("Piltangenter","Flytta rutan åt alla fyra håll.");
      var field=el("div","keyboard-arrow-field");
      var token=el("div","keyboard-arrow-token","■");
      field.appendChild(token); stage.appendChild(field);
      var flagsA={};
      stage.tabIndex=0;
      stage.addEventListener("keydown", function(e){
        var map={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};
        if(!map[e.key]) return;
        e.preventDefault();
        flagsA[map[e.key]]=true;
        token.dataset.last=map[e.key];
        if(flagsA.up&&flagsA.down&&flagsA.left&&flagsA.right) complete("keyboard.arrows.complete",{});
      });
      setTimeout(function(){ stage.focus(); },0);
    }

    if (mode === "tab-esc") {
      title("Tab och Esc","Flytta fokus med Tab och stäng hjälprutan med Esc.");
      var row=el("div","keyboard-focus-row");
      var b1=el("button","","Första"); var b2=el("button","","Andra"); var b3=el("button","","Tredje");
      row.appendChild(b1);row.appendChild(b2);row.appendChild(b3);stage.appendChild(row);
      var modal=el("div","keyboard-mini-modal","Tryck Esc för att stänga");
      stage.appendChild(modal);
      var tabSeen=false, escSeen=false;
      stage.addEventListener("keydown",function(e){
        if(e.key==="Tab") tabSeen=true;
        if(e.key==="Escape"){ escSeen=true; modal.hidden=true; }
        if(tabSeen&&escSeen) complete("keyboard.tabesc.complete",{});
      });
      setTimeout(function(){ b1.focus(); },0);
    }

    if (mode === "modifiers") {
      title("Ctrl, Alt och Windows","Tryck på de tre modifierartangenterna en i taget.");
      var checklistM=el("div","keyboard-checklist");
      checklistM.innerHTML="<span data-k='ctrl'>Ctrl</span><span data-k='alt'>Alt</span><span data-k='meta'>Windows</span>";
      stage.appendChild(checklistM);
      var m={};
      stage.tabIndex=0;
      stage.addEventListener("keydown",function(e){
        if(e.key==="Control") m.ctrl=true;
        if(e.key==="Alt") m.alt=true;
        if(e.key==="Meta") m.meta=true;
        Object.keys(m).forEach(function(k){checklistM.querySelector("[data-k='"+k+"']").classList.add("done");});
        if(m.ctrl&&m.alt&&m.meta) complete("keyboard.modifiers.complete",{});
      });
      setTimeout(function(){ stage.focus(); },0);
    }

    if (mode === "shortcuts") {
      title("Kortkommandon","Använd Ctrl+A, Ctrl+C och Ctrl+V.");
      var area=el("textarea","keyboard-textarea");
      area.value="Kopiera mig";
      stage.appendChild(area);
      var check=el("div","keyboard-checklist");
      check.innerHTML="<span data-k='a'>Ctrl+A</span><span data-k='c'>Ctrl+C</span><span data-k='v'>Ctrl+V</span>";
      stage.appendChild(check);
      var sh={};
      area.addEventListener("keydown",function(e){
        if(!e.ctrlKey) return;
        var k=e.key.toLowerCase();
        if(k==="a") sh.a=true;
        if(k==="c"){ sh.c=true; state.clipboard=area.value.substring(area.selectionStart,area.selectionEnd)||area.value; }
        if(k==="v"){ sh.v=true; }
        Object.keys(sh).forEach(function(x){check.querySelector("[data-k='"+x+"']").classList.add("done");});
        if(sh.a&&sh.c&&sh.v) complete("keyboard.shortcuts.complete",{});
      });
      setTimeout(function(){ area.focus(); },0);
    }

    if (mode === "special") {
      title("Specialtecken","Skriv @ ! ? . ,");
      var special=inputBox("@ ! ? . ,");
      special.addEventListener("input",function(){
        var v=special.value;
        if(v.indexOf("@")>=0&&v.indexOf("!")>=0&&v.indexOf("?")>=0&&v.indexOf(".")>=0&&v.indexOf(",")>=0){
          complete("keyboard.special.complete",{});
        }
      });
    }

    if (mode === "final") {
      title("Tangentbord – slutuppdrag","Klara alla momenten utan steg-för-steg-hjälp.");
      var final=el("textarea","keyboard-final");
      final.placeholder="Skriv: Dator 2026!";
      stage.appendChild(final);
      var list=el("div","keyboard-checklist");
      list.innerHTML="<span data-k='text'>Text</span><span data-k='shift'>Shift</span><span data-k='enter'>Enter</span><span data-k='back'>Backspace</span><span data-k='arrow'>Piltangent</span><span data-k='shortcut'>Ctrl+A</span>";
      stage.appendChild(list);
      var f={};
      final.addEventListener("keydown",function(e){
        if(e.shiftKey&&e.key.length===1) f.shift=true;
        if(e.key==="Enter") f.enter=true;
        if(e.key==="Backspace") f.back=true;
        if(/^Arrow/.test(e.key)) f.arrow=true;
        if(e.ctrlKey&&e.key.toLowerCase()==="a") f.shortcut=true;
        if(final.value.length>=5) f.text=true;
        Object.keys(f).forEach(function(k){var n=list.querySelector("[data-k='"+k+"']");if(n)n.classList.add("done");});
        if(f.text&&f.shift&&f.enter&&f.back&&f.arrow&&f.shortcut) complete("keyboard.final.complete",{});
      });
      final.addEventListener("input",function(){
        if(final.value.length>=5){f.text=true;var n=list.querySelector("[data-k='text']");if(n)n.classList.add("done");}
      });
      setTimeout(function(){ final.focus(); },0);
    }

    return root;
  }

  function ensureBrowserState(state) {
    if (!state.browser) {
      state.browser = {
        tabs:[{id:1,title:"Start",page:"home"}],
        activeTabId:1,
        history:["home"],
        historyIndex:0,
        zoom:100
      };
    }
    return state.browser;
  }

  function renderBrowser(ctx) {
    var s=ensureBrowserState(ctx.state);
    var root=el("div","fake-browser");
    var tabs=el("div","browser-tabs");

    function activeTab(){ return s.tabs.find(function(t){return t.id===s.activeTabId;})||s.tabs[0]; }
    function navigate(page){
      var tab=activeTab(); if(!tab)return;
      tab.page=page; tab.title=page==="home"?"Start":page;
      s.history=s.history.slice(0,s.historyIndex+1); s.history.push(page); s.historyIndex=s.history.length-1;
      ctx.emit("browser.navigated",{page:page}); refresh();
    }
    function refresh(){ var fresh=renderBrowser(ctx); root.replaceWith(fresh); }

    s.tabs.forEach(function(tab){
      var b=el("button",tab.id===s.activeTabId?"active":"","");
      b.textContent=tab.title;
      b.addEventListener("click",function(){s.activeTabId=tab.id;refresh();});
      tabs.appendChild(b);
    });
    var plus=el("button","browser-new-tab","+");
    plus.addEventListener("click",function(){
      var id=Date.now();s.tabs.push({id:id,title:"Ny flik",page:"home"});s.activeTabId=id;
      ctx.emit("browser.tabOpened",{tabId:id});refresh();
    });
    tabs.appendChild(plus);root.appendChild(tabs);

    var bar=el("div","browser-bar");
    var back=el("button","","←"); var forward=el("button","","→"); var reload=el("button","","↻");
    var address=el("input","browser-address"); address.value=activeTab().page==="home"?"datorskolan.local":activeTab().page;
    var go=el("button","browser-go","Gå");
    back.disabled=s.historyIndex<=0;forward.disabled=s.historyIndex>=s.history.length-1;
    back.addEventListener("click",function(){if(s.historyIndex>0){s.historyIndex--;activeTab().page=s.history[s.historyIndex];ctx.emit("browser.back",{});refresh();}});
    forward.addEventListener("click",function(){if(s.historyIndex<s.history.length-1){s.historyIndex++;activeTab().page=s.history[s.historyIndex];ctx.emit("browser.forward",{});refresh();}});
    reload.addEventListener("click",function(){ctx.emit("browser.refreshed",{page:activeTab().page});});
    function goAddress(){var value=address.value.trim();ctx.emit("browser.addressUsed",{value:value});navigate(value.indexOf("saker")>=0?"search":value.indexOf("form")>=0?"form":"info");}
    go.addEventListener("click",goAddress);address.addEventListener("keydown",function(e){if(e.key==="Enter")goAddress();});
    [back,forward,reload,address,go].forEach(function(x){bar.appendChild(x);});
    root.appendChild(bar);

    var page=el("div","browser-page");
    var p=activeTab().page;
    if(p==="home"){
      page.innerHTML="<div class='browser-home'><h2>Övningswebben</h2><p>Det här är en helt simulerad webbläsare.</p><div class='browser-links'><button data-page='info'>Vad är internet?</button><button data-page='search'>Sökresultat</button><button data-page='form'>Formulär</button></div></div>";
    } else if(p==="search"){
      page.innerHTML="<h2>Sökresultat</h2><div class='browser-result'><button data-page='info'>Lär dig om säkra länkar</button><p>datorskolan.local/info</p></div><div class='browser-result'><button data-page='download'>Övningsfil att ladda ner</button><p>datorskolan.local/download</p></div>";
    } else if(p==="download"){
      page.innerHTML="<h2>Hämta en övningsfil</h2><p>Den här filen är simulerad.</p><button class='browser-download'>Ladda ner guide.txt</button>";
    } else if(p==="form"){
      page.innerHTML="<h2>Formulär</h2><label>Namn <input class='browser-form-name'></label><label><input type='checkbox' class='browser-check'> Jag har läst texten</label><button class='browser-submit'>Skicka</button>";
    } else {
      page.innerHTML="<h2>Vad är internet?</h2><p>Internet är nätverket. Webbläsaren är programmet du använder för att besöka webbsidor.</p><button data-page='search'>Gå till sökresultat</button>";
    }
    page.querySelectorAll("[data-page]").forEach(function(b){
      b.addEventListener("click",function(){ctx.emit("browser.linkOpened",{page:b.getAttribute("data-page")});navigate(b.getAttribute("data-page"));});
    });
    var dl=page.querySelector(".browser-download");
    if(dl)dl.addEventListener("click",function(){
      try{ctx.vfs.createFile("downloads","guide.txt","text","Övningsfil från webbläsaren.");}catch(e){}
      ctx.emit("browser.downloaded",{name:"guide.txt"});
      dl.textContent="✓ Nedladdad";
    });
    var submit=page.querySelector(".browser-submit");
    if(submit)submit.addEventListener("click",function(){
      var name=page.querySelector(".browser-form-name").value.trim();
      var checked=page.querySelector(".browser-check").checked;
      if(name&&checked){ctx.emit("browser.formSubmitted",{name:name});submit.textContent="✓ Skickat";}
    });
    root.appendChild(page);

    var foot=el("div","browser-footer");
    var minus=el("button","","−"); var zoom=el("span","",s.zoom+"%"); var plusZ=el("button","","+");
    minus.addEventListener("click",function(){s.zoom=Math.max(50,s.zoom-10);ctx.emit("browser.zoomChanged",{zoom:s.zoom});refresh();});
    plusZ.addEventListener("click",function(){s.zoom=Math.min(200,s.zoom+10);ctx.emit("browser.zoomChanged",{zoom:s.zoom});refresh();});
    foot.appendChild(minus);foot.appendChild(zoom);foot.appendChild(plusZ);root.appendChild(foot);
    page.style.fontSize=(s.zoom/100)+"em";
    return root;
  }

  function ensureMailState(state) {
    if (!state.mail) {
      state.mail={
        selectedId:null,
        inbox:[
          {id:"m1",from:"Anna",subject:"Bilder från utflykten",body:"Hej! Här kommer bilden.",attachment:"utflykt.jpg",safe:true},
          {id:"m2",from:"Support Center",subject:"AKUT: Ditt konto stängs",body:"Klicka genast och skriv ditt lösenord.",attachment:null,safe:false},
          {id:"m3",from:"Erik",subject:"Möte på fredag",body:"Kan vi ses klockan 10?",attachment:null,safe:true}
        ]
      };
    }
    return state.mail;
  }

  function renderMail(ctx) {
    var s=ensureMailState(ctx.state);
    var root=el("div","fake-mail");
    var side=el("div","mail-side");
    var compose=el("button","mail-compose","Nytt meddelande");
    side.appendChild(compose);
    var inbox=el("div","mail-inbox");
    s.inbox.forEach(function(m){
      var item=el("button","mail-item"+(s.selectedId===m.id?" active":""));
      item.innerHTML="<strong></strong><span></span><small></small>";
      item.querySelector("strong").textContent=m.from;
      item.querySelector("span").textContent=m.subject;
      item.querySelector("small").textContent=m.safe?"":"⚠ misstänkt";
      item.addEventListener("click",function(){s.selectedId=m.id;ctx.emit("mail.opened",{id:m.id,safe:m.safe});refresh();});
      inbox.appendChild(item);
    });
    side.appendChild(inbox);root.appendChild(side);

    var main=el("div","mail-main");
    function refresh(){var fresh=renderMail(ctx);root.replaceWith(fresh);}
    function renderComposer(replyTo){
      main.replaceChildren();
      var form=el("div","mail-form");
      form.innerHTML="<label>Till <input class='mail-to'></label><label>Ämne <input class='mail-subject'></label><textarea class='mail-body'></textarea><div class='mail-form-actions'><button class='mail-attach'>Bifoga plan.txt</button><span class='mail-attachment'></span><button class='mail-send'>Skicka</button></div>";
      if(replyTo){
        form.querySelector(".mail-to").value=replyTo.from;
        form.querySelector(".mail-subject").value="Sv: "+replyTo.subject;
      }
      var attached=false;
      form.querySelector(".mail-attach").addEventListener("click",function(e){
        e.preventDefault();attached=true;form.querySelector(".mail-attachment").textContent="📎 plan.txt";
        ctx.emit("mail.attachmentAdded",{name:"plan.txt"});
      });
      form.querySelector(".mail-send").addEventListener("click",function(e){
        e.preventDefault();
        var to=form.querySelector(".mail-to").value.trim();
        if(!to)return;
        ctx.emit(replyTo?"mail.replied":"mail.sent",{to:to,attachment:attached});
        form.querySelector(".mail-send").textContent="✓ Skickat";
      });
      main.appendChild(form);
    }
    compose.addEventListener("click",function(){renderComposer(null);ctx.emit("mail.composeOpened",{});});

    var selected=s.inbox.find(function(m){return m.id===s.selectedId;});
    if(!selected){
      main.innerHTML="<div class='mail-empty'><span>✉️</span><h3>Inkorg</h3><p>Välj ett meddelande till vänster.</p></div>";
    } else {
      var message=el("article","mail-message");
      message.innerHTML="<header><div><strong></strong><span></span></div><button class='mail-reply'>Svara</button></header><h2></h2><p></p><div class='mail-actions'></div>";
      message.querySelector("strong").textContent=selected.from;
      message.querySelector("span").textContent=selected.safe?"Känd avsändare":"Okänd avsändare";
      message.querySelector("h2").textContent=selected.subject;
      message.querySelector("p").textContent=selected.body;
      message.querySelector(".mail-reply").addEventListener("click",function(){renderComposer(selected);});
      var actions=message.querySelector(".mail-actions");
      if(selected.attachment){
        var download=el("button","mail-download","📎 "+selected.attachment+" – Ladda ner");
        download.addEventListener("click",function(){
          try{ctx.vfs.createFile("downloads",selected.attachment,"image","");}catch(e){}
          ctx.emit("mail.attachmentDownloaded",{name:selected.attachment});download.textContent="✓ Nedladdad";
        });
        actions.appendChild(download);
      }
      if(!selected.safe){
        var phishing=el("button","mail-phishing","Markera som bluff");
        phishing.addEventListener("click",function(){ctx.emit("mail.phishingIdentified",{id:selected.id});phishing.textContent="✓ Bluff identifierad";});
        actions.appendChild(phishing);
      }
      main.appendChild(message);
    }
    root.appendChild(main);
    return root;
  }

  window.DatorskolanAdvancedApps = {
    renderKeyboard: renderKeyboard,
    renderBrowser: renderBrowser,
    renderMail: renderMail
  };
})();