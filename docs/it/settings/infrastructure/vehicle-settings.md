# Regole del veicolo

La pagina Regole del veicolo (`/settings/vehicle-rules`) è il **catalogo dei modelli di veicoli** che Ridewolf sa gestire — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_ e così via. Ogni riga qui è un **modello template**: un pacchetto riutilizzabile di prezzi, limiti tecnici, regole per prove fotografiche e tag che viene associato ai singoli [veicoli](../../operations/fleet/vehicles.md) fisici tramite il [modulo veicolo](../../operations/fleet/vehicle-create-edit.md).

Permesso richiesto: **Regole del veicolo** (`e7f8g9`). Sotto-permessi per `create` / `edit` / `delete`.

## Modello vs istanza del veicolo

Questa è la distinzione più importante in questa pagina:

- Un **Modello di veicolo** (questa pagina) — una definizione. _"Ogni Xiaomi M365 nella nostra flotta si comporta così"_. Una riga per marca/configurazione.
- Un **Veicolo** (la [lista Veicoli](../../operations/fleet/vehicles.md)) — un’unità fisica con un’etichetta adesiva come `RW-007`, associata a un singolo dispositivo IoT, parcheggiata da qualche parte. Centinaia di questi puntano a un singolo modello.

Quando modifichi un modello qui, ogni veicolo che vi fa riferimento eredita i nuovi valori predefiniti — le tariffe diventano attive, i limiti di velocità si aggiornano, i requisiti per le prove fotografiche entrano in vigore. Considera questa pagina come un **livello di policy** che si propaga a molte unità contemporaneamente.

## Filtri

La barra dei filtri in alto ha tre controlli:

| Filtro      | Tipo     | Note                                                                              |
| ----------- | -------- | --------------------------------------------------------------------------------- |
| **Cerca**   | Testo    | Cerca nell’etichetta del modello                                                  |
| **Stato**   | Dropdown | `Tutti` / `Attivo` / `Inattivo` / `Archiviato`                                   |
| **Tipo**    | Dropdown | `Tutti` / `E-Scooter` / `E-Bike` / `Cargo E-Bike` / `E-Moped` / `E-Car` / `E-Boat` |

Modificare un filtro riporta la paginazione alla pagina 1 e ricarica dal server.

## Colonne

| Colonna         | Ordinabile? | Contenuto                                                                                   |
| --------------- | ----------- | ------------------------------------------------------------------------------------------- |
| **Immagine**    | —           | Miniatura 64×64; se non è caricata un’immagine, mostra un’icona generica di un’auto          |
| **Nome**        | ✓           | L’etichetta del modello (es. _Xiaomi M365 Pro_)                                            |
| **Tipo**        | ✓           | Pillola del tipo di veicolo (e-scooter, e-bike, …)                                        |
| **Descrizione** | ✓           | I primi 36 caratteri della descrizione in markdown, senza formattazione                    |
| **Tag**         | —           | Fino a 2 pillole tag + un chip `+N` per l’overflow — **clicca per modifica rapida** in un dialogo |
| **Stato**       | ✓           | Pillola colorata: Attivo (verde) / Inattivo (grigio) / Archiviato (blu) — **clicca per modifica rapida** |
| **Creato**      | ✓           | Data di creazione del modello                                                             |
| **Aggiornato**  | ✓           | Data dell’ultima modifica                                                                 |

I clic per modifica rapida aprono un piccolo dialogo con solo il multi-selettore tag o il menu a tendina dello stato — utile per modifiche di stato in blocco senza uscire dalla lista.

## Azioni della barra degli strumenti

Pulsanti in alto a destra (visibilità dipende dai permessi):

| Pulsante        | Permesso  | Cosa fa                                                                                                                    |
| --------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Auto-refresh**| —         | Interroga la lista a intervalli regolari; attiva/disattiva; l’icona ruota durante il caricamento                           |
| **Importa**     | `create`  | Seleziona un file JSON (formato export). Ogni elemento diventa una chiamata `create`; tag e tariffe vengono rimossi — riassocia manualmente dopo |
| **Esporta**     | —         | Apre un dialogo per esportare la pagina corrente / tutte filtrate / pagine specifiche come `vehicle-models-export.json`    |
| **+ Crea**      | `create`  | Va a `/settings/vehicle-rules/create`                                                                                      |

## Azioni sulla riga

Menu a tre puntini per ogni riga:

| Azione          | Permesso  | Cosa fa                                                                                                                   |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Visualizza dettagli** | —   | Apre il dettaglio del modello su `/settings/vehicle-rules/:id` (schede Generale / Tecnico / Cronologia)                   |
| **Modifica**    | `edit`    | Apre il modulo di modifica (`/settings/vehicle-rules/:id/edit`) con tutti i campi                                            |
| **Elimina**     | `delete`  | Dialogo di conferma distruttiva con ritardo di 3 secondi prima che il pulsante conferma si attivi. La riga scompare dalla lista |

Cliccare sulla riga stessa (ovunque fuori dai chip di modifica rapida) apre **Visualizza dettagli**.

## Modulo Crea / Modifica

`+ Crea` (`/settings/vehicle-rules/create`) e _Modifica_ (`/settings/vehicle-rules/:id/edit`) condividono lo stesso layout: una scheda modulo a sinistra, una barra laterale contestuale **Guida ai campi** a destra con un’anteprima live del modello.

Il modulo è suddiviso in sezioni — Crea mostra solo i sette campi principali; Modifica aggiunge tre sotto-sezioni extra (Specifiche tecniche, Politiche automatiche, Requisiti documenti) per impostazioni avanzate.

### Campi principali

