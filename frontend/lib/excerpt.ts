import type { PortableTextBlock } from '@portabletext/react';

import { toPlainText } from '@/lib/sanity/types';

/** Words to show before trailing off. */
const DEFAULT_WORDS = 26;

/**
 * First N words of a portable-text body, cut on a word boundary.
 *
 * Card summaries are truncated here rather than with CSS `line-clamp` because
 * the cards are links: clamping hides the overflow visually but leaves every
 * word in the accessibility tree and in the link's computed name. One project
 * description — a full service catalogue with opening hours, a phone number
 * and a Facebook URL — produced a link name several hundred words long.
 *
 * What is not shown is not sent.
 */
export function excerpt(
  body?: PortableTextBlock[] | string | null,
  words: number = DEFAULT_WORDS,
): string {
  const text = toPlainText(body).replace(/\s+/g, ' ').trim();
  if (!text) return '';

  const parts = text.split(' ');
  if (parts.length <= words) return text;

  return `${parts.slice(0, words).join(' ')}…`;
}
