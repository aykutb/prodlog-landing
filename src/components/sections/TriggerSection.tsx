import React from 'react';
import Link from 'next/link';
import { AppStoreBadge, EmailLogMock, SlackPromptMock } from '@/src/components/ui';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { APP_STORE_URL } from '@/src/lib/appStore';
import { EMAIL_LOG_ADDRESS } from '@/src/lib/channels';

// Two groups. What reminds you: Slack (with the reminder email for anyone not
// on Slack) and the phone, whose 1:1 card is the first thing you see. Then
// the ways to log, which remind no one but make logging take seconds: web,
// email, voice and, coming soon, an AI assistant over MCP. The download links
// close the section in a band of their own.
const CARD_CLASS = 'bg-surface border border-border rounded-xl p-6 flex flex-col overflow-hidden';
const PANEL_HEADING_CLASS = 'serif-headline text-lg md:text-xl leading-snug mb-3';
const PANEL_BODY_CLASS = 'text-sm leading-relaxed';
const GROUP_LABEL_CLASS = 'mb-4 text-sm font-medium text-muted-foreground';

export const TriggerSection = () => (
  <section className="pt-24 px-4 sm:px-8 md:px-12 border-t border-border">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-ink leading-tight">The habit fails for one reason: nothing reminds you.</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Prodlog asks the day before your 1:1, when you&rsquo;re already thinking about what to say. And when something happens, logging it takes
          seconds from wherever you are.
        </p>
      </div>

      <h3 className={GROUP_LABEL_CLASS}>It asks you</h3>
      <div className="grid gap-4 md:grid-cols-6 md:gap-6">
        {/* On your phone: ink, the app's Entries page with the 1:1 card, running off the bottom of the panel. */}
        <div className="bg-ink rounded-xl p-6 flex flex-col overflow-hidden md:col-span-2">
          <h4 className={`${PANEL_HEADING_CLASS} text-on-ink`}>On your phone.</h4>
          <p className={`${PANEL_BODY_CLASS} text-on-ink-muted`}>
            Open the app and your next 1:1 is the first thing you see, with what you&rsquo;ve logged since the last one.
          </p>
          <div className="relative mt-6 -mb-6 mx-auto w-full max-w-[280px] min-h-[340px] flex-1 overflow-hidden">
            <ProductShot
              name="ios-log.png"
              alt="The Prodlog iPhone app: Priya's next 1:1 at the top of her entries"
              width={1179}
              height={2556}
              chrome="none"
              crop={{ fill: true, position: '50% 0%' }}
              sizes="320px"
              className="absolute inset-0 rounded-b-none border-on-ink/20"
            />
          </div>
        </div>

        <div className={`${CARD_CLASS} md:col-span-4`}>
          <h4 className={`${PANEL_HEADING_CLASS} text-ink`}>In Slack.</h4>
          <p className={`${PANEL_BODY_CLASS} text-muted-foreground`}>
            The day before your 1:1, a message asks what else happened since the last one. Reply in the thread and it&rsquo;s logged. Turn on the
            Friday prompt and it also asks at 4pm what shipped.
          </p>
          <p className={`${PANEL_BODY_CLASS} mt-2 text-muted-foreground`}>Not on Slack? The reminder comes by email, if you haven&rsquo;t logged that week.</p>
          <div className="mt-5 -mb-8 -mx-2">
            <SlackPromptMock />
          </div>
        </div>
      </div>

      <h3 className={`${GROUP_LABEL_CLASS} mt-12`}>And logging takes seconds, wherever you are</h3>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className={CARD_CLASS}>
          <h4 className={`${PANEL_HEADING_CLASS} text-ink`}>On the web.</h4>
          <p className={`${PANEL_BODY_CLASS} text-muted-foreground`}>
            Type it on the first line of your log and press <kbd className="font-sans">⌘</kbd>&nbsp;Enter.
          </p>
          <div className="mt-5 -mb-6 -mr-6">
            <ProductShot
              name="log-home.png"
              alt="Priya's log on the web: today's line, then her entries with their outcomes"
              width={2880}
              height={2000}
              chrome="none"
              crop={{ region: { x: 0.14, y: 0.44, w: 0.44, h: 0.3 } }}
              sizes="(min-width: 768px) 480px, 100vw"
              className="rounded-r-none rounded-b-none"
            />
          </div>
        </div>

        <div className={CARD_CLASS}>
          <h4 className={`${PANEL_HEADING_CLASS} text-ink`}>By email.</h4>
          <p className={`${PANEL_BODY_CLASS} text-muted-foreground`}>
            Forward the thread to <span className="font-medium text-ink whitespace-nowrap">{EMAIL_LOG_ADDRESS}</span>. It comes back as an entry.
          </p>
          <div className="mt-5 -mb-2">
            <EmailLogMock />
          </div>
        </div>

        <div className={CARD_CLASS}>
          <h4 className={`${PANEL_HEADING_CLASS} text-ink`}>By voice.</h4>
          <p className={`${PANEL_BODY_CLASS} text-muted-foreground`}>
            Hold the app&rsquo;s quick action, say what happened, put the phone away. A rambling thirty second voice note comes back as a dated entry
            with the product and any numbers you said, ready to check before it saves. Your speech is transcribed on the device, never uploaded.
          </p>
        </div>

        <div className={CARD_CLASS}>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h4 className={`${PANEL_HEADING_CLASS} mb-0 text-ink`}>In your AI assistant.</h4>
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Coming soon</span>
          </div>
          <p className={`${PANEL_BODY_CLASS} text-muted-foreground`}>
            Tell Claude, or any assistant that supports MCP, what you worked on. It logs the entry in Prodlog for you, in the same place as everything
            else.
          </p>
        </div>
      </div>
    </div>

    {/* The downloads, in a band of their own across the page: the App Store
        badge with its QR code (desktop only, a phone cannot scan itself), then
        the Slack app. */}
    <div className="mt-20 -mx-4 sm:-mx-8 md:-mx-12 bg-ink px-4 py-10 sm:px-8 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="serif-headline text-xl text-on-ink">Get Prodlog where you work.</p>
          <p className="mt-1 text-sm text-on-ink-muted">The iPhone app, and the Slack app for your workspace.</p>
        </div>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <AppStoreBadge />
            <a href={APP_STORE_URL} className="hidden md:inline-block shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-on-ink/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
              <img src="/badges/app-store-qr.png" alt="QR code that opens Prodlog on the App Store" width={96} height={96} className="h-24 w-24 rounded bg-surface p-1" />
            </a>
          </div>
          <Link
            href="/integrations/slack"
            className="inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-on-ink/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <img src="/logmethods/slack-icon.svg" alt="" className="h-4 w-4" />
            Install the Slack app
          </Link>
        </div>
      </div>
    </div>
  </section>
);
