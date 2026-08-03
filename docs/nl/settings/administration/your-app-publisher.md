# Uw app: Uitgever & Indienen

De laatste twee stappen van de [Your App white-label wizard](your-app.md) (`/settings/your-app`): kiezen **wiens ontwikkelaarsaccounts de app publiceren**, winkelreferenties aanleveren als ze van u zijn, en indienen voor provisioning.

## Keuze van uitgever

Een keuzerondje met twee opties:

- **Ridewolf** (standaard) — de app wordt gepubliceerd via de eigen ontwikkelaarsaccounts van Ridewolf. **Er zijn geen winkelreferenties van u nodig.**
- **Uw eigen accounts** — de app wordt gepubliceerd via uw eigen Apple- en Google-ontwikkelaarsaccounts, waarvoor onderstaande referenties vereist zijn.

## Referenties voor winkeltoegang (alleen eigen accounts)

**Apple — alles vereist:**

- Apple ID
- Team-ID
- App Store Connect API **Key ID** en **Issuer ID**
- App Store Connect API **private key** (de inhoud van het `.p8`-bestand)
- D-U-N-S-nummer

**Google:**

- Serviceaccount-e-mail
- Serviceaccount JSON
- Play Console e-mail

Deze referenties zijn gevoelig — ze worden verzonden voor provisioning en **worden niet lokaal in de browser opgeslagen als concept**.

## Handmatige attestaties

Twee selectievakjes die u aanvinkt om te bevestigen dat toegang daadwerkelijk is verleend:

- **App Store Connect-toegang verleend** — de Apple ID is toegevoegd aan App Store Connect
- **Play Console-toegang verleend** — Play Console-machtigingen zijn ingesteld

Deze zijn **zelfverklaard en worden niet automatisch geverifieerd**. Ze aanvinken zonder de echte machtigingen te verlenen wordt hier niet opgemerkt — dit komt later aan het licht als een provisioning-fout.

## Beoordelingsstap

Een alleen-lezen samenvatting van elke voorgaande stap, met **per-regel validatiebadges** (bijvoorbeeld _Assets vereist_ of _Juridisch compleet_) die als geslaagd of mislukt worden weergegeven, en **bewerk-links** terug naar de specifieke stap die aandacht nodig heeft. Elke controle moet slagen voordat **Indienen** beschikbaar wordt.

## Indienen

Indienen start de provisioning-pijplijn en verplaatst de status door **concept → provisioning → in beoordeling → productie**, of naar **afgewezen**.

- Terwijl de status `provisioning`, `in-review` of `production` is, is de pagina **alleen-lezen** en verschijnen winkelkoppelingen (TestFlight, Play interne tests, App Store, Play Store) naarmate de pijplijn ze invult.
- Een **afgewezen** status maakt de wizard weer bewerkbaar zodat u kunt corrigeren en opnieuw indienen.

## Veelgestelde vragen

- **Indienen is niet beschikbaar.** Een of meer validatiebadges in de Beoordelingsstap falen nog — gebruik de bewerk-links om naar de betreffende stap te springen.
- **De Apple/Google-velden worden niet getoond.** Ze verschijnen alleen als de uitgever is ingesteld op uw eigen accounts.
- **Ik moet iets wijzigen na het indienen.** Dat kan niet terwijl de status `provisioning`, `in-review` of `production` is. Als de app is afgewezen, wordt de wizard weer bewerkbaar — `draft` en `rejected` zijn de twee bewerkbare statussen.
- **Provisioning is mislukt ondanks dat ik de attestaties heb aangevinkt.** Dat zijn handmatige verklaringen — controleer opnieuw of de Apple ID echt toegang heeft tot App Store Connect en of het serviceaccount echt Play Console-machtigingen heeft.
