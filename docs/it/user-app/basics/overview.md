# User App — Panoramica

L'app utente (l'app rider) è l'app mobile che i tuoi clienti usano per trovare e utilizzare veicoli condivisi, mantenere il saldo del portafoglio ricaricato, rivedere le corse passate e contattare il tuo team di supporto.

Questo articolo è la mappa di quell'app: cosa fa, dove si trova ogni schermata e quale guida risponde a quale domanda. Usalo come punto di partenza quando un rider scrive e hai bisogno del nome esatto della schermata e dei passaggi precisi.

Per una guida passo-passo rivolta al rider al primo avvio, vedi [Getting started](getting-started.md). Per l'app del personale sul campo, vedi [Service app — Overview](../../service-app/basics/overview.md).

## Cosa può fare l'app

- Mappa veicoli in tempo reale come schermata principale
- Saldo portafoglio con diversi fornitori di ricarica
- Cronologia corse con dettaglio costi per corsa e mappa del percorso
- Chat live con il supporto, più i canali di contatto che abiliti
- Diverse lingue dell'interfaccia, temi chiaro e scuro
- Gestione sessioni per dispositivo

## Come i rider si muovono nell'app

La **mappa** è la schermata principale. Tutto il resto si apre dal **menu laterale**, che il rider estrae dalla mappa — quel cassetto è l'unico contenitore di navigazione dell'app. Non c'è alcuna barra di tab in basso nell'app, quindi non mandare mai un rider a cercarla.

I messaggi di chat dell'operatore possono anche contenere link dell'app che portano il rider direttamente a una schermata (per esempio la schermata Privacy).

## Risposte rapide per attività

### Account, accesso e configurazione

| Domanda del rider                          | Dove si trova la risposta                                         |
| ------------------------------------------- | ----------------------------------------------------------------- |
| Come faccio ad accedere?                    | [Signing in](../account/registration-login.md) — i metodi disponibili dipendono dalle impostazioni della tua azienda, quindi la schermata di login non è la stessa per ogni operatore |
| Ho dimenticato la password                  | [Signing in](../account/registration-login.md)                    |
| Ho aperto l'app da un bot Telegram o Viber | [Signing in](../account/registration-login.md)                    |
| Cosa succede subito dopo il primo accesso? | [Onboarding and verification](../account/onboarding-verification.md) |
| Quali documenti vengono richiesti?          | [Onboarding and verification](../account/onboarding-verification.md) |
| Perché il mio account è bloccato?           | [Onboarding and verification](../account/onboarding-verification.md) — la schermata **Account Bloccato** |
| Prima visita guidata dell'app                | [Getting started](getting-started.md)                             |

### Trovare un veicolo e viaggiare

| Domanda del rider                                          | Dove si trova la risposta            |
| ----------------------------------------------------------- | ------------------------------------ |
| Come faccio a trovare e selezionare un veicolo? Come funziona la tariffa di prenotazione? | [Map](../riding/map.md)  |
| Come faccio a iniziare, mettere in pausa e terminare una corsa? | [Rides](../riding/rides.md)          |
| Perché non posso iniziare una corsa?                       | [Rides](../riding/rides.md) — copre l'assenza del pulsante **Scan**, saldo minimo per iniziare, permesso di localizzazione, distanza dal veicolo, cooldown di prenotazione e foto di inizio non completate |
| Che succede con la foto del parcheggio alla fine?           | [Rides](../riding/rides.md) — incluso il dialogo fuori zona parcheggio |
| Da cosa è composto il costo della mia corsa?               | [Rides](../riding/rides.md) e [History](../money/history.md) |

### Denaro e pagamenti

| Domanda del rider                        | Dove si trova la risposta                                      |
| --------------------------------------- | -------------------------------------------------------------- |
| Come faccio a ricaricare?               | [Wallet](../money/wallet.md) per il punto di ingresso, [Payment methods](../money/payment-methods.md) per la guida completa di ogni flusso di ricarica |
| Come aggiungo una carta?                 | [Payment methods](../money/payment-methods.md)                  |
| Quali fornitori esistono e in cosa differiscono? | [Payment methods](../money/payment-methods.md)          |
| La mia ricarica è bloccata in sospeso / voglio annullarla | [Payment methods](../money/payment-methods.md)         |
| Come funziona la ricarica automatica?  | [Wallet](../money/wallet.md)                                    |

