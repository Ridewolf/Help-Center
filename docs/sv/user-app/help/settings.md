# Rider App — Inställningar

Inställningar (`/settings`) innehåller alla preferenser för appen som riktar sig till användaren: aviseringar, vad kartan visar, sekretessinställningar, språk, tema och prestanda.

**Det finns ingen Spara-knapp.** Skärmen visar cachade inställningar omedelbart, uppdaterar dem i bakgrunden och skickar varje ändring automatiskt en stund efter att den gjorts. En användare som ändrat något och stängt skärmen direkt har nästan säkert sparat det — det är svaret på "gick min ändring igenom?".

Flera av dessa reglage ändrar vad [Kartan](../riding/map.md) visar, så detta är den första skärmen att besöka vid "kartan är långsam" och "jag kan inte se batterinivåer".

## Aviseringar

Fem oberoende reglage:

- **Reseaviseringar**
- **Kampanjaviseringar**
- **Appuppdateringar**
- **Push-aviseringar**
- **E-postaviseringar** — en enda strömbrytare; det finns inga underalternativ per typ under den

I samma område:

| Kontroll           | Anteckningar                                                                 |
| ------------------ | ---------------------------------------------------------------------------- |
| **Ljud**           | Reglage                                                                     |
| **Ljudvolym**      | Skjutreglage — visas endast när **Ljud** är på                              |
| **Vibration**      | Reglage                                                                     |
| **Radarinställningar** | Ett kort som visas endast i appversioner där radarinställningar är aktiverade |

## Karta och visning

Reglage:

- **Visa batterinivå**
- **Visa kampanjfordon**
- **Visa priser**
- **Automatisk zoom**
- **Karta 3D** — träder i kraft på kartan omedelbart
- **Reducerade animationer**

Plus **Datamode**, en väljare med **balanserad**, **låg** och **hög**. Den styr kartplattornas kvalitet och hur mycket detalj kartan visar, och är **det första att prova när en användare rapporterar en långsam eller tung karta** — sänk den till _låg_ och slå även på **Reducerade animationer**.

**Offlinekartor** är för närvarande inte tillgängligt i appen.

## Sekretesskontroller

- **Dela plats**-reglage
- **Dela data**-reglage
- **Sekretesspolicy** — öppnar den externa URL du konfigurerat i [Mitt företag](../../settings/administration/my-company.md); länken visas endast när en URL är angiven
- **Hantera sessioner** — öppnar skärmen för inloggade enheter (`/settings/sessions`), samma som nås från Profil

Den fullständiga skärmen för sekretess- och säkerhetsriktlinjer är en egen rutt (`/privacy`). **Kontoborttagning finns inte här** — den fungerande borttagningsflödet finns på profilsidan.

## Region och utseende

| Kontroll        | Alternativ                        | Anteckningar                                                                                              |
| -------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Språk**      | **en**, **ru**, **ro**           | Träder i kraft omedelbart, utan omladdning. Endast dessa tre erbjuds på denna skärm                        |
| **Enheter**    | —                                | En enhetsväljare finns för närvarande inte i appen                                                       |
| **Tema**       | Ljust, Mörkt, System             | Träder i kraft omedelbart                                                                                 |
| **Kartstil**   | Auto, Ljust, Mörkt               | **Inaktiverad och tvingad till Auto när Tema är inställt på System.** Byt Tema till Ljust eller Mörkt för att låsa upp |

Endast de tre app-språken ovan visas här, även om andra lokaler finns i produkten — se [Localization](../../settings/administration/localization.md) för instrumentpanelelementet.

## Körläge

**Körläge är för närvarande inte tillgängligt i appen.** En användare som frågar var körlägeskontrollen finns har inte förlorat någon behörighet — avsnittet finns inte i appen och det finns ingen inställning i instrumentpanelen som lägger till det.

## FAQ

| Användaren frågar…                   | Svar                                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| "Var är Spara-knappen?"            | Det finns ingen — ändringar sparas automatiskt                                              |
| "Var är Körläge?"                  | Inte tillgängligt i appen för tillfället                                                    |
| "Varför är Kartstil nedtonad?"    | **Tema** är inställt på **System**. Byt först till Ljust eller Mörkt                        |
| "Varför finns inte mitt språk med?" | Denna skärm erbjuder endast **en**, **ru** och **ro**                                      |
| "Var är inställningen för enheter?" | Inte tillgängligt i appen för tillfället                                                    |
| "Var är reglaget för offlinekartor?" | Inte tillgängligt i appen för tillfället                                                    |
| "Hur tar jag bort mitt konto?"    | Från profilsidan, inte från Inställningar                                                   |
| "Hur ser jag mina inloggade enheter?" | **Hantera sessioner** — här, eller samma knapp på Profil                                  |
| "Kartan är långsam"                | **Datamode → låg**, sedan **Reducerade animationer** på. Se [Map](../riding/map.md#felsökning) |

## Tips

- **Datamod är din prestandakontroll.** Innan du skyller på en användares telefon eller dina brickor, låt dem prova _låg_.
- **"Det sparades inte" är nästan aldrig sant.** Be dem öppna skärmen igen — värdet finns där.
- **Klagomål om kartan finns ofta här, inte på kartan.** Saknade batteriprocent, saknade priser och saknade kampanjfordon är alla inställningar på denna skärm.
- **Tema låser kartstil.** Memorera det paret; annars är det en veckobiljett.
