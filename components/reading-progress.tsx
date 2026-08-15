'use client';

/**
 * ReadingProgressBar — Sticky top-of-page progress indicator
 *
 * Shows a thin gradient bar that fills left-to-right as the user scrolls
 * through the article. Gamifies reading and reduces abandonment.
 *
 * Data-driven rationale: GA4 shows only ~10.7% of users scroll to 90%+.
 * A visible progress bar can lift completion rates 15-30% (per content UX studies).
 */

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function calc() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      setProgress(pct);
    }

    calc();
    window.addEventListener('scroll', calc, { passive: true });
    return () => window.removeEventListener('scroll', calc);
  }, []);

  if (progress === 0) return null; // Hidden at top, fades in on first scroll

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      style={{ height: '3px' }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #ef4444, #ff8a75, #fbbf24)',
          boxShadow: '0 0 8px rgba(255,90,69,0.4)',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}
