# Klant — Aanmaken & Bewerken

Twee URL's:

- **Aanmaken** — `/clients/create` — handmatig een nieuwe klant registreren (zeldzaam; de meeste klanten melden zich zelf aan)
- **Bewerken** — `/clients/:id/edit` — persoonlijke gegevens en status van een bestaande klant bijwerken

Beide zijn bereikbaar via de [Klantenlijst](clients.md) (knop **+ Aanmaken** rechtsboven) of via de [Klantdetailpagina](client-detail.md) (_Acties → Klant bewerken_).

Machtigingen:

- **Aanmaken** — `Clients` (`e4f5h6`) + een sub-machtiging gerelateerd aan aanmaken
- **Bewerken** — `Clients` (`e4f5h6`) + de sub-machtiging `edit`

## Wanneer te gebruiken

De meeste van uw klanten **melden zich zelf aan** via de Rider App — u maakt ze zelden handmatig aan in het dashboard.

Handmatig aanmaken is bedoeld voor:

- **Testaccounts** — interne QA, demogebruikers
- **VIP / zakelijk** — accounts die moeten bestaan voordat de rijder de app downloadt
- **Operator-gestuurde onboarding** — evenementen / partnerschappen waarbij medewerkers namens de rijder registreren

Voor alles wat anders is, laat de app de registratie afhandelen en gebruik **Bewerken** wanneer u contactgegevens moet corrigeren of de status wilt wijzigen.

## Lay-out

Een enkele kaart met een verticaal formulier, zonder Field Guide zijbalk (anders dan het Voertuigformulier).

## Velden — Aanmaken

In totaal zeven velden. Alle verplicht.

| Veld                | Validatie                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Voornaam**         | 1–100 tekens                                                                                                          |
| **Achternaam**       | 1–100 tekens                                                                                                          |
| **E-mail**           | Standaard e-mailformaat (`naam@domein.tld`); moet uniek zijn onder klanten                                             |
| **Telefoon**         | Internationaal formaat beginnend met `+` (bijv. `+373 60 123 456`); alleen cijfers, spaties, streepjes, haakjes         |
| **Wachtwoord**       | **Minimaal 12 tekens**, moet een **hoofdletter, kleine letter, cijfer en speciaal teken** bevatten                     |
| **Bevestig wachtwoord** | Moet exact overeenkomen met het wachtwoord                                                                           |
| **Status**           | Initiële status: `Actief` / `Inactief` / `Geblokkeerd` / `Bevroren` / `Registreren` (standaard _Actief_)              |

Validatie wordt uitgevoerd bij opslaan en inline bij het verlaten van een veld. Fouten verschijnen rood onder het veld.

### Wachtwoordregels

De wachtwoordvereiste is het strengste veld. Het dashboard weigert elk wachtwoord dat niet aan alle vier de controles voldoet:

- ≥ 12 tekens
- ≥ 1 hoofdletter (A–Z)
- ≥ 1 kleine letter (a–z)
- ≥ 1 cijfer (0–9)
- ≥ 1 speciaal teken (bijv. `!@#$%^&*`)

Na opslaan gebruikt de klant dit wachtwoord (plus telefoon of e-mail) om in te loggen in de Rider App. Informeer de klant via een geverifieerd kanaal — plak nooit wachtwoorden in chats die niet end-to-end versleuteld zijn.

### Status (bij aanmaken)

| Waarde           | Gebruik                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Actief**       | Standaard — de klant kan direct rijden                                                |
| **Inactief**     | Aangemaakt maar nog niet vrijgegeven (u zet later om naar Actief)                      |
| **Geblokkeerd**  | Vooraf geblokkeerd (zeldzaam — meestal bij heraanmaken na fraude)                     |
| **Bevroren**     | Account gepauzeerd                                                                     |
| **Registreren**  | Aanmelding nog bezig (alleen gebruiken bij integratie met externe flow)               |

## Velden — Bewerken

Bewerken verbergt de wachtwoordvelden (wachtwoorden worden elders gereset) en voegt **Labels** toe.

