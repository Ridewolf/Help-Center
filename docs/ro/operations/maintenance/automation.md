# Automatizarea mentenanței

Pagina Automatizarea mentenanței (`/maintenance/automation`) e locul unde vor trăi **regulile care declanșează automat lucrări de mentenanță** — „la fiecare 500 km, creează o sarcină de inspecție", „când apare un eveniment de baterie, comandă piese". Împarte **panoul Insight de mentenanță** cu [Sarcinile de mentenanță](tasks.md) și [Inventar & piese](inventory.md).

O găsești în sidebar la **Mentenanță → Automatizare**.

> **Atenție: automatizarea e coming soon.** Comutatorul **Enable automation rules** e dezactivat, cu o explicație afișată direct în interfață, iar regulile nu pot fi create încă. Partea live a paginii sunt numerele de automatizare din panoul Insight (reguli active, declanșări azi, success rate).

## Cum arată o regulă

O regulă împerechează **un trigger cu o acțiune**:

- **Tip de trigger** — `mileage`, `time`, `event` sau `schedule`, plus parametrii lui
- **Tip de acțiune** — `create_task`, `send_notification`, `order_parts` sau `schedule_service`, plus configurația ei
- **Nume**, **descriere**, **status** (`active` / `inactive` / `paused`)
- **Applies to** — ce vehicule sau grupuri acoperă regula
- **Conditions** — criterii suplimentare pe care trebuie să le satisfacă triggerul
- Evidența execuției: **număr de execuții**, **ultima rulare**, **istoricul execuțiilor**

## Fluxul de creare planificat

Crearea regulilor va fi un wizard în trei pași:

1. **Trigger** — nume, descriere, tipul de trigger și parametrii lui
2. **Action** — alegi tipul de acțiune
3. **Review** — regula e redată ca o propoziție în limbaj natural, _„When {trigger}, {action}"_, ca s-o verifici înainte de salvare

## Întrebări frecvente

- **Comutatorul nu se mișcă — permisiuni?** Nu. E dezactivat pentru toți cât timp funcția e finalizată; interfața o spune direct. Așteptat.
- **Ce măsoară success rate?** Ponderea execuțiilor de reguli finalizate cu succes în fereastra fixă de 30 de zile a panoului Insight.
- **Pot exprima „baterie sub 20% ȘI mai veche de un an"?** Regulile au o listă de conditions în model, dar editorul de condiții nu e încă disponibil.

## Sfaturi

- **Gândește în perechi trigger → acțiune de pe acum** — regulile notate („la fiecare 30 de zile → programează service", „eveniment IoT de defecțiune → creează sarcină") fac pornirea automatizării trivială când se lansează.
- **Urmărește „triggered today" odată live** — o regulă care se declanșează mult mai des decât te aștepți e configurată greșit; pune-o pe pauză (status `paused`) în loc s-o ștergi.
