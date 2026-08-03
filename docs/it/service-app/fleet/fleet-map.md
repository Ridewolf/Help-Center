# Mappa della Flotta e Ricerca Veicolo tramite QR

La mappa della flotta (`/battery-swap`) è la schermata iniziale dell'app di servizio dopo l'accesso: una mappa a schermo intero della tua flotta con una fila di pulsanti di azione flottanti lungo il fondo. Ogni lavoro sul campo inizia qui: trova il veicolo, poi aprilo.

Aprire un veicolo da questa schermata ti porta alla [pagina Veicolo](vehicle-controls.md), dove si trovano i controlli. Per il menu e le impostazioni dell'app, consulta la [panoramica dell'app di servizio](../basics/overview.md).

## Lettura della mappa

Ogni veicolo è un marcatore sulla mappa. Dietro ogni marcatore l'app conserva i valori necessari sul campo:

- Etichetta e stato
- Percentuale batteria del veicolo
- Percentuale batteria del tracciatore
- Posizione, direzione e velocità in km/h
- Bloccato o sbloccato
- Qualità del segnale mobile, come valore da 0 a 36
- Stato GPS e se il tracciatore è online
- IMEI del tracciatore

Tocca un marcatore per aprire quel veicolo.

### Vista elenco

Un elenco a schermo intero scorre sopra la mappa e mostra ogni veicolo che corrisponde ai filtri attivi. L'intestazione dell'elenco contiene i pulsanti per tornare alla mappa e per aprire i filtri, mentre la fila di pulsanti di azione in basso è nascosta mentre l'elenco è aperto.

Toccando una riga si apre la stessa pagina veicolo che si apre toccando il marcatore corrispondente — usa la vista più veloce per il lavoro.

## Filtraggio dei veicoli

I filtri si trovano in un pannello filtri e **sono salvati sul tuo dispositivo** — rimangono attivi anche chiudendo e riaprendo l'app. Questa è la ragione più comune per cui un veicolo "scompare": un filtro impostato ieri è ancora applicato oggi.

I controlli, in ordine:

| Controllo            | Funzione                                                                               |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Chip di stato**    | Filtra per stato; i chip sono colorati per corrispondere ai punti di stato sulla mappa live |
| **Intervallo batteria** | Un cursore da 0 a 100%                                                                |
| **Tipo di veicolo**  | Un carosello di tipi — mostrato solo se la tua flotta ha più di un tipo di veicolo      |
| **Ultimo segnale**   | Preimpostazioni: qualsiasi, 1h, 6h, 24h, 7d — nasconde i veicoli offline da più tempo del periodo scelto |
| **Tag**              | Tag pubblici per primi in ordine alfabetico, poi tag privati con icona a lucchetto     |
| **Ricerca**          | Testo libero, corrisponde a etichetta, VIN o IMEI                                      |

Due comportamenti da tenere a mente:

- **Più tag usano la logica AND** — un veicolo deve avere *tutti* i tag selezionati per rimanere nei risultati.
- **I tag si caricano silenziosamente.** Se la lista dei tag non può essere caricata, i chip semplicemente non appaiono e non viene mostrato alcun errore. Chiudi e riapri il pannello per riprovare.

I colori di stato a basso contrasto (come in carica e scarico) hanno testo chip più scuro in modalità chiara per rimanere leggibili; la modalità scura mantiene il colore brillante.

Il pannello si riapre sempre con i filtri salvati già applicati.

## Apertura di un veicolo tramite codice QR

1. Tocca il pulsante di azione **scanner**.
2. Punta la fotocamera sul codice QR del veicolo. I codici che identificano già il veicolo lo aprono immediatamente; qualsiasi altro viene cercato per etichetta, VIN o IMEI. Quando più veicoli corrispondono, vince la corrispondenza esatta dell'etichetta.
3. L'app apre la pagina di quel veicolo.

In [modalità batch](../operations/batch-mode.md), la stessa scansione aggiunge il veicolo alla coda invece di aprirlo.

### Quando il codice non si scansiona

Usa il fallback di inserimento manuale: digita l'**etichetta**, il **VIN** o l'**IMEI** nel modale. Usa esattamente la stessa ricerca, quindi qualsiasi cosa lo scanner avrebbe aperto, anche digitando si aprirà.

Un codice non riconosciuto mostra un errore di codice non valido. Lo scanner si chiude anche da solo dopo un po' se non viene scansionato nulla — basta toccarlo di nuovo.

## Cassetto biglietti e legenda

- Il pulsante di azione **biglietti** apre un cassetto con i biglietti di supporto aperti con i conteggi. È una scorciatoia sul campo per vedere cosa hanno segnalato i rider, separata dalla coda completa di supporto descritta in [Strumenti back-office](../tools/back-office-tools.md#supporto--biglietti).
- Il modale **legenda** spiega le forme dei marcatori e la codifica colore di stato usata sulla mappa. Aprilo quando un colore è sconosciuto invece di indovinare.

## Preferenze mappa

Un controllo nell'**angolo in alto a destra della mappa** — non nel cassetto **Impostazioni** dell'app — apre le preferenze della mappa. Copre:

- Stile del marcatore (icona, punto, automatico) e dimensione del marcatore
- Sovrapposizioni: percentuale batteria, etichette, anelli di stato, allarmi, biglietti
- Raggruppamento
- Zone
- La tua posizione
- Movimento fluido
- Blocco schermo (mantiene lo schermo acceso mentre lavori)
- Frequenza di aggiornamento

Modifica queste impostazioni quando la mappa è troppo affollata per essere letta: disattiva le sovrapposizioni per un'immagine più pulita, o attiva il raggruppamento in un'area densa.

## Problemi comuni

| Sintomo                                    | Cosa fare                                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Un veicolo che ti aspetti è assente        | È ancora applicato un filtro salvato — controlla le schede di stato, l'autonomia della batteria e soprattutto la finestra dell'ultimo segnale |
| Nessun carosello per tipo di veicolo nei filtri | La tua flotta ha un solo tipo di veicolo; è normale                                           |
| Nessuna scheda tag visibile                 | L'elenco dei tag non si è caricato. Chiudi e riapri il pannello filtri per riprovare           |
| Una combinazione di tag non restituisce risultati | I tag sono combinati con AND — rimuovi un tag                                                  |
| Un codice scansionato non viene riconosciuto | Conferma che il codice appartiene a un veicolo della tua azienda, poi usa l'inserimento manuale con etichetta, VIN o IMEI |
| Lo scanner si chiude da solo                | Scade dopo un periodo di inattività — riaprilo                                                |

## Suggerimenti

- **Pulisci i filtri all'inizio di un turno.** Persistono e una finestra dell'ultimo segnale obsoleta nasconde esattamente i veicoli che devi trovare.
- **Usa i preset dell'ultimo segnale per cercare tracciatori spenti** — imposta `7d` e cerca quelli che sono stati silenziosi.
- **La ricerca accetta IMEI**, quindi un adesivo con solo il numero del tracciatore è sufficiente per aprire un veicolo.
- **L'inserimento manuale non è un downgrade** — si risolve allo stesso modo dello scanner, quindi usalo non appena un codice sembra danneggiato.
