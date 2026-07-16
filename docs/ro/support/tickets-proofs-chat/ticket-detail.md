# Ticket — Detaliu

Pagina de detaliu a ticket-ului (`/support/tickets/:id`) este unde investighezi un singur ticket de suport. Se deschide ca un modal mare peste [lista de tickete](tickets.md) — URL-ul se schimbă astfel încât ticket-ul poate fi partajat / deep-linkable.

De obicei ajungi aici cu click pe un rând din listă sau lipind un URL direct.

Permisiune necesară: **Tickets** (`a8b9c1`). Unele acțiuni necesită sub-permisiuni suplimentare (`edit`, `delete`).

## Cum se raportează la celelalte vederi pentru tickete

| Vedere                                                                     | Pentru ce                                                                                   |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [Listă Tickete](tickets.md)                 | Coada completă — căutare, filtru, sortare                                                   |
| [Ticket Auto Review](ticket-auto-review.md) | Streamline — un ticket pending odată, triaj rapid driven de tastatură                       |
| **Detaliu ticket (această pagină)**                                        | Investigație profundă pe un ticket — fotografie completă, descriere, context, edit / delete |

## Layout

Modalul, de sus în jos:

1. **Header** — titlu (label ticket), description ("Ticket #ID"), close (X)
2. **Secțiune imagine** — fotografia-dovadă de la rider (mare, click pentru a deschide)
3. **Card Ticket Details** — status, complaint type, description, comment
4. **Card Vehicle & Location** — vehicul, IMEI, coordonate locație, zonă, raportor
5. **Footer** — butoane _Close_ și _Edit_

## Header

Banda de sus identifică ticket-ul:

- Iconiță **alert-circle** lângă label-ul ticket-ului (label-ul vehiculului sau un nume generat)
- O **linie description** care arată ID-ul ticket-ului
- **Close (×)** în dreapta-sus — închide și cu Esc sau click pe fundal

Închiderea modalului scoate `/:id` din URL astfel încât istoricul back / forward se potrivește cu ce vezi.

## Secțiune imagine

Fotografia-dovadă completă de la rider, suficient de mare pentru inspecție imediată:

- **Click pe imagine** (sau pe butonul _View Full Size_ care apare la hover) — deschide rezoluția originală într-un tab nou
- **Hover** — apare un overlay mai întunecat + butonul _View Full Size_
- Dacă imaginea nu se încarcă, apare un placeholder
- Dacă ticket-ul nu are imagine (rar, ex. tickete inițiate de operator), secțiunea e ascunsă

Miniatura din listă este o versiune mică; aici e imaginea completă, gata pentru moderare.

## Card Ticket Details

Cardul din stânga al grid-ului de două. Câmpuri:

| Câmp               | Ce arată                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**         | Pilula de status (Pending, In progress, Resolved, Dismissed, Duplicate etc.) — aceeași paletă ca în listă                                 |
| **Complaint type** | Pilula tipului de plângere — aceleași culori ca în listă (roșu Mechanical damage, galben Cleanliness etc.)                                |
| **Description**    | Textul liber al riderului, randat ca markdown (newline-uri respectate, link-uri auto-detectate) — gol dacă riderul a lăsat-o necompletată |
| **Comment**        | Comentariu intern al operatorului / notițe pe ticket — gol până când un operator adaugă unul                                              |

Pentru sensul fiecărei culori de pilulă vezi [Listă Tickete → Status reference / Complaint types](tickets.md).

## Card Vehicle & Location

Cardul din dreapta al grid-ului. Câmpuri:

| Câmp         | Ce arată                                                                               |
| ------------ | -------------------------------------------------------------------------------------- |
| **Vehicle**  | Label vehicul (cu iconiță car) și IMEI-ul dispozitivului său IoT                       |
| **Location** | Latitudinea / longitudinea unde a fost raportată problema (6 zecimale, cu iconiță pin) |
| **Zone**     | [Zona](../../settings/infrastructure/zones.md) în care cade locația, dacă există          |
| **Reporter** | Riderul / sistemul / operatorul care a deschis ticket-ul, cu email-ul                  |

