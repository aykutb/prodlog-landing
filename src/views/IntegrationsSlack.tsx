import React from 'react';
import { ScrollReveal } from '@/src/components/ui';
import { ImagePlaceholder } from '@/src/components/content/mdx-visuals';

const SLACK_INSTALL_URL = 'https://api.prodlog.app/api/slack/install';

const STEPS = [
  {
    title: 'Run the slash command in any channel',
    body: 'Just shipped something? Type /log right where the conversation happened. No new tab, no separate app.',
    placeholder: {
      label: 'Slack message box with the /log slash command typed in a channel',
      caption: 'Trigger a new log from any Slack channel or DM.',
      alt: 'Typing the /log slash command into the Slack message box in a team channel',
    },
  },
  {
    title: 'Fill the modal',
    body: 'A short form opens in Slack: what shipped, your role, who you worked with, and the outcome. Thirty seconds while the details are fresh.',
    placeholder: {
      label: 'Prodlog modal open in Slack with fields for what shipped, role, collaborators, and outcome',
      caption: 'Capture the win in a structured form without leaving Slack.',
      alt: 'Prodlog modal in Slack with fields for what shipped, your role, collaborators, and outcome',
    },
  },
  {
    title: 'Entry lands in your Prodlog timeline',
    body: 'The log appears in your private timeline alongside everything else you have shipped — ready for review season, promo packets, and interviews.',
    placeholder: {
      label: 'Prodlog timeline showing the new entry that was just logged from Slack',
      caption: 'Every Slack log lands in your timeline, ready for review season.',
      alt: 'Prodlog timeline with a newly logged entry created from Slack at the top',
    },
  },
];

export const IntegrationsSlackPage = () => (
  <div className="max-w-5xl mx-auto px-8 md:px-12 pb-24">
    {/* Hero */}
    <header className="pt-32 pb-16 fade-in text-center">
      <img
        src="/logmethods/slack-icon.svg"
        alt="Slack logo"
        className="mx-auto mb-6 h-12 w-12"
      />
      <h1 className="serif-headline text-3xl md:text-[48px] mb-6 text-primary leading-tight">
        Log your wins without leaving Slack
      </h1>
      <p className="text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        One slash command captures what you shipped — straight into your Prodlog
        timeline, ready for review season.
      </p>
      <div className="my-8 flex justify-center">
        <a
          href={SLACK_INSTALL_URL}
          className="bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all text-center no-underline"
        >
          Add to Slack
        </a>
      </div>
    </header>

    {/* How it works */}
    <div className="mb-20">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-primary text-center leading-tight">
        How it works
      </h2>
      <div className="space-y-8">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.title}>
            <div className="bg-white border border-divider rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-deep-ink-blue text-3xl serif-headline mb-4 opacity-30">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-primary font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{step.body}</p>
                </div>
                <div className="[&_figure]:my-0">
                  <ImagePlaceholder
                    label={step.placeholder.label}
                    caption={step.placeholder.caption}
                    alt={step.placeholder.alt}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>

    {/* Why it matters */}
    <ScrollReveal>
      <div className="mb-20 bg-white border border-divider rounded-xl p-8 md:p-10 text-center">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-primary leading-tight">
          The work already happened in Slack
        </h2>
        <p className="text-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          The launch thread, the metrics screenshot, the congrats emoji — it is all
          right there. Capturing it takes 30 seconds and zero context switching, so
          the win gets logged instead of forgotten.
        </p>
      </div>
    </ScrollReveal>

    {/* Closing CTA */}
    <ScrollReveal>
      <div className="pt-12 border-t border-divider text-center">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-primary leading-tight">
          Never lose a win to the scrollback again
        </h2>
        <p className="text-secondary max-w-xl mx-auto">
          Start free, connect Slack, and log your first win today.
        </p>
        <div className="my-8 flex flex-col md:flex-row justify-center items-center gap-3">
          <a
            href={SLACK_INSTALL_URL}
            className="w-full md:w-auto bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all text-center no-underline"
          >
            Add to Slack
          </a>
          <a
            href="https://dashboard.prodlog.app/auth"
            className="w-full md:w-auto border border-divider text-primary px-6 py-3 rounded font-medium text-sm hover:bg-charcoal transition-all text-center no-underline"
          >
            Start logging free
          </a>
        </div>
      </div>
    </ScrollReveal>
  </div>
);
