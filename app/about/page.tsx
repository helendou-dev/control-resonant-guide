// ============================================
// About Page — EEAT Signal
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: 'About Control Resonant Guide — Your Gaming Guide Authority' },
  description: 'Learn about the Control Resonant Guide team, our mission, and how we create the most helpful gaming guides, tier lists, and news coverage on the web.',
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: 'About Control Resonant Guide',
    description: 'Meet the team behind the most comprehensive gaming guide resource.',
    url: `${siteConfig.url}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Control Resonant Guide',
    url: siteConfig.url,
    description: 'Your go-to source for trending game guides, tier lists, and news coverage.',
    foundingDate: '2026',
    sameAs: [],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Breadcrumb */}
        <nav className="text-sm mb-10 flex items-center gap-2 flex-wrap" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">About</span>
        </nav>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
          About Control Resonant Guide
        </h1>

        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          Control Resonant Guide is a dedicated gaming guide platform built for players who want to win.
          We combine real player experience with data-driven research to deliver the most
          accurate, up-to-date, and actionable gaming guides on the web.
        </p>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>🎯 Our Mission</h2>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We believe every gamer deserves access to high-quality, well-researched guides —
              whether they're tackling their first boss or optimizing endgame builds.
              Our mission is to build the most comprehensive, trustworthy, and helpful
              gaming resource on the internet, one guide at a time.
            </p>
          </div>
        </section>

        {/* What We Cover */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>📚 What We Cover</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '📖', title: 'In-Depth Guides', desc: 'Step-by-step walkthroughs, build guides, and strategy breakdowns for trending games.' },
              { icon: '🏆', title: 'Tier Lists & Rankings', desc: 'Data-backed rankings for characters, weapons, classes, and team compositions.' },
              { icon: '🔧', title: 'Bug Fixes & Tech Support', desc: 'Tested solutions for common game errors, crashes, and performance issues.' },
              { icon: '📰', title: 'Gaming News & Patch Notes', desc: 'Curated coverage of game updates, balance changes, and industry news.' },
              { icon: '🚀', title: 'Launch Guides', desc: 'Day-one coverage for major game releases with everything you need to know.' },
              { icon: '⚖️', title: 'Comparisons', desc: 'Side-by-side comparisons to help you choose the right game, class, or build.' },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>✅ Our Editorial Standards</h2>
          <div className="space-y-4">
            {[
              { title: 'Real Player Experience', desc: 'Every guide is written or reviewed by someone who has actually played the game. We don\'t publish content we wouldn\'t use ourselves.' },
              { title: 'Data-Driven Accuracy', desc: 'We cross-reference patch notes, developer statements, community data, and in-game testing to ensure our information is correct.' },
              { title: 'Regular Updates', desc: 'Games change — and so do our guides. We monitor patch cycles and update content when balance changes, new content, or meta shifts occur.' },
              { title: 'Transparent Sourcing', desc: 'We cite official sources, community research, and testing methodology so you can verify our claims.' },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>👥 The Team</h2>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              Control Resonant Guide is built by a small team of passionate gamers, content strategists, and developers.
              We&apos;re players first — we&apos;ve logged thousands of hours across RPGs, survival games, MOBAs,
              and everything in between. That hands-on experience is what sets our guides apart.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Want to join us? We&apos;re always looking for expert players who can write. <Link href="/contact" className="underline hover:text-white transition-colors" style={{ color: 'var(--accent-purple)' }}>Get in touch →</Link>
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.08))',
            border: '1px solid rgba(139,92,246,0.15)',
          }}>
          <p className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Ready to level up your game?
          </p>
          <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
            Browse our latest guides and start playing smarter.
          </p>
          <Link
            href="/games"
            className="inline-block px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
              color: '#fff',
            }}
          >
            Explore All Games →
          </Link>
        </div>
      </div>
    </>
  );
}
