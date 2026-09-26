'use client';

import React from 'react';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'niche' | 'divine';
  children: React.ReactNode;
}

export function Panel({
  variant = 'default',
  children,
  className = '',
  ...props
}: PanelProps) {
  const variantStyles = {
    default:
      'rounded-3xl bg-white/80 backdrop-blur-md border border-gold-500/25 shadow-ujwala-md',
    niche:
      'rounded-niche bg-gradient-to-b from-white via-ivory-soft to-white border-2 border-gold-400/50 shadow-ujwala-lg',
    divine:
      'rounded-3xl bg-gradient-to-b from-white via-ivory-soft to-lavender-soft/40 border-2 border-gold-400/60 shadow-ujwala-halo',
  };

  return (
    <div
      className={`relative p-6 sm:p-8 backdrop-blur-md overflow-hidden ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Background subtle radial glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,209,138,0.18)_0%,transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

