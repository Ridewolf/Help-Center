# Localizzazione

La pagina Localizzazione (`/settings/localization`) è il **banco di lavoro per le traduzioni** — una libreria di _Collezioni_ (gruppi di chiavi di traduzione correlate) che puoi modificare, importare, esportare e pubblicare. Ogni collezione ha uno spazio dei nomi (ad es. `ui`, `auth`, `rides`), una lingua base (sempre `en`), un set di lingue target e una lista di chiavi con valori per ogni lingua.

> _Nota_: questa pagina è attualmente un **prototipo solo front-end** — le collezioni sono caricate da `mockData.ts` e mantenute nello stato locale. _Salva_ e _Pubblica_ mostrano notifiche di conferma ma non esiste ancora un endpoint backend. La pagina è sicura da usare come specifica per l'API; nulla di ciò che fai qui viene salvato.

Permesso richiesto: non sono impostati `requiredPermissions` specifici sulla rotta — qualsiasi operatore autenticato può aprirla.

## Layout della pagina

Una singola riga di intestazione con il titolo della pagina, una casella di ricerca, un menu a discesa _Importa / Esporta_ e un pulsante _+ Crea collezione_ — poi una scheda Filtri e la tabella Collezioni.

Dati di riferimento (attualmente codificati in `Localization.vue`):

- Lingue: `en`, `ro`, `ru`, `de`, `fr`, `es` (base + 5 target)
- Spazi dei nomi: `ui`, `auth`, `rides`, `payments`, `marketing`
- Tag: `core`, `beta`, `promo`, `legacy`

## Filtri

Una scheda Filtri si trova sopra la tabella.

| Filtro    | Tipo           | Note                                                                          |
| --------- | -------------- | ---------------------------------------------------------------------------- |
| Lingua   | Menu a discesa | Filtra le collezioni che includono questa lingua. Default `ro`                |
| Spazio dei nomi | Menu a discesa | Uno degli spazi dei nomi (o vuoto per tutti)                                 |
| Stato    | Menu a discesa | `all`, `active`, `draft`, `archived`                                         |
| Tag      | Chip toggle    | Chip tag multi-selezione — una collezione deve avere _tutti_ i tag selezionati per passare |
| Ricerca  | Testo (toolbar) | Debounce 300 ms — corrisponde a nome, descrizione, spazio dei nomi            |

Un pulsante _Pulisci_ sulla scheda Filtri resetta tutti e quattro i filtri.

## Tabella Collezioni

| Colonna    | Ordinabile? | Contenuto                                                                                                            |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| Collezione | —           | Nome + descrizione di 1 riga                                                                                         |
| Spazio dei nomi | —       | Badge con la stringa dello spazio dei nomi                                                                            |
| Lingue    | —           | Badge per ogni lingua. La lingua base ha la variante primaria; i target sono secondari. Al passaggio mostra _base_ vs _target_ |
| Chiavi    | —           | Conteggio totale chiavi. Al passaggio mostra una suddivisione per flag (_mancanti_, _modificate_, _obsolete_)          |
| Stato     | —           | Badge — `active` / `draft` / `archived`                                                                               |
| Aggiornato| —           | Data relativa. Al passaggio mostra l'autore                                                                             |
| Azioni    | —           | Menu a tre puntini per riga                                                                                            |

Paginazione in fondo: _Precedente / Avanti_, conteggio totale e selettore per pagina (10 / 20 / 50).

### Azioni sulla riga

| Azione    | Cosa fa                                                                         |
| --------- | ------------------------------------------------------------------------------- |
| Visualizza| Apre il dialogo Collezione in modalità _visualizzazione_ sola lettura           |
| Modifica  | Apre il dialogo Collezione in modalità _modifica_                              |
| Duplica  | Clona la collezione con il suffisso " (Copy)" in cima alla lista               |
| Importa  | Apre il dialogo Collezione focalizzato sulla scheda _Importa / Esporta_ in modalità importazione |
| Esporta  | Notifica toast — segnaposto per scaricare la collezione nel formato scelto      |
| Archivia | Cambia lo stato in `archived` (la riga resta — filtra Stato per vedere quelle archiviate) |
| Elimina  | Rimuove la riga dalla lista locale                                              |

## Crea / Modifica / Visualizza — il dialogo Collezione

Si apre da + Crea o da una qualsiasi azione sulla riga. Quattro schede all'interno del dialogo.

### Scheda Panoramica

Modifica i metadati della collezione.

- _Nome_ (obbligatorio) — nome visualizzato (es. "Etichette UI").
- _Spazio dei nomi_ — selettore con input di ricerca.
- _Descrizione_ — breve descrizione.
- _Lingua base_ — sola lettura, sempre `en`.
- _Lingue target_ — chip attivabili tra le cinque opzioni non inglesi. La base + target insieme formano il set di colonne lingua nella scheda Chiavi.
- _Stato_ — `active` / `draft` / `archived`.
- _Tag_ — chip attivabili dalla lista tag.

### Scheda Chiavi

La griglia effettiva delle traduzioni.

- Toolbar: una casella di ricerca (corrisponde al nome chiave e a qualsiasi valore), un filtro stato (es. _Solo mancanti_), un selettore lingua (quale colonna target è evidenziata come focus di modifica).
- Azioni di massa quando sono selezionate chiavi: _Imposta stato_, _Pulisci valori_, _Esporta selezionate_, _Elimina_.
- Azioni per riga: duplica chiave, elimina chiave, copia da inglese (riempie il target corrente con il valore EN), valida segnaposto (controlla che elementi come `{{name}}` in EN siano preservati nel target).
- Ogni riga porta flag opzionali visualizzati come badge:

