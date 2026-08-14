import Link from 'next/link';
import Image from 'next/image';
import { listAllContent, type ContentListItem } from '@/lib/content';
import { getGameCard } from '@/lib/game-data';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'All Games — Control Resonant Guide',
  description: 'Browse all game guides, tier lists, patch notes, and news on Control Resonant Guide.',
  alternates: { canonical: `${siteConfig.url}/games` },
  openGraph: {
    title: 'All Games — Control Resonant Guide',
    description: 'Browse all game guides, tier lists, patch notes, and news on Control Resonant Guide.',
    url: `${siteConfig.url}/games`,
  },
};

const TYPE_BADGE: Record<string, string> = {
  guide: 'type-badge-guide',
  tier_list: 'type-badge-tier',
  comparison: 'type-badge-comparison',
  error_fix: 'type-badge-fix',
  patch_notes: 'type-badge-patch',
  news: 'type-badge-news',
  game_release: 'type-badge-release',
};


export default function GamesPage() {
  const allArticles = listAllContent();

  // Group by game
  const gameMap = new Map<string, ContentListItem[]>();
  for (const item of allArticles) {
    if (!gameMap.has(item.game)) gameMap.set(item.game, []);
    gameMap.get(item.game)!.push(item);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
          🎮 Games
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
          All Games
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {allArticles.length} articles across {gameMap.size} games
        </p>
      </div>

      {Array.from(gameMap.entries()).map(([game, articles]) => {
        const meta = getGameCard(game);

        return (
          <section key={game} className="mb-12">
            <div className="flex items-center gap-4 mb-5 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {meta?.image && (
                <Link href={`/games/${game}`} className="block flex-shrink-0">
                  <Image src={meta.image} alt={meta.name || game} width={56} height={40} className="rounded-lg object-cover transition-transform hover:scale-105" />
                </Link>
              )}
              <div>
                <Link href={`/games/${game}`} className="hover:text-purple-400 transition-colors">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {meta?.name || game.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                  </h2>
                </Link>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {articles.length} article{articles.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((item) => (
                <div key={item.slug} className="group">
                  <Link
                    href={item.url}
                    className="block rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                  {item.image ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px" />
                      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(17,17,24,0.4), transparent 50%)' }} />
                      <span className={`type-badge ${TYPE_BADGE[item.type] || 'type-badge-guide'} absolute top-3 left-3 z-20`}>
                        {item.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ) : (
                    <div className="p-5">
                      <span className={`type-badge ${TYPE_BADGE[item.type] || 'type-badge-guide'} mb-2`}>
                        {item.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                  )}
                  <div className={item.image ? 'p-4' : 'px-5 pb-5'}>
                    <h3 className="font-semibold line-clamp-2 transition-colors duration-200"
                      style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm line-clamp-1 mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs mt-2 pt-2" style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      {item.readingTime && <span>⏱ {item.readingTime} min</span>}
                      {item.tags.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          {item.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                </div>
              ))}
            </div>

            {/* View all link to game hub */}
            <div className="mt-4 text-right">
              <Link
                href={`/games/${game}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white"
                style={{ color: 'var(--text-muted)' }}
              >
                View all {articles.length} articles
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
