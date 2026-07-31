# Ogólne

Strona Ogólne (`/settings/general`) to **panel sterowania systemem na poziomie całej firmy** — jedno miejsce do ustawiania domyślnych wartości dotyczących aplikacji Rider App, floty, cen, przejazdów, powiadomień oraz przełączników dla deweloperów. Wszystko tutaj ma zastosowanie globalne dla całej firmy; nadpisania dla poszczególnych pojazdów lub taryf znajdują się w [Ustawieniach pojazdu](../infrastructure/vehicle-settings.md) i [Taryfach pojazdów](../infrastructure/vehicle-tariffs.md).

> _Uwaga_: ta strona jest obecnie **ekranem tylko front-endowym** — każda wartość jest przechowywana w stanie lokalnym, a przycisk **Zapisz** wyświetla tylko potwierdzenie w formie toastu. Dane nie są jeszcze wysyłane do backendu. Traktuj to jako specyfikację / interfejs testowy dla nadchodzącego API.

Ścieżka `/settings/general-settings` to osobny, niemal pusty **placeholder** z pojedynczą ilustracją i nagłówkiem. Prawdziwy ekran konfiguracji to `/settings/general` (ten artykuł) — tam znajdują się wszystkie sześć zakładek.

Wymagane uprawnienia: w routerze nie ustawiono żadnych specyficznych `requiredPermissions` — stronę może otworzyć każdy zalogowany operator.

## Zakładki

Strona ma sześć zakładek u góry (na komputerze). Na urządzeniach mobilnych te same zakładki zwijają się w akordeon z napisem _Użyj komputera, aby uzyskać pełną konfigurację_ — te ustawienia są przeznaczone wyłącznie dla administratorów.

| Zakładka      | Ikona       | Co obejmuje                                                                                             |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| Aplikacja     | suwaki      | Wymuszanie aktualizacji aplikacji, domyślna widoczność modułów, flagi funkcji, limity zapytań, domyślne ustawienia pojazdów |
| Lokalizacja   | glob        | Domyślny język, strefa czasowa, włączone języki, formaty daty / czasu / jednostek, dostawca map + stylizacja stref |
| Cennik       | znak dolara | Domyślne ceny, szablony taryf, polityka rabatów/promocji, domyślne subskrypcje                          |
| Przejazdy    | samochód    | Zasady rezerwacji i przejazdów, auto-pauza/auto-stop, kary, przetwarzanie płatności                    |
| Powiadomienia| dzwonek     | Przełączniki kanałów (push / e-mail / SMS) i szablony wiadomości dla zdarzeń w aplikacji Rider App     |
| Zaawansowane | kod         | Integracje, bezpieczeństwo, retencja prywatności, strony prawne, flagi deweloperskie, konserwacja systemu |

Przyklejony pasek u dołu z przyciskami **Odrzuć** i **Zapisz zmiany** pojawia się tylko po faktycznej zmianie pola — strona używa `useFormState` do porównania z załadowanym stanem.

## Sekcje w zakładkach

### Aplikacja

Dwie ułożone karty.

**Domyślne ustawienia aplikacji**

- _Wymagaj aktualizacji aplikacji_ — przełącznik + pole tekstowe na minimalną wersję (wyłączone, dopóki przełącznik jest wyłączony). Jeśli włączone, aplikacja Rider App zablokuje użytkowników z wersją poniżej tej wartości.
- _Domyślna widoczność modułów_ — cztery przełączniki (Marketing, Rebalans, Wsparcie, Analizy), które ustawiają, które moduły widzą nowi operatorzy.
- _Flagi funkcji_ — cztery przełączniki (Śledzenie na żywo, Zaawansowane statystyki, Wielowalutowość, White-label).
- _Limit zapytań API_ / _Limit zapytań UI_ — pola numeryczne (domyślnie 1000 / 100 zapytań na minutę).

**Domyślne ustawienia pojazdu**

