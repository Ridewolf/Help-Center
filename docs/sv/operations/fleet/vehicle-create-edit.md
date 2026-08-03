# Fordon — Skapa & Redigera

Två URL:er delar samma formulärlayout:

- **Skapa** — `/vehicles/create` — registrerar en ny fysisk enhet
- **Redigera** — `/vehicles/:id/edit` — uppdaterar metadata för ett befintligt fordon

Båda nås från [Fordonslistan](vehicles.md) (knappen **+ Skapa** uppe till höger) eller från [Fordonsdetalj](vehicle-detail.md) (**Åtgärder → Redigera fordon**).

Behörigheter:

- **Skapa** — `Vehicles` (`k7m8n9`) + skapa-relaterad underbehörighet
- **Redigera** — `Vehicles` (`k7m8n9`) + underbehörigheten `edit`

## Layout

Sidan delas i två kolumner på desktop, staplas på mobil:

- **Vänster (8/12)** — själva formuläret, inuti ett _Fordonsinformation_-kort
- **Höger (4/12)** — **Fältguide**-sidopanel med kontextuell hjälp för det fält som är i fokus, plus en liveförhandsvisning av det du fyllt i

## Fält

Totalt fem fält. Obligatoriska fält markeras med en röd asterisk (`*`).

### 1. Etikett (obligatorisk)

Den människoläsbara koden som trycks på fordonets klistermärke (t.ex. _RW-001_).

- Måste vara unik i hela din flotta
- Fritt textfält — typisk konvention är _PREFIX-NNN_ (ditt företags prefix + löpnummer)
- Klicka på **Generera** (glittrande ikon) för att autofylla — systemet läser ditt företags prefix och befintliga etiketter, beräknar nästa sekvens och skriver in den i fältet. En laddningsindikator visas medan det hämtar data.

### 2. Status (obligatorisk)

Fordonets initiala / aktuella status. Tolv alternativ — samma lista som i [Fordonslistans filter](vehicles.md#statusreferens).

Vanliga startvärden vid skapande:

- **Inte redo** — skapat men ännu inte släppt till användare (standard- och säkert val)
- **Tillgänglig** — redo att hyras ut omedelbart (använd endast efter att IoT och parkering verifierats)
- **Lagring** — för lager som ännu inte är i tjänst

Vid redigering, ändra status med försiktighet — detta kan ta fordonet ur uthyrningsrotation eller sätta tillbaka det.

### 3. IoT-enhet (valfritt)

IoT-modulen kopplad till detta fordon (mobilboxen som hanterar lås/öppning och rapporterar batteri/GPS).

- Sökbar dropdown — skriv för att filtrera på IMEI eller etikett
- Valfritt — du kan skapa ett fordon utan IoT nu och koppla det senare (i _Redigera_)
- En IoT-enhet kan bara vara kopplad till ett fordon åt gången

Vid redigering är det tillåtet att byta IoT-enhet men det känns oåterkalleligt — den nya enheten börjar rapportera under detta fordon, den gamla kopplas bort. Använd detta när ett kort fysiskt byts ut.

### 4. Fordonsmodell (valfritt)

Modellposten (Inställningar → Fordonsinställningar) som definierar enhetens avgifter, standardinställningar och kategori.

- Sökbar dropdown — skriv för att filtrera på modellens etikett
- Valfritt vid skapande, rekommenderas att sätta så snart du vet modellen — avgifter och beteenden kommer från den
- Att ändra modellen senare uppdaterar aktiva avgifter och regler för beteende — bekräfta med verksamheten innan ändring på en live-enhet

### 5. Taggar (valfritt)

Operatörstillämpade taggar som är knutna till just detta fordon.

- Flera val — välj en eller flera
- Sökbar
- Dessa är _fordonsnivå_-taggar, separata från _modellnivå_-taggar som ärvs från vald Fordonsmodell
- Resor med detta fordon ärver dessa fordonsnivå-taggar vid resans start (se [Resor-listan](../trips/rides.md) för hur taggar ärvs)

## Fältguide sidopanel

Högra kolumnen är en **kontextuell guide**, inte en kopia av formuläret:

- **Liveförhandsvisning** av de värden du skrivit/valt (så att du kan verifiera innan du sparar)
- **Inline-tips** som uppdateras när du fokuserar ett fält — förklarar vad fältet betyder, vanliga fallgropar, standardvärden
- **Autofält** visas: aktuell etikett, statusetikett, IoT-enhetsetikett, modelletikett, antal taggar

Använd den som ett extra par ögon. På bred skärm är den synlig medan du scrollar i formuläret.

## Spara / Tillbaka

- **Tillbaka** (`←`) — kassera osparade ändringar och återgå till föregående sida (listan eller detaljen vid redigering)
- **Spara** — validerar formuläret och skapar / uppdaterar fordonet. En toast bekräftar framgång; fältfel markeras under fältet med ett rött meddelande

Om validering misslyckas (saknad etikett, saknad status, duplicerad etikett) förblir sidan öppen med det felaktiga fältet markerat i rött.

## Skapa vs Redigera — skillnader

| Aspekt             | Skapa                               | Redigera                                                  |
| ------------------ | ---------------------------------- | --------------------------------------------------------- |
| Etikett            | Tomt eller _Generera_              | Förifyllt med aktuell etikett                             |
| Status             | Tomt (du måste välja)              | Förifyllt med aktuell status                              |
| IoT-enhet          | Tomt eller välj från obundna enheter | Förifyllt; byte kopplar bort den tidigare                 |
| Fordonsmodell      | Tomt                              | Förifyllt                                                |
| Taggar             | Tomt                              | Förifyllt med aktuella fordonsnivå-taggar                |
| Efter sparande     | Omdirigerar till det nya fordonets detalj | Stannar på formuläret / omdirigerar till detalj (beroende på flöde) |
| Aktivitetsloggpost | "Fordon skapat av _operatörens namn_" | "Fordon redigerat av _operatörens namn_" med fältnivå-diff |

Båda flöden skriver till fordonets [Åtgärdslogg](vehicle-detail.md#fliken-aktivitet).

## Typiska arbetsflöden

- **Registrera en ny batch** — generera etikett → status _Inte redo_ → koppla IoT → ställ in Modell → spara. När enheten är ute i fält och testad, ändra till _Tillgänglig_
- **Byt ut en trasig IoT-enhet** — redigera → koppla bort / välj ny IoT → spara → vänta på första hjärtslaget (Senaste signalen i detaljvyn)
- **Omkategorisera** — ändra Modell vid migrering av enheter mellan flottor/kategorier
- **Lägg till en tillfällig tagg** — redigera → Taggar → spara (t.ex. "Event 2026-05", "Lånefordon")

## Tips

- **Använd Generera** för etiketter — håller din numrering ordnad och undviker dubbletter
- **Ställ in Modell tidigt** — avgifter hämtas från modellen; en oinställd modell innebär att resor på detta fordon faller tillbaka på prissättningsregler utan modell
- **Ändra inte Status till _Tillgänglig_ förrän du fysiskt verifierat IoT** — användare kan låsa upp fordonet omedelbart
- **Titta på tipsen i Fältguiden** när du är osäker på ett fält — den inbyggda hjälpen är mer aktuell än denna artikel någonsin kan vara
- **Aktivitetsloggen är ditt säkerhetsnät** — varje sparning registreras med operatörens namn och tidsstämpel på [fordonsdetaljen](vehicle-detail.md#fliken-aktivitet)
