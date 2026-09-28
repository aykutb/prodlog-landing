import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTimeline, MAX_STEP_MS, type Timeline } from '../src/lib/scene/timeline';
import { CHAPTERS, RESTING, T, afterFrame, chapterAt, createHeroTimeline, type HeroSceneState } from '../src/components/ledger-hero/heroTimeline';
import { HERO_ASK, HERO_NOTE, heroScene, sceneDay } from '../src/content/demo/heroScene';

/** Drive the clock by hand, one capped frame at a time, until it reads `t`. */
const advanceTo = <S>(tl: Timeline<S>, t: number) => {
  while (tl.snapshot().clock < t) tl.tick(Math.min(MAX_STEP_MS, t - tl.snapshot().clock));
  return tl.snapshot();
};

const playing = () => {
  const tl = createHeroTimeline();
  tl.play();
  return tl;
};

const expectAt: Record<number, Partial<HeroSceneState>> = {
  0: RESTING,
  5800: { typedChars: 0, lineFocus: false, dissolving: false, rowsMounted: true, rowsOpen: 1, barsDrawn: false, counted: false, strips: ['off', 'off'] },
  7400: { rowsOpen: 2, barsDrawn: true, counted: true, countFlash: true, strips: ['off', 'off'], ring: false },
  9600: { counted: true, strips: ['settled', 'settled'], ring: false, sheetOpen: true, askChars: 0, cursor: { shown: true, target: 'prep', moveMs: T.CURSOR_TO_PREP_MS, clicks: 1, pressed: false } },
  14000: { sheetOpen: true, askFocus: false, askChars: HERO_ASK.length, copied: true, copyPressed: false, cursor: { shown: true, target: 'copy', moveMs: T.CURSOR_TO_COPY_MS, clicks: 3, pressed: false } },
};

const assertState = (state: HeroSceneState, expected: Partial<HeroSceneState>, at: string) => {
  for (const [key, value] of Object.entries(expected)) assert.deepEqual(state[key as keyof HeroSceneState], value, `${key} at ${at}`);
};

test('the scene, played: the state at 0, 5800, 7400, 9600 and 14000 ms', () => {
  const tl = playing();
  for (const t of [0, 5800, 7400, 9600, 14000]) assertState(advanceTo(tl, t).state, expectAt[t], `${t}`);
});

test('mid-typing: the note types in by character, then the keys flash', () => {
  const tl = playing();
  assert.equal(advanceTo(tl, T.TYPE_START + 10 * T.TYPE_CHAR).state.typedChars, 10);
  const typed = advanceTo(tl, T.KEYS_HIT).state;
  assert.equal(typed.typedChars, HERO_NOTE.length, 'the note is fully typed before the keypress');
  assert.equal(typed.keysHit, true);
  assert.equal(advanceTo(tl, T.KEYS_HIT + T.KEYS_HIT_FOR).state.keysHit, false);
});

test('seek: events before t apply instantly, the event at t fires on the next tick', () => {
  for (const t of [0, 5800, 7400, 9600, 14000]) {
    const tl = playing();
    advanceTo(tl, 3000);
    const before = tl.snapshot().run;
    const snap = tl.seek(t);
    assert.equal(snap.clock, t);
    assert.equal(snap.instant, true, "a seek renders without transitions");
    assert.ok(snap.run > before, 'a seek starts a new run');
    // The state equals playing up to just before t.
    const reference = playing();
    if (t > 0) advanceTo(reference, t - 1);
    assert.deepEqual(snap.state, reference.snapshot().state, `seek(${t})`);
    // One tick later it matches the played state at t, and is no longer instant.
    const next = tl.tick(1);
    assert.equal(next.instant, false);
    assertState(next.state, expectAt[t], `seek(${t}) + 1ms`);
  }
});

test('the clock only runs while playing, and a frame advances at most 100ms', () => {
  const tl = createHeroTimeline();
  tl.tick(50);
  assert.equal(tl.snapshot().clock, 0, 'paused');
  tl.play();
  tl.tick(5000);
  assert.equal(tl.snapshot().clock, MAX_STEP_MS, 'a background tab does not jump');
  tl.pause();
  tl.tick(80);
  assert.equal(tl.snapshot().clock, MAX_STEP_MS);
});

test('at END the scene resets to the resting frame and plays again', () => {
  const tl = playing();
  advanceTo(tl, T.END - 1);
  const run = tl.snapshot().run;
  const snap = tl.tick(1);
  assert.equal(snap.clock, 0);
  assert.deepEqual(snap.state, RESTING);
  assert.equal(snap.run, run + 1);
  assert.equal(snap.playing, true);
  assert.equal(advanceTo(tl, T.FOCUS).state.lineFocus, true);
});

test('the ask box has focus from the click until the cursor moves to Copy', () => {
  const tl = playing();
  assert.equal(advanceTo(tl, T.CLICK_ASK - 1).state.askFocus, false);
  const clicked = advanceTo(tl, T.CLICK_ASK).state;
  assert.equal(clicked.askFocus, true);
  assert.equal(clicked.cursor.pressed, true);
  assert.equal(advanceTo(tl, T.CLICK_ASK + T.PRESS_FOR).state.cursor.pressed, false);
  assert.equal(advanceTo(tl, T.CURSOR_TO_COPY).state.askFocus, false);
});

