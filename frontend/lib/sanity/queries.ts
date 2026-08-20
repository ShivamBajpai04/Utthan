import { defineQuery } from 'next-sanity';

const notDraft = '!(_id in path("drafts.**"))';

// ── Projects ────────────────────────────────────────────────────────────

export const projectsQuery = defineQuery(`
  *[_type == "project" && ${notDraft}] | order(order asc) {
    _id,
    name,
    slug,
    description,
    order
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug && ${notDraft}][0] {
    _id,
    name,
    slug,
    description
  }
`);

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current) && ${notDraft}][].slug.current
`);

/** Slug plus last-edit time, for sitemap `lastModified`. */
export const projectSitemapQuery = defineQuery(`
  *[_type == "project" && defined(slug.current) && ${notDraft}] {
    "slug": slug.current,
    _updatedAt
  }
`);

// ── Gallery ─────────────────────────────────────────────────────────────

export const galleryPhotosQuery = defineQuery(`
  *[_type == "galleryPhoto" && ${notDraft}] | order(order asc, _createdAt desc) {
    _id,
    "url": image.asset->url,
    description,
    alt,
    "projectSlug": project->slug.current,
    "projectName": project->name,
    order
  }
`);

/** Single most recent gallery photo, for the home hero backdrop. */
export const heroPhotoQuery = defineQuery(`
  *[_type == "galleryPhoto" && ${notDraft} && defined(image.asset)]
    | order(order asc, _createdAt desc)[0] {
    _id,
    "url": image.asset->url,
    description,
    alt,
    "projectSlug": project->slug.current,
    "projectName": project->name,
    order
  }
`);

export const galleryPhotosByProjectQuery = defineQuery(`
  *[_type == "galleryPhoto" && project->slug.current == $projectSlug && ${notDraft}] | order(order asc, _createdAt desc) {
    _id,
    "url": image.asset->url,
    description,
    alt,
    "projectSlug": project->slug.current,
    "projectName": project->name,
    order
  }
`);

// ── Blog ────────────────────────────────────────────────────────────────

export const blogPostsQuery = defineQuery(`
  *[_type == "post" && ${notDraft}] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    slug,
    "cover": cover.asset->url,
    "coverAlt": cover.alt,
    "author": author->name,
    publishedAt
  }
`);

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && ${notDraft}][0] {
    _id,
    title,
    slug,
    // Dereference inline images so the renderer receives a usable asset URL.
    body[] {
      ...,
      _type == "image" => { ..., "asset": asset->{url} }
    },
    "cover": cover.asset->url,
    "coverAlt": cover.alt,
    "author": author->name,
    publishedAt
  }
`);

export const blogPostSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && ${notDraft}][].slug.current
`);

/** Slug plus dates, for sitemap `lastModified`. */
export const blogPostSitemapQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && ${notDraft}] {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`);
