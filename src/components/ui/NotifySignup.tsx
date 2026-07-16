'use client';

import React, { useActionState, useState } from 'react';
import { submitNotifySignup, type NotifySignupState } from '@/src/lib/notifySignup';

const INITIAL_STATE: NotifySignupState = { status: 'idle' };

export const NotifySignup = () => {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(submitNotifySignup, INITIAL_STATE);

  return (
    <div className="text-center mt-8">
      <p className="text-muted text-xs md:text-sm">
        Coming soon: mobile, browser extension, Claude —{' '}
        {state.status === 'success' ? (
          <span className="text-sage-green font-medium">
            thanks, we&rsquo;ll let you know when they launch.
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-deep-ink-blue underline underline-offset-2 hover:opacity-80"
          >
            Get notified
          </button>
        )}
      </p>
      {open && state.status !== 'success' && (
        <form
          action={formAction}
          className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 max-w-sm mx-auto"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            aria-label="Email address"
            className="w-full sm:flex-1 border border-divider rounded px-3 py-2 text-sm bg-white text-primary placeholder:text-muted focus:outline-none focus:border-deep-ink-blue/50"
          />
          <button
            type="submit"
            disabled={pending}
            className="w-full sm:w-auto bg-deep-ink-blue text-white px-4 py-2 rounded font-medium text-sm hover:opacity-90 transition-all disabled:opacity-60"
          >
            {pending ? 'Saving…' : 'Notify me'}
          </button>
        </form>
      )}
      {state.status === 'error' && (
        <p className="text-warm-amber text-xs mt-2">{state.message}</p>
      )}
    </div>
  );
};
