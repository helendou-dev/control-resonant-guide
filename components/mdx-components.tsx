// ============================================
// mdx-components.tsx — Custom MDX Components
// Dark gaming theme — 2026 redesign
// ============================================

import Image from 'next/image';

import React from 'react';
import { slugify } from '@/lib/slugify';
import { BuyButton } from '@/components/buy-button';

/** Extract plain text from React children for slug generation */
function childrenToText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join('');
  if (React.isValidElement(children) && children.props?.children) {
    return childrenToText(children.props.children);
  }
  return '';
}

// ─── Callout: Pro Tip ───────────────────────
export function ProTip({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="callout callout-pro" role="note">
      <span className="callout-label">💡 Pro Tip{title ? `: ${title}` : ''}</span>
      <div className="text-sm leading-relaxed mt-1">{children}</div>
    </div>
  );
}

// ─── Callout: Common Mistake ────────────────
export function CommonMistake({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="callout callout-mistake" role="alert">
      <span className="callout-label">⚠️ Common Mistake{title ? `: ${title}` : ''}</span>
      <div className="text-sm leading-relaxed mt-1">{children}</div>
    </div>
  );
}

// ─── Callout: Info Box ──────────────────────
export function InfoBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="callout callout-info" role="note">
      {title && <span className="callout-label">{title}</span>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// ─── FAQ Section ────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-section my-8">
      <h2 className="text-2xl font-bold mb-4 pb-2 scroll-mt-24"
        style={{ color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        id="faq">
        Frequently Asked Questions
      </h2>
      {items.map((item, i) => (
        <details key={i}>
          <summary>{item.q}</summary>
          <div className="faq-answer">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

// ─── Comparison Table ───────────────────────
interface ComparisonColumn {
  key: string;
  label: string;
}

interface ComparisonRow {
  [key: string]: string;
}

export function ComparisonTable({
  columns,
  rows,
}: {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="comparison-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Step-by-Step ───────────────────────────
interface Step {
  title: string;
  desc: string;
}

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-4 my-6 pl-0 list-none">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mt-0.5"
            style={{ background: 'rgba(255,90,69,0.15)', color: '#ff8a75' }}>
            {i + 1}
          </span>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>{step.title}</strong>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── Game Rating ────────────────────────────
export function GameRating({
  score,
  source,
  platforms,
}: {
  score: string | number;
  source?: string;
  platforms?: string;
}) {
  const numScore = typeof score === 'string' ? parseFloat(score) : score;
  const isHigh = numScore >= 90;
  const isGood = numScore >= 75;
  const color = isHigh ? '#22c55e' : isGood ? '#eab308' : '#ef4444';
  const bg = isHigh ? 'rgba(34,197,94,0.08)' : isGood ? 'rgba(234,179,8,0.08)' : 'rgba(239,68,68,0.08)';
  const borderColor = isHigh ? 'rgba(34,197,94,0.2)' : isGood ? 'rgba(234,179,8,0.2)' : 'rgba(239,68,68,0.2)';

  return (
    <div
      className="my-6 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
      style={{ background: bg, border: `1px solid ${borderColor}` }}
    >
      <div className="flex items-center gap-3">
        <span
          className="text-3xl font-extrabold"
          style={{ color }}
        >
          {score}
        </span>
        <div className="flex flex-col">
          {source && (
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {source}
            </span>
          )}
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((i) => {
              const filled = (numScore / 100) * 5 >= i;
              return (
                <span key={i} style={{ color: filled ? color : 'rgba(255,255,255,0.1)' }}>
                  ★
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {platforms && (
        <div className="sm:ml-auto text-sm" style={{ color: 'var(--text-secondary)' }}>
          Available on: <span style={{ color: 'var(--text-primary)' }}>{platforms}</span>
        </div>
      )}
    </div>
  );
}

// ─── Platform Tag ───────────────────────────
export function PlatformTag({ platform }: { platform: string }) {
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    PC: { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8', border: 'rgba(100,116,139,0.2)' },
    PS5: { bg: 'rgba(59,130,246,0.12)', color: '#fbbf24', border: 'rgba(59,130,246,0.2)' },
    PS4: { bg: 'rgba(59,130,246,0.08)', color: '#93c5fd', border: 'rgba(59,130,246,0.15)' },
    Xbox: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.2)' },
    Switch: { bg: 'rgba(244,63,94,0.12)', color: '#fb7185', border: 'rgba(244,63,94,0.2)' },
    Mobile: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
    Steam: { bg: 'rgba(99,102,241,0.12)', color: '#818cf8', border: 'rgba(99,102,241,0.2)' },
  };

  const c = colors[platform] || { bg: 'rgba(100,116,139,0.08)', color: '#94a3b8', border: 'rgba(100,116,139,0.15)' };
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {platform}
    </span>
  );
}

// ─── Breadcrumb Schema ──────────────────────
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: { '@id': item.url },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Aggregate: All custom MDX components ───
export const mdxComponents = {
  ProTip,
  CommonMistake,
  InfoBox,
  FaqSection,
  ComparisonTable,
  StepList,
  PlatformTag,
  GameRating,
  BuyButton,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = childrenToText(props.children);
    const id = props.id || (text ? slugify(text) : undefined);
    return (
      <h2 id={id} style={{
        color: 'var(--text-primary)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }} className="mt-12 mb-4 text-2xl font-bold pb-2 scroll-mt-24" {...props} />
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = childrenToText(props.children);
    const id = props.id || (text ? slugify(text) : undefined);
    return (
      <h3 id={id} style={{ color: 'var(--text-primary)' }} className="mt-8 mb-3 text-xl font-semibold scroll-mt-24" {...props} />
    );
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-left" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th style={{
      color: 'var(--text-primary)',
      background: 'var(--bg-surface)',
      borderBottom: '2px solid rgba(255,255,255,0.1)',
    }} className="px-4 py-3 text-sm font-semibold" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td style={{
      color: 'var(--text-secondary)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }} className="px-4 py-3 text-sm" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const src = props.src || '';
    // Use next/image for local images (optimized), fallback to native <img> for external URLs
    if (src.startsWith('/')) {
      return (
        <span className="block rounded-xl my-6 mx-auto max-w-full overflow-hidden relative" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          <Image
            src={src}
            alt={props.alt || ''}
            width={1408}
            height={704}
            className="w-full h-auto"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
          />
        </span>
      );
    }
    return (
      <img className="rounded-xl my-6 mx-auto max-w-full" loading="lazy"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
        {...props} alt={props.alt || ''} />
    );
  },
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      style={{ color: '#ff8a75', textDecorationColor: 'rgba(255,90,69,0.3)' }}
      className="underline hover:decoration-purple-400 transition-colors"
      {...props}
      {...(props.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 pl-5 py-3 rounded-r-lg italic"
      style={{
        background: 'rgba(255,90,69,0.06)',
        borderColor: 'rgba(255,90,69,0.3)',
        color: 'var(--text-secondary)',
      }}
      {...props} />
  ),
};
