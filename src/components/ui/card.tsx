'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'interactive' | 'static' | 'climax';
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
    'relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 backdrop-blur-sm select-none';

  const variantStyles = {
    static:
      'bg-peacock-900/80 border-gold-500/25 shadow-glass-card text-ivory',
    interactive:
      'bg-peacock-900/80 hover:bg-peacock-850 border-gold-500/25 hover:border-gold-400 shadow-glass-card hover:shadow-divine-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
    climax:
      'bg-gradient-to-b from-peacock-850 to-peacock-950 border-gold-400/60 shadow-divine-md hover:shadow-divine-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
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
