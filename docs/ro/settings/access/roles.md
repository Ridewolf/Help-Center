# Roluri

Pagina Roluri (`/settings/roles`) este unde definești **ce pot face operatorii** în dashboard. Un rol este un pachet numit de permisiuni; fiecare operator are exact un rol; permisiunile decid ce pagini văd și ce acțiuni pot face.

Pereche cu [Operatori](operators.md) — Operatorii atribuie roluri oamenilor, Rolurile definesc ce poate face fiecare rol.

Permisiune necesară: **Roles** (`d4e5f6`).

## Cum funcționează permisiunile

Fiecare pagină și acțiune din dashboard stă în spatele unui **ID de permisiune** (ex. `k7m8n9` pentru Vehicule, `e4f5h6` pentru Clienți). Un rol este în esență o listă de verificare cu aceste ID-uri:

- Un operator poate vedea o pagină doar dacă rolul lui are permisiunea paginii
- O acțiune pe rând (Edit, Delete etc.) e ascunsă când rolului îi lipsește sub-permisiunea
- Permisiunile sunt evaluate **per cerere** — schimbi un rol și operatorul vede schimbarea la următoarea încărcare de pagină (sau mai devreme)

**Nu există moștenire** între roluri — fiecare rol e independent. Rolurile de trust ridicat au pur și simplu o listă mai lungă de permisiuni.

## Default vs Custom

Rolurile vin în două variante:

| Tip         | Editabil | Scop                                                               |
| ----------- | -------- | ------------------------------------------------------------------ |
| **Default** | Nu       | Vine cu platforma (ex. Owner, Admin). Garantează un baseline sigur |
| **Custom**  | Da       | Creat de tine — se potrivește structurii echipei                   |

Rolurile **Owner / Admin** Default nu pot fi editate sau șterse — sunt plasa de siguranță. Rolurile Custom sunt unde ajustezi permisiunile.

## Filtre

| Filtru | Tip      | Note                              |
| ------ | -------- | --------------------------------- |
| Search | Text     | Caută după nume rol și descriere  |
| Status | Dropdown | `Active` / `Inactive` (sau `All`) |

## Coloane

| Coloană         | Sortabilă? | Conținut                                                                |
| --------------- | ---------- | ----------------------------------------------------------------------- |
| **Role name**   | ✓          | Eticheta rolului                                                        |
| **Description** | —          | Text scurt care explică pentru ce e rolul                               |
| **Type**        | —          | Tag Default / Custom                                                    |
| **Permissions** | —          | Numărul de permisiuni acordate (ex. "23 / 84")                          |
| **Trust score** | ✓          | Scor numeric care indică cât poate face rolul (mai mare = mai puternic) |
| **Created**     | ✓          | Când a fost creat rolul                                                 |

### Trust score

Trust score e un proxy numeric pentru "cât de periculos e setul de permisiuni al acestui rol" — folosit pentru sortare și indicii vizuale. Un rol cu delete + bulk-update + permission-management are un trust score mai mare decât un rol view-only. Nu există o scală fixă; tratează-l ca o măsură relativă în lista ta de roluri.

## Acțiuni pe rând

Un meniu cu trei puncte.

| Acțiune          | Permisiune | Ce face                                                                                     |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------- |
| **View details** | —          | Deschide pagina de detaliu a rolului cu defalcarea completă a permisiunilor                 |
| **Edit**         | `edit`     | Deschide formularul de editare (dezactivat cu toast pentru rolurile Default)                |
| **Delete**       | `delete`   | Ștergere logică a rolului (cu confirmare; doar Custom; doar dacă niciun operator nu îl are) |

Dacă un rol e în uz, sistemul va refuza Delete și îți va spune câți operatori încă îl au — re-atribuie-i întâi.

## Formular Create / Edit

Formularul de rol pune fiecare permisiune grupată pe domain (Operations, Support, Analytics, Settings etc.) cu checkbox-uri.

Câmpuri cheie:

- **Name** (obligatoriu, unic)
- **Description** (opțional dar recomandat)
- **Status** (Active / Inactive)
- **Permission tree** — permisiuni la nivel de pagină și sub-permisiuni, grupate pe domain

Când oprești o permisiune top-level de pagină, toate sub-permisiunile ei sunt forțate off (operatorul pierde pagina). Pornind o permisiune de pagină dă view-only implicit — apoi opt-in pe sub-permisiuni _create_, _edit_, _delete_ individual.

Un indicator mic **Trust score** se actualizează pe măsură ce bifezi — util pentru verificare cu roluri similare.

## Pagina de detaliu a rolului

Click pe un rând deschide pagina de detaliu a rolului:

- Name, description, type, status
- Trust score
- Lista completă de permisiuni (read-only, grupată pe domain)
- Activity log: când a fost creat, ultimă editare, de cine
- Lista operatorilor atribuiți acum (cu link-uri către profilurile lor)

## Fluxuri tipice

- **Definește o echipă nouă** — `+ Create` → nume (ex. "Field-team lead") → bifează permisiunile necesare → Save → atribuie rolul [operatorilor](operators.md) relevanți
- **Restrânge un rol existent** — găsește rolul în listă → Edit → debifează permisiunile pe care nu le mai vrei → Save (operatorii cu acest rol pierd accesul la următoarea cerere)
- **Promovează un membru** — mergi la [Operatori](operators.md) → Edit → schimbă Role → Save (nu se face din această pagină)
- **Auditează cine poate șterge vehicule** — deschide această listă → sortează după Trust score → parcurge sub-permisiunile Edit / Delete pe Vehicule ale fiecărui rol
- **Retrage un rol** — asigură-te că niciun operator nu îl are ([Operatori](operators.md) filtru pe rol) → Delete

## Sfaturi

- **Mai puțin e mai mult** — începe cu view-only și adaugă acțiuni specifice; rezistă tentației de a copia un rol mai înalt și a tăia
- **Testează prin impersonare** (unde e suportat) — înainte de a desfășura un rol, autentifică-te ca operator de test cu rolul și încearcă fluxurile
- **Rolurile Default sunt plasa ta** — Owner / Admin există mereu; dacă te încui accidental dintr-un rol Custom, un Admin poate restaura accesul
- **Trust score e un hint, nu o regulă** — două roluri cu același trust score pot face lucruri foarte diferite; verifică mereu arborele real de permisiuni
- **Permisiunile sunt evaluate server-side** — oprirea lor în rol nu elimină sesiunea curentă a operatorului, dar următoarea cerere e refuzată
- **Documentează fiecare rol Custom** în câmpul Description — peste șase luni, "Fleet manager (read + edit, no delete)" e o salvare
