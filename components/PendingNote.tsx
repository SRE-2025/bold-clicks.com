/**
 * A visible, honest note for a section that cannot be completed without an
 * owner input and cannot simply be hidden.
 *
 * Most pending content renders as nothing (see FirstHand, ProofStrip,
 * PhoneLink) - silence is better than a bracket. The legal pages are the
 * exception: the privacy policy is linked from the form's consent checkbox and
 * has to exist, so an incomplete section must say so in plain language rather
 * than disappear and imply the question was settled.
 *
 * The pre-launch crawl fails on "[OWNER" in rendered text, so this is the only
 * sanctioned way to surface a gap to a visitor. Every use is listed in
 * docs/owner-inputs.md and gates launch.
 */
export function PendingNote({ children }: { children: string }) {
  return (
    <p className="border-l-2 border-gold bg-white px-4 py-3 text-small-lg italic text-ink/70">
      {children}
    </p>
  );
}
