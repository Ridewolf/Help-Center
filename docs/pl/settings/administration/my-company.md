# Moja firma

Strona **Moja firma** (`/settings/my-company`) to twoja tożsamość operatora: dane prawne firmy zarządzającej flotą, jej branding oraz konfiguracja odczytywana przez aplikację Rider — domyślne miasto na mapie, metody logowania, kanały wsparcia i linki prawne.

Strona jest widoczna tylko dla operatorów posiadających **zarówno** uprawnienie do przeglądania firmy, jak i do jej edycji — bez praw do edycji jest całkowicie ukryta, a nie wyświetlana tylko do odczytu.

Podobnie jak reszta pulpitu, Moja firma dostosowuje się do trybu interfejsu, w którym się znajdujesz:

- **Tryb łatwy** (oznaczony jako _Lite_ w przełączniku trybu interfejsu) — podsumowanie najważniejszych informacji tylko do odczytu oraz prowadzony **pięciokrokowy kreator** do ich edycji.
- **Tryb zaawansowany** — cztery zakładki: **Profil** (oznaczona jako _Firma_ na pasku zakładek), **Konfiguracja aplikacji** (oznaczona jako _Aplikacja_), **Płatności** i **Integracje**.

Przełączenie z trybu łatwego na zaawansowany wymaga potwierdzenia, a następnie przeładowania strony; pulpit zapamiętuje wybrany tryb.

## Tryb łatwy

Tryb łatwy pokazuje najważniejsze informacje na pierwszy rzut oka — logo, dane kontaktowe (e-mail, telefon, strona internetowa, adres) oraz publiczne kanały wsparcia, które są aktualnie włączone — oraz podgląd tylko do odczytu **Więcej szczegółów** z pozostałymi informacjami: dane podmiotu prawnego, branding aplikacji, dostawcy płatności i podłączone integracje oraz linki prawne.

Dostępne są dwie akcje:

- **Edytuj dane** otwiera prowadzony kreator (poniżej).
- **Przełącz na tryb zaawansowany dla płatności i integracji** — klucze dostawców płatności i dane integracji konfiguruje się tylko w trybie zaawansowanym; ten przycisk przenosi cię tam (potwierdź → strona się przeładuje).

### Pięciokrokowy kreator

**Edytuj dane** prowadzi przez najważniejsze informacje krok po kroku i zapisuje wszystko jednym kliknięciem na końcu:

1. **Nazwa i logo** — wyświetlana nazwa firmy (wymagana) oraz logo.
2. **Dane kontaktowe** — e-mail, telefon, strona internetowa.
3. **Adres** — kraj, miasto, adres, kod pocztowy.
4. **Kanały wsparcia** — publiczne kanały kontaktu widoczne dla użytkowników w aplikacji.
5. **Podsumowanie** — zestawienie wszystkich pól z przyciskami edycji dla każdego wiersza; **Potwierdź i zapisz** zatwierdza cały zestaw naraz.

## Tryb zaawansowany

Cztery zakładki. Przyklejony pasek u dołu z przyciskami **Odrzuć** i **Zapisz zmiany** pojawia się tylko wtedy, gdy coś faktycznie zostało zmienione — jeśli nie widzisz przycisku Zapisz, nic jeszcze nie zostało zmodyfikowane.

### Zakładka Profil (_Firma_)

Sam podmiot prawny, w pięciu kartach:

- **Tożsamość** — _Nazwa prawna_ (wymagana), _Etykieta_ (krótka nazwa wyświetlana; opcjonalna tutaj, choć kreator w trybie łatwym jej wymaga), _Numer rejestracyjny_ (wymagany) oraz _NIP_ (opcjonalny, z podpowiedzią wyjaśniającą, że format zależy od jurysdykcji).
- **Lokalizacja** — _Kraj_, _Miasto_, _Adres_ i _Kod pocztowy_ (wszystkie wymagane).
- **Kontakt** — _E-mail_ (wymagany), _Telefon_ i _Strona internetowa_ (opcjonalne).
- **Łączność trackera** — tylko do odczytu: _Domena_ i _Port_ przypisane twojej firmie, gotowy ciąg _Endpoint_ (jedno kliknięcie zaznacza go), oraz instrukcje krok po kroku, jak skierować tracker pojazdu na ten endpoint. Same urządzenia zarządza się na stronie [Tracker](../infrastructure/iot.md).
- **Zawartość** — _Opis_ (krótkie streszczenie) oraz _O nas_ (dłuższy tekst), oba w Markdown z podglądem na żywo.

**Waluta nie znajduje się na tej zakładce.** Waluta firmy (i jej symbol pochodny) to pierwszy krok zakładki **Płatności** — zobacz [Payments & Integrations](company-integrations.md).

### Zakładka Konfiguracja aplikacji (_Aplikacja_)

Wszystko, co odczytuje aplikacja Rider, od góry do dołu:

