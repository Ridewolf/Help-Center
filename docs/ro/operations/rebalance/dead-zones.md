# Rebalance — Dead Zones

Pagina Dead Zones (`/rebalance/dead-zones`) este **panoul de targetare al operațiunilor de teren**: unde inventarul stă idle, cât te costă asta în venit, și ce zone trebuie vizitate următoarea de duba de rebalansare.

Spre deosebire de pagina [Analitică — Rebalance](runs.md), care rezumă activitatea echipei de teren în timp, această pagină este forward-looking: răspunde la _unde mergem acum?_

Permisiune necesară: operator autentificat (ruta verifică doar _requiresAuth_, fără ID specific de permisiune).

> Notă — la momentul scrierii, endpoint-ul backend `/rebalance/dead-zones` nu este încă live. Pagina se randează cu KPI mock (fără zone în tabel), iar acțiunile per-rând (_Create run_, _Set park time limit_, _Dynamic pricing_, _Zone surgery_, _Mark no-parking_, _Reduce supply target_, _A/B experiment_) sunt momentan dezactivate. Filtrele, KPI-urile și layout-ul tabelului funcționează — așteaptă doar backend-ul.

## Ce înseamnă "dead zone"

O **dead zone** este o arie urbană unde vehiculele stau prea mult parcate fără să fie închiriate. Pagina le identifică și le clasifică ca echipa de teren să știe ce clustere să spargă primele.

Sistemul suportă două moduri de a bucketiza harta:

- **Owner zones** — poligoanele tale configurate din [Setări — Zone](../../settings/infrastructure/zones.md)
- **H3 grid** — grila hexagonală de la Uber, folosită pentru analiză mai fină sau zone-agnostic

Comutatorul e în blocul de filtre; tabelul randează aceleași coloane în ambele cazuri.

## Rândul KPI (sus)

Un rând de cinci carduri KPI rezumă situația dead zones pentru ce ai filtrat.

| KPI                 | Ce arată                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------- |
| **Dead zones**      | Număr de zone / celule marcate ca dead acum                                              |
| **Lost / day**      | Venit pierdut estimat pe zi — suma `lostRevenuePerDay` pe zonele filtrate                |
| **Devices trapped** | Total dispozitive idle blocate în dead zones — ținta ta fizică de pickup                 |
| **Avg dwell**       | Dwell time mediu (minute) pe dead zones — cât stă un vehicul înainte de mutare           |
| **Weekly progress** | % schimbare vs săptămâna trecută — negativ = se înrăutățește; pozitiv = se îmbunătățește |

Fiecare KPI se actualizează cu filtrele; folosește-le ca un single-number gut-check înainte de a intra în listă.

## Moduri — Map vs Table

Un comutator în dreapta sus schimbă între două prezentări ale acelorași date:

- **Map** — vedere geografică a dead zones peste harta orașului (momentan placeholder _coming soon_)
- **Table** — grila de date de mai jos, cu toate coloanele și context per-rând

Filtrele se aplică ambelor moduri. _Table_ e default; _Map_ e cablat dar randarea geografică este încă în lucru.

Lângă comutator se află controlul _Auto-refresh_ — pornește-l ca să re-polezi datele la interval (util pentru live-ops).

## Filtre

Blocul are patru controale; toate AND-uite:

| Filtru        | Tip      | Opțiuni                                                                                |
| ------------- | -------- | -------------------------------------------------------------------------------------- |
| **City**      | Dropdown | _All cities_ / _Moscow_ / _Saint Petersburg_ — îngustează la un singur oraș de operare |
| **Severity**  | Dropdown | _All_ / _Low_ / _Medium_ / _High_ / _Critical_ — pe baza zone severity score           |
| **Zone type** | Dropdown | _Owner zones_ / _H3 grid_ — ce bucketizare să folosească                               |
| **Search**    | Text     | Text liber — match pe numele zonei / district                                          |

Un buton _Clear all_ în dreapta cardului de filtre resetează toate controalele într-un click.

## Coloane

Vederea Table are nouă coloane. Click pe rând deschide insight drawer (acum arată un toast cu numele zonei ca placeholder).

