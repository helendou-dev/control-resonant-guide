'use client';

import { useEffect, useState, useCallback } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export default function DesktopTOC({ headings, extraFooter }: { headings: TocItem[]; extraFooter?: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string>('');

  const handleScroll = useCallback(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    let current = '';
    for (const el of els) {
      if (el.getBoundingClientRect().top <= 140) current = el.id;
    }
    setActiveId(current || els[0].id);
  }, [headings]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-28">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
          On this page
        </h4>
        <nav>
          <ul className="space-y-0.5">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState(null, '', `#${h.id}`);
                  }}
                  className="block text-sm leading-relaxed transition-all duration-200 py-1 border-l-2 hover:no-underline"
                  style={{
                    color: activeId === h.id ? '#a78bfa' : 'var(--text-muted)',
                    paddingLeft: h.level === 3 ? '1.5rem' : '0.75rem',
                    borderLeftColor: activeId === h.id ? '#a78bfa' : 'transparent',
                    fontWeight: activeId === h.id ? 500 : 400,
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {extraFooter && (
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {extraFooter}
          </div>
        )}
      </div>
    </aside>
  );
}
