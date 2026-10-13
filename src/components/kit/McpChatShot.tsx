import React from 'react';
import { MCP_SHOTS_DIR, ProductShot } from './ProductShot';

const SHOT = { name: 'mcp-chat-log.png', dir: MCP_SHOTS_DIR, width: 1684, height: 1874, chrome: 'none' as const };

const DESKTOP = {
  /** The whole chat: the user's update with its numbers, Claude's reply, "log that", the tool calls and the confirmation. */
  conversation: {
    crop: undefined,
    alt: 'A Claude conversation: the user says they shipped the new onboarding checklist and activation went from 41% to 47%, then says log that. Claude lists the Prodlog products and tags, logs the entry, links to it in Prodlog and asks two follow-up questions about the product and the date.',
  },
  /** From "log that" to the confirmation. */
  'log-that': {
    crop: { region: { x: 0.065, y: 0.41, w: 0.905, h: 0.53 } },
    alt: 'A Claude conversation: the user says log that. Claude lists the Prodlog products and tags, logs an entry titled Shipped the new onboarding checklist with the activation metric 41% to 47%, links to it in Prodlog, and asks which product it belongs to and whether to move the date back.',
  },
};

/**
 * The Claude chat where an entry gets logged. Every line of the chat runs the
 * shot's full width, so below md only Claude's confirmation shows, edge to
 * edge (the parent's gutter is px-4 sm:px-8), to keep the text legible. The
 * hidden one is lazy, so each width loads one image.
 */
export const McpChatShot = ({ desktop, sizes }: { desktop: keyof typeof DESKTOP; sizes: string }) => (
  <>
    <ProductShot {...SHOT} {...DESKTOP[desktop]} sizes={sizes} className="hidden md:block" />
    <div className="-mx-4 sm:-mx-8 md:hidden">
      <ProductShot
        {...SHOT}
        alt="Claude confirms in chat: logged in Prodlog as Shipped the new onboarding checklist, with the activation metric 41% to 47%, Maya's design credit and two tags, then asks which product it belongs to and whether to move the date back."
        crop={{ region: { x: 0.062, y: 0.752, w: 0.83, h: 0.186 } }}
        sizes="100vw"
        className="rounded-l-none rounded-r-none border-x-0"
      />
    </div>
  </>
);
