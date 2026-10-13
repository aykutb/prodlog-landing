import React from 'react';
import Link from 'next/link';
import { MCP_SHOTS_DIR, ProductShot } from '@/src/components/kit/ProductShot';
import { McpChatShot } from '@/src/components/kit/McpChatShot';
import { SIGNUP_URL } from '@/src/lib/preview';
import { MCP_GUIDE_PATH } from '@/src/lib/channels';

const BUTTON =
  'inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ring-offset-background';
const IDEA_LABEL_CLASS = 'text-meta font-medium text-sage-strong';
const IDEA_HEADING_CLASS = 'serif-headline mt-1 text-lg md:text-xl leading-snug text-ink';
const IDEA_BODY_CLASS = 'mt-2 text-sm leading-relaxed text-muted-foreground';

// The MCP server, sold in three ideas in order: log from the chat you're in,
// log from the chats you've already had, then (the headline benefit) let a
// scheduled task log every Friday. A muted band between the plain habit
// section and the plain job-change section. The chat shot sits beside the
// first two ideas (cropped to "log that" and the confirmation), the
// scheduled task beside the third; below md each idea comes before its shot.
export const McpSection = () => (
  <section id="mcp" className="py-24 px-4 sm:px-8 md:px-12 bg-muted border-t border-border">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-md bg-sage-soft px-2 py-1 text-meta font-medium text-sage-strong">Now live: Prodlog MCP</span>
        <h2 className="serif-headline mt-4 text-2xl md:text-[36px] mb-6 text-ink leading-tight text-balance">Your AI chats already know what you shipped.</h2>
        <p className="text-muted-foreground leading-relaxed">
          Connect Prodlog to Claude, ChatGPT or any MCP client. Ask it to log what you did this week, or set it to do it every Friday.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:items-center md:gap-12">
        <ol className="min-w-0 space-y-8 md:col-span-2">
          <li>
            <p className={IDEA_LABEL_CLASS}>In the chat you&rsquo;re already in</p>
            <h3 className={IDEA_HEADING_CLASS}>Say &ldquo;log that&rdquo;.</h3>
            <p className={IDEA_BODY_CLASS}>
              You just talked a launch through with Claude. Two words at the end and it&rsquo;s a dated entry in Prodlog, with the numbers you mentioned
              and a link to open it.
            </p>
          </li>
          <li>
            <p className={IDEA_LABEL_CLASS}>From the chats you&rsquo;ve already had</p>
            <h3 className={IDEA_HEADING_CLASS}>Start with the conversations behind you.</h3>
            <p className={IDEA_BODY_CLASS}>
              Ask Claude to look back over this week&rsquo;s chats, or this quarter&rsquo;s, and log what you shipped, decided and measured. Months of
              notes you never meant to keep become your first entries.
            </p>
          </li>
        </ol>
        <div className="min-w-0 md:col-span-3">
          <McpChatShot desktop="log-that" sizes="(min-width: 1024px) 600px, 60vw" />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-5 md:items-center md:gap-12">
        <div className="min-w-0 md:col-span-2">
          <p className={IDEA_LABEL_CLASS}>Every Friday, without you</p>
          <h3 className="serif-headline mt-1 text-xl md:text-[28px] leading-snug text-ink">Put it on a schedule and the log keeps itself.</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Set up a scheduled task once. Every Friday it reads the week&rsquo;s conversations and logs entries automatically, so the week is in your
            log before you&rsquo;ve thought about it.
          </p>
        </div>
        <div className="min-w-0 md:order-first md:col-span-3">
          <ProductShot
            name="mcp-routine.png"
            dir={MCP_SHOTS_DIR}
            alt="Claude's Scheduled tasks page with a task called Weekly Prodlog work log that runs every Friday. Its prompt begins: Log my work from the past 7 days into Prodlog, then look through my Claude conversations from the past 7 days."
            width={2168}
            height={662}
            chrome="none"
            crop={{ region: { x: 0.03, y: 0.02, w: 0.48, h: 0.9 } }}
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Entries are saved in your words. Numbers are logged only if you said them, never estimated. And everything shows up in Prodlog, where you can
          see and edit it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={MCP_GUIDE_PATH} className={`${BUTTON} bg-ink text-on-ink hover:bg-ink/90 no-underline`}>
            Connect in 2 minutes
          </Link>
          <a href={SIGNUP_URL} className={`${BUTTON} border border-border bg-surface text-ink hover:border-ink/30 no-underline`}>
            Start free
          </a>
        </div>
      </div>
    </div>
  </section>
);
