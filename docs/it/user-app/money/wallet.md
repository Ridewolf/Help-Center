# Rider App — Portafoglio e Ricariche

Il Portafoglio (`/wallet`) è la schermata del denaro del rider, accessibile dalla riga del saldo del portafoglio nel menu laterale. Contiene il saldo attuale, i bonus, il punto di ingresso per la ricarica, l'interruttore per la ricarica automatica e l'accesso alle carte salvate.

Tutto ciò che riguarda le carte — aggiungerne una, rimuoverne una, scegliere una predefinita e i tre modi in cui una ricarica può completarsi — si trova in [Payment Methods](payment-methods.md). Le ricariche passate, i rimborsi, gli addebiti e i bonus si trovano in [History](history.md).

## Cosa c'è nella schermata

| Elemento                      | Cosa è                                                                                                            |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Saldo reale**               | Il saldo spendibile del rider. L'icona di aggiornamento accanto a esso rilegge il saldo dal server                 |
| **Bonus**                    | Un saldo bonus separato, mostrato solo dove i bonus sono abilitati                                                |
| **Importi preimpostati per la ricarica** | Quattro pulsanti: **50**, **100**, **200**, **400**. Non c'è un campo per importi personalizzati in questa schermata |
| **Ricarica automatica**      | Un singolo interruttore, con una descrizione della propria soglia e importo                                      |
| **Gestisci metodi di pagamento** | Apre [Payment Methods](payment-methods.md) (`/wallet/payment-methods`)                                            |

Se un rider insiste che il suo saldo è errato o obsoleto, **fagli prima toccare l'icona di aggiornamento** — questo cancella il valore memorizzato e legge quello aggiornato. Questo risolve la maggior parte delle segnalazioni "la mia ricarica non appare".

## Come un rider effettua una ricarica

1. Apri il Portafoglio.
2. Scegli uno degli importi preimpostati — 50, 100, 200 o 400.
3. Conferma la ricarica.

Ciò che succede dopo dipende interamente dal fornitore di pagamento in uso, e ci sono esattamente **tre** possibilità:

| Flusso del fornitore              | Cosa sperimenta il rider                                                                    | Esce dall'app? |
| -------------------------------- | ------------------------------------------------------------------------------------------- | -------------- |
| **Conferma in-app** (Stripe)     | Il pagamento viene confermato all'interno dell'app contro una carta salvata                 | No             |
| **Reindirizzamento** (MAIB e simili) | Si apre un browser esterno, il rider paga sulla pagina della banca, l'app attende la conferma | Sì             |
| **Checkout con QR** (MIA e simili) | Un checkout con QR / app bancaria con conto alla rovescia, l'app attende la conferma        | Sì             |

**Solo il flusso di conferma in-app si completa senza uscire dall'app.** Per i flussi di reindirizzamento e QR, non dire mai a un rider che il denaro arriva istantaneamente — devono prima completare il pagamento esternamente. Istruzioni passo-passo per tutti e tre i flussi sono in [Payment Methods](payment-methods.md#ricarica--i-tre-flussi).

## Cosa succede subito dopo una ricarica

Il saldo si aggiorna immediatamente nell'app, poi l'app lo conferma con il server, riprovando più volte con ritardi crescenti (circa mezzo secondo, poi 1, 2, 4 e 8 secondi). Se non arriva mai una conferma, il saldo mostrato viene **ripristinato** al valore originale.

Quindi un saldo che appare brevemente e poi scompare significa una cosa: **il pagamento non è mai stato confermato.** Controlla la lista delle ricariche in sospeso nella schermata [Payment Methods](payment-methods.md#ricariche-in-sospeso).

## Ricarica automatica

- Un interruttore, con una finestra di conferma quando il rider lo attiva.
- È **disabilitata** dove il fornitore attuale non può confermare i pagamenti all'interno dell'app. Per questo un rider con un fornitore solo con reindirizzamento o solo QR non può attivarla.
- La soglia e l'importo sono descritti direttamente nella schermata. Leggili dalla schermata — non citare cifre a memoria e non indicare limiti che la schermata non mostra.

## Dove si trova lo storico dei pagamenti

Non qui. Ricariche, rimborsi, addebiti e bonus sono tutti elencati nella scheda **Pagamenti** di [History](history.md#scheda-pagamenti), con importo e codifica colore dello stato. Il tuo registro lato operatore è [Payments — History](../../operations/payments/payments.md).

## Risoluzione dei problemi

| Il rider dice…                          | Cosa controllare                                                                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| "Il mio saldo è sbagliato / non aggiornato" | Tocca l'icona di aggiornamento accanto a **Saldo reale**                                                                                   |
| "Pagamento rifiutato"                   | Rifiuto da parte della carta o della banca. Il codice di errore è nel record di pagamento in [Storico pagamenti → Pagamenti](history.md#scheda-pagamenti) |
| "Fondi insufficienti"                   | Il saldo è inferiore a quanto richiesto dall'azione. Ricarica prima — e nota che iniziare una corsa ha un proprio [saldo minimo di partenza](../riding/rides.md#perché-un-rider-non-può-avviare-una-corsa) per i rider senza carta |
| "Non riesco ad attivare la ricarica automatica" | Il provider attivo non può confermare i pagamenti all'interno dell'app                                                                     |
| "La mia ricarica non è arrivata"       | Controlla la lista delle ricariche in sospeso su [Metodi di pagamento](payment-methods.md#ricariche-in-sospeso). Un pagamento con redirect o QR mai completato si trova lì e può essere annullato |
| "Quando arriverà il mio rimborso?"      | Non promettere un numero di giorni — non è definito un tempo di rimborso nell'app. I pagamenti rimborsati appaiono nella scheda Pagamenti con stato rimborsato |

## Suggerimenti

- **Aggiorna prima di indagare.** La metà dei ticket "i soldi sono spariti" è dovuta a un saldo memorizzato nella cache.
- **Conosci il flusso del tuo provider prima di rispondere.** "Istantaneo" vale solo per la conferma in-app; gli altri due richiedono che il rider completi la procedura dalla banca.
- **Un saldo scomparso è un pagamento non confermato**, non perso. Vai direttamente alle ricariche in sospeso.
- **Collegare una carta elimina completamente la barriera del saldo per la corsa** — per i rider che ricaricano costantemente in piccole somme, questo è il consiglio migliore.
