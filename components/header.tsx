'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/games/control-resonant', label: 'Guides' },
  { href: '/games/control-resonant/aberrant-weapon-forms', label: 'Weapons' },
  { href: '/games/control-resonant/combat-systems-preview', label: 'Combat' },
  { href: '/games/control-resonant/preorder-guide', label: 'Pre-Order' },
  { href: '/news', label: 'News' },
  { href: '/games/control-resonant/faq', label: 'FAQ' },
];

const UTILITY_LINKS = [
  { href: '/games/control-resonant/release-date', label: 'Release Date' },
  { href: '/games/control-resonant/beginner-guide', label: 'Beginner Guide' },
  { href: '/tier-lists', label: 'Tier Lists' },
  { href: '/games/control-resonant/combat-systems-preview', label: 'Builds' },
  { href: '/games/control-resonant/faq', label: 'How Long' },
  { href: '/guides', label: 'All Guides' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(8, 8, 13, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255,255,255,0.06)',
          transform: 'translateZ(0)',
        }}
      >
        {/* ===== Main row ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80 shrink-0"
          >
            <img
              src="/logo.svg"
              alt="Control Resonant Guide"
              width={170}
              height={40}
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link px-3 py-2 rounded-lg"
                  style={isActive ? { color: '#ff8a75' } : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/games/control-resonant/preorder-guide"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-px"
              style={{
                background: 'linear-gradient(135deg, #ef4444, #f97316)',
                boxShadow: '0 2px 12px rgba(239,68,68,0.3)',
              }}
            >
              Pre-Order Guide
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: 'var(--text-secondary)' }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ===== Utility row (desktop only) ===== */}
        <div
          className="hidden md:block border-t"
          style={{ borderColor: 'rgba(255,255,255,0.04)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center gap-5 text-xs overflow-x-auto">
            <span
              className="flex items-center gap-1.5 shrink-0 font-bold uppercase tracking-wider"
              style={{ color: '#ff8a75' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ff5a45' }} />
              Sep 24, 2026
            </span>
            {UTILITY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link shrink-0 font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={closeMenu}
          />
          {/* Menu panel */}
          <nav
            className="fixed top-16 inset-x-0 z-50 md:hidden border-b animate-slide-down"
            style={{
              background: 'rgba(8, 8, 13, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg text-base font-medium transition-colors"
                    style={{
                      color: isActive ? '#ff8a75' : 'var(--text-primary)',
                      background: isActive ? 'rgba(255,90,69,0.1)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Quick Links
              </div>
              {UTILITY_LINKS.map((link) => (
                <Link
                  key={`u-${link.href}`}
                  href={link.href}
                  onClick={closeMenu}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}

      {/* Slide-down animation keyframes */}
      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
