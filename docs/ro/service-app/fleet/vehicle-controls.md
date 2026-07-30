# Pagina Vehicul — Comenzi, tickete, defecțiuni și alerte

Pagina vehiculului (`/vehicle/:id`) este suprafața de lucru a operatorului de teren pentru un singur vehicul: telemetrie live sus, butoane de acțiune la mijloc și trei cozi de lucruri de rezolvat. Ajungi aici atingând un marker sau un rând din listă pe [harta flotei](fleet-map.md), scanând un cod QR, sau atingând un rând în [modul Batch](../operations/batch-mode.md).

## Ce arată pagina, în funcție de tipul vehiculului

Când pagina se deschide, încarcă vehiculul, apoi modelul lui:

- **Trotinetele și bicicletele** primesc pagina completă de comenzi descrisă aici.
- **Mașinile** primesc o pagină doar cu status, fără comenzi de la distanță.

Dacă informațiile despre model nu pot fi încărcate, pagina se deschide totuși — cade înapoi (fallback) pe layout-ul de trotinetă, în loc să te lase pe un spinner. Dacă vehiculul în sine nu poate fi încărcat, primești un ecran de eroare cu un buton de revenire.

## Tab-uri

Patru tab-uri cu un indicator glisant:

| Tab         | Conținut                                          |
| ----------- | ---------------------------------------------------- |
| **Scooter** | Telemetrie live și butoanele de acțiune              |
| **Tickets** | Tichetele de suport deschise, raportate de rideri    |
| **Faults**  | Erorile raportate de tracker                         |
| **Alerts**  | Avertismentele raportate de tracker                  |

## Tab-ul Scooter — telemetrie

Sus stă un badge de blocare (**verde** = locked, **amber** = unlocked) și badge-ul de status al vehiculului, apoi aceste rânduri:

| Rând                | Cum îl citești                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| **QR / label**       | Codul de pe sticker-ul vehiculului                                                              |
| **Network**          | Calitatea semnalului mobil ca fracție din 36 când e online, sau timpul de la ultimul semnal, când e offline |
| **Battery**           | Procentul bateriei vehiculului — roșu la 10% sau mai puțin, portocaliu la 20% sau mai puțin, amber la 40% sau mai puțin, verde peste 40% |
| **Tracker voltage**   | Bateria proprie a tracker-ului, în volți cu două zecimale — roșu sub 3,6 V, verde la 3,6 V și peste |
| **GPS**               | **Fix** sau **No Fix**                                                                          |

**Tracker voltage** este valoarea pe care operatorii o citesc greșit cel mai des. Este bateria tracker-ului, nu a vehiculului: o citire roșie acolo înseamnă că tracker-ul e pe cale să se stingă, chiar dacă bateria principală arată perfect sănătoasă. Marchează acele vehicule pentru ridicare înainte să nu mai raporteze deloc.

## Tab-ul Scooter — cele cinci butoane de acțiune

Fiecare acțiune cere confirmare înainte de a fi trimisă și îți dă o vibrație haptică când pleacă.

### 1. Status

Deschide un sheet cu nouă statusuri, fiecare cu o iconiță și o scurtă descriere, și un checkmark pe cel curent:

- Available
- Discharged
- Charging
- Needs Investigation
- Maintenance
- Not Ready
- Transportation
- Storage
- Stolen

Alegerea **Charging** rulează și întreaga secvență de [schimbare a bateriei](../operations/battery-swap.md) — așteaptă ca vehiculul să se deblocheze, să aștepte, apoi să se blocheze din nou. Nu este doar o schimbare de etichetă.

### 2. Ride Mode (blocare / deblocare)

- **Deblocarea** trimite comanda de deblocare, ridică limita de viteză la 25 km/h, pornește motorul și începe urmărirea cursei.
- **Blocarea** oprește urmărirea, oprește motorul, restaurează limita de viteză de parcare de 6 km/h și blochează vehiculul.

Confirmă mereu că badge-ul de blocare devine verde înainte să pleci.

### 3. Beep

Emite un singur beep de localizare, cu o notificare de succes sau eroare. Folosește-l pentru a localiza precis un vehicul care e aproape dar din raza vizuală — sau folosește [Find Scooter](../operations/finder.md) pentru o căutare ghidată.

### 4. Battery Swap

Pornește secvența cronometrată de schimbare și arată numărătoarea inversă pe fața butonului. Vezi [Schimbarea bateriei](../operations/battery-swap.md) pentru fluxul complet.

