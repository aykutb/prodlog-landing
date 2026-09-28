import { test } from 'node:test';
import assert from 'node:assert/strict';
import { priyaLog, REVIEW, RESUME_BULLETS, STAR_STORY, ONE_ON_ONE_ASK, entryById } from '../src/content/demo/priya';

const DASHES = /[–—]/;
const BANNED = /\b(impact|wins?|achievements?|validat\w*|verif\w*)\b/i;

test('Priya on Sunday Sep 27, 2026: 1:1 on Thursday, three entries since the last one', () => {
  const log = priyaLog('2026-09-27');
  assert.equal(log.nextOneOnOne, '2026-10-01');
  assert.equal(log.lastOneOnOne, '2026-09-24');
  assert.deepEqual(log.sinceLast.map((e) => e.date), ['2026-09-27', '2026-09-27', '2026-09-25']);
  const current = log.windows[log.windows.length - 1];
  assert.equal(current.current, true);
  assert.deepEqual([...current.strips].sort(), [false, true, true]);
  assert.equal(current.strips.length, 3);
});

test('on a Thursday the 1:1 is today', () => {
  assert.equal(priyaLog('2026-10-01').nextOneOnOne, '2026-10-01');
});

test('the ledger: newest first, a divider at each past 1:1, a rule where the year changes', () => {
  const { ledger } = priyaLog('2026-09-27');
  const shape = ledger.slice(0, 8).map((i) => (i.type === 'entry' ? i.entry.date : i.type === 'divider' ? `| ${i.label}` : `# ${i.year}`));
  assert.deepEqual(shape, ['2026-09-27', '2026-09-27', '2026-09-25', '| Your 1:1, Sep 24', '2026-09-22', '| Your 1:1, Sep 17', '2026-09-15', '| Your 1:1, Sep 10']);
  const years = ledger.filter((i) => i.type === 'year');
  assert.deepEqual(years, [{ type: 'year', year: '2025' }]);
  const last = ledger[ledger.length - 1];
  assert.equal(last.type === 'entry' && last.entry.date, '2025-12-09');
});

test('review drafts and the career outputs point at real entries', () => {
  const log = priyaLog('2026-09-27');
  for (const draft of REVIEW.drafts) for (const id of draft.drewOn) assert.ok(entryById(id, log), id);
});

test('demo copy follows the glossary: no dashes, no banned product terms', () => {
  const log = priyaLog('2026-09-27');
  const text = JSON.stringify({ log: log.entries, REVIEW, RESUME_BULLETS, STAR_STORY, ONE_ON_ONE_ASK });
  assert.doesNotMatch(text, DASHES);
  assert.doesNotMatch(text, BANNED);
});
