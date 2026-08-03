# Rider App — Karte, Reservierungen & Scannen

Die Karte (`/map`) ist der Startbildschirm der Rider App und der letzte Schritt des Onboardings. Sie zeigt drei Dinge: die eigene Position des Fahrers, die verfügbaren Fahrzeuge in der Umgebung und die von Ihnen für Ihr Betriebsgebiet gezeichneten Zonen.

Support-Mitarbeiter verbringen mehr Zeit auf diesem Bildschirm als auf jedem anderen, da die häufigste Fahrerbeschwerde — _„es gibt keine Möglichkeit, eine Fahrt zu starten“_ — fast immer hier beantwortet wird, unter [Die untere Leiste ist bedingt](#die-untere-leiste-ist-bedingt).

Für die Fahrt selbst (Starttore, Pause, Beenden, Fotobeweise) siehe [Fahrten](rides.md). Für die Betreiberseite der Zonen siehe [Zonen](../../settings/infrastructure/zones.md).

## Navigationsbereich

Die **Menü**-Taste öffnet die Seitenleiste — die einzige Navigation der App. Es gibt keine untere Tab-Leiste. Die Seitenleiste enthält:

| Eintrag in der Seitenleiste | Öffnet                                      |
| --------------------------- | ------------------------------------------- |
| Zeile Guthaben Wallet       | [Wallet](../money/wallet.md)                 |
| **Verlauf**                 | [Verlauf](../money/history.md)               |
| **Support**                 | [Support](../help/support.md)                 |
| **Datenschutz**             | Den Bildschirm mit Datenschutz- und Sicherheitsrichtlinien |
| **Einstellungen**           | [Einstellungen](../help/settings.md)         |
| **Profil**                  | Den Profilbildschirm des Fahrers             |

Promotionen und Abonnements sind derzeit in der App nicht verfügbar, und die Seitenleiste enthält keine Einträge dafür — siehe [Subscriptions & Promo Codes](../money/subscriptions.md).

## Bedienelemente auf dem Bildschirm

**Obere Bedienelemente**

- **Menü** — öffnet die oben beschriebene Seitenleiste
- **Wie man fährt** — öffnet das Hilfefenster innerhalb der App (die Inhalte der In-App-Anleitung werden über [Schnellstartanleitungen](../../settings/content/quick-guides.md) verwaltet)
- **Mein Standort** — zentriert die Karte auf den Fahrer

**Untere Leiste**

| Taste          | Wann sie erscheint                                                                                 | Was sie bewirkt                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Gruppenfahrt** | Mit der unteren Leiste                                                                            | Öffnet den Gruppenfahrt-Prozess                                                       |
| **Scannen**    | Mit der unteren Leiste                                                                            | Öffnet den QR-Scanner (`/ride/start`), mit einem manuellen Eingabeblatt für Fahrzeugcodes als Fallback |
| **Filter**     | Nur wenn der Fahrer private Fahrzeug-Tags zum Filtern hat und sich nicht bereits auf einer Fahrt oder Reservierung befindet | Filtert die Marker nach diesen Tags                                                   |

### Die untere Leiste ist bedingt

Die untere Leiste wird **nur angezeigt, wenn der Fahrer Zugriff auf Fahrzahlungen hat** — das heißt entweder eine verknüpfte Karte oder einen Zahlungsanbieter, der keine gespeicherten Karten unterstützt.

Ein Fahrer ohne **verknüpfte Karte bei einem Anbieter, der gespeicherte Karten unterstützt, sieht keine untere Leiste**, und somit weder die **Scannen**-Taste noch die **Gruppenfahrt**-Taste. Das ist beabsichtigt und die häufigste Ursache für „die App lässt mich keine Fahrt starten“.

Die Lösung: Leiten Sie ihn zu **Wallet → Zahlungsmethoden verwalten → Karte hinzufügen**. Siehe [Zahlungsmethoden](../money/payment-methods.md).

Wenn die **Filter**-Taste fehlt, hat der Fahrer einfach keine privaten Fahrzeug-Tags — oder er befindet sich bereits auf einer aktiven Fahrt oder Reservierung.

## Fahrzeug finden

1. Die eigene Position des Fahrers erscheint, sobald die Standortberechtigung erteilt wurde. Diese wird während des Onboardings abgefragt und kann in den Systemeinstellungen des Geräts erneut erteilt werden.
2. Verfügbare Fahrzeuge erscheinen als Marker.
3. Ein Tippen auf einen Marker öffnet das Fahrzeug-Detailblatt — Tarifpläne plus **Start** und **Reservieren**.
4. Schwenken, Zoomen mit zwei Fingern und die **Mein Standort**-Taste verhalten sich wie erwartet.

### Was ein Marker anzeigt, ist teilweise die Wahl des Fahrers

Diese [Einstellungen](../help/settings.md) ändern, was die Karte anzeigt:

- **Batteriestand anzeigen**
- **Promotionsfahrzeuge anzeigen**
- **Preise anzeigen**
- **Automatischer Zoom**
- **3D-Karte**

Bonuszonen auf der Karte und das Banner für rabattierte Fahrzeuge im Fahrzeugblatt sind derzeit in der App nicht verfügbar.

## Zonen

Zonen regeln, wo ein Fahrzeug gefahren werden darf und wo eine Fahrt beendet werden kann. Ein Tippen auf eine Zone öffnet das Zonen-Informationsblatt.

Was eine bestimmte Zone tatsächlich bewirkt — eingeschränktes Gebiet, Parkverbot, Geschwindigkeitsbegrenzung, Zuschlag — ergibt sich vollständig aus Ihrer Konfiguration in [Zonen](../../settings/infrastructure/zones.md). Es gibt keinen universellen Farbcode, den Sie einem Fahrer nennen können; beschreiben Sie Ihre eigene Konfiguration.

Die am häufigsten von Fahrern betroffene Zonenregel ist das Parken: **das Beenden einer Fahrt außerhalb einer erlaubten Parkzone wird abgelehnt**, und die App öffnet einen speziellen Dialog, der anbietet, die Zonen auf der Karte anzuzeigen. Dieser Ablauf ist dokumentiert in [Fahrten](rides.md#außerhalb-der-parkzone).

## Fahrzeug reservieren

**Reservieren** ist eine echte Reservierung mit echtem Timer, und sie wird nach dem Tarif des Fahrzeugs berechnet:

1. Der Fahrer tippt einen Marker an, dann **Reservieren** im Fahrzeugblatt.
2. Das kostenlose Zeitfenster entspricht der **Reservierungszeit** des Tarifs in Minuten. Währenddessen zählt die Reservierungskarte **herunter**.
3. Nach Ablauf des kostenlosen Zeitfensters wird die Reservierung zu einer **bezahlten Reservierung**: Die Karte zählt **hoch**, und der **bezahlte Reservierungspreis** pro Minute des Tarifs gilt.
4. Der bezahlte Teil der Reservierung erscheint dann als eigene Zeile in der Kostenaufstellung der abgeschlossenen Fahrt.

Wissenswerte Hinweise, bevor Sie einem Fahrer antworten:

- **Gehen Sie niemals von "ein paar Minuten" aus.** Manche Tarife bieten lange kostenlose Zeitfenster — 12 oder 24 Stunden. Lesen Sie die tatsächliche Zahl im Tarif unter [Fahrzeugtarife](../../settings/infrastructure/vehicle-tariffs.md) ab.
- Wenn der Tarif die **Reservierungszeit** leer lässt, verwendet die App standardmäßig ein kurzes 3-Minuten-Fenster. Wenn der **Bezahlte Reservierungspreis** leer bleibt, gilt ein kleiner Standardpreis pro Minute — setzen Sie beide Werte explizit, damit Fahrer Ihre Zahlen sehen.
- Eine Reservierung befindet sich in einem dieser Zustände: _ausstehend_, _aktiv_, _abgelaufen_, _reserviert_ oder _pausiert_.
- Für eine Reservierung ist **erteilte Standortberechtigung erforderlich**, und sie kann trotzdem abgelehnt werden, weil der Fahrer zu weit vom Fahrzeug entfernt ist oder weil eine Reservierungskühlzeit für dieses Fahrzeug läuft. Jede Ablehnung löst einen eigenen Dialog aus — siehe [Fahrten](rides.md#warum-ein-fahrer-eine-fahrt-nicht-starten-kann).

## Fehlerbehebung

| Fahrer sagt…                      | Was zu prüfen ist                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Ich sehe keine Fahrzeuge“        | Standortberechtigung erteilt? Dann: Befindet sich der Fahrer in einem Gebiet, das Sie tatsächlich bedienen?                                                          |
| „Es gibt keinen Scan-Button“      | Keine verknüpfte Karte bei einem Anbieter, der gespeicherte Karten unterstützt. Fügen Sie eine Karte unter [Zahlungsmethoden](../money/payment-methods.md) hinzu.    |
| „Es gibt keinen Filter-Button“    | Der Fahrer hat keine privaten Fahrzeug-Tags oder befindet sich bereits auf einer Fahrt oder einer Haltezeit.                                                         |
| „Die Karte lädt nicht“            | Zuerst die Verbindung prüfen, dann **Einstellungen → Datenmodus** (_ausgewogen_ / _niedrig_ / _hoch_), der die Kartenkachelqualität und Detailtiefe steuert.          |
| „Die Karte ist langsam / träge“  | Gleiches: Datenmodus auf _niedrig_ setzen und **Reduzierte Animationen** in den [Einstellungen](../help/settings.md) aktivieren.                                     |
| „Ich kann keine Fahrt starten“   | Gehen Sie die Punkte in [Fahrten](rides.md#warum-ein-fahrer-eine-fahrt-nicht-starten-kann) der Reihe nach durch — untere Leiste, Plan und Zahlung, Mindeststartguthaben, Standort, Entfernung, Kühlzeit, Nachweise |

## Tipps

- **Prüfen Sie zuerst die untere Leiste.** Bitten Sie den Fahrer, einen Screenshot der Karte zu senden; eine fehlende untere Leiste diagnostiziert das Problem sofort.
- **Standortberechtigung ist immer die zweite Frage.** Keine Position bedeutet keine Reservierung und in den meisten Fällen keinen Start.
- **Zonen bedeuten nur das, was Sie ihnen zuweisen.** Bevor Sie einem Fahrer sagen „Sie können hier nicht parken“, öffnen Sie die Zone im Dashboard und lesen Sie die tatsächliche Konfiguration.
- **Lange kostenlose Reservierungsfenster überraschen alle**, auch Ihr eigenes Personal. Kennen Sie die **Reservierungszeit** Ihres Tarifs, bevor Sie eine Haltegebühr erklären.
