# Pending Webhooks

Pagina Pending Webhooks (`/payments/pending-webhooks`) listează tranzacțiile de plată blocate în **Pending** pentru că nu a sosit încă confirmarea webhook de la furnizorul de plăți.

Fiecare rând este o plată trimisă unui furnizor pentru care nu am primit un callback final cu statusul. Folosește această pagină ca **coada ta de plăți blocate**: scanează rândurile vechi, identifică furnizorul care întârzie, escaladează.

Permisiune necesară: **Payments** (`m1n2p3`).

## Ce vezi

Când un client plătește:

1. Dashboard-ul trimite o cerere de plată unui **furnizor** (Stripe, gateway etc.) — se creează un _Payment Intent_
2. Furnizorul procesează tranzacția asincron și trimite un **webhook** cu statusul final (`succeeded`, `failed` etc.)
3. Dashboard-ul aude webhook-ul și schimbă statusul [plății](payments.md) din _Pending_ în _Completed_ / _Failed_

Rândurile **Pending Webhooks** sunt pasul 2 blocat — furnizorul a fost contactat dar nu a răspuns. Cel mai adesea webhook-ul sosește în câteva secunde, ocazional minute. Orice mai vechi de ~30 minute este suspect; orice mai vechi de 2 ore este aproape sigur defect pe partea furnizorului sau a receiver-ului nostru.

## Filtre

| Filtru         | Tip    | Note                                                                      |
| -------------- | ------ | ------------------------------------------------------------------------- |
| **Provider**   | Text   | Caută după numele furnizorului (ex. `stripe`)                             |
| **Older than** | Select | `All` / `5` / `15` / `30` / `60` / `120` minute — afișează doar mai vechi |

Folosește _Older than 30 min_ sau _60 min_ ca filtru zilnic de monitorizare — pending-urile proaspete sunt zgomot.

## Coloane

| Coloană               | Sortabilă? | Conținut                                                                |
| --------------------- | ---------- | ----------------------------------------------------------------------- |
| **Created at**        | ✓          | Când a fost creat payment intent-ul                                     |
| **Age**               | ✓          | Minute de la creare — cod de culori (mai jos)                           |
| **Provider**          | —          | Furnizorul de plată căruia i s-a trimis intent-ul                       |
| **Payment Intent ID** | —          | ID-ul intent-ului la furnizor — copiază-l la escaladare                 |
| **Status**            | —          | Statusul la furnizor (raw) — de obicei `requires_action` / `processing` |
| **Order ID**          | —          | ID-ul nostru intern de order/payment                                    |

### Cod de culori Age

Coloana **Age** își schimbă culoarea pe măsură ce îmbătrânește, ca să poți scana și triaja dintr-o privire:

| Age            | Culoare | Ce să faci                                           |
| -------------- | ------- | ---------------------------------------------------- |
| **< 30 min**   | Gri     | Normal; ignoră                                       |
| **30–120 min** | Galben  | Merită o privire; verifică dashboard-ul furnizorului |
| **> 120 min**  | Roșu    | Aproape sigur defect — escaladează                   |

## Acțiuni pe rând

Un mic meniu de acțiuni în dreapta fiecărui rând:

| Acțiune         | Ce face                                         |
| --------------- | ----------------------------------------------- |
| **View client** | Deschide profilul clientului atașat intent-ului |

(_View payment detail_ este în cod dar temporar dezactivat — pagina de detaliu plată este feature-dropped, revine mai târziu.)

## Fluxuri tipice

- **Monitorizare zilnică** — setează _Older than = 30 min_ → pagina ar trebui să fie goală majoritatea timpului → dacă nu, scanează coloana Provider
- **Avarie un singur furnizor** — vezi multe rânduri ale aceluiași furnizor devin galbene/roșii simultan → verifică pagina de status a furnizorului → contactează suportul lor cu câteva _Payment Intent IDs_ din tabel
- **Problemă un singur client** — unul sau două rânduri vechi → _View client_ → verifică Activity / Payments-ul clientului → spune-i să retry sau să folosească altă metodă
- **Problemă receiver webhook** — mulți furnizori devin roșii deodată fără avarie pe partea lor → problema e la receiver-ul nostru, escaladează la echipa de inginerie

## Când dispare un rând

Un rând părăsește această pagină când webhook-ul sosește — statusul plății devine _Completed_ sau _Failed_ în [lista de plăți](payments.md). Rândul nu "îmbătrânește" de la sine; doar un webhook îl șterge.

Dacă ai **pendings blocate mai vechi de o zi** care nu pleacă, e un bug de escaladat — dashboard-ul de operator nu are buton manual "force complete" din motive de siguranță (o completare manuală incorectă creează o încurcătură contabilă greu de desfăcut).

## Sfaturi

- **Copiază Payment Intent ID** când escaladezi către un furnizor — e singurul ID pe care îl recunosc
- **Sortare după Age** (cele mai noi → cele mai vechi) îți dă o coadă de triaj: vârful listei sortate este munca ta urgentă
- **Pagina goală este scopul** — Pending Webhooks ar trebui să fie goală (sau aproape) într-o zi normală; tratează orice rând ca muncă de făcut
- **Căutarea provider e loose** — potrivire parțială funcționează (`stri` găsește `stripe`)
- **Pagina nu se auto-refresh** — folosește butonul refresh sau reîncarcă pagina când triezi activ
