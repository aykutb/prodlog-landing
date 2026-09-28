import React from 'react';
import Link from 'next/link';
import { AppStoreBadge, EmailLogMock, SlackPromptMock } from '@/src/components/ui';
import { ProductShot } from '@/src/components/kit/ProductShot';
import { APP_STORE_URL } from '@/src/lib/appStore';
import { EMAIL_LOG_ADDRESS } from '@/src/lib/channels';

// Four surfaces, one habit, and one on the way. The phone panel is the
// primary, so it stays ink and spans all three rows; Slack takes the wide top
// slot; web and email share the second row; the AI assistant card, marked
// coming soon, takes the third. Every visual bleeds off the bottom of its card.
const CARD_CLASS = 'bg-surface border border-border rounded-xl p-6 flex flex-col overflow-hidden';
const PANEL_HEADING_CLASS = 'serif-headline text-lg md:text-xl leading-snug mb-3';
const PANEL_BODY_CLASS = 'text-sm leading-relaxed';

export const TriggerSection = () => (
  <section className="py-24 px-4 sm:px-8 md:px-12 border-t border-border">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-ink leading-tight">The habit fails for one reason: nothing reminds you.</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Prodlog asks the day before your 1:1, when you&rsquo;re already thinking about what to say. Answer wherever you are.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-6 md:gap-6">
        {/* On your phone: ink, three rows tall, the app's Entries page with the 1:1 card. */}
        <div className="bg-ink rounded-xl p-6 flex flex-col overflow-hidden md:col-span-2 md:row-span-3">
          <h3 className={`${PANEL_HEADING_CLASS} text-on-ink`}>On your phone.</h3>
          <p className={`${PANEL_BODY_CLASS} text-on-ink-muted`}>
            Hold the quick action, say what happened, put the phone away. A rambling thirty second voice note comes back as a dated entry with the
            product and any numbers you said, ready to check before it saves. No punctuation required, no format to remember. Your speech is transcribed on the device, never
            uploaded.
          </p>
          <p className={`${PANEL_BODY_CLASS} mt-3 text-on-ink`}>Your next 1:1 sits right above your entries.</p>
          {/* The phone fills the rest of the panel and runs off its bottom edge, however tall the grid makes it. */}
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
          <h3 className={`${PANEL_HEADING_CLASS} text-ink`}>In Slack.</h3>
          <p className={`${PANEL_BODY_CLASS} text-muted-foreground`}>
            Reply to the day-before message, type{' '}
            <code className="text-[0.85em] px-1 py-0.5 rounded bg-muted border border-border">/log</code> the moment something happens, or log any
            message from its menu. Turn on the Friday prompt and it also asks at 4pm what shipped.
          </p>
          <div className="mt-5 -mb-8 -mx-2">
            <SlackPromptMock />
          </div>
        </div>

        <div className={`${CARD_CLASS} md:col-span-2`}>
          <h3 className={`${PANEL_HEADING_CLASS} text-ink`}>On the web.</h3>
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
              crop={{ region: { x: 0.14, y: 0.44, w: 0.44, h: 0.4 } }}
              sizes="(min-width: 768px) 320px, 100vw"
              className="rounded-r-none rounded-b-none"
            />
          </div>
        </div>

        <div className={`${CARD_CLASS} md:col-span-2`}>
          <h3 className={`${PANEL_HEADING_CLASS} text-ink`}>By email.</h3>
          <p className={`${PANEL_BODY_CLASS} text-muted-foreground`}>
            Forward the thread to <span className="block whitespace-nowrap font-medium text-ink">{EMAIL_LOG_ADDRESS}</span>
            It comes back as an entry.
          </p>
          <div className="mt-5 -mb-2">
            <EmailLogMock />
          </div>
        </div>

        <div className={`${CARD_CLASS} md:col-span-4`}>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h3 className={`${PANEL_HEADING_CLASS} mb-0 text-ink`}>In your AI assistant.</h3>
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Coming soon</span>
          </div>
          <p className={`${PANEL_BODY_CLASS} text-muted-foreground`}>
            Tell Claude, or any assistant that supports MCP, what you worked on. It logs the entry in Prodlog for you, in the same place as everything
            else.
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed mt-10">
        Skip three weeks and we don&rsquo;t guilt you. We just ask again before your next 1:1.
      </p>

      {/* App Store badge with a QR code beside it (desktop only, since a phone
          cannot scan itself), then the Slack link. */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-4">
          <AppStoreBadge />
          <a href={APP_STORE_URL} className="hidden md:inline-block shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2">
            <img src="/badges/app-store-qr.png" alt="QR code that opens Prodlog on the App Store" width={120} height={120} className="h-[120px] w-[120px] rounded border border-border" />
          </a>
        </div>
        <Link
          href="/integrations/slack"
          className="inline-flex items-center gap-2 text-ink text-sm underline underline-offset-2 hover:opacity-80 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 focus-visible:ring-offset-2"
        >
          <img src="/logmethods/slack-icon.svg" alt="" className="h-4 w-4" />
          Install the Slack app
        </Link>
      </div>
    </div>
  </section>
);
