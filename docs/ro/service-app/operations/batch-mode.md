# Modul Batch — Gruparea mai multor vehicule într-o coadă

Modul Batch (`/batch`) adună mai multe vehicule într-o singură coadă, ca să le poți vedea unul lângă altul și să le parcurgi fără să cauți din nou fiecare vehicul. Îl accesezi din ecranul de start, sau din link-ul de scanare din starea goală a [hărții flotei](../fleet/fleet-map.md).

**Citește asta întâi:** modul Batch este o listă de lucru, nu un instrument de comenzi bulk. **Butoanele de acțiune de grup din partea de jos a ecranului nu sunt disponibile momentan în aplicație.** Acționezi asupra fiecărui vehicul din propria lui [pagină de vehicul](../fleet/vehicle-controls.md).

## Adăugarea vehiculelor

1. Deschide modul Batch.
2. Scanează codul QR al unui vehicul — scanner-ul este același folosit de harta flotei, deci se aplică aceleași reguli de căutare (etichetă, VIN sau IMEI).
3. Fiecare scanare reușită adaugă vehiculul la coadă, în starea **idle**.
4. Repetă pentru fiecare vehicul pe care vrei să-l ai în listă.

Cozile lungi rămân responsive, deci nu există niciun motiv practic să ții lista scurtă, în afară de propriul tău plan de tură.

## Citirea cozii

Fiecare rând arată:

| Element                | Cum îl citești                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| **Label**               | Codul vehiculului                                                                            |
| **Battery bar**         | Roșu la 10% sau mai puțin, portocaliu la 20% sau mai puțin, amber la 40% sau mai puțin, verde peste 40% |
| **Tracker battery**     | Încărcarea proprie a tracker-ului                                                            |
| **Connectivity icon**   | Dacă tracker-ul este online sau offline                                                     |
| **Status**              | Statusul curent al vehiculului                                                               |
| **Row state**           | idle, running, ok sau failed                                                                 |

Un rând failed arată mesajul lui de eroare în locul telemetriei, ca să vezi ce a mers greșit fără să părăsești coada.

**Atingerea oricărui rând deschide pagina acelui vehicul** — așa acționezi de fapt asupra unui vehicul: le pui în coadă aici, apoi le lucrezi unul câte unul.

## Eliminarea vehiculelor

- **Iconița de coș de gunoi de pe un rând** elimină acel vehicul din coadă. Nu trimite nimic vehiculului — eliminarea afectează doar lista ta.
- **Iconița de coș de gunoi din header** golește întreaga coadă, după o confirmare. Este dezactivată cât timp batch-ul este marcat ca running.

## Acțiuni de grup

Cinci butoane stau în partea de jos a ecranului: o rotiță de settings, unlock, un clopoțel, un fulger și layers. **Aceste acțiuni de grup nu sunt disponibile momentan în aplicație.** Atingerea uneia nu trimite nimic către niciun vehicul.

Pentru a debloca, a da beep, a schimba o baterie sau a trimite o comandă către tracker, deschide vehiculul din coadă și folosește comenzile de pe [pagina vehiculului](../fleet/vehicle-controls.md):

- Blocarea și deblocarea — **Ride Mode**
- Sunetul de localizare — **Beep**
- [Schimbarea bateriei](battery-swap.md) — secvența cronometrată de schimbare
- Comenzile producătorului — sheet-ul **Commands**

## Probleme comune

| Simptom                                        | Ce înseamnă                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------------- |
| Apăsarea unei acțiuni de grup pare să nu facă nimic | Corect — acțiunile de grup nu sunt disponibile momentan. Lucrează fiecare vehicul din pagina lui |
| Butonul clear-all este estompat                | Batch-ul este marcat ca running                                                    |
| Un rând nu arată baterie sau conectivitate     | Acele valori sunt necunoscute pentru acel vehicul — nu zero                        |
| Un vehicul scanat nu a apărut                  | Codul nu s-a rezolvat. Regulile sunt aceleași ca pe harta flotei: etichetă, VIN sau IMEI |

## Sfaturi

- **Construiește coada la începutul unei rute.** A scana zece vehicule într-o curte, o singură dată, bate căutarea lor una câte una mai târziu.
- **Folosește culorile bateriei pentru a-ți ordona munca** — roșiile primele, sunt cele pe care le va raporta următorul rider.
- **Coada este doar a ta**, deci eliminarea unui rând nu schimbă niciodată nimic pentru colegi sau pentru vehicul.
- **Pentru operațiuni la nivelul întregii flote, folosește dashboard-ul.** Schimbările bulk de status, etichetele bulk și comenzile bulk trăiesc în [lista de vehicule din dashboard](../../operations/fleet/vehicles.md#acțiuni-bulk).
