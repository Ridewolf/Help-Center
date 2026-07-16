# Dispozitive IoT

Pagina IoT (`/iot`) este **inventarul de hardware** — fiecare tracker / lock unit pe care îl deține flota ta, indiferent dacă e momentan montat pe un vehicul. Fiecare rând e un dispozitiv fizic identificat prin **IMEI**, cu telemetrie live (online, fix GPS, semnal GSM, baterie) reîmprospătată din ultimul ping.

E oglinda hardware a [Vehiculelor](../../operations/fleet/vehicles.md): un vehicul fără IoT nu poate fi nici trackuit nici controlat; un IoT fără vehicul e doar hardware neasignat care stă pe raft.

Permisiune necesară: **IoT Devices** (`n8p9q9`). Sub-permisiunile protejează `edit` / `send-command` / `delete`, iar acțiunea bulk _Generate vehicle_ împrumută din `operations.vehicles.create`.

## Cum ajung dispozitivele aici

Dispozitivele nu sunt descoperite automat — le înregistrezi pe măsură ce primești loturi:

1. **Achiziție** — cumperi unități IoT de la un vendor (Omni, Segway, Okai etc.). Fiecare unitate are un **IMEI** unic tipărit pe cutie / sticker
2. **+ Create** aici — introdu Name, IMEI, Vendor, Status. Dispozitivul e acum în inventar dar nelegat
3. **Bind la un vehicul** — se face din [Vehicle Create / Edit](../../operations/fleet/vehicle-create-edit.md) selectând acest IoT în device picker. Un IoT pe vehicul, un vehicul pe IoT
4. **Telemetria începe să curgă** când dispozitivul pornește cu SIM și ajunge la brokerul MQTT Ridewolf. Lista arată cel mai recent snapshot — refresh sau așteaptă AutoRefresh

Alternativ — folosește acțiunea bulk **Generate vehicle** de mai jos pentru a crea un vehicul nou pentru fiecare IoT selectat dintr-o singură trecere (ex. după onboarding-ul unui lot de trotinete noi).

## Filtre

| Filtru | Tip      | Note                                       |
| ------ | -------- | ------------------------------------------ |
| Search | Text     | Caută după name și IMEI                    |
| Status | Dropdown | `All` / `Active` / `Inactive` / `Archived` |

Filtrele sunt sincronizate cu URL-ul (refresh păstrează view-ul) și se resetează la default prin link-ul Clear din bara de filtre.

## Coloane

| Coloană         | Sortabilă? | Conținut                                                               |
| --------------- | ---------- | ---------------------------------------------------------------------- |
| **Name**        | da         | Nume dispozitiv + ID scurt; click pe rând deschide pagina de detaliu   |
| **Lock**        | —          | Pilulă cu starea de lock (Locked / Unlocked) din ultima comandă MQTT   |
| **Online**      | —          | Verde dacă ultimul ping e în fereastra de freshness; roșu dacă e stale |
| **GPS**         | —          | Indicator fix Valid / Invalid                                          |
| **GSM**         | —          | Putere semnal (scală 0-32, roșu ≤10, galben ≤20, verde ≤32)            |
| **Battery**     | da         | Procent baterie cu bară colorată                                       |
| **Status**      | da         | Pilulă `Active` / `Inactive` / `Archived`                              |
| **Last Signal** | da         | Timp de la ultimul packet de telemetrie (relativ, ex. "5m ago")        |

## Acțiuni pe rând

Un meniu cu trei puncte. Acțiunile disponibile depind de permisiuni:

| Acțiune           | Permisiune | Ce face                                                                            |
| ----------------- | ---------- | ---------------------------------------------------------------------------------- |
| **View details**  | —          | Deschide pagina de detaliu (tab-uri Details / Activity / Commands / History)       |
| **View location** | —          | Deschide ultimele coordonate GPS în Google Maps (tab nou)                          |
| **Edit**          | `edit`     | Deschide formularul de editare (Name / IMEI / Vendor / Status)                     |
| **Delete**        | `delete`   | Elimină înregistrarea. Confirmarea are o întârziere de 3 secunde înainte de unlock |

## Acțiuni bulk

Selectează mai multe rânduri (checkbox-ul din header sau per rând) pentru a apărea bara bulk. Acțiunile sunt și ele protejate de permisiuni — cele pe care nu le poți face sunt ascunse, nu gri:

| Acțiune                    | Permisiune        | Ce face                                                                                                                         |
| -------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Generate vehicle**       | `vehicles.create` | Creează câte un vehicul nou pentru fiecare IoT selectat, auto-numit cu prefixul companiei; alegi vehicle model + tags opționale |
| **Change status**          | `edit`            | Setează Active / Inactive / Archived pentru toate selectate                                                                     |
| **Test connection (Beep)** | `send-command`    | Trimite comanda `Beep` la fiecare dispozitiv — util pentru a localiza fizic unități în depozit                                  |
| **Send command**           | `send-command`    | Alegi o comandă din vendor-ul primului rând selectat (preset sau procedură advanced multi-step) și o trimiți la toate           |
| **Delete**                 | `delete`          | Ștergere bulk cu dialog de confirmare (întârziere 3 secunde)                                                                    |

