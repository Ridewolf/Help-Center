# Voertuigtarieven

De prijzencatalogus voor uw Ridewolf-vloot. Een **Tarief** is een zelfstandige set geldregels — basisprijs, starttarief voor rit, tarief per afstand, pauzetarief, betaald reserveringstarief, plus kortingniveaus en een automatische terugbetalingsbeveiliging — die het systeem gebruikt om te berekenen wat een berijder betaalt voor een rit.

Bevindt zich op `/settings/vehicle-tariffs`. Machtiging: **Lijst Tarieven** (`v1w2x3`).

## Wat is een Tarief

Een Tarief is **niet** direct gekoppeld aan een voertuig — het is gekoppeld aan een **Voertuigmodel** in [Voertuiginstellingen](vehicle-settings.md). De keten is:

```
Tarief  →  Voertuigmodel  →  Voertuig  →  Rit
```

Een enkel tariefrecord bevat:

- **Identiteit** — `Naam`, `Beschrijving` (Markdown), `Status` (Actief / Inactief / Gearchiveerd), `Labels`
- **Prijsunit** — `Type`: een van `per-minute`, `per-hour`, `per-day`, `per-month`. Dit bepaalt de facturatiegranulariteit (per minuut gebruikt wiskunde op secondeniveau; per dag/per maand gebruikt afronding naar boven — een volledige eenheid wordt vooraf in rekening gebracht)
- **Prijsvelden** (alle geldwaarden gebruiken uw bedrijfsvaluta):
  - **Basisprijs** — kosten van één prijsunit (bijv. één minuut, één dag)
  - **Startprijs rit** — vaste ontgrendelingskosten die eenmaal bij het starten van de rit worden gerekend
  - **Afstandsprijs** — kosten per afgelegde km
  - **Pauzeprijs** — kosten per minuut terwijl de rit gepauzeerd is
  - **Betaald reserveringstarief** — kosten per minuut zodra het gratis reserveringsvenster is verlopen
  - **Reserveringstijd** — gratis reserveringsminuten voordat betaald reserveren ingaat
- **Kortingsniveaus** — drie optionele niveaus (Eerste / Tweede / Derde). Elk niveau is _"na N eenheden, pas X % korting toe"_, zodat langere ritten geleidelijk goedkoper worden
- **Automatische terugbetaling** — schakelaar + twee drempels (`distance` in meters, `time` in seconden). Wanneer ingeschakeld, als de berijder de rit stopt voordat beide drempels zijn bereikt, annuleert en vergoedt de backend — beschermt berijders tegen kosten bij een mislukte ontgrendeling

## Waar het Tarief van toepassing is

1. Operator maakt hier een **Tarief** aan of bewerkt het
2. Operator koppelt het tarief aan een **Voertuigmodel** in [Voertuiginstellingen](vehicle-settings.md)
3. Voertuigen die aan dat model zijn toegewezen erven het tarief
4. Wanneer een berijder een rit start, maakt de backend een **snapshot van het tarief** op het ritrecord en gebruikt die snapshot voor alle facturatieberekeningen

> **De snapshot is het cruciale onderdeel.** Het later bewerken of verwijderen van een tarief verandert **niet** achteraf voltooide of lopende ritten. De ritopdeling die u ziet in [Ritdetail](../../operations/trips/ride-detail.md) wordt berekend op basis van de tariefwaarden **zoals ze waren bij het starten van de rit** — zo houdt Ridewolf de facturatie controleerbaar.

## Filters

De filterbalk boven de tabel:

| Filter     | Type   | Opties                                                  |
| ---------- | ------ | ------------------------------------------------------- |
| **Zoeken** | tekst  | Vrije invoer — zoekt in naam / beschrijving             |
| **Status** | select | Alle statussen · Actief · Inactief · Gearchiveerd       |
| **Type**   | select | Alle types · Per minuut · Per uur · Per dag · Per maand  |

Filters zijn vertraagd en de tabel wordt bij elke wijziging opnieuw geladen vanaf pagina 1. De URL-status wordt gesynchroniseerd — plak de URL om dezelfde weergave te delen.

## Kolommen

| Kolom           | Sorteerbaar | Opmerkingen                                                                       |
| --------------- | ----------- | --------------------------------------------------------------------------------- |
| **Naam**        | ja          | Het tarieflabel                                                                   |
| **Beschrijving**| ja          | Afgekapt; volledige tekst bij hover (Markdown elders gerenderd)                  |
| **Type**        | ja          | Omrande badge — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Prijs**       | ja          | Basisprijs, geformatteerd in uw bedrijfsvaluta, monospaced                        |
| **Labels**      | nee         | Maximaal 2 labelchips + `+N` overflow. Klik om een snelbewerkingspopover te openen|
| **Status**      | ja          | Gekleurde badge (Actief groen / Inactief grijs / Gearchiveerd blauw). Klik voor snelbewerking |
| **Aangemaakt**  | ja          | Aanmaakdatum                                                                      |
| **Bijgewerkt**  | ja          | Laatste update datum                                                              |

