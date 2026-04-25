import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, type SanityClient } from '@sanity/client';

import type { AppConfig } from '../config/env.schema';

import { SanityService } from './sanity.service';
import { SANITY_CLIENT } from './sanity.tokens';

@Module({
  providers: [
    {
      provide: SANITY_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>): SanityClient => {
        const nodeEnv = config.get('NODE_ENV', { infer: true });
        const useCdnEnv = config.get('SANITY_USE_CDN', { infer: true });

        return createClient({
          projectId: config.get('SANITY_PROJECT_ID', { infer: true }),
          dataset: config.get('SANITY_DATASET', { infer: true }),
          apiVersion: config.get('SANITY_API_VERSION', { infer: true }),
          useCdn: nodeEnv === 'production' ? useCdnEnv : false,
          perspective: 'published',
        });
      },
    },
    SanityService,
  ],
  exports: [SanityService, SANITY_CLIENT],
})
export class SanityModule {}
