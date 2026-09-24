/**
 * JOURNEY TO THE SOUL — DESIGN TOKENS
 *
 * Source of truth for colors, typography, spacing, shadows, and radii.
 * Strictly preserves the Vrindavan sacred aesthetic:
 * Peacock Blue, Sacred Teal, Temple Gold, Sunset Saffron, and Warm Ivory.
 */

export const DESIGN_TOKENS = {
  colors: {
    peacock: {
      950: '#061024', // Deepest midnight forest
      900: '#081a33', // Deep navy
      850: '#0b213f',
      800: '#0d2847', // Yamuna deeps
      700: '#123a63',
    },
    teal: {
      800: '#004d40',
      700: '#00695c', // Sacred Yamuna teal
      500: '#0d9488',
      400: '#14b8a6', // Glowing water turquoise
      300: '#2dd4bf',
    },
    gold: {
      700: '#92400e',
      600: '#b45309', // Dark temple brass
      500: '#f59e0b', // Sacred altar gold
      400: '#fbbf24', // Diya flame amber
      300: '#fcd34d',
      100: '#fef08a', // Radiant divine light
    },
    saffron: {
      600: '#ea580c',
      500: '#ff7a4d', // Vrindavan sunset
      400: '#fb923c',
    },
    ivory: {
      DEFAULT: '#f6f1e4', // Warm parchment text
      dim: 'rgba(246, 241, 228, 0.72)',
      muted: 'rgba(246, 241, 228, 0.45)',
      faint: 'rgba(246, 241, 228, 0.15)',
    },
  },
  typography: {
    display: "'Cinzel', Georgia, serif",
    quote: "'Cormorant Garamond', Georgia, serif",
    body: "'Mukta', system-ui, -apple-system, sans-serif",
  },
  radii: {
    sm: '0.5rem',
    md: '0.875rem',
    lg: '1.25rem',
    xl: '1.75rem',
    full: '9999px',
    niche: '68px 68px 14px 14px', // Traditional arched temple niche
  },
  shadows: {
    glassPanel: '0 20px 40px -15px rgba(6, 16, 36, 0.75), 0 0 0 1px rgba(245, 158, 11, 0.18)',
    glassCard: '0 10px 30px -5px rgba(6, 16, 36, 0.65), 0 0 0 1px rgba(20, 184, 166, 0.22)',
    divineSm: '0 0 15px rgba(245, 158, 11, 0.25)',
    divineMd: '0 0 30px rgba(245, 158, 11, 0.4)',
    divineLg: '0 0 50px rgba(245, 158, 11, 0.55)',
    tealGlow: '0 0 25px rgba(20, 184, 166, 0.35)',
  },
  transitions: {
    soft: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    spring: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const;
