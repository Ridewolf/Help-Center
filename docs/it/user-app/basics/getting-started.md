# Iniziare — Nozioni di base sull'App Utente

Questa è la guida da fornire a un nuovo rider: dall'installazione dell'app alla prima corsa. Elenca anche le regole che determinano se una corsa può iniziare, così il tuo staff di supporto può rispondere a "perché non posso guidare?" senza dover indovinare.

Per la mappa a schermo intero dell'app, vedi [Overview](overview.md).

## Cosa può fare un rider

- Trovare veicoli condivisi nelle vicinanze sulla mappa, scansionare o toccarne uno e usarlo
- Mantenere un saldo nel portafoglio e ricaricarlo dall'app
- Consultare le corse passate e i pagamenti precedenti, con dettaglio dei costi per corsa
- Contattare il supporto tramite i canali che abiliti, o tramite chat live
- Gestire l'account: nome, foto, password, dispositivi connessi

Abbonamenti e codici promozionali non sono attualmente disponibili nell'app — vedi [Subscriptions](../money/subscriptions.md).

## Prima di iniziare

- Il rider deve avere l'app del tuo operatore installata su un telefono
- Il rider deve usare uno dei metodi di accesso che hai abilitato in **Impostazioni → La mia azienda → App → Metodi di autenticazione** (vedi [La mia azienda](../../settings/administration/my-company.md))
- Non è necessario configurare una carta o un metodo di pagamento per creare un account — questo avviene più avanti, da **Portafoglio**

## Configurazione iniziale

### 1. Accedi

Non esiste un unico flusso di login fisso. La schermata di accesso mostra una scheda per ogni metodo abilitato, e i metodi possibili sono codice usa e getta via telefono, codice usa e getta via email, codice WhatsApp, email più password, Google, Apple, Telegram e Viber.

Descrivilo a un rider come "accedi con uno dei metodi offerti dal tuo operatore" — non come "inserisci il tuo numero di telefono e aspetta un SMS". I campi per ogni scheda e i passaggi per inserire il codice sono in [Signing in](../account/registration-login.md).

### 2. Completa l'onboarding

Un rider nuovo di zecca viene guidato attraverso l'onboarding prima di raggiungere la mappa. Alcuni passaggi sono condizionali, quindi due rider su operatori diversi possono vedere un numero diverso di schermate. L'ordine è:

1. **Informazioni personali** — un processo in tre fasi: una foto opzionale, poi nome e data di nascita, poi dettagli di contatto più una casella per il consenso al marketing. **Questo è il passaggio che crea effettivamente l'account.**
2. **Patente di guida** — solo se abilitato nelle impostazioni della tua azienda (di default non lo è)
3. **Passaporto** — solo se abilitato allo stesso modo
4. **Permessi** — notifiche, posizione, fotocamera
5. **Congratulazioni** — poi si passa alla mappa

La configurazione di carta o pagamento **non** fa parte dell'onboarding. Un rider aggiunge un metodo di pagamento più tardi, dalla schermata **Portafoglio**, quando vuole ricaricare.

Due cose da sapere prima di guidare un rider nell'onboarding: i passaggi per i documenti non possono essere completati (il caricamento dei documenti non è attualmente disponibile nell'app), e dopo aver concesso i permessi i pulsanti **Continua** e **Salta** attualmente tornano al processo di **Informazioni personali** invece di procedere. Dettagli completi: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Inizia a guidare

L'onboarding termina sulla mappa. Da lì il rider seleziona un veicolo ([Map](../riding/map.md)) e avvia una corsa ([Rides](../riding/rides.md)).

## Le sezioni dell'app

| Sezione             | Percorso                  | Cosa fa il rider lì                                        |
| ------------------- | ------------------------- | ---------------------------------------------------------- |
| **Mappa**           | `/map`                    | Schermata principale — trova e seleziona un veicolo        |
| **Portafoglio**     | `/wallet`                 | Saldo, bonus, ricarica, ricarica automatica                 |
| **Metodi di pagamento** | `/wallet/payment-methods` | Carte salvate, ricariche in sospeso                          |
| **Storico**         | `/history`                | Schede **Corse** e **Pagamenti**; tocca una corsa per dettagli, mappa del percorso e dettaglio costi |
| **Profilo**         | `/profile`                | Informazioni account, foto, password, eliminazione account  |
| **Impostazioni**    | `/settings`               | Notifiche, visualizzazione mappa, lingua, tema              |
| **Sessioni**        | `/settings/sessions`      | Tutti i dispositivi connessi                                |
| **Privacy**         | `/privacy`                | Informativa sulla privacy e linee guida di sicurezza        |
| **Supporto**        | `/support`                | Schede **FAQ** e **Contatti**, più chat live                |

Tutte queste si aprono dal **menu laterale** sulla mappa. Nell'app non c'è una barra di schede in basso.

## Le regole che governano una corsa

Queste sono reali e guidate dalla tua configurazione. Consulta i valori nel Cruscotto invece di citare un numero a memoria.

| Regola                          | Da dove proviene                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Saldo minimo per iniziare**   | Il saldo minimo di partenza della tariffa, applicato solo ai rider senza carta collegata. Quando la tariffa non lo imposta, la regola è semplicemente "saldo superiore a zero". Leggi il valore dalla tariffa — vedi [Tariffe veicoli](../../settings/infrastructure/vehicle-tariffs.md) |
| **Dove può terminare una corsa** | Le tue zone. Terminare fuori da una zona di parcheggio consentita viene rifiutato e l'app mostra un dialogo dedicato — vedi [Zone](../../settings/infrastructure/zones.md) |
| **Foto prima e dopo la corsa**  | Le impostazioni della tua azienda: foto del veicolo e selfie all'inizio della corsa, e foto del parcheggio alla fine. Ognuna può essere abilitata, resa obbligatoria e impostata con un numero di foto. Di default tutte sono abilitate, con una foto e non obbligatorie |

Una regola extra sulle foto da ricordare: quando il selfie all'inizio della corsa è abilitato, riprendere una corsa da una pausa richiede anche un selfie, e **quello non può essere saltato**.

Passo dopo passo per tutto quanto sopra: [Rides](../riding/rides.md).

## Prima di consigliare un rider

- **Vale la pena abilitare le notifiche** — gli interruttori per le notifiche di corsa e promozioni in [Impostazioni](../help/settings.md) sono reali e funzionanti
- **I totali sono disponibili in Storico**, non in una schermata di Analisi
- **Il caricamento documenti non è attualmente disponibile nell'app** — non dire mai a un rider che un documento è stato ricevuto o è in fase di revisione
- **Abbonamenti e codici promozionali non sono attualmente disponibili nell'app**

## Passi successivi

- [Accesso](../account/registration-login.md) — ogni metodo di accesso, campo per campo
- [Onboarding e verifica](../account/onboarding-verification.md) — cosa richiede ogni fase di onboarding
- [Portafoglio](../money/wallet.md) — primo ricarica
- [Supporto](../help/support.md) — come i rider contattano il tuo team
