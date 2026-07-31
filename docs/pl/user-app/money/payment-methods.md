# Rider App — Metody płatności i procesy doładowań

Wszystko o tym, jak pasażer płaci: lista zapisanych kart, dodawanie karty oraz trzy różne sposoby zakończenia doładowania w zależności od używanego dostawcy płatności.

| Ekran                | Trasa                        | Dostęp z                              |
| --------------------- | ---------------------------- | ----------------------------------------- |
| Zarządzaj metodami płatności | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Zarządzaj metodami płatności** |
| Dodaj kartę             | `/wallet/add-payment-method` | **Dodaj kartę** na powyższym ekranie          |
| Przekierowanie doładowania        | `/wallet/topup-redirect`     | Potwierdzanie doładowania u dostawcy z przekierowaniem |
| Doładowanie QR              | `/wallet/topup-qr`           | Potwierdzanie doładowania u dostawcy QR       |

Na tej stronie odpowiadamy na dwie najczęstsze skargi pasażerów: _„nie ma przycisku Dodaj kartę”_ oraz _„moja płatność utknęła w oczekiwaniu”_.

## Zarządzanie metodami płatności

Na górze znajduje się **wybór dostawcy**, a reszta ekranu dostosowuje się do tego, co dany dostawca obsługuje:

- Jeśli dostawca **nie obsługuje zapisanych kart**, lista kart w ogóle się nie wyświetla — zamiast tego pojawia się komunikat o pustym stanie.
- Jeśli dostawca **nie pozwala na zapisywanie nowych kart**, przycisk **Dodaj kartę** jest całkowicie ukryty. To jest odpowiedź na pytanie pasażera, dlaczego nie może dodać karty.

Każda zapisana metoda pokazuje swój typ (karta lub portfel taki jak Apple Pay / Google Pay), markę, ostatnie cztery cyfry, miesiąc i rok ważności oraz czy jest domyślna. Lista ładuje po 10 na raz z nieskończonym przewijaniem.

**Ustaw jako domyślną** i **Usuń** wymagają potwierdzenia, a następnie odświeżają listę.

### Oczekujące doładowania

Poniżej kart znajduje się lista **Oczekujących doładowań**, zbudowana z rekordów płatności pasażera: kwota, waluta, data, status i dostawca. Domyślnie pokazuje **dwa najnowsze**, z przełącznikiem **Pokaż wszystkie** do rozwinięcia.

To właśnie na tej liście znajduje się niedokończona płatność przekierowująca lub QR. Pasażer, którego pieniądze „zniknęły”, prawie zawsze ma tutaj rekord, którego nigdy nie dokończył — i można go stąd anulować.

Na tym samym ekranie znajduje się rozwijane pole **Jak doładować**, które zawiera instrukcje specyficzne dla wybranego dostawcy.

## Dodawanie karty

1. Otwórz **Wallet → Zarządzaj metodami płatności → Dodaj kartę**.
2. **Imię i nazwisko posiadacza karty** jest wstępnie wypełnione z profilu pasażera (imię i nazwisko).
3. Numer karty, data ważności i CVC są wprowadzane w **bezpiecznej ramce dostawcy płatności**, a nie w polach aplikacji. Ramka ładuje się po otwarciu ekranu.
4. **Przycisk Wyślij pozostaje zablokowany**, dopóki nie spełnione są dwa warunki: ramka bezpieczna zakończyła ładowanie i zgłasza, że wszystkie pola są wypełnione bez błędów walidacji. Przycisk Wyślij, który się nie aktywuje, prawie zawsze wynika z jednego z tych powodów.
5. Alternatywnie pasażer może użyć przycisku portfela **Apple Pay / Google Pay** zamiast wpisywać kartę.
6. Po sukcesie lista kart odświeża się, a ekran wraca do Zarządzania metodami płatności.

Dialog z informacją o bezpieczeństwie na ekranie wyjaśnia, że dostawca płatności obsługuje dane karty i aplikacja nigdy nie przechowuje pełnego numeru karty. To prawda i warto to przytoczyć pasażerowi, który jest zaniepokojony.

## Doładowania — trzy procesy

Pasażer zawsze zaczyna tak samo — **Wallet → wybierz kwotę → potwierdź** — a następnie automatycznie wybierany jest odpowiedni proces przez dostawcę.

### 1. Potwierdzenie w aplikacji (Stripe)

Płatność jest potwierdzana w aplikacji za pomocą zapisanej karty. Bez przeglądarki, bez kroku zewnętrznego. To jedyny proces, który zachowuje się jak natychmiastowe doładowanie i jedyny, w którym można włączyć **Auto Doładowanie**.

