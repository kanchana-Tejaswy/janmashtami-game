'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkle } from '@/components/ui/icons';
import { fadeInVariants } from '@/lib/motion-presets';

export interface StationShellProps {
  stationNumber: 'I' | 'II' | 'III' | 'IV';
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function StationShell({
  stationNumber,
  kicker,
  title,
  description,
  children,
  className = '',
}: StationShellProps) {
  return (
    <motion.section
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`max-w-4xl mx-auto px-4 py-6 ${className}`}
      aria-label={`Station ${stationNumber}: ${title}`}
    >
      {/* Header & Subtitle */}
      <div className="text-center mb-8">
        <Badge variant="teal" className="mb-3">
          <Sparkle className="w-3.5 h-3.5 text-gold-400" />
          <span>Station {stationNumber} · {kicker}</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory tracking-wide drop-shadow-md">
          {title}
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-ivory-dim font-body mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Content Body */}
      <div>{children}</div>
    </motion.section>
  );
}
