(function () {
  "use strict";

  var more = [
    { id:"keyboard-letters-01", title:"Skriv bokstäver", description:"Skriv ordet dator.", start:{keyboardMode:"letters",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.letters.complete"} },
    { id:"keyboard-numbers-01", title:"Skriv siffror", description:"Skriv 12345.", start:{keyboardMode:"numbers",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.numbers.complete"} },
    { id:"keyboard-editing-01", title:"Redigera text", description:"Använd Mellanslag, Backspace, Delete och Enter.", start:{keyboardMode:"editing",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.editing.complete"} },
    { id:"keyboard-shiftcaps-01", title:"Shift och Caps Lock", description:"Träna versaler.", start:{keyboardMode:"shift-caps",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.shiftcaps.complete"} },
    { id:"keyboard-arrows-01", title:"Piltangenter", description:"Använd alla fyra piltangenter.", start:{keyboardMode:"arrows",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.arrows.complete"} },
    { id:"keyboard-tabesc-01", title:"Tab och Esc", description:"Flytta fokus och stäng.", start:{keyboardMode:"tab-esc",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.tabesc.complete"} },
    { id:"keyboard-modifiers-01", title:"Ctrl Alt Windows", description:"Tryck på modifierartangenterna.", start:{keyboardMode:"modifiers",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.modifiers.complete"} },
    { id:"keyboard-shortcuts-01", title:"Kortkommandon", description:"Använd Ctrl+A, Ctrl+C och Ctrl+V.", start:{keyboardMode:"shortcuts",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.shortcuts.complete"} },
    { id:"keyboard-special-01", title:"Specialtecken", description:"Skriv vanliga specialtecken.", start:{keyboardMode:"special",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.special.complete"} },
    { id:"keyboard-final-01", title:"Tangentbord – slutuppdrag", description:"Kombinera tangentbordsfärdigheter.", start:{keyboardMode:"final",openApps:["keyboard-lab"]}, fixtures:[], goal:{type:"event",eventType:"keyboard.final.complete"} },

    { id:"windows-start-01", title:"Öppna Start", description:"Öppna Start-menyn.", start:{}, fixtures:[], goal:{type:"event",eventType:"startMenu.opened"} },
    { id:"windows-open-app-01", title:"Starta ett program", description:"Öppna Kalkylatorn.", start:{}, fixtures:[], goal:{type:"event",eventType:"app.opened",payload:{appId:"calculator"}} },
    { id:"windows-move-01", title:"Flytta ett fönster", description:"Flytta Kalkylatorns fönster.", start:{openApps:["calculator"]}, fixtures:[], goal:{type:"event",eventType:"window.moved"} },
    { id:"windows-minimize-01", title:"Minimera", description:"Minimera Kalkylatorn.", start:{openApps:["calculator"]}, fixtures:[], goal:{type:"event",eventType:"window.minimized"} },
    { id:"windows-maximize-01", title:"Maximera", description:"Maximera Kalkylatorn.", start:{openApps:["calculator"]}, fixtures:[], goal:{type:"event",eventType:"window.maximized"} },
    { id:"windows-close-01", title:"Stäng ett program", description:"Stäng Kalkylatorn.", start:{openApps:["calculator"]}, fixtures:[], goal:{type:"event",eventType:"window.closed",payload:{appId:"calculator"}} },
    { id:"windows-context-01", title:"Högerklicksmenyn", description:"Öppna en snabbmeny.", start:{}, fixtures:[], goal:{type:"event",eventType:"contextMenu.opened"} },
    { id:"windows-final-01", title:"Windows – slutuppdrag", description:"Öppna Start, starta Kalkylatorn och hantera fönstret.", start:{}, fixtures:[], goal:{type:"all",goals:[
      {type:"event-seen",eventType:"startMenu.opened"},
      {type:"event-seen",eventType:"app.opened",payload:{appId:"calculator"}},
      {type:"event-seen",eventType:"window.moved"},
      {type:"event-seen",eventType:"window.minimized"},
      {type:"event-seen",eventType:"window.restored"},
      {type:"event-seen",eventType:"window.maximized"},
      {type:"event-seen",eventType:"window.closed",payload:{appId:"calculator"}}
    ]} },

    { id:"files-rename-01", title:"Byt namn på en fil", description:"Byt namn på Utkast.txt till Rapport.txt.", start:{explorerFolderId:"documents",openApps:["explorer"]}, fixtures:[{kind:"file",parentId:"documents",name:"Utkast.txt",fileType:"text",content:"Övning"}], goal:{type:"event",eventType:"file.renamed",payload:{name:"Rapport.txt"}} },
    { id:"files-copy-01", title:"Kopiera en fil", description:"Kopiera Exempel.txt.", start:{explorerFolderId:"documents",openApps:["explorer"]}, fixtures:[{kind:"file",parentId:"documents",name:"Exempel.txt",fileType:"text",content:"Kopiera mig"}], goal:{type:"event",eventType:"file.copied"} },
    { id:"files-move-01", title:"Flytta en fil", description:"Flytta Flytta mig.txt till Downloads.", start:{explorerFolderId:"documents",openApps:["explorer"]}, fixtures:[{kind:"file",parentId:"documents",name:"Flytta mig.txt",fileType:"text",content:"Flytta mig"}], goal:{type:"event",eventType:"file.moved"} },
    { id:"files-delete-01", title:"Radera och återställ", description:"Radera och återställ en fil.", start:{explorerFolderId:"documents",openApps:["explorer"]}, fixtures:[{kind:"file",parentId:"documents",name:"Återställ mig.txt",fileType:"text",content:"Test"}], goal:{type:"event",eventType:"recycleBin.restored"} },
    { id:"files-saveas-01", title:"Spara som", description:"Spara en ny textfil.", start:{openApps:["notepad"]}, fixtures:[], goal:{type:"event",eventType:"notepad.saved"} },
    { id:"files-final-01", title:"Filer – slutuppdrag", description:"Skapa, döp om, flytta och återställ filer.", start:{explorerFolderId:"documents",openApps:["explorer"]}, fixtures:[{kind:"file",parentId:"documents",name:"Projekt.txt",fileType:"text",content:"Projekt"}], goal:{type:"all",goals:[
      {type:"event-seen",eventType:"folder.created"},
      {type:"event-seen",eventType:"file.renamed"},
      {type:"event-seen",eventType:"file.moved"},
      {type:"event-seen",eventType:"file.deleted"},
      {type:"event-seen",eventType:"recycleBin.restored"}
    ]} },

    { id:"internet-address-01", title:"Adressfältet", description:"Skriv en adress och gå till sidan.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.addressUsed"} },
    { id:"internet-link-01", title:"Länkar", description:"Öppna en länk.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.linkOpened"} },
    { id:"internet-tab-01", title:"Ny flik", description:"Öppna en ny flik.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.tabOpened"} },
    { id:"internet-history-01", title:"Bakåt och framåt", description:"Använd både Bakåt och Framåt.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"all",goals:[{type:"event-seen",eventType:"browser.back"},{type:"event-seen",eventType:"browser.forward"}]} },
    { id:"internet-download-01", title:"Ladda ner", description:"Ladda ner guide.txt.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.downloaded"} },
    { id:"internet-form-01", title:"Formulär", description:"Fyll i och skicka formuläret.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.formSubmitted"} },
    { id:"internet-zoom-01", title:"Zoom", description:"Ändra zoomnivån.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.zoomChanged"} },
    { id:"internet-final-01", title:"Internet – slutuppdrag", description:"Navigera, använd flik, länk, historik och nedladdning.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"all",goals:[
      {type:"event-seen",eventType:"browser.addressUsed"},
      {type:"event-seen",eventType:"browser.linkOpened"},
      {type:"event-seen",eventType:"browser.tabOpened"},
      {type:"event-seen",eventType:"browser.downloaded"}
    ]} },

    { id:"mail-open-01", title:"Öppna ett mejl", description:"Öppna ett meddelande.", start:{mailReset:true,openApps:["mail"]}, fixtures:[], goal:{type:"event",eventType:"mail.opened"} },
    { id:"mail-reply-01", title:"Svara på mejl", description:"Öppna och svara på ett mejl.", start:{mailReset:true,openApps:["mail"]}, fixtures:[], goal:{type:"event",eventType:"mail.replied"} },
    { id:"mail-new-01", title:"Nytt mejl", description:"Skriv och skicka ett nytt meddelande.", start:{mailReset:true,openApps:["mail"]}, fixtures:[], goal:{type:"event",eventType:"mail.sent"} },
    { id:"mail-attach-01", title:"Bifoga fil", description:"Bifoga en virtuell fil.", start:{mailReset:true,openApps:["mail"]}, fixtures:[{kind:"file",parentId:"documents",name:"plan.txt",fileType:"text",content:"Plan"}], goal:{type:"event",eventType:"mail.attachmentAdded"} },
    { id:"mail-download-01", title:"Ladda ner bilaga", description:"Ladda ner Annas bilaga.", start:{mailReset:true,openApps:["mail"]}, fixtures:[], goal:{type:"event",eventType:"mail.attachmentDownloaded"} },
    { id:"security-phishing-01", title:"Känn igen bluffmejl", description:"Identifiera bluffmeddelandet.", start:{mailReset:true,openApps:["mail"]}, fixtures:[], goal:{type:"event",eventType:"mail.phishingIdentified"} },
    { id:"mail-final-01", title:"E-post – slutuppdrag", description:"Öppna, ladda ner bilaga, svara och skicka med bilaga.", start:{mailReset:true,openApps:["mail"]}, fixtures:[{kind:"file",parentId:"documents",name:"plan.txt",fileType:"text",content:"Plan"}], goal:{type:"all",goals:[
      {type:"event-seen",eventType:"mail.opened"},
      {type:"event-seen",eventType:"mail.attachmentDownloaded"},
      {type:"event-seen",eventType:"mail.attachmentAdded"},
      {type:"event-seen",eventType:"mail.replied"}
    ]} },

    { id:"windows-resize-01", title:"Ändra fönsterstorlek", description:"Ändra storleken på Kalkylatorns fönster.", start:{openApps:["calculator"]}, fixtures:[], goal:{type:"event",eventType:"window.resized"} },
    { id:"windows-switch-01", title:"Växla mellan program", description:"Använd Alt+Tab för att växla mellan två öppna program.", start:{openApps:["calculator","notepad"]}, fixtures:[], goal:{type:"event",eventType:"window.switched"} },

    { id:"files-search-01", title:"Sök efter fil", description:"Sök efter Hitta mig.txt.", start:{explorerFolderId:"documents",openApps:["explorer"]}, fixtures:[{kind:"file",parentId:"documents",name:"Hitta mig.txt",fileType:"text",content:"Här är jag"}], goal:{type:"event",eventType:"file.search",payload:{query:"Hitta"}} },

    { id:"internet-bookmark-01", title:"Bokmärke", description:"Spara den aktuella sidan som bokmärke.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.bookmarked"} },
    { id:"internet-cookie-01", title:"Cookies", description:"Hantera cookie-dialogen.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.cookieAccepted"} },
    { id:"internet-upload-01", title:"Ladda upp fil", description:"Välj en virtuell fil i formuläret.", start:{browserReset:true,openApps:["browser"]}, fixtures:[{kind:"file",parentId:"documents",name:"profil.txt",fileType:"text",content:"Profil"}], goal:{type:"event",eventType:"browser.uploaded"} },

    { id:"mail-forward-01", title:"Vidarebefordra mejl", description:"Vidarebefordra ett meddelande och skicka det.", start:{mailReset:true,openApps:["mail"]}, fixtures:[], goal:{type:"event",eventType:"mail.forwarded"} },

    { id:"windows-search-01", title:"Sök i Start", description:"Sök efter Kalkylatorn i Start-menyn.", start:{}, fixtures:[], goal:{type:"event",eventType:"startMenu.searched",payload:{query:"Kalkylator"}} },
    { id:"files-drag-01", title:"Dra fil till annan mapp", description:"Dra Dra mig.txt till Downloads.", start:{explorerFolderId:"documents",openApps:["explorer"]}, fixtures:[{kind:"file",parentId:"documents",name:"Dra mig.txt",fileType:"text",content:"Dra mig"}], goal:{type:"event",eventType:"file.moved",payload:{via:"drag-drop"}} },
    { id:"internet-refresh-01", title:"Uppdatera sida", description:"Uppdatera den aktuella webbsidan.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"event",eventType:"browser.refreshed"} },
    { id:"internet-close-tab-01", title:"Stäng flik", description:"Öppna och stäng en extra flik.", start:{browserReset:true,openApps:["browser"]}, fixtures:[], goal:{type:"all",goals:[{type:"event-seen",eventType:"browser.tabOpened"},{type:"event-seen",eventType:"browser.tabClosed"}]} },

    { id:"final-independent-01", title:"Självständighetsprov", description:"Kombinera webbläsare, filer och e-post.", start:{browserReset:true,mailReset:true,openApps:["browser"]}, fixtures:[{kind:"file",parentId:"documents",name:"plan.txt",fileType:"text",content:"Min plan"}], goal:{type:"all",goals:[
      {type:"event-seen",eventType:"browser.downloaded"},
      {type:"event-seen",eventType:"file.renamed"},
      {type:"event-seen",eventType:"mail.attachmentAdded"},
      {type:"event-seen",eventType:"mail.sent"}
    ]} }
  ];

  window.DatorskolanScenarios = (window.DatorskolanScenarios || []).concat(more);
})();