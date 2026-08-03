# Ribilanciamento — Zone Morte

La pagina Zone Morte (`/rebalance/dead-zones`) è il **cruscotto di targeting per le operazioni sul campo**: dove il tuo inventario è inattivo, quanto ti costa in termini di entrate e a quali distretti inviare il furgone per il ribilanciamento successivamente.

A differenza della pagina [Analytics — Rebalance](runs.md), che riassume l'attività del team sul campo nel tempo, questa pagina è orientata al futuro: risponde a _dove andiamo ora?_.

Permesso richiesto: operatore autenticato (la route applica solo _requiresAuth_, nessun ID permesso specifico).

## Cosa significa "zona morta"

Una **zona morta** è un'area della città dove i veicoli trascorrono troppo tempo parcheggiati senza essere noleggiati. La pagina le identifica e le classifica in modo che il personale sul campo sappia quali cluster smantellare per primi.

Il sistema supporta due modi per suddividere la mappa:

- **Zone proprietarie** — i tuoi poligoni configurati in [Impostazioni — Zone](../../settings/infrastructure/zones.md)
- **Griglia H3** — la griglia esagonale di Uber, usata per analisi più dettagliate o indipendenti dalle zone

Il toggle si trova nel blocco filtri; la tabella mostra le stesse colonne in entrambi i casi.

## Riga KPI (in alto)

Una riga di cinque schede KPI riassume la situazione delle zone morte in base ai filtri applicati.

| KPI                 | Cosa mostra                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Zone morte**      | Conteggio delle zone / celle attualmente segnalate come morte                              |
| **Perdita / giorno**| Entrate stimate perse al giorno — somma di `lostRevenuePerDay` nelle zone filtrate         |
| **Dispositivi bloccati** | Totale dispositivi inattivi intrappolati nelle zone morte — il tuo obiettivo fisico di raccolta |
| **Tempo medio di sosta** | Tempo medio di sosta (minuti) nelle zone morte — quanto tempo un veicolo resta fermo prima di muoversi |
| **Progresso settimanale** | Variazione percentuale rispetto alla settimana scorsa — negativo = peggioramento; positivo = miglioramento |

Ogni KPI si aggiorna con i filtri; usali come controllo rapido prima di approfondire la lista.

## Modalità di visualizzazione — Mappa vs Tabella

Un toggle in alto a destra alterna tra due presentazioni degli stessi dati:

- **Mappa** — vista geografica delle zone morte sovrapposta alla città (attualmente un segnaposto _prossimamente_)
- **Tabella** — la griglia dati sottostante, con tutte le colonne e il contesto per riga

I filtri si applicano a entrambe le viste. _Tabella_ è la predefinita; _Mappa_ è collegata ma la resa geografica è ancora in costruzione.

Un controllo _Aggiornamento automatico_ si trova accanto al toggle vista — attivalo per ripetere la richiesta dati a intervalli (utile per operazioni in tempo reale).

## Filtri

Il blocco filtri ha quattro controlli; tutti si combinano con AND:

| Filtro        | Tipo     | Note                                                                              |
| ------------- | -------- | -------------------------------------------------------------------------------- |
| **Città**     | Dropdown | _Tutte le città_ / _Mosca_ / _San Pietroburgo_ — restringi a una città operativa  |
| **Gravità**   | Dropdown | _Tutte_ / _Bassa_ / _Media_ / _Alta_ / _Critica_ — basato sul punteggio di gravità |
| **Tipo di zona** | Dropdown | _Zone proprietarie_ / _Griglia H3_ — quale suddivisione usare                   |
| **Ricerca**   | Testo    | Testo libero — corrisponde a nome zona / distretto                              |

Un pulsante _Pulisci tutto_ a destra della scheda filtri resetta tutti i controlli con un clic.

## Colonne

La vista Tabella ha nove colonne. Clicca una riga per aprire il pannello di approfondimento della zona (attualmente mostra un toast con il nome della zona come segnaposto).

| Colonna              | Contenuto                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Zona / Cella**     | Nome della zona più città e distretto sotto; in modalità H3 è l'ID esagonale                      |
| **Rapporto inattività** | Percentuale di tempo in cui la zona ha dispositivi inattivi, colorata: verde `< 25%`, ambra `25–40%`, rosso `≥ 40%` |
| **Sosta**            | Tempo mediano di sosta in minuti, con _p90_ sotto                                                |
| **Dispositivi medi inattivi** | Conteggio medio di veicoli inattivi nella zona, con il valore _Obiettivo_ per confronto         |
| **Inizi**             | Corse iniziate nella zona nelle _ultime 24h_ / _ultimi 7d_ / _ultimi 30d_                        |
| **Conversione**       | Corse per dispositivo inattivo all'ora — verde `≥ 0.30`, ambra `0.15–0.30`, rosso `< 0.15`       |
| **Sovrabbondanza**    | Dispositivi oltre l'obiettivo — positivo = troppi, negativo = pochi; positivo in rosso          |
| **Perdita / giorno**  | Entrate stimate perse solo per questa zona                                                      |
| **Ultima inattività rilevata** | Quando la zona ha avuto dispositivi inattivi l'ultima volta — formattato nella tua località    |

