# Detaliu vehicul

Pagina de detaliu a vehiculului (`/vehicles/:id`) este atelierul pentru o singură unitate. Folosește-o pentru a vedea date IoT live, a trimite comenzi, a revizui istoricul curselor, a investiga alerte și a executa acțiuni de operator (editare, schimbare locație, marcare pentru mentenanță, generare QR, ștergere).

De obicei ajungi aici cu click pe un rând din [lista de vehicule](vehicles.md).

Permisiune necesară: **Vehicles** (`k7m8n9`). Anumite tab-uri și acțiuni necesită permisiuni suplimentare (notate mai jos).

## Structură

De sus în jos:

1. **Header** — înapoi, etichetă, status, buton _Actions_
2. **Card-uri overview** — baterie, ultim semnal, sănătate IoT, model etc.
3. **Card locație** — o hartă mică cu pin-ul GPS curent
4. **Tab-uri** — Details / Rides / Activity / Alerts / Commands

## Header

Banda de sus identifică vehiculul:

- **Buton înapoi** (`←`) te readuce la listă
- **Eticheta vehiculului** (ex. _RW-001_) și **pilula de status** (Available, In Use etc.)
- **Buton Actions** în dreapta — deschide dialogul de acțiuni

## Acțiuni

Click pe **Actions** deschide un dialog modal cu fiecare acțiune de operator disponibilă. Unele sunt protejate de permisiuni:

| Acțiune                  | Permisiune | Ce face                                                                                                                         |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Edit vehicle**         | `edit`     | Deschide [formularul de editare](vehicle-create-edit.md)                                                    |
| **View route history**   | —          | Deschide un dialog cu coordonatele și traseul GPS recent                                                                        |
| **Mark for maintenance** | —          | Setează rapid statusul la _Maintenance_                                                                                         |
| **Change location**      | —          | Deschide un dialog cu hartă pentru actualizarea manuală a coordonatelor GPS (când IoT tace și operatorul știe unde e vehiculul) |
| **Generate QR code**     | —          | Deschide generatorul QR pentru acest vehicul (etichetă printabilă)                                                              |
| **Delete vehicle**       | `delete`   | Ștergere logică cu dialog de confirmare                                                                                         |

Acțiunile pentru care nu ai permisiune sunt ascunse din dialog.

## Card-uri overview

O grilă de card-uri mici sub header rezumă vehiculul dintr-o privire:

- **Battery** — procentul bateriei trotinetei (și bateria plăcii IoT dacă e raportată separat)
- **Last signal** — când dispozitivul IoT a raportat ultima dată, cu o pilulă de status (Online / Offline / Stale)
- **Lock** — locked / unlocked
- **Model** — nume model, status, imagine
- **GSM / GPS** — status semnal celular și validitate GPS
- **Speed mode** — mod curent de viteză (eco, normal, sport etc., dacă modelul suportă)
- **Voltage** — tensiunea plăcii IoT (câmp ingineresc)

## Card locație

O hartă mică afișează vehiculul ca un singur pin pe ultima coordonată GPS cunoscută, cu zoom automat pe pin. Folosește-o pentru un "unde e acum?" rapid fără a deschide istoricul traseului.

## Tab-uri

Detaliul comută între până la cinci tab-uri (unele sunt protejate de permisiuni):

| Tab          | Permisiune    | Ce conține                                                                               |
| ------------ | ------------- | ---------------------------------------------------------------------------------------- |
| **Details**  | —             | Date complete vehicul — câmpuri IoT, model + tarife, etichete, zone, GSM/GPS, mod viteză |
| **Rides**    | view-rides    | Cursele recente pe acest vehicul (o felie focusată din lista globală de curse)           |
| **Activity** | —             | Log activitate restrâns la acest vehicul (acțiuni operator și sistem)                    |
| **Alerts**   | —             | Erori IoT și alarme grupate, cu paginare (istoric "ce a mers prost")                     |
| **Commands** | `iot-command` | Trimite comenzi IoT direct dispozitivului (lock, unlock, alarm, reboot etc.)             |

