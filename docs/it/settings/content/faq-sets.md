# Set di FAQ

La pagina Set di FAQ (`/settings/faq-sets`) è la **libreria di domande e risposte** mostrata all'interno delle app Ridewolf — principalmente l'app mobile per rider, ma anche le interfacce per operatori. Ogni set è un pacchetto di voci Q/A destinato a un pubblico specifico (app rider, app cliente, meccanico, amministratore o generale).

Insieme a [Guide rapide](quick-guides.md) e [Set di icone](icon-sets.md), questa pagina fa parte del livello di contenuto — ciò che un operatore modifica qui è ciò che un rider vede sul proprio telefono, senza bisogno di una release dell'app mobile.

Permesso richiesto: **Set di FAQ** (verificare con l'amministratore).

## Dove appare per il rider

Nell'app mobile per rider, i Set di FAQ supportano la sezione Aiuto / FAQ integrata nell'app. Ogni set di tipo **rider-app** e stato `active` viene caricato nell'app; le voci contrassegnate `visible` appaiono, ordinate in base al campo `order`. I set di tipo `client-app`, `mechanic`, `admin`, `general` sono destinati rispettivamente a quelle app / interfacce.

Un set `draft` o `archived` non viene mai mostrato — utile per preparare modifiche prima della pubblicazione.

## Filtri

| Filtro  | Tipo         | Note                                                                    |
| ------- | ------------ | ---------------------------------------------------------------------- |
| Cerca   | Testo        | Casella di ricerca nell'intestazione — cerca titolo / descrizione / slug |
| Tag     | Selezione multipla | Filtra per tag applicati al set (onboarding, pagamenti, tecnico, …) |
| Stato   | Menu a tendina | `Attivo` / `Bozza` / `Archiviato` (o `Tutti`)                         |
| Tipo    | Menu a tendina | `App cliente` / `App rider` / `Meccanico` / `Amministratore` / `Generale` (o `Tutti`) |

**Pulisci tutto** azzera tutti i filtri contemporaneamente.

## Colonne

| Colonna    | Contenuto                                                           |
| ---------- | ----------------------------------------------------------------- |
| **Set**   | Icona + titolo; la seconda riga mostra descrizione o slug         |
| **Tipo**  | Pillola pubblico — App cliente / App rider / Meccanico / Amministratore / Generale |
| **Tag**   | Prime 3 etichette tag, con `+N` per overflow                      |
| **Voci**  | Numero di campi Q/A nel set                                        |
| **Stato** | `Attivo` (verde) / `Bozza` (grigio) / `Archiviato` (smorzato)      |
| **Aggiornato** | Data relativa; passaggio del mouse per timestamp completo + autore |

Clicca una riga per aprire il dialogo **Visualizza** (anteprima in sola lettura). Clicca il menu a tre puntini per le azioni.

## Azioni sulla riga

| Azione           | Cosa fa                                                             |
| ---------------- | ------------------------------------------------------------------ |
| **Visualizza dettagli** | Anteprima in sola lettura con tutte le voci Q/A visualizzate  |
| **Modifica**     | Apre il modulo di modifica (uguale a Crea, precompilato)          |
| **Duplica**      | Clona il set con suffisso slug `-copy` e stato azzerato a `Bozza` |
| **Esporta**      | Scarica il set come ZIP o JSON                                     |
| **Archivia**     | Sposta in `Archiviato` — nascosto dall'app rider, conservato per storico |
| **Elimina**      | Rimuove definitivamente (distruttivo — solo se davvero non serve)  |

La barra degli strumenti in alto ha anche azioni di massa **Importa** (ZIP / JSON) e **Esporta** (ZIP / JSON della lista visibile).

## Modulo Crea / Modifica

Il dialogo del modulo ha tre selettori principali e una lista di campi Q/A:

- **Tipo** — obbligatorio, definisce chi vede il set (App cliente / App rider / Meccanico / Amministratore / Generale)
- **Stato** — `Bozza` (default per nuovi) / `Attivo` / `Archiviato`
- **Tag** — selezione multipla, usata per filtrare e raggruppare
- **Titolo** — obbligatorio, mostrato come nome del set
- **Descrizione** — opzionale, seconda riga nella lista
- **Campi** — le voci Q/A. Ogni campo ha:
  - **Etichetta** (la domanda)
  - **Valore** (la risposta)
  - **Tipo** — `text` / `markdown` / `link` / `list`
  - Interruttore **Visibile** (nasconde singoli elementi senza eliminarli)
  - **Ordine** (trascina per riordinare)

Lo slug deriva dal titolo ed è usato nell'URL API — modificalo tramite Modifica se necessario.

## Flussi di lavoro tipici

- **Pubblicare una nuova FAQ per rider** — `+ Crea set` → Tipo = App rider, Stato = Bozza → inserisci titolo + descrizione → aggiungi campi Q/A → salva → anteprima con Visualizza dettagli → Modifica, cambia Stato = Attivo → appare nell'app rider al prossimo aggiornamento
- **Preparare testi stagionali** — Duplica un set esistente → modifica la copia come Bozza → programma il cambio archiviando il vecchio set e attivando quello nuovo in un solo passaggio
- **Ripristinare una risposta errata** — apri il set incriminato → Modifica → correggi il campo (o disattiva `Visibile`) → salva; oppure Archivia l'intero set e torna a una versione duplicata precedente
- **Importazione massiva da dump JSON** — in alto a destra _Importa_ → scegli il file → conferma la struttura analizzata → importa come Bozza, poi rivedi e Attiva

## Consigli

- **Il Tipo controlla chi vede il contenuto** — non inserire testi per rider in un set `mechanic`, non arriverà mai all'app rider
- **Bozza è il tuo amico** — i nuovi set sono Bozza per non mostrare contenuti incompleti nell'app rider. Passa ad Attivo solo dopo averli revisionati
- **I campi Markdown rendono la formattazione** — usali per risposte che richiedono elenchi puntati o grassetto; scegli `text` se vuoi solo testo semplice
- **I tag sono condivisi con il filtro** — usa un vocabolario tag coerente (es. `onboarding`, `payments`, `troubleshooting`) così i filtri futuri restano utili
- **Archivia invece di Eliminare** quando possibile — i set eliminati spariscono per sempre, quelli archiviati possono essere riattivati e servono come storico
