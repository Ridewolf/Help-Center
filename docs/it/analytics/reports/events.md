# Analytics — Eventi Recenti

La pagina di analisi Events (`/analytics/events`) è il tuo **cruscotto degli incidenti**: ogni evento notevole di sistema, veicolo, utente e zona in un periodo scelto, con contatori KPI, modelli nel tempo e un feed ricercabile in fondo.

Diversa dal [Notifications panel](../../features/ux/notifications.md) (in tempo reale, per evento) — questa pagina è **aggregata e storica**, utile per individuare tendenze e fare revisioni post-incidente.

Permesso richiesto: **Visualizza Eventi Recenti** (`s1t2u3`).

## Intervallo di tempo e filtri

Una **barra dell'intervallo di date** si trova in alto — ogni metrica e grafico la rispetta. Quattro filtri extra restringono la visualizzazione:

| Filtro          | Opzioni                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Gravità**     | `critical` / `warning` / `info` (selezione multipla)                    |
| **Tipo**        | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Tipo sorgente** | `vehicle` / `user` / `zone` / `system`                                |
| **Stato**       | `open` / `resolved` / `dismissed`                                       |

Tutti i filtri si combinano con AND. L'URL riflette ogni impostazione — condividi un link e il tuo collega vedrà esattamente la stessa visuale.

## Sezioni

La pagina ha **cinque sezioni**:

### 1. Riepilogo

Quattro schede metriche riassumono i conteggi degli eventi:

| KPI          | Cosa mostra                                                  |
| ------------ | ------------------------------------------------------------ |
| **Totale**   | Totale eventi nell'intervallo                                |
| **Critici**  | Conteggio con `severity = critical` — il numero da controllare |
| **Avviso**   | Conteggio con `severity = warning`                           |
| **Info**     | Conteggio con `severity = info` — solitamente rumore salvo picchi |

Ogni scheda mostra un badge di confronto "vs periodo precedente".

### 2. Per Tipo

Un grafico che suddivide gli eventi per **tipo**:

- **Errore** — guasti di sistema / integrazione
- **Offline** — dispositivi IoT che si spengono
- **Batteria** — allarmi di batteria bassa / scarica / anomalia
- **Pagamento** — rifiuti, problemi gateway
- **Supporto** — picchi di ticket / chat
- **Manutenzione** — eventi legati al servizio

I picchi in un singolo tipo sono solitamente il punto di partenza per un'indagine.

### 3. Modelli

Due grafici a serie temporali:

- **Per Giorno** — eventi per giorno nell'intervallo (visualizza cicli settimanali)
- **Per Ora** — eventi per ora del giorno nell'intero intervallo (visualizza picchi giornalieri)

### 4. Principali Sorgenti

Una lista delle **principali sorgenti** che generano eventi — solitamente veicoli o zone con un numero sproporzionato di eventi.

Ogni voce include la sorgente (collegata alla sua pagina di dettaglio), il conteggio eventi e la gravità / tipo dominante.

Qui trovi il **veicolo che ha segnalato allarmi tutta la settimana** o la **zona con problemi di batteria**.

### 5. Feed

Un feed scorrevole di eventi individuali che corrispondono ai filtri attuali. Ogni riga mostra:

- Icona di gravità (colorata)
- Tipo evento + etichetta sorgente
- Breve descrizione
- Timestamp
- Pillola di stato

Clicca un elemento del feed per navigare all'entità correlata (veicolo, cliente, corsa, biglietto) se applicabile.

## Flussi di lavoro tipici

- **Revisione mattutina quotidiana** — preimpostato _Ultime 24h_ → Gravità = Critico → scansione; tutto ciò che è rosso riceve attenzione prima di aprire il resto del cruscotto
- **Triaggio principali sorgenti** — sezione Principali sorgenti → clicca su un veicolo che continua a comparire → risolvi o scala alla sorgente
- **Rilevamento modelli** — grafici modelli; un giorno o un'ora insoliti indicano un cambiamento (deploy, meteo, interruzione)
- **Revisione post-incidente** — scegli il giorno → gravità = critico → incrocia il Feed con la scheda Avvisi del [Veicolo](../../operations/fleet/vehicle-detail.md) o la sezione Qualità di [Payments analytics](payments.md) a seconda del tipo
- **Passata di pulizia** — Stato = Aperto → risolvi in blocco gli elementi obsoleti (lo fai dalle pagine sorgente, non qui, ma li trovi qui)

## Consigli

- **Prima i critici** — inizia con `severity = critical`; avvisi e info spesso si risolvono da soli
- **Il tipo è il tuo detective** — una volta individuato un picco, filtra per il tipo dominante per ridurre il rumore
- **Principali sorgenti è oro** — un veicolo in cima alla lista delle sorgenti spiega tipicamente il 30-50% di tutti gli eventi
- **Aggregazioni vs dati grezzi** — questa pagina aggrega; per le transazioni / avvisi reali vai alla pagina del dominio sorgente
- **Filtri persistenti** — le tue impostazioni sopravvivono alla navigazione; cancellale quando passi l'URL a qualcun altro
- **Stato `open` ≠ allarme IoT non risolto** — Lo Stato qui è lo stato del _record evento_; l'allarme sottostante può essere stato cancellato sul dispositivo mentre l'evento è ancora aperto nel sistema
