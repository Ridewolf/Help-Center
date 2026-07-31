# Mitt företag

Sidan **Mitt företag** (`/settings/my-company`) är din operatörsidentitet: de juridiska uppgifterna för företaget som driver flottan, dess varumärke och konfigurationen som rider-appen läser — standardkarta stad, inloggningsmetoder, supportkanaler och juridiska länkar.

Sidan är endast synlig för operatörer som har **både** behörigheten för att visa företag och redigera företag — utan redigeringsrättigheter är den helt dold istället för att visas som skrivskyddad.

Precis som resten av instrumentpanelen anpassar sig Mitt företag efter vilket gränssnittsläge du är i:

- **Lättläge** (märkt _Lite_ i gränssnittslägesväljaren) — en skrivskyddad sammanfattning av det viktigaste plus en guidad **femstegsprocess** för att redigera dem.
- **Avancerat läge** — fyra flikar: **Profil** (märkt _Företag_ i fliklisten), **Appkonfiguration** (märkt _App_), **Betalningar** och **Integrationer**.

Att byta från Lätt till Avancerat kräver bekräftelse och laddar sedan om sidan; instrumentpanelen kommer ihåg vilket läge du valde.

## Lättläge

Lättläge visar det viktigaste på en gång — logotypen, kontaktuppgifter (e-post, telefon, webbplats, adress) och vilka offentliga supportkanaler som för närvarande är aktiverade — plus en skrivskyddad **Mer detaljer**-översikt över allt annat: juridiska företagsuppgifter, appens varumärke, betalningsleverantörer och anslutna integrationer samt de juridiska länkarna.

Två åtgärder är tillgängliga:

- **Redigera uppgifter** öppnar den guidade processen (nedan).
- **Byt till Avancerat för betalningar & integrationer** — nycklar för betalningsleverantörer och integrationsuppgifter konfigureras endast i Avancerat läge; denna knapp tar dig dit (bekräfta → sidan laddas om).

### Femstegsprocessen

**Redigera uppgifter** går igenom det viktigaste steg för steg och sparar allt med en enda sparning i slutet:

1. **Namn & logotyp** — företagets visningsnamn (obligatoriskt) och logotyp.
2. **Kontaktuppgifter** — e-post, telefon, webbplats.
3. **Adress** — land, stad, adress, postnummer.
4. **Supportkanaler** — de offentliga kontaktkanaler som användarna ser i appen.
5. **Granska** — en sammanfattning av varje fält med redigeringsgenvägar per rad; **Bekräfta & spara** sparar hela uppsättningen på en gång.

## Avancerat läge

Fyra flikar. En fast fot med **Kassera** och **Spara ändringar** visas längst ner först när något faktiskt har ändrats — om du inte ser en Spara-knapp har inget modifierats än.

### Fliken Profil (_Företag_)

Den juridiska enheten själv, i fem kort:

- **Identitet** — _Juridiskt namn_ (obligatoriskt), _Etikett_ (ett kort visningsnamn; valfritt här, men krävs i Lättlägesguiden), _Organisationsnummer_ (obligatoriskt) och _Skatte-ID_ (valfritt, med en verktygstips som förklarar att formatet beror på jurisdiktion).
- **Plats** — _Land_, _Stad_, _Adress_ och _Postnummer_ (alla obligatoriska).
- **Kontakt** — _E-post_ (obligatoriskt), _Telefon_ och _Webbplats_ (valfritt).
- **Spårarkoppling** — skrivskyddad: det _Domän_ och _Port_ som tilldelats ditt företag, den färdiga _Endpoint_-strängen (ett klick väljer den), och steg-för-steg-instruktioner för att peka en fordons-spårare mot den. Enheterna hanteras själva på sidan [Spårare](../infrastructure/iot.md).
- **Innehåll** — _Beskrivning_ (en kort text) och _Om_ (en längre text), båda i Markdown med liveförhandsvisning.

**Valutan finns inte på denna flik.** Företagets valuta (och dess härledda symbol) är första steget på fliken **Betalningar** — se [Payments & Integrations](company-integrations.md).

### Fliken Appkonfiguration (_App_)

Allt som rider-appen läser, uppifrån och ner:

