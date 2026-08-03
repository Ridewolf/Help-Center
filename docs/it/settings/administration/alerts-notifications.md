# Avvisi e notifiche

La pagina Avvisi e notifiche (`/settings/alerts-notifications`) è la **console di allerta per l'operatore** — il modo in cui la piattaforma comunica allo _staff_ che qualcosa richiede attenzione. Copre i canali (push / in-app / email / SMS), i fornitori esterni (SendGrid, Twilio, Telegram, Slack, Discord, webhook), le regole che attivano gli avvisi, i modelli di messaggi, le politiche di escalation, chi è iscritto e il registro di consegna.

Questa pagina riguarda gli **avvisi per il team che gestisce la piattaforma**. Per i testi delle notifiche rivolte agli utenti (Ride started, Penalty applied, ecc.), vedere la scheda _Notifications_ di [General](general.md).

> _Nota_: questa pagina è attualmente un **prototipo solo front-end** — le configurazioni dei canali, le regole, le iscrizioni e il registro di consegna sono mantenuti nello stato locale (o inizializzati da `mockData.ts`). _Salva modifiche_ mostra una notifica di conferma ma non invia ancora dati a nessun endpoint backend. La struttura della pagina rispecchia il modello reale ed è sicura da usare come specifica per il lavoro sull'API.

Permesso richiesto: non sono impostati `requiredPermissions` specifici sulla rotta — qualsiasi operatore autenticato può aprirla.

## Barra degli strumenti superiore

L'intestazione della pagina ha quattro pulsanti:

| Azione      | Cosa fa                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| Auto-refresh | Il widget condiviso `AutoRefresh` — qui non fa nulla, presente per uniformità con altre pagine                                        |
| Test all    | Mostra una notifica _"Testing all"_ — segnaposto per "invia un test a ogni canale abilitato"                             |
| Mute 1h     | Notifica _"Silenziato per 1h"_ — segnaposto per un silenziamento globale di 1 ora                                          |
| Maintenance | Pulsante rosso distruttivo — apre un AlertDialog che chiede conferma; confermando mostra una notifica che la manutenzione è abilitata |

## Schede

Sette schede in alto. Ognuna è un sotto-componente separato.

| Scheda        | Scopo                                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| Channels      | Canali integrati (push / in-app / email / SMS) + instradamento per gravità + riepiloghi |
| Providers     | Credenziali fornitori esterni (Email / SMS / Telegram / Slack / Discord / Webhook)  |
| Rules         | Regole di avviso per famiglia di eventi                                            |
| Templates     | Testi delle notifiche per famiglia di eventi × lingua                             |
| Policies      | Catena di escalation, silenziamento automatico, sicurezza del pubblico, oscuramento PII |
| Subscriptions | Chi (ruolo o utente) riceve quali famiglie di eventi su quali canali              |
| Logs          | Registro di consegna in sola lettura (voci inviate / confermate / fallite)         |

### Canali

Tre schede impilate.

**Canali integrati**

- _Push_ — configurazione completa (interruttore abilitato, limite di frequenza, ritentativi, orari silenziosi da/a, pulsante di test).
- _In-app_ — abilitato, limite di frequenza, secondi di auto-chiusura.
- _Email_ — dipende dal provider Email nella scheda Providers. Abilitato, limite di frequenza, ritentativi.
- _SMS_ — dipende dal provider SMS. Abilitato, limite di frequenza, ritentativi, orari silenziosi.

**Mappatura della gravità** — tre menu a tendina che mappano `info` → `inApp` (predefinito), `warning` → `push`, `critical` → `push+email`. Questi sono i canali usati quando una regola ha quella gravità ma non specifica canali precisi.

**Riepilogo (Digest)** — frequenza (off / ogni ora / giornaliero / settimanale) + orario di invio (selettore HH:00).

### Fornitori

Sei blocchi per i fornitori, ognuno con un interruttore di abilitazione e credenziali.

- _Email_ — menu a tendina tipo provider (SMTP / SendGrid / Mailgun), chiave API o credenziali SMTP (input mascherato), dominio mittente.
- _SMS_ — Account SID, token Auth (mascherato), numero mittente — formato Twilio.
- _Telegram_ — token bot (mascherato) + selettore chat ID (lista fissa di tre chat demo: `@ridewolf_alerts`, `@support_team`, `@management`; il pulsante **Test** è un segnaposto).
- _Slack_ — URL webhook + canale.
- _Discord_ — URL webhook.
- _Webhook_ — URL webhook generico + secret di firma.

Ogni blocco fornitore mostra un badge _Abilitato_ accanto al titolo quando l'interruttore è attivo. I pulsanti _Test_ mostrano una notifica.

### Regole

Una tabella di regole di avviso. Colonne: Nome / Famiglia evento / Gravità / Canali / Stato / Azioni (menu a 3 puntini: Modifica / Duplica / Abilita-Disabilita / Elimina). Clicca **+ Crea regola** per aprire il Dialogo Regola — scegli un nome, ambito (globale / zona / ruolo), una o più famiglie di eventi, gravità (info / avviso / critico), canali e flag abilitato.

