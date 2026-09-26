'use client';

import { useCallback, useRef, useEffect } from 'react';
import { scrollToRevealedContent, ScrollToOptions } from '@/lib/scroll-utils';

/**
 * Reusable React Hook for Context-Aware Auto-Scroll.
 * Guides the user's focus to newly unlocked interactive content,
 * reflections, teachings, or continuation buttons across all stations.
 */
export function useRevealAutoScroll() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollIfOffscreen = useCallback(
    (element: HTMLElement | null, options: ScrollToOptions = {}) => {
      const delay = options.delay ?? 120;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        scrollToRevealedContent(element, options);
      }, delay);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { scrollIfOffscreen, scrollToRevealedContent };
}