| Campo            | Obbligatorio | Note                                                                                                                                   |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Etichetta**    | ✓            | Nome leggibile mostrato ovunque (es. _Xiaomi M365 Pro_). Testo libero                                                                 |
| **Descrizione**  | —            | Editor Markdown; usato nel dettaglio del modello e nei suggerimenti per l'operatore                                                    |
| **Tipo Veicolo** | ✓            | Uno tra: e-scooter / e-bike / cargo-e-bike / e-moped / e-car / e-boat. Determina l'icona di guida e la logica di categoria             |
| **Stato**        | ✓            | Attivo / Inattivo / Archiviato. Inattivo rimuove il modello dal selettore di creazione veicolo                                        |
| **Immagine**     | —            | Trascina e rilascia o clicca per caricare. PNG/JPEG/JPG, max 10 MB. Mostrata nella miniatura della lista e nel dettaglio Veicolo       |
| **Tariffe**      | ✓            | Selezione multipla di [Tariffe veicoli](vehicle-tariffs.md). Tutte le corse su questo modello si prezzano secondo queste tariffe      |
| **Tag**          | ✓            | Selezione multipla di tag a livello modello. Ereditati da ogni veicolo di questo modello                                              |

### Specifiche tecniche (solo in modalità Modifica)

| Campo                             | Note                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| **Limite velocità base (km/h)**  | Limite massimo imposto dal firmware IoT su ogni corsa                                |
| **Riserva batteria (%)**         | Livello di carica sotto il quale il veicolo è considerato a batteria bassa           |
| **Riserva autonomia (km)**       | Autonomia residua stimata sotto la quale l'unità viene segnalata per sostituzione      |
| **Tensione batteria min/max (V)** | Limiti per letture valide della batteria principale — valori fuori segnalano _Richiede indagine_ |
| **Tensione IoT min/max (V)**     | Stesso per la batteria del modulo IoT del tracciatore                                |

### Politiche automatiche (solo in modalità Modifica)

Attiva pacchetto: **Stop batteria bassa**, **Stop saldo basso**, **Corse multiple**, **Blocco automatico**, più **Rimborso automatico** e **Sconto automatico** con le proprie soglie (distanza / tempo / importo).

### Requisiti documentali (solo in modalità Modifica)

Definisce quali foto / documenti un rider deve inviare:

- **Prove di inizio** — foto del veicolo all'inizio della corsa (attiva + obbligatorio + conteggio) e selfie del rider
- **Prove di parcheggio** — foto del parcheggio a fine corsa (attiva + obbligatorio + conteggio)
- **Documenti extra** — patente / passaporto / carta d'identità / selfie / altro

Queste regole sono lette dalla Rider App all'inizio / fine corsa su un veicolo associato a questo modello.

## Relazioni con altre entità

- **[Tariffe veicoli](vehicle-tariffs.md)** — le righe di prezzo che scegli nel campo **Tariffe**. Un modello senza tariffe non può prezzare una corsa
- **[Veicoli](../../operations/fleet/vehicles.md)** — unità fisiche che puntano a questo modello tramite il campo _Modello veicolo_ nel [form veicolo](../../operations/fleet/vehicle-create-edit.md). Il modello definisce la politica; il veicolo possiede IoT, etichetta e posizione
- **Tag** — tag a livello modello ereditati da ogni veicolo di questo modello, oltre ai tag a livello veicolo applicati direttamente sull'unità. Le corse ereditano entrambi all'inizio della corsa

## Flussi di lavoro tipici

- **Inserire un nuovo modello** — `+ Crea` → compila Etichetta / Tipo / Stato / Immagine → scegli le tariffe applicabili → salva → apri il nuovo modello dalla lista e clicca _Modifica_ per impostare Specifiche tecniche e politiche
- **Ritirare un modello** — apri il modello → _Modifica_ → imposta Stato = _Archiviato_ → salva. I veicoli esistenti continuano a funzionare; il modello semplicemente non appare più nel selettore di creazione veicolo
- **Cambio tariffa su tutta la flotta** — modifica il modello → cambia tariffe → salva. Tutti i veicoli di questo modello iniziano a prezzare con le nuove tariffe dalla corsa successiva
- **Importazione massiva dopo migrazione** — Esporta da staging → Importa il file JSON qui → riattacca manualmente tariffe e tag su ogni nuovo modello (l'importazione rimuove appositamente quei riferimenti)
- **Modificare i requisiti fotografici** — Modifica → Requisiti documentali → attiva/disattiva Prove di inizio / parcheggio → salva. La Rider App applica le nuove regole alla prossima corsa

## Suggerimenti

- **Imposta le tariffe prima di attivare** — un modello senza tariffe rifiuterà le richieste di prezzo corsa
- **Usa Inattivo, non Elimina, per ritirare** — Inattivo nasconde il modello dalla creazione di nuovi veicoli ma mantiene intatta la cronologia. Eliminare è irreversibile ed è bloccato da un ritardo di conferma di 3 secondi per una ragione
- **L'immagine conta** — la miniatura della lista e i selettori veicolo per l'operatore usano questa immagine. Ritaglia in quadrato con sfondo trasparente per un aspetto più pulito
- **I tag qui sono a livello modello, non veicolo** — applicare un tag qui lo assegna a ogni veicolo di questo modello. Per tag specifici dell'unità, modifica il veicolo singolo
- **Gli avvisi delle Specifiche tecniche** — riserva batteria e limiti di tensione alimentano il trigger _Richiede indagine_; impostarli troppo stretti inonda la coda degli avvisi
- **La barra laterale Guida al campo si aggiorna mentre ti concentri su un campo** — leggila la prima volta che crei un modello, è più aggiornata di questo articolo
