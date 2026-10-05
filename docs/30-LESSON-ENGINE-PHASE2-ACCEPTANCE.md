# Fas 2 – Lesson Engine Acceptance

Fas 2 är godkänd först när följande fungerar i den publicerade GitHub Pages-versionen.

## Learning UI

- [x] 🎓-knappen finns i aktivitetsfältet.
- [x] Klick på 🎓 öppnar Datorskolan-panelen.
- [x] Panelen visar modulprogress.
- [x] Panelen visar tillgängliga lektioner.
- [x] En aktiv lektion hålls synlig under arbetet.
- [x] Panelen visar aktuellt steg och antal steg.
- [x] Progress bar uppdateras när användaren går vidare.

## Instruktioner och demonstrationer

- [x] Instruction-steg visar tydlig rubrik och text.
- [x] Demonstration-steg visar tydlig rubrik och text.
- [x] Relevant simulatorområde markeras visuellt under demonstration.
- [x] Tillbaka och Fortsätt fungerar.
- [x] Fokusmarkering och text är läsbara.

## Exercises och validators

- [x] Exercise-steg visar uppgiften.
- [x] Kontrollera går inte vidare om uppgiften inte är klar.
- [x] Användaren får begriplig feedback vid ofärdig uppgift.
- [x] Scenario-validator känner av korrekt simulatorstate.
- [x] Generisk event-validator finns i Lesson Engine.
- [x] Rätt utförd uppgift ger success-feedback.
- [x] Exercise success registreras exakt en gång när steget lämnas.

## Hjälptrappa

- [x] Hjälp börjar på nivå 1.
- [x] Varje klick ökar nivån till maximalt 5.
- [x] Nivå 1 ger generell ledtråd.
- [x] Nivå 2 ger riktning.
- [x] Nivå 3 ger konkret instruktion.
- [x] Nivå 4 ger visuell markering.
- [x] Nivå 5 ger full steg-för-steg-hjälp.
- [x] Använd hjälp registreras i progressdata.

## Feedback

- [x] Try-again-feedback är neutral och begriplig.
- [x] Success-feedback visas när uppgiften är klar.
- [x] Lektionen avslutas med tydlig completion.
- [x] Ingen negativ poäng eller skammande formulering används.

## Progress och localStorage

- [x] Startad lektion får status in_progress.
- [x] Slutförd lektion får status completed.
- [x] Progress finns kvar efter omladdning.
- [x] Skill attempts registreras.
- [x] Skill successes registreras.
- [x] Independent successes registreras när hintLevel = 0.
- [x] hintLevelMax registreras.
- [x] masteryScore räknas mellan 0 och 1.
- [x] mastery-status kan gå från introduced/practicing till independent/mastered.
- [x] Data använder versionerad localStorage-nyckel.

## Starter lessons

### Skapa en mapp
- [x] Startar scenario files-create-folder-01.
- [x] Instruktion → demonstration → exercise → checkpoint → completion fungerar.
- [x] Mappen Semester godkänner exercise.

### Skriv och spara en textfil
- [x] Startar scenario notepad-save-file-01.
- [x] plan.txt med innehåll godkänner exercise.
- [x] Completion registreras.

### Återställ från Papperskorgen
- [x] Startar scenario recycle-restore-01.
- [x] Övningsfil.txt finns i startläget.
- [x] Radera + återställ godkänner exercise.
- [x] Completion registreras.

## API

- [x] window.__datorskolanSimulator.lessons finns.
- [x] window.__datorskolanSimulator.progress finns.
- [x] startLesson(id) fungerar.
- [x] stopLesson() fungerar.
- [x] progress.snapshot() fungerar.

## Regression

- [x] Fake Windows v0.1 fungerar.
- [x] VFS v0.2 fungerar.
- [x] Core Apps v0.3 fungerar.
- [x] Scenario Engine v0.4 fungerar.
- [x] Rå Scenario Engine-panel visas inte ovanpå en aktiv lektion.
- [x] Inga console errors under normal användning.
- [x] GitHub Actions syntax-check är grön.
- [x] Lesson Engine smoke test är grön.


## Resultat

Manuellt verifierad i den publicerade GitHub Pages-versionen av användaren.

Status: **GODKÄND**
