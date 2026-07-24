import React from 'react';
import type { RichTextDoc, RichTextNode } from '@/src/lib/portfolio/richText';
import { safeRichTextHref } from '@/src/lib/portfolio/richText';

// Server-rendered body of the dashboard's Rich Text card: walks the stored
// TipTap JSON and emits React nodes directly — no HTML strings and no
// dangerouslySetInnerHTML, so unknown node/mark types are simply dropped.
// Deliberately NOT a client component: the prose must be in the initial
// HTML for crawlers, with no fetch or hydration.

const renderMarks = (node: RichTextNode, key: number): React.ReactNode => {
  let element: React.ReactNode = node.text ?? '';
  for (const mark of node.marks ?? []) {
    switch (mark.type) {
      case 'bold':
        element = <strong>{element}</strong>;
        break;
      case 'italic':
        element = <em>{element}</em>;
        break;
      case 'code':
        element = (
          <code className="rounded bg-charcoal/60 px-1 py-0.5 font-mono text-[0.85em]">
            {element}
          </code>
        );
        break;
      case 'link': {
        const href = safeRichTextHref(mark.attrs?.href);
        if (href) {
          element = (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-impact underline underline-offset-2 hover:opacity-80"
            >
              {element}
            </a>
          );
        }
        break;
      }
    }
  }
  return <React.Fragment key={key}>{element}</React.Fragment>;
};

const renderNode = (node: RichTextNode, key: number): React.ReactNode => {
  const children = (node.content ?? []).map(renderNode);
  switch (node.type) {
    case 'text':
      return renderMarks(node, key);
    case 'hardBreak':
      return <br key={key} />;
    case 'paragraph':
      return (
        <p key={key} className="my-2 first:mt-0 last:mb-0">
          {children}
        </p>
      );
    case 'heading':
      return (
        <h3 key={key} className="mt-3 mb-1 font-serif text-base font-semibold text-primary first:mt-0">
          {children}
        </h3>
      );
    case 'bulletList':
      return (
        <ul key={key} className="my-2 list-disc pl-5 [&>li]:my-1">
          {children}
        </ul>
      );
    case 'orderedList':
      return (
        <ol key={key} className="my-2 list-decimal pl-5 [&>li]:my-1">
          {children}
        </ol>
      );
    case 'listItem':
      return (
        <li key={key} className="[&>p]:my-0">
          {children}
        </li>
      );
    case 'blockquote':
      return (
        <blockquote key={key} className="my-2 border-l-2 border-divider pl-3 italic text-muted [&>p]:my-0">
          {children}
        </blockquote>
      );
    default:
      return null;
  }
};

export const RichTextContent = ({ doc }: { doc: RichTextDoc }) => (
  <div className="text-sm leading-relaxed text-primary break-words">
    {(doc.content ?? []).map(renderNode)}
  </div>
);
