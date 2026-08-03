# Chat AI

Pulpit zawiera **asystenta AI**, który rozumie produkt, może czytać dane na żywo z ekranów, na których się znajdujesz, i — za twoją zgodą — może podejmować działania w twoim imieniu. Traktuj go jak współpracownika siedzącego obok: zadaj pytanie, poproś o wykonanie czegoś lub wyjaśnienie tego, co widzisz.

## Otwieranie panelu

Kliknij **ikonę iskierki** (✨) na górnym pasku. Chat otworzy się jako panel boczny po prawej stronie.

- Jeśli na ikonie świeci się mała odznaka `*` gwiazdki, AI wygenerowało nową odpowiedź od ostatniego spojrzenia na panel.
- Panel można też otworzyć skrótem `⌘ + K` / `Ctrl + K` na większości stron (tam, gdzie skrót jest aktywny).

## Co potrafi

Pięć kategorii możliwości, w kolejności rosnącej mocy:

| Możliwość         | Przykłady                                                                     |
| ----------------- | ----------------------------------------------------------------------------- |
| **Wyjaśniać**     | „Co oznacza ten status?”, „Jak utworzyć taryfę?”                             |
| **Wyszukiwać**    | „Ile jest aktywnych pojazdów w Strefie A?”, „Pokaż nieudane płatności z wczoraj” |
| **Nawigować**     | „Otwórz stronę Przejazdy z filtrem na dziś”, „Przejdź do pojazdu RW-001”      |
| **Wypełniać formularze** | „Utwórz nowy tag o nazwie 'VIP' w kolorze czerwonym i przypisz go klientowi X” |
| **Modyfikować dane** | „Zablokuj pojazd RW-001”, „Zwróć płatność #12345”, „Wyślij powiadomienie do wszystkich w Strefie A” |

AI korzysta z **tych samych API i tych samych uprawnień**, które masz ty. Jeśli nie możesz wykonać jakiejś akcji ręcznie, AI też nie może jej wykonać w twoim imieniu. To granica bezpieczeństwa — nie ma trybu „superużytkownika AI”.

## W panelu

### Nagłówek

- **Iskierka + tytuł** „Chat AI”
- **Odznaka nazwy agenta** po prawej (zielona pigułka z połyskiem) pokazuje, który agent jest aktywny — kliknij, aby otworzyć ustawienia i zmienić agenta
- **Odznaka kontekstu** pojawia się pod opisem, gdy rozmowa zawiera wiadomości — pokazuje, jak pełne jest okno pamięci AI (np. „12 wiadomości · 35% kontekstu”)

### Bąbelek statusu na żywo

Gdy AI wykonuje coś wieloetapowego (wyszukiwanie danych, otwieranie stron, wywoływanie narzędzi), pojawia się **bąbelek statusu na żywo** pokazujący każdy krok w czasie rzeczywistym:

- _Wyszukiwanie pojazdów…_
- _Otwieranie /vehicles…_
- _Wypełnianie formularza: Status = Aktywny…_
- _Wysyłanie…_

Możesz śledzić, co się dzieje na bieżąco i zatrzymać się wcześniej, jeśli coś idzie nie tak.

### Rozmowa

Rozmowa przebiega jak chat: wiadomości użytkownika po prawej, odpowiedzi AI po lewej, renderowane w markdown (działają listy, tabele, kod, linki). Można rozwinąć wykonania narzędzi, by zobaczyć dokładne argumenty i odpowiedzi — przydatne do weryfikacji wykonanych działań.

### Wprowadzanie

- **Wpisz wiadomość** i naciśnij `Enter`, aby wysłać; `Shift + Enter` dla nowej linii
- Pole wprowadzania rośnie podczas pisania
- Pliki / wklejane obrazy nie są obecnie obsługiwane w czacie

## Potwierdzanie modyfikacji

Dla potencjalnie destrukcyjnych działań (usuwanie, zwrot, zmiana statusu, operacje zbiorcze) AI pokazuje **potwierdzenie w linii** zamiast natychmiastowego wykonania:

- Podsumowanie tego, co ma się wydarzyć („Zwrot płatności #12345 — 42,50 USD dla John Doe”)
- Przyciski **Potwierdź** / **Anuluj**
- Nic się nie dzieje, dopóki nie potwierdzisz

Przeczytaj podsumowanie uważnie — to jedyna kontrola bezpieczeństwa między zrozumieniem AI a twoimi danymi.

## Ustawienia

Kliknij **odznakę nazwy agenta** w nagłówku, aby otworzyć okno ustawień:

- **Wybór agenta** — wybierz personę agenta (różni agenci są dostrojeni do różnych zadań: flota, wsparcie, analizy)
- **Model** — wybierz podstawowy LLM (jeśli dostępnych jest kilka)
- **Dozwolone narzędzia** — selektywnie wyłącz narzędzia (np. zablokuj modyfikacje, jeśli chcesz tylko pytania i odpowiedzi)
- **Historia rozmowy** — wyczyść, eksportuj

## Okno kontekstu

AI ma ograniczoną pamięć bieżącej rozmowy. W trakcie czatu kontekst się zapełnia; zobaczysz to jako procent na odznace w nagłówku.

- **Poniżej 70%** — dużo miejsca
- **70–90%** — zapełnia się; rozważ rozpoczęcie nowej rozmowy dla innego tematu
- **Powyżej 90%** — starsze wiadomości mogą być podsumowywane, aby zrobić miejsce; AI może zapomnieć wczesne szczegóły

Rozpoczęcie nowej rozmowy dla nowego zadania jest tanie i utrzymuje AI w dobrej formie.

## Wskazówki

- **Bądź precyzyjny** — „Zablokuj RW-001” jest lepsze niż „zablokuj ten skuter, o którym rozmawialiśmy”
- **Weryfikuj przed potwierdzeniem modyfikacji** — przeczytaj podsumowanie na karcie potwierdzenia. AI czasem wywnioskuje obiekt, którego nie miałeś na myśli
- **Zapytaj „co tu potrafisz?”** na dowolnej stronie — AI zna narzędzia odpowiednie do aktualnego ekranu
- **Używaj do wyjaśniania nieznanych danych** — wklej kod statusu lub etykietę ekranu i zapytaj „co to znaczy?”
- **Uprawnienia nadal obowiązują** — jeśli AI mówi „nie mogę tego zrobić”, to prawie zawsze brak uprawnień, a nie brak funkcji
- **Dane wrażliwe** — traktuj czat jak ekran współpracownika. Nie wklejaj haseł, numerów kart płatniczych ani danych, których nie chciałbyś, by były logowane
- **Rozłączenia** — jeśli AI zatrzyma się w trakcie działania, przewiń w górę, aby znaleźć ostatni bąbelek statusu na żywo; pokaże dokładnie, gdzie się zatrzymało
