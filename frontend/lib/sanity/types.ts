import type { PortableTextBlock } from '@portabletext/react';

export type Slug = { current: string };

export type Project = {
  _id: string;
  name: string;
  slug: Slug;
  description: string;
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
