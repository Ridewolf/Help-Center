# Service-app — Overzicht, Inloggen en Navigatie

De Service-app is Ridewolfs app voor veldmedewerkers — wat een technicus op straat bij zich heeft om batterijen te wisselen, scooters te ontgrendelen, storingen te verhelpen en tickets af te sluiten. Het is een apart product van de Rider App en het operator-dashboard: het heeft een eigen aanmelding en eigen navigatie.

Na het inloggen opent de app direct op de vlootkaart (`/battery-swap`) in plaats van een startdashboard, omdat de kaart in het veld het startpunt is voor elke klus.

Waarnaartoe vervolgens:

- [Vlootkaart en QR-zoekfunctie](../fleet/fleet-map.md) — vind een voertuig
- [Voertuigpagina](../fleet/vehicle-controls.md) — bediening, tickets, storingen, meldingen
- [Batterijwissel](../operations/battery-swap.md) — de getimede wisselvolgorde
- [Scooter zoeken](../operations/finder.md) — Bluetooth-radar voor de laatste meters
- [Batchmodus](../operations/batch-mode.md) — een wachtrij voertuigen om door te werken
- [Backoffice-tools](../tools/back-office-tools.md) — opnieuw afspelen, analyse, supportwachtrijen

## Inloggen

Het inlogscherm (`/login`) wordt alleen getoond aan uitgelogde operators — als je al bent ingelogd, brengt de app je direct naar de vlootkaart.

1. Voer je **werk-e-mail** in. Dit moet een volledig adres zijn (met een apenstaartje en een punt), anders wordt het veld afgekeurd voordat er iets wordt verzonden.
2. Voer je **wachtwoord** in — minimaal 6 tekens.
3. Verstuur. Alleen operatoraccounts werken hier; inloggegevens van rijders worden geweigerd.
4. Je profiel wordt geladen (naam, rol, functie, afdeling, bedrijf, rechten) en de app opent de vlootkaart.

### Inloggen met Google en Apple

De knoppen **Google** en **Apple** verschijnen alleen als die inlogmethode is ingeschakeld voor jouw installatie. Een ontbrekende knop is geen per-operator-instelling — niemand in jouw bedrijf ziet die dan.

- **In de app** — tikken op de knop opent de pagina van de provider in de browser van je telefoon, en de app wacht tot de browser de aanmelding teruggeeft. De wachttijd verloopt na 5 minuten (met een korte respijt zodra de app weer op de voorgrond is). Als de app werd gesloten terwijl de browser openstond, voltooit een koude start alsnog de aanmelding.
- **In een browser** — Google-aanmelding opent in een popupvenster.

Hoe dan ook is de rest van het proces hetzelfde als bij een wachtwoordinlog.

## Het navigatiemenu

Elk scherm heeft een menuknop die het navigatiemenu opent — een paneel dat van links inschuift. Inhoud, van boven naar beneden:

| Item                | Opent                 | Opmerkingen                                        |
| ------------------- | --------------------- | ------------------------------------------------- |
| **Je profiel**      | `/profile`            | Avatar, naam en e-mail                             |
| **Driver App**      | `/battery-swap`       | De vlootkaart — "Beheer je vloot onderweg"       |
| **Replay Player**   | `/replay-player`      | Speel de dag van één voertuig af                   |
| **Scooter zoeken**  | `/finder`             | "Vind een scooter via Bluetooth"                 |
| **Herbalanceren**   | `/rebalancing`        | Alleen eigenaar, uitgeschakeld, toont een **Binnenkort**-badge |
| **Ondersteuning**   | `/support/tickets`    | Alleen eigenaar                                    |
| **Gesprekken**      | `/support/dialogs`    | Alleen eigenaar                                    |
| **Parkeerbewijzen** | `/support/park-proofs`| Alleen eigenaar                                    |
| **Analyse**         | `/analytics`          | Alleen eigenaar                                    |

Drie extra knoppen staan in een vastgezette voettekst onder de scrollbare lijst:

