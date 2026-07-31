# Roller

Sidan Roller (`/settings/roles`) är där du definierar **vad operatörer kan göra** i instrumentpanelen. En roll är en namngiven samling behörigheter; varje operatör har exakt en roll; behörigheter avgör vilka sidor de ser och vilka åtgärder de kan utföra.

Kombinera denna sida med [Operators](operators.md) — Operators tilldelar roller till personer, Roller definierar vad varje roll faktiskt kan göra.

Behörighet krävs: **Roller** (`d4e5f6`).

## Hur behörigheter fungerar

Varje sida och åtgärd i instrumentpanelen är skyddad av ett **behörighets-ID** (t.ex. `k7m8n9` för Fordon, `e4f5h6` för Kunder). En roll är i princip en checklista över dessa behörighets-ID:n:

- En operatör kan se en sida endast om deras roll har sidans behörighet
- En radåtgärd (Redigera, Ta bort, etc.) är dold när rollen saknar motsvarande underbehörighet
- Behörigheter utvärderas **per förfrågan** — ändra en roll och operatören ser ändringen vid nästa sidladdning (eller tidigare)

Det finns **ingen arvsmekanism** mellan roller — varje roll är oberoende. Roller med högre förtroende har helt enkelt en längre lista med behörigheter.

## Standardroller vs anpassade roller

Roller finns i två varianter:

| Typ         | Redigerbar | Syfte                                                                   |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| **Standard**| Nej        | Medföljer plattformen (t.ex. Ägare, Admin). Garanti för en säker baslinje |
| **Anpassad**| Ja         | Skapas av dig — passar din teamstruktur                                |

Standardrollerna **Ägare / Admin** kan inte redigeras eller tas bort — de är säkerhetsnätet. Anpassade roller är där du finjusterar behörigheter för att matcha verkliga ansvarsområden.

## Filter

| Filter | Typ       | Noteringar                          |
| ------ | --------- | ---------------------------------- |
| Sök    | Text      | Söker i rollnamn och beskrivning  |
| Status | Dropdown  | `Aktiv` / `Inaktiv` (eller `Alla`) |

## Kolumner

| Kolumn          | Sorterbar? | Innehåll                                                                    |
| --------------- | ---------- | -------------------------------------------------------------------------- |
| **Rollnamn**    | ✓          | Rollens etikett                                                             |
| **Beskrivning** | —          | Kort text som förklarar vad rollen är till för                             |
| **Typ**         | —          | Standard / Anpassad tagg                                                     |
| **Behörigheter**| —          | Antal beviljade behörigheter (t.ex. "23 / 84")                            |
| **Förtroendescore** | ✓       | Numeriskt värde som visar hur mycket rollen kan göra (högre = mer kraftfull) |
| **Skapad**      | ✓          | När rollen skapades                                                        |

### Förtroendescore

Förtroendescore är en ungefärlig numerisk indikator på "hur farligt detta rollset är" — används för sortering och visuella ledtrådar. En roll med ta bort + massuppdatering + behörighetshantering har högre förtroendescore än en roll med endast visningsbehörighet. Det finns ingen fast skala; behandla det som ett relativt mått inom din egen rollista.

## Radåtgärder

En meny med tre punkter per rad.

| Åtgärd           | Behörighet | Vad den gör                                                                                      |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| **Visa detaljer** | —          | Öppna rollens detaljsida med full behörighetsöversikt                                            |
| **Redigera**     | `edit`     | Öppna redigeringsformuläret (inaktiverat med toast för Standardroller)                            |
| **Ta bort**      | `delete`   | Mjukborttagning av rollen (med bekräftelse; endast Anpassade roller; endast om ingen operatör har den) |

Om en roll används kommer systemet att neka Ta bort och visa hur många operatörer som fortfarande har den — tilldela om dem först.

## Skapa / Redigera formulär

Rollformuläret visar varje behörighet grupperad efter domän (Verksamhet, Support, Analys, Inställningar, etc.) med kryssrutor.

Viktiga fält:

- **Namn** (obligatoriskt, unikt)
- **Beskrivning** (valfritt men rekommenderas)
- **Status** (Aktiv / Inaktiv)
- **Behörighetsträd** — sidnivå och underbehörigheter, grupperade efter domän

När du stänger av en överordnad sidbehörighet stängs alla dess underbehörigheter av (operatören förlorar sidan helt). Att slå på en sidbehörighet ger som standard endast visningsbehörighet — du väljer sedan individuellt att aktivera _skapa_, _redigera_, _ta bort_ etc. underbehörigheter.

En liten **Förtroendescore**-indikator uppdateras när du kryssar i rutor — användbar för att dubbelkolla mot liknande roller.

## Rollens detaljsida

Att klicka på en rad öppnar rollens detaljsida som visar:

- Namn, beskrivning, typ, status
- Förtroendescore
- Fullständig behörighetslista (endast läsning, grupperad efter domän)
- Aktivitetslogg: när rollen skapades, senast redigerades, av vem
- Lista över operatörer som för närvarande har rollen (med länkar till deras profiler)

## Typiska arbetsflöden

- **Definiera ett nytt team** — `+ Skapa` → namn (t.ex. "Fältteamledare") → kryssa i de behörigheter de behöver → Spara → tilldela rollen till relevanta [operatörer](operators.md)
- **Skärpa en befintlig roll** — hitta rollen i listan → Redigera → avmarkera behörigheter du inte längre vill ha → Spara (operatörer med denna roll förlorar åtkomst vid nästa förfrågan)
- **Främja en teammedlem** — gå till [Operators](operators.md) → Redigera → ändra Roll → Spara (görs inte från denna sida)
- **Granska vem som kan ta bort fordon** — öppna denna lista → sortera efter Förtroendescore → gå igenom varje rolls Redigera / Ta bort underbehörigheter för Fordon
- **Avveckla en roll** — se till att ingen operatör har den ([Operators](operators.md) filtrera efter roll) → Ta bort

## Tips

- **Mindre är mer** — börja med endast visning och lägg till specifika åtgärder; motstå frestelsen att kopiera en högre roll och trimma
- **Testa genom att impersonera** (där det stöds) — innan du distribuerar en roll, logga in som en testoperatör med rollen och prova arbetsflödena
- **Standardroller är din reservplan** — Ägare / Admin finns alltid; om du av misstag låser ute dig själv från en Anpassad roll kan en Admin återställa åtkomsten
- **Trust score är en ledtråd, inte en regel** — två roller med samma trust score kan göra väldigt olika saker; kontrollera alltid den faktiska behörighetsträdet
- **Behörigheter utvärderas på serversidan** — att stänga av dem i rollen tar inte bort operatörens nuvarande session, men nästa förfrågan nekas
- **Dokumentera varje Anpassad roll** i Beskrivningsfältet — sex månader senare är "Flottachef (läs + redigera, ingen borttagning)" en livräddare
