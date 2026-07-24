// Rich Text card content model + helpers, mirrored from the dashboard app
// (prodlog2 src/types/richText.ts and src/lib/richText.ts) so the public
// portfolio renders the same allowlisted TipTap JSON the owner saved.
// Everything outside the allowed node/mark set is treated as inert.

export interface RichTextMark {
  type: 'bold' | 'italic' | 'code' | 'link';
  attrs?: {
    href?: string;
  };
}

export interface RichTextNode {
  type:
    | 'paragraph'
    | 'heading'
    | 'bulletList'
    | 'orderedList'
    | 'listItem'
    | 'blockquote'
    | 'text'
    | 'hardBreak';
  attrs?: {
    level?: number;
  };
  content?: RichTextNode[];
  marks?: RichTextMark[];
  text?: string;
}

export interface RichTextDoc {
  type: 'doc';
  content: RichTextNode[];
}

/** Absolute http(s) URL for a link mark, or null to drop the link. */
export function safeRichTextHref(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.href;
  } catch {
    return null;
  }
}

const nodeText = (node: RichTextNode): string => {
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'hardBreak') return '\n';
  return (node.content ?? []).map(nodeText).join('');
};

/** Concatenated text content — the emptiness check. */
export function richTextPlainText(doc: RichTextDoc | null | undefined): string {
  if (!doc) return '';
  return (doc.content ?? []).map(nodeText).join('\n').trim();
}

export function isRichTextEmpty(doc: RichTextDoc | null | undefined): boolean {
  return richTextPlainText(doc) === '';
}

/** Estimated rendered height in px, mirrored from the dashboard's BentoGrid:
 *  card padding + optional title row, then ~55 chars per line at 23px with a
 *  little per-block spacing. Drives the card's grid row span. */
export function estimateRichTextHeight(doc: RichTextDoc, hasTitle: boolean): number {
  let height = 48 + (hasTitle ? 28 : 0);
  const walk = (nodes: RichTextNode[]) => {
    for (const node of nodes) {
      if (node.type === 'paragraph' || node.type === 'heading') {
        const chars = nodeText(node).length;
        height += 8 + Math.max(1, Math.ceil(chars / 55)) * 23;
      } else if (node.content) {
        walk(node.content);
      }
    }
  };
  walk(doc.content ?? []);
  return height;
}
