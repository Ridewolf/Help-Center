# Dettaglio Prova di Parcheggio

La pagina di dettaglio della prova di parcheggio (`/support/park-proofs/:id`) è dove si esamina una prova di parcheggio in profondità e — se è ancora in sospeso — la si modera. Si apre come un ampio dialogo sopra la [lista Prove di Parcheggio](park-proofs.md); l'URL cambia così che la prova sia condivisibile / linkabile direttamente.

Di solito si arriva qui cliccando su _Visualizza_ in una riga, cliccando una tessera in vista galleria, o incollando un URL diretto.

Permesso richiesto: **Prove di Parcheggio** (`d5e6f7`). Il sotto-permesso `review` abilita le azioni di moderazione, `delete` abilita il pulsante Elimina.

## Come si relaziona alla pagina di revisione

Entrambe `/support/park-proofs/:id` (questa pagina) e `/support/park-proofs/:id/review` esistono — sembrano simili ma servono a scopi diversi:

| Superficie                                                                         | Cos'è                                                                                                                                       |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dettaglio Prova di Parcheggio (questa pagina)**                                | Un **dialogo** aperto dalla lista — immagine completa con zoom, contesto completo, set completo di azioni. Vista singolo record. URL `/support/park-proofs/:id` |
| [Revisione Prova di Parcheggio](park-proof-review.md)                            | Una **pagina a schermo intero** (`/:id/review`) — la superficie dedicata alla revisione per una prova                                      |
| [Revisione Automatica Prova di Parcheggio](park-proof-auto-review.md)            | **Modalità semplificata** — coda automatica di prove in sospeso, una alla volta                                                             |

Nella quotidianità: usa la **Revisione Automatica** per smaltire la coda, il **dialogo di dettaglio** (questa pagina) per ispezioni occasionali dalla lista, e la **pagina di revisione** per il flusso dedicato del revisore.

## Layout

Il dialogo è diviso in due colonne su schermi larghi, si impila su quelli stretti:

| Colonna          | Larghezza | Contenuti                                                                                              |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| **Immagine (sinistra)** | 3/5       | La foto a piena risoluzione con zoom, su sfondo nero                                                  |
| **Info (destra)** | 2/5       | Intestazione (titolo + badge stato / tipo), contesto (cliente / corsa / veicolo), griglia dettagli, azioni di revisione |

## Immagine (colonna sinistra)

Un grande visualizzatore di immagini con la foto a piena risoluzione su sfondo nero:

- **Clicca sull'immagine** per alternare lo zoom (1× → 2× → 3× → 4× → torna a 1×)
- **Rotella del mouse** per zoomare avanti o indietro a passi di 0,5×
- Il cursore cambia tra zoom-in / zoom-out a seconda dello stato
- Un **badge di zoom %** appare in alto a sinistra ogni volta che sei zoomato oltre 1×

Quattro pulsanti appaiono in basso a destra al passaggio del mouse (semi-trasparenti sullo sfondo nero):

| Pulsante            | Cosa fa                                                                        |
| ------------------- | ------------------------------------------------------------------------------ |
| **Zoom in**         | Passo di zoom +0,5× (fino a un massimo di 4×)                                 |
| **Zoom out**        | Passo di zoom -0,5× (fino a un minimo di 1×)                                  |
| **Minimizza**       | Reimposta lo zoom a 1×                                                        |
| **Apri in nuova scheda** | Apre l'immagine a risoluzione originale in una nuova scheda del browser per un'ispezione più ravvicinata |

Cerca gli stessi segnali come nella [pagina di revisione](park-proof-review.md): veicolo intero inquadrato, posto di parcheggio legale, cavalletto abbassato, qualsiasi cosa contraddica la dichiarazione del rider.

## Intestazione (in alto nella colonna destra)

La striscia dell'intestazione identifica la prova:

- **Titolo** _"Revisione Prova di Parcheggio"_ con una breve descrizione sotto
- Due **badge** impilati a destra:
  - **Badge stato** — colorato per corrispondere allo stato (giallo In sospeso, verde Approvato, arancione Avviso, rosso Rifiutato, scuro Bloccato)
  - **Badge tipo** — pillola outline che mostra _Inizio_ / _Parcheggio_ / _Fine_

