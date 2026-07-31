# Uw profiel

Het **Profiel** is _uw_ account binnen Ridewolf — de operator die nu is ingelogd. Vanaf hier kunt u uw naam, foto, wachtwoord, thema, meldingsgeluiden wijzigen en bekijken waar u bent ingelogd. Als uw operatoraccount ook gekoppeld is aan een klantaccount in de Rider App, kunt u schakelen naar een klantweergave van hetzelfde account.

Vier routes delen dit artikel, allemaal bereikbaar via de avatar in de bovenbalk:

| Route               | Wat het is                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Hub — leidt u automatisch door naar operator- of klantweergave op basis van wat uw account heeft |
| `/profile/operator` | Operatorzijde-weergave van uzelf (standaard voor personeel)                                      |
| `/profile/customer` | Klantzijde-weergave (alleen als uw account ook gekoppeld is aan een rider-klant)                 |
| `/profile/legacy`   | Legacy single-page-weergave — dezelfde gegevens als één lang formulier (fallback voor de vernieuwde weergaven) |

Dit is de **selfservice**-weergave. Om _andere_ operators (uw teamleden) te beheren, gebruikt u in plaats daarvan [Operators](../../settings/access/operators.md).

Geen permissiebeperking — elke ingelogde gebruiker kan zijn eigen profiel openen.

## Hoe `/profile` bepaalt waar u naartoe gaat

Direct naar `/profile` gaan brengt u nooit op een pagina — het leidt u meteen door:

1. Leest `lastPersona` uit de localStorage van uw browser (ingesteld de laatste keer dat u de persona-switch in de hero header gebruikte)
2. Als `lastPersona = customer` en uw account heeft een gekoppelde klant → `/profile/customer`
3. Als `lastPersona = operator` → `/profile/operator`
4. Anders: operator als u een operatoraccount heeft, klant alleen als u dat niet heeft
5. Standaard fallback: `/profile/operator`

U ziet een spinner met "Redirecting..." voor het korte moment tussen landen en doorleiden.

## De hero header (gedeeld tussen operator- en klantweergaven)

Een plakkende header staat bovenaan `/profile/operator` en `/profile/customer`. Deze toont:

- **Avatar** met een camera-overlay bij hover — klik om de **Avatar uploaden**-dialoog te openen
- **Naam** (klik om te kopiëren) en **e-mail** (klik om te kopiëren) — beide hebben tooltips voor kopiëren naar klembord
- **Badges** — uw status (`Actief` / `Inactief`), `Geverifieerd` en `Klant` als u in klantweergave bent
- **Snelle KPI's** — vier kleine tegels, inhoud afhankelijk van persona (zie hieronder)
- **Persona-switch** — twee knoppen (`Operator` / `Klant`). De Klant-knop is uitgeschakeld met een tooltip als uw account geen gekoppelde klant heeft
- **Acties** — `Bewerken`-knop, plus een drie-puntjesmenu met _Gebruikers-ID kopiëren_, _E-mail kopiëren_, _Openen als JSON_ (toont uw gebruikersrecord in een nieuw tabblad) en _Uitloggen_

Het schakelen van persona via deze knoppen slaat uw keuze op in `lastPersona` in localStorage zodat `/profile` de volgende keer weet waar u naartoe moet.

## `/profile/operator` — drie tabbladen

De operatorweergave organiseert alles in drie tabbladen. De URL-hash (`#overview`, `#security`, `#preferences`) weerspiegelt het actieve tabblad, zodat u direct naar een tabblad kunt linken.

### Overzicht-tabblad

Twee kaarten naast elkaar: **Organisatie & Rol** (links) en **Activiteit** (rechts).

De kaart **Organisatie & Rol** toont, in alleen-lezen vorm:

