# Vehicle Settings

Pagina Vehicle Settings (`/settings/vehicle-settings`) este **catalogul de modele de vehicule** pe care Ridewolf știe să le opereze — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_ etc. Fiecare rând aici este un **șablon de model**: un pachet reutilizabil de tarife, limite tehnice, reguli pentru proof-uri foto și etichete, care se atașează vehiculelor [fizice](../../operations/fleet/vehicles.md) prin [formularul de vehicul](../../operations/fleet/vehicle-create-edit.md).

Permisiune necesară: **Vehicle Settings** (`e7f8g9`). Sub-permisiuni protejează `create` / `edit` / `delete`.

## Model vs instanță de vehicul

Aceasta este cea mai importantă distincție de pe această pagină:

- Un **Vehicle Model** (această pagină) — o definiție. _„Toate Xiaomi M365 din parc se comportă așa”_. Un rând per marcă/configurație.
- Un **Vehicle** ([lista Vehicles](../../operations/fleet/vehicles.md)) — un vehicul fizic cu o etichetă tip `RW-007`, legat la un dispozitiv IoT, parcat undeva. Sute de astfel de vehicule pointează la un singur model.

Când schimbi un model aici, fiecare vehicul care îl referă moștenește noile valori — tarifele devin active, limitele de viteză se actualizează, cerințele de proof-uri foto intră în vigoare. Tratează această pagină ca un **strat de policy** care se distribuie către multe unități deodată.

## Filtre

Bara de filtre de sus are trei controale:

| Filtru     | Tip      | Note                                                                             |
| ---------- | -------- | -------------------------------------------------------------------------------- |
| **Search** | Text     | Caută după labelul modelului                                                     |
| **Status** | Dropdown | `All` / `Active` / `Inactive` / `Archived`                                       |
| **Type**   | Dropdown | `All` / `E-Scooter` / `E-Bike` / `Cargo E-Bike` / `E-Moped` / `E-Car` / `E-Boat` |

Schimbarea oricărui filtru resetează paginarea la pagina 1 și reîncarcă de la server.

## Coloane

| Coloană         | Sortabilă? | Conținut                                                                                             |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| **Image**       | —          | Thumbnail 64×64; fallback — pictogramă generică de mașină dacă lipsește imaginea                     |
| **Name**        | ✓          | Labelul modelului (ex. _Xiaomi M365 Pro_)                                                            |
| **Type**        | ✓          | Pilulă cu tipul de vehicul (e-scooter, e-bike, …)                                                    |
| **Description** | ✓          | Primele 36 caractere din descrierea markdown, fără formatare                                         |
| **Tags**        | —          | Până la 2 pilule de etichete + chip `+N` — **click pentru quick-edit** în dialog                     |
| **Status**      | ✓          | Pilulă colorată: Active (verde) / Inactive (gri) / Archived (albastru) — **click pentru quick-edit** |
| **Created**     | ✓          | Data creării modelului                                                                               |
| **Updated**     | ✓          | Data ultimei modificări                                                                              |

Click-urile de quick-edit deschid un dialog mic cu doar un câmp (multi-select de etichete sau dropdown de status) — util pentru schimbări de status în lot fără a părăsi lista.

## Acțiuni de toolbar

Butoane sus-dreapta (vizibilitatea depinde de permisiuni):

| Buton            | Permisiune | Ce face                                                                                                                                    |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Auto-refresh** | —          | Face polling la lista la un interval; toggle on/off; pictograma se rotește în timpul încărcării                                            |
| **Import**       | `create`   | Alege un fișier JSON (format export). Fiecare item devine un apel `create`; etichetele și tarifele sunt eliminate — reataşează manual după |
| **Export**       | —          | Deschide un dialog pentru export al paginii curente / tot filtrat / pagini specifice în `vehicle-models-export.json`                       |
| **+ Create**     | `create`   | Merge la `/settings/vehicle-settings/create`                                                                                               |

## Acțiuni pe rând

Meniu cu trei puncte pe fiecare rând:

| Acțiune          | Permisiune | Ce face                                                                                                                                          |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **View details** | —          | Deschide detaliul modelului la `/settings/vehicle-settings/:id` (taburi General / Technical / History)                                           |
| **Edit**         | `edit`     | Deschide formularul de editare (`/settings/vehicle-settings/:id/edit`) cu setul complet de câmpuri                                               |
| **Delete**       | `delete`   | Dialog destructiv de confirmare cu o întârziere de 3 secunde înainte ca butonul de confirmare să se activeze. Rândul modelului dispare din listă |

Click pe rând în sine (oriunde în afara chipurilor de quick-edit) deschide **View details**.

## Formular Create / Edit

`+ Create` (`/settings/vehicle-settings/create`) și _Edit_ (`/settings/vehicle-settings/:id/edit`) împart același layout: o carte de formular în stânga, un sidebar contextual **Field Guide** în dreapta cu un preview live al modelului.

Formularul este grupat în secțiuni — Create arată doar cele șapte câmpuri principale; Edit adaugă trei sub-secțiuni suplimentare (Tech Specs, Auto Policies, Document Requirements) pentru setări avansate.

### Câmpuri principale

