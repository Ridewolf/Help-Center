# Pagamenti e integrazioni

Le schede **Pagamenti** e **Integrazioni** della pagina [La mia azienda](my-company.md) (`/settings/my-company`, **modalità Avanzata**) sono dove risiedono le credenziali di terze parti: i gateway di pagamento che addebitano i tuoi rider e le integrazioni di servizio che alimentano login, messaggistica e l'assistente AI.

In modalità Avanzata, La mia azienda ha quattro schede — Profilo, Configurazione app, **Pagamenti**, **Integrazioni**. Questo articolo copre le ultime due.

## Scheda Pagamenti

1. **Seleziona la valuta aziendale** — qui si modifica la valuta (e il simbolo derivato), **non nella scheda Profilo**. Il menu a tendina offre 16 codici: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Configura una carta per ogni fornitore di pagamento** — **maib**, **mia**, **Stripe**.
3. Ogni carta ha un interruttore **abilitato**, i propri campi di credenziali e una casella di controllo **predefinita**.

Esattamente **un fornitore agisce come predefinito** per i nuovi addebiti, e deve essere uno dei fornitori abilitati/supportati.

## Scheda Integrazioni

Cinque schede, ciascuna con il proprio interruttore abilitato e credenziali:

| Scheda       | Credenziali                                       | Alimenta                     |
| ------------ | ------------------------------------------------ | ---------------------------- |
| **Telegram** | token bot, nome utente bot                        | login / messaggistica Telegram |
| **WhatsApp** | ID account business, ID numero di telefono, token di accesso | login / messaggistica WhatsApp |
| **Google**   | client ID, client secret                          | accesso Google per i rider   |
| **Apple**    | client ID, team ID, key ID, chiave privata       | accesso Apple per i rider    |
| **OpenAI**   | chiave API                                       | Assistente AI del Cruscotto  |

## Ogni scheda si salva singolarmente

Ogni scheda di fornitore di pagamento e integrazione **si salva individualmente** — nessuna fa parte del salvataggio generale della pagina. Salvare la scheda Profilo o Configurazione app non salva queste schede, e viceversa. **Salva ogni scheda che hai modificato.**

## Relazione con i metodi di login dei rider

I metodi di autenticazione della scheda Configurazione app per Google, Apple, Telegram e WhatsApp funzionano solo una volta che la **scheda Integrazioni corrispondente è abilitata e configurata**. Configura prima l'integrazione, poi abilita il metodo di login.

## Segreti

- I campi segreti sono **visivamente mascherati** in modo da impedire anche ai gestori di password del browser di catturarli o compilarli automaticamente.
- **Quando ruoti un segreto, reinserisci deliberatamente il valore completo** invece di affidarti al segnaposto mascherato.

## Telegram: due impostazioni diverse

Separato dalla scheda Integrazioni Telegram, esiste un flusso di **scoperta OTP-bot Telegram**: inserisci un token bot, clicca su **Controlla chat** e scegli una chat dal menu a tendina popolato. Questo flusso serve per la consegna di password monouso ed è una **impostazione diversa** dalla scheda Integrazioni Telegram — configurare una non configura l'altra.

## Domande comuni

- **Ho cambiato una credenziale ma non è successo nulla.** Ogni scheda si salva singolarmente — conferma di aver salvato quella specifica scheda, non solo la pagina.
- **Il login social non è disponibile per i rider.** La scheda del fornitore deve essere abilitata e configurata qui prima che il metodo di login corrispondente in Configurazione app funzioni.
- **Non riesco a selezionare un fornitore di pagamento predefinito.** Il predefinito può essere scelto solo tra i fornitori effettivamente configurati come supportati.
- **Dov'è il campo valuta?** In questa scheda Pagamenti — non nella scheda Profilo.
- **"Controlla chat" fallisce con un token valido.** Consideralo prima un problema di ambiente/connettività piuttosto che assumere che il token sia errato.
