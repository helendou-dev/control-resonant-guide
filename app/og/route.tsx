// ============================================
// og/route.tsx — Dynamic OG Image Generator
// Powered by @vercel/og (Satori engine)
// Satori requires explicit "display: flex" on
// every container div with children.
//
// Usage: /og?title=...&type=guide&game=...
// ============================================

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { siteConfig } from '@/lib/site-config';

export const runtime = 'edge';

const typeColors: Record<string, [string, string]> = {
  guide: ['#2563eb', '#1d4ed8'],
  news: ['#dc2626', '#b91c1c'],
  tierlist: ['#7c3aed', '#6d28d9'],
  comparison: ['#059669', '#047857'],
  default: ['#0f172a', '#1e293b'],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Control Resonant Wiki';
  const type = searchParams.get('type') || 'default';
  const game = searchParams.get('game') || '';

  const [gradientStart, gradientEnd] = typeColors[type] || typeColors.default;

  const displayTitle = title.length > 90 ? title.slice(0, 87) + '...' : title;
  const lines = displayTitle.length > 50
    ? [displayTitle.slice(0, Math.floor(displayTitle.length / 2)), displayTitle.slice(Math.floor(displayTitle.length / 2))]
    : [displayTitle];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
          padding: '80px 100px',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Type badge */}
        {type !== 'default' && (
          <div
            style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 12,
              padding: '8px 24px',
              marginBottom: 32,
              color: 'white',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.08em',
            }}
          >
            {type === 'guide'
              ? '📖 GUIDE'
              : type === 'news'
                ? '📰 NEWS'
                : type === 'tierlist'
                  ? '🏆 TIER LIST'
                  : type === 'comparison'
                    ? '⚖️ VS'
                    : '🎮 GAMING'}
          </div>
        )}

        {/* Title lines */}
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              color: 'white',
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              maxWidth: '1000px',
            }}
          >
            {line.trim()}
          </div>
        ))}

        {/* Game name */}
        {game && (
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 28,
              marginTop: 20,
              fontWeight: 500,
            }}
          >
            🎮 {game}
          </div>
        )}

        {/* Bottom row: brand + URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 100,
            right: 100,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            🎮 Control Resonant Wiki
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.45)',
              fontSize: 20,
            }}
          >
            {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
