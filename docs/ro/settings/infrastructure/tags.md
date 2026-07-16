# Tags

Pagina Tags (`/settings/tags`) este **biblioteca comună de label-uri** a companiei. Un tag este un badge denumit pe care îl poți atașa la vehicles, clients, operators, rides și payments pentru filtrare, grupare și raportare. Lista de aici este sursa unică de adevăr — când adaugi un tag aici, el devine imediat disponibil oriunde este suportat.

Permission necesar: **Tags** (`d1e2f3`). Sub-permissions controlează create, edit și delete.

## Unde sunt folosite tag-urile

Tag-urile sunt un **pool global unic** — nu există scope per tip de entitate. Același tag poate fi atașat la înregistrări diferite:

- **[Vehicles](../../operations/fleet/vehicles.md)** — de ex. "Needs cleaning", "Priority maintenance", "Test fleet"
- **[Clients](../../operations/customers/clients.md)** — de ex. "VIP", "Corporate", "Blocklist"
- **[Operators](../access/operators.md)** — de ex. "Night shift", "Trainer", "On call"
- **Rides** — tag-uite pentru revizuire, dispute sau urmărire de campanii
- **Payments** — tag-uite pentru reconciliere sau follow-up

O înregistrare poate avea mai multe tag-uri; filtrarea după tag este disponibilă în fiecare listă care le suportă.

## Filters

| Filter | Type | Note                                            |
| ------ | ---- | ----------------------------------------------- |
| Search | Text | Caută în numele tag-ului (label) și description |

Lista afișează 50 de rânduri pe pagină în mod implicit; butonul **Clear** resetează filtrele.

## Columns

| Coloană         | Sortabilă? | Conținut                                            |
| --------------- | ---------- | --------------------------------------------------- |
| **Tag name**    | DA         | Iconiță tag + label; link către detail page         |
| **Status**      | DA         | `Public` sau `Private` (vezi mai jos)               |
| **Description** | NU         | Text liber; placeholder "No description" când e gol |
| **Dates**       | DA         | Data creării sus, data actualizării jos             |

Header-ul paginii expune și **Auto-refresh**, **+ Create**, **Import** (în curând) și **Export** (descărcare JSON: current page, all filtered sau specific pages).

## Row actions

Un meniu cu trei puncte pe fiecare rând. Acțiunile disponibile depind de permissions:

| Action           | Permission | Ce face                                                                                                  |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| **View details** | —          | Deschide detail page-ul tag-ului                                                                         |
| **Edit**         | `edit`     | Deschide formularul de editare (label, status, description)                                              |
| **Delete**       | `delete`   | Șterge tag-ul din companie. **Înregistrările tag-uite anterior pierd binding-ul** — folosește cu atenție |

Delete necesită confirmare cu un hold de 3 secunde pentru a preveni ștergerile accidentale.

## Detail page

Click pe un rând (sau _View details_) deschide detail page-ul tag-ului:

- **Tag information** — label, status, description (cu suport Markdown)
- **Metadata** — ID intern, timestamps de created / updated

Edit și Delete sunt disponibile și ca header actions pe detail page.

## Create / Edit form

Formularul de tag (`+ Create` sau _Edit_) are trei câmpuri:

- **Label** (required) — numele vizibil al tag-ului; trebuie să fie suficient de unic pentru recunoaștere instantanee
- **Status** (required) — `Public` sau `Private`
  - **Public** — vizibil și selectabil de toți operatorii din companie
  - **Private** — vizibilitate restricționată; util pentru workflow-uri interne / admin-only
- **Description** (optional) — text liber care explică când să folosești tag-ul; afișat pe detail page

Un **preview** live în sidebar arată cum vor arăta label-ul și description-ul tag-ului în timp ce tastezi. Save validează că label-ul nu e gol, scrie în company tag pool și invalidează shared cache, astfel încât celelalte pagini să facă refetch la următorul mount.

## Workflow-uri tipice

- **Adăugarea unui label nou** — `+ Create` → tastează label → alege Public/Private → opțional descrie când se aplică → Save → tag-ul e imediat disponibil în filtrele și formularele Vehicles / Clients / Operators
- **Redenumirea unui tag** — Edit → schimbă Label → Save (toate înregistrările tag-uite păstrează binding-ul; noul nume apare peste tot)
- **Scoaterea unui tag din uz** — Delete din row menu, sau întâi setează Status pe Private pentru a-l ascunde la tag-uirea nouă păstrând bindings istorice (re-atașarea devine posibilă doar prin edit direct)
- **Curățare duplicate** — caută în listă near-duplicates ("vip" vs "VIP") → editează unul pentru a unifica numele, apoi șterge celălalt (atenție: înregistrările sub tag-ul șters pierd binding-ul — re-tag-uiește-le mai întâi)
- **Bulk export** — Export → All filtered → JSON download pentru shared cu echipa sau backup al taxonomiei

## Tips

- **Tag-urile sunt globale** — nu există namespace separat pentru "client tags" vs "vehicle tags". Numește-le suficient de clar încât un tag "VIP" să aibă sens pe orice entitate, sau folosește prefixe ("client:vip", "vehicle:maintenance") pentru ordine
- **Public e default-ul** — lasă Public dacă nu ai un motiv concret să restricționezi vizibilitatea
- **Delete este distructiv** — fiecare înregistrare cu tag-ul pierde binding-ul instant, nu există soft-delete. Dacă eziți, preferă redenumirea sau trecerea pe Private
- **Description suportă Markdown** pe detail view — folosește-l pentru a documenta cine și când aplică tag-ul
- **Shared cache se invalidează la fiecare save / delete** — celelalte tab-uri deschise vor prelua modificările la următoarea navigare, fără reload complet
- **Numele tag-urilor apar peste tot în filtrele contextuale Ridewolf** — păstrează-le scurte și lowercase-friendly pentru cel mai bun UX în tabele dense
