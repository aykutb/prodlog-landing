import React from 'react';
import { CTASection, CopyCodeBlock } from '@/src/components/ui';
import { MCP_SHOTS_DIR, ProductShot } from '@/src/components/kit/ProductShot';
import { McpChatShot } from '@/src/components/kit/McpChatShot';
import { MCP_SERVER_URL } from '@/src/lib/channels';

// The MCP guide. Linked from the dashboard's Settings and banner, so the path
// (MCP_GUIDE_PATH) and the anchors below are stable: #claude, #claude-code,
// #chatgpt, #other-clients, #routines, #prompts, #faq.
//
// Facts come from prodlog-api: src/mcp/server.ts (the eight tools, no delete,
// no summaries), src/routes/mcp.routes.ts (streamable HTTP, OAuth through
// Prodlog sign-in, no plan gating), and the dashboard's Settings, Connections
// (Disconnect revokes the grant). create_entry has no duplicate check.

const CLAUDE_CODE_COMMAND = `claude mcp add --transport http prodlog ${MCP_SERVER_URL}`;

const ROUTINE_PROMPT =
  'Look through my conversations from the past 7 days. Find things I shipped, decided, unblocked or measured at work. Before logging, call list_tags and list_products and reuse them. Log one entry per item in my own words, with the date it happened. Only include numbers I actually stated. Skip anything already in my Prodlog for this week (check with list_entries). At the end, list what you logged.';

const PROMPTS = [
  'Log that.',
  'Log what we decided in this chat.',
  'What did I log about onboarding last quarter?',
  'Tag this week’s entries with Q4.',
  'Add the metric we just discussed to my last entry.',
];

/** What the assistant can do, one row per tool, in the order people need them. */
const TOOLS = [
  { does: 'Log an entry: a title, what happened, the date (a day, a month or just a year), any numbers you stated, tags and the product.', tool: 'create_entry' },
  { does: 'Find entries by words, tags, dates or product.', tool: 'list_entries' },
  { does: 'Open one entry in full, with a link to it in Prodlog.', tool: 'get_entry' },
  { does: 'Edit an entry you already logged.', tool: 'update_entry' },
  { does: 'See your tags, so new entries reuse them.', tool: 'list_tags' },
  { does: 'See the products you’ve worked on.', tool: 'list_products' },
  { does: 'Set up a new product. Prodlog tells it to ask you first.', tool: 'create_product' },
  { does: 'Edit a product’s details.', tool: 'update_product' },
];

const FAQS = [
  {
    q: 'Is my data shared with the AI provider?',
    a: 'Only what your assistant reads through Prodlog’s tools, when you ask it to or when a scheduled task you set up runs. Nothing is sent on its own. What it reads becomes part of that conversation, under your assistant’s own terms.',
  },
  {
    q: 'Can it delete entries?',
    a: 'No. There is no tool that deletes anything. It can edit an entry when you ask, and you can open any entry in Prodlog to check it. To delete an entry, do it in Prodlog.',
  },
  {
    q: 'Will it make up numbers?',
    a: 'Prodlog tells every assistant to save entries in your words and to log a number only if you said it, never an estimate. Each entry links back to Prodlog, so you can check it.',
  },
  {
    q: 'Does it cost anything?',
    a: 'Not on Prodlog’s side. Connecting an assistant and logging through it works on every plan, including Free, and entries are unlimited. Your assistant may need a plan of its own that allows custom connectors.',
  },
  {
    q: 'How do I disconnect?',
    a: 'In Prodlog, open Settings, then Connections, and click Disconnect next to the assistant. It has to be allowed again before it can reach your log. You can also remove Prodlog from your assistant’s connector settings.',
  },
  {
    q: 'Will it duplicate entries?',
    a: 'Prodlog doesn’t merge entries on its own, so asking twice can log twice. The scheduled task prompt on this page tells the assistant to check what’s already logged for the week first. If a duplicate slips through, delete it in Prodlog.',
  },
];

const NAV = [
  { href: '#claude', label: 'Claude' },
  { href: '#claude-code', label: 'Claude Code' },
  { href: '#chatgpt', label: 'ChatGPT' },
  { href: '#other-clients', label: 'Other clients' },
  { href: '#routines', label: 'Every Friday' },
  { href: '#prompts', label: 'Prompts' },
  { href: '#faq', label: 'FAQ' },
];

const SECTION_CLASS = 'scroll-mt-28 mb-20';
const H2_CLASS = 'serif-headline text-2xl md:text-[36px] mb-4 text-ink leading-tight';
const LEAD_CLASS = 'text-muted-foreground leading-relaxed max-w-2xl';
const CARD_CLASS = 'bg-surface border border-border rounded-xl p-6 sm:p-8';
const INLINE_CODE_CLASS = 'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-ink';

