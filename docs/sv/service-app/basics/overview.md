# Service App — Översikt, inloggning och navigering

Serviceappen är Ridewolfs app för fältoperatörer — vad en tekniker bär med sig på gatan för att byta batterier, låsa upp elscootrar, åtgärda fel och stänga biljetter. Det är en separat produkt från Rider App och från operatörens instrumentpanel: den har egen inloggning och egen navigering.

Efter inloggning öppnas appen direkt på flottans karta (`/battery-swap`) istället för en startsida, eftersom kartan är startpunkten för varje jobb ute i fält.

Vad du kan göra härnäst:

- [Flottakartan och QR-uppslag](../fleet/fleet-map.md) — hitta ett fordon
- [Fordonssida](../fleet/vehicle-controls.md) — kontroller, biljetter, fel, aviseringar
- [Batteribyte](../operations/battery-swap.md) — den tidsstyrda bytessekvensen
- [Hitta scooter](../operations/finder.md) — Bluetooth-radar för de sista metrarna
- [Batchläge](../operations/batch-mode.md) — en kö med fordon att arbeta igenom
- [Back-office-verktyg](../tools/back-office-tools.md) — spela upp, analys, supportköer

## Inloggning

Inloggningsskärmen (`/login`) visas bara för utloggade operatörer — om du redan är inloggad tar appen dig istället till flottakartan.

1. Ange din **arbets-e-post**. Det måste vara en fullständig adress (med snabel-a och punkt), annars avvisas fältet innan något skickas.
2. Ange ditt **lösenord** — minst 6 tecken.
3. Skicka. Endast operatörskonton fungerar här; inloggning för förare avvisas.
4. Din profil laddas (namn, roll, position, avdelning, företag, behörigheter) och appen öppnar flottakartan.

### Inloggning med Google och Apple

**Google**- och **Apple**-knappar visas bara när den inloggningsmetoden är aktiverad för din installation. En saknad knapp är inte en inställning per operatör — ingen i ditt företag kommer att se den.

- **I appen** — att trycka på knappen öppnar leverantörens sida i telefonens webbläsare, och appen väntar på att webbläsaren ska återlämna inloggningen. Väntetiden går ut efter 5 minuter (med en kort eftergift när appen är i förgrunden igen). Om appen stängdes medan webbläsaren var öppen slutförs inloggningen vid kallstart.
- **I en webbläsare** — Google-inloggning öppnas istället i ett popup-fönster.

I båda fallen är resten av flödet samma som vid lösenordsinloggning.

## Navigeringsmenyn

Varje skärm har en menyknapp som öppnar navigeringsmenyn — en panel som skjuts in från vänster. Innehåll, uppifrån och ner:

| Objekt              | Öppnar                | Noteringar                                         |
| ------------------- | --------------------- | ------------------------------------------------- |
| **Din profil**      | `/profile`            | Avatar, namn och e-post                            |
| **Driver App**      | `/battery-swap`       | Flottakartan — "Hantera din flotta i farten"     |
| **Replay Player**   | `/replay-player`      | Spela upp en fordons dag                           |
| **Hitta scooter**   | `/finder`             | "Lokalisera en scooter via Bluetooth"            |
| **Rebalansering**   | `/rebalancing`        | Endast ägare, inaktiverad, visar en **Snart**-märkning |
| **Support**         | `/support/tickets`    | Endast ägare                                      |
| **Konversationer**  | `/support/dialogs`    | Endast ägare                                      |
| **Parkeringsbevis** | `/support/park-proofs`| Endast ägare                                      |
| **Analys**          | `/analytics`          | Endast ägare                                      |

Tre ytterligare kontroller finns i en fast fot längst ner under den scrollbara listan:

