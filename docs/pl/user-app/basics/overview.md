# Aplikacja użytkownika — Przegląd

Aplikacja użytkownika (aplikacja Rider) to mobilna aplikacja, z której korzystają Twoi klienci, aby znaleźć i korzystać ze współdzielonych pojazdów, doładowywać saldo portfela, przeglądać historię przejazdów oraz kontaktować się z zespołem wsparcia.

Ten artykuł to mapa tej aplikacji: co potrafi, gdzie znajduje się każdy ekran oraz który przewodnik odpowiada na które pytanie. Używaj go jako punktu wyjścia, gdy użytkownik pisze i potrzebujesz dokładnej nazwy ekranu oraz dokładnych kroków.

Aby przejść przez aplikację z perspektywy użytkownika podczas pierwszego uruchomienia, zobacz [Getting started](getting-started.md). Dla aplikacji dla personelu terenowego zobacz [Service app — Overview](../../service-app/basics/overview.md).

## Co potrafi aplikacja

- Mapa pojazdów na żywo jako ekran główny
- Saldo portfela z kilkoma dostawcami doładowań
- Historia przejazdów z rozbiciem kosztów i mapą trasy
- Czat na żywo z wsparciem oraz kanały kontaktowe, które włączysz
- Kilka języków interfejsu, motywy jasny i ciemny
- Zarządzanie sesjami na poziomie urządzenia

## Jak użytkownicy poruszają się po aplikacji

**Mapa** to ekran główny. Wszystko inne otwiera się z **menu bocznego**, które użytkownik wysuwa z mapy — to jedyna powłoka nawigacyjna aplikacji. W aplikacji nie ma dolnego paska kart, więc nigdy nie kieruj użytkownika, by go szukał.

Wiadomości czatu operatora mogą też zawierać linki do aplikacji, które przenoszą użytkownika bezpośrednio do ekranu (na przykład ekranu Prywatność).

## Szybkie odpowiedzi według zadania

### Konto, logowanie i konfiguracja

| Pytanie użytkownika                         | Gdzie jest odpowiedź                                               |
| ------------------------------------------- | ----------------------------------------------------------------- |
| Jak się zalogować?                          | [Signing in](../account/registration-login.md) — dostępne metody pochodzą z ustawień Twojej firmy, więc ekran logowania nie jest taki sam dla każdego operatora |
| Zapomniałem hasła                           | [Signing in](../account/registration-login.md)                    |
| Otworzyłem aplikację z bota Telegram lub Viber | [Signing in](../account/registration-login.md)                  |
| Co się dzieje zaraz po pierwszym logowaniu? | [Onboarding and verification](../account/onboarding-verification.md) |
| Jakie dokumenty są wymagane?                | [Onboarding and verification](../account/onboarding-verification.md) |
| Dlaczego moje konto jest zablokowane?       | [Onboarding and verification](../account/onboarding-verification.md) — ekran **Account Blocked** |
| Pierwsza wycieczka po aplikacji             | [Getting started](getting-started.md)                             |

### Znajdowanie pojazdu i jazda

| Pytanie użytkownika                                         | Gdzie jest odpowiedź                  |
| ------------------------------------------------------------ | ------------------------------------ |
| Jak znaleźć i wybrać pojazd? Jak działa wycena rezerwacji?  | [Map](../riding/map.md)               |
| Jak rozpocząć, wstrzymać i zakończyć przejazd?              | [Rides](../riding/rides.md)           |
| Dlaczego nie mogę rozpocząć przejazdu?                      | [Rides](../riding/rides.md) — obejmuje brak przycisku **Scan**, minimalne saldo startowe, uprawnienia lokalizacji, zbyt dużą odległość od pojazdu, czas oczekiwania po rezerwacji i niedokończone zdjęcia startowe |
| A co z zdjęciem parkingowym na końcu?                       | [Rides](../riding/rides.md) — w tym dialog poza strefą parkowania |
| Z czego składa się koszt mojego przejazdu?                  | [Rides](../riding/rides.md) oraz [History](../money/history.md) |

### Pieniądze i płatności

| Pytanie użytkownika                      | Gdzie jest odpowiedź                                              |
| --------------------------------------- | ---------------------------------------------------------------- |
| Jak doładować?                          | [Wallet](../money/wallet.md) jako punkt startowy, [Payment methods](../money/payment-methods.md) dla pełnego przewodnika po każdym procesie doładowania |
| Jak dodać kartę?                        | [Payment methods](../money/payment-methods.md)                    |
| Jakie są dostępne metody i czym się różnią? | [Payment methods](../money/payment-methods.md)              |
| Moje doładowanie utknęło w oczekiwaniu / chcę je anulować | [Payment methods](../money/payment-methods.md)           |
| Jak działa automatyczne doładowanie?   | [Wallet](../money/wallet.md)                                      |

