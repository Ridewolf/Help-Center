# Conversations

The Conversations page (`/support/conversations`) is the **operator messenger** — a real-time chat interface between your support team and your riders. Each conversation belongs to one client and contains the full message history, your team's actions, and status changes.

Permission required: **Conversations** (`x2y3z4`).

## How conversations appear here

Conversations arrive from a few flows:

1. **Rider opens a chat** in the mobile app — creates a _New_ conversation, gets queued in _Waiting_
2. **Operator initiates** — _+ New_ in the sidebar lets you start a chat with a specific client (e.g. for follow-up on a fine or a fraud check)
3. **Reopened** — closed conversations can be reopened (by rider or operator) and come back to the top of the list

The list is **live** — new conversations and incoming messages stream in via WebSocket without a refresh.

## Layout

The page has two main areas. The layout adapts to screen size:

- **Desktop** — split view, sidebar on the left (30%) and chat content on the right (70%), with a draggable handle
- **Mobile** — one area at a time: the sidebar list, or the open chat (back arrow returns to the list)

## Sidebar (left)

The conversation queue and filters:

- **+ New** — opens a dialog to search for a client and start a fresh conversation (status _Waiting_)
- **Search** — text search across client name, ID, last message
- **Status filters** — pills with counters: `All` / `New` / `Waiting` / `Active` / `Delayed` / `Closed`
- **Conversation cards** — each shows: avatar, client name, last-message preview, status pill, timestamp, unread badge. Click to open
- **Load more** — pagination as you scroll

Default sort puts unanswered (Waiting / Active with unread) at the top — the most urgent chats are always in your eye-line.

### Status reference

| Status      | Meaning                                                     |
| ----------- | ----------------------------------------------------------- |
| **New**     | Just opened, no one has read yet                            |
| **Waiting** | Unassigned, queued for any operator to pick up              |
| **Active**  | Assigned to an operator, conversation in progress           |
| **Delayed** | Operator put it on hold (waiting for info, follow-up later) |
| **Closed**  | Resolved and closed                                         |

## Chat content (right)

When you select a conversation, the right column shows:

### Chat header

- **Back arrow** (mobile only) — return to the sidebar list
- **Title** — client name with the conversation status pill
- **Open info** — opens the [User Info sidebar](#info-panels) with full client context
- **Delay / Transfer / Close** buttons depending on status

### Chat window

- **Message bubbles** — operator messages on the right (accent color), rider messages on the left; with timestamps and read indicators
- **Typing indicator** — shows when the rider is typing
- **Load older** button at the top — fetches earlier messages on demand
- **To new messages** button — scroll-to-bottom shortcut when you've scrolled up
- **Message actions** on hover — Edit / Delete on your own messages

### Canned responses

A row above the input shows quick-reply templates grouped by category. Click one to drop the text into the input — you can edit before sending.

### Chat footer

What appears in the footer depends on the conversation **status** and assignment:

- **Active + assigned to you** → **Message input** with attachment menu (text + image / file)
- **Anything else** → **Conversation Actions** bar with the buttons relevant to the current state

## Conversation actions (by status)

The footer shows the right buttons for the current status. Common actions:

| Action        | Available when…                      | What it does                                          |
| ------------- | ------------------------------------ | ----------------------------------------------------- |
| **Accept**    | Waiting / New (you don't own it yet) | Assigns the conversation to you and flips to _Active_ |
| **Take over** | Active (another operator owns it)    | Reassigns to you                                      |
| **Return**    | Active (assigned to you)             | Releases the conversation back to _Waiting_           |
| **Delay**     | Active                               | Puts the conversation on hold → _Delayed_             |
| **Reopen**    | Closed                               | Brings it back to _Active_                            |
| **Close**     | Active                               | Marks the conversation resolved → _Closed_            |
| **Delete**    | Permission-gated                     | Soft-delete the conversation (admin-style)            |
| **New**       | Always                               | Start a fresh conversation with the same client       |

You're guarded against acting on a chat you don't own — you'll get a _Take over_ button instead of a message input when the chat is assigned to someone else.

## Info panels

Two slide-in panels open from chat-window actions:

- **User Info Sidebar** — quick context for the assigned operator (you), and the rider's recent activity in this chat
- **Client Info Sheet** — the full client profile snapshot (balance, status, tags, recent rides) without leaving the chat — handy for fast decisions

## Empty state (desktop)

When no chat is selected on desktop, the right panel shows an empty-state illustration with a hint to pick a conversation. On mobile the right panel doesn't exist until you select one — the sidebar list fills the screen.

## Typical workflows

- **Pick up a waiting chat** — `Status = Waiting` → click the top card → _Accept_ → start chatting
- **Take a conversation from a teammate** — open the chat (you'll see it's owned by someone else) → _Take over_ (use sparingly; it disrupts the rider's continuity)
- **Cool a slow conversation** — when the rider stops responding, _Delay_ to move it out of your active queue; it returns to your inbox when they reply
- **Close out** — issue resolved → _Close_ with a quick canned response ("All sorted, have a great ride!")
- **Get the rider's context fast** — _Open info_ in the header → see balance / recent rides / tags before answering a billing question
- **Use canned responses** — for repetitive answers (refund policy, lost item process), pick a template and personalize

## Tips

- **Live by default** — new messages stream in without a refresh; the badge counter updates automatically
- **Unanswered first** — the sort keeps urgent chats at the top; trust the list order
- **Canned responses are templates, not scripts** — always personalize the greeting and the closing line; riders can tell when they're getting boilerplate
- **Take over with care** — the rider doesn't see operator-level state. Switching mid-conversation can feel jarring; only take over when the current operator is clearly stuck (offline, off-shift)
- **Delay > Close on uncertain cases** — if you think the issue might come back, _Delay_ keeps the thread linked; _Close_ makes the rider open a new conversation if they want to continue
- **Edit only your own messages** — and edit only short typos; rewriting an old message after the rider has read it can damage trust
- **The URL has the conversation ID** — paste it in a ticket or escalation note so the next operator can jump straight in
