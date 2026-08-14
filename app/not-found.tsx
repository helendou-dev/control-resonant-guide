import Link from 'next/link';
import { ALL_GAMES } from '@/lib/game-data';

export default function NotFound() {
  const popularGames = Object.values(ALL_GAMES).slice(0, 6);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-2xl mx-auto">
        {/* Glitch-style 404 */}
        <h1
          className="text-7xl md:text-8xl font-extrabold tracking-tighter mb-4"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>

        <p
          className="text-lg md:text-xl font-medium mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          This page got lost in the Lands Between
        </p>

        <p
          className="text-sm mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          The page you're looking for doesn't exist or has been moved.
          Try one of these instead:
        </p>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: '#fff',
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.2)',
              color: '#a78bfa',
            }}
          >
            Browse All Games
          </Link>
        </div>

        {/* Popular games grid */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            Popular Games
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularGames.map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="block p-3 rounded-lg transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'var(--bg-base)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="text-lg block mb-1">{game.emoji || '🎮'}</span>
                <span className="text-xs font-medium block" style={{ color: 'var(--text-secondary)' }}>
                  {game.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
