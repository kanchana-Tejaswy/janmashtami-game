'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'interactive' | 'static' | 'climax' | 'blush';
  children: React.ReactNode;
}

export function Card({
  variant = 'static',
  children,
  className = '',
  ...props
}: CardProps) {
  const isInteractive = variant === 'interactive' || variant === 'climax';

  const baseStyles =
    'relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 select-none';

  const variantStyles = {
    static:
      'bg-white/80 backdrop-blur-md border-gold-500/20 shadow-ujwala-card text-warm-800',
    interactive:
      'bg-white/85 hover:bg-white backdrop-blur-md border-gold-500/25 hover:border-gold-400 shadow-ujwala-card hover:shadow-ujwala-card-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-400 text-warm-800',
    climax:
      'bg-gradient-to-b from-white via-ivory-soft to-lavender-soft/30 border-gold-400/60 shadow-ujwala-md hover:shadow-ujwala-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-400 text-warm-800',
    blush:
      'bg-gradient-to-b from-white via-blush-light to-white border-blush/40 shadow-blush-card text-warm-800',
  };

  return (
    <motion.div
      whileHover={isInteractive ? { y: -3 } : undefined}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

