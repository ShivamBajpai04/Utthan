/**
 * Single source of truth for organisation facts that appear in more than one
 * place. Keeping them here prevents the site from contradicting itself (e.g.
 * "since 1991" in the hero vs "50+ years of service" in the impact stats).
 */

export const FOUNDING_YEAR = 1991;

/** Full years of service, derived from the founding year. */
export function yearsOfService(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDING_YEAR;
}

/** e.g. "three decades" — used in prose where a round number reads better. */
export function decadesOfService(now: Date = new Date()): string {
  const words = ['', 'one', 'two', 'three', 'four', 'five', 'six'] as const;
  const decades = Math.floor(yearsOfService(now) / 10);
  return `${words[decades] ?? decades} decades`;
}

type SiteConfig = {
  /** Full registered name. Use wherever the organisation identifies itself. */
  legalName: string;
  /** Short form, for running prose and tight spaces. */
  name: string;
  /** The qualifier below the wordmark in the logo lockup. */
  subtitle: string;
  tagline: string;
  description: string;
  logo: { src: string; width: number; height: number };
  contact: { address: string; phone: string; email: string };
};

/**
 * Whether the contact details and centre addresses below are real.
 *
 * While this is `false` the details still render, so the layout can be
 * reviewed, but they are deliberately inert: no `tel:`/`mailto:`/maps links,
 * a visible "to be confirmed" notice, and nothing is published to structured
 * data. A fabricated phone number or address is worse than none — search
 * engines cache it and people act on it.
 *
 * Replace the placeholders below, then set this to `true`.
 */
export const contactDetailsConfirmed = false;

export const siteConfig: SiteConfig = {
  legalName: 'Utthan Institute of Development Studies',
  name: 'Utthan',
  subtitle: 'Institute of Development Studies',
  tagline: 'Empowering Communities, Transforming Lives',
  description:
    "A trusted Indian NGO working across women's safety, disability rehabilitation, community health, legal aid, and social justice.",
  logo: { src: '/images/utthan-logo.png', width: 480, height: 365 },
  /** Placeholders — see `contactDetailsConfirmed` before going live. */
  contact: {
    address: '00 Example Road, Example Nagar, New Delhi, Delhi 110001',
    phone: '+91 00000 00000',
    email: 'contact@example.org',
  },
};

export type Centre = {
  id: string;
  /** Display name, e.g. "Head Office" or a programme centre. */
  name: string;
  address: string;
  /** Free-text query handed to Google Maps. Usually name + locality. */
  mapsQuery: string;
};

/** Centres visitors can travel to. Placeholders until confirmed. */
export const centres: Centre[] = [
  {
    id: 'head-office',
    name: 'Head Office',
    address: '00 Example Road, Example Nagar, New Delhi, Delhi 110001',
    mapsQuery: 'Utthan Institute of Development Studies, New Delhi',
  },
  {
    id: 'koshish-centre',
    name: 'Koshish — Disability Rehabilitation Centre',
    address: '00 Example Street, Example Colony, New Delhi, Delhi 110002',
    mapsQuery: 'Koshish Disability Rehabilitation Centre, New Delhi',
  },
];

/** Google Maps link that drops a pin on the place. */
export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Google Maps link that starts navigation from the visitor's location. */
export function mapsDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** Digits-only form for `tel:` hrefs. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}


export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/help', label: 'Get Involved' },
] as const;

export type ValueId =
  | 'dignity'
  | 'participation'
  | 'inclusion'
  | 'justice'
  | 'impact';

export const values: {
  id: ValueId;
  title: string;
  description: string;
}[] = [
  {
    id: 'dignity',
    title: 'Dignity',
    description: 'Respecting the inherent worth of every individual we serve.',
  },
  {
    id: 'participation',
    title: 'Participation',
    description:
      'Communities lead their own transformation — we walk alongside them.',
  },
  {
    id: 'inclusion',
    title: 'Inclusion',
    description: 'Every voice matters, especially those society often overlooks.',
  },
  {
    id: 'justice',
    title: 'Justice',
    description: 'Advocating for rights, equity, and fairness in all our endeavours.',
  },
  {
    id: 'impact',
    title: 'Long-term Impact',
    description:
      'Building change that outlasts a single programme, grant, or generation.',
  },
];

/** Headline numbers. Kept here so the about-page timeline and the impact
 *  section can never drift apart. */
export function impactStats() {
  return [
    { value: `${yearsOfService()}+`, label: 'Years of Service' },
    { value: '100K+', label: 'Lives Touched' },
    { value: '25+', label: 'Active Programmes' },
    { value: '15+', label: 'Centres & Locations' },
  ];
}
