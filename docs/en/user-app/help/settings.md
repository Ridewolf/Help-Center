# Rider App — Settings

Settings (`/settings`) holds every rider-facing app preference: notifications, what the map draws, privacy switches, language, theme and performance.

**There is no Save button.** The screen shows cached settings instantly, refreshes them in the background, and pushes each change automatically a moment after it is made. A rider who changed something and closed the screen straight away has almost certainly saved it — that is the answer to "did my change apply?".

Several of these toggles change what the [Map](../riding/map.md) renders, so this is the first screen to visit for "the map is slow" and "I can't see battery levels".

## Notifications

Five independent toggles:

- **Ride Notifications**
- **Promotion Notifications**
- **App Updates**
- **Push Notifications**
- **Email Notifications** — a single switch; there are no per-type sub-options under it

In the same area:

| Control            | Notes                                                                        |
| ------------------ | ---------------------------------------------------------------------------- |
| **Sound**          | Toggle                                                                        |
| **Sound Volume**   | Slider — appears only while **Sound** is on                                   |
| **Vibration**      | Toggle                                                                        |
| **Radar Settings** | A card that appears only in app builds where radar settings are enabled       |

## Map and display

Toggles:

- **Show Battery Level**
- **Show Promotional Vehicles**
- **Show Pricing**
- **Auto Zoom**
- **Map 3D** — takes effect on the map immediately
- **Reduced Animations**

Plus **Data Mode**, a select with **balanced**, **low** and **high**. It governs map tile quality and how much detail the map renders, and it is **the first thing to try when a rider reports a slow or heavy map** — drop it to _low_, and turn on **Reduced Animations** as well.

**Offline Maps** is not currently available in the app.

## Privacy controls

- **Geolocation Sharing** toggle
- **Data Sharing** toggle
- **Privacy Policy** — opens the external URL you configured in [My Company](../../settings/administration/my-company.md); the link appears only when a URL is set
- **Manage Sessions** — opens the signed-in devices screen (`/settings/sessions`), the same one reachable from Profile

The full privacy and safety-guidelines screen is its own route (`/privacy`). **Account deletion is not here** — the working delete flow is on the Profile screen.

## Region and appearance

| Control        | Options                            | Notes                                                                                                     |
| -------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Language**   | **en**, **ru**, **ro**             | Applies immediately, with no reload. Only these three are offered on this screen                           |
| **Units**      | —                                  | A units selector is not currently available in the app                                                     |
| **Theme**      | Light, Dark, System                | Applies immediately                                                                                        |
| **Map Style**  | Auto, Light, Dark                  | **Disabled and forced to Auto whenever Theme is set to System.** Switch Theme to Light or Dark to unlock it |

Only the three app languages above appear here, even though other locales exist elsewhere in the product — see [Localization](../../settings/administration/localization.md) for the dashboard side.

## Riding Mode

**Riding Mode is not currently available in the app.** A rider asking where the riding-mode control is has not lost a permission — the section is not in the app, and there is no dashboard setting that adds it.

## FAQ

| Rider asks…                          | Answer                                                                                       |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| "Where is the Save button?"          | There is none — changes save automatically                                                    |
| "Where is Riding Mode?"              | Not currently available in the app                                                            |
| "Why is Map Style greyed out?"       | **Theme** is set to **System**. Switch it to Light or Dark first                               |
| "Why isn't my language listed?"      | This screen offers **en**, **ru** and **ro** only                                              |
| "Where is the Units setting?"        | Not currently available in the app                                                             |
| "Where is the Offline Maps toggle?"  | Not currently available in the app                                                             |
| "How do I delete my account?"        | From the Profile screen, not from Settings                                                     |
| "How do I see my logged-in devices?" | **Manage Sessions** — here, or the same button on Profile                                      |
| "The map is slow"                    | **Data Mode → low**, then **Reduced Animations** on. See [Map](../riding/map.md#troubleshooting) |

## Tips

- **Data Mode is your performance dial.** Before you blame a rider's phone or your tiles, have them try _low_.
- **"It didn't save" is almost never true.** Ask them to reopen the screen — the value will be there.
- **Map complaints often live here, not on the map.** Missing battery percentages, missing prices and missing promotional vehicles are all toggles on this screen.
- **Theme locks Map Style.** Memorise that pair; it is a weekly ticket otherwise.
