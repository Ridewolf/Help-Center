# Service App — Panoramica, Accesso e Navigazione

La Service app è l'app di Ridewolf per gli operatori sul campo — ciò che un tecnico porta con sé per sostituire batterie, sbloccare monopattini, risolvere guasti e chiudere i biglietti. È un prodotto separato dalla Rider App e dal Cruscotto operatore: ha un proprio accesso e una propria navigazione.

Dopo l'accesso, l'app si apre direttamente sulla mappa della flotta (`/battery-swap`) anziché su una dashboard iniziale, perché sul campo la mappa è il punto di partenza per ogni lavoro.

Dove andare dopo:

- [Mappa della flotta e ricerca QR](../fleet/fleet-map.md) — trova un veicolo
- [Pagina veicolo](../fleet/vehicle-controls.md) — controlli, biglietti, guasti, avvisi
- [Sostituzione batteria](../operations/battery-swap.md) — la sequenza temporizzata di sostituzione
- [Trova monopattino](../operations/finder.md) — radar Bluetooth per gli ultimi metri
- [Modalità batch](../operations/batch-mode.md) — una coda di veicoli da gestire
- [Strumenti back-office](../tools/back-office-tools.md) — replay, analisi, code di supporto

## Accesso

La schermata di accesso (`/login`) viene mostrata solo agli operatori non connessi — se sei già connesso, l'app ti porta direttamente alla mappa della flotta.

1. Inserisci la tua **email di lavoro**. Deve essere un indirizzo completo (con chiocciola e punto), altrimenti il campo viene rifiutato prima dell'invio.
2. Inserisci la tua **password** — almeno 6 caratteri.
3. Invia. Funzionano solo gli account operatore; le credenziali rider vengono rifiutate.
4. Il tuo profilo viene caricato (nome, ruolo, posizione, dipartimento, azienda, permessi) e l'app apre la mappa della flotta.

### Accesso con Google e Apple

I pulsanti **Google** e **Apple** appaiono solo se quel metodo di accesso è abilitato per la tua installazione. L'assenza di un pulsante non è una configurazione per singolo operatore — nessuno nella tua azienda lo vedrà.

