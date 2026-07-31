# Pagina Veicolo — Controlli, Biglietti, Guasti e Avvisi

La pagina del veicolo (`/vehicle/:id`) è la superficie di lavoro per l'operatore sul campo per un singolo veicolo: telemetria in tempo reale in alto, pulsanti di azione al centro e tre code di elementi da gestire. Vi si accede toccando un marcatore o una riga di elenco sulla [mappa della flotta](fleet-map.md), scansionando un codice QR o toccando una riga in [modalità batch](../operations/batch-mode.md).

## Cosa mostra la pagina per quale tipo di veicolo

Quando la pagina si apre carica il veicolo, poi il suo modello:

- **Monopattini e biciclette** ricevono la pagina di controllo completa descritta qui.
- **Auto** ricevono una pagina solo di stato senza controlli remoti.

Se le informazioni sul modello non possono essere caricate, la pagina si apre comunque — ricade sul layout del monopattino invece di lasciarti su un indicatore di caricamento. Se il veicolo stesso non può essere caricato, viene mostrata una schermata di errore con un pulsante Indietro.

## Schede

Quattro schede con un indicatore scorrevole:

| Scheda       | Contenuti                                       |
| ------------ | ----------------------------------------------- |
| **Monopattino** | Telemetria in tempo reale e pulsanti di azione |
| **Biglietti** | Biglietti di supporto aperti segnalati dai rider |
| **Guasti**   | Errori segnalati dal tracciatore                |
| **Avvisi**   | Avvisi segnalati dal tracciatore                |

## Scheda Monopattino — telemetria

In alto si trova un badge di blocco (**verde** = bloccato, **ambra** = sbloccato) e il badge di stato del veicolo, poi queste righe:

| Riga                | Come leggerla                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **QR / etichetta**  | Il codice sull'adesivo del veicolo                                                       |
| **Rete**            | Qualità del segnale mobile come frazione su 36 quando online, o tempo dall'ultimo segnale quando offline |
| **Batteria**        | Percentuale batteria del veicolo — rosso al 10% o meno, arancione al 20% o meno, ambra al 40% o meno, verde sopra il 40% |
| **Tensione tracciatore** | Batteria del tracciatore, in volt con due decimali — rosso sotto 3,6 V, verde a 3,6 V e oltre |
| **GPS**             | **Fix** o **No Fix**                                                                     |

La **tensione del tracciatore** è il valore che gli operatori interpretano più spesso in modo errato. È la batteria del tracciatore, non quella del veicolo: una lettura rossa indica che il tracciatore sta per spegnersi anche se la batteria principale sembra perfettamente sana. Segnala quei veicoli per il ritiro prima che smettano completamente di segnalare.

## Scheda Monopattino — i cinque pulsanti di azione

Ogni azione richiede conferma prima di essere inviata e fornisce una vibrazione tattile quando parte.

### 1. Stato

Apre un pannello con nove stati, ciascuno con un'icona e una breve descrizione, e un segno di spunta su quello corrente:

- Disponibile
- Scarico
- In carica
- Richiede indagine
- Manutenzione
- Non pronto
- Trasporto
- Magazzino
- Rubato

Scegliere **In carica** avvia anche l'intera sequenza di [battery swap](../operations/battery-swap.md) — aspettati che il veicolo si sblocchi, attenda e si richiuda. Non è solo un cambio di etichetta.

### 2. Modalità corsa (blocca / sblocca)

- **Sbloccare** invia il comando di sblocco, alza il limite di velocità a 25 km/h, accende il motore e avvia il tracciamento della corsa.
- **Bloccare** ferma il tracciamento, spegne il motore, ripristina il limite di velocità parcheggiata a 6 km/h e blocca il veicolo.

Conferma sempre che il badge di blocco diventi verde prima di allontanarti.

### 3. Beep

Emette un singolo beep localizzatore, con notifica di successo o errore. Usalo per individuare un veicolo vicino ma fuori vista — oppure usa [Find Scooter](../operations/finder.md) per una ricerca guidata.

### 4. Battery Swap

Avvia la sequenza temporizzata di swap e mostra il conto alla rovescia sul pulsante. Vedi [Battery swap](../operations/battery-swap.md) per il flusso completo.

### 5. Comandi

