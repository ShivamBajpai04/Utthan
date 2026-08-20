import { PortableText, type PortableTextReactComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';

/**
 * Long-form content renderer shared by blog posts and project descriptions.
 *
 * Every element is styled explicitly here — the site does not depend on
 * `@tailwindcss/typography`, so `prose` class names would be inert.
 */
const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { url?: string }; alt?: string; caption?: string };
    }) => {
      const url = value?.asset?.url;
      if (!url) return null;
      return (
        <figure className="my-10">
          <Image
            src={url}
            alt={value.alt ?? ''}
            width={960}
            height={540}
            sizes="(max-width: 768px) 100vw, 720px"
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-warm-400 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
      const external = value?.href?.startsWith('http');
      return (
        <a
          href={value?.href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="text-primary-700 underline underline-offset-2 decoration-primary-300 hover:decoration-primary-600 transition-colors"
        >
          {children}
        </a>
      );
    },
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-warm-100 px-1.5 py-0.5 rounded text-sm font-mono text-warm-800">
        {children}
      </code>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-warm-900">{children}</strong>
    ),
    underline: ({ children }: { children: React.ReactNode }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    'strike-through': ({ children }: { children: React.ReactNode }) => (
      <s>{children}</s>
    ),
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-warm-600 leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-3 border-primary-400 pl-5 italic text-warm-600 my-8">
        {children}
      </blockquote>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-heading text-3xl md:text-4xl text-warm-900 mt-12 mb-4">
        {children}
      </h2>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-heading text-3xl text-warm-900 mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-heading text-2xl text-warm-900 mt-10 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="font-heading text-xl text-warm-900 mt-8 mb-2">{children}</h4>
    ),
    h5: ({ children }: { children?: React.ReactNode }) => (
      <h5 className="font-heading text-lg text-warm-900 mt-6 mb-2">{children}</h5>
    ),
    h6: ({ children }: { children?: React.ReactNode }) => (
      <h6 className="font-semibold text-base text-warm-900 mt-6 mb-2">{children}</h6>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-warm-600 marker:text-primary-400">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-warm-600 marker:text-warm-400">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

export default function PortableTextBody({
  value,
  className = '',
}: {
  value: PortableTextBlock[];
  className?: string;
}) {
  return (
    <div className={`text-lg ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
