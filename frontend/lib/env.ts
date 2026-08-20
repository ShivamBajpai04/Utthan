const required = (name: string, value: string | undefined): string => {
  if (!value || value.length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
};

/** A declared-but-blank variable (`FOO=`) means "unset", not an empty URL. */
const optional = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\/$/, '') : undefined;
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
  siteUrl: optional(process.env.NEXT_PUBLIC_SITE_URL) ?? 'http://localhost:3000',
  blogUrl: optional(process.env.NEXT_PUBLIC_BLOG_URL),
  apiUrl: optional(process.env.NEXT_PUBLIC_API_URL) ?? 'http://localhost:4000',
} as const;
