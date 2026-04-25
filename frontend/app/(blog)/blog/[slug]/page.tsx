import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { sanityFetch } from '@/lib/sanity/fetch';
import { blogPostBySlugQuery, blogPostSlugsQuery } from '@/lib/sanity/queries';
import type { BlogPost } from '@/lib/sanity/types';

import { portableTextComponents } from './portable-text';

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await sanityFetch<string[]>({
    query: blogPostSlugsQuery,
    revalidate: 3600,
  }).catch(() => [] as string[]);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost | null>({
    query: blogPostBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`],
  }).catch(() => null);

  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    openGraph: {
      type: 'article',
      title: post.title,
      publishedTime: post.publishedAt ?? undefined,
      authors: post.author ? [post.author] : undefined,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost | null>({
    query: blogPostBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`],
  }).catch(() => null);

  if (!post) notFound();

  return (
    <article>
      {post.cover && (
        <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-10">
          <Image
            src={post.cover}
            alt={post.coverAlt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="font-heading text-4xl md:text-5xl text-warm-900 leading-tight mb-5">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-warm-400 mb-12 pb-8 border-b border-warm-200">
        {post.publishedAt && (
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
          </time>
        )}
        {post.author && <span>· {post.author}</span>}
      </div>

      {post.body ? (
        <div className="prose prose-lg prose-stone max-w-none prose-headings:font-heading prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      ) : (
        <p className="text-warm-400">Content will appear once published in the CMS.</p>
      )}
    </article>
  );
}
