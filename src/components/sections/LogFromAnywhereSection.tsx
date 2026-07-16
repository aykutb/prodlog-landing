import React from 'react';
import Link from 'next/link';
import { NotifySignup } from '@/src/components/ui';

const INPUT_METHODS = [
  {
    iconSrc: '/logmethods/web-page-icon.svg',
    name: 'Web App',
    description: 'The full dashboard for logging wins, summaries, and your portfolio.',
    href: null,
    cta: null,
  },
  {
    iconSrc: '/logmethods/slack-icon.svg',
    name: 'Slack',
    description: 'Log a win with a slash command, without leaving chat.',
    href: '/integrations/slack',
    cta: 'See how it works →',
  },
];

const cardClass =
  'block h-full p-6 md:p-8 border border-divider rounded-xl bg-white text-center hover:border-deep-ink-blue/30 hover:shadow-[0_4px_20px_-5px_rgba(31,42,68,0.1)] transition-all group no-underline';

const CardBody = ({ method }: { method: (typeof INPUT_METHODS)[number] }) => (
  <>
    <div className="mb-3 flex justify-center group-hover:scale-110 transition-transform">
      <img
        src={method.iconSrc}
        alt=""
        className="h-10 w-10 md:h-12 md:w-12 object-contain"
      />
    </div>
    <h4 className="text-primary font-medium text-sm md:text-base mb-1">{method.name}</h4>
    <p className="text-muted text-xs md:text-sm">{method.description}</p>
    {method.cta && (
      <span className="mt-3 inline-block text-deep-ink-blue text-xs font-medium">
        {method.cta}
      </span>
    )}
  </>
);

export const LogFromAnywhereSection = () => (
  <section className="py-24 px-8 md:px-12 bg-charcoal border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-primary text-center leading-tight">
        Log from anywhere
      </h2>
      <p className="text-secondary text-center mb-12 max-w-xl mx-auto">
        No context switching. Capture impact where you already work.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
        {INPUT_METHODS.map((method) =>
          method.href ? (
            <Link key={method.name} href={method.href} className={cardClass}>
              <CardBody method={method} />
            </Link>
          ) : (
            <div key={method.name} className={cardClass}>
              <CardBody method={method} />
            </div>
          ),
        )}
      </div>
      <NotifySignup />
    </div>
  </section>
);
