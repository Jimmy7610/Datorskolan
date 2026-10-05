# Fas 2 – Lesson Engine Acceptance

Fas 2 är godkänd först när följande fungerar i den publicerade GitHub Pages-versionen.

## Learning UI

- [ ] 🎓-knappen finns i aktivitetsfältet.
- [ ] Klick på 🎓 öppnar Datorskolan-panelen.
- [ ] Panelen visar modulprogress.
- [ ] Panelen visar tillgängliga lektioner.
- [ ] En aktiv lektion hålls synlig under arbetet.
- [ ] Panelen visar aktuellt steg och antal steg.
- [ ] Progress bar uppdateras när användaren går vidare.

## Instruktioner och demonstrationer

- [ ] Instruction-steg visar tydlig rubrik och text.
- [ ] Demonstration-steg visar tydlig rubrik och text.
- [ ] Relevant simulatorområde markeras visuellt under demonstration.
- [ ] Tillbaka och Fortsätt fungerar.
- [ ] Fokusmarkering och text är läsbara.

## Exercises och validators

- [ ] Exercise-steg visar uppgiften.
- [ ] Kontrollera går inte vidare om uppgiften inte är klar.
- [ ] Användaren får begriplig feedback vid ofärdig uppgift.
- [ ] Scenario-validator känner av korrekt simulatorstate.
- [ ] Generisk event-validator finns i Lesson Engine.
- [ ] Rätt utförd uppgift ger success-feedback.
- [ ] Exercise success registreras exakt en gång när steget lämnas.

## Hjälptrappa

- [ ] Hjälp börjar på nivå 1.
- [ ] Varje klick ökar nivån till maximalt 5.
- [ ] Nivå 1 ger generell ledtråd.
- [ ] Nivå 2 ger riktning.
- [ ] Nivå 3 ger konkret instruktion.
- [ ] Nivå 4 ger visuell markering.
- [ ] Nivå 5 ger full steg-för-steg-hjälp.
- [ ] Använd hjälp registreras i progressdata.

## Feedback

- [ ] Try-again-feedback är neutral och begriplig.
- [ ] Success-feedback visas när uppgiften är klar.
- [ ] Lektionen avslutas med tydlig completion.
- [ ] Ingen negativ poäng eller skammande formulering används.

## Progress och localStorage

- [ ] Startad lektion får status in_progress.
- [ ] Slutförd lektion får status completed.
- [ ] Progress finns kvar efter omladdning.
- [ ] Skill attempts registreras.
- [ ] Skill successes registreras.
- [ ] Independent successes registreras när hintLevel = 0.
- [ ] hintLevelMax registreras.
- [ ] masteryScore räknas mellan 0 och 1.
- [ ] mastery-status kan gå från introduced/practicing till independent/mastered.
- [ ] Data använder versionerad localStorage-nyckel.

## Starter lessons

### Skapa en mapp
- [ ] Startar scenario files-create-folder-01.
- [ ] Instruktion → demonstration → exercise → checkpoint → completion fungerar.
- [ ] Mappen Semester godkänner exercise.

### Skriv och spara en textfil
- [ ] Startar scenario notepad-save-file-01.
- [ ] plan.txt med innehåll godkänner exercise.
- [ ] Completion registreras.

### Återställ från Papperskorgen
- [ ] Startar scenario recycle-restore-01.
- [ ] Övningsfil.txt finns i startläget.
- [ ] Radera + återställ godkänner exercise.
- [ ] Completion registreras.

## API

- [ ] window.__datorskolanSimulator.lessons finns.
- [ ] window.__datorskolanSimulator.progress finns.
- [ ] startLesson(id) fungerar.
- [ ] stopLesson() fungerar.
- [ ] progress.snapshot() fungerar.

## Regression

- [ ] Fake Windows v0.1 fungerar.
- [ ] VFS v0.2 fungerar.
- [ ] Core Apps v0.3 fungerar.
- [ ] Scenario Engine v0.4 fungerar.
- [ ] Rå Scenario Engine-panel visas inte ovanpå en aktiv lektion.
- [ ] Inga console errors under normal användning.
- [ ] GitHub Actions syntax-check är grön.
- [ ] Lesson Engine smoke test är grön.
