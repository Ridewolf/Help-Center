# Profil — Szczegóły konta, hasło i usunięcie

Ekran **Profil** (`/profile`) to ekran konta samego użytkownika: co operator o nim wie, plus wszystkie działania na poziomie konta — zdjęcie, imię, hasło, sesje, wylogowanie i usunięcie.

To także miejsce, gdzie faktycznie następuje usunięcie konta. Przycisk na ekranie Prywatność nie jest do tego przeznaczony — zobacz [Privacy](privacy.md).

## Co pokazuje ekran

| Pole               | Edytowalne? | Uwagi                                               |
| ------------------ | ----------- | -------------------------------------------------- |
| **Zdjęcie**        | Tak         | Awatar 96 × 96 z nakładką aparatu do zmiany        |
| **Pełne imię**     | Tak         | Wyświetlane tutaj, edytowane w arkuszu edycji      |
| Odznaka statusu    | Nie         | Odczytaj etykietę tak, jak jest pokazana            |
| **E-mail**         | Nie         | Tylko do wyświetlania                              |
| **Telefon**        | Nie         | Tylko do wyświetlania                              |
| **Status konta**   | Nie         | Tylko do wyświetlania                              |
| **Członek od**     | Nie         | Data utworzenia konta                               |

Data urodzenia **nie** jest na tym ekranie. Jest zbierana podczas rejestracji, ale nie jest tu pokazywana ani edytowalna, więc nie kieruj użytkownika tutaj, by ją zmienić.

## Edycja imienia

1. Stuknij ikonę **ołówka**
2. Otwiera się arkusz edycji z polami **Imię** i **Nazwisko** — i niczym więcej. Oba są wymagane
3. Zapisz

E-mail i telefon nie są tu edytowalne i nie ma w aplikacji procesu ich zmiany. Jeśli użytkownik potrzebuje innego e-maila lub telefonu, Twój zespół musi to obsłużyć z poziomu pulpitu — zobacz [Client — Create & Edit](../../operations/customers/client-create-edit.md).

Miła cecha: użytkownik, który zalogował się przez Apple lub Google, może zostać poproszony o wpisanie prawdziwego imienia, ponieważ nazwa zwracana przez te usługi nie zawsze jest użyteczna.

## Zmiana zdjęcia

Stuknięcie awatara otwiera arkusz zdjęcia z trzema źródłami:

- **Zrób zdjęcie** — aparat telefonu
- **Wybierz z galerii**
- **Wybierz plik**

Ograniczenia: **JPEG, JPG, PNG lub WEBP, maksymalnie 10 MB**. Nie ma kroku przycinania — zdjęcie jest używane takie, jakie jest, więc powiedz użytkownikom, by odpowiednio je wykadrowali przed przesłaniem. Po zakończeniu przesyłania nowe zdjęcie zastępuje stare wszędzie w aplikacji.

## Zmiana hasła

Arkusz **Zmień hasło** wymaga trzech pól:

| Pole                 | Zasada                                  |
| --------------------- | --------------------------------------- |
| **Aktualne hasło**    | Wymagane                               |
| **Nowe hasło**        | Musi spełniać pokazane zasady hasła    |
| **Potwierdź hasło**   | Musi zgadzać się z nowym hasłem         |

Ostrzeż użytkownika przed rozpoczęciem: **pomyślna zmiana hasła powoduje wylogowanie** i powrót do ekranu logowania z komunikatem potwierdzającym. To zamierzone działanie, nie błąd — po prostu loguje się ponownie z nowym hasłem.

Błędne aktualne hasło pokazuje błąd w polu. Każda inna niepowodzenie pojawia się jako krótka wiadomość u góry ekranu.

## Zarządzanie sesjami

**Zarządzaj sesjami** otwiera `/settings/sessions`, listę wszystkich urządzeń zalogowanych na konto. Zobacz [Sessions](sessions.md) dla listy urządzeń i akcji wylogowania ze wszystkich.

## Wylogowanie

Przycisk **Wyloguj się** kończy sesję na tym urządzeniu i zwraca użytkownika do początku aplikacji. Nie wpływa na inne urządzenia — do tego użyj [Sessions](sessions.md).

## Usuwanie konta — działający proces

1. **Usuń konto** pojawia się tylko, gdy nie ma już oczekującego usunięcia
2. Stuknięcie otwiera okno potwierdzenia
3. Po potwierdzeniu usunięcie jest zaplanowane
4. Przycisk jest zastąpiony przez pole oczekujące: ikona zegara, **Zaplanowano na {date}** oraz przycisk **Anuluj**, gdy anulowanie jest jeszcze możliwe

Aby anulować, użytkownik stuknął **Anuluj**, potwierdza w oknie dialogowym, a normalny przycisk **Usuń konto** wraca.

W tym procesie nie ma wymogu salda — użytkownik z pieniędzmi w portfelu może nadal zaplanować usunięcie, więc przypomnij mu, by najpierw wydał lub odzyskał saldo, jeśli to ważne. Zobacz [Wallet](../money/wallet.md).

## Gdy usunięcie jest oczekujące

Edycja profilu, zmiana hasła, przesyłanie zdjęcia i zarządzanie sesjami są **wszystkie wyłączone** podczas zaplanowanego usunięcia.

To jest odpowiedź, gdy użytkownik zgłasza, że przyciski na ekranie Profil są wyszarzone: mają zaplanowane usunięcie. Anulowanie przywraca wszystko.

## FAQ

- **Dlaczego użytkownik nie może edytować tutaj e-maila lub telefonu?** Arkusz edycji zawiera tylko imię i nazwisko; oba pola kontaktowe są tylko do wyświetlania i nie ma procesu zmiany w aplikacji.
- **Dlaczego wszystkie przyciski są wyłączone?** Oczekujące usunięcie konta. Anuluj je.
- **Użytkownik został wylogowany zaraz po zmianie hasła.** To normalne — pomyślna zmiana hasła wymusza ponowne logowanie.
- **Co oznaczają wartości statusu?** Odczytaj etykietę **Status konta** tak, jak jest pokazana; nie mapuj na stałą listę wartości.
- **Użytkownik pyta o usunięcie konta z ekranu Prywatność.** Ekran Prywatność nie ma przycisku usunięcia — jest tylko informacyjny. Użyj **Profil → Usuń konto** — zobacz [Privacy](privacy.md).

## Powiązane

- [Sessions](sessions.md) — urządzenia zalogowane na konto
- [Settings](../help/settings.md) — powiadomienia, język, motyw, wyświetlanie mapy
- [Privacy](privacy.md) — polityka prywatności i wytyczne bezpieczeństwa
- [Signing in](registration-login.md) — reset hasła dla użytkowników, którzy nigdy go nie ustawili
