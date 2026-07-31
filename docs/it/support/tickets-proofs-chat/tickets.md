# Biglietti — Elenco

L'elenco Biglietti (`/support/tickets`) è la coda di supporto per problemi segnalati riguardo a un veicolo — danni meccanici, guasti elettrici, parti rotte, problemi di sicurezza, ecc. Ogni biglietto è ancorato a un veicolo specifico e contiene una foto, il segnalatore, il tipo di reclamo, un timer SLA e uno stato.

Per l'indagine per singolo biglietto (thread completo, prove, azioni di risoluzione) vedere la **pagina dettaglio biglietto** (aperta cliccando una riga).

Per un'interfaccia coda semplificata, vedere [Ticket Auto Review](ticket-auto-review.md).

Permesso richiesto: **Biglietti** (`a8b9c1`).

## Come appaiono i biglietti qui

I biglietti sono creati da alcune fonti:

1. **Segnalazione rider** — l'app mobile Rider ha un flusso "segnala un problema"; i rider scelgono un tipo di reclamo, scattano una foto, lasciano una nota
2. **Iniziativa operatore** — un operatore apre un biglietto per un veicolo con un problema rilevato (raro; di solito si preferisce il flusso [attività di manutenzione](../../operations/fleet/vehicle-detail.md))
3. **Segnalazione sistema** — regole IoT o di analisi possono generare biglietti automaticamente (es. anomalia batteria)

Ogni nuovo biglietto arriva in questo elenco con uno stato (tipicamente _In sospeso_) e avvia il timer SLA.

## Filtri

| Filtro         | Tipo     | Note                                                                                      |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| Cerca          | Testo    | Cerca ID biglietto, etichetta veicolo, segnalatore, posizione                              |
| Stato          | Dropdown | Lista gestita dal backend (`In sospeso`, `In corso`, `Risoltо`, `Ignorato`, `Duplicato`, ecc.) |
| Tipo reclamo   | Dropdown | 7 tipi — vedere riferimento sotto                                                        |

I filtri si combinano con AND. I chip appaiono sopra la tabella; l'URL riflette lo stato corrente.

## Colonne

| Colonna      | Ordinabile? | Contenuto                                                        |
| ------------ | ----------- | ---------------------------------------------------------------- |
| **Foto**    | —           | Miniatura della foto prova del rider (clicca per ingrandire)     |
| **Veicolo** | —           | Etichetta e modello del veicolo; clicca per aprire dettaglio veicolo |
| **SLA**     | —           | Tempo rimanente fino alla scadenza SLA (diventa rosso se scaduto) |
| **Posizione**| —          | Dove è stato segnalato il problema — coordinate e/o indirizzo    |
| **Segnalatore** | —        | Chi ha segnalato il problema (nome rider o etichetta sistema/operatore) |
| **Stato**   | —           | Pillola di stato con colore (vedi riferimento sotto)             |
| **Date**    | —           | Timestamp di creazione / aggiornamento                            |

## Tipi di reclamo

Sette tipi aiutano a triage i biglietti a colpo d'occhio. Ognuno ha un colore:

| Tipo                  | Colore badge     | Cosa significa di solito                                  |
| --------------------- | ---------------- | --------------------------------------------------------- |
| **Danno meccanico**   | Distruttivo (rosso) | Incidente, telaio rotto, componenti piegati               |
| **Problema elettrico**| Avviso (giallo)  | Problemi con acceleratore, luci, sensori                   |
| **Problema batteria** | Predefinito (blu)| Non si carica, si scarica più velocemente del previsto    |
| **Parti rotte**       | Distruttivo (rosso) | Cavalletto mancante, catarifrangente mancante, freni danneggiati |
| **Problema sicurezza**| Distruttivo (rosso) | Qualsiasi cosa renda il veicolo pericoloso da guidare      |
| **Pulizia**           | Avviso (giallo)  | Sporco, odore, superfici appiccicose — urgenza minore      |
| **Altro**             | Contorno         | Non rientra nelle categorie sopra — leggere la descrizione |

