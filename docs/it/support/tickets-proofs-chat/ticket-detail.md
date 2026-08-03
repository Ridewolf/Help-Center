# Dettaglio Biglietto

La pagina del dettaglio del biglietto (`/support/tickets/:id`) è dove si indaga su un singolo biglietto di supporto. Si apre come una grande finestra modale sopra la [lista Biglietti](tickets.md) — l'URL cambia così che il biglietto sia condivisibile / linkabile in profondità.

Di solito si arriva qui cliccando una riga nella lista, o incollando un URL diretto nel browser.

Permesso richiesto: **Biglietti** (`a8b9c1`). Alcune azioni richiedono sotto-permessi aggiuntivi (`edit`, `delete`).

## Come si relaziona con altre viste dei biglietti

| Vista                                                                       | A cosa serve                                                                  |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Lista Biglietti](tickets.md)                  | La coda completa — ricerca, filtro, ordinamento                               |
| [Revisione Automatica Biglietti](ticket-auto-review.md) | Modalità semplificata — un biglietto in sospeso alla volta, triage rapido da tastiera |
| **Dettaglio biglietto (questa pagina)**                                              | Approfondimento su un biglietto — immagine completa, descrizione completa, contesto, modifica / eliminazione |

## Layout

La finestra modale è impilata dall'alto verso il basso:

1. **Intestazione** — titolo (etichetta biglietto), riga descrittiva ("Biglietto #ID"), chiudi (X)
2. **Sezione immagine** — foto di prova inviata dal rider (grande, cliccabile per aprire)
3. **Scheda dettagli biglietto** — stato, tipo di reclamo, descrizione, commento
4. **Scheda veicolo e posizione** — veicolo, IMEI, coordinate posizione, zona, segnalatore
5. **Piè di pagina** — pulsanti _Chiudi_ e _Modifica_

## Intestazione

La striscia superiore identifica il biglietto:

