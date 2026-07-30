# Harta flotei și căutarea vehiculului prin cod QR

Harta flotei (`/battery-swap`) este ecranul de start al Service App după autentificare: o hartă pe tot ecranul cu flota ta și un rând de butoane de acțiune flotante de-a lungul părții de jos. Orice job de teren începe aici — găsești vehiculul, apoi îl deschizi.

Deschiderea unui vehicul din acest ecran te duce la [pagina vehiculului](vehicle-controls.md), unde stau comenzile. Pentru meniul și setările aplicației, vezi [prezentarea generală a Service App](../basics/overview.md).

## Citirea hărții

Fiecare vehicul este un marker pe hartă. În spatele fiecărui marker, aplicația păstrează valorile de care ai nevoie pe teren:

- Etichetă și status
- Procentul bateriei vehiculului
- Procentul bateriei tracker-ului
- Poziție, direcție și viteză în km/h
- Blocat sau deblocat
- Calitatea semnalului mobil, ca valoare de la 0 la 36
- Statusul GPS și dacă tracker-ul este online
- IMEI-ul tracker-ului

Atinge un marker pentru a deschide acel vehicul.

### Vedere listă

O listă pe tot ecranul urcă peste hartă și arată fiecare vehicul care se potrivește filtrelor curente. Header-ul ei propriu poartă butoanele de revenire la hartă și de deschidere a filtrelor, iar rândul de butoane de acțiune de jos este ascuns cât timp lista este deschisă.

Atingerea unui rând deschide aceeași pagină de vehicul ca atingerea markerului acelui vehicul — folosește oricare vedere e mai rapidă pentru job.

## Filtrarea vehiculelor

Filtrele trăiesc într-un sheet de filtre și **sunt salvate pe dispozitivul tău** — supraviețuiesc închiderii și redeschiderii aplicației. Acesta este cel mai frecvent motiv pentru care un vehicul "dispare": un filtru setat ieri este încă aplicat azi.

Controalele, în ordine:

| Control              | Ce face                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------- |
| **Status chips**     | Filtrare după status; chip-urile sunt colorate să se potrivească cu punctele de status de pe harta live |
| **Battery range**    | Un slider 0–100%                                                                            |
| **Vehicle type**     | Un carusel de tipuri — afișat doar când flota ta are mai mult de un tip de vehicul          |
| **Last signal**      | Presetări: any, 1h, 6h, 24h, 7d — ascunde vehiculele offline mai mult decât fereastra aleasă |
| **Tags**              | Mai întâi etichetele publice, în ordine alfabetică, apoi etichetele private cu o iconiță de lacăt |
| **Search**            | Text liber, se potrivește cu eticheta, VIN-ul sau IMEI-ul                                    |

Două comportamente de reținut:

- **Etichetele multiple folosesc logica AND** — un vehicul trebuie să poarte *fiecare* etichetă selectată pentru a rămâne în rezultate.
- **Etichetele se încarcă discret.** Dacă lista de etichete nu poate fi încărcată, chip-urile pur și simplu nu apar și nu este afișată nicio eroare. Închide și redeschide sheet-ul pentru a încerca din nou.

Culorile de status cu contrast scăzut (precum charging și discharged) primesc text de chip mai închis în modul light, ca să rămână lizibile; modul dark păstrează culoarea vie.

Sheet-ul se redeschide mereu cu filtrele tale salvate deja aplicate.

## Deschiderea unui vehicul prin cod QR

1. Atinge butonul de acțiune **scanner**.
2. Îndreaptă camera spre codul QR al vehiculului. Codurile care identifică deja vehiculul îl deschid imediat; orice altceva este căutat după etichetă, VIN sau IMEI. Când se potrivesc mai multe vehicule, o potrivire exactă de etichetă câștigă.
3. Aplicația deschide pagina acelui vehicul.

În [modul Batch](../operations/batch-mode.md), aceeași scanare adaugă vehiculul în coadă, în loc să îl deschidă.

### Când codul nu poate fi scanat

Folosește alternativa de introducere manuală: scrie **eticheta**, **VIN**-ul sau **IMEI**-ul în modal. Folosește exact aceeași căutare, deci orice ar fi putut deschide scanner-ul se va deschide și prin tastare.

Un cod nerecunoscut arată o eroare de cod invalid. Scanner-ul se închide și singur după un timp, dacă nu se scanează nimic — pur și simplu atinge-l din nou.

## Sertarul de tickete și legenda

- Butonul de acțiune **tickets** deschide un drawer cu tichetele de suport deschise și numărul lor. Este o scurtătură de teren pentru a vedea ce au raportat riderii, separată de coada completă de suport descrisă în [Instrumente de back-office](../tools/back-office-tools.md#suport--tickete).
- Modalul **legend** explică formele markerelor și codificarea prin culoare a statusurilor folosită pe hartă. Deschide-l când o culoare nu îți este familiară, în loc să ghicești.

## Preferințele hărții

Un control din **colțul dreapta-sus al hărții** — nu drawer-ul **Settings** la nivel de aplicație — deschide preferințele hărții. Acesta acoperă:

- Stilul markerului (icon, dot, auto) și dimensiunea markerului
- Overlay-uri: procent baterie, etichete, inele de status, alarme, tickete
- Clustering
- Zone
- Propria ta locație
- Mișcare lină (smooth movement)
- Wake lock (menține ecranul activ cât timp lucrezi)
- Rata de reîmprospătare

Schimbă-le când harta este prea încărcată ca să o citești: dezactivează overlay-urile pentru o imagine mai curată, sau activează clustering-ul într-o zonă densă.

## Probleme comune

| Simptom                                    | Ce faci                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Un vehicul pe care îl aștepți lipsește      | Un filtru salvat este încă aplicat — verifică status chips, battery range și mai ales fereastra last-signal |
| Niciun carusel de tip de vehicul în filtre  | Flota ta are un singur tip de vehicul; este normal                                                |
| Niciun chip de etichetă                     | Lista de etichete nu s-a încărcat. Închide și redeschide sheet-ul de filtre pentru a reîncerca    |
| O combinație de etichete nu returnează nimic | Etichetele se combină cu AND — elimină o etichetă                                                 |
| Un cod scanat nu este recunoscut            | Confirmă că acel cod aparține unui vehicul din compania ta, apoi folosește introducerea manuală cu etichetă, VIN sau IMEI |
| Scanner-ul se închide singur                | Expiră după o perioadă de inactivitate — redeschide-l                                              |

## Sfaturi

- **Golește-ți filtrele la începutul unei ture.** Persistă, iar o fereastră last-signal învechită ascunde exact vehiculele pe care ai fost trimis să le găsești.
- **Folosește presetările last-signal pentru a vâna tracker-e moarte** — setează `7d` și caută ce a tăcut.
- **Search acceptă IMEI**, deci un sticker cu doar numărul tracker-ului este suficient pentru a deschide un vehicul.
- **Introducerea manuală nu e o soluție inferioară** — se rezolvă la fel ca scanner-ul, deci folosește-o de îndată ce un cod arată deteriorat.
