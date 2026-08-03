# Motywy

Pulpit ma trzy niezależne ustawienia wyglądu:

- **Tryb** — jasny, ciemny lub zgodny z systemem operacyjnym
- **Kolor** — kolor akcentu używany dla przycisków, linków, odznak i stanów aktywnych
- **Styl mapy** — podstawowe kafelki mapy (oddzielny wybór dla trybu jasnego i ciemnego)

Wszystkie trzy znajdują się w **Arkuszu profilu** na dole — kliknij swój awatar na górnym pasku, aby go otworzyć.

## Tryb (jasny / ciemny / systemowy)

Przełączaj między trzema trybami:

| Ikona      | Tryb   | Zachowanie                                                      |
| ---------- | ------ | --------------------------------------------------------------- |
| 🖥️ Monitor | System | Podąża za preferencjami systemu; przełącza się automatycznie przy zmianie systemu |
| ☀️ Słońce  | Jasny  | Zawsze jasny, ignoruje system                                   |
| 🌙 Księżyc | Ciemny | Zawsze ciemny, ignoruje system                                  |

Tryb **Systemowy** jest domyślny. Jeśli zmienisz motyw systemu (np. macOS zaplanowany ciemny tryb o zachodzie słońca), pulpit natychmiast się dostosuje — bez przeładowania.

## Kolor

Kolor akcentu wpływa na przyciski, linki, odznaki, obramowania fokusu i aktywny element paska bocznego. Dostępnych jest dwanaście gotowych palet:

| Kolor  | Podgląd |
| ------ | ------- |
| Czarny | ⚫      |
| Czerwony | 🔴      |
| Różany | 🌹      |
| Różowy | 🩷      |
| Pomarańczowy | 🟠      |
| Żółty  | 🟡      |
| Zielony | 🟢      |
| Turkusowy | 🟢      |
| Cyjan  | 🔵      |
| Niebieski | 🔵      |
| Indygo | 🟣      |
| Fioletowy | 🟣      |

Wybierz ten, który jest dla Ciebie najłatwiejszy do czytania w wybranym trybie (niektóre kolory lepiej wyglądają na jasnym, inne na ciemnym tle).

## Styl mapy

Strony pokazujące mapy (Mapa na żywo, szczegóły pojazdu, edytor stref, trasa przejazdu itp.) używają podstawowego stylu mapy, który możesz wybrać niezależnie. Pulpit przechowuje **dwie oddzielne preferencje stylu mapy** — jedną dla trybu jasnego, drugą dla ciemnego — aby mapa pasowała do reszty interfejsu podczas zmiany trybów.

- Przełączanie trybu (jasny ↔ ciemny) automatycznie zmienia styl mapy na wybrany dla tego trybu
- Dostępne style zależą od dostawcy mapy (MapTiler lub alternatywa); zazwyczaj: Ulice, Satelita, Jasny, Ciemny, Na zewnątrz

## Gdzie przechowywane są preferencje

Wszystkie trzy ustawienia są przechowywane w **localStorage** przeglądarki pod tymi kluczami:

| Ustawienie       | Klucz w storage       |
| ---------------- | --------------------- |
| Tryb             | `app-dark-mode`       |
| Kolor            | `app-theme`           |
| Styl mapy (jasny)| `app-map-style-light` |
| Styl mapy (ciemny)| `app-map-style-dark`  |

To oznacza:

- **Na urządzenie, na przeglądarkę** — inne urządzenie = inne preferencje
- **Nie synchronizowane** z Twoim kontem — koledzy korzystający z tego samego konta widzą swoje własne motywy
- **Usuwane przy "Wyczyść dane przeglądania"** dla tej strony
- **Okna incognito** startują z ustawieniami domyślnymi

## Wskazówki

- **Zacznij od trybu Systemowego** — pozwól systemowi decydować; przełącz na Jasny/Ciemny tylko jeśli masz inną preferencję niż system
- **Dopasuj styl mapy do trybu** — Satelita jest trudna do czytania w trybie ciemnym; wybierz styl "Ciemny" lub "Ulice Ciemne"
- **Kolor wpływa na kontrast** — Żółty lub Cyjan na jasnym tle mogą być trudne do czytania; jeśli przyciski wydają się "cienkie", spróbuj ciemniejszego akcentu (Czerwony, Niebieski, Indygo)
- **Motyw to nie uprawnienie** — każdy operator może wybrać swój własny; współpracownicy nie zobaczą Twoich zmian
