/**
 * Global Context-Aware Scroll Utilities
 *
 * Provides intelligent, accessible, and responsive scroll assistance
 * that guides the user's attention only when newly revealed content
 * is outside or partially obscured by the current viewport.
 */

export interface ScrollToOptions {
  topOffset?: number; // Offset for sticky Torana header / river nav (default 90px)
  bottomMargin?: number; // Comfortable margin from the bottom of the screen (default 40px)
  block?: ScrollLogicalPosition; // 'nearest' | 'center' | 'start' | 'end'
  delay?: number; // Delay in ms before checking and scrolling (default 120ms)
}

/**
 * Checks whether an element is already comfortably visible within the user's viewport.
 * Avoids any unnecessary jumping if the content is already readable.
 */
export function isElementComfortablyVisible(
  element: HTMLElement | null,
  options: { topOffset?: number; bottomMargin?: number } = {}
): boolean {
  if (!element || typeof window === 'undefined') return true;

  const topOffset = options.topOffset ?? 90;
  const bottomMargin = options.bottomMargin ?? 40;
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // For elements that are larger than the viewport, comfort means its top begins cleanly below the header
  if (rect.height > windowHeight - topOffset - bottomMargin) {
    return rect.top >= topOffset - 20 && rect.top <= topOffset + 140;
  }

  // Normal elements: both top and bottom must fit comfortably within the active viewport window
  const isTopVisible = rect.top >= topOffset;
  const isBottomVisible = rect.bottom <= windowHeight - bottomMargin;

  return isTopVisible && isBottomVisible;
}

/**
 * Scrolls to newly revealed content if and only if it is outside the comfortable viewport.
 * Respects OS prefers-reduced-motion settings and avoids fighting user interactions.
 */
export function scrollToRevealedContent(
  element: HTMLElement | null,
  options: ScrollToOptions = {}
): boolean {
  if (!element || typeof window === 'undefined') return false;

  const topOffset = options.topOffset ?? 90;
  const bottomMargin = options.bottomMargin ?? 40;

  // Only scroll if the content is not already comfortably visible
  if (isElementComfortablyVisible(element, { topOffset, bottomMargin })) {
    return false;
  }

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const defaultBlock: ScrollLogicalPosition = window.innerWidth < 768 ? 'nearest' : 'center';

  try {
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: options.block ?? defaultBlock,
      inline: 'nearest',
    });
    return true;
  } catch {
    // Fallback for older browsers
    const elementTop = element.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({
      top: elementTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    return true;
  }
}
