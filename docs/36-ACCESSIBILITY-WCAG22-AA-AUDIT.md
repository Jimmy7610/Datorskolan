# Tillgänglighetsrevision – Datorskolan

Status: **TEKNISKT FÖRBÄTTRAD – manuell verifiering återstår**

Den här revisionen använder **WCAG 2.2 AA** som projektets tekniska mål, även där svensk lagstiftning i vissa sammanhang formellt hänvisar till WCAG 2.1 via EN 301 549.

## Svensk rättslig kontext

Vilka rättsliga krav som faktiskt gäller för Datorskolan beror på hur tjänsten erbjuds och av vilken aktör.

- Offentliga aktörers webbplatser och appar omfattas av DOS-lagen och EN 301 549. Digg beskriver WCAG 2.1 AA som en central del av den tekniska kravbasen.
- Sedan 28 juni 2025 gäller lagen om vissa produkters och tjänsters tillgänglighet för vissa konsumenttjänster, bland annat e-handelstjänster. PTS ansvarar för tillsyn inom bland annat e-handel.
- Den här filen är en teknisk tillgänglighetsrevision, inte ett juridiskt utlåtande om exakt tillämpningsområde för Datorskolan.

## Projektmål

Datorskolan ska uppfylla minst WCAG 2.2 AA där kriterierna är tillämpliga på webbgränssnittet.

Simulatorns skrivbord är ett spatialt träningsgränssnitt. Där 2D-layout är nödvändig för att förstå Windows-miljön ska hela ytan fortfarande vara nåbar vid zoom och tangentbordsanvändning, medan kursinstruktioner och övrigt innehåll ska reflowa normalt.

## Genomförda ändringar

### Text och zoom

- [x] Webbläsarens textskalning blockeras inte.
- [x] Kursinstruktioner, feedback och hjälptexter har höjts till cirka 16 px.
- [x] Sekundär funktionell text hålls på minst cirka 14 px.
- [x] Landingens meningsbärande text har fått tydliga minimistorlekar.
- [x] Miniatyrtext i dekorativ FakeWin-preview är borttagen från tillgänglighetsträdet.
- [x] Landing släpper fullskärmslåset vid smal/zoomad viewport och tillåter vertikal reflow.
- [x] FakeWin kan scrollas som spatial yta vid kraftig zoom i stället för att klippas bort.

### Kontrast

- [x] Primär text på mörk landing har hög kontrast.
- [x] Sekundära landingfärger har granskats mot mörk bakgrund.
- [x] Statusradens lilla text har höjts till färg som klarar 4,5:1 mot landingbakgrunden.
- [x] Fokusindikator använder tydlig gul kontur med mörk separationsring.

### Tangentbord och fokus

- [x] Global `:focus-visible` är tydlig.
- [x] Landingens tabbar kan styras med Tab samt vänster/högerpil, Home och End.
- [x] Tabbar har `role=tab`, `aria-controls`, `aria-selected` och kopplade tabpaneler.
- [x] Skip-link finns.
- [x] Skip-link byter mål mellan landing och simulator.
- [x] Reset-dialog flyttar fokus in i dialogen.
- [x] Reset-dialog fångar Tab/Shift+Tab.
- [x] Escape stänger reset-dialogen.
- [x] Fokus återgår till kontrollen som öppnade dialogen.
- [x] Bakgrundsinnehåll görs `inert` medan modalen är öppen.

### Klickytor

- [x] Global miniminivå 24 × 24 CSS px för vanliga formulärkontroller.
- [x] Viktiga kursknappar och landing-CTA:er använder minst cirka 40–44 px höjd.
- [x] Fönsterkontroller i FakeWin är större än 24 × 24 px.

### Formulär och namn

- [x] Start-sökning har explicit tillgängligt namn.
- [x] Utforskarens sökning har explicit tillgängligt namn.
- [x] Inställningars sökning har explicit tillgängligt namn.
- [x] Wi-Fi-lösenordsfältet har explicit namn och synlig hjälptext.
- [x] Simulerad webbsökning har explicit namn.
- [x] Chrome-sökfält har explicit namn.
- [x] Fönsterknappar Minimera, Maximera/Återställ och Stäng har aria-labels.

### Dynamisk feedback

- [x] Kursfeedback använder `role=status` och `aria-live=polite`.
- [x] Feedback meddelas utan att användaren måste flytta fokus.

### Rörelse

- [x] `prefers-reduced-motion: reduce` stoppar eller minimerar animationer och transitions.

## WCAG 2.2 AA – fokusområden

Projektet verifierar särskilt:

- 1.3.1 Information and Relationships
- 1.4.3 Contrast (Minimum)
- 1.4.4 Resize Text
- 1.4.10 Reflow
- 1.4.11 Non-text Contrast
- 1.4.12 Text Spacing
- 2.1.1 Keyboard
- 2.4.3 Focus Order
- 2.4.7 Focus Visible
- 2.4.11 Focus Not Obscured (Minimum)
- 2.5.7 Dragging Movements
- 2.5.8 Target Size (Minimum)
- 3.2.x Predictable
- 3.3.1 Error Identification
- 3.3.2 Labels or Instructions
- 4.1.2 Name, Role, Value
- 4.1.3 Status Messages

## Viktigt om dragövningar

WCAG 2.2 AA 2.5.7 kräver ett alternativ till dragning när dragning inte är essentiell.

Flera av Datorskolans lektioner lär uttryckligen ut dragning som själva färdigheten, till exempel:
- dra fönster,
- dra och släpp,
- Snap genom att dra till skärmkant.

Där dragningen **är utbildningsmålet** är den spatiala handlingen essentiell för momentets mening. För andra dragfunktioner ska alternativ med enkel pekaraktivering läggas till om funktionen kan utföras utan att undervisningsmålet går förlorat.

## Manuell verifiering som återstår

Följande ska testas manuellt innan projektet kallas verifierat WCAG 2.2 AA:

- [ ] Chrome/Edge 200 % zoom på 1920×1080.
- [ ] 400 % zoom / cirka 320 CSS px bred viewport.
- [ ] Endast tangentbord genom hela landingpagen.
- [ ] Endast tangentbord genom kursväljare och en komplett lektion.
- [ ] NVDA + Chrome eller Edge på Windows.
- [ ] Windows högkontrast/forced-colors.
- [ ] Anpassad text spacing enligt WCAG 1.4.12.
- [ ] Alla relevanta färgkombinationer med kontrastmätare.
- [ ] Fokus får inte döljas bakom paneler, taskbar eller dialoger.
- [ ] Alla felmeddelanden ska kunna förstås utan färg.
- [ ] Alla interaktiva kontroller ska ha korrekt namn, roll och värde.

## Projektpolicy

Vi skriver inte **"WCAG-certifierad"** eller **"lagligt godkänd"** enbart för att automatiska tester passerar.

Korrekt status tills manuell testning är slutförd:

> Datorskolan är utvecklad med WCAG 2.2 AA som tekniskt tillgänglighetsmål och har automatiserade tillgänglighetsregressioner. Manuell verifiering återstår.
