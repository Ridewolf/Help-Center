# Batteribyte — Steg för steg

Ett batteribyte är en tvåstegssekvens: appen låser upp fordonet och dess batterifack, ger dig ett tidsfönster för att fysiskt byta batteripaketet, och låser sedan allt igen. **Stängningssteget sker automatiskt** — det är den delen varje operatör behöver känna till innan sitt första byte.

Du startar ett byte från [fordonssidan](../fleet/vehicle-controls.md), på fliken **Scooter**.

## Vad som startar ett byte

Det finns två sätt att starta, och de gör exakt samma sak:

- **Batteribyte**-knappen på fliken Scooter. Den har en blixtikon och visar nedräkningen live på sin egen yta.
- Att sätta fordonets status till **Laddar** från **Status**-bladet. Den vägen kör samma sekvens inuti sin statusändringsbekräftelse.

Oavsett vilket visas en bekräftelsedialog innan något skickas.

## Operatörsflöde

1. Öppna fordonet och stanna kvar på fliken **Scooter**.
2. Tryck på **Batteribyte** — eller sätt status till **Laddar**.
3. Bekräfta i dialogrutan.
4. Appen skickar **Battery Swap Mode On**. Vid lyckat svar får du en notis "Battery Swap Mode On", en haptisk puls, och fordonet visas som olåst.
5. En **12-sekunders nedräkning** startar omedelbart och räknar ner en gång per sekund på knappens yta. Byt batteriet medan den räknar.
6. När nedräkningen når noll skickar appen automatiskt **Battery Swap Mode Off**. Du behöver inte trycka på något.
7. Vid lyckat svar känner du en andra haptisk puls — en avsiktlig dubbel bekräftelse så att du kan höra och känna att stängningen skett utan att titta på skärmen — ser en notis "Battery Swap Mode Off", och fordonet visas som låst igen.

## Vad varje steg gör

| Steg                       | Vad som händer på fordonet                                                          |
| -------------------------- | ------------------------------------------------------------------------------------ |
| **Battery Swap Mode On**   | Fordonet låses upp, hastighetsgränsen höjs till 25 km/h, batterifacket frigörs        |
| **Väntan**                 | 12 sekunder — inget skickas, detta är ditt arbetsfönster                            |
| **Battery Swap Mode Off**  | Batterifacket låses, hastighetsgränsen återställs till 6 km/h, fordonet låses        |

Observera vad som händer med hastighetsgränsen: den höjs från 6 till 25 km/h under hela bytefönstret och återställs till 6 när fönstret stängs. Den tas aldrig bort — 25 km/h är den tillåtna maxhastigheten medan fordonet är olåst, och 6 km/h är standard när det är parkerat.

## Vad du ser och känner

- Aviseringar i båda ändar av sekvensen: "Battery Swap Mode On" och sedan "Battery Swap Mode Off"
- Två haptiska pulser, en per steg
- En nedräkning från 12 till 0 på **Batteribyte**-knappen
- Låssymbolen i telemetriområdet som växlar till olåst och tillbaka till låst

## När ett steg misslyckas

Om något steg misslyckas får du en felavisering och en felhaptisk signal. **Inget försöks automatiskt igen.**

Det du ska planera för är ett misslyckat stängningssteg: det lämnar fordonet olåst, med 25 km/h som hastighetsgräns och ett öppet batterifack. Lämna det inte så.

1. Skicka **Ride Mode** av (lås) från fliken Scooter, eller kör bytet igen.
2. Bekräfta att låssymbolen är grön innan du lämnar fordonet.

## Laddningsstatus och byten är samma åtgärd

Eftersom att sätta ett fordon till **Laddar** kör denna sekvens är de två inte oberoende. Att ändra status är ett fullständigt byte: förvänta dig att fordonet låses upp, vänta 12 sekunder och låses igen. Om du bara ville byta etikett, var beredd på att det öppnas.

## Byta flera fordon

Byt ett fordon i taget från dess egen fordonsida. Att köra ett batteribyte över hela kön är inte tillgängligt i appen just nu — [batch mode](batch-mode.md) är en arbetslista du trycker dig igenom, inte ett verktyg för masskommandon.

## Vanliga problem

| Symptom                                  | Vad du ska göra                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| Nedräkningen verkar fastna                | Den räknar ner en gång per sekund. Om skärmen slocknat, kontrollera låssymbolen för att se vilket steg du är på |
| Stängningssteget körs aldrig             | Leta efter en felavisering. Inget försöks igen — kör bytet igen eller lås fordonet med **Ride Mode** av |
| Hastighetsgränsen visar fortfarande 25 km/h | Stängningssteget slutfördes inte; det steget återställer 6 km/h                              |
| Batterifacket öppnas inte                 | Öppningssteget misslyckades eller visade fel — facket frigörs bara när det steget lyckas    |

## Tips

- **Ha reservpaketet i handen innan du trycker.** Tolv sekunder räcker för att byta, inte för att hämta.
- **Lita på den andra haptiska pulsen.** Två pulser betyder att sekvensen stängdes; en puls och tystnad betyder kontrollera skärmen.
- **Lämna alltid med en grön låssymbol** — det är den kontrollen som fångar alla fel ovan.
