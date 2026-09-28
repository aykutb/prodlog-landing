import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyChanges, loadChanges, loadNewDocs } from '../src/lib/sanity/contentChanges';

test('swaps apply in order, and text that is not there is reported', () => {
  const doc = { body: 'one — two — three', order: 2 };
  const { next, outcomes } = applyChanges(doc, [
    { field: 'body', before: 'one — two', after: 'one, two', why: 'dash' },
    { field: 'body', before: 'two — three', after: 'two: three', why: 'dash' },
    { field: 'body', before: 'nowhere', after: 'x', why: 'dash' },
    { field: 'order', before: 2, after: 0, why: 'brief' },
  ]);
  assert.deepEqual(outcomes, ['ok', 'ok', 'missing', 'ok']);
  assert.equal(next.body, 'one, two: three');
  assert.equal(next.order, 0);
});

test('a change already in place is recognized, and a repeated `before` is refused', () => {
  const { outcomes } = applyChanges({ body: 'a, b. a, b' }, [
    { field: 'body', before: 'a — b', after: 'a, b', why: 'dash' },
    { field: 'body', before: 'a, b', after: 'c', why: 'dash' },
  ]);
  assert.deepEqual(outcomes, ['applied-already', 'ambiguous']);
});

test('the pending content changes add no dash and no LinkedIn', () => {
  const texts = [
    ...loadChanges().flatMap((d) => d.changes.filter((c) => c.field !== 'order').map((c) => String(c.after))),
    ...loadNewDocs().flatMap((d) => [d.title, d.description, d.headline ?? '', d.body]),
  ];
  assert.ok(texts.length > 200);
  for (const text of texts) {
    assert.doesNotMatch(text, /[–—]/, text.slice(0, 80));
    assert.doesNotMatch(text, /linkedin/i, text.slice(0, 80));
  }
});
