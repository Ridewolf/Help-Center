# Park Proof Review

Pagina de review (`/support/park-proofs/:id/review`) este locul unde moderezi o fotografie park-proof în detaliu. Imaginea completă, tot contextul asociat (client / cursă / vehicul) și meniul complet de acțiuni trăiesc aici.

De obicei ajungi aici cu click pe miniatură (sau _View_ în meniul rândului) de pe [lista Park Proofs](park-proofs.md).

Permisiune necesară: **Park Proofs** (`d5e6f7`) + sub-permisiunea `review` pentru acțiunile de moderare.

## Structură

Pagina e împărțită în trei coloane pe ecrane largi, se stivuiește pe cele înguste:

| Coloană        | Lățime | Conținut                                               |
| -------------- | ------ | ------------------------------------------------------ |
| **Image**      | 5/12   | Fotografia full-size cu zoom și pan                    |
| **Actions**    | 4/12   | Butoane de moderare, comentariu opțional, Delete admin |
| **Info cards** | 3/12   | Client, Cursă, Vehicul, detalii Proof                  |

## Image (coloana stângă)

Un **vizualizator de imagine zoomabil** cu fotografia la rezoluție completă:

- **Click + drag** pentru pan când e zoomat
- **Rotița mouse-ului** (sau pinch pe mobil) pentru zoom
- **Dublu-click** pentru reset zoom

Caută:

- Tot vehiculul în cadru (nu doar o roată)
- Un loc legal de parcare (nu blochează pietoni, nu în zonă interzisă)
- Cricul jos, vehicul vertical
- Orice contrazice povestea riderului dacă există dispută

## Actions (coloana din mijloc)

Patru butoane de moderare stivuite vertical, în ordinea severității:

| Buton                | Efect status | Folosește când                                                             |
| -------------------- | ------------ | -------------------------------------------------------------------------- |
| **Approve**          | _Approved_   | Fotografie bună — riderul a parcat corect                                  |
| **Warn**             | _Warning_    | Fotografie nu e grozavă dar nu suficient de rea pentru amendă — notificare |
| **Reject with fine** | _Fined_      | Fotografie proastă — aplică o amendă cu suma introdusă sub buton           |
| **Block**            | _Blocked_    | Încălcare gravă / repetată — blochează riderul de la curse viitoare        |

Fiecare acțiune necesită sub-permisiunea `review`. Acțiunile pentru care nu ai permisiune sunt ascunse sau dezactivate.

### Suma amenzii

Butonul **Reject with fine** are un input numeric direct sub el pentru **suma amenzii** în moneda companiei. Amenda este debitată din portofelul clientului (sau metoda de plată implicită, în funcție de configurație). Suma este obligatorie la click _Reject with fine_ — altfel butonul e dezactivat.

### Comentariu

Un textarea **Comment** sub butoanele de acțiune. Ce scrii e atașat acțiunii și salvat în:

- Înregistrarea proof (pentru audituri viitoare)
- [Activity log-ul clientului](../../operations/customers/client-detail.md#tab-activity) (oricine investighează clientul ulterior îți va vedea nota)
- Notificarea in-app pentru rider (în funcție de acțiune — vede contextul de ce a fost avertizat / amendat)

Scrie comentariul **înainte** de a apăsa acțiunea — se trimite împreună cu acțiunea, nu după. Fii specific: "trotinetă blochează trotuarul, foto făcut la 22:14" e mai bun decât "parcat prost".

### Delete (admin)

Un buton **Delete** la sfârșit (vizibil doar cu permisiune admin) șterge complet înregistrarea proof. Folosește-l pentru:

- Fotografii de test / upload-uri spam
- Upload-uri duplicate (aceeași cursă, mai multe fotografii identice)
- Fotografii încărcate pentru o cursă greșită (eroare de date)

Nu folosi Delete în loc de Approve / Reject — Delete este pentru _scoaterea înregistrării din sistem_, nu pentru decizii de moderare.

## Info cards (coloana dreaptă)

Trei carduri "entitate asociată" plus un card de detalii stivuite vertical:

- **Client** — nume, telefon, email, status, link-uri la [pagina de detaliu client](../../operations/customers/client-detail.md)
- **Ride** — ID cursă, timestamp-uri start/sfârșit, distanță, cost; link la [pagina de detaliu cursă](../../operations/trips/ride-detail.md)
- **Vehicle** — etichetă, model, status; link la [pagina de detaliu vehicul](../../operations/fleet/vehicle-detail.md)
- **Park Proof Details** — tip (start/park/end), creat la, coordonate GPS, orice verdict auto-review deja aplicat

Folosește card-urile ca să **construiești contextul rapid**:

- Acest client e prima dată sau recidivist? — deschide Client → Activity
- A încheiat cursa în locația din fotografie? — deschide Ride → harta traseului
- Acest vehicul e parcat des prost? — deschide Vehicle → proofs recente

## Fluxuri tipice

- **Aprobare rapidă** — imaginea clar bună → lasă comentariul gol → _Approve_ → înapoi la coadă
- **Avertisment cu context** — imagine proastă dar blândă → scrie o notă de un rând → _Warn_ → riderul primește un ghiont
- **Amendă după considerație** — imagine clar proastă → verifică Card Client pentru recidive → scrie o notă explicând amenda → introdu suma → _Reject with fine_
- **Escaladare la block** — imagine e a treia ofensă → verifică Client → Activity pentru avertismente anterioare → scrie o notă → _Block_
- **Audit decizie anterioară** — deschide proof-ul → citește câmpul Comment în log-ul de activitate pentru a vedea ce a scris operatorul anterior

## Sfaturi

- **Zoom înainte de decizie** — cricuri, semne de parcare și trotuare sunt ușor de ratat în miniatură
- **Scrie comentariul întâi** — odată ce apeși o acțiune, se trimite; dacă scrii comentariul după, ai moderat deja fără context
- **Approve > Warn > Fine > Block** este o escaladare într-o singură direcție — nu sări direct la Block la prima ofensă
- **Comentariul este public** (pentru echipă și rider) — păstrează-l factual; fără jargon intern, fără opinii despre client
- **Delete este ireversibil** — odată șters un proof nu poate fi recuperat; folosește _Reject_ dacă vrei o înregistrare a fotografiei proaste
- **Imaginea este adevărul** — când riderul contestă o amendă, fotografia originală + comentariul tău + cronologia = dosarul cazului
