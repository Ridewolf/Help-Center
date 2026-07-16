# Curse — Listă

O **cursă** este o călătorie individuală făcută de un client pe unul dintre vehiculele tale. Lista de curse (`/rides`) este înregistrarea master a tuturor călătoriilor — trecute, curente și în desfășurare — din întreaga flotă.

Deschide un rând pentru a vedea [pagina de detaliu a cursei](ride-detail.md) cu traseu, cronologie și setul complet de acțiuni.

Permisiune necesară: **Rides** (`i1j2k3`).

## De unde apar cursele aici

Nu creezi curse în dashboard — ele provin din partea clientului:

1. Un client **deblochează un vehicul** în aplicația mobilă (Ridewolf rider app)
2. Backend-ul deschide o înregistrare nouă de cursă legată de acel vehicul și client
3. Cursa apare în această listă imediat cu statusul **Active**
4. Când clientul **blochează / parchează** vehiculul, backend-ul închide cursa; statusul devine **Completed** și se calculează breakdown-ul final (distanță, durată, preț)
5. Alte stări finale (`Cancelled` etc.) vin de la reguli de sistem sau acțiuni ale operatorului

Reîncarcă sau revizitează pagina pentru a prelua cel mai recent snapshot — cursele active se actualizează pe măsură ce clientul se mișcă.

## Ordinea implicită

Implicit, backend-ul returnează **cursele active întâi**, apoi cursele finalizate în ordine cronologică inversă (cele mai noi întâi). Aplică o sortare pe coloană pentru a suprascrie acest mod implicit.

## Filtre

| Filtru        | Tip          | Note                                                                        |
| ------------- | ------------ | --------------------------------------------------------------------------- |
| Căutare       | Text         | Caută după nume client, etichetă vehicul, ID cursă                          |
| Interval dată | Calendar     | De la / până la; implicit "tot timpul"                                      |
| Status        | Dropdown     | `Active`, `Completed`, `Cancelled` etc.                                     |
| Rating        | Dropdown     | Filtru după stele lăsate de rider (1–5, _Fără rating_)                      |
| Etichete      | Multi-select | Filtru după etichete cursă (moștenite de la vehicul — vezi Coloane mai jos) |

Toate filtrele se combină cu AND. Chip-urile de filtre apar deasupra tabelului; URL-ul reflectă starea curentă.

## Coloane

| Coloană  | Sortabilă? | Conținut                                                         |
| -------- | ---------- | ---------------------------------------------------------------- |
| Client   | —          | Avatar, nume, link către profilul clientului                     |
| Vehicul  | —          | Etichetă, model, link către vehicul                              |
| Tarif    | —          | Numele tarifului aplicat cursei                                  |
| Stats    | —          | Badge-uri rapide: distanță, durată, cost final                   |
| Etichete | —          | Etichete moștenite de la **vehicul** în momentul pornirii cursei |
| Status   | ✓          | Pilulă de status (Active, Completed, Cancelled etc.)             |
| Rating   | ✓          | Stele de la rider (sau "–" dacă nu există)                       |
| Creat    | ✓          | Data și ora pornirii; sortare implicită = cele mai noi întâi     |

Sortează cu click pe header. Sortarea aleasă face parte din URL și **suprascrie** ordinea implicită descrisă mai sus — nu există un al treilea click pentru "restabilește implicit", dar poți elimina parametrul de sortare din URL sau reîncărca pagina fără el.

> **Etichetele se moștenesc de la vehicul.** Cursele nu au propriul lor editor de etichete — etichetele unei curse sunt un snapshot al etichetelor vehiculului în momentul pornirii cursei. Editezi etichetele vehiculului ulterior și cursele existente își păstrează snapshot-ul original; doar cursele noi preiau etichetele noi.

## Acțiuni pe rând

Fiecare rând are un **meniu cu trei puncte** în extrema dreaptă. Acțiunile disponibile depind de statusul cursei și permisiunile tale:

| Acțiune      | Permisiune      | Când e activă                                                 |
| ------------ | --------------- | ------------------------------------------------------------- |
| **Pause**    | `pause-unpause` | Cursa este **Active** (nu deja pe pauză, finalizată, anulată) |
| **Resume**   | `pause-unpause` | Cursa este **Paused**                                         |
| **End ride** | `end-ride`      | Cursa **nu** este Completed sau Cancelled                     |

Acțiunile pentru care nu ai permisiune sunt ascunse. Acțiunile dezactivate (ex. End pe o cursă deja finalizată) apar gri ca să vezi ce este posibil în starea potrivită.

Setul complet de acțiuni — rambursare, vezi traseul pe hartă, trimite notificare, arhivează — se află pe **pagina de detaliu a cursei**. Click pe rând pentru a le accesa.

## Acțiuni de pagină

În colțul dreapta-sus al paginii cu listă:

- **Export** — descarcă lista curentă filtrată ca fișier (filtrele și sortarea sunt respectate)

## Fluxuri tipice pe listă

- **Urmărește activitatea live** — deschide pagina și rămâi pe ea; cursele active sunt sus
- **Găsește curse într-o zonă sau interval** — combină interval de date + status + etichete
- **Detectează anomalii** — filtrează `Status = Cancelled` sau `Rating ≤ 2` și scanează pattern-uri (același vehicul? aceeași oră?)
- **Oprește rapid o cursă blocată** — fără să părăsești lista, deschide meniul rândului și _End ride_ (necesită permisiune)

## Sfaturi

- **URL-ul se distribuie** — filtrează lista, copiază URL-ul, trimite-l unui coleg — primește aceeași vizualizare
- **Badge-urile Stats din listă** sunt o modalitate rapidă de a detecta curse anormal de scurte sau lungi înainte să dai click
- **Nu te baza doar pe rating** — deschide pagina de detaliu pentru curse cu rating mic; rating-ul este unul din multe semnale
- **Permisiunile variază pe companie** — unii operatori văd doar curse pentru vehiculele pe care le gestionează; dacă o cursă lipsește pentru tine, verifică cu un admin
