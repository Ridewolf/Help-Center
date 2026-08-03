# Profilo — Dettagli account, password e cancellazione

Lo schermo **Profilo** (`/profile`) è lo schermo dell'account del rider: ciò che l'operatore sa su di loro, più ogni azione a livello di account — foto, nome, password, sessioni, disconnessione e cancellazione.

Qui avviene anche la cancellazione effettiva dell'account. Il pulsante nella schermata Privacy non è quello da usare — vedi [Privacy](privacy.md).

## Cosa mostra lo schermo

| Campo              | Modificabile? | Note                                              |
| ------------------ | ------------ | ------------------------------------------------ |
| **Foto**           | Sì           | Avatar 96 × 96 con sovrapposizione di una fotocamera per cambiarla |
| **Nome completo**  | Sì           | Visualizzato qui, modificabile nel foglio di modifica |
| Badge di stato     | No           | Leggi l'etichetta così com'è mostrata             |
| **Email**          | No           | Solo visualizzazione                              |
| **Telefono**       | No           | Solo visualizzazione                              |
| **Stato account**  | No           | Solo visualizzazione                              |
| **Membro dal**     | No           | Data di creazione dell'account                    |

La data di nascita **non** è presente in questo schermo. Viene raccolta durante l'onboarding ma non è né mostrata né modificabile qui, quindi non mandare un rider qui per cambiarla.

## Modifica del nome

1. Tocca l'icona **matita**
2. Si apre il foglio di modifica con **Nome** e **Cognome** — e nient'altro. Entrambi sono obbligatori
3. Salva

Email e telefono non sono modificabili qui, e non esiste un flusso in-app per cambiarli. Se un rider ha bisogno di un'email o telefono diversi, il tuo team deve gestirlo dal cruscotto — vedi [Client — Create & Edit](../../operations/customers/client-create-edit.md).

Una particolarità: un rider che ha effettuato l'accesso con Apple o Google potrebbe dover digitare il proprio nome reale, perché il nome restituito da quei servizi non è sempre utilizzabile.

## Cambiare la foto

Toccando l'avatar si apre il foglio foto con tre fonti:

- **Scatta foto** — la fotocamera del telefono
- **Scegli dalla galleria**
- **Scegli file**

Limiti: **JPEG, JPG, PNG o WEBP, massimo 10 MB**. Non c'è un passaggio di ritaglio — la foto viene usata così com'è, quindi avvisa i rider di inquadrare bene prima di caricarla. Una volta terminato il caricamento, la nuova foto sostituisce quella vecchia ovunque nell'app.

## Cambiare la password

Il foglio **Cambia password** richiede tre campi:

| Campo                | Regola                                  |
| -------------------- | --------------------------------------- |
| **Password attuale**  | Obbligatoria                           |
| **Nuova password**    | Deve soddisfare le regole password mostrate |
| **Conferma password** | Deve corrispondere alla nuova password |

Avvisa il rider prima che inizi: **un cambio password riuscito lo disconnette** e lo riporta alla schermata di login con un messaggio di conferma. È un comportamento previsto, non un errore — deve semplicemente effettuare nuovamente l'accesso con la nuova password.

Una password attuale errata mostra un errore inline su quel campo. Qualsiasi altro errore appare come un breve messaggio in cima allo schermo.

## Gestione delle sessioni

**Gestisci sessioni** apre `/settings/sessions`, la lista di tutti i dispositivi connessi all'account. Vedi [Sessions](sessions.md) per la lista dispositivi e le azioni di disconnessione globale.

## Disconnessione

Il pulsante **Esci** termina la sessione su questo dispositivo e riporta il rider all'inizio dell'app. Non influisce sugli altri dispositivi — usa [Sessions](sessions.md) per quelli.

## Cancellazione dell'account — il flusso operativo

1. **Elimina account** appare solo se non è già in corso una cancellazione
2. Toccandolo si apre un dialogo di conferma
3. Alla conferma la cancellazione viene programmata
4. Il pulsante viene sostituito da una casella in sospeso: un'icona orologio, **Programmato per {date}**, e un pulsante **Annulla** se la cancellazione è ancora annullabile

Per annullare, il rider tocca **Annulla**, conferma nel dialogo, e torna il normale pulsante **Elimina account**.

Non ci sono requisiti di saldo in questo flusso — un rider con soldi nel portafoglio può comunque programmare una cancellazione, quindi ricordagli di spendere o recuperare il saldo prima se è importante. Vedi [Wallet](../money/wallet.md).

## Durante una cancellazione in sospeso

La modifica del profilo, il cambio password, il caricamento foto e la gestione delle sessioni sono **tutti disabilitati** mentre una cancellazione è programmata.

Questa è la risposta ogni volta che un rider segnala che i pulsanti sullo schermo Profilo sono grigi: hanno una cancellazione programmata. Annullarla ripristina tutto.

## FAQ

- **Perché il rider non può modificare email o telefono qui?** Il foglio di modifica contiene solo nome e cognome; entrambi i campi di contatto sono solo in visualizzazione e non esiste un flusso in-app per cambiarli.
- **Perché tutti i pulsanti sono disabilitati?** C'è una cancellazione account in sospeso. Annullala.
- **Il rider è stato disconnesso subito dopo aver cambiato la password.** È previsto — un cambio password riuscito forza un nuovo accesso.
- **Cosa significano i valori di stato?** Leggi l'etichetta **Stato account** così com'è mostrata; non mappare a una lista fissa di valori.
- **Un rider chiede della richiesta di cancellazione account dalla schermata Privacy.** La schermata Privacy non ha un pulsante di cancellazione — è solo informativa. Usa **Profilo → Elimina account** — vedi [Privacy](privacy.md).

## Correlati

- [Sessions](sessions.md) — dispositivi connessi all'account
- [Settings](../help/settings.md) — notifiche, lingua, tema, visualizzazione mappa
- [Privacy](privacy.md) — politica sulla privacy e linee guida di sicurezza
- [Signing in](registration-login.md) — reset password per rider che non l'hanno mai impostata
