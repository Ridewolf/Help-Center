# Profil — Kontouppgifter, Lösenord och Radering

**Profil**-skärmen (`/profile`) är användarens egen kontoskärm: vad operatören vet om dem, plus alla kontonivååtgärder — foto, namn, lösenord, sessioner, utloggning och radering.

Det är också här kontoraderingen faktiskt sker. Knappen på Integritetsskärmen är inte den man ska använda — se [Privacy](privacy.md).

## Vad skärmen visar

| Fält               | Redigerbar? | Noteringar                                         |
| ------------------- | ----------- | ------------------------------------------------- |
| **Foto**            | Ja          | 96 × 96 avatar med en kameraöverlägg för att byta |
| **Fullständigt namn** | Ja          | Visas här, redigeras i redigeringsformuläret      |
| Statusmärke         | Nej         | Läs etiketten som den visas                        |
| **E-post**          | Nej         | Endast visning                                    |
| **Telefon**         | Nej         | Endast visning                                    |
| **Kontostatus**     | Nej         | Endast visning                                    |
| **Medlem sedan**    | Nej         | Datum då kontot skapades                          |

Födelsedatum finns **inte** på denna skärm. Det samlas in under onboarding men visas inte och kan inte redigeras här, så skicka inte en användare hit för att ändra det.

## Redigera namnet

1. Tryck på **penna**-ikonen
2. Redigeringsformuläret öppnas med **Förnamn** och **Efternamn** — och inget annat. Båda är obligatoriska
3. Spara

E-post och telefon kan inte redigeras här, och det finns inget flöde i appen för att ändra någon av dem. Om en användare behöver en annan e-post eller telefon måste ditt team hantera det från instrumentpanelen — se [Client — Create & Edit](../../operations/customers/client-create-edit.md).

En fördel: en användare som loggat in med Apple eller Google kan bli ombedd att skriva sitt riktiga namn, eftersom namnet som dessa tjänster returnerar inte alltid är användbart.

## Byta foto

Att trycka på avataren öppnar fotofliken med tre källor:

- **Ta foto** — telefonens kamera
- **Välj från galleri**
- **Välj fil**

Begränsningar: **JPEG, JPG, PNG eller WEBP, högst 10 MB**. Det finns inget beskärningssteg — fotot används som det är, så be användarna att rama in det innan uppladdning. När uppladdningen är klar ersätter det nya fotot det gamla överallt i appen.

## Byta lösenord

**Byt lösenord**-formuläret kräver tre fält:

| Fält                 | Regel                                    |
| --------------------- | --------------------------------------- |
| **Nuvarande lösenord** | Obligatoriskt                           |
| **Nytt lösenord**      | Måste uppfylla de visade lösenordsreglerna |
| **Bekräfta lösenord**  | Måste matcha det nya lösenordet          |

Varning till användaren innan de börjar: **en lyckad lösenordsändring loggar ut dem** och återvänder till inloggningsskärmen med ett bekräftelsemeddelande. Det är avsedd funktion, inte ett fel — de loggar bara in igen med det nya lösenordet.

Fel nuvarande lösenord visar ett felmeddelande direkt vid det fältet. Alla andra fel visas som ett kort meddelande högst upp på skärmen.

## Hantera sessioner

**Hantera sessioner** öppnar `/settings/sessions`, listan över alla enheter som är inloggade på kontot. Se [Sessions](sessions.md) för enhetslistan och åtgärder för att logga ut överallt.

## Logga ut

**Logga ut**-knappen avslutar sessionen på denna enhet och återvänder användaren till appens start. Det påverkar inte andra enheter — använd [Sessions](sessions.md) för det.

## Radera kontot — arbetsflödet

1. **Radera konto** visas endast när ingen radering redan är på gång
2. Att trycka på den öppnar en bekräftelsedialog
3. Vid bekräftelse schemaläggs raderingen
4. Knappen ersätts av en väntande ruta: en klockikon, **Schemalagd till {date}**, och en **Avbryt**-knapp när avbokning fortfarande är möjlig

För att avbryta trycker användaren på **Avbryt**, bekräftar i dialogen, och den vanliga **Radera konto**-knappen kommer tillbaka.

Det finns inget saldo-krav i detta flöde — en användare med pengar kvar i plånboken kan fortfarande schemalägga en radering, så påminn dem att spendera eller återkräva saldo först om det är viktigt. Se [Wallet](../money/wallet.md).

## Medan en radering väntar

Profilredigering, lösenordsbyte, fotouppladdning och sessionshantering är **alla inaktiverade** medan en radering är schemalagd.

Detta är svaret när en användare rapporterar att knapparna på deras profilsida är gråade: de har en schemalagd radering. Att avbryta den återställer allt.

## FAQ

- **Varför kan inte användaren redigera sin e-post eller telefon här?** Redigeringsformuläret innehåller bara för- och efternamn; båda kontaktfälten är endast för visning och det finns inget flöde i appen för att ändra dem.
- **Varför är alla knappar inaktiverade?** En väntande kontoradering. Avbryt den.
- **Användaren loggades ut direkt efter lösenordsbytet.** Förväntat — en lyckad lösenordsändring kräver ny inloggning.
- **Vad betyder statusvärdena?** Läs **Kontostatus**-etiketten som den visas; mappa den inte till en fast lista med värden.
- **En användare frågar om att begära kontoradering från Integritetsskärmen.** Integritetsskärmen har ingen raderingsknapp — den är endast informativ. Använd **Profil → Radera konto** — se [Privacy](privacy.md).

## Relaterat

- [Sessions](sessions.md) — enheter inloggade på kontot
- [Inställningar](../help/settings.md) — aviseringar, språk, tema, kartvisning
- [Privacy](privacy.md) — integritetspolicy och säkerhetsriktlinjer
- [Signing in](registration-login.md) — återställning av lösenord för användare som aldrig satt ett
