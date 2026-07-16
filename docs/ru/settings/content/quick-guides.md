# Quick Guides

Страница Quick Guides (`/settings/quick-guides`) хранит **пошаговые инструкции**, которые rider mobile app Ridewolf показывает для вещей типа "How to rent a scooter" или "Safety checklist". Каждый гайд — это упорядоченный список items с иконкой, цветом, заголовком и текстом — публикуется по аудитории (rider app, client app, mechanic, admin, general).

Вместе с [FAQ Sets](faq-sets.md) (Q/A-блоки) и [Icon Sets](icon-sets.md) (иконки на карте) — Quick Guides третий столп контент-слоя. Редактируете гайд тут — rider app подхватит изменения при следующем fetch, релиз приложения не нужен.

Требуется право: **Quick Guides** (check with admin).

## Где это видно райдеру

В rider mobile app Quick Guides питают онбординг-туториалы и in-trip tips-экраны. Каждый гайд с типом **rider-app** и статусом `active` загружается; items отмеченные `visible` показываются в `order`, с настроенными `icon` и `color` слева, и `body` развёрнут если `expandByDefault` true.

Гайды с типами `client-app`, `mechanic`, `admin`, `general` идут в соответствующие приложения.

## Фильтры

| Фильтр | Тип          | Заметки                                                                   |
| ------ | ------------ | ------------------------------------------------------------------------- |
| Search | Текст        | Поле в шапке — по title / description / slug                              |
| Tags   | Multi-select | Фильтр по тегам (onboarding, basics, technical, payments, …)              |
| Status | Дропдаун     | `Active` / `Draft` / `Archived` (или `All`)                               |
| Type   | Дропдаун     | `Client app` / `Rider app` / `Mechanic` / `Admin` / `General` (или `All`) |

**Clear all** сбрасывает все фильтры.

## Колонки

| Колонка     | Содержимое                                                             |
| ----------- | ---------------------------------------------------------------------- |
| **Set**     | Иконка книги + title; вторая строка — description или slug             |
| **Type**    | Пилюля аудитории — Client app / Rider app / Mechanic / Admin / General |
| **Tags**    | Первые 3 чипа тегов, с `+N` для остатка                                |
| **Items**   | Сколько шагов в гайде                                                  |
| **Status**  | `Active` (зелёная) / `Draft` (серая) / `Archived` (приглушённая)       |
| **Updated** | Относительная дата; на ховере — полный таймстемп + автор               |

Клик по строке открывает диалог **View** (превью всех шагов). Клик по меню из трёх точек — действия.

## Действия над строкой

| Действие         | Что делает                                                             |
| ---------------- | ---------------------------------------------------------------------- |
| **View details** | Превью с рендером каждого item так, как увидит райдер                  |
| **Edit**         | Открыть форму (та же что Create, заполненная)                          |
| **Duplicate**    | Клонировать гайд: slug получает `-copy`, статус сбрасывается в `Draft` |
| **Export**       | Скачать как ZIP или JSON                                               |
| **Archive**      | Перевести в `Archived` — скрыт от rider app, в истории                 |
| **Delete**       | Удалить навсегда                                                       |

В тулбаре сверху — массовые **Import** (ZIP / JSON) и **Export** (ZIP / JSON).

## Форма Create / Edit

Форма с теми же верхнеуровневыми селекторами что у FAQ Sets, плюс более богатый редактор per-item:

- **Type** — обязательное, определяет аудиторию
- **Status** — `Draft` / `Active` / `Archived`
- **Tags** — multi-select
- **Title / Description** — title обязательное, description опциональное
- **Items** — список шагов. У каждого:
  - **Title** — заголовок шага
  - **Body** — содержимое шага (длинный plain text)
  - **Icon** — Lucide-имя иконки (например `MapPin`, `QrCode`, `Shield`)
  - **Color** — hex с brand-пресетами (Primary `#6366f1`, Success `#22c55e`, Warning `#eab308`, Danger `#ef4444` и др.)
  - **Expand by default** — если включено, item в приложении сразу развёрнут
  - **Visible** — скрыть item без удаления
  - **Order** — drag для сортировки

Slug берётся из title и используется в API URL.

## Типичные сценарии

- **Написать новый онбординг-гайд** — `+ Create guide` → Type = Rider app, Status = Draft → добавить 5–7 шагов с иконками и цветами → проверить через View details → Active → появляется в rider app при следующем fetch
- **Сделать шаг опциональным / скрыть** — Edit → снять `Visible` на item → save (item остаётся в данных, просто не рендерится)
- **A/B-тест нового walkthrough** — Duplicate активного → редактировать копию → архив старого и активация нового в один заход
- **Bulk import черновика дизайнера** — top-right _Import_ → ZIP/JSON → подтвердить структуру → импорт как Draft → ревью и Activate

## Полезные приёмы

- **Иконки — это Lucide-имена** — берите с [lucide.dev](https://lucide.dev), чтобы они рендерились в приложении; опечатка в имени даёт fallback-плейсхолдер
- **Красьте шаги для скана глазами** — райдеры скимят гайды. Warning для "осторожно", Success для "готово"
- **`expandByDefault` обычно только на первый шаг** — все items развёрнутыми лишают смысла аккордеон. Остальное оставьте свёрнутым
- **Body — plain prose, не markdown** — держите абзацы короткими; типографику задаёт мобильное приложение
- **Archive вместо Delete** при выводе гайда из обихода — реактивировать или продублировать всегда можно
- **Теги общие с [FAQ Sets](faq-sets.md)** — `onboarding`, `troubleshooting` и т.п. — общий словарь контент-слоя
