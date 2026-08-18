// ============================================
// affiliate-links.ts — Single source of truth for affiliate URLs
// Amazon Associates tag: controlresona-20 (approved 2026-08-18)
// GMG (Impact): pending approval — fill gmg.pc when approved
// ============================================

export const AMAZON_TAG = 'controlresona-20';

export const affiliateLinks = {
  amazon: {
    // Control Resonant Steelbook Edition (physical)
    ps5: `https://www.amazon.com/dp/B0H3WTH82X?tag=${AMAZON_TAG}`,
    xbox: `https://www.amazon.com/dp/B0H3WZTCD6?tag=${AMAZON_TAG}`,
  },
  // Green Man Gaming (PC digital key) — null until Impact approval lands.
  // Once approved, set gmg.pc to the tracking URL and BuyButton will render it.
  gmg: {
    pc: null as string | null,
  },
};
