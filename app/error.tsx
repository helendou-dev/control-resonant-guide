'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg-deep)' }}
    >
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Something went wrong
        </h1>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          An unexpected error occurred while loading this page. Try again, or head
          back to safety.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-ghost">
            Back to Home
          </Link>
        </div>
        {error.digest && (
          <p className="text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
