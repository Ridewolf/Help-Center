# Zasady dotyczące pojazdów

Strona Zasady dotyczące pojazdów (`/settings/vehicle-rules`) to **katalog modeli pojazdów**, które Ridewolf potrafi obsługiwać — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_ i tak dalej. Każdy wiersz tutaj to **szablon modelu**: wielokrotnego użytku zestaw cen, limitów technicznych, zasad dowodów fotograficznych i tagów, który jest przypisywany do poszczególnych fizycznych [pojazdów](../../operations/fleet/vehicles.md) za pomocą [formularza pojazdu](../../operations/fleet/vehicle-create-edit.md).

Wymagane uprawnienie: **Zasady dotyczące pojazdów** (`e7f8g9`). Pod-uprawnienia: `create` / `edit` / `delete`.

## Model a egzemplarz pojazdu

To najważniejsze rozróżnienie na tej stronie:

- **Model pojazdu** (ta strona) — definicja. _„Każdy Xiaomi M365 w naszej flocie zachowuje się w ten sposób”_. Jeden wiersz na markę/konfigurację.
- **Pojazd** (lista [Pojazdów](../../operations/fleet/vehicles.md)) — jednostka fizyczna z naklejką identyfikacyjną, np. `RW-007`, powiązana z jednym urządzeniem IoT, zaparkowana gdzieś. Setki takich wskazują na jeden model.

Gdy zmieniasz model tutaj, każdy pojazd do niego przypisany dziedziczy nowe domyślne ustawienia — taryfy stają się aktywne, limity prędkości się aktualizują, wymagania dotyczące dowodów fotograficznych wchodzą w życie. Traktuj tę stronę jako **warstwę polityki**, która rozchodzi się na wiele jednostek jednocześnie.

## Filtry

Górny pasek filtrów ma trzy kontrolki:

| Filtr        | Typ       | Uwagi                                                                                 |
| ------------ | --------- | ------------------------------------------------------------------------------------ |
| **Szukaj**   | Tekst     | Przeszukuje etykietę modelu                                                         |
| **Status**   | Lista     | `Wszystkie` / `Aktywny` / `Nieaktywny` / `Zarchiwizowany`                           |
| **Typ**     | Lista     | `Wszystkie` / `E-hulajnoga` / `E-rower` / `E-rower towarowy` / `E-skuter` / `E-samochód` / `E-łódź` |

Zmiana dowolnego filtra resetuje paginację do strony 1 i przeładowuje dane z serwera.

## Kolumny

| Kolumna         | Sortowalna? | Zawartość                                                                                   |
| --------------- | ----------- | ------------------------------------------------------------------------------------------- |
| **Obraz**       | —           | Miniatura 64×64; jeśli brak obrazu, pokazuje się ogólna ikona samochodu                      |
| **Nazwa**       | ✓           | Etykieta modelu (np. _Xiaomi M365 Pro_)                                                    |
| **Typ**         | ✓           | Pigułka typu pojazdu (e-hulajnoga, e-rower, …)                                            |
| **Opis**        | ✓           | Pierwsze 36 znaków opisu w markdown, bez formatowania                                      |
| **Tagi**        | —           | Do 2 pigułek tagów + chip `+N` na nadmiar — **kliknij, aby szybko edytować** w oknie dialogowym |
| **Status**      | ✓           | Kolorowa pigułka: Aktywny (zielony) / Nieaktywny (szary) / Zarchiwizowany (niebieski) — **kliknij, aby szybko edytować** |
| **Utworzono**   | ✓           | Data utworzenia modelu                                                                     |
| **Zaktualizowano** | ✓        | Data ostatniej zmiany                                                                      |

Kliknięcia szybkiej edycji otwierają małe okno dialogowe z wielokrotnym wyborem tagów lub listą statusów — przydatne do masowej zmiany statusów bez opuszczania listy.

## Akcje na pasku narzędzi

Przyciski w prawym górnym rogu (widoczność zależy od uprawnień):

