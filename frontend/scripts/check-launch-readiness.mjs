/**
 * Launch-readiness guard. Runs before `next build`.
 *
 * The site deliberately ships placeholder contact details so layout can be
 * reviewed (see `contactDetailsConfirmed` in lib/site.ts). That is fine in
 * development and fine in a preview deploy. It is not fine in production: a
 * visitor who decides to give lands on "+91 00000 00000" and concludes the
 * organisation is not real.
 *
 * So: a production build fails while the placeholders are still in place.
 * Set ALLOW_PLACEHOLDER_CONTACT=1 to build a preview anyway — it prints a
 * loud warning so nobody mistakes a preview for a launch.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sitePath = join(here, '..', 'lib', 'site.ts');

const source = readFileSync(sitePath, 'utf8');

/** Reads `export const <name> = true|false;` out of lib/site.ts. */
function readBooleanExport(name) {
  const match = source.match(
    new RegExp(`export const ${name}\\s*=\\s*(true|false)\\s*;`),
  );
  if (!match) {
    throw new Error(
      `check-launch-readiness: could not find "export const ${name}" in lib/site.ts. ` +
        'If the flag was renamed, update this guard rather than deleting it.',
    );
  }
  return match[1] === 'true';
}

const contactConfirmed = readBooleanExport('contactDetailsConfirmed');

const blockers = [];

if (!contactConfirmed) {
  blockers.push(
    'contactDetailsConfirmed is false — the phone number and email in ' +
      'lib/site.ts are placeholders, so every "Get in touch" and giving ' +
      'enquiry dead-ends. Replace siteConfig.contact with the real details, ' +
      'then set the flag to true.',
  );
}

/**
 * Placeholder text that must not survive the flag being flipped. The flag and
 * the data are separate edits, so this catches the half-done state where the
 * site claims its details are confirmed while still shipping "example.org".
 */
const PLACEHOLDER_PATTERNS = [
  /example\.org/i,
  /Example (?:Road|Street|Nagar|Colony)/i,
  /\+?91[\s-]?0{5}[\s-]?0{5}/,
  /\b0{5}\s?0{5}\b/,
];

/**
 * Comments are stripped before the placeholder scan. The doc comments in
 * site.ts legitimately quote the placeholders they replaced, and matching a
 * comment that explains the fix would block the build for describing itself.
 */
const code = source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

if (contactConfirmed) {
  const found = PLACEHOLDER_PATTERNS.filter(p => p.test(code)).map(p =>
    String(p),
  );
  if (found.length > 0) {
    blockers.push(
      'contactDetailsConfirmed is true, but lib/site.ts still contains ' +
        `placeholder text matching ${found.join(', ')}. Confirmed means every ` +
        'detail is real — remove the placeholders (or set the field to null ' +
        'where there is genuinely nothing to publish) rather than shipping ' +
        'them as if they were confirmed.',
    );
  }
}

if (blockers.length === 0) {
  process.exit(0);
}

const override = process.env.ALLOW_PLACEHOLDER_CONTACT === '1';
const label = override ? 'WARNING' : 'BUILD BLOCKED';

console.error(`\n  ${label}: this build is not launch-ready.\n`);
for (const blocker of blockers) {
  console.error(`  • ${blocker}\n`);
}

if (override) {
  console.error(
    '  ALLOW_PLACEHOLDER_CONTACT=1 is set, so the build continues.\n' +
      '  This output is a preview. Do not point a public domain at it.\n',
  );
  process.exit(0);
}

console.error(
  '  To build a preview anyway: ALLOW_PLACEHOLDER_CONTACT=1 npm run build\n',
);
process.exit(1);