test('the fold before END returns the card and the rows to rest', () => {
  const s = advanceTo(playing(), T.FOLD).state;
  assert.equal(s.rowsOpen, 0);
  assert.equal(s.counted, false);
  assert.deepEqual(s.strips, ['lifted', 'lifted']);
  assert.equal(s.sheetOpen, false);
  assert.equal(s.cursor.shown, false);
});

test('the after frame: both entries in, card counted, strips settled, no cursor, no ring, no flash', () => {
  const s = afterFrame();
  assert.equal(s.rowsOpen, 2);
  assert.equal(s.barsDrawn, true);
  assert.equal(s.counted, true);
  assert.equal(s.countFlash, false);
  assert.deepEqual(s.strips, ['settled', 'settled']);
  assert.equal(s.ring, false);
  assert.equal(s.cursor.shown, false);
  assert.equal(s.sheetOpen, false);
  assert.equal(s.typedChars, 0);
});

test('chapters cover the loop end to end, in order', () => {
  assert.equal(CHAPTERS[0].start, 0);
  assert.equal(CHAPTERS[CHAPTERS.length - 1].end, T.END);
  CHAPTERS.slice(1).forEach((c, i) => assert.equal(c.start, CHAPTERS[i].end));
  assert.equal(chapterAt(0).key, 'paste');
  assert.equal(chapterAt(5800).key, 'entries');
  assert.equal(chapterAt(7400).key, 'one_on_one');
  assert.equal(chapterAt(16499).key, 'prep');
});

test('typing finishes before the beat that follows it', () => {
  assert.ok(T.TYPE_START + HERO_NOTE.length * T.TYPE_CHAR < T.KEYS_HIT);
  assert.ok(T.ASK_START + HERO_ASK.length * T.ASK_CHAR < T.CURSOR_TO_COPY);
});

test('the engine: events are applied in time order whatever order they are given in', () => {
  const tl = createTimeline({
    initial: [] as number[],
    events: [
      { t: 30, apply: (s) => [...s, 30] },
      { t: 10, apply: (s) => [...s, 10] },
      { t: 20, apply: (s) => [...s, 20] },
    ],
    end: 100,
  });
  tl.play();
  advanceTo(tl, 25);
  assert.deepEqual(tl.snapshot().state, [10, 20]);
  assert.deepEqual(tl.stateAt(31), [10, 20, 30]);
  assert.equal(tl.snapshot().clock, 25, 'stateAt does not move the clock');
});

// ── The scene's data ────────────────────────────────────────────────────────

test('the scene day is the most recent Monday', () => {
  assert.equal(sceneDay('2026-09-28'), '2026-09-28');
  assert.equal(sceneDay('2026-10-01'), '2026-09-28');
  assert.equal(sceneDay('2026-10-04'), '2026-09-28');
  assert.equal(sceneDay('2026-10-05'), '2026-10-05');
});

test('Priya on Mon Sep 28: the card, the chart, the resting log', () => {
  const s = heroScene('2026-09-30');
  assert.equal(s.day, '2026-09-28');
  assert.equal(s.cardTitle, '1:1 with Elena Vasquez');
  assert.equal(s.cardAside, 'Thu, Oct 1');
  assert.deepEqual(s.context, { before: '1 entry since your last 1:1 on Sep 24.', after: '3 entries since your last 1:1 on Sep 24.' });
  assert.deepEqual(s.caption, { before: '13 entries in your last eight 1:1s.', after: '15 entries in your last eight 1:1s.' });
  assert.equal(s.windows.length, 8);
  assert.deepEqual(s.windows.map((w) => w.strips.length), [1, 3, 2, 1, 2, 2, 1, 1]);
  assert.deepEqual(s.windows.map((w) => w.axisLabel ?? ''), ['', '', '', 'Sep', '', '', '', 'Now']);
  const shape = s.ledger.map((i) => (i.type === 'entry' ? `${i.entry.date} ${i.entry.title}` : `| ${i.label}`));
  assert.deepEqual(shape, [
    '2026-09-25 Chargeback dashboard v2',
    '| 1:1 with Elena Vasquez, Sep 24',
    '2026-09-22 Refund SLA agreed with support',
    '| 1:1 with Elena Vasquez, Sep 17',
    '2026-09-15 Dropped the partial-refund experiment',
    '2026-09-08 Onboarded the new dispute analyst',
  ]);
  assert.deepEqual(s.newRows.map((r) => `${r.date} ${r.title} / ${r.outcome}`), [
    '2026-09-28 Cut the manual refund review step / Freed 3 eng-weeks',
    '2026-09-25 Dispute evidence checklist went live / null',
  ]);
  assert.equal(s.prep.title, '1:1 with Elena Vasquez on Thu, Oct 1');
  assert.equal(s.prep.since, 'Since Sep 24');
  assert.equal(s.prep.rows.length, 3);
  assert.equal(s.prep.gaps, '1 entry has no outcome yet. Add one above with "Add an outcome".');
});

test('scene copy has no dashes', () => {
  const s = heroScene('2026-09-28');
  assert.doesNotMatch(JSON.stringify({ s, HERO_NOTE, HERO_ASK }), /[–—]/);
});
