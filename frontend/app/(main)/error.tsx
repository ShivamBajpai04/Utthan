'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-5">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-3xl text-warm-900 mb-4">Something went wrong</h1>
        <p className="body-lg mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button type="button" onClick={() => reset()} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  );
}
