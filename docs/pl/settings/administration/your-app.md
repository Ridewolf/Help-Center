# Twoja aplikacja (White-Label)

Strona Twoja aplikacja (`/settings/your-app`) to **kreator, który zbiera wszystko, co potrzebne do zbudowania i opublikowania markowej aplikacji dla użytkowników pod własną tożsamością** — nazwa aplikacji, domena, zasoby marki, teksty do sklepu, zrzuty ekranu i linki prawne. Podgląd na żywo na urządzeniu obok formularza pokazuje Twoje wybory na przykładowych ekranach iPhone i Android w trakcie pisania.

Znajdziesz ją w pasku bocznym pod **Ustawienia → Twoja aplikacja**.

Kreator ma osiem kroków: **Tożsamość → Domena → Zasoby → Listing → Zrzuty → Prawo → Wydawca → Przegląd**. Ten artykuł obejmuje pierwsze sześć; Wydawca i Przegląd są opisane w [Your App: Publisher & Submission](your-app-publisher.md).

## Cykl życia statusu

Karta statusu u góry pokazuje, na jakim etapie jest Twoja aplikacja, z wersją i znacznikami czasu:

**szkic → przygotowanie → w recenzji → produkcja**, lub **odrzucona**.

- Kreator jest **edytowalny** gdy status to `draft` lub `rejected` — odrzucenie ponownie otwiera formularz, abyś mógł poprawić to, co sklep zakwestionował.
- Jest **tylko do odczytu** gdy aplikacja jest w rękach pipeline: `provisioning`, `in-review` i `production`. W tych stanach strona jest podsumowaniem, a linki do sklepu — **TestFlight, Play internal testing, App Store, Play Store** — pojawiają się w miarę dostępności.

## Krok Tożsamość

- **Nazwa aplikacji** (wymagana) — **automatycznie generuje identyfikatory pakietów iOS i Android oraz subdomenę**, więc ustaw ją ostrożnie.
- **Nadpisanie pakietu** — przełącznik odblokowujący ręczne wpisanie identyfikatorów pakietów iOS i Android, jeśli te wygenerowane Ci nie odpowiadają.
- **Kolor ikony** — wartość szesnastkowa używana do obramowania ikony aplikacji i tła ekranu powitalnego.

## Krok Domena

- **Typ domeny** — wybór radiowy między **subdomeną** (generowaną z nazwy aplikacji) a **własną domeną**.
- **Własna domena** — pole tekstowe pojawiające się tylko, gdy typ to `custom`.

## Krok Zasoby

- Przełącznik **Monochromatyczny** — decyduje, czy jeden zestaw grafik służy obu motywom.
- **Symbol** i **logotyp** — zawsze wymagane.
- **Symbol / logotyp w ciemnym motywie** — widoczne tylko, gdy Monochromatyczny jest wyłączony, czyli gdy dostarczasz osobne grafiki na jasny i ciemny motyw.

Strefa upuszczania akceptuje przeciąganie i upuszczanie lub wklejony URL. Bezpośredni upload binarny nie jest jeszcze dostępny — w praktyce na razie dostarczaj każdy zasób jako URL.

## Krok Listing

Teksty do sklepu, z ograniczeniami znaków wymuszanymi przez pola:

| Pole                  | Limit                                       |
| --------------------- | ------------------------------------------- |
| **Podtytuł**          | 30 znaków                                  |
| **Krótki opis**       | 80 znaków                                  |
| **Tekst promocyjny**  | 170 znaków (tekst promocyjny App Store)   |
| **Słowa kluczowe**    | 100 znaków, oddzielone przecinkami         |
| **Pełny opis**        | 4000 znaków                                |

- **Kategoria** — podróże, nawigacja, sport, lifestyle, zdrowie i fitness lub biznes.
- **Języki sklepu** — wybierz z obsługiwanych lokalizacji. **Pierwszy wybrany język jest bazowy**; każdy dodatkowy język ma własną zakładkę z nadpisaniami podtytułu, opisów, tekstu promocyjnego i słów kluczowych. Puste pola w nadpisaniu korzystają z automatycznego tłumaczenia z języka bazowego.

## Krok Zrzuty

Sześć stałych wariantów zrzutów ekranu, każdy wymaga **nagłówka** i **podtytułu**: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. Podgląd na żywo w prawej kolumnie renderuje je z Twoimi zasobami marki, aktualizując na bieżąco podczas pisania.

## Krok Prawo

Polityka prywatności, warunki korzystania, URL wsparcia, e-mail wsparcia, telefon wsparcia i URL marketingowy. Te dane są **wstępnie wypełniane z profilu [Moja firma](my-company.md)**, jeśli tam istnieją — najpierw uzupełnij Moja firma, aby zaoszczędzić pracy.

## Najczęstsze pytania

- **Identyfikatory pakietów wyglądają nieprawidłowo.** Są generowane z nazwy aplikacji — włącz nadpisanie pakietu, aby ustawić je ręcznie.
- **Brak pól zasobów dla wariantu ciemnego.** Pojawiają się tylko, gdy Monochromatyczny jest wyłączony.
- **Nie mogę już nic edytować.** Status to `provisioning`, `in-review` lub `production` — aplikacja jest w rękach pipeline. Edycja zostanie automatycznie odblokowana, jeśli zgłoszenie zostanie odrzucone.
- **Tekst podtytułu jest obcinany.** Limit to 30 znaków — mniej niż możesz się spodziewać.
- **Pole własnej domeny nie jest widoczne.** Najpierw ustaw typ domeny na `custom`.
- **Strona pokazuje komunikat "local draft".** Twoje zmiany są przechowywane tylko w tej przeglądarce i nie są jeszcze zsynchronizowane — nie zakładaj, że zostaną automatycznie zachowane; sprawdź formularz ponownie, gdy komunikat zniknie.
