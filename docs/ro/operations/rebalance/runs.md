# Rebalance — Runs

Pagina Rebalance Runs (`/rebalance/runs`) este **log-ul operațional al fiecărui rebalance trip**: cine a condus ce dubă, din ce depou a plecat, câte trotinete și baterii sunt la bord, dacă e la timp și unde au mers lucrurile prost.

Un **run** este o tură de muncă de teren — un șofer, o dubă, un depou de origine, o listă ordonată de stop-uri și o fereastră ETA planificată. Pagina permite dispecerilor să monitorizeze run-uri active și să revizuiască cele finalizate.

Această pagină este detaliul per-trip ce completează summary-ul de nivel înalt [Analitică — Rebalance](runs.md) și panoul orientat pe locație [Rebalance — Dead Zones](dead-zones.md).

Permisiune necesară: operator autentificat (ruta verifică doar _requiresAuth_, fără ID specific de permisiune).

> Notă — la momentul scrierii, endpoint-urile CRUD `/rebalance/runs` nu sunt încă live. Pagina randează blocul de filtre, rândul KPI și layout-ul tabelului cu KPI mock și listă goală. _Create run_, _Search_, _Auto-refresh_ și meniul de acțiuni per-rând (_Dispatch_, _Reassign_, _Reoptimize_, _Print sheet_, _Export_, _Edit_, _Cancel_) sunt cablate în cod dar comentate în așteptarea backend-ului. Click pe un rând navighează la `/rebalance/runs/:id` dar pagina de detaliu nu e parte din acest build.

## Rândul KPI (sus)

Un rând de cinci carduri KPI rezumă run-urile de azi.

| KPI                | Ce arată                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| **Active runs**    | Run-uri momentan în _Dispatched_ / _In progress_ / _Paused_                                      |
| **On-time %**      | % de run-uri care prind fereastra ETA planificată; verde up ≥ 90%, roșu down sub                 |
| **Late runs**      | Număr de run-uri marcate _Late_ pe SLA — indicatorul dispecerului pentru "cui îi trebuie ajutor" |
| **Total km today** | Distanță cumulativă parcursă de toate dubele de rebalansare azi                                  |
| **Battery swaps**  | Total schimburi de baterie efectuate de echipa de teren azi                                      |

Cele cinci dau o imagine la o privire a felului în care operațiunea de teren de azi e față de plan.

## Filtre

Patru filtre stau în cardul _Filters_; toate AND-uite. Un buton _Clear all_ în dreapta resetează blocul.

| Filtru            | Tip      | Opțiuni                                                                                |
| ----------------- | -------- | -------------------------------------------------------------------------------------- |
| **Status**        | Dropdown | _All_ / _Planned_ / _Dispatched_ / _In progress_ / _Paused_ / _Completed_ / _Canceled_ |
| **SLA risk**      | Dropdown | _All_ / _On track_ / _At risk_ / _Late_ — flag-ul de întârziere al run-ului            |
| **City**          | Dropdown | _All cities_ / _Moscow_ / _Saint Petersburg_                                           |
| **Has incidents** | Dropdown | _All_ / _Yes_ / _No_ — incidente înregistrate pe run                                   |

Un control _Search_ free-text (după numărul run-ului, șofer sau dubă) e implementat dar momentan ascuns alături de _Auto-refresh_ și _Create run_ până se livrează endpoint-ul.

## Coloane

Tabelul are nouă coloane vizibile. Rândurile sunt clickable — navighează la `/rebalance/runs/:id` (vedere de detaliu nu e în acest build).

| Coloană               | Conținut                                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Run #**             | Identificator citibil de om (ex. `RUN-2026-0517-001`)                                                                       |
| **Driver / Van**      | Avatar + nume + telefon șofer; model dubă + plate number dedesubt                                                           |
| **Depot / City**      | Numele depoului de origine și orașul                                                                                        |
| **Status**            | Status pill — gri _Planned_, albastru _Dispatched_, verde _In progress_, galben _Paused_, teal _Completed_, roșu _Canceled_ |
| **Stops**             | Progres ca `done / total`, cu _Failed: N_ dedesubt roșu când un stop a eșuat                                                |
| **Payload**           | Trotinete încărcate (`🛴 in / capacity`) și baterii încărcate (`🔋 charged + depleted / capacity`)                          |
| **Planned**           | Timp ETA start–end + distanță planificată (km) și durată (min)                                                              |
| **SLA risk**          | Risk pill — verde _On track_, galben _At risk_, roșu _Late_                                                                 |
| **Created / Updated** | Dată creare sus, ultima actualizare dedesubt                                                                                |

