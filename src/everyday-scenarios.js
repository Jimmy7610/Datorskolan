(function () {
  "use strict";

  var scenarios = [
    {id:"everyday-copy-paste-01",title:"Kopiera text mellan fält",description:"Markera, kopiera och klistra in text.",start:{everydayMode:"copy-paste",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.copyPaste.complete"}},
    {id:"everyday-undo-redo-01",title:"Ångra och gör om",description:"Använd Ctrl+Z och Ctrl+Y.",start:{everydayMode:"undo-redo",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.undoRedo.complete"}},
    {id:"everyday-save-location-01",title:"Hitta nedladdningen",description:"Välj rätt mapp för en nedladdad fil.",start:{everydayMode:"save-location",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.saveLocation.complete"}},
    {id:"everyday-pdf-01",title:"PDF i vardagen",description:"Öppna, zooma och spara en PDF.",start:{everydayMode:"pdf",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.pdf.complete"}},
    {id:"everyday-screenshot-01",title:"Ta skärmdump",description:"Ta och spara en skärmdump.",start:{everydayMode:"screenshot",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.screenshot.complete"}},
    {id:"everyday-zip-01",title:"Packa upp ZIP",description:"Extrahera en komprimerad mapp.",start:{everydayMode:"zip",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.zip.complete"}},
    {id:"everyday-usb-01",title:"USB-minne",description:"Öppna, kopiera och mata ut säkert.",start:{everydayMode:"usb",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.usb.complete"}},
    {id:"everyday-wifi-01",title:"Anslut Wi-Fi",description:"Välj rätt nätverk och anslut.",start:{everydayMode:"wifi",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.wifi.complete"}},
    {id:"everyday-bluetooth-01",title:"Bluetooth",description:"Anslut ett headset.",start:{everydayMode:"bluetooth",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.bluetooth.complete"}},
    {id:"everyday-audio-camera-01",title:"Ljud mikrofon kamera",description:"Ställ in vardagliga mediafunktioner.",start:{everydayMode:"audio-camera",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.audioCamera.complete"}},
    {id:"everyday-install-01",title:"Installera och avinstallera",description:"Installera och ta bort ett program.",start:{everydayMode:"install",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.install.complete"}},
    {id:"everyday-print-pdf-01",title:"Skriv ut till PDF",description:"Välj rätt skrivare.",start:{everydayMode:"print-pdf",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.printPdf.complete"}},
    {id:"everyday-cloud-01",title:"Molnlagring",description:"Flytta en fil till molnet.",start:{everydayMode:"cloud",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.cloud.complete"}},
    {id:"everyday-dialog-01",title:"Dialogrutor",description:"Läs frågan och välj rätt knapp.",start:{everydayMode:"dialogs",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.dialog.complete"}},
    {id:"everyday-error-01",title:"Felmeddelanden",description:"Läs felet och välj säker åtgärd.",start:{everydayMode:"error-message",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.errorRead.complete"}},
    {id:"everyday-restart-01",title:"Starta om och uppdatera",description:"Välj rätt omstartsalternativ.",start:{everydayMode:"restart-update",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.restart.complete"}},
    {id:"everyday-recovery-01",title:"Programmet svarar inte",description:"Lös ett hängt program i trygg ordning.",start:{everydayMode:"recovery",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.recovery.complete"}},
    {id:"everyday-pin-taskbar-01",title:"Fäst program",description:"Fäst Google Chrome i aktivitetsfältet via Start-menyn.",start:{pinnedTaskbar:["explorer"],pinnedStart:["explorer","browser","calculator","notepad","mail"],openApps:[]},fixtures:[],goal:{type:"event",eventType:"shell.taskbarPinned",payload:{appId:"browser"}}},
    {id:"everyday-snap-01",title:"Fönster sida vid sida",description:"Placera två program bredvid varandra.",start:{everydayMode:"snap",openApps:["everyday-lab"]},fixtures:[],goal:{type:"event",eventType:"everyday.snap.complete"}},
    {id:"everyday-link-actions-01",title:"Länkens snabbmeny",description:"Kopiera en länkadress och öppna en länk i ny flik.",start:{browserReset:true,openApps:["browser"]},fixtures:[],goal:{type:"all",goals:[{type:"event-seen",eventType:"browser.linkCopied"},{type:"event-seen",eventType:"browser.linkOpenedInNewTab"}]}}
  ];

  window.DatorskolanScenarios = (window.DatorskolanScenarios || []).concat(scenarios);
})();