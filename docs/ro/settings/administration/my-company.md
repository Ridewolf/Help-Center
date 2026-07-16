# Compania mea

Pagina Compania mea (`/settings/my-company`) e **profilul entității juridice care operează flota ta** — date de înregistrare, adresă, contact, monedă, configurare provider-i de plată, endpoint IoT și configurația aplicației mobile pentru rideri (branding, hartă implicită, flow de signup, metode auth, canale de suport, link-uri legale). Salvările merg la `PATCH /companies/my-company` pe backend.

E o pagină la nivel de tenant Ridewolf — modificarea unui operator devine realitate pentru toți. Folosește cu grijă.

Permisiuni necesare: pagina e **gated de două permisiuni simultan** — `x4y5z6` (GET My Company, baseline) și `a7b8c9` (Edit My Company, sensitive). Routerul ascunde complet pagina de operatorii care nu pot și să vadă și să editeze (comentariul din router precizează: _fără edit e zgomot doar-citire_). În interiorul paginii însuși butonul **Save** e re-gated de capability-ul `edit` al paginii `settings.myCompany` din catalogul de permisiuni.

## Secțiuni

Două tab-uri. Modelul mental:

- _Company_ = **entitatea juridică** în sine — identitate, adresă, contact, monedă, provider-i de plată, endpoint IoT, conținut descriptiv. Nimic despre cum arată mobilul.
- _App_ = tot ce **configurează aplicația mobilă** — branding (logo/culori), vedere hartă default, metode auth, pași signup, canale publice de suport, live chat + Telegram bot, link-uri legale în footer-ul aplicației.

Un footer sticky cu **Discard** și **Save changes** apare doar când există modificări nesalvate _și_ ai permisiunea de edit. Pagina încarcă prin `GET /companies/my-company`, apoi re-fetch-ează după fiecare save reușit pentru sincronizare completă.

## Tab-uri

### Tab-ul Company

Șapte carduri stivuite.

**1. Identity**

- _Legal name_ (obligatoriu) — denumirea oficială înregistrată.
- _Label_ — nume scurt afișabil (de exemplu, «Ridewolf Romania»).
- _Registration number_ (obligatoriu) — ID-ul de înregistrare al companiei.
- _Tax ID_ — opțional, cu tooltip care explică că formatul depinde de jurisdicție.

**2. Location**

- _Country_ (obligatoriu) — atenție, câmpul se mapează în DTO ca `county`, dar label-ul e _Country_.
- _City_ (obligatoriu).
- _Address_ (obligatoriu).
- _ZIP code_ (obligatoriu).

**3. Contact**

- _Email_ (obligatoriu) — email principal de contact.
- _Phone_ — opțional.
- _Website_ — URL opțional.

**4. Currency**

- _Currency_ — dropdown de monede suportate. Selectarea unei monede auto-populează _Currency symbol_ (doar-citire).
- Simbolul e afișat disabled cu un hint care explică că e derivat din cod.

**5. Payment providers**

- _Default provider_ — un singur provider folosit ca default pentru plăți noi (Stripe, PayPal etc.).
- _Supported providers_ — multi-select (listă cu căutare și etichete). Toți provider-ii bifați sunt disponibili; cel default trebuie să facă parte din ei.

**6. IoT connectivity** — aproape integral doar-citire

- _IoT domain_ — host-ul broker-ului MQTT, disabled.
- _Port_ — disabled, vine de la backend per companie.
- _Endpoint_ — string-ul format `host:port`, selectabil din-un-click.
- Sub el un Alert info conține instrucțiuni în limbaj natural pentru cuplarea unui vehicul — acoperă atât cazul «vendor cere două câmpuri (host + port)» cât și «vendor cere un singur endpoint string».

**7. Content**

- _Description_ — descriere scurtă Markdown despre companie.
- _About_ — pagină about Markdown mai lungă.

Ambele folosesc `MarkdownEditor` partajat (cu preview live).

### Tab-ul App

Pliază tot ce e vizual + comportamental despre aplicația mobilă pentru rideri. Șase blocuri logice.

**Brand identity + colors** (fostul tab Branding, pliat aici)

- _App name_ (complet) și _Short name_ (folosit la eticheta home-screen).
- _Logo_ — uploader.
- _Theme color_ și _Accent color_ — color picker.

