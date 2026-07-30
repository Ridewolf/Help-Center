# Aplicația pentru rideri — Setări

Ecranul **Setări** (Settings) (`/settings`) conține fiecare preferință a aplicației vizibilă pentru rider: notificări, ce desenează harta, comutatoare de confidențialitate, limbă, temă și performanță.

**Nu există niciun buton Save.** Ecranul arată instant setările din cache, le reîmprospătează în fundal și trimite fiecare schimbare automat, la scurt timp după ce a fost făcută. Un rider care a schimbat ceva și a închis imediat ecranul aproape sigur a salvat-o — acesta este răspunsul la „schimbarea mea s-a aplicat?”.

Mai multe dintre aceste comutatoare schimbă ce randează [Harta](../riding/map.md), deci acesta este primul ecran de vizitat pentru „harta e lentă” și „nu văd nivelurile de baterie”.

## Notificări

Cinci comutatoare independente:

- **Ride Notifications**
- **Promotion Notifications**
- **App Updates**
- **Push Notifications**
- **Email Notifications** — un singur comutator; nu există sub-opțiuni pe tip sub el

În aceeași zonă:

| Comandă             | Note                                                                          |
| ---------------------| ---------------------------------------------------------------------------- |
| **Sound**            | Comutator                                                                    |
| **Sound Volume**     | Slider — apare doar cât timp **Sound** este activ                            |
| **Vibration**        | Comutator                                                                    |
| **Radar Settings**   | Un card care apare doar în build-urile de aplicație unde setările radar sunt activate |

## Harta și afișarea

Comutatoare:

- **Show Battery Level**
- **Show Promotional Vehicles**
- **Show Pricing**
- **Auto Zoom**
- **Map 3D** — se aplică imediat pe hartă
- **Reduced Animations**

Plus **Data Mode**, un select cu **balanced**, **low** și **high**. Guvernează calitatea tile-urilor hărții și cât de multe detalii randează harta, și este **primul lucru de încercat când un rider raportează o hartă lentă sau grea** — coboară-l la _low_ și activează și **Reduced Animations**.

**Offline Maps** nu este disponibil momentan în aplicație.

## Comenzi de confidențialitate

- Comutatorul **Geolocation Sharing**
- Comutatorul **Data Sharing**
- **Privacy Policy** — deschide URL-ul extern pe care l-ai configurat în [Compania mea](../../settings/administration/my-company.md); linkul apare doar când este setat un URL
- **Manage Sessions** — deschide ecranul dispozitivelor autentificate (`/settings/sessions`), același accesibil din Profile

Ecranul complet de confidențialitate și ghid de siguranță este propria lui rută (`/privacy`). **Ștergerea contului nu se află aici** — fluxul funcțional de ștergere este pe ecranul Profile.

## Regiune și aspect

| Comandă        | Opțiuni                            | Note                                                                                                        |
| ----------------| ------------------------------------| ----------------------------------------------------------------------------------------------------------------|
| **Language**    | **en**, **ru**, **ro**             | Se aplică imediat, fără reîncărcare. Doar aceste trei sunt oferite pe acest ecran                                |
| **Units**       | —                                  | Un selector de unități nu este disponibil momentan în aplicație                                                  |
| **Theme**       | Light, Dark, System               | Se aplică imediat                                                                                                |
| **Map Style**   | Auto, Light, Dark                 | **Dezactivat și forțat pe Auto ori de câte ori Theme este setat pe System.** Schimbă Theme pe Light sau Dark ca să-l deblochezi |

Doar cele trei limbi de aplicație de mai sus apar aici, chiar dacă alte localizări există în altă parte în produs — vezi [Localizare](../../settings/administration/localization.md) pentru partea de dashboard.

## Riding Mode

**Riding Mode nu este disponibil momentan în aplicație.** Un rider care întreabă unde este comanda de riding mode nu a pierdut o permisiune — secțiunea nu se află în aplicație, și nu există nicio setare în dashboard care s-o adauge.

## Întrebări frecvente

| Riderul întreabă…                    | Răspuns                                                                                       |
| ---------------------------------------| ------------------------------------------------------------------------------------------------|
| „Unde este butonul Save?”             | Nu există unul — schimbările se salvează automat                                                 |
| „Unde este Riding Mode?”              | Nu este disponibil momentan în aplicație                                                         |
| „De ce Map Style este gri?”           | **Theme** este setat pe **System**. Schimbă-l mai întâi pe Light sau Dark                        |
| „De ce nu apare limba mea?”           | Acest ecran oferă doar **en**, **ru** și **ro**                                                  |
| „Unde este setarea Units?”            | Nu este disponibilă momentan în aplicație                                                        |
| „Unde este comutatorul Offline Maps?” | Nu este disponibil momentan în aplicație                                                         |
| „Cum îmi șterg contul?”               | De pe ecranul Profile, nu din Settings                                                           |
| „Cum îmi văd dispozitivele autentificate?” | **Manage Sessions** — aici, sau același buton din Profile                                    |
| „Harta este lentă”                    | **Data Mode → low**, apoi **Reduced Animations** activat. Vezi [Hartă](../riding/map.md#depanare) |

## Sfaturi

- **Data Mode este cadranul tău de performanță.** Înainte să dai vina pe telefonul riderului sau pe tile-urile tale, pune-l să încerce _low_.
- **„Nu s-a salvat” aproape niciodată nu e adevărat.** Cere-i să redeschidă ecranul — valoarea va fi acolo.
- **Plângerile despre hartă locuiesc adesea aici, nu pe hartă.** Procentele de baterie lipsă, prețurile lipsă și vehiculele promoționale lipsă sunt toate comutatoare pe acest ecran.
- **Theme blochează Map Style.** Memorează această pereche; altfel este un tichet săptămânal.
