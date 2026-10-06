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

    return root;
  }

  window.DatorskolanEverydayApps = {
    render: render
  };
})();