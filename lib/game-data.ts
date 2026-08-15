// ============================================
// game-data.ts — Centralized Game Metadata
// Single source of truth for all game info.
// Update here → all pages sync automatically.
// ============================================

export interface GameMeta {
  name: string;
  slug: string;
  headerImage: string;
  description: string;
  releaseYear: string;
  /** Full ISO release date for VideoGame JSON-LD */
  releaseDate?: string;
  developer: string;
  publisher: string;
  /** Platforms for VideoGame JSON-LD gamePlatform */
  platforms?: string[];
  tags: string[];
  emoji?: string; // for Popular Games etc.
}

export const ALL_GAMES: Record<string, GameMeta> = {
  'control-resonant': {
    name: 'Control Resonant',
    slug: 'control-resonant',
    headerImage: '/images/games/control-resonant-header-v20260814.jpg',
    description:
      "Remedy Entertainment's paranatural action RPG sequel. Wield the shapeshifting Aberrant weapon, save a warped Manhattan, and uncover what happened to Jesse Faden. Launching September 24, 2026.",
    releaseYear: '2026',
    releaseDate: '2026-09-24',
    developer: 'Remedy Entertainment',
    publisher: 'Remedy Entertainment',
    platforms: ['PlayStation 5', 'Xbox Series X|S', 'PC', 'macOS'],
    tags: ['Action RPG', 'Supernatural', 'Third-Person', 'Single-Player', 'Story-Rich'],
    emoji: '🔮',
  },
};

/** Ordered list for homepage "Popular Games" section */
export const POPULAR_GAMES_ORDER: string[] = [
  'control-resonant',
];

/** Lightweight view for pages that only need name + image */
export interface GameCard {
  slug: string;
  name: string;
  image: string;
  emoji?: string;
}

export function getGameCard(slug: string): GameCard | undefined {
  const g = ALL_GAMES[slug];
  if (!g) return undefined;
  return { slug: g.slug, name: g.name, image: g.headerImage, emoji: g.emoji };
}

export function getPopularGames(): GameCard[] {
  return POPULAR_GAMES_ORDER.map((slug) => getGameCard(slug)!).filter(Boolean);
}
