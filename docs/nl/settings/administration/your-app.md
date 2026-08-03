# Uw app (White-Label)

De pagina Uw app (`/settings/your-app`) is een **wizard die alles verzamelt wat nodig is om een merkgebonden rider app te bouwen en te publiceren onder uw eigen identiteit** — appnaam, domein, merkassets, store-vermeldingstekst, screenshots en juridische links. Een live apparaatvoorbeeld naast het formulier toont uw keuzes op mock iPhone- en Android-schermen terwijl u typt.

U vindt het in de zijbalk onder **Instellingen → Uw app**.

De wizard heeft acht stappen: **Identiteit → Domein → Assets → Vermelding → Shots → Juridisch → Uitgever → Beoordeling**. Dit artikel behandelt de eerste zes; Uitgever en Beoordeling worden behandeld in [Your App: Publisher & Submission](your-app-publisher.md).

## Statuslevenscyclus

Een statuskaart bovenaan toont waar uw app zich bevindt, met versie en tijdstempels:

**concept → provisioning → in beoordeling → productie**, of **afgewezen**.

- De wizard is **bewerkbaar** zolang de status `draft` of `rejected` is — een afwijzing opent het formulier opnieuw zodat u kunt corrigeren wat de store afkeurde.
- Het is **alleen-lezen** zolang de pijplijn de app beheert: `provisioning`, `in-review` en `production`. In die staten is de pagina een samenvatting, en store-links — **TestFlight, Play interne test, App Store, Play Store** — verschijnen zodra ze beschikbaar zijn.

## Identiteitsstap

- **Appnaam** (verplicht) — het **leidt automatisch de iOS bundle-id, de Android bundle-id en het subdomein af**, dus stel deze zorgvuldig in.
- **Bundle override** — een schakelaar die handmatige invoer van de iOS- en Android-bundle-ids ontgrendelt als de afgeleide niet geschikt zijn.
- **Pictogramkleur** — een hex-waarde die wordt gebruikt voor de app-pictogramrand en de achtergrond van het splash-scherm.

## Domeinstap

- **Domeintype** — een keuzerondje tussen **subdomein** (afgeleid van de appnaam) en **aangepast**.
- **Aangepast domein** — een tekstveld dat alleen verschijnt wanneer het type `custom` is.

## Assets-stap

- **Monochroom** schakelaar — bepaalt of één set artwork beide thema's bedient.
- **Symbool** en **woordmerk** — altijd verplicht.
- **Donker thema symbool / woordmerk** — wordt alleen getoond als Monochroom uit staat, dus wanneer u aparte lichte en donkere artwork levert.

De dropzone accepteert slepen-en-neerzetten of een geplakte URL. Directe binaire upload is nog niet beschikbaar — lever elk asset voorlopig als een URL.

## Vermeldingsstap

Store-vermeldingstekst, met tekenlimieten die door de invoervelden worden afgedwongen:

| Veld                  | Limiet                                      |
| --------------------- | ------------------------------------------- |
| **Subtitel**          | 30 tekens                                  |
| **Korte beschrijving**| 80 tekens                                  |
| **Promotietekst**     | 170 tekens (App Store promotietekst)       |
| **Trefwoorden**       | 100 tekens, komma-gescheiden                |
| **Volledige beschrijving** | 4000 tekens                            |

- **Categorie** — reizen, navigatie, sport, lifestyle, gezondheid & fitness, of zakelijk.
- **Store-talen** — kies uit de ondersteunde locale set. De **eerste geselecteerde taal is de basis**; elke extra taal krijgt een eigen tab met taal-specifieke overschrijvingen voor subtitel, beschrijvingen, promotietekst en trefwoorden. Velden die leeg blijven in een overschrijving vallen terug op automatische vertaling vanuit de basistaal.

## Shots-stap

Zes vaste screenshotvarianten, elk met een **kop** en een **subtitel** nodig: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. De live apparaatvoorbeeld in de rechterkolom toont ze met uw merkassets, en werkt bij terwijl u typt.

## Juridische stap

Privacybeleid, servicevoorwaarden, support-URL, support-e-mail, support-telefoon en marketing-URL. Deze worden **vooraf ingevuld vanuit het [Mijn Bedrijf](my-company.md) profiel** waar een waarde daar bestaat — eerst Mijn Bedrijf invullen bespaart werk.

## Veelgestelde vragen

- **Bundle-ids lijken verkeerd.** Ze worden afgeleid van de appnaam — schakel de bundle override in om ze expliciet in te stellen.
- **Donkere variant assetvelden ontbreken.** Ze verschijnen alleen als Monochroom uit staat.
- **Ik kan niets meer bewerken.** De status is `provisioning`, `in-review` of `production` — de pijplijn beheert de app dan. Bewerken opent automatisch opnieuw als de inzending wordt afgewezen.
- **Subtiteltekst wordt afgekapt.** De limiet is 30 tekens — korter dan u misschien verwacht.
- **Het aangepaste domeinveld is niet zichtbaar.** Stel eerst het domeintype in op `custom`.
- **De pagina toont een "lokale concept"-melding.** Uw bewerkingen worden alleen in deze browser bewaard en zijn nog niet gesynchroniseerd — ga er niet van uit dat ze automatisch blijven bestaan; controleer het formulier opnieuw zodra de melding verdwenen is.
