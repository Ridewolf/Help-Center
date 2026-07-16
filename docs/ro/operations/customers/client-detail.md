# Detaliu client

Pagina de detaliu a clientului (`/clients/:id`) este atelierul pentru un singur client. Folosește-o pentru a revizui informațiile personale, a executa acțiuni de sold (top up, amendă), a bloca/debloca, a trimite mesaje și a audita istoricul curselor și activității contului.

De obicei ajungi aici cu click pe un rând din [lista de clienți](clients.md) sau dintr-o pagină de detaliu cursă (link-ul clientului din header).

Permisiune necesară: **Clients** (`e4f5h6`). Acțiuni specifice necesită sub-permisiuni (notate mai jos).

## Structură

De sus în jos:

1. **Header** — înapoi, nume, status, buton _Actions_
2. **Card-uri overview** — sold, curse, rating, status (4 piese KPI)
3. **Tab-uri** — Details / Activity / History

## Header

Banda de sus identifică clientul:

- **Buton înapoi** (`←`) te readuce la listă
- **Nume** (prenume + nume) și **pilula de status** (Active / Blocked / Frozen / Registering)
- **Buton Actions** în dreapta — deschide dialogul de acțiuni

## Acțiuni

Click pe **Actions** deschide un dialog modal cu fiecare acțiune de operator disponibilă. Fiecare este protejată de permisiune:

| Acțiune             | Permisiune          | Ce face                                                                         |
| ------------------- | ------------------- | ------------------------------------------------------------------------------- |
| **Top up balance**  | `topup-manual`      | Deschide dialogul de sold — creditează portofelul clientului                    |
| **Issue fine**      | `fine`              | Deschide dialogul de amendă — debitează din portofel (daună, parcare)           |
| **Send push**       | —                   | Deschide un dialog pentru trimiterea unei notificări push în aplicație          |
| **Block / Unblock** | `block` / `unblock` | Comută statusul de blocat cu motiv opțional                                     |
| **Edit client**     | `edit`              | Deschide [formularul de editare](client-create-edit.md) |
| **Delete client**   | `delete`            | Ștergere logică cu dialog de confirmare (element roșu distructiv)               |

Acțiunile pentru care nu ai permisiune sunt ascunse.

## Card-uri overview

Un rând de patru card-uri sub header rezumă clientul dintr-o privire:

| Card        | Ce afișează                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| **Balance** | Sold portofel în moneda companiei (roșu dacă negativ)                               |
| **Rides**   | Numărul total de curse pe toată durata                                              |
| **Rating**  | Rating-ul mediu lăsat de rideri pentru acest client                                 |
| **Status**  | Status curent cu un subtitlu de un rând ("Active / Blocked / Frozen / Registering") |

## Tab-uri

Trei tab-uri:

| Tab          | Ce conține                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Details**  | Informații personale (nume, email, telefon, status, sold, etichete) și panoul **Devices** (dispozitive autentificate) |
| **Activity** | Acțiuni de operator și sistem asupra acestui cont (schimbări status, modificări sold etc.)                            |
| **History**  | Istoricul curselor clientului — o felie focusată din lista globală de curse                                           |

### Tab Details

Cea mai profundă vedere a stării contului. Două zone:

**Informații personale (grilă):**

- Prenume
- Nume
- Email (indicator de verificare)
- Telefon (indicator de verificare)
- Status (cu pilula de status)
- Sold (formatat în moneda companiei)
- Etichete (chip-urile aplicate clientului)

**Panou Devices:**

Listează fiecare dispozitiv care s-a autentificat în aplicația rider sub acest cont, cu timestamp-uri last-seen și opțiunea de a trimite push (când e permis) sau a deconecta un dispozitiv. Util pentru investigații de securitate și cazuri de suport "nu mă pot autentifica".

### Tab Activity

**Log-ul de activitate** cronologic pentru acest client: fiecare acțiune de operator (top-up, amendă, schimbare status, edit, trimitere SMS/email/push) și fiecare eveniment de sistem (etape înregistrare, schimbări status verificare, ajustări sold din rambursări).

Util pentru compliance, rezolvare dispute și responsabilitate.

### Tab History

**Istoricul curselor** clientului ca tabel — același format ca lista globală de curse, pre-filtrat pentru acest client. Click pe orice rând deschide detaliul cursei.

Acest tab este punctul tău de pornire pentru cazurile "clientul spune că cursa X a fost greșită".

## Fluxuri tipice

- **Clientul spune că soldul e greșit** — deschide Details (sold curent), apoi Activity (caută ultima schimbare de sold), apoi History (verifică cursa care a declanșat debitarea). Dacă ceva a fost greșit, _Actions → Top up balance_ cu motiv
- **Clientul raportează telefon pierdut** — Details → Devices → deconectează dispozitivul pierdut (când e suportat); opțional blochează portofelul prin _Actions → Block client_ până când recuperează accesul
- **Fraudă sau abuz** — Activity pentru cronologie, History pentru cursele suspecte; apoi _Actions → Block client_ cu motiv; motivul se salvează în log-ul de activitate
- **Rambursare goodwill** — _Actions → Top up balance_ cu descriere "Goodwill refund — ticket #12345"; descrierea e vizibilă în Activity pentru audit trail
- **Welcome / outreach de onboarding** — _Actions → Send push_ cu un mesaj de bun venit; verifică Devices întâi să te asiguri că au sesiune activă

## Sfaturi

- **Urmărește cardul Status** — chiar dacă totul în rest pare ok, un status _Blocked_ sau _Frozen_ explică de ce clientul nu poate face curse
- **Panoul Devices este punctul tău de pornire pentru debug** — majoritatea cazurilor "nu mă pot autentifica" se reduc la o sesiune veche
- **Descrierile top-up și amendă apar în Activity** — scrie ceva ce operatorii pot căuta ulterior ("ticket #X", "refund for ride Y") în loc doar un număr
- **Edit este pentru metadate** — nume, email, telefon — nu pentru sold. Folosește dialogurile dedicate de sold (cu audit trail) pentru operațiuni de bani
- **Rating-ul este rating-ul _de șofer_ al clientului** — rating mic corelat cu vârfuri de park-proof / tickete indică de obicei un rider problematic
- **URL-ul conține ID-ul clientului** — lipește-l într-o conversație de suport pentru a distribui exact profilul
