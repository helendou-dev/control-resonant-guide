// ============================================
// site-config.ts — Single source of truth for site URL / brand
// Update this file if the domain ever changes.
// ============================================

export const siteConfig = {
  name: 'Control Resonant Wiki',
  url: 'https://controlresonantguide.com',
  domain: 'controlresonantguide.com',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
};
