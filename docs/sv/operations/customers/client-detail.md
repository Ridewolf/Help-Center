# Kunddetalj

Kunddetaljsidan (`/clients/:id`) är arbetsytan för en enskild kund. Använd den för att granska personlig information, utföra saldoåtgärder (påfyllning, böter), blockera / avblockera, skicka meddelanden och granska kundens resehistorik och kontohändelser.

Du kommer vanligtvis hit genom att klicka på en rad i [Kundlistan](clients.md) eller från en resedetaljsida (kundlänken i sidhuvudet).

Behörighet krävs: **Kunder** (`e4f5h6`). Specifika åtgärder kräver delbehörigheter (anges nedan).

## Layout

Från topp till botten:

1. **Sidhuvud** — tillbaka, namn, status, _Åtgärder_-knapp
2. **Översiktskort** — saldo, resor, betyg, status (4 KPI-rutor)
3. **Flikar** — Detaljer / Aktivitet / Historik

## Sidhuvud

Den övre remsan identifierar kunden:

- **Tillbaka-knapp** (`←`) går tillbaka till listan
- **Namn** (förnamn + efternamn) och **statusetikett** (Aktiv / Blockerad / Fryst / Registrerar)
- **Åtgärder**-knapp till höger — öppnar åtgärdsdialogen

## Åtgärder

Att klicka på **Åtgärder** öppnar en modaldialog med alla operatörsåtgärder som är tillgängliga för denna kund. Varje åtgärd är behörighetsstyrd:

| Åtgärd              | Behörighet          | Vad den gör                                                                |
| ------------------- | ------------------- | -------------------------------------------------------------------------- |
| **Fyll på saldo**   | `topup-manual`      | Öppna saldodiaglog — kreditera pengar till kundens plånbok                 |
| **Utfärda böter**   | `fine`              | Öppna bötesdialog — debitera pengar från plånboken (skada, parkering, etc.)|
| **Skicka push**     | —                   | Öppna en dialog för att skicka en push-notis till kundens app              |
| **Blockera / Avblockera** | `block` / `unblock` | Växla kundens blockeringsstatus med valfri anledning                      |
| **Redigera kund**   | `edit`              | Öppna [redigeringsformuläret](client-create-edit.md)                       |
| **Ta bort kund**    | `delete`            | Mjukborttagning med bekräftelsedialog (röd destruktiv åtgärd)              |

Åtgärder du saknar behörighet för är dolda.

## Översiktskort

En rad med fyra kort under sidhuvudet sammanfattar kunden översiktligt:

| Kort         | Vad det visar                                                                    |
| ------------ | -------------------------------------------------------------------------------- |
| **Saldo**    | Plånbokssaldo i företagets valuta (rött om negativt)                            |
| **Resor**    | Totalt antal resor under hela tiden                                              |
| **Betyg**   | Genomsnittligt betyg som resenärer gett denna kund                              |
| **Status**   | Aktuell status med en enradig undertitel ("Aktiv / Blockerad / Fryst / Registrerar") |

## Flikar

Tre flikar:

| Flik          | Innehåll                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **Detaljer**  | Personlig info (namn, e-post, telefon, status, saldo, taggar) och panelen **Enheter** (inloggade enheter) |
| **Aktivitet** | Operatörs- och systemåtgärder på detta kundkonto (statusändringar, saldoändringar, etc.)             |
| **Historik**  | Kundens resehistorik — ett fokuserat utdrag av den globala Reselistan, avgränsad till denna kund     |

### Fliken Detaljer

Den djupaste vyn av kundens kontostatus. Två områden:

**Personlig info (rutnät):**

- Förnamn
- Efternamn
- E-post (indikator för verifieringsstatus)
- Telefon (indikator för verifieringsstatus)
- Status (med statusetikett)
- Saldo (formaterat i företagets valuta)
- Taggar (de taggar som tillämpats på denna kund)

**Panelen Enheter:**

Visar alla enheter som loggat in i Rider App under detta konto, med senaste inloggningstid och möjlighet att skicka push (när tillåtet) eller logga ut en enhet. Användbart för säkerhetsutredningar och supportärenden som "Jag kan inte logga in".

### Fliken Aktivitet

Den kronologiska **aktivitetsloggen** för denna kund: varje operatörsåtgärd (påfyllning, böter, statusändring, redigering, skicka SMS/e-post/push) och varje systemhändelse (registreringsmilstolpar, verifieringsstatusändringar, saldojusteringar från återbetalningar).

Användbar för efterlevnad, tvistlösning och ansvarstagande.

### Fliken Historik

Kundens **resehistorik** som en tabell — samma radformat som i den globala Reselistan, förfiltrerad för denna kund. Klicka på en rad för att öppna resedetaljer.

Denna flik är din startpunkt för ärenden som "kunden säger att resa X var fel".

## Typiska arbetsflöden

- **Kunden säger att plånboken är fel** — öppna Detaljer (aktuellt saldo), sedan Aktivitet (sök efter senaste saldoändring), sedan Historik (verifiera resan som orsakade debiteringen). Om något var fel, _Åtgärder → Fyll på saldo_ med en anledning
- **Kunden rapporterar förlorad telefon** — Detaljer → Enheter → logga ut den förlorade enheten (när det stöds); lås eventuellt plånboken via _Åtgärder → Blockera kund_ tills de återfått åtkomst
- **Bedrägeri eller missbruk** — Aktivitet för tidslinjen, Historik för misstänkta resor; sedan _Åtgärder → Blockera kund_ med en anledning; anledningen sparas i aktivitetsloggen
- **Godviljerestitution** — _Åtgärder → Fyll på saldo_ med en beskrivning som "Godviljerestitution — biljett #12345"; beskrivningen syns i Aktivitet för revisionsspår
- **Välkomst- / onboardingkontakt** — _Åtgärder → Skicka push_ med ett välkomstmeddelande; kontrollera Enheter först för att säkerställa att de har en aktiv session

## Tips

- **Titta på Status-kortet** — även om allt annat ser bra ut, förklarar ett _Blockerad_ eller _Fryst_ status varför kunden inte kan åka
- **Panelen Enheter är din felsökningsstart** — de flesta fall av "Jag kan inte logga in" beror på en föråldrad enhetssession
- **Påfyllning och bötesbeskrivningar visas i Aktivitet** — skriv något som operatörer kan söka senare ("biljett #X", "återbetalning för resa Y") istället för bara ett nummer
- **Redigera är för metadata** — namn, e-post, telefon — inte för saldo. Använd de dedikerade saldodiagrammen (med revisionsspår) för penningtransaktioner
- **Betyg är _förarens_ betyg av kunden** — lågt betyg i kombination med parkeringsbevis / biljettspikar indikerar vanligtvis en problematisk resenär
- **URL:en innehåller klient-ID** — klistra in det i en supportkonversation för att dela exakt profil
