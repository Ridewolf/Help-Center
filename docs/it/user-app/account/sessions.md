# Sessioni — Dispositivi connessi all'account

La schermata **Sessioni** (`/settings/sessions`) elenca ogni luogo in cui l'account di un rider è attualmente connesso e consente di disconnettere tali sessioni. È la schermata da raggiungere ogni volta che un rider sospetta che qualcun altro abbia accesso al proprio account.

Due punti di accesso, entrambi conducono qui:

- **Profilo → Gestisci sessioni**
- **Impostazioni → Scheda Privacy → Gestisci sessioni**

## Come è organizzata la lista

Le sessioni sono **raggruppate per dispositivo** — browser e versione, sistema operativo e versione, tipo di dispositivo, produttore e modello — così lo stesso telefono appare una sola volta invece di dozzine.

I gruppi sono ordinati intenzionalmente:

1. Prima il dispositivo attuale del rider
2. Poi per stato: **attivo**, poi **inattivo**, poi **vecchio**
3. Poi per ultima attività, dal più recente al meno recente

Ogni gruppo è comprimibile. Espandendolo si rivelano tutte le singole sessioni appartenenti a quel dispositivo.

## Come leggere un gruppo di dispositivi

| Cosa vedi                          | Significato                                                                    |
| --------------------------------- | ----------------------------------------------------------------------------- |
| **Etichetta dispositivo**         | Produttore e modello se noti, altrimenti il sistema operativo e la sua versione |
| Icona tipo di dispositivo          | Telefono, tablet o monitor                                                    |
| **Etichetta browser**             | Il browser e la versione della sessione                                       |
| **Badge stato sessione**          | Vedi la tabella sotto                                                        |
| **Ultima attività**               | Tempo relativo — "proprio adesso", N minuti / ore / giorni fa, e una data assoluta se è più vecchia di una settimana |
| **Conteggio sessioni**            | Quante sessioni ha quel dispositivo                                          |
| **Posizione**                    | Città, paese e indirizzo IP                                                  |
| **Creato**                       | Quando è iniziata quella sessione                                            |
| **Dispositivo attuale** / **Sessione attuale** | Badge evidenziato sul dispositivo e sulla sessione che il rider sta usando ora |

### Badge di stato

| Badge        | Significato                          |
| ------------ | ---------------------------------- |
| **attivo**   | Ultima attività meno di un'ora fa  |
| **inattivo** | Ultima attività meno di 24 ore fa  |
| **vecchio**  | Ultima attività 24 ore o più fa    |

Il badge misura **solo la recenza** — non indica se una sessione è ancora valida. Un badge "vecchio" non significa che la sessione sia scaduta.

## Disconnettere una singola sessione

La sessione attuale non ha controllo di eliminazione — per progettazione, non può essere rimossa da questa lista. Qualsiasi altra sessione può esserlo:

1. Espandi il gruppo dispositivo
2. Tocca l'icona **cestino** sulla sessione
3. Conferma nella finestra di dialogo

La lista si ricarica e la sessione sparisce.

## Azioni di massa

| Azione                     | Cosa fa                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Disconnetti altre sessioni**  | Disconnette tutte le sessioni tranne quella sul dispositivo in mano al rider. È l'azione giusta quando un rider sospetta accessi non autorizzati |
| **Disconnetti tutte le sessioni**    | Disconnette tutto **incluso il dispositivo attuale**, quindi il rider viene riportato alla schermata di accesso e deve effettuare nuovamente il login. È stilizzata come azione distruttiva per questo motivo |
| **Revoca dispositivo**          | Offerta su un gruppo dispositivo espanso che non è quello attuale — disconnette tutte le sessioni su quel dispositivo      |

Durante l'esecuzione della richiesta di disconnessione i pulsanti sono disabilitati. Un errore mostra un breve messaggio; un successo mostra una conferma e ricarica la lista.

## Flussi di lavoro tipici

- **Il rider pensa che qualcun altro sia nel suo account** — **Disconnetti altre sessioni**, poi cambia la password da **Profilo**. Nota che un cambio password riuscito disconnette anche il rider, che dovrà quindi effettuare nuovamente l'accesso ([Profilo](profile.md))
- **Accesso dimenticato su un telefono preso in prestito** — espandi quel gruppo dispositivo, **Revoca dispositivo**
- **Ripartire da zero ovunque** — **Disconnetti tutte le sessioni**, poi accedi di nuovo ([Accesso](registration-login.md))

## FAQ

- **Perché il rider non può eliminare la sessione attuale?** Non è mostrato alcun controllo di eliminazione per essa. Per terminare la sessione attuale, usa **Disconnetti tutte le sessioni** o il normale pulsante **Esci** nel Profilo.
- **Cosa significa esattamente "attivo"?** Attività nell'ultima ora — nient'altro.
- **Perché un telefono mostra più sessioni?** Le sessioni si creano ad ogni accesso. La schermata le raggruppa sotto un dispositivo e mostra il conteggio.
- **Il pulsante Gestisci sessioni è disabilitato.** L'account ha una cancellazione in sospeso, che disabilita la gestione delle sessioni insieme alla modifica del profilo — vedi [Profilo](profile.md).

## Correlati

- [Profilo](profile.md) — cambio password, uscita, cancellazione account
- [Impostazioni](../help/settings.md) — la scheda Privacy che collega anche qui
- [Privacy](privacy.md) — politica sulla privacy e linee guida di sicurezza
