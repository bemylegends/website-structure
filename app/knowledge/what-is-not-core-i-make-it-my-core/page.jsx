import ArticlePage from '@/components/ArticlePage';
import { ARTICLES } from '@/data/knowledge';

const SLUG = 'what-is-not-core-i-make-it-my-core';
const a = ARTICLES.find((x) => x.slug === SLUG);
export const metadata = { title: 'Legends — ' + (a ? a.title : 'Knowledge'), description: a ? a.excerpt : undefined };

export const revalidate = 3600;

export default function Page() {
  return <ArticlePage slug={SLUG} />;
}
