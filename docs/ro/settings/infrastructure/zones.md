# Zone

Pagina Zone (`/zones`) este locul unde desenezi **regulile invizibile ale zonei tale de serviciu** — poligoane de parcare, no-go, low-speed, charge și altele care schimbă comportamentul vehiculelor și clienților când traversează o graniță. Fiecare zonă este un singur poligon pe hartă plus un tip, un status, parametri opționali (viteză, preț, capacitate de vehicule) și etichete.

Zonele controlează comportamentul runtime al [Vehiculelor](../../operations/fleet/vehicles.md) — intri într-un poligon no-ride și vehiculul se taie; parchezi într-un poligon paid-parking și tariful se aplică.

Permisiune necesară: **Zones** (`u7v8w9`). Sub-permisiunile `create` / `edit` / `delete` protejează acțiunile corespunzătoare.

## Ce este o zonă

O zonă are patru părți de bază:

1. **Tip** — alege culoarea și regula aplicată la runtime (vezi tabelul de mai jos)
2. **Poligon** — exact un poligon, desenat pe hartă; formele concave sunt OK, găurile nu
3. **Parametri** — depind de tip: viteză (low-speed), preț (paid-parking), sumă (charge), vehicule permise (parking, paid-parking, rebalance)
4. **Status** — `Active` (aplicat), `Inactive` (salvat dar ignorat), `Archived` (ascuns din majoritatea listelor)

### Tipuri de zone

| Tip              | Culoare         | Ce face                                                              |
| ---------------- | --------------- | -------------------------------------------------------------------- |
| **No-go**        | Negru           | Vehiculele nu pot intra sau opera aici                               |
| **No-parking**   | Roșu            | Riderii nu pot încheia o cursă aici                                  |
| **No-ride**      | Mov             | Vehiculele se taie / refuză să pornească în interior                 |
| **Low-speed**    | Albastru        | Viteza maximă limitată la valoarea `speed` (km/h)                    |
| **Parking**      | Verde           | Parcare desemnată; capacitate opțională                              |
| **Paid-parking** | Portocaliu      | Parcare cu preț și capacitate opțională                              |
| **Charge**       | Verde închis    | Zonă de recompensă — `amount` aplicat când riderii termină aici      |
| **Maintenance**  | Roșu închis     | Marker intern pentru ops; vehiculele dinăuntru sunt excluse din flow |
| **Rebalance**    | Albastru închis | Zonă țintă pentru rebalansare flotă; capacitate opțională            |

## Moduri de vizualizare

Un toggle-group în header-ul paginii comută între trei vederi — aceleași date, lentile diferite.

| Mod       | Bun pentru                                                             |
| --------- | ---------------------------------------------------------------------- |
| **Table** | Editări în bulk, sortare după nume/tip/status, navigare paginată       |
| **Cards** | Scan vizual cu mini-hartă pe fiecare zonă; infinite scroll             |
| **Map**   | Toate zonele suprapuse pe harta reală — util pentru audit de acoperire |

## Filtre

| Filtru | Tip      | Note                               |
| ------ | -------- | ---------------------------------- |
| Search | Text     | Caută în numele zonei și descriere |
| Status | Dropdown | `Active` / `Inactive` (sau `All`)  |
| Type   | Dropdown | Unul din cele 9 tipuri (sau `All`) |

Filtrele se aplică în toate cele trei moduri. Vederea Map încarcă **toate** zonele care se potrivesc (fără paginare); Table și Cards paginează.

## Coloane (Table view)

| Coloană         | Sortabilă? | Conținut                                                     |
| --------------- | ---------- | ------------------------------------------------------------ |
| **Zone name**   | ✓          | Label + swatch colorat al tipului; link la pagina de detaliu |
| **Description** | —          | Descriere opțională                                          |
| **Type**        | ✓          | Pilulă colorată a tipului (vezi tabelul de tipuri)           |
| **Status**      | ✓          | `Active` / `Inactive` / `Archived`                           |
| **Tags**        | —          | Etichete aplicate zonei                                      |

## Acțiuni pe rând

Un meniu cu trei puncte per rând. Acțiunile disponibile depind de permisiuni:

| Acțiune          | Permisiune | Ce face                                                  |
| ---------------- | ---------- | -------------------------------------------------------- |
| **View details** | —          | Deschide pagina de detaliu (hartă + metadate)            |
| **Edit**         | `edit`     | Deschide formularul de editare (geometrie + proprietăți) |
| **Delete**       | `delete`   | Ștergere permanentă — necesită 3-secunde de menținere    |

## Acțiuni bulk

