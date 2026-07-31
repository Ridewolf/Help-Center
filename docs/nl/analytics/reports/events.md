# Analyse — Recente Evenementen

De pagina Evenementen-analyse (`/analytics/events`) is uw **incidentendashboard**: elk opmerkelijk systeem-, voertuig-, gebruikers- en zone-evenement over een gekozen periode, met KPI-tellers, patronen in de tijd en een doorzoekbare feed onderaan.

Anders dan het [Meldingenpaneel](../../features/ux/notifications.md) (real-time, per gebeurtenis) — deze pagina is **geaggregeerd en historisch**, nuttig om trends te ontdekken en voor post-incident evaluatie.

Vereiste toestemming: **Recente Evenementen bekijken** (`s1t2u3`).

## Tijdsbestek & filters

Bovenaan staat een **datumbereikbalk** — elke metriek en grafiek houdt hier rekening mee. Vier extra filters versmallen het overzicht:

| Filter          | Opties                                                                 |
| --------------- | --------------------------------------------------------------------- |
| **Ernst**       | `critical` / `warning` / `info` (meervoudige selectie)                |
| **Type**        | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Bron type**   | `vehicle` / `user` / `zone` / `system`                                |
| **Status**      | `open` / `resolved` / `dismissed`                                     |

Alle filters worden gecombineerd met EN. De URL weerspiegelt elke instelling — deel een link en uw collega ziet exact hetzelfde overzicht.

## Secties

De pagina heeft **vijf secties**:

### 1. Samenvatting

Vier metriekkaarten vatten het aantal evenementen samen:

| KPI          | Wat het toont                                               |
| ------------ | ----------------------------------------------------------- |
| **Totaal**   | Totaal aantal evenementen in het bereik                     |
| **Kritiek**  | Aantal met `severity = critical` — het belangrijkste getal |
| **Waarschuwing** | Aantal met `severity = warning`                           |
| **Info**     | Aantal met `severity = info` — meestal ruis tenzij een piek |

Elke kaart heeft een vergelijkingsbadge "t.o.v. vorige periode".

### 2. Per Type

Een grafiek die evenementen uitsplitst per **type**:

- **Fout** — systeem- / integratiefouten
- **Offline** — IoT-apparaten die uitvallen
- **Batterij** — lage / lege / afwijkende alarmen
- **Betaling** — afwijzingen, gatewayproblemen
- **Ondersteuning** — ticket- / chatpieken
- **Onderhoud** — servicegerelateerde evenementen

Pieken in één type zijn meestal uw startpunt voor onderzoek.

### 3. Patronen

Twee tijdreeksgrafieken:

- **Per Dag** — evenementen per dag over het bereik (visualiseert wekelijkse cycli)
- **Per Uur** — evenementen per uur van de dag over het hele bereik (visualiseert dagelijkse pieken)

### 4. Topbronnen

Een lijst van de **topbronnen** die evenementen genereren — meestal individuele voertuigen of zones met onevenredig veel evenementen.

Elke vermelding bevat de bron (gelinkt naar de detailpagina), het aantal evenementen en de dominante ernst / type.

Hier vindt u het **voertuig dat de hele week alarm sloeg** of de **zone met batterijproblemen**.

### 5. Feed

Een scrollbare feed van individuele evenementen die aan de huidige filters voldoen. Elke rij toont:

- Ernstpictogram (gekleurd)
- Evenementtype + bronlabel
- Korte beschrijving
- Tijdstempel
- Statuspictogram

Klik op een feed-item om naar de gerelateerde entiteit te navigeren (voertuig, klant, rit, ticket) indien van toepassing.

## Typische workflows

- **Dagelijkse ochtendcontrole** — vooraf ingestelde _Laatste 24u_ → Ernst = Kritiek → scannen; alles rood krijgt aandacht voordat de rest van het dashboard wordt geopend
- **Topbronnen triage** — sectie Topbronnen → klik op een voertuig dat steeds terugkomt → oplossen of escaleren bij de bron
- **Patroondetectie** — patronengrafieken; een ongewone dag of uur toont dat er iets is veranderd (uitrol, weer, storing)
- **Post-incident evaluatie** — kies de dag → ernst = kritiek → kruiscontroleer Feed met de [Voertuig](../../operations/fleet/vehicle-detail.md) Meldingen-tab of [Betalingen-analyse](payments.md) Kwaliteitssectie afhankelijk van type
- **Opruimronde** — Status = Open → items die verouderd zijn in bulk oplossen (dit doet u vanaf de bronpagina's, niet hier, maar u vindt ze hier)

## Tips

- **Kritiek eerst** — begin met `severity = critical`; waarschuwingen en info lossen zich vaak vanzelf op
- **Type is uw detective** — zodra u een piek hebt, filter op het dominante type om de ruis te beperken
- **Topbronnen is goud waard** — één voertuig bovenaan de bronnenlijst verklaart meestal 30-50% van alle evenementen
- **Aggregaties vs ruwe data** — deze pagina aggregeert; voor de daadwerkelijke transacties / meldingen gaat u naar de bron-domeinpagina
- **Plakkerige filters** — uw instellingen blijven behouden bij navigatie; wis ze bij het doorgeven van de URL aan iemand anders
- **Status `open` ≠ onopgelost IoT-alarm** — Status hier is de _evenementenrecord_-status; het onderliggende alarm kan op het apparaat zijn verdwenen terwijl het evenement in het systeem nog openstaat