| Veld           | Bron                                                                  |
| -------------- | --------------------------------------------------------------------- |
| **Gebruikers-ID** | Uw operator-ID — afgekort tot 8 tekens met een kopieer-naar-klembord-icoon |
| **Teams**      | Label-tags die aan u zijn toegewezen (opgehaald uit de tags-cache)    |
| **E-mail**     | Het e-mailadres van uw account                                       |
| **Status**     | `Actief` / `Inactief` badge                                          |
| **Rol**        | Rol-label, met aantal permissies tussen haakjes                      |
| **Afdeling**   | Uit uw organisatieprofiel                                            |
| **Functie**    | Uit uw organisatieprofiel                                            |
| **Locatie**    | Stad en tijdzone, indien ingesteld                                   |
| **2FA**        | `Ingeschakeld` (groen) of `Uitgeschakeld` (grijs) — alleen zichtbaar als bekend |

Deze kaart is **alleen-lezen** in de operatorweergave. Om een van deze velden te wijzigen (rol, afdeling, functie, tags), moet een beheerder uw record bewerken via [Operators](../../settings/access/operators.md) — u kunt uzelf niet promoten.

De kaart **Activiteit** toont uw laatste vijf acties, opgehaald uit `/activity/operator/{id}`:

- Gekleurde stip (groen = Aangemaakt, blauw = Bijgewerkt, oranje = Verwijderd, primair = anders)
- Categorie-badge ("Aangemaakt" / "Bijgewerkt" / "Verwijderd" / "Beveiliging")
- Beschrijving ("Voertuig #ABC bijgewerkt", enz.)
- Relatieve tijd ("2 uur geleden")
- Actor — meestal "door uzelf", "door Systeem" voor geautomatiseerde wijzigingen

Als de activiteitenfeed leeg is, valt de kaart terug op het tonen van uw **recente inlogsessies** als Beveiligingsevenementen. Een "Alles bekijken"-knop onderaan schakelt naar het tabblad Beveiliging waar de volledige sessielijst staat.

De KPI's boven de kaarten tonen `{n} actions · {m} changes in 30d`.

### Beveiliging-tabblad

Twee kaarten gestapeld: **Wachtwoordbeheer** en **Actieve sessies**.

**Wachtwoordbeheer** laat u uw eigen wachtwoord wijzigen via een dialoog. Open deze via de _Wijzigen_-knop naast "Huidig wachtwoord".

De dialoog heeft drie velden:

| Veld                 | Validatie                                          |
| --------------------- | -------------------------------------------------- |
| Huidig wachtwoord     | Verplicht; minimaal 8 tekens                        |
| Nieuw wachtwoord      | Verplicht; minimaal 8 tekens; moet verschillen van huidig |
| Bevestig nieuw wachtwoord | Verplicht; minimaal 8 tekens; moet gelijk zijn aan nieuw wachtwoord |

De verzendknop blijft uitgeschakeld totdat alle drie de velden geldig zijn. Inline fouten verschijnen rood onder elk veld tijdens het typen. Bij succes krijgt u een toastmelding en sluit de dialoog; het formulier wordt gewist.

Onder de wachtwoordsectie staat een kleine **wachtwoordgeschiedenis**-tabel die de laatste drie wijzigingsgebeurtenissen toont met datum, actie en reden. (Dit is momenteel een statische tijdelijke aanduiding — de backend biedt nog geen wachtwoordgeschiedenis-endpoint aan.)

**Actieve sessies** worden weergegeven door de gedeelde sessiebeheerder. Sessies worden **gegroepeerd op apparaatherkenning** (browser + OS + apparaattype + fabrikant + model), zodat meerdere tabbladen op dezelfde laptop in één groep worden samengevouwen.

Elke groepskop toont:

- Een apparaatikoon (Monitor / Smartphone / Laptop op basis van `deviceType`)
- Apparaatlabel — fabrikant + model, of OS + versie, of apparaattype
- Browserlabel
- Een statusbadge: `active` (laatste activiteit onder 1u, groen), `inactive` (onder 24u, grijs), `old` (boven 24u, gedempt), of `Dit apparaat` (de huidige sessie, blauwe omlijning)
- Tijd van laatste activiteit (relatief)
- Aantal sessies in de groep

