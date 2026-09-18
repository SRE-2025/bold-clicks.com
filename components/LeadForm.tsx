'use client';

import { useRouter } from 'next/navigation';
import { useId, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { collectAttribution } from '@/lib/attribution';
import { NEED_OPTIONS, SPEND_BANDS, INDUSTRY_OPTIONS } from '@/lib/lead-options';

/**
 * LeadForm - Volume 2 s.31.
 *
 * Labels are always visible, autocomplete attributes are set, errors are linked
 * with aria-describedby and summarised at the top, and the honeypot is the only
 * hidden field a human ever meets. Attribution is attached on submit from
 * lib/attribution.ts and re-validated server-side.
 */

interface FieldErrors {
  [key: string]: string | undefined;
}

const labelClass = 'block text-small-lg font-semibold text-ink';
const controlClass =
  'mt-2 block w-full rounded border border-sage bg-white px-4 py-3 text-body text-ink min-h-[48px] focus:border-forest';
const errorClass = 'mt-2 block text-small text-[#9B1C1C]';

export function LeadForm({ formId = 'free-ad-audit' }: { formId?: string }) {
  const router = useRouter();
  const uid = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  /** form_start fires once, on first interaction - not on render. */
  const handleFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track.formStart(formId);
  };

  function validate(data: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const need = String(data.get('need') ?? '');
    const consent = data.get('consent_privacy');

    if (name.length < 2 || name.length > 80) next.name = 'Enter your full name (2-80 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = 'Enter a valid business email address.';
    if (company.length < 2) next.company = 'Enter your company name or website.';
    if (!need) next.need = 'Choose what you need help with.';
    if (!consent) next.consent_privacy = 'Please accept the privacy policy to continue.';

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      summaryRef.current?.focus();
      return;
    }

    setSubmitting(true);

    const payload = {
      form: formId,
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      need: String(data.get('need') ?? ''),
      spend_band: String(data.get('spend_band') ?? ''),
      industry: String(data.get('industry') ?? ''),
      phone: String(data.get('phone') ?? '').trim(),
      consent_privacy: data.get('consent_privacy') === 'on',
      consent_sms: data.get('consent_sms') === 'on',
      // Honeypot. A real visitor never fills this; a bot usually does.
      website_url: String(data.get('website_url') ?? ''),
      ...collectAttribution(),
    };

    try {
      // Trailing slash matters: next.config sets `trailingSlash: true`, so
      // posting to '/api/lead' returns a 308 and the redirected re-POST does
      // not survive. Always call the canonical path.
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok: boolean; lead_id?: string; error?: string };

      if (!response.ok || !result.ok || !result.lead_id) {
        throw new Error(result.error ?? 'submission_failed');
      }

      // generate_lead fires exactly once, after the server accepted the lead.
      track.generateLead({
        form_id: formId,
        lead_id: result.lead_id,
        need: payload.need,
        spend_band: payload.spend_band || 'not_stated',
      });

      router.push(`/thank-you/?lead=${encodeURIComponent(result.lead_id)}`);
    } catch {
      setSubmitting(false);
      setSubmitError(
        'Something went wrong sending your request. Please try again, or email us directly and we’ll pick it up.',
      );
      summaryRef.current?.focus();
    }
  }

  const errorList = Object.entries(errors).filter(([, message]) => Boolean(message));

  return (
    <form onSubmit={onSubmit} onFocusCapture={handleFirstInteraction} noValidate className="space-y-6">
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={errorList.length > 0 || submitError ? 'alert' : undefined}
        className={errorList.length > 0 || submitError ? 'rounded border border-[#9B1C1C] bg-white p-4' : 'sr-only'}
      >
        {submitError && <p className="text-small-lg text-[#9B1C1C]">{submitError}</p>}
        {errorList.length > 0 && (
          <>
            <p className="text-small-lg font-semibold text-[#9B1C1C]">
              Please fix {errorList.length === 1 ? 'this' : 'these'} before sending:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-small text-[#9B1C1C]">
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#${fieldId(field)}`}>{message}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div>
        <label htmlFor={fieldId('name')} className={labelClass}>
          Full name
        </label>
        <input
          id={fieldId('name')}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? errorId('name') : undefined}
          className={controlClass}
        />
        {errors.name && (
          <span id={errorId('name')} className={errorClass}>
            {errors.name}
          </span>
        )}
      </div>

      <div>
        <label htmlFor={fieldId('email')} className={labelClass}>
          Business email
        </label>
        <input
          id={fieldId('email')}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? errorId('email') : undefined}
          className={controlClass}
        />
        {errors.email && (
          <span id={errorId('email')} className={errorClass}>
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor={fieldId('company')} className={labelClass}>
          Company or website
        </label>
        <input
          id={fieldId('company')}
          name="company"
          type="text"
          autoComplete="organization"
          required
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? errorId('company') : undefined}
          className={controlClass}
        />
        {errors.company && (
          <span id={errorId('company')} className={errorClass}>
            {errors.company}
          </span>
        )}
      </div>

      <div>
        <label htmlFor={fieldId('need')} className={labelClass}>
          What do you need help with?
        </label>
        <select
          id={fieldId('need')}
          name="need"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.need)}
          aria-describedby={errors.need ? errorId('need') : undefined}
          className={controlClass}
        >
          <option value="" disabled>
            Choose one
          </option>
          {NEED_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.need && (
          <span id={errorId('need')} className={errorClass}>
            {errors.need}
          </span>
        )}
      </div>

      <div>
        <label htmlFor={fieldId('spend_band')} className={labelClass}>
          Monthly ad spend (approx.)
          <span className="ml-2 font-normal text-ink/70">Optional, but it helps us prepare</span>
        </label>
        <select
          id={fieldId('spend_band')}
          name="spend_band"
          defaultValue=""
          className={controlClass}
          onChange={(e) => track.qualifierInteraction('spend_band', e.target.value || 'not_stated')}
        >
          <option value="">Prefer not to say</option>
          {SPEND_BANDS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={fieldId('industry')} className={labelClass}>
          Industry <span className="ml-2 font-normal text-ink/70">Optional</span>
        </label>
        <select id={fieldId('industry')} name="industry" defaultValue="" className={controlClass}>
          <option value="">Prefer not to say</option>
          {INDUSTRY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={fieldId('phone')} className={labelClass}>
          Phone <span className="ml-2 font-normal text-ink/70">Optional</span>
        </label>
        <input
          id={fieldId('phone')}
          name="phone"
          type="tel"
          autoComplete="tel"
          className={controlClass}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Consent</legend>

        <div className="flex items-start gap-3">
          <input
            id={fieldId('consent_privacy')}
            name="consent_privacy"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent_privacy)}
            aria-describedby={errors.consent_privacy ? errorId('consent_privacy') : undefined}
            className="mt-1 h-6 w-6 shrink-0 rounded border-sage"
          />
          <label htmlFor={fieldId('consent_privacy')} className="text-small-lg text-ink">
            I agree to the{' '}
            <a href="/privacy/" className="text-forest underline underline-offset-4">
              privacy policy
            </a>
            .
          </label>
        </div>
        {errors.consent_privacy && (
          <span id={errorId('consent_privacy')} className={errorClass}>
            {errors.consent_privacy}
          </span>
        )}

        {/* SMS consent is separate and unchecked by default (Volume 2 s.31). */}
        <div className="flex items-start gap-3">
          <input
            id={fieldId('consent_sms')}
            name="consent_sms"
            type="checkbox"
            className="mt-1 h-6 w-6 shrink-0 rounded border-sage"
          />
          <label htmlFor={fieldId('consent_sms')} className="text-small-lg text-ink">
            You can text me about my audit. Message and data rates may apply.
          </label>
        </div>
      </fieldset>

      {/* Honeypot. Hidden from sight and from assistive technology. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId('website_url')}>Leave this field empty</label>
        <input id={fieldId('website_url')} name="website_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded bg-forest px-6 py-4 text-button text-cream transition hover:bg-black disabled:opacity-60"
      >
        {submitting ? 'Sending…' : 'Get My Free Ad Audit'}
      </button>

      <p className="text-small text-ink/70">
        Read-only access only. We never make changes to your accounts during an audit.
      </p>
    </form>
  );
}
