(function () {
  "use strict";

  function basic(id, moduleId, title, summary, skill, text) {
    return {
      id:id,
      moduleId:moduleId,
      title:title,
      summary:summary,
      skills:[skill],
      audience:["child","standard","fast"],
      steps:[
        {type:"instruction",title:title,text:text},
        {type:"completion",title:"Klart",text:"Du har gått igenom grunden."}
      ]
    };
  }

  function interactive(id, moduleId, title, summary, skills, scenarioId, exerciseText, hints, visualTarget) {
    return {
      id:id,
      moduleId:moduleId,
      title:title,
      summary:summary,
      skills:skills,
      audience:["child","standard","fast"],
      scenarioId:scenarioId,
      steps:[
        {
          type:"instruction",
          title:title,
          text:summary
        },
        {
          type:"exercise",
          title:"Din tur",
          text:exerciseText,
          validator:{type:"scenario-complete"},
          hints:hints || [
            "Läs uppgiften en gång till.",
            "Titta på den del av träningsytan som hör till uppgiften.",
            "Gör ett steg i taget.",
            "Det relevanta området markeras nu.",
            exerciseText
          ],
          visualTarget:visualTarget || null
        },
        {
          type:"completion",
          title:"Klart",
          text:"Du klarade den här färdigheten."
        }
      ]
    };
  }

  var lessons = [
    basic("basics-001-computer","basics","Vad är en dator?","Lär känna dator, skärm, mus och tangentbord.","basics.computer","Datorn är maskinen som kör programmen. Skärmen visar vad som händer. Mus och tangentbord används för att styra."),
    basic("basics-002-power","basics","Ström och laddning","Förstå av/på-knapp, laddare och batteri.","basics.power","En bärbar dator behöver laddas. Av/på-knappen startar datorn och en laddare ger ström och laddar batteriet."),
    basic("basics-003-audio-usb","basics","USB och ljud","Lär dig vad USB, högtalare och hörlurar är.","basics.connections","USB används för att ansluta tillbehör och lagring. Högtalare och hörlurar används för ljud."),
    basic("basics-004-internet","basics","Datorn är inte internet","Förstå skillnaden mellan dator, internet och webbläsare.","basics.internet","Datorn är själva enheten. Internet är nätverket. Webbläsaren är ett program som använder internet för att visa webbsidor."),

    interactive("keyboard-001-letters","keyboard","Bokstäver","Skriv vanliga bokstäver.","keyboard.letters".split(" "),"keyboard-letters-01","Skriv ordet dator.","Skriv lugnt en bokstav i taget.".split("|"),".keyboard-input"),
    interactive("keyboard-002-numbers","keyboard","Siffror","Skriv siffror från sifferraden.",["keyboard.numbers"],"keyboard-numbers-01","Skriv 12345.",["Leta efter sifferraden ovanför bokstäverna.","Skriv en siffra i taget.","Fortsätt tills du har 12345.","Skriv i det markerade fältet.","Skriv exakt: 12345."],".keyboard-input"),
    interactive("keyboard-003-editing","keyboard","Mellanslag, Enter, Backspace och Delete","Lär dig de viktigaste redigeringstangenterna.",["keyboard.space","keyboard.enter","keyboard.backspace","keyboard.delete"],"keyboard-editing-01","Använd alla fyra tangenterna minst en gång.",["Börja med Mellanslag.","Prova sedan Backspace.","Använd Delete och Enter också.","Checklistan visar vad som återstår.","Tryck Mellanslag, Backspace, Delete och Enter."],".keyboard-checklist"),
    interactive("keyboard-004-shiftcaps","keyboard","Shift och Caps Lock","Skriv versaler på två olika sätt.",["keyboard.shift","keyboard.capslock"],"keyboard-shiftcaps-01","Gör en stor bokstav med Shift och använd sedan Caps Lock.",["Håll Shift samtidigt som du trycker en bokstav.","Caps Lock är en egen tangent.","Du behöver använda båda.","Träningsytan lyssnar efter tangenterna.","Shift + bokstav, sedan Caps Lock."],".keyboard-stage"),
    interactive("keyboard-005-arrows","keyboard","Piltangenter","Flytta med piltangenterna.",["keyboard.arrows"],"keyboard-arrows-01","Använd upp, ned, vänster och höger.",null,".keyboard-arrow-field"),
    interactive("keyboard-006-tabesc","keyboard","Tab och Esc","Flytta fokus med Tab och avbryt med Esc.",["keyboard.tab","keyboard.escape"],"keyboard-tabesc-01","Använd Tab och därefter Esc.",null,".keyboard-stage"),
    interactive("keyboard-007-modifiers","keyboard","Ctrl, Alt och Windows","Känn igen tangentbordets modifierartangenter.",["keyboard.ctrl","keyboard.alt","keyboard.meta"],"keyboard-modifiers-01","Tryck Ctrl, Alt och Windows-tangenten.",null,".keyboard-checklist"),
    interactive("keyboard-008-shortcuts","keyboard","Kortkommandon","Använd Ctrl+A, Ctrl+C och Ctrl+V.",["keyboard.selectall","keyboard.copy","keyboard.paste"],"keyboard-shortcuts-01","Använd de tre kortkommandona i textfältet.",null,".keyboard-textarea"),
    interactive("keyboard-009-special","keyboard","Specialtecken","Skriv @, !, ?, punkt och komma.",["keyboard.special"],"keyboard-special-01","Skriv alla tecknen som efterfrågas.",null,".keyboard-input"),
    interactive("keyboard-010-final","keyboard","Tangentbord – slutuppdrag","Kombinera flera tangentbordsfärdigheter.",["keyboard.letters","keyboard.shift","keyboard.enter","keyboard.backspace","keyboard.arrows","keyboard.selectall"],"keyboard-final-01","Klara alla momenten i träningsytan.",null,".keyboard-final"),

    interactive("windows-001-start","windows","Start-menyn","Öppna Start-menyn.",["windows.start"],"windows-start-01","Öppna Start-menyn.",null,"[aria-label='Start']"),
    interactive("windows-002-open-app","windows","Starta ett program","Starta Kalkylatorn via Start.",["windows.open-app"],"windows-open-app-01","Öppna Kalkylatorn.",null,"[aria-label='Start']"),
    interactive("windows-003-move","windows","Flytta ett fönster","Dra ett programfönster till en annan plats.",["windows.move-window"],"windows-move-01","Flytta Kalkylatorns fönster.",null,".titlebar"),
    interactive("windows-004-minimize","windows","Minimera","Dölj ett fönster utan att stänga programmet.",["windows.minimize"],"windows-minimize-01","Minimera Kalkylatorn.",null,".controls"),
    interactive("windows-005-maximize","windows","Maximera","Låt ett fönster fylla arbetsytan.",["windows.maximize"],"windows-maximize-01","Maximera Kalkylatorn.",null,".controls"),
    interactive("windows-006-close","windows","Stäng ett program","Stäng programfönstret.",["windows.close"],"windows-close-01","Stäng Kalkylatorn.",null,".controls"),
    interactive("windows-007-context","windows","Högerklicksmeny","Öppna en snabbmeny med högerklick.",["windows.context-menu"],"windows-context-01","Högerklicka på skrivbordet.",null,".desktop"),
    interactive("windows-008-final","windows","Windows – slutuppdrag","Hantera Start, program och fönster självständigt.",["windows.start","windows.open-app","windows.move-window","windows.minimize","windows.maximize","windows.close"],"windows-final-01","Öppna Start, starta Kalkylatorn, flytta, minimera, återställ, maximera och stäng.",null,".sim"),

    basic("files-000-concepts","files","Fil, mapp och filtyp","Förstå vad filer, mappar, namn och filtyper är.","files.concepts","En fil innehåller information. En mapp samlar filer och andra mappar. Filnamnet berättar vad filen heter och filtypen beskriver vilken sorts fil det är."),
    interactive("files-003-rename","files","Byt namn","Byt namn på en fil utan att ändra innehållet.",["files.rename"],"files-rename-01","Byt namn på Utkast.txt till Rapport.txt.",null,".explorer-toolbar"),
    interactive("files-004-copy","files","Kopiera","Skapa en kopia av en fil.",["files.copy"],"files-copy-01","Kopiera Exempel.txt.",null,".explorer-toolbar"),
    interactive("files-005-move","files","Klipp ut och flytta","Flytta en fil till en annan mapp.",["files.cut","files.move"],"files-move-01","Flytta Flytta mig.txt till Downloads.",null,".explorer-toolbar"),
    interactive("files-006-delete","files","Radera och återställ","Använd Papperskorgen på ett tryggt sätt.",["files.delete","files.recycle-restore"],"files-delete-01","Radera Återställ mig.txt och återställ filen.",null,".explorer-toolbar"),
    interactive("files-007-saveas","files","Spara och Spara som","Skapa en ny fil från Anteckningar.",["files.save","files.save-as"],"files-saveas-01","Skriv något och spara filen.",null,".notepad-toolbar"),
    basic("files-008-locations","files","Documents, Downloads och Pictures","Lär dig de vanligaste mapparna.","files.locations","Documents används ofta för dokument, Downloads för sådant du hämtar och Pictures för bilder."),
    interactive("files-009-final","files","Filer – slutuppdrag","Kombinera skapa, byta namn, flytta, radera och återställa.",["files.create-folder","files.rename","files.move","files.delete","files.recycle-restore"],"files-final-01","Skapa en mapp och genomför alla filoperationerna som krävs.",null,".explorer-v2"),

    interactive("internet-001-address","internet","Adressfält och webbadress","Skriv en webbadress i adressfältet.",["internet.address"],"internet-address-01","Skriv en adress och tryck Gå eller Enter.",null,".browser-address"),
    interactive("internet-002-links","internet","Länkar","Öppna en länk på en webbsida.",["internet.link"],"internet-link-01","Klicka på en länk i webbläsaren.",null,".browser-page"),
    interactive("internet-003-tabs","internet","Flikar","Öppna en ny flik.",["internet.tab"],"internet-tab-01","Öppna en ny flik med +.",null,".browser-tabs"),
    interactive("internet-004-history","internet","Bakåt och framåt","Navigera i webbläsarens historik.",["internet.back","internet.forward"],"internet-history-01","Besök en sida och använd sedan Bakåt och Framåt.",null,".browser-bar"),
    interactive("internet-005-download","internet","Nedladdning","Ladda ner en virtuell fil.",["internet.download"],"internet-download-01","Navigera till nedladdningssidan och ladda ner guide.txt.",null,".browser-page"),
    interactive("internet-006-form","internet","Formulär","Fyll i text, checkbox och skicka.",["internet.form"],"internet-form-01","Öppna formuläret, fyll i namnet, kryssa i rutan och skicka.",null,".browser-page"),
    interactive("internet-007-zoom","internet","Zoom","Gör webbsidan större eller mindre.",["internet.zoom"],"internet-zoom-01","Ändra webbläsarens zoom.",null,".browser-footer"),
    interactive("internet-008-final","internet","Internet – slutuppdrag","Navigera, öppna flik, följa länk och ladda ner själv.",["internet.address","internet.link","internet.tab","internet.download"],"internet-final-01","Klara alla delarna i webbläsaren.",null,".fake-browser"),

    interactive("mail-001-open","mail","Inkorgen","Öppna ett mejl i inkorgen.",["mail.open"],"mail-open-01","Öppna valfritt mejl.",null,".mail-inbox"),
    interactive("mail-002-reply","mail","Svara på mejl","Svara på ett meddelande.",["mail.reply"],"mail-reply-01","Öppna ett vanligt mejl, klicka Svara och skicka svaret.",null,".fake-mail"),
    interactive("mail-003-new","mail","Nytt mejl","Skriv ett nytt meddelande.",["mail.compose","mail.send"],"mail-new-01","Skapa ett nytt mejl och skicka det.",null,".mail-compose"),
    interactive("mail-004-attach","mail","Bifoga fil","Lägg till en virtuell fil som bilaga.",["mail.attachment"],"mail-attach-01","Skapa ett nytt mejl och bifoga filen.",null,".mail-form"),
    interactive("mail-005-download","mail","Ladda ner bilaga","Hämta en bilaga från ett mejl.",["mail.download-attachment"],"mail-download-01","Öppna Annas mejl och ladda ner bilagan.",null,".mail-message"),
    interactive("mail-006-final","mail","E-post – slutuppdrag","Öppna, ladda ner, bifoga och svara.",["mail.open","mail.reply","mail.attachment","mail.download-attachment"],"mail-final-01","Klara alla delmoment i e-postappen.",null,".fake-mail"),

    basic("security-001-passwords","security","Lösenord och lösenfraser","Förstå varför långa unika lösenfraser är bättre.","security.password","Ett bra lösenord ska vara svårt att gissa och inte återanvändas. En lång lösenfras är ofta lättare att minnas och svårare att knäcka."),
    basic("security-002-personal","security","Personuppgifter och okända länkar","Lär dig vara försiktig med personuppgifter och okända länkar.","security.personal-data","Lämna inte ut lösenord eller känsliga uppgifter bara för att en sida eller ett mejl ber om det. Kontrollera avsändare och adress först."),
    interactive("security-003-phishing","security","Bluffmejl och phishing","Identifiera ett misstänkt mejl utan att följa instruktionerna.",["security.phishing"],"security-phishing-01","Öppna bluffmejlet och markera det som bluff.",["Leta efter ett mejl som försöker stressa dig.","Kontrollera avsändare och språk.","Öppna meddelandet men följ inte bluffens instruktioner.","Använd knappen som markerar bluff.","Öppna AKUT-mejlet från Support Center och välj Markera som bluff."],".fake-mail"),

    interactive("windows-009-resize","windows","Ändra fönsterstorlek","Gör ett programfönster större eller mindre.",["windows.resize"],"windows-resize-01","Dra i handtaget nere till höger på Kalkylatorn.",null,".window-resize-handle"),
    interactive("windows-010-switch","windows","Växla program med Alt+Tab","Växla snabbt mellan öppna program.",["windows.alt-tab"],"windows-switch-01","Tryck Alt+Tab för att byta till det andra öppna programmet.",["Håll Alt nere.","Tryck Tab medan Alt är nere.","Du ska se ett annat öppet program bli aktivt.","De två programmen är redan öppna.","Håll Alt och tryck Tab en gång."],".sim"),

    interactive("files-010-search","files","Sök efter en fil","Använd sökfältet i Utforskaren.",["files.search"],"files-search-01","Skriv Hitta i sökfältet.",null,".explorer-search"),

    interactive("internet-009-bookmark","internet","Bokmärken","Spara en sida så att den går att hitta igen.",["internet.bookmark"],"internet-bookmark-01","Klicka på stjärnan i adressraden.",null,".browser-bookmark"),
    interactive("internet-010-cookie","internet","Cookies","Hantera en cookie-dialog på en webbsida.",["internet.cookie"],"internet-cookie-01","Godkänn cookie-dialogen på startsidan.",null,".browser-cookie"),
    interactive("internet-011-upload","internet","Ladda upp fil","Välj en virtuell fil i ett webbformulär.",["internet.upload"],"internet-upload-01","Gå till Formulär och välj en fil för uppladdning.",null,".browser-page"),

    interactive("mail-007-forward","mail","Vidarebefordra mejl","Skicka ett befintligt meddelande vidare till en annan mottagare.",["mail.forward"],"mail-forward-01","Öppna ett mejl, välj Vidarebefordra, skriv en mottagare och skicka.",null,".fake-mail"),

    interactive("windows-011-search","windows","Sök efter program","Använd sökrutan i Start-menyn.",["windows.search"],"windows-search-01","Öppna Start och skriv Kalkylator i sökfältet.",null,".start-search"),
    interactive("files-011-drag","files","Dra fil mellan mappar","Flytta en fil genom att dra den till en mapp i sidofältet.",["files.drag-drop"],"files-drag-01","Dra Dra mig.txt till Downloads.",null,".explorer-v2"),
    interactive("internet-012-refresh","internet","Uppdatera sida","Ladda om den aktuella webbsidan.",["internet.refresh"],"internet-refresh-01","Klicka på uppdateringsknappen ↻.",null,".browser-bar"),
    interactive("internet-013-close-tab","internet","Stäng flik","Öppna en extra flik och stäng den igen.",["internet.close-tab"],"internet-close-tab-01","Öppna en ny flik med + och stäng den med ×.",null,".browser-tabs"),

    interactive("windows-012-desktop","windows","Skrivbord och ikoner","Öppna något direkt från skrivbordet.",["windows.desktop-icon"],"windows-desktop-open-01","Dubbelklicka på Documents-ikonen.",null,".desktop"),
    basic("windows-013-taskbar","windows","Aktivitetsfält och klocka","Förstå aktivitetsfältet, öppna program och klockan.","windows.taskbar","Aktivitetsfältet visar Start, öppna och fästa program samt klockan. Ett program kan återställas därifrån efter att det minimerats."),

    interactive("internet-014-search","internet","Sökmotor","Sök efter information med en sökruta.",["internet.search"],"internet-search-01","Skriv något i sökrutan på Övningswebben och sök.",null,".browser-search"),

    basic("security-004-mfa","security","Tvåstegsverifiering","Förstå varför en extra verifiering skyddar kontot.","security.mfa","Tvåstegsverifiering innebär att ett lösenord inte räcker ensamt. Du bekräftar även på ett annat sätt, till exempel med en kod eller en app."),
    basic("security-005-https","security","Webbadresser och HTTPS","Läs webbadressen innan du lämnar känslig information.","security.https","Kontrollera alltid vilken webbplats du faktiskt är på. HTTPS betyder att anslutningen är krypterad, men det betyder inte automatiskt att sidan är ärlig."),
    basic("security-006-updates","security","Uppdateringar och antivirus","Håll dator och program uppdaterade.","security.updates","Uppdateringar täpper till säkerhetshål. Windows inbyggda säkerhet och antivirus ska normalt vara aktiva och uppdaterade."),
    basic("security-007-wifi","security","Offentligt Wi-Fi","Var försiktig på öppna nätverk.","security.public-wifi","På offentliga nätverk bör du undvika känsliga aktiviteter om du inte vet att anslutningen är trygg."),
    basic("security-008-support-scam","security","Falsk teknisk support","Känn igen någon som påstår att datorn är infekterad och vill få fjärråtkomst.","security.support-scam","Riktiga företag ringer inte oväntat och kräver att du installerar fjärrstyrning eller betalar för att ta bort ett påhittat virus."),

    interactive("final-001-independent","final","Självständighetsprovet","Kombinera webbläsare, filer och e-post utan detaljerade steg.",["internet.download","files.rename","mail.attachment","mail.send"],"final-independent-01","Ladda ner guide.txt, byt namn på en fil, öppna E-post, bifoga en fil och skicka ett meddelande.",["Fundera på vilket program som behövs först.","Börja i webbläsaren och fortsätt sedan i Utforskaren.","Efter filhanteringen använder du E-post.","De relevanta apparna finns i Start-menyn.","Webbläsare: ladda ner → Utforskaren: byt namn → E-post: bifoga och skicka."],".sim")
  ];

  window.DatorskolanLessons = (window.DatorskolanLessons || []).concat(lessons);
})();