# Revisione della Prova di Parcheggio

La pagina di revisione (`/support/park-proofs/:id/review`) è dove si modera in dettaglio una foto di prova di parcheggio. Qui si trovano l'immagine completa, tutto il contesto correlato (cliente / corsa / veicolo) e il menu completo delle azioni.

Di solito si arriva qui cliccando sulla miniatura (o su _Visualizza_ nel menu della riga) nella [lista Prove di parcheggio](park-proofs.md).

Permesso richiesto: **Prove di parcheggio** (`d5e6f7`) + sotto-permesso `review` per le azioni di moderazione.

## Layout

La pagina è divisa in tre colonne su schermi ampi, si impila su schermi più stretti:

| Colonna        | Larghezza | Contenuti                                           |
| -------------- | --------- | -------------------------------------------------- |
| **Immagine**   | 5/12      | Foto a grandezza naturale con zoom e panoramica    |
| **Azioni**     | 4/12      | Pulsanti di moderazione, commento opzionale, Elimina admin |
| **Schede info**| 3/12      | Dettagli Cliente, Corsa, Veicolo, Prova            |

## Immagine (colonna sinistra)

Un **visualizzatore di immagini zoomabile** con la foto a piena risoluzione:

- **Clicca e trascina** per spostare quando zoomato
- **Rotella del mouse** (o pizzica su mobile) per zoomare
- **Doppio clic** per resettare lo zoom

Cerca:

- L'intero veicolo inquadrato (non solo una ruota)
- Un posto auto legale (non ostruisce i pedoni, non in zona divieto di sosta)
- Il cavalletto abbassato, veicolo in posizione verticale
- Qualsiasi cosa contraddica la versione del rider in caso di disputa

## Azioni (colonna centrale)

I quattro pulsanti di moderazione sono impilati verticalmente, in ordine di gravità:

| Pulsante             | Effetto sullo stato | Usalo quando                                                             |
| -------------------- | ------------------- | ----------------------------------------------------------------------- |
| **Approva**          | _Approvato_         | La foto è buona — il rider ha parcheggiato correttamente                |
| **Avvisa**           | _Avviso_            | La foto non è perfetta ma non abbastanza grave per una multa — il rider riceve una notifica |
| **Rifiuta con multa** | _Multato_           | La foto è negativa — applica una multa dell'importo inserito sotto il pulsante |
| **Blocca**           | _Bloccato_          | Violazione grave / recidiva — blocca il rider da future corse          |

Ogni azione richiede il sotto-permesso `review`. Le azioni che non puoi eseguire sono nascoste o disabilitate.

### Importo della multa

Il pulsante **Rifiuta con multa** ha un campo numerico direttamente sotto per l'**importo della multa** nella valuta aziendale. La multa viene addebitata sul portafoglio del cliente (o sul metodo di pagamento predefinito del cliente, a seconda della configurazione). L'importo è obbligatorio quando clicchi su _Rifiuta con multa_ — altrimenti il pulsante è disabilitato.

### Commento

Un campo **Commento** si trova sotto i pulsanti di azione. Qualunque cosa tu scriva viene allegata all'azione e salvata in:

- Il record della prova (per future verifiche)
- Il [registro attività del cliente](../../operations/customers/client-detail.md#scheda-attività) (così chi indaga sul cliente in seguito vede la tua nota)
- La notifica in-app del rider (a seconda dell'azione — vedono il contesto del motivo per cui sono stati avvisati / multati)

Scrivi il commento **prima** di cliccare l'azione — viene inviato insieme all'azione, non dopo. Sii specifico: "monopattino che ostruisce il marciapiede, foto scattata alle 22:14" è meglio di "parcheggio errato".

### Elimina (admin)

Un pulsante **Elimina** in fondo (visibile solo con permesso admin) rimuove completamente il record della prova. Usalo per:

- Foto di test / caricamenti spam
- Caricamenti duplicati (stessa corsa, più foto identiche)
- Foto caricate per la corsa sbagliata (errore dati)

Non usare Elimina al posto di Approva / Rifiuta — Elimina serve per _rimuovere il record dal sistema_, non per decisioni di moderazione.

## Schede info (colonna destra)

Tre schede "entità correlate" più una scheda dettagli si impilano verticalmente:

- **Cliente** — nome, telefono, email, stato, link alla [pagina dettaglio cliente](../../operations/customers/client-detail.md)
- **Corsa** — ID corsa, timestamp inizio/fine, distanza, costo; link alla [pagina dettaglio corsa](../../operations/trips/ride-detail.md)
- **Veicolo** — etichetta, modello, stato; link alla [pagina dettaglio veicolo](../../operations/fleet/vehicle-detail.md)
- **Dettagli Prova di Parcheggio** — tipo (inizio/parcheggio/fine), data creazione, coordinate GPS, eventuale verdetto di revisione automatica già applicato

Usa queste schede per **costruire rapidamente il contesto**:

- Questo cliente è un trasgressore alla prima infrazione o un recidivo? — apri Cliente → Attività
- Hanno terminato la corsa nel luogo della foto? — apri Corsa → mappa del percorso
- Questo veicolo è spesso parcheggiato male? — apri Veicolo → prove recenti

## Flussi di lavoro tipici

- **Approvazione rapida** — immagine chiaramente buona → lascia il commento vuoto → _Approva_ → torna alla coda
- **Avviso con contesto** — immagine cattiva ma lieve → scrivi una nota di una frase → _Avvisa_ → il rider riceve un avviso soft
- **Multa dopo valutazione** — immagine chiaramente negativa → controlla la scheda Cliente per recidive → scrivi una nota che spiega la multa → inserisci l'importo → _Rifiuta con multa_
- **Escalation a blocco** — immagine è la terza infrazione → controlla Cliente → Attività per avvisi precedenti → scrivi una nota → _Blocca_
- **Verifica di una decisione precedente** — apri la prova → leggi il campo Commento nel registro attività per vedere cosa ha scritto l'operatore precedente

## Consigli

- **Ingrandisci prima di decidere** — cavalletti, segnali di parcheggio e percorsi pedonali sono facili da perdere nella miniatura
- **Digita prima il commento** — una volta cliccata un'azione, viene inviata; se digiti il commento dopo, hai già moderato senza contesto
- **Approva > Avvisa > Multa > Blocca** è un'escalation unidirezionale — non passare direttamente a Blocca al primo errore
- **Il commento è pubblico** (per il tuo team e il rider) — mantienilo fattuale; niente gergo interno, niente opinioni sul cliente
- **Eliminare è irreversibile** — una volta eliminata una prova non puoi recuperarla; usa _Rifiuta_ se vuoi conservare una traccia della foto errata
- **L'immagine è la verità** — quando il rider contesta una multa, la foto originale + il tuo commento + la cronologia costituiscono il fascicolo del caso
