import React from 'react';
import Link from 'next/link';
import { SlackPromptMock } from '@/src/components/ui';

export const TriggerSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-primary leading-tight">
          The habit fails for one reason: nothing reminds you.
        </h2>
        <p className="text-secondary max-w-2xl mx-auto mb-4 leading-relaxed">
          Friday, 4pm, in Slack: &ldquo;What shipped this week?&rdquo; Reply in the thread.
          That&rsquo;s the whole thing. No app to open, no form, no context switch.
        </p>
        <p className="text-secondary max-w-2xl mx-auto mb-4 leading-relaxed">
          Skip three weeks and we don&rsquo;t guilt you. We just ask again on Friday.
        </p>
        <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
          Prodlog has a{' '}
          <Link
            href="/integrations/slack"
            className="text-deep-ink-blue underline underline-offset-2 hover:opacity-80"
          >
            Slack app
          </Link>
          . Install it once and log from where you already are: reply to the Friday prompt, or
          type <code className="text-[0.85em] px-1 py-0.5 rounded bg-charcoal border border-divider">/log</code>{' '}
          any time something happens.
        </p>
      </div>

      {/* One small mock of the Slack prompt. Deliberately quiet: the section is
          about how little there is to do. */}
      <div className="mt-10">
        <SlackPromptMock />
      </div>
    </div>
  </section>
);
