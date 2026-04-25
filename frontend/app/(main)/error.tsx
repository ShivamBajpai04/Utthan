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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="heading-2 mb-4">Something went wrong</h1>
        <p className="prose-custom mb-8">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <button type="button" onClick={() => reset()} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  );
}
