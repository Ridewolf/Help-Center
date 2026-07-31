# Dispositivi IoT

La pagina IoT (`/iot`) è l'**inventario hardware** — ogni unità di tracciatore / serratura posseduta dalla tua flotta, indipendentemente dal fatto che sia attualmente montata su un veicolo. Ogni riga rappresenta un dispositivo fisico identificato dal suo **IMEI**, con telemetria live (stato online, fix GPS, segnale GSM, batteria) aggiornata dall'ultimo ping.

Questa è la controparte lato dispositivo di [Veicoli](../../operations/fleet/vehicles.md): un veicolo senza un IoT non può essere tracciato o controllato; un IoT senza veicolo è solo hardware non assegnato che giace sullo scaffale.

Permesso richiesto: **Dispositivi IoT** (`n8p9q9`). I sotto-permessi regolano `edit` / `send-command` / `delete` e l'azione bulk _Genera veicolo_ si basa su `operations.vehicles.create`.

## Come i dispositivi arrivano qui

I dispositivi non vengono scoperti automaticamente — li registri man mano che ricevi le spedizioni:

1. **Approvvigionamento** — acquisti unità IoT da un fornitore (Omni, Segway, Okai, ecc.). Ogni unità ha un **IMEI** unico stampato sulla scatola / etichetta
2. **+ Crea** qui — inserisci Nome, IMEI, Fornitore, Stato. Il dispositivo è ora nell'inventario ma non assegnato
3. **Assegna a un veicolo** — fatto da [Crea / Modifica veicolo](../../operations/fleet/vehicle-create-edit.md) selezionando questo IoT nel selettore dispositivi. Un IoT per veicolo, un veicolo per IoT
4. **La telemetria inizia a fluire** una volta che il dispositivo si accende con una SIM e raggiunge il broker MQTT di Ridewolf. La lista mostra l'istantanea più recente — aggiorna o attendi l'AutoAggiornamento

In alternativa, usa l'azione bulk **Genera veicolo** qui sotto per creare un veicolo nuovo per ogni IoT selezionato in un solo passaggio (ad esempio dopo aver integrato un lotto di nuovi scooter).

## Filtri

| Filtro  | Tipo      | Note                                       |
| ------- | --------- | ------------------------------------------ |
| Cerca   | Testo     | Corrisponde a nome e IMEI                   |
| Stato   | Dropdown  | `Tutti` / `Attivo` / `Inattivo` / `Archiviato` |

I filtri sono sincronizzati con l'URL (l'aggiornamento mantiene la vista) e si resettano ai valori predefiniti tramite il link Pulisci nella barra dei filtri.

## Colonne

| Colonna         | Ordinabile? | Contenuto                                                                 |
| --------------- | ----------- | ------------------------------------------------------------------------ |
| **Nome**        | sì          | Nome dispositivo + ID breve; clicca la riga per aprire la pagina dettagli |
| **Serratura**   | —           | Indicatore stato serratura (Bloccato / Sbloccato) dall'ultimo comando MQTT |
| **Online**      | —           | Punto verde se l'ultimo ping è entro la finestra di freschezza; rosso se scaduto |
| **GPS**         | —           | Indicatore fix valido / non valido                                         |
| **GSM**         | —           | Intensità segnale (scala 0-32, rosso ≤10, giallo ≤20, verde ≤32)          |
| **Batteria**    | sì          | Percentuale batteria con barra colorata                                   |
| **Stato**       | sì          | Pillola `Attivo` / `Inattivo` / `Archiviato`                             |
| **Ultimo segnale** | sì        | Tempo dall'ultimo pacchetto telemetrico (relativo, es. "5m fa")          |

## Azioni sulla riga

Un menu a tre puntini per ogni riga. Le azioni disponibili dipendono dai permessi:

| Azione             | Permesso  | Cosa fa                                                                    |
| ------------------ | --------- | -------------------------------------------------------------------------- |
| **Visualizza dettagli** | —       | Apre la pagina dettagli del dispositivo (schede Dettagli / Attività / Comandi / Storico) |
| **Visualizza posizione** | —      | Apre le ultime coordinate GPS note in Google Maps (nuova scheda)           |
| **Modifica**       | `edit`    | Apre il modulo di modifica (Nome / IMEI / Fornitore / Stato)                |
| **Elimina**        | `delete`  | Rimuove il record del dispositivo. La conferma ha un ritardo di 3 secondi prima dello sblocco |

## Azioni bulk

