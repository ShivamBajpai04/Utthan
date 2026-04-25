import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Help',
  description:
    'Donate, volunteer, or collaborate with Utthan — every contribution helps us continue our mission of empowering communities across India.',
};

export default function HowToHelpPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-custom max-w-4xl">
        <h1 className="heading-1 mb-4">How to Help</h1>
        <p className="prose-custom mb-12 max-w-3xl">
          There are many ways to support our mission. Every contribution, whether through
          donations, volunteering, or collaboration, helps us continue our work.
        </p>

        <div className="space-y-16">
          <section id="donate">
            <h2 className="heading-2 mb-6">Donate</h2>
            <div className="prose-custom">
              <p>
                Your financial support helps us continue our programs and reach more communities.
                Donations are used to fund our various initiatives, including women&apos;s
                empowerment, disability rehabilitation, community health programs, and legal aid
                services.
              </p>
              <p className="mt-4">
                To donate, please contact us using the information below. We accept donations
                through bank transfers and other methods. All donations are eligible for tax
                deductions as per applicable laws.
              </p>
            </div>
          </section>

          <section id="volunteer">
            <h2 className="heading-2 mb-6">Volunteer</h2>
            <div className="prose-custom">
              <p>
                Volunteers are the backbone of our organization. We welcome individuals who are
                passionate about social change and want to contribute their time and skills.
              </p>
              <p className="mt-4">
                Volunteer opportunities are available across our programs. Whether you can
                contribute a few hours a week or are looking for a more intensive engagement, we
                would love to hear from you.
              </p>
            </div>
          </section>

          <section id="collaborate">
            <h2 className="heading-2 mb-6">Collaborate</h2>
            <div className="prose-custom">
              <p>
                We collaborate with other NGOs, government bodies, educational institutions, and
                corporations to amplify our impact. If your organization shares our values and
                mission, we would be happy to explore collaboration opportunities.
              </p>
            </div>
          </section>

          <section id="contact" className="bg-gray-50 p-8 rounded-lg">
            <h2 className="heading-2 mb-6">Contact Us</h2>
            <div className="prose-custom">
              <p>
                To get in touch about donations, volunteering, or collaboration opportunities,
                please reach out to us. Our team will respond to your inquiry as soon as
                possible.
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Address:</strong> Edit with your organization&apos;s address
                </p>
                <p>
                  <strong>Phone:</strong> Edit with your contact number
                </p>
                <p>
                  <strong>Email:</strong> Edit with your email address
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
