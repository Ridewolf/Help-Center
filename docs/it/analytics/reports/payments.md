# Analytics — Pagamenti

La pagina di Analytics Pagamenti (`/analytics/payments`) è il tuo **cruscotto finanziario**: KPI e grafici sul denaro in entrata (ricariche), denaro in uscita (rimborsi), denaro addebitato (addebiti) e lo stato di salute del tuo sistema di pagamento.

Diversamente dallo [Storico pagamenti](../../operations/payments/payments.md), che è un registro per singola transazione, questa pagina è **aggregata** su un intervallo di date per permetterti di individuare tendenze, perdite e anomalie.

Permesso richiesto: **Visualizza Analytics Pagamenti** (`w7x8y9`).

## Intervallo di tempo

Una **barra dell'intervallo di date** si trova in cima alla pagina. Ogni metrica e grafico rispetta questo intervallo:

- Scegli un preset (Oggi, Ultimi 7 / 30 / 90 giorni, Questo / Ultimo mese) o un intervallo personalizzato
- Il badge di confronto sotto le schede metriche indica "vs periodo precedente" — quando scegli _Ultimi 7 giorni_, il confronto è con i 7 giorni precedenti
- L'intervallo è persistente per la sessione: naviga via e torna, il tuo intervallo è preservato

## Sezioni

La pagina è organizzata in **sei sezioni**, ciascuna focalizzata su un diverso aspetto dei pagamenti:

### 1. Flusso

La visione d'insieme — denaro in entrata vs denaro in uscita.

| KPI            | Cosa misura                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Ricariche**  | Denaro accreditato nei portafogli in questo intervallo (manuale + provider)                                                |
| **Rimborsi**   | Denaro restituito ai clienti; mostra un badge _Tasso di rimborso_ (rimborsi / addebiti)                                   |
| **Addebiti**   | Denaro addebitato ai clienti (corse, multe). Include un **filtro tag** per limitare a un tag cliente specifico (es. _VIP_) |
| **Flusso netto** | Ricariche − Rimborsi; positivo = il saldo del tuo portafoglio sta crescendo                                               |

### 2. Qualità

Quanto è sana l'integrazione con il tuo provider di pagamento.

| KPI                 | Cosa misura                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Tasso di successo** | Transazioni completate / tutte quelle tentate — il tuo numero principale di affidabilità                                  |
| **Fallite**          | Conteggio delle transazioni fallite nell'intervallo                                                                      |
| **In sospeso**       | Conteggio delle transazioni ancora in sospeso (confronta con [Webhook in sospeso](../../operations/payments/pending-webhooks.md)) |
| **Rimborsate**       | Conteggio degli addebiti che sono stati rimborsati                                                                        |
| **Motivi di fallimento** | Grafico che suddivide i fallimenti per motivo (rifiuto / 3DS / rete / ecc.)                                            |

Un picco di _Fallite_ + un motivo specifico dominante nel grafico = un'interruzione o problema di integrazione da segnalare.

### 3. Saldo

Lo stato dei fondi detenuti dall'operatore (portafogli dei rider) alla fine dell'intervallo.

| KPI               | Cosa mostra                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| **Saldo**         | Somma di tutti i saldi positivi — denaro che stai effettivamente trattenendo per i rider       |
| **Debito**        | Somma di tutti i saldi negativi — denaro che i rider ti devono                                  |
| **Saldo medio**   | Saldo medio per cliente attivo                                                                  |
| **Utenti**        | Numero di clienti con saldo diverso da zero                                                    |
| **Grafico a intervalli** | Istogramma dei clienti per dimensione del saldo (es. 0–10 / 10–50 / 50–100 / 100+)          |

Usa il _Debito_ come segnale del tuo arretrato di riscossione — un debito elevato indica molte multe o addebiti falliti che necessitano di follow-up.

### 4. Modelli

Modelli comportamentali delle ricariche dei rider — utile per marketing / prodotto.

- **Istogramma delle dimensioni delle ricariche** — come i rider distribuiscono le loro ricariche per importo. La moda dell'istogramma (dimensione più comune) è quella su cui dovrebbero basarsi i tuoi prompt
- **Ricariche per ora** — quando durante il giorno i rider effettuano ricariche. I picchi di solito corrispondono ai picchi di corse (pendolarismo, serate del weekend)

### 5. Metodi

Una tabella suddivisa per **metodo di pagamento / provider**.

- Colonne: Metodo (carta / saldo / portafoglio / ecc.), Importo totale, Conteggio, Transazione media, Tasso di successo
- Utile per individuare provider sotto-performanti (un metodo con basso tasso di successo è il tuo anello debole)

### 6. Utenti

Vista della coorte clienti — chi ti sta pagando.

| KPI               | Cosa misura                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Pagatori unici** | Clienti distinti che hanno pagato nell'intervallo                                           |
| **Nuovi pagatori** | Clienti che hanno pagato per la prima volta in questo intervallo                            |
| **Pagatori abituali** | Clienti che hanno pagato più di una volta in questo intervallo                            |
| **Top pagatori**   | Tabella dei clienti che pagano di più con nome, importo, numero di corse, link al profilo  |

## Flussi di lavoro tipici

- **Revisione settimanale** — preimpostazione _Ultimi 7 giorni_ → scorri ogni sezione una volta. Qualsiasi dato fuori dal nastro di confronto (grande ▲ o ▼) richiede un'analisi più approfondita
- **Post-mortem interruzione** — imposta l'intervallo di date al giorno di un incidente → sezione Qualità → grafico dei motivi di guasto → incrocia con lo [Storico pagamenti](../../operations/payments/payments.md) per le transazioni effettive
- **Analisi approfondita dei tag** — Scheda Addebiti → filtro Tag → scegli un tag come _VIP_ → la metrica Addebiti mostra solo quella coorte; confronta con il numero totale di addebiti per una rapida quota
- **Spinta per le riscossioni** — sezione Saldo → _Debito_ → se è aumentato, approfondisci i singoli clienti tramite la lista Clienti filtrata per saldo negativo
- **Prezzi per il marketing** — Schemi → istogramma dimensione ricarica → imposta la ricarica suggerita nell'app sul bucket più popolare

## Suggerimenti

- **Il nastro di confronto è più utile del numero assoluto** — la cifra assoluta delle entrate dipende dalla dimensione dell'azienda; la variazione % indica se la situazione sta migliorando
- **Intervallo di date persistente** — l'ultimo intervallo selezionato rimane attivo durante la navigazione; se un collega condivide un URL con un intervallo diverso, prevale quello
- **Il filtro Tag si applica solo agli Addebiti** — per vedere le ricariche per tag devi incrociare con la lista Clienti
- **Il grafico dei motivi di guasto è la tua scheda di valutazione del fornitore** — una nuova categoria di motivo che appare improvvisamente di solito indica una modifica di configurazione del fornitore
- **Flusso netto positivo ≠ profitto** — questo è il saldo del portafoglio, non le entrate; non tiene conto di rimborsi che potresti emettere in seguito o saldi non regolati
- **Saldo medio × Utenti ≠ Flusso** — il Flusso è la somma dei positivi; se molti rider sono in debito, la media può essere inferiore a Flusso / Utenti