Klik op een groepskop om deze uit te klappen en elke individuele sessie binnenin te zien, elk met land en IP van de locatie-opzoeking, de aanmeldingsdatum en een prullenbakpictogram om die sessie in te trekken. De groep kan ook als geheel worden ingetrokken via de knop "Afmelden op dit apparaat" onderaan de uitgeklapte lijst (de huidige sessie blijft altijd behouden).

Een **Afmelden op andere sessies**-knop bovenaan trekt _alle_ andere sessies in één keer in. Het huidige apparaat wordt nooit aangeraakt. Het aantal omvat alle niet-huidige sessies op alle apparaten.

### Voorkeuren-tabblad

Twee kaarten: **Thema & kaartstijl** en **Meldingsgeluiden**.

De eerste kaart bevat de gedeelde thema-selector en kaartstijl-selector — dezelfde widgets als het zwevende profielblad. Zie [Themes](../../features/ux/themes.md) voor de volledige uitleg van modi, accentkleuren en kaartstijlen.

De tweede kaart bevat de instellingen voor meldingsgeluiden — geluiden per toasttype, per melding, en onafhankelijke volumeschuifregelaars voor toasts en meldingen. Zie [Notifications](../../features/ux/notifications.md) voor de volledige keuze.

Alles in dit tabblad schrijft naar de **localStorage** van je browser, niet naar de server. Dat betekent dat voorkeuren per apparaat en per browser zijn — ze volgen je niet als je vanaf een andere machine inlogt.

## `/profile/customer` — klantzijdeweergave

Als je operatoraccount **ook** gekoppeld is aan een berijder- (klant)account in dezelfde Ridewolf-installatie, kun je van persona wisselen om te zien hoe je eruitziet vanaf de klantzijde. De persona-knop in de hero-header brengt je hierheen.

### Wanneer je geen klantaccount hebt

Zie je een gestippelde lege-toestand-kaart met:

- Een pictogram en de koptekst "Koppel je klantprofiel"
- Een beschrijving
- Twee knoppen — **Klantaccount aanmaken** en **Bestaand koppelen** (beide tonen momenteel "Binnenkort beschikbaar"-toasts; nog geen backend)
- Een verificatie-alarm
- Een link "Doorgaan als Operator" terug naar `/profile/operator`

### Wanneer je wel een klantaccount hebt

Twee tabbladen: **Overzicht** en **Ritten**.

De hero-KPI's schakelen naar klantrelevante cijfers: **Saldo** (geformatteerde valuta), **Totaal aantal ritten**, **Beoordeling** (1 decimaal), **Bonus** (punten).

**Overzicht-tabblad** toont:

- **Portemonnee** kaart — huidig saldo, optionele bonuspunten (alleen als > 0), en de gekoppelde betaalmethode (merk + laatste 4 cijfers + vervalmaand/jaar + type provider) als die bestaat
- **Ritstatistieken** kaart — drie tegels: Totaal aantal ritten, Beoordeling met een ster (en een "{n} beoordeeld" sublabel), Bonuspunten
- **Accountinfo** zijbalk — Klant-ID (monospace, afgekapt), Provider, Aangemaakt (relatief), Laatst actief (relatief, indien aanwezig), Laatste rit (relatief, indien aanwezig)
- **Apparaten** kaart — je geregistreerde klantapparaten (iOS / Android / Web) weergegeven door de gedeelde `ClientDevicesList`
- **Veiligheid & ondersteuning** snelkoppelingen — FAQ, Contact Ondersteuning, Probleem melden (tijdelijke knoppen)

**Ritten-tabblad** toont je laatste 20 ritten (meest recent eerst), met:

