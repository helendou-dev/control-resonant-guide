// ============================================
// buy-button.tsx — Affiliate purchase card for MDX articles
// IMPORTANT: only string props (MDX-serialization safe; array/object
// props break production prerender — see project memory).
// ============================================

import { affiliateLinks } from '@/lib/affiliate-links';

const AMAZON_LABELS: Record<string, string> = {
  ps5: 'Pre-Order on Amazon — PS5 (Steelbook)',
  xbox: 'Pre-Order on Amazon — Xbox Series X (Steelbook)',
};

const REL = 'nofollow sponsored noopener noreferrer';

export function BuyButton({
  platform,
  note,
}: {
  platform: 'ps5' | 'xbox' | 'both' | 'pc';
  note?: string;
}) {
  const platforms = platform === 'both' ? ['ps5', 'xbox'] : [platform];
  const gmgUrl = affiliateLinks.gmg.pc;

  return (
    <div
      className="my-8 rounded-xl p-5"
      style={{
        background: 'var(--bg-surface, rgba(255,255,255,0.03))',
        border: '1px solid rgba(255,90,69,0.25)',
      }}
    >
      <div
        className="text-sm font-bold uppercase tracking-wider mb-3"
        style={{ color: 'var(--text-muted, #9ca3af)' }}
      >
        Where to Buy
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {platforms.map((p) => (
          <a
            key={p}
            href={affiliateLinks.amazon[p as 'ps5' | 'xbox']}
            target="_blank"
            rel={REL}
            className="flex-1 text-center px-5 py-3 rounded-lg font-semibold text-sm transition-transform hover:scale-[1.02]"
            style={{ background: '#ff9900', color: '#111' }}
          >
            {AMAZON_LABELS[p]}
          </a>
        ))}
        {gmgUrl && (
          <a
            href={gmgUrl}
            target="_blank"
            rel={REL}
            className="flex-1 text-center px-5 py-3 rounded-lg font-semibold text-sm transition-transform hover:scale-[1.02]"
            style={{ background: '#7F77DD', color: '#fff' }}
          >
            Buy PC Key on Green Man Gaming
          </a>
        )}
      </div>

      <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-muted, #9ca3af)' }}>
        {note ||
          'Physical Steelbook Edition ships October 15, 2026. Want to play on day one? Digital Standard / Deluxe editions launch September 24 — with 48-hour PS5 early access from September 22 on the PlayStation Store, Xbox Store, Steam, and Epic.'}
        {' '}As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </div>
  );
}
