// ============================================
// [game]/[slug]/page.tsx — Dynamic MDX Page
// Dark gaming theme — 2026 redesign
// P1-P5: TOC, Related Articles, Author Bio, Platform Badges, Reading Time
// ============================================

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentByPath, listAllContent, readingTime, generatePageJsonLd, generateFaqSchema } from '@/lib/content';
import { ALL_GAMES } from '@/lib/game-data';
import { slugify } from '@/lib/slugify';
import { siteConfig } from '@/lib/site-config';
import { mdxComponents, BreadcrumbJsonLd } from '@/components/mdx-components';
import ArticleTOC from '@/components/article-toc';
import BackButton from '@/components/back-button';
import ShareButtons from '@/components/share-buttons';
import DesktopTOC from '@/components/desktop-toc';
import RelatedArticles from '@/components/related-articles';
import AuthorBio from '@/components/author-bio';
import AnalyticsTracker from '@/components/analytics-tracker';
import ReadingProgressBar from '@/components/reading-progress';

export function generateStaticParams() {
  const pages = listAllContent();
  return pages.map((p) => ({ game: p.game, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { game: string; slug: string };
}): Promise<Metadata> {
  const content = getContentByPath(params.game, params.slug);
  if (!content) return {};

  const { frontmatter } = content;
  const url = `${siteConfig.url}/games/${params.game}/${params.slug}`;

  return {
    title: { absolute: frontmatter.title },
    description: frontmatter.description || `Guide and tips for ${params.game.replace(/-/g, ' ')}`,
    keywords: frontmatter.keywords || frontmatter.tags?.join(', '),
    alternates: { canonical: frontmatter.canonicalUrl || url },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || '',
      url,
      type: 'article',
      publishedTime: frontmatter.publishDate || frontmatter.date,
      modifiedTime: frontmatter.modifiedDate || frontmatter.publishDate || frontmatter.date,
      ...(frontmatter.image || frontmatter.ogImage || frontmatter.headerImage
        ? { images: [{ url: (frontmatter.image || frontmatter.ogImage || frontmatter.headerImage) as string, width: 1200, height: 630 }] }
        : {
            images: [{
              url: `/og?title=${encodeURIComponent(frontmatter.title)}&type=${encodeURIComponent(frontmatter.type || 'default')}&game=${encodeURIComponent(frontmatter.game || params.game.replace(/-/g, ' '))}`,
              width: 1200, height: 630, alt: frontmatter.title,
            }],
          }),
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description || '',
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
};

const TYPE_LABEL: Record<string, string> = {
  guide: '📖 Guide',
  tier_list: '🏆 Tier List',
  comparison: '⚖️ Comparison',
  error_fix: '🔧 Fix Guide',
  patch_notes: '📋 Patch Notes',
  news: '📰 News',
  game_release: '🚀 Launch Guide',
};

const PLATFORM_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  PC: { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8', border: 'rgba(100,116,139,0.2)' },
  PS5: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
  PS4: { bg: 'rgba(59,130,246,0.08)', color: '#93c5fd', border: 'rgba(59,130,246,0.15)' },
  Xbox: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.2)' },
  Switch: { bg: 'rgba(244,63,94,0.12)', color: '#fb7185', border: 'rgba(244,63,94,0.2)' },
  Steam: { bg: 'rgba(99,102,241,0.12)', color: '#818cf8', border: 'rgba(99,102,241,0.2)' },
};

function PlatformBadge({ platform }: { platform: string }) {
  const c = PLATFORM_COLORS[platform] || { bg: 'rgba(100,116,139,0.08)', color: '#94a3b8', border: 'rgba(100,116,139,0.15)' };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {platform}
    </span>
  );
}

export default async function GameContentPage({
  params,
}: {
  params: { game: string; slug: string };
}) {
  const content = getContentByPath(params.game, params.slug);
  if (!content) notFound();

  const { frontmatter } = content;
  const url = `${siteConfig.url}/games/${params.game}/${params.slug}`;
  const jsonLd = generatePageJsonLd(frontmatter, url, content.content);
  const faqJsonLd = generateFaqSchema(frontmatter, url, content.content);
  const readTime = readingTime(content.content);
  const tags = (frontmatter.tags || []) as string[];
  const platforms = (frontmatter.platforms || []) as string[];
  const gameName = ALL_GAMES[params.game]?.name || frontmatter.game || params.game.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  const typeLabel = TYPE_LABEL[frontmatter.type || ''] || '🎮 Article';
  const typeBadge = TYPE_BADGE[frontmatter.type || ''] || 'type-badge-guide';
  const heroImage = (frontmatter.image as string) || (frontmatter.ogImage as string) || (frontmatter.headerImage as string) || '';
  const author = (frontmatter.author as string) || 'Control Resonant Wiki';
  const publishDate = frontmatter.publishDate || frontmatter.date;

  const allArticles = listAllContent();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Games', url: `${siteConfig.url}/games` },
          { name: gameName, url: `${siteConfig.url}/games/${params.game}` },
          { name: frontmatter.title, url },
        ]}
      />

      {/* Reading Progress Bar — fills as user scrolls */}
      <ReadingProgressBar />

      {/* === Two-column layout: article + TOC sidebar === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex gap-0 xl:gap-12">

          {/* ===== LEFT: Article Body ===== */}
          <article className="flex-1 min-w-0 max-w-3xl mx-auto xl:mx-0">

            {/* Back button + Breadcrumb */}
            <div className="mb-8">
              <BackButton fallbackHref={`/games/${params.game}`} label={`Back to ${gameName}`} variant="icon" />
              <nav className="text-sm mt-3 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb" style={{ color: 'var(--text-muted)' }}>
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <span>/</span>
                <a href="/games" className="hover:text-white transition-colors">Games</a>
                <span>/</span>
                <a href={`/games/${params.game}`} className="hover:text-white transition-colors">{gameName}</a>
              </nav>
            </div>

            {/* Hero Image — next/image for auto WebP + responsive srcset */}
            {heroImage && (
              <div className="mb-8 rounded-2xl overflow-hidden relative aspect-[2/1]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <Image
                  src={heroImage}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                />
                <div className="absolute inset-0 z-10" style={{
                  background: 'linear-gradient(to top, rgba(6,6,11,0.7) 0%, transparent 50%)',
                }} />
              </div>
            )}

            {/* Mobile TOC (only visible below xl breakpoint) */}
            <ArticleTOC content={content.content} />

            {/* Article Header */}
            <header className="mb-10">
              <span className={`type-badge ${typeBadge} mb-4`}>
                {typeLabel}
              </span>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mt-4"
                style={{ color: 'var(--text-primary)' }}>
                {frontmatter.title}
              </h1>

              {/* Meta Bar */}
              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm"
                style={{ color: 'var(--text-muted)' }}>
                <span>✍️ {author}</span>
                {publishDate && (
                  <time dateTime={publishDate}>
                    📅 {new Date(publishDate).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </time>
                )}
                <span>⏱ {readTime} min read</span>
                <span>🎮 {gameName}</span>
              </div>

              {/* Platform Badges */}
              {platforms.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Platforms:</span>
                  {platforms.map((p) => (
                    <PlatformBadge key={p} platform={p} />
                  ))}
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs"
                      style={{ background: 'rgba(139,92,246,0.08)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.15)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(139,92,246,0.3), transparent)' }} />
            </header>

            {/* Share buttons */}
            <div className="flex items-center justify-between gap-4 -mt-2 mb-6">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Share this article</span>
              <ShareButtons title={frontmatter.title} variant="compact" />
            </div>

            {/* Article Body */}
            <div className="article-body">
              <MDXRemote source={content.content} components={mdxComponents} />
            </div>

            {/* GA4 Enhanced Event Tracking */}
            <AnalyticsTracker />

            {/* Author Bio */}
            <AuthorBio author={author} date={publishDate} />

            {/* Related Articles */}
            <RelatedArticles
              current={{ game: params.game, slug: params.slug, type: frontmatter.type || 'guide' }}
              articles={allArticles}
            />

            {/* Share + Back to Game Hub CTA */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <ShareButtons title={frontmatter.title} variant="full" />
              <Link
                href={`/games/${params.game}`}
                className="inline-flex items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  background: 'rgba(139,92,246,0.08)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  color: '#a78bfa',
                  padding: '0.6rem',
                }}
                aria-label={`Back to ${gameName}`}
                title={`Back to ${gameName}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </Link>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm"
                style={{ color: 'var(--text-secondary)' }}>
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Control Resonant Wiki</p>
                  <p>Your go-to source for trending game guides and news.</p>
                </div>
                <div className="flex gap-4">
                  <Link href="/about" className="hover:text-white transition-colors">About</Link>
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                </div>
              </div>
            </footer>
          </article>

          {/* ===== RIGHT: Desktop TOC Sidebar (hidden on mobile) ===== */}
          <DesktopTOCSidebar
            content={content.content}
            gameName={gameName}
            gameSlug={params.game}
            allArticles={allArticles}
            currentSlug={params.slug}
          />
        </div>
      </div>
    </>
  );
}

/**
 * Extract headings server-side and pass to the DesktopTOC client widget.
 * We do extraction here so the ArticleTOC (mobile widget) and this sidebar
 * share the same source of truth — the raw MDX content.
 *
 * Also builds a "More in {gameName}" mini recommendation list below the TOC
 * to turn wasted sidebar space into a retention engine.
 */
function DesktopTOCSidebar({
  content,
  gameName,
  gameSlug,
  allArticles,
  currentSlug,
}: {
  content: string;
  gameName: string;
  gameSlug: string;
  allArticles: ReturnType<typeof listAllContent>;
  currentSlug: string;
}) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: { id: string; text: string; level: 2 | 3 }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[`*_~\[\]()]/g, '').trim();
    const id = slugify(text);
    items.push({ id, text, level });
  }

  // Build mini recommendation list: same-game articles (exclude current), max 3
  const sameGameArticles = allArticles
    .filter((a) => a.game === gameSlug && a.slug !== currentSlug)
    .slice(0, 3);

  const extraFooter =
    sameGameArticles.length > 0 ? (
      <div>
        <h4
          className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          More in {gameName}
        </h4>
        <ul className="space-y-2">
          {sameGameArticles.map((a) => (
            <li key={a.slug}>
              <a
                href={`/games/${a.game}/${a.slug}`}
                className="block text-xs leading-snug transition-colors duration-150 hover:no-underline hover:text-[#a78bfa]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  if (items.length < 2 && !extraFooter) return null;
  return <DesktopTOC headings={items} extraFooter={extraFooter} />;
}

export const revalidate = 3600;
