import proofData from '@/content/proof.json';
import { proofSchema, type Proof } from '@/lib/schema';
import { Container, GoldRule } from './primitives';

/**
 * ProofStrip - Volume 2 s.29.
 *
 * Renders proof items with permissionOnFile === true, and nothing else. When
 * there is no verified proof it falls back to process proof (Volume 1 s.04:
 * "If proof is not ready, use credible process proof rather than filler
 * numbers") - it never renders a placeholder and never renders empty.
 */

const verifiedProof: Proof[] = (proofData.items as unknown[])
  .map((item) => proofSchema.safeParse(item))
  .flatMap((r) => (r.success ? [r.data] : []))
  .filter((p) => p.permissionOnFile)
  .filter((p) => !p.expiresAt || new Date(p.expiresAt) > new Date());

/** Process proof. Every line is true on day one and needs no owner sign-off. */
const processProof = [
  'Ads only — no SEO, no web design, no social management',
  'You own the ad accounts and the data',
  'Tracking verified before the first dollar is spent',
  'One accountable operator, no account-manager layer',
];

export function ProofStrip() {
  if (verifiedProof.length > 0) {
    return (
      <section className="border-y border-sage/30 bg-cream py-8" aria-label="Verified proof">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {verifiedProof.map((item) => (
              <li key={item.id} className="text-center">
                {item.type === 'metric' && item.value ? (
                  <>
                    <span className="block font-display text-h3 text-black md:text-h3-lg">{item.value}</span>
                    <span className="block text-small text-ink/70">{item.label}</span>
                  </>
                ) : (
                  <span className="text-small-lg text-ink/80">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    );
  }

  return (
    <section className="border-y border-sage/30 bg-cream py-8" aria-label="How we work">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {processProof.map((line, index) => (
            <li key={line} className="flex items-center gap-8 text-small-lg text-ink/80">
              {index > 0 && <GoldRule className="hidden w-8 md:block" />}
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
