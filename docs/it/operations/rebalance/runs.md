# Rebalance — Corse

La pagina Corse di Rebalance (`/rebalance/runs`) è il **registro operativo di ogni viaggio di riequilibrio**: chi ha guidato quale furgone, da quale deposito è partito, quanti monopattini e batterie sono a bordo, se sono in orario e dove si sono verificati problemi.

Una **corsa** è il lavoro sul campo di un turno — un autista, un furgone, un deposito di origine, un elenco ordinato di fermate e una finestra di ETA pianificata. La pagina consente ai dispatcher di monitorare le corse attive e rivedere quelle completate.

Questa pagina è la vista dettagliata per singola corsa che integra il riepilogo di livello superiore [Analytics — Rebalance](runs.md) e la bacheca basata sulla posizione [Rebalance — Dead Zones](dead-zones.md).

Permesso richiesto: operatore autenticato (la rotta applica solo _requiresAuth_, nessun ID permesso specifico).

> Nota — al momento della scrittura, gli endpoint CRUD di `/rebalance/runs` non sono ancora attivi. La pagina rende il blocco filtri, la riga KPI e il layout tabella con KPI fittizi e una lista vuota. _Crea corsa_, _Cerca_, _Aggiornamento automatico_ e il menu azioni per riga (_Invia_, _Riassegna_, _Riprogetta_, _Stampa foglio_, _Esporta_, _Modifica_, _Annulla_) sono implementati nel codice ma commentati in attesa del backend. Cliccare su una riga naviga a `/rebalance/runs/:id` ma la pagina dettaglio non fa parte di questa build.

## Riga KPI (in alto)

Una riga di cinque schede KPI riassume le corse di oggi.

| KPI                | Cosa mostra                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Corse attive**   | Corse attualmente in stato _Inviato_ / _In corso_ / _In pausa_                                |
| **% in orario**    | Percentuale di corse che rispettano la finestra ETA pianificata; verde trend positivo ≥ 90%, rosso trend negativo sotto |
| **Corse in ritardo**| Numero di corse segnalate _In ritardo_ sul loro SLA — l'indicatore "cosa necessita assistenza" per il dispatcher |
| **Km totali oggi** | Distanza cumulativa percorsa da tutti i furgoni di riequilibrio oggi                           |
| **Scambi batterie**| Totale scambi batterie effettuati dal team sul campo oggi                                    |

I cinque KPI insieme offrono una panoramica immediata di come l'operazione sul campo di oggi sta procedendo rispetto al piano.

## Filtri

Quattro filtri sono contenuti nella scheda _Filtri_; tutti sono combinati con AND. Un pulsante _Pulisci tutto_ a destra resetta il blocco.

| Filtro            | Tipo     | Opzioni                                                                                   |
| ----------------- | -------- | ----------------------------------------------------------------------------------------- |
| **Stato**         | Dropdown | _Tutti_ / _Pianificato_ / _Inviato_ / _In corso_ / _In pausa_ / _Completato_ / _Annullato_ |
| **Rischio SLA**   | Dropdown | _Tutti_ / _In linea_ / _A rischio_ / _In ritardo_ — flag di ritardo della corsa            |
| **Città**         | Dropdown | _Tutte le città_ / _Mosca_ / _San Pietroburgo_                                          |
| **Ha incidenti**  | Dropdown | _Tutti_ / _Sì_ / _No_ — incidenti registrati contro la corsa                              |

Un controllo di _Ricerca_ a testo libero (per numero corsa, autista o furgone) è implementato ma attualmente nascosto insieme a _Aggiornamento automatico_ e _Crea corsa_ fino al rilascio dell'endpoint.

## Colonne

La tabella ha nove colonne visibili. Le righe sono cliccabili — navigano a `/rebalance/runs/:id` (vista dettaglio non inclusa in questa build).

| Colonna               | Contenuto                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **N. corsa**          | Identificatore leggibile della corsa (es. `RUN-2026-0517-001`)                                                          |
| **Autista / Furgone** | Avatar autista + nome + telefono; modello furgone + targa sotto                                                      |
| **Deposito / Città**  | Nome deposito di origine e città                                                                                        |
| **Stato**             | Pillola stato — grigio _Pianificato_, blu _Inviato_, verde _In corso_, giallo _In pausa_, turchese _Completato_, rosso _Annullato_ |
| **Fermate**           | Progresso come `fatte / totali`, con _Fallite: N_ sotto in rosso se una fermata è fallita                              |
| **Carico**            | Monopattini caricati (`🛴 in / capacità`) e batterie caricate (`🔋 cariche + scariche / capacità`)                        |
| **Pianificato**       | Orario ETA inizio–fine + distanza pianificata (km) e durata (min)                                                      |
| **Rischio SLA**       | Pillola rischio — verde _In linea_, ambra _A rischio_, rosso _In ritardo_                                              |
| **Creato / Aggiornato**| Data di creazione in alto, data ultimo aggiornamento sotto                                                              |

