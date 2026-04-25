import { Inject, Injectable, Logger } from '@nestjs/common';
import type { QueryParams, SanityClient } from '@sanity/client';

import { SANITY_CLIENT } from './sanity.tokens';

@Injectable()
export class SanityService {
  private readonly logger = new Logger(SanityService.name);

  constructor(@Inject(SANITY_CLIENT) private readonly client: SanityClient) {}

  async fetch<T>(query: string, params: QueryParams = {}): Promise<T> {
    try {
      return await this.client.fetch<T>(query, params);
    } catch (error) {
      this.logger.error(
        `Sanity fetch failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  getClient(): SanityClient {
    return this.client;
  }
}
