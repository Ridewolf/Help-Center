# Instrumentele de back-office din Service App

Pe lângă ecranele de teren, Service App poartă un set de instrumente de back-office: redarea traseului (route playback), analitică și cele trei cozi de suport. Acest articol acoperă ce face fiecare în aplicație și unde diferă de aceeași funcționalitate din dashboard-ul operatorului.

**Totul de aici, cu excepția Replay Player, este disponibil doar pentru owneri** și pur și simplu lipsește din [drawer-ul de navigare](../basics/overview.md#drawer-ul-de-navigare) pentru ceilalți operatori — nu există niciun element estompat de atins.

## Replay Player

**Replay Player** (`/replay-player`) reconstituie unde a mers un vehicul într-o zi.

1. **Alege un vehicul.** Până la 500 de vehicule sunt preîncărcate, sortate alfabetic. Filtrează lista tastând o parte dintr-o etichetă sau IMEI.
2. **Alege o zi** din calendar. Datele viitoare nu pot fi selectate.
3. Aplicația încarcă coordonatele acelui vehicul pentru întreaga zi locală. O zi fără date arată "No data for this day".

### Harta

- Zonele sunt desenate dedesubt
- Întregul traseu apare ca o linie subțire, estompată, colorată după viteză
- Partea deja redată apare ca o urmă groasă
- Un triunghi verde rotativ marchează vehiculul
- Markere verzi și roșii marchează începutul și sfârșitul zilei

O **chase camera** este activă implicit: urmărește vehiculul și își ajustează lin zoom-ul in și out pe măsură ce viteza se schimbă. Panoramarea, zoom-ul sau rotirea hărții manual o dezactivează — reîncarcă ziua dacă vrei să o recapeți.

### Controale

| Control            | Detalii                                                                                |
| ------------------- | -------------------------------------------------------------------------------------- |
| **Scrubber**        | Colorat după viteză, cu badge-uri de eveniment pentru parked, started, speed warning și speed alert |
| **Timeline zoom**   | 1x până la 32x, pentru a alege un moment precis dintr-o zi încărcată                    |
| **Playback speed**  | 1, 2, 4, 8, 16, 32, 64, 128x                                                            |

Scurtături de tastatură (utile în versiunea web):

- **Space** sau **K** — play / pause
- **Săgeți stânga / dreapta** — derulează 10 secunde; ține **Shift** pentru un minut, **Alt** pentru o oră, **Ctrl** sau **Cmd** pentru o zi
- **Home / End** — sari la începutul sau sfârșitul zilei
- **Săgeți sus / jos** — parcurge presetările de viteză de redare

Bannerul de date live arată **Speed** și **Distance**. Citirile de ignition, battery, connection și GPS nu sunt disponibile momentan în aplicație — câmpurile sunt afișate, dar nu conțin nicio citire, deci un gol acolo nu este o pană de date.

Pentru instrumentul de redare mai complet — mai multe vehicule deodată, replay per cursă, filtrare pe etichete — folosește [Replay Player](../../apps/tools/replay-player.md) din dashboard.

## Analytics

**Analytics** (`/analytics`, doar owneri) este un dashboard zilnic de KPI-uri: revenue, curse, distanță, durată, top-ups și preț mediu per cursă, per kilometru și per minut, fiecare cu un sparkline de tendință pe 30 de zile, plus un grafic bar orar cu un selector de metrică.

Două drill-down-uri, ambele cu presetări de 7, 30 și 90 de zile:

| Drill-down                | Ce arată                                                                |
| -------------------------- | ------------------------------------------------------------------------- |
| **`/analytics/payments`**  | Flux de plăți, calitate, sold, metode de plată și top plătitori          |
| **`/analytics/heatmaps`**  | Densitatea scanărilor QR, a începuturilor sau sfârșiturilor de curse (până la 5.000 de puncte) |

Dashboard-ul are versiunile complete ale acestor rapoarte — vezi [Raportul de plăți](../../analytics/reports/payments.md) și [Heatmaps](../../analytics/reports/heatmaps.md).

## Suport — Tickete

**Support** (`/support/tickets`, doar owneri) este coada de plângeri despre vehicule.

- **Statusuri**: new, triage, in-work, waiting-info, resolved, dismissed, duplicate
- **Prioritate**: de la low la critical
- **Badge de numărătoare inversă SLA**: devine portocaliu sub două ore și roșu odată depășit termenul

Butonul **vehicle** al unui ticket deschide pagina acelui vehicul, ca să poți acționa imediat asupra plângerii. Butonul lui **maintenance task** deschide ecranul Maintenance al aplicației, care este aici un ecran "Coming Soon" (vezi mai jos).

Tichetele pentru un singur vehicul sunt listate și pe [tab-ul Tickets al paginii vehiculului](../fleet/vehicle-controls.md#tab-ul-tickets), unde **Resolve All** le închide pe toate deodată. Pentru coada completă, cu filtre, atribuire și istoric, folosește [Tickets](../../support/tickets-proofs-chat/tickets.md) din dashboard.

## Conversations

**Conversations** (`/support/dialogs`, doar owneri) este un messenger live cu riderii: **Take** și **Take Over** pentru a prelua un chat, un compozitor de mesaje, un indicator de scriere și până la 5 atașamente foto per mesaj. Dacă conexiunea live cade, aplicația cade înapoi (fallback) pe reîmprospătare la fiecare 15 secunde.

**Trimiterea unui răspuns din acest ecran nu este disponibilă momentan în aplicație.** Citește conversațiile aici dacă te ajută pe teren, dar răspunde riderilor din pagina [Conversations](../../support/tickets-proofs-chat/conversations.md) din dashboard.

## Parking proofs

**Parking proofs** (`/support/park-proofs`, doar owneri) este o galerie de review pentru fotografiile pe care le fac riderii: pozele de start, park, end și selfie. Fiecare fotografie poartă un chip automat de predicție — **parking**, **no parking**, **no ride** sau **unclear** — cu o valoare de încredere. Pinch pentru a comuta între layout-uri de 1, 2 sau 3 coloane.

Acțiuni de review:

| Acțiune                   | Ce face                                              |
| -------------------------- | ------------------------------------------------------ |
| **Approve**               | Marchează fotografia ca bună                          |
| **Warn**                  | Avertizează riderul; necesită un comentariu            |
| **Reject** / **Fine**     | Necesită un comentariu și o sumă                       |
| **Block**                 | Blochează riderul; necesită un comentariu              |
| **Approve with Comment**  | Aprobă și poate atașa opțional un cod promo            |

Aprobarea cu bonus nu este disponibilă momentan în aplicație.

Coada [Park Proofs](../../support/tickets-proofs-chat/park-proofs.md) din dashboard are fluxul complet de moderare, filtre și reguli de review automat.

## Maintenance și Rebalancing

`/maintenance` și `/rebalancing` din Service App sunt ecrane "Coming Soon": fără date, nimic de configurat. **Rebalancing** apare și în drawer-ul de navigare, cu un badge **Soon**.

Asta contează când răspunzi unui operator de teren: dashboard-ul are propriile funcționalități reale de maintenance și rebalancing, și acestea sunt cu totul altceva decât aceste ecrane. Nu descrie niciodată funcționalitatea de maintenance din dashboard ca și cum un tehnician ar putea-o folosi în Service App.

## Probleme comune

| Simptom                                                          | Ce înseamnă                                                          |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Bannerul Replay arată goluri pentru ignition sau battery            | Acele citiri nu sunt disponibile momentan în aplicație — nu este o pană |
| Replay nu găsește date pentru o zi                                  | Vehiculul poate să nu se fi mișcat sau să nu fi raportat în acea zi — încearcă altă dată |
| Analytics, Support, Conversations sau Parking proofs lipsesc        | Sunt disponibile doar pentru owneri                                   |
| Butonul maintenance al unui ticket ajunge pe "Coming Soon"          | Așteptat în această aplicație — folosește dashboard-ul pentru lucrul de maintenance |
| Un răspuns de chat pare să se trimită, dar nu se întâmplă nimic     | Răspunsul din aplicație nu este disponibil momentan — răspunde din dashboard |
| Approve-with-bonus nu este disponibil în Parking proofs             | Acea acțiune nu este disponibilă momentan                             |

## Sfaturi

- **Chase camera este cel mai rapid mod de a revizui o zi** — pornește redarea la 8x și încetinește doar în jurul badge-urilor de eveniment de pe scrubber.
- **Folosește coada de tickete a aplicației pentru a-ți planifica o rută**, apoi acționează din pagina fiecărui vehicul; punctul forte al aplicației este proximitatea, nu hârtiile.
- **Fă munca de moderare și mesagerie din dashboard.** Copiile aplicației ale acestor cozi sunt pentru a verifica lucruri cât timp ești pe stradă.
