# Replay Player

Il Replay Player (`/apps/replay-player`) è uno strumento forense che anima la traccia GPS di un veicolo durante una giornata — o l'intero percorso di una singola corsa — su una mappa. Usalo per indagare su incidenti, convalidare reclami dei rider, verificare percorsi insoliti o semplicemente per osservare la flotta in movimento.

Non è una mappa in tempo reale (per quella vedi il Cruscotto Realtime) — riproduce **coordinate storiche** dal backend con pieno controllo della timeline.

Permesso richiesto: **Replay Player** (`k7m8n9`).

## Layout

La pagina è divisa in una barra laterale sinistra (selettori + pannelli informativi) e un'ampia area mappa con una barra di controllo in basso:

| Regione      | Larghezza | Contenuti                                                              |
| ------------ | --------- | --------------------------------------------------------------------- |
| **Sidebar**  | 320 px    | Schede selettore (Per Veicolo / Per Corsa), pannello(i) info per veicolo |
| **Map**      | flex      | Mappa MapLibre con polilinea del percorso, marker di inizio/fine, cursore live |
| **Controls** | in basso  | Riproduci / pausa, menu velocità, cursore timeline, lettura tempo trascorso / totale |

## Controlli (barra laterale)

La barra laterale determina **cosa** viene riprodotto. Ha due schede che cambiano il modello di selezione.

### Scheda Per Veicolo

Riproduci il tracciato completo di uno o più veicoli per un'intera giornata (o qualsiasi data tu scelga):

- **Veicoli** — selezione multipla fino a **5** veicoli. Digita per cercare, filtra la lista per tag dal menu a discesa sottostante.
- **Data** — calendario a comparsa; predefinito a oggi. La riproduzione copre l'intera giornata in orario locale per la data selezionata.
- **Tag** — limita il menu veicoli ai veicoli che hanno uno qualsiasi dei tag selezionati. Utile con flotte grandi.
- **Carica** — recupera in parallelo le coordinate del giorno per tutti i veicoli selezionati e le visualizza.

Quando carichi più veicoli, ciascuno ha la propria polilinea (colorata in base alla velocità) e il proprio marker in movimento sulla mappa, più una scheda info dedicata nella barra laterale.

### Scheda Per Corsa

Riproduci le coordinate di una singola corsa invece di un'intera giornata:

- **Veicolo** (opzionale) — selezione singola; restringe la lista corse sottostante
- **Data** (opzionale) — calendario a comparsa; filtra le corse a un solo giorno. Pulisci per vedere tutte le date.
- **Tag** (opzionale) — filtra la lista corse per tag veicolo
- **Lista corse** — lista scrollabile e paginata delle corse che corrispondono ai filtri sopra. Ogni scheda mostra ora di inizio, pillola stato, durata e distanza.

Cliccando una scheda corsa carichi immediatamente le sue coordinate — non serve un pulsante Carica separato.

## Timeline (barra inferiore)

La barra di controllo corre lungo il fondo della mappa:

| Controllo          | Funzione                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Riproduci / Pausa** | Avvia o mette in pausa l'animazione                                                    |
| **Menu velocità**   | Scegli il moltiplicatore di velocità di riproduzione (vedi sotto)                         |
| **Cursore timeline**| Scorri a qualsiasi punto della riproduzione; la mappa si aggiorna istantaneamente         |
| **Trascorso / Totale** | `mm:ss` (o `h:mm:ss` se più di un'ora) — tempo trascorso e durata totale della riproduzione |

Quando sono caricati più veicoli, il cursore copre l'intervallo **globale** dall'inizio alla fine dell'unione di tutti i tracciati. I tracciati non ancora iniziati al tempo corrente non mostrano marker sulla mappa.

## Mappa

La mappa usa lo stile mappa del tema corrente (vedi [Themes](../../features/ux/themes.md)). Per ogni tracciato caricato:

- Viene disegnata una **polilinea** colorata in base alla velocità — verde per lento, arancione per medio, rosso per veloce
- Viene posizionato un **marker verde di Inizio** al primo punto
- Viene posizionato un **marker rosso di Fine** all'ultimo punto
- Un **marker veicolo** si muove lungo la linea mentre la timeline avanza

I controlli della mappa si trovano nell'angolo in alto a destra (impilati verticalmente):

| Pulsante          | Funzione                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Zoom in / out** | Zoom standard della mappa                                                                  |
| **Reset orientamento** | Ruota la mappa a nord in alto se l'hai inclinata o ruotata                              |
| **Adatta ai limiti** | Zooma / sposta per far entrare l'intero percorso in vista — utile se la riproduzione lunga sposta la telecamera |
| **Schermo intero** | Porta la mappa a schermo intero; la barra di controllo resta in basso                      |

## Velocità di riproduzione

Il menu velocità offre otto preset: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** riproduce la traccia in tempo reale — una corsa di 20 minuti impiega 20 minuti a riprodursi
- **128x** comprime una giornata di 8 ore in circa 4 minuti
- La velocità può essere cambiata durante la riproduzione; l'animazione continua fluidamente da dove era rimasta

Usa velocità più alte (32x / 64x / 128x) per riproduzioni di veicoli su tutta la giornata, velocità più basse (1x / 2x / 4x) per analisi forensi di corse dove vuoi vedere esattamente dove si trovava il rider ogni secondo.

## Pannello info per veicolo

Ogni veicolo caricato ha una piccola scheda nella barra laterale che si aggiorna in tempo reale durante la riproduzione:

| Campo           | Cosa mostra                                                               |
| --------------- | ------------------------------------------------------------------------- |
| **Velocità**    | Velocità interpolata attuale in km/h (colorata verde / gialla / rossa)   |
| **Coordinate**  | Latitudine / longitudine attuali con 6 decimali                          |
| **Distanza**    | Distanza cumulativa percorsa finora in km (haversine, calcolata lato client) |
| **Punto**       | Indice punto attuale / punti totali (quanto si è avanzati nel dataset)    |

Quando la riproduzione non è iniziata o non sono caricati dati, la scheda mostra trattini lunghi.

## Stati vuoti / di caricamento

- **Nessuna selezione** — l'area della mappa mostra un'icona di riproduzione e il messaggio "Seleziona un veicolo e una data o una corsa per iniziare la riproduzione"
- **Caricamento** — un indicatore di caricamento centrato con "Caricamento coordinate..." sovrapposto alla mappa
- **Nessun dato** — se la data o la corsa scelta non ha punti di coordinate, un toast di avviso dice "Nessun dato di coordinate trovato per questa selezione" e la mappa resta vuota
- **Caricamento mappa fallito** — la mappa è un chunk lazy (~1 MB); se il caricamento fallisce (deploy obsoleto, offline), vedrai un toast di errore che ti invita ad aggiornare

## Flussi di lavoro tipici

- **Indagare un reclamo** — passa a By Ride, cerca la corsa del rider, cliccala → guarda il percorso a 4x per vedere dove è effettivamente andato rispetto a quanto dichiarato
- **Verificare un veicolo "perso"** — By Vehicle, scegli l'unità, imposta la data di oggi → riproduci a 128x per vedere l'intera giornata in secondi; l'ultima posizione del marcatore è dove si trova attualmente
- **Confrontare due veicoli** — By Vehicle, seleziona due unità che hanno percorso rotte simili, stessa data → entrambe le polilinee e i marker vengono visualizzati insieme per un confronto visivo
- **Individuare l'orario di un evento** — carica una corsa → trascina il cursore al timestamp da un biglietto / registro → leggi le coordinate dal pannello informazioni
- **Individuare eccessi di velocità** — carica la giornata di un veicolo → cerca segmenti di polilinea **rossi** → trascina il cursore in quell'area per confermare

## Consigli

- **Massimo 5 veicoli** contemporaneamente — l'interfaccia limita la selezione multipla per mantenere ragionevole la performance della mappa. Per più veicoli, fai sessioni separate.
- **Usa Fit Bounds dopo una lunga riproduzione** — la riproduzione segue il marcatore, che sposta la telecamera; un clic su Fit Bounds riadatta l'inquadratura all'intero percorso.
- **I colori della velocità non sono legati alle tariffe** — sono solo indicatori visivi basati sulla velocità GPS osservata (>15 km/h giallo, >30 km/h rosso). Confronta con la _modalità velocità_ del veicolo nella pagina dettaglio veicolo per il contesto.
- **Il cursore scorre in entrambe le direzioni** — trascina indietro per riavvolgere. Combinalo con una velocità bassa per esaminare segmenti difficili.
- **Nessuno stato URL** — le selezioni non sono salvate nell'URL, quindi non puoi condividere un link profondo. Salva screenshot se vuoi salvare un momento.
- **Abbinalo alla pagina [Ride Detail](../../operations/trips/ride-detail.md)** — il dettaglio corsa ha una mappa statica del percorso con eventi sulla timeline; il player di riproduzione aggiunge la dimensione temporale sopra di essa.