- Un'**icona alert-circle** accanto all'etichetta del biglietto (es. l'etichetta del veicolo o un nome biglietto generato)
- Una **riga descrittiva** che mostra l'ID del biglietto
- Il pulsante di chiusura della finestra (×) in alto a destra — si chiude anche con Esc o cliccando fuori

Chiudere la finestra rimuove `/:id` dall'URL così la cronologia avanti/indietro corrisponde a ciò che vedi.

## Sezione immagine

La foto completa di prova inviata dal rider, abbastanza grande per ispezionarla a colpo d'occhio:

- **Clicca l'immagine** (o il pulsante _Visualizza a dimensione intera_ che appare al passaggio del mouse) — apre la foto in risoluzione originale in una nuova scheda
- **Passaggio del mouse** — appare una sovrapposizione scura + il pulsante _Visualizza a dimensione intera_
- Se l'immagine non si carica, appare un segnaposto al suo posto
- Se il biglietto non ha immagine (raro, es. biglietti avviati dall'operatore), la sezione è nascosta

La miniatura nella lista è una versione piccola; questa è l'immagine completa pronta per la moderazione.

## Scheda Dettagli biglietto

Scheda sinistra della griglia a due schede. Campi:

| Campo              | Cosa mostra                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Stato**         | La pillola di stato (In sospeso, In corso, Risolto, Ignorato, Duplicato, ecc.) — stessa palette colori della lista                  |
| **Tipo di reclamo** | La pillola del tipo di reclamo — stessa codifica colore della lista (rosso Danno meccanico, giallo Pulizia, ecc.)                   |
| **Descrizione**    | La descrizione libera del rider, resa in markdown (a capo rispettati, link automatici) — vuoto se il rider non ha scritto nulla    |
| **Commento**        | Commento / note interne dell'operatore sul biglietto — vuoto finché un operatore non ne aggiunge uno                                |

Consulta [Lista Biglietti → Riferimento stato / Tipi di reclamo](tickets.md) per il significato completo di ogni colore pillola.

## Scheda Veicolo e Posizione

Scheda destra della griglia. Campi:

| Campo        | Cosa mostra                                                                             |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Veicolo**  | Etichetta veicolo (con icona auto) e IMEI collegato del suo dispositivo IoT               |
| **Posizione** | Latitudine / longitudine dove è stato segnalato il problema (6 decimali, con icona puntina) |
| **Zona**     | La [zona](../../settings/infrastructure/zones.md) in cui ricade la posizione, se presente  |
| **Segnalatore** | Il rider / sistema / operatore che ha aperto il biglietto, con la sua email              |

Usa questi riferimenti incrociati per saltare al contesto: clicca il veicolo per aprire il [dettaglio veicolo](../../operations/fleet/vehicle-detail.md), clicca il segnalatore per aprire il suo [profilo cliente](../../operations/customers/client-detail.md), o copia le coordinate in uno strumento mappa per confermare la posizione.

## Azioni (piè di pagina)

La pagina dettaglio espone un set di azioni **volutamente piccolo** — la maggior parte dei flussi di lavoro sui biglietti avviene nella lista o su entità correlate (veicolo, cliente). Ecco cosa c'è:

| Pulsante    | Cosa fa                                                                                                                                                    |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Chiudi** | Chiude la finestra modale (rimuove `/:id` dall'URL)                                                                                                          |
| **Modifica**  | Apre il biglietto in modalità modifica. Nota: nella versione attuale il gestore Modifica mostra un toast "Modifica non implementata" — è collegato ma il modulo non è ancora fornito |

### Cosa c'è nella lista ma non qui

Il menu della riga nella lista ha due azioni extra che non appaiono nella pagina dettaglio stessa:

| Azione     | Dove si trova    | Perché                                                                                                                              |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Modifica**   | Riga elenco + dettaglio | Stessa Modifica (attualmente segnaposto)                                                                                          |
| **Elimina** | Menu riga elenco | Elimina è un'azione solo per la riga (con finestra di conferma). Per eliminare dal dettaglio chiudi prima la finestra modale, poi usa il menu della riga |

### Cosa c'è nella pagina elenco

L'intestazione della pagina elenco ha _Revisione automatica_ che porta alla coda semplificata — non c'è un pulsante equivalente nel dettaglio perché sei già concentrato su un singolo biglietto.

## Azioni con feature flag (non nella build attuale)

Il codice contiene segnaposto per un set più ricco di azioni sui biglietti che sono **commentate** in questa build:

- **Assegna** — assegna il biglietto a un operatore
- **Blocca veicolo** — togli il veicolo dal servizio con un clic
- **Crea attività di manutenzione** — apri un'attività di manutenzione precompilata con i dati di questo biglietto
- **Accredita utente** — emetti un accredito wallet al segnalatore
- **Rispondi** — invia una risposta predefinita al rider
- **Unisci duplicato** — collega questo biglietto a un biglietto principale

Se la tua installazione ha queste attivate, appaiono nel menu della riga / in un menu a discesa _Azioni_ nell'intestazione — non nel corpo della modale. Contatta il tuo amministratore se te le aspetti e non le vedi.

## Flussi di lavoro tipici

- **Triaggio tramite foto** — apri il biglietto → guarda l'immagine → se il danno è reale, copia l'etichetta del veicolo → chiudi la modale → apri il dettaglio veicolo per bloccarlo / creare un'attività di manutenzione
- **Risolvere una segnalazione di bassa qualità** — apri il biglietto → conferma che la foto è spazzatura → chiudi → usa il menu della riga elenco per eliminare (con conferma)
- **Indagare la storia di un veicolo** — apri un biglietto → clicca il veicolo → vedi la cronologia completa di avvisi + corse del veicolo → torna al biglietto per aggiungere un commento
- **Verificare un reclamo del rider rispetto al viaggio** — apri il biglietto → copia il segnalatore → apri il dettaglio cliente → controlla le corse recenti per il contesto
- **Condividere un biglietto con un collega** — l'URL contiene l'id del biglietto (`/support/tickets/:id`) così puoi incollarlo in chat e il destinatario apre la stessa modale

## Consigli

- **L'URL è il tuo segnalibro** — copiare l'URL con `:id` e incollarlo dopo ti riporta direttamente allo stesso biglietto, anche da una sessione diversa
- **Esc per chiudere** — la modale supporta Esc, clic fuori e la X — tutti e tre rimuovono l'id dall'URL
- **Clicca l'immagine una volta per vedere l'originale** — la miniatura è compressa; l'originale è quello che il rider ha effettivamente inviato
- **Incrocia l'IMEI** — se un veicolo viene segnalato ripetutamente spesso è l'IoT che fa i capricci, non il telaio. L'IMEI è il tuo collegamento al record delle [impostazioni IoT](../../settings/infrastructure/iot.md)
- **Il commento è solo interno** — i rider non lo vedono; usalo liberamente per note tra operatori sul biglietto
- **Modifica non è ancora disponibile** — cliccare su _Modifica_ oggi mostra un toast. Se devi cambiare uno stato, fallo dalle azioni a livello elenco o da Revisione automatica