- Rit-ID (monospace) en aanmaaktijd (relatief)
- Statusbadge (`completed` solide, `active` secundair, andere outline)
- Afstand (km), duur (minuten of `Uu Mm`), voertuiglabel
- Prijs (geformatteerde valuta)
- Sterrenrij voor de beoordeling, indien aanwezig

Het gebruikt een scrollbare container met een vaste hoogte van 500px en een 4-skelet-laadtoestand. Lege toestand toont een kaartpictogram en "Nog geen ritten".

Er is **geen bewerkformulier hier** — dit is een alleen-lezen spiegel van wat in je Rider App verschijnt. De Bewerken-knop in de hero-header toont momenteel een "Binnenkort beschikbaar"-toast.

## `/profile/legacy` — single-page fallback

`/profile/legacy` is het **oudere één-pagina-profiel**, bewaard voor fallback en directe koppeling. Het pakt bijna alles op één scrollende pagina in plaats van tabbladen:

- Een profielkopkaart met avatar, naam, e-mail, statusbadge en Bewerken / Opslaan / Annuleren knoppen
- **Persoonlijke informatie** kaart — bewerkbare Voornaam, Achternaam (tekstinvoer bij bewerken); alleen-lezen E-mail en bewerkbare Telefoon
- **Accountinformatie** kaart — alleen-lezen Gebruikers-ID (afgekapt + kopiëren), E-mail, Status (ruwe waarde)
- **Uiterlijk** kaart — thema-selector en kaartstijl-selector (dezelfde widgets als Voorkeuren-tabblad)
- **Meldingen & Geluiden** kaart
- **Beveiliging** kaart — wachtwoordrij met een Wijzigen-knop (op dit moment opent deze de dialoog niet)
- Een voettekst met de app-versie (`CF_PAGES_COMMIT_SHA` eerste 7 tekens, of `DEVELOPMENT_KIT` lokaal)

Twee belangrijke kanttekeningen:

- De **Opslaan**-actie toont momenteel een "Functie nog niet beschikbaar"-toast — de backend heeft geen `PATCH /operators/me` endpoint, dus bewerkingen van Voornaam, Achternaam en Telefoon worden niet opgeslagen
- Foto-upload is verwijderd uit deze weergave; gebruik de vernieuwde `/profile/operator` en klik op je avatar om de uploaddialoog te openen

Gebruik bij voorkeur `/profile/operator` voor dagelijks gebruik. Bewaar deze URL alleen als bladwijzer als een toekomstige fix voor de vernieuwde weergave ooit terugvalt op deze.

## Avatar-uploaddialoog

Openen vanuit de hero-header (klik op je avatar) in de vernieuwde weergaven.

Accepteert:

- Bestandstypen: alleen `image/png`, `image/jpeg`, `image/jpg` — alles anders veroorzaakt een "Bestandstype"-fout
- Maximale bestandsgrootte: **10 MB** — grotere bestanden veroorzaken een "Bestandsgrootte"-fout
- Sleep en zet neer of klik om te kiezen

De dialoog toont een voorbeeld, de bestandsnaam en een voortgangsbalk tijdens het uploaden. De uploadvolgorde is:

1. `POST` het bestand → retourneert een `avatarUrl`
2. `PATCH /me` met `{ photo: avatarUrl }` → retourneert het bijgewerkte gebruikersrecord
3. De gebruikersopslag wordt bijgewerkt met het nieuwe `photo`-veld; de nieuwe avatar verschijnt direct overal waar deze wordt weergegeven

Toasts bevestigen succes of mislukking. Bij succes sluit de dialoog zichzelf.

## Veldreferentie (voor alle routes)

Een geconsolideerde lijst van wat bewerkbaar is, waar en hoe het wordt gevalideerd:

