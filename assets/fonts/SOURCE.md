# Cooper Hewitt – typsnittskälla

Datorskolans webbplats använder **Cooper Hewitt**, ritat av Chester Jenkins för Cooper Hewitt, Smithsonian Design Museum.

## Filer i den här mappen

| Fil | Källa i det officiella paketet | Ändring | SHA-256 |
|---|---|---|---|
| `CooperHewitt-Book.woff` (400) | `CooperHewitt-WebFonts-public/CooperHewitt-Book.woff` | ingen | `3bcf6f17d332714cf8d8ab79601b84ec177351cc920cb5af236506853b96836b` |
| `CooperHewitt-Medium.woff` (500) | `CooperHewitt-WebFonts-public/CooperHewitt-Medium.woff` | ingen | `e5fcd47740334669e7dcb22ffafbd2a422e2325dd5f3a4d9ad0562fe28b948e8` |
| `CooperHewitt-Semibold.woff` (600) | `CooperHewitt-WebFonts-public/CooperHewitt-Semibold.woff` | ingen | `f4f69e0fe16a962370bebdc294d508bb95c0f95f7f78d144561c0ad05f75ba03` |
| `CooperHewitt-Bold.woff` (700) | `CooperHewitt-WebFonts-public/CooperHewitt-Bold.woff` | ingen | `e145444bda1a0bf3cfb4f0047cbd367c2d1dad7b0e46dffa5fbcd8a4433f2943` |
| `CooperHewitt-OFL.txt` | `-CooperHewitt-OFL-201406.txt` | bytt filnamn | identisk med `files/-CooperHewitt-OFL-201406.txt` i github.com/cooperhewitt/cooperhewitt-typeface |
| `CooperHewitt-FontLog.txt` | `-CooperHewitt-FontLog.txt` | bytt filnamn | |
| `OFL-FAQ.txt` | `-OFL-FAQ.txt` | bytt filnamn | |

- Nedladdat 2026-10-10 från museets officiella sida
  https://www.cooperhewitt.org/open-source-at-cooper-hewitt/cooper-hewitt-the-typeface-by-chester-jenkins/
  (länken "Web font", `https://www.cooperhewitt.org/wp-content/uploads/fonts/CooperHewitt-WebFonts-public.zip`).
- Licens: **SIL Open Font License 1.1**, "Copyright (c) 2014, Cooper Hewitt Smithsonian Design Museum (cooperhewitt.org), with Reserved Font Name Cooper Hewitt."

## Varför just de här filerna

- Licensen har ett **reserverat typsnittsnamn** ("Cooper Hewitt"). En ändrad version får inte använda namnet (OFL §3). Därför används upphovsrättsinnehavarens egna, oförändrade webbfonter. Vi konverterar, delmängdar eller optimerar dem inte (OFL-FAQ 2.2, 2.5, 2.6).
- De Windows-anpassade TTF-filerna från `tom10271/cooper-hewitt-fixed-for-windows` (som museets sida också länkar till) är en ändrad version som fortfarande heter "Cooper Hewitt". De distribueras **inte** härifrån.
- Fontfilernas metadata säger "For use only as a web font. Not to be decompiled or converted". Det stämmer med hur vi använder dem: de serveras oförändrade via `@font-face` i `styles/site.css`.
- Filerna serveras från samma GitHub Pages-webbplats. Webbplatsen gör inga anrop till externa typsnittstjänster.
