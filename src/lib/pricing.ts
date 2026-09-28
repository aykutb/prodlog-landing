/**
 * Pricing, in one place. Every line of copy that mentions the price or the
 * free period comes from `pricingLines()`, so the free-period lines drop out
 * on their own once PRO_FREE_UNTIL has passed and the $9/mo lines remain.
 *
 * Pages that render these lines must not be frozen at build time: give them
 * `export const revalidate` (ISR) so the switch happens within the hour.
 */

export const PRO_PRICE_MONTHLY = 9;
/** Last day of the free period, inclusive (ISO date). */
export const PRO_FREE_UNTIL = '2026-12-31';
/** Summaries a month on the free plan (prodlog2 `summary_quota_for`). */
export const FREE_SUMMARIES_PER_MONTH = 3;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * The free period ends at the end of PRO_FREE_UNTIL anywhere on earth
 * (UTC-12), so no visitor sees it end before their own December 31 is over.
 */
const freePeriodEnd = (): Date => {
  const [y, m, d] = PRO_FREE_UNTIL.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1, 12));
};

/**
 * The current time, or `PRICING_NOW` (an ISO date) when set, so the
 * after-the-date copy can be checked before the date: `PRICING_NOW=2027-01-02`.
 */
export const pricingNow = (): Date => {
  const override = process.env.PRICING_NOW;
  if (override) {
    const date = new Date(override);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return new Date();
};

export const isProFree = (now: Date = pricingNow()): boolean => now.getTime() < freePeriodEnd().getTime();

export interface PricingLines {
  /** True until the end of PRO_FREE_UNTIL. */
  proFree: boolean;
  /** "$9/mo" */
  proPrice: string;
  /** "Free until Dec 31" during the free period, else null. */
  proFreeNote: string | null;
  /** Under the hero's paste box, after "or Start free." */
  hero: string;
  /** The final CTA band's small line. */
  finalCta: string;
  /** /pricing H1 and sub-line. */
  pricingTitle: string;
  pricingSub: string;
  /** The "After December 31" block on /pricing: null once the date has passed. */
  afterFreePeriod: { title: string; items: string[] } | null;
  /** Footer CTAs on inner pages. */
  footer: string;
  /** What a review draft costs, for /self-review. */
  summaryNote: string;
  /** /pricing metadata. */
  metaTitle: string;
  metaDescription: string;
  /** The Pro card's button. */
  proCta: string;
  /** /pricing FAQ answers that depend on the date; null hides the question. */
  faqJanuary: string | null;
  faqCard: string;
}

export function pricingLines(now: Date = pricingNow()): PricingLines {
  const proFree = isProFree(now);
  const [y, m, d] = PRO_FREE_UNTIL.split('-').map(Number);
  const longDate = `${MONTHS[m - 1]} ${d}, ${y}`;
  const shortDate = `${MONTHS[m - 1].slice(0, 3)} ${d}`;
  const proPrice = `$${PRO_PRICE_MONTHLY}/mo`;
  const quota = `${FREE_SUMMARIES_PER_MONTH} a month free, unlimited on Pro`;

  if (proFree) {
    return {
      proFree,
      proPrice,
      proFreeNote: `Free until ${shortDate}`,
      hero: `No signup to try. Pro is free until the end of the year, then ${proPrice}.`,
      finalCta: 'Entries, 1:1 prep and your portfolio are free forever. Pro is free until the end of the year.',
      pricingTitle: 'Pro is free until the end of the year.',
      pricingSub: `Everyone gets Pro free through ${longDate}. After that it's ${proPrice}, and the free plan stays free forever.`,
      afterFreePeriod: {
        title: `After ${MONTHS[m - 1]} ${d}`,
        items: [
          `Pro becomes ${proPrice}.`,
          'The free plan stays free forever.',
          'Your entries are always yours: export anytime, no lock-in.',
        ],
      },
      footer: `Free forever. Pro is free until the end of the year, then ${proPrice}.`,
      summaryNote: `${quota}, and Pro is free until ${shortDate}.`,
      metaTitle: 'Pricing: free until the end of the year | Prodlog',
      metaDescription: `Pro is free for everyone until ${longDate}, then ${proPrice}. The free plan stays free forever: unlimited entries, 1:1 prep and a public portfolio.`,
      proCta: 'Start free, Pro included',
      faqJanuary: `Pro becomes ${proPrice}. If you don't upgrade, you keep everything on the free plan, including every entry and your published portfolio.`,
      faqCard: 'No. Not to start, and not while Pro is free.',
    };
  }
  return {
    proFree,
    proPrice,
    proFreeNote: null,
    hero: `No signup to try. Free forever, Pro is ${proPrice}.`,
    finalCta: `Entries, 1:1 prep and your portfolio are free forever. Pro is ${proPrice}.`,
    pricingTitle: 'Simple pricing.',
    pricingSub: `Free forever. Pro is ${proPrice} when you need more.`,
    afterFreePeriod: null,
    footer: `Free forever. Pro is ${proPrice}.`,
    summaryNote: `${quota} (${proPrice}).`,
    metaTitle: 'Pricing | Prodlog',
    metaDescription: `Free forever: unlimited entries, 1:1 prep and a public portfolio. Pro is ${proPrice} for unlimited summaries.`,
    proCta: 'Get Pro',
    faqJanuary: null,
    faqCard: 'No. Not to start.',
  };
}
