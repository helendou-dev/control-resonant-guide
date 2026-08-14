import Link from 'next/link';
import Image from 'next/image';
import type { ContentListItem } from '@/lib/content';

const TYPE_EMOJI: Record<string, string> = {
  guide: '📖',
  tier_list: '🏆',
  comparison: '⚖️',
  error_fix: '🔧',
  patch_notes: '📋',
  news: '📰',
  game_release: '🚀',
};

function getTypeEmoji(type: string) {
  return TYPE_EMOJI[type] || '🎮';
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

/**
 * Related Articles section — shows up to 4 articles from the same game or same type.
 */
export default function RelatedArticles({
  current,
  articles,
}: {
  current: { game: string; slug: string; type: string };
  articles: ContentListItem[];
}) {
  // Filter: exclude current article, prioritize same game, then same type, then fill with any
  const sameGame = articles.filter(
    (a) => a.game === current.game && a.slug !== current.slug
  );
  const sameType = articles.filter(
    (a) => a.game !== current.game && a.type === current.type && a.slug !== current.slug
  );
  const others = articles.filter(
    (a) => a.game !== current.game && a.type !== current.type && a.slug !== current.slug
  );

  const related = [...sameGame, ...sameType, ...others].slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        🔗 Related Articles
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {related.map((item) => {
          const image = item.image;
          return (
            <Link
              key={`${item.game}/${item.slug}`}
              href={item.url}
              className="group block rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex h-full">
                {/* Thumbnail */}
                {image && (
                  <div className="w-28 sm:w-32 flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 112px, 128px"
                    />
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to right, rgba(17,17,24,0.3), transparent)',
                    }} />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-4 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs">{getTypeEmoji(item.type)}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold line-clamp-2 leading-snug transition-colors group-hover:text-purple-400"
                    style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs line-clamp-1 mt-1.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
