# Analitică — Recent Events

Pagina de evenimente (`/analytics/events`) este **dashboard-ul tău de incidente**: fiecare eveniment notabil de system / vehicul / utilizator / zonă peste un interval ales, cu contoare KPI, pattern-uri în timp și un feed căutabil jos.

Diferită de [panoul de notificări](../../features/ux/notifications.md) (real-time, per-eveniment) — această pagină este **agregată și istorică**, utilă pentru a detecta tendințe și a face revizii post-incident.

Permisiune necesară: **View Recent Events** (`s1t2u3`).

## Interval și filtre

Sus pe pagină este o **date-range bar** — fiecare metrică și grafic o respectă. Patru filtre suplimentare îngustează vizualizarea:

| Filtru          | Opțiuni                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Severity**    | `critical` / `warning` / `info` (multi-select)                          |
| **Type**        | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Source type** | `vehicle` / `user` / `zone` / `system`                                  |
| **Status**      | `open` / `resolved` / `dismissed`                                       |

Toate filtrele se combină cu AND. URL-ul reflectă fiecare setare — distribuie un link și colegul vede aceeași felie.

## Secțiuni

Pagina are **cinci secțiuni**:

### 1. Summary

Patru carduri metrice rezumă numărul de evenimente:

| KPI          | Ce afișează                                                     |
| ------------ | --------------------------------------------------------------- |
| **Total**    | Total evenimente în interval                                    |
| **Critical** | Număr cu `severity = critical` — numărul de privit obligatoriu  |
| **Warning**  | Număr cu `severity = warning`                                   |
| **Info**     | Număr cu `severity = info` — de obicei zgomot dacă nu e un vârf |

Fiecare card poartă un badge de comparație "vs perioada anterioară".

### 2. By Type

Un grafic care defalcă evenimentele după **tip**:

- **Error** — eșecuri sistem / integrare
- **Offline** — dispozitive IoT care intră offline
- **Battery** — alarme low / depleted / anomalie
- **Payment** — refuzuri, probleme gateway
- **Support** — vârfuri tickete / chat
- **Maintenance** — evenimente legate de service

Vârfurile într-un singur tip sunt de obicei punctul tău de pornire pentru o investigație.

### 3. Patterns

Două grafice time-series:

- **By Day** — evenimente pe zi pe interval (vizualizează ciclurile săptămânale)
- **By Hour** — evenimente pe ora zilei pe tot intervalul (vizualizează vârfurile zilnice)

### 4. Top Sources

O listă cu **sursele top** care generează evenimente — de obicei vehicule individuale sau zone cu disproporționat de multe evenimente.

Fiecare intrare include sursa (cu link la pagina de detaliu), numărul de evenimente și severitatea / tipul dominant.

Aici găsești **vehiculul care alarmează toată săptămâna** sau **zona cu probleme de baterie**.

### 5. Feed

Un feed derulabil de evenimente individuale care se potrivesc filtrelor curente. Fiecare rând arată:

- Iconiță de severitate (colorată)
- Tipul evenimentului + etichetă sursă
- Descriere scurtă
- Timestamp
- Pilulă de status

Click pe un element din feed navighează la entitatea asociată (vehicul, client, cursă, ticket) unde se aplică.

## Fluxuri tipice

- **Revizie de dimineață** — preset _Last 24h_ → Severity = Critical → scanare; tot ce e roșu primește atenție înainte de a deschide restul dashboard-ului
- **Triaj Top sources** — secțiunea Top sources → click pe un vehicul care apare repetat → repară sau escaladează la sursă
- **Detectare pattern** — graficele patterns; o zi sau oră neobișnuită arată că ceva s-a schimbat (deploy, vreme, avarie)
- **Revizie post-incident** — alege ziua → severity = critical → verifică Feed cu tab-ul Alerts al [vehiculului](../../operations/fleet/vehicle-detail.md) sau secțiunea Quality din [Payments analytics](payments.md) în funcție de tip
- **Trecere de cleanup** — Status = Open → bulk-rezolvă elementele stagnante (faci asta din paginile sursă, nu de aici, dar le găsești aici)

## Sfaturi

- **Critical întâi** — începe cu `severity = critical`; warnings și info se rezolvă adesea singure
- **Type este detectivul tău** — odată ce ai un vârf, filtrează după tipul dominant pentru a îngusta zgomotul
- **Top sources e aur** — un vehicul în topul listei surselor explică de obicei 30-50% din toate evenimentele
- **Agregări vs raw** — această pagină agregă; pentru tranzacții / alerte reale mergi la pagina domeniului sursă
- **Filtre sticky** — setările tale supraviețuiesc navigării; șterge-le când dai URL-ul cuiva
- **Status `open` ≠ alarmă IoT nerezolvată** — Status aici e statusul _înregistrării evenimentului_; alarma de bază poate fi ștearsă pe dispozitiv în timp ce evenimentul e încă deschis în sistem