Operațiunile bulk rulează secvențial cu progres (`processed / total`) și un panou de failed items — succes parțial e normal, dispozitivele eșuate rămân selectate pentru retry sau inspecție.

## Pagina de detaliu

Click pe un rând (sau _View details_) deschide pagina de detaliu. Patru tab-uri:

- **Details** — IMEI / Vendor / Status / coordonate cu preview Google Maps embed; bloc complet de telemetrie (speed mode, validitate GPS, GSM raw, baterie, locked state)
- **Activity** — log de activitate generic pentru acest dispozitiv (`entity-type=iot`)
- **Commands** — sender de comenzi vendor-aware. Același motor e folosit pe tab-ul Commands de la [Vehicle Detail](../../operations/fleet/vehicle-detail.md) — vezi articolul acela pentru fluxul procedure / advanced
- **History** — istoric telemetrie / packet log

Header-ul arată Vehicle-ul legat (dacă e bound) ca chip — click pentru a sări la pagina de detaliu a acelui vehicul. Un dropdown **Actions** în header oferă Edit / View on Google Maps / Delete.

## Formular Create / Edit

Formularul IoT (`+ Create` sau _Edit_) are patru câmpuri, toate obligatorii:

- **Name** — label scurt pe care îl vezi în liste (ex. `SCOOTER-014`). Text liber
- **IMEI** — identificatorul hardware unic al dispozitivului (folosit pentru bind la vehicul și pentru a primi trafic MQTT). Odată setat, tratează-l ca imuabil — schimbarea lui pe un dispozitiv deja deployat va sparge telemetria până când binding-ul vehiculului e actualizat
- **Vendor** — string-ul producătorului (ex. `omni`, `segway`). Determină ce set de comenzi înțelege dispozitivul — scrie-l exact, lookup-ul e case-sensitive
- **Status** — `Active` (default) / `Inactive` (ascuns din pickerul pentru bind vehicul) / `Archived` (hardware retras)

Nu există formular inline pentru bind la vehicul aici — direcția aceea e deținută de formularul Vehicle Create / Edit.

## Fluxuri tipice

- **Onboarding un lot de 50 trackere** — Creează fiecare (sau importă via CSV upload dacă ai unul) → selectează tot → _Generate vehicle_ cu vehicle model-ul corect → gata; fiecare IoT are un vehicul pereche în status `needs_investigation` gata pentru QA
- **Găsește o unitate pierdută în depozit** — Filtrează după name/IMEI → acțiune de rând _Test connection (Beep)_ sau Beep bulk → mergi prin depozit ascultând
- **Retragere dispozitiv defect** — Edit → setează Status = Archived (nu Delete — Activity log se păstrează). Dacă era legat un vehicul, dezleagă-l mai întâi din formularul Vehicle edit
- **Roll-out de comandă pe un vendor** (ex. setare de firmware) — Filtrează după name pattern sau telemetrie, selectează tot ce se potrivește → _Send command_ → alege comanda de vendor și lasă să parcurgă lista cu progres
- **Investigare vehicul "fantomă"** (online dar pierdut) — View location → dacă GPS e Invalid, încearcă Beep; dacă tot tăcere, suspectează SIM / baterie
- **Cross-check telemetrie vs evenimente** — deschide [Events report](../../analytics/reports/events.md) filtrat după vehiculul acestui IoT pentru a corela starea hardware cu activitatea de platformă

## Sfaturi

- **IMEI e cheia de join** peste tot — bind vehicul, rutare MQTT, tickete de support. Tastează-l o dată, copiază-l pentru totdeauna
- **Câmpul Vendor e structural, nu cosmetic** — dictează catalogul de comenzi de pe tab-ul Commands. Greșeala `Omni` în loc de `omni` poate da un command list gol
- **Online ≠ Active** — Online e un semnal live de telemetrie; Status e un flag de admin. Un dispozitiv Active poate fi Offline (baterie moartă, fără GSM); unul Archived poate încă trimite ping-uri până e oprit
- **Bulk Send command folosește vendor-ul primului rând** — dacă selecția ta mixează vendori, sparge-o în loturi pe câte un vendor sau vei vedea un command list confuz
- **Generate vehicle creează vehicule `needs_investigation` intenționat** — au nevoie de un om să confirme că binding-ul e corect înainte de go-live. Tag-uirea bulk la generare face următorul pas de QA mai ușor
- **Nu există buton "force re-pair"** — dacă telemetria se oprește după un swap, verifică binding-ul Vehicle → IoT (în Vehicle edit) și SIM-ul / alimentarea dispozitivului, nu pagina asta
- **Dispozitivele Archived rămân căutabile** după IMEI — util când o unitate veche se întoarce de la reparație și trebuie reînviată (flip înapoi la Active)
- **Last Signal e cel mai rapid health check** — sortează descrescător pentru a găsi întâi dispozitivele stale; orice peste 24h pe un rând Active merită o privire
