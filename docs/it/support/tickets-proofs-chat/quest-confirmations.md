# Conferme delle Quest

Le quest sono **compiti gamificati che la piattaforma chiede ai rider di svolgere in cambio di una ricompensa** — e le Conferme delle Quest (`/support/quest-confirmations`) sono il luogo dove un operatore esamina le prove inviate da un rider e decide se erogare la ricompensa.

I quattro tipi di quest sono:

- **battery** — un compito relativo alla batteria
- **lost** — restituzione di un oggetto smarrito
- **clean** — pulizia di un veicolo
- **parking** — un compito di parcheggio

> **Attenzione: questa pagina è una anteprima.** Le decisioni prese qui **non vengono attualmente registrate e nessuna ricompensa viene pagata** — il flusso di revisione è visibile prima che la funzionalità sia completamente implementata. Non informare un rider che la sua quest è stata pagata basandoti su questa schermata.

## Dove trovarla

Non esiste **nessuna voce nella barra laterale** — il gruppo Supporto nella barra laterale contiene solo Prove di parcheggio, Biglietti e Conversazioni. Accedi alla pagina digitando direttamente `/support/quest-confirmations`.

La pagina è disponibile **solo in modalità Avanzata**; è bloccata in modalità Facile (Lite). Considerala come una superficie per utenti esperti non elencata, piuttosto che parte della navigazione normale dell'operatore — allo stesso modo di [Error Logs](../../apps/tools/error-logs.md).

La lista e il dettaglio sono sulla stessa pagina: selezionando una sottomissione si espande un **pannello di dettaglio in loco** invece di navigare altrove. Usa **Indietro alla lista** nell'intestazione del pannello per tornare.

## Vista elenco

| Filtro         | Opzioni                                |
| -------------- | -------------------------------------- |
| **Stato**      | Tutti / In sospeso / Approvati / Rifiutati    |
| **Tipo di quest** | Tutti / Battery / Lost / Clean / Parking |
| **Cerca**      | Per utente, quest o veicolo              |
| **Pulisci**    | Reimposta tutti i filtri                     |

Un riepilogo statistico sopra la lista mostra il **conteggio in sospeso**, quanti sono stati **approvati oggi**, **rifiutati oggi**, e il **tempo medio di revisione** in minuti.

## Revisione di una sottomissione

1. Clicca su una riga di sottomissione per espandere il pannello di dettaglio.
2. Leggi le prove:
   - la **griglia fotografica**
   - un **badge QR**, se il rider ha scansionato il codice del veicolo
   - un **badge GPS** con la precisione in metri, se la posizione è stata catturata
   - il **commento** del rider, se ne ha lasciato uno
3. Decidi:
   - **Approva e Paga Ricompensa** applica direttamente l'approvazione — non c'è **nessuna finestra di conferma**, quindi clicca con attenzione.
   - **Rifiuta Sottomissione** mostra un menu a tendina per il motivo del rifiuto (**obbligatorio**) più un commento opzionale; poi premi **Conferma Rifiuto**.

Solo le sottomissioni **in sospeso** possono essere revisionate. Le sottomissioni già decise mostrano un pulsante **Visualizza** invece di Revisione.

Motivi di rifiuto: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Cosa contiene una sottomissione

- **Ora** di arrivo, l'**utente**, la **quest** reclamata e il **veicolo** coinvolto
- **Flag QR** — se il rider ha scansionato il codice QR del veicolo
- **Foto** — ciascuna etichettata con ciò che mostra
- **GPS** — latitudine/longitudine con etichetta, più la precisione in metri (un valore alto indica una posizione approssimativa)
- **Ricompensa** — testo libero che descrive il pagamento, es. una corsa gratuita fino a un importo stabilito
- **Commento utente** — nota opzionale del rider
- **Revisionato da / a** e un eventuale **commento di rifiuto** una volta deciso

## Domande comuni

- **Approvare paga davvero la ricompensa?** Non oggi — la pagina è una anteprima e le decisioni non sono registrate.
- **Perché non c'è un passaggio di conferma sull'approvazione?** Approva e Paga Ricompensa è un'azione diretta nell'implementazione attuale. Clicca con attenzione.
- **Una sottomissione non ha badge QR o GPS — è frode?** Entrambi i segnali sono opzionali. Valutali insieme alle foto invece di considerare la mancanza di un badge come prova di qualcosa.
- **Il valore di precisione GPS è enorme — cosa significa?** Il dispositivo ha segnalato una posizione approssimativa; la posizione è solo indicativa.
- **Posso riaprire una sottomissione già decisa?** No — le sottomissioni approvate o rifiutate offrono solo Visualizza.
- **Non la trovo nel menu.** Non esiste una voce di menu; digita direttamente l'URL, in modalità Avanzata.
