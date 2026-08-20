import Image from 'next/image';

import { siteConfig } from '@/lib/site';

type Tone = 'light' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const mark = {
  sm: { className: 'h-9 w-auto', width: 120, height: 91 },
  md: { className: 'h-12 w-auto', width: 160, height: 122 },
  lg: { className: 'h-20 md:h-24 w-auto', width: 320, height: 243 },
};

const wordmark: Record<Size, string> = {
  sm: 'text-xl md:text-2xl',
  md: 'text-2xl md:text-3xl',
  lg: 'text-3xl md:text-4xl',
};

const qualifier: Record<Size, string> = {
  sm: 'text-[0.55rem] sm:text-[0.65rem]',
  md: 'text-[0.7rem] sm:text-xs',
  lg: 'text-xs sm:text-sm',
};

/**
 * The organisation's identity lockup: mark + wordmark + the qualifier that
 * completes the registered name. Kept in one place so every surface presents
 * the brand identically — the full name should never appear as bare "Utthan"
 * in a masthead.
 *
 * `tone` refers to the background it sits on: 'dark' for the hero and footer,
 * 'light' for white or cream.
 */
export default function BrandLockup({
  size = 'md',
  tone = 'light',
  priority = false,
  className = '',
}: {
  size?: Size;
  tone?: Tone;
  priority?: boolean;
  className?: string;
}) {
  const m = mark[size];

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image
        src={siteConfig.logo.src}
        alt=""
        width={m.width}
        height={m.height}
        className={m.className}
        priority={priority}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading ${wordmark[size]} tracking-tight ${
            tone === 'dark' ? 'text-white' : 'text-primary-800'
          }`}
        >
          {siteConfig.name}
        </span>
        <span
          className={`${qualifier[size]} font-medium uppercase tracking-[0.14em] mt-1.5 ${
            tone === 'dark' ? 'text-primary-200/80' : 'text-warm-500'
          }`}
        >
          {siteConfig.subtitle}
        </span>
      </span>
    </span>
  );
}
