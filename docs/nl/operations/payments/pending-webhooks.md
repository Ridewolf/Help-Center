# In afwachting van webhooks

De pagina In afwachting van webhooks (`/payments/pending-webhooks`) toont betalingstransacties die vastzitten in **In behandeling** omdat de webhookbevestiging van de betalingsprovider nog niet is ontvangen.

Elke rij is een betaling die we naar een provider hebben gestuurd maar waarvoor we nog geen definitieve statuscallback hebben ontvangen. Gebruik deze pagina als je **wachtrij voor vastgelopen betalingen**: scan op oude rijen, identificeer de provider die achterloopt en escaleer.

Vereiste toestemming: **Betalingen** (`m1n2p3`).

## Wat je ziet

Wanneer een klant betaalt:

1. Het dashboard stuurt een betalingsverzoek naar een **provider** (Stripe, gateway, enz.) — er wordt een _Payment Intent_ aangemaakt
2. De provider verwerkt de transactie asynchroon en stuurt een **webhook** terug met de definitieve status (`succeeded`, `failed`, enz.)
3. Het dashboard ontvangt de webhook en verandert de [betaling](payments.md) status van _In behandeling_ naar _Voltooid_ / _Mislukt_

Rijen in **In afwachting van webhooks** zijn stap 2 die blijft hangen — de provider is benaderd maar heeft nooit een vervolg gegeven. Meestal arriveert de webhook binnen enkele seconden, soms minuten. Alles ouder dan ~30 minuten is verdacht; alles ouder dan 2 uur is vrijwel zeker defect aan de kant van de provider of in onze webhookontvanger.

## Filters

| Filter         | Type   | Opmerkingen                                                                       |
| -------------- | ------ | --------------------------------------------------------------------------------- |
| **Provider**   | Tekst  | Zoek op providernaam (bijv. `stripe`)                                            |
| **Ouder dan**  | Select | `Alle` / `5` / `15` / `30` / `60` / `120` minuten — toon alleen rijen ouder dan dit |

Gebruik _Ouder dan 30 min_ of _60 min_ als je dagelijkse monitoringsfilter — verse pendings zijn ruis.

## Kolommen

| Kolom                 | Sorteerbaar? | Inhoud                                                                |
| --------------------- | ------------ | -------------------------------------------------------------------- |
| **Aangemaakt op**     | ✓            | Wanneer de payment intent is aangemaakt                              |
| **Leeftijd**          | ✓            | Minuten sinds aanmaak — kleurgecodeerd (zie hieronder)              |
| **Provider**          | —            | De betalingsprovider waar de intent naartoe is gestuurd             |
| **Payment Intent ID** | —            | De ID van de provider voor deze intent — kopieer deze bij escalatie  |
| **Status**            | —            | Providerstatus (raw) — meestal `requires_action` / `processing`     |
| **Order ID**          | —            | Onze interne order-/betalings-ID                                    |

### Leeftijd kleurcodering

De kolom **Leeftijd** verandert van kleur naarmate deze ouder wordt, zodat je in één oogopslag kunt scannen en prioriteren:

| Leeftijd       | Kleur  | Wat te doen                                   |
| -------------- | ------ | --------------------------------------------- |
| **< 30 min**   | Grijs  | Normaal; negeren                             |
| **30–120 min** | Geel   | Waard om te bekijken; controleer het dashboard van de provider |
| **> 120 min**  | Rood   | Vrijwel zeker defect — escaleer               |

## Rijacties

Een klein actiemenu rechts van elke rij:

| Actie           | Wat het doet                                            |
| --------------- | ------------------------------------------------------- |
| **Bekijk klant** | Open het klantprofiel gekoppeld aan deze payment intent |

(De actie _Bekijk betalingsdetails_ staat in de code maar is tijdelijk uitgeschakeld omdat de betalingsdetailpagina is verwijderd — komt later terug.)

## Typische workflows

- **Dagelijkse monitoring** — stel _Ouder dan = 30 min_ in → pagina zou meestal leeg moeten zijn → zo niet, scan de providerkolom
- **Uitval bij één provider** — zie veel rijen van dezelfde provider tegelijk geel/rood worden → controleer de statuspagina van de provider → neem contact op met hun ondersteuning met een paar _Payment Intent IDs_ uit de tabel
- **Probleem bij één klant** — één of twee oude rijen → _Bekijk klant_ → controleer de [Activiteit / Betalingen](../customers/client-detail.md) van de klant → adviseer hen opnieuw te proberen of een andere methode te gebruiken
- **Probleem met webhookontvanger** — veel providers worden tegelijk rood zonder uitval aan providerzijde → het probleem zit in onze webhookontvanger, niet bij de provider; escaleer naar het engineeringteam

## Wanneer een rij verdwijnt

Een rij verdwijnt van deze pagina wanneer de webhook arriveert — de betalingsstatus verandert naar _Voltooid_ of _Mislukt_ in de hoofd-[Betalingenlijst](payments.md). De rij 'veroudert' nooit vanzelf; alleen een webhook verwijdert hem.

Als je **vastzittende pendings ouder dan een dag** hebt die niet verdwijnen, is dat een bug om te escaleren — het operator dashboard heeft geen handmatige "forceer voltooi" knop om veiligheidsredenen (een onjuiste handmatige voltooiing veroorzaakt een boekhoudkundige puinhoop die moeilijk te herstellen is).

## Tips

- **Kopieer de Payment Intent ID** bij escalatie naar een provider — dat is de enige ID die zij herkennen
- **Leeftijd sorteren** (nieuwste eerst → oudste eerst) geeft je een triagewachtrij: de bovenkant van de gesorteerde lijst is je urgente werk
- **Lege pagina is het doel** — In afwachting van webhooks moet leeg (of bijna leeg) zijn tijdens een normale dag; behandel elke rij als werk om te doen
- **Provider zoeken is losjes** — gedeeltelijke overeenkomsten werken (`stri` vindt `stripe`)
- **De pagina ververst niet automatisch** — gebruik de vernieuwknop of laad de pagina opnieuw bij actief triageren
