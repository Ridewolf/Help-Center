# Ticket Auto Review

Pagina Ticket Auto Review (`/support/tickets/auto-review`) este o **interfață streamlined de coadă** pentru parcurgerea ticketelor pending unul după altul, fără să te întorci la listă între decizii.

La fel ca la [Park Proof Auto Review](park-proof-auto-review.md), "Auto" înseamnă **auto-advance**: după fiecare acțiune pagina încarcă următorul ticket pending ca să nu îți rupi fluxul.

Accesează din butonul **Auto Review** de pe [lista de Tickets](tickets.md).

Permisiune necesară: **Tickets** (`a8b9c1`).

## Cum funcționează

1. Pagina încarcă **coada curentă de tickete pending** când o deschizi
2. Vezi primul ticket — fotografie dovadă, card info și butoane de acțiune
3. Alegi o acțiune (Resolve / In Work / Waiting Info / Dismiss / Duplicate) sau Skip
4. Pagina **avansează automat** la următorul ticket pending
5. Repetă până coada se golește
6. Când e goală, trece la un **stat de așteptare** cu countdown care interoghează după tickete noi

Locul tău este însăși coada pending — închiderea și redeschiderea tabului nu pierde progresul, doar reiei la următorul ticket pending când se încarcă.

## Structură

Trei coloane pe ecrane largi, se stivuiesc pe cele înguste:

| Coloană     | Lățime | Conținut                                                          |
| ----------- | ------ | ----------------------------------------------------------------- |
| **Image**   | 5/12   | Foto-dovadă zoomabilă + timestamp                                 |
| **Actions** | 4/12   | Cinci butoane de schimbare status + Skip + Comment                |
| **Info**    | 3/12   | Card ticket info cu status, tip plângere, vehicul, raportor, date |

O bară de progres deasupra arată cât de departe ești.

## Header

- **Titlu** "Ticket Auto Review"
- **Subtitlu** cu progres: `Reviewing X of Y · T-12345`
- Butonul **Skip** (dreapta-sus) — sare peste ticketul curent fără decizie (ticketul rămâne _Pending_)
- **Săgeată înapoi** — revine la [lista de tickete](tickets.md)

## Butoane de acțiune

Cinci tranziții de status plus Skip și un Comment opțional:

| Buton            | Status nou      | Folosește când                                                   |
| ---------------- | --------------- | ---------------------------------------------------------------- |
| **Resolve**      | _Resolved_      | Problema e rezolvată (sau nu era reală) — închide ticketul       |
| **In Work**      | _In progress_   | Problema e reală, ai pornit un fix (maintenance task, follow-up) |
| **Waiting Info** | _Waiting info_  | Ai nevoie de mai multe informații de la rider înainte de decizie |
| **Dismiss**      | _Dismissed_     | Nu e o problemă reală (raport slab, țintă greșită, spam)         |
| **Duplicate**    | _Duplicate_     | Există deja un alt ticket pentru același vehicul / problemă      |
| **Skip**         | (neschimbat)    | Nu decide; trece la următorul                                    |
| **Comment**      | (orice acțiune) | Notă opțională atașată acțiunii pe care apeși                    |

Fiecare click commitează imediat și avansează la următorul. **Scrie comentariul întâi** dacă vrei să-l atașezi.

### Ce status de închidere să alegi

- **Resolve** — lucrul stricat a fost reparat (sau raportul era o neînțelegere clarificată)
- **Dismiss** — raportul era prost / fals / off-target; riderul vede dismiss-ul în aplicație
- **Duplicate** — link la original; backend gestionează lanțul, resolution pe unul închide pe toți

_Resolve_, _Dismiss_ și _Duplicate_ toate închid ticketul. _In Work_ și _Waiting Info_ îl țin deschis într-un bucket diferit.

## Coloana Info

Un card **Ticket Info** în dreapta arată datele structurate din spatele fotografiei:

- **Status** — pilula statusului curent
- **Complaint type** — pilulă colorată (mechanical damage, electrical, battery etc.)
- **Vehicle** — etichetă și link
- **Reporter** — nume (rider) sau label (system / operator)
- **Location** — adresă / coordonate
- **Created / updated** — timestamp-uri
- **SLA** — timpul rămas (sau badge "overdue")

Citește acest card înainte de decizie — îți spune toată povestea fără să părăsești pagina.

## Stat de așteptare

Când coada se golește, pagina afișează același waiting screen folosit pentru Park Proofs:

- Mesaj "All tickets reviewed"
- Un **countdown** până la următorul poll automat
- Buton **Check now** — verifică imediat
- Buton **Exit** — revine la listă

Dacă un ticket nou aterizează în timpul așteptării, pagina îl auto-încarcă.

## Când să folosești Auto Review vs Lista

| Folosește lista când…                                       | Folosește Auto Review când…                      |
| ----------------------------------------------------------- | ------------------------------------------------ |
| Ai nevoie să filtrezi după status, tip plângere sau vehicul | Parcurgi coada pending nefiltrată                |
| Investighezi istoricul unui vehicul sau rider specific      | Te concentrezi pe un ticket pe rând, full-screen |
| Auditezi decizii anterioare (Resolved / Dismissed / etc.)   | Vrei viteză: citește → decide → următor          |
| Trebuie să escaladezi la echipa de mentenanță               | Ești în mod tură, lucrezi coada end-to-end       |

## Fluxuri tipice

- **Început tură** — deschide Auto Review → parcurge fiecare ticket pending → termină pe ecranul de așteptare
- **Triaj rapid** — citește fotografia + tipul + raportorul → dacă e evident, _Resolve_ / _Dismiss_ cu un comentariu de un rând; dacă nu, _In Work_ și tag-uiește echipa de mentenanță în comentariu
- **Așteptând riderul** — când raportul e neclar, _Waiting Info_ cu o întrebare în comentariu; riderul primește un prompt
- **Dedup** — când căutarea dezvăluie un ticket deschis pe același vehicul, _Duplicate_ pentru a lega lanțul
- **Caz ambiguu** — _Skip_ și deschide din listă cu context complet (istoric vehicul, curse asociate, alerte IoT)

## Sfaturi

- **Scrie comentariul întâi** — aceeași regulă ca la Park Proofs: acțiunea commitează înainte ca un comentariu târziu să fie salvat
- **Skip ≠ decizie** — Skip nu închide nimic; ticketul rămâne în coadă pentru următorul operator
- **Resolve vs Dismiss nu e același lucru** — _Resolve_ spune "am reparat"; _Dismiss_ spune "asta nu era o problemă reală"; riderul vede diferența în aplicație
- **Gestionare duplicate** — caută lista după eticheta vehiculului întâi; dacă găsești un ticket parent, click Duplicate, altfel rezolvă pe cel mai informativ și Duplicate pe restul
- **Cronometrul SLA încă tic-tac** în timpul așteptării — dacă coada e goală dar lista încă are rânduri depășite, acele rânduri sunt filtrate din Auto Review (poate permisiuni, poate status); revino la listă
- **Auto Review respectă ordinea ticketelor din backend** — ordinea celor mai noi pending poate varia per deployment; tratează ordinea cozii ca autoritară
