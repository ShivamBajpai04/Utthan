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

export const siteConfig: SiteConfig = {
  legalName: 'Utthan Institute of Development Studies',
  name: 'Utthan',
  subtitle: 'Institute of Development Studies',
  tagline: 'Empowering Communities, Transforming Lives',
  description:
    "A trusted Indian NGO working across women's safety, disability rehabilitation, community health, legal aid, and social justice.",
  logo: { src: '/images/utthan-logo.png', width: 480, height: 365 },
  /**
   * Fill these in with the organisation's real details. Anything left blank is
   * hidden from the site rather than rendered as placeholder text.
   */
  contact: {
    address: '',
    phone: '',
    email: '',
  },
};

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
