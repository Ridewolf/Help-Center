# Prove di Parcheggio — Elenco

L'elenco delle Prove di Parcheggio (`/support/park-proofs`) è la coda di moderazione per le foto che i rider scattano del loro veicolo in momenti chiave di una corsa. Queste foto dimostrano che il rider ha parcheggiato correttamente (o no), e il compito del tuo team qui è **approvare le foto valide, avvertire o penalizzare quelle non corrette**.

Per la revisione foto per foto (la schermata di moderazione con immagine grande), vedi [Park Proof Review](park-proof-review.md). Per le regole di automazione che gestiscono i casi ovvi senza il tuo intervento, vedi [Auto Review](park-proof-auto-review.md).

Permesso richiesto: **Prove di parcheggio** (`d5e6f7`). Alcune azioni sulle righe richiedono sottopermessi aggiuntivi.

## Come arrivano le prove qui

L'app mobile rider invita l'utente a scattare una foto in tre momenti:

1. **Inizio** — quando sbloccano il veicolo (dimostra che l'unità era in buone condizioni al momento del ritiro)
2. **Parcheggio** — durante una pausa a metà corsa (dimostra che hanno parcheggiato legalmente durante la sosta)
3. **Fine** — quando terminano la corsa (la **principale** — dimostra che hanno lasciato il veicolo parcheggiato correttamente)

La foto viene caricata con metadati GPS e inserita in questa coda con stato **In sospeso**. Auto Review può cambiarlo in _Approvato_ (foto valida) senza intervento dell'operatore; tutto ciò di cui Auto Review non è sicuro finisce qui per la revisione umana.

## Filtri

| Filtro     | Tipo     | Note                                                               |
| ---------- | -------- | ------------------------------------------------------------------- |
| Cerca     | Testo     | Cerca per nome cliente, etichetta veicolo, ID corsa                |
| Intervallo date | Calendario | Selettore da / a; predefinito "tutto il tempo"                    |
| Stato     | Menu a discesa | `In sospeso` / `Approvato` / `Avviso` / `Multato` / `Bloccato` (o `Tutti`) |
| Tipo       | Menu a discesa | `Inizio` / `Parcheggio` / `Fine` (o `Tutti`)                       |

Usa `Stato = In sospeso` come filtro quotidiano di monitoraggio — è la coda di moderazione.

## Colonne

| Colonna      | Ordinabile? | Contenuto                                                   |
| ----------- | --------- | --------------------------------------------------------- |
| **Immagine**   | —         | Miniatura della foto (clicca per aprire la pagina di revisione)    |
| **Utente**    | —         | Nome cliente e avatar; clicca per aprire il profilo cliente  |
| **Veicolo** | —         | Etichetta e modello del veicolo; clicca per aprire il dettaglio veicolo |
| **Corsa**    | —         | ID corsa; clicca per aprire il dettaglio corsa                    |
| **Tipo**    | ✓         | Fase della corsa (`Inizio` / `Parcheggio` / `Fine`)              |
| **Stato**  | ✓         | Pillola di stato (vedi riferimento sotto)                         |
| **Data**    | ✓         | Quando è stata scattata la foto; ordinamento predefinito = più recente prima     |

## Riferimento stato

| Stato       | Colore  | Significato                                                                       |
| ------------ | ------ | ----------------------------------------------------------------------------- |
| **In sospeso**  | Giallo | In attesa di moderazione (tua o di Auto Review)                                  |
| **Approvato** | Verde  | Foto valida — il rider ha parcheggiato correttamente                                        |
| **Avviso**  | Arancione | Foto non perfetta — il rider riceve un avviso ma non è multato                      |
| **Multato**    | Rosso    | Foto negativa — il rider è stato multato (o il sistema l'ha segnalata come candidato a multa) |
| **Bloccato**  | Grigio   | Il rider è stato bloccato a causa di questa prova (violazione grave / ripetuta)     |

Gli stati impostati con le azioni sulle righe e nella pagina di revisione vengono registrati sia nel record della prova che nel [Registro attività](../../operations/customers/client-detail.md#scheda-attività) del cliente.

## Azioni sulle righe

Ogni riga ha un **menu a tre puntini** a destra. Le azioni disponibili dipendono dai permessi:

| Azione        | Permesso    | Cosa fa                                                                                                |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------- |
| **Visualizza**      | `view-detail` | Apre la [pagina di revisione](park-proof-review.md) con immagine completa e contesto |
| **Approva**   | `review`      | Segna la prova come _Approvata_ (nessuna multa, nessun avviso) — tipico per foto valide                                |
| **Avvisa**      | `review`      | Segna come _Avviso_ — il rider viene notificato ma non multato                                                |
| **Apri corsa** | —             | Passa alla pagina dettaglio della corsa correlata (mappa percorso, cronologia, ecc.)                                          |

Le azioni per cui non hai permesso sono nascoste.

L'insieme completo di azioni (Multa, Blocca utente, Crea attività di manutenzione, Chiedi di riparcheggiare) si trova nella **pagina di revisione** — vai lì per tutto ciò che va oltre un rapido approva/avvisa.

## Azioni della pagina (in alto a destra)

- **Auto Review** — apre la [pagina delle impostazioni di Auto Review](park-proof-auto-review.md) per configurare regole che approvano automaticamente le foto ovvie e segnalano automaticamente quelle palesemente errate (questo svuota la coda In sospeso così revisioni solo i casi limite)

## Flussi di lavoro tipici

- **Coda di moderazione quotidiana** — `Stato = In sospeso` → ordina per data dal più vecchio → esamina ciascuno, _Visualizza_ per contesto, _Approva_ / _Avvisa_ a seconda di cosa vedi
- **Indaga un reclamo** — cerca per ID corsa o cliente → trova la prova → _Visualizza_ → confronta la foto con la segnalazione del rider
- **Trova recidivi** — cerca per nome cliente → esamina più prove per individuare un pattern (il registro attività del profilo utente racconterà la stessa storia)
- **Solo fine corsa** — `Tipo = Fine` → rivedi solo le foto di fine corsa (le più importanti; le foto di parcheggio a metà corsa di solito vanno bene)
- **Verifica Auto Review** — filtra `Stato = Approvato` per l'ultimo giorno → controlla a campione per assicurarti che le regole funzionino correttamente

## Suggerimenti

- **La miniatura è sufficiente per la maggior parte delle chiamate** — chiaramente all'interno di una zona, inquadrata dritta, senza ostruzioni — _Approva_ senza aprire. Salva _Visualizza_ per foto ambigue
- **Apri corsa** è la tua scorciatoia per il contesto — se il rider afferma di aver parcheggiato legalmente, la mappa della corsa ti dice dove è effettivamente finito
- **Gli stati sono persistenti** — una volta impostato _Approvato_, il rider smette di ricevere promemoria per quella prova. Non approvare una foto scadente per "liberare la coda" o perderai la possibilità di fare un follow-up
- **Avviso è il tuo "intermedio"** — usalo quando la foto è scadente ma non malevola (il rider era di fretta, il tempo era brutto, ecc.). Avvisi ripetuti portano a multe tramite le regole di Revisione Automatica
- **Usa la Revisione Automatica in modo aggressivo** — la coda cresce rapidamente; più foto ovviamente valide la Revisione Automatica approva da sola, più energia hai per quelle veramente ambigue
- **L'URL è condivisibile** — copia una vista filtrata (es. _prove multate di ieri_) e inviala a un collega per un controllo a campione
