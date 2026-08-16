// ============================================
// [game]/page.tsx — Individual Game Hub Page
// Dark gaming theme — 2026 redesign
// ============================================

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { listAllContent, ContentListItem } from '@/lib/content';
import { ALL_GAMES } from '@/lib/game-data';
import { siteConfig } from '@/lib/site-config';

export function generateStaticParams() {
  const allArticles = listAllContent();
  const games = [...new Set(allArticles.map((a) => a.game))];
  return games.map((game) => ({ game }));
}

export async function generateMetadata({
  params,
}: {
  params: { game: string };
}): Promise<Metadata> {
  const meta = ALL_GAMES[params.game];
  if (!meta) return {};

  return {
    title: { absolute: `${meta.name} Guides: Weapons, Builds & News (2026)` },
    description: meta.description,
    alternates: { canonical: `${siteConfig.url}/games/${params.game}` },
    openGraph: {
      title: `${meta.name} — Control Resonant Guide`,
      description: meta.description,
      url: `${siteConfig.url}/games/${params.game}`,
      ...(meta.headerImage ? { images: [{ url: meta.headerImage, width: 1200, height: 630 }] } : {}),
    },
  };
}

const TYPE_BADGE: Record<string, string> = {
  guide: 'type-badge-guide',
  tier_list: 'type-badge-tier',
  comparison: 'type-badge-comparison',
  error_fix: 'type-badge-fix',
  patch_notes: 'type-badge-patch',
  news: 'type-badge-news',
  game_release: 'type-badge-release',
  review_roundup: 'type-badge-guide',
};

const TYPE_LABEL: Record<string, string> = {
  guide: '📖 Guide',
  tier_list: '🏆 Tier List',
  comparison: '⚖️ Compare',
  error_fix: '🔧 Fix',
  patch_notes: '📋 Patch',
  news: '📰 News',
  game_release: '🚀 Release',
  review_roundup: '📰 Review Roundup',
};

