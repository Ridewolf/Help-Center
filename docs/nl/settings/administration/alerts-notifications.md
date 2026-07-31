# Meldingen & Notificaties

De pagina Meldingen & Notificaties (`/settings/alerts-notifications`) is de **operator-meldconsole** — hoe het platform het _personeel_ laat weten dat iets aandacht nodig heeft. Het omvat de kanalen (push / in-app / e-mail / SMS), de externe providers (SendGrid, Twilio, Telegram, Slack, Discord, webhooks), de regels die meldingen activeren, de berichtsjablonen, de escalatiebeleid, wie geabonneerd is en het leveringslogboek.

Deze pagina gaat over **meldingen voor het team dat het platform beheert**. Voor de notificatieteksten gericht op de gebruiker (Rit gestart, Boete toegepast, enz.), zie het tabblad _Notifications_ van [General](general.md).

> _Opmerking_: deze pagina is momenteel een **front-end-only prototype** — kanaalconfiguraties, regels, abonnementen en het leveringslogboek worden lokaal opgeslagen (of geladen vanuit `mockData.ts`). _Wijzigingen opslaan_ toont een bevestigingstoast maar stuurt nog geen verzoek naar de backend. De opzet van de pagina volgt het echte model en is veilig te gebruiken als specificatie voor het API-werk.

Vereiste toestemming: er zijn geen specifieke `requiredPermissions` ingesteld op de route — elke ingelogde operator kan deze openen.

## Bovenste werkbalk

De paginakop heeft vier knoppen:

| Actie        | Wat het doet                                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Auto-ververs | De gedeelde `AutoRefresh` widget — hier zonder functie, aanwezig voor consistentie met andere pagina's                                  |
| Test alles   | Toont een toast _"Testen van alles"_ — tijdelijke aanduiding voor "een test sturen naar elk ingeschakeld kanaal"            |
| Dempen 1u    | Toont een toast _"Gedempt voor 1 uur"_ — tijdelijke aanduiding voor een globale demping van 1 uur                           |
| Onderhoud   | Destructieve rode knop — opent een AlertDialog om bevestiging te vragen; bij bevestiging toont een toast dat onderhoud is ingeschakeld |

## Tabbladen

Zeven tabbladen bovenaan. Elk is een aparte subcomponent.

| Tabblad       | Doel                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| Kanalen       | Ingebouwde kanalen (push / in-app / e-mail / SMS) + ernstroutering + samenvattingen |
| Providers     | Externe providergegevens (E-mail / SMS / Telegram / Slack / Discord / Webhook)      |
| Regels        | Meldregels per gebeurtenisfamilie                                                  |
| Sjablonen     | Notificatieteksten per gebeurtenisfamilie × taal                                  |
| Beleid        | Escalatieketen, automatische demping, doelgroepveiligheid, PII-masking             |
| Abonnementen  | Wie (rol of gebruiker) welke gebeurtenisfamilies op welke kanalen ontvangt         |
| Logboeken     | Alleen-lezen leveringslogboek (verzonden / bevestigd / mislukte items)             |

### Kanalen

Drie kaarten gestapeld.

**Ingebouwde kanalen**

- _Push_ — volledige configuratie (ingeschakeld-schakelaar, snelheidslimiet, herhalingen, stille uren van/tot, testknop).
- _In-app_ — ingeschakeld, snelheidslimiet, automatisch sluiten na seconden.
- _E-mail_ — afhankelijk van de E-mail-provider op het tabblad Providers. Ingeschakeld, snelheidslimiet, herhalingen.
- _SMS_ — afhankelijk van de SMS-provider. Ingeschakeld, snelheidslimiet, herhalingen, stille uren.

**Ernsttoewijzing** — drie dropdowns die `info` → `inApp` (standaard), `warning` → `push`, `critical` → `push+email` mappen. Dit zijn de kanalen die worden gebruikt wanneer een regel die ernst heeft maar geen specifieke kanalen vastlegt.

**Samenvatting (Digest)** — frequentie (uit / elk uur / dagelijks / wekelijks) + verzendtijd (HH:00-keuzelijst).

### Providers

Zes providerblokken, elk met een inschakelschakelaar en inloggegevens.

- _E-mail_ — provider-type dropdown (SMTP / SendGrid / Mailgun), API-sleutel of SMTP-inloggegevens (verborgen invoer), afzenddomein.
- _SMS_ — Account SID, Auth-token (verborgen), afzendernummer — Twilio-indeling.
- _Telegram_ — Bot-token (verborgen) + chat-ID-keuzelijst (een vaste lijst van drie demochats: `@ridewolf_alerts`, `@support_team`, `@management`; de **Test**-knop is een tijdelijke aanduiding).
- _Slack_ — webhook-URL + kanaal.
- _Discord_ — webhook-URL.
- _Webhook_ — generieke webhook-URL + ondertekeningsgeheim.

Elk providerblok toont een _Ingeschakeld_ badge naast de titel zodra de schakelaar aan staat. _Test_-knoppen tonen een toast.

### Regels

Een tabel met meldregels. Kolommen: Naam / Gebeurtenisfamilie / Ernst / Kanalen / Status / Acties (3-puntjesmenu: Bewerken / Dupliceren / Inschakelen-Uitschakelen / Verwijderen). Klik op **+ Regel aanmaken** om de Regel Dialoog te openen — kies een naam, scope (globaal / zone / rol), een of meer gebeurtenisfamilies, ernst (info / waarschuwing / kritiek), kanalen en de ingeschakeld-vlag.

Vooraf ingestelde regels: _Betalingsfouten_ (kritiek, betalingsfamilie, push+email+telegram) en _Voertuig offline_ (waarschuwing, voertuigenfamilie, push+email).

