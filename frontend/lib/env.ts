const required = (name: string, value: string | undefined): string => {
  if (!value || value.length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
};

export const env = {
  sanity: {
    projectId: required(
      'NEXT_PUBLIC_SANITY_PROJECT_ID',
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    ),
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-03-04',
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? '/studio',
    readToken: process.env.SANITY_API_READ_TOKEN,
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL ?? undefined,
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
} as const;
