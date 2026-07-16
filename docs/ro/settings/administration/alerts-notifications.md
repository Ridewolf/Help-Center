# Alerte și notificări

Pagina Alerte și notificări (`/settings/alerts-notifications`) e **consola de alertare a operatorilor** — felul în care platforma anunță _personalul_ că ceva are nevoie de atenție. Cuprinde canalele (push / in-app / email / SMS), provider-ele externe (SendGrid, Twilio, Telegram, Slack, Discord, webhook), regulile care declanșează alerte, șabloanele de mesaj, politicile de escaladare, cine e abonat și jurnalul de livrare.

Pagina e despre **alertele pentru echipa care operează platforma**. Pentru textele de notificare către rideri (Ride started, Penalty applied etc.), vezi tab-ul _Notifications_ din [Setări generale](general.md).

> _Notă_: pagina e momentan **un prototip doar pe front-end** — configurațiile canalelor, regulile, abonamentele și jurnalul sunt în state local (sau seed din `mockData.ts`). _Save changes_ arată toast dar nu apelează backend. Forma paginii reflectă modelul real și e bună ca specificație pentru viitorul API.

Permisiune necesară: nu există `requiredPermissions` în rută — orice operator autentificat poate deschide pagina.

## Toolbar de sus

În antetul paginii sunt patru butoane:

| Acțiune      | Ce face                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------- |
| Auto-refresh | Widget-ul comun `AutoRefresh` — aici no-op, prezent pentru paritate cu alte pagini       |
| Test all     | Toast «Testing all» — placeholder pentru «trimite test pe toate canalele active»         |
| Mute 1h      | Toast «Muted for 1h» — placeholder pentru un mute global de 1 oră                        |
| Maintenance  | Buton roșu distructiv — deschide AlertDialog cerând confirmare; toast confirmă activarea |

## Tab-uri

Șapte tab-uri sus. Fiecare e un sub-componente separată.

| Tab           | Scop                                                                             |
| ------------- | -------------------------------------------------------------------------------- |
| Channels      | Canale interne (push / in-app / email / SMS) + rutare pe severity + digest-uri   |
| Providers     | Credențiale provider extern (Email / SMS / Telegram / Slack / Discord / Webhook) |
| Rules         | Reguli de alertare pe familii de evenimente                                      |
| Templates     | Conținutul notificărilor în formatul familie × limbă                             |
| Policies      | Lanț de escaladare, auto-mute, audience safety, redactare PII                    |
| Subscriptions | Cine (rol sau utilizator) primește ce familii de evenimente pe ce canale         |
| Logs          | Jurnal de livrare doar-citire (sent / acked / failed)                            |

### Channels

Trei carduri stivuite.

**Built-in channels**

- _Push_ — config complet (switch enabled, rate limit, retries, quiet-hours from/to, buton test).
- _In-app_ — enabled, rate limit, auto-dismiss (secunde).
- _Email_ — gated de provider-ul Email din tab-ul Providers. Enabled, rate limit, retries.
- _SMS_ — gated de provider-ul SMS. Enabled, rate limit, retries, quiet hours.

**Severity mapping** — trei dropdown-uri care mapează `info` → `inApp` (default), `warning` → `push`, `critical` → `push+email`. Acestea sunt canalele folosite când o regulă are doar severity-ul, fără canale pinned.

**Digest (Summaries)** — frecvență (off / hourly / daily / weekly) + ora de trimitere (selector HH:00).

### Providers

Șase blocuri provider, fiecare cu switch enable și credențiale.

- _Email_ — tip provider (SMTP / SendGrid / Mailgun), API key sau credențiale SMTP (input masked), from-domain.
- _SMS_ — Account SID, Auth token (masked), from-number — formatul Twilio.
- _Telegram_ — Bot token (masked) + selector chat ID (listă hard-codată cu trei chat-uri demo: `@ridewolf_alerts`, `@support_team`, `@management`; butonul **Test** e placeholder).
- _Slack_ — webhook URL + channel.
- _Discord_ — webhook URL.
- _Webhook_ — URL generic webhook + secret de semnare.

Fiecare bloc afișează badge _Enabled_ lângă titlu odată ce switch-ul e on. Butoanele _Test_ doar tostează.

### Rules

Un tabel de reguli. Coloane: Name / Event family / Severity / Channels / Status / Actions (meniu 3-puncte: Edit / Duplicate / Enable-Disable / Delete). **+ Create rule** deschide Rule Dialog — alege nume, scope (global / zone / role), una sau mai multe familii, severity (info / warning / critical), canale și flag enabled.

