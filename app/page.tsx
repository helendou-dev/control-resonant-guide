// Server component — fetches data, passes to client component for rendering
import type { Metadata } from 'next';
import { listAllContent } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';
import HomePageClient from '@/components/home-page-client';

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  const allArticles = listAllContent();
  return <HomePageClient allArticles={allArticles} />;
}