## Sezione contesto

Tre righe che collegano entità correlate. Ognuna è un router-link (clicca per aprire la pagina di dettaglio correlata nella stessa finestra):

| Riga          | Mostra                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Cliente**   | Nome cliente (collegato al [dettaglio cliente](../../operations/customers/client-detail.md)), email + telefono (clicca per copiare) |
| **Corsa**     | Nome / id corsa collegato al [dettaglio corsa](../../operations/trips/ride-detail.md)                                  |
| **Veicolo**   | Etichetta veicolo collegata al [dettaglio veicolo](../../operations/fleet/vehicle-detail.md), tipo veicolo sotto      |

Usa questi riferimenti incrociati per costruire rapidamente il contesto — questo cliente ha violato prima, ha effettivamente terminato la corsa qui, questo veicolo è stato segnalato spesso.

## Sezione dettagli

Una griglia chiave/valore a due colonne sotto il contesto. I campi che appaiono dipendono dallo stato della prova:

| Campo               | Quando mostrato            | Cosa mostra                                                                                                                                                                                                                                   |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Creato**          | Sempre                     | Quando l'app del rider ha caricato la foto                                                                                                                                                                                                   |
| **Revisionato il**  | Solo dopo la revisione     | Quando un operatore (o la Revisione Automatica) ha preso la decisione                                                                                                                                                                         |
| **Durata revisione**| Solo dopo la revisione     | Delta di tempo tra Creazione e Revisione (es. "2h 14m") — utile per misurare gli SLA rispetto alla prova                                                                                                                                     |
| **Revisionato da**  | Solo dopo revisione operatore | L'operatore che ha effettuato la revisione. Collegato al suo [profilo operatore](../../settings/access/operators.md). Se l'operatore non è risolvibile (404, nessun permesso), l'id viene mostrato come link cliccabile — la pagina del profilo gestisce la propria autenticazione |
| **Posizione**       | Quando la corsa ha coordinate | Latitudine / longitudine dell'inizio della corsa (per prove di _Inizio_) o della fine (per prove di _Parcheggio_/_Fine_), con 6 decimali                                                                                                      |

Se la prova è stata rifiutata con una multa, sotto i dettagli appare un avviso rosso _Multa_ con l'importo della multa nella valuta aziendale.

Se esiste un commento precedente o un motivo di rifiuto, appare come sezione _Commento_ sotto.

## Azioni di revisione (solo in sospeso)

Se lo stato della prova è **In sospeso**, in fondo alla colonna di destra appare un selettore di azioni. Il dialogo dettagliato supporta **cinque** azioni di moderazione (una in più rispetto alla pagina di revisione dedicata):

| Azione                   | Effetto sullo stato | Campi extra           | Quando usarla                                                                        |
| ------------------------ | ------------------- | --------------------- | ------------------------------------------------------------------------------------ |
| **Approva**              | _Approvato_         | —                     | La foto è chiaramente valida — nessun commento necessario                            |
| **Approva con commento** | _Approvato_         | Commento obbligatorio  | La foto è valida ma vuoi lasciare una nota (caso limite, riferimento futuro, addestramento ML) |
| **Avvisa**               | _Avviso_            | Commento consigliato   | La foto non è ideale — il rider riceve una notifica soft, nessuna multa              |
| **Rifiuta**              | _Rifiutato_         | Commento + importo multa | Foto scadente — multa applicata. La multa viene addebitata dal portafoglio al momento dell'invio |
| **Blocca**               | _Bloccato_          | Commento obbligatorio  | Infrazione grave / recidiva — blocca il rider da future corse                        |

Ogni azione appare come una scheda radio cliccabile con descrizione; selezionandone una si mostrano i campi condizionali (area commento e/o input importo multa). Il pulsante principale di invio assume il colore dell'azione (verde / giallo / rosso / scuro).

Una volta inviato, il dialogo si chiude, un toast conferma l'azione e la lista si aggiorna.

