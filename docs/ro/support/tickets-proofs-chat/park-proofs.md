# Park Proofs — Listă

Lista Park Proofs (`/support/park-proofs`) este coada de moderare pentru fotografiile pe care riderii le fac vehiculului la momente cheie ale unei curse. Aceste fotografii dovedesc că riderul a parcat corect (sau nu), iar treaba echipei tale aici este să **aprobi fotografii bune, avertizezi sau penalizezi pe cele rele**.

Pentru revizuirea per fotografie (ecranul mare de moderare a unei fotografii), vezi [Park Proof Review](park-proof-review.md). Pentru regulile de automatizare care gestionează cazurile evidente fără tine, vezi [Auto Review](park-proof-auto-review.md).

Permisiune necesară: **Park Proofs** (`d5e6f7`). Anumite acțiuni pe rând necesită sub-permisiuni suplimentare.

## Cum ajung proofs aici

Aplicația mobilă a riderului îi cere să facă o fotografie în trei puncte:

1. **Start** — la deblocarea vehiculului (dovedește că unitatea era în stare bună la preluare)
2. **Park** — în timpul unei pauze din mijlocul cursei (dovedește parcarea legală în timpul opririi)
3. **End** — la finalizarea cursei (**cea principală** — dovedește că au lăsat vehiculul parcat corect)

Fotografia este încărcată cu metadate GPS și postată în această coadă cu statusul **Pending**. Auto Review o poate trece în _Approved_ (fotografie bună) fără input de operator; orice nu e sigur Auto Review ajunge aici pentru revizuire umană.

## Filtre

| Filtru        | Tip      | Note                                                                 |
| ------------- | -------- | -------------------------------------------------------------------- |
| Search        | Text     | Caută după nume client, etichetă vehicul, ID cursă                   |
| Interval dată | Calendar | De la / până la; implicit "tot timpul"                               |
| Status        | Dropdown | `Pending` / `Approved` / `Warning` / `Fined` / `Blocked` (sau `All`) |
| Type          | Dropdown | `Start` / `Park` / `End` (sau `All`)                                 |

Folosește `Status = Pending` ca filtru zilnic de monitorizare — e coada de moderare.

## Coloane

| Coloană     | Sortabilă? | Conținut                                                              |
| ----------- | ---------- | --------------------------------------------------------------------- |
| **Image**   | —          | Miniatură foto (click deschide pagina de review)                      |
| **User**    | —          | Nume și avatar client; click deschide profilul                        |
| **Vehicle** | —          | Etichetă și model vehicul; click deschide detaliul                    |
| **Ride**    | —          | ID cursă; click deschide detaliul cursei                              |
| **Type**    | ✓          | Faza cursei (`Start` / `Park` / `End`)                                |
| **Status**  | ✓          | Pilula de status (referință mai jos)                                  |
| **Date**    | ✓          | Când a fost făcută fotografia; sortare implicită = cele mai noi întâi |

## Referință statusuri

| Status       | Culoare    | Înseamnă                                                                       |
| ------------ | ---------- | ------------------------------------------------------------------------------ |
| **Pending**  | Galben     | Așteaptă moderare (a ta sau a Auto Review)                                     |
| **Approved** | Verde      | Fotografie bună — riderul a parcat corect                                      |
| **Warning**  | Portocaliu | Fotografie nu prea bună — riderul primește un avertisment fără amendă încă     |
| **Fined**    | Roșu       | Fotografie proastă — riderul a fost amendat (sau sistemul a marcat-o ca atare) |
| **Blocked**  | Gri        | Riderul a fost blocat din cauza acestui proof (încălcare gravă / repetată)     |

Statusurile setate prin acțiuni pe rând și pe pagina de review sunt logate atât în înregistrarea proof, cât și în [Activity log-ul](../../operations/customers/client-detail.md#tab-activity) clientului.

## Acțiuni pe rând

Fiecare rând are un **meniu cu trei puncte** în dreapta. Acțiunile disponibile depind de permisiuni:

| Acțiune       | Permisiune    | Ce face                                                                                                            |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------ |
| **View**      | `view-detail` | Deschide [pagina de review](park-proof-review.md) cu imaginea completă și contextul |
| **Approve**   | `review`      | Marchează proof-ul ca _Approved_ (fără amendă, fără avertisment) — pentru fotografii bune                          |
| **Warn**      | `review`      | Marchează ca _Warning_ — riderul este notificat dar nu amendat                                                     |
| **Open ride** | —             | Sare la detaliul cursei asociate (harta traseului, cronologie etc.)                                                |

Acțiunile pentru care nu ai permisiune sunt ascunse.

Setul complet de acțiuni (Fine, Block user, Create maintenance task, Ask to repark) trăiește pe **pagina de review** — vino acolo pentru orice mai mult decât un approve/warn rapid.

## Acțiuni de pagină (dreapta-sus)

- **Auto Review** — deschide [pagina de setări Auto Review](park-proof-auto-review.md) pentru a configura regulile care auto-aprobă fotografiile evident bune și auto-flag pe cele evident proaste (asta golește coada Pending astfel încât să verifici doar cazurile la limită)

## Fluxuri tipice

- **Coada zilnică de moderare** — `Status = Pending` → sortează după dată cele mai vechi întâi → parcurge fiecare, _View_ pentru context, _Approve_ / _Warn_ în funcție de ce vezi
- **Investighează o plângere** — caută după ID cursă sau client → găsește proof-ul → _View_ → compară fotografia cu pretenția riderului
- **Găsește recidiviști** — caută după nume client → uită-te la mai multe proofs pentru a vedea un tipar (activity log-ul profilului spune aceeași poveste)
- **Doar end-of-ride** — `Type = End` → revizuiește doar fotografiile de final (cele mai importante; park photos mid-ride sunt de obicei ok)
- **Audit Auto Review** — filtrează `Status = Approved` pentru ultima zi → verifică un eșantion ca să te asiguri că regulile funcționează corect

## Sfaturi

- **Miniatura e suficientă pentru majoritatea deciziilor** — clar în zonă, încadrat drept, fără obstacole — _Approve_ fără a deschide. Păstrează _View_ pentru fotografii ambigue
- **Open ride** este scurtătura ta către context — dacă riderul susține că a parcat legal, harta cursei îți spune unde a oprit de fapt
- **Statusurile sunt sticky** — odată setat _Approved_, riderul nu mai primește reminders pentru acel proof. Nu aproba o fotografie proastă pentru a "curăța coada" — pierzi posibilitatea de follow-up
- **Warning este intermediarul tău** — folosește-l când fotografia e proastă dar nu malițioasă (riderul s-a grăbit, vremea era proastă etc.). Avertismentele repetate escaladează la amenzi prin regulile Auto Review
- **Folosește Auto Review agresiv** — coada crește repede; cu cât mai multe fotografii evident-bune le aprobă singur, cu atât ai mai multă energie pentru cele genuine ambigue
- **URL-ul se distribuie** — copiază o vizualizare filtrată (ex. _fined de ieri_) și trimite-o unui coleg pentru spot-check
