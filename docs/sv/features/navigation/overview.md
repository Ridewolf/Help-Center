# Navigering

Instrumentpanelen navigerar genom tre huvudsakliga ytor: **sidofältet** till vänster, **topplisten** överst och **brödsmulan** inuti topplisten. De fungerar konsekvent på varje sida.

## Sidofält

Sidofältet är din primära navigering. Varje objekt är antingen en enskild sida (Instrumentpanel, Resor, Fordon, Kunder, Hjälp) eller en **grupp** som expanderar till underobjekt (Betalningar, Support, Analys, Inställningar, Appar).

### Expandera och kollapsa

- **Klicka på en grupp** (t.ex. _Support_) för att expandera den; klicka igen för att kollapsa.
- **Växla hela sidofältet** med `⌘ B` (macOS) eller `Ctrl B` (Windows/Linux). Kollapsat läge visar endast ikoner — hovra över en ikon för att se dess etikett som en verktygstips.
- Sidofältets läge sparas över sidladdningar (cookie-baserat).

### Aktivt läge

Den aktuella sektionen markeras med accentfärgen (röd som standard). När du är inne i en grupp förblir grupprubriken också markerad så att du alltid vet var du är.

### Räkningar och märken

Vissa objekt visar en **märke** med ett nummer — detta är olästa/väntande räkningar hämtade live från aviseringar:

- _Support → Biljetter_ — väntande biljetter tilldelade dig
- _Support → Parkeringsbevis_ — väntande bevis som väntar på granskning
- _Resor_, _Fordon_, _Kunder_ — räkningar när det är relevant

### Behörigheter

Du ser bara objekt som din **roll och behörigheter** tillåter. Om en sektion saknas för dig som en annan kollega har — är det en behörighetsgrind, inte en bugg. Fråga en administratör om du borde ha åtkomst.

## Topplist

Topplisten visas på varje sida. På skrivbord har den brödsmulan till vänster och fem kontroller till höger.

### Brödsmula (vänster)

Brödsmulan är din väg tillbaka genom hierarkin:

`Hem → Fordon → RW-001`

- **Klicka på valfri del** för att hoppa tillbaka till den nivån (sista delen är aktuell sida och går inte att klicka på).
- Brödsmulan är alltid synlig — det är det säkraste sättet att backa ut från en djup sida.

### Kontroller (höger, skrivbord)

I ordning, från vänster till höger:

| Ikon | Vad den gör                                                                             |
| ---- | --------------------------------------------------------------------------------------- |
| ✨   | **AI Chat** — öppnar en chattruta med en assistent som svarar på frågor om instrumentpanelen |
| ?    | **Hjälp** — öppnar denna kunskapsbas i en sidopanel, kontextuell till aktuell sida       |
| 🔔   | **Aviseringar** — senaste systemhändelser och varningar (rött märke visar olästa)         |
| 👤   | **Profil** — inställningar, lösenord, logga ut, temakontroller (din avatar)               |

### Mobil

På skärmar smalare än 769 px kollapsar topplisten:

- Sidofältet kollapsar till en hamburgermeny längst till vänster
- Brödsmulan sitter bredvid hamburgermenyn och scrollar horisontellt om den är lång
- De fem kontrollerna blir fyra knappar till höger (AI, Hjälp, Aviseringar, Avatar) — samma funktioner, större tryckyta

## Profilsida

Klicka på din avatar för att öppna en panel som skjuts in från höger med:

- **Profil** — din personliga information
- **Byt lösenord**
- **Inställningar** — preferenser (språk, tema, aviseringar)
- **Hjälp** — hoppar till hjälpsidan
- **Logga ut** (röd)
- Växlare för tema/språk/kartstil längst ner

## Tips

- **Hovra över sidofältsobjekt** när det är kollapsat — verktygstips visas omedelbart, utan fördröjning
- **Använd brödsmulan** för att backa ut från djupa sidor istället för webbläsarens bakåtknapp — det går snabbare och undviker omladdning
- **`⌘/Ctrl + B`** är ett snabbt sätt att ge dig mer horisontellt utrymme på dataintensiva sidor (tabeller, kartor)
- **Hjälp (?)** i topplisten är **sidespecifik** — den försöker öppna artikeln som är mest relevant för var du är; om det inte finns någon än, faller den tillbaka på sök
