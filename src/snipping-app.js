(function () {
  "use strict";

  function el(tag,className,text){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(text!==undefined) node.textContent=text;
    return node;
  }

  function ensure(state){
    if(!state.snipping){
      state.snipping={captured:false,saved:false};
    }
    return state.snipping;
  }

  function render(ctx){
    var s=ensure(ctx.state);
    var root=el("div","snipping-app");

    var toolbar=el("div","snipping-toolbar");
    var newButton=el("button","snipping-new");
    newButton.innerHTML=window.DatorskolanWindows11.icon("add",16)+"<span>Nytt</span>";
    var mode=el("button","");
    mode.innerHTML=window.DatorskolanWindows11.icon("crop",16)+"<span>Rektangel</span>";
    var delay=el("button","");
    delay.innerHTML=window.DatorskolanWindows11.icon("timer",16)+"<span>Ingen fördröjning</span>";

    toolbar.appendChild(newButton);
    toolbar.appendChild(mode);
    toolbar.appendChild(delay);

    if(s.captured){
      var save=el("button","snipping-save");
      save.innerHTML=window.DatorskolanWindows11.icon("save",16)+"<span>Spara</span>";
      save.addEventListener("click",function(){
        if(s.saved) return;
        s.saved=true;
        try{ctx.vfs.createFile("pictures","Skärmbild.png","image","");}catch(error){}
        ctx.emit("screenshot.saved",{name:"Skärmbild.png",parentId:"pictures"});
        save.innerHTML=window.DatorskolanWindows11.icon("save",16)+"<span>Sparad</span>";
      });
      toolbar.appendChild(save);
    }

    root.appendChild(toolbar);

    var body=el("div","snipping-body");

    if(!s.captured){
      var intro=el("div","snipping-intro");
      intro.innerHTML="<div class='snipping-scissors'>"+window.DatorskolanWindows11.icon("snipping",44)+"</div><h2>Skärmklippverktyget</h2><p>Klicka Nytt och dra över området du vill fånga.</p>";
      body.appendChild(intro);

      var captureLayer=el("div","snipping-capture-layer");
      captureLayer.hidden=true;
      var selection=el("div","snipping-selection");
      captureLayer.appendChild(selection);
      root.appendChild(captureLayer);

      var drag=null;

      newButton.addEventListener("click",function(){
        captureLayer.hidden=false;
        ctx.emit("screenshot.started",{});
      });

      captureLayer.addEventListener("pointerdown",function(e){
        if(e.button!==0)return;
        var rect=captureLayer.getBoundingClientRect();
        drag={x:e.clientX-rect.left,y:e.clientY-rect.top,id:e.pointerId};
        selection.style.left=drag.x+"px";
        selection.style.top=drag.y+"px";
        selection.style.width="0";
        selection.style.height="0";
        selection.hidden=false;
        captureLayer.setPointerCapture(e.pointerId);
      });

      captureLayer.addEventListener("pointermove",function(e){
        if(!drag||e.pointerId!==drag.id)return;
        var rect=captureLayer.getBoundingClientRect();
        var x=e.clientX-rect.left;
        var y=e.clientY-rect.top;
        var left=Math.min(drag.x,x), top=Math.min(drag.y,y);
        var width=Math.abs(x-drag.x), height=Math.abs(y-drag.y);
        selection.style.left=left+"px";
        selection.style.top=top+"px";
        selection.style.width=width+"px";
        selection.style.height=height+"px";
      });

      captureLayer.addEventListener("pointerup",function(e){
        if(!drag||e.pointerId!==drag.id)return;
        var width=parseFloat(selection.style.width)||0;
        var height=parseFloat(selection.style.height)||0;
        drag=null;
        if(width<30||height<30)return;
        s.captured=true;
        ctx.emit("screenshot.captured",{width:Math.round(width),height:Math.round(height)});
        var fresh=render(ctx);
        root.replaceWith(fresh);
      });
    } else {
      var preview=el("div","snipping-preview");
      preview.innerHTML="<div class='snipping-preview-window'><div class='snipping-preview-bar'></div><div class='snipping-preview-content'>FakeWin-skärmbild</div></div>";
      body.appendChild(preview);
    }

    root.appendChild(body);
    return root;
  }

  window.DatorskolanSnippingApp={render:render};
})();