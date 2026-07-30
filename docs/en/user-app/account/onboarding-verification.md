# Onboarding and Rider Verification

Onboarding is the set of screens a brand-new rider passes through after their first successful sign-in, before they reach the map. Some steps are conditional, so the number of screens differs between operators.

Read this before answering any question about rider verification or document uploads — the honest answer is often not the one a rider expects.

Sign-in itself is covered in [Signing in](registration-login.md).

## The step order

| # | Step                 | Route                        | When it appears                                                          |
| - | -------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| 1 | **Invite code**      | `/onboarding/invite`         | Not currently available in the app — riders go straight to **About me**  |
| 2 | **About me**         | `/onboarding/about-me`       | Always. **This is where the account is created**                         |
| 3 | **Driver license**   | `/onboarding/driver-license` | Only when your company settings enable it (by default they do not)       |
| 4 | **Passport**         | `/onboarding/passport`       | Only when enabled the same way                                           |
| 5 | **Permissions**      | `/onboarding/permissions`    | Always                                                                   |
| 6 | **Congratulations**  | `/onboarding/congratulations`| Always, then on to `/map`                                                |

Note the order: registration and personal details come **before** documents, and permissions come **after** them — not the other way round.

## About me — the step that creates the account

A three-step stepper:

1. **Photo** — optional, can be skipped
2. **Name and birth date** — **First Name** required; **Last Name** and **Middle Name** optional; **Date of Birth** required, and cannot be later than today
3. **Contact** — **Email** optional; phone entered through the country-prefix picker and validated as an international number; the marketing-consent checkbox is **required** to continue

On submit the account is created. If a photo was chosen, it is uploaded right afterwards — a failed photo upload does **not** break registration, the account is still created.

The next screen depends on your company settings: **Driver license** if enabled, otherwise **Passport** if enabled, otherwise straight to **Permissions**.

### "What is my password?"

A rider who registered here was never asked to choose a password. If they later want to use the email-and-password sign-in tab, they have to set a password first through **Forgot password** — see [Signing in](registration-login.md).

## Driver license and passport

Each of these screens is a three-step stepper — front photo, back photo, then a selfie holding the document — and each step accepts a camera capture or a photo from the gallery. **Submit** stays blocked until all three images exist; the rider sees an "all photos are required" message until then, and the step cannot be skipped.

**Document upload is not currently available in the app.** Submitting shows an error and leaves the rider on the same step. There is no retry that succeeds, and no document image reaches your systems.

What this means in practice:

- Never tell a rider (or a colleague) that a document was received, is being reviewed, or is stored — nothing was uploaded
- A rider stuck on this screen is not doing anything wrong: it is not a photo-quality problem, not a camera problem and not a network problem
- Any real identity check has to be run by your team outside the app
- If your company settings currently enable these steps, riders on your operator cannot finish onboarding through them. Turn the extra steps off in **Settings → My Company → App → Signup Extra Steps** ([My Company](../../settings/administration/my-company.md)) unless you have a reason to keep them

## Permissions

The screen asks for three permissions: **notifications**, **location** and **camera**. **Continue** only becomes available once all three are granted.

**Known issue:** both **Continue** and **Skip** currently take the rider back to the **About me** stepper instead of forward to **Congratulations**. A rider who has just granted all three permissions can find themselves back at the start of the personal-details stepper. This is a known issue in the app, not a rider mistake — say so rather than talking the rider in circles.

Location permission matters beyond onboarding: without it, a ride cannot be started. See [Rides](../riding/rides.md).

## Congratulations

A display-only screen. It clears the onboarding data, shows an "account under review" notice and offers **Continue**, which opens the map.

The notice does not state how long a review takes, and neither should you — there is no published turnaround time. And since no documents were uploaded, there is nothing in a review queue yet.

## Account Blocked — `/onboarding/account-blocked`

Shown when the rider's account is reported as blocked. It is a display-only screen listing the possible reasons:

- Terms violation
- Fraud
- Repeated payment failures
- Suspicious behaviour
- Safety concerns

Below the reasons, a **Contact support** accordion is built from the same **Support channels** you configure for the Support screen — phone, email, Telegram, WhatsApp and website, each switched on independently — so which channels appear depends on your configuration. A **Back to Login** button is provided.

There is no appeal flow inside the app. The only path forward for the rider is contacting your team through one of those channels. On your side, review and unblock the client from the dashboard — see [Client Detail](../../operations/customers/client-detail.md).

## FAQ

- **How does rider verification work?** Not inside the app. The account is created on **About me**; the document steps cannot be completed because document upload is not currently available in the app. Run identity checks outside the app.
- **Why does one rider see a passport step and another does not?** The document steps are per-operator, set in **Signup Extra Steps**.
- **A rider is stuck on the driver license or passport screen.** Expected. Submitting always fails there — not fixable by the rider.
- **Can the rider skip the document step?** No. All three images are required before submit, and submit then fails.
- **How long does review take?** The app does not say, so do not quote a duration.
- **The rider says their photo quality was rejected.** The app does not evaluate image quality at all. What they saw is the upload error.
- **Which step actually creates the account?** **About me**, step 3, on submit.
- **The invite-code screen never appears.** Invite codes are not currently available in the app.

## Related

- [Getting started](../basics/getting-started.md) — the short version of this flow
- [Signing in](registration-login.md) — sign-in methods, codes, password reset
- [Profile](profile.md) — what the rider can change afterwards
- [Support](../help/support.md) — the channels shown on the Account Blocked screen
