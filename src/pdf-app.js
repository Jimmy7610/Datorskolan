(function () {
  "use strict";

  function el(tag,className,text){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(text!==undefined) node.textContent=text;
    return node;
  }

  function ensure(state){
    if(!state.pdfViewer){
      state.pdfViewer={
        fileName:"faktura.pdf",
        zoom:100,
        savedCopy:false,
        printOpen:false,
        printer:""
      };
    }
    return state.pdfViewer;
  }

  function render(ctx){
    var s=ensure(ctx.state);
    var root=el("div","pdf-app");

    function refresh(){
      var fresh=render(ctx);
      root.replaceWith(fresh);
    }

    var toolbar=el("div","pdf-toolbar-real");

    var fileLabel=el("div","pdf-file-label");
    fileLabel.innerHTML='<span>'+window.DatorskolanWindows11.icon("pdf",20)+'</span><strong></strong>';
    fileLabel.querySelector("strong").textContent=s.fileName;

    var tools=el("div","pdf-tools");

    var minus=el("button","","−");
    var zoom=el("span","pdf-zoom",s.zoom+"%");
    var plus=el("button","","+");
    var save=el("button","","Spara en kopia");
    var print=el("button","","Skriv ut");

    minus.addEventListener("click",function(){
      s.zoom=Math.max(50,s.zoom-10);
      ctx.emit("pdf.zoomChanged",{zoom:s.zoom});
      refresh();
    });
    plus.addEventListener("click",function(){
      s.zoom=Math.min(200,s.zoom+10);
      ctx.emit("pdf.zoomChanged",{zoom:s.zoom});
      refresh();
    });
    save.addEventListener("click",function(){
      s.savedCopy=true;
      try{ctx.vfs.createFile("documents","faktura-kopia.pdf","pdf","");}catch(error){}
      ctx.emit("pdf.savedCopy",{name:"faktura-kopia.pdf"});
      save.textContent="✓ Sparad kopia";
    });
    print.addEventListener("click",function(){
      s.printOpen=true;
      ctx.emit("print.dialogOpened",{source:"pdf"});
      refresh();
    });

    tools.appendChild(minus);
    tools.appendChild(zoom);
    tools.appendChild(plus);
    tools.appendChild(save);
    tools.appendChild(print);

    toolbar.appendChild(fileLabel);
    toolbar.appendChild(tools);
    root.appendChild(toolbar);

    var workspace=el("div","pdf-workspace");
    var page=el("article","pdf-real-page");
    page.style.transform="scale("+(s.zoom/100)+")";
    page.innerHTML=
      "<header><strong>FAKTURA</strong><span>Nr 2026-1042</span></header>"+
      "<section><p><b>Till:</b> Exempelkund</p><p><b>Förfallodatum:</b> 2026-10-30</p></section>"+
      "<table><tr><th>Beskrivning</th><th>Belopp</th></tr><tr><td>Övningstjänst</td><td>495 kr</td></tr></table>"+
      "<footer>Det här är en simulerad PDF för Datorskolan.</footer>";
    workspace.appendChild(page);
    root.appendChild(workspace);

    if(s.printOpen){
      var overlay=el("div","print-overlay");
      var dialog=el("section","print-dialog-real");
      dialog.innerHTML="<header><h2>Skriv ut</h2><button class='print-close' aria-label='Stäng'>×</button></header>";

      var body=el("div","print-dialog-body");
      var preview=el("div","print-preview","FAKTURA\n\n495 kr");

      var options=el("div","print-options");
      var label=el("label","","Skrivare");
      var select=el("select","print-printer");
      ["Välj skrivare","Microsoft Print to PDF","Kontorsskrivare"].forEach(function(name){
        var option=el("option","",name);
        option.value=name;
        select.appendChild(option);
      });
      select.value=s.printer||"Välj skrivare";
      label.appendChild(select);

      var orientation=el("label","","Orientering");
      var orientSelect=el("select","");
      ["Stående","Liggande"].forEach(function(name){
        var option=el("option","",name);option.value=name;orientSelect.appendChild(option);
      });
      orientation.appendChild(orientSelect);

      var copies=el("label","","Kopior");
      var copiesInput=el("input","");
      copiesInput.type="number";copiesInput.min="1";copiesInput.value="1";
      copies.appendChild(copiesInput);

      var actions=el("div","print-actions");
      var cancel=el("button","","Avbryt");
      var doPrint=el("button","primary","Skriv ut");

      cancel.addEventListener("click",function(){s.printOpen=false;refresh();});
      dialog.querySelector(".print-close").addEventListener("click",function(){s.printOpen=false;refresh();});
      select.addEventListener("change",function(){s.printer=select.value;});

      doPrint.addEventListener("click",function(){
        if(select.value!=="Microsoft Print to PDF"){
          select.classList.add("invalid");
          return;
        }
        s.printer=select.value;
        s.printOpen=false;
        try{ctx.vfs.createFile("documents","utskrift.pdf","pdf","");}catch(error){}
        ctx.emit("print.pdfCreated",{name:"utskrift.pdf",printer:"Microsoft Print to PDF"});
        refresh();
      });

      actions.appendChild(cancel);
      actions.appendChild(doPrint);

      options.appendChild(label);
      options.appendChild(orientation);
      options.appendChild(copies);
      options.appendChild(actions);

      body.appendChild(preview);
      body.appendChild(options);
      dialog.appendChild(body);
      overlay.appendChild(dialog);
      root.appendChild(overlay);
    }

    return root;
  }

  window.DatorskolanPdfApp={render:render};
})();