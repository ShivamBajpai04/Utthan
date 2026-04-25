import { Injectable, NotFoundException } from '@nestjs/common';

import { SanityService } from '../sanity/sanity.service';

import type { BlogPost, BlogPostListItem, GalleryPhoto, Project } from './content.types';
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POSTS_QUERY,
  GALLERY_BY_PROJECT_QUERY,
  GALLERY_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECTS_QUERY,
} from './queries';

@Injectable()
export class ContentService {
  constructor(private readonly sanity: SanityService) {}

  getProjects(): Promise<Project[]> {
    return this.sanity.fetch<Project[]>(PROJECTS_QUERY);
  }

  async getProjectBySlug(slug: string): Promise<Project> {
    const project = await this.sanity.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug });
    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }
    return project;
  }

  getGallery(projectSlug?: string): Promise<GalleryPhoto[]> {
    if (projectSlug) {
      return this.sanity.fetch<GalleryPhoto[]>(GALLERY_BY_PROJECT_QUERY, { projectSlug });
    }
    return this.sanity.fetch<GalleryPhoto[]>(GALLERY_QUERY);
  }

  getBlogPosts(): Promise<BlogPostListItem[]> {
    return this.sanity.fetch<BlogPostListItem[]>(BLOG_POSTS_QUERY);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const post = await this.sanity.fetch<BlogPost | null>(BLOG_POST_BY_SLUG_QUERY, { slug });
    if (!post) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }
    return post;
  }
}
