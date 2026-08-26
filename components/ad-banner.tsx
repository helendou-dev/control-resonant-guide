'use client';

// ============================================
// ad-banner.tsx — Adsterra display ad slots
// Client component: injects ad scripts after hydration.
//
// Variants:
//   auto        — Adsterra "container" format (adaptive size, no atOptions
//                 dependency). Safe to place anywhere.
//   rectangle   — 300x250 iframe banner.
//   leaderboard — 728x90 iframe banner.
//   mobile      — 320x50 iframe banner.
//
// IMPORTANT: atOptions is a GLOBAL variable. If two iframe-format ad units
// load on the same page, the later script overwrites atOptions before the
// earlier invoke.js runs, breaking ad sizing. Rule: at most ONE iframe-
// format variant per page. The "auto" (container) format is independent and
// can always coexist.
// ============================================

import { useEffect, useRef } from 'react';

type AdVariant = 'auto' | 'rectangle' | 'leaderboard' | 'mobile';

interface AdConfig {
  key: string;
  host: string;
  width?: number;
  height?: number;
}

const AD_CONFIG: Record<AdVariant, AdConfig> = {
  auto: {
    key: 'd85b42c236d1fa19ef6760c5d0a235f9',
    host: 'pl31034917.profitableratecpmnetwork.com',
  },
  rectangle: {
    key: '08de129560bbd6852b889a49c5484e45',
    host: 'www.highrevenueformat.com',
    width: 300,
    height: 250,
  },
  mobile: {
    key: '2327183e9dd7d62381a4d21acd9245de',
    host: 'www.highrevenueformat.com',
    width: 320,
    height: 50,
  },
  leaderboard: {
    key: 'd45059fd5056e56ef32d77dcdfb1979e',
    host: 'www.highrevenueformat.com',
    width: 728,
    height: 90,
  },
};

export default function AdBanner({ variant = 'auto' }: { variant?: AdVariant }) {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const config = AD_CONFIG[variant];
    if (!config) return;

    // Guard against double-injection (React StrictMode dev remounts effects)
    if (slot.dataset.loaded === 'true') return;
    slot.dataset.loaded = 'true';

    if (variant === 'auto') {
      // Container format: script locates the div by id and injects the ad.
      const s = document.createElement('script');
      s.src = `https://${config.host}/${config.key}/invoke.js`;
      s.async = true;
      s.setAttribute('data-cfasync', 'false');
      document.body.appendChild(s);
      return;
    }

    // Iframe format: keep atOptions scoped inside the slot element so the
    // invoke.js (which reads the global atOptions synchronously at load)
    // inserts the iframe right here, not at the end of <body>.
    slot.innerHTML = '';
    const opts = document.createElement('script');
    opts.text = `atOptions = { 'key': '${config.key}', 'format': 'iframe', 'height': ${config.height}, 'width': ${config.width}, 'params': {} };`;
    slot.appendChild(opts);
    const loader = document.createElement('script');
    loader.src = `https://${config.host}/${config.key}/invoke.js`;
    slot.appendChild(loader);
  }, [variant]);

  return (
    <div
      ref={slotRef}
      id={variant === 'auto' ? `container-${AD_CONFIG.auto.key}` : undefined}
      className="ad-slot"
      aria-label="Advertisement"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1.5rem auto',
        minHeight: variant === 'auto' ? undefined : AD_CONFIG[variant].height,
        overflow: 'hidden',
      }}
    />
  );
}