interface Step {
  title: string;
  body: React.ReactNode;
  /** A region of a settings screen; drawn under the text, wide enough to read Claude's labels. */
  shot?: { name: string; width: number; height: number; alt: string; crop: { region: { x: number; y: number; w: number; h: number } } };
}

/** Numbered steps in the Slack page's cards, each with its shot under the text. */
const Steps = ({ steps }: { steps: Step[] }) => (
  <ol className="mt-10 space-y-6">
    {steps.map((step, i) => (
      <li key={step.title} className={CARD_CLASS}>
        <p className="text-meta font-medium tabular-nums text-muted-foreground mb-2">Step {i + 1}</p>
        <h3 className="text-ink font-semibold text-xl mb-3">{step.title}</h3>
        <div className="max-w-2xl text-muted-foreground text-sm leading-relaxed space-y-3">{step.body}</div>
        {step.shot && (
          <div className="mt-6 max-w-2xl">
            <ProductShot dir={MCP_SHOTS_DIR} chrome="none" sizes="(min-width: 768px) 672px, 100vw" {...step.shot} />
          </div>
        )}
      </li>
    ))}
  </ol>
);

const CLAUDE_STEPS: Step[] = [
  {
    title: 'Open Connectors in Settings',
    body: <p>In Claude on the web or in the desktop app, open Settings, then Connectors. Click Add, then Add custom connector.</p>,
    shot: { name: 'mcp-setup-claude-1.png', width: 2058, height: 1604, alt: 'Claude Settings on the Connectors page, with the Add menu open on Add custom connector', crop: { region: { x: 0.19, y: 0.05, w: 0.81, h: 0.37 } } },
  },
  {
    title: 'Paste the server URL',
    body: (
      <p>
        Name it Prodlog, paste <span className={INLINE_CODE_CLASS}>{MCP_SERVER_URL}</span> and click Continue.
      </p>
    ),
    shot: { name: 'mcp-setup-claude-2.png', width: 2058, height: 1610, alt: 'Claude’s Add custom connector dialog with the name Prodlog and the URL https://api.prodlog.app/mcp filled in', crop: { region: { x: 0.236, y: 0.216, w: 0.53, h: 0.567 } } },
  },
  {
    title: 'Sign in to Prodlog and allow it',
    body: <p>Claude sends you to Prodlog. Sign in if you need to, check what the assistant will be able to do, and click Allow. You come back to Claude, connected.</p>,
  },
  {
    title: 'Choose when Claude asks first',
    body: (
      <>
        <p>Prodlog is in your connectors with its eight tools. For each one, choose whether Claude can use it right away or asks you first.</p>
        <p>Claude files four of them under &ldquo;Write/delete tools&rdquo;. That&rsquo;s Claude&rsquo;s own heading: none of Prodlog&rsquo;s tools delete anything.</p>
      </>
    ),
    shot: { name: 'mcp-setup-claude-3.png', width: 2052, height: 1606, alt: 'The Prodlog connector in Claude, connected to https://api.prodlog.app/mcp, with tool permissions for four read-only tools (Get entry, List entries, List products, List tags) and the Write/delete group starting with Log an entry', crop: { region: { x: 0.2, y: 0.06, w: 0.78, h: 0.68 } } },
  },
  {
    title: 'Say “log that”',
    body: <p>Tell Claude about something you shipped, decided or measured, then say &ldquo;log that&rdquo;. It replies with a link to the new entry in Prodlog.</p>,
  },
];

const CHATGPT_STEPS: Step[] = [
  // TODO(verify): ChatGPT's menu names for developer mode and connectors, and
  // which plans have them, differ between sources. Kept generic on purpose;
  // confirm in ChatGPT before naming menus here.
  { title: 'Turn on developer mode', body: <p>ChatGPT connects to remote MCP servers as custom connectors in developer mode. Turn it on in ChatGPT&rsquo;s settings. It isn&rsquo;t on every ChatGPT plan.</p> },
  {
    title: 'Create a connector',
    body: (
      <p>
        Name it Prodlog, paste <span className={INLINE_CODE_CLASS}>{MCP_SERVER_URL}</span> and choose OAuth for authentication.
      </p>
    ),
  },
  { title: 'Sign in to Prodlog and allow it', body: <p>ChatGPT sends you to Prodlog. Sign in, check what the assistant will be able to do, and click Allow.</p> },
  { title: 'Turn it on in a chat', body: <p>Turn on the Prodlog connector in the chat where you want to use it, then say &ldquo;log that&rdquo;.</p> },
];

