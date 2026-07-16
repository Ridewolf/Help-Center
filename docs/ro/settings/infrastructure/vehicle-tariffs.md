# Vehicle Tariffs (Tarife vehicule)

Biblioteca de reguli de tarifare pentru flota ta Ridewolf. Un **Tariff** este un set de sine stătător de reguli monetare — preț de bază, taxă start cursă, tarif per distanță, tarif pauză, tarif rezervare plătită, plus trepte de discount și o plasă de siguranță auto-refund — pe care sistemul îl folosește pentru a calcula ce plătește un rider pentru o cursă.

Trăiește la `/settings/vehicle-tariffs`. Permisiune: **List Tariffs** (`v1w2x3`).

## Ce este un Tariff

Un Tariff **nu** e atașat direct unui vehicul — e atașat unui **Vehicle Model** în [Vehicle Settings](vehicle-settings.md). Lanțul:

```
Tariff  →  Vehicle Model  →  Vehicle  →  Ride
```

O singură înregistrare de tarif conține:

- **Identitate** — `Name`, `Description` (Markdown), `Status` (Active / Inactive / Archived), `Tags`
- **Unitate de tarifare** — `Type`: unul din `per-minute`, `per-hour`, `per-day`, `per-month`. Controlează granularitatea billing-ului (per-minute folosește matematică la nivel de secunde; per-day/per-month folosesc ceil-based billing — o unitate completă e taxată în avans)
- **Câmpuri de preț** (toate valorile monetare în valuta companiei):
  - **Base price** — costul unei unități (un minut, o zi etc.)
  - **Ride-start price** — taxă fixă de unlock, plătită o dată la startul cursei
  - **Distance price** — cost per km parcurs
  - **Pause price** — taxă per minut cât cursa e pe pauză
  - **Paid reservation price** — taxă per minut după ce fereastra gratuită de rezervare expiră
  - **Reservation time** — minute gratuite de rezervare înainte ca cea plătită să intre în vigoare
- **Discount tiers** — trei trepte opționale (First / Second / Third). Fiecare e _"după N unități, aplică X % discount"_, ca să facă cursele lungi progresiv mai ieftine
- **Auto-refund** — toggle + două praguri (`distance` în metri, `time` în secunde). Când activat, dacă rider-ul oprește cursa înainte de a atinge ambele praguri, backend-ul anulează și returnează — protejează rider-ii de a fi taxați la un unlock eșuat

## Unde se aplică Tariff

1. Operatorul creează / editează un **Tariff** aici
2. Operatorul leagă tariful de un **Vehicle Model** în [Vehicle Settings](vehicle-settings.md)
3. Vehiculele atribuite acelui model moștenesc tariful
4. Când un rider pornește o cursă, backend-ul face un **snapshot al tarifului** în înregistrarea cursei și folosește acel snapshot pentru toată matematica de billing

> **Snapshot e partea critică.** Editarea sau ștergerea tarifului mai târziu **nu** schimbă retroactiv cursele finalizate sau în desfășurare. Breakdown-ul pe care îl vezi în [Ride Detail](../../operations/trips/ride-detail.md) e calculat din valorile tarifului **așa cum erau la startul cursei** — așa păstrează Ridewolf billing-ul auditabil.

## Filtre

Bara de filtre deasupra tabelului:

| Filtru     | Tip    | Opțiuni                                                 |
| ---------- | ------ | ------------------------------------------------------- |
| **Search** | text   | Liber — caută în nume / descriere                       |
| **Status** | select | All statuses · Active · Inactive · Archived             |
| **Type**   | select | All types · Per minute · Per hour · Per day · Per month |

Filtrele sunt debounced și tabelul se reîncarcă de la pagina 1 la fiecare schimbare. URL-ul e sincronizat — lipește URL-ul ca să împărtășești același view.

## Coloane

