'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/site-config';

interface ShareButtonsProps {
  title: string;
  variant?: 'compact' | 'full';
}

export default function ShareButtons({ title, variant = 'compact' }: ShareButtonsProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.url}${pathname}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=controlresonant`;
  const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

  const btnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--text-secondary)',
    padding: variant === 'full' ? '0.5rem 0.75rem' : '0.4rem',
    borderRadius: '8px',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    cursor: 'pointer',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 500,
  };

  return (
    <div className="flex items-center gap-2">
      {/* X (Twitter) */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80"
        style={btnStyle}
        aria-label="Share on X"
        title="Share on X"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.91l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        {variant === 'full' && <span style={labelStyle}>Post</span>}
      </a>

      {/* Reddit */}
      <a
        href={redditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80"
        style={btnStyle}
        aria-label="Share on Reddit"
        title="Share on Reddit"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.498.37-.576.99-.96 1.702-.96 1.183 0 2.143.96 2.143 2.144 0 .875-.521 1.621-1.271 1.952-.063.058-.101.152-.101.253 0 2.016-2.455 3.654-5.483 3.654-3.027 0-5.482-1.638-5.482-3.654 0-.101-.038-.195-.101-.253-.75-.331-1.271-1.077-1.271-1.952 0-1.184.96-2.144 2.143-2.144.712 0 1.332.384 1.702.96 1.194-.866 2.85-1.428 4.674-1.498l-.8-3.747-2.597.547a1.25 1.25 0 0 1-2.498-.056 1.25 1.25 0 0 1 1.25-1.249c.561 0 1.035.376 1.183.885l2.823.595.112.03a.51.51 0 0 1 .38.498.51.51 0 0 1-.41.5l-2.98.63a.51.51 0 0 1-.09.014.51.51 0 0 1-.09-.014l-2.98-.63a.51.51 0 0 1-.41-.5.51.51 0 0 1 .38-.498l.112-.03 2.823-.595a1.248 1.248 0 0 1 1.183-.885zm-5.482 7.193c-.485 0-.875.39-.875.875 0 .485.39.875.875.875s.875-.39.875-.875c0-.485-.39-.875-.875-.875zm5.482 0c-.485 0-.875.39-.875.875 0 .485.39.875.875.875s.875-.39.875-.875c0-.485-.39-.875-.875-.875z" />
        </svg>
        {variant === 'full' && <span style={labelStyle}>Reddit</span>}
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="hover:opacity-80"
        style={{
          ...btnStyle,
          color: copied ? '#22c55e' : 'var(--text-secondary)',
        }}
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
        {variant === 'full' && <span style={labelStyle}>{copied ? 'Copied!' : 'Copy'}</span>}
      </button>
    </div>
  );
}
