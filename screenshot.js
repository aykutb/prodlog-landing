/**
 * prodlog.app screenshot capture
 *
 * Reuses the local Chrome profile (persistent context) so authenticated
 * dashboard.prodlog.app pages work without logging in again.
 *
 * Chrome must be QUIT before running — Playwright needs exclusive access
 * to the profile directory.
 *
 *   npm init -y && npm install playwright
 *   node screenshot.js
 */

const os = require('os');
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const USER_DATA_DIR = path.join(
  os.homedir(),
  'Library/Application Support/Google/Chrome'
);
const OUT_DIR = path.join(process.cwd(), 'prodlog-screenshots');

const NAV_TIMEOUT = 15000;
const MODAL_TIMEOUT = 10000;
const RESULT_TIMEOUT = 30000;

const TRY_TEXT =
  'Shipped the new onboarding flow. Worked with design to finalize specs, wrote the PRD, ran 3 user tests, and got sign-off from eng. Also unblocked the payments team by clarifying scope on the checkout redesign. Had a 1:1 with my PM lead — she wants me to take ownership of the Q3 roadmap.';

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const log = (msg) => console.log(msg);
const warn = (msg) => console.warn(`⚠️  ${msg}`);

/** Navigate with a hard timeout. Returns false (and warns) on failure. */
async function goto(page, url) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
    // Give client-rendered apps a moment to paint; don't fail if network stays busy.
    await page
      .waitForLoadState('networkidle', { timeout: 8000 })
      .catch(() => {});
    await page.waitForTimeout(600);
    return true;
  } catch (err) {
    warn(`skipping ${url} — did not load within ${NAV_TIMEOUT / 1000}s (${err.message.split('\n')[0]})`);
    return false;
  }
}

/**
 * Find the narrowest element that wraps the visible page content.
 * Falls back through <main>, common Tailwind width wrappers, then <body>.
 */
