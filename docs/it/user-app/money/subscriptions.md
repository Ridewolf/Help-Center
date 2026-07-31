# Rider App — Abbonamenti e Codici Promo

**Gli abbonamenti e i codici promo non sono attualmente disponibili nell'app.** Un rider non può acquistare un piano, non può riscattare un codice promo e non ha nulla da annullare.

Se vuoi offrire uno sconto a un rider, gestiscilo dal lato Cruscotto — vedi [Giving a rider a discount today](#come-offrire-oggi-uno-sconto-a-un-rider).

## Cosa vede effettivamente un rider

- Il menu laterale sulla [Mappa](../riding/map.md#struttura-di-navigazione) **non ha voci Promozioni né Abbonamenti**.
- Un link `/subscriptions` non apre alcuna schermata. Un rider che lo digita o segue un link a esso, arriva sulla schermata **Not Found** dell'app. Questo è un comportamento previsto, non un errore del suo account o dispositivo.
- Il vecchio link `/promo` reindirizza semplicemente al [Wallet](wallet.md).
- Non esiste **nessuna impostazione nel cruscotto** che attivi abbonamenti o codici promo per la tua azienda.

Non promettere a un rider che un codice funzionerà "una volta che lo abiliteremo", e non citare nomi di piani o prezzi — nessuno è in vigore.

## Come offrire oggi uno sconto a un rider

Sono disponibili tre meccanismi, tutti dal lato operatore:

| Meccanismo                | Dove                                                                         | Utile per                                                    |
| ------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Livelli di sconto tariffa** | [Tariffe veicoli](../../settings/infrastructure/vehicle-tariffs.md)           | Rendere le corse più lunghe progressivamente più economiche per tutti |
| **Una tariffa separata più tag** | [Tariffe veicoli](../../settings/infrastructure/vehicle-tariffs.md) + [Tag](../../settings/infrastructure/tags.md) | Prezzi più bassi per un gruppo definito (aziendale, staff, VIP) |
| **Credito manuale sul saldo** | [Dettaglio cliente](../../operations/customers/client-detail.md#azioni) → **Ricarica saldo** | Compensazione una tantum dopo un reclamo o una corsa fallita   |

Per una compensazione una tantum, il credito manuale sul saldo è il più veloce e lascia una traccia nel registro attività del cliente. Per qualsiasi cosa ricorrente, integrala in una tariffa.

## FAQ

| Domanda                                         | Risposta                                                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "Come si acquista un abbonamento?"             | Non attualmente disponibile nell'app                                                                           |
| "La pagina abbonamenti mostra Not Found"        | Corretto e previsto                                                                                            |
| "Possiamo abilitare gli abbonamenti per la nostra azienda?" | No — non esiste un'impostazione nel cruscotto per questo                                                      |
| "Il mio codice promo non si applica"            | I codici promo non sono attualmente disponibili nell'app                                                       |
| "Scansionare un codice QR promo non fa nulla"   | Stesso — non attualmente disponibile                                                                           |
| "Come annullo il mio piano?"                     | Non esiste alcun piano da annullare                                                                             |
| "Quale tariffa si applica a me allora?"         | La tariffa associata al veicolo utilizzato. Vedi [Tariffe veicoli](../../settings/infrastructure/vehicle-tariffs.md) e la [ripartizione del costo della corsa](../riding/rides.md#dettaglio-costi) |

## Consigli

- **Dì "non attualmente disponibile", poi spiega cosa _puoi_ fare.** Un rider che chiede dei codici promo solitamente chiede uno sconto; un credito manuale sul saldo risponde alla vera domanda.
- **Mantieni la logica degli sconti nelle tariffe.** Qualsiasi cosa imposti lì si applica in modo coerente e appare correttamente nella ripartizione del costo della corsa del rider.
- **Fai attenzione ai codici promo di terze parti.** Se i rider arrivano con codici da una campagna, assicurati che il marketing sappia che l'app non può riscattarli.
