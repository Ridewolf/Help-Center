# Rider App — Metodi di Pagamento e Flussi di Ricarica

Tutto su come un rider paga: la lista delle carte salvate, l'aggiunta di una carta e i tre diversi modi in cui una ricarica può completarsi a seconda del provider di pagamento utilizzato.

| Schermata             | Percorso                     | Accesso da                               |
| --------------------- | ---------------------------- | --------------------------------------- |
| Gestisci Metodi di Pagamento | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Gestisci Metodi di Pagamento** |
| Aggiungi una carta     | `/wallet/add-payment-method` | **Aggiungi Carta** nella schermata sopra |
| Ricarica con reindirizzamento | `/wallet/topup-redirect`     | Conferma di una ricarica con provider di reindirizzamento |
| Ricarica con QR       | `/wallet/topup-qr`           | Conferma di una ricarica con provider QR |


Due delle lamentele più comuni dei rider trovano risposta in questa pagina: _"non c'è il pulsante Aggiungi Carta"_ e _"il mio pagamento è bloccato in sospeso"_.

## Gestisci Metodi di Pagamento

Un **selettore provider** si trova in alto, e il resto della schermata si adatta a ciò che quel provider supporta:

- Se il provider **non supporta le carte salvate**, non viene mostrata alcuna lista di carte — appare invece un messaggio di stato vuoto.
- Se il provider **non supporta il salvataggio di nuove carte**, il pulsante **Aggiungi Carta** è completamente nascosto. Questa è la risposta quando un rider chiede perché non può aggiungere una carta.

Ogni metodo salvato mostra il tipo (carta o un wallet come Apple Pay / Google Pay), il brand, le ultime quattro cifre, il mese e anno di scadenza e se è quello predefinito. La lista carica 10 elementi alla volta con scroll infinito.

**Imposta come predefinito** e **Rimuovi** chiedono entrambi conferma, poi ricaricano la lista.

### Ricariche in sospeso

Sotto le carte c'è una lista **Ricariche in sospeso**, costruita dai record di pagamento del rider: importo, valuta, data, stato e provider. Mostra per default le **due più recenti**, con un toggle **Mostra tutto** per espandere.

Questa lista è dove si trova un pagamento con reindirizzamento o QR non completato. Un rider il cui denaro "è sparito" ha quasi sempre un record qui che non ha mai completato — e può essere annullato da qui.

Un accordion **Come ricaricare** nella stessa schermata fornisce istruzioni specifiche per il provider selezionato.

## Aggiunta di una carta

1. Apri **Wallet → Gestisci Metodi di Pagamento → Aggiungi Carta**.
2. Il **Nome del titolare** è precompilato dal profilo del rider (nome e cognome).
3. Il numero della carta, la scadenza e il CVC vengono inseriti nel **frame sicuro del provider di pagamento**, non nei campi dell'app. Il frame si carica all'apertura della schermata.
4. **Invia rimane bloccato** finché non sono vere due condizioni: il frame sicuro ha finito di caricarsi e segnala che tutti i campi sono completi senza errori di validazione. Un pulsante Invia che non si attiva è quasi sempre dovuto a uno di questi due motivi.
5. In alternativa il rider può usare il pulsante wallet **Apple Pay / Google Pay** invece di digitare una carta.
6. In caso di successo la lista delle carte si aggiorna e la schermata torna a Gestisci Metodi di Pagamento.

Un dialogo informativo sulla sicurezza nella schermata spiega che il provider di pagamento gestisce i dati della carta e l'app non memorizza mai il numero completo. È corretto e vale la pena citarlo a un rider preoccupato.

## Ricarica — i tre flussi

Il rider inizia sempre allo stesso modo — **Wallet → scegli un importo preimpostato → conferma** — e poi il flusso che si avvia è deciso automaticamente dal provider.

### 1. Conferma in-app (Stripe)

