# Logowanie — kody, hasła i logowanie przez komunikatory

Wszystko, przez co przechodzi użytkownik przed dotarciem do mapy: wybór metody logowania, potwierdzenie jednorazowego kodu, wypełnienie minimalnego profilu, odzyskiwanie hasła lub przybycie z bota Telegram lub Viber.

Użyj tego artykułu, gdy użytkownik nie może się zalogować do aplikacji. To, co dzieje się *po* pierwszym udanym logowaniu, jest opisane w [Onboarding and verification](onboarding-verification.md).

## Metody logowania widoczne dla użytkownika

Zakładki na ekranie logowania (`/auth/login`) są tworzone na podstawie **Metod uwierzytelniania**, które włączysz w **Ustawienia → Moja firma → Aplikacja**. Nie każdy użytkownik widzi wszystkie metody. Dostępne metody to:

- Jednorazowy kod przez **telefon**
- Jednorazowy kod przez **e-mail**
- Jednorazowy kod przez **WhatsApp**
- **E-mail i hasło**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Jeśli użytkownik mówi, że jakaś metoda jest niedostępna, to znaczy, że nie jest włączona dla tego operatora. Włącz ją w [Moja firma](../../settings/administration/my-company.md) — użytkownik nie może nic zrobić ze swojej strony.

## Pola na każdej zakładce

| Zakładka                 | Pola                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Telefon**              | Numer telefonu (co najmniej 6 znaków) oraz wybór sposobu dostarczenia — wyślij kod przez **telefon** lub przez **WhatsApp** |
| **E-mail**               | Adres e-mail                                                                                   |
| **Hasło** — logowanie    | E-mail i hasło                                                                                |
| **Hasło** — rejestracja | **Imię** (wymagane, co najmniej 2 znaki), **Nazwisko** (opcjonalne), e-mail, hasło             |

Telefon i WhatsApp to **oddzielne kanały dostarczenia**. Użytkownik czekający na SMS, gdy wybrano dostarczenie przez WhatsApp, będzie czekał w nieskończoność.

Przyciski **Google** i **Apple** pojawiają się, gdy te metody są włączone. Jeśli użytkownik wycofa się z wyboru dostawcy, nic się nie dzieje i nie pojawia się błąd — to normalne, po prostu anulował.

## Nowy użytkownik czy powracający

Przed wysłaniem kodu aplikacja sprawdza, czy kontakt należy do istniejącego konta.

- **Powracający użytkownik** — kod jest wysyłany od razu
- **Nowy użytkownik** — najpierw pojawia się krótki dialog rejestracji, który zbiera **Imię**, **Nazwisko** oraz brakujący kontakt: e-mail, jeśli kod jest wysyłany na telefon, lub telefon, jeśli kod jest wysyłany na e-mail

## Kontrola bezpieczeństwa

Na ekranie logowania musi załadować się CAPTCHA, zanim będzie można poprosić o jednorazowy kod. Jeśli się nie załaduje — zablokowana sieć, bardzo stary silnik przeglądarki, blokada reklam w przeglądarce w aplikacji — żądanie kodu nie może zostać wysłane. Poproś użytkownika, aby ponownie otworzył aplikację na normalnym połączeniu.

## Wprowadzanie jednorazowego kodu — `/auth/otp`

1. Użytkownik wpisuje kod — dokładnie **6 cyfr**, tylko cyfry
2. **Wyślij ponownie** staje się dostępne, gdy licznik na ekranie dojdzie do zera
3. Na kanale telefonicznym obsługiwane telefony automatycznie wypełniają kod i wysyłają go

Co się dzieje dalej:

- **Nowy użytkownik** przechodzi do ekranu **Uzupełnij profil**
- **Powracający użytkownik** wchodzi od razu do aplikacji

## Uzupełnij profil — `/auth/complete-profile`

Pokazywany tylko nowym użytkownikom. Prosi o:

- **Imię** — wymagane, co najmniej 2 znaki
- **Nazwisko** — opcjonalne
- Brakujący kontakt — e-mail, jeśli kod przyszedł na telefon, telefon, jeśli kod przyszedł na e-mail

Wartości już zebrane są wstępnie wypełnione, a formularz sam się wysyła, gdy zarówno imię, jak i kontakt są już dostępne. Dostępny jest przycisk **Pomiń**.

Jeśli później okaże się, że numer telefonu użytkownika jest nieznany, poproś go, aby sprawdził ekran **Profil** zamiast zakładać, że ten krok go zapisał — zobacz [Profil](profile.md).

