'use server';

import { getSupabase } from '@/src/lib/portfolio/supabase';

export type NotifySignupState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server action: stores an integration-launch notification signup.
 * Runs server-side with the anon-key client; RLS must allow anon inserts
 * on `integration_notify_signups` (insert only, no select).
 */
export async function submitNotifySignup(
  _prev: NotifySignupState,
  formData: FormData,
): Promise<NotifySignupState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }

  const { error } = await getSupabase()
    .from('integration_notify_signups')
    .insert({ email, source: 'landing:log-from-anywhere' });

  // 23505 = unique_violation: already signed up, which is fine
  if (error && error.code !== '23505') {
    return { status: 'error', message: 'Something went wrong — please try again.' };
  }

  return { status: 'success' };
}
