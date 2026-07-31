# Rider App — Instellingen

Instellingen (`/settings`) bevat alle voorkeuren voor de app die de berijder ziet: meldingen, wat de kaart weergeeft, privacy-instellingen, taal, thema en prestaties.

**Er is geen Opslaan-knop.** Het scherm toont direct de opgeslagen instellingen, ververst ze op de achtergrond en stuurt elke wijziging automatisch door kort nadat deze is gemaakt. Een berijder die iets heeft veranderd en het scherm meteen sluit, heeft het vrijwel zeker opgeslagen — dat is het antwoord op "is mijn wijziging toegepast?".

Verschillende van deze schakelaars veranderen wat de [Kaart](../riding/map.md) weergeeft, dus dit is het eerste scherm om te bezoeken bij "de kaart is traag" en "ik zie de batterijstatus niet".

## Meldingen

Vijf onafhankelijke schakelaars:

- **Ritmeldingen**
- **Promotie-meldingen**
- **App-updates**
- **Pushmeldingen**
- **E-mailmeldingen** — een enkele schakelaar; er zijn geen subopties per type onder deze

In hetzelfde gebied:

| Bediening          | Opmerkingen                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| **Geluid**         | Schakelaar                                                                   |
| **Geluidsvolume**  | Schuifregelaar — verschijnt alleen als **Geluid** aan staat                  |
| **Trilling**       | Schakelaar                                                                   |
| **Radarinstellingen** | Een kaart die alleen verschijnt in app-builds waar radarinstellingen zijn ingeschakeld |

## Kaart en weergave

Schakelaars:

- **Toon batterijstatus**
- **Toon promotievoertuigen**
- **Toon prijzen**
- **Automatisch zoomen**
- **Kaart 3D** — werkt direct op de kaart
- **Verminderde animaties**

Plus **Datamodus**, een keuzelijst met **gebalanceerd**, **laag** en **hoog**. Dit bepaalt de kwaliteit van kaarttegels en hoeveel detail de kaart weergeeft, en is **het eerste wat je moet proberen als een berijder meldt dat de kaart traag of zwaar is** — zet het op _laag_ en schakel ook **Verminderde animaties** in.

**Offline kaarten** is momenteel niet beschikbaar in de app.

## Privacy-instellingen

- **Locatie delen** schakelaar
- **Gegevens delen** schakelaar
- **Privacybeleid** — opent de externe URL die je hebt ingesteld in [Mijn Bedrijf](../../settings/administration/my-company.md); de link verschijnt alleen als er een URL is ingesteld
- **Sessies beheren** — opent het scherm met ingelogde apparaten (`/settings/sessions`), hetzelfde scherm dat ook via Profiel bereikbaar is

Het volledige scherm met privacy- en veiligheidsrichtlijnen is een aparte route (`/privacy`). **Account verwijderen is hier niet mogelijk** — de werkende verwijderflow bevindt zich op het Profiel-scherm.

## Regio en uiterlijk

| Bediening       | Opties                           | Opmerkingen                                                                                              |
| --------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Taal**        | **en**, **ru**, **ro**           | Werkt direct, zonder herladen. Alleen deze drie worden op dit scherm aangeboden                           |
| **Eenheden**    | —                                | Een eenhedenkiezer is momenteel niet beschikbaar in de app                                              |
| **Thema**       | Licht, Donker, Systeem            | Werkt direct                                                                                             |
| **Kaartstijl**  | Auto, Licht, Donker               | **Uitgeschakeld en geforceerd op Auto wanneer Thema op Systeem staat.** Schakel Thema naar Licht of Donker om het te ontgrendelen |

Alleen de drie app-talen hierboven verschijnen hier, ook al bestaan er elders in het product andere lokalisaties — zie [Localization](../../settings/administration/localization.md) voor het dashboardgedeelte.

## Rijdmodus

**Rijdmodus is momenteel niet beschikbaar in de app.** Een berijder die vraagt waar de rijdmodusbediening is, heeft geen toestemming verloren — deze sectie zit niet in de app en er is geen dashboardinstelling die het toevoegt.

## FAQ

| Berijder vraagt…                      | Antwoord                                                                                      |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| "Waar is de Opslaan-knop?"          | Die is er niet — wijzigingen worden automatisch opgeslagen                                     |
| "Waar is Rijdmodus?"                | Momenteel niet beschikbaar in de app                                                         |
| "Waarom is Kaartstijl grijs?"       | **Thema** staat op **Systeem**. Zet het eerst op Licht of Donker                              |
| "Waarom staat mijn taal er niet bij?" | Dit scherm biedt alleen **en**, **ru** en **ro**                                            |
| "Waar is de instelling voor Eenheden?" | Momenteel niet beschikbaar in de app                                                        |
| "Waar is de schakelaar voor Offline kaarten?" | Momenteel niet beschikbaar in de app                                                        |
| "Hoe verwijder ik mijn account?"    | Via het Profiel-scherm, niet via Instellingen                                                |
| "Hoe zie ik mijn ingelogde apparaten?" | **Sessies beheren** — hier, of dezelfde knop op Profiel                                     |
| "De kaart is traag"                  | **Datamodus → laag**, dan **Verminderde animaties** aan. Zie [Map](../riding/map.md#problemen-oplossen) |

## Tips

- **Data Mode is uw prestatiedraaiknop.** Voordat u de telefoon van een gebruiker of uw tegels de schuld geeft, laat hen _laag_ proberen.
- **"Het is niet opgeslagen" is bijna nooit waar.** Vraag hen het scherm opnieuw te openen — de waarde zal er zijn.
- **Kaartklachten bevinden zich vaak hier, niet op de kaart.** Ontbrekende batterijpercentages, ontbrekende prijzen en ontbrekende promotionele voertuigen zijn allemaal schakelaars op dit scherm.
- **Thema vergrendelt Kaartstijl.** Onthoud die combinatie; anders is het een wekelijkse kaart.
