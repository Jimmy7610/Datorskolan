(function () {
  "use strict";

  function info(what, recognize, use, example, steps) {
    return {
      what: what,
      recognize: recognize,
      use: use,
      example: example,
      steps: steps || []
    };
  }

  function moduleDefault(lesson) {
    var moduleId = lesson.moduleId;
    var title = lesson.title;
    var summary = lesson.summary || "";

    if (moduleId === "basics") {
      return info(
        summary || "Det här är en grunddel av datorn som är bra att känna igen innan du börjar använda program.",
        "Du lär dig namnet, vad delen gör och hur den brukar se ut på en vanlig Windows-dator.",
        "När du känner igen datorns delar blir senare instruktioner lättare att förstå.",
        "Om någon säger ”klicka med musen” eller ”skriv på tangentbordet” vet du vilken fysisk del de menar."
      );
    }

    if (moduleId === "mouse") {
      return info(
        summary || "Musen är ett styrdon. När du rör musen flyttas muspekaren på skärmen.",
        "Muspekaren är oftast en liten vit pil. Över text kan den ibland se ut som ett lodrätt streck och över en länk som en hand.",
        "Musen används för att peka, välja, öppna, flytta och scrolla saker på skärmen.",
        "Du för pekaren till en knapp och klickar för att välja den."
      );
    }

    if (moduleId === "keyboard") {
      return info(
        summary || "Tangentbordet används för att skriva och för att ge datorn kommandon med olika tangenter.",
        "Bokstavstangenterna ligger i mitten. Siffrorna brukar ligga i raden ovanför. Större specialtangenter som Enter, Shift och Backspace har namn eller symboler.",
        "Du använder tangentbordet både för text och för genvägar som kan göra arbetet snabbare.",
        "När du skriver i ett textfält visas tecknen där markören står."
      );
    }

    if (moduleId === "windows") {
      return info(
        summary || "Windows är systemet som visar skrivbordet, Start-menyn, program och fönster.",
        "Skrivbordet är bakgrunden med ikoner. Aktivitetsfältet ligger längst ned. Program visas i egna rektangulära fönster.",
        "Windows hjälper dig att starta program och hålla ordning på vad som är öppet.",
        "Du kan ha Utforskaren och Kalkylatorn öppna samtidigt och växla mellan dem."
      );
    }

    if (moduleId === "files") {
      return info(
        summary || "Filer är saker som dokument och bilder. Mappar används för att hålla ordning på filer.",
        "En mapp visas ofta som en gul mappikon. En fil har ofta en ikon som visar vilken typ av innehåll den har, till exempel ett dokument eller en bild.",
        "Filhantering används när du sparar, hittar, flyttar, kopierar eller raderar saker.",
        "Ett dokument kan heta Rapport.txt och ligga i mappen Documents."
      );
    }

    if (moduleId === "programs") {
      return info(
        summary || "Ett program är ett verktyg i datorn som är gjort för en viss typ av uppgift.",
        "Program har ofta en egen ikon och öppnas i ett eget fönster med namn högst upp.",
        "Olika program används för olika saker, till exempel skriva text, räkna eller visa bilder.",
        "Anteckningar används för enkel text och Kalkylatorn för uträkningar."
      );
    }

    if (moduleId === "internet") {
      return info(
        summary || "Internetdelen handlar om hur du använder en webbläsare för att hitta och öppna information på webben.",
        "Webbläsaren har ett adressfält högst upp, knappar för Bakåt/Framåt, flikar och ett stort område där webbsidan visas.",
        "Du använder webbläsaren för att besöka webbsidor, söka, följa länkar och hantera nedladdningar.",
        "Chrome, Edge och Firefox är riktiga webbläsare. Här tränar du i Datorskolans simulerade webbläsare."
      );
    }

    if (moduleId === "mail") {
      return info(
        summary || "E-post är digitala meddelanden som skickas mellan e-postadresser.",
        "En e-postapp har vanligtvis en inkorg med en lista av meddelanden och en läsvy där avsändare, ämne och innehåll visas.",
        "E-post används för meddelanden, dokument, bokningar, arbete och kontakt med företag och personer.",
        "En adress kan se ut som namn@example.se. Ett mejl har mottagare, ämne och meddelandetext."
      );
    }

    if (moduleId === "security") {
      return info(
        summary || "Säkerhet handlar om att skydda konton, filer och personlig information.",
        "Varningssignaler kan vara oväntade krav, brådska, konstiga adresser eller frågor om lösenord och betalning.",
        "Säkerhetsvanor hjälper dig att undvika bluffar, kontokapning och skadliga filer.",
        "Om ett oväntat mejl säger ”agera NU annars stängs ditt konto” ska du kontrollera avsändaren innan du gör något."
      );
    }

    if (moduleId === "final") {
      return info(
        "Det här är ett kombinerat uppdrag där flera tidigare färdigheter används tillsammans.",
        "Du får inte en knapp för varje liten del. I stället behöver du själv välja rätt program och rätt ordning.",
        "Syftet är att träna samma typ av problemlösning som på en riktig dator.",
        "En verklig uppgift kan vara att ladda ner en fil, döpa om den och sedan skicka den som bilaga i ett mejl."
      );
    }

    return info(summary || title, "Titta efter namnet och symbolen som lektionen beskriver.", "Det här momentet används i vanligt datorarbete.", "Du tränar det här i den säkra simulatorn.");
  }

  function specific(lesson) {
    var id = lesson.id;
    var title = lesson.title;

    if (id === "basics-001-computer") return info(
      "En dator är en maskin som kan köra program, lagra filer och visa information. Själva datorn är inte samma sak som skärmen, internet eller ett enskilt program.",
      "På en bärbar dator sitter skärm, tangentbord och dator i samma enhet. På en stationär dator kan skärm, tangentbord, mus och själva datorlådan vara separata.",
      "Datorn används för allt från att skriva och räkna till bilder, internet, e-post och myndighetstjänster.",
      "När du öppnar Kalkylatorn kör datorn ett program. När du sparar ett dokument lagrar datorn en fil."
    );

    if (id === "basics-002-power") return info(
      "Datorn behöver ström. En bärbar dator har ett batteri som laddas med en laddare.",
      "Av/på-knappen har ofta symbolen ⏻. Batterisymbolen brukar visas nära klockan i Windows.",
      "Du behöver veta hur datorn startas, laddas och stängs av på rätt sätt.",
      "Om batteriet är nästan tomt ansluter du laddaren. När du är klar väljer du normalt Stäng av i Windows i stället för att bara hålla inne strömknappen."
    );

    if (id === "basics-003-audio-usb") return info(
      "USB är en vanlig anslutning för tillbehör och lagring. Ljud kan spelas genom högtalare eller hörlurar.",
      "En USB-port är en liten fysisk kontakt på datorns sida eller baksida. USB-A är rektangulär och USB-C är mindre och oval.",
      "USB kan användas för mus, tangentbord, USB-minne, telefon och andra tillbehör.",
      "Ett USB-minne kan innehålla filer som sedan visas i Utforskaren när det ansluts."
    );

    if (id === "basics-004-internet") return info(
      "Datorn, internet och webbläsaren är tre olika saker. Datorn är enheten. Internet är nätverket. Webbläsaren är programmet som visar webbsidor.",
      "Webbläsaren har normalt flikar och ett adressfält. Internet i sig har ingen egen ikon som du arbetar i.",
      "Skillnaden är viktig när någon säger att ”internet inte fungerar” eller ber dig öppna en webbläsare.",
      "Du kan starta Chrome på datorn. Chrome använder internet för att öppna en sida som svt.se."
    );

    if (id.indexOf("mouse-001") === 0) return info(
      "Muspekaren är den lilla markör som visar var musen pekar på skärmen.",
      "Den är oftast en vit pil. Den kan byta form beroende på vad du håller över.",
      "Pekaren måste vara på rätt plats innan ett klick påverkar rätt knapp, ikon eller fil.",
      "För pekaren över knappen Start innan du klickar på den."
    );

    if (id.indexOf("mouse-002") === 0) return info(
      "Precision betyder att kunna placera muspekaren på den sak du faktiskt vill använda.",
      "Små knappar, länkar och ikoner kräver att pilens spets hamnar över rätt område.",
      "God precision minskar felklick och gör datorn enklare att använda.",
      "Först flyttar du pekaren till knappen. Sedan klickar du."
    );

    if (id.indexOf("mouse-003") === 0) return info(
      "Ett vänsterklick är ett snabbt tryck och släpp på musens vänstra knapp.",
      "Det brukar välja en knapp, markera en fil eller placera textmarkören i ett fält.",
      "Vänsterklick är det vanligaste musklicket i Windows.",
      "Klicka en gång på en fil så blir den markerad utan att öppnas."
    );

    if (id.indexOf("mouse-004") === 0) return info(
      "Ett dubbelklick är två snabba vänsterklick på samma ställe.",
      "Det används ofta för att öppna filer, mappar och ikoner på skrivbordet.",
      "Klicken behöver komma ganska tätt efter varandra och pekaren ska ligga kvar på samma objekt.",
      "Dubbelklicka på Documents-ikonen för att öppna mappen."
    );

    if (id.indexOf("mouse-005") === 0) return info(
      "Ett högerklick är ett klick med musens högra knapp. Det öppnar ofta en meny med fler val för saken du klickade på.",
      "Efter ett högerklick visas vanligtvis en liten meny nära muspekaren.",
      "Högerklick används när du vill se möjliga åtgärder, till exempel byta namn, kopiera eller radera.",
      "Högerklicka på en fil för att få fram val som gäller just den filen."
    );

    if (id.indexOf("mouse-006") === 0) return info(
      "Scroll betyder att flytta innehållet uppåt eller nedåt när allt inte får plats på skärmen samtidigt.",
      "På en vanlig mus används hjulet mellan vänster och höger knapp. På en styrplatta används ofta två fingrar.",
      "Scroll används på webbsidor, i dokument, listor och Utforskaren.",
      "Rulla hjulet nedåt för att se det som ligger längre ned på en lång sida."
    );

    if (id.indexOf("mouse-007") === 0) return info(
      "Klicka och håll betyder att trycka ned en musknapp utan att släppa den direkt.",
      "Objektet eller knappen är aktiv så länge musknappen hålls nere.",
      "Det behövs bland annat när du ska dra ett objekt.",
      "Tryck ned vänster musknapp på en fil och håll kvar innan du börjar flytta musen."
    );

    if (id.indexOf("mouse-008") === 0) return info(
      "Dra och släpp betyder att hålla musknappen nere, flytta objektet och sedan släppa knappen på en ny plats.",
      "Objektet brukar följa pekaren eller bli halvgenomskinligt medan du drar.",
      "Det kan användas för att flytta filer, fönster och andra objekt.",
      "Dra en fil från Documents till Downloads och släpp den där."
    );

    if (id.indexOf("keyboard-001") === 0) return info(
      "Bokstavstangenterna används för att skriva text.",
      "Tangenterna A–Ö finns i mitten av tangentbordet. Svenska tangentbord har även Å, Ä och Ö.",
      "När ett textfält är aktivt hamnar bokstaven där textmarkören står.",
      "Trycker du D, A, T, O, R visas ordet dator i textfältet."
    );

    if (id.indexOf("keyboard-002") === 0) return info(
      "Siffertangenter skriver tal och nummer.",
      "Siffrorna 1–0 ligger normalt i raden ovanför bokstäverna. Större tangentbord kan också ha ett numeriskt tangentbord till höger.",
      "Siffror används i datum, telefonnummer, priser, adresser och uträkningar.",
      "För att skriva 2026 trycker du 2, 0, 2, 6."
    );

    if (id.indexOf("keyboard-003") === 0) return info(
      "Mellanslag gör ett mellanrum. Enter gör ofta ny rad eller bekräftar. Backspace tar bort tecknet till vänster. Delete tar vanligtvis bort tecknet till höger eller ett markerat objekt.",
      "Mellanslag är den långa tangenten längst ned. Enter är stor och sitter till höger. Backspace har ofta en vänsterpil. Delete kan heta Del.",
      "De här tangenterna används hela tiden när du skriver och rättar text.",
      "I texten ”HejX världen” kan Delete eller Backspace användas för att ta bort ett felaktigt tecken beroende på var markören står."
    );

    if (id.indexOf("keyboard-004") === 0) return info(
      "Shift används tillfälligt för stor bokstav eller tecknet som står högst upp på en tangent. Caps Lock låser stora bokstäver tills du stänger av det igen.",
      "Shift finns ofta både till vänster och höger och har symbolen ⇧. Caps Lock sitter till vänster om A.",
      "Shift passar för enstaka versaler. Caps Lock passar när flera bokstäver i rad ska vara stora.",
      "Håll Shift och tryck D för att skriva D. Släpp Shift och nästa bokstav blir liten igen."
    );

    if (id.indexOf("keyboard-005") === 0) return info(
      "Piltangenterna flyttar markören eller markeringen upp, ned, vänster och höger.",
      "De fyra tangenterna har symbolerna ← ↑ ↓ → och sitter normalt längst ned till höger.",
      "De används för att flytta i text, menyer och vissa program utan mus.",
      "Tryck vänsterpil i en textrad för att flytta textmarkören ett steg åt vänster."
    );

    if (id.indexOf("keyboard-006") === 0) return info(
      "Tab flyttar fokus till nästa knapp eller fält. Esc betyder ofta avbryt, stäng eller gå ur.",
      "Tab brukar ha två pilar eller texten Tab och sitter till vänster. Esc sitter normalt längst upp till vänster.",
      "De är användbara när du arbetar med formulär och dialogrutor.",
      "Tryck Tab flera gånger på ett formulär för att hoppa mellan fälten utan mus."
    );

    if (id.indexOf("keyboard-007") === 0) return info(
      "Ctrl och Alt är modifierartangenter. De används tillsammans med andra tangenter för kommandon.",
      "Ctrl och Alt sitter vanligtvis längst ned på tangentbordet.",
      "De gör sällan något själva. De blir viktiga i kombinationer som Ctrl+C.",
      "Håll Ctrl nere och tryck C för att kopiera markerat innehåll."
    );

    if (id.indexOf("keyboard-008") === 0) return info(
      "Ett kortkommando är en tangentkombination som gör en vanlig åtgärd snabbare.",
      "Du håller normalt Ctrl nere och trycker en annan tangent.",
      "Ctrl+A markerar allt, Ctrl+C kopierar och Ctrl+V klistrar in.",
      "Markera text med Ctrl+A, kopiera den med Ctrl+C och klistra in den med Ctrl+V."
    );

    if (id.indexOf("keyboard-009") === 0) return info(
      "Specialtecken är tecken som inte är vanliga bokstäver eller siffror, till exempel @, !, ?, . och ,.",
      "Många delar tangent med en siffra eller annan symbol och kan kräva Shift eller AltGr på ett riktigt tangentbord.",
      "De används i e-postadresser, meningar, webbadresser och lösenord.",
      "En e-postadress innehåller alltid @, till exempel anna@example.se."
    );

    if (title === "Start-menyn") return info(
      "Start-menyn är Windows huvudmeny för att hitta program, inställningar och avstängning.",
      "Du öppnar den med Windows-symbolen ⊞ längst ned till vänster eller genom att trycka Windows-tangenten på en riktig dator.",
      "Start är ett vanligt ställe att börja när du vill öppna något du inte ser på skrivbordet.",
      "Öppna Start och välj Kalkylatorn."
    );

    if (title === "Starta ett program") return info(
      "Ett program är ett verktyg som datorn kör. Att starta programmet betyder att öppna det så att du kan använda det.",
      "Program visas med namn och ikon i Start-menyn. När de körs syns de ofta i aktivitetsfältet.",
      "Du startar olika program beroende på vad du vill göra.",
      "Kalkylatorn används för uträkningar och Anteckningar för enkel text."
    );

    if (title === "Flytta ett fönster") return info(
      "Ett fönster är den rektangulära yta där ett program visas. Fönstret kan flyttas utan att programmet stängs.",
      "Högst upp finns namnlisten med programmets namn och knapparna minimera, maximera och stäng.",
      "Genom att flytta fönster kan du se flera program samtidigt.",
      "Klicka och håll på namnlisten, dra fönstret åt sidan och släpp."
    );

    if (title === "Minimera") return info(
      "Minimera gömmer ett programfönster från skrivbordet utan att stänga programmet.",
      "Knappen ser ofta ut som ett litet streck — i fönstrets övre högra hörn.",
      "Det är praktiskt när du vill få undan ett program och komma tillbaka till det senare.",
      "Klicka —. Programmet finns kvar i aktivitetsfältet."
    );

    if (title === "Maximera") return info(
      "Maximera gör ett fönster så stort som möjligt på arbetsytan.",
      "Knappen ser ofta ut som en fyrkant □ nära fönstrets övre högra hörn.",
      "Det är bra när du vill använda hela skärmen för ett program.",
      "Klicka □ för att maximera. Klicka samma plats igen för att återställa storleken."
    );

    if (title === "Stäng ett program") return info(
      "Stäng avslutar det aktuella fönstret och normalt programmet om det inte har andra fönster öppna.",
      "Stängknappen är × längst upp till höger i fönstret.",
      "Använd Stäng när du är färdig med programmet, inte Minimera.",
      "— minimerar, □ maximerar och × stänger. De betyder alltså olika saker."
    );

    if (title === "Högerklicksmeny") return info(
      "En högerklicksmeny, även kallad snabbmeny eller kontextmeny, visar åtgärder som passar det du klickade på.",
      "Den dyker upp som en liten lista nära muspekaren efter ett högerklick.",
      "Menyn kan innehålla olika val beroende på om du klickar på skrivbordet, en fil eller en mapp.",
      "Högerklick på en fil kan visa Byt namn och Ta bort, medan högerklick på skrivbordet visar andra val."
    );

    if (title === "Ändra fönsterstorlek") return info(
      "Du kan göra ett vanligt fönster bredare, smalare, högre eller lägre utan att maximera det.",
      "När pekaren är över en fönsterkant eller ett hörn brukar den ändras till en dubbelpil.",
      "Det gör att flera fönster kan få plats bredvid varandra.",
      "Dra i fönstrets nedre högra hörn för att ändra både bredd och höjd."
    );

    if (title === "Växla mellan program") return info(
      "När flera program är öppna kan du byta vilket fönster som ligger överst och tar emot dina klick och tangenttryckningar.",
      "Öppna program markeras i aktivitetsfältet längst ned.",
      "Du behöver kunna växla när information finns i ett program men ska användas i ett annat.",
      "Klicka på Kalkylatorns ikon i aktivitetsfältet för att ta fram Kalkylatorn."
    );

    if (title === "Sök efter program") return info(
      "Start-menyn har en sökfunktion där du kan skriva namnet på ett program i stället för att leta manuellt.",
      "Sökfältet finns i eller nära Start-menyn och visar träffar medan du skriver.",
      "Det är ofta det snabbaste sättet att hitta ett program du vet namnet på.",
      "Skriv Kalkylator så filtreras listan till program som matchar ordet."
    );

    if (title === "Skrivbord och ikoner") return info(
      "Skrivbordet är Windows grundyta bakom dina öppna program. Ikoner är små symboler som representerar exempelvis mappar, filer eller genvägar.",
      "Ikonen har en bild och oftast ett namn under, till exempel Documents.",
      "Skrivbordet kan användas som en snabb plats för sådant du öppnar ofta.",
      "Dubbelklicka på Documents-ikonen för att öppna mappen."
    );

    if (title === "Aktivitetsfält och klocka") return info(
      "Aktivitetsfältet är raden längst ned i Windows. Där finns Start, öppna/fästa program och systeminformation.",
      "Till höger visas ofta klocka, datum, ljud, nätverk och batteri. Till vänster eller mitten finns programikoner.",
      "Aktivitetsfältet används för att starta och växla mellan program och för att se grundläggande status.",
      "Ett minimerat program försvinner inte; du kan ta fram det igen genom att klicka på dess ikon i aktivitetsfältet."
    );

    if (title === "Fil, mapp och filtyp") return info(
      "En fil är sparad information, exempelvis text eller en bild. En mapp är en behållare som hjälper dig organisera filer. Filtypen beskriver vilken sorts fil det är.",
      "Mappar har oftast en gul mappikon. Filer har olika ikoner. Filnamnet kan sluta med exempelvis .txt, .jpg eller .pdf.",
      "Du behöver förstå skillnaden för att kunna hitta, flytta och spara saker på rätt plats.",
      "Rapport.txt är en textfil. Semester är en mapp som kan innehålla Rapport.txt och bilder."
    );

    if (title === "Byt namn") return info(
      "Att byta namn ändrar filens eller mappens namn, inte själva innehållet.",
      "När namnbyte är aktivt blir namnet redigerbart så att du kan skriva ett nytt.",
      "Bra namn gör filer enklare att hitta senare.",
      "Utkast.txt kan döpas om till Rapport.txt när dokumentet är färdigt."
    );

    if (title === "Kopiera") return info(
      "Kopiera skapar en extra kopia av en fil eller mapp. Originalet ligger kvar.",
      "Arbetsflödet är normalt: markera → Kopiera → gå till platsen → Klistra in.",
      "Kopiering används när samma fil ska finnas på flera platser eller när du vill arbeta på en kopia.",
      "Om du kopierar Exempel.txt och klistrar in den i samma mapp får du originalet plus en kopia."
    );

    if (title === "Klipp ut och flytta") return info(
      "Klipp ut förbereder ett objekt för flytt. När du sedan klistrar in det på en annan plats flyttas originalet dit.",
      "Efter Klipp ut kan objektet ibland se nedtonat ut tills det har klistrats in.",
      "Använd detta när filen ska byta plats i stället för att dupliceras.",
      "Klipp ut Flytta mig.txt i Documents, öppna Downloads och välj Klistra in."
    );

    if (title === "Radera och återställ") return info(
      "När du raderar en vanlig fil i Windows flyttas den ofta först till Papperskorgen i stället för att försvinna direkt.",
      "Papperskorgen har en papperskorgsikon. Där kan du se raderade objekt och välja Återställ.",
      "Det ger en säkerhetsmarginal om du raderade något av misstag.",
      "Radera filen, öppna Papperskorgen och välj Återställ för att få tillbaka den."
    );

    if (title === "Spara och Spara som") return info(
      "Spara skriver dina ändringar till en fil. Spara som låter dig välja ett nytt namn eller skapa en separat fil.",
      "Program har ofta en knapp eller meny som heter Spara eller Spara som.",
      "Utan att spara kan text du skrivit försvinna när programmet stängs.",
      "Skriv en text i Anteckningar och välj Spara som för att skapa Min text.txt."
    );

    if (title === "Documents, Downloads och Pictures") return info(
      "Windows har vanliga standardmappar för olika typer av innehåll.",
      "Documents används för dokument, Downloads för sådant du hämtar från internet och Pictures för bilder.",
      "Genom att känna till standardmapparna blir det lättare att hitta filer senare.",
      "En fil som laddas ner från webbläsaren hamnar ofta i Downloads."
    );

    if (title === "Sök efter en fil") return info(
      "Sökning filtrerar eller letar efter filer vars namn matchar det du skriver.",
      "I Utforskaren finns ett sökfält, ofta högst upp till höger.",
      "Det hjälper när du vet ungefär vad filen heter men inte exakt var den ligger.",
      "Skriv Hitta och filen Hitta mig.txt visas som träff."
    );

    if (title === "Dra fil mellan mappar") return info(
      "En fil kan flyttas genom att dra den från en plats till en annan med musen.",
      "När du håller filen och för den över en mapp markeras ofta målplatsen.",
      "Det är ett visuellt alternativ till Klipp ut och Klistra in.",
      "Dra Dra mig.txt till Downloads i vänsterspalten och släpp."
    );

    if (title === "Adressfält och webbadress") return info(
      "Adressfältet visar var i webben du befinner dig och låter dig skriva en webbadress direkt. En webbadress kallas också URL.",
      "Adressfältet är den långa rutan högst upp i webbläsaren. En adress kan se ut som example.se eller https://example.se/sida.",
      "Använd adressfältet när du känner till adressen till sidan du vill besöka.",
      "I Datorskolans webbläsare står datorskolan.local i adressfältet. Skriv en annan övningsadress och tryck Enter eller Gå.",
      ["Klicka i adressfältet.", "Markera eller ta bort den gamla adressen.", "Skriv den nya adressen.", "Tryck Enter eller Gå."]
    );

    if (title === "Länkar") return info(
      "En länk är något klickbart som leder till en annan sida, fil eller plats. Den synliga texten och adressen bakom länken kan vara olika.",
      "En länk är ofta blå och understruken, men kan också se ut som en knapp, bild eller vanlig text. Muspekaren brukar bli en hand när du håller över en länk.",
      "Länkar används för att navigera mellan sidor och öppna mer information.",
      "Texten ”Läs mer om säkerhet” kan vara en länk som leder till datorskolan.local/sakerhet. På riktiga webben bör du vara försiktig med okända länkar eftersom texten inte alltid avslöjar vart den leder.",
      ["För pekaren över det klickbara objektet.", "Titta efter om pekaren ändras till en hand.", "Klicka en gång för att följa länken."]
    );

    if (title === "Flikar") return info(
      "En flik låter webbläsaren ha flera webbsidor öppna i samma fönster.",
      "Flikarna ligger normalt högst upp i webbläsaren som små namngivna områden. En + knapp öppnar ofta en ny flik.",
      "Flikar är praktiska när du vill behålla en sida öppen och samtidigt öppna en annan.",
      "Du kan ha din e-post i en flik och en informationssida i en annan."
    );

    if (title === "Bakåt och framåt") return info(
      "Webbläsaren minns sidor du nyligen besökt i en historik för den aktuella fliken.",
      "Bakåt visas som ← och Framåt som → nära adressfältet.",
      "Bakåt tar dig till föregående sida. Framåt fungerar efter att du gått tillbaka och tar dig fram igen.",
      "Öppna en länk, tryck Bakåt för att återgå och sedan Framåt för att komma tillbaka."
    );

    if (title === "Nedladdning") return info(
      "Att ladda ner betyder att kopiera en fil från en webbsida till din dator.",
      "En nedladdningsknapp kan heta Ladda ner, Download eller visa en nedåtpil. Hämtade filer hamnar ofta i Downloads.",
      "Nedladdning används för dokument, bilder, installationer och andra filer.",
      "När du laddar ner guide.txt i övningen skapas filen i den virtuella mappen Downloads."
    );

    if (title === "Formulär") return info(
      "Ett webbformulär samlar information som du skriver eller väljer innan du skickar den.",
      "Formulär kan innehålla textfält, kryssrutor, radioknappar, listor och en Skicka-knapp.",
      "De används för kontaktformulär, bokningar, inloggning och beställningar.",
      "Ett kontaktformulär kan be om namn, ett val och att du markerar en kryssruta innan Skicka fungerar."
    );

    if (title === "Zoom") return info(
      "Zoom ändrar hur stort innehållet på en webbsida visas utan att ändra själva sidan.",
      "Zoom visas ofta som procent, till exempel 100 %, tillsammans med + och −.",
      "Det är användbart om text eller knappar känns för små eller för stora.",
      "110 % gör sidan lite större medan 90 % gör den lite mindre."
    );

    if (title === "Bokmärken") return info(
      "Ett bokmärke sparar adressen till en webbsida så att du lätt kan hitta tillbaka till den.",
      "I många webbläsare används en stjärna ☆ eller ★ nära adressfältet.",
      "Bokmärken passar för sidor du besöker ofta.",
      "Klicka på stjärnan för att spara den aktuella övningssidan."
    );

    if (title === "Cookies") return info(
      "Cookies är små uppgifter som en webbplats kan spara i webbläsaren, till exempel val eller en inloggningssession.",
      "Webbplatser visar ofta en ruta eller banner där du får information om cookies och ibland kan välja vilka som används.",
      "Cookies kan vara nödvändiga för vissa funktioner men kan också användas för statistik och annonsering.",
      "I övningen är cookierutan helt simulerad. På riktiga sidor bör du läsa valen i stället för att automatiskt trycka Godkänn."
    );

    if (title === "Ladda upp fil") return info(
      "Att ladda upp betyder motsatsen till nedladdning: du skickar en fil från din dator till en webbsida eller tjänst.",
      "Knappen kan heta Välj fil, Ladda upp, Upload eller ha en gem-symbol.",
      "Uppladdning används till exempel när du bifogar ett CV, laddar upp ett foto eller skickar ett dokument.",
      "I övningen väljer du en virtuell fil från Documents och webbsidan visar filnamnet."
    );

    if (title === "Uppdatera sida") return info(
      "Uppdatera laddar om den aktuella webbsidan.",
      "Knappen ser ofta ut som en cirkelpil ↻ eller ⟳ nära adressfältet.",
      "Det används när innehållet kan ha ändrats eller om sidan inte laddades korrekt.",
      "Klicka ↻ för att ladda om övningssidan."
    );

    if (title === "Stäng flik") return info(
      "Att stänga en flik stänger bara den webbsidan, inte hela webbläsaren.",
      "Varje flik har ofta ett litet ×. Webbläsarfönstret har ett eget större × längst upp till höger.",
      "Det är viktigt att skilja på att stänga en flik och att stänga hela programmet.",
      "Öppna en extra flik med + och stäng just den fliken med dess ×."
    );

    if (title === "Sökmotor") return info(
      "En sökmotor hjälper dig hitta webbsidor genom att du skriver ord i stället för en exakt webbadress.",
      "Sökrutan har ett textfält och ofta en knapp som heter Sök. Resultatet blir en lista med länkar.",
      "Använd sökning när du vet vad du letar efter men inte vilken webbadress som har informationen.",
      "Skriv exempelvis säkra lösenord och tryck Sök. Då visas sökresultat som du kan välja mellan."
    );

    if (title === "Inkorgen") return info(
      "Inkorgen är listan över e-postmeddelanden du har fått.",
      "Varje rad visar ofta avsändare, ämne och ibland en kort förhandsvisning.",
      "Du väljer ett meddelande i inkorgen för att läsa hela innehållet.",
      "Ett mejl från Anna med ämnet ”Bilder från utflykten” öppnas när du klickar på raden."
    );

    if (title === "Svara på mejl") return info(
      "Svara skapar ett nytt meddelande tillbaka till den person som skickade det aktuella mejlet.",
      "Knappen heter ofta Svara eller Reply och mottagarens adress fylls i automatiskt.",
      "Använd Svara när ditt nya meddelande hör ihop med det du precis läst.",
      "Öppna Annas mejl, välj Svara, skriv ditt meddelande och tryck Skicka."
    );

    if (title === "Nytt mejl") return info(
      "Ett nytt mejl startas utan att vara kopplat till ett tidigare meddelande.",
      "Du får fält för Till, Ämne och själva meddelandet. Till innehåller mottagarens e-postadress.",
      "Använd Nytt meddelande när du själv börjar en ny konversation.",
      "Till: anna@example.se, Ämne: Möte, Meddelande: Hej Anna..."
    );

    if (title === "Bifoga fil") return info(
      "En bilaga är en fil som skickas tillsammans med ett mejl.",
      "Bilagor visas ofta med en gem-symbol 📎 och filens namn.",
      "Använd bilagor när mottagaren behöver få ett dokument, foto eller annan fil.",
      "Klicka Bifoga fil, välj plan.txt och kontrollera att 📎 plan.txt visas innan du skickar."
    );

    if (title === "Ladda ner bilaga") return info(
      "En bilaga som du fått i ett mejl kan sparas som en fil på datorn.",
      "I mejlet visas filnamnet och ofta en knapp för Ladda ner eller Spara.",
      "Efter nedladdning hittar du filen vanligtvis i Downloads om du inte valt en annan plats.",
      "Ladda ner utflykt.jpg från Annas mejl och leta sedan i Downloads."
    );

    if (title === "Vidarebefordra mejl") return info(
      "Vidarebefordra skickar ett mejl du fått vidare till en ny mottagare.",
      "Knappen heter ofta Vidarebefordra eller Forward. Originalets innehåll följer med i det nya meddelandet.",
      "Använd det när någon annan behöver få informationen i meddelandet.",
      "Öppna ett mejl, välj Vidarebefordra, ange en ny mottagare och skicka."
    );

    if (title === "Bluffmejl och phishing") return info(
      "Phishing är en bluff där någon försöker få dig att lämna ut lösenord, pengar eller annan känslig information genom att låtsas vara någon du litar på.",
      "Vanliga varningssignaler är stark brådska, hot, konstiga avsändaradresser, oväntade länkar och krav på lösenord eller betalning.",
      "Målet är att stanna upp och kontrollera innan du klickar eller svarar.",
      "Ett oväntat mejl med ämnet ”AKUT: Ditt konto stängs” som ber om lösenord är en tydlig varningssignal."
    );

    if (title === "Lösenord och lösenfraser") return info(
      "Ett lösenord bevisar att du får komma åt ett konto. En lösenfras är ett längre lösenord som kan bestå av flera ord.",
      "Bra lösenord är långa, unika och svåra att gissa. Samma lösenord bör inte användas på flera viktiga konton.",
      "Om ett lösenord läcker från en tjänst ska det inte automatiskt ge åtkomst till dina andra konton.",
      "En lång unik lösenfras är normalt bättre än ett kort enkelt ord med en siffra på slutet."
    );

    if (title === "Personuppgifter och okända länkar") return info(
      "Personuppgifter är information som kan kopplas till dig, till exempel namn, adress, personnummer, telefonnummer och vissa kontouppgifter.",
      "En okänd länk kan se trovärdig ut även om adressen bakom den går någon annanstans.",
      "Dela bara känsliga uppgifter när du vet vem som frågar och varför.",
      "En bank eller support ska inte få ditt lösenord bara för att ett oväntat mejl ber om det."
    );

    if (title === "Tvåstegsverifiering") return info(
      "Tvåstegsverifiering, ofta kallat 2FA eller MFA, kräver en extra kontroll utöver lösenordet.",
      "Det kan vara en kod, en appnotis, säkerhetsnyckel eller biometrisk kontroll.",
      "Det gör kontot mycket svårare att kapa även om någon får tag på lösenordet.",
      "Du skriver lösenordet och godkänner sedan inloggningen i en autentiseringsapp."
    );

    if (title === "Webbadresser och HTTPS") return info(
      "Webbadressen visar vilken webbplats du besöker. HTTPS betyder att trafiken mellan webbläsaren och webbplatsen är krypterad.",
      "Adressfältet kan visa https:// framför domännamnet. Det viktiga är att kontrollera själva domänen, till exempel banken.se.",
      "HTTPS skyddar anslutningen men garanterar inte att personen bakom webbplatsen är ärlig.",
      "https://banken.se kan vara rätt adress medan https://banken-login.example.com är en helt annan domän."
    );

    if (title === "Uppdateringar och antivirus") return info(
      "Uppdateringar rättar fel och säkerhetshål i Windows och program. Antivirus försöker upptäcka skadliga filer och beteenden.",
      "Windows visar normalt uppdateringar i Inställningar och säkerhetsstatus i Windows Säkerhet.",
      "Att hålla systemen uppdaterade minskar risken att kända säkerhetshål används mot datorn.",
      "Installera vanliga Windows-uppdateringar från Windows egna inställningar i stället för från slumpmässiga popup-rutor."
    );

    if (title === "Offentligt Wi-Fi") return info(
      "Offentligt Wi-Fi är nätverk som många personer kan använda, till exempel på hotell, caféer och stationer.",
      "Nätverkets namn visas i listan över tillgängliga Wi-Fi-nätverk. Ett öppet nätverk kan sakna lösenord.",
      "Var extra försiktig med känsliga aktiviteter och falska nätverksnamn.",
      "Ett nätverk som heter Free_Airport_WiFi behöver inte vara flygplatsens riktiga nätverk bara för att namnet ser trovärdigt ut."
    );

    if (title === "Falsk teknisk support") return info(
      "Supportbedrägeri innebär att någon låtsas vara teknisk support och försöker få pengar, lösenord eller fjärråtkomst till datorn.",
      "Vanliga tecken är oväntade telefonsamtal eller popup-rutor som påstår att datorn är infekterad och kräver omedelbar kontakt.",
      "Ge inte fjärråtkomst eller betalningsuppgifter till någon som kontaktar dig oväntat på det sättet.",
      "Microsoft ringer inte slumpmässigt för att säga att din dator har virus och kräva att du installerar fjärrstyrning."
    );

    return null;
  }

  function everydayExamples(lesson) {
    var moduleId = lesson.moduleId;

    var defaults = {
      basics: [
        "När du startar datorn, kopplar in något eller försöker förstå vad som finns framför dig.",
        "När någon hjälper dig och använder ord som skärm, program, USB eller internet."
      ],
      mouse: [
        "När du klickar på knappar, väljer filer, scrollar på webbsidor eller flyttar saker.",
        "Nästan allt grafiskt arbete i Windows använder mus eller styrplatta."
      ],
      keyboard: [
        "När du skriver mejl, söker på webben, fyller i formulär eller redigerar dokument.",
        "Kortkommandon sparar mycket tid när samma sak görs ofta."
      ],
      windows: [
        "När flera program är öppna samtidigt och du behöver byta mellan dem.",
        "När du vill hitta ett program, flytta ett fönster eller få undan något utan att stänga."
      ],
      files: [
        "När du laddar ner en fil, sparar ett dokument eller försöker hitta något du gjorde igår.",
        "När du skickar en bilaga och måste veta var filen ligger."
      ],
      programs: [
        "När du väljer rätt verktyg för en uppgift: webbläsare för webben, Anteckningar för text, Kalkylator för uträkningar.",
        "När du behöver förstå skillnaden mellan ett program och en fil."
      ],
      internet: [
        "När du söker information, loggar in på en tjänst, laddar ner en fil eller öppnar flera sidor.",
        "När du behöver avgöra om en länk eller webbadress ser rimlig ut."
      ],
      mail: [
        "När du kontaktar företag, vård, skola, arbete, föreningar eller privatpersoner.",
        "När du skickar eller tar emot dokument och bilder som bilagor."
      ],
      security: [
        "När något oväntat ber dig klicka, logga in, betala eller lämna ut information.",
        "När du installerar, laddar ner eller använder ett konto."
      ],
      final: [
        "När en riktig uppgift kräver flera steg och flera program i följd.",
        "När du inte får en detaljerad instruktion utan själv behöver välja rätt verktyg."
      ],
      everyday: [
        "Det här är en sådan uppgift som återkommer ofta i vanligt datoranvändande.",
        "Du kan behöva göra samma sak i arbete, föreningar, myndighetstjänster eller hemma."
      ],
      devices: [
        "När du ansluter tillbehör, nätverk, ljud, kamera eller externa lagringsenheter.",
        "När något fysiskt ska kopplas ihop med datorn."
      ],
      troubleshooting: [
        "När något inte fungerar som du förväntar dig och du behöver lösa problemet lugnt.",
        "När ett program hängt sig, ett meddelande visas eller datorn behöver startas om."
      ]
    };

    return defaults[moduleId] || defaults.everyday;
  }

  function commonMistakes(lesson) {
    var moduleId = lesson.moduleId;

    var defaults = {
      basics: [
        "Att blanda ihop datorn, internet och ett program som om de vore samma sak.",
        "Att klicka bort ett meddelande utan att först läsa vad det faktiskt säger."
      ],
      mouse: [
        "Att dubbelklicka på sådant som bara behöver ett klick.",
        "Att flytta musen samtidigt som man försöker dubbelklicka eller högerklicka."
      ],
      keyboard: [
        "Att tro att Backspace och Delete alltid gör samma sak.",
        "Att Caps Lock råkar vara på och gör att all text blir stor."
      ],
      windows: [
        "Att stänga ett program när man egentligen bara ville minimera det.",
        "Att tro att ett minimerat program har försvunnit."
      ],
      files: [
        "Att inte veta vilken mapp filen sparades eller laddades ner till.",
        "Att byta filnamn utan att förstå filändelsen eller råka skapa flera kopior."
      ],
      programs: [
        "Att försöka öppna en fil i fel typ av program.",
        "Att tro att en webbsida och ett installerat program är samma sak."
      ],
      internet: [
        "Att skriva en sökfråga där man egentligen tänkte skriva en exakt webbadress, eller tvärtom.",
        "Att klicka på första bästa länk utan att kontrollera adress eller avsändare."
      ],
      mail: [
        "Att glömma bilagan trots att texten säger att en fil är bifogad.",
        "Att skriva känslig information till fel mottagare."
      ],
      security: [
        "Att reagera på brådska innan man kontrollerat vem som faktiskt kontaktar en.",
        "Att återanvända samma lösenord på flera viktiga konton."
      ],
      final: [
        "Att börja klicka utan att först fundera på vilken ordning momenten behöver göras.",
        "Att tappa bort var en fil hamnade mellan två program."
      ],
      everyday: [
        "Att klicka vidare snabbt utan att kontrollera vad som faktiskt är markerat eller aktivt.",
        "Att glömma var informationen kom ifrån eller var den sparades."
      ],
      devices: [
        "Att tro att en enhet är trasig när den egentligen bara inte är ansluten eller vald.",
        "Att dra ur lagringsenheter medan filer fortfarande skrivs till dem."
      ],
      troubleshooting: [
        "Att panikklicka på flera saker samtidigt och göra problemet svårare att förstå.",
        "Att starta om hela datorn innan man först provat den enklaste säkra lösningen."
      ]
    };

    return defaults[moduleId] || defaults.everyday;
  }

  (window.DatorskolanLessons || []).forEach(function (lesson) {
    var detail = specific(lesson) || moduleDefault(lesson);
    if (!Array.isArray(detail.everyday) || !detail.everyday.length) {
      detail.everyday = everydayExamples(lesson);
    }
    if (!Array.isArray(detail.mistakes) || !detail.mistakes.length) {
      detail.mistakes = commonMistakes(lesson);
    }
    lesson.detail = detail;
  });
})();