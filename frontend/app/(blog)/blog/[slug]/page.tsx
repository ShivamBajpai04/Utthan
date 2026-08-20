import { format } from 'date-fns';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import JsonLd from '@/components/JsonLd';
import PortableTextBody from '@/components/PortableTextBody';
import { sanityFetch } from '@/lib/sanity/fetch';
import { blogPostBySlugQuery, blogPostSlugsQuery } from '@/lib/sanity/queries';
import { toPlainText } from '@/lib/sanity/types';
import type { BlogPost } from '@/lib/sanity/types';
import { absoluteUrl, blogUrl, breadcrumbJsonLd, metaDescription } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

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

  if (!post) return { title: 'Post not found', robots: { index: false, follow: false } };

  const description = post.body
    ? metaDescription(toPlainText(post.body))
    : `A post from ${siteConfig.legalName}.`;
  const url = blogUrl(`/${slug}`);
  const images = post.cover ? [{ url: post.cover, alt: post.coverAlt ?? post.title }] : undefined;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      authors: post.author ? [post.author] : undefined,
      images,
    },
    twitter: {
      card: post.cover ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
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

  const url = blogUrl(`/${slug}`);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.body ? metaDescription(toPlainText(post.body)) : undefined,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    image: post.cover ? [post.cover] : [absoluteUrl(siteConfig.logo.src)],
    author: post.author
      ? { '@type': 'Person', name: post.author }
      : { '@type': 'Organization', name: siteConfig.legalName },
    publisher: { '@id': `${absoluteUrl()}/#organisation` },
    inLanguage: 'en-IN',
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: absoluteUrl() },
    { name: 'Blog', url: blogUrl() },
    { name: post.title, url },
  ]);

  return (
    <article>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbs} />

      <nav className="mb-8" aria-label="Breadcrumb">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-warm-400 hover:text-warm-700 transition-colors"
        >
          <span aria-hidden="true">&larr;</span> All posts
        </Link>
      </nav>

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
        <PortableTextBody value={post.body} />
      ) : (
        <p className="text-warm-400">This post has no content yet.</p>
      )}

      <div className="mt-16 pt-8 border-t border-warm-200">
        <Link href="/blog" className="btn-secondary">
          Read more posts
        </Link>
      </div>
    </article>
  );
}