### Sjablonen

Kies een gebeurtenisfamilie + taal + kanaal, bewerk vervolgens de titel en inhoud. De inhoud ondersteunt plaatsaanduidingen (bijv. `{{ride.id}}`, `{{amount}}`) die het **Voorbeeld**-blok uitbreidt met een voorbeeldgebeurtenis. _Test verzenden_ toont een toast dat er een test naar het geselecteerde kanaal wordt gestuurd.

### Beleid

Vier blokken:

- _Kritieke escalatie_ — keten-dropdown (bijv. push → e-mail → telegram → SMS), bevestigingstime-out in minuten, leesbevestiging vereisen-schakelaar.
- _Automatisch dempen_ — herhalingen dempen: als hetzelfde evenement _N_ keer binnen _M_ minuten voorkomt, dempen voor _K_ minuten (drie numerieke invoervelden). Een samenvattende tekst eronder herhaalt de regel.
- _Doelgroepveiligheid_ — _SMS blokkeren buiten stille uren_ schakelaar (overschrijft per-kanaal stille uren specifiek voor SMS).
- _Gegevensmaskering_ — _PII verbergen in externe berichten_ schakelaar; een hint legt uit wat wordt gemaskeerd (telefoon, e-mail, laatste 4 cijfers van kaarten, enz.).

### Abonnementen

Een tabel met abonnementen. Elke rij koppelt een doel (een Rol of een specifieke Gebruiker) aan een of meer gebeurtenisfamilies en kanalen — bijvoorbeeld _Rol: Admin → systeem + betalingen → push + e-mail_. De **+ Aanmaken** knop opent een abonnementsdialoog; het rijmenu bevat Bewerken / Verwijderen.

Gebruik Abonnementen om meldingen te bezorgen aan mensen die niet overeenkomen met een vastgezet kanaal in een Regel — Regels definiëren _wat_ er gemeld wordt, Abonnementen definiëren _wie_ het hoort.

### Logboeken

Alleen-lezen tabel van bezorgpogingen. Kolommen: Tijd / Gebeurtenis / Route / Kanaal / Ontvanger / Status (verzonden / bevestigd / mislukt) / Latentie. Klik op een rij om een detailtoast te openen (plaatsvervanger voor een volledig detailpaneel). Gebruik dit om te bevestigen dat een melding daadwerkelijk is verzonden, of om een falende provider te debuggen.

## Gebeurtenisfamilies

Regels, Sjablonen en Abonnementen zijn allemaal gebaseerd op dezelfde vaste lijst van gebeurtenisfamilies (gedefinieerd in `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Deze corresponderen ruwweg met de domeinen van het dashboard — kies de familie die past bij het soort gebeurtenis waarover je wilt waarschuwen.

## Workflows

- **E-mailmeldingen instellen** — Tabblad Providers → Email inschakelen → provider type kiezen → API-sleutel plakken → opslaan → terug naar Kanalen → Email kanaal inschakelen → klaar.
- **Een melding krijgen bij mislukte betalingen** — Tabblad Regels → _Betalingsfouten_ bewerken → zorg dat de ernst `critical` is en dat de kanalen de daadwerkelijk gemonitorde kanalen bevatten → opslaan.
- **SMS-spam ’s nachts blokkeren** — Tabblad Beleid → _Blokkeer SMS buiten stille uren_ inschakelen → per-kanaal stille uren instellen op het tabblad Kanalen.
- **Een dagelijkse samenvatting sturen in plaats van meldingen** — Tabblad Kanalen → Digest-kaart → frequentie instellen op _dagelijks_, tijd bijvoorbeeld 09:00.
- **Een nieuwe dienstdoende rol toevoegen** — Tabblad Abonnementen → + Aanmaken → rol kiezen → gebeurtenisfamilies → kanalen → opslaan. Zij krijgen toekomstige meldingen die overeenkomen.
- **Een ontbrekende melding debuggen** — Tabblad Logboeken → zoek de gebeurtenis op route of tijd → als status `failed` is, ga naar Providers om inloggegevens te controleren; als `sent` maar de persoon het niet zag, controleer Abonnementen / stille uren / dempstatus.

## Tips

- **Alleen front-end voorlopig.** Opslaan toont een toast maar de API bestaat nog niet — beschouw deze pagina als de specificatie, niet als de waarheid.
- **Testknoppen zijn placeholders.** _Test alles_, _Dempen 1u_, per-kanaal _Test_ en de _Onderhoud_ bevestiging tonen alleen een toast — ze sturen geen testberichten of dempen niets echt.
- **Ernstmapping is de fallback.** De lijst _Kanalen_ van een Regel heeft voorrang als die is ingesteld; alleen een niet ingestelde/leeg lijst valt terug op de ernstmapping.
- **Digest is apart van per-gebeurtenis meldingen.** Digest inschakelen dempt individuele meldingen niet — het voegt alleen de periodieke samenvatting toe.
- **Abonnementen kunnen op een gebruiker gericht zijn**, niet alleen op een rol. Gebruik dit voor eenmalige escalaties (bijv. _de nachtdienstleider krijgt alle `rides` meldingen via push_) zonder een rol aan te maken.
- **De mobiele lay-out is bewust alleen-lezen.** Alle tabbladen op mobiel zeggen alleen _Gebruik desktop voor volledige configuratie_ — meldingen zijn adminwerk dat de desktop vereist.
- **PII-redactie is belangrijk voor SMS/e-mail.** Zonder redactie kunnen meldingen telefoonnummers of kaartgegevens lekken naar externe providers — laat het aan staan tenzij je een specifieke reden hebt.
