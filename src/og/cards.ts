import type { OgVisual } from './OgCard';

/**
 * The OG cards, by file name (served at /og/<name>). Every page not listed in
 * OG_BY_PATH gets the default. Copy follows the one-breath explanation; no dashes.
 * A card with a `visual` shows that part of a real screenshot beside the headline.
 */
export interface OgCardDef {
  headline: string;
  sub: string;
  alt: string;
  visual?: OgVisual;
}

export const OG_CARDS = {
  'default.png': {
    headline: 'The work log for your 1:1s and reviews.',
    sub: 'Prodlog turns the notes you already keep into a work log you own.',
    alt: 'Prodlog: the work log for your 1:1s and reviews',
  },
  'try.png': {
    headline: 'Paste your notes, see what comes out',
    sub: 'A messy note in, dated entries out. No signup, nothing saved.',
    alt: 'Try Prodlog: paste your notes and see what comes out',
  },
  '1-1-prep.png': {
    headline: 'Walk into your 1:1 with everything since the last one.',
    sub: '1:1 prep for product managers. Free, never metered.',
    alt: 'Prodlog 1:1 prep: walk into your 1:1 with everything since the last one',
  },
  'self-review.png': {
    headline: 'Start your review from a draft, not a blank page.',
    sub: 'A draft for each review question, built from your own entries.',
    alt: 'Prodlog: start your self-review from a draft, not a blank page',
  },
  'brag-document.png': {
    headline: 'The brag document for product managers.',
    sub: 'What goes in one, PM examples, and a free template.',
    alt: 'Brag documents for product managers, with examples and a free template',
  },
  'integrations-mcp.png': {
    headline: 'Log from your AI chats.',
    sub: 'Connect Prodlog to Claude, ChatGPT or any MCP client.',
    alt: 'Prodlog MCP: log from your AI chats. Claude logging an entry in Prodlog after the user says log that',
    // "log that", the Prodlog tool calls and Claude's confirmation, as on the homepage.
    visual: { file: 'images/mcp/mcp-chat-log.png', width: 1684, height: 1874, region: { x: 0.065, y: 0.41, w: 0.905, h: 0.53 } },
  },
} satisfies Record<string, OgCardDef>;

export type OgCardName = keyof typeof OG_CARDS;

export const OG_BY_PATH: Record<string, OgCardName> = {
  '/try': 'try.png',
  '/1-1-prep': '1-1-prep.png',
  '/self-review': 'self-review.png',
  '/brag-document': 'brag-document.png',
  '/integrations/mcp': 'integrations-mcp.png',
};

export const ogCardFor = (pathname: string): OgCardName => OG_BY_PATH[pathname] ?? 'default.png';
