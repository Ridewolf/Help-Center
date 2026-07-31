# La tua app: Editore e invio

Gli ultimi due passaggi della [procedura guidata white-label per La tua app](your-app.md) (`/settings/your-app`): scegliere **quali account sviluppatore pubblicano l'app**, fornire le credenziali dello store se sono le tue e inviare per il provisioning.

## Scelta dell'editore

Una selezione a scelta singola con due opzioni:

- **Ridewolf** (predefinito) — l'app viene pubblicata tramite gli account sviluppatore di Ridewolf. **Non sono necessarie credenziali dello store da parte tua.**
- **I tuoi account** — l'app viene pubblicata tramite i tuoi account sviluppatore Apple e Google, per cui sono necessarie le credenziali sottostanti.

## Credenziali di accesso allo store (solo per account propri)

**Apple — tutto obbligatorio:**

- Apple ID
- Team ID
- App Store Connect API **Key ID** e **Issuer ID**
- App Store Connect API **chiave privata** (il contenuto del file `.p8`)
- Numero D-U-N-S

**Google:**

- Email dell'account di servizio
- JSON dell'account di servizio
- Email Play Console

Queste credenziali sono sensibili — vengono inviate per il provisioning e **non vengono conservate nella bozza locale del browser**.

## Attestazioni manuali

Due caselle da spuntare per confermare che l'accesso è stato effettivamente concesso:

- **Accesso ad App Store Connect concesso** — l'Apple ID è stato aggiunto ad App Store Connect
- **Accesso a Play Console concesso** — i permessi di Play Console sono stati impostati

Queste sono **auto-dichiarate e non verificate automaticamente**. Spuntarle senza concedere i permessi reali non viene rilevato qui — si manifesterà più avanti come un errore di provisioning.

## Passaggio di revisione

Un riepilogo in sola lettura di ogni passaggio precedente, con **badge di convalida per regola** (per esempio _Asset richiesti_ o _Legale completo_) mostrati come superati o falliti, e **link di modifica in linea** che riportano al passaggio specifico che necessita attenzione. Ogni controllo deve essere superato prima che **Invia** diventi disponibile.

## Invio

L'invio avvia la pipeline di provisioning e sposta lo stato attraverso **bozza → provisioning → in revisione → produzione**, oppure a **rifiutato**.

- Mentre lo stato è `provisioning`, `in-review` o `production`, la pagina è **sola lettura** e i link allo store (TestFlight, test interni Play, App Store, Play Store) appaiono man mano che la pipeline li popola.
- Uno stato **rifiutato** rende nuovamente modificabile la procedura guidata così puoi correggere e inviare di nuovo.

## Domande comuni

- **Invia non è disponibile.** Uno o più badge di convalida nel passaggio di Revisione stanno ancora fallendo — usa i link di modifica per andare al passaggio problematico.
- **I campi Apple/Google non sono mostrati.** Appaiono solo quando l'editore è impostato sui tuoi account.
- **Devo cambiare qualcosa dopo l'invio.** Non puoi farlo mentre lo stato è `provisioning`, `in-review` o `production`. Se l'app è rifiutata, la procedura guidata diventa nuovamente modificabile — `draft` e `rejected` sono i due stati modificabili.
- **Il provisioning è fallito anche se ho spuntato le attestazioni.** Quelle sono dichiarazioni manuali — ricontrolla che l'Apple ID abbia davvero accesso ad App Store Connect e che l'account di servizio abbia davvero i permessi Play Console.
