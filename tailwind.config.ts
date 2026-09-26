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
        ivory: {
          DEFAULT: '#FBF7EF',
          warm: '#FBF7EF',
          soft: '#F6EFE5',
          pure: '#FFFDF9',
          card: '#FFFFFF',
          dim: '#756D66',
          muted: '#9C948B',
        },
        blush: {
          DEFAULT: '#E8B7BE',
          soft: '#F3D9DC',
          light: '#FAF2F4',
          dark: '#D495A0',
        },
        gold: {
          DEFAULT: '#D6B15E',
          50: '#FDFBF5',
          100: '#FAF3DC',
          200: '#F4E7BD',
          300: '#E8D18A',
          400: '#DEC274',
          500: '#D6B15E',
          600: '#B8923F',
          700: '#8E6F2B',
          800: '#644D1B',
          900: '#3D2E0F',
          muted: '#D6B15E',
          light: '#E8D18A',
          warm: '#C49B45',
        },
        lavender: {
          DEFAULT: '#DDD6EA',
          soft: '#EEEAF5',
          light: '#F7F5FA',
          dark: '#B8A9D1',
        },
        peacock: {
          DEFAULT: '#24566A',
          dark: '#183D4C',
          light: '#E6F0F4',
          muted: '#3B738A',
          950: '#0C1E26',
          900: '#142E3B',
          800: '#1E4557',
          700: '#24566A',
        },
        warm: {
          900: '#26221F',
          800: '#403A35',
          700: '#59524B',
          600: '#756D66',
          500: '#91877F',
          400: '#ADA49C',
          300: '#CAC3BB',
          200: '#E6E1DA',
          100: '#F5F1EB',
          50: '#FAF7F2',
        },
        teal: {
          DEFAULT: '#24566A',
          500: '#24566A',
          400: '#3B738A',
          300: '#5A94AC',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'Playfair Display', 'serif'],
        quote: ['Cormorant Garamond', 'serif'],
        body: ['Mukta', 'system-ui', 'sans-serif'],
        sanskrit: ['"Tiro Devanagari Sanskrit"', 'Mukta', 'serif'],
      },
      boxShadow: {
        'ujwala-sm': '0 2px 8px rgba(64, 58, 53, 0.04), 0 0 12px rgba(214, 177, 94, 0.12)',
        'ujwala-md': '0 8px 24px -4px rgba(64, 58, 53, 0.06), 0 0 20px rgba(214, 177, 94, 0.18)',
        'ujwala-lg': '0 16px 40px -8px rgba(64, 58, 53, 0.08), 0 0 35px rgba(214, 177, 94, 0.25)',
        'ujwala-halo': '0 0 60px 15px rgba(232, 209, 138, 0.35)',
        'ujwala-card': '0 4px 20px -2px rgba(64, 58, 53, 0.05), 0 0 0 1px rgba(214, 177, 94, 0.2)',
        'ujwala-card-hover': '0 12px 32px -4px rgba(64, 58, 53, 0.08), 0 0 0 1px rgba(214, 177, 94, 0.35), 0 0 24px rgba(232, 209, 138, 0.22)',
        'blush-card': '0 8px 24px -4px rgba(232, 183, 190, 0.2), 0 0 0 1px rgba(232, 183, 190, 0.35)',
        'divine-sm': '0 2px 8px rgba(64, 58, 53, 0.04), 0 0 12px rgba(214, 177, 94, 0.18)',
        'divine-md': '0 8px 24px -4px rgba(64, 58, 53, 0.06), 0 0 20px rgba(214, 177, 94, 0.25)',
        'divine-lg': '0 16px 40px -8px rgba(64, 58, 53, 0.08), 0 0 35px rgba(214, 177, 94, 0.35)',
        'glass-panel': '0 12px 36px -8px rgba(64, 58, 53, 0.06), 0 0 0 1px rgba(214, 177, 94, 0.2)',
        'glass-card': '0 4px 20px -2px rgba(64, 58, 53, 0.05), 0 0 0 1px rgba(214, 177, 94, 0.2)',
      },
      borderRadius: {
        'niche': '68px 68px 16px 16px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'float 6s ease-in-out infinite',
        'glow-breathe': 'glow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
