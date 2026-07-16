'use server';

import { getSupabase } from '@/src/lib/portfolio/supabase';

export type SupportRequestState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TITLE_MAX = 200;
const DETAILS_MAX = 5000;

/**
 * Sends the "we got your request" confirmation via the Resend HTTP API.
 * Skipped silently when RESEND_API_KEY is not configured; a delivery
 * failure never fails the support request itself.
 */
async function sendConfirmationEmail(email: string, title: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prodlog <noreply@prodlog.app>',
        to: [email],
        subject: 'We got your support request',
        text: [
          'Hi,',
          '',
          `We received your support request: "${title}"`,
          '',
          'We review every request personally and will get back to you at this address as soon as we can.',
          '',
          '— The Prodlog team',
          'https://prodlog.app',
        ].join('\n'),
      }),
    });
  } catch {
    // Confirmation email is best-effort; the request is already saved.
  }
}

/**
 * Server action: stores a support request. Runs server-side with the
 * anon-key client; RLS must allow anon inserts on `support_requests`
 * (insert only, no select).
 */
export async function submitSupportRequest(
  _prev: SupportRequestState,
  formData: FormData,
): Promise<SupportRequestState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const title = String(formData.get('title') ?? '').trim();
  const details = String(formData.get('details') ?? '').trim();

  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }
  if (!title) {
    return { status: 'error', message: 'Please add a short title for your request.' };
  }
  if (!details) {
    return { status: 'error', message: 'Please describe your issue or question.' };
  }
  if (title.length > TITLE_MAX || details.length > DETAILS_MAX) {
    return { status: 'error', message: 'Your message is too long — please shorten it.' };
  }

  const { error } = await getSupabase()
    .from('support_requests')
    .insert({ email, title, details, source: 'landing:support' });

  if (error) {
    return { status: 'error', message: 'Something went wrong — please try again.' };
  }

  await sendConfirmationEmail(email, title);

  return { status: 'success' };
}