| Coloană         | Sortabilă | Note                                                                                |
| --------------- | --------- | ----------------------------------------------------------------------------------- |
| **Name**        | da        | Eticheta tarifului                                                                  |
| **Description** | da        | Trunchiat; text complet la hover (Markdown randat în altă parte)                    |
| **Type**        | da        | Badge cu contur — `per-minute` / `per-hour` / `per-day` / `per-month`               |
| **Price**       | da        | Base price, formatat în valuta companiei, monospace                                 |
| **Tags**        | nu        | Până la 2 tag chip-uri + `+N` overflow. Click deschide quick-edit                   |
| **Status**      | da        | Badge colorat (Active verde / Inactive gri / Archived albastru). Click → quick-edit |
| **Created**     | da        | Data creării                                                                        |
| **Updated**     | da        | Data ultimei actualizări                                                            |

Sortarea e **client-side** — funcționează pe pagina curentă.

## Acțiuni din header

- **Auto-refresh** — reîmprospătează lista (click sau interval, vezi [Auto-refresh](../../features/ux/notifications.md))
- **Export** — deschide dialogul de export (pagina curentă · toate filtrate · pagini specifice). Output: un fișier `vehicle-tariffs-export.json`
- **+ Create** — deschide formularul de creare. Vizibil doar dacă ai sub-permisiunea **Create Tariff**

## Acțiuni pe rând

Meniul `⋯` per rând:

- **View details** — deschide `/settings/vehicle-tariffs/:id` (mereu disponibil)
- **Edit** — deschide `/settings/vehicle-tariffs/:id/edit` (necesită sub-permisiunea `edit`)
- **Delete** — deschide o confirmare cu hold de 3 secunde; la confirm tariful e șters (necesită sub-permisiunea `delete`)

> **Delete cu prudență.** Vehicle Models care pointează către tariful șters vor trebui reatribuite la alt tarif înainte ca noile curse să poată porni pe acele vehicule. Înregistrările de curse existente își păstrează snapshot-ul intact.

## Quick edit (Tags / Status)

Click direct pe chip-urile **Tags** sau badge-ul **Status** în orice rând → se deschide un dialog mic care îți permite să schimbi doar acele câmpuri fără să intri în formularul complet. Toast confirmă; tabelul se reîmprospătează.

## Formular Create / Edit

Atât `/settings/vehicle-tariffs/create` cât și `/settings/vehicle-tariffs/:id/edit` împart același layout: un card stânga cu inputurile, un sidebar **Field Guide** dreapta cu ajutor contextual și o **previzualizare live** a valorilor introduse (nume, type, preț de bază, start/distance, pauză, rezervare, tag-uri, trepte discount).

### Câmpuri obligatorii

| Câmp           | Obligatoriu | Validare                                   |
| -------------- | ----------- | ------------------------------------------ |
| **Name**       | da          | Non-vid                                    |
| **Type**       | da          | Una din cele 4 opțiuni                     |
| **Status**     | da          | Una din `active` / `inactive` / `archived` |
| **Base price** | da          | `>= 0`                                     |

Toate celelalte câmpuri monetare au default `0` și acceptă `0` (efectiv "feature dezactivat").

### Secțiuni

1. **Identity** — Name, Description (Markdown), Type, Status, Tags
2. **Pricing** — Base price, Ride-start price, Distance price, Pause price, Paid reservation price, Reservation time (minute)
3. **Auto-refund** — Toggle. Când activ, completează `Distance` (metri) și `Time` (secunde). Ambele praguri trebuie depășite înainte ca cursa să fie considerată pornită; altfel se anulează automat cu refund
4. **Discount tiers** — Trei trepte. Fiecare: `Discount %` (0-100) și `After units` (câte unități trebuie să treacă înainte ca discount-ul să se activeze). Lasă o treaptă pe zerouri ca să o sari

### Comportament la salvare

- **Create** → toast "created", redirect către pagina de detaliu
- **Edit** → toast "updated", redirect către pagina de detaliu
- **Modificările nesalvate** sunt urmărite prin snapshot-diff. Părăsirea paginii (cancel / back) deschide un confirm dacă ceva e modificat

> **Maparea status-ului pe backend.** Valoarea `archived` din formular se trimite către backend ca `deleted` — ăsta e numele intern. Operatorii văd `archived` peste tot în UI.

## Pagina de detaliu

`/settings/vehicle-tariffs/:id` arată un header cu eticheta tarifului, un badge de status, acțiunile **Edit** și **Delete**, trei card-uri overview (Status / Created / Updated), apoi un card **Details** cu:

