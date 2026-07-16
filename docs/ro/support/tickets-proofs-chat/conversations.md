# Conversații

Pagina Conversații (`/support/conversations`) este **messenger-ul operatorului** — o interfață chat în timp real între echipa ta de suport și rideri. Fiecare conversație aparține unui client și conține istoricul complet al mesajelor, acțiunile echipei și schimbările de status.

Permisiune necesară: **Conversations** (`x2y3z4`).

## Cum apar conversațiile aici

Conversațiile sosesc din câteva fluxuri:

1. **Riderul deschide un chat** în aplicația mobilă — creează o conversație _New_, intră în coadă _Waiting_
2. **Operatorul inițiază** — _+ New_ în sidebar îți permite să începi un chat cu un client specific (ex. follow-up pe o amendă sau verificare fraudă)
3. **Reopened** — conversațiile închise pot fi redeschise (de rider sau operator) și revin în top-ul listei

Lista este **live** — conversații noi și mesaje sosite vin prin WebSocket fără refresh.

## Structură

Pagina are două zone principale. Layout-ul se adaptează la dimensiunea ecranului:

- **Desktop** — vedere divizată, sidebar în stânga (30%) și conținut chat în dreapta (70%), cu un mâner tragibil
- **Mobile** — o zonă pe rând: lista sidebar sau chat-ul deschis (săgeata înapoi revine la listă)

## Sidebar (stânga)

Coada de conversații și filtre:

- **+ New** — deschide un dialog pentru a căuta un client și a începe o conversație nouă (status _Waiting_)
- **Search** — căutare text pe nume client, ID, ultim mesaj
- **Filtre status** — pilule cu contoare: `All` / `New` / `Waiting` / `Active` / `Delayed` / `Closed`
- **Carduri de conversație** — fiecare arată: avatar, nume client, preview ultim mesaj, pilulă status, timestamp, badge necitite. Click pentru a deschide
- **Load more** — paginare la scroll

Sortarea implicită pune cele neresponsive (Waiting / Active cu necitite) sus — chat-urile cele mai urgente sunt mereu în câmpul vizual.

### Referință statusuri

| Status      | Înseamnă                                                         |
| ----------- | ---------------------------------------------------------------- |
| **New**     | Tocmai deschis, nimeni nu a citit încă                           |
| **Waiting** | Neatribuit, în coadă pentru orice operator                       |
| **Active**  | Atribuit unui operator, în desfășurare                           |
| **Delayed** | Operatorul l-a pus în așteptare (așteaptă informații, follow-up) |
| **Closed**  | Rezolvat și închis                                               |

## Conținut chat (dreapta)

Când selectezi o conversație, coloana din dreapta arată:

### Header chat

- **Săgeată înapoi** (doar mobil) — revine la lista sidebar
- **Titlu** — nume client cu pilula de status
- **Open info** — deschide [User Info sidebar](#info-paneluri) cu context complet
- **Delay / Transfer / Close** — butoane în funcție de status

### Fereastra chat

- **Bubble-uri de mesaje** — mesajele operatorului în dreapta (accent), mesajele riderului în stânga; cu timestamp-uri și indicatori de citire
- **Indicator typing** — apare când riderul scrie
- **Load older** sus — încarcă mesaje mai vechi la cerere
- **To new messages** — scurtătură scroll-to-bottom când ai derulat sus
- **Acțiuni mesaj** la hover — Edit / Delete pe propriile mesaje

### Canned responses

Un rând deasupra input-ului afișează template-uri de răspunsuri rapide grupate pe categorii. Click pune textul în input — poți edita înainte de trimitere.

### Footer chat

Ce apare în footer depinde de **statusul** conversației și atribuire:

- **Active + atribuit ție** → **Message input** cu meniu de atașament (text + imagine / fișier)
- **Altfel** → bara **Conversation Actions** cu butoanele relevante stării curente

## Acțiuni conversație (după status)

Footer-ul arată butoanele potrivite statusului curent. Comune:

| Acțiune       | Disponibilă când…                    | Ce face                                     |
| ------------- | ------------------------------------ | ------------------------------------------- |
| **Accept**    | Waiting / New (nu îți aparține încă) | Atribuie ție și trece la _Active_           |
| **Take over** | Active (alt operator deține)         | Reatribuie ție                              |
| **Return**    | Active (atribuit ție)                | Eliberează conversația înapoi în _Waiting_  |
| **Delay**     | Active                               | Pune conversația pe pauză → _Delayed_       |
| **Reopen**    | Closed                               | O readuce în _Active_                       |
| **Close**     | Active                               | Marchează ca rezolvată → _Closed_           |
| **Delete**    | Protejat permisiune                  | Ștergere logică (admin)                     |
| **New**       | Mereu                                | Începe o conversație nouă cu același client |

Ești protejat să acționezi pe un chat care nu îți aparține — vei vedea un buton _Take over_ în loc de input când chat-ul e atribuit altcuiva.

## Info paneluri

Două paneluri glisante se deschid din acțiunile chat-window:

- **User Info Sidebar** — context rapid pentru operatorul atribuit (tine) și activitatea recentă a riderului în acest chat
- **Client Info Sheet** — snapshot complet al profilului clientului (sold, status, etichete, curse recente) fără a părăsi chat-ul

## Stare goală (desktop)

Când niciun chat nu e selectat pe desktop, panoul din dreapta afișează o ilustrație de stare goală cu un hint să alegi o conversație. Pe mobil, panoul din dreapta nu există până nu selectezi unul — lista sidebar umple ecranul.

## Fluxuri tipice

- **Preia un chat în așteptare** — `Status = Waiting` → click pe cardul de sus → _Accept_ → începe să discuți
- **Preia o conversație de la un coleg** — deschide chat-ul (vezi că e deținut de altcineva) → _Take over_ (folosește cu măsură; rupe continuitatea pentru rider)
- **Răcește o conversație lentă** — când riderul nu mai răspunde, _Delay_ o mută din coada activă; revine în inbox când răspunde
- **Închide** — problemă rezolvată → _Close_ cu un răspuns canned ("Totul în regulă, drum bun!")
- **Obține rapid contextul riderului** — _Open info_ în header → vezi sold / curse recente / etichete înainte să răspunzi la o întrebare de facturare
- **Folosește canned responses** — pentru răspunsuri repetitive (politică rambursare, obiect pierdut) alege un template și personalizează

## Sfaturi

- **Live implicit** — mesajele noi vin fără refresh; badge-ul se actualizează automat
- **Necitite întâi** — sortarea ține chat-urile urgente sus; ai încredere în ordinea listei
- **Canned responses sunt template-uri, nu scripturi** — personalizează mereu salutul și încheierea; riderii simt când primesc boilerplate
- **Take over cu grijă** — riderul nu vede starea la nivel de operator. Comutarea în mijlocul conversației poate fi neplăcută; ia doar când operatorul curent e clar blocat (offline, off-shift)
- **Delay > Close în cazuri incerte** — dacă crezi că problema poate reveni, _Delay_ păstrează thread-ul legat; _Close_ îl face pe rider să deschidă o conversație nouă dacă vrea să continue
- **Edit doar mesajele tale** — și doar greșeli de scriere scurte; rescrierea unui mesaj vechi după ce riderul l-a citit poate strica încrederea
- **URL-ul are ID-ul conversației** — lipește-l într-un ticket sau notă de escaladare ca următorul operator să poată sări direct
