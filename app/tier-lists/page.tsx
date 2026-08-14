import Link from 'next/link';
import Image from 'next/image';
import { listAllContent } from '@/lib/content';

export const metadata = {
  title: 'Tier Lists — Control Resonant Wiki',
  description: 'Definitive game tier lists: best characters, weapons, builds, and more. Updated with latest patches.',
  alternates: { canonical: 'https://controlresonantguide.com/tier-lists' },
};

export default function TierListsPage() {
  const allArticles = listAllContent();
  const tierLists = allArticles.filter((a) => a.type === 'tier_list');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}>
          🏆 Tier Lists
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
          Tier Lists
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {tierLists.length} definitive rankings to help you pick the best
        </p>
      </div>

      {tierLists.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🏆</div>
          <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>No tier lists yet</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tierLists.map((item) => (
            <Link key={`${item.game}/${item.slug}`} href={item.url} className="glow-card block group">
              {item.image ? (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,24,0.5), transparent 40%)" }} />
                  <span className={`type-badge type-badge-tier absolute top-3 left-3`}>🏆 Tier List</span>
                </div>
              ) : (
                <div className="h-1" style={{ background: "linear-gradient(90deg, #8b5cf6, #a78bfa)" }} />
              )}
              <div className="p-5">
                {!item.image && <span className="type-badge type-badge-tier">🏆 Tier List</span>}
                <h3 className="mt-3 text-lg font-bold line-clamp-2 transition-colors duration-200"
                  style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
                {item.tags.length > 0 && (
                  <div className="flex items-center gap-3 text-xs mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>
                    {item.readingTime && <span>⏱ {item.readingTime} min</span>}
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