| Câmp             | Required | Note                                                                                                                                         |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Label**        | ✓        | Nume uman afișat peste tot (ex. _Xiaomi M365 Pro_). Text liber                                                                               |
| **Description**  | —        | Editor markdown; folosit în detaliul modelului și în tip-urile pentru operatori                                                              |
| **Vehicle Type** | ✓        | Unul din: e-scooter / e-bike / cargo-e-bike / e-moped / e-car / e-boat. Conduce pictograma și logica de categorie                            |
| **Status**       | ✓        | Active / Inactive / Archived. Inactive scoate modelul din pickerul de creare-vehicul                                                         |
| **Image**        | —        | Drag-and-drop sau click upload. PNG/JPEG/JPG, max 10 MB. Afișat în thumbnail-ul listei și pe detaliul Vehicle                                |
| **Tariffs**      | ✓        | Multi-select de [Vehicle Tariffs](vehicle-tariffs.md). Toate cursele pe acest model se tarifează cu aceste tarife |
| **Tags**         | ✓        | Multi-select de etichete model-level. Moștenite de fiecare vehicul al acestui model                                                          |

### Tech Specs (doar în Edit)

| Câmp                              | Note                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Base speed limit (km/h)**       | Plafon hard impus de firmware-ul IoT pe fiecare cursă                                            |
| **Battery reserve (%)**           | Nivelul de încărcare sub care vehiculul este considerat low-battery                              |
| **Range reserve (km)**            | Autonomia rămasă estimată sub care unitatea este marcată pentru swap                             |
| **Min / Max battery voltage (V)** | Limite pentru citiri valide ale bateriei principale — în afară — marchează _Needs Investigation_ |
| **Min / Max IoT voltage (V)**     | Aceleași, pentru bateria de tracker a modulului IoT                                              |

### Auto Policies (doar în Edit)

Pachet de toggle-uri: **Low-battery stop**, **Low-balance stop**, **Multiple rides**, **Auto-lock**, plus **Auto-refund** și **Auto-discount** cu praguri proprii (distanță / timp / sumă).

### Document Requirements (doar în Edit)

Decide ce poze / documente trebuie să trimită un rider:

- **Start proofs** — poze ale vehiculului la începutul cursei (toggle + required + count) și selfie rider
- **Park proofs** — poze de parcare la finalul cursei (toggle + required + count)
- **Extra documents** — permis de conducere / pașaport / carte de identitate / selfie / altele

Aceste reguli sunt citite de aplicația rider-ului la începutul / finalul unei curse pe un vehicul legat de acest model.

## Relația cu alte entități

- **[Vehicle Tariffs](vehicle-tariffs.md)** — rândurile de prețuri pe care le alegi în câmpul **Tariffs**. Un model fără tarife nu poate prețui o cursă
- **[Vehicles](../../operations/fleet/vehicles.md)** — unități fizice care pointează la acest model prin câmpul _Vehicle Model_ din [formularul de vehicul](../../operations/fleet/vehicle-create-edit.md). Modelul definește policy-ul; vehiculul deține IoT-ul, eticheta și locația
- **Tags** — etichete model-level moștenite de fiecare vehicul al acestui model, în plus față de etichetele vehicle-level aplicate direct pe unitate. Cursele moștenesc ambele la start

## Workflow-uri tipice

- **Onboardarea unui model nou** — `+ Create` → completează Label / Type / Status / Image → alege tarifele care se aplică → save → deschide noul model din listă și click _Edit_ pentru a seta Tech Specs și policies
- **Retragerea unui model** — deschide modelul → _Edit_ → setează Status = _Archived_ → save. Vehiculele existente continuă să funcționeze; modelul pur și simplu nu mai apare în pickerul de creare-vehicul
- **Schimbare de tarif în toată flota** — editează modelul → schimbă tarifele → save. Toate vehiculele acestui model încep să se tarifeze conform noilor tarife de la următoarea cursă
- **Import bulk după migrare** — Export din staging → Import al fișierului JSON aici → reataşează tarifele și etichetele manual pe fiecare model nou (importul scoate aceste referințe intenționat)
- **Ajustare cerințe foto** — Edit → Document Requirements → toggle Start / Park proofs → save. Aplicația rider-ului preia noile reguli la următorul start de cursă

## Tip-uri

- **Setează tarifele înainte de a marca Active** — un model fără tarife va respinge cererile de tarifare a cursei
- **Folosește Inactive, nu Delete, pentru retragere** — Inactive ascunde modelul de creare-vehicul nou, dar păstrează istoria. Delete este irecuperabil și blocat de întârzierea de 3 secunde a confirmării dintr-un motiv întemeiat
- **Imaginea contează** — thumbnail-ul listei și pickerele de vehicul ale operatorului toate folosesc această imagine. Crop la pătrat cu fundal transparent pentru cel mai curat aspect
- **Etichetele de aici sunt model-level, nu vehicle-level** — aplicând o etichetă aici o pui pe fiecare vehicul al acestui model. Pentru etichete specifice unei unități, editează vehiculul individual
- **Tech Specs guvernează alertele** — battery reserve și limitele de voltaj alimentează declanșatorul _Needs Investigation_; setarea lor prea strict inundă coada de alerte
- **Sidebar-ul Field Guide se actualizează la focus pe câmp** — citește-l prima dată când creezi un model, e mai actual decât acest articol va fi vreodată
