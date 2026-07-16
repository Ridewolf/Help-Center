# Analitică — Plăți

Pagina de analitică plăți (`/analytics/payments`) este **dashboard-ul tău financiar**: KPI-uri și grafice despre bani care intră (top-ups), ies (refunds), sunt taxați (debits) și sănătatea sistemului de plăți.

Diferită de [istoricul de plăți](../../operations/payments/payments.md), care este un registru per-tranzacție — aici datele sunt **agregate** pe un interval, ca să vezi tendințe, scurgeri și anomalii.

Permisiune necesară: **View Payments Analytics** (`w7x8y9`).

## Interval

În partea de sus a paginii — **date-range bar**. Fiecare metrică și grafic respectă acest interval:

- Alege un preset (Azi, Last 7 / 30 / 90 zile, Luna asta / Luna trecută) sau interval custom
- Badge-ul de comparație sub carduri citește "vs perioada anterioară" — pentru _Last 7 days_, comparația = 7 zile dinainte
- Intervalul e sticky pe sesiune: navighezi și revii — selecția e păstrată

## Secțiuni

Pagina este organizată în **șase secțiuni**, fiecare focalizată pe un unghi diferit al plăților:

### 1. Flow

Imaginea de ansamblu — bani in vs bani out.

| KPI            | Ce măsoară                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Top-ups**    | Bani creditați în portofele în acest interval (manual + furnizor)                                                       |
| **Refunds**    | Bani returnați clienților; poartă un badge _Refund rate_ (refunds / debits)                                             |
| **Debits**     | Bani taxați clienților (curse, amenzi). Include un **tag filter** pentru a filtra după o etichetă de client (ex. _VIP_) |
| **Net inflow** | Top-ups − Refunds; pozitiv = float-ul crește                                                                            |

### 2. Quality

Cât de sănătoasă este integrarea cu furnizorul de plăți.

| KPI                 | Ce măsoară                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| **Success rate**    | Completed / toate încercările — numărul tău principal de fiabilitate                              |
| **Failed**          | Numărul tranzacțiilor eșuate în interval                                                          |
| **Pending**         | Numărul încă pending (verifică cu [Pending Webhooks](../../operations/payments/pending-webhooks.md)) |
| **Refunded**        | Numărul debits care au ajuns refunded                                                             |
| **Failure reasons** | Grafic care defalcă eșecurile pe motive (decline / 3DS / network etc.)                            |

Un vârf de _Failed_ + un motiv specific dominând graficul = o avarie sau problemă de integrare de escaladat.

### 3. Balance

Starea fondurilor deținute de operator (portofele rideri) la sfârșitul intervalului.

| KPI               | Ce arată                                                                         |
| ----------------- | -------------------------------------------------------------------------------- |
| **Float**         | Suma tuturor soldurilor pozitive — bani pe care îi ții pentru rideri             |
| **Debt**          | Suma tuturor soldurilor negative — bani pe care riderii ți-i datorează           |
| **Avg balance**   | Sold mediu per client activ                                                      |
| **Users**         | Numărul clienților cu sold non-zero                                              |
| **Buckets chart** | Histogram al clienților după dimensiunea soldului (0–10 / 10–50 / 50–100 / 100+) |

Folosește _Debt_ ca semnal de backlog de colectare — datorie mare = multe amenzi sau debits eșuate de urmărit.

### 4. Patterns

Pattern-uri comportamentale ale top-ups — util pentru marketing / produs.

- **Top-up size histogram** — cum își distribuie riderii top-ups pe sume. Modul histogramei (dimensiunea cea mai frecventă) e dispoziția implicită pentru prompt-urile tale
- **Top-ups by hour** — când în zi reîncarcă riderii. Vârfurile se aliniază de obicei cu vârfurile curselor (commute, seara de weekend)

### 5. Methods

Tabel defalcat după **metodă / furnizor de plată**.

- Coloane: Method (card / balance / wallet etc.), Total amount, Count, Average transaction, Success rate
- Util pentru a detecta furnizori sub-performanți (o metodă cu success rate mic = veriga ta slabă)

### 6. Users

Vedere cohort de clienți — cine te plătește.

| KPI               | Ce măsoară                                                                  |
| ----------------- | --------------------------------------------------------------------------- |
| **Unique payers** | Clienți distincți care au plătit în interval                                |
| **New payers**    | Clienți care au plătit prima oară în acest interval                         |
| **Repeat payers** | Clienți care au plătit de mai multe ori                                     |
| **Top payers**    | Tabel cu cei mai plătitori clienți: nume, sumă, număr curse, link la profil |

## Fluxuri tipice

- **Revizie săptămânală** — preset _Last 7 days_ → derulează prin fiecare secțiune. Orice iese din ribbon-ul de comparație (▲ sau ▼ mare) merită o privire mai adâncă
- **Post-mortem avarie** — setează intervalul la ziua incidentului → Quality → Failure reasons → verifică cu [Payments history](../../operations/payments/payments.md) pentru tranzacțiile reale
- **Tag deep-dive** — cardul Debits → tag-filter → alege _VIP_ → metrica afișează doar acel cohort; compară cu debits totale pentru o cotă rapidă
- **Push colectare** — Balance → _Debt_ → dacă a crescut, sapă clienții individuali prin lista Clients filtrată pe sold negativ
- **Marketing pricing** — Patterns → Top-up size histogram → setează suggested top-up din aplicație la bucket-ul cel mai popular

## Sfaturi

- **Ribbon-ul de comparație e mai util decât numărul absolut** — absolut depinde de mărimea companiei; % schimbare îți spune dacă lucrurile se îmbunătățesc
- **Date range sticky** — ultimul tău interval supraviețuiește navigării; dacă un coleg distribuie un URL cu alt interval, acela câștigă
- **Filtru tag doar pe Debits** — pentru top-ups după tag, verifică prin lista Clients
- **Failure reasons = scorecard furnizor** — o categorie nouă de motiv apare brusc înseamnă de obicei o schimbare config la furnizor
- **Net inflow pozitiv ≠ profit** — e float-ul portofelelor, nu venitul; nu ia în calcul refunds viitoare sau solduri nesetlate
- **Average balance × Users ≠ Float** — Float = suma pozitivelor; dacă mulți rideri sunt în datorie, Avg poate fi mai mic decât Float / Users
