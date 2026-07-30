# Aplicația pentru rideri — Hartă, rezervări și scanare

Ecranul **Hartă** (Map) (`/map`) este ecranul principal al aplicației pentru rideri și ultimul pas din onboarding. Arată trei lucruri: poziția proprie a riderului, vehiculele disponibile în jurul lui și zonele pe care le-ai desenat pentru aria ta de operare.

Echipa de suport petrece mai mult timp pe acest ecran decât pe oricare altul, pentru că cea mai frecventă plângere a riderilor — _"nu există nicio modalitate de a porni o cursă"_ — își găsește aproape întotdeauna răspunsul aici, în [Bara de jos este condiționată](#bara-de-jos-este-condiționată).

Pentru cursa în sine (condițiile de pornire, pauza, încheierea, dovezile foto) vezi [Curse](rides.md). Pentru partea de operator a zonelor vezi [Zone](../../settings/infrastructure/zones.md).

## Meniul de navigare

Butonul **Menu** deschide **meniul lateral** (side menu) — singura navigare din aplicație. Nu există nicio bară de tab-uri jos. Meniul conține:

| Element din meniu   | Deschide                                       |
| -------------------- | ----------------------------------------------- |
| Rândul cu soldul din portofel | [Portofel](../money/wallet.md)         |
| **History**          | [Istoric](../money/history.md)                  |
| **Support**          | [Suport](../help/support.md)                    |
| **Privacy**          | Ecranul de confidențialitate și ghidul de siguranță |
| **Settings**         | [Setări](../help/settings.md)                   |
| **Profile**          | Ecranul de profil al riderului                  |

Abonamentele și codurile promoționale nu sunt disponibile momentan în aplicație, iar meniul nu are intrări pentru ele — vezi [Abonamente și coduri promoționale](../money/subscriptions.md).

## Comenzile de pe ecran

**Comenzi sus**

- **Menu** — deschide meniul lateral descris mai sus
- **How to ride** — deschide fișa de ajutor pentru mersul cu vehiculul (conținutul de îndrumare din aplicație este gestionat prin [Ghidurile rapide](../../settings/content/quick-guides.md))
- **My location** — recentrează harta pe rider

**Bara de jos**

| Buton          | Când apare                                                                                          | Ce face                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------| ---------------------------------------------------------------------------------|
| **Group ride** | Odată cu bara de jos                                                                                 | Deschide fluxul de cursă în grup                                                  |
| **Scan**       | Odată cu bara de jos                                                                                 | Deschide scanerul QR (`/ride/start`), cu o fișă de introducere manuală a codului vehiculului, ca rezervă |
| **Filters**    | Doar când riderul are etichete private de vehicul după care poate filtra și nu este deja într-o cursă sau o rezervare | Filtrează markerele după acele etichete |

### Bara de jos este condiționată

Bara de jos se afișează **doar când riderul are acces la plata cursei** — adică fie un card legat, fie un furnizor de plăți care nu suportă deloc carduri salvate.

Un rider **fără niciun card legat, pe un furnizor care suportă carduri salvate, nu vede bara de jos** și, prin urmare, nici butonul **Scan**, nici butonul **Group ride**. Așa e proiectat, iar aceasta este cea mai frecventă cauză a plângerii „aplicația nu mă lasă să pornesc o cursă”.

Soluția: trimite riderul la **Wallet → Manage Payment Methods → Add Card**. Vezi [Metode de plată](../money/payment-methods.md).

Dacă lipsește butonul **Filters**, riderul pur și simplu nu are etichete private de vehicul — sau este deja într-o cursă activă ori are o rezervare în desfășurare.

## Găsirea unui vehicul

1. Poziția proprie a riderului apare odată ce permisiunea de locație este acordată. Este cerută în timpul onboarding-ului și poate fi reacordată din setările de sistem ale telefonului.
2. Vehiculele disponibile apar ca markere.
3. Atingerea unui marker deschide fișa de detalii a vehiculului — planurile tarifare, plus **Start** și **Reserve**.
4. Pan, zoom cu două degete și comanda **My location** se comportă toate așa cum te-ai aștepta.

### Ce arată un marker depinde parțial de alegerea riderului

Aceste comutatoare din [Setări](../help/settings.md) schimbă ce desenează harta:

- **Show Battery Level**
- **Show Promotional Vehicles**
- **Show Pricing**
- **Auto Zoom**
- **Map 3D**

Zonele bonus de pe hartă și bannerul de vehicul cu preț redus din fișa vehiculului nu sunt disponibile momentan în aplicație.

## Zone

Zonele guvernează unde poate fi condus un vehicul și unde poate fi încheiată o cursă. Atingerea unei zone deschide fișa de informații a zonei.

Ce face efectiv o anumită zonă — arie restricționată, arie fără parcare, plafon de viteză, suprataxă — vine în întregime din modul în care ai configurat-o în [Zone](../../settings/infrastructure/zones.md). Nu există un cod de culoare universal pe care să-l citezi unui rider; descrie propria ta configurație.

Regula de zonă pe care riderii o lovesc cel mai des este parcarea: **încheierea unei curse în afara unei zone de parcare permise este respinsă**, iar aplicația deschide un dialog dedicat, care oferă să arate zonele pe hartă. Acel flux este documentat în [Curse](rides.md#în-afara-zonei-de-parcare).

## Rezervarea unui vehicul

**Reserve** este o rezervare reală, cu un cronometru real, tarifată din tariful atașat vehiculului:

1. Riderul atinge un marker, apoi **Reserve** pe fișa vehiculului.
2. Fereastra gratuită este câmpul **Reservation time** al tarifului, în minute. Cât timp rulează, cardul de rezervare numără **descrescător**.
3. Când fereastra gratuită expiră, rezervarea devine **plătită**: cardul trece la o numărătoare **crescătoare**, iar **Paid reservation price** al tarifului, per minut, se aplică.
4. Partea plătită a rezervării apare apoi ca o linie proprie în detalierea costului cursei finalizate.

Lucruri de știut înainte să răspunzi unui rider:

- **Nu presupune niciodată „câteva minute”.** Unele tarife au ferestre gratuite lungi — 12 sau 24 de ore. Citește cifra reală de pe tarif în [Tarife vehicule](../../settings/infrastructure/vehicle-tariffs.md).
- Dacă tariful lasă necompletat **Reservation time**, aplicația recurge la o fereastră scurtă, de 3 minute. Dacă lasă necompletat **Paid reservation price**, se aplică un mic tarif implicit per minut — completează-le pe amândouă explicit, ca riderii să vadă cifrele tale reale.
- O rezervare se află într-una dintre aceste stări: _pending_, _active_, _expired_, _reserved_ sau _paused_.
- Rezervarea **necesită permisiunea de locație acordată** și poate fi totuși refuzată pentru că riderul este prea departe de vehicul sau pentru că rulează un cooldown de rezervare pe acel vehicul. Fiecare refuz ridică propriul dialog — vezi [Curse](rides.md#de-ce-un-rider-nu-poate-porni-o-cursă).

## Depanare

| Riderul spune…                | Ce verifici                                                                                                                                      |
| ------------------------------| --------------------------------------------------------------------------------------------------------------------------------------------------|
| „Nu văd niciun vehicul”       | Permisiunea de locație e acordată? Apoi: se află riderul într-o zonă pe care chiar o deservești?                                                    |
| „Nu există niciun buton Scan” | Niciun card legat pe un furnizor care suportă carduri salvate. Adaugă un card din [Metode de plată](../money/payment-methods.md)                     |
| „Nu există niciun buton Filters” | Riderul nu are etichete private de vehicul sau este deja într-o cursă ori are o rezervare                                                        |
| „Harta nu se încarcă”         | Verifică mai întâi conectivitatea, apoi **Settings → Data Mode** (_balanced_ / _low_ / _high_), care controlează calitatea tile-urilor hărții și cât de multe detalii sunt preluate |
| „Harta e lentă / grea”        | Același lucru: coboară **Data Mode** la _low_ și activează **Reduced Animations** din [Setări](../help/settings.md)                                  |
| „Nu pot porni o cursă”        | Parcurge în ordine barierele din [Curse](rides.md#de-ce-un-rider-nu-poate-porni-o-cursă) — bara de jos, plan și plată, sold minim de pornire, locație, distanță, cooldown, dovezi foto |

## Sfaturi

- **Verifică bara de jos înaintea oricărui altceva.** Cere riderului să trimită o captură de ecran a hărții; o bară de jos lipsă diagnostichează problema instant.
- **Permisiunea de locație este mereu a doua întrebare.** Nicio poziție înseamnă nicio rezervare și, în majoritatea cazurilor, nicio pornire.
- **Zonele înseamnă doar ce le-ai făcut tu să însemne.** Înainte să-i spui unui rider „nu poți parca acolo”, deschide zona în dashboard și citește configurația ei reală.
- **Ferestrele lungi de rezervare gratuită surprind pe toată lumea**, inclusiv propria ta echipă. Cunoaște câmpul **Reservation time** al tarifului tău înainte să explici o taxă de rezervare.
