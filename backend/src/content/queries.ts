const notDraft = '!(_id in path("drafts.**"))';

// ── Projects ────────────────────────────────────────────────────────────

export const PROJECTS_QUERY = `*[_type == "project" && ${notDraft}] | order(order asc) {
  _id,
  name,
  slug,
  description,
  order
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug && ${notDraft}][0] {
  _id,
  name,
  slug,
  description
}`;

// ── Gallery ─────────────────────────────────────────────────────────────

export const GALLERY_QUERY = `*[_type == "galleryPhoto" && ${notDraft}] | order(order asc, _createdAt desc) {
  _id,
  "url": image.asset->url,
  description,
  alt,
  "projectSlug": project->slug.current,
  "projectName": project->name,
  order
}`;

export const GALLERY_BY_PROJECT_QUERY = `*[_type == "galleryPhoto" && project->slug.current == $projectSlug && ${notDraft}] | order(order asc, _createdAt desc) {
  _id,
  "url": image.asset->url,
  description,
  alt,
  "projectSlug": project->slug.current,
  "projectName": project->name,
  order
}`;

// ── Blog ────────────────────────────────────────────────────────────────

export const BLOG_POSTS_QUERY = `*[_type == "post" && ${notDraft}] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  "cover": cover.asset->url,
  "coverAlt": cover.alt,
  "author": author->name,
  publishedAt
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug && ${notDraft}][0] {
  _id,
  title,
  slug,
  body,
  "cover": cover.asset->url,
  "coverAlt": cover.alt,
  "author": author->name,
  publishedAt
}`;
