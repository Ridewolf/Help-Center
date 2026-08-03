# Din app (White-Label)

Sidan Din app (`/settings/your-app`) är en **guide som samlar allt som behövs för att bygga och publicera en varumärkesanpassad rider-app under din egen identitet** — appnamn, domän, varumärkesmaterial, butikstext, skärmdumpar och juridiska länkar. En liveförhandsvisning på enhet bredvid formuläret visar dina val på simulerade iPhone- och Android-skärmar medan du skriver.

Du hittar den i sidomenyn under **Inställningar → Din app**.

Guiden har åtta steg: **Identitet → Domän → Material → Listning → Skärmdumpar → Juridik → Publicerare → Granskning**. Den här artikeln täcker de första sex; Publicerare och Granskning behandlas i [Your App: Publisher & Submission](your-app-publisher.md).

## Statuslivscykel

Ett statuskort högst upp visar var din app befinner sig, med version och tidsstämplar:

**utkast → provisionering → under granskning → produktion**, eller **avvisad**.

- Guiden är **redigerbar** medan status är `draft` eller `rejected` — ett avslag öppnar formuläret igen så att du kan åtgärda det butiken invände mot.
- Den är **skrivskyddad** medan pipeline äger appen: `provisioning`, `in-review` och `production`. I dessa tillstånd är sidan en sammanfattning, och butikslänkar — **TestFlight, Play intern testning, App Store, Play Store** — visas när de blir tillgängliga.

## Identitetssteg

- **Appnamn** (obligatoriskt) — det **härleder automatiskt iOS-bundle-id, Android-bundle-id och subdomän**, så välj noggrant.
- **Bundle override** — en växlingsknapp som låser upp manuell inmatning av iOS- och Android-bundle-id om de härledda inte passar.
- **Ikonfärg** — ett hex-värde som används för appikonens skal och bakgrunden på splash-skärmen.

## Domänsteg

- **Domäntyp** — ett radioval mellan **subdomän** (härledd från appnamnet) och **anpassad**.
- **Anpassad domän** — ett textfält som visas endast när typen är `custom`.

## Materialsteg

- **Monokrom** växlingsknapp — avgör om en uppsättning grafik ska användas för båda teman.
- **Symbol** och **ordmärke** — alltid obligatoriska.
- **Symbol / ordmärke för mörkt tema** — visas endast när Monokrom är av, dvs när du tillhandahåller separata ljusa och mörka grafikvarianter.

Dropzonen accepterar drag-och-släpp eller en inklistrad URL. Direkt binär uppladdning är ännu inte tillgänglig — i praktiken, tillhandahåll varje material som en URL för tillfället.

## Listningssteg

Butikstext med teckengränser som kontrolleras av inmatningsfälten:

| Fält                 | Gräns                                       |
| --------------------- | ------------------------------------------- |
| **Underrubrik**       | 30 tecken                                  |
| **Kort beskrivning**  | 80 tecken                                  |
| **Reklamtext**        | 170 tecken (App Store reklamtext)          |
| **Nyckelord**         | 100 tecken, kommaseparerade                 |
| **Fullständig beskrivning** | 4000 tecken                             |

- **Kategori** — resor, navigation, sport, livsstil, hälsa & fitness eller företag.
- **Butiksspråk** — välj från det stödjade språkutbudet. Det **första valda språket är basen**; varje ytterligare språk får en egen flik med språkvisa överstyrningar för underrubrik, beskrivningar, reklamtext och nyckelord. Fält som lämnas tomma i en överstyrning faller tillbaka på automatisk översättning från bas-språket.

## Skärmdumpssteg

Sex fasta skärmdumpsvarianter, var och en kräver en **rubrik** och en **underrubrik**: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. Den liveförhandsvisade enheten i högra kolumnen visar dem med dina varumärkesmaterial och uppdateras medan du skriver.

## Juridiksteg

Integritetspolicy, användarvillkor, support-URL, support-e-post, supporttelefon och marknadsförings-URL. Dessa är **förifyllda från profilen [Mitt företag](my-company.md)** där värden finns — att slutföra Mitt företag först sparar arbete.

## Vanliga frågor

- **Bundle-id ser fel ut.** De härleds från appnamnet — aktivera bundle override för att ange dem manuellt.
- **Fält för mörk variant saknas.** De visas bara när Monokrom är av.
- **Jag kan inte redigera något längre.** Status är `provisioning`, `in-review` eller `production` — pipeline äger appen då. Redigering öppnas automatiskt igen om inskickningen avvisas.
- **Underrubrikstexten kapas.** Gränsen är 30 tecken — kortare än du kanske förväntar dig.
- **Fältet för anpassad domän syns inte.** Ställ in domäntypen till `custom` först.
- **Sidan visar en "lokalt utkast"-notis.** Dina ändringar sparas bara i den här webbläsaren och är ännu inte synkroniserade — anta inte att de sparas automatiskt; kontrollera formuläret igen när notisen försvunnit.
