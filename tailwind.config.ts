import type { Config } from 'tailwindcss';

/**
 * Design tokens - Volume 2 s.29, implementing Volume 1 s.02.
 * Define colours, type scale, spacing and motion here once; components read
 * from these names only. Never hard-code a hex value in a component.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    // Volume 2 s.29: breakpoints 640 / 768 / 1024 / 1280, mobile first.
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // The approved logo establishes a forest, sage and cream palette.
      // Legacy token names keep existing components on the same system.
      black: '#1E3220',
      forest: '#2D472E',
      sage: '#7D9274',
      cream: '#FAF8F0',
      gold: '#A9BC9C',
      ink: '#223025',
      mist: '#DFE6D8',
      white: '#FFFFFF',
    },
    // Volume 2 s.29 spacing scale. Tailwind's default scale is replaced so an
    // off-scale value cannot be written by accident.
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      6: '24px',
      8: '32px',
      12: '48px',
      16: '64px',
      24: '96px',
      32: '128px',
      px: '1px',
      full: '100%',
    },
    borderRadius: {
      none: '0',
      DEFAULT: '6px',
      card: '6px',
      full: '9999px',
    },
    fontFamily: {
      // Two self-hosted WOFF2 files max (Volume 2 s.28). Until the owner
      // approves a family, both roles fall back to the system stack.
      display: ['var(--font-display)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      body: ['var(--font-body)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }] - Volume 2 s.29.
        display: ['40px', { lineHeight: '1.05', fontWeight: '700' }],
        'display-lg': ['64px', { lineHeight: '1.02', fontWeight: '700' }],
        h1: ['32px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1-lg': ['44px', { lineHeight: '1.08', fontWeight: '700' }],
        h2: ['26px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-lg': ['32px', { lineHeight: '1.15', fontWeight: '700' }],
        h3: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3-lg': ['22px', { lineHeight: '1.25', fontWeight: '600' }],
        body: ['17px', { lineHeight: '1.6' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        small: ['14px', { lineHeight: '1.5' }],
        'small-lg': ['15px', { lineHeight: '1.5' }],
        eyebrow: ['12px', { lineHeight: '1.2', letterSpacing: '0.12em', fontWeight: '700' }],
        'eyebrow-lg': ['13px', { lineHeight: '1.2', letterSpacing: '0.12em', fontWeight: '700' }],
        button: ['16px', { lineHeight: '1', fontWeight: '600' }],
      },
      maxWidth: {
        container: '1200px',
        measure: '68ch',
      },
      boxShadow: {
        // One subtle elevation for cards on cream; none on black.
        card: '0 1px 2px rgba(11, 13, 12, 0.06), 0 8px 24px rgba(11, 13, 12, 0.06)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.2, 0, 0.2, 1)',
      },
      keyframes: {
        reveal: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        reveal: 'reveal 250ms cubic-bezier(0.2, 0, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