Le categorie rosse di solito richiedono di togliere immediatamente il veicolo dal servizio; giallo/blu possono generalmente aspettare una finestra di servizio.

## Riferimento stato

La lista degli stati è recuperata dal backend, quindi può variare leggermente per ogni deployment. Stati tipici:

| Stato          | Variante          | Significato                                                    |
| -------------- | ----------------- | -------------------------------------------------------------- |
| **In sospeso** | Secondario (grigio)| Appena segnalato, nessuno ha ancora lavorato sul problema      |
| **In corso**   | Predefinito (blu) | Assegnato a un operatore o creata attività di manutenzione     |
| **Risoltо**   | Successo (verde)  | Problema risolto; biglietto chiuso                             |
| **Rifiutato**  | Distruttivo (rosso)| L'operatore ha determinato che non è un problema reale         |
| **Annullato**  | Distruttivo (rosso)| Chiuso senza risoluzione (spesso usato per segnalazioni di bassa qualità) |
| **Archiviato** | Contorno          | Vecchio / storico                                             |
| **Duplicato**  | (chiuso)          | Collegato a un biglietto precedente sullo stesso veicolo       |

Gli stati che contengono _risolto_, _ignorato_ o _duplicato_ sono considerati **chiusi** — non contano più nella coda aperta.

## Gravità

Internamente, i biglietti hanno una gravità (`critical`, `high`, `medium`, `low`) derivata dal tipo di reclamo e da eventuali input di operatore/sistema. La pagina elenco mostra la gravità tramite il **colore del tipo di reclamo** e il **colore del timer SLA** — SLA scaduto su un biglietto critico è la tua massima priorità.

## Azioni sulla riga

Ogni riga ha un **menu a tre puntini** con un solo elemento attivo:

| Azione           | Cosa fa                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| **Visualizza dettagli** | Apre la pagina dettaglio biglietto (thread completo + prove + azioni di risoluzione) |

L'insieme completo delle azioni dell'operatore (Assegna, Blocca veicolo, Crea attività di manutenzione, Accredita utente, Rispondi, Unisci duplicati) si trova nella **pagina di dettaglio del biglietto** ed è attivabile/disattivabile tramite feature flag per ogni distribuzione. Lo scopo della lista è fungere da coda di triage, non da console di risoluzione.

## Azioni della pagina

- **Revisione automatica** — apre la [coda di Revisione Automatica dei Biglietti](ticket-auto-review.md) — revisione semplificata di un biglietto alla volta

## Flussi di lavoro tipici

- **Triaggio giornaliero** — filtra `Stato = In sospeso` → ordina per SLA (dal più vecchio, con scadenza più imminente in alto) → esamina, apri ogni biglietto nel dettaglio, decidi e agisci
- **Triaggio solo critici** — filtra `Tipo di reclamo = Danno meccanico / Problema di sicurezza` → questi sono i biglietti da togliere dal servizio
- **Controllo storico veicolo** — cerca per etichetta veicolo → vedi ogni biglietto mai aperto su questa unità → utile prima di rimetterlo in servizio dopo una riparazione
- **Allarme SLA** — ordina per SLA → i biglietti in cima alla lista sono scaduti → scala immediatamente

## Suggerimenti

- **La foto è il tuo primo segnale** — anche prima di aprire il biglietto, la miniatura ti dice se si tratta di una segnalazione di danno reale o di una sottomissione di bassa qualità
- **SLA rosso == agisci ora** — quando l'SLA diventa rosso hai già superato la finestra contrattuale; questa è la tua coda reattiva
- **Confronta con il veicolo** — clicca sulla colonna veicolo → apri la scheda Avvisi del veicolo → problemi IoT e segnalazioni degli operatori spesso coincidono
- **Attenzione ai duplicati** — più rider spesso segnalano lo stesso monopattino rotto a poche ore di distanza; usa Ricerca veicoli per individuarli prima di risolvere
- **L'URL è condivisibile** — copia una vista filtrata (es. _biglietti meccanici in sospeso_) e inviala al team di manutenzione
