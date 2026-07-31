# Analyse — Warmtekaarten

De pagina Warmtekaarten (`/analytics/heatmaps`) is een **geografische dichtheidsvisualisatie**: kies een gegevensbron, een datumbereik en een visualisatiemodus — de kaart toont waar activiteit zich concentreert in uw werkgebied.

Gebruik het voor **vraagontdekking** (waar willen rijders starten? waar eindigen ze?) en **dekkingsplanning** (waar zoeken rijders, maar hebben we geen voertuigen?).

## Gegevensbronnen

Drie signaalbronnen, één tegelijk:

| Bron            | Wat het toont                                                            |
| --------------- | ------------------------------------------------------------------------ |
| **Scans**       | Waar rijders de app **openden en naar voertuigen zochten** — vraagintentie |
| **Ritstarts**   | Waar ritten **daadwerkelijk begonnen** — geconverteerde vraag             |
| **Riteinden**   | Waar ritten **eindigden** — natuurlijke uitstapplekken                    |

Vergelijk _Scans_ met _Ritstarts_ om **onvervulde vraag** te vinden: plekken waar rijders zochten maar geen voertuig konden vinden.

## Visualisatiemodi

Vier manieren om dezelfde gegevens weer te geven:

| Modus         | Wat het tekent                                                                    |
| ------------ | --------------------------------------------------------------------------------- |
| **Warmtekaart**  | Klassieke vloeiende warmtevervaging — het beste om **pieken in één oogopslag te zien**  |
| **Hexagonen** | Hexagonale vakken — het beste om **zones met consistente geometrie te vergelijken** |
| **Clusters** | Puntenclusters die uitvouwen bij inzoomen — het beste om **in individuele punten te duiken** |
| **Raster**   | Regelmatig vierkant raster — het beste om **uitlijning met planningszones** te maken |

Dezelfde brondata kan verschillende verhalen vertellen in verschillende modi — wissel terwijl u onderzoekt.

## Kleurenschema's

Een rij kleine kleurstalen laat u het kleurenschema kiezen — handig voor kleurenblinde operators of om aan te sluiten bij een merkpalet. De naam van het schema verschijnt als tooltip bij hover.

## Punten-slider

Een schuifregelaar in de werkbalk laat u bepalen hoeveel datapunten worden bemonsterd (bijv. 1k / 10k / 100k). Meer punten = nauwkeuriger dichtheidsbeeld maar tragere weergave. Begin laag tijdens verkenning, verhoog als u het gebied / bereik hebt beperkt.

## Datumbereik

Een standaard datumbereikbalk bovenaan. Hoe breder het bereik, hoe meer geaggregeerd het beeld; voor "wat gebeurde vanochtend" kiest u een paar uur.

## Kaart

De kaart vult de pagina. Standaard kaartbediening (pan, zoom, laagwisselaar). De warmtekaart-overlay ligt bovenop de kaartbasis.

Een **legenda** in een hoek verklaart de kleurenschaal van de actieve modus — van lage tot hoge dichtheid.

## Typische workflows

- **Onvervulde vraag vinden** — Bron = Scans, Modus = Warmtekaart → spot een heet gebied → wissel Bron naar Ritstarts → als hetzelfde gebied koud is = onvervulde vraag → overweeg herbalancering of uitbreiding naar dat gebied
- **Een nieuwe zone plannen** — Bron = Riteinden, Modus = Hexagonen → zoek natuurlijke uitstapplekken buiten uw huidige zones → voorstel aan operaties
- **Inzoomen op een hotspot** — Modus = Clusters → zoom in op het hete gebied → individuele punten tonen exacte lat/long; kruisverwijzing met [Voertuig zoeken](vehicles.md) voor ritdetails
- **Tijdvensters vergelijken** — laad ochtend Scans → screenshot → wissel naar avond Scans → vergelijk de screenshots naast elkaar (het dashboard ondersteunt nog geen dubbele periodeweergave; handmatige export nodig)
- **Dekkingsaudit** — Bron = Scans van de afgelopen week → zoek hotspots ver van geplande zones → overweeg het hertekenen van zonegrenzen

## Tips

- **Scans ≠ ritten** — veel scans converteren nooit (rijder ziet geen voertuig, ziet prijs, stopt). Het verschil tussen Scans en Ritstarts is uw meest bruikbare signaal
- **Warmtekaartmodus verbergt schaal** — de kleuren zijn relatief binnen de zichtbare kaart; inzoomen verandert het beeld. Hexagonenmodus is eerlijker bij vaste zoomniveaus
- **Begin met weinig punten, eindig met veel** — verkennen met 1k punten is snel; verhoog pas naar 100k als u weet wat u bekijkt
- **Rastermodus voor planning** — als uw zones min of meer rechthoekig zijn, sluit Raster daarop aan en maakt het rekenen makkelijker; anders heeft Hexagonen de voorkeur
- **Kleurenblind?** — probeer de alternatieve schema's; de onderliggende data is hetzelfde
- **De kaart vernieuwt niet automatisch bij datumwijziging** — afhankelijk van de configuratie moet u mogelijk opnieuw op _Toepassen_ / _Vernieuwen_ klikken na het wijzigen van het datumbereik
- **Legenda is belangrijk** — wat er "rood en dramatisch" uitziet kan een kleine absolute telling zijn; kijk altijd eerst naar de legenda voordat u interpreteert