La colonna azioni (menu a tre puntini) è implementata ma commentata in attesa degli endpoint CRUD; vedi _Azioni per riga_ sotto per il set previsto.

## Riferimento stato

Una corsa può essere in un solo stato; lo stato determina quali azioni di dispatch sono disponibili:

| Stato          | Significato                                              |
| --------------- | -------------------------------------------------------- |
| **Planned**     | Creato e programmato ma non ancora inviato all'autista   |
| **Dispatched**  | Inviato all'autista / furgone — in attesa di partenza    |
| **In progress** | Il furgone si sta muovendo e/o effettuando fermate      |
| **Paused**      | L'autista ha messo in pausa la corsa (pausa, incidente, ecc.) |
| **Completed**   | Tutte le fermate tentate, corsa chiusa                   |
| **Canceled**    | Interrotta prima del completamento                        |

## Riferimento rischio SLA

Un indicatore in tempo reale che segnala se la corsa rispetterà la finestra temporale pianificata:

| Rischio      | Significato                                              |
| ------------ | -------------------------------------------------------- |
| **On track** | Il ritmo attuale corrisponde all'ETA pianificata         |
| **At risk**  | In ritardo ma ancora recuperabile                         |
| **Late**     | Piano già mancato — necessita attenzione del dispatcher  |

Usa _Rischio SLA = Late_ come primo filtro del dispatcher al mattino.

## Azioni sulla riga (pianificate)

Ogni riga avrà un menu a tre puntini a destra con le azioni elencate di seguito; oggi la colonna è nascosta in attesa dell'API.

| Azione          | Cosa farà                                                  |
| --------------- | ---------------------------------------------------------- |
| **View**        | Apri la pagina di dettaglio corsa su `/rebalance/runs/:id` |
| **Dispatch**    | Sposta una corsa _Planned_ a _Dispatched_, notificando l'autista |
| **Reassign**    | Cambia autista e/o furgone sulla corsa                     |
| **Reoptimize**  | Rilancia l'ottimizzatore di percorso sulle fermate rimanenti |
| **Print sheet** | Genera un foglio corsa stampabile (riepilogo per l'autista) |
| **Export**      | Esporta i dati della corsa come file (rispettando filtri/ordinamenti) |
| **Edit**        | Apri l'editor della corsa                                   |
| **Cancel**      | Annulla la corsa — apre una finestra di conferma           |

## Stati vuoti / di caricamento

- **Loading** — un indicatore con "Caricamento corse…" mentre si interroga il backend
- **Error** — un banner _Avviso_ con un pulsante _Riprova_ se la richiesta fallisce
- **Empty** — un'icona _Furgone_ centrata con "Nessuna corsa trovata"; questo è lo **stato previsto oggi** poiché l'endpoint non restituisce elementi

## Flussi di lavoro tipici

- **Controllo mattutino di dispatch** — Filtra _Stato = Planned_, ordina per data di creazione, dispatcha ciascuna in ordine
- **Monitoraggio in tempo reale** — Filtra _Stato = In progress_, poi _Rischio SLA = Late_ per evidenziare autisti che necessitano assistenza; una volta abilitato, _Auto-refresh_ mantiene la vista aggiornata
- **Revisione di fine giornata** — Filtra _Stato = Completed_, controlla la colonna _Fermate_ per corse con fermate fallite, entra in ciascuna per il debriefing degli incidenti
- **Città per città** — Filtra per _City_ durante operazioni multi-città; verifica i conteggi con la pagina [Analytics — Rebalance](runs.md)
- **Triaggio incidenti** — Filtra _Has incidents = Yes_ per mostrare ogni corsa con problemi oggi
- **Controllo capacità** — Controlla la colonna _Payload_ sulle righe _In progress_; i furgoni vicini alla capacità potrebbero dover tornare presto al deposito

## Suggerimenti

- **I numeri corsa sono identificatori stabili** — condividili con il team sul campo per una coordinazione chiara ("guarda RUN-2026-0517-003")
- **La colonna Fermate dice la verità a colpo d'occhio** — `4/7` significa quattro completate, tre da fare; un rosso _Failed: N_ sotto = necessita follow-up
- **Il "depleted" del Payload è importante** — un alto numero di batterie scariche significa che il furgone è pieno di batterie esauste e dovrebbe passare da un caricatore
- **Creato vs Aggiornato** — _Aggiornato_ si aggiorna ogni volta che l'autista agisce sulla corsa; un vecchio _Aggiornato_ su una riga _In progress_ = l'autista non si è fatto sentire da un po'
- **Lo stato _Paused_ non è un errore** — gli autisti mettono in pausa per pause, incidenti e interazioni con i rider; corse in pausa prolungata meritano una chiamata
- **Fino a quando l'endpoint non sarà disponibile, considera questa pagina come un'anteprima di layout/UX** — struttura, filtri e linguaggio visivo sono definitivi; i dati sottostanti no
