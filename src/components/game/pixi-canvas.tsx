'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Application } from 'pixi.js';

interface PixiCanvasProps {
  className?: string;
  onReady?: (app: Application) => void;
  ariaLabel?: string;
}

/**
 * Reusable PixiJS Game Canvas Architecture
 *
 * Implements:
 * - Asynchronous PixiJS v8 Application initialization
 * - Safe React 19 lifecycle & memory leak prevention
 * - Full WebGL destruction on unmount: app.destroy(true, { children: true, texture: true, context: true })
 * - Responsive ResizeObserver integration
 * - Zero pointer blocking on overlay UI
 */
export function PixiCanvas({
  className = 'w-full h-full min-h-[300px]',
  onReady,
  ariaLabel = 'Interactive 2D Game Canvas',
}: PixiCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    let resizeObserver: ResizeObserver | null = null;

    async function initPixi() {
      try {
        const { Application, Graphics } = await import('pixi.js');
        if (!isMounted) return;

        const app = new Application();
        await app.init({
          resizeTo: container || undefined,
          backgroundAlpha: 0,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: true,
          antialias: true,
        });

        if (!isMounted) {
          app.destroy(true, { children: true, texture: true, context: true });
          return;
        }

        appRef.current = app;
        container?.appendChild(app.canvas);

        // Gentle ambient visual placeholder for the canvas foundation stage
        const placeholder = new Graphics();
        placeholder.circle(100, 100, 30);
        placeholder.fill({ color: 0x14b8a6, alpha: 0.15 });
        app.stage.addChild(placeholder);

        // Safe ResizeObserver
        if (container) {
          resizeObserver = new ResizeObserver(() => {
            if (app && app.renderer) {
              app.resize();
            }
          });
          resizeObserver.observe(container);
        }

        setIsInitialized(true);
        if (onReady) onReady(app);
      } catch (err) {
        console.warn('PixiJS initialization notice:', err);
      }
    }

    initPixi();

    return () => {
      isMounted = false;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (appRef.current) {
        try {
          appRef.current.destroy(true, { children: true, texture: true, context: true });
        } catch {
          // Graceful fallback
        }
        appRef.current = null;
      }
    };
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <span className="text-[10px] text-teal-300 font-sans tracking-widest uppercase">
            Preparing Canvas…
          </span>
        </div>
      )}
    </div>
  );
}
