# Ihre App (White-Label)

Die Seite Ihre App (`/settings/your-app`) ist ein **Assistent, der alles sammelt, was benötigt wird, um eine gebrandete Rider App unter Ihrer eigenen Identität zu erstellen und zu veröffentlichen** — App-Name, Domain, Markenassets, Store-Listing-Texte, Screenshots und rechtliche Links. Eine Live-Gerätevorschau neben dem Formular zeigt Ihre Auswahl auf simulierten iPhone- und Android-Bildschirmen, während Sie tippen.

Sie finden sie in der Seitenleiste unter **Einstellungen → Ihre App**.

Der Assistent hat acht Schritte: **Identität → Domain → Assets → Listing → Shots → Rechtliches → Publisher → Überprüfung**. Dieser Artikel behandelt die ersten sechs; Publisher und Überprüfung werden in [Your App: Publisher & Submission](your-app-publisher.md) behandelt.

## Status-Lebenszyklus

Eine Statuskarte oben zeigt, wo sich Ihre App befindet, mit Version und Zeitstempeln:

**Entwurf → Bereitstellung → In Prüfung → Produktion**, oder **abgelehnt**.

- Der Assistent ist **bearbeitbar**, solange der Status `draft` oder `rejected` ist — eine Ablehnung öffnet das Formular wieder, damit Sie beheben können, was der Store beanstandet hat.
- Er ist **schreibgeschützt**, solange die Pipeline die App verwaltet: `provisioning`, `in-review` und `production`. In diesen Zuständen ist die Seite eine Zusammenfassung, und Store-Links — **TestFlight, Play internal testing, App Store, Play Store** — erscheinen, sobald sie verfügbar sind.

## Identitätsschritt

- **App-Name** (erforderlich) — er **leitet automatisch die iOS-Bundle-ID, die Android-Bundle-ID und die Subdomain ab**, daher sorgfältig wählen.
- **Bundle-Override** — ein Umschalter, der die manuelle Eingabe der iOS- und Android-Bundle-IDs freischaltet, falls die abgeleiteten nicht passen.
- **Icon-Farbe** — ein Hex-Wert, der für das App-Icon-Gehäuse und den Hintergrund des Splash-Screens verwendet wird.

## Domain-Schritt

- **Domain-Typ** — eine Auswahl zwischen **Subdomain** (abgeleitet vom App-Namen) und **benutzerdefiniert**.
- **Benutzerdefinierte Domain** — ein Textfeld, das nur erscheint, wenn der Typ `custom` ist.

## Assets-Schritt

- **Monochrom** Umschalter — entscheidet, ob ein Satz von Grafiken für beide Themes verwendet wird.
- **Symbol** und **Wortmarke** — immer erforderlich.
- **Dunkel-Theme Symbol / Wortmarke** — wird nur angezeigt, wenn Monochrom aus ist, also wenn Sie separate helle und dunkle Grafiken bereitstellen.

Die Dropzone akzeptiert Drag-and-Drop oder eine eingefügte URL. Direkter Binär-Upload ist noch nicht verfügbar — liefern Sie jedes Asset vorerst als URL.

## Listing-Schritt

Store-Listing-Texte mit von den Eingabefeldern erzwungenen Zeichenbegrenzungen:

| Feld                  | Begrenzung                                  |
| --------------------- | ------------------------------------------- |
| **Untertitel**        | 30 Zeichen                                 |
| **Kurzbeschreibung**  | 80 Zeichen                                 |
| **Promo-Text**        | 170 Zeichen (App Store Werbetext)          |
| **Schlüsselwörter**   | 100 Zeichen, durch Kommas getrennt          |
| **Vollständige Beschreibung** | 4000 Zeichen                          |

- **Kategorie** — Reisen, Navigation, Sport, Lifestyle, Gesundheit & Fitness oder Business.
- **Store-Sprachen** — wählen Sie aus dem unterstützten Lokalisierungsset. Die **erste ausgewählte Sprache ist die Basis**; jede weitere Sprache erhält einen eigenen Tab mit sprachspezifischen Überschreibungen für Untertitel, Beschreibungen, Promo-Text und Schlüsselwörter. Felder, die in einer Überschreibung leer bleiben, fallen auf die automatische Übersetzung aus der Basissprache zurück.

## Shots-Schritt

Sechs feste Screenshot-Varianten, jeweils mit einem **Überschrift** und einem **Untertitel**: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. Die Live-Gerätevorschau in der rechten Spalte rendert sie mit Ihren Markenassets und aktualisiert sich beim Tippen.

## Rechtliches

Datenschutzerklärung, Nutzungsbedingungen, Support-URL, Support-E-Mail, Support-Telefon und Marketing-URL. Diese werden **vorbefüllt aus dem [Mein Unternehmen](my-company.md) Profil**, wo immer dort Werte vorhanden sind — zuerst Mein Unternehmen auszufüllen spart Arbeit.

## Häufige Fragen

- **Bundle-IDs sehen falsch aus.** Sie werden vom App-Namen abgeleitet — aktivieren Sie das Bundle-Override, um sie explizit zu setzen.
- **Dunkel-Variante Asset-Felder fehlen.** Sie erscheinen nur, wenn Monochrom aus ist.
- **Ich kann nichts mehr bearbeiten.** Der Status ist `provisioning`, `in-review` oder `production` — die Pipeline verwaltet die App dann. Die Bearbeitung wird automatisch wieder geöffnet, wenn die Einreichung abgelehnt wird.
- **Der Untertiteltext wird abgeschnitten.** Die Begrenzung liegt bei 30 Zeichen — kürzer als erwartet.
- **Das Feld für benutzerdefinierte Domain ist nicht sichtbar.** Stellen Sie zuerst den Domain-Typ auf `custom`.
- **Die Seite zeigt einen "lokalen Entwurf"-Hinweis.** Ihre Änderungen werden nur in diesem Browser gespeichert und sind noch nicht synchronisiert — gehen Sie nicht davon aus, dass sie automatisch erhalten bleiben; prüfen Sie das Formular erneut, sobald der Hinweis verschwunden ist.
