// ============================================
// Privacy Policy Page — Trust Signal
// ============================================

import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy — Control Resonant Guide' },
  description: 'Control Resonant Guide privacy policy — learn how we collect, use, and protect your data.',
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="text-sm mb-10 flex items-center gap-2 flex-wrap" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
        Privacy Policy
      </h1>

      <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
        Last updated: July 31, 2026
      </p>

      <div className="space-y-8" style={{ color: 'var(--text-secondary)' }}>
        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Information We Collect</h2>
          <p className="leading-relaxed text-sm">
            We use Google Analytics 4 (GA4) to understand how visitors interact with our website.
            GA4 collects anonymous usage data including pages visited, time on site, device type,
            browser information, and approximate geographic location. No personally identifiable
            information (PII) such as names, email addresses, or IP addresses is stored.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. How We Use Your Data</h2>
          <p className="leading-relaxed text-sm">
            We use analytics data solely to improve our content and user experience —
            understanding which guides are most helpful, which games are trending,
            and how we can serve the gaming community better. We do not sell, trade,
            or share your data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Cookies</h2>
          <p className="leading-relaxed text-sm">
            GA4 uses first-party cookies to track user interactions. These cookies do not
            store personal information. You can disable cookies in your browser settings
            at any time, though this may affect how our site functions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Third-Party Services</h2>
          <p className="leading-relaxed text-sm">
            Our website may contain links to external sites (game developers, publishers, community guides).
            We are not responsible for the privacy practices of these third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Children&quot;s Privacy</h2>
          <p className="leading-relaxed text-sm">
            Control Resonant Guide is a general-audience gaming resource. We do not knowingly collect
            information from children under 13. If you believe your child has provided us
            with personal information, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Contact Us</h2>
          <p className="leading-relaxed text-sm">
            If you have questions about this privacy policy, please{' '}
            <Link href="/contact" className="underline hover:text-white transition-colors" style={{ color: 'var(--accent-purple)' }}>
              contact us
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
