'use client';

import React from 'react';
import { Lock } from '@/components/ui/icons';
import { ToastMessage } from '@/hooks/use-quest-state';

interface ToastProps {
  toast: ToastMessage | null;
}

export function QuestToast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <aside
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] sm:w-auto px-5 py-3.5 rounded-2xl bg-peacock-900/95 border border-gold-500/40 shadow-divine-md backdrop-blur-md flex items-center gap-3.5 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none select-none"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex-shrink-0 p-2 rounded-full bg-peacock-800 border border-gold-400/30 text-gold-300">
        <Lock className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs sm:text-sm font-semibold text-ivory tracking-wide">
          {toast.title}
        </p>
        {toast.subtitle && (
          <p className="text-[11px] sm:text-xs text-gold-300/80 font-sans mt-0.5">
            {toast.subtitle}
          </p>
        )}
      </div>
    </aside>
  );
}
