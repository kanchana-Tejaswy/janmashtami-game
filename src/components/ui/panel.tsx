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
      'rounded-3xl bg-peacock-900/85 border border-gold-500/25 shadow-glass-panel',
    niche:
      'rounded-niche bg-gradient-to-b from-peacock-900/90 via-peacock-950 to-peacock-900 border-2 border-gold-400/50 shadow-divine-md',
    divine:
      'rounded-3xl bg-gradient-to-b from-peacock-900/95 via-peacock-950 to-peacock-900 border-2 border-gold-400 shadow-[0_0_40px_rgba(245,158,11,0.3)]',
  };

  return (
    <div
      className={`relative p-6 sm:p-8 backdrop-blur-md overflow-hidden ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Background subtle radial glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1)_0%,transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
