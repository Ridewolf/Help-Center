# Pierwsze kroki — Podstawy aplikacji użytkownika

To jest przewodnik dla nowego użytkownika: od instalacji aplikacji do pierwszej jazdy. Zawiera też zasady decydujące, czy jazda może się rozpocząć, aby Twój zespół wsparcia mógł odpowiedzieć na pytanie „dlaczego nie mogę jechać?” bez zgadywania.

Pełny ekran mapy aplikacji znajdziesz w [Overview](overview.md).

## Co może zrobić użytkownik

- Znaleźć współdzielone pojazdy w pobliżu na mapie, zeskanować lub stuknąć w jeden i z niego skorzystać
- Utrzymywać saldo portfela i doładowywać je z poziomu aplikacji
- Przeglądać przeszłe przejazdy i płatności, z rozbiciem kosztów na każdy przejazd
- Kontaktować się z pomocą przez kanały, które włączysz, lub przez czat na żywo
- Zarządzać kontem: imię, zdjęcie, hasło, zalogowane urządzenia

Subskrypcje i kody promocyjne nie są obecnie dostępne w aplikacji — zobacz [Subscriptions](../money/subscriptions.md).

## Przed rozpoczęciem

- Użytkownik musi mieć zainstalowaną aplikację operatora na telefonie
- Użytkownik musi mieć jeden z włączonych przez Ciebie sposobów logowania w **Ustawienia → Moja firma → Aplikacja → Metody uwierzytelniania** (zobacz [Moja firma](../../settings/administration/my-company.md))
- Do utworzenia konta nie jest potrzebna karta ani konfiguracja płatności — to następuje później, w **Portfelu**

## Pierwsza konfiguracja

### 1. Zaloguj się

Nie ma jednego stałego procesu logowania. Ekran logowania pokazuje jedną zakładkę na każdą włączoną metodę, a możliwe metody to jednorazowy kod przez telefon, jednorazowy kod przez e-mail, kod WhatsApp, e-mail i hasło, Google, Apple, Telegram i Viber.

Opisz to użytkownikowi jako „zaloguj się jedną z metod oferowanych przez Twojego operatora” — nie jako „wpisz swój numer telefonu i czekaj na SMS”. Pola w zakładkach i kroki wpisywania kodu są w [Signing in](../account/registration-login.md).

### 2. Ukończ onboarding

Nowy użytkownik przechodzi onboarding przed dotarciem do mapy. Niektóre kroki są warunkowe, więc dwóch użytkowników u różnych operatorów może zobaczyć różną liczbę ekranów. Kolejność to:

1. **O mnie** — trzyetapowy kreator: opcjonalne zdjęcie, potem imię i data urodzenia, następnie dane kontaktowe i pole zgody marketingowej. **To ten krok faktycznie tworzy konto.**
2. **Prawo jazdy** — tylko gdy ustawienia firmy to włączają (domyślnie nie)
3. **Paszport** — tylko gdy włączone w ten sam sposób
4. **Uprawnienia** — powiadomienia, lokalizacja, kamera
5. **Gratulacje** — potem przejście do mapy

Konfiguracja karty lub płatności **nie** jest częścią onboardingu. Użytkownik dodaje metodę płatności później, z ekranu **Portfel**, kiedy chce doładować.

Dwie rzeczy do zapamiętania przed przeprowadzeniem użytkownika przez onboarding: kroki z dokumentami nie mogą zostać ukończone (przesyłanie dokumentów nie jest obecnie dostępne w aplikacji), a po przyznaniu uprawnień przyciski **Kontynuuj** i **Pomiń** obecnie wracają do kreatora **O mnie** zamiast przejść dalej. Szczegóły: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Zacznij jeździć

Onboarding kończy się na mapie. Stamtąd użytkownik wybiera pojazd ([Map](../riding/map.md)) i rozpoczyna przejazd ([Rides](../riding/rides.md)).