| Coloană              | Conținut                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Zone / Cell**      | Numele zonei plus orașul și district-ul dedesubt; pentru modul H3 — hex ID                        |
| **Idle ratio**       | % din timpul cât zona are dispozitive idle, colorat: verde `< 25%`, galben `25–40%`, roșu `≥ 40%` |
| **Dwell**            | Dwell time median în minute, cu _p90_ dedesubt                                                    |
| **Avg idle devices** | Număr mediu de vehicule idle în zonă, cu _Target_ pentru comparație                               |
| **Starts**           | Porniri de cursă în zonă pe _last 24h_ / _last 7d_ / _last 30d_                                   |
| **Conversion**       | Porniri per dispozitiv idle pe oră — verde `≥ 0.30`, galben `0.15–0.30`, roșu `< 0.15`            |
| **Oversupply**       | Dispozitive peste target — pozitiv = prea multe, negativ = prea puține; pozitiv apare roșu        |
| **Lost / day**       | Venit pierdut estimat doar pentru această zonă                                                    |
| **Last seen idle**   | Când zona a avut ultima dată dispozitive idle — formatat în locale                                |

Rândurile sunt clickable; sortarea pe coloane nu e încă cablată în această iterație.

## Acțiuni per-rând

Fiecare rând are un click handler care arată un toast cu numele zonei. **Meniul de acțiuni (per row)** complet este implementat în cod dar momentan dezactivat în așteptarea API-ului. Acțiunile planificate pentru referință — vor apărea într-un meniu cu trei puncte în dreapta fiecărui rând odată activate:

| Acțiune planificată      | Ce va face                                                                |
| ------------------------ | ------------------------------------------------------------------------- |
| **Create run**           | Deschide rebalance run builder pre-populat cu această zonă                |
| **Set park time limit**  | Strânge timpul maxim de parcare în zonă                                   |
| **Dynamic pricing**      | Aplică pârghii de preț pentru a atrage / descuraja porniri sau finalizări |
| **Zone surgery**         | Editează limita zonei (split, merge, reshape)                             |
| **Mark no-parking**      | Convertește zona în no-parking pentru a împinge vehiculele afară          |
| **Reduce supply target** | Scade ținta de dispozitive ca sistemul să nu mai trimită vehicule aici    |
| **A/B experiment**       | Setează un experiment controlat pe o strategie de remediere               |

Până se livrează endpoint-ul, tratează tabelul ca **read-only insight surface** — combină-l cu lista Vehicule pentru a aplica acțiuni individuale.

## Stări empty / loading

- **Loading** — un spinner cu "Loading dead zones…" cât e interogat backend-ul
- **Error** — banner _Alert_ cu buton _Try again_ dacă cererea eșuează
- **Empty** — o iconiță centrată _AlertTriangle_ cu "No dead zones"; aceasta este **starea așteptată azi** pentru că endpoint-ul nu întoarce date

## Workflows tipice

- **Planificare de dimineață** — Sortează tabelul după _Lost / day_ (vizual azi; coloane sortabile vin): alege top 3 zone pentru run-urile de azi
- **Severity triage** — Filtru _Severity = Critical_ pentru a vedea doar cele mai grave, apoi deschide fiecare zonă pentru context
- **City-by-city ops** — Filtru _City_ când operezi în multi-city; revizuiește numărul și total lost revenue separat
- **Cross-reference cu flota** — Folosește _Devices trapped_ din rândul KPI, apoi sari la [Lista de vehicule](../fleet/vehicles.md) filtrată pe zonă pentru a vedea vehiculele concrete
- **Pereche cu analitica** — Compară numerele live de aici cu secțiunile Dead Zones / Idle Devices din [Analitică — Rebalance](runs.md) și [Analitică vehicule](../../analytics/reports/vehicles.md) pentru a confirma trend-ul

## Tips

- **Conversion e cea mai operațională coloană** — conversion mică (roșu) cu oversupply mare înseamnă că rebalansarea zonei _nu va ajuta_; ai supply corect, dar cererea nu există
- **Idle ratio vs avg idle devices** — _idle ratio_ e time-weighted (cât de des e zona idle), _avg idle devices_ e count-weighted (câte stau). Ambele roșii = cel mai puternic semnal de dead-zone
- **_Target_ de sub _Avg idle devices_ vine din configul zonei** — dacă e setat greșit, fiecare zonă va părea dead; verifică în [Setări — Zone](../../settings/infrastructure/zones.md)
- **H3 grid e util pentru orașe fără zone** — când nu ai definit încă operator zones, H3 îți dă un bucket geografic default
- **Weekly progress e indicatorul "câștigăm?" al paginii** — dacă numărul de dead zones crește dar revenue lost scade, echipa de teren atacă zonele cu valoare cea mai mare primele (semn bun)
- **Handler-ele de acțiuni sunt stub-uri** — click pe rând doar emite un info-toast acum; drawer-ul / dialogurile reale apar când backend-ul e gata
