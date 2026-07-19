'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

/**
 * The inline-tier expansion the dashboard's Decision family established: a
 * quiet toggle that swaps the card face for a hidden layer within the same
 * frame — no route, no modal, no grid reflow. Both layers arrive
 * server-rendered; the inactive one is `hidden` so content stays in the HTML.
 */
export const InlineReveal = ({
  face,
  reveal,
  showLabel,
  hideLabel,
}: {
  face: React.ReactNode;
  reveal: React.ReactNode;
  showLabel: string;
  hideLabel: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={expanded ? 'hidden' : 'flex-1 min-h-0 flex flex-col justify-center'}>{face}</div>
      <div className={expanded ? 'flex-1 min-h-0 flex items-center' : 'hidden'}>{reveal}</div>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((e) => !e)}
        className="self-start inline-flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors shrink-0"
      >
        {expanded ? (
          <>
            <ChevronUpIcon className="w-3.5 h-3.5" />
            {hideLabel}
          </>
        ) : (
          <>
            <ChevronDownIcon className="w-3.5 h-3.5" />
            {showLabel}
          </>
        )}
      </button>
    </>
  );
};