- **Varumärkesidentitet & färger** — appens namn, kortnamn, logotyp och tema-/accentfärger (hexvärden). Logotypen anges som en URL med en inbäddad förhandsvisning; direkt filuppladdning finns inte än.
- **Standardkarta** — klicka på den interaktiva kartan för att ställa in rider-appens standardstad; latitud, longitud och zoom sparas, och klicket omvandlas bakåt till ett stadsnamn.
- **Autentiseringsmetoder** — reglage för _Telefon-OTP_, _E-post-OTP_, _E-post & lösenord_, _Google_, _Apple_, _Telegram_ och _WhatsApp_. De sociala metoderna fungerar bara efter att motsvarande kort på fliken **Integrationer** har konfigurerats och aktiverats — se [Payments & Integrations](company-integrations.md).
- **Extra registreringssteg** — ytterligare registreringssteg, varje med ett ID, en position och en _Obligatorisk_-omkopplare; **Lägg till steg** lägger till en ny rad.
- **Kommunikation** — reglaget för _Livechatt_ och **Telegram OTP-bot**: klistra in en bot-token, klicka på **Kontrollera chattar** och välj chatten som boten ska använda från rullgardinsmenyn. Detta är en annan inställning än Telegram-kortet på fliken Integrationer — att konfigurera den ena konfigurerar inte den andra.
- **Supportkanaler** — _E-post_, _Telefon_, _Webbplats_, _Telegram_ och _WhatsApp_, var och en med en aktiveringsomkopplare och ett värde; endast aktiverade kanaler visas för användarna.
- **Juridik & efterlevnad** — URL:er för _Användarvillkor_, _Integritetspolicy_ och _Licenser_ som visas i appen.

### Flikarna Betalningar & Integrationer

Betalningsportaler (valuta, maib / mia / Stripe-leverantörskort, standardleverantör) och tjänsteintegrationer (Telegram, WhatsApp, Google, Apple, OpenAI) har en egen artikel: **[Payments & Integrations](company-integrations.md)**. Det viktiga att komma ihåg: dessa kort **sparas individuellt**, separat från denna sidas fot med Spara ändringar.

## Arbetsflöden

- **Åtgärda ett telefonnummer eller en adress snabbt** — Lätt läge → **Redigera detaljer** → hoppa till steget → **Granska** → **Bekräfta & spara**.
- **Uppdatera den registrerade adressen (Avancerat)** — Fliken Profil → Platskort → redigera fälten → **Spara ändringar**.
- **Byt varumärke på rider-appen** — Fliken Appkonfiguration → Varumärkesidentitet → uppdatera namn, färger och logotyp-URL → **Spara ändringar**.
- **Flytta standardkartan till en annan stad** — Fliken Appkonfiguration → Standardkartvy → klicka på den nya platsen → **Spara ändringar**.
- **Låt riders logga in med Google** — konfigurera och aktivera Google-kortet på fliken Integrationer först, sedan aktivera _Google_ under Autentiseringsmetoder → **Spara ändringar**.
- **Lägg till ett obligatoriskt steg för ID-uppladdning vid registrering** — Fliken Appkonfiguration → Extra registreringssteg → **Lägg till steg** → ange ID och position, slå på _Obligatorisk_ → **Spara ändringar**.
- **Peka en spårare mot ditt företag** — Fliken Profil → Spårarkoppling → kopiera _Endpoint_-strängen till enhetskonfigurationen.
- **Publicera uppdaterade juridiska dokument** — Fliken Appkonfiguration → Juridik & efterlevnad → klistra in de nya offentliga URL:erna → **Spara ändringar**.

## Vanliga frågor

- **Jag hittar inte sidan alls.** Den kräver både visnings- och redigeringsrättighet för företag — kontakta din administratör.
- **Det finns ingen Spara-knapp i Avancerat läge.** Sidfoten visas bara när något har ändrats.
- **Var är valutan?** På fliken **Betalningar**, inte på fliken Profil — se [Payments & Integrations](company-integrations.md).
- **En social inloggningsmetod fungerar inte för riders.** Konfigurera och aktivera motsvarande kort på fliken Integrationer först, sedan aktivera autentiseringsmetoden.
- **Logotypen går inte att ladda upp.** Endast en URL kan anges idag; direkt filuppladdning kommer senare.
- **Klick på kartan fyller inte i ett stadnamn.** Koordinater och zoom sparas ändå — stadnamnet hämtas via omvänd geokodning och kan ibland saknas.
- **Var finns kraven för ride-foton?** Inte här — start-/slutbevis för resor konfigureras per fordonsmodell i [Vehicle settings](../infrastructure/vehicle-settings.md).
