# Localizare

Pagina Localizare (`/settings/localization`) e **atelierul de traducere** — o bibliotecă de _Collections_ (grupuri de chei de traducere legate) pe care le editezi, le imporți, exporți și publici. Fiecare collection are un namespace (de exemplu, `ui`, `auth`, `rides`), o limbă de bază (mereu `en`), un set de limbi țintă și o listă de chei cu valori per limbă.

> _Notă_: pagina e momentan **un prototip doar pe front-end** — colecțiile sunt seed-uite din `mockData.ts` și ținute în state local. _Save_ și _Publish_ arată toast-uri dar nu există endpoint backend încă. E sigur să folosești pagina ca specificație pentru API-ul viitor; nimic din ce faci nu se persistă.

Permisiune necesară: nu există `requiredPermissions` în rută — orice operator autentificat poate deschide pagina.

## Aranjamentul paginii

Un singur rând antet cu titlul paginii, o casetă de căutare, un dropdown _Import / Export_ și un buton _+ Create collection_ — apoi un card de filtre și tabelul de colecții.

Date de referință (acum hard-codate în `Localization.vue`):

- Limbi: `en`, `ro`, `ru`, `de`, `fr`, `es` (bază + 5 țintă)
- Namespaces: `ui`, `auth`, `rides`, `payments`, `marketing`
- Tag-uri: `core`, `beta`, `promo`, `legacy`

## Filtre

Un card Filters stă deasupra tabelului.

| Filtru    | Tip             | Note                                                                                               |
| --------- | --------------- | -------------------------------------------------------------------------------------------------- |
| Language  | Dropdown        | Filtrează colecțiile care includ această limbă. Default `ro`                                       |
| Namespace | Dropdown        | Una din lista de namespace (sau gol pentru toate)                                                  |
| Status    | Dropdown        | `all`, `active`, `draft`, `archived`                                                               |
| Tags      | Chip-uri toggle | Multi-select chip-uri tag — o collection trebuie să poarte _toate_ tag-urile bifate pentru a trece |
| Search    | Text (toolbar)  | Debounce 300 ms — matchează nume, descriere, namespace                                             |

Un buton _Clear_ pe cardul Filters resetează toate cele patru filtre.

## Tabelul de collections

| Coloană    | Sortabilă? | Conținut                                                                                                         |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| Collection | —          | Nume + descriere pe un rând                                                                                      |
| Namespace  | —          | Badge cu string-ul namespace                                                                                     |
| Languages  | —          | Badge per limbă. Limba de bază primește varianta primary; țintele sunt secondary. Hover arată _base_ vs _target_ |
| Keys       | —          | Numărul total de chei. Hover arată distribuția pe flag-uri (_missing_, _changed_, _obsolete_)                    |
| Status     | —          | Badge — `active` / `draft` / `archived`                                                                          |
| Updated    | —          | Dată relativă. Hover arată autorul                                                                               |
| Actions    | —          | Meniu trei-puncte per rând                                                                                       |

Paginare jos: _Previous / Next_, total și un selector per-pagină (10 / 20 / 50).

### Acțiuni pe rând

| Acțiune   | Ce face                                                                                |
| --------- | -------------------------------------------------------------------------------------- |
| View      | Deschide Collection dialog în mod _view_ doar-citire                                   |
| Edit      | Deschide Collection dialog în mod _edit_                                               |
| Duplicate | Clonează collection-ul cu sufix « (Copy)» în vârful listei                             |
| Import    | Deschide Collection dialog focalizat pe tab-ul _Import / Export_ în modul import       |
| Export    | Toast — placeholder pentru download collection în formatul ales                        |
| Archive   | Pune statusul la `archived` (rândul rămâne — filtrează Status pentru a vedea arhivate) |
| Delete    | Elimină rândul din lista locală                                                        |

## Create / Edit / View — Collection dialog

Se deschide din + Create sau orice acțiune de rând. Patru tab-uri în dialog.

### Tab-ul Overview

Editează metadatele collection-ului.

- _Name_ (obligatoriu) — nume afișat (de exemplu, «UI Labels»).
- _Namespace_ — picker cu input de căutare.
- _Description_ — descriere scurtă.
- _Base language_ — doar-citire, mereu `en`.
- _Target languages_ — chip-uri toggle din cele cinci opțiuni non-engleze. Baza + țintele formează setul de coloane-limbă din tab-ul Keys.
- _Status_ — `active` / `draft` / `archived`.
- _Tags_ — chip-uri toggle din lista de tag-uri.

### Tab-ul Keys

Grila reală de traducere.

- Toolbar: o casetă de căutare (matchează nume cheie și orice valoare), un filtru de status (de exemplu, _Missing only_), un picker de limbă (care coloană țintă e evidențiată pentru editare).
- Acțiuni bulk când chei sunt selectate: _Set status_, _Clear values_, _Export selected_, _Delete_.
- Acțiuni per rând: duplicate key, delete key, copy-from-English (umple ținta curentă cu valoarea EN), validate placeholders (verifică păstrarea de tipuri `{{name}}` în EN în ținta).
- Fiecare rând poartă flag-uri opționale redate ca badge-uri:

| Flag       | Înțeles                                                                |
| ---------- | ---------------------------------------------------------------------- |
| `new`      | Cheie adăugată recent — necesită revizie umană                         |
| `changed`  | Valoarea EN s-a schimbat de la ultima traducere — țintele pot fi stale |
| `missing`  | Valoare goală în cel puțin o limbă țintă                               |
| `obsolete` | Cheia nu mai e folosită în cod — sigur de șters                        |

- _Add key_ și _Find & replace_ deschid mini-dialoguri dedicate.
- Toggle _Autosave_ — când e on, modificările la o valoare se comit imediat la state-ul local.

### Tab-ul Import / Export

Import:

- _Format_ — JSON / CSV / XLSX.
- _Mode_ — replace valori existente / merge / append.
- Toggle _Keep unknown keys_ — când e off, cheile care nu sunt în fișierul importat sunt marcate `obsolete`.
- _Simulate_ — dry-run care raportează ce s-ar schimba (fără scriere).
- _Apply_ — aplică importul. Progress bar arată în timpul rulării.

Export:

- _Format_ — JSON / CSV / XLSX.
- _Scope_ — toate cheile / cheile filtrate / cheile selectate.
- _Download_ — acțiune placeholder (toast deocamdată).

### Tab-ul Publish

- Un bloc rezumat: _N total / M changed / K missing_.
- O listă de chei schimbate cu valori before / after.
- O listă de avertizări (de exemplu, mismatch placeholders, missing target).
- _Save draft_ — persistă copia de lucru ca draft (`status = draft`).
- _Publish_ — promovează draft-ul la `active` și emite un toast.

## Toolbar de sus — meniul Import / Export

Două shortcut-uri globale pe header-ul paginii (separat de acțiunile per-collection):

- _Import collections_ — deschide dialogul de import la nivel de pagină (import bulk de mai multe colecții odată).
- _Export all_ — shortcut pentru a exporta toate colecțiile într-un singur pachet (toast deocamdată).

## Modificări nesalvate & navigation guard

Există un flag global de «modificări nesalvate» (`hasUnsavedGlobal`) — cât timp e on, apare un footer sticky cu _Discard_ / _Save_. Pagina instalează și un `router.beforeEach`: încercarea de a naviga cu modificări nesalvate declanșează un dialog _confirm_ nativ al browser-ului.

## Workflow-uri

- **Traduce o cheie nouă în română** — alege collection-ul din tabel → Edit → tab-ul Keys → setează picker-ul de limbă pe `ro` → găsește cheia (sau _Add key_) → completează valoarea → _Save_ (sau ține Autosave on).
- **Audit pentru ce lipsește în franceză** — Edit collection → tab-ul Keys → filtru status _Missing only_ → limbă _fr_. Folosește _Copy from English_ ca fallback rapid, sau _Validate placeholders_ înainte de publish.
- **Update bulk dintr-un XLSX** — Edit collection → tab Import / Export → alege XLSX, mode _Merge_, _Simulate_ întâi → revizuiește diff-ul → _Apply_.
- **Promovează string-uri draft la producție** — Edit collection → tab Publish → confirmă lista changed-keys, fixează warnings → _Publish_.
- **Spin-off pentru o piață nouă** — Duplicate collection → redenumește → adaugă limba nouă la _Target languages_ → traduce.
- **Arhivează un set deprecat** — meniu rând → Archive. Collection-ul rămâne în tabel dar trece la `archived`; filtrează Status pentru a-l găsi mai târziu.

## Tips

- **Doar front-end momentan.** Nimic de aici nu apelează backend încă — `Save`, `Publish`, `Export`, `Delete`, `Archive` sunt toate mutații de state local + toast-uri. Nu te baza pe pagină pentru string-uri reale de producție până când API-ul se livrează.
- **Limba de bază e blocată.** `en` e mereu baza — colecțiile non-engleze trebuie create ca limbi țintă ale unei colecții cu bază engleză, nu standalone.
- **Tag-urile folosesc logica AND.** Filtrare după două chip-uri tag înseamnă că collection-ul trebuie să poarte _ambele_ tag-uri. Pentru a căuta după oricare, scoate unul din chip-uri.
- **Guard-ul de navigație e global.** Chiar și când doar un dialog e dirty, părăsirea paginii cere confirmare — save sau discard explicit pentru a sări peste prompt.
- **Validarea placeholder-elor e prietena ta** — rularea înainte de Publish prinde greșeli de tipul «am pierdut `{{name}}` în traducere» care strică string-ul renderizat la runtime.
- **Nu confunda cu tab-ul Locale din [Setări generale](general.md)** — acel tab setează defaults (ce limbi sunt _activate_, formate date / oră / unități). Pagina aceasta e unde trăiesc string-urile traduse efectiv.
- **Datele de referință sunt mock.** Limbi, namespaces și tag-uri sunt acum hard-codate — la livrarea backend-ului așteaptă-te să vină de la API și posibil să fie editabile.
