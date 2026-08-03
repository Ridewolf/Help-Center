# Underhållsautomatisering

Sidan för Underhållsautomatisering (`/maintenance/automation`) är där **regler som automatiskt triggar underhållsarbete** kommer att finnas — "var 500:e km, skapa en inspektionsuppgift", "när ett batterihändelse inträffar, beställ delar". Den delar **Underhållsinsiktspanelen** med [Underhållsuppgifter](tasks.md) och [Inventering & Delar](inventory.md).

Du hittar den i sidomenyn under **Underhåll → Automatisering**.

> **Observera: automatisering kommer snart.** Växeln **Aktivera automatiseringsregler** är inaktiverad, med en förklaring direkt i gränssnittet, och regler kan ännu inte skapas. Insiktspanelens automatiseringssiffror (aktiva regler, utlösta idag, framgångsfrekvens) är den levande delen av sidan.

## Hur en regel formas

En regel parar ihop **en trigger med en åtgärd**:

- **Triggertyp** — `mileage`, `time`, `event` eller `schedule`, plus dess parametrar
- **Åtgärdstyp** — `create_task`, `send_notification`, `order_parts` eller `schedule_service`, plus dess konfiguration
- **Namn**, **beskrivning**, **status** (`active` / `inactive` / `paused`)
- **Gäller för** — vilka fordon eller grupper regeln omfattar
- **Villkor** — extra kriterier som triggern måste uppfylla
- Körningsbokföring: **antal körningar**, **senaste körning**, **körningshistorik**

## Den planerade skapelseprocessen

Regelskapandet kommer att vara en trestegsguide:

1. **Trigger** — namn, beskrivning, triggertyp och dess parametrar
2. **Åtgärd** — välj åtgärdstyp
3. **Granska** — regeln visas som en vanlig språksats, _"När {trigger}, {action}"_, så att du kan kontrollera den innan du sparar

## Vanliga frågor

- **Växeln för aktivering rör sig inte — behörigheter?** Nej. Den är inaktiverad för alla medan funktionen färdigställs; gränssnittet säger det direkt. Förväntat.
- **Vad mäter framgångsfrekvensmätaren?** Andelen regelkörningar som slutfördes framgångsrikt under den fasta 30-dagarsperioden i Insiktspanelen.
- **Kan jag uttrycka "batteri under 20 % OCH äldre än ett år"?** Regler har en villkorslista i modellen, men villkorseditorn är ännu inte tillgänglig.

## Tips

- **Tänk i trigger → åtgärd-par nu** — att skriva ner de regler du vill ha ("var 30:e dag → schemalägg service", "IoT-felhändelse → skapa uppgift") gör det enkelt att aktivera automatisering när den lanseras.
- **Följ "utlösta idag" när det är live** — en regel som utlöses mycket oftare än väntat är felkonfigurerad; pausa den (`paused` status) istället för att ta bort den.