Coloana de acțiuni (meniu cu trei puncte) e implementată dar comentată până la endpoint-urile CRUD; vezi _Acțiuni per-rând_ mai jos pentru setul planificat.

## Referință status

Un run e exact într-un singur status; status-ul determină ce acțiuni de dispatch sunt disponibile:

| Status          | Înțeles                                           |
| --------------- | ------------------------------------------------- |
| **Planned**     | Creat și programat dar nu încă trimis la șofer    |
| **Dispatched**  | Trimis la șofer / dubă — așteaptă plecarea        |
| **In progress** | Duba se mișcă și / sau face stop-uri              |
| **Paused**      | Șoferul a pus pauză pe run (pauză, incident etc.) |
| **Completed**   | Toate stop-urile încercate, run închis            |
| **Canceled**    | Anulat înainte de finalizare                      |

## Referință SLA risk

Flag în timp real dacă run-ul va prinde fereastra planificată:

| Risk         | Înțeles                                                  |
| ------------ | -------------------------------------------------------- |
| **On track** | Ritmul curent se potrivește cu ETA planificat            |
| **At risk**  | Tinde spre întârziere, dar încă în distanță recuperabilă |
| **Late**     | Planul deja ratat — necesită atenția dispecerului        |

Folosește _SLA risk = Late_ ca primul filtru al dispecerului dimineața.

## Acțiuni per-rând (planificate)

Fiecare rând va avea un meniu cu trei puncte în dreapta cu acțiunile de mai jos; azi coloana e ascunsă în așteptarea API-ului.

| Acțiune         | Ce va face                                                      |
| --------------- | --------------------------------------------------------------- |
| **View**        | Deschide pagina de detaliu run la `/rebalance/runs/:id`         |
| **Dispatch**    | Mută un run _Planned_ în _Dispatched_, notificând șoferul       |
| **Reassign**    | Schimbă șoferul și / sau duba pe run                            |
| **Reoptimize**  | Re-rulează optimizatorul de rută pe stop-urile rămase           |
| **Print sheet** | Generează o foaie de run printabilă (summary pentru șofer)      |
| **Export**      | Exportă datele run-ului ca fișier (filtre / sortare respectate) |
| **Edit**        | Deschide editorul run-ului                                      |
| **Cancel**      | Anulează run-ul — deschide un dialog de confirmare              |

## Stări empty / loading

- **Loading** — un spinner cu "Loading runs…" cât e interogat backend-ul
- **Error** — banner _Alert_ cu buton _Try again_ dacă cererea eșuează
- **Empty** — o iconiță centrată _Truck_ cu "No runs found"; aceasta este **starea așteptată azi** pentru că endpoint-ul nu întoarce items

## Workflows tipice

- **Sweep de dispatch de dimineață** — Filtru _Status = Planned_, sortează după dată de creare, dispatch pe fiecare în ordine
- **Monitorizare live** — Filtru _Status = In progress_, apoi _SLA risk = Late_ pentru a aduce la suprafață șoferii care au nevoie de ajutor; odată activat, _Auto-refresh_ menține vederea proaspătă
- **Revizuire end-of-day** — Filtru _Status = Completed_, scanează coloana _Stops_ pentru run-uri cu stop-uri eșuate, click în fiecare pentru debrief incident
- **City-by-city** — Filtru _City_ când operezi multi-city; cross-check numerele cu pagina [Analitică — Rebalance](runs.md)
- **Incident triage** — Filtru _Has incidents = Yes_ aduce la suprafață fiecare run cu probleme azi
- **Verificare capacitate** — Privește coloana _Payload_ pe rânduri _In progress_; dubele aproape de capacitate vor reveni curând la depou

## Tips

- **Numerele de run sunt identificatori stabili** — partajează-le cu echipa de teren pentru coordonare clară ("uită-te la RUN-2026-0517-003")
- **Coloana Stops spune adevărul la o privire** — `4/7` înseamnă patru făcute, trei rămase; un _Failed: N_ roșu dedesubt = necesită follow-up
- **Payload "depleted" contează** — un count mare de baterii depleted înseamnă duba e plină de baterii moarte și ar trebui să treacă pe la încărcător
- **Created vs Updated** — _Updated_ ticăie de fiecare dată când șoferul acționează pe run; un _Updated_ vechi pe un rând _In progress_ = șoferul nu a făcut check-in de mult
- **Status _Paused_ nu e o eroare** — șoferii pauzează pentru pauze, incidente și interacțiuni cu riderii; run-urile paused de mult merită un telefon
- **Până se livrează endpoint-ul, tratează această pagină ca un preview de layout / UX** — structura, filtrele și limbajul vizual sunt finale; datele din spate nu
