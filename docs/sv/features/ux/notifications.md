# Aviseringar

Aviseringar visar livehändelser från hela instrumentpanelen — nya biljetter, IoT-varningar, betalningsaktivitet, fordonsproblem, systemmeddelanden. De kommer via en WebSocket-anslutning, så uppdateringar sker i realtid utan att sidan laddas om.

## Klockan i toppfältet

**Klockikonen** i toppfältet är din ingångspunkt. En röd märkesymbol visar antalet olästa aviseringar.

- Ingen märkesymbol → inget oläst
- Sifframärke → så många olästa
- `99+` → fler än 99 olästa

Klicka på klockan för att öppna **Aviseringspanelen** som en sidopanel till höger.

## Inuti panelen

### Rubrik

- **Titel** "Aviseringar"
- **Antal olästa** visas som antingen "N olästa" eller "Allt uppdaterat" när det inte finns några
- **Snabbval för inställningar** (växel-ikon) öppnar den globala sidan för aviseringar

### Växla för webbläsaraviseringar

Om din webbläsare stödjer systemaviseringar visas en växlingsknapp under rubriken:

- **Av** → aviseringar visas endast i instrumentpanelen
- **På** → webbläsaren visar en systemavisering när något nytt kommer, även när fliken är i bakgrunden
- Första gången du aktiverar frågar webbläsaren om tillstånd

Om du tidigare nekade tillstånd är växeln inaktiverad och en gul notis visas med instruktioner för att aktivera det igen i webbläsarens webbplatsinställningar.

### Lista

Aviseringar listas med de nyaste först. Varje objekt visar:

- **Kategoriikon** — en liten ikon färgad efter prioriteringsfärg (se nedan)
- **Titel** — en kort rubrik
- **Innehåll** — händelsebeskrivning
- **Tid sedan** — t.ex. "2 min sedan"
- **Klicka** på objektet för att hoppa till relaterad sida (relevant biljett, fordon, betalning osv.)

### Tomt läge

När det inte finns något att visa visar panelen ett vänligt meddelande och en knapp för att öppna inställningssidan.

## Kategorier och prioritet

Varje avisering har en **kategori** (styr ikonen) och en **prioritet** (styr färgen).

### Kategorier

| Kategori    | Ikon           | Typiska händelser                          |
| ----------- | -------------- | ------------------------------------------- |
| Support     | 🔔 Klocka      | Nya biljetter, biljett-svar                 |
| Underhåll   | 🔧 Skiftnyckel | Tilldelade servicuppgifter, automatiseringsutlösare |
| Fordon      | ✨ Gnistor     | Statusändringar, avvikelser                  |
| Kund        | 👥 Användare   | Nya registreringar, kontoflaggor             |
| Betalning   | 💳 Kort        | Transaktioner, återbetalningar, webhook-händelser |
| IoT         | 🖥️ Cpu         | Enhet offline, låg batterinivå, sensorvarningar |
| System      | 🛎️ Klockringning | Systemmeddelanden, driftsättningar           |
| Säkerhet    | 🛡️ Sköldvarning | Autentiseringshändelser, misstänkt aktivitet |

### Prioriteringsfärger

| Prioritet | Färg   | Användning                                         |
| -------- | ------ | ------------------------------------------------- |
| Kritisk  | Röd    | Kräver åtgärd nu (fordonsavbrott, säkerhetsvarning) |
| Hög      | Orange | Viktigt men inte blockerande                       |
| Medel    | Bärnsten | Rutinkontroll                                    |
| Låg      | Blå    | Informationsmeddelande                             |

## Inställningar (djupare konfiguration)

Klockpanelen täcker grunderna. För full konfiguration, öppna **Inställningar → Aviseringar & Notiser** (eller klicka på kugghjulet i panelrubriken):

- **Ljud** — välj ljud per prioritet eller stäng av ljud
- **Leverantörer** — vidarebefordra aviseringar till externa kanaler (Telegram osv.) konfigurerat per chatt/mottagare
- **Filtrering** — vilka kategorier du vill få aviseringar om
- **Tystnadsscheman** — tysta tider (där det stöds)

## Hur tillstånd fungerar

Webbläsaraviseringar kräver ett engångstillstånd från webbläsaren. Växeln i panelen triggar webbläsarens fråga första gången du aktiverar den.

- **Beviljat** → växeln fungerar; du får systemaviseringar medan instrumentpanelen är öppen i någon flik
- **Nekat** → växeln är låst av; du måste ändra tillståndet i webbläsarens webbplatsinställningar, sedan komma tillbaka och slå på växeln
- **Ej stöd** → vissa inbäddade webbläsare och äldre versioner kan inte visa systemaviseringar; växeln är dold

Att bevilja webbläsartillstånd ändrar ingenting i instrumentpanelen — panelen i appen fungerar oavsett.

## Tips

- **Använd webbläsaraviseringar i en enda flik** — att öppna instrumentpanelen i flera flikar kan multiplicera systemaviseringarna
- **Ljud är lokala** — de spelas bara i fliken där du är ansluten; stäng av ljud på delade datorer
- **Klicka för att gå vidare är snabbast** — klick på en avisering tar dig direkt till sidan som utlöste den; snabbare än att navigera manuellt
- **Frånkopplad instrumentpanel** — om WebSocket-anslutningen bryts blir avatarens lilla statusprick röd. Aviseringar återupptas så fort anslutningen är tillbaka; du förlorar inget under tiden
- **Kritiska först** — när många aviseringar kommer samtidigt, skanna färger före titlar: röda ikoner hamnar överst i kön
