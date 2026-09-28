import React from 'react';
import { ScrollReveal } from '@/src/components/ui';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { SLACK_INSTALL_URL } from '@/src/lib/channels';

// The modal's fields match prodlog-api src/lib/slack/blocks.ts (`log_modal`):
// Title (required, prefilled by `/log <text>`), Description, Date.
const STEPS = [
  {
    title: 'Type /log in any channel or DM',
    body: 'Just shipped something? Type /log right where the conversation happened. Add a few words after it and they become the title. No new tab, no separate app.',
    shot: { name: 'slack-log-command.png', width: 1600, height: 900, alt: 'Typing /log in the Slack message box, with the Prodlog /log command and the Log to Prodlog shortcut suggested' },
  },
  {
    title: 'Or log any message from its menu',
    body: 'Select any message and log it from the message menu. The launch announcement, the thread where the decision landed, a teammate’s thanks: the entry starts from what’s already written.',
    shot: { name: 'slack-message-shortcut.png', width: 1600, height: 900, alt: 'A Slack message’s menu open, with the Prodlog shortcut to log it' },
  },
  {
    title: 'Fill the short form',
    body: 'A form opens in Slack with a title, a description and the date, already set to today. Thirty seconds while the details are fresh.',
    shot: { name: 'slack-log-modal.png', width: 1600, height: 1000, alt: 'The Prodlog form in Slack with the title filled in, a description, and the date' },
  },
  {
    title: 'The entry lands in your log',
    body: 'It appears in your private log alongside everything else you’ve logged, ready for your next 1:1, your review and your next job.',
    shot: { name: 'log-home.png', width: 2880, height: 2000, alt: 'Priya’s log with the entry she just logged from Slack at the top', crop: { region: { x: 0.14, y: 0.44, w: 0.6, h: 0.4 } } },
  },
];

const BUTTON_PRIMARY = 'bg-ink text-on-ink px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-all text-center no-underline';

export const IntegrationsSlackPage = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pb-24">
    <header className="pt-32 pb-16 fade-in text-center">
      <img src="/logmethods/slack-icon.svg" alt="Slack logo" className="mx-auto mb-6 h-12 w-12" />
      <h1 className="serif-headline text-3xl md:text-[48px] mb-6 text-ink leading-tight">Log your work without leaving Slack</h1>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        Log from any channel or DM, and get your 1:1 prep the day before, right in Slack.
      </p>
      <div className="my-8 flex justify-center">
        <a href={SLACK_INSTALL_URL} className={BUTTON_PRIMARY}>
          Add to Slack
        </a>
      </div>
    </header>

    <div className="mb-20">
      <h2 className="serif-headline text-2xl md:text-[36px] mb-12 text-ink text-center leading-tight">How it works</h2>
      <div className="space-y-8">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.title}>
            <div className="bg-surface border border-border rounded-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-meta font-medium tabular-nums text-muted-foreground mb-2">Step {i + 1}</p>
                  <h3 className="text-ink font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
                </div>
                <div className="min-w-0">
                  <ProductShot chrome="none" sizes="(min-width: 768px) 440px, 100vw" {...step.shot} />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>

    <ScrollReveal>
      <section className="mb-20 grid grid-cols-1 gap-8 rounded-xl border border-border bg-surface p-6 sm:p-8 md:grid-cols-2 md:items-center md:p-10">
        <div>
          <h2 className="serif-headline text-2xl md:text-[32px] mb-4 text-ink leading-tight">Slack asks, so you don&rsquo;t have to remember</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            The day before your 1:1, Prodlog sends you a message: what else happened since the last one? Reply in the thread and it&rsquo;s logged,
            then open your 1:1 prep from the same message.
          </p>
          <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">Turn on the Friday prompt and it also asks at 4pm what shipped this week.</p>
        </div>
        <div className="min-w-0">
          <ProductShot
            name="slack-day-before.png"
            alt="The Prodlog message in Slack the day before a 1:1 with Maya: 3 entries logged since the last one, anything else from this week, with Log something and Prep my 1:1 buttons"
            width={1600}
            height={1000}
            chrome="none"
            sizes="(min-width: 768px) 440px, 100vw"
          />
        </div>
      </section>
    </ScrollReveal>

    <ScrollReveal>
      <div className="mb-20 bg-surface border border-border rounded-xl p-8 md:p-10 text-center">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-ink leading-tight">The work already happened in Slack</h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          The launch thread, the metrics screenshot, the congrats emoji: it is all right there. Logging it takes 30 seconds and zero context
          switching, so the entry gets written instead of forgotten.
        </p>
      </div>
    </ScrollReveal>

    <ScrollReveal>
      <div className="pt-12 border-t border-border text-center">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-4 text-ink leading-tight">Never lose a week to the scrollback again</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Start free, connect Slack, and log your first entry today.</p>
        <div className="my-8 flex flex-col md:flex-row justify-center items-center gap-3">
          <a href={SLACK_INSTALL_URL} className={`w-full md:w-auto ${BUTTON_PRIMARY}`}>
            Add to Slack
          </a>
          <a
            href="https://dashboard.prodlog.app/auth"
            className="w-full md:w-auto border border-border text-ink px-6 py-3 rounded-lg font-medium text-sm hover:bg-muted transition-all text-center no-underline"
          >
            Start free
          </a>
        </div>
      </div>
    </ScrollReveal>
  </div>
);
