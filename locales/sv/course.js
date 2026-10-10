/* Svenska – kursinnehåll: moduler, lektioner och scenarier. */
(function (global) {
  "use strict";

  global.DatorskolanI18n.register("sv", "course", {
    "modules": {
      "basics": {
        "title": "Datorgrunder",
        "everyday": [
          "När du startar datorn, kopplar in något eller försöker förstå vad som finns framför dig.",
          "När någon hjälper dig och använder ord som skärm, program, USB eller internet."
        ],
        "mistakes": [
          "Att blanda ihop datorn, internet och ett program som om de vore samma sak.",
          "Att klicka bort ett meddelande utan att först läsa vad det faktiskt säger."
        ]
      },
      "mouse": {
        "title": "Mus",
        "everyday": [
          "När du klickar på knappar, väljer filer, scrollar på webbsidor eller flyttar saker.",
          "Nästan allt grafiskt arbete i Windows använder mus eller styrplatta."
        ],
        "mistakes": [
          "Att dubbelklicka på sådant som bara behöver ett klick.",
          "Att flytta musen samtidigt som man försöker dubbelklicka eller högerklicka."
        ]
      },
      "keyboard": {
        "title": "Tangentbord",
        "everyday": [
          "När du skriver mejl, söker på webben, fyller i formulär eller redigerar dokument.",
          "Kortkommandon sparar mycket tid när samma sak görs ofta."
        ],
        "mistakes": [
          "Att tro att Backspace och Delete alltid gör samma sak.",
          "Att Caps Lock råkar vara på och gör att all text blir stor."
        ]
      },
      "windows": {
        "title": "Windows",
        "everyday": [
          "När flera program är öppna samtidigt och du behöver byta mellan dem.",
          "När du vill hitta ett program, flytta ett fönster eller få undan något utan att stänga."
        ],
        "mistakes": [
          "Att stänga ett program när man egentligen bara ville minimera det.",
          "Att tro att ett minimerat program har försvunnit."
        ]
      },
      "files": {
        "title": "Filer och mappar",
        "everyday": [
          "När du laddar ner en fil, sparar ett dokument eller försöker hitta något du gjorde igår.",
          "När du skickar en bilaga och måste veta var filen ligger."
        ],
        "mistakes": [
          "Att inte veta vilken mapp filen sparades eller laddades ner till.",
          "Att byta filnamn utan att förstå filändelsen eller råka skapa flera kopior."
        ]
      },
      "programs": {
        "title": "Program",
        "everyday": [
          "När du väljer rätt verktyg för en uppgift: webbläsare för webben, Anteckningar för text, Kalkylator för uträkningar.",
          "När du behöver förstå skillnaden mellan ett program och en fil."
        ],
        "mistakes": [
          "Att försöka öppna en fil i fel typ av program.",
          "Att tro att en webbsida och ett installerat program är samma sak."
        ]
      },
      "internet": {
        "title": "Internet och webbläsare",
        "everyday": [
          "När du söker information, loggar in på en tjänst, laddar ner en fil eller öppnar flera sidor.",
          "När du behöver avgöra om en länk eller webbadress ser rimlig ut."
        ],
        "mistakes": [
          "Att skriva en sökfråga där man egentligen tänkte skriva en exakt webbadress, eller tvärtom.",
          "Att klicka på första bästa länk utan att kontrollera adress eller avsändare."
        ]
      },
      "mail": {
        "title": "E-post",
        "everyday": [
          "När du kontaktar företag, vård, skola, arbete, föreningar eller privatpersoner.",
          "När du skickar eller tar emot dokument och bilder som bilagor."
        ],
        "mistakes": [
          "Att glömma bilagan trots att texten säger att en fil är bifogad.",
          "Att skriva känslig information till fel mottagare."
        ]
      },
      "security": {
        "title": "Säkerhet",
        "everyday": [
          "När något oväntat ber dig klicka, logga in, betala eller lämna ut information.",
          "När du installerar, laddar ner eller använder ett konto."
        ],
        "mistakes": [
          "Att reagera på brådska innan man kontrollerat vem som faktiskt kontaktar en.",
          "Att återanvända samma lösenord på flera viktiga konton."
        ]
      },
      "everyday": {
        "title": "Vardagsdatorn",
        "everyday": [
          "Det här är uppgifter som återkommer ofta när man använder en dator.",
          "Du kan behöva göra samma sak hemma, på jobbet, i en förening eller hos en myndighet."
        ],
        "mistakes": [
          "Att klicka vidare snabbt utan att kontrollera vad som faktiskt är markerat eller aktivt.",
          "Att glömma var informationen kom ifrån eller var den sparades."
        ]
      },
      "devices": {
        "title": "Enheter & anslutningar",
        "everyday": [
          "När du ansluter tillbehör, nätverk, ljud, kamera eller externa lagringsenheter.",
          "När något fysiskt ska kopplas ihop med datorn."
        ],
        "mistakes": [
          "Att tro att en enhet är trasig när den egentligen bara inte är ansluten eller vald.",
          "Att dra ur en lagringsenhet medan filer fortfarande kopieras till den."
        ]
      },
      "troubleshooting": {
        "title": "När något krånglar",
        "everyday": [
          "När något inte fungerar som du förväntar dig och du behöver lösa problemet lugnt.",
          "När ett program har hängt sig, ett meddelande visas eller datorn behöver startas om."
        ],
        "mistakes": [
          "Att panikklicka på flera saker samtidigt och göra problemet svårare att förstå.",
          "Att starta om hela datorn innan man har provat den enklaste säkra lösningen."
        ]
      },
      "final": {
        "title": "Självständighetsprov",
        "everyday": [
          "När en riktig uppgift kräver flera steg och flera program i följd.",
          "När du inte får en detaljerad instruktion utan själv behöver välja rätt verktyg."
        ],
        "mistakes": [
          "Att börja klicka utan att först fundera på vilken ordning momenten behöver göras.",
          "Att tappa bort var en fil hamnade mellan två program."
        ]
      }
    },
    "lessons": {
      "files-001-create-folder": {
        "title": "Skapa en mapp",
        "summary": "Skapa en ny mapp och ge den ett tydligt namn.",
        "steps": [
          {
            "title": "Vad är en mapp?",
            "text": {
              "default": "En mapp samlar filer på ett ställe. Nu ska du skapa en egen mapp i Dokument.",
              "short": "En mapp samlar filer. Skapa en med Nytt → Mapp.",
              "child": "En mapp är som en låda där du kan lägga saker du vill spara. Med egna mappar blir det lätt att hålla ordning, till exempel en låda för skolarbeten och en för bilder. Nu ska du göra en egen mapp i Dokument."
            }
          },
          {
            "title": "Så går det till",
            "text": "I Utforskaren klickar du på Nytt och väljer Mapp. Den nya mappen heter först Ny mapp och namnet är markerat – skriv det nya namnet direkt och tryck Retur."
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på Nytt i Utforskaren, välj Mapp och skriv namnet Semester.",
              "guided": "Utforskaren är öppen och visar mappen Dokument. Titta på raden med knappar högst upp i fönstret. Längst till vänster sitter knappen Nytt med ett plustecken. Klicka på den. En liten meny öppnas – klicka på Mapp. En ny mapp dyker upp med namnet Ny mapp, och namnet är markerat i blått. Skriv Semester direkt och tryck Retur.",
              "independent": "Skapa en mapp som heter Semester.",
              "child.guided": "Hitta knappen Nytt med ett plustecken högst upp till vänster i fönstret och klicka på den. Välj Mapp. Nu kommer en ny mapp fram! Skriv Semester medan namnet är blått, och tryck Retur."
            },
            "hints": [
              "Utforskaren är öppen i mappen Dokument.",
              "Knappen Nytt sitter längst till vänster i raden med knappar.",
              "Klicka på Nytt och välj Mapp. Skriv Semester medan namnet är markerat.",
              "Den gula ramen visar knappen Nytt.",
              "Nytt → Mapp → skriv Semester → tryck Retur."
            ],
            "nudge": "Tänk på var i Utforskaren man skapar något nytt."
          },
          {
            "title": "Kontroll",
            "text": "Bra. Mappen Semester finns nu i Dokument."
          },
          {
            "title": "Klart",
            "text": "Du kan skapa och namnge en mapp."
          }
        ],
        "detail": {
          "what": "En mapp är en behållare för filer och andra mappar.",
          "recognize": "Mappar har en mappikon. I Utforskaren skapar du en ny mapp med Nytt → Mapp, eller med kortkommandot Ctrl+Shift+N.",
          "use": "Med egna mappar håller du ordning på dokument, bilder och annat.",
          "example": "Mappen Semester kan samla alla bilder och dokument från en resa."
        }
      },
      "programs-001-notepad-save": {
        "title": "Skriv och spara en textfil",
        "summary": "Öppna Anteckningar, skriv text och spara den som plan.txt.",
        "steps": [
          {
            "title": "Spara ditt arbete",
            "text": {
              "default": "Det du skriver i Anteckningar finns först bara i programmet. När du sparar blir texten en fil som finns kvar efter att programmet har stängts.",
              "short": "Spara texten så blir den en fil som finns kvar.",
              "child": "Det du skriver i Anteckningar är som ord på en skrivtavla – de försvinner när du stänger programmet, om du inte sparar. När du sparar blir texten en fil som finns kvar i datorn."
            }
          },
          {
            "title": "Anteckningar",
            "text": "Öppna Anteckningar från Start, skriv några ord och välj Arkiv → Spara som."
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Anteckningar från Start, skriv några ord och spara som plan.txt i Dokument med Arkiv → Spara som.",
              "guided": "Klicka på Start-knappen och sedan på Anteckningar, ikonen med ett blått anteckningsblock. Klicka i den vita ytan och skriv några ord. Klicka sedan på Arkiv högst upp i fönstret och välj Spara som. Kontrollera att Dokument är vald till vänster. Skriv plan.txt i fältet Filnamn längst ned och klicka på Spara.",
              "independent": "Skriv valfri text och spara filen som plan.txt i Dokument.",
              "child.guided": "Klicka på Start-knappen längst ned och sedan på Anteckningar, det blå anteckningsblocket. Skriv några ord i den vita ytan. Klicka på Arkiv högst upp och välj Spara som. Välj Dokument till vänster. Skriv plan.txt som namn och klicka på Spara."
            },
            "hints": [
              "Du behöver programmet Anteckningar. Det finns i Start-menyn.",
              "Klicka i den vita ytan och skriv några ord.",
              "Klicka på Arkiv högst upp och välj Spara som.",
              "Den gula ramen visar menyraden där Arkiv finns.",
              "Start → Anteckningar → skriv → Arkiv → Spara som → kontrollera att Dokument är vald → skriv plan.txt → Spara."
            ],
            "nudge": "Först behöver du ett program där man kan skriva text."
          },
          {
            "title": "Klart",
            "text": "Du har skapat och sparat en textfil."
          }
        ],
        "detail": {
          "what": "Anteckningar är ett enkelt program för text. När du sparar skapas en textfil som slutar på .txt.",
          "recognize": "Anteckningar har menyerna Arkiv, Redigera och Visa högst upp och en stor vit yta för text.",
          "use": "Olika program används för olika saker: Anteckningar för text, Kalkylator för uträkningar och Foton för bilder.",
          "example": "En inköpslista i Anteckningar kan sparas som inkop.txt i Dokument."
        }
      },
      "files-002-recycle-restore": {
        "title": "Återställ från Papperskorgen",
        "summary": "Ta bort en fil och återställ den igen.",
        "steps": [
          {
            "title": "Papperskorgen",
            "text": {
              "default": "När du tar bort en fil hamnar den först i Papperskorgen. Därifrån kan du återställa den till sin gamla plats.",
              "short": "Borttagna filer hamnar i Papperskorgen och kan återställas.",
              "child": "När du tar bort en fil försvinner den inte direkt. Den hamnar i Papperskorgen, som en riktig papperskorg du kan plocka upp saker ur igen. Därifrån kan du ställa tillbaka filen där den låg."
            }
          },
          {
            "title": "Ta bort och återställ",
            "text": {
              "default": "Markera Övningsfil.txt och ta bort den. Öppna sedan Papperskorgen i vänsterspalten, markera filen och välj Återställ markerade objekt.",
              "guided": "Utforskaren visar Dokument. Klicka en gång på Övningsfil.txt så att den blir blåmarkerad. Klicka på Ta bort – knappen med en papperskorg i raden högst upp – eller tryck Delete. Filen försvinner. Titta nu i spalten till vänster och klicka på Papperskorgen längst ned. Där ligger filen. Klicka på den och sedan på Återställ markerade objekt högst upp.",
              "independent": "Ta bort Övningsfil.txt och återställ den sedan från Papperskorgen.",
              "child.guided": "Klicka på Övningsfil.txt så att den blir blå. Klicka på knappen med papperskorgen. Filen åker till Papperskorgen! Klicka på Papperskorgen till vänster, klicka på filen och välj Återställ markerade objekt. Nu är den tillbaka."
            },
            "hints": [
              "Övningsfil.txt ligger i Dokument.",
              "Klicka en gång på filen och klicka sedan på Ta bort (papperskorgen) – eller tryck Delete.",
              "Klicka på Papperskorgen i vänsterspalten.",
              "Den gula ramen visar knapparna i Utforskaren.",
              "Markera Övningsfil.txt → Ta bort → Papperskorgen → markera filen → Återställ markerade objekt."
            ],
            "nudge": "Det du tar bort finns kvar på ett ställe en tid."
          },
          {
            "title": "Klart",
            "text": "Du kan återställa en fil som du har tagit bort."
          }
        ],
        "detail": {
          "what": "Papperskorgen är en mellanstation för filer du har tagit bort. Där kan du ångra dig.",
          "recognize": "Papperskorgen har en papperskorgsikon, både på skrivbordet och i Utforskarens vänsterspalt.",
          "use": "Det ger dig en chans att få tillbaka något du tog bort av misstag.",
          "example": "Ta bort filen, öppna Papperskorgen och välj Återställ markerade objekt."
        }
      },
      "mouse-001-move": {
        "title": "Muspekaren",
        "summary": "Se hur musens rörelse flyttar pekaren på skärmen.",
        "steps": [
          {
            "title": "Muspekaren följer din hand",
            "text": {
              "default": "När du flyttar musen på bordet flyttar sig den lilla pilen – muspekaren – på skärmen. Lyft inte musen, låt den glida.",
              "short": "Musen styr muspekaren på skärmen.",
              "child": "När du flyttar musen på bordet flyttar sig en liten pil på skärmen. Pilen heter muspekaren. Den följer med musen, ungefär som en skugga. Låt musen glida på bordet – du behöver inte lyfta den."
            }
          },
          {
            "title": "Prova en liten rörelse",
            "text": "Flytta musen åt olika håll inne i den blå ytan i övningsfönstret."
          },
          {
            "title": "Flytta pekaren",
            "text": {
              "default": "Rör musen lugnt så att muspekaren rör sig runt inne i den blå ytan. Fortsätt tills mätaren är full.",
              "guided": "Lägg handen ovanpå musen. Titta på skärmen och hitta den lilla vita pilen – det är muspekaren. Skjut nu musen lugnt fram och tillbaka på bordet så att pilen rör sig inne i den blå ytan i övningsfönstret. Mätaren fylls när du rör musen. Fortsätt tills den är full.",
              "independent": "Flytta muspekaren runt i den blå ytan tills mätaren är full.",
              "child.guided": "Lägg handen på musen. Ser du den lilla pilen på skärmen? Den heter muspekaren. Skjut musen fram och tillbaka på bordet så att pilen dansar runt i den blå rutan. Fortsätt tills mätaren är full!"
            },
            "hints": [
              "Lägg handen på musen och rör den lugnt åt något håll.",
              "Pekaren behöver vara inne i den blå ytan för att rörelsen ska räknas.",
              "Flytta musen fram och tillbaka några gånger.",
              "Den gula ramen visar ytan där rörelsen mäts.",
              "För musen långsamt åt höger och vänster inne i ytan tills mätaren visar 100 %."
            ],
            "nudge": "Det är musen på bordet som styr pilen på skärmen."
          },
          {
            "title": "Klart",
            "text": "Du vet nu att musens rörelse styr pekaren."
          }
        ],
        "detail": {
          "what": "Muspekaren är den lilla markören som visar var musen pekar på skärmen.",
          "recognize": "Den är oftast en vit pil. Den byter form beroende på vad du pekar på, till exempel en hand över en länk.",
          "use": "Pekaren måste vara på rätt ställe innan ett klick gör det du vill.",
          "example": "För pekaren till Start-knappen innan du klickar på den."
        }
      },
      "mouse-002-target": {
        "title": "Träffa ett mål",
        "summary": "Öva på att styra pekaren dit du vill.",
        "steps": [
          {
            "title": "Styr pekaren",
            "text": {
              "default": "Nu tränar du precision: att föra pekaren exakt dit du vill. Du behöver inte klicka.",
              "short": "Öva på att föra pekaren exakt dit du vill.",
              "child": "Nu ska du träna på att sikta, som när du siktar med en boll. Du ska föra pilen exakt till rätt ställe. Du behöver inte klicka."
            }
          },
          {
            "title": "Träffa tre mål",
            "text": {
              "default": "För pekaren till målen i nummerordning: först 1, sedan 2 och sist 3. Du behöver inte klicka.",
              "guided": "I övningsfönstret finns tre runda mål med siffrorna 1, 2 och 3. Flytta musen lugnt tills pekaren ligger över cirkeln med siffran 1. Då blir nästa mål blått. För pekaren vidare till 2 och sist till 3. Du behöver inte klicka – det räcker att pekaren hamnar över cirkeln.",
              "independent": "För pekaren till cirkel 1, sedan till 2 och sist till 3.",
              "child.guided": "Hitta cirkeln med siffran 1. Flytta pilen dit så att den ligger över cirkeln. Sedan siktar du på 2 och sist på 3. Du behöver inte klicka, bara sikta!"
            },
            "hints": [
              "Börja med cirkeln som har siffran 1.",
              "Det räcker att pekaren hamnar över cirkeln – du ska inte klicka.",
              "Ta ett mål i taget i nummerordning. Nästa mål blir blått när det är dags.",
              "Den gula ramen visar ytan med målen.",
              "För pekaren över 1, sedan 2 och sist 3."
            ],
            "nudge": "Siffrorna visar i vilken ordning du ska ta målen."
          },
          {
            "title": "Klart",
            "text": "Du kan styra pekaren till en bestämd plats."
          }
        ],
        "detail": {
          "what": "Precision betyder att kunna placera muspekaren på just det du vill använda.",
          "recognize": "Små knappar, länkar och ikoner kräver att pilens spets hamnar rätt.",
          "use": "Bra precision ger färre felklick och gör datorn lättare att använda.",
          "example": "Först flyttar du pekaren till knappen. Sedan klickar du."
        }
      },
      "mouse-003-click": {
        "title": "Vänsterklick",
        "summary": "Lär dig klicka en gång med vänster musknapp.",
        "steps": [
          {
            "title": "Ett klick",
            "text": {
              "default": "Ett vanligt klick görs med den vänstra musknappen: tryck ned och släpp direkt, en gång.",
              "short": "Ett klick är ett kort tryck på vänster musknapp.",
              "child": "Musen har två knappar på ovansidan. Den vänstra använder du nästan hela tiden. Ett klick är ett snabbt tryck – tryck ned och släpp direkt, som när du trycker på en ringklocka."
            }
          },
          {
            "title": "Klicka en gång",
            "text": {
              "default": "Peka på den blå knappen och tryck en gång på vänster musknapp.",
              "guided": "Musen har två knappar på ovansidan. Du ska använda den vänstra, som ligger under ditt pekfinger. Flytta först pekaren så att den ligger på den blå knappen i övningsfönstret. Tryck sedan ned vänster musknapp och släpp direkt – en gång.",
              "independent": "Klicka exakt en gång på den blå knappen.",
              "child.guided": "Flytta pilen till den blå knappen. Tryck sedan en gång på musens vänstra knapp, den under pekfingret. Tryck och släpp direkt – klick!"
            },
            "hints": [
              "Använd knappen på musens vänstra sida.",
              "För pekaren till den blå knappen först.",
              "Tryck ned vänster musknapp och släpp direkt – bara en gång.",
              "Den gula ramen visar knappen du ska klicka på.",
              "Pekaren på knappen → tryck vänster musknapp en gång → släpp."
            ],
            "nudge": "Det finns två knappar på musen. Den ena används nästan hela tiden."
          },
          {
            "title": "Klart",
            "text": "Du kan göra ett vanligt vänsterklick."
          }
        ],
        "detail": {
          "what": "Ett vänsterklick är ett snabbt tryck och släpp på musens vänstra knapp.",
          "recognize": "Ett klick brukar välja en knapp, markera en fil eller placera textmarkören i ett fält.",
          "use": "Vänsterklick är det vanligaste klicket i Windows.",
          "example": "Klicka en gång på en fil så blir den markerad utan att öppnas."
        }
      },
      "mouse-004-double-click": {
        "title": "Dubbelklick",
        "summary": "Öppna saker med två snabba klick på samma ställe.",
        "steps": [
          {
            "title": "Två snabba klick",
            "text": {
              "default": "Ett dubbelklick är två vänsterklick tätt efter varandra, utan att flytta musen emellan. Det används för att öppna filer, mappar och ikoner på skrivbordet.",
              "short": "Två snabba klick öppnar filer, mappar och ikoner.",
              "child": "Ett dubbelklick är två klick direkt efter varandra: klick-klick. Det är så du öppnar saker på skrivbordet, till exempel en mapp. Håll musen stilla medan du klickar."
            }
          },
          {
            "title": "Dubbelklicka",
            "text": {
              "default": "Peka på den blå knappen och klicka snabbt två gånger med vänster musknapp utan att flytta musen.",
              "guided": "Flytta pekaren till den blå knappen i övningsfönstret. Håll musen helt stilla. Tryck nu snabbt två gånger på vänster musknapp, klick-klick, med så kort paus som möjligt. Om det blir för långsamt räknas det som två vanliga klick – prova då igen lite snabbare.",
              "independent": "Dubbelklicka på den blå knappen.",
              "child.guided": "Flytta pilen till den blå knappen och håll musen stilla. Klicka två gånger snabbt med vänster knapp: klick-klick! Blev det för långsamt? Prova igen lite snabbare."
            },
            "hints": [
              "Det behövs två klick.",
              "Båda klicken ska vara på samma knapp – håll musen stilla.",
              "Klicka två gånger snabbt med vänster musknapp: klick-klick.",
              "Den gula ramen visar knappen du ska dubbelklicka på.",
              "Håll pekaren stilla över knappen och klicka snabbt två gånger med vänster musknapp."
            ],
            "nudge": "Att öppna något kräver mer än ett klick."
          },
          {
            "title": "Klart",
            "text": "Du kan dubbelklicka."
          }
        ],
        "detail": {
          "what": "Ett dubbelklick är två snabba vänsterklick på samma ställe.",
          "recognize": "Det används ofta för att öppna filer, mappar och ikoner på skrivbordet.",
          "use": "Klicken behöver komma tätt efter varandra och pekaren ska ligga stilla på samma sak.",
          "example": "Dubbelklicka på ikonen Dokument på skrivbordet för att öppna mappen."
        }
      },
      "mouse-005-right-click": {
        "title": "Högerklick",
        "summary": "Lär dig använda musens högra knapp.",
        "steps": [
          {
            "title": "Den andra musknappen",
            "text": {
              "default": "Den högra musknappen öppnar oftast en meny med fler val för det du pekar på. Den kallas snabbmeny.",
              "short": "Höger musknapp öppnar en snabbmeny med fler val.",
              "child": "Den högra musknappen är som en fråga: \"Vad kan jag göra med det här?\" När du trycker på den kommer en meny fram med olika val. Menyn kallas snabbmeny."
            }
          },
          {
            "title": "Högerklicka",
            "text": {
              "default": "Peka på den blå knappen och tryck en gång på höger musknapp.",
              "guided": "Den här gången ska du använda den högra knappen på musen – den under långfingret. Flytta pekaren till den blå knappen i övningsfönstret. Tryck sedan en gång på höger musknapp och släpp.",
              "independent": "Högerklicka på den blå knappen.",
              "child.guided": "Flytta pilen till den blå knappen. Tryck en gång på musens högra knapp, den under långfingret. Tryck och släpp!"
            },
            "hints": [
              "Använd inte vänster musknapp den här gången.",
              "För pekaren till den blå knappen först.",
              "Tryck en gång på knappen på musens högra sida.",
              "Den gula ramen visar knappen som väntar på ett högerklick.",
              "Pekaren på knappen → tryck höger musknapp en gång → släpp."
            ],
            "nudge": "Musen har en knapp till, som du inte har använt än."
          },
          {
            "title": "Klart",
            "text": "Du kan skilja på vänsterklick och högerklick."
          }
        ],
        "detail": {
          "what": "Ett högerklick är ett klick med musens högra knapp. Det öppnar oftast en meny med val för det du klickade på.",
          "recognize": "Efter ett högerklick visas en liten meny nära muspekaren.",
          "use": "Högerklick används när du vill se vad du kan göra med något, till exempel byta namn, kopiera eller ta bort.",
          "example": "Högerklicka på en fil för att se val som gäller just den filen."
        }
      },
      "mouse-006-scroll": {
        "title": "Scrolla",
        "summary": "Rulla innehåll nedåt och uppåt med mushjulet.",
        "steps": [
          {
            "title": "Mushjulet",
            "text": {
              "default": "Hjulet mellan musknapparna flyttar innehållet uppåt och nedåt. Rullar du hjulet mot dig går sidan nedåt. Rullar du bort från dig går den uppåt.",
              "short": "Mushjulet flyttar innehållet uppåt och nedåt.",
              "child": "Mellan musknapparna sitter ett litet hjul. Snurra det mot dig så glider sidan nedåt, som när du rullar fram en lång papperslapp. Snurra det bort från dig så går sidan uppåt igen."
            }
          },
          {
            "title": "Ned och upp",
            "text": {
              "default": "Lägg pekaren på listan och rulla mushjulet mot dig tills du ser slutet. Rulla sedan bort från dig för att komma upp igen.",
              "guided": "Hitta hjulet mellan musens två knappar. Flytta pekaren så att den ligger över listan med rader i övningsfönstret. Rulla hjulet mot dig med pekfingret – listan glider nedåt. Fortsätt tills du ser slutet av listan. Rulla sedan hjulet bort från dig tills du är högst upp igen.",
              "independent": "Scrolla först nedåt till slutet av listan och sedan uppåt igen.",
              "child.guided": "Lägg pilen på listan. Snurra hjulet på musen mot dig – då åker listan nedåt. När du kommit till slutet snurrar du hjulet åt andra hållet, så åker den upp igen."
            },
            "hints": [
              "Lägg pekaren över listan med rader.",
              "Rulla hjulet mot dig för att komma nedåt.",
              "När du har kommit långt ned: rulla hjulet bort från dig för att komma uppåt.",
              "Den gula ramen visar listan du ska scrolla i.",
              "Pekaren på listan → rulla mot dig (nedåt) → rulla bort från dig (uppåt). På en styrplatta drar du två fingrar."
            ],
            "nudge": "Musen har mer än två knappar. Något på den kan rulla."
          },
          {
            "title": "Klart",
            "text": "Du kan scrolla åt båda hållen."
          }
        ],
        "detail": {
          "what": "Att scrolla betyder att flytta innehållet uppåt eller nedåt när allt inte får plats på skärmen samtidigt.",
          "recognize": "På en mus används hjulet mellan vänster och höger knapp. På en styrplatta drar du oftast med två fingrar.",
          "use": "Du scrollar på webbsidor, i dokument, i listor och i Utforskaren.",
          "example": "Rulla hjulet mot dig för att se det som står längre ned på en lång webbsida."
        }
      },
      "mouse-007-hold": {
        "title": "Klicka och håll",
        "summary": "Öva på att hålla vänster musknapp nedtryckt.",
        "steps": [
          {
            "title": "Håll knappen nere",
            "text": {
              "default": "Ibland ska du inte släppa musknappen direkt. Du trycker ned och håller kvar. Det behövs bland annat när du drar något.",
              "short": "Tryck ned musknappen och håll kvar.",
              "child": "Ibland ska du inte släppa knappen direkt. Du trycker ned och håller kvar en stund, som när du håller i ett handtag. Det behövs till exempel när du ska flytta något på skärmen."
            }
          },
          {
            "title": "Håll tills mätaren är full",
            "text": {
              "default": "Peka på den blå knappen, tryck ned vänster musknapp och håll kvar tills mätaren är full.",
              "guided": "Flytta pekaren till den blå knappen i övningsfönstret. Tryck ned vänster musknapp – men släpp inte. Håll fingret kvar på knappen. Mätaren fylls medan du håller. När den är full kan du släppa. Det tar ungefär en sekund.",
              "independent": "Tryck ned vänster musknapp på den blå knappen och håll kvar tills mätaren är full.",
              "child.guided": "Flytta pilen till den blå knappen. Tryck ned vänster musknapp och håll kvar – släpp inte än! Räkna lugnt till två. När mätaren är full får du släppa."
            },
            "hints": [
              "Tryck på den blå knappen med vänster musknapp.",
              "Släpp inte direkt.",
              "Håll knappen nere i ungefär en sekund.",
              "Den gula ramen visar knappen du ska hålla ned.",
              "Pekaren på knappen → tryck ned vänster musknapp → håll kvar tills mätaren är full → släpp."
            ],
            "nudge": "Ett vanligt klick är för kort den här gången."
          },
          {
            "title": "Klart",
            "text": "Du kan hålla musknappen nedtryckt."
          }
        ],
        "detail": {
          "what": "Klicka och håll betyder att trycka ned en musknapp utan att släppa den direkt.",
          "recognize": "Det du håller i är aktivt så länge knappen är nedtryckt.",
          "use": "Det behövs till exempel när du ska dra en fil eller ett fönster.",
          "example": "Tryck ned vänster musknapp på en fil och håll kvar innan du börjar flytta musen."
        }
      },
      "mouse-008-drag": {
        "title": "Dra och släpp",
        "summary": "Flytta något genom att hålla, dra och släppa.",
        "steps": [
          {
            "title": "Tryck, håll, dra, släpp",
            "text": {
              "default": "För att flytta något håller du vänster musknapp nere medan du flyttar musen. När du är framme släpper du knappen.",
              "short": "Håll ned knappen, flytta musen och släpp där du vill ha saken.",
              "child": "Att dra och släppa är som att plocka upp en leksak och lägga den på ett nytt ställe. Du trycker ned vänster musknapp på saken, håller kvar medan du flyttar musen och släpper när du är framme."
            }
          },
          {
            "title": "Flytta rutan",
            "text": {
              "default": "Tryck och håll på rutan Dra mig, flytta den till rutan Släpp här och släpp musknappen där.",
              "guided": "Flytta pekaren till den blå rutan som heter Dra mig. Tryck ned vänster musknapp och håll kvar. Flytta nu musen – rutan följer med – tills den ligger över rutan Släpp här. Släpp musknappen först när du är framme.",
              "independent": "Dra den blå rutan Dra mig till rutan Släpp här och släpp den där.",
              "child.guided": "Lägg pilen på den blå rutan Dra mig. Tryck ned vänster knapp och håll kvar, så har du \"plockat upp\" rutan. Flytta den till Släpp här och släpp knappen där."
            },
            "hints": [
              "Börja på den blå rutan Dra mig.",
              "Tryck ned vänster musknapp och håll kvar.",
              "Flytta musen mot rutan Släpp här medan du håller knappen nere.",
              "Den gula ramen visar ytan med båda rutorna.",
              "Tryck och håll på Dra mig → dra till Släpp här → släpp musknappen."
            ],
            "nudge": "Det du tränade i förra lektionen behövs igen."
          },
          {
            "title": "Klart",
            "text": "Du kan dra och släppa."
          }
        ],
        "detail": {
          "what": "Dra och släpp betyder att hålla musknappen nere, flytta något och sedan släppa knappen på det nya stället.",
          "recognize": "Det du drar följer med pekaren eller blir halvgenomskinligt medan du drar.",
          "use": "Du kan flytta filer, fönster och andra saker på det här sättet.",
          "example": "Dra en fil från Dokument till Hämtade filer och släpp den där."
        }
      },
      "mouse-009-final": {
        "title": "Mus – slutuppdrag",
        "summary": "Visa att du kan använda musens viktigaste funktioner på egen hand.",
        "steps": [
          {
            "title": "Nu gör du själv",
            "text": {
              "default": "Slutuppdraget har sex moment. Du väljer själv ordning och får inga steg-för-steg-instruktioner.",
              "short": "Sex mus-moment i valfri ordning.",
              "child": "Nu är det dags att visa allt du kan med musen! Det finns sex små uppdrag. Du bestämmer själv i vilken ordning du gör dem."
            }
          },
          {
            "title": "Klara alla sex moment",
            "text": {
              "default": "Gör alla sex moment i övningsfönstret: flytta, klicka, dubbelklicka, högerklicka, scrolla och dra och släpp. Listan visar vad som är klart.",
              "guided": "Övningsfönstret har sex rutor, en för varje sak du har tränat. Ta dem en i taget. Rör pekaren i rutan Flytta. Klicka en gång på rutan Klick. Dubbelklicka på rutan Dubbelklick. Högerklicka på rutan Högerklick. Rulla hjulet ned och upp i rutan Scrolla. Dra till sist rutan Dra till rutan Släpp här. Listan under rutorna bockar av det du har gjort.",
              "independent": "Flytta, klicka, dubbelklicka, högerklicka, scrolla och dra och släpp i övningsfönstret.",
              "child.guided": "Det finns sex rutor, en för varje musknep du kan. Börja med Flytta och gå sedan vidare en ruta i taget. Listan under rutorna visar vad du redan klarat. Kan du få alla sex?"
            },
            "hints": [
              "Titta på namnen på de sex rutorna.",
              "Varje ruta tränar något du redan har gjort.",
              "Listan under rutorna visar vilka moment som är klara.",
              "Den gula ramen visar de sex rutorna.",
              "Rör pekaren i Flytta, klicka på Klick, dubbelklicka på Dubbelklick, högerklicka på Högerklick, scrolla ned och upp i Scrolla och dra Dra till Släpp här."
            ],
            "nudge": "Varje ruta har samma namn som en lektion du redan har gjort."
          },
          {
            "title": "Musmodulen är klar",
            "text": "Du har använt musens viktigaste funktioner på egen hand."
          }
        ],
        "detail": {
          "what": "Det här uppdraget kombinerar allt du har lärt dig om musen.",
          "recognize": "Muspekaren är oftast en vit pil. Över text kan den se ut som ett lodrätt streck och över en länk som en hand.",
          "use": "Musen används för att peka, välja, öppna, flytta och scrolla.",
          "example": "Du för pekaren till en knapp och klickar för att välja den."
        }
      },
      "basics-001-computer": {
        "title": "Vad är en dator?",
        "summary": "Lär känna datorn, skärmen, musen och tangentbordet.",
        "steps": [
          {
            "title": "Vad är en dator?",
            "text": {
              "default": "Datorn är maskinen som kör programmen och sparar dina filer. Skärmen visar vad som händer. Med musen pekar och klickar du, och med tangentbordet skriver du.",
              "short": "Datorn kör program och sparar filer. Du styr den med mus och tangentbord.",
              "child": "Datorn är en maskin som kan göra massor av saker: visa filmer, spara dina teckningar och låta dig skriva. Skärmen är som ett fönster in i datorn. Med musen pekar du på saker, och med tangentbordet skriver du bokstäver."
            }
          },
          {
            "title": "Klart",
            "text": "Nu vet du vad de vanligaste delarna heter. Det gör resten av kursen lättare att följa."
          }
        ],
        "detail": {
          "what": "En dator är en maskin som kan köra program, spara filer och visa information. Själva datorn är inte samma sak som skärmen, internet eller ett enskilt program.",
          "recognize": "På en bärbar dator sitter skärm, tangentbord och dator ihop i en enhet. På en stationär dator är skärm, tangentbord, mus och själva datorlådan ofta separata delar.",
          "use": "Datorn används till allt från att skriva och räkna till bilder, internet, e-post, bank och myndighetstjänster.",
          "example": "När du öppnar Kalkylator kör datorn ett program. När du sparar ett dokument sparar datorn en fil."
        }
      },
      "basics-002-power": {
        "title": "Ström och laddning",
        "summary": "Förstå strömknappen, laddaren och batteriet.",
        "steps": [
          {
            "title": "Ström och laddning",
            "text": {
              "default": "Strömknappen startar datorn. En bärbar dator har ett batteri som laddas med en laddare. När du är klar stänger du av datorn via Start-menyn – inte genom att hålla inne strömknappen.",
              "short": "Starta med strömknappen. Stäng av via Start-menyn.",
              "child": "Strömknappen sätter igång datorn. En bärbar dator har ett batteri, ungefär som en mobil, och behöver laddas ibland. När du är klar stänger du av den via Start-menyn. Håll inte in strömknappen – då kan saker du inte har sparat försvinna."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet hur datorn startas, laddas och stängs av på rätt sätt."
          }
        ],
        "detail": {
          "what": "Datorn behöver ström. En bärbar dator har ett batteri som laddas med en laddare.",
          "recognize": "Strömknappen har ofta en symbol med en ring och ett streck. I Windows visas batteriets nivå nere till höger, nära klockan.",
          "use": "Du behöver veta hur datorn startas, laddas och stängs av på rätt sätt.",
          "example": "Om batteriet nästan är slut ansluter du laddaren. När du är klar väljer du Start → Ström → Stäng av i stället för att hålla inne strömknappen."
        }
      },
      "basics-003-audio-usb": {
        "title": "USB och ljud",
        "summary": "Lär dig vad USB, högtalare och hörlurar är.",
        "steps": [
          {
            "title": "USB och ljud",
            "text": {
              "default": "USB är uttag där du ansluter tillbehör som mus, tangentbord och USB-minne. Ljud spelas upp i datorns högtalare eller i hörlurar.",
              "short": "USB-uttag är till för tillbehör. Ljud hörs i högtalare eller hörlurar.",
              "child": "USB-uttagen är små avlånga hål på datorn. Där kan du koppla in saker som en mus, ett tangentbord eller ett USB-minne. Ljudet kommer ut ur datorns högtalare, eller ur hörlurar om du kopplar in sådana."
            }
          },
          {
            "title": "Klart",
            "text": "Du känner igen USB-uttag och vet var ljudet kommer ifrån."
          }
        ],
        "detail": {
          "what": "USB är en vanlig typ av uttag för tillbehör och lagring. Ljud kan spelas upp i högtalare eller hörlurar.",
          "recognize": "Ett USB-uttag sitter på datorns sida eller baksida. USB-A är rektangulärt och USB-C är mindre och avlångt med rundade kanter.",
          "use": "USB används för mus, tangentbord, USB-minne, telefon och andra tillbehör.",
          "example": "Ett USB-minne med filer visas i Utforskaren när du sätter i det."
        }
      },
      "basics-004-internet": {
        "title": "Datorn är inte internet",
        "summary": "Förstå skillnaden mellan datorn, internet och webbläsaren.",
        "steps": [
          {
            "title": "Datorn är inte internet",
            "text": {
              "default": "Datorn är själva apparaten. Internet är nätverket som kopplar ihop datorer över hela världen. Webbläsaren – till exempel Microsoft Edge eller Google Chrome – är programmet som använder internet för att visa webbsidor.",
              "short": "Datorn är apparaten, internet är nätverket och webbläsaren visar webbsidor.",
              "child": "Datorn är själva maskinen framför dig. Internet är som ett väldigt stort nät av vägar mellan datorer i hela världen. Webbläsaren, till exempel Microsoft Edge eller Google Chrome, är programmet du använder för att åka på de vägarna och titta på webbsidor."
            }
          },
          {
            "title": "Klart",
            "text": "Du kan skilja på datorn, internet och webbläsaren."
          }
        ],
        "detail": {
          "what": "Datorn, internet och webbläsaren är tre olika saker. Datorn är apparaten. Internet är nätverket. Webbläsaren är programmet som visar webbsidor.",
          "recognize": "Webbläsaren har flikar och ett adressfält högst upp. Internet har ingen egen ikon som du arbetar i.",
          "use": "Skillnaden är viktig när någon säger att ”internet inte fungerar” eller ber dig öppna webbläsaren.",
          "example": "Du startar webbläsaren på datorn. Webbläsaren använder internet för att öppna en webbsida."
        }
      },
      "keyboard-001-letters": {
        "title": "Bokstäver",
        "summary": "Skriv ett ord med bokstavstangenterna.",
        "steps": [
          {
            "title": "Bokstäver",
            "text": {
              "default": "Bokstavstangenterna sitter i mitten av tangentbordet. När du trycker på en tangent visas bokstaven där textmarkören – det blinkande strecket – står.",
              "short": "Bokstavstangenterna skriver där textmarkören blinkar.",
              "child": "Tangentbordet har en knapp för varje bokstav. När du trycker på en knapp kommer bokstaven fram på skärmen, precis där ett litet blinkande streck står. Strecket heter textmarkören och visar var nästa bokstav hamnar."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i den vita rutan och skriv ordet dator.",
              "guided": "Titta på övningsfönstret. Där finns en vit ruta. Klicka en gång i den – då börjar ett litet streck blinka. Det är textmarkören, och den visar var bokstäverna hamnar. Leta sedan upp bokstäverna på tangentbordet och tryck på dem en i taget: d, a, t, o, r.",
              "independent": "Skriv ordet dator i rutan.",
              "child.guided": "Klicka i den vita rutan så att ett litet streck blinkar där. Leta upp d på tangentbordet och tryck på den. Fortsätt med a, t, o och r. Då står det dator!"
            },
            "hints": [
              "Klicka först i den vita rutan så att textmarkören blinkar där.",
              "Leta upp bokstaven d på tangentbordet.",
              "Skriv en bokstav i taget: d, a, t, o, r.",
              "Den gula ramen visar rutan du ska skriva i.",
              "Klicka i rutan och skriv d a t o r med små bokstäver."
            ],
            "nudge": "Innan du skriver måste datorn veta var texten ska hamna."
          },
          {
            "title": "Klart",
            "text": "Du kan skriva ord med bokstavstangenterna."
          }
        ],
        "detail": {
          "what": "Bokstavstangenterna används för att skriva text.",
          "recognize": "Tangenterna A–Ö sitter i mitten av tangentbordet. Svenska tangentbord har även Å, Ä och Ö till höger.",
          "use": "När en textruta är aktiv hamnar bokstaven där textmarkören står.",
          "example": "Trycker du D, A, T, O, R visas ordet dator i rutan."
        }
      },
      "keyboard-002-numbers": {
        "title": "Siffror",
        "summary": "Skriv siffror med sifferraden.",
        "steps": [
          {
            "title": "Siffror",
            "text": {
              "default": "Siffrorna 1 till 0 sitter i raden ovanför bokstäverna. Större tangentbord har också en sifferdel längst till höger.",
              "short": "Siffrorna sitter i raden ovanför bokstäverna.",
              "child": "Siffrorna sitter i en egen rad ovanför bokstäverna, från 1 till 0. Vissa stora tangentbord har dessutom en liten sifferruta längst till höger, nästan som en miniräknare."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i rutan och skriv 12345 med sifferraden ovanför bokstäverna.",
              "guided": "Klicka först i den vita rutan i övningsfönstret så att textmarkören blinkar där. Titta sedan på tangentbordet: siffrorna sitter i raden ovanför bokstäverna och börjar med 1 till vänster. Tryck 1, 2, 3, 4 och 5, en i taget.",
              "independent": "Skriv 12345 i rutan.",
              "child.guided": "Klicka i rutan. Hitta raden med siffror ovanför bokstäverna. Tryck på 1, sedan 2, 3, 4 och 5. Inga mellanslag!"
            },
            "hints": [
              "Leta efter raden med siffror ovanför bokstäverna.",
              "Klicka i rutan först.",
              "Skriv en siffra i taget: 1, 2, 3, 4, 5.",
              "Den gula ramen visar rutan du ska skriva i.",
              "Skriv exakt 12345 – inga mellanslag."
            ],
            "nudge": "Siffrorna har en egen rad på tangentbordet."
          },
          {
            "title": "Klart",
            "text": "Du kan skriva siffror."
          }
        ],
        "detail": {
          "what": "Siffertangenterna skriver tal och nummer.",
          "recognize": "Siffrorna 1–0 sitter i raden ovanför bokstäverna. Större tangentbord har också en sifferdel till höger.",
          "use": "Siffror behövs i datum, telefonnummer, priser, adresser och uträkningar.",
          "example": "För att skriva 2026 trycker du 2, 0, 2, 6."
        }
      },
      "keyboard-003-editing": {
        "title": "Mellanslag, Retur, Backspace och Delete",
        "summary": "Lär dig de viktigaste tangenterna för att rätta text.",
        "steps": [
          {
            "title": "Rätta text",
            "text": {
              "default": "Mellanslag gör ett mellanrum. Retur (Enter) gör en ny rad. Backspace tar bort tecknet till vänster om textmarkören. Delete tar bort tecknet till höger.",
              "short": "Mellanslag ger mellanrum, Retur ny rad. Backspace och Delete tar bort.",
              "child": "Fyra tangenter hjälper dig att skriva snyggt. Mellanslag gör ett tomrum mellan orden. Retur hoppar ned till en ny rad. Backspace suddar bokstaven till vänster om textmarkören, och Delete suddar den till höger – som ett suddgummi åt varsitt håll."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i textrutan och tryck på Mellanslag, Backspace, Delete och Retur minst en gång var.",
              "guided": "Klicka först i textrutan i övningsfönstret. Hitta sedan tangenterna en i taget. Mellanslag är den långa tangenten längst ned. Retur är den stora tangenten till höger, ofta med en böjd pil. Backspace sitter ovanför Retur och har en pil åt vänster. Delete sitter högre upp till höger och kan heta Del. Tryck på var och en minst en gång. Listan under rutan bockar av dem.",
              "independent": "Använd Mellanslag, Backspace, Delete och Retur minst en gång var i textrutan.",
              "child.guided": "Klicka i textrutan. Tryck på den långa tangenten längst ned – det är Mellanslag. Tryck på den stora tangenten till höger – Retur. Hitta Backspace ovanför Retur och Delete (Del) uppe till höger. Listan visar vilka du har klarat."
            },
            "hints": [
              "Klicka i textrutan först.",
              "Mellanslag är den långa tangenten längst ned.",
              "Backspace sitter ovanför Retur och har ofta en pil åt vänster. Delete kan heta Del.",
              "Listan under textrutan visar vilka tangenter du redan har använt.",
              "Tryck Mellanslag, Backspace, Delete och Retur – i vilken ordning du vill."
            ],
            "nudge": "Det handlar om tangenterna du använder när du rättar och ordnar text."
          },
          {
            "title": "Klart",
            "text": "Du kan använda tangenterna som rättar text."
          }
        ],
        "detail": {
          "what": "Mellanslag gör ett mellanrum. Retur gör ofta en ny rad eller bekräftar. Backspace tar bort tecknet till vänster. Delete tar bort tecknet till höger eller något som är markerat.",
          "recognize": "Mellanslag är den långa tangenten längst ned. Retur är stor och sitter till höger. Backspace har ofta en pil åt vänster. Delete kan heta Del.",
          "use": "De här tangenterna använder du hela tiden när du skriver och rättar.",
          "example": "I texten ”HejX världen” kan du ta bort X med Backspace om markören står efter X, eller med Delete om den står före."
        }
      },
      "keyboard-004-shiftcaps": {
        "title": "Shift och Caps Lock",
        "summary": "Skriv stora bokstäver på två olika sätt.",
        "steps": [
          {
            "title": "Stora bokstäver",
            "text": {
              "default": "Håll ned Shift samtidigt som du trycker en bokstav så blir den stor. Caps Lock slår på stora bokstäver tills du trycker på Caps Lock igen.",
              "short": "Shift ger en stor bokstav. Caps Lock ger stora bokstäver tills du stänger av den.",
              "child": "Stora bokstäver gör du på två sätt. Håller du ned Shift när du trycker på en bokstav blir just den bokstaven stor. Caps Lock är som en strömbrytare: tryck en gång så blir alla bokstäver stora, tryck igen så blir de små."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Skriv en stor bokstav genom att hålla ned Shift. Tryck sedan på Caps Lock och skriv en bokstav till.",
              "guided": "Klicka i rutan i övningsfönstret. Leta upp Shift – tangenten med en pil uppåt, som finns på båda sidor av tangentbordet. Håll ned Shift med ena handen och tryck på en bokstav med den andra. Släpp Shift. Tryck sedan en gång på Caps Lock, som sitter till vänster om A, och skriv en bokstav till. Tryck på Caps Lock igen efteråt så att den stängs av.",
              "independent": "Gör en stor bokstav med Shift. Tryck sedan på Caps Lock och skriv en bokstav till.",
              "child.guided": "Klicka i rutan. Håll ned Shift (pilen uppåt) och tryck på en bokstav – nu blev den stor! Tryck sedan på Caps Lock till vänster om A och skriv en bokstav till. Tryck Caps Lock igen när du är klar."
            },
            "hints": [
              "Klicka i rutan först.",
              "Shift har en pil uppåt och finns på båda sidor av tangentbordet.",
              "Håll ned Shift och tryck en bokstav. Släpp sedan Shift.",
              "Caps Lock sitter till vänster om A. Tryck på den och skriv en bokstav.",
              "Shift + bokstav, sedan Caps Lock + en bokstav. Tryck Caps Lock igen efteråt så att den stängs av."
            ],
            "nudge": "Det finns två sätt att få stora bokstäver."
          },
          {
            "title": "Klart",
            "text": "Du kan skriva stora bokstäver med både Shift och Caps Lock."
          }
        ],
        "detail": {
          "what": "Shift ger en stor bokstav (eller tecknet högst upp på en tangent) så länge du håller den nere. Caps Lock låser stora bokstäver tills du stänger av den.",
          "recognize": "Shift har en pil uppåt och finns på båda sidor. Caps Lock sitter till vänster om A och har ofta en liten lampa.",
          "use": "Shift passar för enstaka stora bokstäver. Caps Lock passar när många bokstäver i rad ska vara stora.",
          "example": "Håll Shift och tryck d så får du D. Släpp Shift så blir nästa bokstav liten igen."
        }
      },
      "keyboard-005-arrows": {
        "title": "Piltangenter",
        "summary": "Flytta med piltangenterna.",
        "steps": [
          {
            "title": "Piltangenter",
            "text": {
              "default": "De fyra piltangenterna flyttar textmarkören eller markeringen upp, ned, åt vänster och åt höger – utan mus.",
              "short": "Piltangenterna flyttar markören eller markeringen utan mus.",
              "child": "Längst ned till höger på tangentbordet sitter fyra tangenter med pilar. De flyttar saker uppåt, nedåt, åt vänster och åt höger – lite som en styrspak i ett spel."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i rutan med pricken och flytta den uppåt, nedåt, åt vänster och åt höger med piltangenterna.",
              "guided": "Klicka först i rutan med den blå pricken i övningsfönstret. Titta sedan längst ned till höger på tangentbordet: där sitter fyra tangenter med pilar, ↑ ↓ ← →. Tryck en gång på varje pil. Pricken flyttar sig åt det håll pilen pekar. Listan under rutan visar vilka håll du har använt.",
              "independent": "Flytta den blå pricken åt alla fyra håll med piltangenterna.",
              "child.guided": "Klicka i rutan med pricken. Hitta de fyra piltangenterna längst ned till höger. Tryck på varje pil en gång och se hur pricken flyttar sig!"
            },
            "hints": [
              "Klicka i rutan med pricken först.",
              "Piltangenterna sitter längst ned till höger på tangentbordet.",
              "Tryck pil upp, pil ned, pil vänster och pil höger.",
              "Listan under rutan visar vilka håll du redan har använt.",
              "Klicka i rutan → tryck ↑, ↓, ← och → en gång var."
            ],
            "nudge": "Det finns tangenter som pekar åt olika håll."
          },
          {
            "title": "Klart",
            "text": "Du kan använda piltangenterna."
          }
        ],
        "detail": {
          "what": "Piltangenterna flyttar textmarkören eller markeringen upp, ned, åt vänster och åt höger.",
          "recognize": "De fyra tangenterna har pilar och sitter längst ned till höger.",
          "use": "De används för att flytta i text, i menyer och i listor utan mus.",
          "example": "Tryck vänsterpil i en textrad för att flytta textmarkören ett tecken åt vänster."
        }
      },
      "keyboard-006-tabesc": {
        "title": "Tab och Esc",
        "summary": "Flytta mellan knappar med Tab och avbryt med Esc.",
        "steps": [
          {
            "title": "Tab och Esc",
            "text": {
              "default": "Tab flyttar till nästa knapp eller fält. Shift+Tab flyttar bakåt. Esc betyder oftast avbryt eller stäng.",
              "short": "Tab går till nästa fält. Esc avbryter eller stänger.",
              "child": "Tab är en genväg: den hoppar till nästa knapp eller ruta utan att du behöver musen. Esc är nödutgången – den stänger eller avbryter det som just öppnats."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Tryck på Tab några gånger för att flytta mellan knapparna. Stäng sedan tipsrutan med Esc.",
              "guided": "Titta på tangentbordets vänstra kant. Tab sitter ovanför Caps Lock och har ofta två pilar. Tryck på Tab några gånger och se hur en ram hoppar mellan knapparna i övningsfönstret. Leta sedan upp Esc längst upp till vänster och tryck på den. Då stängs tipsrutan.",
              "independent": "Flytta mellan knapparna utan mus och stäng sedan tipsrutan med tangentbordet.",
              "child.guided": "Hitta Tab ovanför Caps Lock och tryck några gånger – se ramen hoppa mellan knapparna! Tryck sedan på Esc längst upp till vänster för att stänga tipsrutan."
            },
            "hints": [
              "Tab sitter längst till vänster, ovanför Caps Lock.",
              "Tryck Tab några gånger och se hur ramen hoppar mellan knapparna.",
              "Esc sitter längst upp till vänster.",
              "Listan visar vilka tangenter du redan har använt.",
              "Tryck Tab → tryck Esc."
            ],
            "nudge": "Den ena tangenten hoppar framåt, den andra avbryter."
          },
          {
            "title": "Klart",
            "text": "Du kan flytta med Tab och avbryta med Esc."
          }
        ],
        "detail": {
          "what": "Tab flyttar till nästa knapp eller fält. Esc betyder ofta avbryt, stäng eller gå ur.",
          "recognize": "Tab har två pilar eller texten Tab och sitter till vänster. Esc sitter längst upp till vänster.",
          "use": "De är användbara i formulär och dialogrutor.",
          "example": "Tryck Tab i ett formulär för att hoppa från fält till fält utan mus."
        }
      },
      "keyboard-007-modifiers": {
        "title": "Ctrl och Alt",
        "summary": "Känn igen två tangenter som används tillsammans med andra.",
        "steps": [
          {
            "title": "Ctrl och Alt",
            "text": {
              "default": "Ctrl och Alt gör sällan något själva. De används tillsammans med en annan tangent, till exempel Ctrl+C för att kopiera.",
              "short": "Ctrl och Alt används tillsammans med andra tangenter.",
              "child": "Ctrl och Alt är hjälptangenter. Ensamma gör de nästan ingenting, men tillsammans med en annan tangent blir de snabba genvägar."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i rutan och tryck en gång på Ctrl och en gång på Alt.",
              "guided": "Klicka först i rutan i övningsfönstret. Titta sedan längst ned till vänster på tangentbordet. Ctrl sitter i hörnet. Alt sitter strax till vänster om den långa mellanslagstangenten. Tryck på Ctrl en gång och sedan på Alt en gång. Listan visar vilka du har tryckt på.",
              "independent": "Tryck på Ctrl och Alt.",
              "child.guided": "Klicka i rutan. Hitta Ctrl i nedre vänstra hörnet och tryck på den. Hitta sedan Alt bredvid den långa mellanslagstangenten och tryck på den."
            },
            "hints": [
              "Klicka i rutan först.",
              "Ctrl sitter längst ned till vänster.",
              "Alt sitter till vänster om mellanslagstangenten.",
              "Listan visar vilka tangenter du redan har tryckt på.",
              "Tryck Ctrl en gång och Alt en gång."
            ],
            "nudge": "Båda tangenterna sitter i nedersta raden."
          },
          {
            "title": "Klart",
            "text": "Du hittar Ctrl och Alt på tangentbordet."
          }
        ],
        "detail": {
          "what": "Ctrl och Alt är tangenter som används tillsammans med andra tangenter för att ge kommandon.",
          "recognize": "Ctrl och Alt sitter längst ned på tangentbordet, på båda sidor om mellanslag. AltGr till höger används för vissa tecken, till exempel @.",
          "use": "De blir viktiga i kortkommandon som Ctrl+C.",
          "example": "Håll Ctrl nere och tryck C för att kopiera det som är markerat."
        }
      },
      "keyboard-007b-windows-key": {
        "title": "Windows-tangenten",
        "summary": "Lär dig vad Windows-tangenten gör.",
        "steps": [
          {
            "title": "Windows-tangenten",
            "text": {
              "default": "Windows-tangenten har Windows-symbolen – fyra rutor – och sitter mellan Ctrl och Alt. På en riktig dator öppnar den Start. I övningsdatorn i webbläsaren fångas tangenten av din riktiga dator, så här öppnar du Start med Start-knappen eller med Ctrl+Esc.",
              "short": "Windows-tangenten öppnar Start. Här använder du Start-knappen eller Ctrl+Esc.",
              "child": "Windows-tangenten har samma symbol som Start-knappen, fyra små rutor. På en riktig dator öppnar den Start direkt. I övningsdatorn fungerar den inte, eftersom din riktiga dator tar hand om tangenten först. Här klickar du på Start-knappen i stället, eller trycker Ctrl+Esc."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet var Windows-tangenten sitter och vad den gör."
          }
        ],
        "detail": {
          "what": "Windows-tangenten öppnar Start-menyn. Tillsammans med andra tangenter blir den snabbkommandon i Windows.",
          "recognize": "Den har Windows-symbolen med fyra rutor och sitter längst ned, mellan Ctrl och Alt.",
          "use": "Tryck på den för att öppna Start och börja skriva för att söka efter en app.",
          "example": "Windows-tangenten + E öppnar Utforskaren. Windows-tangenten + Shift + S tar en skärmbild."
        }
      },
      "keyboard-008-shortcuts": {
        "title": "Kortkommandon",
        "summary": "Använd Ctrl+A, Ctrl+C och Ctrl+V.",
        "steps": [
          {
            "title": "Kortkommandon",
            "text": {
              "default": "Ett kortkommando är två tangenter samtidigt: du håller ned Ctrl och trycker en bokstav. Ctrl+A markerar allt, Ctrl+C kopierar och Ctrl+V klistrar in.",
              "short": "Ctrl+A markerar allt, Ctrl+C kopierar och Ctrl+V klistrar in.",
              "child": "Ett kortkommando är ett knep med två tangenter. Du håller ned Ctrl och trycker på en bokstav. Ctrl+A markerar all text, Ctrl+C gör en kopia och Ctrl+V lägger in kopian."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i textrutan och använd Ctrl+A för att markera, Ctrl+C för att kopiera och Ctrl+V för att klistra in.",
              "guided": "Klicka i textrutan i övningsfönstret. Håll ned Ctrl längst ned till vänster med ena handen hela tiden. Tryck sedan A med andra handen – all text blir markerad. Fortsätt hålla Ctrl och tryck C för att kopiera, och sedan V för att klistra in. Släpp Ctrl när du är klar. Listan visar vilka kortkommandon som är gjorda.",
              "independent": "Använd Ctrl+A, Ctrl+C och Ctrl+V i textrutan.",
              "child.guided": "Klicka i textrutan. Håll ned Ctrl och tryck A – nu är allt markerat. Håll Ctrl kvar och tryck C (kopiera) och sedan V (klistra in). Listan bockar av!"
            },
            "hints": [
              "Klicka i textrutan först.",
              "Håll ned Ctrl och tryck A. All text blir markerad.",
              "Håll ned Ctrl och tryck C för att kopiera.",
              "Håll ned Ctrl och tryck V för att klistra in.",
              "Ctrl+A → Ctrl+C → Ctrl+V. Listan visar vilka som är klara."
            ],
            "nudge": "Du behöver en hjälptangent från förra lektionen."
          },
          {
            "title": "Klart",
            "text": "Du kan använda de vanligaste kortkommandona."
          }
        ],
        "detail": {
          "what": "Ett kortkommando är en tangentkombination som gör en vanlig åtgärd snabbare.",
          "recognize": "Du håller oftast ned Ctrl och trycker en annan tangent.",
          "use": "Ctrl+A markerar allt, Ctrl+C kopierar, Ctrl+X klipper ut, Ctrl+V klistrar in och Ctrl+Z ångrar.",
          "example": "Markera text med Ctrl+A, kopiera med Ctrl+C och klistra in med Ctrl+V."
        }
      },
      "keyboard-009-special": {
        "title": "Specialtecken",
        "summary": "Skriv @, !, ?, punkt och komma.",
        "steps": [
          {
            "title": "Specialtecken",
            "text": {
              "default": "Specialtecken är tecken som inte är bokstäver eller siffror. Många sitter på samma tangent som en siffra och kräver Shift eller AltGr.",
              "short": "Specialtecken kräver ofta Shift eller AltGr.",
              "child": "Specialtecken är tecken som inte är bokstäver eller siffror, som @, ! och ?. Många av dem bor på samma tangent som en siffra. Du får fram dem genom att hålla ned Shift eller AltGr samtidigt."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i rutan och skriv @ ! ? . , – du behöver Shift för ! och ? och AltGr för @.",
              "guided": "Klicka i rutan i övningsfönstret. Punkt och komma har egna tangenter till höger om M. För utropstecken håller du ned Shift och trycker 1. För frågetecken håller du ned Shift och trycker på plustangenten till höger om 0. För @ håller du ned AltGr – till höger om mellanslag – och trycker 2.",
              "independent": "Skriv tecknen @ ! ? . , i rutan.",
              "child.guided": "Klicka i rutan. Punkt och komma finns till höger om M. ! får du med Shift + 1, och ? med Shift + plus. @ är klurigast: håll ned AltGr till höger om mellanslag och tryck 2."
            },
            "hints": [
              "Klicka i rutan först.",
              "Punkt och komma har egna tangenter till höger om M.",
              "! får du med Shift + 1 och ? med Shift + + (tangenten till höger om 0).",
              "@ får du med AltGr + 2 på ett svenskt tangentbord.",
              "Skriv @ (AltGr+2), ! (Shift+1), ? (Shift+plus), punkt och komma."
            ],
            "nudge": "Tecknen bor på samma tangenter som andra tecken."
          },
          {
            "title": "Klart",
            "text": "Du kan skriva vanliga specialtecken."
          }
        ],
        "detail": {
          "what": "Specialtecken är tecken som inte är bokstäver eller siffror, till exempel @, !, ?, punkt och komma.",
          "recognize": "Många delar tangent med en siffra och kräver Shift eller AltGr.",
          "use": "De används i e-postadresser, meningar, webbadresser och lösenord.",
          "example": "En e-postadress innehåller alltid @, till exempel anna@example.com."
        }
      },
      "keyboard-010-final": {
        "title": "Tangentbord – slutuppdrag",
        "summary": "Kombinera flera tangentbordsfärdigheter.",
        "steps": [
          {
            "title": "Tangentbord – slutuppdrag",
            "text": {
              "default": "Nu kombinerar du det du har lärt dig: bokstäver, siffror, stor bokstav, specialtecken och tangenter för att rätta och markera.",
              "short": "Kombinera bokstäver, siffror, stor bokstav och specialtangenter.",
              "child": "Dags för slutprovet på tangentbordet! Nu blandar du allt du har lärt dig: bokstäver, siffror, en stor bokstav, ett specialtecken och tangenterna som rättar och markerar text."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Skriv Dator 2026! med stort D och utropstecken. Tryck sedan Retur, Backspace, en piltangent och Ctrl+A.",
              "guided": "Klicka i rutan i övningsfönstret. Håll ned Shift och tryck D för ett stort D. Skriv sedan ator, ett mellanslag och 2026. Avsluta med Shift + 1 för utropstecknet. När texten har fått en bock trycker du Retur och sedan Backspace. Tryck på någon av piltangenterna, och avsluta med att hålla ned Ctrl och trycka A. Varje moment får en bock.",
              "independent": "Skriv exakt Dator 2026! Tryck sedan Retur, Backspace, valfri piltangent och Ctrl+A. Varje moment får en bock.",
              "child.guided": "Klicka i rutan och skriv Dator 2026! – stort D med Shift, och ! med Shift + 1. Tryck sedan Retur, Backspace, en piltangent och till sist Ctrl+A. Kan du få bock på allt?"
            },
            "hints": [
              "Börja med att skriva Dator 2026! – stort D, ett mellanslag och utropstecken på slutet.",
              "Stort D får du med Shift. Utropstecknet med Shift + 1.",
              "När texten fått en bock: tryck Retur och sedan Backspace.",
              "Tryck en piltangent och avsluta med Ctrl+A.",
              "Dator 2026! → Retur → Backspace → piltangent → Ctrl+A."
            ],
            "nudge": "Allt du behöver har du redan tränat i de tidigare lektionerna."
          },
          {
            "title": "Klart",
            "text": "Tangentbordsmodulen är klar."
          }
        ],
        "detail": {
          "what": "Det här uppdraget kombinerar flera tangentbordsfärdigheter.",
          "recognize": "Bokstavstangenterna sitter i mitten och siffrorna i raden ovanför. Specialtangenter som Retur, Shift och Backspace har namn eller symboler.",
          "use": "Du använder tangentbordet både för att skriva och för kortkommandon som gör arbetet snabbare.",
          "example": "När du skriver i en textruta visas tecknen där markören står."
        }
      },
      "windows-001-start": {
        "title": "Start-menyn",
        "summary": "Öppna Start-menyn.",
        "steps": [
          {
            "title": "Start-menyn",
            "text": {
              "default": "Start-menyn är platsen där du hittar dina program. Du öppnar den med Start-knappen – Windows-symbolen med fyra rutor – i aktivitetsfältet längst ned på skärmen.",
              "short": "Start-menyn är där du hittar dina program.",
              "child": "Start-menyn är som en innehållsförteckning för hela datorn. Där hittar du alla program. Du öppnar den med Start-knappen, som har fyra små blå rutor och sitter i raden längst ned på skärmen."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Start-menyn genom att klicka på Start-knappen i aktivitetsfältet.",
              "guided": "Titta längst ned på skärmen. Där finns en rad med ikoner som heter aktivitetsfältet. Ungefär i mitten av raden sitter Start-knappen. Den ser ut som fyra små blå rutor. Klicka en gång på den med vänster musknapp.",
              "independent": "Öppna Start-menyn.",
              "child.guided": "Titta på raden längst ned på skärmen. Hitta knappen med fyra små blå rutor – det är Start-knappen. Klicka en gång på den!"
            },
            "hints": [
              "Titta på raden längst ned på skärmen. Den kallas aktivitetsfältet.",
              "Start-knappen har Windows-symbolen med fyra rutor och sitter mitt i aktivitetsfältet.",
              "Klicka en gång på Start-knappen.",
              "Den gula ramen visar Start-knappen.",
              "Klicka på Windows-symbolen längst ned i mitten. På en riktig dator kan du också trycka på Windows-tangenten."
            ],
            "nudge": "Fundera på var Windows samlar alla program."
          },
          {
            "title": "Klart",
            "text": "Du kan öppna Start-menyn."
          }
        ],
        "detail": {
          "what": "Start-menyn är Windows huvudmeny. Där hittar du program, inställningar och knappen för att stänga av datorn.",
          "recognize": "Start-knappen har Windows-symbolen med fyra rutor och sitter i aktivitetsfältet. Start-menyn har en sökruta högst upp, fästa appar och en strömknapp nere till höger.",
          "use": "Start är det naturliga stället att börja när du vill öppna något som inte syns på skrivbordet.",
          "example": "Öppna Start och klicka på Kalkylator."
        }
      },
      "windows-002-open-app": {
        "title": "Starta ett program",
        "summary": "Starta Kalkylator via Start.",
        "steps": [
          {
            "title": "Starta ett program",
            "text": {
              "default": "Ett program startas genom att du klickar på dess ikon. I Start-menyn ligger de vanligaste programmen under Fäst.",
              "short": "Klicka på ett programs ikon för att starta det.",
              "child": "Ett program är ett verktyg i datorn, som en miniräknare eller ett anteckningsblock. Du startar ett program genom att klicka på dess bild, som kallas ikon. De vanligaste programmen ligger under Fäst i Start-menyn."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Start-menyn och klicka på Kalkylator under Fäst.",
              "guided": "Klicka först på Start-knappen – de fyra blå rutorna längst ned på skärmen. Start-menyn öppnas. Under rubriken Fäst ser du små bilder med namn under, en för varje program. Leta upp den som heter Kalkylator och ser ut som en liten miniräknare. Klicka en gång på den.",
              "independent": "Öppna Kalkylator.",
              "child.guided": "Klicka på Start-knappen med de fyra blå rutorna. Under Fäst finns bilder på olika program. Hitta Kalkylator – den ser ut som en miniräknare – och klicka på den."
            },
            "hints": [
              "Börja med att öppna Start-menyn.",
              "Under Fäst ser du ikoner med programnamn under.",
              "Leta upp Kalkylator och klicka en gång på den.",
              "Den gula ramen visar Start-knappen.",
              "Start → Kalkylator. Kalkylator öppnas i ett eget fönster."
            ],
            "nudge": "Program brukar du hitta på samma ställe som i förra lektionen."
          },
          {
            "title": "Klart",
            "text": "Du kan starta ett program från Start."
          }
        ],
        "detail": {
          "what": "Ett program är ett verktyg som datorn kör. Att starta programmet betyder att öppna det så att du kan använda det.",
          "recognize": "Program visas med namn och ikon i Start-menyn. När ett program är igång syns dess ikon med ett litet streck under i aktivitetsfältet.",
          "use": "Du startar olika program beroende på vad du vill göra.",
          "example": "Kalkylator används för uträkningar och Anteckningar för enkel text."
        }
      },
      "windows-003-move": {
        "title": "Flytta ett fönster",
        "summary": "Dra ett programfönster till ett nytt ställe.",
        "steps": [
          {
            "title": "Flytta ett fönster",
            "text": {
              "default": "Varje program visas i ett fönster. Högst upp finns namnlisten med programmets namn. Där tar du tag när du vill flytta fönstret.",
              "short": "Flytta ett fönster genom att dra i namnlisten.",
              "child": "Varje program öppnas i en egen ruta som heter fönster. Den översta remsan på fönstret, där programmets namn står, heter namnlisten. Den är som ett handtag – där tar du tag när du vill flytta fönstret."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Dra Kalkylatorns fönster i namnlisten till ett annat ställe på skärmen.",
              "guided": "Titta på Kalkylatorns fönster. Den översta remsan, där det står Kalkylator, heter namnlisten. Lägg pekaren på namnlisten – inte på knapparna uppe till höger. Tryck ned vänster musknapp och håll kvar. Flytta musen så följer fönstret med. Släpp knappen när fönstret ligger där du vill.",
              "independent": "Flytta Kalkylatorns fönster till ett annat ställe på skärmen.",
              "child.guided": "Hitta den översta remsan på Kalkylatorn, där det står Kalkylator. Tryck och håll med vänster knapp där, flytta musen och släpp. Fönstret flyttar med!"
            },
            "hints": [
              "Hitta namnlisten – den översta raden i Kalkylatorns fönster, där det står Kalkylator.",
              "Tryck ned vänster musknapp på namnlisten och håll kvar.",
              "Flytta musen medan du håller knappen nere. Fönstret följer med.",
              "Den gula ramen visar namnlisten.",
              "Håll på namnlisten → dra fönstret en bit → släpp musknappen."
            ],
            "nudge": "Fönster har ett ställe där man tar tag i dem."
          },
          {
            "title": "Klart",
            "text": "Du kan flytta fönster."
          }
        ],
        "detail": {
          "what": "Ett fönster är den rektangel där ett program visas. Du kan flytta fönstret utan att programmet stängs.",
          "recognize": "Högst upp finns namnlisten med programmets namn och knapparna Minimera, Maximera och Stäng längst till höger.",
          "use": "När du flyttar fönster kan du se flera program samtidigt.",
          "example": "Tryck och håll på namnlisten, dra fönstret åt sidan och släpp."
        }
      },
      "windows-004-minimize": {
        "title": "Minimera",
        "summary": "Göm ett fönster utan att stänga programmet.",
        "steps": [
          {
            "title": "Minimera",
            "text": {
              "default": "Minimera gömmer fönstret i aktivitetsfältet. Programmet är fortfarande igång och du kan ta fram det igen.",
              "short": "Minimera gömmer fönstret i aktivitetsfältet utan att stänga det.",
              "child": "Att minimera är som att lägga undan något i en låda utan att slänga det. Fönstret försvinner ned till raden längst ned på skärmen, men programmet är kvar och du kan ta fram det igen."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Minimera Kalkylator med strecket längst upp till höger i fönstret.",
              "guided": "Titta längst upp till höger i Kalkylatorns fönster. Där sitter tre knappar bredvid varandra. Den vänstra av dem ser ut som ett kort, vågrätt streck – det är Minimera. Klicka en gång på strecket. Fönstret försvinner ned till aktivitetsfältet, men programmet är fortfarande igång.",
              "independent": "Minimera Kalkylator.",
              "child.guided": "Uppe till höger på Kalkylatorn finns tre knappar. Klicka på den vänstra, som ser ut som ett litet streck. Fönstret gömmer sig längst ned!"
            },
            "hints": [
              "Titta längst upp till höger i Kalkylatorns fönster. Där finns tre knappar.",
              "Minimera är den vänstra av de tre och ser ut som ett kort streck.",
              "Klicka en gång på strecket.",
              "Den gula ramen visar Minimera-knappen.",
              "Klicka på strecket uppe till höger i Kalkylator. Fönstret försvinner ned till aktivitetsfältet."
            ],
            "nudge": "Fönsterknapparna sitter alltid på samma ställe."
          },
          {
            "title": "Klart",
            "text": "Du kan minimera ett fönster."
          }
        ],
        "detail": {
          "what": "Minimera gömmer ett programfönster utan att stänga programmet.",
          "recognize": "Knappen ser ut som ett kort streck och sitter längst till vänster av de tre knapparna uppe till höger i fönstret.",
          "use": "Det är praktiskt när du vill få undan ett program en stund och komma tillbaka till det senare.",
          "example": "Klicka på strecket. Programmet ligger kvar i aktivitetsfältet – klicka på dess ikon där för att ta fram det igen."
        }
      },
      "windows-005-maximize": {
        "title": "Maximera",
        "summary": "Låt ett fönster fylla hela skärmen.",
        "steps": [
          {
            "title": "Maximera",
            "text": {
              "default": "Maximera gör fönstret så stort som möjligt. Samma knapp återställer det till den tidigare storleken.",
              "short": "Maximera gör fönstret så stort som möjligt.",
              "child": "Maximera betyder att göra fönstret så stort det går, så att det fyller hela skärmen. Trycker du på samma knapp igen blir fönstret lika stort som förut."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Maximera Kalkylator med fyrkanten längst upp till höger i fönstret.",
              "guided": "Titta längst upp till höger i Kalkylatorns fönster. Bland de tre knapparna är den mittersta en liten fyrkant – det är Maximera. Klicka en gång på fyrkanten. Fönstret växer och fyller hela skärmen ovanför aktivitetsfältet.",
              "independent": "Maximera Kalkylator.",
              "child.guided": "Uppe till höger på Kalkylatorn finns tre knappar. Klicka på den i mitten, som ser ut som en liten fyrkant. Nu fyller fönstret hela skärmen."
            },
            "hints": [
              "Titta längst upp till höger i Kalkylatorns fönster.",
              "Maximera är den mittersta knappen och ser ut som en fyrkant.",
              "Klicka en gång på fyrkanten.",
              "Den gula ramen visar Maximera-knappen.",
              "Klicka på fyrkanten uppe till höger. Du kan också dubbelklicka på namnlisten."
            ],
            "nudge": "Det är en av de tre knapparna uppe i fönstrets hörn."
          },
          {
            "title": "Klart",
            "text": "Du kan maximera ett fönster."
          }
        ],
        "detail": {
          "what": "Maximera gör ett fönster så stort som möjligt.",
          "recognize": "Knappen ser ut som en fyrkant och sitter i mitten av de tre knapparna uppe till höger. När fönstret är maximerat visar knappen två fyrkanter – Återställ nedåt.",
          "use": "Det är bra när du vill använda hela skärmen till ett program.",
          "example": "Klicka på fyrkanten för att maximera. Klicka på samma knapp igen för att återställa storleken."
        }
      },
      "windows-006-close": {
        "title": "Stäng ett program",
        "summary": "Stäng programfönstret.",
        "steps": [
          {
            "title": "Stäng",
            "text": {
              "default": "Stäng avslutar programmet. Använd Stäng när du är klar – inte Minimera.",
              "short": "Stäng avslutar programmet.",
              "child": "Stäng betyder att du är helt klar med programmet. Det försvinner – inte bara ned i raden längst ned, utan helt. Krysset uppe till höger stänger."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Stäng Kalkylator med krysset längst upp till höger i fönstret.",
              "guided": "Titta längst upp till höger i Kalkylatorns fönster. Den högra av de tre knapparna är ett kryss, och den blir röd när du pekar på den. Det är Stäng. Klicka en gång på krysset. Kalkylator avslutas och försvinner även från aktivitetsfältet.",
              "independent": "Stäng Kalkylator.",
              "child.guided": "Uppe till höger på Kalkylatorn finns ett kryss. Det blir rött när du pekar på det. Klicka på krysset så stängs programmet."
            },
            "hints": [
              "Titta längst upp till höger i Kalkylatorns fönster.",
              "Stäng är den högra knappen och ser ut som ett kryss.",
              "Klicka en gång på krysset. Det blir rött när du pekar på det.",
              "Den gula ramen visar Stäng-knappen.",
              "Klicka på krysset uppe till höger. Kalkylator stängs och försvinner även från aktivitetsfältet."
            ],
            "nudge": "Det är skillnad på att gömma ett fönster och att avsluta programmet."
          },
          {
            "title": "Klart",
            "text": "Du kan stänga ett program."
          }
        ],
        "detail": {
          "what": "Stäng avslutar fönstret och oftast hela programmet.",
          "recognize": "Stäng-knappen är krysset längst upp till höger i fönstret. Det blir rött när du pekar på det.",
          "use": "Använd Stäng när du är färdig med programmet.",
          "example": "Strecket minimerar, fyrkanten maximerar och krysset stänger. De gör alltså olika saker."
        }
      },
      "windows-007-context": {
        "title": "Högerklicksmeny",
        "summary": "Öppna en snabbmeny med ett högerklick.",
        "steps": [
          {
            "title": "Snabbmenyn",
            "text": {
              "default": "När du högerklickar visas en snabbmeny med val som passar det du klickade på. Skrivbordet, filer och appar har olika snabbmenyer.",
              "short": "Högerklick öppnar en snabbmeny för det du pekar på.",
              "child": "När du högerklickar på något kommer en liten meny fram med saker du kan göra med just det. Det är som att fråga datorn: \"Vad kan jag göra här?\" Menyn heter snabbmeny."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Högerklicka på en tom del av skrivbordet så att snabbmenyn öppnas.",
              "guided": "Leta upp en tom del av skrivbordet – den blå bakgrunden, där det inte finns någon ikon eller något fönster. Lägg pekaren där. Tryck sedan en gång på den högra musknappen, den under långfingret. En liten meny dyker upp. Den kan du stänga med Esc eller genom att klicka bredvid.",
              "independent": "Högerklicka på en tom del av skrivbordet.",
              "child.guided": "Hitta ett tomt ställe på den blå bakgrunden. Tryck där med musens högra knapp. Då kommer en liten meny fram!"
            },
            "hints": [
              "Hitta en tom yta på skrivbordet – inte på en ikon eller ett fönster.",
              "Använd den högra musknappen.",
              "Klicka en gång med höger musknapp på den tomma ytan.",
              "Den gula ramen visar skrivbordet.",
              "Pekaren på tom yta på skrivbordet → höger musknapp. Stäng menyn med Esc eller genom att klicka bredvid."
            ],
            "nudge": "Musen har en knapp som visar fler val."
          },
          {
            "title": "Klart",
            "text": "Du kan öppna en snabbmeny."
          }
        ],
        "detail": {
          "what": "En snabbmeny – även kallad högerklicksmeny – visar åtgärder som passar det du klickade på.",
          "recognize": "Den dyker upp som en liten lista nära muspekaren efter ett högerklick.",
          "use": "Menyn har olika val beroende på om du klickar på skrivbordet, en fil eller en app.",
          "example": "Högerklick på en fil visar bland annat Byt namn och Ta bort. Högerklick på skrivbordet visar bland annat Uppdatera och Anpassa."
        }
      },
      "windows-008-final": {
        "title": "Windows – slutuppdrag",
        "summary": "Hantera Start, program och fönster på egen hand.",
        "steps": [
          {
            "title": "Windows – slutuppdrag",
            "text": {
              "default": "Nu använder du allt om fönster i ett och samma uppdrag, utan steg-för-steg-instruktioner.",
              "short": "Allt om fönster i ett uppdrag.",
              "child": "Nu får du visa allt du kan om fönster, i ett enda uppdrag. Den här gången får du inga steg – du bestämmer själv hur du gör."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Kalkylator från Start. Flytta fönstret, minimera det, ta fram det igen via aktivitetsfältet, maximera det och stäng det.",
              "guided": "Ta ett moment i taget. Klicka på Start-knappen och sedan på Kalkylator. Dra fönstret i namnlisten, den översta remsan. Klicka på strecket uppe till höger för att minimera. Ta fram fönstret igen genom att klicka på Kalkylatorns ikon i aktivitetsfältet. Klicka på fyrkanten för att maximera och till sist på krysset för att stänga.",
              "independent": "Öppna Start, starta Kalkylator, flytta fönstret, minimera det, ta fram det igen, maximera det och stäng det.",
              "child.guided": "Ta en sak i taget. Klicka på Start-knappen och sedan på Kalkylator. Dra fönstret i den översta remsan. Klicka på strecket uppe till höger så gömmer sig fönstret. Klicka på Kalkylatorn i raden längst ned för att hämta tillbaka den. Klicka på fyrkanten och till sist på krysset."
            },
            "hints": [
              "Börja med Start-knappen i aktivitetsfältet.",
              "Flytta fönstret genom att dra i namnlisten.",
              "Minimera med strecket. Ta fram fönstret igen genom att klicka på Kalkylatorns ikon i aktivitetsfältet.",
              "Maximera med fyrkanten och stäng med krysset.",
              "Start → Kalkylator → dra namnlisten → streck → ikonen i aktivitetsfältet → fyrkant → kryss."
            ],
            "nudge": "Varje del har du gjort i en tidigare lektion. Börja där du startar program."
          },
          {
            "title": "Klart",
            "text": "Windows-modulen är klar."
          }
        ],
        "detail": {
          "what": "Det här uppdraget kombinerar Start, program och fönster.",
          "recognize": "Skrivbordet är bakgrunden med ikoner. Aktivitetsfältet ligger längst ned. Program visas i fönster.",
          "use": "Windows hjälper dig att starta program och hålla ordning på det som är öppet.",
          "example": "Du kan ha Utforskaren och Kalkylator öppna samtidigt och växla mellan dem."
        }
      },
      "files-000-concepts": {
        "title": "Fil, mapp och filtyp",
        "summary": "Förstå vad filer, mappar, namn och filtyper är.",
        "steps": [
          {
            "title": "Fil, mapp och filtyp",
            "text": {
              "default": "En fil innehåller information – till exempel en text eller en bild. En mapp samlar filer och andra mappar. Slutet på filnamnet, till exempel .txt eller .jpg, berättar vilken sorts fil det är.",
              "short": "Filer innehåller information, mappar samlar filer och filändelsen visar filtypen.",
              "child": "En fil är något du har sparat i datorn, till exempel en berättelse eller en bild. En mapp är som en låda där du kan lägga filer, och även andra lådor. Slutet på filens namn, som .txt eller .jpg, är som en etikett som berättar vad det är för sorts fil."
            }
          },
          {
            "title": "Klart",
            "text": "Du kan skilja på filer och mappar."
          }
        ],
        "detail": {
          "what": "En fil är sparad information, till exempel text eller en bild. En mapp är en behållare som hjälper dig hålla ordning. Filtypen beskriver vilken sorts fil det är.",
          "recognize": "Mappar har en mappikon. Filer har olika ikoner beroende på typ. Filnamnet kan sluta med till exempel .txt, .jpg eller .pdf.",
          "use": "Du behöver förstå skillnaden för att kunna hitta, flytta och spara saker på rätt ställe.",
          "example": "Rapport.txt är en textfil. Semester är en mapp som kan innehålla Rapport.txt och bilder."
        }
      },
      "files-003-rename": {
        "title": "Byt namn",
        "summary": "Byt namn på en fil utan att ändra innehållet.",
        "steps": [
          {
            "title": "Byt namn",
            "text": {
              "default": "Ett bra namn gör filen lätt att hitta. När du byter namn ändras bara namnet – innehållet är detsamma.",
              "short": "Byt namn ändrar bara filens namn, inte innehållet.",
              "child": "Ett bra namn gör det lätt att hitta filen senare, precis som en tydlig etikett på en låda. När du byter namn ändras bara etiketten – det som står i filen är detsamma."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Markera Utkast.txt, klicka på Byt namn och skriv Rapport. Behåll .txt i slutet.",
              "guided": "Utforskaren visar Dokument. Klicka en gång på Utkast.txt så att den blir blåmarkerad. Klicka sedan på Byt namn i raden med knappar högst upp – den har en penna – eller tryck F2. Nu kan du ändra namnet, och delen före .txt är markerad. Skriv Rapport och tryck Retur. Ändelsen .txt ska stå kvar.",
              "independent": "Byt namn på Utkast.txt till Rapport.txt.",
              "child.guided": "Klicka på Utkast.txt så att den blir blå. Klicka på Byt namn – knappen med en penna. Skriv Rapport och tryck Retur. Låt .txt stå kvar på slutet!"
            },
            "hints": [
              "Utkast.txt ligger i Dokument.",
              "Klicka en gång på filen så att den blir markerad.",
              "Klicka på Byt namn i raden med knappar – eller tryck F2. Namnet blir redigerbart.",
              "Den gula ramen visar knappen Byt namn.",
              "Markera Utkast.txt → Byt namn → skriv Rapport → tryck Retur. Ändelsen .txt ska stå kvar."
            ],
            "nudge": "En fil måste vara vald innan du kan ändra något på den."
          },
          {
            "title": "Klart",
            "text": "Du kan byta namn på filer."
          }
        ],
        "detail": {
          "what": "Att byta namn ändrar filens eller mappens namn, inte innehållet.",
          "recognize": "När du byter namn blir namnet en liten textruta där bara själva namnet är markerat – ändelsen som .txt markeras inte.",
          "use": "Bra namn gör filer lättare att hitta senare.",
          "example": "Utkast.txt kan döpas om till Rapport.txt när dokumentet är klart."
        }
      },
      "files-004-copy": {
        "title": "Kopiera",
        "summary": "Gör en kopia av en fil.",
        "steps": [
          {
            "title": "Kopiera",
            "text": {
              "default": "Kopiera skapar en extra fil med samma innehåll. Originalet ligger kvar. Arbetsgången är alltid: markera → Kopiera → välj plats → Klistra in.",
              "short": "Kopiera skapar en extra fil. Markera → Kopiera → Klistra in.",
              "child": "Att kopiera är som att använda en kopieringsmaskin: originalet ligger kvar och du får en likadan fil till. Det går alltid till så här: välj filen, kopiera, välj ställe och klistra in."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Markera Exempel.txt, klicka på Kopiera och sedan på Klistra in i samma mapp.",
              "guided": "Klicka en gång på Exempel.txt i Utforskaren så att den blir blåmarkerad. Titta på raden med knappar högst upp och klicka på Kopiera – den har två små papper på varandra. Inget syns hända, men datorn kommer nu ihåg filen. Klicka sedan på Klistra in, knappen strax till höger. En kopia som heter Exempel - Kopia.txt dyker upp.",
              "independent": "Gör en kopia av Exempel.txt i Dokument.",
              "child.guided": "Klicka på Exempel.txt så att den blir blå. Titta på knapparna högst upp i fönstret. Klicka på Kopiera, som ser ut som två papper. Klicka sedan på Klistra in bredvid. Nu finns det två likadana filer."
            },
            "hints": [
              "Klicka en gång på Exempel.txt så att den blir markerad.",
              "Klicka på Kopiera i raden med knappar – eller tryck Ctrl+C.",
              "Klicka sedan på Klistra in – eller tryck Ctrl+V.",
              "Den gula ramen visar raden med knappar.",
              "Exempel.txt → Kopiera → Klistra in. Kopian heter Exempel - Kopia.txt."
            ],
            "nudge": "Det är samma arbetsgång som när du kopierar text, fast med en hel fil."
          },
          {
            "title": "Klart",
            "text": "Du kan kopiera filer."
          }
        ],
        "detail": {
          "what": "Kopiera gör en extra kopia av en fil eller mapp. Originalet ligger kvar.",
          "recognize": "Arbetsgången är: markera → Kopiera (Ctrl+C) → gå till platsen → Klistra in (Ctrl+V).",
          "use": "Kopiering används när samma fil ska finnas på flera ställen eller när du vill ha en säkerhetskopia att arbeta i.",
          "example": "Kopierar du Exempel.txt och klistrar in i samma mapp får du originalet plus Exempel - Kopia.txt."
        }
      },
      "files-005-move": {
        "title": "Klipp ut och flytta",
        "summary": "Flytta en fil till en annan mapp.",
        "steps": [
          {
            "title": "Klipp ut och klistra in",
            "text": {
              "default": "Klipp ut förbereder en flytt. När du klistrar in på ett nytt ställe flyttas filen dit – den finns inte längre kvar på det gamla stället.",
              "short": "Klipp ut och klistra in flyttar filen.",
              "child": "Klipp ut och klistra in är som att flytta en sak från en låda till en annan. Skillnaden mot att kopiera är att filen inte finns kvar på det gamla stället efteråt."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klipp ut Flytta mig.txt, öppna Hämtade filer i vänsterspalten och klistra in filen där.",
              "guided": "Klicka en gång på Flytta mig.txt i Dokument. Klicka på Klipp ut – knappen med en sax – i raden högst upp. Filen blir lite blekare, det betyder att den väntar på att flyttas. Klicka nu på Hämtade filer i spalten till vänster. Klicka sedan på Klistra in högst upp. Filen flyttas hit och finns inte längre kvar i Dokument.",
              "independent": "Flytta Flytta mig.txt från Dokument till Hämtade filer.",
              "child.guided": "Klicka på Flytta mig.txt. Klicka på saxen (Klipp ut) – nu blir filen blek. Klicka på Hämtade filer till vänster och sedan på Klistra in. Filen har flyttat!"
            },
            "hints": [
              "Klicka en gång på Flytta mig.txt.",
              "Klicka på Klipp ut (saxen) – eller tryck Ctrl+X. Filen blir blekare.",
              "Klicka på Hämtade filer i vänsterspalten.",
              "Den gula ramen visar Hämtade filer i vänsterspalten.",
              "Flytta mig.txt → Klipp ut → Hämtade filer → Klistra in."
            ],
            "nudge": "Du ska inte göra en kopia den här gången, utan flytta originalet."
          },
          {
            "title": "Klart",
            "text": "Du kan flytta filer med Klipp ut och Klistra in."
          }
        ],
        "detail": {
          "what": "Klipp ut förbereder en flytt. När du sedan klistrar in på ett annat ställe flyttas originalet dit.",
          "recognize": "Efter Klipp ut ser filen blekare ut tills du har klistrat in den.",
          "use": "Använd det när filen ska byta plats i stället för att kopieras.",
          "example": "Klipp ut en fil i Dokument, öppna Hämtade filer och välj Klistra in."
        }
      },
      "files-006-delete": {
        "title": "Ta bort och återställ",
        "summary": "Använd Papperskorgen på ett tryggt sätt.",
        "steps": [
          {
            "title": "Ta bort tryggt",
            "text": {
              "default": "Det du tar bort i Utforskaren hamnar i Papperskorgen. Först när du tömmer Papperskorgen är filen borta på riktigt.",
              "short": "Borttaget hamnar i Papperskorgen tills du tömmer den.",
              "child": "När du tar bort något i Utforskaren läggs det i Papperskorgen. Först när du tömmer Papperskorgen är det borta på riktigt – precis som när soporna hämtas."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Markera Återställ mig.txt och tryck Delete. Öppna sedan Papperskorgen och återställ filen.",
              "guided": "Klicka en gång på Återställ mig.txt i Dokument så att den blir blåmarkerad. Tryck på Delete-tangenten på tangentbordet, eller klicka på knappen med en papperskorg högst upp. Klicka sedan på Papperskorgen längst ned i spalten till vänster. Klicka på filen där och sedan på Återställ markerade objekt.",
              "independent": "Ta bort Återställ mig.txt och återställ filen igen.",
              "child.guided": "Klicka på Återställ mig.txt så att den blir blå. Tryck på tangenten Delete. Klicka sedan på Papperskorgen längst ned i spalten till vänster. Klicka på filen där och välj Återställ markerade objekt högst upp."
            },
            "hints": [
              "Återställ mig.txt ligger i Dokument.",
              "Markera filen och tryck Delete – eller klicka på Ta bort.",
              "Öppna Papperskorgen i vänsterspalten och markera filen.",
              "Den gula ramen visar Papperskorgen i vänsterspalten.",
              "Markera filen → Delete → Papperskorgen → markera filen → Återställ markerade objekt."
            ],
            "nudge": "Du har gjort något liknande förut med Papperskorgen."
          },
          {
            "title": "Klart",
            "text": "Du kan ta bort och återställa filer."
          }
        ],
        "detail": {
          "what": "När du tar bort en fil i Windows flyttas den till Papperskorgen i stället för att försvinna direkt.",
          "recognize": "I Papperskorgen ser du borttagna filer och var de låg. Där finns knapparna Återställ markerade objekt och Töm Papperskorgen.",
          "use": "Det ger dig en säkerhetsmarginal om du tog bort något av misstag.",
          "example": "Ta bort filen, öppna Papperskorgen och välj Återställ markerade objekt."
        }
      },
      "files-007-saveas": {
        "title": "Spara och Spara som",
        "summary": "Skapa en ny fil från Anteckningar.",
        "steps": [
          {
            "title": "Spara och Spara som",
            "text": {
              "default": "Spara sparar ändringar i den fil du redan har. Spara som låter dig välja namn och mapp – och används första gången en ny text sparas.",
              "short": "Använd Spara som första gången, så väljer du namn och mapp.",
              "child": "Det du skriver finns bara i programmet tills du sparar det. Spara som är första gången du sparar: då väljer du vad filen ska heta och vilken mapp den ska ligga i. Efter det räcker det med Spara."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Skriv några ord i Anteckningar. Välj sedan Arkiv → Spara som, välj en mapp, skriv ett namn och klicka på Spara.",
              "guided": "Klicka i den stora vita ytan i Anteckningar och skriv några ord. Titta sedan högst upp i fönstret: där står Arkiv. Klicka på det och välj Spara som i menyn. En ruta öppnas. Till vänster väljer du mapp, till exempel Dokument. Längst ned, i fältet Filnamn, skriver du ett namn. Klicka sedan på den blå knappen Spara.",
              "independent": "Skriv något i Anteckningar och spara det som en fil.",
              "child.guided": "Skriv några ord i den vita ytan. Klicka på Arkiv högst upp och välj Spara som. Välj Dokument till vänster, skriv ett namn i rutan Filnamn och klicka på Spara."
            },
            "hints": [
              "Klicka i Anteckningars vita yta och skriv några ord.",
              "Klicka på Arkiv högst upp.",
              "Välj Spara som – eller tryck Ctrl+S.",
              "Den gula ramen visar menyraden.",
              "Skriv text → Arkiv → Spara som → välj mapp → skriv ett namn → Spara."
            ],
            "nudge": "Texten finns bara i programmet tills du har gjort något med den."
          },
          {
            "title": "Klart",
            "text": "Du kan spara en ny fil."
          }
        ],
        "detail": {
          "what": "Spara skriver dina ändringar till filen. Spara som låter dig välja ett nytt namn eller en ny plats.",
          "recognize": "Program har en meny som heter Arkiv med Spara och Spara som. Kortkommandot för Spara är Ctrl+S.",
          "use": "Text som inte har sparats kan försvinna när programmet stängs.",
          "example": "Skriv en text i Anteckningar och välj Spara som för att skapa Min text.txt i Dokument."
        }
      },
      "files-008-locations": {
        "title": "Dokument, Hämtade filer och Bilder",
        "summary": "Lär dig de vanligaste mapparna.",
        "steps": [
          {
            "title": "De vanliga mapparna",
            "text": {
              "default": "Windows har färdiga mappar för olika saker: Dokument för dokument, Hämtade filer för det du laddar ned och Bilder för foton och skärmbilder. Du hittar dem i Utforskarens vänsterspalt.",
              "short": "Dokument, Hämtade filer och Bilder finns i Utforskarens vänsterspalt.",
              "child": "Windows har färdiga lådor för olika saker. I Dokument lägger du sådant du skriver. I Hämtade filer hamnar det du laddar ned från internet. I Bilder sparas foton och skärmbilder. Du hittar alla tre i spalten till vänster i Utforskaren."
            }
          },
          {
            "title": "Klart",
            "text": "Du känner till de vanligaste mapparna."
          }
        ],
        "detail": {
          "what": "Windows har standardmappar för olika sorters innehåll.",
          "recognize": "Dokument används för dokument, Hämtade filer för sådant du laddar ned från internet och Bilder för bilder. De finns i Utforskarens vänsterspalt.",
          "use": "När du känner till mapparna blir det lättare att hitta filer igen.",
          "example": "En fil som du laddar ned i webbläsaren hamnar nästan alltid i Hämtade filer."
        }
      },
      "files-009-final": {
        "title": "Filer – slutuppdrag",
        "summary": "Skapa, byt namn, flytta, ta bort och återställ.",
        "steps": [
          {
            "title": "Filer – slutuppdrag",
            "text": {
              "default": "Nu använder du allt om filer och mappar i ett och samma uppdrag.",
              "short": "Skapa, byt namn, flytta, ta bort och återställ i ett uppdrag.",
              "child": "Nu får du använda allt du kan om filer och mappar i ett enda uppdrag. Ta det lugnt och gör en sak i taget."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Skapa en ny mapp, byt namn på Projekt.txt, flytta filen till en annan mapp, ta bort den och återställ den från Papperskorgen.",
              "guided": "Ta ett moment i taget. Klicka på Nytt och välj Mapp, så har du en ny mapp. Klicka på Projekt.txt och välj Byt namn, skriv ett nytt namn och tryck Retur. Flytta filen till en mapp med Klipp ut och Klistra in, eller dra den dit. Ta bort filen med knappen med papperskorgen. Öppna Papperskorgen till vänster, klicka på filen och välj Återställ markerade objekt.",
              "independent": "Gör fem saker: skapa en ny mapp, byt namn på Projekt.txt, flytta filen till en annan mapp, ta bort den och återställ den från Papperskorgen.",
              "child.guided": "Fem saker, en i taget. Klicka på Nytt och välj Mapp. Byt namn på Projekt.txt. Flytta filen till en mapp. Ta bort filen. Hämta tillbaka den från Papperskorgen. Du har gjort allt det här förut."
            },
            "hints": [
              "Börja med Nytt → Mapp i Dokument.",
              "Byt sedan namn på Projekt.txt med Byt namn eller F2.",
              "Flytta filen – med Klipp ut och Klistra in eller genom att dra den till en mapp.",
              "Ta bort filen och öppna Papperskorgen.",
              "Ny mapp → byt namn på Projekt.txt → flytta → ta bort → Papperskorgen → Återställ."
            ],
            "nudge": "Alla fem delarna har du gjort i tidigare lektioner i den här modulen."
          },
          {
            "title": "Klart",
            "text": "Filmodulen är klar."
          }
        ],
        "detail": {
          "what": "Det här uppdraget kombinerar att skapa, byta namn på, flytta, ta bort och återställa.",
          "recognize": "Alla knappar du behöver finns i Utforskarens rad med knappar och i högerklicksmenyn.",
          "use": "Filhantering används när du sparar, hittar, flyttar, kopierar eller tar bort saker.",
          "example": "Ett dokument kan heta Rapport.txt och ligga i mappen Dokument."
        }
      },
      "internet-001-address": {
        "title": "Adressfält och webbadress",
        "summary": "Skriv en webbadress i adressfältet.",
        "steps": [
          {
            "title": "Adressfältet",
            "text": {
              "default": "Adressfältet är den långa rutan högst upp i webbläsaren. Där skriver du en webbadress för att komma direkt till en webbplats.",
              "short": "Skriv en webbadress i adressfältet för att gå till en webbplats.",
              "child": "Varje webbplats har en egen adress, ungefär som ett hus har en gatuadress. Adressfältet är den långa rutan högst upp i webbläsaren. Skriver du adressen där åker du direkt till rätt sida."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i adressfältet högst upp i webbläsaren, skriv datorskolan.example/internet och tryck Retur.",
              "guided": "Titta högst upp i webbläsarfönstret. Till höger om pilarna finns en lång, rundad ruta – det är adressfältet. Klicka en gång i den. Texten som står där blir markerad, så det du skriver ersätter den. Skriv datorskolan.example/internet och tryck på Retur-tangenten. Sidan byts.",
              "independent": "Gå till datorskolan.example/internet.",
              "child.guided": "Klicka i den långa rutan högst upp i webbläsaren. Skriv datorskolan.example/internet och tryck Retur. Nu åker du till den sidan!"
            },
            "hints": [
              "Adressfältet sitter högst upp i webbläsaren, bredvid pilarna.",
              "Klicka i adressfältet. Det som stod där blir markerat.",
              "Skriv datorskolan.example/internet och tryck Retur.",
              "Den gula ramen visar adressfältet.",
              "Klicka i adressfältet → skriv datorskolan.example/internet → tryck Retur."
            ],
            "nudge": "Webbsidor har adresser. Fundera på var i webbläsaren man skriver en adress."
          },
          {
            "title": "Klart",
            "text": "Du kan gå till en webbplats med adressfältet."
          }
        ],
        "detail": {
          "what": "Adressfältet visar var på webben du är och låter dig skriva en webbadress. En webbadress kallas också URL.",
          "recognize": "Adressfältet är den långa rutan högst upp i webbläsaren. En adress kan se ut som example.com eller https://example.com/sida.",
          "use": "Använd adressfältet när du vet adressen till sidan du vill besöka. Skriver du vanliga ord i stället blir det en sökning.",
          "example": "Skriv datorskolan.example/internet och tryck Retur för att öppna övningssidan Vad är internet?",
          "steps": [
            "Klicka i adressfältet.",
            "Det gamla innehållet blir markerat – skriv bara över det.",
            "Skriv den nya adressen.",
            "Tryck Retur."
          ]
        }
      },
      "internet-002-links": {
        "title": "Länkar",
        "summary": "Öppna en länk på en webbsida.",
        "steps": [
          {
            "title": "Länkar",
            "text": {
              "default": "En länk tar dig till en annan sida när du klickar på den. Muspekaren blir en hand när du pekar på en länk.",
              "short": "Klicka på en länk för att komma till en annan sida.",
              "child": "En länk är som en dörr till en annan sida. När du pekar på en länk förvandlas muspekaren till en liten hand. Klickar du då kommer du till den nya sidan."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på en länk eller en av de runda genvägarna på webbsidan.",
              "guided": "Titta på den stora vita ytan i webbläsaren – det är själva webbsidan. Flytta pekaren långsamt över de runda genvägarna mitt på sidan. Lägg märke till att pekaren blir en hand – det betyder att du pekar på en länk. Klicka en gång, till exempel på ”Vad är internet?”. Sidan byts och adressen i adressfältet ändras.",
              "independent": "Följ en länk på sidan i webbläsaren.",
              "child.guided": "Flytta pilen över de runda bilderna mitt på sidan. Blir pilen en hand? Då är det en länk! Klicka på Vad är internet? och se vad som händer."
            },
            "hints": [
              "Titta på den stora vita ytan i webbläsaren – själva webbsidan.",
              "Peka på de runda genvägarna eller på blå text. Pekaren blir en hand över en länk.",
              "Klicka en gång på till exempel Vad är internet?",
              "Den gula ramen visar webbsidan.",
              "Klicka en gång på genvägen Vad är internet? Sidan byts och adressen ändras."
            ],
            "nudge": "Pekaren ändrar utseende när den är över något man kan klicka på."
          },
          {
            "title": "Klart",
            "text": "Du kan följa länkar."
          }
        ],
        "detail": {
          "what": "En länk är något klickbart som leder till en annan sida, fil eller plats. Texten du ser och adressen bakom länken kan vara olika.",
          "recognize": "En länk är ofta blå och ibland understruken, men kan också se ut som en knapp eller bild. Muspekaren blir en hand när du pekar på en länk.",
          "use": "Länkar används för att gå mellan sidor och öppna mer information.",
          "example": "Texten ”Läs mer om säkerhet” kan vara en länk. På riktiga webben bör du vara försiktig med okända länkar, eftersom texten inte alltid visar vart länken leder.",
          "steps": [
            "Peka på det du vill klicka på.",
            "Kontrollera att pekaren blir en hand.",
            "Klicka en gång."
          ]
        }
      },
      "internet-003-tabs": {
        "title": "Flikar",
        "summary": "Öppna en ny flik.",
        "steps": [
          {
            "title": "Flikar",
            "text": {
              "default": "Med flikar kan du ha flera webbsidor öppna i samma fönster. Flikarna sitter högst upp i webbläsaren.",
              "short": "Flikar låter dig ha flera sidor öppna i samma fönster.",
              "child": "Flikar är som flikarna i en pärm. Du kan ha flera webbsidor öppna samtidigt och bläddra mellan dem. Flikarna sitter högst upp i webbläsaren."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna en ny flik med plusknappen till höger om flikarna högst upp i webbläsaren.",
              "guided": "Titta högst upp i webbläsarfönstret. Där sitter flikarna, en för varje öppen sida, med sidans namn. Till höger om den sista fliken finns ett litet plustecken. Klicka en gång på plustecknet. En ny, tom flik öppnas.",
              "independent": "Öppna en ny flik.",
              "child.guided": "Högst upp i webbläsaren ser du flikarna. Bredvid den sista finns ett litet plus. Klicka på plusset så får du en ny flik!"
            },
            "hints": [
              "Titta högst upp i webbläsarfönstret där flikarna finns.",
              "Till höger om den sista fliken finns ett plustecken.",
              "Klicka på plustecknet en gång.",
              "Den gula ramen visar plusknappen.",
              "Klicka på + bredvid flikarna – eller tryck Ctrl+T."
            ],
            "nudge": "Det handlar om raden allra högst upp i webbläsaren."
          },
          {
            "title": "Klart",
            "text": "Du kan öppna nya flikar."
          }
        ],
        "detail": {
          "what": "En flik låter webbläsaren ha flera webbsidor öppna i samma fönster.",
          "recognize": "Flikarna ligger högst upp i webbläsaren och har sidans namn. Plusknappen till höger öppnar en ny flik.",
          "use": "Flikar är praktiska när du vill behålla en sida och samtidigt öppna en annan.",
          "example": "Du kan ha din e-post i en flik och en nyhetssida i en annan."
        }
      },
      "internet-004-history": {
        "title": "Bakåt och framåt",
        "summary": "Gå tillbaka till sidan du var på nyss.",
        "steps": [
          {
            "title": "Bakåt och framåt",
            "text": {
              "default": "Pilarna uppe till vänster i webbläsaren tar dig till sidan du var på nyss (bakåt) och tillbaka igen (framåt).",
              "short": "Bakåt går till förra sidan, Framåt tillbaka igen.",
              "child": "Webbläsaren kommer ihåg vilka sidor du har varit på. Pilen åt vänster tar dig ett steg tillbaka, och pilen åt höger tar dig framåt igen – som att bläddra i en bok."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna en sida via en genväg. Klicka sedan på Bakåt-pilen och därefter på Framåt-pilen uppe till vänster.",
              "guided": "Börja med att klicka på en av de runda genvägarna, till exempel Vad är internet?, så att du byter sida. Titta sedan längst upp till vänster i webbläsaren. Där finns två pilar. Klicka på pilen som pekar åt vänster – Bakåt. Du kommer tillbaka till förra sidan. Klicka sedan på pilen som pekar åt höger – Framåt.",
              "independent": "Gå tillbaka till förra sidan och sedan framåt igen.",
              "child.guided": "Klicka på Vad är internet? för att byta sida. Klicka sedan på pilen åt vänster högst upp – nu är du tillbaka! Klicka på pilen åt höger så går du framåt igen."
            },
            "hints": [
              "Öppna först en sida, till exempel genvägen Vad är internet?",
              "Bakåt-pilen pekar åt vänster och sitter längst upp till vänster.",
              "Klicka på Bakåt. Klicka sedan på pilen åt höger – Framåt.",
              "Den gula ramen visar Bakåt-pilen.",
              "Öppna en sida → ← Bakåt → → Framåt."
            ],
            "nudge": "Du behöver ha besökt mer än en sida för att kunna gå tillbaka."
          },
          {
            "title": "Klart",
            "text": "Du kan gå bakåt och framåt i webbläsaren."
          }
        ],
        "detail": {
          "what": "Webbläsaren kommer ihåg vilka sidor du har besökt i fliken.",
          "recognize": "Bakåt är en pil åt vänster och Framåt en pil åt höger, till vänster om adressfältet.",
          "use": "Bakåt tar dig till föregående sida. Framåt fungerar efter att du har gått bakåt.",
          "example": "Öppna en länk, klicka Bakåt för att komma tillbaka och sedan Framåt för att komma till länken igen."
        }
      },
      "internet-005-download": {
        "title": "Ladda ned en fil",
        "summary": "Ladda ned en fil från en webbsida.",
        "steps": [
          {
            "title": "Ladda ned",
            "text": {
              "default": "Att ladda ned betyder att en fil från webben sparas på din dator. Webbläsaren sparar den i mappen Hämtade filer och visar en nedladdningsikon uppe till höger.",
              "short": "Nedladdade filer sparas i Hämtade filer.",
              "child": "Att ladda ned betyder att du hämtar en fil från internet och sparar den i din egen dator. Webbläsaren lägger den i mappen Hämtade filer, så att du vet var den finns."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna genvägen Ladda ned en guide och klicka på knappen Ladda ned guide.txt.",
              "guided": "På webbläsarens startsida finns runda genvägar mitt på sidan. Klicka på den som heter Ladda ned en guide. En ny sida öppnas. Klicka på den blå knappen Ladda ned guide.txt. Uppe till höger i webbläsaren visas en ruta med Senaste nedladdningar. Filen hamnar i mappen Hämtade filer.",
              "independent": "Gå till sidan Ladda ned en guide och ladda ned guide.txt.",
              "child.guided": "Klicka på genvägen Ladda ned en guide. Klicka sedan på den blå knappen Ladda ned guide.txt. Nu hämtas filen till din dator!"
            },
            "hints": [
              "Börja på webbläsarens startsida med de runda genvägarna.",
              "Klicka på genvägen Ladda ned en guide.",
              "Klicka på den blå knappen Ladda ned guide.txt.",
              "Den gula ramen visar webbsidan.",
              "Genvägen Ladda ned en guide → Ladda ned guide.txt. En ruta med Senaste nedladdningar visas."
            ],
            "nudge": "Det finns en sida som erbjuder en fil att hämta."
          },
          {
            "title": "Klart",
            "text": "Du kan ladda ned filer."
          }
        ],
        "detail": {
          "what": "Att ladda ned betyder att en fil kopieras från en webbsida till din dator.",
          "recognize": "En nedladdningsknapp heter ofta Ladda ned eller har en pil nedåt. Hämtade filer hamnar oftast i mappen Hämtade filer.",
          "use": "Du laddar ned dokument, bilder, blanketter och installationsprogram.",
          "example": "När du laddar ned guide.txt i övningen hamnar filen i Hämtade filer. Klicka på Visa i mapp för att se den i Utforskaren."
        }
      },
      "internet-006-form": {
        "title": "Formulär",
        "summary": "Fyll i ett formulär och skicka det.",
        "steps": [
          {
            "title": "Formulär",
            "text": {
              "default": "Ett formulär samlar in uppgifter från dig: textfält, val och kryssrutor. Fält med * måste fyllas i innan du kan skicka.",
              "short": "Fyll i formulärets fält och skicka. Fält med * är obligatoriska.",
              "child": "Ett formulär är som en blankett på papper, fast på skärmen. Du skriver i rutor och kryssar i val. Rutor med en liten stjärna * måste du fylla i, annars går det inte att skicka."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Kontaktformulär, skriv ett namn, kryssa i rutan Jag har läst informationen och klicka på Skicka.",
              "guided": "Klicka på genvägen Kontaktformulär på webbläsarens startsida. Formuläret öppnas. Klicka i fältet Namn och skriv ett namn. Leta sedan upp den lilla fyrkanten bredvid Jag har läst informationen och klicka i den, så att en bock syns. Klicka till sist på knappen Skicka längst ned. Saknas något visas en röd förklaring vid fältet.",
              "independent": "Skicka kontaktformuläret med ditt namn ifyllt.",
              "child.guided": "Klicka på genvägen Kontaktformulär mitt på sidan. Klicka i rutan Namn och skriv ett namn. Klicka i den lilla fyrkanten bredvid Jag har läst informationen, så att det blir en bock. Klicka på Skicka längst ned."
            },
            "hints": [
              "Klicka på genvägen Kontaktformulär på webbläsarens startsida.",
              "Klicka i fältet Namn och skriv ett namn.",
              "Kryssa i rutan Jag har läst informationen.",
              "Den gula ramen visar formuläret.",
              "Namn → kryssrutan → Skicka. Saknas något visas en röd förklaring."
            ],
            "nudge": "Det finns en genväg till ett formulär på startsidan."
          },
          {
            "title": "Klart",
            "text": "Du kan fylla i och skicka formulär."
          }
        ],
        "detail": {
          "what": "Ett webbformulär samlar uppgifter som du skriver eller väljer innan du skickar dem.",
          "recognize": "Formulär har textfält, kryssrutor, runda val (radioknappar), listor och en Skicka-knapp. En stjärna * betyder att fältet måste fyllas i.",
          "use": "Formulär används för kontakt, bokningar, inloggning och beställningar.",
          "example": "Ett kontaktformulär kan kräva namn och att du kryssar i en ruta innan Skicka fungerar. Fattas något visas ett felmeddelande."
        }
      },
      "internet-007-zoom": {
        "title": "Zooma",
        "summary": "Gör webbsidan större eller mindre.",
        "steps": [
          {
            "title": "Zoom",
            "text": {
              "default": "Med zoom gör du text och bilder på webbsidan större eller mindre. Det är bra när texten känns för liten.",
              "short": "Zooma för att göra text och bilder större eller mindre.",
              "child": "Zooma betyder att förstora eller förminska, som med ett förstoringsglas. Är texten på en sida för liten kan du zooma in så att den blir större."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna webbläsarens meny med de tre prickarna och välj Zooma in eller Zooma ut.",
              "guided": "Titta uppe till höger i webbläsarfönstret. Där finns en knapp med tre prickar ovanför varandra. Klicka på den. En meny öppnas. Leta upp raden Zooma och klicka på plustecknet för att zooma in, eller på minustecknet för att zooma ut. Texten på sidan blir större eller mindre.",
              "independent": "Zooma in eller ut på webbsidan.",
              "child.guided": "Titta uppe till höger i webbläsaren. Klicka på knappen med tre prickar. Hitta Zooma i menyn och klicka på plus. Nu blir texten större."
            },
            "hints": [
              "Uppe till höger i webbläsaren finns en knapp med tre prickar.",
              "Klicka på de tre prickarna för att öppna webbläsarens meny.",
              "Välj Zooma in eller Zooma ut.",
              "Den gula ramen visar menyknappen.",
              "⋮ → Zooma in. Snabbare: håll Ctrl och tryck +. Ctrl+0 återställer."
            ],
            "nudge": "Webbläsaren har en meny med fler inställningar."
          },
          {
            "title": "Klart",
            "text": "Du kan zooma på webbsidor."
          }
        ],
        "detail": {
          "what": "Zoom ändrar hur stort innehållet på en webbsida visas, utan att ändra själva sidan.",
          "recognize": "Zoom finns i webbläsarens meny (tre prickar) och visas i procent, till exempel 100 %.",
          "use": "Använd zoom när text eller knappar känns för små – eller för stora.",
          "example": "110 % gör sidan lite större. Ctrl och + zoomar in, Ctrl och − zoomar ut och Ctrl+0 återställer."
        }
      },
      "internet-008-final": {
        "title": "Internet – slutuppdrag",
        "summary": "Använd adressfält, länkar, flikar, historik och nedladdning på egen hand.",
        "steps": [
          {
            "title": "Internet – slutuppdrag",
            "text": {
              "default": "Nu använder du det viktigaste i webbläsaren i ett och samma uppdrag.",
              "short": "Adressfält, länk, flik, Bakåt/Framåt och nedladdning i ett uppdrag.",
              "child": "Nu får du visa vad du kan i webbläsaren. Du ska använda det viktigaste du har lärt dig om internet i ett och samma uppdrag."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Skriv en adress i adressfältet, klicka på en länk, öppna en ny flik, använd Bakåt och Framåt och ladda ned guide.txt.",
              "guided": "Ta ett moment i taget. Klicka i adressfältet högst upp, skriv en adress och tryck Retur. Klicka på en länk på sidan. Öppna en ny flik med plustecknet bredvid flikarna. I en flik där du har besökt mer än en sida klickar du på Bakåt-pilen och sedan Framåt-pilen. Avsluta med genvägen Ladda ned en guide och knappen Ladda ned guide.txt.",
              "independent": "Använd adressfältet, öppna en länk, öppna en ny flik, använd Bakåt och Framåt och ladda ned guide.txt.",
              "child.guided": "Fem saker: skriv en adress, klicka på en länk, öppna en ny flik med plus, tryck Bakåt och Framåt, och ladda ned guide.txt. Du har gjort allt förut!"
            },
            "hints": [
              "Börja med adressfältet: skriv en adress och tryck Retur.",
              "Klicka på en länk på sidan.",
              "Öppna en ny flik med plusknappen.",
              "Använd Bakåt och Framåt i en flik där du har besökt mer än en sida.",
              "Avsluta på sidan Ladda ned en guide och ladda ned guide.txt."
            ],
            "nudge": "Varje del har du gjort i en tidigare lektion om webbläsaren."
          },
          {
            "title": "Klart",
            "text": "Internetmodulen är klar."
          }
        ],
        "detail": {
          "what": "Det här uppdraget kombinerar webbläsarens viktigaste delar.",
          "recognize": "Webbläsaren har flikar högst upp, pilar för Bakåt och Framåt, ett adressfält och en stor yta där webbsidan visas.",
          "use": "Du använder webbläsaren för att besöka webbsidor, söka, följa länkar och ladda ned filer.",
          "example": "Edge, Chrome och Firefox är vanliga webbläsare. Här övar du i en övningswebbläsare som fungerar på samma sätt."
        }
      },
      "mail-001-open": {
        "title": "Inkorgen",
        "summary": "Öppna ett mejl i inkorgen.",
        "steps": [
          {
            "title": "Inkorgen",
            "text": {
              "default": "Inkorgen är listan med mejl som du har fått. Olästa mejl har fetstil och ett blått streck. Klicka på ett mejl för att läsa det.",
              "short": "Inkorgen listar dina mejl. Klicka på ett för att läsa det.",
              "child": "E-post är som brev, fast i datorn. Inkorgen är din brevlåda – där hamnar alla mejl du får. Mejl du inte har läst än syns med fet stil och ett blått streck."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på ett mejl i listan i E-post för att läsa det.",
              "guided": "E-post är öppet. I mitten av fönstret finns en lista med mejl – det är inkorgen. Varje rad visar vem som skickade mejlet, vad det handlar om och början av texten. Klicka en gång på ett mejl, till exempel från Erik Lund. Hela mejlet visas då till höger.",
              "independent": "Öppna ett mejl i inkorgen.",
              "child.guided": "I mitten ser du en lista med mejl. Klicka på mejlet från Erik Lund. Nu kan du läsa det till höger!"
            },
            "hints": [
              "Listan med mejl finns i mitten av E-post.",
              "Varje rad visar avsändare, ämne och början av texten.",
              "Klicka en gång på ett mejl, till exempel från Erik Lund.",
              "Den gula ramen visar listan med mejl.",
              "Klicka på ett mejl i listan. Hela mejlet visas till höger."
            ],
            "nudge": "Dina mejl samlas på ett ställe i programmet."
          },
          {
            "title": "Klart",
            "text": "Du kan öppna mejl."
          }
        ],
        "detail": {
          "what": "Inkorgen är listan över e-postmeddelanden som du har fått.",
          "recognize": "Varje rad visar avsändare, ämne och ibland en förhandsvisning. Olästa mejl har fet text.",
          "use": "Du klickar på ett mejl i listan för att läsa hela innehållet.",
          "example": "Ett mejl från Anna med ämnet ”Bilder från utflykten” öppnas när du klickar på raden."
        }
      },
      "mail-002-reply": {
        "title": "Svara på ett mejl",
        "summary": "Svara på ett meddelande.",
        "steps": [
          {
            "title": "Svara",
            "text": {
              "default": "Svara skapar ett nytt mejl till den som skrev. Mottagare och ämne fylls i automatiskt – ämnet får SV: framför.",
              "short": "Svara skickar ett mejl tillbaka till avsändaren.",
              "child": "När någon har skrivit till dig kan du svara. Klickar du på Svara fyller datorn själv i vem det ska till och vad det handlar om. Du behöver bara skriva ditt svar."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna mejlet från Erik Lund, klicka på Svara, skriv några ord och klicka på Skicka.",
              "guided": "Klicka på mejlet från Erik Lund i listan i mitten. Ovanför mejlet till höger finns några knappar – klicka på Svara. Ett nytt mejl öppnas där Till och Ämne redan är ifyllda. Klicka i den stora rutan för text och skriv några ord. Klicka sedan på Skicka.",
              "independent": "Svara på mejlet från Erik Lund.",
              "child.guided": "Klicka på mejlet från Erik Lund i listan i mitten. Klicka på Svara ovanför mejlet till höger. Skriv några ord i den stora rutan. Klicka på Skicka."
            },
            "hints": [
              "Klicka på mejlet från Erik Lund i inkorgen.",
              "Klicka på Svara ovanför mejlet.",
              "Skriv några ord i den stora rutan.",
              "Den gula ramen visar listan med mejl.",
              "Eriks mejl → Svara → skriv ditt svar → Skicka."
            ],
            "nudge": "Du behöver först läsa mejlet du ska svara på."
          },
          {
            "title": "Klart",
            "text": "Du kan svara på mejl."
          }
        ],
        "detail": {
          "what": "Svara skapar ett nytt meddelande till den som skickade mejlet du läser.",
          "recognize": "Knappen heter Svara. Mottagarens adress fylls i och ämnet får SV: framför.",
          "use": "Använd Svara när ditt meddelande hör ihop med det du nyss läste.",
          "example": "Öppna Eriks mejl, välj Svara, skriv ”Fredag klockan 10 passar bra” och tryck Skicka."
        }
      },
      "mail-003-new": {
        "title": "Nytt mejl",
        "summary": "Skriv ett nytt meddelande.",
        "steps": [
          {
            "title": "Nytt mejl",
            "text": {
              "default": "Ett nytt mejl börjar med knappen Ny e-post. Du fyller i Till (mottagarens e-postadress), Ämne och själva meddelandet.",
              "short": "Ny e-post: fyll i Till, Ämne och meddelande.",
              "child": "Ett nytt mejl är som att skriva ett brev från början. Du skriver vem det ska till (deras e-postadress), vad det handlar om (ämnet) och själva brevet."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på Ny e-post, skriv anna@example.com i Till, fyll i ett ämne och ett meddelande och klicka på Skicka.",
              "guided": "Klicka på knappen Ny e-post uppe till vänster. Ett tomt mejl öppnas. Klicka i fältet Till och skriv anna@example.com – det är mottagarens adress. Klicka i fältet Ämne och skriv några ord om vad mejlet handlar om. Skriv sedan ditt meddelande i den stora rutan och klicka på Skicka.",
              "independent": "Skriv ett nytt mejl till anna@example.com och skicka det.",
              "child.guided": "Klicka på Ny e-post uppe till vänster. Skriv anna@example.com i rutan Till. Skriv vad mejlet handlar om i rutan Ämne. Skriv ditt meddelande i den stora rutan och klicka på Skicka."
            },
            "hints": [
              "Knappen Ny e-post sitter uppe till vänster.",
              "Skriv anna@example.com i fältet Till.",
              "Skriv ett ämne och ett kort meddelande.",
              "Den gula ramen visar knappen Ny e-post.",
              "Ny e-post → Till: anna@example.com → Ämne → meddelande → Skicka."
            ],
            "nudge": "Det finns en knapp för att börja skriva ett helt nytt mejl."
          },
          {
            "title": "Klart",
            "text": "Du kan skriva och skicka ett nytt mejl."
          }
        ],
        "detail": {
          "what": "Ett nytt mejl startas utan koppling till ett tidigare meddelande.",
          "recognize": "Du får fälten Till, Ämne och en stor ruta för meddelandet. En e-postadress innehåller alltid @.",
          "use": "Använd Ny e-post när du själv börjar en ny konversation.",
          "example": "Till: anna@example.com, Ämne: Fika på lördag, Meddelande: Hej Anna! …"
        }
      },
      "mail-004-attach": {
        "title": "Bifoga en fil",
        "summary": "Skicka en fil tillsammans med ett mejl.",
        "steps": [
          {
            "title": "Bifoga",
            "text": {
              "default": "En bifogad fil – en bilaga – skickas tillsammans med mejlet. Du väljer filen i rutan Öppna, precis som när du laddar upp på webben.",
              "short": "Bifoga fil skickar med en fil i mejlet.",
              "child": "En bilaga är något du skickar med i mejlet, som när du lägger en bild i ett kuvert. Du väljer filen i en ruta som heter Öppna, och den syns sedan med ett litet gem."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på Ny e-post och sedan Bifoga fil. Välj plan.txt i Dokument och klicka på Öppna.",
              "guided": "Klicka på Ny e-post uppe till vänster. Ovanför fälten i det nya mejlet finns en knapp med ett gem – Bifoga fil. Klicka på den. Rutan Öppna visas. Klicka på Dokument i vänsterspalten, klicka sedan på plan.txt och på knappen Öppna. Bilagan syns i mejlet med ett gem.",
              "independent": "Skapa ett nytt mejl och bifoga filen plan.txt.",
              "child.guided": "Klicka på Ny e-post. Klicka på gemet, Bifoga fil. Välj Dokument, klicka på plan.txt och sedan på Öppna. Nu sitter filen fast med ett gem!"
            },
            "hints": [
              "Klicka på Ny e-post.",
              "Klicka på Bifoga fil (gemet) i raden ovanför fälten.",
              "Rutan Öppna visas. plan.txt ligger i Dokument – klicka på Dokument till vänster.",
              "Den gula ramen visar knappen Ny e-post.",
              "Ny e-post → Bifoga fil → Dokument → plan.txt → Öppna. Bilagan visas med ett gem."
            ],
            "nudge": "Leta efter något som ser ut som ett gem."
          },
          {
            "title": "Klart",
            "text": "Du kan bifoga filer."
          }
        ],
        "detail": {
          "what": "En bilaga är en fil som skickas tillsammans med ett mejl.",
          "recognize": "Bilagor visas med ett gem och filens namn.",
          "use": "Använd bilagor när mottagaren behöver ett dokument, ett foto eller en annan fil.",
          "example": "Klicka Bifoga fil, välj plan.txt och kontrollera att filen syns i mejlet innan du skickar."
        }
      },
      "mail-005-download": {
        "title": "Ladda ned en bilaga",
        "summary": "Spara en bilaga från ett mejl på datorn.",
        "steps": [
          {
            "title": "Spara bilagan",
            "text": {
              "default": "En bilaga i ett mejl kan sparas som en fil på datorn. Den hamnar i Hämtade filer.",
              "short": "Ladda ned en bilaga så sparas den i Hämtade filer.",
              "child": "Har någon skickat en bild eller ett dokument i ett mejl kan du spara det i din dator. Det kallas att ladda ned bilagan, och den hamnar i mappen Hämtade filer."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Annas mejl och klicka på Ladda ned bredvid bilagan längst ned.",
              "guided": "Klicka på mejlet från Anna Berg i listan i mitten. Mejlet visas till höger. Längst ned i mejlet finns en ruta med bilagan utflykt.jpg. Bredvid den finns knappen Ladda ned. Klicka på den. Filen sparas i mappen Hämtade filer.",
              "independent": "Öppna Annas mejl och ladda ned bilagan.",
              "child.guided": "Klicka på Annas mejl. Längst ned finns en bild som heter utflykt.jpg. Klicka på Ladda ned bredvid den!"
            },
            "hints": [
              "Klicka på mejlet från Anna Berg.",
              "Längst ned i mejlet finns bilagan utflykt.jpg.",
              "Klicka på Ladda ned bredvid bilagan.",
              "Den gula ramen visar Annas mejl.",
              "Annas mejl → Ladda ned. Filen sparas i Hämtade filer."
            ],
            "nudge": "Bilagan sitter i ett av mejlen i inkorgen."
          },
          {
            "title": "Klart",
            "text": "Du kan spara bilagor."
          }
        ],
        "detail": {
          "what": "En bilaga som du har fått kan sparas som en fil på datorn.",
          "recognize": "I mejlet visas bilagans namn och en knapp för att ladda ned den.",
          "use": "Efter nedladdning hittar du filen i Hämtade filer.",
          "example": "Ladda ned utflykt.jpg från Annas mejl och öppna sedan Hämtade filer i Utforskaren."
        }
      },
      "mail-006-final": {
        "title": "E-post – slutuppdrag",
        "summary": "Öppna, ladda ned, svara och bifoga.",
        "steps": [
          {
            "title": "E-post – slutuppdrag",
            "text": {
              "default": "Nu använder du det viktigaste i E-post i ett och samma uppdrag.",
              "short": "Läs, ladda ned, svara och bifoga i ett uppdrag.",
              "child": "Nu är det dags att visa allt du kan om e-post. Du ska läsa ett mejl, spara bilagan, svara och skicka med en fil."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Annas mejl och ladda ned bilagan. Klicka Svara, skriv några ord, bifoga plan.txt och skicka.",
              "guided": "Ta ett moment i taget. Klicka på mejlet från Anna Berg. Klicka på Ladda ned bredvid bilagan längst ned. Klicka sedan på Svara och skriv några ord i den stora rutan. Klicka på gemet, Bifoga fil, välj Dokument och plan.txt och klicka på Öppna. Klicka på Skicka först när bilagan syns med ett gem.",
              "independent": "Spara bilagan i Annas mejl och svara henne med en bifogad fil.",
              "child.guided": "En sak i taget. Klicka på Annas mejl. Klicka på Ladda ned vid bilagan längst ned. Klicka på Svara och skriv några ord. Klicka på gemet, välj Dokument och plan.txt och klicka på Öppna. Klicka på Skicka när gemet syns."
            },
            "hints": [
              "Öppna mejlet från Anna Berg.",
              "Ladda ned bilagan i mejlet.",
              "Klicka Svara och skriv några ord.",
              "Klicka Bifoga fil och välj en fil – till exempel plan.txt i Dokument.",
              "Skicka först när bilagan syns med ett gem."
            ],
            "nudge": "Varje del har du gjort tidigare i E-post-modulen."
          },
          {
            "title": "Klart",
            "text": "E-postmodulen är klar."
          }
        ],
        "detail": {
          "what": "Det här uppdraget kombinerar att läsa, ladda ned, svara och bifoga.",
          "recognize": "En e-postapp har en lista med meddelanden och en vy där avsändare, ämne och text visas.",
          "use": "E-post används för meddelanden, dokument, bokningar och kontakt med företag och personer.",
          "example": "En e-postadress ser ut som namn@example.com. Ett mejl har mottagare, ämne och text."
        }
      },
      "security-001-passwords": {
        "title": "Lösenord och lösenfraser",
        "summary": "Förstå varför långa, unika lösenfraser är bättre.",
        "steps": [
          {
            "title": "Lösenord",
            "text": {
              "default": "Ett bra lösenord är långt, svårt att gissa och används bara på ett ställe. En lösenfras – flera ord i rad – är ofta både starkare och lättare att komma ihåg.",
              "short": "Använd långa, unika lösenord eller lösenfraser.",
              "child": "Ett lösenord är som nyckeln till ditt hem på nätet. En bra nyckel är lång och svår att gissa, och du använder den bara till ett ställe. Flera ord i rad, en lösenfras, är ofta lättast att komma ihåg – och svårast att lista ut."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet vad som gör ett lösenord bra."
          }
        ],
        "detail": {
          "what": "Ett lösenord visar att det är du som loggar in. En lösenfras är ett längre lösenord som består av flera ord.",
          "recognize": "Bra lösenord är långa, unika och svåra att gissa. Samma lösenord ska inte användas på flera viktiga konton.",
          "use": "Om ett lösenord läcker från en tjänst ska det inte ge åtkomst till dina andra konton.",
          "example": "”kaffe-cykel-moln-fyrtorn” är normalt mycket starkare än ”Sommar2026!”."
        }
      },
      "security-002-personal": {
        "title": "Personuppgifter och okända länkar",
        "summary": "Var försiktig med dina uppgifter och med länkar du inte känner igen.",
        "steps": [
          {
            "title": "Var försiktig",
            "text": {
              "default": "Lämna aldrig ut lösenord eller känsliga uppgifter bara för att ett mejl eller en sida ber om det. Kontrollera först vem som frågar och vilken adress du är på.",
              "short": "Lämna inte ut lösenord eller känsliga uppgifter till den som frågar.",
              "child": "Ditt lösenord och dina personliga uppgifter är dina hemligheter. Även om ett mejl eller en sida ber om dem ska du inte lämna ut dem. Fråga en vuxen du litar på om du blir osäker."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet när du ska stanna upp och kontrollera."
          }
        ],
        "detail": {
          "what": "Personuppgifter är information som kan kopplas till dig, till exempel namn, adress, personnummer, telefonnummer och kontouppgifter.",
          "recognize": "En okänd länk kan se trovärdig ut även om adressen bakom den leder någon annanstans.",
          "use": "Dela känsliga uppgifter bara när du vet vem som frågar och varför.",
          "example": "En bank ber aldrig om ditt lösenord i ett mejl."
        }
      },
      "security-003-phishing": {
        "title": "Bluffmejl (nätfiske)",
        "summary": "Känn igen ett misstänkt mejl och rapportera det.",
        "steps": [
          {
            "title": "Bluffmejl",
            "text": {
              "default": "Nätfiske – phishing – är mejl som låtsas komma från någon du litar på för att lura dig att lämna ut lösenord eller pengar. Typiska tecken är brådska, hot och en konstig avsändaradress.",
              "short": "Bluffmejl skyndar på dig och låtsas vara någon du litar på.",
              "child": "Ett bluffmejl är som en lurendrejare som klär ut sig. Det låtsas komma från någon du litar på, till exempel din bank, för att lura dig. Ofta försöker det stressa dig: \"Gör det nu, annars händer något!\""
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna mejlet som försöker skynda på dig och klicka på Rapportera ovanför mejlet.",
              "guided": "Titta igenom listan med mejl i mitten. Ett av dem har ett stressande ämne: BRÅDSKANDE: Ditt konto stängs i dag. Klicka en gång på det mejlet. Klicka inte på något inne i texten. Titta på avsändarens adress – den ser konstig ut. Klicka på Rapportera ovanför mejlet och bekräfta med Rapportera.",
              "independent": "Öppna bluffmejlet och rapportera det.",
              "child.guided": "Hitta mejlet som skriker BRÅDSKANDE. Öppna det, men klicka inte på något i texten! Klicka på Rapportera högst upp och sedan på Rapportera igen."
            },
            "hints": [
              "Leta efter ett mejl som försöker skynda på dig.",
              "Öppna det och titta på avsändarens adress. Klicka inte på något i texten.",
              "Klicka på Rapportera ovanför mejlet.",
              "Den gula ramen visar det misstänkta mejlet.",
              "Mejlet BRÅDSKANDE: Ditt konto stängs i dag → Rapportera → Rapportera."
            ],
            "nudge": "Ett av mejlen försöker få dig att göra något väldigt snabbt."
          },
          {
            "title": "Klart",
            "text": "Du kan känna igen och rapportera bluffmejl."
          }
        ],
        "detail": {
          "what": "Nätfiske är en bluff där någon låtsas vara någon du litar på för att få lösenord, pengar eller andra uppgifter.",
          "recognize": "Varningssignaler är brådska, hot, en avsändaradress som inte stämmer, oväntade länkar och krav på lösenord eller betalning.",
          "use": "Stanna upp och kontrollera innan du klickar eller svarar. Rapportera mejlet och ta bort det.",
          "example": "Ett oväntat mejl med ämnet ”BRÅDSKANDE: Ditt konto stängs i dag” som ber om ditt lösenord är en tydlig varningssignal."
        }
      },
      "windows-009-resize": {
        "title": "Ändra fönsterstorlek",
        "summary": "Gör ett fönster större eller mindre.",
        "steps": [
          {
            "title": "Ändra storlek",
            "text": {
              "default": "Ett fönster kan göras bredare, smalare, högre eller lägre utan att maximeras. Du drar i fönstrets kant eller hörn.",
              "short": "Dra i fönstrets kant eller hörn för att ändra storleken.",
              "child": "Ett fönster kan bli lite större eller lite mindre, utan att fylla hela skärmen. Du tar tag i fönstrets kant eller hörn och drar, ungefär som när du drar ut ett dragspel."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Dra i Kalkylatorns nedre högra hörn för att göra fönstret större eller mindre.",
              "guided": "Titta på Kalkylatorns fönster och hitta det nedre högra hörnet. Flytta pekaren långsamt dit. När pekaren ligger exakt på hörnet ändras den till en dubbelpil med spetsar åt två håll. Tryck då ned vänster musknapp, håll kvar och dra utåt eller inåt. Släpp när storleken passar.",
              "independent": "Gör Kalkylatorns fönster större eller mindre utan att maximera det.",
              "child.guided": "Gå till Kalkylatorns nedre högra hörn. När pilen blir en dubbelpil trycker du och håller vänster knapp. Dra – och fönstret växer eller krymper!"
            },
            "hints": [
              "Leta upp Kalkylatorns nedre högra hörn.",
              "När pekaren är exakt på hörnet blir den en dubbelpil.",
              "Tryck och håll vänster musknapp och dra utåt eller inåt.",
              "Den gula ramen visar hörnet du ska dra i.",
              "Pekaren på nedre högra hörnet → håll → dra → släpp."
            ],
            "nudge": "Det går att ta tag i fönstret på fler ställen än i namnlisten."
          },
          {
            "title": "Klart",
            "text": "Du kan ändra storlek på ett fönster."
          }
        ],
        "detail": {
          "what": "Du kan göra ett vanligt fönster bredare, smalare, högre eller lägre utan att maximera det.",
          "recognize": "När pekaren är över en fönsterkant eller ett hörn ändras den till en dubbelpil.",
          "use": "Då kan flera fönster få plats bredvid varandra.",
          "example": "Dra i fönstrets nedre högra hörn för att ändra både bredd och höjd."
        }
      },
      "windows-010-switch": {
        "title": "Växla mellan program",
        "summary": "Växla mellan öppna program i aktivitetsfältet.",
        "steps": [
          {
            "title": "Växla program",
            "text": {
              "default": "När flera program är öppna ligger det senast valda fönstret överst. Du byter program genom att klicka på dess ikon i aktivitetsfältet.",
              "short": "Byt program genom att klicka på dess ikon i aktivitetsfältet.",
              "child": "När flera program är öppna ligger de som papper i en hög. Det du valde sist ligger överst. Vill du se ett annat klickar du på dess bild i raden längst ned, så hamnar det överst."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på det andra programmets ikon i aktivitetsfältet för att byta till det.",
              "guided": "Titta på aktivitetsfältet längst ned på skärmen. Under ikonerna för öppna program finns ett litet streck. Programmet som är aktivt just nu har ett längre, blått streck. Klicka en gång på ikonen för det andra öppna programmet – det med det korta strecket. Då hamnar det fönstret överst.",
              "independent": "Byt till det andra öppna programmet.",
              "child.guided": "Titta på raden längst ned. Två program är öppna och har ett streck under sig. Klicka på det som INTE har det långa blå strecket. Nu hamnar det överst!"
            },
            "hints": [
              "Titta på aktivitetsfältet längst ned.",
              "Öppna program har ett litet streck under ikonen. Det aktiva programmet har ett längre, blått streck.",
              "Klicka på ikonen för det program som inte är aktivt.",
              "Den gula ramen visar ikonerna i aktivitetsfältet.",
              "Klicka på Kalkylator eller Anteckningar i aktivitetsfältet – det som inte är överst just nu."
            ],
            "nudge": "Raden längst ned visar vilka program som är öppna."
          },
          {
            "title": "Klart",
            "text": "Du kan växla mellan program."
          }
        ],
        "detail": {
          "what": "När flera program är öppna kan du välja vilket fönster som ska ligga överst och ta emot dina klick och tangenttryck.",
          "recognize": "Öppna program har ett streck under ikonen i aktivitetsfältet.",
          "use": "Du behöver växla när information finns i ett program men ska användas i ett annat.",
          "example": "Klicka på Kalkylatorns ikon i aktivitetsfältet för att ta fram Kalkylator."
        }
      },
      "windows-010b-alt-tab": {
        "title": "Alt+Tab",
        "summary": "Lär dig kortkommandot för att växla program.",
        "steps": [
          {
            "title": "Alt+Tab",
            "text": {
              "default": "På en riktig dator kan du hålla ned Alt och trycka Tab för att växla mellan öppna program. Fortsätt trycka Tab för att välja nästa och släpp Alt för att byta. Din riktiga dator fångar den här kombinationen innan webbläsaren ser den, så i övningsdatorn byter du program med aktivitetsfältet.",
              "short": "Alt+Tab växlar mellan öppna program på en riktig dator.",
              "child": "På en riktig dator finns ett snabbt knep för att byta program: håll ned Alt och tryck på Tab. Då ser du alla öppna program och kan bläddra mellan dem. I övningsdatorn fungerar inte knepet, för din riktiga dator tar hand om det först, så här använder du raden längst ned i stället."
            }
          },
          {
            "title": "Klart",
            "text": "Du känner till Alt+Tab."
          }
        ],
        "detail": {
          "what": "Alt+Tab är kortkommandot för att växla mellan öppna program.",
          "recognize": "När du håller Alt och trycker Tab visar Windows små bilder av alla öppna fönster.",
          "use": "Det är snabbare än att flytta handen till musen när du växlar ofta.",
          "example": "Håll Alt, tryck Tab en gång och släpp – då kommer du tillbaka till fönstret du använde nyss."
        }
      },
      "files-010-search": {
        "title": "Sök efter en fil",
        "summary": "Använd sökrutan i Utforskaren.",
        "steps": [
          {
            "title": "Sök i en mapp",
            "text": {
              "default": "Uppe till höger i Utforskaren finns en sökruta. Det du skriver där filtrerar bort allt som inte matchar.",
              "short": "Utforskarens sökruta visar bara det som matchar.",
              "child": "När en mapp är full av filer kan det vara svårt att hitta rätt. Då kan du söka. Du skriver en del av namnet i sökrutan, så visas bara de filer som passar."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i sökrutan uppe till höger i Utforskaren och skriv Hitta.",
              "guided": "Titta uppe till höger i Utforskarens fönster. Där finns en avlång ruta med ett förstoringsglas där det står Sök i Dokument. Klicka i den rutan. Skriv sedan ordet Hitta. Listan med filer krymper medan du skriver, och bara Hitta mig.txt blir kvar.",
              "independent": "Sök i Dokument efter filen vars namn börjar med Hitta.",
              "child.guided": "Uppe till höger finns en ruta med ett förstoringsglas. Klicka där och skriv Hitta. Se hur de andra filerna försvinner tills bara rätt fil är kvar!"
            },
            "hints": [
              "Titta uppe till höger i Utforskaren.",
              "Där finns en ruta där det står Sök i Dokument.",
              "Klicka i rutan och skriv Hitta.",
              "Den gula ramen visar sökrutan.",
              "Klicka i sökrutan och skriv Hitta. Filen Hitta mig.txt syns."
            ],
            "nudge": "Det finns ett sätt att låta datorn leta i en mapp åt dig."
          },
          {
            "title": "Klart",
            "text": "Du kan söka efter filer."
          }
        ],
        "detail": {
          "what": "Sökningen visar bara filer vars namn matchar det du skriver.",
          "recognize": "I Utforskaren finns sökrutan uppe till höger, bredvid adressfältet.",
          "use": "Det hjälper när du vet ungefär vad filen heter men inte exakt var den ligger.",
          "example": "Skriv Hitta så visas filen Hitta mig.txt."
        }
      },
      "internet-009-bookmark": {
        "title": "Bokmärken",
        "summary": "Spara en sida så att den är lätt att hitta igen.",
        "steps": [
          {
            "title": "Bokmärken",
            "text": {
              "default": "Ett bokmärke sparar adressen till en sida. Du bokmärker med stjärnan längst till höger i adressfältet. Bokmärken visas sedan i en rad under adressfältet.",
              "short": "Stjärnan i adressfältet sparar sidan som bokmärke.",
              "child": "Ett bokmärke i webbläsaren fungerar som ett bokmärke i en bok: det hjälper dig att hitta tillbaka till en sida du gillar. Du gör ett bokmärke med stjärnan i adressfältet."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna sidan Vad är internet? och klicka på stjärnan längst till höger i adressfältet.",
              "guided": "Startsidan går inte att bokmärka, så öppna först en sida: klicka på genvägen ”Vad är internet?”. Titta sedan på adressfältet högst upp. Längst till höger inne i fältet finns en liten stjärna. Klicka en gång på den. Stjärnan blir blå och sidan sparas i bokmärkesraden under adressfältet.",
              "independent": "Bokmärk en webbsida.",
              "child.guided": "Klicka på ”Vad är internet?”. Hitta den lilla stjärnan längst till höger i den långa rutan högst upp. Klicka på stjärnan – nu blir den blå och sidan är sparad!"
            },
            "hints": [
              "Startsidan kan inte bokmärkas – öppna först en sida, till exempel Vad är internet?",
              "Titta längst till höger inne i adressfältet.",
              "Där finns en stjärna. Klicka på den.",
              "Den gula ramen visar adressfältet där stjärnan sitter.",
              "Öppna Vad är internet? → klicka på stjärnan i adressfältet. Stjärnan blir blå."
            ],
            "nudge": "Du behöver vara på en riktig sida, inte på startsidan."
          },
          {
            "title": "Klart",
            "text": "Du kan bokmärka sidor."
          }
        ],
        "detail": {
          "what": "Ett bokmärke sparar adressen till en webbsida så att du lätt hittar tillbaka.",
          "recognize": "I webbläsaren är det en stjärna längst till höger i adressfältet. En blå stjärna betyder att sidan redan är bokmärkt.",
          "use": "Bokmärken passar för sidor du besöker ofta.",
          "example": "Bokmärk din banks riktiga adress, så slipper du söka efter den – och risken att hamna på en falsk sida minskar."
        }
      },
      "internet-010-cookie": {
        "title": "Cookies",
        "summary": "Hantera en cookie-ruta på en webbsida.",
        "steps": [
          {
            "title": "Cookies",
            "text": {
              "default": "Många webbplatser visar en ruta om cookies när du kommer dit första gången. Läs vad den säger – du får ofta välja mellan Godkänn alla och Avvisa.",
              "short": "Läs cookie-rutan och välj Godkänn alla eller Avvisa.",
              "child": "Cookies är små anteckningar som en webbplats sparar i din webbläsare, till exempel om vad du har valt. Många sidor frågar först om det är okej. Läs rutan innan du klickar."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Läs cookie-rutan längst ned på webbläsarens startsida och klicka på Godkänn alla.",
              "guided": "Titta längst ned på webbläsarens startsida. Där finns en ruta som handlar om cookies. Läs texten i den – den förklarar vad sidan vill spara. Klicka sedan på knappen Godkänn alla i rutan. På riktiga webbplatser kan du lika gärna välja Avvisa om du inte vill dela mer än nödvändigt.",
              "independent": "Godkänn cookie-rutan på webbläsarens startsida.",
              "child.guided": "Titta längst ned på sidan. Där finns en ruta om cookies. Läs den först. Klicka sedan på knappen Godkänn alla i rutan."
            },
            "hints": [
              "Cookie-rutan ligger längst ned på startsidan.",
              "Läs texten i rutan.",
              "Klicka på Godkänn alla.",
              "Den gula ramen visar cookie-rutan.",
              "Klicka på Godkänn alla i rutan längst ned. På riktiga sidor kan du lika gärna välja Avvisa."
            ],
            "nudge": "Leta efter en ruta som ber dig om ett val."
          },
          {
            "title": "Klart",
            "text": "Du kan hantera cookie-rutor."
          }
        ],
        "detail": {
          "what": "Cookies är små uppgifter som en webbplats sparar i webbläsaren, till exempel dina val eller att du är inloggad.",
          "recognize": "Webbplatser visar ofta en ruta om cookies med knappar som Godkänn alla, Avvisa eller Inställningar.",
          "use": "Vissa cookies behövs för att sidan ska fungera. Andra används för statistik och reklam – dem kan du ofta avvisa.",
          "example": "Läs valen i stället för att automatiskt trycka Godkänn. Avvisa fungerar på de flesta seriösa sidor."
        }
      },
      "internet-011-upload": {
        "title": "Ladda upp en fil",
        "summary": "Välj en fil från datorn i ett webbformulär.",
        "steps": [
          {
            "title": "Ladda upp",
            "text": {
              "default": "Att ladda upp är motsatsen till att ladda ned: du skickar en fil från datorn till en webbplats. Du väljer filen i en ruta som heter Öppna.",
              "short": "Ladda upp: välj en fil i rutan Öppna och skicka den till webbplatsen.",
              "child": "Att ladda upp är motsatsen till att ladda ned. Nu skickar du en fil från din dator till en webbplats, till exempel en bild. Du väljer filen i en ruta som heter Öppna."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Kontaktformulär, klicka på Välj fil och välj profil.txt i Dokument.",
              "guided": "Klicka på genvägen Kontaktformulär på webbläsarens startsida. Leta upp knappen Välj fil i formuläret och klicka på den. En ruta som heter Öppna visas. Klicka på Dokument till vänster i rutan. Klicka sedan på filen profil.txt och på knappen Öppna. Filens namn visas bredvid knappen Välj fil.",
              "independent": "Bifoga profil.txt i kontaktformuläret.",
              "child.guided": "Klicka på genvägen Kontaktformulär mitt på sidan. Klicka på knappen Välj fil. En ruta som heter Öppna kommer fram. Klicka på Dokument till vänster, sedan på profil.txt och till sist på Öppna."
            },
            "hints": [
              "Klicka på genvägen Kontaktformulär på webbläsarens startsida.",
              "Klicka på knappen Välj fil.",
              "Rutan Öppna visas. Filen profil.txt ligger i Dokument.",
              "Den gula ramen visar formuläret.",
              "Välj fil → Dokument → klicka på profil.txt → Öppna. Filnamnet visas bredvid knappen."
            ],
            "nudge": "Formuläret har en knapp för att bifoga något från datorn."
          },
          {
            "title": "Klart",
            "text": "Du kan ladda upp en fil."
          }
        ],
        "detail": {
          "what": "Att ladda upp betyder att du skickar en fil från din dator till en webbsida eller tjänst.",
          "recognize": "Knappen kan heta Välj fil, Ladda upp eller ha ett gem. När du klickar öppnas Windows-rutan Öppna.",
          "use": "Uppladdning används när du bifogar ett CV, skickar ett foto eller lämnar in ett dokument.",
          "example": "Klicka Välj fil, gå till Dokument, markera filen och klicka Öppna."
        }
      },
      "mail-007-forward": {
        "title": "Vidarebefordra ett mejl",
        "summary": "Skicka ett mejl du har fått vidare till någon annan.",
        "steps": [
          {
            "title": "Vidarebefordra",
            "text": {
              "default": "Vidarebefordra skickar ett mejl du har fått vidare till en ny mottagare. Originalets text följer med och ämnet får VB: framför.",
              "short": "Vidarebefordra skickar ett mejl vidare till någon annan.",
              "child": "Att vidarebefordra är som att skicka vidare ett brev du har fått till en kompis. Hela texten följer med, och du skriver bara vem den nya mottagaren är."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Eriks mejl, klicka på Vidarebefordra, skriv anna@example.com i Till och klicka på Skicka.",
              "guided": "Klicka på mejlet från Erik Lund. Ovanför mejlet till höger finns knappen Vidarebefordra. Klicka på den. Ett nytt mejl öppnas, och Eriks text finns redan med. Klicka i fältet Till och skriv anna@example.com. Klicka sedan på Skicka.",
              "independent": "Vidarebefordra Eriks mejl till någon annan.",
              "child.guided": "Klicka på mejlet från Erik Lund i listan i mitten. Klicka på Vidarebefordra ovanför mejlet till höger. Skriv anna@example.com i rutan Till. Klicka på Skicka."
            },
            "hints": [
              "Klicka på mejlet från Erik Lund.",
              "Klicka på Vidarebefordra ovanför mejlet.",
              "Skriv en e-postadress i fältet Till, till exempel anna@example.com.",
              "Den gula ramen visar listan med mejl.",
              "Eriks mejl → Vidarebefordra → Till: anna@example.com → Skicka."
            ],
            "nudge": "Det är inte samma sak som att svara – mejlet ska till någon ny."
          },
          {
            "title": "Klart",
            "text": "Du kan vidarebefordra mejl."
          }
        ],
        "detail": {
          "what": "Vidarebefordra skickar ett mejl du har fått vidare till en ny mottagare.",
          "recognize": "Knappen heter Vidarebefordra. Originalets innehåll följer med och ämnet får VB: framför.",
          "use": "Använd det när någon annan behöver informationen i mejlet.",
          "example": "Vidarebefordra en mötesinbjudan till en kollega som också ska komma."
        }
      },
      "windows-011-search": {
        "title": "Sök efter program",
        "summary": "Hitta ett program med sökrutan i Start.",
        "steps": [
          {
            "title": "Sök i Start",
            "text": {
              "default": "Start-menyn har en sökruta högst upp. Skriv namnet på ett program så visas det under Bästa matchning.",
              "short": "Skriv i Start-menyns sökruta för att hitta ett program.",
              "child": "Om du inte hittar ett program kan du fråga datorn. Öppna Start-menyn och skriv namnet på programmet. Datorn letar åt dig och visar det överst, under Bästa matchning."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Start-menyn och skriv Kalkylator i sökrutan högst upp.",
              "guided": "Klicka på Start-knappen längst ned på skärmen. Högst upp i Start-menyn finns en lång ruta där det står Sök. Den är redan vald, så du kan börja skriva direkt utan att klicka. Skriv ordet Kalkylator. Programmet dyker upp under Bästa matchning.",
              "independent": "Sök fram Kalkylator.",
              "child.guided": "Klicka på Start-knappen. Börja skriva Kalkylator direkt – datorn letar medan du skriver. Kalkylatorn dyker upp överst!"
            },
            "hints": [
              "Börja med att öppna Start-menyn.",
              "Sökrutan högst upp är redan aktiv – du kan börja skriva direkt.",
              "Skriv ordet Kalkylator.",
              "Den gula ramen visar Start-knappen.",
              "Start → skriv Kalkylator. Tryck Retur för att öppna Bästa matchning."
            ],
            "nudge": "Du behöver inte leta själv – datorn kan leta åt dig."
          },
          {
            "title": "Klart",
            "text": "Du kan söka efter program i Start."
          }
        ],
        "detail": {
          "what": "Start-menyn har en sökfunktion där du skriver namnet på ett program i stället för att leta själv.",
          "recognize": "Sökrutan sitter högst upp i Start. Du kan också klicka på Sök i aktivitetsfältet. Träffarna visas medan du skriver.",
          "use": "Det är ofta det snabbaste sättet att hitta ett program du vet namnet på.",
          "example": "Skriv kalk så visas Kalkylator som Bästa matchning."
        }
      },
      "files-011-drag": {
        "title": "Dra en fil till en mapp",
        "summary": "Flytta en fil genom att dra den till en mapp i vänsterspalten.",
        "steps": [
          {
            "title": "Dra och släpp filer",
            "text": {
              "default": "Du kan flytta en fil genom att dra den med musen och släppa den på en mapp.",
              "short": "Dra en fil och släpp den på en mapp för att flytta den.",
              "child": "Du kan flytta en fil precis som du flyttade rutan i musövningen: ta tag i den, dra den och släpp den på en mapp."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Dra Dra mig.txt med musen och släpp den på Hämtade filer i vänsterspalten.",
              "guided": "Lägg pekaren på Dra mig.txt i Dokument. Tryck ned vänster musknapp och håll kvar. Flytta musen åt vänster, mot spalten till vänster, tills pekaren ligger över Hämtade filer. Raden blir markerad när du är rätt. Släpp då musknappen. Filen flyttas till Hämtade filer.",
              "independent": "Flytta Dra mig.txt till Hämtade filer med musen.",
              "child.guided": "Tryck och håll på Dra mig.txt. Dra den till Hämtade filer i spalten till vänster. När raden lyser upp släpper du knappen. Klart!"
            },
            "hints": [
              "Dra mig.txt ligger i Dokument.",
              "Tryck och håll vänster musknapp på filen.",
              "Dra den till Hämtade filer i vänsterspalten. Mappen markeras när du är över den.",
              "Den gula ramen visar Hämtade filer.",
              "Håll på Dra mig.txt → dra till Hämtade filer → släpp."
            ],
            "nudge": "Du kan flytta filen med musen utan att använda någon knapp i fönstret."
          },
          {
            "title": "Klart",
            "text": "Du kan flytta filer genom att dra dem."
          }
        ],
        "detail": {
          "what": "En fil kan flyttas genom att du drar den från ett ställe till ett annat med musen.",
          "recognize": "När du håller filen över en mapp markeras mappen.",
          "use": "Det är ett snabbt alternativ till Klipp ut och Klistra in.",
          "example": "Dra Dra mig.txt till Hämtade filer i vänsterspalten och släpp."
        }
      },
      "internet-012-refresh": {
        "title": "Läs in sidan igen",
        "summary": "Ladda om den aktuella webbsidan.",
        "steps": [
          {
            "title": "Läs in igen",
            "text": {
              "default": "Knappen med en rund pil läser in webbsidan igen. Det hjälper när sidan inte har laddats klart eller när innehållet kan ha ändrats.",
              "short": "Den runda pilen läser in sidan igen.",
              "child": "Ibland fastnar en sida eller visar gammal information. Då kan du be webbläsaren hämta sidan en gång till med knappen som ser ut som en rund pil."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på knappen Läs in igen – den runda pilen uppe till vänster i webbläsaren.",
              "guided": "Titta uppe till vänster i webbläsaren. Där finns pilarna för Bakåt och Framåt. Strax till höger om dem sitter en knapp som ser ut som en pil i en cirkel – det är Läs in igen. Klicka en gång på den. Sidan hämtas på nytt.",
              "independent": "Läs in webbsidan igen.",
              "child.guided": "Titta uppe till vänster i webbläsaren, bredvid pilarna. Där finns en rund pil. Klicka på den så hämtas sidan en gång till."
            },
            "hints": [
              "Titta uppe till vänster i webbläsaren, bredvid pilarna.",
              "Knappen ser ut som en rund pil.",
              "Klicka på den en gång.",
              "Den gula ramen visar knappen.",
              "Klicka på den runda pilen – eller tryck F5."
            ],
            "nudge": "Knappen sitter bredvid pilarna du använde för att gå bakåt."
          },
          {
            "title": "Klart",
            "text": "Du kan läsa in en sida igen."
          }
        ],
        "detail": {
          "what": "Läs in igen laddar om den webbsida du är på.",
          "recognize": "Knappen är en rund pil till vänster om adressfältet.",
          "use": "Använd den om sidan har fastnat, inte laddades rätt eller om du väntar på nytt innehåll.",
          "example": "Klicka på den runda pilen för att ladda om sidan."
        }
      },
      "internet-013-close-tab": {
        "title": "Stäng en flik",
        "summary": "Öppna en extra flik och stäng den igen.",
        "steps": [
          {
            "title": "Stäng flik",
            "text": {
              "default": "Varje flik har ett eget litet kryss. Det stänger bara den fliken – inte hela webbläsaren.",
              "short": "Flikens kryss stänger bara den fliken.",
              "child": "Varje flik har ett eget litet kryss. Det stänger bara den fliken, inte hela webbläsaren. Det stora krysset uppe i hörnet stänger allt – det ska du inte använda nu."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna en ny flik med plusknappen och stäng den med det lilla krysset på fliken.",
              "guided": "Klicka på plustecknet till höger om flikarna högst upp i webbläsaren, så öppnas en ny flik. Titta på den nya fliken: till höger om dess namn finns ett litet kryss. Klicka på det lilla krysset. Klicka inte på det stora krysset längst upp till höger – det stänger hela webbläsaren.",
              "independent": "Öppna en ny flik och stäng sedan bara den fliken.",
              "child.guided": "Klicka på plus för en ny flik. På den nya fliken finns ett litet kryss. Klicka på det lilla krysset – inte det stora i hörnet!"
            },
            "hints": [
              "Klicka på plustecknet bredvid flikarna för att öppna en ny flik.",
              "Den nya fliken har ett litet kryss till höger om namnet.",
              "Klicka på flikens kryss – inte på det stora krysset längst upp till höger.",
              "Den gula ramen visar plusknappen.",
              "+ → klicka på krysset på den nya fliken. Ctrl+W stänger också en flik."
            ],
            "nudge": "Det finns mer än ett kryss högst upp. Fundera på vilket som hör till fliken."
          },
          {
            "title": "Klart",
            "text": "Du kan stänga en flik utan att stänga webbläsaren."
          }
        ],
        "detail": {
          "what": "Att stänga en flik stänger bara den webbsidan, inte hela webbläsaren.",
          "recognize": "Varje flik har ett litet kryss. Webbläsarens fönster har ett större kryss längst upp till höger.",
          "use": "Det är viktigt att skilja på att stänga en flik och att stänga hela programmet.",
          "example": "Öppna en extra flik och stäng just den med dess kryss."
        }
      },
      "windows-012-desktop": {
        "title": "Skrivbord och ikoner",
        "summary": "Öppna något direkt från skrivbordet.",
        "steps": [
          {
            "title": "Skrivbordet",
            "text": {
              "default": "Skrivbordet är bakgrunden bakom alla fönster. Ikonerna på skrivbordet öppnar du med ett dubbelklick.",
              "short": "Öppna ikoner på skrivbordet med ett dubbelklick.",
              "child": "Skrivbordet är bakgrunden som syns bakom alla fönster, som en bordsskiva. Bilderna på skrivbordet heter ikoner. Du öppnar dem med ett dubbelklick: klick-klick."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Dubbelklicka på ikonen Dokument på skrivbordet.",
              "guided": "Titta längst upp till vänster på skrivbordet. Där sitter några ikoner med namn under. Leta upp den gula mappen som heter Dokument. Håll pekaren stilla på den och klicka två gånger snabbt med vänster musknapp. Mappen öppnas i ett fönster som heter Utforskaren.",
              "independent": "Öppna mappen Dokument från skrivbordet.",
              "child.guided": "Uppe till vänster finns en gul mapp som heter Dokument. Lägg pilen på den och klicka två gånger snabbt: klick-klick! Då öppnas mappen."
            },
            "hints": [
              "Ikonerna sitter längst upp till vänster på skrivbordet.",
              "Leta upp ikonen med namnet Dokument.",
              "Dubbelklicka – två snabba klick – på ikonen.",
              "Den gula ramen visar ikonen Dokument.",
              "Håll pekaren stilla på Dokument och klicka två gånger snabbt. Mappen öppnas i Utforskaren."
            ],
            "nudge": "Det som syns på skrivbordet öppnas på samma sätt som du tränade med musen."
          },
          {
            "title": "Klart",
            "text": "Du kan öppna saker från skrivbordet."
          }
        ],
        "detail": {
          "what": "Skrivbordet är grundytan bakom dina öppna program. Ikoner är små bilder som står för mappar, filer eller program.",
          "recognize": "En ikon har en bild och ett namn under, till exempel Papperskorgen eller Dokument.",
          "use": "Skrivbordet kan vara en snabb plats för sådant du öppnar ofta.",
          "example": "Dubbelklicka på Dokument för att öppna mappen i Utforskaren."
        }
      },
      "windows-013-taskbar": {
        "title": "Aktivitetsfält och klocka",
        "summary": "Förstå aktivitetsfältet, öppna program och klockan.",
        "steps": [
          {
            "title": "Aktivitetsfältet",
            "text": {
              "default": "Aktivitetsfältet är raden längst ned. I mitten finns Start, Sök och dina program. Till höger finns nätverk, ljud, batteri och klockan. Ett minimerat program tar du fram genom att klicka på dess ikon.",
              "short": "Aktivitetsfältet visar Start, program, nätverk, ljud och klocka.",
              "child": "Raden längst ned på skärmen heter aktivitetsfältet. I mitten finns Start-knappen och de program du använder. Längst till höger ser du om datorn har internet, hur högt ljudet är, hur mycket batteri som finns kvar och vad klockan är."
            }
          },
          {
            "title": "Klart",
            "text": "Du känner igen aktivitetsfältets delar."
          }
        ],
        "detail": {
          "what": "Aktivitetsfältet är raden längst ned i Windows. Där finns Start, öppna och fästa program samt systeminformation.",
          "recognize": "Till höger visas klocka, datum, ljud, nätverk och batteri. I mitten sitter Start-knappen och programikonerna.",
          "use": "Aktivitetsfältet används för att starta och växla mellan program och för att se datorns status.",
          "example": "Ett minimerat program har inte försvunnit. Klicka på dess ikon i aktivitetsfältet för att ta fram det igen."
        }
      },
      "internet-014-search": {
        "title": "Sök på webben",
        "summary": "Sök efter information med en sökruta.",
        "steps": [
          {
            "title": "Sökning",
            "text": {
              "default": "När du inte vet adressen kan du söka. Skriv några ord om det du letar efter, så får du en lista med länkar.",
              "short": "Sök med några ord när du inte vet adressen.",
              "child": "Om du inte vet adressen till en sida kan du söka, ungefär som att fråga i en stor bibliotekskatalog. Skriv några ord om det du letar efter, så får du en lista med länkar."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka i sökrutan mitt på webbläsarens startsida, skriv några ord och tryck Retur.",
              "guided": "Titta mitt på webbläsarens startsida. Där finns en stor, rundad ruta – det är sökrutan. Klicka i den. Skriv några ord om det du vill veta, till exempel säkra lösenord. Tryck sedan på Retur. En lista med sökresultat visas, och varje rad är en länk.",
              "independent": "Sök på webben efter något du undrar över.",
              "child.guided": "Klicka i den stora rundade rutan mitt på sidan. Skriv något du undrar över, till exempel säkra lösenord, och tryck Retur."
            },
            "hints": [
              "Sökrutan är den stora rundade rutan mitt på startsidan.",
              "Klicka i den.",
              "Skriv några ord, till exempel säkra lösenord, och tryck Retur.",
              "Den gula ramen visar sökrutan.",
              "Klicka i sökrutan → skriv → Retur. Sökresultaten visas som en lista med länkar."
            ],
            "nudge": "Du behöver inte kunna adressen för att hitta något."
          },
          {
            "title": "Klart",
            "text": "Du kan söka på webben."
          }
        ],
        "detail": {
          "what": "En sökmotor hjälper dig hitta webbsidor när du skriver ord i stället för en exakt adress.",
          "recognize": "Sökrutan har ett förstoringsglas. Du kan också skriva sökord direkt i adressfältet. Resultatet blir en lista med länkar.",
          "use": "Sök när du vet vad du letar efter men inte vilken webbplats som har informationen.",
          "example": "Skriv säkra lösenord och tryck Retur. Titta på adressen under varje resultat innan du klickar."
        }
      },
      "security-004-mfa": {
        "title": "Tvåstegsverifiering",
        "summary": "Förstå varför en extra kontroll skyddar kontot.",
        "steps": [
          {
            "title": "Tvåstegsverifiering",
            "text": {
              "default": "Med tvåstegsverifiering räcker inte lösenordet. Du bekräftar också på ett annat sätt, till exempel med en kod i mobilen eller en app.",
              "short": "Tvåstegsverifiering kräver något mer än lösenordet.",
              "child": "Med tvåstegsverifiering behövs två saker för att komma in, ungefär som en dörr med två lås. Först lösenordet, och sedan till exempel en kod som skickas till en mobil. Även om någon får reda på lösenordet kommer de inte in."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet varför tvåstegsverifiering skyddar dina konton."
          }
        ],
        "detail": {
          "what": "Tvåstegsverifiering – ofta kallat 2FA – kräver en extra kontroll utöver lösenordet.",
          "recognize": "Det kan vara en sms-kod, en notis i en app, en säkerhetsnyckel eller ditt fingeravtryck.",
          "use": "Det gör kontot mycket svårare att kapa, även om någon får tag på ditt lösenord.",
          "example": "Du skriver ditt lösenord och godkänner sedan inloggningen i en app i mobilen."
        }
      },
      "security-005-https": {
        "title": "Webbadresser och HTTPS",
        "summary": "Läs webbadressen innan du lämnar känsliga uppgifter.",
        "steps": [
          {
            "title": "Läs adressen",
            "text": {
              "default": "Kontrollera alltid vilken webbplats du faktiskt är på. HTTPS och hänglåset betyder att anslutningen är krypterad – men inte att sidan är ärlig. Titta på själva namnet före det första ensamma snedstrecket.",
              "short": "Kontrollera webbplatsens namn. Hänglåset betyder kryptering, inte ärlighet.",
              "child": "Bluffsidor kan se nästan likadana ut som riktiga sidor. Därför ska du titta noga på adressen högst upp. Hänglåset betyder bara att det du skickar är hemligt på vägen – inte att sidan är snäll."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet hur du läser en webbadress."
          }
        ],
        "detail": {
          "what": "Webbadressen visar vilken webbplats du besöker. HTTPS betyder att trafiken mellan webbläsaren och webbplatsen är krypterad.",
          "recognize": "Adressfältet visar ett hänglås eller https:// och sedan domännamnet, till exempel banken.se. Det viktiga är domänen.",
          "use": "HTTPS skyddar anslutningen men garanterar inte att den som driver sidan är ärlig.",
          "example": "https://banken.se kan vara rätt adress, medan https://banken-login.example.com är en helt annan webbplats."
        }
      },
      "security-006-updates": {
        "title": "Uppdateringar och antivirus",
        "summary": "Håll datorn och programmen uppdaterade.",
        "steps": [
          {
            "title": "Uppdateringar",
            "text": {
              "default": "Uppdateringar täpper till säkerhetshål. Installera dem från Windows Update i Inställningar – aldrig från en popup-ruta på en webbsida. Windows-säkerhet skyddar mot virus och är påslagen från början.",
              "short": "Installera uppdateringar via Windows Update, aldrig från popup-rutor.",
              "child": "Uppdateringar lagar små hål i datorns skydd, ungefär som att laga ett staket. Du hämtar dem i Inställningar under Windows Update. Om en ruta på en webbsida säger att du måste installera något – stäng den."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet varför uppdateringar är viktiga."
          }
        ],
        "detail": {
          "what": "Uppdateringar rättar fel och säkerhetshål i Windows och program. Antivirus letar efter skadliga filer.",
          "recognize": "Windows visar uppdateringar under Inställningar → Windows Update och säkerhetsstatus i Windows-säkerhet.",
          "use": "En uppdaterad dator är mycket svårare att angripa.",
          "example": "Installera uppdateringar från Windows Update i stället för från slumpmässiga popup-rutor som säger att datorn har virus."
        }
      },
      "security-007-wifi": {
        "title": "Offentligt Wi‑Fi",
        "summary": "Var försiktig på öppna nätverk.",
        "steps": [
          {
            "title": "Offentligt Wi‑Fi",
            "text": {
              "default": "Öppna nätverk på kaféer, hotell och stationer delas av många. Undvik känsliga ärenden där, och kontrollera att nätverkets namn verkligen är stället du är på.",
              "short": "Undvik känsliga ärenden på öppna nätverk.",
              "child": "På kaféer och tåg finns ofta Wi‑Fi som alla får använda. Det är som att prata i ett fullt rum – andra kan höra. Gör därför inget hemligt där, och kontrollera att nätverket verkligen hör till stället du är på."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet hur du använder offentligt Wi‑Fi försiktigt."
          }
        ],
        "detail": {
          "what": "Offentligt Wi‑Fi är nätverk som många kan använda, till exempel på hotell, kaféer och stationer.",
          "recognize": "Nätverket syns i Wi‑Fi-listan. Ett öppet nätverk saknar lösenord och Windows visar en varning.",
          "use": "Var extra försiktig med bankärenden och lösenord, och med falska nätverksnamn.",
          "example": "Ett nätverk som heter Gratis_Flygplats_WiFi behöver inte vara flygplatsens riktiga nätverk."
        }
      },
      "security-008-support-scam": {
        "title": "Falsk teknisk support",
        "summary": "Känn igen någon som påstår att datorn har virus och vill styra den.",
        "steps": [
          {
            "title": "Falsk support",
            "text": {
              "default": "Riktiga företag ringer inte oväntat och kräver att du installerar ett fjärrstyrningsprogram eller betalar för att ta bort ett virus. Lägg på, och stäng popup-rutor som säger att du ska ringa ett nummer.",
              "short": "Riktig support ringer inte oväntat och kräver fjärrstyrning eller betalning.",
              "child": "Ibland ringer någon och säger att de är från ett datorföretag och att din dator har virus. Det är nästan alltid ett lurendrejeri. Lägg på, och berätta för en vuxen du litar på."
            }
          },
          {
            "title": "Klart",
            "text": "Du känner igen falsk teknisk support."
          }
        ],
        "detail": {
          "what": "Supportbedrägeri betyder att någon låtsas vara teknisk support och försöker få pengar, lösenord eller fjärrstyrning av datorn.",
          "recognize": "Vanliga tecken är oväntade samtal eller popup-rutor som säger att datorn är infekterad och att du måste ringa direkt.",
          "use": "Ge aldrig fjärråtkomst eller betalningsuppgifter till någon som kontaktar dig oväntat.",
          "example": "Microsoft ringer inte för att säga att din dator har virus."
        }
      },
      "final-001-independent": {
        "title": "Självständighetsprovet",
        "summary": "Kombinera webbläsaren, filer och e-post utan detaljerade steg.",
        "steps": [
          {
            "title": "Självständighetsprovet",
            "text": {
              "default": "Nu kombinerar du webbläsaren, Utforskaren och E-post – som en riktig uppgift där du själv väljer program och ordning.",
              "short": "Webbläsaren, Utforskaren och E-post i en riktig uppgift.",
              "child": "Det här är det stora slutprovet! Du ska använda tre program efter varandra, precis som när man gör något på riktigt. Du väljer själv hur du gör."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Ladda ned guide.txt i webbläsaren. Byt namn på den till guide-klar.txt i Hämtade filer. Skicka den sedan som bilaga i ett nytt mejl.",
              "guided": "Ta ett program i taget. Öppna webbläsaren och klicka på genvägen Ladda ned en guide, och sedan på Ladda ned guide.txt. Öppna Utforskaren och klicka på Hämtade filer till vänster. Markera guide.txt, klicka på Byt namn och skriv guide-klar.txt. Öppna E-post från Start och klicka på Ny e-post. Klicka på gemet, välj Hämtade filer och guide-klar.txt. Fyll i Till, till exempel anna@example.com, ett ämne och lite text, och klicka på Skicka.",
              "independent": "Ladda ned guide.txt i webbläsaren. Byt namn på filen till guide-klar.txt i Utforskaren. Skicka den sedan som bilaga i ett nytt mejl.",
              "child.guided": "Tre program efter varandra: 1. Webbläsaren – ladda ned guide.txt. 2. Utforskaren – byt namn på filen i Hämtade filer till guide-klar.txt. 3. E-post – skicka filen med ett nytt mejl. Du har gjort varje del förut!"
            },
            "hints": [
              "Börja i webbläsaren och leta upp sidan där guiden laddas ned.",
              "Filen hamnar i Hämtade filer. Öppna Utforskaren och gå dit.",
              "Byt namn på filen till guide-klar.txt innan du fortsätter.",
              "Öppna E-post från Start och klicka på Ny e-post.",
              "Bifoga guide-klar.txt från Hämtade filer, fyll i Till (till exempel anna@example.com), ämne och text och klicka Skicka."
            ],
            "nudge": "Börja med att få hem filen till datorn."
          },
          {
            "title": "Klart",
            "text": "Grattis! Du har klarat självständighetsprovet."
          }
        ],
        "detail": {
          "what": "Det här är ett kombinerat uppdrag där flera färdigheter används tillsammans.",
          "recognize": "Du får ingen knapp för varje liten del. Du väljer själv rätt program och rätt ordning.",
          "use": "Syftet är att träna samma sorts problemlösning som på en riktig dator.",
          "example": "En verklig uppgift kan vara att ladda ned en blankett, ge den ett tydligt namn och skicka den som bilaga."
        }
      },
      "everyday-001-copy-paste": {
        "title": "Markera, kopiera och klistra in text",
        "summary": "Flytta text från ett ställe till ett annat utan att skriva om den.",
        "steps": [
          {
            "title": "Kopiera och klistra in",
            "text": {
              "default": "Markera texten, kopiera den med Ctrl+C och klistra in den med Ctrl+V där textmarkören står. Originalet ligger kvar där det var.",
              "short": "Markera, kopiera med Ctrl+C och klistra in med Ctrl+V.",
              "child": "Att kopiera text är som att skriva av något, fast datorn gör det åt dig. Du markerar texten, kopierar den och klistrar in den på ett nytt ställe. Originalet blir kvar där det var."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Vad är internet? i webbläsaren, markera telefonraden och tryck Ctrl+C. Klicka sedan i Anteckningar och tryck Ctrl+V.",
              "guided": "I webbläsaren klickar du på genvägen ”Vad är internet?”. Leta upp raden med ett telefonnummer. Tryck ned vänster musknapp precis före första tecknet, håll kvar och dra till slutet av raden – texten blir blåmarkerad. Håll ned Ctrl och tryck C. Klicka sedan på Anteckningars ikon i aktivitetsfältet, klicka i den vita ytan och tryck Ctrl+V. Raden klistras in.",
              "independent": "Kopiera telefonraden från sidan Vad är internet? i webbläsaren till Anteckningar.",
              "child.guided": "Öppna Vad är internet? i webbläsaren. Dra med musen över raden med telefonnumret så att den blir blå. Tryck Ctrl+C. Byt till Anteckningar, klicka i den vita ytan och tryck Ctrl+V. Där är den!"
            },
            "hints": [
              "Klicka på genvägen Vad är internet? i webbläsaren.",
              "Tryck ned musknappen i början av telefonraden och dra till slutet så att raden blir markerad.",
              "Tryck Ctrl+C för att kopiera.",
              "Byt till Anteckningar genom att klicka på dess ikon i aktivitetsfältet.",
              "Klicka i Anteckningars vita yta och tryck Ctrl+V."
            ],
            "nudge": "Texten måste vara markerad innan datorn vet vad den ska kopiera."
          },
          {
            "title": "Klart",
            "text": "Du kan kopiera text mellan program."
          }
        ],
        "detail": {
          "what": "När du markerar text väljer du exakt vilken del datorn ska arbeta med. Kopiera lägger en kopia i urklippet och Klistra in placerar den där textmarkören står.",
          "recognize": "Markerad text får en färgad bakgrund. Ctrl+C betyder Kopiera och Ctrl+V betyder Klistra in.",
          "use": "Det används hela tiden när du flyttar adresser, telefonnummer, länkar eller text mellan webben, dokument och mejl.",
          "example": "Du hittar ett telefonnummer på en webbsida och klistrar in det i ett mejl i stället för att skriva siffrorna själv.",
          "steps": [
            "Dra över texten så att den blir markerad.",
            "Tryck Ctrl+C.",
            "Klicka där texten ska hamna.",
            "Tryck Ctrl+V."
          ],
          "everyday": [
            "Kopiera ett ordernummer från ett mejl till en webbsida.",
            "Kopiera en adress från webben till ett meddelande."
          ],
          "mistakes": [
            "Att kopiera utan att först markera rätt text.",
            "Att klistra in på fel ställe eftersom textmarkören står någon annanstans."
          ]
        }
      },
      "everyday-002-undo-redo": {
        "title": "Ångra och gör om",
        "summary": "Rätta ett misstag utan att börja om.",
        "steps": [
          {
            "title": "Ångra",
            "text": {
              "default": "Ctrl+Z ångrar det du nyss gjorde. Ctrl+Y gör om det du ångrade. Det fungerar i nästan alla program.",
              "short": "Ctrl+Z ångrar, Ctrl+Y gör om.",
              "child": "Ctrl+Z är som en tidsmaskin: den tar bort det du nyss gjorde. Ångrade du för mycket tar Ctrl+Y tillbaka det. Det fungerar i nästan alla program, så du behöver aldrig vara rädd för att göra fel."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Skriv en kort mening i Anteckningar. Tryck Ctrl+Z för att ångra och sedan Ctrl+Y för att göra om.",
              "guided": "Klicka i den vita ytan i Anteckningar och skriv några ord. Håll sedan ned Ctrl längst ned till vänster på tangentbordet och tryck Z. Det du skrev försvinner. Håll ned Ctrl igen och tryck Y. Texten kommer tillbaka.",
              "independent": "Skriv en mening i Anteckningar, ångra den och gör om den.",
              "child.guided": "Klicka i den vita ytan i Anteckningar och skriv några ord. Håll ned Ctrl och tryck Z. Texten försvinner. Håll ned Ctrl och tryck Y. Texten kommer tillbaka."
            },
            "hints": [
              "Klicka i Anteckningars vita yta.",
              "Skriv några ord.",
              "Håll ned Ctrl och tryck Z. Det du skrev försvinner.",
              "Håll ned Ctrl och tryck Y. Texten kommer tillbaka.",
              "Skriv → Ctrl+Z → Ctrl+Y. Du hittar också Ångra under Redigera."
            ],
            "nudge": "Det finns ett kortkommando för att ta tillbaka det du nyss gjorde."
          },
          {
            "title": "Klart",
            "text": "Du kan ångra och göra om."
          }
        ],
        "detail": {
          "what": "Ångra går tillbaka ett steg i det du nyss gjorde. Gör om återställer ett steg som du precis ångrade.",
          "recognize": "Kortkommandona är Ctrl+Z för Ångra och Ctrl+Y för Gör om. Många program har också böjda pilar för det.",
          "use": "Det är en av de viktigaste trygghetsfunktionerna när du skriver, flyttar eller ändrar något.",
          "example": "Du råkar ta bort ett helt stycke och trycker Ctrl+Z för att få tillbaka det.",
          "steps": [
            "Gör en liten ändring.",
            "Tryck Ctrl+Z.",
            "Kontrollera att ändringen försvann.",
            "Tryck Ctrl+Y."
          ],
          "everyday": [
            "När du råkar ta bort text.",
            "När du flyttat eller ändrat något fel."
          ],
          "mistakes": [
            "Att fortsätta klicka efter ett misstag tills det blir svårt att veta vad som ska ångras.",
            "Att tro att Ctrl+Z kan ångra saker efter att programmet har stängts."
          ]
        }
      },
      "everyday-003-clipboard": {
        "title": "Urklippet",
        "summary": "Förstå var det kopierade finns mellan Kopiera och Klistra in.",
        "steps": [
          {
            "title": "Urklippet",
            "text": {
              "default": "Det du kopierar eller klipper ut läggs i urklippet – ett tillfälligt minne. Där ligger det tills du kopierar något nytt. På en riktig dator visar Windows-tangenten + V tidigare kopierat.",
              "short": "Urklippet håller det du senast kopierade eller klippte ut.",
              "child": "Urklippet är datorns korttidsminne. Det du kopierar sparas där en stund, tills du kopierar något nytt. Det är därför du kan klistra in samma sak flera gånger."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet vad urklippet är."
          }
        ],
        "detail": {
          "what": "Urklippet är ett tillfälligt minne där Windows håller det du senast kopierade eller klippte ut.",
          "recognize": "Det syns inte som en mapp. Du märker det genom att det du kopierat går att klistra in någon annanstans. Windows-tangenten + V visar urklippshistoriken.",
          "use": "Urklippet gör att information kan flyttas mellan olika program.",
          "example": "Du kopierar text i webbläsaren och klistrar in samma text i Anteckningar.",
          "everyday": [
            "Text mellan webbläsare och mejl.",
            "Filnamn, adresser och nummer mellan olika program."
          ],
          "mistakes": [
            "Att tro att Kopiera skapar en fil.",
            "Att kopiera något nytt och därmed ersätta det som låg i urklippet."
          ]
        }
      },
      "everyday-004-file-extensions": {
        "title": "Filändelser: PDF, JPG, DOCX och TXT",
        "summary": "Förstå varför slutet på filnamnet berättar vilken sorts fil det är.",
        "steps": [
          {
            "title": "Filändelser",
            "text": {
              "default": "Filändelsen är bokstäverna efter den sista punkten i filnamnet, till exempel .pdf eller .jpg. Den berättar vilken sorts fil det är. Windows döljer ofta ändelsen – i Utforskaren visar du den med Visa → Visa → Filnamnstillägg. I övningsdatorn visas den alltid.",
              "short": "Filändelsen, som .pdf eller .jpg, visar vilken sorts fil det är.",
              "child": "Bokstäverna efter sista punkten i ett filnamn är som en etikett. .jpg betyder att det är en bild, .pdf ett dokument som ska se likadant ut överallt och .txt en enkel text. Då vet du vilket program som kan öppna filen."
            }
          },
          {
            "title": "Klart",
            "text": "Du kan läsa filändelser."
          }
        ],
        "detail": {
          "what": "Filändelsen är bokstäverna efter sista punkten i filnamnet. Den berättar vilken typ av fil det är och vilka program som kan öppna den.",
          "recognize": "Vanliga ändelser är .pdf (dokument för läsning), .jpg och .png (bilder), .docx (Word), .xlsx (Excel) och .txt (text).",
          "use": "Det hjälper dig förstå om en fil är ett dokument, en bild eller något annat – och att upptäcka misstänkta filer som slutar på .exe.",
          "example": "faktura.pdf är ett dokument att läsa, foto.jpg är en bild och faktura.pdf.exe är ett program som försöker se ut som en PDF.",
          "everyday": [
            "När du laddar ned bilagor.",
            "När någon ber dig skicka ett visst filformat."
          ],
          "mistakes": [
            "Att ta bort ändelsen när man byter namn.",
            "Att tro att en fil blir en PDF bara för att man skriver .pdf i namnet."
          ]
        }
      },
      "everyday-005-save-location": {
        "title": "Var sparades filen?",
        "summary": "Lär dig att alltid veta var en fil hamnar.",
        "steps": [
          {
            "title": "Var hamnar filen?",
            "text": {
              "default": "Allt du laddar ned i webbläsaren hamnar i mappen Hämtade filer, om du inte själv väljer något annat. Att veta var filen ligger är lika viktigt som att veta vad den heter.",
              "short": "Nedladdat hamnar i Hämtade filer.",
              "child": "När du laddar ned något måste det hamna någonstans. Om du inte väljer själv lägger datorn det i mappen Hämtade filer. Kommer du ihåg det, så hittar du alltid det du har laddat ned."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Ladda ned guide.txt via genvägen Ladda ned en guide i webbläsaren. Klicka sedan på Visa i mapp för att se filen i Hämtade filer.",
              "guided": "I webbläsaren klickar du på genvägen Ladda ned en guide och sedan på knappen Ladda ned guide.txt. Uppe till höger visas rutan Senaste nedladdningar. Klicka på Visa i mapp i den rutan. Utforskaren öppnas på mappen Hämtade filer, och där ligger guide.txt.",
              "independent": "Ladda ned guide.txt i webbläsaren och hitta sedan filen i Hämtade filer.",
              "child.guided": "Ladda ned guide.txt i webbläsaren. Klicka på Visa i mapp i rutan som dyker upp. Nu ser du var filen hamnade: i Hämtade filer!"
            },
            "hints": [
              "Klicka på genvägen Ladda ned en guide i webbläsaren och ladda ned guide.txt.",
              "Rutan Senaste nedladdningar visas uppe till höger.",
              "Klicka på Visa i mapp – eller öppna Utforskaren och klicka på Hämtade filer.",
              "Den gula ramen visar Hämtade filer i Utforskaren.",
              "Ladda ned guide.txt → Visa i mapp. Filen guide.txt ligger i Hämtade filer."
            ],
            "nudge": "Fundera på vilken mapp nedladdningar brukar hamna i."
          },
          {
            "title": "Klart",
            "text": "Du vet var nedladdade filer hamnar."
          }
        ],
        "detail": {
          "what": "Varje fil ligger på ett bestämt ställe, till exempel i Dokument, Hämtade filer eller Bilder.",
          "recognize": "Utforskaren visar var du är i adressfältet högst upp. Webbläsare sparar hämtade filer i Hämtade filer.",
          "use": "När du ska bifoga, öppna eller flytta en fil senare måste du kunna hitta den igen.",
          "example": "Du laddar ned en PDF och hittar den sedan i Hämtade filer.",
          "everyday": [
            "Bilagor från e-post.",
            "PDF:er och blanketter från webben."
          ],
          "mistakes": [
            "Att ladda ned samma fil flera gånger för att man tror att den har försvunnit.",
            "Att spara allt på skrivbordet för att slippa leta."
          ]
        }
      },
      "everyday-006-pdf": {
        "title": "PDF i vardagen",
        "summary": "Öppna, zooma och spara PDF-dokument.",
        "steps": [
          {
            "title": "PDF",
            "text": {
              "default": "PDF är ett format för dokument som ska se likadana ut överallt – fakturor, kvitton och blanketter. På en riktig dator öppnas PDF-filer ofta i webbläsaren Microsoft Edge.",
              "short": "PDF-filer ser likadana ut överallt. Du kan zooma och spara en kopia.",
              "child": "En PDF är ett dokument som ser exakt likadant ut på alla datorer, som ett papper som har fotograferats. Kvitton, fakturor och blanketter är ofta PDF-filer."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Dubbelklicka på faktura.pdf i Dokument, zooma in med plusknappen och spara en kopia med Spara som.",
              "guided": "I Utforskaren, i mappen Dokument, dubbelklickar du på faktura.pdf. Filen öppnas i PDF-läsaren. Klicka på plusknappen högst upp för att zooma in, så att texten blir större. Klicka sedan på Spara som uppe till höger. Behåll namnet faktura-kopia.pdf och klicka på Spara.",
              "independent": "Öppna faktura.pdf, förstora texten och spara en kopia.",
              "child.guided": "Dubbelklicka på faktura.pdf i mappen Dokument. Fakturan öppnas. Klicka på plus högst upp så att texten blir större. Klicka på Spara som uppe till höger och sedan på Spara."
            },
            "hints": [
              "Dubbelklicka på faktura.pdf i Dokument.",
              "PDF-filen öppnas i ett eget fönster.",
              "Klicka på plusknappen för att zooma in.",
              "Klicka på Spara som och sedan på Spara.",
              "faktura.pdf → + → Spara som → behåll namnet faktura-kopia.pdf → Spara."
            ],
            "nudge": "Börja med att öppna filen som har ändelsen .pdf."
          },
          {
            "title": "Klart",
            "text": "Du kan läsa och spara PDF-filer."
          }
        ],
        "detail": {
          "what": "PDF är ett dokumentformat som ser likadant ut på alla datorer. Det används för fakturor, blanketter, kvitton och myndighetsdokument.",
          "recognize": "Filnamnet slutar med .pdf. När filen är öppen ser du sidor och verktyg för zoom, utskrift och spara.",
          "use": "Du behöver kunna läsa, förstora, spara och ibland skriva ut PDF-filer.",
          "example": "En faktura kan komma som faktura.pdf i ett mejl.",
          "everyday": [
            "Öppna en blankett från en myndighet.",
            "Spara en faktura eller ett kvitto."
          ],
          "mistakes": [
            "Att tro att en PDF går att ändra som ett Word-dokument.",
            "Att inte kontrollera var en nedladdad PDF sparades."
          ]
        }
      },
      "everyday-007-screenshot": {
        "title": "Skärmbild",
        "summary": "Spara en bild av det som syns på skärmen.",
        "steps": [
          {
            "title": "Skärmbild",
            "text": {
              "default": "En skärmbild är en bild av det som syns på skärmen. Med Skärmklippverktyget väljer du själv vilken del som ska med. På en riktig dator öppnar Windows-tangenten + Shift + S samma verktyg direkt.",
              "short": "Skärmklippverktyget tar en bild av en del av skärmen.",
              "child": "En skärmbild är som ett foto av skärmen. Med Skärmklippverktyget ritar du en ruta runt det du vill ha med, och sedan sparar du bilden."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på Nytt i Skärmklippverktyget, dra en ruta över det du vill ha med och spara bilden i Bilder.",
              "guided": "Skärmklippverktyget är öppet. Klicka på knappen Nytt uppe till vänster i verktyget. Skärmen blir lite mörkare. Tryck ned vänster musknapp där rutan ska börja, håll kvar och dra till motsatt hörn. Släpp knappen. Bilden visas i verktyget. Klicka på Spara – rutan Spara som öppnas med mappen Bilder vald – och klicka på Spara igen.",
              "independent": "Ta en skärmbild med Skärmklippverktyget och spara den i Bilder.",
              "child.guided": "Klicka på Nytt uppe till vänster i Skärmklippverktyget. Skärmen blir mörkare. Tryck och håll vänster musknapp och dra en ruta över det du vill ta bild på. Släpp knappen. Klicka på Spara och sedan på Spara igen."
            },
            "hints": [
              "Klicka på Nytt i Skärmklippverktyget.",
              "Skärmen blir mörkare. Tryck ned musknappen och dra en ruta över det du vill ha med.",
              "Släpp musknappen. Bilden visas i verktyget.",
              "Klicka på Spara. Rutan Spara som öppnas med mappen Bilder vald.",
              "Nytt → dra en ruta → släpp → Spara → Spara."
            ],
            "nudge": "Verktyget har en knapp för att börja ett nytt klipp."
          },
          {
            "title": "Klart",
            "text": "Du kan ta och spara skärmbilder."
          }
        ],
        "detail": {
          "what": "En skärmbild är en bild av hela eller en del av det som syns på skärmen.",
          "recognize": "I Windows används Skärmklippverktyget eller tangenten Print Screen. Resultatet blir en bildfil, ofta i Bilder.",
          "use": "Skärmbilder är bra när du vill visa ett fel, spara en bekräftelse eller be någon om hjälp.",
          "example": "Du får ett felmeddelande och skickar en skärmbild till den som hjälper dig.",
          "everyday": [
            "Visa någon exakt vad du ser på skärmen.",
            "Spara ett kvitto eller en bokningsbekräftelse som bild."
          ],
          "mistakes": [
            "Att råka få med lösenord, personnummer eller annat känsligt.",
            "Att tro att skärmbilden ersätter originalfilen."
          ]
        }
      },
      "everyday-008-zip": {
        "title": "ZIP-filer",
        "summary": "Packa upp flera filer som kommer i ett paket.",
        "steps": [
          {
            "title": "ZIP",
            "text": {
              "default": "En ZIP-fil är ett paket med flera filer i. Innan du arbetar med filerna packar du upp – extraherar – paketet till en vanlig mapp.",
              "short": "Packa upp en ZIP-fil med Extrahera alla.",
              "child": "En ZIP-fil är som ett paket som har flera saker inuti. Innan du kan använda sakerna packar du upp paketet. Det kallas att extrahera."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Högerklicka på Bilder.zip i Hämtade filer, välj Extrahera alla och klicka på Extrahera.",
              "guided": "Utforskaren visar Hämtade filer. Leta upp Bilder.zip – en gul mapp med ett blixtlås. Högerklicka på den. Välj Extrahera alla i menyn som öppnas. En ruta visar var filerna hamnar. Klicka på Extrahera. En vanlig mapp med bilderna öppnas.",
              "independent": "Packa upp Bilder.zip i Hämtade filer.",
              "child.guided": "Högerklicka på Bilder.zip, mappen med ett blixtlås. Välj Extrahera alla och klicka på Extrahera. Nu är paketet uppackat!"
            },
            "hints": [
              "Bilder.zip ligger i Hämtade filer.",
              "Högerklicka på Bilder.zip.",
              "Välj Extrahera alla i snabbmenyn. En ruta visar var filerna hamnar.",
              "Den gula ramen visar filerna i Hämtade filer.",
              "Högerklick på Bilder.zip → Extrahera alla → Extrahera. Mappen Bilder öppnas."
            ],
            "nudge": "Det finns ett val i snabbmenyn för att packa upp."
          },
          {
            "title": "Klart",
            "text": "Du kan packa upp ZIP-filer."
          }
        ],
        "detail": {
          "what": "En ZIP-fil är ett komprimerat paket som kan samla många filer i en mindre fil.",
          "recognize": "Den slutar med .zip och har en mappikon med dragkedja. Knappen Extrahera alla finns i snabbmenyn och i Utforskarens rad med knappar.",
          "use": "Du behöver ofta packa upp ZIP-filen innan du kan arbeta med innehållet.",
          "example": "Någon skickar 20 bilder som Bilder.zip i stället för 20 separata bilagor.",
          "everyday": [
            "Nedladdade mallar och bildpaket.",
            "Filer som skickats från jobbet eller en förening."
          ],
          "mistakes": [
            "Att öppna filer direkt inne i ZIP-filen och sedan undra var ändringarna tog vägen.",
            "Att ta bort ZIP-filen innan man kontrollerat att allt packades upp."
          ]
        }
      },
      "everyday-009-browser-vs-app": {
        "title": "Webbsida eller installerat program?",
        "summary": "Förstå skillnaden mellan något i webbläsaren och ett program på datorn.",
        "steps": [
          {
            "title": "Webbsida eller program?",
            "text": {
              "default": "En webbsida visas inne i webbläsaren och har en webbadress. Ett installerat program körs i ett eget fönster och finns i Start-menyn.",
              "short": "Webbsidor visas i webbläsaren. Program har ett eget fönster.",
              "child": "En webbsida bor inne i webbläsaren och har en adress som börjar med till exempel www. Ett program som är installerat i datorn öppnas i ett eget fönster och finns i Start-menyn."
            }
          },
          {
            "title": "Klart",
            "text": "Du kan skilja på webbsidor och installerade program."
          }
        ],
        "detail": {
          "what": "En webbsida visas inne i en webbläsare och har en webbadress. Ett installerat program körs som en egen app i Windows.",
          "recognize": "Webbsidor har adressfält och flikar runt sig. Installerade program har en egen ikon i Start-menyn och ett eget fönster.",
          "use": "Skillnaden hjälper när du ska installera, uppdatera, logga in eller felsöka.",
          "example": "Gmail kan användas som webbsida i webbläsaren medan Outlook också finns som installerat program.",
          "everyday": [
            "Bank, myndighetstjänster och e-post i webbläsaren.",
            "Word, Spotify eller andra installerade appar."
          ],
          "mistakes": [
            "Att installera något fast webbsidan redan gör det du behöver.",
            "Att leta efter en webbadress inne i ett vanligt program."
          ]
        }
      },
      "everyday-010-login": {
        "title": "Logga in, logga ut och kom ihåg mig",
        "summary": "Förstå vad en inloggning gör och när du ska logga ut.",
        "steps": [
          {
            "title": "Inloggning",
            "text": {
              "default": "När du loggar in kopplas webbläsaren till ditt konto. På en dator som andra också använder ska du alltid logga ut när du är klar – det räcker inte att stänga fliken.",
              "short": "Logga ut på datorer som andra använder.",
              "child": "När du loggar in visar du att det är du. På en dator som andra också använder, som i skolan eller på biblioteket, ska du alltid logga ut när du är klar. Annars kan nästa person komma åt ditt konto."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet när du ska logga ut."
          }
        ],
        "detail": {
          "what": "En inloggning kopplar din webbläsare eller app till ditt personliga konto.",
          "recognize": "Du ser fält för e-post eller användarnamn och lösenord. Efter inloggning visas ofta ditt namn eller en profilbild. Rutan Kom ihåg mig håller dig inloggad.",
          "use": "Konton sparar din information och ger tillgång till tjänster som e-post, bank och molnlagring.",
          "example": "På din egen dator kan du låta tjänsten komma ihåg dig. På en lånad dator ska du logga ut när du är klar.",
          "everyday": [
            "E-post, streaming, myndighetstjänster och webbutiker.",
            "Flera personer som delar samma dator."
          ],
          "mistakes": [
            "Att vara kvar inloggad på en lånad eller offentlig dator.",
            "Att tro att det räcker att stänga fliken i stället för att logga ut."
          ]
        }
      },
      "everyday-011-password-manager": {
        "title": "Lösenordshanterare",
        "summary": "Förstå hur starka, unika lösenord kan sparas utan att du behöver komma ihåg dem.",
        "steps": [
          {
            "title": "Lösenordshanterare",
            "text": {
              "default": "En lösenordshanterare kommer ihåg dina lösenord åt dig och fyller i dem. Då kan du ha ett eget starkt lösenord för varje tjänst och behöver bara komma ihåg ett huvudlösenord.",
              "short": "En lösenordshanterare kommer ihåg dina lösenord.",
              "child": "En lösenordshanterare är som ett kassaskåp för lösenord. Den kommer ihåg alla dina lösenord, och du behöver bara kunna ett: det som öppnar kassaskåpet."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet vad en lösenordshanterare gör."
          }
        ],
        "detail": {
          "what": "En lösenordshanterare lagrar lösenord krypterat och kan fylla i dem åt dig.",
          "recognize": "Webbläsare och särskilda appar erbjuder att spara lösenord och fylla i användarnamn och lösenord automatiskt.",
          "use": "Det gör det möjligt att ha olika starka lösenord på olika tjänster.",
          "example": "I stället för samma lösenord på tio webbplatser skapar och minns lösenordshanteraren tio olika.",
          "everyday": [
            "Många konton med olika lösenord.",
            "Automatisk ifyllning på webbplatser du känner igen."
          ],
          "mistakes": [
            "Att använda samma lösenord överallt för att det är lättare.",
            "Att berätta sitt huvudlösenord för någon annan."
          ]
        }
      },
      "everyday-012-install": {
        "title": "Installera och avinstallera program",
        "summary": "Installera ett program och ta bort det på rätt sätt.",
        "steps": [
          {
            "title": "Installera",
            "text": {
              "default": "Ett program installeras med en installationsfil, ofta en .exe-fil. Windows frågar först om programmet får göra ändringar. Du tar bort ett program under Inställningar → Appar – inte genom att ta bort en ikon.",
              "short": "Installera med installationsfilen. Avinstallera i Inställningar → Appar.",
              "child": "Att installera betyder att flytta in ett nytt program i datorn. Windows frågar först om det är okej. Vill du ta bort programmet igen gör du det i Inställningar, inte genom att slänga ikonen."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Dubbelklicka på Övningsprogram-Setup.exe i Hämtade filer och gå igenom installationen. Avinstallera sedan programmet i Inställningar → Appar.",
              "guided": "I Utforskaren, i Hämtade filer, dubbelklickar du på Övningsprogram-Setup.exe. Windows frågar om appen får göra ändringar – läs och klicka på Ja. Klicka Nästa, välj Jag godkänner avtalet, klicka Nästa två gånger, sedan Installera och Slutför. Öppna sedan Inställningar från Start och klicka på Appar. Klicka på de tre prickarna bredvid Övningsprogram, välj Avinstallera och bekräfta.",
              "independent": "Installera Övningsprogram från Hämtade filer och avinstallera det sedan i Inställningar.",
              "child.guided": "Dubbelklicka på Övningsprogram-Setup.exe i Hämtade filer. Datorn frågar om programmet får göra ändringar – klicka på Ja. Klicka på Nästa, godkänn avtalet, klicka på Nästa två gånger, Installera och Slutför. Öppna sedan Inställningar och klicka på Appar. Klicka på de tre prickarna vid Övningsprogram och välj Avinstallera."
            },
            "hints": [
              "Dubbelklicka på Övningsprogram-Setup.exe i Hämtade filer. Svara Ja på Windows fråga.",
              "Klicka Nästa, välj Jag godkänner avtalet, klicka Nästa två gånger, Installera och Slutför.",
              "Öppna Inställningar från Start och välj Appar.",
              "Klicka på de tre prickarna vid Övningsprogram och välj Avinstallera.",
              "Setup.exe → Ja → Nästa → godkänn → Nästa → Nästa → Installera → Slutför → Inställningar → Appar → ⋯ → Avinstallera → Avinstallera."
            ],
            "nudge": "Installationen börjar med en fil som ligger där nedladdningar hamnar."
          },
          {
            "title": "Klart",
            "text": "Du kan installera och avinstallera program."
          }
        ],
        "detail": {
          "what": "Installation lägger till ett program på datorn. Avinstallation tar bort programmet på ett ordnat sätt.",
          "recognize": "Installationsfiler slutar ofta med .exe eller .msi. Innan installationen frågar Windows: ”Vill du tillåta att den här appen gör ändringar på enheten?”. Installerade program syns i Start och under Inställningar → Appar.",
          "use": "Du behöver förstå installation för att kunna lägga till verktyg på ett säkert sätt.",
          "example": "Du laddar ned ett mötesprogram från tillverkarens webbplats, kör installationen och hittar sedan programmet i Start.",
          "everyday": [
            "Installera ett program för videomöten eller en skrivare.",
            "Ta bort ett program som du inte längre använder."
          ],
          "mistakes": [
            "Att installera program från okända popup-rutor eller webbplatser.",
            "Att bara ta bort programmets ikon och tro att programmet är avinstallerat."
          ]
        }
      },
      "everyday-013-print-pdf": {
        "title": "Skriv ut och Skriv ut till PDF",
        "summary": "Använd utskriftsrutan och spara ett dokument som PDF.",
        "steps": [
          {
            "title": "Skriv ut",
            "text": {
              "default": "I utskriftsrutan väljer du skrivare, antal kopior och sidor. Skrivaren Microsoft Print to PDF skriver inte på papper – den skapar en PDF-fil och frågar var den ska sparas.",
              "short": "Microsoft Print to PDF skapar en PDF-fil i stället för papper.",
              "child": "När du skriver ut väljer du vilken skrivare som ska användas. Microsoft Print to PDF är en låtsasskrivare: i stället för ett papper skapar den en PDF-fil som du sparar i datorn."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på Skriv ut i PDF-läsaren, välj Microsoft Print to PDF som skrivare och klicka på Skriv ut. Spara sedan filen.",
              "guided": "Klicka på Skriv ut uppe till höger i PDF-läsaren. Utskriftsrutan öppnas. Längst upp till vänster finns listan Skrivare – klicka på den och välj Microsoft Print to PDF. Klicka sedan på den blå knappen Skriv ut. Rutan Spara utskriften som öppnas. Klicka på Spara.",
              "independent": "Skriv ut fakturan till en PDF-fil.",
              "child.guided": "Klicka på Skriv ut uppe till höger i PDF-läsaren. Klicka på listan Skrivare och välj Microsoft Print to PDF. Klicka på den blå knappen Skriv ut. Klicka sedan på Spara."
            },
            "hints": [
              "Klicka på Skriv ut uppe till höger i PDF-läsaren.",
              "Utskriftsrutan visar vilken skrivare som är vald.",
              "Öppna listan Skrivare och välj Microsoft Print to PDF.",
              "Klicka Skriv ut. Rutan Spara utskriften som öppnas.",
              "Skriv ut → Skrivare: Microsoft Print to PDF → Skriv ut → Spara."
            ],
            "nudge": "Det spelar roll vilken skrivare som är vald."
          },
          {
            "title": "Klart",
            "text": "Du kan skriva ut och skapa PDF-filer."
          }
        ],
        "detail": {
          "what": "Skriv ut skickar ett dokument till en vald skrivare. Microsoft Print to PDF är en låtsasskrivare som skapar en PDF-fil i stället.",
          "recognize": "Utskriftsrutan visar vald skrivare, antal kopior, sidor och stående eller liggande.",
          "use": "Kontrollera alltid vilken skrivare som är vald innan du klickar Skriv ut.",
          "example": "Välj Microsoft Print to PDF för att spara en webbsida eller ett kvitto som PDF utan papper.",
          "everyday": [
            "Skriva ut biljetter och blanketter.",
            "Spara en webbsida eller ett dokument som PDF."
          ],
          "mistakes": [
            "Att skriva ut 30 sidor på fel skrivare.",
            "Att tro att Print to PDF skickar något till en riktig skrivare."
          ]
        }
      },
      "everyday-014-cloud": {
        "title": "Molnlagring",
        "summary": "Förstå skillnaden mellan en fil på datorn och en fil i molnet.",
        "steps": [
          {
            "title": "Molnet",
            "text": {
              "default": "Molnlagring som OneDrive sparar filer på internet och synkroniserar dem mellan dina enheter. En fil som ligger i OneDrive-mappen finns kvar även om datorn går sönder.",
              "short": "Filer i OneDrive sparas på internet och finns kvar om datorn går sönder.",
              "child": "Molnet betyder att filerna sparas på internet i stället för bara i din dator. Då finns de kvar även om datorn går sönder, och du kan nå dem från andra enheter."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Markera rapport.docx i Dokument, klicka på Klipp ut, öppna OneDrive i vänsterspalten och klicka på Klistra in.",
              "guided": "Utforskaren visar Dokument. Klicka en gång på rapport.docx. Klicka på Klipp ut – saxen – högst upp. Titta i spalten till vänster och klicka på OneDrive, som har ett blått moln. Klicka sedan på Klistra in högst upp. Filen flyttas till OneDrive.",
              "independent": "Flytta rapport.docx från Dokument till OneDrive.",
              "child.guided": "Klicka på rapport.docx och sedan på saxen. Klicka på OneDrive med det blå molnet till vänster, och klicka på Klistra in. Nu bor filen i molnet!"
            },
            "hints": [
              "rapport.docx ligger i Dokument.",
              "Markera filen och klicka på Klipp ut.",
              "Klicka på OneDrive i vänsterspalten.",
              "Den gula ramen visar OneDrive i vänsterspalten.",
              "rapport.docx → Klipp ut → OneDrive → Klistra in."
            ],
            "nudge": "Det är samma sätt att flytta som du har gjort förut, fast till en annan plats."
          },
          {
            "title": "Klart",
            "text": "Du kan flytta filer till molnet."
          }
        ],
        "detail": {
          "what": "Molnlagring betyder att filer lagras hos en tjänst på internet och kan synkroniseras mellan dina enheter.",
          "recognize": "OneDrive har en molnikon och syns i Utforskarens vänsterspalt. Mapparna där ser ut som vanliga mappar.",
          "use": "Det används för backup, delning och åtkomst från flera datorer och telefonen.",
          "example": "Ett dokument i OneDrive kan öppnas både på den stationära datorn och i mobilen.",
          "everyday": [
            "Dokument som du behöver på flera enheter.",
            "Dela bilder eller dokument med andra."
          ],
          "mistakes": [
            "Att tro att en fil automatiskt finns i molnet bara för att den finns på datorn.",
            "Att ta bort en synkroniserad fil och inte förstå att den då försvinner på alla enheter."
          ]
        }
      },
      "everyday-015-dialogs": {
        "title": "Spara, Spara inte och Avbryt",
        "summary": "Läs dialogrutor innan du väljer.",
        "steps": [
          {
            "title": "Dialogrutor",
            "text": {
              "default": "En dialogruta stoppar upp och ställer en fråga. Läs frågan innan du klickar. Spara behåller ändringarna, Spara inte kastar dem och Avbryt tar dig tillbaka utan att något händer.",
              "short": "Läs frågan i dialogrutan innan du klickar.",
              "child": "Ibland stannar datorn och frågar något i en liten ruta. Läs frågan först! Spara betyder behåll, Spara inte betyder släng, och Avbryt betyder att du ångrar dig och går tillbaka."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Skriv några ord i Anteckningar, stäng fönstret med krysset och välj Spara inte i rutan som visas.",
              "guided": "Klicka i den vita ytan i Anteckningar och skriv några ord. Klicka sedan på krysset längst upp till höger i Anteckningars fönster. En ruta visas med frågan ”Vill du spara ändringarna i Namnlös?”. Läs frågan. Den här gången klickar du på Spara inte. I verkligheten väljer du Spara om du vill behålla texten.",
              "independent": "Skriv något i Anteckningar och stäng programmet utan att spara.",
              "child.guided": "Skriv några ord. Klicka på krysset uppe till höger. En ruta frågar om du vill spara – läs den! Klicka på Spara inte den här gången."
            },
            "hints": [
              "Skriv några ord i Anteckningar så att dokumentet har osparade ändringar.",
              "Klicka på krysset uppe till höger i Anteckningar.",
              "Läs frågan: Vill du spara ändringarna i Namnlös?",
              "Den gula ramen visar krysset.",
              "Skriv → krysset → Spara inte. I verkligheten väljer du Spara om du vill behålla texten."
            ],
            "nudge": "Programmet frågar något när du försöker stänga utan att ha sparat."
          },
          {
            "title": "Klart",
            "text": "Du läser dialogrutor innan du väljer."
          }
        ],
        "detail": {
          "what": "En dialogruta är en liten ruta som stoppar arbetet och ber dig välja eller bekräfta något.",
          "recognize": "Den har en fråga och knappar som OK, Avbryt, Ja, Nej, Spara eller Spara inte. Den viktigaste knappen är oftast blå.",
          "use": "Dialogrutor kan avgöra om arbete sparas, filer ersätts eller något avbryts.",
          "example": "När du stänger ett dokument med osparade ändringar frågar programmet om du vill spara.",
          "everyday": [
            "Bekräfta att en fil ska ersättas.",
            "Välja om ändringar ska sparas innan programmet stängs."
          ],
          "mistakes": [
            "Att automatiskt trycka OK utan att läsa frågan.",
            "Att välja Spara inte när du egentligen vill behålla arbetet."
          ]
        }
      },
      "everyday-016-notifications": {
        "title": "Aviseringar och popup-rutor",
        "summary": "Skilj på en vanlig avisering och något som kräver handling.",
        "steps": [
          {
            "title": "Aviseringar",
            "text": {
              "default": "Aviseringar dyker upp nere till höger och försvinner av sig själva. Klicka på klockan i aktivitetsfältet för att se dem igen. En popup inne på en webbsida som påstår att datorn har virus är inte en Windows-avisering.",
              "short": "Aviseringar visas nere till höger. Klicka på klockan för att se dem igen.",
              "child": "Aviseringar är små meddelanden från Windows som dyker upp nere till höger och sedan försvinner. Om en webbsida plötsligt säger att datorn har virus är det inte Windows som pratar – stäng sidan."
            }
          },
          {
            "title": "Klart",
            "text": "Du känner igen aviseringar."
          }
        ],
        "detail": {
          "what": "En avisering är ett kort meddelande från Windows, ett program eller en webbplats.",
          "recognize": "Den visas en stund nere till höger och har en programikon, en rubrik och ibland knappar. Alla aviseringar finns samlade när du klickar på klockan.",
          "use": "Aviseringar berättar om nya mejl, uppdateringar, påminnelser eller problem.",
          "example": "När du matar ut ett USB-minne visar Windows en avisering om att det är säkert att ta bort det.",
          "everyday": [
            "Nytt mejl eller en påminnelse om ett möte.",
            "Windows säger att en omstart behövs."
          ],
          "mistakes": [
            "Att klicka på en webbsida som ser ut som en varning från Windows.",
            "Att tro att varje popup betyder att något är fel."
          ]
        }
      },
      "everyday-017-recent-files": {
        "title": "Senaste filer",
        "summary": "Hitta tillbaka till något du nyss arbetade med.",
        "steps": [
          {
            "title": "Senaste filer",
            "text": {
              "default": "Start-menyn visar filer du har använt nyligen under Rekommenderas. Många program har också en lista med senaste filer. Filen ligger fortfarande kvar i sin vanliga mapp.",
              "short": "Start-menyn visar nyligen använda filer under Rekommenderas.",
              "child": "Datorn kommer ihåg vilka filer du har använt nyss. I Start-menyn, under Rekommenderas, ser du dem. Filen ligger ändå kvar i sin vanliga mapp – listan är bara en genväg."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet var du hittar senaste filer."
          }
        ],
        "detail": {
          "what": "Windows och många program visar listor över nyligen öppnade filer.",
          "recognize": "I Start heter listan Rekommenderas. I Utforskarens Start-sida finns Senaste. I program heter den ofta Senaste.",
          "use": "Det är ett snabbt sätt att hitta tillbaka utan att komma ihåg exakt mapp.",
          "example": "Öppna Start – dokumentet du skrev i går syns under Rekommenderas.",
          "everyday": [
            "Fortsätta på ett dokument från i går.",
            "Hitta en bild eller PDF som du precis öppnade."
          ],
          "mistakes": [
            "Att tro att listan Senaste är en egen kopia av filen.",
            "Att glömma att filen fortfarande ligger i sin riktiga mapp."
          ]
        }
      },
      "everyday-018-drag-text": {
        "title": "Markera text med mus och tangentbord",
        "summary": "Lär dig flera sätt att välja text.",
        "steps": [
          {
            "title": "Markera text",
            "text": {
              "default": "Text måste markeras innan den kan kopieras eller ändras. Dra med musen över texten, dubbelklicka på ett ord eller håll Shift och använd piltangenterna. Ctrl+A markerar allt.",
              "short": "Markera text genom att dra, dubbelklicka eller använda Shift och pilarna.",
              "child": "Innan du kan kopiera eller ändra text måste du visa datorn vilken text du menar. Det kallas att markera. Du kan dra med musen över texten, dubbelklicka på ett ord eller trycka Ctrl+A för att ta allt."
            }
          },
          {
            "title": "Klart",
            "text": "Du kan markera text på flera sätt."
          }
        ],
        "detail": {
          "what": "Text måste ofta markeras innan den kan kopieras, tas bort eller formateras.",
          "recognize": "Markerad text får en färgad bakgrund. Du kan dra med musen eller hålla Shift och använda piltangenterna.",
          "use": "Olika sätt passar olika mycket text.",
          "example": "Dubbelklick på ett ord markerar ordet. Trippelklick markerar ofta hela stycket. Ctrl+A markerar allt.",
          "everyday": [
            "Kopiera ett stycke från en webbsida.",
            "Byta ut ett felstavat ord."
          ],
          "mistakes": [
            "Att börja skriva när text är markerad och därmed ersätta den.",
            "Att missa en bokstav i början eller slutet av markeringen."
          ]
        }
      },
      "everyday-019-pin-taskbar": {
        "title": "Fäst ett program i aktivitetsfältet",
        "summary": "Gör program du använder ofta lätta att hitta.",
        "steps": [
          {
            "title": "Fästa program",
            "text": {
              "default": "Ett fäst program har sin ikon i aktivitetsfältet även när det är stängt. Du fäster det genom att högerklicka på appen i Start och välja Fäst i Aktivitetsfältet.",
              "short": "Högerklicka på appen i Start och välj Fäst i Aktivitetsfältet.",
              "child": "Program du använder ofta kan du sätta fast i raden längst ned. Då finns de alltid där och väntar, även när de är stängda. Det kallas att fästa."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Start, högerklicka på appen Webbläsare och välj Fäst i Aktivitetsfältet.",
              "guided": "Klicka på Start-knappen – de fyra blå rutorna längst ned. Under Fäst i Start-menyn letar du upp appen Webbläsare, den blå jordgloben. Högerklicka på den. En meny öppnas. Klicka på Fäst i Aktivitetsfältet. Webbläsarens ikon ligger nu kvar längst ned även när programmet är stängt.",
              "independent": "Fäst appen Webbläsare i Aktivitetsfältet.",
              "child.guided": "Öppna Start. Högerklicka på appen Webbläsare, den blå jordgloben. Välj Fäst i Aktivitetsfältet. Nu sitter webbläsaren fast längst ned!"
            },
            "hints": [
              "Öppna Start med Windows-symbolen i aktivitetsfältet.",
              "Leta upp appen Webbläsare under Fäst.",
              "Högerklicka på appen Webbläsare.",
              "Den gula ramen visar Start-knappen.",
              "Start → högerklicka på appen Webbläsare → Fäst i Aktivitetsfältet."
            ],
            "nudge": "Valet finns i snabbmenyn för appen."
          },
          {
            "title": "Klart",
            "text": "Du kan fästa program i aktivitetsfältet."
          }
        ],
        "detail": {
          "what": "Att fästa ett program betyder att ikonen ligger kvar i aktivitetsfältet även när programmet är stängt.",
          "recognize": "I Windows 11 fäster du via appens snabbmeny: högerklicka på appen i Start och välj Fäst i Aktivitetsfältet.",
          "use": "Det ger snabb åtkomst till program du använder ofta.",
          "example": "Webbläsaren kan ligga kvar bredvid Utforskaren i aktivitetsfältet även när webbläsaren är stängd.",
          "steps": [
            "Öppna Start.",
            "Högerklicka på appen Webbläsare.",
            "Välj Fäst i Aktivitetsfältet.",
            "Kontrollera att webbläsarikonen syns i aktivitetsfältet."
          ],
          "everyday": [
            "Fäst webbläsaren du använder varje dag.",
            "Fäst ett program du ofta behöver på jobbet."
          ],
          "mistakes": [
            "Att tro att ett fäst program alltid är igång bara för att ikonen syns.",
            "Att leta efter en särskild knapp i stället för att använda högerklicksmenyn."
          ]
        }
      },
      "everyday-020-snap": {
        "title": "Två fönster sida vid sida",
        "summary": "Lägg två fönster bredvid varandra med fäst-funktionen.",
        "steps": [
          {
            "title": "Fäst fönster",
            "text": {
              "default": "Drar du ett fönster hela vägen till skärmens vänstra eller högra kant fyller det halva skärmen. Då kan du ha två program bredvid varandra.",
              "short": "Dra ett fönster till skärmkanten så fyller det halva skärmen.",
              "child": "Om du vill se två program samtidigt kan du dela skärmen på mitten. Dra ett fönster hela vägen till vänster kant och ett annat till höger kant, så får de varsin halva."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Dra webbläsaren i den tomma ytan högst upp till vänster skärmkant. Dra sedan Anteckningar i namnlisten till höger skärmkant.",
              "guided": "I webbläsaren tar du tag i den tomma ytan bredvid flikarna högst upp. Håll vänster musknapp nere och dra hela vägen till skärmens vänstra kant. När pekaren når kanten visas en ram – släpp då. Ta sedan tag i namnlisten högst upp i Anteckningar och dra hela vägen till höger kant. Släpp. Nu har du två fönster sida vid sida.",
              "independent": "Lägg webbläsaren och Anteckningar sida vid sida, med webbläsaren till vänster.",
              "child.guided": "Ta tag i webbläsaren högst upp och dra hela vägen till vänster kant, och släpp. Ta tag i Anteckningar och dra hela vägen till höger kant, och släpp. Nu delar de skärmen!"
            },
            "hints": [
              "I webbläsaren tar du tag i den tomma ytan bredvid flikarna högst upp.",
              "Håll musknappen nere och dra hela vägen till vänster kant. Släpp när pekaren når kanten.",
              "Ta tag i namnlisten högst upp i Anteckningar.",
              "Dra Anteckningar hela vägen till höger kant och släpp.",
              "Webbläsaren → vänster kant. Anteckningar → höger kant."
            ],
            "nudge": "Fönster kan fylla halva skärmen om du drar dem tillräckligt långt."
          },
          {
            "title": "Klart",
            "text": "Du kan lägga fönster sida vid sida."
          }
        ],
        "detail": {
          "what": "Windows kan placera ett fönster på halva skärmen när du drar det mot vänster eller höger kant.",
          "recognize": "Fönstret ändrar storlek och fyller halva skärmen. Funktionen heter Fäst (Snap). Du kan också peka på Maximera-knappen för att se färdiga layouter.",
          "use": "Det är praktiskt när du läser på ett ställe och skriver på ett annat.",
          "example": "Ha webbläsaren på vänster halva och Anteckningar på höger halva när du kopierar information.",
          "steps": [
            "Dra webbläsaren i den tomma ytan bredvid flikarna till vänster kant och släpp.",
            "Dra Anteckningar i namnlisten till höger kant och släpp."
          ],
          "everyday": [
            "Jämföra två dokument.",
            "Kopiera information från webben till ett mejl."
          ],
          "mistakes": [
            "Att maximera båda fönstren och växla fram och tillbaka i onödan.",
            "Att släppa fönstret innan pekaren har nått skärmkanten."
          ]
        }
      },
      "devices-001-usb": {
        "title": "USB-minne",
        "summary": "Öppna, kopiera från och mata ut ett USB-minne säkert.",
        "steps": [
          {
            "title": "USB-minne",
            "text": {
              "default": "Ett USB-minne visas som en egen enhet i Utforskaren. Mata alltid ut det innan du drar ur det, så att inget som håller på att sparas går förlorat.",
              "short": "USB-minnet syns i Utforskaren. Mata ut det innan du drar ur det.",
              "child": "Ett USB-minne är en liten pinne som kan bära filer mellan datorer, som en ryggsäck för filer. När den sitter i datorn syns den i Utforskaren. Innan du drar ut den säger du till datorn – det kallas att mata ut – så att inget går sönder."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna USB-enhet (E:), kopiera rapport.pdf och klistra in den i Dokument. Högerklicka sedan på USB-enhet (E:) och välj Mata ut.",
              "guided": "Titta i spalten till vänster i Utforskaren och klicka på USB-enhet (E:). Klicka en gång på rapport.pdf och sedan på Kopiera högst upp. Klicka på Dokument i vänsterspalten och sedan på Klistra in. Högerklicka nu på USB-enhet (E:) i vänsterspalten och välj Mata ut. Windows säger till när det är säkert att ta ut minnet.",
              "independent": "Kopiera rapport.pdf från USB-minnet till Dokument och ta sedan bort USB-minnet på ett säkert sätt.",
              "child.guided": "Klicka på USB-enhet (E:) till vänster. Kopiera rapport.pdf, gå till Dokument och klistra in. Högerklicka sedan på USB-enhet (E:) och välj Mata ut."
            },
            "hints": [
              "Klicka på USB-enhet (E:) i Utforskarens vänsterspalt.",
              "Markera rapport.pdf och klicka Kopiera.",
              "Klicka på Dokument och sedan på Klistra in.",
              "Högerklicka på USB-enhet (E:) i vänsterspalten.",
              "Välj Mata ut. Windows säger när det är säkert att ta bort enheten."
            ],
            "nudge": "Innehållet på USB-minnet hittar du på samma ställe som andra mappar."
          },
          {
            "title": "Klart",
            "text": "Du kan använda och mata ut ett USB-minne."
          }
        ],
        "detail": {
          "what": "Ett USB-minne är en liten lagringsenhet som du sätter i datorn.",
          "recognize": "När det är anslutet visas det som en egen enhet i Utforskaren, till exempel USB-enhet (E:).",
          "use": "Det används för att flytta filer mellan datorer eller som extra lagring.",
          "example": "Kopiera en PDF från USB-minnet till Dokument och mata sedan ut minnet innan du drar ur det.",
          "everyday": [
            "Flytta en presentation mellan datorer.",
            "Ta med dokument till en annan plats."
          ],
          "mistakes": [
            "Att dra ur USB-minnet mitt under en kopiering.",
            "Att arbeta direkt på USB-minnet och glömma var den enda kopian finns."
          ]
        }
      },
      "devices-002-ports": {
        "title": "USB-A, USB-C och andra uttag",
        "summary": "Känn igen vanliga uttag på datorn.",
        "steps": [
          {
            "title": "Uttag",
            "text": {
              "default": "USB-A är rektangulärt och USB-C är litet och avlångt med rundade kanter. HDMI används för skärmar. Kontakten ska gå in lätt – tvinga den aldrig.",
              "short": "USB-A är rektangulärt, USB-C litet och rundat, HDMI är för skärmar.",
              "child": "Datorns uttag har olika former, ungefär som pusselbitar. USB-A är fyrkantigt, USB-C är litet med rundade kanter och HDMI används för att koppla in en skärm. Kontakten ska glida in lätt – tryck aldrig hårt."
            }
          },
          {
            "title": "Klart",
            "text": "Du känner igen datorns vanligaste uttag."
          }
        ],
        "detail": {
          "what": "Uttag (portar) är där du ansluter tillbehör och kablar. USB-A är rektangulärt och USB-C är mindre och avlångt.",
          "recognize": "De sitter på datorns sidor eller baksida. HDMI är vanligt för skärmar och TV-apparater.",
          "use": "Rätt uttag behövs för laddning, skärm, USB-minne, mus och andra tillbehör.",
          "example": "Många bärbara datorer laddas via ett USB-C-uttag.",
          "everyday": [
            "Ladda datorn eller telefonen.",
            "Ansluta en skärm, ett USB-minne eller ett headset."
          ],
          "mistakes": [
            "Att tvinga in en kontakt i fel uttag.",
            "Att tro att alla USB-C-uttag kan exakt samma saker."
          ]
        }
      },
      "devices-003-wifi": {
        "title": "Anslut till Wi‑Fi",
        "summary": "Välj rätt trådlöst nätverk och anslut med lösenord.",
        "steps": [
          {
            "title": "Wi‑Fi",
            "text": {
              "default": "Under Inställningar → Nätverk och internet ser du nätverken i närheten. Välj ditt nätverk, klicka Anslut och skriv nätverkets lösenord – i Windows kallat nätverkssäkerhetsnyckel.",
              "short": "Välj nätverk, klicka Anslut och skriv nätverkssäkerhetsnyckeln.",
              "child": "Wi‑Fi är internet utan sladd. Datorn kan se flera nätverk omkring sig. Du väljer rätt nätverk och skriver dess lösenord, som Windows kallar nätverkssäkerhetsnyckel."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på HemmaNet i listan Tillgängliga nätverk, klicka Anslut, skriv datorskolan och klicka Nästa.",
              "guided": "Inställningar visar Nätverk och internet. Under Wi‑Fi finns listan Tillgängliga nätverk. Klicka på HemmaNet. Raden blir större och en knapp som heter Anslut visas – klicka på den. En ruta för nätverkssäkerhetsnyckeln dyker upp. Klicka i den, skriv datorskolan och klicka på Nästa.",
              "independent": "Anslut till HemmaNet. Nätverkssäkerhetsnyckeln är datorskolan.",
              "child.guided": "Titta på listan Tillgängliga nätverk under Wi‑Fi. Klicka på HemmaNet. Klicka på knappen Anslut som dyker upp. Skriv lösenordet datorskolan i rutan och klicka på Nästa."
            },
            "hints": [
              "Du är redan på Nätverk och internet. Listan Tillgängliga nätverk finns under Wi‑Fi.",
              "Klicka på HemmaNet i listan.",
              "Klicka Anslut. En ruta för nätverkssäkerhetsnyckeln visas.",
              "Den gula ramen visar HemmaNet.",
              "HemmaNet → Anslut → skriv datorskolan → Nästa. Det går också via Wi‑Fi-pilen i snabbinställningarna."
            ],
            "nudge": "Leta efter en lista med nätverk som finns i närheten."
          },
          {
            "title": "Klart",
            "text": "Du kan ansluta till ett Wi‑Fi-nätverk."
          }
        ],
        "detail": {
          "what": "Wi‑Fi är ett trådlöst sätt att ansluta datorn till ett nätverk och oftast till internet.",
          "recognize": "Windows visar en lista med nätverksnamn. Ett hänglås betyder att nätverket kräver lösenord. Wi‑Fi-ikonen sitter nere till höger i aktivitetsfältet.",
          "use": "Du behöver välja rätt nätverk och ibland skriva dess lösenord.",
          "example": "Hemma kan nätverket heta HemmaNet och ha lösenordet tryckt på routern.",
          "everyday": [
            "Hemma, på jobbet och på hotell.",
            "När datorn säger att den saknar internetanslutning."
          ],
          "mistakes": [
            "Att ansluta till ett nätverk med nästan samma namn som ditt riktiga.",
            "Att dela Wi‑Fi-lösenordet offentligt."
          ]
        }
      },
      "devices-004-bluetooth": {
        "title": "Bluetooth",
        "summary": "Anslut trådlösa tillbehör på nära håll.",
        "steps": [
          {
            "title": "Bluetooth",
            "text": {
              "default": "Bluetooth ansluter tillbehör som hörlurar och möss utan sladd. Du lägger till en ny enhet en gång – sedan ansluter den av sig själv.",
              "short": "Lägg till en Bluetooth-enhet en gång, sedan ansluter den själv.",
              "child": "Bluetooth kopplar ihop saker utan sladd, till exempel hörlurar. Första gången introducerar du dem för varandra med Lägg till enhet. Sedan känner de igen varandra och kopplar ihop sig själva."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Kontrollera att Bluetooth är På, klicka Lägg till enhet, välj Bluetooth och sedan Headset.",
              "guided": "Inställningar visar Bluetooth och enheter. Kontrollera först att strömbrytaren för Bluetooth står på På. Under Enheter finns knappen Lägg till enhet – klicka på den. I rutan som öppnas klickar du på Bluetooth. Datorn letar efter enheter. Klicka på Headset när det dyker upp, och sedan på Klart.",
              "independent": "Anslut headsetet med Bluetooth.",
              "child.guided": "Kontrollera att knappen för Bluetooth står på På. Klicka på Lägg till enhet under Enheter. Klicka på Bluetooth i rutan som kommer fram. När Headset dyker upp klickar du på det, och sedan på Klart."
            },
            "hints": [
              "Du är redan på Bluetooth och enheter. Kontrollera att Bluetooth är På.",
              "Klicka Lägg till enhet under Enheter.",
              "Välj Bluetooth i rutan som visas.",
              "Den gula ramen visar knappen Lägg till enhet.",
              "Lägg till enhet → Bluetooth → Headset → Klart."
            ],
            "nudge": "En ny enhet läggs till med en knapp under Enheter."
          },
          {
            "title": "Klart",
            "text": "Du kan lägga till Bluetooth-enheter."
          }
        ],
        "detail": {
          "what": "Bluetooth är en trådlös teknik för tillbehör på nära håll.",
          "recognize": "Du hittar den under Inställningar → Bluetooth och enheter och i snabbinställningarna.",
          "use": "Bluetooth används för headset, hörlurar, möss, tangentbord och högtalare.",
          "example": "Sätt headsetet i parkopplingsläge och välj det i listan som Windows visar.",
          "everyday": [
            "Trådlösa hörlurar i videomöten.",
            "Trådlös mus eller tangentbord."
          ],
          "mistakes": [
            "Att glömma att enheten redan är ansluten till en annan dator eller telefon.",
            "Att tro att Bluetooth är samma sak som Wi‑Fi."
          ]
        }
      },
      "devices-005-audio-camera": {
        "title": "Volym, mikrofon och kamera",
        "summary": "Kontrollera de viktigaste inställningarna inför ett videosamtal.",
        "steps": [
          {
            "title": "Inför ett samtal",
            "text": {
              "default": "Volymen ställer du under System → Ljud eller i snabbinställningarna. Om appar får använda kameran och mikrofonen bestämmer du under Sekretess och säkerhet.",
              "short": "Volym under System → Ljud. Kamera och mikrofon under Sekretess och säkerhet.",
              "child": "Hur högt det låter ställer du med ett reglage. Om program får använda kameran och mikrofonen bestämmer du själv – det är dina ögon och öron på nätet, så de har egna strömbrytare."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Dra volymreglaget under Ljud till minst 40. Öppna sedan Sekretess och säkerhet och slå på Kamera och Mikrofon.",
              "guided": "Inställningar visar System. Under Ljud finns ett volymreglage – dra den runda knappen åt höger tills siffran är minst 40. Klicka sedan på Sekretess och säkerhet i spalten till vänster. Där finns strömbrytare för Kamera och Mikrofon. Klicka på dem så att båda står på På.",
              "independent": "Höj volymen till minst 40 och slå på kamera och mikrofon för appar.",
              "child.guided": "Dra volymreglaget åt höger tills det står minst 40. Klicka på Sekretess och säkerhet till vänster och slå på Kamera och Mikrofon."
            },
            "hints": [
              "Du är på System. Dra volymreglaget under Ljud till minst 40.",
              "Klicka på Sekretess och säkerhet i vänsterspalten.",
              "Slå på Kamera med strömbrytaren.",
              "Slå på Mikrofon med strömbrytaren.",
              "System → Ljud: volym ≥ 40 → Sekretess och säkerhet → Kamera På → Mikrofon På."
            ],
            "nudge": "Ljud och integritet finns på två olika sidor i Inställningar."
          },
          {
            "title": "Klart",
            "text": "Du kan förbereda datorn för ett videosamtal."
          }
        ],
        "detail": {
          "what": "Datorn kan ha flera högtalare, mikrofoner och kameror. Appar behöver rätt enhet och tillåtelse att använda den.",
          "recognize": "Högtalarikonen sitter nere till höger. Behörigheter för kamera och mikrofon finns under Sekretess och säkerhet.",
          "use": "Det är viktigt inför Teams, Zoom och andra videosamtal.",
          "example": "Om ingen hör dig kan mikrofonen vara avstängd, även om du själv hör de andra.",
          "everyday": [
            "Videomöten och samtal.",
            "Titta på film eller lyssna på musik."
          ],
          "mistakes": [
            "Att höja högtalarvolymen när problemet egentligen är mikrofonen.",
            "Att glömma att kameran eller mikrofonen är avstängd i själva mötesappen."
          ]
        }
      },
      "devices-006-printers": {
        "title": "Skrivare och utskriftskö",
        "summary": "Förstå vad som händer när något skickas till en skrivare.",
        "steps": [
          {
            "title": "Skrivare",
            "text": {
              "default": "När du skriver ut läggs ett utskriftsjobb i en kö. Om inget kommer ut: kontrollera vilken skrivare som är vald, papper, sladd eller Wi‑Fi – innan du klickar Skriv ut igen.",
              "short": "Kommer inget ut: kontrollera skrivare, papper och anslutning innan du skriver ut igen.",
              "child": "När du skriver ut ställer sig utskriften i en kö och väntar på sin tur. Om inget papper kommer ut: kolla att rätt skrivare är vald, att det finns papper och att skrivaren är ansluten. Tryck inte på Skriv ut många gånger."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet vad du ska kontrollera när en utskrift inte kommer ut."
          }
        ],
        "detail": {
          "what": "En skrivare är en egen enhet. När du skriver ut skapas ett utskriftsjobb som väntar i en kö.",
          "recognize": "Du hittar skrivarna under Inställningar → Bluetooth och enheter → Skrivare och skannrar, där kön kan öppnas.",
          "use": "Om inget kommer ut kan felet vara vald skrivare, papper, anslutning eller ett jobb som har fastnat.",
          "example": "Du råkar välja kontorets färgskrivare i stället för den som står bredvid dig.",
          "everyday": [
            "Skriva ut blanketter och biljetter.",
            "Ta reda på varför en utskrift inte kommer ut."
          ],
          "mistakes": [
            "Att trycka Skriv ut fem gånger när inget händer och få fem kopior.",
            "Att inte kontrollera vilken skrivare som är vald."
          ]
        }
      },
      "devices-007-battery": {
        "title": "Batteri och laddning",
        "summary": "Förstå batterinivå, laddning och energisparläge.",
        "steps": [
          {
            "title": "Batteriet",
            "text": {
              "default": "Batterinivån syns nere till höger. När den är låg ansluter du laddaren. Energisparläge i snabbinställningarna gör att batteriet räcker längre.",
              "short": "Batterinivån syns nere till höger. Energisparläge förlänger batteritiden.",
              "child": "Nere till höger visar en liten batteribild hur mycket ström som finns kvar. När den börjar ta slut kopplar du in laddaren. Energisparläge gör att batteriet räcker längre."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet hur du håller koll på batteriet."
          }
        ],
        "detail": {
          "what": "Bärbara datorer har ett batteri som visar ungefär hur mycket tid som är kvar.",
          "recognize": "Batteriikonen och procenten visas nära klockan. En liten blixt betyder att laddaren är ansluten.",
          "use": "Du behöver se när datorn behöver laddas och förstå att låg batterinivå kan göra datorn långsammare.",
          "example": "Vid 10 % ansluter du laddaren innan ett långt videomöte.",
          "everyday": [
            "Arbeta utan vägguttag.",
            "Kontrollera om laddaren verkligen laddar."
          ],
          "mistakes": [
            "Att tro att datorn är trasig när batteriet bara är slut.",
            "Att använda fel laddare eller kabel."
          ]
        }
      },
      "devices-008-external-screen": {
        "title": "Extern skärm och projektor",
        "summary": "Förstå hur en andra skärm kan användas.",
        "steps": [
          {
            "title": "Två skärmar",
            "text": {
              "default": "En extern skärm eller projektor kan visa samma bild som datorn (Dubblera) eller ge dig extra yta (Utöka). Windows-tangenten + P växlar mellan lägena.",
              "short": "Dubblera visar samma bild, Utöka ger extra yta.",
              "child": "Du kan koppla in en extra skärm eller en projektor. Antingen visar den samma bild som datorn (Dubblera), eller så blir skärmen större så att du får mer plats (Utöka)."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet hur en extra skärm fungerar."
          }
        ],
        "detail": {
          "what": "En extern skärm eller projektor ansluts till datorn och kan visa samma bild eller ge extra arbetsyta.",
          "recognize": "Windows har lägena Dubblera och Utöka. HDMI och USB-C används ofta för anslutningen.",
          "use": "Det är vanligt på jobbet, vid presentationer och när en bärbar dator används vid ett skrivbord.",
          "example": "Med Utöka kan du ha webbläsaren på en skärm och dokumentet på den andra.",
          "everyday": [
            "Presentationer på projektor.",
            "Två skärmar på kontoret."
          ],
          "mistakes": [
            "Att flytta ett fönster till skärm två och tro att programmet har försvunnit.",
            "Att välja Dubblera när du egentligen vill ha mer yta."
          ]
        }
      },
      "trouble-001-error": {
        "title": "Läs felmeddelandet",
        "summary": "Använd texten i ett felmeddelande för att förstå nästa säkra steg.",
        "steps": [
          {
            "title": "Felmeddelanden",
            "text": {
              "default": "Ett felmeddelande berättar ofta både vad som gick fel och vad du kan göra. Läs hela texten innan du väljer en knapp.",
              "short": "Läs hela felmeddelandet innan du väljer en knapp.",
              "child": "Ett felmeddelande är datorn som försöker förklara vad som gick fel. Läs hela texten, även om den känns krånglig. Ofta står det både vad problemet är och vad du kan göra."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på rapport.pdf i Rapportvisaren. Läs hela felmeddelandet och klicka sedan på Stäng.",
              "guided": "Rapportvisaren är öppen. Under Senaste filer finns rapport.pdf – klicka en gång på den. En ruta med ett felmeddelande visas. Läs först rubriken och sedan hela texten. Den förklarar att filen används av ett annat program. Klicka sedan på knappen Stäng.",
              "independent": "Ta reda på varför rapport.pdf inte går att öppna i Rapportvisaren, och stäng sedan felmeddelandet.",
              "child.guided": "Klicka på rapport.pdf. En ruta med ett fel kommer fram. Läs allt i rutan – där står vad som hände. Klicka sedan på Stäng."
            },
            "hints": [
              "Klicka på rapport.pdf under Senaste filer i Rapportvisaren.",
              "Läs rubriken och hela förklaringen i rutan som visas.",
              "Meddelandet säger att filen används av ett annat program – det är orsaken.",
              "Den gula ramen visar filen.",
              "rapport.pdf → läs → Stäng. Försök igen hjälper inte förrän det andra programmet är stängt."
            ],
            "nudge": "Felet visas när du försöker öppna en av filerna."
          },
          {
            "title": "Klart",
            "text": "Du läser felmeddelanden innan du agerar."
          }
        ],
        "detail": {
          "what": "Ett felmeddelande beskriver vad som gick fel och ibland vad du kan göra åt det.",
          "recognize": "Det visas som en ruta med en ikon, en förklaring och knappar som OK, Stäng eller Försök igen.",
          "use": "Att läsa meddelandet först är nästan alltid bättre än att klicka bort det.",
          "example": "Om en fil används av ett annat program kan lösningen vara att stänga det programmet och försöka igen.",
          "everyday": [
            "När en fil inte går att öppna eller spara.",
            "När ett program saknar behörighet eller anslutning."
          ],
          "mistakes": [
            "Att bara läsa ordet Fel och strunta i resten.",
            "Att välja den mest drastiska knappen utan att förstå vad den gör."
          ]
        }
      },
      "trouble-002-restart": {
        "title": "Starta om, stäng av och uppdatera",
        "summary": "Förstå skillnaden mellan strömalternativen.",
        "steps": [
          {
            "title": "Starta om",
            "text": {
              "default": "Starta om stänger Windows och startar det igen – det löser många tillfälliga problem och behövs efter uppdateringar. Stäng av lämnar datorn avstängd. Spara alltid ditt arbete först.",
              "short": "Spara först. Starta om löser många problem och behövs efter uppdateringar.",
              "child": "Att starta om är som att datorn tar en kort tupplur och vaknar pigg igen. Det löser många små problem och behövs efter uppdateringar. Spara alltid det du håller på med först."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Läs informationen i Windows Update och klicka på Starta om nu.",
              "guided": "Inställningar visar Windows Update. Läs rutan högst upp: den säger att datorn måste startas om för att uppdateringarna ska installeras. Läs också påminnelsen om att spara ditt arbete först. Klicka sedan på den blå knappen Starta om nu.",
              "independent": "Starta om datorn så att uppdateringarna installeras.",
              "child.guided": "Läs vad det står högst upp i Windows Update. Kom ihåg att spara först! Klicka sedan på Starta om nu."
            },
            "hints": [
              "Du är redan på Windows Update.",
              "Läs att en omstart krävs för att uppdateringarna ska installeras.",
              "Läs påminnelsen om att spara ditt arbete först.",
              "Den gula ramen visar knappen Starta om nu.",
              "Windows Update → Starta om nu."
            ],
            "nudge": "Läs vad Windows Update vill att du ska göra."
          },
          {
            "title": "Klart",
            "text": "Du vet när och hur du startar om datorn."
          }
        ],
        "detail": {
          "what": "Starta om stänger Windows och startar det igen. Stäng av lämnar datorn avstängd. Uppdatera och starta om installerar väntande uppdateringar.",
          "recognize": "Alternativen finns under strömknappen i Start-menyn. Windows Update visar när en omstart krävs.",
          "use": "En omstart löser många tillfälliga problem och behövs ofta efter uppdateringar.",
          "example": "När Windows säger att en uppdatering kräver omstart väljer du att starta om när det passar – efter att du har sparat.",
          "everyday": [
            "Efter Windows-uppdateringar.",
            "När ett problem finns kvar även efter att programmet har startats om."
          ],
          "mistakes": [
            "Att hålla inne strömknappen som första lösning.",
            "Att starta om mitt i osparat arbete."
          ]
        }
      },
      "trouble-003-frozen": {
        "title": "När ett program inte svarar",
        "summary": "Lös ett program som har hängt sig, lugnt och i rätt ordning.",
        "steps": [
          {
            "title": "Programmet svarar inte",
            "text": {
              "default": "Ibland slutar ett program svara. Börja med det minst drastiska: vänta. Hjälper inte det stänger du programmet och startar det igen.",
              "short": "Vänta först. Hjälper det inte, stäng programmet och starta det igen.",
              "child": "Ibland fastnar ett program och svarar inte. Då ska du först vänta en stund – det kanske bara tänker. Om det fortfarande inte svarar stänger du det och startar det igen."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Klicka på krysset i Rapportvisaren och välj Vänta på programmet. Klicka på krysset igen och välj Stäng programmet. Starta sedan Rapportvisaren från Start.",
              "guided": "Klicka på krysset uppe till höger i Rapportvisaren. En ruta säger att programmet inte svarar. Börja med att klicka på Vänta på programmet. Programmet svarar fortfarande inte, så klicka på krysset en gång till och välj Stäng programmet. Öppna sedan Start, skriv Rapportvisaren och tryck Retur.",
              "independent": "Rapportvisaren svarar inte. Ge den en chans, stäng den sedan och starta den igen.",
              "child.guided": "Klicka på krysset. Välj först Vänta på programmet. Hjälpte det inte? Klicka på krysset igen och välj Stäng programmet. Öppna sedan Rapportvisaren igen från Start."
            },
            "hints": [
              "Klicka på krysset uppe till höger i Rapportvisaren.",
              "I rutan som visas väljer du först Vänta på programmet.",
              "Programmet svarar fortfarande inte. Klicka på krysset igen.",
              "Välj Stäng programmet.",
              "Öppna Start, skriv Rapportvisaren och tryck Retur."
            ],
            "nudge": "Börja med det minst drastiska du kan göra."
          },
          {
            "title": "Klart",
            "text": "Du kan hantera ett program som inte svarar."
          }
        ],
        "detail": {
          "what": "Ett program kan tillfälligt sluta svara utan att hela datorn är trasig.",
          "recognize": "Fönstret blir blekt, namnlisten säger (Svarar inte) och programmet reagerar inte på klick.",
          "use": "Börja med den minst drastiska lösningen och gå vidare steg för steg.",
          "example": "Vänta en stund. Om inget händer: stäng programmet och starta det igen.",
          "everyday": [
            "Tunga dokument eller webbsidor kan behöva tid.",
            "Ett program kan fastna medan resten av Windows fungerar."
          ],
          "mistakes": [
            "Att genast stänga av hela datorn.",
            "Att klicka hundra gånger i programmet som har hängt sig."
          ]
        }
      },
      "trouble-004-task-manager": {
        "title": "Aktivitetshanteraren",
        "summary": "Förstå verktyget som visar vilka program som körs.",
        "steps": [
          {
            "title": "Aktivitetshanteraren",
            "text": {
              "default": "Aktivitetshanteraren visar alla program som körs. Där kan du avsluta ett program som har hängt sig och inte går att stänga på vanligt sätt. Du öppnar den med Ctrl+Shift+Esc.",
              "short": "Aktivitetshanteraren (Ctrl+Shift+Esc) kan avsluta ett program som har hängt sig.",
              "child": "Aktivitetshanteraren är som en lista över allt datorn håller på med just nu. Har ett program fastnat helt kan du avsluta det därifrån. Du öppnar den med tre tangenter: Ctrl, Shift och Esc."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet vad Aktivitetshanteraren är."
          }
        ],
        "detail": {
          "what": "Aktivitetshanteraren är ett Windows-verktyg som visar program och hur mycket av datorns resurser de använder.",
          "recognize": "Den visar en lista med appar och kolumner som CPU och Minne. Du öppnar den med Ctrl+Shift+Esc eller genom att högerklicka på Start.",
          "use": "Den används när ett program verkligen har hängt sig och inte går att stänga normalt.",
          "example": "Markera programmet som inte svarar och klicka Avsluta aktivitet.",
          "everyday": [
            "Se vilket program som gör datorn långsam.",
            "Avsluta ett program som inte svarar."
          ],
          "mistakes": [
            "Att avsluta systemprocesser som man inte känner igen.",
            "Att använda Aktivitetshanteraren som första lösning i stället för krysset."
          ]
        }
      },
      "trouble-005-internet": {
        "title": "När internet inte fungerar",
        "summary": "Följ en enkel checklista innan du tror att datorn är trasig.",
        "steps": [
          {
            "title": "Kontrollera i tur och ordning",
            "text": {
              "default": "1. Är Wi‑Fi på och anslutet? Titta nere till höger. 2. Fungerar en annan webbplats? 3. Fungerar internet på andra enheter? 4. Först då: starta om routern.",
              "short": "Kontrollera Wi‑Fi, en annan sida och andra enheter innan du startar om routern.",
              "child": "Fungerar inte internet? Var en detektiv och kontrollera en sak i taget: Är Wi‑Fi på? Fungerar en annan sida? Har andra i huset internet? Först sist startar du om routern, den lilla lådan som ger internet."
            }
          },
          {
            "title": "Klart",
            "text": "Du kan felsöka internet steg för steg."
          }
        ],
        "detail": {
          "what": "Problem med internet kan bero på Wi‑Fi, routern, internettjänsten eller bara den webbplats du försöker nå.",
          "recognize": "Wi‑Fi-ikonen nere till höger visar om datorn är ansluten. En enda webbplats kan ligga nere även om internet fungerar.",
          "use": "En kontroll i steg hjälper dig hitta var problemet finns.",
          "example": "Kontrollera Wi‑Fi → prova en annan webbplats → kontrollera andra enheter → starta om routern om det behövs.",
          "everyday": [
            "Webbsidor slutar ladda.",
            "Ett videosamtal tappar anslutningen."
          ],
          "mistakes": [
            "Att ändra många nätverksinställningar på en gång.",
            "Att tro att internet är nere bara för att en webbplats inte svarar."
          ]
        }
      },
      "trouble-006-sound": {
        "title": "När ljudet inte fungerar",
        "summary": "Kontrollera rätt saker i rätt ordning.",
        "steps": [
          {
            "title": "Inget ljud?",
            "text": {
              "default": "Kontrollera i tur och ordning: är ljudet avstängt (mute)? Är volymen uppe? Är rätt högtalare eller hörlurar vald? Är ljudet på i själva programmet?",
              "short": "Kontrollera ljud av, volym, vald högtalare och programmets eget ljud.",
              "child": "Hörs inget? Kontrollera en sak i taget: Är ljudet avstängt? Är volymen uppskruvad? Är rätt högtalare eller hörlurar valda? Och är ljudet på i programmet du använder?"
            }
          },
          {
            "title": "Klart",
            "text": "Du kan felsöka ljud steg för steg."
          }
        ],
        "detail": {
          "what": "Ljud kan saknas för att volymen är låg, ljudet är avstängt eller fel högtalare är vald.",
          "recognize": "Högtalarikonen sitter nere till höger. Ett kryss över den betyder att ljudet är avstängt. Under System → Ljud väljer du utdataenhet.",
          "use": "Kontrollera de enkla orsakerna innan du gör något större.",
          "example": "Kontrollera mute → volym → vald ljudenhet → volymen i programmet.",
          "everyday": [
            "Inget ljud i en video eller ett möte.",
            "Ljudet kommer ur skärmen i stället för headsetet."
          ],
          "mistakes": [
            "Att blanda ihop problem med mikrofonen och problem med högtalarna.",
            "Att installera om saker innan man har kontrollerat mute."
          ]
        }
      },
      "trouble-007-storage": {
        "title": "När lagringsutrymmet tar slut",
        "summary": "Förstå vad fullt lagringsutrymme betyder och vad som är säkert att rensa.",
        "steps": [
          {
            "title": "Fullt utrymme",
            "text": {
              "default": "När lagringen börjar bli full varnar Windows. Under Inställningar → System → Lagring ser du vad som tar plats. Börja med Hämtade filer och Papperskorgen – inte okända systemmappar.",
              "short": "Se vad som tar plats under System → Lagring. Börja med Hämtade filer och Papperskorgen.",
              "child": "Datorns minne kan bli fullt, som en garderob. Då varnar Windows. Rensa först bland sådant du vet vad det är, som Hämtade filer och Papperskorgen. Rör inte mappar du inte känner igen."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet hur du frigör utrymme på ett säkert sätt."
          }
        ],
        "detail": {
          "what": "Datorns lagring har ett begränsat utrymme. När den börjar bli full kan program få problem att spara eller uppdatera.",
          "recognize": "Inställningar → System → Lagring visar hur mycket som används av appar, dokument, bilder och tillfälliga filer.",
          "use": "Ta reda på vad som tar plats innan du tar bort något.",
          "example": "Hämtade filer kan innehålla gamla, stora installationsfiler som inte behövs längre.",
          "everyday": [
            "Windows varnar för lite diskutrymme.",
            "En uppdatering går inte att installera."
          ],
          "mistakes": [
            "Att ta bort okända systemmappar.",
            "Att tömma Papperskorgen utan att först kontrollera att inget viktigt ligger där."
          ]
        }
      },
      "everyday-021-link-actions": {
        "title": "Kopiera länk och öppna i ny flik",
        "summary": "Använd en länks högerklicksmeny i webbläsaren.",
        "steps": [
          {
            "title": "Länkens meny",
            "text": {
              "default": "Högerklickar du på en länk i webbläsaren kan du kopiera själva adressen eller öppna länken i en ny flik – utan att lämna sidan du är på.",
              "short": "Högerklicka på en länk för att kopiera den eller öppna den i ny flik.",
              "child": "Länkar har en egen snabbmeny. Högerklickar du på en länk kan du kopiera adressen, till exempel för att skicka den till någon, eller öppna länken i en ny flik utan att lämna sidan du är på."
            }
          },
          {
            "title": "Din tur",
            "text": {
              "default": "Öppna Sökresultat. Högerklicka på en blå länk och välj Kopiera länkadress. Högerklicka sedan igen och välj Öppna länk i ny flik.",
              "guided": "Klicka på genvägen Sökresultat på webbläsarens startsida. Lägg pekaren direkt på en blå länktext – pekaren blir en hand. Tryck på höger musknapp. Välj Kopiera länkadress i menyn. Högerklicka sedan på en länk igen och välj Öppna länk i ny flik. En ny flik öppnas högst upp.",
              "independent": "Kopiera adressen till en länk i Sökresultat och öppna en länk i en ny flik.",
              "child.guided": "Öppna Sökresultat. Högerklicka på en blå länk och välj Kopiera länkadress. Högerklicka igen och välj Öppna länk i ny flik."
            },
            "hints": [
              "Klicka på genvägen Sökresultat på webbläsarens startsida.",
              "Högerklicka direkt på den blå länktexten – inte bredvid.",
              "Välj Kopiera länkadress.",
              "Högerklicka på en länk igen och välj Öppna länk i ny flik.",
              "Sökresultat → högerklick på blå länk → Kopiera länkadress → högerklick igen → Öppna länk i ny flik."
            ],
            "nudge": "Länkar har fler val än att bara klicka på dem."
          },
          {
            "title": "Klart",
            "text": "Du kan använda länkens högerklicksmeny."
          }
        ],
        "detail": {
          "what": "En länk har en adress bakom sig. Du kan kopiera adressen eller öppna länken i en ny flik utan att lämna sidan.",
          "recognize": "I webbläsaren visar högerklick på en länk en meny med länkkommandon. Länken är ofta blå och pekaren blir en hand.",
          "use": "Det är användbart när du vill skicka en adress till någon eller öppna flera resultat utan att tappa resultatsidan.",
          "example": "På en söksida kan du kopiera ett resultats adress och öppna ett annat resultat i en ny flik.",
          "steps": [
            "Öppna Sökresultat.",
            "Högerklicka på en blå länk.",
            "Välj Kopiera länkadress.",
            "Högerklicka på en länk igen.",
            "Välj Öppna länk i ny flik."
          ],
          "everyday": [
            "Skicka en webbadress i ett mejl eller en chatt.",
            "Öppna flera sökresultat utan att tappa resultatsidan."
          ],
          "mistakes": [
            "Att kopiera den synliga texten i stället för länkadressen.",
            "Att vänsterklicka och lämna sidan när du ville behålla den."
          ]
        }
      },
      "devices-009-hotspot": {
        "title": "Mobil hotspot",
        "summary": "Förstå hur telefonen kan dela sin internetanslutning med datorn.",
        "steps": [
          {
            "title": "Hotspot",
            "text": {
              "default": "En mobil hotspot gör telefonen till ett tillfälligt Wi‑Fi-nätverk. Datorn ansluter till det som till vilket Wi‑Fi som helst. Tänk på att det använder telefonens mobildata.",
              "short": "En mobil hotspot gör telefonen till ett Wi‑Fi-nätverk.",
              "child": "En mobil kan dela sitt internet med datorn. Då blir mobilen ett litet Wi‑Fi-nätverk som datorn kan ansluta till. Det använder mobilens surf, så fråga först om det är okej."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet hur en mobil hotspot fungerar."
          }
        ],
        "detail": {
          "what": "En mobil hotspot gör telefonen till ett tillfälligt Wi‑Fi-nätverk som datorn kan ansluta till.",
          "recognize": "Telefonen visar ett nätverksnamn och ett lösenord. Datorn ser nätverket i den vanliga Wi‑Fi-listan.",
          "use": "Det är praktiskt när vanligt Wi‑Fi saknas men telefonen har internet.",
          "example": "På tåget delar du telefonens internet och ansluter datorn till telefonens hotspot.",
          "everyday": [
            "Internet tillfälligt på resor.",
            "En reservlösning när hemmanätverket inte fungerar."
          ],
          "mistakes": [
            "Att glömma att hotspot använder mobildata.",
            "Att låta hotspot vara på med ett enkelt lösenord längre än nödvändigt."
          ]
        }
      },
      "trouble-009-before-support": {
        "title": "Innan du ber om hjälp",
        "summary": "Samla rätt information så att någon annan lättare kan hjälpa dig.",
        "steps": [
          {
            "title": "Beskriv problemet",
            "text": {
              "default": "Skriv ned vad du gjorde, vad du väntade dig och vad som hände – och exakt vad felmeddelandet säger. En skärmbild hjälper mycket. Lämna aldrig ut ditt lösenord.",
              "short": "Skriv ned vad som hände och felmeddelandet. Lämna aldrig ut lösenordet.",
              "child": "Innan du ber någon om hjälp: skriv ned vad du gjorde och vad som hände, och ta gärna en skärmbild av felmeddelandet. Då blir det lättare att hjälpa dig. Ditt lösenord behöver ingen få veta."
            }
          },
          {
            "title": "Klart",
            "text": "Du kan beskriva ett problem tydligt."
          }
        ],
        "detail": {
          "what": "Bra felsökning handlar också om att beskriva problemet tydligt: vad du gjorde, vad du väntade dig och vad som faktiskt hände.",
          "recognize": "Skriv ned exakt felmeddelande, vilket program du använde och om problemet händer varje gång.",
          "use": "Det sparar mycket tid när du kontaktar support eller ber någon om hjälp.",
          "example": "Säg hellre ”När jag klickar Spara i Anteckningar står det Åtkomst nekad” än ”Datorn fungerar inte”.",
          "everyday": [
            "Skicka en skärmbild och feltexten till support.",
            "Förklara ett återkommande problem för en vän."
          ],
          "mistakes": [
            "Att säga att inget fungerar utan att beskriva vad som händer.",
            "Att lämna ut lösenord när någon försöker hjälpa."
          ]
        }
      },
      "trouble-008-backup": {
        "title": "Säkerhetskopior",
        "summary": "Förstå varför viktiga filer inte ska finnas på bara ett ställe.",
        "steps": [
          {
            "title": "Säkerhetskopior",
            "text": {
              "default": "En säkerhetskopia – backup – är en extra kopia på ett annat ställe, till exempel i OneDrive eller på en extern hårddisk. Viktiga filer ska finnas på minst två ställen.",
              "short": "Ha viktiga filer på minst två ställen.",
              "child": "En säkerhetskopia är en extra kopia som du sparar på ett annat ställe, till exempel i OneDrive. Om något händer med datorn finns dina viktiga filer kvar."
            }
          },
          {
            "title": "Klart",
            "text": "Du vet varför säkerhetskopior behövs."
          }
        ],
        "detail": {
          "what": "En säkerhetskopia är en extra kopia av viktiga filer som kan användas om originalet försvinner eller förstörs.",
          "recognize": "Säkerhetskopior kan finnas på en extern hårddisk, i en molntjänst eller på annan separat lagring.",
          "use": "Det skyddar mot trasiga hårddiskar, misstag, stöld och vissa angrepp.",
          "example": "Familjebilderna finns både på datorn och i OneDrive.",
          "everyday": [
            "Bilder, dokument och kvitton.",
            "Filer som du inte enkelt kan skapa igen."
          ],
          "mistakes": [
            "Att kalla en kopia på samma hårddisk för säkerhetskopia.",
            "Att aldrig kontrollera att säkerhetskopian går att återställa."
          ]
        }
      }
    },
    "scenarios": {
      "files-create-folder-01": {
        "title": "Skapa mappen Semester",
        "description": "Skapa en ny mapp i Dokument som heter Semester.",
        "goal": {
          "name": "Semester"
        }
      },
      "notepad-save-file-01": {
        "title": "Spara plan.txt",
        "description": "Öppna Anteckningar, skriv något och spara filen som plan.txt i Dokument.",
        "goal": {
          "name": "plan.txt"
        }
      },
      "recycle-restore-01": {
        "title": "Ta bort och återställ",
        "description": "Ta bort Övningsfil.txt och återställ den sedan från Papperskorgen.",
        "fixtures": [
          {
            "name": "Övningsfil.txt",
            "content": "Den här filen ska tas bort och återställas."
          }
        ],
        "goal": {
          "nodeName": "Övningsfil.txt"
        }
      },
      "mouse-move-01": {
        "title": "Flytta muspekaren",
        "description": "Flytta muspekaren en bit inne i övningsytan."
      },
      "mouse-target-01": {
        "title": "Träffa mål",
        "description": "För muspekaren till tre mål i ordning."
      },
      "mouse-click-01": {
        "title": "Vänsterklick",
        "description": "Klicka en gång med vänster musknapp på knappen."
      },
      "mouse-double-01": {
        "title": "Dubbelklick",
        "description": "Dubbelklicka på knappen."
      },
      "mouse-right-01": {
        "title": "Högerklick",
        "description": "Högerklicka på knappen."
      },
      "mouse-scroll-01": {
        "title": "Scrolla",
        "description": "Scrolla nedåt och sedan uppåt i listan."
      },
      "mouse-hold-01": {
        "title": "Klicka och håll",
        "description": "Håll vänster musknapp nedtryckt tills mätaren är full."
      },
      "mouse-drag-01": {
        "title": "Dra och släpp",
        "description": "Dra rutan till målet och släpp."
      },
      "mouse-final-01": {
        "title": "Mus – slutuppdrag",
        "description": "Klara alla musmoment utan steg-för-steg-instruktioner."
      },
      "keyboard-letters-01": {
        "title": "Skriv bokstäver",
        "description": "Skriv ordet dator."
      },
      "keyboard-numbers-01": {
        "title": "Skriv siffror",
        "description": "Skriv 12345."
      },
      "keyboard-editing-01": {
        "title": "Rätta text",
        "description": "Använd Mellanslag, Backspace, Delete och Retur."
      },
      "keyboard-shiftcaps-01": {
        "title": "Shift och Caps Lock",
        "description": "Skriv stora bokstäver med Shift och Caps Lock."
      },
      "keyboard-arrows-01": {
        "title": "Piltangenter",
        "description": "Använd alla fyra piltangenterna."
      },
      "keyboard-tabesc-01": {
        "title": "Tab och Esc",
        "description": "Flytta mellan knappar och stäng tipsrutan."
      },
      "keyboard-modifiers-01": {
        "title": "Ctrl och Alt",
        "description": "Tryck på Ctrl och Alt."
      },
      "keyboard-shortcuts-01": {
        "title": "Kortkommandon",
        "description": "Använd Ctrl+A, Ctrl+C och Ctrl+V."
      },
      "keyboard-special-01": {
        "title": "Specialtecken",
        "description": "Skriv vanliga specialtecken."
      },
      "keyboard-final-01": {
        "title": "Tangentbord – slutuppdrag",
        "description": "Kombinera tangentbordsfärdigheterna."
      },
      "windows-start-01": {
        "title": "Öppna Start",
        "description": "Öppna Start-menyn."
      },
      "windows-open-app-01": {
        "title": "Starta ett program",
        "description": "Öppna Kalkylator."
      },
      "windows-move-01": {
        "title": "Flytta ett fönster",
        "description": "Flytta Kalkylatorns fönster."
      },
      "windows-minimize-01": {
        "title": "Minimera",
        "description": "Minimera Kalkylator."
      },
      "windows-maximize-01": {
        "title": "Maximera",
        "description": "Maximera Kalkylator."
      },
      "windows-close-01": {
        "title": "Stäng ett program",
        "description": "Stäng Kalkylator."
      },
      "windows-context-01": {
        "title": "Snabbmenyn",
        "description": "Högerklicka på skrivbordet."
      },
      "windows-final-01": {
        "title": "Windows – slutuppdrag",
        "description": "Öppna Start, starta Kalkylator och hantera fönstret."
      },
      "files-rename-01": {
        "title": "Byt namn på en fil",
        "description": "Byt namn på Utkast.txt till Rapport.txt.",
        "fixtures": [
          {
            "name": "Utkast.txt",
            "content": "Övning"
          }
        ],
        "goal": {
          "payload": {
            "name": "Rapport.txt"
          }
        }
      },
      "files-copy-01": {
        "title": "Kopiera en fil",
        "description": "Kopiera Exempel.txt och klistra in kopian i Dokument.",
        "fixtures": [
          {
            "name": "Exempel.txt",
            "content": "Kopiera mig"
          }
        ]
      },
      "files-move-01": {
        "title": "Flytta en fil",
        "description": "Flytta Flytta mig.txt till Hämtade filer.",
        "fixtures": [
          {
            "name": "Flytta mig.txt",
            "content": "Flytta mig"
          }
        ]
      },
      "files-delete-01": {
        "title": "Ta bort och återställ",
        "description": "Ta bort en fil och återställ den.",
        "fixtures": [
          {
            "name": "Återställ mig.txt",
            "content": "Test"
          }
        ]
      },
      "files-saveas-01": {
        "title": "Spara som",
        "description": "Spara en ny textfil från Anteckningar."
      },
      "files-final-01": {
        "title": "Filer – slutuppdrag",
        "description": "Skapa, byt namn, flytta, ta bort och återställ.",
        "fixtures": [
          {
            "name": "Projekt.txt",
            "content": "Projekt"
          }
        ]
      },
      "internet-address-01": {
        "title": "Adressfältet",
        "description": "Skriv en adress i adressfältet och gå till sidan."
      },
      "internet-link-01": {
        "title": "Länkar",
        "description": "Öppna en länk."
      },
      "internet-tab-01": {
        "title": "Ny flik",
        "description": "Öppna en ny flik."
      },
      "internet-history-01": {
        "title": "Bakåt och framåt",
        "description": "Använd både Bakåt och Framåt."
      },
      "internet-download-01": {
        "title": "Ladda ned",
        "description": "Ladda ned guide.txt."
      },
      "internet-form-01": {
        "title": "Formulär",
        "description": "Fyll i och skicka kontaktformuläret."
      },
      "internet-zoom-01": {
        "title": "Zoom",
        "description": "Zooma in eller ut på sidan."
      },
      "internet-final-01": {
        "title": "Internet – slutuppdrag",
        "description": "Använd adressfältet, en länk, en ny flik, historiken och en nedladdning."
      },
      "mail-open-01": {
        "title": "Öppna ett mejl",
        "description": "Öppna ett meddelande i inkorgen."
      },
      "mail-reply-01": {
        "title": "Svara på ett mejl",
        "description": "Öppna ett mejl och svara på det."
      },
      "mail-new-01": {
        "title": "Nytt mejl",
        "description": "Skriv och skicka ett nytt meddelande."
      },
      "mail-attach-01": {
        "title": "Bifoga en fil",
        "description": "Bifoga plan.txt i ett nytt mejl.",
        "fixtures": [
          {
            "name": "plan.txt",
            "content": "Plan"
          }
        ]
      },
      "mail-download-01": {
        "title": "Ladda ned en bilaga",
        "description": "Ladda ned bilagan i Annas mejl."
      },
      "security-phishing-01": {
        "title": "Känn igen bluffmejl",
        "description": "Hitta bluffmejlet och rapportera det."
      },
      "mail-final-01": {
        "title": "E-post – slutuppdrag",
        "description": "Öppna, ladda ned bilagan, svara och skicka med en bilaga.",
        "fixtures": [
          {
            "name": "plan.txt",
            "content": "Plan"
          }
        ]
      },
      "windows-resize-01": {
        "title": "Ändra fönsterstorlek",
        "description": "Ändra storleken på Kalkylatorns fönster."
      },
      "windows-switch-01": {
        "title": "Växla mellan program",
        "description": "Byt till det andra öppna programmet i aktivitetsfältet."
      },
      "files-search-01": {
        "title": "Sök efter en fil",
        "description": "Sök efter Hitta mig.txt.",
        "fixtures": [
          {
            "name": "Hitta mig.txt",
            "content": "Här är jag"
          }
        ],
        "goal": {
          "payload": {
            "queryNormalized": "hitta"
          }
        }
      },
      "internet-bookmark-01": {
        "title": "Bokmärke",
        "description": "Bokmärk en sida."
      },
      "internet-cookie-01": {
        "title": "Cookies",
        "description": "Hantera cookie-rutan."
      },
      "internet-upload-01": {
        "title": "Ladda upp en fil",
        "description": "Välj en fil i kontaktformuläret.",
        "fixtures": [
          {
            "name": "profil.txt",
            "content": "Profil"
          }
        ]
      },
      "mail-forward-01": {
        "title": "Vidarebefordra ett mejl",
        "description": "Vidarebefordra ett meddelande och skicka det."
      },
      "windows-search-01": {
        "title": "Sök i Start",
        "description": "Sök efter Kalkylator i Start-menyn.",
        "goal": {
          "payload": {
            "queryNormalized": "kalkylator"
          }
        }
      },
      "files-drag-01": {
        "title": "Dra en fil till en mapp",
        "description": "Dra Dra mig.txt till Hämtade filer.",
        "fixtures": [
          {
            "name": "Dra mig.txt",
            "content": "Dra mig"
          }
        ]
      },
      "internet-refresh-01": {
        "title": "Läs in igen",
        "description": "Läs in den aktuella sidan igen."
      },
      "internet-close-tab-01": {
        "title": "Stäng en flik",
        "description": "Öppna och stäng en extra flik."
      },
      "windows-desktop-open-01": {
        "title": "Öppna en ikon på skrivbordet",
        "description": "Dubbelklicka på Dokument."
      },
      "internet-search-01": {
        "title": "Sök på webben",
        "description": "Använd sökrutan på startsidan."
      },
      "final-independent-01": {
        "title": "Självständighetsprov",
        "description": "Kombinera webbläsaren, filer och e-post.",
        "goal": {
          "goals": [
            {
              "payload": {
                "name": "guide.txt"
              }
            },
            {
              "payload": {
                "name": "guide-klar.txt"
              }
            },
            {
              "payload": {
                "name": "guide-klar.txt"
              }
            },
            {
              "payload": {
                "attachmentName": "guide-klar.txt"
              }
            }
          ]
        }
      },
      "everyday-copy-paste-01": {
        "title": "Kopiera text mellan program",
        "description": "Kopiera telefonraden från webbläsaren och klistra in den i Anteckningar."
      },
      "everyday-undo-redo-01": {
        "title": "Ångra och gör om",
        "description": "Skriv i Anteckningar och använd Ctrl+Z och Ctrl+Y."
      },
      "everyday-save-location-01": {
        "title": "Hitta nedladdningen",
        "description": "Ladda ned guide.txt i webbläsaren och hitta filen i Hämtade filer.",
        "goal": {
          "goals": [
            {
              "payload": {
                "name": "guide.txt"
              }
            },
            {}
          ]
        }
      },
      "everyday-pdf-01": {
        "title": "PDF i vardagen",
        "description": "Öppna faktura.pdf, zooma och spara en kopia.",
        "fixtures": [
          {
            "name": "faktura.pdf",
            "content": ""
          }
        ],
        "goal": {
          "goals": [
            {
              "nodeName": "faktura.pdf"
            },
            {},
            {
              "payload": {
                "name": "faktura-kopia.pdf"
              }
            }
          ]
        }
      },
      "everyday-screenshot-01": {
        "title": "Ta en skärmbild",
        "description": "Ta en skärmbild med Skärmklippverktyget och spara den i Bilder."
      },
      "everyday-zip-01": {
        "title": "Packa upp en ZIP-fil",
        "description": "Extrahera Bilder.zip via Utforskarens snabbmeny.",
        "fixtures": [
          {
            "name": "Bilder.zip",
            "content": ""
          }
        ],
        "goal": {
          "payload": {
            "sourceName": "Bilder.zip"
          }
        }
      },
      "everyday-usb-01": {
        "title": "USB-minne",
        "description": "Kopiera rapport.pdf från USB-minnet till Dokument och mata ut minnet säkert."
      },
      "everyday-wifi-01": {
        "title": "Anslut till Wi‑Fi",
        "description": "Anslut till HemmaNet i Inställningar.",
        "goal": {
          "payload": {
            "network": "HemmaNet"
          }
        }
      },
      "everyday-bluetooth-01": {
        "title": "Bluetooth",
        "description": "Lägg till ett headset i Inställningar.",
        "goal": {
          "payload": {
            "device": "Headset"
          }
        }
      },
      "everyday-audio-camera-01": {
        "title": "Ljud, mikrofon och kamera",
        "description": "Ställ in volym, mikrofon och kamera i Inställningar."
      },
      "everyday-install-01": {
        "title": "Installera och avinstallera",
        "description": "Installera Övningsprogram från en .exe-fil och avinstallera det i Inställningar.",
        "fixtures": [
          {
            "name": "Övningsprogram-Setup.exe",
            "content": ""
          }
        ]
      },
      "everyday-print-pdf-01": {
        "title": "Skriv ut till PDF",
        "description": "Skriv ut fakturan med Microsoft Print to PDF och spara filen."
      },
      "everyday-cloud-01": {
        "title": "Molnlagring",
        "description": "Flytta rapport.docx från Dokument till OneDrive.",
        "fixtures": [
          {
            "name": "rapport.docx",
            "content": "Övningsrapport"
          }
        ]
      },
      "everyday-dialog-01": {
        "title": "Dialogrutor",
        "description": "Skapa osparade ändringar i Anteckningar och svara på frågan när du stänger."
      },
      "everyday-error-01": {
        "title": "Felmeddelanden",
        "description": "Öppna rapport.pdf i Rapportvisaren, läs felet och välj det säkra alternativet."
      },
      "everyday-restart-01": {
        "title": "Starta om och uppdatera",
        "description": "Installera den väntande uppdateringen via Windows Update."
      },
      "everyday-recovery-01": {
        "title": "Programmet svarar inte",
        "description": "Vänta först, stäng sedan programmet och starta det igen."
      },
      "everyday-pin-taskbar-01": {
        "title": "Fäst ett program",
        "description": "Fäst appen Webbläsare i aktivitetsfältet via Start-menyn."
      },
      "everyday-snap-01": {
        "title": "Fönster sida vid sida",
        "description": "Lägg webbläsaren till vänster och Anteckningar till höger genom att dra fönstren till skärmkanterna."
      },
      "everyday-link-actions-01": {
        "title": "Länkens snabbmeny",
        "description": "Kopiera en länkadress och öppna en länk i en ny flik."
      }
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
