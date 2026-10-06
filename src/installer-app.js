(function () {
  "use strict";

  function el(tag,className,text){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(text!==undefined) node.textContent=text;
    return node;
  }

  function ensure(state){
    if(!state.installer){
      state.installer={step:"welcome",accepted:false,installed:false};
    }
    if(!state.software){
      state.software={exerciseProgramInstalled:false};
    }
    return state.installer;
  }

  function render(ctx){
    var s=ensure(ctx.state);
    var root=el("div","installer-app");

    function refresh(){
      var fresh=render(ctx);
      root.replaceWith(fresh);
    }

    var hero=el("div","installer-hero");
    hero.innerHTML="<div class='installer-logo'>D</div><div><strong>Övningsprogram</strong><small>Installationsguide</small></div>";
    root.appendChild(hero);

    var body=el("div","installer-body");

    if(s.step==="welcome"){
      body.innerHTML="<h2>Välkommen till installationsguiden</h2><p>Guiden installerar Övningsprogram på den här simulerade Windows-datorn.</p><p>Stäng andra program innan du fortsätter om du har osparat arbete.</p>";
    }

    if(s.step==="license"){
      body.innerHTML="<h2>Licensvillkor</h2><div class='installer-license'>Det här är ett simulerat program som endast används i Datorskolan. Ingen riktig programvara installeras på din dator.</div>";
      var check=el("label","installer-check");
      check.innerHTML="<input type='checkbox'> Jag godkänner villkoren";
      var input=check.querySelector("input");
      input.checked=!!s.accepted;
      input.addEventListener("change",function(){s.accepted=input.checked;refresh();});
      body.appendChild(check);
    }

    if(s.step==="location"){
      body.innerHTML="<h2>Installationsplats</h2><p>Programmet installeras i:</p><div class='installer-path'>C:\\Program Files\\Övningsprogram</div><p>För de flesta användare är standardplatsen rätt val.</p>";
    }

    if(s.step==="install"){
      body.innerHTML="<h2>Redo att installera</h2><p>Klicka Installera för att lägga till programmet.</p>";
    }

    if(s.step==="done"){
      body.innerHTML="<h2>Installationen är klar</h2><p>Övningsprogram har installerats och finns nu bland installerade appar.</p>";
    }

    root.appendChild(body);

    var actions=el("div","installer-actions");
    var back=el("button","","Tillbaka");
    var next=el("button","primary","Nästa");

    back.disabled=s.step==="welcome"||s.step==="done";
    back.addEventListener("click",function(){
      if(s.step==="license") s.step="welcome";
      else if(s.step==="location") s.step="license";
      else if(s.step==="install") s.step="location";
      refresh();
    });

    if(s.step==="welcome"){
      next.textContent="Nästa";
      next.addEventListener("click",function(){s.step="license";refresh();});
    } else if(s.step==="license"){
      next.textContent="Nästa";
      next.disabled=!s.accepted;
      next.addEventListener("click",function(){if(s.accepted){s.step="location";refresh();}});
    } else if(s.step==="location"){
      next.textContent="Nästa";
      next.addEventListener("click",function(){s.step="install";refresh();});
    } else if(s.step==="install"){
      next.textContent="Installera";
      next.addEventListener("click",function(){
        s.installed=true;
        ctx.state.software.exerciseProgramInstalled=true;
        s.step="done";
        ctx.emit("software.installed",{appId:"exercise-program",name:"Övningsprogram"});
        refresh();
      });
    } else {
      next.textContent="Slutför";
      next.addEventListener("click",function(){
        ctx.emit("installer.finished",{appId:"exercise-program"});
      });
    }

    actions.appendChild(back);
    actions.appendChild(next);
    root.appendChild(actions);

    return root;
  }

  window.DatorskolanInstallerApp={render:render};
})();