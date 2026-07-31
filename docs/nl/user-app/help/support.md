# Rider App — Ondersteuning, FAQ & Live Chat

Ondersteuning (`/support`) is waar een gebruiker hulp zoekt. Het heeft twee tabbladen — **FAQ** en **Contact** — en de live chat opent op een eigen scherm (`/support/messenger`).

Twee dingen om te weten voordat je een vraag over ondersteuning beantwoordt:

- **Elk contactkanaal is door jou te configureren.** Er is geen globale Ridewolf-ondersteunings-e-mail, telefoonnummer of openingstijden ergens in de app — vermeld deze nooit.
- **De app heeft een chat, geen ticketformulier.** Gebruikers krijgen geen ticketnummers. De weergave van jouw team van dezelfde gesprekken is [Gesprekken](../../support/tickets-proofs-chat/conversations.md); [Tickets](../../support/tickets-proofs-chat/tickets.md) is een operator-zijde concept.

## FAQ-tabblad

Accordeonsecties opgebouwd uit jouw gepubliceerde vraag-en-antwoordinhoud, plus **Rijgids**-items verdeeld in **Voor Start** en **Voor Einde** groepen.

Je beheert dit allemaal zonder een app-release:

- Vragen en antwoorden — [FAQ-sets](../../settings/content/faq-sets.md)
- Rijgids-wandelingen — [Snelle handleidingen](../../settings/content/quick-guides.md)

Individuele FAQ-items zijn **deep-linkbaar**: een link naar een specifiek item opent Ondersteuning met dat item al uitgeklapt en in beeld. Dit is de juiste manier om een gebruiker direct naar één antwoord te sturen in plaats van "kijk in de FAQ".

## Contact-tabblad

Elk kanaal hier wordt alleen weergegeven als je het hebt ingeschakeld in [Mijn Bedrijf → App → supportkanalen](../../settings/administration/my-company.md).

| Kanaal        | Wat het doet                                                        |
| ------------- | ------------------------------------------------------------------- |
| **Live Chat** | Opent de messenger (`/support/messenger`)                          |
| **E-mail**    | Opent de mail-app van de gebruiker met jouw adres                  |
| **Website**   | Opent jouw geconfigureerde URL in de in-app browser                |
| **Telegram**  | Opent jouw Telegram-contact extern                                 |
| **WhatsApp**  | Opent jouw WhatsApp-contact extern                                 |
| **Telefoon**  | Start een oproep naar jouw geconfigureerde nummer                  |

Als **geen** is ingeschakeld, toont het tabblad een illustratie zonder contactmogelijkheden. Een gebruiker die meldt "er is geen manier om contact op te nemen met ondersteuning" zit bijna altijd bij een bedrijf waar elk kanaal is uitgeschakeld — controleer je eigen configuratie voordat je ergens anders kijkt.

## Live chat

De messenger is gesprek-gebaseerd:

- De gebruiker ziet zijn **lijst met gesprekken**, elk met een status, de toegewezen operator, het laatste bericht en de tijd daarvan, en een ongelezen telling.
- **Nieuwe Chat** wordt **alleen aangeboden als de gebruiker geen open gesprek heeft.** Een gebruiker met een open gesprek ziet geen mogelijkheid om een tweede te starten — dit is opzettelijk. Ze gaan door met het bestaande gesprek.
- Het openen van een gesprek laadt de berichtgeschiedenis, 50 berichten tegelijk, waarbij oudere worden opgehaald als de gebruiker omhoog scrolt.

| Gespreksstatus    | Betekenis                            |
| ----------------- | ----------------------------------- |
| **Nieuw**         | Net geopend, nog niet opgepakt      |
| **Wachten**       | Wacht op jouw team                   |
| **Actief**        | Wordt afgehandeld                   |
| **Uitgesteld**    | Uitgesteld                         |
| **Gesloten**      | Gesloten door een operator          |

**Berichttypen die de app weergeeft:** tekst, afbeelding, bestand, locatie, contact, rit, app-link en systeemberichten.

**Berichtstatus-iconen:** verzenden, verzonden, afgeleverd, gelezen en mislukt.

### Een bericht verzenden

Een gebruiker kan bijvoegen:

- Tot **5 afbeeldingen per bericht**
- Een **locatiepin** (breedtegraad, lengtegraad en een label)
- Een **bestand**

Een verzonden bericht verschijnt direct als _verzenden_, en wordt daarna bijgewerkt naar de werkelijke status zodra de server bevestigt. Dezelfde live verbinding verzorgt updates voor nieuwe berichten en gelezen status, meldingen voor gesloten en toegewezen gesprekken, en de "_{naam} is aan het typen…_" indicator.

Na een verbroken verbinding laadt de app de gesprekslijst en de geopende chat opnieuw, waarbij dubbele berichten worden verwijderd — zodat een gebruiker die offline ging niet hetzelfde bericht twee keer ziet.

Wanneer een operator het gesprek **sluit**, wordt de invoer van de gebruiker uitgeschakeld en wordt een "gesprek gesloten" melding weergegeven.

## Problemen oplossen

| Gebruiker zegt…                          | Wat het betekent                                                                                              |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| "Er zijn geen contactopties"             | Geen kanalen zijn ingeschakeld voor jouw bedrijf — los dit op in [Mijn Bedrijf](../../settings/administration/my-company.md)  |
| "Er is geen Nieuwe Chat-knop"             | De gebruiker heeft al een open gesprek; ze moeten dat gesprek voortzetten                                     |
| "Ik kan niet meer typen"                   | Een operator heeft het gesprek gesloten. Er kan een nieuw gesprek gestart worden zodra er geen open gesprek meer is                        |
| "Mijn bericht toont mislukt"               | Het is nooit van het apparaat vertrokken — probeer het opnieuw                                             |
| "Mijn berichten zijn gedupliceerd na opnieuw verbinden" | Dat zijn ze niet; de herlaadfunctie verwijdert duplicaten. Vraag om een screenshot als ze erop staan                                     |
| "Hoe snel reageren jullie?"                | Er is geen reactietijd gedefinieerd in de app. **Beloof er geen** — verwijs naar je eigen gepubliceerde service commitment    |
| "Waar meld ik een noodgeval?"              | Via de kanalen die je hebt ingeschakeld. De app definieert geen noodnummer, en er mag geen noodnummer uit de app worden geciteerd |

## Tips

- **Controleer uw tabblad Contact.** Open de Rider App zelf na elke wijziging in Mijn Bedrijf — een volledig leeg tabblad Contact is onzichtbaar voor u en frustrerend voor rijders.
- **Gebruik deep-links naar FAQ-antwoorden** in chatreacties in plaats van ze opnieuw te typen. Zo leert u rijders waar het antwoord staat.
- **Één open gesprek tegelijk** is de regel. Als een rijder iets anders wil melden, sluit dan eerst de oude thread.
- **Houd FAQ-sets en Snelle handleidingen actueel** — elke vraag die ze beantwoorden, is een chat die u nooit hoeft te voeren.
- **Het sluiten van een gesprek beëindigt de mogelijkheid voor de rijder om te reageren.** Zorg dat het antwoord volledig is voordat u sluit.
