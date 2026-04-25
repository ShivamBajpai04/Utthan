import { format } from 'date-fns';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { sanityFetch } from '@/lib/sanity/fetch';
import { blogPostsQuery } from '@/lib/sanity/queries';
import type { BlogPostListItem } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'All Posts',
};

export default async function BlogIndexPage() {
  const posts = await sanityFetch<BlogPostListItem[]>({
    query: blogPostsQuery,
    tags: ['post'],
  }).catch(() => [] as BlogPostListItem[]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="font-heading text-3xl text-warm-900 mb-4">Blog</h1>
        <p className="text-warm-400">Posts will appear here once published in the CMS.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-4xl text-warm-900 mb-2">Blog</h1>
      <p className="text-warm-500 mb-12">Stories, updates, and insights from Utthan.</p>

      <div className="space-y-14">
        {posts.map(post => (
          <article key={post._id} className="group">
            <Link href={`/blog/${post.slug.current}`} className="block">
              {post.cover && (
                <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-5">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt ?? post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}
              <h2 className="font-heading text-2xl text-warm-900 group-hover:text-primary-700 transition-colors mb-2">
                {post.title}
              </h2>
              <div className="text-sm text-warm-400">
                {post.publishedAt && format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                {post.author && (
                  <span>
                    {post.publishedAt ? ' · ' : ''}
                    {post.author}
                  </span>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
