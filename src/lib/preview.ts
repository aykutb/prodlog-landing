/**
 * The paste preview: the request to prodlog-api's public parser and the
 * signup handoff that carries the visitor's note into the dashboard.
 *
 * The parser (prodlog-api src/routes/preview.routes.ts) is anonymous,
 * rate-limited to 5 an hour per IP, stores nothing, and returns at most 12
 * entries. Its response shape is a contract with this file.
 */

export const PARSE_URL = 'https://api.prodlog.app/api/preview/parse';
export const SIGNUP_URL = 'https://dashboard.prodlog.app/auth';
export const MAX_CHARS = 8000;
export const MAX_CHARS_LABEL = MAX_CHARS.toLocaleString('en-US');

export const PLACEHOLDER = `shipped onboarding redesign finally, activation looks up
killed the loyalty feature, freed up eng for the bug backlog
talked maya through the scope call`;

/**
 * Filled in by "Use a sample note". Same register as the placeholder,
 * different content, so the two never read as the same thing twice.
 */
export const SAMPLE = `pricing page finally out, tues i think, billing tickets dropped right after
said no to the enterprise sso ask again, wrote up why for leadership
q2 roadmap review went ok, cut two things nobody fought for
priya took over the analytics spec, should check in on that`;

export interface PreviewEntry {
  /** YYYY-MM-DD, only when the note states one. */
  date: string | null;
  title: string;
  /** What the person did, in their own register. */
  ownership: string | null;
  outcome: string | null;
  missingOutcome: boolean;
}

export type ParseResult =
  | { ok: true; entries: PreviewEntry[]; truncated: boolean }
  | { ok: false; message: string };

export const ERROR_RATE_LIMITED = "You've run this a few times. Try again in a bit, or start free and do it in the app.";
export const ERROR_TOO_LONG = `Paste is a bit long. Trim it to ${MAX_CHARS_LABEL} characters or fewer.`;
export const NOTICE_TRIMMED = `That was over ${MAX_CHARS_LABEL} characters, so we kept the first ${MAX_CHARS_LABEL}.`;
export const ERROR_GENERIC = "That didn't work. Try again in a moment.";
export const EMPTY_RESULT = 'We couldn’t find distinct entries in that. Try a few lines, one thing per line.';

export async function parseNotes(text: string): Promise<ParseResult> {
  let response: Response;
  try {
    response = await fetch(PARSE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  } catch {
    return { ok: false, message: ERROR_GENERIC };
  }
  if (response.status === 429) return { ok: false, message: ERROR_RATE_LIMITED };
  if (response.status === 400) return { ok: false, message: ERROR_TOO_LONG };
  if (!response.ok) return { ok: false, message: ERROR_GENERIC };
  try {
    const data = (await response.json()) as { entries?: PreviewEntry[]; truncated?: boolean };
    return { ok: true, entries: Array.isArray(data.entries) ? data.entries : [], truncated: data.truncated === true };
  } catch {
    return { ok: false, message: ERROR_GENERIC };
  }
}

/** ISO weekday (1 Monday to 5 Friday) or no regular 1:1s. */
export type OneOnOneChoice = 1 | 2 | 3 | 4 | 5 | 'none';

export interface Handoff {
  /** The visitor's note, as pasted. The dashboard runs its own import on it. */
  text?: string;
  /** The 1:1 day picked on /try, for onboarding's Rhythm step. */
  oneOnOne?: OneOnOneChoice;
}

/** Contract version of the `#paste=` payload. */
export const HANDOFF_VERSION = 1;

const toBase64Url = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * The signup link. With a note or a 1:1 day, they ride in the URL fragment
 * (`#paste=` base64url JSON `{ v, text?, oneOnOne? }`): a fragment never
 * reaches a server, a log or a Referer header, so "We don't store what you
 * paste" stays true. The dashboard stashes it before any OAuth redirect and
 * prefills the import and the Rhythm step (cross-repo follow-up, prodlog2).
 */
export function signupUrl(handoff: Handoff = {}): string {
  const payload: Record<string, unknown> = { v: HANDOFF_VERSION };
  if (handoff.text?.trim()) payload.text = handoff.text.slice(0, MAX_CHARS);
  if (handoff.oneOnOne !== undefined) payload.oneOnOne = handoff.oneOnOne;
  if (Object.keys(payload).length === 1) return SIGNUP_URL;
  return `${SIGNUP_URL}#paste=${toBase64Url(JSON.stringify(payload))}`;
}
