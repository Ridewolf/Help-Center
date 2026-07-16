# Icon Sets

Pagina Icon Sets (`/settings/icon-sets`) este **biblioteca de iconițe de hartă** pe care rider mobile app Ridewolf le folosește pentru a randa vehiculele. Fiecare set este legat de un singur tip de vehicul (e-scooter, e-bike, cargo e-bike, e-moped, e-car, e-boat) și oferă trei categorii de iconițe SVG: **Selected**, **Non-selected** și **Discount**.

Aceasta este infrastructură de conținut — operatorii încarcă SVG-uri aici, rider app alege iconița potrivită pe baza tipului de vehicul, nivelului bateriei și a faptului că riderul a tapat sau nu pe pin. Nu este nevoie de release de mobile app pentru schimbarea graficii.

Împreună cu [FAQ Sets](faq-sets.md) și [Quick Guides](quick-guides.md), acesta este stratul de conținut al dashboardului.

Permisiune necesară: **Icon Sets** (check with admin).

## Unde apare la rider

Pe harta din rider app, fiecare pin de vehicul folosește o iconiță din setul activ pentru tipul său:

- **Non-selected** — pentru pin-urile pe care riderul nu le-a tapat — șase niveluri de baterie (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`), ca pinul să reflecte încărcarea curentă
- **Selected** — înlocuiesc pinul după ce riderul îl tapează — aceleași șase niveluri, stil diferit
- **Discount** (5%, 15%, 25%, 35%, 45%, 55% în mod implicit) — suprapunere pe pin când vehiculul are preț promo

Un set per tip de vehicul poate fi marcat ca **default** — acela e încărcat de app când nimic altceva nu e configurat.

## Filtre

| Filtru         | Tip      | Note                                                                                                        |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| Search         | Text     | Câmp în antet — caută în title / slug                                                                       |
| Vehicle type   | Dropdown | `E-scooter` / `E-bike` / `Cargo e-bike` / `E-moped` / `E-car` / `E-boat` (sau `All`)                        |
| State coverage | Dropdown | După ce s-a încărcat: `Selected only` / `Non-selected only` / `Discount only` / `Full coverage` (sau `All`) |
| Status         | Dropdown | `Active` / `Draft` / `Incomplete` / `Archived` (sau `All`)                                                  |
| Tags           | Combobox | Filtru de etichete (input vizibil dar momentan dezactivat — vine în curând)                                 |

**Clear all** resetează toate filtrele.

## Coloane

| Coloană                | Conținut                                                                    |
| ---------------------- | --------------------------------------------------------------------------- |
| **Set**                | Iconiță package + title; linia secundară arată slug                         |
| **Vehicle type**       | Pilula tipului (E-scooter, E-bike etc.)                                     |
| **Selected icons**     | Acoperire de tipul `6/6` (câte niveluri de baterie sunt încărcate)          |
| **Non-selected icons** | Aceeași acoperire `n/6` pentru variantele non-selected                      |
| **Discount icons**     | Primele 3 procente de reducere ca chips (`5%`, `15%`, `25%`), overflow `+N` |
| **Tags**               | Primele 2 chips de etichete cu overflow `+N`                                |
| **Updated**            | Data ultimei actualizări                                                    |
| **Status**             | `Active` / `Draft` / `Incomplete` / `Archived`                              |

`Incomplete` înseamnă că setul are iconițe lipsă într-una din cele trei categorii — rider app revine la default-ul tipului de vehicul până termini upload-ul.

Click pe rând deschide **Detail dialog** — preview vizual al fiecărei iconițe din set. Click pe meniul cu trei puncte — acțiuni.

## Acțiuni pe rând

| Acțiune            | Ce face                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **View details**   | Deschide dialogul de detalii cu preview-uri ale fiecărui SVG încărcat                         |
| **Edit**           | Deschide formularul cu cinci taburi (Details / Selected / Non-selected / Discounts / Preview) |
| **Duplicate**      | Clonează setul ca Draft                                                                       |
| **Set as default** | Marchează setul ca default pentru tipul său de vehicul — rider app îl va încărca              |
| **Download**       | Descarcă setul ca ZIP cu toate SVG-urile                                                      |
| **Archive**        | Mută în `Archived` — păstrat pentru istoric, nefolosit de app                                 |
| **Delete**         | Elimină permanent                                                                             |

Toolbarul de sus oferă **Import** (ZIP / JSON) și **Export** (ZIP / JSON) în masă.

## Formular Create / Edit

Formularul este un dialog cu cinci taburi:

1. **Details** — title (obligatoriu), slug (auto-derivat), vehicle type (obligatoriu), tags, status
2. **Selected** — încarcă 6 SVG-uri, câte unul per nivel de baterie (`bat10` → `bat100`)
3. **Non-selected** — aceleași 6 sloturi, pentru starea neselectată
4. **Discounts** — un SVG per procent de reducere. Preseturile implicite sunt `5, 15, 25, 35, 45, 55`, dar poți adăuga/elimina rânduri
5. **Preview** — verificare vizuală a întregului set înainte de save

Un set cu sloturi goale în orice tab e salvat ca `Incomplete`.

## Workflow-uri tipice

- **Reîmprospătează pinurile de e-scooter pentru un rebrand** — Duplicate default-ul curent → încarcă SVG-uri noi în toate cele trei taburi → save ca Draft → preview → Set as default → rider app îl preia la următorul refresh
- **A/B test pe iconițe** — păstrează setul vechi Active și non-default, creează unul nou ca Active + default pentru un tip → revino setând cel vechi ca default dacă e cazul
- **Grafică de reducere pentru sărbători** — deschide setul activ → Edit → tab Discounts → încarcă SVG-uri tematice pentru procentele folosite acum → save
- **Bulk import dintr-un ZIP de la designer** — _Import_ sus-dreapta → ZIP → confirmă maparea fișierelor → review în Preview → Activate

## Sfaturi

- **Un singur default per tip de vehicul** — setarea unui nou default anulează automat precedentul. Statusul nu trebuie să fie `Active` ca un set să fie default, dar ar fi bine să fie
- **Nivelurile bateriei sunt fixe** — `bat10/25/40/55/90/100` sunt singurele buckets pe care le înțelege app-ul; alege cel mai apropiat pe baza încărcării reale
- **Doar SVG** — upload-urile așteaptă fișiere SVG; PNG-urile nu vor scala curat pe retina
- **`Incomplete` e o garda de siguranță utilă** — îți spune că rider app revine la default, deci nu vei trimite niciodată accidental un set pe jumătate
- **Archive înainte de delete** — seturile arhivate rămân căutabile dacă vrei să revii
