# Analytics — Mappe di calore

La pagina Mappe di calore (`/analytics/heatmaps`) è un **visualizzatore di densità geografica**: scegli una fonte dati, un intervallo di date e una modalità di visualizzazione — la mappa mostra dove si concentra l'attività nell'area operativa.

Usala per la **scoperta della domanda** (dove vogliono iniziare i rider? dove finiscono?) e per la **pianificazione della copertura** (dove i rider cercano veicoli, ma non ne abbiamo?).

## Fonti dati

Tre fonti di segnale, una alla volta:

| Fonte           | Cosa mostra                                                              |
| --------------- | ------------------------------------------------------------------------ |
| **Scansioni**   | Dove i rider **hanno aperto l'app e cercato veicoli** — intenzione di domanda |
| **Inizi corse** | Dove le corse **sono effettivamente iniziate** — domanda convertita       |
| **Fine corse**  | Dove le corse **sono terminate** — luoghi naturali di discesa             |

Confronta _Scansioni_ e _Inizi corse_ per trovare la **domanda insoddisfatta**: luoghi dove i rider hanno cercato ma non hanno trovato veicoli.

## Modalità di visualizzazione

Quattro modi per rappresentare gli stessi dati:

| Modalità      | Cosa disegna                                                                    |
| ------------ | -------------------------------------------------------------------------------- |
| **Mappa di calore**  | Classica sfumatura morbida — ideale per **vedere i picchi** a colpo d'occhio     |
| **Esagoni**  | Celle esagonali — ideale per **confrontare zone** con geometria coerente          |
| **Cluster**  | Raggruppamenti di punti che si espandono con lo zoom — ideale per **esaminare punti singoli** |
| **Griglia**  | Griglia quadrata regolare — ideale per **allinearsi alle zone di pianificazione**  |

Gli stessi dati possono raccontare storie diverse a seconda della modalità — cambia mentre indaghi.

## Schemi di colore

Una fila di piccoli campioni ti permette di scegliere lo schema di colore — utile per operatori daltonici o per abbinare una palette di brand. Il nome dello schema appare come tooltip al passaggio del mouse.

## Slider punti

Uno slider nella barra degli strumenti ti permette di controllare quanti punti dati campionare (es. 1k / 10k / 100k). Più punti = immagine di densità più accurata ma rendering più lento. Parti basso mentre esplori, aumenta quando hai ristretto area/intervallo.

## Intervallo di date

Una barra standard per l'intervallo di date in alto. Più ampio è l'intervallo, più aggregata è l'immagine; per "cosa è successo stamattina" scegli poche ore.

## Mappa

La mappa occupa tutta la pagina. Controlli standard (pan, zoom, attivazione livelli). La sovrapposizione della mappa di calore è sopra la base della mappa.

Una **legenda** in un angolo spiega la scala di colore della modalità attiva — da bassa ad alta densità.

## Flussi di lavoro tipici

- **Trova domanda insoddisfatta** — Fonte = Scansioni, Modalità = Mappa di calore → individua un'area calda → cambia Fonte in Inizi corse → se la stessa area è fredda = domanda insoddisfatta → considera riequilibrare o espandere in quell'area
- **Pianifica una nuova zona** — Fonte = Fine corse, Modalità = Esagoni → cerca concentrazioni naturali di discesa fuori dalle tue zone attuali → proponi a Operazioni
- **Esamina un punto caldo** — Modalità = Cluster → zooma nell'area calda → i punti singoli mostrano latitudine/longitudine esatti; incrocia con [Ricerca veicoli](vehicles.md) per dettagli a livello di corsa
- **Confronta finestre temporali** — carica Scansioni mattutine → screenshot → passa a Scansioni serali → confronta gli screenshot affiancati (il Cruscotto non supporta ancora la vista a doppio periodo; serve esportazione manuale)
- **Audit copertura** — Fonte = Scansioni ultima settimana → cerca punti caldi lontani da qualsiasi zona pianificata → considera di ridisegnare i confini delle zone

## Consigli

- **Scansioni ≠ corse** — molte scansioni non si convertono (il rider non trova veicoli, vede il prezzo, abbandona). Il divario tra Scansioni e Inizi corse è il segnale più utile
- **La modalità mappa di calore nasconde la scala** — i colori sono relativi alla mappa visibile; lo zoom cambia l'immagine. La modalità Esagoni è più onesta a zoom fissi
- **Inizia con pochi punti, finisci con molti** — esplorare con 1k punti è veloce; aumenta a 100k solo quando sai cosa stai cercando
- **Modalità griglia per la pianificazione** — se le tue zone sono più o meno rettangolari, Griglia si allinea e semplifica i calcoli; altrimenti preferisci Esagoni
- **Daltonici?** — prova gli schemi alternativi; i dati sottostanti sono gli stessi
- **La mappa non si aggiorna automaticamente al cambio data** — a seconda della configurazione potresti dover cliccare di nuovo su _Applica_ / _Aggiorna_ dopo aver cambiato l'intervallo di date
- **La legenda è importante** — ciò che sembra "rosso e drammatico" potrebbe essere un conteggio assoluto basso; dai sempre un'occhiata alla legenda prima di interpretare