Regole predefinite: _Payment failures_ (critico, famiglia pagamenti, push+email+telegram) e _Vehicle offline_ (avviso, famiglia veicoli, push+email).

### Modelli

Scegli una famiglia evento + lingua + canale, poi modifica titolo e corpo. Il corpo supporta segnaposto (es. `{{ride.id}}`, `{{amount}}`) che il blocco **Anteprima** espande con un evento di esempio. _Invia test_ mostra una notifica che un test sta per essere inviato al canale selezionato.

### Politiche

Quattro blocchi:

- _Escalation critica_ — menu a tendina catena (es. push → email → telegram → SMS), timeout di conferma in minuti, interruttore richiedi ricevuta di lettura.
- _Silenziamento automatico_ — silenzia ripetizioni: se lo stesso evento si verifica _N_ volte in _M_ minuti, silenzia per _K_ minuti (tre input numerici). Una stringa riassuntiva sotto ripete la regola.
- _Sicurezza del pubblico_ — interruttore _Blocca SMS fuori dagli orari silenziosi_ (sovrascrive gli orari silenziosi per canale specificamente per SMS).
- _Oscuramento dati_ — interruttore _Nascondi PII nei messaggi esterni_; un suggerimento spiega cosa viene mascherato (telefono, email, ultime 4 cifre delle carte, ecc.).

### Iscrizioni

Una tabella delle iscrizioni. Ogni riga associa un destinatario (un Ruolo o un Utente specifico) a una o più famiglie di eventi e canali — ad es. _Ruolo: Admin → sistema + pagamenti → push + email_. Il pulsante **+ Crea** apre una finestra di iscrizione; il menu della riga contiene Modifica / Elimina.

Usa le Iscrizioni per inviare avvisi a persone che non corrispondono a nessun canale fissato in una Regola — le Regole definiscono _cosa_ segnalare, le Iscrizioni definiscono _chi_ lo riceve.

### Log

Tabella di sola lettura dei tentativi di consegna. Colonne: Ora / Evento / Percorso / Canale / Destinatario / Stato (inviato / confermato / fallito) / Latency. Clicca una riga per aprire un toast di dettaglio (segnaposto per un pannello di dettaglio completo). Usalo per confermare che un avviso è stato effettivamente inviato o per debug di un provider fallito.

## Famiglie di eventi

Regole, Modelli e Iscrizioni si basano tutti sulla stessa lista fissa di famiglie di eventi (definita in `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Queste corrispondono approssimativamente ai domini del Cruscotto — scegli la famiglia che corrisponde al tipo di evento su cui vuoi ricevere avvisi.

## Flussi di lavoro

- **Configura gli avvisi email** — Scheda Provider → abilita Email → scegli tipo provider → incolla chiave API → salva → torna a Canali → abilita canale Email → fatto.
- **Ricevi una notifica quando i pagamenti falliscono** — Scheda Regole → modifica _Fallimenti pagamenti_ → assicurati che la gravità sia `critical` e che i canali includano quelli che effettivamente monitori → salva.
- **Blocca lo spam SMS di notte** — Scheda Policy → abilita _Blocca SMS fuori orario silenzioso_ → imposta gli orari silenziosi per canale nella scheda Canali.
- **Invia un riepilogo giornaliero invece di ping** — Scheda Canali → scheda Digest → imposta frequenza su _giornaliero_, orario ad es. 09:00.
- **Aggiungi un nuovo ruolo on-call** — Scheda Iscrizioni → + Crea → scegli il ruolo → famiglie di eventi → canali → salva. Riceveranno gli avvisi futuri corrispondenti.
- **Debug di un avviso mancante** — Scheda Log → cerca l’evento per percorso o ora → se lo stato è `failed`, vai a Provider per controllare le credenziali; se `sent` ma l’utente non l’ha visto, controlla Iscrizioni / orari silenziosi / stato muto.

## Consigli

- **Solo front-end per ora.** Salva mostra un toast ma l’API non esiste ancora — considera questa pagina come la specifica, non come fonte di verità.
- **I pulsanti di test sono segnaposto.** _Testa tutto_, _Silenzia 1h_, _Test_ per canale e la conferma _Manutenzione_ mostrano solo un toast — non inviano messaggi di test né silenziano nulla.
- **La mappatura della gravità è il fallback.** La lista _Canali_ di una Regola prevale se impostata; solo se è vuota o non impostata si usa la mappa di gravità.
- **Il Digest è separato dagli avvisi per evento.** Attivare il digest non silenzia gli avvisi individuali — aggiunge solo il riepilogo periodico.
- **Le Iscrizioni possono indirizzare un utente**, non solo un ruolo. Usalo per escalation occasionali (es. _il capo turno notte riceve tutti gli avvisi `rides` su push_) senza creare un ruolo.
- **Il layout mobile è intenzionalmente di sola lettura.** Tutte le schede su mobile dicono _Usa desktop per configurazione completa_ — la gestione degli avvisi è un lavoro da desktop.
- **La redazione PII è importante per SMS/email.** Se disattivata, i corpi degli avvisi possono esporre numeri di telefono o estremi di carta a provider esterni — lasciala attiva a meno che non ci sia un motivo specifico.
