(function () {
  "use strict";

  function el(tag,className,text){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(text!==undefined) node.textContent=text;
    return node;
  }

  function ensure(state){
    if(!state.troubleDemo){
      state.troubleDemo={
        mode:"error",
        errorOpen:false,
        errorHandled:false,
        frozen:false,
        waited:false,
        closedAfterFreeze:false,
        restarted:false
      };
    }
    return state.troubleDemo;
  }

  function render(ctx){
    var s=ensure(ctx.state);
    var root=el("div","trouble-app");

    if(s.mode==="error"){
      var header=el("div","trouble-header");
      header.innerHTML="<strong>Rapportvisaren</strong><span>Öppna och visa rapportfiler</span>";
      root.appendChild(header);

      var recent=el("section","trouble-recent");
      recent.innerHTML="<h3>Senaste filer</h3>";

      var file=el("button","trouble-file");
      file.type="button";
      file.innerHTML="<span>📄</span><div><strong>rapport.pdf</strong><small>Documents</small></div>";
      file.addEventListener("click",function(){
        s.errorOpen=true;
        ctx.emit("troubleshooting.errorOpened",{code:"FILE_IN_USE"});
        refresh();
      });
      recent.appendChild(file);
      root.appendChild(recent);

      if(s.errorOpen){
        var overlay=el("div","trouble-modal-layer");
        var dialog=el("section","trouble-error-dialog");
        dialog.innerHTML=
          "<div class='trouble-error-icon'>!</div>"+
          "<div class='trouble-error-copy'><h3>Kan inte öppna filen</h3>"+
          "<p>Filen <b>rapport.pdf</b> används av ett annat program.</p>"+
          "<p>Stäng programmet som använder filen och försök sedan igen.</p></div>";

        var actions=el("div","trouble-error-actions");
        var close=el("button","primary","Stäng");
        var retry=el("button","","Försök igen");

        close.addEventListener("click",function(){
          s.errorOpen=false;
          s.errorHandled=true;
          ctx.emit("troubleshooting.errorHandled",{choice:"close",code:"FILE_IN_USE"});
          refresh();
        });

        retry.addEventListener("click",function(){
          ctx.emit("troubleshooting.errorRetried",{code:"FILE_IN_USE"});
          dialog.classList.add("shake");
          setTimeout(function(){dialog.classList.remove("shake");},250);
        });

        actions.appendChild(retry);
        actions.appendChild(close);
        dialog.appendChild(actions);
        overlay.appendChild(dialog);
        root.appendChild(overlay);
      }
    }

    if(s.mode==="frozen"){
      root.classList.add("frozen");
      var frozenHeader=el("div","trouble-header");
      frozenHeader.innerHTML="<strong>Rapportvisaren</strong><span>Bearbetar stor rapport…</span>";
      root.appendChild(frozenHeader);

      var frozenBody=el("div","trouble-frozen-body");
      frozenBody.innerHTML=
        "<div class='trouble-spinner'></div>"+
        "<h3>Öppnar rapport.pdf</h3>"+
        "<p>Programmet svarar inte just nu.</p>"+
        "<small>Windows kan ibland behöva några sekunder innan ett program svarar igen.</small>";
      root.appendChild(frozenBody);
    }

    if(s.mode==="normal"){
      var normal=el("div","trouble-normal");
      normal.innerHTML="<div class='trouble-ok'>✓</div><h2>Rapportvisaren fungerar</h2><p>Programmet har startats om och svarar normalt igen.</p>";
      root.appendChild(normal);
    }

    function refresh(){
      var fresh=render(ctx);
      root.replaceWith(fresh);
    }

    return root;
  }

  window.DatorskolanTroubleApp={render:render};
})();