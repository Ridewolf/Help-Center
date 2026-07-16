# AI Chat

The dashboard ships with an **AI assistant** that understands the product, can read live data from the screens you're on, and — with your permission — can take actions on your behalf. Treat it as a teammate sitting next to you: ask a question, ask it to do something, or ask it to explain what you're looking at.

## Opening the panel

Click the **sparkle icon** (✨) in the top bar. The chat opens as a side panel on the right.

- If a small `*` star badge is glowing on the icon, the AI has produced a new reply since you last looked at the panel.
- The panel also opens with `⌘ + K` / `Ctrl + K` on most pages (where the shortcut is wired up).

## What it can do

Five categories of capability, in increasing power:

| Capability         | Examples                                                                     |
| ------------------ | ---------------------------------------------------------------------------- |
| **Explain**        | "What does this status mean?", "How do I create a tariff?"                   |
| **Look things up** | "How many active vehicles in Zone A?", "Show me yesterday's failed payments" |
| **Navigate**       | "Open the rides page filtered to today", "Take me to vehicle RW-001"         |
| **Fill forms**     | "Create a new tag named 'VIP' with color red and apply it to client X"       |
| **Mutate data**    | "Lock vehicle RW-001", "Refund payment #12345", "Send push to all in Zone A" |

The AI uses the **same APIs and the same permissions** you have. If you cannot perform an action manually, the AI cannot do it on your behalf. This is the safety boundary — there is no "AI superuser" mode.

## Inside the panel

### Header

- **Sparkle + title** "AI Chat"
- **Agent name badge** on the right (the green pill with a shimmer) shows which agent is currently active — click it to open settings and switch agents
- **Context badge** appears under the description once the conversation has messages — shows how full the AI's memory window is (e.g. "12 messages · 35% context")

### Live run bubble

When the AI is working on something multi-step (looking up data, opening pages, calling tools), a **live status bubble** appears showing each step in real time:

- _Looking up vehicles…_
- _Opening /vehicles…_
- _Filling form: Status = Active…_
- _Submitting…_

You can read what is happening as it happens and stop early if it goes the wrong way.

### Conversation

The conversation flows like a chat: user messages on the right, AI responses on the left, rendered in markdown (lists, tables, code, links all work). Tool runs can be expanded to see exact arguments and responses — useful for verifying what was done.

### Input

- **Type a message** and press `Enter` to send; `Shift + Enter` for a new line
- The input grows as you type
- Files / pasted images are not supported in the current chat

## Confirming mutations

For potentially destructive actions (delete, refund, change status, bulk operations), the AI shows an **inline confirmation** instead of running immediately:

- A summary of what is about to happen ("Refund payment #12345 — $42.50 to John Doe")
- **Confirm** / **Cancel** buttons
- Nothing happens until you confirm

Read the summary carefully — that's the only safety check between the AI's understanding and your data.

## Settings

Click the **agent name badge** in the header to open the settings dialog:

- **Agent selection** — pick the agent persona (different agents are tuned for different tasks: fleet, support, analytics)
- **Model** — pick the underlying LLM (where multiple are available)
- **Tools allowed** — selectively disable tools (e.g. block mutations if you only want Q&A)
- **Conversation history** — clear, export

## Context window

The AI has a finite memory of the current conversation. As you chat, the context fills up; you'll see it as a percentage in the header badge.

- **Below 70%** — plenty of room
- **70–90%** — getting full; consider starting a new conversation for an unrelated topic
- **Above 90%** — older messages may be summarized to make room; the AI may forget early details

Starting a fresh conversation for a new task is cheap and keeps the AI sharp.

## Tips

- **Be specific** — "Lock RW-001" beats "lock that scooter we talked about"
- **Verify before confirming mutations** — read the summary on the confirmation card. The AI sometimes infers an entity you didn't intend
- **Ask "what can you do here?"** on any page — the AI knows which tools are relevant to the current screen
- **Use it to explain unfamiliar data** — paste a status code or screen label and ask "what does this mean?"
- **Permissions still apply** — if the AI says "I can't do that", it's almost always a permission gap, not a feature gap
- **Sensitive data** — treat the chat like a teammate's screen. Don't paste passwords, payment card numbers, or any data you wouldn't want logged
- **Disconnects** — if the AI stops mid-run, scroll up to find the last live-run bubble; it tells you exactly where it stopped
