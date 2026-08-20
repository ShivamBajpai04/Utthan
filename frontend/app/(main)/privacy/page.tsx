import type { Metadata } from 'next';

import LegalDocument, { type LegalSection } from '@/components/LegalDocument';
import { contactDetailsConfirmed, siteConfig } from '@/lib/site';

const description = `How ${siteConfig.legalName} handles information collected through this website.`;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description,
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'website',
    url: '/privacy',
    title: `Privacy Policy | ${siteConfig.legalName}`,
    description,
  },
};

const LAST_UPDATED = '20 August 2026';

const sections: LegalSection[] = [
  {
    heading: 'What this policy covers',
    body: [
      `This policy applies only to this website. It does not cover the records ${siteConfig.legalName} keeps about the people who use our programmes — beneficiary information is handled offline under our programme and case-management policies, and is never published on or processed by this site.`,
    ],
  },
  {
    heading: 'Information we collect',
    body: [
      'This website has no contact forms, no accounts, and no newsletter sign-up. We do not ask you to submit any personal information in order to read it.',
      'Like any website, ours is served by a hosting provider that records basic technical information for security and reliability purposes. We do not use this information to identify individual visitors.',
    ],
    bullets: [
      'IP address and approximate region',
      'Browser and device type',
      'Pages requested, with dates and times',
    ],
  },
  {
    heading: 'Cookies and tracking',
    body: [
      'This website sets no cookies of its own and does not use advertising or cross-site tracking.',
      'Our fonts are bundled and served from our own domain rather than fetched from a third party, so simply reading a page does not notify anyone else that you visited.',
    ],
  },
  {
    heading: 'Third-party services',
    body: [
      'A small number of services are involved in delivering this site. Each one receives only what it needs to do its job.',
    ],
    bullets: [
      'Our hosting provider serves the pages and keeps the technical logs described above.',
      'Sanity, our content management system, stores the text and images shown on the site. Images are delivered from its content network, so your browser requests them from that domain.',
      'If you choose to open a "Get directions" link, Google Maps opens in a new tab and their own privacy policy applies from that point. We do not embed maps that load before you ask for them.',
    ],
  },
  {
    heading: 'Contacting us by email',
    body: [
      'Where the site offers an email link, selecting it opens your own email application. Nothing is sent until you send it. If you do write to us, we receive the contents of your message and your email address, and we keep that correspondence only for as long as we need it to respond and to maintain our records.',
    ],
  },
  {
    heading: 'Donations',
    body: [
      'Donation enquiries currently reach us by email or telephone; this website does not process payments and does not collect card or bank details. If we introduce online payments in future, this policy will be updated to name the payment provider and explain what they collect before that facility goes live.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'Under the Digital Personal Data Protection Act, 2023, you may ask us what personal data of yours we hold, ask us to correct it, or ask us to erase it where we are not required to retain it. You may also withdraw consent you have previously given, and nominate someone to exercise these rights on your behalf.',
      'To make any of these requests, please use the contact details on our Get Involved page.',
    ],
  },
  {
    heading: 'Grievances',
    body: [
      'If you are unhappy with how we have handled your information, please raise it with us using the contact details on the Get Involved page and we will look into it. Our designated grievance contact will be named here once confirmed.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'We will update this page whenever our practices change, and revise the "last updated" date above. Material changes — such as introducing analytics or online payments — will be described here before they take effect.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated={LAST_UPDATED}
      notice={
        contactDetailsConfirmed
          ? undefined
          : 'This policy is an accurate description of how the website currently works, but it is a draft: the grievance contact is not yet named, and it has not been reviewed by a legal adviser. Please review it before launch.'
      }
      intro={`${siteConfig.legalName} collects as little information as possible through this website. This page explains what is collected, who else is involved in delivering the site, and what you can ask us to do with information about you.`}
      sections={sections}
    />
  );
}