const ROUTINE_STEPS: Step[] = [
  // TODO(verify): from Anthropic's help article on scheduled tasks
  // (support.claude.com/en/articles/13854387); check the labels in the app.
  { title: 'Create a scheduled task', body: <p>In the Claude desktop app, open Scheduled in the sidebar, click New task, then Set up manually.</p> },
  { title: 'Paste the prompt and pick Friday', body: <p>Give it a name, paste the prompt below, and set it to run weekly on Friday afternoon.</p> },
  {
    title: 'Check what it logged',
    body: <p>Each run ends with a list of what it logged, and every entry is in your Prodlog log, marked &ldquo;From an AI assistant&rdquo;. Edit anything it got wrong there.</p>,
  },
];

export const IntegrationsMcpPage = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pb-24">
    <header className="pt-32 pb-14 fade-in text-center">
      <span className="inline-flex items-center gap-2 rounded-md bg-sage-soft px-2 py-1 text-meta font-medium text-sage-strong">Now live: Prodlog MCP</span>
      <h1 className="serif-headline mt-4 text-3xl md:text-[48px] mb-6 text-ink leading-tight text-balance">Connect Prodlog to Claude and other AI assistants</h1>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        Log entries from the chats you&rsquo;re already having. Paste one URL into your assistant, sign in to Prodlog, and say &ldquo;log that&rdquo;.
      </p>
      <nav aria-label="On this page" className="mt-8">
        <ul className="flex flex-wrap justify-center gap-2">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-sm text-ink no-underline hover:border-ink/30 transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>

    <section id="what-it-does" className={SECTION_CLASS}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:items-start md:gap-12">
        <div className="min-w-0 md:col-span-2 md:sticky md:top-28">
          <h2 className={H2_CLASS}>What it does</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Your assistant gets a few tools that read and write your Prodlog log.</p>
            <p>Say &ldquo;log that&rdquo; and it logs an entry in your words, with the numbers you stated and a link to open it.</p>
            <p>Ask what you logged about something, and it looks it up.</p>
          </div>
        </div>
        <div className="min-w-0 md:col-span-3">
          <McpChatShot desktop="conversation" sizes="(min-width: 1024px) 560px, 60vw" />
        </div>
      </div>

      <div className={`${CARD_CLASS} mt-12`}>
        <h3 className="text-ink font-semibold text-xl mb-4">What your assistant can do</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-meta text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-medium">Ask it to</th>
              <th scope="col" className="py-2 font-medium">Tool</th>
            </tr>
          </thead>
          <tbody>
            {TOOLS.map((row) => (
              <tr key={row.tool} className="border-b border-border last:border-b-0 align-top">
                <td className="py-3 pr-4 leading-relaxed text-ink">{row.does}</td>
                <td className="py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{row.tool}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-ink font-semibold text-xl mt-8 mb-3">What it can&rsquo;t do</h3>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Delete entries. You delete in Prodlog.</li>
          <li>Generate summaries, review drafts, resume bullets or STAR stories. Those stay in your dashboard.</li>
          <li>Ask collaborators for a confirmation, or change your portfolio.</li>
        </ul>
      </div>

      <figure className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-5 md:items-center md:gap-12">
        <figcaption className="min-w-0 md:col-span-2">
          <h3 className="text-ink font-semibold text-xl mb-3">It lands in your log</h3>
          <p className="text-muted-foreground leading-relaxed">
            Everything it logs is in your Prodlog log, marked &ldquo;From an AI assistant&rdquo;, with the date, product and tags. Open it there to
            read it, edit it or fill in its outcome.
          </p>
        </figcaption>
        <div className="min-w-0 md:col-span-3 max-w-md md:max-w-none">
          <ProductShot
            name="mcp-entries-result.png"
            dir={MCP_SHOTS_DIR}
            alt="An entry open in Prodlog, Replaced GitHub macOS CI with local checks and a release script, marked From an AI assistant, with its date, product, details, collaborators and tags"
            width={3396}
            height={2000}
            chrome="none"
            crop={{ region: { x: 0.7, y: 0.06, w: 0.3, h: 0.62 } }}
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </figure>
    </section>

    <section id="server-url" className={SECTION_CLASS}>
      <h2 className={H2_CLASS}>The server URL</h2>
      <p className={`${LEAD_CLASS} mb-6`}>Every assistant needs this one URL. There&rsquo;s no key or token to copy: you sign in to Prodlog and click Allow.</p>
      <div className="max-w-xl">
        <CopyCodeBlock code={MCP_SERVER_URL} label="the server URL" />
      </div>
    </section>

    <section id="claude" className={SECTION_CLASS}>
      <h2 className={H2_CLASS}>Claude, on the web and desktop</h2>
      <p className={LEAD_CLASS}>Set up Prodlog once as a custom connector and it works in every chat.</p>
      <Steps steps={CLAUDE_STEPS} />
    </section>

    <section id="claude-code" className={SECTION_CLASS}>
      <h2 className={H2_CLASS}>Claude Code</h2>
      <div className={`${CARD_CLASS} mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground`}>
        <p>In your terminal, run:</p>
        <CopyCodeBlock code={CLAUDE_CODE_COMMAND} label="the Claude Code command" />
        <p>
          Then start Claude Code, run <span className={INLINE_CODE_CLASS}>/mcp</span>, choose prodlog, and sign in to Prodlog in the browser window that opens.
        </p>
        <p>
          Put <span className={INLINE_CODE_CLASS}>--scope user</span> after <span className={INLINE_CODE_CLASS}>add</span> to use Prodlog in every project, not only the current one.
        </p>
      </div>
    </section>

    <section id="chatgpt" className={SECTION_CLASS}>
      <h2 className={H2_CLASS}>ChatGPT</h2>
      <p className={LEAD_CLASS}>ChatGPT&rsquo;s menus change often, so these steps describe what to do rather than where to click.</p>
      <Steps steps={CHATGPT_STEPS} />
    </section>

    <section id="other-clients" className={SECTION_CLASS}>
      <h2 className={H2_CLASS}>Other MCP clients</h2>
      <div className={`${CARD_CLASS} mt-8 text-sm leading-relaxed text-muted-foreground`}>
        <p>Any app that supports remote MCP servers can connect. Look for the option to connect a remote server, sometimes called a custom connector.</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5">
          <li>
            URL: <span className={INLINE_CODE_CLASS}>{MCP_SERVER_URL}</span>
          </li>
          <li>Transport, if it asks: streamable HTTP (not SSE).</li>
          <li>Authentication, if it asks: OAuth. You sign in to Prodlog and click Allow.</li>
        </ul>
      </div>
    </section>

    <section id="routines" className={SECTION_CLASS}>
      <h2 className={H2_CLASS}>Log every Friday, without you</h2>
      <p className={LEAD_CLASS}>
        Give your assistant a scheduled task: once a week it looks back over your conversations and logs entries automatically. Your assistant needs to
        be able to read your past chats, and scheduled tasks use the connectors you&rsquo;ve already set up.
      </p>
      <div className="mt-8 max-w-2xl">
        <ProductShot
          name="mcp-routine.png"
          dir={MCP_SHOTS_DIR}
          alt="Claude’s Scheduled tasks page with a task called Weekly Prodlog work log that runs every Friday. Its prompt begins: Log my work from the past 7 days into Prodlog."
          width={2168}
          height={662}
          chrome="none"
          crop={{ region: { x: 0.03, y: 0.02, w: 0.48, h: 0.9 } }}
          sizes="(min-width: 768px) 672px, 100vw"
        />
      </div>
      <Steps steps={ROUTINE_STEPS} />
      <div className="mt-8">
        <h3 className="text-ink font-semibold text-xl mb-3">The prompt</h3>
        <p className="mb-4 text-sm text-muted-foreground">Works in any assistant that can run a prompt on a schedule with its connectors.</p>
        <CopyCodeBlock code={ROUTINE_PROMPT} label="the scheduled task prompt" variant="prose" />
      </div>
    </section>

    <section id="prompts" className={SECTION_CLASS}>
      <h2 className={H2_CLASS}>Prompts to try</h2>
      <p className={`${LEAD_CLASS} mb-8`}>Say them at the end of a conversation, or start a new chat with one.</p>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {PROMPTS.map((prompt) => (
          <li key={prompt}>
            <CopyCodeBlock code={prompt} label={`the prompt: ${prompt}`} variant="prose" />
          </li>
        ))}
      </ul>
    </section>

    <section id="faq" className={SECTION_CLASS}>
      <h2 className={`${H2_CLASS} mb-8`}>Questions</h2>
      <div className="space-y-6">
        {FAQS.map((faq) => (
          <div key={faq.q} className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-ink font-medium mb-3">{faq.q}</h3>
            <p className="text-muted-foreground text-base leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>

    <div className="pt-12 border-t border-border text-center">
      <h2 className={H2_CLASS}>Start with the chats you&rsquo;ve already had.</h2>
      <p className="text-muted-foreground max-w-xl mx-auto">Start free, connect your assistant, and ask it what you shipped this week.</p>
      <CTASection secondary={{ href: 'https://dashboard.prodlog.app', label: 'Open dashboard' }} />
    </div>
  </div>
);
