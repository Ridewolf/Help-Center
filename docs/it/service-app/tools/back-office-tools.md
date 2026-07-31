# Strumenti di Back-Office nell'App di Servizio

Oltre agli schermi sul campo, l'app di Servizio include un set di strumenti di back-office: riproduzione del percorso, analisi e le tre code di supporto. Questo articolo spiega cosa fa ciascuno di questi strumenti nell'app e dove differisce dalla stessa funzione nel cruscotto dell'operatore.

**Tutto ciò che è qui tranne Replay Player è disponibile solo per i proprietari** ed è semplicemente assente dal [navigation drawer](../basics/overview.md#il-menu-di-navigazione) per gli altri operatori — non c'è alcuna voce disabilitata su cui toccare.

## Replay Player

**Replay Player** (`/replay-player`) ricostruisce dove è andato un veicolo in un giorno specifico.

1. **Scegli un veicolo.** Fino a 500 veicoli sono precaricati, ordinati alfabeticamente. Filtra la lista digitando parte di un'etichetta o IMEI.
2. **Scegli un giorno** dal calendario. Non è possibile selezionare date future.
3. L'app carica le coordinate di quel veicolo per l'intero giorno locale. Un giorno senza dati mostra "Nessun dato per questo giorno".

### La mappa

- Le zone sono disegnate sotto
- L'intero percorso appare come una linea sottile e attenuata, colorata in base alla velocità
- La parte già riprodotta appare come una traccia spessa
- Un triangolo verde rotante indica il veicolo
- I marker verdi e rossi indicano l'inizio e la fine del giorno

Una **chase camera** è attiva di default: segue il veicolo e regola lo zoom in base alla velocità. Muovere, zoomare o ruotare la mappa manualmente la disattiva — ricarica il giorno se vuoi riattivarla.

### Controlli

| Controllo          | Dettagli                                                                               |
| ------------------ | ------------------------------------------------------------------------------------- |
| **Scrubber**       | Colorato in base alla velocità, con badge evento per parcheggiato, avvio, avviso velocità e allarme velocità |
| **Zoom timeline**  | Da 1x a 32x, per scegliere un momento preciso in una giornata intensa                   |
| **Velocità di riproduzione** | 1, 2, 4, 8, 16, 32, 64, 128x                                                        |

Scorciatoie da tastiera (utili nella versione web):

- **Spazio** o **K** — play / pausa
- **Freccia sinistra / destra** — spostamento di 10 secondi; tieni premuto **Shift** per un minuto, **Alt** per un'ora, **Ctrl** o **Cmd** per un giorno
- **Home / End** — vai all'inizio o alla fine del giorno
- **Freccia su / giù** — cambia la velocità di riproduzione preimpostata

Il banner dei dati in tempo reale mostra **Velocità** e **Distanza**. Accensione, batteria, connessione e letture GPS non sono attualmente disponibili nell'app — i campi sono mostrati ma senza valori, quindi un campo vuoto non indica un'interruzione dei dati.

Per uno strumento di riproduzione più completo — più veicoli contemporaneamente, riproduzione per corsa, filtro per tag — usa il [Replay Player](../../apps/tools/replay-player.md) del cruscotto.

## Analisi

**Analytics** (`/analytics`, solo per proprietari) è un cruscotto KPI giornaliero: entrate, corse, distanza, durata, ricariche e prezzo medio per corsa, per chilometro e per minuto, ciascuno con una linea di tendenza a 30 giorni, più un grafico a barre orario con selettore di metrica.

Due drill-down, entrambi con preset a 7, 30 e 90 giorni:

| Drill-down                | Cosa mostra                                                            |
| ------------------------- | --------------------------------------------------------------------- |
| **`/analytics/payments`** | Flusso di pagamenti, qualità, saldo, metodi di pagamento e principali pagatori |
| **`/analytics/heatmaps`** | Densità di scansioni QR, inizio corse o fine corse (fino a 5.000 punti) |

Il cruscotto ha le versioni complete di questi report — vedi [Payments report](../../analytics/reports/payments.md) e [Heatmaps](../../analytics/reports/heatmaps.md).

## Supporto — Biglietti

**Support** (`/support/tickets`, solo per proprietari) è la coda dei reclami sui veicoli.

- **Stati**: nuovo, triaggio, in lavorazione, in attesa di info, risolto, ignorato, duplicato
- **Priorità**: da basso a critico
- **Badge conto alla rovescia SLA**: diventa arancione sotto le due ore e rosso una volta scaduto

Il pulsante **veicolo** di un biglietto apre la pagina di quel veicolo, così puoi agire subito sul reclamo. Il pulsante **attività di manutenzione** apre lo schermo Manutenzione dell'app, che qui è una schermata "Prossimamente" (vedi sotto).

I biglietti per un singolo veicolo sono elencati anche nella scheda **Biglietti** della [pagina veicolo](../fleet/vehicle-controls.md#scheda-biglietti), dove **Risolvi tutto** chiude tutti i biglietti contemporaneamente. Per la coda completa con filtri, assegnazioni e storico, usa i [Tickets](../../support/tickets-proofs-chat/tickets.md) del cruscotto.

## Conversazioni

**Conversations** (`/support/dialogs`, solo per proprietari) è un messenger live con i rider: **Prendi** e **Subentra** per reclamare una chat, un compositore di messaggi, un indicatore di digitazione e fino a 5 allegati immagine per messaggio. Se la connessione live cade, l'app torna a ricaricare ogni 15 secondi.

**Inviare una risposta da questo schermo non è attualmente disponibile nell'app.** Leggi le chat qui se ti aiuta sul campo, ma rispondi ai rider dalla pagina [Conversations](../../support/tickets-proofs-chat/conversations.md) del cruscotto.

## Prove di parcheggio

**Parking proofs** (`/support/park-proofs`, solo per proprietari) è una galleria di revisione delle foto scattate dai rider: inizio, parcheggio, fine e selfie. Ogni foto ha un chip di previsione automatica — **parcheggio**, **no parcheggio**, **nessuna corsa** o **non chiaro** — con un valore di confidenza. Pizzica per passare tra layout a 1, 2 e 3 colonne.

Azioni di revisione:

| Azione                   | Cosa fa                                            |
| ------------------------ | --------------------------------------------------- |
| **Approva**              | Segna la foto come valida                           |
| **Avvisa**               | Avvisa il rider; richiede un commento               |
| **Rifiuta** / **Multa**  | Richiede un commento e un importo                    |
| **Blocca**               | Blocca il rider; richiede un commento                |
| **Approva con commento** | Approva e può allegare un codice promozionale opzionale |

L'approvazione con bonus non è attualmente disponibile nell'app.

La coda [Prove di parcheggio](../../support/tickets-proofs-chat/park-proofs.md) del Cruscotto ha l'intero flusso di moderazione, filtri e regole di revisione automatica.

## Manutenzione e riequilibrio

`/maintenance` e `/rebalancing` nell'app di servizio sono schermate "Prossimamente": nessun dato, niente da configurare. **Riequilibrio** appare anche nel menu di navigazione con un badge **Presto**.

Questo è importante quando rispondi a un operatore sul campo: il Cruscotto ha funzionalità reali di manutenzione e riequilibrio, completamente diverse da queste schermate. Non descrivere mai la manutenzione del Cruscotto come se un tecnico potesse usarla nell'app di servizio.

## Problemi comuni

| Sintomo                                                        | Cosa significa                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------- |
| Il banner Ripeti mostra spazi vuoti per accensione o batteria | Queste letture non sono attualmente disponibili nell'app — non è un guasto |
| Ripeti non trova dati per un giorno                            | Il veicolo potrebbe non essersi mosso o non aver segnalato quel giorno — prova un'altra data |
| Mancano Analisi, Supporto, Conversazioni o Prove di parcheggio | Sono disponibili solo ai proprietari                             |
| Il pulsante manutenzione di un ticket porta a "Prossimamente" | Previsto in questa app — usa il Cruscotto per il lavoro di manutenzione |
| Una risposta in chat sembra inviata ma non succede nulla       | Rispondere dall'app non è attualmente disponibile — rispondi dal Cruscotto |
| Approva con bonus non disponibile nelle Prove di parcheggio    | Questa azione non è attualmente disponibile                        |

## Suggerimenti

- **La telecamera di inseguimento è il modo più veloce per rivedere una giornata** — avvia la riproduzione a 8x e rallenta solo intorno ai badge evento sul selettore.
- **Usa la coda ticket dell'app per pianificare un percorso**, poi agisci da ogni pagina veicolo; il punto di forza dell'app è la prossimità, non la burocrazia.
- **Esegui la moderazione e la messaggistica dal Cruscotto.** Le copie di queste code nell'app servono per consultare le informazioni mentre sei in strada.
