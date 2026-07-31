# Automatyzacja konserwacji

Strona Automatyzacji konserwacji (`/maintenance/automation`) to miejsce, gdzie będą się znajdować **zasady automatycznie wywołujące prace konserwacyjne** — „co 500 km utwórz zadanie inspekcji”, „gdy wystąpi zdarzenie baterii, zamów części”. Dzieli **Panel wglądu konserwacji** z [Zadaniami konserwacyjnymi](tasks.md) i [Inwentarzem i częściami](inventory.md).

Znajdziesz ją w pasku bocznym pod **Konserwacja → Automatyzacja**.

> **Uwaga: automatyzacja wkrótce będzie dostępna.** Przełącznik **Włącz zasady automatyzacji** jest wyłączony, z wyjaśnieniem widocznym bezpośrednio w interfejsie, a zasady nie mogą być jeszcze tworzone. Liczby automatyzacji w Panelu wglądu (aktywne zasady, wywołane dziś, wskaźnik sukcesu) to żywa część strony.

## Jak kształtuje się zasada

Zasada łączy **jeden wyzwalacz z jedną akcją**:

- **Typ wyzwalacza** — `mileage`, `time`, `event` lub `schedule` oraz jego parametry
- **Typ akcji** — `create_task`, `send_notification`, `order_parts` lub `schedule_service` oraz jej konfiguracja
- **Nazwa**, **opis**, **status** (`active` / `inactive` / `paused`)
- **Dotyczy** — które pojazdy lub grupy obejmuje zasada
- **Warunki** — dodatkowe kryteria, które musi spełnić wyzwalacz
- Księgowość wykonania: **liczba wykonań**, **ostatnie uruchomienie**, **historia wykonania**

## Planowany przebieg tworzenia

Tworzenie zasady będzie odbywać się w trzech krokach:

1. **Wyzwalacz** — nazwa, opis, typ wyzwalacza i jego parametry
2. **Akcja** — wybierz typ akcji
3. **Przegląd** — zasada jest przedstawiona jako zdanie w języku naturalnym, _„Gdy {wyzwalacz}, {akcja}”_, aby można było ją zweryfikować przed zapisaniem

## Najczęściej zadawane pytania

- **Przełącznik włączania nie działa — uprawnienia?** Nie. Jest wyłączony dla wszystkich, dopóki funkcja nie zostanie ukończona; interfejs informuje o tym bezpośrednio.
- **Co mierzy wskaźnik sukcesu?** Udział wykonań zasady, które zakończyły się powodzeniem w stałym 30-dniowym oknie Panelu wglądu.
- **Czy mogę wyrazić "bateria poniżej 20% I starsza niż rok"?** Zasady mają listę warunków w modelu, ale edytor warunków nie jest jeszcze dostępny.

## Wskazówki

- **Myśl teraz w parach wyzwalacz → akcja** — spisanie zasad, które chcesz ("co 30 dni → zaplanuj serwis", "zdarzenie błędu IoT → utwórz zadanie") ułatwi włączenie automatyzacji, gdy będzie dostępna.
- **Obserwuj „wywołane dziś” po uruchomieniu** — zasada, która wyzwala się znacznie częściej niż oczekiwano, jest źle skonfigurowana; wstrzymaj ją (status `paused`) zamiast usuwać.
