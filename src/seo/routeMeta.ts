export type RouteMeta = {
  title: string;
  description: string;
};

/** Per-path SEO. Paths must match React Router locations (no trailing slash except `/`). */
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Prodlog: the work log for your 1:1s and reviews',
    description:
      'Prodlog turns the notes you already keep into a work log you own. It preps your 1:1s and drafts your reviews, and when you change jobs it becomes your resume bullets, STAR stories and portfolio.',
  },
  '/how-it-works': {
    title: 'How Prodlog works: from messy notes to your next 1:1',
    description:
      'Start with the notes you already have. Log as things happen. Get it back before every 1:1, every review, and every job change.',
  },
  '/1-1-prep': {
    title: '1:1 prep for product managers | Prodlog',
    description:
      'Walk into your 1:1 with everything since the last one. Prodlog lays out what you logged, flags what is missing an outcome, and asks what you need from your manager. Free, never metered.',
  },
  '/self-review': {
    title: 'Write your self-review from evidence | Prodlog',
    description:
      "Paste your company's review questions once. Prodlog drafts an answer to each from your own entries and shows which ones it drew on.",
  },
  '/privacy': {
    title: 'Privacy-First Career Docs | Prodlog',
    description:
      'Prodlog is built so your entries and portfolio stay yours. Learn how we approach privacy for career documentation.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Prodlog',
    description:
      'Read the Prodlog privacy policy: what we collect, how we use data, and how to contact us about your information.',
  },
  '/terms': {
    title: 'Terms of Service | Prodlog',
    description:
      'Terms governing your use of Prodlog. Delaware governing law. Contact support@prodlog.app with questions.',
  },
  '/integrations/slack': {
    title: 'Log Work in Slack | Prodlog Slack Integration',
    description:
      'Log from any Slack channel or DM with /log or the message menu, and get your 1:1 prep the day before, right in Slack.',
  },
  '/pricing': {
    // The live title and description come from pricingLines() (app/pricing/page.tsx); this entry lists the route in the sitemap.
    title: 'Pricing | Prodlog',
    description: 'Free forever: unlimited entries, 1:1 prep and a public portfolio. Pro is $9/mo for unlimited summaries.',
  },
  '/faq': {
    title: 'FAQ | Prodlog',
    description:
      'Answers about Prodlog: how 1:1 prep and review drafts work, where you can log from, who can see your log, and what it costs.',
  },
  '/support': {
    title: 'Support | Prodlog',
    description:
      'Need help with Prodlog? Send us a support request and we will get back to you by email, or reach us directly at support@prodlog.app.',
  },
  '/try': {
    title: 'Try Prodlog: paste your notes, see your entries',
    description:
      'Paste a messy note and see it come out as clean entries: date, title, ownership, outcome. Nothing is saved and nothing is shared. No signup needed.',
  },
};

const FALLBACK = ROUTE_META['/']!;

export function getRouteMeta(pathname: string): RouteMeta {
  return ROUTE_META[pathname] ?? FALLBACK;
}