| Flag       | Significato                                                    |
| ---------- | -------------------------------------------------------------- |
| `new`      | Chiave aggiunta di recente — necessita revisione umana        |
| `changed`  | Valore EN modificato dall'ultima traduzione — le destinazioni potrebbero essere obsolete |
| `missing`  | Valore vuoto in almeno una lingua di destinazione             |
| `obsolete` | Chiave non più usata nel codice — sicuro da eliminare          |

- _Aggiungi chiave_ e _Trova & sostituisci_ aprono mini-dialog dedicati.
- Interruttore _Salvataggio automatico_ — se attivo, le modifiche a un valore vengono salvate immediatamente nello stato locale.

### Scheda Importa / Esporta

Importa:

- _Formato_ — JSON / CSV / XLSX.
- _Modalità_ — sostituisci valori esistenti / unisci / aggiungi.
- Interruttore _Mantieni chiavi sconosciute_ — se spento, le chiavi non presenti nel file importato vengono contrassegnate come `obsolete`.
- _Simula_ — esecuzione a secco che mostra cosa cambierebbe (nessuna scrittura).
- _Applica_ — conferma l'importazione. La barra di avanzamento è visibile durante l'esecuzione.

Esporta:

- _Formato_ — JSON / CSV / XLSX.
- _Ambito_ — tutte le chiavi / chiavi filtrate / chiavi selezionate.
- _Scarica_ — azione segnaposto (per ora notifica toast).

### Scheda Pubblica

- Un blocco riepilogativo: _N chiavi totali / M modificate / K mancanti_.
- Una lista di chiavi modificate con valori prima / dopo.
- Una lista di avvisi (es. discrepanza segnaposto, destinazione mancante).
- _Salva bozza_ — salva la copia di lavoro come bozza (`status = draft`).
- _Pubblica_ — promuove la bozza a `active` e mostra una notifica toast.

## Barra degli strumenti superiore — menu Importa / Esporta

Due scorciatoie globali nell'intestazione della pagina (separate dalle azioni per collezione):

- _Importa collezioni_ — apre il dialog di importazione a livello di pagina (importazione massiva di più collezioni contemporaneamente).
- _Esporta tutto_ — scorciatoia per esportare tutte le collezioni in un unico pacchetto (per ora notifica toast).

## Modifiche non salvate & protezione navigazione

Esiste un flag globale "modifiche non salvate" (`hasUnsavedGlobal`) — se attivo, appare un footer fisso con _Scarta_ / _Salva_. La pagina installa anche una guardia `router.beforeEach`: tentare di navigare via con modifiche non salvate attiva un dialog nativo di conferma del browser.

## Flussi di lavoro

- **Traduci una nuova chiave in rumeno** — Seleziona la collezione dalla tabella → Modifica → scheda Chiavi → imposta il selettore lingua su `ro` → trova la chiave (o _Aggiungi chiave_) → inserisci il valore → _Salva_ (o usa Salvataggio automatico).
- **Verifica cosa manca in francese** — Modifica una collezione → scheda Chiavi → filtro stato _Solo mancanti_ → lingua _fr_. Usa _Copia da English_ come rapido fallback, o _Valida segnaposto_ prima di pubblicare.
- **Aggiornamento massivo da un XLSX** — Modifica collezione → scheda Importa / Esporta → scegli XLSX, modalità _Unisci_, _Simula_ prima → rivedi le differenze → _Applica_.
- **Promuovi le stringhe bozza in produzione** — Modifica collezione → scheda Pubblica → conferma la lista chiavi modificate, correggi eventuali avvisi → _Pubblica_.
- **Crea una variante per un nuovo mercato** — Duplica la collezione → rinomina → aggiungi la nuova lingua a _Lingue di destinazione_ → traduci.
- **Archivia un set deprecato** — Menu riga → Archivia. La collezione resta nella tabella ma passa allo stato `archived`; filtra per Stato per trovarla in seguito.

## Suggerimenti

- **Solo front-end per ora.** Nulla qui raggiunge ancora il backend — `Salva`, `Pubblica`, `Esporta`, `Elimina`, `Archivia` sono tutte mutazioni dello stato locale + notifiche toast. Non affidarti a questo per stringhe di produzione reali finché non arriva l'API.
- **La lingua base è bloccata.** `en` è sempre la base — le collezioni non in inglese devono essere create come lingue di destinazione di una collezione base in inglese, non standalone.
- **I tag usano logica AND.** Filtrare per due tag significa che la collezione deve avere _entrambi_ i tag. Per cercare per uno o l'altro, rimuovi uno dei tag.
- **La protezione navigazione è globale.** Anche se solo un dialog è sporco, uscire dalla pagina chiede conferma — salva o scarta esplicitamente per saltare il prompt.
- **La validazione dei segnaposto è tua alleata** — eseguirla prima di Pubblicare cattura errori tipo "abbiamo perso il `{{name}}` nella traduzione" che rompono la stringa renderizzata a runtime.
- **Non confondere con la scheda Locale in [General](general.md)** — quella scheda imposta i default (quali lingue sono _abilitate_, formati data / ora / unità). Questa pagina è dove vivono le stringhe tradotte effettive.
- **I dati di riferimento sono mock.** Lingue, namespace e tag sono attualmente hard-coded — quando il backend sarà disponibile, aspettati che vengano dall'API e possibilmente siano modificabili.
