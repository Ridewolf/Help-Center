# Rider App — Mapa, Rezerwacje i Skanowanie

Mapa (`/map`) to ekran startowy aplikacji Rider oraz ostatni etap onboardingu. Pokazuje trzy rzeczy: pozycję użytkownika, dostępne wokół pojazdy oraz strefy, które wyznaczyłeś dla swojego obszaru operacyjnego.

Personel wsparcia spędza na tym ekranie więcej czasu niż na jakimkolwiek innym, ponieważ najczęstsza skarga użytkowników — _„nie ma możliwości rozpoczęcia przejazdu”_ — jest niemal zawsze rozwiązywana tutaj, w sekcji [The bottom bar is conditional](#dolny-pasek-jest-warunkowy).

Szczegóły dotyczące samego przejazdu (start, pauza, zakończenie, dowody zdjęciowe) znajdziesz w [Rides](rides.md). Po stronie operatora dotyczącej stref zobacz [Zones](../../settings/infrastructure/zones.md).

## Powłoka nawigacyjna

Przycisk **Menu** otwiera boczne menu — to jedyna nawigacja w aplikacji. Nie ma dolnego paska zakładek. Menu zawiera:

| Pozycja w menu         | Otwiera                                      |
| ----------------------- | -------------------------------------------- |
| Wiersz salda portfela   | [Wallet](../money/wallet.md)                  |
| **Historia**            | [History](../money/history.md)                |
| **Wsparcie**            | [Support](../help/support.md)                  |
| **Prywatność**          | Ekran zasad prywatności i bezpieczeństwa      |
| **Ustawienia**          | [Settings](../help/settings.md)                |
| **Profil**              | Ekran profilu użytkownika                      |

Promocje i subskrypcje nie są obecnie dostępne w aplikacji, a menu nie zawiera dla nich pozycji — zobacz [Subscriptions & Promo Codes](../money/subscriptions.md).

## Kontrolki na ekranie

**Górne kontrolki**

- **Menu** — otwiera boczne menu opisane powyżej
- **Jak jeździć** — otwiera pomoc dotyczącą jazdy w aplikacji (zawartość pomocy zarządzana jest przez [Quick Guides](../../settings/content/quick-guides.md))
- **Moja lokalizacja** — centruje mapę na pozycji użytkownika

**Dolny pasek**

| Przycisk       | Kiedy się pojawia                                                                                 | Co robi                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| **Group ride** | Z dolnym paskiem                                                                                  | Otwiera proces jazdy grupowej                                                        |
| **Scan**       | Z dolnym paskiem                                                                                  | Otwiera skaner QR (`/ride/start`), z możliwością ręcznego wpisania kodu pojazdu      |
| **Filters**    | Tylko gdy użytkownik ma prywatne tagi pojazdów do filtrowania i nie jest w trakcie jazdy lub rezerwacji | Filtruje markery według tych tagów                                                  |

### Dolny pasek jest warunkowy

Dolny pasek wyświetla się **tylko gdy użytkownik ma dostęp do płatności za przejazd** — czyli ma powiązaną kartę lub korzysta z dostawcy płatności, który nie obsługuje zapamiętanych kart.

Użytkownik **bez powiązanej karty u dostawcy obsługującego zapamiętane karty nie widzi dolnego paska**, a więc nie ma przycisku **Scan** ani **Group ride**. To celowe działanie i najczęstsza przyczyna problemu „aplikacja nie pozwala rozpocząć przejazdu”.

Rozwiązanie: skieruj go do **Wallet → Manage Payment Methods → Add Card**. Zobacz [Payment Methods](../money/payment-methods.md).

Jeśli brakuje przycisku **Filters**, to użytkownik po prostu nie ma prywatnych tagów pojazdów — lub jest już w aktywnej jeździe albo rezerwacji.

## Znajdowanie pojazdu

1. Pozycja użytkownika pojawia się po udzieleniu zgody na lokalizację. Prośba o nią pojawia się podczas onboardingu i można ją ponownie włączyć w ustawieniach systemowych urządzenia.
2. Dostępne pojazdy wyświetlane są jako markery.
3. Dotknięcie markera otwiera kartę pojazdu — plany taryfowe oraz przyciski **Start** i **Reserve**.
4. Przesuwanie, powiększanie i kontrolka **Moja lokalizacja** działają zgodnie z oczekiwaniami.

### To, co pokazuje marker, zależy częściowo od wyboru użytkownika

Te przełączniki w [Settings](../help/settings.md) zmieniają, co mapa wyświetla:

- **Pokaż poziom baterii**
- **Pokaż pojazdy promocyjne**
- **Pokaż ceny**
- **Auto zoom**
- **Mapa 3D**

Bonusowe strefy na mapie oraz baner z pojazdem ze zniżką w karcie pojazdu nie są obecnie dostępne w aplikacji.

## Strefy

Strefy określają, gdzie można jeździć pojazdem i gdzie można zakończyć przejazd. Dotknięcie strefy otwiera kartę informacji o strefie.

Co dokładnie oznacza dana strefa — obszar ograniczony, zakaz parkowania, ograniczenie prędkości, dopłata — zależy całkowicie od konfiguracji w [Zones](../../settings/infrastructure/zones.md). Nie ma uniwersalnego kodu kolorów do przekazania użytkownikowi; opisz własną konfigurację.

Najczęściej spotykaną przez użytkowników zasadą strefową jest parkowanie: **zakończenie przejazdu poza dozwoloną strefą parkowania jest odrzucane**, a aplikacja otwiera dedykowany dialog z propozycją pokazania stref na mapie. Ten proces opisano w [Rides](rides.md#poza-strefą-parkowania).

## Rezerwacja pojazdu

**Reserve** to prawdziwa rezerwacja z licznikiem czasu, a jej cena pochodzi z taryfy przypisanej do pojazdu:

1. Użytkownik dotyka markera, a następnie **Reserve** na karcie pojazdu.
2. Okres bezpłatny to **Reservation time** taryfy w minutach. W tym czasie karta rezerwacji odlicza **w dół**.
3. Po wygaśnięciu okresu bezpłatnego rezerwacja staje się **płatna**: licznik zmienia się na odliczanie **w górę**, a obowiązuje **Paid reservation price** taryfy za minutę.
4. Płatna część rezerwacji pojawia się jako osobna pozycja w rozliczeniu kosztów zakończonego przejazdu.

Warto wiedzieć, zanim odpowiesz użytkownikowi:

- **Nigdy nie zakładaj „kilku minut”.** Niektóre taryfy oferują długie darmowe okna — 12 lub 24 godziny. Sprawdź rzeczywistą wartość w taryfie w [Taryfach pojazdów](../../settings/infrastructure/vehicle-tariffs.md).
- Jeśli taryfa pozostawia pole **Czas rezerwacji** puste, aplikacja stosuje krótkie 3-minutowe okno. Jeśli pole **Cena rezerwacji płatnej** jest puste, obowiązuje mała domyślna stawka za minutę — ustaw oba pola jawnie, aby użytkownicy widzieli Twoje wartości.
- Rezerwacja może mieć jeden ze stanów: _oczekująca_, _aktywna_, _wygasła_, _zarezerwowana_ lub _wstrzymana_.
- Rezerwacja **wymaga przyznania uprawnienia do lokalizacji** i może zostać odrzucona, jeśli użytkownik jest zbyt daleko od pojazdu lub jeśli na tym pojeździe trwa okres oczekiwania po rezerwacji. Każde odrzucenie wyświetla osobny komunikat — zobacz [Przejazdy](rides.md#dlaczego-użytkownik-nie-może-rozpocząć-przejazdu).

## Rozwiązywanie problemów

| Użytkownik mówi…                   | Co sprawdzić                                                                                                                                                           |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Nie widzę pojazdów”              | Czy przyznano uprawnienie do lokalizacji? Następnie: czy użytkownik znajduje się w obsługiwanym przez Ciebie obszarze?                                               |
| „Brak przycisku Skanuj”           | Brak powiązanej karty u dostawcy obsługującego zapisane karty. Dodaj kartę w [Metodach płatności](../money/payment-methods.md)                                      |
| „Brak przycisku Filtry”           | Użytkownik nie ma prywatnych tagów pojazdów lub jest już w trakcie przejazdu albo rezerwacji                                                                           |
| „Mapa się nie ładuje”             | Najpierw sprawdź łączność, potem **Ustawienia → Tryb danych** (_zrównoważony_ / _niski_ / _wysoki_), który kontroluje jakość kafelków mapy i ilość pobieranych szczegółów |
| „Mapa działa wolno / jest ciężka”| To samo: ustaw **Tryb danych** na _niski_ i włącz **Zredukowane animacje** w [Ustawieniach](../help/settings.md)                                                      |
| „Nie mogę rozpocząć przejazdu”   | Przejdź kolejno przez bramki w [Przejazdach](rides.md#dlaczego-użytkownik-nie-może-rozpocząć-przejazdu) — dolny pasek, plan i płatność, minimalny stan konta, lokalizacja, odległość, czas oczekiwania, dowody |

## Wskazówki

- **Najpierw sprawdź dolny pasek.** Poproś użytkownika o zrzut ekranu mapy; brak dolnego paska natychmiast diagnozuje problem.
- **Uprawnienie do lokalizacji to zawsze drugie pytanie.** Brak pozycji oznacza brak rezerwacji i w większości przypadków brak możliwości rozpoczęcia przejazdu.
- **Strefy znaczą tylko tyle, ile im przypiszesz.** Zanim powiesz użytkownikowi „nie możesz tu zaparkować”, otwórz strefę w Pulpicie i przeczytaj jej rzeczywistą konfigurację.
- **Długie darmowe okna rezerwacji zaskakują wszystkich**, w tym Twój personel. Poznaj wartość **Czasu rezerwacji** w swojej taryfie, zanim wyjaśnisz opłatę za wstrzymanie.
