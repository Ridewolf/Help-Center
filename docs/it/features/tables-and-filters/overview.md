# Tabelle e filtri

Quasi tutte le pagine elenco nel Cruscotto (Veicoli, Corse, Clienti, Pagamenti, Biglietti di Supporto, Prove di parcheggio, Conversazioni, Analisi, Operatori, ecc.) condividono la stessa struttura. Una volta compreso il modello, ogni pagina elenco funziona allo stesso modo.

## Struttura di una pagina elenco

Dall'alto verso il basso:

1. **Intestazione pagina** — titolo, azioni a livello di pagina (es. _Crea_, _Esporta_)
2. **Barra di ricerca** — ricerca full-text su più campi
3. **Riga filtri** — menu a discesa e pillole per restringere i risultati
4. **Pillole filtri attivi** — pillole rimovibili che mostrano i filtri attualmente applicati
5. **Barra azioni di massa** — appare quando una o più righe sono selezionate
6. **Tabella** — colonne ordinabili, azioni riga a destra
7. **Paginazione** — in basso a destra

## Ricerca

La barra di ricerca esegue la ricerca sui campi più rilevanti per quella pagina (es. etichetta, ID, nome del proprietario).

- **Digita per cercare** — i risultati si filtrano mentre digiti, con un breve debounce per non sovraccaricare il server
- **Pulisci** — clicca la × nell'input o premi `Esc`
- La ricerca viene eseguita **server-side** sull'intero dataset, non solo sulla pagina corrente

## Filtri

I filtri restringono il set di risultati senza ricerca testuale. Ogni filtro è un menu a discesa (selezione singola o multipla a seconda del campo).

- **Applica al cambiamento** — i filtri si applicano istantaneamente, senza pulsante Applica
- **Più filtri si combinano con AND** — più filtri aggiungi, più i risultati si restringono
- Le **pillole filtri attivi** appaiono sopra la tabella; clicca la × su una pillola per rimuovere solo quel filtro
- **Pulisci tutto** — quando sono applicati molti filtri, accanto alle pillole appare un pulsante _Pulisci tutto_

Tipi comuni di filtro:

| Tipo         | Comportamento                                                |
| ------------ | ------------------------------------------------------------ |
| Stato        | Menu a discesa a selezione singola                           |
| Tipo / Modello | Menu a discesa a selezione singola                         |
| Tag          | Selezione multipla con pillole all'interno del menu a discesa |
| Intervallo date | Widget calendario (da / a)                                 |
| Intervallo numerico | Input numerici da / a (es. batteria 0–30%)              |
| Ricerca per ID | Testo libero dentro una pillola filtro (separata dalla ricerca principale) |

## Ordinamento

- **Clicca l'intestazione di una colonna** — ordina in modo crescente
- **Clicca di nuovo** — ordina in modo decrescente
- **Clicca una terza volta** — rimuove l'ordinamento (torna all'ordine predefinito)
- Un **icona freccia** (↑ / ↓) appare accanto al nome della colonna quando è l'ordinamento attivo

Non tutte le colonne sono ordinabili. Le colonne ordinabili mostrano uno stato hover sottile sull'intestazione; quelle non ordinabili no.

## Paginazione

In basso a destra della tabella:

- **Numeri di pagina** — clicca un numero per saltare
- **Freccie Precedente / Successivo** ai lati
- **Selettore dimensione pagina** — menu a discesa (tipicamente 10 / 20 / 50 / 100 righe per pagina)

La paginazione è server-side. I tuoi filtri e la ricerca si applicano all'**intero dataset**, non solo alla pagina visualizzata — la pagina 3 dei risultati filtrati è comunque filtrata.

## Azioni sulla riga

Ogni riga ha un **menu a tre puntini** all'estrema destra. Il menu apre un dropdown con azioni a livello di riga:

- **Visualizza** — apre la pagina dettaglio
- **Modifica** — apre il modulo di modifica
- **Elimina** — rimuove il record (con dialogo di conferma)
- **Azioni specifiche della pagina** — es. _Invia push_ su clienti, _Sblocca_ su veicoli, _Rimborsa_ su pagamenti, _Assegna_ su biglietti

Le azioni visibili dipendono dalle tue **autorizzazioni** — le azioni per cui non hai permessi sono nascoste.

## Selezione multipla e azioni di massa

Nelle pagine che lo supportano (Clienti, Veicoli, ecc.):

1. **Seleziona righe** — clicca la casella a sinistra di ogni riga
2. **Seleziona tutto in questa pagina** — clicca la casella nell'intestazione della colonna
3. Appare una **barra azioni di massa** in alto che mostra il conteggio selezionato e le azioni di massa disponibili
4. **Scegli un'azione** — si applica a tutte le righe selezionate
5. **Pulisci selezione** — × sulla barra azioni di massa, o deseleziona la casella nell'intestazione

Azioni di massa comuni:

- Aggiungi o rimuovi tag
- Invia una notifica push
- Applica una multa o ricarica saldo (clienti)
- Cambia stato

## Stati vuoti e di caricamento

- **Caricamento** — appaiono righe scheletro brevemente mentre i dati si caricano
- **Nessun risultato** — un segnaposto amichevole ("Nessun risultato corrispondente") con un pulsante _Pulisci filtri_ quando i filtri sono attivi
- **Errore di rete** — uno stato di errore con un pulsante _Riprova_ (più comune con connessioni instabili)

## Consigli

- **Aspetta il debounce** — dopo aver digitato nella ricerca, aspetta una frazione di secondo prima di cliccare — il server risponde una volta quando smetti di digitare
- **Condividi viste filtrate** — ricerca, filtri, ordinamento e pagina sono riflessi nell'URL. Copia l'URL e invialo a un collega; vedrà esattamente la stessa vista
- **Indietro/avanti del browser** funziona come previsto — torna indietro attraverso le modifiche ai filtri
- **Combina ricerca + filtri** — la ricerca è un livello di testo libero sopra i filtri. Usa i filtri per restringere per stato/tipo, poi cerca per nome all'interno di quel sottoinsieme
- **Aumenta la dimensione pagina** a 100 quando vuoi scorrere molti record visivamente invece di cliccare tra le pagine
- **Le autorizzazioni sono il filtro silenzioso** — se un collega vede righe che tu non vedi, è quasi sempre una differenza di autorizzazioni, non un bug
