/**
 * Fixed-window rate limiter for the lead endpoint - Volume 2 s.31 ("rate
 * limiting by IP").
 *
 * Deliberately best-effort. On serverless hosting the state lives in one
 * instance's memory, so the effective limit across a fleet is a multiple of
 * this number and resets on cold start. That is acceptable here: this exists to
 * blunt a crude flood, while the honeypot and Turnstile do the actual spam
 * work. If a determined attack ever warrants a hard limit, it needs shared
 * state (hosting KV or Redis) - noted in docs/decisions.md rather than
 * pretended away.
 *
 * The default is 10 per minute rather than a tighter number because a shared
 * office or clinic NAT can legitimately produce several enquiries in a minute,
 * and turning away a real lead is a worse failure than accepting a few extra
 * requests from a bot that the honeypot will drop anyway.
 */

export const RATE_LIMIT_WINDOW_MS = 60_000;

export const DEFAULT_RATE_LIMIT_MAX = 10;

/** Env override so the E2E suite can submit the form repeatedly. */
export function configuredMax(): number {
  const raw = process.env.LEAD_RATE_LIMIT_MAX;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_RATE_LIMIT_MAX;
}

export interface RateLimitState {
  count: number;
  resetAt: number;
}

/**
 * Pure so it can be unit tested without a server or a clock. Returns the new
 * state alongside the decision; the caller owns the store.
 */
export function evaluate(
  previous: RateLimitState | undefined,
  now: number,
  max: number,
  windowMs: number = RATE_LIMIT_WINDOW_MS,
): { limited: boolean; state: RateLimitState } {
  if (!previous || now > previous.resetAt) {
    return { limited: false, state: { count: 1, resetAt: now + windowMs } };
  }
  const state = { count: previous.count + 1, resetAt: previous.resetAt };
  return { limited: state.count > max, state };
}

const store = new Map<string, RateLimitState>();

/** Keeps the map from growing without bound on a long-lived instance. */
function prune(now: number): void {
  if (store.size < 1000) return;
  for (const [key, value] of store) {
    if (now > value.resetAt) store.delete(key);
  }
}

export function rateLimited(ip: string, now: number = Date.now()): boolean {
  prune(now);
  const { limited, state } = evaluate(store.get(ip), now, configuredMax());
  store.set(ip, state);
  return limited;
}

/** Test helper. */
export function resetRateLimiter(): void {
  store.clear();
}
