import Link from 'next/link';

import BrandLockup from '@/components/BrandLockup';
import { resolveNavHref } from '@/lib/seo';
import {
  contactDetailsConfirmed,
  decadesOfService,
  siteConfig,
  telHref,
} from '@/lib/site';

const quickLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
];

const involveLinks = [
  { href: '/help', label: 'Get Involved' },
  { href: '/help#donate', label: 'Donate' },
  { href: '/help#volunteer', label: 'Volunteer' },
  { href: '/help#collaborate', label: 'Collaborate' },
  { href: '/help#contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { address, phone, email } = siteConfig.contact;
  const live = contactDetailsConfirmed;

  return (
    <footer className="bg-primary-950 text-primary-200/70">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-5">
              <BrandLockup size="md" tone="dark" />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              {siteConfig.legalName} is a trusted Indian NGO empowering
              communities and transforming lives through dedicated social work
              spanning over {decadesOfService()}.
            </p>

            {/* Placeholder details stay unlinked until confirmed. */}
            <address className="not-italic text-sm mt-6 space-y-1.5">
              <p className="max-w-xs">{address}</p>
              <p>
                {live ? (
                  <a href={telHref(phone)} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                ) : (
                  phone
                )}
              </p>
              <p>
                {live ? (
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
                  </a>
                ) : (
                  email
                )}
              </p>
            </address>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h2 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
              Explore
            </h2>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={resolveNavHref(link.href)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get involved */}
          <div className="md:col-span-4">
            <h2 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
              Get Involved
            </h2>
            <ul className="space-y-2.5">
              {involveLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-primary-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-200/40">
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {legalLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-primary-200/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
