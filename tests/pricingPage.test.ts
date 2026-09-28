import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PricingPage } from '../src/views/Pricing';
import { pricingLines } from '../src/lib/pricing';

const render = (date: string) => renderToStaticMarkup(React.createElement(PricingPage, { lines: pricingLines(new Date(date)) }));

test('/pricing during the free period', () => {
  const html = render('2026-10-01');
  assert.match(html, /Pro is free until the end of the year\./);
  assert.match(html, /<s[^>]*>.*\$9\/mo<\/s> <span[^>]*>Free until Dec 31/);
  assert.match(html, /Start free, Pro included/);
  assert.match(html, /After December 31/);
  assert.match(html, /What happens on January 1\?/);
});

test('/pricing from January 2, 2027: no free-period copy left', () => {
  const html = render('2027-01-02');
  assert.match(html, /Simple pricing\./);
  assert.match(html, /Free forever\. Pro is \$9\/mo when you need more\./);
  assert.match(html, /Get Pro/);
  for (const gone of [/free until/i, /end of the year/i, /After December 31/, /January 1/, /<s[ >]/, /while Pro is free/]) assert.doesNotMatch(html, gone);
});

test('/pricing never shows the old offer', () => {
  for (const date of ['2026-10-01', '2027-01-02']) {
    const html = render(date);
    for (const gone of [/\$19/, /founding/i, /spots/i, /1,000/, /early access/i, /Markdown/, /Priority support/]) assert.doesNotMatch(html, gone);
  }
});
