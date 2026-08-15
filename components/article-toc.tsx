'use client';

import { useEffect, useState, useCallback } from 'react';
import { slugify } from '@/lib/slugify';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[`*_~\[\]()]/g, '').trim();
    const id = slugify(text);
    items.push({ id, text, level });
  }

  return items;
}

function TocNav({
  headings,
  activeId,
  onClick,
}: {
  headings: TocItem[];
  activeId: string;
  onClick?: () => void;
}) {
  return (
    <ul className="space-y-0.5">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(h.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                window.history.replaceState(null, '', `#${h.id}`);
              }
              onClick?.();
            }}
            className="block text-sm leading-relaxed transition-all duration-200 py-1 border-l-2 hover:no-underline"
            style={{
              color: activeId === h.id ? '#ff8a75' : 'var(--text-muted)',
              paddingLeft: h.level === 3 ? '1.5rem' : '0.75rem',
              borderLeftColor: activeId === h.id ? '#ff8a75' : 'transparent',
              fontWeight: activeId === h.id ? 500 : 400,
            }}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ArticleTOC({ content }: { content: string }) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    let current = '';
    for (const el of headingElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 140) {
        current = el.id;
      }
    }
    setActiveId(current || headingElements[0].id);
  }, [headings]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (headings.length < 2) return null;

  return (
    <>
      {/* === Mobile: collapsible bar above article (hidden on desktop) === */}
      <div className="xl:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="flex-1 text-left">On this page</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {headings.length} sections
          </span>
        </button>

        {isOpen && (
          <nav className="mt-2 p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <TocNav headings={headings} activeId={activeId} onClick={() => setIsOpen(false)} />
          </nav>
        )}
      </div>

    </>
  );
}
