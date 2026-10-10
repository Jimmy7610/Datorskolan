# 41 – Undervisningsmodellen: läge, hjälp och förklaring

Infört 2026-10-10. Ersätter de gamla lägena Vuxen | Barn | Snabb. De blandade ihop tre olika saker: vem eleven är, hur mycket hjälp eleven behöver och hur mycket som ska förklaras.

## Tre oberoende inställningar (plus språk)

| Inställning | Värden | Styr | Styr inte |
|---|---|---|---|
| **Läge** (`audience`) | Vuxen `adult` · Barn `child` | Ton, ordval, jämförelser och exempel | Svårighetsgraden. Barn gör samma övningar. |
| **Hjälp** (`support`) | Guidad `guided` · Normal `normal` · Självständig `independent` | Hur övningen instrueras, var ledtrådarna börjar och när den gula ramen visas | Målet. Alla nivåer lär ut exakt samma sak. |
| **Förklaring** (`depth`) | Utförlig `detailed` · Normal `normal` · Kort `short` | Introduktionen, "Varför?" och panelen "Mer om det här" | Övningen. Den blir aldrig ofullständig. |
| **Språk** | SV · EN | All text | Ingen av inställningarna ovan |

Alla 2 × 3 × 3 × 2 = 36 kombinationer fungerar. `tests/pedagogy-smoke.js` renderar varje steg i alla 120 lektioner för alla 18 profiler på båda språken (11 844 renderingar) och kontrollerar att ingen text är tom.

**Ny elev:** Vuxen, Guidad, Normal. Kursen riktar sig till nybörjare.

**Gamla elever:** sparade framsteg migreras automatiskt (`src/progress-store.js`, version 1 → 2). Lektioner, färdigheter och logg behålls oförändrade.

| Gammalt läge | Läge | Hjälp | Förklaring |
|---|---|---|---|
| Vuxen (`standard`) | Vuxen | Normal | Normal |
| Barn (`child`) | Barn | Normal | Normal |
| Snabb (`fast`) | Vuxen | Normal | **Kort** |

"Snabb" var aldrig en målgrupp. Det betydde "förklara mindre", och det heter nu Förklaring: Kort. Tidigare hoppade Snabb direkt till övningen. Det gör det inte längre, eftersom målet med lektionen ska vara detsamma. Den som redan behärskar alla färdigheter i en lektion hoppar fortfarande direkt till övningen.

Inställningarna sparas i `localStorage` tillsammans med framstegen. De ändras inte vid språkbyte och finns kvar efter omladdning. Pågående lektion fortsätter på samma steg (`LessonEngine.resume`). Vid **Börja om** raderas framstegen, men inställningarna finns kvar, precis som språket.

## Textvarianter i stället för kopior

En lektion finns i **en** version per språk i `locales/<språk>/course.js`. Varje textfält kan vara en vanlig sträng (gemensam för alla) eller ett objekt med varianter:

```js
"text": {
  "default": "Öppna Start-menyn genom att klicka på Start-knappen i aktivitetsfältet.",   // Normal
  "guided": "Titta längst ned på skärmen. Där finns en rad med ikoner som heter aktivitetsfältet …",
  "independent": "Öppna Start-menyn.",                                                    // bara målet
  "child.guided": "Titta på raden längst ned på skärmen. Hitta knappen med fyra små blå rutor …"
}
```

`DatorskolanPedagogy.resolve(värde, profil)` (i `src/pedagogy.js`) väljer den mest specifika varianten som finns. Annars faller den tillbaka steg för steg till `default`.

- Nycklar kombineras i ordningen läge.hjälp.förklaring, till exempel `child.guided` eller `guided.short`.
- Är två varianter lika specifika vinner förklaringen över hjälpen, och hjälpen över läget. En kort förklaring förblir alltså kort även för ett barn.
- En variant skrivs bara där undervisningen verkligen skiljer sig. Allt annat delas.

Samma princip gäller för gränssnittstexter. `learn.feedback.tryAgain` har varianterna `.child`, `.guided`, `.child.guided` och `.independent`, och väljs med `Pedagogy.variantKey()`.

### Vad varje lektion innehåller

| Del | Fält | Varianter |
|---|---|---|
| Mål | övningens `text.independent` | – |
| Begrepp (introduktion) | första instruktionsstegets `text` | `default`, `short`, `child` |
| Instruktioner | övningens `text` | `default` (Normal), `guided`, `independent`, `child.guided` |
| Förklaring ("Varför?") | `detail.use` (visas i introduktionen vid Utförlig) | – |
| Hjälprutan "Mer om det här" | `detail.*` | Förklaringsnivån bestämmer vilka fält som visas |
| Ledtrådar | `nudge` + `hints[0..4]` | Ordningen styrs av hjälpnivån |
| Avslut | sista stegets `text` | – |

Det blir cirka 1 200 skrivna varianter för 120 lektioner på två språk, i stället för 36 kopior av varje lektion.

### Hur Guidad, Normal och Självständig skiljer sig

- **Guidad** säger var eleven ska titta, vad som ska klickas, hur saken ser ut och vad den heter. Ett moment åt gången. Den gula ramen visar målet från början, och återkopplingen pekar på ramen.
- **Normal** är en instruktion i en mening som säger både vad och hur.
- **Självständig** ger bara målet. Ledtrådarna finns kvar, men börjar allmänt.

### Hur Utförlig, Normal och Kort skiljer sig

- **Utförlig** visar introduktionen och sedan en "Varför?"-rad (`detail.use`). Panelen "Mer om det här" är öppen och visar alla fält, även vardagsexempel och vanliga misstag.
- **Normal** visar introduktionen. Panelen är stängd och visar vad, känn igen, användning, exempel och steg.
- **Kort** visar introduktionen i en mening (`short`). Panelen är stängd och visar bara vad och känn igen.

## Ledtrådsstegen

| Steg | Innehåll | Självständig | Normal | Guidad |
|---|---|---|---|---|
| 0 | `nudge` – allmän: "Fundera på var Windows samlar alla program." | 1:a ledtråden | – | – |
| 1 | Var på skärmen | 2:a | 1:a | – |
| 2 | Vilken kontroll | 3:e | 2:a | – |
| 3 | Hur | 4:e | 3:e | 1:a |
| 4 | Titta – den gula ramen visas | 5:e | 4:e | (ramen syns redan) |
| 5 | Hela lösningen | 6:e | 5:e | 2:a |

## Adaptiv hjälp

Om eleven verkar ha kört fast på en övning erbjuder Datorskolan tydligare hjälp: "Vill du ha tydligare hjälp med den här övningen?". Det sker vid något av följande:

- två misslyckade Kontrollera,
- tre öppnade ledtrådar,
- 90 sekunder på samma övning.

- **Ja** ger guidad hjälp för just den övningen, med den gula ramen. Den sparade inställningen ändras aldrig.
- **Nej tack** döljer erbjudandet för den övningen.
- Guidade elever får aldrig erbjudandet, eftersom de redan har den tydligaste hjälpen.

Gränserna finns i `Pedagogy.STUCK`. Felklick i själva övningsdatorn räknas inte än, eftersom det inte går att avgöra robust vad som är ett "fel" klick i en fri övning. Det är grunden för en senare utbyggnad.

## Gränssnittet

Panelen visar en rad: **Så lär du dig – Läge Vuxen · Hjälp Guidad · Förklaring Normal – Ändra**. Ändra öppnar tre grupper med radioknappar, och varje val har en kort förklaring på svenska och engelska. Samma ruta finns under lektionen, och en ändring syns direkt i steget.
