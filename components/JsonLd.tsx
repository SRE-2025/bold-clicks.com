/**
 * Renders a JSON-LD block. Volume 1 s.09: only mark up information that is
 * visible and true. `pnpm audit:schema` validates every emitted block in CI.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Content is built from typed content objects, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
