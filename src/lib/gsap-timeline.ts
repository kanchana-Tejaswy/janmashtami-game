'use client';

import { gsap } from 'gsap';

/**
 * Helper to safely run GSAP timelines with automatic cleanup.
 * Uses gsap.context() so that all tweens/timelines created inside
 * the scope are automatically reverted when cleanup() is called.
 */
export function createGsapScope(scopeRef: React.RefObject<HTMLElement | null>, animationFn: (ctx: gsap.Context) => void): () => void {
  if (typeof window === 'undefined' || !scopeRef.current) {
    return () => {};
  }

  const ctx = gsap.context(animationFn, scopeRef);

  return () => {
    ctx.revert(); // Cleans up all timelines and inline styles
  };
}

/**
 * Creates a reusable cinematic timeline with defaults matching the Vrindavan aesthetic.
 */
export function createCinematicTimeline(vars: gsap.TimelineVars = {}): gsap.core.Timeline {
  return gsap.timeline({
    defaults: {
      ease: 'power2.out',
      duration: 0.8,
    },
    ...vars,
  });
}
