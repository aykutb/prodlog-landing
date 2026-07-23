import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { getSupabase } from '@/src/lib/portfolio/supabase';

// Same charset the dashboard enforces at username selection
const USERNAME_RE = /^[a-zA-Z0-9_]{3,32}$/;

// The dashboard SPA calls this route cross-origin from the browser, which
// triggers a CORS preflight. Only the dashboard host is allowed — hardcoded
// on purpose, matching /p/[username]'s canonical-origin convention.
const ALLOWED_ORIGIN = 'https://dashboard.prodlog.app';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: CORS_HEADERS });
}

/** Preflight for the browser's cross-origin POST. */
export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * On-publish cache invalidation for /p/[username], pinged (fire-and-forget)
 * by the dashboard app when a log is created/edited/toggled public and by the
 * verify-impact edge function when a verification is accepted.
 *
 * Unauthenticated by design: the dashboard SPA calls it from the browser, so
 * it can't hold a secret. The blast radius is limited to regenerating a real
 * portfolio page — the username must exist before anything is revalidated.
 */
export async function POST(request: Request) {
  let username: unknown;
  try {
    ({ username } = await request.json());
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  if (typeof username !== 'string' || !USERNAME_RE.test(username)) {
    return json({ error: 'Invalid username' }, 400);
  }

  const { data: profile } = await getSupabase()
    .from('profiles')
    .select('username')
    .eq('username', username)
    .is('deleted_at', null)
    .maybeSingle();

  if (!profile) {
    return json({ error: 'Unknown username' }, 404);
  }

  revalidatePath(`/p/${username}`);
  return json({ revalidated: true, path: `/p/${username}` }, 200);
}