- **Instellingen** — opent het App-instellingenmenu (zie hieronder)
- **Kaartvoorkeuren** — opent het kaartinstellingenblad, beschreven in [Vlootkaart](../fleet/fleet-map.md#kaartvoorkeuren)
- **Uitloggen** — rood gestyled

Twee labeleigenaardigheden zijn het onthouden waard, want die veroorzaken de meeste "Ik kan het niet vinden"-vragen: de vlootkaart heet **Driver App**, niet "Battery Swap", en de Bluetooth-radar heet **Scooter zoeken**, niet "Finder". Elk item heeft ook een korte beschrijving onder het label.

De acht navigatie-items zijn één platte lijst, geen geneste groepen — **Ondersteuning**, **Gesprekken** en **Parkeerbewijzen** zijn gelijken, ook al zitten hun routes allemaal onder `/support`. Het item dat bij je huidige scherm hoort, krijgt een accentkleur achtergrond.

Twee regels verklaren de meeste "het menu ziet er anders uit op mijn telefoon"-meldingen:

- **Items alleen voor eigenaren zijn helemaal verborgen** voor andere operators — ze zijn niet grijs gemaakt, dus er is niets om op te tikken en niets om over te vragen.
- **Uitgeschakelde items tonen een Binnenkort-badge** waar normaal een pijl staat.

## Profielpagina

Open `/profile` via de profielknop in het menu.

- **Koptekst** — een grote avatar (je initialen als er geen foto is) met een cameraknop om er een te uploaden. Alleen afbeeldingen, maximaal 5 MB. Er zit een statusbadge naast, plus een eigenaarbadge voor eigenaren.
- **Account** — rol, afdeling, functie, telefoon, aantal rechten, lid-sinds datum en je gebruikers-ID met een kopieerknop (handig als de ondersteuning erom vraagt).
- **Werkruimtes** — als je bij meer dan één bedrijf hoort, schakel je hier. De app laadt opnieuw onder het gekozen bedrijf.
- **Beveiliging** — **App-vergrendeling**, **PIN wijzigen**, **Wachtwoord wijzigen**, **Actieve sessies**.
- **Meer** — **Uiterlijk & Taal**, opent hetzelfde App-instellingenmenu als het **Instellingen**-item in het menu.
- **Uitloggen** onderaan.

### App-vergrendeling

**App-vergrendeling** is alleen beschikbaar in de geïnstalleerde app, dus deze sectie ontbreekt in een browser. Aanzetten start een korte wizard die een PIN en biometrische gegevens van je apparaat registreert. Na registratie gebruik je **PIN wijzigen** om de code te vervangen.

### Wachtwoord wijzigen

1. Open **Wachtwoord wijzigen** in de sectie Beveiliging.
2. Voer je huidige wachtwoord in, daarna het nieuwe wachtwoord twee keer.
3. Verstuur.

Alle drie de velden vereisen minimaal 8 tekens, het nieuwe wachtwoord moet verschillen van het huidige, en de bevestiging moet overeenkomen. De dialoog wist zijn velden en fouten elke keer dat deze wordt geopend en gesloten, zodat er niets achterblijft op een gedeelde telefoon.

### Actieve sessies

Sessies worden gegroepeerd op browser, besturingssysteem en apparaatfabrikant. Elke groep toont:

- Een tellerbadge
- De locatie (land en IP-adres)
- Hoe lang geleden het voor het laatst actief was
- Een **huidig apparaat** badge op het apparaat dat u gebruikt

**Intrekken** is beschikbaar op elke groep behalve het huidige apparaat. **Andere apparaten afmelden** trekt alle andere sessies tegelijk in — de snelste reactie bij verlies van een telefoon.

## App-instellingen paneel

Een onderblad, geopend vanuit het **Instellingen** item in het menu of de **Uiterlijk & Taal** knop op de profielpagina. Elke instelling wordt direct toegepast; er is geen Opslaan-knop.

| Instelling       | Opties                                                    |
| ---------------- | ---------------------------------------------------------- |
| **Thema**        | Licht, Donker, Systeem                                    |
| **Kaartstijl**   | Standaard, Straat, Satelliet, 3D, Navigatie, Vlak          |
| **Offline kaarten** | Download de kaart rond uw huidige locatie voor offline gebruik |
| **Taal**         | Auto, Engels, Roemeens, Russisch                          |
| **Mijn markering** | Een raster van 6 pictogrammen voor hoe uw eigen positie wordt weergegeven |

**Offline kaarten** downloadt een gebied rond uw huidige locatie en houdt dit in de cache. Tijdens het downloaden ziet u een teller van gedownloade tegels en een **Annuleren** knop. Het uitschakelen van deze instelling annuleert elke lopende download en wist het gecachte gebied.

De kaartweergave voor voertuigen (markeringen, overlays, clustering, verversingssnelheid) bevindt zich in het aparte **Kaartvoorkeuren** paneel — zie [Fleet map](../fleet/fleet-map.md#kaartvoorkeuren).

## Uitloggen

**Uitloggen** bevindt zich in het navigatiemenu en opnieuw onderaan de profielpagina. Het schakelt App Lock uit, meldt u af en brengt u terug naar het aanmeldscherm met uw sessie gewist van het apparaat.

## Veelvoorkomende problemen

| Symptom                                         | Oorzaak                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Geen **Google** of **Apple** knop               | Die aanmeldmethode is niet ingeschakeld voor uw installatie            |
| Een menu-item dat een collega heeft ontbreekt bij u | Het is alleen voor eigenaren                                            |
| Een item opent niet en toont **Soon**            | Het is opzettelijk voorlopig uitgeschakeld                             |
| Geen **App Lock** sectie op de profielpagina     | U gebruikt de browserversie; App Lock vereist de geïnstalleerde app     |
| Aanmelden geweigerd voordat iets laadt            | Het e-mailformaat of het minimum van 6 tekens voor het wachtwoord is mislukt op het apparaat |
| Menulabels komen niet overeen met wat u verwacht  | De vlootkaart is **Driver App**; de Bluetooth-radar is **Find Scooter** |
