# Acasă (Dashboard)

Pagina principală (`/dashboard`) este prezentarea ta zilnică. Afișează metricile cheie ale flotei pentru o zi aleasă, cum se compară cu media mobilă de 30 de zile și distribuția pe ore a activității. Deschide-o pentru a vedea pulsul operațiunilor într-un singur ecran.

## Header

Sus:

- **Salut** — "Salut, _{numele tău}_! Bun venit în dashboard-ul _{compania ta}_!"
- **Subtitlu** — "Prezentare a performanței companiei"
- **Selector de dată** — arată cărei zile îi aparțin metricile

## Selector de dată

Implicit, pagina încarcă datele de **azi**. Selectorul de dată îți permite să mergi înapoi prin istoric.

- **Today** — buton care resetează înapoi la azi
- **Previous day** (‹) / **Next day** (›) — pași de o zi
- **Iconiță calendar** — deschide un popover de calendar pentru a sări la o zi anume

Data selectată este memorată pentru sesiunea curentă — schimbarea paginii și revenirea păstrează selecția.

## Stat-card-uri (KPI)

Opt card-uri de metrici se aranjează pe două rânduri. Fiecare card afișează:

- **Titlu** — ce se măsoară (ex. _Curse_)
- **Valoare** — cifra pentru ziua selectată
- **Descriere** — o clarificare scurtă ("Curse complete", "Distanță totală" etc.)
- **Comparație** — schimbarea vs. media mobilă pe 30 de zile, cu o săgeată sus/jos
- **Tooltip** — pune mouse-ul pe titlu pentru definiția completă

### Cele opt card-uri

| Card                 | Ce afișează                                                   |
| -------------------- | ------------------------------------------------------------- |
| **Rides**            | Numărul curselor finalizate în ziua selectată                 |
| **Distance**         | Kilometri totali parcurși de toate cursele                    |
| **Duration**         | Timpul total al curselor pe toată flota                       |
| **Revenue**          | Venitul total din curse în ziua selectată                     |
| **Top-ups**          | Suma reîncărcărilor de portofel făcute de clienți în ziua aia |
| **Avg. price**       | Preț mediu per cursă                                          |
| **Avg. price / km**  | Preț mediu per kilometru                                      |
| **Avg. price / min** | Preț mediu per minut                                          |

Comparația se citește ca "**vs 30-day average**":

- ↑ Verde — peste media ultimelor 30 de zile
- ↓ Roșu — sub medie
- (fără săgeată) — prea aproape de medie pentru a marca

## Card-ul Weather

Un widget de vreme stă în grila stat-card-urilor afișând condițiile din zona ta de operare:

- **Temperatura curentă** și starea (Senin, Înnorat, Ploaie etc.)
- **Vânt** și **precipitații**
- **Prognoză 3 zile** — următoarele două zile plus mâine
- Sursă locație — _de la GPS_ sau _după IP_ (oricare e disponibilă)

Util pentru prezicerea cererii: ploaia și vântul corelează adesea cu volumul de curse.

## Grafice pe ore

Sub stat-card-uri, patru grafice de tip area afișează cum s-a distribuit activitatea pe cele 24 de ore ale zilei selectate, grupate în două secțiuni:

### Activitate

- **Rides per hour** — numărul curselor care încep în fiecare oră
- **Distance per hour** — kilometri totali per oră
- **Duration per hour** — minute totale de curse per oră

### Venit

- **Revenue per hour** — valuta câștigată per oră

Fiecare grafic afișează curba zilei; pune mouse-ul pe un punct pentru a vedea valoarea exactă pentru acea oră.

## Încărcare și erori

- **Încărcare** — stat-card-urile afișează o stare skeleton cât timp endpoint-ul de analitică se rezolvă
- **Eroare** — un banner mic apare sus cu mesajul "Failed to load analytics"; restul paginii rămâne utilizabil

## Permisiuni

Pagina Acasă este protejată de **View Dashboard Analytics** (`q4r5t6`). Fără ea, vei fi redirecționat către o altă pagină de aterizare la autentificare.

Dacă ai acces dar pagina e goală:

- Verifică data selectată — zilele goale sunt valide (fără curse)
- Verifică rețeaua — uită-te la banner-ul "Failed to load analytics"
- Altfel contactează un administrator

## Sfaturi

- **Compară zilele rapid** — folosește `‹` și `›` pentru a parcurge zilele recente și vezi cum se schimbă KPI-urile
- **Tooltips pe titlurile card-urilor** — fiecare card are o definiție precisă; bazează-te pe ele în loc să ghicești ce exclude "Avg. price / km"
- **Folosește badge-ul de comparație întâi** — săgeata colorată îți spune dintr-o privire dacă ziua a fost peste sau sub normal, înainte să citești numărul absolut
- **Graficele pe ore dezvăluie pattern-uri** — vârfuri dimineața vs seara, curbe de weekend, efecte de vreme; spun mai mult decât totalurile
