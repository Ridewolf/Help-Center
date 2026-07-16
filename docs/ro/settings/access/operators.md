# Operatori

Pagina Operatori (`/settings/operators`) este **directorul personalului** — fiecare angajat care are acces la dashboard. Fiecare operator are un rol (vezi [Roluri](roles.md)), metadate opționale department / position, etichete pentru filtrare și un status (Active / Inactive).

Diferită de [Clienți](../../operations/customers/clients.md) (clienții tăi) — Operatorii sunt **echipa internă** care rulează platforma.

Permisiune necesară: **Operators** (`t4u5v6`). Sub-permisiuni protejează edit.

## Cum ajung operatorii aici

Operatorii sunt creați de tine (un admin) prin butonul **+ Create** — nu există auto-înregistrare:

1. **+ Create** deschide formularul de operator — nume, email, rol, opțional department / position / tags
2. Noul operator primește un email cu instrucțiuni de autentificare și o parolă temporară
3. Se autentifică, își completează profilul (`/profile`) și poate începe lucrul bazat pe permisiunile rolului său
4. Operatorii inactivi nu se pot autentifica — pune un cont inactiv când un angajat pleacă

## Filtre

| Filtru | Tip          | Note                                                           |
| ------ | ------------ | -------------------------------------------------------------- |
| Search | Text         | Caută după nume, email, position, department                   |
| Status | Dropdown     | `Active` / `Inactive` (sau `All`)                              |
| Tags   | Multi-select | Filtru după etichete aplicate operatorilor (ex. "Tură noapte") |

## Coloane

| Coloană        | Sortabilă? | Conținut                                                       |
| -------------- | ---------- | -------------------------------------------------------------- |
| **User**       | ✓          | Avatar + nume/prenume + email; link la pagina de detaliu       |
| **Role**       | —          | Pilula rolului (link la [Roluri](roles.md)) |
| **Department** | —          | Etichetă department opțională                                  |
| **Position**   | —          | Etichetă position opțională                                    |
| **Tags**       | —          | Etichete aplicate operatorului                                 |
| **Status**     | ✓          | `Active` (verde) / `Inactive` (gri)                            |

## Acțiuni pe rând

Un meniu cu trei puncte. Acțiunile disponibile depind de permisiuni:

| Acțiune          | Permisiune | Ce face                                                     |
| ---------------- | ---------- | ----------------------------------------------------------- |
| **View details** | —          | Deschide pagina de detaliu a operatorului                   |
| **Edit**         | `edit`     | Deschide formularul de editare (nume, rol, department etc.) |

Nu există **acțiune Delete** — înregistrările de operator sunt păstrate pentru audit. Pentru a împiedica autentificarea, pune statusul operatorului pe _Inactive_ prin Edit.

## Pagina de detaliu

Click pe un rând (sau _View details_) deschide pagina de detaliu cu:

- Informații personale (nume, email, telefon, fotografie)
- Snapshot rol + permisiuni
- Department / position / tags
- Status
- Activity log (evenimente de autentificare, schimbări de rol)

Editează de acolo sau din meniul rândului — ambele ajung la același formular.

## Formular Create / Edit

Formularul de operator (`+ Create` sau _Edit_):

- **First name / Last name** (obligatoriu)
- **Email** (obligatoriu, unic)
- **Role** (obligatoriu, dropdown cu rolurile disponibile — vezi [Roluri](roles.md))
- **Department / Position** (opționale)
- **Tags** (multi-select opțional)
- **Status** (Active / Inactive)
- Doar la Create: o **parolă inițială** sau parolă auto-generată trimisă pe email

Save validează și scrie în audit log. Operatorii noi primesc automat un email de bun venit.

## Fluxuri tipice

- **Onboarding angajat nou** — `+ Create` → completează nume/email/rol → Save → confirmă că a primit email-ul → cere-i să se autentifice și să-și completeze profilul
- **Schimbare rol după promovare** — Edit → schimbă Role → Save (noile permisiuni au efect la următoarea cerere a operatorului, nu retroactiv)
- **Plecare** — Edit → setează Status = Inactive → Save (înregistrarea rămâne pentru audit; autentificarea e blocată)
- **Planificare ture pe etichete** — aplică etichete ca "Tură noapte" → filtrează lista pe etichetă pentru a vedea cine e programat

## Sfaturi

- **Role este câmpul puternic** — fii deliberat la schimbare. Retrogradarea de la Admin la Support înlătură accesul de scriere imediat
- **Inactive ≠ Deleted** — istoricul operatorului e păstrat; pune înapoi pe Active pentru a restaura accesul
- **Lista e sortată după nume implicit** — dacă ai mulți operatori, caută după email sau department în loc să derulezi
- **Etichetele aici sunt diferite de etichetele clienților** — sunt scoped pe operator (ex. "Tură noapte", "Trainer") și nu împart namespace-ul
- **Restricții self-edit** — nu poți să-ți schimbi propriul rol din meniul rândului; folosește Profile pentru schimbări personale
