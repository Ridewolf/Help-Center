# Park Proof — Detaliu

Pagina de detaliu park proof (`/support/park-proofs/:id`) este unde inspectezi în profunzime un park proof și — dacă încă e pending — îl moderezi. Se deschide ca un dialog mare peste [lista park proofs](park-proofs.md); URL-ul se schimbă astfel încât proof-ul poate fi partajat / deep-linkable.

De obicei ajungi aici cu click pe _View_ pe un rând, cu click pe o tile în gallery view, sau lipind un URL direct.

Permisiune necesară: **Park Proofs** (`d5e6f7`). Sub-permisiunea `review` activează acțiunile de moderare, `delete` activează butonul Delete.

## Cum se raportează la pagina review

Și `/support/park-proofs/:id` (această pagină) și `/support/park-proofs/:id/review` există — arată similar dar servesc job-uri diferite:

| Suprafață                                                                          | Ce este                                                                                                                                                   |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Park Proof Detail (această pagină)**                                             | Un **dialog** deschis din listă — imagine completă cu zoom, context complet, set complet de acțiuni. Vedere single-record. URL `/support/park-proofs/:id` |
| [Park Proof Review](park-proof-review.md)           | O **pagină pe tot ecranul** (`/:id/review`) — suprafața dedicată de review pentru un proof                                                                |
| [Park Proof Auto Review](park-proof-auto-review.md) | **Mod streamline** — coadă auto-advance de proofs pending, unul odată                                                                                     |

Zi-de-zi: folosește **Auto Review** pentru epuizat coada, **dialogul de detaliu** (această pagină) pentru inspecție one-off din listă, și pagina **review** pentru flow-ul dedicat de reviewer.

## Layout

Dialogul se împarte în două coloane pe ecrane late, se stackuiește pe cele înguste:

| Coloană            | Lățime | Conținut                                                                                                  |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------- |
| **Image (stânga)** | 3/5    | Fotografia la rezoluție completă cu zoom, pe fundal negru                                                 |
| **Info (dreapta)** | 2/5    | Header (titlu + badge-uri status / type), context (client / ride / vehicle), grid detalii, acțiuni review |

## Image (coloana stângă)

Un image viewer mare cu fotografia la rezoluție completă pe fundal negru:

- **Click pe imagine** comută zoom-ul (1× → 2× → 3× → 4× → înapoi la 1×)
- **Scroll wheel** zoom in sau out cu pași de 0.5×
- Cursorul comută între zoom-in / zoom-out în funcție de stare
- Un **badge % zoom** apare în colțul stânga-sus la orice zoom peste 1×

Patru butoane apar în colțul dreapta-jos la hover (semi-transparente pe fundal negru):

| Buton               | Ce face                                                                     |
| ------------------- | --------------------------------------------------------------------------- |
| **Zoom in**         | Pas +0.5× zoom (limitat la 4× maxim)                                        |
| **Zoom out**        | Pas -0.5× zoom (până la minim 1×)                                           |
| **Minimize**        | Resetează zoom-ul înapoi la 1×                                              |
| **Open in new tab** | Deschide rezoluția originală într-un tab nou pentru inspecție mai detaliată |

Caută aceleași semnale ca și pe pagina [review](park-proof-review.md): vehiculul întreg în cadru, loc de parcare legal, cricul jos, orice contrazice afirmațiile riderului.

## Header (sus în coloana dreaptă)

Banda de header identifică proof-ul:

- **Titlu** _"Review Park Proof"_ cu o descriere scurtă dedesubt
- Două **badge-uri** stivuite în dreapta:
  - **Badge status** — colorat pentru a se potrivi statusului (galben Pending, verde Approved, portocaliu Warning, roșu Rejected, închis Blocked)
  - **Badge type** — pilulă outline care arată _Start_ / _Park_ / _End_

## Secțiune context

Trei rânduri care leagă către entități conexe. Fiecare e un router-link (click pentru a deschide pagina de detaliu conexă în aceeași fereastră):

| Rând        | Ce arată                                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| **Client**  | Nume client (linkat la [detaliu client](../../operations/customers/client-detail.md)), email + phone (click pentru copy) |
| **Ride**    | Nume / id cursă linkat la [detaliu cursă](../../operations/trips/ride-detail.md)                                         |
| **Vehicle** | Label vehicul linkat la [detaliu vehicul](../../operations/fleet/vehicle-detail.md), tipul vehiculului dedesubt          |

Folosește aceste cross-references pentru a construi rapid contextul — a încălcat acest client înainte, a încheiat efectiv cursa aici, e acest vehicul flag-uit des.

## Secțiune Details

Un grid cheie/valoare pe două coloane sub context. Câmpurile care apar depind de starea proof-ului:

| Câmp                | Când apare                        | Ce arată                                                                                                                                                                                                                                            |
| ------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Created**         | Întotdeauna                       | Când aplicația riderului a încărcat fotografia                                                                                                                                                                                                      |
| **Reviewed at**     | Doar după review                  | Când un operator (sau Auto Review) a luat decizia                                                                                                                                                                                                   |
| **Review duration** | Doar după review                  | Delta Created → Reviewed (ex. "2h 14m") — util pentru măsurarea SLA pe proof                                                                                                                                                                        |
| **Reviewed by**     | Doar după review-ul unui operator | Operatorul care a verificat. Linkat la [profilul operatorului](../../settings/access/operators.md). Dacă operatorul nu poate fi rezolvat (404, fără permisiune), id-ul este afișat ca link clickabil — pagina de profil gestionează propria autorizare |
| **Location**        | Când cursa are coordonate         | Lat / lng al startului (pentru proofs _Start_) sau al sfârșitului (pentru _Park_/_End_) cursei, 6 zecimale                                                                                                                                          |

