'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MainError({
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
    <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-3xl md:text-4xl text-warm-900 mb-4">
          Something went wrong
        </h1>
        <p className="body-lg mb-10">
          An unexpected error stopped this page from loading. Trying again often
          resolves it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={() => reset()} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
        {error.digest && (
          <p className="text-xs text-warm-500 mt-8">
            Reference code: <span className="font-mono">{error.digest}</span>
          </p>
        )}
      </div>
    </div>
  );
}
