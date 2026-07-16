# Ваш профиль

**Profile** — _ваш_ аккаунт в Ridewolf, оператор, который сейчас вошёл в систему. Отсюда вы меняете имя, фото, пароль, тему, звуки уведомлений и смотрите, где вы залогинены. Если ваш operator-аккаунт также связан с client-аккаунтом в приложении для райдеров, можно переключиться в customer-вид того же аккаунта.

В этой статье четыре маршрута, все доступные через аватар в верхнем баре:

| Маршрут             | Что это                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------- |
| `/profile`          | Хаб — авто-редиректит на operator или customer вид в зависимости от того, что есть у аккаунта |
| `/profile/operator` | Operator-вид на себя (дефолт для персонала)                                                   |
| `/profile/customer` | Customer-вид (только если аккаунт связан с rider client)                                      |
| `/profile/legacy`   | Legacy single-page вид — те же данные одной длинной формой (фолбэк для редизайнутых вьюх)     |

Это **self-service** вид. Чтобы управлять _другими_ операторами (вашими коллегами), используйте [Операторы](../../settings/access/operators.md).

Без permission-гейта — любой залогиненный пользователь может открыть свой профиль.

## Как `/profile` решает, куда вас отправить

Прямой переход на `/profile` никогда не остаётся на странице — он сразу редиректит:

1. Читает `lastPersona` из localStorage браузера (выставляется persona-переключателем в hero-хедере в прошлый раз)
2. Если `lastPersona = customer` и у аккаунта есть связанный client → `/profile/customer`
3. Если `lastPersona = operator` → `/profile/operator`
4. Иначе: operator если есть operator-аккаунт, customer только если operator-а нет
5. Дефолтный фолбэк: `/profile/operator`

На момент редиректа вы видите спиннер с надписью "Redirecting...".

## Hero-хедер (общий для operator + customer вьюх)

Sticky-хедер сверху на `/profile/operator` и `/profile/customer`. Показывает:

- **Аватар** с camera-оверлеем при ховере — клик открывает диалог **Avatar upload**
- **Имя** (клик копирует) и **email** (клик копирует) — оба с тултипами copy-to-clipboard
- **Бейджи** — ваш статус (`Active` / `Inactive`), `Verified`, и `Customer` если вы в customer-виде
- **Quick KPIs** — четыре маленькие плитки, содержимое зависит от persona (см. ниже)
- **Persona switch** — две кнопки (`Operator` / `Customer`). Customer задизейблена с тултипом если у аккаунта нет linked client
- **Действия** — кнопка `Edit`, плюс меню из трёх точек: _Copy User ID_, _Copy Email_, _Open as JSON_ (дамп вашей user-записи в новой вкладке), _Logout_

Переключение persona через эти кнопки сохраняет выбор в `lastPersona` localStorage, чтобы в следующий раз `/profile` знал куда вас послать.

## `/profile/operator` — три вкладки

Operator-вид раскладывает всё на три вкладки. URL-hash (`#overview`, `#security`, `#preferences`) отражает активную вкладку, можно дип-линковать.

### Вкладка Overview

Две карточки рядом: **Org & Role** (слева) и **Activity** (справа).

Карточка **Org & Role** показывает read-only:

| Поле           | Источник                                                                |
| -------------- | ----------------------------------------------------------------------- |
| **User ID**    | Ваш operator ID — обрезан до 8 символов с copy-to-clipboard иконкой     |
| **Teams**      | Tag-метки на вас (разрешаются из tags-кэша)                             |
| **Email**      | Email аккаунта                                                          |
| **Status**     | Бейдж `Active` / `Inactive`                                             |
| **Role**       | Метка роли, с количеством permissions в скобках                         |
| **Department** | Из organization-профиля                                                 |
| **Position**   | Из organization-профиля                                                 |
| **Location**   | Город и таймзона, если выставлены                                       |
| **2FA**        | `Enabled` (зелёный) или `Disabled` (серый) — показывается если известно |

Карточка **read-only** в operator-виде. Чтобы поменять любое из этих полей (role, department, position, tags), админ должен отредактировать запись из [Операторы](../../settings/access/operators.md) — повысить себя нельзя.

Карточка **Activity** показывает последние пять ваших действий из `/activity/operator/{id}`:

- Цветная точка (зелёная = Created, синяя = Updated, оранжевая = Deleted, primary = другое)
- Бейдж категории ("Created" / "Updated" / "Deleted" / "Security")
- Описание ("Updated vehicle #ABC" и т.п.)
- Относительное время ("2 hours ago")
- Actor — обычно "by yourself", "by System" для автоматики

Если лента пустая, карточка показывает **последние сессии входа** как Security-события. Кнопка "View all" снизу переключает на Security-вкладку, где полный список сессий.

KPI над карточками показывают `{n} actions · {m} changes in 30d`.

### Вкладка Security

Две карточки стопкой: **Password management** и **Active sessions**.

**Password management** даёт сменить свой пароль через диалог. Открывается кнопкой _Change_ рядом с "Current password".

В диалоге три поля:

