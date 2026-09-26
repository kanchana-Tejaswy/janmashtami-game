'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface UjwalaGlowProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  color?: 'gold' | 'blush' | 'lavender' | 'soft';
  className?: string;
  intensity?: number; // 0 to 1
}

/**
 * UjwalaGlow: Reusable diffused radial light halo
 * Creates the feeling of light radiating from within, soft, warm, diffused, premium.
 */
export function UjwalaGlow({
  size = 'md',
  color = 'gold',
  className = '',
  intensity = 0.35,
}: UjwalaGlowProps) {
  const sizeMap = {
    sm: 'w-28 h-28 blur-xl',
    md: 'w-48 h-48 blur-2xl',
    lg: 'w-72 h-72 blur-3xl',
    xl: 'w-96 h-96 blur-3xl',
    hero: 'w-[520px] h-[320px] blur-[90px]',
  };

  const colorMap = {
    gold: `radial-gradient(circle, rgba(232, 209, 138, ${intensity}) 0%, rgba(214, 177, 94, ${intensity * 0.5}) 40%, transparent 70%)`,
    blush: `radial-gradient(circle, rgba(243, 217, 220, ${intensity}) 0%, rgba(232, 183, 190, ${intensity * 0.4}) 45%, transparent 70%)`,
    lavender: `radial-gradient(circle, rgba(221, 214, 234, ${intensity}) 0%, rgba(238, 234, 245, ${intensity * 0.4}) 45%, transparent 70%)`,
    soft: `radial-gradient(circle, rgba(254, 243, 199, ${intensity}) 0%, rgba(243, 217, 220, ${intensity * 0.3}) 50%, transparent 75%)`,
  };

  return (
    <div
      className={`absolute pointer-events-none rounded-full select-none ${sizeMap[size]} ${className}`}
      style={{
        background: colorMap[color],
      }}
      aria-hidden="true"
    />
  );
}

interface LightHaloProps {
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
}

/**
 * LightHalo: Breathing delicate halo wrapper around focal elements
 */
export function LightHalo({ children, active = true, className = '' }: LightHaloProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {active && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -inset-3 rounded-full bg-gradient-to-r from-gold-300/30 via-blush-soft/25 to-gold-light/30 blur-md pointer-events-none"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

interface GoldenPulseProps {
  size?: number;
  className?: string;
}

/**
 * GoldenPulse: Subtle radial ping ring
 */
export function GoldenPulse({ size = 24, className = '' }: GoldenPulseProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="absolute w-full h-full rounded-full bg-gold-400/20 animate-ping opacity-60" />
      <span className="relative w-2 h-2 rounded-full bg-gold-500 shadow-ujwala-sm" />
    </span>
  );
}

interface IlluminationRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * IlluminationReveal: Motion wrapper with soft upward fade and gentle light bloom
 */
export function IlluminationReveal({
  children,
  delay = 0,
  className = '',
}: IlluminationRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
