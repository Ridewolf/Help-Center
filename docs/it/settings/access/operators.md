# Operatori

La pagina **Operatori** (`/settings/operators`) è la **rubrica del personale** — ogni dipendente che ha accesso al Cruscotto. Ogni operatore ha un ruolo (vedi [Ruoli](roles.md)), metadati opzionali di dipartimento / posizione, tag per il filtraggio e uno stato (Attivo / Inattivo).

Diverso dai [Clienti](../../operations/customers/clients.md) (i tuoi clienti) — gli Operatori sono il **team interno** che gestisce la piattaforma.

Permesso richiesto: **Operatori** (`t4u5v6`). I sotto-permessi regolano le azioni di modifica.

## Come gli operatori arrivano qui

Gli operatori sono creati da te (un amministratore) tramite il pulsante **+ Crea** — non esiste una registrazione autonoma:

1. **+ Crea** apre il modulo operatore — nome, email, ruolo, dipartimento / posizione / tag opzionali
2. Il nuovo operatore riceve un'email con le istruzioni per l'accesso e una password temporanea
3. Effettua l'accesso, completa il profilo (`/profile`) e può iniziare a lavorare in base ai permessi del suo ruolo
4. Gli operatori inattivi non possono accedere — imposta un account come inattivo quando un dipendente lascia

## Filtri

| Filtro  | Tipo          | Note                                                      |
| ------- | ------------- | --------------------------------------------------------- |
| Cerca   | Testo         | Cerca in nome, email, posizione, dipartimento             |
| Stato   | Menu a tendina| `Attivo` / `Inattivo` (o `Tutti`)                         |
| Tag     | Selezione multipla | Filtra per tag applicati agli operatori (es. "Turno notte") |

## Colonne

| Colonna       | Ordinabile? | Contenuto                                                                 |
| ------------- | ----------- | ------------------------------------------------------------------------- |
| **Utente**    | ✓           | Avatar + nome e cognome + email; link alla pagina dettaglio operatore     |
| **Ruolo**     | —           | Pillola del ruolo operatore (link a [Ruoli](roles.md))                   |
| **Dipartimento** | —         | Etichetta dipartimento opzionale                                        |
| **Posizione** | —           | Etichetta posizione opzionale                                            |
| **Tag**       | —           | Tag applicati all'operatore                                              |
| **Stato**     | ✓           | `Attivo` (verde) / `Inattivo` (grigio)                                  |

## Azioni sulla riga

Un menu a tre puntini per ogni riga. Le azioni disponibili dipendono dai permessi:

| Azione           | Permesso  | Cosa fa                                         |
| ---------------- | --------- | ----------------------------------------------- |
| **Visualizza dettagli** | —    | Apre la pagina dettaglio dell'operatore         |
| **Modifica**     | `edit`    | Apre il modulo di modifica (nome, ruolo, dipartimento, ecc.) |

Non esiste l'**azione Elimina** — i record degli operatori sono conservati per scopi di audit. Per impedire l'accesso, imposta lo stato dell'operatore su _Inattivo_ tramite Modifica.

## Pagina dettaglio

Cliccare su una riga (o su _Visualizza dettagli_) apre la pagina dettaglio dell'operatore con:

- Informazioni personali (nome, email, telefono, foto)
- Ruolo + snapshot dei permessi
- Dipartimento / posizione / tag
- Stato
- Registro attività (eventi di accesso, cambi di ruolo)

Modifica da lì o dal menu della riga — entrambi portano allo stesso modulo.

## Modulo Crea / Modifica

Il **modulo operatore** (`+ Crea` o _Modifica_) è semplice:

- **Nome / Cognome** (obbligatorio)
- **Email** (obbligatoria, unica tra gli operatori)
- **Ruolo** (obbligatorio, menu a tendina con i ruoli disponibili — vedi [Ruoli](roles.md))
- **Dipartimento / Posizione** (opzionale)
- **Tag** (selezione multipla opzionale)
- **Stato** (Attivo / Inattivo)
- Solo in Creazione: campo **password iniziale** o password generata automaticamente inviata via email all'operatore

Salva convalida e scrive nel registro audit. Gli operatori appena creati ricevono automaticamente un'email di benvenuto.

## Flussi di lavoro tipici

- **Inserimento di un nuovo assunto** — `+ Crea` → compila nome/email/ruolo → Salva → conferma che ha ricevuto l'email di benvenuto → chiedi di accedere e completare il profilo
- **Cambio ruolo dopo promozione** — Modifica → cambia Ruolo → Salva (i nuovi permessi si applicano alla prossima richiesta dell'operatore, non retroattivamente)
- **Partenza** — Modifica → imposta Stato = Inattivo → Salva (il record resta per audit; l'accesso è bloccato)
- **Pianificazione turni basata su tag** — applica tag come "Turno notte" → filtra la lista per tag per vedere chi è programmato

## Consigli

- **Il Ruolo è il campo più importante** — sii prudente nel cambiarlo. Retrocedere da Admin a Supporto toglie immediatamente i permessi di scrittura
- **Inattivo ≠ Eliminato** — la cronologia dell'operatore è preservata; riporta ad Attivo per ripristinare l'accesso
- **La lista è ordinata per nome di default** — se hai molti operatori, cerca per email o dipartimento invece di scorrere
- **I tag qui sono diversi da quelli dei clienti** — sono specifici per gli operatori (es. "Turno notte", "Formatore") e non condividono lo spazio dei nomi
- **Restrizioni di auto-modifica** — non puoi cambiare il tuo ruolo dal menu della riga; usa il Profilo per modifiche personali
