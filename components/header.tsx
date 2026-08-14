'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/games/control-resonant', label: 'Guides' },
  { href: '/games/control-resonant/preorder-guide', label: 'Pre-Order' },
  { href: '/games/control-resonant/aberrant-weapon-forms', label: 'Weapons' },
  { href: '/tier-lists', label: 'Tier Lists' },
  { href: '/news', label: 'News' },
  { href: '/games/control-resonant/faq', label: 'FAQ' },
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
          background: 'rgba(10, 10, 18, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255,255,255,0.06)',
          transform: 'translateZ(0)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight transition-opacity hover:opacity-80"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white font-bold"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6)',
                boxShadow: '0 2px 12px rgba(99,102,241,0.4)',
              }}
            >
              C
            </span>
            <span className="gradient-text" style={{ color: '#a78bfa' }}>
              Control Resonant
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link px-3 py-2 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
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
              background: 'rgba(10, 10, 18, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg text-base font-medium transition-colors"
                    style={{
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                      background: isActive ? 'rgba(139,92,246,0.1)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
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
