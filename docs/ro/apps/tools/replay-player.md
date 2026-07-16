# Replay Player

Replay Player (`/apps/replay-player`) este un instrument forensic care animează traseul GPS al unui vehicul de-a lungul unei zile — sau ruta completă a unei singure curse — pe hartă. Folosește-l pentru investigarea incidentelor, validarea reclamațiilor riderului, auditul rutelor neobișnuite, sau pur și simplu să urmărești mișcarea flotei.

Nu este o hartă în timp real (pentru asta vezi dashboard-ul Realtime) — aici sunt replate **coordonate istorice** din backend cu scrubbing complet pe timeline.

Permisiune necesară: **Replay Player** (`k7m8n9`).

## Layout

Pagina este împărțită într-un sidebar stâng (selectoare + panouri info) și o zonă mare de hartă cu o bară de controale jos:

| Zonă          | Lățime | Conținut                                                                |
| ------------- | ------ | ----------------------------------------------------------------------- |
| **Sidebar**   | 320 px | Tabs selector (By Vehicle / By Ride), panou(ri) info per vehicul        |
| **Hartă**     | flex   | Hartă MapLibre cu polilinia traseului, marker Start / End, cursor live  |
| **Controale** | jos    | Play / pause, dropdown viteză, slider timeline, readout elapsed / total |

## Controale (sidebar)

Sidebar-ul controlează **ce** se redă. Are două tab-uri care comută modelul de selecție.

### Tab By Vehicle

Redă traseul de zi întreagă al unuia sau mai multor vehicule (pentru orice dată pe care o alegi):

- **Vehicles** — multi-select până la **5** vehicule. Tastează pentru a căuta, filtrează lista după tag-uri din dropdown-ul de mai jos.
- **Date** — popover calendar; default azi. Replay-ul acoperă toată ziua locală pentru data aleasă.
- **Tags** — restricționează dropdown-ul de vehicule la cele care poartă oricare din tag-urile selectate. Util la flote mari.
- **Load** — preia în paralel coordonatele zilei pentru toate vehiculele selectate și le randează.

Când încarci mai multe vehicule, fiecare primește propria polilinie (colorată după viteză) și propriul marker mobil pe hartă, plus un card info dedicat în sidebar.

### Tab By Ride

Redă coordonatele unei singure curse în loc de o zi întreagă:

- **Vehicle** (opțional) — single-select; restrânge lista de curse de mai jos
- **Date** (opțional) — popover calendar; filtrează cursele la o singură zi. Goleșe pentru a vedea toate datele.
- **Tags** (opțional) — filtrează lista de curse după tag-uri vehicul
- **Lista de curse** — scrollabilă, paginată, cu cursele care se potrivesc filtrelor de mai sus. Fiecare card arată ora de start, status, durată și distanță.

Click pe un card de cursă auto-încarcă imediat coordonatele — nu e nevoie de buton Load separat.

## Timeline (bara de jos)

Bara de controale se întinde pe lățimea hărții:

| Control             | Ce face                                                                                |
| ------------------- | -------------------------------------------------------------------------------------- |
| **Play / Pause**    | Pornește sau pune pauză animația                                                       |
| **Dropdown viteză** | Alege multiplicatorul de viteză (vezi mai jos)                                         |
| **Slider timeline** | Scrub în orice punct al replay-ului; harta se actualizează instant                     |
| **Elapsed / Total** | `mm:ss` (sau `h:mm:ss` pentru durate mai lungi de o oră) — timp scurs și durata totală |

Când sunt încărcate mai multe vehicule, slider-ul acoperă intervalul **global** start-end al uniunii tuturor track-urilor. Track-urile care nu au început încă la timpul curent pur și simplu nu au marker pe hartă.

## Hartă

Harta folosește stilul de hartă al temei curente (vezi [Teme](../../features/ux/themes.md)). Pentru fiecare track încărcat:

- O **polilinie** este desenată colorată după viteză — verde pentru lent, portocaliu pentru mediu, roșu pentru rapid
- Un **marker Start verde** este plasat la primul punct
- Un **marker End roșu** este plasat la ultimul punct
- Un **marker vehicul** se mișcă de-a lungul liniei pe măsură ce timeline-ul se redă

Controalele hărții sunt în colțul dreapta-sus (stivă verticală):

