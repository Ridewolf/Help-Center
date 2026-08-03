# Allmänt

Sidan Allmänt (`/settings/general`) är **systemets kontrollpanel** — en plats för att ställa in standardvärden som styr Rider App, flottan, prissättning, resor, aviseringar och utvecklarnivåns inställningar. Allt här gäller globalt för hela företaget; per-fordon eller per-avgifts-överskridanden finns i [Fordonsinställningar](../infrastructure/vehicle-settings.md) och [Fordonsavgifter](../infrastructure/vehicle-tariffs.md).

> _Notera_: denna sida är för närvarande en **endast frontend-skärm** — varje värde hålls i lokal state och **Spara**-knappen visar bara en bekräftelse-toast. Ingen data skickas till backend än. Behandla den som specifikationen / staging-UI för den kommande API:n.

Rutten `/settings/general-settings` är en separat, nästan tom **platshållare** med en enda illustration och rubrik. Den riktiga konfigurationsskärmen är `/settings/general` (denna artikel) — där alla sex flikar finns.

Behörighet krävs: inga specifika `requiredPermissions` är satta i routern — vilken inloggad operatör som helst kan öppna sidan.

## Flikar

Sidan har sex flikar överst (på desktop). På mobil kollapsar samma flikar till ett ackordion som bara säger _Använd desktop för full konfiguration_ — dessa inställningar är avsedda endast för administratörer.

| Flik          | Ikon        | Vad den täcker                                                                                         |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| App           | sliders     | App-uppdateringsblockering, standardmodulernas synlighet, funktionsflaggor, hastighetsbegränsningar, fordonsstandarder             |
| Locale        | globe       | Standardspråk, tidszon, aktiverade språk, datum-/tids-/enhetsformat, kartleverantör + zonstil |
| Pricing       | dollar sign | Prisstandarder, avgiftsmallar, rabatter/kampanjpolicy, prenumerationsstandarder                      |
| Rides         | car         | Boknings- och reseregler, automatisk paus/automatisk stopp, påföljder, betalningshantering                          |
| Notifications | bell        | Kanalväxlar (push / e-post / SMS) och meddelandemallar för rider-händelser                            |
| Advanced      | code        | Integrationer, säkerhet, sekretesslagring, juridiska sidor, utvecklarflaggor, systemunderhåll            |

En fast fot med **Kassera** och **Spara ändringar** visas längst ner endast efter att du faktiskt ändrat ett fält — sidan använder `useFormState` för att jämföra mot den inlästa ögonblicksbilden.

## Sektioner per flik

### App

Två kort staplade.

**App-standarder**

- _Kräv appuppdatering_ — växlare + textinmatning för min-version (inaktiverad tills växlaren är på). Om på, blockerar rider app användare under versionen.
- _Standardmodulers synlighet_ — fyra växlare (Marknadsföring, Omfördelning, Support, Analys) som förinställer vilka moduler nya operatörer ser.
- _Funktionsflaggor_ — fyra växlare (Live-spårning, Avancerad statistik, Multi-valuta, White-label).
- _API-hastighetsgräns_ / _UI-hastighetsgräns_ — numeriska inmatningar (standard 1000 / 100 förfrågningar/min).

**Fordonsstandarder**

- _Standard ikonuppsättning_ — sökbar dropdown med ikonuppsättningsnamn (för närvarande fyra hårdkodade mockar: Default Icons / Modern Set / Minimalist / Color Bold; den riktiga listan kommer från [Ikonuppsättningar](../content/icon-sets.md)).
- _Batteritrösklar_ — två numeriska inmatningar (Låg %, Kritisk %). Validering sker vid Spara: kritisk måste vara lägre än låg annars får du ett toast-fel.
- _Hälsopoängsvikter_ — tre procentinmatningar (signal / fel / batteri). Valideras att summan blir 100 vid Spara.
- _Auto-taggar_ — kommaseparerad sträng med taggar som automatiskt appliceras på helt nya fordon.

### Locale

- _Standardspråk_ / _Tidszon_ — välj.
- _Aktiverade språk_ — multi-chip; X för att ta bort.
- _Veckostart_ — Måndag / Söndag.
- _Datumformat_ — DD/MM/YYYY, MM/DD/YYYY, ISO, etc.
- _Tidsformat_ — 12h / 24h.
- _Temperaturenhet_ — Celsius / Fahrenheit.
- _Avståndsenhet_ — km / mi.
- _Visningsvaluta_ — standard EUR (TODO i kod: hämta från företags-API).
- _Prisavrundning_ — ingen / närmaste 0,05 / etc.

**Kartor** (separat kort på samma flik)

- _Leverantör_ (MapTiler standard) och _Stil_ (ljus / mörk / satellit).
- _API-nyckel_ — textfält för leverantörens nyckel.
- _Standardzoom_ + _Standardcentrum_ — används när ingen GPS-kontext finns.
- _Zonstil_ — färg + linjebredd för parkerings-/förbjudna-/låg-hastighets-/betalparkering-polygons. Väljare använder en 12-färgs palett.
- _Låg-hastighetsgräns_ — numerisk (km/h).

### Pricing

Fyra kort: _Prisstandarder_, _Avgiftsmallar_, _Rabatter & Kampanjer_, _Prenumerationer_. Dessa sätter **reservvärden** — faktisk prisättning för resor åsidosätts per fordon via [Fordonsavgifter](../infrastructure/vehicle-tariffs.md).

