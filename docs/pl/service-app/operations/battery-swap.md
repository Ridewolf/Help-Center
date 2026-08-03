# Wymiana baterii — krok po kroku

Wymiana baterii to sekwencja dwustopniowa: aplikacja odblokowuje pojazd i jego schowek na baterię, daje Ci określony czas na fizyczną wymianę pakietu, a następnie ponownie wszystko blokuje. **Etap zamknięcia uruchamia się automatycznie** — to jest część, którą każdy operator musi znać przed pierwszą wymianą.

Wymianę uruchamiasz na [stronie pojazdu](../fleet/vehicle-controls.md), na karcie **Scooter**.

## Co rozpoczyna wymianę

Są dwa sposoby, które robią dokładnie to samo:

- Przycisk **Battery Swap** na karcie Scooter. Ma ikonę błyskawicy i pokazuje na swoim przycisku odliczanie na żywo.
- Ustawienie statusu pojazdu na **Charging** w arkuszu **Status**. Ta ścieżka uruchamia identyczną sekwencję w potwierdzeniu zmiany statusu.

W każdym przypadku przed wysłaniem czegokolwiek pojawia się okno potwierdzenia.

## Przebieg dla operatora

1. Otwórz pojazd i pozostań na karcie **Scooter**.
2. Naciśnij **Battery Swap** — lub ustaw status na **Charging**.
3. Potwierdź w oknie dialogowym.
4. Aplikacja wysyła **Battery Swap Mode On**. Po powodzeniu otrzymujesz powiadomienie „Battery Swap Mode On”, impuls haptyczny, a pojazd pokazuje się jako odblokowany.
5. Natychmiast rozpoczyna się **12-sekundowe odliczanie**, które odlicza co sekundę na przycisku. Wymień baterię w tym czasie.
6. Gdy odliczanie dojdzie do zera, aplikacja sama wysyła **Battery Swap Mode Off**. Nie naciskasz nic.
7. Po powodzeniu czujesz drugi impuls haptyczny — celowe podwójne potwierdzenie, abyś mógł usłyszeć i poczuć zamknięcie bez patrzenia na ekran — widzisz powiadomienie „Battery Swap Mode Off”, a pojazd pokazuje się jako zablokowany.

## Co robi każdy etap

| Etap                       | Co dzieje się na pojeździe                                                        |
| -------------------------- | --------------------------------------------------------------------------------- |
| **Battery Swap Mode On**   | Pojazd odblokowuje się, limit prędkości podniesiony do 25 km/h, schowek na baterię otwarty |
| **Wait**                   | 12 sekund — nic nie jest wysyłane, to Twój czas na wymianę                         |
| **Battery Swap Mode Off**  | Schowek na baterię zamknięty, limit prędkości przywrócony do 6 km/h, pojazd zablokowany |

Zwróć uwagę na limit prędkości: jest podnoszony z 6 do 25 km/h na czas okna wymiany i przywracany do 6 po jego zamknięciu. Limit nigdy nie jest usuwany — 25 km/h to maksymalna prędkość serwisowa podczas odblokowania pojazdu, a 6 km/h to domyślny limit podczas parkowania.

## Co widzisz i czujesz

- Powiadomienia na początku i końcu sekwencji: „Battery Swap Mode On”, a potem „Battery Swap Mode Off”
- Dwa impulsy haptyczne, po jednym na każdy etap
- Odliczanie od 12 do 0 na przycisku **Battery Swap**
- Ikona kłódki w obszarze telemetrii zmienia się z odblokowanej na zablokowaną i z powrotem

## Gdy etap się nie powiedzie

Jeśli którykolwiek etap się nie powiedzie, otrzymujesz powiadomienie o błędzie i haptyczny sygnał błędu. **Nic nie jest automatycznie powtarzane.**

Najważniejszy przypadek do zaplanowania to nieudany etap zamknięcia: pozostawia pojazd odblokowany, z limitem 25 km/h i otwartym schowkiem na baterię. Nie odchodź od pojazdu w takim stanie.

1. Wyślij **Ride Mode** wyłączony (blokada) z karty Scooter lub uruchom wymianę ponownie.
2. Potwierdź, że ikona kłódki jest zielona, zanim odejdziesz od pojazdu.

## Status ładowania i wymiany to ta sama akcja

Ponieważ ustawienie pojazdu na **Charging** uruchamia tę sekwencję, oba są ze sobą powiązane. Zmiana statusu to pełna wymiana: spodziewaj się, że pojazd się odblokuje, odczekasz 12 sekund i ponownie się zablokuje. Jeśli chciałeś tylko zmienić etykietę pojazdu, przygotuj się na jego otwarcie.

## Wymiana kilku pojazdów

Wymieniaj baterię pojedynczo na stronie każdego pojazdu. Uruchamianie wymiany baterii dla całej kolejki nie jest obecnie dostępne w aplikacji — [tryb wsadowy](batch-mode.md) to lista zadań, przez którą klikasz, a nie narzędzie do masowych poleceń.

## Częste problemy

| Objaw                                   | Co zrobić                                                                                  |
| --------------------------------------- | ----------------------------------------------------------------------------------------- |
| Odliczanie wygląda na zatrzymane        | Odlicza co sekundę. Jeśli ekran uśpił się, sprawdź ikonę kłódki, aby zobaczyć, na którym etapie jesteś |
| Etap zamknięcia nigdy się nie uruchomił | Sprawdź powiadomienie o błędzie. Nic się nie powtarza automatycznie — uruchom wymianę ponownie lub zablokuj pojazd wyłączając **Ride Mode** |
| Limit prędkości nadal pokazuje 25 km/h   | Etap zamknięcia się nie zakończył; to on przywraca limit 6 km/h                            |
| Schowek na baterię się nie otwiera      | Etap otwarcia się nie powiódł lub pojawił się błąd — schowek otwiera się tylko po powodzeniu tego etapu |

## Wskazówki

- **Miej wymieniany pakiet w ręku zanim naciśniesz przycisk.** Dwanaście sekund wystarcza na wymianę, ale nie na jego przyniesienie.
- **Zaufaj drugiemu impulsowi haptycznemu.** Dwa impulsy oznaczają, że sekwencja się zamknęła; jeden impuls i cisza oznaczają, że sprawdź ekran.
- **Zawsze odchodź z zieloną ikoną kłódki** — to jedyna kontrola, która wychwytuje wszystkie powyższe tryby awarii.
