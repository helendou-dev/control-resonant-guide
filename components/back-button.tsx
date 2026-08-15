'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface BackButtonProps {
  fallbackHref: string;
  label?: string;
  variant?: 'pill' | 'icon' | 'text';
}

export default function BackButton({
  fallbackHref,
  label = 'Back',
  variant = 'pill',
}: BackButtonProps) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const referrer = document.referrer;
    const isSameOrigin =
      referrer &&
      (() => {
        try {
          return new URL(referrer).origin === window.location.origin;
        } catch {
          return false;
        }
      })();
    setCanGoBack(Boolean(isSameOrigin && window.history.length > 1));
  }, []);

  const handleClick = useCallback(() => {
    if (canGoBack) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }, [canGoBack, fallbackHref, router]);

  const pillStyle: React.CSSProperties = {
    background: 'rgba(255,90,69,0.08)',
    border: '1px solid rgba(255,90,69,0.2)',
    color: '#ff8a75',
  };

  const textStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
  };

  const iconOnlyStyle: React.CSSProperties = {
    background: 'rgba(255,90,69,0.08)',
    border: '1px solid rgba(255,90,69,0.2)',
    color: '#ff8a75',
    padding: '0.4rem',
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-lg transition-all duration-200 hover:opacity-80"
      style={
        variant === 'pill'
          ? { ...pillStyle, padding: '0.4rem 0.6rem' }
          : variant === 'icon'
          ? iconOnlyStyle
          : textStyle
      }
      aria-label={label}
      title={label}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
