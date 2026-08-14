import Link from 'next/link';
import Image from 'next/image';
import { listAllContent } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'Game Guides — Control Resonant Guide',
  description: 'Expert game guides, walkthroughs, tips and tricks for PC, console, and mobile games.',
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function GuidesPage() {
  const allArticles = listAllContent();
  const guides = allArticles.filter((a) => a.type === 'guide');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>
          📖 Guides
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
          Game Guides
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {guides.length} in-depth guides to help you master your favorite games
        </p>
      </div>

      {guides.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📖</div>
          <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>No guides yet</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((item) => (
            <Link
              key={`${item.game}/${item.slug}`}
              href={item.url}
              className="glow-card block group"
            >
              {item.image ? (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,24,0.5), transparent 40%)" }} />
                  <span className={`type-badge type-badge-guide absolute top-3 left-3`}>📖 Guide</span>
                </div>
              ) : (
                <div className="h-1" style={{ background: "linear-gradient(90deg, #10b981, #34d399)" }} />
              )}
              <div className="p-5">
                {!item.image && <span className="type-badge type-badge-guide">📖 Guide</span>}
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
                      <span key={tag} className="px-2 py-0.5 rounded-full"
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
