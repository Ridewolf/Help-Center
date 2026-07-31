# Temi

Il cruscotto ha tre impostazioni di aspetto indipendenti:

- **Modalità** — chiaro, scuro o seguire il sistema operativo
- **Colore** — il colore accentato usato per pulsanti, link, badge e stati attivi
- **Stile mappa** — le tessere della mappa di base (scelta separata per modalità chiara e scura)

Tutte e tre si trovano nel **Foglio profilo** in basso — clicca il tuo avatar nella barra superiore per aprirlo.

## Modalità (chiaro / scuro / sistema)

Alterna tra tre modalità:

| Icona      | Modalità | Comportamento                                                   |
| ---------- | -------- | -------------------------------------------------------------- |
| 🖥️ Monitor | Sistema  | Segue la preferenza del sistema operativo; cambia automaticamente al cambio del sistema |
| ☀️ Sole    | Chiaro   | Sempre chiaro, ignora il sistema operativo                     |
| 🌙 Luna    | Scuro    | Sempre scuro, ignora il sistema operativo                      |

La modalità **Sistema** è quella predefinita. Se cambi il tema del sistema operativo (es. modalità scura programmata su macOS al tramonto), il cruscotto si adatta immediatamente — senza ricaricare.

## Colore

Il colore accentato influenza pulsanti, link, badge, anelli di messa a fuoco e l'elemento attivo nella barra laterale. Sono disponibili dodici palette preimpostate:

| Colore | Anteprima |
| ------ | --------- |
| Nero   | ⚫        |
| Rosso  | 🔴        |
| Rosa   | 🌹        |
| Rosa chiaro | 🩷    |
| Arancione | 🟠      |
| Giallo | 🟡        |
| Verde  | 🟢        |
| Verde acqua | 🟢     |
| Ciano  | 🔵        |
| Blu    | 🔵        |
| Indaco | 🟣        |
| Viola  | 🟣        |

Scegli quello che trovi più leggibile rispetto alla modalità selezionata (alcuni colori sono migliori su chiaro, altri su scuro).

## Stile mappa

Le pagine che mostrano mappe (Mappa Live, dettaglio Veicolo, editor Zona, percorso della Corsa, ecc.) usano uno stile di mappa di base che puoi scegliere indipendentemente. Il cruscotto mantiene **due preferenze di stile mappa separate** — una per la modalità chiara, una per la modalità scura — così la mappa si abbina al resto dell'interfaccia quando cambi modalità.

- Cambiare modalità (chiaro ↔ scuro) cambia automaticamente allo stile mappa scelto per quella modalità
- Gli stili disponibili dipendono dal tuo fornitore di mappe (MapTiler o altro); tipicamente: Strade, Satellitare, Chiaro, Scuro, All'aperto

## Dove si trovano le preferenze

Tutte e tre le impostazioni sono memorizzate nel **localStorage** del browser con queste chiavi:

| Impostazione      | Chiave di memorizzazione |
| ----------------- | ------------------------- |
| Modalità          | `app-dark-mode`           |
| Colore            | `app-theme`               |
| Stile mappa (chiaro) | `app-map-style-light`  |
| Stile mappa (scuro)  | `app-map-style-dark`   |

Questo significa:

- **Per dispositivo, per browser** — macchina diversa = preferenze diverse
- **Non sincronizzato** con il tuo account — i colleghi con lo stesso account vedono il proprio tema
- **Cancellato con "Cancella dati di navigazione"** per questo sito
- Le finestre **In incognito** partono con i valori predefiniti

## Consigli

- **Inizia con la modalità Sistema** — lascia che sia il sistema operativo a decidere; passa a Chiaro/Scuro solo se preferisci diversamente
- **Abbina lo stile mappa alla modalità** — Satellitare è difficile da leggere in modalità scura; scegli uno stile "Scuro" o "Strade scure"
- **Il colore influisce sul contrasto** — Giallo o Ciano su sfondo chiaro possono essere difficili da leggere; se i pulsanti sembrano "sottili", prova un accento più scuro (Rosso, Blu, Indaco)
- **Un tema non è un permesso** — ogni operatore può scegliere il proprio; i colleghi non vedranno le tue modifiche