const TYPE_ICON: Record<string, string> = {
  guide: '📖',
  tier_list: '🏆',
  comparison: '⚖️',
  error_fix: '🔧',
  patch_notes: '📋',
  news: '📰',
  game_release: '🚀',
  review_roundup: '📰',
};

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function ArticleCard({ item }: { item: ContentListItem }) {
  const hasImage = !!item.image;
  const date = formatDate(item.date);
  const badge = TYPE_BADGE[item.type] || 'type-badge-guide';
  const label = TYPE_LABEL[item.type] || '🎮 Article';

  return (
    <Link href={item.url} className="block h-full group">
      <div className="glow-card h-full flex flex-col">
        {hasImage ? (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={item.image!}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,24,0.6), transparent 50%)' }} />
            <span className={`type-badge ${badge} absolute top-3 left-3`}>{label}</span>
          </div>
        ) : (
          <>
            <div className="h-1" style={{
              background: `linear-gradient(90deg, var(--accent-purple), var(--accent-blue))`,
            }} />
            <div className="p-5 flex flex-col flex-1">
              <span className={`type-badge ${badge} mb-3 self-start`}>{label}</span>
              <h3 className="font-bold text-base leading-snug mb-2 flex-1 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.description}
              </p>
              <div className="flex items-center gap-3 text-xs pt-3 mt-auto" style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {date && <span>{date}</span>}
                {item.tags.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    {item.tags[0]}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {hasImage && (
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-bold text-base leading-snug mb-2 flex-1 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
              {item.title}
            </h3>
            <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {item.description}
            </p>
            <div className="flex items-center gap-3 text-xs pt-3 mt-auto" style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {date && <span>{date}</span>}
              {item.tags.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {item.tags[0]}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function GameHubPage({
  params,
}: {
  params: { game: string };
}) {
  const meta = ALL_GAMES[params.game];
  if (!meta) notFound();

  const allArticles = listAllContent();
  const gameArticles = allArticles.filter((a) => a.game === params.game);

  // VideoGame JSON-LD — rich result for game knowledge panel
  const videoGameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: meta.name,
    description: meta.description,
    url: `${siteConfig.url}/games/${params.game}`,
    image: `${siteConfig.url}${meta.headerImage}`,
    ...(meta.releaseDate ? { datePublished: meta.releaseDate } : {}),
    genre: meta.tags,
    playMode: 'https://schema.org/SinglePlayer',
    applicationCategory: 'Game',
    ...(meta.platforms
      ? {
          gamePlatform: meta.platforms,
          operatingSystem: meta.platforms.join(', '),
        }
      : {}),
    developer: { '@type': 'Organization', name: meta.developer },
    publisher: { '@type': 'Organization', name: meta.publisher },
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Games', item: `${siteConfig.url}/games` },
      { '@type': 'ListItem', position: 3, name: meta.name, item: `${siteConfig.url}/games/${params.game}` },
    ],
  };

  // Stats by type
  const typeCounts: Record<string, number> = {};
  gameArticles.forEach((a) => {
    typeCounts[a.type] = (typeCounts[a.type] || 0) + 1;
  });

  return (
    <div>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ===== Hero Banner ===== */}
      <section className="relative overflow-hidden" style={{ background: 'var(--bg-deep)' }}>
        {/* Background image */}
        {meta.headerImage && (
          <div className="absolute inset-0">
            <Image
              src={meta.headerImage}
              alt={meta.name}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, var(--bg-deep) 0%, rgba(6,6,11,0.5) 40%, rgba(6,6,11,0.3) 100%)',
            }} />
          </div>
        )}

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6 flex items-center gap-2 flex-wrap" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/games" className="hover:text-white transition-colors">Games</Link>
            <span>/</span>
            <span className="text-white">{meta.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            {meta.name}
          </h1>

          <p className="text-base md:text-lg max-w-2xl mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {meta.description}
          </p>

          {/* Meta tags */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,90,69,0.12)', color: '#ff8a75', border: '1px solid rgba(255,90,69,0.2)' }}>
              {meta.releaseYear}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(59,130,246,0.12)', color: '#fbbf24', border: '1px solid rgba(59,130,246,0.2)' }}>
              {meta.developer}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
              {meta.publisher}
            </span>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-5">
            <div className="text-center px-5 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{gameArticles.length}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Articles</div>
            </div>
            {/* Type counts */}
            {Object.entries(typeCounts).sort(([, a], [, b]) => b - a).slice(0, 4).map(([type, count]) => (
              <div key={type} className="text-center px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{count}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {TYPE_ICON[type] || '🎮'} {TYPE_LABEL[type]?.split(' ').pop() || type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-deep))' }} />
      </section>

      {/* ===== Article Sections ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {gameArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🕹️</div>
            <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>No articles yet</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Content for this game is coming soon</p>
          </div>
        ) : (
          <>
            {/* Group articles by type for organized display */}
            {(() => {
              // Order: guide, tier_list, comparison, error_fix, patch_notes, news, game_release
              const typeOrder = ['guide', 'tier_list', 'comparison', 'error_fix', 'patch_notes', 'news', 'game_release'];

              // Get the "featured" article — the one with highest reading time
              const featured = [...gameArticles].sort((a, b) => (b.readingTime || 0) - (a.readingTime || 0))[0];

              // Build type groups — only include types present in this game
              const typeGroups: { type: string; label: string; icon: string; articles: typeof gameArticles }[] = [];
              const seen = new Set<string>();

              for (const type of typeOrder) {
                const articles = gameArticles.filter((a) => a.type === type);
                if (articles.length > 0) {
                  typeGroups.push({
                    type,
                    label: TYPE_LABEL[type] || type,
                    icon: TYPE_ICON[type] || '🎮',
                    articles,
                  });
                  seen.add(type);
                }
              }

              // Any remaining types not in typeOrder
              gameArticles.forEach((a) => {
                if (!seen.has(a.type)) {
                  typeGroups.push({
                    type: a.type,
                    label: a.type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
                    icon: '🎮',
                    articles: [a],
                  });
                  seen.add(a.type);
                }
              });

              return typeGroups.map((group, gi) => (
                <div key={group.type} style={gi > 0 ? { marginTop: '3rem' } : {}}>
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xl" role="img" aria-label={group.type}>{group.icon}</span>
                    <h2 className="text-lg md:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {group.label}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {group.articles.length}
                    </span>
                    {/* Highlight featured article */}
                    {group.articles.some((a) => a.slug === featured?.slug && a.game === featured?.game) && (
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}>
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {group.articles.map((item) => (
                      <ArticleCard key={`${item.game}/${item.slug}`} item={item} />
                    ))}
                  </div>
                </div>
              ));
            })()}
          </>
        )}
      </section>

      {/* ===== Key Pages Grid ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
        <div className="pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            📖 Essential Control Resonant Pages
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            The quickest routes into the guide — from pre-order to day-one
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { href: '/games/control-resonant/release-date', title: 'Release Date & Platforms', desc: 'September 24, 2026 on PS5, Xbox, PC & Mac' },
              { href: '/games/control-resonant/preorder-guide', title: 'Pre-Order Guide', desc: 'Standard vs Deluxe, 48-hour PS5 early access' },
              { href: '/games/control-resonant/aberrant-weapon-forms', title: 'Aberrant Weapon Forms', desc: 'All five shapeshifting forms explained' },
              { href: '/games/control-resonant/beginner-guide', title: 'Beginner Guide', desc: "Don't know Control? Start here" },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block p-5 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
              >
                <h3 className="font-bold text-sm mb-2 group-hover:text-purple-400 transition-colors"
                  style={{ color: 'var(--text-primary)' }}>
                  {card.title}
                </h3>
                <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const revalidate = 3600;
