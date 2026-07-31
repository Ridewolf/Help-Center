# Voertuigpagina — Bediening, Tickets, Storingen en Meldingen

De voertuigpagina (`/vehicle/:id`) is het werkoppervlak voor de veldoperator voor een enkel voertuig: live telemetrie bovenaan, actiekoppen in het midden, en drie wachtrijen met zaken om af te handelen. Je komt hier door op een marker of een lijstregel op de [vlootkaart](fleet-map.md) te tikken, door een QR-code te scannen, of door op een regel in de [batchmodus](../operations/batch-mode.md) te tikken.

## Wat de pagina toont voor welk voertuigtype

Wanneer de pagina opent, laadt deze het voertuig en vervolgens het model:

- **Scooters en fietsen** krijgen de volledige bedieningspagina zoals hier beschreven.
- **Auto's** krijgen een statuspagina zonder afstandsbediening.

Als de modelinformatie niet kan worden geladen, opent de pagina toch — deze valt terug op de scooterindeling in plaats van je op een laadspinner te laten wachten. Als het voertuig zelf niet kan worden geladen, krijg je een foutscherm met een terugknop.

## Tabbladen

Vier tabbladen met een schuifindicator:

| Tab          | Inhoud                                          |
| ------------ | ----------------------------------------------- |
| **Scooter**  | Live telemetrie en de actiekoppen               |
| **Tickets**  | Openstaande supporttickets die rijders hebben gemeld |
| **Faults**   | Fouten die de tracker heeft gerapporteerd       |
| **Alerts**   | Waarschuwingen die de tracker heeft gerapporteerd |

## Tabblad Scooter — telemetrie

Bovenaan staat een slotbadge (**groen** = vergrendeld, **amber** = ontgrendeld) en de statusbadge van het voertuig, gevolgd door deze regels:

| Regel               | Uitleg                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **QR / label**      | De code op de sticker van het voertuig                                                    |
| **Netwerk**         | Mobiele signaalkwaliteit als breuk uit 36 wanneer online, of de tijd sinds het laatste signaal wanneer offline |
| **Batterij**        | Batterijpercentage van het voertuig — rood bij 10% of lager, oranje bij 20% of lager, amber bij 40% of lager, groen boven 40% |
| **Tracker spanning**| De batterijspanning van de tracker, in volt met twee decimalen — rood onder 3,6 V, groen bij 3,6 V en hoger |
| **GPS**             | **Fix** of **No Fix**                                                                     |

**Tracker spanning** is de waarde die operators het vaakst verkeerd lezen. Het is de batterij van de tracker, niet van het voertuig: een rode waarde betekent dat de tracker bijna uitvalt, ook al lijkt de hoofdbatterij perfect in orde. Markeer die voertuigen voor ophalen voordat ze helemaal stoppen met rapporteren.

## Tabblad Scooter — de vijf actiekoppen

Elke actie vraagt om bevestiging voordat deze wordt verzonden, en geeft een haptische puls wanneer het commando is verstuurd.

### 1. Status

Opent een scherm met negen statussen, elk met een pictogram en een korte beschrijving, en een vinkje bij de huidige status:

- Beschikbaar
- Ontladen
- Opladen
- Onderzoek nodig
- Onderhoud
- Niet klaar
- Transport
- Opslag
- Gestolen

Het kiezen van **Opladen** start ook de volledige [batterijwissel](../operations/battery-swap.md) -sequentie — verwacht dat het voertuig ontgrendelt, wacht, en opnieuw vergrendelt. Het is niet alleen een labelwijziging.

### 2. Rijdmodus (vergrendelen / ontgrendelen)

- **Ontgrendelen** stuurt het ontgrendelcommando, verhoogt de snelheidslimiet naar 25 km/u, schakelt de motor in, en start het ritten volgen.
- **Vergrendelen** stopt het volgen, schakelt de motor uit, herstelt de 6 km/u parkeersnelheidslimiet, en vergrendelt het voertuig.

Bevestig altijd dat de slotbadge groen wordt voordat je wegloopt.

### 3. Piepen

Laat een enkele locatorpiep klinken, met een succes- of foutmelding. Gebruik dit om een voertuig te vinden dat dichtbij is maar buiten zicht — of gebruik [Find Scooter](../operations/finder.md) voor een begeleide zoekactie.

### 4. Batterijwissel

Start de getimede wisselsequentie en toont de aftelling op de knop. Zie [Batterijwissel](../operations/battery-swap.md) voor de volledige procedure.

### 5. Commando's

