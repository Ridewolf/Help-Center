# Set di icone

La pagina Set di icone (`/settings/icon-sets`) è la **libreria di icone mappa** che l'app mobile Ridewolf rider usa per visualizzare i veicoli. Ogni set è associato a un tipo di veicolo (e-scooter, e-bike, cargo e-bike, e-moped, e-car, e-boat) e fornisce tre categorie di icone SVG: **Selezionate**, **Non selezionate** e **Sconto**.

Questa è un'infrastruttura di contenuti: gli operatori caricano qui gli SVG, l'app rider sceglie l'icona giusta in base al tipo di veicolo, al livello di batteria e se il rider ha toccato il veicolo sulla mappa. Non è necessario rilasciare una nuova versione dell'app per cambiare le immagini.

Insieme a [FAQ Sets](faq-sets.md) e [Quick Guides](quick-guides.md), questo è lo strato di contenuti del Cruscotto.

Permesso richiesto: **Set di icone** (verifica con l'amministratore).

## Dove appare per il rider

Sulla mappa dell'app rider, ogni puntina veicolo usa un'icona dal set attivo per il suo tipo di veicolo:

- Le icone **Non selezionate** sono usate per le puntine che il rider non ha toccato — sei livelli di batteria (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`) così la puntina riflette la carica attuale
- Le icone **Selezionate** sostituiscono la puntina una volta che il rider la tocca — stessi sei livelli di batteria, stile diverso
- Le icone **Sconto** (5%, 15%, 25%, 35%, 45%, 55% di default) si sovrappongono alla puntina quando il veicolo ha un prezzo promozionale

Un set per tipo di veicolo può essere contrassegnato come **predefinito** — è quello che l'app carica quando non è configurato altro.

## Filtri

| Filtro          | Tipo     | Note                                                                                                              |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| Cerca           | Testo    | Casella di ricerca nell'intestazione — cerca titolo / slug                                                        |
| Tipo di veicolo | Dropdown | `E-scooter` / `E-bike` / `Cargo e-bike` / `E-moped` / `E-car` / `E-boat` (o `Tutti`)                              |
| Copertura stato | Dropdown | Filtra in base a cosa è compilato: `Solo selezionati` / `Solo non selezionati` / `Solo sconti` / `Copertura completa` (o `Tutti`) |
| Stato           | Dropdown | `Attivo` / `Bozza` / `Incompleto` / `Archiviato` (o `Tutti`)                                                      |
| Tag             | Combobox | Filtro tag libero (input mostrato ma attualmente disabilitato — presto disponibile)                               |

**Pulisci tutto** resetta tutti i filtri.

## Colonne

| Colonna                | Contenuto                                                                 |
| ---------------------- | ------------------------------------------------------------------------- |
| **Set**                | Icona del pacchetto + titolo; la riga secondaria mostra lo slug           |
| **Tipo di veicolo**    | Pillola (E-scooter, E-bike, ecc.)                                         |
| **Icone selezionate**  | Copertura come `6/6` (quanti livelli di batteria sono caricati)            |
| **Icone non selezionate** | Stessa copertura `n/6` per le varianti non selezionate                  |
| **Icone sconto**       | Prime 3 percentuali di sconto come chip (`5%`, `15%`, `25%`), overflow `+N` |
| **Tag**                | Prime 2 chip tag con overflow `+N`                                        |
| **Aggiornato**         | Data dell'ultimo aggiornamento                                           |
| **Stato**              | `Attivo` / `Bozza` / `Incompleto` / `Archiviato`                         |

`Incompleto` significa che al set mancano icone per una delle tre categorie — l'app rider ricade sul predefinito per quel tipo di veicolo finché non completi il caricamento.

Clicca una riga per aprire il **dialogo Dettagli** — un'anteprima visiva di ogni icona nel set. Clicca il menu a tre puntini per le azioni.

## Azioni sulla riga

| Azione             | Cosa fa                                                                          |
| ------------------ | --------------------------------------------------------------------------------- |
| **Visualizza dettagli** | Apre il dialogo dettagli con anteprime di ogni SVG caricato                    |
| **Modifica**           | Apre il modulo a schede multiple (Dettagli / Selezionate / Non selezionate / Sconti / Anteprima) |
| **Duplica**            | Clona il set come Bozza                                                          |
| **Imposta come predefinito** | Segna questo set come predefinito per il suo tipo di veicolo — l'app rider lo caricherà |
| **Scarica**            | Scarica il set come ZIP di tutti gli SVG                                         |
| **Archivia**           | Sposta in `Archiviato` — conservato per la cronologia, non usato dall'app        |
| **Elimina**            | Rimuove definitivamente                                                          |

I pulsanti **Importa** (ZIP / JSON) e **Esporta** (ZIP / JSON) nella barra superiore funzionano in blocco.

## Modulo Crea / Modifica

Il modulo è un dialogo a cinque schede:

1. **Dettagli** — titolo (obbligatorio), slug (derivato automaticamente), tipo di veicolo (obbligatorio), tag, stato
2. **Selezionate** — carica 6 SVG, uno per ogni livello di batteria (`bat10` → `bat100`)
3. **Non selezionate** — stessi 6 slot, per lo stato mappa non selezionato
4. **Sconti** — un SVG per ogni percentuale di sconto. I preset predefiniti sono `5, 15, 25, 35, 45, 55` ma puoi aggiungere/rimuovere righe
5. **Anteprima** — controllo visivo di coerenza dell'intero set prima del salvataggio

Un set con slot vuoti in una qualsiasi scheda viene salvato come `Incompleto`.

## Flussi di lavoro tipici

- **Aggiorna i pin degli e-scooter per un rebranding** — Duplica il predefinito attuale → carica nuovi SVG in tutte e tre le schede → salva come Bozza → anteprima → Imposta come predefinito → l'app Rider lo rileva al prossimo aggiornamento
- **Esegui un test A/B sulle icone** — mantieni il set vecchio Attivo e non predefinito, crea un nuovo set come Attivo + predefinito per un tipo di veicolo → ripristina impostando il vecchio come predefinito se necessario
- **Grafica sconto festivo** — apri il set attivo → Modifica → scheda Sconti → carica SVG a tema per le percentuali attualmente in uso → salva
- **Importazione massiva di uno ZIP di un designer** — in alto a destra _Importa_ → ZIP → conferma la mappatura dei file → rivedi in Anteprima → Attiva

## Suggerimenti

- **Un predefinito per tipo di veicolo** — impostare un nuovo predefinito disattiva automaticamente quello precedente. Il badge Stato non deve essere `Attivo` perché un set sia predefinito, ma dovrebbe esserlo
- **I livelli di batteria sono fissi** — `bat10/25/40/55/90/100` sono gli unici intervalli che l'app riconosce; l'app sceglie quello più vicino in base alla carica attuale del veicolo
- **Solo SVG** — i caricamenti richiedono file SVG; i PNG non si ridimensionano correttamente sugli schermi retina
- **`Incomplete` è un utile salvagente** — indica che l'app Rider ricade sul predefinito, così non invierai mai accidentalmente un set caricato a metà
- **Archivia prima di eliminare** — i set archiviati restano ricercabili nel caso volessi ripristinarli
