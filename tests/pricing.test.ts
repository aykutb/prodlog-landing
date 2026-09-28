import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isProFree, pricingLines } from '../src/lib/pricing';

const DASHES = /[–—]/;

test('Pro is free through the end of December 31, 2026 anywhere on earth', () => {
  assert.equal(isProFree(new Date('2026-09-27T12:00:00Z')), true);
  assert.equal(isProFree(new Date('2026-12-31T23:59:00-12:00')), true);
  assert.equal(isProFree(new Date('2027-01-01T12:00:00Z')), false);
  assert.equal(isProFree(new Date('2027-01-02T00:00:00Z')), false);
});

test('during the free period the lines mention it', () => {
  const l = pricingLines(new Date('2026-10-01T00:00:00Z'));
  assert.equal(l.hero, 'No signup to try. Pro is free until the end of the year, then $9/mo.');
  assert.equal(l.finalCta, 'Entries, 1:1 prep and your portfolio are free forever. Pro is free until the end of the year.');
  assert.equal(l.pricingTitle, 'Pro is free until the end of the year.');
  assert.equal(l.pricingSub, "Everyone gets Pro free through December 31, 2026. After that it's $9/mo, and the free plan stays free forever.");
  assert.equal(l.proFreeNote, 'Free until Dec 31');
  assert.deepEqual(l.afterFreePeriod?.items, ['Pro becomes $9/mo.', 'The free plan stays free forever.', 'Your entries are always yours: export anytime, no lock-in.']);
});

test('after the date the free-period lines disappear and $9/mo remains', () => {
  const l = pricingLines(new Date('2027-01-02T00:00:00Z'));
  assert.equal(l.hero, 'No signup to try. Free forever, Pro is $9/mo.');
  assert.equal(l.finalCta, 'Entries, 1:1 prep and your portfolio are free forever. Pro is $9/mo.');
  assert.equal(l.pricingTitle, 'Simple pricing.');
  assert.equal(l.pricingSub, 'Free forever. Pro is $9/mo when you need more.');
  assert.equal(l.proFreeNote, null);
  assert.equal(l.afterFreePeriod, null);
  for (const value of Object.values(l)) {
    if (typeof value === 'string') assert.doesNotMatch(value, /free until|end of the year|December 31/i);
  }
});

test('no line says $19 or uses a dash', () => {
  for (const date of ['2026-10-01', '2027-01-02']) {
    const text = JSON.stringify(pricingLines(new Date(date)));
    assert.doesNotMatch(text, /\$19/);
    assert.doesNotMatch(text, DASHES);
  }
});

test('PRICING_NOW overrides the date', () => {
  process.env.PRICING_NOW = '2027-01-02';
  assert.equal(pricingLines().proFree, false);
  delete process.env.PRICING_NOW;
});
