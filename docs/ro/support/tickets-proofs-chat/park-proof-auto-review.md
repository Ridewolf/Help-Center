# Park Proof Auto Review

Pagina Auto Review (`/support/park-proofs/auto-review`) este o **interfață streamlined de coadă** pentru parcurgerea pending park proofs unul după altul, fără să te întorci la listă între decizii.

În ciuda numelui "Auto", deciziile de moderare îți aparțin în continuare — _auto_ aici înseamnă **auto-advance**: după fiecare acțiune pagina încarcă automat următorul proof în așteptare ca să poți modera fără click pe lista.

Accesează din butonul **Auto Review** de pe [lista Park Proofs](park-proofs.md).

Permisiune necesară: **Park Proofs** (`d5e6f7`) + sub-permisiunea `review`.

## Cum funcționează

1. Pagina încarcă **coada pending curentă** când o deschizi
2. Vezi primul proof — aceeași imagine + aceleași butoane ca pe [pagina de review obișnuită](park-proof-review.md)
3. Alegi o acțiune (Approve / Warn / Reject with fine / Block) sau Skip
4. Pagina **avansează automat** la următorul proof pending
5. Repetă până coada se golește
6. Când e goală, pagina trece la un **stat de așteptare** — solicită proofs noi la interval și le auto-încarcă

Nu îți pierzi locul: dacă închizi tabul și revii, coada se reconstruiește din ce rămâne pending.

## Structură

Două coloane egale pe ecrane largi, se stivuiesc pe cele înguste:

| Coloană     | Lățime | Conținut                                                     |
| ----------- | ------ | ------------------------------------------------------------ |
| **Image**   | 6/12   | Foto zoomabilă + timestamp creare dedesubt                   |
| **Actions** | 6/12   | Aceeași stivă Approve / Warn / Reject+fine / Block / Comment |

O bară de progres deasupra arată cât de departe ești în coadă.

## Header

- **Titlu** "Park Proof Auto Review"
- **Subtitlu** cu progres: `Reviewing X of Y · PP-12345`
- Butonul **Skip** (dreapta-sus) — sare peste proof-ul curent fără decizie și trece la următorul (proof-ul rămâne _Pending_)
- **Săgeată înapoi** — revine la [lista Park Proofs](park-proofs.md)

**Bara de progres** sub header se umple pe măsură ce lucrezi — efect shimmer mic pe porțiunea umplută.

## Butoane de acțiune

Identice cu [pagina de Review individual](park-proof-review.md):

| Buton                | Efect                                                        |
| -------------------- | ------------------------------------------------------------ |
| **Approve**          | Marchează ca _Approved_ → auto-advance                       |
| **Warn**             | Marchează ca _Warning_ + trimite notificare → auto-advance   |
| **Reject with fine** | Marchează ca _Fined_ cu suma din input → auto-advance        |
| **Block**            | Marchează ca _Blocked_ (riderul, nu proof-ul) → auto-advance |
| **Skip**             | Nu decide; trece la următorul (acesta rămâne _Pending_)      |
| **Comment**          | Textarea opțional — se atașează oricărui buton apăsat        |

După orice decizie, următorul proof glisează în. Nu există "Undo" — odată ce dai click, acțiunea e commitată.

## Stat de așteptare

Când coada se golește, pagina arată un **ecran de așteptare** în loc de un Card Actions gol:

- Mesaj "All proofs reviewed"
- Un **countdown** până la următoarea reîmprospătare automată (de obicei câteva minute)
- Buton **Check now** — sări peste countdown și verifică imediat
- Buton **Exit** — revine la listă

Dacă un proof nou sosește în timpul așteptării (un rider tocmai a încheiat o cursă), pagina îl încarcă automat și reia ritmul de moderare.

## Când să folosești Auto Review vs Lista

| Folosește lista (`/support/park-proofs`) când…         | Folosește Auto Review când…                           |
| ------------------------------------------------------ | ----------------------------------------------------- |
| Verifici clienți sau curse specifice                   | Cureți un backlog de proofs pending generice          |
| Ai nevoie doar de un approve rapid din meniul rândului | Vrei fiecare fotografie în fața ta la dimensiune mare |
| Auditezi decizii anterioare (Approved / Fined / etc.)  | Te concentrezi pe coada _Pending_ chiar acum          |
| Vrei filtru pe interval dată, tip sau client           | Vrei viteză: imagine → acțiune → următor              |

Auto Review este unealta de **flow state** — deschide-o la începutul turei de moderare și nu pleca până coada nu e goală.

## Fluxuri tipice

- **Început tură** — deschide Auto Review → parcurge fiecare proof pending → termină pe ecranul de așteptare → ia o pauză
- **Burst rapid** — deschide-o 10 minute, șterge ce poți, _Exit_ înapoi la listă când altceva îți cere atenția
- **Caz ambiguu în mijloc** — când ai nevoie de context suplimentar (hartă cursă completă, istoric client), click pe link-urile entității în review-ul obișnuit (nu sunt arătate aici); poți face _Skip_ la proof și să te întorci la el din listă

## Sfaturi

- **Scrie comentariul întâi** — aceeași regulă ca pe pagina de review obișnuită: click-ul commitează înainte să apuci să salvezi un comentariu târziu
- **Skip este prietenul tău** pentru cazuri ambigue — nu amenda pentru că ești "aproape sigur"; sari peste și revizuiește din listă cu context complet (istoric client, hartă cursă)
- **Auto-advance e rapid** — nu te grăbi; dacă greșești la Reject with fine, portofelul riderului e debitat în secunde
- **Ecranul de așteptare este sănătos** — o coadă goală înseamnă că echipa ține pasul. Ridică-te de la tastatură când îl vezi
- **Fără filtre aici** — Auto Review parcurge coada pending nefiltrată în ordinea sosirii; folosește [lista](park-proofs.md) dacă ai nevoie de un subset
- **E sigur să închizi tabul** — locul tău este însăși coada _Pending_; poți relua de unde e coada acum
