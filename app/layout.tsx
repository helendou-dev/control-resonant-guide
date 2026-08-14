import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { siteConfig } from '@/lib/site-config';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/header';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Control Resonant Guide — Guides, Weapons & Pre-Order Info',
    template: '%s | Control Resonant Guide',
  },
  description:
    'The unofficial Control Resonant guide hub. Release date, pre-order guide, Aberrant weapon forms, beginner guide, and daily news for Remedy\u2019s September 24, 2026 launch.',
  keywords: [
    'control resonant',
    'control 2',
    'control resonant release date',
    'control resonant preorder',
    'aberrant weapon',
    'control resonant guide',
    'remedy games',
    'control resonant faq',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Control Resonant Guide',
    locale: 'en_US',
    title: 'Control Resonant Guide — Guides, Weapons & Pre-Order Info',
    description:
      'Release date, pre-order guide, Aberrant weapon forms, beginner guide, and daily news for Remedy\u2019s Control Resonant.',
    url: siteConfig.url,
    images: [
      {
        url: '/og?title=Control+Resonant+Guide+—+Guides+%26+Pre-Order+Info&type=default',
        width: 1200,
        height: 630,
        alt: 'Control Resonant Guide — Guides & Pre-Order Info',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@controlresonant',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'DAPgklfibhKnon_LDH-UqCdVFd41qVwC3IeCdurdOMM',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Organization structured data for Google's Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Control Resonant Guide',
              url: siteConfig.url,
              description:
                'Unofficial fan-made guide hub for Control Resonant, Remedy Entertainment\u2019s 2026 action RPG sequel.',
              foundingDate: '2026',
              logo: `${siteConfig.url}/icon.png`,
            }),
          }}
        />
        {/* WebSite structured data */}
        {/* SearchAction removed: /search page does not exist yet. Re-add when search is implemented. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Control Resonant Guide',
              url: siteConfig.url,
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--bg-deep)' }}>
        {siteConfig.gaId && <GoogleAnalytics gaId={siteConfig.gaId} />}
        <Header />

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* ===== Modern Footer ===== */}
        <footer className="mt-20" style={{ background: 'var(--bg-base)' }}>
          {/* Top gradient line */}
          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(59,130,246,0.5), transparent)' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid md:grid-cols-4 gap-10">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
                  >
                    C
                  </span>
                  <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Control Resonant Guide</span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  The unofficial fan-made guide for Control Resonant. Release date, pre-order info,
                  Aberrant weapon forms, beginner guides, and daily news — updated by real players.
                </p>
              </div>

              {/* Links */}
              {[
                {
                  title: 'Guides',
                  links: [
                    { href: '/games/control-resonant', label: 'All Guides' },
                    { href: '/games/control-resonant/beginner-guide', label: 'Beginner Guide' },
                    { href: '/games/control-resonant/aberrant-weapon-forms', label: 'Aberrant Weapons' },
                    { href: '/games/control-resonant/combat-systems-preview', label: 'Combat & Builds' },
                  ],
                },
                {
                  title: 'Game Info',
                  links: [
                    { href: '/games/control-resonant/release-date', label: 'Release Date' },
                    { href: '/games/control-resonant/preorder-guide', label: 'Pre-Order Guide' },
                    { href: '/games/control-resonant/faq', label: 'FAQ' },
                    { href: '/tier-lists', label: 'Tier Lists' },
                  ],
                },
                {
                  title: 'More',
                  links: [
                    { href: '/news', label: 'Latest News' },
                    { href: '/about', label: 'About Us' },
                    { href: '/contact', label: 'Contact' },
                    { href: '/privacy', label: 'Privacy Policy' },
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {col.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="footer-link text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t py-6" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>&copy; {new Date().getFullYear()} Control Resonant Guide. All rights reserved.</span>
              <span>Control Resonant Guide is reader-supported. When you buy through links on our site, we may earn an affiliate commission.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
