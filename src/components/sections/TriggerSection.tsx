import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppStoreBadge, SlackPromptMock } from '@/src/components/ui';
import { APP_STORE_URL } from '@/src/lib/appStore';

// Three surfaces, one habit. A bento of the same white cards the objections
// block uses: the phone panel is the primary, so it goes navy (the final band's
// palette), spans both rows, and shows the app itself. Slack and web sit
// beside it with their own visuals. Every visual bleeds off the bottom of its
// card, which is what makes the grid read as product rather than copy.
const CARD_CLASS =
  'bg-white border border-divider rounded-xl p-6 flex flex-col overflow-hidden md:col-span-3';
const PRIMARY_CARD_CLASS =
  'bg-deep-ink-blue rounded-xl p-6 flex flex-col overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)] md:col-span-2 md:row-span-2';
const PANEL_HEADING_CLASS = 'serif-headline text-lg md:text-xl leading-snug mb-3';
const PANEL_BODY_CLASS = 'text-sm leading-relaxed';

export const TriggerSection = () => (
  <section className="py-24 px-8 md:px-12 border-t border-divider">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="serif-headline text-2xl md:text-[36px] mb-6 text-primary leading-tight">
          The habit fails for one reason: nothing reminds you.
        </h2>
        <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
          Friday at 4pm, Prodlog asks what shipped. Answer wherever you happen to be.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-4 md:gap-6">
        {/* Panel 1: the phone. The screenshot is pinned to the top of the
            remaining card height and clipped at the card's bottom edge. */}
        <div className={PRIMARY_CARD_CLASS}>
          <h3 className={`${PANEL_HEADING_CLASS} text-soft-canvas`}>On your phone.</h3>
          <p className={`${PANEL_BODY_CLASS} text-soft-canvas/70`}>
            Hold the quick action, say what happened, put the phone away. A rambling thirty
            second voice note comes back as a dated entry with the initiative, your role, and
            the outcome. No punctuation required, no format to remember. Your speech is
            transcribed on the device, never uploaded.
          </p>
          <div className="relative flex-1 min-h-[300px] mt-6 -mb-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] rounded-t-[20px] overflow-hidden shadow-2xl">
              <Image
                src="/images/app/ios-log-by-voice.png"
                width={442}
                height={900}
                sizes="240px"
                alt="The Prodlog iOS app listening while you talk, with the transcript appearing as you speak"
                className="block w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Panel 2: Slack. The existing Friday prompt mock, unchanged. */}
        <div className={CARD_CLASS}>
          <h3 className={`${PANEL_HEADING_CLASS} text-primary`}>In Slack.</h3>
          <p className={`${PANEL_BODY_CLASS} text-secondary`}>
            Reply in the Friday thread, or type{' '}
            <code className="text-[0.85em] px-1 py-0.5 rounded bg-charcoal border border-divider">
              /log
            </code>{' '}
            the moment something happens.
          </p>
          <div className="mt-5 -mb-8 -mx-2">
            <SlackPromptMock />
          </div>
        </div>

        {/* Panel 3: the web dashboard, cropped to its top and bleeding off
            the bottom right corner of the card. */}
        <div className={CARD_CLASS}>
          <h3 className={`${PANEL_HEADING_CLASS} text-primary`}>On the web.</h3>
          <p className={`${PANEL_BODY_CLASS} text-secondary`}>
            Type it out when talking is not an option. Same structure, same result.
          </p>
          <div className="mt-5 -mb-6 -mr-6 ml-2 max-h-40 md:max-h-48 rounded-tl-lg overflow-hidden border-t border-l border-divider shadow-[0_2px_12px_-4px_rgba(31,42,68,0.12)]">
            <Image
              src="/images/screenshots/01-hero-dashboard-entry-list.png"
              width={2530}
              height={1800}
              sizes="(max-width: 768px) 100vw, 560px"
              alt="The Prodlog web dashboard showing a dated list of entries"
              className="block w-full h-auto"
            />
          </div>
        </div>
      </div>

      <p className="text-secondary text-center max-w-2xl mx-auto leading-relaxed mt-10">
        Skip three weeks and we don&rsquo;t guilt you. We just ask again on Friday.
      </p>

      {/* Action row. Primary is the App Store badge with a QR code beside it
          (desktop only, since a phone cannot scan itself); secondary is the
          Slack text link with the Slack mark. */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-4">
          <AppStoreBadge />
          <a
            href={APP_STORE_URL}
            className="hidden md:inline-block shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
          >
            <img
              src="/badges/app-store-qr.png"
              alt="QR code that opens Prodlog on the App Store"
              width={120}
              height={120}
              className="h-[120px] w-[120px] rounded border border-divider"
            />
          </a>
        </div>
        <Link
          href="/integrations/slack"
          className="inline-flex items-center gap-2 text-deep-ink-blue text-sm underline underline-offset-2 hover:opacity-80 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink-blue/50 focus-visible:ring-offset-2"
        >
          <img src="/logmethods/slack-icon.svg" alt="" className="h-4 w-4" />
          Install the Slack app
        </Link>
      </div>
    </div>
  </section>
);
