# Rider App — Mappa, Prenotazioni e Scansione

La mappa (`/map`) è la schermata principale dell'app rider e l'ultimo passaggio dell'onboarding. Mostra tre cose: la posizione del rider, i veicoli disponibili intorno a lui e le zone che hai disegnato per la tua area operativa.

Il personale di supporto trascorre più tempo su questa schermata che su qualsiasi altra, perché il reclamo più comune dei rider — _"non c'è modo di iniziare una corsa"_ — viene quasi sempre risolto qui, in [La barra inferiore è condizionale](#la-barra-inferiore-è-condizionale).

Per la corsa in sé (porte di partenza, pausa, fine, prove fotografiche) vedi [Corse](rides.md). Per il lato operatore delle zone vedi [Zone](../../settings/infrastructure/zones.md).

## Struttura di navigazione

Il pulsante **Menu** apre il drawer laterale — l'unica navigazione dell'app. Non c'è una barra di tab in basso. Il drawer contiene:

| Voce del drawer         | Apre                                         |
| ----------------------- | ------------------------------------------- |
| Riga saldo portafoglio   | [Wallet](../money/wallet.md)                 |
| **Storico**             | [Storico](../money/history.md)               |
| **Supporto**            | [Supporto](../help/support.md)               |
| **Privacy**             | La schermata delle linee guida su privacy e sicurezza |
| **Impostazioni**        | [Impostazioni](../help/settings.md)          |
| **Profilo**             | La schermata del profilo del rider           |

Promozioni e Abbonamenti non sono attualmente disponibili nell'app, e il drawer non ha voci per questi — vedi [Subscriptions & Promo Codes](../money/subscriptions.md).

## Controlli sulla schermata

**Controlli superiori**

- **Menu** — apre il drawer laterale descritto sopra
- **Come guidare** — apre la guida in-app alla guida (i contenuti di guida in-app sono gestiti tramite [Guide rapide](../../settings/content/quick-guides.md))
- **La mia posizione** — recentra la mappa sulla posizione del rider

**Barra inferiore**

| Pulsante       | Quando appare                                                                                   | Cosa fa                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Corsa di gruppo** | Con la barra inferiore                                                                        | Apre il flusso di corsa di gruppo                                                    |
| **Scansiona**  | Con la barra inferiore                                                                          | Apre lo scanner QR (`/ride/start`), con un modulo di inserimento manuale del codice veicolo come fallback |
| **Filtri**     | Solo quando il rider ha tag veicolo privati da filtrare, e non è già in una corsa o in attesa    | Filtra i marker in base a quei tag                                                   |

### La barra inferiore è condizionale

La barra inferiore viene mostrata **solo quando il rider ha accesso al pagamento della corsa** — cioè ha una carta collegata, oppure un fornitore di pagamento che non supporta affatto le carte salvate.

Un rider con **nessuna carta collegata su un fornitore che supporta le carte salvate non vede la barra inferiore**, e quindi non vede né il pulsante **Scansiona** né il pulsante **Corsa di gruppo**. Questo è voluto, ed è la causa più comune del problema "l'app non mi fa iniziare una corsa".

La soluzione: indirizzalo a **Wallet → Gestisci metodi di pagamento → Aggiungi carta**. Vedi [Metodi di pagamento](../money/payment-methods.md).

Se manca il pulsante **Filtri**, il rider semplicemente non ha tag veicolo privati — oppure è già in una corsa attiva o in una prenotazione.

## Trovare un veicolo

1. La posizione del rider appare una volta concessa l'autorizzazione alla localizzazione. Viene richiesta durante l'onboarding e può essere concessa nuovamente dalle impostazioni di sistema del dispositivo.
2. I veicoli disponibili appaiono come marker.
3. Toccare un marker apre la scheda dettagli del veicolo — piani tariffari più **Inizia** e **Prenota**.
4. Pan, pinch-zoom e il controllo **La mia posizione** funzionano come previsto.

### Ciò che un marker mostra dipende in parte dalla scelta del rider

Questi toggle in [Impostazioni](../help/settings.md) cambiano cosa la mappa mostra:

- **Mostra livello batteria**
- **Mostra veicoli promozionali**
- **Mostra prezzi**
- **Zoom automatico**
- **Mappa 3D**

Le zone bonus sulla mappa e il banner del veicolo scontato all'interno della scheda veicolo non sono attualmente disponibili nell'app.

## Zone

Le zone regolano dove un veicolo può essere guidato e dove una corsa può terminare. Toccare una zona apre la scheda informazioni della zona.

Ciò che una specifica zona fa realmente — area limitata, area di divieto di sosta, limite di velocità, sovrapprezzo — dipende interamente da come l'hai configurata in [Zone](../../settings/infrastructure/zones.md). Non esiste un codice colore universale da riferire a un rider; descrivi la tua configurazione.

La regola di zona che i rider incontrano più spesso è il parcheggio: **terminare una corsa fuori da una zona di parcheggio consentita viene rifiutato**, e l'app apre un dialogo dedicato che offre di mostrare le zone sulla mappa. Questo flusso è documentato in [Corse](rides.md#fuori-dalla-zona-di-parcheggio).

## Prenotare un veicolo

**Prenota** è una vera prenotazione con un timer reale, e il prezzo è basato sulla tariffa associata al veicolo:

1. Il rider tocca un marker, poi **Prenota** nella scheda veicolo.
2. La finestra gratuita è il **Tempo di prenotazione** della tariffa, in minuti. Durante questo periodo, la scheda prenotazione conta **in discesa**.
3. Quando la finestra gratuita scade, la prenotazione diventa una **prenotazione a pagamento**: la scheda inizia a contare **in salita**, e si applica il **Prezzo prenotazione a pagamento** per minuto della tariffa.
4. La parte a pagamento della prenotazione appare quindi come una voce separata nel dettaglio costi della corsa terminata.

Note importanti da sapere prima di rispondere a un rider:

- **Non presumere mai "pochi minuti".** Alcune tariffe prevedono lunghi periodi gratuiti — 12 o 24 ore. Leggi la cifra reale dalla tariffa in [Tariffe veicoli](../../settings/infrastructure/vehicle-tariffs.md).
- Se la tariffa lascia vuoto il campo **Tempo di prenotazione**, l'app utilizza un intervallo breve di 3 minuti. Se lascia vuoto il campo **Prezzo prenotazione a pagamento**, si applica una piccola tariffa predefinita al minuto — imposta entrambi esplicitamente così i rider vedono i tuoi numeri.
- Una prenotazione può trovarsi in uno di questi stati: _in sospeso_, _attiva_, _scaduta_, _prenotata_ o _in pausa_.
- La prenotazione **richiede il permesso di localizzazione concesso**, e può comunque essere rifiutata perché il rider è troppo lontano dal veicolo o perché è in corso un periodo di cooldown sulla prenotazione di quel veicolo. Ogni rifiuto genera un proprio dialogo — vedi [Corse](rides.md#perché-un-rider-non-può-avviare-una-corsa).

## Risoluzione dei problemi

| Il rider dice…                      | Cosa controllare                                                                                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Non vedo veicoli"                | Permesso di localizzazione concesso? Poi: il rider si trova in un'area che effettivamente servi?                                                                       |
| "Non c'è il pulsante Scansiona"  | Nessuna carta collegata su un provider che supporta carte salvate. Aggiungi una carta da [Metodi di pagamento](../money/payment-methods.md)                            |
| "Non c'è il pulsante Filtri"      | Il rider non ha tag veicolo privati, oppure è già in una corsa o in attesa                                                                                              |
| "La mappa non si carica"          | Prima la connettività, poi **Impostazioni → Modalità dati** (_bilanciata_ / _bassa_ / _alta_), che controlla la qualità delle tessere della mappa e il dettaglio scaricato |
| "La mappa è lenta / pesante"      | Stesso: abbassa la **Modalità dati** a _bassa_ e attiva **Animazioni ridotte** in [Impostazioni](../help/settings.md)                                                  |
| "Non riesco a iniziare una corsa" | Segui i passaggi in [Corse](rides.md#perché-un-rider-non-può-avviare-una-corsa) in ordine — barra inferiore, piano e pagamento, saldo minimo di partenza, posizione, distanza, cooldown, prove |

## Consigli

- **Controlla la barra inferiore prima di tutto.** Chiedi al rider di inviare uno screenshot della mappa; l'assenza della barra inferiore diagnostica il problema all'istante.
- **Il permesso di localizzazione è la seconda domanda, sempre.** Nessuna posizione significa nessuna prenotazione e, nella maggior parte dei casi, nessun inizio.
- **Le zone significano solo ciò che hai deciso tu.** Prima di dire a un rider "non puoi parcheggiare lì", apri la zona nel Cruscotto e leggi la sua configurazione reale.
- **Le lunghe finestre gratuite di prenotazione sorprendono tutti**, incluso il tuo staff. Conosci il **Tempo di prenotazione** della tua tariffa prima di spiegare un addebito per attesa.