Seleziona più righe (checkbox nell'intestazione o per riga) per mostrare la barra bulk. Le azioni sono anch'esse soggette a permessi — quelle che non puoi eseguire sono nascoste, non disabilitate:

| Azione                      | Permesso          | Cosa fa                                                                                                         |
| --------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| **Genera veicolo**          | `vehicles.create` | Crea un nuovo veicolo per ogni IoT selezionato, nominato automaticamente con il prefisso della tua azienda; scegli un modello veicolo + tag opzionali |
| **Cambia stato**            | `edit`            | Imposta Attivo / Inattivo / Archiviato per tutti i selezionati                                                  |
| **Test connessione (Beep)** | `send-command`    | Invia un comando `Beep` a ogni dispositivo — utile per localizzare fisicamente le unità in un magazzino         |
| **Invia comando**            | `send-command`    | Scegli un comando dal fornitore della prima selezione (preset o procedura avanzata multi-step) e invialo a tutti |
| **Elimina**                  | `delete`          | Eliminazione bulk con dialogo di conferma (ritardo conferma 3 secondi)                                          |

Le operazioni bulk vengono eseguite sequenzialmente con progresso (`elaborati / totali`) e un pannello per gli elementi falliti — il successo parziale è normale, i dispositivi falliti restano selezionati per poter riprovare o ispezionare.

## Pagina dettagli

Cliccare una riga (o _Visualizza dettagli_) apre la pagina dettagli del dispositivo. Quattro schede:

- **Dettagli** — IMEI / Fornitore / Stato / coordinate con anteprima Google Maps incorporata; blocco telemetria completo (modalità velocità, validità GPS, valore grezzo GSM, batteria, stato bloccato)
- **Attività** — registro attività generico per questo dispositivo (`entity-type=iot`)
- **Comandi** — invio comandi specifico per fornitore. Lo stesso motore è usato nella scheda Comandi di [Dettaglio Veicolo](../../operations/fleet/vehicle-detail.md) — vedi quell'articolo per la procedura / flusso avanzato
- **Cronologia** — cronologia telemetria / registro pacchetti

L'intestazione mostra il Veicolo collegato (se associato) come un chip — clicca per andare alla pagina di dettaglio di quel veicolo. Un menu a discesa **Azioni** nell'intestazione offre Modifica / Visualizza su Google Maps / Elimina.

## Modulo Crea / Modifica

Il modulo IoT (`+ Crea` o _Modifica_) ha quattro campi, tutti obbligatori:

- **Nome** — etichetta breve che vedrai nelle liste (es. `SCOOTER-014`). Testo libero
- **IMEI** — identificatore hardware univoco del dispositivo (usato per associare un veicolo e ricevere traffico MQTT). Una volta impostato, consideralo immutabile — cambiarlo su un dispositivo distribuito interromperà la telemetria finché l'associazione veicolo non sarà aggiornata
- **Fornitore** — stringa del produttore (es. `omni`, `segway`). Determina quale set di comandi il dispositivo comprende — sii preciso, la ricerca del fornitore è case-sensitive
- **Stato** — `Attivo` (predefinito) / `Inattivo` (nascosto nel selettore per associazione veicolo) / `Archiviato` (hardware dismesso)

Non c'è un modulo inline per associare un veicolo qui — questa funzione è gestita dal modulo Crea / Modifica Veicolo.

## Flussi di lavoro tipici

- **Imbarcare una spedizione di 50 tracciatori** — Crea ciascuno (o importa tramite caricamento CSV, se disponibile) → seleziona tutti → _Genera veicolo_ con il modello veicolo corretto → fatto; ogni IoT ora ha un veicolo associato in stato `needs_investigation` pronto per QA
- **Trovare un'unità mancante in magazzino** — Filtra per nome/IMEI → azione riga _Test connessione (Beep)_ o Beep in blocco → cammina ascoltando
- **Ritirare un dispositivo guasto** — Modifica → imposta Stato = Archiviato (non eliminare — il registro attività è preservato). Se un veicolo era associato, dissocialo prima dal modulo Modifica Veicolo
- **Distribuzione comandi a livello fornitore** (es. impostazione firmware) — Filtra per pattern nome o telemetria, seleziona tutti i corrispondenti → _Invia comando_ → scegli il comando fornitore e lascia che venga eseguito con avanzamento
- **Indagare un veicolo "fantasma"** (online ma perso) — Visualizza posizione → se GPS è Non valido, prova Beep; se ancora silenzioso, sospetta SIM / batteria
- **Confrontare telemetria con eventi** — apri il [report Eventi](../../analytics/reports/events.md) filtrato per il veicolo di questo IoT per correlare stato hardware con attività lato piattaforma

## Suggerimenti

- **IMEI è la chiave di collegamento** ovunque — associazione veicolo, instradamento MQTT, ticket di supporto. Digita una volta, copia per sempre
- **Il campo Fornitore è strutturale, non estetico** — guida il catalogo comandi nella scheda Comandi. Sbagliare `omni` con `Omni` può produrre una lista comandi vuota
- **Online ≠ Attivo** — Online è un segnale telemetrico live; Stato è un flag amministrativo. Un dispositivo Attivo può essere Offline (batteria scarica, no GSM); uno Archiviato può ancora inviare ping finché è acceso
- **Invio comandi in blocco usa il fornitore della prima riga** — se la selezione mescola fornitori, dividili in batch per singolo fornitore o otterrai una lista comandi confusa
- **Genera veicolo crea volutamente veicoli in stato `needs_investigation`** — serve una conferma umana che l'associazione sia corretta prima di andare live. L'etichettatura in blocco durante la generazione facilita il passaggio QA successivo
- **Non esiste un pulsante "forza ri-associazione"** — se la telemetria si interrompe dopo uno swap, controlla l'associazione Veicolo → IoT (modifica Veicolo) e la SIM / alimentazione del dispositivo, non questa pagina
- **I dispositivi Archiviati restano ricercabili** per IMEI — utile quando un'unità vecchia torna dalla riparazione e serve riattivarla (torna ad Attivo)
- **Ultimo segnale è il controllo di salute più rapido** — ordina in modo decrescente per trovare prima i dispositivi obsoleti; qualsiasi > 24h su una riga Attiva merita attenzione
