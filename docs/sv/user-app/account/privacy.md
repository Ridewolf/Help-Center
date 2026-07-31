# Riktlinjer för integritet och säkerhet

**Integritet**-skärmen (`/privacy`) är en lässkärm: integritetspolicyn och säkerhetsriktlinjerna, presenterade som två accordion-grupper.

Om en användare frågar hur de raderar sitt konto, hänvisa dem istället till **Profil** — se [Profile](profile.md). Det är arbetsflödet.

## Hur användare når den

- Från **sidomenyn** på kartan — den menyn är appens enda navigeringsskal, och det finns ingen bottenflik någonstans i appen, så skicka inte en användare som letar efter en flik
- Från ett operatörsmeddelande i chatt som innehåller länken till integritetsappen

**Inställningar** länkar **inte** till denna skärm. Dess **Integritet**-kort innehåller de två delningsomkopplarna, en **Hantera sessioner**-knapp och en **Integritetspolicy**-länk som öppnar din externt hostade policysida. Se [Settings](../help/settings.md) och [Sessions](sessions.md).

## Vad som finns på skärmen

Två accordion-grupper.

**Integritetspolicy**

- Information vi samlar in
- Hur vi använder information
- Informationsdelning
- Databevarande
- Dina rättigheter

**Säkerhetsriktlinjer**

- Hjälmsäkerhet
- Trafikregler
- Fordonsinspektion
- Vädermedvetenhet
- Var uppmärksam
- Parkeringsregler

Det är hela skärmen idag: två läsavsnitt och inga åtgärdsknappar. Detta är det förväntade tillståndet.

## Knappar för databehandling

**Ladda ner mina data** och **Begär kontoradering** är för närvarande inte tillgängliga i appen.

- Säg inte till en användare att de kan exportera sina data från denna skärm. En formell begäran om dataåtkomst måste hanteras av ditt team utanför appen
- Skicka inte en användare till **Begär kontoradering** här. Arbetsvägen är **Profil → Radera konto** ([Profile](profile.md)), som schemalägger raderingen och erbjuder ett avbokningsfönster

## Är säkerhetsriktlinjerna tvingande regler?

Nej — de är vägledning som visas för användaren. De regler som faktiskt tillämpas kommer från din egen konfiguration:

- Var en resa kan sluta — se [Zoner](../../settings/infrastructure/zones.md)
- Vad en resa kostar och minimisaldo för att starta — se [Fordonsavgifter](../../settings/infrastructure/vehicle-tariffs.md)
- Krav på parkeringsfoto — se [Resor](../riding/rides.md)

## Var de juridiska dokumenten finns

- Policyns **text** som visas i appen är accordion-innehållet på denna skärm
- **Inställningar** innehåller dessutom en **Integritetspolicy**-länk som öppnar din externt hostade sida, när en sådan är konfigurerad
- Du ställer in Användarvillkor, Integritetspolicy och Licenslänkar i **Inställningar → Mitt företag → App → Juridik & efterlevnad** ([My Company](../../settings/administration/my-company.md))
- Referensexemplar: [Terms of Service](../../legal/policies/terms-of-service.md) och [Privacy Policy](../../legal/policies/privacy-policy.md)

## FAQ

- **Hur raderar en användare faktiskt sitt konto?** **Profil → Radera konto**. Det schemalägger raderingen och kan avbrytas medan avbokningsfönstret är öppet.
- **Kan en användare ladda ner sina data från appen?** Nej — inte för närvarande tillgängligt i appen.
- **Knappen Begär kontoradering gör ingenting.** Den är inte för närvarande tillgänglig i appen. Använd Profil-flödet.
- **Var finns Integritetsposten i menyn?** I kartans sidomeny. Det finns ingen bottennavigering i denna app.
- **Skärmen har inga knappar alls.** Förväntat — de två läsavsnitten är hela skärmen.

## Relaterat

- [Profile](profile.md) — kontoradering, lösenord, foto
- [Sessions](sessions.md) — enheter inloggade på kontot
- [Settings](../help/settings.md) — delningsomkopplare och extern Integritetspolicy-länk
- [Support](../help/support.md) — hur en användare når ditt team med en dataförfrågan