- _Domyślny zestaw ikon_ — wyszukiwalna lista rozwijana z nazwami zestawów ikon (obecnie cztery sztywno zakodowane przykłady: Domyślne ikony / Zestaw nowoczesny / Minimalistyczny / Kolorowy pogrubiony; prawdziwa lista będzie pochodzić z [Zestawów ikon](../content/icon-sets.md)).
- _Progi baterii_ — dwa pola numeryczne (niski %, krytyczny %). Walidacja przy zapisie: krytyczny musi być niższy niż niski, w przeciwnym razie pojawi się błąd w toast.
- _Wagi wskaźnika stanu_ — trzy pola procentowe (sygnał / błędy / bateria). Walidowane, aby suma wynosiła 100 przy zapisie.
- _Automatyczne tagi_ — ciąg tagów oddzielonych przecinkami, które są automatycznie przypisywane nowym pojazdom.

### Lokalizacja

- _Domyślny język_ / _Strefa czasowa_ — wybór.
- _Włączone języki_ — wieloelementowa lista; X do usunięcia.
- _Początek tygodnia_ — poniedziałek / niedziela.
- _Format daty_ — DD/MM/YYYY, MM/DD/YYYY, ISO itd.
- _Format czasu_ — 12h / 24h.
- _Jednostka temperatury_ — Celsjusz / Fahrenheita.
- _Jednostka odległości_ — km / mi.
- _Waluta wyświetlana_ — domyślnie EUR (TODO w kodzie: pobrać z API firmy).
- _Zaokrąglanie cen_ — brak / do najbliższych 0,05 / itd.

**Mapy** (osobna karta na tej samej zakładce)

- _Dostawca_ (domyślnie MapTiler) i _Styl_ (jasny / ciemny / satelita).
- _Klucz API_ — pole tekstowe na klucz dostawcy.
- _Domyślne powiększenie_ + _Domyślny środek_ — używane, gdy brak kontekstu GPS.
- _Stylizacja stref_ — kolor + szerokość obrysu dla poligonów Parking / Zakaz / Niska prędkość / Płatny parking. Wybór z palety 12 kolorów.
- _Limit prędkości niskiej_ — pole numeryczne (km/h).

### Cennik

Cztery karty: _Domyślne ceny_, _Szablony taryf_, _Rabaty i promocje_, _Subskrypcje_. Ustawiają **wartości zapasowe** — faktyczne ceny przejazdów są nadpisywane per pojazd w [Taryfach pojazdów](../infrastructure/vehicle-tariffs.md).

- Domyślne ceny: opłata za odblokowanie, cena/min, cena/km, płatne oczekiwanie, darmowe minuty rezerwacji, dwustopniowy rabat oparty na liczbie przejazdów.
- Szablony taryf: według okresu (minuta / godzina / dzień / tydzień / miesiąc / rok) — cena, maksymalny czas trwania, przełącznik darmowego parkowania, przełącznik włączony. Plus _zezwól na nakładanie się_.
- Rabaty i promocje: maksymalny % rabatu, prefiks promocji (domyślnie `WOLF`), domyślna liczba dni ważności oraz zasady nakładania się.
- Subskrypcje: domyślny % rabatu, dni próbne, automatyczne odnawianie, zezwolenie na kody promocyjne.

### Przejazdy

- Zasady rezerwacji i przejazdów: darmowe minuty rezerwacji, maksymalna liczba aktywnych rezerwacji na klienta, minimalne saldo do rozpoczęcia, auto-pauza + auto-stop (każde z włącznikiem + progiem).
- Kary: dwa typy kar (Poza strefą, Nieprawidłowe parkowanie) — każda z kwotą opłaty i tekstem ostrzeżenia.
- _Domyślny szybki przewodnik_ — lista rozwijana pobierana z placeholdera; będzie pochodzić z [Szybkich przewodników](../content/quick-guides.md).
- _Domyślny zestaw FAQ_ — lista rozwijana pobierana z [Zestawów FAQ](../content/faq-sets.md).
- Karta płatności: 3-D Secure, tryb przechwytywania (natychmiastowy / pre-autoryzacja), kwota pre-autoryzacji, czas trzymania (godziny), polityka zwrotów, maksymalny okres zwrotu (dni).

### Powiadomienia

- _Kanały_ — trzy przełączniki (Push / E-mail / SMS) — kontrolują, które kanały są dostępne w aplikacji Rider.
- _Szablony_ — tytuł + tekst treści dla trzech podstawowych zdarzeń: rozpoczęcie przejazdu, zakończenie przejazdu, nałożenie kary. Zmienne takie jak `{{amount}}` / `{{reason}}` są podstawiane przez backend.
- Przycisk **Test powiadomienia** wyświetla powiadomienie informacyjne (jeszcze bez faktycznego wysłania).

