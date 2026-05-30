import type { PortableTextReactComponents } from '@portabletext/react';

export const projectPortableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-primary-700 underline underline-offset-2 decoration-primary-300 hover:decoration-primary-600 transition-colors"
      >
        {children}
      </a>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-warm-100 px-1.5 py-0.5 rounded text-sm font-mono text-warm-800">
        {children}
      </code>
    ),
  },
  block: {
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-3 border-primary-400 pl-5 italic text-warm-600 my-8">
        {children}
      </blockquote>
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
  },
};
