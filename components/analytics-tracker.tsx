'use client';

/**
 * AnalyticsTracker — GA4 Enhanced Measurement
 *
 * Tracks three engagement signals beyond default page views:
 * 1. Scroll depth — fires scroll_depth event at 25/50/75/100% milestones
 * 2. Content engagement — fires content_engaged after 30s active reading
 * 3. Internal link clicks — fires internal_link_click for any <a href="/...">
 *
 * Usage: <AnalyticsTracker /> inside any article or content page.
 * Uses window.gtag (injected by @next/third-parties/google GoogleAnalytics).
 */

import { useEffect, useRef } from 'react';

// ---------- Type guard for gtag ----------
function gtag(...args: any[]) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
}

// ---------- Scroll depth tracker (IntersectionObserver) ----------
function useScrollDepthTracker() {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [0.25, 0.5, 0.75, 1.0];

    // Place invisible sentinel elements at each depth threshold
    const sentinels = milestones.map((percent) => {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.top = `${percent * 100}%`;
      el.style.left = '0';
      el.style.width = '1px';
      el.style.height = '1px';
      el.style.pointerEvents = 'none';
      el.dataset.scrollDepth = String(percent);
      return el;
    });

    // Wrap the article body
    const article = document.querySelector('.article-body') as HTMLElement | null;
    if (!article) return;

    // Make the article position:relative so sentinels work
    const prevPosition = article.style.position;
    article.style.position = 'relative';
    sentinels.forEach((s) => article.appendChild(s));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const depth = (entry.target as HTMLElement).dataset.scrollDepth;
            if (!depth) continue;
            const pct = parseInt(String(Number(depth) * 100), 10);
            if (!fired.current.has(pct)) {
              fired.current.add(pct);
              gtag('event', 'scroll_depth', {
                percent: pct,
                event_category: 'engagement',
              });
            }
          }
        }
      },
      { threshold: 0 },
    );

    sentinels.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      sentinels.forEach((s) => s.remove());
      article.style.position = prevPosition;
    };
  }, []);
}

// ---------- Time-on-page tracker ----------
function useEngagementTimer() {
  const fired = useRef(false);

  useEffect(() => {
    const ENGAGE_THRESHOLD_MS = 30_000; // 30 seconds
    const start = Date.now();

    const timer = setTimeout(() => {
      if (!fired.current) {
        fired.current = true;
        const seconds = Math.round((Date.now() - start) / 1000);
        gtag('event', 'content_engaged', {
          seconds,
          event_category: 'engagement',
        });
      }
    }, ENGAGE_THRESHOLD_MS);

    return () => clearTimeout(timer);
  }, []);
}

// ---------- Internal link click tracker ----------
function useInternalLinkTracker() {
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Only track internal links (starts with /)
      if (!href.startsWith('/')) return;

      // Skip anchor-only links
      if (href === '#' || href.startsWith('#')) return;

      const linkText = target.textContent?.trim().slice(0, 80) || '';
      const linkUrl = href;

      gtag('event', 'internal_link_click', {
        link_url: linkUrl,
        link_text: linkText,
        event_category: 'navigation',
      });
    }

    document.addEventListener('click', handler, { passive: true });
    return () => document.removeEventListener('click', handler);
  }, []);
}

// ---------- Main component ----------
export default function AnalyticsTracker() {
  useScrollDepthTracker();
  useEngagementTimer();
  useInternalLinkTracker();

  // Renders nothing — pure side-effect hooks
  return null;
}