async function contentTarget(page) {
  const candidates = [
    'main',
    '#root main',
    '[role="main"]',
    '[class*="max-w-"]',
    '#root > div',
    'body',
  ];

  for (const selector of candidates) {
    const locator = page.locator(selector).first();
    try {
      if (!(await locator.count())) continue;
      const box = await locator.boundingBox();
      if (box && box.width > 200 && box.height > 200) return locator;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

/** Screenshot an element (or the content wrapper, or the full page). */
async function shoot(page, filename, locator) {
  const file = path.join(OUT_DIR, filename);
  try {
    const target = locator || (await contentTarget(page));
    if (target) {
      await target.screenshot({ path: file, timeout: 15000 });
    } else {
      warn(`${filename}: no content wrapper found, using full page`);
      await page.screenshot({ path: file, fullPage: true });
    }
    log(`✅ saved ${filename}`);
    return true;
  } catch (err) {
    warn(`${filename}: screenshot failed — ${err.message.split('\n')[0]}`);
    return false;
  }
}

/** First locator from a list that is actually visible, or null. */
async function firstVisible(page, locators, timeout = 5000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    for (const locator of locators) {
      try {
        const candidate = locator.first();
        if ((await candidate.count()) && (await candidate.isVisible())) {
          return candidate;
        }
      } catch {
        /* try next */
      }
    }
    await page.waitForTimeout(250);
  }
  return null;
}

/** Warn (and report) if the dashboard bounced us to a login screen. */
async function checkAuth(page, label) {
  const url = page.url();
  if (/login|signin|sign-in|auth/i.test(url)) {
    warn(`${label}: looks like a login page (${url}) — is Chrome's Default profile the logged-in one?`);
    return false;
  }
  return true;
}

/** Scroll an element into view and settle. */
async function scrollTo(locator) {
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await locator.page().waitForTimeout(500);
}

/* ------------------------------------------------------------------ */
/* individual captures                                                 */
/* ------------------------------------------------------------------ */

async function capture01(page) {
  if (!(await goto(page, 'https://dashboard.prodlog.app'))) return;
  await checkAuth(page, '01');

  // Wait for the entry list to render.
  const list = await firstVisible(
    page,
    [
      page.locator('[data-testid*="entry"]'),
      page.locator('ul li'),
      page.locator('article'),
      page.locator('[class*="entry"]'),
    ],
    12000
  );
  if (!list) warn('01: entry list never appeared, capturing whatever rendered');
  await page.waitForTimeout(800);

  await shoot(page, '01-hero-dashboard-entry-list.png');
}

async function openSummaries(page) {
  const ok = await goto(page, 'https://dashboard.prodlog.app/summaries');
  if (!ok) return false;
  await checkAuth(page, 'summaries');
  await page.waitForTimeout(1200);
  return true;
}

async function capture02(page) {
  if (!(await openSummaries(page))) return;

  const tab = await firstVisible(
    page,
    [
      page.getByRole('tab', { name: /resume bullets/i }),
      page.getByRole('button', { name: /resume bullets/i }),
      page.getByText(/resume bullets/i),
    ],
    8000
  );
  if (!tab) {
    warn('02: "Resume Bullets" tab not found — skipping');
    return;
  }
  await tab.click();
  await page.waitForTimeout(1500);

  await shoot(page, '02-summaries-resume-bullets-output.png');
}

async function capture03(page) {
  if (!(await openSummaries(page))) return;
  await shoot(page, '03-summaries-page-with-tabs.png');
}

/** Open the summary-creation modal. Returns the dialog locator or null. */
async function openSummaryModal(page) {
  const trigger = await firstVisible(
    page,
    [
      page.getByRole('button', { name: /generate summary/i }),
      page.getByRole('button', { name: /new summary/i }),
      page.getByRole('button', { name: /create summary/i }),
      page.getByRole('button', { name: /^new$/i }),
      page.getByText(/generate summary|new summary/i),
    ],
    8000
  );
  if (!trigger) {
    warn('modal: no "Generate summary" / "New summary" button found');
    return null;
  }
  await trigger.click();

  const dialog = await firstVisible(
    page,
    [
      page.locator('[role="dialog"]'),
      page.locator('[data-state="open"][class*="dialog"]'),
      page.locator('[class*="modal"]'),
    ],
    MODAL_TIMEOUT
  );
  if (!dialog) {
    warn(`modal: did not appear within ${MODAL_TIMEOUT / 1000}s`);
    return null;
  }
  await page.waitForTimeout(800);
  return dialog;
}

async function capture04and05(page) {
  if (!(await openSummaries(page))) return;

  const dialog = await openSummaryModal(page);
  if (!dialog) {
    warn('04 + 05: skipped (modal never opened)');
    return;
  }

  await shoot(page, '04-choose-summary-type-modal.png', dialog);

  // 05 — the entry-selection step. Prefer stepping back; otherwise step forward.
  const back = await firstVisible(
    page,
    [
      dialog.getByRole('button', { name: /back|previous/i }),
      dialog.locator('button:has-text("Back")'),
    ],
    3000
  );

  if (back) {
    await back.click();
    await page.waitForTimeout(1200);
    log('05: stepped back to the entry-selection step');
  } else {
    const forward = await firstVisible(
      page,
      [
        dialog.getByRole('button', { name: /next|continue/i }),
        dialog.getByRole('button', { name: /review|resume/i }),
      ],
      3000
    );
    if (!forward) {
      warn('05: could not reach the entry-selection step — skipping');
      return;
    }
    await forward.click();
    await page.waitForTimeout(1500);
    log('05: stepped forward to the entry-selection step');
  }

  const step2 = await firstVisible(
    page,
    [page.locator('[role="dialog"]'), page.locator('[class*="modal"]')],
    MODAL_TIMEOUT
  );
  if (!step2) {
    warn('05: modal disappeared — skipping');
    return;
  }
  await shoot(page, '05-select-impact-logs-modal.png', step2);

  await page.keyboard.press('Escape').catch(() => {});
}

async function capture06and07(page) {
  if (!(await goto(page, 'https://prodlog.app/p/aykutbal'))) return;
  await page.waitForTimeout(1000);

  // 06 — hero / top section.
  const hero = await firstVisible(
    page,
    [
      page.locator('main > *').first(),
      page.locator('header'),
      page.locator('section').first(),
    ],
    5000
  );
  await shoot(page, '06-portfolio-page-hero.png', hero || undefined);

  // 07 — bottom CTA.
  const cta = await firstVisible(
    page,
    [
      page.locator('section', { hasText: /build your own/i }).last(),
      page.locator('div', { hasText: /build your own/i }).last(),
      page.getByText(/start free/i).last(),
      page.locator('main > *').last(),
    ],
    6000
  );
  if (!cta) {
    warn('07: bottom CTA section not found — skipping');
    return;
  }
  await scrollTo(cta);
  await shoot(page, '07-portfolio-page-bottom-cta.png', cta);
}

async function capture08to11(page) {
  if (!(await goto(page, 'https://prodlog.app/try'))) return;
  await page.waitForTimeout(800);

  // 08 — empty state.
  await shoot(page, '08-try-page-empty-state.png');

  // 09 — filled textarea.
  const textarea = await firstVisible(page, [page.locator('textarea')], 8000);
  if (!textarea) {
    warn('09–11: no textarea on /try — skipping');
    return;
  }
  await textarea.click();
  await textarea.fill(TRY_TEXT);
  await page.waitForTimeout(600);
  await shoot(page, '09-try-page-filled-state.png');

  // 10 — submit and wait for generated entries.
  const submit = await firstVisible(
    page,
    [
      page.getByRole('button', { name: /see what comes out/i }),
      page.locator('form button[type="submit"]'),
      page.getByRole('button', { name: /submit|try it/i }),
    ],
    6000
  );
  if (!submit) {
    warn('10–11: submit button not found — skipping');
    return;
  }
  await submit.click();

  const results = page.locator('ul li').first();
  try {
    await results.waitFor({ state: 'visible', timeout: RESULT_TIMEOUT });
  } catch {
    warn(`10–11: no generated entries within ${RESULT_TIMEOUT / 1000}s — skipping`);
    return;
  }
  await page.waitForTimeout(1500);

  const output = await firstVisible(
    page,
    [page.locator('ul').first(), page.locator('[aria-live="polite"]')],
    5000
  );
  await shoot(page, '10-try-page-output-notes-to-entries.png', output || undefined);

  // 11 — full output including the bottom CTA.
  const cta = await firstVisible(
    page,
    [page.getByText(/start free/i).last(), page.locator('[aria-live="polite"]')],
    6000
  );
  if (cta) await scrollTo(cta);
  await shoot(page, '11-try-page-full-output-with-cta.png');
}

async function capture12(page) {
  if (!(await goto(page, 'https://prodlog.app'))) return;
  await page.waitForTimeout(1000);

  const hero = await firstVisible(
    page,
    [page.locator('main > *').first(), page.locator('section').first()],
    5000
  );
  await shoot(page, '12-landing-page-hero.png', hero || undefined);
}

/* ------------------------------------------------------------------ */
/* main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  log(`Output directory: ${OUT_DIR}\n`);

  let context;
  try {
    context = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false,
      channel: 'chrome',
      args: ['--profile-directory=Default'],
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2,
    });
  } catch (err) {
    console.error(
      `\n❌ Could not launch Chrome with your profile.\n   ${err.message.split('\n')[0]}\n` +
        `   Make sure Chrome is completely quit (Cmd+Q) before running this script.\n`
    );
    process.exit(1);
  }

  const page = context.pages()[0] || (await context.newPage());
  page.setDefaultTimeout(15000);

  const steps = [
    ['01', capture01],
    ['02', capture02],
    ['03', capture03],
    ['04+05', capture04and05],
    ['06+07', capture06and07],
    ['08–11', capture08to11],
    ['12', capture12],
  ];

  for (const [label, fn] of steps) {
    try {
      await fn(page);
    } catch (err) {
      warn(`step ${label} failed — ${err.message.split('\n')[0]}`);
    }
  }

  await context.close();
  log(`\nDone. Screenshots are in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
