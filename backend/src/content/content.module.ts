import { Module } from '@nestjs/common';

import { SanityModule } from '../sanity/sanity.module';

import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  imports: [SanityModule],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
