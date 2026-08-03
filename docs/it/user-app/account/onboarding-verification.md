# Onboarding e verifica del Rider

L'onboarding è l'insieme di schermate che un rider completamente nuovo attraversa dopo il primo accesso riuscito, prima di raggiungere la mappa. Alcuni passaggi sono condizionali, quindi il numero di schermate varia tra gli operatori.

Leggi questo prima di rispondere a qualsiasi domanda sulla verifica del rider o sul caricamento dei documenti: la risposta onesta spesso non è quella che il rider si aspetta.

L'accesso in sé è trattato in [Signing in](registration-login.md).

## L'ordine dei passaggi

| # | Passaggio           | Percorso                     | Quando appare                                                            |
| - | ------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| 1 | **Codice invito**   | `/onboarding/invite`         | Attualmente non disponibile nell'app — i rider vanno direttamente a **Informazioni personali** |
| 2 | **Informazioni personali** | `/onboarding/about-me`       | Sempre. **Qui viene creato l'account**                                  |
| 3 | **Patente di guida**| `/onboarding/driver-license` | Solo se abilitato nelle impostazioni della tua azienda (di default non lo è) |
| 4 | **Passaporto**      | `/onboarding/passport`       | Solo se abilitato allo stesso modo                                       |
| 5 | **Permessi**        | `/onboarding/permissions`    | Sempre                                                                   |
| 6 | **Congratulazioni** | `/onboarding/congratulations`| Sempre, poi si passa a `/map`                                            |

Nota l'ordine: la registrazione e i dati personali vengono **prima** dei documenti, e i permessi **dopo** — non il contrario.

## Informazioni personali — il passaggio che crea l'account

Un processo in tre passaggi:

1. **Foto** — opzionale, può essere saltata
2. **Nome e data di nascita** — **Nome** obbligatorio; **Cognome** e **Secondo nome** opzionali; **Data di nascita** obbligatoria e non può essere successiva a oggi
3. **Contatti** — **Email** opzionale; telefono inserito tramite selettore prefisso paese e validato come numero internazionale; la casella di consenso marketing è **obbligatoria** per continuare

Alla conferma l'account viene creato. Se è stata scelta una foto, viene caricata subito dopo — un caricamento foto fallito **non** interrompe la registrazione, l'account viene comunque creato.

La schermata successiva dipende dalle impostazioni della tua azienda: **Patente di guida** se abilitata, altrimenti **Passaporto** se abilitato, altrimenti direttamente a **Permessi**.

### "Qual è la mia password?"

Un rider che si è registrato qui non ha mai scelto una password. Se in seguito vuole usare la scheda di accesso con email e password, deve prima impostare una password tramite **Password dimenticata** — vedi [Signing in](registration-login.md).

## Patente di guida e passaporto

Ognuna di queste schermate è un processo in tre passaggi — foto fronte, foto retro, poi un selfie con il documento — e ogni passaggio accetta una foto scattata con la fotocamera o dalla galleria. Il pulsante **Conferma** rimane bloccato finché non sono presenti tutte e tre le immagini; il rider vede un messaggio "tutte le foto sono obbligatorie" fino ad allora, e il passaggio non può essere saltato.

**Il caricamento dei documenti non è attualmente disponibile nell'app.** Inviare mostra un errore e lascia il rider sulla stessa schermata. Non esiste un tentativo di invio che abbia successo, e nessuna immagine di documento raggiunge i tuoi sistemi.

Cosa significa in pratica:

- Non dire mai a un rider (o a un collega) che un documento è stato ricevuto, è in revisione o è archiviato — nulla è stato caricato
- Un rider bloccato su questa schermata non sta facendo nulla di sbagliato: non è un problema di qualità foto, né della fotocamera, né di rete
- Qualsiasi verifica reale dell'identità deve essere eseguita dal tuo team fuori dall'app
- Se le impostazioni della tua azienda abilitano attualmente questi passaggi, i rider del tuo operatore non possono completare l'onboarding tramite essi. Disattiva i passaggi extra in **Impostazioni → La mia azienda → App → Passaggi extra di registrazione** ([La mia azienda](../../settings/administration/my-company.md)) a meno che tu non abbia un motivo per mantenerli