Folosește aceste cross-references ca să sari în context: click pe vehicul → [detaliu vehicul](../../operations/fleet/vehicle-detail.md), click pe raportor → [profil client](../../operations/customers/client-detail.md), copiază coordonatele într-un map-tool pentru a confirma locația.

## Actions (footer)

Pagina de detaliu expune un set de acțiuni **intenționat mic** — majoritatea workflow-urilor pentru tickete se întâmplă pe listă sau pe entitățile conexe (vehicul, client). Ce e aici:

| Buton     | Ce face                                                                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Close** | Închide modalul (scoate `/:id` din URL)                                                                                                                         |
| **Edit**  | Deschide ticket-ul în edit mode. Notă: în build-ul curent handler-ul Edit afișează un toast "Edit not implemented" — e wire-uit dar formularul nu e încă livrat |

### Ce e pe listă dar nu aici

Meniul de rând al listei are două acțiuni suplimentare care nu apar pe pagina de detaliu:

| Acțiune    | Unde stă        | De ce                                                                                                                                         |
| ---------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Edit**   | Rând + detaliu  | Același Edit (placeholder pentru moment)                                                                                                      |
| **Delete** | Doar meniu rând | Delete e doar action de rând (cu dialog de confirmare). Pentru a șterge din detaliu, închizi modalul mai întâi, apoi folosești meniul de rând |

### Ce e pe pagina de listă

Header-ul listei are _Auto Review_ care sare la coada streamline — pe detaliu nu există echivalent pentru că deja ești concentrat pe un singur ticket.

## Acțiuni feature-flagged (nu în build-ul curent)

Codebase-ul are placeholder-uri pentru un set mai bogat de acțiuni pe tickete care sunt **comentate** începând cu acest build:

- **Assign** — atribuie ticket-ul unui operator
- **Block vehicle** — scoate vehiculul din serviciu cu un click
- **Create maintenance task** — deschide un maintenance task pre-completat cu datele acestui ticket
- **Credit user** — emite un credit în portofelul raportorului
- **Reply** — trimite un răspuns template către rider
- **Merge duplicate** — leagă acest ticket cu un master ticket

Dacă deployment-ul tău le are pornite, apar în meniul de rând / un dropdown _Actions_ în header — nu pe body-ul modalului. Verifică cu adminul dacă le aștepți și nu le vezi.

## Workflow-uri tipice

- **Triaj după fotografie** — deschide ticket-ul → uită-te la imagine → dacă avaria e reală, copiază label-ul vehiculului → închide modalul → deschide detaliul vehiculului ca să-l blochezi / să creezi maintenance task
- **Rezolvă un raport de calitate slabă** — deschide ticket-ul → confirmă că fotografia e junk → închide → meniul de rând al listei → delete (cu confirmare)
- **Investighează istoricul unui vehicul** — deschide un ticket → click pe vehicul → vezi tot istoricul de alerte + curse → revino la ticket pentru a adăuga un comentariu
- **Verifică reclamația unui rider vs cursa** — deschide ticket-ul → copiază raportorul → deschide detaliul lui de client → verifică cursele recente pentru context
- **Partajează un ticket cu un coleg** — URL-ul conține id-ul (`/support/tickets/:id`) deci poți să-l lipești în chat și destinatarul ajunge pe același modal

## Tips

- **URL-ul este bookmark-ul tău** — copiind URL-ul cu `:id` și lipindu-l mai târziu sari direct la același ticket, chiar din altă sesiune
- **Esc pentru close** — modalul suportă Esc, click pe fundal și X — toate trei scot id-ul din URL
- **Un singur click pe imagine pentru a vedea originalul** — miniatura e comprimată; originalul e ce a trimis riderul de fapt
- **Cross-reference IMEI** — dacă un vehicul e repetat ticketat, deseori IoT-ul face probleme, nu șasiul. IMEI-ul e legătura ta către înregistrarea [IoT settings](../../settings/infrastructure/iot.md)
- **Comment e internal-only** — riderii nu îl văd; folosește-l liber pentru notițe operator-la-operator
- **Edit nu e livrat încă** — click pe _Edit_ azi arată un toast. Dacă trebuie să schimbi un status, fă-o din action-urile list-level sau Auto Review