## Użytkownicy, którzy nigdy nie wybrali hasła

Użytkownik, który utworzył konto podczas onboardingu, nigdy nie był proszony o wybór hasła. Jeśli później chce się zalogować na zakładce **Hasło**, musi najpierw ustawić hasło przez **Zapomniałem hasła**. Nie mów użytkownikowi, żeby "po prostu spróbował swoje zwykłe hasło".

## Zapomniałem hasła — `/auth/forgot-password`

Jedno pole: e-mail konta. Po wysłaniu ekran pokazuje jeden z trzech wyników, które oznaczają różne rzeczy:

| Co widzi użytkownik  | Znaczenie                                    |
| --------------------- | --------------------------------------------- |
| **Zielony komunikat** | Żądanie resetu hasła zostało pomyślnie wysłane |
| **Pomarańczowy licznik** | Zbyt wiele prób z tego urządzenia — poczekaj, aż licznik się skończy |
| **Czerwony błąd**     | Żądanie nie powiodło się — spróbuj ponownie    |

Pomarańczowy licznik jest przechowywany na urządzeniu użytkownika, więc nie przenosi się na inny telefon.

## Resetowanie hasła — `/auth/reset-password`

Użytkownik musi otworzyć ten ekran z linku w e-mailu resetującym. Otwarcie bez ważnego linku przekierowuje go z powrotem do **Zapomniałem hasła** z komunikatem "link wygasł" — poproś o nowy e-mail.

Na ekranie użytkownik wpisuje nowe hasło i potwierdzenie. Zasady dotyczące hasła są wyświetlane na bieżąco podczas wpisywania, a oba pola muszą się zgadzać, zanim formularz zostanie wysłany.

## Logowanie przez komunikatory (Telegram / Viber) — `/auth/messenger-callback`

Gdy użytkownik zaczyna od Twojego bota Telegram lub Viber, link bota otwiera stronę pośrednią, która otwiera aplikację, która loguje użytkownika i przenosi go do aplikacji.

Dwa błędy mają własne komunikaty:

- **Konto zablokowane** — użytkownik zostaje przeniesiony do ekranu **Konto zablokowane**, zobacz [Onboarding and verification](onboarding-verification.md)
- **Wymagany dostęp użytkownika** — konto istnieje, ale nie jest kontem użytkownika u tego operatora

Wszystko inne wyświetla ogólny komunikat „nieprawidłowe logowanie”; poproś użytkownika, aby zaczął od nowa od bota z nowym linkiem.

## Limity szybkości

Limity dotyczące jednorazowych kodów są ustawiane przez serwer, nie przez aplikację. Ekran pokazuje odliczanie zbudowane na podstawie czasu oczekiwania zwróconego przez serwer. **Podawaj użytkownikowi odliczanie — nigdy nie podawaj stałej liczby minut**, ponieważ nie jest ona stała.

## Rozwiązywanie problemów

| Objaw                           | Co to oznacza i co zrobić                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| Brak metody logowania           | Nie jest włączona w **Metody uwierzytelniania**. Włącz ją w [Moja firma](../../settings/administration/my-company.md) |
| Kod nigdy nie dotarł            | Poczekaj na odliczanie, następnie **Wyślij ponownie**. Sprawdź, czy wybór dostawy na karcie **Telefon** jest zgodny z oczekiwaniami użytkownika — telefon i WhatsApp to osobne kanały |
| „Zbyt wiele prób”               | Sprawdź odliczanie na ekranie; czas oczekiwania pochodzi z serwera                              |
| Żądanie kodu nie zostanie wysłane | Najprawdopodobniej CAPTCHA na ekranie logowania się nie załadowała                             |
| Użytkownik nie zna swojego hasła | Prawdopodobnie nigdy go nie ustawił. Przeprowadź go przez **Zapomniałem hasła**                |
| Link do resetu wygasł           | Użytkownik zostaje przekierowany do **Zapomniałem hasła**; poproś o nowy link                   |
| Ekran **Konto zablokowane**    | Zobacz sekcję o zablokowanym koncie w [Onboarding and verification](onboarding-verification.md) |
| Zalogowano, ale nic się nie ładuje | Sprawdź [Sesje](sessions.md) — jeśli konto ma oczekujące usunięcie, niektóre części aplikacji są ograniczone; zobacz [Profil](profile.md) |
