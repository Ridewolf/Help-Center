# Revisione Automatica Biglietti

La pagina Revisione Automatica Biglietti (`/support/tickets/auto-review`) è un'**interfaccia di coda semplificata** per lavorare sui biglietti in sospeso uno dopo l'altro, senza tornare alla lista tra una decisione e l'altra.

Proprio come in [Park Proof Auto Review](park-proof-auto-review.md), "Auto" qui significa **avanzamento automatico**: dopo ogni azione la pagina carica il biglietto in sospeso successivo così puoi continuare a moderare senza interrompere il flusso.

Vi si accede dal pulsante **Revisione Automatica** nella [lista Biglietti](tickets.md).

Permesso richiesto: **Biglietti** (`a8b9c1`).

## Come funziona

1. La pagina carica la **coda corrente dei biglietti in sospeso** all'apertura
2. Vedi il primo biglietto — foto di prova, info biglietto e pulsanti di azione
3. Scegli un'azione (Risolvi / In Lavorazione / In Attesa Info / Ignora / Duplicato) o Salta
4. La pagina **avanza automaticamente** al biglietto in sospeso successivo
5. Ripeti finché la coda non è vuota
6. Quando è vuota, la pagina passa a uno **stato di attesa** con un conto alla rovescia che interroga per nuovi biglietti

Il tuo punto è la coda dei biglietti in sospeso stessa — chiudere la scheda e riaprirla non fa perdere i progressi, riprendi semplicemente dal prossimo biglietto in sospeso quando si carica.

## Layout

Tre colonne su schermi larghi, impilate su schermi stretti:

| Colonna      | Larghezza | Contenuti                                                             |
| ------------ | --------- | -------------------------------------------------------------------- |
| **Immagine** | 5/12      | Foto di prova zoomabile + timestamp                                  |
| **Azioni**   | 4/12      | Cinque pulsanti per cambiare stato + Salta + Commento               |
| **Info**     | 3/12      | Scheda info biglietto con stato, tipo di reclamo, veicolo, segnalatore, date |

Una barra di progresso in alto mostra quanto sei avanzato.

## Intestazione

- **Titolo** "Revisione Automatica Biglietti"
- **Sottotitolo** con progresso: `Revisionando X di Y · T-12345`
- Pulsante **Salta** (in alto a destra) — passa oltre il biglietto corrente senza prendere una decisione (il biglietto resta _In sospeso_)
- **Freccia indietro** — torna alla [lista Biglietti](tickets.md)

## Pulsanti di azione

Cinque transizioni di stato, più Salta e un Commento opzionale:

| Pulsante        | Nuovo stato    | Quando usarlo                                                              |
| --------------- | -------------- | -------------------------------------------------------------------------- |
| **Risolvi**     | _Risolto_      | Il problema è stato risolto (o non era reale) — chiude il biglietto        |
| **In Lavorazione** | _In corso_     | Il problema è reale, hai avviato una soluzione (attività di manutenzione, follow-up) |
| **In Attesa Info** | _In attesa info_ | Hai bisogno di più informazioni dal rider prima di decidere — il rider riceve una richiesta |
| **Ignora**      | _Ignorato_     | Non è un problema reale (segnalazione di bassa qualità, bersaglio errato, spam) |
| **Duplicato**   | _Duplicato_    | Esiste già un altro biglietto per lo stesso veicolo / problema            |
| **Salta**       | (invariato)    | Non decidere; passa al biglietto successivo                               |
| **Commento**    | (qualsiasi azione) | Nota opzionale allegata all'azione selezionata                            |

Ogni clic viene registrato immediatamente e avanza al biglietto successivo. Digita prima il **commento** se vuoi allegarlo.

### Quando usare quale stato di chiusura

- **Risolvi** — la cosa rotta è stata riparata (o la segnalazione era un malinteso chiarito controllando il veicolo)
- **Ignora** — la segnalazione era errata / falsa / fuori bersaglio; il rider vede l'ignorato nella sua app
- **Duplicato** — collega all'originale; il backend gestisce la catena così la risoluzione di uno chiude tutti

