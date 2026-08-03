# Registro errori

Il Registro errori (`/error-logs`) è uno **strumento diagnostico interno** che elenca gli errori segnalati dal cruscotto e dall'app mobile per rider — eccezioni JavaScript e chiamate API fallite — con lo stack trace, il contesto della richiesta e, quando disponibile, uno screenshot e una mappa della posizione dell'utente.

Usalo quando qualcuno segnala _"l'app è crashata"_ o _"ha detto che c'è stato un errore"_ e hai bisogno dell'errore reale sottostante.

## Dove trovarlo

- `/error-logs` — la lista
- `/error-logs/:id` — un singolo errore

Non esiste una **voce nella barra laterale**. Vi si accede digitando direttamente l'URL — è uno strumento diagnostico per ingegneri e amministratori, non parte della navigazione normale dell'operatore (come [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), è una superficie non elencata).

**Accesso:** la pagina richiede una chiave API per la segnalazione errori configurata per il tuo ambiente, oltre alla normale sessione di login. Se la pagina non restituisce nulla, la prima cosa da controllare è la mancanza della chiave per quell'ambiente — chiedi al tuo amministratore.

## Vista elenco

- Elenco paginato, a partire dalla pagina 1 con 100 righe per pagina; il controllo di paginazione gestisce la dimensione della pagina da lì.
- Un menu a discesa **source** filtra in base alla provenienza dell'errore: **dashboard** o **app**.
- Un controllo **refresh** si trova nell'intestazione. L'auto-aggiornamento è **disattivato di default**; puoi scegliere un intervallo di 10 secondi, o 1 / 5 / 15 / 30 minuti. Il polling si mette in pausa mentre la scheda è nascosta e recupera quando torni, quindi una scheda in background non continua a fare polling.

Source più pagina/limite sono gli unici filtri — non esiste filtro per utente, email o intervallo temporale.

## Interpretare il badge

Ogni riga porta un badge che è il tuo **segnale di triage più rapido**:

- Un **numero** (stato HTTP) → la riga è una **chiamata API fallita**; il problema punta al backend o alla richiesta.
- Una **parola** → la riga è lato client; il tipo è dedotto dal testo del messaggio: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (accesso, login), **Network** (rete, fetch, timeout), **Cancelled**, o il generico **Error**.

Tratta i badge con parole come una stima approssimativa basata sul testo del messaggio, non come una classificazione inviata dal segnalatore.

## Vista dettaglio

La pagina del singolo errore mostra:

- i metadati dell'errore e lo **stack trace**
- l'**URL** dove è avvenuto e l'**user agent** (analizzato in browser, OS, dispositivo, hardware e info schermo)
- uno **screenshot**, inline, quando è stato allegato al report
- una **mini mappa** con un marcatore rosso, quando sono state catturate coordinate valide — questo rende visibili i bug specifici di posizione, come un bordo di zona o un fix GPS errato

I timestamp sono mostrati in formato tempo trascorso.

## Riferimento campi

- **id** — identificatore errore
- **source** — `dashboard` o `app`
- **message** / **stack** — l'errore e il suo stack trace
- **url** — la pagina o endpoint dove è avvenuto
- **userAgent** — l'user agent grezzo; viene analizzato per info dispositivo, ed è anche da qui che provengono le coordinate della mappa
- **metadata** — il contesto strutturato: la richiesta (metodo, endpoint, corpo) e risposta (stato, corpo) per errori API; id utente / email / ruolo quando il report identifica un utente; versioni dashboard & app, runtime, piattaforma; lo screenshot; e contesto WebSocket (codice chiusura / motivo, tentativo di riconnessione) quando l'errore proviene da un socket
- **clientTimestamp** — preso dall'orologio del dispositivo, quindi può essere errato
- **createdAt** — il timestamp del server; **quello affidabile per l'ordinamento**

Non tutti i report identificano un utente — l'email può essere vuota.

## Domande comuni

- **La pagina è vuota o non autorizzata.** Controlla che la chiave per la segnalazione errori sia configurata per questo ambiente e che tu sia loggato. Chiedi al tuo amministratore.
- **Non la trovo nel menu.** Non esiste voce di navigazione — vai direttamente a `/error-logs`.
- **Nessuno screenshot mostrato.** Quel report non ne aveva uno; non tutti gli errori ne hanno.
- **Nessuna mappa mostrata.** Non sono state catturate coordinate valide per quel report.
- **I timestamp non coincidono.** Confronta `createdAt` (server) con `clientTimestamp` (orologio dispositivo) — un orologio dispositivo sfasato spiega la discrepanza.
- **Ho bisogno degli errori di un utente.** Non esiste filtro per utente o email; filtra per source e scorri la lista.
- **La lista sembra obsoleta.** L'auto-aggiornamento è disattivato di default — scegli un intervallo dal controllo refresh, e ricorda che il polling si mette in pausa mentre la scheda è in background.
- **Un badge dice "Runtime" ma mi aspettavo un codice di stato.** Quella riga non aveva contesto richiesta/risposta, quindi il badge ha dedotto un tipo dal testo del messaggio.
