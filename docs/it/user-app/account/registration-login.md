# Accesso — Codici, Password e Accesso tramite Messenger

Tutto ciò che un rider deve fare prima di raggiungere la mappa: scegliere un metodo di accesso, confermare un codice monouso, compilare un profilo minimo, recuperare una password o arrivare da un bot Telegram o Viber.

Usa questo articolo quando un rider non riesce ad accedere all'app. Cosa succede *dopo* il primo accesso riuscito è trattato in [Onboarding and verification](onboarding-verification.md).

## Quali metodi di accesso vede un rider

Le schede nella schermata di login (`/auth/login`) sono costruite dai **Metodi di Autenticazione** che abiliti in **Impostazioni → La mia azienda → App**. Non tutti i rider vedono tutti i metodi. I metodi possibili sono:

- Codice monouso via **telefono**
- Codice monouso via **email**
- Codice monouso via **WhatsApp**
- **Email e password**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Se un rider dice che manca un metodo, significa che non è abilitato per quell'operatore. Attivalo in [La mia azienda](../../settings/administration/my-company.md) — il rider non può fare nulla dalla sua parte.

## Campi in ogni scheda

| Scheda                   | Campi                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Telefono**             | Numero di telefono (almeno 6 caratteri) più una scelta di consegna — invia il codice via **telefono** o via **WhatsApp** |
| **Email**                | Indirizzo email                                                                              |
| **Password** — accesso   | Email e password                                                                             |
| **Password** — registrazione | **Nome** (obbligatorio, almeno 2 caratteri), **Cognome** (opzionale), email, password    |

Telefono e WhatsApp sono **canali di consegna separati**. Un rider che aspetta un SMS mentre la scelta di consegna è impostata su WhatsApp aspetterà all'infinito.

I pulsanti **Google** e **Apple** appaiono quando quei metodi sono abilitati. Se un rider esce dalla schermata del provider, non succede nulla e non viene mostrato alcun errore — è previsto, hanno semplicemente annullato.

## Rider nuovo o rider di ritorno

Prima di inviare un codice, l'app verifica se il contatto appartiene a un account esistente.

- **Rider di ritorno** — il codice viene inviato immediatamente
- **Rider nuovo** — appare prima un breve dialogo di registrazione che raccoglie **Nome**, **Cognome** e il contatto mancante: un'email se il codice viene inviato al telefono, un telefono se il codice viene inviato all'email

## Il controllo di sicurezza

Un CAPTCHA deve caricarsi nella schermata di login prima che un codice monouso possa essere richiesto. Se non si carica — rete bloccata, motore browser molto vecchio, ad blocker nel browser in-app — la richiesta del codice non può essere inviata. Fai riaprire l'app al rider con una connessione normale.

## Inserimento del codice monouso — `/auth/otp`

1. Il rider digita il codice — esattamente **6 cifre**, solo cifre
2. **Reinvia** diventa disponibile quando il conto alla rovescia a schermo raggiunge zero
3. Sul canale telefonico, i telefoni supportati compilano automaticamente il codice e lo inviano

Cosa succede dopo:

- Un **rider nuovo** continua alla schermata **Completa profilo**
- Un **rider di ritorno** entra direttamente nell'app

## Completa profilo — `/auth/complete-profile`

Mostrato solo ai rider nuovi. Richiede:

- **Nome** — obbligatorio, almeno 2 caratteri
- **Cognome** — opzionale
- Il contatto mancante — un'email se il codice è arrivato via telefono, un telefono se il codice è arrivato via email

I valori già raccolti sono precompilati, e il modulo si invia automaticamente quando sia il nome che il contatto sono già presenti. È disponibile un pulsante **Salta**.

Se in seguito manca il numero di telefono di un rider, fagli controllare la schermata **Profilo** invece di presumere che questo passaggio lo abbia salvato — vedi [Profile](profile.md).

## Rider che non hanno mai scelto una password

Un rider che ha creato il proprio account tramite onboarding non è mai stato invitato a scegliere una password. Se poi vuole accedere nella scheda **Password**, deve prima impostare una password tramite **Password dimenticata**. Non dire a un rider di "provare semplicemente la loro password abituale".

## Password dimenticata — `/auth/forgot-password`

Un campo: l'email dell'account. Dopo l'invio, la schermata mostra uno di tre esiti, che significano cose diverse:

| Cosa vede il rider     | Significato                                   |
| --------------------- | --------------------------------------------- |
| **Messaggio verde**   | La richiesta di reset della password è stata inviata con successo |
| **Conto alla rovescia ambra** | Troppi tentativi da questo dispositivo — attendi che il timer finisca |
| **Errore rosso**      | La richiesta stessa è fallita — riprova       |

Il conto alla rovescia ambra è mantenuto sul dispositivo del rider, quindi non lo segue su un altro telefono.

## Reimposta password — `/auth/reset-password`

Il rider deve aprire questa schermata dal link nell'email di reset. Aprirla senza un link valido lo riporta a **Password dimenticata** con un avviso "link scaduto" — richiedi una nuova email.

Nella schermata il rider digita una nuova password e una conferma. Le regole della password sono mostrate in tempo reale mentre digita, e i due campi devono corrispondere prima che il modulo possa essere inviato.

## Accesso tramite Messenger (Telegram / Viber) — `/auth/messenger-callback`

Quando un rider parte dal tuo bot Telegram o Viber, il link del bot apre una pagina ponte, che apre l'app, che accede il rider e lo porta dentro l'app.

Due errori hanno messaggi propri:

- **Account bloccato** — il rider viene portato alla schermata **Account bloccato**, vedi [Onboarding and verification](onboarding-verification.md)
- **Accesso rider richiesto** — l'account esiste ma non è un account rider per questo operatore

Qualsiasi altro caso mostra un messaggio generico di "login non valido"; fai ricominciare il rider dal bot con un link nuovo.

## Limiti di frequenza

I limiti sui codici monouso sono impostati dal server, non dall'app. La schermata mostra un conto alla rovescia basato sul tempo di attesa restituito dal server. **Comunica il conto alla rovescia al rider — non indicare mai un numero fisso di minuti**, perché non è fisso.

## Risoluzione dei problemi

| Sintomo                          | Cosa significa e cosa fare                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Un metodo di accesso manca       | Non è abilitato nei tuoi **Metodi di autenticazione**. Abilitalo in [La mia azienda](../../settings/administration/my-company.md) |
| Il codice non è mai arrivato     | Attendi il conto alla rovescia, poi **Reinvia**. Verifica che la scelta di consegna nella scheda **Telefono** sia quella che il rider si aspetta — telefono e WhatsApp sono canali separati |
| "Troppi tentativi"              | Leggi il conto alla rovescia sullo schermo; la durata dell'attesa è stata impostata dal server    |
| La richiesta del codice non parte | Probabilmente il CAPTCHA nella schermata di login non si è caricato                             |
| Il rider non conosce la propria password | Probabilmente non l'ha mai impostata. Fagli usare **Password dimenticata**                  |
| Il link di reset è scaduto       | Il rider viene riportato a **Password dimenticata**; richiedi un link nuovo                      |
| Schermata **Account bloccato**   | Vedi la sezione account bloccato di [Onboarding and verification](onboarding-verification.md)    |
| Accesso effettuato ma nulla si carica | Controlla [Sessioni](sessions.md) — se l'account ha una cancellazione in sospeso, alcune parti dell'app sono limitate; vedi [Profilo](profile.md) |