## Permessi

La schermata richiede tre permessi: **notifiche**, **posizione** e **fotocamera**. **Continua** diventa disponibile solo quando tutti e tre sono concessi.

**Problema noto:** sia **Continua** che **Salta** attualmente riportano il rider al passaggio **Informazioni personali** invece di andare avanti a **Congratulazioni**. Un rider che ha appena concesso tutti e tre i permessi può ritrovarsi all'inizio del processo dei dati personali. Questo è un problema noto nell'app, non un errore del rider — spiegalo invece di far girare il rider a vuoto.

Il permesso di posizione è importante anche oltre l'onboarding: senza di esso, una corsa non può essere avviata. Vedi [Rides](../riding/rides.md).

## Congratulazioni

Una schermata solo di visualizzazione. Cancella i dati di onboarding, mostra un avviso "account in revisione" e offre **Continua**, che apre la mappa.

L'avviso non indica quanto dura la revisione, e nemmeno tu dovresti farlo — non esiste un tempo di risposta pubblicato. E poiché nessun documento è stato caricato, non c'è nulla in coda di revisione.

## Account bloccato — `/onboarding/account-blocked`

Visualizzato quando l'account del rider risulta bloccato. È una schermata solo di visualizzazione che elenca i possibili motivi:

- Violazione dei termini
- Frode
- Ripetuti fallimenti di pagamento
- Comportamento sospetto
- Problemi di sicurezza

Sotto i motivi, un accordion **Contatta supporto** è costruito dagli stessi **Canali di supporto** che configuri per la schermata Supporto — telefono, email, Telegram, WhatsApp e sito web, ciascuno attivato indipendentemente — quindi i canali visualizzati dipendono dalla tua configurazione. È presente un pulsante **Torna al Login**.

Non esiste un flusso di appello all'interno dell'app. L'unica via per il rider è contattare il tuo team tramite uno di questi canali. Dal tuo lato, rivedi e sblocca il cliente dal **Cruscotto** — vedi [Client Detail](../../operations/customers/client-detail.md).

## FAQ

- **Come funziona la verifica del rider?** Non all'interno dell'app. L'account viene creato in **About me**; i passaggi relativi ai documenti non possono essere completati perché il caricamento dei documenti non è attualmente disponibile nell'app. Esegui i controlli di identità al di fuori dell'app.
- **Perché un rider vede un passaggio per il passaporto e un altro no?** I passaggi relativi ai documenti sono per operatore, impostati in **Signup Extra Steps**.
- **Un rider è bloccato sulla schermata della patente o del passaporto.** È previsto. L'invio fallisce sempre in quel punto — non risolvibile dal rider.
- **Il rider può saltare il passaggio del documento?** No. Tutte e tre le immagini sono richieste prima dell'invio, e l'invio poi fallisce.
- **Quanto dura la revisione?** L'app non lo indica, quindi non fornire una durata.
- **Il rider dice che la qualità della foto è stata rifiutata.** L'app non valuta affatto la qualità dell'immagine. Quello che hanno visto è l'errore di caricamento.
- **Quale passaggio crea effettivamente l'account?** **About me**, passaggio 3, al momento dell'invio.
- **La schermata del codice invito non appare mai.** I codici invito non sono attualmente disponibili nell'app.

## Correlati

- [Getting started](../basics/getting-started.md) — la versione breve di questo flusso
- [Signing in](registration-login.md) — metodi di accesso, codici, reset password
- [Profile](profile.md) — cosa può modificare il rider in seguito
- [Support](../help/support.md) — i canali mostrati nella schermata Account Bloccato
