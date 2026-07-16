'use client';

import React, { useActionState } from 'react';
import { submitSupportRequest, type SupportRequestState } from '@/src/lib/supportRequest';

const INITIAL_STATE: SupportRequestState = { status: 'idle' };

const INPUT_CLASSES =
  'w-full border border-divider rounded px-3 py-2 text-sm bg-white text-primary placeholder:text-muted focus:outline-none focus:border-deep-ink-blue/50';

export const SupportForm = () => {
  const [state, formAction, pending] = useActionState(submitSupportRequest, INITIAL_STATE);

  if (state.status === 'success') {
    return (
      <div className="text-center py-12">
        <p className="text-sage-green font-medium mb-2">We got your request.</p>
        <p className="text-muted text-sm">
          A confirmation is on its way to your inbox, and we&rsquo;ll follow up there as
          soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="support-email" className="text-primary text-sm font-medium">
          Your email
        </label>
        <input
          id="support-email"
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className={INPUT_CLASSES}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="support-title" className="text-primary text-sm font-medium">
          Title
        </label>
        <input
          id="support-title"
          type="text"
          name="title"
          required
          maxLength={200}
          placeholder="Short summary of your issue or question"
          className={INPUT_CLASSES}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="support-details" className="text-primary text-sm font-medium">
          Details
        </label>
        <textarea
          id="support-details"
          name="details"
          required
          maxLength={5000}
          rows={6}
          placeholder="What happened, what you expected, and anything that helps us reproduce it."
          className={`${INPUT_CLASSES} resize-y`}
        />
      </div>
      {state.status === 'error' && (
        <p className="text-warm-amber text-xs">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="self-start bg-deep-ink-blue text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-all disabled:opacity-60"
      >
        {pending ? 'Sending…' : 'Send request'}
      </button>
    </form>
  );
};