### Cronologia, ricevute e statistiche

| Domanda del rider                                    | Dove si trova la risposta                                  |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| Dove sono le mie corse e i miei pagamenti passati?   | [History](../money/history.md) — due schede, entrambe paginate |
| Ho bisogno di una ricevuta, mappa del percorso e dettaglio costi per una corsa | [History](../money/history.md) — dettaglio corsa       |
| Quali sono i miei totali?                             | [History](../money/history.md). La schermata **Analytics** non è attualmente disponibile nell'app — vedi [Analytics](../money/analytics.md) |

### Profilo, impostazioni e sicurezza

| Domanda del rider                             | Dove si trova la risposta                                |
| --------------------------------------------- | -------------------------------------------------------- |
| Come cambio il mio nome o la foto, o la password? | [Profile](../account/profile.md)                        |
| Come elimino il mio account?                   | [Profile](../account/profile.md) — questo è il flusso operativo. [Privacy](../account/privacy.md) spiega perché il pulsante nella schermata Privacy non è quello da usare |
| Notifiche, lingua, tema, visualizzazione mappa | [Settings](../help/settings.md)                          |
| Su quali dispositivi sono connesso?            | [Sessions](../account/sessions.md)                       |
| Dove si trovano l'informativa sulla privacy / le linee guida sulla sicurezza? | [Privacy](../account/privacy.md)                        |

### Aiuto

| Domanda del rider                      | Dove si trova la risposta               |
| ------------------------------------- | --------------------------------------- |
| Come contatto il supporto?            | [Support](../help/support.md)            |
| Abbonamenti o codice promozionale     | [Subscriptions](../money/subscriptions.md) — attualmente non disponibile nell'app |

## Riferimento schermata

| Schermata            | Percorso                     | Cos'è                                                        |
| -------------------- | ---------------------------- | ------------------------------------------------------------ |
| **Map**              | `/map`                       | Schermata principale — trova e seleziona un veicolo          |
| **Wallet**           | `/wallet`                    | Saldo, bonus, ricarica, ricarica automatica                  |
| **Payment methods**  | `/wallet/payment-methods`    | Carte salvate e ricariche in sospeso                          |
| **History**          | `/history`                   | Schede **Rides** e **Payments**; tocca una corsa per i dettagli |
| **Profile**          | `/profile`                   | Informazioni account, foto, password, eliminazione account   |
| **Settings**         | `/settings`                  | Notifiche, visualizzazione mappa, lingua, tema                |
| **Sessions**         | `/settings/sessions`         | Ogni dispositivo connesso all'account                         |
| **Privacy**          | `/privacy`                   | Informativa sulla privacy e linee guida sulla sicurezza      |
| **Support**          | `/support`                   | Schede **FAQ** e **Contact**, più chat live                  |

## Attualmente non disponibile nell'app

Non promettere queste funzionalità a un rider — non sono attualmente disponibili nell'app:

- **Subscriptions** e **promo codes** — la schermata non può essere aperta
- **Analytics** — indirizza i rider a **History** per i totali
- **Document upload during onboarding** — non dire mai a un rider che il suo documento è stato ricevuto
- **Riding Mode**, **Units**, **Offline Maps**, **invite codes**, **Download my data** e il pulsante **Request Account Deletion** nella schermata Privacy

L'eliminazione dell'account funziona — da **Profile**, vedi [Profile](../account/profile.md).

## Cosa modificano le impostazioni della tua azienda

Diverse parti dell'app variano tra gli operatori perché le configuri nel Cruscotto, in **Settings → My Company → App**:

- **Authentication Methods** — quali schede il rider vede nella schermata di login
- **Signup Extra Steps** — se l'onboarding richiede documenti aggiuntivi
- **Support channels** — quali canali di contatto appaiono nelle schermate Support e Account Blocked
- **Legal & compliance** — i link ai Termini di Servizio e all'Informativa sulla Privacy mostrati nell'app

Vedi [My Company](../../settings/administration/my-company.md) per la parte operatore di queste impostazioni.
