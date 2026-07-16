# Plăți — Istoric

Pagina Plăți (`/payments`) este registrul fiecărei tranzacții monetare care a atins un cont de client: taxări pentru curse, reîncărcări de portofel, rambursări, amenzi. Folosește-o pentru a investiga o taxare, a emite o rambursare sau a audita fluxul de bani pe un interval de date.

Pentru evenimente webhook neprocesate de la furnizorii de plăți, vezi [Pending Webhooks](pending-webhooks.md).

Permisiune necesară: **Payments** (`m1n2p3`). Anumite acțiuni pe rând necesită sub-permisiuni suplimentare.

## Ce este aici

Fiecare rând reprezintă o singură tranzacție de plată:

| Tip        | Ce este                                                                               |
| ---------- | ------------------------------------------------------------------------------------- |
| **Topup**  | Bani adăugați în portofelul clientului (credit manual de operator sau top-up de card) |
| **Debit**  | Bani luați de la client (taxare cursă sau amendă)                                     |
| **Refund** | Bani returnați clientului (reversarea unui debit anterior)                            |

Fiecare tranzacție are o **metodă/furnizor** — canalul prin care a trecut:

- **Furnizori de card** (Stripe etc.) — bani reali pe un card de plată
- **Balance** — portofel intern (nu este un furnizor de plăți; doar un debit/credit pe soldul clientului)
- **Alte gateway-uri** în funcție de integrări

Împărțirea între _card provider_ și _balance_ contează pentru rambursare — vezi _Acțiuni pe rând → Refund_ mai jos.

## Filtre

| Filtru        | Tip      | Note                                                        |
| ------------- | -------- | ----------------------------------------------------------- |
| Search        | Text     | Caută după nume client, ID plată, ID-uri ride/fine asociate |
| Interval dată | Calendar | De la / până la; implicit "tot timpul"                      |
| Type          | Dropdown | `Topup` / `Debit` / `Refund` (sau `All`)                    |
| Status        | Dropdown | `Pending` / `Completed` / `Failed` / `Refunded` (sau `All`) |

Filtrele se aplică server-side și se combină cu AND.

## Coloane

| Coloană    | Sortabilă? | Conținut                                                              |
| ---------- | ---------- | --------------------------------------------------------------------- |
| **Data**   | ✓          | Când a fost creată tranzacția; sortare implicită = cele mai noi întâi |
| **Client** | —          | Nume client și avatar; link către detaliul clientului                 |
| **Sursă**  | —          | Tipul tranzacției (Topup / Debit / Refund), cu o etichetă colorată    |
| **Sumă**   | ✓          | Suma în moneda companiei, cu semn (+/−) și culoare                    |
| **Metodă** | —          | Metoda / furnizorul de plată (card, balance, nume gateway)            |
| **Status** | ✓          | Pilula de status (referință mai jos)                                  |

Sortează cu click pe header. Sortarea face parte din URL.

## Referință statusuri

| Status        | Înseamnă                                                                      |
| ------------- | ----------------------------------------------------------------------------- |
| **Pending**   | Trimis furnizorului; așteaptă confirmarea webhook                             |
| **Completed** | Furnizorul a confirmat succesul; banii s-au mutat                             |
| **Failed**    | Furnizorul a respins tranzacția (refuz card, eroare rețea, verificare fraudă) |
| **Refunded**  | Un debit reușit care a fost ulterior reversed printr-o rambursare             |

## Acțiuni pe rând

Fiecare rând are un **meniu cu trei puncte** în dreapta. Acțiunile disponibile depind de tipul plății, status și permisiunile tale:

| Acțiune         | Când e activă                       | Permisiune                                           |
| --------------- | ----------------------------------- | ---------------------------------------------------- |
| **View client** | Mereu (sare la profilul clientului) | —                                                    |
| **Refund**      | Vezi "Rutarea rambursării" mai jos  | `refund` / `topup-manual` / `fine` (depinde de rută) |

### Rutarea rambursării

Dashboard-ul ascunde detaliile furnizorului, dar acțiunea _Refund_ este suficient de inteligentă să aleagă calea corectă:

- **Debit prin furnizor** (card, gateway) → apel endpoint refund al furnizorului → banii se întorc pe card
- **Balance debit** (portofel) → fără furnizor implicat — se deschide dialogul **Top up balance** pentru a credita portofelul (necesită `topup-manual`)
- **Balance top-up** (credit manual de operator) → nu poate fi reversed prin furnizor — se deschide dialogul **Issue fine** pentru a debita aceeași sumă (necesită `fine`)

Refund este **dezactivat** când:

- Rândul este el însuși un refund (rambursarea unei rambursări nu are sens)
- Statusul nu este _Completed_ (nu poți rambursa tranzacții pending / failed)
- Tranzacția a fost deja reversed (dashboard-ul urmărește asta și blochează click-urile duplicate)
- Nu ai sub-permisiunea potrivită pentru calea de rutare

## De ce apar plăți aici (și ce le creează)

Plățile **nu** sunt create din această pagină — provin din alte fluxuri:

1. **Riderul face o cursă** → sfârșit cursă → backend creează o tranzacție _Debit_ → dacă reușește, statusul devine _Completed_ și banii se iau din portofel sau de pe card
2. **Riderul reîncarcă portofelul în aplicație** → apel furnizor → backend creează un _Topup_ → status _Completed_ la confirmarea webhook
3. **Operatorul creditează un portofel** prin _Top up balance_ pe un client → backend creează un _Topup_ cu metoda _balance_ și imediat _Completed_
4. **Operatorul emite o amendă** → backend creează un _Debit_ cu metoda _balance_, imediat _Completed_
5. **Refund** din această listă → backend creează o tranzacție _Refund_; originalul este marcat _Refunded_

Tranzacția originală nu dispare niciodată — fiecare acțiune este auditabilă.

## Fluxuri tipice

- **Investighează o taxare** — caută după client / cursă / ID plată → verifică Status (Completed = banii luați, Failed = nu) și Method
- **Rambursează o cursă** — găsește rândul _Debit_ pentru cursă → meniu rând → _Refund_ → confirmă → apare un rând _Refund_ pereche, originalul devine _Refunded_
- **Auditează ziua** — Interval dată = azi → filtrează Status = Completed → verifică totalurile
- **Găsește eșecuri pentru retry** — Status = Failed → contactează clienții pentru retry / metodă alternativă
- **Reconciliază cu furnizorul** — Interval dată + Type = Topup/Debit + Method = furnizor card → export și verifică cu extrasul furnizorului

## Sfaturi

- **Pending nu e failed** — pending așteaptă webhook-ul furnizorului; verifică [Pending Webhooks](pending-webhooks.md) dacă un rând rămâne Pending prea mult
- **Tranzacțiile balance nu pot fi card-refunded** — sistemul te rutează în dialogul potrivit; nu încerca să creezi manual tranzacții de compensare
- **Originalul supraviețuiește unei rambursări** — refund adaugă un rând pereche, nu șterge debit-ul; ambele rânduri rămân în istoric pentru audit
- **Semnul sumei îți spune direcția** — `+` (verde) = bani către client; `−` (roșu/închis) = bani de la client
- **Numele furnizorului contează pentru suport** — când escaladezi către furnizor, copiază ID-ul plății și numele furnizorului din coloana Method
- **URL-ul se distribuie** — copiază o vizualizare filtrată (ex. _card debits eșuate de ieri_) și trimite-o la finanțe sau fraudă
