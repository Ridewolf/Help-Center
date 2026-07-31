# Rider App — Impostazioni

Le **Impostazioni** (`/settings`) contengono tutte le preferenze dell'app rivolte al rider: notifiche, cosa mostra la mappa, interruttori per la privacy, lingua, tema e prestazioni.

**Non c'è un pulsante Salva.** Lo schermo mostra immediatamente le impostazioni memorizzate nella cache, le aggiorna in background e applica automaticamente ogni modifica poco dopo che è stata effettuata. Un rider che ha cambiato qualcosa e ha chiuso subito lo schermo ha quasi certamente salvato la modifica — questa è la risposta a "la mia modifica è stata applicata?".

Diversi di questi interruttori modificano ciò che la [Mappa](../riding/map.md) visualizza, quindi questo è il primo schermo da visitare per "la mappa è lenta" e "non vedo i livelli di batteria".

## Notifiche

Cinque interruttori indipendenti:

- **Notifiche Corse**
- **Notifiche Promozionali**
- **Aggiornamenti App**
- **Notifiche Push**
- **Notifiche Email** — un unico interruttore; non ci sono sotto-opzioni per tipo

Nella stessa area:

| Controllo          | Note                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| **Suono**          | Interruttore                                                                 |
| **Volume Suono**   | Cursore — appare solo quando **Suono** è attivo                             |
| **Vibrazione**     | Interruttore                                                                 |
| **Impostazioni Radar** | Una scheda che appare solo nelle build dell'app dove le impostazioni radar sono abilitate |

## Mappa e visualizzazione

Interruttori:

- **Mostra livello batteria**
- **Mostra veicoli promozionali**
- **Mostra prezzi**
- **Zoom automatico**
- **Mappa 3D** — ha effetto immediato sulla mappa
- **Animazioni ridotte**

Inoltre **Modalità dati**, un selettore con **bilanciata**, **bassa** e **alta**. Gestisce la qualità delle tessere della mappa e la quantità di dettagli visualizzati, ed è **la prima cosa da provare quando un rider segnala una mappa lenta o pesante** — impostala su _bassa_ e attiva anche **Animazioni ridotte**.

**Mappe offline** non è attualmente disponibile nell'app.

## Controlli privacy

- Interruttore **Condivisione geolocalizzazione**
- Interruttore **Condivisione dati**
- **Privacy Policy** — apre l'URL esterno configurato in [La mia azienda](../../settings/administration/my-company.md); il link appare solo se è impostato un URL
- **Gestisci sessioni** — apre lo schermo dei dispositivi connessi (`/settings/sessions`), lo stesso accessibile dal Profilo

Lo schermo completo delle linee guida sulla privacy e sicurezza è una sua rotta (`/privacy`). **La cancellazione dell'account non è qui** — il flusso di cancellazione funziona dallo schermo Profilo.

## Regione e aspetto

| Controllo       | Opzioni                          | Note                                                                                                   |
| --------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Lingua**      | **en**, **ru**, **ro**           | Si applica immediatamente, senza ricaricare. Solo queste tre sono offerte in questo schermo            |
| **Unità**       | —                                | Un selettore di unità non è attualmente disponibile nell'app                                           |
| **Tema**        | Chiaro, Scuro, Sistema            | Si applica immediatamente                                                                              |
| **Stile mappa** | Auto, Chiaro, Scuro               | **Disabilitato e forzato su Auto quando il Tema è impostato su Sistema.** Cambia Tema in Chiaro o Scuro per sbloccarlo |

Solo le tre lingue dell'app sopra appaiono qui, anche se altre localizzazioni esistono altrove nel prodotto — vedi [Localization](../../settings/administration/localization.md) per il lato Cruscotto.

## Modalità di guida

**La Modalità di guida non è attualmente disponibile nell'app.** Un rider che chiede dove sia il controllo della modalità di guida non ha perso un permesso — la sezione non è nell'app e non esiste un'impostazione nel Cruscotto che la aggiunga.

## FAQ

| Il rider chiede…                      | Risposta                                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| "Dov'è il pulsante Salva?"          | Non c'è — le modifiche si salvano automaticamente                                            |
| "Dov'è la Modalità di guida?"       | Non è attualmente disponibile nell'app                                                      |
| "Perché lo Stile mappa è disabilitato?" | Il **Tema** è impostato su **Sistema**. Cambialo prima in Chiaro o Scuro                    |
| "Perché la mia lingua non è elencata?" | Questo schermo offre solo **en**, **ru** e **ro**                                           |
| "Dov'è l'impostazione Unità?"       | Non è attualmente disponibile nell'app                                                      |
| "Dov'è l'interruttore Mappe offline?" | Non è attualmente disponibile nell'app                                                      |
| "Come cancello il mio account?"    | Dallo schermo Profilo, non da Impostazioni                                                 |
| "Come vedo i miei dispositivi connessi?" | **Gestisci sessioni** — qui, o lo stesso pulsante nel Profilo                              |
| "La mappa è lenta"                  | **Modalità dati → bassa**, poi attiva **Animazioni ridotte**. Vedi [Map](../riding/map.md#risoluzione-dei-problemi) |

## Suggerimenti

- **La Modalità Dati è la tua manopola delle prestazioni.** Prima di incolpare il telefono di un rider o le tue tessere, fagli provare _basso_.
- **"Non ha salvato" è quasi mai vero.** Chiedi loro di riaprire lo schermo — il valore sarà lì.
- **I reclami sulla mappa spesso si trovano qui, non sulla mappa.** Percentuali di batteria mancanti, prezzi mancanti e veicoli promozionali mancanti sono tutti interruttori in questo schermo.
- **Il tema blocca lo Stile della Mappa.** Memorizza questa coppia; altrimenti è un biglietto settimanale.