### 2. Dostawcy z przekierowaniem (MAIB i podobni)

1. Pasażer potwierdza kwotę.
2. Aplikacja **automatycznie otwiera stronę płatności dostawcy** w systemowej lub wbudowanej przeglądarce.
3. Pasażer dokonuje płatności na tej stronie.
4. W międzyczasie aplikacja sprawdza status płatności około **co 5 sekund**.
5. Pasażer może też nacisnąć **Już zapłaciłem**, aby wymusić natychmiastowe sprawdzenie.
6. Płatność, która nie została zakończona, może być **anulowana** z ekranu — to usuwa oczekującą płatność i wraca do Wallet.

### 3. Dostawcy QR (MIA i podobni)

1. Ekran pokazuje na żywo **odliczanie MM:SS** do wygaśnięcia checkoutu.
2. **Otwórz w aplikacji bankowej** otwiera checkout — natywnie, w zewnętrznej przeglądarce lub w oknie przeglądarki w aplikacji.
3. **Kopiuj link** umieszcza link do checkoutu w schowku, aby pasażer mógł dokończyć na innym urządzeniu.
4. Po wygaśnięciu odliczania przycisk Otwórz jest wyłączony, a pojawia się odznaka **Link wygasł**. **Wygasłego checkoutu nie można wznowić** — pasażer zaczyna nowe doładowanie.
5. Sprawdzanie statusu, **Już zapłaciłem** i anulowanie działają dokładnie tak samo jak w procesie z przekierowaniem.

## Rozwiązywanie problemów

| Rider mówi…                          | Co to jest                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Jak doładuję konto?”                 | Portfel → wybierz ustaloną kwotę → następnie jeden z trzech przepływów używanych przez ich dostawcę. Tylko potwierdzenie w aplikacji kończy się bez opuszczania aplikacji       |
| „Nie ma przycisku Dodaj kartę”        | Aktywny dostawca nie obsługuje zapisywania nowych kart                                                                                                 |
| „Nie ma żadnych kart na liście”       | Aktywny dostawca nie obsługuje zapisanych kart                                                                                                        |
| „Formularz karty nie chce się wysłać”| Bezpieczna ramka karty nie zakończyła ładowania lub nadal zgłasza niekompletne lub nieprawidłowe pole                                                  |
| „Moja płatność utknęła w oczekiwaniu”| Stuknij **Już zapłaciłem**, aby ponownie sprawdzić. Jeśli nadal się nie rozwiąże, anuluj ją z **Oczekujących doładowań** i spróbuj ponownie. Rekord oczekujący może też wymagać uzgodnienia przez operatora — zobacz [Oczekujące webhooki](../../operations/payments/pending-webhooks.md). **Nie obiecuj czasu rozwiązania** |
| „Link QR wygasł”                      | Rozpocznij nowe doładowanie; wygasłego nie można ponownie otworzyć                                                                                   |
| „Płatność odrzucona”                  | Odmowa po stronie banku. Kod błędu znajduje się w rekordzie płatności w [Historia → Płatności](history.md#zakładka-płatności)                                |
| „Jakie są limity automatycznego doładowania?” | Nie podawaj limitów — w aplikacji nie są zdefiniowane. Przeczytaj, co mówi opis na ekranie Portfela                                             |

## Wskazówki

- **Dostawca decyduje o ekranie.** Zanim odpowiesz na pytanie „dlaczego nie mogę…”, sprawdź, u którego dostawcy jest rider — połowa brakujących przycisków to możliwości dostawcy, a nie błędy.
- **Oczekujące doładowania to pierwsze miejsce, gdzie należy szukać** odpowiedzi na pytania o pieniądze, które nie dotyczą odrzuconej karty.
- **Anuluj, a potem spróbuj ponownie.** Utknieta płatność oczekująca blokuje model mentalny ridera bardziej niż jego konto; anulowanie i rozpoczęcie od nowa zwykle jest szybsze niż czekanie.
- **Cytuj dialog bezpieczeństwa, a nie własne zapewnienia.** Mówi on dokładnie to, co trzeba o tym, kto przechowuje dane karty.
- **Dodanie karty robi więcej niż umożliwia doładowania** — usuwa też wymóg minimalnego salda startowego na przejazdy i powoduje pojawienie się przycisku **Skanuj**. Zobacz [Mapa](../riding/map.md#dolny-pasek-jest-warunkowy).
