import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

// Guards the Phase 0 scans on the site's own code (Sanity copy is checked by
// tests/contentChanges.test.ts and by rendering, see docs/landing-log-first.md).
const root = path.resolve(__dirname, '..');
const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? files(full) : /\.(tsx?|css)$/.test(name) ? [full] : [];
  });
const source = [...files(path.join(root, 'src')), ...files(path.join(root, 'app'))];
const isComment = (line: string) => /^\s*(\/\/|\*|\/\*|\{\/\*)/.test(line) || /\s\/\/\s/.test(line.split(/['"`]/)[0] ?? '');

const offending = (rx: RegExp, allow: RegExp[] = []) =>
  source.flatMap((file) =>
    readFileSync(file, 'utf8')
      .split('\n')
      .map((line, i) => ({ line, at: `${path.relative(root, file)}:${i + 1}` }))
      .filter(({ line }) => rx.test(line) && !isComment(line) && !allow.some((a) => a.test(line)))
      .map(({ at, line }) => `${at}  ${line.trim().slice(0, 100)}`),
  );

test('no em or en dash in the site code outside comments', () => {
  assert.deepEqual(offending(/[–—]/), []);
});

test('no old offer: $19, founding, spots, the founding RPC', () => {
  assert.deepEqual(offending(/\$19\b|founding|founding_spots_remaining|spots left/i), []);
});

test('LinkedIn only as a portfolio owner’s own link or an embedded post', () => {
  assert.deepEqual(offending(/linkedin/i, [/linkedin_url|LinkedinIcon|'linkedin\.com', 'LinkedIn'|linkedinUrl|linkedin:/i]), []);
});

test('no retired product words in site copy', () => {
  assert.deepEqual(offending(/capture system|log (?:a|one) win|Summaries (?:tab|page)|Prodlog timeline|Start your log|\/p\/aykutbal/i), []);
});
