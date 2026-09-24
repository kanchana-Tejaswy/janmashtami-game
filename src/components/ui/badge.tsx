'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'teal' | 'saffron' | 'subtle';
  children: React.ReactNode;
}

export function Badge({
  variant = 'teal',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const variantStyles = {
    gold: 'bg-gold-500/15 border-gold-400/40 text-gold-300',
    teal: 'bg-teal-500/15 border-teal-400/40 text-teal-300',
    saffron: 'bg-saffron-500/15 border-saffron-400/40 text-saffron-300',
    subtle: 'bg-peacock-800/80 border-peacock-700 text-ivory-dim',
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