Dla **operatora** potoku alertów zobacz [Alerts & Notifications](alerts-notifications.md) — ta zakładka dotyczy strony aplikacji Rider.

### Zaawansowane

Pięć kart.

- _Integracje_ — endpoint webhook + sekret, ID Google Analytics, DSN Sentry, ciągi botów Telegram i Slack. Przycisk **Test webhooka** wyświetla powiadomienie.
- _Bezpieczeństwo_ — przełącznik wymogu 2FA, timeout sesji (minuty), polityka haseł (minimalna długość + wielkie litery/cyfry/znaki specjalne), klucze reCAPTCHA, lista dozwolonych IP, rozwijane ograniczenia eksportu.
- _Prywatność_ — przechowywanie danych w dniach (telemetria / media / logi), przełącznik anonimizacji GPS, SLA eksportu i SLA usuwania w dniach.
- _Prawne_ — Regulamin + Polityka prywatności jako pola tekstowe Markdown, plus wersja i data publikacji.
- _Deweloper / Zaawansowane_ — tryb sandbox, poziom logów, adresy endpointów produkcyjnych i testowych, przełączniki eksperymentów (AI routing, predictive maintenance, dynamic pricing).
- _System / Konserwacja_ — przełącznik trybu konserwacji + tekst banera + przełącznik trybu tylko do odczytu.
- _Audyt i kopie zapasowe_ — przyciski _Utwórz kopię zapasową_ i _Usuń wszystkie dane_ (oba wyświetlają powiadomienia; usuwanie wymaga _potwierdzenia administratora_ — jeszcze nie podłączone).

## Przepływy pracy

- **Zablokuj nową wersję** — zakładka App → włącz _Wymagaj aktualizacji aplikacji_ → ustaw minimalną wersję → Zapisz. Użytkownicy starszych wersji otrzymają monit o aktualizację.
- **Dodaj język** — zakładka Locale → _Włączone języki_ → wybierz chip lokalizacji → Zapisz. Ciągi tekstowe trzeba jeszcze przetłumaczyć przez [Localization](localization.md).
- **Dostosuj UX kary dla użytkownika** — zakładka Rides → zmień opłatę za wyjazd poza strefę + tekst ostrzeżenia → Zapisz.
- **Wstrzymaj platformę na konserwację** — Zaawansowane → _System / Konserwacja_ → przełącz przełącznik, edytuj tekst banera, opcjonalnie ustaw tryb tylko do odczytu → Zapisz.
- **Wdróż nowy styl mapy** — Locale → karta _Maps_ → wybierz styl → dostosuj kolory stref → Zapisz (zmiany zastosują się globalnie po podłączeniu API).

## Wskazówki

- **Na razie tylko front-end.** Zapis tworzy lokalny snapshot, ale nie wysyła nic do backendu — nie polegaj na tej stronie, by cokolwiek zapisać, dopóki API nie będzie gotowe.
- **Walidacja następuje przy zapisie.** Progi baterii (krytyczny < niski) i wagi oceny stanu (suma 100) są sprawdzane po kliknięciu Zapisz, nie podczas pisania — popraw błąd i spróbuj ponownie.
- **Nie myl z `/settings/general-settings`.** Ta ścieżka istnieje, ale pokazuje tylko pustą kartę — otwórz `/settings/general` dla właściwego ekranu.
- **Odrzuć to twoja siatka bezpieczeństwa** — stopka pojawia się tylko przy niezapisanych zmianach; kliknij _Odrzuć_, by wrócić do załadowanego snapshotu bez opuszczania strony.
- **Mobilna wersja jest celowo ograniczona.** Tylko akordeon App jest podłączony; reszta kieruje do sesji na komputerze.
- **Zwycięstwa na poziomie pojazdu.** Wszystko, co ustawisz w Cenniku / Przejazdach, to domyślny szablon; faktyczna taryfa płacona przez użytkownika pochodzi z Taryfy pojazdu przypisanej do modelu — zobacz [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
