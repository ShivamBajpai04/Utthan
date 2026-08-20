import Image from 'next/image';

import {
  formatRupees,
  giving,
  givingIsLive,
  siteConfig,
} from '@/lib/site';

/**
 * The inside of the "Donate" section on /help.
 *
 * Renders only what is actually filled in (see `giving` in lib/site.ts), so
 * this cannot promise a payment channel that does not exist. While nothing is
 * configured it says so plainly instead of offering a button that leads
 * nowhere — the previous behaviour, which scrolled the visitor 400px down to
 * a placeholder phone number.
 */
export default function GivingDetails() {
  const { qrImage, upiId, bankTransfer, registrations, tiers } = giving;

  return (
    <div className="space-y-8">
      {tiers.length > 0 && (
        <div>
          <h3 className="font-heading text-lg text-warm-900 mb-4">
            What your support funds
          </h3>
          <dl className="grid gap-3 sm:grid-cols-2">
            {tiers.map(tier => (
              <div
                key={tier.amount}
                className="border-b border-warm-200 pb-3 last:border-b-0"
              >
                <dt className="font-heading text-xl text-warm-900">
                  {formatRupees(tier.amount)}
                </dt>
                <dd className="text-[0.95rem] text-warm-600 leading-relaxed">
                  {tier.funds}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {givingIsLive ? (
        <div>
          <h3 className="font-heading text-lg text-warm-900 mb-4">How to give</h3>

          {qrImage && (
            <figure className="mb-6">
              {/* White ground and generous quiet zone regardless of the
                  section's background — a QR code on a tinted or cropped
                  surface is measurably harder for a camera to resolve. */}
              <div className="inline-block bg-white border border-warm-200 rounded-xl p-4">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52">
                  {/* `unoptimized` on purpose. The image pipeline re-encodes
                      at q=75, and lossy resampling smears the fine modules of
                      a QR code — a compression artifact here is not a cosmetic
                      problem, it is a payment that fails to scan. The file is
                      a few KB; serve it exactly as supplied. */}
                  <Image
                    src={qrImage.src}
                    alt={qrImage.alt}
                    fill
                    sizes="208px"
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <figcaption className="text-sm text-warm-600 mt-3 max-w-xs leading-relaxed">
                Scan with any UPI app to give directly.
                {upiId && ' The UPI ID below works if you would rather type it.'}
              </figcaption>
            </figure>
          )}

          <dl className="space-y-2 text-[0.95rem] text-warm-700">
            {upiId && (
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold">UPI ID:</dt>
                <dd className="font-mono">{upiId}</dd>
              </div>
            )}
            {bankTransfer && (
              <>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-semibold">Account name:</dt>
                  <dd>{bankTransfer.accountName}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-semibold">Account number:</dt>
                  <dd className="font-mono">{bankTransfer.accountNumber}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-semibold">IFSC:</dt>
                  <dd className="font-mono">{bankTransfer.ifsc}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-semibold">Bank:</dt>
                  <dd>{bankTransfer.bankName}</dd>
                </div>
              </>
            )}
          </dl>
        </div>
      ) : (
        /* No payment channel exists yet. Say that, rather than offering an
           action that cannot complete. */
        <p className="text-[0.95rem] leading-relaxed text-warm-700 bg-warm-50 border border-warm-200 rounded-lg px-4 py-3.5">
          We are still setting up {siteConfig.name}&rsquo;s giving channels, so
          there is nothing to transfer to yet. This section will carry the
          account and UPI details as soon as they are confirmed — no form, no
          intermediary.
        </p>
      )}

      {registrations.length > 0 && (
        <div>
          <h3 className="font-heading text-lg text-warm-900 mb-4">
            Registrations
          </h3>
          <dl className="space-y-2 text-[0.95rem] text-warm-700">
            {registrations.map(registration => (
              <div key={registration.label} className="flex flex-wrap gap-x-2">
                <dt className="font-semibold">{registration.label}:</dt>
                <dd className="font-mono">{registration.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
