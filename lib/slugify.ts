/**
 * Convert heading text to a URL-friendly slug ID.
 * Used consistently by TOC and MDX heading components so IDs always match.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '');
}
