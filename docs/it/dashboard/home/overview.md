# Home del Cruscotto

La pagina iniziale (`/dashboard`) è la tua panoramica quotidiana. Mostra le metriche chiave della flotta per un giorno scelto, come si confrontano con la media mobile a 30 giorni e la distribuzione oraria dell'attività. Aprila per avere il polso delle operazioni in un'unica schermata.

## Intestazione

In alto:

- **Saluto** — "Ciao, _{tuo nome}_! Benvenuto nel cruscotto di _{tua azienda}_!"
- **Sottotitolo** — "Panoramica delle prestazioni della tua azienda"
- **Selettore data** — mostra a quale giorno appartengono le metriche

## Selettore data

Per impostazione predefinita la pagina carica i dati di **oggi**. Il selettore data ti permette di tornare indietro nella storia.

- **Oggi** — pulsante che riporta a oggi
- **Giorno precedente** (‹) / **Giorno successivo** (›) — spostati di un giorno alla volta
- **Icona calendario** — apre un popover per selezionare una data specifica

La data selezionata rimane fissa per la sessione corrente — passando a un'altra pagina e tornando indietro mantiene la tua selezione.

## Schede metriche (KPI)

Otto schede metriche disposte su due righe. Ogni scheda mostra:

- **Titolo** — cosa viene misurato (es. _Corse_)
- **Valore** — la cifra per il giorno selezionato
- **Descrizione** — una breve spiegazione ("Corse completate", "Distanza totale", ecc.)
- **Confronto** — variazione rispetto alla media mobile a 30 giorni, con freccia su/giù
- **Tooltip** — passa il mouse sul titolo per la definizione completa

### Le otto schede

| Scheda               | Cosa mostra                                    |
| -------------------- | ---------------------------------------------- |
| **Corse**            | Numero di corse completate nel giorno selezionato |
| **Distanza**         | Chilometri totali percorsi da tutte le corse    |
| **Durata**           | Tempo totale di corsa per tutta la flotta       |
| **Entrate**          | Entrate totali dalle corse nel giorno selezionato |
| **Ricariche**        | Somma delle ricariche del portafoglio effettuate dai clienti quel giorno |
| **Prezzo medio**     | Prezzo medio per corsa                           |
| **Prezzo medio / km**| Prezzo medio per chilometro                      |
| **Prezzo medio / min**| Prezzo medio per minuto                          |

Il confronto si legge come "**vs media 30 giorni**":

- ↑ Verde — sopra la media degli ultimi 30 giorni
- ↓ Rosso — sotto la media
- (nessuna freccia) — troppo vicino alla media per segnalare

## Scheda meteo

Un widget meteo si trova nella griglia delle schede metriche mostrando le condizioni nella tua area operativa:

- **Temperatura attuale** e condizione (Sereno, Nuvoloso, Pioggia, ecc.)
- **Vento** e **precipitazioni**
- **Previsioni a 3 giorni** — i prossimi due giorni più domani
- Fonte della posizione — _da GPS_ o _da IP_ (quella disponibile)

Utile per prevedere la domanda: pioggia e vento spesso si correlano al volume delle corse.

## Grafici orari

Sotto le schede metriche, quattro grafici ad area mostrano come l'attività si distribuisce nelle 24 ore del giorno selezionato, raggruppati in due sezioni:

### Attività

- **Corse per ora** — numero di corse iniziate in ogni ora
- **Distanza per ora** — chilometri totali per ora
- **Durata per ora** — minuti totali di corsa per ora

### Entrate

- **Entrate per ora** — valuta guadagnata per ora

Ogni grafico mostra la curva del giorno; passa il mouse su un punto per vedere il valore esatto di quell'ora.

## Caricamento ed errori

- **Caricamento** — le schede metriche mostrano uno stato scheletro mentre si risolve l'endpoint di analisi
- **Errore** — appare un piccolo banner in alto con la scritta "Caricamento analisi fallito"; il resto della pagina rimane utilizzabile

## Permessi

La pagina iniziale è protetta da **Visualizza Analisi Cruscotto** (`q4r5t6`). Senza questo permesso, verrai reindirizzato a un'altra pagina di atterraggio al login.

Se hai accesso al cruscotto ma la pagina è vuota:

- Controlla la data selezionata — i giorni vuoti sono validi (nessuna corsa)
- Controlla la rete — verifica il banner "Caricamento analisi fallito"
- Altrimenti contatta un amministratore

## Suggerimenti

- **Confronta i giorni rapidamente** — usa `‹` e `›` per scorrere i giorni recenti e osserva come cambiano i KPI
- **Tooltip al passaggio del mouse sui titoli delle schede** — ogni scheda ha una definizione precisa; affidati a quella invece di indovinare cosa esclude "Prezzo medio / km"
- **Usa prima il badge di confronto** — la freccia colorata ti dice a colpo d'occhio se il giorno è stato sopra o sotto la norma, prima di leggere il numero assoluto
- **I grafici orari rivelano schemi** — picchi di pendolarismo mattutino vs serale, curve del weekend, effetti del meteo; ti dicono più dei totali
