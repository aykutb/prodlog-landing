# Landing shots: the capture list

Every real product screenshot the marketing site uses. The owner captures
them; `ProductShot` renders them. Put each file in `public/shots/` under the
exact filename below. In development a missing file shows a red
"MISSING SHOT: <name>" frame; `next build` fails while any referenced file is
missing.

## General rules

- **Account:** the demo persona Priya Raghunathan (`demo+priya_r@prodlog.app`, handle `priya_r`) on production, or `/dev/screens` only where a state cannot be seeded. Never a real user's account.
- **Seed on the capture day.** `supabase/seeds/demo-log-first.sql` places Priya's recent entries and her 1:1s relative to the day it runs. Re-run it that morning so the 1:1 card reads "3 entries since your last 1:1 on …" and the Thursday 1:1 is in the future.
- **Browser:** Chrome, light mode, 100% zoom, no extensions visible. Capture the page content only (no browser chrome): `ProductShot` draws its own light chrome around it.
- **Scale:** 2x device pixels. Sizes below are the file's pixel size; the layout width is half of it.
- **Nothing private:** no real names, emails or Slack workspaces other than the demo cast (Elena Vasquez, Sam Okafor, Rob Hartley, Chi Nwosu). Dismiss any toasts, banners and the cookie notice.
- **Copy check:** before capturing, confirm no em or en dash and no "impact", "win" or "verified" is visible in the frame.

## Capture log

- 2026-09-28: five web shots captured from production as Priya, 2x, in a separate Chrome window (the owner signed in; nothing touched credentials). Setup done in the UI: review questions added (no review date yet, so the Log keeps the 1:1 card), the chart image added to "Chargeback dashboard v2", the 1:1 ask filled in, career mode switched on for `career-move.png` and off again. Elena was already the 1:1 counterpart. The paste import was run and closed without saving.
- 2026-09-28: `slack-day-before.png` captured from the owner's own workspace (the Prodlog Slack workspace, the owner signed in with an email code), not Priya's, with the owner's OK to keep "Maya" as the 1:1 name. The empty-DM intro and the frame's rounded corner were hidden in CSS; the message is untouched. No thread reply, so no personal name shows.
- 2026-09-28: `slack-message-shortcut.png` and `slack-log-modal.png` captured in the owner's workspace, #general, from a message the owner approved posting ("Cut the manual refund review step, tickets down 34%"). The form was filled and then discarded with Leave, so no entry was saved. The owner's Slack handle shows as the message author in the shortcut shot.
- 2026-09-28: `slack-log-command.png` captured with `/log` typed. After the rename Slack's client listed the command twice from its cache (the app has one `/log`, owner checked), so the repeated row was hidden in CSS for the capture.
- 2026-09-28: `ios-log.png` captured as Priya (the owner signed in) on the `prodlog-393x852` simulator, iOS 26.5, from a development build of prodlog-mobile's `feat/one-on-one-card` branch (not yet on the App Store). Status bar overridden to 9:41 and a full battery; Expo's dev tools button hidden. The seed's `demo-log-first` tag shows on each entry.
- 2026-09-28: `career-move.png` recaptured at 1440 x 1800 so the portfolio preview reaches the metric cards; both pages crop it from the Career header to the skills row. The move switch was turned on for the capture and off again after.
- The seed was not re-run: Priya's recent entries are dated Sep 25 (the seed day), which still gives "3 entries since your last 1:1 on Sep 24".
- Crops on the site: `log-home.png` is cropped to the ledger in the habit card and on the Slack page, `one-on-one-prep.png` to its content column (`ProductShot` `crop.region`).

## Setup before capturing (in the product UI, as Priya)

1. **Image on an entry:** open "Chargeback dashboard v2" and add `docs/shots-inputs/chargeback-dashboard.png` to its body, so one ledger row shows a thumbnail. It is the same art as the site's mock (`public/demo/chargeback-dashboard.svg`).
2. **1:1 counterpart:** Settings, Rhythm: 1:1 with "Elena Vasquez", weekly, Thursday. The seed picks the first teammate by creation time, which is not guaranteed to be Elena.
3. **Review:** Settings, Rhythm: next review about three weeks out, every 6 months, and these questions, one per line:
   ```
   What did you deliver this cycle, and what was the outcome?
   Where did you show judgment under uncertainty?
   What would you do differently?
   What do you need to grow next cycle?
   ```
