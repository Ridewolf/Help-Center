# Il tuo profilo

Il **Profilo** è _il tuo_ account all'interno di Ridewolf — l'operatore che ha effettuato l'accesso in questo momento. Da qui puoi cambiare il tuo nome, foto, password, tema, suoni di notifica e rivedere dove sei connesso. Se il tuo account operatore è anche collegato a un account cliente (client) nelle app Rider, puoi passare alla vista cliente dello stesso account.

Quattro percorsi condividono questo articolo, tutti raggiungibili dall'avatar nella barra superiore:

| Percorso            | Cos'è                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Hub — ti reindirizza automaticamente alla vista operatore o cliente in base a cosa ha il tuo account |
| `/profile/operator` | Vista lato operatore di te stesso (predefinita per il personale)                                 |
| `/profile/customer` | Vista lato cliente (solo se il tuo account è anche collegato a un cliente rider)                 |
| `/profile/legacy`   | Vista legacy a pagina singola — stessi dati disposti come un unico lungo modulo (fallback per le viste ridisegnate) |

Questa è la vista **self-service**. Per gestire _altri_ operatori (i tuoi colleghi), usa invece [Operators](../../settings/access/operators.md).

Nessun filtro di permessi — ogni utente connesso può aprire il proprio profilo.

## Come `/profile` decide dove indirizzarti

Accedere direttamente a `/profile` non ti porta mai su una pagina — reindirizza immediatamente:

