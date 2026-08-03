# Veicolo — Crea e Modifica

Due URL condividono lo stesso layout del modulo:

- **Crea** — `/vehicles/create` — registra una nuova unità fisica
- **Modifica** — `/vehicles/:id/edit` — aggiorna i metadati di un veicolo esistente

Entrambi si raggiungono dalla [lista Veicoli](vehicles.md) (pulsante `+ Crea` in alto a destra) o dal [dettaglio Veicolo](vehicle-detail.md) (`Azioni → Modifica veicolo`).

Permessi:

- **Crea** — `Veicoli` (`k7m8n9`) + sotto-permesso relativo alla creazione
- **Modifica** — `Veicoli` (`k7m8n9`) + il sotto-permesso `edit`

## Layout

La pagina si divide in due colonne su desktop, si impila su mobile:

- **Sinistra (8/12)** — il modulo vero e proprio, dentro una scheda _Informazioni veicolo_
- **Destra (4/12)** — la barra laterale **Guida ai campi** con aiuto contestuale per il campo attivo, più un'anteprima live di quanto inserito

## Campi

Cinque campi in totale. I campi obbligatori sono contrassegnati da un asterisco rosso (`*`).

### 1. Etichetta (obbligatorio)

Il codice leggibile stampato sull'adesivo del veicolo (es. _RW-001_).

- Deve essere univoco in tutta la flotta
- Testo libero — la convenzione tipica è _PREFIX-NNN_ (prefisso aziendale + numero sequenziale)
- Clicca **Genera** (icona scintilla) per compilare automaticamente — il sistema legge il prefisso aziendale e le etichette esistenti, calcola la sequenza successiva e la scrive nel campo. Compare un indicatore di caricamento durante la query.

### 2. Stato (obbligatorio)

Lo stato iniziale / attuale del veicolo. Dodici opzioni — stessa lista del [filtro stato nella lista Veicoli](vehicles.md#riferimento-stato).

Valori di partenza comuni alla creazione:

- **Non pronto** — creato ma non ancora rilasciato ai rider (scelta predefinita sicura)
- **Disponibile** — pronto per il noleggio immediato (usare solo dopo verifica IoT e parcheggio)
- **Magazzino** — per stock non ancora in servizio

Durante la modifica, cambia lo stato con cautela — questo può togliere il veicolo dalla rotazione di noleggio o rimetterlo in servizio.

### 3. Dispositivo IoT (opzionale)

Il modulo IoT associato a questo veicolo (la scatola cellulare che gestisce blocco/sblocco e segnala batteria/GPS).

- Menu a tendina ricercabile — digita per filtrare per IMEI o etichetta
- Opzionale — puoi creare un veicolo senza IoT ora e associarlo dopo (in _Modifica_)
- Un dispositivo IoT può essere associato a un solo veicolo alla volta

Durante la modifica, è permesso sostituire il dispositivo IoT ma sembra irreversibile — il nuovo dispositivo inizia a segnalare per questo veicolo, il vecchio viene dissociato. Usalo quando una scheda viene fisicamente sostituita.

### 4. Modello veicolo (opzionale)

Il record modello (Impostazioni → Impostazioni veicolo) che definisce le tariffe, le impostazioni predefinite e la categoria dell'unità.

- Menu a tendina ricercabile — digita per filtrare per etichetta modello
- Opzionale al momento della creazione, consigliato impostarlo appena conosciuto il modello — tariffe e comportamenti derivano da esso
- Cambiare il modello in seguito aggiorna le tariffe attive e le regole di comportamento — confermare con le operazioni prima di modificare un'unità in servizio

### 5. Tag (opzionale)

Tag applicati dall'operatore specifici per questo veicolo.

- Selezione multipla — scegli uno o più
- Ricercabile
- Questi sono tag _a livello di veicolo_, separati dai tag _a livello di modello_ ereditati dal Modello veicolo scelto
- Le corse su questo veicolo erediteranno questi tag a livello di veicolo all'inizio della corsa (vedi la [lista Corse](../trips/rides.md) per come funziona l'ereditarietà dei tag)

## Barra laterale Guida ai campi

La colonna di destra è una **guida contestuale**, non un duplicato del modulo:

- **Anteprima live** dei valori digitati/selezionati (per verificare prima di salvare)
- **Suggerimento inline** che si aggiorna al focus su un campo — spiega il significato, le insidie comuni, i valori predefiniti
- **Campi automatici** mostrati: etichetta corrente, etichetta stato, etichetta dispositivo IoT, etichetta modello, conteggio tag

Usala come un secondo paio di occhi. Su schermo ampio resta visibile mentre scorri il modulo.

## Salva / Indietro

- **Indietro** (`←`) — scarta le modifiche non salvate e torna alla pagina precedente (la lista o il dettaglio in caso di modifica)
- **Salva** — valida il modulo e crea / aggiorna il veicolo. Un toast conferma il successo; gli errori evidenziano il campo con un messaggio rosso

Se la validazione fallisce (etichetta mancante, stato mancante, etichetta duplicata) la pagina resta aperta con il campo errato evidenziato in rosso.

## Crea vs Modifica — differenze

| Aspetto           | Crea                                | Modifica                                                  |
| ------------------ | ---------------------------------- | --------------------------------------------------------- |
| Etichetta          | Vuoto o _Genera_                   | Precompilato con l'etichetta attuale                      |
| Stato              | Vuoto (devi scegliere)             | Precompilato con lo stato attuale                          |
| Dispositivo IoT    | Vuoto o scegli da dispositivi non associati | Precompilato; la sostituzione dissocia il precedente      |
| Modello veicolo    | Vuoto                             | Precompilato                                              |
| Tag                | Vuoto                             | Precompilato con i tag a livello di veicolo attuali       |
| Dopo il salvataggio| Reindirizza al dettaglio del nuovo veicolo | Resta sul modulo / reindirizza al dettaglio (a seconda del flusso) |
| Voce registro attività | "Veicolo creato da _nome operatore_" | "Veicolo modificato da _nome operatore_" con differenze a livello di campo |

Entrambi i flussi scrivono nel [Registro azioni](vehicle-detail.md#scheda-attività) del veicolo.

## Flussi di lavoro tipici

- **Imbarca un nuovo lotto** — genera etichetta → stato _Non pronto_ → associa IoT → imposta Modello → salva. Una volta che l'unità è sul campo e testata, modifica in _Disponibile_
- **Sostituisci una scheda IoT guasta** — modifica → dissocia / scegli nuovo IoT → salva → attendi il primo segnale (Ultimo segnale nel dettaglio)
- **Riclassifica** — cambia Modello quando migri unità tra flotte/categorie
- **Aggiungi un tag temporaneo** — modifica → Tag → salva (es. "Evento 2026-05", "Prestito")

## Suggerimenti

- **Usa Genera** per le etichette — mantiene ordinata la numerazione ed evita duplicati
- **Imposta il Modello presto** — le tariffe derivano dal modello; un modello non impostato significa che le corse su questo veicolo ricadranno sulle regole tariffarie senza modello
- **Non cambiare lo Stato in _Disponibile_ finché non hai verificato fisicamente l'IoT** — i rider potranno sbloccarlo immediatamente
- **Guarda il suggerimento della Guida al campo** quando hai dubbi su un campo — l'aiuto inline è più aggiornato di questo articolo
- **Il registro attività è la tua rete di sicurezza** — ogni salvataggio è registrato con nome operatore e timestamp nel [dettaglio veicolo](vehicle-detail.md#scheda-attività)
