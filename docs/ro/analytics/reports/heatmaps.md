# Analitică — Heatmaps

Pagina Heatmaps (`/analytics/heatmaps`) este un **vizualizator de densitate geografică**: alege o sursă de date, un interval și un mod de vizualizare — harta arată unde se concentrează activitatea în zona ta de operare.

Folosește pentru **descoperirea cererii** (unde vor riderii să înceapă? unde termină?) și **planificarea acoperirii** (unde caută riderii, dar nu avem vehicule?).

## Surse de date

Trei surse de semnal, una odată:

| Sursă           | Ce arată                                                                           |
| --------------- | ---------------------------------------------------------------------------------- |
| **Scans**       | Unde **riderii au deschis aplicația și au scanat după vehicule** — intenție cerere |
| **Ride starts** | Unde **cursele au început efectiv** — cerere convertită                            |
| **Ride ends**   | Unde **cursele s-au terminat** — locații naturale de drop-off                      |

Compară _Scans_ vs _Ride starts_ pentru a găsi **cerere neîmplinită**: locuri unde riderii au căutat dar nu au găsit un vehicul.

## Moduri de vizualizare

Patru moduri de a randa aceleași date:

| Mod          | Ce desenează                                                                               |
| ------------ | ------------------------------------------------------------------------------------------ |
| **Heatmap**  | Clasic heat-blur fluid — cel mai bun pentru a **vedea vârfurile** dintr-o privire          |
| **Hexagons** | Bin-uri hexagonale — cel mai bun pentru a **compara zone** cu geometrie consistentă        |
| **Clusters** | Cluster-uri de puncte care se extind la zoom — pentru **drill-down în puncte individuale** |
| **Grid**     | Grilă pătrată regulată — cel mai bun pentru a **alinia cu zonele de planificare**          |

Aceleași date pot spune povești diferite în moduri diferite — comută pe măsură ce investighezi.

## Scheme de culori

Un rând de swatch-uri mici îți permite să alegi schema de culori — util pentru operatori cu daltonism sau pentru potrivire cu paleta brand-ului. Numele schemei apare ca tooltip la hover.

## Slider points

Un slider în toolbar îți permite să controlezi câte puncte de date să eșantionezi (1k / 10k / 100k). Mai multe puncte = imagine de densitate mai precisă dar randare mai lentă. Începe cu puține, crește când ai îngustat zona / intervalul.

## Interval de date

O bară standard date-range sus. Cu cât intervalul e mai mare, cu atât imaginea e mai agregată; pentru "ce s-a întâmplat azi-dimineață" alege câteva ore.

## Harta

Harta umple pagina. Controale standard (pan, zoom, toggle layer). Overlay-ul heatmap stă peste baza hărții.

O **legendă** într-un colț explică scala de culori a modului activ — de la densitate scăzută la mare.

## Fluxuri tipice

- **Găsește cererea neîmplinită** — Source = Scans, Mode = Heatmap → identifică o zonă fierbinte → comută Source la Ride starts → dacă aceeași zonă e rece = cerere neîmplinită → consideră rebalansare sau extinderea în acea zonă
- **Planifică o zonă nouă** — Source = Ride ends, Mode = Hexagons → caută concentrări naturale de drop-off în afara zonelor curente → propune operațiunilor
- **Drill într-un hot spot** — Mode = Clusters → zoom în zona fierbinte → puncte individuale arată lat/long exact; verifică cu [Vehicle Search](vehicles.md) pentru detalii la nivel de cursă
- **Compară ferestre de timp** — încarcă Scans dimineața → screenshot → comută la Scans seara → compară screenshot-urile side by side (dashboard-ul nu face încă dual-period; necesită export manual)
- **Audit acoperire** — Source = Scans pentru ultima săptămână → caută hot spots departe de orice zonă → consideră re-desenarea limitelor zonelor

## Sfaturi

- **Scans ≠ rides** — multe scan-uri nu se convertesc (riderul nu vede vehicul, vede preț, abandonează). Decalajul dintre Scans și Ride starts este semnalul tău cel mai actionabil
- **Modul Heatmap ascunde scala** — culorile sunt relative în harta vizibilă; zoom-ul schimbă imaginea. Hexagons este mai onest la niveluri fixe de zoom
- **Începe cu puține puncte, termină cu multe** — explorezi cu 1k puncte e rapid; ridică la 100k doar când știi ce cauți
- **Modul Grid pentru planificare** — dacă zonele sunt aproximativ dreptunghiulare, Grid se aliniază cu ele; altfel preferă Hexagons
- **Daltonism?** — încearcă schemele alternative; datele subiacente sunt aceleași
- **Harta nu se reîmprospătează automat la schimbarea datei** — în funcție de configurație poate trebui să re-apeși _Apply_ / _Refresh_
- **Legenda contează** — ce arată "roșu și dramatic" poate fi un număr absolut mic; uită-te mereu la legendă înainte de a interpreta