Opent een scherm met commando's die door de tracker van dat voertuig worden ondersteund, gegroepeerd per categorie. Sommige commando's vragen om een waarde die je invoert voordat je ze verzendt.

## Tabblad Tickets

Toont de openstaande supporttickets die rijders over dit voertuig hebben ingediend. Elke regel toont:

- Een bliksemschichtpictogram voor een elektrisch probleem, of een moersleutel voor iets anders
- Een violette statusbadge
- De beschrijving, beperkt tot twee regels
- Het klachtentype
- Hoe lang geleden het ticket is aangemaakt

Kritieke en hoge prioriteitsregels hebben ook een rode prioriteitsbadge — behandel die eerst.

Door op een regel te tikken opent het ticket in een modal, dezelfde die de ticketslade van de vlootkaart gebruikt.

**Alles oplossen** vraagt om bevestiging en sluit dan elk open ticket op het voertuig. Gesloten tickets verdwijnen direct uit de lijst, en je krijgt "X ticket(s) opgelost" of, als sommige niet gesloten konden worden, "Opgelost X, mislukt Y". De knop is uitgeschakeld tijdens het sluiten en als er niets openstaat.

Als het tabblad leeg is, staat er "Geen open tickets voor dit voertuig".

## Tabblad Storingen

Storingen zijn foutmeldingen die de tracker zelf heeft gegenereerd. Ruis en foutloze meldingen zijn eruit gefilterd, en de nieuwste storing staat bovenaan.

- **Actieve storingen** — nog niet verwerkt en nog binnen het alarmvenster — hebben een rode rand en achtergrond.
- **Verwerkte storingen** worden grijs en krijgen een **Opgelost**-badge.

Elke regel toont een pictogram voor het type storing (een generiek waarschuwingsdriehoekje als het type geen specifiek pictogram heeft), de titel van de storing, en hoe lang geleden deze plaatsvond.

**Alles wissen** vraagt om bevestiging en markeert vervolgens elke actieve storing één voor één als verwerkt, met een korte pauze ertussen — het wissen van een lange lijst is bewust niet direct, dus geef het even de tijd. De lijst wordt tijdens het proces bijgewerkt en zodra er niets onbewerkt meer over is, verdwijnt het voertuig uit de alarmlijst van de app. Je krijgt "X storing(en) gewist" of "Gewist X, mislukt Y" te zien. De knop is uitgeschakeld wanneer er geen actieve storingen zijn.

Lege staat: "Geen storingen geregistreerd".

## Tabblad Meldingen

Identiek in structuur en in het gedrag van **Alles wissen** aan Storingen, maar dan voor waarschuwingen in plaats van fouten. Lege staat: "Geen meldingen geregistreerd".

Het praktische onderscheid:

- **Storingen** — fouten die de tracker heeft gemeld
- **Meldingen** — waarschuwingen die de tracker heeft gemeld
- **Tickets** — klachten die rijders hebben ingediend

Alle drie zijn aparte wachtrijen; het wissen van de ene wist de andere niet.

## Veelvoorkomende problemen

| Symptom                                          | Wat het betekent                                                                 |
| ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Een actieknop doet niets of is uitgeschakeld     | Er is nog een andere actie bezig — wacht op de melding daarvan                   |
| Een tabblad is leeg                              | Er is echt niets open voor dit voertuig; een storing toont een fout in plaats van een lege staat |
| Geen afstandsbedieningen beschikbaar             | Het voertuig is een auto, die alleen de statuspagina krijgt                      |
| **Netwerk** toont een tijd in plaats van een breuk | De tracker is offline en je ziet de tijd sinds het laatste signaal               |
| **Alles wissen** lijkt vast te zitten             | Het verwerkt storingen bewust één voor één; laat het afronden                   |
| Een gewiste storing komt weer als actief terug    | De tracker heeft deze opnieuw gemeld binnen het alarmvenster — het onderliggende probleem is nog aanwezig |

## Tips

- **Werk de telemetrie van boven naar beneden** voordat je een bediening aanraakt: slotbadge, netwerk, batterij, trackervoltage, GPS vertelt je binnen vijf seconden of het voertuig bruikbaar is of opgehaald moet worden.
- **Alles oplossen is per voertuig**, dus het is veilig te gebruiken zodra je fysiek hebt gerepareerd wat de tickets beschrijven.
- **Wis storingen pas na de reparatie**, niet ervoor — een storing die terugkomt is nuttig bewijs.
- **Een rode trackervoltage plus een gezonde batterij** is het klassieke "voertuig dat van de kaart gaat verdwijnen"-signaal.
