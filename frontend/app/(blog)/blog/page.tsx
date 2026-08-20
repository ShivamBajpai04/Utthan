import { format } from 'date-fns';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import JsonLd from '@/components/JsonLd';
import { sanityFetch } from '@/lib/sanity/fetch';
import { blogPostsQuery } from '@/lib/sanity/queries';
import type { BlogPostListItem } from '@/lib/sanity/types';
import { absoluteUrl, blogUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const description = `Stories, updates, and insights from ${siteConfig.legalName}'s work across India.`;

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: blogUrl() },
  openGraph: {
    type: 'website',
    url: blogUrl(),
    title: `Blog | ${siteConfig.legalName}`,
    description,
  },
};

export default async function BlogIndexPage() {
  const posts = await sanityFetch<BlogPostListItem[]>({
    query: blogPostsQuery,
    tags: ['post'],
  }).catch(() => [] as BlogPostListItem[]);

  if (posts.length === 0) {
    return (
      <div>
        <h1 className="font-heading text-4xl text-warm-900 mb-2">Blog</h1>
        <p className="text-warm-500 mb-12">
          Stories, updates, and insights from Utthan.
        </p>
        <div className="text-center py-16 bg-warm-50 rounded-2xl border-2 border-dashed border-warm-200">
          <p className="text-warm-500 font-medium">Our first posts are on the way.</p>
          <p className="text-warm-400 text-sm mt-1">
            Check back soon for stories from the field.
          </p>
        </div>
      </div>
    );
  }

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${blogUrl()}#blog`,
    name: `${siteConfig.legalName} Blog`,
    description,
    url: blogUrl(),
    inLanguage: 'en-IN',
    publisher: { '@id': `${absoluteUrl()}/#organisation` },
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: blogUrl(`/${post.slug.current}`),
      datePublished: post.publishedAt ?? undefined,
      ...(post.cover && { image: post.cover }),
      ...(post.author && { author: { '@type': 'Person', name: post.author } }),
    })),
  };

  return (
    <div>
      <JsonLd data={blogJsonLd} />

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
