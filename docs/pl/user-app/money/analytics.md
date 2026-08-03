# Rider App — Statystyki użytkownika

**Statystyki dla użytkownika nie są obecnie dostępne w aplikacji.** Nie ma ekranu z wykresami, podsumowań ani zestawień wydatków, które użytkownik mógłby otworzyć.

Zamiast tego skieruj użytkowników do [History](history.md) — to jedyne miejsce z ich własnymi danymi.

## Co widzi użytkownik

- **Nie ma punktu wejścia.** Boczne menu zawiera Portfel, Historia, Wsparcie, Prywatność, Ustawienia i Profil — i nic więcej. Użytkownik, który mówi, że nie może znaleźć ekranu analityki, ma rację; nie mów mu, żeby szukał w menu i nie wysyłaj mu linku do takiego ekranu.
- Jeśli ekran `/analytics` zostanie otwarty bezpośrednio, pokazuje tylko nagłówek i pustą przestrzeń. **Nic nie jest nie tak** z kontem użytkownika, jego urządzeniem ani instalacją aplikacji — ponowna instalacja nic nie zmienia.

## Gdzie faktycznie znajdują się dane użytkownika

[Historia](history.md) zawiera prawdziwe dane dla każdego użytkownika:

- Zakładka **Przejazdy** wyświetla każdy przeszły przejazd z jego dystansem, czasem trwania i kosztem
- Zakładka **Płatności** pokazuje doładowania, zwroty, obciążenia i bonusy z kwotami i statusami
- Dotknięcie przejazdu otwiera jego szczegóły z pełnym [rozbiciem kosztów](../riding/rides.md#rozbicie-kosztów), linią czasu aktywności oraz trasą narysowaną na mapie

W aplikacji użytkownika **nie ma nigdzie banera z sumarycznymi łącznymi wartościami** — ani na żadnym ekranie statystyk, ani na górze Historii. Całkowite sumy trzeba zsumować z listy przejazdów lub pobrać z własnych raportów.

## Odpowiadanie na pytania o liczby z pulpitu

Gdy użytkownik naprawdę potrzebuje sum, wygeneruj je po stronie operatora:

| Użytkownik chce                  | Gdzie to uzyskać                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------- |
| Całkowite wydatki w okresie     | [Analizy — Płatności](../../analytics/reports/payments.md)                       |
| Własną listę przejazdów, eksportowaną | [Przejazdy — Lista](../../operations/trips/rides.md), filtrowaną do tego klienta |
| Swoje zapisy płatności          | [Płatności — Historia](../../operations/payments/payments.md)                     |
| Szybkie podsumowanie dla klienta | [Szczegóły klienta](../../operations/customers/client-detail.md) — liczba przejazdów w życiu, saldo, ocena |

## FAQ

| Użytkownik pyta…                | Odpowiedź                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------- |
| „Gdzie są moje statystyki?”      | Obecnie niedostępne w aplikacji. Użyj [History](history.md)                      |
| „Nie mogę znaleźć Analiz w menu” | Nie ma takiego wpisu w menu                                                     |
| „Strona Analiz jest pusta”       | To normalne — ekran nie jest obecnie dostępny. Nic nie jest uszkodzone           |
| „Czy mogę wyeksportować moje dane przejazdów?” | Nie z aplikacji. Eksportuj je z pulpitu w imieniu użytkownika                    |
| „Ile wydałem łącznie?”           | Nie ma sumy w aplikacji użytkownika. Odczytaj ją z Historii lub pobierz z pulpitu |

## Wskazówki

- **Nie wysyłaj użytkownikom linków do analiz.** Nie ma sensownego ekranu do otwarcia, a pusta strona wygląda jak uszkodzona aplikacja.
- **Sam odpowiadaj na pytania o sumy.** Pobranie danych z pulpitu zajmuje chwilę i kończy rozmowę.
- **Historia to uczciwa odpowiedź**, jest naprawdę kompletna dla każdego przejazdu i płatności — przedstawiaj to w ten sposób, zamiast przepraszać za brak ekranu.
