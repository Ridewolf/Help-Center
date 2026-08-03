# Operators

De pagina Operators (`/settings/operators`) is de **medewerkerslijst** — elke medewerker die toegang heeft tot het dashboard. Elke operator heeft een rol (zie [Rollen](roles.md)), optionele metadata voor afdeling / functie, tags voor filtering en een status (Actief / Inactief).

Anders dan bij [Klanten](../../operations/customers/clients.md) (jouw klanten) — Operators zijn het **interne team** dat het platform beheert.

Vereiste toestemming: **Operators** (`t4u5v6`). Subtoestemmingen regelen bewerkacties.

## Hoe operators hier komen

Operators worden door jou (een beheerder) aangemaakt via de **+ Aanmaken** knop — er is geen zelfregistratie:

1. **+ Aanmaken** opent het operatorformulier — naam, e-mail, rol, optioneel afdeling / functie / tags
2. De nieuwe operator ontvangt een e-mail met inloginstructies en een tijdelijk wachtwoord
3. Ze loggen in, vullen hun profiel aan (`/profile`) en kunnen aan de slag op basis van de rechten van hun rol
4. Inactieve operators kunnen niet inloggen — zet een account op inactief wanneer een medewerker vertrekt

## Filters

| Filter | Type         | Opmerkingen                                               |
| ------ | ------------ | --------------------------------------------------------- |
| Zoeken | Tekst        | Zoekt in naam, e-mail, functie, afdeling                  |
| Status | Dropdown     | `Actief` / `Inactief` (of `Alles`)                        |
| Tags   | Meervoudige selectie | Filter op tags die aan operators zijn toegewezen (bijv. "Nachtdienst") |

## Kolommen

| Kolom          | Sorteerbaar? | Inhoud                                                                 |
| -------------- | ------------ | --------------------------------------------------------------------- |
| **Gebruiker**  | ✓            | Avatar + voornaam/achternaam + e-mail; link naar operator detailpagina |
| **Rol**        | —            | De rol van de operator (link naar [Rollen](roles.md))                 |
| **Afdeling**   | —            | Optioneel label voor afdeling                                         |
| **Functie**    | —            | Optioneel label voor functie                                          |
| **Tags**       | —            | Tags die aan de operator zijn toegewezen                              |
| **Status**     | ✓            | `Actief` (groen) / `Inactief` (grijs)                               |

## Rijacties

Een menu met drie puntjes per rij. Beschikbare acties hangen af van de rechten:

| Actie            | Toestemming | Wat het doet                                      |
| ---------------- | ----------- | ------------------------------------------------ |
| **Details bekijken** | —         | Opent de detailpagina van de operator             |
| **Bewerken**      | `edit`      | Opent het bewerkingsformulier (naam, rol, afdeling, etc.) |

Er is **geen Verwijderactie** — operatorgegevens worden bewaard voor auditdoeleinden. Om inloggen te voorkomen, zet de status van de operator op _Inactief_ via Bewerken.

## Detailpagina

Klikken op een rij (of _Details bekijken_) opent de detailpagina van de operator met:

- Persoonlijke info (naam, e-mail, telefoon, foto)
- Rol + momentopname van rechten
- Afdeling / functie / tags
- Status
- Activiteitenlogboek (inloggebeurtenissen, rolwijzigingen)

Bewerken kan daar of via het rijmenu — beide openen hetzelfde formulier.

## Aanmaak- / bewerkingsformulier

Het **operatorformulier** (`+ Aanmaken` of _Bewerken_) is eenvoudig:

- **Voornaam / Achternaam** (verplicht)
- **E-mail** (verplicht, uniek onder operators)
- **Rol** (verplicht, dropdown met beschikbare rollen — zie [Rollen](roles.md))
- **Afdeling / Functie** (optioneel)
- **Tags** (optionele meervoudige selectie)
- **Status** (Actief / Inactief)
- Alleen bij aanmaken: een veld voor **initieel wachtwoord** of automatisch gegenereerd wachtwoord dat per e-mail naar de operator wordt gestuurd

Opslaan valideert en schrijft naar het auditlogboek. Nieuw aangemaakte operators ontvangen automatisch een welkomstmail.

## Typische workflows

- **Inwerken van een nieuwe medewerker** — `+ Aanmaken` → naam/e-mail/rol invullen → Opslaan → bevestigen dat ze de welkomstmail hebben ontvangen → vragen om in te loggen en profiel af te ronden
- **Rolwijziging na promotie** — Bewerken → rol wijzigen → Opslaan (de nieuwe rechten gelden bij het volgende verzoek van de operator, niet met terugwerkende kracht)
- **Vertrek** — Bewerken → status = Inactief → Opslaan (het record blijft voor audit; inloggen wordt geblokkeerd)
- **Dienstplanning op basis van tags** — tags toepassen zoals "Nachtdienst" → lijst filteren op tag om te zien wie gepland is

## Tips

- **Rol is het belangrijkste veld** — wees zorgvuldig bij het wijzigen ervan. Een degradatie van Admin naar Ondersteuning verwijdert direct schrijfrechten
- **Inactief ≠ Verwijderd** — de geschiedenis van de operator blijft bewaard; zet terug op Actief om toegang te herstellen
- **De lijst is standaard gesorteerd op naam** — bij veel operators zoek je beter op e-mail of afdeling dan te scrollen
- **Tags hier verschillen van klanttags** — ze zijn operator-specifiek (bijv. "Nachtdienst", "Trainer") en delen de naamruimte niet
- **Beperkingen op zelfbewerking** — je kunt je eigen rol niet wijzigen via het rijmenu; gebruik Profiel voor persoonlijke wijzigingen
