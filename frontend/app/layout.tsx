import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { env } from '@/lib/env';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: 'Utthan NGO — Empowering Communities, Transforming Lives',
    template: '%s | Utthan NGO',
  },
  description:
    "A trusted Indian NGO working across women's safety, disability rehabilitation, community health, legal aid, and social justice for decades.",
  keywords: ['NGO', 'India', 'social work', 'community development'],
  authors: [{ name: 'Utthan NGO' }],
  openGraph: {
    type: 'website',
    siteName: 'Utthan NGO',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
