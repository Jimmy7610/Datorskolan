(function () {
  "use strict";

  function el(tag,className,text){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(text!==undefined) node.textContent=text;
    return node;
  }

  function ensure(state){
    if(!state.settings){
      state.settings={
        page:"system",
        wifiEnabled:true,
        wifiNetwork:null,
        bluetoothEnabled:true,
        bluetoothDevice:null,
        volume:20,
        microphone:false,
        camera:false,
        updatePending:true
      };
    }
    return state.settings;
  }

  function render(ctx){
    var s=ensure(ctx.state);
    var root=el("div","settings-app");

    function refresh(){
      var fresh=render(ctx);
      root.replaceWith(fresh);
    }

    var sidebar=el("aside","settings-sidebar");

    var profile=el("div","settings-profile");
    profile.innerHTML="<span>J</span><div><strong>Jimmy</strong><small>Lokalt konto</small></div>";
    sidebar.appendChild(profile);

    var search=el("input","settings-search");
    search.type="search";
    search.placeholder="Sök efter en inställning";
    sidebar.appendChild(search);

    [
      ["system","System","🖥"],
      ["bluetooth","Bluetooth och enheter","⌁"],
      ["network","Nätverk och internet","◉"],
      ["apps","Appar","▦"],
      ["privacy","Sekretess och säkerhet","⌾"],
      ["update","Windows Update","↻"]
    ].forEach(function(item){
      var b=el("button","settings-nav"+(s.page===item[0]?" active":""));
      b.type="button";
      b.innerHTML="<span>"+item[2]+"</span><strong></strong>";
      b.querySelector("strong").textContent=item[1];
      b.addEventListener("click",function(){s.page=item[0];refresh();});
      sidebar.appendChild(b);
    });

    root.appendChild(sidebar);

    var main=el("main","settings-main");

    function header(title,sub){
      var h=el("div","settings-heading");
      h.innerHTML="<h2></h2><p></p>";
      h.querySelector("h2").textContent=title;
      h.querySelector("p").textContent=sub||"";
      main.appendChild(h);
    }

    function card(title,description){
      var c=el("section","settings-card");
      c.innerHTML="<div><strong></strong><p></p></div>";
      c.querySelector("strong").textContent=title;
      c.querySelector("p").textContent=description||"";
      main.appendChild(c);
      return c;
    }

    if(s.page==="system"){
      header("System","Bildskärm, ljud, aviseringar och ström.");

      var sound=card("Ljud","Volym och enheter för in- och utmatning.");
      var soundBody=el("div","settings-card-body settings-audio");
      soundBody.innerHTML=
        "<label>Volym <input type='range' min='0' max='100'></label>"+
        "<label><input type='checkbox' data-k='microphone'> Mikrofon tillåten</label>"+
        "<label><input type='checkbox' data-k='camera'> Kamera tillåten</label>";
      var volume=soundBody.querySelector("input[type=range]");
      var mic=soundBody.querySelector("[data-k=microphone]");
      var cam=soundBody.querySelector("[data-k=camera]");
      volume.value=String(s.volume);
      mic.checked=!!s.microphone;
      cam.checked=!!s.camera;

      function updateMedia(){
        s.volume=Number(volume.value);
        s.microphone=mic.checked;
        s.camera=cam.checked;
        if(s.volume>=40&&s.microphone&&s.camera){
          ctx.emit("settings.audioConfigured",{volume:s.volume,microphone:true,camera:true});
        }
      }

      volume.addEventListener("input",updateMedia);
      mic.addEventListener("change",updateMedia);
      cam.addEventListener("change",updateMedia);
      sound.appendChild(soundBody);

      var storage=card("Lagring","Se hur mycket utrymme appar, dokument och temporära filer använder.");
      storage.classList.add("settings-passive");

      var power=card("Ström och batteri","Batterinivå, energiläge och skärmavstängning.");
      power.classList.add("settings-passive");
    }

    if(s.page==="network"){
      header("Nätverk och internet","Wi‑Fi, Ethernet, VPN och mobildelning.");

      var wifi=card("Wi‑Fi",s.wifiEnabled?"På":"Av");
      var toggle=el("button","settings-toggle"+(s.wifiEnabled?" on":""));
      toggle.type="button";
      toggle.setAttribute("aria-label","Wi-Fi");
      toggle.addEventListener("click",function(){s.wifiEnabled=!s.wifiEnabled;refresh();});
      wifi.appendChild(toggle);

      if(s.wifiEnabled){
        var list=el("div","settings-network-list");
        [
          ["HemmaNet","Säkert"],
          ["Grannens WiFi","Säkert"],
          ["Free_Public","Öppet"]
        ].forEach(function(item){
          var row=el("div","settings-network-row");
          row.innerHTML="<div><strong></strong><small></small></div>";
          row.querySelector("strong").textContent=item[0];
          row.querySelector("small").textContent=item[1];

          if(s.wifiNetwork===item[0]){
            var connected=el("span","settings-connected","Ansluten");
            row.appendChild(connected);
          } else {
            var connect=el("button","settings-connect","Anslut");
            connect.type="button";
            connect.addEventListener("click",function(){
              if(item[0]!=="HemmaNet"){
                row.classList.add("warning");
                return;
              }

              var form=el("div","settings-password-box");
              var input=el("input","");
              input.type="password";
              input.placeholder="Ange nätverkssäkerhetsnyckeln";
              var ok=el("button","","Nästa");
              ok.type="button";

              ok.addEventListener("click",function(){
                if(input.value==="datorskolan"){
                  s.wifiNetwork="HemmaNet";
                  ctx.emit("settings.wifiConnected",{network:"HemmaNet"});
                  refresh();
                } else {
                  input.classList.add("invalid");
                }
              });

              form.appendChild(input);
              form.appendChild(ok);
              row.appendChild(form);
              input.focus();
            });
            row.appendChild(connect);
          }

          list.appendChild(row);
        });
        main.appendChild(list);
      }
    }

    if(s.page==="bluetooth"){
      header("Bluetooth och enheter","Enheter, skrivare, mus och Bluetooth.");

      var bluetooth=card("Bluetooth",s.bluetoothEnabled?"På":"Av");
      var btToggle=el("button","settings-toggle"+(s.bluetoothEnabled?" on":""));
      btToggle.type="button";
      btToggle.addEventListener("click",function(){s.bluetoothEnabled=!s.bluetoothEnabled;refresh();});
      bluetooth.appendChild(btToggle);

      var add=el("button","settings-add-device","+ Lägg till enhet");
      add.type="button";
      add.disabled=!s.bluetoothEnabled;
      main.appendChild(add);

      var devices=el("div","settings-device-list");
      if(s.bluetoothDevice){
        var connected=el("div","settings-device-row","🎧 "+s.bluetoothDevice+"  •  Ansluten");
        devices.appendChild(connected);
      }

      add.addEventListener("click",function(){
        var chooser=el("div","settings-device-chooser");
        chooser.innerHTML="<strong>Lägg till en enhet</strong><p>Se till att enheten är påslagen och kan identifieras.</p>";
        var headset=el("button","","🎧 Headset");
        headset.type="button";
        headset.addEventListener("click",function(){
          s.bluetoothDevice="Headset";
          ctx.emit("settings.bluetoothPaired",{device:"Headset"});
          refresh();
        });
        chooser.appendChild(headset);
        main.appendChild(chooser);
      });

      main.appendChild(devices);
    }

    if(s.page==="apps"){
      header("Appar","Installerade appar och standardappar.");
      var installed=card("Installerade appar","Hantera appar som finns på datorn.");
      installed.classList.add("settings-passive");
      var defaults=card("Standardappar","Välj vilket program som öppnar olika filtyper.");
      defaults.classList.add("settings-passive");
    }

    if(s.page==="privacy"){
      header("Sekretess och säkerhet","Behörigheter, Windows-säkerhet och enhetsskydd.");
      var permissions=card("Appbehörigheter","Hantera åtkomst till kamera, mikrofon och andra funktioner.");
      permissions.classList.add("settings-passive");
    }

    if(s.page==="update"){
      header("Windows Update","Håll datorn säker och uppdaterad.");

      var update=card("En uppdatering väntar på omstart","Spara ditt arbete innan du startar om.");
      update.classList.add("settings-update-card");

      var restart=el("button","settings-restart","Starta om nu");
      restart.type="button";
      restart.disabled=!s.updatePending;
      restart.addEventListener("click",function(){
        if(!s.updatePending) return;
        s.updatePending=false;
        ctx.emit("settings.updateRestarted",{});
        restart.textContent="✓ Uppdateringen installerad";
        restart.disabled=true;
      });
      update.appendChild(restart);
    }

    root.appendChild(main);
    return root;
  }

  window.DatorskolanSettingsApp={
    render:render
  };
})();