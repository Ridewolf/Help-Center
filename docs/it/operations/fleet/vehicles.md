# Veicoli — Elenco

L'elenco Veicoli (`/vehicles`) è l'inventario dell'intera flotta — ogni monopattino, bici o altra unità, con il suo stato attuale, posizione, batteria, connessione IoT, tag e zona. Questa è la pagina più utilizzata nel Cruscotto: qui inizi per quasi tutte le operazioni sulla flotta.

Per lavorare su un singolo veicolo (stato completo, cronologia, comandi IoT, riproduzione percorso) apri la [pagina dettaglio veicolo](vehicle-detail.md).

Permesso richiesto: **Veicoli** (`k7m8n9`).

## Come arrivano i veicoli qui

I veicoli non compaiono da soli — sono creati e gestiti da te:

1. L'operatore **crea un veicolo** tramite il pulsante _Crea_ (imposta etichetta, modello, dispositivo IoT, stato iniziale)
2. Il veicolo viene registrato su un dispositivo IoT; quel dispositivo inizia a segnalare continuamente **batteria, stato del blocco, ultimo segnale, coordinate GPS**
3. Non appena il dispositivo IoT invia il primo battito cardiaco, la riga in questo elenco si popola con dati in tempo reale — percentuale batteria, ora del segnale, indicatore blocco
4. Gli operatori (e le azioni di massa) **aggiornano stato, tag, zona, impostazioni** durante la vita del veicolo
5. Quando il veicolo viene dismesso, cambi il suo stato in _Magazzino_ / _Manutenzione_ / ecc., oppure lo elimini

L'elenco si aggiorna quando ricarichi o modifichi i filtri; gli aggiornamenti IoT in tempo reale inviati dal backend possono anche aggiornare le righe in loco.

## Modalità di visualizzazione — Tabella vs Mappa

La pagina ha due viste, selezionabili da un controllo in alto:

- **Tabella** — la griglia dati completa con tutti i filtri, ordinamenti e selezioni multiple
- **Mappa** — la stessa flotta proiettata su una mappa dell'area operativa; i veicoli sono puntine colorate per stato con badge batteria

I filtri si applicano a entrambe le viste. La vista Mappa è ottima per individuare cluster, lacune e opportunità di riequilibrio; la Tabella è quella che usi per lavorare con i dati.

## Filtri

| Filtro   | Tipo            | Note                                                                        |
| -------- | --------------- | --------------------------------------------------------------------------- |
| Cerca    | Testo a larghezza piena | Cerca etichetta veicolo, ID, seriale IoT — l'input testo è **ritardato ~300ms** |
| Contachilometri | Menu a discesa | Intervalli distanza totale: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km |
| Stato    | Menu a discesa   | Filtra per stato veicolo (vedi riferimento stato sotto)                     |
| Tag      | Selezione multipla | Filtra per tag applicati al veicolo                                         |

Tutti i filtri sono combinati con AND. I chip filtro appaiono sopra la tabella; l'URL si aggiorna automaticamente.

## Colonne

