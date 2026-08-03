# Zone

La pagina Zone (`/zones`) è dove definisci le **regole invisibili della tua area di servizio** — poligoni di parcheggio, divieto, bassa velocità, ricarica e altri che modificano il comportamento di veicoli e clienti quando attraversano un confine. Ogni zona è un singolo poligono sulla mappa più un tipo, uno stato, parametri opzionali (velocità, prezzo, capacità veicolo) e tag.

Le zone influenzano il comportamento a runtime per i [Veicoli](../../operations/fleet/vehicles.md) — entra in un poligono no-ride e il veicolo si spegne; parcheggia dentro un poligono di parcheggio a pagamento e scatta la tariffa.

Permesso richiesto: **Zone** (`u7v8w9`). I sotto-permessi `create` / `edit` / `delete` regolano le azioni corrispondenti.

## Cos'è una zona

Una zona ha quattro parti portanti:

1. **Tipo** — determina il colore e la regola applicata a runtime (vedi tabella sotto)
2. **Poligono** — esattamente un poligono, disegnato sulla mappa; forme concave sono accettate, buchi no
3. **Parametri** — dipendono dal tipo: velocità (bassa velocità), prezzo (parcheggio a pagamento), importo (ricarica), veicoli consentiti (parcheggio, parcheggio a pagamento, riequilibrio)
4. **Stato** — `Attivo` (applicato), `Inattivo` (salvato ma ignorato), `Archiviato` (nascosto dalla maggior parte delle liste)

### Tipi di zona

| Tipo             | Colore    | Cosa fa                                                             |
| ---------------- | --------- | ------------------------------------------------------------------- |
| **No-go**        | Nero      | I veicoli non possono entrare o operare qui                         |
| **No-parking**   | Rosso     | I rider non possono terminare una corsa qui                         |
| **No-ride**      | Viola     | I veicoli si spengono / rifiutano di partire dentro questo poligono |
| **Low-speed**    | Blu       | Velocità massima limitata al valore `speed` configurato (km/h)      |
| **Parking**      | Verde     | Parcheggio designato; capacità veicolo opzionale                   |
| **Paid-parking** | Arancione | Parcheggio con prezzo e capacità opzionale                          |
| **Charge**       | Verde scuro | Zona premio — `amount` applicato quando i rider terminano qui       |
| **Maintenance**  | Rosso scuro | Marcatura interna per operazioni; veicoli dentro esclusi dal flusso rider |
| **Rebalance**    | Blu scuro | Area target per riequilibrio flotta; capacità veicolo opzionale     |

## Modalità di visualizzazione

Un gruppo di toggle nell'intestazione della pagina permette di passare tra tre viste — stessi dati, prospettive diverse.

| Modalità   | Ideale per                                                            |
| --------- | -------------------------------------------------------------------- |
| **Tabella** | Modifiche di massa, ordinamento per nome/tipo/stato, navigazione paginata |
| **Schede** | Scansione visiva con mini-mappa per zona; scorrimento infinito      |
| **Mappa**  | Visualizzare tutte le zone sovrapposte sulla mappa reale — utile per audit di copertura |

## Filtri

| Filtro  | Tipo      | Note                                  |
| ------- | --------- | ------------------------------------ |
| Cerca   | Testo     | Cerca nel nome e nella descrizione della zona |
| Stato   | Dropdown  | `Attivo` / `Inattivo` (o `Tutti`)   |
| Tipo    | Dropdown  | Uno dei 9 tipi (o `Tutti`)           |

I filtri si applicano a tutte e tre le modalità di visualizzazione. La vista Mappa recupera **tutte** le zone corrispondenti (senza paginazione); Tabella e Schede paginano.

## Colonne (vista Tabella)

| Colonna         | Ordinabile? | Contenuto                                                    |
| --------------- | ----------- | ------------------------------------------------------------ |
| **Nome zona**   | ✓           | Etichetta + pillola colorata del tipo; link alla pagina dettaglio zona |
| **Descrizione** | —           | Descrizione opzionale in testo libero                        |
| **Tipo**        | ✓           | Pillola colorata del tipo (vedi tabella tipi sopra)          |
| **Stato**       | ✓           | `Attivo` / `Inattivo` / `Archiviato`                         |
| **Tag**         | —           | Tag applicati alla zona                                      |

## Azioni sulla riga

Un menu a tre puntini per riga. Le azioni disponibili dipendono dai permessi:

| Azione           | Permesso  | Cosa fa                                                   |
| ---------------- | --------- | --------------------------------------------------------- |
| **Visualizza dettagli** | —         | Apre la pagina dettaglio zona (mappa + metadati)          |
| **Modifica**     | `edit`    | Apre il modulo di modifica su geometria/proprietà         |
| **Elimina**      | `delete`  | Rimozione permanente — richiede una conferma tenendo premuto 3 secondi |

## Azioni di massa

Seleziona righe nella vista Tabella per mostrare la barra delle azioni di massa. Tutte le azioni di massa che modificano richiedono la capacità `edit`:

