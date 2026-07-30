# Your App: Publisher & Submission

The final two steps of the [Your App white-label wizard](your-app.md) (`/settings/your-app`): choosing **whose developer accounts publish the app**, supplying store credentials if they're yours, and submitting for provisioning.

## Publisher choice

A radio selection with two options:

- **Ridewolf** (default) — the app is published through Ridewolf's own developer accounts. **No store credentials are needed from you.**
- **Your own accounts** — the app is published through your own Apple and Google developer accounts, which requires the credentials below.

## Store access credentials (own accounts only)

**Apple — all required:**

- Apple ID
- Team ID
- App Store Connect API **Key ID** and **Issuer ID**
- App Store Connect API **private key** (the `.p8` file content)
- D-U-N-S number

**Google:**

- Service account email
- Service account JSON
- Play Console email

These credentials are sensitive — they are sent for provisioning and are **not kept in the browser's local draft**.

## Manual attestations

Two checkboxes you tick to confirm access has actually been granted:

- **App Store Connect access granted** — the Apple ID has been added to App Store Connect
- **Play Console access granted** — Play Console permissions have been set

These are **self-declared and not automatically verified**. Ticking them without granting the real permissions won't be caught here — it will surface later as a provisioning failure.

## Review step

A read-only summary of every prior step, with **per-rule validation badges** (for example _Assets required_ or _Legal complete_) shown as pass or fail, and **edit-in-place links** back to the specific step that needs attention. Every check must pass before **Submit** becomes available.

## Submission

Submitting launches the provisioning pipeline and moves the status through **draft → provisioning → in-review → production**, or to **rejected**.

- While the status is `provisioning`, `in-review` or `production`, the page is **read-only** and store links (TestFlight, Play internal testing, App Store, Play Store) appear as the pipeline populates them.
- A **rejected** status makes the wizard editable again so you can correct and resubmit.

## Common questions

- **Submit is unavailable.** One or more validation badges on the Review step are still failing — use the edit links to jump to the offending step.
- **The Apple/Google fields aren't shown.** They only appear when the publisher is set to your own accounts.
- **I need to change something after submitting.** You can't while the status is `provisioning`, `in-review` or `production`. If the app is rejected, the wizard becomes editable again — `draft` and `rejected` are the two editable states.
- **Provisioning failed even though I ticked the attestations.** Those are manual claims — re-check that the Apple ID really has App Store Connect access and that the service account really has Play Console permissions.