Le righe sono cliccabili; l'ordinamento delle colonne non è ancora attivo in questa versione.

## Azioni sulla riga

Ogni riga ha un gestore di clic che oggi mostra un toast con il nome della zona. Il menu completo **di azioni (per riga)** è implementato nel codice ma attualmente disabilitato in attesa dell'API. Le azioni previste sono elencate di seguito come riferimento — appariranno in un menu a tre puntini a destra di ogni riga una volta abilitate:

| Azione pianificata       | Cosa farà                                                               |
| ------------------------ | ------------------------------------------------------------------------ |
| **Crea corsa**           | Apri il generatore di corse di riequilibrio precompilato con questa zona |
| **Imposta limite tempo parcheggio** | Restringi il tempo massimo di parcheggio all'interno della zona          |
| **Prezzi dinamici**      | Applica leve di prezzo per attrarre o scoraggiare corse che iniziano o finiscono qui |
| **Modifica zona**        | Modifica il confine della zona (dividi, unisci, rimodella)               |
| **Segna come divieto di sosta** | Trasforma la zona in divieto di sosta per spingere fuori i veicoli       |
| **Riduci obiettivo di fornitura** | Abbassa l'obiettivo di dispositivi così il sistema smette di inviare veicoli qui |
| **Esperimento A/B**      | Imposta un esperimento controllato su una strategia di rimedio           |

Fino a quando l'endpoint non sarà disponibile, considera la tabella come una **superficie di insight in sola lettura** — usala insieme all'elenco Veicoli per agire sui veicoli singolarmente.

## Stati vuoti / di caricamento

- **Caricamento** — un indicatore di caricamento con "Caricamento zone morte…" mentre si interroga il backend
- **Errore** — un banner _Avviso_ con un pulsante _Riprova_ se la richiesta fallisce
- **Vuoto** — un'icona _AlertTriangle_ centrata con il testo "Nessuna zona morta"; questo è lo **stato previsto oggi** poiché l'endpoint non restituisce dati

## Flussi di lavoro tipici

- **Pianificazione mattutina** — Ordina la tabella per _Perdite / giorno_ (visivamente, oggi; colonne ordinabili in arrivo): seleziona le prime 3 zone da assegnare alle corse di oggi
- **Triaggio per gravità** — Filtra _Gravità = Critico_ per vedere solo i casi peggiori, poi apri ogni zona per il contesto
- **Operazioni città per città** — Filtra per _Città_ durante operazioni multi-città; rivedi separatamente il conteggio e le entrate totali perse
- **Confronto con la flotta** — Usa il numero _Dispositivi bloccati_ dalla riga KPI, poi passa all'[elenco Veicoli](../fleet/vehicles.md) filtrato per zona per vedere i veicoli effettivi
- **Abbina con le analisi** — Confronta il conteggio live qui con le sezioni Zone morte / Dispositivi inattivi di [Analisi — Riequilibrio](runs.md) e [Analisi veicoli](../../analytics/reports/vehicles.md) per confermare la tendenza

## Suggerimenti

- **La conversione è la colonna più operativa** — una conversione bassa (rossa) con un eccesso di offerta alto significa che riequilibrare la zona _non aiuterà_; hai la giusta offerta ma la domanda non c'è
- **Rapporto inattività vs dispositivi inattivi medi** — il _rapporto inattività_ è ponderato per tempo (quanto spesso la zona è inattiva), i _dispositivi inattivi medi_ sono ponderati per conteggio (quanti stanno fermi). Entrambi rossi = segnale più forte di zona morta
- **L'_Obiettivo_ sotto _Dispositivi inattivi medi_ deriva dalla configurazione della zona** — se è impostato male, ogni zona sembrerà morta; verifica in [Impostazioni — Zone](../../settings/infrastructure/zones.md)
- **La griglia H3 è utile per città senza zone definite** — quando non hai ancora definito le zone operatore, H3 ti dà un contenitore geografico predefinito
- **Il progresso settimanale è l'indicatore "stiamo vincendo" della pagina** — se il conteggio delle zone morte aumenta ma le entrate perse diminuiscono, il team sul campo sta lavorando prima sulle zone di maggior valore (un buon segno)
- **I gestori delle azioni sono segnaposto** — cliccare una riga al momento mostra solo una notifica informativa; i drawer/dialog effettivi arriveranno quando il backend sarà pronto
