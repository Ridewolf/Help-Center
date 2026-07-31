# Teman

Instrumentpanelen har tre oberoende utseendeinställningar:

- **Läge** — ljust, mörkt eller följ operativsystemet
- **Färg** — accentfärgen som används för knappar, länkar, märken och aktiva tillstånd
- **Kartstil** — basens kartplattor (separat val för ljust och mörkt läge)

Alla tre finns i **Profilsidan** längst ner — klicka på din avatar i toppfältet för att öppna den.

## Läge (ljust / mörkt / system)

Växla mellan tre lägen:

| Ikon       | Läge   | Beteende                                                        |
| ---------- | ------ | --------------------------------------------------------------- |
| 🖥️ Skärm   | System | Följer ditt OS-val; byter automatiskt vid OS-ändring           |
| ☀️ Sol     | Ljust  | Alltid ljust, ignorerar OS                                      |
| 🌙 Måne    | Mörkt  | Alltid mörkt, ignorerar OS                                      |

**System**-läget är standard. Om du ändrar ditt OS-tema (t.ex. macOS schemalagt mörkt läge vid solnedgång) följer instrumentpanelen omedelbart — ingen omladdning krävs.

## Färg

Accentfärgen styr knappar, länkar, märken, fokusringar och den aktiva sidofältsposten. Tolv förinställda paletter finns tillgängliga:

| Färg   | Förhandsvisning |
| ------ | --------------- |
| Svart  | ⚫              |
| Röd    | 🔴              |
| Ros    | 🌹              |
| Rosa   | 🩷              |
| Orange | 🟠              |
| Gul    | 🟡              |
| Grön   | 🟢              |
| Teal   | 🟢              |
| Cyan   | 🔵              |
| Blå    | 🔵              |
| Indigo | 🟣              |
| Lila   | 🟣              |

Välj den som du tycker är lättast att läsa mot ditt valda läge (vissa färger ser bättre ut på ljust, andra på mörkt).

## Kartstil

Sidor som visar kartor (Live Map, Fordonsdetalj, Zone editor, Ride route, etc.) använder en bas-kartstil som du kan välja oberoende. Instrumentpanelen sparar **två separata kartstilsinställningar** — en för ljust läge och en för mörkt läge — så att kartan matchar resten av gränssnittet när du byter läge.

- Vid byte av läge (ljust ↔ mörkt) byts kartstilen automatiskt till den du valt för det läget
- Tillgängliga stilar beror på din kartleverantör (MapTiler eller alternativ); vanligtvis: Streets, Satellite, Light, Dark, Outdoors

## Var inställningarna sparas

Alla tre inställningar lagras i din webbläsares **localStorage** under dessa nycklar:

| Inställning       | Lagringsnyckel         |
| ----------------- | ---------------------- |
| Läge              | `app-dark-mode`        |
| Färg              | `app-theme`            |
| Kartstil (ljust)  | `app-map-style-light`  |
| Kartstil (mörkt)  | `app-map-style-dark`   |

Det innebär:

- **Per enhet, per webbläsare** — olika maskin = olika inställningar
- **Ej synkroniserat** med ditt konto — kollegor som använder samma konto ser sina egna teman
- **Rensas vid "Rensa webbinformation"** för denna webbplats
- **Inkognitofönster** startar med standardinställningar

## Tips

- **Börja med Systemläge** — låt OS schemaläggning bestämma; byt till Ljust/Mörkt endast om du har en annan preferens än OS
- **Matcha kartstil med läge** — Satellite är svårt att läsa i mörkt läge; välj istället en "Dark" eller "Streets Dark"-stil
- **Färg påverkar kontrast** — Gul eller Cyan på ljus bakgrund kan vara svårläst; om knappar känns "tunna", prova en mörkare accent (Röd, Blå, Indigo)
- **Ett tema är inte en behörighet** — varje operatör kan välja sitt eget; lagkamrater ser inte dina ändringar
