'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { ContentListItem } from '@/lib/content';
import AdBanner from '@/components/ad-banner';

const TYPE_CONFIG: Record<string, { emoji: string; label: string; badgeClass: string }> = {
  guide: { emoji: '📖', label: 'Guide', badgeClass: 'type-badge-guide' },
  news: { emoji: '📰', label: 'News', badgeClass: 'type-badge-news' },
  tier_list: { emoji: '🏆', label: 'Tier List', badgeClass: 'type-badge-tier' },
  comparison: { emoji: '⚖️', label: 'Comparison', badgeClass: 'type-badge-comparison' },
  error_fix: { emoji: '🔧', label: 'Fix Guide', badgeClass: 'type-badge-fix' },
  patch_notes: { emoji: '📋', label: 'Patch Notes', badgeClass: 'type-badge-patch' },
  game_release: { emoji: '🚀', label: 'Launch Guide', badgeClass: 'type-badge-release' },
};

function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] || { emoji: '🎮', label: type, badgeClass: 'type-badge-guide' };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

const ACCENT = '#ff5a45';
const ACCENT_LIGHT = '#ff8a75';

// ============================================
// Data
// ============================================

const HERO_STATS = [
  { value: 'Sep 24, 2026', label: 'Release Date' },
  { value: '$59.99', label: 'Base Price' },
  { value: '30–50h', label: 'Playtime' },
  { value: 'PS5 · Xbox · PC', label: 'Platforms' },
];

const QUICK_FACTS = [
  { label: 'Developer', value: 'Remedy Entertainment' },
  { label: 'Publisher', value: 'Remedy Entertainment' },
  { label: 'Engine', value: 'Northlight' },
  { label: 'Genre', value: 'Action RPG' },
  { label: 'Platforms', value: 'PS5 · Xbox · PC · Mac' },
  { label: 'Release Date', value: 'September 24, 2026' },
  { label: 'Price', value: '$59.99 / $69.99 Deluxe' },
  { label: 'Playtime', value: '30h main · 50h 100%' },
];

const ABERRANT_FORMS = [
  { name: 'Dual Blades', desc: 'Fast area-of-effect attacks', icon: '⚔️', tag: 'Speed · AoE' },
  { name: 'Axe', desc: 'Powerful but slow strikes', icon: '🪓', tag: 'Power · Stagger' },
  { name: 'Scythe', desc: 'Medium speed, good control', icon: '🌙', tag: 'Balanced · Control' },
  { name: 'Whip', desc: 'Ranged attacks & crowd control', icon: '🔗', tag: 'Range · Crowd' },
  { name: 'Heavy Hammer', desc: 'Devastating single-target blows', icon: '🔨', tag: 'Burst · Boss' },
];

const CODEX_CARDS = [
  { href: '/games/control-resonant/release-date', emoji: '📅', title: 'Release Date', desc: 'Sep 24, 2026 on PS5, Xbox, PC & Mac', badge: 'Launch' },
  { href: '/games/control-resonant/preorder-guide', emoji: '🛒', title: 'Pre-Order Guide', desc: 'Standard vs Deluxe · PS5 early access', badge: 'Guide' },
  { href: '/games/control-resonant/beginner-guide', emoji: '🌱', title: 'Beginner Guide', desc: "Never played Control? Start here", badge: 'Guide' },
  { href: '/games/control-resonant/aberrant-weapon-forms', emoji: '⚔️', title: 'Aberrant Weapons', desc: 'All five weapon forms explained', badge: 'Combat' },
  { href: '/games/control-resonant/combat-systems-preview', emoji: '💥', title: 'Combat & Builds', desc: 'Gap system · respec · New Game+', badge: 'Combat' },
  { href: '/games/control-resonant/faq', emoji: '❓', title: 'FAQ', desc: 'Quick answers to the big questions', badge: 'Info' },
  { href: '/tier-lists', emoji: '🏆', title: 'Tier Lists', desc: 'Best weapon forms & builds', badge: 'Tier' },
  { href: '/news', emoji: '📰', title: 'Latest News', desc: 'Pre-launch news & updates', badge: 'News' },
];