| Colonna         | Ordinabile? | Contenuto                                                                                  |
| --------------- | --------- | ----------------------------------------------------------------------------------------- |
| **Salute**      | —         | Indicatori compatti di salute IoT (periferia) — piccole icone che riassumono lo stato dei sottosistemi IoT |
| **Codice**      | ✓         | Etichetta veicolo (codice leggibile sull'adesivo), con link alla pagina dettaglio veicolo |
| **Stato**       | ✓         | Pillola di stato (Disponibile, In uso, In carica, ecc. — vedi riferimento sotto)          |
| **Modello**     | —         | Nome modello e miniatura (es. Xiaomi M365)                                               |
| **Blocco**      | —         | Icona blocco — chiuso (bloccato) / aperto (sbloccato) basata sull'ultimo report IoT       |
| **Batteria**    | ✓         | Percentuale batteria con barra colorata (verde ≥ 60%, ambra 30–60%, rosso < 30%)          |
| **Tag**         | —         | Tag applicati a questo veicolo (gli operatori possono modificare)                        |
| **Zona**        | —         | Zona in cui il veicolo si trova attualmente, o "Fuori zona"                            |
| **Ultima corsa**| ✓         | Data/ora in cui il veicolo è stato sbloccato l'ultima volta per una corsa                |
| **Ultimo segnale** | ✓       | Quando il dispositivo IoT ha inviato l'ultimo report (un segnale obsoleto = dispositivo probabilmente offline) |

Le colonne ordinabili sono contrassegnate con ✓ — clicca sull'intestazione. L'ordinamento si riflette nell'URL.

## Riferimento stato

Ogni veicolo ha esattamente uno stato. Lo stato determina il comportamento (se i rider possono noleggiarlo, se scattano avvisi IoT, ecc.):

| Stato                  | Significato                                             |
| ----------------------- | ------------------------------------------------------- |
| **Disponibile**         | Inattivo, noleggiabile, parcheggiato correttamente      |
| **In uso**              | Attualmente in corsa                                    |
| **In carica**           | Alla stazione di ricarica                               |
| **Scarico**             | Batteria troppo bassa per il noleggio                   |
| **Richiede indagine**   | Segnalato da sistema o operatore — richiede revisione manuale |
| **Manutenzione**        | In officina / fuori flotta per riparazione               |
| **Non pronto**          | Creato ma non ancora rilasciato ai rider                 |
| **Riservato**           | Riservato per un rider/prenotazione specifica            |
| **Trasporto**           | In movimento (riequilibrio, raccolta dal campo)          |
| **Magazzino**           | In deposito a lungo termine, fuori operazioni            |
| **Rubato**              | Segnalato rubato / non rintracciato                      |
| **Allerta**             | Allerta critica da IoT o sistema                          |

## Azioni sulla riga

Ogni riga ha un **menu a tre puntini** all'estrema destra. Le azioni disponibili dipendono dai tuoi permessi:

| Azione                  | Permesso             | Cosa fa                                                             |
| ----------------------- | -------------------- | ------------------------------------------------------------------- |
| **Visualizza dettagli** | —                    | Apri la [pagina dei dettagli del veicolo](vehicle-detail.md)       |
| **Visualizza cronologia percorso** | `coordinates-history` | Apri una mappa che riproduce il percorso GPS recente del veicolo   |
| **Apri in Google Maps** | —                    | Apri le ultime coordinate note del veicolo in Google Maps (nuova scheda) |
| **Modifica**            | `edit`               | Apri il modulo di modifica                                          |
| **Cambia stato**        | `edit`               | Apri un piccolo dialog per cambiare lo stato senza uscire dalla lista |
| **Elimina**             | `delete`             | Elimina soft il veicolo (con dialog di conferma)                   |

Le azioni per cui non hai i permessi sono nascoste.

## Azioni di massa

Seleziona uno o più veicoli con le caselle di controllo a sinistra di ogni riga. Compare una **barra delle azioni di massa** in alto con il conteggio selezionato e le azioni:

| Azione di massa      | Permesso      | Cosa fa                                                        |
| -------------------- | ------------- | -------------------------------------------------------------- |
| **Cambia stato**     | `bulk-update` | Apri un dialog e applica un unico stato a tutti i veicoli selezionati |
| **Cambia tag**       | `bulk-update` | Aggiungi o rimuovi tag su tutta la selezione                   |
| **Cambia impostazioni** | `bulk-update` | Applica impostazioni veicolo (es. velocità max, allarmi) a tutti i selezionati |
| **Invia comando**    | `iot-command` | Invia un comando IoT (blocca, sblocca, allarme on/off, riavvia) a tutti |
| **Batch QR**         | —             | Genera un foglio stampabile di codici QR per i veicoli selezionati |
| **Elimina selezionati** | `delete`    | Elimina soft ogni veicolo selezionato (con dialog di conferma)  |

## Azioni della pagina (in alto a destra)

- **+ Crea** — apre il [modulo di creazione veicolo](vehicle-create-edit.md) (articolo separato)
- **Esporta** — scarica la lista filtrata corrente come file (filtri e ordinamento rispettati)
- **Batch QR** (disponibile anche come azione di massa) — apre la procedura guidata per generare codici QR stampabili

## Vista mappa

Quando passi alla Vista mappa:

- I veicoli appaiono come **punti** colorati per stato (verde = Disponibile, blu = In uso, ecc.)
- Accanto a ogni punto c'è un piccolo **badge batteria**
- Clicca un punto per aprire un popover con etichetta, stato, batteria e un link _Visualizza dettagli_
- **I filtri restano attivi** — restringi per stato, tag, ecc. e la mappa si aggiorna
- Pan e zoom con mouse o gesti a due dita

La mappa è alimentata dagli stessi dati della tabella — è una diversa visualizzazione, non un dataset diverso.

## Flussi di lavoro tipici

- **Ribilanciamento di massa** — filtra per `Status = Scarico` + zona, seleziona tutto, _Invia comando → Blocca_ (o _Cambia stato → Trasporto_) prima del ritiro
- **Trova un veicolo bloccato** — ordina per _Ultimo segnale_ ascendente per vedere i segnali più vecchi in cima
- **Individua batterie basse prima che diventino un problema** — ordina per _Batteria_ ascendente; il fondo della flotta è la tua coda di manutenzione imminente
- **Verifica un tag** — filtra per tag e rivedi le righe
- **Preparazione staff sul campo** — filtra per obiettivi del giorno, _Batch QR_ per stampare etichette per nuove unità

## Suggerimenti

- **La ricerca è debounced** — pausa la digitazione per far rispondere il server una sola volta
- **URL = la vista** — copia e condividi link filtrati con i colleghi
- **Colonna salute a colpo d'occhio** — le piccole icone riassumono i sottosistemi IoT; passa sopra un'icona per vedere cosa rappresenta (es. segnale cellulare, stato blocco, lettura sensore)
- **Il colore della batteria è il tuo codice rapido** — una barra rossa nella lista = necessita di ricarica o ritiro a breve
- **Indicatore blocco è l'ultimo report IoT** — può essere datato di qualche secondo; usa _Invia comando → Blocca_ se devi assicurarti dello stato sul dispositivo
