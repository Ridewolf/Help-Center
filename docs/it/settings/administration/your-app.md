# La tua app (White-Label)

La pagina Your App (`/settings/your-app`) è una **procedura guidata che raccoglie tutto il necessario per creare e pubblicare un'app rider brandizzata con la tua identità** — nome dell'app, dominio, risorse del brand, testo per la scheda dello store, screenshot e link legali. Un'anteprima live su dispositivo accanto al modulo mostra le tue scelte su schermi mockup di iPhone e Android mentre digiti.

La trovi nella barra laterale sotto **Impostazioni → La tua app**.

La procedura guidata ha otto passaggi: **Identità → Dominio → Risorse → Scheda → Screenshot → Legale → Editore → Revisione**. Questo articolo copre i primi sei; Editore e Revisione sono trattati in [Your App: Publisher & Submission](your-app-publisher.md).

## Ciclo di vita dello stato

Una scheda di stato in alto mostra a che punto è la tua app, con versione e timestamp:

**bozza → provisioning → in revisione → produzione**, o **rifiutata**.

- La procedura guidata è **modificabile** mentre lo stato è `draft` o `rejected` — un rifiuto riapre il modulo così puoi correggere ciò che lo store ha contestato.
- È **sola lettura** mentre la pipeline gestisce l'app: `provisioning`, `in-review` e `production`. In questi stati la pagina è un riepilogo, e i link allo store — **TestFlight, Play internal testing, App Store, Play Store** — appaiono man mano che diventano disponibili.

## Passaggio Identità

- **Nome app** (obbligatorio) — da qui **si derivano automaticamente l'id bundle iOS, l'id bundle Android e il sottodominio**, quindi impostalo con attenzione.
- **Override bundle** — un interruttore che sblocca l'inserimento manuale degli id bundle iOS e Android se quelli derivati non ti vanno bene.
- **Colore icona** — un valore esadecimale usato per la cornice dell'icona app e lo sfondo della schermata di avvio.

## Passaggio Dominio

- **Tipo di dominio** — scelta a opzione tra **sottodominio** (derivato dal nome app) e **personalizzato**.
- **Dominio personalizzato** — un campo di testo che appare solo quando il tipo è `custom`.

## Passaggio Risorse

- Interruttore **Monocromatico** — decide se un set di grafiche serve per entrambi i temi.
- **Simbolo** e **marchio verbale** — sempre obbligatori.
- **Simbolo / marchio verbale tema scuro** — mostrati solo quando Monocromatico è disattivato, cioè quando fornisci grafiche separate per tema chiaro e scuro.

La zona di rilascio accetta drag-and-drop o un URL incollato. Il caricamento diretto di file binari non è ancora disponibile — in pratica, per ora fornisci ogni risorsa come URL.

## Passaggio Scheda

Testo per la scheda dello store, con limiti di caratteri imposti dai campi:

| Campo                 | Limite                                      |
| --------------------- | ------------------------------------------- |
| **Sottotitolo**       | 30 caratteri                                |
| **Descrizione breve** | 80 caratteri                                |
| **Testo promozionale**| 170 caratteri (testo promozionale App Store) |
| **Parole chiave**     | 100 caratteri, separati da virgola          |
| **Descrizione completa** | 4000 caratteri                            |

- **Categoria** — viaggio, navigazione, sport, lifestyle, salute e fitness, o business.
- **Lingue dello store** — scegli dal set di localizzazioni supportate. La **prima lingua selezionata è la base**; ogni lingua aggiuntiva ha una propria scheda con sovrascritture per sottotitolo, descrizioni, testo promozionale e parole chiave. I campi lasciati vuoti in una sovrascrittura ricadono sulla traduzione automatica dalla lingua base.

## Passaggio Screenshot

Sei varianti fisse di screenshot, ognuna richiede un **titolo** e un **sottotitolo**: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. L'anteprima live del dispositivo nella colonna di destra li rende con le tue risorse di brand, aggiornandoli mentre digiti.

## Passaggio Legale

Informativa sulla privacy, termini di servizio, URL supporto, email supporto, telefono supporto e URL marketing. Questi sono **precompilati dal profilo [La mia azienda](my-company.md)** ovunque esista un valore — completare prima La mia azienda ti fa risparmiare lavoro.

## Domande comuni

- **Gli id bundle sembrano errati.** Sono derivati dal nome app — abilita l'override bundle per impostarli esplicitamente.
- **I campi per le risorse variante scura mancano.** Appaiono solo quando Monocromatico è disattivato.
- **Non posso più modificare nulla.** Lo stato è `provisioning`, `in-review` o `production` — la pipeline gestisce l'app in quei casi. La modifica si riapre automaticamente se la submission viene rifiutata.
- **Il testo del sottotitolo viene troncato.** Il limite è di 30 caratteri — meno di quanto potresti aspettarti.
- **Il campo dominio personalizzato non è visibile.** Imposta prima il tipo di dominio su `custom`.
- **La pagina mostra un avviso "bozza locale".** Le tue modifiche sono conservate solo in questo browser e non sono ancora sincronizzate — non dare per scontato che persistano automaticamente; ricontrolla il modulo una volta che l'avviso scompare.