| Przycisk         | Uprawnienie | Co robi                                                                                                                    |
| ---------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Auto-odświeżanie** | —        | Odświeża listę w stałych odstępach; przełącznik włącz/wyłącz; ikona kręci się podczas ładowania                             |
| **Importuj**     | `create`    | Wybierz plik JSON (format eksportu). Każdy element wywołuje `create`; tagi i taryfy są usuwane — trzeba je przypisać ręcznie |
| **Eksportuj**    | —           | Otwiera okno dialogowe do eksportu bieżącej strony / wszystkich przefiltrowanych / wybranych stron jako `vehicle-models-export.json` |
| **+ Utwórz**     | `create`    | Przechodzi do `/settings/vehicle-rules/create`                                                                              |

## Akcje w wierszu

Menu z trzema kropkami przy każdym wierszu:

| Akcja            | Uprawnienie | Co robi                                                                                                                   |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Pokaż szczegóły** | —         | Otwiera szczegóły modelu pod `/settings/vehicle-rules/:id` (zakładki Ogólne / Techniczne / Historia)                       |
| **Edytuj**       | `edit`      | Otwiera formularz edycji (`/settings/vehicle-rules/:id/edit`) z pełnym zestawem pól                                         |
| **Usuń**         | `delete`    | Potwierdzenie destrukcyjne z 3-sekundowym opóźnieniem przed aktywacją przycisku potwierdzenia. Wiersz modelu znika z listy |

Kliknięcie samego wiersza (poza chipami szybkiej edycji) przechodzi do **Pokaż szczegóły**.

## Formularz tworzenia / edycji

`+ Utwórz` (`/settings/vehicle-rules/create`) i _Edytuj_ (`/settings/vehicle-rules/:id/edit`) mają ten sam układ: karta formularza po lewej, kontekstowy pasek boczny **Przewodnik po polach** po prawej z podglądem modelu na żywo.

Formularz jest podzielony na sekcje — Tworzenie pokazuje tylko podstawowe siedem pól; Edycja dodaje trzy dodatkowe podsekcje (Specyfikacje techniczne, Polityki automatyczne, Wymagania dokumentacyjne) dla zaawansowanych ustawień.

### Podstawowe pola

| Pole             | Wymagane | Uwagi                                                                                                                                   |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Etykieta**     | ✓        | Nazwa widoczna wszędzie (np. _Xiaomi M365 Pro_). Dowolny tekst                                                                        |
| **Opis**         | —        | Edytor Markdown; używany w szczegółach modelu i w wskazówkach dla operatora                                                          |
| **Typ pojazdu**  | ✓        | Jeden z: e-hulajnoga / e-rower / rower towarowy / e-skuter / e-samochód / e-łódź. Ikona pojazdu i logika kategorii                   |
| **Status**       | ✓        | Aktywny / Nieaktywny / Zarchiwizowany. Nieaktywny usuwa model z wyboru tworzenia pojazdu                                              |
| **Obraz**        | —        | Przeciągnij i upuść lub kliknij, aby przesłać. PNG/JPEG/JPG, max 10 MB. Pokazywany jako miniatura na liście i w szczegółach pojazdu |
| **Taryfy**       | ✓        | Wielokrotny wybór z [Taryf pojazdów](vehicle-tariffs.md). Wszystkie przejazdy tym modelem wyceniane są według tych taryf             |
| **Tagi**         | ✓        | Wielokrotny wybór tagów na poziomie modelu. Dziedziczone przez każdy pojazd tego modelu                                              |

### Specyfikacje techniczne (tylko tryb edycji)

| Pole                              | Uwagi                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| **Podstawowy limit prędkości (km/h)** | Twardy limit wymuszany przez oprogramowanie IoT przy każdym przejeździe                  |
| **Rezerwa baterii (%)**           | Poziom naładowania poniżej którego pojazd uznawany jest za mający niski poziom baterii  |
| **Rezerwa zasięgu (km)**          | Szacowany pozostały zasięg poniżej którego jednostka jest oznaczana do wymiany          |
| **Min / Max napięcie baterii (V)** | Granice prawidłowych odczytów głównej baterii — wartości poza tym zakresem oznaczają _Wymaga sprawdzenia_ |
| **Min / Max napięcie IoT (V)**   | To samo, dla baterii modułu IoT trackera                                              |

### Polityki automatyczne (tylko tryb edycji)

