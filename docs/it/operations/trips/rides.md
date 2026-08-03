# Corse — Elenco

Una **corsa** è un singolo viaggio effettuato da un cliente su uno dei tuoi veicoli. L'elenco Corse (`/rides`) è il registro principale di ogni viaggio — passato, attuale e futuro — su tutta la flotta.

Apri una riga per vedere la [pagina di dettaglio della corsa](ride-detail.md) con percorso, cronologia e tutte le azioni.

Permesso richiesto: **Corse** (`i1j2k3`).

## Come appaiono le corse qui

Non crei corse nel cruscotto — hanno origine dal lato cliente:

1. Un cliente **sblocca un veicolo** nell'app mobile (Ridewolf rider app)
2. Il backend apre un nuovo record di corsa collegato a quel veicolo e cliente
3. La corsa appare immediatamente in questo elenco con stato **Attivo**
4. Quando il cliente **blocca / parcheggia** il veicolo, il backend chiude la corsa; lo stato cambia in **Completato** e viene calcolato il riepilogo finale (distanza, durata, prezzo)
5. Altri stati terminali (`Annullato`, ecc.) derivano da regole di sistema o azioni dell'operatore

Aggiorna o ricarica la pagina per ottenere l'istantanea più recente — le corse attive si aggiornano mentre il cliente si muove.

## Ordine predefinito

Per impostazione predefinita il backend restituisce **prima le corse attive**, poi le corse completate in ordine cronologico inverso (le più recenti prima). Applica un ordinamento di colonna per sovrascrivere questo ordine predefinito.

## Filtri

| Filtro     | Tipo         | Note                                                                |
| ---------- | ------------ | -------------------------------------------------------------------- |
| Cerca      | Testo        | Cerca nome cliente, etichetta veicolo, ID corsa                      |
| Intervallo | Calendario   | Selettore da / a; predefinito "tutto il tempo"                     |
| Stato      | Menu a tendina | `Attivo`, `Completato`, `Annullato`, ecc.                          |
| Valutazione| Menu a tendina | Filtra per valutazione a stelle lasciata dal cliente (1–5, _Nessuna valutazione_) |
| Tag        | Selezione multipla | Filtra per tag della corsa (ereditati dal veicolo — vedi Colonne sotto) |

Tutti i filtri si combinano con AND. I filtri appaiono sopra la tabella; l'URL riflette lo stato attuale del filtro.

## Colonne

| Colonna | Ordinabile? | Contenuto                                                            |
| ------- | ----------- | ------------------------------------------------------------------- |
| Cliente | —           | Avatar, nome, link al profilo del cliente                           |
| Veicolo | —           | Etichetta, modello, link al veicolo                                 |
| Tariffa | —           | Nome della tariffa applicata alla corsa                             |
| Statistiche | —        | Badge rapidi: distanza, durata, costo totale                        |
| Tag     | —           | Tag ereditati dal **veicolo** al momento dell'inizio della corsa    |
| Stato   | ✓           | Pillola di stato (Attivo, Completato, Annullato, ecc.)             |
| Valutazione | ✓        | Valutazione a stelle lasciata dal cliente (o "–" se nessuna)      |
| Creata  | ✓           | Data e ora di inizio corsa; ordinamento predefinito = più recente prima |

Ordina cliccando su un'intestazione ordinabile. L'ordinamento scelto fa parte dell'URL e **sovrascrive** l'ordine predefinito descritto sopra — non esiste un terzo clic per "ripristina predefinito", ma puoi cancellare l'ordinamento modificando l'URL o aggiornando senza parametro di ordinamento.

> **I tag sono ereditati dal veicolo.** Le corse non hanno un proprio editor di tag — i tag di una corsa sono un'istantanea dei tag presenti sul veicolo quando la corsa è iniziata. Modifica i tag del veicolo in seguito e le corse esistenti manterranno la loro istantanea originale; solo le nuove corse acquisiranno i nuovi tag.

## Azioni sulla riga

Ogni riga ha un **menu a tre puntini** all'estrema destra. Le azioni disponibili dipendono dallo stato della corsa e dai tuoi permessi:

| Azione       | Permesso       | Quando abilitata                                               |
| ------------ | -------------- | ------------------------------------------------------------- |
| **Pausa**    | `pause-unpause`| La corsa è **Attiva** (non già in pausa, completata, annullata) |
| **Riprendi** | `pause-unpause`| La corsa è **In pausa**                                        |
| **Termina corsa** | `end-ride` | La corsa **non** è Completata o Annullata                     |

Le azioni per cui non hai permesso sono nascoste. Le azioni disabilitate (es. Termina su una corsa già completata) appaiono in grigio così puoi comunque vedere cosa è possibile nello stato corretto.

L'insieme completo di azioni — rimborso, visualizza percorso sulla mappa, invia notifica, archivia — si trova nella **pagina di dettaglio della corsa**. Clicca sulla riga per accedervi.

## Azioni della pagina

In alto a destra nella pagina dell'elenco:

- **Esporta** — scarica l'elenco attualmente filtrato come file (filtri e ordinamento rispettati)

## Flussi di lavoro tipici sull'elenco

- **Guarda l'attività in tempo reale** — apri la pagina e resta su di essa; la parte superiore dell'elenco mostra le corse attive
- **Trova corse in una zona o intervallo temporale** — combina intervallo date + stato + tag
- **Individua anomalie** — filtra per `Stato = Annullato` o `Valutazione ≤ 2` e cerca schemi (stesso veicolo? stessa ora del giorno?)
- **Ferma rapidamente una corsa bloccata** — senza uscire dall'elenco, apri il menu della riga e _Termina corsa_ (richiede permesso)

## Suggerimenti

- **L'URL è condivisibile** — filtra l'elenco, copia l'URL, invialo a un collega — vedranno la stessa vista
- **I badge delle statistiche nell'elenco** sono un modo rapido per individuare corse insolitamente brevi o lunghe prima di cliccare
- **Non fidarti solo della valutazione** — apri la pagina di dettaglio per le corse con valutazione bassa; la valutazione è solo uno dei tanti segnali
- **I permessi variano per azienda** — alcuni operatori vedono solo le corse per i veicoli che gestiscono; se una corsa ti manca, verifica con un amministratore