- Câmpuri identitate (Name, Type, Status, Base price, date)
- **Description** randat din Markdown
- **Pricing** — vedere grilă a tuturor celor 5 tarife monetare (`TariffPriceGrid`)
- **Auto-refund** — badge enabled/disabled, plus cele două praguri dacă activ
- **Discount tiers** — breakdown vizual al celor trei trepte (`TariffDiscountTiers`)
- **Tags** — chip-uri rezolvate (doar dacă există)
- **System info** — ID complet, timestamps created/updated

## Cum conduce snapshot-ul Ride breakdown

Când deschizi un [Ride Detail](../../operations/trips/ride-detail.md), card-ul **Breakdown** se calculează din:

- `ride.tariff` — snapshot-ul încorporat în cursă la momentul start-ului
- Telemetria live a cursei (durată, distanță, timp pauză, timp rezervare)

Matematica pe care backend-ul o oglindește local:

- **Base** — `units × Base price`, unde `units` = secunde scurse (per-minute) sau zile/luni ceiled pentru tipurile ceil-based
- **Unlock fee** — `Ride-start price` plat, taxat o dată
- **Distance** — `km × Distance price`
- **Pause** — `minute pauză × Pause price`
- **Reservation** — primele `Reservation time` minute gratuite, apoi `minute plătite × Paid reservation price`
- **Discount tiers** aplicate peste odată ce pragurile sunt depășite

Dacă fixezi o greșeală în tarif azi, **cursele de ieri nu sunt afectate** — breakdown-urile lor încă arată numerele vechi pentru că snapshot-ul e sursa de adevăr.

## Workflows

- **Lansarea unei scheme noi de preț** — creează tariful (Status `Inactive`) → revizuiește cu finance → comută pe `Active` → leagă-l de Vehicle Model relevant în [Vehicle Settings](vehicle-settings.md)
- **Promo sezonier** — duplică un tarif existent (manual: creează nou + copiază câmpuri), schimbă `Base price`, dă-i un nume cu sufix de dată (ex. `Summer 2026 — Scooter`), leagă-l de model pe fereastra promo, schimbă înapoi după
- **Tuning auto-refund** — începe cu praguri conservatoare (distanță mică + timp scurt) ca unlock-urile eșuate să nu fie taxate, apoi relaxează dacă vezi refund-uri false-positive în [Rides](../../operations/trips/rides.md)
- **Retragerea unui tarif vechi** — setează Status pe `Archived` (trimis ca `deleted` la backend) odată ce nicio Vehicle Model nu îl referențiază. Cursele vechi își păstrează snapshot-urile — poți arhiva în siguranță
- **Redenumire pentru claritate** — Name e doar o etichetă. Redenumirile afectează snapshot-urile noi de la acel moment; cursele finalizate păstrează numele vechi în breakdown

## Tips

- **Snapshot, snapshot, snapshot** — când ai dubii despre prețul unei curse istorice, verifică `ride.tariff.*` pe [Ride Detail](../../operations/trips/ride-detail.md), nu tariful curent din această listă
- **Nu Delete — Archive** — tarifele Archived rămân în baza de date (sunt soft-deleted server-side) și sunt încă rezolvabile din snapshot-urile vechi. Hard `Delete` e ok doar pentru schițe nefolosite
- **Folosește previzualizarea live din Field Guide** — sidebar-ul drept arată totalurile calculate pe măsură ce scrii, e cea mai rapidă cale să faci sanity check unui tarif nou înainte de save
- **Type contează pentru matematică** — schimbarea de la `per-minute` la `per-hour` nu auto-scalează `Base price`; trebuie să recalculezi manual (1 minut @ €0.20 ≠ 1 oră @ €0.20)
- **Discount tiers sunt secvențiale** — `After` e măsurat în aceleași unități ca `Type`. O treaptă cu `After: 30, Discount: 10 %` pe un tarif `per-minute` înseamnă "din minutul 30 încolo, taxează 90 % din prețul de bază". Cele trei trepte se stivuiesc în ordine — câștigă cea mai mare aplicabilă
- **Etichetează-ți tarifele** — tag-urile trec mai departe către Vehicle Model și ajută la filtrare în această listă. Etichete comune: `Scooter`, `Bike`, `Promo`, `Legacy`
