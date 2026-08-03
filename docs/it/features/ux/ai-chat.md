# Chat AI

Il Cruscotto include un **assistente AI** che comprende il prodotto, può leggere i dati in tempo reale dalle schermate su cui ti trovi e — con il tuo permesso — può agire per tuo conto. Consideralo come un collega seduto accanto a te: fai una domanda, chiedigli di fare qualcosa o di spiegarti cosa stai guardando.

## Aprire il pannello

Clicca sull'**icona scintillante** (✨) nella barra superiore. La chat si apre come pannello laterale a destra.

- Se sull'icona brilla un piccolo distintivo a forma di `*` stella, l'AI ha prodotto una nuova risposta dall'ultima volta che hai guardato il pannello.
- Il pannello si apre anche con `⌘ + K` / `Ctrl + K` nella maggior parte delle pagine (dove la scorciatoia è attiva).

## Cosa può fare

Cinque categorie di capacità, in ordine di potenza crescente:

| Capacità          | Esempi                                                                      |
| ----------------- | ---------------------------------------------------------------------------- |
| **Spiegare**      | "Cosa significa questo stato?", "Come creo una tariffa?"                   |
| **Cercare info**  | "Quanti veicoli attivi ci sono nella Zona A?", "Mostrami i pagamenti falliti di ieri" |
| **Navigare**      | "Apri la pagina Corse filtrata a oggi", "Portami al veicolo RW-001"         |
| **Compilare moduli** | "Crea un nuovo tag chiamato 'VIP' con colore rosso e applicalo al cliente X" |
| **Modificare dati** | "Blocca il veicolo RW-001", "Rimborsa il pagamento #12345", "Invia push a tutti nella Zona A" |

L'AI utilizza le **stesse API e gli stessi permessi** che hai tu. Se non puoi eseguire un'azione manualmente, l'AI non può farlo per tuo conto. Questo è il confine di sicurezza — non esiste una modalità "superutente AI".

## All'interno del pannello

### Intestazione

- **Scintilla + titolo** "Chat AI"
- **Distintivo nome agente** a destra (la pillola verde con un bagliore) mostra quale agente è attivo — cliccaci per aprire le impostazioni e cambiare agente
- **Distintivo contesto** appare sotto la descrizione una volta che la conversazione ha messaggi — mostra quanto è piena la finestra di memoria dell'AI (es. "12 messaggi · 35% contesto")

### Bolla di esecuzione live

Quando l'AI sta lavorando a qualcosa di multi-step (cercando dati, aprendo pagine, chiamando strumenti), appare una **bolla di stato live** che mostra ogni passaggio in tempo reale:

- _Ricerca veicoli…_
- _Apertura /vehicles…_
- _Compilazione modulo: Stato = Attivo…_
- _Invio…_

Puoi leggere cosa sta succedendo mentre accade e fermarti prima se va nella direzione sbagliata.

### Conversazione

La conversazione scorre come una chat: messaggi utente a destra, risposte AI a sinistra, renderizzate in markdown (liste, tabelle, codice, link funzionano tutti). Le esecuzioni degli strumenti possono essere espanse per vedere argomenti e risposte esatti — utile per verificare cosa è stato fatto.

### Input

- **Digita un messaggio** e premi `Enter` per inviare; `Shift + Enter` per una nuova riga
- L'input si espande mentre scrivi
- File / immagini incollate non sono supportati nella chat attuale

## Confermare le modifiche

Per azioni potenzialmente distruttive (eliminare, rimborsare, cambiare stato, operazioni di massa), l'AI mostra una **conferma inline** invece di eseguire immediatamente:

- Un riepilogo di cosa sta per accadere ("Rimborsa pagamento #12345 — $42.50 a John Doe")
- Pulsanti **Conferma** / **Annulla**
- Non succede nulla finché non confermi

Leggi attentamente il riepilogo — è l'unico controllo di sicurezza tra la comprensione dell'AI e i tuoi dati.

## Impostazioni

Clicca sul **distintivo nome agente** nell'intestazione per aprire la finestra delle impostazioni:

- **Selezione agente** — scegli la persona agente (agenti diversi sono ottimizzati per compiti diversi: flotta, supporto, analisi)
- **Modello** — scegli il LLM sottostante (dove sono disponibili più modelli)
- **Strumenti consentiti** — disabilita selettivamente strumenti (es. blocca modifiche se vuoi solo Q&A)
- **Cronologia conversazione** — cancella, esporta

## Finestra di contesto

L'AI ha una memoria finita della conversazione corrente. Mentre chatta, il contesto si riempie; lo vedrai come percentuale nel distintivo dell'intestazione.

- **Sotto il 70%** — molto spazio
- **70–90%** — si sta riempiendo; considera di iniziare una nuova conversazione per un argomento non correlato
- **Sopra il 90%** — i messaggi più vecchi possono essere riassunti per fare spazio; l'AI potrebbe dimenticare dettagli iniziali

Iniziare una nuova conversazione per un nuovo compito è economico e mantiene l'AI efficiente.

## Consigli

- **Sii specifico** — "Blocca RW-001" è meglio di "blocca quel monopattino di cui abbiamo parlato"
- **Verifica prima di confermare modifiche** — leggi il riepilogo sulla scheda di conferma. L'AI a volte deduce un'entità che non intendevi
- **Chiedi "cosa puoi fare qui?"** in qualsiasi pagina — l'AI sa quali strumenti sono rilevanti per la schermata corrente
- **Usalo per spiegare dati non familiari** — incolla un codice stato o un'etichetta di schermata e chiedi "cosa significa?"
- **I permessi valgono ancora** — se l'AI dice "non posso farlo", è quasi sempre una mancanza di permessi, non una mancanza di funzionalità
- **Dati sensibili** — tratta la chat come lo schermo di un collega. Non incollare password, numeri di carte di pagamento o dati che non vorresti fossero registrati
- **Disconnessioni** — se l'AI si ferma a metà esecuzione, scorri verso l'alto per trovare l'ultima bolla di esecuzione live; ti dice esattamente dove si è fermata