| Veld           | Opmerkingen                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Voornaam**   | Vooraf ingevuld, zelfde validatie als bij Aanmaken                                         |
| **Achternaam** | Vooraf ingevuld, zelfde validatie als bij Aanmaken                                         |
| **E-mail**     | Vooraf ingevuld; wijzigen kan het inloggen van de klant breken totdat ze opnieuw verifiëren |
| **Telefoon**   | Vooraf ingevuld; zelfde waarschuwing als bij E-mail                                        |
| **Labels**     | Meerdere selecteerbaar; door operator toegepaste labels voor groeperen en filteren         |
| **Status**     | Vooraf ingevuld met huidige status; zelfde enum                                            |

## Opslaan / Annuleren

- **Annuleren** (of terugpijl) — verwerpt niet-opgeslagen wijzigingen en keert terug naar de vorige pagina
- **Opslaan** — valideert het formulier en maakt de klant aan of werkt deze bij. Een toast bevestigt succes; veldfouten worden rood gemarkeerd

Als validatie faalt (ontbrekend veld, wachtwoordregels, dubbele e-mail, telefoonformaat), blijft de pagina open met het foutieve veld omlijnd.

## Aanmaken vs Bewerken — verschillen

| Aspect             | Aanmaken                                               | Bewerken                                             |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Wachtwoordvelden   | Aanwezig en verplicht                                   | Verborgen                                            |
| Labels             | Niet in het formulier (later instellen via Bewerken of de lijst/detail) | Aanwezig                                              |
| Status             | Leeg → standaard _Actief_                               | Vooraf ingevuld met huidige status                   |
| E-mail / Telefoon  | Leeg                                                   | Vooraf ingevuld — wijzigen kan herverificatie vereisen |
| Na opslaan         | Doorverwijzen naar de detailpagina van de nieuwe klant | Terug doorverwijzen naar de detailpagina van de klant |
| Activiteitenlogboek | "Klant aangemaakt door _operator naam_"                | "Klant bewerkt door _operator naam_" met veldverschil |


Beide workflows schrijven naar het [Activiteitenlogboek](client-detail.md#activiteit-tab) van de klant.

## Typische workflows

- **Een VIP aanmaken** — `+ Aanmaken` in de lijst → naam, echte e-mail, echt telefoonnummer, sterk wachtwoord, status _Actief_ invullen → opslaan → de rijder informeren met inloggegevens
- **Een typefout corrigeren** — lijstrij → rijmenu → _Bewerken_ → veld corrigeren → opslaan (de wijziging verschijnt in Activiteiten met een verschil)
- **Een zakelijke batch onboarden** — aanmaak scripten via API (dit formulier is voor eenmalige aanmaken); gebruik later Bewerken om bedrijfsspecifieke labels toe te passen
- **Telefoonnummer wijzigen na apparaatwissel** — Bewerken → Telefoon bijwerken → opslaan → de klant moet zich bij de volgende aanmelding opnieuw verifiëren (afhankelijk van backendregels)

## Tips

- **Telefoonnummerformaat is belangrijk** — moet beginnen met `+` en de landcode; het formaat wordt afgedwongen en de validator weigert onjuist ingevoerde nummers
- **Kies een sterk wachtwoord** — voor eenmalige operator-aanmaken, gebruik een lange zin ("rideTheWolf2026!RW") die aan alle regels tegelijk voldoet; sla het op in je wachtwoordmanager, niet in chat
- **E-mail moet uniek zijn** — dubbele e-mail is de meest voorkomende fout bij aanmaken; controleer eerst de lijst door op de e-mail te zoeken
- **Wijzig E-mail / Telefoon niet zomaar bij bestaande klanten** — verificatiestromen zijn hiervan afhankelijk; stem wijzigingen af met de klant voordat je opslaat
- **Labels horen hier, niet in de rij** — je kunt ook labels toevoegen/verwijderen via bulkactie in de lijst, maar het bewerkingsformulier is de juiste plek voor gerichte wijzigingen
- **Statuswijzigingen wegen zwaar in audit** — van _Actief → Geblokkeerd_ gaan via dit formulier wordt op dezelfde manier gelogd als de speciale _Acties → Klant blokkeren_ — beide zijn geldig
