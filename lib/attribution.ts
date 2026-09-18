/**
 * Attribution capture - Volume 2 s.31.
 *
 * First touch is stored in a first-party cookie for 365 days; last touch lives
 * in sessionStorage. Both sets are attached on submit, so a lead that arrived
 * from a Google Ads click in March and converted from organic in May is not
 * reported as an organic lead.
 */

const FIRST_TOUCH_COOKIE = 'bc_first_touch';
const LAST_TOUCH_KEY = 'bc_last_touch';
const COOKIE_DAYS = 365;

export interface TouchData {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  landing_page: string;
  referrer: string;
  timestamp: string;
}

const UTM_KEYS = ['source', 'medium', 'campaign', 'content', 'term'] as const;
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'] as const;

function readTouchFromLocation(): TouchData {
  const params = new URLSearchParams(window.location.search);
  const touch: Partial<TouchData> = {
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || '',
    timestamp: new Date().toISOString(),
  };
  for (const key of UTM_KEYS) touch[key] = params.get(`utm_${key}`);
  for (const id of CLICK_IDS) touch[id] = params.get(id);
  return touch as TouchData;
}

/** A touch is only meaningful if it carries a campaign parameter or a referrer. */
function hasSignal(touch: TouchData): boolean {
  return Boolean(
    touch.source ||
      touch.medium ||
      touch.campaign ||
      CLICK_IDS.some((id) => touch[id]) ||
      touch.referrer,
  );
}

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // Lax keeps the cookie on the top-level navigation that brought the visitor here.
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Called once from the root layout on first paint. Writes first touch if this
 * is the visitor's first meaningful arrival, and always refreshes last touch.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  const touch = readTouchFromLocation();

  if (!getCookie(FIRST_TOUCH_COOKIE) && hasSignal(touch)) {
    setCookie(FIRST_TOUCH_COOKIE, JSON.stringify(touch), COOKIE_DAYS);
  }

  if (hasSignal(touch) || !sessionStorage.getItem(LAST_TOUCH_KEY)) {
    try {
      sessionStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(touch));
    } catch {
      // Private browsing can refuse sessionStorage. The lead still submits;
      // it simply arrives with last-touch data missing rather than failing.
    }
  }
}

export function getFirstTouch(): TouchData | null {
  if (typeof window === 'undefined') return null;
  return safeParse<TouchData>(getCookie(FIRST_TOUCH_COOKIE));
}

export function getLastTouch(): TouchData | null {
  if (typeof window === 'undefined') return null;
  try {
    return safeParse<TouchData>(sessionStorage.getItem(LAST_TOUCH_KEY));
  } catch {
    return null;
  }
}

/**
 * GA4 client id, read from the _ga cookie so a lead can be joined to its GA4
 * session without waiting for the tag to expose it.
 */
export function getGaClientId(): string | null {
  if (typeof window === 'undefined') return null;
  const ga = getCookie('_ga');
  if (!ga) return null;
  const parts = ga.split('.');
  return parts.length >= 4 ? `GA1.1.${parts[2]}.${parts[3]}` : null;
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/** The attribution block posted with every lead (Volume 2 s.31 payload). */
export function collectAttribution() {
  return {
    first_touch: getFirstTouch(),
    last_touch: getLastTouch(),
    ga_client_id: getGaClientId(),
    device: getDeviceType(),
    page_url: typeof window === 'undefined' ? '' : window.location.href,
  };
}