- **Inställningar** — öppnar Appinställningar-menyn (se nedan)
- **Kartinställningar** — öppnar kartinställningspanelen, beskriven i [Flottakartan](../fleet/fleet-map.md#kartinställningar)
- **Logga ut** — rödmarkerad

Två etikettvanor är värda att memorera eftersom de orsakar flest "Jag hittar inte"-frågor: flottakartan listas som **Driver App**, inte "Battery Swap", och Bluetooth-radarn listas som **Hitta scooter**, inte "Finder". Varje objekt har också en enradig beskrivning under sin etikett.

De åtta navigeringsobjekten är en platt lista, inte grupperade — **Support**, **Konversationer** och **Parkeringsbevis** är jämlika även om deras rutter alla ligger under `/support`. Det objekt som motsvarar din aktuella skärm får en markerad bakgrund.

Två regler förklarar de flesta "menyn ser annorlunda ut på min telefon"-rapporter:

- **Objekt endast för ägare är helt dolda** för andra operatörer — de är inte nedtonade, så det finns inget att trycka på och inget att fråga om.
- **Inaktiverade objekt visar en Snart-märkning** där en pil normalt skulle finnas.

## Profilsidan

Öppna `/profile` från menyns profilknapp.

- **Rubrik** — en stor avatar (dina initialer när det inte finns något foto) med en kameraknapp för att ladda upp en bild. Endast bilder, max 5 MB. En statusmärkning sitter bredvid, plus en ägarmärkning för ägare.
- **Konto** — roll, avdelning, position, telefon, antal behörigheter, medlemsdatum och ditt användar-ID med en kopieringsknapp (användbar när support ber om det).
- **Arbetsytor** — om du tillhör mer än ett företag kan du byta här. Appen laddas om under det företag du väljer.
- **Säkerhet** — **App-lås**, **Byt PIN**, **Byt lösenord**, **Aktiva sessioner**.
- **Mer** — **Utseende & språk**, som öppnar samma Appinställningar-meny som menyns **Inställningar**.
- **Logga ut** längst ner.

### App-lås

**App-lås** finns bara i den installerade appen, så avsnittet saknas i en webbläsare. Att aktivera det startar en kort guide som registrerar en PIN-kod och din enhets biometriska data. När det är registrerat använder du **Byt PIN** för att ändra koden.

### Byt lösenord

1. Öppna **Byt lösenord** från säkerhetsavsnittet.
2. Ange ditt nuvarande lösenord, sedan det nya två gånger.
3. Skicka.

Alla tre fälten kräver minst 8 tecken, det nya lösenordet måste skilja sig från det nuvarande och bekräftelsen måste stämma överens. Dialogrutan rensar sina fält och felmeddelanden varje gång den öppnas och stängs, så inget du skrev sparas på en delad telefon.

### Aktiva sessioner

Sessioner grupperas efter webbläsare, operativsystem och enhetstillverkare. Varje grupp visar:

- En räknebricka
- Platsen (land och IP-adress)
- Hur länge sedan den var aktiv senast
- En **nuvarande enhet**-bricka på den du använder

**Återkalla** finns på varje grupp utom den nuvarande enheten. **Logga ut andra enheter** återkallar alla andra sessioner på en gång — det snabbaste svaret när en telefon är förlorad.

## Inställningspanel för appen

Ett bottenark, öppnat från panelens **Inställningar**-objekt eller profilens **Utseende & Språk**-knapp. Varje kontroll tillämpas omedelbart; det finns ingen Spara-knapp.

| Inställning      | Alternativ                                                 |
| ---------------- | ---------------------------------------------------------- |
| **Tema**         | Ljust, Mörkt, System                                       |
| **Kartstil**     | Standard, Gata, Satellit, 3D, Navigation, Platt            |
| **Offlinekartor**| Ladda ner kartan runt din nuvarande plats för offlineanvändning |
| **Språk**        | Auto, Engelska, Rumänska, Ryska                            |
| **Min markör**   | Ett rutnät med 6 ikoner för hur din egen position visas    |

**Offlinekartor** laddar ner ett område runt där du är nu och håller det cachelagrat. Under nedladdningen ser du en räknare för nedladdade kakel och en **Avbryt**-knapp. Att stänga av inställningen avbryter pågående nedladdning och rensar det cachelagrade området.

Kartans utseende för fordon (markörer, överlägg, klustring, uppdateringsfrekvens) finns i det separata **Kartinställningar**-arket — se [Fleet map](../fleet/fleet-map.md#kartinställningar).

## Logga ut

**Logga ut** finns i navigationspanelen och återigen längst ner på profilsidan. Det stänger av App Lock, loggar ut dig och återvänder till inloggningsskärmen med din session rensad från enheten.

## Vanliga problem

| Symptom                                         | Orsak                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Ingen **Google**- eller **Apple**-knapp         | Den inloggningsmetoden är inte aktiverad för din installation           |
| En menypost som en kollega har saknas för dig   | Den är endast för ägare                                                 |
| Ett objekt öppnas inte och visar **Soon**       | Det är medvetet inaktiverat för tillfället                             |
| Ingen **App Lock**-sektion på profilsidan       | Du använder webbläsarversionen; App Lock kräver den installerade appen  |
| Inloggning nekas innan något laddas             | E-postformatet eller det 6-teckniga lösenordets minimikrav misslyckades på enheten |
| Menyetiketter stämmer inte överens med vad du förväntade dig | Flottakartan är **Driver App**; Bluetooth-radarn är **Find Scooter** |