const HOME_FAQ = [
  { q: 'Is Control Resonant a sequel to Control?', a: 'Yes. Set about seven years after Control, the story follows Dylan Faden as a paranatural crisis consumes Manhattan and Jesse Faden disappears.' },
  { q: 'Do I need to play Control first?', a: 'No. Creative director Mikael Kasurinen says the sequel is built to stand alone — new players can follow Dylan\u2019s story without playing Control, the AWE DLC, or Alan Wake 2.' },
  { q: 'When does Control Resonant release?', a: 'September 24, 2026, on PlayStation 5, Xbox Series X|S, PC (Steam & Epic Games Store), and Mac (later in 2026).' },
  { q: 'How long is Control Resonant?', a: 'Around 30 hours for the main story and about 50 hours to see everything, per lead designer Sergey Mokhov.' },
  { q: 'What is the Aberrant weapon?', a: 'The Aberrant is Dylan Faden\u2019s shapeshifting melee weapon that transforms between five forms — Dual Blades, Axe, Scythe, Whip, and Heavy Hammer — each suited to different combat situations.' },
];

// ============================================
// Section heading with eyebrow label
// ============================================

function SectionHeading({ eyebrow, title, subtitle, center }: { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center mb-12' : 'mb-10'}
    >
      <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT_LIGHT }}>
        {eyebrow}
      </div>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm md:text-base mt-3 ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`} style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ============================================
// FAQ Accordion Item
// ============================================

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--bg-elevated)',
        border: `1px solid ${open ? 'rgba(255,90,69,0.3)' : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-bold text-sm md:text-base" style={{ color: 'var(--text-primary)' }}>
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            background: open ? 'rgba(255,90,69,0.15)' : 'rgba(255,255,255,0.05)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? ACCENT_LIGHT : 'var(--text-muted)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Launch countdown (client-side, avoids hydration mismatch)
// ============================================

function ReleaseCountdown() {
  const target = useMemo(() => new Date('2026-09-24T00:00:00').getTime(), []);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = now === null ? 0 : Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const units = [
    { v: days, l: 'Days' },
    { v: hours, l: 'Hours' },
    { v: minutes, l: 'Mins' },
    { v: seconds, l: 'Secs' },
  ];

  if (now !== null && diff <= 0) {
    return (
      <div
        className="max-w-3xl mx-auto mb-8 rounded-2xl px-6 py-4 flex items-center justify-center gap-3"
        style={{ background: 'rgba(255,90,69,0.08)', border: '1px solid rgba(255,90,69,0.3)', backdropFilter: 'blur(8px)' }}
      >
        <span className="text-sm md:text-base font-extrabold tracking-wide" style={{ color: ACCENT_LIGHT }}>
          🎮 Control Resonant is OUT NOW — September 24, 2026
        </span>
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto mb-8 rounded-2xl px-6 py-4 flex items-center justify-center gap-4 md:gap-6 flex-wrap"
      style={{ background: 'rgba(255,90,69,0.06)', border: '1px solid rgba(255,90,69,0.22)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: ACCENT }} />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: ACCENT }} />
        </span>
        <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>
          Launch Countdown
        </span>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        {units.map((u) => (
          <div key={u.l} className="text-center">
            <div className="text-xl md:text-2xl font-extrabold tabular-nums leading-none" style={{ color: 'var(--text-primary)' }}>
              {now === null ? '--' : String(u.v).padStart(2, '0')}
            </div>
            <div className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
              {u.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Page
// ============================================

export default function HomePageClient({ allArticles }: { allArticles: ContentListItem[] }) {
  const guides = allArticles.filter((a) => a.type === 'guide' || a.type === 'game_release' || a.type === 'tier_list');
  const news = allArticles.filter((a) => a.type === 'news' || a.type === 'patch_notes' || a.type === 'hot-take');
  const featured = guides.slice(0, 3);

  const heroShapes = [
    { color: 'rgba(239,68,68,0.35)', size: 340, x: '6%', y: '12%', delay: 0 },
    { color: 'rgba(249,115,22,0.28)', size: 280, x: '84%', y: '20%', delay: 2 },
    { color: 'rgba(251,191,36,0.16)', size: 220, x: '52%', y: '68%', delay: 4 },
  ];

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden" style={{ background: 'var(--bg-deep)' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/games/control-resonant-header-v20260814.jpg"
            alt="Control Resonant"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 25% 45%, rgba(239,68,68,0.16) 0%, transparent 55%), radial-gradient(ellipse at 78% 25%, rgba(249,115,22,0.12) 0%, transparent 50%), linear-gradient(to top, var(--bg-deep) 0%, rgba(6,6,11,0.55) 50%, rgba(6,6,11,0.35) 100%)',
          }}>
            {heroShapes.map((shape, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl pointer-events-none"
                style={{
                  width: shape.size, height: shape.size,
                  left: shape.x, top: shape.y,
                  background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
                }}
                animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.15, 0.95, 1] }}
                transition={{ duration: 8, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-14 md:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Centered FBC brand mark */}
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <img
                src="/logo-mark.svg"
                alt=""
                width={64}
                height={56}
                className="h-14 w-auto drop-shadow-[0_0_18px_rgba(255,255,255,0.15)]"
                style={{ filter: 'drop-shadow(0 0 18px rgba(255,90,69,0.35))' }}
              />
            </div>

            {/* Eyebrow */}
            <div className="text-xs font-bold uppercase tracking-[0.25em] mb-5" style={{ color: ACCENT_LIGHT }}>
              A Remedy Entertainment Action RPG · Sep 24, 2026
            </div>

            {/* Two-line H1 */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              <span className="block" style={{ color: 'var(--text-primary)' }}>Forge Your Legend</span>
              <span className="block gradient-text">in Control Resonant</span>
            </h1>

            <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}>
              Wield the shapeshifting Aberrant, survive a reality-corrupting Hiss outbreak in
              warped Manhattan, and uncover what happened to Jesse Faden — in Remedy&apos;s
              biggest action RPG yet.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Link href="/games/control-resonant/preorder-guide" className="btn-primary !px-8 !py-3.5 !text-base">
                Pre-Order Guide
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/games/control-resonant/beginner-guide"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:-translate-y-px"
                style={{
                  color: 'var(--text-primary)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Beginner Guide
              </Link>
            </div>

            {/* Launch countdown */}
            <ReleaseCountdown />

            {/* 4-column stat bar */}
            <div
              className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
            >
              {HERO_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="py-5 px-2 text-center"
                  style={{ borderRight: i < HERO_STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : undefined }}
                >
                  <div className="text-sm md:text-base font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="flex flex-col items-center gap-1 mt-12 opacity-50">
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Scroll</span>
              <motion.svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ color: 'var(--text-muted)' }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg-deep), transparent)' }} />
      </section>

      {/* Ad slot: adaptive container right below hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <AdBanner variant="auto" />
      </div>

      {/* ===== What is Control Resonant? — intro + Quick Facts ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="The Paranatural Sequel"
          title="What is Control Resonant?"
          subtitle="A standalone action RPG sequel set seven years after the events of Control (2019)."
        />
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: intro text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              Control Resonant is Remedy Entertainment&apos;s 2026 action RPG sequel to Control.
              You play as <strong style={{ color: 'var(--text-primary)' }}>Dylan Faden</strong>, wielding a shapeshifting
              melee weapon called the Aberrant, as a paranatural crisis consumes Manhattan and Jesse Faden disappears.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Built on the Northlight engine, the game introduces five weapon forms, a Gap-based progression system,
              and a darker, more surreal vision of the Federal Bureau of Control&apos;s world. Whether you played
              Control or not, this is a fresh entry point.
            </p>
            <Link href="/games/control-resonant/beginner-guide" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-white"
              style={{ color: ACCENT_LIGHT }}>
              Read the Beginner Guide
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>

          {/* Right: Quick Facts panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 md:p-7"
            style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: ACCENT_LIGHT }}>
              Quick Facts
            </div>
            <dl>
              {QUICK_FACTS.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <dt className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{f.label}</dt>
                  <dd className="text-sm font-semibold text-right" style={{ color: 'var(--text-primary)' }}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* ===== Aberrant Weapon Forms ===== */}
      <section className="py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Choose Your Fighting Style"
            title="The Aberrant — Five Weapon Forms"
            subtitle="Dylan's shapeshifting melee weapon. Five forms, five playstyles — one weapon."
            center
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ABERRANT_FORMS.map((form, i) => (
              <motion.div
                key={form.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link href="/games/control-resonant/aberrant-weapon-forms" className="group block text-center rounded-xl p-6 h-full transition-all duration-300 hover:-translate-y-1.5"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-3xl mb-3">{form.icon}</div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                    style={{ background: 'rgba(255,90,69,0.1)', color: ACCENT_LIGHT }}>
                    {form.tag}
                  </span>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-orange-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {form.name}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {form.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== The Codex — content grid ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Agent's Codex"
          title="Start Your Journey"
          subtitle="Every guide you need before launch — and after."
          center
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CODEX_CARDS.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <Link href={card.href} className="group block text-center rounded-xl p-5 h-full transition-all duration-300 hover:-translate-y-1.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-2xl mb-2">{card.emoji}</div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                  style={{ background: 'rgba(251,146,60,0.1)', color: '#fb923c' }}>
                  {card.badge}
                </span>
                <h3 className="font-bold text-sm mb-1 group-hover:text-orange-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {card.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Featured Guides ===== */}
      <section className="py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Deep Dive"
            title="Featured Guides"
            subtitle="Our deepest, most complete Control Resonant articles."
          />
          {featured.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🕹️</div>
              <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Guides coming soon</p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Deep guides are being written right now</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-5">
                {featured.map((item, i) => {
                  const tc = getTypeConfig(item.type);
                  return (
                    <motion.div
                      key={`${item.game}/${item.slug}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <Link href={item.url} className="block h-full group">
                        <div className="glow-card h-full flex flex-col">
                          {item.image && (
                            <div className="relative w-full aspect-[16/9] overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,24,0.6), transparent 50%)' }} />
                              <span className={`type-badge ${tc.badgeClass} absolute top-3 left-3`}>{tc.emoji} {tc.label}</span>
                            </div>
                          )}
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-bold text-base leading-snug mb-2 flex-1 line-clamp-2 group-hover:text-orange-400 transition-colors"
                              style={{ color: 'var(--text-primary)' }}>
                              {item.title}
                            </h3>
                            <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              {item.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs pt-3 mt-auto" style={{ color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                              {formatDate(item.date) && <span>{formatDate(item.date)}</span>}
                              {item.readingTime && <span>⏱ {item.readingTime} min</span>}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="text-center mt-10">
                <Link href="/games/control-resonant" className="btn-ghost">
                  View All Guides
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===== Latest News — timeline style ===== */}
      {news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <SectionHeading
            eyebrow="Latest Updates"
            title="Control Resonant News"
            subtitle="Everything happening around Control Resonant."
          />
          <div className="max-w-3xl">
            {news.slice(0, 5).map((item, i) => {
              const tc = getTypeConfig(item.type);
              return (
                <motion.div
                  key={`${item.game}/${item.slug}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <Link href={item.url} className="group flex items-start gap-4 py-4 border-b transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    {/* Date column */}
                    <div className="flex-shrink-0 w-20 text-right">
                      <div className="text-xs font-bold" style={{ color: ACCENT_LIGHT }}>
                        {formatDate(item.date).split(',')[0]}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {formatDate(item.date).split(',')[1]?.trim()}
                      </div>
                    </div>
                    {/* Vertical line dot */}
                    <div className="flex-shrink-0 relative flex justify-center" style={{ width: '16px' }}>
                      <div className="absolute top-1 w-2 h-2 rounded-full" style={{ background: 'rgba(255,90,69,0.5)' }} />
                      <div className="absolute top-3 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0 pb-1">
                      <span className={`type-badge ${tc.badgeClass} mb-1.5 inline-block text-[10px]`}>{tc.emoji} {tc.label}</span>
                      <h3 className="text-sm font-bold leading-snug mb-1 line-clamp-1 group-hover:text-orange-400 transition-colors"
                        style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/news" className="btn-ghost">
              All News
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* ===== FAQ — accordion ===== */}
      <section className="py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Quick Answers"
            title="Control Resonant FAQ"
            subtitle="The questions everyone is asking about Control Resonant."
            center
          />
          <div className="max-w-3xl mx-auto space-y-3 mb-8">
            {HOME_FAQ.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/games/control-resonant/faq" className="btn-ghost">
              See Full FAQ
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Bottom CTA — mirrors hero ===== */}
      <section className="py-16 md:py-24" style={{ background: 'var(--bg-deep)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-10 md:p-14 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.09), rgba(249,115,22,0.07), rgba(251,191,36,0.04))',
              border: '1px solid rgba(255,90,69,0.18)',
            }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT_LIGHT }}>
              Ready for September 24?
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
              Forge your legend today.
            </h2>
            <p className="mb-8 max-w-md mx-auto text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
              Plan your pre-order, master the Aberrant, and go in ready.
              New Control Resonant guides drop here every day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/games/control-resonant/preorder-guide" className="btn-primary !px-8 !py-3.5 !text-base">
                Pre-Order Guide
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/games/control-resonant/beginner-guide"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:-translate-y-px"
                style={{
                  color: 'var(--text-primary)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                Beginner Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
