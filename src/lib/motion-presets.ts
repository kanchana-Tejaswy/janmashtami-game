/**
 * JOURNEY TO THE SOUL — MOTION SYSTEM
 *
 * Framer Motion presets that emphasize:
 * - Emotional pacing: Slow, intentional entrance
 * - Tactile feedback: Slight scale on active, subtle lift on hover
 * - Zero dizzying animations
 * - Full reduced-motion safety
 */

import { Variants } from 'framer-motion';

export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;
export const EASE_GENTLE = [0.16, 1, 0.3, 1] as const;

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_SOFT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SOFT },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const cardInteractiveVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.25, ease: EASE_GENTLE },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

export const buttonTactileVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: EASE_GENTLE },
  },
  tap: {
    scale: 0.96,
    transition: { duration: 0.1, ease: 'easeOut' },
  },
};
