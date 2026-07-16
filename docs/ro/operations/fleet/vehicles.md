# Vehicule — Listă

Lista de vehicule (`/vehicles`) este inventarul întregii tale flote — fiecare trotinetă, bicicletă sau altă unitate, cu starea curentă, locația, bateria, conexiunea IoT, etichetele și zona. Este cea mai folosită pagină din dashboard: aici începi aproape orice operațiune pe flotă.

Pentru lucrul pe un vehicul (status complet, istoric, comenzi IoT, replay traseu) deschide [pagina de detaliu a vehiculului](vehicle-detail.md).

Permisiune necesară: **Vehicles** (`k7m8n9`).

## Cum ajung vehiculele aici

Vehiculele nu apar singure — le creezi și le întreții tu:

1. Operatorul **creează un vehicul** prin butonul _Create_ (etichetă, model, dispozitiv IoT, stare inițială)
2. Vehiculul este înregistrat la un dispozitiv IoT; dispozitivul începe să raporteze continuu **baterie, stare blocare, ultim semnal, coordonate GPS**
3. De îndată ce dispozitivul IoT trimite primul heartbeat, rândul din această listă se umple cu date live — procent baterie, ora semnalului, indicator blocare
4. Operatorii (și acțiunile bulk) **actualizează status, etichete, zonă, setări** pe durata vieții vehiculului
5. Când vehiculul iese din uz, schimbi statusul la _Storage_ / _Maintenance_ / etc., sau îl ștergi

Lista se reîmprospătează la reload sau la schimbarea filtrelor; actualizările IoT live împinse de backend pot și ele actualiza rândurile pe loc.

## Moduri — Tabel vs Hartă

Pagina are două moduri, comutabile dintr-un control sus:

- **Table** — grila completă cu toate filtrele, sortarea și bulk-select
- **Map** — aceeași flotă proiectată pe harta zonei de operare; vehiculele sunt pin-uri colorate după status cu badge-uri de baterie

Filtrele se aplică ambelor moduri. Map este excelent pentru a detecta clustere, goluri și oportunități de rebalansare; Table e ce folosești pentru lucrul cu datele.

## Filtre

| Filtru   | Tip            | Note                                                                              |
| -------- | -------------- | --------------------------------------------------------------------------------- |
| Search   | Text pe lățime | Caută după etichetă, ID, serial IoT — textul este **debounced ~300ms**            |
| Odometer | Dropdown       | Intervale de kilometraj total: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km |
| Status   | Dropdown       | Filtru după status (vezi referința de statusuri mai jos)                          |
| Tags     | Multi-select   | Filtru după etichete aplicate vehiculului                                         |

Toate filtrele se combină cu AND. Chip-urile de filtre apar deasupra tabelului; URL-ul se actualizează.

## Coloane

| Coloană         | Sortabilă? | Conținut                                                                                            |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| **Health**      | —          | Indicatori compacți de sănătate IoT (periphery) — iconițe mici care rezumă starea subsistemelor IoT |
| **Code**        | ✓          | Eticheta vehiculului (codul citibil pe sticker), cu link către pagina de detaliu                    |
| **Status**      | ✓          | Pilula de status (Available, In Use, Charging etc. — referință mai jos)                             |
| **Model**       | —          | Numele modelului și miniatura (ex. Xiaomi M365)                                                     |
| **Lock**        | —          | Iconița de blocare — închisă (locked) / deschisă (unlocked) după ultimul raport IoT                 |
| **Battery**     | ✓          | Procent baterie cu o bară colorată (verde ≥ 60%, chihlimbar 30–60%, roșu < 30%)                     |
| **Tags**        | —          | Etichete aplicate vehiculului (operatorii pot edita)                                                |
| **Zone**        | —          | Zona în care vehiculul se află, sau "Out of zone"                                                   |
| **Last ride**   | ✓          | Data / ora ultimei curse                                                                            |
| **Last signal** | ✓          | Când dispozitivul IoT a raportat ultima dată (semnal vechi = probabil offline)                      |

Coloanele sortabile sunt marcate cu ✓ — click pe header. Sortarea se reflectă în URL.

## Referință statusuri

Fiecare vehicul are exact un status. Statusul determină comportamentul (dacă riderii pot închiria, dacă alertele IoT se declanșează etc.):

| Status                  | Înseamnă                                                    |
| ----------------------- | ----------------------------------------------------------- |
| **Available**           | Liber, închiriabil, parcat corect                           |
| **In Use**              | Pe o cursă activă                                           |
| **Charging**            | La o stație de încărcare                                    |
| **Discharged**          | Baterie prea joasă pentru a fi închiriat                    |
| **Needs Investigation** | Marcat de sistem sau operator — necesită verificare manuală |
| **Maintenance**         | În service / scos din flotă pentru reparații                |
| **Not Ready**           | Creat dar încă nu eliberat către rideri                     |
| **Reserved**            | Rezervat pentru un rider/booking specific                   |
| **Transportation**      | În mișcare (rebalansare, recuperare din teren)              |
| **Storage**             | În depozitare pe termen lung, în afara operațiunilor        |
| **Stolen**              | Raportat ca furat / neînregistrat                           |
| **Alert**               | Alertă critică de la IoT sau sistem                         |

