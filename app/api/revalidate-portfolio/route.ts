import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { getSupabase } from '@/src/lib/portfolio/supabase';

// Same charset the dashboard enforces at username selection
const USERNAME_RE = /^[a-zA-Z0-9_]{3,32}$/;

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
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof username !== 'string' || !USERNAME_RE.test(username)) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
  }

  const { data: profile } = await getSupabase()
    .from('profiles')
    .select('username')
    .eq('username', username)
    .is('deleted_at', null)
    .maybeSingle();

  if (!profile) {
    return NextResponse.json({ error: 'Unknown username' }, { status: 404 });
  }

  revalidatePath(`/p/${username}`);
  return NextResponse.json({ revalidated: true, path: `/p/${username}` });
}
