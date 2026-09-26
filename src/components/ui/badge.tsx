'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'blush' | 'lavender' | 'peacock' | 'subtle';
  children: React.ReactNode;
}

export function Badge({
  variant = 'gold',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const variantStyles = {
    gold: 'bg-gold-50 border-gold-300 text-gold-700 shadow-sm',
    blush: 'bg-blush-light border-blush text-warm-800 shadow-sm',
    lavender: 'bg-lavender-light border-lavender text-warm-800 shadow-sm',
    peacock: 'bg-peacock-light border-peacock/30 text-peacock font-medium',
    subtle: 'bg-white/80 border-warm-200 text-warm-600',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-sans font-semibold tracking-wider uppercase backdrop-blur-sm select-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