Il pagamento viene confermato all'interno dell'app usando una carta salvata. Nessun browser, nessun passaggio esterno. Questo è l'unico flusso che si comporta come una ricarica istantanea, ed è l'unico in cui si può attivare la **Ricarica Automatica**.

### 2. Provider con reindirizzamento (MAIB e simili)

1. Il rider conferma l'importo.
2. L'app **apre automaticamente la pagina di pagamento del provider** nel browser di sistema o in-app.
3. Il rider paga su quella pagina.
4. Nel frattempo l'app controlla lo stato del pagamento circa **ogni 5 secondi**.
5. Il rider può anche toccare **Ho già pagato** per forzare un controllo immediato.
6. Un pagamento non completato può essere **annullato** dalla schermata — questo cancella il pagamento in sospeso e torna al Wallet.

### 3. Provider QR (MIA e simili)

1. La schermata mostra un **conto alla rovescia MM:SS** fino alla scadenza del checkout.
2. **Apri nell'app bancaria** apre il checkout — nativamente, in un browser esterno o in una finestra browser in-app.
3. **Copia link** mette il link del checkout negli appunti, così il rider può completare da un altro dispositivo.
4. Quando il conto alla rovescia scade, il pulsante Apri viene disabilitato e appare un badge **Link scaduto**. **Il checkout scaduto non può essere riattivato** — il rider deve iniziare una nuova ricarica.
5. Il controllo dello stato, **Ho già pagato** e l'annullamento funzionano esattamente come nel flusso di reindirizzamento.

## Risoluzione dei problemi

| Il rider dice…                       | Che cos'è                                                                                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Come faccio a ricaricare?"         | Wallet → scegli un importo preimpostato → quindi uno dei tre flussi usati dal loro provider. Solo la conferma in-app si completa senza uscire dall'app |
| "Non c'è il pulsante Aggiungi Carta" | Il provider attivo non supporta il salvataggio di nuove carte                                                                                         |
| "Nessuna carta è elencata"           | Il provider attivo non supporta carte salvate                                                                                                        |
| "Il modulo della carta non si invia" | Il frame sicuro della carta non ha finito di caricarsi, o segnala ancora un campo incompleto o non valido                                            |
| "Il mio pagamento è bloccato in sospeso" | Tocca **Ho già pagato** per ricontrollare. Se non si risolve, annullalo da **Ricariche in sospeso** e riprova. Un record in sospeso può anche richiedere riconciliazione da parte dell'operatore — vedi [Webhook in sospeso](../../operations/payments/pending-webhooks.md). **Non promettere tempi di risoluzione** |
| "Il link QR è scaduto"               | Avvia una nuova ricarica; quella scaduta non può essere riaperta                                                                                     |
| "Pagamento rifiutato"                | Rifiuto lato banca. Il codice di errore è nel record di pagamento in [Storico pagamenti → Pagamenti](history.md#scheda-pagamenti)                        |
| "Quali sono i limiti di ricarica automatica?" | Non indicare limiti — nell'app non sono definiti. Leggi la descrizione della schermata Wallet                                                     |

## Suggerimenti

- **Il provider decide la schermata.** Prima di rispondere a qualsiasi domanda "perché non posso…", verifica quale provider usa il rider — metà dei pulsanti mancanti dipendono dalle capacità del provider, non da errori.
- **Ricariche in sospeso è il primo posto da controllare** per qualsiasi domanda sul denaro che non riguardi una carta rifiutata.
- **Annulla, poi riprova.** Un pagamento in sospeso bloccato confonde più il modello mentale del rider che il suo account; annullare e ricominciare è di solito più veloce che aspettare.
- **Riporta il messaggio di sicurezza, non la tua rassicurazione.** Dice esattamente chi conserva i dati della carta.
- **Aggiungere una carta fa più che abilitare le ricariche** — rimuove anche la soglia minima di saldo iniziale per le corse e fa apparire il pulsante **Scansiona**. Vedi [Map](../riding/map.md#la-barra-inferiore-è-condizionale).