### Historia, paragony i statystyki

| Pytanie użytkownika                                | Gdzie jest odpowiedź                                        |
| -------------------------------------------------- | ---------------------------------------------------------- |
| Gdzie są moje poprzednie przejazdy i płatności?   | [History](../money/history.md) — dwie zakładki, każda stronicowana |
| Potrzebuję paragonu, mapy trasy i rozbicia kosztów dla jednego przejazdu | [History](../money/history.md) — szczegóły przejazdu |
| Jakie są moje sumy?                               | [History](../money/history.md). Ekran **Analytics** nie jest obecnie dostępny w aplikacji — zobacz [Analytics](../money/analytics.md) |

### Profil, ustawienia i bezpieczeństwo

| Pytanie użytkownika Rider                 | Gdzie znajduje się odpowiedź                             |
| ---------------------------------------- | -------------------------------------------------------- |
| Jak zmienić moje imię, zdjęcie lub hasło? | [Profil](../account/profile.md)                         |
| Jak usunąć moje konto?                    | [Profil](../account/profile.md) — to jest właściwy proces. [Prywatność](../account/privacy.md) wyjaśnia, dlaczego przycisk na ekranie Prywatność nie jest tym, którego należy użyć |
| Powiadomienia, język, motyw, wyświetlanie mapy | [Ustawienia](../help/settings.md)                      |
| Na jakich urządzeniach jestem zalogowany? | [Sesje](../account/sessions.md)                         |
| Gdzie jest polityka prywatności / wskazówki dotyczące bezpieczeństwa? | [Prywatność](../account/privacy.md)                     |

### Pomoc

| Pytanie użytkownika Rider               | Gdzie znajduje się odpowiedź                     |
| -------------------------------------- | ----------------------------------------------- |
| Jak skontaktować się z pomocą?         | [Wsparcie](../help/support.md)                   |
| Subskrypcje lub kod promocyjny          | [Subskrypcje](../money/subscriptions.md) — obecnie niedostępne w aplikacji |

## Odniesienie do ekranu

| Ekran               | Ścieżka                      | Co to jest                                                  |
| ------------------- | ---------------------------- | ----------------------------------------------------------- |
| **Mapa**            | `/map`                       | Ekran główny — znajdź i wybierz pojazd                      |
| **Portfel**         | `/wallet`                    | Saldo, bonusy, doładowanie, automatyczne doładowanie        |
| **Metody płatności**| `/wallet/payment-methods`    | Zapisane karty i oczekujące doładowania                      |
| **Historia**        | `/history`                   | Zakładki **Przejazdy** i **Płatności**; dotknij przejazdu, aby zobaczyć szczegóły |
| **Profil**          | `/profile`                   | Informacje o koncie, zdjęcie, hasło, usuwanie konta         |
| **Ustawienia**      | `/settings`                  | Powiadomienia, wyświetlanie mapy, język, motyw              |
| **Sesje**           | `/settings/sessions`         | Wszystkie urządzenia zalogowane do konta                     |
| **Prywatność**      | `/privacy`                   | Polityka prywatności i wytyczne dotyczące bezpieczeństwa    |
| **Wsparcie**        | `/support`                   | Zakładki **FAQ** i **Kontakt**, oraz czat na żywo           |

## Obecnie niedostępne w aplikacji

Nie obiecuj tych funkcji użytkownikowi Rider — obecnie nie są dostępne w aplikacji:

- **Subskrypcje** i **kody promocyjne** — ekran nie może zostać otwarty
- **Analizy** — skieruj użytkowników do **Historii** po podsumowania
- **Przesyłanie dokumentów podczas rejestracji** — nigdy nie informuj użytkownika, że jego dokument został odebrany
- **Tryb jazdy**, **Jednostki**, **Mapy offline**, **kody zaproszeń**, **Pobierz moje dane** oraz przycisk **Żądanie usunięcia konta** na ekranie Prywatność

Samo usunięcie konta działa — z poziomu **Profilu**, zobacz [Profil](../account/profile.md).

## Co zmieniają ustawienia Twojej firmy

Kilka części aplikacji różni się między operatorami, ponieważ konfigurujesz je w panelu, w **Ustawienia → Moja firma → Aplikacja**:

- **Metody uwierzytelniania** — które zakładki widzi użytkownik na ekranie logowania
- **Dodatkowe kroki rejestracji** — czy onboarding wymaga dodatkowych dokumentów
- **Kanały wsparcia** — które kanały kontaktowe pojawiają się na ekranach Wsparcia i Zablokowanego konta
- **Prawo i zgodność** — linki do Regulaminu i Polityki prywatności wyświetlane w aplikacji

Zobacz [Moja firma](../../settings/administration/my-company.md) dla strony operatora tych ustawień.