### 5. Commands

Deschide un sheet cu comenzile suportate de tracker-ul acelui vehicul, grupate pe categorii. Unele comenzi necesită o valoare pe care o tastezi înainte de trimitere.

## Tab-ul Tickets

Listează tichetele de suport deschise, depuse de rideri împotriva acestui vehicul. Fiecare rând arată:

- O iconiță de fulger pentru o problemă electrică, sau o cheie pentru orice altceva
- Un badge de status violet
- Descrierea, limitată la două rânduri
- Tipul plângerii
- Cât timp a trecut de la creare

Rândurile cu prioritate critical și high poartă și un badge roșu de prioritate — rezolvă-le pe acelea primele.

Atingerea unui rând deschide ticket-ul într-un modal, același pe care îl folosește drawer-ul de tickete de pe harta flotei.

**Resolve All** cere confirmare, apoi închide fiecare ticket deschis de pe vehicul. Tichetele închise dispar imediat din listă, iar tu primești fie "X ticket(s) resolved", fie, când unele nu au putut fi închise, "Resolved X, failed Y". Butonul este dezactivat cât timp o închidere este în curs și când nu există nimic deschis.

Când tab-ul este gol, scrie "No open tickets for this vehicle".

## Tab-ul Faults

Faults sunt evenimente de eroare ridicate chiar de tracker. Intrările de zgomot și cele fără eroare sunt filtrate, iar cea mai recentă defecțiune apare prima.

- **Defecțiunile active** — încă neprocesate și încă în interiorul ferestrei de alarmă — au bordură și fundal roșii.
- **Defecțiunile procesate** devin gri și capătă un badge **Resolved**.

Fiecare rând arată o iconiță pentru tipul defecțiunii (un triunghi generic de avertizare când tipul nu are o iconiță specifică), titlul defecțiunii și cât timp a trecut de atunci.

**Clear All** cere confirmare, apoi marchează fiecare defecțiune activă drept procesată, una câte una, cu o scurtă pauză între ele — golirea unei liste lungi este deliberat non-instantanee, deci dă-i un moment. Lista se actualizează pe măsură ce avansează, iar odată ce nu mai rămâne nimic neprocesat, vehiculul iese din lista de alarme a aplicației. Primești "X fault(s) cleared" sau "Cleared X, failed Y". Butonul este dezactivat când nu există defecțiuni active.

Stare goală: "No faults recorded".

## Tab-ul Alerts

Identic ca structură și în comportamentul **Clear All** cu Faults, dar pentru avertismente în loc de erori. Stare goală: "No alerts recorded".

Distincția practică:

- **Faults** — erori ridicate de tracker
- **Alerts** — avertismente ridicate de tracker
- **Tickets** — plângeri depuse de rideri

Toate trei sunt cozi separate; golirea uneia nu o golește pe celelalte.

## Probleme comune

| Simptom                                          | Ce înseamnă                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------------- |
| Un buton de acțiune nu face nimic sau e dezactivat  | O altă acțiune este încă în curs — așteaptă notificarea ei                        |
| Un tab este gol                                     | Chiar nu există nimic deschis pentru acest vehicul; un eșec arată o eroare, nu o stare goală |
| Nicio comandă de la distanță                        | Vehiculul este o mașină, care primește pagina doar cu status                      |
| **Network** arată un timp în loc de o fracție       | Tracker-ul este offline și vezi timpul de la ultimul lui semnal                    |
| **Clear All** pare blocat                           | Procesează defecțiunile una câte una, intenționat; lasă-l să termine              |
| O defecțiune golită revine ca activă                | Tracker-ul a ridicat-o din nou în interiorul ferestrei de alarmă — problema de bază este încă acolo |

## Sfaturi

- **Parcurge telemetria de sus în jos** înainte să atingi o comandă: badge-ul de blocare, network, battery, tracker voltage, GPS îți spun în cinci secunde dacă vehiculul e funcțional sau e de ridicat.
- **Resolve All este per vehicul**, deci e sigur să-l folosești odată ce ai reparat fizic ce descriu tichetele.
- **Golește defecțiunile doar după reparație**, nu înainte — o defecțiune care reapare este o dovadă utilă.
- **Un tracker voltage roșu plus o baterie sănătoasă** este semnătura clasică a "vehiculul e pe cale să dispară de pe hartă".