Selectează rânduri în Table pentru a dezvălui bara de bulk. Toate acțiunile care modifică necesită capabilitatea `edit`:

- **Change type** — recolorează multe zone într-un tip nou simultan (parametrii se resetează)
- **Change vehicle limit** — setează `allowedVehicles` pe selecție (parking / paid-parking / rebalance)
- **Change value** — setează valoarea numerică specifică tipului (speed / price / amount)
- **Change status** — comută Active ↔ Inactive în bulk
- **Change tags** — adaugă sau înlocuiește etichete pe selecție
- **Export selected** — descarcă doar zonele selectate ca JSON (fără permisiune; client-side)

## Creare — wizard cu 5 pași

`+ Create` deschide un formular ghidat. Poți sări înapoi liber; sărituri înainte sunt deblocate doar când pasul curent e valid.

1. **Name & description** — `Label` (obligatoriu) și `Description` opțional
2. **Classify** — `Type` (obligatoriu, alege culoarea și forma parametrilor), `Status` (Active / Inactive / Archived), `Tags`
3. **Parameters** — câmpuri numerice specifice tipului cu un slider 0–100 pentru introducere rapidă: viteză (km/h), preț, sumă, sau vehicule permise. Tipurile fără parametri afișează "no params" și te lasă să avansezi
4. **Geometry** — desenează exact **1 poligon** pe hartă. Zonele existente pot fi activate ca overlay punctat ca să nu se suprapună. Controale: draw, edit, add points, undo (până la 20 pași), delete, zoom, fit-bounds, locate-me, fullscreen
5. **Review** — sumar final read-only al fiecărui câmp plus numărul de puncte ale poligonului

Salvarea creează zona și te duce la pagina ei de detaliu.

## Formular Edit

`Edit` reutilizează aceeași carcasă dar într-o singură pagină (fără stepper) — modifică label, tip, status, parametri, etichete sau redesenează poligonul → Save. Garda de "modificări nesalvate" întreabă înainte să părăsești pagina.

## Import / Export

Două butoane outline lângă **+ Create**:

- **Import** — alege un fișier `.json` exportat anterior; dashboard-ul validează payload-ul și creează zone pe server. Necesită capabilitatea `create`
- **Export** — deschide un dialog cu opțiuni: pagina curentă, toate paginile cu filtrele curente sau tot. Bara de bulk oferă și "Export selected" pentru rândurile selectate

## Pagina de detaliu

Click pe un rând (sau _View details_) deschide pagina de detaliu a zonei cu:

- Preview live al poligonului pe hartă
- Card Basic info (label, description, type, status, color)
- Card Parameters (speed / price / amount / allowed vehicles, când e relevant)
- Tags
- Timestamp-uri Created / updated
- Butoane Edit și Delete în header (gated de permisiuni)

## Fluxuri tipice

- **Lansare oraș nou** — Importă un pachet JSON dacă ai unul, altfel desenează inelul no-go primul, apoi poligoanele de parking în interior
- **Ajustarea unei zone slow-speed** — Edit → pasul 3 → urcă valoarea speed → Save. Activă imediat
- **Închidere temporară parcare pentru o zi** — Edit → Status = Inactive → Save. Pune înapoi Active când se redeschide
- **Re-zonare după schimbări în oraș** — bulk-select zonele afectate → Change type → confirm. Parametrii vechi specifici tipului se șterg automat
- **Audit de acoperire** — comută în Map view, filtru Status = Active, scanează cu ochiul pentru goluri și suprapuneri

## Sfaturi

- **Tipul controlează tot** — culoare, formă parametri, regulă runtime. Alegerea greșită a tipului e cel mai frecvent motiv de refacere
- **Un singur poligon per zonă** — împarte zonele complexe în mai multe; editorul impune un singur poligon
- **Suprapunerile sunt permise** — regula cea mai restrictivă câștigă (no-go > no-ride > low-speed), nu-ți fie frică să pui low-speed înăuntrul unui parking
- **Folosește overlay-ul punctat** — activează "Show existing zones on map" în editor ca să eviți suprapuneri accidentale cu vecinii
- **Inactive ≠ Deleted** — comută Status când vrei să oprești temporar o zonă; Delete e permanent (cele 3 secunde de menținere sunt plasa de siguranță)
- **Etichetează zonele** — etichetele sunt singurul filtru multi-select care supraviețuiește comutării vederii. Folosește-le pentru grupare după cartier, campanie sau ownership
- **Export înainte de bulk** — un click în dialogul de export = backup al întregului set, și un bulk eșuat e la un Import distanță de a fi revocat
