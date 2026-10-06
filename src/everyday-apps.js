(function () {
  "use strict";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function ensure(state) {
    if (!state.everydayLab) {
      state.everydayLab = {
        mode: "copy-paste",
        completed: false,
        flags: {}
      };
    }
    return state.everydayLab;
  }

  function render(ctx) {
    var state = ensure(ctx.state);
    var mode = state.mode || "copy-paste";
    var root = el("div","everyday-lab");
    var head = el("div","everyday-lab-head");
    head.innerHTML = "<div><span>🧰</span><strong>Vardagsdatorn</strong></div><em></em>";
    head.querySelector("em").textContent = state.completed ? "✓ Klar" : "Träningsyta";
    root.appendChild(head);

    var stage = el("div","everyday-stage");
    root.appendChild(stage);

    function title(main, sub) {
      var copy = el("div","everyday-copy");
      copy.innerHTML = "<h3></h3><p></p>";
      copy.querySelector("h3").textContent = main;
      copy.querySelector("p").textContent = sub;
      stage.appendChild(copy);
    }

    function complete(type, payload) {
      if (state.completed) return;
      state.completed = true;
      head.querySelector("em").textContent = "✓ Klar";
      ctx.emit(type, payload || {});
    }

    function checklist(items) {
      var box = el("div","everyday-checklist");
      items.forEach(function (item) {
        var chip = el("span","");
        chip.dataset.key = item[0];
        chip.textContent = item[1];
        box.appendChild(chip);
      });
      stage.appendChild(box);
      return box;
    }

    function mark(box, key) {
      var chip = box.querySelector("[data-key='"+key+"']");
      if (chip) chip.classList.add("done");
    }

    if (mode === "copy-paste") {
      title("Kopiera och klistra text","Markera texten, kopiera den och klistra in den i den tomma rutan.");
      var source = el("textarea","everyday-textarea");
      source.value = "Telefon: 070-123 45 67";
      var target = el("textarea","everyday-textarea");
      target.placeholder = "Klistra in här";
      var box = checklist([["select","Markera"],["copy","Kopiera"],["paste","Klistra in"]]);
      stage.appendChild(source);
      stage.appendChild(target);
      source.addEventListener("select",function(){
        if(source.selectionStart !== source.selectionEnd){state.flags.select=true;mark(box,"select");}
      });
      source.addEventListener("copy",function(){state.flags.copy=true;mark(box,"copy");});
      target.addEventListener("paste",function(){
        state.flags.paste=true;mark(box,"paste");
        setTimeout(function(){
          if(state.flags.select&&state.flags.copy&&target.value.indexOf("070-123 45 67")>=0){
            complete("everyday.copyPaste.complete",{});
          }
        },0);
      });
    }

    if (mode === "undo-redo") {
      title("Ångra och gör om","Skriv något, ångra med Ctrl+Z och gör sedan om med Ctrl+Y.");
      var editor = el("textarea","everyday-textarea");
      editor.placeholder = "Skriv några ord här...";
      stage.appendChild(editor);
      var undoBox = checklist([["type","Skriv text"],["undo","Ctrl+Z"],["redo","Ctrl+Y"]]);
      editor.addEventListener("input",function(){ if(editor.value){state.flags.type=true;mark(undoBox,"type");} });
      editor.addEventListener("keydown",function(e){
        if(e.ctrlKey && e.key.toLowerCase()==="z"){state.flags.undo=true;mark(undoBox,"undo");}
        if(e.ctrlKey && e.key.toLowerCase()==="y"){state.flags.redo=true;mark(undoBox,"redo");}
        if(state.flags.type&&state.flags.undo&&state.flags.redo) complete("everyday.undoRedo.complete",{});
      });
      setTimeout(function(){editor.focus();},0);
    }

    if (mode === "save-location") {
      title("Var hamnar filen?","Välj rätt mapp för ett nedladdat dokument.");
      var choices = el("div","everyday-choice-grid");
      [
        ["documents","Documents"],
        ["downloads","Downloads"],
        ["pictures","Pictures"]
      ].forEach(function(item){
        var b=el("button","",item[1]);
        b.addEventListener("click",function(){
          if(item[0]==="downloads"){
            b.classList.add("correct");
            complete("everyday.saveLocation.complete",{folder:"downloads"});
          } else {
            b.classList.add("wrong");
          }
        });
        choices.appendChild(b);
      });
      stage.appendChild(choices);
    }

    if (mode === "screenshot") {
      title("Skärmdump","Ta en simulerad skärmdump och spara den.");
      var preview=el("div","everyday-screen-preview","Det här området ska fångas");
      var snap=el("button","everyday-primary","Ta skärmdump");
      var save=el("button","everyday-secondary","Spara bild");
      save.disabled=true;
      stage.appendChild(preview);stage.appendChild(snap);stage.appendChild(save);
      snap.addEventListener("click",function(){state.flags.snap=true;preview.classList.add("captured");save.disabled=false;});
      save.addEventListener("click",function(){if(state.flags.snap)complete("everyday.screenshot.complete",{name:"Skärmbild.png"});});
    }

    if (mode === "zip") {
      title("ZIP och komprimerade mappar","Packa upp filerna innan du försöker använda dem.");
      var zip=el("div","everyday-file-card","🗜️ Bilder.zip");
      var extract=el("button","everyday-primary","Extrahera alla");
      var result=el("div","everyday-result","");
      stage.appendChild(zip);stage.appendChild(extract);stage.appendChild(result);
      extract.addEventListener("click",function(){
        result.textContent="📁 Bilder  →  🖼️ foto1.jpg  🖼️ foto2.jpg";
        complete("everyday.zip.complete",{});
      });
    }

    if (mode === "cloud") {
      title("Molnlagring","Flytta dokumentet till den simulerade molnmappen.");
      var cloud=el("div","everyday-cloud");
      cloud.innerHTML="<div>💻 På den här datorn<br><button data-a='local'>rapport.docx</button></div><div>☁️ Molnet<br><div class='cloud-target'>Släpp här</div></div>";
      stage.appendChild(cloud);
      cloud.querySelector("[data-a=local]").addEventListener("click",function(){state.flags.selected=true;});
      cloud.querySelector(".cloud-target").addEventListener("click",function(){
        if(!state.flags.selected)return;
        this.textContent="✅ rapport.docx synkroniserad";
        complete("everyday.cloud.complete",{});
      });
    }

    if (mode === "dialogs") {
      title("Vanliga dialogrutor","Läs frågan innan du väljer knapp.");
      var dialog=el("div","everyday-dialog");
      dialog.innerHTML="<strong>Spara ändringar?</strong><p>Du har ändringar som inte är sparade.</p><div><button data-a='discard'>Spara inte</button><button data-a='cancel'>Avbryt</button><button data-a='save'>Spara</button></div>";
      stage.appendChild(dialog);
      dialog.querySelector("[data-a=save]").addEventListener("click",function(){complete("everyday.dialog.complete",{choice:"save"});});
    }

    if (mode === "error-message") {
      title("Läs felmeddelandet","Läs vad som står och välj den säkra åtgärden.");
      var error=el("div","everyday-error");
      error.innerHTML="<strong>Kan inte öppna filen</strong><p>Filen rapport.pdf används av ett annat program. Stäng programmet och försök igen.</p><div><button data-a='delete'>Ta bort fil</button><button data-a='retry'>Försök igen senare</button></div>";
      stage.appendChild(error);
      error.querySelector("[data-a=retry]").addEventListener("click",function(){complete("everyday.errorRead.complete",{});});
    }

    if (mode === "recovery") {
      title("När ett program hängt sig","Prova den säkra ordningen innan du ger upp.");
      var recoveryBox=checklist([["wait","Vänta"],["close","Försök stänga"],["restart","Starta om programmet"]]);
      var actions=el("div","everyday-action-row");
      [["wait","Vänta några sekunder"],["close","Stäng programmet"],["restart","Starta programmet igen"]].forEach(function(item){
        var b=el("button","",item[1]);
        b.addEventListener("click",function(){
          if(item[0]==="close"&&!state.flags.wait)return;
          if(item[0]==="restart"&&!state.flags.close)return;
          state.flags[item[0]]=true;mark(recoveryBox,item[0]);
          if(state.flags.wait&&state.flags.close&&state.flags.restart) complete("everyday.recovery.complete",{});
        });
        actions.appendChild(b);
      });
      stage.appendChild(actions);
    }

    return root;
  }

  window.DatorskolanEverydayApps = {
    render: render
  };
})();