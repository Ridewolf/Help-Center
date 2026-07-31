# Ruoli

La pagina Ruoli (`/settings/roles`) è dove definisci **cosa possono fare gli operatori** nel Cruscotto. Un ruolo è un insieme nominato di permessi; ogni operatore ha esattamente un ruolo; i permessi decidono quali pagine vedono e quali azioni possono eseguire.

Abbina questa pagina a [Operators](operators.md) — Operators assegna i ruoli alle persone, Ruoli definisce cosa può effettivamente fare ogni ruolo.

Permesso richiesto: **Ruoli** (`d4e5f6`).

## Come funzionano i permessi

Ogni pagina e azione nel Cruscotto è protetta da un **ID permesso** (es. `k7m8n9` per Veicoli, `e4f5h6` per Clienti). Un ruolo è essenzialmente una lista di controllo di questi ID permesso:

- Un operatore può vedere una pagina solo se il suo ruolo ha il permesso per quella pagina
- Un'azione sulla riga (Modifica, Elimina, ecc.) è nascosta se il ruolo non ha il sotto-permesso corrispondente
- I permessi sono valutati **ad ogni richiesta** — cambia un ruolo e l'operatore vede la modifica al prossimo caricamento della pagina (o prima)

Non esiste **ereditarietà** tra i ruoli — ogni ruolo è indipendente. I ruoli con maggiore fiducia hanno semplicemente una lista di permessi più lunga.

## Ruoli predefiniti vs personalizzati

I ruoli si dividono in due tipi:

| Tipo         | Modificabile | Scopo                                                                   |
| ------------ | ------------ | ----------------------------------------------------------------------- |
| **Predefinito** | No           | Fornito con la piattaforma (es. Owner, Admin). Garantisce una base sicura |
| **Personalizzato** | Sì           | Creato da te — si adatta alla struttura del tuo team                   |

I ruoli predefiniti **Owner / Admin** non possono essere modificati o eliminati — sono la rete di sicurezza. I ruoli personalizzati sono dove regoli i permessi per rispecchiare le responsabilità reali.

## Filtri

| Filtro  | Tipo      | Note                                |
| ------- | --------- | ---------------------------------- |
| Cerca   | Testo     | Cerca nel nome e nella descrizione del ruolo |
| Stato   | Dropdown  | `Attivo` / `Inattivo` (o `Tutti`)  |

## Colonne

| Colonna         | Ordinabile? | Contenuto                                                                 |
| --------------- | ----------- | ------------------------------------------------------------------------ |
| **Nome ruolo**  | ✓           | Etichetta del ruolo                                                       |
| **Descrizione** | —           | Testo breve che spiega a cosa serve il ruolo                             |
| **Tipo**        | —           | Tag Predefinito / Personalizzato                                          |
| **Permessi**    | —           | Conteggio dei permessi concessi (es. "23 / 84")                         |
| **Punteggio fiducia** | ✓       | Valore numerico che indica quanto il ruolo è potente (più alto = più potente) |
| **Creato**      | ✓           | Data di creazione del ruolo                                               |

### Punteggio fiducia

Il punteggio fiducia è una stima numerica approssimativa di "quanto è pericoloso il set di permessi di questo ruolo" — usato per ordinare e fornire indicazioni visive. Un ruolo con permessi di eliminazione + aggiornamento di massa + gestione permessi ha un punteggio fiducia più alto di un ruolo solo in visualizzazione. Non esiste una scala fissa; consideralo una misura relativa all'interno della tua lista di ruoli.

## Azioni sulla riga

Un menu a tre puntini per ogni riga.

| Azione           | Permesso  | Cosa fa                                                                                         |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------ |
| **Visualizza dettagli** | —         | Apre la pagina di dettaglio del ruolo con l'elenco completo dei permessi                        |
| **Modifica**     | `edit`    | Apre il modulo di modifica (disabilitato con notifica per i ruoli Predefiniti)                   |
| **Elimina**      | `delete`  | Elimina soft il ruolo (con conferma; solo ruoli Personalizzati; solo se nessun operatore lo usa) |

Se un ruolo è in uso, il sistema rifiuterà l'eliminazione e ti dirà quanti operatori lo hanno ancora — riassegna prima a loro un altro ruolo.

## Modulo Crea / Modifica

Il modulo del ruolo mostra ogni permesso raggruppato per dominio (Operazioni, Supporto, Analisi, Impostazioni, ecc.) con caselle di controllo.

Campi chiave:

- **Nome** (obbligatorio, univoco)
- **Descrizione** (opzionale ma consigliata)
- **Stato** (Attivo / Inattivo)
- **Albero permessi** — permessi a livello di pagina e sotto-permessi, raggruppati per dominio

Quando disattivi un permesso di pagina di primo livello, tutti i suoi sotto-permessi vengono forzatamente disattivati (l'operatore perde completamente la pagina). Attivare un permesso di pagina concede la sola visualizzazione di default — poi puoi scegliere individualmente sotto-permessi come _crea_, _modifica_, _elimina_, ecc.

Un piccolo indicatore **Punteggio fiducia** si aggiorna mentre selezioni le caselle — utile per confrontare con ruoli simili.

## Pagina dettaglio ruolo

Cliccare una riga apre la pagina dettaglio del ruolo che mostra:

- Nome, descrizione, tipo, stato
- Punteggio fiducia
- Elenco completo dei permessi (sola lettura, raggruppati per dominio)
- Registro attività: quando il ruolo è stato creato, modificato l'ultima volta, da chi
- Elenco degli operatori attualmente assegnati (con link ai loro profili)

## Flussi di lavoro tipici

- **Definire un nuovo team** — `+ Crea` → nome (es. "Capo squadra sul campo") → seleziona i permessi necessari → Salva → assegna il ruolo ai [operatori](operators.md) rilevanti
- **Restringere un ruolo esistente** — trova il ruolo nella lista → Modifica → deseleziona i permessi non più necessari → Salva (gli operatori con questo ruolo perderanno l'accesso al prossimo caricamento)
- **Promuovere un membro del team** — vai su [Operators](operators.md) → Modifica → cambia Ruolo → Salva (non si fa da questa pagina)
- **Verificare chi può eliminare veicoli** — apri questa lista → ordina per Punteggio fiducia → controlla i sotto-permessi Modifica / Elimina su Veicoli di ogni ruolo
- **Ritirare un ruolo** — assicurati che nessun operatore lo abbia ([Operators](operators.md) filtra per ruolo) → Elimina

## Consigli

- **Meno è meglio** — inizia con la sola visualizzazione e aggiungi azioni specifiche; resisti alla tentazione di copiare un ruolo superiore e poi ridurlo
- **Testa impersonando** (dove supportato) — prima di distribuire un ruolo, accedi come operatore di prova con quel ruolo e prova i flussi di lavoro
- **I ruoli predefiniti sono il tuo piano di riserva** — Owner / Admin esistono sempre; se ti blocchi accidentalmente fuori da un ruolo personalizzato, un Admin può ripristinare l'accesso
- **Il punteggio di fiducia è un suggerimento, non una regola** — due ruoli con lo stesso punteggio di fiducia possono fare cose molto diverse; controlla sempre l'albero delle autorizzazioni effettivo
- **Le autorizzazioni sono valutate lato server** — disattivarle nel ruolo non rimuove la sessione corrente dell'operatore, ma la richiesta successiva viene negata
- **Documenta ogni ruolo personalizzato** nel campo Descrizione — sei mesi dopo, "Fleet manager (lettura + modifica, senza eliminazione)" è una salvezza
