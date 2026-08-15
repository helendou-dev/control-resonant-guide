// ============================================
// Contact Page — Trust Signal
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: 'Contact Us — Control Resonant Guide' },
  description: 'Get in touch with the Control Resonant Guide team — feedback, suggestions, collaboration inquiries, and guide requests.',
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="text-sm mb-10 flex items-center gap-2 flex-wrap" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white">Contact</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
        Contact Us
      </h1>

      <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
        Have a question, suggestion, or just want to say hi? We&apos;d love to hear from you.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          {
            icon: '💡',
            title: 'Guide Requests',
            desc: 'Want a guide for a specific game, boss, or build? Let us know and we\'ll add it to our content pipeline.',
          },
          {
            icon: '🤝',
            title: 'Collaborations',
            desc: 'Interested in contributing as a writer, editor, or researcher? We\'re always looking for expert players.',
          },
          {
            icon: '🐛',
            title: 'Report Issues',
            desc: 'Found an error in a guide, a broken link, or a site bug? Help us fix it by reporting it.',
          },
        ].map((item) => (
          <div key={item.title} className="p-5 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <span className="text-2xl block mb-2">{item.icon}</span>
            <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact Info Card */}
      <div className="p-8 rounded-2xl text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,90,69,0.06), rgba(59,130,246,0.06))',
          border: '1px solid rgba(255,90,69,0.12)',
        }}>
        <div className="text-4xl mb-4">📧</div>
        <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Drop us a message
        </h2>
        <p className="text-sm leading-relaxed mb-1" style={{ color: 'var(--text-muted)' }}>
          We typically respond within 24-48 hours.
        </p>
        <p className="text-sm font-mono mt-3" style={{ color: 'var(--accent-purple)' }}>
          hello@controlresonant.com
        </p>
      </div>
    </div>
  );
}
