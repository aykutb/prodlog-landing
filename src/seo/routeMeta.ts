export type RouteMeta = {
  title: string;
  description: string;
};

/** Per-path SEO. Paths must match React Router locations (no trailing slash except `/`). */
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Prodlog | PM Portfolio, Impact Logs & Brag Document',
    description:
      'Build your product manager portfolio and PM impact log in one place. Capture wins for performance reviews, PM interviews, and your brag document—without scattered docs.',
  },
  '/how-it-works': {
    title: 'How It Works | PM Impact Log & Portfolio | Prodlog',
    description:
      'See how Prodlog turns shipped work into verified impact logs and a PM portfolio you can use for reviews, your brag document, and interview prep.',
  },
  '/privacy': {
    title: 'Privacy-First Career Docs | Prodlog',
    description:
      'Prodlog is built so your PM impact logs and portfolio stay yours. Learn how we approach privacy for career documentation.',
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
      'Log shipped work to your brag document without leaving Slack. One slash command captures what shipped, your role, and the outcome — straight into your Prodlog timeline.',
  },
  '/pricing': {
    title: 'Pricing | Free During Early Access | Prodlog',
    description:
      'Prodlog is free while in early access: the first 1,000 founding members get Pro free for a year. Unlimited entries, private by default, export anytime.',
  },
  '/faq': {
    title: 'FAQ | PM Interviews, STAR Framework & Impact Logs | Prodlog',
    description:
      'Answers about PM interviews, the STAR framework, impact logs, brag documents, and building a product manager portfolio with Prodlog.',
  },
  '/support': {
    title: 'Support | Prodlog',
    description:
      'Need help with Prodlog? Send us a support request and we will get back to you by email, or reach us directly at support@prodlog.app.',
  },
  '/sample': {
    title: 'Sample PM Impact Logs | Examples | Prodlog',
    description:
      'Browse sample PM impact log examples. See how verified work feeds your brag document and PM portfolio for reviews and interviews.',
  },
};

const FALLBACK = ROUTE_META['/']!;

export function getRouteMeta(pathname: string): RouteMeta {
  return ROUTE_META[pathname] ?? FALLBACK;
}
