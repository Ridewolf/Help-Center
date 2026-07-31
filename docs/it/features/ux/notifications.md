# Notifiche

Le notifiche mostrano eventi in tempo reale da tutto il Cruscotto — nuovi biglietti, avvisi IoT, attività di pagamento, problemi con i veicoli, messaggi di sistema. Arrivano tramite una connessione WebSocket, quindi gli aggiornamenti sono in tempo reale senza ricaricare la pagina.

## Campanella nella barra superiore

L'**icona della campanella** nella barra superiore è il tuo punto di accesso. Un badge rosso mostra il numero di notifiche non lette.

- Nessun badge → niente di non letto
- Badge numerico → tante notifiche non lette
- `99+` → più di 99 notifiche non lette

Clicca sulla campanella per aprire il **pannello Notifiche** come pannello laterale a destra.

## All'interno del pannello

### Intestazione

- **Titolo** "Notifiche"
- **Conteggio non letti** mostrato come "N non lette" o "Tutto aggiornato" quando non ce ne sono
- **Collegamento Impostazioni** (icona ingranaggio) apre la pagina globale delle impostazioni notifiche

### Interruttore notifiche del browser

Se il tuo browser supporta le notifiche di sistema, sotto l'intestazione appare un interruttore:

- **Disattivato** → le notifiche vivono solo all'interno del cruscotto
- **Attivato** → il browser mostra una notifica di sistema quando arriva qualcosa di nuovo, anche se la scheda è in background
- Alla prima attivazione, il browser chiede il permesso

Se hai negato il permesso in precedenza, l'interruttore è disabilitato e appare un avviso giallo con istruzioni per riattivarlo nelle impostazioni del sito del browser.

### Elenco

Le notifiche sono elencate dalla più recente alla più vecchia. Ogni elemento mostra:

- **Icona categoria** — una piccola icona colorata secondo la priorità (vedi sotto)
- **Titolo** — un breve titolo
- **Corpo** — la descrizione dell'evento
- **Tempo trascorso** — es. "2 min fa"
- **Clicca** sull'elemento per andare alla pagina correlata (biglietto, veicolo, pagamento, ecc.)

### Stato vuoto

Quando non c'è nulla da mostrare, il pannello visualizza un messaggio amichevole e un pulsante per aprire la pagina delle impostazioni.

## Categorie e priorità

Ogni notifica ha una **categoria** (che determina l'icona) e una **priorità** (che determina il colore).

### Categorie

| Categoria    | Icona          | Eventi tipici                                |
| ----------- | -------------- | ------------------------------------------- |
| Supporto    | 🔔 Campanella  | Nuovi biglietti, risposte ai biglietti      |
| Manutenzione| 🔧 Chiave inglese | Attività di servizio assegnate, trigger di automazione |
| Veicolo    | ✨ Scintille    | Cambiamenti di stato, anomalie               |
| Cliente    | 👥 Utenti      | Nuove registrazioni, segnalazioni account    |
| Pagamento  | 💳 Carta       | Transazioni, rimborsi, eventi webhook        |
| IoT        | 🖥️ Cpu         | Dispositivo offline, batteria scarica, avvisi sensori |
| Sistema    | 🛎️ Campanello  | Messaggi di sistema, deploy                   |
| Sicurezza  | 🛡️ Scudo allerta | Eventi di autenticazione, attività sospette  |

### Colori di priorità

| Priorità | Colore | Uso                                               |
| -------- | ------ | ------------------------------------------------- |
| Critico  | Rosso  | Richiede azione immediata (guasto veicolo, allerta sicurezza) |
| Alto     | Arancione | Importante ma non bloccante                      |
| Medio    | Ambra  | Attenzione di routine                             |
| Basso    | Blu    | Informativo                                       |

## Impostazioni (configurazione avanzata)

Il pannello campanella copre le basi. Per la configurazione completa, apri **Impostazioni → Avvisi e Notifiche** (o clicca l'ingranaggio nell'intestazione del pannello):

- **Suoni** — scegli un suono per priorità, o disattiva i suoni
- **Provider** — inoltra notifiche a canali esterni (Telegram, ecc.) configurati per chat/destinatario
- **Filtri** — quali categorie vuoi ricevere
- **Orari di silenzio** — orari di quiete (dove supportato)

## Come funziona il permesso

Le notifiche del browser richiedono un permesso concesso una sola volta dal browser. L'interruttore nel pannello attiva la richiesta di permesso la prima volta che lo abiliti.

- **Concesso** → l'interruttore funziona; ricevi notifiche di sistema mentre il cruscotto è aperto in qualsiasi scheda
- **Negato** → l'interruttore è bloccato su spento; devi modificare il permesso nelle impostazioni del sito del browser, poi tornare e attivare
- **Non supportato** → alcuni browser integrati e versioni vecchie non possono mostrare notifiche di sistema; l'interruttore è nascosto

Concedere il permesso al browser non cambia nulla all'interno del cruscotto — il pannello in-app funziona comunque.

## Consigli

- **Usa le notifiche del browser su una sola scheda** — aprire il cruscotto in più schede può moltiplicare le notifiche di sistema
- **I suoni sono locali** — si sentono solo nella scheda dove sei connesso; disattivali su computer condivisi
- **Il clic diretto è il flusso più veloce** — cliccare una notifica ti porta direttamente alla pagina che l'ha generata; più veloce che navigare manualmente
- **Cruscotto disconnesso** — se il WebSocket cade, il puntino di stato sull'avatar diventa rosso. Le notifiche riprendono appena la connessione torna; non perdi nulla nel frattempo
- **Critico prima di tutto** — quando arrivano molte notifiche insieme, guarda prima i colori: le icone rosse vanno in cima alla tua coda