| Buton             | Ce face                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **Zoom in / out** | Zoom standard al hărții                                                                           |
| **Reset bearing** | Rotește harta înapoi la north-up dacă ai înclinat-o / rotit-o                                     |
| **Fit bounds**    | Face zoom / pan ca să încapă tot(e) traseul/traseele — util după ce un replay lung deviază camera |
| **Fullscreen**    | Pune harta pe tot ecranul; bara de controale rămâne jos                                           |

## Viteză de redare

Dropdown-ul de viteză oferă opt presetări: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** redă în timp real — o cursă de 20 min se redă în 20 min
- **128x** comprimă o zi de 8 ore la aprox. 4 min
- Viteza se poate schimba mid-playback; animația continuă lin de unde era

Folosește viteze mai mari (32x / 64x / 128x) pentru replay-uri de zi întreagă pe vehicul, viteze mai mici (1x / 2x / 4x) pentru forensic de cursă unde vrei să vezi exact unde era riderul în fiecare secundă.

## Panou info per vehicul

Fiecare vehicul încărcat primește un mic card în sidebar care se actualizează live pe măsură ce replay-ul se redă:

| Câmp            | Ce arată                                                                      |
| --------------- | ----------------------------------------------------------------------------- |
| **Speed**       | Viteza curentă interpolată în km/h (color-coded verde / galben / roșu)        |
| **Coordinates** | Lat / lng curent la 6 zecimale                                                |
| **Distance**    | Distanța cumulativă parcursă până acum, în km (haversine, calculat în client) |
| **Point**       | Indexul punctului curent / total puncte (cât de departe în dataset)           |

Când redarea nu a început sau nu sunt date încărcate, cardul arată em-dash-uri.

## Stări empty / loading

- **Fără selecție** — zona hărții arată o iconiță play și textul "Select a vehicle and date or ride to start replay"
- **Loading** — un spinner centrat cu "Loading coordinates..." peste hartă
- **Fără date** — dacă data / cursa aleasă nu are puncte de coordonate, un toast warning spune "No coordinate data found for this selection" iar harta rămâne goală
- **Chunk hartă eșuat** — harta este un chunk lazy (~1 MB); dacă încărcarea eșuează (deploy vechi, offline), apare un toast error care invită la refresh

## Workflow-uri tipice

- **Investighează o reclamație** — comută pe By Ride, caută cursa riderului, click → urmărește ruta la 4x ca să vezi unde a mers vs ce a pretins
- **Audit pe un vehicul "pierdut"** — By Vehicle, alege unitatea, data de azi → redă la 128x ca să vezi toată ziua în secunde; ultima poziție a markerului e unde se află acum
- **Compară două vehicule** — By Vehicle, selectează două unități pe rute similare, aceeași zi → ambele polilinii și ambele markere se randează împreună pentru comparație vizuală
- **Identifică ora unui eveniment** — încarcă o cursă → trage slider-ul la timestamp-ul dintr-un ticket / log → citește coordonatele din panoul info
- **Detectează viteze excesive** — încarcă o zi de vehicul → caută segmente **roșii** de polilinie → trage slider-ul acolo pentru confirmare

## Tips

- **Max 5 vehicule** simultan — UI-ul limitează multi-select-ul ca să mențină performanța hărții. Pentru mai multe, sesiuni separate.
- **Folosește Fit Bounds după un replay lung** — playback-ul urmărește markerul, ceea ce face camera să deviaze; un click pe Fit Bounds re-încadrează tot traseul.
- **Culorile vitezei nu sunt legate de tarif** — sunt pur indicatori vizuali pe baza vitezei GPS observate (>15 km/h galben, >30 km/h roșu). Compară cu _speed mode_ al vehiculului din pagina de detaliu pentru context.
- **Slider-ul scruburi în ambele direcții** — trage înapoi pentru rewind. Combinat cu viteză mică, poți parcurge pas-cu-pas segmentele complicate.
- **Fără stare în URL** — selecțiile nu se persistă în URL, deci nu poți partaja un deep link. Fă screenshot-uri dacă vrei să marchezi un moment.
- **Combină cu [Detaliu Cursă](../../operations/trips/ride-detail.md)** — pagina de detaliu cursă are o hartă statică cu evenimente; replay player-ul adaugă dimensiunea temporală peste ea.