| Поле                 | Валидация                                             |
| -------------------- | ----------------------------------------------------- |
| Current password     | Обязательно; минимум 8 символов                       |
| New password         | Обязательно; минимум 8; должно отличаться от текущего |
| Confirm new password | Обязательно; минимум 8; должно равняться new password |

Submit задизейблен пока все три поля не проходят. Inline-ошибки появляются красным под полем по мере ввода. На успех — toast и диалог закрывается; форма очищается.

Под password-секцией маленькая таблица **password history** с последними тремя сменами (дата, действие, причина). Это пока статический плейсхолдер — бэкенд не отдаёт history endpoint.

**Active sessions** рендерится shared sessions-manager. Сессии **сгруппированы по device fingerprint** (browser + OS + device type + vendor + model), так что несколько вкладок на одном ноуте схлопываются в одну группу.

Каждый header группы показывает:

- Иконка устройства (Monitor / Smartphone / Laptop по `deviceType`)
- Лейбл устройства — vendor + model, или OS + version, или device type
- Лейбл браузера
- Status-бейдж: `active` (последняя активность < 1ч, зелёный), `inactive` (< 24ч, серый), `old` (> 24ч, приглушённый), или `This device` (текущая сессия, синий outline)
- Время последней активности (относительное)
- Количество сессий в группе

Клик по header группы разворачивает её и показывает каждую сессию внутри: страна и IP из location-lookup, дата входа, и trash-иконка для revoke. Группу можно сделать revoke целиком кнопкой "Sign out this device" снизу развёрнутого списка (текущая сессия всегда сохраняется).

Кнопка **Sign out other sessions** сверху делает revoke _всем_ остальным сессиям сразу. Текущая никогда не трогается. Counter включает все нон-текущие сессии по всем устройствам.

### Вкладка Preferences

Две карточки: **Theme & map style** и **Notification sounds**.

Первая встраивает shared theme-selector и map-style-selector — те же виджеты что и floating profile sheet. См. [Темы](../../features/ux/themes.md) для полного разбора режимов, accent-цветов и стилей карты.

Вторая встраивает notification-sounds settings — звук на тип toast'а, звук на нотификацию, и независимые volume-ползунки для toasts и notifications. См. [Уведомления](../../features/ux/notifications.md) для полного пикера.

Всё в этой вкладке пишется в **localStorage** браузера, не на сервер. Значит preferences хранятся per device, per browser — не следуют за вами при входе с другой машины.

## `/profile/customer` — customer-side вид

Если ваш operator-аккаунт **также** связан с rider (client) аккаунтом в том же Ridewolf-инсталле, можно переключить persona и увидеть, как вы выглядите со стороны клиента. Кнопка persona в hero-хедере приводит сюда.

### Когда customer-аккаунта нет

Видите dashed empty-state карточку с:

- Иконка и заголовок "Link your customer profile"
- Описание
- Две кнопки — **Create Customer Account** и **Link Existing** (обе пока показывают "Coming soon" toast; бэкенда ещё нет)
- Verification alert
- Ссылка "Continue as Operator" обратно на `/profile/operator`

### Когда customer-аккаунт есть

Две вкладки: **Overview** и **Rides**.

Hero KPIs переключаются на customer-релевантные числа: **Balance** (форматированная валюта), **Total Rides**, **Rating** (1 знак), **Bonus** (очки).

Вкладка **Overview** показывает:

- Карточка **Wallet** — текущий баланс, опционально bonus points (только если > 0), и связанный payment method (бренд + last 4 + expiry месяц/год + provider type) если есть
- Карточка **Ride Statistics** — три плитки: Total Rides, Rating со звездой (и под-лейблом "{n} rated"), Bonus Points
- Сайдбар **Account Info** — Client ID (моноширинный, обрезан), Provider, Created (относительное), Last Active (относительное, если есть), Last Ride (относительное, если есть)
- Карточка **Devices** — ваши зарегистрированные customer-устройства (iOS / Android / Web), рендерит shared `ClientDevicesList`
- Quick-links **Safety & support** — FAQ, Contact Support, Report Issue (плейсхолдер-кнопки)

Вкладка **Rides** показывает последние 20 ваших поездок (свежие сверху):

- ID поездки (моноширинный) и время создания (относительное)
- Status-бейдж (`completed` solid, `active` secondary, остальные outline)
- Дистанция (км), длительность (минуты или `Hh Mm`), label транспорта
- Цена (форматированная валюта)
- Ряд звёзд для рейтинга, если есть

Использует scroll-контейнер с фиксированной высотой 500px и 4-skeleton loading state. Empty state — map-иконка и "No rides yet".

**Edit-формы тут нет** — это read-only зеркало того, что показывается в rider-приложении. Кнопка Edit в hero-хедере пока показывает "Coming soon" toast.

## `/profile/legacy` — single-page фолбэк

`/profile/legacy` — это **более старый одностраничный профиль**, оставлен для фолбэка и прямых ссылок. Пакует почти всё на одну скроллящуюся страницу вместо вкладок:

