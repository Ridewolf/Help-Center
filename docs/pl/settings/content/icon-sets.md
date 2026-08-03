# Zestawy ikon

Strona Zestawy ikon (`/settings/icon-sets`) to **biblioteka ikon mapy**, której używa mobilna aplikacja Ridewolf Rider do wyświetlania pojazdów. Każdy zestaw jest przypisany do jednego typu pojazdu (hulajnoga elektryczna, rower elektryczny, rower towarowy elektryczny, motorower elektryczny, samochód elektryczny, łódź elektryczna) i zawiera trzy kategorie ikon SVG: **Wybrane**, **Niewybrane** oraz **Zniżka**.

To infrastruktura treści — operatorzy przesyłają SVG tutaj, aplikacja Rider wybiera odpowiednią ikonę na podstawie typu pojazdu, poziomu baterii oraz tego, czy użytkownik dotknął pojazdu na mapie. Nie jest potrzebne wydanie nowej wersji aplikacji mobilnej, aby zmienić grafikę.

Wraz z [FAQ Sets](faq-sets.md) i [Quick Guides](quick-guides.md) jest to warstwa treści Pulpitu.

Wymagane uprawnienie: **Zestawy ikon** (sprawdź u administratora).

## Gdzie to widzi użytkownik

Na mapie w aplikacji Rider każda pinezka pojazdu używa ikony z aktywnego zestawu dla swojego typu pojazdu:

