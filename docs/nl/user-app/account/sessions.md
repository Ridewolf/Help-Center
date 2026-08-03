# Sessies — Apparaten ingelogd op het account

Het scherm **Sessies** (`/settings/sessions`) toont elke plek waar het account van een rijder momenteel is ingelogd en stelt hen in staat om die plekken uit te loggen. Dit is het scherm om te openen wanneer een rijder vermoedt dat iemand anders toegang heeft tot hun account.

Twee toegangspunten, beide leiden hiernaartoe:

- **Profiel → Sessies beheren**
- **Instellingen → Privacykaart → Sessies beheren**

## Hoe de lijst is georganiseerd

Sessies worden **gegroepeerd per apparaat** — browser en versie, besturingssysteem en versie, apparaattype, leverancier en model — zodat dezelfde telefoon één keer verschijnt in plaats van een dozijn keer.

Groepen zijn bewust gesorteerd:

1. Het huidige apparaat van de rijder eerst
2. Daarna op status: **actief**, dan **inactief**, dan **oud**
3. Daarna op laatste activiteit, nieuwste eerst

Elke groep is inklapbaar. Uitklappen toont elke individuele sessie die bij dat apparaat hoort.

## Een apparaatsgroep lezen

| Wat je ziet                         | Betekenis                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------ |
| **Apparaatlabel**                  | Leverancier en model indien bekend, anders het besturingssysteem en versie |
| Apparaattype-icoon                 | Telefoon, tablet of monitor                                              |
| **Browserlabel**                   | De browser en versie achter de sessie                                   |
| **Sessiestatus** badge             | Zie de onderstaande tabel                                                |
| **Laatste activiteit**             | Relatieve tijd — "zojuist", N minuten / uren / dagen geleden, en een absolute datum zodra het ouder is dan een week |
| **Aantal sessies**                 | Hoeveel sessies dat apparaat heeft                                      |
| **Locatie**                       | Stad, land en IP-adres                                                  |
| **Aangemaakt**                    | Wanneer die sessie is gestart                                           |
| **Huidig apparaat** / **Huidige sessie** | Gemarkeerde badge op het apparaat en de sessie die de rijder nu gebruikt |

### Statusbadges

| Badge        | Betekenis                              |
| ------------ | ------------------------------------ |
| **actief**   | Laatste activiteit minder dan een uur geleden  |
| **inactief** | Laatste activiteit minder dan 24 uur geleden |
| **oud**      | Laatste activiteit 24 uur of langer geleden   |

De badge meet alleen de **recentheid** — het zegt niet of een sessie nog geldig is. Een "oude" badge betekent niet dat de sessie is verlopen.

## Uitloggen van één sessie

De huidige sessie heeft geen verwijderknop — dit is opzettelijk, deze kan niet uit deze lijst worden verwijderd. Elke andere sessie kan dat wel:

1. Vouw de apparaatsgroep uit
2. Tik op het **prullenbak**-icoon bij de sessie
3. Bevestig in het dialoogvenster

De lijst wordt vernieuwd en de sessie is verdwenen.

## Bulkacties

| Actie                      | Wat het doet                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Andere sessies uitloggen**  | Logt elke sessie uit behalve die op het apparaat in de hand van de rijder. Dit is de juiste actie als een rijder vermoedt dat iemand anders toegang heeft |
| **Alle sessies uitloggen**    | Logt alles uit **inclusief het huidige apparaat**, zodat de rijder terugkeert naar het inlogscherm en opnieuw moet inloggen. Wordt om die reden als destructief gestyled |
| **Apparaat intrekken**          | Wordt aangeboden bij een uitgeklapte apparaatsgroep die niet het huidige apparaat is — logt elke sessie op dat apparaat uit      |

Terwijl een uitlogverzoek wordt uitgevoerd, zijn de knoppen uitgeschakeld. Een fout toont een korte foutmelding; een succes toont een bevestiging en vernieuwt de lijst.

## Typische workflows

- **De rijder denkt dat iemand anders in hun account zit** — **Andere sessies uitloggen**, daarna het wachtwoord wijzigen via **Profiel**. Let op dat een succesvolle wachtwoordwijziging de rijder ook uitlogt, dus die zal daarna opnieuw inloggen ([Profiel](profile.md))
- **Een vergeten aanmelding op een geleende telefoon** — vouw die apparaatsgroep uit, **Apparaat intrekken**
- **Overal opnieuw beginnen** — **Alle sessies uitloggen**, daarna opnieuw inloggen ([Inloggen](registration-login.md))

## FAQ

- **Waarom kan de rijder hun huidige sessie niet verwijderen?** Er wordt geen verwijderknop voor getoond. Om de huidige sessie te beëindigen, gebruik **Alle sessies uitloggen** of de normale **Uitloggen**-knop in Profiel.
- **Wat betekent "actief" precies?** Activiteit binnen het laatste uur — niet meer dan dat.
- **Waarom toont één telefoon meerdere sessies?** Sessies worden per aanmelding aangemaakt. Het scherm groepeert ze onder één apparaat en toont het aantal.
- **De knop Sessies beheren is grijs.** Het account staat gepland voor verwijdering, wat sessiebeheer en profielbewerking uitschakelt — zie [Profiel](profile.md).

## Gerelateerd

- [Profiel](profile.md) — wachtwoord wijzigen, uitloggen, account verwijderen
- [Instellingen](../help/settings.md) — de Privacykaart die ook hiernaar linkt
- [Privacy](privacy.md) — privacybeleid en veiligheidsrichtlijnen
