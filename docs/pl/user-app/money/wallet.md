# Rider App — Portfel i Doładowania

Portfel (`/wallet`) to ekran pieniędzy użytkownika, otwierany z wiersza salda portfela w bocznym menu. Zawiera aktualne saldo, bonusy, punkt wejścia do doładowania, przełącznik automatycznego doładowania oraz dostęp do zapisanych kart.

Wszystko, co dotyczy samych kart — dodawanie, usuwanie, wybór domyślnej oraz trzy sposoby zakończenia doładowania — znajduje się w [Metodach płatności](payment-methods.md). Historia doładowań, zwrotów, obciążeń i bonusów jest w [Historii](history.md).

## Co znajduje się na ekranie

| Element                       | Co to jest                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Rzeczywiste saldo**         | Wydawalna kwota na koncie użytkownika. Ikona odświeżania obok niej ponownie pobiera saldo z serwera                |
| **Bonusy**                   | Oddzielne saldo bonusowe, widoczne tylko tam, gdzie bonusy są włączone                                            |
| **Przyciski doładowania**     | Cztery przyciski: **50**, **100**, **200**, **400**. Na tym ekranie nie ma pola do wpisania własnej kwoty         |
| **Automatyczne doładowanie**  | Pojedynczy przełącznik z opisem własnego progu i kwoty                                                           |
| **Zarządzaj metodami płatności** | Otwiera [Metody płatności](payment-methods.md) (`/wallet/payment-methods`)                                      |

Jeśli użytkownik twierdzi, że jego saldo jest nieprawidłowe lub nieaktualne, **niech najpierw kliknie ikonę odświeżania** — czyści ona pamięć podręczną i pobiera aktualne dane. To rozwiązuje większość zgłoszeń "moje doładowanie się nie pokazuje".

## Jak użytkownik dokonuje doładowania

1. Otwórz Portfel.
2. Wybierz jedną z predefiniowanych kwot — 50, 100, 200 lub 400.
3. Potwierdź doładowanie.

Co się stanie dalej, zależy całkowicie od używanego dostawcy płatności, a istnieją dokładnie **trzy** możliwości:

| Przebieg u dostawcy             | Doświadczenie użytkownika                                                                | Czy opuszcza aplikację? |
| -------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------- |
| **Potwierdzenie w aplikacji** (Stripe) | Płatność jest potwierdzana w aplikacji przy użyciu zapisanej karty                        | Nie                    |
| **Przekierowanie** (MAIB i podobne)    | Otwiera się zewnętrzna przeglądarka, użytkownik płaci na stronie banku, aplikacja czeka na potwierdzenie | Tak                    |
| **Płatność QR** (MIA i podobne)         | Płatność przez QR / aplikację bankową z odliczaniem czasu, aplikacja czeka na potwierdzenie | Tak                    |

**Tylko przebieg potwierdzenia w aplikacji kończy się bez opuszczania aplikacji.** W przypadku przekierowania i płatności QR nigdy nie mów użytkownikowi, że pieniądze pojawiają się natychmiast — musi najpierw zakończyć płatność zewnętrznie. Instrukcje krok po kroku dla wszystkich trzech są w [Metodach płatności](payment-methods.md#doładowania--trzy-procesy).

## Co się dzieje zaraz po doładowaniu

Saldo aktualizuje się natychmiast w aplikacji, następnie aplikacja potwierdza je z serwerem, próbując kilka razy z rosnącymi opóźnieniami (około pół sekundy, potem 1, 2, 4 i 8 sekund). Jeśli potwierdzenie nigdy nie nadejdzie, wyświetlane saldo jest **przywracane** do pierwotnej wartości.

Saldo, które pojawiło się na chwilę, a potem zniknęło, oznacza jedno: **płatność nigdy nie została potwierdzona.** Sprawdź listę oczekujących doładowań na ekranie [Metody płatności](payment-methods.md#oczekujące-doładowania).

## Automatyczne doładowanie

- Jeden przełącznik, z oknem potwierdzenia przy włączaniu przez użytkownika.
- Jest **wyłączone** tam, gdzie obecny dostawca nie może potwierdzać płatności w aplikacji. Dlatego użytkownik korzystający tylko z przekierowania lub płatności QR nie może go włączyć.
- Próg i kwota są opisane na samym ekranie. Odczytuj je z ekranu — nie podawaj liczb z pamięci i nie podawaj limitów, których ekran nie pokazuje.

## Gdzie znajduje się historia płatności

Nie tutaj. Doładowania, zwroty, obciążenia i bonusy są wymienione na karcie **Płatności** w [Historii](history.md#zakładka-płatności), z oznaczeniem kwoty i kolorem statusu. Twoja własna księga operatora to [Płatności — Historia](../../operations/payments/payments.md).

## Rozwiązywanie problemów

| Rider mówi…                             | Co sprawdzić                                                                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| „Mój stan konta jest nieprawidłowy / nieaktualny”           | Stuknij ikonę odświeżania obok **Rzeczywistego salda**                                                                                             |
| „Płatność odrzucona”                      | Odrzucenie po stronie karty lub banku. Kod błędu znajduje się w rekordzie płatności w [Historia → Płatności](history.md#zakładka-płatności)                    |
| „Niewystarczające środki”                    | Saldo jest niższe niż wymaga akcja. Najpierw doładuj — i pamiętaj, że rozpoczęcie przejazdu ma własny [minimalny wymóg salda startowego](../riding/rides.md#dlaczego-użytkownik-nie-może-rozpocząć-przejazdu) dla użytkowników bez karty |
| „Nie mogę włączyć automatycznego doładowania”         | Aktywny dostawca nie może potwierdzić płatności w aplikacji                                                                                 |
| „Moje doładowanie nie dotarło”                | Sprawdź listę oczekujących doładowań na [Metody płatności](payment-methods.md#oczekujące-doładowania). Przekierowanie lub płatność QR, która nie została zakończona, znajduje się tam i można ją anulować |
| „Kiedy otrzymam zwrot?”           | Nie obiecuj liczby dni — czas zwrotu nie jest określony w aplikacji. Zwroty pojawiają się na karcie Płatności ze statusem zwrócone |

## Wskazówki

- **Odśwież przed rozpoczęciem dochodzenia.** Połowa zgłoszeń „pieniądze zniknęły” to po prostu pamięć podręczna salda.
- **Poznaj proces swojego dostawcy, zanim odpowiesz.** „Natychmiastowy” dotyczy tylko potwierdzenia w aplikacji; pozostałe dwie metody wymagają, by użytkownik zakończył proces po stronie banku.
- **Znikające saldo to nie utracona płatność, lecz niepotwierdzona.** Przejdź od razu do oczekujących doładowań.
- **Powiązanie karty całkowicie usuwa blokadę salda na przejazd** — dla użytkowników, którzy stale doładowują małymi kwotami, to lepsza rada.
