# Sessioner — Enheter inloggade på kontot

Skärmen **Sessioner** (`/settings/sessions`) listar varje plats där en användares konto för närvarande är inloggat och låter dem logga ut från dessa platser. Det är skärmen att gå till när en användare misstänker att någon annan har tillgång till deras konto.

Två ingångspunkter, båda leder hit:

- **Profil → Hantera sessioner**
- **Inställningar → Sekretesskort → Hantera sessioner**

## Hur listan är organiserad

Sessioner är **grupperade efter enhet** — webbläsare och version, operativsystem och version, enhetstyp, tillverkare och modell — så att samma telefon visas en gång istället för dussintals gånger.

Grupperna sorteras medvetet:

1. Användarens nuvarande enhet först
2. Sedan efter status: **aktiv**, sedan **inaktiv**, sedan **gammal**
3. Sedan efter senaste aktivitet, nyast först

Varje grupp kan fällas ut eller in. Att fälla ut visar varje enskild session som tillhör den enheten.

## Läsa en enhetsgrupp

| Vad du ser                          | Betydelse                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------- |
| **Enhetsnamn**                      | Tillverkare och modell när det är känt, annars operativsystem och dess version |
| Enhetstypikon                      | Telefon, surfplatta eller skärm                                              |
| **Webbläsarnamn**                  | Webbläsaren och versionen bakom sessionen                                  |
| **Sessionsstatus**-märke           | Se tabellen nedan                                                         |
| **Senaste aktivitet**              | Relativ tid — "just nu", N minuter / timmar / dagar sedan, och ett absolut datum när det är äldre än en vecka |
| **Antal sessioner**                | Hur många sessioner den enheten har                                        |
| **Plats**                         | Stad, land och IP-adress                                                   |
| **Skapad**                        | När den sessionen startade                                                 |
| **Nuvarande enhet** / **Nuvarande session** | Markerad märkning på den enhet och session som användaren använder just nu |

### Statusmärken

| Märke        | Betydelse                              |
| ------------ | ------------------------------------ |
| **aktiv**   | Senaste aktivitet för mindre än en timme sedan  |
| **inaktiv** | Senaste aktivitet för mindre än 24 timmar sedan |
| **gammal**      | Senaste aktivitet för 24 timmar eller mer sedan   |

Märket mäter **endast hur nyligen** aktiviteten skett — det säger inte om en session fortfarande är giltig. Ett "gammal"-märke betyder inte att sessionen har gått ut.

## Logga ut en session

Den nuvarande sessionen har ingen borttagningskontroll — avsiktligt, den kan inte tas bort från denna lista. Alla andra sessioner kan tas bort:

1. Fäll ut enhetsgruppen
2. Tryck på **papperskorgen** på sessionen
3. Bekräfta i dialogrutan

Listan laddas om och sessionen är borta.

## Massåtgärder

| Åtgärd                     | Vad den gör                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Logga ut andra sessioner**  | Loggar ut alla sessioner utom den på enheten som användaren håller i handen. Detta är rätt åtgärd när en användare misstänker att någon annan har tillgång |
| **Logga ut alla sessioner**    | Loggar ut allt **inklusive den nuvarande enheten**, så användaren skickas till inloggningsskärmen och måste logga in igen. Markerad som destruktiv av den anledningen |
| **Återkalla enhet**          | Erbjuds på en utökad enhetsgrupp som inte är den nuvarande enheten — loggar ut alla sessioner på den enheten      |

Medan en utloggningsbegäran pågår är knapparna inaktiverade. Ett fel visar ett kort felmeddelande; en framgång visar en bekräftelse och laddar om listan.

## Typiska arbetsflöden

- **Användaren tror att någon annan är inloggad på deras konto** — **Logga ut andra sessioner**, ändra sedan lösenordet från **Profil**. Observera att en lyckad lösenordsändring också loggar ut användaren, så de måste logga in igen efteråt ([Profil](profile.md))
- **En bortglömd inloggning på en lånad telefon** — fäll ut den enhetsgruppen, **Återkalla enhet**
- **Börja om helt rent överallt** — **Logga ut alla sessioner**, logga sedan in igen ([Logga in](registration-login.md))

## FAQ

- **Varför kan användaren inte ta bort sin nuvarande session?** Ingen borttagningskontroll visas för den. För att avsluta den nuvarande sessionen, använd **Logga ut alla sessioner** eller den vanliga **Logga ut**-knappen på Profil.
- **Vad betyder "aktiv" egentligen?** Aktivitet inom den senaste timmen — inget mer.
- **Varför visar en telefon flera sessioner?** Sessioner skapas per inloggning. Skärmen grupperar dem under en enhet och visar antalet.
- **Knappen Hantera sessioner är gråmarkerad.** Kontot har en väntande radering, vilket inaktiverar sessionhantering tillsammans med profilredigering — se [Profil](profile.md).

## Relaterat

- [Profil](profile.md) — lösenordsändring, utloggning, kontoradering
- [Inställningar](../help/settings.md) — Sekretesskortet som också länkar hit
- [Sekretess](privacy.md) — sekretesspolicy och säkerhetsriktlinjer
