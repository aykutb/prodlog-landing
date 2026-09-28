'use client';

import React from 'react';
import type { OneOnOneChoice } from '@/src/lib/preview';

const DAYS: Array<{ value: Exclude<OneOnOneChoice, 'none'>; label: string }> = [
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
];

const CHIP =
  'h-8 rounded-lg border px-3 text-body font-medium transition-colors ring-offset-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-ink focus-visible:ring-offset-2';
const chipState = (selected: boolean) =>
  selected ? 'border-on-ink bg-on-ink text-ink' : 'border-on-ink/40 text-on-ink hover:border-on-ink hover:bg-on-ink/10';

/**
 * The Rhythm tile's weekday chips on ink (prodlog2 features/log/WeekdayChips.tsx,
 * `onTile`), Monday to Friday, plus "No regular 1:1s" as a chip.
 */
export const WeekdayChips = ({ value, onChange }: { value: OneOnOneChoice | null; onChange: (value: OneOnOneChoice) => void }) => (
  <div className="mt-4 space-y-3">
    <div role="group" aria-label="1:1 day" className="flex flex-wrap gap-2">
      {DAYS.map((day) => (
        <button key={day.value} type="button" aria-pressed={value === day.value} onClick={() => onChange(day.value)} className={`${CHIP} ${chipState(value === day.value)}`}>
          {day.label}
        </button>
      ))}
    </div>
    <button type="button" aria-pressed={value === 'none'} onClick={() => onChange('none')} className={`${CHIP} ${chipState(value === 'none')}`}>
      No regular 1:1s
    </button>
  </div>
);
