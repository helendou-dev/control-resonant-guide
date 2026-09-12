// ============================================
// sitemap.ts — Dynamic XML Sitemap
// Next.js convention: serves at /sitemap.xml
// Scans content/games/ for all published pages
// ============================================

import { MetadataRoute } from 'next';
import { listAllContent, type ContentListItem } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';
import { ALL_GAMES } from '@/lib/game-data';

/**
 * Site launch date — used as the fixed lastmod for pure-static pages
 * (about / privacy / contact) that are never updated. Hardcoding here
 * because Vercel deploys use shallow git clones and `git log --reverse`
 * wouldn't reliably surface the earliest commit.
 *
 * If any of these pages ever gets a real content update, bump this in
 * lockstep with the commit, OR change strategy to a per-file lookup.
 */
const STATIC_LAUNCH_DATE = '2026-08-15';

/**
 * Return the max `lastModified` (falling back to `date`) across a slice of
 * content items. Empty slice → ''. The string is ISO yyyy-mm-dd[ hh:mm]
 * suitable for `new Date(...)`.
 *
 * Why this exists: Google's John Mueller has repeatedly said sitemap
 * `<lastmod>` values that change on every build (e.g. `new Date()` at
 * request time) erode trust in the sitemap. Each static route below
 * should advertise a *real* modification date tied to its content.
 */
function maxModifiedOf(items: ContentListItem[]): string {
  let max = '';
  for (const item of items) {
    const stamp = item.lastModified || item.date;
    if (stamp && (!max || stamp > max)) max = stamp;
  }
  return max;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const pages = listAllContent();

  // ---- Per-section content maxes (truthful lastmod per route) ----
  const allMax = maxModifiedOf(pages);
  const guidesMax = maxModifiedOf(pages.filter((p) => p.type === 'guide'));
  const newsMax = maxModifiedOf(
    pages.filter((p) => p.type === 'news' || p.type === 'patch_notes'),
  );
  const releasesMax = maxModifiedOf(pages.filter((p) => p.type === 'game_release'));
  // tier-lists / comparisons / fixes have no matching content yet —
  // fall back to `allMax` so the route gets a plausible date instead
  // of an empty/new Date().
  const tierListsMax = maxModifiedOf(pages.filter((p) => p.type === 'tier_list')) || allMax;
  const comparisonsMax = maxModifiedOf(pages.filter((p) => p.type === 'comparison')) || allMax;
  const fixesMax = maxModifiedOf(pages.filter((p) => p.type === 'error_fix')) || allMax;

  // ---- Static routes ----
  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage — anchor; mirrors the most-recent article across the site.
    {
      url: baseUrl,
      lastModified: allMax ? new Date(allMax) : new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Game hub pages are emitted by `gameHubRoutes` below (driven by
    // `ALL_GAMES`) — don't duplicate the slug here, or the same URL
    // appears twice in the sitemap with different priorities.
    // Section hubs — each tracks its own content bucket's newest post.
    {
      url: `${baseUrl}/guides`,
      lastModified: guidesMax ? new Date(guidesMax) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tier-lists`,
      lastModified: new Date(tierListsMax),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/comparisons`,
      lastModified: new Date(comparisonsMax),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fixes`,
      lastModified: new Date(fixesMax),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/releases`,
      lastModified: releasesMax ? new Date(releasesMax) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: newsMax ? new Date(newsMax) : new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Pure-static pages — pinned to site launch date; never updated.
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(STATIC_LAUNCH_DATE),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(STATIC_LAUNCH_DATE),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(STATIC_LAUNCH_DATE),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ---- Game hub pages (e.g. /games/control-resonant) ----
  // Each game hub mirrors the newest article within that game. With a single
  // game live today this collapses to the same value, but the shape scales
  // cleanly when more games are added.
  const gameHubRoutes: MetadataRoute.Sitemap = Object.keys(ALL_GAMES).map((slug) => {
    const max = maxModifiedOf(pages.filter((p) => p.game === slug)) || allMax;
    return {
      url: `${baseUrl}/games/${slug}`,
      lastModified: max ? new Date(max) : new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    };
  });

  // ---- Dynamic content pages from /content/games/ ----
  const contentRoutes: MetadataRoute.Sitemap = pages.map((p) => {
    const isNews = p.type === 'news' || p.type === 'patch_notes';
    const isGuide = p.type === 'guide';
    // Use the true last-modified stamp (frontmatter `modifiedDate`), NOT the
    // publish date — otherwise every post-publication update is invisible here.
    const stamp = p.lastModified || p.date;

    return {
      url: `${baseUrl}/games/${p.game}/${p.slug}`,
      lastModified: stamp ? new Date(stamp) : new Date(),
      changeFrequency: (isNews ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: isGuide ? 0.9 : isNews ? 0.7 : 0.8,
    };
  });

  return [...staticRoutes, ...gameHubRoutes, ...contentRoutes];
}