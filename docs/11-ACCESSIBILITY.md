# Tillgänglighet

## Mål

Projektet ska kunna användas av personer med:
- nedsatt syn,
- motoriska svårigheter,
- lässvårigheter,
- begränsad digital vana.

## Krav

- stöd för tangentbordsnavigering där pedagogiken tillåter,
- synlig focus state,
- tillräcklig kontrast,
- skalbar text,
- undvik endast färg som informationsbärare,
- tydliga aria-labels där relevant,
- reducerad animation,
- valbar ljudnivå,
- möjlighet att repetera instruktion.

## Viktig konflikt

Vissa lektioner tränar specifikt mus. Där kan full tangentbordsersättning motverka övningens syfte.

Lösning:
- simulatorn är tillgänglig generellt,
- specifika träningsmoment får kräva den färdighet som tränas.

## Läsnivå

Tidiga lektioner ska ha:
- korta meningar,
- vardagliga ord,
- en instruktion åt gången.


## Aktuell teknisk bas

Projektets tekniska mål är **WCAG 2.2 AA**.

Praktiska minimiregler:
- undervisande brödtext och instruktioner: cirka 16 px eller större,
- sekundär funktionell text: normalt minst cirka 14 px,
- text ska kunna förstoras till 200 % utan att funktion eller information försvinner,
- innehåll ska reflowa vid smal/zoomad viewport,
- vanlig text ska normalt nå minst 4,5:1 kontrast,
- interaktiva pekmål ska normalt vara minst 24 × 24 CSS px eller ha tillräcklig separation,
- tydlig tangentbordsfokus ska alltid finnas,
- alla funktioner ska kunna nås med tangentbord där handlingens natur inte gör en spatial interaktion essentiell,
- labels/instruktioner ska vara programmässigt kopplade till formulärkontroller,
- dynamisk kursfeedback ska kunna meddelas till hjälpmedel,
- `prefers-reduced-motion` ska respekteras.

Se även `36-ACCESSIBILITY-WCAG22-AA-AUDIT.md`.
