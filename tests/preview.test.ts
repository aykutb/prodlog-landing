import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MAX_CHARS, SIGNUP_URL, signupUrl } from '../src/lib/preview';

const decode = (url: string) => {
  const fragment = url.split('#paste=')[1];
  const b64 = fragment.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))));
};

test('no note and no day: the plain signup link', () => {
  assert.equal(signupUrl(), SIGNUP_URL);
  assert.equal(signupUrl({ text: '   ' }), SIGNUP_URL);
});

test('the note and the 1:1 day ride in the fragment, never the query', () => {
  const url = signupUrl({ text: 'shipped the pricing page ✓, tickets down', oneOnOne: 4 });
  assert.ok(url.startsWith(`${SIGNUP_URL}#paste=`));
  assert.ok(!url.includes('?'));
  assert.deepEqual(decode(url), { v: 1, text: 'shipped the pricing page ✓, tickets down', oneOnOne: 4 });
  assert.deepEqual(decode(signupUrl({ oneOnOne: 'none' })), { v: 1, oneOnOne: 'none' });
});

test('the note is capped at the paste limit', () => {
  assert.equal(decode(signupUrl({ text: 'x'.repeat(MAX_CHARS + 50) })).text.length, MAX_CHARS);
});