### Cosa cambia rispetto alla pagina di revisione

La pagina di revisione dedicata [review page](park-proof-review.md) (`/:id/review`) mostra **quattro** azioni come pulsanti impilati. Questo dialogo mostra **cinque** azioni come schede radio — quella in più è _Approva con commento_, utile per registrare un contesto su una decisione positiva senza trasformarla in un avviso.

## Prove chiuse (già revisionate)

Se la prova è già stata revisionata (Approvata / Avviso / Rifiutata / Bloccata), la sezione azioni è nascosta — il dialogo diventa di sola lettura. Vedi comunque tutto il contesto (immagine, cliente / corsa / veicolo, dettagli, multa, commento, chi ha revisionato e quando), e puoi ancora:

- **Eliminare** il record (con permesso `delete`) — solo per upload spam / test / corsa errata
- **Chiudere** il dialogo

Per cambiare una decisione dopo il fatto, parla con il tuo amministratore — il flusso standard non permette una nuova revisione tramite UI.

## Piè di pagina

| Pulsante          | Quando visibile                                | Cosa fa                                                                                                                          |
| ----------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Elimina**       | Sempre, se hai il sotto-permesso `delete`      | Rimuove completamente la prova (con conferma). Usalo solo per caricamenti di test / spam / corse errate — non come scelta di moderazione |
| **Annulla**       | Solo in sospeso                                | Chiude la finestra senza inviare                                                                                                 |
| **Invia azione**  | Solo in sospeso, dopo aver scelto un'azione    | Invia l'azione selezionata (colore corrispondente all'azione)                                                                    |
| **Chiudi**        | Prove revisionate                              | Chiude la finestra                                                                                                               |

Chiudere la finestra (Annulla / Chiudi / Esc / clic sull'overlay) rimuove `/:id` dall'URL così la cronologia avanti/indietro corrisponde a ciò che vedi.

## Flussi di lavoro tipici

- **Indagare su una prova dalla lista** — trova la prova nella lista (filtra / cerca), clicca la riga → si apre la finestra di dettaglio → scorri il contesto → decidi
- **Approfondire una prova sanzionata** — cerca per cliente → apri una delle loro prove rifiutate → controlla "Revisionato da" + commento per vedere chi ha deciso e perché → usa questo per la risoluzione delle controversie
- **Approvazione rapida da link diretto** — ricevi un URL da un collega → clicca → si apre la finestra → ingrandisci la foto → Approva / Approva con commento
- **Verifica incrociata della storia del veicolo** — apri una prova → clicca sul veicolo → verifica se lo stesso veicolo continua a ricevere foto di parcheggio errate → questo indica un problema di posizionamento / segnaletica, non del rider
- **Audit delle decisioni di un revisore** — filtra la lista per Stato `Approvato` → clicca sulle prove per vedere "Revisionato da" + commento → calibra gli standard del team

## Suggerimenti

- **Lo zoom con la rotella è veloce** — non serve il pulsante — basta ruotare la rotella sopra l'immagine
- **L'immagine si apre in una nuova scheda a piena risoluzione** — quando lo zoom nella finestra non basta (es. per leggere un cartello delle dimensioni di una targa), apri esternamente
- **"Approva con commento" è meglio dell'approvazione silenziosa** per casi limite — lascia una nota di una riga che il prossimo revisore (o tu tra tre mesi) apprezzerà
- **Bloccare è definitivo** — i rider possono essere sbloccati tramite il [dettaglio cliente](../../operations/customers/client-detail.md) ma per ogni singola prova, _Blocca_ è l'escalation massima. Non usarlo alla prima infrazione
- **Elimina vs Rifiuta** — Rifiuta lascia un record di moderazione (e multa il rider); Elimina cancella completamente la prova. Se vuoi una traccia, non eliminare mai
- **L'URL è condivisibile** — `/support/park-proofs/:id` porta direttamente qui, senza navigazione nella lista
- **Le prove chiuse sono di sola lettura** — se hai aperto una prova revisionata aspettandoti di agire, ecco perché i pulsanti non ci sono più
