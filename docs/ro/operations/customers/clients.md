# Clienți — Listă

Lista de clienți (`/clients`) este baza ta de clienți: fiecare persoană care a înregistrat un cont la serviciul tău, cu sold, etichete, rezumat istoric curse și canale de contact.

Pentru lucrul pe un client (istoric complet, acțiuni de sold, dispozitive, comentarii) deschide [pagina de detaliu a clientului](client-detail.md).

Permisiune necesară: **Clients** (`e4f5h6`). Sub-permisiuni adiționale protejează acțiuni specifice pe rând și bulk.

## Cum apar clienții aici

De obicei nu creezi clienții în dashboard — ei se înscriu prin aplicația mobilă:

1. O persoană instalează **aplicația Ridewolf rider** și se înregistrează (telefon sau email)
2. Backend-ul creează o înregistrare client; rândul apare aici cu statusul **Registering** cât timp verificarea (SMS, ID, metodă de plată) e în curs
3. După ce verificarea se termină statusul devine **Active** — clientul poate face curse
4. Operatorii pot crea manual clienți (ex. pentru VIP sau conturi de test) prin `+ Create` — descris în articolul _Create_

Lista se reîmprospătează la reload sau la schimbarea filtrelor.

## Filtre

| Filtru        | Tip          | Note                                                        |
| ------------- | ------------ | ----------------------------------------------------------- |
| Search        | Text         | Caută după nume, telefon, email, ID client                  |
| Interval dată | Calendar     | Filtrează după **data înregistrării**; de la / până la      |
| Status        | Dropdown     | `Active` / `Blocked` / `Frozen` / `Registering` (sau `All`) |
| Tags          | Multi-select | Filtru după etichete aplicate clientului                    |

Toate filtrele se combină cu AND. Chip-urile de filtre apar deasupra tabelului; URL-ul reflectă starea curentă.

## Coloane

| Coloană       | Sortabilă? | Conținut                                                                  |
| ------------- | ---------- | ------------------------------------------------------------------------- |
| **Client**    | ✓          | Avatar + nume/prenume + telefon sau email; link către detaliul clientului |
| **Channels**  | —          | Iconițe pentru canalele de contact verificate (phone, email, social)      |
| **Balance**   | ✓          | Soldul portofelului în moneda companiei, roșu când negativ                |
| **Tags**      | —          | Etichete aplicate clientului                                              |
| **Status**    | ✓          | Pilula de status (referință mai jos)                                      |
| **Rating**    | ✓          | Rating-ul mediu lăsat de rideri (rating client)                           |
| **Rides**     | ✓          | Numărul total de curse pe toată durata                                    |
| **Last ride** | ✓          | Când clientul a făcut ultima cursă                                        |
| **Payment**   | —          | Iconița metodei de plată implicite (card, portofel etc.)                  |

Sortează cu click pe header. Sortarea face parte din URL.

## Referință statusuri

| Status          | Înseamnă                                                                               |
| --------------- | -------------------------------------------------------------------------------------- |
| **Active**      | Complet verificat, poate face curse, poate fi taxat                                    |
| **Blocked**     | Nu poate face curse; blocaj de operator (fraud, abuz, datorie) sau declanșat de sistem |
| **Frozen**      | Cont pe pauză (ex. în timpul unei investigații de dispută sau la cererea clientului)   |
| **Registering** | Înregistrare în curs — telefon / email / ID / metodă de plată neverificate             |

## Acțiuni pe rând

Fiecare rând are un **meniu cu trei puncte** în dreapta. Acțiunile disponibile depind de permisiuni:

| Acțiune             | Permisiune          | Ce face                                                                             |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------- |
| **View profile**    | —                   | Deschide [pagina de detaliu a clientului](client-detail.md) |
| **Ride history**    | —                   | Deschide vizualizarea curselor clientului (o felie focusată din lista globală)      |
| **Send SMS**        | —                   | Deschide un dialog pentru trimiterea SMS la telefonul verificat                     |
| **Send email**      | —                   | Deschide un dialog pentru trimiterea email la adresa verificată                     |
| **Send push**       | —                   | Deschide un dialog pentru trimiterea unei notificări push în aplicație              |
| **Top up balance**  | `topup-manual`      | Deschide dialogul de sold — creditează portofelul clientului                        |
| **Issue fine**      | `fine`              | Deschide dialogul de amendă — debitează din portofel (pentru daună, parcare etc.)   |
| **Block / Unblock** | `block` / `unblock` | Deschide dialogul de blocare — comută statusul cu motiv opțional                    |
| **Edit**            | `edit`              | Deschide [formularul de editare](client-create-edit.md)     |
| **Delete**          | `delete`            | Șterge logic înregistrarea clientului (cu confirmare; element roșu distructiv)      |

Acțiunile pentru care nu ai permisiune sunt ascunse din meniu.

## Acțiuni bulk

Selectează unul sau mai mulți clienți cu checkbox-urile din stânga. O **bară de acțiuni bulk** apare sus cu numărul selectat și acțiunile:

| Acțiune bulk      | Permisiune          | Ce face                                                                          |
| ----------------- | ------------------- | -------------------------------------------------------------------------------- |
| **Add balance**   | `topup-manual`      | Creditează o singură sumă în fiecare portofel selectat (cu confirmare)           |
| **Charge amount** | `fine`              | Debitează o singură sumă din fiecare portofel selectat (ex. amendă pe eveniment) |
| **Change status** | `block` / `unblock` | Setează același status (Active / Blocked / Frozen) pentru toți selectații        |
| **Send push**     | —                   | Trimite o notificare push tuturor clienților selectați deodată                   |

Dialogurile bulk te ghidează prin sumă / mesaj / status, apoi aplică tuturor rândurilor selectate într-o singură operațiune cu confirmare finală.

## Acțiuni de pagină (dreapta-sus)

- **+ Create** — deschide [formularul de creare client](client-create-edit.md) (articol separat)

## Fluxuri tipice

- **Investighează o plângere de plată** — caută după telefon sau email → deschide detaliul → verifică soldul și istoricul curselor
- **Reîncarcă portofelul la cererea clientului** — găsește clientul, _Top up balance_ din meniul rândului, completează suma, confirmă
- **Blochează un fraudator** — caută clientul → _Block / Unblock_ → setează Blocked cu motiv; statusul se schimbă, fără curse
- **Trimite un SMS de avarie** — filtrează după etichetă de zonă → _Selectează tot_ → _Send push_ (sau Marketing → SMS pentru broadcast non-urgent)
- **Auditează deținătorii unei etichete** — filtrează după etichetă, scanează soldul și numărul de curse pentru outlieri

## Sfaturi

- **Statusul este gatekeeper-ul tăcut** — clienții în _Registering_ / _Frozen_ / _Blocked_ nu pot face curse; nu te aștepta să-i vezi în lista de curse
- **Iconițele Channels îți spun ce e verificat** — lipsa iconiței email înseamnă că SMS este singurul canal de ieșire pentru acel client
- **Rating-ul este rating-ul ridrilor pentru client** (nu pentru cursă) — rating mic înseamnă adesea probleme de parcare sau comportament neadecvat; verifică cu park proofs și tickete
- **Soldul devine roșu** = portofel negativ. Clientul nu poate începe curse noi până nu reîncarcă sau primește rambursare
- **Permisiunile sunt în straturi** — poți avea voie să trimiți _SMS_ dar nu să faci _Top up_ pentru același client; meniul afișează ce poți face
- **URL-ul se distribuie** — copiază o vizualizare filtrată (ex. _Blocked clients with rides > 0_) și trimite-o unui coleg
