# Klanten — Lijst

De klantenlijst (`/clients`) is uw klantenbestand: elke persoon die een account bij uw dienst heeft geregistreerd, met hun saldo, labels, samenvatting van ritgeschiedenis en contactkanalen.

Voor werk per klant (volledige geschiedenis, saldoacties, apparaten, opmerkingen) opent u de [klantdetailpagina](client-detail.md).

Vereiste toestemming: **Klanten** (`e4f5h6`). Extra subtoestemmingen regelen specifieke rij- en bulkacties.

## Hoe klanten hier verschijnen

U maakt meestal geen klanten aan in het dashboard — zij melden zich aan via de mobiele rider-app:

1. Een persoon installeert de **Ridewolf rider app** en registreert zich (telefoon of e-mail)
2. De backend maakt een klantrecord aan; de rij verschijnt hier met status **Registreren** terwijl verificatie (SMS, ID, betaalmethode) bezig is
3. Na voltooiing van de verificatie verandert de status in **Actief** — de klant kan ritten maken
4. Operators kunnen handmatig klanten aanmaken (bijv. voor VIP- of testaccounts) via `+ Aanmaken` — behandeld in het artikel _Aanmaken_

De lijst wordt vernieuwd wanneer u herlaadt of filters wijzigt.

## Filters

| Filter     | Type         | Opmerkingen                                                |
| ---------- | ------------ | ---------------------------------------------------------- |
| Zoeken     | Tekst        | Zoekt in naam, telefoon, e-mail, klant-ID                  |
| Datumbereik| Kalender     | Filtert op **registratiedatum**; van / tot                  |
| Status     | Dropdown     | `Actief` / `Geblokkeerd` / `Bevroren` / `Registreren` (of `Alles`) |
| Labels     | Meervoudige selectie | Filtert op labels die aan de klant zijn toegewezen         |

Alle filters worden gecombineerd met EN. Filterchips verschijnen boven de tabel; de URL weerspiegelt de huidige staat.

## Kolommen

| Kolom         | Sorteerbaar? | Inhoud                                                                        |
| ------------- | ------------ | ----------------------------------------------------------------------------- |
| **Klant**     | ✓            | Avatar + voornaam/achternaam + telefoon of e-mail; link naar klantdetail      |
| **Kanalen**   | —            | Pictogrammen voor de contactkanalen die de klant heeft geverifieerd (telefoon, e-mail, sociaal) |
| **Saldo**    | ✓            | Walletsaldo in de valuta van het bedrijf, rood gekleurd bij negatief saldo    |
| **Labels**    | —            | Labels die aan deze klant zijn toegewezen                                    |
| **Status**    | ✓            | Statuspictogram (zie referentie hieronder)                                  |
| **Beoordeling**| ✓           | Gemiddelde beoordeling die rijders aan deze klant hebben gegeven (chauffeursbeoordeling) |
| **Ritten**   | ✓            | Totaal aantal ritten                                                        |
| **Laatste rit**| ✓           | Wanneer de klant voor het laatst een rit maakte                             |
| **Betaling** | —            | Pictogram van de standaard betaalmethode (kaart, wallet, enz.)              |

Sorteer door op een sorteerkop te klikken. Sortering maakt deel uit van de URL.

## Statusreferentie

| Status          | Betekenis                                                                            |
| --------------- | ------------------------------------------------------------------------------------ |
| **Actief**      | Volledig geverifieerd, kan ritten maken, kan worden gefactureerd                    |
| **Geblokkeerd** | Kan geen ritten maken; blokkering door operator (fraude, misbruik, schuld) of systeem-trigger |
| **Bevroren**    | Account is gepauzeerd (bijv. tijdens onderzoek naar een geschil, of op verzoek van klant) |
| **Registreren** | Aanmelding in uitvoering — telefoon / e-mail / ID / betaalmethode nog niet geverifieerd |

## Rijacties

Elke rij heeft een **drie-puntjesmenu** aan de rechterkant. Beschikbare acties hangen af van uw toestemmingen:

