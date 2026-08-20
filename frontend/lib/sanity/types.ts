import type { PortableTextBlock } from '@portabletext/react';

export type Slug = { current: string };

/** Extract plain text from Portable Text blocks or a legacy plain string. */
export function toPlainText(value?: PortableTextBlock[] | string | null): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (!Array.isArray(value)) return '';
  return value
    .map(block =>
      'children' in block
        ? (block.children as { text?: string }[])?.map(c => c.text ?? '').join('')
        : '',
    )
    .filter(Boolean)
    .join(' ');
}

export type Project = {
  _id: string;
  name: string;
  slug: Slug;
  description: PortableTextBlock[] | string;
  order?: number | null;
};

export type GalleryPhoto = {
  _id: string;
  url: string;
  description?: string | null;
  alt?: string | null;
  projectSlug: string;
  projectName: string;
  order?: number | null;
};

export type BlogPostListItem = {
  _id: string;
  title: string;
  slug: Slug;
  cover?: string | null;
  coverAlt?: string | null;
  author?: string | null;
  publishedAt?: string | null;
};

export type BlogPost = BlogPostListItem & {
  body?: PortableTextBlock[] | null;
};

export type SitemapEntry = {
  slug: string;
  publishedAt?: string | null;
  _updatedAt?: string | null;
};
