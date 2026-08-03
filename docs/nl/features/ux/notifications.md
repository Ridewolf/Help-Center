# Meldingen

Meldingen tonen live gebeurtenissen vanuit het hele dashboard — nieuwe tickets, IoT-meldingen, betalingsactiviteit, voertuigproblemen, systeemberichten. Ze komen binnen via een WebSocket-verbinding, dus updates zijn realtime zonder pagina-herlaad.

## Bel in de bovenbalk

Het **belpictogram** in de bovenbalk is je toegangspunt. Een rood badge toont het aantal ongelezen meldingen.

- Geen badge → niets ongelezen
- Nummerbadge → dat aantal ongelezen
- `99+` → meer dan 99 ongelezen

Klik op de bel om het **Meldingen-paneel** te openen als een zijblad aan de rechterkant.

## Binnen het paneel

### Koptekst

- **Titel** "Meldingen"
- **Aantal ongelezen** weergegeven als "N ongelezen" of "Alles bijgewerkt" als er geen zijn
- **Snelkoppeling Instellingen** (tandwielpictogram) opent de globale meldingeninstellingenpagina

### Browsermeldingen-schakelaar

Als je browser systeemmeldingen ondersteunt, verschijnt er onder de koptekst een schakelaar:

- **Uit** → meldingen alleen binnen het dashboard
- **Aan** → de browser toont een systeemmelding wanneer er iets nieuws binnenkomt, zelfs als het tabblad op de achtergrond staat
- Bij eerste inschakeling vraagt de browser om toestemming

Als je eerder toestemming hebt geweigerd, is de schakelaar uitgeschakeld en verschijnt er een gele melding met instructies om het opnieuw in te schakelen in de browser-site-instellingen.

### Lijst

Meldingen worden nieuwst eerst weergegeven. Elk item toont:

- **Categorie-icoon** — een klein pictogram gekleurd naar prioriteitskleur (zie hieronder)
- **Titel** — een korte kop
- **Inhoud** — de gebeurtenisbeschrijving
- **Tijd geleden** — bijv. "2 min geleden"
- **Klik** op het item om naar de gerelateerde pagina te springen (het relevante ticket, voertuig, betaling, enz.)

### Lege staat

Als er niets te zien is, toont het paneel een vriendelijke boodschap en een knop om de instellingenpagina te openen.

## Categorieën en prioriteit

Elke melding heeft een **categorie** (bepaalt het pictogram) en een **prioriteit** (bepaalt de kleur).

### Categorieën

| Categorie  | Pictogram      | Typische gebeurtenissen                      |
| ----------- | -------------- | ------------------------------------------- |
| Ondersteuning | 🔔 Bel         | Nieuwe tickets, ticketantwoorden             |
| Onderhoud  | 🔧 Moersleutel | Toegewezen servicetaken, automatiseringstriggers |
| Voertuig   | ✨ Sprankels   | Statuswijzigingen, afwijkingen               |
| Klant      | 👥 Gebruikers  | Nieuwe registraties, accountwaarschuwingen   |
| Betaling   | 💳 Kaart       | Transacties, terugbetalingen, webhook-gebeurtenissen |
| IoT        | 🖥️ Cpu         | Apparaat offline, lage batterij, sensorwaarschuwingen |
| Systeem    | 🛎️ BelRing    | Systeemberichten, uitrol                      |
| Beveiliging| 🛡️ SchildAlarm | Authenticatiegebeurtenissen, verdachte activiteit |

### Prioriteitskleuren

| Prioriteit | Kleur  | Gebruik                                             |
| -------- | ------ | ------------------------------------------------- |
| Kritiek  | Rood   | Direct actie nodig (voertuigstoring, beveiligingsalarm) |
| Hoog     | Oranje | Belangrijk maar niet blokkerend                    |
| Middel   | Amber  | Routine aandacht                                   |
| Laag     | Blauw  | Informatief                                        |

## Instellingen (uitgebreide configuratie)

Het belpaneel behandelt de basis. Voor volledige configuratie open je **Instellingen → Meldingen & Notificaties** (of klik op het tandwiel in de paneelkop):

- **Geluiden** — kies een geluid per prioriteit, of zet geluiden uit
- **Providers** — stuur meldingen door naar externe kanalen (Telegram, enz.) geconfigureerd per chat/ontvanger
- **Filteren** — welke categorieën je wilt ontvangen
- **Demptijden** — stille uren (waar ondersteund)

## Hoe toestemming werkt

Browsermeldingen vereisen een eenmalige toestemmingsverlening door de browser. De schakelaar in het paneel activeert de browserprompt bij de eerste keer inschakelen.

- **Toegewezen** → schakelaar werkt; je krijgt systeemmeldingen zolang het dashboard in een tabblad open is
- **Geweigerd** → schakelaar is vergrendeld uit; je moet de toestemming wijzigen in de site-instellingen van je browser, daarna terugkomen en inschakelen
- **Niet ondersteund** → sommige ingebedde browsers en oudere versies kunnen geen systeemmeldingen tonen; de schakelaar is verborgen

Het verlenen van browsertoestemming verandert niets binnen het dashboard — het in-app paneel werkt altijd.

## Tips

- **Gebruik browsermeldingen in één tabblad** — het openen van het dashboard in meerdere tabbladen kan systeemmeldingen vermenigvuldigen
- **Geluiden zijn lokaal** — ze klinken alleen in het tabblad waar je verbonden bent; dem ze op gedeelde computers
- **Klikken is de snelste workflow** — klikken op een melding brengt je direct naar de pagina die het veroorzaakte; sneller dan handmatig navigeren
- **Verbroken dashboardverbinding** — als de WebSocket wegvalt, wordt de kleine statusdot bij de avatar rood. Meldingen hervatten zodra de verbinding terugkomt; je verliest niets tussentijds
- **Kritiek eerst** — bij veel meldingen tegelijk, scan eerst de kleuren voor de titels: rode iconen gaan bovenaan je wachtrij
