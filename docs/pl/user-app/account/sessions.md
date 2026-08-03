# Sesje — Urządzenia zalogowane do konta

Ekran **Sesje** (`/settings/sessions`) wyświetla wszystkie miejsca, w których konto użytkownika jest aktualnie zalogowane, i pozwala wylogować się z tych miejsc. To ekran, do którego należy się udać, gdy użytkownik podejrzewa, że ktoś inny ma dostęp do jego konta.

Dwa punkty wejścia, oba prowadzące tutaj:

- **Profil → Zarządzaj sesjami**
- **Ustawienia → Karta Prywatność → Zarządzaj sesjami**

## Jak zorganizowana jest lista

Sesje są **grupowane według urządzenia** — przeglądarka i jej wersja, system operacyjny i jego wersja, typ urządzenia, producent i model — dzięki czemu ten sam telefon pojawia się raz, a nie kilkanaście razy.

Grupy są sortowane celowo:

1. Najpierw bieżące urządzenie użytkownika
2. Następnie według statusu: **aktywny**, potem **nieaktywny**, a na końcu **stary**
3. Następnie według ostatniej aktywności, najnowsze na górze

Każda grupa jest zwijalna. Rozwinięcie jej pokazuje każdą indywidualną sesję należącą do tego urządzenia.

## Odczytywanie grupy urządzenia

| Co widzisz                          | Znaczenie                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------- |
| **Etykieta urządzenia**                      | Producent i model, jeśli znane, w przeciwnym razie system operacyjny i jego wersja |
| Ikona typu urządzenia                      | Telefon, tablet lub monitor                                                    |
| **Etykieta przeglądarki**                     | Przeglądarka i jej wersja stojąca za sesją                                  |
| **Odznaka statusu sesji**              | Zobacz tabelę poniżej                                                         |
| **Ostatnia aktywność**                     | Czas względny — „przed chwilą”, N minut / godzin / dni temu, oraz data bezwzględna, gdy sesja ma ponad tydzień |
| **Liczba sesji**                     | Ile sesji ma to urządzenie                                           |
| **Lokalizacja**                          | Miasto, kraj i adres IP                                                |
| **Utworzono**                           | Kiedy sesja się rozpoczęła                                                   |
| **Bieżące urządzenie** / **Bieżąca sesja** | Podświetlona odznaka na urządzeniu i sesji, z której użytkownik korzysta teraz |

### Odznaki statusu

| Odznaka        | Znaczenie                              |
| ------------ | ------------------------------------ |
| **aktywny**   | Ostatnia aktywność mniej niż godzinę temu  |
| **nieaktywny** | Ostatnia aktywność mniej niż 24 godziny temu |
| **stary**      | Ostatnia aktywność 24 godziny lub więcej temu   |

Odznaka mierzy **tylko aktualność** — nie informuje, czy sesja jest nadal ważna. Odznaka „stary” nie oznacza, że sesja wygasła.

## Wylogowanie jednej sesji

Bieżąca sesja nie ma kontrolki usuwania — celowo, nie można jej usunąć z tej listy. Każdą inną sesję można usunąć:

1. Rozwiń grupę urządzenia
2. Stuknij ikonę **kosza** przy sesji
3. Potwierdź w oknie dialogowym

Lista zostaje przeładowana, a sesja znika.

## Działania zbiorcze

| Działanie                     | Co robi                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Wyloguj inne sesje**  | Wylogowuje wszystkie sesje poza tą na urządzeniu, które użytkownik trzyma w ręku. To właściwe działanie, gdy użytkownik podejrzewa, że ktoś inny ma dostęp |
| **Wyloguj wszystkie sesje**    | Wylogowuje wszystko **łącznie z bieżącym urządzeniem**, więc użytkownik zostaje przeniesiony do ekranu logowania i musi się zalogować ponownie. Z tego powodu oznaczone jako działanie destrukcyjne |
| **Odmów dostępu do urządzenia**          | Dostępne po rozwinięciu grupy urządzenia, która nie jest bieżącym urządzeniem — wylogowuje wszystkie sesje na tym urządzeniu      |

Podczas wykonywania żądania wylogowania przyciski są wyłączone. W przypadku błędu pojawia się krótka wiadomość o błędzie; w przypadku powodzenia pojawia się potwierdzenie i lista jest przeładowywana.

## Typowe scenariusze

- **Użytkownik podejrzewa, że ktoś inny jest na jego koncie** — **Wyloguj inne sesje**, a następnie zmień hasło w **Profilu**. Zauważ, że pomyślna zmiana hasła również wylogowuje użytkownika, więc będzie musiał się zalogować ponownie ([Profil](profile.md))
- **Zapomniane logowanie na pożyczonym telefonie** — rozwiń grupę tego urządzenia, **Odmów dostępu do urządzenia**
- **Zacznij od nowa wszędzie** — **Wyloguj wszystkie sesje**, a następnie zaloguj się ponownie ([Logowanie](registration-login.md))

## FAQ

- **Dlaczego użytkownik nie może usunąć swojej bieżącej sesji?** Nie ma dla niej kontrolki usuwania. Aby zakończyć bieżącą sesję, użyj **Wyloguj wszystkie sesje** lub normalnego przycisku **Wyloguj się** w Profilu.
- **Co dokładnie oznacza „aktywny”?** Aktywność w ciągu ostatniej godziny — nic więcej.
- **Dlaczego jeden telefon pokazuje kilka sesji?** Sesje tworzone są przy każdym logowaniu. Ekran grupuje je pod jednym urządzeniem i pokazuje ich liczbę.
- **Przycisk Zarządzaj sesjami jest wyszarzony.** Konto ma oczekujące usunięcie, co wyłącza zarządzanie sesjami wraz z edycją profilu — zobacz [Profil](profile.md).

## Powiązane

- [Profil](profile.md) — zmiana hasła, wylogowanie, usunięcie konta
- [Ustawienia](../help/settings.md) — karta Prywatność, która również prowadzi tutaj
- [Prywatność](privacy.md) — polityka prywatności i wytyczne bezpieczeństwa
