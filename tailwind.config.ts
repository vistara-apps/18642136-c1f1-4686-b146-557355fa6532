import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        fg: 'var(--color-fg)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'slot-available': 'var(--color-slot-available)',
        'slot-booked': 'var(--color-slot-booked)',
        'slot-prime': 'var(--color-slot-prime)',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(220, 20%, 20%, 0.08)',
        'card-hover': '0 8px 24px hsla(220, 20%, 20%, 0.12)',
        glass: '0 8px 32px hsla(220, 20%, 20%, 0.12)',
        button: '0 2px 8px hsla(220, 90%, 56%, 0.24)',
      },
    },
  },
  plugins: [],
};

export default config;
