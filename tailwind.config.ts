import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        peacock: {
          950: '#061024',
          900: '#081a33',
          800: '#0d2847',
          700: '#123a63',
        },
        teal: {
          700: '#00695c',
          500: '#0d9488',
          400: '#14b8a6',
        },
        gold: {
          600: '#b45309',
          500: '#f59e0b',
          300: '#fbbf24',
          100: '#fef08a',
        },
        saffron: {
          500: '#ff7a4d',
        },
        ivory: {
          DEFAULT: '#f6f1e4',
          dim: 'rgba(246, 241, 228, 0.72)',
          muted: 'rgba(246, 241, 228, 0.5)',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        quote: ['Cormorant Garamond', 'serif'],
        body: ['Mukta', 'system-ui', 'sans-serif'],
        sanskrit: ['"Tiro Devanagari Sanskrit"', 'Mukta', 'serif'],
      },
      boxShadow: {
        'divine-sm': '0 0 15px rgba(245, 158, 11, 0.2)',
        'divine-md': '0 0 25px rgba(245, 158, 11, 0.35)',
        'divine-lg': '0 0 45px rgba(245, 158, 11, 0.45)',
        'teal-glow': '0 0 25px rgba(20, 184, 166, 0.3)',
        'glass-panel': '0 20px 40px -15px rgba(6, 16, 36, 0.7), 0 0 0 1px rgba(245, 158, 11, 0.15)',
        'glass-card': '0 10px 30px -5px rgba(6, 16, 36, 0.6), 0 0 0 1px rgba(20, 184, 166, 0.2)',
      },
      borderRadius: {
        'niche': '68px 68px 14px 14px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
