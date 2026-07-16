# Quick Guides

Pagina Quick Guides (`/settings/quick-guides`) ține **ghidurile pas-cu-pas** pe care rider mobile app Ridewolf le arată pentru lucruri ca "How to rent a scooter" sau "Safety checklist". Fiecare ghid este o listă ordonată de items cu iconiță, culoare, titlu și text — publicat per audiență (rider app, client app, mechanic, admin, general).

Împreună cu [FAQ Sets](faq-sets.md) (blocuri Q/A) și [Icon Sets](icon-sets.md) (grafică hartă), Quick Guides este al treilea pilon al stratului de conținut. Editezi un ghid aici, rider app preia modificarea la următorul fetch — nu este nevoie de release.

Permisiune necesară: **Quick Guides** (check with admin).

## Unde apare la rider

În rider mobile app, Quick Guides alimentează tutorialele de onboarding și ecranele de tips în timpul cursei. Fiecare ghid cu tip **rider-app** și status `active` este încărcat; items marcate `visible` apar în `order`, cu `icon` și `color` configurate în stânga și `body` extins dacă `expandByDefault` este true.

Ghidurile cu tipurile `client-app`, `mechanic`, `admin`, `general` sunt cablate la suprafețele respective.

## Filtre

| Filtru | Tip          | Note                                                                      |
| ------ | ------------ | ------------------------------------------------------------------------- |
| Search | Text         | Câmp în antet — caută în title / description / slug                       |
| Tags   | Multi-select | Filtru după etichete (onboarding, basics, technical, payments, …)         |
| Status | Dropdown     | `Active` / `Draft` / `Archived` (sau `All`)                               |
| Type   | Dropdown     | `Client app` / `Rider app` / `Mechanic` / `Admin` / `General` (sau `All`) |

**Clear all** resetează toate filtrele.

## Coloane

| Coloană     | Conținut                                                               |
| ----------- | ---------------------------------------------------------------------- |
| **Set**     | Iconiță book + title; linia secundară arată description sau slug       |
| **Type**    | Pilula audienței — Client app / Rider app / Mechanic / Admin / General |
| **Tags**    | Primele 3 chips de etichete, cu overflow `+N`                          |
| **Items**   | Numărul de pași din ghid                                               |
| **Status**  | `Active` (verde) / `Draft` (gri) / `Archived` (estompat)               |
| **Updated** | Dată relativă; hover pentru timestamp complet + autor                  |

Click pe rând deschide dialogul **View** (preview al fiecărui pas). Click pe meniul cu trei puncte — acțiuni.

## Acțiuni pe rând

| Acțiune          | Ce face                                                               |
| ---------------- | --------------------------------------------------------------------- |
| **View details** | Preview cu fiecare item randat așa cum îl vede riderul                |
| **Edit**         | Deschide formularul (la fel ca Create, precompletat)                  |
| **Duplicate**    | Clonează ghidul cu sufix `-copy` la slug și status resetat la `Draft` |
| **Export**       | Descarcă ca ZIP sau JSON                                              |
| **Archive**      | Mută în `Archived` — ascuns de rider app, păstrat pentru istoric      |
| **Delete**       | Elimină permanent                                                     |

Toolbarul de sus oferă **Import** (ZIP / JSON) și **Export** (ZIP / JSON) în masă.

## Formular Create / Edit

Formularul are aceiași selectori de nivel înalt ca FAQ Sets, plus un editor mai bogat per item:

- **Type** — obligatoriu, definește audiența
- **Status** — `Draft` / `Active` / `Archived`
- **Tags** — multi-select
- **Title / Description** — title obligatoriu, description opțional
- **Items** — lista de pași. Fiecare item are:
  - **Title** — titlul pasului
  - **Body** — conținutul pasului (text lung, simplu)
  - **Icon** — nume de iconiță Lucide (ex. `MapPin`, `QrCode`, `Shield`)
  - **Color** — culoare hex cu preseturi brand (Primary `#6366f1`, Success `#22c55e`, Warning `#eab308`, Danger `#ef4444`, etc.)
  - **Expand by default** — dacă e activ, itemul se deschide expandat în app
  - **Visible** — ascunde un item fără să-l ștergi
  - **Order** — drag pentru reordonare

Slug-ul este derivat din title și folosit în URL-ul API.

## Workflow-uri tipice

- **Scrie un ghid nou de onboarding** — `+ Create guide` → Type = Rider app, Status = Draft → adaugă 5–7 items ordonate cu iconițe și culori → preview prin View details → comută în Active → apare în rider app la următorul fetch
- **Fă un pas opțional / ascunde-l** — Edit → dezactivează `Visible` pe item → save (itemul rămâne în date, doar nu se randează)
- **A/B-testează un walkthrough nou** — Duplicate ghidul activ → editează copia → arhivează cel vechi și activează-l pe cel nou în același pas
- **Bulk import al unui draft de la designer** — _Import_ sus-dreapta → ZIP/JSON → confirmă structura parsată → importă ca Draft → review și Activate

## Sfaturi

- **Iconițele sunt nume Lucide** — alege din [lucide.dev](https://lucide.dev) ca să se randeze în app; numele greșite cad pe un placeholder
- **Colorează pașii pentru scanare** — riderii scanează ghidurile. Folosește Warning pentru "atenție" și Success pentru "gata"
- **`expandByDefault` de obicei doar pentru primul pas** — deschiderea tuturor items implicit anulează rostul unui acordeon. Lasă restul pliate
- **Body e proză simplă, nu markdown** — păstrează paragrafele scurte; tipografia o stabilește mobile app-ul
- **Archive în loc de Delete** când retragi un ghid — îl poți reactiva sau duplica oricând mai târziu
- **Folosește tags consistent cu [FAQ Sets](faq-sets.md)** — `onboarding`, `troubleshooting`, etc. sunt vocabular partajat în stratul de conținut
