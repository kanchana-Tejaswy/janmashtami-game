'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'outline' | 'ghost' | 'divine' | 'peacock';
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
      'relative inline-flex items-center justify-center font-display font-semibold tracking-wider select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

    const sizeStyles = {
      sm: 'px-3.5 py-1.5 text-xs rounded-xl min-h-[36px]',
      md: 'px-5 py-2.5 text-xs sm:text-sm rounded-full min-h-[44px]',
      lg: 'px-7 py-3.5 text-sm sm:text-base rounded-full min-h-[50px]',
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 hover:from-gold-400 hover:to-gold-200 text-warm-900 border border-gold-400/40 shadow-ujwala-sm hover:shadow-ujwala-md active:scale-95',
      outline:
        'bg-white/90 hover:bg-ivory-soft border border-gold-500/35 hover:border-gold-500 text-warm-800 hover:text-warm-900 shadow-sm active:scale-95',
      ghost:
        'bg-transparent hover:bg-ivory-soft/80 text-warm-600 hover:text-warm-800 active:scale-95',
      divine:
        'bg-gradient-to-r from-gold-400 via-blush-soft to-gold-300 text-warm-900 border border-gold-300/60 shadow-ujwala-md hover:shadow-ujwala-lg active:scale-95 animate-pulse',
      peacock:
        'bg-peacock hover:bg-peacock-dark text-white border border-peacock/30 shadow-sm active:scale-95',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
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

