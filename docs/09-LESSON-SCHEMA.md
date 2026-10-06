# Lektioner – schema

## Mål

En lektion ska kunna beskrivas som data istället för hårdkodning.

## Exempel

```json
{
  "id": "mouse-001-move",
  "moduleId": "mouse",
  "title": "Flytta musen",
  "skills": ["mouse.move"],
  "audience": ["child", "standard", "fast"],
  "steps": [
    {"type": "instruction", "text": "Flytta musen lite."},
    {"type": "exercise", "exercise": "pointer-move", "success": {"distancePx": 80}},
    {"type": "exercise", "exercise": "move-to-target", "target": {"shape": "circle", "size": "large"}}
  ]
}
```

## Tillåtna stegtyper

- `instruction`
- `demonstration`
- `exercise`
- `quiz`
- `simulation`
- `reflection`
- `checkpoint`
- `completion`

## Exercise-validator

Varje övning ska beskriva:
- vad som räknas som success,
- vad som räknas som fel,
- om timeout används,
- när hjälp erbjuds.

## Varianttexter

Samma lektion kan ha childText, standardText och fastText. Färdigheten och valideringen ska normalt vara samma.


## Nybörjardetaljer

Produktionslektioner ska även ha ett `detail`-objekt:

```json
{
  "detail": {
    "what": "Vad saken är.",
    "recognize": "Hur användaren känner igen den på skärmen.",
    "use": "Vad den används till.",
    "example": "Ett konkret exempel.",
    "steps": ["Valfria konkreta steg."]
  }
}
```

Fälten `what`, `recognize`, `use` och `example` är obligatoriska i publicerat kursinnehåll.