- **Nell'app** — toccare il pulsante apre la pagina del provider nel browser del telefono, e l'app attende che il browser restituisca l'accesso. L'attesa scade dopo 5 minuti (con un breve periodo di grazia una volta che l'app torna in primo piano). Se l'app è stata chiusa mentre il browser era aperto, un avvio a freddo completa comunque l'accesso.
- **Nel browser** — l'accesso Google si apre in una finestra popup.

In ogni caso, il resto del flusso è identico a un accesso con password.

## Il menu di navigazione

Ogni schermata ha un pulsante menu che apre il menu di navigazione — un pannello che scorre da sinistra. Contenuti, dall'alto in basso:

| Voce                | Apre                  | Note                                               |
| ------------------- | --------------------- | ------------------------------------------------- |
| **Il tuo profilo**  | `/profile`            | Avatar, nome e email                               |
| **Driver App**      | `/battery-swap`       | La mappa della flotta — "Gestisci la tua flotta in movimento" |
| **Replay Player**   | `/replay-player`      | Riproduci la giornata di un veicolo               |
| **Trova monopattino**| `/finder`            | "Localizza un monopattino via Bluetooth"         |
| **Ribilanciamento** | `/rebalancing`        | Solo proprietario, disabilitato, mostra un badge **Presto** |
| **Supporto**        | `/support/tickets`    | Solo proprietario                                 |
| **Conversazioni**   | `/support/dialogs`    | Solo proprietario                                 |
| **Prove di parcheggio** | `/support/park-proofs` | Solo proprietario                                 |
| **Analisi**         | `/analytics`          | Solo proprietario                                 |

Tre controlli aggiuntivi si trovano in un footer fissato sotto la lista scorrevole:

- **Impostazioni** — apre il menu Impostazioni app (vedi sotto)
- **Preferenze mappa** — apre il pannello delle impostazioni mappa, descritto in [Mappa della flotta](../fleet/fleet-map.md#preferenze-mappa)
- **Esci** — stilizzato in rosso

Due particolarità delle etichette sono utili da ricordare, perché causano la maggior parte delle domande "Non riesco a trovarlo": la mappa della flotta è elencata come **Driver App**, non "Battery Swap", e il radar Bluetooth è elencato come **Trova monopattino**, non "Finder". Ogni voce ha anche una descrizione di una riga sotto l'etichetta.

Le otto voci di navigazione sono una lista piatta, non gruppi annidati — **Supporto**, **Conversazioni** e **Prove di parcheggio** sono pari anche se le loro rotte sono tutte sotto `/support`. La voce corrispondente alla schermata corrente ha uno sfondo accentato.

Due regole spiegano la maggior parte dei report "il menu è diverso sul mio telefono":

- **Le voci riservate al proprietario sono completamente nascoste** per gli altri operatori — non sono disabilitate, quindi non c'è nulla su cui cliccare o chiedere.
- **Le voci disabilitate mostrano un badge Presto** dove normalmente ci sarebbe una freccia.

## Pagina profilo

Apri `/profile` dal pulsante profilo nel menu.

- **Intestazione** — un grande avatar (le tue iniziali se non c'è foto) con un pulsante fotocamera per caricarne una. Solo immagini, massimo 5 MB. Accanto c'è un badge di stato, più un badge proprietario per i proprietari.
- **Account** — ruolo, dipartimento, posizione, telefono, numero di permessi, data di iscrizione e il tuo ID utente con un pulsante copia (utile quando il supporto lo richiede).
- **Spazi di lavoro** — se appartieni a più di un'azienda, cambia qui. L'app si ricarica sotto l'azienda scelta.
- **Sicurezza** — **Blocco app**, **Cambia PIN**, **Cambia password**, **Sessioni attive**.
- **Altro** — **Aspetto e lingua**, che apre lo stesso menu Impostazioni app della voce **Impostazioni** del menu.
- **Esci** in fondo.

### Blocco app

Il **Blocco app** è disponibile solo nell'app installata, quindi la sezione è assente nel browser. Attivandolo parte una breve procedura guidata che registra un PIN e le biometrie del dispositivo. Una volta registrato, usa **Cambia PIN** per sostituire il codice.

### Cambia password

1. Apri **Cambia password** dalla sezione Sicurezza.
2. Inserisci la password attuale, poi quella nuova due volte.
3. Invia.

Tutti e tre i campi richiedono almeno 8 caratteri, la nuova password deve essere diversa da quella attuale e la conferma deve corrispondere. Il dialogo cancella i suoi campi e gli errori ogni volta che si apre e si chiude, quindi nulla di ciò che hai digitato rimane su un telefono condiviso.

### Sessioni attive

Le sessioni sono raggruppate per browser, sistema operativo e produttore del dispositivo. Ogni gruppo mostra:

- Un badge con il conteggio
- La posizione (paese e indirizzo IP)
- Da quanto tempo è stata attiva l'ultima volta
- Un badge **dispositivo attuale** su quello che stai usando

**Revoca** è disponibile su ogni gruppo tranne che sul dispositivo attuale. **Disconnetti altri dispositivi** revoca tutte le altre sessioni contemporaneamente — la risposta più rapida in caso di smarrimento del telefono.

## Pannello Impostazioni app

Un foglio inferiore, aperto dall'elemento **Impostazioni** del pannello o dal pulsante **Aspetto e lingua** della pagina del profilo. Ogni controllo si applica immediatamente; non c'è un pulsante Salva.

| Impostazione      | Opzioni                                                    |
| ---------------- | ---------------------------------------------------------- |
| **Tema**         | Chiaro, Scuro, Sistema                                     |
| **Stile mappa**  | Predefinito, Strada, Satellitare, 3D, Navigazione, Piatto  |
| **Mappe offline**| Scarica la mappa intorno alla tua posizione attuale per l'uso offline |
| **Lingua**       | Auto, English, Română, Russian                             |
| **Il mio marcatore** | Una griglia di 6 icone per come viene disegnata la tua posizione |

**Mappe offline** scarica una regione intorno a dove ti trovi ora e la mantiene in cache. Durante il download vedi un contatore delle tessere scaricate e un pulsante **Annulla**. Disattivare l'impostazione annulla qualsiasi download in corso e cancella la regione in cache.

L'aspetto della mappa per i veicoli (marcatori, sovrapposizioni, raggruppamento, frequenza di aggiornamento) si trova nel foglio separato **Preferenze mappa** — vedi [Fleet map](../fleet/fleet-map.md#preferenze-mappa).

## Disconnessione

**Logout** si trova nel pannello di navigazione e di nuovo in fondo alla pagina del profilo. Disattiva il Blocco app, ti disconnette e ti riporta alla schermata di accesso con la sessione cancellata dal dispositivo.

## Problemi comuni

| Sintomo                                         | Causa                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Nessun pulsante **Google** o **Apple**          | Quel metodo di accesso non è abilitato per la tua installazione         |
| Un elemento di menu che un collega ha manca a te| È riservato al proprietario                                             |
| Un elemento non si apre e mostra **Soon**        | È volutamente disabilitato per ora                                      |
| Nessuna sezione **Blocco app** nella pagina del profilo | Stai usando la versione browser; il Blocco app richiede l'app installata |
| Accesso rifiutato prima che qualcosa venga caricato | La forma dell'email o la password di almeno 6 caratteri non sono valide sul dispositivo |
| Le etichette del menu non corrispondono a quanto ti aspettavi | La mappa della flotta è **Driver App**; il radar Bluetooth è **Find Scooter** |
