# Zadania konserwacyjne

Strona Zadania konserwacyjne (`/maintenance/tasks`) to centrum **zleceń pracy dla Twojej floty** — naprawy, inspekcje, zaplanowane serwisy. Udostępnia **Panel wglądu konserwacji** wspólnie z [Inwentarzem i częściami](inventory.md) oraz [Automatyzacją konserwacji](automation.md), dając Ci aktualny obraz obciążenia pracą konserwacyjną za ostatnie 30 dni.

Znajdziesz ją w pasku bocznym pod **Konserwacja → Zadania**.

> **Uwaga: wkrótce będzie możliwe tworzenie zadań.** Przycisk **Utwórz zadanie** jest obecnie wyłączony i posiada podpowiedź „wkrótce” — rekordy zadań nie mogą być dziś tworzone ani edytowane w produkcie. Liczby w Panelu wglądu są jednak aktualne. Nie planuj przepływu pracy wokół tworzenia zadań tutaj, dopóki funkcja nie zostanie udostępniona.

## Panel wglądu konserwacji

Panel u góry strony jest w pełni funkcjonalny i tylko do odczytu. Obejmuje **ruchome okno 30-dniowe** (stałe — brak selektora dat) i pokazuje:

| Blok           | Metryki                                                    |
| -------------- | ---------------------------------------------------------- |
| **Zadania**    | łącznie, oczekujące, w toku, zakończone, zaległe           |
| **Serwis**     | zaplanowane, zakończone, średni czas trwania, nadchodzące w tym tygodniu |
| **Inwentarz**  | łączna liczba, niski stan, brak na stanie, łączna wartość  |
| **Automatyzacja** | aktywne zasady, wywołane dzisiaj, wskaźnik powodzenia    |

- Płytka zmienia kolor na **ostrzeżenie**, gdy są otwarte zadania, a na **niebezpieczeństwo**, gdy cokolwiek jest niedostępne.
- Pod płytkami: wykres słupkowy rozkładu statusów zadań oraz wskaźnik postępu skuteczności automatyzacji.
- Ten sam panel (i te same dane) pojawia się na wszystkich trzech stronach Konserwacji, więc przełączanie między nimi jest natychmiastowe.

## Model zadania

Chociaż tworzenie nie jest jeszcze dostępne, kształt zadania jest zdefiniowany — przydatne podczas planowania, jak Twój zespół będzie go używać:

- **Etykieta** i **opis**
- **Status** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Priorytet** i **ważność** — każdy `low` / `medium` / `high` / `critical`
- **Wpływ** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Źródło** — `user`, `iot`, `inspection`, `schedule` (skąd pochodzi zadanie)
- **Kategoria / podkategoria**, powiązany **pojazd**, **wykonawca**, **tagi**
- **Koszt** — części, robocizna, suma
- **SLA** — termin i status SLA

Nie ma osobnego pola „typ zadania” — to, co można by nazwać _rutynowym_, _naprawą_ lub _inspekcją_, jest odwzorowane na **źródło**, **kategorię**, **ważność** i **wpływ**.

## Planowany przebieg tworzenia

Po udostępnieniu tworzenie będzie odbywać się w trzech krokach:

1. **Informacje** — nazwa i opis
2. **Status** — wybierz status początkowy
3. **Przegląd** — podsumowanie, do którego możesz wrócić, aby edytować dowolne pole, a następnie zatwierdzić

## Najczęściej zadawane pytania

- **Przycisk „Utwórz zadanie” nie otwiera się — czy to problem z uprawnieniami?** Nie. Przycisk jest wyłączony dla wszystkich, dopóki funkcja nie zostanie ukończona. To normalne.
- **Panel wglądu ignoruje moje filtry dat.** Nie ma ich do zastosowania — okno 30-dniowe jest stałe.
- **Metryki wymiany baterii pokazują zastępcze szkielety.** Ta agregacja nie jest jeszcze dostępna.
- **Gdzie jest historia serwisowa dla pojazdu?** Nie jest dostępna w obecnej wersji. Na razie użyj dziennika aktywności pojazdu na [stronie szczegółów pojazdu](../fleet/vehicle-detail.md) jako najbliższego zapisu.

## Wskazówki

- **Śledź pilne naprawy przez [Bilety](../../support/tickets-proofs-chat/tickets.md) na razie** — dopóki nie będzie tworzenia zadań, kolejka zgłoszeń serwisowych (z polami ważności i SLA) jest działającą alternatywą dla działań następczych.
- **Używaj Panelu wglądu jako pulpitu zdrowia floty** — zaległe zadania i brakujące części to dwie liczby, które zmieniają kolor płytek na czerwony; sprawdzaj je na początku zmiany.
