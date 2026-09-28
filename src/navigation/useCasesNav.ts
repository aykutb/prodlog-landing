/** The "Use cases" menu: one page per moment the log pays off. */
export const USE_CASES_NAV = [
  { label: '1:1 prep', href: '/1-1-prep', description: 'Walk into every 1:1 with everything since the last one.' },
  { label: 'Review season', href: '/self-review', description: 'Start your self-review from a draft, not a blank page.' },
  { label: 'Job search', href: '/product-manager-portfolio', description: 'Resume bullets, STAR stories and a portfolio from your log.' },
] as const;

/** Pages that light up "Use cases". The portfolio guide stays under Resources. */
export const isUseCasePath = (pathname: string) => pathname === '/1-1-prep' || pathname === '/self-review';
