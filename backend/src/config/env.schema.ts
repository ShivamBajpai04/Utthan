import * as Joi from 'joi';

export interface AppConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  FRONTEND_URL: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_VERSION: string;
  SANITY_USE_CDN: boolean;
}

export const envSchema = Joi.object<AppConfig, true>({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().port().default(4000),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3000'),
  SANITY_PROJECT_ID: Joi.string().required(),
  SANITY_DATASET: Joi.string().default('production'),
  SANITY_API_VERSION: Joi.string().default('2025-03-04'),
  SANITY_USE_CDN: Joi.boolean().truthy('true').falsy('false').default(true),
});
