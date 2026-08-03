# Profiel — Accountgegevens, Wachtwoord en Verwijdering

Het **Profiel**-scherm (`/profile`) is het eigen accountscherm van de berijder: wat de operator over hen weet, plus elke accountniveau-actie — foto, naam, wachtwoord, sessies, uitloggen en verwijderen.

Hier vindt ook de daadwerkelijke accountverwijdering plaats. De knop op het Privacy-scherm is niet de juiste — zie [Privacy](privacy.md).

## Wat het scherm toont

| Veld               | Bewerken? | Opmerkingen                                        |
| ------------------ | --------- | ------------------------------------------------- |
| **Foto**           | Ja        | 96 × 96 avatar met een camera-overlay om te wijzigen |
| **Volledige naam** | Ja        | Hier weergegeven, bewerkt in het bewerkblad       |
| Statusbadge        | Nee       | Lees het label zoals het wordt weergegeven        |
| **E-mail**         | Nee       | Alleen weergave                                   |
| **Telefoon**       | Nee       | Alleen weergave                                   |
| **Accountstatus**  | Nee       | Alleen weergave                                   |
| **Lid sinds**      | Nee       | Datum waarop het account is aangemaakt            |

Geboortedatum staat **niet** op dit scherm. Deze wordt verzameld tijdens onboarding maar wordt hier niet getoond of bewerkbaar gemaakt, stuur een berijder hier dus niet naartoe om die te wijzigen.

## Naam bewerken

1. Tik op het **potlood**-icoon
2. Het bewerkblad opent met **Voornaam** en **Achternaam** — en niets anders. Beide zijn verplicht
3. Opslaan

E-mail en telefoon zijn hier niet bewerkbaar en er is geen in-app procedure om deze te wijzigen. Als een berijder een ander e-mailadres of telefoonnummer nodig heeft, moet jouw team dit via het dashboard regelen — zie [Client — Create & Edit](../../operations/customers/client-create-edit.md).

Een voordeel: een berijder die zich met Apple of Google heeft aangemeld, kan gevraagd worden hun echte naam in te typen, omdat de naam die die diensten teruggeven niet altijd bruikbaar is.

## Foto wijzigen

Door op de avatar te tikken opent het foto-blad met drie bronnen:

- **Foto maken** — de telefooncamera
- **Kies uit galerij**
- **Kies bestand**

Beperkingen: **JPEG, JPG, PNG of WEBP, maximaal 10 MB**. Er is geen bijsnijdstap — de foto wordt gebruikt zoals genomen, dus vertel berijders om het kader goed te kiezen voordat ze uploaden. Zodra de upload klaar is, vervangt de nieuwe foto overal in de app de oude.

## Wachtwoord wijzigen

Het **Wachtwoord wijzigen**-blad vraagt om drie velden:

| Veld                 | Regel                                    |
| -------------------- | --------------------------------------- |
| **Huidig wachtwoord** | Verplicht                               |
| **Nieuw wachtwoord**  | Moet voldoen aan de getoonde wachtwoordregels |
| **Bevestig wachtwoord** | Moet overeenkomen met het nieuwe wachtwoord |

Waarschuw de berijder voordat ze beginnen: **een succesvolle wachtwoordwijziging logt hen uit** en brengt hen terug naar het inlogscherm met een bevestigingsbericht. Dit is bedoeld gedrag, geen fout — ze loggen gewoon opnieuw in met het nieuwe wachtwoord.

Een foutief huidig wachtwoord toont een inline foutmelding bij dat veld. Elke andere fout verschijnt als een korte melding bovenaan het scherm.

## Sessies beheren

**Sessies beheren** opent `/settings/sessions`, de lijst van elk apparaat dat is ingelogd op het account. Zie [Sessions](sessions.md) voor de apparaatlijst en de uitlog-acties overal.

## Uitloggen

De **Uitloggen**-knop beëindigt de sessie op dit apparaat en brengt de berijder terug naar het startscherm van de app. Dit heeft geen effect op andere apparaten — gebruik [Sessions](sessions.md) daarvoor.

## Account verwijderen — de werkende procedure

1. **Account verwijderen** verschijnt alleen als er nog geen verwijdering in behandeling is
2. Tikken opent een bevestigingsdialoog
3. Bij bevestiging wordt de verwijdering ingepland
4. De knop wordt vervangen door een wachtrijvak: een klok-icoon, **Gepland voor {date}**, en een **Annuleren**-knop zolang annuleren nog mogelijk is

Om te annuleren tikt de berijder op **Annuleren**, bevestigt in de dialoog, en de normale **Account verwijderen**-knop verschijnt weer.

Er is geen saldovereiste voor deze procedure — een berijder met geld in de portemonnee kan nog steeds een verwijdering plannen, dus herinner hen eraan eerst het saldo te besteden of terug te vorderen als dat belangrijk is. Zie [Wallet](../money/wallet.md).

## Terwijl een verwijdering in behandeling is

Profiel bewerken, wachtwoord wijzigen, foto uploaden en sessiebeheer zijn **allemaal uitgeschakeld** zolang een verwijdering gepland staat.

Dit is het antwoord wanneer een berijder meldt dat de knoppen op hun Profiel-scherm grijs zijn: ze hebben een geplande verwijdering. Annuleren herstelt alles.

## FAQ

- **Waarom kan de berijder hier hun e-mail of telefoon niet bewerken?** Het bewerkblad bevat alleen voor- en achternaam; beide contactvelden zijn alleen ter weergave en er is geen in-app wijzigingsprocedure.
- **Waarom zijn alle knoppen uitgeschakeld?** Er is een lopende accountverwijdering. Annuleer deze.
- **De berijder werd direct na het wijzigen van het wachtwoord uitgelogd.** Verwacht gedrag — een succesvolle wachtwoordwijziging vereist een nieuwe aanmelding.
- **Wat betekenen de statuswaarden?** Lees het label **Accountstatus** zoals het wordt weergegeven; koppel het niet aan een vaste lijst waarden.
- **Een berijder vraagt over het aanvragen van accountverwijdering via het Privacy-scherm.** Het Privacy-scherm heeft geen verwijderknop — het is alleen informatief. Gebruik **Profiel → Account verwijderen** — zie [Privacy](privacy.md).

## Gerelateerd

- [Sessions](sessions.md) — apparaten ingelogd op het account
- [Settings](../help/settings.md) — meldingen, taal, thema, kaartweergave
- [Privacy](privacy.md) — privacybeleid en veiligheidsrichtlijnen
- [Signing in](registration-login.md) — wachtwoordherstel voor berijders die er nooit een hebben ingesteld
