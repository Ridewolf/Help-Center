# Automatyczna weryfikacja Dowodów parkowania

Strona Automatycznej weryfikacji (`/support/park-proofs/auto-review`) to **uproszczony interfejs kolejki**, umożliwiający szybkie przeglądanie oczekujących dowodów parkowania jeden po drugim, bez powrotu do listy między decyzjami.

Pomimo nazwy „Auto”, decyzje moderacyjne należą do Ciebie — _auto_ oznacza tutaj **automatyczne przejście dalej**: po każdej akcji strona automatycznie ładuje następny oczekujący dowód, abyś mógł kontynuować moderację bez klikania powrotu do listy.

Dostęp do niej uzyskasz przez przycisk **Auto Review** na [liście Dowodów parkowania](park-proofs.md).

Wymagane uprawnienie: **Dowody parkowania** (`d5e6f7`) + poduprawnienie `review`.

## Jak to działa

1. Po otwarciu strony ładuje się **bieżąca kolejka oczekujących**
2. Widzisz pierwszy dowód — to samo zdjęcie i te same przyciski akcji co na standardowej [stronie weryfikacji](park-proof-review.md)
3. Wybierz akcję (Zatwierdź / Ostrzeż / Odrzuć z karą / Zablokuj) lub Pomiń
4. Strona **automatycznie przechodzi** do następnego oczekującego dowodu
5. Powtarzaj, aż kolejka będzie pusta
6. Gdy jest pusta, strona przełącza się w **tryb oczekiwania** — okresowo sprawdza nowe dowody i automatycznie je ładuje

Nie stracisz miejsca przez pomyłkę: jeśli zamkniesz kartę i wrócisz, kolejka odbuduje się z tego, co nadal jest oczekujące.

## Układ

Dwie równe kolumny na szerokich ekranach, układające się jedna pod drugą na wąskich:

| Kolumna    | Szerokość | Zawartość                                                    |
| ---------- | --------- | ------------------------------------------------------------ |
| **Obraz**  | 6/12      | Powiększalne zdjęcie + pod nim znacznik czasu utworzenia    |
| **Działania** | 6/12    | Te same przyciski Zatwierdź / Ostrzeż / Odrzuć+kara / Zablokuj / Komentarz |

Pasek postępu u góry pokazuje, jak daleko jesteś w kolejce.

## Nagłówek

- **Tytuł** „Automatyczna weryfikacja Dowodów parkowania”
- **Podtytuł** z postępem: `Przeglądanie X z Y · PP-12345`
- przycisk **Pomiń** (w prawym górnym rogu) — pomija bieżący dowód bez podejmowania decyzji i przechodzi do następnego (dowód pozostaje _Oczekujący_)
- **Strzałka wstecz** — powrót do [listy Dowodów parkowania](park-proofs.md)

**Pasek postępu** pod nagłówkiem wypełnia się podczas pracy — z delikatnym efektem połysku na wypełnionej części.

## Przyciski akcji

Identyczne jak na [stronie pojedynczej weryfikacji](park-proof-review.md):

| Przycisk             | Efekt                                                            |
| -------------------- | ---------------------------------------------------------------- |
| **Zatwierdź**        | Oznacz jako _Zatwierdzony_ → automatyczne przejście dalej        |
| **Ostrzeż**          | Oznacz jako _Ostrzeżenie_ + wyślij powiadomienie do ridera → automatyczne przejście dalej |
| **Odrzuć z karą**    | Oznacz jako _Ukarać_ z kwotą kary wpisaną w polu → automatyczne przejście dalej |
| **Zablokuj**         | Oznacz jako _Zablokowany_ (rider, nie dowód) → automatyczne przejście dalej |
| **Pomiń**            | Nie podejmuj decyzji; przejdź do następnego dowodu (ten pozostaje _Oczekujący_) |
| **Komentarz**        | Opcjonalne pole tekstowe — dołączane do wybranej akcji           |

Po każdej decyzji następny dowód pojawia się płynnie. Nie ma opcji „Cofnij” — po kliknięciu akcja jest zatwierdzona.

## Tryb oczekiwania

Gdy kolejka się wyczerpie, zamiast pustej karty Działań pojawia się **ekran oczekiwania**:

- komunikat „Wszystkie dowody zweryfikowane”
- **odliczanie** do następnego automatycznego odświeżenia (zwykle kilka minut)
- przycisk **Sprawdź teraz** do pominięcia odliczania i natychmiastowego sprawdzenia
- przycisk **Wyjdź** do powrotu do listy

Jeśli w trakcie oczekiwania pojawi się nowy dowód (rider właśnie zakończył przejazd), strona automatycznie go załaduje i wznowi Twój rytm moderacji.

## Kiedy używać Auto Review, a kiedy listy

| Używaj listy (`/support/park-proofs`), gdy…                  | Używaj Auto Review, gdy…                              |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| Sprawdzasz wybrane przypadki klientów lub przejazdów         | Masz do nadrobienia zaległości w ogólnych oczekujących dowodach |
| Potrzebujesz szybkiego zatwierdzenia z menu wiersza          | Chcesz mieć każde zdjęcie na pełnym ekranie           |
| Audytujesz wcześniejsze decyzje (Zatwierdzone / Ukarać itd.) | Skupiasz się teraz na kolejce _Oczekujących_           |
| Chcesz filtrować po zakresie dat, typie lub kliencie          | Chcesz szybko: obraz → akcja → następny                |

Auto Review to narzędzie do pracy w trybie przepływu — otwórz je na początku zmiany moderacyjnej i nie odchodź, aż kolejka będzie pusta.

## Typowe scenariusze

- **Początek zmiany** — otwórz Auto Review → przepracuj wszystkie oczekujące dowody → zakończ na ekranie oczekiwania → zrób przerwę
- **Szybka sesja** — otwórz na 10 minut, wyczyść, co możesz, _Wyjdź_ do listy, gdy coś innego wymaga uwagi
- **Niejasna sprawa w trakcie** — gdy potrzebujesz dodatkowego kontekstu (pełna mapa przejazdu, historia klienta), kliknij powiązane linki w standardowej weryfikacji (tutaj ich nie ma); możesz _Pominąć_ dowód i wrócić do niego z listy

## Wskazówki

- **Najpierw wpisz komentarz** — ta sama zasada co na standardowej stronie weryfikacji: kliknięcie akcji zatwierdza ją zanim zdążysz dodać komentarz
- **Pomiń to Twój przyjaciel** w niejasnych przypadkach — nie nakładaj kary, jeśli jesteś „prawie pewien”; pomiń i zweryfikuj z pełnym kontekstem (historia klienta, mapa przejazdu)
- **Automatyczne przejście jest szybkie** — nie śpiesz się; jeśli pomylisz się przy Odrzuceniu z karą, portfel ridera zostanie obciążony w ciągu sekund
- **Ekran oczekiwania jest zdrowy** — pusta kolejka oznacza, że Twój zespół nadąża. Odpocznij od klawiatury, gdy go zobaczysz
- **Brak filtrów tutaj** — Auto Review przegląda niefiltrowaną kolejkę oczekujących w kolejności przybycia; użyj [listy](park-proofs.md), jeśli chcesz wybrać podzbiór
- **Zamknięcie karty jest bezpieczne** — Twoje miejsce to sama kolejka _Oczekujących_; możesz wrócić do niej w dowolnym momencie, gdy ponownie otworzysz stronę