- **Tożsamość marki i kolory** — nazwa aplikacji, krótka nazwa, logo oraz kolory motywu/akcentu (wartości hex). Logo jest ustawiane jako URL z podglądem w linii; bezpośredni upload pliku nie jest jeszcze dostępny.
- **Domyślny widok mapy** — kliknij interaktywną mapę, aby ustawić domyślne miasto w aplikacji Rider; szerokość, długość geograficzna i zoom są zapisywane, a kliknięcie jest odwrotnie geokodowane na nazwę miasta.
- **Metody uwierzytelniania** — przełączniki dla _Phone OTP_, _Email OTP_, _Email & password_, _Google_, _Apple_, _Telegram_ i _WhatsApp_. Metody społecznościowe działają tylko po skonfigurowaniu i włączeniu odpowiadającej karty na zakładce **Integracje** — zobacz [Payments & Integrations](company-integrations.md).
- **Dodatkowe kroki rejestracji** — dodatkowe etapy rejestracji, każdy z ID, pozycją i przełącznikiem _Wymagane_; **Dodaj krok** dopisuje nowy wiersz.
- **Komunikacja** — przełącznik _Live chat_ oraz **Telegram OTP bot**: wklej token bota, kliknij **Sprawdź czaty** i wybierz czat, którego bot ma używać z listy rozwijanej. To inne ustawienie niż karta Telegram na zakładce Integracje — skonfigurowanie jednego nie konfiguruje drugiego.
- **Kanały wsparcia** — _E-mail_, _Telefon_, _Strona internetowa_, _Telegram_ i _WhatsApp_, każdy z przełącznikiem włączonym i wartością; tylko włączone kanały są widoczne dla użytkowników.
- **Prawo i zgodność** — URL-e _Regulaminu_, _Polityki prywatności_ i _Licencji_ wyświetlane w aplikacji.

### Zakładki Płatności i Integracje

Bramki płatności (waluta, karty dostawców maib / mia / Stripe, domyślny dostawca) oraz integracje usługowe (Telegram, WhatsApp, Google, Apple, OpenAI) mają osobny artykuł: **[Payments & Integrations](company-integrations.md)**. Najważniejsze: te karty **zapisują się indywidualnie**, osobno od paska Zapisz zmiany na tej stronie.

## Workflowy

- **Szybko popraw numer telefonu lub adres** — Tryb łatwy → **Edytuj szczegóły** → przejdź do kroku → **Przejrzyj** → **Potwierdź i zapisz**.
- **Zaktualizuj zarejestrowany adres (Zaawansowane)** — Zakładka Profil → karta Lokalizacja → edytuj pola → **Zapisz zmiany**.
- **Zmień branding aplikacji Rider App** — Zakładka Konfiguracja aplikacji → Tożsamość marki → zaktualizuj nazwę, kolory i URL logo → **Zapisz zmiany**.
- **Przenieś domyślne miasto na mapie** — Zakładka Konfiguracja aplikacji → Domyślny widok mapy → kliknij nową lokalizację → **Zapisz zmiany**.
- **Pozwól użytkownikom logować się przez Google** — najpierw skonfiguruj i włącz kartę Google na zakładce Integracje, potem włącz _Google_ w metodach uwierzytelniania → **Zapisz zmiany**.
- **Dodaj wymagany krok przesyłania dowodu tożsamości przy rejestracji** — Zakładka Konfiguracja aplikacji → Dodatkowe kroki rejestracji → **Dodaj krok** → ustaw ID i pozycję, włącz _Wymagany_ → **Zapisz zmiany**.
- **Wskaż tracker na swoją firmę** — Zakładka Profil → Łączność trackera → skopiuj ciąg _Endpoint_ do konfiguracji urządzenia.
- **Opublikuj zaktualizowane dokumenty prawne** — Zakładka Konfiguracja aplikacji → Prawo i zgodność → wklej nowe publiczne URL → **Zapisz zmiany**.

## Najczęściej zadawane pytania

- **Nie mogę w ogóle znaleźć tej strony.** Wymaga uprawnień do przeglądania i edycji firmy — skontaktuj się z administratorem.
- **W trybie zaawansowanym nie ma przycisku Zapisz.** Stopka pojawia się dopiero po wprowadzeniu zmian.
- **Gdzie jest waluta?** Na zakładce **Płatności**, nie na zakładce Profil — zobacz [Payments & Integrations](company-integrations.md).
- **Metoda logowania społecznościowego nie działa dla użytkowników.** Najpierw skonfiguruj i włącz odpowiednią kartę Integracji, potem włącz metodę uwierzytelniania.
- **Logo nie chce się załadować.** Obecnie można podać tylko URL; bezpośredni upload pliku pojawi się później.
- **Kliknięcie na mapie nie wypełnia nazwy miasta.** Współrzędne i zoom są zapisywane — nazwa miasta pochodzi z geokodowania odwrotnego i czasem może być niedostępna.
- **Gdzie są wymagania dotyczące zdjęć z przejazdu?** Nie tutaj — dowody rozpoczęcia/zakończenia przejazdu konfiguruje się dla modelu pojazdu w [Vehicle settings](../infrastructure/vehicle-settings.md).