### Tab Details

Tab-ul implicit și cea mai profundă vedere a stării vehiculului:

- **Panou IoT** — baterie, voltage, blocare, semnal GSM, validitate GPS, ultim semnal, mod viteză
- **Panou Model** — nume model și imagine, status, etichete moștenite de la model
- **Panou Tarife** — tarifele atașate modelului vehiculului (guvernează prețurile curselor)
- **Panou Etichete** — etichete aplicate acestui vehicul specific (editabile prin _Edit_)
- **Panou Zone** — zonele în care se află vehiculul

Dacă datele IoT nu se încarcă, un banner de eroare apare în acest tab; restul paginii funcționează.

### Tab Rides

Listează cursele recente făcute pe acest vehicul — același format ca lista globală de curse, filtrate doar pentru acest vehicul. Click pe orice rând deschide detaliul cursei.

Tab-ul este ascuns dacă nu ai permisiunea `view-rides` pe acest vehicul.

### Tab Activity

Un **log de activitate** cronologic pentru acest vehicul: fiecare acțiune de operator (editat, status schimbat, șters, etichete actualizate) și fiecare eveniment de sistem (tranziții de status din triggere IoT, rulări automatizări).

Util pentru compliance, responsabilitate și debug al schimbărilor de stare neașteptate.

### Tab Alerts

**Alerte și erori IoT** grupate ridicate de dispozitiv, paginate. Fiecare intrare include:

- Cod și titlu citibil
- Timestamp-uri primă / ultimă apariție
- Frecvență (de câte ori a fost ridicat acest cod)
- Status (active / resolved)

Un buton _Clear_ (acolo unde e suportat) îți permite să marchezi un grup ca rezolvat. Paginarea îți permite să mergi înapoi prin alertele istorice.

### Tab Commands

**Comenzi IoT** directe către dispozitiv, grupate pe categorie (ex. _Lock & unlock_, _Alarm_, _Lights_, _System_). Protejat de permisiunea `iot-command`.

- Alege o comandă și apasă _Send_
- Comanda este trimisă către dispozitivul IoT; timpul de răspuns depinde de semnalul celular
- Istoricul recent al comenzilor apare dedesubt cu status (sent / delivered / failed)

Folosește-l când trebuie să faci ceva ce calea bulk _Send command_ nu acoperă — diagnostic, reboot punctual, unlock manual pentru cazuri de suport.

## Fluxuri tipice

- **Investighează o plângere** — deschide Activity pentru a vedea cine / ce a atins acest vehicul azi; apoi Alerts pentru erori IoT; apoi Rides pentru cursa în cauză
- **Forțează lock sau unlock** — tab Commands → _Send Lock_ sau _Send Unlock_ (necesită `iot-command`)
- **Scoate o unitate pentru service** — _Actions → Mark for maintenance_ (setează statusul); trimite echipa de teren
- **Corectează manual GPS** — _Actions → Change location_ (când dispozitivul IoT tace și știi unde e)
- **Printează un sticker nou** — _Actions → Generate QR code_

## Sfaturi

- **Urmărește tab-ul Alerts** — codurile frecvente sunt avertismente timpurii pentru probleme hardware; rezolvă-le înainte să devină incidente
- **Activity este audit trail-ul tău** — fiecare schimbare de operator este logată aici cu nume și timestamp
- **Comenzile sunt fire-and-forget peste celular** — dacă nu vezi un răspuns într-un minut, dispozitivul poate fi offline; verifică Last signal în overview înainte să retransmiți
- **Etichetele și tarifele vin din două locuri** — etichete la nivel de vehicul (panou Tags, editabil în Edit) suprascriu / completează etichetele la nivel de model (read-only aici, setate în Vehicle Settings)
- **Card-ul de locație e doar ultimul pin** — pentru traseu folosește _Actions → View route history_
