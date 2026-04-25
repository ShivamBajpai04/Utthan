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
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-gray-500">Posts will appear here once published in the CMS.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Stories, updates, and insights from Utthan.</p>

      <div className="space-y-12">
        {posts.map(post => (
          <article key={post._id} className="group">
            <Link href={`/blog/${post.slug.current}`} className="block">
              {post.cover ? (
                <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt ?? post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              ) : null}
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                {post.title}
              </h2>
              <div className="text-sm text-gray-400">
                {post.publishedAt
                  ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
                  : null}
                {post.author ? (
                  <span>
                    {post.publishedAt ? ' · ' : ''}
                    {post.author}
                  </span>
                ) : null}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
