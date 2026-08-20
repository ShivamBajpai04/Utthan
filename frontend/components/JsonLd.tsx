/** Emits a structured-data block. Values come from our own config and CMS
 *  content, never from user input, so serialising directly is safe. */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
