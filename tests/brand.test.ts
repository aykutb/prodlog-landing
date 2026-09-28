import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { LOGOMARK_STRIPS } from '../src/brand/definition';

const root = path.resolve(__dirname, '..');
const read = (p: string) => readFileSync(path.join(root, p), 'utf8');

test('public/logomark.svg draws the strips in src/brand/definition.ts', () => {
  const svg = read('public/logomark.svg');
  for (const strip of LOGOMARK_STRIPS) assert.ok(svg.includes(`d="${strip.d}"`), `${strip.color} strip differs`);
});

test('public/brand/logo.svg (the lockup) draws the same strips', () => {
  const svg = read('public/brand/logo.svg');
  for (const strip of LOGOMARK_STRIPS) assert.ok(svg.includes(strip.d), `${strip.color} strip differs`);
});

// prodlog2 owns the definition. When it is checked out next to this repo,
// the copy here must match it line for line below the header comment.
const upstream = path.resolve(root, '../prodlog2/src/brand/definition.ts');
test('src/brand/definition.ts matches prodlog2', { skip: !existsSync(upstream) && 'prodlog2 not checked out' }, () => {
  const body = (s: string) => s.slice(s.indexOf('*/') + 2);
  assert.equal(body(read('src/brand/definition.ts')), body(readFileSync(upstream, 'utf8')));
});
