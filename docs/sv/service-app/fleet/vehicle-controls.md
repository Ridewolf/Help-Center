# Fordonssida — Kontroller, Biljetter, Fel och Aviseringar

Fordonssidan (`/vehicle/:id`) är fältoperatörens arbetsyta för ett enskilt fordon: live-telemetri högst upp, åtgärdsknappar i mitten och tre köer med saker att åtgärda. Du kommer hit genom att trycka på en markör eller en rad i listan på [flottakartan](fleet-map.md), genom att skanna en QR-kod eller genom att trycka på en rad i [batchläge](../operations/batch-mode.md).

## Vad sidan visar för vilken fordonstyp

När sidan öppnas laddas fordonet, sedan dess modell:

- **Scootrar och cyklar** får hela kontrollsidan som beskrivs här.
- **Bilar** får en status-sida utan fjärrkontroller.

Om modellinformationen inte kan laddas öppnas sidan ändå — den faller tillbaka till scooterns layout istället för att visa en snurrande laddningsikon. Om själva fordonet inte kan laddas visas en felsida med en tillbaka-knapp.

## Flikar

Fyra flikar med en glidande indikator:

| Flik         | Innehåll                                        |
| ----------- | ----------------------------------------------- |
| **Scooter** | Live-telemetri och åtgärdsknappar               |
| **Tickets** | Öppna supportbiljetter som förare rapporterat   |
| **Faults**  | Fel som spåraren rapporterat                     |
| **Alerts**  | Varningar som spåraren rapporterat               |

## Scooter-fliken — telemetri

Högst upp sitter en låsbricka (**grön** = låst, **gul** = olåst) och fordonets statusbricka, följt av dessa rader:

| Rad                 | Hur man läser den                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **QR / etikett**    | Koden på fordonets klistermärke                                                             |
| **Nätverk**         | Mobilsignalkvalitet som en bråkdel av 36 när online, eller tiden sedan senaste signal när offline |
| **Batteri**         | Fordonets batteriprocent — röd vid 10 % eller lägre, orange vid 20 % eller lägre, gul vid 40 % eller lägre, grön över 40 % |
| **Spårarspänning** | Spårarens eget batteri, i volt med två decimaler — röd under 3,6 V, grön vid 3,6 V och över |
| **GPS**             | **Fix** eller **No Fix**                                                                     |

**Spårarspänning** är det värde som operatörer oftast misstolkar. Det är spårarens batteri, inte fordonets: en röd avläsning där betyder att spåraren snart slocknar även om huvudbatteriet ser helt friskt ut. Markera de fordonen för upphämtning innan de slutar rapportera helt.

## Scooter-fliken — de fem åtgärdsknapparna

Varje åtgärd frågar efter bekräftelse innan den skickas och ger en haptisk puls när den går iväg.

### 1. Status

Öppnar ett blad med nio statusar, var och en med ikon och kort beskrivning, och en bock på den aktuella:

- Tillgänglig
- Urladdad
- Laddar
- Behöver undersökas
- Underhåll
- Inte redo
- Transport
- Lagring
- Stulen

Att välja **Laddar** kör också hela [batteribytes](../operations/battery-swap.md)-sekvensen — räkna med att fordonet låses upp, väntar och låses om. Det är inte bara en etikettändring.

### 2. Körläge (lås upp / lås)

- **Lås upp** skickar upplåsningskommandot, höjer hastighetsgränsen till 25 km/h, slår på motorn och startar körspårning.
- **Lås** stoppar spårningen, stänger av motorn, återställer parkeringshastighetsgränsen till 6 km/h och låser fordonet.

Bekräfta alltid att låsbrickan blir grön innan du går därifrån.

### 3. Pip

Låter ett enda lokaliseringspip, med en lyckad eller felaktig notis. Använd det för att lokalisera ett fordon som är nära men utom synhåll — eller använd [Find Scooter](../operations/finder.md) för en guidad sökning.

### 4. Batteribyte

Startar den tidsstyrda bytessekvensen och visar nedräkningen på knappens framsida. Se [Batteribyte](../operations/battery-swap.md) för hela flödet.

### 5. Kommandon

