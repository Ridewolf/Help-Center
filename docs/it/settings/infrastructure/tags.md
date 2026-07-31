# Tag

La pagina Tag (`/settings/tags`) è la **libreria di etichette condivise** per la tua azienda. Un tag è un distintivo nominato che puoi assegnare a veicoli, clienti, operatori, corse e pagamenti per filtrarli, raggrupparli e generarne report. L'elenco qui è la fonte unica di verità: quando aggiungi un tag, diventa disponibile ovunque sia supportato.

Permesso richiesto: **Tag** (`d1e2f3`). I sotto-permessi regolano la creazione, modifica ed eliminazione.

## Dove si usano i tag

I tag sono un **pool globale unico** — non esiste un ambito per entità. Lo stesso tag può essere assegnato a diversi tipi di record:

- **[Veicoli](../../operations/fleet/vehicles.md)** — es. "Necessita pulizia", "Manutenzione prioritaria", "Flotta di test"
- **[Clienti](../../operations/customers/clients.md)** — es. "VIP", "Aziendale", "Lista nera"
- **[Operatori](../access/operators.md)** — es. "Turno notte", "Formatore", "Reperibilità"
- **Corse** — taggati per revisione, contestazione o monitoraggio campagne
- **Pagamenti** — taggati per riconciliazione o follow-up

Ogni record può avere più tag; il filtro per tag è disponibile in ogni elenco che li supporta.

## Filtri

| Filtro | Tipo | Note                                     |
| ------ | ---- | ----------------------------------------- |
| Cerca  | Testo | Cerca nel nome del tag (etichetta) e nella descrizione |

L'elenco predefinito mostra 50 righe per pagina e azzera i filtri con l'azione **Pulisci**.

## Colonne

| Colonna         | Ordinabile? | Contenuto                                                      |
| --------------- | ----------- | -------------------------------------------------------------- |
| **Nome tag**    | SÌ          | Icona del tag + etichetta; link alla pagina di dettaglio del tag |
| **Stato**       | SÌ          | `Pubblico` o `Privato` (vedi sotto)                            |
| **Descrizione** | NO          | Descrizione testuale libera; segnaposto "Nessuna descrizione" se vuoto |
| **Date**        | SÌ          | Data di creazione in alto, data di aggiornamento sotto         |

L'intestazione della pagina espone anche **Aggiornamento automatico**, **+ Crea**, **Importa** (prossimamente) e **Esporta** (download JSON — pagina corrente, tutti i filtri o pagine specifiche).

## Azioni sulla riga

Un menu a tre puntini per ogni riga. Le azioni disponibili dipendono dai permessi:

| Azione           | Permesso  | Cosa fa                                                                                      |
| ---------------- | --------- | -------------------------------------------------------------------------------------------- |
| **Visualizza dettagli** | —         | Apre la pagina di dettaglio del tag                                                          |
| **Modifica**     | `edit`    | Apre il modulo di modifica (etichetta, stato, descrizione)                                   |
| **Elimina**      | `delete`  | Rimuove il tag dall'azienda. **I record precedentemente taggati perdono il legame** — usalo con cautela |

L'eliminazione richiede conferma con una pressione di 3 secondi per evitare incidenti.

## Pagina di dettaglio

Cliccare su una riga (o _Visualizza dettagli_) apre la pagina di dettaglio del tag con:

- **Informazioni sul tag** — etichetta, stato, descrizione (renderizzata con supporto Markdown)
- **Metadati** — ID interno, timestamp di creazione / aggiornamento

Modifica ed Elimina sono disponibili anche nelle azioni dell'intestazione della pagina di dettaglio.

## Modulo Crea / Modifica

Il **modulo tag** (`+ Crea` o _Modifica_) ha tre campi:

- **Etichetta** (obbligatoria) — il nome visibile del tag; deve essere sufficientemente unico per riconoscerlo a colpo d'occhio
- **Stato** (obbligatorio) — `Pubblico` o `Privato`
  - **Pubblico** — visibile e selezionabile da tutti gli operatori dell'azienda
  - **Privato** — visibilità limitata; utile per flussi di lavoro di tagging interni o amministrativi
- **Descrizione** (opzionale) — testo libero che spiega quando usare il tag; mostrato nella pagina di dettaglio

Un'**anteprima** live nella barra laterale mostra come appariranno etichetta e descrizione mentre digiti. Salva valida che l'etichetta non sia vuota, scrive nel pool tag aziendale e invalida la cache condivisa dei tag così che le altre pagine rifacciano il fetch al prossimo caricamento.

## Flussi di lavoro tipici

- **Aggiungere una nuova etichetta** — `+ Crea` → digita etichetta → scegli Pubblico/Privato → opzionalmente descrivi quando usarla → Salva → il tag è immediatamente disponibile nei filtri e moduli di modifica di Veicoli / Clienti / Operatori
- **Rinominare un tag** — Modifica → cambia Etichetta → Salva (ogni record già taggato mantiene il legame; il nuovo nome appare ovunque)
- **Ritirare un tag** — Elimina dal menu riga, o prima imposta Stato su Privato per nasconderlo da nuovi tag mantenendo i legami storici (poi lo riattaccheresti solo tramite modifica diretta)
- **Pulire duplicati** — cerca nell'elenco per individuare quasi-duplicati ("vip" vs "VIP") → modifica uno per unificare il nome, poi elimina l'altro (nota: i record sotto il tag eliminato perderanno il legame — ritaggali prima)
- **Esportazione in blocco** — Esporta → Tutti i filtri → download JSON per condivisione con il team o backup della tassonomia

## Consigli

- **I tag sono globali** — non esiste uno spazio separato per "tag clienti" vs "tag veicoli". Nominali in modo chiaro affinché un tag come "VIP" abbia senso su qualunque entità sia assegnato, oppure usa prefissi ("cliente:vip", "veicolo:manutenzione") per mantenere ordine
- **Pubblico è il default** — lascialo Pubblico a meno che non ci sia un motivo specifico per limitare la visibilità
- **Eliminare è distruttivo** — ogni record con quel tag perde immediatamente il legame; non esiste un'eliminazione soft. Preferisci rinominare o passare a Privato se non sei sicuro
- **La descrizione supporta Markdown** nella vista dettaglio — usala per documentare chi dovrebbe applicare il tag e quando
- **La cache condivisa si invalida a ogni salvataggio / eliminazione** — le altre schede aperte rileveranno le modifiche alla prossima navigazione, senza ricaricare completamente
- **I nomi dei tag appaiono nei filtri contestuali di Ridewolf ovunque** — mantienili brevi e adatti a minuscole per la migliore UX in tabelle dense