Przełącz pakiet: **Zatrzymanie przy niskim poziomie baterii**, **Zatrzymanie przy niskim saldzie**, **Wiele przejazdów**, **Auto-zamknięcie**, plus **Auto-zwrot** i **Auto-rabat** z własnymi progami (dystans / czas / kwota).

### Wymagania dotyczące dokumentów (tylko tryb edycji)

Określa, jakie zdjęcia / dokumenty musi dostarczyć użytkownik:

- **Dowody startu** — zdjęcia pojazdu na początku przejazdu (przełącznik + wymagane + liczba) oraz selfie użytkownika
- **Dowody parkowania** — zdjęcia parkowania na końcu przejazdu (przełącznik + wymagane + liczba)
- **Dodatkowe dokumenty** — prawo jazdy / paszport / dowód osobisty / selfie / inne

Te zasady są odczytywane przez aplikację Rider App przy rozpoczynaniu / kończeniu przejazdu na pojeździe przypisanym do tego modelu.

## Relacje z innymi encjami

- **[Taryfy pojazdów](vehicle-tariffs.md)** — wiersze cenowe wybierane w polu **Taryfy**. Model bez taryf nie może wycenić przejazdu
- **[Pojazdy](../../operations/fleet/vehicles.md)** — fizyczne jednostki wskazujące na ten model przez pole _Model pojazdu_ w [formularzu pojazdu](../../operations/fleet/vehicle-create-edit.md). Model definiuje politykę; pojazd posiada IoT, etykietę i lokalizację
- **Tagi** — tagi na poziomie modelu dziedziczone przez każdy pojazd tego modelu, oprócz tagów na poziomie pojazdu stosowanych bezpośrednio do jednostki. Przejazdy dziedziczą oba zestawy przy rozpoczęciu przejazdu

## Typowe przepływy pracy

- **Dodaj nowy model** — `+ Utwórz` → wypełnij Etykietę / Typ / Status / Obraz → wybierz obowiązujące taryfy → zapisz → otwórz nowy model z listy i kliknij _Edytuj_, aby ustawić Specyfikacje techniczne i polityki
- **Wycofaj model** — otwórz model → _Edytuj_ → ustaw Status = _Zarchiwizowany_ → zapisz. Istniejące pojazdy działają dalej; model po prostu nie pojawia się już w wyborze tworzenia pojazdu
- **Zmiana taryfy w całej flocie** — edytuj model → zmień taryfy → zapisz. Wszystkie pojazdy tego modelu zaczną wyceniać przejazdy według nowych taryf od następnego przejazdu
- **Masowy import po migracji** — Eksportuj ze środowiska testowego → Importuj plik JSON tutaj → ręcznie dołącz taryfy i tagi do każdego nowego modelu (import celowo usuwa te odniesienia)
- **Dostosuj wymagania dotyczące zdjęć** — Edytuj → Wymagania dotyczące dokumentów → przełącz Dowody startu / parkowania → zapisz. Aplikacja Rider App pobierze nowe zasady przy następnym rozpoczęciu przejazdu

## Wskazówki

- **Ustaw taryfy przed włączeniem statusu Aktywny** — model bez taryf odrzuci żądania wyceny przejazdu
- **Używaj Nieaktywny, nie Usuń, aby wycofać model** — Nieaktywny ukrywa model przed tworzeniem nowych pojazdów, ale zachowuje historię. Usunięcie jest nieodwracalne i zablokowane przez 3-sekundowe opóźnienie potwierdzenia z ważnego powodu
- **Obraz ma znaczenie** — miniatura na liście i wybory pojazdów dla operatora używają tego obrazu. Kadruj do kwadratu z przezroczystym tłem dla najlepszego efektu
- **Tagi tutaj są na poziomie modelu, nie pojazdu** — zastosowanie tagu tutaj przypisuje go do każdego pojazdu tego modelu. Dla tagów specyficznych dla jednostki edytuj pojazd indywidualnie
- **Alerty Specyfikacji technicznych** — rezerwa baterii i granice napięcia zasilają wyzwalacz _Wymaga sprawdzenia_; ustawienie ich zbyt restrykcyjnie powoduje zalew alertów
- **Panel Pomocy aktualizuje się podczas fokusowania na polu** — przeczytaj go przy pierwszym tworzeniu modelu, jest bardziej aktualny niż ten artykuł
