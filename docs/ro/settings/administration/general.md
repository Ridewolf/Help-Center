# Setări generale

Pagina Setări generale (`/settings/general`) este **panoul de control la nivel de sistem** — un singur loc unde stabilești valorile implicite globale pentru aplicația riderului, flotă, tarifare, curse, notificări și switch-urile de nivel developer. Tot ce e aici se aplică global pentru întreaga companie; suprascrierile per vehicul sau per tarif sunt în [Vehicle Settings](../infrastructure/vehicle-settings.md) și [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).

> _Notă_: pagina este momentan **doar pe front-end** — fiecare valoare e ținută în state local, iar butonul **Save** doar arată un toast de confirmare. Niciun apel către backend încă. Tratează pagina ca specificație / UI de staging pentru API-ul viitor.

Ruta `/settings/general-settings` e o pagină **placeholder** separată și aproape goală, cu o singură ilustrație și un titlu. Ecranul real de configurare e `/settings/general` (articolul acesta) — acolo trăiesc cele șase tab-uri.

Permisiune necesară: nu există `requiredPermissions` în rută — orice operator autentificat poate deschide pagina.

## Tab-uri

Șase tab-uri sus (desktop). Pe mobil aceleași tab-uri se pliază într-un acordeon care doar spune _Use desktop for full configuration_ — aceste setări sunt intenționat doar pentru admin.

| Tab           | Iconiță     | Conținut                                                                                             |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| App           | sliders     | Gating de update, vizibilitatea implicită a modulelor, feature flags, rate limits, defaults vehicule |
| Locale        | globe       | Limba implicită, timezone, limbi activate, formate de dată/oră/unități, harta + stilizare zone       |
| Pricing       | dollar sign | Defaults tarifare, șabloane de tarife, politici discount/promo, defaults abonamente                  |
| Rides         | car         | Reguli rezervare + cursă, auto-pause/auto-stop, penalități, procesare plăți                          |
| Notifications | bell        | Toggle canale (push / email / SMS) și șabloane mesaj pentru evenimentele riderului                   |
| Advanced      | code        | Integrări, securitate, retenție privacy, pagini legale, dev flags, mentenanță sistem                 |

Un footer sticky cu **Discard** și **Save changes** apare doar după ce ai modificat efectiv un câmp — pagina folosește `useFormState` și compară cu snapshot-ul încărcat.

## Secțiuni per tab

### App

Două carduri stivuite.

**App defaults**

- _Require app update_ — switch + input min-version (dezactivat cât timp switch-ul e off). Dacă e on, riderii sub versiunea minimă sunt blocați.
- _Default modules visibility_ — patru switch-uri (Marketing, Rebalance, Support, Analytics) care presetează modulele vizibile noilor operatori.
- _Feature flags_ — patru switch-uri (Live tracking, Advanced stats, Multi-currency, White-label).
- _API rate limit_ / _UI rate limit_ — input-uri numerice (default 1000 / 100 req/min).

**Vehicle defaults**

- _Default icon set_ — dropdown cu căutare peste nume de seturi de iconițe (acum patru mock-uri hard-codate: Default Icons / Modern Set / Minimalist / Color Bold; lista reală va veni din [Icon Sets](../content/icon-sets.md)).
- _Battery thresholds_ — două input-uri numerice (Low %, Critical %). Validare la Save: critical trebuie să fie mai mic decât low, altfel toast cu eroare.
- _Health score weights_ — trei procente (signal / errors / battery). Validat să sumeze 100 la Save.
- _Auto tags_ — string CSV cu tag-urile aplicate automat vehiculelor nou create.

### Locale

- _Default language_ / _Timezone_ — select.
- _Enabled languages_ — chips multi-select; X scoate.
- _Week start_ — Monday / Sunday.
- _Date format_ — DD/MM/YYYY, MM/DD/YYYY, ISO etc.
- _Time format_ — 12h / 24h.
- _Temperature unit_ — Celsius / Fahrenheit.
- _Distance unit_ — km / mi.
- _Display currency_ — default EUR (TODO în cod: se va încărca din API company).
- _Price rounding_ — none / nearest 0.05 / etc.

**Maps** (card separat pe același tab)

- _Provider_ (implicit MapTiler) și _Style_ (light / dark / satellite).
- _API key_ — câmp pentru cheia provider-ului.
- _Default zoom_ + _Default center_ — folosite când lipsește context GPS.
- _Zone styling_ — culoare + stroke width pentru poligoanele Parking / No-go / Low-speed / Paid-parking. Picker-ele folosesc o paletă de 12 culori.
- _Low-speed limit_ — numeric (km/h).

### Pricing

