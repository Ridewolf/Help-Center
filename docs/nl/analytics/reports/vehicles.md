# Analyse — Voertuigen

De pagina Voertuigen-analyse (`/analytics/vehicles`) is het **dashboard voor vlootgezondheid**: hoeveel voertuigen je hebt, hoe ze presteren, batterijstatus, problemen en storingen per type en zone.

Anders dan de [Voertuigenlijst](../../operations/fleet/vehicles.md) — dat is de operationele weergave per eenheid; dit zijn **geaggregeerde vlootstatistieken** over een gekozen periode.

## Tijdspanne

Bovenaan staat een **datumbereikbalk**. Trendgrafieken gebruiken het volledige bereik; overzichts- en statusaantallen weerspiegelen de **huidige staat** (einde van het bereik).

## Secties

Zeven secties, van boven naar beneden:

### 1. Overzicht

Topniveau samenstelling van de vloot.

| KPI               | Wat het toont                                                      |
| ----------------- | ------------------------------------------------------------------ |
| **Totaal**        | Alle geregistreerde voertuigen                                     |
| **Actief**        | Beschikbaar voor rijders om nu te huren                           |
| **Inactief**      | Staat stil, niet in gebruik (kan Beschikbaar of laaggebruik zijn) |
| **Buiten dienst** | In Onderhoud / Opslag / Niet klaar — verdient geen inkomsten       |
| **Verloren / Gestolen** | Status = Gestolen, of langer dan drempel offline               |

Gebruik deze sectie als je belangrijkste vlootoverzicht.

### 2. Prestaties

Hoe goed je vloot voor je **verdient**.

| KPI                   | Wat het toont                                              |
| --------------------- | ---------------------------------------------------------- |
| **Verdienende voertuigen** | Voertuigen die minstens één rit in de periode hebben voltooid |
| **Inactieve voertuigen**   | Actieve voertuigen zonder ritten (verspilling)            |
| **Ritten per voertuig**    | Gemiddeld aantal ritten per voertuig in het bereik        |
| **Gebruik**               | Uren verhuurd / beschikbare uren (branchebenchmark: 5-15%) |

Inactief binnen Actief is het ergste — het kost operationele overhead zonder opbrengst.

### 3. Batterij

Batterijgezondheid over de vloot.

| KPI / Grafiek    | Wat het toont                                                                   |
| ---------------- | ------------------------------------------------------------------------------- |
| **Gem. niveau**  | Gemiddeld batterijpercentage over alle voertuigen op dit moment                  |
| **Kritiek**      | Aantal onder de kritieke drempel (10-20%)                                       |
| **Gem. trend**   | Gemiddelde batterij over het bereik — dalend = wissels houden het niet bij      |
| **Verdeling**    | Histogram van voertuigen per batterijcategorie (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Wissels**      | Aantal batterijwisseloperaties in het bereik                                   |

Als Gem. daalt terwijl Kritiek stijgt, loopt het veldteam achter — plan meer wissels in.

### 4. Problemen

Meldingen en operationele problemen gemeld voor de vloot.

| KPI             | Wat het toont                                                  |
| --------------- | -------------------------------------------------------------- |
| **Meldingen**   | Totaal aantal meldingen in het bereik                          |
| **Type meldingen** | Verdeling per type (batterij / connectiviteit / mechanisch / etc.) |
| **Kritiek**     | Meldingen met kritieke ernst                                   |
| **Onderhoud**   | Voertuigen die momenteel in Onderhoud-status zijn              |
| **Offline**     | Voertuigen waarvan de IoT langer dan drempel niet heeft gerapporteerd |

Combineer deze sectie met de [Recente Evenementen-analyse](events.md) voor de per-evenementweergave.

### 5. Trends

Tijdreeksdiagram(men) die tonen hoe het aantal **Actieve** voertuigen over het bereik is veranderd. Een daling betekent meestal een massale statuswijziging (naar onderhoud, weer, terugroepactie).

### 6. Per Type

Een uitsplitsing per **voertuigtype** (scooter / fiets / e-bike / etc.). Voor elk: aantal, verdienratio, gebruik, meldingspercentage.

Als één type het meldingspercentage domineert, heeft het **model** een probleem — niet het operationele team.

### 7. Per Zone

Een uitsplitsing per **zone**. Voor elk: aantal voertuigen, gebruik, probleempercentage.

Zones met laag gebruik en hoge voorraad = **herverdelingskans** (zie ook [Herverdelingsanalyse](../../operations/rebalance/runs.md)).

## Typische workflows

- **Wekelijkse vlootreview** — Overzichtssnapshot → Prestaties (gebruikstrend) → Batterij (stijgend aantal kritieke meldingen?) → Problemen (piekmeldingen) → Trends (onverklaarde daling Actief?)
- **Opruimen inactieven** — Prestaties → Aantal inactieven → als dit groeit, vind de betreffende voertuigen via de [Voertuigenlijst](../../operations/fleet/vehicles.md) en controleer status / locatie
- **Batterijnoodgeval** — Batterijsectie → Kritiek stijgt + Gem. daalt → zet het veldteam aan
- **Detectie slecht model** — Per Type sectie → welk type heeft het hoogste meldingspercentage → overweeg uitfasering / onderhandeling met fabrikant
- **Herverdeling** — Per Zone sectie → zones met laag gebruik + hoge voorraad → plan een herverdeling
- **Voorafgaande dienstplanning** — Trends + Patronen uit [Evenementen](events.md) → welke dagen / uren hebben meer veldpersoneel nodig?

## Tips

- **Actief + Inactief + Buiten dienst + Verloren/Gestolen = Totaal** — als de som niet klopt, zijn statussen in overgang; vernieuw of kies een stabiele datum
- **Actief ≠ verdienen** — een voertuig is "Actief" als het verhuurd kan worden; "Verdienen" betekent dat het daadwerkelijk verhuurd is. Vergelijk deze twee
- **Benutting boven 25% is ongezond** — gebruikers kunnen geen voertuigen vinden wanneer ze die willen; overweeg om de inventaris in die zone te vergroten
- **Benutting onder 5% is ballast** — de kosten om dat voertuig in dienst te houden zijn hoger dan de opbrengsten; herbalanceer of haal het weg
- **Kritieke batterij + Gemiddelde trend** — samen vormen ze je vroegtijdige waarschuwingssysteem; één alleen is ruis
- **Verloren / Gestolen is hardnekkig** — het vereist een handmatige statuswijziging om het op te lossen; herstel een "Gestolen" voordat je het viert
- **Per Type en Per Zone samen** — soms faalt een type alleen in één zone (terrein mismatch); de kruisanalyse onthult dit
