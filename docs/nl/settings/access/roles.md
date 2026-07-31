# Rollen

De pagina Rollen (`/settings/roles`) is waar je **bepaalt wat operators kunnen doen** in het dashboard. Een rol is een benoemde bundel van permissies; elke operator heeft precies één rol; permissies bepalen welke pagina's ze zien en welke acties ze kunnen uitvoeren.

Gebruik deze pagina samen met [Operators](operators.md) — Operators wijst rollen toe aan personen, Rollen definieert wat elke rol daadwerkelijk kan doen.

Vereiste permissie: **Rollen** (`d4e5f6`).

## Hoe permissies werken

Elke pagina en actie in het dashboard zit achter een **permissie-ID** (bijv. `k7m8n9` voor Voertuigen, `e4f5h6` voor Klanten). Een rol is in essentie een checklist van deze permissie-ID's:

- Een operator kan een pagina alleen zien als zijn rol de permissie voor die pagina heeft
- Een rijactie (Bewerken, Verwijderen, etc.) is verborgen als de rol de bijbehorende sub-permissie mist
- Permissies worden **per verzoek** geëvalueerd — wijzig je een rol, dan ziet de operator de wijziging bij de volgende paginalaad (of eerder)

Er is **geen overerving** tussen rollen — elke rol staat op zichzelf. Rollen met meer vertrouwen hebben simpelweg een langere lijst permissies.

## Standaard versus aangepaste rollen

Rollen zijn er in twee soorten:

| Type        | Bewerkbaar | Doel                                                                    |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| **Standaard** | Nee       | Wordt meegeleverd met het platform (bijv. Eigenaar, Admin). Garandeert een veilige basis |
| **Aangepast** | Ja        | Door jou aangemaakt — past bij jouw teamstructuur                       |

De **Eigenaar / Admin** standaardrollen kunnen niet worden bewerkt of verwijderd — ze zijn het vangnet. Aangepaste rollen zijn waar je permissies afstemt op de werkelijke verantwoordelijkheden.

## Filters

| Filter | Type     | Opmerkingen                         |
| ------ | -------- | ---------------------------------- |
| Zoeken | Tekst    | Zoekt in rolnaam en beschrijving   |
| Status | Dropdown | `Actief` / `Inactief` (of `Alle`) |

## Kolommen

| Kolom           | Sorteerbaar? | Inhoud                                                                    |
| --------------- | ------------ | ------------------------------------------------------------------------- |
| **Rolnaam**     | ✓            | Het label van de rol                                                       |
| **Beschrijving**| —            | Korte tekst die uitlegt waar de rol voor is                              |
| **Type**        | —            | Standaard / Aangepast label                                                |
| **Permissies**  | —            | Aantal verleende permissies (bijv. "23 / 84")                            |
| **Vertrouwensscore** | ✓        | Numerieke score die aangeeft hoe krachtig de rol is (hoger = machtiger)   |
| **Aangemaakt**  | ✓            | Wanneer de rol is aangemaakt                                               |

### Vertrouwensscore

De vertrouwensscore is een ruwe numerieke indicatie van "hoe gevaarlijk is de set permissies van deze rol" — gebruikt voor sorteren en visuele aanwijzingen. Een rol met verwijderen + bulk-bewerken + permissiebeheer heeft een hogere vertrouwensscore dan een alleen-lezen rol. Er is geen vaste schaal; beschouw het als een relatieve maat binnen je eigen rollenlijst.

## Rijacties

Een menu met drie puntjes per rij.

| Actie            | Permissie | Wat het doet                                                                                      |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------ |
| **Details bekijken** | —       | Opent de detailpagina van de rol met de volledige permissie-overzicht                            |
| **Bewerken**      | `edit`    | Opent het bewerkingsformulier (uitgeschakeld met toast voor Standaardrollen)                     |
| **Verwijderen**   | `delete`  | Verwijdert de rol zacht (met bevestiging; alleen Aangepaste rollen; alleen als geen operator deze heeft) |

Als een rol in gebruik is, weigert het systeem Verwijderen en geeft het aan hoeveel operators deze nog hebben — wijs ze eerst opnieuw toe.

## Aanmaak- / bewerkingsformulier

Het rolformulier toont elke permissie gegroepeerd per domein (Operaties, Ondersteuning, Analyse, Instellingen, etc.) met selectievakjes.

Belangrijke velden:

- **Naam** (verplicht, uniek)
- **Beschrijving** (optioneel maar aanbevolen)
- **Status** (Actief / Inactief)
- **Permissiestructuur** — pagina- en sub-permissies, gegroepeerd per domein

Als je een topniveau-paginapermissie uitzet, worden alle sub-permissies ook uitgeschakeld (de operator verliest de pagina volledig). Het inschakelen van een paginapermissie geeft standaard alleen-lezen toegang — daarna kies je afzonderlijk voor _aanmaken_, _bewerken_, _verwijderen_, etc. sub-permissies.

Een kleine **Vertrouwensscore** indicator werkt mee terwijl je vakjes aanvinkt — handig om te vergelijken met soortgelijke rollen.

## Rol detailpagina

Klikken op een rij opent de detailpagina van de rol met:

- Naam, beschrijving, type, status
- Vertrouwensscore
- Volledige permissielijst (alleen-lezen, gegroepeerd per domein)
- Activiteitenlogboek: wanneer de rol is aangemaakt, laatst bewerkt, door wie
- Lijst van operators die de rol momenteel hebben (met links naar hun profielen)

## Typische workflows

- **Definieer een nieuw team** — `+ Aanmaken` → naam (bijv. "Field-team lead") → vink de benodigde permissies aan → Opslaan → wijs de rol toe aan relevante [operators](operators.md)
- **Verscherp een bestaande rol** — zoek de rol in de lijst → Bewerken → vink permissies uit die je niet meer wilt → Opslaan (operators met deze rol verliezen toegang bij hun volgende verzoek)
- **Promoveer een teamlid** — ga naar [Operators](operators.md) → Bewerken → wijzig Rol → Opslaan (niet via deze pagina)
- **Controleer wie voertuigen kan verwijderen** — open deze lijst → sorteer op Vertrouwensscore → loop elke rol na op Bewerken / Verwijderen sub-permissies voor Voertuigen
- **Schrap een rol** — zorg dat geen operator deze heeft ([Operators](operators.md) filter op rol) → Verwijderen

## Tips

- **Minder is meer** — begin met alleen-lezen en voeg specifieke acties toe; weersta de drang om een hogere rol te kopiëren en in te korten
- **Test door impersonatie** (waar ondersteund) — log in als testoperator met de rol voordat je deze uitrolt en probeer de workflows
- **Standaardrollen zijn je vangnet** — Eigenaar / Beheerder bestaan altijd; als je per ongeluk jezelf buitensluit van een Aangepaste rol, kan een Beheerder de toegang herstellen
- **Trust score is een aanwijzing, geen regel** — twee rollen met dezelfde trust score kunnen heel verschillende dingen doen; controleer altijd de daadwerkelijke permissiestructuur
- **Permissies worden server-side geëvalueerd** — het uitzetten ervan in de rol beëindigt de huidige sessie van de operator niet, maar het allereerste volgende verzoek wordt geweigerd
- **Documenteer elke Aangepaste rol** in het Beschrijvingsveld — zes maanden later is "Vlootmanager (lezen + bewerken, geen verwijderen)" een redder in nood