Öppnar ett blad med kommandon som stöds av fordonets spårare, grupperade efter kategori. Vissa kommandon kräver ett värde som du skriver in innan du skickar.

## Biljetter-fliken

Visar öppna supportbiljetter som förare har lämnat för detta fordon. Varje rad visar:

- En blixtikon för elproblem, eller en skiftnyckel för annat
- En violett statusbricka
- Beskrivningen, begränsad till två rader
- Klagomålstypen
- Hur länge sedan den skapades

Kritiska och högprioriterade rader har också en röd prioriteringsbricka — ta hand om dem först.

Att trycka på en rad öppnar biljetten i en modal, samma som flottakartans biljettlåda använder.

**Lös alla** frågar efter bekräftelse och stänger sedan alla öppna biljetter för fordonet. Stängda biljetter försvinner omedelbart från listan, och du får antingen "X biljett(er) lösta" eller, om några inte kunde stängas, "Löste X, misslyckades Y". Knappen är inaktiverad medan en stängning pågår och när inget är öppet.

När fliken är tom står det "Inga öppna biljetter för detta fordon".

## Fel-fliken

Fel är händelser som spåraren själv har rapporterat. Brus och poster utan fel filtreras bort, och det nyaste felet visas först.

- **Aktiva fel** — som ännu inte behandlats och fortfarande är inom larmfönstret — har röd kant och bakgrund.
- **Behandlade fel** blir grå och får en **Löst**-bricka.

Varje rad visar en ikon för feltypen (en generisk varningstriangel när typen saknar specifik ikon), felrubriken och hur länge sedan det inträffade.

**Rensa alla** frågar om bekräftelse och markerar sedan varje aktivt fel som bearbetas ett i taget, med en kort paus mellan dem — att rensa en lång lista är medvetet inte omedelbart, så ge det en stund. Listan uppdateras under tiden, och när inget obearbetat återstår försvinner fordonet från appens larmlista. Du får meddelandet "X fel rensade" eller "Rensade X, misslyckades med Y". Knappen är inaktiverad när det inte finns några aktiva fel.

Tomt tillstånd: "Inga fel registrerade".

## Aviseringar-fliken

Identisk i struktur och i dess **Rensa alla**-beteende med Fel, men för varningar istället för fel. Tomt tillstånd: "Inga aviseringar registrerade".

Den praktiska skillnaden:

- **Fel** — fel som spåraren har rapporterat
- **Aviseringar** — varningar som spåraren har rapporterat
- **Biljetter** — klagomål som användare har lämnat

Alla tre är separata köer; att rensa en rensar inte de andra.

## Vanliga problem

| Symptom                                          | Vad det betyder                                                                  |
| ------------------------------------------------ | -------------------------------------------------------------------------------- |
| En åtgärdsknapp gör ingenting eller är inaktiverad | En annan åtgärd pågår fortfarande — vänta på dess notifikation                   |
| En flik är tom                                   | Det finns verkligen inget öppet för detta fordon; ett fel visas istället för ett tomt tillstånd |
| Inga fjärrkontroller alls                        | Fordonet är en bil, som får en sida med endast status                             |
| **Nätverk** visar en tid istället för en bråkdel | Spåraren är offline och du ser tiden sedan dess senaste signal                   |
| **Rensa alla** verkar fastna                      | Den bearbetar fel ett i taget med avsikt; låt den slutföra                       |
| Ett rensat fel kommer tillbaka som aktivt        | Spåraren rapporterade det igen inom larmfönstret — det underliggande problemet finns kvar |

## Tips

- **Arbeta med telemetrin uppifrån och ner** innan du rör en kontroll: låsbrickan, nätverk, batteri, spårarens spänning, GPS berättar på fem sekunder om fordonet är användbart eller behöver hämtas.
- **Lös alla per fordon**, så det är säkert att använda när du fysiskt har åtgärdat vad biljetterna beskriver.
- **Rensa fel först efter åtgärd**, inte innan — ett fel som återkommer är värdefull bevisning.
- **En röd spårarspänning plus ett friskt batteri** är det klassiska tecknet på "fordon som är på väg att försvinna från kartan".
