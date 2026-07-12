import React from 'react';

// Static (server-rendered) version of the dashboard's contribution heatmap:
// one column per week over the last 12 months, 4 cells tall, same colors.
// Tooltips/popovers are owner-facing niceties and are omitted here.

const CELL = 7;
const GAP = 1;
const ROWS = 4;

const EMPTY = 'bg-[#ebedf0]';
const FILLED = 'bg-[#40c463]';
const OVERFLOW = 'bg-[#216e39]';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getCellColor = (count: number, rowIdx: number): string => {
  const threshold = ROWS - rowIdx;
  if (count < threshold) return EMPTY;
  return count > ROWS ? OVERFLOW : FILLED;
};

interface WeekData {
  count: number;
  monthLabel?: string;
}

function buildWeeks(dates: string[]): WeekData[] {
  const now = new Date();
  const start = new Date(now);
  start.setMonth(start.getMonth() - 12);

  // Monday on/before the start date
  const firstMonday = new Date(start);
  firstMonday.setDate(firstMonday.getDate() - ((firstMonday.getDay() + 6) % 7));
  firstMonday.setHours(0, 0, 0, 0);

  const logTimes = dates.map((d) => new Date(d).getTime());

  const weeks: WeekData[] = [];
  let prevMonth = '';
  for (let ws = new Date(firstMonday); ws <= now; ws.setDate(ws.getDate() + 7)) {
    const weekStart = new Date(ws);
    const weekEnd = new Date(ws);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const count = logTimes.filter((t) => t >= weekStart.getTime() && t < weekEnd.getTime()).length;

    const monthStr = MONTHS_SHORT[weekStart.getMonth()];
    let monthLabel: string | undefined;
    if (monthStr !== prevMonth) {
      monthLabel = monthStr;
      prevMonth = monthStr;
    }

    weeks.push({ count, monthLabel });
  }
  return weeks;
}

export const ActivityGrid = ({ logDates }: { logDates: string[] }) => {
  const weeks = buildWeeks(logDates);

  return (
    <div className="flex flex-col gap-1 pb-2 overflow-hidden">
      {/* Month labels row — matches column positions */}
      <div className="flex" style={{ gap: GAP }}>
        {weeks.map((week, i) => (
          <div key={i} className="shrink-0 relative" style={{ width: CELL, height: 10 }}>
            {week.monthLabel && (
              <span className="absolute left-0 top-0 text-[9px] leading-none text-muted font-medium whitespace-nowrap">
                {week.monthLabel}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Heatmap grid — each column is one week, 4 cells tall */}
      <div className="flex" style={{ gap: GAP }}>
        {weeks.map((week, colIdx) => (
          <div key={colIdx} className="flex flex-col" style={{ gap: GAP }}>
            {Array.from({ length: ROWS }, (_, row) => (
              <div
                key={row}
                className={`rounded-[2px] ${getCellColor(week.count, row)}`}
                style={{ width: CELL, height: CELL }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 text-[9px] text-muted pt-1">
        <span>Less</span>
        <div className={`rounded-[2px] ${EMPTY}`} style={{ width: 7, height: 7 }} />
        <div className={`rounded-[2px] ${FILLED}`} style={{ width: 7, height: 7 }} />
        <div className={`rounded-[2px] ${OVERFLOW}`} style={{ width: 7, height: 7 }} />
        <span>More</span>
      </div>
    </div>
  );
};
