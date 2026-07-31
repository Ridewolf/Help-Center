# Operatörer

Sidan Operatörer (`/settings/operators`) är **personalregistret** — varje anställd som har åtkomst till instrumentpanelen. Varje operatör har en roll (se [Roller](roles.md)), valfri avdelning / befattningsmetadata, taggar för filtrering och en status (Aktiv / Inaktiv).

Annorlunda än [Kunder](../../operations/customers/clients.md) (dina kunder) — Operatörer är **det interna teamet** som driver plattformen.

Behörighet krävs: **Operatörer** (`t4u5v6`). Underbehörigheter styr redigeringsåtgärder.

## Hur operatörer hamnar här

Operatörer skapas av dig (en administratör) via **+ Skapa**-knappen — det finns ingen självregistrering:

1. **+ Skapa** öppnar operatörsformuläret — namn, e-post, roll, valfri avdelning / befattning / taggar
2. Den nya operatören får ett e-postmeddelande med inloggningsinstruktioner och ett tillfälligt lösenord
3. De loggar in, kompletterar sin profil (`/profile`) och kan börja arbeta baserat på behörigheterna för deras roll
4. Inaktiva operatörer kan inte logga in — sätt ett konto som inaktivt när en medarbetare slutar

## Filter

| Filter | Typ          | Noteringar                                               |
| ------ | ------------ | -------------------------------------------------------- |
| Sök    | Text         | Söker i namn, e-post, befattning, avdelning             |
| Status | Rullgardin   | `Aktiv` / `Inaktiv` (eller `Alla`)                       |
| Taggar | Flerval      | Filtrera på taggar som tilldelats operatörer (t.ex. "Nattskift") |

## Kolumner

| Kolumn         | Sorterbar? | Innehåll                                                                 |
| -------------- | ---------- | ----------------------------------------------------------------------- |
| **Användare**  | ✓          | Avatar + förnamn/efternamn + e-post; länk till operatörens detaljsida  |
| **Roll**       | —          | Operatörens rollmärke (länk till [Roller](roles.md))                   |
| **Avdelning**  | —          | Valfri avdelningsetikett                                                |
| **Befattning** | —          | Valfri befattningsetikett                                               |
| **Taggar**     | —          | Taggar tilldelade operatören                                           |
| **Status**     | ✓          | `Aktiv` (grön) / `Inaktiv` (grå)                                      |

## Radåtgärder

En meny med tre punkter per rad. Tillgängliga åtgärder beror på behörigheter:

| Åtgärd           | Behörighet | Vad den gör                                      |
| ---------------- | ---------- | ------------------------------------------------- |
| **Visa detaljer** | —          | Öppna operatörens detaljsida                      |
| **Redigera**     | `edit`     | Öppna redigeringsformuläret (namn, roll, avdelning, etc.) |

Det finns **ingen Ta bort-åtgärd** — operatörsregister sparas för revisionsändamål. För att förhindra inloggning, sätt operatörens status till _Inaktiv_ via Redigera.

## Detaljsida

Att klicka på en rad (eller _Visa detaljer_) öppnar operatörens detaljsida med:

- Personlig info (namn, e-post, telefon, foto)
- Roll + behörighetsöversikt
- Avdelning / befattning / taggar
- Status
- Aktivitetslogg (inloggningshändelser, rolländringar)

Redigera därifrån eller från radmenyn — båda når samma formulär.

## Skapa / Redigera-formulär

**Operatörsformuläret** (`+ Skapa` eller _Redigera_) är enkelt:

- **Förnamn / Efternamn** (obligatoriskt)
- **E-post** (obligatoriskt, unikt bland operatörer)
- **Roll** (obligatoriskt, rullgardinsmeny med tillgängliga roller — se [Roller](roles.md))
- **Avdelning / Befattning** (valfritt)
- **Taggar** (valfritt flerval)
- **Status** (Aktiv / Inaktiv)
- Endast vid Skapa: ett fält för **initialt lösenord** eller automatiskt genererat lösenord som mejlas till operatören

Spara validerar och skriver till åtgärdsloggen. Nyskapade operatörer får automatiskt ett välkomstmail.

## Typiska arbetsflöden

- **Introducera en nyanställd** — `+ Skapa` → fyll i namn/e-post/roll → Spara → bekräfta att de fått välkomstmailet → be dem logga in och slutföra sin profil
- **Rolländring efter befordran** — Redigera → ändra Roll → Spara (de nya behörigheterna träder i kraft vid operatörens nästa förfrågan, inte retroaktivt)
- **Avgång** — Redigera → sätt Status = Inaktiv → Spara (posten sparas för revision; inloggning blockeras)
- **Skiftplanering baserat på taggar** — tilldela taggar som "Nattskift" → filtrera listan på tagg för att se vem som är schemalagd

## Tips

- **Roll är det kraftfulla fältet** — var noggrann när du ändrar det. Nedgradering från Admin till Support tar bort skrivbehörighet omedelbart
- **Inaktiv ≠ Raderad** — operatörens historik bevaras; byt tillbaka till Aktiv för att återställa åtkomst
- **Listan är som standard sorterad på namn** — om du har många operatörer, sök på e-post eller avdelning istället för att scrolla
- **Taggar här skiljer sig från kundtaggar** — de är operatörsspecifika (t.ex. "Nattskift", "Tränare") och delar inte namnrymden
- **Begränsningar för självredigering** — du kan inte ändra din egen roll från radmenyn; använd Profil för personliga ändringar