| Actie               | Toestemming        | Wat het doet                                                                       |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| **Profiel bekijken**| —                  | Open de [klantdetailpagina](client-detail.md)                                     |
| **Ritgeschiedenis** | —                  | Open het rittenoverzicht van de klant (een gefocust deel van de globale rittenlijst) |
| **SMS verzenden**   | —                  | Open een dialoog om een SMS te sturen naar het geverifieerde telefoonnummer van de klant |
| **E-mail verzenden**| —                  | Open een dialoog om een e-mail te sturen naar het geverifieerde adres van de klant |
| **Push verzenden**  | —                  | Open een dialoog om een pushmelding te sturen naar de app van de klant             |
| **Saldo bijschrijven**| `topup-manual`   | Open het saldodialoog — geld bijschrijven op de wallet van de klant               |
| **Boete opleggen**  | `fine`              | Open het boetedialoog — geld afschrijven van de wallet (voor schade, parkeren, enz.) |
| **Blokkeren / Deblokkeren** | `block` / `unblock` | Open het blokkeringdialoog — wissel de geblokkeerde status van de klant met optionele reden |
| **Bewerken**        | `edit`              | Open het [bewerkformulier](client-create-edit.md)                                 |
| **Verwijderen**     | `delete`            | Soft-delete het klantrecord (met bevestiging; rood destructief item)              |

Acties waarvoor u geen toestemming heeft, worden niet in het menu getoond.

## Bulkacties

Selecteer één of meer klanten met de selectievakjes links. Er verschijnt een **bulkactie-balk** bovenaan met het aantal geselecteerde en de acties:

| Bulkactie         | Machtiging         | Wat het doet                                                            |
| ----------------- | ------------------ | ----------------------------------------------------------------------- |
| **Saldo toevoegen** | `topup-manual`     | Crediteer een enkel bedrag aan elke geselecteerde portemonnee (met bevestiging) |
| **Bedrag in rekening brengen** | `fine`              | Debiteer een enkel bedrag van elke geselecteerde portemonnee (bijv. boete voor evenement) |
| **Status wijzigen** | `block` / `unblock` | Stel elke geselecteerde klant in op dezelfde status (Actief / Geblokkeerd / Bevroren) |
| **Push verzenden** | —                  | Verstuur een pushmelding naar alle geselecteerde klanten tegelijk       |

De bulkdialogen leiden je door het bedrag / bericht / status, en passen dit vervolgens in één bewerking toe op alle geselecteerde rijen met een laatste bevestiging.

## Pagina-acties (rechtsboven)

- **+ Aanmaken** — opent het [Create client form](client-create-edit.md) (apart artikel)

## Typische workflows

- **Onderzoek een betalingsklacht** — zoek op telefoon of e-mail → open detail → controleer saldo en ritgeschiedenis
- **Portemonnee opladen op verzoek van operator** — vind de klant, _Saldo toevoegen_ in het rijmenu, vul het bedrag in, bevestig
- **Blokkeer een fraudeur** — zoek de klant → _Blokkeren / Deblokkeren_ → zet op Geblokkeerd met reden; status verandert naar _Geblokkeerd_, geen ritten meer
- **Verstuur een storing-SMS** — filter op zone-label → _Alles selecteren_ → _Push verzenden_ (of gebruik Marketing → SMS voor niet-spoedeisende berichten)
- **Controleer houders van een label** — filter op een label, scan saldo en rittenaantallen om uitschieters te vinden

## Tips

- **Status is de stille poortwachter** — klanten in _Registreren_ / _Bevroren_ / _Geblokkeerd_ kunnen geen ritten maken; verwacht ze niet in de lijst Ritten
- **Kanaalpictogrammen tonen wat geverifieerd is** — een ontbrekend e-mailpictogram betekent dat SMS je enige uitgaande kanaal is voor die klant
- **Beoordeling is de beoordeling van de klant door de berijder** (niet van de rit) — lage beoordelingen duiden vaak op parkeerproblemen of onbeleefd gedrag; controleer met parkeerbewijzen en boetes
- **Saldo dat rood wordt** = negatieve portemonnee. De klant kan geen nieuwe ritten starten totdat het is opgeladen of terugbetaald
- **Machtigingen zijn gelaagd** — je kunt misschien _SMS verzenden_ maar niet _Saldo toevoegen_ voor dezelfde klant; het menu toont wat je kunt doen
- **De URL is deelbaar** — kopieer een gefilterde weergave (bijv. _Geblokkeerde klanten met ritten > 0_) en stuur die naar een collega
