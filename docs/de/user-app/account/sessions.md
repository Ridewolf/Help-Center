# Sitzungen — Geräte, die im Konto angemeldet sind

Der Bildschirm **Sitzungen** (`/settings/sessions`) listet jeden Ort auf, an dem das Konto eines Riders derzeit angemeldet ist, und ermöglicht es ihnen, diese Abmeldungen durchzuführen. Es ist der Bildschirm, den man aufrufen sollte, wenn ein Rider vermutet, dass jemand anderes Zugriff auf sein Konto hat.

Zwei Einstiegspunkte, die beide hierher führen:

- **Profil → Sitzungen verwalten**
- **Einstellungen → Datenschutzkarte → Sitzungen verwalten**

## Wie die Liste organisiert ist

Sitzungen sind **nach Gerät gruppiert** — Browser und Version, Betriebssystem und Version, Gerätetyp, Hersteller und Modell — sodass dasselbe Telefon nur einmal statt dutzendfach erscheint.

Die Gruppen sind bewusst sortiert:

1. Zuerst das aktuelle Gerät des Riders
2. Dann nach Status: **aktiv**, dann **inaktiv**, dann **alt**
3. Dann nach letzter Aktivität, neueste zuerst

Jede Gruppe ist einklappbar. Beim Aufklappen werden alle einzelnen Sitzungen dieses Geräts angezeigt.

## Einen Geräteblock lesen

| Was Sie sehen                      | Bedeutung                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| **Gerätebezeichnung**             | Hersteller und Modell, wenn bekannt, sonst das Betriebssystem und dessen Version          |
| Geräte-Typ-Symbol                 | Telefon, Tablet oder Monitor                                                              |
| **Browserbezeichnung**            | Der Browser und die Version hinter der Sitzung                                            |
| **Sitzungsstatus**-Abzeichen      | Siehe die Tabelle unten                                                                   |
| **Letzte Aktivität**              | Relative Zeit — „gerade eben“, vor N Minuten / Stunden / Tagen, und ein absolutes Datum, wenn es älter als eine Woche ist |
| **Anzahl der Sitzungen**          | Wie viele Sitzungen dieses Gerät hat                                                     |
| **Standort**                     | Stadt, Land und IP-Adresse                                                                |
| **Erstellt am**                  | Wann diese Sitzung gestartet wurde                                                       |
| **Aktuelles Gerät** / **Aktuelle Sitzung** | Hervorgehobenes Abzeichen am Gerät und an der Sitzung, die der Rider gerade benutzt |

### Status-Abzeichen

| Abzeichen    | Bedeutung                            |
| ------------ | ---------------------------------- |
| **aktiv**    | Letzte Aktivität vor weniger als einer Stunde |
| **inaktiv**  | Letzte Aktivität vor weniger als 24 Stunden |
| **alt**      | Letzte Aktivität vor 24 Stunden oder mehr  |

Das Abzeichen misst nur die **Aktualität** — es sagt nicht aus, ob eine Sitzung noch gültig ist. Ein "alt"-Abzeichen bedeutet nicht, dass die Sitzung abgelaufen ist.

## Eine Sitzung abmelden

Die aktuelle Sitzung hat keine Löschfunktion — das ist so gewollt, sie kann nicht aus dieser Liste entfernt werden. Jede andere Sitzung kann entfernt werden:

1. Die Gerätegruppe aufklappen
2. Auf das **Papierkorb**-Symbol bei der Sitzung tippen
3. Im Dialog bestätigen

Die Liste wird neu geladen und die Sitzung ist verschwunden.

## Massenaktionen

| Aktion                      | Was sie bewirkt                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Andere Sitzungen abmelden** | Meldet alle Sitzungen ab, außer der auf dem Gerät, das der Rider gerade benutzt. Dies ist die richtige Aktion, wenn ein Rider vermutet, dass jemand anderes Zugriff hat |
| **Alle Sitzungen abmelden**   | Meldet alle Sitzungen ab, **einschließlich des aktuellen Geräts**, sodass der Rider zum Anmeldebildschirm zurückkehrt und sich erneut anmelden muss. Aus diesem Grund als destruktiv gekennzeichnet |
| **Gerät widerrufen**          | Wird bei einer aufgeklappten Gerätegruppe angeboten, die nicht das aktuelle Gerät ist — meldet alle Sitzungen auf diesem Gerät ab |

Während eine Abmeldeanforderung läuft, sind die Schaltflächen deaktiviert. Ein Fehler zeigt eine kurze Fehlermeldung; ein Erfolg zeigt eine Bestätigung und lädt die Liste neu.

## Typische Arbeitsabläufe

- **Der Rider vermutet, dass jemand anderes in seinem Konto ist** — **Andere Sitzungen abmelden**, dann das Passwort im **Profil** ändern. Beachten Sie, dass eine erfolgreiche Passwortänderung den Rider ebenfalls abmeldet, sodass er sich danach erneut anmelden muss ([Profil](profile.md))
- **Eine vergessene Anmeldung auf einem geliehenen Telefon** — diese Gerätegruppe aufklappen, **Gerät widerrufen**
- **Überall neu starten** — **Alle Sitzungen abmelden**, dann erneut anmelden ([Anmelden](registration-login.md))

## FAQ

- **Warum kann der Rider seine aktuelle Sitzung nicht löschen?** Für diese wird keine Löschfunktion angezeigt. Um die aktuelle Sitzung zu beenden, verwenden Sie **Alle Sitzungen abmelden** oder die normale **Abmelden**-Schaltfläche im Profil.
- **Was bedeutet "aktiv" genau?** Aktivität innerhalb der letzten Stunde — nichts weiter.
- **Warum zeigt ein Telefon mehrere Sitzungen an?** Sitzungen werden pro Anmeldung erstellt. Der Bildschirm gruppiert sie unter einem Gerät und zeigt die Anzahl an.
- **Die Schaltfläche "Sitzungen verwalten" ist ausgegraut.** Das Konto hat eine ausstehende Löschung, die die Sitzungsverwaltung zusammen mit der Profilbearbeitung deaktiviert — siehe [Profil](profile.md).

## Verwandte Themen

- [Profil](profile.md) — Passwort ändern, abmelden, Konto löschen
- [Einstellungen](../help/settings.md) — die Datenschutzkarte, die auch hierher verlinkt
- [Datenschutz](privacy.md) — Datenschutzrichtlinie und Sicherheitsrichtlinien