Sorteren gebeurt **client-side** — werkt op de huidige pagina.

## Header-acties

- **Automatisch vernieuwen** — vernieuwt de lijst (handmatig klikken of interval, zie [Automatisch vernieuwen](../../features/ux/notifications.md))
- **Exporteren** — opent de exportdialoog (huidige pagina · alle gefilterde · specifieke pagina's). Output is een `vehicle-tariffs-export.json` bestand
- **+ Aanmaken** — opent het aanmaakformulier. Alleen zichtbaar als u de **Tarief aanmaken** submachtiging heeft

## Rij-acties

Het `⋯` menu per rij:

- **Details bekijken** — opent `/settings/vehicle-tariffs/:id` (altijd beschikbaar)
- **Bewerken** — opent `/settings/vehicle-tariffs/:id/edit` (vereist `edit` submachtiging)
- **Verwijderen** — opent een bevestiging met een 3-seconden vasthouden; bij bevestiging wordt het tarief verwijderd (vereist `delete` submachtiging)

> **Verwijderen met voorzichtigheid.** Voertuigmodellen die naar het verwijderde tarief verwijzen, moeten worden toegewezen aan een ander tarief voordat nieuwe ritten op die voertuigen kunnen starten. Bestaande ritrecords behouden hun snapshot intact.

## Snelbewerking (Labels / Status)

Klik direct op de **Labels** chips of de **Status** badge in een rij → er opent een klein dialoogvenster waarmee u alleen die velden kunt wijzigen zonder het volledige bewerkingsformulier te openen. Een toast bevestigt; de tabel wordt vernieuwd.

## Aanmaak- / bewerkingsformulier

Zowel `/settings/vehicle-tariffs/create` als `/settings/vehicle-tariffs/:id/edit` gebruiken dezelfde formulierindeling: een linkerkaart met de invoervelden, een rechter **Veldgids** zijbalk met contextuele hulp en een **live preview** van de ingevoerde waarden (naam, type, basisprijs, start/afstand, pauze, reservering, labels, kortingsniveaus).

### Verplichte velden

| Veld           | Vereist  | Validatie                                |
| -------------- | -------- | ----------------------------------------- |
| **Naam**       | ja       | Niet leeg                                |
| **Type**       | ja       | Eén van de 4 opties                      |
| **Status**     | ja       | Eén van `active` / `inactive` / `archived` |
| **Basisprijs** | ja       | `>= 0`                                   |

Alle andere monetaire velden hebben standaardwaarde `0` en accepteren `0` (effectief "functie uitgeschakeld").

### Secties

1. **Identiteit** — Naam, Beschrijving (Markdown), Type, Status, Labels
2. **Prijzen** — Basisprijs, Startprijs rit, Afstandprijs, Pauzeprijs, Betaalde reserveringsprijs, Reserveringstijd (minuten)
3. **Automatische terugbetaling** — Schakelaar. Wanneer ingeschakeld, vul `Afstand` (meters) en `Tijd` (seconden) in. Beide drempels moeten worden overschreden voordat de rit als gestart wordt beschouwd; anders wordt deze automatisch geannuleerd met terugbetaling
4. **Kortingsniveaus** — Drie niveaus. Elk: `Korting %` (0-100) en `Na eenheden` (hoeveel prijsunits moeten verstrijken voordat de korting actief wordt). Laat een niveau op nul staan om het over te slaan

### Opslaggedrag

- **Aanmaken** → toast "aangemaakt", leidt door naar de detailpagina
- **Bewerken** → toast "bijgewerkt", leidt door naar de detailpagina
- **Niet-opgeslagen wijzigingen** worden bijgehouden via snapshot-verschil. Bij het verlaten van de pagina (annuleren / terug) opent een bevestigingsdialoog als er iets is veranderd

> **Backend statusmapping.** De `archived` waarde van het formulier wordt naar de backend gestuurd als `deleted` — dat is de interne naam. Operators zien `archived` overal in de UI.

## Detailpagina

`/settings/vehicle-tariffs/:id` toont een kop met het tarieflabel, een statusbadge, **Bewerken** en **Verwijderen** acties, drie overzichtskaarten (Status / Aangemaakt / Bijgewerkt), daarna een **Details** kaart met:

- Identiteitsvelden (Naam, Type, Status, Basisprijs, datums)
- **Beschrijving** gerenderd vanuit Markdown
- **Prijzen** — rasterweergave van alle 5 monetaire tarieven (`TariffPriceGrid`)
- **Automatische terugbetaling** — ingeschakeld/uitgeschakeld badge, plus de twee drempels als actief
- **Kortingsniveaus** — visuele uitsplitsing van de drie niveaus (`TariffDiscountTiers`)
- **Labels** — opgeloste labelchips (alleen als er labels zijn ingesteld)
- **Systeeminfo** — volledige ID, aanmaak-/bijwerktijdstempels

## Hoe de snapshot de rituitsplitsing aanstuurt

Wanneer je een [Ritdetail](../../operations/trips/ride-detail.md) opent, wordt de **Uitsplitsingskaart** berekend uit:

- `ride.tariff` — de snapshot ingebed in de rit bij starttijd
- De live rittelemetrie (duur, afstand, pauzetijd, reserveringstijd)

De wiskunde die de backend lokaal spiegelt:

- **Basis** — `eenheden × Basisprijs`, waarbij `units` = verstreken seconden (per minuut) of afgeronde dagen/maanden voor ceil-gebaseerde types
- **Ontgrendelingskosten** — vaste `Startprijs rit`, één keer in rekening gebracht
- **Afstand** — `km × Afstandprijs`
- **Pauze** — `pauzeminuten × Pauzeprijs`
- **Reservering** — eerste `Reserveringstijd` minuten gratis, daarna `betaalde minuten × Betaalde reserveringsprijs`
- **Kortingsniveaus** toegepast bovenop zodra drempels zijn overschreden

Als je vandaag een typefout in het tarief corrigeert, worden **de ritten van gisteren niet beïnvloed** — hun uitsplitsingen tonen nog steeds de oude cijfers omdat de snapshot de bron van waarheid is.

## Werkstromen

- **Een nieuw prijsmodel lanceren** — maak het tarief aan (Status `Inactief`) → review met financiën → zet op `Actief` → koppel aan het relevante Voertuigmodel in [Voertuiginstellingen](vehicle-settings.md)
- **Seizoenspromo** — dupliceer een bestaand tarief (handmatig: nieuw aanmaken + velden kopiëren), wijzig `Basisprijs`, geef het een naam met datumachtervoegsel (bijv. `Zomer 2026 — Scooter`), koppel aan het model voor de promoperiode, zet daarna terug
- **Automatische terugbetaling afstellen** — begin met conservatieve drempels (kleine afstand + korte tijd) zodat mislukte ontgrendelingen niet worden gefactureerd, versoepel daarna als je valse positieve terugbetalingen ziet in [Ritten](../../operations/trips/rides.md)
- **Een oud tarief uitfaseren** — zet Status op `Gearchiveerd` (wordt als `deleted` naar de backend gestuurd) zodra geen Voertuigmodel het nog verwijst. Oude ritten behouden hun snapshots — je kunt veilig archiveren
- **Hernoemen voor duidelijkheid** — Naam is puur een label. Hernoemingen beïnvloeden nieuwe rit-snapshots vanaf dat moment; afgeronde ritten behouden de oude naam in hun uitsplitsing

## Tips

- **Snapshot, snapshot, snapshot** — twijfel je over de prijs van een historische rit, controleer `ride.tariff.*` op de [Ritdetail](../../operations/trips/ride-detail.md), niet het huidige tarief in deze lijst
- **Niet verwijderen — Archiveer in plaats daarvan** — Gearchiveerde tarieven blijven in de database (ze zijn soft-deleted server-side) en zijn nog steeds op te lossen vanuit oude rit-snapshots. Hard `Verwijderen` is prima voor nooit gebruikte concepten
- **Gebruik de live preview van de Veldgids** — de rechterzijbalk toont de berekende totalen terwijl je typt, wat de snelste manier is om een nieuw tarief te controleren voor het opslaan
- **Type is belangrijk voor de wiskunde** — overschakelen van `per-minute` naar `per-hour` schaalt de `Basisprijs` niet automatisch; je moet het handmatig herberekenen (1 minuut @ €0,20 ≠ 1 uur @ €0,20)
- **Kortingsniveaus zijn sequentieel** — `Na` wordt gemeten in dezelfde eenheden als `Type`. Een niveau met `Na: 30, Korting: 10 %` op een `per-minute` tarief betekent "vanaf minuut 30, 90 % van de basisprijs rekenen". De drie niveaus stapelen in volgorde — de hoogste toepasselijke wint
- **Label je tarieven** — labels worden doorgegeven aan het Voertuigmodel en helpen filteren in deze lijst. Veelvoorkomende labels: `Scooter`, `Fiets`, `Promo`, `Legacy`
