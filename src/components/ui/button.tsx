'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'outline' | 'ghost' | 'divine';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className = '',
      disabled,
      isLoading,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-display font-bold tracking-wider select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-peacock-950 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

    const sizeStyles = {
      sm: 'px-3.5 py-1.5 text-xs rounded-xl min-h-[36px]',
      md: 'px-5 py-2.5 text-xs sm:text-sm rounded-2xl min-h-[44px]',
      lg: 'px-7 py-3.5 text-sm sm:text-base rounded-full min-h-[50px]',
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-peacock-950 shadow-divine-md hover:shadow-divine-lg active:scale-95',
      outline:
        'bg-peacock-900/80 hover:bg-peacock-800 border border-gold-500/30 hover:border-gold-400 text-ivory hover:text-gold-200 shadow-glass-card active:scale-95',
      ghost:
        'bg-transparent hover:bg-peacock-800/60 text-ivory-dim hover:text-ivory active:scale-95',
      divine:
        'bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-peacock-950 shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_45px_rgba(245,158,11,0.7)] active:scale-95 animate-pulse',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.96 }}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