- **Cambia tipo** — ridipingi molte zone a un nuovo tipo contemporaneamente (i parametri si resettano di conseguenza)
- **Cambia limite veicoli** — imposta `allowedVehicles` sulla selezione (rilevante per parcheggio / parcheggio a pagamento / riequilibrio)
- **Cambia valore** — imposta il valore numerico specifico del tipo (velocità / prezzo / importo)
- **Cambia stato** — alterna Attivo ↔ Inattivo in massa
- **Cambia tag** — aggiungi o sostituisci tag sulla selezione
- **Esporta selezionati** — scarica solo le zone evidenziate come JSON (nessun permesso richiesto; lato client)

## Creazione — la procedura guidata in 5 passaggi

`+ Crea` apre un modulo guidato. Puoi tornare indietro liberamente; i salti in avanti si sbloccano solo quando il passaggio corrente è valido.

1. **Nome e descrizione** — `Label` (obbligatorio) e una `Description` opzionale
2. **Classifica** — `Type` (obbligatorio, determina colore e forma del parametro), `Status` (Attivo / Inattivo / Archiviato), `Tags`
3. **Parametri** — input numerici specifici per tipo con un cursore 0–100 per inserimento rapido: velocità (km/h), prezzo, quantità o veicoli consentiti. I tipi senza parametri mostrano un avviso "nessun parametro" e permettono di procedere
4. **Geometria** — disegna esattamente **1 poligono** sulla mappa. Le zone esistenti possono essere attivate come sovrapposizione tratteggiata per evitare sovrapposizioni. Controlli mappa: disegna, modifica, aggiungi punti, annulla (fino a 20 passaggi), elimina, zoom, adatta ai limiti, localizza-me, schermo intero
5. **Revisione** — riepilogo finale in sola lettura di ogni campo più il conteggio dei punti del poligono

Il salvataggio crea la zona e ti porta alla sua pagina di dettaglio.

## Modulo di modifica

`Edit` riutilizza la stessa struttura ma in forma a pagina singola (senza stepper) — modifica l'etichetta, il tipo, lo stato, i parametri, i tag o ridisegna il poligono, poi Salva. La protezione da modifiche non salvate avvisa prima di lasciare la pagina.

## Importa / Esporta

Due pulsanti outline accanto a **+ Crea**:

- **Importa** — scegli un file `.json` esportato in precedenza; il cruscotto valida il contenuto e crea le zone lato server. Richiede la capacità `create`
- **Esporta** — apre una finestra dove scegli cosa scaricare: la pagina corrente, tutte le pagine con i filtri attivi, o tutto. La barra delle azioni di massa offre anche "Esporta selezionati" per le righe evidenziate

## Pagina di dettaglio

Cliccare una riga (o _Visualizza dettagli_) apre la pagina di dettaglio della zona con:

- Anteprima mappa live del poligono
- Scheda info base (etichetta, descrizione, tipo, stato, colore)
- Scheda parametri (velocità / prezzo / quantità / veicoli consentiti, se rilevante)
- Tag
- Timestamp di creazione / aggiornamento
- Pulsanti Modifica ed Elimina nell'intestazione (con permessi)

## Flussi di lavoro tipici

- **Avviare una nuova città** — importa un pacchetto JSON di zone se disponibile, altrimenti disegna prima l'anello no-go, poi i poligoni di parcheggio all'interno
- **Regolare un'area a bassa velocità** — Modifica → passo 3 → aumenta il valore di velocità → Salva. Attivo immediatamente
- **Chiudere un parcheggio per un giorno** — Modifica → Stato = Inattivo → Salva. Riattiva quando il parcheggio riapre
- **Rizonalizzazione dopo un cambiamento cittadino** — seleziona in blocco le zone interessate → Cambia tipo → conferma. I parametri specifici del tipo precedente vengono cancellati automaticamente
- **Audit di copertura** — passa alla vista Mappa, filtra per Stato = Attivo, controlla visivamente per lacune e sovrapposizioni

## Consigli

- **Il tipo determina tutto** — colore, forma del parametro, regola di runtime. Scegliere il tipo sbagliato è la causa più comune di rifacimenti
- **Un poligono per zona** — dividi aree complesse in più zone; l'editor impone un solo poligono
- **Le zone sovrapposte sono permesse** — vince la regola più restrittiva (no-go > no-ride > bassa velocità), quindi non temere di sovrapporre una zona a bassa velocità dentro un poligono di parcheggio
- **Usa la sovrapposizione tratteggiata** — attiva "Mostra zone esistenti sulla mappa" nell'editor per evitare sovrapposizioni accidentali con i vicini
- **Inattivo ≠ Eliminato** — cambia Stato quando vuoi mettere in pausa temporaneamente una zona; Elimina è permanente (con conferma tenendo premuto 3 secondi come sicurezza)
- **Tagga le tue zone** — i tag sono l'unico filtro multi-selezione che persiste tra le modalità di visualizzazione. Usali per raggruppare per quartiere, campagna o proprietà
- **Esporta prima delle modifiche di massa** — un clic nella finestra di esportazione fa il backup dell'intero set, così una modifica di massa errata si può annullare con un Import
