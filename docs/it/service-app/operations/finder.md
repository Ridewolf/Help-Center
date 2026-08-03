# Trova Scooter — Localizzare un Veicolo via Bluetooth

**Trova Scooter** (`/finder`) serve per gli ultimi 30 metri: il GPS indica che lo scooter è qui, ma non è visibile. Invece delle coordinate, il finder ti guida tramite la forza del segnale Bluetooth — esattamente ciò che ti serve quando il GPS ha perso precisione.

Lo schermo è elencato come **Trova Scooter** nel [navigation drawer](../basics/overview.md#il-menu-di-navigazione).

Il flusso ha quattro fasi: **scegli un veicolo → preflight → naviga → radar**.

## 1. Scegli un veicolo e preflight

1. Apri **Trova Scooter**. Il selettore elenca i tuoi veicoli ordinati per etichetta.
2. Tocca il veicolo che stai cercando. Il preflight parte immediatamente.

Il preflight recupera una copia aggiornata di quel veicolo (mai una memorizzata in cache) e verifica che abbia una posizione ultima utilizzabile e che il suo tracciatore sia online.

**Un tracciatore offline non ti blocca.** Ricevi invece un suggerimento: l’ultima posizione nota potrebbe essere obsoleta, ma il Bluetooth può comunque trovare lo scooter una volta che sei vicino. Questo è proprio il senso della funzione — considera l’avviso offline come informazione, non come un vicolo cieco.

## 2. Avvia la ricerca e autorizzazioni

Tocca **Avvia ricerca**. Questo singolo tocco richiede l’accesso alla bussola e poi avvia insieme il tracciamento della posizione, la bussola e la scansione Bluetooth.

La richiesta della bussola deve provenire da un tocco reale — quindi se chiudi per errore la richiesta di autorizzazione, torna al selettore e ricomincia con un nuovo tocco invece di aspettare sulla schermata.

Trova Scooter necessita delle autorizzazioni per posizione, movimento e Bluetooth. Se non succede nulla dopo **Avvia ricerca**, una di queste tre è stata rifiutata.

## 3. Fase di navigazione

La mappa mostra:

- Una linea di percorso da te al veicolo
- Un’etichetta con la distanza, in metri o chilometri
- Una lancetta della bussola che punta al veicolo

Il Bluetooth sta già scansionando in questa fase, silenziosamente, mentre cammini — non devi attivare nulla.

## 4. Fase radar

L’app passa automaticamente al radar nel momento in cui lo scooter viene rilevato via Bluetooth per la prima volta, e mostra una notifica “Scooter rilevato”. Non cambi mai fase manualmente.

Il radar mostra il segnale Bluetooth come un gradiente da freddo a caldo — **freddo è lontano, caldo è vicino** — più la direzione della bussola e la distanza.

**Leggi il radar con il movimento, non con il valore assoluto.** Cammina qualche passo e osserva se il gradiente si scalda; se si raffredda, gira. Quando la lettura della bussola è instabile, lo schermo ti dice di camminare a forma di otto per calibrarla.

L’indicatore del segnale diventa freddo dopo circa 4 secondi senza un nuovo segnale Bluetooth, cosa normale mentre ti muovi dietro ostacoli. Una volta che lo scooter è stato rilevato almeno una volta, il radar resta disponibile per tutta la ricerca.

## Beep

Il pulsante **Beep** fa suonare il localizzatore del veicolo. C’è un cooldown di 10 secondi tra un beep e l’altro, durante il quale il pulsante è disabilitato e mostra un conto alla rovescia.

Questo limite è voluto: tocca una volta, poi ascolta mentre continui a muoverti. Beep ripetuti da fermo non ti dicono nulla di nuovo.

## Problemi comuni

| Sintomo                                    | Cosa fare                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Lo scooter non viene mai rilevato          | La portata del Bluetooth è corta — cammina nell’area invece di stare fermo. L’ultimo punto GPS noto potrebbe essere obsoleto se il tracciatore è offline |
| Il radar non appare mai                     | Lo scooter non è mai stato visto via Bluetooth; l’interruttore ha bisogno di quel primo segnale    |
| Il radar improvvisamente diventa freddo    | La rilevazione si azzera dopo qualche secondo senza segnale — continua a camminare, lo riprenderà  |
| La bussola gira o punta nella direzione sbagliata | Calibra camminando a forma di otto, e allontanati da ringhiere metalliche e auto parcheggiate       |
| Il pulsante **Beep** è disabilitato         | Il cooldown di 10 secondi è in corso                                                              |
| Nulla parte dopo **Avvia ricerca**           | Un’autorizzazione per posizione, movimento o Bluetooth è stata rifiutata — concedila e ricomincia dal selettore |

## Consigli

- **Usa prima l’ultima corsa e la telemetria del veicolo.** Apri la [pagina del veicolo](../fleet/vehicle-controls.md) per verificare se il tracciatore sta effettivamente segnalando prima di passare venti minuti sul campo.
- **Cammina in linea retta, non in cerchio.** Due o tre tratti dritti di 10 metri ti danno più informazioni sulla direzione di una lenta rotazione.
- **Combina beep e radar** — il radar ti dà la direzione, il beep conferma quale dei tre scooter davanti a te è.
- **Segnala ciò che trovi.** Se il veicolo non c’è proprio, imposta il suo stato dalla pagina del veicolo (per esempio **Richiede indagine** o **Rubato**) mentre sei ancora sul posto.
