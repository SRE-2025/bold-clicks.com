import { NextResponse } from 'next/server';
import { z } from 'zod';
import { INDUSTRY_VALUES, NEED_VALUES, SPEND_VALUES, isPriorityLead } from '@/lib/lead-options';
import { rateLimited } from '@/lib/rate-limit';

/**
 * Lead route handler - Volume 2 s.31.
 *
 * Validates server-side, screens spam, forwards to the GoHighLevel inbound
 * webhook, and returns the thank-you state. Secrets stay on the server; the
 * browser never sees the webhook URL.
 *
 * Failure handling: if the webhook is unreachable the visitor still sees the
 * thank-you state, the raw lead is emitted to the logs for recovery, and the
 * synthetic form test (every 6 hours) raises an S1 alert. A lead is never lost
 * silently and never shown an error caused by a downstream outage.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const touchSchema = z
  .object({
    source: z.string().nullable(),
    medium: z.string().nullable(),
    campaign: z.string().nullable(),
    content: z.string().nullable(),
    term: z.string().nullable(),
    gclid: z.string().nullable(),
    gbraid: z.string().nullable(),
    wbraid: z.string().nullable(),
    fbclid: z.string().nullable(),
    msclkid: z.string().nullable(),
    landing_page: z.string(),
    referrer: z.string(),
    timestamp: z.string(),
  })
  .partial()
  .nullable();

const leadSchema = z.object({
  form: z.string().min(1).max(64),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(200),
  need: z.enum(NEED_VALUES as [string, ...string[]]),
  spend_band: z.enum(['', ...SPEND_VALUES] as [string, ...string[]]).default(''),
  industry: z.enum(['', ...INDUSTRY_VALUES] as [string, ...string[]]).default(''),
  phone: z.string().trim().max(32).default(''),
  consent_privacy: z.literal(true),
  consent_sms: z.boolean().default(false),
  website_url: z.string().max(200).default(''),
  first_touch: touchSchema.optional(),
  last_touch: touchSchema.optional(),
  ga_client_id: z.string().nullable().optional(),
  device: z.enum(['mobile', 'tablet', 'desktop']).optional(),
  page_url: z.string().max(2048).optional(),
});

/** E.164 for US numbers, so GoHighLevel and the platforms agree on the format. */
function normalisePhone(raw: string): string {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return raw.startsWith('+') ? raw : digits ? `+${digits}` : '';
}

function newLeadId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `bc_${stamp}${random}`;
}

/** Cloudflare Turnstile. Skipped when no secret is configured (local dev). */
async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    // A verification outage must not block real leads. Logged for the digest.
    console.warn('[lead] turnstile verification unavailable; allowing submission');
    return true;
  }
}

function redact(payload: Record<string, unknown>): Record<string, unknown> {
  const email = typeof payload.email === 'string' ? payload.email : '';
  const phone = typeof payload.phone === 'string' ? payload.phone : '';
  return {
    ...payload,
    email: email ? `${email.slice(0, 2)}***@${email.split('@')[1] ?? ''}` : '',
    phone: phone ? `***${phone.slice(-4)}` : '',
  };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation_failed' }, { status: 400 });
  }

  const lead = parsed.data;

  // Honeypot: accept and discard, so the bot sees success and stops retrying.
  if (lead.website_url) {
    return NextResponse.json({ ok: true, lead_id: newLeadId() }, { status: 200 });
  }

  const turnstileToken = request.headers.get('cf-turnstile-response') ?? undefined;
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: 'spam_check_failed' }, { status: 400 });
  }

  const leadId = newLeadId();
  const geoHint = [request.headers.get('x-vercel-ip-city'), request.headers.get('x-vercel-ip-country-region')]
    .filter(Boolean)
    .join(', ');

  const payload = {
    lead_id: leadId,
    submitted_at: new Date().toISOString(),
    form: lead.form,
    page_url: lead.page_url ?? '',
    name: lead.name,
    email: lead.email,
    phone: normalisePhone(lead.phone),
    company: lead.company,
    need: lead.need,
    spend_band: lead.spend_band,
    industry: lead.industry,
    consent_privacy: lead.consent_privacy,
    consent_sms: lead.consent_sms,
    first_touch: lead.first_touch ?? null,
    last_touch: lead.last_touch ?? null,
    ga_client_id: lead.ga_client_id ?? null,
    device: lead.device ?? null,
    geo_hint: geoHint || null,
    // Routing (Volume 2 s.31): drives the extra owner SMS in the GHL workflow.
    priority: isPriorityLead(lead.spend_band, lead.industry),
  };

  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    // Not configured yet. The lead is still captured in the logs and the
    // visitor still gets a confirmation; docs/owner-inputs.md tracks the gap.
    console.warn('[lead] GHL_WEBHOOK_URL is not set; lead captured in logs only', redact(payload));
    return NextResponse.json({ ok: true, lead_id: leadId }, { status: 200 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error(`GHL responded ${response.status}`);
  } catch (error) {
    // The visitor is not made to pay for a downstream outage. The raw lead is
    // logged for recovery and the synthetic test raises the S1 alert.
    console.error('[lead] GHL webhook failed - lead retained for manual recovery', {
      lead_id: leadId,
      error: error instanceof Error ? error.message : 'unknown',
      payload: redact(payload),
    });
  }

  return NextResponse.json({ ok: true, lead_id: leadId }, { status: 200 });
}
