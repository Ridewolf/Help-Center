# Potwierdzenia zadań

Zadania to **grywalizowane zadania, które platforma zleca użytkownikom w zamian za nagrodę** — a Potwierdzenia zadań (`/support/quest-confirmations`) to miejsce, gdzie operator przegląda dowody przesłane przez użytkownika i decyduje o wypłacie.

Istnieją cztery typy zadań:

- **battery** — zadanie związane z baterią
- **lost** — zwrot zgubionego przedmiotu
- **clean** — czyszczenie pojazdu
- **parking** — zadanie parkingowe

> **Uwaga: ta strona to podgląd.** Decyzje podjęte tutaj **nie są obecnie zapisywane i nie wypłaca się nagrody** — proces przeglądu jest widoczny przed pełnym wdrożeniem funkcji. Nie informuj użytkownika, że jego zadanie zostało opłacone na podstawie tego ekranu.

## Gdzie to znaleźć

Nie ma **wpisu w pasku bocznym** — grupa Wsparcie w pasku bocznym zawiera tylko Dowody parkowania, Bilety i Rozmowy. Wejdź na stronę, wpisując bezpośrednio `/support/quest-confirmations`.

Strona jest dostępna tylko w **trybie Zaawansowanym**; jest zablokowana w trybie Łatwym (Lite). Traktuj ją jako niepubliczny interfejs dla zaawansowanych użytkowników, a nie jako część normalnej nawigacji operatora — podobnie jak [Error Logs](../../apps/tools/error-logs.md).

Lista i szczegóły znajdują się na tej samej stronie: wybranie zgłoszenia rozwija **panel szczegółów na miejscu**, zamiast przechodzić do innej strony. Użyj **Wstecz do listy** w nagłówku panelu, aby wrócić.

## Widok listy

| Filtr          | Opcje                                 |
| -------------- | ------------------------------------ |
| **Status**     | Wszystkie / Oczekujące / Zatwierdzone / Odrzucone |
| **Typ zadania**| Wszystkie / Battery / Lost / Clean / Parking |
| **Szukaj**     | Po użytkowniku, zadaniu lub pojeździe |
| **Wyczyść**   | Resetuje wszystkie filtry             |

Podsumowanie statystyk nad listą pokazuje **liczbę oczekujących**, ile zostało **zatwierdzonych dzisiaj**, **odrzuconych dzisiaj** oraz **średni czas przeglądu** w minutach.

## Przeglądanie zgłoszenia

1. Kliknij w wiersz zgłoszenia, aby rozwinąć panel szczegółów.
2. Przejrzyj dowody:
   - **siatka zdjęć**
   - **odznaka QR**, jeśli użytkownik zeskanował kod pojazdu
   - **odznaka GPS** z dokładnością w metrach, jeśli zarejestrowano lokalizację
   - **komentarz użytkownika**, jeśli został dodany
3. Podejmij decyzję:
   - **Zatwierdź i wypłać nagrodę** zatwierdza bezpośrednio — **nie ma okna potwierdzenia**, więc klikaj ostrożnie.
   - **Odrzuć zgłoszenie** pokazuje rozwijane menu z powodem odrzucenia (**wymagane**) oraz opcjonalny komentarz; następnie naciśnij **Potwierdź odrzucenie**.

Można przeglądać tylko zgłoszenia **oczekujące**. Zgłoszenia już rozstrzygnięte pokazują przycisk **Wyświetl** zamiast Przeglądaj.

Powody odrzucenia: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Co zawiera zgłoszenie

- **Czas** zgłoszenia, **użytkownik**, **zadanie** zgłaszane oraz **pojazd**
- **Flaga QR** — czy użytkownik zeskanował kod QR pojazdu
- **Zdjęcia** — każde opisane, co przedstawia
- **GPS** — szerokość/długość geograficzna z etykietą oraz dokładność w metrach (duża wartość oznacza niedokładną pozycję)
- **Nagroda** — tekst opisujący wypłatę, np. darmowy przejazd do określonej kwoty
- **Komentarz użytkownika** — opcjonalna notatka od użytkownika
- **Przeglądający / czas** oraz opcjonalny **komentarz odrzucenia** po podjęciu decyzji

## Najczęściej zadawane pytania

- **Czy zatwierdzenie faktycznie wypłaca nagrodę?** Nie dzisiaj — strona to podgląd, decyzje nie są zapisywane.
- **Dlaczego nie ma kroku potwierdzenia przy zatwierdzaniu?** Zatwierdź i wypłać nagrodę to bezpośrednia akcja w obecnej implementacji. Klikaj ostrożnie.
- **Zgłoszenie nie ma odznaki QR ani GPS — czy to oszustwo?** Oba sygnały są opcjonalne. Oceń je razem ze zdjęciami, nie traktuj braku odznaki jako dowodu czegokolwiek.
- **Wartość dokładności GPS jest ogromna — co to oznacza?** Urządzenie zgłosiło niedokładną pozycję; lokalizacja jest tylko przybliżona.
- **Czy mogę ponownie otworzyć rozstrzygnięte zgłoszenie?** Nie — zatwierdzone i odrzucone zgłoszenia mają tylko opcję Wyświetl.
- **Nie mogę znaleźć tego w menu.** Nie ma wpisu w menu; wpisz adres URL bezpośrednio, w trybie Zaawansowanym.