4. **Career mode:** Career, turn on "I'm getting ready to move" (only before `career-move.png`; turn it off again after).
5. **1:1 ask:** on the 1:1 prep screen, "What do you need from your manager?": `Sign-off to retire the manual refund review for every merchant, not just the pilot group.` (the same line the site's mocks use).

## The shots

| File | Size (px) | Where it is used | Status |
|---|---|---|---|
| `log-home.png` | 2880 x 2000 | Homepage (habit: On the web), /how-it-works step 2 | Captured 2026-09-28 |
| `log-home-mobile.png` | 780 x 1688 | Homepage and /how-it-works at 375px | Captured 2026-09-28 |
| `one-on-one-prep.png` | 2880 x 2200 | Homepage (Before every 1:1), /how-it-works step 3, /1-1-prep | Captured 2026-09-28 |
| `review-draft.png` | 2880 x 2200 | /how-it-works step 4, /self-review | Captured 2026-09-28 (after the prompt fix) |
| `career-move.png` | 2880 x 3600 | Homepage (When you change jobs), /how-it-works step 5 | Captured 2026-09-28 |
| `paste-import.png` | 2880 x 1800 | /how-it-works step 1 | Captured 2026-09-28 |
| `slack-day-before.png` | 1600 x 1000 | Homepage (Before every 1:1), /1-1-prep, /integrations/slack | Captured |
| `slack-log-command.png` | 1600 x 900 | /integrations/slack step 1 | Captured |
| `slack-message-shortcut.png` | 1600 x 900 | /integrations/slack step 2 | Captured |
| `slack-log-modal.png` | 1600 x 1000 | /integrations/slack step 3 | Captured |
| `ios-log.png` | 1179 x 2556 | Homepage (habit: On your phone) | Captured |
| `og-*` backgrounds | 2400 x 1260 | See "OG backgrounds" below | Not needed (drawn in code) |

### `log-home.png`: the Log home
- **Viewport:** 1440 x 1000, `dashboard.prodlog.app/log`, scrolled to the top.
- **Must show:**
  - The top bar with Log active.
  - The ink "Your 1:1" card (or "1:1 with Elena Vasquez") with its date, "3 entries since your last 1:1 on …", the week stack with strips in several windows and "Now" filled, and "Prep my 1:1".
  - "Your log" with the All / 1:1 preps / Reviews filter.
  - The ledger line ("What moved today?").
  - At least these rows: "Cut the manual refund review step" (with an outcome), "Dispute evidence checklist" (no outcome), "Chargeback dashboard v2" (the image thumbnail), and the "Your 1:1, <date>" divider under them.
- **Crop:** the full viewport. The homepage's "On the web" card crops to the ledger in CSS; no second file.
- **No panel open.**

### `log-home-mobile.png`: the ledger on a phone
- **Viewport:** 390 x 844 at 2x, the same page and state as `log-home.png`, scrolled so the ledger line sits near the top.
- **Must show:** the ledger line, three rows including one with an outcome, and a 1:1 divider.
- **Crop:** 390 x 844 (780 x 1688 file).

### `one-on-one-prep.png`: 1:1 prep
- **Viewport:** 1440 x 1100, `/log/one-on-one/<next Thursday>` (open it from "Prep my 1:1").
- **Must show:**
  - The three entries in the window with their include checkboxes (all on).
  - "Gaps", naming "Dispute evidence checklist" as missing an outcome.
  - "What do you need from your manager?" with the ask from setup step 5.
  - The button row: "Copy for your 1:1 doc", "Skip this 1:1", "Move to another day".
- **Crop:** top of the page to just under the button row.

### `review-draft.png`: review with per-question drafts
- **Viewport:** 1440 x 1100, `/log/review/<date>` for the review set up in step 3.
- **Must show:** the review questions, a draft under at least the first two questions, and, for each draft, the entries it drew on.
- **State:** press "Draft my review" once before capturing. It counts as one summary, and Priya is on the free plan with 3 a month.
- **Crop:** top of the page to the end of the second draft.

### `career-move.png`: Career with the move switch on
- **Viewport:** 1440 x 900, `/career/portfolio`.
- **Must show:** the Career header with "I'm getting ready to move" switched on, the portfolio status line (published), and the portfolio preview with her bento cards.
- **Crop:** the full viewport.

### `paste-import.png`: pasted notes becoming entries
- **Viewport:** 1440 x 900. Paste the site's sample note (`PreviewTool.tsx`, "Use a sample note") into the ledger line.
- **Must show:** the import preview with the extracted entries, dates, one flagged as missing an outcome, before saving.
- **Crop:** the full viewport. Cancel afterwards; do not save.

### `slack-day-before.png`: the day-before-1:1 DM
- **Slack desktop,** light theme, the Prodlog app's DM with Priya's demo Slack user, on the day before her Thursday 1:1.
- **Must show:** the Prodlog app's message asking about the week, with its buttons, and one reply in the thread if possible.
- **Crop:** the message pane only, 800 x 500 at 2x. No sidebar, no workspace name, no other channels.

### `slack-log-command.png`, `slack-message-shortcut.png`, `slack-log-modal.png`: /integrations/slack
- **Slack desktop,** light theme, a demo channel. The current images show the old UI; recapture all three.
  - `slack-log-command.png`: typing `/log cut the manual refund review step` in the message box, the slash command suggestion visible.
  - `slack-message-shortcut.png`: a message's "More actions" menu open, with the Prodlog log shortcut highlighted.
  - `slack-log-modal.png`: the log modal open, title prefilled, date set.
- **Blocked:** the modal title is still "Log an impact" and the shortcut is named "Log a win". Wait for the renames (cross-repo follow-ups) before capturing these three.

### `ios-log.png`: the iOS Entries page with the 1:1 card
- **iPhone 15 Pro simulator** (1179 x 2556), light mode, the Entries tab, signed in as Priya.
- **Must show:** the 1:1 card at the top with her next 1:1, then her entries.
- **Status bar:** 9:41, full battery (`xcrun simctl status_bar booted override --time 9:41 --batteryLevel 100`).

### OG backgrounds (optional)
Phase 6 plans to draw every OG image in code (next/og: ink background, the
strip chart, a serif headline), so no capture is needed. If you prefer a
real product crop behind the headline, capture these three at 2400 x 1260:
- `og-occasion-card.png`: the ink card from `log-home.png` state, cropped tight with 48px of page around it.
- `og-ledger.png`: four ledger rows with a divider.
- `og-prep.png`: the top of the 1:1 prep screen.

## Editorial images to redo (not product shots)

These illustrations are inside the Sanity article bodies (`public/images/`).
The text around them is fixed by the pending content changes, but the pixels
still show the old product or banned words. Replace the files in place (same
path and size) or tell me and I'll change the references.

| File | Page | What's wrong (checked) |
|---|---|---|
| `images/pillars/portfolio-format-options.png` | /product-manager-portfolio | "LinkedIn Featured" bubble; em dashes in every label; "verification built in" |
| `images/pillars/portfolio-weak-vs-strong.png` | /product-manager-portfolio | "Verified collaborator", "Validated proof", "The verifiable entry", the retired "Story" badge, em and en dashes, a middle-dot meta line; shows "Kaan Uzunpınar" and "Jotform Chatbot" (a real person and product?), not the demo cast |
| `images/pillars/brag-document-sample-log.png` | /brag-document | The old "Logs / Track your product improvements and their impact" page, "Verified" badges, a timeline, `prodlog.app/sample` |
| `images/pillars/brag-document-before-after.png` | /brag-document | Replace: old UI (Logs, Summaries nav, the wizard), em dashes in the notes |
| `images/pillars/brag-document-entry-fields.png` | /brag-document | Replace: old UI (Logs, Summaries nav, "Timeline", "Enrich your log") |
| `images/pillars/portfolio-sample-profile.png` | /product-manager-portfolio | Replace: old portfolio UI ("Impacts", "Stories", IMPACT and STORY cards); "Sarah Chen, Senior PM at Stripe", Stripe, Notion, Figma. Use Priya's page |
| `images/pillars/portfolio-five-components.png` | /product-manager-portfolio | Fix text: an em and an en dash ("The header frame —", "2–3 expanded stories") |
| `images/blog/perf-review-before-after.png` | /blog/performance-review-examples-pm | Fix text: 3 em dashes |
| `images/templates/brag-document-template-preview.png` | /templates/brag-document-template | Fix text: about 6 em dashes; "capture your wins", "optional verification from collaborators, and one-click summaries" |
| `images/templates/first-90-days-template-preview.png` | /templates/first-90-days | Fix text: many dashes; "early-wins log" (now "early results log") |
| `images/templates/manager-1-1-template-preview.png` | /templates/manager-1-1 | Fix text: about 5 em dashes |
| `images/templates/promotion-packet-template-preview.png` | /templates/promotion-packet | Fix text: many dashes, "3–4" |
| `images/templates/quarterly-review-template-preview.png` | /templates/quarterly-review | Fix text: many dashes, "3–5" |
| `images/templates/resume-bullets-template-preview.png` | /templates/resume-bullets | Fix text: 3 em dashes |
| `images/templates/star-story-bank-template-preview.png` | /templates/star-story-bank | Fix text: em and en dashes ("8–10") |
| `images/blog/perf-review-flow.png` | /blog/performance-review-examples-pm | OK |

The template previews are probably renders of the .docx files in `public/downloads/`; if so, fix the dashes in the documents and re-render the previews from them.
