'use client';

import { motion } from 'framer-motion';

/**
 * Author bio card — shown at the bottom of article pages.
 */
export default function AuthorBio({ author, date }: { author: string; date?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-12 p-6 rounded-2xl flex flex-col sm:flex-row gap-5 items-start"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
    >
      {/* Avatar placeholder */}
      <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))', border: '2px solid rgba(139,92,246,0.3)' }}>
        🎮
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            {author}
          </h3>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa' }}>
            Control Resonant Guide Editor
          </span>
        </div>
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          Part of the Control Resonant Guide editorial team. We combine real player experience with SEO-driven research
          to bring you the most helpful gaming guides on the web.
        </p>
        {date && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Published: {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        )}
      </div>
    </motion.div>
  );
}
