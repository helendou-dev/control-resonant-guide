import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { siteConfig } from '@/lib/site-config';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/header';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Control Resonant Guide 2026: Release Date, Weapons',
    template: '%s | Control Resonant Guide',
  },
  description:
    'Control Resonant guide hub: release date, pre-order guide, Aberrant weapon forms, beginner tips, and daily news for Remedy\u2019s September 24, 2026 launch.',
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
    title: 'Control Resonant Guide 2026: Release Date, Weapons',
    description:
      'Release date, pre-order guide, Aberrant weapon forms, beginner tips, and daily news for Remedy\u2019s Control Resonant — September 24, 2026.',
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
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
        {/* Impact (Green Man Gaming affiliate) site verification */}
        <meta
          name="impact-site-verification"
          {...({ value: '6651fa22-a213-4af9-b8cd-3c2f14e76004' } as React.HTMLAttributes<HTMLMetaElement>)}
        />
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
          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.6), rgba(251,191,36,0.5), transparent)' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid md:grid-cols-4 gap-10">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <img src="/logo-mark.svg" alt="" width={28} height={25} className="h-6 w-auto" />
                  <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Control Resonant Guide</span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  The unofficial fan-made guide for Control Resonant. Release date, pre-order info,
                  Aberrant weapon forms, beginner guides, and daily news — updated by real players.
                </p>
                <Link
                  href="/games/control-resonant/preorder-guide"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-px"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #f97316)',
                    boxShadow: '0 2px 12px rgba(239,68,68,0.25)',
                  }}
                >
                  Pre-Order Guide
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
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