## Acțiuni pe rând

Fiecare rând are un **meniu cu trei puncte** în extrema dreaptă. Acțiunile disponibile depind de permisiunile tale:

| Acțiune                 | Permisiune            | Ce face                                                             |
| ----------------------- | --------------------- | ------------------------------------------------------------------- |
| **View details**        | —                     | Deschide [pagina de detaliu](vehicle-detail.md) |
| **View route history**  | `coordinates-history` | Deschide o vizualizare hartă cu replay-ul traseului GPS recent      |
| **Open in Google Maps** | —                     | Deschide ultimele coordonate cunoscute în Google Maps (tab nou)     |
| **Edit**                | `edit`                | Deschide formularul de editare                                      |
| **Change status**       | `edit`                | Mic dialog pentru a schimba statusul fără a părăsi lista            |
| **Delete**              | `delete`              | Șterge logic vehiculul (cu dialog de confirmare)                    |

Acțiunile pentru care nu ai permisiune sunt ascunse.

## Acțiuni bulk

Selectează unul sau mai multe vehicule cu checkbox-urile din stânga fiecărui rând. O **bară de acțiuni bulk** apare sus cu numărul selectat și acțiunile:

| Acțiune bulk        | Permisiune    | Ce face                                                             |
| ------------------- | ------------- | ------------------------------------------------------------------- |
| **Change status**   | `bulk-update` | Deschide un dialog și aplică un singur status tuturor selectatelor  |
| **Change tags**     | `bulk-update` | Adaugă sau elimină etichete în selecție                             |
| **Change settings** | `bulk-update` | Aplică setări vehicul (ex. viteză max, alarme) tuturor selectatelor |
| **Send command**    | `iot-command` | Trimite o comandă IoT (lock, unlock, alarm on/off, reboot) tuturor  |
| **Batch QR**        | —             | Generează o foaie QR printabilă pentru vehiculele selectate         |
| **Delete selected** | `delete`      | Șterge logic fiecare vehicul selectat (cu dialog de confirmare)     |

## Acțiuni de pagină (dreapta-sus)

- **+ Create** — deschide [formularul de creare vehicul](vehicle-create-edit.md) (articol separat)
- **Export** — descarcă lista curentă filtrată ca fișier (filtrele și sortarea sunt respectate)
- **Batch QR** (de asemenea disponibil ca acțiune bulk) — deschide wizard-ul batch QR pentru generarea codurilor printabile

## Modul Hartă

Când comuți pe Map:

- Vehiculele apar ca **pin-uri** colorate după status (verde = Available, albastru = In Use etc.)
- Un mic **badge baterie** stă lângă fiecare pin
- Click pe un pin deschide un popover cu eticheta, statusul, bateria și un link _View details_
- **Filtrele se aplică în continuare** — restrânge după status, etichete etc. și harta se actualizează
- Pan / zoom cu mouse-ul sau gesturi cu două degete

Harta este alimentată cu aceleași date ca tabelul — este o altă lentilă, nu un alt set de date.

## Fluxuri tipice

- **Rebalansare bulk** — filtrează după `Status = Discharged` + zonă, selectează toate, _Send command → Lock_ (sau _Change status → Transportation_) înainte de ridicare
- **Găsește un vehicul blocat** — sortează după _Last signal_ crescător pentru a vedea cele mai vechi semnale sus
- **Detectează bateriile joase înainte să devină o problemă** — sortează după _Battery_ crescător; partea de jos a flotei este coada ta de mentenanță din viitorul apropiat
- **Auditează o etichetă** — filtrează după etichetă și revizuiește rândurile
- **Pregătire pentru personal de teren** — filtrează țintele zilei, _Batch QR_ pentru a imprima etichete pentru unitățile noi

## Sfaturi

- **Search debounced** — pauză în scris pentru ca serverul să răspundă o singură dată
- **URL = vizualizarea** — copiază și distribuie link-uri filtrate colegilor
- **Coloana Health dintr-o privire** — iconițele mici rezumă subsistemele IoT; pune mouse-ul pe oricare pentru a vedea ce reprezintă (ex. semnal celular, stare blocare, citire senzor)
- **Culoarea bateriei este shortcut-ul tău** — o bară roșie în listă = are nevoie de încărcător sau ridicare curând
- **Indicatorul de blocare este ultimul raport IoT** — poate fi cu câteva secunde în urmă; folosește _Send command → Lock_ dacă trebuie să garantezi starea pe dispozitiv
