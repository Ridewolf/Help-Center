# Inventering & Delar

Sidan Inventering & Delar (`/maintenance/inventory`) spårar **reservdelslagret bakom din underhållsverksamhet** — filter, bromsbelägg, batterier, karossdelar — med lagernivåer, beställningströsklar och värdering. Den delar **Underhållsinsiktpanelen** med [Underhållsuppgifter](tasks.md) och [Underhållsautomatisering](automation.md).

Du hittar den i sidomenyn under **Underhåll → Inventering**.

> **Observera: hantering av artiklar kommer snart.** Att lägga till och redigera inventarieposter är för närvarande inaktiverat ("kommer snart"). Det som är live idag är insiktspanelens siffror — **totalt antal artiklar, lågt lager, slut i lager, totalt värde** — över ett fast 30-dagarsfönster.

## Vad Insiktspanelen visar

- **Totalt antal artiklar** — hur många olika inventarieposter som finns
- **Lågt lager** — artiklar på eller under sin minimumnivå
- **Slut i lager** — artiklar utan tillgängligt lager; allt över noll gör rutan **farligt** röd
- **Totalt värde** — värdering av lager i lager

Samma panel visas på alla tre Underhållssidor (se [Underhållsuppgifter](tasks.md) för fullständig uppdelning av dess fyra block), och att växla mellan sidor är omedelbart.

## Inventariemodellen

Artikelns form är redan definierad, så du kan planera din katalogstruktur innan funktionen lanseras:

- **SKU**, **etikett**, **beskrivning**
- **Kategori** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Lager** — i lager, reserverat, tillgängligt, minimum, maximum, plus en flagga för behov av påfyllning
- **Under transport** — inkommande inköp och överföringar
- **Kostnad** — genomsnitt, senaste inköpspris, värdering
- **Skick** — `new`, `used`, `refurbished`, `for-repair` — plus lagrings**fack**
- **Garantitidens utgång**, **utgångsdatum**, **status**, **taggar**

## Planerat flöde för skapande

Skapande av artikel kommer att vara en trestegsguide:

1. **Artikel** — SKU, namn, kategori, beskrivning
2. **Lager** — kvantitet, minimumnivå, pris
3. **Granska** — bekräfta och skicka

## Vanliga frågor

- **Jag kan inte lägga till en artikel — behörigheter?** Nej, formuläret är inaktiverat för alla tills funktionen lanseras. Förväntat.
- **Kan jag hantera lager per lagringsfack?** Fack finns i datamodellen, men det finns ännu ingen hanteringsskärm på facknivå.
- **Siffrorna reagerar inte på några filter.** Insiktspanelens 30-dagarsfönster är fast; det finns inga filter att tillämpa.

## Tips

- **Följ "slut i lager" först** — det är måttet som gör rutan farligt röd och det som blockerar reparationer.
- **Påfyllningslogik kommer att baseras på minimumnivån** — när du designar din katalog, sätt realistiska minimivärden per artikel; flaggan för behov av påfyllning härleds från dem.
