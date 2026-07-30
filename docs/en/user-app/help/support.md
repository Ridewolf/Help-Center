# Rider App — Support, FAQ & Live Chat

Support (`/support`) is where a rider goes for help. It has two tabs — **FAQ** and **Contact** — and the live chat opens on its own screen (`/support/messenger`).

Two things to know before you answer any support-about-support question:

- **Every contact channel is yours to configure.** There is no global Ridewolf support email, phone number or opening hours anywhere in the app — never quote one.
- **The app has a chat, not a ticket form.** Riders do not get ticket numbers. Your team's view of the same conversations is [Conversations](../../support/tickets-proofs-chat/conversations.md); [Tickets](../../support/tickets-proofs-chat/tickets.md) is an operator-side concept.

## FAQ tab

Accordion sections built from your published question-and-answer content, plus **Ride Guide** items split into **Before Start** and **Before End** groups.

You control all of it without an app release:

- Questions and answers — [FAQ Sets](../../settings/content/faq-sets.md)
- Ride Guide walkthroughs — [Quick Guides](../../settings/content/quick-guides.md)

Individual FAQ items are **deep-linkable**: a link to a specific item opens Support with that item already expanded and scrolled into view. That is the right way to send a rider straight to one answer instead of "look in the FAQ".

## Contact tab

Every channel here is rendered only when you have enabled it in [My Company → App → support channels](../../settings/administration/my-company.md).

| Channel       | What it does                                                        |
| ------------- | ------------------------------------------------------------------- |
| **Live Chat** | Opens the messenger (`/support/messenger`)                          |
| **Email**     | Opens the rider's mail app with your address                        |
| **Website**   | Opens your configured URL in the in-app browser                     |
| **Telegram**  | Opens your Telegram contact externally                              |
| **WhatsApp**  | Opens your WhatsApp contact externally                              |
| **Phone**     | Starts a call to your configured number                             |

If **none** are enabled, the tab shows a no-contacts illustration. A rider reporting "there is no way to contact support" is almost always on a company with every channel switched off — check your own configuration before you look anywhere else.

## Live chat

The messenger is conversation-based:

- The rider sees their **list of conversations**, each with a status, the assigned operator, the last message and its time, and an unread count.
- **New Chat** is offered **only when the rider has no open conversation.** A rider with an open thread sees no way to start a second one — by design. They continue the existing thread.
- Opening a conversation loads its message history, 50 messages at a time, fetching older ones as the rider scrolls up.

| Conversation status | Meaning                              |
| ------------------- | ------------------------------------ |
| **New**             | Just opened, not yet picked up       |
| **Waiting**         | Waiting on your team                 |
| **Active**          | Being handled                        |
| **Delayed**         | Deferred                             |
| **Closed**          | Closed by an operator                |

**Message types the app renders:** text, image, file, location, contact, ride, app link and system messages.

**Message status icons:** sending, sent, delivered, read and failed.

### Sending a message

A rider can attach:

- Up to **5 images per message**
- A **location pin** (latitude, longitude and a label)
- A **file**

A sent message appears immediately as _sending_, then updates to its real status as the server confirms. The same live connection drives new-message and read updates, conversation-closed and conversation-assigned notices, and the "_{name} is typing…_" indicator.

After a lost connection the app reloads the conversation list and the open chat, de-duplicating by message — so a rider who dropped offline will not see the same message twice.

When an operator **closes** the conversation, the rider's input is disabled and a "conversation closed" notice replaces it.

## Troubleshooting

| Rider says…                              | What it is                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| "There are no contact options"           | No channels are enabled for your company — fix it in [My Company](../../settings/administration/my-company.md)  |
| "There is no New Chat button"            | The rider already has an open conversation; they should continue that thread                                     |
| "I can't type any more"                  | An operator closed the conversation. A new one can be started once no open thread remains                        |
| "My message shows failed"                | It never left the device — retry it                                                                             |
| "My messages duplicated after reconnect" | They did not; the reload de-duplicates. Ask for a screenshot if they insist                                     |
| "How fast will you reply?"               | No response time is defined in the app. **Do not promise one** — quote your own published service commitment    |
| "Where do I report an emergency?"        | Through whichever channels you have enabled. The app defines no emergency hotline, and no emergency number should be quoted from it |

## Tips

- **Audit your Contact tab.** Open the rider app yourself after any change in My Company — an all-empty Contact tab is invisible to you and infuriating to riders.
- **Deep-link FAQ answers** in chat replies instead of retyping them. It teaches riders where the answer lives.
- **One open conversation at a time** is the rule. When a rider needs to raise something unrelated, close the old thread first.
- **Keep FAQ Sets and Quick Guides current** — every question they answer is a chat you never have.
- **Closing a conversation ends the rider's ability to reply.** Make sure the answer is complete before you close.
