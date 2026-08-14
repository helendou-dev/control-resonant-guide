'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const TEAM_MEMBERS = [
  {
    name: 'Alex Chen',
    role: 'Lead Editor',
    emoji: '🎯',
    bio: '10+ years covering RPGs and action games. Former guide writer for IGN and GameSpot.',
    color: '#8b5cf6',
  },
  {
    name: 'Sarah Kim',
    role: 'Content Strategist',
    emoji: '📊',
    bio: 'Knows exactly what players are searching for and makes sure we cover it first.',
    color: '#3b82f6',
  },
  {
    name: 'Marcus Rivera',
    role: 'Senior Writer',
    emoji: '⚔️',
    bio: 'Speedrunner and Soulslike veteran. Writes the deep-dive guides that actually help you win.',
    color: '#10b981',
  },
  {
    name: 'Jamie Park',
    role: 'Content Director',
    emoji: '🎮',
    bio: '15 years in gaming media. Ensures every article meets our quality and accuracy standards.',
    color: '#f59e0b',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How do you choose which games to cover?',
    a: 'We focus on the games players are actively searching for — trending titles, new releases, and games with major updates. If people are looking for answers, we make sure they find them here.',
  },
  {
    q: 'Are your guides written by real players?',
    a: 'Yes. Every guide is written and reviewed by players who have actually played the game. We combine hands-on experience with thorough research to create content that genuinely helps you play better.',
  },
  {
    q: 'How often do you update content?',
    a: 'We monitor game patches, meta shifts, and community developments continuously. Patch note articles go up the day a patch drops. Tier lists are refreshed at least monthly for active games.',
  },
  {
    q: 'Can I contribute or suggest a topic?',
    a: 'We welcome suggestions! Reach out via our contact page. While we don\'t currently accept external guest posts, we\'re always looking for topics our readers want covered.',
  },
  {
    q: 'What types of content do you publish?',
    a: 'Six main types: step-by-step guides, tier lists and rankings, game comparisons, bug fix guides, patch note breakdowns, and launch guides for new releases.',
  },
];

const STATS = [
  { value: '8+', label: 'Games Covered', icon: '🎮' },
  { value: '50+', label: 'Guides Published', icon: '📖' },
  { value: 'Daily', label: 'New Content', icon: '⚡' },
  { value: '100%', label: 'Player-Tested', icon: '✅' },
];

export default function AboutClient() {
  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: 'var(--bg-deep)' }}>
        {/* Background effects */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.08) 0%, transparent 60%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399' }} />
              Our Mission
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              <span style={{ color: 'var(--text-primary)' }}>Guides for the Games</span>
              <br />
              <span className="gradient-text">You&apos;re Playing Now</span>
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Control Resonant Wiki is your go-to source for tier lists, build guides, patch breakdowns,
              and bug fixes. We cover the games everyone&apos;s playing — fresh, accurate, and
              actually helpful.
            </p>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg-deep), transparent)' }} />
      </section>

      {/* ===== Stats Bar ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-12 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center p-5 rounded-xl"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-extrabold mb-0.5" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== What You'll Find Here ===== */}
      <section className="py-16 md:py-20" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="section-title">What You&apos;ll Find Here</h2>
            <p className="section-subtitle max-w-md mx-auto">Six types of content, all built to help you play better</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: '📖',
                title: 'Guides',
                desc: 'Step-by-step walkthroughs — from beginner basics to endgame strategies. Clear, practical, and written by players who\'ve been there.',
                color: '#10b981',
              },
              {
                icon: '🏆',
                title: 'Tier Lists',
                desc: 'Ranked rankings of weapons, builds, classes, and characters. We tell you what\'s meta, what\'s great, and what to skip.',
                color: '#8b5cf6',
              },
              {
                icon: '⚖️',
                title: 'Comparisons',
                desc: 'Head-to-head breakdowns of similar games, builds, or strategies. Weigh the pros and cons so you can pick what fits your playstyle.',
                color: '#f59e0b',
              },
              {
                icon: '🔧',
                title: 'Bug Fixes',
                desc: 'Crashing? Stuttering? Can\'t launch? We track the most common issues and walk you through fixes that actually work.',
                color: '#f97316',
              },
              {
                icon: '📋',
                title: 'Patch Breakdowns',
                desc: 'Every major patch, decoded. What got buffed, what got nerfed, and what it means for your build — in plain English.',
                color: '#3b82f6',
              },
              {
                icon: '🚀',
                title: 'Launch Guides',
                desc: 'Day-one guides for new releases and major DLCs. Get up to speed fast with everything you need to know before you boot up.',
                color: '#ec4899',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex gap-4 p-5 rounded-xl"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Team Section ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle max-w-md mx-auto">The players behind the guides</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center p-6 rounded-xl"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
                  style={{ background: `${member.color}15`, border: `2px solid ${member.color}30` }}>
                  {member.emoji}
                </div>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
                <p className="text-xs font-semibold mb-3" style={{ color: member.color }}>{member.role}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section className="py-16 md:py-20" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">FAQ</h2>
            <p className="section-subtitle">Common questions about Control Resonant Wiki</p>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="rounded-xl overflow-hidden"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
              >
                <details className="group">
                  <summary className="px-5 py-4 cursor-pointer font-semibold text-sm flex items-center justify-between select-none hover:bg-white/[0.02] transition-colors"
                    style={{ color: 'var(--text-primary)', listStyle: 'none' }}>
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="transition-transform group-open:rotate-45 flex-shrink-0 ml-3"
                      style={{ color: 'var(--text-muted)' }}>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-10 md:p-14 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.06), rgba(6,182,212,0.04))',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
              Ready to Explore?
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Dive into our latest guides and see how we can help you dominate your favorite games.
            </p>
            <Link href="/guides" className="btn-primary text-base">
              Browse Guides
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