**Default Map View**

- Un canvas MapLibre interactiv cu controale zoom. Click pe hartă setează centrul implicit al orașului în aplicație; latitudinea / longitudinea / zoom-ul sunt salvate.
- Dedesubt, un read-out arată `lat, lng / Zoom / cityId` după ce e setat, sau _Click to set_ înainte.

**Authentication Methods**

- Listă de metode auth toggle-abile (de exemplu, parolă, OTP, Google, Apple). Fiecare arată label + help + switch. Metodele selectate sunt cele pe care aplicația le oferă pe ecranul de login.

**Signup Extra Steps**

- Listă reordenabilă de pași de signup (Step ID + Position + switch Required + buton delete). Folosește pentru un pas suplimentar precum «verificare telefon» sau «upload ID» după înregistrarea standard.
- Butonul _+ Add step_ adaugă un rând gol.

**Support channels** (canalele publice afișate pe ecranul de help din aplicație)

- Fiecare canal e un tile cu switch enable și câmp valoare: _Email_, _Phone_, _Website_, _Telegram_ (handle + URL), _WhatsApp_. Doar cele enabled sunt expuse în aplicație.

**Communications** (live chat + Telegram bot — integrare operațională)

- _Live chat enabled_ — switch + help.
- _Telegram bot_ — token (masked) + buton **Check chats** care contactează bot-ul și listează chat-urile în care e membru. Alege unul din dropdown pentru a salva chat ID-ul. Dacă un chat ID e deja salvat dar discovery n-a fost rulat, valoarea salvată e afișată doar-citire.

**Legal & compliance**

- Trei URL-uri afișate în footer-ul aplicației: _Terms of Service URL_, _Privacy Policy URL_, _Licenses URL_.

## Workflow-uri

- **Actualizează adresa înregistrată** — Company → cardul Location → editează câmpurile → Save.
- **Schimbă provider-ul principal de plată** — Company → Payment providers → setează Default provider → asigură-te că e în Supported providers → Save.
- **Cuplează un vehicul nou la broker-ul IoT** — Company → IoT connectivity → copiază string-ul _Endpoint_ în configul MQTT al vehiculului (un click îl selectează).
- **Re-branding aplicație mobilă** — App → Brand identity → actualizează nume + culori + logo → Save. Se propagă în aplicația riderului la următoarea sincronizare.
- **Adaugă un pas obligatoriu de upload ID în signup** — App → Signup Extra Steps → + Add step → introdu `id-upload` la Step ID, setează poziția, activează _Required_ → Save.
- **Setează bot-ul Telegram de suport** — App → Communications → lipește token-ul → _Check chats_ → alege chat-ul potrivit din dropdown → Save.
- **Publică documente legale actualizate** — App → Legal & compliance → lipește noile URL-uri publice → Save.

## Tips

- **Cele două permisiuni sunt împreună.** Dacă poți _vedea_ dar nu _edita_, pagina e complet ascunsă (nivel router). Dacă pierzi edit între page-load și Save, footer-ul dispare — refresh.
- **Country vs County.** Cardul Location etichetează câmpul _Country_ dar field-ul DTO e `county` — e o convenție istorică în backend, nu un bug; ignoră numele de proprietate și folosește label-ul.
- **Simbolul monedei e derivat.** Nu alegi simbolul — alegerea codului îl setează.
- **Default provider trebuie să fie în Supported providers.** Salvarea cu un default care nu e în lista supported va eșua la validarea backend — fixează lista supported întâi.
- **IoT host + port sunt doar-citire.** Sunt gestionate de Ridewolf — poți copia endpoint-ul, dar nu-l poți schimba din dashboard.
- **Cele două câmpuri Telegram sunt lucruri diferite.** Cel de pe pagina aceasta (App → Communications) e bot-ul de suport pentru a vorbi cu riderii. Cel din [Alerts & Notifications](alerts-notifications.md) → Providers e bot-ul de alertare a personalului. Poate fi același bot, dar de obicei nu.
- **Editoarele Markdown sunt aproape WYSIWYG.** Description și About arată preview lângă sursă.
- **După save, pagina re-fetch-ează** — ce vezi după Save e starea canonică de la backend, nu form-state-ul tău.
