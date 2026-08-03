# Questbevestigingen

Quests zijn **gespeelde taken die het platform van rijders vraagt in ruil voor een beloning** — en Questbevestigingen (`/support/quest-confirmations`) is waar een operator het bewijs dat een rijder heeft ingediend beoordeelt en beslist of er wordt uitbetaald.

De vier questtypen zijn:

- **battery** — een taak gerelateerd aan de batterij
- **lost** — het terugbrengen van een verloren voorwerp
- **clean** — het schoonmaken van een voertuig
- **parking** — een parkeertaak

> **Let op: deze pagina is een preview.** Beslissingen die hier worden genomen worden **momenteel niet vastgelegd en er wordt geen beloning uitbetaald** — de beoordelingsworkflow is zichtbaar voordat de functie volledig is geïmplementeerd. Vertel een rijder niet dat zijn quest is uitbetaald op basis van dit scherm.

## Waar te vinden

Er is **geen zijbalkvermelding** — de Support-groep in de zijbalk bevat alleen Parkeerbewijzen, Tickets en Gesprekken. Bereik de pagina door direct `/support/quest-confirmations` in te typen.

De pagina is alleen beschikbaar in **Geavanceerde modus**; deze is geblokkeerd in de Makkelijke (Lite) modus. Behandel het als een niet-genoteerd power-user oppervlak in plaats van onderdeel van de normale operatornavigatie — net zoals bij [Error Logs](../../apps/tools/error-logs.md).

De lijst en de details staan op dezelfde pagina: het selecteren van een inzending vouwt een **detailpaneel ter plaatse uit** in plaats van te navigeren. Gebruik **Terug naar lijst** in de paneelkop om terug te keren.

## Lijstweergave

| Filter         | Opties                                |
| -------------- | -------------------------------------- |
| **Status**     | Alles / In behandeling / Goedgekeurd / Afgewezen    |
| **Quest type** | Alles / Battery / Lost / Clean / Parking |
| **Zoeken**     | Op gebruiker, quest of voertuig              |
| **Wissen**      | Reset alle filters                     |

Een statistiekoverzicht boven de lijst toont het **aantal in behandeling**, hoeveel er **vandaag zijn goedgekeurd**, **vandaag zijn afgewezen**, en de **gemiddelde beoordelingsduur** in minuten.

## Een inzending beoordelen

1. Klik op een inzendingsrij om het detailpaneel uit te vouwen.
2. Lees het bewijs:
   - het **fotorooster**
   - een **QR-badge**, als de rijder de code van het voertuig heeft gescand
   - een **GPS-badge** met de nauwkeurigheid in meters, als locatie is vastgelegd
   - de **opmerking** van de rijder, als die is achtergelaten
3. Beslis:
   - **Goedkeuren & Beloning uitbetalen** past de goedkeuring direct toe — er is **geen bevestigingsdialoog**, klik dus bewust.
   - **Inzending afwijzen** toont een dropdown met afwijzingsredenen (**verplicht**) plus een optionele opmerking; druk daarna op **Afwijzen bevestigen**.

Alleen **inzendingen in behandeling** kunnen worden beoordeeld. Inzendingen die al zijn beslist tonen een **Bekijken**-knop in plaats van Beoordelen.

Afwijzingsredenen: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Wat een inzending bevat

- **Tijd** van binnenkomst, de **gebruiker**, de **quest** die wordt opgeëist en het **voertuig** dat erbij betrokken is
- **QR-vlag** — of de rijder de QR-code van het voertuig heeft gescand
- **Foto's** — elk gelabeld met wat het toont
- **GPS** — breedte-/lengtegraad met label, plus nauwkeurigheid in meters (een grote waarde betekent dat de positie onnauwkeurig is)
- **Beloning** — vrije tekst die de uitbetaling beschrijft, bijvoorbeeld een gratis rit tot een bepaald bedrag
- **Opmerking gebruiker** — optionele notitie van de rijder
- **Beoordeeld door / op** en een optionele **afwijzingsopmerking** zodra er een beslissing is genomen

## Veelgestelde vragen

- **Betekent goedkeuren dat de beloning daadwerkelijk wordt uitbetaald?** Niet vandaag — de pagina is een preview en beslissingen worden niet vastgelegd.
- **Waarom is er geen bevestigingsstap bij goedkeuring?** Goedkeuren & Beloning uitbetalen is een directe actie in de huidige implementatie. Klik voorzichtig.
- **Een inzending heeft geen QR- of GPS-badge — is dat fraude?** Beide signalen zijn optioneel. Weeg ze samen met de foto's af in plaats van het ontbreken van een badge als bewijs van iets te zien.
- **De GPS-nauwkeurigheidswaarde is enorm — wat betekent dat?** Het apparaat rapporteerde een onnauwkeurige positie; de locatie is slechts een ruwe indicatie.
- **Kan ik een reeds beoordeelde inzending heropenen?** Nee — goedgekeurde en afgewezen inzendingen bieden alleen Bekijken.
- **Ik kan het niet vinden in het menu.** Er is geen menu-item; typ de URL direct in, in Geavanceerde modus.
