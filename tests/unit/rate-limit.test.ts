import { describe, expect, it } from 'vitest';
import { RATE_LIMIT_WINDOW_MS, evaluate, type RateLimitState } from '@/lib/rate-limit';

/**
 * The limiter is tested here rather than end to end, because an E2E burst test
 * would consume the same budget the functional form tests need and make both
 * flaky. This is how the 429 that broke the parallel E2E run got found, so the
 * behaviour is now pinned.
 */

const MAX = 10;

function burst(count: number, now = 1_000_000): { limited: boolean; state: RateLimitState } {
  let state: RateLimitState | undefined;
  let limited = false;
  for (let i = 0; i < count; i += 1) {
    const result = evaluate(state, now, MAX);
    state = result.state;
    limited = result.limited;
  }
  return { limited, state: state as RateLimitState };
}

describe('lead rate limiter', () => {
  it('allows the first request from a new IP', () => {
    const { limited, state } = evaluate(undefined, 1000, MAX);
    expect(limited).toBe(false);
    expect(state.count).toBe(1);
  });

  it('allows exactly max requests inside the window', () => {
    expect(burst(MAX).limited).toBe(false);
  });

  it('limits the request after max', () => {
    expect(burst(MAX + 1).limited).toBe(true);
  });

  it('opens a fresh window once the old one expires', () => {
    const { state } = burst(MAX + 5);
    const after = evaluate(state, state.resetAt + 1, MAX);
    expect(after.limited).toBe(false);
    expect(after.state.count).toBe(1);
  });

  it('does not extend the window on each request', () => {
    // A sliding reset would let a steady drip stay limited forever.
    const first = evaluate(undefined, 1000, MAX);
    const second = evaluate(first.state, 30_000, MAX);
    expect(second.state.resetAt).toBe(first.state.resetAt);
    expect(first.state.resetAt).toBe(1000 + RATE_LIMIT_WINDOW_MS);
  });
});
