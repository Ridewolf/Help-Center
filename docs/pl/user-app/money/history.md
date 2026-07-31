# Rider App — Historia (Przejazdy i Płatności)

Historia (`/history`) to jedyne miejsce w aplikacji Rider z danymi samego użytkownika. Ma dwie zakładki na jednym ekranie — **Przejazdy** i **Płatności** — i to tam kierujesz użytkownika, gdy chce zobaczyć informacje o przeszłej podróży lub płatności.

Każda zakładka ma własną paginację i własne nieskończone przewijanie, które ładuje kolejną stronę, gdy użytkownik zbliża się do dołu. Przełączanie zakładek resetuje pozycję przewijania i paginację, a dane ładują się ponownie za każdym razem, gdy ekran jest otwierany.

Odpowiedniki po stronie operatora znajdziesz w [Przejazdy — Lista](../../operations/trips/rides.md) oraz [Płatności — Historia](../../operations/payments/payments.md).

## Zakładka Przejazdy

Każda karta przejazdu pokazuje: typ pojazdu, numer pojazdu, miejsce rozpoczęcia i zakończenia, czas rozpoczęcia i zakończenia, dystans w kilometrach, czas trwania w minutach, koszt oraz status. Karty ładują się po 20 na stronę. Dotknięcie karty otwiera [szczegóły przejazdu](#szczegóły-przejazdu).

| Status        | Kolor  | Znaczenie                                   |
| ------------- | ------ | ------------------------------------------- |
| **Zakończony** | Zielony | Przejazd zakończył się normalnie            |
| **Anulowany** | Czerwony | Przejazd został anulowany                    |
| **Wygasł**   | Żółty  | Przejazd lub rezerwacja wygasły bez zakończenia |

## Zakładka Płatności

Każdy rekord płatności pokazuje: typ, kwotę, walutę, status, dostawcę, datę, saldo przed i po oraz — w przypadku niepowodzenia — kod błędu.

**Typy:** doładowanie, zwrot, obciążenie i bonus.

**Kolorowanie kwoty:**

| Kolor  | Dotyczy                  |
| ------ | ------------------------ |
| Zielony | Doładowania, zwroty, bonusy |
| Pomarańczowy | Kary                    |
| Czerwony | Obciążenia i opłaty       |

**Odznaki statusu:** _oczekujące_ na bursztynowo, _niepowodzenie_ na czerwono, _zwrot_ wyciszone. **Płatność zakończona nie ma żadnej odznaki** — brak odznaki to normalny, prawidłowy stan, a nie brak danych. Użytkownicy czasem odczytują to jako „nic się nie stało”, a oznacza to wręcz przeciwnie.

**Kod błędu** przy nieudanej płatności to informacja, którą należy odczytać, gdy użytkownik pyta, dlaczego płatność nie przeszła.

## Szczegóły przejazdu

Dotknięcie karty przejazdu otwiera `/history/:id`. Pokazuje:

- **Fakty o przejeździe** — status, cena, dystans (w km), czas trwania (w minutach), oznaczenie i typ pojazdu, taryfa, adresy startu i końca, znaczniki czasu oraz ocenę pozostawioną przez użytkownika
- **Rozbicie kosztów** — pięć pozycji składających się na całą cenę: opłata za odblokowanie, rezerwacja, czas aktywny, dystans i czas pauzy. Zobacz [Rozbicie kosztów](../riding/rides.md#rozbicie-kosztów), co każda pozycja oznacza w taryfie
- **Oś czasu aktywności** — najpierw okres rezerwacji (jeśli był), potem bloki jazdy i pauzy w kolejności czasowej. To najczytelniejszy sposób pokazania użytkownikowi, na co faktycznie poszły jego pieniądze podczas drogiego przejazdu
- **Mapa trasy** — dla zakończonych przejazdów: trasa narysowana linią, z markerem startu i markerem końca, dopasowana do całej podróży

Jeśli nie można załadować taryfy przejazdu, ekran pokazuje **tylko sumę, bez rozbicia i bez komunikatu o błędzie**. Suma jest nadal poprawna — dlatego czasem brakuje rozbicia.

## Obecnie niedostępne w aplikacji

Użytkownicy często o to pytają. Żadne z nich nie istnieje w Historii, więc powiedz to jasno, zamiast wysyłać użytkownika na poszukiwania:

- Grupowanie listy według Dzisiaj / Wczoraj / Ten tydzień
- Panel filtrów według daty, typu pojazdu lub statusu
- Akcja **Pobierz paragon** (PDF lub e-mail)
- Ponowne ocenianie przeszłego przejazdu (ocena jest wystawiana na końcu przejazdu)
- Formularz **Zgłoś problem** przy przejeździe — zamiast tego użyj [Wsparcia](../help/support.md)
- Eksport historii przejazdów lub płatności do CSV lub PDF
- Baner z sumami lub łącznym wydatkiem na górze listy

Statystyki dla użytkownika również [nie są obecnie dostępne](analytics.md). Jeśli użytkownik potrzebuje sum lub dokumentu paragonowego, wygeneruj go z pulpitu: zarówno [Przejazdy — Lista](../../operations/trips/rides.md), jak i [Płatności — Historia](../../operations/payments/payments.md) umożliwiają eksport.

## FAQ

| Użytkownik pyta…                     | Odpowiedź                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| „Co oznacza to rozbicie?”             | Przeczytaj pięć pozycji po kolei. Duża pozycja pauzy lub rezerwacji wyjaśnia większość zaskakujących sum                      |
| „Dlaczego nie ma rozbicia?”           | Nie można było załadować taryfy przejazdu, więc pokazana jest tylko suma. Suma jest poprawna                                    |
| „Dlaczego moja płatność jest oczekująca?” | Dostawca jej nie potwierdził. Przy doładowaniu przez przekierowanie lub QR użytkownik prawdopodobnie nie dokończył płatności — zobacz [Metody płatności](payment-methods.md#oczekujące-doładowania) |
| „Gdzie są moje sumy?”                  | W aplikacji użytkownika nie ma sum; zsumuj je z listy lub pobierz z pulpitu                                                     |
| „Czy mogę dostać paragon?”             | Nie z aplikacji. Eksportuj rekord płatności z pulpitu, jeśli użytkownik potrzebuje dokumentu                                    |
| „Dlaczego moja płatność nie ma odznaki?” | Bo została zakończona. Odznaki mają tylko płatności oczekujące, nieudane i zwrócone                                            |

## Wskazówki

- **Szczegóły przejazdu rozstrzygają spory dotyczące opłat, nie lista.** Otwórz przejazd, przeczytaj rozbicie względem taryfy, a następnie wyjaśnij pojedynczą linię, która dominuje.
- **Oś czasu aktywności to najlepsza pomoc wizualna.** Pasażer, który widzi 40-minutową przerwę, przestaje się spierać o całkowitą kwotę.
- **„Brak odznaki” oznacza zakończony.** Naucz tego swój zespół, aby przestali ścigać zdrowe płatności.
- **Kody błędów są zapisane.** Przeczytaj kod, zanim zaczniesz spekulować o banku.