_Risolvi_, _Ignora_ e _Duplicato_ chiudono il biglietto. _In Lavorazione_ e _In Attesa Info_ lo mantengono aperto in un'altra categoria.

## Colonna info

Una scheda **Info Biglietto** a destra mostra i dati strutturati dietro la foto:

- **Stato** — pillola dello stato corrente
- **Tipo di reclamo** — pillola colorata (danno meccanico, elettrico, batteria, ecc.)
- **Veicolo** — etichetta e link
- **Segnalatore** — nome (rider) o etichetta (sistema / operatore)
- **Posizione** — indirizzo / coordinate
- **Creato / aggiornato** — timestamp
- **SLA** — tempo rimanente (o badge "scaduto")

Leggi questa scheda prima di decidere — ti racconta tutta la storia senza lasciare la pagina.

## Stato di attesa

Quando la coda si svuota, la pagina mostra la stessa schermata di attesa usata per le Prove di Parcheggio:

- Messaggio "Tutti i biglietti revisionati"
- Un **timer conto alla rovescia** fino al prossimo interrogazione automatica
- Pulsante **Controlla ora** per interrogare immediatamente
- Pulsante **Esci** per tornare alla lista

Se arriva un nuovo biglietto durante l'attesa, la pagina lo carica automaticamente.

## Quando usare la Revisione Automatica vs la lista

| Usa la lista quando…                                         | Usa la Revisione Automatica quando…                  |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| Hai bisogno di filtrare per stato, tipo di reclamo o veicolo | Stai lavorando rapidamente sulla coda in sospeso non filtrata |
| Stai indagando la storia di un veicolo o rider specifico      | Ti concentri su un biglietto alla volta, a schermo intero |
| Stai revisionando decisioni passate (Risolto / Ignorato / ecc.) | Vuoi velocità: leggi → decidi → successivo             |
| Devi segnalare al team di manutenzione                        | Sei in modalità turno, lavori la coda dall'inizio alla fine |

## Flussi di lavoro tipici

- **Inizio turno** — apri Revisione automatica → lavora su ogni biglietto in sospeso → termina sulla schermata di attesa
- **Triaggio rapido** — leggi la foto + tipo di reclamo + segnalatore → se ovvio, _Risolvi_ / _Ignora_ con un commento di una riga; altrimenti, _In lavorazione_ e tagga il team di manutenzione nel commento
- **In attesa del rider** — quando la segnalazione non è chiara, _In attesa di informazioni_ con una domanda nel commento; il rider riceve una notifica
- **Duplicato** — quando la ricerca rivela un biglietto già aperto per lo stesso veicolo, _Duplicato_ per collegare la catena
- **Caso ambiguo** — _Salta_ e apri dalla lista con il contesto completo (storia del veicolo, corse correlate, avvisi IoT)

## Suggerimenti

- **Digita prima il commento** — stessa regola delle Prove di parcheggio: l'azione viene registrata prima che i commenti tardivi vengano salvati
- **Salta ≠ decisione** — saltare non chiude nulla; il biglietto resta in coda per il prossimo operatore
- **Risolvi e Ignora non sono la stessa cosa** — _Risolvi_ significa "abbiamo risolto"; _Ignora_ significa "non era un problema reale"; il rider vede la differenza nella sua app
- **Gestione dei duplicati** — cerca prima nella lista per etichetta veicolo; se trovi un biglietto principale, clicca Duplicato, altrimenti risolvi quello più informativo e duplica gli altri
- **Il timer SLA continua a scorrere** durante l'attesa — se la coda è vuota ma la lista ha ancora righe scadute, queste righe sono filtrate dalla Revisione automatica (forse per permessi o stato); torna alla lista per vederle
- **La Revisione automatica rispetta l'ordine dei biglietti dal backend** — i più recenti in sospeso variano per deployment; considera l'ordine della coda come autorevole
