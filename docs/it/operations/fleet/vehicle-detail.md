# Dettaglio Veicolo

La pagina di dettaglio del veicolo (`/vehicles/:id`) è il banco di lavoro per una singola unità. Usala per vedere i dati IoT in tempo reale, inviare comandi, rivedere la cronologia delle corse, investigare sugli avvisi e eseguire azioni dell'operatore (modifica, cambia posizione, segna per manutenzione, genera QR, elimina).

Di solito arrivi qui cliccando una riga nella [lista Veicoli](vehicles.md).

Permesso richiesto: **Veicoli** (`k7m8n9`). Alcune schede e azioni richiedono permessi aggiuntivi (indicati di seguito).

## Layout

Dall'alto verso il basso:

1. **Intestazione** — indietro, etichetta, stato, pulsante _Azioni_
2. **Schede panoramiche** — batteria, ultimo segnale, riepilogo salute IoT, modello, ecc.
3. **Scheda posizione** — una piccola mappa che mostra il pin GPS attuale
4. **Schede** — Dettagli / Corse / Attività / Avvisi / Comandi

## Intestazione

La striscia superiore identifica il veicolo:

- **Pulsante Indietro** (`←`) torna alla lista
- **Etichetta veicolo** (es. _RW-001_) e **pillola di stato** (Disponibile, In uso, ecc.)
- Pulsante **Azioni** a destra — apre la finestra delle azioni

## Azioni

Cliccando su **Azioni** si apre una finestra modale con tutte le azioni operatore disponibili per questo veicolo. Alcune sono soggette a permessi:

