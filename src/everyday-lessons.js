(function () {
  "use strict";

  function detail(what, recognize, use, example, steps, everyday, mistakes) {
    return {
      what: what,
      recognize: recognize,
      use: use,
      example: example,
      steps: steps || [],
      everyday: everyday || [],
      mistakes: mistakes || []
    };
  }

  function basic(id, moduleId, title, summary, skill, info) {
    return {
      id:id,
      moduleId:moduleId,
      title:title,
      summary:summary,
      skills:[skill],
      audience:["child","standard","fast"],
      detail:info,
      steps:[
        {type:"instruction",title:title,text:summary},
        {type:"completion",title:"Klart",text:"Du har gått igenom grunden."}
      ]
    };
  }

  function interactive(id,moduleId,title,summary,skills,scenarioId,text,hints,visualTarget,info) {
    return {
      id:id,
      moduleId:moduleId,
      title:title,
      summary:summary,
      skills:skills,
      audience:["child","standard","fast"],
      scenarioId:scenarioId,
      detail:info,
      steps:[
        {type:"instruction",title:title,text:summary},
        {
          type:"exercise",
          title:"Din tur",
          text:text,
          validator:{type:"scenario-complete"},
          hints:hints || [
            "Läs uppgiften en gång till.",
            "Titta efter orden och symbolerna som förklarades ovan.",
            "Gör ett moment i taget.",
            "Kontrollera vad som redan är markerat som klart.",
            text
          ],
          visualTarget:visualTarget || ".everyday-lab"
        },
        {type:"completion",title:"Klart",text:"Du klarade den här vardagsfärdigheten."}
      ]
    };
  }

  var lessons = [
    interactive(
      "everyday-001-copy-paste","everyday","Markera, kopiera och klistra text",
      "Flytta information från ett ställe till ett annat utan att skriva om den.",
      ["everyday.select-text","everyday.copy-text","everyday.paste-text"],
      "everyday-copy-paste-01",
      "Markera telefonnumret, kopiera det och klistra in det i den tomma rutan.",
      null,".everyday-lab",
      detail(
        "När du markerar text väljer du exakt vilken del datorn ska arbeta med. Kopiera lägger en tillfällig kopia i urklippet och Klistra in placerar den där markören står.",
        "Markerad text får normalt en färgad bakgrund. Ctrl+C betyder Kopiera och Ctrl+V betyder Klistra in.",
        "Det här används hela tiden när man flyttar adresser, telefonnummer, länkar eller text mellan webben, dokument och mejl.",
        "Du hittar ett telefonnummer på en webbsida och klistrar in det i ett mejl i stället för att skriva siffrorna själv.",
        ["Dra över texten så den blir markerad.","Tryck Ctrl+C.","Klicka där texten ska hamna.","Tryck Ctrl+V."],
        ["Kopiera ett ordernummer från ett mejl till en webbsida.","Kopiera en adress från webben till en kalenderbokning."],
        ["Att kopiera utan att först markera rätt text.","Att klistra in på fel plats eftersom textmarkören står någon annanstans."]
      )
    ),

    interactive(
      "everyday-002-undo-redo","everyday","Ångra och gör om",
      "Rätta ett misstag utan att behöva börja om.",
      ["everyday.undo","everyday.redo"],
      "everyday-undo-redo-01",
      "Skriv något, använd Ctrl+Z för att ångra och Ctrl+Y för att göra om.",
      null,".everyday-lab",
      detail(
        "Ångra går tillbaka ett steg i det du nyss gjorde. Gör om återställer ett steg som du precis ångrade.",
        "Vanliga kortkommandon är Ctrl+Z för Ångra och Ctrl+Y för Gör om. Många program har också böjda pilknappar.",
        "Det är en av de viktigaste trygghetsfunktionerna när du skriver, flyttar eller redigerar.",
        "Du råkar ta bort ett helt stycke i ett dokument och trycker Ctrl+Z för att få tillbaka det.",
        ["Gör en liten ändring.","Tryck Ctrl+Z.","Kontrollera att ändringen försvann.","Tryck Ctrl+Y."],
        ["När du råkar radera text.","När du flyttat eller formaterat något fel."],
        ["Att fortsätta klicka efter ett misstag tills Ångra-historiken blivit svår att förstå.","Att tro att Ctrl+Z kan ångra allt efter att ett program har stängts."]
      )
    ),

    basic(
      "everyday-003-clipboard","everyday","Urklippet",
      "Förstå var något tar vägen mellan Kopiera och Klistra in.",
      "everyday.clipboard",
      detail(
        "Urklippet är ett tillfälligt minne där Windows håller det du senast kopierade eller klippte ut.",
        "Det syns normalt inte som en vanlig mapp. Du märker det genom att det du kopierat går att klistra in någon annanstans.",
        "Urklippet gör att information kan flyttas mellan olika program.",
        "Du kopierar text i webbläsaren och klistrar in samma text i Anteckningar.",
        [],
        ["Text mellan webbläsare och mejl.","Filnamn, adresser och nummer mellan olika program."],
        ["Att tro att Kopiera skapar en permanent fil i sig.","Att kopiera något nytt och därmed ersätta det som låg i urklippet."]
      )
    ),

    basic(
      "everyday-004-file-extensions","everyday","Filändelser: PDF, JPG, DOCX och TXT",
      "Förstå varför filnamnets slut berättar vilken sorts fil det är.",
      "everyday.file-extensions",
      detail(
        "Filändelsen är bokstäverna efter sista punkten i filnamnet. Den berättar vilken typ av fil det är och vilka program som brukar kunna öppna den.",
        "Exempel är .pdf, .jpg, .png, .docx, .xlsx och .txt.",
        "Det hjälper dig förstå om en fil är ett dokument, en bild, ett kalkylblad eller något annat.",
        "faktura.pdf är normalt ett dokument för läsning medan foto.jpg är en bild.",
        [],
        ["När du laddar ner bilagor.","När någon ber dig skicka rätt filformat."],
        ["Att ta bort filändelsen när man byter namn.","Att tro att en fil blivit en PDF bara för att man skriver .pdf i namnet."]
      )
    ),

    interactive(
      "everyday-005-save-location","everyday","Var sparades filen?",
      "Lär dig att alltid veta var en fil hamnar.",
      ["everyday.save-location"],
      "everyday-save-location-01",
      "I Google Chrome: gå till Nedladdning och ladda ner guide.txt. Öppna sedan Utforskaren från aktivitetsfältet och öppna Downloads för att hitta filen.",
      ["Börja i Chrome och öppna genvägen Nedladdning.","Klicka Ladda ner guide.txt.","Öppna Utforskaren från aktivitetsfältet.","Klicka Downloads i vänsterspalten.","Kontrollera att guide.txt ligger där."],".sim",
      detail(
        "Varje fil ligger på en bestämd plats, till exempel Documents, Downloads eller Pictures. Att veta platsen är lika viktigt som att veta filnamnet.",
        "Utforskaren visar sökvägen och mapparna. Webbläsare sparar vanligtvis hämtade filer i Downloads om du inte valt något annat.",
        "När du senare ska bifoga, öppna eller flytta en fil måste du kunna hitta den igen.",
        "Du laddar ner en PDF och hittar den sedan i Downloads.",
        [],
        ["Bilagor från e-post.","PDF:er och blanketter från webben."],
        ["Att ladda ner samma fil flera gånger eftersom man tror att den försvunnit.","Att spara allt på skrivbordet för att slippa leta."]
      )
    ),

    interactive(
      "everyday-006-pdf","everyday","PDF i vardagen",
      "Öppna, zooma och spara dokument i PDF-format.",
      ["everyday.pdf"],
      "everyday-pdf-01",
      "I Utforskaren: dubbelklicka på faktura.pdf. I PDF-visaren: zooma in minst en gång och välj Spara en kopia.",
      ["Dubbelklicka på faktura.pdf i Documents.","PDF-filen öppnas i ett eget programfönster.","Klicka + i PDF-visaren för att zooma in.","Klicka Spara en kopia.","Utforskaren → faktura.pdf → + → Spara en kopia."],".pdf-app",
      detail(
        "PDF är ett dokumentformat som är gjort för att se likadant ut på olika datorer. Det används mycket för fakturor, blanketter, kvitton och myndighetsdokument.",
        "Filnamnet slutar med .pdf. När den öppnas ser du ofta sidor och verktyg för zoom, utskrift och spara.",
        "Du behöver kunna läsa, förstora, spara och ibland skriva ut PDF-filer.",
        "En faktura kan komma som faktura.pdf i ett mejl.",
        [],
        ["Öppna en blankett från en myndighet.","Spara en faktura eller ett kvitto."],
        ["Att tro att PDF alltid går att redigera som ett Word-dokument.","Att inte kontrollera var en nedladdad PDF sparades."]
      )
    ),

    interactive(
      "everyday-007-screenshot","everyday","Skärmdump",
      "Spara en bild av det som visas på skärmen.",
      ["everyday.screenshot"],
      "everyday-screenshot-01",
      "I Skärmklippverktyget: klicka Nytt, dra en rektangel över en tydlig del av ytan och klicka sedan Spara.",
      ["Klicka ＋ Nytt.","En genomskinlig fångstyta visas.","Tryck ned musknappen och dra en rektangel som är minst några centimeter stor.","Släpp musknappen för att ta skärmklippet.","Klicka Spara. Bilden sparas som Skärmbild.png i Pictures."],".snipping-app",
      detail(
        "En skärmdump är en bild av hela eller en del av det som visas på skärmen.",
        "I Windows används ofta Print Screen eller verktyget Skärmklippverktyget. Resultatet blir en bild.",
        "Skärmdumpar är bra när du vill visa ett fel, spara information eller be någon om hjälp.",
        "Du får ett felmeddelande och skickar en skärmdump till supporten.",
        [],
        ["Visa någon exakt vad du ser på skärmen.","Spara ett kvitto eller en bekräftelse som bild."],
        ["Att råka få med lösenord, personnummer eller annan känslig information.","Att tro att skärmdumpen ersätter originalfilen."]
      )
    ),

    interactive(
      "everyday-008-zip","everyday","ZIP och komprimerade mappar",
      "Packa upp flera filer som levererats tillsammans.",
      ["everyday.zip"],
      "everyday-zip-01",
      "I Downloads: högerklicka på Bilder.zip och välj Extrahera alla…. Kontrollera sedan att mappen Bilder skapas.",
      ["Bilder.zip ligger i Downloads.","Högerklicka direkt på Bilder.zip.","Välj Extrahera alla… i snabbmenyn.","En vanlig mapp med namnet Bilder skapas bredvid ZIP-filen.","Öppna gärna mappen och se de uppackade bilderna."],".explorer-v2",
      detail(
        "En ZIP-fil är en komprimerad behållare som kan samla flera filer i ett mindre paket.",
        "Den slutar med .zip och kan se ut som en mapp med dragkedja eller arkivsymbol.",
        "Du behöver ofta packa upp ZIP-filen innan du arbetar normalt med innehållet.",
        "Någon skickar 20 bilder som Bilder.zip i stället för 20 separata bilagor.",
        [],
        ["Nedladdade mallar och bildpaket.","Filer som skickats från arbete eller förening."],
        ["Att öppna filer direkt inne i ZIP-arkivet och sedan undra var ändringarna sparades.","Att radera ZIP-filen innan man kontrollerat att allt packades upp."]
      )
    ),

    basic(
      "everyday-009-browser-vs-app","everyday","Webbsida eller installerat program?",
      "Förstå skillnaden mellan något som körs i webbläsaren och ett program på datorn.",
      "everyday.web-vs-app",
      detail(
        "En webbsida visas inne i en webbläsare och har en webbadress. Ett installerat program körs som en egen app i Windows.",
        "Webbsidor har adressfält och flikar runt sig. Installerade program har ofta en egen ikon i Start-menyn och ett eget fönster.",
        "Skillnaden hjälper när du ska installera, uppdatera, logga in eller felsöka.",
        "Gmail kan användas som webbsida i Chrome medan Outlook också kan finnas som installerat program.",
        [],
        ["Bank, myndighetstjänster och e-post i webbläsaren.","Word, Spotify eller andra installerade appar."],
        ["Att installera något fast webbsidan redan gör det du behöver.","Att leta efter en webbadress inne i ett vanligt Windows-program."]
      )
    ),

    basic(
      "everyday-010-login","everyday","Logga in, logga ut och håll mig inloggad",
      "Förstå vad en inloggning gör och när du bör logga ut.",
      "everyday.login",
      detail(
        "En inloggning kopplar din webbläsare eller app till ditt personliga konto.",
        "Du ser ofta fält för e-post/användarnamn och lösenord. Efter inloggning visas ofta ditt namn eller profilbild.",
        "Konton sparar din information och ger tillgång till tjänster som e-post, bank, moln eller sociala medier.",
        "På din privata dator kan en tjänst hålla dig inloggad. På en delad dator bör du logga ut när du är klar.",
        [],
        ["E-post, streaming, myndighetstjänster och webbshoppar.","Flera personer som delar samma dator."],
        ["Att vara kvar inloggad på en offentlig eller lånad dator.","Att blanda ihop Logga ut med att bara stänga webbläsarfliken."]
      )
    ),

    basic(
      "everyday-011-password-manager","everyday","Lösenordshanterare",
      "Förstå hur säkra unika lösenord kan sparas utan att du behöver memorera alla.",
      "everyday.password-manager",
      detail(
        "En lösenordshanterare lagrar lösenord krypterat och kan fylla i dem åt dig.",
        "Webbläsare och särskilda appar kan erbjuda Spara lösenord eller fylla i användarnamn och lösenord automatiskt.",
        "Det gör det möjligt att ha olika starka lösenord på olika tjänster.",
        "I stället för samma lösenord på tio webbplatser kan lösenordshanteraren skapa och minnas tio olika.",
        [],
        ["Många konton med olika lösenord.","Automatisk ifyllning på kända webbplatser."],
        ["Att använda samma lösenord överallt för att det är lättare att minnas.","Att lämna huvudlösenordet till andra."]
      )
    ),

    interactive(
      "everyday-012-install","everyday","Installera och avinstallera program",
      "Förstå vad installation betyder och hur ett program tas bort igen.",
      ["everyday.install"],
      "everyday-install-01",
      "Installera Övningsprogrammet och avinstallera det sedan.",
      null,".everyday-lab",
      detail(
        "Installation lägger till ett program och de filer som behövs för att programmet ska fungera. Avinstallation tar bort programmet på ett ordnat sätt.",
        "Installationsfiler kan heta .exe eller .msi i Windows. Installerade program syns ofta i Start-menyn och Inställningar → Appar.",
        "Du behöver förstå installation för att kunna lägga till verktyg utan att blanda ihop installationsfilen med själva programmet.",
        "Du laddar ner en webbläsare, kör installationen och får sedan ett program i Start-menyn.",
        [],
        ["Installera skrivardrivrutiner eller ett mötesprogram.","Ta bort ett program du inte längre använder."],
        ["Att installera program från okända popup-rutor.","Att bara radera programmets ikon och tro att programmet avinstallerats."]
      )
    ),

    interactive(
      "everyday-013-print-pdf","everyday","Skriv ut och Skriv ut till PDF",
      "Förstå skrivardialogen och hur ett dokument kan sparas som PDF.",
      ["everyday.print"],
      "everyday-print-pdf-01",
      "I PDF-visaren: klicka Skriv ut. Välj Microsoft Print to PDF som skrivare och klicka sedan Skriv ut.",
      ["Klicka Skriv ut i PDF-visarens verktygsrad.","Utskriftsdialogen öppnas.","Öppna listan Skrivare och välj Microsoft Print to PDF.","Kontrollera att rätt skrivare är vald.","Klicka Skriv ut."],".print-dialog-real",
      detail(
        "Skriv ut skickar ett dokument till en vald skrivare. En virtuell PDF-skrivare skapar i stället en PDF-fil.",
        "Skrivardialogen visar vald skrivare och ofta antal kopior, sidor, stående/liggande och andra val.",
        "Du behöver kontrollera rätt skrivare innan du klickar Skriv ut.",
        "Du kan välja Microsoft Print to PDF för att skapa en PDF av ett dokument utan papper.",
        [],
        ["Skriva ut biljetter och blanketter.","Spara en webbsida eller ett dokument som PDF."],
        ["Att skriva ut 30 sidor till fel fysisk skrivare.","Att tro att Print to PDF skickar något till en riktig skrivare."]
      )
    ),

    interactive(
      "everyday-014-cloud","everyday","Molnlagring",
      "Förstå skillnaden mellan en fil på datorn och en fil som synkroniseras till molnet.",
      ["everyday.cloud"],
      "everyday-cloud-01",
      "I Documents: markera rapport.docx och välj Klipp ut. Öppna OneDrive i vänsterspalten och välj Klistra in.",
      ["rapport.docx ligger i Documents.","Markera filen och klicka Klipp ut.","Öppna OneDrive i Utforskarens vänsterspalt.","Klicka Klistra in.","Kontrollera att rapport.docx nu ligger i OneDrive."],".explorer-v2",
      detail(
        "Molnlagring betyder att filer lagras på en tjänsts servrar och kan synkroniseras mellan dina enheter.",
        "Tjänster som OneDrive och Google Drive visar ofta en molnsymbol och mappar som ser ut ungefär som vanliga mappar.",
        "Det används för backup, delning och åtkomst från flera datorer.",
        "En Word-fil i OneDrive kan öppnas både på din stationära dator och bärbara dator.",
        [],
        ["Arbetsdokument mellan flera enheter.","Dela bilder eller dokument med andra."],
        ["Att tro att en fil automatiskt finns i molnet bara för att den finns på datorn.","Att radera en synkroniserad fil och inte förstå att raderingen kan synkas till andra enheter."]
      )
    ),

    interactive(
      "everyday-015-dialogs","everyday","OK, Avbryt, Spara och Spara inte",
      "Lär dig läsa dialogrutor innan du väljer.",
      ["everyday.dialogs"],
      "everyday-dialog-01",
      "Läs dialogrutan och välj Spara.",
      null,".everyday-lab",
      detail(
        "En dialogruta är en liten ruta som stoppar upp arbetet och ber dig välja eller bekräfta något.",
        "Den har ofta en fråga och knappar som OK, Avbryt, Ja, Nej, Spara eller Spara inte.",
        "Dialogrutor kan avgöra om arbete sparas, filer ersätts eller en åtgärd avbryts.",
        "När du stänger ett dokument med osparade ändringar kan programmet fråga om du vill spara.",
        [],
        ["Bekräfta att en fil ska ersättas.","Välja om ändringar ska sparas innan stängning."],
        ["Att automatiskt trycka OK utan att läsa frågan.","Att välja Spara inte när du egentligen vill behålla arbetet."]
      )
    ),

    basic(
      "everyday-016-notifications","everyday","Aviseringar och popup-rutor",
      "Förstå skillnaden mellan en vanlig avisering och något som kräver handling.",
      "everyday.notifications",
      detail(
        "En avisering är ett kort meddelande från Windows, ett program eller en webbsida.",
        "Den visas ofta tillfälligt nära ett hörn av skärmen och kan ha programikon, rubrik och knappar.",
        "Aviseringar kan berätta om nytt mejl, uppdateringar, kalenderhändelser eller problem.",
        "Ett Teams-meddelande kan visas som avisering även när Teams-fönstret inte är öppet.",
        [],
        ["Nytt mejl eller mötespåminnelse.","Windows berättar att en omstart behövs."],
        ["Att klicka på en okänd webbläsaravisering som ser ut som systemvarning.","Att tro att varje popup betyder att något är fel."]
      )
    ),

    basic(
      "everyday-017-recent-files","everyday","Senaste filer och historik",
      "Hitta tillbaka till något du nyligen arbetade med.",
      "everyday.recent",
      detail(
        "Många program och Windows visar listor över nyligen öppnade filer.",
        "Listan kan heta Senaste, Recent eller Nyligen använda och visar filnamn du öppnat nyligen.",
        "Det är ett snabbt sätt att hitta tillbaka utan att minnas exakt mapp.",
        "Word kan visa rapport.docx under Senaste dokument.",
        [],
        ["Fortsätta på ett dokument från igår.","Hitta en bild eller PDF du precis öppnade."],
        ["Att tro att Senaste är en egen kopia av filen.","Att glömma att filen fortfarande ligger i sin riktiga mapp."]
      )
    ),

    basic(
      "everyday-018-drag-text","everyday","Markera text med mus och tangentbord",
      "Lär dig flera sätt att välja text innan du kopierar eller ändrar den.",
      "everyday.select-text-methods",
      detail(
        "Text måste ofta markeras innan den kan kopieras, tas bort eller formateras.",
        "Markerad text får en färgad bakgrund. Du kan dra med musen eller hålla Shift och använda piltangenter.",
        "Olika metoder passar olika mängd text.",
        "Dubbelklick på ett ord markerar ofta ordet. Ctrl+A markerar allt.",
        [],
        ["Kopiera ett stycke ur en PDF eller webbsida.","Byta ut ett felstavat ord i ett dokument."],
        ["Att börja skriva när fel text är markerad och därmed ersätta den.","Att missa ett tecken i början eller slutet av markeringen."]
      )
    ),

    interactive(
      "everyday-019-pin-taskbar","everyday","Fäst program i aktivitetsfältet",
      "Gör program du använder ofta lättare att hitta på samma sätt som i Windows 11.",
      ["everyday.pin-taskbar"],
      "everyday-pin-taskbar-01",
      "Öppna Start. Högerklicka på Google Chrome och välj Fäst i aktivitetsfältet.",
      [
        "Öppna Start med Windows-symbolen nere i aktivitetsfältet.",
        "Leta upp Google Chrome bland de fästa apparna.",
        "Högerklicka på Google Chrome.",
        "I snabbmenyn finns valet Fäst i aktivitetsfältet.",
        "Start → högerklicka Google Chrome → Fäst i aktivitetsfältet."
      ],".start",
      detail(
        "Att fästa ett program betyder att dess ikon ligger kvar i aktivitetsfältet även när programmet är stängt.",
        "I Windows 11 görs detta från appens snabbmeny, till exempel genom att högerklicka på appen i Start och välja Fäst i aktivitetsfältet.",
        "Det ger snabb åtkomst till program du använder ofta utan att du måste söka efter dem varje gång.",
        "Google Chrome kan ligga permanent bredvid Utforskaren i aktivitetsfältet även när Chrome är stängt.",
        ["Öppna Start.","Högerklicka på Google Chrome.","Välj Fäst i aktivitetsfältet.","Kontrollera att Chrome-ikonen nu syns kvar i aktivitetsfältet."],
        ["Fäst webbläsaren du använder varje dag.","Fäst ett arbetsprogram du ofta behöver."],
        ["Att tro att en fäst app alltid är igång bara för att ikonen syns.","Att använda en särskild övningsknapp i stället för Windows riktiga högerklicksmeny."]
      )
    ),

    interactive(
      "everyday-020-snap","everyday","Två fönster sida vid sida",
      "Använd Windows fönstersnappning i stället för en särskild övningsknapp.",
      ["everyday.snap"],
      "everyday-snap-01",
      "Dra Google Chrome hela vägen till vänster skärmkant tills det fyller vänster halva. Dra sedan Anteckningar till höger skärmkant.",
      [
        "Ta tag i namnlisten högst upp på Google Chrome-fönstret.",
        "Håll musknappen nere och dra hela vägen till vänster kant.",
        "Släpp när pekaren är vid kanten.",
        "Gör samma sak med Anteckningar men dra till höger kant.",
        "Chrome → vänster kant. Anteckningar → höger kant."
      ],".app-window",
      detail(
        "Windows kan automatiskt placera ett fönster på halva skärmen när du drar det mot vänster eller höger skärmkant.",
        "Fönstret ändrar storlek och fyller en halva av arbetsytan. Det kallas ofta Snap.",
        "Det är mycket användbart när du läser på ett ställe och skriver eller jämför på ett annat.",
        "Ha Google Chrome på vänster halva och Anteckningar på höger halva.",
        ["Dra Chrome i namnlisten till vänster skärmkant och släpp.","Dra Anteckningar i namnlisten till höger skärmkant och släpp."],
        ["Jämföra två dokument.","Kopiera information från webben till mejl eller anteckningar."],
        ["Att maximera båda fönstren och växla fram och tillbaka i onödan.","Att släppa fönstret innan pekaren nått skärmkanten."]
      )
    ),

    interactive(
      "devices-001-usb","devices","USB-minne",
      "Öppna, kopiera från och mata ut ett USB-minne säkert.",
      ["devices.usb"],
      "everyday-usb-01",
      "I Utforskaren: öppna USB-enhet (E:), markera rapport.pdf och klicka Kopiera. Öppna Documents och klicka Klistra in. Högerklicka sedan på USB-enhet (E:) i vänsterspalten och välj Mata ut.",
      ["USB-enhet (E:) syns i Utforskarens vänsterspalt.","Öppna USB-enheten och markera rapport.pdf.","Klicka Kopiera, öppna Documents och klicka Klistra in.","När kopian finns i Documents: högerklicka på USB-enhet (E:).","Välj Mata ut."],".explorer-v2",
      detail(
        "Ett USB-minne är en liten lagringsenhet som ansluts fysiskt till datorn.",
        "När det är anslutet visas det ofta som en egen enhet i Utforskaren.",
        "Det används för att flytta filer mellan datorer eller för enkel extern lagring.",
        "Kopiera en PDF från USB-minnet till Documents och mata sedan ut USB-minnet innan du drar ur det.",
        [],
        ["Flytta presentationer mellan datorer.","Ta med dokument till en annan plats."],
        ["Att dra ur USB-minnet mitt under en kopiering.","Att öppna filer direkt från USB och sedan glömma var den enda kopian finns."]
      )
    ),

    basic(
      "devices-002-ports","devices","USB-A, USB-C och andra portar",
      "Känn igen vanliga fysiska anslutningar på datorn.",
      "devices.ports",
      detail(
        "Portar är uttag där du ansluter tillbehör och kablar. USB-A är rektangulär och USB-C är mindre och oval.",
        "De sitter ofta på datorns sidor eller baksida. HDMI är vanligt för skärmar.",
        "Rätt port behövs för laddning, skärm, USB-minne, mus och andra tillbehör.",
        "En USB-C-port kan användas för laddning på många bärbara datorer.",
        [],
        ["Ladda dator eller telefon.","Ansluta skärm, USB-minne eller headset."],
        ["Att tvinga in en kontakt i fel port.","Att anta att alla USB-C-portar stöder exakt samma funktioner."]
      )
    ),

    interactive(
      "devices-003-wifi","devices","Anslut till Wi‑Fi",
      "Välj rätt trådlöst nätverk och anslut med lösenord.",
      ["devices.wifi"],
      "everyday-wifi-01",
      "I Inställningar under Nätverk och internet: välj HemmaNet, klicka Anslut, skriv lösenordet datorskolan och klicka Nästa.",
      ["Du är redan på sidan Nätverk och internet.","Leta efter Wi‑Fi och listan med nätverk.","Välj HemmaNet och klicka Anslut.","Skriv datorskolan som nätverkssäkerhetsnyckel.","HemmaNet → Anslut → datorskolan → Nästa."],".settings-app",
      detail(
        "Wi‑Fi är ett trådlöst sätt att ansluta datorn till ett lokalt nätverk och ofta internet.",
        "Windows visar en lista med nätverksnamn, även kallade SSID.",
        "Du behöver välja rätt nätverk och ibland ange dess lösenord.",
        "Hemma kan nätverket heta exempelvis HemmaNet och ha ett lösenord som står på routern.",
        [],
        ["Hemma, på arbete och hotell.","När datorn säger Ingen internetanslutning."],
        ["Att ansluta till ett nätverk med nästan samma namn som ditt riktiga.","Att dela Wi‑Fi-lösenord offentligt."]
      )
    ),

    interactive(
      "devices-004-bluetooth","devices","Bluetooth",
      "Anslut trådlösa tillbehör på kort avstånd.",
      ["devices.bluetooth"],
      "everyday-bluetooth-01",
      "I Inställningar under Bluetooth och enheter: klicka Lägg till enhet och välj Headset.",
      ["Du är redan på Bluetooth och enheter.","Kontrollera att Bluetooth är På.","Klicka + Lägg till enhet.","Välj Headset i listan.","Lägg till enhet → Headset."],".settings-app",
      detail(
        "Bluetooth är en trådlös teknik för tillbehör på kort avstånd.",
        "Du hittar den i Windows Inställningar och ser en lista över enheter som kan paras ihop.",
        "Det används för headset, möss, tangentbord och ibland telefoner.",
        "Sätt ett headset i parkopplingsläge och välj det i datorns Bluetooth-lista.",
        [],
        ["Trådlösa hörlurar under videomöten.","Trådlös mus eller tangentbord."],
        ["Att glömma att enheten redan är ansluten till en annan dator.","Att tro att Bluetooth är samma sak som Wi‑Fi."]
      )
    ),

    interactive(
      "devices-005-audio-camera","devices","Volym, mikrofon och kamera",
      "Kontrollera de viktigaste inställningarna inför ett videosamtal.",
      ["devices.audio","devices.microphone","devices.camera"],
      "everyday-audio-camera-01",
      "I Inställningar under System: höj volymen till minst 40 och slå på både mikrofon och kamera.",
      ["Du är redan på System.","Öppna eller använd Ljud-kortet.","Höj volymreglaget till minst 40.","Markera Mikrofon tillåten och Kamera tillåten.","Volym ≥ 40 + mikrofon + kamera."],".settings-app",
      detail(
        "Datorn kan ha flera ljudenheter, mikrofoner och kameror. Program behöver använda rätt enhet och ha behörighet.",
        "Ljudsymbolen finns ofta vid klockan. Mikrofon och kamera visas ofta med 🎤 och 📷.",
        "Det är viktigt inför Teams, Zoom, Meet och andra samtal.",
        "Om andra inte hör dig kan mikrofonen vara avstängd även om högtalarna fungerar.",
        [],
        ["Videomöten och samtal.","Spela upp film eller musik."],
        ["Att höja högtalarvolymen när problemet egentligen är mikrofonen.","Att glömma att kameran eller mikrofonen är mutad i själva mötesappen."]
      )
    ),

    basic(
      "devices-006-printers","devices","Skrivare och skrivarkö",
      "Förstå vad som händer när något skickas till en fysisk skrivare.",
      "devices.printer",
      detail(
        "En skrivare är en separat enhet. När du skriver ut skapas ett utskriftsjobb som läggs i en kö.",
        "Windows kan visa skrivarnamn och en kö med dokument som väntar.",
        "Om inget kommer ut kan problemet vara fel skrivare, papper, anslutning eller ett fastnat jobb.",
        "Du råkar välja kontorets färgskrivare i stället för skrivaren bredvid dig.",
        [],
        ["Skriva ut blanketter och biljetter.","Kontrollera varför en utskrift inte kommer ut."],
        ["Att trycka Skriv ut fem gånger när inget händer och skapa fem kopior.","Att inte kontrollera vilken skrivare som är vald."]
      )
    ),

    basic(
      "devices-007-battery","devices","Batteri och laddning",
      "Förstå batteriprocent, laddning och energisparläge.",
      "devices.battery",
      detail(
        "Bärbara datorer har ett batteri som visar ungefär hur mycket användningstid som återstår.",
        "Batterisymbol och procent visas ofta nära klockan. En laddningssymbol visas när ström är ansluten.",
        "Du behöver kunna se när datorn behöver laddas och förstå att låg batterinivå kan påverka prestanda.",
        "Vid 10 % ansluter du laddaren innan ett långt videomöte.",
        [],
        ["Jobba bärbart utan vägguttag.","Kontrollera om laddaren faktiskt fungerar."],
        ["Att tro att datorn är trasig när batteriet bara är tomt.","Att använda fel laddare eller kabel."]
      )
    ),

    basic(
      "devices-008-external-screen","devices","Extern skärm och projektor",
      "Förstå hur en andra skärm kan användas.",
      "devices.display",
      detail(
        "En extern skärm eller projektor ansluts till datorn och kan visa samma bild eller ge extra arbetsyta.",
        "Windows kan ha lägen som Duplicera och Utöka. HDMI och USB-C används ofta för anslutning.",
        "Det är vanligt vid arbete, presentationer och när bärbar dator används vid skrivbord.",
        "Utöka gör att du kan ha webbläsaren på ena skärmen och dokumentet på den andra.",
        [],
        ["Presentationer på projektor.","Två skärmar på kontor."],
        ["Att flytta ett fönster till skärm två och sedan tro att programmet försvunnit.","Att välja Duplicera när du egentligen vill ha extra arbetsyta."]
      )
    ),

    interactive(
      "trouble-001-error","troubleshooting","Läs felmeddelandet",
      "Lär dig använda texten i ett fel för att förstå nästa säkra steg.",
      ["troubleshooting.error"],
      "everyday-error-01",
      "Läs felmeddelandet och välj den säkra åtgärden.",
      null,".everyday-lab",
      detail(
        "Ett felmeddelande beskriver ofta vad som gick fel och ibland vad du kan göra åt det.",
        "Det visas som en ruta eller text med rubrik, förklaring och knappar.",
        "Att läsa meddelandet först är nästan alltid bättre än att bara klicka bort det.",
        "Om en fil används av ett annat program kan lösningen vara att stänga det programmet och försöka igen.",
        [],
        ["När en fil inte går att öppna eller spara.","När ett program saknar behörighet eller anslutning."],
        ["Att bara läsa ordet Fel och ignorera resten.","Att välja den mest drastiska knappen utan att förstå konsekvensen."]
      )
    ),

    interactive(
      "trouble-002-restart","troubleshooting","Starta om, stäng av och uppdatera",
      "Förstå skillnaden mellan de vanligaste strömalternativen.",
      ["troubleshooting.restart"],
      "everyday-restart-01",
      "I Windows Update: läs informationen om den väntande uppdateringen och klicka Starta om nu.",
      ["Du är redan på Windows Update.","Läs meddelandet om att en uppdatering väntar på omstart.","Kontrollera att du förstår att arbete bör sparas först.","Klicka Starta om nu.","Windows Update → Starta om nu."],".settings-app",
      detail(
        "Starta om stänger Windows och startar det igen. Stäng av lämnar datorn avstängd. Uppdatera och starta om installerar väntande uppdateringar under omstarten.",
        "Alternativen finns normalt under strömknappen i Start-menyn.",
        "Omstart löser många tillfälliga problem och krävs ibland efter uppdateringar.",
        "När Windows säger att en uppdatering behöver omstart väljer du Uppdatera och starta om när det passar.",
        [],
        ["Efter Windows-uppdateringar.","När ett problem finns kvar även efter att programmet startats om."],
        ["Att hålla inne den fysiska strömknappen som första lösning.","Att starta om mitt under osparat arbete."]
      )
    ),

    interactive(
      "trouble-003-frozen","troubleshooting","När ett program inte svarar",
      "Lös ett hängt program i lugn och säker ordning.",
      ["troubleshooting.frozen-app"],
      "everyday-recovery-01",
      "Vänta först, försök sedan stänga programmet och starta det igen.",
      null,".everyday-lab",
      detail(
        "Ett program kan tillfälligt sluta svara utan att hela datorn är trasig.",
        "Fönstret kan bli vitt, visa Inte svarar eller sluta reagera på klick.",
        "Börja med den minst drastiska lösningen och gå stegvis vidare.",
        "Vänta några sekunder. Om inget händer, försök stänga programmet och starta det igen.",
        [],
        ["Tunga dokument eller webbsidor kan behöva tid.","Ett program kan fastna medan resten av Windows fungerar."],
        ["Att direkt stänga av hela datorn.","Att klicka hundra gånger i det frusna programmet."]
      )
    ),

    basic(
      "trouble-004-task-manager","troubleshooting","Aktivitetshanteraren",
      "Förstå verktyget som visar vilka program och processer som körs.",
      "troubleshooting.task-manager",
      detail(
        "Aktivitetshanteraren är ett Windows-verktyg som visar program och hur mycket resurser de använder.",
        "Den visar listor med appar/processer och kolumner för exempelvis CPU och minne.",
        "Den kan användas när ett program verkligen har hängt sig och inte går att stänga normalt.",
        "Efter att normala försök misslyckats kan du välja ett hängt program och avsluta uppgiften.",
        [],
        ["Se vilket program som använder mycket CPU eller minne.","Avsluta ett program som inte svarar."],
        ["Att avsluta systemprocesser man inte känner igen.","Att använda Aktivitetshanteraren som första lösning i stället för normal stängning."]
      )
    ),

    basic(
      "trouble-005-internet","troubleshooting","När internet inte fungerar",
      "Följ en enkel checklista innan du antar att datorn är trasig.",
      "troubleshooting.internet",
      detail(
        "Internetproblem kan bero på Wi‑Fi, routern, tjänsten eller själva webbplatsen.",
        "Windows nätverksikon visar om datorn är ansluten. En enda webbsida kan ligga nere även om internet fungerar.",
        "En stegvis kontroll hjälper dig hitta var problemet finns.",
        "Kontrollera Wi‑Fi → prova en annan webbsida → kontrollera andra enheter → starta om router endast om det behövs.",
        [],
        ["Webbsidor slutar ladda.","Videosamtal tappar anslutningen."],
        ["Att ändra många nätverksinställningar samtidigt.","Att tro att internet är nere bara för att en enda webbplats inte svarar."]
      )
    ),

    basic(
      "trouble-006-sound","troubleshooting","När ljudet inte fungerar",
      "Kontrollera rätt saker i rätt ordning.",
      "troubleshooting.sound",
      detail(
        "Ljud kan saknas för att volymen är låg, ljudet är mutat eller fel högtalare är vald.",
        "Windows har en högtalarikon nära klockan och en lista över ljudenheter.",
        "Kontrollera först de enkla orsakerna innan du installerar om något.",
        "Kontrollera mute → volym → vald ljudenhet → programvolym.",
        [],
        ["Inget ljud i video eller möte.","Ljud kommer ur skärmen i stället för headsetet."],
        ["Att blanda ihop mikrofonproblem och högtalarproblem.","Att ändra drivrutiner innan man kontrollerat mute."]
      )
    ),

    basic(
      "trouble-007-storage","troubleshooting","När lagringsutrymmet börjar ta slut",
      "Förstå vad fullt lagringsutrymme betyder och vad som är säkert att rensa.",
      "troubleshooting.storage",
      detail(
        "Datorns lagring har begränsat utrymme. När den börjar bli full kan Windows varna och program få problem att spara eller uppdatera.",
        "Inställningar kan visa hur mycket lagring som används av appar, dokument, bilder och temporära filer.",
        "Du bör först identifiera vad som tar plats innan du raderar något.",
        "Downloads kan innehålla gamla stora installationsfiler som inte längre behövs.",
        [],
        ["Windows varnar för lågt diskutrymme.","En uppdatering kan inte installeras."],
        ["Att radera okända systemmappar.","Att tömma Papperskorgen innan du kontrollerat att inget viktigt ligger där."]
      )
    ),

    interactive(
      "everyday-021-link-actions","everyday","Kopiera länk och öppna i ny flik",
      "Använd en länks riktiga högerklicksmeny i Chrome.",
      ["everyday.link-actions"],
      "everyday-link-actions-01",
      "I Google Chrome: öppna Sökresultat. Högerklicka på en länk och välj Kopiera länkadress. Högerklicka sedan på en länk igen och välj Öppna länk i ny flik.",
      [
        "Använd Chrome-fönstret som redan är öppet.",
        "Gå till Sökresultat från startsidan.",
        "Högerklicka på den blå länktexten, inte bredvid länken.",
        "Välj först Kopiera länkadress. Öppna högerklicksmenyn igen och välj Öppna länk i ny flik.",
        "Sökresultat → högerklick på blå länk → Kopiera länkadress → högerklick igen → Öppna länk i ny flik."
      ],".chrome-page",
      detail(
        "En länk har en adress bakom den. Du kan kopiera själva adressen eller öppna länken i en ny flik utan att lämna sidan du redan är på.",
        "I Chrome visar högerklick på en länk en snabbmeny med länk-kommandon. Länken är ofta blå och pekaren blir normalt en hand över den.",
        "Det är användbart när du vill skicka en adress till någon eller öppna flera resultat utan att förlora resultatsidan.",
        "På en söksida kan du högerklicka på ett resultat, kopiera länkadressen och sedan öppna ett annat resultat i ny flik.",
        ["Öppna Sökresultat.","Högerklicka direkt på en blå länk.","Välj Kopiera länkadress.","Högerklicka på en länk igen.","Välj Öppna länk i ny flik."],
        ["Skicka en webbadress i mejl eller chatt.","Öppna flera sökresultat utan att tappa resultatsidan."],
        ["Att kopiera den synliga texten i stället för själva länkadressen.","Att vänsterklicka och lämna sidan när du egentligen ville behålla den öppen."]
      )
    ),

    basic(
      "devices-009-hotspot","devices","Mobildelning och hotspot",
      "Förstå hur en telefon kan dela sin internetanslutning med datorn.",
      "devices.hotspot",
      detail(
        "En mobil hotspot gör telefonen till ett tillfälligt Wi‑Fi-nätverk som datorn kan ansluta till.",
        "Telefonen visar ett nätverksnamn och lösenord. Datorn ser nätverket i vanliga Wi‑Fi-listan.",
        "Det är praktiskt när vanligt Wi‑Fi saknas men mobiltelefonen har internet.",
        "På tåget delar du telefonens internet och ansluter den bärbara datorn till telefonens hotspot.",
        [],
        ["Tillfälligt internet vid resor.","Reservlösning när hemnätverket ligger nere."],
        ["Att glömma att hotspot använder mobil data.","Att lämna hotspot på med ett enkelt lösenord längre än nödvändigt."]
      )
    ),

    basic(
      "trouble-009-before-support","troubleshooting","Innan du ber om hjälp",
      "Samla rätt information så att någon annan lättare kan hjälpa dig.",
      "troubleshooting.support-info",
      detail(
        "Bra felsökning handlar också om att kunna beskriva problemet tydligt: vad du gjorde, vad du förväntade dig och vad som faktiskt hände.",
        "Skriv gärna ned exakt felmeddelande, vilket program du använde och om problemet händer varje gång.",
        "Det sparar mycket tid när du kontaktar support eller ber en vän om hjälp.",
        "Säg hellre 'När jag klickar Spara i Anteckningar står det Åtkomst nekad' än bara 'Datorn fungerar inte'.",
        [],
        ["Skicka skärmdump och feltext till support.","Förklara ett återkommande problem för en kollega."],
        ["Att säga att inget fungerar utan att beskriva vad som faktiskt händer.","Att lämna ut lösenord eller andra hemligheter när någon försöker hjälpa."]
      )
    ),

    basic(
      "trouble-008-backup","troubleshooting","Backup och flera kopior",
      "Förstå varför viktiga filer inte bör finnas på bara ett ställe.",
      "troubleshooting.backup",
      detail(
        "Backup är en extra kopia av viktiga filer som kan användas om originalet försvinner eller skadas.",
        "Backup kan ligga på extern disk, molntjänst eller annan separat lagring.",
        "Det skyddar mot hårddiskfel, misstag, stöld och vissa attacker.",
        "Familjebilder finns både på datorn och i en molnbackup.",
        [],
        ["Bilder, dokument och bokföring.","Filer du inte enkelt kan skapa igen."],
        ["Att kalla en fil på samma hårddisk för backup.","Att aldrig kontrollera att backupen faktiskt går att återställa."]
      )
    )
  ];

  window.DatorskolanLessons = (window.DatorskolanLessons || []).concat(lessons);
})();