Dacă proof-ul a fost rejected cu o amendă, un alert roșu _Fine_ apare sub detalii cu suma amenzii în moneda companiei.

Dacă există un comentariu anterior sau motiv de respingere, apare ca secțiune _Comment_ dedesubt.

## Acțiuni review (doar pending)

Dacă statusul proof-ului este **Pending**, un selector de acțiuni apare la baza coloanei drepte. Dialogul de detaliu suportă **cinci** acțiuni de moderare (una în plus față de pagina dedicată review):

| Acțiune                  | Efect pe status | Câmpuri suplimentare  | Când să folosești                                                                    |
| ------------------------ | --------------- | --------------------- | ------------------------------------------------------------------------------------ |
| **Approve**              | _Approved_      | —                     | Fotografie clar bună — nu e nevoie de comentariu                                     |
| **Approve with comment** | _Approved_      | Comment necesar       | Fotografie bună dar vrei să logezi o notă (edge case, future reference, ML training) |
| **Warn**                 | _Warning_       | Comment recomandat    | Fotografie nu ideală — riderul primește notificare soft, fără amendă                 |
| **Reject**               | _Rejected_      | Comment + Sumă amendă | Fotografie proastă — se aplică amendă. Amenda se debitează din portofel la submit    |
| **Block**                | _Blocked_       | Comment necesar       | Încălcare severă / repetată — blochează riderul de la curse viitoare                 |

Fiecare acțiune apare ca un card radio clickabil cu o descriere; selectarea uneia dezvăluie câmpurile condiționale (textarea comentariu și/sau input sumă amendă). Butonul primary de submit preia culoarea acțiunii (verde / galben / roșu / închis).

După submit, dialogul se închide, un toast confirmă acțiunea, iar lista se reîmprospătează.

### Ce diferă față de pagina review

[Pagina review](park-proof-review.md) dedicată (`/:id/review`) arată **patru** acțiuni ca butoane stivuite. Acest dialog arată **cinci** acțiuni ca carduri radio — cea în plus fiind _Approve with comment_, utilă pentru a loga context pe o decizie pozitivă fără a o escalada la un warning.

## Proofs închise (deja review-uite)

Dacă proof-ul e deja review-uit (Approved / Warning / Rejected / Blocked), secțiunea de acțiuni e ascunsă — dialogul devine read-only. Încă vezi tot contextul (imagine, client / ride / vehicle, detalii, amendă, comentariu, cine a review-uit și când), și încă poți:

- **Delete** înregistrarea (cu permisiunea `delete`) — pentru spam / test / uploads pe cursă greșită
- **Close** dialogul

Pentru a schimba o decizie post-factum, vorbește cu adminul — flow-ul standard nu permite re-review prin UI.

## Footer

| Buton             | Când vizibil                                    | Ce face                                                                                                                                 |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Delete**        | Mereu, dacă ai sub-permisiunea `delete`         | Șterge înregistrarea proof-ului complet (cu confirmare). Doar pentru test / spam / uploads pe cursă greșită — nu ca alegere de moderare |
| **Cancel**        | Doar pentru pending                             | Închide dialogul fără submit                                                                                                            |
| **Action submit** | Doar pentru pending, după alegerea unei acțiuni | Submit acțiunea selectată (culoare-matched cu acțiunea)                                                                                 |
| **Close**         | Proofs review-uite                              | Închide dialogul                                                                                                                        |

Închiderea dialogului (Cancel / Close / Esc / click pe overlay) scoate `/:id` din URL astfel încât istoricul back / forward se potrivește cu ce vezi.

## Workflow-uri tipice

- **Investighează un proof din listă** — găsește proof-ul în listă (filtru / search), click pe rând → se deschide dialogul de detaliu → derulează prin context → decide
- **Investigație profundă pe un proof amendat** — caută după client → deschide unul din proofs lui rejected → verifică Reviewed by + comentariu pentru a vedea cine a decis și de ce → folosește pentru rezolvarea disputelor
- **Approve rapid dintr-un deep link** — primește un URL de la un coleg → click → se deschide dialogul → zoom pe fotografie → Approve / Approve with comment
- **Cross-check istoric vehicul** — deschide un proof → click pe vehicul → vezi dacă același vehicul primește mereu park photos proaste → asta indică o problemă de placement / semnalizare, nu de rider
- **Audit apelurile unui reviewer** — filtrează lista după Status `Approved` → click în proofs pentru a vedea Reviewed by + comentariu → calibrează standardele echipei

## Tips

- **Scroll-wheel zoom e rapid** — nu ai nevoie de buton — doar wheel up peste imagine
- **Imaginea se deschide într-un tab nou la rezoluție completă** — când zoom-ul intern al dialogului nu e suficient (ex. citirea unui semn de mărimea unei plăcuțe de înmatriculare), deschide extern
- **"Approve with comment" bate approve-ul tăcut** pentru edge cases — lasă o notă one-line pe care următorul reviewer (sau tu peste trei luni) o va aprecia
- **Block e final** — riderii pot fi deblocați prin [detaliu client](../../operations/customers/client-detail.md) dar pentru un proof anume, _Block_ e cea mai mare escaladare. Nu sări direct la el pe o primă încălcare
- **Delete vs Reject** — Reject lasă o înregistrare de moderare (și amendează riderul); Delete șterge proof-ul complet. Dacă vrei un paper trail, nu șterge niciodată
- **URL-ul e partajabil** — `/support/park-proofs/:id` aterizează direct aici, fără navigare în listă
- **Proofs închise sunt read-only** — dacă ai deschis un proof review-uit așteptând să acționezi pe el — de asta lipsesc butoanele