| Azione                   | Permesso  | Cosa fa                                                                                                                               |
| ------------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Modifica veicolo**     | `edit`    | Apre il [modulo di modifica](vehicle-create-edit.md)                                                                                   |
| **Visualizza cronologia percorso** | —         | Apre una finestra con le coordinate del percorso GPS recente                                                                           |
| **Segna per manutenzione** | —         | Imposta rapidamente lo stato su _Manutenzione_                                                                                        |
| **Cambia posizione**     | —         | Apre una mappa per aggiornare manualmente le coordinate GPS (usato quando il dispositivo IoT è silenzioso e l'operatore conosce la posizione del veicolo) |
| **Genera codice QR**     | —         | Apre il generatore di QR per questo singolo veicolo (etichetta stampabile)                                                             |
| **Elimina veicolo**      | `delete`  | Eliminazione soft con finestra di conferma                                                                                             |

Le azioni per cui non hai permesso sono nascoste nella finestra.

## Schede panoramiche

Una griglia di piccole schede sotto l'intestazione riassume il veicolo a colpo d'occhio:

- **Batteria** — percentuale batteria scooter (e batteria scheda IoT se riportata separatamente)
- **Ultimo segnale** — quando il dispositivo IoT ha segnalato l'ultima volta, con pillola di stato (Online / Offline / Obsoleto)
- **Blocco** — bloccato / sbloccato
- **Modello** — nome modello, stato, immagine
- **GSM / GPS** — stato di validità cellulare e GPS
- **Modalità velocità** — modalità di guida attuale (eco, normale, sport, ecc., se supportata dal modello)
- **Tensione** — tensione scheda IoT (campo tecnico)

## Scheda posizione

Una piccola mappa mostra il veicolo come un singolo pin sulla sua ultima coordinata GPS nota, con zoom predefinito adatto al pin. Usala per un rapido "dov'è adesso?" senza aprire la cronologia del percorso.

## Schede

Il dettaglio si divide in fino a cinque schede (alcune soggette a permessi):

| Scheda       | Permesso     | Contenuto                                                                        |
| ------------ | ------------ | -------------------------------------------------------------------------------- |
| **Dettagli** | —            | Dati completi del veicolo — campi IoT, modello + tariffe, tag, zone, GSM/GPS, modalità velocità |
| **Corse**    | view-rides   | Corse recenti su questo veicolo (una vista filtrata della lista globale Corse)   |
| **Attività** | —            | Registro attività limitato a questo veicolo (azioni operatore e di sistema)      |
| **Avvisi**   | —            | Errori e allarmi IoT raggruppati con paginazione (cronologia di "cosa è andato storto") |
| **Comandi**  | `iot-command`| Invia comandi IoT direttamente al dispositivo (blocca, sblocca, allarme, riavvio, ecc.) |

### Scheda Dettagli

La scheda predefinita e la vista più approfondita dello stato del veicolo:

- **Pannello IoT** — batteria, tensione, blocco, segnale GSM, validità GPS, ultimo segnale, modalità velocità
- **Pannello Modello** — nome modello e immagine, stato, tag ereditati dal modello
- **Pannello Tariffe** — tariffe assegnate al modello del veicolo (governano il prezzo delle corse)
- **Pannello Tag** — tag applicati a questo specifico veicolo (modificabili dall'operatore tramite _Modifica_)
- **Pannello Zone** — zone a cui il veicolo appartiene attualmente

Se i dati IoT non si caricano, in questa scheda appare un banner di errore; il resto della pagina funziona comunque.

### Scheda Corse

Elenca le corse recenti effettuate con questo veicolo — stesso formato riga della lista globale Corse, filtrata solo su questo veicolo. Clicca una riga per aprire il dettaglio corsa.

Questa scheda è nascosta a meno che tu non abbia il permesso `view-rides` su questo veicolo.

### Scheda Attività

Un **registro attività** cronologico per questo veicolo: ogni azione operatore (modifiche, cambio stato, eliminazioni, aggiornamenti tag) e ogni evento di sistema (transizioni di stato da trigger IoT, esecuzioni di automazioni).

Utile per conformità, responsabilità e debug di cambiamenti di stato inattesi.

### Scheda Avvisi

**Avvisi ed errori IoT** raggruppati generati dal dispositivo, con paginazione. Ogni voce include:

- Codice e titolo leggibile
- Timestamp di prima / ultima occorrenza
- Frequenza (quante volte è stato generato questo codice)
- Stato (attivo / risolto)

Un pulsante _Pulisci_ (dove supportato) consente di contrassegnare un gruppo come risolto. La paginazione permette di scorrere gli avvisi storici.

### Scheda Comandi

Invia **comandi IoT** al dispositivo, raggruppati per categoria (es. _Blocca e sblocca_, _Allarme_, _Luci_, _Sistema_). Permessi controllati da `iot-command`.

- Scegli un comando e clicca su _Invia_
- Il comando viene inviato al dispositivo IoT; il tempo di risposta dipende dal segnale cellulare
- La cronologia recente dei comandi appare sotto con stato (inviato / consegnato / fallito)

Usa questa funzione quando devi fare qualcosa che il percorso bulk _Invia comando_ non copre — diagnostica, riavvii occasionali, sblocchi manuali per casi di supporto.

## Flussi di lavoro tipici

- **Indaga un reclamo** — apri Attività per vedere quali operatori / sistemi hanno interagito con questo veicolo oggi; poi Avvisi per errori IoT; infine Corse per il viaggio in questione
- **Forza un blocco o sblocco** — Scheda Comandi → _Invia Blocca_ o _Invia Sblocca_ (richiede `iot-command`)
- **Ritira un’unità per manutenzione** — _Azioni → Segna per manutenzione_ (imposta lo stato); invia il team sul campo
- **Correggi manualmente il GPS** — _Azioni → Cambia posizione_ (quando il dispositivo IoT è silenzioso e sai dove si trova)
- **Stampa un nuovo adesivo** — _Azioni → Genera codice QR_

## Suggerimenti

- **Monitora la scheda Avvisi** — i codici frequenti sono segnali precoci di problemi hardware; intervieni prima che diventino incidenti
- **Attività è la tua traccia di controllo** — ogni modifica dell’operatore è registrata qui con nome e timestamp
- **I comandi sono unidirezionali fire-and-forget su cellulare** — se non vedi risposta entro un minuto, il dispositivo potrebbe essere offline; controlla Ultimo segnale nella panoramica prima di riprovare
- **Tag e tariffe provengono da due fonti** — i tag a livello veicolo (pannello Tag, modificabile in Modifica) sovrascrivono / integrano i tag a livello modello (sola lettura qui, impostati in Impostazioni veicolo)
- **La scheda Mappa mostra solo l’ultimo pin** — per il percorso usa _Azioni → Visualizza cronologia percorso_