| Veld                         | Bewerkbaar op                 | Validatie                                                          |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Avatar / foto                | Operator                      | PNG/JPG/JPEG, max 10 MB                                             |
| Voornaam                    | Legacy (kapot — geen backend) | Geen client-side validatie                                          |
| Achternaam                  | Legacy (kapot — geen backend) | Geen client-side validatie                                          |
| Telefoon                   | Legacy (kapot — geen backend) | Geen client-side validatie                                          |
| Huidig wachtwoord          | Operator → Beveiliging        | Verplicht, ≥ 8 tekens                                               |
| Nieuw wachtwoord           | Operator → Beveiliging        | Verplicht, ≥ 8 tekens, moet verschillen van huidig                 |
| Bevestig wachtwoord        | Operator → Beveiliging        | Verplicht, moet overeenkomen met nieuw wachtwoord                  |
| Thema modus                | Operator → Voorkeuren, Legacy | Alleen localStorage                                                |
| Thema kleur                | Operator → Voorkeuren, Legacy | Alleen localStorage                                                |
| Kaartstijl                 | Operator → Voorkeuren, Legacy | Alleen localStorage                                                |
| Configuratie notificatiegeluid | Operator → Voorkeuren, Legacy | Alleen localStorage                                                |
| Rol / Afdeling / Functie / Labels | _Niet hier_                  | Bewerkt door een beheerder via [Operators](../../settings/access/operators.md) |

## Typische workflows

- **Reset je eigen wachtwoord** — `/profile/operator` → tabblad Beveiliging → Wijzigen → vul alle drie de velden in → Verzenden. De dialoog sluit en je blijft ingelogd
- **Uitloggen van een openbare computer die je bent vergeten** — tabblad Beveiliging → vouw de apparaatgroep uit → prullenbakpictogram bij die sessie, of "Log dit apparaat uit" voor alle sessies daarop. Je huidige sessie is altijd beschermd
- **Verdachte activiteit** — tabblad Beveiliging → "Log andere sessies uit" bovenaan trekt in één klik alle niet-huidige sessies in
- **Verander je avatar** — klik op de avatar in de hero-header → drop een PNG/JPG tot 10 MB → Uploaden
- **Schakel het dashboard over naar donkere modus** — tabblad Voorkeuren → Thema modus = Donker (of stel Systeem in en laat het besturingssysteem beslissen)
- **Bladwijzer een tabblad** — elk tabblad heeft een hash (`#overview`, `#security`, `#preferences`); kopieer de URL met de hash en gebruik die als directe link
- **Zie jezelf als klant** — als je account gekoppeld is, klik op de Klant-knop in de hero-header → zie je Rider App-weergave (saldo, ritten, apparaten). Schakel op dezelfde manier terug

## Tips

- **Wat je hier kunt bewerken is beperkt** — je rol, afdeling, functie, labels en e-mail worden allemaal beheerd op de [Operators](../../settings/access/operators.md)-pagina door een beheerder. Profiel is alleen voor je eigen avatar, wachtwoord, sessies en voorkeuren
- **Voorkeuren zijn lokaal** — thema's en notificatiegeluiden staan in localStorage, niet op de server. Wis je browsergegevens en ze worden gereset; wissel van apparaat en ze volgen niet
- **De hash bepaalt het tabblad** — `/profile/operator#security` opent direct op Beveiliging. Gebruik dit in chatlinks zodat een collega dezelfde weergave ziet als jij
- **De legacy-weergave's Opslaan-knop is momenteel een doodlopende weg** — totdat `PATCH /operators/me` beschikbaar is, gebruik de vernieuwde operatorweergave voor alles; voor naamswijzigingen vraag een beheerder
- **Sessies zijn gegroepeerd per apparaat** — als je één vermelding ziet die meerdere tabbladen beslaat, is dat verwacht. Vouw uit om individuele sessies te zien
- **De klantpersona is afhankelijk van data** — zelfs als de knop zichtbaar is, doet deze niets nuttigs tenzij je account een `client`-record heeft gekoppeld. Als je die niet hebt, negeer dan de Klant-knop en blijf op `/profile/operator`