## Sekcje aplikacji

| Sekcja             | Ścieżka                   | Co użytkownik tam robi                                      |
| ------------------- | ------------------------- | ---------------------------------------------------------- |
| **Mapa**            | `/map`                    | Ekran główny — znajdź i wybierz pojazd                     |
| **Portfel**         | `/wallet`                 | Saldo, bonusy, doładowanie, automatyczne doładowanie       |
| **Metody płatności**| `/wallet/payment-methods` | Zapisane karty, oczekujące doładowania                      |
| **Historia**        | `/history`                | Zakładki **Przejazdy** i **Płatności**; stuknij przejazd, by zobaczyć szczegóły, mapę trasy i rozbicie kosztów |
| **Profil**          | `/profile`                | Informacje o koncie, zdjęcie, hasło, usunięcie konta       |
| **Ustawienia**      | `/settings`               | Powiadomienia, wyświetlanie mapy, język, motyw             |
| **Sesje**           | `/settings/sessions`      | Wszystkie zalogowane urządzenia                             |
| **Prywatność**      | `/privacy`                | Polityka prywatności i zasady bezpieczeństwa               |
| **Wsparcie**        | `/support`                | Zakładki **FAQ** i **Kontakt**, plus czat na żywo          |

Wszystkie te sekcje otwierają się z **menu bocznego** na mapie. W aplikacji nie ma dolnego paska zakładek.

## Zasady rządzące przejazdem

Są one rzeczywiste i zależą od Twojej konfiguracji. Sprawdzaj wartości w Pulpicie, zamiast podawać je z pamięci.

| Zasada                          | Skąd pochodzi                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Minimalne saldo do startu**   | Minimalne saldo startowe taryfy, stosowane tylko do użytkowników bez powiązanej karty. Gdy taryfa tego nie ustawia, zasada to po prostu „saldo powyżej zera”. Sprawdź wartość w taryfie — zobacz [Taryfy pojazdów](../../settings/infrastructure/vehicle-tariffs.md) |
| **Gdzie można zakończyć przejazd** | Twoje strefy. Zakończenie poza dozwoloną strefą parkowania jest odrzucane, a aplikacja pokazuje dedykowany dialog — zobacz [Strefy](../../settings/infrastructure/zones.md) |
| **Zdjęcia przed i po przejeździe** | Ustawienia Twojej firmy: zdjęcia pojazdu i selfie na start przejazdu oraz zdjęcia parkowania na koniec. Każde może być włączone, oznaczone jako wymagane i mieć określoną liczbę zdjęć. Domyślnie wszystkie są włączone, z jednym zdjęciem i nie są wymagane |

Jeszcze jedna zasada dotycząca zdjęć: gdy selfie na start przejazdu jest włączone, wznowienie przejazdu po pauzie również wymaga selfie i **tego nie można pominąć**.

Krok po kroku dla wszystkich powyższych: [Przejazdy](../riding/rides.md).

## Przed udzieleniem porady jeźdźcowi

- **Warto włączyć powiadomienia** — przełączniki powiadomień o przejazdach i promocjach w [Ustawieniach](../help/settings.md) są prawdziwe i działają
- **Podsumowania znajdują się w Historii**, a nie na ekranie Analiz
- **Przesyłanie dokumentów nie jest obecnie dostępne w aplikacji** — nigdy nie mów jeźdźcowi, że dokument został odebrany lub jest w trakcie weryfikacji
- **Subskrypcje i kody promocyjne nie są obecnie dostępne w aplikacji**

## Kolejne kroki

- [Logowanie](../account/registration-login.md) — każda metoda logowania, pole po polu
- [Wprowadzenie i weryfikacja](../account/onboarding-verification.md) — czego wymaga każdy krok wprowadzenia
- [Portfel](../money/wallet.md) — pierwsza wpłata
- [Wsparcie](../help/support.md) — jak jeźdźcy kontaktują się z Twoim zespołem
