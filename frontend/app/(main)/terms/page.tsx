import type { Metadata } from 'next';

import LegalDocument, { type LegalSection } from '@/components/LegalDocument';
import { contactDetailsConfirmed, siteConfig } from '@/lib/site';

const description = `The terms on which you may use the ${siteConfig.legalName} website.`;

export const metadata: Metadata = {
  title: 'Terms of Use',
  description,
  alternates: { canonical: '/terms' },
  openGraph: {
    type: 'website',
    url: '/terms',
    title: `Terms of Use | ${siteConfig.legalName}`,
    description,
  },
};

const LAST_UPDATED = '20 August 2026';

const sections: LegalSection[] = [
  {
    heading: 'Acceptance',
    body: [
      `By using this website you accept these terms. If you do not agree with them, please do not use the site. These terms apply to the website only — they do not govern participation in ${siteConfig.legalName} programmes, which is covered separately by the arrangements made with each participant.`,
    ],
  },
  {
    heading: 'Nothing here is professional advice',
    body: [
      `Some of our work involves legal aid, health, and rehabilitation. The information published on this website describes our programmes in general terms. It is not legal, medical, or professional advice, and it must not be relied on as a substitute for speaking to a qualified person about your own situation.`,
      'If you need help, please contact us or a qualified professional directly so that your circumstances can be considered properly.',
    ],
  },
  {
    heading: 'Accuracy of information',
    body: [
      'We aim to keep this site accurate and current, but programme details, locations, and availability change. We do not warrant that everything on the site is complete or up to date at the moment you read it, and we may change or remove content without notice.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      `The text, photographs, logo, and design of this site belong to ${siteConfig.legalName} or are used with permission. You are welcome to read, share, and link to our pages, and to quote short extracts with attribution.`,
      'Please do not reproduce substantial parts of the site, or use our name or logo in a way that suggests we endorse you or your organisation, without asking us first. Photographs of the people we work with may not be reused in any circumstances, as they are published under specific consents.',
    ],
  },
  {
    heading: 'Acceptable use',
    body: ['When using this site, please do not:'],
    bullets: [
      'attempt to gain unauthorised access to the site, its hosting, or its content management system',
      'interfere with the site\u2019s operation or availability for others',
      'collect content from the site by automated means beyond ordinary search engine indexing',
      'use the site or our name to mislead people, solicit funds, or impersonate us',
    ],
  },
  {
    heading: 'Links to other sites',
    body: [
      'Where we link to another organisation, a map, or an external resource, we do so for convenience. We do not control those sites and are not responsible for their content, availability, or privacy practices.',
    ],
  },
  {
    heading: 'Donations',
    body: [
      'Donation enquiries made through this site are handled by our team directly. Any statement about the tax treatment of a donation is a general description and depends on the exemptions in force and on your own circumstances; please seek confirmation from us and, if needed, your own adviser before donating.',
      'This site does not currently process payments. If that changes, the terms applying to online donations, including refunds, will be published before the facility goes live.',
    ],
  },
  {
    heading: 'Limitation of liability',
    body: [
      'The site is provided as it is. To the extent permitted by law, we are not liable for loss arising from your use of the site or from reliance on its contents. Nothing in these terms limits any liability that cannot lawfully be limited.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute arising from them. The specific seat of jurisdiction will be named here once confirmed.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions about these terms can be sent to us using the details on the Get Involved page.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Use"
      updated={LAST_UPDATED}
      notice={
        contactDetailsConfirmed
          ? undefined
          : 'These terms are a draft. The seat of jurisdiction is not yet named and they have not been reviewed by a legal adviser \u2014 particularly the sections on donations and tax treatment. Please review before launch.'
      }
      intro={`These terms explain the basis on which you may use this website. Please read them alongside our Privacy Policy.`}
      sections={sections}
    />
  );
}