- Ikony **Niewybrane** są używane dla pinezek, których użytkownik nie dotknął — sześć poziomów baterii (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`), aby pinezka odzwierciedlała aktualny stan naładowania
- Ikony **Wybrane** zastępują pinezkę po dotknięciu przez użytkownika — te same sześć poziomów baterii, inny styl
- Ikony **Zniżka** (domyślnie 5%, 15%, 25%, 35%, 45%, 55%) nakładają się na pinezkę, gdy pojazd ma cenę promocyjną

Dla każdego typu pojazdu można oznaczyć jeden zestaw jako **domyślny** — to ten, który aplikacja ładuje, gdy nic innego nie jest skonfigurowane.

## Filtry

| Filtr           | Typ      | Uwagi                                                                                                            |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Szukaj          | Tekst    | Pole wyszukiwania w nagłówku — przeszukuje tytuł / slug                                                         |
| Typ pojazdu     | Lista    | `Hulajnoga elektryczna` / `Rower elektryczny` / `Rower towarowy elektryczny` / `Motorower elektryczny` / `Samochód elektryczny` / `Łódź elektryczna` (lub `Wszystkie`) |
| Pokrycie stanu  | Lista    | Filtruj według wypełnienia: `Tylko wybrane` / `Tylko niewybrane` / `Tylko zniżki` / `Pełne pokrycie` (lub `Wszystkie`) |
| Status          | Lista    | `Aktywny` / `Szkic` / `Niekompletny` / `Zarchiwizowany` (lub `Wszystkie`)                                        |
| Tagi            | Kombobox | Filtr tagów dowolnego formatu (pole widoczne, ale obecnie wyłączone — wkrótce)                                   |

**Wyczyść wszystko** resetuje wszystkie filtry.

## Kolumny

| Kolumna                | Zawartość                                                                |
| ---------------------- | ------------------------------------------------------------------------ |
| **Zestaw**             | Ikona pakietu + tytuł; druga linia pokazuje slug                         |
| **Typ pojazdu**        | Etykieta (Hulajnoga elektryczna, Rower elektryczny itd.)                  |
| **Ikony wybrane**      | Pokrycie, np. `6/6` (ile poziomów baterii jest przesłanych)              |
| **Ikony niewybrane**   | To samo `n/6` pokrycie dla wariantów niewybranych                        |
| **Ikony zniżek**       | Pierwsze 3 procenty zniżek jako chipy (`5%`, `15%`, `25%`), `+N` nadmiar   |
| **Tagi**               | Pierwsze 2 chipy tagów z `+N` nadmiarem                                  |
| **Zaktualizowano**     | Data ostatniej aktualizacji                                              |
| **Status**             | `Aktywny` / `Szkic` / `Niekompletny` / `Zarchiwizowany`                 |

`Niekompletny` oznacza, że zestaw nie ma ikon dla jednej z trzech kategorii — aplikacja Rider korzysta wtedy z domyślnego zestawu dla tego typu pojazdu, dopóki nie zakończysz przesyłania.

Kliknij w wiersz, aby otworzyć **okno szczegółów** — wizualną podgląd wszystkich ikon w zestawie. Kliknij menu z trzema kropkami, aby wykonać akcje.

## Akcje w wierszu

| Akcja               | Co robi                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| **Wyświetl szczegóły** | Otwiera okno szczegółów z podglądem wszystkich przesłanych SVG                     |
| **Edytuj**           | Otwiera formularz z wieloma zakładkami (Szczegóły / Wybrane / Niewybrane / Zniżki / Podgląd) |
| **Duplikuj**         | Klonuje zestaw jako Szkic                                                           |
| **Ustaw jako domyślny** | Oznacza ten zestaw jako domyślny dla jego typu pojazdu — aplikacja Rider go załaduje |
| **Pobierz**          | Pobiera zestaw jako ZIP ze wszystkimi SVG                                          |
| **Archiwizuj**       | Przenosi do `Zarchiwizowanych` — zachowane dla historii, nieużywane przez aplikację  |
| **Usuń**             | Usuwa na stałe                                                                    |

Przyciski **Importuj** (ZIP / JSON) i **Eksportuj** (ZIP / JSON) na pasku narzędzi działają masowo.

## Formularz tworzenia / edycji

Formularz to okno dialogowe z pięcioma zakładkami:

1. **Szczegóły** — tytuł (wymagany), slug (generowany automatycznie), typ pojazdu (wymagany), tagi, status
2. **Wybrane** — przesyłanie 6 plików SVG, po jednym na poziom baterii (`bat10` → `bat100`)
3. **Niewybrane** — te same 6 miejsc, dla stanu mapy niewybranego
4. **Zniżki** — jeden SVG na procent zniżki. Domyślne wartości to `5, 15, 25, 35, 45, 55`, ale możesz dodawać lub usuwać wiersze
5. **Podgląd** — wizualna kontrola całego zestawu przed zapisem

Zestaw z pustymi miejscami w którejkolwiek zakładce jest zapisywany jako `Niekompletny`.

## Typowe przepływy pracy

- **Odśwież pinezki hulajnóg elektrycznych dla rebrandingu** — Zduplikuj obecny domyślny zestaw → prześlij nowe pliki SVG na wszystkich trzech kartach → zapisz jako szkic → podgląd → Ustaw jako domyślny → aplikacja Rider App pobierze je przy następnym odświeżeniu
- **Przeprowadź test A/B ikon** — zachowaj stary zestaw jako Aktywny i nie-domyślny, utwórz nowy zestaw jako Aktywny + domyślny dla typu pojazdu → w razie potrzeby przywróć stary, ustawiając go jako domyślny
- **Grafika zniżek świątecznych** — otwórz aktywny zestaw → Edytuj → karta Zniżki → prześlij tematyczne pliki SVG dla aktualnie używanych procentów → zapisz
- **Masowy import ZIP od projektanta** — w prawym górnym rogu _Importuj_ → ZIP → potwierdź mapowanie plików → przejrzyj w Podglądzie → Aktywuj

## Wskazówki

- **Jeden domyślny zestaw na typ pojazdu** — ustawienie nowego domyślnego automatycznie usuwa poprzedni. Odznaka Status nie musi być `Aktywny`, aby zestaw był domyślny, ale powinien być
- **Poziomy baterii są stałe** — `bat10/25/40/55/90/100` to jedyne poziomy rozpoznawane przez aplikację; aplikacja wybiera najbliższy na podstawie aktualnego stanu naładowania pojazdu
- **Tylko SVG** — przesyłane pliki muszą być w formacie SVG; PNG nie skalują się dobrze na ekranach retina
- **`Niekompletny` to przydatna ochrona** — informuje, że aplikacja Rider App korzysta z domyślnego zestawu, więc nigdy nie wyślesz przypadkowo niepełnego zestawu
- **Archiwizuj przed usunięciem** — zarchiwizowane zestawy pozostają wyszukiwalne na wypadek potrzeby przywrócenia