Reguli seed: _Payment failures_ (critical, familia payments, push+email+telegram) și _Vehicle offline_ (warning, familia vehicles, push+email).

### Templates

Alegi o familie de eveniment + limbă + canal, apoi editezi title și body. Body suportă placeholders (de exemplu `{{ride.id}}`, `{{amount}}`) pe care blocul **Preview** îi expandează cu un eveniment de probă. _Send test_ tostează că trimite testul pe canalul selectat.

### Policies

Patru blocuri:

- _Critical escalation_ — dropdown cu lanț (de exemplu, push → email → telegram → SMS), ack timeout (minute), switch require-read-receipt.
- _Auto-mute_ — taie repetările: dacă același eveniment se aprinde de _N_ ori în _M_ minute, taie pentru _K_ minute (trei input-uri). Rezumatul textual de mai jos reformulează regula.
- _Audience safety_ — switch _Block SMS outside quiet hours_ (suprascrie specific pentru SMS quiet hours per canal).
- _Data redaction_ — switch _Hide PII in external messages_; un hint explică ce e mascat (telefon, email, ultimele 4 cifre card etc.).

### Subscriptions

Tabel de abonamente. Fiecare rând leagă o țintă (un Rol sau un User specific) de una sau mai multe familii de evenimente și canale — de exemplu, _Role: Admin → system + payments → push + email_. Butonul **+ Create** deschide dialogul de abonament; meniul rândului are Edit / Delete.

Subscriptions livrează alerte celor care nu se potrivesc niciunui canal pinned dintr-o Rule — Rules definește _ce_ se alertează, Subscriptions _cine_ aude.

### Logs

Tabel doar-citire cu încercări de livrare. Coloane: Time / Event / Route / Channel / Recipient / Status (sent / acked / failed) / Latency. Click pe rând deschide un toast cu detalii (placeholder pentru o panou de detaliu complet). Folosește pentru a confirma că o alertă chiar a ieșit sau pentru a debuga un provider problematic.

## Familii de evenimente

Rules, Templates și Subscriptions folosesc aceeași listă fixă de familii (definită în `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Se mapează aproximativ pe domeniile dashboard-ului — alege familia care corespunde tipului de eveniment.

## Workflow-uri

- **Conectează alerte pe email** — Providers → enable Email → alege tipul → lipește API key → save → înapoi la Channels → enable canalul Email → gata.
- **Vreau să primesc page la eșecuri de plată** — Rules → editează _Payment failures_ → confirmă severity `critical` și include canalele pe care le monitorizezi → save.
- **Oprește spam-ul SMS noaptea** — Policies → activează _Block SMS outside quiet hours_ → setează quiet hours per canal în Channels.
- **Trimite un sumar zilnic în loc de ping-uri** — Channels → cardul Digest → frecvență _daily_, oră, de exemplu, 09:00.
- **Adaugă un nou rol on-call** — Subscriptions → + Create → alege rolul → familii → canale → save.
- **Debug pentru o alertă lipsă** — Logs → caută evenimentul după route sau timp → dacă status `failed`, sari la Providers să verifici credențiale; dacă `sent` dar omul n-a văzut, verifică Subscriptions / quiet hours / mute.

## Tips

- **Doar front-end momentan.** Save tostează dar API-ul nu există încă — tratează pagina ca specificație, nu ca sursă de adevăr.
- **Butoanele test sunt stub-uri.** _Test all_, _Mute 1h_, _Test_ per-canal și confirmarea _Maintenance_ doar tostează — nu trimit mesaje reale și nu mute-ează nimic.
- **Severity mapping e fallback.** Lista _Channels_ a unei reguli câștigă când e setată; doar o listă goală/nesetată cade înapoi pe mapping-ul de severity.
- **Digest e separat de alertele per eveniment.** Activarea digest-ului nu mută alertele individuale — doar adaugă sumarul periodic.
- **Subscriptions pot ținti un utilizator**, nu doar un rol. Util pentru escaladări one-off (de exemplu, _supervizorul de noapte primește toate alertele `rides` pe push_) fără a crea un rol nou.
- **Layout-ul mobil e intenționat doar citire.** Toate tab-urile pe mobil spun doar _Use desktop for full configuration_ — alertarea e muncă admin care necesită desktop.
- **Redactarea PII contează pentru SMS/email.** Cu ea off, body-ul alertei poate scurge numere de telefon sau ultimele cifre de card către provider-i externi — las-o on dacă n-ai un motiv specific.