- Prisstandarder: upplåsningsavgift, pris/min, pris/km, betald väntan, gratis bokningsminuter, tvåstegs rabatt baserat på antal resor.
- Avgiftsmallar: per period (minut / timme / dag / vecka / månad / år) — pris, maxlängd, gratisparkering-växlare, aktiverad-växlare. Plus _tillåt stapling_.
- Rabatter & Kampanjer: max rabatt %, kampanjprefix (standard `WOLF`), standard giltighet i dagar, och staplingsregler.
- Prenumerationer: standard % rabatt, provdagar, automatisk förnyelse, tillåt kampanjkoder.

### Rides

- Boknings- och reseregler: gratis bokningsminuter, max aktiva bokningar per kund, min saldo för start, automatisk paus + automatisk stopp (varje med aktiverad + tröskel).
- Påföljder: två påföljdstyper (Utanför zon, Felparkering) — varje med avgiftsbelopp och varningsmeddelande.
- _Standard snabbguide_ — dropdown hämtad från en platshållarlista; kommer att hämtas från [Snabbguider](../content/quick-guides.md).
- _Standard FAQ-uppsättning_ — dropdown hämtad från [FAQ-uppsättningar](../content/faq-sets.md).
- Betalningskort: 3-D Secure, capture-läge (omedelbar / förauth), förauth-belopp, hålltid (timmar), återbetalningspolicy, max återbetalningsfönster (dagar).

### Aviseringar

- _Kanaler_ — tre reglage (Push / E-post / SMS) — styr vilka kanaler som ens är tillgängliga i rider-appen.
- _Mallarna_ — titel + brödtext för de tre kärnhändelserna: Resa startad, Resa avslutad, Påförd påföljd. Variabler som `{{amount}}` / `{{reason}}` ersätts av backend.
- En **Testavisering**-knapp visar en informations-toast (ingen verklig sändning än).

För den **operatörsvända** varningskedjan, se [Alerts & Notifications](alerts-notifications.md) — denna flik här är för rider-appens sida.

### Avancerat

Fem kort.

- _Integrationer_ — webhook-endpoint + hemlighet, Google Analytics-ID, Sentry DSN, Telegram- och Slack-botsträngar. En **Testa webhook**-knapp visar en toast.
- _Säkerhet_ — kräva 2FA-reglage, sessionstimeout (min), lösenordspolicy (minlängd + versaler/siffror/specialtecken), reCAPTCHA-nycklar, IP-tillåtelselista, exportrestriktionsrullgardin.
- _Integritet_ — datalagring i dagar (telemetri / media / loggar), anonymisera-GPS-reglage, export-SLA och raderings-SLA i dagar.
- _Juridik_ — Användarvillkor + Integritetspolicy som Markdown-textfält, plus versionssträng och publiceringsdatum.
- _Utvecklare / Avancerat_ — sandbox-läge, loggnivå, produktions- + staging-endpoint-URL:er, experimentreglage (AI-routning, prediktivt underhåll, dynamisk prissättning).
- _System / Underhåll_ — underhållsläge-reglage + bannertext + skrivskyddat läge-reglage.
- _Revision & Säkerhetskopior_ — knapparna _Skapa säkerhetskopia_ och _Radera all data_ (båda visar toasts; raderingsknappen säger att den _kräver administratörsbekräftelse_ — inte kopplad än).

## Arbetsflöden

- **Lås en ny version** — App-fliken → slå på _Kräv appuppdatering_ → ange minsta version → Spara. Riders med äldre versioner får en uppdateringsprompt.
- **Lägg till ett språk** — Locale-fliken → _Aktiverade språk_ → välj språkchip → Spara. Strängar måste fortfarande översättas via [Localization](localization.md).
- **Justera rider-påföljdsupplevelsen** — Rides-fliken → justera avgift utanför zon + varningstext → Spara.
- **Pausa plattformen för underhåll** — Avancerat → _System / Underhåll_ → slå på reglaget, redigera bannertexten, eventuellt sätt skrivskyddat läge → Spara.
- **Rulla ut en ny kartstil** — Locale → _Kartor_-kortet → välj stil → justera zonfärger → Spara (ändringar gäller globalt när API är kopplat).

## Tips

- **Endast front-end än så länge.** Spara tar en lokal ögonblicksbild men kontaktar ingen backend-endpoint — lita inte på att denna sida sparar något förrän API är på plats.
- **Validering sker vid Spara.** Batteritrösklar (kritisk < låg) och hälsopoängsvikter (summa 100) kontrolleras när du trycker på Spara, inte under inmatning — åtgärda toast-felet och försök igen.
- **Förväxla inte med `/settings/general-settings`.** Den rutten finns men visar bara ett tomt platshållarkort — öppna `/settings/general` för den riktiga skärmen.
- **Kassera är din säkerhetslina** — sidfoten visas bara vid osparade ändringar; klicka på _Kassera_ för att återgå till den inlästa ögonblicksbilden utan att lämna sidan.
- **Mobil är medvetet begränsad.** Endast App-accordion är kopplad; resten pekar bara på en desktop-session.
- **Per-fordon vinner.** Allt du ställer in i Prissättning / Resor är standard; den faktiska avgiften en rider betalar kommer från Fordonsavgiften kopplad till modellen — se [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
