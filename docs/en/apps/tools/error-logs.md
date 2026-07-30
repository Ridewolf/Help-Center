# Error Logs

Error Logs (`/error-logs`) is an **internal diagnostics tool** listing errors reported by the dashboard and the rider mobile app — JavaScript exceptions and failed API calls — with the stack trace, the request context and, when available, a screenshot and a map of where the user was.

Use it when someone reports _"the app crashed"_ or _"it said something went wrong"_ and you need the actual error behind it.

## Where to find it

- `/error-logs` — the list
- `/error-logs/:id` — a single error

There is **no sidebar entry**. You reach it by typing the URL directly — it is a diagnostics tool for engineers and admins rather than part of normal operator navigation (like [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), it's an unlisted surface).

**Access:** the page needs an error-reporting API key configured for your environment, plus your normal login session. If the page returns nothing at all, a missing key for that environment is the first thing to check — ask your administrator.

## List view

- Paged list, starting at page 1 with 100 rows per page; the pager controls the page size from there.
- A **source** dropdown filters by where the error came from: **dashboard** or **app**.
- A **refresh** control sits in the header. Auto-refresh is **off by default**; you can pick an interval of 10 seconds, or 1 / 5 / 15 / 30 minutes. Polling pauses while the tab is hidden and catches up when you come back, so a backgrounded tab doesn't keep polling.

Source plus page/limit are the only filters — there is no filter by user, email or time range.

## Reading the badge

Each row carries a badge that is your **fastest triage signal**:

- A **number** (HTTP status) → the row is a **failed API call**; the problem points at the backend or the request.
- A **word** → the row is client-side; the type is guessed from the message text: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (sign-in, login), **Network** (network, fetch, timeout), **Cancelled**, or the catch-all **Error**.

Treat the word badges as a rough heuristic over the message string, not a classification the reporter sent.

## Detail view

The single-error page renders:

- the error metadata and the **stack trace**
- the **URL** where it happened, and the **user agent** (parsed into browser, OS, device, hardware and screen info)
- a **screenshot**, inline, when one was attached to the report
- a **mini map** with a red marker, when valid coordinates were captured — this is what makes location-specific bugs visible, such as a zone edge or a bad GPS fix

Timestamps are shown in time-ago format.

## Field reference

- **id** — error identifier
- **source** — `dashboard` or `app`
- **message** / **stack** — the error and its stack trace
- **url** — the page or endpoint where it occurred
- **userAgent** — the raw user agent; it is parsed for device info, and it is also where the map coordinates come from
- **metadata** — the structured context: the request (method, endpoint, body) and response (status, body) for API errors; user id / email / role when the report identified a user; dashboard & app versions, runtime, platform; the screenshot; and WebSocket context (close code / reason, reconnect attempt) when the error came from a socket
- **clientTimestamp** — taken from the device clock, so it can be wrong
- **createdAt** — the server timestamp; **the reliable one for ordering**

Not every report identifies a user — the email can be empty.

## Common questions

- **The page is empty or unauthorised.** Check that the error-reporting key is configured for this environment and that you are logged in. Ask your administrator.
- **I can't find it in the menu.** There is no navigation entry — go to `/error-logs` directly.
- **No screenshot shown.** That report didn't carry one; not every error does.
- **No map shown.** No valid coordinates were captured for that report.
- **Timestamps disagree.** Compare `createdAt` (server) with `clientTimestamp` (device clock) — a skewed device clock explains the gap.
- **I need one user's errors.** There is no user or email filter; filter by source and page through the list.
- **The list looks stale.** Auto-refresh is off by default — pick an interval from the refresh control, and remember polling pauses while the tab is in the background.
- **A badge says "Runtime" but I expected a status code.** That row carried no request/response context, so the badge fell back to guessing a type from the message text.
