# Dettaglio corsa

La pagina del dettaglio corsa (`/rides/:id`) è il banco di lavoro per un singolo viaggio. Usala per indagare sui reclami, verificare gli addebiti, eseguire azioni da operatore (pausa, rimborso, archiviazione) e rivedere il registro completo degli eventi.

Di solito ci arrivi cliccando su una riga nella [lista Corse](rides.md) o dal profilo di un cliente.

Permesso richiesto: **Corse** (`i1j2k3`).

## Layout

Dall'alto verso il basso:

1. **Intestazione** — fatti chiave + il pulsante _Azioni_
2. **Schede panoramica** — durata, distanza, costo, stato
3. **Schede info** — info corsa, dettaglio costi, istantanea tariffa
4. **Schede** — Dettagli (mappa percorso + timeline) e Attività (registro completo eventi)

## Intestazione

La striscia superiore identifica la corsa a colpo d'occhio:

- **Pulsante Indietro** (`←`) torna alla lista
- **ID corsa** con icona _Copia_
- **Indicatore di stato** (Attivo, Completato, Annullato, ecc.)
- Link a **Cliente** e **Veicolo**
- **Timestamp di inizio → fine** e **costo totale** in evidenza
- Pulsante **Azioni** a destra — apre il dialogo delle azioni (descritto sotto)

## Azioni

Clicca **Azioni** nell'intestazione per aprire un dialogo con tutte le azioni operatore disponibili per questa corsa. Le azioni si disabilitano in base allo stato della corsa e ai tuoi permessi, con un tooltip che spiega il motivo:

| Azione                | Quando abilitata                         | Permesso        |
| --------------------- | --------------------------------------- | --------------- |
| **Pausa / Riprendi**  | La corsa deve essere attiva per mettere in pausa o riprendere | `pause-unpause` |
| **Termina corsa**     | La corsa deve essere attiva per terminare | `end-ride`      |
| **Visualizza percorso sulla mappa** | Sempre (passa alla scheda mappa)       | —               |
| **Rimborsa corsa**    | La corsa deve essere completata per rimborsare | refund-related  |
| **Invia notifica**    | Sempre (invia una push al rider)         | notification    |
| **Archivia corsa**    | Sempre                                   | archive         |

Passa il mouse su un'azione disabilitata per vedere perché non è disponibile (es. "La corsa deve essere completata per rimborsare").

Il dialogo _Azioni_ nell'intestazione è il **superset** di ciò che è disponibile; il menu a riga nella pagina lista contiene solo le tre più comuni (Pausa / Riprendi / Termina). Per rimborsi, visualizzazione percorso, notifiche push e archiviazione — usa questa pagina.

## Schede panoramica

Una fila di quattro piccole schede sotto l'intestazione fornisce fatti a colpo d'occhio:

- **Durata** — tempo totale della corsa
- **Distanza** — distanza totale percorsa
- **Costo** — costo totale addebitato
- **Stato** — stato attuale della corsa (rispecchia l'indicatore nell'intestazione, più grande e prominente)

## Schede info

Una griglia di tre schede si trova sotto la panoramica, mostrando i dati principali della corsa:

- **Info corsa** — veicolo, cliente, tariffa, ID, timestamp
- **Dettaglio costi** — composizione minuto per minuto del costo (tariffa di partenza, tempo, distanza, modificatori, sconti)
- **Dettagli tariffa** — istantanea della tariffa usata per questa corsa (così puoi vedere cosa è stato effettivamente fatturato al cliente, anche se la tariffa è cambiata dopo)

## Schede

Sotto le schede il dettaglio si alterna tra due schede:

| Scheda       | Contenuto                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dettagli** | Mappa del percorso, timeline degli eventi significativi, schede info complete                                                                             |
| **Attività** | Registro cronologico degli eventi — ogni cambio di stato, segnale e azione di sistema legata a questa corsa — più ampio della timeline Dettagli (utile per il debug IoT) |

### Mappa del percorso

Nella scheda Dettagli, la mappa del percorso mostra la traccia GPS della corsa:

- **Marcatori di inizio / fine** con i rispettivi indirizzi
- **Polilinea** colorata in base alla velocità (tratti lenti vs. veloci)
- **Sovrapposizioni di zona** se la corsa è entrata in aree ristrette
- **Legenda** che spiega la scala dei colori
- **Zoom / panoramica** con mouse o gesti a due dita

### Timeline

Sotto la mappa, una timeline verticale elenca ogni evento significativo della corsa:

- **Inizio corsa** (con veicolo sbloccato)
- **Pause / riprese** (se presenti)
- **Ingressi / uscite da zona**
- **Avvisi di velocità**
- **Fine corsa** (con blocco / prova di parcheggio, se presente)
- **Eventi di pagamento**

Usa la timeline per indagare controversie ("il rider dice che è stato addebitato dopo la fine della corsa") — ogni evento è datato e orario.

### Scheda Attività

La scheda Attività mostra il registro completo degli eventi inclusi azioni a livello di sistema — più ampio della timeline Dettagli. Usalo quando la timeline semplice non ha abbastanza dettagli (es. per il debug tecnico di un problema IoT).

## Flussi di lavoro tipici

- **Indagare un reclamo cliente** — leggi il dettaglio costi, poi la mappa del percorso e la timeline; la timeline raramente mente
- **Verificare una decisione di rimborso** — apri la scheda dettaglio costi; le voci mostrano esattamente cosa ha pagato il cliente, poi clicca _Azioni → Rimborsa corsa_
- **Mettere in pausa e chiamare il cliente** — _Azioni → Pausa_ blocca la corsa; _Azioni → Invia notifica_ avvisa il cliente; _Riprendi_ quando torna
- **Terminare una corsa bloccata** — per corse che non si chiudono mai (connettività persa, cliente ha lasciato il veicolo acceso), usa _Azioni → Termina corsa_ per forzare la chiusura — il sistema userà l'ultima posizione nota per la prova di parcheggio

## Suggerimenti

- **Leggi il tooltip dell'azione disabilitata** — i pulsanti disabilitati non sono rotti; il tooltip indica in quale stato deve essere la corsa
- **Copia l'ID della corsa** dall'intestazione per incollarlo in una conversazione di supporto o in una query backend
- **I dettagli della tariffa mostrano la tariffa _così com'era_** — anche se la tariffa è stata modificata successivamente, lo snapshot è conservato per scopi di audit
- **La finestra Azioni è il menu completo** — non cercare rimborso/archiviazione nella lista; si trovano qui