Apre un pannello di comandi supportati dal tracciatore di quel veicolo, raggruppati per categoria. Alcuni comandi richiedono un valore da inserire prima dell'invio.

## Scheda Biglietti

Elenca i biglietti di supporto aperti che i rider hanno segnalato contro questo veicolo. Ogni riga mostra:

- Un'icona a forma di fulmine per un problema elettrico, o una chiave inglese per altro
- Un badge di stato viola
- La descrizione, limitata a due righe
- Il tipo di reclamo
- Da quanto tempo è stato creato

Le righe con priorità critica e alta mostrano anche un badge di priorità rosso — gestiscile prima.

Toccando una riga si apre il biglietto in un modale, lo stesso usato dal cassetto biglietti della mappa della flotta.

**Risolvere tutto** chiede conferma, poi chiude tutti i biglietti aperti sul veicolo. I biglietti chiusi scompaiono immediatamente dalla lista e ricevi un messaggio "X biglietto/i risolto/i" o, se alcuni non si sono potuti chiudere, "Risolti X, falliti Y". Il pulsante è disabilitato durante la chiusura e quando non ci sono biglietti aperti.

Quando la scheda è vuota mostra "Nessun biglietto aperto per questo veicolo".

## Scheda Guasti

I guasti sono eventi di errore segnalati direttamente dal tracciatore. Rumore e voci senza errore sono filtrati, e il guasto più recente appare per primo.

- I **guasti attivi** — non ancora processati e ancora nel periodo di allarme — hanno bordo e sfondo rossi.
- I **guasti processati** diventano grigi e ricevono un badge **Risolt**o.

Ogni riga mostra un'icona per il tipo di guasto (un triangolo di avviso generico quando il tipo non ha un'icona specifica), il titolo del guasto e da quanto tempo è avvenuto.

**Pulisci tutto** chiede conferma, quindi segna ogni guasto attivo come elaborato uno alla volta, con una breve pausa tra di essi — cancellare una lunga lista non è istantaneo, quindi attendi un momento. La lista si aggiorna man mano, e una volta che non rimane nulla da elaborare, il veicolo scompare dalla lista degli allarmi dell'app. Riceverai "X guasto/i cancellato/i" o "Cancellati X, falliti Y". Il pulsante è disabilitato quando non ci sono guasti attivi.

Stato vuoto: "Nessun guasto registrato".

## Scheda Avvisi

Strutturalmente identica e con lo stesso comportamento di **Pulisci tutto** dei Guasti, ma per gli avvisi invece che per gli errori. Stato vuoto: "Nessun avviso registrato".

La distinzione pratica:

- **Guasti** — errori segnalati dal tracciatore
- **Avvisi** — avvertimenti segnalati dal tracciatore
- **Biglietti** — reclami presentati dai rider

Tutte e tre sono code separate; cancellarne una non cancella le altre.

## Problemi comuni

| Sintomo                                          | Cosa significa                                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Un pulsante d'azione non fa nulla o è disabilitato | Un'altra azione è ancora in corso — attendi la sua notifica                       |
| Una scheda è vuota                               | Non ci sono elementi aperti per questo veicolo; un guasto mostra un errore invece di uno stato vuoto |
| Nessun controllo remoto disponibile               | Il veicolo è un'auto, che ha solo la pagina di stato                              |
| **Network** mostra un orario invece di una frazione | Il tracciatore è offline e stai vedendo il tempo dall'ultimo segnale             |
| **Pulisci tutto** sembra bloccato                 | Elabora i guasti uno alla volta intenzionalmente; lascia che finisca              |
| Un guasto cancellato ritorna attivo                | Il tracciatore lo ha segnalato di nuovo nella finestra degli allarmi — il problema sottostante è ancora presente |

## Consigli

- **Analizza la telemetria dall'alto verso il basso** prima di toccare un controllo: blocco badge, rete, batteria, tensione del tracciatore, il GPS ti dice in cinque secondi se il veicolo è utilizzabile o da ritirare.
- **Risolvere tutto è per veicolo**, quindi è sicuro da usare una volta che hai fisicamente risolto ciò che descrivono i biglietti.
- **Cancella i guasti solo dopo la riparazione**, non prima — un guasto che riappare è una prova utile.
- **Una tensione rossa del tracciatore più una batteria sana** è la classica firma del "veicolo che sta per sparire dalla mappa".
