import { Controller, Get, Param, Query } from '@nestjs/common';

import { ContentService } from './content.service';
import { SlugParams } from './dto/slug.params';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('projects')
  getProjects() {
    return this.contentService.getProjects();
  }

  @Get('projects/:slug')
  getProjectBySlug(@Param() { slug }: SlugParams) {
    return this.contentService.getProjectBySlug(slug);
  }

  @Get('gallery')
  getGallery(@Query('project') projectSlug?: string) {
    return this.contentService.getGallery(projectSlug);
  }

  @Get('blog')
  getBlogPosts() {
    return this.contentService.getBlogPosts();
  }

  @Get('blog/:slug')
  getBlogPostBySlug(@Param() { slug }: SlugParams) {
    return this.contentService.getBlogPostBySlug(slug);
  }
}