- Header-карточка профиля с аватаром, именем, email, status-бейджем и кнопками Edit / Save / Cancel
- Карточка **Personal Information** — редактируемые First name, Last name (text input в edit-режиме); read-only Email и редактируемый Phone
- Карточка **Account Information** — read-only User ID (обрезан + копи), Email, Status (сырое значение)
- Карточка **Appearance** — theme selector и map style selector (те же виджеты что в Preferences)
- Карточка **Notifications & Sounds**
- Карточка **Security** — password-строка с кнопкой Change (диалог в этой версии не открывается)
- Футер с версией приложения (`CF_PAGES_COMMIT_SHA` первые 7 символов или `DEVELOPMENT_KIT` локально)

Два важных нюанса:

- Действие **Save** пока показывает toast "Feature not available yet" — у бэкенда нет endpoint'а `PATCH /operators/me`, так что правки First name / Last name / Phone не сохраняются
- Photo upload убран из этого вида; используйте редизайнутый `/profile/operator` и кликайте аватар чтобы открыть диалог загрузки

Для повседневной работы предпочитайте `/profile/operator`. Закладывайте этот URL только если будущий фикс редизайнутого вида когда-нибудь потребует фолбэка сюда.

## Avatar upload диалог

Открывается из hero-хедера (клик по аватару) на редизайнутых вьюхах.

Принимает:

- File types: только `image/png`, `image/jpeg`, `image/jpg` — остальное вызывает ошибку "File type"
- Max file size: **10 MB** — больше вызывает "File size"
- Drag-and-drop или клик для выбора

Диалог показывает preview, имя файла и progress bar во время загрузки. Sequence загрузки:

1. `POST` файла → возвращает `avatarUrl`
2. `PATCH /me` с `{ photo: avatarUrl }` → возвращает обновлённую user-запись
3. User store обновляется новым `photo` полем; новая аватарка появляется немедленно везде

Toast'ы подтверждают успех или фейл. На успех диалог закрывается сам.

## Справочник полей (по всем маршрутам)

Сводный список — что редактируется, где, как валидируется:

| Поле                          | Редактируется на               | Валидация                                                    |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------ |
| Avatar / photo                | Operator                       | PNG/JPG/JPEG, max 10 MB                                      |
| First name                    | Legacy (сломано — нет бэка)    | Без enforcement client-side                                  |
| Last name                     | Legacy (сломано — нет бэка)    | Без enforcement client-side                                  |
| Phone                         | Legacy (сломано — нет бэка)    | Без enforcement client-side                                  |
| Current password              | Operator → Security            | Обязательно, ≥ 8 символов                                    |
| New password                  | Operator → Security            | Обязательно, ≥ 8, должно отличаться от current               |
| Confirm password              | Operator → Security            | Обязательно, должно равняться new password                   |
| Theme mode                    | Operator → Preferences, Legacy | localStorage only                                            |
| Theme color                   | Operator → Preferences, Legacy | localStorage only                                            |
| Map style                     | Operator → Preferences, Legacy | localStorage only                                            |
| Notification sound config     | Operator → Preferences, Legacy | localStorage only                                            |
| Role / Dept / Position / Tags | _Не тут_                       | Меняет админ из [Операторы](../../settings/access/operators.md) |

## Типичные сценарии

- **Сбросить свой пароль** — `/profile/operator` → Security → Change → заполнить все три → Submit. Диалог закрывается, сессия не падает
- **Выйти с публичного компа** — Security → развернуть device-группу → trash-иконка на сессии, или "Sign out this device" для всех сессий устройства. Текущая всегда защищена
- **Подозрительная активность** — Security → "Sign out other sessions" сверху одним кликом revoke всех non-текущих сессий
- **Сменить аватарку** — клик по аватару в hero → дроп PNG/JPG до 10 MB → Upload
- **Переключить дашборд в dark mode** — Preferences → Theme mode = Dark (или System и пусть OS решает)
- **Закладка на вкладку** — у каждой вкладки есть hash (`#overview`, `#security`, `#preferences`); скопируйте URL с hash и используйте как прямую ссылку
- **Увидеть себя как customer** — если аккаунт связан, кликните Customer в hero → видите rider-вид (balance, rides, devices). Назад тем же путём

## Полезные приёмы

- **Редактируемого тут немного** — role, department, position, tags, email менеджит админ на [Операторы](../../settings/access/operators.md). Profile только про свой аватар, пароль, сессии, preferences
- **Preferences локальные** — темы и звуки уведомлений живут в localStorage, не на сервере. Стёрли данные браузера — сбросились; переехали на другую машину — не переехали
- **Hash решает вкладку** — `/profile/operator#security` открывает сразу Security. Используйте в чат-ссылках чтобы коллега увидел ту же вкладку что и вы
- **Save в legacy-вьюхе пока тупик** — пока `PATCH /operators/me` не выкатится, используйте редизайнутый operator-вид для всего; для смены имени просите админа
- **Сессии сгруппированы по устройству** — одна запись на несколько вкладок это нормально. Разверните чтобы увидеть отдельные сессии
- **Customer persona гейтится данными** — даже если кнопка видна, она ничего полезного не делает без приложенного `client`-объекта. Нет client — игнорируйте Customer-кнопку и сидите на `/profile/operator`
