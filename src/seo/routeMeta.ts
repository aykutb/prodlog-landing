export type RouteMeta = {
  title: string;
  description: string;
};

/** Per-path SEO. Paths must match React Router locations (no trailing slash except `/`). */
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Prodlog: the note about your work that actually produces something',
    description:
      'Your best work is already written down somewhere. Prodlog keeps the same two-minute habit and turns it into your review, your resume bullets, and your interview answers.',
  },
  '/how-it-works': {
    title: 'How It Works | Prodlog',
    description:
      'See how Prodlog turns the note you already keep into dated entries, then into reviews, resume bullets, and a PM portfolio, without starting from a blank page.',
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
      'Log shipped work to your brag document without leaving Slack. One slash command logs what shipped, your role, and the outcome, straight into your Prodlog timeline.',
  },
  '/pricing': {
    title: 'Pricing | Free During Early Access | Prodlog',
    description:
      'Prodlog is free while in early access: the first 1,000 founding members get Pro free for a year. Unlimited entries, private by default, export anytime.',
  },
  '/faq': {
    title: 'FAQ | PM Interviews, STAR Framework & Brag Documents | Prodlog',
    description:
      'Answers about PM interviews, the STAR framework, brag documents, and building a product manager portfolio with Prodlog.',
  },
  '/support': {
    title: 'Support | Prodlog',
    description:
      'Need help with Prodlog? Send us a support request and we will get back to you by email, or reach us directly at support@prodlog.app.',
  },
  '/try': {
    title: 'Try Prodlog | Paste Your Notes, See Entries | Prodlog',
    description:
      'Paste a messy note and see it come out as clean entries: date, title, ownership, outcome. Nothing is saved and nothing is shared. No signup needed.',
  },
};

const FALLBACK = ROUTE_META['/']!;

export function getRouteMeta(pathname: string): RouteMeta {
  return ROUTE_META[pathname] ?? FALLBACK;
}
