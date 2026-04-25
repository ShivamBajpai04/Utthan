import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, Inter } from 'next/font/google';

import { env } from '@/lib/env';

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
    default: 'Utthan — Empowering Communities, Transforming Lives',
    template: '%s | Utthan',
  },
  description:
    "A trusted Indian NGO working across women's safety, disability rehabilitation, community health, legal aid, and social justice for decades.",
  keywords: ['NGO', 'India', 'social work', 'community development', 'Utthan'],
  authors: [{ name: 'Utthan' }],
  openGraph: {
    type: 'website',
    siteName: 'Utthan',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
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
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