Patru carduri: _Pricing defaults_, _Tariff templates_, _Discounts & Promo_, _Subscriptions_. Sunt **valori de rezervă** — prețul real al cursei e suprascris per vehicul prin [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).

- Pricing defaults: unlock fee, preț/min, preț/km, paid waiting, minute rezervare gratuită, două praguri de discount pe număr de curse.
- Tariff templates: per perioadă (minut / oră / zi / săptămână / lună / an) — preț, max-duration, free-parking, enabled. Plus _allow stacking_.
- Discounts & Promo: max discount %, prefix promo (default `WOLF`), valabilitate default (zile), reguli stacking.
- Subscriptions: % discount default, zile trial, auto-renew, allow promo codes.

### Rides

- Reservation + Ride rules: minute rezervare gratuită, max rezervări active per client, sold minim pentru start, auto-pause + auto-stop (fiecare cu enabled + prag).
- Penalties: două tipuri (Out-of-zone, Improper parking) — fiecare cu sumă fee și mesaj de avertizare.
- _Default quick guide_ — dropdown dintr-o listă placeholder; va veni din [Quick Guides](../content/quick-guides.md).
- _Default FAQ set_ — dropdown din [FAQ Sets](../content/faq-sets.md).
- Card Payments: 3-D Secure, mod capture (immediate / pre-auth), sumă pre-auth, durată hold (ore), politică refund, fereastră max refund (zile).

### Notifications

- _Channels_ — trei switch-uri (Push / Email / SMS) — controlează ce canale sunt disponibile aplicației riderului.
- _Templates_ — title + body pentru cele trei evenimente de bază: Ride started, Ride completed, Penalty applied. Variabile precum `{{amount}}` / `{{reason}}` sunt substituite de backend.
- Butonul **Test notification** arată un info-toast (fără trimitere reală încă).

Pentru pipeline-ul de alerte către **operatori**, vezi [Alerts & Notifications](alerts-notifications.md) — tab-ul de aici e pentru partea aplicației riderului.

### Advanced

Cinci carduri.

- _Integrations_ — webhook endpoint + secret, Google Analytics ID, Sentry DSN, string-uri Telegram/Slack bot. Butonul **Test webhook** arată un toast.
- _Security_ — switch 2FA, session timeout (min), politică parolă (lungime minimă + uppercase/numbers/special), chei reCAPTCHA, IP allowlist, restricții export.
- _Privacy_ — retenție date în zile (telemetry / media / logs), anonimizare GPS, SLA export și SLA ștergere (zile).
- _Legal_ — Terms of Service + Privacy Policy ca text Markdown, plus versiune și dată publicare.
- _Developer / Advanced_ — sandbox mode, log level, URL prod + staging, experimente (AI routing, predictive maintenance, dynamic pricing).
- _System / Maintenance_ — switch mentenanță + text banner + read-only mode.
- _Audit & Backups_ — _Create backup_ și _Delete all data_ (ambele toast; cel de ștergere spune că _requires admin confirmation_ — încă neconectat).

## Workflow-uri

- **Blochează un release vechi** — App → activează _Require app update_ → setează min version → Save. Riderii pe build-uri vechi primesc prompt de update.
- **Adaugă o limbă** — Locale → _Enabled languages_ → bifează chip-ul de limbă → Save. Stringurile rămân de tradus în [Localization](localization.md).
- **Ajustează UX-ul penalităților** — Rides → modifică fee-ul out-of-zone + textul → Save.
- **Pune platforma pe mentenanță** — Advanced → _System / Maintenance_ → comută switch-ul, editează textul de banner, eventual activează read-only → Save.
- **Schimbă stilul hărții** — Locale → cardul _Maps_ → alege style → ajustează culorile zonelor → Save (se va aplica global după conectarea API-ului).

## Tips

- **Doar front-end momentan.** Save capturează un snapshot local, dar nu apelează backend — nu te baza pe pagină pentru a persista nimic până la conectarea API-ului.
- **Validarea trăiește la Save.** Battery thresholds (critical < low) și ponderile health-score (sum 100) sunt verificate la apăsare Save, nu pe măsură ce tastezi — corectează toast-ul și încearcă din nou.
- **Nu confunda cu `/settings/general-settings`.** Acea rută există dar arată doar un card placeholder gol — deschide `/settings/general` pentru ecranul real.
- **Discard e plasa ta de siguranță** — footer-ul apare doar când există modificări nesalvate; apasă _Discard_ pentru a reveni la snapshot fără să părăsești pagina.
- **Mobilul e limitat intenționat.** Doar acordeonul App e conectat; restul sugerează doar o sesiune desktop.
- **Per-vehicul învinge.** Ce setezi în Pricing / Rides e default; tariful efectiv plătit de rider vine din Vehicle Tariff legat de modelul vehiculului — vezi [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