1. Legge `lastPersona` dal localStorage del browser (impostato l'ultima volta che hai usato l'interruttore persona nell'header principale)
2. Se `lastPersona = customer` e il tuo account ha un cliente collegato → `/profile/customer`
3. Se `lastPersona = operator` → `/profile/operator`
4. Altrimenti: operatore se hai un account operatore, cliente solo se non ce l'hai
5. Fallback predefinito: `/profile/operator`

Vedi un indicatore di caricamento con "Reindirizzamento..." per il breve momento tra l'atterraggio e il reindirizzamento.

## L'header principale (condiviso tra viste operatore + cliente)

Un header fisso si trova in cima a `/profile/operator` e `/profile/customer`. Mostra:

- **Avatar** con sovrapposizione di una fotocamera al passaggio del mouse — clicca per aprire la finestra di dialogo **Caricamento avatar**
- **Nome** (clicca per copiare) e **email** (clicca per copiare) — entrambi con tooltip per copia negli appunti
- **Badge** — il tuo stato (`Attivo` / `Inattivo`), `Verificato` e `Cliente` se sei in vista cliente
- **KPIs rapidi** — quattro piccole tessere, il contenuto dipende dalla persona (vedi sotto)
- **Interruttore persona** — due pulsanti (`Operatore` / `Cliente`). Il pulsante Cliente è disabilitato con tooltip quando il tuo account non ha un cliente collegato
- **Azioni** — pulsante `Modifica`, più un menu a tre puntini con _Copia ID Utente_, _Copia Email_, _Apri come JSON_ (esporta il tuo record utente in una nuova scheda) e _Logout_

Cambiare persona tramite questi pulsanti salva la tua scelta in `lastPersona` nel localStorage così la prossima volta `/profile` sa dove indirizzarti.

## `/profile/operator` — tre schede

La vista operatore organizza tutto in tre schede. L'hash URL (`#overview`, `#security`, `#preferences`) riflette la scheda attiva, così puoi creare link diretti a una scheda.

### Scheda Panoramica

Due schede affiancate: **Org & Ruolo** (a sinistra) e **Attività** (a destra).

La scheda **Org & Ruolo** mostra, in sola lettura:

| Campo          | Fonte                                                                 | 
| -------------- | --------------------------------------------------------------------- |
| **ID Utente**  | Il tuo ID operatore — troncato a 8 caratteri con icona per copia     |
| **Team**       | Etichette tag assegnate a te (risolte dalla cache tag)               |
| **Email**      | L'email del tuo account                                              |
| **Stato**      | Badge `Attivo` / `Inattivo`                                          |
| **Ruolo**      | Etichetta ruolo, con numero di permessi tra parentesi                |
| **Dipartimento** | Dal profilo della tua organizzazione                                |
| **Posizione**  | Dal profilo della tua organizzazione                                 |
| **Posizione**  | Città e fuso orario, se impostati                                   |
| **2FA**       | `Abilitato` (verde) o `Disabilitato` (grigio) — mostrato solo se noto |

Questa scheda è **sola lettura** nella vista operatore. Per modificare uno di questi campi (ruolo, dipartimento, posizione, tag), un amministratore deve modificare il tuo record da [Operators](../../settings/access/operators.md) — non puoi promuoverti da solo.

La scheda **Attività** mostra le tue ultime cinque azioni, estratte da `/activity/operator/{id}`:

- Punto colorato (verde = Creato, blu = Aggiornato, arancione = Eliminato, primario = altro)
- Badge categoria ("Creato" / "Aggiornato" / "Eliminato" / "Sicurezza")
- Descrizione ("Veicolo aggiornato #ABC", ecc.)
- Tempo relativo ("2 ore fa")
- Attore — di solito "da te stesso", "dal Sistema" per modifiche automatiche

Se il feed attività è vuoto, la scheda mostra invece le tue **sessioni di accesso recenti** come eventi di Sicurezza. Un pulsante "Visualizza tutto" in fondo passa alla scheda Sicurezza dove si trova l'elenco completo delle sessioni.

I KPI sopra le schede mostrano `{n} actions · {m} changes in 30d`.

### Scheda Sicurezza

Due schede impilate: **Gestione password** e **Sessioni attive**.

**Gestione password** ti permette di cambiare la tua password tramite una finestra di dialogo. Aprila con il pulsante _Modifica_ accanto a "Password attuale".

La finestra di dialogo ha tre campi:

| Campo                | Validazione                                         |
| -------------------- | --------------------------------------------------- |
| Password attuale     | Obbligatoria; minimo 8 caratteri                    |
| Nuova password      | Obbligatoria; minimo 8 caratteri; deve essere diversa dalla attuale |
| Conferma nuova password | Obbligatoria; minimo 8 caratteri; deve essere uguale alla nuova password |

Il pulsante di invio resta disabilitato finché tutti e tre i campi non sono validi. Gli errori inline appaiono in rosso sotto ogni campo mentre digiti. Al successo, ricevi una notifica toast e la finestra si chiude; il modulo si svuota.

Sotto la sezione della password, una piccola tabella **cronologia password** elenca gli ultimi tre eventi di modifica con data, azione e motivo. (Attualmente è un segnaposto statico — il backend non espone ancora un endpoint per la cronologia password).

Le **sessioni attive** sono gestite dal gestore di sessioni condivise. Le sessioni sono **raggruppate per impronta del dispositivo** (browser + OS + tipo di dispositivo + produttore + modello), quindi più schede sullo stesso laptop si raggruppano in un unico gruppo.

Ogni intestazione di gruppo mostra:

- Un'icona del dispositivo (Monitor / Smartphone / Laptop basata su `deviceType`)
- Etichetta del dispositivo — produttore + modello, o OS + versione, o tipo di dispositivo
- Etichetta del browser
- Un badge di stato: `active` (ultima attività entro 1h, verde), `inactive` (entro 24h, grigio), `old` (oltre 24h, attenuato), o `Questo dispositivo` (la sessione corrente, contorno blu)
- Ora dell'ultima attività (relativa)
- Conteggio delle sessioni per il gruppo

Clicca sull'intestazione di un gruppo per espanderlo e vedere ogni singola sessione all'interno, ciascuna con paese e IP dalla ricerca della posizione, la data di accesso e un'icona del cestino per revocare quella sessione. Il gruppo può anche essere revocato interamente tramite il pulsante "Disconnetti questo dispositivo" in fondo alla lista espansa (la sessione corrente è sempre preservata).

Un pulsante **Disconnetti altre sessioni** in alto revoca _tutte_ le altre sessioni contemporaneamente. Il dispositivo corrente non viene mai toccato. Il conteggio include tutte le sessioni non correnti su tutti i dispositivi.

### Scheda Preferenze

Due schede: **Tema e stile mappa** e **Suoni di notifica**.

La prima scheda incorpora il selettore di tema condiviso e il selettore di stile mappa — gli stessi widget della scheda profilo flottante. Vedi [Themes](../../features/ux/themes.md) per la descrizione completa delle modalità, colori accentati e stili mappa.

La seconda scheda incorpora le impostazioni dei suoni di notifica — suoni per tipo di toast, suono per notifica e cursori di volume indipendenti per toast e notifiche. Vedi [Notifications](../../features/ux/notifications.md) per il selettore completo.

Tutto in questa scheda scrive nel **localStorage** del tuo browser, non sul server. Ciò significa che le preferenze sono per dispositivo e per browser — non ti seguono quando accedi da un altro computer.

## `/profile/customer` — vista lato cliente

Se il tuo account operatore è **anche** collegato a un account rider (cliente) nella stessa installazione di Ridewolf, puoi cambiare persona per vedere come appari dal lato cliente. Il pulsante persona nell'intestazione principale ti porta qui.

### Quando non hai un account cliente

Vedi una scheda di stato vuoto tratteggiata con:

- Un'icona e il titolo "Collega il tuo profilo cliente"
- Una descrizione
- Due pulsanti — **Crea account cliente** e **Collega esistente** (entrambi mostrano attualmente toast "In arrivo"; nessun backend ancora)
- Un avviso di verifica
- Un link "Continua come Operatore" che torna a `/profile/operator`

### Quando hai un account cliente

Due schede: **Panoramica** e **Corse**.

I KPI principali si trasformano in numeri rilevanti per il cliente: **Saldo** (valuta formattata), **Totale corse**, **Valutazione** (1 decimale), **Bonus** (punti).

La scheda **Panoramica** mostra:

- Scheda **Portafoglio** — saldo attuale, punti bonus opzionali (solo se > 0), e metodo di pagamento collegato (marca + ultime 4 cifre + mese/anno di scadenza + tipo di provider) se presente
- Scheda **Statistiche corse** — tre riquadri: Totale corse, Valutazione con una stella (e un sottotitolo "{n} valutazioni"), Punti bonus
- Barra laterale **Info account** — ID Cliente (monospaziato, troncato), Provider, Creato (relativo), Ultima attività (relativo, se presente), Ultima corsa (relativo, se presente)
- Scheda **Dispositivi** — i tuoi dispositivi cliente registrati (iOS / Android / Web) resi dal condiviso `ClientDevicesList`
- Link rapidi **Sicurezza e supporto** — FAQ, Contatta Supporto, Segnala problema (pulsanti segnaposto)

La scheda **Corse** elenca le tue ultime 20 corse (le più recenti per prime), con:

- ID corsa (monospaziato) e ora di creazione (relativa)
- Badge di stato (`completed` solido, `active` secondario, altri contorno)
- Distanza (km), durata (minuti o `Hh Mm`), etichetta veicolo
- Prezzo (valuta formattata)
- Riga di stelle per la valutazione, se presente

Usa un contenitore scorrevole con altezza fissa di 500px e uno stato di caricamento a 4 scheletri. Lo stato vuoto mostra un'icona mappa e "Nessuna corsa ancora".

**Non c'è un modulo di modifica qui** — questo è un riflesso in sola lettura di ciò che appare nella tua Rider App. Il pulsante Modifica nell'intestazione principale attualmente mostra un toast "In arrivo".

## `/profile/legacy` — fallback a pagina singola

`/profile/legacy` è il **vecchio profilo a pagina singola**, mantenuto come fallback e per collegamenti diretti. Comprende quasi tutto in una pagina a scorrimento invece che in schede:

- Una scheda intestazione profilo con avatar, nome, email, badge di stato e pulsanti Modifica / Salva / Annulla
- Scheda **Informazioni personali** — Nome, Cognome modificabili (input testo in modifica); Email in sola lettura e Telefono modificabile
- Scheda **Informazioni account** — ID Utente in sola lettura (troncato + copia), Email, Stato (valore grezzo)
- Scheda **Aspetto** — selettore tema e selettore stile mappa (stessi widget della scheda Preferenze)
- Scheda **Notifiche e suoni**
- Scheda **Sicurezza** — riga password con pulsante Cambia (attualmente non apre la finestra di dialogo)
- Un piè di pagina che mostra la versione dell'app (`CF_PAGES_COMMIT_SHA` primi 7 caratteri, o `DEVELOPMENT_KIT` localmente)

Due avvertenze importanti:

- L'azione **Salva** attualmente mostra un toast "Funzionalità non ancora disponibile" — il backend non ha un endpoint `PATCH /operators/me`, quindi le modifiche a Nome, Cognome e Telefono non vengono effettivamente salvate
- Il caricamento foto è stato rimosso da questa vista; usa il ridisegnato `/profile/operator` e clicca il tuo avatar per aprire la finestra di dialogo di caricamento

Preferisci `/profile/operator` per l'uso quotidiano. Tieni questo URL nei preferiti solo se una futura correzione alla vista ridisegnata richiederà di tornare qui.

## Finestra di dialogo caricamento avatar

Si apre dall'intestazione principale (clicca il tuo avatar) nelle viste ridisegnate.

Accetta:

- Tipi di file: solo `image/png`, `image/jpeg`, `image/jpg` — qualsiasi altro tipo genera un errore "Tipo di file"
- Dimensione massima file: **10 MB** — file più grandi generano un errore "Dimensione file"
- Trascina e rilascia o clicca per selezionare

La finestra di dialogo mostra un'anteprima, il nome del file e una barra di progresso durante il caricamento. La sequenza di caricamento è:

1. `POST` del file → restituisce un `avatarUrl`
2. `PATCH /me` con `{ photo: avatarUrl }` → restituisce il record utente aggiornato
3. Il negozio utente si aggiorna con il nuovo campo `photo`; il nuovo avatar appare immediatamente ovunque venga referenziato

I toast confermano il successo o il fallimento. In caso di successo, la finestra di dialogo si chiude automaticamente.

## Riferimento ai campi (in tutte le rotte)

Un elenco consolidato di cosa è modificabile, dove e come viene validato:

| Campo                         | Modificabile su                | Validazione                                                        |
| ----------------------------- | ------------------------------ | ----------------------------------------------------------------- |
| Avatar / foto                 | Operatore                     | PNG/JPG/JPEG, max 10 MB                                           |
| Nome                         | Legacy (non funzionante — nessun backend) | Nessuna validazione lato client                                   |
| Cognome                      | Legacy (non funzionante — nessun backend) | Nessuna validazione lato client                                   |
| Telefono                     | Legacy (non funzionante — nessun backend) | Nessuna validazione lato client                                   |
| Password attuale             | Operatore → Sicurezza          | Obbligatorio, ≥ 8 caratteri                                       |
| Nuova password              | Operatore → Sicurezza          | Obbligatorio, ≥ 8 caratteri, deve essere diversa dalla attuale    |
| Conferma password           | Operatore → Sicurezza          | Obbligatorio, deve corrispondere alla nuova password             |
| Modalità tema               | Operatore → Preferenze, Legacy | Solo localStorage                                                 |
| Colore tema                | Operatore → Preferenze, Legacy | Solo localStorage                                                 |
| Stile mappa                | Operatore → Preferenze, Legacy | Solo localStorage                                                 |
| Configurazione suono notifiche | Operatore → Preferenze, Legacy | Solo localStorage                                                 |
| Ruolo / Dipartimento / Posizione / Tag | _Non qui_                     | Modificato da un admin tramite [Operators](../../settings/access/operators.md) |

## Flussi di lavoro tipici

- **Reimposta la tua password** — `/profile/operator` → scheda Sicurezza → Cambia → compila tutti e tre i campi → Invia. La finestra di dialogo si chiude e rimani connesso
- **Disconnettiti da un computer pubblico che hai dimenticato** — scheda Sicurezza → espandi il gruppo dispositivi → icona cestino su quella sessione, o "Disconnetti questo dispositivo" per tutte le sessioni su di esso. La tua sessione attuale è sempre protetta
- **Attività sospetta** — scheda Sicurezza → "Disconnetti altre sessioni" in alto revoca tutte le sessioni non correnti con un clic
- **Cambia il tuo avatar** — clicca l'avatar nell'intestazione principale → carica un PNG/JPG fino a 10 MB → Carica
- **Passa il cruscotto alla modalità scura** — scheda Preferenze → Modalità tema = Scuro (o imposta Sistema e lascia decidere il sistema operativo)
- **Aggiungi un segnalibro a una scheda** — ogni scheda ha un hash (`#overview`, `#security`, `#preferences`); copia l'URL con l'hash e usalo come link diretto
- **Vedi te stesso come cliente** — se il tuo account è collegato, clicca il pulsante Cliente nell'intestazione principale → vedi la tua vista nell'app Rider (saldo, corse, dispositivi). Torna indietro allo stesso modo

## Consigli

- **Quello che puoi modificare qui è limitato** — il tuo ruolo, dipartimento, posizione, tag e email sono tutti gestiti nella pagina [Operators](../../settings/access/operators.md) da un admin. Il profilo è solo per il tuo avatar, password, sessioni e preferenze
- **Le preferenze sono locali** — temi e suoni di notifica risiedono in localStorage, non sul server. Se cancelli i dati del browser si resettano; cambi macchina e non vengono trasferite
- **L'hash decide la scheda** — `/profile/operator#security` apre direttamente Sicurezza. Usalo nei link chat così un collega vede la stessa vista che vedi tu
- **Il pulsante Salva della vista legacy è attualmente un vicolo cieco** — fino a quando non sarà disponibile `PATCH /operators/me`, usa la vista operatore ridisegnata per tutto; per cambiare nome chiedi a un admin
- **Le sessioni sono raggruppate per dispositivo** — se vedi una voce che copre più schede, è previsto. Espandi per vedere le singole sessioni
- **La persona cliente è vincolata dai dati** — anche se il pulsante è visibile, non fa nulla di utile a meno che il tuo account non abbia un record `client` collegato. Se non ne hai uno, ignora il pulsante Cliente e rimani su `/profile/operator`
