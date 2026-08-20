import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, Inter } from 'next/font/google';

import JsonLd from '@/components/JsonLd';
import { env } from '@/lib/env';
import { absoluteUrl, defaultOgImage } from '@/lib/seo';
import { FOUNDING_YEAR, siteConfig } from '@/lib/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${siteConfig.legalName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.legalName}`,
  },
  description: `${siteConfig.legalName} — ${siteConfig.description}`,
  applicationName: siteConfig.legalName,
  keywords: [
    siteConfig.legalName,
    'Utthan',
    'Utthan NGO',
    'NGO',
    'India',
    'social work',
    'community development',
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.legalName,
    locale: 'en_IN',
    url: env.siteUrl,
    title: `${siteConfig.legalName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.legalName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.logo.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#15803d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Tells search engines the registered name, that "Utthan" is the same
  // organisation, and which mark belongs to it — so the brand can surface as
  // a knowledge panel rather than a bare link.
  const organisationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${absoluteUrl()}/#organisation`,
    name: siteConfig.legalName,
    legalName: siteConfig.legalName,
    alternateName: [siteConfig.name, `${siteConfig.name} NGO`],
    description: siteConfig.description,
    url: absoluteUrl(),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(siteConfig.logo.src),
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
    },
    image: absoluteUrl(siteConfig.logo.src),
    foundingDate: String(FOUNDING_YEAR),
    areaServed: 'IN',
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    ...(siteConfig.contact.email || siteConfig.contact.phone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'general enquiries',
            ...(siteConfig.contact.email && { email: siteConfig.contact.email }),
            ...(siteConfig.contact.phone && { telephone: siteConfig.contact.phone }),
            areaServed: 'IN',
            availableLanguage: ['en', 'hi'],
          },
        }
      : {}),
  };

  // Lets the brand name resolve to the site itself, separate from the
  // organisation entity above.
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl()}/#website`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: absoluteUrl(),
    description: siteConfig.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${absoluteUrl()}/#organisation` },
  };

  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>
        <JsonLd data={organisationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
      </body>
    </html>
  );
}
