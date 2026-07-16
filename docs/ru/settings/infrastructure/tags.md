# Tags

Страница Tags (`/settings/tags`) — это **общая библиотека label'ов** вашей компании. Тег — это именованный значок, который можно прикрепить к vehicles, clients, operators, rides и payments для фильтрации, группировки и отчётности. Список здесь — единый источник истины: добавили тег здесь — он сразу доступен везде, где поддерживается.

Требуется permission: **Tags** (`d1e2f3`). Sub-permissions управляют create, edit и delete.

## Где используются теги

Теги — это **единый глобальный пул**, scope по типам сущностей нет. Один и тот же тег можно прикрепить к разным записям:

- **[Vehicles](../../operations/fleet/vehicles.md)** — например, "Needs cleaning", "Priority maintenance", "Test fleet"
- **[Clients](../../operations/customers/clients.md)** — например, "VIP", "Corporate", "Blocklist"
- **[Operators](../access/operators.md)** — например, "Night shift", "Trainer", "On call"
- **Rides** — тегируются для разбора, споров или отслеживания кампаний
- **Payments** — тегируются для сверки или follow-up

На одной записи может быть несколько тегов; фильтрация по тегу доступна в каждом списке, где они поддерживаются.

## Filters

| Filter | Type | Заметки                                     |
| ------ | ---- | ------------------------------------------- |
| Search | Text | Ищет по названию тега (label) и description |

По умолчанию 50 строк на страницу; кнопка **Clear** сбрасывает фильтры.

## Columns

| Колонка         | Сортировка | Содержимое                                                |
| --------------- | ---------- | --------------------------------------------------------- |
| **Tag name**    | ДА         | Иконка тега + label; ссылка на detail page тега           |
| **Status**      | ДА         | `Public` или `Private` (см. ниже)                         |
| **Description** | НЕТ        | Свободный текст; placeholder "No description", если пусто |
| **Dates**       | ДА         | Дата создания сверху, дата обновления снизу               |

В header страницы также есть **Auto-refresh**, **+ Create**, **Import** (скоро) и **Export** (JSON: current page, all filtered, либо specific pages).

## Row actions

Меню из трёх точек на каждой строке. Доступные действия зависят от permissions:

| Action           | Permission | Что делает                                                                                                 |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| **View details** | —          | Открыть detail page тега                                                                                   |
| **Edit**         | `edit`     | Открыть форму редактирования (label, status, description)                                                  |
| **Delete**       | `delete`   | Удалить тег из company. **Все записи, тегированные ранее, потеряют binding** — используйте с осторожностью |

Delete требует подтверждения с задержкой 3 секунды, чтобы избежать случайных удалений.

## Detail page

Клик по строке (или _View details_) открывает detail page тега:

- **Tag information** — label, status, description (с поддержкой Markdown)
- **Metadata** — внутренний ID, created / updated timestamps

Edit и Delete доступны в header actions detail page.

## Create / Edit form

Форма тега (`+ Create` или _Edit_) состоит из трёх полей:

- **Label** (required) — видимое имя тега; должно быть достаточно уникальным, чтобы узнавать с первого взгляда
- **Status** (required) — `Public` или `Private`
  - **Public** — виден и доступен для выбора всем операторам компании
  - **Private** — ограниченная видимость; используется для внутренних/admin-only workflow'ов
- **Description** (optional) — свободный текст: когда использовать этот тег; отображается на detail page

Sidebar показывает живой **preview** label'а и description'а по мере ввода. Save валидирует, что label не пустой, записывает в company tag pool и сбрасывает shared cache, чтобы другие страницы refetch'нули данные при следующем mount.

## Типичные workflows

- **Добавить новый label** — `+ Create` → ввести label → выбрать Public/Private → опционально описать когда применять → Save → тег сразу доступен в фильтрах и edit-формах Vehicles / Clients / Operators
- **Переименовать тег** — Edit → изменить Label → Save (все записи с этим тегом сохраняют binding; новое имя появляется везде)
- **Вывести тег из использования** — Delete из меню row, либо сначала установить Status = Private, чтобы скрыть от нового тегирования, сохранив historical bindings (в этом случае повторное прикрепление возможно только через direct edit)
- **Чистка дубликатов** — пройтись по списку, найти near-duplicates ("vip" vs "VIP") → отредактировать один для унификации имени, потом удалить другой (помните: записи под удалённым тегом потеряют binding — перепривяжите их сначала)
- **Bulk export** — Export → All filtered → JSON download для шаринга с командой или бэкапа taxonomy

## Tips

- **Tags are global** — нет отдельного namespace для "client tags" vs "vehicle tags". Именуйте достаточно ясно, чтобы тег "VIP" имел смысл на любой сущности, или используйте префиксы ("client:vip", "vehicle:maintenance") для порядка
- **Public — это default** — оставляйте Public, если нет конкретной причины ограничить visibility
- **Delete деструктивен** — каждая запись с тегом теряет binding мгновенно, soft-delete нет. Если сомневаетесь, предпочтите rename или переключение на Private
- **Description поддерживает Markdown** на detail view — используйте, чтобы документировать, кому и когда применять тег
- **Shared cache сбрасывается на каждый save / delete** — другие открытые вкладки подхватят изменения при следующей навигации, без полного reload
- **Имена тегов появляются в контекстных фильтрах Ridewolf повсюду** — оставляйте их короткими и lowercase-friendly для лучшего UX в плотных таблицах
