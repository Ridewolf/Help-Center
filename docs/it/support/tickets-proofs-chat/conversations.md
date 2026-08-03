# Conversazioni

La pagina Conversazioni (`/support/conversations`) è il **messaggero per operatori** — un'interfaccia chat in tempo reale tra il tuo team di supporto e i tuoi rider. Ogni conversazione appartiene a un cliente e contiene l'intera cronologia dei messaggi, le azioni del tuo team e i cambiamenti di stato.

Permesso richiesto: **Conversazioni** (`x2y3z4`).

## Come appaiono qui le conversazioni

Le conversazioni arrivano da alcuni flussi:

1. **Il rider apre una chat** nell'app mobile — crea una conversazione _Nuova_, viene messa in coda in _In attesa_
2. **L'operatore avvia** — _+ Nuova_ nella barra laterale ti permette di iniziare una chat con un cliente specifico (es. per un follow-up su una multa o un controllo antifrode)
3. **Riaperta** — le conversazioni chiuse possono essere riaperte (dal rider o dall'operatore) e tornano in cima alla lista

La lista è **live** — nuove conversazioni e messaggi in arrivo fluiscono via WebSocket senza bisogno di aggiornare la pagina.

## Layout

La pagina ha due aree principali. Il layout si adatta alla dimensione dello schermo:

- **Desktop** — vista divisa, barra laterale a sinistra (30%) e contenuto chat a destra (70%), con una maniglia trascinabile
- **Mobile** — un'area alla volta: la lista nella barra laterale, o la chat aperta (la freccia indietro torna alla lista)

## Barra laterale (sinistra)

La coda delle conversazioni e i filtri:

- **+ Nuova** — apre una finestra per cercare un cliente e iniziare una nuova conversazione (stato _In attesa_)
- **Cerca** — ricerca testuale su nome cliente, ID, ultimo messaggio
- **Filtri di stato** — pillole con contatori: `Tutte` / `Nuove` / `In attesa` / `Attive` / `Ritardate` / `Chiuse`
- **Schede conversazione** — mostrano avatar, nome cliente, anteprima ultimo messaggio, pillola stato, timestamp, badge non letti. Clicca per aprire
- **Carica altro** — paginazione durante lo scorrimento

L'ordinamento predefinito mette in cima le conversazioni senza risposta (In attesa / Attive con messaggi non letti) — le chat più urgenti sono sempre sotto i tuoi occhi.

### Riferimento stato

| Stato       | Significato                                                |
| ----------- | ---------------------------------------------------------- |
| **Nuovo**   | Appena aperto, nessuno ha ancora letto                     |
| **In attesa** | Non assegnato, in coda per essere preso da un operatore   |
| **Attivo**  | Assegnato a un operatore, conversazione in corso           |
| **Ritardato** | L'operatore ha messo in pausa (in attesa di info, follow-up successivo) |
| **Chiuso**  | Risolto e chiuso                                           |

## Contenuto chat (destra)

Quando selezioni una conversazione, la colonna di destra mostra:

### Intestazione chat

- **Freccia indietro** (solo mobile) — torna alla lista nella barra laterale
- **Titolo** — nome cliente con la pillola di stato della conversazione
- **Apri info** — apre la [barra laterale Info Utente](#pannelli-info) con il contesto completo del cliente
- Pulsanti **Ritarda / Trasferisci / Chiudi** a seconda dello stato

### Finestra chat

- **Bolle messaggi** — messaggi operatore a destra (colore accentuato), messaggi rider a sinistra; con timestamp e indicatori di lettura
- **Indicatore di scrittura** — mostra quando il rider sta scrivendo
- Pulsante **Carica messaggi precedenti** in alto — carica messaggi più vecchi su richiesta
- Pulsante **Vai ai nuovi messaggi** — scorciatoia per tornare in fondo quando hai scrollato verso l'alto
- **Azioni messaggio** al passaggio del mouse — Modifica / Elimina sui tuoi messaggi

### Risposte predefinite

Una riga sopra l'input mostra modelli di risposta rapida raggruppati per categoria. Clicca uno per inserire il testo nell'input — puoi modificare prima di inviare.

### Piè di pagina chat

Il contenuto del piè di pagina dipende dallo **stato** della conversazione e dall'assegnazione:

- **Attivo + assegnato a te** → **Input messaggio** con menu allegati (testo + immagine/file)
- **Altro** → barra **Azioni conversazione** con i pulsanti rilevanti per lo stato corrente

## Azioni conversazione (per stato)

Il piè di pagina mostra i pulsanti giusti per lo stato attuale. Azioni comuni:

| Azione       | Disponibile quando…                 | Cosa fa                                               |
| ------------- | ---------------------------------- | ----------------------------------------------------- |
| **Accetta**  | In attesa / Nuovo (non è ancora tua) | Assegna la conversazione a te e cambia a _Attivo_     |
| **Prendi in carico** | Attivo (assegnato a un altro operatore) | Riassegna a te                                      |
| **Rilascia** | Attivo (assegnato a te)             | Rilascia la conversazione tornando a _In attesa_      |
| **Ritarda**  | Attivo                             | Mette la conversazione in pausa → _Ritardato_         |
| **Riapri**  | Chiuso                             | Riporta la conversazione a _Attivo_                    |
| **Chiudi**  | Attivo                             | Segna la conversazione come risolta → _Chiuso_        |
| **Elimina** | Permesso richiesto                 | Elimina soft la conversazione (stile admin)            |
| **Nuova**   | Sempre                            | Inizia una nuova conversazione con lo stesso cliente   |

Se la chat è assegnata a un altro operatore, non puoi agire direttamente — vedrai un pulsante _Prendi in carico_ invece dell'input messaggio.

## Pannelli info

Due pannelli a scorrimento si aprono dalle azioni nella finestra chat:

- **Barra laterale Info Utente** — contesto rapido per l'operatore assegnato (te), e l'attività recente del rider in questa chat
- **Scheda Info Cliente** — snapshot completo del profilo cliente (saldo, stato, tag, corse recenti) senza uscire dalla chat — utile per decisioni rapide

## Stato vuoto (desktop)

Quando nessuna chat è selezionata su desktop, il pannello di destra mostra un'illustrazione di stato vuoto con un suggerimento per scegliere una conversazione. Su mobile il pannello di destra non esiste finché non ne selezioni una — la lista nella barra laterale occupa tutto lo schermo.

## Flussi di lavoro tipici

- **Prendi in carico una chat in attesa** — `Status = Waiting` → clicca sulla scheda in alto → _Accetta_ → inizia a chattare
- **Prendi una conversazione da un collega** — apri la chat (vedrai che è gestita da un altro) → _Prendi in carico_ (usalo con parsimonia; interrompe la continuità del rider)
- **Rallenta una conversazione lenta** — quando il rider smette di rispondere, _Ritarda_ per spostarla fuori dalla tua coda attiva; torna nella tua casella quando risponde
- **Chiudi la conversazione** — problema risolto → _Chiudi_ con una risposta rapida predefinita ("Tutto a posto, buon viaggio!")
- **Ottieni rapidamente il contesto del rider** — _Apri info_ nell'intestazione → vedi saldo / corse recenti / tag prima di rispondere a una domanda di fatturazione
- **Usa risposte predefinite** — per risposte ripetitive (politica di rimborso, procedura oggetti smarriti), scegli un modello e personalizzalo

## Suggerimenti

- **Live di default** — i nuovi messaggi arrivano senza aggiornare; il contatore del badge si aggiorna automaticamente
- **Prima le non risposte** — l'ordinamento mantiene le chat urgenti in cima; fidati dell'ordine della lista
- **Le risposte predefinite sono modelli, non copioni** — personalizza sempre il saluto e la frase finale; i rider capiscono quando ricevono risposte standard
- **Prendi in carico con attenzione** — il rider non vede lo stato a livello operatore. Cambiare a metà conversazione può sembrare brusco; prendi in carico solo se l'operatore attuale è chiaramente bloccato (offline, fuori turno)
- **Ritarda > Chiudi nei casi incerti** — se pensi che il problema possa tornare, _Ritarda_ mantiene il thread collegato; _Chiudi_ fa aprire al rider una nuova conversazione se vuole continuare
- **Modifica solo i tuoi messaggi** — e solo per errori di battitura brevi; riscrivere un messaggio vecchio dopo che il rider l'ha letto può danneggiare la fiducia
- **L'URL contiene l'ID della conversazione** — incollalo in un biglietto o nota di escalation così il prossimo operatore può entrare direttamente
