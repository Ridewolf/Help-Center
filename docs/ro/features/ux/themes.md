# Teme

Dashboard-ul are trei setări independente de aspect:

- **Mod** — luminos, întunecat sau urmează sistemul de operare
- **Culoare** — culoarea de accent folosită pentru butoane, link-uri, badge-uri și stări active
- **Stil hartă** — tile-urile de bază ale hărții (alegere separată pentru modul luminos și întunecat)

Toate trei se află în **panoul de profil** jos — click pe avatar în bara de sus pentru a-l deschide.

## Mod (luminos / întunecat / sistem)

Comută între trei moduri:

| Iconiță    | Mod       | Comportament                                                     |
| ---------- | --------- | ---------------------------------------------------------------- |
| 🖥️ Monitor | Sistem    | Urmează preferința OS-ului; comută automat când OS-ul se schimbă |
| ☀️ Soare   | Luminos   | Mereu luminos, ignoră OS-ul                                      |
| 🌙 Lună    | Întunecat | Mereu întunecat, ignoră OS-ul                                    |

Modul **Sistem** este implicit. Dacă schimbi tema OS-ului (ex. macOS pornește dark mode la apus), dashboard-ul urmează imediat — fără reload.

## Culoare

Culoarea de accent determină butoanele, link-urile, badge-urile, inelele de focus și elementul activ din sidebar. Sunt disponibile 12 palete:

| Culoare    | Previzualizare |
| ---------- | -------------- |
| Negru      | ⚫             |
| Roșu       | 🔴             |
| Rose       | 🌹             |
| Roz        | 🩷             |
| Portocaliu | 🟠             |
| Galben     | 🟡             |
| Verde      | 🟢             |
| Turcoaz    | 🟢             |
| Cyan       | 🔵             |
| Albastru   | 🔵             |
| Indigo     | 🟣             |
| Mov        | 🟣             |

Alege culoarea care se citește cel mai ușor pe modul ales (unele culori arată mai bine pe luminos, altele pe întunecat).

## Stil hartă

Paginile cu hărți (Live Map, detaliu vehicul, editor de zone, traseu cursă etc.) folosesc un stil de hartă de bază pe care îl poți alege independent. Dashboard-ul păstrează **două preferințe separate** de stil — una pentru modul luminos, una pentru modul întunecat — astfel încât harta să se potrivească cu restul UI-ului când comuți între moduri.

- Comutarea modului (luminos ↔ întunecat) schimbă automat stilul hărții la cel ales pentru acel mod
- Stilurile disponibile depind de furnizorul hărții (MapTiler sau alternativă); de obicei: Streets, Satellite, Light, Dark, Outdoors

## Unde sunt stocate preferințele

Toate cele trei setări sunt stocate în **localStorage** browser-ului, sub aceste chei:

| Setare                 | Cheie de stocare      |
| ---------------------- | --------------------- |
| Mod                    | `app-dark-mode`       |
| Culoare                | `app-theme`           |
| Stil hartă (luminos)   | `app-map-style-light` |
| Stil hartă (întunecat) | `app-map-style-dark`  |

Asta înseamnă:

- **Per dispozitiv, per browser** — alt dispozitiv = alte preferințe
- **Nu se sincronizează** cu contul — colegii cu același cont văd propria temă
- **Se șterg** la "Șterge datele de navigare" pentru acest site
- **Ferestrele incognito** pornesc cu valorile implicite

## Sfaturi

- **Începe cu modul Sistem** — lasă programul OS-ului să decidă; comută pe Luminos/Întunecat doar dacă ai o preferință diferită de OS
- **Potrivește stilul hărții cu modul** — Satellite e greu de citit în modul întunecat; alege un stil "Dark" sau "Streets Dark"
- **Culoarea afectează contrastul** — Galben sau Cyan pe fundal luminos sunt greu de citit; dacă butoanele par "subțiri", încearcă un accent mai închis (Roșu, Albastru, Indigo)
- **Tema nu e o permisiune** — fiecare operator alege propria; colegii nu vor vedea schimbările tale
