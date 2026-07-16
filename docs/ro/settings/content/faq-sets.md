# FAQ Sets

Pagina FAQ Sets (`/settings/faq-sets`) este **biblioteca de întrebări-răspunsuri** afișată în aplicațiile Ridewolf — în principal în rider mobile app, dar și pe suprafețele dedicate operatorilor. Fiecare set este un grup de înregistrări Q/A legat de o singură audiență (rider app, client app, mechanic, admin sau general).

Împreună cu [Quick Guides](quick-guides.md) și [Icon Sets](icon-sets.md), această pagină face parte din stratul de conținut — ce schimbă operatorul aici vede un rider pe telefon, fără un release de mobile app.

Permisiune necesară: **FAQ Sets** (check with admin).

## Unde apare la rider

În rider mobile app, FAQ Sets alimentează secțiunea Help / FAQ din aplicație. Fiecare set cu tipul **rider-app** și status `active` este încărcat; înregistrările marcate `visible` apar, ordonate prin câmpul `order`. Seturile cu tipurile `client-app`, `mechanic`, `admin`, `general` merg pe suprafețele respective.

Un set `draft` sau `archived` nu apare niciodată — util pentru pregătirea modificărilor înainte de publicare.

## Filtre

| Filtru | Tip          | Note                                                                      |
| ------ | ------------ | ------------------------------------------------------------------------- |
| Search | Text         | Câmp de căutare în antet — caută în title / description / slug            |
| Tags   | Multi-select | Filtru după etichete (onboarding, payments, technical, …)                 |
| Status | Dropdown     | `Active` / `Draft` / `Archived` (sau `All`)                               |
| Type   | Dropdown     | `Client app` / `Rider app` / `Mechanic` / `Admin` / `General` (sau `All`) |

**Clear all** resetează toate filtrele dintr-o singură dată.

## Coloane

| Coloană     | Conținut                                                               |
| ----------- | ---------------------------------------------------------------------- |
| **Set**     | Iconiță + title; linia secundară arată description sau slug            |
| **Type**    | Pilula audienței — Client app / Rider app / Mechanic / Admin / General |
| **Tags**    | Primele 3 chips de etichete, cu overflow `+N`                          |
| **Items**   | Numărul de câmpuri Q/A din set                                         |
| **Status**  | `Active` (verde) / `Draft` (gri) / `Archived` (estompat)               |
| **Updated** | Dată relativă; hover pentru timestamp complet + autor                  |

Click pe rând deschide dialogul **View** (preview). Click pe meniul cu trei puncte — acțiuni.

## Acțiuni pe rând

| Acțiune          | Ce face                                                              |
| ---------------- | -------------------------------------------------------------------- |
| **View details** | Preview read-only cu fiecare Q/A randat                              |
| **Edit**         | Deschide formularul (același ca Create, precompletat)                |
| **Duplicate**    | Clonează setul cu sufix `-copy` la slug și status resetat la `Draft` |
| **Export**       | Descarcă setul ca ZIP sau JSON                                       |
| **Archive**      | Mută în `Archived` — ascuns de rider app, păstrat pentru istoric     |
| **Delete**       | Elimină permanent (distructiv — doar când chiar nu mai este nevoie)  |

Toolbarul de sus oferă și **Import** (ZIP / JSON) și **Export** (ZIP / JSON al listei) în masă.

## Formular Create / Edit

Dialogul are trei selectori de nivel înalt și o listă de câmpuri Q/A:

- **Type** — obligatoriu, definește cine vede setul (Client app / Rider app / Mechanic / Admin / General)
- **Status** — `Draft` (implicit pentru noi) / `Active` / `Archived`
- **Tags** — multi-select, pentru filtrare și grupare
- **Title** — obligatoriu, numele setului
- **Description** — opțional, linia secundară din listă
- **Fields** — înregistrările Q/A. Fiecare câmp are:
  - **Label** (întrebarea)
  - **Value** (răspunsul)
  - **Type** — `text` / `markdown` / `link` / `list`
  - **Visible** (ascunde înregistrări individuale fără ștergere)
  - **Order** (drag pentru reordonare)

Slug este derivat din title și folosit în URL-ul API — schimbă-l prin Edit dacă este nevoie.

## Workflow-uri tipice

- **Publică un FAQ rider nou** — `+ Create set` → Type = Rider app, Status = Draft → completează title + description → adaugă câmpuri Q/A → save → preview prin View details → Edit, Status = Active → apare în rider app la următorul fetch
- **Pregătește copy sezonier** — Duplicate un set existent → editează copia ca Draft → programează schimbarea arhivând setul vechi și activându-l pe cel nou în același pas
- **Revine asupra unui răspuns greșit** — deschide setul problematic → Edit → corectează câmpul (sau dezactivează `Visible`) → save; sau Archive întregul set și revino la un duplicat anterior
- **Bulk import dintr-un dump JSON** — _Import_ sus-dreapta → alege fișierul → confirmă structura parsată → importă ca Draft, apoi review și Activate

## Sfaturi

- **Type controlează cine vede** — nu pune copy pentru rider într-un set `mechanic`, nu va ajunge niciodată în rider app
- **Draft este prietenul tău** — seturile noi sunt Draft implicit ca rider app să nu arate conținut neterminat. Comută în Active doar după review complet
- **Câmpurile markdown randează formatarea** — folosește-le pentru răspunsuri cu liste sau bold; alege `text` pentru proză simplă
- **Tags-urile sunt partajate cu filtrul** — folosește un vocabular consistent (ex. `onboarding`, `payments`, `troubleshooting`) ca filtrarea ulterioară să rămână utilă
- **Archive în loc de Delete** când e posibil — seturile șterse dispar definitiv, cele arhivate pot fi reactivate și servesc ca istoric
