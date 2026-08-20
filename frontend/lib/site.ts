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
  /**
   * `address` is nullable on purpose. A postal address is the one contact
   * detail the site can honestly omit — people act on phone and email, but a
   * wrong street address sends someone on a journey. Null renders nothing
   * anywhere and is withheld from structured data; it is not a placeholder.
   */
  contact: { address: string | null; phone: string; email: string };
};

/**
 * Whether the contact details below are real.
 *
 * While this is `false` the details still render, so the layout can be
 * reviewed, but they are deliberately inert: no `tel:`/`mailto:`/maps links,
 * a visible "to be confirmed" notice, and nothing is published to structured
 * data. A fabricated phone number or address is worse than none — search
 * engines cache it and people act on it.
 *
 * Now `true`: the phone and email below are the organisation's real details.
 * There is deliberately no postal address rather than a placeholder one, and
 * `centres` is empty for the same reason. `scripts/check-launch-readiness.mjs`
 * fails the build if this is `true` while any placeholder text survives.
 */
export const contactDetailsConfirmed = true;

/**
 * How money can actually reach the organisation right now.
 *
 * Nothing here is invented: every field starts empty, and the UI renders only
 * what is filled in. While `qrImage`, `upiId` and `bankTransfer` are all null
 * there is no way to give, so the donate CTAs must not promise a transaction —
 * see `givingIsLive` and `donateCta` below, which every Donate button reads
 * from.
 *
 * Setting any one of the three is enough: the funnel becomes a real one, all
 * five CTAs relabel from "Support us" to "Donate", and the "we are still
 * setting up" note on /help is replaced by the actual details. No component
 * changes needed.
 */
export const giving: {
  /**
   * A payment QR code — the lowest-effort way to make giving real: no gateway,
   * no backend, no card data touching this site. Drop the image in
   * `public/images/` and point `src` at it.
   *
   * `alt` must name what scanning it does, not what the image is: a screen
   * reader user cannot scan a QR code, so "QR code" alone tells them nothing
   * actionable. Pair it with `upiId` where possible so there is a
   * copy-pasteable equivalent.
   */
  qrImage: { src: string; alt: string } | null;
  upiId: string | null;
  bankTransfer: {
    accountName: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
  } | null;
  /** Registration numbers donors look for before giving. */
  registrations: { label: string; value: string }[];
  /** Suggested amounts and what each one actually funds. */
  tiers: { amount: number; funds: string }[];
} = {
  qrImage: null,
  upiId: null,
  bankTransfer: null,
  registrations: [],
  tiers: [],
};

/** True once a visitor can complete a donation without contacting anyone. */
export const givingIsLive =
  giving.qrImage !== null ||
  giving.upiId !== null ||
  giving.bankTransfer !== null;

/**
 * The donate CTA's label and destination.
 *
 * Until giving is live this is an enquiry, not a transaction. A button that
 * says "Donate" and cannot take a donation costs more trust than it earns.
 *
 * `shortLabel` is for the persistent chrome — header, footer, sticky bar —
 * which can share a viewport with the in-content ask. Two identical buttons
 * in one screen read as a rendering bug, not as emphasis.
 */
export const donateCta = givingIsLive
  ? { label: 'Donate', shortLabel: 'Donate', href: '/help#donate' }
  : { label: 'Support our work', shortLabel: 'Support us', href: '/help#donate' };

/** Indian rupees, no decimals — donation amounts are always whole. */
export function formatRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const siteConfig: SiteConfig = {
  legalName: 'Utthan Institute of Development Studies',
  name: 'Utthan',
  subtitle: 'Institute of Development Studies',
  tagline: 'Empowering Communities, Transforming Lives',
  description:
    "A trusted Indian NGO working across women's safety, disability rehabilitation, community health, legal aid, and social justice.",
  logo: { src: '/images/utthan-logo.png', width: 480, height: 365 },
  contact: {
    // No postal address published yet — see the type note above.
    address: null,
    phone: '+91 94160 23379',
    email: 'pramodkumarbajpai@gmail.com',
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

/**
 * Centres visitors can travel to.
 *
 * Empty until real addresses exist. The "Visit us" section on /help hides
 * itself while this is empty rather than showing invented locations — the two
 * entries that used to live here were "00 Example Road" placeholders, and a
 * fake address for a disability rehabilitation centre is the worst possible
 * thing to publish, because the people most likely to act on it are the least
 * able to absorb a wasted journey.
 */
export const centres: Centre[] = [];

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

/**
 * Headline numbers.
 *
 * Every figure is either derived from `FOUNDING_YEAR` or quoted from the
 * organisation's own published project descriptions in Sanity — the source is
 * noted on each line. The previous "100K+ Lives Touched", "25+ Active
 * Programmes" and "15+ Centres & Locations" had no source anywhere and were
 * removed: a round number a donor cannot verify costs more trust than a
 * specific one earns, especially when the real figures were already published
 * three sections further down the same page.
 *
 * Three of these four come from the Mahila Suraksha and Vikas Manch
 * description. Worth broadening once the other programmes publish figures of
 * their own — replace, do not pad.
 */
export function impactStats() {
  return [
    { value: `${yearsOfService()}+`, label: 'Years of Service' },
    // "over 15000 cases of family disputes have been settled so far"
    { value: '15,000+', label: 'Family Disputes Settled' },
    // "About 10000 women are associated with our Mahila Suraksha … programme"
    { value: '10,000+', label: 'Women in Our Collectives' },
    // "Over 127 units of grassroots women's groups"
    { value: '127', label: "Grassroots Women's Groups" },
  ];
}
